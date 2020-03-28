//>>built
define("maq-metadata-html/html/MediaInput",["dojo/_base/declare","davinci/ve/widget","davinci/ve/input/SmartInput","davinci/ve/commands/ModifyCommand","dojo/i18n!./nls/html","davinci/css!../resources/html.css",],function(_1,_2,_3,_4,_5){
return _1(_3,{property:"value",displayOnCreate:"true",multiLine:"true",format:"rows",supportsHTML:"false",helpText:"",constructor:function(){
},show:function(_6){
this._widget=_2.byId(_6);
if(this._widget.type=="html.embed"){
this.multiLine="false";
this.helpText=_5.embedInputHelp;
}else{
this.multiLine="true";
if(this._widget.type=="html.audio"){
this.helpText=_5.audioInputHelp;
}else{
this.helpText=_5.videoInputHelp;
}
}
this.inherited(arguments);
if(this._widget.type=="html.embed"){
dojo.addClass("ieb","davinciMediaInput");
}else{
dojo.addClass("ieb","davinciMediaInputMulti");
}
this.resize();
},serialize:function(_7,_8,_9){
var _a=_7.getData();
var _b=_a.children;
var _c=[];
if(_7.type==="html.embed"){
if(_a.properties.src){
var _d=_a.properties.src;
_d=dojox.html.entities.decode(_d);
_c.push(_d);
}
}else{
dojo.forEach(_b,function(_e){
if(_e.type==="html.source"){
var _f=_e.properties.src;
_f=dojox.html.entities.decode(_f);
_c.push(_f);
}
});
}
_c=this.serializeItems(_c);
_8(_c);
},parse:function(_10){
var _11=this.parseItems(dojox.html.entities.decode(_10));
for(var x=0;x<_11.length;x++){
_11[x].text=dojox.html.entities.encode(_11[x].text);
}
return _11;
},update:function(_12,_13){
var _14=_12.getData();
var _15=_14.children;
var _16=[];
var _17={};
if(_12.type==="html.embed"){
if(_13.length>0){
var src=_13[0].text;
_17.src=src;
}
}else{
dojo.forEach(_13,function(_18){
var src=_18.text;
var _19=null;
dojo.some(_15,function(_1a){
if(src==_1a.properties.src){
_19=_1a;
return true;
}
});
var _1b=this._createSource(src);
if(_19){
dojo.mixin(_1b,_19);
}
_16.push(_1b);
}.bind(this));
}
var _1c=new _4(_12,_17,_16);
this._getContext().getCommandStack().execute(_1c);
return _1c.newWidget;
},_createSource:function(src){
return {type:"html.source",properties:{src:src}};
},_getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},_getContext:function(){
var _1d=this._getEditor();
return _1d&&(_1d.getContext&&_1d.getContext()||_1d.context);
}});
});
