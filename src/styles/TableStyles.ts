"use client";

import styled from "styled-components";

export const Table = styled.table`
  max-width: 100%;
  display: block;
  border: none;
  overflow-x: auto;
  border-spacing: 0;
  color: var(--text);
  border-collapse: separate;

  & tr th {
    padding: 0.5rem 0.25rem;
    background: rgba(var(--text-channel), 0.08);
  }

  & tr:nth-child(even) {
    background: rgba(var(--primary-channel), 0.06);
  }

  & td,
  & th {
    transition: border-color var(--transition);
    border: solid 0.0625rem var(--paper);
    border-style: solid none;
  }

  & td:first-child,
  & tr th:first-child {
    border-left-style: solid;
    border-top-left-radius: 0.625rem;
    border-bottom-left-radius: 0.625rem;
  }

  & td:last-child,
  & tr th:last-child {
    border-right-style: solid;
    border-bottom-right-radius: 0.625rem;
    border-top-right-radius: 0.625rem;
  }
`;

type TdProps = {
  readonly $w?: string;
  readonly $minw?: string;
  readonly $maxw?: string;
  readonly $tta?: string;
  readonly $p?: string;
};

export const Td = styled.td<TdProps>`
  ${(props) => (props.$w ? `width: ${props.$w}` : "100%")};
  min-width: ${(props) => props.$minw || "5rem"};
  text-align: ${(props) => props.$tta || "center"};
  padding: ${(props) => props.$p || "0.25rem"};
  max-width: ${(props) => props.$maxw || "unset"};
`;
