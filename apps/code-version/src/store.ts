import { proxy, useSnapshot } from 'valtio';

export type State = {
  showModal: (() => void) | undefined;
};

const state = proxy<State>({
  showModal: undefined,
});

export const bindShowModal = (showModal: State['showModal']) => {
  state.showModal = showModal;
};

export const openModal = () => {
  state.showModal?.();
};

export const useStore = () => useSnapshot(state);
