import fs from 'fs';

const input = fs.readFileSync('src/2022/2/input.txt', 'utf8');
const inputArray = input.trim().split('\n');

const sumReducer = (sum, num) => sum + num;

// PART 1
const moveValues = {
	X: 1,
	Y: 2,
	Z: 3,
};

const gameValues = {
	A: { X: 3, Y: 6, Z: 0 },
	B: { X: 0, Y: 3, Z: 6 },
	C: { X: 6, Y: 0, Z: 3 },
};

const getTheScore = (game: string): number => {
	const [opponentMove, yourMove] = game.split(' ');
	const gameScore = gameValues[opponentMove][yourMove];
	const moveScore = moveValues[yourMove];
	return gameScore + moveScore;
};
const scores = inputArray.map(getTheScore);
const totalScore = scores.reduce(sumReducer, 0);
console.info(`Total score: ${totalScore}`);

// PART 2
/*
X is losing
Y is draw
Z is wining
 */

const requiredMoves = {
	A: { X: 'S', Y: 'R', Z: 'P' },
	B: { X: 'R', Y: 'P', Z: 'S' },
	C: { X: 'P', Y: 'S', Z: 'R' },
};

const actualMoveValues = {
	R: 1,
	P: 2,
	S: 3,
};

const actualGameValues = {
	X: 0,
	Y: 3,
	Z: 6,
};

const getActualScore = (game: string): number => {
	const [opponentMove, gameOutcome] = game.split(' ');
	const yourMove = requiredMoves[opponentMove][gameOutcome];
	const gameScore = actualGameValues[gameOutcome];
	const moveScore = actualMoveValues[yourMove];
	return moveScore + gameScore;
};

const actualScores = inputArray.map(getActualScore);
const actualTotalScore = actualScores.reduce(sumReducer, 0);
console.info(`Actual total score: ${actualTotalScore}`);
