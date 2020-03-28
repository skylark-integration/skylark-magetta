//>>built
define("maq-metadata-html/html/table/TableCellInput",["dojo/_base/declare","davinci/ve/input/SmartInput"],function(_1,_2){
return _1(_2,{property:"textContent",displayOnCreate:"false",constructor:function(){
},serialize:function(_3,_4,_5){
var _6=_5;
if(_5.trim()=="&nbsp;"){
_6="";
}
_4(_6);
},parse:function(_7){
var _8=_7;
if(_7.trim()==""){
_8="&nbsp;";
}
return _8;
}});
});
