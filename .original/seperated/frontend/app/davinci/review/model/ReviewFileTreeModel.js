define("davinci/review/model/ReviewFileTreeModel", [
	    "dojo/_base/declare",
], function(declare){
	
return declare("davinci.review.model.ReviewFileTreeModel", null, {

	foldersOnly : false,

	constructor: function(args) {
		this.root=args && args.root;
		//this.subscription=dojo.subscribe("/davinci/resource/resourceChanged",this,this.resourceChanged);
		this.foldersOnly=args && args.foldersOnly;
	},

	destroy: function() {
		dojo.unsubscribe(this.subscription);
	},

	// =======================================================================
	// Methods for traversing hierarchy

	getRoot: function(onItem) {
		onItem(this.root);
	},

	mayHaveChildren: function(/*dojo.data.Item*/ item) {
		return item.elementType == "Folder";
	},

	getChildren: function(/*dojo.data.Item*/ parentItem, /*function(items)*/ onComplete) {
		if (!this.foldersOnly) {
			parentItem.getChildren(onComplete, true); // need to make the call sync, chrome is to fast for async
		} else {
			parentItem.getChildren(function (items) {
				var children = items.filter(function(item){
					return item.elementType == "Folder";
				});
				onComplete(children);
			});
		}

	},

	// =======================================================================
	// Inspecting items

	getIdentity: function(/* item */ item) {
		return item.getPath();
	},

	getLabel: function(/*dojo.data.Item*/ item) {
		var label=item.getName();
		if (item.link) { 
			label=label+'  ['+item.link+']';
		}
		return label;
	},

	resourceChanged: function(type,changedResource) {
		if (type == 'created' || type == 'deleted') {
			var parent = changedResource.parent;
			parent.getChildren(function(children) { this.onChildrenChange(parent, children); }.bind(this));
		}
	},

	newItem: function(/* Object? */ args, /*Item?*/ parent) {
	},

	pasteItem: function(/*Item*/ childItem, /*Item*/ oldParentItem, /*Item*/ newParentItem, /*Boolean*/ bCopy) {
	},


	onChange: function(/*dojo.data.Item*/ item) {
	},

	onChildrenChange: function(/*dojo.data.Item*/ parent, /*dojo.data.Item[]*/ newChildrenList) {
	}

});
});

