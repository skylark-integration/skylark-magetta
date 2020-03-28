//>>built
define("maq-metadata-html/html/table/RemoveColumnAction",["dojo/_base/declare","./_TableAction","davinci/commands/CompoundCommand","davinci/ve/commands/RemoveCommand","davinci/ve/commands/ModifyCommand","davinci/ve/widget","./TableMatrix"],function(_1,_2,_3,_4,_5,_6,_7){
return _1(_2,{name:"removeColumn",iconClass:"editActionIcon editRemoveColumnIcon",_isEnabled:function(_8){
var _9=_8.nodeName.toLowerCase();
return _9=="td"||_9=="th"||_9=="col";
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
var _d=_c.rows;
var _e=_c.cells;
if(_b.nodeName.toLowerCase()=="col"){
var _f=_c.getAdjustedColIndex(_b);
_b=_e[0][_f];
}
var pos=_c.getPos(_b);
var c=pos.c;
var _10=new _3();
for(var r=0;r<_d.length;r++){
var _11=_e[r];
var _12=_11[c];
var _13=_6.byNode(_12);
var _14=_c.getColSpan(_12);
if(_14>1){
var _15={colspan:_14-1};
_10.add(new _5(_13,_15));
}else{
_10.add(new _4(_13));
}
r+=(_c.getRowSpan(_12)-1);
}
if(_c.colgroup){
var _16=_c.getColElement(pos.c);
if(_16){
var _13=_6.byNode(_16);
var _17=_c.getSpan(_16);
if(_17>1){
var _15={span:_17-1};
_10.add(new _5(_13,_15));
}else{
_10.add(new _4(_13));
}
}else{
console.error("RemoveColumnAction: could not find <col> element associated with the selection");
}
}
_a.getCommandStack().execute(_10);
}});
});
