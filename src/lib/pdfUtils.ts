/**
 * Client-side PDF utility
 * Converts the first page of a PDF into a standard image (data URL)
 * which can then be safely passed to the OpenAI Vision API.
 */

/**
 * Converts the first page of a given PDF File object into a JPEG data URL.
 * @param file The PDF File object from an input element
 * @returns A Promise resolving to a base64 Data URL (image/jpeg)
 */
export async function convertPdfToImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = async function() {
      try {
        // Dynamically import pdfjs-dist ONLY when needed to prevent SSR/init crashes
        const pdfjsLib = await import('pdfjs-dist');
        
        // Setup worker safely for Next.js
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

        const typedarray = new Uint8Array(this.result as ArrayBuffer);
        
        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument({ data: typedarray });
        const pdf = await loadingTask.promise;
        
        // We only care about the first page for document verification (usually a 1-page certificate/bill)
        const page = await pdf.getPage(1);
        
        // Render at a standard resolution to prevent base64 strings exceeding Vercel's 4.5MB limit
        const scale = 1.0; 
        const viewport = page.getViewport({ scale });
        
        // Prepare canvas using standard DOM elements
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          throw new Error("Could not create canvas context");
        }
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        await page.render(renderContext).promise;
        
        // Convert canvas to a JPEG data URL
        // A quality of 0.7 keeps the image clear for AI but drops the file size significantly
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl);
        
      } catch (error) {
        console.error("Error converting PDF to image:", error);
        reject(error);
      }
    };

    fileReader.onerror = (error) => reject(error);
    
    // Read the file as an ArrayBuffer, which pdf.js requires
    fileReader.readAsArrayBuffer(file);
  });
}

/**
 * Helper to check if a file is a PDF
 */
export function isPdfFile(file: File | null): boolean {
  if (!file) return false;
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}
