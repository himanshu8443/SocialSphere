"use client";
import { useState, useEffect } from "react";
import { getFeedPosts } from "@/app/api/posts";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

const Foryou = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const res = await getFeedPosts({ limit: 4, page });
      setLoading(false);
      if (res?.success && res.data?.length > 0) {
        setPosts(page === 1 ? [...res.data] : [...posts, ...res.data]);
        console.log("posts", res.data);
      }
    };
    getPosts();
  }, [page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-[540px] min-h-screen">
      {posts.map((post) => (
        <Post key={post?.id} post={post} posts={posts} setPosts={setPosts} />
      ))}
      {
        // @ts-ignore
        loading && Array.of(1, 2).map((_, i) => <PostSkeleton key={i} />)
      }
    </div>
  );
};

export default Foryou;
