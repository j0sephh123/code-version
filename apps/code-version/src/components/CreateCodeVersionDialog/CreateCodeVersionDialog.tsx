import { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import VersionsSwitcher from './VersionsSwitcher';
import { Data, SetVersions } from './types';
import { initialData, initialVersions } from './constants';
import useFieldValues from './useFieldValues';
import Field from './Field';
import CreateBtn from './CreateBtn';

export default function CreateCodeVersionDialog() {
  const [{ currentVersion, previousVersion }, setVersion] =
    useState<SetVersions>(initialVersions);
  const [data, setData] = useState<Data>(initialData);

  const {
    getTextAreaValues,
    setCodeRefValue,
    setExplanationRefValue,
    refs,
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
      <Field ref={refs.name} type="input" placeholder="Name" />
      <VersionsSwitcher version={currentVersion} setVersion={setVersion} />
      <Field ref={refs.code} type="textarea" placeholder="Code" />
      <Field ref={refs.explanation} type="textarea" placeholder="Explanation" />

      <CreateBtn onClick={handleCreate} />
    </Wrapper>
  );
}
