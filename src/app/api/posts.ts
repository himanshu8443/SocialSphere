import { toast } from "react-toastify";
import { trpc } from "../../trpc/trpc";

export async function createPost({
  title,
  src,
  type,
}: {
  title: string;
  src?: string;
  type: "image" | "video" | "text";
}) {
  try {
    const result = await trpc.posts.createPost.mutate({
      title,
      src,
      type,
    });
    // console.log("result", result);
    if (result.success) toast.success(result.message);
    return result;
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    toast.error(error?.data?.message);
    return {
      success: false,
      message: error?.data?.message,
    };
  }
}

// get posts
export async function getFeedPosts({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) {
  try {
    const result = await trpc.posts.getPosts.query({ limit, page });
    return result;
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    toast.error("Network Error");
    return error?.data?.message;
  }
}

// like/unlike
export async function likeUnlikePost(postId: string) {
  try {
    const result = await trpc.posts.LikeUnlikePost.mutate(postId);
    return result;
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    toast.error(error?.data?.message);
    return error?.data?.message;
  }
}

// get post by id

export async function getPostById(postId: string) {
  try {
    const result = await trpc.posts.getPostById.query(postId);
    return result;
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    toast.error(error?.data?.message);
    return error?.data?.message;
  }
}

// get posts of user following
export async function getPostsOfUserFollowing({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) {
  try {
    const result = await trpc.posts.getFollowingPosts.query({ limit, page });
    return result;
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    toast.error(error?.data?.message);
    return error?.data?.message;
  }
}
