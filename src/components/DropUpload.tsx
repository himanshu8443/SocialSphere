import { UploadDropzone } from "@/lib/uploadthing";

export default function Upload() {
  return (
    <div>
      <UploadDropzone
        config={{ mode: "auto", appendOnPaste: true }}
        content={{
          allowedContent: "Image(1MB), Video(10MB)",
        }}
        className="ut-allowed-content:text-cyan-600 data-[data-ut-element=button]:"
        endpoint="videoAndImage"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
