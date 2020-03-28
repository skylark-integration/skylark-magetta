//>>built
define("maq-metadata-dojo/dojox/mobile/ScrollableViewHelper",["dojo/_base/declare","./ViewHelper","davinci/ve/widget"],function(_1,_2,_3){
return _1(_2,{create:function(_4,_5){
this.inherited(arguments);
if(_4.dijitWidget){
_4.dijitWidget.disableTouchScroll=true;
}
},getChildren:function(_6,_7){
function _8(_9){
if(_7){
return _3.getWidget(_9);
}
var _a=_9._dvWidget;
if(_a){
return _a;
}
};
var _b=_6.dijitWidget,_c=_6._getChildren(_7),_d=_b.fixedHeader,_e=_b.fixedFooter;
if(_d&&_d.parentNode===_b.domNode){
_c.unshift(_8(_d));
}
if(_e&&_e.parentNode===_b.domNode){
_c.push(_8(_e));
}
return _c;
}});
});
