import React, { Dispatch } from "react";
import { Post } from "./CreatePost";
import { useAppSelector } from "@/lib/hook";
import Image from "next/image";
import ImageIcon from "@mui/icons-material/Image";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ post, setPost }: { post: Post; setPost: Dispatch<Post> }) => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="fixed inset-0 z-40 flex justify-center items-center bg-black  bg-opacity-40">
      <div className="bg-white dark:bg-slate-800 rounded-md p-4 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 justify-center items-center gap-2">
            <Image
              alt="Profile"
              src={user?.profileImage}
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">
              {user?.name}
            </p>
          </div>
          <button
            className="text-gray-500 dark:text-gray-400"
            onClick={() => setPost({ active: false, type: "text" })}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col space-x-2">
          {post.type === "text" ? (
            <textarea
              className="w-full dark:bg-slate-700 bg-gray-100 p-2 rounded-md resize-none outline-none min-h-[400px] min-w-[700px] "
              autoFocus={true}
              placeholder="What's on your mind?"
            />
          ) : (
            <input
              type="text"
              className="w-full dark:bg-slate-700 bg-gray-100 p-2 rounded-md resize-none outline-none  min-w-[700px] "
              autoFocus={true}
              placeholder="Caption"
            />
          )}

          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <button className="flex space-x-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md p-2">
                <ImageIcon className="text-primary-600 scale-110" />
                <p className="text-gray-500 dark:text-gray-400">Photo</p>
              </button>
              <button className="flex space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md">
                <VideoCallIcon className="text-primary-600 scale-125" />
                <p className="text-gray-500 dark:text-gray-400">Video</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
