import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"

/*
  Metadata is a Next built-in. Whatever you export here becomes the <title>
  and <meta description> tags in the document head.
  Because this is a server component, Next can set these before the page
  reaches the browser - which is why search engines and link previews work.
*/
export const metadata: Metadata = {
  title: "Movie Gallery",
  description: "A Next.js demo app",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col gap-4">

        {/*
          Link is from next/link - not a plain <a> tag.
          It handles client-side navigation: the page doesn't fully reload,
          only the {children} slot updates. The layout stays mounted.
          This is the same idea as React Router's <Link>, just built into Next.
        */}
        <nav className="flex gap-4 p-4 bg-gray-800 text-white">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <Link href="/about" className="hover:text-blue-400">About</Link>
          <Link href="/movies" className="hover:text-blue-400">Movies</Link>
        </nav>

        {/* Each page renders here */}
        <div className="mx-4 flex-1">
          {children}
        </div>

        <footer className="flex justify-center bg-gray-800 p-4 text-white">
          Next JS
        </footer>

      </body>
    </html>
  )
}