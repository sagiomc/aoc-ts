import fs from 'fs';

const input = fs.readFileSync('src/2022/6/input.txt', 'utf8');
const inputArray = input.split('\n');

const findUniqueSubStrIndex = (str: string, windowSize: number, index = 0) => {
	// get the substring of length 4 starting at index i
	const substring = str.slice(index, index + windowSize);
	// count the number of unique characters in the substring
	const uniqueCount = new Set(substring).size;
	// if it has 4 unique characters, return index + 4
	// otherwise, repeat the process at next index
	return uniqueCount === windowSize
		? index + windowSize
		: findUniqueSubStrIndex(str, windowSize, index + 1);
};
// PART 1
console.log(findUniqueSubStrIndex(inputArray[0], 4));

// PART 2
console.log(findUniqueSubStrIndex(inputArray[0], 14));
