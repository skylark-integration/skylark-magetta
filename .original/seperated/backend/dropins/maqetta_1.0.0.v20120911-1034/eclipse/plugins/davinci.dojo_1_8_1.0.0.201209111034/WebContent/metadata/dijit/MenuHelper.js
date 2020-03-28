//>>built
define("maq-metadata-dojo/dijit/MenuHelper",["dojo/_base/connect","dojo/_base/array","dojo/dom-class"],function(_1,_2,_3){
var _4=function(){
};
_4.prototype={create:function(_5){
var id=_5.dijitWidget.id,_6=_5.getContext();
if(_5.properties&&_5.properties.contextMenuForWindow){
_3.add(_5.domNode,"dvHidden");
}
_5._helperHandle=_1.subscribe("/davinci/ui/widgetSelected",null,function(_7){
var _8=_6.getDijit().registry.byId(id);
if(!_8||!_8.properties||!_8.properties.contextMenuForWindow){
return;
}
var w=_7[0];
while(w&&w.id!=id){
if(w._ownerId){
w=_6.getDijit().registry.byId(w._ownerId);
}else{
w=w.getParent&&w.getParent();
}
}
if(w){
_3.remove(_8.domNode,"maqHidden");
_3.add(_8.domNode,"maqShown");
}else{
_3.add(_8.domNode,"maqHidden");
_3.remove(_8.domNode,"maqShown");
}
});
},destroy:function(_9){
_1.unsubscribe(_9._helperHandle);
delete _9._helperHandle;
_9.dijitWidget.destroyRecursive();
},getData:function(_a,_b){
if(!_a){
return;
}
var _c=_a._getData(_b);
return _c;
},getWidgetTextExtra:function(_d){
return _d.properties&&_d.properties.contextMenuForWindow?"(context)":"";
}};
return _4;
});
