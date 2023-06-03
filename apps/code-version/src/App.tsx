import CodeBlock from './components/CodeBlock';
import mockBlocks from './mockBlocks';

const firstBlock = mockBlocks[0];

export default function App() {
  return (
    <div>
      {firstBlock.content.map(({ code, name }) => (
        <CodeBlock key={name} code={code} />
      ))}
    </div>
  );
}
