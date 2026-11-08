# Reservation checklist

Reservations are off the site until the Booklyne profile is ready.
Booking link: https://www.booklyne.com/book/winwin-club

## Before connecting

- [ ] Client confirms the Booklyne profile is ready
- [ ] Address on Booklyne matches the site
- [ ] Opening hours on Booklyne match the site
- [ ] Prices and pass names on Booklyne match the site
- [ ] Photos on Booklyne are of the club

## Where to add reservations

Primary spots:

- [ ] **Navbar:** "Book" button next to the links, and in the phone menu (`components/navbar.tsx`)
- [ ] **Home hero:** "Book" button next to "Check Pricing" (`app/components/home-hero.tsx`)
- [ ] **Home page:** bring back the "Book your appointment" section between pricing and the footer (`app/page.tsx`)
- [ ] **Pricing page:** "Book" button in the "Visit us to get your membership" block (`app/components/pricing-page-content.tsx`)

Secondary spots:

- [ ] **Contact page:** add a booking link to the contact details, and restore "book a tour" in the intro if tours are bookable (`app/components/contact-hero.tsx`)
- [ ] **Contact form:** change the "Visit the club" topic back to "Book a tour" if tours are bookable (`components/contact-form.tsx`)
- [ ] **Footer:** add a "Book" link under Explore (`components/footer.tsx`)

## After connecting

- [ ] Add the Booklyne link to `lib/site.ts`, then use it everywhere above
- [ ] Mention Booklyne in the privacy policy, under "Who we share it with" (`app/privacy/page.tsx`)
- [ ] Test each link on desktop and on a phone

The earlier "Book your appointment" section is in git history, in `app/components/appointment-booking-section.tsx`.
