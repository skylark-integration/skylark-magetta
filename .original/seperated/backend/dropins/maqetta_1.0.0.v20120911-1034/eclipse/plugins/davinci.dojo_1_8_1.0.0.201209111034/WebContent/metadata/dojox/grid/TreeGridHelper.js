//>>built
define("maq-metadata-dojo/dojox/grid/TreeGridHelper",["davinci/ve/widget"],function(_1){
var _2=function(){
};
_2.prototype={getData:function(_3,_4){
if(!_3){
return undefined;
}
var _5=_3._getData(_4);
if(_5&&_4&&_4.serialize&&_3.structure){
var _6="this.setStructure("+this._serializeStructure(_3.structure)+");";
if(_5.scripts){
if(!dojo.some(_5.scripts,function(s){
if(s.type=="dojo/method"&&!s.name&&s.value&&s.value.substring(0,18)=="this.setStructure("){
s.value=_6;
return true;
}
return false;
})){
_5.scripts.push({type:"dojo/method",value:_6});
}
}else{
_5.scripts=[{type:"dojo/method",value:_6}];
}
}
if(_3.dijitWidget.store){
_5.properties.store=_3.dijitWidget.store;
}
return _5;
},_serializeStructure:function(_7){
if(!_7){
return undefined;
}
var _8;
try{
_8=_7.cells;
}
catch(e){
}
if(!_8){
return undefined;
}
var s="";
dojo.forEach(_8,function(c){
var cs="";
var _9=c.field;
if(_9||_9===0){
cs+="field: "+(dojo.isString(_9)?"\""+_9+"\"":_9);
}
var _a=c.name;
if(_a){
if(cs){
cs+=", ";
}
cs+="name: \""+_a+"\"";
}
var _b=c.width;
if(_b){
if(cs){
cs+=", ";
}
cs+="width: "+(dojo.isString(_b)?"\""+_b+"\"":_b);
}
var _c=c.editor;
if(_c){
if(cs){
cs+=", ";
}
if(_c==dojox.grid.editors.Input){
cs+="editor: dojox.grid.editors.Input";
}else{
if(_c==dojox.grid.editors.Bool){
cs+="editor: dojox.grid.editors.Bool";
}else{
if(_c==dojox.grid.editors.Select){
cs+="editor: dojox.grid.editors.Select";
var _d=c.options;
if(_d){
cs+=", options: "+dojo.toJson(_d);
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
},updateStore:function(_e,_f,w){
var _10=_e.dijitWidget.store;
var _11=_f._srcElement.getAttribute("data");
var url=_f._srcElement.getAttribute("url");
if(_11){
var _12=_11;
var _13=eval("storeData = "+_12);
_11={identifier:_13.identifier,items:[]};
var _14=_11.items;
var _15=_13.items;
for(var r=0;r<_15.length;r++){
var _16={};
var _17=_15[r];
for(var _18 in _17){
_16[_18]=_17[_18];
}
_14.push(_16);
}
_10.clearOnClose=true;
_10.data=_11;
delete _10.url;
_10.close();
_e.dijitWidget.setStore(_10);
}else{
_10.clearOnClose=true;
_10.url=url;
delete _10.data;
_10.close();
}
}};
return _2;
});
