//>>built
define("maq-metadata-html/html/SelectInput",["dojo/_base/declare","davinci/ve/input/SmartInput","davinci/ve/commands/ModifyCommand","dojo/i18n!./nls/html"],function(_1,_2,_3,_4){
return _1(_2,{property:"value",displayOnCreate:"true",multiLine:"true",format:"rows",supportsHTML:"false",helpText:"",constructor:function(){
this.helpText=_4.selectInputHelp;
},serialize:function(_5,_6,_7){
var _8=_5.getData();
var _9=_8.children;
var _a=[];
for(var i=0;i<_9.length;i++){
var _b=_9[i];
if(_b.type==="html.optgroup"){
var _c=_b.properties.label;
_c=dojox.html.entities.decode(_c);
_a.push(_c);
var _d=_b.children;
for(var j=0;j<_d.length;j++){
var _e=_d[j];
var _c=_e.properties.value;
_c=dojox.html.entities.decode(_c);
var _f=_e.properties.selected?"+":"";
_a.push(">"+_f+_c);
}
}else{
if(_b.type==="html.option"){
var _c=_b.properties.value;
_c=dojox.html.entities.decode(_c);
var _f=_b.properties.selected?"+":"";
_a.push(_f+_c);
}
}
}
_a=this.serializeItems(_a);
_6(_a);
},parse:function(_10){
var _11=this.parseItems(dojox.html.entities.decode(_10));
for(var x=0;x<_11.length;x++){
_11[x].text=dojox.html.entities.encode(_11[x].text);
}
return _11;
},update:function(_12,_13){
var _14=[];
var _15=null;
for(var i=0;i<_13.length;i++){
var _16=_13[i];
var _17=_16.text;
var _18;
var _19;
if(_15){
if(_16.indent){
_18=this._createOption(_17,_17,_16.selected);
_19=_15.children;
}else{
if(this._doesNextValueHaveIndent(_13,i)){
_18=this._createOptGroup(_17);
_19=_14;
_15=_18;
}else{
_18=this._createOption(_17,_17,_16.selected);
_19=_14;
_15=null;
}
}
}else{
if(this._doesNextValueHaveIndent(_13,i)){
_18=this._createOptGroup(_17);
_19=_14;
_15=_18;
}else{
_18=this._createOption(_17,_17,_16.selected);
_19=_14;
_15=null;
}
}
_19.push(_18);
}
var _1a=new _3(_12,null,_14);
this._getContext().getCommandStack().execute(_1a);
return _1a.newWidget;
},_createOptGroup:function(_1b){
return {type:"html.optgroup",properties:{label:_1b},children:[]};
},_createOption:function(_1c,_1d,_1e){
return {type:"html.option",properties:{value:_1c,selected:_1e},children:_1d||_1c};
},_doesNextValueHaveIndent:function(_1f,i){
var _20=false;
if(i<_1f.length-1){
var _21=_1f[i+1];
_20=(_21.indent>0)?true:false;
}
return _20;
},_getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},_getContext:function(){
var _22=this._getEditor();
return _22&&(_22.getContext&&_22.getContext()||_22.context);
}});
});
