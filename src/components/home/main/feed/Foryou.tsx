"use client";
import { useState, useEffect } from "react";
import { getFeedPosts } from "@/app/api/posts";
import Post from "./Post";

const Foryou = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      const res = await getFeedPosts();
      if (res?.success) {
        setPosts(res.data);
        console.log("posts", res.data);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="flex flex-col space-y-8 max-w-[650px]">
      {posts.map((post) => (
        <Post post={post} posts={posts} setPosts={setPosts} />
      ))}
    </div>
  );
};

export default Foryou;
