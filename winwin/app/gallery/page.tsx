import type { Metadata } from "next";

import { PhotoGallery } from "@/app/components/photo-gallery";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { siteContainerClass } from "@/lib/layout";
import { galleryPhotos } from "@/lib/photos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gallery | Winwin CLUB",
  description:
    "Photos of Winwin Club: the space, our members, talks, workshops and study sessions.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="relative bg-white pt-[72px]">
        <Navbar />
        <div className={cn(siteContainerClass, "py-12 lg:py-16")}>
          <div className="mb-8 flex flex-col gap-3 lg:mb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <h1 className="text-[2.4rem] font-bold leading-[1.1] tracking-tight text-neutral-950 lg:text-[3rem]">
              Gallery
            </h1>
            <p className="max-w-md text-[15px] leading-snug text-neutral-600 lg:text-right">
              The space, our members, and the talks, workshops and late study
              sessions that happen here. Tap any photo to see it full size.
            </p>
          </div>

          <PhotoGallery photos={galleryPhotos} />
        </div>
      </section>

      <Footer />
    </>
  );
}
