const task1 = () => {
  process.stdin.setEncoding('utf8');

  process.stdin.on('readable', () => {
    var inputString = process.stdin.read();
    if(inputString !== null) {
      const reversedString = inputString.split("").reverse().join("");

      // slice(1) is used for removing end-of-line in the very beginning of the reversed string
      process.stdout.write(`${reversedString.slice(1)}\n`);
    }
  });
};

export { task1 }