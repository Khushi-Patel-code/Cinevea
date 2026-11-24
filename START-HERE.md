# Cinevea polished browser edition

This is the full project based on your latest `Cinevea-main (2).zip`, archive commit `9b1f9201147577fb0eac96239f81989b70289ca6`. Extract it into a separate folder. Your hosted website has not been changed. Existing public Supabase connection settings are preserved.

## Run locally

Use Node.js 22.12 or newer. Open the folder containing package.json and run:

```powershell
npm ci
```

If you do not already have `.env.local`, copy the supplied public settings:

```powershell
Copy-Item .env.production .env.local
npm run dev
```

Do not overwrite a working `.env.local`. Open the localhost address in Chrome. Existing login and catalogue services use the same Supabase project. Never place a service-role key or AI API secret in a VITE variable.

## Important seat editing fix

Before demonstrating **Review → Edit tickets/seats → Review again**, open the team's Supabase dashboard SQL editor and run the complete file:

`supabase/migrations/20261124000000_release_own_hold.sql`

This adds `release_my_seat_hold`. It checks authentication and hold ownership, and releases held seats, not confirmed bookings. The frontend calls it before returning to an earlier selection. Without it the site still loads, but an older hold can remain for up to five minutes and the interface explains that limitation. No migration was run against your live database here. Test this on your project before presenting.

Do not re-run all historical SQL manually. Use the single new migration for the existing deployed project.

## Voice — no AI key required

This edition uses browser speech recognition and speech synthesis. There is no transcription-service selector or active external AI call in the frontend. Existing authentication and booking still use Supabase.

Open the movie guide: spoken replies now start enabled and the opening response plays from your click. Use its speaker icon to mute/unmute. Voice settings open in a separate dialog; choose Guide voice, Reading speed, Recognition language and Pause before sending there. Google UK English Female is selected by default when supplied by your browser; otherwise a named English voice is used. You can change it afterward. Use Preview voice on the actual presentation laptop. Dictation is the microphone icon; the waveform icon starts hands-free turn-taking. Closing/pausing stops listening. Browser speech can require internet and microphone permission.

If silent: check device volume/output, unmute the guide, open Settings and choose another installed voice, then Preview voice. Browser/OS voices differ. We fixed the default-off regression and added playback-error feedback, but real audio must be checked on your device. Recognition is not guaranteed error-free.

Legacy Supabase function sources remain for compatibility with your original project, but this frontend does not invoke AI/transcription functions. No AI deployment or AI billing setup is required.

## Design and controls

- Dark charcoal/navy, red primary actions and ochre selected states. Final layout overrides are in `src/polish.css`; component-specific light styling is in `src/light.css`.
- Light/dark card themes via the sun/moon icon. Display menu removed. Use browser zoom for larger text; animation respects the operating system reduced-motion preference.
- Location and movie Grid/List/Carousel options; grid is the default. No automatic carousel rotation.
- Plain headings, no redundant promotional footers, movie context during later steps.
- Compact conversation bubbles, dictation/hands-free icons, separate voice dialog and an information popover.
- Header sun/moon toggle; sign-in reel background remains identical across modes.
- Full-page photographic-style reel artwork (generated asset), tighter panels, icon view controls, no repeated movie/payment heading.
- Ticket artwork/QR preserved; printing now defaults to one ticket per page.
- Separate printable ticket for each seat, each with a seat-specific QR. Printing defaults to one ticket per page; no layout choice is needed. Print images require browser background/image settings and loaded posters.

Payment choices are display-only. No payment processor or card form is implemented. Tickets are prototype booking records, not cinema admission credentials. This implementation limit remains documented here.

## Presentation readiness

Run the exact journey in DEMO-RUNBOOK.md. Automated checks do not replace live microphone, Supabase or screen-reader testing. Keep the earlier ZIP as a fallback and record a genuine successful run. The separate PPT still needs actual screenshots and three-user testing results.
