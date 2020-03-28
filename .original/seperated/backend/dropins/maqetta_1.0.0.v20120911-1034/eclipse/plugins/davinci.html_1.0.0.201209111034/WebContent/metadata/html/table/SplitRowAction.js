//>>built
define("maq-metadata-html/html/table/SplitRowAction",["dojo/_base/declare","./_TableAction","davinci/commands/CompoundCommand","davinci/ve/commands/ModifyCommand","davinci/ve/commands/AddCommand","davinci/ve/widget","./TableMatrix"],function(_1,_2,_3,_4,_5,_6,_7){
return _1(_2,{name:"splitRow",iconClass:"editActionIcon editSplitRowIcon",run:function(_8){
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
var _f=_7.createTableCellData();
if(cs>1){
_f.properties={colspan:cs};
}
if(rs>1&&_d.r+rs<=_b.length){
var _10=_6.byNode(_9);
var _11={rowspan:rs-1};
_e.add(new _4(_10,_11));
var r=_d.r+rs-1;
var _12=_6.byNode(_b[r]);
var _13=_a.getNextCell(r,_d.c+cs);
var _14=(_13?_6.byNode(_13):undefined);
_e.add(new _5(_f,_12,_14));
}else{
_f=_7.createTableRowData();
var _12=_6.byNode(_b[_d.r].parentNode);
var _14=(_d.r+rs<_b.length?_6.byNode(_b[_d.r+rs]):undefined);
_e.add(new _5(_f,_12,_14));
var _15=_c[_d.r];
for(var c=0;c<_15.length;c++){
if(c==_d.c){
c+=(cs-1);
continue;
}
var _16=_15[c];
var _10=_6.byNode(_16);
var _11={rowspan:_a.getRowSpan(_16)+1};
_e.add(new _4(_10,_11));
c+=(_a.getColSpan(_16)-1);
}
}
_8.getCommandStack().execute(_e);
}});
});
