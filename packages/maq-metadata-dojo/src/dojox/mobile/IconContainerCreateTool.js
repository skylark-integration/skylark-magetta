//>>built
define("maq-metadata-dojo/dojox/mobile/IconContainerCreateTool",["dojo/_base/declare","dojo/_base/window","dojo/promise/all","davinci/ve/tools/CreateTool","davinci/ve/widget","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/StyleCommand","davinci/ve/commands/MoveCommand","davinci/ve/commands/ResizeCommand"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
return _1(_4,{_create:function(_b){
var _c=this._data[0],_d=_c.children,_e=this._context;
delete _c.children;
_3(_d.concat(_c).map(function(_f){
return _e.loadRequires(_f.type,true);
},this)).then(function(){
_c.context=_e;
var _10,_11=[];
_2.withDoc(_e.getDocument(),function(){
_10=_5.createWidget(_c);
_d.forEach(function(_12){
_12.context=_e;
_11.push(_5.createWidget(_12));
});
});
if(!_10){
return;
}
var _13=new _6();
_13.add(new _7(_10,_b.parent,_b.index));
_11.forEach(function(_14,idx){
_13.add(new _7(_14,_10,idx));
});
if(_b.position){
var _15=_e.getPreference("absoluteWidgetsZindex");
_13.add(new _8(_10,[{position:"absolute"},{"z-index":_15}]));
_13.add(new _9(_10,_b.position.x,_b.position.y));
}
if(_b.size){
var w=_b.size&&_b.size.w,h=_b.size&&_b.size.h;
_13.add(new _a(_10,w,h));
}
_e.getCommandStack().execute(_13);
this._select(_10);
return _10;
}.bind(this));
}});
});
