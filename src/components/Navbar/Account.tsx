"use client";

import Image from "next/image";
import { useState } from "react";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { UserState } from "@/redux/slices/user";
import LogoutIcon from "@mui/icons-material/Logout";
import { setLogout } from "@/redux/slices/user";
import { logout } from "@/app/api/auth";
import { useAppDispatch } from "@/lib/hook";

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
            className="rounded-full"
          />
          <p className="text-[9px]">Account</p>
        </button>
      )}
      {showMenu && user.auth && (
        <div className="absolute top-[105%] -right-full  w-40 bg-white dark:bg-gray-700 rounded-md overflow-hidden shadow-lg z-20">
          <button className="flex items-center px-4 py-3 border-b -mx-2 w-full">
            <Image
              src={user.profileImage}
              width={35}
              height={35}
              alt="user"
              className="rounded-full grayscale"
            />
            <p className="text-gray-600 dark:text-gray-200 text-sm mx-2 font-medium">
              Profile
            </p>
          </button>

          <button
            className="flex items-center px-4 py-3 -mx-2"
            onClick={async () => {
              const res = await logout();
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
