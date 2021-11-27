import get from "../src/get"
import {object, arrayObject, objectMess} from "./jsobjects.js"


/*
	Different situations:
	{}
	{}.value
	{}["value"]
	[]
	[i]
	['i']
	["hevonen"]
	over-indexing
	under-indexing
	nesting
	different value (data) types
*/
describe("get.test.js", () => {
	// const defaultValue = null;

	test("get(object, 'level1String') i.e. object.stringValue", () => {
		expect(get(object, "level1String")).toStrictEqual("yksi");
	});

	test("get(object, 'level1Object.itWorks')", () => {
		expect(get(object, "level1Object.itWorks")).toStrictEqual(false);
	});

	test("get(objectMess, 'mess1.mess2.mess3.mess4.value')", () => {
		expect(get(objectMess, 'mess1.mess2.mess3.mess4.value')).
				toStrictEqual("it works");
	});

	test("get(objectMess, \"mess1['mess2']['mess3'].mess4.value\")", () => {
		expect(get(objectMess, "mess1['mess2']['mess3'].mess4.value")).
			toStrictEqual("it works");
	});

	test("get(object, '') returns undefined", () => {
		expect(get(object)).toBeUndefined();
	});

	test("get(objectMess, ``, null) returns null", () => {
		expect(get(objectMess, ``, null)).toBeNull();
	});

	test("get(object, directObjectChildrenAsArray, null)", () => {
		expect(get(object, Object.keys(object), null)).toBeNull();
	});

	test("get(arrayObject, \"0['0']\", null)", () => {
		expect(get(arrayObject, "0['0']", null)).toStrictEqual([false]);
	});

	test("get(arrayObject, \"0['hevonen']\")", () => {
		expect(get(arrayObject, "0['hevonen']")).toBeUndefined();
	});

	test("get(object, ['level1Array', '5', 'level3Object'," +
			" 'number'], null)", () => {
		expect(get(object, ['level1Array', '5', 'level3Object', 'number'],
				null)).toStrictEqual(42.3);
	});

	test("get(object, NaN, [[[{p: \"p\"}]]])", () => {
		expect(get(object, NaN, [[[{p: "p"}]]])).
				toStrictEqual([[[{p: "p"}]]]);
	});

	const maxDeep = ("level1Array[5].level3Object[\"kammotus\"]['0'][1][1]");
	
	test("get(object, maxDeep0, 37)", () => {
		const maxDeep0 = maxDeep + ("[0]['0']['mess1']['mess2']['mess3']." +
				"mess4.value]");
		expect(get(object, maxDeep0, 37)).toStrictEqual("it works");
	});

	test("get(object, maxDeep1, [[[{p: \"p\"}]]])", () => {
		const maxDeep1 = maxDeep + "[1].mess.mess1.mess2.mess3['mess4']";
		expect(get(object, maxDeep1, [[[{p: "p"}]]])).toStrictEqual(
			{
				value: "it works"
			}
		);
	});

	test("get(null, 'p', NaN", () => {
		expect(get(null, 'p', NaN)).toBeNaN();
	});

	test("get(['hölmöilyä?'], ['0', '4'], null)", () => {
		expect(get(['hölmöilyä?'], ['0', '4'], null)).toStrictEqual('ö');
	});
});

