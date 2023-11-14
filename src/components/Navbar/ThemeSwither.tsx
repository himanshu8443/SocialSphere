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
    <div>
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
