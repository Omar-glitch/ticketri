"use client";

import {
  BgHoverStylesProps,
  ButtonProps,
  IconButtonProps,
  OutlinedHoverStylesProps,
  ToggleMenuButtonProps,
} from "@/types/ButtonStyles.types";
import styled, { css } from "styled-components";
import { hideOnPcRatio, marginStyles } from "./GlobalStyles";

export const IconButton = styled.button<IconButtonProps>`
  position: relative;
  border-radius: 16%;
  width: ${(props) => props.$size || "2.5rem"};
  height: ${(props) => props.$size || "2.5rem"};
  min-width: ${(props) => props.$size || "2.5rem"};
  min-height: ${(props) => props.$size || "2.5rem"};
  border: 0.0625rem solid var(--${(props) => props.$color});
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--${(props) => props.$color});
  background: var(--paper);
  cursor: pointer;
  ${(props) => (props.$p ? `padding: ${props.$p};` : "")}
  ${(props) => (props.$z ? `z-index: ${props.$z};` : "")}
  ${marginStyles}

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(var(--${(props) => props.$color}-channel), 0.06);
    transition: background-color 0.3s;
  }

  &:is(:hover, :focus) {
    &::before {
      background: transparent;
    }
  }
`;

export const ToggleMenuButton = styled(IconButton)<ToggleMenuButtonProps>`
  flex-direction: column;
  justify-content: space-between;
  padding: 0.375rem;

  & hr {
    height: 0.25rem;
    width: 100%;
    border: none;
    background: var(--primary);
    border-radius: 0.1875rem;
    transition: opacity 0.4s, transform 0.4s;
  }

  & hr:nth-child(1) {
    transform: ${(props) =>
      props.$open && "rotate(45deg) translate(0.47rem, 0.47rem)"};
  }
  & hr:nth-child(2) {
    opacity: ${(props) => (props.$open ? 0 : 1)};
  }
  & hr:nth-child(3) {
    transform: ${(props) =>
      props.$open && "rotate(-45deg) translate(0.47rem, -0.47rem)"};
  }

  ${hideOnPcRatio}
`;

const outlinedStyles = css<OutlinedHoverStylesProps>`
  color: var(--${(props) => props.$color});
  background: transparent;

  &:is(:hover, :focus) {
    background: rgba(var(--${(props) => props.$color}-channel), 0.05);
  }
`;

const bgStyles = css<BgHoverStylesProps>`
  color: var(--paper);
  background: var(--${(props) => props.$color});

  &:is(:hover, :focus) {
    background: var(--${(props) => props.$color}-dark);
    border-color: var(--${(props) => props.$color}-dark);
  }
`;

export const Button = styled.button<ButtonProps>`
  position: relative;
  display: flex;
  outline: none;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding: ${(props) => props.$p || "0.5rem"};
  border-radius: ${(props) => props.$br || "1.1rem"};
  width: ${(props) => props.$w || "100%"};
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  cursor: pointer;
  border: 0.0625rem solid ${(props) => `var(--${props.$color})`};

  ${marginStyles}
  ${(props) => (props.$outlined ? outlinedStyles : bgStyles)}
`;
