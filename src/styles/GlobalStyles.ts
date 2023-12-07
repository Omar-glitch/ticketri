"use client";

import ASPECT_RATIOS from "@/constants/AspectRatios";
import type {
  BubbleProps,
  FlexProps,
  GlobalProps,
  IconWrapperProps,
  MarginProps,
  PaddingProps,
  PositionProps,
  TextEllipsisProps,
} from "@/types/GlobalStyles.types";
import styled, { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle<GlobalProps>`
  *, ::after, ::before {
    font-family: ${(props) => props.$font.style.fontFamily};
  }

  html {
    position: relative;
    background: var(--paper);
    scroll-behavior: smooth;
    font-size: 1rem;
    -webkit-tap-highlight-color: transparent;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    height: 100%;
    scrollbar-width: auto;
    scrollbar-color: var(--primary) transparent;
  }

  body {
    transition: var(--transition) background-color;
    background-color: var(--paper);
    height: 100vh;
    width: 100%;
    min-height: 28.125rem;
    min-width: var(--min-width);
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
  }

  ::selection {
    background-color: var(--primary);
    -webkit-text-fill-color: var(--paper);
    color: var(--paper);
  }

  li {
    list-style: none;
  }

  h1 {
    font-size: 2rem;
    margin: 0.67rem 0;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  a {
    background-color: transparent; 
    text-decoration: none;
  }

  b, strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  small {font-size: 80%;}

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {border-style: none;}

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
    appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 0.0625rem dotted ;
  }

  fieldset {
    padding: 0.35rem 0.75rem 0.625rem;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: textfield;
    appearance: textfield;
    outline-offset: -0.125rem;
  }

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }

  body::-webkit-scrollbar {
    background: inherit;
  }

  p {color: inherit;}

  body::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 0.5rem;
  }

  div, textarea {
    scrollbar-width: thin;
    scrollbar-color: var(--primary) transparent;
  }

  div::-webkit-scrollbar {width: 0.25rem;}
  div::-webkit-scrollbar-thumb {background: var(--primary); border-radius: 0.3125rem;}
  div::-webkit-scrollbar-corner {background: var(--primary);}

  textarea::-webkit-scrollbar {width: 0.25rem;}
  textarea::-webkit-scrollbar-thumb {background: var(--primary); border-radius: 0.3125rem;}
  textarea::-webkit-scrollbar-corner {background: var(--primary);}

  a, button {
    outline: none;
    text-decoration: none;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
  }

  @media (min-height: 1000px) and (min-width: 760px) {html {font-size: 1.5rem;}}
  @media (min-height: 1360px) and (min-width: 1020px) {html {font-size: 2.0625rem;}}
  @media (min-height: 900px) and (min-width: 2500px) {html {font-size: 2.3125rem;}} 
`;

export const hideOnPcRatio = css`
  @media (min-aspect-ratio: ${ASPECT_RATIOS.pc}) {
    display: none;
  }
`;

export const hideOnMobileRatio = css`
  display: none;

  @media (min-aspect-ratio: ${ASPECT_RATIOS.pc}) {
    display: flex;
  }
`;

export const marginStyles = css<MarginProps>`
  ${(props) => (props.$m ? `margin: ${props.$m};` : "")}
  ${(props) => (props.$mt ? `margin-top: ${props.$mt};` : "")}
  ${(props) => (props.$ml ? `margin-left: ${props.$ml};` : "")}
  ${(props) => (props.$mr ? `margin-right: ${props.$mr};` : "")}
  ${(props) => (props.$mb ? `margin-bottom: ${props.$mb};` : "")}
`;

export const paddingStyles = css<PaddingProps>`
  ${(props) => (props.$p ? `padding: ${props.$p};` : "")}
  ${(props) => (props.$pt ? `padding-top: ${props.$pt};` : "")}
  ${(props) => (props.$pl ? `padding-left: ${props.$pl};` : "")}
  ${(props) => (props.$pr ? `padding-right: ${props.$pr};` : "")}
  ${(props) => (props.$pb ? `padding-bottom: ${props.$pb};` : "")}
`;

export const getPositionStyles = css<PositionProps>`
  position: ${(props) =>
    props.$a ? "absolute" : props.$pos ? props.$pos : "relative"};
  ${(props) => (props.$t ? `top: ${props.$t};` : "")}
  ${(props) => (props.$l ? `left: ${props.$l};` : "")}
  ${(props) => (props.$r ? `right: ${props.$r};` : "")}
  ${(props) => (props.$b ? `bottom: ${props.$b};` : "")}
  ${(props) => (props.$z ? `z-index: ${props.$z};` : "")}
`;

export const Bubble = styled.div<BubbleProps>`
  ${getPositionStyles}
  width: ${(props) => props.$size || "4.6875rem"};
  height: ${(props) => props.$size || "4.6875rem"};
  background: ${(props) => props.$bg || "var(--primary)"};
  opacity: ${(props) => props.$o || ".1"};
  border-radius: 50%;
`;

export const Flex = styled.div<FlexProps>`
  display: flex;
  color: ${(props) => props.$c || "inherit"};
  flex-direction: ${(props) => props.$fd || "row"};
  justify-content: ${(props) => props.$jc || "center"};
  align-items: ${(props) => props.$ai || "center"};

  & > * ~ * {
    margin-left: ${(props) => props.$ml || 0};
    margin-top: ${(props) => props.$mt || 0};
  }
`;

export const IconWrapper = styled.div<IconWrapperProps>`
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  min-width: ${(props) => props.$size};
  min-height: ${(props) => props.$size};
  max-width: ${(props) => props.$size};
  max-height: ${(props) => props.$size};
  display: flex;
  justify-content: center;
  align-items: center;
  ${marginStyles}
  ${paddingStyles}
`;

export const Main = styled.main`
  padding-top: var(--appbar-height);
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const TextEllipsis = styled.p<TextEllipsisProps>`
  max-height: ${(props) => props.$h || "3.5rem"};
  -webkit-line-clamp: ${(props) => props.$lc};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

// export const itemWrap = css<ItemWrapProps>`
//   width: 100%;
//   word-break: break-word;

//   @media (min-aspect-ratio: ${props => props.$double ? '5 / 7' : '7 / 6'}) {
//     width: ${props => props.$fullWidth ? '100%' : 'calc(50% - .5rem)'};
//   }
// `

export default GlobalStyles;
