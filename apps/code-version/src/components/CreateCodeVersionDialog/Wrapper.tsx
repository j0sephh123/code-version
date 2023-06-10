import { PropsWithChildren } from "react";
import { bindModalControls } from "../../store";


export default function Wrapper({children}:PropsWithChildren) {
  return (
    <dialog
      ref={(ref) =>
        bindModalControls(ref?.showModal.bind(ref), ref?.close.bind(ref))
      }
      className="modal"
    >
      {children}
    </dialog>
  );
}
