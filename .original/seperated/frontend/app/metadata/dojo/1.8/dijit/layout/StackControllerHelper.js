//>>built
define("maq-metadata-dojo/dijit/layout/StackControllerHelper",["dojo/_base/declare","./LayoutContainerHelper","davinci/ve/widget","davinci/ve/commands/RemoveCommand","davinci/commands/CompoundCommand"],function(_1,_2,_3,_4,_5){
return _1(_2,{getRemoveCommand:function(_6){
var _7=new _5();
var _8=_6.getId();
var _9=_3.byId(_6.getData().properties.containerId);
_7.add(new _4(_9));
_7.add(new _4(_6));
return _7;
}});
});
