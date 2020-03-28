require({cache:{
'davinci/ve/themeEditor/SelectTool':function(){
define("davinci/ve/themeEditor/SelectTool", [
    	"dojo/_base/declare",
    	"davinci/ve/widget",
    	"davinci/ve/tools/SelectTool",
    	"davinci/ve/themeEditor/commands/StateChangeCommand"
], function(declare, Widget, SelectTool, StateChangeCommand){


return declare("davinci.ve.themeEditor.SelectTool", [SelectTool], {

	
	
	onMouseDown: function(event){

		var t = Widget.getEnclosingWidget(event.target);
		if (event.target.id.indexOf('enableWidgetFocusFrame_') >-1){
			t = event.target._widget;
		}
		var widget = (this._getTarget() || t );
		
		
		while(widget){
			if (widget.dvAttributes && widget.dvAttributes.isThemeWidget && widget.getContext() ){ // managed widget
				break;
			}
			widget = Widget.getEnclosingWidget(widget.domNode.parentNode);
		}
		/*
		 * prevent selection of non theme widgets.
		 * widgets with attribute dvThemeWidget="true" are selectable.
		 * 
		 */
		if (!widget) { //#1024
			var editor = this._context.editor,
				cmd = new StateChangeCommand({
			        _themeEditor: editor,
		            _widget: editor._selectedWidget, 
		            _newState: editor._currentState,
		            _oldState: editor._oldState,
		            _firstRun: true
		        });
		    setTimeout(function (){cmd.execute();},500);
		    
			return;
		}

		var selection = this._context.getSelection();
		var ctrlKey = navigator.appVersion.indexOf("Macintosh") < 0? event.ctrlKey: event.metaKey;
		if(dojo.indexOf(selection, widget) >= 0){
			if(ctrlKey && event.button !== 2){ // CTRL to toggle
				this._context.deselect(widget);
			}else if(event.button !== 2){ // Right mouse not to alter selection
				this._context.select(widget);
			}
		}else{
			// at least for V0.6 theme editor does not support ctrl
			// this._context.select(widget, ctrlKey); // CTRL to add 
			widget.subwidget = null; // the widget was just selected so ensure the subwidget is null
			this._context.select(widget, false); // at least for V0.6 theme editor does not support multi select
			event.stopPropagation(); // wdr mobile 
		}
	}

});
});

},
'davinci/ve/themeEditor/ThemeColor':function(){
define("davinci/ve/themeEditor/ThemeColor", [
    	"dojo/_base/declare"
], function(declare){


return declare("davinci.ve.themeEditor.ThemeColor", [dojo.Color], {
	
  constructor: function(/* Object */args){
    dojo.safeMixin(this, args);

  },

	toHsl: function (){
	   var r = this.r;
	   var g = this.g;
	   var b = this.b;
	    r /= 255, g /= 255, b /= 255;
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, l = (max + min) / 2;

	    if(max == min){
	        h = s = 0; // achromatic
	    }else{
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max){
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }

	    return {h: h, s: s, l: l};
	},

	/** Sets the object s color from hue, saturation, lightness
	 * @param   String  h       The hue
	 * @param   String  s       The saturation
	 * @param   String  l       The lightness
	 * @return  Object           The RGB representation
	 */
  setHsl: function (h, s, l){
	    var r, g, b;

	    if(s == 0){
	        r = g = b = l; // achromatic
	    }else{
	        function hue2rgb(p, q, t){
	            if(t < 0) t += 1;
	            if(t > 1) t -= 1;
	            if(t < 1/6) return p + (q - p) * 6 * t;
	            if(t < 1/2) return q;
	            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	            return p;
	        }

	        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        var p = 2 * l - q;
	        r = hue2rgb(p, q, h + 1/3);
	        g = hue2rgb(p, q, h);
	        b = hue2rgb(p, q, h - 1/3);
	    }
	    this.r = parseInt(r * 255);
	    this.g = parseInt(g * 255);
	    this.b = parseInt(b * 255);
	    if (this.r > 255) this.r=255;
	    if (this.g > 255) this.g=255;
	    if (this.b > 255) this.b=255;
	    return {r:this.r, g:this.g, b:this.b};

	},

	/*
	 * @return  Object           The HSV representation
	 */
	toHsv: function (){
		var r = this.r;
		var g = this.g;
		var b = this.b;
		
	    r = r/255, g = g/255, b = b/255;
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, v = max;

	    var d = max - min;
	    s = max == 0 ? 0 : d / max;

	    if(max == min){
	        h = 0; // achromatic
	    }else{
	        switch(max){
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }

	    return {h:h, s:s, v:v};
	},

	/**
	 * Sets color value from HSV
	 *
	 * @param   String  h       The hue
	 * @param   String  s       The saturation
	 * @param   String  v       The value
	 * @return  Object          The RGB representation
	 */
	setHsv: function (h, s, v){
	    var r, g, b;

	    var i = Math.floor(h * 6);
	    var f = h * 6 - i;
	    var p = v * (1 - s);
	    var q = v * (1 - f * s);
	    var t = v * (1 - (1 - f) * s);

	    switch(i % 6){
	        case 0: r = v, g = t, b = p; break;
	        case 1: r = q, g = v, b = p; break;
	        case 2: r = p, g = v, b = t; break;
	        case 3: r = p, g = q, b = v; break;
	        case 4: r = t, g = p, b = v; break;
	        case 5: r = v, g = p, b = q; break;
	    }
	    this.r = r * 255;
	    this.g = g * 255;
	    this.b = b * 255;
	    if (this.r > 255) this.r=255;
	    if (this.g > 255) this.g=255;
	    if (this.b > 255) this.b=255;
	    return {r:this.r, g:this.g, b:this.b};
	},
	

	/**
	 * calculate  a highlight color for the current RGB colors of this object using the normal and highlight colors
	 *
	 * @param   String  normal      Base color
	 * @param   String  highlight   The highlight color
	 * @param   String  v       The value
	 * @return  Object          The RGB representation
	 */
	
	calculateHighlightColor: function(normal, highlight){
		var normalColor =new davinci.ve.themeEditor.ThemeColor(normal); 
		var highlightColor = new davinci.ve.themeEditor.ThemeColor(highlight);
		var calculateHighlight = new davinci.ve.themeEditor.ThemeColor('#FFFFFF'); //  just a place holder
		var normalHsl = normalColor.toHsl();
		var highlightHsl = highlightColor.toHsl();
		var myHsl = this.toHsl();
		var delta = new Object();
		delta.h = highlightHsl.h -  normalHsl.h;
		delta.s = highlightHsl.s -  normalHsl.s;
		delta.l = highlightHsl.l -  normalHsl.l;
		var h = myHsl.h + delta.h;
		var s = myHsl.s + delta.s;
		var l = myHsl.l + delta.l;
		calculateHighlight.setHsl(h,s,l);
		return calculateHighlight;
		
	},
	getHoverColor: function(){
		var normalColor =new davinci.ve.themeEditor.ThemeColor(normal); 
		var highlightColor = new davinci.ve.themeEditor.ThemeColor(highlight);
		var calculateHighlight = new davinci.ve.themeEditor.ThemeColor('#FFFFFF'); //  just a place holder
		var normalHsl = normalColor.toHsl();
		var highlightHsl = highlightColor.toHsl();
		var myHsl = this.toHsl();
		var delta = new Object();
		delta.h = highlightHsl.h -  normalHsl.h;
		delta.s = highlightHsl.s -  normalHsl.s;
		delta.l = highlightHsl.l -  normalHsl.l;
		var h = 0.3329565030146425; //myHsl.h + delta.h;
		var s = 1; //myHsl.s + delta.s;
		var l = 0.8588235294117648; //myHsl.l + delta.l;
		calculateHighlight.setHsl(h,s,l);
		return calculateHighlight;
		
	}


});
});
},
'davinci/ve/themeEditor/commands/StateChangeCommand':function(){
define("davinci/ve/themeEditor/commands/StateChangeCommand", [
    	"dojo/_base/declare",
    	"davinci/ve/themeEditor/commands/ThemeEditorCommand"
], function(declare, ThemeEditorCommand){


return declare("davinci.ve.themeEditor.commands.StateChangeCommand", [ThemeEditorCommand], {


	constructor: function(args){
		dojo.mixin(this, args);
	},
	execute: function(){
	
		this.old_selectedWidget = this._themeEditor._selectedWidget;
		this.old_selectedSubWidget = this._themeEditor._selectedSubWidget;
		this._themeEditor._currentState = this._newState; // the state is for all the widgets on the page
		var widgetName = null;
    	var subWidgetName = null;
    	

		if(!this._widgets){
			this._widgets = this._themeEditor.getContext().getDocument().querySelectorAll('.dvThemeWidget');
		}
		var widgets = this._widgets; 
		for (var i=0; i<widgets.length; i++){
			// enable the widget
			this._themeEditor.enableWidget(widgets[i]._dvWidget);
			if((!this._oldState) || (this._themeEditor._theme.isStateValid(widgets[i]._dvWidget,this._oldState))){// the init state is undefined we want to get to a know state
				// remove the styles from all widgets and subwidgets that supported the state
				this._themeEditor._theme.removeWidgetStyleValues(widgets[i]._dvWidget,this._oldState);
			} 
			if(this._themeEditor._theme.isStateValid(widgets[i]._dvWidget,this._newState)){
	    		// set the style on all widgets and subwidgets that support the state	
	    		this._themeEditor._theme.setWidgetStyleValues(widgets[i]._dvWidget,this._newState);
			} else{
				// disable the widget
				this._themeEditor.disableWidget(widgets[i]._dvWidget);
				
			}

		}

		if (!this._firstRun){
			this._widget.processingUndoRedo = true;
			dojo.publish("/davinci/states/state/changed", 
					[{editorClass:'davinci.themeEditor.ThemeEditor', widget:'$all', 
					newState:this._newState, oldState:this._oldState, origin: this.declaredClass, context: this._themeEditor.context}]); 
		}
		this._firstRun = false;
		this.updatePropertiesView();
	},

	undo: function(){

		this._themeEditor._selectedWidget = this.old_selectedWidget;
		this._themeEditor._selectedSubWidget = this.old_selectedSubWidget;
		this._themeEditor._currentState = this._oldState; // the state is for all the widgets on the page
    	var widgets = this._widgets; // so we saved them in execute to use here
		for (var i=0; i<widgets.length; i++){
			if(!this._themeEditor._theme.isStateValid(widgets[i]._dvWidget,this._newState)){
				// enable the widget
				this._themeEditor.enableWidget(widgets[i]);
			}
			if(this._themeEditor._theme.isStateValid(widgets[i]._dvWidget,this._oldState)){
				// enable the widget
				this._themeEditor.enableWidget(widgets[i]._dvWidget);
			} else {
				// disable the widget
				this._themeEditor.disableWidget(widgets[i]._dvWidget);
			}
    		// remove the styles from all widgets and subwidgets that supported the state
    		this._themeEditor._theme.removeWidgetStyleValues(widgets[i]._dvWidget,this._newState);
    		// set the style on all widgets and subsidgets that support the state	
    		this._themeEditor._theme.setWidgetStyleValues(widgets[i]._dvWidget,this._oldState);
    		
		}

		this._widget.processingUndoRedo = true;
		//davinci.ve.states.setState(this._widget.domNode, this._oldState); 
		this.updatePropertiesView();

		dojo.publish("/davinci/states/state/changed", 
				[{editorClass:'davinci.themeEditor.ThemeEditor', widget:'$all', 
				newState:this._oldState, oldState:this._newState, origin: this.declaredClass, context: this._themeEditor.context}]); 
	}
});
});
},
'davinci/ve/themeEditor/VisualThemeEditor':function(){
define("davinci/ve/themeEditor/VisualThemeEditor", [
    	"dojo/_base/declare",
    	"davinci/Runtime",
    	"davinci/Workbench",
    	"davinci/ve/themeEditor/Context",
    	"davinci/workbench/Preferences",
    	"davinci/model/Path",
    	"davinci/model/Factory",
    	"davinci/html/HTMLFile",
    	"davinci/Theme",
    	"dojo/i18n!davinci/ve/nls/ve",
    	"davinci/ve/utils/URLRewrite",
    	"dojo/_base/sniff"
], function(declare, Runtime, Workbench, Context, Preferences, Path, Factory, HTMLFile, Theme, veNls,URLRewrite, has) {

return declare([], {

/*
 * 
 * HTML rendered as the theme editor
 */


	constructor: function (themeEditor, element,filename,themeCssFiles, themeEditorHtmls,theme) {
		this.THEME_EDITOR_SPEC = 1.0;
		this._themeEditor = themeEditor;
		this.domNode = element;
		this.theme = theme;
		var resource= themeEditorHtmls[0]; 

		this.basePath=new Path(resource.getPath());

		this.loadingDiv = dojo.create("div", {
			className: "loading",
			innerHTML: dojo.replace(
					'<table><tr><td><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;{0}</td></tr></table>',
					["Loading..."]) // FIXME: i18n
			},
			this.domNode.parentNode,
			"first");

		this._handles=[];
		this.context = new Context({
			editor: this._themeEditor,
			visualEditor: this,
			containerNode: this.domNode,
			baseURL: URLRewrite.encodeURI(resource.getURL()),
			theme: theme
		});

		dojo.connect(this.context, "onSelectionChange",this, "onSelectionChange");

		var prefs=Preferences.getPreferences('davinci.ve.themeEditor.editorPrefs', Workbench.getProject());
		if (prefs) {
			this.context.setPreferences(prefs);
		}
		// have the server insert the dojo URL dynamically 
		
		dojo.xhrGet({
				url: URLRewrite.encodeURI(resource.getURL()),
				handleAs: "text",
				sync: false,
				content:{} 
			}).addCallback(dojo.hitch(this, function(result){
				this.setContent("DEFAULT_PAGE", 
								result,
								themeCssFiles);
			}));
    },
    
    onSelectionChange: function (){
    },

    destroy: function(){
    },

    getDefaultContent: function (){
		return "";
	},

	getContent: function(){
		return this.context.getSource();
	},

	setContent: function(fileName, content, themeCssFiles){
		
		if (this.theme.specVersion < this.THEME_EDITOR_SPEC){
			var cookieName = 'maqetta_'+this.theme.name+'_'+this.theme.specVersion;
			var warnCookie = dojo.cookie(cookieName);
			if (!warnCookie){
				dojo.cookie(cookieName, "true");
				this.themeVersionWarn(); //just warn for now
			}
		}
		if(!has("webkit") && this.theme.type == "dojox.mobile"){
			Workbench.showMessage(veNls.vteWarningUnsuportedBrowserTitle, veNls.vteWarningUnsuportedBrowserMessage, {width: 250});
		}
		if(fileName.toLowerCase().indexOf(".css")>0){
			// add the style sheet to the theme editor
		}else if(fileName == "DEFAULT_PAGE"){
			var themeBase = Theme.getThemeLocation(); 
			htmlFile = new HTMLFile();; // each theme editor HTML needs to be it's own instance NO singleton from the model
			htmlFile.fileName = fileName;
			htmlFile.setText(content, true); // no import
			// #23 adjust for where html is located 
			var relPath = themeBase.relativeTo(this.basePath, true);
			htmlFile.themeCssFiles = [];
			themeCssFiles.forEach(function(file){
				htmlFile.themeCssFiles.push(relPath.toString()+'/'+this.theme.name+'/'+file); // #23 css files need to be added to doc before body content
			}.bind(this));
			this.context.model = htmlFile;
			if(!this.initialSet){
				this.context.deactivate();
				this.context._setSource(htmlFile, function(failureInfo) {
					this.savePoint = 0;
					// Make sure the theme css file is the last one in the head
					var doc = this.context.getDocument();
					for (var x = 0; x < doc.head.children.length; x++){
						var node = doc.head.children[x];
						if (node.tagName == 'LINK' && (node.getAttribute('href').indexOf(this.theme.files[0]) > -1) ) {
							doc.head.removeChild(node);
							doc.head.appendChild(node);
							break;
						}
					}
					//FIXME: include a LINK element for document.css for all themes.
					//Just so happens that desktop Dojo themes have document.css
					//and mobile themes don't.
					//We need to drive this from theme metadata somehow.
					//See issue #2381

				     var helper;
				     if (this.theme && this.theme.helper){
				         helper = Theme.getHelper(this.theme);
				         if (helper && helper.preThemeConfig){
				             helper.preThemeConfig(this.context);
				         } else if (helper && helper.then){ // it might not be loaded yet so check for a deferred
				        	 helper.then(function(result){
				        		 if (result.helper && result.helper.preThemeConfig){
				        			 result.helper.preThemeConfig(this.context); 
				        			 this.theme.helper = result.helper;
				    			 }
				        	 }.bind(this));
				          }
				     }
				     

					this.context.activate();

					// Because widget sizing css rules were not included in the HEAD at page load,
					// we must resize all of the widgets manually after the browser has had a chance
					// to repaint.  To avoid this workaround, we should either move the CSS rules
					// to the head of the document prior to page load, or resize() should be called
					// directly to conform with the way Dijit works.
					setTimeout(dojo.hitch(this, function(){
						
						this.context.getTopWidgets().forEach(function(widget){
							if (widget.resize){
								widget.resize({});
							}
						});
						dojo.publish("/davinci/states/state/changed", [{
							editorClass: 'davinci.themeEditor.ThemeEditor',
							widget: '$all', 
							newState: "Normal",
							context: this.context}]); // send state message to get Theme and StatesView in same init state
					}), 1500);
					this.initialSet=true;
					

					var ldojoVersion = this.context.getDojo().version.major +'.'+ this.context.getDojo().version.minor;
					if (ldojoVersion !== this.theme.version){
						var cookieName = 'maqetta_'+this.theme.name+'_'+this.theme.version;
						var warnCookie = dojo.cookie(cookieName);
						if (!warnCookie){
							dojo.cookie(cookieName, "true");
							this.themeVersionWarn(true);
						}
					}

					if (failureInfo.errorMessage) {
						this.loadingDiv.innerHTML = failureInfo.errorMessage;
					} else if (failureInfo instanceof Error) {
						var message = "Uh oh! An error has occurred:<br><b>" + failureInfo.message + "</b>";
						if (failureInfo.fileName) {
							message += "<br>file: " + failureInfo.fileName + "<br>line: " + failureInfo.lineNumber;
						}
						if (failureInfo.stack) {
							message += "<br>" + failureInfo.stack;
						}
						this.loadingDiv.innerHTML = message;
						dojo.addClass(loading, 'error');
					} else {
						if (this.loadingDiv.parentNode) {
							this.loadingDiv.parentNode.removeChild(this.loadingDiv);							
						}
						delete this.loadingDiv;
					}
				}, this);
			}
		}
	},
	
	themeVersionWarn: function(toolkit){
		var msg = veNls.vteWarningMessage;
		if (toolkit) {
			msg = veNls.vteWarninToolkitgMessage
		} 
		Workbench.showMessage(veNls.vteWarningTitle, msg, {width: 250});
		
	},
	
	themeVersionError: function(){
		Workbench.showMessage(veNls.vteErrorTitle, veNls.vteErrorMessage, {width: 250}, dojo.hitch(this, "themeVersionErrorOk"));
	},
	
	themeVersionErrorOk: function(){
		this.context.editor.editorContainer.save(false); // force a save
		this.context.editor.editorContainer.forceClose(this, true);

		// destroy dialog by returning true
		return true;
	},

	hotModifyCssRule: function(){
	},

	getOutline: function (){
		return null; // Theme editor does no support an outline.
	}
});
});
},
'davinci/ve/themeEditor/commands/ThemeEditorCommand':function(){
define([
    	"dojo/_base/declare"
], function(declare){


return declare("davinci.ve.themeEditor.commands.ThemeEditorCommand", null, {

	constructor: function(args){
		dojo.mixin(this, args);
	},
	execute: function(){
		this.old_selectedWidget = this._themeEditor._selectedWidget;
		this.old_selectedSubWidget = this._themeEditor._selectedSubWidget;
		this._themeEditor.deselectSubwidget(this.old_selectedWidget,this.old_selectedSubWidget);
		this._themeEditor._selectedWidget = this._widget[0];
		this._themeEditor._selectedSubWidget = null; // reset the subWidget
		if (this._firstRun){
			this.updatePropertiesView(false);
		} else {
			this.updatePropertiesView(true);
			dojo.publish("/davinci/ui/subwidgetSelectionChanged",[{subwidget: this._themeEditor._selectedSubWidget, origin: this.declaredClass}]);
		}
		this._firstRun = false;		
	},
	undo: function(){
		this._themeEditor.deselectSubwidget(this._themeEditor._selectedWidget,this._themeEditor._selectedSubWidget);
		this._themeEditor._selectedWidget = this.old_selectedWidget;
		this._themeEditor._selectedSubWidget = this.old_selectedSubWidget;
		this._themeEditor.selectSubwidget(this.old_selectedWidget,this.old_selectedSubWidget);
		this.updatePropertiesView(true);
		dojo.publish("/davinci/ui/subwidgetSelectionChanged",[{subwidget: this._themeEditor._selectedSubWidget, origin: this.declaredClass}]);
								
	},
	updatePropertiesView: function(updateContext){
		if (!this._themeEditor._selectedWidget) return;
		var e = [this._themeEditor._selectedWidget];
		dojo.publish("/davinci/ui/widgetSelected",[e]);
		
		
	}
		

});
});


},
'davinci/ve/themeEditor/Context':function(){
define([
    	"dojo/_base/declare",
    	"dojo/Deferred",
    	"../../commands/CommandStack",
    	"../widget",
    	"./SelectTool",
    	"../Context",
    	"../../library",
    	"../metadata"
], function(declare, Deferred, CommandStack, Widget, SelectTool, Context, Library, Metadata){


return declare([Context], {
	
	// comma-separated list of modules to load in the iframe
	_bootstrapModules: "dijit/dijit,dijit/dijit-all", // dijit-all hangs FF4 and does not seem to be needed.

	constructor: function(args){
		this._id = "_edit_context_" + this._contextCount++;
		dojo.mixin(this, args);
		if(dojo.isString(this.containerNode)){
			this.containerNode = dijit.byId(this.containerNode);
		}
		this._commandStack = CommandStack(this);
		this._defaultTool = new SelectTool();
		this._widgetIds = [];
		this._objectIds = [];
		this._widgets=[];
		this._selectionCssRules = [];
	},
	
	_setSourceData: function(data){
		
		// Create phony Dialog and Tooltip widgets with the appearance (template) of the Dijit widgets, but without the behavior.
		//.We need to do this because the stock widgets don't appear when placed on the page without user interaction, and they have
		// side effects which would interfere with operation of the Theme Editor.

		// Hard-code widget replacements for styling.  Need to factor creation out somehow to be data-driven.
		var mixins = [this.getDijit()._WidgetBase, this.getDijit()._TemplatedMixin];
		this.getDojo().declare("dijit.davinci.themeEditor.Dialog", mixins, {
			buttonCancel: "cancel", //TODO: i18n
			onCancel: function(){},
			title: "title",
			templateString: dojo.cache("dijit", "templates/Dialog.html", "<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"\n\t\t\t\trole=\"header\" level=\"1\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t\t</span>\n\t</div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n"),
			// Map widget attributes to DOMNode attributes.
			attributeMap: dojo.delegate(dijit._Widget.prototype.attributeMap, {
				title: [
					{ node: "titleNode", type: "innerHTML" },
					{ node: "titleBar", type: "attribute" }
				],
				"aria-describedby":""
			})
,			_setTitleAttr: [
				{ node: "titleNode", type: "innerHTML" },
				{ node: "titleBar", type: "attribute" }
			]
		});

		this.getDojo().declare("dijit.davinci.themeEditor.Tooltip", mixins, {
			templateString: dojo.cache("dijit", "templates/Tooltip.html", "<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n")
		});
		this.setHeader({
			title: data.title,
			metas: data.metas,
			scripts: data.scripts,
			modules: data.modules,
			styleSheets: data.styleSheets,
			theme: data.theme,
			bodyClasses: data.bodyClasses,
			style: data.style
		});
		content = data.content || "";
		var containerNode = this.getContainerNode();
		var active = this.isActive();
		if(active){
			this.select(null);
			dojo.forEach(this.getTopWidgets(), this.detach, this);
		}
		var escapees = [],
			scripts = {},
			dvAttributes = {},
			promise = new Deferred();
		dojo.forEach(this.getTopWidgets(), function(w){
			if(w.getContext()){
				w.destroyWidget();
			}
		});
		containerNode.innerHTML = content;
		dojo.forEach(dojo.query("*", containerNode), function(n){
			var type =  n.getAttribute("data-dojo-type") || n.getAttribute("dojoType") || /*n.getAttribute("oawidget") ||*/ n.getAttribute("dvwidget");
			this.loadRequires(type, false/*doUpdateModel*/, true/*doUpdateModelDojoRequires*/); //TODO: use Deferred?
			//this.loadRequires(n.getAttribute("dojoType"));
		}, this);
		this.getGlobal()["require"]("dojo/ready")(function(){
			try {
				this.getGlobal()["require"]("dojo/parser").parse(containerNode);
				promise.resolve();
			} catch(e) {
				// When loading large files on FF 3.6 if the editor is not the active editor (this can happen at start up
				// the dojo parser will throw an exception trying to compute style on hidden containers
				// so to fix this we catch the exception here and add a subscription to be notified when this editor is seleected by the user
				// then we will reprocess the content when we have focus -- wdr
				
				// remove all registered widgets, some may be partly constructed.
				var localDijit = this.getDijit();
				localDijit.registry.forEach(function(w){
					  w.destroy();
				});
				this._editorSelectConnection = dojo.subscribe("/davinci/ui/editorSelected",  dojo.hitch(this, this._editorSelectionChange));

				promise.reject();
				throw e;
			}
		}.bind(this));
		if(active){
			dojo.query("> *", this.rootNode).map(davinci.ve.widget.getWidget).forEach(this.attach, this);
		}
		// remove the styles from all widgets and subwidgets that supported the state
		dojo.query('.dvThemeWidget').forEach(this.theme.removeWidgetStyleValues);
			// set the style on all widgets and subwidgets that support the state
			//this._themeEditor._theme.setWidgetStyleValues(widgets[i],this._currentState);
		return promise;
	},
	
	attach: function(widget){
		this.inherited(arguments);
		if(!widget || widget.internal || !widget._srcElement){
			return;
		}
		var isThemeWidget = false;
		var classes = widget.getClassNames();
		if (classes && classes.indexOf('dvThemeWidget') > -1){
			isThemeWidget = true;
		}

		widget.dvAttributes = {
			isThemeWidget: isThemeWidget
		};
		if (isThemeWidget) {
            if (this._widgets.indexOf(widget) === -1) {
            	this._widgets.push(widget);
            }
		}
	},
	
	getThemeMeta: function(){
		if(!this._themeMetaCache) {
			this._themeMetaCache = Library.getThemeMetadata(this.theme);
		}

		return this._themeMetaCache;
	},

	select: function(widget, add){
	
		if(!widget  || widget==this.rootWidget){
			this._selectedWidget = null;
			if(!add){
				this.deselect(); // deselect all
			}
			return;
		}
		this._selectedWidget = widget;

		var selection = undefined;
		var index = undefined; 
		if(add && this._selection){
			index = this._selection.length;
			selection = this._selection;
			selection.push(widget);
		}else{
			selection = [widget];
		}
		var selectionChanged = false;
		if(!this._selection || this._selection.length > 1 || selection.length > 1 ||
				selection[0] != this._selection[0]){
			this._selection = selection;
			selectionChanged = true;
		}
		this.updateFocus(widget, index);

		if(selectionChanged){
			this.onSelectionChange(this.getSelection());
		}
	},
	
	onSelectionChange: function(selection){
		if (!this._forceSelectionChange) {
			/*
			 * This can be called from onContentChange in ve/context
			 * So in that case we don't want to deslect the subwidget
			 */
			this.visualEditor._themeEditor._selectedSubWidget = null;
		}
		this.inherited(arguments);
	},
	
	getStyleAttributeValues: function(widget){
		/* no style attributes for theme editor */
		return [];
	},
	
	_restoreStates: function(){
	    
	},

	_configDojoxMobile: function() {
	     // override base

	},
	 
	/*
	* @returns the path to the file being edited
	*/
	getPath: function(){
	    
	    /*
	     * FIXME:
	     * We dont set the path along with the content in the context class, so
	     * have to pull the resource path from the model.  
	     * 
	     * I would rather see the path passed in, rather than assume the model has the proper URL,
	     * but using the model for now.
	     * 
	     */
	    /*theme editor sets the file name to DEFAULT_PAGE
	     * so use the path theme file to find the html
	     *
	     */  
	    var path = this.theme.file.getPath();
	    path = path.substring(0, path.lastIndexOf('/'));
	    path = path + '/' + this.theme.themeEditorHtmls[0];
	    return path;
	},

	getFullResourcePath: function() {
		return this.visualEditor.basePath;
	},
	
	widgetAddedOrDeleted : function(){}
	
});
});


},
'davinci/ve/themeEditor/commands/SubwidgetChangeCommand':function(){
define([
    	"dojo/_base/declare",
    	"davinci/ve/themeEditor/commands/ThemeEditorCommand"
], function(declare, ThemeEditorCommand){


return declare("davinci.ve.themeEditor.commands.SubwidgetChangeCommand", [ThemeEditorCommand], {

	constructor: function(args){
		dojo.mixin(this, args);
	},
	
	execute: function(){
		this._old__selectedWidget = this._themeEditor._selectedWidget;
		this._old_selectedSubWidget = this._themeEditor._selectedSubWidget;
		this._themeEditor._selectedSubWidget = this._subwidget;
		this.updatePropertiesView();
		this._themeEditor.deselectSubwidget(this._old__selectedWidget,this._old_selectedSubWidget);
		this._themeEditor.selectSubwidget(this._themeEditor._selectedWidget,this._themeEditor._selectedSubWidget);
		if (this._redo){
			dojo.publish("/davinci/ui/subwidgetSelectionChanged",[{subwidget: this._themeEditor._selectedSubWidget, origin: this.declaredClass}]);
		}else {
			this._redo = true; // executes only happen on redos after first run....
		}
		
	},
	undo: function(){
		this._themeEditor.deselectSubwidget(this._themeEditor._selectedWidget,this._themeEditor._selectedSubWidget);
		this._themeEditor.selectSubwidget(this._old__selectedWidget,this._old_selectedSubWidget);
		this._themeEditor._selectedWidget = this._old__selectedWidget;
		this._themeEditor._selectedSubWidget = this._old_selectedSubWidget;
		this.updatePropertiesView();
		// need to update the context menu
		dojo.publish("/davinci/ui/subwidgetSelectionChanged",[{subwidget: this._themeEditor._selectedSubWidget, origin: this.declaredClass}]);

	
	}
});
});
}}});
define("davinci/ve/themeEditor/ThemeEditor", [
    "dojo/_base/declare",
	"dojo/_base/connect",
	"davinci/ui/ModelEditor",
	"davinci/ve/ThemeModifier",
	"davinci/ve/themeEditor/VisualThemeEditor",
	"davinci/ve/themeEditor/metadata/query",
	"davinci/ve/themeEditor/metadata/CSSThemeProvider",
	"davinci/ve/themeEditor/commands/ThemeEditorCommand",
	"davinci/ve/themeEditor/commands/SubwidgetChangeCommand",
	"davinci/ve/themeEditor/commands/StateChangeCommand",
	"dijit/layout/ContentPane",
	"davinci/commands/CompoundCommand",
	"davinci/ve/themeEditor/ThemeColor",
	"davinci/ve/utils/GeomUtils",
	"system/resource",
	"davinci/model/Path",
	], function(
			declare,
			connect,
			ModelEditor,
			ThemeModifier,
			VisualThemeEditor,
			query,
			CSSThemeProvider,
			ThemeEditorCommand,
			SubwidgetChangeCommand,
			StateChangeCommand,
			ContentPane,
			CompoundCommand,
			ThemeColor,
			GeomUtils,
			systemResource,
			Path
	){

return declare("davinci.ve.themeEditor.ThemeEditor", [ModelEditor/*, ThemeModifier*/], {
	
	children : [], //FIXME: shared array
	visualEditor : null, 
	_currentState: "Normal", // the state is for all the widgets on the page
	_dirtyResource : {},
	_subWidgetSelection:null,
	_theme:null,
	_tempRules : {}, // FIXME: shared object
	_subscriptions : [], // FIXME: shared array
	__DEBUG_TO_CONSOLE : false,
	_shortHands: ['border', 'padding', 'margin', 'background','font', 'list-style'],
	
	
	constructor: function (element) {
		
		this.inherited(arguments);
		var themeEditor = this;
		this.editorContainer = dijit.getEnclosingWidget(element);
		this._cp = new ContentPane({}, element);
		this.domNode = this._cp.domNode;
		this.domNode.className = "ThemeEditor fullPane";
		this._loadedCSSConnects = [];
		this.subscribe("/davinci/ui/editorSelected", this._editorSelected.bind(this));
		this.subscribe("/davinci/ui/context/loaded", this._contextLoaded.bind(this));
		this.editorContainer.connect(this.editorContainer, 'resize', function(newPos){
			// "this" is the EditorContainer/ContentPane dijit
			var iframe = dojo.query('iframe', this.domNode)[0];
			if(iframe && iframe.contentDocument && iframe.contentDocument.body){
				var bodyElem = iframe.contentDocument.body;
				// Wrapped in setTimeout because sometimes browsers are quirky about
				// instantly updating the size/position values for elements
				// and things usually work if you wait for current processing thread
				// to complete. Also, updateFocusAll() can be safely called within setTimeout.
				setTimeout(function() {
					var context = this.getContext();
					context.clearCachedWidgetBounds();
					context.updateFocusAll(); 
				}.bind(this), 100); 
				themeEditor._registerScrollHandler();
			}
		}.bind(this));
	},
	
	_editorSelected: function(event){
		var context = this.getContext();
		if(this == event.oldEditor){
			context.hideFocusAll();
		}
		if(event.editor && event.editor.editorContainer && 
				(event.editor.declaredClass == 'davinci.ve.PageEditor' ||
				event.editor.declaredClass == 'davinci.ve.themeEditor.ThemeEditor')){
			if(this == event.editor){
				this._registerScrollHandler();
			}
		}
	},
	
	onResize: function(){
		var context = this.getContext();
		var widget = this.getSelectedWidget();
		context.select(widget, false); // at least for V0.6 theme editor does not support multi select .select(widget, false); // at least for V0.6 theme editor does not support multi select 
	},
	
	getSelectionProperties: function(updateContext){
		if(!this._selectedWidget) {
			return [{editor:this, widget:null, subwidget:null, cssValues: null, computedCssValues:null, appliesTo:['theme'], context:this.context }];
		}
		
		 var v = this._getSelectionStyleValues(); 
		 var domNode;
			var rules = this._getCssRules();
			this._rebaseCssRuleImagesForStylePalette(rules, v);
		 
		 
		 var widgetType = this._selectedWidget.type;
		 var domNode = this._theme.getDomNode(this._selectedWidget.domNode, widgetType, this._selectedSubWidget);
		 var allStyle = dojo.getComputedStyle(domNode);
		 
		 return {editor:this, widget:this._selectedWidget, subwidget:this._selectedSubWidget, cssValues: v, computedCssValues:allStyle, appliesTo:['theme'], context:this.context};
		
	}, 


	_widgetStateChanged : function (e){
		if(!this.isActiveEditor() || !e) {
			return;
		}
		if (e.origin && e.origin.indexOf("davinci.ve.themeEditor.commands.")>-1){
			//then message was generated by undo or redo so bail.
			return;
		}
		/* #23 if (this._currentSelectionRules) {
			delete this._currentSelectionRules;
		}*/
		var widget = e.widget;
		if (widget && widget.processingUndoRedo){
			delete widget.processingUndoRedo; // this is a hack to get around the event firing on a undo from the outline view
			return;
		}

		this.getContext().getCommandStack().execute(new StateChangeCommand({_themeEditor: this,
			_widget: widget, _newState: e.newState, _oldState: e.oldState, _firstRun: true
		}));
		
		
	},
	
	selectSubwidget: function(widget, subwidget){
		if (!widget || !subwidget || subwidget == 'WidgetOuterContainer') { return; }
		var widgetType = this._theme.getWidgetType(widget);
		var domNode = this._theme.getDomNode(widget.domNode, widgetType, subwidget);
		var box = this.getRelativeBox(domNode);
		var frame = this.getContext().getDocument().createElement("div");
		frame.className = "editSubwidgetFocusFrame";
		frame.id = "editSubwidgetFocusFrame";
		frame.style.position = "absolute";
		var padding = 2; // put some space between the subwidget and box
		frame.style.width = domNode.offsetWidth + (padding * 2) + "px";
		frame.style.height = domNode.offsetHeight + (padding * 2) + "px";
		frame.style.top =  (box.t - padding) + "px";
		frame.style.left = (box.l - padding) + "px"; 
		frame.style.padding = padding + 'px';
		frame.style.display = "block";
		this._selectedWidget.domNode.parentNode.appendChild(frame);
		this._subWidgetFocusFrame = frame;

	},
	
	deselectSubwidget: function(widget, subwidget){
//		if (!widget || !subwidget) { return; }
		if (this._subWidgetFocusFrame){
			this._subWidgetFocusFrame.parentNode.removeChild(this._subWidgetFocusFrame);
			this._subWidgetFocusFrame = null;
		}

	},
	
	_subwidgetSelectionChanged: function (e){


		if (e.origin && e.origin.indexOf("davinci.ve.themeEditor.commands.")>-1){
			//then message was generated by undo or redo so bail.
			return;
		}
		/*#23 if (this._currentSelectionRules) {
			delete this._currentSelectionRules;
		}*/
	
		if(!this.isActiveEditor() ||  !(this._selectedWidget || this._selectedSubWidget) ) { return; }
		if (e.subwidget == 'WidgetOuterContainer') {
			e.subwidget = null;
		}
		this.getContext().getCommandStack().execute(new SubwidgetChangeCommand({_themeEditor: this,
			_subwidget: e.subwidget
		}));
		
	},
	
	_getSelectionStyleValues: function (){
		//debugger;;
		
		var rules=this._getCssRules();
		if(rules.length==0) {
			return null;
		}
		var allProps = {};
		for(var s = 0; s < rules.length; s++){
			var rule=rules[s];
			for(var p = 0;p<rule.properties.length;p++){
				//if(!allProps[rule.properties[p].name]){ // set to first found
					allProps[rule.properties[p].name] = rule.properties[p].value;
				//}
			}
		}
		allProps = this.convertShortHandProps(allProps);
		return allProps;
	},
	
	addShortHandProps: function (values){
		var shortHands = this._shortHands;
		var styleStr = '';
		for (a in values){
			styleStr = styleStr + ' ' + a + ': ' + values[a] + ';';
		}
		var e = dojo.doc.createElement('div');
		e.style.cssText = styleStr;
//		for (var i = 0; i<shortHands.length; i++){
//			var sh = shortHands[i];
//			if (e.style[sh]){
//				values[sh] = e.style[sh];
//			}
//		}
		for (v in values){
			var name = dashedToCamel(v);
			if (e.style[name]){
				values[v] = e.style[name];
			}
		}

		return values;
		
		function dashedToCamel (str){
			return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
		}
	},
	
	convertShortHandProps: function (props){
		var shortHands = this._shortHands;
		//var shortHands = ['border', 'padding', 'margin', 'background','font', 'list-style'];
		for (var x = 0; x<shortHands.length; x++){
			var sh = shortHands[x];
			if(props[sh]){
				var e = dojo.doc.createElement('div');
				e.style.cssText = sh + ': '+ props[sh] + ';';
				var i = 0;
				for (n in e.style){
					if (n.indexOf(sh)>-1){
						var name = camelCaseToDashed(n);
						if (e.style[n])
							props[name]= e.style[n];
					}
				}
			}
		}
	
		function camelCaseToDashed(str){
			return str.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
		}

		
		
		function cssNameToJSName(val) {

	        var newVal = '';
	        val = val.split('-');
	        // do not upppercase first word
	        newVal += val[0].substring(0,1).toLowerCase() + val[0].substring(1,val[0].length);
	        for(var c=1; c < val.length; c++) {
	        	if(val[c] != 'value' )
	                newVal += val[c].substring(0,1).toUpperCase() + val[c].substring(1,val[c].length);
	        }
	        return newVal;
		}
		
		return props;
	},
	
	_getCssRules: function (widget, subWidget, state){
		//debugger;;
		/* #23 if (this._currentSelectionRules) {
			return this._currentSelectionRules;
		}*/
		if (!subWidget) { subWidget = null; }
		var selectors = this._loadCssSelectors(widget, subWidget, state);
		var rules = [];
		if(!selectors) {
			return null;
		}
		var allProps = {};
		for(var s = 0; s < selectors.length; s++){
			var cssFiles = this.getContext()._getCssFiles();
			if (cssFiles){
				for(var i = 0;i<cssFiles.length;i++){
					var selectorNodes = cssFiles[i].getRules(selectors[s]);
					for (sn = 0; sn < selectorNodes.length; sn++){
						var selectorNode = selectorNodes[sn];
						if(selectorNode){
							var rule = selectorNode.searchUp( "CSSRule");
							if(rule){
								rules.push(rule);
							}
						}
					}
				}
			}
		}
		/*#23 if (rules.length > 0) {
			this._currentSelectionRules = rules;
		}*/
		return rules;
	},
	
	focus : function (){
		
		this.onSelectionChange([this.getSelectedWidget()]);
		
	},
	supports : function (something){
		// Note: the propsect_* values need to match the keys in SwitchingStyleView.js
		var regex = /^style|states|propsect_layout|propsect_paddingMargins|propsect_background|propsect_border|propsect_fontsAndText$/;
		return something.match(regex) ? true : false;
	},
	
	onSelectionChange : function(a){

 		if(!this.isActiveEditor() || !a || !a[0]) { return; }
		if(this._selectedWidget && (this._selectedWidget.id == a[0].id)) {
			return; // the object is already selected, the only timeI have seen this is on a redo command
		}
		/* #23 if (this._currentSelectionRules) {
			delete this._currentSelectionRules;
		}*/
		this.getContext().getCommandStack().execute(new ThemeEditorCommand({_themeEditor: this,
			_widget: a, _firstRun: true

		}));


	},
	getSelectedWidget : function(){
		
		var context = this.getContext();
		
		var selection = context.getSelection();
		var widget = (selection.length > 0 ? selection[selection.length - 1] : undefined);
		if(selection.length > 1){
			context.select(widget);
		}
		return widget;
	},
	getSelectedSubWidget : function(){
		if(this._selectedSubWidget){
			return this._selectedSubWidget;
			
		}
	},
	
	_loadCssSelectors : function(widget, subWidget, state){
		//debugger;;
		var context = this.getContext();
		if (!widget){
			widget = this._selectedWidget;
			if (!subWidget){
				subWidget = this.getSelectedSubWidget();
			}
		}
		if(!widget) {
			return null;
		}
		
		var widgetType = this.metaDataLoader.getType(widget);
		
		if(!widgetType)
			return null;

		var id = widget.id;
		if(id.indexOf('all') === 0){ // this is a  mythical widget used for global change of widgets 
			widgetType = widgetType + '.$' + id; // add this to the end so it will match the key in the metadata
		}
		
		
		if (!state){
			state = this._currentState; // the state is for all the widgets on the page
		}
	
		if(!state)
			state = "Normal";
		var allClasses = [];
		if(this.__DEBUG_TO_CONSOLE) console.log("[theme editor] query metadata, widget: " + widget.declaredClass + " subwidget:" + subWidget  + " state:" + state);
		var metadata = this._theme.getStyleSelectors(widgetType,state,subWidget);
		
		for(var aa in metadata){
			
			allClasses.push(aa);
		}

		return allClasses; // wdr array of selectors

	},
	
	_addCommandsForValue : function(command, widget, subWidget, state, value, property){
		if (!command){
			command = new CompoundCommand();
		}
		var deltaRules = [];
		var rules = this.getRules(widget, subWidget, state);
		for (var r = 0; r < rules.length; r++){
			var rule = rules[r];
			if(/*!property ||*/ this._theme.isPropertyVaildForWidgetRule(rule,property,this._selectedWidget, subWidget, state)){
				var deltaRule = this.getContext().getDeltaRule(rule);
				deltaRules[deltaRule.getSelectorText()] = deltaRule;
				
			}
		}
		for (var dRule in deltaRules){
			var oldRule = value.appliesTo.rule; // save to put back 
			value.appliesTo.rule = null; //null to keep clone from throwing stack
			cValue = dojo.clone(value); // clone becouse the rule will change
			cValue.appliesTo.rule = deltaRules[dRule]; // create delta if needed #23
			value.appliesTo.rule = oldRule;
			// adjust the path of any url
			cValue.values.forEach(function(value){
				if(value[property] && value[property].indexOf("url('") == 0){
					/*
					 * The old rule may be in a differnt file than the delta rule
					 * So e need to update the realivie path to the file in realtion to 
					 * the CSS file the delta rule is in.
					 */
					// starts with url
					//find the resource
					var strArray = value[property].split("'"); // Becouse this comes from the property palette the format is always url('....')
					var url = strArray[1];
					if (url.indexOf('http://') > -1){
						// no need to adjust path.
						return;
					}
					var imageFilePath = oldRule.parent.url.substring(0, oldRule.parent.url.lastIndexOf("/")) + '/' + url;
					var file = systemResource.findResource(imageFilePath);
					var filePath = new Path(file.getPath());
					var relFilePath = filePath.relativeTo(cValue.appliesTo.rule.parent.url, true);
					value[property] = "url('"+relFilePath+"')";
				}
			}.bind(this));
			
			command.add(this.getContext().getCommandForStyleChange(cValue));
		}
		return command;
	},
	
    _propertiesChange : function (value){
 	
		if(!this.isActiveEditor()) { return; }
		var command = new CompoundCommand();
		if (this._selectedWidget.id === 'all'){
			var colorValues = [];
			//this._rules = [];
			this._oldValues = [];
			for(var i=0; i < value.values.length; i++){
				var arritem = value.values[i];
				for (var v in arritem){
					if (v.indexOf('color')> -1){
						colorValues[v] = arritem[v];
					}
				}
			}
			var widgetMetadata = this._theme.getMetadata(this._theme.getWidgetType(this._selectedWidget));
			for (var c in widgetMetadata.states){
				if (c != 'Normal'){
					var setColorValues = dojo.clone(colorValues);
					for (var prop in setColorValues){
						var nColor;
						var hColor;
						if (widgetMetadata.states.Normal.defaults && widgetMetadata.states.Normal.defaults.cssPropery)
							nColor = widgetMetadata.states.Normal.defaults.cssPropery[prop];
						if (widgetMetadata.states[c].defaults && widgetMetadata.states[c].defaults.cssPropery)
							hColor = widgetMetadata.states[c].defaults.cssPropery[prop];
						var color = setColorValues[prop];
						if(nColor && hColor && color){
							var baseColor = new ThemeColor(color);
							var calcColor = baseColor.calculateHighlightColor(nColor, hColor);
							setColorValues[prop] = calcColor.toHex();
							for(var i=0; i < value.values.length; i++){
								var values = value.values[i];
								for (name in values){
									if (setColorValues[name]){
										values[name] = setColorValues[name];
									}
								}
							}
							for(var i=0;i<value.values.length;i++){
								for(var a in value.values[i]){
									command = this._addCommandsForValue(command, this._selectedWidget, this._selectedSubWidget, c, value, a);
								}
							}
						} 
					}
				} else {
					//Normal
					for(var i=0;i<value.values.length;i++){
						for(var a in value.values[i]){
							command = this._addCommandsForValue(command, this._selectedWidget, this._selectedSubWidget, this._currentState, value, a);
						}
					}
				}
			}
		} else {
			for(var i=0;i<value.values.length;i++){
				for(var a in value.values[i]){
					command = this._addCommandsForValue(command, this._selectedWidget, this._selectedSubWidget, this._currentState, value, a);
				}
			}
						
		}

		if (this._selectedWidget){
			this.getContext().getCommandStack().execute(command);
		}
		this.setDirty(true);
	},
	

	
	_rebaseCssRuleImagesForStylePalette: function(rules, values){ // the style palete assumes the basedir for images user/. where css in relation to the file.
		//debugger;;
		if (!rules) { return values; }
		for (var r=0; r < rules.length; r++){
			var rule = rules[r];
			for(var a in values){
				var propValue = rule.getProperty(a);
				if (propValue){ // only rebase urls for this rule.
					var url=propValue.getURL();
					if (url)
						values[a] = url;
				}
			}
		}
		return values;
		
	},

	
	_markDirty : function (file){

		this._dirtyResource[file] = new Date().getTime();;
		this._srcChanged();
		
	},
	

	

	_srcChanged : function(){
		//this.isDirty=true;
		
		/* here's a huge hack to mark the .theme file as dirty when the source changes */
		if (!this.isDirty){ // only need to mark dirty once
			if (this._themeFileContent){ //only set if we have some content
				this.resourceFile.setContents(this._themeFileContent, true);
			}else {
				console.error('ThemeEditor.theme file content empty');
				this._themeFileContent = this.resourceFile.getContentSync();
			}
		}
		this.isDirty=true;
		
		this.lastModifiedTime=new Date().getTime();
		if (this.editorContainer)
			this.editorContainer.setDirty(true);
	},
	
	setDirty: function(dirty){
		this.isDirty = dirty;
		if (this.editorContainer)
			this.editorContainer.setDirty(dirty);
	},
	
	getContext : function (){
    	return this.visualEditor ? this.visualEditor.context : null;
    },
	
	getOutline : function (){
		return this.visualEditor.getOutline();
	},
	
	getPropertiesView : function (){
		return this.visualEditor.getPropertiesView();
	},
	getThemeFile : function(){
		return this.theme;
	},
	

	
	setContent : function (filename, content) {

		try{
			this._themePath=new davinci.model.Path(filename);
//			this._URLResolver = new davinci.ve.utils.URLResolver(filename);
			
			this.theme = dojo.isString(content)? dojo.fromJson(content) : content;
			this.theme.file = system.resource.findResource(filename);
			//dojo.connect(this.visualEditor, "onSelectionChange", this,"onSelectionChange");
			this.themeCssFiles = [];
			for(var i = 0;i<this.theme.files.length;i++){
				if(this.theme.files[i].indexOf(".css")>-1){
					this.themeCssFiles.push(this.theme.files[i]);
				}
			}
			
			/*
			 * resolve theme html in the user workspace.
			 */
			var themeHtmlResources = [];
			
			for(var y = 0;y<this.theme.themeEditorHtmls.length;y++){
				var absoluteLocation = this._themePath.getParentPath().append(this.theme.themeEditorHtmls[y]).toString();
				themeHtmlResources.push(system.resource.findResource(absoluteLocation));
				
			}

			this.visualEditor = new VisualThemeEditor(this, this._cp.domNode,filename, this.themeCssFiles, themeHtmlResources,this.theme);
			
			this.fileName = filename;
			
			/*
			 * resolve metadata in the user workspace.
			 */
			var metaResources = [];
			var context = this.getContext();
			context._themePath = this._themePath;
			context.themeCssFiles = this.themeCssFiles;
			for(var i = 0;i<this.theme.meta.length;i++){
				metaResources.push(context._getThemeResource(this.theme.meta[i]));
				
			}
			
			this.metaDataLoader = new query(metaResources);
			this._theme = new CSSThemeProvider(metaResources, this.theme);
			// connect to the css files, so we can update the canvas when the model changes
			var cssFiles = context._getCssFiles();	
			
			for (var i = 0; i < cssFiles.length; i++) {
				this._loadedCSSConnects.push(dojo.connect(cssFiles[i], 'onChange', context,'_themeChange'));

            }
			this._themeFileContent = this.resourceFile.getContentSync(); // get the content for use later when setting dirty. Timing issue

			var subs = this._subscriptions;
			subs.push(dojo.subscribe("/davinci/ui/styleValuesChange", this,
			        '_propertiesChange'));
			subs.push(dojo.subscribe("/davinci/states/state/changed", this,
			        '_widgetStateChanged'));
			subs.push(dojo.subscribe("/davinci/ui/subwidgetSelectionChanged",
			        this, '_subwidgetSelectionChanged'));
			dojo.connect(this.visualEditor, "onSelectionChange", this,
			        "onSelectionChange");
		}catch(e){
			alert("error loading:" + filename + e);
			//delete this.tabs;
		}
	},

	getDefaultContent : function (){
		/* a template file should be specified in the extension definition instead
		 * 
		 */
		//return this.visualEditor.getDefaultContent();
	},

	selectModel : function (selection){

	},
	getFileEditors : function(){
		function getVisitor(dirtyResources, urlResolver, results) {
			return {
				lookFor : dirtyResources,
				urlResolver : urlResolver,
				result : results,
				_getObject :function(resource, text, lastModified){	
					return {resourceFile: resource, getText : function(){ return text; }, lastModifiedTime:lastModified };
				},
				visit : function(node){
					if(node.elementType=="CSSFile"){
						for(var aa in this.lookFor){
							if(aa==node.url){
								var resource=  system.resource.findResource(aa);
							
								this.result.push(this._getObject(resource, node.getText({noComments:false}), this.lookFor[aa]  ));
								//delete this.lookFor[aa]; we dont want to delete on autosave
								break;
							}
						}
					}
				return (this.lookFor.length<=0);
				}
			
			};
			
		
			
		};
		var results = [];
		var cssFiles = this.getContext()._getCssFiles();
		var visitor = getVisitor(this._dirtyResource, this._URLResolver, results);
		if (cssFiles){
			for(var i=0;i<cssFiles.length;i++){
				cssFiles[i].visit(visitor);
			}
		}
		
		/* add the .theme file to the workingCopy resources so that its removed */
		
		results.push({
			resourceFile: this.resourceFile,
			getText: function(){ return this.resourceFile.getContentSync(); },
			lastModifiedTime: Date.now()
		});
		return results;
		
	},
	save : function (isWorkingCopy){

		this.getContext().saveDynamicCssFiles(this.getContext()._getCssFiles(), isWorkingCopy);
		if(!isWorkingCopy) {
			this.isDirty=false;
		}
		if (this.editorContainer && !isWorkingCopy) {
			this.editorContainer.setDirty(false);
		}

	},
	removeWorkingCopy: function(){
		/*this.removeWorkingCopyDynamicCssFiles(this.getContext()._getCssFiles());
		this.resourceFile.removeWorkingCopy();
		this.isDirty=false;*/
		
	},

	destroy : function ()	{
	    if(this._scrollHandler){
	    	dojo.disconnect(this._scrollHandler);
	    	this._scrollHandler = null;
	    }
		this.inherited(arguments);
		if(this.visualEditor) { this.visualEditor.destroy(); }
		this.getContext().destroy();
		this._subscriptions.forEach(function(item) {
			dojo.unsubscribe(item);
		});
		if (this._loadedCSSConnects) {
			dojo.forEach(this._loadedCSSConnects, dojo.disconnect);
			delete 	this._loadedCSSConnects;
		}
		delete this._tempRules;
	},
	
	getText : function () {
		return dojo.toJson(this.theme, true);		
	},
	
	disableWidget: function(widget) {
		if (!widget) { return; }

		var frame = this.getContext().getDocument().getElementById("enableWidgetFocusFrame_" + widget.id); 
		if (frame){
			frame.parentNode.removeChild(frame);
		}
		//create
		this._createFrame(widget, 'disableWidgetFocusFrame_', 'disableWidgetFocusFrame');
	},
	
	_createFrame: function(widget, id, className){
		if (!widget) { return; }
		var frame = this.getContext().getDocument().getElementById(id + widget.id); 
		if (frame){
			return; // frame already exists 
		}
		var domNode = widget;
		if (widget.domNode)
			domNode = widget.domNode;

		var frame = this.getContext().getDocument().createElement("div");
		dojo.connect(frame, "onmousedown", this, "editFrameOnMouseDown");
		var containerNode = this.getContext().getContainerNode(); // click in white space
		dojo.connect(containerNode, "onmousedown", this, "canvasOnMouseDown");// click in white space
		frame.className = className;
		frame.id = id + widget.id;
		frame.style.position = "absolute";
		var box = this.getRelativeBox(domNode);
		frame.style.top = box.t + "px";
		frame.style.left = box.l + "px";
		frame.style.width = box.w + "px";
		frame.style.height = box.h + "px";
		frame.style.display = "block";
		frame._widget = widget;
		domNode.parentNode.appendChild(frame);
	},
	
	getRelativeBox: function(domNode){

		var realleft =0;
		var realtop = 0;
		var obj = domNode;
		if (obj.offsetParent) {
			do {
			    if (obj.className.indexOf('theming-widget') > -1){
                    // using ralitve div for postion
                    realtop = domNode.offsetTop; 
                    realleft = domNode.offsetLeft;
                    break;
                }
				realleft += obj.offsetLeft;
				realtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return {t:realtop, l:realleft, w:domNode.offsetWidth, h:domNode.offsetHeight};
	},
	
	canvasOnMouseDown: function(event){
		//console.log('ThemeEditor:canvasOnMouseDown');
		 // we should only get here when the canvas is clicked on, deslecting widget	
	    var t = davinci.ve.widget.getEnclosingWidget(event.target);
        if (event.target.id.indexOf('enableWidgetFocusFrame_') >-1){
            t = event.target._widget;
        }
        var widget =  t ;
        while(widget){
            if (widget.dvAttributes && widget.dvAttributes.isThemeWidget && widget.getContext() ){ // managed widget
                return; // break;
            }
            widget = davinci.ve.widget.getEnclosingWidget(widget.domNode.parentNode);
        }
        

		if (this._selectedWidget && (event.target.className.indexOf('editFeedback') < 0)){ // #1024 mobile widgets click through
			event.stopPropagation();
			var a = [null];
			/*#23 if (this._currentSelectionRules) {
				delete this._currentSelectionRules;
			}*/
			this.getContext().getCommandStack().execute(new ThemeEditorCommand({_themeEditor: this,
				_widget: a, _firstRun: true

			}));
			this.getContext().select(null, false);


		}
	},
	
	editFrameOnMouseDown: function(event){
		event.stopPropagation(); 
		if(this.getContext()._activeTool && this.getContext()._activeTool.onMouseDown){
			this.getContext()._activeTool.onMouseDown(event);
		}
	},
	
	enableWidget: function(widget){

		if (!widget) { return; }
		var domNode = widget;
		if (widget.domNode) {
			domNode = widget.domNode;
		}
		var frame = this.getContext().getDocument().getElementById("disableWidgetFocusFrame_" + widget.id); 
		if (frame){
			frame.parentNode.removeChild(frame);
		}
		this._createFrame(widget, 'enableWidgetFocusFrame_', 'enableWidgetFocusFrame');
	},
	
	getRules: function(widget, subwidget, state){

		var selectors = this._loadCssSelectors(widget, subwidget, state);
		var rules = [];
		for (var s = 0; s < selectors.length; s++) {
			var modified = false;
			var cssFiles = this.getContext()._getCssFiles();
			if (cssFiles){
				for(var i = 0;i<cssFiles.length;i++){
					var selectorNodes = cssFiles[i].getRules(selectors[s]);
					for (var sn = 0; sn < selectorNodes.length; sn++){
						var selectorNode = selectorNodes[sn];
						if(selectorNode){
							var rule = selectorNode.searchUp( "CSSRule");
							if(rule){
								rules.push(rule);
								modified = true;
							}
						}
					}
				}
			}
			if(!modified){
				console.warn("[theme editor getRule] Rule not found in theme: " + selectors[s]);
			}
		}
		return rules;
	},
	
	_contextLoaded: function(context){
		if(context == this.getContext()){
			this._registerScrollHandler();
		}
	},

	_registerScrollHandler: function(){
		var context = this.getContext();
		if(!this._scrollHandler){
			var editorContainer = this.editorContainer;
			var iframe = dojo.query('iframe', editorContainer.domNode)[0];
			if(iframe && iframe.contentDocument && iframe.contentDocument.body){
				var bodyElem = iframe.contentDocument.body;
				this._scrollHandler = dojo.connect(iframe.contentDocument, 'onscroll', this, function(e){
					// (See setTimeout comment a few lines earlier)
					setTimeout(function() {
						context.clearCachedWidgetBounds();
						context.updateFocusAll(); 
					}, 100); 
				});
			}
		}
	}


});
});
