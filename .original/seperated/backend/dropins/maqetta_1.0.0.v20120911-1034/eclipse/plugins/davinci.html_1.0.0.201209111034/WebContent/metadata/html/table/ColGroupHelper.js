//>>built
define("maq-metadata-html/html/table/ColGroupHelper",["dojo/_base/declare","./TableMatrix"],function(_1,_2){
return _1(null,{getMarginBoxPageCoords:function(_3){
if(_3.type=="html.colgroup"){
var _4=_3.domNode;
var _5=new _2(_4);
var _6=_5.getSpan(_4);
if(_6==1){
_6=0;
dojo.forEach(_5.cols,function(_7){
_6=_6+_5.getSpan(_7);
}.bind(this));
}
return _5.getMarginBoxPageCoordsForColumns(0,_6);
}else{
console.error("ColGroupHelper called with invalid widget type = "+_3.type);
return null;
}
}});
});
