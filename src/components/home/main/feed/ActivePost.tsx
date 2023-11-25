import { useAppSelector } from "@/lib/hook";
import { useSearchParams } from "next/navigation";
const Post = () => {
  const post = useAppSelector((state) => state.activePost);
  const params = useSearchParams().get("p");

  return (
    params && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50"></div>
    )
  );
};

export default Post;
