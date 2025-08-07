// const fs =require('fs');
// const path = require('path');

// const inputFilePath = path.join(__dirname, 'input.txt');
// const outputFilePath = path.join(__dirname, 'output.txt');

// const readStream = fs.createReadStream(inputFilePath, "utf-8");

// readStream.on('data', (chunk) => {
//     console.log('New chunk received:', chunk);
// });

// readStream.on('end', () => {
//     console.log('No more data to read. ');
// });

// readStream.on('error', (err) => {
//     console.error('Error reading file:', err);
// });
const readline = require('readline');
const fs = require('fs');

const myInterface = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

myInterface.on('line', (fileLine) => {
  console.log(`The line read: ${fileLine}`);
});
