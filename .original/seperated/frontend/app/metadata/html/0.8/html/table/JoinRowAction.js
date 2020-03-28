//>>built
define("maq-metadata-html/html/table/JoinRowAction",["dojo/_base/declare","./_TableAction","davinci/commands/CompoundCommand","davinci/ve/commands/ReparentCommand","davinci/ve/commands/ModifyCommand","davinci/ve/commands/RemoveCommand","davinci/ve/widget","./TableMatrix"],function(_1,_2,_3,_4,_5,_6,_7,_8){
return _1(_2,{name:"joinRow",iconClass:"editActionIcon editJoinRowIcon",run:function(_9){
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
var rs=_b.getRowSpan(_a);
var nr=_e.r+rs;
if(nr>=_c.length){
return;
}
var nc=_e.c+_b.getColSpan(_a);
var _f=new _3();
var _10=undefined;
var _11=undefined;
for(var c=_e.c;c<nc;c++){
var _12=_d[nr][c];
if(!_12){
continue;
}
if(c>0&&_d[nr][c-1]==_12){
return;
}
var _13=_b.getColSpan(_12);
if(c+_13>nc){
return;
}
var _14=_b.getRowSpan(_12);
_10=davinci.ve.widget.byNode(_12);
if(_14>1&&nr+1<_c.length){
_11={rowspan:_14-1};
_f.add(new _5(_10,_11));
var _15=_7.byNode(_c[nr+1]);
var _16=_b.getNextCell(nr+1,c+_13);
var _17=(_16?_7.byNode(_16):undefined);
_f.add(new _4(_10,_15,_17));
}else{
var _15=_7.byNode(_a);
dojo.forEach(_7.getChildren(_10),function(w){
_f.add(new _4(w,_15));
});
_f.add(new _6(_10));
}
c+=(_13-1);
}
_10=_7.byNode(_a);
_11={rowspan:rs+1};
_f.add(new _5(_10,_11));
_9.getCommandStack().execute(_f);
}});
});
