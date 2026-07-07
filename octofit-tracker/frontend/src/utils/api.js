export function getApiUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/${resource}/`
    : import.meta.env.VITE_API_BASE_URL || `http://localhost:8000/api/${resource}/`;

  return baseUrl;
}
