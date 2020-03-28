//>>built
define("maq-metadata-dojo/dojox/mobile/ComboBoxHelper",["dojo/_base/declare","davinci/ve/widget","davinci/ve/commands/RemoveCommand","davinci/ve/commands/ReparentCommand","davinci/commands/CompoundCommand"],function(_1,_2,_3,_4,_5){
return _1(null,{create:function(_6,_7){
this.updateDataListWidget(_6);
_6.domNode.style.display="";
this.reparent(_6);
},updateDataListWidget:function(_8){
var _9;
var _a;
var _b=this._getProps(_8);
var _c=this.getStoreValues(_b);
if(_8._edit_context){
var _d=_8._edit_context.getDijit();
var _e=_d.byId(_c.storeId);
if(_e){
_8.dijitWidget.store=_e;
}
}
_8.domNode.value=_c.value;
},_getProps:function(_f){
var _10;
if(_f._params["data-dojo-props"]){
_10=_f._params["data-dojo-props"].split(",");
}else{
if(_f._params.properties["data-dojo-props"]){
_10=_f._params.properties["data-dojo-props"].split(",");
}else{
throw ("ComboBoxHelper: Error missing data-dojo-props");
}
}
return _10;
},getStoreValues:function(_11){
var _12={};
var re=new RegExp("\"","g");
for(var i=0;i<_11.length;i++){
var _13=_11[i].split(":"),_14=_13[0].trim();
if(_14==="list"){
_12.storeId=_13[1].replace(re,"");
_12.storeId=_12.storeId.trim();
}else{
if(_14==="value"){
_12.value=_13[1].replace(re,"");
_12.value=_12.value.trim();
}
}
}
return _12;
},getData:function(_15,_16){
var _17=_15._getData(_16);
if(_15.dijitWidget.params["data-dojo-props"]){
_17.properties["data-dojo-props"]=_15.dijitWidget.params["data-dojo-props"];
}else{
_17.properties["data-dojo-props"]="value: \""+_15.dijitWidget.params.value+"\", list: \""+_15.dijitWidget.params.list+"\"";
}
return _17;
},getRemoveCommand:function(_18){
var _19=new _5();
_19.add(new _3(_18));
var _1a=this._getProps(_18);
var _1b=this.getStoreValues(_1a);
var _1c=_2.byId(_1b.storeId);
_19.add(new _3(_1c));
return _19;
},reparent:function(_1d){
var _1e=this._getProps(_1d);
var _1f=this.getStoreValues(_1e);
if(_1f.storeId){
var _20=_2.byId(_1f.storeId);
if(_20){
var _21=_1d.getParent();
var _22=_21.indexOf(_1d);
var _23=new _4(_20,_21,_22);
_23.execute();
}
}
}});
});
