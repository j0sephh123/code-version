import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export type CodeBlockWidth = 'Half' | 'Full';

type Props = {
  code: string;
  codeBlockWidth: CodeBlockWidth;
};

export default function CodeBlock({ code, codeBlockWidth }: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div
      className={`relative ${codeBlockWidth === 'Half' ? 'w-6/12' : 'w-full'}`}
    >
      <svg
        onClick={handleCopy}
        fill="none"
        stroke={'currentColor'}
        strokeWidth={'1.5'}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`absolute cursor-pointer stroke-current text-white w-8 right-0`}
      >
        <path d="M13 10.75h-1.25a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h8.5a2 2 0 0 0 2-2v-8.5a2 2 0 0 0-2-2H19"></path>
        <path d="M18 12.25h-4a1 1 0 0 1-1-1v-1.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1ZM13.75 16.25h4.5M13.75 19.25h4.5"></path>
      </svg>
      <SyntaxHighlighter
        showLineNumbers
        language="javascript"
        style={atomOneDark}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

