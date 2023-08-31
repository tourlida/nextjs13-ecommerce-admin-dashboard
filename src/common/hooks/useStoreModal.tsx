import { useCallback } from "react";
import {  useSelector } from "react-redux";
import { toggleStoreModalOpen } from "../reducers/app.slice";
import { RootState } from "@/redux/store";
import { useDispatch } from "@/redux/hook";

interface useStoreModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoreModal = ():useStoreModalStore => {
  const dispatch = useDispatch();

  const handleStoreModalOpen = useCallback(() => {
    dispatch(toggleStoreModalOpen(true));
  }, [dispatch]);

  const handleStoreModalClose = useCallback(() => {
    dispatch(toggleStoreModalOpen(true));
  }, [dispatch]);

  const IsStoreModalOpen = useSelector(
    (state: RootState) => state.app.IsStoreModalOpen
  );

  return {
    isOpen: IsStoreModalOpen,
    onOpen: handleStoreModalOpen,
    onClose: handleStoreModalClose,
  };
};
