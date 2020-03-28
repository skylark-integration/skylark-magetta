//>>built
define("maq-metadata-dojo/dojox/grid/TreeGridInput",["dojo/_base/declare","davinci/ve/input/SmartInput","davinci/ve/widget","davinci/ve/commands/ModifyCommand","dojo/i18n!../nls/dojox"],function(_1,_2,_3,_4,_5){
return _1(_2,{property:null,displayOnCreate:"true",multiLine:"true",supportsHTML:"false",helpText:"",_structure:[],constructor:function(){
this.helpText=_5.treeInputHelp;
},serialize:function(_6,_7,_8){
var _9=_6.dijitWidget.store;
_9.fetch({onComplete:function(_a){
var _b=[];
function _c(_d,_e){
for(var i=0;i<_d.length;i++){
var _f=_d[i];
var _10=_e+_f.label;
_b.push(_10);
if(_f.children){
_c(_f.children,_e+">");
}
}
};
_c(_a,"");
_b=_b.join("\n");
_7(_b);
}});
},parse:function(_11){
var _12=this.parseItems(dojox.html.entities.decode(_11));
return _12;
},update:function(_13,_14){
var _15=_14;
var _16={identifier:"id",label:"label",items:[],__json__:function(){
var _17={};
if(this.identifier){
_17.identifier=this.identifier;
}
if(this.label){
_17.label=this.label;
}
if(this.id){
_17.id=this.id;
}
if(this.items||this.children){
var _18=this.items||this.children;
var _19=arguments.callee;
_18=dojo.map(_18,function(_1a){
var _1b=dojo.mixin({},_1a);
_1b.__json__=_19;
delete _1b._0;
delete _1b._RI;
delete _1b._S;
return _1b;
});
if(this.items){
_17.items=_18;
}else{
if(this.children){
_17.children=_18;
}
}
}
return _17;
}};
for(var i=0;i<_15.length;i++){
var _1c=_15[i];
var _1d=_1c.indent;
var _1e=_16.items,_1f;
var win=this._getWindow();
for(var j=0;j<_1d;j++){
if(!_1e.length){
_1f=win.eval("new Object()");
_1f.id=Math.round(Math.random()*1000000000000);
_1f.label="undefined";
_1e.push(_1f);
}
var _20=_1e[_1e.length-1];
_1e=_20.children||(_20.children=[]);
}
var _1f=win.eval("new Object()");
_1f.id=""+Math.round(Math.random()*1000000000000);
_1f.label=_1c.text;
_1e.push(_1f);
}
var _21=this.buildStructure(_16);
this.replaceTreeStoreData(_13.dijitWidget,_16);
this._attr(_13,"structure",_21);
},replaceStoreData:function(_22,_23){
_22.clearOnClose=true;
_22.data=_23;
_22.close();
_22.fetch({query:this.query,queryOptions:{deep:true},onComplete:dojo.hitch(this,function(_24){
})});
},replaceTreeStoreData:function(_25,_26){
var _27=_25.store;
var _28=this._widget.domNode._dvWidget._srcElement.getAttribute("store");
var _29=_3.byId(_28);
this._attr(_29,"data",_26);
_27.data=_26;
_27.clearOnClose=true;
_27.data=_26;
_27.close();
_25.setStore(_27);
},_attr:function(_2a,_2b,_2c){
var _2d={};
_2d[_2b]=_2c;
var _2e=new _4(_2a,_2d);
this._addOrExecCommand(_2e);
},_addOrExecCommand:function(_2f){
if(this.command&&_2f){
this.command.add(_2f);
}else{
this._getContext().getCommandStack().execute(this.command||_2f);
}
},getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},_getContext:function(){
var _30=this.getEditor();
return _30&&(_30.getContext&&_30.getContext()||_30.context);
},_getWindow:function(){
var _31=this._getContext();
return _31&&_31.getGlobal&&_31.getGlobal();
},buildStructure:function(_32){
this._childStructure(_32.items,0);
var t=[];
var s=t;
for(var i=0;i<this._structure.length;i++){
var _33={field:"children",children:[]};
var _34=this._structure[i];
var _35=0;
for(var n in _34){
_33.children[_35++]={field:n,name:n};
}
t.push(_33);
t=_33.children;
}
var _36=[{cells:[s[0].children]}];
return _36;
},_childStructure:function(_37,_38){
if(!this._structure[_38]){
this._structure[_38]={};
}
for(var i=0;i<_37.length;i++){
var _39=_37[i];
if(_39.children){
this._childStructure(_39.children,_38+1);
}
for(var _3a in _39){
if(_3a!=="children"&&_3a!=="id"){
this._structure[_38][_3a]=_3a;
}
}
}
}});
});
