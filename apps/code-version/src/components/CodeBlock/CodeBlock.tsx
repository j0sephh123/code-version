import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CopyIcon from '../../icons/CopyIcon';

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
      <CopyIcon onClick={handleCopy} />
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
