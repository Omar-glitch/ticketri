import styled from "styled-components";
import { hideOnPcRatio } from "./GlobalStyles";
import Link from "next/link";

export const Header = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  max-width: var(--max-width);
  min-width: var(--min-width);
  width: 100%;
  height: var(--appbar-height);
  padding: 0.375rem 0.75rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 0.5rem 0.5rem;
  transition: top 0.3s, background-color var(--transition);
  z-index: var(--header-z-index);
`;

export const MobileMenuWrapper = styled.ul`
  position: fixed;
  top: var(--appbar-height);
  left: 0;
  padding: 0 1rem;
  background: var(--paper);
  transition: background-color var(--transition), left 0.4s;
  width: 100%;
  max-width: 20rem;
  height: calc(100% - var(--appbar-height));
  box-shadow: 0 calc(var(--appbar-height) * -1) var(--paper);
  border-radius: 0 1rem 1rem 0;

  ${hideOnPcRatio}
`;

export const MobileMenuLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  color: var(--text);
  border-radius: 0.75rem;
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.375rem 0.75rem;
  overflow: hidden;

  &:is(:hover, :focus) {
    background: rgba(var(--primary-channel), 0.06);
  }

  & > div {
    position: relative;
    display: flex;
    align-items: center;
    color: var(--text);
  }

  & svg {
    width: 1.375rem;
    margin-right: 0.5rem;
  }
`;
