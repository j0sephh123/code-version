import { forwardRef, useImperativeHandle, useRef } from 'react';

type Props = {
  placeholder: string;
};

const TextArea = forwardRef(({ placeholder }: Props, ref) => {
  const valueRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        getValue() {
          return valueRef.current?.value;
        },
        setValue(value: string) {
          if (valueRef.current) {
            valueRef.current.value = value;
          }
        },
      };
    },
    []
  );

  return (
    <textarea
      ref={valueRef}
      className="textarea textarea-bordered w-full mt-4"
      placeholder={placeholder}
    ></textarea>
  );
});

export default TextArea;
