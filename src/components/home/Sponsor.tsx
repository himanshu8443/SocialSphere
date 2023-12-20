import Image from "next/image";
import add from "../../assets/add.jpeg";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Sponsor = () => {
  return (
    <div className=" h-[310px] w-[310px] relative hidden md:block">
      <div className="dark:bg-gray-800 bg-gray-100  rounded-md p-3 h-fit flex flex-col justify-between gap-2 ">
        <div className="flex justify-between items-center cursor-pointer">
          <p className="text-gray-500 dark:text-gray-400 font-semibold">
            Kalu Cosmetics
          </p>
          <div className="text-gray-500 dark:text-gray-400 flex items-center gap-2 cursor-pointer">
            visit <OpenInNewIcon className="scale-75" />
          </div>
        </div>
        <Image
          src={add}
          width={300}
          height={300}
          alt="sponsor"
          className="cursor-pointer"
        />
        <div className="flex justify-between items-center  text-xs">
          <p className="text-gray-500 dark:text-gray-400 font-semibold cursor-pointer">
            Sponsored
          </p>
          <p className="text-gray-500 dark:text-gray-400 italic cursor-pointer">
            why this ad?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
