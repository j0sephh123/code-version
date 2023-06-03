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
        explanation: `This code demonstrates a simple JavaScript function named increment which takes a single argument n. The function returns the value of n incremented by one.`,
      },
      {
        name: 'Adding default parameter',
        code: `function increment(n = 0) {
            return n + 1;
          }
          `,
        explanation: `In this version, a default parameter n = 0 is added. This means if no argument is passed when calling the function, n will be assumed as 0. It ensures the function works without an explicit argument.`,
      },
      {
        name: 'Using arrow function',
        code: `const increment = (n = 0) => {
            return n + 1;
          };
          `,
        explanation: `This version introduces arrow function syntax, which is a shorter way to write functions in JavaScript. Here, increment becomes a constant that holds the function. The function itself remains the same, taking n (defaulting to 0) as an argument and incrementing it by one.`,
      },
      {
        name: 'Simplifying arrow function',
        code: `const increment = (n = 0) => n + 1;
        `,
        explanation: `This version simplifies the arrow function further by removing the curly braces {} and the return keyword. In JavaScript, if an arrow function body consists of a single expression, you can omit the return keyword and the curly braces, and the expression will be returned implicitly.`,
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
        explanation: `Here, error handling has been added to the function. Before executing its primary task, the function checks whether the input n is a number. If not, it throws an error message. This is an important practice to make your code more robust and avoid unexpected behaviors.`,
      },
    ],
  },
];

export default mockBlocks;
