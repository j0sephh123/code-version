import { PropsWithChildren } from 'react';
import { bindModalControls } from '../../store';

export default function Wrapper({ children }: PropsWithChildren) {
  return (
    <dialog
      ref={(ref) =>
        bindModalControls(ref?.showModal.bind(ref), ref?.close.bind(ref))
      }
      className="modal"
    >
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Create a code version</h3>
        {children}
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
