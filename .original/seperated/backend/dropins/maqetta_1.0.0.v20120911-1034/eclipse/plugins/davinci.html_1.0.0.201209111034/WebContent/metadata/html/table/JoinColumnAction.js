//>>built
define("maq-metadata-html/html/table/JoinColumnAction",["dojo/_base/declare","./_TableAction","davinci/commands/CompoundCommand","davinci/ve/commands/ReparentCommand","davinci/ve/commands/ModifyCommand","davinci/ve/commands/RemoveCommand","davinci/ve/widget","./TableMatrix"],function(_1,_2,_3,_4,_5,_6,_7,_8){
return _1(_2,{name:"joinColumn",iconClass:"editActionIcon editJoinColumnIcon",run:function(_9){
_9=this.fixupContext(_9);
if(!_9){
return;
}
var _a=this._getCell(_9);
if(!_a){
return;
}
var _b=new _8(_a);
var _c=_b.rows;
var _d=_b.cells;
var _e=_b.getPos(_a);
var cs=_b.getColSpan(_a);
var nc=_e.c+cs;
if(nc>=_d[_e.r].length){
return;
}
var nr=_e.r+_b.getRowSpan(_a);
if(nr>_c.length){
nr=_c.length;
}
var _f=new _3();
var _10=undefined;
var _11=_7.byNode(_a);
var _12=undefined;
for(var r=_e.r;r<nr;r++){
var _13=_d[r][nc];
if(!_13){
continue;
}
if(r>0&&_d[r-1][nc]==_13){
return;
}
var _14=_b.getRowSpan(_13);
if(r+_14>nr){
return;
}
var _15=_b.getColSpan(_13);
_10=_7.byNode(_13);
if(_15>1){
_12={colspan:_15-1};
_f.add(new _5(_10,_12));
}else{
dojo.forEach(_7.getChildren(_10),function(w){
_f.add(new _4(w,_11));
});
_f.add(new _6(_10));
}
r+=(_14-1);
}
_10=_11;
_12={colspan:cs+1};
_f.add(new _5(_10,_12));
_9.getCommandStack().execute(_f);
}});
});
