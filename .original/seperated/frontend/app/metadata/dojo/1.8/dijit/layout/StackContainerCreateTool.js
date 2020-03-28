//>>built
define("maq-metadata-dojo/dijit/layout/StackContainerCreateTool",["dojo/_base/declare","dojo/Deferred","dojo/promise/all","davinci/ve/tools/CreateTool","davinci/ve/widget","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/MoveCommand","davinci/ve/commands/ResizeCommand"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
return _1(_4,{constructor:function(_a){
this._resizable="both";
},_create:function(_b){
this._loadRequires().then(dojo.hitch(this,function(_c){
if(_c.every(function(_d){
return _d;
})){
var _e=this._getCreateCommand(_b);
this._context.getCommandStack().execute(_e);
this._select(this._container);
}else{
}
}));
},_getCreateCommand:function(_f){
if(this._data.length!==2){
return;
}
var _10=this._data[0];
var _11=this._data[1];
var _12=_5.getUniqueObjectId(_11.type,this._context.getDocument());
if(_10.properties){
_10.properties.containerId=_12;
}else{
_10.properties={containerId:_12};
}
if(_11.properties){
_11.properties.id=_12;
}else{
_11.properties={id:_12};
}
_11.context=this._context;
_10.context=this._context;
var _13,_14;
dojo.withDoc(this._context.getDocument(),function(){
_13=_5.createWidget(_10);
_14=_5.createWidget(_11);
});
if(!_13||!_14){
return;
}
var _15=new _6();
_15.add(new _7(_13,_f.parent,_f.index));
var _16=(_f.index!==undefined&&_f.index>=0?_f.index+1:undefined);
_15.add(new _7(_14,_f.parent,_16));
if(_f.position){
_15.add(new _8(_13,_f.position.x,_f.position.y-30));
_15.add(new _8(_14,_f.position.x,_f.position.y));
}
_f.size=this._getInitialSize(_14,_f);
if(_f.size){
_15.add(new _9(_14,_f.size.w,_f.size.h));
}
this._container=_14;
return _15;
},addPasteCreateCommand:function(_17,_18){
this._context=this._data.context;
this._data=[{type:"dijit.layout.StackController"},this._data];
var _19=new _2();
this._loadRequires().then(dojo.hitch(this,function(_1a){
if(_1a.every(function(arg){
return arg;
})){
_17.add(this._getCreateCommand(_18));
_19.resolve(this._container);
}else{
}
}));
return _19.promise;
},_loadRequires:function(){
var _1b=[];
_1b.push(this._context.loadRequires(this._data[0].type,true));
_1b.push(this._context.loadRequires(this._data[1].type,true));
_1b.push(this._context.loadRequires("dijit.layout.ContentPane",true));
return _3(_1b);
}});
});
