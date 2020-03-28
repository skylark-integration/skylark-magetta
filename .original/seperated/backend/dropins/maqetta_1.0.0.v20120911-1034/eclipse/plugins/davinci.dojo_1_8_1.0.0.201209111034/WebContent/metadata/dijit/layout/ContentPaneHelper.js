//>>built
define("maq-metadata-dojo/dijit/layout/ContentPaneHelper",["dojo/i18n!../nls/dijit"],function(_1){
var _2=function(){
};
_2.prototype={create:function(_3,_4){
var _5=_3.getParent();
if(_5&&(_5.type=="dojox.layout.RadioGroup"||_5.type=="dojox.layout.RadioGroupSlide"||_5.type=="dojox.layout.RadioGroupFade")){
if(!_3.getStyle().match("background")){
_3.setStyleValues({background:"white"});
}
}
},getContainerNode:function(_6){
if(!_6){
return undefined;
}
_6=_6.dijitWidget;
if(_6.href){
return undefined;
}
return _6.containerNode||_6.domNode;
},getWidgetDescriptor:function(_7){
var _8="";
var _9=_7.attr("region");
if(_9){
if(_8.length>0){
_8+=" ";
}
_8+=dojo.replace(_1.paneRegion,[_9]);
}
return _8;
}};
return _2;
});
