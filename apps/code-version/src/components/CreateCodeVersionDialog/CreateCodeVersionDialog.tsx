import { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import VersionsSwitcher from './VersionsSwitcher';
import { Versions, SetVersions, Version } from './types';
import { initialData, initialVersions } from './constants';
import useFieldValues from './useFieldValues';
import Field from './Field';
import CreateBtn from './CreateBtn';
import { updateVersions } from './utils';

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
    const textAreaValues = getTextAreaValues();
    const versionsSubmitData = updateVersions(
      versions,
      currentVersion,
      textAreaValues
    );

    console.log(versionsSubmitData, getNameValue());
  };

  useEffect(() => {
    if (previousVersion === null) return;

    const textAreaValues = getTextAreaValues();
    setVersions((prevVersions) =>
      updateVersions(prevVersions, previousVersion, textAreaValues)
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
