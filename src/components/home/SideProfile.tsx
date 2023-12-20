"use client";
import { getUserDetails } from "@/app/api/user";
import { useEffect } from "react";
import { useState } from "react";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Image from "next/image";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { setUser } from "@/redux/slices/user";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const SideProfile = () => {
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<any>();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    async function getUserDetail() {
      const profile = await getUserDetails("followers", "following");

      if (profile?.success !== true) {
        return;
      }
      dispatch(
        setUser({
          id: profile.data.id,
          name: profile.data.name,
          email: profile.data.email,
          profileImage: profile.data.profileImage,
        })
      );
      setProfile(profile.data);
    }
    getUserDetail();
  }, []);

  // Placeholder
  const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#1A1A1A" offset="20%" />
      <stop stop-color="#333333" offset="50%" />
      <stop stop-color="#1A1A1A" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#1A1A1A" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <div className="md:flex justify-between items-start dark:bg-gray-800 bg-gray-100 rounded-md shadow-md p-2 hidden md:w-[330px] h-fit ">
      <div>
        <div className="flex justify-center gap-4 items-center">
          <Image
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            src={profile?.profileImage || user?.profileImage}
            alt="profile"
            width={70}
            height={70}
            className="rounded-[100%] aspect-square"
            onError={(e) => {
              e.currentTarget.src = `data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`;
            }}
          />
          <div className="flex flex-col justify-center">
            <div className="flex gap-3 items-center">
              <h1 className="text-lg font-semibold">
                {profile?.name || user?.name}
              </h1>
              <VerifiedIcon
                titleAccess={profile?.verified ? "verified" : "Unverified"}
                className={` ${
                  profile?.verified
                    ? "text-primary-500"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            </div>
            <p className=" text-xs text-gray-500 max-w-[200px] truncate">
              {profile?.email || user?.email}
            </p>
          </div>
        </div>
        <p className="text-sm text-center mt-1 ">
          {profile?.about || "loading..."}
        </p>
        <div className="flex  items-center gap-2 mt-4 dark:text-gray-300 text-gray-500 ">
          <CalendarMonthIcon className=" scale-75" />
          <p className="text-sm text-center ">
            <span className="font-semibold">Joined: </span>
            {profile?.createdAt
              ? new Date(profile?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })
              : ""}
          </p>
        </div>
        <div className="flex  items-center gap-2 mt-2 dark:text-gray-300 text-gray-500">
          <AddLocationIcon className=" scale-75" />
          <p className="text-sm text-center ">{profile?.location || "Earth"}</p>
        </div>
        <hr className="my-2 border-gray-300 dark:border-gray-600" />
        <div className="flex justify-between max-w-[70%] mx-auto items-center px-3">
          <button className="flex flex-col justify-center items-center">
            <h1 className="text-sm">{profile?.followers?.length || 0}</h1>
            <p className="text-xs text-gray-400">Followers</p>
          </button>
          <button className="flex flex-col justify-center items-center">
            <h1 className="text-sm">{profile?.following?.length || 0}</h1>
            <p className="text-xs text-gray-400">Following</p>
          </button>
        </div>
      </div>
      <button
        className="border-[1px] shadow-sm shadow-gray-300 dark:shadow-gray-700 dark:border-gray-700 border-gray-200 p-1 rounded-lg  bg-gray-100 hover:dark:bg-gray-700 dark:bg-gray-800 hover:bg-slate-200 active:bg-gray-100 dark:active:bg-gray-800"
        title="Edit Profile"
      >
        <EditOutlinedIcon className="text-primary-600" />
      </button>
    </div>
  );
};

export default SideProfile;
