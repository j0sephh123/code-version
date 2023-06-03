import { MockBlocks } from './types';

const mockBlocks: MockBlocks = [
  {
    name: 'A function',
    content: [
      {
        name: 'Basic function',
        code: `function increment(n) { 
          return n + 1; 
        }`,
      },
      {
        name: 'Adding default parameter',
        code: `function increment(n = 0) {
            return n + 1;
          }
          `,
      },
      {
        name: 'Using arrow function',
        code: `const increment = (n = 0) => {
            return n + 1;
          };
          `,
      },
      {
        name: 'Simplifying arrow function',
        code: `const increment = (n = 0) => n + 1;
        `,
      },
      {
        name: 'Adding error handling',
        code: `const increment = (n = 0) => {
          if (typeof n !== 'number') {
            throw new Error('Input must be a number');
          }
          return n + 1;
        };
        `,
      },
    ],
  },
];

export default mockBlocks;
