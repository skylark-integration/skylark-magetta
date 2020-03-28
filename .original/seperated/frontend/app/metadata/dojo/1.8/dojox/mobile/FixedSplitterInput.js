//>>built
require({cache:{"url:maq-metadata-dojo/dojox/mobile/templates/fixedSplitterInput.html":"<div>\n  <div>\n    ${dojoxNLS.fixedSpliterInputOrientation}\n    <input id=\"orientationH\" name=\"orientation\" data-dojo-type=\"dijit/form/RadioButton\" data-dojo-attach-point=\"orientationHRadioButton\" data-dojo-attach-event=\"onChange:_onChangeRadioButton\" style=\"margin-left: 20px\"/><label for=\"orientationH\">${dojoxNLS.fixedSpliterInputHorizontal}</label>\n    <input id=\"orientationV\" name=\"orientation\" data-dojo-type=\"dijit/form/RadioButton\" data-dojo-attach-point=\"orientationVRadioButton\" data-dojo-attach-event=\"onChange:_onChangeRadioButton\" style=\"margin-left: 10px\"/><label for=\"orientationV\">${dojoxNLS.fixedSpliterInputVertical}</label>\n  </div>\n\t<div data-dojo-attach-point=\"rows\" style=\"display: table; width: 100%\"></div>\n</div>\n","url:maq-metadata-dojo/dojox/mobile/templates/fixedSplitterInputRow.html":"<div class=\"inputRow\" style=\"display: table-row; width: 100%;\">\n  <div style=\"display: table-cell; padding-top: 10px\">\n    <div style=\"padding-bottom: 5px;\" dojoAttachPoint=\"propertyContainer\"></div>\n    <div>\n    \t<input data-dojo-type=\"dijit.form.TextBox\" data-dojo-attach-point=\"textBox\" data-dojo-props=\"intermediateChanges: true\" data-dojo-attach-event=\"onChange:_onChangeTextbox\"/>\n    \t<span style=\"margin-left: 20px; margin-right: 20px\">${dojoxNLS.fixedSpliterInputOr}</span>\n    \t<input name=\"useRemaingingSpace\" data-dojo-type=\"dijit/form/RadioButton\" data-dojo-attach-point=\"useRemaingingSpace\" data-dojo-attach-event=\"onChange:_onChangeCheckbox\"/><label for=\"useRemaingingSpace\">${dojoxNLS.fixedSpliterInputRemaining}</label>\n    </div>\n  </div>\n  <div style=\"display: table-cell; vertical-align: middle; text-align: right; padding-top: 10px\">\n  \t<input data-dojo-type=\"dijit.form.Button\" label=\"+\" data-dojo-attach-event=\"onClick:_onAddRow\"/>\n  \t<input data-dojo-type=\"dijit.form.Button\" label=\"-\" data-dojo-attach-event=\"onClick:_onRemoveRow\"/>\n  </div>\n</div>\n"}});
define("maq-metadata-dojo/dojox/mobile/FixedSplitterInput",["dojo/_base/declare","dojo/_base/lang","dojo/dom-construct","dojo/query","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","davinci/ve/widget","davinci/ve/input/SmartInput","davinci/ui/Dialog","davinci/ve/commands/ModifyCommand","davinci/html/CSSParser","dojo/text!./templates/fixedSplitterInput.html","dojo/text!./templates/fixedSplitterInputRow.html","dojo/i18n!dijit/nls/common","dojo/i18n!../../dojox/nls/dojox","dijit/form/RadioButton"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10){
var _11=_1([_5,_6,_7],{templateString:_d,dojoxNLS:_10,data:null,postCreate:function(){
if(this.data){
var _12=this.data.properties.orientation;
if(_12=="V"){
this.orientationVRadioButton.set("checked",true);
}else{
this.orientationHRadioButton.set("checked",true);
}
dojo.forEach(this.data.children,_2.hitch(this,function(_13){
this._addRow(_13);
}));
}
},_onChangeRadioButton:function(e){
var _14;
if(this.orientationHRadioButton.get("checked")){
_14="H";
}else{
_14="V";
}
dojo.forEach(dojo.query(".inputRow",this.rows),function(_15){
var d=dijit.byNode(_15);
if(d){
d.setOrientation(_14);
}
});
},_addRow:function(_16,_17,pos){
var div=document.createElement("div");
if(_17){
_3.place(div,_17,pos);
}else{
_3.place(div,this.rows);
}
new _18({data:_16,orientation:this.data.properties.orientation,onAddRow:_2.hitch(this,"_onAddRow"),onRemoveRow:_2.hitch(this,"_onRemoveRow")},div);
},_onAddRow:function(_19){
var _1a=_4(".inputRow",this.rows);
var pos;
for(var i=0;i<_1a.length;i++){
if(_1a[i]==_19.domNode){
pos=i;
}
}
if((pos+1)<_1a.length){
this._addRow({},_1a[pos],"after");
}else{
this._addRow({});
}
},_onRemoveRow:function(_1b){
var _1c=_4(".inputRow",this.rows);
if(_1c.length>2){
_1b.destroyRecursive();
delete _1b;
}
},getValue:function(){
var _1d={properties:this.data.properties,children:[]};
if(this.orientationHRadioButton.get("checked")){
orientation="H";
}else{
orientation="V";
}
_1d.properties.orientation=orientation;
delete _1d.properties.variablePane;
if(_1d.properties.isTempID){
delete _1d.properties.id;
}
var _1e=_4(".inputRow",this.rows);
var idx=0;
dojo.forEach(_1e,function(_1f){
_1d.children.push(dijit.byNode(_1f).getValue());
if(dijit.byNode(_1f).getUsingRemainingSpace()){
_1d.properties.variablePane=idx;
}
idx++;
});
return _1d;
}});
var _18=_1([_5,_6,_7],{templateString:_e,dojoxNLS:_10,data:null,orientation:null,postCreate:function(){
this._buildOrientation();
if(this.data&&this.data.properties){
var _20=false;
if(this.data.properties.style){
var _21=_c.parse(".foo{"+this.data.properties.style+"}");
if(_21.model){
dojo.forEach(_21.model[0].children,dojo.hitch(this,function(_22){
if(_22.name=="width"&&this.orientation=="H"){
this.textBox.set("value",_22.value);
_20=true;
}else{
if(_22.name=="height"&&this.orientation=="V"){
this.textBox.set("value",_22.value);
_20=true;
}
}
}));
}
}
if(!_20){
this.useRemaingingSpace.set("checked",true);
}
}
},_buildOrientation:function(){
this.propertyContainer.innerHTML=this.orientation=="V"?_10.fixedSpliterInputHeight:_10.fixedSpliterInputWidth;
},setOrientation:function(_23){
this.orientation=_23;
this._buildOrientation();
},_onChangeCheckbox:function(){
if(this.useRemaingingSpace.get("checked")){
this.textBox.set("value","");
}
},_onChangeTextbox:function(){
if(this.textBox.get("value").length>0){
this.useRemaingingSpace.set("checked",false);
}
},_onAddRow:function(){
if(this.onAddRow){
this.onAddRow(this);
}
},_onRemoveRow:function(){
if(this.onRemoveRow){
this.onRemoveRow(this);
}
},getUsingRemainingSpace:function(){
return this.useRemaingingSpace.get("checked");
},getValue:function(){
var _24={type:"dojox.mobile.Pane",properties:{}};
var _25="";
var _26=this.textBox.get("value");
if(this.data&&this.data.properties&&this.data.properties.style){
var _27=_c.parse(".foo{"+this.data.properties.style+"}");
var _28=false;
if(_27.model){
dojo.forEach(_27.model[0].children,dojo.hitch(this,function(_29){
if(_29.name=="width"){
if(this.orientation=="H"){
if(!this.useRemaingingSpace.get("checked")){
if(_26){
_29.value=_26;
_25+=_29.getText();
_28=true;
}
}
}
}else{
if(_29.name=="height"){
if(this.orientation=="V"){
if(!this.useRemaingingSpace.get("checked")){
if(_26){
_29.value=_26;
_25+=_29.getText();
_28=true;
}
}
}
}else{
_25+=_29.getText();
}
}
}));
if(!this.useRemaingingSpace.get("checked")&&_26&&!_28){
if(this.orientation=="H"){
_25+="width:"+_26+";";
}else{
_25+="height:"+_26+";";
}
}
}
}else{
if(!this.useRemaingingSpace.get("checked")&&_26){
if(this.orientation=="H"){
_25="width:"+_26+";";
}else{
_25="height:"+_26+";";
}
}
}
if(_25){
_24.properties.style=_25;
}
return _24;
}});
return _1(_9,{show:function(_2a){
this._widget=_8.byId(_2a);
var _2b=false;
if(this._widget.inLineEdit_displayOnCreate){
delete this._widget.inLineEdit_displayOnCreate;
_2b=true;
}
this._containerInput=new _11({data:this._widget.getData()});
this._inline=_a.showDialog(_10.fixedSpliterInputTitle,this._containerInput,{width:550,height:300},dojo.hitch(this,"_onOk"),null,_2b);
},_onOk:function(){
this.updateWidget();
},updateWidget:function(){
var _2c=this._widget.getContext();
var _2d=this._containerInput.getValue();
var _2e=new _b(this._widget,_2d.properties,_2d.children,this._widget._edit_context);
this._widget._edit_context.getCommandStack().execute(_2e);
_2c.select(this._widget,null,false);
}});
});
