import { base44 } from "@/api/base44Client";

// Redirects the current user to their dedicated space based on their saved account type.
export async function goToMySpace() {
  try {
    const me = await base44.auth.me();
    window.location.href = me?.account_type === "brand" ? "/brand" : "/dashboard";
  } catch {
    window.location.href = "/login";
  }
}