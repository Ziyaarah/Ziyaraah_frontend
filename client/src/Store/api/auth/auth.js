import { apiFetch } from "./apiFetch";

export async function login(email, password) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}


export async function signup(name, email, password) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}


export async function getCurrentUser() {
  return apiFetch("/api/auth/me");
}