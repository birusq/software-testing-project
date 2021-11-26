


import toNumber from "../src/toNumber"

/*
	Valid values seem to include at least these:
		numbers
		strings of numbers:
			NaN
			Infinity
			integers
			scientific notation
			floats
			octals
			hexadecimals
			binary
			positive and negative versions of all above when applicable.

	Negative versions of octals, hexadecimals, and binary don't 
	seem to be supported, so they return NaN.

	These inputs are figured out from analysing branches of the 
	toNumber function.

	Additionally, imagination was used to figure out more elaborate inputs.

	The use case for logic inside "if (isObject(value))" branch is not 
	explained in documentation and is too difficult to figure out for mere
	mortals, so it remains untested.
*/




describe("toNumber", () => {
	test("base cases in function documentation", () => {
		expect(toNumber(3.2)).toStrictEqual(3.2)
		expect(toNumber(Number.MIN_VALUE)).toStrictEqual(5e-324)
		expect(toNumber(Infinity)).toStrictEqual(Infinity)
		expect(toNumber('3.2')).toStrictEqual(3.2)
	});

	test("numbers are returned back without modification", () => {
		expect(toNumber(15)).toStrictEqual(15);
	});

	describe("stringified numbers", () => {
		test("NaN", () => {
			expect(toNumber("NaN")).toBeNaN();
		})

		test("positive infinity", () => {
			expect(toNumber("Infinity")).toStrictEqual(Infinity);
		})

		test("negative infinity", () => {
			expect(toNumber("-Infinity")).toStrictEqual(-Infinity);
		})

		test("positive scientific notation", () => {
			expect(toNumber("1e3")).toStrictEqual(1000);
		})

		test("negative scientific notation", () => {
			expect(toNumber("-1e3")).toStrictEqual(-1000);
		})

		test("positive decimal", () => {
			expect(toNumber("1")).toStrictEqual(1);
			expect(toNumber("143")).toStrictEqual(143);
		})

		test("negative decimal", () => {
			expect(toNumber("-1")).toStrictEqual(-1);
			expect(toNumber("-143")).toStrictEqual(-143);
		})

		test("positive float", () => {
			expect(toNumber("1.1")).toStrictEqual(1.1);
			expect(toNumber("143.1")).toStrictEqual(143.1);
		})

		test("negative float", () => {
			expect(toNumber("-1.1")).toStrictEqual(-1.1);
			expect(toNumber("-143.1")).toStrictEqual(-143.1);
		})

		test("positive octal", () => {
			expect(toNumber("0o1")).toStrictEqual(1);
			expect(toNumber("0o143")).toStrictEqual(99);
		})

		test("negative octal", () => {
			expect(toNumber("-0o1")).toBeNaN();
			expect(toNumber("-0o143")).toBeNaN();
		})

		test("positive hex", () => {
			expect(toNumber("0x1")).toStrictEqual(1);
			expect(toNumber("0x63")).toStrictEqual(99);
		})

		test("negative hex", () => {
			expect(toNumber("-0x1")).toBeNaN();
			expect(toNumber("-0x63")).toBeNaN();
		})

		test("positive binary", () => {
			expect(toNumber("0b1")).toStrictEqual(1);
			expect(toNumber("0b1100011")).toStrictEqual(99);
		})

		test("negative binary", () => {
			expect(toNumber("-0b1")).toBeNaN();
			expect(toNumber("-0b1100011")).toBeNaN();
		})
	});

	test("null returns zero", () => {
		expect(toNumber(null)).toStrictEqual(0);
	});

	test("\"\" returns zero", () => {
		expect(toNumber("")).toStrictEqual(0);
	});

	test("false returns zero", () => {
		expect(toNumber(false)).toStrictEqual(0);
	});

	test("[] returns zero", () => {
		expect(toNumber([])).toStrictEqual(0);
	});

	test("Singleton array containing containing a convertable value returns it", () => {
		expect(toNumber(["1e3"])).toStrictEqual(1000);
	});

	test("clearly non numeric values return NaN", () => {
		expect(toNumber({})).toBeNaN();
		expect(toNumber(() => { })).toBeNaN();
		expect(toNumber(function () { })).toBeNaN()
		expect(toNumber(undefined)).toBeNaN();
	});

	test("symbols return NaN", () => {
		expect(toNumber(Symbol.iterator)).toBeNaN();
	});
});
