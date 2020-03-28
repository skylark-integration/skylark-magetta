//>>built
define("maq-metadata-html/html/table/SplitColumnAction",["dojo/_base/declare","./_TableAction","davinci/commands/CompoundCommand","davinci/ve/commands/ModifyCommand","davinci/ve/commands/AddCommand","davinci/ve/widget","./TableMatrix"],function(_1,_2,_3,_4,_5,_6,_7){
return _1(_2,{name:"splitColumn",iconClass:"editActionIcon editSplitColumnIcon",run:function(_8){
_8=this.fixupContext(_8);
if(!_8){
return;
}
var _9=this._getCell(_8);
if(!_9){
return;
}
var _a=new _7(_9);
var _b=_a.rows;
var _c=_a.cells;
var _d=_a.getPos(_9);
var cs=_a.getColSpan(_9);
var rs=_a.getRowSpan(_9);
var _e=new _3();
var _f=undefined;
if(cs>1){
var _10=_6.byNode(_9);
_f={colspan:cs-1};
_e.add(new _4(_10,_f));
}else{
for(var r=0;r<_b.length;r++){
if(r==_d.r){
r+=(rs-1);
continue;
}
var _11=_c[r][_d.c];
var _10=_6.byNode(_11);
_f={colspan:_a.getColSpan(_11)+1};
_e.add(new _4(_10,_f));
r+=(_a.getRowSpan(_11)-1);
}
}
var _12=_7.createTableCellData();
if(rs>1){
_12.properties={rowspan:rs};
}
var _13=_6.byNode(_b[_d.r]);
var _14=_a.getNextCell(_d.r,_d.c+cs);
var _15=(_14?_6.byNode(_14):undefined);
_e.add(new _5(_12,_13,_15));
_8.getCommandStack().execute(_e);
}});
});
