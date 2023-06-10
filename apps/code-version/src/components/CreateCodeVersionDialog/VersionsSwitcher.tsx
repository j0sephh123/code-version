import clsx from 'clsx';

const maxVersions = 4;

export const defaultVersion = 0;

type Props = {
  version: number;
  setVersion: React.Dispatch<React.SetStateAction<number>>;
};

const VersionsSwitcher = ({ version, setVersion }: Props) => {
  return (
    <div className="flex items-center pt-6 gap-4">
      <input
        onClick={() => setVersion((prevVersion) => prevVersion - 1)}
        type="button"
        value="Previous"
        className={clsx(
          'btn',
          version !== defaultVersion && 'btn-primary',
          version === defaultVersion && 'btn-disabled'
        )}
      />
      <p>
        Version: <span className="font-extrabold text-xl">{version}</span>
      </p>
      <input
        onClick={() => setVersion((prevVersion) => prevVersion + 1)}
        type="button"
        value="Next"
        className={clsx(
          'btn',
          version !== maxVersions && 'btn-primary',
          version === maxVersions && 'btn-disabled'
        )}
      />
    </div>
  );
};

export default VersionsSwitcher;
