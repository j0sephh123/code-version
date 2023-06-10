import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Wrapper from './Wrapper';
import VersionsSwitcher, { defaultVersion } from './VersionsSwitcher';
import TextArea from './TextArea';

type FormState = 'allowedToSubmit' | 'loading' | 'disabled';

type ValueRef = {
  getValue: () => string;
  setValue: (value: string) => void;
};

type Data = {
  code: string;
  explanation: string;
}[];

const initialData: Data = [];

export default function CreateCodeVersionDialog() {
  const [{ currentVersion, previousVersion }, setVersion] = useState<any>({
    currentVersion: defaultVersion,
    previousVersion: null,
  });
  const [data, setData] = useState<Data>(initialData);
  const codeRef = useRef<ValueRef>({
    getValue: () => '',
    setValue: () => undefined,
  });
  const explanationRef = useRef<ValueRef>({
    getValue: () => '',
    setValue: () => undefined,
  });
  const [formState, setFormState] = useState<FormState>('disabled');
  const [nameValue, setNameValue] = useState('');

  const getTextAreaValues = () => {
    const code = codeRef.current.getValue();
    const explanation = explanationRef.current.getValue();

    return {
      code,
      explanation,
    };
  };

  const handleCreate = () => {
    const textAreaValues = getTextAreaValues();

    let allData: any = [];

    if (data[currentVersion] !== undefined) {
      allData = data.map((item, index) => {
        if (index === currentVersion) {
          item = textAreaValues;
        }
        return item;
      });
    } else {
      const newData = [...data];

      newData[currentVersion] = textAreaValues;
      allData = newData;
    }

    console.log(allData);

    setNameValue('');
  };

  useEffect(() => {
    const textAreaValues = getTextAreaValues();

    if (previousVersion !== null) {
      setData((prevData) => {
        if (prevData[previousVersion] !== undefined) {
          return prevData.map((prevItem, index) => {
            if (index === previousVersion) {
              prevItem = textAreaValues;
            }
            return prevItem;
          });
        }

        prevData[previousVersion] = textAreaValues;
        return prevData;
      });
    }
  }, [previousVersion]);

  useEffect(() => {
    const values = data[currentVersion];

    codeRef.current.setValue(values ? values.code : '');
    explanationRef.current.setValue(values ? values.explanation : '');

    console.log(values);
  }, [currentVersion, data]);

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

        <VersionsSwitcher version={currentVersion} setVersion={setVersion} />
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
