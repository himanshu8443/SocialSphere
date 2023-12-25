import React from "react";
import Image from "next/image";
import { timeAgo } from "./feed/Post";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "@/lib/hook";

const Comments = ({
  comment,
  deleteUserComment,
}: {
  comment: any;
  deleteUserComment: (id: string) => void;
}) => {
  const user = useAppSelector((state) => state.user);

  return (
    <div
      key={comment?._id}
      className="flex flex-col justify-center gap-2  p-2 "
    >
      <hr className="border-gray-300 dark:border-gray-600" />

      <div className="flex space-x-2 justify-start items-center gap-2 ">
        <Image
          alt="Profile"
          src={comment?.User?.profileImage}
          width={30}
          height={30}
          className="rounded-full"
        />
        <p className="text-gray-500 dark:text-gray-300 hover:underline cursor-pointer font-semibold text-sm">
          {comment?.User?.name}
        </p>
        <p className="text-gray-500 dark:text-gray-400 font-semibold text-xs">
          • {timeAgo(comment?.createdAt)}
        </p>
        {user?.id === comment?.User?.id && (
          <button onClick={() => deleteUserComment(comment?.id)}>
            <DeleteIcon className="text-gray-500 dark:text-gray-400 cursor-pointer hover:text-red-500 dark:hover:text-red-500 scale-75" />
          </button>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-300 overflow-y-auto max-h-[600px] p-2 min-h-[43px] max-w-[500px] flex items-center text-justify px-2 ">
        {comment?.content}
      </p>
    </div>
  );
};

export default Comments;
