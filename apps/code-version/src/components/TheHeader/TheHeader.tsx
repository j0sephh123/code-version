import { Link } from "wouter";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function TheHeader() {
  return (
    <div className="navbar bg-base-100">
      <Link to="/" className="btn btn-ghost normal-case text-xl">daisyUI</Link>
      <Link to="/code-versions" className="btn btn-ghost normal-case text-xl">Code Versions</Link>
    </div>
  );
}
