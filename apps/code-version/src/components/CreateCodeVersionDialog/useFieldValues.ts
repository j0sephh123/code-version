import { useCallback, useRef } from 'react';
import { initialRefValues } from './constants';
import { ValueRef } from './types';

export default function useFieldValues() {
  const explanationRef = useRef<ValueRef>(initialRefValues);
  const codeRef = useRef<ValueRef>(initialRefValues);
  const nameRef = useRef<ValueRef>(initialRefValues);

  const getTextAreaValues = useCallback(() => {
    const code = codeRef.current.getValue();
    const explanation = explanationRef.current.getValue();

    return {
      code,
      explanation,
    };
  }, []);

  const setCodeRefValue = (newValue: string) => {
    codeRef.current.setValue(newValue);
  };

  const setExplanationRefValue = (newValue: string) => {
    explanationRef.current.setValue(newValue);
  };

  const getNameValue = () => {
    return nameRef.current.getValue() || '';
  };

  return {
    getTextAreaValues,
    setCodeRefValue,
    setExplanationRefValue,
    codeRef,
    explanationRef,
    nameRef,
    getNameValue,
  };
}
