//>>built
define("maq-metadata-dojo/dijit/TreeHelper",["davinci/ve/widget","davinci/ve/commands/RemoveCommand","davinci/commands/CompoundCommand","../dojo/data/DataStoreBasedWidgetInput","./HTMLSubElementHelper","davinci/ve/commands/ReparentCommand"],function(_1,_2,_3,_4,_5,_6){
var _7=function(){
};
_7.prototype={getRemoveCommand:function(_8){
var _9=new _3();
var _a=_8.domNode._dvWidget._srcElement.getAttribute("model");
var _b=_1.byId(_a);
var _c=_b._srcElement.getAttribute("store");
var _d=_1.byId(_c);
_9.add(new _2(_8));
_9.add(new _2(_b));
_9.add(new _2(_d));
return _9;
},create:function(_e,_f){
try{
this.reparent(_e);
}
catch(e){
console.error("TreeHelper.Create error processing tree.");
}
},reparent:function(_10){
try{
var _11="";
if(_10.dijitWidget&&_10.dijitWidget.model){
var _12=_10.dijitWidget.model;
_11=_12.id?_12.id:_12._edit_object_id;
}
if(_11){
dojo.withDoc(_10.getContext().getDocument(),function(){
var _13=_11.declaredClass?_1.byId(_11.id):_1.byId(_11);
if(_13&&_10.dijitWidget&&_10.dijitWidget.model){
this._reparentWidget(_10,_13);
var _14=_13._srcElement.getAttribute("store");
if(_14){
var _15=_14.declaredClass?_1.byId(_14.id):_1.byId(_14);
if(_15){
this._reparentWidget(_13,_15);
}
}
}
}.bind(this));
}
}
catch(e){
console.error("TreeHelper.Reparent error processing tree.");
}
},_reparentWidget:function(_16,_17){
var _18=_16.getParent();
var _19=_17.getParent();
var _1a=(_18.indexOf(_16)<1)?0:_18.indexOf(_16)-1;
var i=_18.indexOf(_16);
var x=_19.indexOf(_17);
if((_18===_19)&&(i<x)){
_1a=_18.indexOf(_16);
}else{
if(_18!=_19){
_1a=i;
}
}
var _1b=new _6(_17,_18,_1a);
_1b.execute();
},getChildrenData:function(_1c,_1d){
if(!this._htmlSubElementHelper){
this._htmlSubElementHelper=new _5();
}
return this._htmlSubElementHelper.getChildrenData(_1c,_1d);
},cleanSrcElement:function(_1e){
var _1f=_1e.getAttribute("model");
if(_1f&&_1f.id){
_1e.setAttribute("model",_1f.id);
}
},_updateTreeSelectionChrome:function(_20,_21){
_21.dijitWidget.onLoadDeferred.then(function(){
setTimeout(function(){
var _22=_20.getSelection();
dojo.some(_22,function(_23,_24){
if(_23==_21){
_20.updateFocus(_21,_24);
return true;
}
}.bind(this));
}.bind(this),0);
}.bind(this));
},_createScriptBlockData:function(_25,_26,_27,_28){
var _29={type:"html.script",properties:{type:_25},children:_28};
_29.properties["data-dojo-event"]=_26;
_29.properties["data-dojo-args"]=_27;
return _29;
},_addStoreScriptBlocks:function(_2a){
if(!_2a.children){
_2a.children=[];
}
var _2b="return this.query({parent: this.getIdentity(item)});";
_2a.children.push(this._createScriptBlockData("dojo/method","getChildren","item",_2b));
},_addStoreFunctions:function(_2c){
if(!_2c.getChildren){
_2c.getChildren=this._getFunctionForGetChildren();
}
},_getFunctionForGetChildren:function(){
return function(_2d){
return this.query({parent:_2d.id});
};
},_addModelScriptBlocks:function(_2e){
if(!_2e.children){
_2e.children=[];
}
var _2f="return !item.leaf;";
_2e.children.push(this._createScriptBlockData("dojo/method","mayHaveChildren","item",_2f));
},_addModelFunctions:function(_30){
_30.mayHaveChildren=this._getFunctionForMayHaveChildren();
},_getFunctionForMayHaveChildren:function(){
return function(_31){
return !_31.leaf;
};
},};
return _7;
});
