export type Tier = "student" | "pro";

type Prices = Record<Tier, number>;

export type MonthlyPass = {
  id: string;
  name: string;
  hours: string;
  /** Where the pass's access sits on the day timeline, as percentages. */
  access: { from: number; to: number };
  prices: Prices;
};

export type DaysPass = {
  id: string;
  name: string;
  days: number;
  validity: string;
  prices: Prices;
};

export type HourlyRate = {
  id: string;
  duration: string;
  prices: Prices;
};

const AFTERNOON_START = 40;
const EVENING_START = 66.67;

/** Labels for the day timeline. The closing time is deliberately not a number. */
export const dayTicks = [
  { label: "7am/8am", at: 0 },
  { label: "1pm", at: AFTERNOON_START },
  { label: "5pm", at: EVENING_START },
  { label: "Closing", at: 100 },
];

export const monthlyPasses: MonthlyPass[] = [
  {
    id: "full-access",
    name: "Full Access Pass",
    hours: "Every day, during opening hours",
    access: { from: 0, to: 100 },
    prices: { pro: 290, student: 240 },
  },
  {
    id: "morning",
    name: "Morning Pass",
    hours: "From 7am/8am to 1pm",
    access: { from: 0, to: AFTERNOON_START },
    prices: { pro: 90, student: 90 },
  },
  {
    id: "extended",
    name: "Extended Pass",
    hours: "From 1pm until closing",
    access: { from: AFTERNOON_START, to: 100 },
    prices: { pro: 190, student: 190 },
  },
  {
    id: "night-walkers",
    name: "Night Walkers Pass",
    hours: "From 5pm until closing",
    access: { from: EVENING_START, to: 100 },
    prices: { pro: 100, student: 100 },
  },
];

export const daysPasses: DaysPass[] = [
  {
    id: "5-days",
    name: "5 Days Pass",
    days: 5,
    validity: "1 month",
    prices: { pro: 75, student: 60 },
  },
  {
    id: "10-days",
    name: "10 Days Pass",
    days: 10,
    validity: "3 months",
    prices: { pro: 135, student: 110 },
  },
  {
    id: "20-days",
    name: "20 Days Pass",
    days: 20,
    validity: "3 months",
    prices: { pro: 240, student: 200 },
  },
];

export const firstVisitRates: HourlyRate[] = [
  {
    id: "first-up-to-4",
    duration: "Up to 4 hours",
    prices: { pro: 10, student: 10 },
  },
  {
    id: "first-over-4",
    duration: "More than 4 hours",
    prices: { pro: 20, student: 15 },
  },
];

export const regularRates: HourlyRate[] = [
  {
    id: "regular-up-to-3",
    duration: "Up to 3 hours",
    prices: { pro: 8, student: 7 },
  },
  {
    id: "regular-3-to-4",
    duration: "More than 3 and up to 4 hours",
    prices: { pro: 10, student: 10 },
  },
  {
    id: "regular-4-to-5",
    duration: "More than 4 and up to 5 hours",
    prices: { pro: 15, student: 13 },
  },
  {
    id: "regular-over-5",
    duration: "More than 5 hours",
    prices: { pro: 20, student: 15 },
  },
];

export function formatPrice(amount: number) {
  return `${amount} DT`;
}

export function lowestPrice(items: { prices: Prices }[], tier: Tier) {
  return Math.min(...items.map((item) => item.prices[tier]));
}

export function pricePerDay(pass: DaysPass, tier: Tier) {
  return pass.prices[tier] / pass.days;
}
