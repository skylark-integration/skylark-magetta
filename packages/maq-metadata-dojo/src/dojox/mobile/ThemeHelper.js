//>>built
define("maq-metadata-dojo/dojox/mobile/ThemeHelper",["dojo/_base/array","dojo/dom-style","davinci/model/Path","davinci/html/HTMLElement","davinci/html/HTMLText","davinci/Theme","dojo/_base/sniff"],function(_1,_2,_3,_4,_5,_6,_7){
return {onContentChange:function(_8,_9){
if(!_8||!_8.editor||!_8.editor.isActiveEditor()){
return;
}
var _a,_b;
if(_8&&_8.rootNode){
_a=_8.rootNode.ownerDocument;
}
if(_9){
_b=_9.useBodyFontBackgroundClass;
}
if(_a&&_b){
var _c=_a.querySelectorAll("."+_b);
var _d=_a.body;
if(_c.length>0){
var _e=["backgroundAttachment","backgroundClip","backgroundColor","backgroundImage","backgroundOrigin","backgroundPosition","backgroundRepeat","backgroundSize","color","fontFamily","fontSize","fontStyle","fontWeight","fontVariant"];
setTimeout(function(){
var _f=_2.get(_d);
for(var i=0;i<_c.length;i++){
var _10=_c[i].style;
_e.forEach(function(_11){
_10[_11]=_f[_11];
});
}
},50);
}
}
}};
});
