"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ClubPhoto } from "@/lib/photos";

const controlClassName =
  "flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function Lightbox({
  photos,
  index,
  onClose,
  onChange,
}: {
  photos: ClubPhoto[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];

  const showPrevious = useCallback(
    () => onChange((index - 1 + photos.length) % photos.length),
    [index, onChange, photos.length]
  );
  const showNext = useCallback(
    () => onChange((index + 1) % photos.length),
    [index, onChange, photos.length]
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, showPrevious, showNext]);

  // Keep the page behind still while the viewer is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0E27]/95 px-4 py-16 sm:px-20"
      onClick={onClose}
    >
      <div className="relative h-full w-full max-w-5xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative h-full w-full"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1100px) 100vw, 1024px"
              className="object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="absolute top-5 left-5 text-sm font-medium text-white/70 tabular-nums">
        {index + 1} / {photos.length}
      </p>

      <button
        ref={closeRef}
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`absolute top-3 right-3 ${controlClassName}`}
      >
        <X className="size-5" />
      </button>

      <button
        type="button"
        aria-label="Previous photo"
        onClick={(event) => {
          event.stopPropagation();
          showPrevious();
        }}
        className={`absolute bottom-4 left-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 ${controlClassName}`}
      >
        <ChevronLeft className="size-5" />
      </button>

      <button
        type="button"
        aria-label="Next photo"
        onClick={(event) => {
          event.stopPropagation();
          showNext();
        }}
        className={`absolute right-4 bottom-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 ${controlClassName}`}
      >
        <ChevronRight className="size-5" />
      </button>
    </motion.div>
  );
}

/** A loose masonry grid. Clicking a photo opens it full screen. */
export function PhotoGallery({ photos }: { photos: ClubPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    // Return focus to the photo that was open, for keyboard users.
    if (openIndex !== null) triggerRefs.current[openIndex]?.focus();
    setOpenIndex(null);
  }, [openIndex]);

  return (
    <>
      <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            ref={(element) => {
              triggerRefs.current[index] = element;
            }}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open photo: ${photo.alt}`}
            className="group mb-3 block w-full cursor-zoom-in overflow-hidden bg-neutral-100 break-inside-avoid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 sm:mb-4"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw"
              className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            photos={photos}
            index={openIndex}
            onClose={close}
            onChange={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
