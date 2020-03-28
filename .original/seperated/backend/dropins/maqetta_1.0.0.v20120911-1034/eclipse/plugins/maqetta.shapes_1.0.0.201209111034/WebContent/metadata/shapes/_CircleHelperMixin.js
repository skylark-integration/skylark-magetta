//>>built
define("maq-metadata-shapes/shapes/_CircleHelperMixin",["davinci/Workbench","davinci/workbench/Preferences","davinci/ve/commands/ModifyCommand"],function(_1,_2,_3){
var _4=function(){
};
_4.prototype={onCreateResize:function(_5,_6,_7,_8){
var _9=this._updateCenterAndRadius(_6,_7/2,_8/2);
_5.add(davinci.ve.commands.ModifyCommand(_6,_9,null));
},dragPointsStrings:["left_top","center_top","right_top","right_middle","right_bottom","center_bottom","left_bottom","left_middle"],getDraggables:function(){
var _a=this._widget.dijitWidget;
var _b=_a._xoffset;
var _c=_a._yoffset;
var rx=(typeof _a._rx!="undefined")?_a._rx:_a._r;
var ry=(typeof _a._ry!="undefined")?_a._ry:_a._r;
var _d=rx+rx;
var _e=ry+ry;
var _f=_b;
var _10=_f+_d/2;
var _11=_f+_d;
var top=_c;
var _12=top+_e/2;
var _13=top+_e;
var _14=[{x:_f,y:top},{x:_10,y:top},{x:_11,y:top},{x:_11,y:_12},{x:_11,y:_13},{x:_10,y:_13},{x:_f,y:_13},{x:_f,y:_12}];
return {points:_14};
},onMouseDown_Widget:function(_15){
var _16=this._widget.dijitWidget;
this.un_cx=this.orig_cx=_16._cx;
this.un_cy=this.orig_cy=_16._cy;
this.un_rx=this.orig_rx=_16._rx;
this.un_ry=this.orig_ry=_16._ry;
},dragEndPointDelta:function(_17){
var _18=_17.index,dx=_17.dx,dy=_17.dy,_19=_17.pageX,_1a=_17.pageY,_1b=_17.e;
var _1c=this._widget.dijitWidget;
if(_18<0||_18>=8){
console.error("_RectShapeHelperMixin dragEndPointDelta(): index="+_18);
return;
}
var _1d=this._widget?this._widget.getContext():undefined;
if(_1d){
var _1e=_1d.getParentIframeBounds();
_19-=_1e.l;
_1a-=_1e.t;
}
this.hideAllDraggablesExcept(_18);
var s=this.dragPointsStrings[_18];
if(s.indexOf("left")>=0){
this.un_cx=this.un_cx+dx/2;
this.un_rx=this.un_rx-dx;
}else{
if(s.indexOf("right")>=0){
this.un_rx=this.un_rx+dx;
}
}
if(s.indexOf("top")>=0){
this.un_cy=this.un_cy+dy/2;
this.un_ry=this.un_ry-dy;
}else{
if(s.indexOf("bottom")>=0){
this.un_ry=this.un_ry+dy;
}
}
if(_1b.shiftKey){
if((s=="center_top"&&this.un_cy<this.orig_cy)||(s=="center_bottom"&&this.un_ry>this.orig_ry)||(s=="left_middle"&&this.un_cx<this.orig_cx)||(s=="right_middle"&&this.un_rx>this.orig_rx)){
if(this.un_rx>this.un_ry){
_1c._rx=_1c._ry=this.un_rx;
}else{
_1c._rx=_1c._ry=this.un_ry;
}
}else{
if(this.un_rx<this.un_ry){
_1c._rx=_1c._ry=this.un_rx;
}else{
_1c._rx=_1c._ry=this.un_ry;
}
}
_1c._cx=this.orig_cx;
_1c._cy=this.orig_cy;
}else{
_1c._cx=this.un_cx;
_1c._cy=this.un_cy;
_1c._rx=this.un_rx;
_1c._ry=this.un_ry;
}
var _1f=_1c._g.getBBox();
_1c.createGraphics();
_1c.resize();
_1c._svgroot.style.marginLeft=(_1f.x-_1c._bboxStartup.x)+"px";
_1c._svgroot.style.marginTop=(_1f.y-_1c._bboxStartup.y)+"px";
var _20;
if(this._widget){
var _20=dojo.style(this._widget.domNode,"position");
}
var _21=(_20=="absolute");
var _22=_2.getPreferences("davinci.ve.editorPrefs",_1.getProject());
var _23=_22.snap&&_21;
var _24=_23;
if((_23||_24)&&_1b&&this._widget&&_1d){
var _25={type:this._widget.type};
var _26={x:_19,y:_1a};
var _27={l:_19,t:_1a,w:0,h:0};
_1d.dragMoveUpdate({widgets:[this._widget],data:_25,eventTarget:_1b.target,position:_26,absolute:_21,currentParent:null,rect:_27,doSnapLinesX:_23,doSnapLinesY:_24,doFindParentsXY:false,doCursor:!_21});
}else{
if(_1d){
_1d.dragMoveCleanup();
}
}
},onMouseMoveOut_Widget:function(_28){
var _29=_28.handle;
var _2a=_29._shapeDraggable.point;
var _2b=dojo.mixin({index:_2a},_28);
this.dragEndPointDelta(_2b);
},onMouseUp_Widget:function(_2c){
var _2d=this._widget;
var _2e=_2d.dijitWidget;
var _2f=this._updateCenterAndRadius(_2d,_2e._rx,_2e._ry);
_2c.add(new _3(_2d,_2f,null));
var _30=this._widget?this._widget.getContext():undefined;
_30.dragMoveCleanup();
},_updateCenterAndRadius:function(_31,rx,ry){
var _32=_31.dijitWidget;
_32._cx=rx/2;
_32._cy=ry/2;
var _33={cx:_32._cx,cy:_32._cy};
_33.rx=rx;
_33.ry=ry;
return _33;
}};
return _4;
});
