import CreateBtn from './CreateBtn';
import Wrapper from './Wrapper';
import Field from './Field';
import { useState } from 'react';
import { dialogClose, useStore } from '../../store';
import { dialogLabels } from '../../constants';
import { DialogTypes } from '../../types';

export default function CreateSnippetDialog() {
  const [name, setName] = useState('');
  const { type } = useStore();

  const handleCreate = async () => {
    await fetch('/api/snippets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    setName('');
    dialogClose();
  };

  return (
    <Wrapper type={type !== null ? dialogLabels[type] : ""}>
      {type === DialogTypes.createSnippet && (
        <>
          <Field placeholder="Name" value={name} setValue={setName} />
          <CreateBtn onClick={handleCreate} />
        </>
      )}
    </Wrapper>
  );
}
