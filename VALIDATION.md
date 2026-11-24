# Validation of the polished browser edition

## Checks completed

- TypeScript application checking passed.
- ESLint: no errors, one existing Fast Refresh warning in `src/hooks/useAuth.tsx`.
- Vite production build passed.
- Isolated app tests passed: **139 assertions and eight axe label/structure audits**.
- QR is rendered as SVG, rasterised and decoded in the regression suite. Seat-specific tickets and default one-ticket-per-page layout are checked.
- Speech tests use browser fakes; they verify opening playback, enabled spoken replies, selected voice/rate, hands-free turn-taking and cancellation. Real speakers/microphones remain unverified.
- Interface checks cover the header theme switch, absence of Display, stable accessible heading text, recognition-locale storage and voice preferences.
- Booking tests cover mixed categories, seat selection without quantity changes, reservation failure, confirmation failure, editing, hold-release invocation, explicit spoken confirmation and start-over.
- Conversation tests cover catalogue-based fallback recommendations and no invented listings when there is no catalogue.

## What was not verified

No live microphone, signed-in Supabase session or AI provider key was supplied. No real booking writes or server deployments were performed. The new SQL release function was reviewed but not executed against PostgreSQL here. Run the migration and verify owner-only release, other-user denial, expiry and confirmed-seat protection in your project.

The local Chromium executable failed to launch because this environment blocks its required socket operation. No rendered website screenshots or browser visual approval are claimed. Light/dark cards, responsive layouts, zoom, the full-page reel artwork and print pagination need checking on your device. Screenshot placeholders remain in the PPT.

Axe checks use jsdom and exclude browser-dependent colour contrast. Seven mathematical checks, using the final polish overrides, cover text, selected, focus and seat-border token pairs in all four light/dark/monochrome combinations. They do not prove every rendered foreground/background combination meets WCAG. No accessibility certification or screen-reader validation is claimed.

Server transcription and AI need configured/deployed services. Their real accuracy, latency, usage costs and error behavior remain unverified. Server transcription is recorded turn-taking, not ChatGPT's full-duplex audio. Catalogue recommendations are not online search.

The required three-user usability test remains outstanding. Automated assertions are not substitutes for participant observations. Record genuine findings before filling that slide.

## Device checklist before presenting

Follow DEMO-RUNBOOK.md. Check the current theme at desktop width and 390px, 200% zoom, keyboard focus, controls with settings collapsed, voice permissions, speaker output, recognition language, uninterrupted ticket categories, actual seat editing after Review, final confirmation and both print modes. Stop once the rehearsed flow works; keep the previous ZIP and a genuine screen recording as fallbacks.

Ticket artwork, QR payload, cinema.css and index.css are preserved. MovieTicket now always uses print-separate and no longer displays a layout selector. New generic layout overrides are in polish.css; light component styling is in light.css. Header theme switching and removal of Display are covered by regression tests.
