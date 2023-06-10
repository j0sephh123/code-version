import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Wrapper from './Wrapper';
import VersionsSwitcher from './VersionsSwitcher';
import { Data, SetVersions } from './types';
import { initialData, initialVersions } from './constants';
import useFieldValues from './useFieldValues';
import Field from './Field';

export default function CreateCodeVersionDialog() {
  const [{ currentVersion, previousVersion }, setVersion] =
    useState<SetVersions>(initialVersions);
  const [data, setData] = useState<Data>(initialData);

  const {
    getTextAreaValues,
    setCodeRefValue,
    setExplanationRefValue,
    codeRef,
    explanationRef,
    nameRef,
    getNameValue,
  } = useFieldValues();

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

    console.log(allData, getNameValue());
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
  }, [getTextAreaValues, previousVersion]);

  useEffect(() => {
    const values = data[currentVersion];

    setCodeRefValue(values ? values.code : '');
    setExplanationRefValue(values ? values.explanation : '');
  }, [currentVersion, data, setCodeRefValue, setExplanationRefValue]);

  return (
    <Wrapper>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Create a code version</h3>
        <Field ref={nameRef} type="input" placeholder="Name" />
        <VersionsSwitcher version={currentVersion} setVersion={setVersion} />
        <Field type="textarea" ref={codeRef} placeholder="Code" />
        <Field type="textarea" ref={explanationRef} placeholder="Explanation" />

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
            // formState === 'disabled' && 'btn-disabled'
          )}
        >
          {/* {formState === 'loading' ? (
            <>
              <span className="loading loading-spinner"></span> 
              Creating...
            </>
          ) : (
            'Create'
          )} */}
          Create
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </Wrapper>
  );
}
