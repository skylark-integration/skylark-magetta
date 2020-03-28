//>>built
define("maq-metadata-dojo/dijit/TooltipDialogHelper",["dojo/_base/connect"],function(_1){
var _2,_3=function(){
};
_3.prototype={destroy:function(_4){
if(_2){
_1.unsubscribe(_2);
_2=null;
}
_4.dijitWidget.destroyRecursive();
},onToggleVisibility:function(_5,on){
return false;
},onSelect:function(_6){
var _7=_6.dijitWidget.owner;
if(_7){
_7.openDropDown();
}
var id=_6.dijitWidget.id,_8=_6.getContext();
_2=_1.subscribe("/davinci/ui/widgetSelected",null,function(_9){
for(var w=_9[0];w&&w!=_6;w=w.getParent&&w.getParent()){
}
if(!w||w.getContext()!=_8){
return;
}
if(!w||w.id!=id){
var _a=_8.getDijit().registry.byId(id).owner;
if(_a){
_a.closeDropDown();
}
_1.disconnect(_2);
_2=null;
}
});
}};
return _3;
});
