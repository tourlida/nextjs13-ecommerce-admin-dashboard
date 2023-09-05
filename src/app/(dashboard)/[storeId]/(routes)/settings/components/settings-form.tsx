import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string({
      errorMap: () => {
        return { message: "Name is required." };
      },
    })
    .min(1),
});

//Extra form values type
type SettingsFormSchema = z.infer<typeof formSchema>;

export default function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const store = useSelector((state: RootState) => state.app.selectedStore);

  const onSubmit = async (data: SettingsFormSchema) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast("Store updated successfully.", {
        type: "success",
        autoClose:5,
        progress: 5,
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
      toast("Something went wrong", {
        type: "error",
        autoClose:5,
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
  } = useForm<SettingsFormSchema>({
    mode: "all",
    defaultValues:{
      name: store?.name
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "16px" }}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            error={!!errors.name}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            placeholder="E-commerce..."
            type="text"
            fullWidth
            variant="outlined"
            helperText={errors.name?.message}
            required
            {...field}
          />
        )}
      />

      <LoadingButton loading={isLoading} variant="contained" type="submit">
        Save changes
      </LoadingButton>
    </form>
  );
}
