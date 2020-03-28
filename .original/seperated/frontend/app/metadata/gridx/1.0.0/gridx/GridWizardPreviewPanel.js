//>>built
require({cache:{"url:maq-metadata-gridx/gridx/templates/gridWizardPreview.html":"<div data-dojo-type=\"dijit.layout.BorderContainer\" data-dojo-props=\"design:'headline', gutters:false, liveSplitters:false\" class=\"gridWizardPreviewPanelBorderContainer\">\r\n     <div data-dojo-type=\"dijit.layout.BorderContainer\" data-dojo-props=\"design:'headline', gutters:false, liveSplitters:false,region:'center'\" class=\"previewPanelCenterContentPane\">\r\n    \t<div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region:'top'\" class=\"previewPanelSectionLabelContainer\"> \r\n    \t\t<span>{preview}</span><span class=\"previewPanelPreviewNote\">{previewNote}</span>\r\n    \t</div>\r\n    \t<div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region:'center'\" class=\"previewPanelPreviewPaneCenter\">\r\n\t    \t<div class=\"previewPanelGridPreviewDiv\" >\r\n\t\t    \t<div id=\"previewPanelGridContentPane\" data-dojo-type=\"dijit.layout.ContentPane\" class=\"previewPanelGridContentPane\">\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n    </div>\r\n    <div data-dojo-type=\"dijit.layout.BorderContainer\" data-dojo-props=\"region:'trailing', design:'headline', gutters:false, liveSplitters:false, splitter:true\" class=\"previewPanelTrailingContentPane\">\r\n    \t<div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region:'top'\" class=\"previewPanelSectionLabelContainer\"> \r\n    \t\t<div>{columnProperties}</div>\r\n    \t</div>\r\n    \t<div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region:'center'\" class=\"previewPanelColumnPropsPaneCenter\">\r\n\t    \t<div class=\"previewPanelColumnPropsDiv\"> \r\n\t\t    \t<table cellspacing=\"5px\" class=\"previewPanelColumnPropsTable\">\r\n\t\t    \t\t<tr>\r\n\t\t\t\t\t\t<td><label>{fieldLabel}</label></td> \r\n\t\t\t\t\t\t<td><label id=\"gridWizardPreviewFieldOutput\"></label></td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td><label for=\"gridWizardPreviewLabelInput\">{labelLabel}</label></td>\r\n\t\t\t\t\t\t<td><input id=\"gridWizardPreviewLabelInput\" data-dojo-type=\"dijit.form.TextBox\" type=\"text\" disabled=\"disabled\" class=\"previewPanelColumnInputField\"></input></td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td><label for=\"gridWizardPreviewWidthInput\">{widthLabel}</label></td>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<input id=\"gridWizardPreviewWidthInput\" data-dojo-type=\"dijit.form.ValidationTextBox\" type=\"text\" data-dojo-props=\"regExp:'{_widthRegExp}', required:true, invalidMessage:'{invalidWidth}'\" disabled=\"disabled\" class=\"previewPanelColumnInputField\"></input>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</table> \r\n\t\t\t</div>\r\n\t\t\t<div class=\"previewPanelResetButtonContainer\">\r\n\t\t\t\t<button id=\"gridWizardPreviewResetAllButton\" data-dojo-type=\"dijit.form.Button\" class=\"previewPanelResetButton\">{resetAllWidths}</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n    </div>\r\n</div>\r\n\r\n"}});
define("maq-metadata-gridx/gridx/GridWizardPreviewPanel",["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/ContentPane","dijit/layout/BorderContainer","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/form/Button","dojo/data/ItemFileReadStore","./GridWizardPanel","gridx/Grid","gridx/core/model/cache/Async","gridx/modules/extendedSelect/Column","gridx/modules/move/Column","gridx/modules/dnd/Column","gridx/modules/ColumnResizer","davinci/css!gridx/resources/claro/Gridx.css","davinci/css!gridx/resources/claro/Gridx_rtl.css","dojo/i18n!./nls/gridx","dojo/text!./templates/gridWizardPreview.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15){
return _1([_5,_b],{postMixInProperties:function(){
this.inherited(arguments);
},postCreate:function(){
this._connections=[];
_15=dojo.replace(_15,{preview:_14.preview,previewNote:_14.previewNote,columnProperties:_14.columnProperties,_widthRegExp:"^(auto)$|^([0-9]|([0-9]+[\\.]?([0-9]+)))(px|em|%|ex|in|cm|mm|pt|pc)$",invalidWidth:_14.invalidWidth,fieldLabel:_14.fieldLabel,labelLabel:_14.labelLabel,widthLabel:_14.widthLabel,resetAllWidths:_14.resetAllWidths});
this.set("content",_15);
},getStepLabel:function(){
return _14.configureColumnsHeader;
},populate:function(_16,_17,_18,_19){
this._columnWidthChangedSinceLastPopulate=false;
this._gridBeenSized=false;
this._clearColumnProperties();
if(this._grid){
this._grid.destroyRecursive();
}
this._widget=_16;
this._selectedStructureFieldNames=_18;
var _1a=null;
dojo.some(_17._commands,function(_1b){
if(_1b._data&&_1b._data.properties){
_1a=_1b._data.properties;
return true;
}
});
if(_1a.url&&_1a.url!=""){
this._gridStore=_19._urlDataStore;
}else{
this._gridStore=new _a(_1a);
}
var _1c=null;
dojo.some(_17._commands,function(_1d){
if(_1d._properties&&_1d._properties.structure){
_1c=_1d;
return true;
}
});
var _1e=_1c._properties;
var _1f=_1e.structure;
var _20=_1f;
var _21=[];
dojo.forEach(_18,function(_22){
dojo.some(_20,function(_23){
if(_23.field===_22){
var _24=dojo.mixin({},_23);
delete _24.id;
_24.name=_24.name.trim();
_21.push(_24);
return true;
}
});
});
var _25=this._grid=new _c({cacheClass:_d,store:this._gridStore,structure:_21,modules:[_e,_f,_10,_11],});
var _26=dijit.byId("previewPanelGridContentPane");
var _27=dojo.style(this._widget.dijitWidget.domNode,"width")+"px";
var _28=dojo.style(this._widget.dijitWidget.domNode,"height")+"px";
dojo.style(_26.domNode,"width",_27);
dojo.style(_26.domNode,"height",_28);
_26.set("content",_25);
this._connections.push(dojo.connect(_25,"resize",dojo.hitch(this,function(_29){
if(!this._gridBeenSized){
this._grid.setColumns(this._grid.structure);
this._gridBeenSized=true;
}
})));
this._connections.push(dojo.connect(_25.select.column,"onSelectionChange",dojo.hitch(this,this._handleColumnSelectionChange)));
this._connections.push(dojo.connect(_25.columnResizer,"onResize",dojo.hitch(this,this._handleColumnResized)));
var _2a=dijit.byId("gridWizardPreviewLabelInput");
this._connections.push(dojo.connect(_2a,"onBlur",dojo.hitch(this,this._handleLabelInputChanged)));
var _2b=dijit.byId("gridWizardPreviewWidthInput");
this._connections.push(dojo.connect(_2b,"onBlur",dojo.hitch(this,this._handleWidthInputChanged)));
var _2c=dijit.byId("gridWizardPreviewResetAllButton");
this._connections.push(dojo.connect(_2c,"onClick",dojo.hitch(this,this._handleResetAllWidths)));
this.inherited(arguments);
},isValid:function(){
var _2d=true;
var _2e=dijit.byId("gridWizardPreviewWidthInput");
if(!_2e.get("disabled")){
if(!_2e.isValid()){
_2d=_2e.invalidMessage;
}
}
return _2d;
},getUpdatedColumnStructure:function(){
var _2f=[];
var _30=this._grid.columns();
var _31=this._allWidthsRelative(this._grid.structure);
dojo.forEach(_30,function(_32){
var _33=this._getPreviewStructureElement(_32.id);
var _34=dojo.mixin({},_33);
if(this._columnWidthChangedSinceLastPopulate&&!_31){
_34.width=_32.width;
}
_2f.push(_34);
}.bind(this));
return _2f;
},_allWidthsRelative:function(_35){
var _36=true;
dojo.some(_35,function(_37){
var _38=_37.width;
if(!(_38=="auto"||_38.indexOf("%")>0)){
_36=false;
return true;
}
});
return _36;
},_getGridColumn:function(_39){
var _3a=null;
var _3b=this._grid.columns();
dojo.some(_3b,function(_3c){
if(_3c.id==_39){
_3a=_3c;
return true;
}
});
return _3a;
},_getGridIdFromFieldName:function(_3d){
var _3e=null;
var _3f=this._grid.columns();
dojo.some(_3f,function(_40){
if(_40.field()==_3d){
_3e=_40.id;
return true;
}
});
return _3e;
},_getPreviewStructureElement:function(_41){
var _42=this._getGridColumn(_41);
var _43=_42.field();
var _44=null;
dojo.some(this._grid.structure,function(_45){
if(_45.field==_43){
_44=_45;
return true;
}
}.bind(this));
return _44;
},_getStructureOrderedBasedOnGrid:function(){
var _46=[];
var _47=this._grid.columns();
dojo.forEach(_47,function(_48){
var _49=this._getPreviewStructureElement(_48.id);
_46.push(_49);
}.bind(this));
return _46;
},_setGridStructure:function(_4a){
var _4b=null;
if(this._selectedGridColumnId){
var _4c=this._getPreviewStructureElement(this._selectedGridColumnId);
_4b=_4c.field;
}
var _4d=this._getStructureOrderedBasedOnGrid(_4a);
this._grid.setColumns(_4d);
if(_4b){
this._selectedGridColumnId=this._getGridIdFromFieldName(_4b);
}
if(this._selectedGridColumnId){
this._selectGridColumn(this._selectedGridColumnId);
}
},_handleColumnSelectionChange:function(_4e){
if(this._ignoreSelectionChange){
return;
}
if(this._selectedGridColumnId&&!this._checkValidity()){
setTimeout(function(){
this._ignoreSelectionChange=true;
this._selectGridColumn(this._selectedGridColumnId);
this._ignoreSelectionChange=false;
}.bind(this),0);
return;
}
if(_4e.length==1){
var _4f=this._selectedGridColumnId=_4e[0];
var _50=this._getPreviewStructureElement(_4f);
this._populateColumnProperties(_50);
}else{
this._selectedGridColumnId=null;
this._clearColumnProperties();
}
},_clearColumnProperties:function(){
var _51=dojo.byId("gridWizardPreviewFieldOutput");
var _52=dijit.byId("gridWizardPreviewLabelInput");
var _53=dijit.byId("gridWizardPreviewWidthInput");
_51.innerHTML="";
_52.set("value","");
_52.set("disabled",true);
_53.set("value","");
_53.set("disabled",true);
},_populateColumnProperties:function(_54){
var _55=dojo.byId("gridWizardPreviewFieldOutput");
var _56=dijit.byId("gridWizardPreviewLabelInput");
var _57=dijit.byId("gridWizardPreviewWidthInput");
_55.innerHTML=_54.field;
_56.set("value",_54.name);
_56.set("disabled",false);
_57.set("value",_54.width);
_57.set("disabled",false);
},_handleColumnResized:function(_58,_59,_5a){
if(this._ignoreResize){
return;
}
if(_58!=this._selectedGridColumnId){
if(this._selectedGridColumnId&&!this._checkValidity()){
setTimeout(function(){
this._ignoreResize=true;
this._grid.columnResizer.setWidth(_58,_5a);
this._ignoreResize=false;
}.bind(this),0);
return;
}else{
this._selectGridColumn(_58);
}
}
var _5b=_59+"px";
var _5c=dijit.byId("gridWizardPreviewWidthInput");
_5c.set("value",_5b);
var _5d=this._getPreviewStructureElement(this._selectedGridColumnId);
_5d.width=_5b;
this._columnWidthChangedSinceLastPopulate=true;
},_handleLabelInputChanged:function(_5e){
var _5f=dijit.byId("gridWizardPreviewLabelInput");
_5e=_5f.get("value");
var _60=this._grid.structure;
var _61=this._getPreviewStructureElement(this._selectedGridColumnId);
if(_5e!=_61.name){
_61.name=_5e;
this._setGridStructure(_60);
}
},_handleWidthInputChanged:function(){
var _62=dijit.byId("gridWizardPreviewWidthInput");
var _63=_62.get("value");
if(!this._checkValidity()){
return;
}
var _64=this._grid.structure;
var _65=this._getPreviewStructureElement(this._selectedGridColumnId);
if(_63!=_65.width){
_65.width=_63;
this._setGridStructure(_64);
this._columnWidthChangedSinceLastPopulate=true;
}
},_handleResetAllWidths:function(){
this._columnWidthChangedSinceLastPopulate=false;
var _66=this._grid.structure;
dojo.forEach(_66,function(_67){
_67.width="auto";
});
this._setGridStructure(_66);
if(this._selectedGridColumnId){
var _68=dijit.byId("gridWizardPreviewWidthInput");
_68.set("value","auto");
}
},_selectGridColumn:function(_69){
this._grid.select.column.clear();
this._grid.select.column.selectById(_69);
},destroy:function(){
this.inherited(arguments);
this._connections.forEach(dojo.disconnect);
delete this._connections;
}});
});
