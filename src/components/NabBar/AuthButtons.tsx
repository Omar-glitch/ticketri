"use client";

import { Button } from "@/styles/ButtonStyles";
import {
  Flex,
  IconWrapper,
  hideOnMobileRatio,
  hideOnPcRatio,
} from "@/styles/GlobalStyles";
import { signOut, useSession } from "next-auth/react";
import LogOutSVG from "../svg/LogOutSVG";
import UserSVG from "../svg/UserSVG";
import Link from "next/link";

type AuthButtonsProps = {
  readonly view: "pc" | "mobile";
};

export default function AuthButtons({ view }: AuthButtonsProps) {
  const { status, data } = useSession();

  if (status !== "authenticated")
    return (
      <Button
        as={Link}
        href="/api/auth/signin"
        $color="primary"
        $p="0.5rem 1rem"
        css={`
          ${view === "mobile" ? hideOnPcRatio : hideOnMobileRatio}
        `}
      >
        Iniciar sesión
        <IconWrapper $size="1rem" $ml="0.25rem">
          <UserSVG />
        </IconWrapper>
      </Button>
    );

  return (
    <Flex
      $ml="0.25rem"
      style={{ flexDirection: view === "mobile" ? "column" : "row" }}
      css={`
        ${view === "mobile" ? hideOnPcRatio : hideOnMobileRatio}
      `}
    >
      <Button as={Link} href="/account" $color="primary" $p="0.5rem 1rem">
        {data.user.name}
        <IconWrapper $size="1rem" $ml="0.25rem">
          <UserSVG />
        </IconWrapper>
      </Button>
      <Button $color="error" $p="0.5rem 1rem" onClick={() => signOut()}>
        Cerrar sesión
        <IconWrapper $size="1rem" $ml="0.25rem">
          <LogOutSVG />
        </IconWrapper>
      </Button>
    </Flex>
  );
}
