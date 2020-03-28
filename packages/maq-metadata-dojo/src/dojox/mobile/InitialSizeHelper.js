//>>built
define("maq-metadata-dojo/dojox/mobile/InitialSizeHelper",["dojo/_base/declare"],function(_1){
return _1([],{initialSize:function(_2){
if(_2&&_2.position){
if(_2.size&&typeof _2.size.w=="number"){
return {w:_2.size.w};
}else{
return {w:300};
}
}
}});
});
