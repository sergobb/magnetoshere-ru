export async function fetchParamod(dt, version = "2d") {
  const res = await fetch("/api/paramod", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dt, version }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchParamod3d(dt) {
  const res = await fetch("/api/paramod3d", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dt }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchGhostPosts() {
  const res = await fetch("/api/ghost/posts");
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
