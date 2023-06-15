import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { SnippetWithVersions } from '../types';

// TODO add https://daisyui.com/components/badge/
export default function CodeVersionsPage() {
  const [snippets, setSnippets] = useState<SnippetWithVersions[] | null>(null);

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setSnippets);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Versions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {snippets?.map(({ name, versionCount, _id }) => (
            <tr key={name}>
              <th>{_id}</th>
              <td>
                <Link to={`/code-versions/${_id}`}>{name}</Link>
              </td>

              <td>{versionCount}</td>
              <td>Actions</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
