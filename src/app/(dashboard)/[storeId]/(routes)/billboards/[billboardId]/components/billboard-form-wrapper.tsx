"use client";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState } from "react";
import { AlertModal } from "@/common/components/modals/alert-modal";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectStore } from "@/common/reducers/app.slice";
import { RootState } from "@/redux/store";
import BillboardForm from "./billboard-form";
import { Billboard } from "@prisma/client";

interface BillboardFormWrapperProps {
  initialData: Billboard | null;
}
export default function BillboardFormWrapper({
  initialData,
}: BillboardFormWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const dispath = useDispatch();
  const store = useSelector((state: RootState) => state.app.selectedStore);
  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard" : "Add a new billboard";

  const handleDeleteStore = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh();
      router.push("/");
      toast("Billboard deleted successfully.", {
        type: "success",
        progress: 5,
        autoClose: 4,
        position: "top-right",
      });
    } catch (error) {
      console.error(error);

      toast("Make sure you removed all categories using this billboard.", {
        type: "error",
        progress: 5,
        autoClose: 4,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const headingEl = (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDeleteStore}
        isLoading={isLoading}
      />
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <h1>{title}</h1>
          <Typography variant="body2" sx={{ opacity: "0.5" }}>
            {description}
          </Typography>
        </Stack>
        {initialData && (
          <Button
            onClick={() => {
              setIsOpen(true);
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
        )}
      </Stack>
      <Divider sx={{ mt: 2, mb: 2, height: "2px" }} />
    </>
  );

  return (
    <Box
      sx={{
        padding: 4,
        height: "100%",
      }}
    >
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDeleteStore}
        isLoading={isLoading}
      />
      {headingEl}
      <BillboardForm initialData={initialData} />
    </Box>
  );
}
