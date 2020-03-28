//>>built
define("maq-metadata-shapes/shapes/LineCreateTool",["dojo/_base/declare","dojo/_base/connect","davinci/ve/metadata","davinci/ve/tools/CreateTool","davinci/ve/commands/ModifyCommand","davinci/ve/commands/MoveCommand","davinci/ve/commands/ResizeCommand"],function(_1,_2,_3,_4,_5,_6,_7){
return _1(_4,{constructor:function(_8){
this._md_x=this._md_y=null;
this._mouseUpCounter=0;
this._exitCreateTool=false;
this._points=[];
this._pointsChanged=false;
this._gesture="click";
_2.subscribe("/davinci/ve/activeToolChanged",function(_9,_a){
this._removeDragLine();
}.bind(this));
},exitCreateToolOnMouseUp:function(){
return this._exitCreateTool;
},createNewWidget:function(){
return (this._mouseUpCounter===0);
},onMouseDown:function(_b){
this._md_x=_b.pageX;
this._md_y=_b.pageY;
this.inherited(arguments);
},onMouseMove:function(_c){
this.inherited(arguments);
if(this._mouseUpCounter>0||typeof this._md_x=="number"){
if(!this._dragLine){
var _d=this._context.getContainerNode();
this._dragLine=dojo.create("div",{style:"position:absolute;height:1px;border:none;border-top:1px dashed black;"},_d);
this._setCSS3Property(this._dragLine,"transformOrigin","left top");
}
var _e=this._dragLine.style;
var o,_f,_10,_11;
if(this._mouseUpCounter===0){
_f=this._md_x;
_10=this._md_y;
}else{
var pt=this._points[this._points.length-1];
_f=pt.x;
_10=pt.y;
if(this._widget&&this._widget.domNode&&this._widget.dijitWidget&&this._widget.dijitWidget._points){
var _12=this._widget.domNode;
var _13=dojo.position(_12,true);
var _14=this._widget.dijitWidget._points;
var _15=_14[_14.length-1];
_f=_13.x+_15.x;
_10=_13.y+_15.y;
}
}
_11=this._shiftKeyProcessing(_c,_f,_10,_c.pageX,_c.pageY);
var _16=_11.x;
var _17=_11.y;
o=this._getDistanceAndAngle(_f,_10,_16,_17);
_e.left=_f+"px";
_e.top=_10+"px";
_e.width=o.distance+"px";
this._setCSS3Property(this._dragLine,"transform","rotate("+o.degrees+"deg)");
}
},onMouseUp:function(_18){
var _19=_3.queryDescriptorByName(this._data.name,this._data.type,"multiSegment");
var _1a,_1b,_1c,_1d,_1e;
if(_19){
if(this._mouseUpCounter===0&&typeof this._md_x=="number"){
if(this._sameSpot(this._md_x,this._md_y,_18.pageX,_18.pageY)){
this._points.push({x:_18.pageX,y:_18.pageY});
}else{
_1b=this._md_x;
_1c=this._md_y;
this._points.push({x:_1b,y:_1c});
_1a=this._shiftKeyProcessing(_18,_1b,_1c,_18.pageX,_18.pageY);
_1d=_1a.x;
_1e=_1a.y;
this._points.push({x:_1d,y:_1e});
this._gesture="drag";
}
this._pointsChanged=true;
}else{
if(this._mouseUpCounter===0){
this._exitCreateTool=true;
}else{
if(this._mouseUpSameSpot(_18.pageX,_18.pageY)){
this._pointsChanged=false;
this._exitCreateTool=true;
}else{
var _1f=this._points[this._points.length-1];
_1b=_1f.x;
_1c=_1f.y;
_1a=this._shiftKeyProcessing(_18,_1b,_1c,_18.pageX,_18.pageY);
_1d=_1a.x;
_1e=_1a.y;
this._points.push({x:_1d,y:_1e});
this._pointsChanged=true;
}
}
}
}else{
if(typeof this._md_x=="number"&&!this._sameSpot(this._md_x,this._md_y,_18.pageX,_18.pageY)){
_1b=this._md_x;
_1c=this._md_y;
this._points.push({x:_1b,y:_1c});
_1a=this._shiftKeyProcessing(_18,_1b,_1c,_18.pageX,_18.pageY);
_1d=_1a.x;
_1e=_1a.y;
this._points.push({x:_1d,y:_1e});
this._gesture="drag";
this._pointsChanged=true;
}
this._exitCreateTool=true;
}
this.inherited(arguments);
this._md_x=this._md_y=null;
this._removeDragLine();
},mouseUpProcessingCompleted:function(){
this._mouseUpCounter++;
},addToCommandStack:function(_20,_21){
var _22=_21.widget;
if(this._pointsChanged&&_22){
var _23=this._getPointsInPageUnits(_22);
var _24=this._getBounds(this._points);
var _25=dojo.style(_22.domNode,"position");
var _26=(_25=="absolute");
var _27=(this._gesture=="drag")?2:1;
if(_23){
var _28=this._getBounds(_23);
for(var i=0;i<this._points.length-_27;i++){
this._points[i]=_23[i];
}
_24=this._getBounds(this._points);
if(_24.w!=_28.w||_24.h!=_28.h){
_20.add(new _7(_22,_24.w,_24.h,undefined));
}
if(_26&&(_24.x!=_28.x||_24.y!=_28.y)){
var _29=parseInt(dojo.style(_22.domNode,"left"));
var _2a=parseInt(dojo.style(_22.domNode,"top"));
var _2b=_29+(_24.x-_28.x);
var _2c=_2a+(_24.y-_28.y);
_20.add(new _6(_22,_2b,_2c));
}
}
var s;
if(this._points.length===1){
s="0,0,0,0";
}else{
s="";
for(var i=0;i<this._points.length;i++){
var pt=this._points[i];
if(i>0){
s+=",";
}
s+=(pt.x-_24.x)+","+(pt.y-_24.y);
}
}
var _2d={points:s};
_20.add(new _5(_22,_2d));
}
},_shiftKeyProcessing:function(_2e,_2f,_30,_31,_32){
var _33={x:_31,y:_32};
var _34=10;
if(_2e.shiftKey){
var _35=Math.abs(_31-_2f);
var _36=Math.abs(_32-_30);
if(_35>=_34||_36>=_34){
if(_35>=_36){
_33.y=_30;
}else{
_33.x=_2f;
}
}
}
return _33;
},onKeyDown:function(_37){
if(_37.keyCode==27){
this._pointsChanged=false;
this._exitCreateTool=true;
this._removeDragLine();
}
this.inherited(arguments);
},_sameSpot:function(x1,y1,x2,y2){
var _38=10;
return (Math.abs(x2-x1)<=_38&&Math.abs(y2-y1)<=_38);
},_mouseUpSameSpot:function(x,y){
if(this._points.length===0){
return false;
}else{
var _39=this._points[this._points.length-1];
if(this._sameSpot(x,y,_39.x,_39.y)){
return true;
}else{
return false;
}
}
},_getBounds:function(_3a){
if(!_3a&&!_3a.length){
return;
}
var _3b=_3a[0].x;
var _3c=_3a[0].y;
var _3d=_3b;
var _3e=_3c;
for(var i=1;i<_3a.length;i++){
var pt=_3a[i];
if(pt.x<_3b){
_3b=pt.x;
}
if(pt.y<_3c){
_3c=pt.y;
}
if(pt.x>_3d){
_3d=pt.x;
}
if(pt.y>_3e){
_3e=pt.y;
}
}
return {x:_3b,y:_3c,w:_3d-_3b,h:_3e-_3c};
},_setCSS3Property:function(_3f,_40,_41){
var _42=_3f.style;
var _43=_40.charAt(0).toUpperCase()+_40.slice(1);
_42["webkit"+_43]=_41;
_42["Moz"+_43]=_41;
_42["ms"+_43]=_41;
_42["o"+_43]=_41;
_42[_40]=_41;
},_getDistanceAndAngle:function(x1,y1,x2,y2){
var o={};
var dx=x2-x1;
var dy=y2-y1;
o.distance=Math.sqrt(dx*dx+dy*dy);
var _44=Math.atan2(dy,dx);
o.degrees=_44*180/Math.PI;
return o;
},_getPointsInPageUnits:function(_45){
if(!_45||!_45.dijitWidget||!_45.dijitWidget._points){
return;
}
var _46=this._getOffsets(_45);
if(!_46){
return;
}
var _47=_46.offsetLeft;
var _48=_46.offsetTop;
var _49=_45.dijitWidget._points;
var _4a=[];
for(var i=0;i<_49.length;i++){
var pt=_49[i];
_4a.push({x:pt.x+_47,y:pt.y+_48});
}
return _4a;
},_getOffsets:function(_4b){
if(!_4b||!_4b.domNode||!_4b.domNode.offsetParent||!_4b.dijitWidget||!_4b.dijitWidget._points){
return;
}
var _4c=_4b.domNode;
var _4d=_4c.offsetLeft;
var _4e=_4c.offsetTop;
var pn=_4c.offsetParent;
while(pn&&pn.tagName!="BODY"){
_4d+=pn.offsetLeft;
_4e+=pn.offsetTop;
pn=pn.offsetParent;
}
return {offsetLeft:_4d,offsetTop:_4e};
},_removeDragLine:function(){
if(this._dragLine){
this._dragLine.parentNode.removeChild(this._dragLine);
this._dragLine=false;
}
}});
});
