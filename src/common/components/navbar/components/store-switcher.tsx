"use client";

import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useStoreModal } from "../../../hooks/useStoreModal";
import {
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useOrigin } from "../../../hooks/useOrigin";
import { useDispatch, useSelector } from "react-redux";
import { selectStore } from "@/common/reducers/app.slice";
import { RootState } from "@/redux/store";

const fetchStores = (originUrl: string) => {
  return fetch(`${originUrl}/api/stores`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
};

export default function StoreSwitcher() {
  const storeModal = useStoreModal();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const selectedStore = useSelector((state: RootState) => state.app.selectedStore);

  const dispath = useDispatch();

  const origin = useOrigin();

  const loadData = useCallback(() => {
    fetchStores(origin).then((data) => setStores(data));
  }, [origin]);

  useEffect(() => {
    console.log('loadData..')
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{
    //if no store is selected pre-select the first one
    if(!selectedStore && stores?.length>0){
      dispath(selectStore(stores[0]));
    }else if(selectedStore && stores?.length===0){
      dispath(selectStore(null));
    }
  },[dispath, selectedStore, stores])

  console.log('stores->',stores)
  const formattedItems = stores?.map((item) => {
    return {
      ...item,
      label: item.name,
      value: item.id,
    };
  }) ?? [];

  

  const onStoreSelect = (store:any)=>{ // { value: string; label: string }) => {
    //store selected store in redux 
    dispath(selectStore(store));
    setAnchorEl(null);
    router.push(`/${store.value}`);
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
  console.log('[StoreSwitcher]selectedStore->',selectedStore)

  return (
    <>
      <Button
        variant="outlined"
        size="medium"
        sx={{
          width: "170px",
          justifyContent: "space-between",
          flexGrow: {
            xs: 2,
            sm: 2,
            md: 2,
            lg: 0,
          },
        }}
        onClick={(e) => handleTogglePopover(e)}
        startIcon={<StorefrontIcon className="mr-2 h-4 w-4" />}
        endIcon={
          <UnfoldMoreIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        }
      >
        {selectedStore ? (
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
            {selectedStore?.name}
          </Typography>
        ) : (
          <Typography
            variant="caption"
            sx={{
              maxWidth: "100%",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textTransform: "none",
              opacity: 0.4,
            }}
            component="div"
          >
            Select a store...
          </Typography>
        )}
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
          flexGrow: {
            xs: 2,
            sm: 2,
            md: 2,
            lg: 0,
          },
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
              <StorefrontIcon className="h-4 w-4" />
              <Typography
                component="div"
                sx={{
                  maxWidth: "100%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textTransform: "none",
                  ml: 2,
                  mr: 2,
                }}
                variant="button"
              >
                {store.label}
              </Typography>

              {selectedStore?.id === store.value && (
                <CheckIcon className={"mr-2 ml-2 h-4 w-4"} />
              )}
            </MenuItem>
          );
        })}
        <Divider sx={{ height: "2px", margin:'8px 16px' }} />
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
