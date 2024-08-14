import Image from "next/image";
import styles from "./page.module.css";
import { getMovies } from "./../lib/mongo/movies.js";
import Link from "next/link";

async function fetchMovies() {
  const { movies } = await getMovies();
  if (!movies) throw new Error("Failed to fetch Movies");

  return movies;
}

export default async function Home() {
  const movies = await fetchMovies();

  return (
    <div>
      <p>
        <Link href="/auth/login">Login</Link>
      </p>
      <br />
      <p>
        <Link href="/auth/register">Register</Link>
      </p>
      <br />
      <p>
        <Link href="/books/search">Search</Link>
      </p>
      <br />
      <p>
        <Link href="/books/lists">Lists</Link>
      </p>
    </div>
  );
}
