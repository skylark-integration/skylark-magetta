//>>built
require({cache:{"url:maq-metadata-dojo/dijit/templates/treeInput.html":"<div>\r\n\t<div data-dojo-type=\"dijit.layout.BorderContainer\" design=\"headline\" gutters=\"false\" \r\n\t\tliveSplitters=\"false\" id=\"treeInputBorderContainer\" class=\"treeInput dijitDialogPaneContentArea\">\r\n\t\t\r\n\t\t<div data-dojo-type=\"dijit.layout.BorderContainer\" data-dojo-props=\"design:'headline', gutters:false, liveSplitters:false,region:'center'\" class=\"previewPanelCenterContentPane\">\r\n\t\t\t\t<div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region:'top'\" class=\"previewPanelSectionLabelContainer\"> \r\n\t\t\t\t\t<span>{preview}</span><span class=\"previewPanelPreviewNote\">{previewNote}</span>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region:'center'\" class=\"previewPanelPreviewPaneCenter\" id=\"treeInputPreviewPanelPreviewPaneCenter\">\r\n\t\t\t\t\t<div data-dojo-type=\"dijit.layout.LayoutContainer\">\r\n\t\t\t\t\t<div data-dojo-type=\"dijit.Toolbar\" layoutAlign=\"top\">\r\n\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"treeInputAddChildButton\" data-dojo-props=\"iconClass:'editActionIcon treeAddChildIcon', showLabel:false\">{addChild}</button> \r\n\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"treeInputInsertBeforeButton\" data-dojo-props=\"iconClass:'editActionIcon treeInputInsertBeforeIcon', showLabel:false\" >{insertBefore}</button> \r\n\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"treeInputInsertAfterButton\" data-dojo-props=\"iconClass:'editActionIcon treeInputInsertAfterIcon', showLabel:false\">{insertAfter}</button> \r\n\t\t\t\t\t\t<span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\r\n\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"treeInputDeleteButton\" data-dojo-props=\"iconClass:'editActionIcon treeInputDeleteIcon', showLabel:false\">{remove}</button> \r\n\t\t\t\t\t\t<span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\r\n\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"treeInputMoveUpButton\" data-dojo-props=\"iconClass:'editActionIcon treeInputMoveUpIcon', showLabel:false\">{moveUp}</button> \r\n\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"treeInputMoveDownButton\" data-dojo-props=\"iconClass:'editActionIcon treeInputMoveDownIcon', showLabel:false\">{moveDown}</button> \r\n\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"treeInputShiftLeftButton\" data-dojo-props=\"iconClass:'editActionIcon treeInputShiftLeftIcon', showLabel:false\">{shiftLeft}</button>\r\n\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"treeInputShiftRightButton\" data-dojo-props=\"iconClass:'editActionIcon treeInputShiftRightIcon', showLabel:false\">{shiftRight}</button>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div id=\"previewPanelGridContentPane\" data-dojo-type=\"dijit.layout.ContentPane\" layoutAlign=\"client\" class=\"previewPanelGridContentPane\">\r\n\t\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div data-dojo-type=\"dijit.layout.BorderContainer\" data-dojo-props=\"region:'trailing', design:'headline', gutters:false, liveSplitters:false, splitter:true\" class=\"previewPanelTrailingContentPane\">\r\n\t\t\t\t<div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region:'top'\" class=\"previewPanelSectionLabelContainer\"> \r\n\t\t\t\t\t<div>{nodeProperties}</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region:'center'\" class=\"previewPanelNodePropsPaneCenter\">\r\n\t\t\t\t\t<div class=\"previewPanelNodePropsDiv\"> \r\n\t\t\t\t\t\t<table cellspacing=\"5px\" class=\"previewPanelNodePropsTable\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td><label>{idLabel}</label></td> \r\n\t\t\t\t\t\t\t<td><label id=\"treeInputFieldOutput\"></label></td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td><label for=\"treeInputLabelInput\">{labelLabel}</label></td>\r\n\t\t\t\t\t\t\t<td><input id=\"treeInputLabelInput\" data-dojo-type=\"dijit.form.TextBox\" type=\"text\" disabled=\"disabled\" intermediateChanges=\"true\" class=\"previewPanelNodeInputField\"></input></td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr id=\"treeInputIconInputRow\">\r\n\t\t\t\t\t\t\t<td><label for=\"treeInputIconInput\">{iconLabel}</label></td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<div id=\"treeInputIconInput\" data-dojo-type=\"davinci.ui.widgets.FileFieldDialog\" disabled=\"disabled\" intermediateChanges=\"true\" class=\"previewPanelNodeInputField\"></div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr id=\"treeInputOpenIconInputRow\">\r\n\t\t\t\t\t\t\t<td><label for=\"treeInputOpenIconInput\">{openIconLabel}</label></td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<div id=\"treeInputOpenIconInput\" data-dojo-type=\"davinci.ui.widgets.FileFieldDialog\" disabled=\"disabled\" intermediateChanges=\"true\" class=\"previewPanelNodeInputField\"></div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td><label for=\"treeOnClickInput\">{onClickLabel}</label></td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<div data-dojo-type='davinci.ve.widgets.MetaDataStore' jsId=\"treeOnClickInputStore\"></div>\r\n\t\t\t\t\t\t\t\t<input id=\"treeOnClickInput\" data-dojo-type=\"dijit.form.ComboBox\" data-dojo-props=\"store:treeOnClickInputStore\" type=\"text\" disabled=\"disabled\" intermediateChanges=\"true\" class=\"previewPanelNodeInputField\"></input>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td><label for=\"treeOnDblClickInput\">{onDblClickLabel}</label></td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<div data-dojo-type='davinci.ve.widgets.MetaDataStore' jsId=\"treeOnDblClickInputStore\"></div>\r\n\t\t\t\t\t\t\t\t<input id=\"treeOnDblClickInput\" data-dojo-type=\"dijit.form.ComboBox\" data-dojo-props=\"store:treeOnDblClickInputStore\" type=\"text\" disabled=\"disabled\" intermediateChanges=\"true\" class=\"previewPanelNodeInputField\"></input>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td><label for=\"treeOnCloseInput\">{onCloseLabel}</label></td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<div data-dojo-type='davinci.ve.widgets.MetaDataStore' jsId=\"treeOnCloseInputStore\"></div>\r\n\t\t\t\t\t\t\t\t<input id=\"treeOnCloseInput\" data-dojo-type=\"dijit.form.ComboBox\" data-dojo-props=\"store:treeOnCloseInputStore\" type=\"text\" disabled=\"disabled\" intermediateChanges=\"true\" class=\"previewPanelNodeInputField\"></input>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td><label for=\"treeOnOpenInput\">{onOpenLabel}</label></td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<div data-dojo-type='davinci.ve.widgets.MetaDataStore' jsId=\"treeOnOpenInputStore\"></div>\r\n\t\t\t\t\t\t\t\t<input id=\"treeOnOpenInput\" data-dojo-type=\"dijit.form.ComboBox\" data-dojo-props=\"store:treeOnOpenInputStore\" type=\"text\" disabled=\"disabled\" intermediateChanges=\"true\" class=\"previewPanelNodeInputField\"></input>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table> \r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t</div>\r\n  </div>\r\n  <div class=\"dijitDialogPaneActionBar\">\r\n\t\t<button data-dojo-type=\"dijit.form.Button\" id=\"treeInputOkButton\" class=\"maqPrimaryButton\" type=\"submit\">{buttonOk}</button>\r\n\t\t<button data-dojo-type=\"dijit.form.Button\" id=\"treeInputCancelButton\" class=\"maqSecondaryButton\">{buttonCancel}</button>\r\n\t</div>\r\n</div>"}});
define("maq-metadata-dojo/dijit/TreeInput",["dojo/_base/declare","davinci/Runtime","davinci/Workbench","./layout/ContainerInput","./TreeHelper","davinci/ve/widget","davinci/ve/commands/ModifyCommand","davinci/ve/commands/ModifyAttributeCommand","davinci/commands/OrderedCompoundCommand","davinci/ve/widgets/EventSelection","davinci/ve/widgets/BackgroundDialog","davinci/ve/utils/CssUtils","dijit/Tree","dojo/store/Memory","dojo/store/Observable","dijit/tree/ObjectStoreModel","dijit/tree/dndSource","dojo/text!./templates/treeInput.html","davinci/css!./templates/treeInput.css","dojo/i18n!./nls/dijit","dojo/i18n!dijit/nls/common","dijit/layout/ContentPane","dijit/layout/BorderContainer","dijit/layout/LayoutContainer","dijit/form/Button","dijit/Toolbar","dijit/ToolbarSeparator","dijit/form/TextBox","dijit/form/ComboBox","davinci/ve/widgets/MetaDataStore","davinci/ui/widgets/FileFieldDialog"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15){
var _16=_1(_e,{put:function(_17,_18){
if(_18){
if(_18.parent){
_17.parent=_18.parent.id;
if(!_18.before){
this.remove(_17.id);
}
}
if(_18.before){
data=this.data;
index=this.index,idProperty=this.idProperty;
var id=_17[idProperty]=(_18&&"id" in _18)?_18.id:idProperty in _17?_17[idProperty]:Math.random();
if(id in index){
this.remove(id);
}
index=this.index;
var _19=_18.before.id;
if(_19 in index){
data.splice(index[_19],0,_17);
this.setData(data);
}
}
}
return this.inherited(arguments);
}});
var _1a=_1(_10,{newItem:function(_1b,_1c,_1d,_1e){
this.inherited(arguments);
this._parentChildrenChanged(_1c);
},pasteItem:function(_1f,_20,_21,_22,_23,_24){
this.inherited(arguments);
if(_21&&(_20!=_21)){
this._parentChildrenChanged(_21);
}else{
this._parentChildrenChanged(_20);
}
},_parentChildrenChanged:function(_25){
delete this.childrenCache[this.getIdentity(_25)];
var _26=function(_27){
this.onChildrenChange(_25,_27);
}.bind(this);
var _28=function(){
console.error("CustomObjectStoreModel._parentChildrenChanged: problem getting children for parent = "+this.getIdentity(_25));
};
this.getChildren(_25,_26,_28);
}});
var _29=_1(_d,{treeInput:null,getIconStyle:function(_2a,_2b){
var _2c=_2a.iconStyle?"iconStyle":null;
if(_2b&&_2a.iconStyleOpen){
_2c="iconStyleOpen";
}
if(_2c){
var _2d=this.treeInput._getDisplayValueFromStore(_2c,_2a);
var _2e=_b.getCSSForWorkspaceURL(this.treeInput._getBaseLocation(),_2d);
retVal={backgroundImage:_2e};
}else{
retVal={backgroundImage:null};
}
return retVal;
}});
return _1(_4,{_substitutedMainTemplate:null,_isLegacy:false,constructor:function(_2f){
this._nodePropWidgetMetadata=[{widgetId:"treeInputLabelInput",fieldId:"label",type:"label"},{widgetId:"treeInputIconInput",fieldId:"iconStyle",type:"icon"},{widgetId:"treeInputOpenIconInput",fieldId:"iconStyleOpen",type:"icon"},{widgetId:"treeOnClickInput",fieldId:"onClick",type:"event"},{widgetId:"treeOnDblClickInput",fieldId:"onDblClick",type:"event"},{widgetId:"treeOnCloseInput",fieldId:"onClose",type:"event"},{widgetId:"treeOnOpenInput",fieldId:"onOpen",type:"event"}];
this._treeHelper=new _5();
},show:function(_30){
this._widget=_6.byId(_30);
function _31(){
if(this._isNodePropertyInputValid()){
this.updateWidget();
}
};
this._inline=_3.showModal(this._getTemplate(),_14.treeDialog,{width:800,height:475},dojo.hitch(this,_31));
this._configureInputControls();
var _32=dijit.byId("treeInputCancelButton");
this._connection.push(dojo.connect(_32,"onClick",function(){
this.onCancel();
}.bind(this)));
if(this._widget.inLineEdit_displayOnCreate){
delete this._widget.inLineEdit_displayOnCreate;
dojo.style(_32.domNode,"display","none");
}
this._currentId=0;
this._updateToolbarButtonEnablement();
},_configureInputControls:function(){
var _33=_6.byId(this._widget._srcElement.getAttribute("model"));
var _34=_33.getData();
var _35=_6.byId(_33._srcElement.getAttribute("store"));
var _36=_35.getData();
var _37=this._widget.getData();
var _38=null;
if(_36.type=="dojo.store.Memory"){
_38=_36.properties.data;
}else{
if(_36.type=="dojo.data.ItemFileReadStore"){
this._isLegacy=true;
var _39={"id":"treeRoot","label":"Root"};
_38=[_39];
this._getRelationalFormat(_39,_36.properties.data.items,_38);
}
}
var _3a=new _16({data:_38});
this._treeHelper._addStoreFunctions(_3a);
var _3b=this._observablePreviewStore=new _f(_3a);
var _3c=this._previewModel=new _1a({labelAttr:_34.properties.labelAttr?_34.properties.labelAttr:"label",query:_34.properties.query,store:_3b});
this._treeHelper._addModelFunctions(_3c);
this._connection.push(dojo.connect(_3c,"onChildrenChange",function(_3d,_3e){
if(_3e.length==0&&!_3d.leaf){
_3d.leaf=true;
}else{
if(_3e.length>0&&_3d.leaf){
_3d.leaf=false;
}
}
}.bind(this)));
var _3f=this._previewTree=new _29({showRoot:_37.properties.showRoot!=false,autoExpand:_37.properties.autoExpand,model:_3c,dndController:_11,betweenThreshold:5,treeInput:this});
var _40=dijit.byId("previewPanelGridContentPane");
_40.set("content",_3f);
this._connection.push(_3f.watch("selectedItems",function(_41,_42,_43){
this._handleSelectionChanged(_43);
}.bind(this)));
this._setupToolbarButtons();
this._setupNodePropertyInputs();
},_setupToolbarButtons:function(){
var _44=this._observablePreviewStore;
var _45=dijit.byId("treeInputAddChildButton");
this._connection.push(dojo.connect(_45,"onClick",function(){
if(!this._isNodePropertyInputValid()){
return;
}
this._addItem(this._selectedItem);
}.bind(this)));
var _46=dijit.byId("treeInputInsertBeforeButton");
this._connection.push(dojo.connect(_46,"onClick",function(){
if(!this._isNodePropertyInputValid()){
return;
}
if(this._selectedItem){
this._addItem(_44.get(this._selectedItem.parent),this._selectedItem);
}
}.bind(this)));
var _47=dijit.byId("treeInputInsertAfterButton");
this._connection.push(dojo.connect(_47,"onClick",function(){
if(!this._isNodePropertyInputValid()){
return;
}
var _48=this._selectedItem;
if(_48){
var _49=this._getItemAfter(_48,true);
var _4a=_44.get(_48.parent);
this._addItem(_4a,_49);
}
}.bind(this)));
var _4b=dijit.byId("treeInputDeleteButton");
this._connection.push(dojo.connect(_4b,"onClick",function(){
if(this._selectedItem){
var _4c=this._getItemAfter(this._selectedItem);
if(!_4c){
_4c=this._getItemBefore(this._selectedItem);
}
this._removeItemAndChildren(this._selectedItem);
if(_4c){
this._selectAndScrollToItem(_4c);
}
}
}.bind(this)));
var _4d=dijit.byId("treeInputMoveUpButton");
this._connection.push(dojo.connect(_4d,"onClick",function(){
if(!this._isNodePropertyInputValid()){
return;
}
var _4e=this._selectedItem;
if(_4e){
var _4f=this._getItemBefore(_4e);
if(_4f){
var _50=_44.get(_4e.parent);
var _51=_44.get(_4f.parent);
this._moveItem(_4e,_50,_51,_4f);
}
}
}.bind(this)));
var _52=dijit.byId("treeInputMoveDownButton");
this._connection.push(dojo.connect(_52,"onClick",function(){
if(!this._isNodePropertyInputValid()){
return;
}
var _53=this._selectedItem;
if(_53){
var _54=this._getItemAfter(_53);
if(_54){
_54=this._getItemAfter(_54);
}
var _55=_44.get(_53.parent);
var _56=_54?_44.get(_54.parent):_55;
this._moveItem(_53,_55,_56,_54);
}
}.bind(this)));
var _57=dijit.byId("treeInputShiftLeftButton");
this._connection.push(dojo.connect(_57,"onClick",function(){
if(!this._isNodePropertyInputValid()){
return;
}
var _58=this._selectedItem;
if(_58){
var _59=_44.get(_58.parent);
var _5a=_44.get(_59.parent);
var _5b=this._getItemAfter(_59,true);
this._moveItem(_58,_59,_5a,_5b);
}
}.bind(this)));
var _5c=dijit.byId("treeInputShiftRightButton");
this._connection.push(dojo.connect(_5c,"onClick",function(){
if(!this._isNodePropertyInputValid()){
return;
}
var _5d=this._selectedItem;
if(_5d){
var _5e=this._getItemBefore(_5d,true);
if(_5e){
var _5f=_44.get(_5d.parent);
var _60=_5e;
this._moveItem(_5d,_5f,_60);
}
}
}.bind(this)));
},_updateToolbarButtonEnablement:function(){
var _61=this._observablePreviewStore;
var _62=this._selectedItem;
var _63=dijit.byId("treeInputAddChildButton");
var _64=true;
_63.set("disabled",!_64);
var _65=dijit.byId("treeInputInsertBeforeButton");
_64=_62&&_62.parent;
_65.set("disabled",!_64);
var _66=dijit.byId("treeInputInsertAfterButton");
_64=_62&&_62.parent;
_66.set("disabled",!_64);
var _67=dijit.byId("treeInputDeleteButton");
_64=_62&&_62.parent;
_67.set("disabled",!_64);
var _68=dijit.byId("treeInputMoveUpButton");
_64=false;
if(_62&&_62.parent){
var _69=this._getItemBefore(this._selectedItem);
_64=this._selectedItem&&_69&&_61.getIdentity(_69)!="treeRoot";
}
_68.set("disabled",!_64);
var _6a=dijit.byId("treeInputMoveDownButton");
_64=false;
if(_62&&_62.parent){
_64=this._selectedItem&&this._getItemAfter(this._selectedItem);
}
_6a.set("disabled",!_64);
var _6b=dijit.byId("treeInputShiftLeftButton");
_64=false;
if(_62&&_62.parent){
var _6c=_61.get(this._selectedItem.parent);
var _6d=_61.get(_6c.parent);
_64=this._selectedItem&&_6d;
}
_6b.set("disabled",!_64);
var _6e=dijit.byId("treeInputShiftRightButton");
_64=false;
if(_62&&_62.parent){
_69=this._getItemBefore(this._selectedItem,true);
_64=this._selectedItem&&_69&&_61.getIdentity(_69)!="treeRoot";
}
_6e.set("disabled",!_64);
},_getItemAfter:function(_6f,_70){
var _71=this._observablePreviewStore;
var _72=null;
var _73=_71.get(_6f.parent);
if(_73){
var _74=_71.getChildren(_73);
var _75=0;
dojo.some(_74,function(_76){
if(_71.getIdentity(_76)==_71.getIdentity(_6f)){
return true;
}
_75++;
});
if(_75<_74.length-1){
_72=_74[_75+1];
}else{
if(!_70){
_72=this._getItemAfter(_73);
if(_72){
return this._getItemAfter(_72);
}
}
}
}
return _72;
},_getItemBefore:function(_77,_78){
var _79=this._observablePreviewStore;
var _7a=null;
var _7b=_79.get(_77.parent);
if(_7b){
var _7c=_79.getChildren(_7b);
var _7d=0;
dojo.some(_7c,function(_7e){
if(_79.getIdentity(_7e)==_79.getIdentity(_77)){
return true;
}
_7d++;
});
if(_7d>0){
_7a=_7c[_7d-1];
}else{
if(!_78){
_7a=_7b;
}
}
}
return _7a;
},_addItem:function(_7f,_80){
var _81=this._observablePreviewStore;
var _82=this._previewModel;
var _83=this._getUniqueId();
var _84={id:_83,leaf:true};
_84[_82.labelAttr]=dojo.replace(_14.newNodeName,[_83]);
_82.newItem(_84,_7f?_7f:_81.get("treeRoot"),-1,_80);
this._selectAndScrollToItem(_84);
},_removeItemAndChildren:function(_85){
var _86=this._observablePreviewStore;
var _87=_86.getIdentity(_85);
_86.remove(_87);
var _88=_86.query({parent:_87});
dojo.forEach(_88,function(_89){
this._removeItemAndChildren(_89);
}.bind(this));
},_moveItem:function(_8a,_8b,_8c,_8d){
var _8e=this._previewModel;
_8e.pasteItem(_8a,_8b,_8c,false,-1,_8d);
this._selectAndScrollToItem(_8a);
},_getUniqueId:function(){
this._currentId++;
while(this._observablePreviewStore.get(this._currentId.toString())){
this._currentId++;
}
return this._currentId.toString();
},_selectAndScrollToItem:function(_8f){
var _90=this._observablePreviewStore;
var _91=this._previewTree;
var _92=[];
var _93=_8f;
while(_93){
_92.unshift(_93.id);
if(_93.parent){
_93=_90.get(_93.parent);
}else{
_93=null;
}
}
_91.set("path",_92).then(function(){
var _94=_91.get("path");
var _95=_94[_94.length-1];
var _96=_91.getNodesByItem(_95);
_91.focusNode(_96[0]);
});
},_handleSelectionChanged:function(_97){
if(this._selectedItem&&!this._isNodePropertyInputValid()){
return;
}
if(_97.length==1){
this._selectedItem=_97[0];
this._populateNodeProperties();
}else{
this._selectedItem=null;
this._clearNodeProperties();
}
this._updateToolbarButtonEnablement();
},_setupNodePropertyInputs:function(){
var _98=dijit.byId("treeInputIconInput");
_98.set("baseLocation",this._getBaseLocation());
_98.set("intermediateChanges",true);
_98=dijit.byId("treeInputOpenIconInput");
_98.set("baseLocation",this._getBaseLocation());
_98.set("intermediateChanges",true);
dojo.forEach(this._nodePropWidgetMetadata,function(_99){
if(_99.type==="event"){
this._addOptionsForEventField(_99.widgetId);
}
}.bind(this));
dojo.forEach(this._nodePropWidgetMetadata,function(_9a){
this._setupTextFieldChangeListener(_9a.widgetId,_9a.fieldId);
}.bind(this));
if(this._isLegacy){
var row=dojo.byId("treeInputIconInputRow");
dojo.style(row,"display","none");
row=dojo.byId("treeInputOpenIconInputRow");
dojo.style(row,"display","none");
}
},_getBaseLocation:function(){
return this._widget._edit_context._srcDocument.fileName;
},_setupTextFieldChangeListener:function(_9b,_9c){
var _9d=dijit.byId(_9b);
this._connection.push(dojo.connect(_9d,"onChange",function(_9e){
this._handleTextFieldChanged(_9c,_9e);
}.bind(this)));
},_clearNodeProperties:function(){
var _9f=dojo.byId("treeInputFieldOutput");
_9f.innerHTML="";
dojo.forEach(this._nodePropWidgetMetadata,function(_a0){
this._populateNodeProperty(_a0.widgetId,"",true);
}.bind(this));
},_populateNodeProperties:function(){
var _a1=this._selectedItem;
if(_a1){
var _a2=dojo.byId("treeInputFieldOutput");
_a2.innerHTML=this._selectedItem.id;
dojo.forEach(this._nodePropWidgetMetadata,function(_a3){
var _a4=this._getDisplayValueFromStore(_a3.fieldId,_a1);
this._populateNodeProperty(_a3.widgetId,_a4,false);
}.bind(this));
var _a5=dijit.byId("treeInputOpenIconInput");
_a5.set("disabled",_a1.leaf);
}
},_populateNodeProperty:function(_a6,_a7,_a8){
var _a9=dijit.byId(_a6);
_a9.set("value",_a7?_a7:"");
_a9.set("disabled",_a8?_a8:false);
},_addOptionsForEventField:function(_aa){
var _ab=_a.getEventSelectionValues(this._widget.getContext().rootNode);
var _ac=dijit.byId(_aa);
var _ad=_ac.get("store");
_ad.setValues(_ab);
},_handleTextFieldChanged:function(_ae,_af){
if(this._selectedItem){
var _b0=this._getFieldValueToStore(_ae,_af);
this._selectedItem[_ae]=_b0;
this._observablePreviewStore.put(this._selectedItem);
}
},_getFieldValueToStore:function(_b1,_b2){
if(_b2&&_b2.trim()!=""){
if(this._getWidgetTypeFromFieldId(_b1)==="icon"){
var _b3="url('"+_b2+"')";
var _b4={};
_b4["backgroundImage"]=_b3;
_b2=_b4;
}else{
if(this._getWidgetTypeFromFieldId(_b1)==="event"){
_b2=_a.getEventScriptFromValue(_b2);
}
}
}else{
_b2=null;
}
return _b2;
},_getWidgetTypeFromFieldId:function(_b5){
var _b6=null;
dojo.some(this._nodePropWidgetMetadata,function(_b7){
if(_b7.fieldId==_b5){
_b6=_b7.type;
return true;
}
}.bind(this));
return _b6;
},_getDisplayValueFromStore:function(_b8,_b9){
var _ba=_b9[_b8];
if(_ba){
if(this._getWidgetTypeFromFieldId(_b8)==="icon"){
var _bb=_ba["backgroundImage"];
if(_bb){
var _bc=_c.parseBackgroundImage(_bb);
_ba=(_bc&&_bc.url)?_bc.url:"";
}
}else{
if(this._getWidgetTypeFromFieldId(_b8)==="event"){
_ba=_a.getValueFromEventScript(_ba);
}
}
}
return _ba;
},hide:function(_bd){
if(this._inline){
var _be;
while(_be=this._connection.pop()){
dojo.disconnect(_be);
}
this._inline.destroyRecursive();
delete this._inline;
}
this.inherited(arguments);
},updateWidget:function(){
var _bf=new _9();
var _c0=_6.byId(this._widget._srcElement.getAttribute("model"));
var _c1=_6.byId(_c0._srcElement.getAttribute("store"));
var _c2=_c1.getData();
var _c3=this._observablePreviewStore;
var _c4=null;
if(_c2.type=="dojo.store.Memory"){
_c4=_c3.data;
}else{
if(_c2.type=="dojo.data.ItemFileReadStore"){
_c4=this._getDataForItemFileReadStore(_c3);
}
}
var _c5={data:_c4};
var _c6=new _7(_c1,_c5);
_bf.add(_c6);
var _c7=this._widget.getContext().getGlobal();
_c7["require"](["dojo/store/Memory","dijit/tree/ObjectStoreModel","dojo/data/ItemFileReadStore","dijit/tree/ForestStoreModel"],function(_c8,_c9,_ca,_cb){
var _cc={data:_c5.data};
var _cd=null;
if(_c2.type=="dojo.store.Memory"){
_cd=new _c8(_cc);
this._treeHelper._addStoreFunctions(_cd);
}else{
if(_c2.type=="dojo.data.ItemFileReadStore"){
_cd=new _ca(_cc);
}
}
_cd.id=_c1.id;
_cd.jsId=_cd.id;
var _ce={store:_cd};
var _cf=new _7(_c0,_ce);
_bf.add(_cf);
var _d0=_c0.getData();
var _d1=null;
if(_d0.type=="dijit.tree.ObjectStoreModel"){
_d1=new _c9({query:_d0.properties.query,labelAttr:_d0.properties.labelAttr,store:_cd});
this._treeHelper._addModelFunctions(_d1);
}else{
if(_d0.type=="dijit.tree.ForestStoreModel"){
_d1=new _cb({store:_cd});
}
}
_d1.id=_c0.id;
_d1.jsId=_d1.id;
var _d2={model:_d1};
_cf=new _7(this._widget,_d2,this._getUpdatedTreeChildren(this._widget));
_bf.add(_cf);
this._executeCommand(_bf);
}.bind(this));
},_getUpdatedTreeChildren:function(_d3){
var _d4=[];
var _d5=null;
if(!this._isLegacy){
_d5="var iconStyle = item.iconStyle;"+"if (opened && item.iconStyleOpen) {"+"\ticonStyle = item.iconStyleOpen;"+"};"+"return iconStyle;";
_d4.push(this._treeHelper._createScriptBlockData("dojo/method","getIconStyle","item, opened",_d5));
}
_d5=this._getJavaScriptForTreeEvent("onClick");
_d4.push(this._treeHelper._createScriptBlockData("dojo/connect","onClick","item, node, evt",_d5));
_d5=this._getJavaScriptForTreeEvent("onDblClick");
_d4.push(this._treeHelper._createScriptBlockData("dojo/connect","onDblClick","item, node, evt",_d5));
_d5=this._getJavaScriptForTreeEvent("onClose");
_d4.push(this._treeHelper._createScriptBlockData("dojo/connect","onClose","item, node",_d5));
_d5=this._getJavaScriptForTreeEvent("onOpen");
_d4.push(this._treeHelper._createScriptBlockData("dojo/connect","onOpen","item, node",_d5));
return _d4;
},_getJavaScriptForTreeEvent:function(_d6){
var _d7=null;
if(this._isLegacy){
_d7="var eventStr = this.model.store.getValue(item, '"+_d6+"');"+"if (eventStr) {"+"\tdojo.eval(eventStr);"+"}";
}else{
_d7="var eventStr = item['"+_d6+"'];"+"if (eventStr) { "+"\tdojo.eval(eventStr);"+"}";
}
return _d7;
},_executeCommand:function(_d8){
var _d9=this._getContext();
_d9.getCommandStack().execute(_d8);
dojo.some(_d8._commands,function(_da){
if(_da.newWidget&&_da.newWidget.type==="dijit.Tree"){
var _db=_da.newWidget;
_d9.select(_db);
this._treeHelper._updateTreeSelectionChrome(_d9,_db);
return true;
}
}.bind(this));
},_isNodePropertyInputValid:function(){
return true;
},_getTemplate:function(){
if(!this._substitutedMainTemplate){
this._substitutedMainTemplate=dojo.replace(_12,{preview:_14.preview,previewNote:_14.previewNote,nodeProperties:_14.nodeProperties,idLabel:_14.idLabel,labelLabel:_14.labelLabel,iconLabel:_14.iconLabel,openIconLabel:_14.openIconLabel,onClickLabel:_14.onClickLabel,onDblClickLabel:_14.onDblClickLabel,onCloseLabel:_14.onCloseLabel,onOpenLabel:_14.onOpenLabel,addChild:_14.addChild,insertBefore:_14.insertBefore,insertAfter:_14.insertAfter,remove:_14.remove,moveUp:_14.moveUp,moveDown:_14.moveDown,shiftLeft:_14.shiftLeft,shiftRight:_14.shiftRight,buttonOk:_15.buttonOk,buttonCancel:_15.buttonCancel,});
}
return this._substitutedMainTemplate;
},_getRelationalFormat:function(_dc,_dd,_de){
dojo.forEach(_dd,function(_df){
var _e0=dojo.clone(_df);
_e0.id=_e0.id.toString();
_e0.parent=_dc.id;
var _e1=_e0.children;
_de.push(_e0);
if(_e1){
this._getRelationalFormat(_e0,_e1,_de);
delete _e0.children;
}
_e0.leaf=!_e1||_e1.length==0;
}.bind(this));
},_getDataForItemFileReadStore:function(_e2){
var _e3=this._getBaseDataForItemFileReadStore();
var _e4=_e2.query({id:"treeRoot"});
var _e5=_e2.query({parent:"treeRoot"});
this._getChildrenFormat(_e2,_e4[0],_e5,_e3.items);
return _e3;
},_getChildrenFormat:function(_e6,_e7,_e8,_e9){
dojo.forEach(_e8,function(_ea){
var _eb=this._widget.getContext().getGlobal();
var _ec=_eb.eval("new Object()");
dojo.mixin(_ec,_ea);
delete _ec.parent;
delete _ec.leaf;
if(_e6.getIdentity(_e7)!="treeRoot"){
if(!_e7.children){
_e7.children=[];
}
_e7.children.push(_ec);
}else{
_e9.push(_ec);
}
var _ed=_e6.query({parent:_ea.id});
if(_ed){
this._getChildrenFormat(_e6,_ec,_ed,_e9);
}
}.bind(this));
},_getBaseDataForItemFileReadStore:function(){
var _ee={identifier:"id",label:"label",items:[],__json__:function(){
var _ef={};
for(attr in this){
if(this.hasOwnProperty(attr)){
if(attr!="__json__"&&attr!="children"&&attr!="items"){
_ef[attr]=this[attr];
}
}
}
if(this.items||this.children){
var _f0=this.items||this.children;
var _f1=arguments.callee;
_f0=dojo.map(_f0,function(_f2){
var _f3=dojo.mixin({},_f2);
_f3.__json__=_f1;
delete _f3._0;
delete _f3._RI;
delete _f3._S;
return _f3;
});
if(this.items){
_ef.items=_f0;
}else{
if(this.children){
_ef.children=_f0;
}
}
}
return _ef;
}};
return _ee;
},resize:function(){
dijit.byId("treeInputBorderContainer").resize();
}});
});
