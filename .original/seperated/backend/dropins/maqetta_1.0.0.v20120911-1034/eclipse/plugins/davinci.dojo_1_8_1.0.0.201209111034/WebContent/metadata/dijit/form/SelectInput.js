//>>built
define("maq-metadata-dojo/dijit/form/SelectInput",["dojo/_base/declare","./OptionsInput","dojo/i18n!../nls/dijit"],function(_1,_2,_3){
return _1(_2,{supportsHTML:"false",helpText:"",constructor:function(){
this.helpText=_3.selectInputHelp;
},getProperties:function(_4,_5){
var _6=_4.attr("value");
var _7;
for(var i=0;i<_5.length;i++){
var _8=_5[i];
if(_8.selected){
_7=_8.text;
break;
}else{
if(_8.text==_6){
_7=_6;
}
}
}
return {value:_7};
}});
});
