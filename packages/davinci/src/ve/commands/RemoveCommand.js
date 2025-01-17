define("davinci/ve/commands/RemoveCommand", [
    	"dojo/_base/declare",
    	"davinci/ve/widget",
    	"davinci/ve/States"
], function(declare, Widget, States){


return declare("davinci.ve.commands.RemoveCommand", null, {

	name: "remove",

	constructor: function(widget){
		this._id = (widget ? widget.id : undefined);
	},

	execute: function(){
		if(!this._id){
			return;
		}
		var widget = Widget.byId(this._id);
		if(!widget){
			return;
		}
		var context = widget.getContext(),
			parent = widget.getParent() || context.getContainerNode();
		var onRemoveCallback;
		var helper = widget.getHelper();
		if(helper && helper.onRemove){
			// onRemove helper optionally returns a function to call after delete remove command
			// has finished the removal.
			onRemoveCallback = helper.onRemove(widget);
		}

		if(!this._data){
			this._index = dojo.indexOf(parent.getChildren(), widget);
			if(this._index < 0){
				return;
			}
			this._data = widget.getData();
			this._parentId = parent.id;
		}
		this._data.context=context;

		if(context){
			context.detach(widget);
		}

		parent.removeChild( widget);

		// make sure we call right after it was removed but before being destroyed
		if(context){
			context.widgetChanged(context.WIDGET_REMOVED, widget);
		}

		widget.destroyWidget();
		if(context){
			context.widgetAddedOrDeleted();
		}
		
		// Recompute styling properties in case we aren't in Normal state
		States.resetState(widget.domNode);
		
		if(onRemoveCallback){
			onRemoveCallback();
		}
	},

	undo: function(){
		if(!this._data || !this._parentId){
			return;
		}
		var parent = Widget.byId(this._parentId);
		if(!parent){
			return;
		}
		var widget = Widget.createWidget(this._data);
		if(!widget){
			return;
		}

		parent.addChild(  widget, this._index);
		var context = parent.getContext();
		if(context){
			context.attach(widget);
			widget.startup();
			widget.renderWidget();
			context.widgetAddedOrDeleted();

			context.widgetChanged(context.WIDGET_ADDED, widget);
			
			// Recompute styling properties in case we aren't in Normal state
			States.resetState(widget.domNode);
		}
	}

});
});


