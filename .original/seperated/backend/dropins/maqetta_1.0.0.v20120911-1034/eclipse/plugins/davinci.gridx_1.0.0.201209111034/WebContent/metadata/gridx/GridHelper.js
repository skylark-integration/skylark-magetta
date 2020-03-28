//>>built
define("maq-metadata-gridx/gridx/GridHelper",["dojo/_base/declare","maq-metadata-dojo/dojox/grid/DataGridHelper","maq-metadata-dojo/dijit/layout/LayoutContainerHelper","maq-metadata-dojo/dijit/HTMLSubElementHelper"],function(_1,_2,_3,_4){
return _1([_3,_2],{constructor:function(){
this._useDataDojoProps=true;
},getData:function(_5,_6){
var _7=this.inherited(arguments);
if(_5.dijitWidget.cacheClass){
_7.properties.cacheClass=_5.dijitWidget.cacheClass;
}
return _7;
},getChildrenData:function(_8,_9){
if(!this._htmlSubElementHelper){
this._htmlSubElementHelper=new _4();
}
return this._htmlSubElementHelper.getChildrenData(_8,_9);
},cleanSrcElement:function(_a){
_a.removeAttribute("cacheClass");
this.inherited(arguments);
},resize:function(_b){
if(!_b||!_b.dijitWidget||!_b.dijitWidget.domNode||!_b.dijitWidget.domNode.defaultView){
return;
}
var _c=_b.dijitWidget;
_c.resize();
_c.setColumns(_c.structure);
}});
});
