//>>built
define("maq-metadata-dojo/dijit/layout/BorderContainerHelper",["dojo/_base/declare","dojo/_base/array","dojo/_base/connect","./LayoutContainerHelper"],function(_1,_2,_3,_4){
return _1(_4,{constructor:function(){
this._fillBodyAsOnlyChild=true;
},create:function(_5,_6){
_3.connect(_5.dijitWidget,"_layoutChildren",_6,function(_7,_8){
if(_8===undefined){
return;
}
var _9,_a=/left|right|leading|trailing/.test(_7);
if(!_a){
_2.some(this.children,function(_b){
if(_b.getAttribute("id")===_7){
_7=_b.getAttribute("region");
_a=/left|right|leading|trailing/.test(_7);
return true;
}
});
}
if(_2.some(this.children,function(_c){
_9=_c;
return _c.getAttribute&&_c.getAttribute("region")==_7;
})){
var _d=_9.getAttribute(_d),_e=(_a?"width":"height"),_f=_8+"px",_10;
_d=_2.map((_d||"").split(";"),function(_11){
var key=_11.split(":");
if(key[0]==_e){
_10=true;
_11=_e+":"+_f;
}
return _11;
}).join(";");
if(!_10){
_d+=_e+":"+_f+";";
}
_9.setAttribute("style",_d);
}
var _12=_5._edit_context.getSelection();
if(_12&&_12.length){
_5._edit_context.select(_12[0]);
}
});
}});
});
