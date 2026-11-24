# Cinevea

Voice and text movie booking for desktop Chrome, with a seven-step booking flow and a visible guide avatar.

Start with **START-HERE.md** for running locally and the new seat-hold SQL migration. This edition needs no AI key. **DEMO-RUNBOOK.md** provides the presentation journey. **CHANGES.md** lists changes from the supplied archive. **VALIDATION.md** separates automated evidence from checks that still need a live device or server.

## Commands

```text
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
```

Use Node.js 22.12 or newer. Keep all private API secrets in server settings. The supplied `.env.production` contains the same public Supabase connection values as the original project.

## Main files

- `src/App.tsx`: booking controller, catalogue loading, validated actions, holds and confirmation.
- `src/components/booking/BookingViews.tsx`: seven booking screens and layout choices.
- `src/components/booking/MovieTicket.tsx`: one QR ticket per seat and automatic one-ticket-per-page printing.
- `src/components/VoiceInput.tsx`, `HandsFreeVoice.tsx`: voice controls and turn-taking interface.
- `src/lib/speech.ts`, `voiceConversation.ts`: browser speech and session lifecycle.
- `src/lib/movieConversation.ts`: local catalogue-based genre suggestions.
- `src/lib/conversation.ts`: booking command interpretation (active frontend uses deterministic parsing).
- `src/polish.css`: final layout/theme overrides; `src/light.css` handles light components; `src/cinema.css` preserves ticket/print rules.
- `src/components/AccessibilitySettings.tsx`: display preferences, available before login.
- `src/components/GuideSettingsDialog.tsx`: external voice/settings dialog.
- `supabase/functions`: legacy server sources and existing catalogue import; optional AI is not called by this frontend.
- `supabase/migrations/20261124000000_release_own_hold.sql`: new authenticated hold-release function.

This remains a university prototype: payment is a method choice only, and QR tickets do not grant real cinema entry. Voice recognition is browser-provided; the assistant does not search the web or guarantee recognition accuracy. No live service credentials, deployment or user testing are bundled.
