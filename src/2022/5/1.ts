import fs from 'fs';

const input = fs.readFileSync('src/2022/5/input.txt', 'utf8');
// Represent the stacks as an array of strings
const [stackPart, instructionsPart] = input.split('\n\n');

// PART 1
const stackRows = stackPart.split('\n').slice(0, -1);
const stackMatrix = stackRows.map((row) =>
	[...row].filter((_, index) => index % 4 === 1)
);

const totalStacks = stackMatrix[0].length;

const initialStacks = stackMatrix.reduce(
	(arr: string[], row: string[]) =>
		row.reduce(
			(arr: string[], char: string, charIndex: number) =>
				char === ' '
					? arr
					: arr.map(
							(str, stackIndex) =>
								stackIndex === charIndex ? str.concat(char) : str
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ),
			arr
		),
	Array(totalStacks).fill('')
);

// write a function for moving the crates
const reverseStr = (str: string): string => [...str].reverse().join('');

const moveCrates = (stacks, amount, from, to) =>
	stacks.map((stack, index) =>
		index === from - 1
			? stack.slice(amount)
			: index === to - 1
			? reverseStr(stacks[from - 1].slice(0, amount)) + stack
			: stack
	);

const multiMoveCrates = (stacks, amount, from, to) =>
	stacks.map((stack, index) =>
		index === from - 1
			? stack.slice(amount)
			: index === to - 1
			? stacks[from - 1].slice(0, amount) + stack
			: stack
	);

// parse the list of instructions and execute them
const convertInstructions = (instruction: string): number[] => {
	const [amount, from, to] = (
		instruction.match(/move (\d*) from (\d*) to (\d*)/) ?? []
	)
		.slice(1)
		.map(Number);
	return [amount, from, to];
};

const instructions = instructionsPart.split('\n').map(convertInstructions);
const finalStacks: string[] = instructions.reduce(
	(stacks, [amount, from, to]) => moveCrates(stacks, amount, from, to),
	initialStacks
);

const stackTops = finalStacks.map((stack) => stack.at(0)).join('');
console.info({ stackTops });

// PART 2
const finalStacksMulti: string[] = instructions.reduce(
	(stacks, [amount, from, to]) => multiMoveCrates(stacks, amount, from, to),
	initialStacks
);

const stackTopsMulti = finalStacksMulti.map((stack) => stack.at(0)).join('');
console.info({ stackTopsMulti });
