# Display

**Reimagine How You Mint On-Chain**

Display is a mobile-first NFT minting platform featuring swipe-to-mint UI, embedded wallets, and seamless on-chain art discovery. Built on Base.

## Features

- **Swipe-to-Mint** — Browse and mint NFT collections with a single swipe gesture, designed for one-handed mobile use
- **Embedded Wallet** — Instant onboarding via Privy with Coinbase Wallet integration, no extensions required
- **On-Chain Minting** — ERC-1155 smart contract minting on Base mainnet with real-time claim condition reads
- **Interactive 3D** — Three.js-powered visuals and animations throughout the experience
- **Blog & CMS** — Content-managed blog powered by Sanity with categories, featured posts, and comments
- **NFT Collections** — Browse curated collections from Rodeo protocol with optimized image loading

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14, React 18, TypeScript |
| Styling | SASS, Motion, Lottie |
| 3D | Three.js, React Three Fiber, Drei |
| Blockchain | Viem, Privy, Base (ERC-1155) |
| Database | PostgreSQL (Neon) via Prisma |
| CMS | Sanity |
| Email | Nodemailer, React Email, Mailchimp |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or [Neon](https://neon.tech) account)
- [Privy](https://privy.io) app credentials
- [Alchemy](https://alchemy.com) RPC endpoint for Base

### Setup

```bash
# Install dependencies
npm install --legacy-peer-deps

# Copy environment template and fill in your keys
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

See [`.env.example`](.env.example) for all required variables. You'll need credentials for:

- Privy (wallet auth)
- Alchemy (Base RPC)
- PostgreSQL (database)
- Sanity (CMS)
- Gmail / Mailchimp (email)
- reCAPTCHA (spam protection)

### Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
npm run email     # Email template dev mode
```

## Project Structure

```
src/
  app/              # Next.js App Router pages
    (website)/      # Public routes (home, blog, beta, contacts, collections)
    admin/          # Sanity Studio admin
  components/       # React components (sections, UI, 3D)
  hooks/            # Custom hooks (wallet, claims, tokens)
  helpers/          # Utilities, ABIs, config
  context/          # Providers (Privy, Balance, ETH Price)
  actions/          # Server actions (Prisma, email)
  sanity/           # Sanity CMS schema & config
  emails/           # React Email templates
```

## Authors

- **Anthony Nazarov**
- **Vladimir Kokorev**

## License

All rights reserved.
