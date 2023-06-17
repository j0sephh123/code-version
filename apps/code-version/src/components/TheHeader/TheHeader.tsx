import { Link } from 'wouter';
import { dialogOpen } from '../../store';
import { DialogTypes } from '../../types';
import { PlusIconRounded } from '../../icons';

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
        <button
          onClick={() => dialogOpen(DialogTypes.createSnippet, null)}
          className="btn btn-ghost btn-circle"
        >
          <PlusIconRounded />
        </button>
      </div>
    </div>
  );
}
