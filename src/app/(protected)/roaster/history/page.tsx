"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type RoastItem = {
  id: string;
  name: string;
  intensity: string;
  createdAt: string;
};

export default function RoastHistoryPage() {
  const [results, setResults] = useState<RoastItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Initial Fetch
  useEffect(() => {
    fetchInitial();
  }, []);

  async function fetchInitial() {
    try {
      const res = await fetch("/api/results");

      if (!res.ok) throw new Error("Failed to fetch");

      const data: RoastItem[] = await res.json();

      setResults(data);
      setCursor(data[data.length - 1]?.id ?? null);
      setHasMore(data.length === 20);
    } catch (err) {
      console.error(err);
    } finally {
      setInitialLoading(false);
    }
  }

  const loadMore = useCallback(async () => {
    if (!cursor || loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      const res = await fetch(`/api/results?cursor=${cursor}`);
      if (!res.ok) throw new Error("Failed to fetch more");

      const data: RoastItem[] = await res.json();

      setResults((prev) => [...prev, ...data]);
      setCursor(data[data.length - 1]?.id ?? null);
      setHasMore(data.length === 20);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  }, [cursor, loadingMore, hasMore]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 1,
      }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    }
  }, [loadMore]);

  function formatDate(date: string) {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Roast History</h1>

      <div
        ref={observerRef}
        className="h-[83vh] overflow-y-auto space-y-3 pr-2"
      >
        {results.map((item) => (
          <Link
            key={item.id}
            href={`/roaster/${item.id}`}
            className="block rounded-lg border p-4 hover:bg-muted transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(item.createdAt)}
                </p>
              </div>

              <span className="text-xs text-muted-foreground">
                {item.intensity}
              </span>
            </div>
          </Link>
        ))}

        {initialLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={`init-${i}`} className="h-16 w-full rounded-lg" />
          ))}

        {loadingMore &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={`more-${i}`} className="h-16 w-full rounded-lg" />
          ))}
      </div>
    </div>
  );
}