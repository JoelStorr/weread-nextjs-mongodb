import Image from "next/image";
import styles from "./page.module.css";
import { getMovies } from "./../lib/mongo/movies.js";
import Link from "next/link";
import AuthContextProvider from "@/store/auth-context";
import AuthPopUp from "@/components/auth/authPopup";
import { getSession } from "@/lib/auth/tokenHandler";

async function fetchMovies() {
  const { movies } = await getMovies();
  if (!movies) throw new Error("Failed to fetch Movies");

  return movies;
}

export default async function Home({searchParams}) {
  const session = await getSession();

  const login = searchParams.login || false;
  const register = searchParams.register || false;


  if(session){
    return (
      <div>Logged In</div>
    )
  } else {
    return (
      <div className="homepage">
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
        {login && <AuthPopUp login={true} />}
        {register && <AuthPopUp register={true} />}
      </div>
    );
  }




}
