//>>built
define("maq-metadata-dojo/dojox/mobile/ListItemHelper",["davinci/ve/widget","dojo/dom-construct",],function(_1,_2){
var _3=function(){
};
_3.prototype={create:function(_4,_5){
var _6=_4.dijitWidget;
if(_6&&_6.anchorNode){
_6.anchorNode.addEventListener("click",function(e){
e.stopPropagation();
},true);
}
},getChildrenData:function(_7,_8){
var _9=[];
_9.push(_7.dijitWidget.labelNode.innerHTML);
dojo.forEach(_7.getChildren(),function(w){
_9.push(w.getData());
});
return _9;
},getChildren:function(_a,_b){
var _c=[];
if(_a&&_a.dijitWidget&&_a.dijitWidget.box){
dojo.forEach(_a.dijitWidget.box.children,function(_d){
if(dojo.hasClass(_d,"mblListItemLabel")){
return;
}
if(_b){
_c.push(require("davinci/ve/widget").getWidget(_d));
}else{
var _e=_d._dvWidget;
if(_e){
_c.push(_e);
}
}
});
}
return _c;
},getContainerNode:function(_f){
var _10;
if(_f&&_f.dijitWidget&&_f.dijitWidget.box){
_10=_f.dijitWidget.box;
}
return _10;
},addChild:function(_11,_12,_13){
var _14=this.getContainerNode(_11);
var _15;
if(typeof (_13)=="number"){
_15=_13+1;
}
_2.place(_12.domNode,_14,_15);
}};
return _3;
});
