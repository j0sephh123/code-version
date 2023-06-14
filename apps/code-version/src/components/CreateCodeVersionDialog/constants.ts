import { Versions } from './types';

export const maxVersions = 4;
export const defaultVersion = 0;
export const initialData: Versions = [];

export const initialRefValues = {
  getValue: () => '',
  setValue: () => undefined,
};

export const initialVersions = {
  currentVersion: defaultVersion,
  previousVersion: null,
};
