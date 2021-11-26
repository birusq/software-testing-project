import divide from "../src/divide"

/*
	Different situations:
	Floating point inaccuracies will be skipped.
	integer vs decimal number values
	even though the data type should be Number.
	division by the number itself
	inputs:
		numerator:
			positive numbers,
			negative numbers,
			numbers between abs(]0, 1[),
			0 and 1
		denominator:
			-,-
	outputs:
		quotient:
			-,-

*/

describe("divide.test.js", () => {
	test("+int / +int = +float", () => {
		expect(divide(6,4)).toStrictEqual(1.5);
	});
	test("-int / +int = -float", () => {
		expect(divide(-2, 4)).toStrictEqual(-0.5);
	});
	test("+smallFloat / -smallFloat", () => {
		expect(divide(0.25, -0.125)).toStrictEqual(-2);
	});
	test("-float / -smallFloat", () => {
		expect(divide(402.7, 0.222)).toStrictEqual(1814);
	});
	test("+float / 0", () => {
		expect(divide(1.237, 0)).toStrictEqual(Infinity);
	});
	test("-int / -0", () => {
		expect(divide(-3333, -0.0)).toStrictEqual(-Infinity);
	});
	test("0 / 0", () => {
		expect(divide(0, 0)).toBeNaN();
	});
	test("Division by itself", () => {
		expect(divide(-1.3333, -1.3333)).toStrictEqual(1);
	});
})
