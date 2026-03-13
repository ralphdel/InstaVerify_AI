import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/utils/supabase/server';

export const maxDuration = 60; // Allow up to 60s for AI analysis

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Convert uploaded file to base64 data URL for OpenAI Vision
// Supports: jpg, jpeg, png, gif, webp. For PDFs, returns null.
async function fileToBase64(file: File): Promise<{ dataUrl: string; isPdf: false } | { isPdf: true }> {
  const mimeType = file.type || '';
  if (mimeType === 'application/pdf') return { isPdf: true };
  if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(mimeType)) {
    return { isPdf: true }; // treat unsupported types like PDF
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString('base64');
  return { dataUrl: `data:${mimeType};base64,${base64}`, isPdf: false };
}

// Build a structured forensic analysis prompt for CAC or Utility
function buildForensicsPrompt(documentTypes: string[], merchantName: string, merchantAddress: string) {
  const hasCac = documentTypes.includes('CAC');
  const hasUtility = documentTypes.includes('Utility');

  return `
You are a certified Nigerian document forensics expert. You are performing a fraud and forgery analysis.

The submitter provided:
- Business Name: "${merchantName}"
- Business Address: "${merchantAddress}"
- Document Types: ${documentTypes.join(' + ')}

STEP-BY-STEP VERIFICATION LOGIC:

${hasCac ? `
=== CAC CERTIFICATE ANALYSIS ===
STEP 1 - FORENSIC FORGERY SCAN:
  Look for: digital manipulation artifacts, inconsistent fonts, pixel anomalies, misaligned text, 
  copy-paste areas, missing/fake watermarks, inconsistent resolution patches.
  
STEP 2 - NAME MATCHING:
  Extract the registered business name from the certificate.
  Compare it EXACTLY with: "${merchantName}"
  Flag even minor differences (e.g. "Ltd" vs "Limited", extra words, spelling).

STEP 3 - RC NUMBER EXTRACTION:
  Look for a Registration Number (format: RC123456 or BN123456 or RC 123456).
  Does an RC number exist on the document? Note the exact RC number if found.
  Is the format valid (numeric digits after RC/BN prefix)?
  
STEP 4 - REGISTRY STATUS (Note: Live CAC API verification not implemented):
  Based on visual inspection only, does the document appear to have valid official CAC marks 
  (stamp, seal, authorized signature, correct letterhead)?
` : ''}

${hasUtility ? `
=== UTILITY BILL ANALYSIS ===
STEP 1 - FORENSIC FORGERY SCAN:
  Look for: edited text/numbers, inconsistent fonts, copy-paste overlays, 
  altered account numbers, modified amounts, fake company logos.

STEP 2 - NAME MATCHING:
  Extract the customer/account name from the utility bill.
  Compare it with: "${merchantName}"
  Note any differences.

STEP 3 - ADDRESS MATCHING:
  Extract the service/billing address from the utility bill.
  Compare it with: "${merchantAddress}"
  Note if the addresses match, partially match, or conflict.
` : ''}

=== SCORE CALCULATION ===
Start at 100. Apply these deductions:
- Forgery/manipulation detected: -60 (CRITICAL)
- Name mismatch: -25
- Address mismatch (utility only): -15  
- RC number missing (CAC only): -20
- RC number format invalid: -15
- Missing official stamps/seals: -10
- Minor visual concerns: -5 each

Minimum score: 0. Do not exceed 100.

RETURN ONLY THIS JSON (no markdown, no extra text):
{
  "score": <calculated integer 0-100>,
  "forgery_detected": <true if any manipulation evidence found>,
  "name_match": <true if name matches exactly or closely>,
  "address_match": <true if address matches, null if not a utility bill>,
  "registry_verified": <true if official CAC marks appear authentic>,
  "rc_number": "<extracted RC number string, or null if not found>",
  "rc_number_found": <true if an RC number was found on the document>,
  "rc_verification_status": "pending_api",
  "signals": [
    "<signal 1 — be specific, e.g. 'RC Number RC123456 found on document'>",
    "<signal 2>",
    "<signal 3>",
    "..."
  ],
  "ai_summary": "<2-3 sentence plain-English summary of findings and recommendation>",
  "error_message": <null or specific critical concern string>
}`.trim();
}

export async function POST(request: NextRequest) {
  // Early check - if no OpenAI key, fail clearly
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured on the server.' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const cacFile = formData.get('cacFile') as File | null;
    const utilityFile = formData.get('utilityFile') as File | null;
    const merchantName = (formData.get('merchantName') as string) || '';
    const merchantAddress = (formData.get('merchantAddress') as string) || '';

    if (!cacFile && !utilityFile) {
      return NextResponse.json({ error: 'No documents provided' }, { status: 400 });
    }

    const documentTypes: string[] = [];
    const content: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [];

    // Process CAC file
    if (cacFile) {
      const result = await fileToBase64(cacFile);
      if (result.isPdf) {
        return NextResponse.json({
          error: 'PDF documents are not currently supported for AI Vision analysis.',
          details: 'Please upload an image file (JPG or PNG) of the document instead.',
          pdf_not_supported: true,
        }, { status: 422 });
      }
      documentTypes.push('CAC');
      content.push({
        type: 'image_url',
        image_url: { url: result.dataUrl, detail: 'high' },
      });
    }

    // Process Utility file
    if (utilityFile) {
      const result = await fileToBase64(utilityFile);
      if (result.isPdf) {
        return NextResponse.json({
          error: 'PDF documents are not currently supported for AI Vision analysis.',
          details: 'Please upload an image file (JPG or PNG) of the document instead.',
          pdf_not_supported: true,
        }, { status: 422 });
      }
      documentTypes.push('Utility');
      content.push({
        type: 'image_url',
        image_url: { url: result.dataUrl, detail: 'high' },
      });
    }

    // Prepend the structured forensic prompt
    content.unshift({
      type: 'text',
      text: buildForensicsPrompt(documentTypes, merchantName, merchantAddress),
    });

    console.log(`[AI Vision] Analyzing ${documentTypes.join('+')} for "${merchantName}" via GPT-4o...`);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1500,
      temperature: 0.1, // Low temperature for consistent, factual analysis
      messages: [{ role: 'user', content }],
    });

    const rawText = response.choices[0]?.message?.content || '';
    console.log('[AI Vision] GPT-4o raw response:', rawText.substring(0, 500));

    // Strip markdown code fences and parse JSON
    const cleanText = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('AI did not return valid JSON');

    const ai = JSON.parse(jsonMatch[0]);

    const result = {
      score: typeof ai.score === 'number' ? Math.max(0, Math.min(100, ai.score)) : 50,
      forgery_detected: Boolean(ai.forgery_detected),
      name_match: ai.name_match !== false,
      address_match: ai.address_match ?? null,
      registry_verified: Boolean(ai.registry_verified),
      rc_number: ai.rc_number ?? null,
      rc_number_found: Boolean(ai.rc_number_found),
      rc_verification_status: 'pending_api',
      signals: Array.isArray(ai.signals) ? ai.signals : ['AI analysis completed'],
      ai_summary: ai.ai_summary || 'Analysis complete.',
      error_message: ai.error_message || null,
    };

    console.log(`[AI Vision] Result: score=${result.score}, forgery=${result.forgery_detected}, name_match=${result.name_match}`);
    return NextResponse.json(result);

  } catch (error: any) {
    console.error('[AI Vision] Fatal error:', error?.message || error);
    return NextResponse.json(
      { error: 'AI analysis failed', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
