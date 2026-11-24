# Final polish changes

- Full-page reel/film-strip artwork; “Got a movie in mind?” sign-in heading.
- Smaller header/account icon, closer content spacing and empty toolbar removal.
- One Now showing heading and one Payment legend; removed section eyebrows.
- Standard grid/list/carousel icon buttons with accessible names; filter/sort on the same row.
- Dark neutral navy panels; corrected light theme text/surface tokens; header sun/moon button and outside dismissal for Display.
- Compact chat bubbles and composer; voice settings in a separate keyboard-contained dialog; privacy information icon.
- Spoken replies enabled when opening the guide, browser playback resumed before speaking, utterance retained, playback failure feedback and mute control.
- Browser recognition preserved; removed client server-transcription files and API selector. Active booking assistant uses existing deterministic parsing and local genre suggestions.
- Existing Supabase configuration/migrations preserved. Ticket component, QR payload and ticket/print styles unchanged.

No live database migrations, deployment or real microphone verification were performed here.

## Follow-up finish

- Separate light component stylesheet: buttons, inputs, selectors, links, selected states and split light-form/dark-artwork sign-in.
- Removed location helper line. Grid movie cards capped at 230px so a filtered single result stays compact.
- Unavailable seats are muted with a diagonal across the complete seat area, without appended cross characters or struck-through numbers.
- Removed print layout dropdown; one ticket per page is automatic. Ticket artwork/QR retained.
- Confirmation says “Your booking is saved. See you at the movies!” with concise print guidance. Removed repeated movie context above confirmation and reduced toolbar spacing.
- Wider voice settings dialog, old nested max-height/scroll removed. Dialog itself can scroll on small screens or high zoom so controls remain reachable.
- Working speech engine, recognition and saved voice choice unchanged.

## Latest requested refinements

- Display removed completely from sign-in and booking header; sun/moon remains. Retired stored Display flags are cleared on mount.
- Both sign-in modes retain the full dark reel background; only the form card/controls change theme.
- “Some nights need a big screen.” with a one-time typewriter reveal. Accessible heading stays complete; OS reduced motion disables the reveal.
- Movie grid uses available row width and equal-height cards; a single filtered result stays compact.
- Google UK English Female preferred when available, with a one-time saved-voice migration and safe ranked English fallback. Later manual voice choices persist. Recognition unchanged.
