//>>built
define("maq-metadata-dojo/dojox/grid/DataGridHelper",["dojo/_base/declare","dojo/_base/array","dojo/dom-form","davinci/ve/widget","davinci/ve/commands/ReparentCommand","davinci/commands/CompoundCommand","davinci/ve/commands/RemoveCommand","davinci/html/HTMLElement","davinci/html/HTMLText","../../dojo/data/DataStoreBasedWidgetInput","../../dojo/data/DataStoreBasedWidgetHelper","dojo/i18n!../nls/dojox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){
return _1([_b],{getData:function(_d,_e){
if(!_d){
return undefined;
}
var _f=_d._getData(_e);
if(_f&&_e&&_e.serialize&&_d.structure){
var _10="this.setStructure("+this._serializeStructure(_d.structure)+");";
if(_f.scripts){
if(!_2.some(_f.scripts,function(s){
if(s.type=="dojo/method"&&!s.name&&s.value&&s.value.substring(0,18)=="this.setStructure("){
s.value=_10;
return true;
}
return false;
})){
_f.scripts.push({type:"dojo/method",value:_10});
}
}else{
_f.scripts=[{type:"dojo/method",value:_10}];
}
}
if(_d.dijitWidget.store){
var _11=_f.properties.store=_d.dijitWidget.store;
if(this._useDataDojoProps){
var _12=_d.properties?_d.properties["data-dojo-props"]:_d._srcElement.getAttribute("data-dojo-props");
_f.properties["data-dojo-props"]=_a.setPropInDataDojoProps(_12,"store",_11.id?_11.id:_11._edit_object_id);
}
}
return _f;
},_serializeStructure:function(_13){
if(!_13){
return undefined;
}
var _14;
try{
_14=_13.cells;
}
catch(e){
}
if(!_14){
return undefined;
}
var s="";
_2.forEach(_14,function(c){
var cs="";
var _15=c.field;
if(_15||_15===0){
cs+="field: "+((typeof _15==="string")?"\""+_15+"\"":_15);
}
var _16=c.name;
if(_16){
if(cs){
cs+=", ";
}
cs+="name: \""+_16+"\"";
}
var _17=c.width;
if(_17){
if(cs){
cs+=", ";
}
cs+="width: "+((typeof _17==="string")?"\""+_17+"\"":_17);
}
var _18=c.editor;
if(_18){
if(cs){
cs+=", ";
}
if(_18==dojox.grid.editors.Input){
cs+="editor: dojox.grid.editors.Input";
}else{
if(_18==dojox.grid.editors.Bool){
cs+="editor: dojox.grid.editors.Bool";
}else{
if(_18==dojox.grid.editors.Select){
cs+="editor: dojox.grid.editors.Select";
var _19=c.options;
if(_19){
cs+=", options: "+_3.toJson(_19);
}
}
}
}
}
if(s){
s+=", ";
}
s+="{"+cs+"}";
});
return "{cells: ["+s+"]}";
},create:function(_1a,_1b){
var _1c=_a.getStoreId(_1a);
if(_1c){
dojo.withDoc(_1a.getContext().getDocument(),function(){
var _1d=_1c.declaredClass?_4.byId(_1c.id):_4.byId(_1c);
if(_1d&&_1a.dijitWidget&&_1a.dijitWidget.store){
this._reparentTheStore(_1a,_1d);
this.updateStore(_1a,_1d);
}
}.bind(this));
}
},reparent:function(_1e){
var _1f=_a.getStoreId(_1e);
if(_1f){
dojo.withDoc(_1e.getContext().getDocument(),function(){
var _20=_4.byId(_1f);
if(_20&&_1e.dijitWidget&&_1e.dijitWidget.store){
this._reparentTheStore(_1e,_20);
}
}.bind(this));
}
},_reparentTheStore:function(_21,_22){
var _23=_21.getParent();
var _24=_22.getParent();
var _25=(_23.indexOf(_21)<1)?0:_23.indexOf(_21)-1;
var i=_23.indexOf(_21);
var x=_24.indexOf(_22);
if((_23===_24)&&(i<x)){
_25=_23.indexOf(_21);
}else{
if(_23!=_24){
_25=i;
}
}
var _26=new _5(_22,_23,_25);
_26.execute();
},updateStore:function(_27,_28,w){
var _29=_27.dijitWidget.store;
var _2a=_28._srcElement.getAttribute("data");
var url=_28._srcElement.getAttribute("url");
if(_2a){
var _2b=_2a;
var _2c=eval("storeData = "+_2b);
_2a={identifier:_2c.identifier,items:[]};
var _2d=_2a.items;
var _2e=_2c.items;
for(var r=0;r<_2e.length;r++){
var _2f={};
var _30=_2e[r];
for(var _31 in _30){
_2f[_31]=_30[_31];
}
_2d.push(_2f);
}
setTimeout(dojo.hitch(this,function(){
_29.clearOnClose=true;
_29.data=_2a;
delete _29.url;
_29.close();
_27.dijitWidget.setStore(_29);
}),0);
}else{
_29.clearOnClose=true;
_29.url=url;
delete _29.data;
_29.close();
}
},preProcess:function(_32,_33){
var s=_32.getAttribute("structure");
if(s){
var _34=false;
var num=0;
do{
try{
_33.getDojo().fromJson(s);
_34=false;
}
catch(e){
var _35=e.toString().split(" ");
if(_35.length>4&&_35[0]==="ReferenceError:"&&_35[3]==="not"&&_35[4]==="defined"){
_33.getGlobal()[_35[1]]=function(_36,row){
return dojo.string.substitute(_c.properyNotSupported,["formatter"]);
};
_34=true;
num++;
}else{
_34=false;
}
}
}while(_34&&num<1000);
}
}});
});
