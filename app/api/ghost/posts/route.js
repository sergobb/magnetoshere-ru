const GHOST_URL = (process.env.GHOST_URL || "http://213.131.1.29").replace(/\/$/, "");
const GHOST_KEY = process.env.GHOST_CONTENT_API_KEY || "";
const GHOST_CLIENT_ID = process.env.GHOST_CLIENT_ID || "ghost-frontend";
const GHOST_CLIENT_SECRET = process.env.GHOST_CLIENT_SECRET || "";

const emptyGhostResponse = { posts: [], meta: {} };

function buildGhostUrl() {
  if (GHOST_CLIENT_SECRET) {
    return `${GHOST_URL}/ghost/api/v0.1/posts/?client_id=${encodeURIComponent(GHOST_CLIENT_ID)}&client_secret=${encodeURIComponent(GHOST_CLIENT_SECRET)}&include=tags&filter=tag:magnetosphere-ru`;
  }
  if (GHOST_KEY) {
    return `${GHOST_URL}/ghost/api/v3/content/posts/?key=${encodeURIComponent(GHOST_KEY)}&include=tags&filter=tag:magnetosphere-ru`;
  }
  return null;
}

export async function GET() {
  const url = buildGhostUrl();
  console.log(url);
  if (!url) {
    return Response.json(emptyGhostResponse);
  }
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    console.log(res)
    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      return Response.json(emptyGhostResponse);
    }
    if (!res.ok) {
      return Response.json(
        { error: data?.errors?.[0]?.message || "Ghost request failed" },
        { status: res.status }
      );
    }
    return Response.json(data);
  } catch (e) {
    console.log(e)
    return Response.json(emptyGhostResponse);
  }
}
