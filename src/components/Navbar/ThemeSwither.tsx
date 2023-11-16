"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightsStayIcon from "@mui/icons-material/NightsStay";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="dark:border-gray-700 border-gray-200 shadow-sm shadow-gray-300 dark:shadow-gray-700 p-2 rounded-lg border  bg-gray-100 hover:dark:bg-gray-700 dark:bg-gray-800 hover:bg-slate-200 active:bg-gray-100 dark:active:bg-gray-800">
      {theme === "light" ? (
        <button onClick={() => setTheme("dark")}>
          <NightsStayIcon className="text-primary-600  scale-125" />
        </button>
      ) : (
        <button onClick={() => setTheme("light")}>
          <LightModeOutlinedIcon className="text-primary-600 scale-125" />
        </button>
      )}
    </div>
  );
};

export default ThemeSwitcher;
