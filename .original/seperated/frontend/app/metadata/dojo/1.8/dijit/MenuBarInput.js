//>>built
define("maq-metadata-dojo/dijit/MenuBarInput",["dojo/_base/declare","./layout/ContainerInput","davinci/ve/commands/ModifyCommand","dojo/i18n!./nls/dijit","dojox/html/entities"],function(_1,_2,_3,_4,_5){
return _1(_2,{propertyName:"label",format:"rows",multiLine:"true",supportsHTML:"true",helpText:"",end:true,constructor:function(){
this.helpText=_4.menuBarInputHelp;
},serialize:function(_6,_7,_8){
var _9=[];
var _a=_6.getData();
var _b=_a.children;
for(var i=0;i<_b.length;i++){
var _c=_b[i];
_9.push(_c.properties[this.propertyName]);
var _d=_c.children[0];
if(_d){
var _e=_d.children;
if(_e){
for(var j=0;j<_e.length;j++){
var _f=_e[j];
_9.push("> "+_f.properties[this.propertyName]);
}
}
}
}
_9=this.serializeItems(_9);
_7(_9);
},update:function(_10,_11){
var _12=_10.getData();
var _13=_12.children;
var _14,_15,_16=-1,_17=-1;
for(var i=0;i<_11.length;i++){
var _18=_11[i];
var _19=_18.indent;
var _1a=_18.text;
if(!_19){
if(_15&&(_17+1>0)){
var _1b=_15.length;
for(var j=_17+1;j<_1b;j++){
_15.pop();
}
}
_17=-1;
_16++;
if(_16<_13.length){
_14=_13[_16];
_14.properties.label=_1a;
}else{
_14=this.createPopupMenuBarItemData(_1a);
_13.push(_14);
}
_15=_14.children[0].children;
if(!_15){
_15=[];
_14.children[0].children=_15;
}
_17=-1;
while(i+1<_11.length&&_11[i+1].indent){
var _18=_11[++i];
var _19=_18.indent;
var _1a=_18.text;
_17++;
var _1c=_15[_17];
if(_1c){
_1c.properties.label=_1a;
}else{
_1c=this.createMenuItemData(_1a);
_15.push(_1c);
}
}
if(_15&&(_17+1<_15.length)){
var _1b=_15.length;
for(var x=_17+1;x<_1b;x++){
_15.pop();
}
}
}
}
if(_16+1>0){
var _1b=_13.length;
for(var i=_16+1;i<_1b;i++){
_13.pop();
}
}
var _1d=new _3(_10,this.getProperties(_10,_11),_13);
this._getContext().getCommandStack().execute(_1d);
return _1d.newWidget;
},createPopupMenuBarItemData:function(_1e){
return {type:"dijit.PopupMenuBarItem",properties:{label:_1e},children:[{type:"dijit.Menu",children:[]}]};
},createMenuItemData:function(_1f){
return {type:"dijit.MenuItem",properties:{label:_1f}};
},getProperties:function(_20,_21){
return null;
},parse:function(_22){
var _23=this.parseItems(_5.decode(_22));
if(this._format==="text"){
for(var i=0;i<_23.length;i++){
_23[i].text=_5.encode(_23[i].text);
}
}
return _23;
}});
});
