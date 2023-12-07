"use client";

import { useRouter } from "next/navigation";
import ReloadSVG from "../svg/ReloadSVG";
import { IconButton } from "@/styles/ButtonStyles";
import { ColorProps } from "@/types/ColorVariants.types";

type RefreshButtonProps = {
  readonly size?: string;
  readonly color: ColorProps;
};

export default function RefreshButton({
  size = "2.25rem",
  color,
}: RefreshButtonProps) {
  const router = useRouter();

  return (
    <IconButton
      onClick={router.refresh}
      title="Recargar"
      $p="0.25rem"
      $size={size}
      $color={color}
    >
      <ReloadSVG />
    </IconButton>
  );
}
