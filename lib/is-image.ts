export function isImage(url: string | null) {
  if (url) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  return false;
}
