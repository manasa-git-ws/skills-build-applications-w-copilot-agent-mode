export function getApiUrl(resource) {
  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
  const codespaceName = env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : (env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');

  return `${baseUrl}/api/${resource}/`;
}
