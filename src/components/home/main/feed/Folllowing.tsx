"use client";
import { useState, useEffect } from "react";
import { getPostsOfUserFollowing } from "@/app/api/posts";
import PostSkeleton from "./PostSkeleton";
import Post from "./Post";

const Following = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  useEffect(() => {
    const getPosts = async () => {
      if (lastPage) return;
      setLoading(true);
      const res = await getPostsOfUserFollowing({ limit: 4, page });
      setLoading(false);
      if (res?.success && res.data?.length > 0) {
        setPosts(page === 1 ? [...res.data] : [...posts, ...res.data]);
        console.log("posts", res.data);
      } else {
        setLastPage(true);
      }
    };
    getPosts();
  }, [page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 3) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="flex flex-col justify-center items-center gap-8 md:w-[540px] min-h-screen">
      {posts?.length === 0 && !loading && (
        <div className="flex items-center justify-center w-60">
          <p className="text-center text-gray-500 dark:text-gray-400">
            start following people to see their posts here
          </p>
        </div>
      )}
      {posts.length > 0 &&
        posts.map((post, index) => (
          <Post key={index} post={post} posts={posts} setPosts={setPosts} />
        ))}
      {
        // @ts-ignore
        loading && Array.of(1, 2).map((_, i) => <PostSkeleton key={i} />)
      }
    </div>
  );
};

export default Following;
