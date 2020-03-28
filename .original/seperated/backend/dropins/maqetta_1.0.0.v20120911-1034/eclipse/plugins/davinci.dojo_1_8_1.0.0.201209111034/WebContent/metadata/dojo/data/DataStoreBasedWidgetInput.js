//>>built
require({cache:{"url:maq-metadata-dojo/dojo/data/templates/dojoStoreBasedWidgetInput.html":"<div id=\"davinciDataGridSmartInputFolderDiv\" class=\"smartInputDataGridFolderDiv\"> \n  <table id=\"davinci.ve.input.DataGridInput_table\"> \n    <tbody> \n      <tr>\n        <td></td> \n        <td>\n          <select id=\"davinci.ve.input.DataGridInput.dataStoreType\" name=\"davinci.ve.input.DataGridInput.dataStoreType\" dojoType=\"dojox.form.DropDownSelect\" style=\"width:15em;\"> \n            <option value=\"dummyData\">{commaSeparatedData}</option> \n            <option value=\"file\">{dataFromWorkspace}</option> \n            <option value=\"url\">{dataFromJsonpURL}</option> \n          </select>\n        </td>\n        <td></td> \n      </tr>\t\n    </tbody> \n  </table> \n</div>\n<div id=\"iedResizeDiv\"  class=\"iedResizeDiv\"> \n  <textarea  dojoType=\"dijit.form.SimpleTextarea\" name=\"davinciIleb\"  trim=\"true\" id=\"davinciIleb\" class=\"smartInputTextAreaMulti\"></textarea>\n  <div id=\"smartInputSim\" class=\"smartInputSim\" style=\"display:none;\"></div>\n  <span id=\"davinci.ve.input.DataGridInput_img_folder\"  title=\"Folder\" class=\"inlineEditFolder\"> </span>\n  <div id=\"iedResizeHandle\" dojoType=\"dojox.layout.ResizeHandle\" targetId=\"iedResizeDiv\" constrainMin=\"true\" maxWidth=\"200\" maxHeight=\"600\" minWidth=\"240\" minHeight=\"40\"  activeResize=\"true\" intermediateChanges=\"true\"></div>\n</div>\n<div id=\"davinci.ve.input.SmartInput_div\"  class=\"davinciVeInputSmartInputDiv\"> \n  <div id=\"davinci.ve.input.SmartInput_radio_div\" class=\"smartInputRadioDiv\"> \n    <table id=\"davinci.ve.input.SmartInput_table\"> \n      <tbody> \n        <tr> \n          <td class=\"smartInputTd1\"> \n            <input id=\"davinci.ve.input.SmartInput_radio_text\" showlabel=\"true\" type=\"radio\" dojoType=\"dijit.form.RadioButton\" disabled=\"false\" readOnly=\"false\" intermediateChanges=\"false\" checked=\"true\"> </input> \n          </td> \n          <td class=\"smartInputTd2\"> \n            <div id=\"davinci.ve.input.SmartInput_radio_text_width_div\" class=\"smartInputRadioTextDiv\"></div>\n          </td> \n        </tr>\n        <tr> \n          <td class=\"smartInputTd1\"> <input id=\"davinci.ve.input.SmartInput_radio_html\" showlabel=\"true\" type=\"radio\" dojoType=\"dijit.form.RadioButton\"> </input>  </td> \n          <td class=\"smartInputTd2\">\n            <div id=\"davinci.ve.input.SmartInput_radio_html_width_div\" class=\"smartInputRadioTextDiv\">\n            </div>\n          </td> \n        </tr> \n        <tr id=\"davinci.ve.input.SmartInput_callback\"> \n          <td class=\"smartInputTd1\">{callbackParameter}</td> \n          <td class=\"smartInputTd2\">\n            <input type=\"text\" name=\"davinci.ve.input.SmartInput_callback_editbox\" value=\"callback\" data-dojo-type=\"dijit.form.TextBox\" data-dojo-props=\"trim:true\" id=\"davinci.ve.input.SmartInput_callback_editbox\">\n          </td> \n        </tr> \n      </tbody> \n    </table> \n    <div class=\"smartInputHelpDiv\"> \n      <span id=\"davinci.ve.input.SmartInput_img_help\"  title=\"Help\" class=\"inlineEditHelp\"> </span>\n      <span class=\"smartInputSpacerSpan\">\n      <button id=\"davinci.ve.input.SmartInput_ok\"  dojoType=\"dijit.form.Button\" type=\"submit\" class=\"inlineEditHelpOk\">{buttonOk}</button> <button id=davinci.ve.input.SmartInput_cancel dojoType=\"dijit.form.Button\" class=\"inlineEditHelpCancel\">{buttonCancel}</button>  \n      </span>   \n    </div> \n    <div id=\"davinci.ve.input.SmartInput_div_help\" style=\"display:none;\" class=\"smartInputHelpTextDiv\"> \n      <div dojoType=\"dijit.layout.ContentPane\" class=\"smartInputHelpTextDivContentPane\" style=\"padding:0;\">{helpText}</div> \n      <div style=\"text-align: left; padding:0; height:2px;\"></div> \n    </div> \n  </div> \n</div> \n\n"}});
define("maq-metadata-dojo/dojo/data/DataStoreBasedWidgetInput",["dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/dom-style","dojo/dom","dojo/dom-class","dijit/registry","davinci/ve/input/SmartInput","davinci/ve/widget","davinci/ve/commands/ModifyCommand","davinci/ve/commands/ModifyAttributeCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/RemoveCommand","davinci/commands/OrderedCompoundCommand","davinci/model/Path","davinci/ui/Dialog","davinci/ui/widgets/OpenFile","dijit/layout/ContentPane","dijit/form/Button","system/resource","dojo/dom-attr","dojo/i18n!dijit/nls/common","dojo/i18n!../../dojox/nls/dojox","dojo/text!./templates/dojoStoreBasedWidgetInput.html","davinci/ve/utils/URLRewrite","dojox/form/DropDownSelect","davinci/css!./templates/dojoStoreBasedWidgetInput.css",],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19){
setPropInDataDojoProps=function(_1a,_1b,_1c){
var _1d="";
if(_1a){
if(_1b==="structure"){
_1c=_1e(_1c);
}
var _1f=_1a.match(/\[.*\]/g);
if(_1f&&_1f.length==1){
_1a=_1a.replace(_1f[0],"${"+0+"}");
}
var _20=_1a.split(",");
var _21=false;
dojo.some(_20,function(_22,_23){
var _24=_22.split(":");
if(_24[0].trim()===_1b){
_24[1]=_1c;
_20[_23]=_24.join(":");
_21=true;
return _21;
}
});
if(!_21){
_20.push(_1b+":"+_1c);
}
_1d=_20.join(",");
if(_1f&&_1f.length==1){
_1d=_1d.replace("${"+0+"}",_1f[0]);
}
}else{
_1d=_1b+":"+_1c;
}
return _1d;
};
var _1e=function(_25){
var _26=[];
dojo.forEach(_25,function(_27){
var _28=[];
for(name in _27){
if(_27.hasOwnProperty(name)){
if(name!="cellType"){
_28.push(name+":'"+_27[name].trim()+"'");
}
}
}
_26.push("{"+_28.join(",")+"}");
});
var _29="["+_26.join(",")+"]";
return _29;
};
getStoreId=function(_2a){
var _2b="";
if(_2a.dijitWidget&&_2a.dijitWidget.store){
var _2c=_2a.dijitWidget.store;
_2b=_2c.id?_2c.id:_2c._edit_object_id;
}
return _2b;
};
var _2d=_1(_8,{displayOnCreate:"true",delimiter:", ",multiLine:"true",supportsHTML:"false",helpText:"If the CSV data format is selected enter text in the format: first line is column headers separated by commas all following lines are data for those columns."+" If data file from workspace is selected chose a json item file using the file explore folder.",_substitutedMainTemplate:null,_dataType:null,_useDataDojoProps:false,supportsEscapeHTMLInData:true,_embeddingContentPane:null,_getContainer:function(_2e){
while(_2e){
if((_2e.isContainer||_2e.isLayoutContainer)&&_2e.declaredClass!="dojox.layout.ScrollPane"){
return _2e;
}
_2e=_9.getParent(_2e);
}
return undefined;
},_getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},_getContext:function(){
var _2f=this._getEditor();
return _2f&&(_2f.getContext&&_2f.getContext()||_2f.context);
},refreshStoreView:function(){
var _30=_7.byId("davinciIleb"),_31="";
this._widget.dijitWidget.store.fetch({query:this.query,queryOptions:{deep:true},onComplete:function(_32){
_32.forEach(function(_33){
_31+=_33.label[0];
if(_33.moveTo){
_31+=", "+_33.moveTo[0];
}
_31+="\n";
});
this._data=_31;
_30.attr("value",String(_31));
}.bind(this)});
},onOk:function(e){
if(this._fileSelectionDialog){
return;
}
this._dataType=null;
this.getUpdateWidgetCommand(this._executeCompoundCommand.bind(this));
this.hide();
},getUpdateWidgetCommand:function(_34){
this._dataType=null;
if(this._dataStoreType==="dummyData"){
this._getDummyDataUpdateWidgetCommand(_34);
}else{
if(this._dataStoreType==="file"){
this._format=this.getFormat();
compoundCommand=this._getUpdateWidgetForUrlStoreCommand(_34);
}else{
if(this._dataStoreType==="url"){
this._format=this.getFormat();
compoundCommand=this._getUpdateWidgetForUrlStoreJSONP(_34);
}
}
}
},hide:function(){
if(this._isEmbedded()){
if(this._inline){
var _35;
while(connection=this._connection.pop()){
dojo.disconnect(connection);
}
this._inline.destroyRecursive();
delete this._inline;
}
}else{
this.inherited(arguments,[true]);
}
},updateWidget:function(){
this._getDummyDataUpdateWidgetCommand(this._executeCompoundCommand.bind(this));
},_executeCompoundCommand:function(_36){
var _37=this._getContext();
_37.getCommandStack().execute(_36);
_37.select(this._getNewWidgetFromCompoundCommand(_36));
},_getDummyDataUpdateWidgetCommand:function(_38){
var _39=this._getContext();
var _3a=this._widget;
var _3b=this._getStoreId(_3a);
var _3c=_9.byId(_3b);
var _3d=new _e();
var _3e=new _d(_3c);
_3d.add(_3e);
var _3f=_3b;
if(_3c.type!="dojo.data.ItemFileReadStore"){
_3f=_9.getUniqueObjectId("dojo.data.ItemFileReadStore",_39.getDocument());
}
var _40={"type":"dojo.data.ItemFileReadStore","properties":{id:_3f,jsId:_3f,url:"",data:this.buildData()},context:_39,};
var _41=new _c(_40,_3a.getParent(),0);
_3d.add(_41);
var _42=this._widget.getContext().getGlobal();
_42["require"](["dojo/data/ItemFileReadStore"],function(_43){
var _44=new _43({data:_40.properties.data});
_44.id=_3f;
var _45=this._getPropsForDummyDataUpdateWidgetCommand(_3a);
_45=this._getPropsForNewStore(_3a,_44,_45);
var _46=new _a(_3a,_45,null,_39);
_3d.add(_46);
_38(_3d);
}.bind(this));
},_getPropsForDummyDataUpdateWidgetCommand:function(){
return {};
},_getPropsForNewStore:function(_47,_48,_49){
var _4a={};
if(_49){
_4a=dojo.mixin(_4a,_49);
}
if(_48){
if(this._useDataDojoProps){
var _4b=null;
if(_49){
_4b=_4a["data-dojo-props"];
}
if(!_4b){
var _4c=_47.getData();
_4b=_4c.properties["data-dojo-props"];
}
_4a["data-dojo-props"]=_2d.setPropInDataDojoProps(_4b,"store",_48.id);
}
_4a.store=_48;
}
return _4a;
},_getNewWidgetFromCompoundCommand:function(_4d){
var _4e=_4d._commands[_4d._commands.length-1];
return _4e.newWidget;
},updateWidgetForUrlStore:function(){
this._getUpdateWidgetForUrlStoreCommand(this._executeCompoundCommand.bind(this));
},_getUpdateWidgetForUrlStoreCommand:function(_4f){
var _50=_7.byId("davinciIleb");
this._url=_50.value;
var url=this._getFullUrl(this._url);
this._callback="";
var _51=function(_52){
this._urlDataStoreLoaded(_52,_4f);
};
var _53=function(){
this._getCsvStore(url,this.query,_4f);
};
var _54=this._widget.getContext().getGlobal();
_54["require"](["dojo/data/ItemFileReadStore"],function(_55){
var _56=this._urlDataStore=new _55({url:url});
_56.fetch({query:this.query,queryOptions:{deep:true},onComplete:_51.bind(this),onError:_53.bind(this)});
}.bind(this));
},_getCsvStore:function(url,_57,_58){
this._dataType="csv";
var _59=function(_5a){
this._urlDataStoreLoaded(_5a,_58);
};
var _5b=this._widget.getContext().getGlobal();
_5b["require"](["dojox/data/CsvStore"],function(_5c){
var _5d=this._urlDataStore=new _5c({url:url});
_5d.fetch({query:_57,queryOptions:{deep:true},onComplete:_59.bind(this),onError:function(e){
console.error("DataStoreBasedWidgetInput._getCsvStore error using url = "+url+"; e = "+e);
alert("File "+e);
}});
}.bind(this));
},updateWidgetForUrlStoreJSONP:function(){
this._getUpdateWidgetForUrlStoreJSONP(this._executeCompoundCommand.bind(this));
},_getUpdateWidgetForUrlStoreJSONP:function(_5e){
var _5f=dijit.byId("davinciIleb");
var _60=dijit.byId("davinci.ve.input.SmartInput_callback_editbox");
this._url=_5f.value;
var url=this._getFullUrl(this._url);
this._callback=_60.value;
var _61=function(_62){
this._urlDataStoreLoaded(_62,_5e);
};
var _63=this._widget.getContext().getGlobal();
_63["require"](["dojo/data/ItemFileReadStore","dojox/io/xhrScriptPlugin"],function(_64,_65){
_65(url,"callback");
var _66=this._urlDataStore=new _64({url:url});
_66.fetch({query:this.query,queryOptions:{deep:true},onComplete:_61.bind(this),onError:function(e){
console.error("DataStoreBasedWidgetInput._getUpdateWidgetForUrlStoreJSONP error using url = "+url+"; e = "+e);
alert("File "+e);
}});
}.bind(this));
},_getFullUrl:function(url){
var _67;
var _68=/http:\/\//i;
if(_68.test(url)){
_67=url;
}else{
var _69=new _f(this._widget._edit_context._srcDocument.fileName).getParentPath().toString();
var _6a=system.resource.findResource(url,null,_69);
if(!_6a){
console.error("DataStoreBasedWidgetInput._getFullUrl error using url = "+url+"; url does not exist.");
alert("File: "+this._url+" does not exsist.");
return;
}
_67=_6a.getURL();
}
return _19.encodeURI(_67);
},_urlDataStoreLoaded:function(_6b,_6c){
if(_6b.length<1){
console.error("Data store empty");
return;
}
var _6d=this._widget;
var _6e=this._getStoreId(_6d);
var _6f=_9.byId(_6e);
var _70={};
var _71=this._getContext();
_70.url=this._url;
if(this._callback){
this.setCallback("\""+this._url+"\",\""+this._callback+"\"");
}
_70.data="";
var _72=new _e();
var _73=new _d(_6f);
_72.add(_73);
var _74=_6e;
var _75=null;
if(this._dataType=="csv"){
if(_6f.type!="dojox.data.CsvStore"){
_74=_9.getUniqueObjectId("dojox.data.CsvStore",_71.getDocument());
}
_75={"type":"dojox.data.CsvStore","properties":{id:_74,jsId:_74,url:this._url,data:""},context:_71,};
}else{
if(_6f.type!="dojo.data.ItemFileReadStore"){
_74=_9.getUniqueObjectId("dojo.data.ItemFileReadStore",_71.getDocument());
}
_75={"type":"dojo.data.ItemFileReadStore","properties":{id:_74,jsId:_74,url:this._url,data:""},context:_71,};
}
this._urlDataStore.id=_74;
var _76=new _c(_75,_6d.getParent(),0);
_72.add(_76);
command=this._getModifyCommandForUrlDataStore(_6d,_71,_6b,this._urlDataStore);
_72.add(command);
_6c(_72);
},_getModifyCommandForUrlDataStore:function(_77,_78,_79,_7a){
var _7b=this._getPropsForNewStore(_77,_7a);
return new _a(_77,_7b,null,_78);
},_isEmbedded:function(){
if(this._embeddingContentPane){
return true;
}else{
return false;
}
},_loading:function(_7c,_7d){
if(this._isEmbedded()){
var _7e=dojo.doc.createElement("div");
_7e.id="ieb";
this._inline=_7e;
var _7f=new _12({},_7e);
this._embeddingContentPane.set("content",_7f);
dojo.style(this._inline,"display","block");
this._inline=_7f;
}else{
this.inherited(arguments);
}
},show:function(_80){
this._widget=_9.byId(_80);
var _81=200;
var _82=155;
this._loading(_82,_81);
dojo.addClass("ieb","dojoStoreBasedWidgetInput");
if(!this._isEmbedded()){
dojo.style("ieb","background-color","#F7FDFF");
}
var _83=this._getTemplate();
this._inline.attr("content",_83);
this._inline.eb=dijit.byId("davinciIleb");
this._inline.callBackObj=this;
if(!this._isEmbedded()){
this._connection.push(dojo.connect(this._inline,"onBlur",this,"onOk"));
this._connection.push(dojo.connect(this._inline.eb,"onKeyUp",this,"handleEvent"));
}
var _84=dojo.byId("davinci.ve.input.DataGridInput_img_folder");
this._connection.push(dojo.connect(_84,"onclick",this,"fileSelection"));
this._connectHelpDiv();
this._connectResizeHandle();
this._connectSimDiv();
if(this._loadingDiv){
this._loadingDiv.style.backgroundImage="none";
}
var _85=dijit.byId("davinci.ve.input.DataGridInput.dataStoreType");
this._connection.push(dojo.connect(_85,"onChange",this,"changeDataStoreType"));
var _86=this._getStoreId(this._widget);
var _87=_9.byId(_86);
this._data=_87._srcElement.getAttribute("data");
this._url=_87._srcElement.getAttribute("url");
this._callback=this.getCallback(this._url);
this._inline.eb=dijit.byId("davinciIleb");
this._connection.push(dojo.connect(this._inline.eb,"onMouseDown",this,"stopEvent"));
if(this._data){
_85.setValue("dummyData");
this._dataStoreType="dummyData";
this._url=" ";
this._callback="";
this.refreshStoreView();
}else{
if(this._callback){
_85.setValue("url");
this._dataStoreType="url";
this._inline.eb.setValue(this._url);
var tb=dijit.byId("davinci.ve.input.SmartInput_callback_editbox");
tb.setValue(this._callback);
this._data=" ";
}else{
_85.setValue("file");
this._dataStoreType="file";
this._inline.eb.setValue(this._url);
this._data=" ";
this._callback="";
}
}
this.changeDataStoreType(this._dataStoreType);
if(this.supportsEscapeHTMLInData){
var _88=this._widget.getPropertyValue("escapeHTMLInData");
var _89=dijit.byId("davinci.ve.input.SmartInput_radio_html");
var _8a=dijit.byId("davinci.ve.input.SmartInput_radio_text");
if(_88){
_89.set("checked",false);
_8a.set("checked",true);
}else{
_89.set("checked",true);
_8a.set("checked",false);
}
}
this.updateFormats();
this._inline.eb.focus();
this.resize(null);
if(this._isEmbedded()){
var _8b=dijit.byId("davinci.ve.input.SmartInput_ok");
dojo.style(_8b.domNode,"display","none");
var _8c=dijit.byId("davinci.ve.input.SmartInput_cancel");
dojo.style(_8c.domNode,"display","none");
}
},getCallback:function(url){
var _8d=_9.getWidgetHelper("dojo.data.ItemFileReadStore");
if(_8d&&_8d.getXhrScriptPluginParameters){
var _8e=_8d.getXhrScriptPluginParameters(url,this._widget._edit_context);
if(_8e){
return _8e.callback;
}
}
},setCallback:function(url){
var _8f=_9.getWidgetHelper("dojo.data.ItemFileReadStore");
if(_8f&&_8f.setXhrScriptPluginParameters){
_8f.setXhrScriptPluginParameters(url,this._widget._edit_context);
}
},handleEvent:function(_90){
if(_90.keyCode==13){
var _91=this.multiLine;
if(!_91||_91=="false"||this._lastKeyCode==13){
this.onOk();
}
}else{
this.updateFormats();
}
this._lastKeyCode=_90.keyCode;
this.updateSimStyle();
},fileSelection:function(e){
var _92=function(){
var _93=_94.fileTree;
if(_93.selectedItem){
var _95=_93.selectedItem.getPath();
var _96=new _f(_95),_97=new _f(this._widget._edit_context._srcDocument.fileName),_98=_96.relativeTo(_97,true).toString(),_99=dijit.byId("davinciIleb");
_99.setValue(_98);
_99.focus();
this._url=_93.selectedItem;
this.updateFormats();
this._fileSelectionDialog=null;
}
};
var _94=new _11({finishButtonLabel:_17.selectLabel});
this._fileSelectionDialog=_10.showModal(_94,_17.selectSource,{width:350,height:250},dojo.hitch(this,_92));
},updateFormats:function(){
var _9a=dojo.byId("davinci.ve.input.SmartInput_callback");
dojo.style(_9a,"display","none");
if(this._dataStoreType==="file"||this._dataStoreType==="url"){
var _9b=dojo.byId("davinci.ve.input.SmartInput_radio_text_width_div");
var _9c=dojo.byId("davinci.ve.input.SmartInput_radio_html_width_div");
var _9d=dijit.byId("davinci.ve.input.SmartInput_radio_html");
var _9e=dijit.byId("davinci.ve.input.SmartInput_radio_text");
if(this.supportsEscapeHTMLInData){
_9b.innerHTML="<div class=\"dojoxEllipsis\">"+_17.plainText+"\t</div>";
_9c.innerHTML="<div id=\"davinci.ve.input.SmartInput_radio_html_div\" class=\"dojoxEllipsis\">"+_17.htmlMarkup+"</div>";
_9d.setDisabled(false);
_9e.setDisabled(false);
dojo.removeClass(_9b,"inlineEditDisabled");
dojo.removeClass(_9c,"inlineEditDisabled");
dojo.style(_9e.domNode,"display","");
dojo.style(_9d.domNode,"display","");
dojo.style(_9c,"display","");
dojo.style(_9b,"display","");
}else{
dojo.style(_9c,"display","none");
dojo.style(_9b,"display","none");
dojo.style(_9d.domNode,"display","none");
dojo.style(_9e.domNode,"display","none");
}
var _9f=dojo.byId("davinci.ve.input.SmartInput_table");
dojo.style(_9f,"display","");
if(this._dataStoreType==="url"){
dojo.style(_9a,"display","");
}
}else{
this.inherited(arguments);
if(!this.supportsEscapeHTMLInData){
var _9b=dojo.byId("davinci.ve.input.SmartInput_radio_text_width_div");
var _9c=dojo.byId("davinci.ve.input.SmartInput_radio_html_width_div");
var _9d=dijit.byId("davinci.ve.input.SmartInput_radio_html");
var _9e=dijit.byId("davinci.ve.input.SmartInput_radio_text");
dojo.style(_9c,"display","none");
dojo.style(_9b,"display","none");
dojo.style(_9d.domNode,"display","none");
dojo.style(_9e.domNode,"display","none");
}
dojo.style("davinci.ve.input.DataGridInput_img_folder","display","none");
}
},changeDataStoreType:function(e){
this._dataStoreType=e;
var _a0=_7.byId("davinciIleb");
var _a1=_5.byId("iedResizeDiv");
var _a2=_4.get("iedResizeDiv","width");
if(e==="dummyData"){
_a0.setValue(this._data);
_a1.style.height="85px";
_4.set("davinci.ve.input.DataGridInput_img_folder","display","none");
_4.set("ieb","width",_a2+15+"px");
}else{
if(e==="file"){
_4.set("davinci.ve.input.DataGridInput_img_folder","display","");
_a0.setValue(this._url);
_a1.style.height="40px";
}else{
if(e==="url"){
_4.set("davinci.ve.input.DataGridInput_img_folder","display","none");
_a0.setValue(this._url);
_a1.style.height="40px";
_4.set("ieb","width",_a2+15+"px");
}else{
console.error("DataGridInput:changeDataStoreType error");
}
}
}
this.updateFormats();
this.resize(null);
},resize:function(e){
this.inherited(arguments);
var _a3=dojo.byId("iedResizeDiv");
var _a4=dijit.byId("davinciIleb");
var _a5=_a3.clientWidth-5;
var _a6=_a3.clientHeight-6;
_a5=_a3.clientWidth-8;
_a6=_a3.clientHeight-20;
dojo.style("davinci.ve.input.DataGridInput.dataStoreType","width",_a3.clientWidth+15+"px");
if(_a4){
_a4._setStyleAttr({width:_a5+"px",height:_a6+"px",maxHeight:_a6+"px"});
}
_a4._setStyleAttr({width:_a3.clientWidth-20+"px"});
if(this._dataStoreType==="file"){
var ieb=dojo.byId("ieb");
var _a7=dojo.style("ieb","width",_a3.clientWidth+30+"px");
dojo.style("davinci.ve.input.DataGridInput_img_folder","display","");
dojo.style("davinci.ve.input.DataGridInput_img_folder","left",_a3.clientWidth+1+"px");
dojo.style("davinci.ve.input.DataGridInput.dataStoreType","width",_a3.clientWidth+15+"px");
}else{
var ieb=dojo.byId("ieb");
var _a7=dojo.style("ieb","width",_a3.clientWidth+15+"px");
dojo.style("davinci.ve.input.DataGridInput.dataStoreType","width",_a3.clientWidth+"px");
}
},_getTemplate:function(){
if(!this._substitutedMainTemplate){
this._substitutedMainTemplate=dojo.replace(_18,{commaSeparatedData:_17.commaSeparatedData,dataFromWorkspace:_17.dataFromWorkspace,dataFromJsonpURL:_17.dataFromJsonpURL,callbackParameter:_17.callbackParameter,buttonOk:_16.buttonOk,buttonCancel:_16.buttonCancel,helpText:this.getHelpText()});
}
return this._substitutedMainTemplate;
},_getStoreId:function(_a8){
return getStoreId(_a8);
}});
_2d.setPropInDataDojoProps=setPropInDataDojoProps;
_2d.getStoreId=getStoreId;
return _2d;
});
