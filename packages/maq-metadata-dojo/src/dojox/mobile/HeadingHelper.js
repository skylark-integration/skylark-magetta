//>>built
define("maq-metadata-dojo/dojox/mobile/HeadingHelper",["dojo/_base/declare","dojo/query","./_FixedElemMixin","./InitialSizeHelper"],function(_1,_2,_3,_4){
return _1([_3,_4],{create:function(_5,_6){
var _7=_5.dijitWidget;
if(_7){
var _8=_7.domNode;
var _9=_2(".mblArrowButton",_8)[0];
if(_9){
_9.addEventListener("click",function(e){
e.stopPropagation();
},true);
}
}
},getData:function(_a,_b){
var _c=_a._getData(_b);
if(_a.dijitWidget.backButton){
_c.children.splice(0,1);
}
return _c;
}});
});
