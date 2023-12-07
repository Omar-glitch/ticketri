"use client";

import ComponentIds from "@/constants/ComponentIds";
import { hideOnMobileRatio, hideOnPcRatio } from "@/styles/GlobalStyles";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TransitionStatus } from "react-transition-group/Transition";
import styled from "styled-components";

type ModalProps = {
  readonly $z: string;
};

export const ModalContainer = styled.article<ModalProps>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: ${(props) => props.$z || "var(--portal-z-index)"};
`;

type PortalOverlayProps = {
  readonly $z: string;
  readonly $hideOnPc?: boolean;
  readonly $hideOnMobile?: boolean;
};

export const PortalOverlay = styled.aside<PortalOverlayProps>`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.4s;
  z-index: ${(props) => props.$z || "var(--portal-z-index)"};

  & + * {
    z-index: ${(props) => props.$z || "var(--portal-z-index)"};
  }

  ${(props) => (props.$hideOnPc ? hideOnPcRatio : "")}
  ${(props) => (props.$hideOnMobile ? hideOnMobileRatio : "")}
`;

export const overlayTransition: Record<TransitionStatus, { opacity: number }> =
  {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
    unmounted: { opacity: 0 },
  };

export const Portal = ({ children }: { children: React.ReactNode }) => {
  const [parent, setParent] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setParent(document.getElementById(ComponentIds.Portal));
  }, []);

  return parent ? createPortal(children, parent) : null;
};
