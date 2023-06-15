import CreateBtn from './CreateBtn';
import Wrapper from './Wrapper';
import Field from './Field';
import { useState } from 'react';
import { dialogClose, useStore } from '../../store';
import { dialogLabels } from '../../constants';
import { transformDialogTypeFieldForApi } from '../../utils';

export default function CreateSnippetDialog() {
  const [value, setValue] = useState('');
  const { type, versionId } = useStore();

  const handleCreate = async () => {
    if (type === null) {
      return;
    }

    // TODO needs heavy refactoring
    const key = transformDialogTypeFieldForApi(type);
    const submitObject: any = {};
    if (key === 'name') {
      submitObject['name'] = value;
    } else {
      submitObject['fieldName'] = key;
      submitObject['value'] = value;
    }

    console.log({
      versionId,
    });

    await fetch(
      `/api/${key === 'name' ? 'snippets' : `versions/${versionId}`}`,
      {
        method: key === 'name' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitObject),
      }
    );

    setValue('');
    dialogClose();
  };

  return (
    <Wrapper type={type !== null ? dialogLabels[type] : ''}>
      <Field
        placeholder={type ? dialogLabels[type] : ''}
        value={value}
        setValue={setValue}
      />
      <CreateBtn onClick={handleCreate} />
    </Wrapper>
  );
}
