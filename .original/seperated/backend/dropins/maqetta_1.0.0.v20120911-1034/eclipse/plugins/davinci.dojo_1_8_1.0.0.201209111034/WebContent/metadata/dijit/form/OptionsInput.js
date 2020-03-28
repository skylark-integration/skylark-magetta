//>>built
define("maq-metadata-dojo/dijit/form/OptionsInput",["dojo/_base/declare","davinci/ve/input/SmartInput","davinci/ve/commands/ModifyCommand","davinci/ve/commands/RemoveCommand","davinci/ve/widget"],function(_1,_2,_3,_4,_5){
return _1(_2,{property:"value",displayOnCreate:"true",multiLine:"true",format:"rows",serialize:function(_6,_7,_8){
var _9=_6.getData();
var _a=_9.children;
var _b=[];
for(var i=0;i<_a.length;i++){
var _c=_a[i];
var _d=_c.properties.value;
_d=dojox.html.entities.decode(_d);
var _e=(_c.properties.selected||_9.properties.value==_d)?"+":"";
_b.push(_e+_d);
}
_b=this.serializeItems(_b);
_7(_b);
},parse:function(_f){
var _10=this.parseItems(_f);
for(var x=0;x<_10.length;x++){
_10[x].text=dojox.html.entities.encode(_10[x].text);
}
return _10;
},getProperties:function(_11,_12){
return null;
},update:function(_13,_14){
var _15=_13.getData();
var _16=_15.children;
for(var i=0;i<_14.length;i++){
var _17=_14[i];
var _18=_17.text;
if(i<_16.length){
var _19=_16[i];
_19.children=_18;
_19.properties.value=_18;
_19.properties.selected=_17.selected;
}else{
_16.push(this.createChildData(_18,_18,_17.selected));
}
if(!this.isHtmlSupported()){
_14[i].text=dojox.html.entities.decode(_18);
}
}
if(_14.length>0){
var _1a=_16.length;
for(var i=_14.length;i<_1a;i++){
var _19=_16[i];
_16.pop();
}
}
var _1b=new _3(_13,this.getProperties(_13,_14),_16);
this._getContext().getCommandStack().execute(_1b);
return _1b.newWidget;
},getChildren:function(_1c){
var _1d=dojo.query("option",this.node(_1c));
var _1e=[];
for(var i=0;i<_1d.length;i++){
var _1f=_1d[i];
var _20=_1f.innerHTML;
var _21=dojo.attr(_1f,"value");
var _22=this.createChildData(_21,_20);
_1e.push(_22);
}
return _1e;
},createChildData:function(_23,_24,_25){
return {type:"html.option",properties:{value:_23,selected:_25},children:_24||_23};
},addChild:function(_26,_27){
var _28=dojo.doc.createElement("option");
_28.innerHTML=_27;
dojo.attr(_28,"value",_27);
this.node(_26).appendChild(_28);
},updateChild:function(_29,_2a){
_29.innerHTML=_2a;
dojo.attr(_29,"value",_2a);
},removeChild:function(_2b,_2c){
this.node(_2b).removeChild(_2c);
},node:function(_2d){
return _2d.containerNode||_2d.domNode;
},_attr:function(_2e,_2f,_30){
var _31={};
_31[_2f]=_30;
var _32=new _3(_2e,_31);
this._addOrExecCommand(_32);
},_removeChild:function(_33){
var _34=new _4(_33);
this._addOrExecCommand(_34);
},_addOrExecCommand:function(_35){
if(this.command&&_35){
this.command.add(_35);
}else{
this._getContext().getCommandStack().execute(this.command||_35);
}
},_getContainer:function(_36){
while(_36){
if((_36.isContainer||_36.isLayoutContainer)&&_36.declaredClass!="dojox.layout.ScrollPane"){
return _36;
}
_36=_5.getParent(_36);
}
return undefined;
},_getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},_getContext:function(){
var _37=this._getEditor();
return _37&&(_37.getContext&&_37.getContext()||_37.context);
}});
});
