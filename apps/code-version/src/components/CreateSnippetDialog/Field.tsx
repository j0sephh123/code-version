type Props = {
  placeholder: string;
  value: string;
  setValue: (arg: string) => void;
};

const Field = ({ placeholder, value, setValue }: Props) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
      placeholder={placeholder}
      className="input input-bordered w-full my-6"
    />
  );
};

export default Field;
