import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import ShareIcon from "@mui/icons-material/Share";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VideoPlayer from "./VideoPlayer";
import { useAppDispatch } from "@/lib/hook";
import { setActivePost } from "@/redux/slices/ActivePost";
import Link from "next/link";
import * as datetime from "date-fns";
import { Dispatch } from "react";
import { likeUnlikePost } from "@/app/api/posts";
import { useState } from "react";
import { followUser } from "@/app/api/friends";
import { motion } from "framer-motion";

const Post = ({
  post,
  posts,
  setPosts,
}: {
  post: any;

  posts: any[];
  setPosts: Dispatch<any>;
}) => {
  const dispatch = useAppDispatch();
  const [likedLoading, setLikedLoading] = useState(false);

  const likeUnlike = async (postId: string) => {
    if (!posts) return;
    const updatedPosts = JSON.parse(JSON.stringify(posts)) as any[];
    const isLiked = updatedPosts.find((post) => post.id === postId)?.likedBy
      .length;
    if (isLiked) {
      updatedPosts.find((post) => post.id === postId)?.likedBy.pop();
      updatedPosts.find((post) => post.id === postId).likes--;
    } else {
      updatedPosts
        .find((post) => post.id === postId)
        ?.likedBy?.push({ id: postId });
      updatedPosts.find((post) => post.id === postId).likes++;
    }
    // console.log("updatedPosts", updatedPosts);
    setPosts(updatedPosts);

    setLikedLoading(true);
    const res = await likeUnlikePost(postId);
    if (!res?.success) {
    }
    setLikedLoading(false);
  };

  const handleFollow = async (userId: string) => {
    const res = await followUser({ userId });
    if (!res?.success) {
    }
  };

  return (
    <div
      key={post?.id}
      className="dark:bg-gray-800 bg-gray-100 rounded-md px-2 py-4 max-h-[820px] md:w-[530px] min-w-[300px] w-full"
    >
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 justify-center items-center gap-2 ">
          <Image
            alt="Profile"
            src={post?.User?.profileImage}
            width={40}
            height={40}
            className="rounded-full"
          />
          <Link href={`/profile/${post?.User?.id}`} scroll={true}>
            <p className="text-gray-500 dark:text-gray-300 hover:underline cursor-pointer font-semibold text-lg">
              {post?.User?.name}
            </p>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 font-semibold text-base">
            • {timeAgo(post?.createdAt)}
          </p>
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          {post?.User.followers?.length > 0 ? (
            <PeopleAltIcon className=" scale-125" />
          ) : (
            <button
              className="p-2 pr-3 active:bg-transparent dark:active:bg-transparent hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full justify-center items-center flex"
              title="Add Friend"
              onClick={() => handleFollow(post?.User?.id)}
            >
              <PersonAddIcon
                className="text-primary-600 scale-[1.4]
                duration-1000 ease-linear transition-all"
              />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <p
          className={`text-gray-600 dark:text-gray-300 overflow-y-auto max-h-[500px] text-justify px-2 ${
            post?.type !== "text" ? "text-lg font-medium " : ""
          }`}
        >
          {post?.title}
        </p>
        {post?.type === "image" ? (
          <div className="flex justify-center items-center w-full h-full ">
            <motion.img
              alt="Post"
              src={post?.src}
              height={500}
              width={550}
              className="rounded-md h-auto max-h-[500px] object-fill w-auto md:max-w-[530px] max-w-[300px]"
              layoutId={`post-${post?.id}`}
            />
          </div>
        ) : post?.type === "video" ? (
          <div className="flex justify-center items-center w-full h-full ">
            <VideoPlayer src={post?.src} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-between items-center mt-5 px-2">
        <div className="flex space-x-10">
          {post?.likedBy?.length > 0 ? (
            <button
              className="flex space-x-2 items-center"
              title={likedLoading ? "Loading..." : "Unlike"}
              disabled={likedLoading}
              onClick={() => likeUnlike(post?.id)}
            >
              <FavoriteIcon
                style={{ fontSize: 28 }}
                className="text-primary-500 scale-125"
              />
            </button>
          ) : (
            <button
              className="flex space-x-2 items-center active:scale-150 ease-linear transition-all duration-200"
              title={likedLoading ? "Loading..." : "Like"}
              disabled={likedLoading}
              onClick={() => likeUnlike(post?.id)}
            >
              <FavoriteBorderIcon
                style={{ fontSize: 28 }}
                className="dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 text-gray-500 scale-125"
              />
            </button>
          )}
          <Link href={`?p=${post?.id}`} key={post?.id} scroll={false}>
            <button
              className="flex space-x-2 items-center"
              title="Comment"
              onClick={() => {
                dispatch(setActivePost(post));
              }}
            >
              <SmsOutlinedIcon
                style={{ fontSize: 30 }}
                className="dark:text-gray-300 text-gray-500 icon-flipped"
              />
            </button>
          </Link>
        </div>
        <button
          className="flex justify-center items-center hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full p-2 pr-3 py-3  active:bg-transparent dark:active:bg-transparent"
          title="Share"
        >
          <ShareIcon className="dark:text-gray-400 text-gray-500 scale-125" />
        </button>
      </div>
      <p className="text-gray-500 dark:text-gray-400 px-3 mt-2">
        {likedLoading
          ? "Loading..."
          : post?.likes > 1
          ? `${post?.likes} likes`
          : `${post?.likes} like`}
      </p>
    </div>
  );
};

export default Post;

export const timeAgo = (date: string) => {
  //get how many hours/days/weeks/months/years ago
  if (!date) return "";
  const startDate = datetime.parseISO(date);
  const endDate = new Date();
  const minutes = Math.abs(datetime.differenceInMinutes(startDate, endDate));
  const hours = Math.abs(datetime.differenceInHours(startDate, endDate));
  const days = Math.abs(datetime.differenceInDays(startDate, endDate));
  const weeks = Math.abs(datetime.differenceInWeeks(startDate, endDate));
  const months = Math.abs(datetime.differenceInMonths(startDate, endDate));
  const years = Math.abs(datetime.differenceInYears(startDate, endDate));
  //return the correct time ago
  if (minutes < 1) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 7) {
    return `${days}d ago`;
  } else if (weeks < 4) {
    return `${weeks}w ago`;
  } else if (months < 12) {
    return `${months}M ago`;
  } else {
    return `${years}Y ago`;
  }
};
