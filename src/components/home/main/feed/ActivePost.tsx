import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPostById } from "@/app/api/posts";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";
import { timeAgo } from "./Post";
import { createComment, deleteComment } from "@/app/api/comments";
import SendIcon from "@mui/icons-material/Send";
import { getComments } from "@/app/api/comments";
import Comments from "./PostComments";
import { useRouter } from "next/navigation";

const ActivePost = () => {
  const params = useSearchParams().get("p");
  const router = useRouter();
  const [post, setPost] = useState<any>();
  const [content, setContent] = useState<string>("");
  const [CommentLoading, setCommentLoading] = useState(false);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    async function getPostData() {
      if (params) {
        // get post
        const res = await getPostById(params);
        if (res?.success && mounted) {
          setPost(res.data);
        }

        // get comments
        const comments = await getComments(params);
        if (comments?.success && mounted) {
          setComments(comments.data);
          console.log("comments", comments.data);
        }
      }
    }
    getPostData();

    return () => {
      mounted = false;
    };
  }, [params]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (content?.length > 0 && params) {
      setCommentLoading(true);
      const res = await createComment(params, content);
      setCommentLoading(false);
      setContent("");
      if (res?.success) {
        setComments(res.data);
      }
    }
  };

  const deleteUserComment = async (id: string) => {
    const res = await deleteComment(id);
    console.log(res);
    if (res?.success) {
      setComments(
        comments.filter((comment) => comment?.id.toString() !== id.toString())
      );
    }
  };

  return (
    params && (
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={() =>
          router.replace("/", {
            scroll: false,
          })
        }
      >
        <div className="flex  relative" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col dark:bg-gray-800 bg-gray-100  min-h-[500px] min-w-[400px]  rounded-l-md">
            {post?.type === "text" && (
              <p
                className={`text-gray-600 dark:text-gray-300 overflow-y-auto max-h-[600px] p-2 min-h-[43px] max-w-[500px] flex items-center text-justify px-2 ${
                  post?.type !== "text" ? "text-lg font-medium " : ""
                }`}
              >
                {post?.title}
              </p>
            )}
            {post?.type === "image" ? (
              <div className="flex justify-center items-center w-full h-full ">
                <Image
                  alt="Post"
                  src={post?.src}
                  height={700}
                  width={850}
                  className=" h-auto max-h-[700px] object-contain w-auto max-w-[830px]"
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
          <div className=" relative dark:bg-gray-800 bg-gray-100  ">
            <div className="flex space-x-2 justify-start items-center gap-2 p-2 w-[300px] dark:bg-gray-700 bg-gray-200 rounded-tr-md rounded-b-md">
              <Image
                alt="Profile"
                src={post?.User?.profileImage}
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-gray-500 dark:text-gray-300 hover:underline cursor-pointer font-semibold text-lg">
                {post?.User?.name}
              </p>
              <p className="text-gray-500 dark:text-gray-400 font-semibold text-base">
                • {timeAgo(post?.createdAt)}
              </p>
            </div>
            <div className="dark:bg-gray-800 bg-gray-100  p-2 w-[300px] flex flex-col">
              {post?.type !== "text" && (
                <p
                  className={`text-gray-600 dark:text-gray-300 overflow-y-auto max-h-[600px] p-2 min-h-[43px] max-w-[500px] flex items-center text-justify px-2 ${
                    post?.type !== "text" ? "text-lg font-medium " : ""
                  }`}
                >
                  {post?.title}
                </p>
              )}
              <div className="h-[400px]  overflow-y-scroll">
                {comments?.length === 0 && (
                  <p className="text-gray-400 dark:text-gray-400 text-center font-semibold mt-10">
                    No comments yet
                  </p>
                )}
                {comments?.map((comment) => (
                  <Comments
                    comment={comment}
                    key={comment?.id}
                    deleteUserComment={deleteUserComment}
                  />
                ))}
              </div>
            </div>
            <div className="flex absolute bottom-0 justify-center items-center gap-2 dark:bg-gray-800 bg-gray-100 rounded-md  p-2 w-[300px] border-t dark:border-gray-500 border-gray-300">
              <Image
                alt="Profile"
                src={post?.User?.profileImage}
                width={30}
                height={30}
                className="rounded-full"
              />
              <form
                onSubmit={handleSubmit}
                className="w-full flex items-center justify-between  "
              >
                <input
                  autoFocus={true}
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  type="text"
                  placeholder="Add a comment"
                  className="dark:bg-gray-800 bg-gray-100 rounded-md p-2 w-full focus:outline-none"
                />
                <button
                  type="submit"
                  className="dark:border-gray-700 border-gray-200 shadow-sm shadow-gray-300 dark:shadow-gray-700 p-1 rounded-lg border  bg-gray-100 hover:dark:bg-gray-700 dark:bg-gray-800 hover:bg-slate-200 active:bg-gray-100 dark:active:bg-gray-800 flex justify-center items-center"
                >
                  {CommentLoading ? (
                    <span className="small-loader border-gray-500 dark:border-gray-200 border-b-transparent dark:border-b-transparent border-4"></span>
                  ) : (
                    <SendIcon className="text-primary-600 " />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ActivePost;
