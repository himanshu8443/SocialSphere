import Main from "@/components/home/main/Main";
import SideProfile from "@/components/home/SideProfile";
import Sponsor from "@/components/home/Sponsor";
import FollowingModal from "@/components/home/FollowingModal";
import FollowersModal from "@/components/home/FollowersModal";

export default function Home() {
  return (
    <div className=" flex gap-10 p-5 justify-between max-w-[1400px] mx-auto">
      <SideProfile />
      <Main />
      <Sponsor />
      <FollowingModal />
      <FollowersModal />
    </div>
  );
}
