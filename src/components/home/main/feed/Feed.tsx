"use client";
import { useState } from "react";
import Foryou from "./Foryou";
import ActivePost from "../ActivePost";
import Following from "./Folllowing";
import { useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";

const Feed = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.auth);
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  return (
    <>
      <div className=" p-3 rounded-md flex gap-16  justify-center">
        <button
          className={`rounded-xl px-3 py-1 ${
            activeTab === 0
              ? "dark:bg-primary-800 text-gray-600 bg-gray-200 dark:text-gray-200"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab(0)}
        >
          For you
        </button>
        <span className="border-r-[1px] border-gray-300 dark:border-gray-700"></span>
        <button
          className={`rounded-xl px-3 py-1 ${
            activeTab === 1
              ? "dark:bg-primary-800 text-gray-600 bg-gray-200 dark:text-gray-200"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => {
            if (!user) {
              router.push("/login");
              return;
            }
            setActiveTab(1);
          }}
        >
          Following
        </button>
      </div>
      {activeTab === 0 ? <Foryou /> : <Following />}
      <ActivePost />
    </>
  );
};

export default Feed;
