import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  Image: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload complete ", metadata);

    console.log("file url", file.url);
  }),
  Video: f({
    video: {
      maxFileSize: "64MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload complete ", metadata);

    console.log("file url", file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
