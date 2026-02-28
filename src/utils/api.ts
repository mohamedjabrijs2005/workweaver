// API request helper with better error handling
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const url = apiUrl ? `${apiUrl}${endpoint}` : endpoint;

  console.log(`[API] ${options?.method || 'GET'} ${url}`);

  let res;
  try {
    res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
  } catch (error: any) {
    console.error('[API] Fetch error:', error.message);
    throw new Error(`Failed to connect to server: ${error.message}`);
  }

  // Log response status and text for debugging
  const text = await res.text();
  const textPreview = text.substring(0, 200);
  console.log(`[API] Response ${res.status}:`, textPreview);

  // Handle empty responses
  if (!text) {
    if (res.ok) {
      console.warn('[API] Empty response body from successful request');
      return {} as T;
    }
    throw new Error(`Server error: Empty response (${res.status})`);
  }

  // Try to parse as JSON
  let data: T;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error('[API] JSON parse failed. Raw response:', text.substring(0, 500));
    throw new Error(
      `Server error: Invalid JSON response (${res.status}) - ${
        text.startsWith('<') 
          ? 'Server returned HTML, likely an error page' 
          : textPreview
      }`
    );
  }

  // Check HTTP status
  if (!res.ok) {
    const error = (data as any)?.error || `HTTP ${res.status}`;
    console.error('[API] Response error:', error);
    throw new Error(error);
  }

  console.log('[API] Success');
  return data;
}
