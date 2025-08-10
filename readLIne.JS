// Documentation and Explanation of the readline Module in Node.js

/**
 * Node.js `readline` Module
 * 
 * The `readline` module provides an interface for reading data from a readable stream (like `process.stdin`) one line at a time.
 * It is commonly used for creating command-line tools, interactive prompts, or processing input line-by-line.
 * 
 * Example Use Cases:
 * 1. Interactive command-line tools.
 * 2. Processing large text files line-by-line.
 * 3. Creating quizzes or surveys in the terminal.
 * 4. Building REPL (Read-Eval-Print Loop) environments.
 */

// Importing the readline module
const readline = require('readline');

/**
 * Creating a Readline Interface
 * 
 * The `readline.createInterface()` method is used to create an interface for reading input and writing output.
 * 
 * Syntax:
 * const rl = readline.createInterface({
 *   input: readableStream,
 *   output: writableStream,
 *   completer: function, // Optional for autocompletion
 *   terminal: boolean    // Optional, default is true
 * });
 */

const rl = readline.createInterface({
  input: process.stdin,  // Standard input stream
  output: process.stdout // Standard output stream
});

/**
 * Basic Usage
 * 
 * Reading Input:
 * Use the `question()` method to prompt the user for input.
 */
rl.question('What is your name? ', (answer) => {
  console.log(`Hello, ${answer}!`);

  // Closing the interface
  rl.close();
});

/**
 * Line-by-Line Input:
 * To process input line-by-line, listen to the `line` event.
 */
rl.on('line', (input) => {
  console.log(`Received: ${input}`);
});

/**
 * Closing the Interface:
 * Always close the interface when done to free up resources.
 */
rl.on('close', () => {
  console.log('Interface closed.');
});

/**
 * Advanced Features
 * 
 * Autocompletion:
 * You can provide autocompletion for user input using the `completer` option.
 */
const completer = (line) => {
  const completions = ['help', 'exit', 'list'];
  const hits = completions.filter((c) => c.startsWith(line));
  return [hits.length ? hits : completions, line];
};

const rlWithCompleter = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer
});

/**
 * Custom Prompts:
 * You can create custom prompts using `setPrompt()` and `prompt()`.
 */
rl.setPrompt('Enter a command: ');
rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'hello':
      console.log('Hello there!');
      break;
    case 'exit':
      console.log('Goodbye!');
      rl.close();
      break;
    default:
      console.log(`Unknown command: ${line}`);
  }
  rl.prompt();
});

/**
 * Error Handling:
 * Always handle errors gracefully.
 */
rl.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});