import Image from "next/image";

import heroBg from "@/public/hero-bg.jpg";

/**
 * Tier 0 of the two-tier hero (003-hero-card-redesign):
 * full-bleed background image container occupying the upper portion of the
 * hero viewport. The container keeps its dimensions even if the image fails
 * to load (FR-016): the wrapper div owns the height and a fallback surface.
 *
 * Geometry (FR-015 / data-model validation rule 2): the section is h-screen
 * and the content card is vertically centered by the parent flex, so the
 * card top edge (= avatar vertical center, FR-008) is always at
 * (100% - cardHeight)/2 < 50% of the section — a 52% background height
 * therefore always reaches at or below the avatar's vertical center, while
 * still sitting inside the card's span so the card overlaps this
 * container's bottom edge (FR-006).
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-0 h-[80%] overflow-hidden bg-muted rounded-3xl"
    >
      <Image
        src={heroBg}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
    </div>
  );
}
