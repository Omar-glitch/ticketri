"use client";

import Link from "next/link";
import styled from "styled-components";
import { IconWrapper } from "./GlobalStyles";

export const ModuleWrapper = styled(Link)`
  position: relative;
  overflow: hidden;
  min-width: 11.25rem;
  min-height: 6.875rem;
  border: 0.0625rem solid var(--primary);
  border-radius: 1rem;
  padding: 1rem;
  color: var(--primary);

  & > ${IconWrapper} {
    color: var(--primary);
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(var(--primary-channel), 0.03);
    transition: background-color 0.3s;
  }

  &:is(:hover, :focus) {
    &::before {
      background: transparent;
    }
  }
`;
