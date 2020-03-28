//>>built
define("maq-metadata-dojo/dijit/DialogCreateTool",["dojo/_base/declare","davinci/ve/tools/CreateTool","davinci/ve/widget","davinci/ve/States","dojo/DeferredList"],function(_1,_2,_3,_4,_5){
return _1(_2,{create:function(_6){
var _7=_3.getWidget(this._context.rootNode);
if(!this._data.properties){
this._data.properties={};
}
this._data.properties.id=dijit.getUniqueId(this._data.type.replace(/\./g,"_"));
this._data.context=this._context;
new _5(this._requireHelpers(this._data)).then(function(){
var _8=this._create({parent:_7}),_9=_4.getContainer();
_4.add(_9,"_show:"+_8.getId());
}.bind(this));
}});
});
