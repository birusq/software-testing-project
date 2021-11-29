import compact from "../src/compact"
/*
	Equivalence classes:
		array with 0, 1, or 1+ falsy and non-falsy values	
	
	According to function documentation:
		falsy values: `false`, `null`, `0`, `""`, `undefined`, and `NaN`
		non-falsy values: everything else

	It is not feasible to test with all truthy values, 
	but the trythyness check in the code seems simple enough that 
	testing with a few example values should be sufficient.
*/

const falsyValues = [false, null, 0, "", undefined, NaN];

describe("compact.test.js", () => {
	test("base case from documentation", () => {
		expect(compact([0, 1, false, 2, '', 3])).toStrictEqual([1, 2, 3]);
	})

	test("empty array results in empty array", () => {
		expect(compact([])).toStrictEqual([]);
	})

	test("all falsy values get filtered out", () => {
		expect(compact(falsyValues)).toStrictEqual([]);
	})

	test("array with one falsy value gets filtered out", () => {
		expect(compact([false])).toStrictEqual([]);
	})

	test("array with one truthy value doesn't get filtered out", () => {
		expect(compact([1])).toStrictEqual([1]);
	})

	test("array with multiple truthy values is returned back", () => {
		const testArr = new Array(5).fill(1);
		expect(compact(testArr)).toStrictEqual(testArr);
	})
});