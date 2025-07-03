export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "/api"
    : "https://ziyaarah.vercel.app/api";