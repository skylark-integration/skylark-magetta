//>>built
define("maq-metadata-dojo/dojox/mobile/DataCarouselInput",["dojo/_base/declare","dojo/string","dijit/registry","davinci/ve/commands/ModifyCommand","davinci/commands/OrderedCompoundCommand","davinci/ve/commands/ModifyAttributeCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/RemoveCommand","davinci/ve/widget","dojo/data/ItemFileReadStore","../../dojo/data/DataStoreBasedWidgetInput","dojo/i18n!../nls/dojox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){
return _1(_b,{displayOnCreate:"true",delimiter:", ",multiLine:"true",supportsHTML:"false",helpText:"",refreshStoreView:function(){
var _d=_3.byId("davinciIleb"),_e="";
this._widget.dijitWidget.store.fetch({query:this.query,queryOptions:{deep:true},onComplete:function(_f){
_f.forEach(function(_10){
_e+=_10.value+", ";
_e+=_10.headerText+", ";
_e+=_10.src;
_e+="\n";
});
this._data=_e;
_d.attr("value",_e);
}.bind(this)});
},buildData:function(){
var _11=dijit.byId("davinciIleb"),_12=_11.attr("value"),_13=_12,_14=_12.split("\n"),_15={identifier:"value",items:[]},_16=_15.items;
for(var r=0;r<_14.length;r++){
var _17=_14[r].split(",");
var _18={};
_18.value=_17[0];
if(_17[1]){
_18.headerText=_17[1];
}
if(_17[2]){
_18.src=_17[2];
}
_16.push(_18);
}
return _15;
}});
});
