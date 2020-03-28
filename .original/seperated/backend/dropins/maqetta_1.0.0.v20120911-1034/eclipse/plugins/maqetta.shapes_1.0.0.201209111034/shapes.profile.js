require({
	aliases:[
	    ["i18n", "dojo/i18n"]
	]
});

dependencies = {
	layers: [
		{
			name: "../shapes/_CircleMixin.js",
			layerDependencies: [
			    "../dijit/dijit.js"
			],
			dependencies: [
				"shapes/_CircleMixin"
			]
		},
		{
			name: "../maq-metadata-shapes/shapes/_ShapeHelper.js",
			layerDependencies: [
			    "../dijit/dijit.js"
			],
			dependencies: [
				"maq-metadata-shapes/shapes/_ShapeHelper"
			]
		}
	],

	prefixes: [
		[ "shapes", "../shapes" ],
		[ "maq-metadata-shapes", "../maq-metadata-shapes" ],
		[ "maq-metadata-dojo", "../maq-metadata-dojo" ],
	   	[ "system", "../system" ],
	   	[ "preview", "../preview" ],
	   	[ "orion", "../orion" ],
	   	[ "davinci", "../davinci" ],
	   	[ "dijit", "../dijit" ],
	   	[ "dojox", "../dojox" ]
	]
}
