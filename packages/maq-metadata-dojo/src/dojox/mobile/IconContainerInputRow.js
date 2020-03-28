//>>built
require({cache:{"url:maq-metadata-dojo/dojox/mobile/templates/IconContainerInputRow.html":"<div class=\"iconContainerInputRow\" style=\"display: table-row; width: 100%;\">\n  <div style=\"display: table-cell;\">\n    <div style=\"padding-bottom: 5px;\">${labelLabel}</div>\n    <input data-dojo-type=\"dijit.form.TextBox\" data-dojo-attach-point=\"labelTextBox\"/>\n  </div>\n  <div style=\"display: table-cell;\">\n    <div style=\"padding-bottom: 5px;\">${iconLabel}</div>\n    <div>\n    \t<img src=\"\" data-dojo-attach-point=\"iconImg\" style=\"float: left\"/>\n    \t<input data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"iconButton\" label=\"${chooseLabel}\" data-dojo-attach-event=\"onClick:_onFileSelect\"/>\n    \t<div style=\"clear: both; padding-bottom: 10px;\"></div>\n    </div>\n  </div>\n  <div style=\"display: table-cell; vertical-align: middle; text-align: center;\">\n  \t<input data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"iconButton\" label=\"+\" data-dojo-attach-event=\"onClick:_onAddRow\"/>\n  \t<input data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"iconButton\" label=\"-\" data-dojo-attach-event=\"onClick:_onRemoveRow\"/>\n  </div>\n</div>\n"}});
define("maq-metadata-dojo/dojox/mobile/IconContainerInputRow",["dojo/_base/declare","dojo/_base/lang","dijit/_Widget","dijit/_Templated","dijit/form/Button","davinci/ui/Dialog","davinci/ui/widgets/OpenFile","davinci/model/Path","dojo/text!./templates/IconContainerInputRow.html","dojo/i18n!dijit/nls/common","dojo/i18n!../../dojox/nls/dojox","dojo/i18n!dijit/nls/common","davinci/ve/utils/URLRewrite"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
return _1([_3,_4],{templateString:_9,widgetsInTemplate:true,label:"",icon:null,widget:null,onAddRow:null,onRemoveRow:null,selectedFile:null,labelLabel:_b.iconContainerLabel,iconLabel:_b.iconContainerIcon,chooseLabel:_b.iconContainerChooseIcon,postCreate:function(){
this.labelTextBox.attr("value",this.label);
if(this.icon){
this.iconImg.setAttribute("src",this.icon.substr(0,5)=="data:"?this.icon:this._getFullUrl(this.icon));
}
},getLabel:function(){
return this.labelTextBox.attr("value");
},getIcon:function(){
return this.icon;
},_onAddRow:function(e){
if(this.onAddRow){
this.onAddRow(this);
}
},_onRemoveRow:function(e){
if(this.onRemoveRow){
this.onRemoveRow(this);
}
},_onFileSelect:function(){
this.fileSelection();
},fileSelection:function(e){
var _e=function(){
var _f=_10.fileTree;
if(_f.selectedItem){
this.selectedFile=_f.selectedItem.getPath();
var _11=_f.selectedItem.getPath();
var _12=new _8(_11),_13=new _8(this.widget._edit_context._srcDocument.fileName);
var _14=_12.relativeTo(_13,true).toString();
this.icon=_14;
this._fileSelected();
}
};
var _10=new _7({finishButtonLabel:_b.selectLabel});
this._fileSelectionDialog=_6.showModal(_10,_b.selectSource,{width:350,height:250},dojo.hitch(this,_e));
},_fileSelected:function(){
var _15=new _8(this.selectedFile);
var _16=new _8(this.widget._edit_context._srcDocument.fileName);
value=_15.relativeTo(_16,true).toString(),this.iconImg.src=this._getFullUrl(value);
},_getFullUrl:function(url){
var _17;
var _18=/http:\/\//i;
if(_18.test(url)){
_17=url;
}else{
var _19=new _8(this.widget._edit_context._srcDocument.fileName).getParentPath().toString();
var _1a=system.resource.findResource(url,null,_19);
if(!_1a){
alert("File: "+this._url+" does not exsist.");
return;
}
_17=_1a.getURL();
}
return _d.encodeURI(_17);
},uninitialize:function(){
}});
});
