//>>built
define("maq-metadata-gridx/gridx/GridWizardDataSourcePanel",["dojo/_base/declare","dijit/layout/ContentPane","./GridInput","./GridWizardPanel","dojo/i18n!./nls/gridx"],function(_1,_2,_3,_4,_5){
return _1([_2,_4],{postCreate:function(){
var _6=this._dataSourceInputContainer=new _2();
dojo.addClass(_6.domNode,"dataSourcePanelDataSourceInputContainer");
this.setContent(_6);
},getStepLabel:function(){
return _5.dataSourceHeader;
},populate:function(_7){
this._gridInput=new _3();
this._gridInput._embeddingContentPane=this._dataSourceInputContainer;
this._gridInput.show(_7.id);
this._saveInputValues();
this.inherited(arguments);
},resize:function(_8){
this.inherited(arguments);
if(this._gridInput&&(!this._oldSize||this._oldSize.w!=_8.w||this._oldSize.h!=_8.h)){
var _9=dojo.byId("ieb");
dojo.style(_9,"width",_8.w-30+"px");
var _a=dojo.byId("iedResizeDiv");
dojo.style(_a,"width",_8.w-30+"px");
dojo.style(_a,"height",_8.h-100+"px");
this._gridInput.resize();
this._oldSize=_8;
}
},getUpdateWidgetCommand:function(_b){
this._saveInputValues();
this._gridInput.getUpdateWidgetCommand(_b);
},isValid:function(){
var _c=true;
var _d=this._getInputValues();
if(!_d.mainTextAreaValue){
if(_d.dropDownSelectValue==="dummyData"){
_c=_5.commaSeparatedDataRequired;
}else{
if(_d.dropDownSelectValue==="file"){
_c=_5.dataFileRequired;
}else{
if(_d.dropDownSelectValue==="url"){
_c=_5.urlRequired;
}
}
}
}
return _c;
},isDirty:function(){
var _e=this._getInputValues();
var _f=true;
if(this._savedInputValues){
_f=_e.dropDownSelectValue!=this._savedInputValues.dropDownSelectValue||_e.mainTextAreaValue!=this._savedInputValues.mainTextAreaValue||_e.callbackTextBoxValue!=this._savedInputValues.callbackTextBoxValue;
}
return _f;
},_saveInputValues:function(){
this._savedInputValues=this._getInputValues();
},_getInputValues:function(){
var _10={};
var _11=dijit.byId("davinci.ve.input.DataGridInput.dataStoreType");
_10.dropDownSelectValue=_11.get("value");
var _12=dijit.byId("davinciIleb");
_10.mainTextAreaValue=_12.get("value");
var _13=dijit.byId("davinci.ve.input.SmartInput_callback_editbox");
_10.callbackTextBoxValue=_13.get("value");
return _10;
},destroy:function(){
this.inherited(arguments);
this._gridInput.hide();
}});
});
