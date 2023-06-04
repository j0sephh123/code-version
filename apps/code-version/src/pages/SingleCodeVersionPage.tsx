import CodeVersion from "../components/CodeVersion/CodeVersion";
import mockBlocks from "../mockBlocks";

type Props = {
  id: string;
};



export default function SingleCodeVersionPage({id}:Props) {
  const block = mockBlocks[+id];
  

  return <div>SingleCodeVersionPage {id}
    <CodeVersion block={block} />
  </div>;
}
