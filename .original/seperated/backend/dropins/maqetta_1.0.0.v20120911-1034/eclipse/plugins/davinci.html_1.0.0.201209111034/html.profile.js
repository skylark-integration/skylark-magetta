require({
	aliases:[
	    ["i18n", "dojo/i18n"]
	]
});

dependencies = {
	layers: [
		{
			name: "../maq-metadata-html/html/FieldsetInput.js",
			layerDependencies: [
			    "../dijit/dijit.js"
			],
			dependencies: [
				"maq-metadata-html/html/FieldsetInput"
			]
		}
	],

	prefixes: [
		[ "maq-metadata-html", "../maq-metadata-html" ],
		[ "maq-metadata-dojo", "../maq-metadata-dojo" ],
	   	[ "system", "../system" ],
	   	[ "preview", "../preview" ],
	   	[ "orion", "../orion" ],
	   	[ "davinci", "../davinci" ],
	   	[ "dijit", "../dijit" ],
	   	[ "dojox", "../dojox" ]
	]
}
