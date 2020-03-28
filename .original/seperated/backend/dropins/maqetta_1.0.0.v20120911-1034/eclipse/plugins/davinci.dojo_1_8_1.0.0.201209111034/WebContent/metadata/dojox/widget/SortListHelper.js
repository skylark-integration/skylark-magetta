//>>built
define("maq-metadata-dojo/dojox/widget/SortListHelper",["dojo/_base/array","dojo/query","davinci/ve/widget"],function(_1,_2,_3){
var _4=function(){
};
_4.prototype={getData:function(_5,_6){
if(!_5){
return undefined;
}
var _7=_3._getData(_5,_6);
if(_7&&_7.properties&&_7.properties.store){
_7.properties.store=_3.getObjectId(_7.properties.store);
}
return _7;
},getChildrenData:function(_8,_9){
if(!_8){
return undefined;
}
if(_8.store){
return undefined;
}
var _a=[];
var _b=_2("li",_8.containerNode);
_1.forEach(_b,function(n){
_a.push({type:"html.li",children:n.innerHTML});
});
if(_a.length===0){
return undefined;
}
return _a;
}};
return _4;
});
