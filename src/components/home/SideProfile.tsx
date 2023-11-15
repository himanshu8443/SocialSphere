"use client";
import { getUserDetails } from "@/app/api/user";
import { useEffect } from "react";
import { useState } from "react";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Image from "next/image";
import VerifiedIcon from "@mui/icons-material/Verified";

const SideProfile = () => {
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getUserDetail() {
      setLoading(true);
      const profile = await getUserDetails("friends", "pendingFriends");
      setProfile(profile.data);
      setLoading(false);
      console.log(profile);
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
    <div className=" dark:bg-gray-800 bg-gray-100 rounded-md shadow-md p-2 w-[330px]">
      {!loading ? (
        <>
          <div className="flex justify-center gap-4 items-center">
            <Image
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
              src={profile?.profileImage}
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
                <h1 className="text-lg font-semibold">{profile?.name}</h1>
                <VerifiedIcon
                  titleAccess={profile?.verified ? "verified" : "Unverified"}
                  className={` ${
                    profile?.verified ? "text-primary-500" : "text-gray-600"
                  }`}
                />
              </div>
              <p className=" text-xs text-gray-500 max-w-[200px] truncate">
                {profile?.email}
              </p>
            </div>
          </div>
          <p className="text-sm text-center mt-1 ">{profile?.about}</p>
          <div className="flex  items-center gap-2 mt-4  text-gray-300">
            <CalendarMonthIcon className=" scale-75" />
            <p className="text-sm text-center ">
              <span className="font-semibold">Joined: </span>
              {profile?.createdAt
                ? new Date(profile?.createdAt).toLocaleDateString()
                : ""}
            </p>
          </div>
          <div className="flex  items-center gap-2 mt-2  text-gray-300">
            <AddLocationIcon className=" scale-75" />
            <p className="text-sm text-center ">
              {profile?.location || "Earth"}
            </p>
          </div>
          <hr className="my-2 border-gray-300 dark:border-gray-600" />
          <div className="flex justify-between max-w-[70%] mx-auto items-center px-3">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-sm">{profile?.friends?.length || 0}</h1>
              <p className="text-xs text-gray-400">Friends</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-sm">
                {profile?.pendingFriends?.length || 0}
              </h1>
              <p className="text-xs text-gray-400">Requests</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex animate-pulse items-center justify-center w-full h-36 bg-gray-300 rounded dark:bg-gray-700"></div>
      )}
    </div>
  );
};

export default SideProfile;
