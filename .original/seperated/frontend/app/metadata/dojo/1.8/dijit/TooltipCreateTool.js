//>>built
define("maq-metadata-dojo/dijit/TooltipCreateTool",["dojo/_base/declare","davinci/ve/tools/CreateTool","davinci/ve/widget","davinci/ve/commands/ModifyCommand","davinci/ve/States","dojo/DeferredList"],function(_1,_2,_3,_4,_5,_6){
return _1(_2,{create:function(_7){
var _8=_3.getWidget(this._context.rootNode),_9=_7.directTarget;
if(!this._data.properties){
this._data.properties={};
}
this._data.properties.id=dijit.getUniqueId(this._data.type.replace(/\./g,"_"));
this._data.properties.connectId=[];
if(_9&&_9!=this._context.container){
var _a=_9.getId();
if(!_a){
_a="auto_"+dijit.getUniqueId(_9.type);
this._context.getCommandStack().execute(new _4(_9,{id:_a}));
}
if(_a){
this._data.properties.connectId.push(_a);
}
}
this._data.context=this._context;
new _6(this._requireHelpers(this._data)).then(function(){
var _b=this._create({parent:_8}),_c=_5.getContainer();
_5.add(_c,"_show:"+_b.getId());
}.bind(this));
}});
});
