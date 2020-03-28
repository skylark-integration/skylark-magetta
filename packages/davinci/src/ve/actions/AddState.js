require({cache:{
'url:davinci/ve/actions/templates/AddState.html':"<div>\n\t<div class=\"dijitDialogPaneContentArea\">\n\t\t${veNls.stateLabel}: <input dojoAttachPoint=\"input\" dojoType=\"dijit.form.TextBox\" dojoAttachEvent=\"onKeyUp:_onKeyPress\" type=\"text\"></input>\n\t</div>\n\t\t\t\t\n\t<div class=\"dijitDialogPaneActionBar\">\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"okButton\" dojoAttachEvent='onClick:onOk' disabled label='${veNls.createLabel}' class=\"maqPrimaryButton\" type=\"submit\"></button>\n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:onCancel' label='${commonNls.buttonCancel}' class=\"maqSecondaryButton\"></button>\n\t</div>\n</div>\n"}});
define("davinci/ve/actions/AddState", [
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"davinci/Runtime",
	"davinci/Workbench",
	"davinci/ve/States",
	"davinci/actions/Action",
	"dojo/i18n!davinci/ve/nls/ve",
	"dojo/i18n!dijit/nls/common",
	"dojo/text!./templates/AddState.html",
	"dijit/form/TextBox"
], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Runtime, Workbench, States, Action, veNls, commonNls, templateString){

var AddStateWidget = declare("davinci.ve.actions.AddStateWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
	templateString: templateString,
	widgetsInTemplate: true,

	veNls: veNls,
	commonNls: commonNls,

	_isValid: function() { 
		var state = this.input.get("value");
		// TODO: Replace alerts with inline error messages
		if (!state) {
			return false;
		} else if (davinci.ve.states.hasState(this.node, state)) {
			alert(dojo.string.substitute(veNls.stateNameExists, { name: state }));
			return false;
		}
		return true;
	},

	_onKeyPress: function(e) {
		if (e.keyCode!=dojo.keys.ENTER) {
			if (this._isValid()) {
				this.okButton.set("disabled", false);
			} else {
				this.okButton.set("disabled", true);
			}
		}
	},

	onOk: function() {
		var newState = this.input.get("value");
		if(newState){
			States.add(this.node, newState);
		}
	},

	onCancel: function() {
		this.onClose();
	}
});

return declare("davinci.ve.actions.AddState", [Action], {

	run: function(){
		var context;
		if(Runtime.currentEditor && Runtime.currentEditor.currentEditor && Runtime.currentEditor.currentEditor.context){
			context = Runtime.currentEditor.currentEditor.context;
		}else{
			return;
		}
		var statesFocus = States.getFocus(context.rootNode);
		if(!statesFocus || !statesFocus.stateContainerNode){
			return;
		}

		var w = new davinci.ve.actions.AddStateWidget({node: statesFocus.stateContainerNode });

		Workbench.showModal(w, veNls.createNewState, null, null, true);
	}
});
});