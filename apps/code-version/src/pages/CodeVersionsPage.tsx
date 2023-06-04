import { Link } from 'wouter';
import mockBlocks from '../mockBlocks';

export default function CodeVersionsPage() {
  console.log(mockBlocks);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>
              Name
            </th>
            <th>Versions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockBlocks.map(({ name, content }, index) => (
            <tr key={name}>
              <th>{index}</th>
              <td><Link to={`/code-versions/${index}`}>{name}</Link></td>
              
              <td>{content.length}</td>
              <td>Actions</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
