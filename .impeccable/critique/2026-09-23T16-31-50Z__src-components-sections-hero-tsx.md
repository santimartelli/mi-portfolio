---
target: hero ux/ui improvement
total_score: 27
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/home/santiago/projects/mi-portfolio/src/components/sections/Hero.tsx"
target_fingerprint: "sha256:fff801c82f70dbe67e5aeef9683a5a5379fb4e76d1400537d62337ef174aa1ff"
target_path: /home/santiago/projects/mi-portfolio/src/components/sections/Hero.tsx
timestamp: 2026-09-23T16-31-50Z
slug: src-components-sections-hero-tsx
---
# Critique — Hero (`src/components/sections/Hero.tsx`)

Method: dual-agent (A: design review · B: detector). No browser available: judgment from source and compiled CSS.

## Design Health Score (assessed pre-fix)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Contact CTA hover inert; in-page jumps give no cue |
| 2 | Match System / Real World | 4 | PMS/OTAs/Opera/Avalon/Booking/Expedia is the operator's language |
| 3 | User Control and Freedom | 4 | Skip link, Escape closes nav, language switch is a real link |
| 4 | Consistency and Standards | 2 | Duplicate section ids; CTA off-spec; green-500 instead of the success token; English value on the Spanish page |
| 5 | Error Prevention | 4 | No input surface; all four targets resolve |
| 6 | Recognition Rather Than Recall | 3 | Fact labels look like a second row of links |
| 7 | Flexibility and Efficiency | n/a | Static hero |
| 8 | Aesthetic and Minimalist Design | 3 | Same claim three times; the only evidence is the smallest text |
| 9 | Error Recovery | 4 | No error surface |
| 10 | Help and Documentation | n/a | No help surface |
| **Total** | | **27/32** | **Good** |

## Design specificity verdict

Copy is authored for this product; the composition was interchangeable. The form carried none of the thesis, and the only hard proof (the named toolset) sat at the smallest size on the page.

## Priority issues

- P1 — micro-label contrast 4.07:1 in the dark theme (`#6b7280` on `#0a0b0f`), against a stated AA requirement.
- P1 — Contact CTA border composed 1.25:1 and its hover rule was dead, masked by the `!important` remap.
- P1 — availability status last, below the mobile fold.
- P2 — content: `cards[0]` duplicates the tagline; `cards[1].label` collides with the CTA; field name `cards` is obsolete.
- P2 — h1 had no width cap or break control.
- P3 — duplicate section ids, scroll-behavior on `main`, off-token status dot, documented type-scale drift.

## Applied in this run

Contrast `dark:text-gray-500` to `dark:text-gray-400` (41 classes); `.cta-primary` built from tokens with a verified hover; underline on the secondary link; availability moved above the facts; `text-balance`/`text-pretty`; duplicate ids removed; scroll-behavior on `html`; status dot on the token; Tailwind `accent` scale repointed at the tokens instead of the abandoned teal.

## False positives demonstrated

The 132 `#6b7280 on #0a0b0f` and the `text-black`/`gray-600`/`gray-700` pairs are theme-mixing artefacts of the static analyzer: every text element carries a `dark:` override, and the only survivors are four fixed-size icons, which pass the 3:1 graphical-object threshold. Also demonstrated: `gray-on-color` (no element carries both classes), `ai-color-palette` (the violet is a declared-but-unused token), and `cramped-padding` (descendants are inset 12-20px).
