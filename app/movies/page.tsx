import MovieCard from "@/components/MovieCard"
import { getMovies, MovieSummary } from "@/services/movies"

export default function MoviesPage() {

    const movies = getMovies()
    
    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-4">Movies</h1>
            {movies.map((m: MovieSummary) => (
                <MovieCard key={m.id} movie={m} />
            ))}
        </div>
    )
}