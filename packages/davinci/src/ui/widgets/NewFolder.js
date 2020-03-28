require({cache:{
'url:davinci/ui/widgets/templates/NewFolder.html':"<div>\n\t<div class=\"dijitDialogPaneContentArea\">\n\t\t<table>\n\t\t<tr>\n\t\t\t<td class=\"NewProjectDialogLabel\">${uiNLS.parentFolder}</td><td><div class='templateInput'  dojoAttachPoint=\"fileDialogParentFolder\"  ></input></td>\n\t\t</tr>\n\t\t<tr>\n\t\t<td class=\"NewProjectDialogLabel\">${uiNLS.newFolderName}</td><td><input dojoType=\"dijit.form.TextBox\" type=\"text\" dojoAttachPoint=\"folderName\"></input></td><td><div dojoAttachPoint='_error4'></div></td>\n\t\t</tr>\n\t\t</table>\n\t</div>\n\t<div class=\"dijitDialogPaneActionBar\">\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"okButton\" class=\"maqPrimaryButton\" type=\"submit\">${uiNLS.create}</button>\n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:_cancelButton' class=\"maqSecondaryButton\">${uiNLS.cancelButtonLabel}</button>\t\t\n\t</div>\t\t\n</div>"}});

define("davinci/ui/widgets/NewFolder", ["dojo/_base/declare",
        "dijit/_Templated",
        "dijit/_Widget",
        "davinci/library",
        "davinci/Workbench",
        "system/resource",
        "davinci/workbench/Preferences",
        "davinci/Runtime",
        "dijit/Menu",
        "dijit/MenuItem",
        "davinci/model/Path",
        "dijit/form/DropDownButton",
        "dojo/i18n!davinci/ui/nls/ui",
        "dojo/i18n!dijit/nls/common",
        "dojo/text!./templates/NewFolder.html",
        "dijit/form/Button",
        "dijit/form/TextBox",
        "dijit/form/RadioButton"

],function(declare, _Templated, _Widget,  Library, Workbench, Resource,  Preferences, Runtime,  Menu, MenuItem, Path, DropDownButton, uiNLS, commonNLS, templateString){

	return declare("davinci.ui.widgets.NewFolder",   [_Widget, _Templated], {
	
		widgetsInTemplate: true,
		templateString: templateString,
		folderName : null,
		fileDialogParentFolder: null,
	
		okButton : null,
		uiNLS: uiNLS,
		
		postMixInProperties : function() {
			this.inherited(arguments);
		},
		postCreate : function(){
			this.inherited(arguments);
			dojo.connect(this.folderName, "onkeyup", this, '_checkValid');
			/* set a default value */
			if(!this._value){
				this._setRootAttr(this._getRootAttr());
			}

			this.okButton.onClick = dojo.hitch(this, this._okButton);
		},
		
		
		_setValueAttr : function(value){
			/* full resource expected */
			if(value==this._value) return;
			this._value = value;
			var parentFolder = "";
			if(value && value.elementType=="Folder"){
				this.fileDialogParentFolder.innerHTML = value.getName();
			}else if(value){
				this.fileDialogParentFolder.innerHTML = value.parent.getPath();
			}
			
			
		},
		
		_setNewFileNameAttr : function(name){
			this.folderName.set( 'value', name);
		},
	
		_getRootAttr : function(){
			
			if(this._root) return this._root;
			
			var prefs = Preferences.getPreferences('davinci.ui.ProjectPrefs',base);
			
			if(prefs.webContentFolder!=null && prefs.webContentFolder!=""){
				var fullPath = new Path(Workbench.getProject()).append(prefs.webContentFolder);
				
				var folder = Resource.findResource(fullPath.toString());
				return folder;
			}
			
			return Resource.findResource(Workbench.getProject());
		},
		
		_setRootAttr : function(value){
			
			this._root=value;
			this.fileDialogParentFolder.innerHTML = value.getPath();
			
		},
		_checkValid : function(){
			
			// make sure the project name is OK.
			var name = this.folderName.get( "value");
			var valid = name!=null && name.length > 0;
			this._okButton.set( 'disabled', !valid);
		},
		_okButton : function(){
			this.value = this.fileDialogParentFolder.innerHTML + "/" + this.folderName.get( 'value');		

			var check = this.checkFileName(this.value);
			if (check) {
				return true
			} else {
				return false;
			}
		},
		
		_getValueAttr : function(){
			this.value = this.fileDialogParentFolder.innerHTML + "/" + this.folderName.get( 'value');
			return this.value;
		},
		
		_cancelButton: function(){
			this.onClose();
		},
		
		_createResource : function(){
			var resource = Resource.findResource(this.fileDialogParentFolder.innerHTML + "/" + this.folderName.get( 'value'));
			if(resource) return resource;
			var folder = Resource.findResource(this.fileDialogParentFolder.innerHTML);
			return folder.createResource(this.folderName.get( 'value'));
		},
		onClose : function(){}
	
	
	});
});