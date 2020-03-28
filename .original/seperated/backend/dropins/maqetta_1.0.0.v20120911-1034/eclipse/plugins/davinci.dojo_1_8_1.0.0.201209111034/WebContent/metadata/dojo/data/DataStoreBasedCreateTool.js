//>>built
define("maq-metadata-dojo/dojo/data/DataStoreBasedCreateTool",["dojo/_base/declare","dojo/Deferred","dojo/promise/all","davinci/ve/tools/CreateTool","davinci/ve/widget","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/MoveCommand","davinci/ve/commands/ResizeCommand","davinci/ve/commands/StyleCommand","./DataStoreBasedWidgetInput"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
return _1(_4,{_useDataDojoProps:false,_debug:false,constructor:function(_c){
this._resizable="both";
},_create:function(_d){
if(this._data.length!==2){
console.error("DataStoreBasedCreateTool:_create incorrect number of items in this._data.");
return;
}
if(this._debug){
console.error("!!!!!!!!!DataStoreBasedCreateTool::_create BEFORE this._loadRequires()");
}
this._loadRequires().then(dojo.hitch(this,function(_e){
if(this._debug){
console.error("******** DataStoreBasedCreateTool::_create ALL promises fulfilled!");
}
if(_e.every(function(_f){
return _f;
})){
this._getCreateCommand(_d).then(function(_10){
this._context.getCommandStack().execute(_10);
this._select(this._widget);
}.bind(this));
}else{
console.error("DataStoreBasedCreateTool:_loadRequires failed to load all requires");
}
}));
},_getCreateCommand:function(_11){
var _12=new _2();
var _13=this._data[0];
var _14=this._data[1];
var _15=_5.getUniqueObjectId(_13.type,this._context.getDocument());
if(!_13.properties){
_13.properties={};
}
_13.properties.jsId=_15;
_13.properties.id=_15;
_13.context=this._context;
if(_13.properties.data){
var _16=_13.properties.data;
var _17=_16.items;
var _18=dojo.hitch(this,function(_19){
var win=this._context.getGlobal();
var _1a=win.eval("[]");
for(var i=0;i<_19.length;i++){
var _1b=_19[i];
var _1c=win.eval("new Object()");
var _1d=this._context.getDojo().mixin(_1c,_1b);
_1a.push(_1d);
if(_1d.children){
_1d.children=_18(_1d.children);
}
}
return _1a;
});
_16.items=_18(_17);
}
if(!_14.properties){
_14.properties={};
}
_14.context=this._context;
var _1e,_1f;
var _20=function(_21,_22){
if(!_21||!_22){
_12.reject("DataStoreBasedCreateTool:_getCreateCommand failed to create either store and/or grid.");
return;
}
var _23=new _6();
var _24=_11.index;
_23.add(new _7(_21,_11.parent,_24));
_24=(_24!==undefined&&_24>=0?_24+1:undefined);
_23.add(new _7(_22,_11.parent,_24));
if(_11.position){
var _25=this._context.getPreference("absoluteWidgetsZindex");
_23.add(new _a(_22,[{position:"absolute"},{"z-index":_25}]));
_23.add(new _8(_22,_11.position.x,_11.position.y));
}
_11.size=this._getInitialSize(_22,_11);
if(_11.size){
_23.add(new _9(_22,_11.size.w,_11.size.h));
}
this._widget=_22;
_12.resolve(_23);
}.bind(this);
var dj=this._context.getDojo();
dojo.withDoc(this._context.getDocument(),function(){
_1e=_5.createWidget(_13);
});
_14.properties.store=dj.getObject(_15);
if(this._useDataDojoProps){
var _26=_14.properties["data-dojo-props"];
_26=_b.setPropInDataDojoProps(_26,"store",_15);
_14.properties["data-dojo-props"]=_26;
var _27=dj.eval("({"+_26+"})");
_14.properties.structure=_27.structure;
}
this._augmentWidgetCreationProperties(_14.properties).then(function(){
dojo.withDoc(this._context.getDocument(),function(){
_1f=_5.createWidget(_14);
});
_20(_1e,_1f);
}.bind(this));
return _12.promise;
},_augmentWidgetCreationProperties:function(_28){
var _29=new _2();
_29.resolve();
return _29.promise;
},addPasteCreateCommand:function(_2a,_2b){
this._context=this._data.context;
if(this._data.associatedCopiedWidgetData){
var _2c=[];
dojo.forEach(this._data.associatedCopiedWidgetData,function(_2d){
_2c.push(_2d);
});
_2c.push(this._data);
this._data=_2c;
}
var _2e=new _2();
this._loadRequires().then(dojo.hitch(this,function(_2f){
if(_2f.every(function(arg){
return arg;
})){
this._getCreateCommand(_2b).then(function(_30){
_2a.add(_30);
_2e.resolve(this._widget);
}.bind(this));
}else{
_2e.reject(new Error("DataStoreBasedCreateTool:_loadRequires failed to load all requires"));
}
}));
return _2e.promise;
},_loadRequires:function(){
return _3(this._data.map(function(_31){
if(this._debug){
console.error("\tDataStoreBasedCreateTool::_loadRequires asking for requires for "+_31.type);
}
var _32=this._context.loadRequires(_31.type,true);
if(this._debug){
_32.then(function(){
console.error("\t\t!!!!!!!!!!!DataStoreBasedCreateTool::_loadRequires requires for "+_31.type+" fulfilled!");
},function(err){
console.error("\t\t!!!!!!!!!!!DataStoreBasedCreateTool::_loadRequires requires for "+_31.type+" ERROR!!!!!");
});
}
return _32;
},this));
}});
});
