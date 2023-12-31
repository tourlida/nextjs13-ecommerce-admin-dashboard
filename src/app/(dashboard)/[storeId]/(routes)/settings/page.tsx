"use client";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState } from "react";
import { AlertModal } from "@/common/components/modals/alert-modal";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ApiAlert from "@/app/(dashboard)/[storeId]/(routes)/settings/components/api-alert";
import SettingsForm from "./components/settings-form";
import { useDispatch, useSelector } from "react-redux";
import { selectStore } from "@/common/reducers/app.slice";
import { RootState } from "@/redux/store";

export default function StoreSettingsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const dispath = useDispatch();
  const selectedStore = useSelector((state:RootState) => state.app.selectedStore);
  //todo need to check if any other store exists
  /*if(!selectedStore && stores.length===0){
    window.location.assign(`/`);
  }*/
  

  const handleDeleteStore = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      dispath(selectStore(null));
      router.refresh();
      router.push('/');
      toast("Store deleted successfully.", {
        type: "success",
        progress: 5,
        autoClose: 4,
        position: "top-right",
      });
    } catch (error) {
      console.error(error);

      toast("Make sure you removed all products and categories first.", {
        type: "error",
        progress: 5,
        autoClose: 4,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }, [dispath, params.storeId, router]);

  const headingEl = (
    <>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <h1>Settings</h1>
          <Typography variant="body2" sx={{ opacity: "0.5" }}>
            Manage store preferences
          </Typography>
        </Stack>
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
      <SettingsForm />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </Box>
  );
}
