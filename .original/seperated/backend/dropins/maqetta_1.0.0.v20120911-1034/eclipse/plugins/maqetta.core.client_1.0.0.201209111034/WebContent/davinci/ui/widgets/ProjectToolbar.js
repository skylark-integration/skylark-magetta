require({cache:{
'url:davinci/ui/widgets/templates/projectToolbar.html':"<div class='projectToolbar'>\t \n\t<table cellSpacing=\"0\" cellPadding=\"0\" border=\"0\">\n\t<tr>\n\t<td width=\"16px\"><td width=\"4px\"></td></td>\n\t<td width=\"100%\">\n\t<div class=\"projectSelection\" dojoType=\"davinci.ui.widgets.ProjectSelection\" dojoAttachPoint=\"_projectSelection\"></div>\n\t</td>\n\t\n\t\n\t<td width=\"16px\">\n\t<div class=\"projectToolbarDeleteIcon\" dojoAttachPoint=\"_projectDelete\" dojoAttachEvent=\"onclick:_delete\"></div>\n\t</td>\n\t<td width=\"16px\">\n\t<div class=\"projectToolbarRenameIcon\" dojoAttachPoint=\"_projectRename\" dojoAttachEvent=\"onclick:_rename\"></div>\n\t</td>\n\t<td width=\"16px\">&nbsp;</td>\n\t</tr>\n\t</table>\n</div>"}});
define("davinci/ui/widgets/ProjectToolbar", ["dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "system/resource",
        "davinci/Workbench",
        "../Rename",
        "dojo/dom-attr",
        "dojo/text!./templates/projectToolbar.html",
        "dojo/i18n!../nls/ui",
        "dijit/form/Button",
        "dijit/form/TextBox",
        "dijit/form/RadioButton",
        "dijit/layout/ContentPane",
        "./ProjectSelection"
],function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, systemResource, Workbench, Rename, domAttr, templateString, uiNLS){
	
	return declare("davinci.ui.widgets.ProjectToolbar",   [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

		templateString: templateString,

		postCreate: function(){
			this.connect(this._projectSelection, "onChange", this._projectSelectionChanged);
			this._currentProject = this._projectSelection.get("value");
			domAttr.set(this._projectDelete, "title", uiNLS.deleteProjectButtonTitle);
			domAttr.set(this._projectRename, "title", uiNLS.renameProjectButtonTitle);
		},
		
		onChange: function(){
		},

		_projectSelectionChanged: function(){
			var newProject = this._projectSelection.get("value");
			if(newProject==this._currentProject) {
				return;
			}
			Workbench.loadProject(newProject);
		},
		
		_delete: function(){
			var allProjects = this._projectSelection.get("projects");
			if(allProjects.length < 2){
				alert(uiNLS.deleteOnlyProjectError);
				return;
			}
			var changeToProject = null;
			var project = this._projectSelection.get("value");
			for(var i=0;!changeToProject && i<allProjects.length;i++){
				if(allProjects[i]!=project) {
					changeToProject = allProjects[i];
				}
			}
			
			//Make the user confirm
			if(!confirm(dojo.string.substitute(uiNLS.areYouSureDelete, [project]))){
		    	return;
		    }
			
			var resource = systemResource.findResource(project);
			resource.deleteResource().then(function(){
				Workbench.loadProject(changeToProject);				
			});
		},
		
		_rename: function(){
			var oldProject = Workbench.getProject();
			var renameDialog = new Rename({value:oldProject, invalid: this._projectSelection.get("projects")});
			
			Workbench.showModal(renameDialog, uiNLS.renameProjectDialogTitle, {height:110, width: 200},function(){
				
				var cancel = renameDialog.get("cancel");
				if(!cancel){
					var newName = renameDialog.get("value");
					if(newName == oldProject) {
						return;
					}

					var resource = systemResource.findResource(oldProject);
					resource.rename(newName).then(function(){
						Workbench.loadProject(newName);						
					});
				}

				return true;
			});
		}
	});
});