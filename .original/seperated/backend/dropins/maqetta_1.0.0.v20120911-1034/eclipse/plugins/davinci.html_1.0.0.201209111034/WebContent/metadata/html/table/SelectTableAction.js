//>>built
define("maq-metadata-html/html/table/SelectTableAction",["dojo/_base/declare","./_TableAction","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/ModifyCommand","davinci/ve/widget","./TableMatrix"],function(_1,_2,_3,_4,_5,_6,_7){
return _1(_2,{name:"selectColumn",iconClass:"editActionIcon editSelectTableIcon",run:function(_8){
_8=this.fixupContext(_8);
if(!_8){
return;
}
var _9=this._getCell(_8);
if(!_9){
return;
}
var _a=new _7(_9);
var _b=_a.table;
if(_b){
_8.select(_b._dvWidget);
}else{
console.error("SelectTableAction: could not find <table> element associated with the selection");
}
}});
});
