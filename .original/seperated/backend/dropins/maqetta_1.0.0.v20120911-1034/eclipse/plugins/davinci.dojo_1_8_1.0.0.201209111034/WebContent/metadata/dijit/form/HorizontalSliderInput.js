//>>built
require({cache:{"url:maq-metadata-dojo/dijit/form/templates/horizontalSliderInput.html":"<div>\r\n\t<div dojoType=\"dijit.layout.BorderContainer\" class=\"dijitDialogPaneContentArea\" design=\"headline\" gutters=\"false\"\tstyle=\"width:100%; height:100%\" liveSplitters=\"false\" dojoAttachPoint=\"borderContainer\">\r\n\t\t<!--Center region -->\r\n\t\t<div dojoType=\"dijit.layout.ContentPane\" region=\"center\">\r\n\t\t\t<table width=\"100%\">\r\n\t\t\t\t<tr class=\"sliderInputDiv sliderInputChildrenLabel\">\r\n\t\t\t\t\t<td colspan=\"5\">${langObj.ruleAndLabelsHeader}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr class=\"sliderInputChildRow\">\r\n\t\t\t\t\t<th></th>\r\n\t\t\t\t\t<th></th>\r\n\t\t\t\t\t<th>${langObj.typeColHeader}</th>\r\n\t\t\t\t\t<th>${langObj.containerColHeader}</th>\r\n\t\t\t\t\t<th></th>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<!--  child rows for rules and rule labels added dynamically -->\r\n\t\t\t\t<tr class=\"sliderInputBeforeOptionsLabel sliderInputOptionsLabelRow\"></tr>\r\n\t\t\t</table>\r\n        </div>\r\n\t\t\r\n        <!--Preview area -- \"trailing\" region -->\r\n\t\t<div dojoType=\"dijit.layout.ContentPane\" style=\"width: 40%;\" region=\"trailing\" >\r\n\t\t\t<table width=\"100%\">\r\n\t\t\t\t<tr class=\"sliderInputDiv sliderInputChildrenLabel\">\r\n\t\t\t\t\t<td>${langObj.preview}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<!--  child rows for rules and rule labels added dynamically -->\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<div class=\"sliderPreviewDisablingDiv\" ></div>\r\n\t\t\t\t\t\t<div dojoType=\"dijit.layout.ContentPane\" dojoAttachPoint=\"previewArea\"> \r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"dijitDialogPaneActionBar\">\r\n\t\t<button dojoType=\"dijit.form.Button\" label=\"${dijitLangObj.buttonOk}\" class=\"maqPrimaryButton\" type=\"submit\"></button>\r\n\t\t<button dojoType=\"dijit.form.Button\" label=\"${dijitLangObj.buttonCancel}\" dojoAttachPoint=\"cancelButton\" dojoAttachEvent='onClick:_onCancel' class=\"maqSecondaryButton\"></button>\r\n\t</div>\r\n</div>","url:maq-metadata-dojo/dijit/form/templates/horizontalSliderInputRowTemplate.html":"<tr class=\"sliderInputChildRow\" style=\"display:none;\">\r\n\t<td class=\"sliderInputCol1\"></td>\r\n\t<td class=\"sliderInputOptsLabel sliderInputChildLabel\">Template:</td>\r\n\t<td>\r\n\t\t<select class=\"sliderTypeSelect\" dojoType=\"dijit.form.Select\">\r\n\t\t\t<option value=\"rules\">{rulesSelectEntry}</option>\r\n\t\t\t<option value=\"labels\">{labelsSelectEntry}</option>\r\n\t\t</select>\r\n\t</td>\r\n\t<td>\r\n\t\t<select class=\"sliderContainerSelect\" dojoType=\"dijit.form.Select\">\r\n\t\t\t<option value=\"{containerOptions0}\">{containerOptions0}</option>\r\n\t\t\t<option value=\"{containerOptions1}\">{containerOptions1}</option>\r\n\t\t</select>\r\n\t</td>\r\n\t<td class=\"sliderInputPlusMinusButtons\">\r\n\t\t<span class=\"sliderInputPlusButton\" dojoType=\"dijit.form.Button\">+</span>\r\n\t\t<span class=\"sliderInputMinusButton\" dojoType=\"dijit.form.Button\">-</span>\r\n\t</td>\r\n</tr>"}});
define("maq-metadata-dojo/dijit/form/HorizontalSliderInput",["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","../layout/ContainerInput","dijit/layout/ContentPane","dijit/layout/BorderContainer","dijit/layout/LayoutContainer","dijit/form/HorizontalSlider","dijit/form/HorizontalRule","dijit/form/HorizontalRuleLabels","davinci/Workbench","dojo/text!./templates/horizontalSliderInput.html","dojo/text!./templates/horizontalSliderInputRowTemplate.html","davinci/css!./templates/horizontalSliderInput.css","dojo/i18n!../nls/dijit","dojo/i18n!dijit/nls/common"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11){
var _12=_1([_2,_3,_4],{templateString:_d,langObj:_10,dijitLangObj:_11,postCreate:function(){
if(this.widget.inLineEdit_displayOnCreate){
delete this.widget.inLineEdit_displayOnCreate;
dojo.style(this.cancelButton.domNode,"display","none");
}
},resize:function(_13){
this.borderContainer.resize();
},_onCancel:function(){
this.onClose();
}});
return _1(_5,{_sliderChildrenEntries:null,_substitutedRowTemplate:null,_substitutedMainTemplate:null,show:function(_14){
this._widget=davinci.ve.widget.byId(_14);
var _15=this._getDialogDimensions();
var _16=_15.width;
var _17=_15.height;
var s=this._getTemplate(_16,_17);
function _18(){
this.updateWidget();
};
this.contentWidget=new _12({widget:this._widget});
this._inline=_c.showModal(this.contentWidget,this._getDialogTitle(),{width:_16,height:_17},dojo.hitch(this,_18));
this._sliderChildrenEntries=[];
var _19=this._widget.getData();
var _1a=_19.children;
for(var i=0;i<_1a.length;i++){
var _1b=_1a[i];
if(this._isValidChildType(_1b.type)){
var _1c={"type":_1b.type,"properties":dojo.clone(_1b.properties)};
if(_1c.properties.isTempID){
delete _1c.properties.id;
}
this._sliderChildrenEntries.push(_1c);
}else{
}
}
this._updateDialog();
},hide:function(_1d){
if(this._inline){
var _1e;
while(_1e=this._connection.pop()){
dojo.disconnect(_1e);
}
this._inline.destroyRecursive();
delete this._inline;
}
this.inherited(arguments);
},updateWidget:function(){
var _1f=this._widget.getData();
if(_1f.properties.isTempID){
delete _1f.properties.id;
}
var _20=new davinci.ve.commands.ModifyCommand(this._widget,_1f.properties,this._sliderChildrenEntries,this._widget._edit_context);
this._widget._edit_context.getCommandStack().execute(_20);
this._widget=_20.newWidget;
this._widget._edit_context._focuses[0]._selectedWidget=this._widget;
var _21=this._widget.getContext();
_21.select(this._widget,null,false);
},_updateDialog:function(){
var _22=dojo.query(".sliderInputChildRow",this.domNode);
for(var i=_22.length-1;i>0;i--){
var _23=_22[i];
var _24=dojo.query(".sliderTypeSelect",_23);
var _25=dijit.byNode(_24[0]);
_25.destroyRecursive();
var _26=dojo.query(".sliderContainerSelect",_23);
var _27=dijit.byNode(_26[0]);
_27.destroyRecursive();
dojo.destroy(_23);
}
var _28=_22[0];
var _29=_28.parentNode;
var _2a=_28.nextSibling;
if(this._sliderChildrenEntries.length>0){
for(var i=0;i<this._sliderChildrenEntries.length;i++){
var _2b=this._sliderChildrenEntries[i];
var _2c=dojo.create("tr",{"className":"sliderInputChildRow"});
_2c.innerHTML=this._getRowTemplate();
_29.insertBefore(_2c,_2a);
dojo.parser.parse(_2c);
var _2d=dojo.query(".sliderInputChildLabel",_2c);
_2d[0].innerHTML=" #"+(i+1)+":";
var _24=dojo.query(".sliderTypeSelect",_2c);
var _25=dijit.byNode(_24[0]);
_25.set("value",this._getSelectValueAssociatedWithType(_2b.type));
this._connection.push(dojo.connect(_25,"onChange",dojo.hitch(this,function(){
this._updateDataStructureChildren();
this._updatePreview();
})));
var _26=dojo.query(".sliderContainerSelect",_2c);
var _27=dijit.byNode(_26[0]);
_27.set("value",this._getRuleOrLabelContainer(_2b));
this._connection.push(dojo.connect(_27,"onChange",dojo.hitch(this,function(){
this._updateDataStructureChildren();
this._updatePreview();
})));
var _2e=dojo.query(".sliderInputPlusButton",_2c)[0];
var _2f=dijit.byNode(_2e);
_2f.set("title",_10.bgdAddStop);
this._connection.push(dojo.connect(_2f,"onClick",dojo.hitch(this,function(_30){
var _31=this._createNewChildData(this._getWidgetTypeForRuleLabels());
this._sliderChildrenEntries.splice(_30+1,0,_31);
this._updateDialog();
},i)));
var _32=dojo.query(".sliderInputMinusButton",_2c)[0];
var _33=dijit.byNode(_32);
_33.set("title",_10.bgdRemoveStop);
this._connection.push(dojo.connect(_33,"onClick",dojo.hitch(this,function(_34){
this._sliderChildrenEntries.splice(_34,1);
this._updateDialog();
},i)));
}
}else{
var _35=dojo.create("tr",{"className":"sliderInputChildRow"});
_35.innerHTML=this._getRowTemplate();
_29.insertBefore(_35,_2a);
dojo.parser.parse(_35);
var _2d=dojo.query(".sliderInputChildLabel",_35);
_2d[0].innerHTML="";
var _24=dojo.query(".sliderTypeSelect",_35);
var _25=dijit.byNode(_24[0]);
_25.set("value",this._getSelectValueAssociatedWithType(this._getWidgetTypeForRuleLabels()));
_25.set("disabled","disabled");
var _26=dojo.query(".sliderContainerSelect",_35);
var _27=dijit.byNode(_26[0]);
_27.set("disabled","disabled");
var _2e=dojo.query(".sliderInputPlusButton",_35)[0];
var _2f=dijit.byNode(_2e);
_2f.set("title",_10.bgdAddStop);
this._connection.push(dojo.connect(_2f,"onClick",dojo.hitch(this,function(_36){
var _37=this._createNewChildData(this._getWidgetTypeForRuleLabels());
this._sliderChildrenEntries.splice(_36+1,0,_37);
this._updateDialog();
},i)));
var _32=dojo.query(".sliderInputMinusButton",_35)[0];
var _33=dijit.byNode(_32);
_33.set("disabled","disabled");
}
this._updatePreview();
},_updatePreview:function(){
var s=this._getPreviewContent();
var obj=this.contentWidget.previewArea;
obj.set("content",s);
},_getPreviewContent:function(){
var s="<div dojoType=\""+this._getWidgetTypeForSlider()+"\" style=\""+this._getWidgetStyleForSlider()+"\">";
for(var i=0;i<this._sliderChildrenEntries.length;i++){
var _38=this._sliderChildrenEntries[i];
if(_38.type===this._getWidgetTypeForRule()){
s+="   <div dojoType=\""+this._getWidgetTypeForRule()+"\"";
var _39=_38.properties;
var _3a=null;
for(_3a in _39){
if(_39.hasOwnProperty(_3a)){
s+="\t"+_3a+"=\""+_38.properties[_3a]+"\"";
}
}
s+="\t ></div>";
}else{
if(_38.type===this._getWidgetTypeForRuleLabels()){
s+="  <ol dojoType=\""+this._getWidgetTypeForRuleLabels()+"\"";
var _39=_38.properties;
var _3a=null;
for(_3a in _39){
if(_39.hasOwnProperty(_3a)){
s+="\t"+_3a+"=\""+_38.properties[_3a]+"\"";
}
}
s+="\t></ol>";
}
}
}
s+="</div>";
return s;
},_getRuleOrLabelContainer:function(_3b){
return _3b.properties.container;
},_isValidChildType:function(_3c){
return _3c===this._getWidgetTypeForRule()||this._getWidgetTypeForRuleLabels();
},_getSelectValueAssociatedWithType:function(_3d){
var _3e=null;
if(_3d===this._getWidgetTypeForRule()){
_3e="rules";
}else{
if(_3d===this._getWidgetTypeForRuleLabels()){
_3e="labels";
}else{
}
}
return _3e;
},_getTypeFromSelectValue:function(_3f){
var _40=null;
if(_3f==="rules"){
_40=this._getWidgetTypeForRule();
}else{
if(_3f==="labels"){
_40=this._getWidgetTypeForRuleLabels();
}else{
}
}
return _40;
},_updateDataStructureChildren:function(){
var _41=dojo.query(".sliderInputChildRow",this.domNode);
for(var i=1;i<_41.length;i++){
var _42=this._sliderChildrenEntries[i-1];
var _43=_41[i];
var _44=dojo.query(".sliderTypeSelect",_43);
var _45=dijit.byNode(_44[0]);
var _46=dojo.query(".sliderContainerSelect",_43);
var _47=dijit.byNode(_46[0]);
var _48=this._getTypeFromSelectValue(_45.get("value"));
if(_48!=_42.type){
var _49=this._createNewChildData(_48);
_42.properties.style=_49.properties.style;
if(_48===this._getWidgetTypeForRule()){
delete _42.properties.labelStyle;
delete _42.properties.labels;
delete _42.properties.numericMargin;
delete _42.properties.minimum;
delete _42.properties.maximum;
delete _42.properties.constraints;
}
}
_42.type=_48;
_42.properties.container=_47.get("value");
}
},_createNewChildData:function(_4a){
var _4b={"type":_4a,"properties":this._getPropertiesForNewChildData(_4a)};
return _4b;
},_getTemplate:function(_4c,_4d){
if(!this._substitutedMainTemplate){
this._substitutedMainTemplate=dojo.replace(_d,{ruleAndLabelsHeader:_10.ruleAndLabelsHeader,typeColHeader:_10.typeColHeader,containerColHeader:_10.containerColHeader,preview:_10.preview,buttonOk:_11.buttonOk,buttonCancel:_11.buttonCancel});
}
return this._substitutedMainTemplate;
},_getRowTemplate:function(){
if(!this._substitutedRowTemplate){
var _4e=this._getContainerOptions();
this._substitutedRowTemplate=dojo.replace(_e,{containerOptions0:_4e[0],containerOptions1:_4e[1],rulesSelectEntry:_10.rulesSelectEntry,labelsSelectEntry:_10.labelsSelectEntry});
}
return this._substitutedRowTemplate;
},destroy:function(){
dojo.forEach(this._connection,function(c){
dojo.disconnect(c);
});
},_getDialogTitle:function(){
return _10.horizontalSliderDialog;
},_getDialogDimensions:function(){
return {"width":610,"height":250};
},_getWidgetTypeForSlider:function(){
return "dijit.form.HorizontalSlider";
},_getWidgetStyleForSlider:function(){
return "width: 200px;";
},_getWidgetTypeForRule:function(){
return "dijit.form.HorizontalRule";
},_getWidgetTypeForRuleLabels:function(){
return "dijit.form.HorizontalRuleLabels";
},_getPropertiesForNewChildData:function(_4f){
var _50=null;
if(_4f===this._getWidgetTypeForRule()){
_50={"style":"height:5px;","container":"bottomDecoration"};
}else{
_50={"container":"bottomDecoration","style":"height:20px;"};
}
return _50;
},_getContainerOptions:function(){
return ["bottomDecoration","topDecoration"];
}});
});
