import { getMovie } from "@/services/movies"
import { notFound } from "next/navigation"

export default async function MovieDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const movie = getMovie(Number(id))

  if (!movie) notFound()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-500 mb-1">{movie.director} · {movie.year}</p>
      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
        {movie.genre}
      </span>
      <p className="mt-6 text-gray-700 leading-relaxed">{movie.description}</p>
    </div>
  )
}