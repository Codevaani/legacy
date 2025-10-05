# Performance Tweaks – Iteration 3

This supplement focuses on incremental, practical optimizations identified after reviewing the current Next.js 14 codebase, MongoDB data access layer, and Firebase-driven auth flow. None of the items below are implemented yet—they are recommendations for future performance work.

## Rendering & Routing
1. **Adopt streaming server components for prime landing routes** (`app/page.tsx`, `components/featured-hotels.tsx`) so hero content appears immediately while secondary sections stream in.
2. **Move analytics-heavy admin widgets to React server components** to eliminate client hydration cost when charts are not required on initial load.
3. **Consolidate parallel data requests in server actions** (e.g., bookings + hotels + users combos on admin overview) to leverage built-in request coalescing instead of multiple client fetches.
4. **Enable route segment-level caching (`revalidateTag`) for marketing pages** so the home and partner landing segments can revalidate independently without rebuilding the entire app tree.
5. **Introduce route groups for `admin` and `partner` sections** to prefetch common shell UI once and lazy-load feature-specific modules only when needed.

## Data Access & APIs
6. **Apply `.lean()` in read-only Mongo queries** within `app/api` handlers (hotels, bookings, reviews) to skip document hydration overhead for large result sets.
7. **Return pagination cursors instead of raw skip/limit** on booking and message APIs to avoid growing MongoDB skip cost and improve perceived latency under large datasets.
8. **Implement `select` projections in API responses** to trim unused fields (e.g., omit `metadata` blobs from `/api/security` list calls by default) and shrink payload size.
9. **Co-locate frequently joined lookups (hotel + owner)** using MongoDB aggregation pipelines with `$lookup` and `$project` so the database does the merge instead of repeated server-round trips.
10. **Introduce response caching headers (`s-maxage`, `stale-while-revalidate`)** for read-mostly endpoints (featured hotels, reviews) to let Vercel’s edge cache absorb traffic spikes.

## Client Execution
11. **Patch SWR keys to include stable filters** and enable `keepPreviousData` to prevent waterfall renders when changing pages or filters in admin tables.
12. **Replace ad-hoc `fetch` loops with `useTransition` + optimistic updates** on partner dashboards to keep the UI responsive during API mutations.
13. **Wrap large icon packs and chart libraries in `dynamic()` imports with `ssr: false`** so first paint isn’t blocked by optional visualizations.
14. **Throttle scroll-linked effects and observers** in rich listing components (`components/hotel-list.tsx`, `partner/booking-analytics.tsx`) using `requestIdleCallback` for non-critical recalculations.
15. **Adopt React’s `useDeferredValue` for filter text inputs** (search, city filters) to decouple keystrokes from expensive list filtering.

## Assets & Media
16. **Produce multiple ImageKit renditions per hotel image** (thumbnail, card, hero) and request via query parameters to avoid serving oversized images to smaller breakpoints.
17. **Inline critical SVG icons** (logo, primary controls) to reduce HTTP requests and enable CSS-based theming without additional network cost.
18. **Enable `next/image` blur placeholders sourced from ImageKit’s low-quality preview** to improve perceived load while full-resolution assets stream in.
19. **Add `sizes` attributes to hero and card images** to let the browser choose the smallest matching responsive rendition.
20. **Bundle font subsets per locale** (Latin, Latin-extended) with Next’s `@next/font` so unused glyphs aren’t shipped to all users.

## Build & Infrastructure
21. **Activate Turbopack for dev mode** (experimental flag) to accelerate local rebuilds and shorten the feedback loop for performance tuning work.
22. **Run `next build --profile` with Vercel Speed Insights** to capture flamegraphs for server components and identify slow serialization boundaries.
23. **Introduce Lighthouse CI in the pipeline** to gate deployments on Core Web Vitals regression thresholds.
24. **Set up automated bundle size alerts** via `@next/bundle-analyzer` + Danger so new dependencies that inflate chunks are caught in pull requests.
25. **Leverage Vercel Edge Middleware caching for geo-static content** (e.g., location-based featured hotels) by storing serialized payloads in Edge Config with periodic revalidation.

Implementing these tweaks—prioritized by impact and effort—will further reduce server response times, shrink client bundles, and improve perceived performance across guest, partner, and admin experiences.
