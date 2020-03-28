//>>built
define("maq-metadata-html/html/table/TableMatrix",["dojo/_base/declare","davinci/ve/utils/GeomUtils"],function(_1,_2){
createTableBodyData=function(_3){
var _4={type:"html.tbody",context:_3,children:[]};
return _4;
};
createTableColGroupData=function(_5){
var _6={type:"html.colgroup",context:_5,children:[]};
return _6;
};
createTableColData=function(_7){
var _8={type:"html.col",context:_7};
return _8;
};
createTableRowData=function(_9){
var _a={type:"html.tr",context:_9,children:[]};
return _a;
};
createTableCellData=function(_b){
var _c={type:"html.td",context:_b,children:"&nbsp;"};
return _c;
};
createTableHeaderData=function(_d){
var _e={type:"html.th",context:_d,children:"&nbsp;"};
return _e;
};
var _f=_1(null,{table:null,tbody:null,colgroup:null,cols:null,rows:null,cells:null,constructor:function(_10){
var _11=undefined;
while(_10){
if(_10.nodeType===1&&_10.nodeName.toLowerCase()=="table"){
_11=this.table=_10;
break;
}
_10=_10.parentNode;
}
this.rows=[];
_10=_11.firstChild;
while(_10){
if(_10.nodeType===1){
var _12=_10.nodeName.toLowerCase();
if(_12=="colgroup"){
this.colgroup=_10;
}else{
if(_12=="tbody"){
this.tbody=_10;
_10=_10.firstChild;
continue;
}else{
if(_12=="tr"){
this.rows.push(_10);
}
}
}
}
_10=_10.nextSibling;
}
this.cells=[];
for(var r=0;r<this.rows.length;r++){
if(!this.cells[r]){
this.cells[r]=[];
}
var _13=this.cells[r];
var c=0;
for(_10=this.rows[r].firstChild;_10;_10=_10.nextSibling){
if(_10.nodeType!==1){
continue;
}
var _12=_10.nodeName.toLowerCase();
if(_12!="td"&&_12!="th"){
continue;
}
while(_13[c]){
c++;
}
var _14=this.getColSpan(_10);
var _15=this.getRowSpan(_10);
while(_14>0){
_13[c]=_10;
for(var i=1;i<_15&&r+i<this.rows.length;i++){
if(!this.cells[r+i]){
this.cells[r+i]=[];
}
this.cells[r+i][c]=_10;
}
c++;
_14--;
}
}
}
if(this.colgroup){
this.cols=[];
_10=this.colgroup.firstChild;
while(_10){
var _12=_10.nodeName.toLowerCase();
if(_12=="col"){
this.cols.push(_10);
}
_10=_10.nextSibling;
}
}
},getNumRows:function(){
return this.rows.length;
},getNumCols:function(){
if(this.cells.length){
return this.cells[0].length;
}
return 0;
},getCell:function(r,c){
return this.cells[r][c];
},getNextCell:function(r,c){
var row=this.rows[r];
var _16=this.cells[r];
var _17=_16[c];
while(_17&&_17.parentNode!=row){
c++;
_17=_16[c];
}
return _17;
},getPos:function(_18){
var row=_18.parentNode;
for(var r=0;r<this.rows.length;r++){
if(this.rows[r]==row){
var _19=this.cells[r];
for(var c=0;c<_19.length;c++){
if(_19[c]==_18){
return {r:r,c:c};
}
}
return undefined;
}
}
return undefined;
},getColSpan:function(_1a){
var _1b=_1a.getAttribute("colspan");
return (_1b?parseInt(_1b):1);
},getRowSpan:function(_1c){
var _1d=_1c.getAttribute("rowspan");
return (_1d?parseInt(_1d):1);
},getSpan:function(col){
var _1e=col.getAttribute("span");
return (_1e?parseInt(_1e):1);
},getColElement:function(_1f){
var _20=null;
if(_1f>=0){
if(this.colgroup){
var _21=0;
dojo.some(this.cols,function(col){
_21+=this.getSpan(col);
if(_1f<=_21-1){
_20=col;
return true;
}
}.bind(this));
}
}
return _20;
},getAdjustedColIndex:function(_22){
var _23=-1;
if(this.colgroup){
var _24=0;
dojo.some(this.cols,function(col){
if(col==_22){
_23=_24;
return true;
}
_24+=this.getSpan(col);
}.bind(this));
}
return _23;
},getMarginBoxPageCoordsForColumns:function(_25,_26){
var _27=this.rows;
var _28=this.cells;
var _29=null;
for(var _2a=0;_2a<_26;_2a++){
var _2b=_29?_29.w:0;
for(var _2c=0;_2c<_27.length;_2c++){
var _2d=_28[_2c][_25+_2a];
var _2e=_2.getMarginBoxPageCoords(_2d);
if(_29){
_29.w=Math.max(_29.w,_2b+_2e.w);
}else{
_29=_2e;
}
}
var _2f=_2.getMarginBoxPageCoords(this.tbody);
_29.h=_2f.h;
_29.t=_2f.t;
}
return _29;
},isFirstRowHeader:function(){
var _30=false;
if(this.rows.length>0){
var _31=this.cells[0];
dojo.some(_31,function(col){
if(col.nodeName.toLowerCase()==="th"){
_30=true;
}else{
_30=false;
return true;
}
});
}
return _30;
}});
_f.createTableBodyData=createTableBodyData;
_f.createTableColGroupData=createTableColGroupData;
_f.createTableColData=createTableColData;
_f.createTableRowData=createTableRowData;
_f.createTableCellData=createTableCellData;
_f.createTableHeaderData=createTableHeaderData;
return _f;
});
