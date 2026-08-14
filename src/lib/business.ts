export const business = {
  name: "Eggstravaganza",
  legalName: "Eggstravaganza Corp.",
  tagline: "Mexican Cuisine",
  subtagline: "All-day breakfast & Mexican kitchen in Sunnyside, NY",
  location: {
    street: "4120 39th St",
    city: "Sunnyside",
    state: "NY",
    full: "4120 39th St, Sunnyside, NY",
  },
  phone: "929-688-1513",
  phoneHref: "tel:+19296881513",
  website: "taquitoshop.com",
  orderUrl:
    "https://www.doordash.com/store/eggstravaganza-mexican-cuisine-queens-24944751/81588762/?srsltid=AfmBOooZR-EPiCIA248y-SxOyb4FEw-hxylLxLJ--EZf4ee4XrhC3sJS",
  socials: {
    facebook: "https://facebook.com/eggstravaganza",
    instagram: "https://instagram.com/eggstravaganza",
    handle: "@eggstravaganza",
  },
  hours: [
    { day: "Mon – Fri", time: "6:00 AM – 6:00 PM" },
    { day: "Saturday", time: "7:00 AM – 4:00 PM" },
    { day: "Sunday", time: "7:00 AM – 3:00 PM" },
  ],
  press: [
    { quote: "Formidable breakfast tacos.", source: "NY Eater" },
  ],
} as const
