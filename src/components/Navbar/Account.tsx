"use client";

import Image from "next/image";
import { useState } from "react";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { UserState } from "@/redux/slices/user";
import LogoutIcon from "@mui/icons-material/Logout";
import { setLogout } from "@/redux/slices/user";
import { logout } from "@/app/api/auth";
import { useAppDispatch } from "@/lib/hook";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";
import { setProgress } from "@/redux/slices/TopLoadingBar";

const Account = ({ user }: { user: UserState & PersistPartial }) => {
  const dispatch = useAppDispatch();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="relative">
      {user.auth && (
        <button
          className="flex items-center flex-col mt-3 cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Image
            src={user.profileImage}
            width={35}
            height={35}
            alt="user"
            className="rounded-full shadow-sm shadow-gray-300 dark:shadow-gray-600"
          />
          <p className="text-[9px]">Account</p>
        </button>
      )}
      {showMenu && user.auth && (
        <div className="absolute top-[105%] -right-full flex flex-col p-3 gap-1  w-40 bg-white dark:bg-gray-700 rounded-md overflow-hidden shadow-lg z-20">
          <button
            className="flex items-center px-4 py-3 bg-gray-300 dark:bg-gray-600 rounded-md -mx-2 bg-opacity-70 dark:bg-opacity-70 hover:bg-opacity-100 dark:hover:bg-opacity-100 active:bg-opacity-70 dark:active:bg-opacity-70"
            onClick={() => {
              setShowMenu(false);
            }}
          >
            <AccountCircleOutlinedIcon className="h-5 w-5 mx-2 text-gray-600 dark:text-gray-200" />
            <Link href={`/profile/${user.id}`}>
              <p className="text-gray-600 dark:text-gray-200 text-sm mx-2 font-medium">
                Profile
              </p>
            </Link>
          </button>

          <button
            className="flex items-center px-4 py-3 bg-gray-300 dark:bg-gray-600 rounded-md -mx-2 bg-opacity-70 dark:bg-opacity-70 hover:bg-opacity-100 dark:hover:bg-opacity-100 active:bg-opacity-70 dark:active:bg-opacity-70"
            onClick={async () => {
              dispatch(setProgress(80));
              const res = await logout();
              dispatch(setProgress(100));
              setShowMenu(false);
              if (res.success) {
                dispatch(setLogout());
              }
            }}
          >
            <LogoutIcon className="h-5 w-5 mx-2 text-gray-600 dark:text-gray-200" />
            <p className="text-gray-600 dark:text-gray-200 text-sm mx-2 font-medium">
              Logout
            </p>
          </button>
        </div>
      )}
      {
        // overlay
        showMenu && (
          <div
            onClick={() => setShowMenu(false)}
            className="fixed inset-0 z-10"
          ></div>
        )
      }
    </div>
  );
};

export default Account;
