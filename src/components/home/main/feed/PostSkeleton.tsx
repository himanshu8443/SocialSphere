import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShareIcon from "@mui/icons-material/Share";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const PostSkeleton = () => {
  return (
    <div className="dark:bg-gray-800 bg-gray-100 rounded-md px-2 py-4 max-h-[820px] w-[530px] ">
      <div className="animate-pulse">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 justify-center items-center gap-2 ">
            <svg
              className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-300 hover:underline cursor-pointer font-semibold text-lg">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </p>
            <p className="text-gray-500 dark:text-gray-400 font-semibold text-base flex ">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </p>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            <button
              className="p-2 pr-3 active:bg-transparent dark:active:bg-transparent hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full justify-center items-center flex"
              title="Add Friend"
            >
              <PersonAddIcon
                className="text-primary-600 scale-[1.4]
                duration-1000 ease-linear transition-all animate-none"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <div className="flex justify-center items-center w-full h-full ">
            <div className="flex items-center justify-center h-[400px] w-[500px] bg-gray-300 rounded dark:bg-gray-700">
              <svg
                className="w-full h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5 px-2 animate-none">
          <div className="flex space-x-10">
            <button className="flex space-x-2 items-center active:scale-150 ease-linear transition-all duration-200">
              <FavoriteBorderIcon
                style={{ fontSize: 28 }}
                className="dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 text-gray-500 scale-125"
              />
            </button>
            <button className="flex space-x-2 items-center" title="Comment">
              <SmsOutlinedIcon
                style={{ fontSize: 30 }}
                className="dark:text-gray-300 text-gray-500 icon-flipped"
              />
            </button>
          </div>
          <button
            className="flex justify-center items-center hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full p-2 pr-3 py-3  active:bg-transparent dark:active:bg-transparent"
            title="Share"
          >
            <ShareIcon className="dark:text-gray-400 text-gray-500 scale-125" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
