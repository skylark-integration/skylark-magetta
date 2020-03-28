//>>built
require({cache:{"url:maq-metadata-html/html/table/templates/tableInput.html":"<div class=\"tableInputDialog\">\r\n\r\n\t<div dojoType=\"dijit.layout.BorderContainer\" class=\"dijitDialogPaneContentArea\" design=\"headline\" gutters=\"false\" \r\n\t\tstyle=\"width:{width}; height:{height}\" liveSplitters=\"false\" id=\"tableInputBorderContainer\">\r\n\t\r\n\t\t<!--Center region -->\r\n\t\t<div dojoType=\"dijit.layout.ContentPane\" region=\"center\" class=\"propertiesRegion\">\r\n\t\t\t<table width=\"100%\">\r\n\t\t\t\t<tr class=\"sectionHeaderRow\">\r\n\t\t\t\t\t<td class=\"sectionHeaderCell\">{propertiesHeader}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td style=\"padding-right:4px;\">\r\n\t\t\t\t\t\t<table width=\"100%\" cellspacing=\"5\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td class=\"propertyFieldLabel\"><label for=\"tableInputNumRows\">{numRows}</label></td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input id=\"tableInputNumRows\" data-dojo-type=\"dijit.form.NumberSpinner\" value=\"2\" class=\"propertyInputWidget\"/>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td class=\"propertyFieldLabel\"><label for=\"tableInputNumCols\">{numCols}</label></td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input id=\"tableInputNumCols\" data-dojo-type=\"dijit.form.NumberSpinner\" value=\"2\" class=\"propertyInputWidget\"/>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<!--  It turns out document.css messes up cellpadding/cellspacing on tables, so get rid of for now...\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td class=\"propertyFieldLabel\"><label for=\"tableInputCellpadding\">{cellpadding}</label></td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input id=\"tableInputCellpadding\" data-dojo-type=\"dijit.form.NumberSpinner\" value=\"0\" class=\"propertyInputWidget\"/>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td class=\"propertyFieldLabel\"><label for=\"tableInputCellspacing\">{cellspacing}</label></td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input id=\"tableInputCellspacing\" data-dojo-type=\"dijit.form.NumberSpinner\" value=\"0\" class=\"propertyInputWidget\"/>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t-->\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td class=\"propertyFieldLabel\"><label for=\"tableInputBorder\">{border}</label></td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input id=\"tableInputBorder\" data-dojo-type=\"dijit.form.NumberSpinner\" value=\"0\" class=\"propertyInputWidget\"/>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td class=\"propertyFieldLabel\"><label for=\"tableInputBorderCollapse\">{borderCollapse}</label></td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<select id=\"tableInputBorderCollapse\" data-dojo-type=\"dijit.form.Select\" type=\"text\" value=\"collapse\" style=\"width:100%\">\r\n\t\t\t\t\t\t\t\t\t\t<option value=\"collapse\" selected=\"selected\">collapse</option>\r\n\t\t\t\t\t\t\t\t\t   \t<option value=\"separate\">separate</option>\r\n\t\t\t\t\t\t\t\t\t   \t<option value=\"inherit\">inherit</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td class=\"propertyFieldLabel\"><label for=\"tableInputTableLayout\">{tableLayout}</label></td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<select id=\"tableInputTableLayout\" data-dojo-type=\"dijit.form.Select\" type=\"text\" value=\"auto\" style=\"width:100%\">\r\n\t\t\t\t\t\t\t\t\t\t<option value=\"auto\" selected=\"selected\">auto</option>\r\n\t\t\t\t\t\t\t\t\t   \t<option value=\"fixed\">fixed</option>\r\n\t\t\t\t\t\t\t\t\t   \t<option value=\"inherit\">inherit</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td class=\"propertyFieldLabel\"><label for=\"tableInputFirstRowHeader\">{firstRowHeader}</label></td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input id=\"tableInputFirstRowHeader\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\"></input>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\r\n        </div>\r\n\t\t\r\n        <!--Preview area -- \"trailing\" region -->\r\n\t\t<div dojoType=\"dijit.layout.ContentPane\" id=\"tableInputPreviewRegion\" region=\"trailing\" class=\"previewRegion\" >\r\n\t\t\t<table width=\"100%\">\r\n\t\t\t\t<tr class=\"sectionHeaderRow\">\r\n\t\t\t\t\t<td class=\"sectionHeaderCell\">{preview}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<!--  child rows for rules and rule labels added dynamically -->\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<div dojoType=\"dijit.layout.ContentPane\" id=\"tableInputPreviewArea\" class=\"previewArea\"/> \r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\r\n    </div>\r\n  </div>\r\n  <div class=\"dijitDialogPaneActionBar\">\r\n\t\t<button data-dojo-type=\"dijit.form.Button\" id=\"tableInputOkButton\" type=\"submit\">{buttonOk}</button>\r\n\t\t<button data-dojo-type=\"dijit.form.Button\" id=\"tableInputCancelButton\">{buttonCancel}</button>\r\n\t</div>\r\n</div>"}});
define("maq-metadata-html/html/table/TableInput",["dojo/_base/declare","maq-metadata-dojo/dijit/layout/ContainerInput","davinci/ve/widget","davinci/ui/Dialog","./TableMatrix","dojo/text!./templates/tableInput.html","davinci/css!./templates/tableInput.css","dojo/i18n!../nls/html","dojo/i18n!dijit/nls/common","dijit/layout/ContentPane","dijit/layout/BorderContainer","dijit/layout/LayoutContainer","dijit/form/Button","dijit/form/NumberSpinner"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
return _1(_2,{_substitutedMainTemplate:null,show:function(_a){
this._widget=davinci.ve.widget.byId(_a);
function _b(){
if(this._isUserInputValid()){
this.updateWidget();
}
};
this._inline=_4.showModal(this._getTemplate(),_8.tableDialog,{width:700,height:300},dojo.hitch(this,_b));
this._configureInputControls();
this._setupPreviewArea();
var _c=dijit.byId("tableInputCancelButton");
this._connection.push(dojo.connect(_c,"onClick",dojo.hitch(this,function(){
this._inline.onCancel();
})));
if(this._widget.inLineEdit_displayOnCreate){
delete this._widget.inLineEdit_displayOnCreate;
dojo.style(_c.domNode,"display","none");
}
this._updatePreview();
},_configureInputControls:function(){
var _d=this._widget.getData();
var _e=_d.properties;
var _f=_5(this._widget.domNode);
var _10=_f.getNumRows();
this._configureSpinner("tableInputNumRows",{min:1,max:1000,places:0},_10);
_10=_f.getNumCols();
this._configureSpinner("tableInputNumCols",{min:1,max:100,places:0},_10);
_10=_e.border?_e.border:0;
this._configureSpinner("tableInputBorder",{min:0,max:50,places:0},_10);
_10=this._getValueFromStyleStr(_e.style,"border-collapse");
_10=_10?_10:dojo.style(this._widget.domNode,"border-collapse");
var _11=dijit.byId("tableInputBorderCollapse");
_11.set("value",_10);
this._connection.push(dojo.connect(_11,"onChange",dojo.hitch(this,this._handleValueChange)));
_10=this._getValueFromStyleStr(_e.style,"table-layout");
_10=_10?_10:dojo.style(this._widget.domNode,"table-layout");
var _12=dijit.byId("tableInputTableLayout");
_12.set("value",_10);
this._connection.push(dojo.connect(_12,"onChange",dojo.hitch(this,this._handleValueChange)));
var _13=dijit.byId("tableInputFirstRowHeader");
_13.set("value",_f.isFirstRowHeader());
this._connection.push(dojo.connect(_13,"onChange",dojo.hitch(this,this._handleValueChange)));
this._initialSettings=this._getUserInput();
},_configureSpinner:function(_14,_15,_16){
var _17=dijit.byId(_14);
_17.set("constraints",_15);
_17.set("value",_16);
this._connection.push(dojo.connect(_17,"_setValueAttr",dojo.hitch(this,this._handleValueChange)));
},_handleValueChange:function(){
this._updatePreview();
},_setupPreviewArea:function(){
var _18=dijit.byId("tableInputPreviewRegion");
previewRegionPadding=dojo.style(_18.domNode,"padding");
var _19=(dojo.style(_18.domNode,"width")-previewRegionPadding*2)+"px";
var _1a=(dojo.style(_18.domNode,"height")-previewRegionPadding*2-20)+"px";
var _1b=dijit.byId("tableInputPreviewArea");
dojo.style(_1b.domNode,"width",_19);
dojo.style(_1b.domNode,"height",_1a);
},hide:function(_1c){
if(this._inline){
var _1d;
while(_1d=this._connection.pop()){
dojo.disconnect(_1d);
}
}
this.inherited(arguments);
},updateWidget:function(){
if(!this._isUserInputChanged(this._getUserInput())){
return;
}
var _1e=this._widget.getData();
var _1f=this._getUserInput();
var _20=this._getUpdatedStyleStr(_1e.properties.style,"table-layout",_1f.tableLayout);
_20=this._getUpdatedStyleStr(_20,"border-collapse",_1f.borderCollapse);
var _21={cellspacing:_1f.cellspacing,cellpadding:_1f.cellpadding,border:_1f.border,style:_20};
var _22=this._getNewTableChildren(_1e,_1f);
var _23=new davinci.ve.commands.ModifyCommand(this._widget,_21,_22,this._widget._edit_context);
this._widget._edit_context.getCommandStack().execute(_23);
this._widget=_23.newWidget;
this._widget._edit_context._focuses[0]._selectedWidget=this._widget;
var _24=this._widget.getContext();
_24.select(this._widget,null,false);
},_getNewTableChildren:function(_25,_26){
var _27=[];
var _28=false;
dojo.forEach(_25.children,function(_29){
if(_29.type=="html.colgroup"){
_27.push(this._getNewColgroupData(_29,_26));
_28=true;
}else{
if(_29.type=="html.tbody"){
_27.push(this._getNewBodyData(_29,_26));
}else{
_27.push(dojo.clone(_29));
}
}
}.bind(this));
if(!_28){
var _2a=this._getNewColgroupData(_5.createTableColGroupData(),_26);
_27.unshift(_2a);
}
this._cleanTempIds(_27);
return _27;
},_cleanTempIds:function(_2b){
dojo.forEach(_2b,function(_2c){
if(_2c.properties&&_2c.properties.isTempID){
delete _2c.properties.id;
}
if(_2c.children){
this._cleanTempIds(_2c.children);
}
}.bind(this));
},_getNewColgroupData:function(_2d,_2e){
var _2f=[];
var _30=_2e.numCols;
var _31=0;
dojo.forEach(_2d.children,function(_32){
if(_32.type=="html.col"){
if(_31<_30){
var _33=_32.properties.span;
_33=_33?Number(_33):1;
if(_31+_33>_30){
_33=_31+_33-_30;
_32.properties.span=_33.toString();
}
_2f.push(dojo.clone(_32));
_31+=_33;
}
}else{
_2f.push(dojo.clone(_32));
}
}.bind(this));
if(_31<_30){
for(var _34=_31;_34<_30;_34++){
var _35=_5.createTableColData();
_2f.push(_35);
}
}
var _36=dojo.clone(_2d);
_36.children=_2f;
return _36;
},_getNewBodyData:function(_37,_38){
var _39=[];
var _3a=_38.numRows;
var _3b=0;
dojo.forEach(_37.children,function(_3c){
if(_3c.type=="html.tr"){
if(_3b<_3a){
_39.push(this._getNewRowData(_3c,_38,(_3b==0)));
_3b++;
}
}else{
newColgroupChildren.push(dojo.clone(_3c));
}
}.bind(this));
if(_3b<_3a){
for(var _3d=_3b;_3d<_3a;_3d++){
var _3e=(_3b==0&&_3d==0);
var _3f=this._getNewRowData(_5.createTableRowData(),_38,_3e);
_39.push(_3f);
}
}
var _40=dojo.clone(_37);
_40.children=_39;
return _40;
},_getNewRowData:function(row,_41,_42){
var _43=[];
var _44=_41.numCols;
var _45=0;
dojo.forEach(row.children,function(_46){
if(_46.type=="html.td"||_46.type=="html.th"){
if(_45<_44){
var _47=_46.properties.colspan;
_47=_47?Number(_47):1;
if(_45+_47>_44){
_47=_45+_47-_44;
_46.properties.colspan=_47.toString();
}
var _48=dojo.clone(_46);
if(_42){
if(_41.firstRowHeader){
_48.type="html.th";
_48.tagName="th";
}else{
_48.type="html.td";
_48.tagName="td";
}
}
_43.push(_48);
_45+=_47;
}
}else{
newColgroupChildren.push(dojo.clone(_46));
}
}.bind(this));
if(_45<_44){
for(var _49=_45;_49<_44;_49++){
var _4a=null;
if(_42&&_41.firstRowHeader){
_4a=_5.createTableHeaderData();
}else{
_4a=_5.createTableCellData();
}
_43.push(_4a);
}
}
var _4b=dojo.clone(row);
_4b.children=_43;
return _4b;
},_getUpdatedStyleStr:function(_4c,_4d,_4e){
var _4f=_3.parseStyleValues(_4c);
_3.setStyleProperty(_4f,_4d,_4e);
return _3.getStyleString(_4f);
},_getValueFromStyleStr:function(_50,_51){
var _52=_3.parseStyleValues(_50);
var _53=_3.retrieveStyleProperty(_52,_51);
return _53;
},_getUserInput:function(){
return {numRows:dijit.byId("tableInputNumRows").get("value"),numCols:dijit.byId("tableInputNumCols").get("value"),border:dijit.byId("tableInputBorder").get("value"),borderCollapse:dijit.byId("tableInputBorderCollapse").get("value"),tableLayout:dijit.byId("tableInputTableLayout").get("value"),firstRowHeader:dijit.byId("tableInputFirstRowHeader").get("value")};
},_isUserInputChanged:function(_54){
return this._initialSettings.numRows!=_54.numRows||this._initialSettings.numCols!=_54.numCols||this._initialSettings.border!=_54.border||this._initialSettings.borderCollapse!=_54.borderCollapse||this._initialSettings.tableLayout!=_54.tableLayout||this._initialSettings.firstRowHeader!=_54.firstRowHeader;
},_isUserInputValid:function(){
return dijit.byId("tableInputNumRows").isValid()&&dijit.byId("tableInputNumCols").isValid()&&dijit.byId("tableInputBorder").isValid();
},_updatePreview:function(){
if(!this._isUserInputValid()){
return;
}
var s=this._getPreviewContent();
var obj=dijit.byId("tableInputPreviewArea");
obj.set("content",s);
},_getPreviewContent:function(){
if(this.previewTable){
dojo.destroy(this.previewTable);
this.previewTable=null;
}
var _55=this._getUserInput();
var _56=this.previewTable=dojo.doc.createElement("table");
dojo.attr(_56,"border",_55.border);
dojo.style(_56,"border-collapse",_55.borderCollapse);
dojo.style(_56,"table-layout",_55.tableLayout);
dojo.style(_56,"width","100%");
dojo.addClass(_56,"tableElementPreview");
var _57=dojo.doc.createElement("tbody");
_56.appendChild(_57);
var _58=_55.numRows;
var _59=_55.numCols;
for(var _5a=0;_5a<_58;_5a++){
var row=dojo.doc.createElement("tr");
for(var _5b=0;_5b<_59;_5b++){
var _5c=null;
if(_5a==0&&_55.firstRowHeader){
_5c=dojo.doc.createElement("th");
_5c.innerHTML="TH";
}else{
_5c=dojo.doc.createElement("td");
_5c.innerHTML="&nbsp;";
}
dojo.addClass(_5c,"tableElementPreview");
row.appendChild(_5c);
}
_57.appendChild(row);
}
return _56;
},_getTemplate:function(_5d,_5e){
if(!this._substitutedMainTemplate){
this._substitutedMainTemplate=dojo.replace(_6,{propertiesHeader:_8.propertiesHeader,numRows:_8.numRows,numCols:_8.numCols,border:_8.border,borderCollapse:_8.borderCollapse,tableLayout:_8.tableLayout,firstRowHeader:_8.firstRowHeader,preview:_8.preview,buttonOk:_9.buttonOk,buttonCancel:_9.buttonCancel});
}
return this._substitutedMainTemplate;
},resize:function(){
dijit.byId("tableInputBorderContainer").resize();
}});
});
