import memoize from "../src/memoize"
/*
	Equivalence classes of input don't seem to be that important
	because they are just functions that we call ourselves.

	The test cases are formed based on the functionality defined in
	function documentation. Additional test are added based on 
	branches that are not reached.
*/

const object = { 'a': 1, 'b': 2 }

test("throws TypeError when 1st arg is not a function", () => {
	expect(() => memoize(false)).toThrow(TypeError);
});

test("throws TypeError when 2nd arg is not a function", () => {
	expect(() => memoize(() => { }, false)).toThrow(TypeError);
});


test("function returns the same values after memoization", () => {
	const memoizedValues = memoize(Object.values);
	expect(memoizedValues(object)).toStrictEqual([1, 2]);
});

test("memoized function stores the results of the function in cache", () => {
	const memoizedValues = memoize(Object.values);
	const result = memoizedValues(object);
	expect(memoizedValues.cache.get(object)).toStrictEqual(result);
});

test("memoized function uses cache if possible", () => {
	const memoizedValues = memoize(Object.values);
	memoizedValues.cache.set(object, "memoized result");
	expect(memoizedValues(object)).toStrictEqual("memoized result");
});

test("when memoize.Cache is not set (falsy), a Map is used", () => {
	const original = memoize.Cache;

	memoize.Cache = undefined;
	const values = memoize(Object.values);
	expect(values.cache).toBeInstanceOf(Map);

	memoize.Cache = original; // reset to not break other tests
});

test("when memoize.Cache is set it is used as a cache", () => {
	const original = memoize.Cache;

	memoize.Cache = WeakMap;
	const values = memoize(Object.values);
	expect(values.cache).toBeInstanceOf(WeakMap);

	memoize.Cache = original; // reset to not break other tests
});

test("if cache.set returns a falsy value when saving new function results" +
	" (set fails), cache is reset to the last value", () => {
		const values = memoize(Object.values);
		const myCache = new Map([["myKey", "myValue"]])

		// Redefine cache.set to simulate a failed set
		values.cache.set = () => {
			values.cache = myCache; // erroneous assignment that should get ignored
			return undefined; // return undefined as our set failed
		}

		values(object)
		expect(values.cache.get("myKey")).toBeUndefined();
	});

describe("handling of multiple arguments", () => {
	const testConcat = (a, b) => a + b;
	const testResolver = (...args) => args.join(",");

	test("cache key is only the first argument by default", () => {
		const memoizedConcat = memoize(testConcat);
		memoizedConcat("a", "b");
		expect(memoizedConcat.cache.get("a")).toStrictEqual("ab");
	});

	test("uses resolver for generating cache key when supplied", () => {
		const memoizedConcat = memoize(testConcat, testResolver);
		memoizedConcat("a", "b");
		expect(memoizedConcat.cache.get("a,b")).toStrictEqual("ab");
	});
});
