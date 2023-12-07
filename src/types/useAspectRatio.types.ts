export type TAspectRatio = {
  any: number;
  mobile: number;
  tablet: number;
  square: number;
  pc: number;
  tv: number;
};

export type UseAspectRatioProps = {
  ratio: keyof TAspectRatio;
};

export type UseAspectRatioResult = {
  inRatio: boolean;
};
