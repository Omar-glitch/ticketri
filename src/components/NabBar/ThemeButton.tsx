"use client";

import { useEffect, useState } from "react";
import SunSVG from "../svg/SunSVG";
import MoonSVG from "../svg/MoonSVG";
import { IconButton } from "@/styles/ButtonStyles";

const THEME = "theme";

export default function ThemeButton({ size }: { size: string }) {
  const [light, setLight] = useState(true);

  const changeTheme = () => {
    const root = document.querySelector(":root");
    setLight(!light);
    localStorage.setItem(THEME, light ? "dark" : "light");
    root?.classList.toggle("dark-theme");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME);
    if (savedTheme !== "light") {
      setLight(false);
      const root = document.querySelector(":root");
      root?.classList.add("dark-theme");
    }
  }, []);

  return (
    <IconButton
      title={light ? "Brillo" : "Noche"}
      $size={size}
      $p="0.375rem"
      $color="primary"
      onClick={changeTheme}
    >
      {light ? <SunSVG /> : <MoonSVG />}
    </IconButton>
  );
}
