"use client";

import { toggleStoreModalOpen } from "@/common/reducers/app.slice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function RootPage() {
  const dispatch = useDispatch();
  const IsStoreModalOpen = useSelector((state: RootState) => state.app.IsStoreModalOpen);

  useEffect(()=>{
    if(!IsStoreModalOpen){
      dispatch(toggleStoreModalOpen(true));
    }
},[IsStoreModalOpen, dispatch]);

return null

}
