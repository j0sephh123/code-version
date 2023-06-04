const mockBlocks = [
  {
    id: '0',
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
  {
    id: '1',
    name: 'Loops',
    content: [
      {
        name: 'Basic for loop',
        code: `for (let i = 0; i < 5; i++) { 
          console.log(i); 
        }`,
        explanation: `This code demonstrates a simple JavaScript for loop. The loop starts with i equals 0 and continues until i is less than 5, incrementing i by one with each iteration. For each loop, the current value of i is logged to the console.`,
      },
      {
        name: 'Basic while loop',
        code: `let i = 0;
        while (i < 5) {
          console.log(i);
          i++;
        }
        `,
        explanation: `This code demonstrates a simple while loop in JavaScript. The loop starts with i equals 0 and continues until i is less than 5. In each iteration of the loop, the current value of i is logged to the console, and then i is incremented by one.`,
      },
      {
        name: 'Do...while loop',
        code: `let i = 0;
        do {
          console.log(i);
          i++;
        } while (i < 5);
        `,
        explanation: `This code demonstrates a do...while loop in JavaScript. This loop will first do the action (log i to the console and increment i) and then check the condition (i < 5). This means the loop will always execute at least once, even if the condition is false at the start.`,
      },
      {
        name: 'For...of loop',
        code: `let array = [1, 2, 3, 4, 5];
        for (const element of array) {
          console.log(element);
        }
        `,
        explanation: `This code demonstrates a for...of loop in JavaScript. This loop iterates over iterable objects (including array, map, set, string, etc). Here, it logs each element of the array to the console.`,
      },
      {
        name: 'For...in loop',
        code: `let obj = {a: 1, b: 2, c: 3};
        for (const prop in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            console.log(\`\${prop}: \${obj[prop]}\`);
          }
        }
        `,
        explanation: `This code demonstrates a for...in loop in JavaScript. This type of loop is used to iterate over the properties of an object. Here, it logs each property and its value of the object to the console. The hasOwnProperty call is a guard against prototype pollution.`,
      },
    ],
  },
];

export default mockBlocks;
