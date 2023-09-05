"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { IconButton, Skeleton, Stack } from "@mui/material";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useStoreModal } from "@/common/hooks/useStoreModal";
import { LoadingButton } from "@mui/lab";

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
type StoreModalSchema = z.infer<typeof formSchema>;

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreModalSchema>({
    mode: "all",
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSumbit = async (values: StoreModalSchema) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast("Something went wrong", {
        type: "error",
        progress: 5,
        autoClose:4,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={storeModal.isOpen}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between">
          Create Store
          <IconButton onClick={() => storeModal.onClose()}>
            <CloseIcon className="h-4 w-4" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add a new store to manage products and categories.
        </DialogContentText>

        <form onSubmit={handleSubmit(onSumbit)}>
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

          <DialogActions>
            <LoadingButton
              loading={isLoading}
              variant="outlined"
              onClick={() => storeModal.onClose()}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              type="submit"
            >
              Continue
            </LoadingButton>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
