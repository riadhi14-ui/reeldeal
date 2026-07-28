import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
} 


export const isIframe = window.self !== window.top;

// Renvoie l'URL seulement si elle utilise un schéma sûr (http/https),
// sinon null. Protège contre les injections via `javascript:` (XSS).
export function safeUrl(url) {
  if (typeof url !== "string") return null;
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}