require({cache:{
'url:davinci/ve/actions/templates/EnableApplicationStates.html':"<div>\n\t<div class=\"dijitDialogPaneContentArea\">\n\t\t<div class='EnableAsStateContainerWidgetDiv'>\n\t\t\t${veNls.EnableApplicationStatesCurrentWidget}:\n\t\t\t<span class='EnableAsStateContainerWidgetLabel' dojoAttachPoint='widgetLabel'></span>\n\t\t</div>\n\t\t<div class='EnableAsStateContainerStatesDiv' dojoAttachPoint='statesListDiv'>\n\t\t\t//Filled in by JavaScript logic\n\t\t</div>\n\t\t<div class='EnableAsStateContainerDescriptionDiv' dojoAttachPoint='description'>\n\t\t\t//Filled in by JavaScript logic\n\t\t</div>\n\t\t<div class='EnableAsStateContainerCheckBoxDiv'>\n\t\t\t<input dojoAttachPoint=\"checkBoxWidget\" dojoType=\"dijit.form.CheckBox\" dojoAttachEvent=\"onKeyUp:_onKeyPress\" type=\"text\"></input>\n\t\t\t${veNls.EnableAsStateContainerWidgetLabel}\n\t\t</div>\n\t</div>\n\t\t\t\t\n\t<div class=\"dijitDialogPaneActionBar\">\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint='okButton' label='${commonNls.buttonOk}' class=\"maqPrimaryButton\"></button>\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint='cancelButton' label='${commonNls.buttonCancel}' class=\"maqSecondaryButton\"></button>\n\t</div>\n</div>\n"}});
define("davinci/ve/actions/EnableApplicationStates", [
	"dojo/_base/declare",
	"dojo/_base/connect",
	"dojo/dom-class",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"davinci/Runtime",
	"davinci/Workbench",
	"davinci/ve/metadata",
	"davinci/ve/widget",
	"davinci/ve/States",
	"davinci/actions/Action",
	"dojo/i18n!davinci/ve/nls/ve",
	"dojo/i18n!dijit/nls/common",
	"dojo/text!./templates/EnableApplicationStates.html",
	"dijit/form/TextBox"
], function(declare, connect, domClass, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Runtime, Workbench, 
		metadata, widgetUtils, States, Action, veNls, commonNls, templateString){

var enableApplicationStatesCommand = function(){
	if(Runtime.currentEditor && Runtime.currentEditor.currentEditor && Runtime.currentEditor.currentEditor.context){
		context = Runtime.currentEditor.currentEditor.context;
		var selection = context.getSelection();
		if(selection.length == 1){
			var widget = selection[0];
			return (metadata.getAllowedChild(widget.type) == 'ANY');
		}
	}
	return false;
};

var EnableApplicationStatesWidget = declare("davinci.ve.actions.EnableApplicationStatesWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
	templateString: templateString,
	widgetsInTemplate: true,

	veNls: veNls,
	commonNls: commonNls,
	oldValue: null,
	widget:null,

	postCreate: function(){
		if(Runtime.currentEditor && Runtime.currentEditor.currentEditor && Runtime.currentEditor.currentEditor.context){
			editor = this.editor = Runtime.currentEditor;
			context = this.context = Runtime.currentEditor.currentEditor.context;
		}else{
			return;
		}
		var selection = context.getSelection();
		if(selection.length > 0){
			var widget = this.widget = selection[0];
			var widgetLabel = widgetUtils.getLabel(widget);
			this.widgetLabel.innerHTML = widgetLabel;
			this.oldValue = States.isStateContainer(widget.domNode);
			this.checkBoxWidget.set('checked', this.oldValue);
			if(this.oldValue){
				var description = veNls.DisableAsStateContainerDescription;
				var states = States.getStates(widget.domNode);
				if(states.length > 1){
					states.splice(0, 1); // Remove "Normal"
					this.statesListDiv.innerHTML = veNls.EnableApplicationStatesCurrentStates + ': ' + states.join(', ');
					description += ' ' + veNls.DisableAsStateContainerDataLoss;
				}else{
					this.statesListDiv.innerHTML = veNls.EnableApplicationStatesCurrentStates + ': ' + veNls.EnableApplicationStatesNone;
				}
				this.description.innerHTML = veNls.DisableAsStateContainerDescription;
			}else{
				this.description.innerHTML = veNls.EnableAsStateContainerDescription;
				this.statesListDiv.innerHTML = '';
			}
/*
			if(this.oldValue){
				domClass.add(this.enableDescription, 'dijitHidden');
				domClass.remove(this.disableDescription, 'dijitHidden');
				domClass.remove(this.statesListDiv, 'dijitHidden');
			}else{
				domClass.add(this.disableDescription, 'dijitHidden');
				domClass.remove(this.enableDescription, 'dijitHidden');
				domClass.add(this.statesListDiv, 'dijitHidden');
			}
*/
		}
		this.okButton.connect(this.okButton, "onClick", dojo.hitch(this, function(e){
			this.onOk(e);
		}));
		this.cancelButton.connect(this.cancelButton, "onClick", dojo.hitch(this, function(e){
			this.onCancel(e);
		}));
	},
	
	_onKeyPress: function(e) {
		if (e.keyCode==dojo.keys.ENTER) {
			this.onOk();
		}
	},

	onOk: function() {
		var newValue = this.checkBoxWidget.get('checked');
		if(newValue != this.oldValue){
			var node = this.widget.domNode;
			if(newValue){
				node._maqAppStates = {};
				var o = States.serialize(node);
				this.widget._srcElement.addAttribute(States.APPSTATES_ATTRIBUTE, o.maqAppStates);
			}else{
				delete node._maqAppStates;
				this.widget._srcElement.removeAttribute(States.APPSTATES_ATTRIBUTE);
				States.removeUnusedStates(this.context);
			}
			this.editor._visualChanged();
			connect.publish("/maqetta/appstates/state/containerChange", []);
		}
		this.onClose();
	},

	onCancel: function() {
		this.onClose();
	}
});

return declare("davinci.ve.actions.EnableApplicationStates", [Action], {

	run: function(){
		if(!enableApplicationStatesCommand()){
			return;
		}
		var context;
		if(Runtime.currentEditor && Runtime.currentEditor.currentEditor && Runtime.currentEditor.currentEditor.context){
			context = Runtime.currentEditor.currentEditor.context;
		}else{
			return;
		}

		var w = new davinci.ve.actions.EnableApplicationStatesWidget();

		Workbench.showModal(w, veNls.EnableApplicationStates, {width:'370px'});
	},

	isEnabled: function(){
		return enableApplicationStatesCommand();
	}
});
});