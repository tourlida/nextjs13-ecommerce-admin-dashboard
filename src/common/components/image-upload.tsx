"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  console.log("ImageUpload..", value);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
      <Stack gap={2}>
        {value.map((url) => {
          return (
            <div
              key={url}
              className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  onClick={() => {
                    onRemove(url);
                  }}
                  sx={{
                    height: "fit-content",
                    width: "fit-content",
                    border: "1px solid #FF605A",
                    color: "white",
                    bgcolor: "#F15857",
                    "&:hover": {
                      bgcolor: "#F15857",
                      opacity: "0.8",
                    },
                    "&:active": {
                      bgcolor: "#F15857",
                      opacity: "0.7",
                    },
                  }}
                >
                  <DeleteIcon className="h-4 w-4" />
                </Button>
              </div>
              <Image fill className="object-cover" alt="Image" src={url} />
            </div>
          );
        })}

        <CldUploadWidget onUpload={onUpload} uploadPreset="wj8yejwj">
          {({ open }) => {
            const onClick = () => {
              open();
            };

            return (
              <Button disabled={disabled} variant="outlined" onClick={onClick} sx={{
                width:'200px',
                marginBottom:2
              }}>
                <AddPhotoAlternateIcon className=" mr-2 h-4 w-4" />
                <Typography component="div" variant="button">
                  {" "}
                  Upload an image
                </Typography>
              </Button>
            );
          }}
        </CldUploadWidget>
      </Stack>
  );
}
