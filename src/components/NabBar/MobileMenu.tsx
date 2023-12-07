import { TransitionStatus } from "react-transition-group";
import ComponentIds from "@/constants/ComponentIds";
import MobileMenuItems from "@/constants/MobileMenuItems";
import { MobileMenuLink, MobileMenuWrapper } from "@/styles/NavBarStyles";
import { Button } from "@/styles/ButtonStyles";
import Link from "next/link";
import { MutableRefObject } from "react";
import SignOutButton from "./SignOutButton";
import AuthMobileButtons from "./AuthMobileButtons";

const transitionStyles: Record<TransitionStatus, { left: string | number }> = {
  entering: { left: 0 },
  entered: { left: 0 },
  exiting: { left: "-23.75rem" },
  exited: { left: "-23.75rem" },
  unmounted: { left: 0 },
};

type MobileMenuProps = {
  state: TransitionStatus;
  nodeRef: MutableRefObject<null>;
  closeModal: () => void;
};

export default function MobileMenu({
  state,
  nodeRef,
  closeModal,
}: MobileMenuProps) {
  return (
    <MobileMenuWrapper
      id={ComponentIds.MobileMenu}
      ref={nodeRef}
      style={{ ...transitionStyles[state] }}
    >
      {MobileMenuItems.map((item) => (
        <li key={item.name}>
          <MobileMenuLink href={item.url} onClick={closeModal}>
            <div>
              {item.icon}
              <p>{item.name}</p>
            </div>
          </MobileMenuLink>
        </li>
      ))}
      <AuthMobileButtons closeModal={closeModal} />
    </MobileMenuWrapper>
  );
}
