import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';

const maxVersions = 4;

export const defaultVersion = 0;

export type VersionSwitcherProps = {
  version: number;
  setVersion: Dispatch<
    SetStateAction<{ currentVersion: number; previousVersion: number | null }>
  >;
};

const VersionsSwitcher = ({ version, setVersion }: VersionSwitcherProps) => {
  return (
    <div className="flex items-center pt-6 gap-4">
      <input
        onClick={() =>
          setVersion(({ currentVersion }) => {
            return {
              previousVersion: currentVersion,
              currentVersion: currentVersion - 1,
            };
          })
        }
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
        onClick={() =>
          setVersion(({ currentVersion }) => {
            return {
              previousVersion: currentVersion,
              currentVersion: currentVersion + 1,
            };
          })
        }
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
