//>>built
define("maq-metadata-dojo/dijit/form/SelectHelper",function(){
var _1=function(){
};
_1.prototype={getChildrenData:function(_2,_3){
var _4=_2;
_2=_4&&_4.dijitWidget;
if(!_2){
return undefined;
}
var _5=[];
var _6=_2.store;
if(_6){
if(!_4.getObjectId(_6)&&_6.declaredClass=="dijit.form.DataList"){
var _7=_6.query(function(){
return true;
},{ignoreCase:true});
for(var i=0;i<_7.length;i++){
var _8=_6.getValue(_7[i],"name");
var _9=_6.getValue(_7[i],"value");
_5.push({type:"html.option",properties:{value:_9},children:_8});
}
}
}else{
var _a=(_2.getValue()||[]);
if(_2.options){
dojo.forEach(_2.options,function(o){
var p={value:o.value};
var c=o.label;
if(dojo.indexOf(_a,(p.value||c))>=0){
p.selected=true;
}
_5.push({type:"html.option",properties:p,children:c});
});
}else{
if(_2.containerNode){
dojo.query("option",_2.containerNode).forEach(function(n){
var p={value:n.value};
var c=n.innerHTML;
if(dojo.indexOf(_a,(p.value||c))>=0){
p.selected=true;
}
_5.push({type:"html.option",properties:p,children:c});
});
}
}
}
return _5;
}};
return _1;
});
