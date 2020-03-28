//>>built
define("maq-metadata-dojo/dijit/tree/TreeModelHelper",["../HTMLSubElementHelper"],function(_1){
var _2=function(){
};
_2.prototype={getData:function(_3,_4){
if(!_3){
return undefined;
}
var _5=_3._getData(_4);
var dj=_3.getContext().getDojo();
dojo.withDoc(_3.getContext().getDocument(),function(){
var _6=_3._srcElement.getAttribute("store");
if(_6){
_5.properties.store=dj.getObject(_6);
}
var _7=_3._srcElement.getAttribute("query");
if(_7){
_5.properties.query=JSON.parse(_7);
}
});
return _5;
},getChildrenData:function(_8,_9){
if(!this._htmlSubElementHelper){
this._htmlSubElementHelper=new _1();
}
return this._htmlSubElementHelper.getChildrenData(_8,_9);
},cleanSrcElement:function(_a){
var _b=_a.getAttribute("store");
if(_b&&_b.id){
_a.setAttribute("store",_b.id);
}
}};
return _2;
});
