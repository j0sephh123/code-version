// Define a type for each content block
export interface ContentBlock {
  name: string;
  code: string;
  explanation?: string;
}

// Define a type for each mockBlock
export interface MockBlock {
  name: string;
  content: ContentBlock[];
}

// Then we can define the type for mockBlocks array
export type MockBlocks = MockBlock[];
