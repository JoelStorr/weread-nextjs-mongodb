import { Inter } from "next/font/google";
import "./globals.scss";
import classes from "./indexpage.module.scss";
import NavAuth from "@/components/navigation/navAuth";
import AuthPopUp from "@/components/auth/authPopup";
import { getSession } from "@/lib/auth/tokenHandler";
import SessionAuth from "@/components/navigation/sessionNav";
import { runBookSearch } from "@/lib/search/search";
import NavSearch from "@/components/navigation/navSearch";
import Link from "next/link";
import UnAuthHome from "@/components/home/unAuthHome";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WeRead",
  description: "Find your next book",
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bodywrapper">
          <div className={classes.navigation}></div>
          <Link href={"/"} id={classes.mainLogo}>
            <h1>WeRead</h1>
          </Link>

          {session && <NavSearch />}

          {!session && (
            <nav className={`${classes.navItem} ${classes.navItemUnAuth}`}>
              <NavAuth />
            </nav>
          )}

          {session && (
            <nav className={`${classes.navItem} ${classes.navItemAuth}`}>
              <SessionAuth />
            </nav>
          )}

          {children}
        </div>
      </body>
    </html>
  );
}
