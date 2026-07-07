export function getApiUrl(resource) {
  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
  const hostname = typeof window !== 'undefined' && window.location ? window.location.hostname : '';
  const codespaceName =
    env.VITE_CODESPACE_NAME?.trim() ||
    (hostname.includes('github.dev') ? hostname.split('.')[0] : '') ||
    (hostname === 'localhost' ? '' : hostname.split('.')[0]);

  const baseUrl = codespaceName && codespaceName !== 'localhost'
    ? `https://${codespaceName}-8000.app.github.dev`
    : (env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');

  return `${baseUrl}/api/${resource}/`;
}
