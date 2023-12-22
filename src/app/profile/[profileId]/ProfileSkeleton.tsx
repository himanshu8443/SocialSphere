import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="mx-auto max-w-[1200px] min-h-screen mt-10 px-5 animate-pulse">
      <div className="flex justify-between items-center md:gap-16 max-w-[600px] mx-auto">
        <div className="rounded-full md:w-[150px] md:h-[150px] w-[100px] h-[100px] bg-gray-200 dark:bg-gray-700" />
        <div className="flex flex-col gap-4">
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-32 md:w-48 mb-4"></div>
          <div className="flex space-x-5">
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>

            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300"></p>
        </div>
      </div>
      <hr className="my-5 dark:border-gray-700 border-gray-300" />
      <div className="flex flex-col md:gap-5 items-center justify-center">
        <div className="w-full mx-auto">
          <div className="flex flex-wrap md:gap-5 gap-1 md:justify-center  items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((post: any) => (
              <div
                key={post?.id}
                className="relative md:w-[300px] md:h-[300px] h-[120px] w-[120px] rounded-md overflow-hidden cursor-pointer bg-gray-200 dark:bg-gray-700"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
