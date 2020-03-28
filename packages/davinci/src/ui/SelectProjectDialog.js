require({cache:{
'url:davinci/ui/templates/SelectProjectDialog.html':"<div>\r\n\t<div class=\"dijitDialogPaneContentArea\">\r\n\t\t<div>${uiNLS.currentProject} <span data-dojo-attach-point=\"currentProjectName\" style=\"font-weight: bold\"></span></div>\r\n\t\t<div style=\"margin-top: 10px;\">${uiNLS.selectProject}</div>\r\n\t\t<div data-dojo-type=\"davinci.ui.widgets.ProjectSelection\" data-dojo-attach-point=\"projectSelection\" data-dojo-attach-event=\"onChange:_onChange\"></div>\r\n\t</div>\t\r\n\t<div class=\"dijitDialogPaneActionBar\">\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"_okButton\" dojoAttachEvent='onClick:okButton' label='${uiNLS.open}' class=\"maqPrimaryButton\" disabled=\"true\" type=\"submit\"></button>\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:cancelButton' label='${uiNLS.cancelButtonLabel}' class=\"maqSecondaryButton\"></button>\r\n\t</div>\r\n</div>"}});
define("davinci/ui/SelectProjectDialog", [
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"../Workbench",
	"dojo/i18n!davinci/ui/nls/ui",
	"dojo/text!./templates/SelectProjectDialog.html",
	"./widgets/ProjectSelection"
], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Workbench, uiNLS, templateString) {

return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
	templateString: templateString,
	uiNLS: uiNLS,

	postCreate: function() {
		this.currentProject = Workbench.getProject();

		this.currentProjectName.innerHTML = this.currentProject;
	},

	_onChange: function(e) {
		if (this.projectSelection.get("value") == this.currentProject) {
			this._okButton.set("disabled", true);
		} else {
			this._okButton.set("disabled", false);
		}
	},

	okButton: function() {
		var project = this.projectSelection.get("value");
		if (project) {
			Workbench.loadProject(project);
		}
	},

	cancelButton: function() {
		this.onClose();
	}
});
});

