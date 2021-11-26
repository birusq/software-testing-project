


import clamp from "../src/clamp"

/*
	Equivalence classes to test for all arguments:
		- NaN
		- zero
		- positive number
		- negative number
	
	Parameters are supplied according to pairwise combinations.

	As there are no internal libraries used the code we see uses 
	only basic size comparisons,
	negative and positive infinities are not considered to 
	be their own classes.

	NaN values are treated as zeros when supplied as upper or 
	lower according to the source code.

	Cases where lower > upper aren't defined in function spec and 
	they don't make sense in general, so these cases are ignored.
*/

const positive = 10.25;
const negative = -20.50;

describe("clamp", () => {
	test.each([
		[0, negative, positive, 0],
		[0, negative, negative, negative],
		[0, positive, positive, positive],
		[0, NaN, NaN, 0],
		[negative, negative, positive, negative],
		[negative, NaN, 0, 0],
		[negative, 0, 0, 0],
		[positive, NaN, 0, 0],
		[positive, 0, positive, positive],
		[positive, negative, NaN, 0],
		[NaN, 0, positive, NaN],
		[NaN, 0, NaN, NaN],
		[NaN, negative, 0, NaN],
		[0, 0, NaN, 0],
		[0, negative, 0, 0],
		[0, NaN, positive, 0],
	])("clamp(%d, %d, %d)", (number, lower, upper, expected) => {
		expect(clamp(number, lower, upper)).toStrictEqual(expected);
	});
})
