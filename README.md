# Chargent Labs

The website for Chargent Labs: free, community-built Salesforce packages from the people who build Chargent.

Chargent Labs packages are not official Chargent products and are not supported by Chargent Support. The full disclaimer is on the site.

## Develop

```bash
pnpm install
pnpm dev      # local dev server
pnpm build    # static site in dist/
```

Built with React, TypeScript, Vite, Tailwind CSS and Framer Motion, styled with the Chargent design system (Inter, Turquoise Green `#49DFA9`, Dark Teal Green `#005452`, Medium Yellow `#FFCC33`, square corners, flat fills).

## Add or update a package

Packages live in [`src/data/packages.ts`](src/data/packages.ts). Append an entry to add a package. Set `installUrl` (and optionally `docsUrl`) when the install link is ready; until then the card shows "Install link coming soon".

Each package picks one of the animated illustrations in `src/components/Illustrations.tsx` (`ledger`, `invoice`, `updater`).

## Layout

- `src/App.tsx`: page sections (nav, hero, packages, how it works, before you install, disclaimer, footer)
- `src/components/LabInstrument.tsx`: the animated hero illustration
- `src/components/Illustrations.tsx`: the per-package looping demos
- `src/assets/`: Chargent Labs logo, cut from the master logo file
