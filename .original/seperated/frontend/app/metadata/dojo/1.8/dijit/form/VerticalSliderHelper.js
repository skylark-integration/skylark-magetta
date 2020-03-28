//>>built
define("maq-metadata-dojo/dijit/form/VerticalSliderHelper",["dojo/_base/declare","./HorizontalSliderHelper"],function(_1,_2){
return _1(_2,{_getSecondaryDecoration:function(_3){
return _3.leftDecoration;
},_getSecondaryDecorationLabel:function(){
return "leftDecoration";
},_getMainDecoration:function(_4){
return _4.rightDecoration;
},_getMainDecorationLabel:function(){
return "rightDecoration";
},getTargetOverlays:function(_5){
var _6=[];
var _7=_5.dijitWidget;
var _8=_7.domNode;
var _9=this._getSecondaryDecoration(_7);
var _a=this._getMainDecoration(_7);
var _b;
if(_9.offsetWidth>0){
_b={x:_8.offsetLeft,y:_8.offsetTop,width:_9.offsetWidth,height:_9.offsetTop};
_6.push(_b);
_b={x:_8.offsetLeft,y:_8.offsetTop+_9.offsetTop,width:this._MIDDLE_OVERLAY_HEIGHT,height:_9.offsetHeight};
_6.push(_b);
_b={x:_8.offsetLeft,y:_8.offsetTop+_9.offsetTop+_9.offsetHeight,width:_9.offsetWidth,height:_9.offsetTop};
_6.push(_b);
}
_b={x:_8.offsetLeft+_9.offsetWidth,y:_8.offsetTop,width:_8.offsetWidth-_9.offsetWidth-_a.offsetWidth,height:_8.offsetHeight};
_6.push(_b);
if(_a.offsetWidth>0){
_b={x:_8.offsetLeft+_a.offsetLeft,y:_8.offsetTop,width:_a.offsetWidth,height:_a.offsetTop};
_6.push(_b);
_b={x:_8.offsetLeft+_8.offsetWidth-this._MIDDLE_OVERLAY_HEIGHT,y:_8.offsetTop+_a.offsetTop,width:this._MIDDLE_OVERLAY_HEIGHT,height:_a.offsetHeight};
_6.push(_b);
_b={x:_8.offsetLeft+_a.offsetLeft,y:_8.offsetTop+_a.offsetTop+_a.offsetHeight,width:_a.offsetWidth,height:_a.offsetTop};
_6.push(_b);
}
return _6;
}});
});
