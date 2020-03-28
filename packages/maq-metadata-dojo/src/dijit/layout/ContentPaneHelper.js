define("maq-metadata-dojo/dijit/layout/ContentPaneHelper", [
	"dojo/i18n!../nls/dijit"
], function(dijitNls) {

var ContentPaneHelper = function() {};
ContentPaneHelper.prototype = {
		//TODO: this doesnt seem necessary, and seems to cause problems		
//		destroy: function(/*Widget*/ widget){
//			// summary:
//			//		Overriden to remove child widgets the user created in the Dojo Composition Tool.
//			//
//			if(!widget){
//				return;
//			}
//			widget=widget.dijitWidget;
//			
//			// destroy children either embedded or loaded anyway
//			var containerNode = (widget.containerNode || widget.domNode);
//			dojo.forEach(dojo.query("[widgetId]", containerNode).map(davinci.ve.widget.byNode), function(w){
//				w.destroy();
//			});
//			widget.destroy();
//		},
		create: function(widget, srcElement){
			//
			// RadioGroupSlide in particular needs the contentPanes to have a background for the sliding to look right
			//
			var parent = widget.getParent();
			if (parent && (parent.type == "dojox.layout.RadioGroup" || parent.type == "dojox.layout.RadioGroupSlide" || parent.type == "dojox.layout.RadioGroupFade")){
				if (!widget.getStyle().match("background")){
					widget.setStyleValues({background: "white"});
				}
			}
		},

		getContainerNode: function(/*Widget*/ widget){
			// summary:
			//		Overriden to only return the container node if this is not a href ContentPane
			//
			if(!widget){
				return undefined;
			}
			widget = widget.dijitWidget;

			// FIXME: should use davinci.ve.widget.getProperty(widget, "href") to get the href?
			if(widget.href){
				return undefined;
			}
			return widget.containerNode || widget.domNode;
		},

		getWidgetDescriptor: function(widget) {
			var text = "";

			var region = widget.attr("region");
			if (region) {
				if (text.length > 0) {
					text += " ";
				}

				text+= dojo.replace(dijitNls.paneRegion, [region])
			}

			return text;
		}
	};

return ContentPaneHelper;

});