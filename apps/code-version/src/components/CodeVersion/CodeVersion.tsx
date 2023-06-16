import { useState } from 'react';
import CodeBlock, { CodeBlockWidth } from '../CodeBlock/CodeBlock';
import clsx from 'clsx';
import { CodeBlockI, DialogTypes } from '../../types';
import { dialogOpen } from '../../store';
import {
  PlusIcon,
  TrashIcon,
  SplitInHalfIcon,
  FullWidthIcon,
} from '../../icons';

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

  // TODO extract into a method or a hook
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
              <PlusIcon />
            </button>
          )}
          {isLastVersion && (
            <button
              onClick={handleDeleteLastVersion}
              className="btn join-item btn-error"
            >
              <TrashIcon />
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
          {codeBlockWidth === 'Half' ? <SplitInHalfIcon /> : <FullWidthIcon />}
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
