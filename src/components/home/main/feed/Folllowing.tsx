"use client";
import { useState, useEffect } from "react";
import { getPostsOfUserFollowing } from "@/app/api/posts";
import Post from "./Post";

const Following = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      const res = await getPostsOfUserFollowing();
      if (res?.success) {
        setPosts(res.data);
        console.log("posts", res.data);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center max-w-[650px] w-[570px]">
      {posts?.length === 0 && (
        <div className="flex items-center justify-center h-96 w-60">
          <p className="text-center text-gray-500 dark:text-gray-400">
            start following people to see their posts here
          </p>
        </div>
      )}
      {posts.length > 0 &&
        posts.map((post) => (
          <Post key={post?.id} post={post} posts={posts} setPosts={setPosts} />
        ))}
    </div>
  );
};

export default Following;
