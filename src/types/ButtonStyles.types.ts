import { ColorProps } from "./ColorVariants.types";
import type { MarginProps } from "./GlobalStyles.types";

export type IconButtonProps = MarginProps & {
  readonly $size: string;
  readonly $color: ColorProps;
  readonly $p?: string;
  readonly $z?: number;
};

export type OutlinedHoverStylesProps = {
  readonly disabled?: boolean;
  readonly $color: ColorProps;
};

export type BgHoverStylesProps = OutlinedHoverStylesProps & {
  readonly $bg?: string;
};

export type ButtonProps = MarginProps &
  BgHoverStylesProps & {
    readonly $p?: string;
    readonly $br?: string;
    readonly $w?: string;
    readonly $outlined?: boolean;
  };

export type ToggleMenuButtonProps = IconButtonProps & {
  readonly $open: boolean;
};
