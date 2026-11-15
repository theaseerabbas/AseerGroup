const API_BASE =
  (import.meta.env["VITE_API_URL"] as string | undefined) ?? "http://localhost:4000/api/v1";

export async function postApi<T>(path: string, payload: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
    issues?: { path: string; message: string }[];
    data?: T;
  } | null;

  if (!res.ok || !data?.ok) {
    const firstIssue = data?.issues?.[0]?.message;
    throw new Error(firstIssue ?? data?.error ?? "Unable to submit right now. Please try again.");
  }

  return data.data as T;
}
