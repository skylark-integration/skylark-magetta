//>>built
define("maq-metadata-dojo/dojox/mobile/ComboBoxCreateTool",["dojo/_base/declare","dojo/Deferred","dojo/promise/all","davinci/ve/tools/CreateTool","davinci/ve/widget","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/StyleCommand","davinci/ve/commands/MoveCommand","davinci/ve/commands/ResizeCommand","./ComboBoxHelper"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
return _1(_4,{constructor:function(_c){
this._resizable="both";
},_create:function(_d){
this._loadRequires().then(dojo.hitch(this,function(_e){
if(_e.every(function(_f){
return _f;
})){
var _10=this._getCreateCommand(_d);
this._context.getCommandStack().execute(_10);
this._select(this._mobileWidget);
}else{
}
}));
},_getCreateCommand:function(_11){
if(this._data.length!==2){
return;
}
var _12=this._data[0];
var _13=this._data[1];
var _14=_5.getUniqueObjectId(_12.type,this._context.getDocument());
if(!_12.properties){
_12.properties={};
}
_12.properties.id=_14;
_12.properties["data-dojo-props"]="id:\""+_14+"\"";
_12.context=this._context;
if(!_13.properties){
_13.properties={};
}
_13.context=this._context;
_13.properties["data-dojo-props"]="value:\"Item 1\", list:\""+_14+"\"";
var _15,_16;
dojo.withDoc(this._context.getDocument(),function(){
_15=_5.createWidget(_12);
_16=_5.createWidget(_13);
});
if(!_15||!_16){
console.error(this.declaredClass+"Error creating widgets");
return;
}
_16.dijitWidget.store=_15.dijitWidget;
var _17=new _6();
var _18=_11.index;
var _19=_5.getWidget(this._context.rootNode);
_17.add(new _7(_15,_19,0));
_18=(_18!==undefined&&_18>=0?_18+1:undefined);
_17.add(new _7(_16,_11.parent,_18));
if(_11.position){
var _1a=this._context.getPreference("absoluteWidgetsZindex");
_17.add(new _8(_16,[{position:"absolute"},{"z-index":_1a}]));
_17.add(new _9(_16,_11.position.x,_11.position.y));
}
_11.size=this._getInitialSize(_16,_11);
if(_11.size){
_17.add(new _a(_16,_11.size.w,_11.size.h));
}
this._mobileWidget=_16;
return _17;
},addPasteCreateCommand:function(_1b,_1c){
this._context=this._data.context;
var _1d=this._data.properties["data-dojo-props"].split(",");
var x=new _b();
var _1e=x.getStoreValues(_1d);
var _1f=_5.byId(_1e.storeId);
var _20=_1f.getData();
var _21=[];
if(this._data.associatedCopiedWidgetData){
var _21=[];
dojo.forEach(this._data.associatedCopiedWidgetData,function(_22){
_21.push(_22);
});
_21.push(this._data);
this._data=_21;
}
var _23=new _2();
this._loadRequires().then(dojo.hitch(this,function(_24){
if(_24.every(function(arg){
return arg;
})){
_1b.add(this._getCreateCommand(_1c));
_23.resolve(this._mobileWidget);
}else{
_23.reject(new Error("ComboBoxCreateTool:_loadRequires failed to load all requires"));
}
}));
return _23.promise;
},_loadRequires:function(){
return _3(this._data.map(function(_25){
return this._context.loadRequires(_25.type,true);
},this));
}});
});
