import { getAuthToken } from "./auth";

const API_URL = "http://localhost:4000";

export async function fetchProjects() {
const token = await getAuthToken();
  const res = await fetch(`${API_URL}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createProject(name: string, url: string) {
const token = await getAuthToken();
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, url }),
  });
  return res.json();
}
