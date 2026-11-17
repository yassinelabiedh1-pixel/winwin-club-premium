export type ClubPhoto = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Where to anchor the crop when the photo is shown in a fixed-size frame. */
  position: string;
};

const photo = (p: ClubPhoto) => p;

const openArea = photo({
  id: "open-area",
  src: "/img1.webp",
  alt: "Open coworking area with desks and a long counter",
  width: 765,
  height: 1020,
  position: "center",
});
const authorTalk = photo({
  id: "author-talk",
  src: "/community/author-talk.webp",
  alt: "Guests in conversation at a talk in front of the club's green brick wall",
  width: 1000,
  height: 1334,
  position: "center 70%",
});
const sharedTable = photo({
  id: "shared-table",
  src: "/img2.webp",
  alt: "Members working together at a shared table",
  width: 765,
  height: 1020,
  position: "center",
});
const studySession = photo({
  id: "study-session",
  src: "/community/study-session.webp",
  alt: "A smiling student giving a thumbs up over her revision notes",
  width: 960,
  height: 1280,
  position: "center 35%",
});
const windowDesks = photo({
  id: "window-desks",
  src: "/img3.webp",
  alt: "Members working at desks by a large window",
  width: 765,
  height: 1020,
  position: "center",
});
const workshop = photo({
  id: "workshop",
  src: "/community/workshop.webp",
  alt: "A small group workshop around a shared table",
  width: 1000,
  height: 1334,
  position: "center 55%",
});
const bookLaunch = photo({
  id: "book-launch",
  src: "/community/book-launch.webp",
  alt: "An author presenting his new book at the club",
  width: 915,
  height: 1280,
  position: "center 35%",
});
const eveningWindow = photo({
  id: "evening-window",
  src: "/community/evening-window.webp",
  alt: "A member working by the big window in the evening",
  width: 949,
  height: 1280,
  position: "center 55%",
});
const focusHeadphones = photo({
  id: "focus-headphones",
  src: "/community/focus-headphones.webp",
  alt: "A member with headphones taking a sip while working on a laptop",
  width: 662,
  height: 1280,
  position: "center 45%",
});
const goodVibes = photo({
  id: "good-vibes",
  src: "/community/good-vibes.webp",
  alt: "A member making peace signs in front of the red brick wall",
  width: 720,
  height: 1280,
  position: "center 35%",
});
const standingDesk = photo({
  id: "standing-desk",
  src: "/community/standing-desk.webp",
  alt: "A member on a call at a high table with her laptop",
  width: 720,
  height: 1600,
  position: "center 15%",
});
const coffeeBar = photo({
  id: "coffee-bar",
  src: "/community/coffee-bar.webp",
  alt: "Two members taking a break at the coffee bar",
  width: 1000,
  height: 599,
  position: "center 40%",
});

/** The home carousel. Only portrait 3:4 photos, so they all crop the same way. */
export const carouselPhotos: ClubPhoto[] = [
  openArea,
  authorTalk,
  sharedTable,
  studySession,
  windowDesks,
  workshop,
  bookLaunch,
  eveningWindow,
];

/** The gallery page shows every photo, mixed so shapes and subjects alternate. */
export const galleryPhotos: ClubPhoto[] = [
  authorTalk,
  openArea,
  goodVibes,
  studySession,
  coffeeBar,
  standingDesk,
  workshop,
  sharedTable,
  focusHeadphones,
  bookLaunch,
  windowDesks,
  eveningWindow,
];
