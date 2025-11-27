//
// PUBLIC_INTERFACE
// getConfig returns frontend configuration derived from build-time envs with sane defaults.
// This module does NOT require a .env file and will not throw if variables are missing.
//
export function getConfig() {
  /** Compute values from process.env (CRA injects REACT_APP_*) or fallback defaults. */
  const {
    REACT_APP_API_BASE_URL,
    REACT_APP_ENV,
  } = process.env || {};

  // Default API base to same-origin reverse-proxied path
  const apiBaseUrl = (REACT_APP_API_BASE_URL && REACT_APP_API_BASE_URL.trim()) || '/api/v1';
  const envName = (REACT_APP_ENV && REACT_APP_ENV.trim()) || 'development';

  return {
    apiBaseUrl,
    envName,
  };
}
