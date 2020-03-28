//>>built
define("maq-metadata-dojo/dojox/mobile/EdgeToEdgeDataListHelper",["dojo/_base/declare","dojo/query","davinci/ve/widget","davinci/commands/CompoundCommand","davinci/ve/commands/RemoveCommand","../../dojo/data/DataStoreBasedWidgetHelper","./InitialSizeHelper"],function(_1,_2,_3,_4,_5,_6,_7){
return _1([_7,_6],{create:function(_8,_9){
this.stopOnClickListItems(_8);
},stopOnClickListItems:function(_a){
var _b=_a.dijitWidget;
if(_b&&_b.containerNode){
_2(".mblListItemAnchor",_b.containerNode).forEach(function(_c,_d,_e){
_c.addEventListener("click",function(e){
e.stopPropagation();
},true);
});
}
}});
});
