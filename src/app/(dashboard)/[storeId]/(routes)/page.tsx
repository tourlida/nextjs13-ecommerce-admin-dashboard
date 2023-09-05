'use client';
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function StorePage() {
    const selectedStore = useSelector((state: RootState) => state.app.selectedStore);

    return <div>Active store: {selectedStore?.name}</div>;
  }