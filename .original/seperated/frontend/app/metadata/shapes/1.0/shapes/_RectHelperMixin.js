//>>built
define("maq-metadata-shapes/shapes/_RectHelperMixin",["davinci/Workbench","davinci/workbench/Preferences","davinci/ve/commands/ModifyCommand"],function(_1,_2,_3){
var _4=function(){
};
_4.prototype={onCreateResize:function(_5,_6,_7,_8){
var _9={width:_7,height:_8};
_5.add(davinci.ve.commands.ModifyCommand(_6,_9,null));
},dragPointsStrings:["left_top","right_top","right_bottom","left_bottom"],getDraggables:function(){
var _a=this._widget.dijitWidget;
var _b=_a._xoffset;
var _c=_a._yoffset;
var _d=_a._width;
var _e=_a._height;
var _f=_b;
var _10=_f+_d/2;
var _11=_f+_d;
var top=_c;
var _12=top+_e/2;
var _13=top+_e;
var _14=[{x:_f,y:top},{x:_11,y:top},{x:_11,y:_13},{x:_f,y:_13}];
return {points:_14};
},onMouseDown_Widget:function(_15){
var _16=this._widget.dijitWidget;
this.un_x=this.orig_x=_16._x=0;
this.un_y=this.orig_y=_16._y=0;
this.un_width=this.orig_width=_16._width;
this.un_height=this.orig_height=_16._height;
},dragEndPointDelta:function(_17){
var _18=_17.index,dx=_17.dx,dy=_17.dy,_19=_17.pageX,_1a=_17.pageY,_1b=_17.e;
var _1c=this._widget.dijitWidget;
if(_18<0||_18>=4){
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
this.un_x=this.un_x+dx;
this.un_width=this.un_width-dx;
}else{
if(s.indexOf("right")>=0){
this.un_width=this.un_width+dx;
}
}
if(s.indexOf("top")>=0){
this.un_y=this.un_y+dy;
this.un_height=this.un_height-dy;
}else{
if(s.indexOf("bottom")>=0){
this.un_height=this.un_height+dy;
}
}
if(_1b.shiftKey){
if((s=="center_top"&&this.un_y<this.orig_y)||(s=="center_bottom"&&this.un_height>this.orig_height)||(s=="left_middle"&&this.un_x<this.orig_x)||(s=="right_middle"&&this.un_width>this.orig_width)){
if(this.un_width>this.un_height){
_1c._width=_1c._height=this.un_width;
}else{
_1c._width=_1c._height=this.un_height;
}
}else{
if(this.un_width<this.un_height){
_1c._width=_1c._height=this.un_width;
}else{
_1c._width=_1c._height=this.un_height;
}
}
if(s.indexOf("left")>=0){
_1c._x=this.orig_x+this.orig_width-_1c._width;
}else{
if(s.indexOf("center")>=0){
_1c._x=this.orig_x+this.orig_width/2-_1c._width/2;
}else{
if(s.indexOf("right")>=0){
_1c._x=this.orig_x;
}
}
}
if(s.indexOf("top")>=0){
_1c._y=this.orig_y+this.orig_height-_1c._height;
}else{
if(s.indexOf("middle")>=0){
_1c._y=this.orig_y+this.orig_height/2-_1c._height/2;
}else{
if(s.indexOf("bottom")>=0){
_1c._y=this.orig_y;
}
}
}
}else{
_1c._x=this.un_x;
_1c._y=this.un_y;
_1c._width=this.un_width;
_1c._height=this.un_height;
}
_1c.createGraphics();
_1c.resize();
var _1f=_1c._g.getBBox();
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
_2e._x=0;
_2e._y=0;
var _2f={width:_2e._width,height:_2e._height};
_2c.add(new _3(_2d,_2f,null));
var _30=this._widget?this._widget.getContext():undefined;
_30.dragMoveCleanup();
}};
return _4;
});
