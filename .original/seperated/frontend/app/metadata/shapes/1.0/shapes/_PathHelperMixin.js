//>>built
define("maq-metadata-shapes/shapes/_PathHelperMixin",["davinci/Workbench","davinci/workbench/Preferences","davinci/ve/commands/ModifyCommand"],function(_1,_2,_3){
var _4=function(){
};
_4.prototype={getSnapInfo:function(_5,_6){
var _7=dojo.clone(_6);
var _8=_5.dijitWidget;
var _9=dojo.clone(_8._points);
var _a=dojo.position(_8._svgroot,true);
for(var i=0;i<_9.length;i++){
var p=_9[i];
p.x=p.x+_a.x;
p.y=p.y+_a.y;
}
_7.snapPoints=_9;
return _7;
},getDraggables:function(){
var _b=this._widget.dijitWidget;
var _c=dojo.clone(_b._points);
var _d=_b._bbox;
var _e=_d.x;
var _f=_d.y;
var _10=_b._xoffset;
var _11=_b._yoffset;
for(var i=0;i<_c.length;i++){
var p=_c[i];
p.x=(p.x-_e)+_10;
p.y=(p.y-_f)+_11;
}
return {points:_c};
},onMouseDown_Widget:function(_12){
if(!_12||!_12.handle||!_12.handle._shapeDraggable){
return;
}
var _13=this._widget.dijitWidget;
var _14=_12.handle._shapeDraggable.point;
var p=_13._points[_14];
this.orig_p=dojo.clone(p);
this.un_p=dojo.clone(p);
},dragEndPointDelta:function(_15){
var _16=_15.index,dx=_15.dx,dy=_15.dy,_17=_15.pageX,_18=_15.pageY,_19=_15.e;
var _1a=this._widget.dijitWidget;
if(_16<0||_16>=_1a._points.length||_1a._points.length<2){
return;
}
var _1b=this._widget?this._widget.getContext():undefined;
if(_1b){
var _1c=_1b.getParentIframeBounds();
_17-=_1c.l;
_18-=_1c.t;
}
this.un_p.x=this.un_p.x+dx;
this.un_p.y=this.un_p.y+dy;
var p=_1a._points[_16];
if(_19.shiftKey){
var _1d;
if(!_16){
_1d=_1a._points[1];
}else{
_1d=_1a._points[_16-1];
}
var _1e=Math.abs(this.un_p.x-_1d.x);
var _1f=Math.abs(this.un_p.y-_1d.y);
if(_1e>_1f){
p.x=this.un_p.x;
p.y=_1d.y;
}else{
p.x=_1d.x;
p.y=this.un_p.y;
}
}else{
p.x=this.un_p.x;
p.y=this.un_p.y;
}
_1a.createGraphics();
_1a.resize();
var _20=_1a._g.getBBox();
_1a.adjustBBox_Widget(_20);
_1a._svgroot.style.marginLeft=(_20.x-_1a._bboxStartup.x)+"px";
_1a._svgroot.style.marginTop=(_20.y-_1a._bboxStartup.y)+"px";
var _21;
if(this._widget){
var _21=dojo.style(this._widget.domNode,"position");
}
var _22=(_21=="absolute");
var _23=_2.getPreferences("davinci.ve.editorPrefs",_1.getProject());
var _24=_23.snap&&_22;
var _25=_24;
if((_24||_25)&&_19&&this._widget&&_1b){
var _26={type:this._widget.type};
var _27={x:_17,y:_18};
var _28={l:_17,t:_18,w:0,h:0};
_1b.dragMoveUpdate({widgets:[this._widget],data:_26,eventTarget:_19.target,position:_27,absolute:_22,currentParent:null,rect:_28,doSnapLinesX:_24,doSnapLinesY:_25,doFindParentsXY:false,doCursor:!_22});
}else{
if(_1b){
_1b.dragMoveCleanup();
}
}
},onMouseMoveOut_Widget:function(_29){
var _2a=_29.handle;
var _2b=_2a._shapeDraggable.point;
var _2c=dojo.mixin({index:_2b},_29);
this.dragEndPointDelta(_2c);
},onMouseUp_Widget:function(_2d){
var _2e=this._widget;
var _2f=_2e.dijitWidget;
var _30=_2f._points;
var _31=_30[0].x;
var _32=_30[0].y;
for(var i=1;i<_30.length;i++){
var x=_30[i].x;
var y=_30[i].y;
if(x<_31){
_31=x;
}
if(y<_32){
_32=y;
}
}
var arr=[];
for(var i=0;i<_30.length;i++){
arr.push(_30[i].x-_31);
arr.push(_30[i].y-_32);
}
var _33=arr.join();
var _34={points:_33};
_2d.add(new _3(_2e,_34,null));
var _35=this._widget?this._widget.getContext():undefined;
_35.dragMoveCleanup();
}};
return _4;
});
