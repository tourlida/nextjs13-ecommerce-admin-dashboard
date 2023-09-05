"use client";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StorageIcon from "@mui/icons-material/Storage";

import { toast } from "react-toastify";
import {
  Alert,
  AlertTitle,
  Badge,
  BadgeProps,
  Box,
  Button,
  Chip,
  ChipProps,
  Stack,
  Typography,
} from "@mui/material";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const variantDetails: Record<
  ApiAlertProps["variant"],
  { text: string; chipColor: ChipProps["color"] }
> = {
  public: { text: "Public", chipColor: "default" },
  admin: { text: "Admin", chipColor: "error" },
};

export default function ApiAlert({
  title,
  description,
  variant,
}: ApiAlertProps) {
  const { text, chipColor } = variantDetails[variant];

  const handlCopyClick = () => {
    navigator.clipboard.writeText(description);
    toast("API Route copied to the clipboard.", {
      type: "success",
      progress: 5,
      autoClose:4,
      position: "top-right",
    });
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #E2E8F0", borderRadius: "8px" }}>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row">
          <StorageIcon className="h-4 w-4" />
          <Typography component="div" sx={{ ml: 2 }}>
            {title}
          </Typography>
        </Stack>
        <Chip color={chipColor} label={text} />
      </Stack>
      <Stack sx={{
        mt:2,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
        <code  className="bg-stone-300 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outlined" onClick={handlCopyClick}>
          <ContentCopyIcon className="h-4 w-4" />
        </Button>
      </Stack>
    </Box>
  );
}
