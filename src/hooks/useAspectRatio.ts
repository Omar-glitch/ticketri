"use client";
import ASPECT_RATIOS from "@/constants/AspectRatios";
import {
  UseAspectRatioProps,
  UseAspectRatioResult,
} from "@/types/useAspectRatio.types";
import { useState, useEffect } from "react";

export default function useAspectRatio({
  ratio,
}: UseAspectRatioProps): UseAspectRatioResult {
  const [inRatio, setInRatio] = useState(false);

  useEffect(() => {
    const resizing = () => {
      setInRatio(window.innerWidth / window.innerHeight > ASPECT_RATIOS[ratio]);
    };

    window.addEventListener("resize", resizing);
    resizing();

    return () => window.removeEventListener("resize", resizing);
  }, [ratio]);

  return { inRatio };
}
