"use client";
import { getUserDetails } from "@/app/api/user";
import { useEffect } from "react";
import { useState } from "react";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { setUser } from "@/redux/slices/user";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { toBase64, shimmer } from "@/lib/imagePlaceholder";
import journey from "@/assets/journey.svg";
import Image from "next/image";
import Link from "next/link";
import { setFollowingModal, setFollowersModal } from "@/redux/slices/modals";

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

  return user?.auth ? (
    <div className="md:flex justify-between items-start dark:bg-gray-800 bg-gray-100 rounded-md shadow-md p-2 hidden md:w-[330px] h-fit ">
      <div>
        <div className="flex justify-center gap-4 items-center">
          <img
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
          <button
            className="flex flex-col justify-center items-center"
            onClick={() => dispatch(setFollowersModal(true))}
          >
            <h1 className="text-sm">{profile?.followers?.length || 0}</h1>
            <p className="text-xs text-gray-400">Followers</p>
          </button>
          <button
            className="flex flex-col justify-center items-center"
            onClick={() => dispatch(setFollowingModal(true))}
          >
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
  ) : (
    <div className="md:flex flex-col justify-center items-center dark:bg-gray-800 bg-gray-100 rounded-md shadow-md p-2 hidden md:w-[330px] h-fit">
      <Image src={journey} alt="journey" className="w-[300px] h-[300px]" />
      <Link href="/signup">
        <button className="rounded-full outline outline-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500 dark:focus:ring-primary-600 shadow-md shadow-primary-500/50 dark:shadow-primary-600/50 bg-gradient-to-br from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 dark:hover:from-cyan-600 dark:hover:to-cyan-800 active:from-cyan-600 active:to-cyan-700 dark:active:from-cyan-700 dark:active:to-cyan-800 text-white font-semibold text-sm px-4 py-2">
          Start your Journey
        </button>
      </Link>
    </div>
  );
};

export default SideProfile;
