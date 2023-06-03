/* eslint-disable jsx-a11y/anchor-is-valid */
import CodeVersion from './components/CodeVersion/CodeVersion';

export default function App() {
  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="p-4">
        <CodeVersion />
      </div>
    </>
  );
}
