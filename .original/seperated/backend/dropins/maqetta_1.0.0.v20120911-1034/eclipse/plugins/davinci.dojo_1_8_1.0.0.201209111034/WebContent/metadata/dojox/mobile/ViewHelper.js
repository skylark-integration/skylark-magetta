//>>built
define("maq-metadata-dojo/dojox/mobile/ViewHelper",["dojo/_base/connect","dojo/dom-class","dojo/window","davinci/commands/CompoundCommand","davinci/ve/commands/StyleCommand","davinci/ve/commands/ModifyAttributeCommand"],function(_1,_2,_3,_4,_5,_6){
var _7=function(){
};
_7.prototype={create:function(_8,_9){
var _a=_8.dijitWidget,_b=_8.domNode,_c=_b.parentNode,_d=_8.getContext();
_a.disableTouchScroll=true;
_1.connect(_a,"startup",function(){
if(_d.sceneManagers&&_d.sceneManagers.DojoMobileViews){
_d.sceneManagers.DojoMobileViews._viewAdded(_c._dvWidget,_8);
}
_a.show(true);
});
},_makeVisible:function(_e,_f){
var _10=_e.parentNode;
for(var i=0;i<_10.children.length;i++){
node=_10.children[i];
if(_2.contains(node,"mblView")){
node._dvWidget.dijitWidget.disableTouchScroll=true;
var _11,_12;
if(node==_e){
_11="";
node._dvWidget.dijitWidget.set("selected",true);
_f.add(new _6(node._dvWidget,{selected:"true"}));
}else{
_11="none";
node._dvWidget.dijitWidget.set("selected",false);
_f.add(new _6(node._dvWidget,{selected:"false"}));
}
_f.add(new _5(node._dvWidget,[{display:_11}]));
}
}
},_updateVisibility:function(_13){
if(!_13||!_13._dvWidget||!_2.contains(_13,"mblView")){
return;
}
var _14=_13._dvWidget;
var _15=_14.getContext();
var _16=[];
var _17=_13;
var _18=_17.parentNode;
while(_17&&_17.tagName!="BODY"){
var _19=_17.parentNode;
var _1a=false;
if(_2.contains(_17,"mblView")){
if(_17.style.display=="none"||(_17&&_17._dvWidget&&_17._dvWidget.dijitWidget&&!_17._dvWidget.dijitWidget.get("selected"))){
_16.splice(0,0,_17);
_1a=true;
}
if(_19&&!_1a){
for(var i=0;i<_19.children.length;i++){
var n=_19.children[i];
if(_2.contains(n,"mblView")){
if(n.style.display!="none"||(n&&n._dvWidget&&n._dvWidget.dijitWidget&&n._dvWidget.dijitWidget.get("selected"))){
_16.splice(0,0,_17);
}
}
}
}
}
_17=_19;
}
if(_16.length>0){
var _1b=new _4();
for(var v=0;v<_16.length;v++){
var _1c=_16[v];
this._makeVisible(_1c,_1b);
}
_15.getCommandStack().execute(_1b);
}
if(_15.sceneManagers&&_15.sceneManagers.DojoMobileViews){
_15.sceneManagers.DojoMobileViews._viewSelectionChanged(_18._dvWidget,_14);
}
},onToggleVisibility:function(_1d,on){
if(!_1d||!_1d.domNode||!_2.contains(_1d.domNode,"mblView")){
return true;
}
var _1e=_1d.domNode;
var _1f=_1e.parentNode;
var _20;
if(on){
var _21=0;
for(var i=0;i<_1f.children.length;i++){
_20=_1f.children[i];
if(_2.contains(_20,"mblView")){
_21++;
}
}
if(_21>1){
for(var i=0;i<_1f.children.length;i++){
_20=_1f.children[i];
if(_2.contains(_20,"mblView")){
if(_20!=_1e){
this._updateVisibility(_20);
break;
}
}
}
}
}else{
this._updateVisibility(_1e);
}
return false;
},onSelect:function(_22){
if(!_22||!_22.domNode||!_2.contains(_22.domNode,"mblView")){
return;
}
this._updateVisibility(_22.domNode);
},isAllowed:function(_23){
if(_23.absolute){
return false;
}else{
return _23.isAllowedChild&&_23.isAllowedParent;
}
},isAllowedError:function(_24){
if(_24.absolute){
return "dojox.mobile View widgets cannot be added using absolute layout (i.e., position:absolute)";
}else{
return _24.errorMsg;
}
},chooseParent:function(_25){
if(_25.length>1&&_2.contains(_25[_25.length-1].domNode,"mblView")){
return _25[_25.length-2];
}else{
return _25[_25.length-1];
}
},onLoad:function(_26,_27){
if(_27){
return;
}
var _28=_26.domNode;
var _29=_28.parentNode;
var _2a,_2b,_2c;
for(var i=0;i<_29.children.length;i++){
_2b=_29.children[i];
if(_2.contains(_2b,"mblView")){
if(!_2c){
_2c=_2b;
}
_2a=_2b._dvWidget.dijitWidget;
if(_2a.selected){
_2c=_2b;
break;
}
}
}
this._updateVisibility(_2c);
},onRemove:function(_2d){
if(!_2d||!_2d.domNode||!_2.contains(_2d.domNode,"mblView")){
return;
}
var _2e=_2d.domNode;
var id=_2e.id;
var _2f=_2d.getContext();
var _30=_2e.parentNode;
var _31;
var _32=false;
if(_2e.style.display!=="none"||_2e.getAttribute("selected")==="true"){
for(var i=0;i<_30.children.length;i++){
_31=_30.children[i];
if(_2.contains(_31,"mblView")){
if(_31!=_2e){
_32=true;
break;
}
}
}
}
return function(){
if(_2f.sceneManagers&&_2f.sceneManagers.DojoMobileViews){
_2f.sceneManagers.DojoMobileViews._viewDeleted(_30._dvWidget);
}
if(_32){
_2f.select(_31._dvWidget);
}
};
},disableDragging:function(_33){
if(!_33||!_33.getParent){
return false;
}
var _34=_33.getParent();
if(!_34||!_34.domNode){
return false;
}
if(_34.domNode.tagName=="BODY"){
return true;
}else{
return false;
}
},initialSize:function(_35){
if(_35&&_35.position){
if(!_35.size){
return {w:300,h:300};
}
}
}};
return _7;
});
