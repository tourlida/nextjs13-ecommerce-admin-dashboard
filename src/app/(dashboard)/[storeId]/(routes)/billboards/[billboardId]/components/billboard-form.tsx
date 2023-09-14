"use client";
import ImageUpload from "@/common/components/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

//Extra form values type
type BillboardFormSchema = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: Billboard | null;
}
export default function BillboardForm({ initialData }: BillboardFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const actionMsg = initialData ? "Save changes" : "Create";
  const toastMsg= initialData ? 'Billboard updated' : 'Create billboard';

  const onSubmit = async (data: BillboardFormSchema) => {
    try {
      setIsLoading(true);
      if(initialData){
        await axios.patch(`/api/stores/${params.storeId}/billboards/${params.billboardId}`, data);
      }else{
        await axios.post(`/api/stores/${params.storeId}/billboards`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/billboards`);      
      toast(toastMsg, {
        type: "success",
        autoClose: 5,
        progress: 5,
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
      toast("Something went wrong", {
        type: "error",
        autoClose: 5,
        progress: 5,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BillboardFormSchema>({
    mode: "all",
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "16px" }}>
      <Stack gap={2} width={'250px'}>
      <Controller
        name="imageUrl"
        control={control}
        render={({ field }) => (
          <Stack gap={2}>
            <Typography
              variant="body1"
              component="div"
            >
              Background image
            </Typography>
            <ImageUpload
              value={field.value ? [field.value] : []}
              disabled={isLoading}
              onChange={(url) => field.onChange(url)}
              onRemove={() => field.onChange("")}
            />
          </Stack>
        )}
      />

      <Controller
        name="label"
        control={control}
        render={({ field }) => (
          <Stack>
            <Typography
              variant="body1"
              component="div"
            >
              Label
            </Typography>
            <TextField
              error={!!errors.label}
              autoFocus
              margin="dense"
              id="name"
              placeholder="Billboard label"
              type="text"
              fullWidth
              variant="outlined"
              helperText={errors.label?.message}
              required
              {...field}
            />
          </Stack>
        )}
      />
      <LoadingButton loading={isLoading} variant="contained" type="submit" >
        {actionMsg}
      </LoadingButton>
      </Stack>
    </form>
  );
}
