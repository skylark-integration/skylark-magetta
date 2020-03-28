//>>built
define("maq-metadata-dojo/dijit/form/DataListHelper",function(){
var _1=function(){
};
_1.prototype={getChildrenData:function(_2,_3){
if(!_2){
return undefined;
}
var _4=[];
if(_2.dijitWidget&&_2.dijitWidget.data){
var _5=_2.dijitWidget.data;
for(var i=0;i<_5.length;i++){
var _6=_5[i].name;
var _7=_5[i].value;
_4.push({type:"html.option",properties:{value:_7},children:_6});
}
}else{
if(_2.domNode.options){
dojo.forEach(_2.domNode.options,function(o){
var p={value:o.value};
var c=o.innerHTML;
_4.push({type:"html.option",properties:p,children:c});
});
}
}
return _4;
},getData:function(_8,_9){
var _a=_8._getData(_9);
_a.properties["data-dojo-props"]="id: \""+_8.id+"\"";
_a.properties.dojotype="dijit.form.DataList";
return _a;
},getChildren:function(_b,_c){
var _d=[];
return _d;
},startup:function(_e,_f){
},create:function(_10,_11){
if(_10.dijitWidget){
_10.dijitWidget.getChildren=this.getChildren;
_10.dijitWidget.startup=this.startup;
}
_10.domNode.style.display="none";
},destroy:function(_12){
var _13=_12.getContext().getDijit();
var w=_13.byId(_12.id);
w.destroy();
}};
return _1;
});
