"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  NOVA_MARKET_PULSE,
  NOVA_NEWS_CATEGORIES,
  NOVA_NEWS_TICKER,
  getNovaNewsFeatured,
  getNovaNewsSorted,
  type NovaNewsCategory,
  type NovaNewsItem,
} from "@/data/nova-news";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function NewsCard({ item, emphasize = false }: { item: NovaNewsItem; emphasize?: boolean }) {
  return (
    <article
      className={cn(
        "nova-glass-card flex h-full flex-col gap-3 border border-white/10 p-5 transition hover:border-nova-cyan/40 hover:bg-white/[0.04]",
        emphasize && "md:p-6",
      )}
    >
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
        <span className="rounded-full border border-nova-cyan/30 bg-nova-cyan/10 px-2 py-0.5 text-nova-cyan">
          {item.category}
        </span>
        {item.marketSignal && (
          <span className="rounded-full border border-nova-orange/30 bg-nova-orange/10 px-2 py-0.5 text-nova-orange">
            {item.marketSignal}
          </span>
        )}
        <span className="font-medium normal-case tracking-normal text-white/45">{formatDate(item.publishedAt)}</span>
        <span className="font-medium normal-case tracking-normal text-white/35">{item.readMinutes} min read</span>
      </div>
      <h3 className={cn("font-bold leading-snug text-white", emphasize ? "text-xl" : "text-base sm:text-lg")}>
        {item.title}
      </h3>
      <p className="text-sm leading-relaxed text-nova-cyan-light/80">{item.summary}</p>
      <div className="mt-auto space-y-2 pt-1">
        <p className="text-[11px] leading-relaxed text-white/50">
          {item.source} · {item.region}
          <span className="mt-1 block text-nova-cyan/85">{item.relatedTrack}</span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/55">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function NovaNewsFeed() {
  const [category, setCategory] = useState<"All" | NovaNewsCategory>("All");
  const all = useMemo(() => getNovaNewsSorted(), []);
  const featured = useMemo(() => getNovaNewsFeatured(), []);
  const featuredIds = useMemo(() => new Set(featured.map((item) => item.id)), [featured]);
  const filtered = useMemo(() => {
    if (category === "All") {
      // Avoid repeating featured stories in the lower list.
      return all.filter((item) => !featuredIds.has(item.id));
    }
    return all.filter((item) => item.category === category);
  }, [all, category, featuredIds]);
  const latestDate = all[0]?.publishedAt ?? "2026-07-20";

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-2xl border border-nova-cyan/20 bg-gradient-to-r from-nova-cyan/10 via-transparent to-nova-orange/10">
        <p className="border-b border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Live signals · Updated {formatDate(latestDate)}
        </p>
        <div
          className="flex whitespace-nowrap py-2.5 text-xs font-semibold text-nova-cyan-light/90 motion-safe:animate-[nova-ticker_48s_linear_infinite]"
          aria-label="Scrolling STEM market headlines"
        >
          {[...NOVA_NEWS_TICKER, ...NOVA_NEWS_TICKER].map((line, index) => (
            <span key={`${line}-${index}`} className="mx-6 inline-flex items-center gap-2">
              <span className="text-nova-orange" aria-hidden>
                ●
              </span>
              {line}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-white/50">Browse by theme</p>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]" role="tablist" aria-label="News categories">
          <button
            type="button"
            role="tab"
            aria-selected={category === "All"}
            onClick={() => setCategory("All")}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nova-cyan",
              category === "All"
                ? "border-nova-cyan bg-nova-cyan/15 text-nova-cyan"
                : "border-white/15 text-white/70 hover:border-white/35 hover:text-white",
            )}
          >
            All stories ({all.length})
          </button>
          {NOVA_NEWS_CATEGORIES.map((item) => {
            const count = all.filter((story) => story.category === item).length;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                onClick={() => setCategory(item)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nova-cyan",
                  category === item
                    ? "border-nova-cyan bg-nova-cyan/15 text-nova-cyan"
                    : "border-white/15 text-white/70 hover:border-white/35 hover:text-white",
                )}
              >
                {item} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_292px]">
        <div className="space-y-8">
          {category === "All" && (
            <section aria-labelledby="nova-news-featured">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h2 id="nova-news-featured" className="text-xl font-bold text-white sm:text-2xl">
                    Start here
                  </h2>
                  <p className="mt-1 text-sm text-white/55">Clear briefings that connect market trends to NOVA programs.</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {featured.map((item) => (
                  <NewsCard key={item.id} item={item} emphasize />
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="nova-news-feed">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 id="nova-news-feed" className="text-xl font-bold text-white sm:text-2xl">
                  {category === "All" ? "More from the feed" : category}
                </h2>
                <p className="mt-1 text-sm text-white/55">
                  {category === "All"
                    ? "Keep scrolling — fresh skills and career signals."
                    : `Focused briefings for ${category}.`}
                </p>
              </div>
              <p className="text-xs font-semibold text-white/40">{filtered.length} stories</p>
            </div>
            {filtered.length === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                No stories in this theme yet. Try another category or view all stories.
              </p>
            ) : (
              <div className="grid gap-4">
                {filtered.map((item) => (
                  <NewsCard key={`feed-${item.id}`} item={item} />
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="nova-glass-card p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-nova-orange">Market pulse</p>
            <p className="mt-1 text-[11px] text-white/45">Quick read on demand signals</p>
            <ul className="mt-4 space-y-3">
              {NOVA_MARKET_PULSE.map((row) => (
                <li key={row.label} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <p className="text-xs text-white/55">{row.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">{row.value}</p>
                  <p
                    className={cn(
                      "mt-0.5 text-[10px] font-bold uppercase",
                      row.trend === "up" && "text-nova-green",
                      row.trend === "steady" && "text-nova-cyan",
                      row.trend === "watch" && "text-nova-orange",
                    )}
                  >
                    {row.trend === "up" ? "Trending up" : row.trend === "steady" ? "Steady" : "Watch"}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="nova-glass-card p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-nova-cyan">Feel ready to build?</p>
            <p className="mt-2 text-sm leading-relaxed text-nova-cyan-light/80">
              Turn a headline into a skill path. Start with the program that matches what you just read.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/school" className="nova-btn-secondary px-3 text-xs">
                NOVA School
              </Link>
              <Link href="/college" className="nova-btn-secondary px-3 text-xs">
                NOVA College
              </Link>
              <Link href="/language" className="nova-btn-secondary px-3 text-xs">
                NOVA Language
              </Link>
              <Link href="/catalog" className="nova-btn-primary px-3 text-xs font-bold">
                Browse program catalog
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">About this feed</p>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Editorial STEM briefings curated for NOVA visitors—AI, robotics, IoT, quantum, languages, digital skills, and careers. Written to inform and inspire, not overwhelm. We refresh stories regularly so the hub feels alive.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
