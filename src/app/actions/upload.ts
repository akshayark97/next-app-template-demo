"use server";

import { put } from "@vercel/blob";
import { stackServerApp } from "@/stack/server";

export type UploadedFile = {
  url: string;
  size: number;
  type: string;
  filename?: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

/**
 * Example server action: upload a file to Vercel Blob.
 * Requires BLOB_READ_WRITE_TOKEN and Stack Auth to be configured.
 * Extend ALLOWED_TYPES / MAX_FILE_SIZE to match your requirements.
 */
export async function uploadFile(formData: FormData): Promise<UploadedFile> {
  if (!stackServerApp) {
    throw new Error(
      "Auth is not configured — set STACK_SECRET_SERVER_KEY to enable authenticated uploads.",
    );
  }

  const user = await stackServerApp.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const files = formData.getAll("files").filter(Boolean) as File[];
  const file = files[0];

  if (!file) throw new Error("No file provided");
  if (!ALLOWED_TYPES.includes(file.type)) throw new Error("Invalid file type");
  if (file.size > MAX_FILE_SIZE) throw new Error("File too large (max 10 MB)");

  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true,
  });

  type BlobResult = { url?: string; pathname?: string };
  const result = blob as unknown as BlobResult;

  return {
    url: result.url ?? "",
    size: file.size,
    type: file.type,
    filename: result.pathname ?? file.name,
  };
}
