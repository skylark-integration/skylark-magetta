//>>built
define("maq-metadata-gridx/gridx/GridCreateTool",["dojo/_base/declare","maq-metadata-dojo/dojox/grid/DataGridCreateTool","dojo/Deferred"],function(_1,_2,_3){
return _1(_2,{constructor:function(_4){
this._useDataDojoProps=true;
},_augmentWidgetCreationProperties:function(_5){
var _6=new _3();
var _7=_5["data-dojo-props"];
var dj=this._context.getDojo();
var _8=dj.eval("({"+_7+"})");
dj.global.require([_8.cacheClass],function(_9){
_5.cacheClass=_9;
_6.resolve();
});
return _6.promise;
}});
});
