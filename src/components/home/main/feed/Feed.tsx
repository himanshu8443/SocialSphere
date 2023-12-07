"use client";
import { useState } from "react";
import Foryou from "./Foryou";
import ActivePost from "./ActivePost";
import Following from "./Folllowing";

const Feed = () => {
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
          onClick={() => setActiveTab(1)}
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
