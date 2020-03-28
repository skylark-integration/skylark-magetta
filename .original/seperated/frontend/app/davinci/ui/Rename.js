require({cache:{
'url:davinci/ui/templates/Rename.html':"<div>\n\t<div class=\"dijitDialogPaneContentArea\">\n\t\t<table>\n\t\t\t<tr>\n\t\t\t\t<td class=\"NewProjectDialogLabel\">${renameNewLabel}</td><td><input class='templateInput' type='text' dojoAttachPoint=\"_newName\"></input></td><td><div dojoAttachPoint='_error4'></div></td>\n\t\t\t</tr>\t\t\n\t\t</table>\n\t</div>\n\n\t<div class=\"dijitDialogPaneActionBar\">\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"_okButton\" dojoAttachEvent='onClick:okButton' label='${renameButtonLabel}' class=\"maqPrimaryButton\" type=\"submit\" disabled></button>\n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:cancelButton' label='${buttonCancel}' class=\"maqSecondaryButton\"></button>\n\t</div>\n</div>"}});
define("davinci/ui/Rename", ["dojo/_base/declare",
        "dijit/_Templated",
        "dijit/_Widget",
        "dojo/i18n!davinci/ui/nls/ui",
        "dojo/i18n!dijit/nls/common",
        "dojo/text!./templates/Rename.html"

], function(declare, _Templated, _Widget,  uiNLS, commonNLS, templateString){
	
	return declare("davinci.ui.Rename",   [_Widget,_Templated], {
		widgetsInTemplate: true,
		templateString: templateString,
		_okButton: null,
		_newName : null,
		_eclipseSupport: null,
		
		postMixInProperties : function() {
			var langObj = uiNLS;
			var dijitLangObj = commonNLS;
			dojo.mixin(this, langObj);
			dojo.mixin(this, dijitLangObj);
			if(!this.invalid)
				this.invalid = {};
			
			this.inherited(arguments);
		},
		postCreate : function(){
			this.inherited(arguments);
			dojo.connect(this._newName, "onkeyup", this, '_checkValid');
			if(this.value){
				this._setValueAttr(this.value);
			}
			
			if(this.invalid){
				this._setInvalidAttr(this.invalid);
			}
			
		},
		
		_setInvalidAttr : function(values){
			this.invalid = values;
		},
		
		_checkValid : function(){
			
			// make sure the project name is OK.
			var name = dojo.attr(this._newName, "value");
			var valid = (name!=null && name.length>0);
			
			for(var i=0;i<this.invalid.length && valid;i++){
				if(this.invalid[i]==name) 
					valid = false;
			}
			this._okButton.set( 'disabled', !valid);
		},
		
		okButton : function(){
			this.value = dojo.attr(this._newName, "value");
		},
		
		_getValueAttr : function(){
			return this.value;
		},
		
		_setValueAttr : function(value){
			
			this.value = value;
			if(this._newName){
				dojo.attr(this._newName, "value", this.value);
			}
			this._checkValid();
		},
		
		
		cancelButton: function(){
			this.cancel = true;
			this.onClose();
		},

		_getCancelAttr : function(value){
			return this.cancel;
		},
		
		onClose : function(){}


		


	});
});
