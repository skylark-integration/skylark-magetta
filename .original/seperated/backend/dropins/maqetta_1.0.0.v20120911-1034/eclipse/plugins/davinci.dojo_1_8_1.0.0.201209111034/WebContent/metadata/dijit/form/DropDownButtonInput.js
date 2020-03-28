//>>built
define("maq-metadata-dojo/dijit/form/DropDownButtonInput",["dojo/_base/declare","../layout/ContainerInput","dojo/i18n!../nls/dijit","dojox/html/entities","dojo/i18n!davinci/ve/nls/ve","dojo/i18n!dijit/nls/common"],function(_1,_2,_3,_4,_5,_6){
return _1(_2,{propertyName:"label",format:"rows",multiLine:"true",supportsHTML:"true",helpText:"",constructor:function(){
this.helpText=_3.dropDownButtonInputHelp;
},serialize:function(_7,_8,_9){
var _a=[];
var _b=_7.getData();
var _c=_b.children[0];
_a.push(_b.properties[this.propertyName]);
if(_c){
var _d=_c.children;
for(var j=0;j<_d.length;j++){
var _e=_d[j];
_a.push("> "+_e.properties[this.propertyName]);
}
}
_a=this.serializeItems(_a);
_8(_a);
},update:function(_f,_10){
var _11=_f.getData();
var _12=_11.children[0];
var _13,_14,_15=-1;
for(var i=0;i<_10.length;i++){
var _16=_10[i];
var _17=_16.indent;
var _18=_16.text;
if(i==0){
_13=_18;
}else{
_15++;
_14=_12.children;
var _19=_14[_15];
if(_19){
_19.properties.label=_18;
}else{
_19=this.createMenuItemData(_18);
_14.push(_19);
}
}
}
if(_14&&(_15+1>0)){
var _1a=_14.length;
for(var i=_15+1;i<_1a;i++){
_14.pop();
}
}
var _1b=new davinci.ve.commands.ModifyCommand(_f,{label:_13},[_12]);
this._getContext().getCommandStack().execute(_1b);
return _1b.newWidget;
},createMenuItemData:function(_1c){
return {type:"dijit.MenuItem",properties:{label:_1c}};
},parse:function(_1d){
var _1e=this.parseItems(_4.decode(_1d));
if(this._format==="text"){
_1e.forEach(function(_1f){
_1f.text=_4.encode(_1f.text);
});
}
return _1e;
},setFormat:function(_20){
var _21=dijit.byId("davinci.ve.input.SmartInput_radio_html");
var _22=dijit.byId("davinci.ve.input.SmartInput_radio_text");
var n=dojo.create("div",{innerHTML:_20});
var _23=n.children.length?"html":"text";
if(_23==="html"){
_21.set("checked",true);
_22.set("checked",false);
}else{
_21.set("checked",false);
_22.set("checked",true);
}
this._format=_23;
},help:function(_24){
var _25=dojo.byId("davinci.ve.input.SmartInput_div_help");
var _26=dojo.byId("davinci.ve.input.SmartInput_radio_div");
if(_24){
dojo.style(_25,"display","");
}else{
dojo.style(_25,"display","none");
}
},updateFormats:function(){
var _27=this._inline.eb.attr("value");
var _28=true;
if(this.containsHtmlMarkUp(_27)){
_28=false;
}
var _29=this._widget.getContext().getDojo();
var _2a=dojo.byId("davinci.ve.input.SmartInput_radio_text_width_div");
var _2b=_4.encode(_27);
_2a.innerHTML="<div class=\"dojoxEllipsis\">"+dojo.replace(_3.plainText,[_2b])+"</div>";
var _2c=dojo.byId("davinci.ve.input.SmartInput_radio_html_width_div");
_2c.innerHTML="<div id=\"davinci.ve.input.SmartInput_radio_html_div\" class=\"dojoxEllipsis\">"+_5.htmlMarkup+"</div>";
var _2d=dijit.byId("davinci.ve.input.SmartInput_radio_html");
var _2e=dijit.byId("davinci.ve.input.SmartInput_radio_text");
var _2f=dojo.byId("davinci.ve.input.SmartInput_table");
_2d.setDisabled(_28);
_2e.setDisabled(_28);
if(_28){
dojo.addClass(_2a,"inlineEditDisabled");
dojo.addClass(_2c,"inlineEditDisabled");
_2d.set("checked",false);
_2e.set("checked",true);
}else{
dojo.removeClass(_2a,"inlineEditDisabled");
dojo.removeClass(_2c,"inlineEditDisabled");
}
if(!_28&&this.isHtmlSupported()){
dojo.style(_2e.domNode,"display","");
dojo.style(_2d.domNode,"display","");
dojo.style(_2c,"display","");
dojo.style(_2a,"display","");
dojo.style(_2f,"display","");
}else{
dojo.style(_2e.domNode,"display","none");
dojo.style(_2d.domNode,"display","none");
dojo.style(_2c,"display","none");
dojo.style(_2a,"display","none");
dojo.style(_2f,"display","none");
}
},_getTemplate:function(){
var _30=""+"<div id=\"iedResizeDiv\" class=\"iedResizeDiv\" >"+"<textarea  dojoType=\"dijit.form.SimpleTextarea\" name=\"davinciIleb\" style=\"width:200px; height:30px;\" trim=\"true\" id=\"davinciIleb\" class=\"smartInputTextArea\" ></textarea>"+"<div id=\"smartInputSim\" class=\"smartInputSim\" ></div>"+"<div id=\"iedResizeHandle\" dojoType=\"dojox.layout.ResizeHandle\" targetId=\"iedResizeDiv\" constrainMin=\"true\" maxWidth=\"200\" maxHeight=\"600\" minWidth=\"200\" minHeight=\"55\"  activeResize=\"true\" intermediateChanges=\"true\" ></div>"+"</div>";
if(this.multiLine==="true"){
_30=""+"<div id=\"iedResizeDiv\" class=\"iedResizeDiv\" >"+"<textarea  dojoType=\"dijit.form.SimpleTextarea\" name=\"davinciIleb\" style=\"width:200px; height:60px;\" trim=\"true\" id=\"davinciIleb\" class=\"smartInputTextArea\" ></textarea>"+"<div id=\"smartInputSim\" class=\"smartInputSim\" ></div>"+"<div id=\"iedResizeHandle\" dojoType=\"dojox.layout.ResizeHandle\" targetId=\"iedResizeDiv\" constrainMin=\"true\" maxWidth=\"200\" maxHeight=\"600\" minWidth=\"200\" minHeight=\"80\"  activeResize=\"true\" intermediateChanges=\"true\" ></div>"+"</div>";
}
var _31=""+_30+"<div  id=\"davinci.ve.input.SmartInput_div\"  class=\"davinciVeInputSmartInputDiv\" >"+"<div id=\"davinci.ve.input.SmartInput_radio_div\" class=\"smartInputRadioDiv\" >"+"<table id=\"davinci.ve.input.SmartInput_table\"> "+"<tbody>"+"<tr> "+"<td class=\"smartInputTd1\" > "+"<input id=\"davinci.ve.input.SmartInput_radio_text\" showlabel=\"true\" type=\"radio\" dojoType=\"dijit.form.RadioButton\" disabled=\"false\" readOnly=\"false\" intermediateChanges=\"false\" checked=\"true\"> </input> "+"</td> "+"<td class=\"smartInputTd2\" >"+"<div id=\"davinci.ve.input.SmartInput_radio_text_width_div\" class=\"smartInputRadioTextDiv\">"+"</div>"+"</td> "+"</tr>"+"<tr> "+"<td class=\"smartInputTd1\"> <input id=\"davinci.ve.input.SmartInput_radio_html\" showlabel=\"true\" type=\"radio\" dojoType=\"dijit.form.RadioButton\"> </input>  </td> "+"<td class=\"smartInputTd2\">"+"<div id=\"davinci.ve.input.SmartInput_radio_html_width_div\" class=\"smartInputRadioTextDiv\">"+"</div>"+"</td> "+"</tr> "+"</tbody>"+"</table> "+"<div class=\"smartInputHelpDiv\" > "+"<span id=\"davinci.ve.input.SmartInput_img_help\"  title=\"Help\" class=\"inlineEditHelp\" > </span>"+"<span class=\"smartInputSpacerSpan\" >"+"<button id=\"davinci.ve.input.SmartInput_ok\"  dojoType=\"dijit.form.Button\" type=\"submit\" class=\"inlineEditHelpOk\" >"+_6.buttonOk+"</button> <button id=davinci.ve.input.SmartInput_cancel dojoType=\"dijit.form.Button\" class=\"inlineEditHelpCancel\"> "+_6.buttonCancel+"</button>  "+"</span>   "+"</div> "+"<div id=\"davinci.ve.input.SmartInput_div_help\" style=\"display:none;\" class=\"smartInputHelpTextDiv\" > "+"<div dojoType=\"dijit.layout.ContentPane\" style=\"text-align: left; padding:0; height:80px;\" >"+this.getHelpText()+"</div> "+"<div style=\"text-align: left; padding:0; height:2px;\" ></div> "+"</div> "+"</div>"+"</div> "+"";
return _31;
},end:true});
});
