import fs from 'fs';

const sumReducer = (sum, num): number => sum + num;

const input = fs.readFileSync('src/2022/3/input.txt', 'utf8');
const inputArray = input.trim().split('\n');
// PART 1
// Find the common tem for each rucksack
const findCommonItem = (rucksack: string): string => {
	// Divide in 2 sections
	const halfIndex = rucksack.length / 2;
	const firstHalf = new Set(rucksack.slice(0, halfIndex));
	const secondHalf = rucksack.slice(halfIndex);
	return [...secondHalf].find((item) => firstHalf.has(item)) ?? '';
};

// Find the priority of each item
const getItemPriority = (item: string): number =>
	item.charCodeAt(0) - (/[a-z]/.test(item) ? 96 : 38);

const total = inputArray
	.map(findCommonItem)
	.map(getItemPriority)
	.reduce(sumReducer, 0);

console.info(`Total priorities: ${total}`);

// PART 2
// Divide the rucksacks into groups of 3
const getGroupsOf3 = (arr: string[]): string[][] =>
	arr.length ? [arr.slice(0, 3), ...getGroupsOf3(arr.slice(3))] : [];

// Find the common item for each group of 3
const findCommonItemInGroupOf3 = ([sack1, sack2, sack3]: string[]): string => {
	// convert the first two groups into sets
	const sack1Set = new Set(sack1);
	const sack2Set = new Set(sack2);
	return (
		[...sack3].find((item) => sack1Set.has(item) && sack2Set.has(item)) ?? ''
	);
};

// Find the priorities
const totalOf3 = getGroupsOf3(inputArray)
	.map(findCommonItemInGroupOf3)
	.map(getItemPriority)
	.reduce(sumReducer, 0);

console.info(`Total priorities: ${totalOf3}`);
