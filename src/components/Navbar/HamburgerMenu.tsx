"use client";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "@/lib/hook";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwither";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state.user);

  const isLogged = user.auth;
  return (
    <>
      <div className="mr-4">
        {open ? (
          <CloseIcon
            onClick={() => setOpen(!open)}
            className="scale-110 cursor-pointer"
          />
        ) : (
          <MenuIcon
            onClick={() => setOpen(!open)}
            className="scale-110 cursor-pointer"
          />
        )}
      </div>
      {open && (
        <div className="absolute top-16 right-0 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-lg flex flex-col gap-2 z-50">
          {!isLogged && (
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
          )}
          <div className="flex items-center gap-9">
            <p className="text-lg font-bold text-gray-500 dark:text-gray-300 rounded-md">
              Theme
            </p>
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
