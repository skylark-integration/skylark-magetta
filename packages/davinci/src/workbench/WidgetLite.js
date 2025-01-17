define("davinci/workbench/WidgetLite", [
	"dojo/_base/declare",
    "dijit/_WidgetBase",
	"dojo/parser"
], function(declare, WidgetBase, parser) {

return declare("davinci.workbench.WidgetLite", [WidgetBase], {
	
	/* super lite weight templated widget constructed programmatically */
	
	buildRendering: function(){
		if(!this.domNode){
			this.domNode = dojo.create("div");
		}
		
		if(/dojotype/i.test(this.domNode.innerHTML || "")){
			// Make sure dojoType is used for parsing widgets in template.
			// The dojo.parser.query could be changed from multiversion support.
			var qry, attr;
			if(parser._query != "[dojoType]"){
				qry = parser._query;
				attr = parser._attrName;
				parser._query = "[dojoType]";
				parser._attrName = "dojoType";
			}

			// Store widgets that we need to start at a later point in time
			this._startupWidgets = dojo.parser.parse(this.domNode, {
				noStart: !this._earlyTemplatedStartup,
				inherited: {dir: this.dir, lang: this.lang}
			});

			// Restore the query.
			if(qry){
				parser._query = qry;
				parser._attrName = attr;
			}

		}
	},

	_destroyContent: function(){
		
		var containerNode = (this.containerNode || this.domNode);
		dojo.forEach(dojo.query("[widgetId]", containerNode).map(dijit.byNode), function(w){
			w.destroy();
		});
		while(containerNode.firstChild){
			dojo._destroyElement(containerNode.firstChild);
		}
		dojo.forEach(this._tooltips, function(t){
			t.destroy();
		});
		delete this._tooltips;
	},

	startup: function(){
		dojo.forEach(this._startupWidgets, function(w){
			if(w && !w._started && w.startup){
				w.startup();
			}
		});
		this.inherited(arguments);
	}
});
});
