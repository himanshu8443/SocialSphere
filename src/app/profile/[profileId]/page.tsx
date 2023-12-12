"use client";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/app/api/user";
import Image from "next/image";
import Link from "next/link";
import ActivePost from "@/components/home/main/feed/ActivePost";

export default function Profile() {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    let isMounted = true;
    const getUser = async () => {
      const res = await getUserDetails(
        "posts",
        "savedPosts",
        "followers",
        "following"
      );
      if (res?.success && isMounted) {
        setUser(res.data);
        console.log(res.data);
      }
    };
    getUser();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-[1200px] min-h-screen mt-10 px-5">
      <div className="flex justify-between items-center gap-16 max-w-[600px] mx-auto">
        <Image
          src={user?.profileImage}
          width={150}
          height={150}
          alt="Profile"
          className="rounded-full"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <div className="flex space-x-5">
            <p className="text-gray-500 dark:text-gray-400">
              {user?.posts?.length} posts
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {user?.followers?.length} followers
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {user?.following?.length} following
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {user?.about || "No bio"}
          </p>
        </div>
      </div>
      <hr className="my-5 dark:border-gray-700 border-gray-300" />
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="flex flex-wrap gap-5 justify-center items-center">
          {user?.posts?.map((post: any) => (
            <div
              key={post?.id}
              className="relative w-[300px] h-[300px] rounded-md overflow-hidden"
            >
              <Link href={`?p=${post?.id}`} scroll={false}>
                {post?.type === "image" ? (
                  <Image
                    src={post?.src}
                    alt="Post"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : post?.type === "video" ? (
                  <video
                    src={post?.src}
                    className="w-full h-full object-cover"
                    controls={false}
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full bg-gray-200 dark:bg-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg text-center">
                      {post?.title}
                    </p>
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <ActivePost backRoute="/profile/kj" />
    </div>
  );
}
