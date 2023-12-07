"use client";

import { useEffect, useState, useRef } from "react";
import { PortalOverlay, overlayTransition } from "../Modals/Portal";
import MobileMenu from "./MobileMenu";
import { Transition } from "react-transition-group";
import ComponentIds from "@/constants/ComponentIds";
import { showScrollbar, hideScrollbar } from "@/utils/scrollbar";
import useAspectRatio from "@/hooks/useAspectRatio";
import { ToggleMenuButton } from "@/styles/ButtonStyles";

type MenuButtonProps = {
  readonly size: string;
};

export default function MenuButton({ size }: MenuButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nodeRef = useRef(null);
  const { inRatio: inPcRatio } = useAspectRatio({ ratio: "pc" });

  useEffect(() => {
    if (isModalOpen && inPcRatio) {
      setIsModalOpen(false);
      showScrollbar();
    }
  }, [inPcRatio, isModalOpen]);

  return (
    <>
      <ToggleMenuButton
        id={ComponentIds.MenuButton}
        title="Abrir menú"
        $color="primary"
        $open={isModalOpen}
        $z={2}
        $size={size}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <hr />
        <hr />
        <hr />
      </ToggleMenuButton>
      <Transition
        in={isModalOpen}
        nodeRef={nodeRef}
        timeout={400}
        unmountOnExit={true}
        onEnter={hideScrollbar}
        onExit={showScrollbar}
      >
        {(state) => (
          <>
            <PortalOverlay
              style={{ ...overlayTransition[state] }}
              $z="0"
              ref={nodeRef}
              onClick={() => setIsModalOpen(false)}
              $hideOnPc
            />
            <MobileMenu
              nodeRef={nodeRef}
              state={state}
              closeModal={() => setIsModalOpen(false)}
            />
          </>
        )}
      </Transition>
    </>
  );
}
