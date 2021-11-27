const objectMess = {
	mess1: {
		mess2: {
			mess3: {
				mess4: {
					value: "it works",
				},
			},
		},
	},
};
const arrayObject = [
	[
		[false],
		[
			["maybe"],
			[
				[objectMess],
				{
					mess: objectMess,
				},
			],
		],
	],
];
const object = {
	level1String: "yksi",
	level1Array: [
		undefined,
		3,
		false,
		"peanuts",
		[null, NaN],
		{
			level3Object: {
				number: 42.3,
				kammotus: arrayObject,
			},
		},
	],
	level1Object: {
		itWorks: false,
		kammotus: arrayObject,
	},
};

export {object, arrayObject, objectMess}
