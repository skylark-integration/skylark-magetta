//>>built
define("maq-metadata-dojo/dojox/grid/TreeGridCreateTool",["dojo/_base/declare","davinci/ve/tools/CreateTool","davinci/ve/widget","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/MoveCommand","davinci/ve/commands/ResizeCommand","davinci/ve/commands/StyleCommand","dojo/promise/all"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
return _1(_2,{constructor:function(_a){
this._resizable="both";
},_create:function(_b){
if(this._data.length!==2){
return;
}
var _c=this._data[0],_d=this._data[1];
_9([this._context.loadRequires(_c.type,true),this._context.loadRequires(_d.type,true)]).then(function(){
var _e=_3.getUniqueObjectId(_c.type,this._context.getDocument());
if(!_c.properties){
_c.properties={};
}
_c.properties.jsId=_e;
_c.properties.id=_e;
_c.context=this._context;
var _f=_c.properties.data;
var _10=_f.items;
var _11=dojo.hitch(this,function(_12){
var win=this._context.getGlobal();
var _13=win.eval("[]");
for(var i=0;i<_12.length;i++){
var _14=_12[i];
var _15=win.eval("new Object()");
var _16=this._context.getDojo().mixin(_15,_14);
_13.push(_16);
if(_16.children){
_16.children=_11(_16.children);
}
}
return _13;
});
_f.items=_11(_10);
var _17=_3.getUniqueObjectId(_d.type,this._context.getDocument());
if(!_d.properties){
_d.properties={};
}
_d.context=this._context;
var _18,_19;
var dj=this._context.getDojo();
dojo.withDoc(this._context.getDocument(),function(){
_18=_3.createWidget(_c);
_d.properties.store=dj.getObject(_e);
_19=_3.createWidget(_d);
});
if(!_18||!_19){
return;
}
var _1a=new _4();
var _1b=_b.index;
_1a.add(new _5(_18,_b.parent,_1b));
_1b=(_1b!==undefined&&_1b>=0?_1b+1:undefined);
_1a.add(new _5(_19,_b.parent,_1b));
if(_b.position){
var _1c=this._context.getPreference("absoluteWidgetsZindex");
_1a.add(new _8(_19,[{position:"absolute"},{"z-index":_1c}]));
_1a.add(new _6(_19,_b.position.x,_b.position.y));
}
_b.size=this._getInitialSize(_19,_b);
if(_b.size){
_1a.add(new _7(_19,_b.size.w,_b.size.h));
}
this._context.getCommandStack().execute(_1a);
this._select(_19);
}.bind(this));
}});
});
