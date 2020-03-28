//>>built
define("maq-metadata-dojo/dojox/grid/DataGridInput",["dojo/_base/declare","davinci/ve/input/SmartInput","davinci/ve/commands/ModifyCommand","davinci/commands/OrderedCompoundCommand","davinci/ve/commands/ModifyAttributeCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/RemoveCommand","davinci/ve/widget","davinci/model/Path","dijit/Dialog","dijit/layout/ContentPane","dijit/form/Button","dijit/Tree","dojo/data/ItemFileReadStore","../../dojo/data/DataStoreBasedWidgetInput","dojo/i18n!dijit/nls/common","dojo/i18n!../nls/dojox","dojox/form/DropDownSelect",],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11){
return _1(_f,{propertyName:"structure",property:"structure",displayOnCreate:"true",delimiter:", ",multiLine:"true",supportsHTML:"true",helpText:"",constructor:function(){
this.helpText=_11.dataGridInputHelp;
},refreshStoreView:function(){
var _12=this._widget.dijitWidget.store;
onComplete=function(_13){
var _14=dijit.byId("davinciIleb");
var _15="";
var _16=this._widget.attr("structure");
var _17=null;
if(_13.length>0){
_17=_12.getAttributes(_13[0]);
if(_17[0]==="unique_id"){
_17.splice(0,1);
}
_15="";
for(var x=0;x<_17.length;x++){
var _18=_17[x].trim();
dojo.some(_16,function(_19){
if(_18===_19.field){
_18=_19.name.trim();
return true;
}
});
var pre=(x>0)?",":"";
_15+=pre+_18;
}
}
_15+="\n";
for(var i=0;i<_13.length;i++){
var _1a=_13[i];
for(var s=0;s<_17.length;s++){
var pre=(s>0)?",":"";
var _1b=_1a[_17[s]];
_15+=pre+(_1b?_1b[0]:"");
}
_15+="\n";
}
this._data=_15;
_14.attr("value",String(_15));
}.bind(this);
this._widget.dijitWidget.store.fetch({onComplete:function(_1c){
onComplete(_1c);
}.bind(this)});
},_getPropsForDummyDataUpdateWidgetCommand:function(_1d){
structure=this._structure;
var _1e={};
if(structure){
if(this._useDataDojoProps){
var _1f=_1d.getData();
var _20=_1f.properties["data-dojo-props"];
_1e["data-dojo-props"]=_f.setPropInDataDojoProps(_20,"structure",structure);
}
_1e.structure=structure;
}
if(this.supportsEscapeHTMLInData){
var _21=(this.getFormat()==="text");
_1e.escapeHTMLInData=_21;
}
return _1e;
},buildData:function(){
var _22=[],_23=dijit.byId("davinciIleb"),_24=_23.attr("value"),_25=_24.split("\n"),_26=_25[0].split(",");
var _27=this._widget.attr("structure");
for(var c=0;c<_26.length;c++){
var _28={cellType:dojox.grid.cells.Cell,width:"auto",name:_26[c].trim(),field:_26[c].trim().replace(/\s+/g,"_").toLowerCase()};
dojo.some(_27,function(_29){
if(_28.field===_29.field){
_28.width=_29.width;
_28.name=_29.name;
return true;
}
});
_22[c]=_28;
}
this._structure=_22;
var _2a={identifier:"unique_id",items:[]},_25=_24.split("\n"),_2b=_2a.items;
for(var r=1;r<_25.length;r++){
var _26=_25[r].split(",");
var _2c={unique_id:r};
for(var s=0;s<_22.length;s++){
var _2d=_22[s].field;
if(_26[s]!=null){
_2c[_2d]=_26[s];
}
}
_2b.push(_2c);
}
return _2a;
},_getModifyCommandForUrlDataStore:function(_2e,_2f,_30,_31){
var _32=[];
var _33=this._widget.attr("structure");
var _34=this._urlDataStore.getAttributes(_30[0]);
for(var i=0;i<_34.length;i++){
var _35=_34[i];
var _36={cellType:dojox.grid.cells.Cell,width:"auto",name:_35,field:_35};
dojo.some(_33,function(_37){
if(_36.field===_37.field){
_36.width=_37.width;
_36.name=_37.name;
return true;
}
});
_32.push(_36);
}
var _38={};
if(_32){
if(this._useDataDojoProps){
var _39=_2e.getData();
var _3a=_39.properties["data-dojo-props"];
_38["data-dojo-props"]=_f.setPropInDataDojoProps(_3a,"structure",_32);
}
_38.structure=_32;
}
if(this.supportsEscapeHTMLInData){
var _3b=(this._format==="text");
_38.escapeHTMLInData=_3b;
}
_38=this._getPropsForNewStore(_2e,_31,_38);
var _3c=new _3(_2e,_38,null,_2f);
return _3c;
}});
});
