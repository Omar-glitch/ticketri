export type ActivePlaceholderProps = {
  readonly $error: boolean;
};

export type PlaceholderProps = {
  readonly $active: boolean;
  readonly $error: boolean;
};

export type LabelProps = {
  readonly $isDate?: boolean;
};

export type InputLabelProps = {
  readonly $active?: boolean;
  readonly $isDate?: boolean;
  readonly $error: boolean;
};
