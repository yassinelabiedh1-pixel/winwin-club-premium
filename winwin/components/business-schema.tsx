import {
  CLUB_ADDRESS,
  CLUB_EMAIL,
  CLUB_FACEBOOK_URL,
  CLUB_INSTAGRAM_URL,
  CLUB_MAPS_URL,
  CLUB_PHONE_URL,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";

/**
 * Tells Google what the club is, where it is and when it's open, so it can show
 * the address, hours and phone number in search results.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Winwin Club",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/img1.webp`,
  telephone: CLUB_PHONE_URL.replace("tel:", ""),
  email: CLUB_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: CLUB_ADDRESS.split(",")[0],
    addressLocality: "Menzah 7, Ariana",
    addressRegion: "Ariana",
    addressCountry: "TN",
  },
  hasMap: CLUB_MAPS_URL,
  // Closing at 2am the next day is written as closes 02:00 after opens 08:00.
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "02:00",
  },
  priceRange: "7 DT - 290 DT",
  currenciesAccepted: "TND",
  sameAs: [CLUB_INSTAGRAM_URL, CLUB_FACEBOOK_URL],
};

export function BusinessSchema() {
  return (
    <script
      type="application/ld+json"
      // The content is our own constant, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
