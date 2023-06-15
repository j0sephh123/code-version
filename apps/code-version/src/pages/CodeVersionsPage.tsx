import { Link } from 'wouter';
import { useEffect, useState } from 'react';

// TODO add https://daisyui.com/components/badge/

export default function CodeVersionsPage() {
  const [mockBlocks, setMockBlocks] = useState<
    | {
        name: string;
        versionCount: number;
      }[]
    | null
  >(null);

  console.log(mockBlocks);

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
          {mockBlocks?.map(({ name, versionCount }, index) => (
            <tr key={name}>
              <th>{index}</th>
              <td>
                <Link to={`/code-versions/${index}`}>{name}</Link>
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
