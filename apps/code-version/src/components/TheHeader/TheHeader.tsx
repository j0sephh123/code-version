import { Link } from 'wouter';
import { modalOpen } from '../../store';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function TheHeader() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          daisyUI
        </Link>
        <Link to="/code-versions" className="btn btn-ghost normal-case text-xl">
          Code Versions
        </Link>
      </div>

      <div className="navbar-end">
        <button onClick={modalOpen} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
