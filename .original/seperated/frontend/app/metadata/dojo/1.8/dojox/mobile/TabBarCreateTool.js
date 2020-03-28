//>>built
define("maq-metadata-dojo/dojox/mobile/TabBarCreateTool",["dojo/_base/declare","davinci/ve/tools/CreateTool","davinci/model/Path",],function(_1,_2,_3){
return _1(_2,{create:function(_4){
var _5=new _3(this._context._srcDocument.fileName);
dojo.forEach(this._data.children,dojo.hitch(this,function(_6){
var _7=new _3(_6.properties.icon1);
var _8=new _3(_6.properties.icon2);
_6.properties.icon1=_7.relativeTo(_5.getParentPath(),true).toString();
_6.properties.icon2=_8.relativeTo(_5.getParentPath(),true).toString();
}));
var _9=_4.target,_a,_b;
while(_9){
_a=_9.getContainerNode();
if(_a){
break;
}
_b=_9;
_9=_9.getParent();
}
var _c=_4.index;
var _d;
var _e=false;
if(this._data.properties&&this._data.properties.style&&(this._data.properties.style.indexOf("absolute")>0)){
_e=true;
}
if(!_e&&this.createWithFlowLayout()){
if(_b){
_c=_9.indexOf(_b);
}
}else{
if(_4.position){
_d=_4.position;
}else{
if(this._position){
_d=this._position;
}
}
}
this._data.context=this._context;
this._create({parent:_9,index:_c,position:_d,size:_4.size});
}});
});
