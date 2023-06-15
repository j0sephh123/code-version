import clsx from 'clsx';

type Props = {
  onClick: () => void;
};

export default function CreateBtn({ onClick }: Props) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={clsx(
        'btn',
        'btn-outline',
        'btn-info',
        'btn-block',
        'mt-2'
        // formState === 'disabled' && 'btn-disabled'
      )}
    >
      {/* {formState === 'loading' ? (
      <>
        <span className="loading loading-spinner"></span> 
        Creating...
      </>
    ) : (
      'Create'
    )} */}
      Create
    </button>
  );
}
