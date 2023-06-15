import { useEffect, useState } from 'react';
import CodeVersion from '../components/CodeVersion/CodeVersion';
import { CodeBlockI } from '../types';

type Props = {
  id: string;
};

export default function SingleCodeVersionPage({ id }: Props) {
  const [block, setBlock] = useState<CodeBlockI | null>(null);

  useEffect(() => {
    fetch(`/api/snippets/${id}`)
      .then((r) => r.json())
      .then(setBlock);
  }, [id]);

  return (
    <div>
      SingleCodeVersionPage {id}
      {block && <CodeVersion codeBlock={block} />}
    </div>
  );
}
