import AuthPopUp from "@/components/auth/authPopup";
import { getSession } from "@/lib/auth/tokenHandler";
import UnAuthHome from "@/components/home/unAuthHome";
import AuthHome from "@/components/home/AuthHome";
import {ReadonlyURLSearchParams} from "next/navigation"

interface PageProps{
  searchParams?: {
    login?: Boolean,
    register?: Boolean
  } 
}

export default async function Home({ searchParams }: PageProps) {
  const session = await getSession();

  const login = searchParams?.login || false;
  const register = searchParams?.register || false;

  if (session) {
    return <AuthHome />;
  } else {
    return (
      <>
        {login && <AuthPopUp login={true} />}
        {register && <AuthPopUp register={true} />}
        <UnAuthHome />
      </>
    );
  }
}
