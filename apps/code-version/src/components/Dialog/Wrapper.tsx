import { PropsWithChildren, useCallback } from 'react';
import { bindDialogControls, dialogClose } from '../../store';

export default function Wrapper({
  children,
  type,
}: { type: string } & PropsWithChildren) {
  const refCallback = useCallback(
    (ref: HTMLDialogElement | null) => {
      bindDialogControls(ref?.showModal.bind(ref), ref?.close.bind(ref));
    },
    []
  );

  return (
    <dialog
      onClose={(e) => {
        e.preventDefault();
        dialogClose();
      }}
      ref={refCallback}
      className="modal"
    >
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">{type}</h3>
        {children}
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
