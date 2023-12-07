import Feed from "./feed/Feed";
import CreatePost from "./createpost/CreatePost";

const Main = () => {
  return (
    <div className=" flex flex-col items-center justify-center w-full">
      <CreatePost />
      <Feed />
    </div>
  );
};

export default Main;
