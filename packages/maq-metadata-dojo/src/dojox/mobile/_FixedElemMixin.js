//>>built
define("maq-metadata-dojo/dojox/mobile/_FixedElemMixin",function(){
var _1=function(){
};
_1.prototype={getPropertyValue:function(_2,_3){
if(_3==="fixed"){
var _4=_2._srcElement._getAttribute(_3);
return _4&&_4.value||"";
}
return _2._getPropertyValue(_3);
}};
return _1;
});
