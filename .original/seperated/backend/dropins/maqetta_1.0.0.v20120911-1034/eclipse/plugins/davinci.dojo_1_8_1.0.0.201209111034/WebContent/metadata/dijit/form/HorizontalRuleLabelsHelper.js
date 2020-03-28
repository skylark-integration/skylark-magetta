//>>built
define("maq-metadata-dojo/dijit/form/HorizontalRuleLabelsHelper",["dojo/_base/declare"],function(_1){
var _2=function(){
};
_2.prototype={preProcessData:function(_3){
if(_3.properties.labels){
if(typeof _3.properties.labels=="string"){
var _4=dojo.trim(_3.properties.labels);
var _5=_4.split(",");
_3.properties.labels=_5;
_3.properties.count=_5.length;
_3.properties.numericMargin=0;
}else{
if(_3.properties.count&&_3.properties.labels.length!=parseInt(_3.properties.count,10)||_3.properties.numericMargin){
if(parseInt(_3.properties.count,10)>1){
delete _3.properties.labels;
}else{
_3.properties.labels=new Array("50%");
}
}
}
}
return _3;
}};
return _2;
});
