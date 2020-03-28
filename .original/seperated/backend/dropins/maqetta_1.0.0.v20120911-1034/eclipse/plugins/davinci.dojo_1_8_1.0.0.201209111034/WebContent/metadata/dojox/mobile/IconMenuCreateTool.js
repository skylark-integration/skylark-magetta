//>>built
define("maq-metadata-dojo/dojox/mobile/IconMenuCreateTool",["dojo/_base/declare","davinci/ve/tools/CreateTool","davinci/model/Path",],function(_1,_2,_3){
return _1(_2,{create:function(_4){
var _5=new _3(this._context._srcDocument.fileName);
dojo.forEach(this._data.children,dojo.hitch(this,function(_6){
var _7=new _3(_6.properties.icon);
_6.properties.icon=_7.relativeTo(_5.getParentPath(),true).toString();
}));
var _8=_4.target,_9,_a;
while(_8){
_9=_8.getContainerNode();
if(_9){
break;
}
_a=_8;
_8=_8.getParent();
}
var _b=_4.index;
var _c=_4.position;
this._data.context=this._context;
this._create({parent:_8,index:_b,position:_c,size:_4.size});
}});
});
