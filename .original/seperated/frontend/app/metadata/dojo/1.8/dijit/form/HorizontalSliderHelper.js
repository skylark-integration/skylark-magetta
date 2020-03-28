//>>built
define("maq-metadata-dojo/dijit/form/HorizontalSliderHelper",["dojo/_base/declare","dojo/dom-construct",],function(_1,_2){
var _3=function(){
};
_3.prototype={_MIDDLE_OVERLAY_HEIGHT:5,getChildren:function(_4,_5){
function _6(_7){
if(_5){
return davinci.ve.widget.getWidget(_7);
}else{
var _8=_7._dvWidget;
if(_8){
return _8;
}
}
};
var _9=_4.dijitWidget;
var _a=_4._getChildren(_5);
var _b=this._getSecondaryDecoration(_9);
for(var _c=_b.lastChild;_c;_c=_c.previousSibling){
var _d=_6(_c);
_a.unshift(_d);
}
return _a;
},_getSecondaryDecoration:function(_e){
return _e.topDecoration;
},_getSecondaryDecorationLabel:function(){
return "topDecoration";
},_getMainDecoration:function(_f){
return _f.bottomDecoration;
},_getMainDecorationLabel:function(){
return "bottomDecoration";
},addChild:function(_10,_11,_12){
var _13=_10.dijitWidget.containerNode;
var _14=this._getSecondaryDecoration(_10.dijitWidget);
if(_11.container&&_11.container===this._getSecondaryDecorationLabel()){
_13=_14;
}else{
if(_12&&typeof _12=="number"){
_12=Math.max(_12-this._getSecondaryDecoration(_10.dijitWidget).childElementCount,0);
}
}
if(_12&&typeof _12=="number"){
if(_12>_13.childElementCount){
_12=_13.childElementCount;
}
if(_13.childElementCount>=_12&&_12>0){
_13=_13.childNodes[_12-1];
_12="after";
}
}
_2.place(_11.domNode,_13,_12);
if(this._started&&!_11._started){
_11.startup();
}
},getTargetOverlays:function(_15){
var _16=[];
var _17=_15.dijitWidget;
var _18=_17.domNode;
var _19=this._getSecondaryDecoration(_17);
var _1a=this._getMainDecoration(_17);
var _1b;
if(_19.offsetHeight>0){
_1b={x:_18.offsetLeft,y:_18.offsetTop,width:_19.offsetLeft,height:_19.offsetHeight};
_16.push(_1b);
_1b={x:_18.offsetLeft+_19.offsetLeft,y:_18.offsetTop+_19.offsetTop,width:_19.offsetWidth,height:this._MIDDLE_OVERLAY_HEIGHT};
_16.push(_1b);
_1b={x:_18.offsetLeft+_19.offsetLeft+_19.offsetWidth,y:_18.offsetTop,width:_19.offsetLeft,height:_19.offsetHeight};
_16.push(_1b);
}
_1b={x:_18.offsetLeft,y:_18.offsetTop+_19.offsetHeight,width:_18.offsetWidth,height:_1a.offsetTop-_19.offsetHeight};
_16.push(_1b);
if(_1a.offsetHeight>0){
_1b={x:_18.offsetLeft,y:_18.offsetTop+_1a.offsetTop,width:_1a.offsetLeft,height:_1a.offsetHeight};
_16.push(_1b);
_1b={x:_18.offsetLeft+_1a.offsetLeft,y:_18.offsetTop+_1a.offsetTop+_1a.offsetHeight-this._MIDDLE_OVERLAY_HEIGHT,width:_1a.offsetWidth,height:this._MIDDLE_OVERLAY_HEIGHT};
_16.push(_1b);
_1b={x:_18.offsetLeft+_1a.offsetLeft+_1a.offsetWidth,y:_18.offsetTop+_1a.offsetTop,width:_1a.offsetLeft,height:_1a.offsetHeight};
_16.push(_1b);
}
return _16;
}};
return _3;
});
