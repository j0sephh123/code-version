export type Snippet = {
  _id: string;
  name: string;
};

export type SnippetWithVersions = Snippet & { versionCount: number };

export type Version = {
  _id: string;
  snippetId: string;
  version: number;
  code: string;
  explanation: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CodeBlockI = {
  snippet: Snippet;
  versions: Version[];
};

export enum DialogTypes  {
  createSnippet,
  insertCode,
  insertExplanation,
}