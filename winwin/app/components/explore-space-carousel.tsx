"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

import { siteContainerClass } from "@/lib/layout";
import { ScrollReveal } from "@/components/scroll-reveal";

const AUTOPLAY_MS = 4000;
const SLIDE_MS = 950;
const GAP_PX = 16;
const MAIN_FLEX = 4.2;
const SIDE_FLEX = 1;
const MOBILE_MAX_WIDTH_PX = 640;
const MOBILE_SLIDE_RATIO = 0.86;
const SLIDE_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";
const SLIDE_TRANSITION = `transform ${SLIDE_MS}ms ${SLIDE_EASING}`;

const spaces = [
  {
    id: "open-area",
    alt: "Open coworking area with desks and a long counter",
    image: "/img1.webp",
  },
  {
    id: "shared-table",
    alt: "Members working together at a shared table",
    image: "/img2.webp",
  },
  {
    id: "window-desks",
    alt: "Members working at desks by a large window",
    image: "/img3.webp",
  },
  {
    id: "shared-table-repeat",
    alt: "Members working together at a shared table",
    image: "/img2.webp",
  },
] as const;

function getVisibleSpaces(activeIndex: number) {
  return Array.from(
    { length: spaces.length },
    (_, i) => spaces[(activeIndex + i) % spaces.length]
  );
}

function measureWidths(containerWidth: number) {
  // On phones, show one large photo with a peek of the next instead of thin strips.
  if (containerWidth < MOBILE_MAX_WIDTH_PX) {
    const slide = containerWidth * MOBILE_SLIDE_RATIO;
    return { main: slide, side: slide };
  }

  const gaps = GAP_PX * 3;
  const available = containerWidth - gaps;
  const unit = available / (MAIN_FLEX + SIDE_FLEX * 3);

  return {
    main: unit * MAIN_FLEX,
    side: unit * SIDE_FLEX,
  };
}

type TrackItem = (typeof spaces)[number] & { clone?: boolean };

export function ExploreSpaceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [widths, setWidths] = useState({ main: 0, side: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);
  const isSlidingRef = useRef(false);
  const pendingSlideRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      setWidths(measureWidths(container.offsetWidth));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!isSliding || !pendingSlideRef.current || !trackRef.current) return;

    pendingSlideRef.current = false;
    const track = trackRef.current;
    const offset = -(widths.main + GAP_PX);

    track.style.transition = "none";
    track.style.transform = "translate3d(0, 0, 0)";
    track.offsetHeight;
    track.style.transition = SLIDE_TRANSITION;
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  }, [isSliding, widths.main]);

  const hasWidths = widths.main > 0 && widths.side > 0;

  const finishSlide = useCallback(() => {
    if (!isSlidingRef.current || !trackRef.current) return;

    isSlidingRef.current = false;

    const track = trackRef.current;
    track.style.transition = "none";
    track.style.transform = "translate3d(0, 0, 0)";

    flushSync(() => {
      setActiveIndex((i) => (i + 1) % spaces.length);
      setIsSliding(false);
    });

    requestAnimationFrame(() => {
      if (trackRef.current) {
        trackRef.current.style.transition = "";
      }
    });
  }, []);

  const goNext = useCallback(() => {
    if (!hasWidths || isSlidingRef.current) return;

    if (reducedMotionRef.current) {
      setActiveIndex((i) => (i + 1) % spaces.length);
      setProgress(0);
      return;
    }

    isSlidingRef.current = true;
    pendingSlideRef.current = true;
    setIsSliding(true);
    setProgress(0);
  }, [hasWidths]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== track || event.propertyName !== "transform") return;
      finishSlide();
    };

    track.addEventListener("transitionend", onTransitionEnd);
    return () => track.removeEventListener("transitionend", onTransitionEnd);
  }, [finishSlide]);

  useEffect(() => {
    if (isSliding || !hasWidths) return;

    setProgress(0);
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / AUTOPLAY_MS, 1);
      setProgress(p);
      if (p >= 1) {
        goNext();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeIndex, isSliding, hasWidths, goNext]);

  const visibleItems = getVisibleSpaces(activeIndex);
  const trackItems: TrackItem[] = isSliding
    ? [...visibleItems, { ...visibleItems[0], clone: true }]
    : visibleItems;

  function getPanelWidth(index: number): number {
    if (!hasWidths) return 0;
    if (!isSliding) {
      return index === 0 ? widths.main : widths.side;
    }
    if (index === 0 || index === 1) return widths.main;
    return widths.side;
  }

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
          <div ref={containerRef} className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-full"
            style={{
              gap: GAP_PX,
              willChange: isSliding ? "transform" : "auto",
              transform: "translate3d(0, 0, 0)",
            }}
          >
            {trackItems.map((space, index) => {
              const isMain = !isSliding ? index === 0 : index === 1;
              const isExitingMain = isSliding && index === 0;
              const panelWidth = getPanelWidth(index);
              const itemKey = space.clone ? `${space.id}-clone` : space.id;

              return (
                <div
                  key={itemKey}
                  className="flex shrink-0 flex-col"
                  style={
                    hasWidths
                      ? { width: panelWidth }
                      : {
                          flexGrow: isMain ? MAIN_FLEX : SIDE_FLEX,
                          flexShrink: 0,
                          flexBasis: 0,
                        }
                  }
                >
                  <div className="relative h-[340px] w-full overflow-hidden bg-neutral-100 sm:h-[400px] lg:h-[480px]">
                    <Image
                      src={space.image}
                      alt={space.alt}
                      fill
                      className="object-cover object-center"
                      sizes={
                        isMain || isExitingMain
                          ? "(max-width: 640px) 86vw, 58vw"
                          : "(max-width: 640px) 86vw, 14vw"
                      }
                    />

                    {isMain && !isSliding && (
                      <div
                        className="absolute top-4 right-4 h-1 w-24 overflow-hidden rounded-full bg-white/30 backdrop-blur-sm"
                        role="progressbar"
                        aria-valuenow={Math.round(progress * 100)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Next slide in ${Math.ceil((1 - progress) * (AUTOPLAY_MS / 1000))} seconds`}
                      >
                        <div
                          className="h-full rounded-full bg-white transition-[width] duration-75 ease-linear"
                          style={{ width: `${progress * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
