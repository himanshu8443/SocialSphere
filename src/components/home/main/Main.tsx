import Feed from "./feed/Feed";
import CreatePost from "./createpost/CreatePost";

const Main = () => {
  return (
    <div className="mr-56">
      <CreatePost />
      <Feed />
    </div>
  );
};

export default Main;
