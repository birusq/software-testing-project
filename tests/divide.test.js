import divide from "../src/divide"

/*
	Equivalence classes to test for both numerator and denominator:
		- NaN
		- zero
		- positive number
		- negative number
		- negative infinity
		- positive infinity
	As there are two arguments that accept numbers, 
	all combinations of these classes are tested.
	Correct results are assumed to be the same as the results from "/"-operator.
*/

const positiveNum = 10.25;
const negativeNum = -20.50;

describe("divide.test.js", () => {
	test.each([
		[0, positiveNum, 0],
		[0, negativeNum, 0],
		[0, Infinity, 0],
		[0, -Infinity, 0],
		[positiveNum, positiveNum, 1],
		[positiveNum, negativeNum, -0.5],
		[positiveNum, Infinity, 0],
		[positiveNum, -Infinity, 0],
		[positiveNum, 0, Infinity],
		[negativeNum, positiveNum, 0.5],
		[negativeNum, negativeNum, 1],
		[negativeNum, Infinity, 0],
		[negativeNum, -Infinity, 0],
		[negativeNum, 0, Infinity],
		[Infinity, 0, Infinity],
		[Infinity, positiveNum, Infinity],
		[Infinity, negativeNum, Infinity],
		[-Infinity, 0, -Infinity],
		[-Infinity, positiveNum, -Infinity],
		[-Infinity, negativeNum, Infinity],
	])("divide(%d, %d)", (a, b, expected) => {
		expect(divide(a, b)).toStrictEqual(expected);
	});

	test.each([
		[0, 0],
		[Infinity, Infinity],
		[Infinity, -Infinity],
		[-Infinity, Infinity],
		[-Infinity, -Infinity],
		[NaN, 0],
		[NaN, positiveNum],
		[NaN, negativeNum],
		[NaN, Infinity],
		[NaN, -Infinity],
		[0, NaN],
		[positiveNum, NaN],
		[negativeNum, NaN],
		[Infinity, NaN],
		[-Infinity, NaN],
	])("divide(%d, %d)", (a, b) => {
		expect(divide(a, b)).toBeNaN();
	});
})
