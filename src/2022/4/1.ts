import fs from 'fs';

const input = fs.readFileSync('src/2022/4/input.txt', 'utf8');
const inputArray = input.trim().split('\n');

// PART 1
// Find coordinates of each range
const parseRangePairs = (rangePair: string): number[] => {
	const [start1, end1, start2, end2] = (
		rangePair.match(/(\d*)-(\d*),(\d*)-(\d*)/) ?? []
	)
		.slice(1)
		.map(Number);
	return [start1, end1, start2, end2];
};

// count how many of our pairs have one range fully contained within the other
const checkContaining = ([start1, end1, start2, end2]: number[]): boolean =>
	(start1 >= start2 && end1 <= end2) || (start1 <= start2 && end1 >= end2);

const coordinates = inputArray.map(parseRangePairs);
const containing = coordinates.filter(checkContaining);

console.info(`Total fully contain: ${containing.length}`);

// PART 2
const checkOverlapping = ([start1, end1, start2, end2]: number[]): boolean =>
	start1 <= end2 && start2 <= end1;

const overlapping = coordinates.filter(checkOverlapping);

console.info(`Total overlapping: ${overlapping.length}`);
