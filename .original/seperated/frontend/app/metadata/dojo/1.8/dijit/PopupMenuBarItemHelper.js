//>>built
define("maq-metadata-dojo/dijit/PopupMenuBarItemHelper",["dojo/_base/array"],function(_1){
var _2=function(){
};
_2.prototype={create:function(_3,_4){
var _5=_3.dijitWidget.popup;
if(_5){
_5.domNode._dvWidget.hidden=true;
}
},getData:function(_6,_7){
if(!_6){
return;
}
var _8=_6._getData(_7);
if(!_8){
return;
}
var _9=[];
if(_8.properties.popup){
_9=this.serializePopup(_8.properties.popup,_6._edit_context);
if(_9){
delete _8.properties.popup;
_8.children.push(_9);
}
}
return _8;
},serializePopup:function(_a,_b){
if(!_a){
return;
}
var _c={type:_a.declaredClass,properties:{}},_d=_a.getChildren(),_e,_f=[];
_1.forEach(_d,function(n){
_e={type:n.declaredClass,properties:n.label?{label:n.label}:{}};
if(_e){
if(!_f){
_f=_e;
}else{
_f.push(_e);
}
}
});
if(_f){
_c.children=_f;
}
return _c;
}};
return _2;
});
