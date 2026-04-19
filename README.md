# The Sortie — TC Jet Pilots

Marketing site for **The Sortie**, the TC Jet Pilots' annual four-day jet ski weekend on Lake Pepin. Live at [tcjetpilots.com](https://tcjetpilots.com).

## About TC Jet Pilots

TC Jet Pilots (TCJP) is a crew of jet ski riders out of Minneapolis and the official [AWA](https://americanwatercraft.org/) chapter for Minnesota and surrounding states. Standups, sit-downs, vintage, modern — it doesn't matter what you ride.

We ride Lake Minnetonka, Lake Pepin, and wherever else looks good all summer, wrench on skis through the winter, and get together year-round for bonfires, road trips, and hangouts. No dues, no sign-up form — everything gets planned in the [Facebook group](https://www.facebook.com/groups/tcjetpilots).

## About The Sortie

For 20+ years, more than 100 riders and their families have made the trip to Hok-Si-La Park on Lake Pepin every August. Four days of open-water riding, blufftop camping, a Saturday pig roast, and a big raffle that sends someone home with a jet ski.

The 2026 Sortie runs **August 20–23** at Hok-Si-La Park in Lake City, MN. [RSVP on Facebook](https://www.facebook.com/events/2507939626270296/).

## About This Site

Static single-page site built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/), deployed to GitHub Pages.

### Local development

```sh
npm install
npm run dev        # local dev server at localhost:4321
npm run build      # production build to ./dist/
npm run preview    # preview the production build
```

### Project structure

```
public/
  images/          # event photos (webp)
  videos/          # event clips (mp4)
src/
  components/      # Header, Footer, Analytics
  layouts/         # Base layout
  pages/           # index.astro, 404.astro
  styles/          # global styles
astro.config.mjs   # sitemap + Tailwind config
```
