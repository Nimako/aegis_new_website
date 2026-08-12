# Aegis web design system

This document is the source of truth for the Next.js route pages. The legacy landing page uses the same visual language through its pixel-matched stylesheet; route pages consume the tokens and presets below through `app/globals.css`.

## Foundations

- Typography: Manrope for interface and display copy; DM Mono for eyebrows, statuses, and compact metadata.
- Light theme: warm white `#f5f8f4`, forest ink `#13211a`, muted green-gray copy `#4f6257`, Aegis green `#0f6b43`, mint action `#b9efc9`, amber accent `#d69825`.
- Dark theme: near-black `#080b0d`, soft white `#f4f7f4`, muted copy `#aeb8b1`, mint action `#b6f4c6`, amber accent `#efbd64`.
- Shape: 5px buttons, 7–8px cards, 6px fields, and 999px theme/status pills.
- Focus: every link, button, field, and select receives a visible amber focus ring.
- Motion: hover lift is subtle and is disabled under `prefers-reduced-motion: reduce`.

## Reusable presets

- `.button` — primary action; add `.yellow`, `.ghost`, or `.small` for variants.
- `.card` — standard content card with theme-aware border, surface, and hover state.
- `.icon-box` — compact icon container for cards and setup rows.
- `.list-card` — resource/list row with consistent divider and responsive stacking.
- `.notice` — informational state; add `.success` for positive confirmation.
- `.eyebrow`, `.soft`, `.muted`, `.mint`, `.mono` — shared text treatments.
- `SiteHeader` / `SiteFooter` — shared route chrome; `SiteHeader` owns desktop navigation, mobile navigation, and theme control.
- `ButtonLink`, `Card`, and `SectionHeading` in `app/components/ui.tsx` — typed React wrappers around the CSS presets.

## Page rules

Use one `PageHero` per route, one dominant primary CTA per screen, and real route destinations for all CTAs. If a service is not connected, label it as a preview or coming soon instead of implying a successful integration.

## Accessibility

Maintain readable foreground/background contrast in both themes, keep controls keyboard reachable, use semantic headings and landmarks, and never rely on color alone for selected, unavailable, or completed states.
