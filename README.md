# Coffee Club

A comprehensive coffee community platform built with Next.js, featuring advanced caching strategies for optimal performance.

## 📋 Documentation

### Performance & Caching

- **[CACHING.md](./CACHING.md)** - Complete caching strategy documentation
- **[CACHE_REFERENCE.md](./CACHE_REFERENCE.md)** - Quick reference for cache tags and patterns

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## 🏗️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **GraphQL** - API layer with code generation
- **Supabase** - Database and authentication
- **Tailwind CSS** - Styling and design system
- **Tanstack Query** - Client-side data fetching and caching
- **Next.js Caching** - Server-side caching with selective invalidation

## ⚡ Performance Features

This application implements a comprehensive caching strategy that provides:

- **Instant page loads** through aggressive server-side caching
- **Real-time updates** via selective cache invalidation
- **80%+ reduction** in database queries
- **Smart cache tags** for granular control
- **Automatic revalidation** after data mutations

See [CACHING.md](./CACHING.md) for detailed implementation details.

## 🔧 Development

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [GraphQL Code Generator](https://www.graphql-code-generator.com/) - Learn about GraphQL code generation
- [Supabase Documentation](https://supabase.com/docs) - Learn about Supabase features
- [Tanstack Query](https://tanstack.com/query) - Learn about client-side data management
