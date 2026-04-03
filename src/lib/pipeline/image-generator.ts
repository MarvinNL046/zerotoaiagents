// Image generator stub — Gemini integration placeholder.
// TODO: wire up GEMINI_API_KEY when image generation is enabled.

export interface GeneratedImage {
  base64: string;
  mimeType: string;
  prompt: string;
}

export async function generateImage(_prompt: string): Promise<GeneratedImage> {
  throw new Error("Image generation not yet configured (set GEMINI_API_KEY)");
}

export async function generateBlogImage(
  _title: string,
  _category: string
): Promise<GeneratedImage> {
  throw new Error("Image generation not yet configured (set GEMINI_API_KEY)");
}

export function toDataUrl(image: GeneratedImage): string {
  return `data:${image.mimeType};base64,${image.base64}`;
}
