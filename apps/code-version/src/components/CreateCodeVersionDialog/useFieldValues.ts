import { useCallback, createRef } from 'react';
import { Version } from './types';

type ValueRef = {
  getValue: () => string;
  setValue: (val: string) => void;
};

const refs = {
  explanation: createRef<ValueRef>(),
  code: createRef<ValueRef>(),
  name: createRef<ValueRef>(),
};

export default function useFieldValues() {
  const getTextAreaValues = useCallback((): Version => {
    const code = refs.code.current?.getValue() || '';
    const explanation = refs.explanation.current?.getValue() || '';

    return {
      code,
      explanation,
    };
  }, []);

  const setCodeRefValue = (newValue: string) => {
    refs.code.current?.setValue(newValue);
  };

  const setExplanationRefValue = (newValue: string) => {
    refs.explanation.current?.setValue(newValue);
  };

  const getNameValue = () => {
    return refs.name.current?.getValue() || '';
  };

  return {
    getTextAreaValues,
    setCodeRefValue,
    setExplanationRefValue,
    getNameValue,
    refs,
  };
}
