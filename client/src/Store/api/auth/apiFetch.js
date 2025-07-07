export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    let errBody;

    try {
      errBody = JSON.parse(text);
    } catch {
      errBody = text;
    }

    console.error(`❌ [${res.status}] ${endpoint} →`, errBody);

    throw new Error(
      `API ${res.status}: ${
        typeof errBody === "string" ? errBody : JSON.stringify(errBody)
      }`
    );
  }

  return res.json();
}