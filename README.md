# Intro to Next.js

## What is Next.js

You have been building React apps with Vite. Every time you started a project you made the same decisions: which router, how to structure folders, where data fetching happens. Those decisions vary between developers. Every Vite React codebase looks a little different.

Next.js is the answer to: *what if we just agreed on all of that?*

Same React underneath. Same components, same hooks, same everything you already know. What changes is that the scaffolding is already built. File-based routing. Server rendering by default. A conventions-first folder structure. You show up and write features.



## The folder structure

Only the `app` folder is special. Next watches it and builds routes from it automatically. Everything else is organisation.

| Folder | What it is 
|---|---|
| `app/` | Your app. Routes and pages live here |
| `components/` | Shared UI pieces | 
| `services/` | Data access and business logic | 
| `data/` | Local JSON data |
| `public/` | Static assets - images, fonts | 
| `lib/` | Utilities, helpers, third-party config - when something doesn't belong in services |



## Routing

In a Vite React app you configure routes explicitly:

```tsx
<Routes>
  <Route path="/movies" element={<Movies />} />
</Routes>
```

In Next there is no router configuration. The file path is the route.

```
app/page.tsx             → /
app/about/page.tsx       → /about
app/movies/page.tsx      → /movies
app/movies/[id]/page.tsx → /movies/1
```

Create a folder, add a `page.tsx`, the route exists. That is the entire system.

### Dynamic routes

Square brackets in a folder name mean that segment is dynamic. The folder `[id]` matches any value in that position in the URL.

```tsx
export default async function MovieDetails({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
}
```

Next passes the URL value into the component via `params`. The key matches the folder name - `[id]` gives you `params.id`. It is always a string, even if the URL contains a number.

### Navigation with Link

Use `Link` from `next/link` for all internal navigation. Unlike a plain `<a>` tag, it handles navigation without a full page reload - only the page content updates, the layout stays mounted.

```tsx
import Link from "next/link"

<Link href="/movies">Movies</Link>

// dynamic route
<Link href={`/movies/${movie.id}`}>View details</Link>
```

This is the same idea as React Router's `<Link>`, just built into Next.



## The layout

`app/layout.tsx` is the shell that wraps every page in the app. The `{children}` prop is where each page slots in.

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>...</nav>
        {children}
        <footer>...</footer>
      </body>
    </html>
  )
}
```

Anything outside `{children}` - the nav, the footer - renders on every route automatically. You write it once.



## Server components

By default every component in the `app` folder is a server component. It runs on the server, produces HTML, and sends it to the browser ready to display.

This should feel familiar. In your Express and EJS apps, the server built the page before sending it. Next does the same thing, but with React components instead of templates.

The practical consequence is that data access is direct:

```tsx
// no useEffect, no fetch, no loading state
export default function MoviesPage() {
  const movies = getMovies()

  return (
    <div>
      {movies.map(m => <MovieCard key={m.id} movie={m} />)}
    </div>
  )
}
```

The data is there at render time because this code runs on the server before anything reaches the browser.

### What you cannot do in a server component

Server components have no access to the browser. That means:

- No `useState`
- No `useEffect`
- No `window`, `document`, or `localStorage`
- No event handlers

If a component needs any of these, add `"use client"` at the top of the file. That component will run in the browser like your Vite React components did.

The rule of thumb: if a component displays data, it is probably a server component. If it responds to the user, it needs `"use client"`.



## The service layer

You already know this pattern from your .NET and Express work. The service is the only place that touches data. Pages and components ask the service for what they need - they do not care where the data comes from.

```ts
export function getMovies(): MovieSummary[] {
  return movies
}

export function getMovie(id: number): Movie | undefined {
  return movies.find(m => m.id === id)
}
```

Right now the data comes from a local JSON file. If you swap it for a database call later, only this file changes. The pages stay exactly the same.



## TypeScript - two patterns you will use constantly

### Typing props inline

```tsx
export default function MovieCard({ movie }: { movie: MovieSummary }) {
```

Fine for simple components with one or two props.

### Typing props with an interface

```tsx
interface MovieCardProps {
  movie: MovieSummary
}

export default function MovieCard({ movie }: MovieCardProps) {
```

Cleaner when props get complex, and easier to reuse across files.

Both are the same thing. Reach for the interface when the inline version starts getting hard to read.



## Handling missing data

When a user navigates to a movie that does not exist, call `notFound()`. Next renders the built-in 404 page immediately.

```tsx
const movie = getMovie(Number(id))

if (!movie) notFound()
```

No conditional rendering in the JSX. No half-rendered page. The function stops execution and hands off to Next.



## Coming up

As the project grows you will encounter two more conventions worth knowing about:

**Feature co-location** - grouping everything related to a feature together:

```
app/
  auth/
    page.tsx       → the route
    actions.ts     → form submissions and data mutations
    types.ts       → types for this feature
```

**Server actions** - Next's built-in way to handle form submissions and data mutations without writing an API endpoint. You will see this when you add authentication.



## What carries over from React

Everything. Components, props, hooks, Context, useState, useEffect - none of that changes. Next is not a replacement for React, it is a framework built on top of it. The concepts you have learned are the foundation. Next adds routing, server rendering, and structure on top.