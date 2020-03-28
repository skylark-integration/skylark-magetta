//>>built
define("maq-metadata-html/html/table/RemoveRowAction",["dojo/_base/declare","./_TableAction","davinci/commands/CompoundCommand","davinci/ve/commands/RemoveCommand","davinci/ve/commands/ModifyCommand","davinci/ve/commands/ReparentCommand","davinci/ve/widget","./TableMatrix"],function(_1,_2,_3,_4,_5,_6,_7,_8){
return _1(_2,{name:"removeRow",iconClass:"editActionIcon editRemoveRowIcon",_isEnabled:function(_9){
var _a=_9.nodeName.toLowerCase();
return _a=="td"||_a=="th"||_a=="tr";
},run:function(_b){
_b=this.fixupContext(_b);
if(!_b){
return;
}
var _c=this._getCell(_b);
if(!_c){
return;
}
var _d=new _8(_c);
var _e=_d.rows;
var _f=_d.cells;
if(_c.nodeName.toLowerCase()=="tr"){
var _10=_e.indexOf(_c);
_c=_f[_10][0];
}
var pos=_d.getPos(_c);
var r=pos.r;
var _11=_f[r];
var _12=new _3();
var _13=undefined;
for(var c=0;c<_11.length;c++){
var _14=_11[c];
var _15=_d.getRowSpan(_14);
var _16=_d.getColSpan(_14);
if(_15>1){
_13=_7.byNode(_14);
var _17={rowspan:_15-1};
_12.add(new _5(_13,_17));
if(_d.getPos(_14).r==r&&r+1<_e.length){
var _18=_7.byNode(_e[r+1]);
var _19=_d.getNextCell(r+1,c+_16);
var _1a=(_19?_7.byNode(_19):undefined);
_12.add(new _6(_13,_18,_1a));
}
}
c+=(_16-1);
}
_13=_7.byNode(_e[r]);
_12.add(new _4(_13));
_b.getCommandStack().execute(_12);
}});
});
