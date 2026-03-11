import { createClient } from "@supabase/supabase-js";
import { VerificationStatus } from "@/components/report/VerificationResult";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const mockDB: any[] = [];

export const supabase = (supabaseUrl && supabaseUrl !== "your-supabase-url-here" && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function saveSubmission(data: {
  merchantName: string;
  merchantAddress: string;
  documentType: string;
  status: VerificationStatus;
  score: number;
  signals: string[];
  verified_by?: string;
  verified_by_email?: string;
  verification_details?: any;
}) {
  const id = `INV-${Math.floor(Math.random() * 90000) + 10000}`;
  const submission = {
    id,
    merchant_name: data.merchantName,
    merchant_address: data.merchantAddress,
    document_type: data.documentType,
    status: data.status,
    confidence_score: data.score,
    signals: data.signals,
    upload_time: new Date().toISOString(),
    verified_by: data.verified_by,
    verified_by_email: data.verified_by_email,
    verification_details: data.verification_details,
  };

  if (supabase) {
    try {
      await supabase.from("submissions").insert([submission]);
    } catch (e) {
      console.warn("Supabase insert failed, falling back to mock DB", e);
      mockDB.push(submission);
    }
  } else {
    mockDB.push(submission);
  }

  return submission;
}

export async function getSubmissions(filters?: { verified_by?: string }) {
  if (supabase) {
    try {
      let query = supabase.from("submissions").select("*");
      
      if (filters?.verified_by) {
        query = query.eq("verified_by", filters.verified_by);
      }
      
      const { data, error } = await query.order("upload_time", { ascending: false });
      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase fetch failed", e);
    }
  }
  
  let results = [...mockDB];
  if (filters?.verified_by) {
    results = results.filter(s => s.verified_by === filters.verified_by);
  }
  return results.reverse();
}

export async function getSubmission(id: string) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from("submissions").select("*").eq("id", id).single();
      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase fetch single failed", e);
    }
  }
  return mockDB.find(s => s.id === id) || null;
}

