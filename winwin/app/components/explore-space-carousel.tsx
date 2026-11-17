"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useReducer, useRef } from "react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { siteContainerClass } from "@/lib/layout";
import { carouselPhotos, type ClubPhoto } from "@/lib/photos";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 4000;
const EXPAND_MS = 950;
const FADE_MS = 600;
const PANEL_COUNT = 4;
// With these sizes the expanded panel is close to the photos' own 3:4 shape.
const MAIN_GROW = 2.3;
const SIDE_GROW = 1;
const EXPAND_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";

const spaces = carouselPhotos;

type Space = ClubPhoto;

type CarouselState = {
  /** Which panel is expanded. */
  active: number;
  /** The photo in the first panel. The other panels show the photos after it. */
  firstPhoto: number;
};

type CarouselAction = { type: "next" } | { type: "select"; panel: number };

const initialState: CarouselState = { active: 0, firstPhoto: 0 };

function carouselReducer(
  state: CarouselState,
  action: CarouselAction
): CarouselState {
  // A clicked photo expands right away, and the timer starts again from there.
  if (action.type === "select") {
    return action.panel === state.active
      ? state
      : { ...state, active: action.panel };
  }

  const isLastPanel = state.active === PANEL_COUNT - 1;

  // After the last panel, start over on the first panel with the next set of photos.
  return {
    active: isLastPanel ? 0 : state.active + 1,
    firstPhoto: isLastPanel
      ? (state.firstPhoto + PANEL_COUNT) % spaces.length
      : state.firstPhoto,
  };
}

function SpacePhoto({
  space,
  sizes,
  fade,
}: {
  space: Space;
  sizes: string;
  fade: boolean;
}) {
  return (
    <motion.div
      initial={fade ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      exit={fade ? { opacity: 0 } : undefined}
      transition={{ duration: FADE_MS / 1000 }}
      className="absolute inset-0"
    >
      <Image
        src={space.src}
        alt={space.alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: space.position }}
      />
    </motion.div>
  );
}

/**
 * Desktop and tablet: the expanded photo moves one panel to the right each turn. After
 * the last panel, all four photos fade to the next set together. Clicking a photo
 * expands it.
 */
function ExpandingPanels() {
  const [state, dispatch] = useReducer(carouselReducer, initialState);
  const reduceMotion = useReducedMotion() ?? false;
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Drive the progress bar straight on the DOM so the panels don't re-render each frame.
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / AUTOPLAY_MS, 1);
      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`;
      }
      if (progress >= 1) {
        dispatch({ type: "next" });
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [state.active, state.firstPhoto]);

  return (
    <div className="hidden h-[420px] gap-4 sm:flex lg:h-[580px]">
      {Array.from({ length: PANEL_COUNT }, (_, panel) => {
        const space = spaces[(state.firstPhoto + panel) % spaces.length];
        const isActive = panel === state.active;

        return (
          <button
            key={panel}
            type="button"
            onClick={() => dispatch({ type: "select", panel })}
            aria-label={isActive ? space.alt : `Show photo: ${space.alt}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "group relative min-w-0 overflow-hidden bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2",
              isActive ? "cursor-default" : "cursor-pointer"
            )}
            style={{
              flexGrow: isActive ? MAIN_GROW : SIDE_GROW,
              flexBasis: 0,
              transition: reduceMotion
                ? undefined
                : `flex-grow ${EXPAND_MS}ms ${EXPAND_EASING}`,
            }}
          >
            <AnimatePresence initial={false}>
              <SpacePhoto
                key={space.id}
                space={space}
                sizes="(max-width: 1200px) 45vw, 480px"
                fade={!reduceMotion}
              />
            </AnimatePresence>

            {isActive && (
              <div
                aria-hidden
                className="absolute top-4 right-4 h-1 w-24 overflow-hidden rounded-full bg-white/30 backdrop-blur-sm"
              >
                <div
                  ref={progressRef}
                  className="h-full w-0 rounded-full bg-white"
                />
              </div>
            )}

            {!isActive && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Phones: one large photo with a peek of the next, swiped by hand. */
function SwipeRow() {
  return (
    <div className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
      {spaces.map((space) => (
        <div
          key={space.id}
          className="relative aspect-[3/4] w-[86%] shrink-0 snap-start overflow-hidden bg-neutral-100"
        >
          <SpacePhoto space={space} sizes="86vw" fade={false} />
        </div>
      ))}
    </div>
  );
}

export function ExploreSpaceCarousel() {
  return (
    <section aria-label="Explore our space" className="bg-white py-10 lg:py-20">
      <div className={siteContainerClass}>
        <ScrollReveal className="mb-6 flex flex-col gap-3 lg:mb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 lg:text-[2.5rem] lg:leading-tight">
            Explore Our Space
          </h2>
          <p className="max-w-md text-[15px] leading-snug text-neutral-600 lg:max-w-[34rem] lg:text-right">
            From the heart of the city to calmer corners, our coworking spaces{" "}
            <br className="hidden lg:block" />
            are designed to keep you productive, connected, and inspired.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ExpandingPanels />
          <SwipeRow />
        </ScrollReveal>

        <div className="mt-8 flex justify-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-400 hover:bg-neutral-50"
          >
            View more photos
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
