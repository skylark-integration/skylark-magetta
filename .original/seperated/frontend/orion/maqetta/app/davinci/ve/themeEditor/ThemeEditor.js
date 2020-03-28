/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

//>>built
require({cache:{"davinci/ve/themeEditor/SelectTool":function(){
define("davinci/ve/themeEditor/SelectTool",["dojo/_base/declare","davinci/ve/widget","davinci/ve/tools/SelectTool","davinci/ve/themeEditor/commands/StateChangeCommand"],function(_1,_2,_3,_4){
return _1("davinci.ve.themeEditor.SelectTool",[_3],{onMouseDown:function(_5){
var t=_2.getEnclosingWidget(_5.target);
if(_5.target.id.indexOf("enableWidgetFocusFrame_")>-1){
t=_5.target._widget;
}
var _6=(this._getTarget()||t);
while(_6){
if(_6.dvAttributes&&_6.dvAttributes.isThemeWidget&&_6.getContext()){
break;
}
_6=_2.getEnclosingWidget(_6.domNode.parentNode);
}
if(!_6){
var _7=this._context.editor,_8=new _4({_themeEditor:_7,_widget:_7._selectedWidget,_newState:_7._currentState,_oldState:_7._oldState,_firstRun:true});
setTimeout(function(){
_8.execute();
},500);
return;
}
var _9=this._context.getSelection();
var _a=navigator.appVersion.indexOf("Macintosh")<0?_5.ctrlKey:_5.metaKey;
if(dojo.indexOf(_9,_6)>=0){
if(_a&&_5.button!==2){
this._context.deselect(_6);
}else{
if(_5.button!==2){
this._context.select(_6);
}
}
}else{
_6.subwidget=null;
this._context.select(_6,false);
_5.stopPropagation();
}
}});
});
},"davinci/ve/themeEditor/ThemeColor":function(){
define("davinci/ve/themeEditor/ThemeColor",["dojo/_base/declare"],function(_b){
return _b("davinci.ve.themeEditor.ThemeColor",[dojo.Color],{constructor:function(_c){
dojo.safeMixin(this,_c);
},toHsl:function(){
var r=this.r;
var g=this.g;
var b=this.b;
r/=255,g/=255,b/=255;
var _d=Math.max(r,g,b),_e=Math.min(r,g,b);
var h,s,l=(_d+_e)/2;
if(_d==_e){
h=s=0;
}else{
var d=_d-_e;
s=l>0.5?d/(2-_d-_e):d/(_d+_e);
switch(_d){
case r:
h=(g-b)/d+(g<b?6:0);
break;
case g:
h=(b-r)/d+2;
break;
case b:
h=(r-g)/d+4;
break;
}
h/=6;
}
return {h:h,s:s,l:l};
},setHsl:function(h,s,l){
var r,g,b;
if(s==0){
r=g=b=l;
}else{
function _f(p,q,t){
if(t<0){
t+=1;
}
if(t>1){
t-=1;
}
if(t<1/6){
return p+(q-p)*6*t;
}
if(t<1/2){
return q;
}
if(t<2/3){
return p+(q-p)*(2/3-t)*6;
}
return p;
};
var q=l<0.5?l*(1+s):l+s-l*s;
var p=2*l-q;
r=_f(p,q,h+1/3);
g=_f(p,q,h);
b=_f(p,q,h-1/3);
}
this.r=parseInt(r*255);
this.g=parseInt(g*255);
this.b=parseInt(b*255);
if(this.r>255){
this.r=255;
}
if(this.g>255){
this.g=255;
}
if(this.b>255){
this.b=255;
}
return {r:this.r,g:this.g,b:this.b};
},toHsv:function(){
var r=this.r;
var g=this.g;
var b=this.b;
r=r/255,g=g/255,b=b/255;
var max=Math.max(r,g,b),min=Math.min(r,g,b);
var h,s,v=max;
var d=max-min;
s=max==0?0:d/max;
if(max==min){
h=0;
}else{
switch(max){
case r:
h=(g-b)/d+(g<b?6:0);
break;
case g:
h=(b-r)/d+2;
break;
case b:
h=(r-g)/d+4;
break;
}
h/=6;
}
return {h:h,s:s,v:v};
},setHsv:function(h,s,v){
var r,g,b;
var i=Math.floor(h*6);
var f=h*6-i;
var p=v*(1-s);
var q=v*(1-f*s);
var t=v*(1-(1-f)*s);
switch(i%6){
case 0:
r=v,g=t,b=p;
break;
case 1:
r=q,g=v,b=p;
break;
case 2:
r=p,g=v,b=t;
break;
case 3:
r=p,g=q,b=v;
break;
case 4:
r=t,g=p,b=v;
break;
case 5:
r=v,g=p,b=q;
break;
}
this.r=r*255;
this.g=g*255;
this.b=b*255;
if(this.r>255){
this.r=255;
}
if(this.g>255){
this.g=255;
}
if(this.b>255){
this.b=255;
}
return {r:this.r,g:this.g,b:this.b};
},calculateHighlightColor:function(_10,_11){
var _12=new davinci.ve.themeEditor.ThemeColor(_10);
var _13=new davinci.ve.themeEditor.ThemeColor(_11);
var _14=new davinci.ve.themeEditor.ThemeColor("#FFFFFF");
var _15=_12.toHsl();
var _16=_13.toHsl();
var _17=this.toHsl();
var _18=new Object();
_18.h=_16.h-_15.h;
_18.s=_16.s-_15.s;
_18.l=_16.l-_15.l;
var h=_17.h+_18.h;
var s=_17.s+_18.s;
var l=_17.l+_18.l;
_14.setHsl(h,s,l);
return _14;
},getHoverColor:function(){
var _19=new davinci.ve.themeEditor.ThemeColor(normal);
var _1a=new davinci.ve.themeEditor.ThemeColor(highlight);
var _1b=new davinci.ve.themeEditor.ThemeColor("#FFFFFF");
var _1c=_19.toHsl();
var _1d=_1a.toHsl();
var _1e=this.toHsl();
var _1f=new Object();
_1f.h=_1d.h-_1c.h;
_1f.s=_1d.s-_1c.s;
_1f.l=_1d.l-_1c.l;
var h=0.3329565030146425;
var s=1;
var l=0.8588235294117648;
_1b.setHsl(h,s,l);
return _1b;
}});
});
},"davinci/ve/themeEditor/commands/StateChangeCommand":function(){
define("davinci/ve/themeEditor/commands/StateChangeCommand",["dojo/_base/declare","davinci/ve/themeEditor/commands/ThemeEditorCommand"],function(_20,_21){
return _20("davinci.ve.themeEditor.commands.StateChangeCommand",[_21],{constructor:function(_22){
dojo.mixin(this,_22);
},execute:function(){
this.old_selectedWidget=this._themeEditor._selectedWidget;
this.old_selectedSubWidget=this._themeEditor._selectedSubWidget;
this._themeEditor._currentState=this._newState;
var _23=null;
var _24=null;
if(!this._widgets){
this._widgets=this._themeEditor.getContext().getDocument().querySelectorAll(".dvThemeWidget");
}
var _25=this._widgets;
for(var i=0;i<_25.length;i++){
this._themeEditor.enableWidget(_25[i]._dvWidget);
if((!this._oldState)||(this._themeEditor._theme.isStateValid(_25[i]._dvWidget,this._oldState))){
this._themeEditor._theme.removeWidgetStyleValues(_25[i]._dvWidget,this._oldState);
}
if(this._themeEditor._theme.isStateValid(_25[i]._dvWidget,this._newState)){
this._themeEditor._theme.setWidgetStyleValues(_25[i]._dvWidget,this._newState);
}else{
this._themeEditor.disableWidget(_25[i]._dvWidget);
}
}
if(!this._firstRun){
this._widget.processingUndoRedo=true;
dojo.publish("/davinci/states/state/changed",[{editorClass:"davinci.themeEditor.ThemeEditor",widget:"$all",newState:this._newState,oldState:this._oldState,origin:this.declaredClass,context:this._themeEditor.context}]);
}
this._firstRun=false;
this.updatePropertiesView();
},undo:function(){
this._themeEditor._selectedWidget=this.old_selectedWidget;
this._themeEditor._selectedSubWidget=this.old_selectedSubWidget;
this._themeEditor._currentState=this._oldState;
var _26=this._widgets;
for(var i=0;i<_26.length;i++){
if(!this._themeEditor._theme.isStateValid(_26[i]._dvWidget,this._newState)){
this._themeEditor.enableWidget(_26[i]);
}
if(this._themeEditor._theme.isStateValid(_26[i]._dvWidget,this._oldState)){
this._themeEditor.enableWidget(_26[i]._dvWidget);
}else{
this._themeEditor.disableWidget(_26[i]._dvWidget);
}
this._themeEditor._theme.removeWidgetStyleValues(_26[i]._dvWidget,this._newState);
this._themeEditor._theme.setWidgetStyleValues(_26[i]._dvWidget,this._oldState);
}
this._widget.processingUndoRedo=true;
this.updatePropertiesView();
dojo.publish("/davinci/states/state/changed",[{editorClass:"davinci.themeEditor.ThemeEditor",widget:"$all",newState:this._oldState,oldState:this._newState,origin:this.declaredClass,context:this._themeEditor.context}]);
}});
});
},"davinci/ve/themeEditor/VisualThemeEditor":function(){
define("davinci/ve/themeEditor/VisualThemeEditor",["dojo/_base/declare","davinci/Runtime","davinci/Workbench","davinci/ve/themeEditor/Context","davinci/workbench/Preferences","davinci/model/Path","davinci/model/Factory","davinci/html/HTMLFile","davinci/Theme","dojo/i18n!davinci/ve/nls/ve","davinci/ve/utils/URLRewrite","dojo/_base/sniff"],function(_27,_28,_29,_2a,_2b,_2c,_2d,_2e,_2f,_30,_31,has){
return _27([],{constructor:function(_32,_33,_34,_35,_36,_37){
this.THEME_EDITOR_SPEC=1;
this._themeEditor=_32;
this.domNode=_33;
this.theme=_37;
var _38=_36[0];
this.basePath=new _2c(_38.getPath());
this.loadingDiv=dojo.create("div",{className:"loading",innerHTML:dojo.replace("<table><tr><td><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;{0}</td></tr></table>",["Loading..."])},this.domNode.parentNode,"first");
this._handles=[];
this.context=new _2a({editor:this._themeEditor,visualEditor:this,containerNode:this.domNode,baseURL:_31.encodeURI(_38.getURL()),theme:_37});
dojo.connect(this.context,"onSelectionChange",this,"onSelectionChange");
var _39=_2b.getPreferences("davinci.ve.themeEditor.editorPrefs",_29.getProject());
if(_39){
this.context.setPreferences(_39);
}
dojo.xhrGet({url:_31.encodeURI(_38.getURL()),handleAs:"text",sync:false,content:{}}).addCallback(dojo.hitch(this,function(_3a){
this.setContent("DEFAULT_PAGE",_3a,_35);
}));
},onSelectionChange:function(){
},destroy:function(){
},getDefaultContent:function(){
return "";
},getContent:function(){
return this.context.getSource();
},setContent:function(_3b,_3c,_3d){
if(this.theme.specVersion<this.THEME_EDITOR_SPEC){
var _3e="maqetta_"+this.theme.name+"_"+this.theme.specVersion;
var _3f=dojo.cookie(_3e);
if(!_3f){
dojo.cookie(_3e,"true");
this.themeVersionWarn();
}
}
if(!has("webkit")&&this.theme.type=="dojox.mobile"){
_29.showMessage(_30.vteWarningUnsuportedBrowserTitle,_30.vteWarningUnsuportedBrowserMessage,{width:250});
}
if(_3b.toLowerCase().indexOf(".css")>0){
}else{
if(_3b=="DEFAULT_PAGE"){
var _40=_2f.getThemeLocation();
htmlFile=new _2e();
htmlFile.fileName=_3b;
htmlFile.setText(_3c,true);
var _41=_40.relativeTo(this.basePath,true);
htmlFile.themeCssFiles=[];
_3d.forEach(function(_42){
htmlFile.themeCssFiles.push(_41.toString()+"/"+this.theme.name+"/"+_42);
}.bind(this));
this.context.model=htmlFile;
if(!this.initialSet){
this.context.deactivate();
this.context._setSource(htmlFile,function(_43){
this.savePoint=0;
var doc=this.context.getDocument();
for(var x=0;x<doc.head.children.length;x++){
var _44=doc.head.children[x];
if(_44.tagName=="LINK"&&(_44.getAttribute("href").indexOf(this.theme.files[0])>-1)){
doc.head.removeChild(_44);
doc.head.appendChild(_44);
break;
}
}
var _45;
if(this.theme&&this.theme.helper){
_45=_2f.getHelper(this.theme);
if(_45&&_45.preThemeConfig){
_45.preThemeConfig(this.context);
}else{
if(_45&&_45.then){
_45.then(function(_46){
if(_46.helper&&_46.helper.preThemeConfig){
_46.helper.preThemeConfig(this.context);
this.theme.helper=_46.helper;
}
}.bind(this));
}
}
}
this.context.activate();
setTimeout(dojo.hitch(this,function(){
this.context.getTopWidgets().forEach(function(_47){
if(_47.resize){
_47.resize({});
}
});
dojo.publish("/davinci/states/state/changed",[{editorClass:"davinci.themeEditor.ThemeEditor",widget:"$all",newState:"Normal",context:this.context}]);
}),1500);
this.initialSet=true;
var _48=this.context.getDojo().version.major+"."+this.context.getDojo().version.minor;
if(_48!==this.theme.version){
var _49="maqetta_"+this.theme.name+"_"+this.theme.version;
var _4a=dojo.cookie(_49);
if(!_4a){
dojo.cookie(_49,"true");
this.themeVersionWarn(true);
}
}
if(_43.errorMessage){
this.loadingDiv.innerHTML=_43.errorMessage;
}else{
if(_43 instanceof Error){
var _4b="Uh oh! An error has occurred:<br><b>"+_43.message+"</b>";
if(_43.fileName){
_4b+="<br>file: "+_43.fileName+"<br>line: "+_43.lineNumber;
}
if(_43.stack){
_4b+="<br>"+_43.stack;
}
this.loadingDiv.innerHTML=_4b;
dojo.addClass(loading,"error");
}else{
if(this.loadingDiv.parentNode){
this.loadingDiv.parentNode.removeChild(this.loadingDiv);
}
delete this.loadingDiv;
}
}
},this);
}
}
}
},themeVersionWarn:function(_4c){
var msg=_30.vteWarningMessage;
if(_4c){
msg=_30.vteWarninToolkitgMessage;
}
_29.showMessage(_30.vteWarningTitle,msg,{width:250});
},themeVersionError:function(){
_29.showMessage(_30.vteErrorTitle,_30.vteErrorMessage,{width:250},dojo.hitch(this,"themeVersionErrorOk"));
},themeVersionErrorOk:function(){
this.context.editor.editorContainer.save(false);
this.context.editor.editorContainer.forceClose(this,true);
return true;
},hotModifyCssRule:function(){
},getOutline:function(){
return null;
}});
});
},"davinci/ve/themeEditor/commands/ThemeEditorCommand":function(){
define(["dojo/_base/declare"],function(_4d){
return _4d("davinci.ve.themeEditor.commands.ThemeEditorCommand",null,{constructor:function(_4e){
dojo.mixin(this,_4e);
},execute:function(){
this.old_selectedWidget=this._themeEditor._selectedWidget;
this.old_selectedSubWidget=this._themeEditor._selectedSubWidget;
this._themeEditor.deselectSubwidget(this.old_selectedWidget,this.old_selectedSubWidget);
this._themeEditor._selectedWidget=this._widget[0];
this._themeEditor._selectedSubWidget=null;
if(this._firstRun){
this.updatePropertiesView(false);
}else{
this.updatePropertiesView(true);
dojo.publish("/davinci/ui/subwidgetSelectionChanged",[{subwidget:this._themeEditor._selectedSubWidget,origin:this.declaredClass}]);
}
this._firstRun=false;
},undo:function(){
this._themeEditor.deselectSubwidget(this._themeEditor._selectedWidget,this._themeEditor._selectedSubWidget);
this._themeEditor._selectedWidget=this.old_selectedWidget;
this._themeEditor._selectedSubWidget=this.old_selectedSubWidget;
this._themeEditor.selectSubwidget(this.old_selectedWidget,this.old_selectedSubWidget);
this.updatePropertiesView(true);
dojo.publish("/davinci/ui/subwidgetSelectionChanged",[{subwidget:this._themeEditor._selectedSubWidget,origin:this.declaredClass}]);
},updatePropertiesView:function(_4f){
if(!this._themeEditor._selectedWidget){
return;
}
var e=[this._themeEditor._selectedWidget];
dojo.publish("/davinci/ui/widgetSelected",[e]);
}});
});
},"davinci/ve/themeEditor/Context":function(){
define(["dojo/_base/declare","dojo/Deferred","../../commands/CommandStack","../widget","./SelectTool","../Context","../../library","../metadata"],function(_50,_51,_52,_53,_54,_55,_56,_57){
return _50([_55],{_bootstrapModules:"dijit/dijit,dijit/dijit-all",constructor:function(_58){
this._id="_edit_context_"+this._contextCount++;
dojo.mixin(this,_58);
if(dojo.isString(this.containerNode)){
this.containerNode=dijit.byId(this.containerNode);
}
this._commandStack=_52(this);
this._defaultTool=new _54();
this._widgetIds=[];
this._objectIds=[];
this._widgets=[];
this._selectionCssRules=[];
},_setSourceData:function(_59){
var _5a=[this.getDijit()._WidgetBase,this.getDijit()._TemplatedMixin];
this.getDojo().declare("dijit.davinci.themeEditor.Dialog",_5a,{buttonCancel:"cancel",onCancel:function(){
},title:"title",templateString:dojo.cache("dijit","templates/Dialog.html","<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"\n\t\t\t\trole=\"header\" level=\"1\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t\t</span>\n\t</div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n"),attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{title:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}],"aria-describedby":""}),_setTitleAttr:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}]});
this.getDojo().declare("dijit.davinci.themeEditor.Tooltip",_5a,{templateString:dojo.cache("dijit","templates/Tooltip.html","<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n")});
this.setHeader({title:_59.title,metas:_59.metas,scripts:_59.scripts,modules:_59.modules,styleSheets:_59.styleSheets,theme:_59.theme,bodyClasses:_59.bodyClasses,style:_59.style});
content=_59.content||"";
var _5b=this.getContainerNode();
var _5c=this.isActive();
if(_5c){
this.select(null);
dojo.forEach(this.getTopWidgets(),this.detach,this);
}
var _5d=[],_5e={},_5f={},_60=new _51();
dojo.forEach(this.getTopWidgets(),function(w){
if(w.getContext()){
w.destroyWidget();
}
});
_5b.innerHTML=content;
dojo.forEach(dojo.query("*",_5b),function(n){
var _61=n.getAttribute("data-dojo-type")||n.getAttribute("dojoType")||n.getAttribute("dvwidget");
this.loadRequires(_61,false,true);
},this);
this.getGlobal()["require"]("dojo/ready")(function(){
try{
this.getGlobal()["require"]("dojo/parser").parse(_5b);
_60.resolve();
}
catch(e){
var _62=this.getDijit();
_62.registry.forEach(function(w){
w.destroy();
});
this._editorSelectConnection=dojo.subscribe("/davinci/ui/editorSelected",dojo.hitch(this,this._editorSelectionChange));
_60.reject();
throw e;
}
}.bind(this));
if(_5c){
dojo.query("> *",this.rootNode).map(davinci.ve.widget.getWidget).forEach(this.attach,this);
}
dojo.query(".dvThemeWidget").forEach(this.theme.removeWidgetStyleValues);
return _60;
},attach:function(_63){
this.inherited(arguments);
if(!_63||_63.internal||!_63._srcElement){
return;
}
var _64=false;
var _65=_63.getClassNames();
if(_65&&_65.indexOf("dvThemeWidget")>-1){
_64=true;
}
_63.dvAttributes={isThemeWidget:_64};
if(_64){
if(this._widgets.indexOf(_63)===-1){
this._widgets.push(_63);
}
}
},getThemeMeta:function(){
if(!this._themeMetaCache){
this._themeMetaCache=_56.getThemeMetadata(this.theme);
}
return this._themeMetaCache;
},select:function(_66,add){
if(!_66||_66==this.rootWidget){
this._selectedWidget=null;
if(!add){
this.deselect();
}
return;
}
this._selectedWidget=_66;
var _67=undefined;
var _68=undefined;
if(add&&this._selection){
_68=this._selection.length;
_67=this._selection;
_67.push(_66);
}else{
_67=[_66];
}
var _69=false;
if(!this._selection||this._selection.length>1||_67.length>1||_67[0]!=this._selection[0]){
this._selection=_67;
_69=true;
}
this.updateFocus(_66,_68);
if(_69){
this.onSelectionChange(this.getSelection());
}
},onSelectionChange:function(_6a){
if(!this._forceSelectionChange){
this.visualEditor._themeEditor._selectedSubWidget=null;
}
this.inherited(arguments);
},getStyleAttributeValues:function(_6b){
return [];
},_restoreStates:function(){
},_configDojoxMobile:function(){
},getPath:function(){
var _6c=this.theme.file.getPath();
_6c=_6c.substring(0,_6c.lastIndexOf("/"));
_6c=_6c+"/"+this.theme.themeEditorHtmls[0];
return _6c;
},getFullResourcePath:function(){
return this.visualEditor.basePath;
},widgetAddedOrDeleted:function(){
}});
});
},"davinci/ve/themeEditor/commands/SubwidgetChangeCommand":function(){
define(["dojo/_base/declare","davinci/ve/themeEditor/commands/ThemeEditorCommand"],function(_6d,_6e){
return _6d("davinci.ve.themeEditor.commands.SubwidgetChangeCommand",[_6e],{constructor:function(_6f){
dojo.mixin(this,_6f);
},execute:function(){
this._old__selectedWidget=this._themeEditor._selectedWidget;
this._old_selectedSubWidget=this._themeEditor._selectedSubWidget;
this._themeEditor._selectedSubWidget=this._subwidget;
this.updatePropertiesView();
this._themeEditor.deselectSubwidget(this._old__selectedWidget,this._old_selectedSubWidget);
this._themeEditor.selectSubwidget(this._themeEditor._selectedWidget,this._themeEditor._selectedSubWidget);
if(this._redo){
dojo.publish("/davinci/ui/subwidgetSelectionChanged",[{subwidget:this._themeEditor._selectedSubWidget,origin:this.declaredClass}]);
}else{
this._redo=true;
}
},undo:function(){
this._themeEditor.deselectSubwidget(this._themeEditor._selectedWidget,this._themeEditor._selectedSubWidget);
this._themeEditor.selectSubwidget(this._old__selectedWidget,this._old_selectedSubWidget);
this._themeEditor._selectedWidget=this._old__selectedWidget;
this._themeEditor._selectedSubWidget=this._old_selectedSubWidget;
this.updatePropertiesView();
dojo.publish("/davinci/ui/subwidgetSelectionChanged",[{subwidget:this._themeEditor._selectedSubWidget,origin:this.declaredClass}]);
}});
});
}}});
define("davinci/ve/themeEditor/ThemeEditor",["dojo/_base/declare","dojo/_base/connect","davinci/ui/ModelEditor","davinci/ve/ThemeModifier","davinci/ve/themeEditor/VisualThemeEditor","davinci/ve/themeEditor/metadata/query","davinci/ve/themeEditor/metadata/CSSThemeProvider","davinci/ve/themeEditor/commands/ThemeEditorCommand","davinci/ve/themeEditor/commands/SubwidgetChangeCommand","davinci/ve/themeEditor/commands/StateChangeCommand","dijit/layout/ContentPane","davinci/commands/CompoundCommand","davinci/ve/themeEditor/ThemeColor","davinci/ve/utils/GeomUtils","system/resource","davinci/model/Path",],function(_70,_71,_72,_73,_74,_75,_76,_77,_78,_79,_7a,_7b,_7c,_7d,_7e,_7f){
return _70("davinci.ve.themeEditor.ThemeEditor",[_72],{children:[],visualEditor:null,_currentState:"Normal",_dirtyResource:{},_subWidgetSelection:null,_theme:null,_tempRules:{},_subscriptions:[],__DEBUG_TO_CONSOLE:false,_shortHands:["border","padding","margin","background","font","list-style"],constructor:function(_80){
this.inherited(arguments);
var _81=this;
this.editorContainer=dijit.getEnclosingWidget(_80);
this._cp=new _7a({},_80);
this.domNode=this._cp.domNode;
this.domNode.className="ThemeEditor fullPane";
this._loadedCSSConnects=[];
this.subscribe("/davinci/ui/editorSelected",this._editorSelected.bind(this));
this.subscribe("/davinci/ui/context/loaded",this._contextLoaded.bind(this));
this.editorContainer.connect(this.editorContainer,"resize",function(_82){
var _83=dojo.query("iframe",this.domNode)[0];
if(_83&&_83.contentDocument&&_83.contentDocument.body){
var _84=_83.contentDocument.body;
setTimeout(function(){
var _85=this.getContext();
_85.clearCachedWidgetBounds();
_85.updateFocusAll();
}.bind(this),100);
_81._registerScrollHandler();
}
}.bind(this));
},_editorSelected:function(_86){
var _87=this.getContext();
if(this==_86.oldEditor){
_87.hideFocusAll();
}
if(_86.editor&&_86.editor.editorContainer&&(_86.editor.declaredClass=="davinci.ve.PageEditor"||_86.editor.declaredClass=="davinci.ve.themeEditor.ThemeEditor")){
if(this==_86.editor){
this._registerScrollHandler();
}
}
},onResize:function(){
var _88=this.getContext();
var _89=this.getSelectedWidget();
_88.select(_89,false);
},getSelectionProperties:function(_8a){
if(!this._selectedWidget){
return [{editor:this,widget:null,subwidget:null,cssValues:null,computedCssValues:null,appliesTo:["theme"],context:this.context}];
}
var v=this._getSelectionStyleValues();
var _8b;
var _8c=this._getCssRules();
this._rebaseCssRuleImagesForStylePalette(_8c,v);
var _8d=this._selectedWidget.type;
var _8b=this._theme.getDomNode(this._selectedWidget.domNode,_8d,this._selectedSubWidget);
var _8e=dojo.getComputedStyle(_8b);
return {editor:this,widget:this._selectedWidget,subwidget:this._selectedSubWidget,cssValues:v,computedCssValues:_8e,appliesTo:["theme"],context:this.context};
},_widgetStateChanged:function(e){
if(!this.isActiveEditor()||!e){
return;
}
if(e.origin&&e.origin.indexOf("davinci.ve.themeEditor.commands.")>-1){
return;
}
var _8f=e.widget;
if(_8f&&_8f.processingUndoRedo){
delete _8f.processingUndoRedo;
return;
}
this.getContext().getCommandStack().execute(new _79({_themeEditor:this,_widget:_8f,_newState:e.newState,_oldState:e.oldState,_firstRun:true}));
},selectSubwidget:function(_90,_91){
if(!_90||!_91||_91=="WidgetOuterContainer"){
return;
}
var _92=this._theme.getWidgetType(_90);
var _93=this._theme.getDomNode(_90.domNode,_92,_91);
var box=this.getRelativeBox(_93);
var _94=this.getContext().getDocument().createElement("div");
_94.className="editSubwidgetFocusFrame";
_94.id="editSubwidgetFocusFrame";
_94.style.position="absolute";
var _95=2;
_94.style.width=_93.offsetWidth+(_95*2)+"px";
_94.style.height=_93.offsetHeight+(_95*2)+"px";
_94.style.top=(box.t-_95)+"px";
_94.style.left=(box.l-_95)+"px";
_94.style.padding=_95+"px";
_94.style.display="block";
this._selectedWidget.domNode.parentNode.appendChild(_94);
this._subWidgetFocusFrame=_94;
},deselectSubwidget:function(_96,_97){
if(this._subWidgetFocusFrame){
this._subWidgetFocusFrame.parentNode.removeChild(this._subWidgetFocusFrame);
this._subWidgetFocusFrame=null;
}
},_subwidgetSelectionChanged:function(e){
if(e.origin&&e.origin.indexOf("davinci.ve.themeEditor.commands.")>-1){
return;
}
if(!this.isActiveEditor()||!(this._selectedWidget||this._selectedSubWidget)){
return;
}
if(e.subwidget=="WidgetOuterContainer"){
e.subwidget=null;
}
this.getContext().getCommandStack().execute(new _78({_themeEditor:this,_subwidget:e.subwidget}));
},_getSelectionStyleValues:function(){
var _98=this._getCssRules();
if(_98.length==0){
return null;
}
var _99={};
for(var s=0;s<_98.length;s++){
var _9a=_98[s];
for(var p=0;p<_9a.properties.length;p++){
_99[_9a.properties[p].name]=_9a.properties[p].value;
}
}
_99=this.convertShortHandProps(_99);
return _99;
},addShortHandProps:function(_9b){
var _9c=this._shortHands;
var _9d="";
for(a in _9b){
_9d=_9d+" "+a+": "+_9b[a]+";";
}
var e=dojo.doc.createElement("div");
e.style.cssText=_9d;
for(v in _9b){
var _9e=_9f(v);
if(e.style[_9e]){
_9b[v]=e.style[_9e];
}
}
return _9b;
function _9f(str){
return str.replace(/(\-[a-z])/g,function($1){
return $1.toUpperCase().replace("-","");
});
};
},convertShortHandProps:function(_a0){
var _a1=this._shortHands;
for(var x=0;x<_a1.length;x++){
var sh=_a1[x];
if(_a0[sh]){
var e=dojo.doc.createElement("div");
e.style.cssText=sh+": "+_a0[sh]+";";
var i=0;
for(n in e.style){
if(n.indexOf(sh)>-1){
var _a2=_a3(n);
if(e.style[n]){
_a0[_a2]=e.style[n];
}
}
}
}
}
function _a3(str){
return str.replace(/([A-Z])/g,function($1){
return "-"+$1.toLowerCase();
});
};
function _a4(val){
var _a5="";
val=val.split("-");
_a5+=val[0].substring(0,1).toLowerCase()+val[0].substring(1,val[0].length);
for(var c=1;c<val.length;c++){
if(val[c]!="value"){
_a5+=val[c].substring(0,1).toUpperCase()+val[c].substring(1,val[c].length);
}
}
return _a5;
};
return _a0;
},_getCssRules:function(_a6,_a7,_a8){
if(!_a7){
_a7=null;
}
var _a9=this._loadCssSelectors(_a6,_a7,_a8);
var _aa=[];
if(!_a9){
return null;
}
var _ab={};
for(var s=0;s<_a9.length;s++){
var _ac=this.getContext()._getCssFiles();
if(_ac){
for(var i=0;i<_ac.length;i++){
var _ad=_ac[i].getRules(_a9[s]);
for(sn=0;sn<_ad.length;sn++){
var _ae=_ad[sn];
if(_ae){
var _af=_ae.searchUp("CSSRule");
if(_af){
_aa.push(_af);
}
}
}
}
}
}
return _aa;
},focus:function(){
this.onSelectionChange([this.getSelectedWidget()]);
},supports:function(_b0){
var _b1=/^style|states|propsect_layout|propsect_paddingMargins|propsect_background|propsect_border|propsect_fontsAndText$/;
return _b0.match(_b1)?true:false;
},onSelectionChange:function(a){
if(!this.isActiveEditor()||!a||!a[0]){
return;
}
if(this._selectedWidget&&(this._selectedWidget.id==a[0].id)){
return;
}
this.getContext().getCommandStack().execute(new _77({_themeEditor:this,_widget:a,_firstRun:true}));
},getSelectedWidget:function(){
var _b2=this.getContext();
var _b3=_b2.getSelection();
var _b4=(_b3.length>0?_b3[_b3.length-1]:undefined);
if(_b3.length>1){
_b2.select(_b4);
}
return _b4;
},getSelectedSubWidget:function(){
if(this._selectedSubWidget){
return this._selectedSubWidget;
}
},_loadCssSelectors:function(_b5,_b6,_b7){
var _b8=this.getContext();
if(!_b5){
_b5=this._selectedWidget;
if(!_b6){
_b6=this.getSelectedSubWidget();
}
}
if(!_b5){
return null;
}
var _b9=this.metaDataLoader.getType(_b5);
if(!_b9){
return null;
}
var id=_b5.id;
if(id.indexOf("all")===0){
_b9=_b9+".$"+id;
}
if(!_b7){
_b7=this._currentState;
}
if(!_b7){
_b7="Normal";
}
var _ba=[];
if(this.__DEBUG_TO_CONSOLE){
}
var _bb=this._theme.getStyleSelectors(_b9,_b7,_b6);
for(var aa in _bb){
_ba.push(aa);
}
return _ba;
},_addCommandsForValue:function(_bc,_bd,_be,_bf,_c0,_c1){
if(!_bc){
_bc=new _7b();
}
var _c2=[];
var _c3=this.getRules(_bd,_be,_bf);
for(var r=0;r<_c3.length;r++){
var _c4=_c3[r];
if(this._theme.isPropertyVaildForWidgetRule(_c4,_c1,this._selectedWidget,_be,_bf)){
var _c5=this.getContext().getDeltaRule(_c4);
_c2[_c5.getSelectorText()]=_c5;
}
}
for(var _c6 in _c2){
var _c7=_c0.appliesTo.rule;
_c0.appliesTo.rule=null;
cValue=dojo.clone(_c0);
cValue.appliesTo.rule=_c2[_c6];
_c0.appliesTo.rule=_c7;
cValue.values.forEach(function(_c8){
if(_c8[_c1]&&_c8[_c1].indexOf("url('")==0){
var _c9=_c8[_c1].split("'");
var url=_c9[1];
if(url.indexOf("http://")>-1){
return;
}
var _ca=_c7.parent.url.substring(0,_c7.parent.url.lastIndexOf("/"))+"/"+url;
var _cb=_7e.findResource(_ca);
var _cc=new _7f(_cb.getPath());
var _cd=_cc.relativeTo(cValue.appliesTo.rule.parent.url,true);
_c8[_c1]="url('"+_cd+"')";
}
}.bind(this));
_bc.add(this.getContext().getCommandForStyleChange(cValue));
}
return _bc;
},_propertiesChange:function(_ce){
if(!this.isActiveEditor()){
return;
}
var _cf=new _7b();
if(this._selectedWidget.id==="all"){
var _d0=[];
this._oldValues=[];
for(var i=0;i<_ce.values.length;i++){
var _d1=_ce.values[i];
for(var v in _d1){
if(v.indexOf("color")>-1){
_d0[v]=_d1[v];
}
}
}
var _d2=this._theme.getMetadata(this._theme.getWidgetType(this._selectedWidget));
for(var c in _d2.states){
if(c!="Normal"){
var _d3=dojo.clone(_d0);
for(var _d4 in _d3){
var _d5;
var _d6;
if(_d2.states.Normal.defaults&&_d2.states.Normal.defaults.cssPropery){
_d5=_d2.states.Normal.defaults.cssPropery[_d4];
}
if(_d2.states[c].defaults&&_d2.states[c].defaults.cssPropery){
_d6=_d2.states[c].defaults.cssPropery[_d4];
}
var _d7=_d3[_d4];
if(_d5&&_d6&&_d7){
var _d8=new _7c(_d7);
var _d9=_d8.calculateHighlightColor(_d5,_d6);
_d3[_d4]=_d9.toHex();
for(var i=0;i<_ce.values.length;i++){
var _da=_ce.values[i];
for(name in _da){
if(_d3[name]){
_da[name]=_d3[name];
}
}
}
for(var i=0;i<_ce.values.length;i++){
for(var a in _ce.values[i]){
_cf=this._addCommandsForValue(_cf,this._selectedWidget,this._selectedSubWidget,c,_ce,a);
}
}
}
}
}else{
for(var i=0;i<_ce.values.length;i++){
for(var a in _ce.values[i]){
_cf=this._addCommandsForValue(_cf,this._selectedWidget,this._selectedSubWidget,this._currentState,_ce,a);
}
}
}
}
}else{
for(var i=0;i<_ce.values.length;i++){
for(var a in _ce.values[i]){
_cf=this._addCommandsForValue(_cf,this._selectedWidget,this._selectedSubWidget,this._currentState,_ce,a);
}
}
}
if(this._selectedWidget){
this.getContext().getCommandStack().execute(_cf);
}
this.setDirty(true);
},_rebaseCssRuleImagesForStylePalette:function(_db,_dc){
if(!_db){
return _dc;
}
for(var r=0;r<_db.length;r++){
var _dd=_db[r];
for(var a in _dc){
var _de=_dd.getProperty(a);
if(_de){
var url=_de.getURL();
if(url){
_dc[a]=url;
}
}
}
}
return _dc;
},_markDirty:function(_df){
this._dirtyResource[_df]=new Date().getTime();
this._srcChanged();
},_srcChanged:function(){
if(!this.isDirty){
if(this._themeFileContent){
this.resourceFile.setContents(this._themeFileContent,true);
}else{
console.error("ThemeEditor.theme file content empty");
this._themeFileContent=this.resourceFile.getContentSync();
}
}
this.isDirty=true;
this.lastModifiedTime=new Date().getTime();
if(this.editorContainer){
this.editorContainer.setDirty(true);
}
},setDirty:function(_e0){
this.isDirty=_e0;
if(this.editorContainer){
this.editorContainer.setDirty(_e0);
}
},getContext:function(){
return this.visualEditor?this.visualEditor.context:null;
},getOutline:function(){
return this.visualEditor.getOutline();
},getPropertiesView:function(){
return this.visualEditor.getPropertiesView();
},getThemeFile:function(){
return this.theme;
},setContent:function(_e1,_e2){
try{
this._themePath=new davinci.model.Path(_e1);
this.theme=dojo.isString(_e2)?dojo.fromJson(_e2):_e2;
this.theme.file=system.resource.findResource(_e1);
this.themeCssFiles=[];
for(var i=0;i<this.theme.files.length;i++){
if(this.theme.files[i].indexOf(".css")>-1){
this.themeCssFiles.push(this.theme.files[i]);
}
}
var _e3=[];
for(var y=0;y<this.theme.themeEditorHtmls.length;y++){
var _e4=this._themePath.getParentPath().append(this.theme.themeEditorHtmls[y]).toString();
_e3.push(system.resource.findResource(_e4));
}
this.visualEditor=new _74(this,this._cp.domNode,_e1,this.themeCssFiles,_e3,this.theme);
this.fileName=_e1;
var _e5=[];
var _e6=this.getContext();
_e6._themePath=this._themePath;
_e6.themeCssFiles=this.themeCssFiles;
for(var i=0;i<this.theme.meta.length;i++){
_e5.push(_e6._getThemeResource(this.theme.meta[i]));
}
this.metaDataLoader=new _75(_e5);
this._theme=new _76(_e5,this.theme);
var _e7=_e6._getCssFiles();
for(var i=0;i<_e7.length;i++){
this._loadedCSSConnects.push(dojo.connect(_e7[i],"onChange",_e6,"_themeChange"));
}
this._themeFileContent=this.resourceFile.getContentSync();
var _e8=this._subscriptions;
_e8.push(dojo.subscribe("/davinci/ui/styleValuesChange",this,"_propertiesChange"));
_e8.push(dojo.subscribe("/davinci/states/state/changed",this,"_widgetStateChanged"));
_e8.push(dojo.subscribe("/davinci/ui/subwidgetSelectionChanged",this,"_subwidgetSelectionChanged"));
dojo.connect(this.visualEditor,"onSelectionChange",this,"onSelectionChange");
}
catch(e){
alert("error loading:"+_e1+e);
}
},getDefaultContent:function(){
},selectModel:function(_e9){
},getFileEditors:function(){
function _ea(_eb,_ec,_ed){
return {lookFor:_eb,urlResolver:_ec,result:_ed,_getObject:function(_ee,_ef,_f0){
return {resourceFile:_ee,getText:function(){
return _ef;
},lastModifiedTime:_f0};
},visit:function(_f1){
if(_f1.elementType=="CSSFile"){
for(var aa in this.lookFor){
if(aa==_f1.url){
var _f2=system.resource.findResource(aa);
this.result.push(this._getObject(_f2,_f1.getText({noComments:false}),this.lookFor[aa]));
break;
}
}
}
return (this.lookFor.length<=0);
}};
};
var _f3=[];
var _f4=this.getContext()._getCssFiles();
var _f5=_ea(this._dirtyResource,this._URLResolver,_f3);
if(_f4){
for(var i=0;i<_f4.length;i++){
_f4[i].visit(_f5);
}
}
_f3.push({resourceFile:this.resourceFile,getText:function(){
return this.resourceFile.getContentSync();
},lastModifiedTime:Date.now()});
return _f3;
},save:function(_f6){
this.getContext().saveDynamicCssFiles(this.getContext()._getCssFiles(),_f6);
if(!_f6){
this.isDirty=false;
}
if(this.editorContainer&&!_f6){
this.editorContainer.setDirty(false);
}
},removeWorkingCopy:function(){
},destroy:function(){
if(this._scrollHandler){
dojo.disconnect(this._scrollHandler);
this._scrollHandler=null;
}
this.inherited(arguments);
if(this.visualEditor){
this.visualEditor.destroy();
}
this.getContext().destroy();
this._subscriptions.forEach(function(_f7){
dojo.unsubscribe(_f7);
});
if(this._loadedCSSConnects){
dojo.forEach(this._loadedCSSConnects,dojo.disconnect);
delete this._loadedCSSConnects;
}
delete this._tempRules;
},getText:function(){
return dojo.toJson(this.theme,true);
},disableWidget:function(_f8){
if(!_f8){
return;
}
var _f9=this.getContext().getDocument().getElementById("enableWidgetFocusFrame_"+_f8.id);
if(_f9){
_f9.parentNode.removeChild(_f9);
}
this._createFrame(_f8,"disableWidgetFocusFrame_","disableWidgetFocusFrame");
},_createFrame:function(_fa,id,_fb){
if(!_fa){
return;
}
var _fc=this.getContext().getDocument().getElementById(id+_fa.id);
if(_fc){
return;
}
var _fd=_fa;
if(_fa.domNode){
_fd=_fa.domNode;
}
var _fc=this.getContext().getDocument().createElement("div");
dojo.connect(_fc,"onmousedown",this,"editFrameOnMouseDown");
var _fe=this.getContext().getContainerNode();
dojo.connect(_fe,"onmousedown",this,"canvasOnMouseDown");
_fc.className=_fb;
_fc.id=id+_fa.id;
_fc.style.position="absolute";
var box=this.getRelativeBox(_fd);
_fc.style.top=box.t+"px";
_fc.style.left=box.l+"px";
_fc.style.width=box.w+"px";
_fc.style.height=box.h+"px";
_fc.style.display="block";
_fc._widget=_fa;
_fd.parentNode.appendChild(_fc);
},getRelativeBox:function(_ff){
var _100=0;
var _101=0;
var obj=_ff;
if(obj.offsetParent){
do{
if(obj.className.indexOf("theming-widget")>-1){
_101=_ff.offsetTop;
_100=_ff.offsetLeft;
break;
}
_100+=obj.offsetLeft;
_101+=obj.offsetTop;
}while(obj=obj.offsetParent);
}
return {t:_101,l:_100,w:_ff.offsetWidth,h:_ff.offsetHeight};
},canvasOnMouseDown:function(_102){
var t=davinci.ve.widget.getEnclosingWidget(_102.target);
if(_102.target.id.indexOf("enableWidgetFocusFrame_")>-1){
t=_102.target._widget;
}
var _103=t;
while(_103){
if(_103.dvAttributes&&_103.dvAttributes.isThemeWidget&&_103.getContext()){
return;
}
_103=davinci.ve.widget.getEnclosingWidget(_103.domNode.parentNode);
}
if(this._selectedWidget&&(_102.target.className.indexOf("editFeedback")<0)){
_102.stopPropagation();
var a=[null];
this.getContext().getCommandStack().execute(new _77({_themeEditor:this,_widget:a,_firstRun:true}));
this.getContext().select(null,false);
}
},editFrameOnMouseDown:function(_104){
_104.stopPropagation();
if(this.getContext()._activeTool&&this.getContext()._activeTool.onMouseDown){
this.getContext()._activeTool.onMouseDown(_104);
}
},enableWidget:function(_105){
if(!_105){
return;
}
var _106=_105;
if(_105.domNode){
_106=_105.domNode;
}
var _107=this.getContext().getDocument().getElementById("disableWidgetFocusFrame_"+_105.id);
if(_107){
_107.parentNode.removeChild(_107);
}
this._createFrame(_105,"enableWidgetFocusFrame_","enableWidgetFocusFrame");
},getRules:function(_108,_109,_10a){
var _10b=this._loadCssSelectors(_108,_109,_10a);
var _10c=[];
for(var s=0;s<_10b.length;s++){
var _10d=false;
var _10e=this.getContext()._getCssFiles();
if(_10e){
for(var i=0;i<_10e.length;i++){
var _10f=_10e[i].getRules(_10b[s]);
for(var sn=0;sn<_10f.length;sn++){
var _110=_10f[sn];
if(_110){
var rule=_110.searchUp("CSSRule");
if(rule){
_10c.push(rule);
_10d=true;
}
}
}
}
}
if(!_10d){
console.warn("[theme editor getRule] Rule not found in theme: "+_10b[s]);
}
}
return _10c;
},_contextLoaded:function(_111){
if(_111==this.getContext()){
this._registerScrollHandler();
}
},_registerScrollHandler:function(){
var _112=this.getContext();
if(!this._scrollHandler){
var _113=this.editorContainer;
var _114=dojo.query("iframe",_113.domNode)[0];
if(_114&&_114.contentDocument&&_114.contentDocument.body){
var _115=_114.contentDocument.body;
this._scrollHandler=dojo.connect(_114.contentDocument,"onscroll",this,function(e){
setTimeout(function(){
_112.clearCachedWidgetBounds();
_112.updateFocusAll();
},100);
});
}
}
}});
});
