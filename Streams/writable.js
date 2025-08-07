const readline = require('readline');
const fs = require('fs');

const myInterface = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

const outputStream = fs.createWriteStream('output.txt');

myInterface.on('line', (fileLine) => {
  console.log(`The line read: ${fileLine}`);
  outputStream.write(`${fileLine}\n`);
});

myInterface.on('close', () => {
  console.log('Finished reading the file.');
  outputStream.end();
});

myInterface.on('error', (err) => {
  console.error('Error reading file:', err);
});
