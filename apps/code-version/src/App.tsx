import { useRef } from 'react';
import { Route } from 'wouter';
import TheHeader from './components/TheHeader/TheHeader';
import SingleCodeVersionPage from './components/pages/SingleCodeVersionPage';
import CodeVersionsPage from './components/pages/CodeVersionsPage';

export default function App() {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const open = () => {
    // window.my_modal_2.showModal()
    modalRef.current?.showModal();
  };

  return (
    <>
      <TheHeader />
      <div className="p-4">
        <Route path="/code-versions/:id">
          {({ id }) => <SingleCodeVersionPage id={id} />}
        </Route>
        <Route path="/code-versions" component={CodeVersionsPage} />
        <Route path="/" component={() => <div>Welcome to hoem page</div>} />
      </div>

      <button className="btn" onClick={open}>
        open modal
      </button>
      <dialog ref={modalRef} id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
