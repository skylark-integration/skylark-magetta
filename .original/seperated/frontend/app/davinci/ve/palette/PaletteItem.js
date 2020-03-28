define("davinci/ve/palette/PaletteItem", [
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"davinci/ve/tools/CreateTool",
	"davinci/ui/dnd/DragManager",
	"davinci/ve/utils/GeomUtils",
	"davinci/ve/metadata"
], function(
	declare,
	_WidgetBase,
	CreateTool,
	DragManager,
	GeomUtils,
	Metadata
){

return declare("davinci.ve.palette.PaletteItem", _WidgetBase,{

	icon: "",
	displayName: "",
	name: "",
	paletteId: "",
	type: "",
	data: null,
	tool: "",
	palette: null,
	category: "",

	buildRendering: function(){
		this.palette = dijit.byId(this.paletteId);
		var div = this.domNode = this.palette.itemTemplate.cloneNode(true);
		var a = div.firstChild;
		dojo.attr(a, "tabIndex", "0");
		a.onclick = this.palette.nop; // to avoid firing the onbeforeunload event (dojo.event.connect doesn't work for this purpose)
		var img = a.firstChild;

		img.src = this.icon;
		a.appendChild(dojo.doc.createTextNode(this.displayName));
		dojo.create('span', { className: 'maqWidgetsCategory' }, a).textContent = this.category;

		this.domNode.componentClassName = this.name; // ex. "davinci.ve.widget.Hello"
		dojo.setSelectable(this.domNode, false);
	},

	postCreate: function(){
		this.connect(this.domNode, "onmouseover", "itemMouseOverHandler");
		this.connect(this.domNode, "onmouseout", "itemMouseOutHandler");
		this.connect(this.domNode, "onmousedown", "itemMouseDownHandler");
		this.connect(this.domNode, "onmouseup", "itemMouseUpHandler");
		this.connect(this.domNode, "onkeydown", "itemKeyDownHandler");
	},
	
	startup: function(){
	},
	
	isFocusable: function(){
		return dojo.style(this.domNode, "display") != "none";
	},
	
	focus: function(){
		dijit.focus(this.domNode);
	},

/*FIXME: Doesn't seem to be ever used. Commenting out for now. Probably should just delete this.
	deselect: function(){
		this.flat(this.domNode);
		this.palette.selectedItem = null;
	},
*/

	itemMouseOverHandler: function(e){
		var div = this.domNode;
		if(this.palette.selectedItem == this){
			;
		}else{
			this.raised(div);
		}
	},

	itemMouseOutHandler: function(e){
		var div = this.domNode;
		if(this.palette.selectedItem == this){
			this.sunken(div);
		}else{
			this.flat(div);
		}
		if(this.tooltip){
			this.tooltip.close();
		}
	},

	itemMouseDownHandler: function(e){
		var div = this.domNode;
		this.focus();
		this.sunken(div);
		if(this.palette.selectedItem && this.palette.selectedItem != this){
			this.flat(this.palette.selectedItem.domNode);
			this.palette.selectedItem = null;
			this.palette.currentItem = null;
		}
		// Sole apparent purpose for pushedItem is to remember the item which
		// received the mousedown event so that CSS styling can be adjusted
		// if mouseup on same item as received the mousedown
		this.palette.pushedItem = this;
			
		DragManager.document = this.palette._context.getDocument();
		var frameNode = this.palette._context.frameNode;
		if(frameNode){
			var coords = dojo.coords(frameNode);
			var containerNode = this.palette._context.getContainerNode();
			DragManager.documentX = coords.x - GeomUtils.getScrollLeft(containerNode);
			DragManager.documentY = coords.y - GeomUtils.getScrollTop(containerNode);
		}

		// pre-fetch helper to warm the cache
		Metadata.getHelper(this.type, 'helper');
	},

	/**
	 * Invoked when user clicks on a widget entry (but not to perform drag/drop).
	 * @param {Event} e
	 */
	itemMouseUpHandler: function(e){
		if(this.palette.pushedItem != this){
			this.palette.pushedItem = null;
			var div = this.domNode;
			this.raised(div);
			return;
		}
		if(this.palette.selectedItem == this){
			var div = this.domNode;
			this.raised(div);
			this.palette.selectedItem = null;
			this.palette.currentItem = this;
			this.palette._context.setActiveTool(null);
			return;
		}
		this.palette.selectedItem = this;
		this.palette.pushedItem = null;
		
		// currentItem holds which widget has been clicked on
		// and which might be subsequently added to canvas by clicking on canvas
		this.palette.currentItem = this;

		Metadata.getHelper(this.type, 'tool').then(function(ToolCtor) {
			var tool = new (ToolCtor || CreateTool)(dojo.clone(this.data));
			this.palette._context.setActiveTool(tool);
		}.bind(this));

		var clearItem = function(){
			if(this.palette._contextMouseUpHandler){
				this.disconnect(this.palette._contextMouseUpHandler);
				this.palette._contextMouseUpHandler = null;
			}
			if(this.palette._docMouseUpHandler){
				dojo.disconnect(this.palette._docMouseUpHandler);
				this.palette._docMouseUpHandler = null;
			}
			this.palette.selectedItem = null;
			this.palette.currentItem = null;
			this.flat(this.domNode);
			this.palette._context.dragMoveCleanup();
		}.bind(this);
		
		// Register mouseup handler on user's doc
		this.palette._contextMouseUpHandler = this.connect(this.palette._context, "onMouseUp", function(e){
			clearItem();
		}.bind(this));
		
		// Register mouseup handler on entire Maqetta application
		// Put the doc-level mouseUp handler in setTimeout so that
		// the current mouseup event (this routine) doesn't trigger
		// the doc-level mouseup handler on the very same event.
		setTimeout(function(){
			// If currentItem has a value and user clicked anywhere in Maq app,
			// then turn off everything registered to happen on currentItem.
			this.palette._docMouseUpHandler = dojo.connect(document, "onmouseup", function(e){
				if(this.palette.currentItem){
					clearItem();
					this.palette._context.setActiveTool(null);
				}
			}.bind(this));
		}.bind(this), 0);
	},
	
	/**
	 * Invoked when travelling widget list using arrow keys.
	 * @param {Event} e
	 */
	itemKeyDownHandler: function(e){
		if(e.keyCode != dojo.keys.ENTER){return;}
		if(this.palette.selectedItem){
			this.flat(this.palette.selectedItem.domNode);
			this.palette.selectedItem = null;
		}
		Metadata.getHelper(this.type, 'tool').then(function(ToolCtor) {
			var tool = new (ToolCtor || CreateTool)(dojo.clone(this.data)),
				context = this.palette._context;
			context.setActiveTool(tool);
			tool.create({target: context.getSelection()[0], position: {x:50, y:50}});
			context.setActiveTool(null);			
			context.getContainerNode().focus();  // to enable moving with arrow keys immediately
		});

		// pre-fetch helper
		Metadata.getHelper(this.type, 'helper');
	},

	// sunken => styling for selected items
	// raised => styling for items under mouse but not selected
	// flat => items which are both not selected and not under mouse
	flat: function(div){
		dojo.removeClass(div, "dojoyPaletteItemRaised");
		dojo.removeClass(div, "dojoyPaletteItemSunken");
		dojo.addClass(div, "dojoyPaletteItemFlat");
	},

	raised: function(div){
		dojo.removeClass(div, "dojoyPaletteItemFlat");
		dojo.removeClass(div, "dojoyPaletteItemSunken");
		dojo.addClass(div, "dojoyPaletteItemRaised");
	},

	sunken: function(div){
		dojo.removeClass(div, "dojoyPaletteItemFlat");
		dojo.removeClass(div, "dojoyPaletteItemRaised");
		dojo.addClass(div, "dojoyPaletteItemSunken");
	}
});
});
