import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  videoAndImage: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
    video: {
      maxFileSize: "16MB",
    },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload complete ", metadata);

    console.log("file url", file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
