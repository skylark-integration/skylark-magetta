//>>built
define("maq-metadata-dojo/dojox/grid/GridHelper",["davinci/ve/widget"],function(_1){
var _2=function(){
};
_2.prototype={getData:function(_3,_4){
if(!_3){
return undefined;
}
var _5=_1._getData(_3,_4);
if(_5&&_4&&_4.serialize&&_3.structure){
var _6="this.setStructure("+this._serializeStructure(_3.structure)+");";
if(_5.scripts){
if(!dojo.some(_5.scripts,function(s){
if(s.type=="dojo/method"&&!s.name&&s.value&&s.value.substring(0,18)=="this.setStructure("){
s.value=_6;
return true;
}
return false;
})){
_5.scripts.push({type:"dojo/method",value:_6});
}
}else{
_5.scripts=[{type:"dojo/method",value:_6}];
}
}
return _5;
},_serializeStructure:function(_7){
if(!_7){
return undefined;
}
var _8;
try{
_8=_7[0].cells[0];
}
catch(e){
}
if(!_8){
return undefined;
}
var s="";
dojo.forEach(_8,function(c){
var cs="";
var _9=c.field;
if(_9||_9===0){
cs+="field: "+(dojo.isString(_9)?"\""+_9+"\"":_9);
}
var _a=c.name;
if(_a){
if(cs){
cs+=", ";
}
cs+="name: \""+_a+"\"";
}
var _b=c.width;
if(_b){
if(cs){
cs+=", ";
}
cs+="width: "+(dojo.isString(_b)?"\""+_b+"\"":_b);
}
var _c=c.editor;
if(_c){
if(cs){
cs+=", ";
}
if(_c==dojox.grid.editors.Input){
cs+="editor: dojox.grid.editors.Input";
}else{
if(_c==dojox.grid.editors.Bool){
cs+="editor: dojox.grid.editors.Bool";
}else{
if(_c==dojox.grid.editors.Select){
cs+="editor: dojox.grid.editors.Select";
var _d=c.options;
if(_d){
cs+=", options: "+dojo.toJson(_d);
}
}
}
}
}
if(s){
s+=", ";
}
s+="{"+cs+"}";
});
return "[{cells: [["+s+"]]}]";
}};
return _2;
});
