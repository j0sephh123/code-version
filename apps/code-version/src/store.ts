import { proxy, useSnapshot } from 'valtio';

const state = proxy<{ modalRef: HTMLDialogElement | null }>({ modalRef: null });

export const updateRef = (modalRef: HTMLDialogElement | null) => {
  state.modalRef = modalRef;
};

export const openModal = () => {
  console.log(state.modalRef);
  if (state.modalRef) {
    state.modalRef?.showModal();
  }
};

export const useStore = () => useSnapshot(state);
