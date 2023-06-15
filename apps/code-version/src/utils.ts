import { DialogTypes } from './types';

// TODO add types for API fields
export const transformDialogTypeFieldForApi = (type: DialogTypes) => {
  if (type === DialogTypes.createSnippet) {
    return 'name';
  }

  if (type === DialogTypes.insertCode) {
    return 'code';
  }

  if (type === DialogTypes.insertExplanation) {
    return 'explanation';
  }

  throw new Error(`Invalid DialogTypes: ${type}`);
};
