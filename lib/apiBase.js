/**
 * API origin for fetch():
 * - Browser dev: same-origin `/shiksha-api` (Next.js rewrites to FastAPI — avoids confusing the address bar).
 * - Server (SSR): direct FastAPI URL.
 * - Override anytime: NEXT_PUBLIC_API_URL
 */
export function getApiBase() {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE;
  if (fromEnv) return String(fromEnv).replace(/\/$/, '');
  
  // In the browser, we use the Next.js proxy rewrite by default
  if (typeof window !== 'undefined') {
    return '/shiksha-api';
  }
  
  // On the server (SSR), we need to reach the FastAPI container directly
  const ssr = process.env.API_SSR_ORIGIN || process.env.API_ORIGIN || 'http://127.0.0.1:8000';
  return String(ssr).replace(/\/$/, '');
}
