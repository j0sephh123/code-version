import { forwardRef, useImperativeHandle, useRef } from 'react';

type Props = {
  placeholder: string;
  type: 'input' | 'textarea';
};

const Field = forwardRef(({ placeholder, type }: Props, ref) => {
  const valueRef = useRef<any>(null);

  useImperativeHandle(
    ref,
    () => ({
      getValue() {
        return valueRef.current?.value;
      },
      setValue(value: string) {
        if (valueRef.current) {
          valueRef.current.value = value;
        }
      },
    }),
    []
  );

  if (type === 'textarea') {
    return (
      <textarea
        ref={valueRef}
        className="textarea textarea-bordered w-full mt-4"
        placeholder={placeholder}
      ></textarea>
    );
  }

  return (
    <input
      ref={valueRef}
      type="text"
      placeholder={placeholder}
      className="input input-bordered w-full"
    />
  );
});

export default Field;
