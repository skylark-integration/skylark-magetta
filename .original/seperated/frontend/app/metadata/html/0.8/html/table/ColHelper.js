//>>built
define("maq-metadata-html/html/table/ColHelper",["dojo/_base/declare","./TableMatrix"],function(_1,_2){
return _1(null,{getMarginBoxPageCoords:function(_3){
if(_3.type=="html.col"){
var _4=_3.domNode;
var _5=new _2(_4);
var _6=_5.getAdjustedColIndex(_4);
var _7=_5.getSpan(_4);
return _5.getMarginBoxPageCoordsForColumns(_6,_7);
}else{
console.error("ColHelper called with invalid widget type = "+_3.type);
return null;
}
}});
});
