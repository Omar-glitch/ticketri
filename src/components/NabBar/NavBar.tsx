"use client";

import { Header } from "@/styles/NavBarStyles";
import { Button } from "@/styles/ButtonStyles";
import UserSVG from "../svg/UserSVG";
import ThemeButton from "./ThemeButton";
import Logo from "./Logo";
import MenuButton from "./MenuButton";
import { Flex, IconWrapper, hideOnMobileRatio } from "@/styles/GlobalStyles";
import Link from "next/link";
import MobileMenuItems from "@/constants/MobileMenuItems";
import { TextLineHover } from "@/styles/TextStyles";
import SignOutButton from "./SignOutButton";
import LogOutSVG from "../svg/LogOutSVG";
import AuthButtons from "./AuthButtons";

export default function NavBar() {
  const BUTTON_SIZE = "2.4rem";

  return (
    <Header>
      <Flex $ml="0.75rem">
        <Logo size="2.2rem" zIndex={3} />
        <Flex
          $ml="0.75rem"
          css={`
            ${hideOnMobileRatio}
          `}
        >
          {MobileMenuItems.map((item) => (
            <TextLineHover
              $c="var(--text)"
              $hoverC="var(--primary)"
              $fontS="1.02rem"
              href={item.url}
              key={item.url}
            >
              {item.name}
            </TextLineHover>
          ))}
        </Flex>
      </Flex>

      <Flex $ml="0.375rem">
        <ThemeButton size={BUTTON_SIZE} />
        {/* <Button
          $p="0.5rem 1rem"
          title="Iniciar sesión"
          $color="primary"
          as={Link}
          href="/tickets"
          css={`
            ${hideOnMobileRatio}
          `}
        >
          Iniciar sesión
          <IconWrapper $size="1rem" $ml="0.25rem">
            <UserSVG />
          </IconWrapper>
        </Button> */}
        {/* <SignOutButton iconMode={{ icon: <LogOutSVG />, size: BUTTON_SIZE }} /> */}
        <AuthButtons view="pc" />
        <MenuButton size={BUTTON_SIZE} />
      </Flex>
    </Header>
  );
}
