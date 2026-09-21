"use client";

import { useEffect, useState } from "react";

const BUTTON_SIZE = 60;
const BUTTON_BOTTOM = 20;
const BUTTON_RIGHT = 20;

export function IranVpnNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lang = navigator.language || "";
    const isIranian = tz === "Asia/Tehran" || lang.startsWith("fa");
    const dismissed =
      localStorage.getItem("iran-vpn-notice-dismissed") === "1";
    if (isIranian && !dismissed) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <>
      {/* Empty slot — dashed circle + ripple rings */}
      <div
        aria-hidden="true"
        className="fixed z-40"
        style={{
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
          bottom: BUTTON_BOTTOM,
          right: BUTTON_RIGHT,
        }}
      >
        {/* Ripple rings (2, staggered) */}
        <span
          className="absolute inset-0 rounded-full border border-primary/50"
          style={{ animation: "iran-ripple 2s ease-out infinite" }}
        />
        <span
          className="absolute inset-0 rounded-full border border-primary/50"
          style={{
            animation: "iran-ripple 2s ease-out infinite",
            animationDelay: "1s",
          }}
        />

        {/* Dashed slot itself */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/50 bg-muted/20">
          <span className="text-[10px] font-semibold text-muted-foreground">
            AI
          </span>
        </div>
      </div>

      {/* Animated SVG arrow pointing right, toward the slot */}
      <div
        aria-hidden="true"
        className="fixed z-40"
        style={{
          bottom: BUTTON_BOTTOM + BUTTON_SIZE / 2 - 12,
          right: BUTTON_RIGHT + BUTTON_SIZE + 8,
          animation: "iran-slide-arrow 1.4s ease-in-out infinite",
        }}
      >
        <svg
          width="28"
          height="24"
          viewBox="0 0 28 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M3 12 H 22" />
          <path d="M15 5 L 22 12 L 15 19" />
        </svg>
      </div>

      {/* Speech bubble */}
      <div
        role="note"
        className="fixed z-50 max-w-[230px] rounded-2xl border bg-background/95 p-3 pr-4 text-xs shadow-lg backdrop-blur sm:max-w-[280px]"
        style={{
          bottom: BUTTON_BOTTOM + 4,
          right: BUTTON_RIGHT + BUTTON_SIZE + 48,
        }}
      >
        <button
          onClick={() => {
            localStorage.setItem("iran-vpn-notice-dismissed", "1");
            setShow(false);
          }}
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border bg-background text-[10px] font-bold hover:bg-accent"
          aria-label="Dismiss"
        >
          ×
        </button>

        <p className="leading-snug">
          My AI assistant usually sits here — but it&apos;s not reachable
          from Iran. <span className="font-semibold">Use a VPN</span> if
          you want to chat with it. 😔
        </p>

        <span
          aria-hidden="true"
          className="absolute -right-[7px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-border bg-background"
        />
      </div>
    </>
  );
}