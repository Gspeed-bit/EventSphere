"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="bg-grey-50 rounded-xl h-72 cursor-pointer  overflow-hidden"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <img src={imageUrl} alt="image" width={750} height={250}/>
        </div>
      ) : (
        <div className=" space-y-4 my-6 flex flex-sm text-grey-400">
          <img
            src="/assets/icons/upload.svg"
            width={77}
            height={77}
            alt="file upload"
            className=""
          />
          <h3 className="p-regular-16">Drag photo here</h3>
          <p className="p-regular-14">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
