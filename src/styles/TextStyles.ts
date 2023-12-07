"use client";

import { TextLineHoverProps } from "@/types/TextStyles.types";
import Link from "next/link";
import styled from "styled-components";

export const TextLineHover = styled(Link)<TextLineHoverProps>`
  position: relative;
  color: ${(props) => props.$c};
  font-size: ${(props) => props.$fontS || "1rem"};

  &::after {
    content: "";
    height: 0.125rem;
    width: 0;
    position: absolute;
    bottom: -0.125rem;
    left: 0;
    background: ${(props) => props.$hoverC || props.$c};
    transition: width 0.3s;
  }

  &:is(:hover, :focus) {
    &::after {
      width: 80%;
    }

    color: ${(props) => props.$hoverC || props.$c};
  }
`;
