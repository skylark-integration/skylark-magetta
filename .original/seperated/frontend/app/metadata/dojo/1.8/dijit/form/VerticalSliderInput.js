//>>built
define("maq-metadata-dojo/dijit/form/VerticalSliderInput",["dojo/_base/declare","./HorizontalSliderInput","dijit/form/VerticalSlider","dijit/form/VerticalRule","dijit/form/VerticalRuleLabels","dojo/i18n!../nls/dijit"],function(_1,_2,_3,_4,_5,_6){
return _1(_2,{_getDialogTitle:function(){
return _6.verticalSliderDialog;
},_getDialogDimensions:function(){
return {"width":610,"height":370};
},_getWidgetTypeForSlider:function(){
return "dijit.form.VerticalSlider";
},_getWidgetStyleForSlider:function(){
return "height: 200px;";
},_getWidgetTypeForRule:function(){
return "dijit.form.VerticalRule";
},_getWidgetTypeForRuleLabels:function(){
return "dijit.form.VerticalRuleLabels";
},_getPropertiesForNewChildData:function(_7){
var _8=null;
if(_7===this._getWidgetTypeForRule()){
_8={"style":"width:5px;","container":"rightDecoration"};
}else{
_8={"container":"rightDecoration","style":"width:3em;"};
}
return _8;
},_getContainerOptions:function(){
return ["rightDecoration","leftDecoration"];
}});
});
