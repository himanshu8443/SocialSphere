"use client";

import { useAppSelector } from "@/lib/hook";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwither";
import Account from "./Account";
import Notification from "./Notification";
import SearchUser from "./SearchUser";

const Actions = () => {
  const user = useAppSelector((state) => state.user);

  const isLogged = user.auth;
  return (
    <div className="flex items-center md:gap-7 gap-2 flex-row">
      {isLogged && <SearchUser />}
      {!isLogged ? (
        <div className="flex items-center gap-5">
          <Link href="/signup">
            <button className="text-white bg-gradient-to-r from-primary-600 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-bold rounded-lg text-sm md:text-lg md:px-3 md:py-2 px-2 py-2 text-center mr-2 mb-2 ">
              Sign Up
            </button>
          </Link>
          <Link href="/login">
            <button className="text-white bg-gradient-to-r from-primary-600 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-bold rounded-lg text-sm md:text-lg md:px-3 md:py-2 text-center mr-2 mb-2 px-2 py-2 ">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <Notification />
      )}
      <ThemeSwitcher />
      <Account user={user} />
    </div>
  );
};

export default Actions;
