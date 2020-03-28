//>>built
define("maq-metadata-html/html/table/AddRowAction",["dojo/_base/declare","./_TableAction","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/ModifyCommand","davinci/ve/widget","./TableMatrix"],function(_1,_2,_3,_4,_5,_6,_7){
return _1(_2,{name:"addRow",iconClass:"editActionIcon editAddRowIcon",_insertAfter:true,_isEnabled:function(_8){
var _9=_8.nodeName.toLowerCase();
return _9=="td"||_9=="th"||_9=="tr";
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
if(_b.nodeName.toLowerCase()=="tr"){
var _f=_d.indexOf(_b);
_b=_e[_f][0];
}
var pos=_c.getPos(_b);
var r=pos.r;
if(this._insertAfter){
r+=_c.getRowSpan(_b)-1;
if(r>=_d.length){
r=_d.length-1;
}
}
var _10=_e[r];
var _11=null;
if(this._insertAfter){
_11=_e[r+1];
}else{
_11=_e[r-1];
}
var _12=new _3();
var _13=_7.createTableRowData(_a);
for(var c=0;c<_10.length;c++){
var _14=_10[c];
if(_11&&_11[c]==_14){
var _15=_6.byNode(_14);
var _16={rowspan:_c.getRowSpan(_14)+1};
_12.add(new _5(_15,_16));
c+=(_c.getColSpan(_14)-1);
}else{
_13.children.push(_7.createTableCellData(_a));
}
}
var _17=_6.byNode(_d[r].parentNode);
var _18=r;
if(this._insertAfter){
_18=r+1;
}
_12.add(new _4(_13,_17,_18));
_a.getCommandStack().execute(_12);
}});
});
