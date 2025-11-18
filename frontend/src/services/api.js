const normalizeBaseUrl = (value) => (value ? value.replace(/\/$/, '') : value);
const localFallback = 'http://localhost:3000/api';
const inferredBase =
  typeof window !== 'undefined' && !import.meta.env.DEV ? `${window.location.origin}/api` : localFallback;

const BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_URL) ?? inferredBase;

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || 'Request failed';
    throw new Error(message);
  }
  return data;
};

const request = async (path, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });
    return handleResponse(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network request failed. Please verify the API server is reachable.');
    }
    throw error;
  }
};

export const registerUser = (payload) =>
  request('/users/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const loginUser = (payload) =>
  request('/users/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

