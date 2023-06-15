import { PropsWithChildren } from 'react';
import { bindDialogControls, dialogClose, useStore } from '../../store';
import { dialogLabels } from '../../constants';

export default function Wrapper({ children }: PropsWithChildren) {
  return (
    <dialog
      onClose={(e) => {
        e.preventDefault();
        dialogClose();
      }}
      ref={(ref) =>
        bindDialogControls(ref?.showModal.bind(ref), ref?.close.bind(ref))
      }
      className="modal"
    >
      <DialogContent>{children}</DialogContent>
    </dialog>
  );
}

function DialogContent({ children }: PropsWithChildren) {
  const { type } = useStore();

  if (type === null) return null;

  return (
    <>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">{dialogLabels[type]}</h3>
        {children}
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  );
}
