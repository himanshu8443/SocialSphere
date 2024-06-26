import React, { Dispatch } from "react";
import { Post } from "./CreatePost";
import { useAppSelector } from "@/lib/hook";
import Image from "next/image";
import ImageIcon from "@mui/icons-material/Image";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CloseIcon from "@mui/icons-material/Close";
import Upload from "./DropUpload";
import SendIcon from "@mui/icons-material/Send";
import { useForm, SubmitHandler } from "react-hook-form";
import { createPost } from "@/app/api/posts";
import DeleteIcon from "@mui/icons-material/Delete";

const Modal = ({ post, setPost }: { post: Post; setPost: Dispatch<Post> }) => {
  const [loading, setLoading] = React.useState(false);
  type Inputs = {
    content: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const user = useAppSelector((state) => state.user);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (
      (post.type !== "text" && !post.url) ||
      (post.type !== "text" && !post.type)
    )
      return;
    setLoading(true);
    const postdata = await createPost({
      title: data.content,
      type: post.type,
      src: post.url || "none",
    });
    setLoading(false);
    if (postdata.success) {
      setPost({ active: false, type: "text", url: null });
    }
  };
  return (
    <div className="fixed inset-0 z-40 flex justify-center items-center bg-black  bg-opacity-40">
      <div className="bg-white dark:bg-slate-800 rounded-md p-4 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 justify-center items-center gap-2">
            <Image
              unoptimized={true}
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
              className={`w-full dark:bg-slate-700 bg-gray-100 p-2 rounded-md resize-none outline-none md:min-h-[400px] md:min-w-[700px] min-h-[200px] min-w-[300px]
              ${errors.content ? "placeholder:text-red-500" : ""}`}
              autoFocus={true}
              placeholder={
                errors.content
                  ? "Please write something to post"
                  : "What's on your mind?"
              }
              {...register("content", { required: true })}
            />
          ) : (
            <input
              type="text"
              className={` w-full dark:bg-slate-700 bg-gray-100 p-2 rounded-md resize-none outline-none md:min-w-[700px] ${
                errors.content ? "placeholder:text-red-500" : ""
              }`}
              autoFocus={true}
              placeholder={errors.content ? "Caption is required" : "Caption"}
              {...register("content", { required: true })}
              maxLength={100}
            />
          )}
          {post.type === "image" ? (
            <Upload Type="Image" post={post} setPost={setPost} />
          ) : post.type === "video" ? (
            <Upload Type="Video" post={post} setPost={setPost} />
          ) : null}

          <div className="flex justify-between  mt-2">
            <div className="flex space-x-2">
              <button
                className="flex space-x-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md p-2"
                onClick={() => setPost({ active: true, type: "image" })}
              >
                <ImageIcon className="text-primary-600 scale-110" />
                <p className="text-gray-500 dark:text-gray-400">Photo</p>
              </button>
              <button
                className="flex space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md"
                onClick={() => setPost({ active: true, type: "video" })}
              >
                <VideoCallIcon className="text-primary-600 scale-125" />
                <p className="text-gray-500 dark:text-gray-400">Video</p>
              </button>
              {post.url && (
                <button
                  className="flex space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md"
                  onClick={() => setPost({ ...post, url: null, type: "text" })}
                >
                  <DeleteIcon className="text-primary-600 scale-125" />
                  <p className="text-gray-500 dark:text-gray-400">Delete</p>
                </button>
              )}
            </div>
            <button
              className="flex justify-center text-sm md:text-lg gap-3 items-center rounded-full py-1 px-3 border-[1px] shadow-sm shadow-gray-300 dark:shadow-gray-700 dark:border-gray-700 border-gray-200 bg-gray-100 hover:dark:bg-gray-700 dark:bg-gray-800 hover:bg-gray-200 active:bg-gray-100 dark:active:bg-gray-800"
              onClick={handleSubmit(onSubmit)}
            >
              Post
              {!loading ? (
                <SendIcon className="text-primary-600 scale-110" />
              ) : (
                <span className="small-loader border-gray-500 dark:border-gray-200 border-b-transparent dark:border-b-transparent border-4"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
