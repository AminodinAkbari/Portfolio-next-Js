"use client";

import { useEffect, useState } from "react";

import { TocItem } from "@/lib/blogs";
import { cn } from "@/lib/utils";

interface BlogTableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function BlogTableOfContents({
  items,
  className,
}: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const OFFSET = 100;
    let frame = 0;

    const update = () => {
      let current = "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top > OFFSET) break;
        current = item.id;
      }
      setActiveId(current || items[0].id);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  const listItems = items.map((item) => (
    <li key={item.id} className={cn(item.depth === 3 && "ml-4")}>
      <a
        href={`#${item.id}`}
        onClick={() => setActiveId(item.id)}
        className={cn(
          "block py-1.5 text-sm transition-colors hover:text-foreground",
          activeId === item.id
            ? "text-primary font-medium border-l-2 border-primary pl-3 -ml-[2px]"
            : "text-muted-foreground"
        )}
        aria-current={activeId === item.id ? "true" : undefined}
      >
        {item.text}
      </a>
    </li>
  ));

  return (
    <nav aria-label="Table of contents" className={cn("toc", className)}>
      <details className="lg:hidden mb-6 border border-border rounded-lg p-4">
        <summary className="cursor-pointer font-medium text-sm text-foreground list-none flex items-center justify-between">
          On this page
          <span className="text-muted-foreground text-xs">
            {items.length} sections
          </span>
        </summary>
        <ul className="mt-3 space-y-0.5">{listItems}</ul>
      </details>

      <div className="hidden lg:block">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          On this page
        </p>
        <ul className="space-y-0.5 border-l border-border">{listItems}</ul>
      </div>
    </nav>
  );
}
