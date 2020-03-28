//>>built
define("maq-metadata-html/html/table/CellHelper",["dojo/_base/declare","./TableMatrix"],function(_1,_2){
return _1(null,{getChildrenData:function(_3,_4){
var _5=_3.domNode;
if(_5.childNodes.length===1&&_5.firstChild.nodeType===3){
return _5.innerHTML.trim();
}else{
return _3._getChildrenData(_4);
}
}});
});
