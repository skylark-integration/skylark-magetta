//>>built
define("maq-metadata-dojo/dojo/data/DataStoreBasedWidgetHelper",["dojo/_base/declare","davinci/ve/widget","davinci/commands/CompoundCommand","davinci/ve/commands/RemoveCommand","./DataStoreBasedWidgetInput"],function(_1,_2,_3,_4,_5){
return _1(null,{_useDataDojoProps:false,getData:function(_6,_7){
if(!_6){
return undefined;
}
var _8=_6._getData(_7);
if(_6.dijitWidget.store){
_8.properties.store=_6.dijitWidget.store;
_8.properties.query=_6.dijitWidget.query;
}
return _8;
},preProcessData:function(_9){
var _a=_9.properties.store;
var _b=_a.id?_a.id:_a._edit_object_id;
if(_b){
var _a=_9.context.getDojo().getObject(_b);
if(_a){
_9.properties.store=_a;
}
}
return _9;
},getRemoveCommand:function(_c){
var _d=new _3();
var _e=_5.getStoreId(_c);
var _f=_2.byId(_e);
_d.add(new _4(_c));
_d.add(new _4(_f));
return _d;
},cleanSrcElement:function(_10){
if(this._useDataDojoProps){
_10.removeAttribute("store");
_10.removeAttribute("structure");
}else{
var _11=_10.getAttribute("store");
if(_11&&_11.id){
_10.setAttribute("store",_11.id);
}
}
}});
});
