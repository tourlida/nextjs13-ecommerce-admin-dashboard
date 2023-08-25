"use client";
import { useDispatch, useSelector } from "react-redux";
import { toggleThemeMode } from "@/common/reducers/app.slice";
import { RootState } from "@/redux/store";

export default function Home() {
  const dispatch = useDispatch();
  const handleToggleTheme = () => {
    console.log("handleToggleTheme");
    dispatch(toggleThemeMode());
  };

  const themeMode = useSelector((state: RootState) => state.app.themeMode);

  return (
    <main>
      <button onClick={() => handleToggleTheme()}>
        Toggle theme 
      </button>
      <p>{themeMode}</p>
    </main>
  );
}
