import fs from 'fs';

const input = fs.readFileSync('src/2022/1/input.txt', 'utf8');
const inputArray = input.split('\n\n');

// PART 1: Find max calories for specific elf
const sumReducer = (sum, num) => sum + num;
const getSumOfGroup = (group: string): number =>
	group
		.split('\n')
		.map(Number)
		.reduce(sumReducer, 0);

const groupSum = inputArray.map(getSumOfGroup);

const max = Math.max(...groupSum);

console.info('Max Calories:', max);

// PART 2: Find the top 3 elves calories and get the sum of the 3 of them
const sortedSumGroup = [...groupSum].sort((a, b) => b - a);
const top3Sums = sortedSumGroup.slice(0, 3);
const sumOfTop3 = top3Sums.reduce(sumReducer, 0);

console.info('Sum of top 3:', sumOfTop3);
