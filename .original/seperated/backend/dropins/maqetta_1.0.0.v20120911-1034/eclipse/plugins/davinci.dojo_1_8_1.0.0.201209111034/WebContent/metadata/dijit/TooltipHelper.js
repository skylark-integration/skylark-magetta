//>>built
define("maq-metadata-dojo/dijit/TooltipHelper",function(){
var _1=function(){
};
_1.prototype={create:function(_2){
var _3=_2.attr("connectId");
if(!_3||_3.length===0){
return;
}
if(_2.getContext().getDojo().isArray(_3)){
_3=_3[0];
}
_2._ownerId=_3;
},onToggleVisibility:function(_4,on){
return false;
},onSelect:function(_5){
var _6=_5.attr("connectId");
if(!_6||_6.length===0){
return;
}
if(_5.getContext().getDojo().isArray(_6)){
_6=_6[0];
}
var _7=_5.getContext().getDijit();
_7.showTooltip(_5.domNode.innerHTML,davinci.ve.widget.byId(_6).domNode);
},onDeselect:function(_8){
var _9=_8.attr("connectId");
if(!_9||_9.length===0){
return;
}
if(_8.getContext().getDojo().isArray(_9)){
_9=_9[0];
}
var _a=_8.getContext().getDijit();
_a.hideTooltip(davinci.ve.widget.byId(_9).domNode);
return true;
},getSelectNode:function(_b){
var _c=_b.getDijit().Tooltip._masterTT;
return _c&&_c.domNode;
}};
return _1;
});
