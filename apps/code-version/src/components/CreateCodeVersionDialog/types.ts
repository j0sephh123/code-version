export type SetVersions = {
  currentVersion: number;
  previousVersion: number | null;
};

export type ValueRef = {
  getValue: () => string;
  setValue: (value: string) => void;
};

export type Data = {
  code: string;
  explanation: string;
}[];
