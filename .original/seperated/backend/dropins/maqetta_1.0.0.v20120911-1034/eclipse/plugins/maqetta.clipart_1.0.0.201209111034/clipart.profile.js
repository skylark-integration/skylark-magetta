require({
	aliases:[
	    ["i18n", "dojo/i18n"]
	]
});

dependencies = {
	layers: [
		{
			name: "../clipart/_clipart.js",
			layerDependencies: [
			    "../dijit/dijit.js"
			],
			dependencies: [
				"clipart/_clipart"
			]
		},
		{
			name: "../maq-metadata-clipart/clipart/_DeviceClipartHelper.js",
			layerDependencies: [
			    "../dijit/dijit.js"
			],
			dependencies: [
				"maq-metadata-clipart/clipart/_DeviceClipartHelper"
			]
		}
	],

	prefixes: [
		[ "clipart", "../clipart" ],
		[ "maq-metadata-clipart", "../maq-metadata-clipart" ],
		[ "maq-metadata-dojo", "../maq-metadata-dojo" ],
	   	[ "system", "../system" ],
	   	[ "preview", "../preview" ],
	   	[ "orion", "../orion" ],
	   	[ "davinci", "../davinci" ],
	   	[ "dijit", "../dijit" ],
	   	[ "dojox", "../dojox" ]
	]
}
