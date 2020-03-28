//>>built
require({cache:{"url:maq-metadata-dojo/dijit/layout/templates/borderContainerInput.html":"<div>\n\t<div dojoType=\"dijit.layout.BorderContainer\" design=\"headline\" gutters=\"false\" style=\"\" liveSplitters=\"true\" dojoAttachPoint=\"borderContainer\">\n\t\t<div dojoType=\"dijit.layout.LayoutContainer\" style=\"height: 3em;\" region=\"top\">\n\t\t\t<div dojoType=\"dijit.layout.ContentPane\" layoutAlign=\"left\" style=\"width: 100px\">${dijitNls.borderDesign}</div>\n\t\t\t<div dojoType=\"dijit.layout.ContentPane\" layoutAlign=\"client\" style=\"width: 100px\"><input type=\"radio\" dojoType=\"dijit.form.RadioButton\" name=\"headline\" dojoAttachPoint=\"headlineRadio\" value=\"headline\" /> <label for=\"headlineRadio\">${dijitNls.borderHeadline}</label></div>\n\t\t\t<div dojoType=\"dijit.layout.ContentPane\" layoutAlign=\"right\" ><input type=\"radio\" dojoType=\"dijit.form.RadioButton\" name=\"sidebar\" dojoAttachPoint=\"sidebarRadio\" value=\"sidebar\" /> <label for=\"sidebarRadio\">${dijitNls.borderSidebar}</label></div>\n\t\t</div>\n\t\t<div dojoType=\"dijit.layout.ContentPane\" style=\"width: 7em;\" region=\"leading\">\n\t\t\t<table>\n\t\t\t\t<tr><td><input type=\"radio\" dojoType=\"dijit.form.CheckBox\" name=\"left\" dojoAttachPoint=\"leftCheckBox\" value=\"left\" /> <label for=\"leftCheckBox\">${dijitNls.borderLeft}</label></td></tr>\n\t\t\t\t<tr><td><input type=\"radio\" dojoType=\"dijit.form.CheckBox\" name=\"right\" dojoAttachPoint=\"rightCheckBox\" value=\"right\" /> <label for=\"rightCheckBox\">${dijitNls.borderRight}</label></td></tr>\n\t\t\t\t<tr><td><input type=\"radio\" dojoType=\"dijit.form.CheckBox\" name=\"top\" dojoAttachPoint=\"topCheckBox\" value=\"top\" /> <label for=\"topCheckBox\">${dijitNls.borderTop}</label></td></tr>\n\t\t\t\t<tr><td><input type=\"radio\" dojoType=\"dijit.form.CheckBox\" name=\"bottom\" dojoAttachPoint=\"bottomCheckBox\" value=\"bottom\" /> <label for=\"bottomCheckBox\">${dijitNls.borderBottom}</label></td></tr>\n\t\t\t\t<tr><td><input type=\"radio\" dojoType=\"dijit.form.CheckBox\" name=\"center\" dojoAttachPoint=\"centerCheckBox\" value=\"center\" /> <label for=\"centerCheckBox\">${dijitNls.borderCenter}</label></td></tr>\n\t\t\t</table>\n\t\t</div>\n\t\t<div dojoType=\"dijit.layout.ContentPane\"  region=\"center\" dojoAttachPoint=\"centerWorkspace\">\n\t\t\t<div dojoType=\"dijit.layout.BorderContainer\" design=\"headline\" gutters=\"true\" liveSplitters=\"true\" dojoAttachPoint=\"workspaceBorderContainer\">\n\t\t\t\t<div dojoType=\"dijit.layout.ContentPane\" splitter=\"true\" region=\"left\">  </div>\n\t\t\t\t<div dojoType=\"dijit.layout.ContentPane\" splitter=\"true\" region=\"right\">  </div>\n\t\t\t\t<div dojoType=\"dijit.layout.ContentPane\" splitter=\"true\" region=\"top\">  </div>\n\t\t\t\t<div dojoType=\"dijit.layout.ContentPane\" splitter=\"true\" region=\"bottom\">  </div>\n\t\t\t\t<div dojoType=\"dijit.layout.ContentPane\" splitter=\"true\" region=\"center\">  </div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"}});
define("maq-metadata-dojo/dijit/layout/BorderContainerInput",["dojo/_base/declare","dojo/_base/lang","dojo/dom","dojo/dom-style","dijit/registry","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","davinci/ui/Dialog","./ContainerInput","davinci/ve/widget","davinci/ve/commands/ModifyCommand","dojo/text!./templates/borderContainerInput.html","dojo/i18n!dijit/nls/common","dojo/i18n!davinci/ve/nls/ve","dojo/i18n!../nls/dijit"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10){
var _11=_1([_6,_7,_8],{templateString:_d,dijitNls:_10,resize:function(r){
this.borderContainer.resize(r);
},});
return _1(_a,{dijitNls:_10,show:function(_12){
this._widget=_b.byId(_12);
this._input=new _11({});
var _13=false;
if(this._widget.inLineEdit_displayOnCreate){
delete this._widget.inLineEdit_displayOnCreate;
_13=true;
}
this._inline=_9.showDialog(_10.borderContainerDialog,this._input,{width:560,height:380},_2.hitch(this,"updateWidget"),null,_13);
this._input.domNode.onkeypress=_2.hitch(this,"onKeyPress");
var obj=this._input.sidebarRadio;
obj.onClick=_2.hitch(this,"onChange");
obj=this._input.headlineRadio;
obj.setChecked(false);
obj.onClick=_2.hitch(this,"onChange");
obj=this._input.leftCheckBox;
obj.setChecked(false);
obj.onClick=_2.hitch(this,"onChange");
obj=this._input.rightCheckBox;
obj.setChecked(false);
obj.onClick=_2.hitch(this,"onChange");
obj=this._input.topCheckBox;
obj.setChecked(false);
obj.onClick=_2.hitch(this,"onChange");
obj=this._input.bottomCheckBox;
obj.setChecked(false);
obj.onClick=_2.hitch(this,"onChange");
obj=this._input.centerCheckBox;
obj.setChecked(false);
obj.onClick=_2.hitch(this,"onChange");
this.updateDialog();
},onKeyPress:function(_14){
if(_14.keyCode==13){
this.updateWidget();
}
},onChange:function(_15){
var _16=0;
var obj=this._input.leftCheckBox;
_16+=obj.checked?1:0;
obj=this._input.rightCheckBox;
_16+=obj.checked?1:0;
obj=this._input.topCheckBox;
_16+=obj.checked?1:0;
obj=this._input.bottomCheckBox;
_16+=obj.checked?1:0;
obj=this._input.centerCheckBox;
_16+=obj.checked?1:0;
if(_16<1){
obj=_5.byId(_15.currentTarget.id);
obj.setChecked(true);
alert(_f.regionMustBeSelected);
}
if(_15.target.name==="headline"){
obj=this._input.headlineRadio;
obj.setChecked(true);
obj=this._input.sidebarRadio;
obj.setChecked(false);
}else{
if(_15.target.name==="sidebar"){
obj=this._input.headlineRadio;
obj.setChecked(false);
obj=this._input.sidebarRadio;
obj.setChecked(true);
}
}
this.updateDesign();
},updateDesign:function(){
var obj=this._input.headlineRadio,_17;
if(obj.checked){
_17="headline";
}else{
_17="sidebar";
}
var s="\t<div dojoType=\"dijit.layout.BorderContainer\" design=\""+_17+"\" gutters=\"true\" liveSplitters=\"true\" id=\"workspaceBorderContainerSidebar\">";
obj=this._input.leftCheckBox;
if(obj.checked){
s+="\t\t\t<div dojoType=\"dijit.layout.ContentPane\" splitter=\"true\" region=\"left\">  </div>";
}
obj=this._input.rightCheckBox;
if(obj.checked){
s+="\t\t\t<div dojoType=\"dijit.layout.ContentPane\" splitter=\"true\" region=\"right\">  </div>";
}
obj=this._input.topCheckBox;
if(obj.checked){
s+="\t\t\t<div dojoType=\"dijit.layout.ContentPane\" splitter=\"true\" region=\"top\">  </div>";
}
obj=this._input.bottomCheckBox;
if(obj.checked){
s+="\t\t\t<div dojoType=\"dijit.layout.ContentPane\" splitter=\"true\" region=\"bottom\">  </div>";
}
obj=this._input.centerCheckBox;
if(obj.checked){
s+="\t\t\t<div dojoType=\"dijit.layout.ContentPane\" splitter=\"true\" region=\"center\">  </div>";
}
s+="\t\t</div>";
obj=this._input.centerWorkspace;
obj.attr("content",s);
},updateWidget:function(){
var _18={};
var obj=this._input.headlineRadio;
var _19=obj.checked?"headline":"sidebar";
obj=this._input.leftCheckBox;
_18.left=obj.checked?true:false;
obj=this._input.rightCheckBox;
_18.right=obj.checked?true:false;
obj=this._input.topCheckBox;
_18.top=obj.checked?true:false;
obj=this._input.bottomCheckBox;
_18.bottom=obj.checked?true:false;
obj=this._input.centerCheckBox;
_18.center=obj.checked?true:false;
var _1a=this._widget.getData();
_1a.properties.design=_19;
var _1b=[];
for(var i=0;i<_1a.children.length;i++){
var _1c=_1a.children[i].properties.region;
var _1d=_18[_1c];
if(_1d){
_1b[_1b.length]=_1a.children[i];
}
delete _18[_1c];
}
for(var r in _18){
if(_18[r]){
var _1e=_2.clone(_1a.children[0]);
_1e.properties.region=r;
delete _1e.properties.id;
if(r=="top"||r=="bottom"){
_1e.properties.style="height: 50px;";
}else{
if(r=="left"||r=="right"){
_1e.properties.style="width: 50px;";
}else{
delete _1e.properties.style;
}
}
_1b[_1b.length]=_1e;
}
}
if(_1a.properties.isTempID){
delete _1a.properties.id;
}
var _1f=new _c(this._widget,_1a.properties,_1b,this._widget._edit_context);
this._widget._edit_context.getCommandStack().execute(_1f);
this._widget=_1f.newWidget;
this._widget._edit_context._focuses[0]._selectedWidget=this._widget;
var _20=this._widget.getContext();
_20.select(this._widget,null,false);
},updateDialog:function(){
var _21=this._widget.getData(),_22=this._input.headlineRadio,_23=this._input.sidebarRadio,obj;
if(_21.properties.design&&_21.properties.design==="sidebar"){
_22.setChecked(false);
_23.setChecked(true);
}else{
_22.setChecked(true);
_23.setChecked(false);
}
for(var i=0;i<_21.children.length;i++){
var _24=_21.children[i].properties.region+"CheckBox";
obj=this._input[_24];
obj.setChecked(true);
}
obj=this._input.centerCheckBox;
obj.setChecked(true);
obj.set("disabled",true);
this.updateDesign();
}});
});
