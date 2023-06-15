import { useEffect } from 'react';
import { Versions } from '../types';
import useFieldValues from '../useFieldValues';

export default function useSetCurrentVersion(
  versions: Versions,
  currentVersion: number
) {
  const { setCodeRefValue, setExplanationRefValue } = useFieldValues();

  useEffect(() => {
    const values = versions[currentVersion];

    setCodeRefValue(values ? values.code : '');
    setExplanationRefValue(values ? values.explanation : '');
  }, [currentVersion, versions, setCodeRefValue, setExplanationRefValue]);
}
