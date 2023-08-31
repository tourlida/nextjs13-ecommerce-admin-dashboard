"use client";

import { Store } from "@prisma/client";
import { redirect, useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useStoreModal } from "../hooks/useStoreModal";
import { Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { cn, getUserId } from "../utils/helpers";
import prismadb from "../utils/prismadb";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";


export default function StoreSwitcher() {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [stores, setStores] = useState<Store[] | []>([]);
  const { user } = useUser();

  const formattedItems = stores.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  useEffect(() => {
    if (user && user.sub !== "") {
      axios.get(`/api/getStores?userId=${user.sub}`)
        .then(response => {
          setStores(response.data);
        })
        .catch(error => {
          console.error("Error fetching stores:", error);
        });
    }
  }, [user]);


 

  const selectedStore = formattedItems.find(
    (item: { value: string | string[]; }) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    console.log("onStoreSelect-store->", store);
    setAnchorEl(null);
    console.log("onStoreSelect-router->", router);
    router.push(`/storeoverview/${store.value}`);
  };

  const handleTogglePopover = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (anchorEl === null) {
        setAnchorEl(e.currentTarget);
      } else {
        setAnchorEl(null);
      }
    },
    [anchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const isOpen = Boolean(anchorEl);

  return (
    <>
      <Button
        variant="outlined"
        size="medium"
        sx={{
          width: "170px",
          justifyContent: "space-between",
        }}
        onClick={(e) => handleTogglePopover(e)}
      >
        <StorefrontIcon className="mr-2 h-4 w-4" />
        <Typography
          variant="caption"
          sx={{
            maxWidth: "100%",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textTransform: "none",
          }}
          component="div"
        >
          {selectedStore?.label}
        </Typography>
        <UnfoldMoreIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
      </Button>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
        elevation={0}
        sx={{
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {formattedItems.map((store) => {
          return (
            <MenuItem
              key={store.value}
              onClick={(e) => {
                onStoreSelect(store);
              }}
              className="text-sm"
            >
              <StorefrontIcon className="mr-2 h-4 w-4" />
              <Typography
                component="div"
                sx={{
                  maxWidth: "100%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textTransform: "none",
                }}
                variant="button"
              >
                {store.label}
              </Typography>
              <CheckIcon
                className={cn(
                  "mr-2 ml-2 h-4 w-4",
                  selectedStore?.value === store.value
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
            </MenuItem>
          );
        })}
        <MenuItem>
          <Divider sx={{ height: "2px", width: "100%" }} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            storeModal.onOpen();
          }}
          className="text-sm"
        >
          <AddCircleOutlineIcon className="mr-2 h-5 w-5" />
          Create Store
        </MenuItem>
      </Menu>
    </>
  );
}

