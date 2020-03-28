//>>built
define("maq-metadata-html/html/table/SelectColumnAction",["dojo/_base/declare","./_TableAction","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/ModifyCommand","davinci/ve/widget","./TableMatrix"],function(_1,_2,_3,_4,_5,_6,_7){
return _1(_2,{name:"selectColumn",iconClass:"editActionIcon editSelectColumnIcon",_isEnabled:function(_8){
var _9=_8.nodeName.toLowerCase();
return _9=="td"||_9=="th";
},run:function(_a){
_a=this.fixupContext(_a);
if(!_a){
return;
}
var _b=this._getCell(_a);
if(!_b){
return;
}
var _c=new _7(_b);
var _d=_c.getPos(_b);
var _e=_c.getColElement(_d.c);
if(_e){
_a.select(_e._dvWidget);
}else{
console.error("SelectColumnAction: could not find <col> element associated with the selection");
}
}});
});
