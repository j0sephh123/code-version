import { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import VersionsSwitcher from './VersionsSwitcher';
import { Versions, SetVersions } from './types';
import { initialData, initialVersions } from './constants';
import useFieldValues from './useFieldValues';
import Field from './Field';
import CreateBtn from './CreateBtn';
import { updateVersionInArray } from './utils';
import useSetCurrentVersion from './hooks/useSetCurrentVersion';

export default function CreateCodeVersionDialog() {
  const [{ currentVersion, previousVersion }, setVersion] =
    useState<SetVersions>(initialVersions);
  const [versions, setVersions] = useState<Versions>(initialData);

  useSetCurrentVersion(versions, currentVersion);

  const { getTextAreaValues, refs, getNameValue } = useFieldValues();

  useEffect(() => {
    if (previousVersion === null) return;

    const textAreaValues = getTextAreaValues();
    setVersions((prevVersions) =>
      updateVersionInArray(prevVersions, previousVersion, textAreaValues)
    );
  }, [getTextAreaValues, previousVersion]);

  const handleCreate = () => {
    const textAreaValues = getTextAreaValues();
    const versionsSubmitData = updateVersionInArray(
      versions,
      currentVersion,
      textAreaValues
    );

    console.log(versionsSubmitData, getNameValue());
  };

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
