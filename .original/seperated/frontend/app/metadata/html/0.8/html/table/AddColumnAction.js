//>>built
define("maq-metadata-html/html/table/AddColumnAction",["dojo/_base/declare","./_TableAction","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/ModifyCommand","davinci/ve/widget","./TableMatrix"],function(_1,_2,_3,_4,_5,_6,_7){
return _1(_2,{name:"addColumn",iconClass:"editActionIcon editAddColumnIcon",_insertAfter:true,_isEnabled:function(_8){
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
if(this._insertAfter){
c=c+_c.getColSpan(_b)-1;
}
var _10=new _3();
for(var r=0;r<_d.length;r++){
var _11=_e[r];
var _12=_11[c];
var _13=null;
if(this._insertAfter){
_13=_11[c+1];
}else{
_13=_11[c-1];
}
if(_12&&_13==_12){
var _14=_6.byNode(_12);
var _15={colspan:_c.getColSpan(_12)+1};
_10.add(new _5(_14,_15));
r+=(_c.getRowSpan(_12)-1);
}else{
var _16=_7.createTableCellData(_a);
var _17=_6.byNode(_d[r]);
var _18=c;
if(this._insertAfter){
_18=_18+1;
}
var _19=_c.getNextCell(r,_18);
var _1a=(_19?_6.byNode(_19):undefined);
_10.add(new _4(_16,_17,_1a));
}
}
if(_c.colgroup){
var _1b=_c.getColElement(pos.c);
if(_1b){
var _1c=null;
if(this._insertAfter){
_1c=_c.getColElement(pos.c+1);
}else{
_1c=_c.getColElement(pos.c-1);
}
if(_1c==_1b){
var _14=_6.byNode(_1b);
var _15={span:_c.getSpan(_1b)+1};
_10.add(new _5(_14,_15));
}else{
var _1d=_c.cols.indexOf(_1b);
if(this._insertAfter){
_1d++;
}
var _1e=_7.createTableColData(_a);
_10.add(new _4(_1e,_c.colgroup,_1d));
}
}else{
console.error("AddColumnAction: could not find <col> element associated with the selection");
}
}else{
console.error("AddColumnAction: could not find <colgroup> element associated with the selection.");
}
_a.getCommandStack().execute(_10);
}});
});
