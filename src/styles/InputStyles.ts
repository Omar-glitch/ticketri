"use client";

import {
  ActivePlaceholderProps,
  InputLabelProps,
  LabelProps,
  PlaceholderProps,
} from "@/types/InputStyles.types";
import styled, { css } from "styled-components";
// import { itemWrap } from "./AppbarStyles";

export const ErrorMessage = styled.p`
  position: absolute;
  top: 100%;
  left: 0.25rem;
  font-size: 0.75rem;
`;

const activePlaceholder = css<ActivePlaceholderProps>`
  transform: translateY(-1rem);
  left: 0.5rem;
  opacity: 1;
  font-size: 0.75rem;
  background-color: ${(props) =>
    props.$error ? "var(--error)" : "var(--primary)"};
  color: var(--paper);
  padding: 0 0.5rem;
`;

export const Placeholder = styled.p<PlaceholderProps>`
  position: absolute;
  top: 0.5rem;
  border-radius: 0.5rem;
  transition: transform 0.2s, padding 0.2s;

  ${(props) => (props.$active ? activePlaceholder : "")}
`;

const Label = styled.label<LabelProps>`
  position: relative;
  background: rgba(var(--primary-channel), 0.04);
  display: flex;
  margin-top: 0.625rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0.75rem;
  ${(props) => (props.$isDate ? `` : "padding-right: 2.25rem;")}
  color: var(--primary);
  border-radius: 1rem;
  cursor: text;
  align-items: center;

  & ::-webkit-calendar-picker-indicator {
    color-scheme: var(--color-scheme);
    opacity: 0;
  }

  & input[type="date"] {
    -webkit-appearance: none;
  }

  & input:-webkit-autofill {
    -webkit-text-fill-color: var(--primary) !important;
  }
`;
// ${itemWrap}

export const InputLabel = styled(Label)<InputLabelProps>`
  border: 0.0625rem solid var(--primary);
  min-height: 2.25rem;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;

  ${(props) =>
    props.$error
      ? `
    background: rgba(var(--error-channel), 0.04);
    border: 0.0625rem solid var(--error);
    color: var(--error);
  `
      : ""}

  & textarea {
    height: 5rem;
    resize: none;
    margin-right: 0.25rem;
  }

  &:is(:hover, :focus) {
    background: transparent;
  }

  &:focus-within ${Placeholder} {
    ${activePlaceholder}
  }

  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & input[type="number"] {
    -moz-appearance: textfield;
  }

  & input[type="date"],
  & input[type="password"] {
    color-scheme: var(--color-scheme);
  }
`;

export const InputStyle = styled.input`
  position: relative;
  border: none;
  outline: none;
  color: currentColor;
  width: 100%;
  height: 1.1494rem;
  background: transparent;
`;

export const IconLabel = styled.div`
  align-self: flex-start;
  position: absolute;
  top: 0.5rem;
  right: 0.875rem;
  margin-left: 0.5rem;
  width: 1.125rem;
  height: 1.125rem;
`;

export const CheckboxLabel = styled(Label)`
  cursor: pointer;
  margin: 0 0 0.5rem;

  & > span {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.3125rem;
    border-radius: 0.375rem;
    border: 0.0625rem solid var(--primary);
  }

  & > input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & input:checked ~ span {
    background: var(--primary);
    color: var(--paper);
  }
`;

export const MultiInput = styled(Label)<InputLabelProps>`
  width: 100%;
  flex-direction: column;
  padding: 0.5rem 1rem;
  cursor: default;

  ${(props) =>
    props.$error
      ? `
    background: rgba(var(--error-channel), 0.04);
    color: var(--error);
  `
      : ""}
`;

export const FormStyles = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 31.25rem;
  width: 96%;
  margin: auto;

  & > * ~ * {
    margin-top: 1rem;
  }
`;

export const SelectContainer = styled.div`
  background: var(--paper);
  color: var(--text);
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  border-radius: 1rem;
  min-width: 16.25rem;
  max-width: 20rem;
  width: 96%;
  border: 0.0625rem solid var(--shadow);
  transition: opacity 0.2s;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 6.25rem;
  max-height: 6.25rem;
  font-size: 0.9375rem;
  overflow: hidden scroll;
  margin-bottom: 0.75rem;
`;

export const OptionItem = styled.div`
  position: relative;
  padding: 0.375rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: rgba(var(--text-channel), 0.08);
  }

  & > div {
    position: absolute;
    display: flex;
    right: 0.375rem;
  }
`;

export const OptionVisible = styled.article`
  border-radius: 0.5rem;
  display: flex;
  padding: 0 4px;
  align-items: center;

  & > div {
    width: 1rem;
    height: 1rem;
    background: var(--primary);
    color: var(--paper);
    border-radius: 50%;
    margin-left: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  & > div:hover {
    background: var(--error);
  }
`;

export const FormModal = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 20rem;
  overflow-y: auto;
`;
