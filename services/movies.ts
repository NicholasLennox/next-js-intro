import movies from "@/data/movies.json"

export interface Movie {
  id: number
  title: string
  genre: string
  year: number
  director: string
  description: string
}

export interface MovieSummary {
  id: number
  title: string
  genre: string
  year: number
}

export function getMovies(): MovieSummary[] {
  return movies
}

export function getMovie(id: number): Movie | undefined {
  return movies.find((m: Movie) => m.id === id)
}