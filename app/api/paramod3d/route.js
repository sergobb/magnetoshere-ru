const BACKEND_URL =
  process.env.BACKEND_URL || "http://localhost:8888/api/v1/";

export async function POST(request) {
  try {
    const body = await request.json();
    const url = `${BACKEND_URL.replace(/\/$/, "")}/paramod3d/`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dt: body.dt, version: body.version }),
    });
    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    return Response.json(
      { error: e.message || "Paramod3d request failed" },
      { status: 500 }
    );
  }
}
