import { proxy, useSnapshot } from 'valtio';
import { DialogTypes } from './types';

export type State = {
  dialogShow: (() => void) | undefined;
  dialogClose: (() => void) | undefined;
  type: DialogTypes | null;
};

const state = proxy<State>({
  dialogShow: undefined,
  dialogClose: undefined,
  type: null,
});

export const bindDialogControls = (
  dialogShow: State['dialogShow'],
  dialogClose: State['dialogClose']
) => {
  state.dialogShow = dialogShow;
  state.dialogClose = dialogClose;
};

export const dialogOpen = (type: DialogTypes) => {
  state.type = type;
  state.dialogShow?.();
};

export const dialogClose = () => {
  state.type = null;
  state.dialogClose?.();
};

export const useStore = () => useSnapshot(state);
