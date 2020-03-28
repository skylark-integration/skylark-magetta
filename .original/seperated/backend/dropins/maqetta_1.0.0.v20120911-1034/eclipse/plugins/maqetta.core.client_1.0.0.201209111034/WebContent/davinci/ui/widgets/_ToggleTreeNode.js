require({cache:{
'url:davinci/ui/widgets/templates/TreeNode.html':"<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"toggleNode\" class=\"dijitInline dvOutlineToggleNode dvOutlineVisibility dvOutlineVisibilityOn\" dojoAttachEvent=\"onclick:_onToggleClick\"></div\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow dijitInline\" role=\"presentation\"\n\t\t><div data-dojo-attach-point=\"indentNode\" class=\"dijitInline\"></div\n\t\t><img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"\n\t\t><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"\n\t\t></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"iconNode\" class=\"dijitIcon dijitTreeIcon\" role=\"presentation\"\n\t\t\t/><img src=\"${_blankGif}\" alt=\"\" class=\"treeReadOnlyLabelNode\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"labelNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n"}});
define("davinci/ui/widgets/_ToggleTreeNode", ["dojo/_base/declare",
        "dijit/Tree",
        "dojo/text!./templates/TreeNode.html"
],function(declare, Tree, treeNodeTemplate){

	return declare("davinci.ui.widgets._ToggleTreeNode", dijit._TreeNode, {
		_setLabelAttr: {node: "labelNode", type: "innerHTML"},

		postCreate: function(){
			this.inherited(arguments);
			
			if (this.tree.model.useRichTextLabel) {
				this.labelNode.innerHTML = this.label;
			}
	
			if(!this.tree.model.toggleMode || !this.shouldShowElement('toggleNode', this.item)) {
				dojo.addClass(this.toggleNode, "dijitHidden");
			} else {
				if (this.tree.model.isToggleOn(this.item)) {
					this._setToggleAttr(true);
				}
	 		}
			if (this.tree.model.postCreate) {
				this.tree.model.postCreate(this);
			}
		},
	
		shouldShowElement: function(elementId, item) {
			return this.tree.model.shouldShowElement && this.tree.model.shouldShowElement(elementId, item);
		}, 

		/// Add-on to support row 'checkbox', see http://bugs.dojotoolkit.org/ticket/7513
		toggle: false, // Boolean
	
		templateString: treeNodeTemplate,
	
		_onToggleClick: function(/*Event*/e){
			var result = this.tree.model.toggle(this.item, !this.toggle, this);
			if (result !== false) {
				this._setToggleAttr(!this.toggle);
			}
		},
	
		_setToggleAttr: function(/*Boolean?*/ on){
			// summary:
			//		Select a tree node related to passed item.
			//		WARNING: if model use multi-parented items or desired tree node isn't already loaded
			//		behavior is not granted. Use 'path' attr instead for full support.
			this.toggle = (on === undefined) ? !this.toggle : on;
			if (this.toggleNode) {
				dojo.toggleClass(this.toggleNode, "dvOutlineVisibilityOn", !on);
				dojo.toggleClass(this.toggleNode, "dvOutlineVisibilityOff", on);		
			}
			//TODO: keeping the state in the tree is probably the wrong approach if we need to respondto changes
			// in the data store. Perhaps it's better to keep this state either in the store or have the tree
			// query its nodes directly when asked for the list of toggled items.
			if(this.toggle){
				this.tree.toggledItems[this.item] = true;
			}else{
				delete this.tree.toggledItems[this.item];
			}
		},
	
		_getToggleAttr: function(){
			// summary:
			//		Return items related to toggled nodes.
			return this.toggle; // Boolean
		}
	});
});