import { NextFont } from "next/dist/compiled/@next/font";

export type GlobalProps = {
  readonly $font: NextFont;
};

export type PositionProps = {
  readonly $a?: boolean;
  readonly $l?: string;
  readonly $r?: string;
  readonly $b?: string;
  readonly $z?: number;
  readonly $t?: string;
  readonly $pos?: "relative" | "fixed" | "static";
};

export type MarginProps = {
  readonly $m?: string;
  readonly $mt?: string;
  readonly $ml?: string;
  readonly $mr?: string;
  readonly $mb?: string;
};

export type PaddingProps = {
  readonly $p?: string;
  readonly $pt?: string;
  readonly $pl?: string;
  readonly $pr?: string;
  readonly $pb?: string;
};

export type BubbleProps = PositionProps & {
  readonly $size?: string;
  readonly $bg?: string;
  readonly $o?: number;
};

export type FlexProps = {
  readonly $c?: string;
  readonly $ml?: string;
  readonly $mt?: string;
  readonly $fd?: string;
  readonly $jc?: string;
  readonly $ai?: string;
};

export type IconWrapperProps = MarginProps &
  PaddingProps & {
    readonly $size: string;
  };

export type TextEllipsisProps = {
  readonly $h: string;
  readonly $lc: 1 | 2 | 3 | 4;
};
