//>>built
define("maq-metadata-dojo/dojox/mobile/CarouselInput",["dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/query","dojo/dom-class","dojo/dom-construct","dojox/html/entities","../../dijit/layout/ContainerInput","davinci/ve/widget","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/ReparentCommand","dojo/i18n!../nls/dojox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
return _1(_8,{multiLine:"true",format:"rows",supportsHTML:"true",helpText:"",constructor:function(){
},parse:function(_e){
var _f=this.parseItems(_e);
return _f;
},update:function(_10,_11){
var _12=_11;
this.command=new _a();
var _13=_10.getChildren();
var _14=_10.dijitWidget.get("numVisible");
dojo.forEach(_13,dojo.hitch(this,function(_15){
this._removeChild(_15);
}));
var _16=[];
var _17;
for(var i=0;i<_11.length;i++){
if(i%_14==0){
_17={type:"dojox.mobile.SwapView",properties:{},children:[],context:this._getContext()};
_16.push(_17);
}
var _18=this.parse(_11[i].text);
_17.children.push({type:"dojox.mobile.CarouselItem",properties:{value:_18[0].text,headerText:_18[1].text,src:_18[2].text}});
}
dojo.forEach(_16,dojo.hitch(this,function(_19){
this._addChild(_10,_19);
}));
this._reparentWidget(_10);
this._addOrExecCommand();
return _10;
},_attr:function(_1a,_1b){
var _1c={};
var _1d=new ModifyCommand(_1a,_1c,_1b);
this._addOrExecCommand(_1d);
},_addChild:function(_1e,_1f,_20){
var _21;
_3.withDoc(this._getContext().getDocument(),function(){
_21=_9.createWidget(_1f);
},this);
var _22=new _b(_21,_1e,_20);
this._addOrExecCommand(_22);
},_reparentWidget:function(_23){
var _24=dojo.indexOf(_23.getParent(),_23);
var _25=new _c(_23,_23.getParent(),_24);
this._addOrExecCommand(_25);
},serialize:function(_26,_27,_28){
var _29=[];
var _2a=_26.getChildren();
for(var i=0;i<_2a.length;i++){
var _2b=_2a[i];
dojo.forEach(_2b.getChildren(),function(_2c){
var r="";
r+=_2c.dijitWidget.get("value")+", ";
var ht=_2c.dijitWidget.get("headerText");
if(ht){
r+=ht;
}
r+=", ";
var src=_2c.dijitWidget.get("src");
if(src){
r+=src;
}
_29.push(r);
});
}
_29=this.serializeItems(_29);
_27(_29);
}});
});
