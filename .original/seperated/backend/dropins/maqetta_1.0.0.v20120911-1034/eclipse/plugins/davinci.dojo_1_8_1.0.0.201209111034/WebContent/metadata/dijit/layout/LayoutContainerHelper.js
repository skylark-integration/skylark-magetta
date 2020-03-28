//>>built
define("maq-metadata-dojo/dijit/layout/LayoutContainerHelper",["dojo/_base/declare"],function(_1){
return _1(null,{_fillBodyAsOnlyChild:false,initialSize:function(_2){
var _3=null;
if(_2&&!_2.position&&!_2.size){
_3={w:"100%",h:"300px"};
var _4=_2.parent;
var _5=_4.type;
var _6=_4.getData().children;
if(_4.type){
if(_5=="html.body"){
if(!_6||_6.length){
_3={w:"100%",h:this._fillBodyAsOnlyChild?"100%":"300px"};
}
}else{
if(_5=="dijit.layout.ContentPane"||_5=="html.div"||_5=="html.form"||_5=="html.fieldset"){
if(!_6||!_6.length){
_3={w:"100%",h:"100%"};
}
}
}
}
}
return _3;
}});
});
