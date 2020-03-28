//>>built
define("maq-metadata-dojo/dojox/mobile/TabBarButtonHelper",["dojo/query"],function(_1){
var _2=function(){
};
_2.prototype={create:function(_3,_4){
var _5=_3.dijitWidget;
if(_5){
var _6=_5.domNode;
var _7=_1(".mblTabBarButtonAnchor",_6)[0];
if(_7){
_7.addEventListener("click",function(e){
e.stopPropagation();
},true);
}
}
}};
return _2;
});
