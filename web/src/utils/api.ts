export const API_URL = "http://localhost:8000";

export const fetcher = async (endpoint: string) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};
