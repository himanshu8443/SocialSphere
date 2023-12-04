import { toast } from "react-toastify";
import { trpc } from "../../trpc/trpc";

export const createComment = async (postId: string, content: string) => {
  try {
    const result = await trpc.comments.createComment.mutate({
      postId,
      content,
    });
    if (result.success) toast.success(result.message);
    return result;
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    toast.error(error?.data?.message);
    return error;
  }
};

export const getComments = async (postId: string) => {
  try {
    const result = await trpc.comments.getCommentsByPostId.query({ postId });
    return result;
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    toast.error(error?.data?.message);
    return error?.data?.message;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const result = await trpc.comments.deleteComment.mutate({ commentId });
    if (result.success) toast.success(result.message);
    return result;
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    toast.error(error?.data?.message);
    return error;
  }
};
