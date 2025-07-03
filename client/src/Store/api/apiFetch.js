export async function apiFetch(endpoint, options = {}) {
  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "/api"
      : "https://ziyaarah.vercel.app/api";

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // VERY IMPORTANT
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API error");
  }

  return res.json();
}
