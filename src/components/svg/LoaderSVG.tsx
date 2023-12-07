"use client";

import { ColorProps } from "@/types/ColorVariants.types";
import styled, { keyframes } from "styled-components";

const ringFrames = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

type RingProps = {
  readonly $size: number;
  readonly $c: string;
  readonly $w: number;
};

const Ring = styled.div<RingProps>`
  display: inline-block;
  position: relative;
  width: ${(props) => props.$size}rem;
  height: ${(props) => props.$size}rem;

  & > div {
    color: ${(props) => props.$c};
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border: ${(props) => props.$w}rem solid currentColor;
    border-radius: 50%;
    animation: ${ringFrames} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: currentColor transparent transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

type LoaderSVGProps = {
  sizeInRem: number;
  color?: string;
};

export default function LoaderSVG({
  sizeInRem = 5,
  color = "var(--primary)",
}: LoaderSVGProps) {
  return (
    <Ring $size={sizeInRem} $w={sizeInRem / 10} $c={color}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Ring>
  );
}
