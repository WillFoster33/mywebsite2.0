### Glass — Liquid iOS-style personal site (Next.js + Tailwind)

- **Run dev**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm start`

### Replace background
- Put your image at `public/backgrounds/bg.jpg` (already copied from `bg.jpeg`).
- Use a high-res image; dark or mid-tone works best. A vignette overlay is applied for readability.

### Update content
- Edit `site.config.ts` to change your name, tagline, about, facts, and projects.
- Hero fonts are defined in `app/layout.tsx` (Inter + Plus Jakarta Sans). Adjust as you like.

### Theming
- Tailwind tokens are set via CSS variables in `app/globals.css`:
  - `--glass-bg`, `--glass-border`, `--glass-highlight`, `--accent`.
- Reusable utilities: `.glass-panel`, `.glass-chip`, `.glass-button`.

### Accessibility & Motion
- Reduced motion respected in blob animations and hero transitions.
- Modal traps focus and closes on ESC. Links and buttons include focus rings.

### Notes
- Background is full-bleed with a radial vignette overlay.
- Project images use placeholders; replace per project. 