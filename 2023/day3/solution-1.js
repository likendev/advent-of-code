import input from './input.js';

let inputArr = input.trim().split('\n');

let regexNumList = inputArr.map(line => {
  return line.match(/\d+/g);
});

let validNum = 0;
let test = [];

inputArr.forEach((line, index) => {
  console.log("index: ", index);
  let prevLineIndex = index - 1 < 0 ? 0 : index - 1;
  let nextLineIndex =
    index + 1 === inputArr.length ? inputArr.length - 1 : index + 1;
  let found = 0;
  if (regexNumList[index]) {
    regexNumList[index].forEach((num) => {
      let startIndex = line.substring(found).search(num) + found;
      let endIndex = startIndex >= 0 ? startIndex + num.length : 0;

      if (startIndex >= 0) {
        found = endIndex;
      }
      let testRangeStart = startIndex - 1 < 0 ? 0 : startIndex - 1;
      let testRangeEnd =
        endIndex + 1 >= line.length ? line.length : endIndex + 1;
      let symbolTest = new RegExp(/[^\.\d]/g);
      if (
        (startIndex - 1 >= 0 && symbolTest.test(line[startIndex - 1])) ||
        (endIndex + 1 <= line.length && symbolTest.test(line[endIndex])) ||
        (index - 1 >= 0 &&
          symbolTest.test(
            inputArr[prevLineIndex].substring(testRangeStart, testRangeEnd)
          )) ||
        (index + 1 < inputArr.length &&
          symbolTest.test(
            inputArr[nextLineIndex].substring(testRangeStart, testRangeEnd)
          ))
      ) {
        validNum += parseInt(num);
      } else {
        test.push(num);
      }
    });
  }
});
console.log(test)
console.log(validNum)