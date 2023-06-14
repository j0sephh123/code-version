import { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import VersionsSwitcher from './VersionsSwitcher';
import { Versions, SetVersions, Version } from './types';
import { initialData, initialVersions } from './constants';
import useFieldValues from './useFieldValues';
import Field from './Field';
import CreateBtn from './CreateBtn';

// Define a helper function
/**
 *
 * @param versionsData - array
 * @param indexToUpdate - current or previous versions index
 * @param newTextAreaValues - new values to set
 * @returns
 */
const updateVersions = (
  versionsData: Versions,
  indexToUpdate: number,
  newTextAreaValues: Version
) => {
  if (versionsData[indexToUpdate] !== undefined) {
    return versionsData.map((item, index) => {
      if (index === indexToUpdate) {
        return newTextAreaValues;
      }
      return item;
    });
  }

  return [
    ...versionsData.slice(0, indexToUpdate),
    newTextAreaValues,
    ...versionsData.slice(indexToUpdate + 1),
  ];
};

export default function CreateCodeVersionDialog() {
  const [{ currentVersion, previousVersion }, setVersion] =
    useState<SetVersions>(initialVersions);
  const [versions, setVersions] = useState<Versions>(initialData);

  const {
    getTextAreaValues,
    setCodeRefValue,
    setExplanationRefValue,
    refs,
    getNameValue,
  } = useFieldValues();

  const handleCreate = () => {
    const versionsSubmitData = updateVersions(
      versions,
      currentVersion,
      getTextAreaValues()
    );

    console.log(versionsSubmitData, getNameValue());
  };

  useEffect(() => {
    if (previousVersion === null) return;
    setVersions((prevVersions) =>
      updateVersions(prevVersions, previousVersion, getTextAreaValues())
    );
  }, [getTextAreaValues, previousVersion]);

  useEffect(() => {
    const values = versions[currentVersion];

    setCodeRefValue(values ? values.code : '');
    setExplanationRefValue(values ? values.explanation : '');
  }, [currentVersion, versions, setCodeRefValue, setExplanationRefValue]);

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
