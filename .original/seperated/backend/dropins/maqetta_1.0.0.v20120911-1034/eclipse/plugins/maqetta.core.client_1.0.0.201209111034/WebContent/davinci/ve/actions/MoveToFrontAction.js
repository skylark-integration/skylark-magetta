define("davinci/ve/actions/MoveToFrontAction", [
		"dojo/_base/declare",
		"./_ReorderAction",
		"davinci/commands/CompoundCommand",
		"davinci/ve/commands/ReparentCommand"
], function(declare, _ReorderAction, CompoundCommand, ReparentCommand){


return declare("davinci.ve.actions.MoveToFrontAction", [_ReorderAction], {

	name: "MoveToFront",
	iconClass: "editActionIcon editMoveToFrontIcon",
	
	/**
	 * This is the routine that performs the actions for the MoveToFront command.
	 * @param {Object} context  context object for current visual editor
	 */
	// FIXME: Need to preserve order for siblings that are being moved at once
	run: function(context){
		context = this.fixupContext(context);
		if(!context){
			return;
		}
		var selection = (context && context.getSelection) ? context.getSelection() : [];
		if(selection.length === 0){
			return;
		}
		if(!this.selectionSameParentAllAbsolute(selection)){
			return;
		}
		var parent = selection[0].getParent();
		var absSiblings = this.getAbsoluteSiblings(selection[0]);
		var compoundCommand = new CompoundCommand();
		// By looping through absSiblings, we preserve the relative order of the 
		// currently selected widgets, while pushing all of those widgets to be topmost
		// within the given parent
		for(var i=0; i<absSiblings.length; i++){
			var widget = absSiblings[i];
			if(selection.indexOf(widget) >= 0){
				compoundCommand.add(new ReparentCommand(widget, parent, null));
			}
		}
		context.getCommandStack().execute(compoundCommand);
	},

	/**
	 * Enable this command if this command would actually make a change to the document.
	 * Otherwise, disable.
	 */
	isEnabled: function(context){
		context = this.fixupContext(context);
		var selection = (context && context.getSelection) ? context.getSelection() : [];
		if(selection.length === 0){
			return false;
		}
		if(!this.selectionSameParentAllAbsolute(selection)){
			return false;
		}
		var absSiblings = this.getAbsoluteSiblings(selection[0]);
		for(var j=0; j<selection.length; j++){
			var widget = selection[j];
			// If any of the currently selected widgets has a non-selected absolutely positioned sibling
			// later in the list of siblings, then activate this command
			if(absSiblings.indexOf(widget) < absSiblings.length - selection.length){
				return true;
			}
		}
		return false;
	}

});
});