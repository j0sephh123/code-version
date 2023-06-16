import { useState } from 'react';
import CodeBlock, { CodeBlockWidth } from '../CodeBlock/CodeBlock';
import clsx from 'clsx';
import { CodeBlockI, DialogTypes } from '../../types';
import { dialogOpen } from '../../store';

type Props = {
  codeBlock: CodeBlockI;
};

export default function CodeVersion({ codeBlock }: Props) {
  const [codeBlockWidth, setCodeBlockWidth] = useState<CodeBlockWidth>('Half');
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  // TODO memoize?
  const totalItems = codeBlock.versions.length;
  const { code, explanation } = codeBlock['versions'][currentItemIndex];

  // TODO extract into a method or a hook
  const addVersionDraft = async () => {
    await fetch(`/api/snippets/${codeBlock.snippet._id}/add-version`, {
      method: 'PUT',
    });
  };

  const handleDeleteLastVersion = async () => {
    await fetch(`/api/snippets/${codeBlock.snippet._id}/delete-version`, {
      method: 'DELETE',
    });
  };

  const {
    _id: lastVersionId,
    code: lastVersionCode,
    explanation: lastVersionExplanation,
  } = codeBlock.versions[codeBlock.versions.length - 1];
  const isLastVersion = currentItemIndex === totalItems - 1;
  // TODO memoize?
  const shouldShowAddVersionButton =
    lastVersionExplanation.length > 0 && lastVersionCode.length > 0;

  /**
   * TODO Encapsulate Repeated JSX: Extract repeated or complex JSX into separate components.
   * The SVG icons in buttons can be turned into components.
   * Similarly, buttons used to switch the currentItemIndex could also be a separate component.
   */

  // TODO revisit Conditional Rendering logic
  return (
    <>
      <div className="join pb-4 flex justify-between">
        <div className="flex">
          {[...Array(totalItems).keys()].map((page) => (
            <button
              onClick={() => setCurrentItemIndex(page)}
              key={page}
              className={clsx(
                'join-item',
                'btn',
                page === currentItemIndex ? 'btn-primary' : 'btn-neutral'
              )}
            >
              {page + 1}
            </button>
          ))}
          {shouldShowAddVersionButton && (
            <button
              onClick={addVersionDraft}
              className="btn join-item btn-success"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          )}
          {isLastVersion && (
            <button
              onClick={handleDeleteLastVersion}
              className="btn join-item btn-error"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          )}
        </div>

        <button
          onClick={() =>
            setCodeBlockWidth((prevItemWidthState) =>
              prevItemWidthState === 'Full' ? 'Half' : 'Full'
            )
          }
          className="btn btn-square btn-outline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                codeBlockWidth === 'Half'
                  ? 'M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                  : 'M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5'
              }
            />
          </svg>
        </button>
      </div>
      <div className="join">
        {isLastVersion && lastVersionCode.length === 0 && (
          <button
            onClick={() => dialogOpen(DialogTypes.insertCode, lastVersionId)}
            className="btn btn-secondary join-item"
          >
            Insert Code
          </button>
        )}

        {isLastVersion && lastVersionExplanation.length === 0 && (
          <button
            onClick={() =>
              dialogOpen(DialogTypes.insertExplanation, lastVersionId)
            }
            className="btn btn-secondary join-item"
          >
            Insert Explanation
          </button>
        )}
      </div>
      <div
        className={clsx(
          'flex',
          'gap-6',
          codeBlockWidth === 'Full' && 'flex-wrap'
        )}
      >
        {!isLastVersion || (isLastVersion && lastVersionCode.length > 0) ? (
          <CodeBlock codeBlockWidth={codeBlockWidth} code={code} />
        ) : null}

        {!isLastVersion ||
        (isLastVersion && lastVersionExplanation.length > 0) ? (
          <div className={codeBlockWidth === 'Half' ? 'w-6/12' : 'w-full'}>
            {explanation}
          </div>
        ) : null}
      </div>
    </>
  );
}
