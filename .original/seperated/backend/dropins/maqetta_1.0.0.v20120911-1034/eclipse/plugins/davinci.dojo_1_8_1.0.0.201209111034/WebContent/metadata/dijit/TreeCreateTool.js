//>>built
define("maq-metadata-dojo/dijit/TreeCreateTool",["dojo/_base/declare","dojo/Deferred","dojo/promise/all","davinci/ve/tools/CreateTool","davinci/ve/widget","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/MoveCommand","davinci/ve/commands/ResizeCommand","davinci/ve/commands/StyleCommand","./TreeHelper"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
return _1(_4,{constructor:function(_c){
this._resizable="both";
this._treeHelper=new _b();
},_create:function(_d){
this._loadRequires().then(dojo.hitch(this,function(_e){
if(_e.every(function(_f){
return _f;
})){
var _10=this._getCreateCommand(_d);
this._context.getCommandStack().execute(_10);
this._select(this._tree);
this._treeHelper._updateTreeSelectionChrome(this._context,this._tree);
}else{
}
}));
},_getCreateCommand:function(_11){
if(this._data.length!==3){
return;
}
var _12=this._data[0];
var _13=this._data[1];
var _14=this._data[2];
var _15=_5.getUniqueObjectId(_12.type,this._context.getDocument());
if(!_12.properties){
_12.properties={};
}
_12.properties.jsId=_15;
_12.properties.id=_15;
_12.context=this._context;
var _16=_5.getUniqueObjectId(_13.type,this._context.getDocument());
if(!_13.properties){
_13.properties={};
}
_13.properties.jsId=_16;
_13.properties.id=_16;
_13.context=this._context;
if(!_14.properties){
_14.properties={};
}
_14.context=this._context;
var _17,_18,_19;
var dj=this._context.getDojo();
dojo.withDoc(this._context.getDocument(),function(){
this._treeHelper._addStoreScriptBlocks(_12);
_17=_5.createWidget(_12);
_13.properties.store=dj.getObject(_15);
this._treeHelper._addStoreFunctions(_13.properties.store);
this._treeHelper._addModelScriptBlocks(_13);
_18=_5.createWidget(_13);
_14.properties.model=dj.getObject(_16);
this._treeHelper._addModelFunctions(_14.properties.model);
_19=_5.createWidget(_14);
}.bind(this));
if(!_17||!_18||!_19){
return;
}
var _1a=new _6();
var _1b=_11.index;
_1a.add(new _7(_17,_11.parent,_1b));
_1b=(_1b!==undefined&&_1b>=0?_1b+1:undefined);
_1a.add(new _7(_18,_11.parent,_1b));
_1b=(_1b!==undefined&&_1b>=0?_1b+1:undefined);
_1a.add(new _7(_19,_11.parent,_1b));
if(_11.position){
var _1c=this._context.getPreference("absoluteWidgetsZindex");
_1a.add(new _a(_19,[{position:"absolute"},{"z-index":_1c}]));
_1a.add(new _8(_19,_11.position.x,_11.position.y));
}
_11.size=this._getInitialSize(_19,_11);
if(_11.size){
_1a.add(new _9(_19,_11.size.w,_11.size.h));
}
this._tree=_19;
return _1a;
},addPasteCreateCommand:function(_1d,_1e){
this._context=this._data.context;
if(this._data.associatedCopiedWidgetData){
var _1f=[];
dojo.forEach(this._data.associatedCopiedWidgetData,function(_20){
_1f.push(_20);
});
_1f.push(this._data);
this._data=_1f;
}
var _21=new _2();
this._loadRequires().then(function(_22){
if(_22.every(function(arg){
return arg;
})){
_1d.add(this._getCreateCommand(_1e));
_21.resolve(this._tree);
}else{
_21.reject(new Error("TreeCreateTool:_loadRequires failed to load all requires"));
}
}.bind(this));
return _21.promise;
},_loadRequires:function(){
return _3(this._data.map(function(_23){
return this._context.loadRequires(_23.type,true);
},this));
}});
});
