"use client";
import LoadingBar from "react-top-loading-bar";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { setProgress } from "@/redux/slices/TopLoadingBar";

const TopLoadingBar = () => {
  const progress = useAppSelector((state) => state.topLoadingBar.progress);
  const dispatch = useAppDispatch();
  return (
    <LoadingBar
      color="#00A0BC"
      height={1.4}
      progress={progress}
      onLoaderFinished={() => dispatch(setProgress(0))}
    />
  );
};

export default TopLoadingBar;
