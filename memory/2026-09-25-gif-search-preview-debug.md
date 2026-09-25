# GIF search and preview debug

## Symptom

GIF search appeared empty. Selecting a result did not show the GIF in the preview.

## Root cause

Klipy returned valid results with `media_formats.gif.url`. Search worked, but the preview stored the selected media as a CSS background on `.scene`. The scene also used overlay pseudo-elements, so the media was not reliably visible.

## Fix

The preview now uses a real image element with explicit layering. Selecting a result assigns its Klipy URL to the image element and makes it visible.

## Evidence

The local Klipy request returned HTTP 200 and valid GIF URLs. The browser reproduction updated result labels after search and changed the selected result state after preview selection.

## Status

DONE_WITH_CONCERNS: Search and preview are fixed locally. The public site still needs the server-side proxy deployed before it can use Klipy search.
