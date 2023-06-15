export {};
// import { proxy, useSnapshot } from 'valtio';

// export type State = {
//   modalShow: (() => void) | undefined;
//   modalClose: (() => void) | undefined;
// };

// const state = proxy<State>({
//   modalShow: undefined,
//   modalClose: undefined,
// });

// export const bindModalControls = (
//   modalShow: State['modalShow'],
//   modalClose: State['modalClose']
// ) => {
//   state.modalShow = modalShow;
//   state.modalClose = modalClose;
// };

// export const modalOpen = () => {
//   state.modalShow?.();
// };

// export const modalClose = () => {
//   state.modalClose?.();
// };

// export const useStore = () => useSnapshot(state);
