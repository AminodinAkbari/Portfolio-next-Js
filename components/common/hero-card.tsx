import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Tier 1 of the two-tier hero (003-hero-card-redesign): the frosted-glass
 * content card (FR-005). Semi-transparent theme-aware tint keeps the
 * background image subtly visible, backdrop-blur frosts the content behind
 * the card, a very subtle semi-transparent border defines the edge, and the
 * soft diffuse shadow is retained. Modern browsers only — no backdrop-filter
 * fallback by design (spec clarification 2026-07-23 session).
 *
 * Width (FR-004 / FR-013 / SC-002 / SC-003): 92% of the viewport below the
 * card's own cap, capped at 850px (within the 800–900px requirement) on
 * large screens; always horizontally centered by the parent flex.
 *
 * Legibility (FR-017 / SC-008, verified programmatically across all 7
 * themes x image extremes): glass alpha 0.78 alone keeps headings above
 * AA but body text requires the FR-018 content scrim (0.65) rendered by
 * the caller behind the text zone — together they meet WCAG AA with the
 * image still subtly visible (22% through the card face, 7.7% behind text).
 *
 * Top padding is injected by the caller from --hero-card-pad-top
 * (FR-010, research R5) so avatar clearance stays in sync with the
 * avatar-size variable.
 */

export function HeroCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // Same box as HeroBackground: absolute, full width, 80% height, pinned to top.
        "absolute inset-x-0 top-0 z-10 flex h-[80%] flex-col items-center justify-center overflow-hidden rounded-3xl border border-[hsl(var(--foreground)/0.10)] bg-[hsl(var(--background)/0.35)] px-5 text-center shadow-lg sm:px-8",
        className,
      )}
      {...props}
    />
  );
}
