import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { MockBlocks } from '../../types';

export default function CodeVersionsPage() {
  const [mockBlocks, setMockBlocks] = useState<MockBlocks|null>(null);

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMockBlocks);
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
          {mockBlocks?.map(({ name, content }, index) => (
            <tr key={name}>
              <th>{index}</th>
              <td>
                <Link to={`/code-versions/${index}`}>{name}</Link>
              </td>

              <td>{content.length}</td>
              <td>Actions</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
