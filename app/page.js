import Image from "next/image";
import styles from "./page.module.css";
import { getMovies } from "./../lib/mongo/movies.js";

async function fetchMovies() {
  const { movies } = await getMovies();
  if (!movies) throw new Error("Failed to fetch Movies");

  return movies;
}

export default async function Home() {
  const movies = await fetchMovies();

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.name}</li>
        ))}
      </ul>
    </div>
  );
}
