import ceil from "../src/ceil"


/*
	Different situations for numbers r and p:
	r: +I, -I, +f, -f, 0 (	and "> 0.5", "< 0.5", "0.5")
	precision P: -, +I, -I, 0

	The situation where r > the number of digits in p etc.

*/
describe("ceil.test.js", () => {
	const rPosI = 11212;
	const rNegI = -3321;
	const rPosF = 0.3323323;
	const rPosF_E = 1;	//	ceil(rPosF)
	const rNegF = -22.225;
	const rNegF_E = -22;	//	ceil(rNegF)

	{
		const testCases = [
			[rPosI, rPosI],
			[rNegI, rNegI],
			[rPosF, rPosF_E],
			[rNegF, rNegF_E],
			[0, 0]
		];

		test.each(testCases)("ceil(%p) == %p", (r, expected) => {
			expect(ceil(r)).toStrictEqual(expected);
		});
	}

	const pPosI = 2;
	const pNegI = -3;
	const pPosLarge = 7;
	const pNegLarge = -6;

	const testCases = [
		[rPosI, pPosI, rPosI],
		[rPosI, pNegI, 12000],
		[rPosI, 0, rPosI],
		[rPosI, pPosLarge, rPosI],
		[rPosI, pNegLarge, 1000000],
		[rNegI, pPosI, rNegI],
		[rNegI, pNegI, -3000],
		[rNegI, 0, rNegI],
		[rNegI, pPosLarge, rNegI],
		[rNegI, pNegLarge, 0],
		[rPosF, pPosI, 0.34],
		[rPosF, pNegI, 1000],
		[rPosF, 0, rPosF_E],
		[rPosF, pPosLarge, rPosF],
		[rPosF, pNegLarge, 1000000],
		[rNegF, pPosI, -22.22],
		[rNegF, pNegI, 0],
		[rNegF, 0, rNegF_E],
		[rNegF, pPosLarge, rNegF],
		[rNegF, pNegLarge, 0],
		[0, pPosI, 0],
		[0, pNegI, 0],
		[0, 0, 0],
		[0, pPosLarge, 0],
		[0, pNegLarge, 0]
	];

	test.each(testCases)("ceil(%p, %p) == %p", (r, p, expected) => {
		expect(ceil(r, p)).toStrictEqual(expected);
	});
});

