//>>built
define("maq-metadata-dojo/callbacks",function(){
function _1(_2){
this.context=_2;
this.name="Dojo Mobile Views";
};
_1.prototype={id:"DojoMobileViews",category:"DojoMobileView",_viewAdded:function(_3,_4){
dojo.publish("/davinci/scene/added",[this,_3,_4]);
},_viewDeleted:function(_5){
dojo.publish("/davinci/scene/removed",[this,_5]);
},_viewSelectionChanged:function(_6,_7){
if(_7&&_7.id){
dojo.publish("/davinci/scene/selectionChanged",[this,_7.id]);
}
},_reviewEditorSceneChange:function(_8){
if(_8==this.context&&_8.declaredClass=="davinci.review.editor.Context"){
var dj=_8.getDojo();
var _9=dj?dj.dijit:null;
if(_9){
var _a=dj.query(".mblView");
for(var i=0;i<_a.length;i++){
var _b=_a[i];
if(_b.id){
var _c=_9.byId(_b.id);
if(_c){
_c.onAfterTransitionIn=function(sm,_d,_e,_f,_10,_11,_12){
dojo.publish("/davinci/scene/selectionChanged",[sm,_d]);
}.bind(this,this,_b.id);
dj.subscribe("/dojox/mobile/viewChanged",function(_13){
if(this._swapViewChangeHandle){
return;
}
if(_13&&_13.id){
dojo.publish("/davinci/scene/selectionChanged",[this,_13.id]);
}
}.bind(this));
}
}
}
}
}
},selectScene:function(_14){
var _15=_14.sceneId;
var dj=this.context.getDojo();
var n;
if(!dj){
return;
}
var _16=dj.byId(_15);
var _17=null;
if(this.context.declaredClass=="davinci.ve.Context"){
if(_16){
var _18=_16._dvWidget;
if(_18){
var _19=_18.getHelper();
if(_19&&_19._updateVisibility){
_19._updateVisibility(_16);
_17=_15;
}
}
this.context.select(_18);
}
}else{
if(this.context.declaredClass=="davinci.review.editor.Context"){
if(_16){
var _1a=dj.dijit;
var _1b=_16;
var _1c=_1b.parentNode;
var _1d=[];
while(_1b.tagName!="BODY"){
if(_1b.style.display=="none"||_1b.getAttribute("selected")!="true"){
_1d.splice(0,0,_1b);
}else{
for(var i=0;i<_1c.childNodes.length;i++){
n=_1c.childNodes[i];
if(n.nodeType==1&&dj.hasClass(n,"mblView")){
if(n!=_1b&&(n.style.display!="none"||n.getAttribute("selected")=="true")){
_1d.splice(0,0,_1b);
break;
}
}
}
}
_1b=_1c;
_1c=_1b.parentNode;
}
for(var v=0;v<_1d.length;v++){
var _1e=_1d[v];
if(_1e&&_1e.id){
var _1f=_1a.byId(_1e.id);
if(_1f){
if(_1f.declaredClass=="dojox.mobile.SwapView"){
var _20=_1f.getShowingView();
var _21,_22;
var _23=_20.domNode.parentNode.childNodes;
for(var j=0;j<_23.length;j++){
n=_23[j];
if(n.id==_20.id){
_21=j;
}
if(n.id==_1f.id){
_22=j;
}
}
if(this._swapViewChangeHandle){
dj.unsubscribe(this._swapViewChangeHandle);
this._swapViewChangeHandle=null;
}
if(typeof _21=="number"&&typeof _22=="number"&&_21!==_22){
var dir=(_22>_21)?1:-1;
var cv=_20;
this._swapViewChangeHandle=dj.subscribe("/dojox/mobile/viewChanged",function(v){
if(v&&v.id&&v.id!=_1f.id&&v.id!=cv.id){
cv=v;
cv.goTo(dir);
}else{
dj.unsubscribe(this._swapViewChangeHandle);
this._swapViewChangeHandle=null;
dojo.publish("/davinci/scene/selectionChanged",[this,_1f.id]);
}
}.bind(this));
cv.goTo(dir);
}
}else{
if(_1f.show){
_1f.show();
}
}
}
}
}
_17=(_1d.length>0)?_15:null;
}
}
}
if(_17){
dojo.publish("/davinci/scene/selectionChanged",[this,_17]);
}
return _17;
},getCurrentScene:function(_24){
if(!_24){
return;
}
var _25,_26;
var _27=this.context.getDocument();
var _28=(_27&&_27.defaultView&&_27.defaultView.dijit);
var _29=_24.querySelectorAll(".mblView");
for(var i=0;i<_29.length;i++){
var _2a=_29[i];
if(_2a.parentNode!=_24){
continue;
}
_26=null;
if(this.context.declaredClass=="davinci.ve.Context"){
_26=(_2a._dvWidget&&_2a._dvWidget.dijitWidget);
}else{
if(this.context.declaredClass=="davinci.review.editor.Context"){
_26=(_28&&_28.byId&&_2a.id)?_28.byId(_2a.id):null;
}
}
if(_26&&_26.getShowingView){
var _2b=_26.getShowingView();
if(_2b&&_2b.domNode&&_2b.domNode.id){
_25=_2b.domNode;
break;
}
}
}
return _25;
},getInitialScenes:function(_2c){
var arr=[];
if(!_2c){
return arr;
}
var _2d,_2e;
var _2f=this.context.getDocument();
var _30=(_2f&&_2f.defaultView&&_2f.defaultView.dijit);
var _31=_2c.querySelectorAll(".mblView");
for(var i=0;i<_31.length;i++){
var _32=_31[i];
if(_32.parentNode!=_2c){
continue;
}
_2e=null;
if(this.context.declaredClass=="davinci.ve.Context"){
_2e=(_32._dvWidget&&_32._dvWidget.dijitWidget);
}else{
if(this.context.declaredClass=="davinci.review.editor.Context"){
_2e=(_30&&_30.byId&&_32.id)?_30.byId(_32.id):null;
}
}
if(_2e&&_2e.selected){
arr.push(_2e.domNode);
}
}
return arr;
},getAllSceneContainers:function(){
var _33=[];
if(!this.context||!this.context.rootNode){
return _33;
}
var dj=this.context.getDojo();
if(!dj){
return _33;
}
var _34=this.context.rootNode;
var _35=dj.query(".mblView",_34);
for(var i=0;i<_35.length;i++){
var _36=_35[i];
var pn=_36.parentNode;
if(pn&&_33.indexOf(pn)<0){
_33.push(pn);
}
}
return _33;
},isSceneContainer:function(_37){
if(!this.context||!_37){
return false;
}
var dj=this.context.getDojo();
if(!dj){
return false;
}
for(var i=0;i<_37.childNodes.length;i++){
var _38=_37.childNodes[i];
if(_38.nodeType==1&&dj.hasClass(_38,"mblView")){
return true;
}
}
return false;
},getSceneChildren:function(_39){
if(!this.context||!_39){
return [];
}
var dj=this.context.getDojo();
if(!dj){
return [];
}
var _3a=[];
for(var i=0;i<_39.childNodes.length;i++){
var _3b=_39.childNodes[i];
if(_3b.nodeType==1&&dj.hasClass(_3b,"mblView")){
_3a.push(_3b);
}
}
return _3a;
},getSceneContainerForNode:function(_3c){
if(!this.context||!_3c){
return false;
}
return (_3c.tagName=="BODY")?null:_3c.parentNode;
}};
return {onDocInit:function(_3d){
var sm=new _1(_3d);
_3d.registerSceneManager(sm);
dojo.subscribe("/davinci/ui/context/statesLoaded",function(_3e){
sm._reviewEditorSceneChange(_3e);
});
}};
});
