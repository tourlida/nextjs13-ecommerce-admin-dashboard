"use client";
import { Button, Divider, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useParams,useRouter } from "next/navigation";

export default function BillboardClient() {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Stack>
          <h1>Billboards (0)</h1>
          <Typography variant="body2" sx={{ opacity: "0.5" }}>
            Manage billboards for your store
          </Typography>
        </Stack>
        <Button variant="contained" onClick={()=>{
            router.push(`/${params.storeId}/billboards/new`);
        }}>
          <AddIcon className=" mr-2 h-4 w-4" />
          <Typography component="div" variant="button">
            {" "}
            Add new
          </Typography>
        </Button>
      </div>
      <Divider />
    </>
  );
}
