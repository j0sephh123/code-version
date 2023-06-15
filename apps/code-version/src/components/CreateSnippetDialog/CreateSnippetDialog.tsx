import CreateBtn from './CreateBtn';
import Wrapper from './Wrapper';
import Field from './Field';
import { useState } from 'react';
import { modalClose } from '../../store';

export default function CreateSnippetDialog() {
  const [name, setName] = useState('');

  const handleCreate = async () => {
    console.log({ name });

    await fetch('/api/snippets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    setName('');
    modalClose();
  };

  return (
    <Wrapper>
      <Field placeholder="Name" value={name} setValue={setName} />
      <CreateBtn onClick={handleCreate} />
    </Wrapper>
  );
}
