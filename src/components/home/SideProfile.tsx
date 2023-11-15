"use client";
import { getUserDetails } from "@/app/api/user";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";

const SideProfile = () => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    async function getUserDetail() {
      const profile = await getUserDetails();
      setProfile(profile.data);
      console.log(profile);
    }
    getUserDetail();
  }, []);

  return (
    <div className="w-1/4 dark:bg-gray-700 rounded-md shadow-md">
      <Image
        src={profile?.profilePicture}
        alt="profile"
        width={200}
        height={200}
        className="rounded-full mx-auto mt-5"
      />
    </div>
  );
};

export default SideProfile;
