"use client";

import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { fetchParamod } from "../lib/api";
import { fetchParamod3d } from "../lib/api";

const CACHE_KEY = "www.magnetospehe.ru/ParamodData";

function getCached(cache, version, dt) {
  if (!cache || !cache[version]) return null;
  const t = Math.floor(dt / 3600 / 1000) * 3600 * 1000;
  const found = cache[version].data?.find((d) => d.dt === String(t));
  return found ? found.response : null;
}

function setCached(cache, version, dt, response) {
  const next = cache || {
    "2d": { index: 0, data: [] },
    "3d": { index: 0, data: [] },
    saturn2d: { index: 0, data: [] },
  };
  if (!next[version]) next[version] = { index: 0, data: [] };
  const item = { dt: moment(response.dt).format("x"), response };
  if (next[version].data.length < 4) {
    next[version].data.push(item);
    next[version].index = (next[version].index + 1) % 4;
  } else {
    next[version].data[next[version].index] = item;
    next[version].index = (next[version].index + 1) % 4;
  }
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(next));
  } catch (_) {}
  return next;
}

export function useParamodData(initialDatetime, version) {
  const is3d = version === "3d";
  const [datetime, setDatetime] = useState(initialDatetime);
  const [data, setData] = useState(null);
  const [params, setParams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(
    async (dtMoment) => {
      const dt = dtMoment.valueOf();
      try {
        if (typeof window !== "undefined") {
          const raw = localStorage.getItem(CACHE_KEY);
          const cache = raw ? JSON.parse(raw) : null;
          const cached = getCached(cache, version, dt);
          if (cached) {
            setDatetime(moment(cached.dt).valueOf());
            setData(cached.data?.data ?? cached.data);
            setParams(cached.params ?? null);
            return;
          }
        }
        const payload = is3d
          ? await fetchParamod3d(dt)
          : await fetchParamod(dt, version);
        const udt = moment(payload.dt).valueOf();
        setDatetime(udt);
        setData(payload.data ?? payload);
        setParams(payload.params ?? null);
        if (typeof window !== "undefined") {
          const raw = localStorage.getItem(CACHE_KEY);
          const cache = raw ? JSON.parse(raw) : null;
          setCached(cache, version, dt, payload);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [version, is3d]
  );

  useEffect(() => {
    const now = moment(initialDatetime);
    setLoading(true);
    setError(null);
    load(now);
  }, [initialDatetime, version]);

  const onDateChange = useCallback(
    (picker) => {
      setLoading(true);
      load(picker.startDate);
    },
    [load]
  );

  return { datetime, data, params, loading, error, onDateChange };
}
