import axios from "axios";

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD || "ppqiyc2e";
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_PRESET || "yearbook_unsigned";
export const MAX_BYTES = 10 * 1024 * 1024; // 10 MB (Cloudinary free-plan image limit)

// Uploads the ORIGINAL file straight from the browser to Cloudinary.
// Resolves with the permanent https URL of the original image.
export async function uploadToCloudinary(file, onProgress) {
  if (!file) throw new Error("No file selected");
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  if (file.size > MAX_BYTES) throw new Error("Photo is too large. Please use an image under 10 MB.");

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", UPLOAD_PRESET);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    body,
    {
      onUploadProgress: (e) => onProgress && e.total && onProgress(Math.round((e.loaded / e.total) * 100)),
    }
  );
  return res.data.secure_url;
}

// Returns a small, auto-optimised version of a Cloudinary photo for on-screen use.
// The stored URL (the original) is never changed. Old Firebase URLs pass through untouched.
export function thumb(url, width = 400) {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  if (/\/upload\/[^/]*(w_|c_limit)/.test(url)) return url; // already transformed
  return url.replace("/upload/", `/upload/c_limit,w_${width},q_auto,f_auto/`);
}
