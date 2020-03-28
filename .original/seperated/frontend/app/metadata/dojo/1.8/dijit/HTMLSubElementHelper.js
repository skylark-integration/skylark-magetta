//>>built
define("maq-metadata-dojo/dijit/HTMLSubElementHelper",[],function(){
var _1=function(){
};
_1.prototype={getChildrenData:function(_2,_3){
if(!_2||!_2._srcElement){
return undefined;
}
var _4=[];
dojo.forEach(_2._srcElement.children,function(_5){
this._getChildrenDataHelper(_5,_4);
}.bind(this));
return _4;
},_getChildrenDataHelper:function(_6,_7){
var _8=this._getElementData(_6);
if(_8){
_7.push(_8);
dojo.forEach(_6.children,function(_9){
this._getChildrenDataHelper(_9,_8.children);
}.bind(this));
}
},_getElementData:function(_a){
var _b=null;
if(_a.elementType=="HTMLElement"){
_b={type:"html."+_a.tag,properties:{},children:[]};
dojo.forEach(_a.attributes,function(_c){
if(!_c.noPersist){
_b.properties[_c.name]=_c.value;
}
});
}else{
if(_a.elementType=="HTMLText"){
_b=_a.value.trim();
}
}
return _b;
}};
return _1;
});
