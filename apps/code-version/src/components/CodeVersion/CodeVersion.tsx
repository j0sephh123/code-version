import { useState } from 'react';
import mockBlocks from '../../mockBlocks';
import CodeBlock, { CodeBlockWidth } from '../CodeBlock/CodeBlock';
import clsx from 'clsx';

const firstBlock = mockBlocks[0];

export default function CodeVersion() {
  const [codeBlockWidth, setCodeBlockWidth] = useState<CodeBlockWidth>('Half');
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const totalItems = firstBlock.content.length;
  const { code, explanation } = firstBlock['content'][currentItemIndex];

  return (
    <>
      <div className="join pb-4 flex justify-between">
        <div>
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
      <div
        className={clsx(
          'flex',
          'gap-6',
          codeBlockWidth === 'Full' && 'flex-wrap'
        )}
      >
        <CodeBlock codeBlockWidth={codeBlockWidth} code={code} />
        <div className={codeBlockWidth === 'Half' ? 'w-6/12' : 'w-full'}>
          {explanation}
        </div>
      </div>
    </>
  );
}
