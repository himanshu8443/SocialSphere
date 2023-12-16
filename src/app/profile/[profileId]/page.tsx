"use client";
import { useEffect, useState } from "react";
import { getUserDetails, getUserDetailsById } from "@/app/api/user";
import { followUser, unfollowUser } from "@/app/api/friends";
import Image from "next/image";
import Link from "next/link";
import ActivePost from "@/components/home/main/feed/ActivePost";
import { useAppSelector } from "@/lib/hook";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import EditProfile from "./EditProfile";

export default function Profile({ params }: { params: { profileId: string } }) {
  const loggedInUser = useAppSelector((state) => state.user);
  const [user, setUser] = useState<any>();
  useEffect(() => {
    let isMounted = true;
    const getUser = async () => {
      if (loggedInUser?.id === params?.profileId) {
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
      } else {
        const res = await getUserDetailsById(params?.profileId);
        if (res?.success && isMounted) {
          setUser(res.data);
          console.log(res.data);
        }
      }
    };
    getUser();
    return () => {
      isMounted = false;
    };
  }, []);

  const startFollowing = async () => {
    setUser((prev: any) => {
      return {
        ...prev,
        followers: [...prev?.followers, loggedInUser],
      };
    });
    const res = await followUser({ userId: user?.id });
    if (!res?.success) {
      setUser((prev: any) => {
        return {
          ...prev,
          followers: prev?.followers?.filter(
            (follower: any) => follower?.id !== loggedInUser?.id
          ),
        };
      });
    }
  };

  const stopFollowing = async () => {
    setUser((prev: any) => {
      return {
        ...prev,
        followers: prev?.followers?.filter(
          (follower: any) => follower?.id !== loggedInUser?.id
        ),
      };
    });
    const res = await unfollowUser({ userId: user?.id });
    if (!res?.success) {
      setUser((prev: any) => {
        return {
          ...prev,
          followers: [...prev?.followers, loggedInUser],
        };
      });
    }
  };

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
          <div className="flex gap-5 items-center justify-start">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            {user?.id !== loggedInUser?.id &&
              (user?.followers?.find(
                (follower: any) => follower?.id === loggedInUser?.id
              ) ? (
                <button
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md text-gray-600 dark:text-gray-300"
                  onClick={stopFollowing}
                >
                  Following
                </button>
              ) : (
                <button
                  className="bg-primary-700 px-3 py-1 rounded-md text-white"
                  onClick={startFollowing}
                >
                  Follow
                </button>
              ))}
            {user?.id === loggedInUser?.id && (
              <Link href="/profile/edit">
                <button className="bg-primary-700 px-3 py-1 rounded-md text-white">
                  Edit
                </button>
              </Link>
            )}
          </div>
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
              className="relative w-[300px] h-[300px] rounded-md overflow-hidden cursor-pointer"
            >
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
              <Link href={`?p=${post?.id}`} scroll={false}>
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center gap-5"
                  whileHover={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-2 text-white">
                    <FavoriteIcon />
                    <p>{post?.likes}</p>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CommentIcon />
                    <p>{post?.Comment?.length}</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <ActivePost backRoute={`/profile/${params?.profileId}`} />
      <EditProfile user={user} setUser={setUser} />
    </div>
  );
}
