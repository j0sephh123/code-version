// Define a type for each content block
interface ContentBlock {
  name: string;
  code: string;
}

// Define a type for each mockBlock
interface MockBlock {
  name: string;
  content: ContentBlock[];
}

// Then we can define the type for mockBlocks array
export type MockBlocks = MockBlock[];
