"use client";
import Link from "next/link";
import logo from "../../assets/logo.svg";
import Image from "next/image";
import Actions from "./Actions";
import { useAppDispatch } from "@/lib/hook";
import { setProgress } from "@/redux/slices/TopLoadingBar";

const Nav = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-gray-100 dark:bg-gray-800 h-16 w-full">
      <div className="flex justify-between items-center h-full w-full mx-auto md:px-5">
        <Link href="/">
          <div
            className="flex items-center gap-5 cursor-pointer h-28 w-44 md:h-28 md:w-64 max-sm:ml-2"
            onClick={() => dispatch(setProgress(100))}
          >
            <Image src={logo} alt="logo" className=" object-cover" />
          </div>
        </Link>
        <Actions />
      </div>
    </div>
  );
};

export default Nav;
