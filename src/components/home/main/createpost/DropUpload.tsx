import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import Image from "next/image";
import { Post } from "./CreatePost";

export default function Upload({
  Type,
  post,
  setPost,
}: {
  Type: "Image" | "Video";
  post: Post;
  setPost: Dispatch<Post>;
}) {
  return (
    <div>
      {!post.url ? (
        <UploadDropzone
          config={{ mode: "auto", appendOnPaste: true }}
          content={{
            allowedContent: Type,
          }}
          className="ut-allowed-content:text-gray-400 ut-label:text-primary-500 md:h-[300px] ut-button:bg-primary-700 data-[data-ut-element=button]: cursor-pointer"
          endpoint={Type}
          onClientUploadComplete={(res: any) => {
            setPost({ ...post, url: (res[0].url as string) || null });
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            console.log("Error: ", error);
            toast.error(error.message);
          }}
        />
      ) : Type === "Image" ? (
        <div className="flex justify-center items-center mt-2">
          <Image
            src={post.url as string}
            width={400}
            height={400}
            alt="Img"
            className="md:max-w-full md:w-auto object-cover"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center mt-2">
          <video
            src={post.url as string}
            width={700}
            height={400}
            controls
            className="md:max-w-full aspect-video md:h-[400px]"
          />
        </div>
      )}
    </div>
  );
}
