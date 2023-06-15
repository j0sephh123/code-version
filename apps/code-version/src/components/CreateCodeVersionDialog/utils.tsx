import { Versions, Version } from './types';

/**
 *
 * @param versionsData - array
 * @param indexToUpdate - current or previous versions index
 * @param newTextAreaValues - new values to set
 * @returns
 */
export const updateVersionInArray = (
  versionsData: Versions,
  indexToUpdate: number,
  newTextAreaValues: Version
) => {
  if (versionsData[indexToUpdate] !== undefined) {
    return versionsData.map((item, index) => {
      if (index === indexToUpdate) {
        return newTextAreaValues;
      }
      return item;
    });
  }

  return [
    ...versionsData.slice(0, indexToUpdate),
    newTextAreaValues,
    ...versionsData.slice(indexToUpdate + 1),
  ];
};
