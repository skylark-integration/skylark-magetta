//>>built
define("maq-metadata-dojo/dojox/mobile/EdgeToEdgeListInput",["dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/query","dojo/dom-class","dojo/dom-construct","dojox/html/entities","../../dijit/layout/ContainerInput","davinci/ve/widget","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/ModifyCommand","dojo/i18n!../nls/dojox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
return _1(_8,{multiLine:"true",format:"rows",supportsHTML:"true",helpText:"",constructor:function(){
this.helpText=_d.edgeToEdgeListHelp;
},parse:function(_e){
var _f=this.parseItems(_e);
return _f;
},update:function(_10,_11){
var _12=_11;
this.command=new _a();
var _13=_10.getChildren();
for(var i=0;i<_12.length;i++){
var _14=_12[i].text;
if(this._format==="html"){
_14=_7.decode(_14);
}
if(i<_13.length){
var _15=_13[i];
this._attr(_15,_14);
}else{
this._addChildOfTypeWithProperty(_10,this.getChildType(_10.type),_14);
}
}
if(_12.length>0){
for(var i=_12.length;i<_13.length;i++){
var _15=_13[i];
this._removeChild(_15);
}
}
this._addOrExecCommand();
return _10;
},_attr:function(_16,_17){
var _18={};
var _19=new _c(_16,_18,_17);
this._addOrExecCommand(_19);
},_addChildOfTypeWithProperty:function(_1a,_1b,_1c){
var _1d={type:_1b,properties:{},context:this._getContext()};
var _1e;
_3.withDoc(this._getContext().getDocument(),function(){
_1e=_9.createWidget(_1d);
},this);
var _1f=new _b(_1e,_1a);
this._addOrExecCommand(_1f);
_1f=new _c(_1e,_1d.properties,_1c);
this._addOrExecCommand(_1f);
},_addOrExecCommand:function(_20){
if(this.command&&_20){
this.command.add(_20);
}else{
this._getContext().getCommandStack().execute(this.command||_20);
}
},_collapse:function(_21){
for(var i=0;i<_21.childNodes.length;i++){
var cn=_21.childNodes[i];
if(cn.nodeType==3){
cn.nodeValue=cn.data.replace(/^\s*$/,"");
cn.nodeValue=cn.nodeValue.replace(/^\s*([^\s])\s*$/,"$1");
cn.nodeValue=cn.nodeValue.replace(/^\s*([^\s].*[^\s])\s*$/,"$1");
cn.nodeValue=cn.nodeValue.replace(/\n/g," ");
}else{
if(cn.nodeType==1){
this._collapse(cn);
}
}
}
return _21.innerHTML;
},serialize:function(_22,_23,_24){
var _25=[];
var _26=_22.getChildren();
for(var i=0;i<_26.length;i++){
var _27=_26[i];
var _28=_27.dijitWidget;
var _29=_28.labelNode;
var _2a=_29?_2.trim(_29.innerHTML):"";
var _2b=_28.domNode;
var _2a="";
for(var j=0;j<_2b.childNodes.length;j++){
var n=_2b.childNodes[j];
if(n.nodeType===1){
if(_5.contains(n,"mblListItemLabel")){
_2a+=_2.trim(n.innerHTML);
}
}else{
if(n.nodeType===3){
_2a+=n.nodeValue;
}
}
}
var div=_6.create("DIV",{innerHTML:_2a});
var _2c=this._collapse(div);
_25.push(_2c);
}
_25=this.serializeItems(_25);
_23(_25);
}});
});
