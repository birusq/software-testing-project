import at from "../src/at"


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
describe("at.test.js", () => {
	const objectMess = {
		mess1: {
			mess2: {
				mess3: {
					mess4: {
						value: "it works"
					}
				}
			}
		}
	}
	const arrayObject = [
		[
			[false],
			[
				[
					"maybe"
				],
				[
					[
						objectMess
					],
					{
						mess: objectMess
					}
				]
			]
		],
	];
	const object = {
		level1String: "yksi",
		level1Array: [
			undefined,
			3,
			false,
			"peanuts",
			[
				null,
				NaN
			],
			{
				level3Object: {
					number: 42.3,
					kammotus: arrayObject
				}
			}
		],
		level1Object: {
			itWorks: false,
			kammotus: arrayObject
		}
	};

	test("at(object, 'level1String') i.e. object.stringValue", () => {
		expect(at(object, "level1String")).toStrictEqual(["yksi"]);
	});

	test("at(object, 'level1Object.itWorks')", () => {
		expect(at(object, "level1Object.itWorks")).toStrictEqual([false]);
	});

	test("at(objectMess, 'mess1.mess2.mess3.mess4.value')", () => {
		expect(at(objectMess, 'mess1.mess2.mess3.mess4.value')).
				toStrictEqual(["it works"]);
	});

	test("at(objectMess, \"mess1['mess2']['mess3'].mess4.value\")", () => {
		expect(at(objectMess, "mess1['mess2']['mess3'].mess4.value")).
			toStrictEqual(["it works"]);
	});

	test("at(object) returns []", () => {
		expect(at(object)).toStrictEqual([]);
	});

	test("at(object, directObjectChildrenAsArray)", () => {
		expect(at(object, Object.keys(object))).toStrictEqual(
				Object.values(object));
	});

	test("at(object, 'level1Array[0]', 'level1Array[1]'," +
			" 'level1Array[2]', 'level1Array[3]')", () => {
		const values = at(object, 'level1Array[0]', 'level1Array[1]',
				'level1Array[2]', 'level1Array[3]');
		const expectedValues = [
			undefined,
			3,
			false,
			"peanuts"
		];
		expect(values).toStrictEqual(expectedValues);
	});

	test("at(arrayObject, \"0['0']\")", () => {
		expect(at(arrayObject, "0['0']")).toStrictEqual([[false]]);
	});

	test("at(arrayObject, \"0['hevonen']\")", () => {
		expect(at(arrayObject, "0['hevonen']")).toStrictEqual([undefined]);
	});

	test("at(object, [maxDeep0, maxDeep1])", () => {
		const maxDeep = ("level1Array[5].level3Object[\"kammotus\"]" +
				"['0'][1][1]")
		const maxDeep0 = maxDeep + ("[0]['0']['mess1']['mess2']['mess3']." +
				"mess4.value]");
		const maxDeep1 = maxDeep + "[1].mess.mess1.mess2.mess3['mess4']";

		expect(at(object, [maxDeep0, maxDeep1])).toStrictEqual([
			"it works",
			{
				value: "it works"
			}
		]);
	});
});

