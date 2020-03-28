//>>built
define("maq-metadata-dojo/dojo/store/MemoryHelper",["davinci/ve/widget","../../dijit/HTMLSubElementHelper"],function(_1,_2){
var _3=function(){
};
_3.prototype={getData:function(_4,_5){
if(!_4){
return undefined;
}
var _6=_4._getData(_5);
var _7=_4._srcElement.getAttribute("data");
if(_7){
_6.properties.data=JSON.parse(_7);
}
return _6;
},getChildrenData:function(_8,_9){
if(!this._htmlSubElementHelper){
this._htmlSubElementHelper=new _2();
}
return this._htmlSubElementHelper.getChildrenData(_8,_9);
}};
return _3;
});
