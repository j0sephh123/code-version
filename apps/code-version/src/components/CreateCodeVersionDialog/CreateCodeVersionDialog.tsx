import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Wrapper from './Wrapper';
import VersionsSwitcher, { defaultVersion } from './VersionsSwitcher';
import TextArea from './TextArea';

type FormState = 'allowedToSubmit' | 'loading' | 'disabled';

type GetValueRef<T> = {
  getValue: () => T;
};

type Data = {
  code: string;
  explanation: string;
}[];

export default function CreateCodeVersionDialog() {
  const [version, setVersion] = useState(defaultVersion);
  const [data, setData] = useState<Data>([]);
  const codeRef = useRef<GetValueRef<string>>({
    getValue: () => '',
  });
  const explanationRef = useRef<GetValueRef<string>>({
    getValue: () => '',
  });
  const [formState, setFormState] = useState<FormState>('disabled');
  const [nameValue, setNameValue] = useState('');

  // const getContentBlocks = () => {}

  const handleCreate = () => {
    console.log({ nameValue });

    // getCurrentVersion

    // modalClose();

    // const version = versionRef.current.getValue();

    console.log(data);

    setNameValue('');
  };

  useEffect(() => {
    const code = codeRef.current.getValue();
    const explanation = explanationRef.current.getValue();

    data[version] = { code, explanation };
  }, [data, version]);

  console.log(data);

  return (
    <Wrapper>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Create a code version</h3>
        <div className="py-2"></div>
        <input
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
        />

        <VersionsSwitcher version={version} setVersion={setVersion} />
        <TextArea ref={codeRef} placeholder="Code" />
        <TextArea ref={explanationRef} placeholder="Explanation" />

        <button
          onClick={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className={clsx(
            'btn',
            'btn-outline',
            'btn-info',
            'btn-block',
            'mt-2'
            // 'btn-disabled'
          )}
        >
          {/* <span className="loading loading-spinner"></span>
          Creating... */}
          Create
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </Wrapper>
  );
}
