require({cache:{
'url:davinci/ui/templates/newtheme.html':"<div>\r\n\t<div class=\"dijitDialogPaneContentArea\">\r\n\t\t<table>\r\n\t\t<tr>\r\n\t\t<td>${themeToClone}:</td><td> <div dojoType=\"davinci.ui.widgets.ThemeSelection\" workspaceOnly=\"false\" dojoAttachPoint = '_themeSelection'></div></td><td><div dojoAttachPoint='_error1'></div></td>\r\n\t\t</tr>\r\n\t\t<tr><td colspan='3'><hr></hr></td></tr>\r\n\t\t<!-- \r\n\t\t<tr>\r\n\t\t<td>New Name:</td><td><input style='width:100%' type='select' dojoAttachPoint=\"_themeName\"></input></td><td><div dojoAttachPoint='_error2'></div></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t<td>Version:</td><td><input style='width:100%' type='text' dojoAttachPoint=\"_version\"></input></td><td><div dojoAttachPoint='_error3'></div></td>\r\n\t\t</tr>\r\n\t\t -->\r\n\t\t<tr>\r\n\t\t<td>${newName}:</td><td><input class='templateInput' type='text' \r\n\t\t\tdojoAttachPoint=\"_selector\"\r\n\t\t\tdojoType=\"dijit.form.ValidationTextBox\"\r\n\t\t\trequired=\"true\" \r\n\t\t\tinvalidMessage='${invalidThemeName}'></input></td><td><div dojoAttachPoint='_error4'></div></td>\r\n\t\t</tr>\r\n\t\t</table>\r\n\t</div>\r\n\t<div class=\"dijitDialogPaneActionBar\">\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"_okButton\" dojoAttachEvent='onClick:okButton' label='${create}' class=\"maqPrimaryButton\" type=\"submit\" disabled></button>\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:cancelButton' label='${buttonCancel}' class=\"maqSecondaryButton\"></button>\r\n\t</div>\t\t\r\n</div>"}});
define("davinci/ui/NewTheme", ["dojo/_base/declare",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetBase",
        "dijit/_WidgetsInTemplateMixin",
        "system/resource",
        "../model/Path",
        "../Workbench",
        "../workbench/Preferences",
        "dojo/i18n!./nls/ui",
        "dojo/i18n!dijit/nls/common",
        "dojo/text!./templates/newtheme.html",
        "../Theme",
        "./widgets/ThemeSelection",
        "dijit/form/Button",
        "dijit/form/ValidationTextBox"

],function(declare, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, Resource, Path, Workbench, Preferences, 
			uiNLS, commonNLS, templateString, Theme, ThemeSelection, Button, ValidationTextBox){
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString: templateString,
		_themeSelection: null,
		_okButton : null,
		_folder : null,
		_themeName : null,
		_folder : null,
		_version : null,
		_selector : null,
		_themeLocation : null,
		_error1 : null,
		_error2 : null,
		_error3 : null,
		_error4 : null,
		_errorMsg : null,
	    /*
	     * CSS identifier validation RegExp
	     * 
	     * see http://www.w3.org/TR/CSS21/syndata.html#tokenization
	     * 
	     *     ident    [-]?{nmstart}{nmchar}*
	     *     nmstart  [_a-z]|{nonascii}|{escape}
	     *     nonascii [^\0-\237]
	     *     unicode  \\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?
	     *     escape   {unicode}|\\[^\n\r\f0-9a-f]
	     *     nmchar   [_a-z0-9-]|{nonascii}|{escape}
	     * 
	     */             
		_themeValidator: /^[-]?([_a-z]|[^\0-\237]|\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\[^\n\r\f0-9a-f])([_a-z0-9-]|[^\0-\237]|\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\[^\n\r\f0-9a-f])*$/i,
		
		postMixInProperties : function() {
			var langObj = uiNLS;
			var dijitLangObj = commonNLS;
			dojo.mixin(this, langObj);
			dojo.mixin(this, dijitLangObj);
			this.inherited(arguments);
		},

		postCreate : function(){
			this.inherited(arguments);
			
			dojo.connect(this._themeSelection, "onChange", this, '_baseThemeChanged');
			
			/* wire up error handlers */
			dojo.connect(this._themeSelection, "onChange", this, '_checkValid');
			
			/*
			 * Override the ValidationTextBox 'validator' method.
			 */
			this._selector.validator = dojo.hitch(this, function(value, constraints) {
	            var isValid = this._themeValidator.test(value);
	            this._okButton.set( 'disabled', !isValid);
		        return isValid;
			});
			
		},
		
		_baseThemeChanged : function(){
			
			this._theme = this._themeSelection.get("value");
			
		},
		
		_createTheme : function(){
			
			this._okButton.set( 'disabled', true);
			var langObj = uiNLS;
			var oldTheme = this._themeSelection.get('value');
			var selector = this._selector.get('value');
			var themeName = selector;
			var version = null;
			var base = selector;
		
			var newBase = this._getThemeLocation();
			var r1=  Resource.findResource(newBase+'/'+base+'.theme');
			if(r1){
				alert(langObj.themeAlreadyExists);
			}else{
				// put up theme create message
				this._loading = dojo.create("div",null, dojo.body(), "first");
				this._loading.innerHTML=dojo.string.substitute('<table><tr><td><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;${0}...</td></tr></table>', [langObj.creatingTheme]);
				dojo.addClass(this._loading, 'loading');
				dojo.style(this._loading, 'opacity', '0.5');
			    var basePath = this.getBase();
			    // first we clone the theme which creates temp css files
				//Theme.CloneTheme(themeName,  version, selector, newBase, oldTheme, true).then(function(results){
				var a = Theme.CloneTheme(themeName,  version, selector, newBase, oldTheme, true);
				a.promise.then(function(results){
		        	// #23
					var themeFile = a.themeFile;
		            if (themeFile){
		            	themeFile.isNew = false; // the file has been saved so don't delete it when closing editor without first save.
	        			return themeFile.getContent().then(function(content) {
			                Workbench.openEditor({
			                    fileName: themeFile,
			                    content: content
			                });		        			
		        		});
		            } else {
		            	throw new Error(langObj.errorCreatingTheme + base);
		            }
			    }).otherwise(function(failureInfo){
					var message = "Uh oh! An error has occurred:<br><b>" + failureInfo.message + "</b>";
					if (failureInfo.fileName) {
						message += "<br>file: " + failureInfo.fileName + "<br>line: " + failureInfo.lineNumber;
					}
					if (failureInfo.stack) {
						message += "<br><pre>" + failureInfo.stack + "</pre>";
					}
					//TODO: where in the UI can we surface this message?  Send to console, for now.
					console.error(message);
			    }).otherwise(function(){
					if (this._loading){ // remove the loading div
		    			this._loading.parentNode.removeChild(this._loading);
		    			delete this._loading;
		    		}
			    }.bind(this));
			}
	  	},
		
		/*
		 * @return the project for the target theme.
		 */
		getBase : function(){
			if(Workbench.singleProjectMode()){
				return Workbench.getProject();
			}
		},
		
		_getThemeLocation : function(){
			
			var selector = this._selector.get('value');
			
			//var resource = Resource.findResource("./themes");

			/* the directory is virtual, so create an actual instance */
			//if(resource.libraryId)
			//	resource.mkdir();
			var base = this.getBase();
			var prefs = Preferences.getPreferences('davinci.ui.ProjectPrefs',base);
			
			var projectThemeBase = new Path(base).append(prefs.themeFolder);
			
			return projectThemeBase.append(selector).toString();
		},
		
		_checkValid : function(){
			
			var isOk = true;
			var oldTheme = this._themeSelection.get('value');
			var selector = this._selector.get('value');
			
			if( oldTheme==null || oldTheme =="" || selector==null || selector =="") { isOk = false;}

			this._okButton.set( 'disabled', !isOk);
		},
		
		okButton : function(){
			this._createTheme();
		},
		
		cancelButton: function(){
			this.cancel = true;
			this.onClose();
		},

		onClose : function(){}
	});
});

