export interface PingPayload {
  uuid: string;
  battery_percent: number;
}

export async function sendPing(payload: PingPayload): Promise<void> {
  const response = await fetch("/api/ping", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
}
