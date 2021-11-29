import countBy from "../src/countBy"
/*
	Equivalence classes:
		collection (first argument):
			zero length array,
			one length array,
			large array,
			zero length object,
			one length object,
			large object,
		iteratee (second argument):
			function that returns a value

	We should check that no matter what the iteratee function returns,
	it will get properly stringified and added to the result object.
	It is possible that e.g. falsy values or objects are improperly stringified.
*/

const users = [
	{ 'user': 'barney', 'active': true },
	{ 'user': 'betty', 'active': true },
	{ 'user': 'fred', 'active': false }
]

test("base case from function documentation", () => {
	expect(countBy(users, value => value.active)).toStrictEqual({ 'true': 2, 'false': 1 });
});

test("zero length array results in an empty result", () => {
	expect(countBy([], () => true)).toStrictEqual({});
});

test("zero length object results in an empty result", () => {
	expect(countBy([], () => true)).toStrictEqual({});
});

test("array with length one => result with value 1", () => {
	expect(countBy({ x: "test" }, prop => prop)).toStrictEqual({ test: 1 });
});

test("object with length one => result with value 1", () => {
	expect(countBy([{ x: "test" }], o => o.x)).toStrictEqual({ test: 1 });
});

test("array with length X => result with value X", () => {
	const X = 10;
	const testArr = new Array(X).fill({ x: "test" });
	expect(countBy(testArr, o => o.x)).toStrictEqual({ test: X });
});

test("object with length X => result with value X", () => {
	const X = 10
	let testObj = {}
	for (let n = 0; n < X; ++n) {
		testObj["key" + n] = "test";
	}
	expect(countBy(testObj, prop => prop)).toStrictEqual({ test: X });
});


describe("unexpected values get stringified properly as keys", () => {
	test("undefined", () => {
		expect(Object.keys(countBy([undefined], prop => prop))).toStrictEqual(["undefined"])
	});

	test("NaN", () => {
		expect(Object.keys(countBy([NaN], prop => prop))).toStrictEqual(["NaN"])
	});

	test("{}", () => {
		expect(Object.keys(countBy([{}], prop => prop))).toStrictEqual(["[object Object]"])
	});
});