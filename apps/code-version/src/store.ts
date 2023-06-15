import { proxy, useSnapshot } from 'valtio';
import { DialogTypes } from './types';

export type State = {
  dialogShow: (() => void) | undefined;
  dialogClose: (() => void) | undefined;
  type: DialogTypes | null;
  versionId: string | null;
};

const state = proxy<State>({
  dialogShow: undefined,
  dialogClose: undefined,
  type: null,
  versionId: null,
});

export const bindDialogControls = (
  dialogShow: State['dialogShow'],
  dialogClose: State['dialogClose']
) => {
  state.dialogShow = dialogShow;
  state.dialogClose = dialogClose;
};

export const dialogOpen = (type: DialogTypes, versionId: string) => {
  state.type = type;
  if (versionId) {
    state.versionId = versionId;
  }
  state.dialogShow?.();
};

export const dialogClose = () => {
  if (state.versionId) {
    // TODO set to default state instead
    state.versionId = null;
  }
  // TODO set to default state instead
  state.type = null;
  state.dialogClose?.();
};

export const useStore = () => useSnapshot(state);
