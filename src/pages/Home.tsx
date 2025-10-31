import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // store your TMDb API key in .env
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return fetchPopularMovies();

    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Hero Section */}
      <section className="text-center mt-16 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 mb-3">
          Discover Movies You’ll Love 🎬
        </h1>
        <p className="text-gray-400">
          Browse popular films or search for your favorites
        </p>
      </section>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-10 px-4"
      >
        <div className="flex w-full max-w-md items-center bg-gray-900 border border-red-700 rounded-lg overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="grow bg-transparent text-gray-200 px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 p-2 transition-colors"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>

      {/* Movie Grid */}
      {loading ? (
        <p className="text-center text-gray-400">Loading movies...</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-4 pb-20">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-red-500/40 hover:scale-105 transform transition duration-300"
              >
                <img
                  src={
                    movie.poster_path
                      ? `${IMAGE_BASE}${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-[360px] object-cover"
                />
                <div className="p-3">
                  <h2 className="text-lg font-semibold text-gray-100 truncate">
                    {movie.title}
                  </h2>
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>{movie.release_date?.slice(0, 4) || "N/A"}</span>
                    <span className="text-red-500 font-bold">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No movies found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
