//>>built
define("maq-metadata-dojo/dijit/layout/StackContainerHelper",["dojo/_base/declare","./LayoutContainerHelper","davinci/ve/widget","davinci/ve/commands/RemoveCommand","davinci/ve/commands/ReparentCommand","davinci/commands/CompoundCommand"],function(_1,_2,_3,_4,_5,_6){
return _1(_2,{getRemoveCommand:function(_7){
var _8=new _6();
_8.add(new _4(_7));
var _9=_7.getId();
var _a=_7.getParent().getChildrenData();
dojo.forEach(_a,function(w){
if(w.type=="dijit.layout.StackController"&&w.properties.containerId==_9){
_8.add(new _4(_3.byId(w.properties.id)));
}
});
return _8;
},reparent:function(_b){
try{
var _c=_b.getId();
var _d=this._getAllStackControllersForWidget(_b);
dojo.forEach(_d,function(w){
this._reparentWidget(_b,w);
}.bind(this));
}
catch(e){
console.error("StackContainerHelper.Reparent error processing tree.");
}
},_reparentWidget:function(_e,_f){
var _10=_e.getParent();
var _11=_f.getParent();
var _12=(_10.indexOf(_e)<1)?0:_10.indexOf(_e)-1;
var i=_10.indexOf(_e);
var x=_11.indexOf(_f);
if((_10===_11)&&(i<x)){
_12=_10.indexOf(_e);
}else{
if(_10!=_11){
_12=i;
}
}
var _13=new _5(_f,_10,_12);
_13.execute();
},_getAllStackControllersForWidget:function(_14){
var _15=dojo.query(".dijitStackController",_14.getContext().getDocument());
var _16=[];
dojo.forEach(_15,function(_17){
if(_17._dvWidget&&_17._dvWidget.getData().properties.containerId==_14.getId()){
_16.push(_17._dvWidget);
}
});
return _16;
}});
});
