//>>built
define("maq-metadata-dojo/dojox/mobile/ToolBarButtonHelper",function(){
var _1=function(){
};
_1.prototype={preProcessData:function(_2){
if(_2.properties&&dojo.isString(_2.properties.label)&&_2.properties.label.length==0){
delete _2.properties.label;
}
return _2;
},create:function(_3,_4){
var _5=_3.dijitWidget;
if(_5){
var _6=_5.domNode;
if(_6){
var _7=_6.parentNode;
if(_7){
_7.addEventListener("click",function(e){
e.stopPropagation();
},true);
}
}
}
}};
return _1;
});
