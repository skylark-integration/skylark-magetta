//>>built
define("maq-metadata-dojo/dijit/form/DropDownButtonHelper",["dojo/_base/array","dojo/_base/connect","davinci/ve/widget"],function(_1,_2,_3){
var _4=function(_5,_6){
if(!_5){
return undefined;
}
var _7={type:_5.declaredClass,properties:{}},_8=_5.containerNode?_5.containerNode.childNodes:[],_9=[];
_1.forEach(_8,function(n){
if((typeof n=="object"&&n.nodeType!=1)||typeof n=="string"||n.length){
}else{
var _a=_6.getDijit().byNode(n);
if(!_a){
return;
}
var _b={type:_a.declaredClass,properties:{}};
if(_a.label){
_b.properties.label=_a.label;
}
if(_b){
if(!_9){
_9=_b;
}else{
_9.push(_b);
}
}
if(_9){
_7.children=_9;
}
}
});
return _7;
};
var _c=function(){
};
_c.prototype={create:function(_d,_e){
var dw=_d.dijitWidget,_f=function(){
var _10=dw.dropDown;
if(_10){
var _11=_10._popupWrapper._dvWidget;
if(_11){
_11.hidden=true;
_11.internal=true;
}
_10.owner=dw;
}
},_12=_2.connect(dw,"startup",function(){
if(_12){
_2.disconnect(_12);
}
_f();
});
_f();
},getData:function(_13,_14){
if(!_13){
return undefined;
}
var _15=_13._getData(_14);
if(!_15){
return undefined;
}
var _16=[];
if(_15.properties.dropDown){
_16=_4(_15.properties.dropDown,_13._edit_context);
if(_16){
delete _15.properties.dropDown;
_15.children.push(_16);
}
}
return _15;
},getChildren:function(_17){
var _18=_17.dijitWidget.dropDown;
return _18?[_3.getWidget(_18.domNode)]:[];
}};
return _c;
});
