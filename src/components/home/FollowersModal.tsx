"use client";
import { useState, useEffect } from "react";
import { getFollowers } from "@/app/api/friends";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setFollowersModal } from "@/redux/slices/modals";
import { removeFollowerById } from "@/app/api/friends";

const UnfollowModal = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modals.followersModal);
  const [followers, setFollowers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFollowingList = async () => {
      setLoading(true);
      const res = await getFollowers();
      setLoading(false);
      if (res?.success) {
        setFollowers([...res.data]);
        console.log("following", res.data);
      }
    };
    getFollowingList();
  }, []);

  const remove = async (id: string) => {
    const res = await removeFollowerById(id);
    if (res?.success) {
      setFollowers(followers.filter((user) => user?.id !== id));
    }
  };

  return (
    modal && (
      <div
        className="fixed flex justify-center items-center z-50 inset-0 bg-black bg-opacity-50"
        onClick={() => dispatch(setFollowersModal(false))}
      >
        <div
          className="flex dark:bg-slate-800 bg-slate-300 flex-col items-start gap-8 max-w-[540px] p-5 md:h-[600px] overflow-y-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold">Followers</h2>
          {followers?.length === 0 && !loading && (
            <div className="flex items-center justify-center w-60">
              <p className="text-center text-gray-500 dark:text-gray-400">
                no followers
              </p>
            </div>
          )}
          {followers.length > 0 &&
            followers.map((user, index) => (
              <div className="flex items-center justify-between w-60">
                <div className="flex items-center justify-between gap-3">
                  <img
                    src={user?.profileImage}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-bold">{user?.name}</p>
                  </div>
                </div>
                <button
                  className="px-2 py-1 text-sm text-white bg-gray-500 rounded-md min-w-[80px] flex justify-center items-center hover:scale-95 active:scale-100 "
                  onClick={() => remove(user?.id)}
                >
                  {
                    // @ts-ignore
                    loading ? (
                      <span className="small-loader border-gray-500 dark:border-gray-200 border-b-transparent dark:border-b-transparent border-4"></span>
                    ) : (
                      "remove"
                    )
                  }
                </button>
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default UnfollowModal;
