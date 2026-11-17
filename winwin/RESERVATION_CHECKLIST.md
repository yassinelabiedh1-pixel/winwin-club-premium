# Reservation checklist

Booking link: https://www.booklyne.com/book/winwin-club-2 (`CLUB_BOOKING_URL` in `lib/site.ts`)

## Booklyne profile

- [x] Profile is live
- [x] Address matches the site (39 Avenue Abou Loubaba El Ensari, Menzah 7)
- [ ] Opening hours match the site: Booklyne shows 00:00–23:45 most days, the site says 8am to 2am
- [ ] Pass names match the site: Booklyne says "Usual" and "Passenger", the site says "Regular" and "First visit" (prices match)
- [ ] Decide whether the site should mention the meeting room (20 DT / hour on Booklyne)
- [ ] Photos on Booklyne are of the club

## Where reservations appear

Done:

- [x] **Home hero:** "Book Now" button (`app/components/home-hero.tsx`)
- [x] **Privacy policy:** Booklyne listed under "Who we share it with" (`app/privacy/page.tsx`)

Still to add, if wanted:

- [ ] **Navbar:** "Book" button next to the links, and in the phone menu (`components/navbar.tsx`)
- [ ] **Home page:** bring back the "Book your appointment" section between pricing and the footer (`app/page.tsx`)
- [ ] **Pricing page:** "Book" button in the "Visit us to get your membership" block (`app/components/pricing-page-content.tsx`)
- [ ] **Contact page:** booking link in the contact details (`app/components/contact-hero.tsx`)
- [ ] **Contact form:** change the "Visit the club" topic to "Book a tour" if tours are bookable (`components/contact-form.tsx`)
- [ ] **Footer:** "Book" link under Explore (`components/footer.tsx`)

The earlier "Book your appointment" section is in git history, in `app/components/appointment-booking-section.tsx`.
