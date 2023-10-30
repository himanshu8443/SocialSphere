import { trpc } from "../../trpc/trpc";

export async function createPost({
  title,
  content,
  src,
  type,
}: {
  title: string;
  content?: string;
  src?: string;
  type: "image" | "video";
}) {
  try {
    const result = await trpc.posts.createPost.mutate({
      title,
      content,
      src,
      type,
    });
    console.log("result", result);
    return {
      success: true,
      message: "Successfully created post",
      data: result,
    };
  } catch (error: any) {
    console.log("error message", error?.data?.message);
    console.log("error", error);
    return {
      success: false,
      message: error?.data?.message,
    };
  }
}
