//>>built
define("maq-metadata-dojo/dijit/layout/ContainerInput",["dojo/_base/declare","dojox/html/entities","davinci/ve/input/SmartInput","davinci/ve/metadata","davinci/ve/widget","davinci/commands/CompoundCommand","davinci/ve/commands/ModifyCommand","davinci/ve/commands/RemoveCommand","davinci/ve/commands/AddCommand"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
return _1(_3,{propertyName:null,childType:null,property:null,displayOnCreate:"true",format:"columns",serialize:function(_a,_b,_c){
var _d=[];
var _e=_a.getChildren();
for(var i=0;i<_e.length;i++){
var _f=_e[i];
var _10=_f.dijitWidget;
if(_10){
var _11=(this.propertyName==="textContent")?"innerHTML":this.propertyName;
_d.push(_f.attr(_11));
}else{
_d.push("");
}
}
_d=this.serializeItems(_d);
_b(_d);
},parse:function(_12){
var _13=this.parseItems(_12);
return _13;
},getChildType:function(_14){
if(!this.childType){
var _15=_4.getAllowedChild(_14);
this.childType=_15[0];
}
return this.childType;
},update:function(_16,_17){
var _18=_17;
this.command=new _6();
var _19=_16.getChildren();
for(var i=0;i<_18.length;i++){
var _1a=_18[i].text;
if(this.isHtmlSupported()&&(this.getFormat()==="html")){
_1a=_2.encode(_1a);
}
if(i<_19.length){
var _1b=_19[i];
this._attr(_1b,this.propertyName,_1a);
}else{
this._addChildOfTypeWithProperty(_16,this.getChildType(_16.type),this.propertyName,_1a);
}
}
if(_18.length>0){
for(var i=_18.length;i<_19.length;i++){
var _1b=_19[i];
this._removeChild(_1b);
}
}
this._addOrExecCommand();
},_attr:function(_1c,_1d,_1e){
var _1f={};
_1f[_1d]=_1e;
var _20=new _7(_1c,_1f);
this._addOrExecCommand(_20);
},_removeChild:function(_21){
var _22=new _8(_21);
this._addOrExecCommand(_22);
},_addChildOfTypeWithProperty:function(_23,_24,_25,_26){
var _27={type:_24,properties:{},context:this._getContext()};
_27.properties[_25]=_26;
var _28;
dojo.withDoc(this._getContext().getDocument(),function(){
_28=_5.createWidget(_27);
},this);
var _29=new _9(_28,_23);
this._addOrExecCommand(_29);
},_addOrExecCommand:function(_2a){
if(this.command&&_2a){
this.command.add(_2a);
}else{
this._getContext().getCommandStack().execute(this.command||_2a);
}
},_getContainer:function(_2b){
while(_2b){
if((_2b.isContainer||_2b.isLayoutContainer)&&_2b.declaredClass!="dojox.layout.ScrollPane"){
return _2b;
}
_2b=_5.getParent(_2b);
}
return undefined;
},_getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},_getContext:function(){
var _2c=this._getEditor();
return _2c&&(_2c.getContext&&_2c.getContext()||_2c.context);
}});
});
