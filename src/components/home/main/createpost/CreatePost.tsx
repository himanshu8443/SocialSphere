"use client";
import ImageIcon from "@mui/icons-material/Image";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Modal from "./Modal";

export interface Post {
  active: boolean;
  type: "image" | "video" | "text";
  url?: string | null;
}

const CreatePost = () => {
  const [post, setPost] = useState<Post>({
    active: false,
    type: "text",
    url: null,
  });

  return (
    <div className="dark:bg-gray-800 bg-gray-100 p-3 rounded-md  ">
      <button
        className="rounded-full text-left text-xl w-[500px] bg-gray-300 text-gray-600 dark:text-gray-100 dark:bg-slate-700 p-2 hover:dark:bg-slate-600 hover:bg-gray-200 "
        onClick={() => setPost({ active: true, type: "text" })}
      >
        What's on your mind?
      </button>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2 gap-8">
          <button
            className="flex space-x-2 hover:dark:bg-slate-700  hover:bg-slate-200 rounded-md p-3"
            onClick={() => setPost({ active: true, type: "image", url: null })}
          >
            <ImageIcon className="text-primary-600 scale-110" />
            <p className="text-gray-500 dark:text-gray-400">Photo</p>
          </button>
          <button
            className="flex space-x-2 p-3 hover:dark:bg-slate-700  hover:bg-slate-200 rounded-md"
            onClick={() => setPost({ active: true, type: "video", url: null })}
          >
            <VideoCallIcon className="text-primary-600 scale-125" />
            <p className="text-gray-500 dark:text-gray-400">Video</p>
          </button>
        </div>
        <button
          className="flex justify-center gap-1 items-center rounded-full py-1 px-3 border-[1px] shadow-sm shadow-gray-300 dark:shadow-gray-700 dark:border-gray-700 border-gray-200 bg-gray-100 hover:dark:bg-gray-700 dark:bg-gray-800 hover:bg-slate-200 active:bg-gray-100 dark:active:bg-gray-800"
          onClick={() => setPost({ active: true, type: "text" })}
        >
          <p className="text-base">Create</p>
          <AddIcon className="text-primary-600 scale-125" />
        </button>
      </div>
      {post.active && <Modal post={post} setPost={setPost} />}
    </div>
  );
};

export default CreatePost;
