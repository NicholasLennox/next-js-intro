import { MovieSummary } from "@/services/movies"
import Link from "next/link"

export default function MovieCard({ movie }: { movie: MovieSummary }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-lg">{movie.title}</h2>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
          {movie.genre}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4">{movie.year}</p>
      <Link
        href={`/movies/${movie.id}`}
        className="text-sm text-blue-600 hover:underline"
      >
        View details →
      </Link>
    </div>
  )
}