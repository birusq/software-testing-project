import slice from "../src/slice"

/*
	Since the specification of slice.js is lacking, we'll expect
	it to behave in the same way as Array.slice.
	https://mdn.io/Array/slice
		If start is greater than the index range of the sequence,
		an empty array is returned.
		If end is greater than the length of the sequence,
		slice extracts through to the end of the sequence (arr.length).

	Different situations:
	array:
		empty, non-empty
	begin:
		default, 0, > 0, < 0, Array.length-1, Array.length,
		-Array.length, -Array.length-1
	end:
		default, 0, > 0, < 0, Array.length, Array.length+1
		-Array.length, -Array.length-1

	> 0 and < 0 situations need to be tested with 2 different values
	to cause differences between begin and end.
		We'll choose > 0 and < 0 values to be
			> 0: 1 and 4
			< 0: -2 and -4.

	Equivalence classes:
	begin: default, 0, 1, -2, 4, -4, arrlen-1, arrlen, -arrlen, -arrlen-1
	end  : default, 0, 1, -2, 4, -4, arrlen+1, arrlen, -arrlen, -arrlen-1

	begin can't be default if end isn't.
*/

describe("slice.test.js", () => {
	test("slice([])", () => {
		expect(slice([])).toStrictEqual([]);
	});

	test("slice([{p: 'kala'}, [false], 3], -3, 2)", () => {
		const result = slice([{p: 'kala'}, [false], 3], -3, 2);
		expect(result).toStrictEqual([{p: 'kala'}, [false]]);
	});

	const testArray = [1,2,3,4,5,6,7];

	const al = testArray.length;
	const alp = al+1;
	const alm = al-1;

	const testCases = [
		[0, 0, []],
		[0, 1, [1]],
		[0, -2, [1,2,3,4,5]],
		[0, 4, [1,2,3,4]],
		[0, -4, [1,2,3]],
		[0, al, testArray],
		[0, alp, testArray],
		[0, -al, []],
		[0, -alm, [1]],

		[1, 0, []],
		[1, 1, []],
		[1, -2, [2,3,4,5]],
		[1, 4, [2,3,4]],
		[1, -4, [2,3]],
		[1, al, [2,3,4,5,6,7]],
		[1, alp, [2,3,4,5,6,7]],
		[1, -al, []],
		[1, -alm, []],

		[-2, 0, []],
		[-2, 1, []],
		[-2, -2, []],
		[-2, 4, []],
		[-2, -4, []],
		[-2, al, [6,7]],
		[-2, alp, [6,7]],
		[-2, -al, []],
		[-2, -alm, []],

		[4, 0, []],
		[4, 1, []],
		[4, -2, [5]],
		[4, 4, []],
		[4, -4, []],
		[4, al, [5,6,7]],
		[4, alp, [5,6,7]],
		[4, -al, []],
		[4, -alm, []],

		[-4, 0, []],
		[-4, 1, []],
		[-4, -2, [4,5]],
		[-4, 4, [4]],
		[-4, -4, []],
		[-4, al, [4,5,6,7]],
		[-4, alp, [4,5,6,7]],
		[-4, -al, []],
		[-4, -alm, []],

		[alm, 0, []],
		[alm, 1, []],
		[alm, -2, []],
		[alm, 4, []],
		[alm, -4, []],
		[alm, al, [7]],
		[alm, alp, [7]],
		[alm, -al, []],
		[alm, -alm, []],

		[al, 0, []],
		[al, 1, []],
		[al, -2, []],
		[al, 4, []],
		[al, -4, []],
		[al, al, []],
		[al, alp, []],
		[al, -al, []],
		[al, -alm, []],

		[-al, 0, []],
		[-al, 1, [1]],
		[-al, -2, [1,2,3,4,5]],
		[-al, 4, [1,2,3,4]],
		[-al, -4, [1,2,3]],
		[-al, al, testArray],
		[-al, alp, testArray],
		[-al, -al, []],
		[-al, -alm, [1]],

		[-alm, 0, []],
		[-alm, 1, []],
		[-alm, -2, [2,3,4,5]],
		[-alm, 4, [2,3,4]],
		[-alm, -4, [2,3]],
		[-alm, al, [2,3,4,5,6,7]],
		[-alm, alp, [2,3,4,5,6,7]],
		[-alm, -al, []],
		[-alm, -alm, []]
	];

	test.each(testCases)("slice(testArray, %p, %p) == %p",
			(begin, end, result) => {
		const slicedArray = slice(testArray, begin, end);
		expect(slicedArray).toStrictEqual(result);
	});


	const defaultTestCases = [
		[0, testArray],
		[1, [2,3,4,5,6,7]],
		[-2, [6,7]],
		[4, [5,6,7]],
		[-4, [4,5,6,7]],
		[alm, [7]],
		[al, []],
		[-al, testArray],
		[-alm, [2,3,4,5,6,7]]
	];

	test("slice(testArray) == testArray", () => {
		expect(slice(testArray)).toStrictEqual(testArray);
	});
	test.each(defaultTestCases)("slice(testArray, %p) == %p",
			(begin, result) => {
		expect(slice(testArray, begin)).toStrictEqual(result);
	});


	// test defaults here, separately

});

