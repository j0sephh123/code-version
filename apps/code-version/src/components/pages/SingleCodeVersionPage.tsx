import { useEffect, useState } from 'react';
import CodeVersion from '../CodeVersion/CodeVersion';
import { MockBlock } from '../../types';

type Props = {
  id: string;
};

export default function SingleCodeVersionPage({ id }: Props) {
  const [block, setBlock] = useState<MockBlock | null>(null);

  useEffect(() => {
    fetch(`/api/code-versions/${id}`)
      .then((r) => r.json())
      .then(setBlock);
  }, [id]);

  if (!block) {
    return;
  }

  return (
    <div>
      SingleCodeVersionPage {id}
      <CodeVersion block={block} />
    </div>
  );
}
