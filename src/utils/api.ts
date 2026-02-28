// API request helper with better error handling
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const url = apiUrl ? `${apiUrl}${endpoint}` : endpoint;

  console.log(`API Call: ${options?.method || 'GET'} ${url}`);

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  // Log response status and text for debugging
  const text = await res.text();
  console.log(`Response Status: ${res.status}`, text.substring(0, 200));

  if (!text) {
    if (res.ok) return {} as T;
    throw new Error(`Empty response from server (${res.status})`);
  }

  let data: T;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error('Failed to parse JSON:', text);
    throw new Error('Server error: Invalid response format');
  }

  if (!res.ok) {
    const error = (data as any)?.error || `HTTP ${res.status}`;
    throw new Error(error);
  }

  return data;
}
