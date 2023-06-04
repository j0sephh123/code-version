import { useState } from 'react';
import { bindShowModal } from '../../store';
import clsx from 'clsx';

const maxVersions = 5;

export default function CreateCodeVersionDialog() {
  const [version, setVersion] = useState(1);

  return (
    <dialog
      ref={(ref) => bindShowModal(ref?.showModal.bind(ref))}
      className="modal"
    >
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Create a code version</h3>
        <div className="py-2"></div>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
        />

        <div className="flex items-center pt-6 gap-4">
          <input
            onClick={() => setVersion((prevVersion) => prevVersion - 1)}
            type="button"
            value="Previous"
            className={clsx(
              'btn',
              version !== 1 && 'btn-primary',
              version === 1 && 'btn-disabled'
            )}
          />
          <p>
            Version: <span className="font-extrabold text-xl">{version}</span>
          </p>
          <input
            onClick={() => setVersion((prevVersion) => prevVersion + 1)}
            type="button"
            value="Next"
            className={clsx(
              'btn',
              version !== maxVersions && 'btn-primary',
              version === maxVersions && 'btn-disabled'
            )}
          />
        </div>

        <textarea
          className="textarea textarea-bordered w-full mt-4"
          placeholder="Code"
        ></textarea>
        <textarea
          className="textarea textarea-bordered w-full mt-2"
          placeholder="Explanation"
        ></textarea>

        <button className="btn btn-outline btn-info btn-block mt-2">
          Create
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
