//>>built
define("maq-metadata-dojo/dojox/mobile/EdgeToEdgeDataListInput",["dojo/_base/declare","dojo/string","dijit/registry","davinci/ve/commands/ModifyCommand","davinci/commands/OrderedCompoundCommand","davinci/ve/commands/ModifyAttributeCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/RemoveCommand","davinci/ve/widget","dojo/data/ItemFileReadStore","../../dojo/data/DataStoreBasedWidgetInput","dojo/i18n!../nls/dojox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){
return _1(_b,{displayOnCreate:"true",delimiter:", ",multiLine:"true",supportsHTML:"false",helpText:"",constructor:function(){
var _d="<i>"+_c.edgeToEdgeFormat+"</i>";
this.helpText=_2.substitute(_c.edgeToEdgeDataListHelp,[_d]);
},buildData:function(){
var _e=dijit.byId("davinciIleb"),_f=_e.attr("value"),_10=_f,_11=_f.split("\n"),_12={identifier:"label",items:[]},_13=_12.items;
for(var r=0;r<_11.length;r++){
var _14=_11[r].split(",");
var _15={};
_15.label=_14[0];
if(_14[1]){
_15.moveTo=_14[1].trim();
}else{
_15.moveTo="dummy";
}
_13.push(_15);
}
return _12;
}});
});
