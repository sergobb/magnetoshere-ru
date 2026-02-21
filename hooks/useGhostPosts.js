"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchGhostPosts } from "../lib/api";

function byTag(posts, tag, lang) {
  const byLang = (posts || []).filter((p) => {
    const tags = (p.tags || []).map((t) => t.name);
    return lang === "ru" ? tags.includes("ru") : tags.includes("en");
  });
  const withTag = byLang.filter((p) => {
    const tags = (p.tags || []).map((t) => t.name);
    return tags.includes(tag);
  });
  if (withTag.length > 0) {
    return { title: withTag[0].title, html: withTag[0].html };
  }
  return { title: "There is no text for this page.", html: "" };
}

export function useGhostPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchGhostPosts();
      setPosts(data.posts || []);
    } catch (e) {
      setError(e.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const getText = useCallback(
    (tag, lang) => byTag(posts, tag, lang),
    [posts]
  );

  return { posts, loading, error, getText };
}
