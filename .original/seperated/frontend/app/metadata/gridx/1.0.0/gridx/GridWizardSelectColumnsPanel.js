//>>built
require({cache:{"url:maq-metadata-gridx/gridx/templates/gridWizardSelectColumns.html":"<div class=\"selectPanelDiv\">\r\n\t<table class=\"selectPanelSloshBucketTable\">\r\n\t\t<tr>\r\n\t\t\t<td class=\"sourceListLabel\">${availableColumns}:</td>\r\n\t\t\t<td></td>\r\n\t\t\t<td class=\"targetListLabel\">${selectedColumns}:</td>\r\n\t\t\t<td></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>\r\n\t\t\t\t<div data-dojo-type=\"dijit.form.MultiSelect\" data-dojo-attach-point=\"sourceColumnSelect\" data-dojo-attach-event=\"onChange:_sourceColumnSelectChange, onDblClick:_sourceColumnSelectDblClick\" class='sourceList'>\t\r\n\t\t\t\t</div>\r\n\t\t\t</td>\r\n\t\t\t<td>\r\n\t\t\t\t<table>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"moveToTargetButton\" data-dojo-attach-event=\"onClick:_moveSourceColumns\" data-dojo-props=\"iconClass:'sloshBucketIcon sloshBucketMoveToTargetIcon', showLabel: false\" type=\"button\">Move to Target</button>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"moveToSourceButton\" data-dojo-attach-event=\"onClick:_moveTargetColumns\" data-dojo-props=\"iconClass:'sloshBucketIcon sloshBucketMoveToSourceIcon', showLabel: false\" type=\"button\">Move to Source</button>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</table>\r\n\t\t\t</td>\r\n\t\t\t<td>\r\n\t\t\t\t<div data-dojo-type=\"dijit.form.MultiSelect\" data-dojo-attach-point=\"targetColumnSelect\" data-dojo-attach-event=\"onChange:_targetColumnSelectChange, onDblClick:_targetColumnSelectDblClick\"  class='targetList'>\r\n\t\t\t\t</div>\r\n\t\t\t</td>\r\n\t\t\t<td>\r\n\t\t\t\t<table>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"moveTargetColumnUpButton\" data-dojo-attach-event=\"onClick:_moveTargetColumnUp\" data-dojo-props=\"iconClass:'sloshBucketIcon sloshBucketMoveTargetUpIcon', showLabel: false\" type=\"button\">Move Up</button>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"moveTargetColumnDownButton\" data-dojo-attach-event=\"onClick:_moveTargetColumnDown\" data-dojo-props=\"iconClass:'sloshBucketIcon sloshBucketMoveTargetDownIcon', showLabel: false\" type=\"button\">Move Down</button>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</table>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</table>\r\n</div>"}});
define("maq-metadata-gridx/gridx/GridWizardSelectColumnsPanel",["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/ContentPane","dijit/form/Button","dijit/form/MultiSelect","./GridWizardPanel","dojo/query","davinci/ve/widget","dojo/i18n!./nls/gridx","dojo/text!./templates/gridWizardSelectColumns.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){
return _1([_2,_3,_4,_8],{templateString:_c,postMixInProperties:function(){
this.inherited(arguments);
dojo.mixin(this,_b);
},postCreate:function(){
},getStepLabel:function(){
return _b.selectColumnsHeader;
},populate:function(_d,_e,_f){
var _10=_d.getData();
var _11=null;
if(!_f){
_11=_d.attr("structure");
}
this._removeAllOptions(this.sourceColumnSelect);
this._removeAllOptions(this.targetColumnSelect);
var _12=null;
var _13=null;
dojo.some(_e._commands,function(_14){
if(_14._properties&&_14._properties.structure){
_12=_14;
}else{
if(_14._data&&_14._data.type){
if(_14._data.type==="dojo.data.ItemFileReadStore"||(_14._data.type==="dojox.data.CsvStore")){
_13=_14;
}
}
}
});
var _15=false;
if(_10.properties.store.declaredClass!=_13._data.type||_10.properties.store.url!=_13._data.properties.url){
_15=true;
}
var _16=_12._properties;
var _17=_16.structure;
dojo.forEach(_17,function(_18){
var _19=this._createOption(_18);
if(_11&&!_15){
var _1a=dojo.some(_11,function(_1b){
if(_1b.field===_18.field){
return true;
}
});
if(!_1a){
dojo.place(_19,this.sourceColumnSelect.containerNode);
}
}else{
dojo.place(_19,this.targetColumnSelect.containerNode);
}
}.bind(this));
if(!_15){
if(_11){
dojo.forEach(_11,function(_1c){
var _1d=dojo.some(_17,function(_1e){
if(_1c.field===_1e.field){
return true;
}
});
if(_1d){
var _1f=this._createOption(_1c);
dojo.place(_1f,this.targetColumnSelect.containerNode);
}
}.bind(this));
}
}
var _20=this._getOptions(this.targetColumnSelect);
if(_20.length==0){
this.sourceColumnSelect.invertSelection();
this._moveSourceColumns();
this.targetColumnSelect.invertSelection();
}
this._saveTargetOptions();
this._updateButtonEnablement();
this.inherited(arguments);
},_createOption:function(_21){
var _22=dojo.doc.createElement("option");
_22.value=_21.field;
var _23=_21.name.trim();
if(_23!=_21.field){
_23=dojo.replace(_b.columnOptionLabel,[_23,_21.field]);
}
_22.innerHTML=_23;
return _22;
},getTargetColumnIds:function(){
var _24=this._getOptions(this.targetColumnSelect);
var _25=dojo.map(_24,function(_26){
return _26.value;
});
this._saveTargetOptions();
return _25;
},isDirty:function(){
var _27=this._getOptions(this.targetColumnSelect);
var _28=false;
if(this._oldSelectedOptions&&this._oldSelectedOptions.length==_27.length){
count=0;
dojo.some(this._oldSelectedOptions,function(_29){
var _2a=_27[count];
if(_29.value!=_2a.value||_29.innerHTML!=_2a.innerHTML){
_28=true;
}
count++;
});
}else{
_28=true;
}
return _28;
},_saveTargetOptions:function(){
this._oldSelectedOptions=this._getOptions(this.targetColumnSelect);
},_moveSourceColumns:function(){
this._deselectAllOptions(this.targetColumnSelect);
this.targetColumnSelect.addSelected(dijit.byId(this.sourceColumnSelect));
this._updateButtonEnablement();
},_moveTargetColumns:function(){
this._deselectAllOptions(this.sourceColumnSelect);
this.sourceColumnSelect.addSelected(dijit.byId(this.targetColumnSelect));
this._updateButtonEnablement();
},_moveTargetColumnUp:function(){
var _2b=this._getSelectedOptionIndices(this.targetColumnSelect);
if(_2b.length==1){
var _2c=_2b[0];
if(_2c>0){
var _2d=this._getOptions(this.targetColumnSelect);
dojo.place(_2d[_2c],_2d[_2c-1],"before");
}
}
this._updateButtonEnablement();
},_moveTargetColumnDown:function(){
var _2e=this._getSelectedOptionIndices(this.targetColumnSelect);
if(_2e.length==1){
var _2f=_2e[0];
var _30=this._getOptions(this.targetColumnSelect);
if(_2f<_30.length-1){
dojo.place(_30[_2f],_30[_2f+1],"after");
}
}
this._updateButtonEnablement();
},_removeAllOptions:function(_31){
var _32=this._getOptions(_31);
dojo.forEach(_32,function(_33){
dojo.destroy(_33);
}.bind(this));
},_deselectAllOptions:function(_34){
var _35=this._getOptions(_34);
dojo.forEach(_35,function(_36){
_36.selected=false;
}.bind(this));
},_sourceColumnSelectChange:function(){
var _37=this._getSelectedOptions(this.sourceColumnSelect);
if(_37.length>0){
this.moveToTargetButton.set("disabled",false);
}else{
this.moveToTargetButton.set("disabled",true);
}
},_targetColumnSelectChange:function(){
var _38=this._getSelectedOptionIndices(this.targetColumnSelect);
if(_38.length==0){
this.moveToSourceButton.set("disabled",true);
this.moveTargetColumnUpButton.set("disabled",true);
this.moveTargetColumnDownButton.set("disabled",true);
}else{
if(_38.length==1){
this.moveToSourceButton.set("disabled",false);
var _39=_38[0];
if(_39>0){
this.moveTargetColumnUpButton.set("disabled",false);
}else{
this.moveTargetColumnUpButton.set("disabled",true);
}
if(_39<this._getOptions(this.targetColumnSelect).length-1){
this.moveTargetColumnDownButton.set("disabled",false);
}else{
this.moveTargetColumnDownButton.set("disabled",true);
}
}else{
this.moveToSourceButton.set("disabled",false);
this.moveTargetColumnUpButton.set("disabled",true);
this.moveTargetColumnDownButton.set("disabled",true);
}
}
},_sourceColumnSelectDblClick:function(){
this._moveSourceColumns();
},_targetColumnSelectDblClick:function(){
this._moveTargetColumns();
},_getOptions:function(_3a){
var _3b=_9("option",_3a.containerNode);
return _3b;
},_getSelectedOptions:function(_3c){
var _3d=this._getOptions(_3c);
var _3e=dojo.filter(_3d,function(_3f){
if(_3f.selected){
return _3f;
}
});
return _3e;
},_getSelectedOptionIndices:function(_40){
var _41=this._getOptions(_40);
var _42=[];
dojo.forEach(_41,function(_43,_44){
if(_43.selected){
_42.push(_44);
}
});
return _42;
},_updateButtonEnablement:function(){
this._sourceColumnSelectChange();
this._targetColumnSelectChange();
},isValid:function(){
var _45=true;
var _46=this._getOptions(this.targetColumnSelect);
if(!_46.length){
_45=_b.noColumnsSelected;
}
return _45;
}});
});
