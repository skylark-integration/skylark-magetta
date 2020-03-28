//>>built
define("maq-metadata-dojo/dijit/DialogHelper",["dojo/_base/connect"],function(_1){
var _2=function(){
};
_2.prototype={create:function(_3){
var id=_3.dijitWidget.id,_4=_3.getContext();
_3._helperHandle=_1.subscribe("/davinci/ui/widgetSelected",null,function(_5){
var w=_5[0];
if(!w||w.getContext()!=_4){
return;
}
while(w&&w.id!=id){
if(w._ownerId){
w=_4.getDijit().registry.byId(w._ownerId);
}else{
w=w.getParent&&w.getParent();
}
}
var _6=_4.getDijit().registry.byId(id);
if(w){
_6.show();
}else{
_6.hide();
}
});
},destroy:function(_7){
_1.unsubscribe(_7._helperHandle);
delete _7._helperHandle;
_7.dijitWidget.destroyRecursive();
},onToggleVisibility:function(_8,on){
return false;
}};
return _2;
});
