import Main from "@/components/home/main/Index";
import SideProfile from "@/components/home/SideProfile";
import Sponsor from "@/components/home/Sponsor";

export default function Home() {
  return (
    <div className=" flex gap-10 p-5 justify-between max-w-[1300px] mx-auto">
      <SideProfile />
      <Main />
      <Sponsor />
    </div>
  );
}
