/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

//>>built
require({cache:{"davinci/html/html.plugin":function(){
define(["require"],function(_1){
return {id:"davinci.html","davinci.editor":[{id:"HTMLEditor",name:"HTML Editor",extensions:"html",isDefault:false,editorClass:"davinci/html/ui/HTMLEditor",palettePerspective:"davinci.html.htmlEditor",expandPalettes:["left"]},{id:"CSSEditor",name:"CSS Editor",extensions:"css",isDefault:true,editorClass:"davinci/html/ui/CSSEditor",palettePerspective:"davinci.html.htmlEditor",expandPalettes:["left"]},{id:"ImageViewer",name:"Image Viewer",extensions:"jpg,gif,jpeg,png",isDefault:true,editorClass:"davinci/html/ui/ImageViewer",palettePerspective:"davinci.html.htmlEditor",expandPalettes:["left"]}],"davinci.editorActions":{editorContribution:{targetID:"davinci.html.CSSEditor",actions:[{id:"savecombo",className:"maqLabelButton",showLabel:true,label:"Save",toolbarPath:"save",type:"ComboButton",run:function(){
_1(["../Workbench"],function(_2){
_1("../ui/Resource").save();
});
},isEnabled:function(_3){
return _1("../Workbench").getOpenEditor();
},menu:[{iconClass:"saveIcon",run:function(){
_1("../ui/Resource").save();
},isEnabled:function(_4){
return _1("../Workbench").getOpenEditor();
},label:"Save",keyBinding:{accel:true,charOrCode:"s",allowGlobal:true}},{iconClass:"saveAsIcon",run:function(){
_1("../ui/Resource").saveAs("html");
},isEnabled:function(_5){
return _1("../Workbench").getOpenEditor();
},label:"Save As",keyBinding:{accel:true,shift:true,charOrCode:"s",allowGlobal:true}}]}]}},"davinci.preferences":[{name:"HTML",id:"general",category:"",pageContent:"HTML preferences content here"}],"davinci.fileType":[{extension:"html",iconClass:"htmlFileIcon",type:"text"},{extension:"css",iconClass:"cssFileIcon",type:"text"},{extension:"jpeg",iconClass:"imageFileIcon",type:"image"},{extension:"jpg",iconClass:"imageFileIcon",type:"image"},{extension:"png",iconClass:"imageFileIcon",type:"image"},{extension:"gif",iconClass:"imageFileIcon",type:"image"}],"davinci.perspective":[{id:"htmlEditor",title:"HTML Editor",views:[{viewID:"davinci.ve.Palette",position:"left",hidden:true},{viewID:"davinci.ui.outline",position:"left",hidden:true},{viewID:"davinci.ve.style",position:"right"},{viewID:"davinci.ui.comment",position:"right",hidden:true},{viewID:"davinci.ve.states",position:"right-bottom",hidden:true},{viewID:"davinci.ui.navigator",position:"left-bottom",selected:true},{viewID:"davinci.review.reviewNavigator",position:"left"}]}]};
});
},"davinci/ve/commands/ModifyRichTextCommand":function(){
define(["dojo/_base/declare"],function(_6){
return _6("davinci.ve.commands.ModifyRichTextCommand",null,{name:"modify",constructor:function(_7,_8,_9,_a){
this._oldId=_7?_7.id:undefined;
this._properties=_8=(_8||{});
if(_8.richText){
this._richText=true;
this._newText=_8.richText;
this._children=_8.richText;
delete _8.richText;
}else{
this._children=_8._children;
}
this._context=_a||_7.getContext();
},setContext:function(_b){
this._context=_b;
},add:function(_c){
if(!_c||_c._oldId!=this._oldId){
return;
}
if(_c._properties){
dojo.mixin(this._properties,_c._properties);
}
if(_c._children){
this._children=_c._children;
}
},execute:function(){
if(!this._oldId||!this._properties){
return;
}
var _d=require("davinci/ve/widget");
var _e=_d.byId(this._oldId);
if(!_e){
return;
}
this._parentWidget=_e.getParent();
if(!this._oldText){
this._oldText=_e._srcElement.getElementText(this._context);
if(this._oldText&&(typeof this._oldText=="string")){
this._oldText=this._oldText.replace(/\n/g,"");
}
}
if(!this._oldData){
this._oldData=_e.getData();
this._oldData.context=this._context;
this._newData={type:this._oldData.type,properties:dojo.mixin({},this._oldData.properties,this._properties),children:this._newText,states:this._oldData.states,context:this._context};
this._oldData={type:this._oldData.type,properties:dojo.mixin({},this._oldData.properties,this._properties),children:this._oldText,states:this._oldData.states,context:this._context};
}
if(this._context){
this._context.detach(_e);
}
if(this._properties.id){
delete this._newData.properties.isTempID;
}
if(!this._newId_isTempID){
this._newId_isTempID=this._newData.properties.isTempID;
}
if(!this._oldId_isTempID){
this._oldId_isTempID=this._oldData.properties.isTempID;
}
var _f=null;
var _10=this._parentWidget.indexOf(_e);
this._parentWidget.removeChild(_e);
_e.destroyWidget();
if(this._newId){
this._newData.properties.id=this._newId;
}
if(this._newId_isTempID){
this._newData.properties.isTempID=this._newId_isTempID;
}
_f=_d.createWidget(this._newData);
if(!_f){
return;
}
this._parentWidget.addChild(_f,_10);
this._newId=_f.id;
if(this._context){
this._refresh(_f);
}
this.newWidget=_f;
dojo.publish("/davinci/ui/widget/replaced",[_f,_e]);
var _11=require("davinci/ve/States");
_11.resetState(_f.domNode);
},undo:function(){
if(!this._newId||!this._oldData){
return;
}
var _12=require("davinci/ve/widget");
var _13=_12.byId(this._newId);
if(!_13){
return;
}
var _14=dojo.indexOf(this._parentWidget.getChildren(),_13);
if(_14<0){
return;
}
var _15=this._parentWidget.getContext();
if(_15){
_15.detach(_13);
}
this._parentWidget.removeChild(_13);
_13.destroyWidget();
this._oldData.children=this._oldText;
this._oldData.properties.id=this._oldId;
var _16=_12.createWidget(this._oldData);
_13.getParent().addChild(_16,_14);
if(_15){
this._refresh(_16);
}
dojo.publish("/davinci/ui/widget/replaced",[_16,_13]);
var _17=require("davinci/ve/States");
_17.resetState(_16.domNode);
},_refresh:function(_18){
var _19=_18.getContainerNode();
if(_19){
this._context.getGlobal()["require"]("dojo/parser").parse(_19);
}
this._context.attach(_18);
_18.startup();
_18.renderWidget();
if(_19){
this._context._attachChildren(_19);
}
}});
});
},"davinci/library":function(){
define(["davinci/Runtime","davinci/model/Path","davinci/ve/themeEditor/metadata/CSSThemeProvider","davinci/ve/themeEditor/metadata/query","davinci/workbench/Preferences"],function(_1a,_1b,_1c,_1d,_1e){
var _1f={_customWidgets:{}},_20={},_21={},_22={},_23={};
dojo.subscribe("/davinci/ui/libraryChanged/start",this,function(){
_23={};
_22={};
});
dojo.subscribe("/davinci/resource/resourceChanged",this,function(_24,_25){
var _26=require("davinci/Workbench");
var _27=_26.getProject();
if(_24=="deleted"||_24=="renamed"){
var _28=_1e.getPreferences("davinci.ui.ProjectPrefs",_27);
var _29=new _1b(_27).append(_28.themeFolder);
var _2a=new _1b(_25.getPath());
if(_2a.startsWith(_29)){
delete _20[_27];
}
}
if(_25.elementType=="File"&&_25.extension=="theme"){
if(_24=="modified"){
var d=_25.getContent();
d.then(function(_2b){
var t=JSON.parse(_2b);
t.file=_25;
for(var i=0;i<_20[_27].length;i++){
if(_20[_27][i].name==t.name){
_20[_27][i]=t;
return;
}
}
_20[_27].push(t);
}.bind(this));
}
}
});
_1f={themesChanged:function(_2c){
_20[_2c]=_2c?null:[];
},getThemes:function(_2d,_2e,_2f){
if(_2f){
delete _20[_2d];
}
function _30(){
var rlt=[];
if(_20[_2d]){
rlt=_2e?_20[_2d].filter(function(_31){
return !_31.file.isVirtual();
}):_20[_2d];
}
return rlt;
};
if(_20[_2d]){
return _30();
}
var _32=_1e.getPreferences("davinci.ui.ProjectPrefs",_2d),_33=new _1b(_2d).append(_32.themeFolder);
var _34=system.resource.findResource("*.theme",false,_33.toString());
_20[_2d]=[];
for(var i=0;i<_34.length;i++){
if(_34[i]){
var t=JSON.parse(_34[i].getContentSync());
t.file=_34[i];
_20[_2d].push(t);
}else{
console.error("library.getThemes: undefined theme returned by system.resource.findResource(\"*.theme\", false, projectThemeBase.toString());");
}
}
return _30();
},getThemeMetadata:function(_35){
if(_21[_35.name]){
return _21[_35.name];
}
var _36=new _1b(_35.file.getPath()).removeLastSegments();
var _37=_35.files.filter(function(_38){
return _38.indexOf(".css")>-1;
}).map(_36.append,_36);
var _39=_35.meta.map(function(_3a){
var _3b=_36.append(_3a);
return system.resource.findResource(_3b.toString());
});
var _3c=new _1c(_39,_35);
_21[_35.name]={loader:new _1d(_39),css:_37,metadata:_3c};
return _21[_35.name];
},addCustomWidgets:function(_3d,_3e){
var _3f=_1e.getPreferences("davinci.ui.ProjectPrefs",_3d);
if(!_3f.widgetFolder){
_3f.widgetFolder="./lib/custom";
_1e.savePreferences("davinci.ui.ProjectPrefs",_3d,_3f);
}
var _40=require("davinci/ve/metadata").parseMetaData(_3e.name,_3e,new _1b(_3f.widgetFolder),true);
if(!_1f._customWidgets[_3d].hasOwnProperty("name")){
_1f._customWidgets[_3d].name="custom";
_1f._customWidgets[_3d].metaPath=_3f.widgetFolder;
_1f._customWidgets[_3d].localPath=true;
}
_1f._customWidgets[_3d]=_40;
dojo.publish("/davinci/ui/addedCustomWidget",[_40]);
return _40;
},getCustomWidgets:function(_41){
if(!_1f._customWidgets||!_1f._customWidgets[_41]){
if(!_1f._customWidgets){
_1f._customWidgets={};
}
if(!_1f._customWidgets[_41]){
_1f._customWidgets[_41]=[];
}
var _42=_1e.getPreferences("davinci.ui.ProjectPrefs",_41);
if(!_42.widgetFolder){
_42.widgetFolder="./lib/custom";
_1e.savePreferences("davinci.ui.ProjectPrefs",_41,_42);
}
var _43=new _1b(_41).append(_42.widgetFolder);
var _44=_43.getSegments();
parent=system.resource.findResource(_44[0]);
for(var i=1;i<_44.length;i++){
var _45=parent.getChildSync(_44[i]);
if(_45){
parent=_45;
}else{
parent=parent.createResource(_44[i],true);
}
}
var _46=system.resource.findResource("*_widgets.json",false,parent);
for(var i=0;i<_46.length;i++){
_1f.addCustomWidgets(_41,dojo.fromJson(_46[i].getContentSync()));
}
}
return {custom:_1f._customWidgets[_41]};
},getInstalledLibs:function(){
if(!_1f._serverLibs){
_1f._serverLibs=_1a.serverJSONRequest({url:"cmd/listLibs",handleAs:"json",content:{},sync:true})[0].userLibs;
}
return _1f._serverLibs;
},getUserLibs:function(_47){
if(_22.base){
return _22.base;
}
_22.base=_1a.serverJSONRequest({url:"cmd/getUserLibs",handleAs:"json",content:{base:_47},sync:true})[0].userLibs;
return _22.base;
},getLibRoot:function(id,_48,_49){
var _4a=_23;
if(_4a[_49]&&_4a[_49][id]&&_4a[_49][id][_48]!==undefined){
return _4a[_49][id][_48];
}
if(!_4a[_49]){
_4a[_49]={};
}
if(!_4a[_49][id]){
_4a[_49][id]={};
}
var _4b=_1a.serverJSONRequest({url:"cmd/getLibRoots",handleAs:"json",content:{libId:id,version:_48,base:_49},sync:true});
var _4c=_4b?_4b[0].libRoot.root:null;
if(!_4a[id]){
_4a[id]={};
}
_4a[_49][id][_48]=_4c;
return _4c;
},getMetaRoot:function(id,_4d){
return _1a.serverJSONRequest({url:"cmd/getMetaRoot",handleAs:"text",content:{id:id,version:_4d},sync:true});
},modifyLib:function(_4e){
return _1a.serverJSONRequest({url:"cmd/modifyLib",handleAs:"text",content:{libChanges:dojo.toJson(_4e)},sync:true});
},addLib:function(id,_4f){
return _1a.serverJSONRequest({url:"cmd/getLibRoots",handleAs:"json",content:{libId:id,version:_4f},sync:true})[0].libRoot.root;
},getLibraryId:function(_50,_51){
var _52={sketch:"sketch",claro:"claro"};
return _52[_50]+(_51||"");
},getLibraryName:function(lib){
var _53;
var _54;
for(var _55 in lib){
_53=_55;
_54=lib[_53];
}
return _53;
}};
return _1f;
});
},"dojo/date":function(){
define(["./has","./_base/lang"],function(has,_56){
var _57={};
_57.getDaysInMonth=function(_58){
var _59=_58.getMonth();
var _5a=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_59==1&&_57.isLeapYear(_58)){
return 29;
}
return _5a[_59];
};
_57.isLeapYear=function(_5b){
var _5c=_5b.getFullYear();
return !(_5c%400)||(!(_5c%4)&&!!(_5c%100));
};
_57.getTimezoneName=function(_5d){
var str=_5d.toString();
var tz="";
var _5e;
var pos=str.indexOf("(");
if(pos>-1){
tz=str.substring(++pos,str.indexOf(")"));
}else{
var pat=/([A-Z\/]+) \d{4}$/;
if((_5e=str.match(pat))){
tz=_5e[1];
}else{
str=_5d.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((_5e=str.match(pat))){
tz=_5e[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
_57.compare=function(_5f,_60,_61){
_5f=new Date(+_5f);
_60=new Date(+(_60||new Date()));
if(_61=="date"){
_5f.setHours(0,0,0,0);
_60.setHours(0,0,0,0);
}else{
if(_61=="time"){
_5f.setFullYear(0,0,0);
_60.setFullYear(0,0,0);
}
}
if(_5f>_60){
return 1;
}
if(_5f<_60){
return -1;
}
return 0;
};
_57.add=function(_62,_63,_64){
var sum=new Date(+_62);
var _65=false;
var _66="Date";
switch(_63){
case "day":
break;
case "weekday":
var _67,_68;
var mod=_64%5;
if(!mod){
_67=(_64>0)?5:-5;
_68=(_64>0)?((_64-5)/5):((_64+5)/5);
}else{
_67=mod;
_68=parseInt(_64/5);
}
var _69=_62.getDay();
var adj=0;
if(_69==6&&_64>0){
adj=1;
}else{
if(_69==0&&_64<0){
adj=-1;
}
}
var _6a=_69+_67;
if(_6a==0||_6a==6){
adj=(_64>0)?2:-2;
}
_64=(7*_68)+_67+adj;
break;
case "year":
_66="FullYear";
_65=true;
break;
case "week":
_64*=7;
break;
case "quarter":
_64*=3;
case "month":
_65=true;
_66="Month";
break;
default:
_66="UTC"+_63.charAt(0).toUpperCase()+_63.substring(1)+"s";
}
if(_66){
sum["set"+_66](sum["get"+_66]()+_64);
}
if(_65&&(sum.getDate()<_62.getDate())){
sum.setDate(0);
}
return sum;
};
_57.difference=function(_6b,_6c,_6d){
_6c=_6c||new Date();
_6d=_6d||"day";
var _6e=_6c.getFullYear()-_6b.getFullYear();
var _6f=1;
switch(_6d){
case "quarter":
var m1=_6b.getMonth();
var m2=_6c.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_6e*4);
_6f=q2-q1;
break;
case "weekday":
var _70=Math.round(_57.difference(_6b,_6c,"day"));
var _71=parseInt(_57.difference(_6b,_6c,"week"));
var mod=_70%7;
if(mod==0){
_70=_71*5;
}else{
var adj=0;
var _72=_6b.getDay();
var _73=_6c.getDay();
_71=parseInt(_70/7);
mod=_70%7;
var _74=new Date(_6b);
_74.setDate(_74.getDate()+(_71*7));
var _75=_74.getDay();
if(_70>0){
switch(true){
case _72==6:
adj=-1;
break;
case _72==0:
adj=0;
break;
case _73==6:
adj=-1;
break;
case _73==0:
adj=-2;
break;
case (_75+mod)>5:
adj=-2;
}
}else{
if(_70<0){
switch(true){
case _72==6:
adj=0;
break;
case _72==0:
adj=1;
break;
case _73==6:
adj=2;
break;
case _73==0:
adj=1;
break;
case (_75+mod)<0:
adj=2;
}
}
}
_70+=adj;
_70-=(_71*2);
}
_6f=_70;
break;
case "year":
_6f=_6e;
break;
case "month":
_6f=(_6c.getMonth()-_6b.getMonth())+(_6e*12);
break;
case "week":
_6f=parseInt(_57.difference(_6b,_6c,"day")/7);
break;
case "day":
_6f/=24;
case "hour":
_6f/=60;
case "minute":
_6f/=60;
case "second":
_6f/=1000;
case "millisecond":
_6f*=_6c.getTime()-_6b.getTime();
}
return Math.round(_6f);
};
1&&_56.mixin(_56.getObject("dojo.date",true),_57);
return _57;
});
},"dojox/grid/DataGrid":function(){
define("dojox/grid/DataGrid",["../main","dojo/_base/array","dojo/_base/lang","dojo/_base/json","dojo/_base/sniff","dojo/_base/declare","./_Grid","./DataSelection","dojo/_base/html"],function(_76,_77,_78,_79,has,_7a,_7b,_7c,_7d){
var _7e=_7a("dojox.grid.DataGrid",_7b,{store:null,query:null,queryOptions:null,fetchText:"...",sortFields:null,updateDelay:1,items:null,_store_connects:null,_by_idty:null,_by_idx:null,_cache:null,_pages:null,_pending_requests:null,_bop:-1,_eop:-1,_requests:0,rowCount:0,_isLoaded:false,_isLoading:false,keepSelection:false,postCreate:function(){
this._pages=[];
this._store_connects=[];
this._by_idty={};
this._by_idx=[];
this._cache=[];
this._pending_requests={};
this._setStore(this.store);
this.inherited(arguments);
},destroy:function(){
this.selection.destroy();
this.inherited(arguments);
},createSelection:function(){
this.selection=new _7c(this);
},get:function(_7f,_80){
if(_80&&this.field=="_item"&&!this.fields){
return _80;
}else{
if(_80&&this.fields){
var ret=[];
var s=this.grid.store;
_77.forEach(this.fields,function(f){
ret=ret.concat(s.getValues(_80,f));
});
return ret;
}else{
if(!_80&&typeof _7f==="string"){
return this.inherited(arguments);
}
}
}
return (!_80?this.defaultValue:(!this.field?this.value:(this.field=="_item"?_80:this.grid.store.getValue(_80,this.field))));
},_checkUpdateStatus:function(){
if(this.updateDelay>0){
var _81=false;
if(this._endUpdateDelay){
clearTimeout(this._endUpdateDelay);
delete this._endUpdateDelay;
_81=true;
}
if(!this.updating){
this.beginUpdate();
_81=true;
}
if(_81){
var _82=this;
this._endUpdateDelay=setTimeout(function(){
delete _82._endUpdateDelay;
_82.endUpdate();
},this.updateDelay);
}
}
},_onSet:function(_83,_84,_85,_86){
this._checkUpdateStatus();
var idx=this.getItemIndex(_83);
if(idx>-1){
this.updateRow(idx);
}
},_createItem:function(_87,_88){
var _89=this._hasIdentity?this.store.getIdentity(_87):_79.toJson(this.query)+":idx:"+_88+":sort:"+_79.toJson(this.getSortProps());
var o=this._by_idty[_89]={idty:_89,item:_87};
return o;
},_addItem:function(_8a,_8b,_8c){
this._by_idx[_8b]=this._createItem(_8a,_8b);
if(!_8c){
this.updateRow(_8b);
}
},_onNew:function(_8d,_8e){
this._checkUpdateStatus();
var _8f=this.get("rowCount");
this._addingItem=true;
this.updateRowCount(_8f+1);
this._addingItem=false;
this._addItem(_8d,_8f);
this.showMessage();
},_onDelete:function(_90){
this._checkUpdateStatus();
var idx=this._getItemIndex(_90,true);
if(idx>=0){
this._pages=[];
this._bop=-1;
this._eop=-1;
var o=this._by_idx[idx];
this._by_idx.splice(idx,1);
delete this._by_idty[o.idty];
this.updateRowCount(this.get("rowCount")-1);
if(this.get("rowCount")===0){
this.showMessage(this.noDataMessage);
}
}
if(this.selection.isSelected(idx)){
this.selection.deselect(idx);
this.selection.selected.splice(idx,1);
}
},_onRevert:function(){
this._refresh();
},setStore:function(_91,_92,_93){
if(this._requestsPending(0)){
return;
}
this._setQuery(_92,_93);
this._setStore(_91);
this._refresh(true);
},setQuery:function(_94,_95){
if(this._requestsPending(0)){
return;
}
this._setQuery(_94,_95);
this._refresh(true);
},setItems:function(_96){
this.items=_96;
this._setStore(this.store);
this._refresh(true);
},_setQuery:function(_97,_98){
this.query=_97;
this.queryOptions=_98||this.queryOptions;
},_setStore:function(_99){
if(this.store&&this._store_connects){
_77.forEach(this._store_connects,this.disconnect,this);
}
this.store=_99;
if(this.store){
var f=this.store.getFeatures();
var h=[];
this._canEdit=!!f["dojo.data.api.Write"]&&!!f["dojo.data.api.Identity"];
this._hasIdentity=!!f["dojo.data.api.Identity"];
if(!!f["dojo.data.api.Notification"]&&!this.items){
h.push(this.connect(this.store,"onSet","_onSet"));
h.push(this.connect(this.store,"onNew","_onNew"));
h.push(this.connect(this.store,"onDelete","_onDelete"));
}
if(this._canEdit){
h.push(this.connect(this.store,"revert","_onRevert"));
}
this._store_connects=h;
}
},_onFetchBegin:function(_9a,req){
if(!this.scroller){
return;
}
if(this.rowCount!=_9a){
if(req.isRender){
this.scroller.init(_9a,this.keepRows,this.rowsPerPage);
this.rowCount=_9a;
this._setAutoHeightAttr(this.autoHeight,true);
this._skipRowRenormalize=true;
this.prerender();
this._skipRowRenormalize=false;
}else{
this.updateRowCount(_9a);
}
}
if(!_9a){
this.views.render();
this._resize();
this.showMessage(this.noDataMessage);
this.focus.initFocusView();
}else{
this.showMessage();
}
},_onFetchComplete:function(_9b,req){
if(!this.scroller){
return;
}
if(_9b&&_9b.length>0){
_77.forEach(_9b,function(_9c,idx){
this._addItem(_9c,req.start+idx,true);
},this);
this.updateRows(req.start,_9b.length);
if(req.isRender){
this.setScrollTop(0);
this.postrender();
}else{
if(this._lastScrollTop){
this.setScrollTop(this._lastScrollTop);
}
}
if(has("ie")){
_7d.setSelectable(this.domNode,this.selectable);
}
}
delete this._lastScrollTop;
if(!this._isLoaded){
this._isLoading=false;
this._isLoaded=true;
}
this._pending_requests[req.start]=false;
},_onFetchError:function(err,req){
delete this._lastScrollTop;
if(!this._isLoaded){
this._isLoading=false;
this._isLoaded=true;
this.showMessage(this.errorMessage);
}
this._pending_requests[req.start]=false;
this.onFetchError(err,req);
},onFetchError:function(err,req){
},_fetch:function(_9d,_9e){
_9d=_9d||0;
if(this.store&&!this._pending_requests[_9d]){
if(!this._isLoaded&&!this._isLoading){
this._isLoading=true;
this.showMessage(this.loadingMessage);
}
this._pending_requests[_9d]=true;
try{
if(this.items){
var _9f=this.items;
var _a0=this.store;
this.rowsPerPage=_9f.length;
var req={start:_9d,count:this.rowsPerPage,isRender:_9e};
this._onFetchBegin(_9f.length,req);
var _a1=0;
_77.forEach(_9f,function(i){
if(!_a0.isItemLoaded(i)){
_a1++;
}
});
if(_a1===0){
this._onFetchComplete(_9f,req);
}else{
var _a2=function(_a3){
_a1--;
if(_a1===0){
this._onFetchComplete(_9f,req);
}
};
_77.forEach(_9f,function(i){
if(!_a0.isItemLoaded(i)){
_a0.loadItem({item:i,onItem:_a2,scope:this});
}
},this);
}
}else{
this.store.fetch({start:_9d,count:this.rowsPerPage,query:this.query,sort:this.getSortProps(),queryOptions:this.queryOptions,isRender:_9e,onBegin:_78.hitch(this,"_onFetchBegin"),onComplete:_78.hitch(this,"_onFetchComplete"),onError:_78.hitch(this,"_onFetchError")});
}
}
catch(e){
this._onFetchError(e,{start:_9d,count:this.rowsPerPage});
}
}
},_clearData:function(){
this.updateRowCount(0);
this._by_idty={};
this._by_idx=[];
this._pages=[];
this._bop=this._eop=-1;
this._isLoaded=false;
this._isLoading=false;
},getItem:function(idx){
var _a4=this._by_idx[idx];
if(!_a4||(_a4&&!_a4.item)){
this._preparePage(idx);
return null;
}
return _a4.item;
},getItemIndex:function(_a5){
return this._getItemIndex(_a5,false);
},_getItemIndex:function(_a6,_a7){
if(!_a7&&!this.store.isItem(_a6)){
return -1;
}
var _a8=this._hasIdentity?this.store.getIdentity(_a6):null;
for(var i=0,l=this._by_idx.length;i<l;i++){
var d=this._by_idx[i];
if(d&&((_a8&&d.idty==_a8)||(d.item===_a6))){
return i;
}
}
return -1;
},filter:function(_a9,_aa){
this.query=_a9;
if(_aa){
this._clearData();
}
this._fetch();
},_getItemAttr:function(idx,_ab){
var _ac=this.getItem(idx);
return (!_ac?this.fetchText:this.store.getValue(_ac,_ab));
},_render:function(){
if(this.domNode.parentNode){
this.scroller.init(this.get("rowCount"),this.keepRows,this.rowsPerPage);
this.prerender();
this._fetch(0,true);
}
},_requestsPending:function(_ad){
return this._pending_requests[_ad];
},_rowToPage:function(_ae){
return (this.rowsPerPage?Math.floor(_ae/this.rowsPerPage):_ae);
},_pageToRow:function(_af){
return (this.rowsPerPage?this.rowsPerPage*_af:_af);
},_preparePage:function(_b0){
if((_b0<this._bop||_b0>=this._eop)&&!this._addingItem){
var _b1=this._rowToPage(_b0);
this._needPage(_b1);
this._bop=_b1*this.rowsPerPage;
this._eop=this._bop+(this.rowsPerPage||this.get("rowCount"));
}
},_needPage:function(_b2){
if(!this._pages[_b2]){
this._pages[_b2]=true;
this._requestPage(_b2);
}
},_requestPage:function(_b3){
var row=this._pageToRow(_b3);
var _b4=Math.min(this.rowsPerPage,this.get("rowCount")-row);
if(_b4>0){
this._requests++;
if(!this._requestsPending(row)){
setTimeout(_78.hitch(this,"_fetch",row,false),1);
}
}
},getCellName:function(_b5){
return _b5.field;
},_refresh:function(_b6){
this._clearData();
this._fetch(0,_b6);
},sort:function(){
this.edit.apply();
this._lastScrollTop=this.scrollTop;
this._refresh();
},canSort:function(){
return (!this._isLoading);
},getSortProps:function(){
var c=this.getCell(this.getSortIndex());
if(!c){
if(this.sortFields){
return this.sortFields;
}
return null;
}else{
var _b7=c["sortDesc"];
var si=!(this.sortInfo>0);
if(typeof _b7=="undefined"){
_b7=si;
}else{
_b7=si?!_b7:_b7;
}
return [{attribute:c.field,descending:_b7}];
}
},styleRowState:function(_b8){
if(this.store&&this.store.getState){
var _b9=this.store.getState(_b8.index),c="";
for(var i=0,ss=["inflight","error","inserting"],s;s=ss[i];i++){
if(_b9[s]){
c=" dojoxGridRow-"+s;
break;
}
}
_b8.customClasses+=c;
}
},onStyleRow:function(_ba){
this.styleRowState(_ba);
this.inherited(arguments);
},canEdit:function(_bb,_bc){
return this._canEdit;
},_copyAttr:function(idx,_bd){
var row={};
var _be={};
var src=this.getItem(idx);
return this.store.getValue(src,_bd);
},doStartEdit:function(_bf,_c0){
if(!this._cache[_c0]){
this._cache[_c0]=this._copyAttr(_c0,_bf.field);
}
this.onStartEdit(_bf,_c0);
},doApplyCellEdit:function(_c1,_c2,_c3){
this.store.fetchItemByIdentity({identity:this._by_idx[_c2].idty,onItem:_78.hitch(this,function(_c4){
var _c5=this.store.getValue(_c4,_c3);
if(typeof _c5=="number"){
_c1=isNaN(_c1)?_c1:parseFloat(_c1);
}else{
if(typeof _c5=="boolean"){
_c1=_c1=="true"?true:_c1=="false"?false:_c1;
}else{
if(_c5 instanceof Date){
var _c6=new Date(_c1);
_c1=isNaN(_c6.getTime())?_c1:_c6;
}
}
}
this.store.setValue(_c4,_c3,_c1);
this.onApplyCellEdit(_c1,_c2,_c3);
})});
},doCancelEdit:function(_c7){
var _c8=this._cache[_c7];
if(_c8){
this.updateRow(_c7);
delete this._cache[_c7];
}
this.onCancelEdit.apply(this,arguments);
},doApplyEdit:function(_c9,_ca){
var _cb=this._cache[_c9];
this.onApplyEdit(_c9);
},removeSelectedRows:function(){
if(this._canEdit){
this.edit.apply();
var fx=_78.hitch(this,function(_cc){
if(_cc.length){
_77.forEach(_cc,this.store.deleteItem,this.store);
this.selection.clear();
}
});
if(this.allItemsSelected){
this.store.fetch({query:this.query,queryOptions:this.queryOptions,onComplete:fx});
}else{
fx(this.selection.getSelected());
}
}
}});
_7e.cell_markupFactory=function(_cd,_ce,_cf){
var _d0=_78.trim(_7d.attr(_ce,"field")||"");
if(_d0){
_cf.field=_d0;
}
_cf.field=_cf.field||_cf.name;
var _d1=_78.trim(_7d.attr(_ce,"fields")||"");
if(_d1){
_cf.fields=_d1.split(",");
}
if(_cd){
_cd(_ce,_cf);
}
};
_7e.markupFactory=function(_d2,_d3,_d4,_d5){
return _7b.markupFactory(_d2,_d3,_d4,_78.partial(_7e.cell_markupFactory,_d5));
};
return _7e;
});
},"dijit/MenuBar":function(){
define(["dojo/_base/declare","dojo/_base/event","dojo/keys","./_MenuBase","dojo/text!./templates/MenuBar.html"],function(_d6,_d7,_d8,_d9,_da){
return _d6("dijit.MenuBar",_d9,{templateString:_da,baseClass:"dijitMenuBar",_isMenuBar:true,postCreate:function(){
this.inherited(arguments);
var l=this.isLeftToRight();
this.connectKeyNavHandlers(l?[_d8.LEFT_ARROW]:[_d8.RIGHT_ARROW],l?[_d8.RIGHT_ARROW]:[_d8.LEFT_ARROW]);
this._orient=["below"];
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.onItemClick(this.focusedChild,evt);
}
},focusChild:function(_db){
var _dc=this.focusedChild,_dd=_dc&&_dc.popup&&_dc.popup.isShowingNow;
this.inherited(arguments);
if(_dd&&_db.popup&&!_db.disabled){
this._openPopup(true);
}
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case _d8.DOWN_ARROW:
this._moveToPopup(evt);
_d7.stop(evt);
}
},onItemClick:function(_de,evt){
if(_de.popup&&_de.popup.isShowingNow&&(evt.type!=="keypress"||evt.keyCode!==_d8.DOWN_ARROW)){
_de.popup.onCancel();
}else{
this.inherited(arguments);
}
}});
});
},"system/resource":function(){
define(["require","dojo/_base/declare","dojo/_base/xhr","dojo/Deferred","davinci/model/Path","davinci/Runtime","davinci/model/resource/Folder"],function(_df,_e0,xhr,_e1,_e2,_e3,_e4){
var _e5={root:null,__CASE_SENSITIVE:false,resourceChanged:function(_e6,_e7){
if(_e7==system.resource.getRoot()){
_e7.reload();
system.resource.getRoot().getChildrenSync(dojo.hitch(system.resource,function(_e8){
system.resource.onChildrenChange(system.resource.getRoot(),_e8);
}));
return system.resource.getRoot();
}else{
if(_e6=="created"||_e6=="deleted"||_e6=="renamed"||_e6=="updated"||_e6=="reload"){
var _e9,_ea;
if(_e7.parent){
_e9=_e7.parent;
_ea=_e7.getPath();
}else{
var p1=new _e2(_e7).removeLastSegments();
_e9=system.resource.findResource(p1.toString())||system.resource.getRoot();
_ea=_e7;
}
if(_e6=="deleted"&&_e7.elementType=="Folder"){
system.resource.onChildrenChange(_e7,[]);
}
if(_e9.elementType=="Folder"&&_e6=="reload"){
_e9.reload();
}
if(_e6=="renamed"){
system.resource.onChange(_e7);
}
_e9.getChildrenSync(function(_eb){
system.resource.onChildrenChange(_e9,_eb);
},function(e){
console.error(e);
});
}
}
if(_e6=="deleted"){
var _ec=dijit.byId("resourceTree");
_ec.attr("selectedItem",null);
}
},createText:function(_ed,_ee){
return "";
},createResource:function(_ef,_f0,_f1){
var _f2=_ef.split("/");
_f1=_f1||system.resource.getWorkspace();
var _f3=!_f0?_f2.length-1:_f2.length;
for(var i=0;i<_f3;i++){
if(_f2[i]=="."||_f2[i]==""){
continue;
}
var _f4=_f1.getChildSync(_f2[i]);
if(_f4!=null){
_f1=_f4;
}else{
_f1=_f1.createResource(_f2[i],true);
}
}
if(!_f0){
_f1=_f1.createResource(_f2[_f2.length-1]);
}
return _f1;
},listProjects:function(_f5,_f6){
var _f7=system.resource.getRoot();
if(_f7.parent){
_f7=_f7.parent;
}
_f7.getChildren(_f5,_f6);
},createProject:function(_f8,_f9,_fa){
return xhr.get({url:"cmd/createProject",handleAs:"text",content:{name:_f8,initContent:_f9,eclipseSupport:_fa}});
},newItem:function(_fb,_fc){
},pasteItem:function(_fd,_fe,_ff,_100){
},onChange:function(item){
},onChildrenChange:function(_101,_102){
},getLabel:function(item){
var _103=item.getName();
if(item.link){
_103=_103+"  ["+item.link+"]";
}
return _103;
},getIdentity:function(item){
return item.getId();
},destroy:function(){
system.resource.subscriptions.forEach(dojo.unsubscribe);
},mayHaveChildren:function(item){
return item.elementType=="Folder";
},getRoot:function(_104,_105){
if(!system.resource.root){
var _106=system.resource.getWorkspace(),_107=_df("davinci/Workbench");
if(_107.singleProjectMode()){
var _108=_107.getProject();
system.resource.root=system.resource.findResource(_108,false,_106);
}else{
system.resource.root=_106;
}
system.resource.root._readOnly=false;
}
if(_104){
_104(system.resource.root);
}else{
return system.resource.root;
}
},getWorkspace:function(){
if(!this.workspace){
this.workspace=new _e4(".",null);
}
return this.workspace;
},getChildren:function(_109,_10a,_10b){
_109.getChildren(_10a,_10b);
},copy:function(_10c,_10d,_10e){
var path=_10c.getPath?_10c.getPath():_10c;
var _10f=_10d.getPath?_10d.getPath():_10d;
var _110=_e3.serverJSONRequest({url:"cmd/copy",handleAs:"text",sync:true,content:{source:path,dest:_10f,recurse:String(_10e)}});
system.resource.resourceChanged("reload",_10d);
},download:function(_111,_112,root,_113,_114){
var _115="";
var _116="";
if(_113){
_115="&libs="+encodeURIComponent(dojo.toJson(_113));
}
if(root){
_116="&root="+encodeURIComponent(root);
}
if(_114){
for(var name in _114){
_116+="&"+encodeURIComponent(name)+"="+encodeURIComponent(_114[name]);
}
}
window.location.href="cmd/download?fileName="+_112+_116+"&resources="+encodeURIComponent(dojo.toJson(_111))+_115;
},findResourceAsync:function(name,_117,_118,_119){
var _11a=new _e1();
var _11b=this.findResource(name,_117,_118,_119);
_11a.resolve(_11b);
return _11a;
},findResource:function(name,_11c,_11d,_11e){
_11c=_11c||!system.resource.__CASE_SENSITIVE;
var seg1=0,_11f;
var _120=system.resource.getWorkspace();
if(_11d){
if(typeof _11d=="string"){
var _121=_11d;
_11d=system.resource.findResource(_11d,_11c);
if(!_11d){
console.error("resource.findResoure: Folder "+_121+" not found");
return null;
}
}
_120=_11d;
}
if(typeof name=="string"){
_11f=name.split("/");
if(_11f[0]=="."){
seg1=1;
}
}else{
if(name.getSegments){
_11f=name.getSegments();
name=name.toString();
}
}
var _122=_11f.some(function(_123){
return _123.indexOf("*")!=-1;
});
var _124;
function _125(){
for(var i=seg1;i<_11f.length;i++){
var _126=null;
if(!_120._isLoaded){
_124=true;
break;
}
if(_11f[i]==".."){
_126=_120=_120.parent;
}else{
if(_11f[i]!="."){
_126=_120=_120.getChildSync(_11f[i]);
}
}
if(!_126){
return;
}
}
return _126;
};
var _127;
if(!_122){
_127=_125();
}
var _128=[];
if(!_127&&(_124||_122)){
var _129=_e3.serverJSONRequest({url:"cmd/findResource",content:{path:name,ignoreCase:_11c,workspaceOnly:_11e,inFolder:_11d?_11d.getPath():null},sync:true});
if(_129&&_129.length){
_128=_129.map(function(_12a){
var _12b=system.resource.getWorkspace();
for(var j=0;j<_12a.parents.length;j++){
if(!_12b._isLoaded){
_12b.setChildrenSync(_12a.parents[j].members);
}
if(j+1<_12a.parents.length){
var name=_12a.parents[j+1].name;
var _12c=_12b.getChildSync(name);
if(!_12c){
_12c=new _e4(name,_12b);
}
_12b=_12c;
}
}
_120=system.resource.getWorkspace();
seg1=0;
_11f=_12a.file.split("/");
if(_11f[0]=="."){
seg1=1;
}
return _125();
});
}
}else{
_128=[_127];
}
return _122?_128:_128[0];
},alphabeticalSort:function(_12d){
return _12d.sort(function(a,b){
a=a.name.toLowerCase();
b=b.name.toLowerCase();
return a<b?-1:(a>b?1:0);
});
}};
var _12e=[dojo.subscribe("/davinci/resource/resourceChanged",_e5,function(){
return _e5.resourceChanged;
}())];
return dojo.setObject("system.resource",_e5);
});
},"davinci/html/CSSAtRule":function(){
define(["dojo/_base/declare","davinci/html/CSSElement"],function(_12f,_130){
return _12f("davinci.html.CSSAtRule",_130,{constructor:function(){
this.elementType="CSSAtRule";
},getCSSFile:function(){
return this.parent;
},getText:function(_131){
s="@";
s=s+this.name+" "+this.value+"\n";
return s;
}});
});
},"dijit/Dialog":function(){
define(["require","dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/_base/fx","dojo/i18n","dojo/keys","dojo/_base/lang","dojo/on","dojo/ready","dojo/sniff","dojo/window","dojo/dnd/Moveable","dojo/dnd/TimedMoveable","./focus","./_base/manager","./_Widget","./_TemplatedMixin","./_CssStateMixin","./form/_FormMixin","./_DialogMixin","./DialogUnderlay","./layout/ContentPane","dojo/text!./templates/Dialog.html","./main","dojo/i18n!./nls/common"],function(_132,_133,_134,_135,_136,dom,_137,_138,_139,_13a,fx,i18n,keys,lang,on,_13b,has,_13c,_13d,_13e,_13f,_140,_141,_142,_143,_144,_145,_146,_147,_148,_149){
var _14a=_135("dijit._DialogBase",[_142,_144,_145,_143],{templateString:_148,baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},_setTitleAttr:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}],open:false,duration:_140.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,_setDraggableAttr:function(val){
this._set("draggable",val);
},"aria-describedby":"",maxRatio:0.9,postMixInProperties:function(){
var _14b=i18n.getLocalization("dijit","common");
lang.mixin(this,_14b);
this.inherited(arguments);
},postCreate:function(){
_139.set(this.domNode,{display:"none",position:"absolute"});
this.ownerDocumentBody.appendChild(this.domNode);
this.inherited(arguments);
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide");
this._modalconnects=[];
},onLoad:function(){
this._position();
if(this.autofocus&&_14c.isTop(this)){
this._getFocusItems(this.domNode);
_13f.focus(this._firstFocusItem);
}
this.inherited(arguments);
},_endDrag:function(){
var _14d=_138.position(this.domNode),_14e=_13c.getBox(this.ownerDocument);
_14d.y=Math.min(Math.max(_14d.y,0),(_14e.h-_14d.h));
_14d.x=Math.min(Math.max(_14d.x,0),(_14e.w-_14d.w));
this._relativePosition=_14d;
this._position();
},_setup:function(){
var node=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=new ((has("ie")==6)?_13e:_13d)(node,{handle:this.titleBar});
this.connect(this._moveable,"onMoveStop","_endDrag");
}else{
_137.add(node,"dijitDialogFixed");
}
this.underlayAttrs={dialogId:this.id,"class":_133.map(this["class"].split(/\s/),function(s){
return s+"_underlay";
}).join(" "),ownerDocument:this.ownerDocument};
},_size:function(){
this._checkIfSingleChild();
if(this._singleChild){
if(typeof this._singleChildOriginalStyle!="undefined"){
this._singleChild.domNode.style.cssText=this._singleChildOriginalStyle;
delete this._singleChildOriginalStyle;
}
}else{
_139.set(this.containerNode,{width:"auto",height:"auto"});
}
var bb=_138.position(this.domNode);
var _14f=_13c.getBox(this.ownerDocument);
_14f.w*=this.maxRatio;
_14f.h*=this.maxRatio;
if(bb.w>=_14f.w||bb.h>=_14f.h){
var _150=_138.position(this.containerNode),w=Math.min(bb.w,_14f.w)-(bb.w-_150.w),h=Math.min(bb.h,_14f.h)-(bb.h-_150.h);
if(this._singleChild&&this._singleChild.resize){
if(typeof this._singleChildOriginalStyle=="undefined"){
this._singleChildOriginalStyle=this._singleChild.domNode.style.cssText;
}
this._singleChild.resize({w:w,h:h});
}else{
_139.set(this.containerNode,{width:w+"px",height:h+"px",overflow:"auto",position:"relative"});
}
}else{
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize();
}
}
},_position:function(){
if(!_137.contains(this.ownerDocumentBody,"dojoMove")){
var node=this.domNode,_151=_13c.getBox(this.ownerDocument),p=this._relativePosition,bb=p?null:_138.position(node),l=Math.floor(_151.l+(p?p.x:(_151.w-bb.w)/2)),t=Math.floor(_151.t+(p?p.y:(_151.h-bb.h)/2));
_139.set(node,{left:l+"px",top:t+"px"});
}
},_onKey:function(evt){
if(evt.charOrCode){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.domNode);
}
var _152=(this._firstFocusItem==this._lastFocusItem);
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_152){
_13f.focus(this._lastFocusItem);
}
_13a.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_152){
_13f.focus(this._firstFocusItem);
}
_13a.stop(evt);
}else{
while(node){
if(node==this.domNode||_137.contains(node,"dijitPopup")){
if(evt.charOrCode==keys.ESCAPE){
this.onCancel();
}else{
return;
}
}
node=node.parentNode;
}
if(evt.charOrCode!==keys.TAB){
_13a.stop(evt);
}else{
if(!has("opera")){
try{
this._firstFocusItem.focus();
}
catch(e){
}
}
}
}
}
}
},show:function(){
if(this.open){
return;
}
if(!this._started){
this.startup();
}
if(!this._alreadyInitialized){
this._setup();
this._alreadyInitialized=true;
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
}
var win=_13c.get(this.ownerDocument);
this._modalconnects.push(on(win,"scroll",lang.hitch(this,"resize")));
this._modalconnects.push(on(this.domNode,_134._keypress,lang.hitch(this,"_onKey")));
_139.set(this.domNode,{opacity:0,display:""});
this._set("open",true);
this._onShow();
this._size();
this._position();
var _153;
this._fadeInDeferred=new _136(lang.hitch(this,function(){
_153.stop();
delete this._fadeInDeferred;
}));
_153=fx.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:lang.hitch(this,function(){
_14c.show(this,this.underlayAttrs);
}),onEnd:lang.hitch(this,function(){
if(this.autofocus&&_14c.isTop(this)){
this._getFocusItems(this.domNode);
_13f.focus(this._firstFocusItem);
}
this._fadeInDeferred.resolve(true);
delete this._fadeInDeferred;
})}).play();
return this._fadeInDeferred;
},hide:function(){
if(!this._alreadyInitialized||!this.open){
return;
}
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
var _154;
this._fadeOutDeferred=new _136(lang.hitch(this,function(){
_154.stop();
delete this._fadeOutDeferred;
}));
this._fadeOutDeferred.then(lang.hitch(this,"onHide"));
_154=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,function(){
this.domNode.style.display="none";
_14c.hide(this);
this._fadeOutDeferred.resolve(true);
delete this._fadeOutDeferred;
})}).play();
if(this._scrollConnected){
this._scrollConnected=false;
}
var h;
while(h=this._modalconnects.pop()){
h.remove();
}
if(this._relativePosition){
delete this._relativePosition;
}
this._set("open",false);
return this._fadeOutDeferred;
},resize:function(){
if(this.domNode.style.display!="none"){
if(_146._singleton){
_146._singleton.layout();
}
this._position();
this._size();
}
},destroy:function(){
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
}
if(this._moveable){
this._moveable.destroy();
}
var h;
while(h=this._modalconnects.pop()){
h.remove();
}
_14c.hide(this);
this.inherited(arguments);
}});
var _155=_135("dijit.Dialog",[_147,_14a],{});
_155._DialogBase=_14a;
var _14c=_155._DialogLevelManager={_beginZIndex:950,show:function(_156,_157){
ds[ds.length-1].focus=_13f.curNode;
var _158=_146._singleton;
if(!_158||_158._destroyed){
_158=_149._underlay=_146._singleton=new _146(_157);
}else{
_158.set(_156.underlayAttrs);
}
var _159=ds[ds.length-1].dialog?ds[ds.length-1].zIndex+2:_155._DialogLevelManager._beginZIndex;
if(ds.length==1){
_158.show();
}
_139.set(_146._singleton.domNode,"zIndex",_159-1);
_139.set(_156.domNode,"zIndex",_159);
ds.push({dialog:_156,underlayAttrs:_157,zIndex:_159});
},hide:function(_15a){
if(ds[ds.length-1].dialog==_15a){
ds.pop();
var pd=ds[ds.length-1];
if(!_146._singleton._destroyed){
if(ds.length==1){
_146._singleton.hide();
}else{
_139.set(_146._singleton.domNode,"zIndex",pd.zIndex-1);
_146._singleton.set(pd.underlayAttrs);
}
}
if(_15a.refocus){
var _15b=pd.focus;
if(pd.dialog&&(!_15b||!dom.isDescendant(_15b,pd.dialog.domNode))){
pd.dialog._getFocusItems(pd.dialog.domNode);
_15b=pd.dialog._firstFocusItem;
}
if(_15b){
try{
_15b.focus();
}
catch(e){
}
}
}
}else{
var idx=_133.indexOf(_133.map(ds,function(elem){
return elem.dialog;
}),_15a);
if(idx!=-1){
ds.splice(idx,1);
}
}
},isTop:function(_15c){
return ds[ds.length-1].dialog==_15c;
}};
var ds=_155._dialogStack=[{dialog:null,focus:null,underlayAttrs:null}];
if(has("dijit-legacy-requires")){
_13b(0,function(){
var _15d=["dijit/TooltipDialog"];
_132(_15d);
});
}
return _155;
});
},"dojox/html/metrics":function(){
define("dojox/html/metrics",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/sniff","dojo/ready","dojo/_base/unload","dojo/_base/window","dojo/dom-geometry"],function(_15e,lang,has,_15f,_160,_161,_162){
var dhm=lang.getObject("dojox.html.metrics",true);
var _163=lang.getObject("dojox");
dhm.getFontMeasurements=function(){
var _164={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,"small":0,"medium":0,"large":0,"x-large":0,"xx-large":0};
if(has("ie")){
_161.doc.documentElement.style.fontSize="100%";
}
var div=_161.doc.createElement("div");
var ds=div.style;
ds.position="absolute";
ds.left="-100px";
ds.top="0";
ds.width="30px";
ds.height="1000em";
ds.borderWidth="0";
ds.margin="0";
ds.padding="0";
ds.outline="0";
ds.lineHeight="1";
ds.overflow="hidden";
_161.body().appendChild(div);
for(var p in _164){
ds.fontSize=p;
_164[p]=Math.round(div.offsetHeight*12/16)*16/12/1000;
}
_161.body().removeChild(div);
div=null;
return _164;
};
var _165=null;
dhm.getCachedFontMeasurements=function(_166){
if(_166||!_165){
_165=dhm.getFontMeasurements();
}
return _165;
};
var _167=null,_168={};
dhm.getTextBox=function(text,_169,_16a){
var m,s;
if(!_167){
m=_167=_161.doc.createElement("div");
var c=_161.doc.createElement("div");
c.appendChild(m);
s=c.style;
s.overflow="scroll";
s.position="absolute";
s.left="0px";
s.top="-10000px";
s.width="1px";
s.height="1px";
s.visibility="hidden";
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
_161.body().appendChild(c);
}else{
m=_167;
}
m.className="";
s=m.style;
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
if(arguments.length>1&&_169){
for(var i in _169){
if(i in _168){
continue;
}
s[i]=_169[i];
}
}
if(arguments.length>2&&_16a){
m.className=_16a;
}
m.innerHTML=text;
var box=_162.position(m);
box.w=m.parentNode.scrollWidth;
return box;
};
var _16b={w:16,h:16};
dhm.getScrollbar=function(){
return {w:_16b.w,h:_16b.h};
};
dhm._fontResizeNode=null;
dhm.initOnFontResize=function(_16c){
var f=dhm._fontResizeNode=_161.doc.createElement("iframe");
var fs=f.style;
fs.position="absolute";
fs.width="5em";
fs.height="10em";
fs.top="-10000px";
fs.display="none";
if(has("ie")){
f.onreadystatechange=function(){
if(f.contentWindow.document.readyState=="complete"){
f.onresize=f.contentWindow.parent[_163._scopeName].html.metrics._fontresize;
}
};
}else{
f.onload=function(){
f.contentWindow.onresize=f.contentWindow.parent[_163._scopeName].html.metrics._fontresize;
};
}
f.setAttribute("src","javascript:'<html><head><script>if(\"loadFirebugConsole\" in window){window.loadFirebugConsole();}</script></head><body></body></html>'");
_161.body().appendChild(f);
dhm.initOnFontResize=function(){
};
};
dhm.onFontResize=function(){
};
dhm._fontresize=function(){
dhm.onFontResize();
};
_160.addOnUnload(function(){
var f=dhm._fontResizeNode;
if(f){
if(has("ie")&&f.onresize){
f.onresize=null;
}else{
if(f.contentWindow&&f.contentWindow.onresize){
f.contentWindow.onresize=null;
}
}
dhm._fontResizeNode=null;
}
});
_15f(function(){
try{
var n=_161.doc.createElement("div");
n.style.cssText="top:0;left:0;width:100px;height:100px;overflow:scroll;position:absolute;visibility:hidden;";
_161.body().appendChild(n);
_16b.w=n.offsetWidth-n.clientWidth;
_16b.h=n.offsetHeight-n.clientHeight;
_161.body().removeChild(n);
delete n;
}
catch(e){
}
if("fontSizeWatch" in _15e.config&&!!_15e.config.fontSizeWatch){
dhm.initOnFontResize();
}
});
return dhm;
});
},"davinci/de/resource":function(){
define(["davinci/de/widgets/NewDijit","davinci/Workbench","davinci/workbench/Preferences","system/resource","davinci/Runtime","davinci/de/DijitTemplatedGenerator","davinci/library","davinci/ui/Dialog","davinci/ve/actions/ReplaceAction"],function(_16d,_16e,_16f,_170,_171,_172,_173,_174,_175){
var dt={WIDGETS_JSON:{"name":"custom",longName:"Custom Widgets",version:"1.0",localPath:true,"categories":{"custom":{name:"User Widgets",description:"User Widgets",widgetClass:"dijit"}},widgets:[]},createDijiFromNewDialog:function(){
var _176=new _16d({});
var _177=_16e.getOpenEditor();
var _178=_177.fileName;
var _179=_170.findResource(_178);
var _17a=_177.model;
var _17b=_16e.getOpenEditor();
var _17c=_17b.getContext();
var _17d=_17c.getSelection();
if(!dt.validWidget(_17d)){
_174.showModal("Invalid Selection.  Please select a single container widget to create a new Widget","Error creating Widget...");
return;
}
_16e.showModal(_176,"Dijit Widget...",{height:160,width:250},function(){
if(!_176.cancel){
var _17e=_176.attr("value");
dt.createDijit(_17e,_17a,_179,_17c,_17d);
if(_17e.replaceSelection){
var ra=new _175();
ra.run(_17c,_17e.group+"."+_17e.name);
}
}
return true;
});
},validWidget:function(_17f){
if(_17f==null||_17f.length!=1){
return false;
}
var _180=_17f[0];
return (_180.acceptsHTMLChildren);
},_createNameSpace:function(name,_181){
var _182=name.split(".");
var base=_16e.getProject();
_181=_181||_170.findResource(base);
if(_182.length>1){
for(var i=0;i<_182.length-1;i++){
var _183=_181.getChildSync(_182[i]);
if(_183!=null){
_181=_183;
}else{
_181=_181.createResource(_182[i],true);
}
}
}
return _181;
},_createFolder:function(name,_184){
var _185=name.split("/");
var base=_16e.getProject();
_184=_184||_170.findResource(base);
if(_185.length){
for(var i=0;i<_185.length;i++){
if(_185[i]=="."){
continue;
}
var _186=_184.getChildSync(_185[i]);
if(_186!=null){
_184=_186;
}else{
_184=_184.createResource(_185[i],true);
}
}
}
return _184;
},createDijit:function(_187,_188,_189,_18a,_18b){
var _18c=_187.group+"."+_187.name;
var base=_16e.getProject();
var _18d=_16f.getPreferences("davinci.ui.ProjectPrefs",base);
if(!_18d["widgetFolder"]){
_18d.widgetFolder="./WebContent/custom";
_16f.savePreferences("davinci.ui.ProjectPrefs",base,_18d);
}
var _18e=dt._createFolder(_18d["widgetFolder"]);
var _18f=dt._createNameSpace(_18c,_18e);
var _190=_18f.getChildSync(_187.name+"_widgets.json");
if(_190==null){
_190=_18f.createResource(_187.name+"_widgets.json");
}
var _191=dojo.clone(dt.WIDGETS_JSON);
_191.widgets.push({name:_187.name,description:"Custom user widget "+_187.name,type:_18c,category:"custom",iconLocal:true,icon:"app/davinci/img/maqetta.png"});
_190.setContents(dojo.toJson(_191));
var _192=_18e;
var _193=new _172({});
var _194=_193.buildSource(_188,_18c,_187.name,false,_18a,_18b);
for(var type in _194){
switch(type){
case "amd":
break;
case "html":
var html=_18f.createResource(_187.name+".html");
html.setContents(_194.html);
break;
case "js":
var _195=_18f.createResource(_187.name+".js");
_195.setContents(_194.js);
break;
case "metadata":
var _196=_18f.createResource(_187.name+"_oam.json");
_196.setContents(_194.metadata);
_173.addCustomWidgets(base,_191);
break;
}
}
}};
return dt;
});
},"dojo/date/locale":function(){
define(["../_base/lang","../_base/array","../date","../cldr/supplemental","../i18n","../regexp","../string","../i18n!../cldr/nls/gregorian","module"],function(lang,_197,date,_198,i18n,_199,_19a,_19b,_19c){
var _19d={};
lang.setObject(_19c.id.replace(/\//g,"."),_19d);
function _19e(_19f,_1a0,_1a1,_1a2){
return _1a2.replace(/([a-z])\1*/ig,function(_1a3){
var s,pad,c=_1a3.charAt(0),l=_1a3.length,_1a4=["abbr","wide","narrow"];
switch(c){
case "G":
s=_1a0[(l<4)?"eraAbbr":"eraNames"][_19f.getFullYear()<0?0:1];
break;
case "y":
s=_19f.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_1a1.fullYear){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
pad=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_19f.getMonth()+1)/3);
pad=true;
break;
case "M":
case "L":
var m=_19f.getMonth();
if(l<3){
s=m+1;
pad=true;
}else{
var _1a5=["months",c=="L"?"standAlone":"format",_1a4[l-3]].join("-");
s=_1a0[_1a5][m];
}
break;
case "w":
var _1a6=0;
s=_19d._getWeekOfYear(_19f,_1a6);
pad=true;
break;
case "d":
s=_19f.getDate();
pad=true;
break;
case "D":
s=_19d._getDayOfYear(_19f);
pad=true;
break;
case "e":
case "c":
var d=_19f.getDay();
if(l<2){
s=(d-_198.getFirstDayOfWeek(_1a1.locale)+8)%7;
break;
}
case "E":
d=_19f.getDay();
if(l<3){
s=d+1;
pad=true;
}else{
var _1a7=["days",c=="c"?"standAlone":"format",_1a4[l-3]].join("-");
s=_1a0[_1a7][d];
}
break;
case "a":
var _1a8=_19f.getHours()<12?"am":"pm";
s=_1a1[_1a8]||_1a0["dayPeriods-format-wide-"+_1a8];
break;
case "h":
case "H":
case "K":
case "k":
var h=_19f.getHours();
switch(c){
case "h":
s=(h%12)||12;
break;
case "H":
s=h;
break;
case "K":
s=(h%12);
break;
case "k":
s=h||24;
break;
}
pad=true;
break;
case "m":
s=_19f.getMinutes();
pad=true;
break;
case "s":
s=_19f.getSeconds();
pad=true;
break;
case "S":
s=Math.round(_19f.getMilliseconds()*Math.pow(10,l-3));
pad=true;
break;
case "v":
case "z":
s=_19d._getZone(_19f,true,_1a1);
if(s){
break;
}
l=4;
case "Z":
var _1a9=_19d._getZone(_19f,false,_1a1);
var tz=[(_1a9<=0?"+":"-"),_19a.pad(Math.floor(Math.abs(_1a9)/60),2),_19a.pad(Math.abs(_1a9)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_1a2);
}
if(pad){
s=_19a.pad(s,l);
}
return s;
});
};
_19d._getZone=function(_1aa,_1ab,_1ac){
if(_1ab){
return date.getTimezoneName(_1aa);
}else{
return _1aa.getTimezoneOffset();
}
};
_19d.format=function(_1ad,_1ae){
_1ae=_1ae||{};
var _1af=i18n.normalizeLocale(_1ae.locale),_1b0=_1ae.formatLength||"short",_1b1=_19d._getGregorianBundle(_1af),str=[],_1b2=lang.hitch(this,_19e,_1ad,_1b1,_1ae);
if(_1ae.selector=="year"){
return _1b3(_1b1["dateFormatItem-yyyy"]||"yyyy",_1b2);
}
var _1b4;
if(_1ae.selector!="date"){
_1b4=_1ae.timePattern||_1b1["timeFormat-"+_1b0];
if(_1b4){
str.push(_1b3(_1b4,_1b2));
}
}
if(_1ae.selector!="time"){
_1b4=_1ae.datePattern||_1b1["dateFormat-"+_1b0];
if(_1b4){
str.push(_1b3(_1b4,_1b2));
}
}
return str.length==1?str[0]:_1b1["dateTimeFormat-"+_1b0].replace(/\{(\d+)\}/g,function(_1b5,key){
return str[key];
});
};
_19d.regexp=function(_1b6){
return _19d._parseInfo(_1b6).regexp;
};
_19d._parseInfo=function(_1b7){
_1b7=_1b7||{};
var _1b8=i18n.normalizeLocale(_1b7.locale),_1b9=_19d._getGregorianBundle(_1b8),_1ba=_1b7.formatLength||"short",_1bb=_1b7.datePattern||_1b9["dateFormat-"+_1ba],_1bc=_1b7.timePattern||_1b9["timeFormat-"+_1ba],_1bd;
if(_1b7.selector=="date"){
_1bd=_1bb;
}else{
if(_1b7.selector=="time"){
_1bd=_1bc;
}else{
_1bd=_1b9["dateTimeFormat-"+_1ba].replace(/\{(\d+)\}/g,function(_1be,key){
return [_1bc,_1bb][key];
});
}
}
var _1bf=[],re=_1b3(_1bd,lang.hitch(this,_1c0,_1bf,_1b9,_1b7));
return {regexp:re,tokens:_1bf,bundle:_1b9};
};
_19d.parse=function(_1c1,_1c2){
var _1c3=/[\u200E\u200F\u202A\u202E]/g,info=_19d._parseInfo(_1c2),_1c4=info.tokens,_1c5=info.bundle,re=new RegExp("^"+info.regexp.replace(_1c3,"")+"$",info.strict?"":"i"),_1c6=re.exec(_1c1&&_1c1.replace(_1c3,""));
if(!_1c6){
return null;
}
var _1c7=["abbr","wide","narrow"],_1c8=[1970,0,1,0,0,0,0],amPm="",_1c9=_197.every(_1c6,function(v,i){
if(!i){
return true;
}
var _1ca=_1c4[i-1],l=_1ca.length,c=_1ca.charAt(0);
switch(c){
case "y":
if(l!=2&&_1c2.strict){
_1c8[0]=v;
}else{
if(v<100){
v=Number(v);
var year=""+new Date().getFullYear(),_1cb=year.substring(0,2)*100,_1cc=Math.min(Number(year.substring(2,4))+20,99);
_1c8[0]=(v<_1cc)?_1cb+v:_1cb-100+v;
}else{
if(_1c2.strict){
return false;
}
_1c8[0]=v;
}
}
break;
case "M":
case "L":
if(l>2){
var _1cd=_1c5["months-"+(c=="L"?"standAlone":"format")+"-"+_1c7[l-3]].concat();
if(!_1c2.strict){
v=v.replace(".","").toLowerCase();
_1cd=_197.map(_1cd,function(s){
return s.replace(".","").toLowerCase();
});
}
v=_197.indexOf(_1cd,v);
if(v==-1){
return false;
}
}else{
v--;
}
_1c8[1]=v;
break;
case "E":
case "e":
case "c":
var days=_1c5["days-"+(c=="c"?"standAlone":"format")+"-"+_1c7[l-3]].concat();
if(!_1c2.strict){
v=v.toLowerCase();
days=_197.map(days,function(d){
return d.toLowerCase();
});
}
v=_197.indexOf(days,v);
if(v==-1){
return false;
}
break;
case "D":
_1c8[1]=0;
case "d":
_1c8[2]=v;
break;
case "a":
var am=_1c2.am||_1c5["dayPeriods-format-wide-am"],pm=_1c2.pm||_1c5["dayPeriods-format-wide-pm"];
if(!_1c2.strict){
var _1ce=/\./g;
v=v.replace(_1ce,"").toLowerCase();
am=am.replace(_1ce,"").toLowerCase();
pm=pm.replace(_1ce,"").toLowerCase();
}
if(_1c2.strict&&v!=am&&v!=pm){
return false;
}
amPm=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_1c8[3]=v;
break;
case "m":
_1c8[4]=v;
break;
case "s":
_1c8[5]=v;
break;
case "S":
_1c8[6]=v;
}
return true;
});
var _1cf=+_1c8[3];
if(amPm==="p"&&_1cf<12){
_1c8[3]=_1cf+12;
}else{
if(amPm==="a"&&_1cf==12){
_1c8[3]=0;
}
}
var _1d0=new Date(_1c8[0],_1c8[1],_1c8[2],_1c8[3],_1c8[4],_1c8[5],_1c8[6]);
if(_1c2.strict){
_1d0.setFullYear(_1c8[0]);
}
var _1d1=_1c4.join(""),_1d2=_1d1.indexOf("d")!=-1,_1d3=_1d1.indexOf("M")!=-1;
if(!_1c9||(_1d3&&_1d0.getMonth()>_1c8[1])||(_1d2&&_1d0.getDate()>_1c8[2])){
return null;
}
if((_1d3&&_1d0.getMonth()<_1c8[1])||(_1d2&&_1d0.getDate()<_1c8[2])){
_1d0=date.add(_1d0,"hour",1);
}
return _1d0;
};
function _1b3(_1d4,_1d5,_1d6,_1d7){
var _1d8=function(x){
return x;
};
_1d5=_1d5||_1d8;
_1d6=_1d6||_1d8;
_1d7=_1d7||_1d8;
var _1d9=_1d4.match(/(''|[^'])+/g),_1da=_1d4.charAt(0)=="'";
_197.forEach(_1d9,function(_1db,i){
if(!_1db){
_1d9[i]="";
}else{
_1d9[i]=(_1da?_1d6:_1d5)(_1db.replace(/''/g,"'"));
_1da=!_1da;
}
});
return _1d7(_1d9.join(""));
};
function _1c0(_1dc,_1dd,_1de,_1df){
_1df=_199.escapeString(_1df);
if(!_1de.strict){
_1df=_1df.replace(" a"," ?a");
}
return _1df.replace(/([a-z])\1*/ig,function(_1e0){
var s,c=_1e0.charAt(0),l=_1e0.length,p2="",p3="";
if(_1de.strict){
if(l>1){
p2="0"+"{"+(l-1)+"}";
}
if(l>2){
p3="0"+"{"+(l-2)+"}";
}
}else{
p2="0?";
p3="0{0,2}";
}
switch(c){
case "y":
s="\\d{2,4}";
break;
case "M":
case "L":
s=(l>2)?"\\S+?":"1[0-2]|"+p2+"[1-9]";
break;
case "D":
s="[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|"+p2+"[1-9][0-9]|"+p3+"[1-9]";
break;
case "d":
s="3[01]|[12]\\d|"+p2+"[1-9]";
break;
case "w":
s="[1-4][0-9]|5[0-3]|"+p2+"[1-9]";
break;
case "E":
case "e":
case "c":
s="\\S+";
break;
case "h":
s="1[0-2]|"+p2+"[1-9]";
break;
case "k":
s="1[01]|"+p2+"\\d";
break;
case "H":
s="1\\d|2[0-3]|"+p2+"\\d";
break;
case "K":
s="1\\d|2[0-4]|"+p2+"[1-9]";
break;
case "m":
case "s":
s="[0-5]\\d";
break;
case "S":
s="\\d{"+l+"}";
break;
case "a":
var am=_1de.am||_1dd["dayPeriods-format-wide-am"],pm=_1de.pm||_1dd["dayPeriods-format-wide-pm"];
s=am+"|"+pm;
if(!_1de.strict){
if(am!=am.toLowerCase()){
s+="|"+am.toLowerCase();
}
if(pm!=pm.toLowerCase()){
s+="|"+pm.toLowerCase();
}
if(s.indexOf(".")!=-1){
s+="|"+s.replace(/\./g,"");
}
}
s=s.replace(/\./g,"\\.");
break;
default:
s=".*";
}
if(_1dc){
_1dc.push(_1e0);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
var _1e1=[];
_19d.addCustomFormats=function(_1e2,_1e3){
_1e1.push({pkg:_1e2,name:_1e3});
};
_19d._getGregorianBundle=function(_1e4){
var _1e5={};
_197.forEach(_1e1,function(desc){
var _1e6=i18n.getLocalization(desc.pkg,desc.name,_1e4);
_1e5=lang.mixin(_1e5,_1e6);
},this);
return _1e5;
};
_19d.addCustomFormats(_19c.id.replace(/\/date\/locale$/,".cldr"),"gregorian");
_19d.getNames=function(item,type,_1e7,_1e8){
var _1e9,_1ea=_19d._getGregorianBundle(_1e8),_1eb=[item,_1e7,type];
if(_1e7=="standAlone"){
var key=_1eb.join("-");
_1e9=_1ea[key];
if(_1e9[0]==1){
_1e9=undefined;
}
}
_1eb[1]="format";
return (_1e9||_1ea[_1eb.join("-")]).concat();
};
_19d.isWeekend=function(_1ec,_1ed){
var _1ee=_198.getWeekend(_1ed),day=(_1ec||new Date()).getDay();
if(_1ee.end<_1ee.start){
_1ee.end+=7;
if(day<_1ee.start){
day+=7;
}
}
return day>=_1ee.start&&day<=_1ee.end;
};
_19d._getDayOfYear=function(_1ef){
return date.difference(new Date(_1ef.getFullYear(),0,1,_1ef.getHours()),_1ef)+1;
};
_19d._getWeekOfYear=function(_1f0,_1f1){
if(arguments.length==1){
_1f1=0;
}
var _1f2=new Date(_1f0.getFullYear(),0,1).getDay(),adj=(_1f2-_1f1+7)%7,week=Math.floor((_19d._getDayOfYear(_1f0)+adj-1)/7);
if(_1f2==_1f1){
week++;
}
return week;
};
return _19d;
});
},"davinci/ui.plugin":function(){
define(["require","davinci/css!./ui.css"],function(_1f3){
return {id:"davinci.ui","davinci.view":[{id:"navigator",title:"Files",viewClass:"davinci/workbench/Explorer",iconClass:"paletteIcon paletteIconFiles"},{id:"hierarchy",title:"Hierarchy"},{id:"outline",title:"Outline",viewClass:"davinci/workbench/OutlineView",iconClass:"paletteIcon paletteIconOutline"},{id:"comment",title:"Comments",viewClass:"davinci/review/view/CommentView",iconClass:"paletteIcon paletteIconComments"},{id:"scope",title:"Scope"},{id:"properties",title:"Properties",viewClass:"davinci/workbench/PropertyEditor"},{id:"problems",title:"Problems",viewClass:"davinci/workbench/ProblemsView"},{id:"console",title:"Console"},{id:"history",title:"History"},{id:"search",title:"Search"}],"davinci.preferences":[{name:"Project",id:"project",category:"",pageContent:"Project Settings here"},{name:"Project Settings",id:"ProjectPrefs",category:"davinci.ui.project",pane:"davinci/ui/ProjectPreferences",defaultValues:{"webContentFolder":"","themeFolder":"themes","widgetFolder":"lib/custom"}}],"davinci.perspective":{id:"main",title:"AJAX IDE",views:[{viewID:"davinci.ui.navigator",position:"left-bottom"},{viewID:"davinci.ui.outline",position:"right"},{viewID:"davinci.ui.properties",position:"right-bottom"}]},"davinci.actionSets":[{id:"editorActions",visible:true,menu:[{__mainMenu:true,separator:["new",false,"open",false]},{label:"Create",path:"new",id:"davinci.new",separator:["newApp",true,"newSketch",true,"newFolder",true,"newTheme",true,"newProject",true,"additions",true]},{label:"Open",path:"open",id:"davinci.open",separator:["openFile",true,"openTheme",true,"openProject",true,"openOrion",true,"additions",false]}],actions:[{id:"newHTMLMobile",run:function(){
_1f3(["./ui/Resource"],function(r){
r.newHTMLMobile();
});
},iconClass:"newOpenMenuItem newMobileAppMenuItem",label:"Mobile Application...",menubarPath:"davinci.new/newApp"},{id:"newHTMLDesktop",run:function(){
_1f3(["./ui/Resource"],function(r){
r.newHTMLDesktop();
});
},iconClass:"newOpenMenuItem newDesktopAppMenuItem",label:"Desktop Application...",menubarPath:"davinci.new/newApp"},{id:"newHTMLSketchHiFi",run:function(){
_1f3(["./ui/Resource"],function(r){
r.newHTMLSketchHiFi();
});
},iconClass:"newOpenMenuItem newSketchHiFiMenuItem",label:"Sketch (high-fidelity)...",menubarPath:"davinci.new/newSketch"},{id:"newHTMLSketchLoFi",run:function(){
_1f3(["./ui/Resource"],function(r){
r.newHTMLSketchLoFi();
});
},iconClass:"newOpenMenuItem newSketchLoFiMenuItem",label:"Sketch (low-fidelity)...",menubarPath:"davinci.new/newSketch"},{id:"newFolder",run:function(){
_1f3(["./ui/Resource"],function(r){
r.newFolder();
});
},iconClass:"newOpenMenuItem newFolderMenuItem",label:"Folder...",menubarPath:"davinci.new/newFolder"},{id:"newCSS",run:function(){
_1f3(["./ui/Resource"],function(r){
r.newCSS();
});
},iconClass:"newOpenMenuItem newCSSMenuItem",label:"CSS File...",menubarPath:"davinci.new/newFolder"},{id:"newJS",run:function(){
_1f3(["./ui/Resource"],function(r){
r.newJS();
});
},iconClass:"newOpenMenuItem newJSMenuItem",label:"JavaScript File...",menubarPath:"davinci.new/newFolder"},{id:"newTheme",run:function(){
_1f3(["davinci/Workbench","davinci/ui/NewTheme"],function(_1f4,_1f5){
_1f4.showModal(new _1f5(),"New Theme",{width:300},null,true);
});
},iconClass:"newOpenMenuItem newThemeMenuItem",label:"Theme...",menubarPath:"davinci.new/newTheme"},{id:"newProject",run:function(){
_1f3(["./ui/Resource"],function(r){
r.newProject();
});
},iconClass:"newOpenMenuItem newProjectMenuItem",label:"Project...",menubarPath:"davinci.new/newProject"},{id:"openFile",run:function(){
_1f3(["./ui/Resource"],function(r){
r.openFile();
});
},iconClass:"newOpenMenuItem openFileMenuItem",label:"File...",toolbarPath:"davinci.toolbar.main/edit",menubarPath:"davinci.open/openFile",keyBinding:{accel:true,charOrCode:"o"}},{id:"openThemeEditor",run:function(){
_1f3(["davinci/Workbench","davinci/ui/OpenThemeDialog"],function(_1f6,_1f7){
_1f6.showModal(new _1f7(),"Open Theme",{width:200},null,true);
});
},iconClass:"newOpenMenuItem openThemeMenuItem",label:"Theme Editor...",menubarPath:"davinci.open/openTheme"},{id:"openReview",run:function(){
_1f3(["./ui/Resource"],function(r){
r.openFile();
});
},run:function(){
_1f3(["davinci/Workbench","davinci/review/widgets/OpenReviewDialog"],function(_1f8,_1f9){
_1f8.showModal(new _1f9(),"Open Review",{width:350,height:250});
});
},iconClass:"newOpenMenuItem openReviewMenuItem",label:"Review...",menubarPath:"davinci.open/openTheme"},{id:"openProject",run:function(){
_1f3(["davinci/Workbench","davinci/ui/SelectProjectDialog"],function(_1fa,_1fb){
_1fa.showModal(new _1fb(),"Open Project",{width:300},null,true);
});
},iconClass:"newOpenMenuItem newProjectMenuItem",label:"Project...",menubarPath:"davinci.open/openProject"},{id:"orionNavigator",run:function(){
window.open("/navigate/table.html#","_blank");
window.focus();
},iconClass:"newOpenMenuItem orionIcon",label:"Orion Navigator",menubarPath:"davinci.open/openOrion"}]},{id:"main",visible:true,menu:[{__mainMenu:true,separator:["usersettings",false,"settings",false,"additions",false,"help",false]},{label:"UserSettings",path:"usersettings",id:"davinci.usersettings",className:"userSettingsMenu",iconClass:"userSettingsMenuIcon",showLabel:false,separator:["username",true,"logout",true,"additions",false]},{label:"Settings",path:"settings",id:"davinci.settings",className:"appSettingsMenu",iconClass:"appSettingsMenuIcon",showLabel:false,separator:["settings",true,"additions",false]},{label:"Help",path:"help",id:"davinci.help",className:"helpMenu",iconClass:"helpMenuIcon",showLabel:false,separator:["help",true,"about",false,"additions",false]}],actions:[{id:"editPreferences",run:function(){
_1f3(["davinci/workbench/Preferences"],function(_1fc){
_1fc.showPreferencePage();
});
},label:"Preferences...",menubarPath:"davinci.settings/settings"},{id:"editThemeSets",run:function(){
_1f3(["davinci/ui/ThemeSetsDialog"],function(_1fd){
_1fd();
});
},label:"Theme sets...",menubarPath:"davinci.settings/settings"},{id:"showHelp",run:function(){
window.open("app/docs/index.html","MaqettaDocumentation");
},label:"Documentation",menubarPath:"davinci.help/help",keyBinding:{charOrCode:dojo.keys.F1}},{id:"showTutotials",run:function(){
window.open("app/docs/index.html#tutorials/tutorials","MaqettaTutorials");
},label:"Tutorials",menubarPath:"davinci.help/help"},{id:"showVideos",run:function(){
window.open("http://www.youtube.com/user/Maqetta/","MaqettaVideos");
},label:"Videos",menubarPath:"davinci.help/help"},{id:"showCheatSheets",run:function(){
window.open("app/docs/index.html#cheatsheets/cheatsheets","MaqettaCheatSheets");
},label:"Cheat sheets",menubarPath:"davinci.help/help"},{id:"showHowTo",run:function(){
window.open("https://www.ibm.com/search/csass/search/?sn=dw&en=utf&hpp=20&dws=dw&q=maqetta&Search=Search","MaqettaHowTo");
},label:"How-to articles",menubarPath:"davinci.help/help"},{id:"about",run:function(){
_1f3(["davinci/ui/about"],function(_1fe){
_1fe.show();
});
},label:"About Maqetta",menubarPath:"davinci.help/about"},{id:"username",action:"davinci/actions/UserNameAction",run:function(){
},label:"{user}",menubarPath:"davinci.usersettings/username"},{id:"logout",action:"davinci/actions/LogoutAction",label:"Logout",menubarPath:"davinci.usersettings/logout"}]},{id:"explorerActions",visible:true,actions:[{id:"davinci.ui.newfile",label:"New folder...",iconClass:"newFolderIcon",run:function(){
_1f3(["./ui/Resource"],function(r){
r.newFolder();
});
},isEnabled:function(item){
return _1f3("./ui/Resource").canModify(item);
},menubarPath:"newfolder"},{id:"davinci.ui.addFiles",label:"Upload files...",iconClass:"uploadIcon",run:function(){
_1f3(["./ui/Resource"],function(r){
r.addFiles();
});
},isEnabled:function(item){
return _1f3("./ui/Resource").canModify(item);
},menubarPath:"addFiles"},{id:"davinci.ui.rename",label:"Rename...",iconClass:"renameIcon",run:function(){
_1f3(["./ui/Resource"],function(r){
r.renameAction();
});
},isEnabled:function(item){
return _1f3("./ui/Resource").canModify(item);
},menubarPath:"addFiles"},{id:"davinci.ui.delete",label:"Delete",iconClass:"deleteIcon",isEnabled:function(item){
return _1f3("./ui/Resource").canModify(item);
},run:function(){
_1f3(["./ui/Resource"],function(r){
r.deleteAction();
});
},menubarPath:"delete",keyBinding:{charOrCode:[dojo.keys.DELETE,dojo.keys.BACKSPACE]}},{id:"davinci.ui.download",label:"Download",iconClass:"downloadSomeIcon",action:"davinci/actions/DownloadAction",isEnabled:function(item){
return _1f3("./ui/Resource").canModify(item);
},menubarPath:"delete"}]}],"davinci.actionSetPartAssociations":[{targetID:"davinci.ui.editorActions",parts:["davinci.ui.editorMenuBar"]},{targetID:"davinci.ui.explorerActions",parts:["davinci.ui.navigator"]}],"davinci.viewActions":[{viewContribution:{targetID:"davinci.ui.problems",actions:[{id:"Copy2",iconClass:"copyIcon",run:function(){
alert("view toolbar");
},label:"Copy",toolbarPath:"davinci.toolbar.main/edit",menubarPath:"davinci.edit/cut"}]}},{viewContribution:{targetID:"workbench.Explorer",actions:[{id:"download",iconClass:"downloadAllIcon",run:function(){
_1f3(["./Workbench","./ui/Download"],function(_1ff,_200){
_1ff.showModal(new _200(),"Download",{width:440});
});
},label:"Download Entire Workspace",toolbarPath:"download"},{id:"download",iconClass:"downloadSomeIcon",run:function(){
_1f3(["./Workbench","./ui/DownloadSelected"],function(_201,_202){
_201.showModal(new _202(),"Download",{width:440});
});
},label:"Download Selected Files",toolbarPath:"download"},{id:"userlibs",iconClass:"userLibIcon",run:function(){
_1f3(["./Workbench","./ui/UserLibraries"],function(_203,_204){
_203.showModal(new _204(),"User Libraries","width: 400px");
});
},label:"Modify Libraries",toolbarPath:"download"}]}}]};
});
},"dijit/_Templated":function(){
define(["./_WidgetBase","./_TemplatedMixin","./_WidgetsInTemplateMixin","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/kernel"],function(_205,_206,_207,_208,_209,lang,_20a){
lang.extend(_205,{waiRole:"",waiState:""});
return _209("dijit._Templated",[_206,_207],{widgetsInTemplate:false,constructor:function(){
_20a.deprecated(this.declaredClass+": dijit._Templated deprecated, use dijit._TemplatedMixin and if necessary dijit._WidgetsInTemplateMixin","","2.0");
},_attachTemplateNodes:function(_20b,_20c){
this.inherited(arguments);
var _20d=lang.isArray(_20b)?_20b:(_20b.all||_20b.getElementsByTagName("*"));
var x=lang.isArray(_20b)?0:-1;
for(;x<_20d.length;x++){
var _20e=(x==-1)?_20b:_20d[x];
var role=_20c(_20e,"waiRole");
if(role){
_20e.setAttribute("role",role);
}
var _20f=_20c(_20e,"waiState");
if(_20f){
_208.forEach(_20f.split(/\s*,\s*/),function(_210){
if(_210.indexOf("-")!=-1){
var pair=_210.split("-");
_20e.setAttribute("aria-"+pair[0],pair[1]);
}
});
}
}
}});
});
},"davinci/review/model/Resource":function(){
define(["dojo/_base/declare","davinci/review/model/resource/root"],function(_211,root){
var _212=null;
return {getRoot:function(){
if(!_212){
_212=root;
}
return _212;
}};
});
},"dijit/ToolbarSeparator":function(){
define(["dojo/_base/declare","dojo/dom","./_Widget","./_TemplatedMixin"],function(_213,dom,_214,_215){
return _213("dijit.ToolbarSeparator",[_214,_215],{templateString:"<div class=\"dijitToolbarSeparator dijitInline\" role=\"presentation\"></div>",buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/form/RadioButton":function(){
define(["dojo/_base/declare","./CheckBox","./_RadioButtonMixin"],function(_216,_217,_218){
return _216("dijit.form.RadioButton",[_217,_218],{baseClass:"dijitRadio"});
});
},"dijit/MenuSeparator":function(){
define(["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_219,dom,_21a,_21b,_21c,_21d){
return _219("dijit.MenuSeparator",[_21a,_21b,_21c],{templateString:_21d,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/form/ToggleButton":function(){
define(["dojo/_base/declare","dojo/_base/kernel","./Button","./_ToggleButtonMixin"],function(_21e,_21f,_220,_221){
return _21e("dijit.form.ToggleButton",[_220,_221],{baseClass:"dijitToggleButton",setChecked:function(_222){
_21f.deprecated("setChecked("+_222+") is deprecated. Use set('checked',"+_222+") instead.","","2.0");
this.set("checked",_222);
}});
});
},"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","dijit/CheckedMenuItem":function(){
define(["dojo/_base/declare","dojo/dom-class","./MenuItem","dojo/text!./templates/CheckedMenuItem.html","./hccss"],function(_223,_224,_225,_226){
return _223("dijit.CheckedMenuItem",_225,{templateString:_226,checked:false,_setCheckedAttr:function(_227){
_224.toggle(this.domNode,"dijitCheckedMenuItemChecked",_227);
this.domNode.setAttribute("aria-checked",_227?"true":"false");
this._set("checked",_227);
},iconClass:"",onChange:function(){
},_onClick:function(evt){
if(!this.disabled){
this.set("checked",!this.checked);
this.onChange(this.checked);
}
this.onClick(evt);
}});
});
},"davinci/css":function(){
define(["dojo/_base/window","dojo/dom-construct","dojo/dom-attr"],function(_228,_229){
var head=_228.doc.getElementsByTagName("head")[0],_22a={};
return {load:function(id,_22b,_22c){
var url=_22b.toUrl(id);
if(url in _22a){
_22c();
return;
}
_229.create("link",{rel:"stylesheet",type:"text/css",href:url},head);
_22a[url]=1;
_22c();
}};
});
},"davinci/ve/commands/MoveCommand":function(){
define(["dojo/_base/declare","dojo/dom-geometry","davinci/ve/widget","davinci/ve/States","davinci/ve/utils/StyleArray","davinci/ve/utils/GeomUtils"],function(_22d,_22e,_22f,_230,_231,_232){
return _22d("davinci.ve.commands.MoveCommand",null,{name:"move",constructor:function(_233,left,top,_234,_235,_236,_237){
this._id=(_233?_233.id:undefined);
this._context=_233.getContext();
this._newBox={l:left,t:top};
this._commandForXYDeltas=_234;
this._oldBox=_235;
this._applyToStateIndex=(!_236||_236=="Normal"||_236=="undefined")?"undefined":_236;
this._disableSnapping=_237;
},execute:function(){
if(!this._id){
return;
}
var _238=_22f.byId(this._id);
if(!_238||!_238.domNode){
return;
}
var _239=this._context;
if(!this._oldBox){
var box=_238.getMarginBox();
this._oldBox={l:box.l,t:box.t,w:box.w,h:box.h};
}
if(!_238.domNode.offsetParent){
return;
}
var _23a=dojo.position(_238.domNode.offsetParent,true);
if(!_23a){
return;
}
if(this._commandForXYDeltas){
this._newBox.l=this._oldBox.l+this._commandForXYDeltas._deltaX;
this._newBox.t=this._oldBox.t+this._commandForXYDeltas._deltaY;
}else{
if(!this._disableSnapping&&_239&&_239._snapX){
var w=this._oldBox.w;
if(_239._snapX.typeRefObj=="left"){
this._newBox.l=_239._snapX.x;
}else{
if(w&&_239._snapX.typeRefObj=="right"){
this._newBox.l=_239._snapX.x-w;
}else{
if(w&&_239._snapX.typeRefObj=="center"){
this._newBox.l=_239._snapX.x-w/2;
}
}
}
}
if(!this._disableSnapping&&_239&&_239._snapY){
var h=this._oldBox.h;
if(_239._snapY.typeRefObj=="top"){
this._newBox.t=_239._snapY.y;
}else{
if(h&&_239._snapY.typeRefObj=="bottom"){
this._newBox.t=_239._snapY.y-h;
}else{
if(h&&_239._snapY.typeRefObj=="middle"){
this._newBox.t=_239._snapY.y-h/2;
}
}
}
}
}
this._deltaX=this._newBox.l-this._oldBox.l;
this._deltaY=this._newBox.t-this._oldBox.t;
var _23b=_232.getBorderBoxPageCoords(_238.domNode.offsetParent);
var _23c=_22e.getBorderExtents(_238.domNode.offsetParent);
var _23d=this._newBox.l-_23b.l-_23c.l;
var _23e=this._newBox.t-_23b.t-_23c.t;
var _23f=[{left:_23d+"px"},{top:_23e+"px"}];
var _240=_238.getStyleValuesAllStates();
this._oldStyleValuesAllStates=dojo.clone(_240);
if(this._oldBox){
var _241=this._oldBox.l-_23b.l-_23c.l;
var _242=this._oldBox.t-_23b.t-_23c.t;
this._oldStyleValuesAllStates[this._applyToStateIndex]=_231.mergeStyleArrays(this._oldStyleValuesAllStates[this._applyToStateIndex],[{left:_241+"px"},{top:_242+"px"}]);
}
if(_240[this._applyToStateIndex]){
_240[this._applyToStateIndex]=_231.mergeStyleArrays(_240[this._applyToStateIndex],_23f);
}else{
_240[this._applyToStateIndex]=_23f;
}
_238.setStyleValuesAllStates(_240);
var _243=_230.getStatesListCurrent(_238.domNode);
var _244=_231.mergeStyleArrays([],_240["undefined"]);
for(var i=0;i<_243.length;i++){
if(_240[_243[i]]){
_244=_231.mergeStyleArrays(_244,_240[_243[i]]);
}
}
_238.setStyleValuesCanvas(_244);
_238.setStyleValuesModel(_240["undefined"]);
_238.refresh();
_230.resetState(_238.domNode);
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[_238]]);
},undo:function(){
if(!this._id){
return;
}
var _245=_22f.byId(this._id);
if(!_245){
return;
}
var _246=this._oldStyleValuesAllStates;
var _247=this._applyToStateIndex;
_245.setStyleValuesAllStates(_246);
var _248=_231.mergeStyleArrays(_246["undefined"],_246[_247]);
_245.setStyleValuesCanvas(_248);
_245.setStyleValuesModel(this._oldStyleValuesAllStates["undefined"]);
_245.refresh();
davinci.ve.states.resetState(_245.domNode);
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[_245]]);
}});
});
},"davinci/html/HTMLComment":function(){
define(["dojo/_base/declare","davinci/html/HTMLItem"],function(_249,_24a){
return _249("davinci.html.HTMLComment",_24a,{constructor:function(_24b){
this.elementType="HTMLComment";
this.value=_24b||"";
},getText:function(_24c){
var dash=this.isProcessingInstruction?"":"--";
return "<!"+dash+this.value+dash+">";
}});
});
},"dijit/_DialogMixin":function(){
define(["dojo/_base/declare","./a11y"],function(_24d,a11y){
return _24d("dijit._DialogMixin",null,{execute:function(){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(){
var _24e=a11y._getTabNavigable(this.containerNode);
this._firstFocusItem=_24e.lowest||_24e.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_24e.last||_24e.highest||this._firstFocusItem;
}});
});
},"davinci/Workbench":function(){
define(["dojo/_base/lang","require","./Runtime","./model/Path","./workbench/ViewPart","./workbench/EditorContainer","./ui/Dialog","dijit/Toolbar","dijit/ToolbarSeparator","dijit/Menu","dijit/MenuBar","dijit/MenuItem","dijit/MenuSeparator","dijit/PopupMenuBarItem","dijit/form/Button","dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton","dijit/layout/BorderContainer","dijit/layout/StackController","dijit/layout/StackContainer","dijit/layout/ContentPane","dijit/layout/TabController","dijit/layout/TabContainer","system/resource","dojo/i18n!./nls/webContent","./ve/metadata","dojo/Deferred","dojo/promise/all","dojo/_base/declare","dojo/_base/connect","dojo/_base/xhr","./review/model/resource/root","dojo/i18n!./ve/nls/common","dojo/dnd/Mover","./ve/utils/GeomUtils","dojo/i18n!./workbench/nls/workbench"],function(lang,_24f,_250,Path,_251,_252,_253,_254,_255,Menu,_256,_257,_258,_259,_25a,_25b,_25c,_25d,_25e,_25f,_260,_261,_262,_263,_264,_265,_266,_267,all,_268,_269,xhr,_26a,_26b,_26c,_26d,_26e){
var _26f=71;
var _270=20;
var _271={};
Function.prototype.bind=Function.prototype.bind||function(that){
return dojo.hitch(that,this);
};
var _272=function(_273){
return "editor-"+encodeURIComponent(_273.replace(/[\/| |\t]/g,"_")).replace(/%/g,":");
};
var _274=function(_275){
return _275.replace(/^editor/,"shadow");
};
var _276=function(_277){
return _277.replace(/^shadow/,"editor");
};
var _278=function(_279,_27a){
console.warn("Workbench::handleIoError reason="+_27a);
if(_27a.status==401||_27a.status==403){
console.warn("Workbench::handleIoError sessionTimedOut");
_27b();
}else{
if(_279.canceled===true){
console.warn("Workbench::handleIoError deferred.canceled");
var _27c=new RegExp("(^|\\.\\/|"+document.baseURI+"\\/)cmd\\/");
var url=_279.ioArgs.url;
if(_27c.test(url)){
if(url.indexOf("getBluePageInfo")>=0){
return;
}
}else{
console.warn("Workbench::handleIoError skip");
return;
}
_250.handleError(_27a.message);
console.warn("Failed to load url="+url+" message="+_27a.message+" status="+_27a.status);
}
}
};
var _27b=function(){
var _27d="/maqetta/welcome";
if(_250.singleUserMode()){
_27d="/maqetta/";
}
var _27e=new _253({title:_265.sessionTimedOut});
var _27f=dojo.string.substitute(_265.sessionTimedOutMsg,{hrefLoc:_27d});
_27e.set("content",_27f);
dojo.connect(_27e,"onCancel",null,function(){
window.location.href=_27d;
});
setTimeout(function(){
window.location.href=_27d;
},10000);
_27e.show();
};
var _280=function(){
var _281=_250.getSelection();
if(_281[0]&&_281[0].resource){
return _281[0].resource;
}
};
var _282=function(){
davinci.Workbench._expandCollapsePaletteContainers(null,{dontPreserveWidth:true});
var _283=function(_284){
return _284.indexOf(".review")>-1;
};
var _285=function(_286){
return new Path(_286).segment(2);
};
var _287=function(_288){
return new Path(_288).removeFirstSegments(3);
};
var init=function(_289){
dojo.publish("/davinci/ui/initialPerspectiveReady",[]);
if(_289.project){
_296.setActiveProject(_289.project);
}
if(_289.editors){
_289.version=davinci.version;
var _28a=null;
var _28b=_296.singleProjectMode();
if(_28b){
var p=_296.getProject();
_28a=new Path(p);
}
_289.editors.forEach(function(_28c){
var _28d=_283(_28c);
if(!_28d&&_28b){
if(!new Path(_28c).startsWith(_28a)){
return;
}
}
var _28e=function(_28f){
var _290=true;
if(_28b){
var path=new Path(_289.activeEditor);
if(!path.startsWith(_28a)){
_290=false;
}
}
var _291=_28c!=_289.activeEditor;
if(_291&&!_290){
_291=false;
_289.activeEditor=_28c;
}
if(_28f){
_296.openEditor({fileName:_28f,content:_28f.getContentSync(),noSelect:_291,isDirty:_28f.isDirty(),startup:false});
}
};
if(_28d){
var _292=_285(_28c);
var _293=_287(_28c).toString();
_26a.findFile(_292,_293).then(function(_294){
_28e(_294);
});
}else{
_28e(_264.findResource(_28c));
}
});
}else{
_289.editors=[];
}
};
if(!_296._state||!_296._state.hasOwnProperty("editors")){
xhr.get({url:"cmd/getWorkbenchState",handleAs:"json"}).then(function(_295){
init((_296._state=_295));
_296.setupGlobalKeyboardHandler();
});
}else{
init(_296._state);
_296.setupGlobalKeyboardHandler();
}
};
var _296={activePerspective:"",actionScope:[],_DEFAULT_PROJECT:"project1",hideEditorTabs:true,_editorTabClosing:{},_shadowTabClosing:{},run:function(){
_250.run();
_296._initKeys();
_296._baseTitle=dojo.doc.title;
_250.subscribe("/davinci/resource/resourceChanged",function(type,_297){
if(type=="deleted"){
var _298=_272(_297.getPath());
var _299=_274(_298);
var _29a=dijit.byId(_298);
var _29b=dijit.byId(_299);
if(_29a&&!_29a._isClosing){
var _29c=dijit.byId("editors_container");
var _29d=dijit.byId("davinci_file_tabs");
_29c.removeChild(_29a);
_29a.destroyRecursive();
_29d.removeChild(_29b);
_29b.destroyRecursive();
}
}
});
_250.subscribe("/dojo/io/error",_278);
_250.subscribe("/davinci/states/state/changed",function(e){
var _29e=_250.currentEditor;
if((_29e.declaredClass!="davinci.ve.themeEditor.ThemeEditor"&&_29e.declaredClass!="davinci.review.editor.ReviewEditor")){
_29e.visualEditor.onContentChange.apply(_29e.visualEditor,arguments);
}
});
_250.subscribe("/davinci/ui/widgetPropertiesChanges",function(){
var ve=_250.currentEditor.visualEditor;
ve._objectPropertiesChange.apply(ve,arguments);
});
_269.subscribe("/davinci/states/state/changed",function(args){
var _29f=(_250.currentEditor&&_250.currentEditor.declaredClass=="davinci.ve.PageEditor"&&_250.currentEditor.visualEditor&&_250.currentEditor.visualEditor.context);
if(!_29f){
return;
}
var _2a0="_show:",_2a1,_2a2,_2a3;
var _2a4=_29f?_29f.getDijit():null;
var _2a5=_24f("davinci/ve/widget");
if(args.newState&&!args.newState.indexOf(_2a0)){
_2a1=_2a4.byId(args.newState.substring(6));
_2a2=_2a5.getWidget(_2a1.domNode);
_2a3=_2a2.getHelper();
_2a3&&_2a3.popup&&_2a3.popup(_2a2);
}
if(args.oldState&&!args.oldState.indexOf(_2a0)){
_2a1=_2a4.byId(args.oldState.substring(6));
_2a2=_2a5.getWidget(_2a1.domNode);
_2a3=_2a2.getHelper();
_2a3&&_2a3.tearDown&&_2a3.tearDown(_2a2);
}
});
_269.subscribe("/davinci/ui/repositionFocusContainer",function(args){
_296._repositionFocusContainer();
});
var d=_266.init().then(function(){
var _2a6=_250.initialPerspective||"davinci.ui.main";
_296.showPerspective(_2a6);
_296._updateTitle();
_282();
});
var _2a7=dojo.query(".loading");
if(_2a7[0]){
_2a7[0].parentNode.removeChild(_2a7[0]);
}
_296._lastAutoSave=Date.now();
setInterval(dojo.hitch(this,"_autoSave"),30000);
return d;
},unload:function(){
_296._autoSave();
},_createToolBar:function(_2a8,_2a9,_2aa,_2ab){
var _2ac=[];
if(!_2aa){
_2aa=_250.getExtensions("davinci.actionSets");
}
for(var i=0,len=_2aa.length;i<len;i++){
var _2ad=_2aa[i].actions;
for(var k=0,len2=_2ad.length;k<len2;k++){
var _2ae=_2ad[k],_2af=_2ae[_2a8];
if(_2af){
if(!_2ac[_2af]){
_2ac[_2af]=[];
}
_2ac[_2af].push(_2ae);
}
}
}
var _2b0=new _254({"class":"davinciToolbar"},_2a9);
var _2b1={};
var _2b2=true;
for(var _2b3 in _2ac){
if(!_2b2){
var _2b4=new _255();
_2b0.addChild(_2b4);
}else{
_2b2=false;
}
var _2b5;
var _2ad=_2ac[_2b3];
for(var p=0;p<_2ad.length;p++){
var _2ae=_2ad[p];
var id=_2ae.id;
_296._loadActionClass(_2ae);
var _2b6={showLabel:false};
["label","showLabel","iconClass"].forEach(function(prop){
if(_2ae.hasOwnProperty(prop)){
_2b6[prop]=_2ae[prop];
}
});
if(_2ae.className){
_2b6["class"]=_2ae.className;
}
var _2b7;
var _2b8=new _267();
if(_2ae.menu&&(_2ae.type=="DropDownButton"||_2ae.type=="ComboButton")){
var menu=new Menu({style:"display: none;"});
for(var _2b9=0;_2b9<_2ae.menu.length;_2b9++){
var _2ba=_2ae.menu[_2b9];
_296._loadActionClass(_2ba);
var _2bb={onClick:dojo.hitch(this,"_runAction",_2ba,_2ab)};
var _2bc=["label","iconClass"];
_2bc.forEach(function(prop){
if(_2ba[prop]){
_2bb[prop]=_2ba[prop];
}
});
var _2bd=new _257(_2bb);
_2bd._maqAction=_2ba;
menu.addChild(_2bd);
}
_2b6.dropDown=menu;
if(_2ae.type=="DropDownButton"){
_2b7=new _25b(_2b6);
}else{
_2b7=new _25c(_2b6);
}
_2b7.onClick=dojo.hitch(this,"_runAction",_2ae,_2ab);
_2b7._maqAction=_2ae;
_2b8.resolve();
}else{
if(_2ae.toggle||_2ae.radioGroup){
_2b7=new _25d(_2b6);
_2b7.item=_2ae;
_2b7.set("checked",_2ae.initialValue);
if(_2ae.radioGroup){
var _2be=_2b1[_2ae.radioGroup];
if(!_2be){
_2be=_2b1[_2ae.radioGroup]=[];
}
_2be.push(_2b7);
_2b7.onChange=dojo.hitch(this,"_toggleButton",_2b7,_2ab,_2be);
}else{
_2b7.onChange=dojo.hitch(this,"_runAction",_2ae,_2ab);
}
_2b7._maqAction=_2ae;
_2b8.resolve();
}else{
if(_2ae.type){
_24f([_2ae.type],function(_2bf){
_2b7=new _2bf();
_2b7._maqActiond=_2ae;
_2b8.resolve();
});
}else{
_2b7=new _25a(_2b6);
_2b7.onClick=dojo.hitch(this,"_runAction",_2ae,_2ab);
_2b7._maqAction=_2ae;
_2b8.resolve();
}
}
}
if(_2ae.icon){
var _2c0=document.createElement("img");
_2c0.src=_2ae.icon;
_2c0.height=_2c0.width=18;
_2b7.domNode.appendChild(_2c0);
}
_2b8.then(function(){
_2b0.addChild(_2b7);
if(_2ae.isEnabled&&!_2ae.isEnabled()){
_2b7.isEnabled=_2ae.isEnabled;
_2b7.set("disabled",true);
}else{
_2b7.set("disabled",false);
}
});
}
}
return _2b0;
},showPerspective:function(_2c1){
_296.activePerspective=_2c1;
var _2c2=_296._createMenuTree();
_296._updateMainMenubar(dojo.byId("davinci_main_menu"),_2c2);
var o=this.getActionSets("davinci.ui.editorMenuBar");
var _2c3=o.clonedActionSets;
if(_2c3.length){
_2c2=_296._createMenuTree(_2c3);
_296._updateMainMenubar(dojo.byId("maq_banner_editor_commands"),_2c2);
}
var _2c4=dojo.byId("mainBody");
if(!_2c4.tabs){
_2c4.tabs=[];
}
var _2c5=dijit.byId("mainBody");
if(!_2c5){
_2c5=new _25e({gutters:false,region:"center",design:"sidebar"},_2c4);
}
var _2c6=_250.getExtension("davinci.perspective",_2c1);
if(!_2c6){
_250.handleError(dojo.string.substitute(_265.perspectiveNotFound,[_2c1]));
}
_2c6=dojo.clone(_2c6);
var _2c7=_250.getExtensions("davinci.perspectiveExtension",function(_2c8){
return _2c8.targetID===_2c1;
});
dojo.forEach(_2c7,function(_2c9){
dojo.forEach(_2c9.views,function(view){
_2c6.views.push(view);
});
});
if(!_2c4.editorsStackContainer){
_296.editorsStackContainer=_2c4.editorsStackContainer=new _260({region:"center",id:"editorsStackContainer",controllerWidget:"dijit.layout.StackController"});
}
_2c5.addChild(_2c4.editorsStackContainer);
if(!_2c4.editorsWelcomePage){
_296.editorsWelcomePage=_2c4.editorsWelcomePage=new _261({id:"editorsWelcomePage",href:"app/davinci/ve/resources/welcome_to_maqetta.html"});
}
_2c4.editorsStackContainer.addChild(_2c4.editorsWelcomePage);
if(!_2c4.tabs.editors){
_296.editorTabs=_2c4.tabs.editors=new (_296.hideEditorTabs?_260:_263)({id:"editors_container",controllerWidget:(_296.hideEditorTabs?"dijit.layout.StackController":"dijit.layout.TabController")});
_296.editorTabs.setTitle=function(_2ca,_2cb){
_2ca.attr("title",_2cb);
_2ca.domNode.title="";
if(!_296.hideEditorTabs){
this.tablist.pane2button[_2ca.id].attr("label",_2cb);
}else{
var _2cc=_2ca.id;
var _2cd=_274(_2cc);
var _2ce=dijit.byId("davinci_file_tabs");
_2ce.tablist.pane2button[_2cd].attr("label",_2cb);
}
};
dojo.connect(_2c4.tabs.editors,"removeChild",this,_296._editorTabClosed);
}
_2c4.editorsStackContainer.addChild(_2c4.tabs.editors);
_2c4.editorsStackContainer.selectChild(_2c4.editorsWelcomePage);
dojo.connect(dijit.byId("editors_container"),"selectChild",function(_2cf){
if(!_296._processingSelectChild){
_296._processingSelectChild=true;
var _2d0=_2cf.id;
var _2d1=_274(_2d0);
var _2d2=dijit.byId(_2d1);
var _2d3=dijit.byId("davinci_file_tabs");
if(_2d2&&_2d3){
_2d3.selectChild(_2d2);
}
if(_2cf.editor){
_296._switchEditor(_2cf.editor);
}
_296._processingSelectChild=false;
}
});
_2c5.startup();
var _2d4=dijit.byId("davinci_app");
if(!_2d4){
_2d4=new _25e({design:"headline",gutters:false,liveSplitters:false},"davinci_app");
var _2d5=new _261({region:"top",layoutPriority:1},"davinci_top_bar");
var _2d6=_296.mainStackContainer=_2c4.editorsStackContainer=new _260({region:"center",id:"mainStackContainer",controllerWidget:"dijit.layout.StackController"});
var _2d7=_296.welcomePage=new _261({id:"welcomePage",href:"app/davinci/ve/resources/welcome_to_maqetta.html"});
var _2d8=_296.mainBorderContainer=new _25e({design:"headline",gutters:false,id:"mainBorderContainer",liveSplitters:false});
var _2d9=_296.shadowTabs=new _263({id:"davinci_file_tabs",closable:true,region:"top",layoutPriority:1,style:"display:none"});
_296.shadowTabs.setTitle=function(tab,_2da){
tab.attr("title",_2da);
this.tablist.pane2button[tab.id].attr("label",_2da);
};
dojo.connect(_2d9,"selectChild",function(_2db){
var _2dc=_2db.id;
var _2dd=_276(_2dc);
var _2de=dijit.byId(_2dd);
var _2df=dijit.byId("editors_container");
if(_2df&&_2de&&_2de.editor){
_2df.selectChild(_2de);
}
});
dojo.connect(_2d9,"removeChild",this,_296._shadowTabClosed);
var _2e0=new _261({id:"davinci_toolbar_pane",region:"top",layoutPriority:1,content:"<div id=\"davinci_toolbar_container\"></div>",style:"display:none"});
_2d4.addChild(_2d5);
_2d4.addChild(_2d6);
_2d6.addChild(_2d8);
_2d6.selectChild(_2d8);
_2d8.addChild(_2d9);
_2d8.addChild(_2e0);
_2d8.addChild(_2c5);
_2d4.layout();
_2d4.startup();
_296._originalOnResize=window.onresize;
window.onresize=_296.onResize;
dojo.connect(_2c5,"onMouseUp",this,"onResize");
var _2e1=dijit.byId("davinci_file_tabs_tablist_Menu");
if(_2e1){
_2e1.addChild(new dijit.MenuItem({label:_26b.closeAllEditors,onClick:function(a,b,c){
this.closeAllEditors();
}.bind(this)}));
}
}
for(var _2e2 in _2c4.tabs.perspective){
var view=_2c4.tabs.perspective[_2e2];
if(!view){
continue;
}
dojo.forEach(view.getChildren(),function(_2e3){
view.removeChild(_2e3);
if(_2e2!="left"&&_2e2!="right"){
_2e3.destroyRecursive(false);
}
});
view.destroyRecursive(false);
delete _2c4.tabs.perspective[_2e2];
}
this._showViewPromises=dojo.map(_2c6.views,function(view){
return _296.showView(view.viewID,view.selected,view.hidden);
},this);
davinci.Workbench.focusContainer=dojo.create("div",{"class":"focusContainer",id:"focusContainer"},document.body);
setTimeout(function(){
_2d4.resize();
dojo.publish("/davinci/workbench/ready",[]);
}.bind(this),3000);
},onResize:function(e){
var _2e4=e.explicitOriginalTarget?e.explicitOriginalTarget:e.srcElement;
if(e.type=="resize"||((_2e4.id&&(_2e4.id.indexOf("dijit_layout__Splitter_")>-1)||(_2e4.nextSibling&&_2e4.nextSibling.id&&_2e4.nextSibling.id.indexOf("dijit_layout__Splitter_")>-1)))){
var ed=davinci&&_250.currentEditor;
if(davinci&&_250.currentEditor&&_250.currentEditor.onResize){
_250.currentEditor.onResize();
}
}
if(_296._originalOnResize){
_296._originalOnResize();
}
_296._repositionFocusContainer();
},updateMenubar:function(node,_2e5){
var _2e6=_296._createMenuTree(_2e5);
var _2e7=dijit.byId(node.id);
if(!_2e7){
_2e7=new _256({"class":"dijitInline"},node);
}
_296._addItemsToMenubar(_2e6,_2e7);
},_updateMainMenubar:function(_2e8,_2e9){
for(var i=0;i<_2e9.length;i++){
var _2ea=_2e9[i];
for(var j=0;j<_2ea.menus.length;j++){
var menu=_2ea.menus[j];
var _2eb=_296._createMenu(menu);
menu.id=menu.id.replace(".","-");
var _2ec=dijit.byId(menu.id+"-dropdown");
if(!_2ec){
var _2ed={label:menu.label,dropDown:_2eb,id:menu.id+"-dropdown"};
if(menu.hasOwnProperty("showLabel")){
_2ed.showLabel=menu.showLabel;
}
if(menu.hasOwnProperty("iconClass")){
_2ed.iconClass=menu.iconClass;
}
if(menu.hasOwnProperty("className")){
_2ed["class"]=menu.className;
}
_2ec=new _25b(_2ed);
_2e8.appendChild(_2ec.domNode);
}
}
}
},_addItemsToMenubar:function(_2ee,_2ef){
dojo.forEach(_2ee,function(m){
var _2f0=m.menus,_2f1=_2f0.length;
if(_2f1){
dojo.forEach(_2f0,function(menu){
menu.id=menu.id.replace(/\./g,"-");
var _2f2=_296._createMenu(menu),_2f3=dijit.byId(menu.id+"-dropdown");
if(!_2f3){
_2f3=new _259({label:menu.label,popup:_2f2,id:menu.id+"-dropdown"});
}
_2ef.addChild(_2f3);
},this);
}
},this);
},getOpenEditor:function(_2f4){
if(_2f4!=null){
var tab=dijit.byId(_272(_2f4.getPath()));
if(tab){
return tab.editor;
}
return null;
}
var _2f5=dijit.byId("editors_container");
if(_2f5&&_2f5.selectedChildWidget&&_2f5.selectedChildWidget.editor){
return _2f5.selectedChildWidget.editor;
}
return null;
},closeActiveEditor:function(){
var _2f6=dijit.byId("editors_container");
var _2f7=dijit.byId("davinci_file_tabs");
if(_2f6&&_2f6.selectedChildWidget&&_2f6.selectedChildWidget.editor){
var _2f8=selectedChildWidget.id;
var _2f9=_274(_2f8);
_2f6.closeChild(_2f6.selectedChildWidget);
var _2fa=dijit.byId(_2f9);
if(_2fa){
_2f7.closeChild(_2fa);
}
}
},closeAllEditors:function(){
var _2fb=dijit.byId("editors_container");
if(_2fb){
_2fb.getChildren().forEach(function(_2fc){
_2fb.closeChild(_2fc);
});
}
},getAllOpenEditorIds:function(){
},showModal:function(_2fd,_2fe,_2ff,_300,_301){
return _253.showModal(_2fd,_2fe,_2ff,_300,_301);
},showMessage:function(_302,_303,_304,_305,_306){
return _253.showMessage(_302,_303,_304,_305,_306);
},showDialog:function(_307,_308,_309,_30a,_30b,_30c,_30d,_30e){
return _253.showDialog(_307,_308,_309,_30a,_30b,_30c,_30d);
},_createMenuTree:function(_30f,_310){
if(!_30f){
_30f=_250.getExtensions("davinci.actionSets",function(_311){
var _312=_250.getExtensions("davinci.actionSetPartAssociations",function(_313){
return _313.targetID==_311.id;
});
return _312.length==0;
});
}
var _314=[];
function _315(m,id){
for(var j=0,jLen=m.length;j<jLen;j++){
for(var k=0,kLen=m[j].menus.length;k<kLen;k++){
if(id==m[j].menus[k].id){
return m[j].menus[k].menus;
}
}
}
};
function _316(item,path,_317){
path=path||"additions";
path=path.split("/");
var m=_314;
_296._loadActionClass(item);
var sep=path[path.length-1];
if(path.length>1){
for(var i=0,len=path.length-1;i<len;i++){
var k=_315(m,path[i]);
if(k){
m=k;
}
}
}
for(var i=0,len=m.length;i<len;i++){
if(m[i].id==sep){
var _318=m[i].menus;
_318.push(item);
if(item.separator){
var _319=false;
_318=item.menus=[];
for(var j=0;j<item.separator.length;j+=2){
var id=item.separator[j];
_319=id=="additions";
_318.push({id:id,isSeparator:item.separator[j+1],menus:[]});
}
if(!_319){
_318.push({id:"additions",isSeparator:false,menus:[]});
}
}
return;
}
}
if(_317){
_314.push({id:sep,isSeparator:false,menus:[item]});
}
};
for(var _31a=0,len=_30f.length;_31a<len;_31a++){
var _31b=_30f[_31a];
if(_31b.visible){
if(_31b.menu){
for(var _31c=0,_31d=_31b.menu.length;_31c<_31d;_31c++){
var menu=_31b.menu[_31c];
if(menu.__mainMenu){
for(var j=0;j<menu.separator.length;j+=2){
_314.push({id:menu.separator[j],isSeparator:menu.separator[j+1],menus:[]});
}
}else{
_316(menu,menu.path,_310);
if(menu.populate instanceof Function){
var _31e=menu.populate();
for(var item in _31e){
_316(_31e[item],_31e[item].menubarPath);
}
}
}
}
}
}
}
for(var _31a=0,len=_30f.length;_31a<len;_31a++){
var _31b=_30f[_31a];
if(_31b.visible){
for(var _31f=0,_320=_31b.actions.length;_31f<_320;_31f++){
var _321=_31b.actions[_31f];
if(_321.menubarPath){
_316(_321,_321.menubarPath,_310);
}
}
}
}
return _314;
},_loadActionClass:function(item){
if(typeof item.action=="string"){
_24f([item.action],function(_322){
item.action=new _322();
item.action.item=item;
});
}
},_createMenu:function(menu,_323){
var _324,_325,_326;
if(menu.menus){
_324=new Menu({parentMenu:menu});
_325=menu.menus;
_326="onOpen";
}else{
_324=new _327({});
_325=menu;
_326="menuOpened";
}
_324.domNode.style.display="none";
_324.actionContext=_323;
this._rebuildMenu(_324,_325);
dojo.connect(_324,_326,this,function(evt){
if(_324._widgetCallback){
_324._widgetCallback(evt);
}
this._rebuildMenu(_324,_325).focus();
});
return _324;
},singleProjectMode:function(){
return true;
},getProject:function(){
return _296.getActiveProject()||_296._DEFAULT_PROJECT;
},loadProject:function(_328){
return _296.setActiveProject(_328).then(function(){
location.href="/maqetta/cmd/configProject?configOnly=true&project="+_328;
});
},location:function(){
return _250.location();
},queryParams:function(){
var _329=document.location.href;
var _32a=_329.split("?");
var _32b=_32a.length>1?_32a[1]:"";
return dojo.queryToObject(_32b);
},_rebuildMenu:function(_32c,_32d){
dojo.forEach(_32c.getChildren(),function(_32e){
_32c.removeChild(_32e);
_32e.destroy();
});
_32c.focusedChild=null;
var _32f,_330;
_32d.forEach(function(menu,i){
if(menu.menus.length){
if(menu.isSeparator&&i>0){
_32f=true;
}
menu.menus.forEach(function(item){
if(_32f&&_330){
_32c.addChild(new _258({}));
_32f=false;
}
_330=true;
var _331=item.label;
if(item.action&&item.action.getName){
_331=item.action.getName();
}
if(item.separator){
var _332=_296._createMenu(item);
var _333=new _257({label:_331,popup:_332,id:_332.id+"item"});
_333.actionContext=_32c.actionContext;
_32c.addChild(_333);
}else{
var _334=true;
if(item.isEnabled){
var _335=_280();
_334=_335?item.isEnabled(_335):false;
}
if(item.action){
if(item.action.shouldShow&&!item.action.shouldShow(_32c.actionContext,{menu:_32c})){
return;
}
_334=item.action.isEnabled&&item.action.isEnabled(_32c.actionContext);
}
var _336={label:_331,id:item.id,disabled:!_334,onClick:dojo.hitch(this,"_runAction",item,_32c.actionContext)};
if(item.iconClass){
_336.iconClass=item.iconClass;
}
_32c.addChild(new _257(_336));
}
},this);
}
},this);
return _32c;
},_toggleButton:function(_337,_338,_339,arg){
if(!_337.checked){
return;
}
_339.forEach(function(item){
if(item!=_337){
item.set("checked",false);
}
});
_296._runAction(_337.item,_338,_337.item.id);
},_runAction:function(item,_33a,arg){
if(_33a&&davinci.Runtime.currentEditor){
_33a=davinci.Runtime.currentEditor;
}
if(item.run){
item.run();
}else{
if(item.action){
if(dojo.isString(item.action)){
this._loadActionClass(item);
}
item.action.run(_33a);
}else{
if(item.method&&_33a&&_33a[item.method] instanceof Function){
_33a[item.method](arg);
}else{
if(item.commandID){
_250.executeCommand(item.commandID);
}
}
}
}
},showView:function(_33b,_33c,_33d){
var d=new _267();
try{
var _33e=dijit.byId("mainBody"),view=_250.getExtension("davinci.view",_33b),_33f=dojo.byId("mainBody"),_340=_296.activePerspective,_341=_250.getExtension("davinci.perspective",_340),_342="left",cp1=null,_343=false,_344=dijit.byId("mainBody")._borderBox.h-5;
dojo.some(_341.views,function(view){
if(view.viewID==_33b){
_342=view.position;
return true;
}
});
_33f.tabs=_33f.tabs||{};
_33f.tabs.perspective=_33f.tabs.perspective||{};
if(_342=="right"&&!_33f.tabs.perspective.right){
_33e.addChild(_33f.tabs.perspective.right=new _25e({"class":"davinciPaletteContainer",style:"width: "+_26f+"px;",id:"right_mainBody",minSize:_26f,region:"right",gutters:false,splitter:true}));
_33f.tabs.perspective.right.startup();
_271["right_mainBody"]={expandToSize:340,initialExpandToSize:340};
}
if(_342=="left"&&!_33f.tabs.perspective.left){
_33e.addChild(_33f.tabs.perspective.left=new _25e({"class":"davinciPaletteContainer",style:"width: "+_26f+"px;",id:"left_mainBody",minSize:_26f,region:"left",gutters:false,splitter:true}));
_33f.tabs.perspective.left.startup();
_271["left_mainBody"]={expandToSize:300,initialExpandToSize:300};
}
if(_342==="left"||_342==="right"){
_342+="-top";
}
var _345=_342;
if(!_33f.tabs.perspective[_342]){
_345=_342.split("-");
var _346=_345[0],_347=_33e,_348="davinciPalette ",_349="";
if(_345[1]&&(_346=="left"||_346=="right")){
_347=_33f.tabs.perspective[_346];
_346=_345[1];
if(_345[1]=="top"){
_346="center";
_348+="davinciTopPalette";
}else{
_349="height:30%;";
_348+="davinciBottomPalette";
}
}else{
if(_346=="bottom"){
_349="height:80px;";
_348+="davinciBottomPalette";
}
}
cp1=_33f.tabs.perspective[_342]=new _263({region:_346,id:"palette-tabcontainer-"+_342,tabPosition:_345[0]+"-h",tabStrip:false,"class":_348,style:_349,splitter:_346!="center",controllerWidget:"dijit.layout.TabController"});
_347.addChild(cp1);
dojo.connect(cp1,"selectChild",this,function(tab){
if(tab&&tab.domNode){
var tc=tab.getParent();
if(!this._showViewAddChildInProcess&&!tc._maqDontExpandCollapse){
if(tc._maqLastSelectedChild==tab){
this._expandCollapsePaletteContainer(tab);
}else{
this.expandPaletteContainer(tab.domNode);
}
}
tc._maqLastSelectedChild=tab;
}
}.bind(this));
}else{
cp1=_33f.tabs.perspective[_342];
}
if(dojo.some(cp1.getChildren(),function(_34a){
return _34a.id==view.id;
})){
return;
}
this.instantiateView(view).then(function(tab){
this._showViewAddChildInProcess=true;
if(!_33d){
cp1.addChild(tab);
}
this._showViewAddChildInProcess=false;
var _34b=tab.controlButton;
if(_34b&&_34b.domNode){
_34b.domNode.title=view.title+" "+_26b.palette;
}
if(_33c){
cp1.selectChild(tab);
}
d.resolve(tab);
}.bind(this));
}
catch(ex){
console.error("Error loading view: "+view.id);
console.error(ex);
}
return d;
},instantiateView:function(view){
var d=new _267(),tab=dijit.byId(view.id);
if(tab){
d.resolve(tab);
}else{
_24f([view.viewClass],function(_34c){
var _34d={title:view.title,id:view.id,closable:false,view:view};
if(view.iconClass){
_34d.iconClass=view.iconClass;
}
d.resolve(new (_34c||_251)(_34d));
});
}
return d;
},hideView:function(_34e){
for(var _34f in mainBody.tabs.perspective){
if(_34f=="left"||_34f=="right"){
_34f+="-top";
}
if(!mainBody.tabs.perspective[_34f]){
continue;
}
var _350=mainBody.tabs.perspective[_34f].getChildren();
var _351=false;
for(var i=0;i<_350.length&&!_351;i++){
if(_350[i].id==_34e){
mainBody.tabs.perspective[_34f].removeChild(_350[i]);
_350[i].destroyRecursive(false);
}
}
}
},toggleView:function(_352){
var _353=dojo.byId(_352);
if(_353){
_296.hideView(_352);
}else{
_296.showView(_352,true);
}
},openEditor:function(_354,_355){
try{
var _356=_354.fileName,_357=_354.content,_358,file;
if(typeof _356=="string"){
_358=_356.substr(_356.lastIndexOf(".")+1);
}else{
file=_356;
_358=_356.getExtension();
_356=_356.getPath();
}
var _359=dijit.byId(_272(_356)),_35a=dijit.byId("editors_container");
if(_359){
_35a.selectChild(_359);
var _35b=_359.editor;
if(_354.startOffset){
_35b.select(_354);
}
return;
}
var _35c=_354.editorCreateCallback;
var _35d=_250.getExtensions("davinci.editor",function(_35e){
if(typeof _35e.extensions=="string"){
_35e.extensions=_35e.extensions.split(",");
}
return dojo.some(_35e.extensions,function(e){
return e.toLowerCase()==_358.toLowerCase();
});
});
var _35f=_35d[0];
if(_35d.length>1){
dojo.some(_35d,function(_360){
_35f=_360;
return _360.isDefault;
});
}
_296._createEditor(_35f,_356,_354,_355).then(function(_361){
if(_35c){
_35c.call(window,_361);
}
if(!_354.noSelect){
_250.currentEditor=_361;
}
},function(_362){
console.error("Error opening editor for filename: "+_356,_362);
});
}
catch(ex){
console.error("Exception opening editor for filename: "+_354&&_354.fileName);
console.error(ex);
}
},_createEditor:function(_363,_364,_365,_366){
var d=new _267();
var _367=_364.split("/").pop();
var _368=_365&&_365.fileName&&_365.fileName.extension?"."+_365.fileName.extension:"";
_367=_367+(_368==".rev"?_368:"");
var _369=dojo.query(".loading");
if(_369[0]){
_369[0].parentNode.removeChild(_369[0]);
}
var _36a=dijit.byId("editorsStackContainer"),_36b=dijit.byId("editors_container");
if(_36a&&_36b){
_36a.selectChild(_36b);
_296.mainStackContainer.selectChild(_296.mainBorderContainer);
}
var _36c=_365.content,_36d=dijit.byId(_272(_364)),_36e=dijit.byId("editors_container"),_36f=dijit.byId("davinci_file_tabs"),_370=false,_371=null;
if(!_36d){
_370=true;
var _372=_272(_364);
var _373=_274(_372);
_36d=new _252({title:_367,id:_372,"class":"EditorContainer",isDirty:_365.isDirty});
_371=new _261({title:_367,closable:true,id:_373});
_371.onClose=function(tc,tab){
var _374=tab.id;
var _375=_276(_374);
var _376=dijit.byId(_375);
var _377=dijit.byId("editors_container");
function _378(){
_376._skipDirtyCheck=true;
_376.onClose.apply(_376,[_377,_376]);
tc.removeChild(tab);
tab.destroyRecursive();
};
if(_377&&_376){
if(_376.editor.isDirty){
var _379=_376.editor.getOnUnloadWarningMessage();
if(!_379){
_379=dojo.string.substitute(_26e.fileHasUnsavedChanges,[_376._getTitle()]);
}
_296.showDialog(_376._getTitle(),_379,{width:300},dojo.hitch(this,_378),null,null,true);
}else{
_378();
}
}
};
}
if(!_363){
_363={editorClass:"davinci/ui/TextEditor",id:"davinci.ui.TextEditor"};
}
if(_370){
_36e.addChild(_36d);
_36f.addChild(_371);
}
if(!_296.hideEditorTabs){
var _37a=dojo.query(".dijitTabButtonIcon",_36d.controlButton.domNode);
dojo.addClass(_37a[0],"tabButtonLoadingIcon");
dojo.removeClass(_37a[0],"dijitNoIcon");
}
if(!_365.noSelect){
_36e.selectChild(_36d);
}
_36d.setEditor(_363,_364,_36c,_365.fileName,_36d.domNode,_366).then(function(_37b){
if(_365.startLine){
_36d.editor.select(_365);
}
if(!_365.noSelect){
if(_296._state.editors.indexOf(_364)===-1){
_296._state.editors.push(_364);
}
_296._switchEditor(_36d.editor,_365.startup);
}
if(!_296.hideEditorTabs){
dojo.removeClass(_37a[0],"tabButtonLoadingIcon");
dojo.addClass(_37a[0],"dijitNoIcon");
}
setTimeout(function(){
_36d.resize();
},100);
d.resolve(_36d.editor);
},function(_37c){
if(!_296.hideEditorTabs){
dojo.removeClass(_37a[0],"tabButtonLoadingIcon");
dojo.addClass(_37a[0],"tabButtonErrorIcon");
}
d.reject(_37c);
});
return d;
},createPopup:function(args){
var _37d=args.partID,_37e=args.domNode,_37f=args.context,_380=args.openCallback;
var o=this.getActionSets(_37d);
var _381=o.clonedActionSets;
var _382=o.actionSets;
if(_381.length>0){
var _383=_296._createMenuTree(_381,true);
_296._initActionsKeys(_382,args);
var _384=_296._createMenu(_383,_37f);
if(_384&&_37e){
_384.bindDomNode(_37e);
}
_384._widgetCallback=_380;
_384._partID=_37d;
return _384;
}
},getActionSets:function(_385){
var _386=[];
var _387=_250.getExtension("davinci.actionSetPartAssociations",function(_388){
return _388.parts.some(function(part){
if(part==_385){
_386.push(_388.targetID);
return true;
}
});
});
var _389;
var _38a=[];
if(_386.length){
_389=_250.getExtensions("davinci.actionSets",function(_38b){
return _386.some(function(_38c){
return _38c==_38b.id;
});
});
if(_389.length){
_389.forEach(function(_38d){
var _38e=_266.getLibraryActions(_38d.id);
if(_38e.length){
_38d=lang.mixin({},_38d);
_38d.actions=_38d.actions.concat(_38e);
}
_38a.push(_38d);
});
}
}
return {actionSets:_389,clonedActionSets:_38a};
},_initActionsKeys:function(_38f,args){
var _390=args.keysDomNode||args.domNode,keys={},_391;
dojo.forEach(_38f,function(_392){
dojo.forEach(_392.actions,function(_393){
if(_393.keySequence){
keys[_393.keySequence]=_393;
_391=true;
}
});
});
if(_391){
var _394=args.context;
dojo.connect(_390,"onkeydown",function(e){
var seq=_296._keySequence(e),_395=keys[seq];
if(_395){
if(_395.action.shouldShow&&!_395.action.shouldShow(_394)){
return;
}
if(_395.action.isEnabled(_394)){
_296._runAction(_395,_394);
}
}
});
}
},_initKeys:function(){
var keys={all:[]};
var _396=_250.getExtensions("davinci.keyBindings");
dojo.forEach(_396,function(_397){
var _398=_397.contextID||"all";
var _399=keys[_398];
if(!_399){
_399=keys[_398]=[];
}
_399[_397.sequence]=_397.commandID;
});
_296.keyBindings=keys;
},handleKey:function(e){
if(!_296.keyBindings){
return;
}
var seq=_296._keySequence(e);
var cmd;
if(_296.currentContext&&_296.keyBindings[_296.currentContext]){
cmd=_296.keyBindings[_296.currentContext][seq];
}
if(!cmd){
cmd=_296.keyBindings.all[seq];
}
if(cmd){
_250.executeCommand(cmd);
return true;
}
},_keySequence:function(e){
var seq=[];
if(window.event){
if(window.event.ctrlKey){
seq.push("M1");
}
if(window.event.shiftKey){
seq.push("M2");
}
if(window.event.altKey){
seq.push("M3");
}
}else{
if(e.ctrlKey||(e.modifiers==2)||(e.modifiers==3)||(e.modifiers>5)){
seq.push("M1");
}
if(e.shiftKey||(e.modifiers>3)){
seq.push("M2");
}
if(e.modifiers){
if(e.altKey||(e.modifiers%2)){
seq.push("M3");
}
}else{
if(e.altKey){
seq.push("M3");
}
}
}
var _39a=String.fromCharCode(e.keyCode);
if(/[A-Z0-9]/.test(_39a)){
}else{
var _39b={46:"del",114:"f3"};
_39a=_39b[e.keyCode]||"xxxxxxxxxx";
}
_39a=_39a.toUpperCase();
if(_39a==" "){
_39a="' '";
}
seq.push(_39a);
return seq.join("+");
},setActionScope:function(_39c,_39d){
_296.actionScope[_39c]=_39d;
},findView:function(_39e){
var _39f=dijit.byId(_39e);
if(_39f){
return _39f;
}
},_switchEditor:function(_3a0,_3a1){
var _3a2=_250.currentEditor;
_250.currentEditor=_3a0;
this._showEditorTopPanes();
try{
dojo.publish("/davinci/ui/editorSelected",[{editor:_3a0,oldEditor:_3a2}]);
}
catch(ex){
console.error(ex);
}
_296._updateTitle(_3a0);
_296._state.activeEditor=_3a0?_3a0.fileName:null;
setTimeout(function(){
if(_3a0&&_3a0.visualEditor&&_3a0.visualEditor.context&&_3a0.visualEditor.context.isActive()){
_3a0.visualEditor.context.getTopWidgets().forEach(function(_3a3){
if(_3a3.resize){
_3a3.resize();
}
});
}
this._repositionFocusContainer();
}.bind(this),1000);
all(this._showViewPromises).then(function(){
if(_3a0&&_3a0.focus){
_3a0.focus();
}
this._rearrangePalettes(_3a0);
this._expandCollapsePaletteContainers(_3a0);
}.bind(this));
if(!_3a1){
_296._updateWorkbenchState();
}
},_rearrangePalettes:function(_3a4){
var _3a5,_3a6,_3a7;
if(_3a4){
var _3a8=_250.getExtensions("davinci.editor",function(_3a9){
return (_3a4?(_3a9.id===_3a4.editorID):false);
});
if(_3a8&&_3a8.length>0){
var _3aa=_3a8[0];
_3a5=_3aa.palettePerspective;
}
_3a6=_3a4._rightPaletteExpanded;
_3a7=_3a4._leftPaletteExpanded;
}else{
_3a5=_250.initialPerspective||"davinci.ui.main";
}
if(_3a5){
var _3ab=_250.getExtension("davinci.perspective",_3a5);
if(!_3ab){
_250.handleError(dojo.string.substitute(_265.perspectiveNotFound,[_3aa.palettePerspective]));
}
var _3ac=_3ab.views;
dojo.forEach(_3ac,function(_3ad){
var _3ae=_3ad.viewID;
var _3af=_3ad.position;
if(_3af.indexOf("bottom")<0){
_3af+="-top";
}
var tab=dijit.byId(_3ae);
if(tab){
var _3b0=tab.getParent();
var _3b1=mainBody.tabs.perspective[_3af];
if(_3b0!=_3b1){
if(_3b0){
_3b0.removeChild(tab);
}
if(!_3ad.hidden){
_3b1.addChild(tab);
_3b0=_3b1;
}
}
if(_3b0){
if(_3ad.hidden){
_3b0.removeChild(tab);
}else{
if(_3ad.selected){
_3b0._maqDontExpandCollapse=true;
_3b0.selectChild(tab);
delete _3b0._maqDontExpandCollapse;
}
}
}
}
});
}
if(_3a4){
if(_3a4.hasOwnProperty("_rightPaletteExpanded")){
_3a4._rightPaletteExpanded=_3a6;
}
if(_3a4.hasOwnProperty("_leftPaletteExpanded")){
_3a4._leftPaletteExpanded=_3a7;
}
}
},_nearlyCollapsed:function(_3b2){
var _3b3=dojo.style(_3b2,"width");
if(typeof _3b3=="string"){
_3b3=parseInt(_3b3);
}
return _3b3<(_26f+_270);
},_expandCollapsePaletteContainer:function(tab){
if(!tab||!tab.domNode){
return;
}
var _3b4=davinci.Workbench.findPaletteContainerNode(tab.domNode);
if(!_3b4.id){
return;
}
var _3b5=_3b4._maqExpanded;
var _3b6;
if(this._nearlyCollapsed(_3b4)){
_3b5=false;
_3b6=(_271[_3b4.id].expandToSize>=(_26f+_270))?_271[_3b4.id].expandToSize:_271[_3b4.id].initialExpandToSize;
}
if(_3b5){
this.collapsePaletteContainer(_3b4);
}else{
this.expandPaletteContainer(_3b4,{expandToSize:_3b6});
}
},_expandCollapsePaletteContainers:function(_3b7,_3b8){
var _3b9=dijit.byId("left_mainBody");
var _3ba=dijit.byId("right_mainBody");
if(!_3b7){
if(_3b9){
this.collapsePaletteContainer(_3b9.domNode,_3b8);
}
if(_3ba){
this.collapsePaletteContainer(_3ba.domNode,_3b8);
}
}else{
var _3bb=_250.getExtensions("davinci.editor",function(_3bc){
return _3bc.id===_3b7.editorID;
});
if(_3bb&&_3bb.length>0){
var _3bd=_3bb[0].expandPalettes;
var _3be;
if(_3b9){
if(_3b7&&_3b7.hasOwnProperty("_leftPaletteExpanded")){
_3be=_3b7._leftPaletteExpanded;
}else{
_3be=(_3bd&&_3bd.indexOf("left")>=0);
}
if(_3be){
this.expandPaletteContainer(_3b9.domNode,_3b8);
}else{
this.collapsePaletteContainer(_3b9.domNode,_3b8);
}
}
if(_3ba){
if(_3b7&&_3b7.hasOwnProperty("_rightPaletteExpanded")){
_3be=_3b7._rightPaletteExpanded;
}else{
_3be=(_3bd&&_3bd.indexOf("right")>=0);
}
if(_3be){
this.expandPaletteContainer(_3ba.domNode,_3b8);
}else{
this.collapsePaletteContainer(_3ba.domNode,_3b8);
}
}
}
}
},_updateTitle:function(_3bf){
var _3c0=_296._baseTitle;
if(_3bf){
_3c0=_3c0+" - ";
if(_3bf.isDirty){
_3c0=_3c0+"*";
}
_3c0=_3c0+_3bf.fileName;
}
dojo.doc.title=_3c0;
},_editorTabClosed:function(page){
if(!davinci.Workbench._editorTabClosing[page.id]){
davinci.Workbench._editorTabClosing[page.id]=true;
if(page&&page.editor&&page.editor.fileName){
var _3c1=page.id;
var _3c2=_274(_3c1);
var _3c3=dijit.byId("davinci_file_tabs");
var _3c4=dijit.byId(_3c2);
var i=_296._state.editors.indexOf(page.editor.fileName);
if(i!=-1){
_296._state.editors.splice(i,1);
}
_296._updateWorkbenchState();
if(!davinci.Workbench._shadowTabClosing[_3c2]){
_3c3.removeChild(_3c4);
_3c4.destroyRecursive();
}
}
var _3c5=dijit.byId("editors_container").getChildren();
if(!_3c5.length){
_296._switchEditor(null);
this._expandCollapsePaletteContainers(null);
var _3c6=dijit.byId("editorsStackContainer");
var _3c7=dijit.byId("editorsWelcomePage");
if(_3c6&&_3c7){
_3c6.selectChild(_3c7);
}
this._hideEditorTopPanes();
}
delete davinci.Workbench._editorTabClosing[page.id];
}
},_shadowTabClosed:function(page){
if(!davinci.Workbench._shadowTabClosing[page.id]){
davinci.Workbench._shadowTabClosing[page.id]=true;
var _3c8=page.id;
var _3c9=_276(_3c8);
if(!davinci.Workbench._editorTabClosing[_3c9]){
var _3ca=dijit.byId(_3c9);
var _3cb=dijit.byId("editors_container");
if(_3cb&&_3ca){
_3cb.removeChild(_3ca);
_3ca.destroyRecursive();
}
}
delete davinci.Workbench._shadowTabClosing[page.id];
}
},getActiveProject:function(){
if(!_296._state){
_296._state=_250.serverJSONRequest({url:"cmd/getWorkbenchState",handleAs:"json",sync:true});
}
var _3cc=dojo.queryToObject(dojo.doc.location.search.substr((dojo.doc.location.search[0]==="?"?1:0))).project;
if(_3cc){
_296.loadProject(_3cc);
}
if(_296._state.hasOwnProperty("project")){
return _296._state.project;
}
return _296._DEFAULT_PROJECT;
},setActiveProject:function(_3cd){
if(!_296._state){
_296._state={};
}
_296._state.project=_3cd;
return _296._updateWorkbenchState();
},workbenchStateCustomPropGet:function(_3ce){
if(typeof _3ce=="string"){
return _296._state[_3ce];
}
},workbenchStateCustomPropSet:function(_3cf,_3d0){
if(typeof _3cf=="string"){
if(typeof _3d0=="undefined"){
delete _296._state[_3cf];
}else{
_296._state[_3cf]=_3d0;
}
_296._updateWorkbenchState();
}
},clearWorkbenchState:function(){
_296._state={};
return this._updateWorkbenchState();
},_updateWorkbenchState:function(){
if(!this._updateWorkbench){
this._updateWorkbench=new _267();
this._updateWorkbench.resolve();
}
this._updateWorkbench.then(dojo.hitch(this,function(){
this._updateWorkbench=dojo.xhrPut({url:"cmd/setWorkbenchState",putData:dojo.toJson(_296._state),handleAs:"text",sync:false});
}));
return this._updateWorkbench;
},_autoSave:function(){
var _3d1=_296._lastAutoSave;
var _3d2=false;
function _3d3(_3d4){
if(_3d4.isReadOnly||!_3d4.isDirty){
return;
}
var _3d5=_3d4.lastModifiedTime;
if(_3d5&&_3d5>_3d1){
try{
_3d4.save(true);
}
catch(ex){
console.error("Error while autosaving file:"+ex);
_3d2=true;
}
}
};
if(_296.editorTabs){
dojo.forEach(_296.editorTabs.getChildren(),_3d3);
}
if(!_3d2){
_296._lastAutoSave=Date.now();
}
},setupGlobalKeyboardHandler:function(){
var _3d6=_250.getExtensions("davinci.actionSets");
dojo.forEach(_3d6,function(_3d7){
if(_3d7.id=="davinci.ui.main"||_3d7.id=="davinci.ui.editorActions"){
dojo.forEach(_3d7.actions,function(_3d8){
if(_3d8.keyBinding){
_250.registerKeyBinding(_3d8.keyBinding,_3d8);
}
});
}
});
},findPaletteContainerNode:function(node){
var _3d9;
var n=node;
while(n&&n.tagName!="BODY"){
if(dojo.hasClass(n,"davinciPaletteContainer")){
_3d9=n;
break;
}
n=n.parentNode;
}
return _3d9;
},collapsePaletteContainer:function(node,_3da){
var _3db=davinci.Workbench.findPaletteContainerNode(node);
if(_3db&&_3db.id){
var id=_3db.id;
var _3dc=dojo.style(_3db,"width");
var _3dd=dijit.byNode(_3db);
var _3de=dojo.query("[role=tablist]",_3db);
if(_3dd&&_3de.length>0){
var _3df=_3de[0];
var _3e0=dojo.marginBox(_3df);
var _3e1=_3dd.getParent();
if(_3e1&&_3e1.resize&&_3e0&&_3e0.w){
if(!this._nearlyCollapsed(_3db)&&(!_3da||!_3da.dontPreserveWidth)){
_271[id].expandToSize=_3dc;
}
_3db.style.width=_3e0.w+"px";
_3e1.resize();
_3dd._isCollapsed=true;
}
}
dojo.removeClass(_3db,"maqPaletteExpanded");
_3db._maqExpanded=false;
davinci.Workbench._repositionFocusContainer();
var _3e2=davinci.Runtime.currentEditor;
if(_3e2){
if(_3db.id=="left_mainBody"){
_3e2._leftPaletteExpanded=false;
}else{
if(_3db.id=="right_mainBody"){
_3e2._rightPaletteExpanded=false;
}
}
}
}
},expandPaletteContainer:function(node,_3e3){
var _3e4=_3e3&&_3e3.expandToSize;
var _3e5=davinci.Workbench.findPaletteContainerNode(node);
if(_3e5&&_3e5.id){
var id=_3e5.id;
var _3e6=dijit.byNode(_3e5);
if(_3e4){
_271[id].expandToSize=_3e4;
}
if(_3e6&&_271[id].expandToSize){
var _3e7=_3e6.getParent();
if(_3e7&&_3e7.resize){
_3e5.style.width=_271[id].expandToSize+"px";
_3e7.resize();
delete _3e6._isCollapsed;
}
}
dojo.addClass(_3e5,"maqPaletteExpanded");
_3e5._maqExpanded=true;
davinci.Workbench._repositionFocusContainer();
var _3e8=davinci.Runtime.currentEditor;
if(_3e8){
if(_3e5.id=="left_mainBody"){
_3e8._leftPaletteExpanded=true;
}else{
if(_3e5.id=="right_mainBody"){
_3e8._rightPaletteExpanded=true;
}
}
}
}
},_repositionFocusContainer:function(){
var _3e9=dojo.byId("editors_container");
var _3ea=dojo.byId("focusContainer");
if(_3e9&&_3ea){
var _3eb=davinci.Runtime.currentEditor;
var box;
if(_3eb&&_3eb.getFocusContainerBounds){
box=_3eb.getFocusContainerBounds();
}else{
box=_26d.getBorderBoxPageCoords(_3e9);
}
if(box){
_3ea.style.left=box.l+"px";
_3ea.style.top=box.t+"px";
_3ea.style.width=box.w+"px";
_3ea.style.height=box.h+"px";
if(_3eb&&_3eb.getContext){
var _3ec=_3eb.getContext();
if(_3ec&&_3ec.updateFocusAll){
_3ec.updateFocusAll();
}
}
}
}
},_hideShowEditorTopPanes:function(_3ed){
var _3ee=dijit.byId("davinci_app");
var _3ef=dijit.byId("davinci_file_tabs");
var _3f0=dijit.byId("davinci_toolbar_pane");
_3ef.domNode.style.display=_3ed;
_3f0.domNode.style.display=_3ed;
_3ee.resize();
},_hideEditorTopPanes:function(){
this._hideShowEditorTopPanes("none");
},_showEditorTopPanes:function(){
this._hideShowEditorTopPanes("block");
},_XX_last_member:true};
var _327=_268(Menu,{menuOpened:function(_3f1){
},_openMyself:function(_3f2){
this.menuOpened(_3f2);
var open;
try{
var _3f3=document.getElementById("menuOverlayDiv");
if(!_3f3){
_3f3=dojo.create("div",{id:"menuOverlayDiv",style:"left:0px; top:0px; width:100%; height:100%; position:absolute; z-index:10;"},document.body);
}
if(this.adjustPosition){
var _3f4=this.adjustPosition(_3f2);
open=dijit.popup.open;
dijit.popup.open=function(args){
args.x+=_3f4.x;
args.y+=_3f4.y;
open.call(dijit.popup,args);
};
}
this.onClose=function(){
var _3f5=document.getElementById("menuOverlayDiv");
if(_3f5){
_3f5.parentNode.removeChild(_3f5);
}
}.bind(this);
this.inherited(arguments);
}
finally{
if(open){
dijit.popup.open=open;
}
}
}});
dojo.setObject("davinci.Workbench",_296);
return _296;
});
},"dijit/form/_SearchMixin":function(){
define(["dojo/data/util/filter","dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/query","dojo/sniff","dojo/string","dojo/when","../registry"],function(_3f6,_3f7,_3f8,keys,lang,_3f9,has,_3fa,when,_3fb){
return _3f7("dijit.form._SearchMixin",null,{pageSize:Infinity,store:null,fetchProperties:{},query:{},searchDelay:200,searchAttr:"name",queryExpr:"${0}*",ignoreCase:true,_abortQuery:function(){
if(this.searchTimer){
this.searchTimer=this.searchTimer.remove();
}
if(this._queryDeferHandle){
this._queryDeferHandle=this._queryDeferHandle.remove();
}
if(this._fetchHandle){
if(this._fetchHandle.abort){
this._cancelingQuery=true;
this._fetchHandle.abort();
this._cancelingQuery=false;
}
if(this._fetchHandle.cancel){
this._cancelingQuery=true;
this._fetchHandle.cancel();
this._cancelingQuery=false;
}
this._fetchHandle=null;
}
},_processInput:function(evt){
if(this.disabled||this.readOnly){
return;
}
var key=evt.charOrCode;
if(evt.altKey||((evt.ctrlKey||evt.metaKey)&&(key!="x"&&key!="v"))||key==keys.SHIFT){
return;
}
var _3fc=false;
this._prev_key_backspace=false;
switch(key){
case keys.DELETE:
case keys.BACKSPACE:
this._prev_key_backspace=true;
this._maskValidSubsetError=true;
_3fc=true;
break;
default:
_3fc=typeof key=="string"||key==229;
}
if(_3fc){
if(!this.store){
this.onSearch();
}else{
this.searchTimer=this.defer("_startSearchFromInput",1);
}
}
},onSearch:function(){
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value.replace(/([\\\*\?])/g,"\\$1"));
},_startSearch:function(text){
this._abortQuery();
var _3fd=this,_3f9=lang.clone(this.query),_3fe={start:0,count:this.pageSize,queryOptions:{ignoreCase:this.ignoreCase,deep:true}},qs=_3fa.substitute(this.queryExpr,[text]),q,_3ff=function(){
var _400=_3fd._fetchHandle=_3fd.store.query(_3f9,_3fe);
if(_3fd.disabled||_3fd.readOnly||(q!==_3fd._lastQuery)){
return;
}
when(_400,function(res){
_3fd._fetchHandle=null;
if(!_3fd.disabled&&!_3fd.readOnly&&(q===_3fd._lastQuery)){
when(_400.total,function(_401){
res.total=_401;
var _402=_3fd.pageSize;
if(isNaN(_402)||_402>res.total){
_402=res.total;
}
res.nextPage=function(_403){
_3fe.direction=_403=_403!==false;
_3fe.count=_402;
if(_403){
_3fe.start+=res.length;
if(_3fe.start>=res.total){
_3fe.count=0;
}
}else{
_3fe.start-=_402;
if(_3fe.start<0){
_3fe.count=Math.max(_402+_3fe.start,0);
_3fe.start=0;
}
}
if(_3fe.count<=0){
res.length=0;
_3fd.onSearch(res,_3f9,_3fe);
}else{
_3ff();
}
};
_3fd.onSearch(res,_3f9,_3fe);
});
}
},function(err){
_3fd._fetchHandle=null;
if(!_3fd._cancelingQuery){
console.error(_3fd.declaredClass+" "+err.toString());
}
});
};
lang.mixin(_3fe,this.fetchProperties);
if(this.store._oldAPI){
q=qs;
}else{
q=_3f6.patternToRegExp(qs,this.ignoreCase);
q.toString=function(){
return qs;
};
}
this._lastQuery=_3f9[this.searchAttr]=q;
this._queryDeferHandle=this.defer(_3ff,this.searchDelay);
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.store){
var list=this.list;
if(list){
this.store=_3fb.byId(list);
}
}
this.inherited(arguments);
}});
});
},"url:dijit/form/templates/CheckBox.html":"<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><input\n\t \t${!nameAttrSetting} type=\"${type}\" ${checkedAttrSetting}\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdata-dojo-attach-point=\"focusNode\"\n\t \tdata-dojo-attach-event=\"onclick:_onClick\"\n/></div>\n","dijit/form/SimpleTextarea":function(){
define(["dojo/_base/declare","dojo/dom-class","dojo/sniff","./TextBox"],function(_404,_405,has,_406){
return _404("dijit.form.SimpleTextarea",_406,{baseClass:"dijitTextBox dijitTextArea",rows:"3",cols:"20",templateString:"<textarea ${!nameAttrSetting} data-dojo-attach-point='focusNode,containerNode,textbox' autocomplete='off'></textarea>",postMixInProperties:function(){
if(!this.value&&this.srcNodeRef){
this.value=this.srcNodeRef.value;
}
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
if(has("ie")&&this.cols){
_405.add(this.textbox,"dijitTextAreaCols");
}
},filter:function(_407){
if(_407){
_407=_407.replace(/\r/g,"");
}
return this.inherited(arguments);
},_onInput:function(e){
if(this.maxLength){
var _408=parseInt(this.maxLength);
var _409=this.textbox.value.replace(/\r/g,"");
var _40a=_409.length-_408;
if(_40a>0){
var _40b=this.textbox;
if(_40b.selectionStart){
var pos=_40b.selectionStart;
var cr=0;
if(has("opera")){
cr=(this.textbox.value.substring(0,pos).match(/\r/g)||[]).length;
}
this.textbox.value=_409.substring(0,pos-_40a-cr)+_409.substring(pos-cr);
_40b.setSelectionRange(pos-_40a,pos-_40a);
}else{
if(this.ownerDocument.selection){
_40b.focus();
var _40c=this.ownerDocument.selection.createRange();
_40c.moveStart("character",-_40a);
_40c.text="";
_40c.select();
}
}
}
}
this.inherited(arguments);
}});
});
},"davinci/version":function(){
define([],"7");
},"davinci/ve/commands/EventCommand":function(){
define(["dojo/_base/declare","davinci/ve/widget"],function(_40d,_40e){
return _40d("davinci.ve.commands.EventCommand",null,{name:"EventCommand",constructor:function(_40f,_410){
this._oldId=(_40f?_40f.id:undefined);
this._properties=(_410||{});
},setContext:function(_411){
this._context=_411;
},execute:function(){
if(!this._oldId||!this._properties){
return;
}
var _412=_40e.byId(this._oldId);
this._oldProps=_412.properties||{};
_412.setProperties(this._properties,true);
if(_412.isHtmlWidget){
var node=_412.domNode;
for(var name in this._properties){
if(!this._properties[name]){
node.removeAttribute(name);
}
}
}
this._newId=this._oldId;
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[_412]]);
},undo:function(){
if(!this._newId){
return;
}
var _413=_40e.byId(this._newId);
var _414=_413.domNode;
var _415=_413._srcElement;
for(var _416 in this._properties){
if(!this._oldProps[_416]){
_414.removeAttribute(_416);
_415.removeAttribute(_416);
}
}
_413.setProperties(this._oldProps);
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[_413]]);
}});
});
},"davinci/ve/ve.plugin":function(){
define(["require"],function(_417){
return {id:"davinci.ve","davinci.view":[{id:"Palette",title:"Palette",viewClass:"davinci/ve/palette/HtmlWidgets",iconClass:"paletteIcon paletteIconWidgets"},{id:"states",title:"Scenes",viewClass:"davinci/ve/views/StatesView",iconClass:"paletteIcon paletteIconStates"},{id:"object",title:"Object",viewClass:"davinci/ve/views/ObjectView"},{id:"style",title:"",viewClass:"davinci/ve/views/SwitchingStyleView"}],"davinci.perspective":[{id:"pageDesign",title:"Page Design",views:[{viewID:"davinci.ve.Palette",position:"left",selected:true},{viewID:"davinci.ui.outline",position:"left"},{viewID:"davinci.ve.style",position:"right"},{viewID:"davinci.ui.comment",position:"right",hidden:true},{viewID:"davinci.ve.states",position:"right-bottom",selected:true},{viewID:"davinci.ui.navigator",position:"left-bottom",selected:true},{viewID:"davinci.review.reviewNavigator",position:"left-bottom"}]}],"davinci.editor":[{id:"HTMLPageEditor",name:"HTML Visual Editor",extensions:["html","htm","php"],isDefault:true,editorClass:"davinci/ve/PageEditor",palettePerspective:"davinci.ve.pageDesign",expandPalettes:["left"]}],"davinci.actionSets":[{id:"cutCopyPaste",visible:true,actions:[{label:"Cut",keySequence:"M1+X",iconClass:"editActionIcon editCutIconSmall",action:"davinci/ve/actions/CutAction",menubarPath:"davinci.edit/cut"},{label:"Copy",keySequence:"M1+C",iconClass:"editActionIcon editCopyIconSmall",action:"davinci/ve/actions/CopyAction",menubarPath:"davinci.edit/cut"},{keySequence:"M1+V",iconClass:"editActionIcon editPasteIconSmall",label:"Paste",action:"davinci/ve/actions/PasteAction",menubarPath:"davinci.edit/cut"},{keySequence:"DEL",iconClass:"editActionIcon editDeleteIconSmall",label:"Delete",action:"davinci/ve/actions/DeleteAction",menubarPath:"davinci.edit/cut"},{iconClass:"editActionIcon selectParentIconSmall",label:"Select parent",action:"davinci/ve/actions/SelectParentAction",menubarPath:"davinci.edit/cut"},{iconClass:"editActionIcon selectAncestorIconSmall",label:"Select ancestor...",action:"davinci/ve/actions/SelectAncestorAction",menubarPath:"davinci.edit/cut"},{iconClass:"editActionIcon unselectAllIconSmall",label:"Unselect all",action:"davinci/ve/actions/UnselectAllAction",menubarPath:"davinci.edit/cut"},{iconClass:"editActionIcon",label:"Surround with &lt;A&gt;",action:"davinci/ve/actions/SurroundAction",surroundWithTagName:"a",menubarPath:"davinci.edit/cut"},{iconClass:"editActionIcon",label:"Surround with &lt;DIV&gt;",action:"davinci/ve/actions/SurroundAction",surroundWithTagName:"div",menubarPath:"davinci.edit/cut"},{iconClass:"editActionIcon",label:"Surround with &lt;SPAN&gt;",action:"davinci/ve/actions/SurroundAction",surroundWithTagName:"span",menubarPath:"davinci.edit/cut"},{iconClass:"editActionIcon moveToFrontIconSmall",label:"Move to front",action:"davinci/ve/actions/MoveToFrontAction",menubarPath:"davinci.edit/cut"},{iconClass:"editActionIcon moveForwardIconSmall",label:"Move forward",action:"davinci/ve/actions/MoveForwardAction",menubarPath:"davinci.edit/cut"},{iconClass:"editActionIcon moveBackwardIconSmall",label:"Move backward",action:"davinci/ve/actions/MoveBackwardAction",menubarPath:"davinci.edit/cut"},{iconClass:"editActionIcon moveToBackIconSmall",label:"Move to back",action:"davinci/ve/actions/MoveToBackAction",menubarPath:"davinci.edit/cut"}]},{id:"datastoreActions",visible:true,actions:[{id:"davinci.ui.generateform",label:"Generate Form",run:function(){
_417("davinci/ve/views/DataStoresView").generateForm();
},menubarPath:"newfile"},{id:"davinci.ui.generateform",label:"Generate Table",run:function(){
_417("davinci/ve/views/DataStoresView").generateTable();
},menubarPath:"newfile"}]}],"davinci.viewActions":[{viewContribution:{targetID:"davinci.ve.outline",actions:[{id:"design",iconClass:"designModeIcon editActionIcon",radioGroup:"displayMode",method:"switchDisplayMode",label:"Widgets",toolbarPath:"displayMode"},{id:"source",iconClass:"sourceModeIcon editActionIcon",method:"switchDisplayMode",radioGroup:"displayMode",label:"Source",toolbarPath:"displayMode"}]}},{viewContribution:{targetID:"davinci.ve.states",actions:[{id:"addState",iconClass:"viewActionIcon addStateIcon",action:"davinci/ve/actions/AddState",label:"Add State",toolbarPath:"states1"},{id:"removeState",iconClass:"viewActionIcon removeStateIcon",action:"davinci/ve/actions/RemoveState",label:"Remove State",toolbarPath:"states1"},{id:"modifyState",iconClass:"viewActionIcon modifyStateIcon",action:"davinci/ve/actions/ModifyState",label:"Modify State",toolbarPath:"states1"}]}}],"davinci.actionSetPartAssociations":[{targetID:"davinci.ve.cutCopyPaste",parts:["davinci.ve.visualEditor","davinci.ve.VisualEditorOutline"]}],"davinci.editorActions":{editorContribution:{targetID:"davinci.ve.HTMLPageEditor",actions:[{id:"savecombo",className:"maqLabelButton",showLabel:true,label:"Save",toolbarPath:"save",type:"ComboButton",run:function(){
_417(["../Workbench"],function(_418){
_417("../ui/Resource").save();
});
},isEnabled:function(_419){
return _417("../Workbench").getOpenEditor();
},menu:[{iconClass:"saveIcon",run:function(){
_417("../ui/Resource").save();
},isEnabled:function(_41a){
return _417("../Workbench").getOpenEditor();
},label:"Save",keyBinding:{accel:true,charOrCode:"s",allowGlobal:true}},{iconClass:"saveAsIcon",run:function(){
_417("../ui/Resource").saveAs("html");
},isEnabled:function(_41b){
return _417("../Workbench").getOpenEditor();
},label:"Save As",keyBinding:{accel:true,shift:true,charOrCode:"s",allowGlobal:true}},{id:"saveasdijit",iconClass:"saveAsDijitIcon",run:function(){
return _417(["davinci/de/resource"],function(r){
r.createDijiFromNewDialog();
});
},isEnabled:function(_41c){
return _417("../Workbench").getOpenEditor();
},label:"Save As Widget"},]},{id:"undo",iconClass:"editActionIcon undoIcon",action:"davinci/actions/UndoAction",label:"Undo",toolbarPath:"undoredo",keyBinding:{accel:true,charOrCode:"z"}},{id:"redo",iconClass:"editActionIcon redoIcon",action:"davinci/actions/RedoAction",label:"Redo",toolbarPath:"undoredo",keyBinding:{accel:true,shift:true,charOrCode:"z"}},{id:"cut",label:"Cut",iconClass:"editActionIcon editCutIcon",action:"davinci/ve/actions/CutAction",toolbarPath:"cutcopypaste",keyBinding:{accel:true,charOrCode:"x"}},{id:"copy",label:"Copy",iconClass:"editActionIcon editCopyIcon",action:"davinci/ve/actions/CopyAction",toolbarPath:"cutcopypaste",keyBinding:{accel:true,charOrCode:"c"}},{label:"Paste",iconClass:"editActionIcon editPasteIcon",action:"davinci/ve/actions/PasteAction",toolbarPath:"cutcopypaste",keyBinding:{accel:true,charOrCode:"v"}},{id:"delete",iconClass:"editActionIcon editDeleteIcon",label:"Delete",action:"davinci/ve/actions/DeleteAction",toolbarPath:"delete",keyBinding:{charOrCode:[dojo.keys.DELETE,dojo.keys.BACKSPACE]}},{id:"openBrowser",iconClass:"openBrowserIcon",className:"davinciFloatRight openBrowser",run:function(){
_417(["../Workbench"],function(_41d){
var _41e=_41d.getOpenEditor();
if(_41e&&_41e.resourceFile){
_41e.previewInBrowser();
}else{
console.error("ERROR. Cannot launch browser window. No editor info.");
}
});
},label:"Preview in Browser",toolbarPath:"undoredo",keyBinding:{accel:true,charOrCode:"0",allowGlobal:true}},{id:"documentSettings",iconClass:"documentSettingsIcon",className:"documentSettings davinciFloatRight",label:"Document settings",toolbarPath:"undoredo",type:"DropDownButton",menu:[{id:"theme",iconClass:"selectThemeIcon",className:"davinciFloatRight",action:"davinci/actions/SelectThemeAction",label:"Switch theme"},{id:"chooseDevice",iconClass:"deviceIcon",className:"davinciFloatRight",action:"davinci/ve/actions/ChooseDeviceAction",label:"Choose device"},{id:"rotateDevice",iconClass:"rotateIcon",className:"davinciFloatRight",action:"davinci/ve/actions/RotateDeviceAction",label:"Rotate device"},{iconClass:"editActionIcon",label:"Select parent",action:"davinci/ve/actions/SelectParentAction"},{iconClass:"editActionIcon",label:"Select ancestor...",action:"davinci/ve/actions/SelectAncestorAction"},{iconClass:"editActionIcon",label:"Unselect all",action:"davinci/ve/actions/UnselectAllAction"},{iconClass:"editActionIcon",label:"Move to front",action:"davinci/ve/actions/MoveToFrontAction"},{iconClass:"editActionIcon",label:"Move forward",action:"davinci/ve/actions/MoveForwardAction"},{iconClass:"editActionIcon",label:"Move backward",action:"davinci/ve/actions/MoveBackwardAction"},{iconClass:"editActionIcon",label:"Move to back",action:"davinci/ve/actions/MoveToBackAction"},{iconClass:"editActionIcon",label:"Surround with &lt;A&gt;",action:"davinci/ve/actions/SurroundAction",surroundWithTagName:"a"},{iconClass:"editActionIcon",label:"Surround with &lt;DIV&gt;",action:"davinci/ve/actions/SurroundAction",surroundWithTagName:"div"},{iconClass:"editActionIcon",label:"Surround with &lt;SPAN&gt;",action:"davinci/ve/actions/SurroundAction",surroundWithTagName:"span"}]},{id:"stickynote",iconClass:"stickynoteIcon",action:"davinci/actions/StickyNoteAction",label:"Add note",toolbarPath:"stickynote"},{id:"layout",className:"maqLabelButton davinciFloatRight maqLayoutDropDownButton",showLabel:true,label:"Flow",toolbarPath:"undoredo",type:"DropDownButton",menu:[{label:"Flow",iconClass:"flowLayoutIcon",method:"selectLayoutFlow"},{label:"Absolute",iconClass:"absoluteLayoutIcon",method:"selectLayoutAbsolute"}]},{id:"sourcecombo",className:"maqLabelButton davinciFloatRight maqSourceComboButton",showLabel:true,label:"Source",action:"davinci/ve/actions/ViewSourceAction",toolbarPath:"undoredo",type:"ComboButton",menu:[{keyBinding:{accel:true,charOrCode:"2",allowGlobal:true},iconClass:"editActionIcon sourceModeIcon sourceMenuIcon",action:"davinci/ve/actions/ViewSourceMenuAction",label:"Source only"},{keyBinding:{accel:true,charOrCode:"3",allowGlobal:true},iconClass:"editActionIcon splitVerticalIcon sourceMenuIcon",action:"davinci/ve/actions/ViewSplitVMenuAction",label:"Split Vertically"},{keyBinding:{accel:true,charOrCode:"4",allowGlobal:true},iconClass:"editActionIcon splitHorizontalIcon sourceMenuIcon",action:"davinci/ve/actions/ViewSplitHMenuAction",label:"Split Horizontally"}]},{id:"design",showLabel:true,className:"maqLabelButton davinciFloatRight maqDesignButton",action:"davinci/ve/actions/ViewDesignAction",label:"Design",toolbarPath:"undoredo",keyBinding:{accel:true,charOrCode:"1",allowGlobal:true}},{id:"closeactiveeditor",run:function(){
_417(["../Workbench"],function(_41f){
_41f.closeActiveEditor();
});
},keyBinding:{accel:true,shift:true,charOrCode:"w",allowGlobal:true}},{id:"showWidgetsPalette",run:function(){
var tab=dijit.byId("davinci.ve.Palette");
if(tab){
var _420=tab.getParent();
if(_420){
_420.selectChild(tab);
}
}
},keyBinding:{meta:true,charOrCode:"p",allowGlobal:true}}]}},"davinci.preferences":[{name:"Visual Editor",id:"editorPrefs",category:"davinci.html.general",pane:"davinci/ve/prefs/HTMLEditPreferences",defaultValues:{"flowLayout":true,"snap":true,"showPossibleParents":false,"cssOverrideWarn":true,"absoluteWidgetsZindex":900}}],"davinci.dnd":[{parts:["davinci.ui.navigator"],dragSource:function(_421){
if(_421.elementType=="File"){
return (/gif|jpeg|jpg|png|svg|json/i).test(_421.getExtension());
}
},dragHandler:"davinci/ve/palette/ImageDragSource"}],"davinci.fileType":[{extension:"theme",iconClass:"themeFileIcon",type:"text"}],"davinci.defaultEditorActions":{editorContribution:{actions:[{id:"save",run:function(){
_417("../Workbench").getOpenEditor().save();
},isEnabled:function(_422){
return true;
},className:"maqLabelButton",showLabel:true,label:"Save",toolbarPath:"save",keyBinding:{accel:true,charOrCode:"s"}},{id:"undo",iconClass:"editActionIcon undoIcon",action:"davinci/actions/UndoAction",label:"Undo",toolbarPath:"undoredo",keyBinding:{accel:true,charOrCode:"z"}},{id:"redo",iconClass:"editActionIcon redoIcon",action:"davinci/actions/RedoAction",label:"Redo",toolbarPath:"undoredo",keyBinding:{accel:true,shift:true,charOrCode:"z"}}]}}};
});
},"davinci/review/model/resource/Folder":function(){
define(["dojo/_base/declare","davinci/model/resource/Resource","davinci/review/model/resource/File","dojo/_base/xhr","dojo/date/stamp"],function(_423,_424,_425,xhr,_426){
return _423("davinci.review.model.resource.Folder",_424,{isDraft:false,closed:false,width:0,height:0,constructor:function(proc){
dojo.mixin(this,proc);
this.elementType="ReviewVersion";
this.dueDate=this.dueDate=="infinite"?this.dueDate:_426.fromISOString(this.dueDate);
},getChildrenSync:function(_427,sync){
this.getChildren(_427);
},getChildren:function(_428,_429){
if(this._isLoaded){
_428.call(null,this.children);
}else{
if(this._loading){
this._loading.then(function(){
_428.call(null,this.children);
}.bind(this),_429);
}else{
var _42a=this.designerId||"";
this._loading=xhr.get({url:"cmd/listReviewFiles",handleAs:"json",content:{designer:_42a,version:this.timeStamp}}).then(function(_42b,_42c){
this.children=_42b.map(function(file){
return new _425(file.path,this);
},this);
this._isLoaded=true;
_428.call(null,this.children);
delete this._loading;
}.bind(this),_429);
}
}
},getPath:function(){
if(this.parent){
return this.parent.getPath()+"/"+this.timeStamp;
}
return this.timeStamp;
}});
});
},"dojox/grid/_RowSelector":function(){
define("dojox/grid/_RowSelector",["dojo/_base/declare","./_View"],function(_42d,_42e){
return _42d("dojox.grid._RowSelector",_42e,{defaultWidth:"2em",noscroll:true,padBorderWidth:2,buildRendering:function(){
this.inherited("buildRendering",arguments);
this.scrollboxNode.style.overflow="hidden";
this.headerNode.style.visibility="hidden";
},getWidth:function(){
return this.viewWidth||this.defaultWidth;
},buildRowContent:function(_42f,_430){
var w=this.contentWidth||0;
_430.innerHTML="<table class=\"dojoxGridRowbarTable\" style=\"width:"+w+"px;height:1px;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\"><tr><td class=\"dojoxGridRowbarInner\">&nbsp;</td></tr></table>";
},renderHeader:function(){
},updateRow:function(){
},resize:function(){
this.adaptHeight();
},adaptWidth:function(){
if(!("contentWidth" in this)&&this.contentNode&&this.contentNode.offsetWidth>0){
this.contentWidth=this.contentNode.offsetWidth-this.padBorderWidth;
}
},doStyleRowNode:function(_431,_432){
var n=["dojoxGridRowbar dojoxGridNonNormalizedCell"];
if(this.grid.rows.isOver(_431)){
n.push("dojoxGridRowbarOver");
}
if(this.grid.selection.isSelected(_431)){
n.push("dojoxGridRowbarSelected");
}
_432.className=n.join(" ");
},domouseover:function(e){
this.grid.onMouseOverRow(e);
},domouseout:function(e){
if(!this.isIntraRowEvent(e)){
this.grid.onMouseOutRow(e);
}
}});
});
},"davinci/html/HTMLModel":function(){
define(["dojo/_base/declare","davinci/model/Model"],function(_433,_434){
if(!davinci.html){
davinci.html={};
}
davinci.html._noFormatElements={span:true,b:true,it:true};
davinci.html.escapeXml=function(_435){
if(!_435){
return _435;
}
return _435.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
};
davinci.html.unEscapeXml=function(_436){
if(!_436||typeof _436!=="string"){
return _436;
}
return _436.replace(/&quot;/g,"\"").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
};
return _433("davinci.html.HTMLModel",_434,{});
});
},"davinci/ui/widgets/TransformTreeMixin":function(){
define("davinci/ui/widgets/TransformTreeMixin",["dijit/Tree"],function(tree){
var _437=dijit.Tree.prototype.postCreate;
dijit.Tree.prototype.postCreate=function(){
var _438=dijit.Tree.prototype._onItemChildrenChange;
dijit.Tree.prototype._onItemChildrenChange=function(_439,_43a){
if(this.transforms){
this.transforms.forEach(function(_43b){
_43a=_43b(_43a);
});
}
_438.apply(this,[_439,_43a]);
};
var _43c=this.model.getChildren;
this.model.getChildren=dojo.hitch(this,function(_43d,_43e,_43f){
var _440=_43e;
if(this.transforms){
_440=dojo.hitch(this,function(_441){
this.transforms.forEach(function(_442){
_441=_442(_441);
});
_43e(_441);
});
}
_43c.apply(this.model,[_43d,_440,_43f]);
});
_437.apply(this);
};
});
},"davinci/workbench/EditorContainer":function(){
define(["require","dojo/_base/declare","./_ToolbaredContainer","../Runtime","../ve/metadata","../ve/utils/GeomUtils","dojo/Deferred","dojo/i18n!./nls/workbench"],function(_443,_444,_445,_446,_447,_448,_449,_44a){
var _44b={},_44c={};
return _444(_445,{constructor:function(args){
},postCreate:function(){
this.subscribe("/davinci/ui/editorSelected",function(_44d){
if(_44d.editor==this.editor){
this.updateToolbars();
}
});
this.subscribe("/davinci/ui/widgetSelected",this.updateToolbars);
this.subscribe("/davinci/workbench/ready",this.updateToolbars);
},layout:function(){
this.titleBarDiv.style.display="none";
this.toolbarDiv.style.display="none";
this.inherited(arguments);
},resize:function(){
this.inherited(arguments);
if(this.editor&&this.editor.editor&&this.editor.editor.getTextView){
this.editor.editor.getTextView().resize();
}
},setEditor:function(_44e,_44f,_450,file,_451,_452){
var d=new _449();
this.editorExtension=_44e;
_443([_44e.editorClass],function(_453){
try{
var _454=this.editor=new _453(this.containerNode,_44f);
var _455=function(){
if(_454.setRootElement){
_454.setRootElement(_451);
}
this.containerNode=_454.domNode||this.containerNode;
if(typeof _44e.editorClassName=="string"){
dojo.addClass(this.domNode,_44e.editorClassName);
}
_454.editorID=_44e.id;
_454.isDirty=!_454.isReadOnly&&this.isDirty;
this._createToolbar(_44e.editorClass);
if(!_450){
_450=_454.getDefaultContent();
if(_454.isReadOnly||!file.isNew){
_454.isDirty=false;
}else{
_454.isDirty=true;
}
_454.lastModifiedTime=Date.now();
}
if(!_450){
_450="";
}
_454.resourceFile=file;
_454.fileName=_44f;
var _456="editors_container";
if(dijit.byId(_456).selectedChildWidget.domNode==this.domNode){
_454.setContent(_44f,_450,_452);
this._setupKeyboardHandler();
dojo.connect(_454,"handleKeyEvent",this,"_handleKeyDown");
}else{
var _457=dojo.subscribe(_456+"-selectChild",this,function(args){
if(_454==args.editor){
dojo.unsubscribe(_457);
_454.setContent(_44f,_450);
this._setupKeyboardHandler();
dojo.connect(_454,"handleKeyEvent",this,"_handleKeyDown");
}
});
}
_454.editorContainer=this;
this.setDirty(_454.isDirty);
}.bind(this);
if(_454.deferreds){
_454.deferreds.then(function(){
try{
_455();
d.resolve(_454);
}
catch(e2){
d.reject(e2);
}
},function(e){
d.reject(e);
});
}else{
_455();
d.resolve(_454);
}
}
catch(e){
d.reject(e);
}
}.bind(this));
return d;
},setDirty:function(_458){
var _459=this._getTitle();
if(_458){
_459="*"+_459;
}
var _45a=_443("../Workbench");
_45a.editorTabs.setTitle(this,_459);
this.lastModifiedTime=Date.now();
this.isDirty=_458;
},_getTitle:function(){
var _45b=this.attr("title");
if(_45b[0]=="*"){
_45b=_45b.substring(1);
}
return _45b;
},save:function(_45c){
this.editor.save(_45c);
this.setDirty(_45c);
},_close:function(_45d,_45e){
dojo.publish("/davinci/ui/EditorClosing",[{editor:_45d}]);
var _45f=true;
if(_45e&&_45d&&_45d.isDirty){
var _460=_45d.getOnUnloadWarningMessage();
if(!_460){
_460=dojo.string.substitute(_44a.fileHasUnsavedChanges,[this._getTitle()]);
}
_45f=confirm(_460);
}
if(_45f){
this._isClosing=true;
if(_45d.removeWorkingCopy){
_45d.removeWorkingCopy();
}else{
if(_45d.getFileEditors){
_45d.getFileEditors().forEach(function(_461){
if(_461.isReadOnly){
return;
}
_461.resourceFile.removeWorkingCopy();
});
}else{
if(_45d.resourceFile){
_45d.resourceFile.removeWorkingCopy();
}
}
}
}
return _45f;
},onClose:function(){
var _462=!this._skipDirtyCheck;
return this._close(this.editor,_462);
},forceClose:function(_463,_464){
this._close(_463,_464);
var _465=this.getParent();
if(_465){
_465.removeChild(this);
this.destroyRecursive();
}
},_getViewActions:function(){
var _466=this.editorExtension.id;
var _467=[];
var _468=_446.getExtensions("davinci.editorActions",function(ext){
if(_466==ext.editorContribution.targetID){
_467.push(ext.editorContribution);
return true;
}
});
if(_467.length==0){
var _468=_446.getExtension("davinci.defaultEditorActions",function(ext){
_467.push(ext.editorContribution);
return true;
});
}
var _469=_447.getLibraryActions("davinci.editorActions",_466);
_467=dojo.clone(_467);
if(_467.length>0&&_469.length){
dojo.forEach(_469,function(_46a){
var _46b=_443("../Workbench");
if(_46a.action){
_46b._loadActionClass(_46a);
}
if(_46a.menu){
for(var i=0;i<_46a.menu.length;i++){
var _46c=_46a.menu[0];
if(_46c.action){
_46b._loadActionClass(_46c);
}
}
}
_467[0].actions.push(_46a);
});
}
return _467;
},_getViewContext:function(){
return this.editor;
},_setupKeyboardHandler:function(){
var _46d=function(o){
if(!this.keyBindings){
this.keyBindings=[];
}
this.keyBindings.push(o);
}.bind(this);
this._getViewActions().forEach(function(_46e){
_46e.actions.forEach(function(_46f){
if(_46f.keyBinding){
_46d({keyBinding:_46f.keyBinding,action:_46f});
}
if(_46f.menu){
_46f.menu.forEach(function(_470){
if(_470.keyBinding){
_46d({keyBinding:_470.keyBinding,action:_470});
}
},this);
}
},this);
},this);
},_handleKeyDown:function(e,_471){
var _472=this._handleKey(e,_471);
if(!_472&&!_471){
_446.handleKeyEvent(e);
}
},_handleKey:function(e,_473){
if(!this.keyBindings){
return false;
}
var _474=this.keyBindings.some(function(_475){
if(_473&&!_475.keyBinding.allowGlobal){
return;
}
if(_446.isKeyEqualToEvent(_475.keyBinding,e)){
var _476=_443("../Workbench");
_476._runAction(_475.action,this.editor,_475.action.id);
return true;
}
},this);
if(_474){
dojo.stopEvent(e);
}
return _474;
},destroy:function(){
this.inherited(arguments);
if(this.editor){
this.editor.destroy();
}
delete this.editor;
},_updateToolbar:function(_477){
function _478(_479,_47a){
var _47b=true;
if(_479&&_479.action&&_479.action[_47a]){
_47b=_479.action[_47a]();
}else{
if(_479&&_479[_47a]){
_47b=_479[_47a]();
}
}
return _47b;
};
function _47c(_47d,_47e){
var _47f=_478(_47e,"shouldShow");
if(_47f){
dojo.removeClass(_47d.domNode,"maqHidden");
}else{
dojo.addClass(_47d.domNode,"maqHidden");
}
};
function _480(_481,_482){
var _483=_478(_482,"isEnabled");
_481.set("disabled",!_483);
};
function _484(_485,_486){
_478(_486,"updateStyling");
};
if(_477&&this.editor){
var _487=this.editor.getContext?this.editor.getContext():null;
if(_487){
var _488=_477.getChildren();
for(var i=0;i<_488.length;i++){
var _489=_488[i];
_47c(_489,_489._maqAction);
_480(_489,_489._maqAction);
_484(_489,_489._maqAction);
var menu=_489.dropDown;
if(menu){
var _48a=menu.getChildren();
for(var j=0;j<_48a.length;j++){
var _48b=_48a[j];
_47c(_48b,_48b._maqAction);
_480(_48b,_48b._maqAction);
_484(_48b,_48b._maqAction);
}
}
}
}
}
},updateToolbars:function(){
if(this.editor==_446.currentEditor){
var _48c=this.getToolbarDiv();
if(_48c){
_48c.innerHTML="";
}
var _48d=this.toolbarCreated(this.editorExtension.editorClass);
if(_48c&&_48d&&_48d.domNode){
_48c.appendChild(_48d.domNode);
}
var _48e=dojo.query("#davinci_toolbar_container .dijitToolbar")[0];
var _48f=_48e?dijit.byNode(_48e):null;
this._updateToolbar(_48f);
}
},_createToolbar:function(_490){
if(this.toolbarCreated(_490)||_44b[_490]){
return;
}
_44b[_490]=true;
this.inherited(arguments);
},getToolbarDiv:function(){
return dojo.byId("davinci_toolbar_container");
},toolbarCreated:function(_491,_492){
if(arguments.length>1){
_44c[_491]=_492;
}
return _44c[_491];
}});
});
},"dojox/grid/_Layout":function(){
define("dojox/grid/_Layout",["dojo/_base/kernel","../main","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/dom-geometry","./cells","./_RowSelector"],function(dojo,_493,_494,_495,lang,_496){
return _494("dojox.grid._Layout",null,{constructor:function(_497){
this.grid=_497;
},cells:[],structure:null,defaultWidth:"6em",moveColumn:function(_498,_499,_49a,_49b,_49c){
var _49d=this.structure[_498].cells[0];
var _49e=this.structure[_499].cells[0];
var cell=null;
var _49f=0;
var _4a0=0;
for(var i=0,c;c=_49d[i];i++){
if(c.index==_49a){
_49f=i;
break;
}
}
cell=_49d.splice(_49f,1)[0];
cell.view=this.grid.views.views[_499];
for(i=0,c=null;c=_49e[i];i++){
if(c.index==_49b){
_4a0=i;
break;
}
}
if(!_49c){
_4a0+=1;
}
_49e.splice(_4a0,0,cell);
var _4a1=this.grid.getCell(this.grid.getSortIndex());
if(_4a1){
_4a1._currentlySorted=this.grid.getSortAsc();
}
this.cells=[];
_49a=0;
var v;
for(i=0;v=this.structure[i];i++){
for(var j=0,cs;cs=v.cells[j];j++){
for(var k=0;c=cs[k];k++){
c.index=_49a;
this.cells.push(c);
if("_currentlySorted" in c){
var si=_49a+1;
si*=c._currentlySorted?1:-1;
this.grid.sortInfo=si;
delete c._currentlySorted;
}
_49a++;
}
}
}
_495.forEach(this.cells,function(c){
var _4a2=c.markup[2].split(" ");
var _4a3=parseInt(_4a2[1].substring(5));
if(_4a3!=c.index){
_4a2[1]="idx=\""+c.index+"\"";
c.markup[2]=_4a2.join(" ");
}
});
this.grid.setupHeaderMenu();
},setColumnVisibility:function(_4a4,_4a5){
var cell=this.cells[_4a4];
if(cell.hidden==_4a5){
cell.hidden=!_4a5;
var v=cell.view,w=v.viewWidth;
if(w&&w!="auto"){
v._togglingColumn=_496.getMarginBox(cell.getHeaderNode()).w||0;
}
v.update();
return true;
}else{
return false;
}
},addCellDef:function(_4a6,_4a7,_4a8){
var self=this;
var _4a9=function(_4aa){
var w=0;
if(_4aa.colSpan>1){
w=0;
}else{
w=_4aa.width||self._defaultCellProps.width||self.defaultWidth;
if(!isNaN(w)){
w=w+"em";
}
}
return w;
};
var _4ab={grid:this.grid,subrow:_4a6,layoutIndex:_4a7,index:this.cells.length};
if(_4a8&&_4a8 instanceof _493.grid.cells._Base){
var _4ac=lang.clone(_4a8);
_4ab.unitWidth=_4a9(_4ac._props);
_4ac=lang.mixin(_4ac,this._defaultCellProps,_4a8._props,_4ab);
return _4ac;
}
var _4ad=_4a8.type||_4a8.cellType||this._defaultCellProps.type||this._defaultCellProps.cellType||_493.grid.cells.Cell;
if(lang.isString(_4ad)){
_4ad=lang.getObject(_4ad);
}
_4ab.unitWidth=_4a9(_4a8);
return new _4ad(lang.mixin({},this._defaultCellProps,_4a8,_4ab));
},addRowDef:function(_4ae,_4af){
var _4b0=[];
var _4b1=0,_4b2=0,_4b3=true;
for(var i=0,def,cell;(def=_4af[i]);i++){
cell=this.addCellDef(_4ae,i,def);
_4b0.push(cell);
this.cells.push(cell);
if(_4b3&&cell.relWidth){
_4b1+=cell.relWidth;
}else{
if(cell.width){
var w=cell.width;
if(typeof w=="string"&&w.slice(-1)=="%"){
_4b2+=window.parseInt(w,10);
}else{
if(w=="auto"){
_4b3=false;
}
}
}
}
}
if(_4b1&&_4b3){
_495.forEach(_4b0,function(cell){
if(cell.relWidth){
cell.width=cell.unitWidth=((cell.relWidth/_4b1)*(100-_4b2))+"%";
}
});
}
return _4b0;
},addRowsDef:function(_4b4){
var _4b5=[];
if(lang.isArray(_4b4)){
if(lang.isArray(_4b4[0])){
for(var i=0,row;_4b4&&(row=_4b4[i]);i++){
_4b5.push(this.addRowDef(i,row));
}
}else{
_4b5.push(this.addRowDef(0,_4b4));
}
}
return _4b5;
},addViewDef:function(_4b6){
this._defaultCellProps=_4b6.defaultCell||{};
if(_4b6.width&&_4b6.width=="auto"){
delete _4b6.width;
}
return lang.mixin({},_4b6,{cells:this.addRowsDef(_4b6.rows||_4b6.cells)});
},setStructure:function(_4b7){
this.fieldIndex=0;
this.cells=[];
var s=this.structure=[];
if(this.grid.rowSelector){
var sel={type:_493._scopeName+".grid._RowSelector"};
if(lang.isString(this.grid.rowSelector)){
var _4b8=this.grid.rowSelector;
if(_4b8=="false"){
sel=null;
}else{
if(_4b8!="true"){
sel["width"]=_4b8;
}
}
}else{
if(!this.grid.rowSelector){
sel=null;
}
}
if(sel){
s.push(this.addViewDef(sel));
}
}
var _4b9=function(def){
return ("name" in def||"field" in def||"get" in def);
};
var _4ba=function(def){
if(lang.isArray(def)){
if(lang.isArray(def[0])||_4b9(def[0])){
return true;
}
}
return false;
};
var _4bb=function(def){
return (def!==null&&lang.isObject(def)&&("cells" in def||"rows" in def||("type" in def&&!_4b9(def))));
};
if(lang.isArray(_4b7)){
var _4bc=false;
for(var i=0,st;(st=_4b7[i]);i++){
if(_4bb(st)){
_4bc=true;
break;
}
}
if(!_4bc){
s.push(this.addViewDef({cells:_4b7}));
}else{
for(i=0;(st=_4b7[i]);i++){
if(_4ba(st)){
s.push(this.addViewDef({cells:st}));
}else{
if(_4bb(st)){
s.push(this.addViewDef(st));
}
}
}
}
}else{
if(_4bb(_4b7)){
s.push(this.addViewDef(_4b7));
}
}
this.cellCount=this.cells.length;
this.grid.setupHeaderMenu();
}});
});
},"dojo/data/util/filter":function(){
define(["../../_base/lang"],function(lang){
var _4bd={};
lang.setObject("dojo.data.util.filter",_4bd);
_4bd.patternToRegExp=function(_4be,_4bf){
var rxp="^";
var c=null;
for(var i=0;i<_4be.length;i++){
c=_4be.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_4be.charAt(i);
break;
case "*":
rxp+=".*";
break;
case "?":
rxp+=".";
break;
case "$":
case "^":
case "/":
case "+":
case ".":
case "|":
case "(":
case ")":
case "{":
case "}":
case "[":
case "]":
rxp+="\\";
default:
rxp+=c;
}
}
rxp+="$";
if(_4bf){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
return _4bd;
});
},"dojo/dnd/common":function(){
define(["../_base/connect","../_base/kernel","../_base/lang","../dom"],function(_4c0,_4c1,lang,dom){
var _4c2={};
_4c2.getCopyKeyState=_4c0.isCopyKey;
_4c2._uniqueId=0;
_4c2.getUniqueId=function(){
var id;
do{
id=_4c1._scopeName+"Unique"+(++_4c2._uniqueId);
}while(dom.byId(id));
return id;
};
_4c2._empty={};
_4c2.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
lang.mixin(lang.getObject("dojo.dnd",true),_4c2);
return _4c2;
});
},"dijit/tree/ForestStoreModel":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","./TreeStoreModel"],function(_4c3,_4c4,_4c5,lang,_4c6){
return _4c4("dijit.tree.ForestStoreModel",_4c6,{rootId:"$root$",rootLabel:"ROOT",query:null,constructor:function(_4c7){
this.root={store:this,root:true,id:_4c7.rootId,label:_4c7.rootLabel,children:_4c7.rootChildren};
},mayHaveChildren:function(item){
return item===this.root||this.inherited(arguments);
},getChildren:function(_4c8,_4c9,_4ca){
if(_4c8===this.root){
if(this.root.children){
_4c9(this.root.children);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_4cb){
this.root.children=_4cb;
_4c9(_4cb);
}),onError:_4ca});
}
}else{
this.inherited(arguments);
}
},isItem:function(_4cc){
return (_4cc===this.root)?true:this.inherited(arguments);
},fetchItemByIdentity:function(_4cd){
if(_4cd.identity==this.root.id){
var _4ce=_4cd.scope||_4c5.global;
if(_4cd.onItem){
_4cd.onItem.call(_4ce,this.root);
}
}else{
this.inherited(arguments);
}
},getIdentity:function(item){
return (item===this.root)?this.root.id:this.inherited(arguments);
},getLabel:function(item){
return (item===this.root)?this.root.label:this.inherited(arguments);
},newItem:function(args,_4cf,_4d0){
if(_4cf===this.root){
this.onNewRootItem(args);
return this.store.newItem(args);
}else{
return this.inherited(arguments);
}
},onNewRootItem:function(){
},pasteItem:function(_4d1,_4d2,_4d3,_4d4,_4d5){
if(_4d2===this.root){
if(!_4d4){
this.onLeaveRoot(_4d1);
}
}
this.inherited(arguments,[_4d1,_4d2===this.root?null:_4d2,_4d3===this.root?null:_4d3,_4d4,_4d5]);
if(_4d3===this.root){
this.onAddToRoot(_4d1);
}
},onAddToRoot:function(item){
},onLeaveRoot:function(item){
},_requeryTop:function(){
var _4d6=this.root.children||[];
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_4d7){
this.root.children=_4d7;
if(_4d6.length!=_4d7.length||_4c3.some(_4d6,function(item,idx){
return _4d7[idx]!=item;
})){
this.onChildrenChange(this.root,_4d7);
}
})});
},onNewItem:function(item,_4d8){
this._requeryTop();
this.inherited(arguments);
},onDeleteItem:function(item){
if(_4c3.indexOf(this.root.children,item)!=-1){
this._requeryTop();
}
this.inherited(arguments);
},onSetItem:function(item,_4d9,_4da,_4db){
this._requeryTop();
this.inherited(arguments);
}});
});
},"davinci/html/CSSFile":function(){
define(["dojo/_base/declare","davinci/html/CSSElement","davinci/html/CSSRule","davinci/html/CSSSelector"],function(_4dc,_4dd,_4de,_4df){
return _4dc("davinci.html.CSSFile",_4dd,{constructor:function(args){
this.elementType="CSSFile";
dojo.mixin(this,args);
if(!this.options){
this.options={xmode:"style",css:true,expandShorthand:false};
}
var txt=null;
if(this.url&&this.loader){
txt=this.loader(this.url);
}else{
if(this.url){
var file=this.getResource();
if(file){
txt=file.getText();
this.setDirty(file.isDirty());
}
}
}
if(txt){
this.setText(txt);
}
},save:function(_4e0){
var _4e1;
var file=this.getResource();
if(file){
var text=this.getText();
_4e1=file.setContents(text,_4e0);
}
return _4e1;
},close:function(){
this.visit({visit:function(node){
if(node.elementType=="CSSImport"){
node.close();
}
}});
require(["dojo/_base/connect"],function(_4e2){
_4e2.publish("davinci/model/closeModel",[this]);
});
},getResource:function(_4e3){
return system.resource.findResource(this.url);
},addRule:function(_4e4){
var rule=new _4de();
rule.setText(_4e4);
this.addChild(rule);
this.setDirty(true);
return rule;
},setText:function(text){
var _4e5=this.children;
this.children=[];
var _4e6=require("davinci/html/CSSParser").parse(text,this);
if(_4e6.errors.length>0){
}
this.errors=_4e6.errors;
if(this.errors.length>0&&this.errors[this.errors.length-1].isException){
this.children=_4e5;
}
if(this.includeImports){
for(var i=0;i<this.children.length;i++){
if(this.children[i].elementType=="CSSImport"){
this.children[i].load();
}
}
}
this.onChange();
},getText:function(_4e7){
_4e7=_4e7||{};
_4e7.indent=0;
var s="";
for(var i=0;i<this.children.length;i++){
s=s+this.children[i].getText(_4e7);
}
return s;
},getCSSFile:function(){
return this;
},getID:function(){
return this.fileName;
},getMatchingRules:function(_4e8,_4e9,_4ea){
_4e8=this._convertNode(_4e8);
_4e9=_4e9||[];
_4ea=_4ea||[];
for(var i=0;i<this.children.length;i++){
var _4eb=this.children[i];
if(_4eb.elementType=="CSSRule"){
var _4ec=_4eb.matches(_4e8);
if(_4ec){
for(var j=0;j<_4ea.length;j++){
if(_4ec>=_4ea[j]){
_4e9.splice(j,0,_4eb);
_4ea.splice(j,0,_4ec);
break;
}
}
if(_4e9.length==0){
_4e9.push(_4eb);
_4ea.push(_4ec);
}
}
}else{
if(_4eb.elementType=="CSSImport"&&_4eb.cssFile){
_4eb.cssFile.getMatchingRules(_4e8,_4e9,_4ea);
}
}
}
return _4e9;
},getRule:function(_4ed){
var _4ee;
if(!_4ed){
return [];
}
var _4ef=_4df.parseSelectors(_4ed);
for(var i=0;i<this.children.length;i++){
var _4f0=this.children[i];
if(_4f0.elementType=="CSSRule"){
if(_4f0.matchesSelectors(_4ef)){
_4ee=_4f0;
break;
}
}else{
if(_4f0.elementType=="CSSImport"&&_4f0.cssFile){
_4ee=_4f0.cssFile.getRule(_4ef)||_4ee;
}
}
}
return _4ee;
},getRules:function(_4f1){
var _4f2=_4df.parseSelectors(_4f1);
var _4f3=new Array();
for(var i=0;i<this.children.length;i++){
var _4f4=this.children[i];
if(_4f4.elementType=="CSSRule"){
if(_4f4.matchesSelectors(_4f2)){
_4f3.push(_4f4);
}
}else{
if(_4f4.elementType=="CSSImport"&&_4f4.cssFile){
_4f3=_4f3.concat(_4f4.cssFile.getRules(_4f2));
}
}
}
return _4f3;
},getStyleValue:function(_4f5,_4f6){
var _4f7=[];
var _4f8=[];
_4f6=this._convertNode(_4f6);
this.getMatchingRules(_4f6,_4f7,_4f8);
function _4f9(_4fa){
var _4fb=0;
var _4fc,prop;
for(var i=0;i<_4f7.length;i++){
if((prop=_4f7[i].getProperty(_4fa))){
if(_4f8[i]>_4fb){
_4fc=prop;
_4fb=_4f8[i];
}
}
}
return _4fc;
};
if(dojo.isString(_4f5)){
return _4f9(_4f5);
}
var _4fd=[];
for(var i=0;i<_4f5.length;i++){
_4fd.push(_4f9(_4f5[i]));
}
return _4fd;
}});
});
},"dijit/Menu":function(){
define(["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_4fe,_4ff,_500,_501,dom,_502,_503,_504,keys,lang,on,has,win,_505,pm,_506,_507){
if(has("dijit-legacy-requires")){
_507(0,function(){
var _508=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_4fe(_508);
});
}
return _500("dijit.Menu",_506,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],selector:"",contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(this.ownerDocumentBody);
}else{
_4ff.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_509){
return _505.get(this._iframeContentDocument(_509))||this._iframeContentDocument(_509)["__parent__"]||(_509.name&&win.doc.frames[_509.name])||null;
},_iframeContentDocument:function(_50a){
return _50a.contentDocument||(_50a.contentWindow&&_50a.contentWindow.document)||(_50a.name&&win.doc.frames[_50a.name]&&win.doc.frames[_50a.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node,this.ownerDocument);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _50b=node,_50c=this._iframeContentWindow(_50b);
cn=win.body(_50c.document);
}else{
cn=(node==win.body(this.ownerDocument)?this.ownerDocument.documentElement:node);
}
var _50d={node:node,iframe:_50b};
_502.set(node,"_dijitMenu"+this.id,this._bindings.push(_50d));
var _50e=lang.hitch(this,function(cn){
var _50f=this.selector,_510=_50f?function(_511){
return on.selector(_50f,_511);
}:function(_512){
return _512;
},self=this;
return [on(cn,_510(this.leftClickToOpen?"click":"contextmenu"),function(evt){
_501.stop(evt);
self._scheduleOpen(this,_50b,{x:evt.pageX,y:evt.pageY});
}),on(cn,_510("keydown"),function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_501.stop(evt);
self._scheduleOpen(this,_50b);
}
})];
});
_50d.connects=cn?_50e(cn):[];
if(_50b){
_50d.onloadHandler=lang.hitch(this,function(){
var _513=this._iframeContentWindow(_50b);
cn=win.body(_513.document);
_50d.connects=_50e(cn);
});
if(_50b.addEventListener){
_50b.addEventListener("load",_50d.onloadHandler,false);
}else{
_50b.attachEvent("onload",_50d.onloadHandler);
}
}
},unBindDomNode:function(_514){
var node;
try{
node=dom.byId(_514,this.ownerDocument);
}
catch(e){
return;
}
var _515="_dijitMenu"+this.id;
if(node&&_502.has(node,_515)){
var bid=_502.get(node,_515)-1,b=this._bindings[bid],h;
while((h=b.connects.pop())){
h.remove();
}
var _516=b.iframe;
if(_516){
if(_516.removeEventListener){
_516.removeEventListener("load",b.onloadHandler,false);
}else{
_516.detachEvent("onload",b.onloadHandler);
}
}
_502.remove(node,_515);
delete this._bindings[bid];
}
},_scheduleOpen:function(_517,_518,_519){
if(!this._openTimer){
this._openTimer=this.defer(function(){
delete this._openTimer;
this._openMyself({target:_517,iframe:_518,coords:_519});
},1);
}
},_openMyself:function(args){
var _51a=args.target,_51b=args.iframe,_51c=args.coords;
this.currentTarget=_51a;
if(_51c){
if(_51b){
var ifc=_503.position(_51b,true),_51d=this._iframeContentWindow(_51b),_51e=_503.docScroll(_51d.document);
var cs=_504.getComputedStyle(_51b),tp=_504.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_51b,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_51b,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_51b,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_51b,cs.borderTopWidth):0);
_51c.x+=ifc.x+left-_51e.x;
_51c.y+=ifc.y+top-_51e.y;
}
}else{
_51c=_503.position(_51a,true);
_51c.x+=10;
_51c.y+=10;
}
var self=this;
var _51f=this._focusManager.get("prevNode");
var _520=this._focusManager.get("curNode");
var _521=!_520||(dom.isDescendant(_520,this.domNode))?_51f:_520;
function _522(){
if(self.refocus&&_521){
_521.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_51c.x,y:_51c.y,onExecute:_522,onCancel:_522,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},destroy:function(){
_4ff.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n","dijit/form/MappedTextBox":function(){
define(["dojo/_base/declare","dojo/dom-construct","./ValidationTextBox"],function(_523,_524,_525){
return _523("dijit.form.MappedTextBox",_525,{postMixInProperties:function(){
this.inherited(arguments);
this.nameAttrSetting="";
},_setNameAttr:null,serialize:function(val){
return val.toString?val.toString():"";
},toString:function(){
var val=this.filter(this.get("value"));
return val!=null?(typeof val=="string"?val:this.serialize(val,this.constraints)):"";
},validate:function(){
this.valueNode.value=this.toString();
return this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.valueNode=_524.place("<input type='hidden'"+(this.name?" name=\""+this.name.replace(/"/g,"&quot;")+"\"":"")+"/>",this.textbox,"after");
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
});
},"dojox/grid/util":function(){
define("dojox/grid/util",["../main","dojo/_base/lang","dojo/dom"],function(_526,lang,dom){
var dgu=lang.getObject("grid.util",true,_526);
dgu.na="...";
dgu.rowIndexTag="gridRowIndex";
dgu.gridViewTag="gridView";
dgu.fire=function(ob,ev,args){
var fn=ob&&ev&&ob[ev];
return fn&&(args?fn.apply(ob,args):ob[ev]());
};
dgu.setStyleHeightPx=function(_527,_528){
if(_528>=0){
var s=_527.style;
var v=_528+"px";
if(_527&&s["height"]!=v){
s["height"]=v;
}
}
};
dgu.mouseEvents=["mouseover","mouseout","mousedown","mouseup","click","dblclick","contextmenu"];
dgu.keyEvents=["keyup","keydown","keypress"];
dgu.funnelEvents=function(_529,_52a,_52b,_52c){
var evts=(_52c?_52c:dgu.mouseEvents.concat(dgu.keyEvents));
for(var i=0,l=evts.length;i<l;i++){
_52a.connect(_529,"on"+evts[i],_52b);
}
};
dgu.removeNode=function(_52d){
_52d=dom.byId(_52d);
_52d&&_52d.parentNode&&_52d.parentNode.removeChild(_52d);
return _52d;
};
dgu.arrayCompare=function(inA,inB){
for(var i=0,l=inA.length;i<l;i++){
if(inA[i]!=inB[i]){
return false;
}
}
return (inA.length==inB.length);
};
dgu.arrayInsert=function(_52e,_52f,_530){
if(_52e.length<=_52f){
_52e[_52f]=_530;
}else{
_52e.splice(_52f,0,_530);
}
};
dgu.arrayRemove=function(_531,_532){
_531.splice(_532,1);
};
dgu.arraySwap=function(_533,inI,inJ){
var _534=_533[inI];
_533[inI]=_533[inJ];
_533[inJ]=_534;
};
return dgu;
});
},"davinci/ui/ThemeSetsDialog":function(){
define(["dojo/_base/declare","davinci/ui/Dialog","dijit/_Widget","dijit/_Templated","davinci/workbench/Preferences","davinci/Workbench","davinci/library","dojo/text!./templates/ThemeSetsDialog.html","dojo/text!./templates/ThemeSetsRenameDialog.html","dojo/i18n!davinci/ui/nls/ui","dojo/i18n!dijit/nls/common","davinci/Theme","dijit/form/ValidationTextBox","dijit/form/Button","dijit/Toolbar"],function(_535,_536,_537,_538,_539,_53a,_53b,_53c,_53d,_53e,_53f,_540){
_535("davinci.ui.ThemeSetsDialogWidget",[_537,_538],{templateString:_53c,widgetsInTemplate:true,uiNLS:_53e,commonNLS:_53f});
_535("davinci.ui.ThemeSetsDialogRenameWidget",[_537,_538],{templateString:_53d,widgetsInTemplate:true,uiNLS:_53e,commonNLS:_53f});
return dojo.declare("davinci.ui.ThemeSetsDialog",null,{constructor:function(){
this._connections=[];
this._dialog=new _536({id:"manageThemeSets",title:_53e.themeSetsDialog,contentStyle:{width:580}});
dojo.connect(this._dialog,"onCancel",this,"onClose");
this._dojoThemeSets=_539.getPreferences("maqetta.dojo.themesets",_53a.getProject());
if(!this._dojoThemeSets){
this._dojoThemeSets=_540.dojoThemeSets;
_539.savePreferences("maqetta.dojo.themesets",_53a.getProject(),this._dojoThemeSets);
}
if(!this._dojoThemeSets.themeSets[0]){
this._dojoThemeSets.themeSets.push(dojo.clone(_540.custom_themeset));
_539.savePreferences("maqetta.dojo.themesets",_53a.getProject(),this._dojoThemeSets);
}
this._dojoThemeSets=dojo.clone(this._dojoThemeSets);
this._dialog.attr("content",new davinci.ui.ThemeSetsDialogWidget({}));
this._connections.push(dojo.connect(dojo.byId("theme_select_themeset_theme_select"),"onchange",this,"onChange"));
this._connections.push(dojo.connect(dijit.byId("theme_select_themeset_add"),"onClick",this,"addThemeSet"));
this._connections.push(dojo.connect(dijit.byId("theme_select_themeset_delete"),"onClick",this,"deleteThemeSet"));
this._connections.push(dojo.connect(dijit.byId("theme_select_rename_button"),"onClick",this,"renameThemeSet"));
this._connections.push(dojo.connect(dijit.byId("theme_select_desktop_theme_select"),"onChange",this,"onDesktopChange"));
this._connections.push(dojo.connect(dijit.byId("theme_select_mobile_theme_select"),"onChange",this,"onMobileChange"));
this._connections.push(dojo.connect(dijit.byId("theme_select_ok_button"),"_onSubmit",this,"onOk"));
this._connections.push(dojo.connect(dijit.byId("theme_select_cancel_button"),"onClick",this,"onClose"));
this._connections.push(dojo.connect(dijit.byId("theme_select_android_select"),"onChange",this,"onAndroidThemeChange"));
this._connections.push(dojo.connect(dijit.byId("theme_select_blackberry_select"),"onChange",this,"onBlackberryThemeChange"));
this._connections.push(dojo.connect(dijit.byId("theme_select_ipad_select"),"onChange",this,"oniPadThemeChange"));
this._connections.push(dojo.connect(dijit.byId("theme_select_iphone_select"),"onChange",this,"oniPhoneThemeChange"));
this._connections.push(dojo.connect(dijit.byId("theme_select_other_select"),"onChange",this,"onOtherThemeChange"));
this.addThemeSets();
this._selectedThemeSet=this._dojoThemeSets.themeSets[0];
dijit.byId("theme_select_themeset_theme_select_textbox").attr("value",this._selectedThemeSet.name);
this.addThemes(this._selectedThemeSet);
this._dialog.show();
},addThemeSets:function(){
var _541=dojo.byId("theme_select_themeset_theme_select");
for(var i=0;i<this._dojoThemeSets.themeSets.length;i++){
var c=dojo.doc.createElement("option");
c.innerHTML=this._dojoThemeSets.themeSets[i].name;
c.value=this._dojoThemeSets.themeSets[i].name;
if(i===0){
c.selected="1";
}
_541.appendChild(c);
}
},addThemes:function(_542){
this._themeData=_53b.getThemes(_53a.getProject(),this.workspaceOnly);
var _543=dijit.byId("theme_select_desktop_theme_select");
_543.options=[];
var _544=dijit.byId("theme_select_android_select");
_544.options=[];
var _545=dijit.byId("theme_select_blackberry_select");
_545.options=[];
var _546=dijit.byId("theme_select_ipad_select");
_546.options=[];
var _547=dijit.byId("theme_select_iphone_select");
_547.options=[];
var _548=dijit.byId("theme_select_other_select");
_548.options=[];
var _549=dijit.byId("theme_select_mobile_theme_select");
_543.options=[];
_549.options=[];
_549.addOption({value:_540.default_theme,label:_540.default_theme});
this._themeCount=this._themeData.length;
for(var i=0;i<this._themeData.length;i++){
var opt={value:this._themeData[i].name,label:this._themeData[i].name};
if(this._themeData[i].type==="dojox.mobile"){
_549.addOption(opt);
_544.addOption(opt);
_545.addOption(opt);
_546.addOption(opt);
_547.addOption(opt);
_548.addOption(opt);
}else{
_543.addOption(opt);
}
}
_543.attr("value",_542.desktopTheme);
for(var d=0;d<_542.mobileTheme.length;d++){
var _54a=_542.mobileTheme[d].device.toLowerCase();
switch(_54a){
case "android":
_544.attr("value",_542.mobileTheme[d].theme);
break;
case "blackberry":
_545.attr("value",_542.mobileTheme[d].theme);
break;
case "ipad":
_546.attr("value",_542.mobileTheme[d].theme);
break;
case "iphone":
_547.attr("value",_542.mobileTheme[d].theme);
break;
case "other":
_548.attr("value",_542.mobileTheme[d].theme);
break;
}
}
if(_540.singleMobileTheme(_542)){
_549.attr("value",_542.mobileTheme[_542.mobileTheme.length-1].theme);
}else{
_549.attr("value",_540.default_theme);
this.onMobileChange(_540.default_theme);
}
},addThemeSet:function(e){
var _54b;
if(this._selectedThemeSet){
_54b=dojo.clone(this._selectedThemeSet);
}else{
_54b=dojo.clone(_540.default_themeset);
}
var _54c=_54b.name;
var _54d=0;
for(var n=0;n<this._dojoThemeSets.themeSets.length;n++){
if(this._dojoThemeSets.themeSets[n].name==_54c){
_54d++;
_54c=_54b.name+"_"+_54d;
n=-1;
}
}
_54b.name=_54c;
this._dojoThemeSets.themeSets.push(_54b);
var _54e=dojo.byId("theme_select_themeset_theme_select");
var c=dojo.doc.createElement("option");
c.innerHTML=_54b.name;
c.value=_54b.name;
_54e.appendChild(c);
},deleteThemeSet:function(e){
var _54f=dojo.byId("theme_select_themeset_theme_select");
var node=_54f[_54f.selectedIndex];
if(!node){
return;
}
for(var n=0;n<this._dojoThemeSets.themeSets.length;n++){
if(this._dojoThemeSets.themeSets[n].name==node.value){
this._dojoThemeSets.themeSets.splice(n,1);
break;
}
}
this._selectedThemeSet=null;
_54f.removeChild(node);
dijit.byId("theme_select_themeset_theme_select_textbox").attr("value","");
var _550=dijit.byId("theme_select_rename_button");
var _551=dijit.byId("theme_select_desktop_theme_select");
var _552=dijit.byId("theme_select_mobile_theme_select");
var _553=dijit.byId("theme_select_android_select");
var _554=dijit.byId("theme_select_blackberry_select");
var _555=dijit.byId("theme_select_ipad_select");
var _556=dijit.byId("theme_select_iphone_select");
var _557=dijit.byId("theme_select_other_select");
_550.set("disabled",true);
_551.set("disabled",true);
_552.set("disabled",true);
_553.set("disabled",true);
_554.set("disabled",true);
_555.set("disabled",true);
_556.set("disabled",true);
_557.set("disabled",true);
},renameThemeSet:function(e){
var _558=_53e;
var loc=_53f;
var _559=dojo.byId("theme_select_themeset_theme_select");
this._renameDialog=new _536({id:"rename",title:_558.renameThemeSet,contentStyle:{width:300},content:new davinci.ui.ThemeSetsDialogRenameWidget({})});
this._renameDialog._themesetConnections=[];
this._renameDialog._themesetConnections.push(dojo.connect(dijit.byId("theme_set_rename_ok_button"),"onClick",this,"onOkRename"));
this._renameDialog._themesetConnections.push(dojo.connect(dijit.byId("theme_set_rename_cancel_button"),"onClick",this,"onCloseRename"));
this._renameDialog._themesetConnections.push(dojo.connect(this._renameDialog,"onCancel",this,"onCloseRename"));
this._renameDialog.show();
var _55a=dijit.byId("theme_select_themeset_rename_textbox");
_55a.attr("value",this._selectedThemeSet.name);
dijit.selectInputText(_55a);
},onOkRename:function(e){
var _55b=dijit.byId("theme_select_themeset_rename_textbox").attr("value");
if(_55b){
for(var n=0;n<this._dojoThemeSets.themeSets.length;n++){
if(this._dojoThemeSets.themeSets[n].name==_55b){
alert("Theme set name already use");
return;
}
}
var _55c=dojo.byId("theme_select_themeset_theme_select");
var node=_55c[_55c.selectedIndex];
var _55d=this._selectedThemeSet.name;
node.innerHTML=_55b;
node.value=_55b;
this._selectedThemeSet.name=_55b;
dijit.byId("theme_select_themeset_theme_select_textbox").attr("value",this._selectedThemeSet.name);
}
this.onCloseRename(e);
},onCloseRename:function(e){
while(connection=this._renameDialog._themesetConnections.pop()){
dojo.disconnect(connection);
}
this._renameDialog.destroyDescendants();
this._renameDialog.destroy();
delete this._renameDialog;
},onClick:function(e){
e.target.setAttribute("selected",false);
var _55e=dojo.byId("theme_select_themeset_theme_select");
_55e.setAttribute("value",this._selectedThemeSet.name);
},onChange:function(e){
var name=e.target[e.target.selectedIndex].value;
for(var i=0;i<this._dojoThemeSets.themeSets.length;i++){
if(this._dojoThemeSets.themeSets[i].name==name){
this._selectedThemeSet=this._dojoThemeSets.themeSets[i];
this.addThemes(this._dojoThemeSets.themeSets[i]);
dijit.byId("theme_select_themeset_theme_select_textbox").attr("value",this._selectedThemeSet.name);
var _55f=dijit.byId("theme_select_rename_button");
var _560=dijit.byId("theme_select_desktop_theme_select");
var _561=dijit.byId("theme_select_mobile_theme_select");
_55f.set("disabled",false);
_560.set("disabled",false);
_561.set("disabled",false);
break;
}
}
},onDesktopChange:function(e){
this._selectedThemeSet.desktopTheme=e;
},onMobileChange:function(e){
var _562=dijit.byId("theme_select_android_select");
var _563=dijit.byId("theme_select_blackberry_select");
var _564=dijit.byId("theme_select_ipad_select");
var _565=dijit.byId("theme_select_iphone_select");
var _566=dijit.byId("theme_select_other_select");
function _567(_568,_569,_56a){
switch(_568){
case "android":
_562.attr("value",_569);
_562.set("disabled",_56a);
break;
case "blackberry":
_563.attr("value",_569);
_563.set("disabled",_56a);
break;
case "ipad":
_564.attr("value",_569);
_564.set("disabled",_56a);
break;
case "iphone":
_565.attr("value",_569);
_565.set("disabled",_56a);
break;
case "other":
_566.attr("value",_569);
_566.set("disabled",_56a);
break;
}
};
if((e==="(device-specific)")){
for(var d=0;d<this._selectedThemeSet.mobileTheme.length;d++){
var _56b=this._selectedThemeSet.mobileTheme[d].device.toLowerCase();
_567(_56b,this._selectedThemeSet.mobileTheme[d].theme,false);
}
}else{
for(var d=0;d<this._selectedThemeSet.mobileTheme.length;d++){
var _56b=this._selectedThemeSet.mobileTheme[d].device.toLowerCase();
this._selectedThemeSet.mobileTheme[d].theme=e;
_567(_56b,this._selectedThemeSet.mobileTheme[d].theme,true);
}
}
},onDeviceThemeChange:function(_56c,e){
for(var d=0;d<this._selectedThemeSet.mobileTheme.length;d++){
if(this._selectedThemeSet.mobileTheme[d].device.toLowerCase()===_56c.toLowerCase()){
this._selectedThemeSet.mobileTheme[d].theme=e;
break;
}
}
},onAndroidThemeChange:function(e){
this.onDeviceThemeChange("android",e);
},onBlackberryThemeChange:function(e){
this.onDeviceThemeChange("blackberry",e);
},oniPadThemeChange:function(e){
this.onDeviceThemeChange("ipad",e);
},oniPhoneThemeChange:function(e){
this.onDeviceThemeChange("iphone",e);
},onOtherThemeChange:function(e){
this.onDeviceThemeChange("other",e);
},onOk:function(e){
_539.savePreferences("maqetta.dojo.themesets",_53a.getProject(),this._dojoThemeSets);
this.onClose(e);
},onClose:function(e){
while(connection=this._connections.pop()){
dojo.disconnect(connection);
}
this._dialog.destroyDescendants();
this._dialog.destroy();
delete this._dialog;
},onDeleteThemeSet:function(e){
for(var i=0;i<this._dojoThemeSets.themeSets.length;i++){
if(this._dojoThemeSets.themeSets[i].name===this._currentThemeSet.name){
var _56d=this._dojoThemeSets.themeSets[i-1].name;
var cb=dijit.byId("theme_select");
cb.store.fetchItemByIdentity({identity:this._dojoThemeSets.themeSets[i].name,onItem:function(item){
cb.store.deleteItem(item);
cb.store.save();
}});
this._dojoThemeSets.themeSets.splice(i,1);
this._currentThemeSet=null;
cb.attr("value",_56d);
break;
}
}
}});
});
},"davinci/review/actions/_ReviewNavigatorCommon":function(){
define(["dojo/_base/declare","davinci/actions/Action"],function(_56e,_56f){
var _570=_56e("davinci.review.actions._ReviewNavigatorCommon",[_56f],{_getSelection:function(_571){
var _572=null;
if(_571.getSelection){
_572=_571.getSelection();
}else{
var _573=dijit.byId("davinci.review.reviewNavigator");
_572=_573.getSelection();
}
return _572;
},shouldShow:function(_574){
return true;
}});
return _570;
});
},"url:dijit/form/templates/Select.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"listbox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitInputField dijitButtonText\"  data-dojo-attach-point=\"containerNode,_popupStateNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitValidationContainer\"\n\t\t\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t/></div\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td\n\t\t><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer\"\n\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t${_buttonInputDisabled}\n\t\t/></td\n\t></tr></tbody\n></table>\n","dojox/grid/_RowManager":function(){
define("dojox/grid/_RowManager",["dojo/_base/declare","dojo/_base/lang","dojo/dom-class"],function(_575,lang,_576){
var _577=function(_578,_579){
if(_578.style.cssText==undefined){
_578.setAttribute("style",_579);
}else{
_578.style.cssText=_579;
}
};
return _575("dojox.grid._RowManager",null,{constructor:function(_57a){
this.grid=_57a;
},linesToEms:2,overRow:-2,prepareStylingRow:function(_57b,_57c){
return {index:_57b,node:_57c,odd:Boolean(_57b&1),selected:!!this.grid.selection.isSelected(_57b),over:this.isOver(_57b),customStyles:"",customClasses:"dojoxGridRow"};
},styleRowNode:function(_57d,_57e){
var row=this.prepareStylingRow(_57d,_57e);
this.grid.onStyleRow(row);
this.applyStyles(row);
},applyStyles:function(_57f){
var i=_57f;
i.node.className=i.customClasses;
var h=i.node.style.height;
_577(i.node,i.customStyles+";"+(i.node._style||""));
i.node.style.height=h;
},updateStyles:function(_580){
this.grid.updateRowStyles(_580);
},setOverRow:function(_581){
var last=this.overRow;
this.overRow=_581;
if((last!=this.overRow)&&(lang.isString(last)||last>=0)){
this.updateStyles(last);
}
this.updateStyles(this.overRow);
},isOver:function(_582){
return (this.overRow==_582&&!_576.contains(this.grid.domNode,"dojoxGridColumnResizing"));
}});
});
},"dojo/dnd/Moveable":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/lang","../dom","../dom-class","../Evented","../on","../topic","../touch","./common","./Mover","../_base/window"],function(_583,_584,_585,lang,dom,_586,_587,on,_588,_589,dnd,_58a,win){
var _58b=_584("dojo.dnd.Moveable",[_587],{handle:"",delay:0,skip:false,constructor:function(node,_58c){
this.node=dom.byId(node);
if(!_58c){
_58c={};
}
this.handle=_58c.handle?dom.byId(_58c.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_58c.delay>0?_58c.delay:0;
this.skip=_58c.skip;
this.mover=_58c.mover?_58c.mover:_58a;
this.events=[on(this.handle,_589.press,lang.hitch(this,"onMouseDown")),on(this.handle,"dragstart",lang.hitch(this,"onSelectStart")),on(this.handle,"selectstart",lang.hitch(this,"onSelectStart"))];
},markupFactory:function(_58d,node,Ctor){
return new Ctor(node,_58d);
},destroy:function(){
_583.forEach(this.events,function(_58e){
_58e.remove();
});
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(on(this.handle,_589.move,lang.hitch(this,"onMouseMove")),on(this.handle,_589.release,lang.hitch(this,"onMouseUp")));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
_585.stop(e);
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
_585.stop(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
this.events.pop().remove();
}
_585.stop(e);
},onSelectStart:function(e){
if(!this.skip||!dnd.isFormElement(e)){
_585.stop(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_58f){
_588.publish("/dnd/move/start",_58f);
_586.add(win.body(),"dojoMove");
_586.add(this.node,"dojoMoveItem");
},onMoveStop:function(_590){
_588.publish("/dnd/move/stop",_590);
_586.remove(win.body(),"dojoMove");
_586.remove(this.node,"dojoMoveItem");
},onFirstMove:function(){
},onMove:function(_591,_592){
this.onMoving(_591,_592);
var s=_591.node.style;
s.left=_592.l+"px";
s.top=_592.t+"px";
this.onMoved(_591,_592);
},onMoving:function(){
},onMoved:function(){
}});
return _58b;
});
},"dojo/store/util/QueryResults":function(){
define(["../../_base/array","../../_base/lang","../../_base/Deferred"],function(_593,lang,_594){
var _595=function(_596){
if(!_596){
return _596;
}
if(_596.then){
_596=lang.delegate(_596);
}
function _597(_598){
if(!_596[_598]){
_596[_598]=function(){
var args=arguments;
return _594.when(_596,function(_599){
Array.prototype.unshift.call(args,_599);
return _595(_593[_598].apply(_593,args));
});
};
}
};
_597("forEach");
_597("filter");
_597("map");
if(!_596.total){
_596.total=_594.when(_596,function(_59a){
return _59a.length;
});
}
return _596;
};
lang.setObject("dojo.store.util.QueryResults",_595);
return _595;
});
},"url:dijit/layout/templates/_ScrollingTabControllerButton.html":"<div data-dojo-attach-event=\"onclick:_onClick\" class=\"dijitTabInnerDiv dijitTabContent dijitButtonContents\"  data-dojo-attach-point=\"focusNode\">\n\t<img role=\"presentation\" alt=\"\" src=\"${_blankGif}\" class=\"dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n</div>","dijit/form/CheckBox":function(){
define(["require","dojo/_base/declare","dojo/dom-attr","dojo/has","dojo/query","dojo/ready","./ToggleButton","./_CheckBoxMixin","dojo/text!./templates/CheckBox.html","dojo/NodeList-dom"],function(_59b,_59c,_59d,has,_59e,_59f,_5a0,_5a1,_5a2){
if(has("dijit-legacy-requires")){
_59f(0,function(){
var _5a3=["dijit/form/RadioButton"];
_59b(_5a3);
});
}
return _59c("dijit.form.CheckBox",[_5a0,_5a1],{templateString:_5a2,baseClass:"dijitCheckBox",_setValueAttr:function(_5a4,_5a5){
if(typeof _5a4=="string"){
this.inherited(arguments);
_5a4=true;
}
if(this._created){
this.set("checked",_5a4,_5a5);
}
},_getValueAttr:function(){
return (this.checked?this.value:false);
},_setIconClassAttr:null,postMixInProperties:function(){
this.inherited(arguments);
this.checkedAttrSetting=this.checked?"checked":"";
},_fillContent:function(){
},_onFocus:function(){
if(this.id){
_59e("label[for='"+this.id+"']").addClass("dijitFocusedLabel");
}
this.inherited(arguments);
},_onBlur:function(){
if(this.id){
_59e("label[for='"+this.id+"']").removeClass("dijitFocusedLabel");
}
this.inherited(arguments);
}});
});
},"dijit/form/DropDownButton":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/query","../registry","../popup","./Button","../_Container","../_HasDropDown","dojo/text!./templates/DropDownButton.html"],function(_5a6,lang,_5a7,_5a8,_5a9,_5aa,_5ab,_5ac,_5ad){
return _5a6("dijit.form.DropDownButton",[_5aa,_5ab,_5ac],{baseClass:"dijitDropDownButton",templateString:_5ad,_fillContent:function(){
if(this.srcNodeRef){
var _5ae=_5a7("*",this.srcNodeRef);
this.inherited(arguments,[_5ae[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _5af=_5a7("[widgetId]",this.dropDownContainer)[0];
this.dropDown=_5a8.byNode(_5af);
delete this.dropDownContainer;
}
if(this.dropDown){
_5a9.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _5b0=this.dropDown;
return (!!_5b0&&(!_5b0.href||_5b0.isLoaded));
},loadDropDown:function(_5b1){
var _5b2=this.dropDown;
var _5b3=_5b2.on("load",lang.hitch(this,function(){
_5b3.remove();
_5b1();
}));
_5b2.refresh();
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
});
},"dojo/regexp":function(){
define(["./_base/kernel","./_base/lang"],function(dojo,lang){
var _5b4={};
lang.setObject("dojo.regexp",_5b4);
_5b4.escapeString=function(str,_5b5){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_5b5&&_5b5.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
_5b4.buildGroupRE=function(arr,re,_5b6){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return _5b4.group(b.join("|"),_5b6);
};
_5b4.group=function(_5b7,_5b8){
return "("+(_5b8?"?:":"")+_5b7+")";
};
return _5b4;
});
},"dojox/grid/_FocusManager":function(){
define("dojox/grid/_FocusManager",["dojo/_base/array","dojo/_base/lang","dojo/_base/declare","dojo/_base/connect","dojo/_base/event","dojo/_base/sniff","dojo/query","./util","dojo/_base/html"],function(_5b9,lang,_5ba,_5bb,_5bc,has,_5bd,util,html){
return _5ba("dojox.grid._FocusManager",null,{constructor:function(_5be){
this.grid=_5be;
this.cell=null;
this.rowIndex=-1;
this._connects=[];
this._headerConnects=[];
this.headerMenu=this.grid.headerMenu;
this._connects.push(_5bb.connect(this.grid.domNode,"onfocus",this,"doFocus"));
this._connects.push(_5bb.connect(this.grid.domNode,"onblur",this,"doBlur"));
this._connects.push(_5bb.connect(this.grid.domNode,"mousedown",this,"_mouseDown"));
this._connects.push(_5bb.connect(this.grid.domNode,"mouseup",this,"_mouseUp"));
this._connects.push(_5bb.connect(this.grid.domNode,"oncontextmenu",this,"doContextMenu"));
this._connects.push(_5bb.connect(this.grid.lastFocusNode,"onfocus",this,"doLastNodeFocus"));
this._connects.push(_5bb.connect(this.grid.lastFocusNode,"onblur",this,"doLastNodeBlur"));
this._connects.push(_5bb.connect(this.grid,"_onFetchComplete",this,"_delayedCellFocus"));
this._connects.push(_5bb.connect(this.grid,"postrender",this,"_delayedHeaderFocus"));
},destroy:function(){
_5b9.forEach(this._connects,_5bb.disconnect);
_5b9.forEach(this._headerConnects,_5bb.disconnect);
delete this.grid;
delete this.cell;
},_colHeadNode:null,_colHeadFocusIdx:null,_contextMenuBindNode:null,tabbingOut:false,focusClass:"dojoxGridCellFocus",focusView:null,initFocusView:function(){
this.focusView=this.grid.views.getFirstScrollingView()||this.focusView||this.grid.views.views[0];
this._initColumnHeaders();
},isFocusCell:function(_5bf,_5c0){
return (this.cell==_5bf)&&(this.rowIndex==_5c0);
},isLastFocusCell:function(){
if(this.cell){
return (this.rowIndex==this.grid.rowCount-1)&&(this.cell.index==this.grid.layout.cellCount-1);
}
return false;
},isFirstFocusCell:function(){
if(this.cell){
return (this.rowIndex===0)&&(this.cell.index===0);
}
return false;
},isNoFocusCell:function(){
return (this.rowIndex<0)||!this.cell;
},isNavHeader:function(){
return (!!this._colHeadNode);
},getHeaderIndex:function(){
if(this._colHeadNode){
return _5b9.indexOf(this._findHeaderCells(),this._colHeadNode);
}else{
return -1;
}
},_focusifyCellNode:function(_5c1){
var n=this.cell&&this.cell.getNode(this.rowIndex);
if(n){
html.toggleClass(n,this.focusClass,_5c1);
if(_5c1){
var sl=this.scrollIntoView();
try{
if(has("webkit")||!this.grid.edit.isEditing()){
util.fire(n,"focus");
if(sl){
this.cell.view.scrollboxNode.scrollLeft=sl;
}
}
}
catch(e){
}
}
}
},_delayedCellFocus:function(){
if(this.isNavHeader()||!this.grid.focused){
return;
}
var n=this.cell&&this.cell.getNode(this.rowIndex);
if(n){
try{
if(!this.grid.edit.isEditing()){
html.toggleClass(n,this.focusClass,true);
if(this._colHeadNode){
this.blurHeader();
}
util.fire(n,"focus");
}
}
catch(e){
}
}
},_delayedHeaderFocus:function(){
if(this.isNavHeader()){
this.focusHeader();
}
},_initColumnHeaders:function(){
_5b9.forEach(this._headerConnects,_5bb.disconnect);
this._headerConnects=[];
var _5c2=this._findHeaderCells();
for(var i=0;i<_5c2.length;i++){
this._headerConnects.push(_5bb.connect(_5c2[i],"onfocus",this,"doColHeaderFocus"));
this._headerConnects.push(_5bb.connect(_5c2[i],"onblur",this,"doColHeaderBlur"));
}
},_findHeaderCells:function(){
var _5c3=_5bd("th",this.grid.viewsHeaderNode);
var _5c4=[];
for(var i=0;i<_5c3.length;i++){
var _5c5=_5c3[i];
var _5c6=html.hasAttr(_5c5,"tabIndex");
var _5c7=html.attr(_5c5,"tabIndex");
if(_5c6&&_5c7<0){
_5c4.push(_5c5);
}
}
return _5c4;
},_setActiveColHeader:function(_5c8,_5c9,_5ca){
this.grid.domNode.setAttribute("aria-activedescendant",_5c8.id);
if(_5ca!=null&&_5ca>=0&&_5ca!=_5c9){
html.toggleClass(this._findHeaderCells()[_5ca],this.focusClass,false);
}
html.toggleClass(_5c8,this.focusClass,true);
this._colHeadNode=_5c8;
this._colHeadFocusIdx=_5c9;
this._scrollHeader(this._colHeadFocusIdx);
},scrollIntoView:function(){
var info=(this.cell?this._scrollInfo(this.cell):null);
if(!info||!info.s){
return null;
}
var rt=this.grid.scroller.findScrollTop(this.rowIndex);
if(info.n&&info.sr){
if(info.n.offsetLeft+info.n.offsetWidth>info.sr.l+info.sr.w){
info.s.scrollLeft=info.n.offsetLeft+info.n.offsetWidth-info.sr.w;
}else{
if(info.n.offsetLeft<info.sr.l){
info.s.scrollLeft=info.n.offsetLeft;
}
}
}
if(info.r&&info.sr){
if(rt+info.r.offsetHeight>info.sr.t+info.sr.h){
this.grid.setScrollTop(rt+info.r.offsetHeight-info.sr.h);
}else{
if(rt<info.sr.t){
this.grid.setScrollTop(rt);
}
}
}
return info.s.scrollLeft;
},_scrollInfo:function(cell,_5cb){
if(cell){
var cl=cell,sbn=cl.view.scrollboxNode,sbnr={w:sbn.clientWidth,l:sbn.scrollLeft,t:sbn.scrollTop,h:sbn.clientHeight},rn=cl.view.getRowNode(this.rowIndex);
return {c:cl,s:sbn,sr:sbnr,n:(_5cb?_5cb:cell.getNode(this.rowIndex)),r:rn};
}
return null;
},_scrollHeader:function(_5cc){
var info=null;
if(this._colHeadNode){
var cell=this.grid.getCell(_5cc);
if(!cell){
return;
}
info=this._scrollInfo(cell,cell.getNode(0));
}
if(info&&info.s&&info.sr&&info.n){
var _5cd=info.sr.l+info.sr.w;
if(info.n.offsetLeft+info.n.offsetWidth>_5cd){
info.s.scrollLeft=info.n.offsetLeft+info.n.offsetWidth-info.sr.w;
}else{
if(info.n.offsetLeft<info.sr.l){
info.s.scrollLeft=info.n.offsetLeft;
}else{
if(has("ie")<=7&&cell&&cell.view.headerNode){
cell.view.headerNode.scrollLeft=info.s.scrollLeft;
}
}
}
}
},_isHeaderHidden:function(){
var _5ce=this.focusView;
if(!_5ce){
for(var i=0,_5cf;(_5cf=this.grid.views.views[i]);i++){
if(_5cf.headerNode){
_5ce=_5cf;
break;
}
}
}
return (_5ce&&html.getComputedStyle(_5ce.headerNode).display=="none");
},colSizeAdjust:function(e,_5d0,_5d1){
var _5d2=this._findHeaderCells();
var view=this.focusView;
if(!view||!view.header.tableMap.map){
for(var i=0,_5d3;(_5d3=this.grid.views.views[i]);i++){
if(_5d3.header.tableMap.map){
view=_5d3;
break;
}
}
}
var _5d4=_5d2[_5d0];
if(!view||(_5d0==_5d2.length-1&&_5d0===0)){
return;
}
view.content.baseDecorateEvent(e);
e.cellNode=_5d4;
e.cellIndex=view.content.getCellNodeIndex(e.cellNode);
e.cell=(e.cellIndex>=0?this.grid.getCell(e.cellIndex):null);
if(view.header.canResize(e)){
var _5d5={l:_5d1};
var drag=view.header.colResizeSetup(e,false);
view.header.doResizeColumn(drag,null,_5d5);
view.update();
}
},styleRow:function(_5d6){
return;
},setFocusIndex:function(_5d7,_5d8){
this.setFocusCell(this.grid.getCell(_5d8),_5d7);
},setFocusCell:function(_5d9,_5da){
if(_5d9&&!this.isFocusCell(_5d9,_5da)){
this.tabbingOut=false;
if(this._colHeadNode){
this.blurHeader();
}
this._colHeadNode=this._colHeadFocusIdx=null;
this.focusGridView();
this._focusifyCellNode(false);
this.cell=_5d9;
this.rowIndex=_5da;
this._focusifyCellNode(true);
}
if(has("opera")){
setTimeout(lang.hitch(this.grid,"onCellFocus",this.cell,this.rowIndex),1);
}else{
this.grid.onCellFocus(this.cell,this.rowIndex);
}
},next:function(){
if(this.cell){
var row=this.rowIndex,col=this.cell.index+1,cc=this.grid.layout.cellCount-1,rc=this.grid.rowCount-1;
if(col>cc){
col=0;
row++;
}
if(row>rc){
col=cc;
row=rc;
}
if(this.grid.edit.isEditing()){
var _5db=this.grid.getCell(col);
if(!this.isLastFocusCell()&&(!_5db.editable||this.grid.canEdit&&!this.grid.canEdit(_5db,row))){
this.cell=_5db;
this.rowIndex=row;
this.next();
return;
}
}
this.setFocusIndex(row,col);
}
},previous:function(){
if(this.cell){
var row=(this.rowIndex||0),col=(this.cell.index||0)-1;
if(col<0){
col=this.grid.layout.cellCount-1;
row--;
}
if(row<0){
row=0;
col=0;
}
if(this.grid.edit.isEditing()){
var _5dc=this.grid.getCell(col);
if(!this.isFirstFocusCell()&&!_5dc.editable){
this.cell=_5dc;
this.rowIndex=row;
this.previous();
return;
}
}
this.setFocusIndex(row,col);
}
},move:function(_5dd,_5de){
var _5df=_5de<0?-1:1;
if(this.isNavHeader()){
var _5e0=this._findHeaderCells();
var _5e1=currentIdx=_5b9.indexOf(_5e0,this._colHeadNode);
currentIdx+=_5de;
while(currentIdx>=0&&currentIdx<_5e0.length&&_5e0[currentIdx].style.display=="none"){
currentIdx+=_5df;
}
if((currentIdx>=0)&&(currentIdx<_5e0.length)){
this._setActiveColHeader(_5e0[currentIdx],currentIdx,_5e1);
}
}else{
if(this.cell){
var sc=this.grid.scroller,r=this.rowIndex,rc=this.grid.rowCount-1,row=Math.min(rc,Math.max(0,r+_5dd));
if(_5dd){
if(_5dd>0){
if(row>sc.getLastPageRow(sc.page)){
this.grid.setScrollTop(this.grid.scrollTop+sc.findScrollTop(row)-sc.findScrollTop(r));
}
}else{
if(_5dd<0){
if(row<=sc.getPageRow(sc.page)){
this.grid.setScrollTop(this.grid.scrollTop-sc.findScrollTop(r)-sc.findScrollTop(row));
}
}
}
}
var cc=this.grid.layout.cellCount-1,i=this.cell.index,col=Math.min(cc,Math.max(0,i+_5de));
var cell=this.grid.getCell(col);
while(col>=0&&col<cc&&cell&&cell.hidden===true){
col+=_5df;
cell=this.grid.getCell(col);
}
if(!cell||cell.hidden===true){
col=i;
}
var n=cell.getNode(row);
if(!n&&_5dd){
if((row+_5dd)>=0&&(row+_5dd)<=rc){
this.move(_5dd>0?++_5dd:--_5dd,_5de);
}
return;
}else{
if((!n||html.style(n,"display")==="none")&&_5de){
if((col+_5de)>=0&&(col+_5de)<=cc){
this.move(_5dd,_5de>0?++_5de:--_5de);
}
return;
}
}
this.setFocusIndex(row,col);
if(_5dd){
this.grid.updateRow(r);
}
}
}
},previousKey:function(e){
if(this.grid.edit.isEditing()){
_5bc.stop(e);
this.previous();
}else{
if(!this.isNavHeader()&&!this._isHeaderHidden()){
this.grid.domNode.focus();
_5bc.stop(e);
}else{
this.tabOut(this.grid.domNode);
if(this._colHeadFocusIdx!=null){
html.toggleClass(this._findHeaderCells()[this._colHeadFocusIdx],this.focusClass,false);
this._colHeadFocusIdx=null;
}
this._focusifyCellNode(false);
}
}
},nextKey:function(e){
var _5e2=(this.grid.rowCount===0);
if(e.target===this.grid.domNode&&this._colHeadFocusIdx==null){
this.focusHeader();
_5bc.stop(e);
}else{
if(this.isNavHeader()){
this.blurHeader();
if(!this.findAndFocusGridCell()){
this.tabOut(this.grid.lastFocusNode);
}
this._colHeadNode=this._colHeadFocusIdx=null;
}else{
if(this.grid.edit.isEditing()){
_5bc.stop(e);
this.next();
}else{
this.tabOut(this.grid.lastFocusNode);
}
}
}
},tabOut:function(_5e3){
this.tabbingOut=true;
_5e3.focus();
},focusGridView:function(){
util.fire(this.focusView,"focus");
},focusGrid:function(_5e4){
this.focusGridView();
this._focusifyCellNode(true);
},findAndFocusGridCell:function(){
var _5e5=true;
var _5e6=(this.grid.rowCount===0);
if(this.isNoFocusCell()&&!_5e6){
var _5e7=0;
var cell=this.grid.getCell(_5e7);
if(cell.hidden){
_5e7=this.isNavHeader()?this._colHeadFocusIdx:0;
}
this.setFocusIndex(0,_5e7);
}else{
if(this.cell&&!_5e6){
if(this.focusView&&!this.focusView.rowNodes[this.rowIndex]){
this.grid.scrollToRow(this.rowIndex);
}
this.focusGrid();
}else{
_5e5=false;
}
}
this._colHeadNode=this._colHeadFocusIdx=null;
return _5e5;
},focusHeader:function(){
var _5e8=this._findHeaderCells();
var _5e9=this._colHeadFocusIdx;
if(this._isHeaderHidden()){
this.findAndFocusGridCell();
}else{
if(!this._colHeadFocusIdx){
if(this.isNoFocusCell()){
this._colHeadFocusIdx=0;
}else{
this._colHeadFocusIdx=this.cell.index;
}
}
}
this._colHeadNode=_5e8[this._colHeadFocusIdx];
while(this._colHeadNode&&this._colHeadFocusIdx>=0&&this._colHeadFocusIdx<_5e8.length&&this._colHeadNode.style.display=="none"){
this._colHeadFocusIdx++;
this._colHeadNode=_5e8[this._colHeadFocusIdx];
}
if(this._colHeadNode&&this._colHeadNode.style.display!="none"){
if(this.headerMenu&&this._contextMenuBindNode!=this.grid.domNode){
this.headerMenu.unBindDomNode(this.grid.viewsHeaderNode);
this.headerMenu.bindDomNode(this.grid.domNode);
this._contextMenuBindNode=this.grid.domNode;
}
this._setActiveColHeader(this._colHeadNode,this._colHeadFocusIdx,_5e9);
this._scrollHeader(this._colHeadFocusIdx);
this._focusifyCellNode(false);
}else{
this.findAndFocusGridCell();
}
},blurHeader:function(){
html.removeClass(this._colHeadNode,this.focusClass);
html.removeAttr(this.grid.domNode,"aria-activedescendant");
if(this.headerMenu&&this._contextMenuBindNode==this.grid.domNode){
var _5ea=this.grid.viewsHeaderNode;
this.headerMenu.unBindDomNode(this.grid.domNode);
this.headerMenu.bindDomNode(_5ea);
this._contextMenuBindNode=_5ea;
}
},doFocus:function(e){
if(e&&e.target!=e.currentTarget){
_5bc.stop(e);
return;
}
if(this._clickFocus){
return;
}
if(!this.tabbingOut){
this.focusHeader();
}
this.tabbingOut=false;
_5bc.stop(e);
},doBlur:function(e){
_5bc.stop(e);
},doContextMenu:function(e){
if(!this.headerMenu){
_5bc.stop(e);
}
},doLastNodeFocus:function(e){
if(this.tabbingOut){
this._focusifyCellNode(false);
}else{
if(this.grid.rowCount>0){
if(this.isNoFocusCell()){
this.setFocusIndex(0,0);
}
this._focusifyCellNode(true);
}else{
this.focusHeader();
}
}
this.tabbingOut=false;
_5bc.stop(e);
},doLastNodeBlur:function(e){
_5bc.stop(e);
},doColHeaderFocus:function(e){
this._setActiveColHeader(e.target,html.attr(e.target,"idx"),this._colHeadFocusIdx);
this._scrollHeader(this.getHeaderIndex());
_5bc.stop(e);
},doColHeaderBlur:function(e){
html.toggleClass(e.target,this.focusClass,false);
},_mouseDown:function(e){
this._clickFocus=dojo.some(this.grid.views.views,function(v){
return v.scrollboxNode===e.target;
});
},_mouseUp:function(e){
this._clickFocus=false;
}});
});
},"davinci/ve/utils/ImageUtils":function(){
define([],function(){
return {ImageUpdateFocus:function(_5eb,_5ec){
if(_5ec&&_5eb&&_5eb.domNode&&_5eb.domNode.tagName==="IMG"){
var conn=dojo.connect(_5eb.domNode,"onload",function(){
var _5ed=_5ec.getSelection();
for(var i=0;i<_5ed.length;i++){
if(_5ed[i]==_5eb){
_5ec.updateFocus(_5eb,i);
break;
}
}
dojo.disconnect(conn);
});
}
}};
});
},"davinci/review/model/resource/File":function(){
define(["dojo/_base/declare","davinci/model/resource/File","davinci/model/Path","dojo/Deferred"],function(_5ee,File,Path,_5ef){
return _5ee("davinci.review.model.resource.File",File,{constructor:function(name,_5f0){
this.elementType="ReviewFile";
this.name=name;
this.parent=_5f0;
this.extension="rev";
},getLabel:function(){
var path=new Path(this.name);
var _5f1=path.getSegments();
var _5f2=davinci.Runtime.getExtension("davinci.editor",function(_5f3){
return _5f3.id==="davinci.review.CommentReviewEditor";
});
var _5f4="."+_5f2.extensions;
return label=_5f1[_5f1.length-1]+_5f4;
},getContentSync:function(){
return "";
},getContent:function(){
return new _5ef().resolve("");
},removeWorkingCopy:function(){
return;
}});
});
},"davinci/html/CSSCombinedSelector":function(){
define(["dojo/_base/declare","davinci/html/CSSElement"],function(_5f5,_5f6){
return _5f5("davinci.html.CSSCombinedSelector",_5f6,{constructor:function(){
this.selectors=[];
this.combiners=[];
this.elementType="CSSCombinedSelector";
},matchesSelector:function(_5f7){
if(_5f7.elementType==this.elementType){
if(_5f7.selectors.length==this.selectors.length){
for(var i=0;i<this.selectors.length;i++){
if(this.combiners[i]!=_5f7.combiners[i]){
return false;
}
if(!this.selectors[i].matchesSelector(_5f7.selectors[i])){
return false;
}
}
return true;
}
}
},getText:function(_5f8){
var s="";
for(var i=0;i<this.selectors.length-1;i++){
s=s+this.selectors[i].getText(_5f8);
if(this.combiners[i]!=" "){
s+=" "+this.combiners[i]+" ";
}else{
s+=this.combiners[i];
}
}
s=s+this.selectors[this.selectors.length-1].getText(_5f8);
return s;
},matches:function(_5f9){
var _5fa=this.selectors.length-1;
var _5fb=0;
for(var i=0;i<_5f9.length;i++){
var _5fc;
if((_5fc=this.selectors[_5fa].matches(_5f9,i))>=0){
_5fb+=_5fc;
_5fa--;
if(_5fa<0){
return _5fb;
}
}
if(i==0&&_5fc<0){
return -1;
}
}
},visit:function(_5fd){
if(!_5fd.visit(this)){
for(var i=0;i<this.children.length;i++){
this.children[i].visit(_5fd);
}
for(var i=0;i<this.selectors.length;i++){
this.selectors[i].visit(_5fd);
}
}
if(_5fd.endVisit){
_5fd.endVisit(this);
}
},getCSSRule:function(){
return this.parent;
}});
});
},"dojo/dnd/Avatar":function(){
define(["../_base/declare","../_base/window","../dom","../dom-attr","../dom-class","../dom-construct","../hccss","../query"],function(_5fe,win,dom,_5ff,_600,_601,has,_602){
return _5fe("dojo.dnd.Avatar",null,{constructor:function(_603){
this.manager=_603;
this.construct();
},construct:function(){
var a=_601.create("table",{"class":"dojoDndAvatar",style:{position:"absolute",zIndex:"1999",margin:"0px"}}),_604=this.manager.source,node,b=_601.create("tbody",null,a),tr=_601.create("tr",null,b),td=_601.create("td",null,tr),k=Math.min(5,this.manager.nodes.length),i=0;
if(has("highcontrast")){
_601.create("span",{id:"a11yIcon",innerHTML:this.manager.copy?"+":"<"},td);
}
_601.create("span",{innerHTML:_604.generateText?this._generateText():""},td);
_5ff.set(tr,{"class":"dojoDndAvatarHeader",style:{opacity:0.9}});
for(;i<k;++i){
if(_604.creator){
node=_604._normalizedCreator(_604.getItem(this.manager.nodes[i].id).data,"avatar").node;
}else{
node=this.manager.nodes[i].cloneNode(true);
if(node.tagName.toLowerCase()=="tr"){
var _605=_601.create("table"),_606=_601.create("tbody",null,_605);
_606.appendChild(node);
node=_605;
}
}
node.id="";
tr=_601.create("tr",null,b);
td=_601.create("td",null,tr);
td.appendChild(node);
_5ff.set(tr,{"class":"dojoDndAvatarItem",style:{opacity:(9-i)/10}});
}
this.node=a;
},destroy:function(){
_601.destroy(this.node);
this.node=false;
},update:function(){
_600.toggle(this.node,"dojoDndAvatarCanDrop",this.manager.canDropFlag);
if(has("highcontrast")){
var icon=dom.byId("a11yIcon");
var text="+";
if(this.manager.canDropFlag&&!this.manager.copy){
text="< ";
}else{
if(!this.manager.canDropFlag&&!this.manager.copy){
text="o";
}else{
if(!this.manager.canDropFlag){
text="x";
}
}
}
icon.innerHTML=text;
}
_602(("tr.dojoDndAvatarHeader td span"+(has("highcontrast")?" span":"")),this.node).forEach(function(node){
node.innerHTML=this.manager.source.generateText?this._generateText():"";
},this);
},_generateText:function(){
return this.manager.nodes.length.toString();
}});
});
},"davinci/model/Path":function(){
define(["dojo/_base/declare"],function(_607){
if(typeof davinci.model==="undefined"){
davinci.model={};
}
if(typeof davinci.model.Path==="undefined"){
davinci.model.Path={};
}
var Path=_607("davinci.model.Path",null,{constructor:function(path,_608,_609){
path=path||".";
if(typeof path=="string"){
this.path=path;
this.getSegments();
}else{
this.segments=path;
this.hasLeading=_608;
this.hasTrailing=_609;
}
},endsWith:function(tail){
var _60a=dojo.clone(this.segments);
var _60b=(new Path(tail)).getSegments();
while(_60b.length>0&&_60a.length>0){
if(_60b.pop()!=_60a.pop()){
return false;
}
}
return true;
},getExtension:function(){
if(!this.extension){
this.extension=this.path.substr(this.path.lastIndexOf(".")+1);
}
return this.extension;
},segment:function(_60c){
var segs=this.getSegments();
if(segs.length<_60c){
return null;
}
return segs[_60c];
},getSegments:function(){
if(!this.segments){
var path=this.path;
this.segments=path.split("/");
if(path.charAt(0)=="/"){
this.hasLeading=true;
}
if(path.charAt(path.length-1)=="/"){
this.hasTrailing=true;
this.segments.pop();
}
this._canonicalize();
}
return this.segments;
},isAbsolute:function(){
return this.hasLeading;
},getParentPath:function(){
if(!this._parentPath){
var _60d=dojo.clone(this.segments);
_60d.pop();
this._parentPath=new Path(_60d,this.hasLeading);
}
return dojo.clone(this._parentPath);
},_clone:function(){
return new Path(dojo.clone(this.segments),this.hasLeading,this.hasTrailing);
},append:function(tail){
tail=tail||"";
if(typeof tail=="string"){
tail=new Path(tail);
}
if(tail.isAbsolute()){
return tail;
}
var _60e=this.segments;
var _60f=tail.getSegments();
var _610=_60e.concat(_60f);
var _611=new Path(_610,this.hasLeading,tail.hasTrailing);
if(_60f[0]==".."||_60f[0]=="."){
_611._canonicalize();
}
return _611;
},toString:function(){
var _612=[];
if(this.hasLeading){
_612.push("/");
}
for(var i=0;i<this.segments.length;i++){
if(i>0){
_612.push("/");
}
_612.push(this.segments[i]);
}
if(this.hasTrailing){
_612.push("/");
}
return _612.join("");
},removeRelative:function(){
var segs=this.getSegments();
if(segs.length>0&&segs[1]=="."){
return this.removeFirstSegments(1);
}
return this;
},relativeTo:function(base,_613){
if(typeof base=="string"){
base=new Path(base);
}
var _614=this.segments;
if(this.isAbsolute()){
return this;
}
var _615=base.getSegments();
var _616=this.matchingFirstSegments(base);
var _617=_615.length;
if(_613){
_617=_617-1;
}
var _618=_617-_616;
var _619=_618+_614.length-_616;
if(_619==0){
return davinci.model.Path.EMPTY;
}
var _61a=[];
for(var i=0;i<_618;i++){
_61a.push("..");
}
for(var i=_616;i<_614.length;i++){
_61a.push(_614[i]);
}
return new Path(_61a,false,this.hasTrailing);
},startsWith:function(_61b){
var _61c=this.matchingFirstSegments(_61b);
return _61b._length()==_61c;
},_length:function(_61d){
return this.segments.length;
},matchingFirstSegments:function(_61e){
var _61f=this.segments;
var _620=_61e.getSegments();
var max=Math.min(_61f.length,_620.length);
var _621=0;
for(var i=0;i<max;i++){
if(_61f[i]!=_620[i]){
return _621;
}
_621++;
}
return _621;
},removeFirstSegments:function(_622){
return new Path(this.segments.slice(_622,this.segments.length),this.hasLeading,this.hasTrailing);
},removeMatchingLastSegments:function(_623){
var _624=this.matchingFirstSegments(_623);
return this.removeLastSegments(_624);
},removeMatchingFirstSegments:function(_625){
var _626=this.matchingFirstSegments(_625);
return this._clone().removeFirstSegments(_626);
},removeLastSegments:function(_627){
if(!_627){
_627=1;
}
return new Path(this.segments.slice(0,this.segments.length-_627),this.hasLeading,this.hasTrailing);
},lastSegment:function(){
return this.segments[this.segments.length-1];
},firstSegment:function(_628){
return this.segments[_628||0];
},equals:function(_629){
if(this.segments.length!=_629.segments.length){
return false;
}
for(var i=0;i<this.segments.length;i++){
if(_629.segments[i]!=this.segments[i]){
return false;
}
}
return true;
},_canonicalize:function(){
var doIt;
var _62a=this.segments;
for(var i=0;i<_62a.length;i++){
if(_62a[i]=="."||_62a[i]==".."){
doIt=true;
break;
}
}
if(doIt){
var _62b=[];
for(var i=0;i<_62a.length;i++){
if(_62a[i]==".."){
if(_62b.length==0){
if(!this.hasLeading){
_62b.push(_62a[i]);
}
}else{
if(".."==_62b[_62b.length-1]){
_62b.push("..");
}else{
_62b.pop();
}
}
}else{
if(_62a[i]!="."||this.segments.length==1){
_62b.push(_62a[i]);
}
}
}
if(_62b.length==_62a.length){
return;
}
this.segments=_62b;
}
}});
davinci.model.Path.EMPTY=new Path("");
return Path;
});
},"dojox/grid/_Builder":function(){
define("dojox/grid/_Builder",["../main","dojo/_base/array","dojo/_base/lang","dojo/_base/window","dojo/_base/event","dojo/_base/sniff","dojo/_base/connect","dojo/dnd/Moveable","dojox/html/metrics","./util","dojo/_base/html"],function(_62c,_62d,lang,win,_62e,has,_62f,_630,_631,util,html){
var dg=_62c.grid;
var _632=function(td){
return td.cellIndex>=0?td.cellIndex:_62d.indexOf(td.parentNode.cells,td);
};
var _633=function(tr){
return tr.rowIndex>=0?tr.rowIndex:_62d.indexOf(tr.parentNode.childNodes,tr);
};
var _634=function(_635,_636){
return _635&&((_635.rows||0)[_636]||_635.childNodes[_636]);
};
var _637=function(node){
for(var n=node;n&&n.tagName!="TABLE";n=n.parentNode){
}
return n;
};
var _638=function(_639,_63a){
for(var n=_639;n&&_63a(n);n=n.parentNode){
}
return n;
};
var _63b=function(_63c){
var name=_63c.toUpperCase();
return function(node){
return node.tagName!=name;
};
};
var _63d=util.rowIndexTag;
var _63e=util.gridViewTag;
var _63f=dg._Builder=lang.extend(function(view){
if(view){
this.view=view;
this.grid=view.grid;
}
},{view:null,_table:"<table class=\"dojoxGridRowTable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\"",getTableArray:function(){
var html=[this._table];
if(this.view.viewWidth){
html.push([" style=\"width:",this.view.viewWidth,";\""].join(""));
}
html.push(">");
return html;
},generateCellMarkup:function(_640,_641,_642,_643){
var _644=[],html;
if(_643){
var _645=_640.index!=_640.grid.getSortIndex()?"":_640.grid.sortInfo>0?"aria-sort=\"ascending\"":"aria-sort=\"descending\"";
if(!_640.id){
_640.id=this.grid.id+"Hdr"+_640.index;
}
html=["<th tabIndex=\"-1\" aria-readonly=\"true\" role=\"columnheader\"",_645,"id=\"",_640.id,"\""];
}else{
var _646=this.grid.editable&&!_640.editable?"aria-readonly=\"true\"":"";
html=["<td tabIndex=\"-1\" role=\"gridcell\"",_646];
}
if(_640.colSpan){
html.push(" colspan=\"",_640.colSpan,"\"");
}
if(_640.rowSpan){
html.push(" rowspan=\"",_640.rowSpan,"\"");
}
html.push(" class=\"dojoxGridCell ");
if(_640.classes){
html.push(_640.classes," ");
}
if(_642){
html.push(_642," ");
}
_644.push(html.join(""));
_644.push("");
html=["\" idx=\"",_640.index,"\" style=\""];
if(_641&&_641[_641.length-1]!=";"){
_641+=";";
}
html.push(_640.styles,_641||"",_640.hidden?"display:none;":"");
if(_640.unitWidth){
html.push("width:",_640.unitWidth,";");
}
_644.push(html.join(""));
_644.push("");
html=["\""];
if(_640.attrs){
html.push(" ",_640.attrs);
}
html.push(">");
_644.push(html.join(""));
_644.push("");
_644.push(_643?"</th>":"</td>");
return _644;
},isCellNode:function(_647){
return Boolean(_647&&_647!=win.doc&&html.attr(_647,"idx"));
},getCellNodeIndex:function(_648){
return _648?Number(html.attr(_648,"idx")):-1;
},getCellNode:function(_649,_64a){
for(var i=0,row;((row=_634(_649.firstChild,i))&&row.cells);i++){
for(var j=0,cell;(cell=row.cells[j]);j++){
if(this.getCellNodeIndex(cell)==_64a){
return cell;
}
}
}
return null;
},findCellTarget:function(_64b,_64c){
var n=_64b;
while(n&&(!this.isCellNode(n)||(n.offsetParent&&_63e in n.offsetParent.parentNode&&n.offsetParent.parentNode[_63e]!=this.view.id))&&(n!=_64c)){
n=n.parentNode;
}
return n!=_64c?n:null;
},baseDecorateEvent:function(e){
e.dispatch="do"+e.type;
e.grid=this.grid;
e.sourceView=this.view;
e.cellNode=this.findCellTarget(e.target,e.rowNode);
e.cellIndex=this.getCellNodeIndex(e.cellNode);
e.cell=(e.cellIndex>=0?this.grid.getCell(e.cellIndex):null);
},findTarget:function(_64d,_64e){
var n=_64d;
while(n&&(n!=this.domNode)&&(!(_64e in n)||(_63e in n&&n[_63e]!=this.view.id))){
n=n.parentNode;
}
return (n!=this.domNode)?n:null;
},findRowTarget:function(_64f){
return this.findTarget(_64f,_63d);
},isIntraNodeEvent:function(e){
try{
return (e.cellNode&&e.relatedTarget&&html.isDescendant(e.relatedTarget,e.cellNode));
}
catch(x){
return false;
}
},isIntraRowEvent:function(e){
try{
var row=e.relatedTarget&&this.findRowTarget(e.relatedTarget);
return !row&&(e.rowIndex==-1)||row&&(e.rowIndex==row.gridRowIndex);
}
catch(x){
return false;
}
},dispatchEvent:function(e){
if(e.dispatch in this){
return this[e.dispatch](e);
}
return false;
},domouseover:function(e){
if(e.cellNode&&(e.cellNode!=this.lastOverCellNode)){
this.lastOverCellNode=e.cellNode;
this.grid.onMouseOver(e);
}
this.grid.onMouseOverRow(e);
},domouseout:function(e){
if(e.cellNode&&(e.cellNode==this.lastOverCellNode)&&!this.isIntraNodeEvent(e,this.lastOverCellNode)){
this.lastOverCellNode=null;
this.grid.onMouseOut(e);
if(!this.isIntraRowEvent(e)){
this.grid.onMouseOutRow(e);
}
}
},domousedown:function(e){
if(e.cellNode){
this.grid.onMouseDown(e);
}
this.grid.onMouseDownRow(e);
}});
var _650=dg._ContentBuilder=lang.extend(function(view){
_63f.call(this,view);
},_63f.prototype,{update:function(){
this.prepareHtml();
},prepareHtml:function(){
var _651=this.grid.get,_652=this.view.structure.cells;
for(var j=0,row;(row=_652[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
cell.get=cell.get||(cell.value==undefined)&&_651;
cell.markup=this.generateCellMarkup(cell,cell.cellStyles,cell.cellClasses,false);
if(!this.grid.editable&&cell.editable){
this.grid.editable=true;
}
}
}
},generateHtml:function(_653,_654){
var html=this.getTableArray(),v=this.view,_655=v.structure.cells,item=this.grid.getItem(_654);
util.fire(this.view,"onBeforeRow",[_654,_655]);
for(var j=0,row;(row=_655[j]);j++){
if(row.hidden||row.header){
continue;
}
html.push(!row.invisible?"<tr>":"<tr class=\"dojoxGridInvisible\">");
for(var i=0,cell,m,cc,cs;(cell=row[i]);i++){
m=cell.markup;
cc=cell.customClasses=[];
cs=cell.customStyles=[];
m[5]=cell.format(_654,item);
m[1]=cc.join(" ");
m[3]=cs.join(";");
html.push.apply(html,m);
}
html.push("</tr>");
}
html.push("</table>");
return html.join("");
},decorateEvent:function(e){
e.rowNode=this.findRowTarget(e.target);
if(!e.rowNode){
return false;
}
e.rowIndex=e.rowNode[_63d];
this.baseDecorateEvent(e);
e.cell=this.grid.getCell(e.cellIndex);
return true;
}});
var _656=dg._HeaderBuilder=lang.extend(function(view){
this.moveable=null;
_63f.call(this,view);
},_63f.prototype,{_skipBogusClicks:false,overResizeWidth:4,minColWidth:1,update:function(){
if(this.tableMap){
this.tableMap.mapRows(this.view.structure.cells);
}else{
this.tableMap=new dg._TableMap(this.view.structure.cells);
}
},generateHtml:function(_657,_658){
var html=this.getTableArray(),_659=this.view.structure.cells;
util.fire(this.view,"onBeforeRow",[-1,_659]);
for(var j=0,row;(row=_659[j]);j++){
if(row.hidden){
continue;
}
html.push(!row.invisible?"<tr>":"<tr class=\"dojoxGridInvisible\">");
for(var i=0,cell,_65a;(cell=row[i]);i++){
cell.customClasses=[];
cell.customStyles=[];
if(this.view.simpleStructure){
if(cell.draggable){
if(cell.headerClasses){
if(cell.headerClasses.indexOf("dojoDndItem")==-1){
cell.headerClasses+=" dojoDndItem";
}
}else{
cell.headerClasses="dojoDndItem";
}
}
if(cell.attrs){
if(cell.attrs.indexOf("dndType='gridColumn_")==-1){
cell.attrs+=" dndType='gridColumn_"+this.grid.id+"'";
}
}else{
cell.attrs="dndType='gridColumn_"+this.grid.id+"'";
}
}
_65a=this.generateCellMarkup(cell,cell.headerStyles,cell.headerClasses,true);
_65a[5]=(_658!=undefined?_658:_657(cell));
_65a[3]=cell.customStyles.join(";");
_65a[1]=cell.customClasses.join(" ");
html.push(_65a.join(""));
}
html.push("</tr>");
}
html.push("</table>");
return html.join("");
},getCellX:function(e){
var n,x=e.layerX;
if(has("mozilla")||has("ie")>=9){
n=_638(e.target,_63b("th"));
x-=(n&&n.offsetLeft)||0;
var t=e.sourceView.getScrollbarWidth();
if(!this.grid.isLeftToRight()){
table=_638(n,_63b("table"));
x-=(table&&table.offsetLeft)||0;
}
}
n=_638(e.target,function(){
if(!n||n==e.cellNode){
return false;
}
x+=(n.offsetLeft<0?0:n.offsetLeft);
return true;
});
return x;
},decorateEvent:function(e){
this.baseDecorateEvent(e);
e.rowIndex=-1;
e.cellX=this.getCellX(e);
return true;
},prepareResize:function(e,mod){
do{
var i=e.cellIndex;
e.cellNode=(i?e.cellNode.parentNode.cells[i+mod]:null);
e.cellIndex=(e.cellNode?this.getCellNodeIndex(e.cellNode):-1);
}while(e.cellNode&&e.cellNode.style.display=="none");
return Boolean(e.cellNode);
},canResize:function(e){
if(!e.cellNode||e.cellNode.colSpan>1){
return false;
}
var cell=this.grid.getCell(e.cellIndex);
return !cell.noresize&&cell.canResize();
},overLeftResizeArea:function(e){
if(html.hasClass(win.body(),"dojoDndMove")){
return false;
}
if(has("ie")){
var tN=e.target;
if(html.hasClass(tN,"dojoxGridArrowButtonNode")||html.hasClass(tN,"dojoxGridArrowButtonChar")||html.hasClass(tN,"dojoxGridColCaption")){
return false;
}
}
if(this.grid.isLeftToRight()){
return (e.cellIndex>0)&&(e.cellX>0&&e.cellX<this.overResizeWidth)&&this.prepareResize(e,-1);
}
var t=e.cellNode&&(e.cellX>0&&e.cellX<this.overResizeWidth);
return t;
},overRightResizeArea:function(e){
if(html.hasClass(win.body(),"dojoDndMove")){
return false;
}
if(has("ie")){
var tN=e.target;
if(html.hasClass(tN,"dojoxGridArrowButtonNode")||html.hasClass(tN,"dojoxGridArrowButtonChar")||html.hasClass(tN,"dojoxGridColCaption")){
return false;
}
}
if(this.grid.isLeftToRight()){
return e.cellNode&&(e.cellX>=e.cellNode.offsetWidth-this.overResizeWidth);
}
return (e.cellIndex>0)&&(e.cellX>=e.cellNode.offsetWidth-this.overResizeWidth)&&this.prepareResize(e,-1);
},domousemove:function(e){
if(!this.moveable){
var c=(this.overRightResizeArea(e)?"dojoxGridColResize":(this.overLeftResizeArea(e)?"dojoxGridColResize":""));
if(c&&!this.canResize(e)){
c="dojoxGridColNoResize";
}
html.toggleClass(e.sourceView.headerNode,"dojoxGridColNoResize",(c=="dojoxGridColNoResize"));
html.toggleClass(e.sourceView.headerNode,"dojoxGridColResize",(c=="dojoxGridColResize"));
if(c){
_62e.stop(e);
}
}
},domousedown:function(e){
if(!this.moveable){
if((this.overRightResizeArea(e)||this.overLeftResizeArea(e))&&this.canResize(e)){
this.beginColumnResize(e);
}else{
this.grid.onMouseDown(e);
this.grid.onMouseOverRow(e);
}
}
},doclick:function(e){
if(this._skipBogusClicks){
_62e.stop(e);
return true;
}
return false;
},colResizeSetup:function(e,_65b){
var _65c=html.contentBox(e.sourceView.headerNode);
if(_65b){
this.lineDiv=document.createElement("div");
var vw=html.position(e.sourceView.headerNode,true);
var _65d=html.contentBox(e.sourceView.domNode);
var l=e.pageX;
if(!this.grid.isLeftToRight()&&has("ie")<8){
l-=_631.getScrollbar().w;
}
html.style(this.lineDiv,{top:vw.y+"px",left:l+"px",height:(_65d.h+_65c.h)+"px"});
html.addClass(this.lineDiv,"dojoxGridResizeColLine");
this.lineDiv._origLeft=l;
win.body().appendChild(this.lineDiv);
}
var _65e=[],_65f=this.tableMap.findOverlappingNodes(e.cellNode);
for(var i=0,cell;(cell=_65f[i]);i++){
_65e.push({node:cell,index:this.getCellNodeIndex(cell),width:cell.offsetWidth});
}
var view=e.sourceView;
var adj=this.grid.isLeftToRight()?1:-1;
var _660=e.grid.views.views;
var _661=[];
for(var j=view.idx+adj,_662;(_662=_660[j]);j=j+adj){
_661.push({node:_662.headerNode,left:window.parseInt(_662.headerNode.style.left)});
}
var _663=view.headerContentNode.firstChild;
var drag={scrollLeft:e.sourceView.headerNode.scrollLeft,view:view,node:e.cellNode,index:e.cellIndex,w:html.contentBox(e.cellNode).w,vw:_65c.w,table:_663,tw:html.contentBox(_663).w,spanners:_65e,followers:_661};
return drag;
},beginColumnResize:function(e){
this.moverDiv=document.createElement("div");
html.style(this.moverDiv,{position:"absolute",left:0});
win.body().appendChild(this.moverDiv);
html.addClass(this.grid.domNode,"dojoxGridColumnResizing");
var m=(this.moveable=new _630(this.moverDiv));
var drag=this.colResizeSetup(e,true);
m.onMove=lang.hitch(this,"doResizeColumn",drag);
_62f.connect(m,"onMoveStop",lang.hitch(this,function(){
this.endResizeColumn(drag);
if(drag.node.releaseCapture){
drag.node.releaseCapture();
}
this.moveable.destroy();
delete this.moveable;
this.moveable=null;
html.removeClass(this.grid.domNode,"dojoxGridColumnResizing");
}));
if(e.cellNode.setCapture){
e.cellNode.setCapture();
}
m.onMouseDown(e);
},doResizeColumn:function(_664,_665,_666){
var _667=_666.l;
var data={deltaX:_667,w:_664.w+(this.grid.isLeftToRight()?_667:-_667),vw:_664.vw+_667,tw:_664.tw+_667};
this.dragRecord={inDrag:_664,mover:_665,leftTop:_666};
if(data.w>=this.minColWidth){
if(!_665){
this.doResizeNow(_664,data);
}else{
html.style(this.lineDiv,"left",(this.lineDiv._origLeft+data.deltaX)+"px");
}
}
},endResizeColumn:function(_668){
if(this.dragRecord){
var _669=this.dragRecord.leftTop;
var _66a=this.grid.isLeftToRight()?_669.l:-_669.l;
_66a+=Math.max(_668.w+_66a,this.minColWidth)-(_668.w+_66a);
if(has("webkit")&&_668.spanners.length){
_66a+=html._getPadBorderExtents(_668.spanners[0].node).w;
}
var data={deltaX:_66a,w:_668.w+_66a,vw:_668.vw+_66a,tw:_668.tw+_66a};
this.doResizeNow(_668,data);
delete this.dragRecord;
}
html.destroy(this.lineDiv);
html.destroy(this.moverDiv);
html.destroy(this.moverDiv);
delete this.moverDiv;
this._skipBogusClicks=true;
_668.view.update();
this._skipBogusClicks=false;
this.grid.onResizeColumn(_668.index);
},doResizeNow:function(_66b,data){
_66b.view.convertColPctToFixed();
if(_66b.view.flexCells&&!_66b.view.testFlexCells()){
var t=_637(_66b.node);
if(t){
(t.style.width="");
}
}
var i,s,sw,f,fl;
for(i=0;(s=_66b.spanners[i]);i++){
sw=s.width+data.deltaX;
if(sw>0){
s.node.style.width=sw+"px";
_66b.view.setColWidth(s.index,sw);
}
}
if(this.grid.isLeftToRight()||!has("ie")){
for(i=0;(f=_66b.followers[i]);i++){
fl=f.left+data.deltaX;
f.node.style.left=fl+"px";
}
}
_66b.node.style.width=data.w+"px";
_66b.view.setColWidth(_66b.index,data.w);
_66b.view.headerNode.style.width=data.vw+"px";
_66b.view.setColumnsWidth(data.tw);
if(!this.grid.isLeftToRight()){
_66b.view.headerNode.scrollLeft=_66b.scrollLeft+data.deltaX;
}
}});
dg._TableMap=lang.extend(function(rows){
this.mapRows(rows);
},{map:null,mapRows:function(_66c){
var _66d=_66c.length;
if(!_66d){
return;
}
this.map=[];
var row;
for(var k=0;(row=_66c[k]);k++){
this.map[k]=[];
}
for(var j=0;(row=_66c[j]);j++){
for(var i=0,x=0,cell,_66e,_66f;(cell=row[i]);i++){
while(this.map[j][x]){
x++;
}
this.map[j][x]={c:i,r:j};
_66f=cell.rowSpan||1;
_66e=cell.colSpan||1;
for(var y=0;y<_66f;y++){
for(var s=0;s<_66e;s++){
this.map[j+y][x+s]=this.map[j][x];
}
}
x+=_66e;
}
}
},dumpMap:function(){
for(var j=0,row,h="";(row=this.map[j]);j++,h=""){
for(var i=0,cell;(cell=row[i]);i++){
h+=cell.r+","+cell.c+"   ";
}
}
},getMapCoords:function(_670,_671){
for(var j=0,row;(row=this.map[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
if(cell.c==_671&&cell.r==_670){
return {j:j,i:i};
}
}
}
return {j:-1,i:-1};
},getNode:function(_672,_673,_674){
var row=_672&&_672.rows[_673];
return row&&row.cells[_674];
},_findOverlappingNodes:function(_675,_676,_677){
var _678=[];
var m=this.getMapCoords(_676,_677);
for(var j=0,row;(row=this.map[j]);j++){
if(j==m.j){
continue;
}
var rw=row[m.i];
var n=(rw?this.getNode(_675,rw.r,rw.c):null);
if(n){
_678.push(n);
}
}
return _678;
},findOverlappingNodes:function(_679){
return this._findOverlappingNodes(_637(_679),_633(_679.parentNode),_632(_679));
}});
return {_Builder:_63f,_HeaderBuilder:_656,_ContentBuilder:_650};
});
},"davinci/ve/utils/GeomUtils":function(){
define(["dojo/_base/window","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/_base/sniff"],function(win,_67a,_67b,has,_67c){
var _67d=["TABLE","TBODY","TR","TD","TH"];
return {getMarginBoxPageCoords:function(node){
var _67e;
win.withDoc(node.ownerDocument,function(){
var _67f=this.getBorderBoxPageCoords(node);
var _680=this.getMarginExtents(node);
_67e={l:_67f.l-_680.l,t:_67f.t-_680.t,w:_67f.w+_680.l+_680.r,h:_67f.h+_680.t+_680.b};
}.bind(this));
return _67e;
},getMarginBoxPageCoordsCached:function(node){
if(!node._maqMarginBoxPageCoords){
node._maqMarginBoxPageCoords=this.getMarginBoxPageCoords(node);
}
return node._maqMarginBoxPageCoords;
},getBorderBoxPageCoords:function(node){
var o;
win.withDoc(node.ownerDocument,function(){
if(_67d.indexOf(node.tagName)){
var bcr=node.getBoundingClientRect();
var _681=this.getScrollLeft(node);
var _682=this.getScrollTop(node);
o={l:bcr.left+_681,t:bcr.top+_682,w:bcr.width,h:bcr.height};
}else{
var l=node.offsetLeft;
var t=node.offsetTop;
var pn=node.parentNode;
var opn=node.offsetParent;
while(pn&&pn.tagName!="BODY"){
if(typeof pn.scrollLeft=="number"&&typeof pn.scrollTop=="number"){
l-=pn.scrollLeft;
t-=pn.scrollTop;
}
if(pn==opn){
var _683=_67a.getBorderExtents(opn);
l+=opn.offsetLeft+_683.l;
t+=opn.offsetTop+_683.t;
opn=opn.offsetParent;
}
pn=pn.parentNode;
}
o={l:l,t:t,w:node.offsetWidth,h:node.offsetHeight};
}
}.bind(this));
return o;
},getBorderBoxPageCoordsCached:function(node){
if(!node._maqBorderBoxPageCoords){
node._maqBorderBoxPageCoords=this.getBorderBoxPageCoords(node);
}
return node._maqBorderBoxPageCoords;
},getScrollLeft:function(node){
var doc=node&&node.ownerDocument;
if(has("mozilla")){
var win=doc&&doc.defaultView;
return win?win.pageXOffset:0;
}else{
var body=doc&&doc.body;
return body?body.scrollLeft:0;
}
},getScrollTop:function(node){
var doc=node&&node.ownerDocument;
if(has("mozilla")){
var win=doc&&doc.defaultView;
return win?win.pageYOffset:0;
}else{
var body=doc&&doc.body;
return body?body.scrollTop:0;
}
},getMarginExtents:function getMarginExtents(node,_684){
var s=_684||_67b.getComputedStyle(node);
var l,t,r,b;
function px(_685){
return parseFloat(_685)||0;
};
if(s){
l=px(s.marginLeft);
t=px(s.marginTop);
r=px(s.marginRight);
b=px(s.marginBottom);
}else{
l=t=r=b=0;
}
return {l:l,t:t,r:r,b:b,w:l+r,h:t+b};
},clearGeomCache:function(node){
delete node._maqBorderBoxPageCoords;
delete node._maqMarginBoxPageCoords;
}};
});
},"davinci/ui/NewTheme":function(){
define(["dojo/_base/declare","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/_WidgetsInTemplateMixin","system/resource","../model/Path","../Workbench","../workbench/Preferences","dojo/i18n!./nls/ui","dojo/i18n!dijit/nls/common","dojo/text!./templates/newtheme.html","../Theme","./widgets/ThemeSelection","dijit/form/Button","dijit/form/ValidationTextBox"],function(_686,_687,_688,_689,_68a,Path,_68b,_68c,_68d,_68e,_68f,_690,_691,_692,_693){
return _686([_688,_687,_689],{templateString:_68f,_themeSelection:null,_okButton:null,_folder:null,_themeName:null,_folder:null,_version:null,_selector:null,_themeLocation:null,_error1:null,_error2:null,_error3:null,_error4:null,_errorMsg:null,_themeValidator:/^[-]?([_a-z]|[^\0-\237]|\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\[^\n\r\f0-9a-f])([_a-z0-9-]|[^\0-\237]|\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\[^\n\r\f0-9a-f])*$/i,postMixInProperties:function(){
var _694=_68d;
var _695=_68e;
dojo.mixin(this,_694);
dojo.mixin(this,_695);
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
dojo.connect(this._themeSelection,"onChange",this,"_baseThemeChanged");
dojo.connect(this._themeSelection,"onChange",this,"_checkValid");
this._selector.validator=dojo.hitch(this,function(_696,_697){
var _698=this._themeValidator.test(_696);
this._okButton.set("disabled",!_698);
return _698;
});
},_baseThemeChanged:function(){
this._theme=this._themeSelection.get("value");
},_createTheme:function(){
this._okButton.set("disabled",true);
var _699=_68d;
var _69a=this._themeSelection.get("value");
var _69b=this._selector.get("value");
var _69c=_69b;
var _69d=null;
var base=_69b;
var _69e=this._getThemeLocation();
var r1=_68a.findResource(_69e+"/"+base+".theme");
if(r1){
alert(_699.themeAlreadyExists);
}else{
this._loading=dojo.create("div",null,dojo.body(),"first");
this._loading.innerHTML=dojo.string.substitute("<table><tr><td><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;${0}...</td></tr></table>",[_699.creatingTheme]);
dojo.addClass(this._loading,"loading");
dojo.style(this._loading,"opacity","0.5");
var _69f=this.getBase();
var a=_690.CloneTheme(_69c,_69d,_69b,_69e,_69a,true);
a.promise.then(function(_6a0){
var _6a1=a.themeFile;
if(_6a1){
_6a1.isNew=false;
return _6a1.getContent().then(function(_6a2){
_68b.openEditor({fileName:_6a1,content:_6a2});
});
}else{
throw new Error(_699.errorCreatingTheme+base);
}
}).otherwise(function(_6a3){
var _6a4="Uh oh! An error has occurred:<br><b>"+_6a3.message+"</b>";
if(_6a3.fileName){
_6a4+="<br>file: "+_6a3.fileName+"<br>line: "+_6a3.lineNumber;
}
if(_6a3.stack){
_6a4+="<br><pre>"+_6a3.stack+"</pre>";
}
console.error(_6a4);
}).otherwise(function(){
if(this._loading){
this._loading.parentNode.removeChild(this._loading);
delete this._loading;
}
}.bind(this));
}
},getBase:function(){
if(_68b.singleProjectMode()){
return _68b.getProject();
}
},_getThemeLocation:function(){
var _6a5=this._selector.get("value");
var base=this.getBase();
var _6a6=_68c.getPreferences("davinci.ui.ProjectPrefs",base);
var _6a7=new Path(base).append(_6a6.themeFolder);
return _6a7.append(_6a5).toString();
},_checkValid:function(){
var isOk=true;
var _6a8=this._themeSelection.get("value");
var _6a9=this._selector.get("value");
if(_6a8==null||_6a8==""||_6a9==null||_6a9==""){
isOk=false;
}
this._okButton.set("disabled",!isOk);
},okButton:function(){
this._createTheme();
},cancelButton:function(){
this.cancel=true;
this.onClose();
},onClose:function(){
}});
});
},"url:davinci/workbench/templates/Preferences.html":"<div style='width:100%; height: 100%'>\r\n\t<div class=\"dijitDialogPaneContentArea\">\r\n\t\t<div dojoType='dijit.layout.BorderContainer' dojoAttachPoint=\"borderContainer\" style='width:100%; height: 100%' gutters='false' liveSplitters='true' id='preferencesContainer'>\r\n\t\t\t<div dojoType='dijit.layout.ContentPane' id='pref.TreePane' splitter='true' region='leading' style='width: 200px;' minSize='100' maxSize='300'></div>\r\n\t\t\t<div dojoType='dijit.layout.ContentPane' region='center' id='pref.RightPane'></div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"dijitDialogPaneActionBar\">\r\n\t\t<!-- FIXME: we don't have logic to yet implement restoreDefaults() yet. See #627\r\n\t\t<button dojoType=dijit.form.Button type=\"button\" onclick=\"davinci.workbench.Preferences.restoreDefaults();\"></button>-->\r\n\t\t<button dojoType=\"dijit.form.Button\" type=\"button\" onclick=\"davinci.workbench.Preferences.save();\" class=\"maqPrimaryButton\" type=\"submit\">${commonStrings.buttonSave}</button>\r\n\t\t<button dojoType=\"dijit.form.Button\" type=\"button\" onclick=\"davinci.workbench.Preferences.finish();\" class=\"maqSecondaryButton\">${commonStrings.buttonCancel}</button>\r\n\t</div>\r\n</div>\r\n\r\n\r\n","dijit/layout/BorderContainer":function(){
define(["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","dojo/touch","../_WidgetBase","../_Widget","../_TemplatedMixin","./_LayoutWidget","./utils"],function(_6aa,_6ab,_6ac,_6ad,_6ae,_6af,_6b0,_6b1,keys,lang,on,_6b2,_6b3,_6b4,_6b5,_6b6,_6b7){
var _6b8=_6ac("dijit.layout._Splitter",[_6b4,_6b5],{live:true,templateString:"<div class=\"dijitSplitter\" data-dojo-attach-event=\"onkeypress:_onKeyPress,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse\" tabIndex=\"0\" role=\"separator\"><div class=\"dijitSplitterThumb\"></div></div>",constructor:function(){
this._handlers=[];
},postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
this._factor=/top|left/.test(this.region)?1:-1;
this._cookieName=this.container.id+"_"+this.region;
},buildRendering:function(){
this.inherited(arguments);
_6ad.add(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V"));
if(this.container.persist){
var _6b9=_6ab(this._cookieName);
if(_6b9){
this.child.domNode.style[this.horizontal?"height":"width"]=_6b9;
}
}
},_computeMaxSize:function(){
var dim=this.horizontal?"h":"w",_6ba=_6af.getMarginBox(this.child.domNode)[dim],_6bb=_6aa.filter(this.container.getChildren(),function(_6bc){
return _6bc.region=="center";
})[0],_6bd=_6af.getMarginBox(_6bb.domNode)[dim];
return Math.min(this.child.maxSize,_6ba+_6bd);
},_startDrag:function(e){
if(!this.cover){
this.cover=_6ae.place("<div class=dijitSplitterCover></div>",this.child.domNode,"after");
}
_6ad.add(this.cover,"dijitSplitterCoverActive");
if(this.fake){
_6ae.destroy(this.fake);
}
if(!(this._resize=this.live)){
(this.fake=this.domNode.cloneNode(true)).removeAttribute("id");
_6ad.add(this.domNode,"dijitSplitterShadow");
_6ae.place(this.fake,this.domNode,"after");
}
_6ad.add(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active");
if(this.fake){
_6ad.remove(this.fake,"dijitSplitterHover dijitSplitter"+(this.horizontal?"H":"V")+"Hover");
}
var _6be=this._factor,_6bf=this.horizontal,axis=_6bf?"pageY":"pageX",_6c0=e[axis],_6c1=this.domNode.style,dim=_6bf?"h":"w",_6c2=_6af.getMarginBox(this.child.domNode)[dim],max=this._computeMaxSize(),min=this.child.minSize||20,_6c3=this.region,_6c4=_6c3=="top"||_6c3=="bottom"?"top":"left",_6c5=parseInt(_6c1[_6c4],10),_6c6=this._resize,_6c7=lang.hitch(this.container,"_layoutChildren",this.child.id),de=this.ownerDocument;
this._handlers=this._handlers.concat([on(de,_6b2.move,this._drag=function(e,_6c8){
var _6c9=e[axis]-_6c0,_6ca=_6be*_6c9+_6c2,_6cb=Math.max(Math.min(_6ca,max),min);
if(_6c6||_6c8){
_6c7(_6cb);
}
_6c1[_6c4]=_6c9+_6c5+_6be*(_6cb-_6ca)+"px";
}),on(de,"dragstart",_6b1.stop),on(this.ownerDocumentBody,"selectstart",_6b1.stop),on(de,_6b2.release,lang.hitch(this,"_stopDrag"))]);
_6b1.stop(e);
},_onMouse:function(e){
var o=(e.type=="mouseover"||e.type=="mouseenter");
_6ad.toggle(this.domNode,"dijitSplitterHover",o);
_6ad.toggle(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V")+"Hover",o);
},_stopDrag:function(e){
try{
if(this.cover){
_6ad.remove(this.cover,"dijitSplitterCoverActive");
}
if(this.fake){
_6ae.destroy(this.fake);
}
_6ad.remove(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active dijitSplitterShadow");
this._drag(e);
this._drag(e,true);
}
finally{
this._cleanupHandlers();
delete this._drag;
}
if(this.container.persist){
_6ab(this._cookieName,this.child.domNode.style[this.horizontal?"height":"width"],{expires:365});
}
},_cleanupHandlers:function(){
var h;
while(h=this._handlers.pop()){
h.remove();
}
},_onKeyPress:function(e){
this._resize=true;
var _6cc=this.horizontal;
var tick=1;
switch(e.charOrCode){
case _6cc?keys.UP_ARROW:keys.LEFT_ARROW:
tick*=-1;
case _6cc?keys.DOWN_ARROW:keys.RIGHT_ARROW:
break;
default:
return;
}
var _6cd=_6af.getMarginSize(this.child.domNode)[_6cc?"h":"w"]+this._factor*tick;
this.container._layoutChildren(this.child.id,Math.max(Math.min(_6cd,this._computeMaxSize()),this.child.minSize));
_6b1.stop(e);
},destroy:function(){
this._cleanupHandlers();
delete this.child;
delete this.container;
delete this.cover;
delete this.fake;
this.inherited(arguments);
}});
var _6ce=_6ac("dijit.layout._Gutter",[_6b4,_6b5],{templateString:"<div class=\"dijitGutter\" role=\"presentation\"></div>",postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
},buildRendering:function(){
this.inherited(arguments);
_6ad.add(this.domNode,"dijitGutter"+(this.horizontal?"H":"V"));
}});
var _6cf=_6ac("dijit.layout.BorderContainer",_6b6,{design:"headline",gutters:true,liveSplitters:true,persist:false,baseClass:"dijitBorderContainer",_splitterClass:_6b8,postMixInProperties:function(){
if(!this.gutters){
this.baseClass+="NoGutter";
}
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
_6aa.forEach(this.getChildren(),this._setupChild,this);
this.inherited(arguments);
},_setupChild:function(_6d0){
var _6d1=_6d0.region;
if(_6d1){
this.inherited(arguments);
_6ad.add(_6d0.domNode,this.baseClass+"Pane");
var ltr=this.isLeftToRight();
if(_6d1=="leading"){
_6d1=ltr?"left":"right";
}
if(_6d1=="trailing"){
_6d1=ltr?"right":"left";
}
if(_6d1!="center"&&(_6d0.splitter||this.gutters)&&!_6d0._splitterWidget){
var _6d2=_6d0.splitter?this._splitterClass:_6ce;
if(lang.isString(_6d2)){
_6d2=lang.getObject(_6d2);
}
var _6d3=new _6d2({id:_6d0.id+"_splitter",container:this,child:_6d0,region:_6d1,live:this.liveSplitters});
_6d3.isSplitter=true;
_6d0._splitterWidget=_6d3;
_6ae.place(_6d3.domNode,_6d0.domNode,"after");
_6d3.startup();
}
_6d0.region=_6d1;
}
},layout:function(){
this._layoutChildren();
},addChild:function(_6d4,_6d5){
this.inherited(arguments);
if(this._started){
this.layout();
}
},removeChild:function(_6d6){
var _6d7=_6d6.region;
var _6d8=_6d6._splitterWidget;
if(_6d8){
_6d8.destroy();
delete _6d6._splitterWidget;
}
this.inherited(arguments);
if(this._started){
this._layoutChildren();
}
_6ad.remove(_6d6.domNode,this.baseClass+"Pane");
_6b0.set(_6d6.domNode,{top:"auto",bottom:"auto",left:"auto",right:"auto",position:"static"});
_6b0.set(_6d6.domNode,_6d7=="top"||_6d7=="bottom"?"width":"height","auto");
},getChildren:function(){
return _6aa.filter(this.inherited(arguments),function(_6d9){
return !_6d9.isSplitter;
});
},getSplitter:function(_6da){
return _6aa.filter(this.getChildren(),function(_6db){
return _6db.region==_6da;
})[0]._splitterWidget;
},resize:function(_6dc,_6dd){
if(!this.cs||!this.pe){
var node=this.domNode;
this.cs=_6b0.getComputedStyle(node);
this.pe=_6af.getPadExtents(node,this.cs);
this.pe.r=_6b0.toPixelValue(node,this.cs.paddingRight);
this.pe.b=_6b0.toPixelValue(node,this.cs.paddingBottom);
_6b0.set(node,"padding","0px");
}
this.inherited(arguments);
},_layoutChildren:function(_6de,_6df){
if(!this._borderBox||!this._borderBox.h){
return;
}
var _6e0=_6aa.map(this.getChildren(),function(_6e1,idx){
return {pane:_6e1,weight:[_6e1.region=="center"?Infinity:0,_6e1.layoutPriority,(this.design=="sidebar"?1:-1)*(/top|bottom/.test(_6e1.region)?1:-1),idx]};
},this);
_6e0.sort(function(a,b){
var aw=a.weight,bw=b.weight;
for(var i=0;i<aw.length;i++){
if(aw[i]!=bw[i]){
return aw[i]-bw[i];
}
}
return 0;
});
var _6e2=[];
_6aa.forEach(_6e0,function(_6e3){
var pane=_6e3.pane;
_6e2.push(pane);
if(pane._splitterWidget){
_6e2.push(pane._splitterWidget);
}
});
var dim={l:this.pe.l,t:this.pe.t,w:this._borderBox.w-this.pe.w,h:this._borderBox.h-this.pe.h};
_6b7.layoutChildren(this.domNode,dim,_6e2,_6de,_6df);
},destroyRecursive:function(){
_6aa.forEach(this.getChildren(),function(_6e4){
var _6e5=_6e4._splitterWidget;
if(_6e5){
_6e5.destroy();
}
delete _6e4._splitterWidget;
});
this.inherited(arguments);
}});
_6cf.ChildWidgetProperties={region:"",layoutPriority:0,splitter:false,minSize:0,maxSize:Infinity};
lang.extend(_6b3,_6cf.ChildWidgetProperties);
_6cf._Splitter=_6b8;
_6cf._Gutter=_6ce;
return _6cf;
});
},"dojo/dnd/Mover":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/lang","../sniff","../_base/window","../dom","../dom-geometry","../dom-style","../Evented","../on","../touch","./common","./autoscroll"],function(_6e6,_6e7,_6e8,lang,has,win,dom,_6e9,_6ea,_6eb,on,_6ec,dnd,_6ed){
return _6e7("dojo.dnd.Mover",[_6eb],{constructor:function(node,e,host){
this.node=dom.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[on(d,_6ec.move,lang.hitch(this,"onFirstMove")),on(d,_6ec.move,lang.hitch(this,"onMouseMove")),on(d,_6ec.release,lang.hitch(this,"onMouseUp")),on(d,"dragstart",_6e8.stop),on(d.body,"selectstart",_6e8.stop)];
_6ed.autoScrollStart(d);
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
_6ed.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY},e);
_6e8.stop(e);
},onMouseUp:function(e){
if(has("webkit")&&has("mac")&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
_6e8.stop(e);
},onFirstMove:function(e){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left))||0;
t=Math.round(parseFloat(s.top))||0;
break;
default:
s.position="absolute";
var m=_6e9.getMarginBox(this.node);
var b=win.doc.body;
var bs=_6ea.getComputedStyle(b);
var bm=_6e9.getMarginBox(b,bs);
var bc=_6e9.getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this,e);
}
this.events.shift().remove();
},destroy:function(){
_6e6.forEach(this.events,function(_6ee){
_6ee.remove();
});
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
});
},"url:dojox/grid/resources/View.html":"<div class=\"dojoxGridView\" role=\"presentation\">\n\t<div class=\"dojoxGridHeader\" dojoAttachPoint=\"headerNode\" role=\"presentation\">\n\t\t<div dojoAttachPoint=\"headerNodeContainer\" style=\"width:9000em\" role=\"presentation\">\n\t\t\t<div dojoAttachPoint=\"headerContentNode\" role=\"row\"></div>\n\t\t</div>\n\t</div>\n\t<input type=\"checkbox\" class=\"dojoxGridHiddenFocus\" dojoAttachPoint=\"hiddenFocusNode\" role=\"presentation\" />\n\t<input type=\"checkbox\" class=\"dojoxGridHiddenFocus\" role=\"presentation\" />\n\t<div class=\"dojoxGridScrollbox\" dojoAttachPoint=\"scrollboxNode\" role=\"presentation\">\n\t\t<div class=\"dojoxGridContent\" dojoAttachPoint=\"contentNode\" hidefocus=\"hidefocus\" role=\"presentation\"></div>\n\t</div>\n</div>\n","davinci/js/JSModel":function(){
define(["dojo/_base/declare","davinci/model/Model"],function(_6ef,_6f0){
if(!davinci.js){
davinci.js={};
}
return _6ef("davinci.js.JSModel",_6f0,{});
});
},"davinci/html/CSSSelector":function(){
define(["require","dojo/_base/declare","davinci/html/CSSElement"],function(_6f1,_6f2,_6f3){
var _6f4=_6f2("davinci.html.CSSSelector",_6f3,{constructor:function(){
this.elementType="CSSSelector";
},matchesSelector:function(_6f5){
if(_6f5.elementType==this.elementType&&this.id==_6f5.id&&this.cls==_6f5.cls&&this.element==_6f5.element&&this.pseudoRule==_6f5.pseudoRule){
return true;
}
},getText:function(_6f6){
var s="";
if(this.element){
s=s+this.element;
}
if(this.id){
s=s+"#"+this.id;
}
if(this.cls){
s=s+"."+this.cls;
}
if(this.pseudoRule){
s=s+":"+this.pseudoRule;
}
if(this.pseudoElement){
s=s+"::"+this.pseudoElement;
}
if(this.attribute){
s=s+"["+this.attribute.name;
if(this.attribute.type){
s=s+this.attribute.type+"\""+this.attribute.value+"\"";
}
s=s+"]";
}
return s;
},matches:function(_6f7,_6f8){
var inx=_6f8||0;
var node=_6f7[inx];
var _6f9=0;
var _6fa=false;
if(this.id){
if(this.id!=node.id){
return -1;
}
_6f9+=100;
_6fa=true;
}
if(this.element){
if(this.element=="*"){
_6fa=true;
}else{
if(this.element!=node.tagName){
if(this.element.toUpperCase()!=node.tagName){
return -1;
}
}
_6f9+=1;
_6fa=true;
}
}
if(this.cls&&node.classes){
var _6fb=node.classes;
if(this.cls.indexOf(".")>=0){
var _6fc=this.cls.split(".");
for(var j=0;j<_6fc.length;j++){
var _6fd=false;
for(var i=0;i<_6fb.length;i++){
if(_6fd=(_6fb[i]==_6fc[j])){
break;
}
}
if(!_6fd){
return -1;
}
}
_6f9+=(_6fc.length*10);
_6fa=true;
}else{
var _6fd=false;
for(var i=0;i<_6fb.length;i++){
if(_6fd=((_6fb[i]==this.cls)&&(!this.pseudoRule))){
break;
}
}
if(!_6fd){
return -1;
}
_6f9+=10;
_6fa=true;
}
}
if(!_6fa){
return -1;
}else{
return _6f9;
}
},getCSSRule:function(){
if(this.parent.elementType=="CSSRule"){
return this.parent;
}
return this.parent.parent;
}});
_6f4.parseSelectors=function(_6fe){
if(typeof _6fe=="string"){
_6fe=_6fe+"{}";
var _6ff=_6f1("davinci/html/CSSFile");
var _700=new _6ff();
_700.setText(_6fe);
return _700.children[0].selectors;
}else{
return _6fe;
}
};
return _6f4;
});
},"davinci/ui/OpenThemeDialog":function(){
define(["dojo/_base/declare","dijit/_Templated","dijit/_Widget","dojo/i18n!davinci/ui/nls/ui","dojo/i18n!dijit/nls/common","dojo/text!./templates/OpenThemeDialog.html","davinci/ui/widgets/ThemeSelection"],function(_701,_702,_703,_704,_705,_706){
return _701("davinci.ui.OpenThemeDialog",[_703,_702],{templateString:_706,widgetsInTemplate:true,_themeChooser:null,startup:function(){
var _707=_704;
this.inherited(arguments);
var _708=this._themeChooser.get("numberOfThemes");
if(_708<1){
alert(_707.noUserThemes);
setTimeout(dojo.hitch(this,function(){
this.destroyRecursive();
this.cancel=true;
this.onClose();
},500));
}
},postMixInProperties:function(){
var _709=_704;
var _70a=_705;
dojo.mixin(this,_709);
dojo.mixin(this,_70a);
this.inherited(arguments);
},_checkValid:function(){
var isOk=true;
var _70b=this._themeChooser.attr("value");
if(_70b==null||_70b==""){
isOk=false;
}
this._okButton.set("disabled",!isOk);
},okButton:function(){
var _70c=this._themeChooser.attr("value");
davinci.Workbench.openEditor({fileName:_70c.file,content:_70c});
},cancelButton:function(){
this.cancel=true;
this.onClose();
}});
});
},"dijit/form/ComboBoxMixin":function(){
define(["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/kernel","dojo/_base/lang","dojo/store/util/QueryResults","./_AutoCompleterMixin","./_ComboBoxMenu","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(_70d,_70e,_70f,lang,_710,_711,_712,_713,_714){
return _70d("dijit.form.ComboBoxMixin",[_713,_711],{dropDownClass:_712,hasDownArrow:true,templateString:_714,baseClass:"dijitTextBox dijitComboBox",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},_setHasDownArrowAttr:function(val){
this._set("hasDownArrow",val);
this._buttonNode.style.display=val?"":"none";
},_showResultList:function(){
this.displayMessage("");
this.inherited(arguments);
},_setStoreAttr:function(_715){
if(!_715.get){
lang.mixin(_715,{_oldAPI:true,get:function(id){
var _716=new _70e();
this.fetchItemByIdentity({identity:id,onItem:function(_717){
_716.resolve(_717);
},onError:function(_718){
_716.reject(_718);
}});
return _716.promise;
},query:function(_719,_71a){
var _71b=new _70e(function(){
_71c.abort&&_71c.abort();
});
_71b.total=new _70e();
var _71c=this.fetch(lang.mixin({query:_719,onBegin:function(_71d){
_71b.total.resolve(_71d);
},onComplete:function(_71e){
_71b.resolve(_71e);
},onError:function(_71f){
_71b.reject(_71f);
}},_71a));
return _710(_71b);
}});
}
this._set("store",_715);
},postMixInProperties:function(){
var _720=this.params.store||this.store;
if(_720){
this._setStoreAttr(_720);
}
this.inherited(arguments);
if(!this.params.store&&!this.store._oldAPI){
var _721=this.declaredClass;
lang.mixin(this.store,{getValue:function(item,attr){
_70f.deprecated(_721+".store.getValue(item, attr) is deprecated for builtin store.  Use item.attr directly","","2.0");
return item[attr];
},getLabel:function(item){
_70f.deprecated(_721+".store.getLabel(item) is deprecated for builtin store.  Use item.label directly","","2.0");
return item.name;
},fetch:function(args){
_70f.deprecated(_721+".store.fetch() is deprecated for builtin store.","Use store.query()","2.0");
var shim=["dojo/data/ObjectStore"];
require(shim,lang.hitch(this,function(_722){
new _722({objectStore:this}).fetch(args);
}));
}});
}
}});
});
},"dijit/form/Select":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/_base/event","dojo/i18n","dojo/_base/lang","dojo/sniff","./_FormSelectWidget","../_HasDropDown","../Menu","../MenuItem","../MenuSeparator","../Tooltip","dojo/text!./templates/Select.html","dojo/i18n!./nls/validate"],function(_723,_724,_725,_726,_727,_728,i18n,lang,has,_729,_72a,Menu,_72b,_72c,_72d,_72e){
var _72f=_724("dijit.form._SelectMenu",Menu,{autoFocus:true,buildRendering:function(){
this.inherited(arguments);
var o=(this.menuTableNode=this.domNode);
var n=(this.domNode=this.ownerDocument.createElement("div"));
n.style.cssText="overflow-x: hidden; overflow-y: scroll";
if(o.parentNode){
o.parentNode.replaceChild(n,o);
}
_726.remove(o,"dijitMenuTable");
n.className=o.className+" dijitSelectMenu";
o.className="dijitReset dijitMenuTable";
o.setAttribute("role","listbox");
n.setAttribute("role","presentation");
n.appendChild(o);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onselectstart",_728.stop);
},focus:function(){
var _730=false,val=this.parentWidget.value;
if(lang.isArray(val)){
val=val[val.length-1];
}
if(val){
_723.forEach(this.parentWidget._getChildren(),function(_731){
if(_731.option&&(val===_731.option.value)){
_730=true;
this.focusChild(_731,false);
}
},this);
}
if(!_730){
this.inherited(arguments);
}
},resize:function(mb){
if(mb){
_727.setMarginBox(this.domNode,mb);
if("w" in mb){
this.menuTableNode.style.width="100%";
}
}
}});
var _732=_724("dijit.form.Select",[_729,_72a],{baseClass:"dijitSelect dijitValidationTextBox",templateString:_72e,_buttonInputDisabled:has("ie")?"disabled":"",required:false,state:"",message:"",tooltipPosition:[],emptyLabel:"&#160;",_isLoaded:false,_childrenLoaded:false,_fillContent:function(){
this.inherited(arguments);
if(this.options.length&&!this.value&&this.srcNodeRef){
var si=this.srcNodeRef.selectedIndex||0;
this.value=this.options[si>=0?si:0].value;
}
this.dropDown=new _72f({id:this.id+"_menu",parentWidget:this});
_726.add(this.dropDown.domNode,this.baseClass.replace(/\s+|$/g,"Menu "));
},_getMenuItemForOption:function(_733){
if(!_733.value&&!_733.label){
return new _72c({ownerDocument:this.ownerDocument});
}else{
var _734=lang.hitch(this,"_setValueAttr",_733);
var item=new _72b({option:_733,label:_733.label||this.emptyLabel,onClick:_734,ownerDocument:this.ownerDocument,dir:this.dir,disabled:_733.disabled||false});
item.focusNode.setAttribute("role","option");
return item;
}
},_addOptionItem:function(_735){
if(this.dropDown){
this.dropDown.addChild(this._getMenuItemForOption(_735));
}
},_getChildren:function(){
if(!this.dropDown){
return [];
}
return this.dropDown.getChildren();
},_loadChildren:function(_736){
if(_736===true){
if(this.dropDown){
delete this.dropDown.focusedChild;
}
if(this.options.length){
this.inherited(arguments);
}else{
_723.forEach(this._getChildren(),function(_737){
_737.destroyRecursive();
});
var item=new _72b({ownerDocument:this.ownerDocument,label:this.emptyLabel});
this.dropDown.addChild(item);
}
}else{
this._updateSelection();
}
this._isLoaded=false;
this._childrenLoaded=true;
if(!this._loadingStore){
this._setValueAttr(this.value,false);
}
},_refreshState:function(){
if(this._started){
this.validate(this.focused);
}
},startup:function(){
this.inherited(arguments);
this._refreshState();
},_setValueAttr:function(_738){
this.inherited(arguments);
_725.set(this.valueNode,"value",this.get("value"));
this._refreshState();
},_setDisabledAttr:function(_739){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_73a){
this._set("required",_73a);
this.focusNode.setAttribute("aria-required",_73a);
this._refreshState();
},_setOptionsAttr:function(_73b){
this._isLoaded=false;
this._set("options",_73b);
},_setDisplay:function(_73c){
var lbl=_73c||this.emptyLabel;
this.containerNode.innerHTML="<span role=\"option\" class=\"dijitReset dijitInline "+this.baseClass.replace(/\s+|$/g,"Label ")+"\">"+lbl+"</span>";
},validate:function(_73d){
var _73e=this.disabled||this.isValid(_73d);
this._set("state",_73e?"":(this._hasBeenBlurred?"Error":"Incomplete"));
this.focusNode.setAttribute("aria-invalid",_73e?"false":"true");
var _73f=_73e?"":this._missingMsg;
if(_73f&&this.focused&&this._hasBeenBlurred){
_72d.show(_73f,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_72d.hide(this.domNode);
}
this._set("message",_73f);
return _73e;
},isValid:function(){
return (!this.required||this.value===0||!(/^\s*$/.test(this.value||"")));
},reset:function(){
this.inherited(arguments);
_72d.hide(this.domNode);
this._refreshState();
},postMixInProperties:function(){
this.inherited(arguments);
this._missingMsg=i18n.getLocalization("dijit.form","validate",this.lang).missingMessage;
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onselectstart",_728.stop);
this.domNode.setAttribute("aria-expanded","false");
if(has("ie")<9){
this.defer(function(){
try{
var s=domStyle.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _740=this.domNode.getElementsByTagName("INPUT");
if(_740){
for(var i=0;i<_740.length;i++){
_740[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
});
}
},_setStyleAttr:function(_741){
this.inherited(arguments);
_726.toggle(this.domNode,this.baseClass.replace(/\s+|$/g,"FixedWidth "),!!this.domNode.style.width);
},isLoaded:function(){
return this._isLoaded;
},loadDropDown:function(_742){
this._loadChildren(true);
this._isLoaded=true;
_742();
},closeDropDown:function(){
this.inherited(arguments);
if(this.dropDown&&this.dropDown.menuTableNode){
this.dropDown.menuTableNode.style.width="";
}
},destroy:function(_743){
if(this.dropDown&&!this.dropDown._destroyed){
this.dropDown.destroyRecursive(_743);
delete this.dropDown;
}
this.inherited(arguments);
},_onFocus:function(){
this.validate(true);
this.inherited(arguments);
},_onBlur:function(){
_72d.hide(this.domNode);
this.inherited(arguments);
this.validate(false);
}});
_732._Menu=_72f;
return _732;
});
},"dijit/Calendar":function(){
define(["dojo/_base/array","dojo/date","dojo/date/locale","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/sniff","./CalendarLite","./_Widget","./_CssStateMixin","./_TemplatedMixin","./form/DropDownButton"],function(_744,date,_745,_746,_747,_748,_749,_74a,keys,lang,has,_74b,_74c,_74d,_74e,_74f){
var _750=_746("dijit.Calendar",[_74b,_74c,_74d],{cssStateNodes:{"decrementMonth":"dijitCalendarArrow","incrementMonth":"dijitCalendarArrow","previousYearLabelNode":"dijitCalendarPreviousYear","nextYearLabelNode":"dijitCalendarNextYear"},setValue:function(_751){
_74a.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_751);
},_createMonthWidget:function(){
return new _750._MonthDropDownButton({id:this.id+"_mddb",tabIndex:-1,onMonthSelect:lang.hitch(this,"_onMonthSelect"),lang:this.lang,dateLocaleModule:this.dateLocaleModule},this.monthNode);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onkeydown","_onKeyDown");
this.connect(this.dateRowsNode,"onmouseover","_onDayMouseOver");
this.connect(this.dateRowsNode,"onmouseout","_onDayMouseOut");
this.connect(this.dateRowsNode,"onmousedown","_onDayMouseDown");
this.connect(this.dateRowsNode,"onmouseup","_onDayMouseUp");
},_onMonthSelect:function(_752){
var date=new this.dateClassObj(this.currentFocus);
date.setDate(1);
date.setMonth(_752);
var _753=this.dateModule.getDaysInMonth(date);
var _754=this.currentFocus.getDate();
date.setDate(Math.min(_754,_753));
this._setCurrentFocusAttr(date);
},_onDayMouseOver:function(evt){
var node=_748.contains(evt.target,"dijitCalendarDateLabel")?evt.target.parentNode:evt.target;
if(node&&((node.dijitDateValue&&!_748.contains(node,"dijitCalendarDisabledDate"))||node==this.previousYearLabelNode||node==this.nextYearLabelNode)){
_748.add(node,"dijitCalendarHoveredDate");
this._currentNode=node;
}
},_onDayMouseOut:function(evt){
if(!this._currentNode){
return;
}
if(evt.relatedTarget&&evt.relatedTarget.parentNode==this._currentNode){
return;
}
var cls="dijitCalendarHoveredDate";
if(_748.contains(this._currentNode,"dijitCalendarActiveDate")){
cls+=" dijitCalendarActiveDate";
}
_748.remove(this._currentNode,cls);
this._currentNode=null;
},_onDayMouseDown:function(evt){
var node=evt.target.parentNode;
if(node&&node.dijitDateValue&&!_748.contains(node,"dijitCalendarDisabledDate")){
_748.add(node,"dijitCalendarActiveDate");
this._currentNode=node;
}
},_onDayMouseUp:function(evt){
var node=evt.target.parentNode;
if(node&&node.dijitDateValue){
_748.remove(node,"dijitCalendarActiveDate");
}
},handleKey:function(evt){
var _755=-1,_756,_757=this.currentFocus;
switch(evt.keyCode){
case keys.RIGHT_ARROW:
_755=1;
case keys.LEFT_ARROW:
_756="day";
if(!this.isLeftToRight()){
_755*=-1;
}
break;
case keys.DOWN_ARROW:
_755=1;
case keys.UP_ARROW:
_756="week";
break;
case keys.PAGE_DOWN:
_755=1;
case keys.PAGE_UP:
_756=evt.ctrlKey||evt.altKey?"year":"month";
break;
case keys.END:
_757=this.dateModule.add(_757,"month",1);
_756="day";
case keys.HOME:
_757=new this.dateClassObj(_757);
_757.setDate(1);
break;
case keys.ENTER:
case keys.SPACE:
this.set("value",this.currentFocus);
break;
default:
return true;
}
if(_756){
_757=this.dateModule.add(_757,_756,_755);
}
this._setCurrentFocusAttr(_757);
return false;
},_onKeyDown:function(evt){
if(!this.handleKey(evt)){
_749.stop(evt);
}
},onValueSelected:function(){
},onChange:function(_758){
this.onValueSelected(_758);
},getClassForDate:function(){
}});
_750._MonthDropDownButton=_746("dijit.Calendar._MonthDropDownButton",_74f,{onMonthSelect:function(){
},postCreate:function(){
this.inherited(arguments);
this.dropDown=new _750._MonthDropDown({id:this.id+"_mdd",onChange:this.onMonthSelect});
},_setMonthAttr:function(_759){
var _75a=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_759);
this.dropDown.set("months",_75a);
this.containerNode.innerHTML=(has("ie")==6?"":"<div class='dijitSpacer'>"+this.dropDown.domNode.innerHTML+"</div>")+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_75a[_759.getMonth()]+"</div>";
}});
_750._MonthDropDown=_746("dijit.Calendar._MonthDropDown",[_74c,_74e],{months:[],templateString:"<div class='dijitCalendarMonthMenu dijitMenu' "+"data-dojo-attach-event='onclick:_onClick,onmouseover:_onMenuHover,onmouseout:_onMenuHover'></div>",_setMonthsAttr:function(_75b){
this.domNode.innerHTML=_744.map(_75b,function(_75c,idx){
return _75c?"<div class='dijitCalendarMonthLabel' month='"+idx+"'>"+_75c+"</div>":"";
}).join("");
},_onClick:function(evt){
this.onChange(_747.get(evt.target,"month"));
},onChange:function(){
},_onMenuHover:function(evt){
_748.toggle(evt.target,"dijitCalendarMonthLabelHover",evt.type=="mouseover");
}});
return _750;
});
},"davinci/review/widgets/PublishWizard":function(){
define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/StackContainer","dijit/layout/ContentPane","dijit/form/SimpleTextarea","dijit/form/NumberTextBox","dijit/form/ValidationTextBox","dijit/form/DateTextBox","dijit/form/Button","dijit/form/ComboBox","dojo/data/ItemFileWriteStore","dijit/form/CheckBox","dojox/grid/DataGrid","dojox/data/QueryReadStore","dojox/widget/Toaster","dojox/validate/regexp","dojo/string","dojo/fx","dojo/date/stamp","dijit/Tree","dojo/Deferred","dojo/promise/all","system/resource","davinci/Runtime","davinci/Workbench","davinci/model/resource/Folder","davinci/model/resource/File","davinci/review/model/resource/Empty","davinci/review/model/resource/root","dijit/tree/TreeStoreModel","davinci/review/model/store/GeneralReviewReadStore","dojo/i18n!./nls/widgets","dojo/i18n!dijit/nls/common","dojo/text!./templates/PublishWizard.html","dojo/text!./templates/MailFailureDialogContent.html"],function(_75d,_75e,_75f,_760,_761,_762,_763,_764,_765,_766,_767,_768,_769,_76a,_76b,_76c,_76d,_76e,_76f,_770,_771,Tree,_772,all,_773,_774,_775,_776,File,_777,_778,_779,_77a,_77b,_77c,_77d,_77e){
var _77f=_75d(dijit._TreeNode,{postCreate:function(){
this.inherited(arguments);
var _780=dojo.create("img",{src:"app/dojo/resources/blank.gif","class":"deleteImg"});
dojo.connect(_780,"onclick",this,dojo.hitch(this,function(){
dojo.publish("/davinci/review/deleteReviewFile",[this.item]);
}));
dojo.place(_780,this.rowNode,"first");
dojo.style(this.rowNode,{width:"99%"});
dojo.style(this.containerNode,{display:"block"});
}});
var _781=_75d(Tree,{_createTreeNode:function(args){
return new _77f(args);
}});
return _75d("davinci.review.widgets.PublishWizard",[_75e,_75f],{templateString:_77d,postMixInProperties:function(){
this.inherited(arguments);
dojo.mixin(this,_77b);
dojo.mixin(this,_77c);
},postCreate:function(){
var sc=this.reviewerStackContainer=new _761({},this.reviewerStackContainer);
var _782=this.page1=new _762({style:"overflow:hidden;"});
var _783=this.page2=new _762({style:"overflow:hidden;"});
var _784=this.page3=new _762({style:"overflow:hidden;"});
this.reviewerStackContainer.addChild(_782);
this.reviewerStackContainer.addChild(_783);
this.reviewerStackContainer.addChild(_784);
this._initPage1();
this._initPage2();
this._initPage3();
this._initButtons();
dojo.place(this.page1Node,_782.domNode);
dojo.place(this.page2Node,_783.domNode);
dojo.place(this.page3Node,_784.domNode);
sc.startup();
this._subs=[dojo.subscribe(sc.id+"-selectChild",dojo.hitch(this,this._onPageSelected)),dojo.subscribe("/davinci/review/publish/valueChanged",dojo.hitch(this,this.updateSubmit)),dojo.subscribe("/davinci/review/deleteReviewFile",dojo.hitch(this,this.delFiles)),dojo.subscribe("/davinci/review/deleteReviewer",dojo.hitch(this,this.delRow))];
},_initPage1:function(){
this.versionTitle=new _765({onChange:this._onValueChange,required:true},this.versionTitle);
this.receiveEmail=new _76a({checked:true},this.receiveEmail);
this.descriptions=new _763({style:"width:460px;height:100px;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:100%;"},this.descriptions);
this.desireWidth=new _764({constraints:{min:0,places:0},value:1024,style:"width:85px"},this.desireWidth);
this.desireHeight=new _764({constraints:{min:0,places:0},value:768,style:"width:85px"},this.desireHeight);
var _785=new Date();
this.dueDate=new _766({onChange:this._onValueChange,type:"text",constraints:{min:new Date(_785.getFullYear(),_785.getMonth(),_785.getDate())}},this.dueDate);
},_initPage2:function(){
var _786=[];
var _787=this.fileIndex=1;
this.reviewFiles=_786;
var _788=this.sourceTreeModel=new _779({deferItemLoadingUntilExpand:true,store:new _77a({root:new _776(_775.getProject(),null),getLabel:function(item){
var _789=item.getName();
if(item.link){
_789=_789+"  ["+item.link+"]";
}
return _789;
}})});
var _78a=function(item){
this.addFiles([item]);
};
var _78b=this.sourceTree=new Tree({id:"reviewWizardSourceTree",persist:false,showRoot:false,model:_788,labelAttr:"name",getIconClass:dojo.hitch(this,this._getIconClass),isMultiSelect:true,onDblClick:dojo.hitch(this,_78a),transforms:[function(_78c){
return _78c.sort(function(a,b){
a=a.name.toLowerCase();
b=b.name.toLowerCase();
return a<b?-1:(a>b?1:0);
});
}]});
this.sourceTreeNode.appendChild(_78b.domNode);
_78b.startup();
var _78d=this.targetTreeModel=new _779({store:new _77a({root:new _777(),getLabel:function(item){
var _78e=item.getName();
if(item.link){
_78e=_78e+"  ["+item.link+"]";
}
return _78e;
}})});
var _78f=this.targetTree=new _781({id:"reviewWizardTargetTree",showRoot:false,model:_78d,labelAttr:"name",getIconClass:dojo.hitch(this,this._getIconClass),isMultiSelect:true});
this.targetTreeNode.appendChild(_78f.domNode);
_78f.startup();
},_initPage3:function(){
var _790=function(_791){
if(!this.photoRepositoryUrl){
this.photoRepositoryUrl=_774.serverJSONRequest({url:"cmd/getBluePageInfo",handleAs:"text",content:{"type":"photo"},sync:true,});
}
if(this.photoRepositoryUrl===""||this.photoRepositoryUrl=="not-implemented"){
this.photoRepositoryUrl="app/davinci/review/resources/img/profileNoPhoto.gif?";
}
return "<img src=\""+this.photoRepositoryUrl+_791+"\" width=\"35px\" height=\"35px\" alt=\"User Photo\"></img>";
}.bind(this);
var _792=function(_793){
return "<a href=\"javascript:dojo.publish('/davinci/review/deleteReviewer',[])\"><img class=\"delImg\" src=\"app/davinci/review/resources/img/del.gif\"/></a>";
};
var _794=[{cells:[{name:_77b.user,field:"email",formatter:_790,width:"70px",styles:"text-align: center;"},{name:_77b.emailAddress,field:"displayName",width:"320px"},{name:_77b.action,field:"action",formatter:_792,width:"70px",styles:"text-align: center;"}]}];
var _795={identifier:"email",label:"name",items:[]};
this.userData=_795.items;
var _796=new _769({data:_795});
this.jsonStore=_796;
var grid=new _76b({elasticView:"1",store:_796,structure:_794,style:"height:100%;width:100%;",canSort:function(_797){
if(_797==1){
return false;
}
return true;
},canResize:function(){
return false;
},delRow:function(e){
this.removeSelectedRows();
_796.save();
}});
this.grid=grid;
this.userGrid.appendChild(grid.domNode);
grid.startup();
this.addReviewerButton=new _767({disabled:true,onClick:dojo.hitch(this,this.addReviewer),label:"<div style='width:75px;height:10px;margin:-6px 0 0 0'>"+_77b.add+"</div>"},this.addReviewerButton);
var _798=new _76c({url:"cmd/getBluePageInfo",fetch:function(_799){
var _79a=_799.query.displayName;
_79a=_79a.substring(0,_79a.length-1);
_799.serverQuery={searchname:_79a};
return this.inherited("fetch",arguments);
}});
this.addReviewerCombox=new _768({regExpGen:dojo.hitch(this,this._emailAddress),required:true,store:_798,searchAttr:"displayName",name:"displayName",autoComplete:false,hasDownArrow:false,highlightMatch:"all",style:"width:220px",onChange:dojo.hitch(this,this._reviewerComboxValueChanged),onKeyUp:dojo.hitch(this,this._updateAddButton),pageSize:10,searchDelay:500,placeHolder:_77b.enterNameOrEmail},this.addReviewerCombox);
},_emailAddress:function(_79b){
if(this.addReviewerCombox.item){
return ".*";
}
_79b=(typeof _79b=="object")?_79b:{};
if(typeof _79b.allowCruft!="boolean"){
_79b.allowCruft=false;
}
_79b.allowPort=false;
var _79c="([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+";
var _79d=_79c+"@"+_76e.host(_79b);
if(_79b.allowCruft){
_79d="<?(mailto\\:)?"+_79d+">?";
}
return _79d;
},_initButtons:function(){
this.invite=new _767({disabled:true,onClick:dojo.hitch(this,function(){
this.publish();
})},this.invite);
this.next=new _767({onClick:dojo.hitch(this,function(){
this.reviewerStackContainer.forward();
})},this.next);
this.prev=new _767({onClick:dojo.hitch(this,function(){
this.reviewerStackContainer.back();
})},this.prev);
this.saveDt=new _767({onClick:dojo.hitch(this,function(){
this.publish(true);
})},this.saveDt);
},_reviewerComboxValueChanged:function(){
if(this.addReviewerCombox.item){
this.addReviewer();
}
},_updateAddButton:function(e){
var _79e=this.addReviewerCombox.isValid();
this.addReviewerButton.set("disabled",!_79e);
if(e.keyCode==13&&_79e){
this.addReviewer();
}
},delRow:function(){
this.grid.delRow();
dojo.publish("/davinci/review/publish/valueChanged");
},addReviewer:function(){
var item=this.addReviewerCombox.item;
var _79f,_7a0,name;
if(item){
_79f=this.addReviewerCombox.value.split(",").join("");
_7a0=item.i.emailaddress;
name=item.i.name;
name=name.split(",").join("");
}else{
name=_7a0=_79f=this.addReviewerCombox.get("value");
}
this.jsonStore.fetchItemByIdentity({identity:_7a0,onItem:function(i){
item=i;
}});
var grid=this.grid;
if(item){
var _7a1=grid.getItemIndex(item);
grid.scrollToRow(_7a1);
var node=grid.getRowNode(_7a1);
dojo.fx.chain([dojo.fadeOut({node:node,duration:300}),dojo.fadeIn({node:node,duration:700}),dojo.fadeOut({node:node,duration:300}),dojo.fadeIn({node:node,duration:700})]).play();
node.removeAttribute("style");
}else{
this.jsonStore.newItem({name:name,email:_7a0,displayName:_79f});
grid.scrollToRow(grid.get("rowCount"));
this.addReviewerCombox.item=null;
this.addReviewerCombox.reset();
this.addReviewerButton.set("disabled",true);
dojo.publish("/davinci/review/publish/valueChanged");
}
},_onValueChange:function(){
dojo.publish("/davinci/review/publish/valueChanged");
},_onPageSelected:function(page){
this.prev.set("disabled",page.isFirstChild);
this.next.set("disabled",page.isLastChild);
dojo.removeClass(this.navPage1,"current");
dojo.removeClass(this.navPage2,"current");
dojo.removeClass(this.navPage3,"current");
if(page==this.page1){
dojo.addClass(this.navPage1,"current");
}
if(page==this.page2){
dojo.addClass(this.navPage2,"current");
}
if(page==this.page3){
dojo.addClass(this.navPage3,"current");
}
},updateSubmit:function(){
var _7a2=this.versionTitle.isValid()&&this.dueDate.isValid();
var _7a3=this.reviewFiles&&this.reviewFiles.length>0;
var _7a4=this.userData.length>0;
dojo.removeClass(this.navPage1Icon,_7a2?"todo":"done");
dojo.addClass(this.navPage1Icon,_7a2?"done":"todo");
dojo.removeClass(this.navPage2Icon,_7a3?"todo":"done");
dojo.addClass(this.navPage2Icon,_7a3?"done":"todo");
dojo.removeClass(this.navPage3Icon,_7a4?"todo":"done");
dojo.addClass(this.navPage3Icon,_7a4?"done":"todo");
this.invite.set("disabled",!(_7a2&&_7a3&&_7a4));
var _7a5="";
if(!_7a4){
_7a5=_77b.noReviewersSelected;
}
if(!_7a3){
_7a5=_77b.noFilesSelected;
}
if(!this.dueDate.isValid()){
_7a5=_77b.dueDateIncorrect;
}
if(!this.versionTitle.isValid()){
_7a5=_77b.titleRequired;
}
this.reviewMsg.innerHTML=_7a5;
},select:function(evt){
var _7a6=evt.target;
var _7a7=this.reviewerStackContainer;
if(_7a6==this.navPage1||_7a6==this.navPage1Icon){
_7a7.selectChild(this.page1,true);
}else{
if(_7a6==this.navPage2||_7a6==this.navPage2Icon){
_7a7.selectChild(this.page2,true);
}else{
if(_7a6==this.navPage3||_7a6==this.navPage3Icon){
_7a7.selectChild(this.page3,true);
}
}
}
},update:function(){
var _7a8=this.targetTreeModel;
_7a8.onChildrenChange(_7a8.root,_7a8.root.children);
},containReviewFile:function(_7a9){
var _7aa=this.reviewFiles||[];
if(!isNaN(_7a9)){
for(var i=0;i<_7aa.length;i++){
if(_7aa[i].index==_7a9){
return true;
}
}
}else{
for(var i=0;i<_7aa.length;i++){
if(_7aa[i]==_7a9){
return true;
}
}
}
return false;
},getChildrenFiles:function(item){
var _7ab=this.reviewFiles||[];
var _7ac=this.targetTreeModel;
if(item.elementType=="File"){
if(!this.containReviewFile(item)){
item.index=this.fileIndex++;
_7ab.push(item);
var file=new File(item.name,_7ac.root);
file.index=item.index;
_7ac.root.children.push(file);
}
}else{
if(item.elementType=="Folder"){
item.getChildren(function(_7ad){
dojo.forEach(_7ad,dojo.hitch(this,function(item){
if(item.elementType=="File"){
this.getChildrenFiles(item);
}
}.bind(this)));
}.bind(this));
}
}
},addSelectFiles:function(){
var _7ae=this.sourceTree.get("selectedItems");
this.addFiles(_7ae);
},addFiles:function(_7af){
var _7b0=this.sourceTree.get("selectedItems");
if(_7af){
_7b0=_7af;
}
dojo.forEach(_7b0,this.getChildrenFiles,this);
this.update();
dojo.publish("/davinci/review/publish/valueChanged");
},delFiles:function(item){
var _7b1=this.reviewFiles,_7b2=this.targetTree.get("selectedItems");
if(item){
_7b2=[item];
}
dojo.forEach(_7b2,dojo.hitch(this,function(item){
if(item.index){
var tmp,i;
for(i=0;i<_7b1.length;i++){
if(item.index==_7b1[i].index){
tmp=_7b1[i];
_7b1.splice(i,1);
break;
}
}
if(!tmp){
return;
}
var list=item.parent.children;
for(i=0;i<list.length;i++){
if(item==list[i]){
item.parent.children.splice(i,1);
break;
}
}
this.update(tmp);
}
}));
dojo.publish("/davinci/review/publish/valueChanged");
},_getIconClass:function(item,_7b3){
if(item.elementType=="Folder"){
return _7b3?"dijitFolderOpened":"dijitFolderClosed";
}
if(item.elementType=="File"){
var icon;
var _7b4=item.getExtension();
var _7b5=_774.getExtension("davinci.fileType",function(_7b6){
return _7b6.extension==_7b4;
});
if(_7b5){
icon=_7b5.iconClass;
}
return icon||"dijitLeaf";
}
return "dijitLeaf";
},initData:function(node,_7b7){
var _7b8=new _772();
this.node=node;
this.isRestart=_7b7;
if(!node){
var _7b9=_774.serverJSONRequest({url:"cmd/getLatestVersionId",sync:true});
this.versionTitle.set("value",dojo.string.substitute(_77b.defaultReviewTitle,[_7b9]));
}
if(node){
var _7ba=!_7b7?node.name:node.name+" (R)";
this.versionTitle.set("value",_7ba);
if(!this.isRestart){
this.dueDate.set("value",node.dueDate=="infinite"?new Date(""):node.dueDate);
}
this.desireWidth.set("value",node.width===0?"":node.width);
this.desireHeight.set("value",node.height===0?"":node.height);
if(node.description){
this.descriptions.set("value",node.description);
}
this.receiveEmail.set("value",node.receiveEmail);
node.getChildren(function(_7bb){
dojo.forEach(_7bb,function(item){
var file=_773.findResource(item.name);
if(file!=null){
this.addFiles([file]);
}
}.bind(this));
for(var i=0;i<node.reviewers.length;i++){
if(node.reviewers[i].email!=node.designerEmail){
var _7bc=_774.getUserDisplayNamePlusEmail({email:node.reviewers[i].email,userId:node.reviewers[i].name});
this.jsonStore.newItem({name:node.reviewers[i].name,email:node.reviewers[i].email,displayName:_7bc});
}
}
_7b8.resolve();
}.bind(this));
}else{
_7b8.resolve();
}
return _7b8;
},publish:function(_7bd){
var _7be="";
for(var i=0;i<this.userData.length;i++){
_7be=_7be+this.userData[i].email+",";
}
var _7bf=this.descriptions;
var _7c0=_7bf.value;
var _7c1=this.versionTitle.value;
var _7c2=this.dueDate.get("value");
var _7c3=_7c2?_771.toISOString(_7c2,{zulu:true}):"infinite";
var _7c4=this.desireWidth.value||0;
var _7c5=this.desireHeight.value||0;
var _7c6=dojo.map(this.reviewFiles,function(item){
var path=item.getPath();
if(path.length>2&&path.indexOf("./")==0){
path=path.substring(2);
}
return path;
});
var _7c7=this.receiveEmail.get("value")=="on"?"true":"false";
var _7c8={isUpdate:this.node&&!this.isRestart,isRestart:this.isRestart,vTime:this.node?this.node.timeStamp:null,emails:_7be,message:_7c0,versionTitle:_7c1,resources:_7c6,desireWidth:_7c4,desireHeight:_7c5,savingDraft:_7bd,dueDate:_7c3,receiveEmail:_7c7};
var _7c9=dojo.objectToQuery(_7c8);
dojo.xhrPost({url:"cmd/publish"+"?"+_7c9,sync:false,handleAs:"json",error:function(_7ca){
var msg=_7ca.responseText;
msg=msg.substring(msg.indexOf("<title>")+7,msg.indexOf("</title>"));
_774.handleError(_76f.substitute(_77b.errorPublish,[_7ca,msg]));
}}).then(function(_7cb){
if(typeof hasToaster=="undefined"){
new _76d({position:"br-left",duration:4000,messageTopic:"/davinci/review/resourceChanged"});
hasToaster=true;
}
if(_7cb.length>0){
var _7cc=_7cb[0];
if(_7cc.result=="OK"){
if(_7bd){
dojo.publish("/davinci/review/resourceChanged",[{message:_77b.draftSaved,type:"message"},"draft",this.node]);
}else{
if(_7cc.emailResult){
if(_7cc.emailResult=="OK"){
dojo.publish("/davinci/review/resourceChanged",[{message:_77b.inviteSuccessful,type:"message"},"create",this.node]);
}else{
var _7cd=_76f.substitute(_77e,{htmlContent:_7cc.emailResult,inviteNotSent:_77b.inviteNotSent,mailFailureMsg:_77b.mailFailureMsg,});
dojo.publish("/davinci/review/resourceChanged",[{message:_77b.inviteFailed,type:"warning"},"create",this.node]);
_775.showMessage(_77b.warning,_7cd);
}
var _7ce=_7cc.version;
var _7cf=_7cc.designer;
if(_7ce&&_7cf){
_778.findVersion(_7cf,_7ce).then(function(node){
if(node){
node.getChildren(function(_7d0){
if(_7d0.length>1){
return;
}
dojo.forEach(_7d0,function(_7d1){
davinci.Workbench.openEditor({fileName:_7d1,content:node.getText()});
});
}.bind(this));
}
}.bind(this));
}
}
}
}
}
}.bind(this));
this.onClose();
},onClose:function(){
},destroy:function(){
this.inherited(arguments);
this._subs.forEach(dojo.unsubscribe);
delete this._subs;
this.sourceTree.destroyRecursive();
this.targetTree.destroyRecursive();
}});
});
},"dojox/validate/regexp":function(){
define("dojox/validate/regexp",["dojo/_base/lang","dojo/regexp","dojox/main"],function(lang,_7d2,_7d3){
var _7d4=lang.getObject("validate.regexp",true,_7d3);
_7d4=_7d3.validate.regexp={ipAddress:function(_7d5){
_7d5=(typeof _7d5=="object")?_7d5:{};
if(typeof _7d5.allowDottedDecimal!="boolean"){
_7d5.allowDottedDecimal=true;
}
if(typeof _7d5.allowDottedHex!="boolean"){
_7d5.allowDottedHex=true;
}
if(typeof _7d5.allowDottedOctal!="boolean"){
_7d5.allowDottedOctal=true;
}
if(typeof _7d5.allowDecimal!="boolean"){
_7d5.allowDecimal=true;
}
if(typeof _7d5.allowHex!="boolean"){
_7d5.allowHex=true;
}
if(typeof _7d5.allowIPv6!="boolean"){
_7d5.allowIPv6=true;
}
if(typeof _7d5.allowHybrid!="boolean"){
_7d5.allowHybrid=true;
}
var _7d6="((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var _7d7="(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]";
var _7d8="(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]";
var _7d9="(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|"+"4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])";
var _7da="0[xX]0*[\\da-fA-F]{1,8}";
var _7db="([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}";
var _7dc="([\\da-fA-F]{1,4}\\:){6}"+"((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var a=[];
if(_7d5.allowDottedDecimal){
a.push(_7d6);
}
if(_7d5.allowDottedHex){
a.push(_7d7);
}
if(_7d5.allowDottedOctal){
a.push(_7d8);
}
if(_7d5.allowDecimal){
a.push(_7d9);
}
if(_7d5.allowHex){
a.push(_7da);
}
if(_7d5.allowIPv6){
a.push(_7db);
}
if(_7d5.allowHybrid){
a.push(_7dc);
}
var _7dd="";
if(a.length>0){
_7dd="("+a.join("|")+")";
}
return _7dd;
},host:function(_7de){
_7de=(typeof _7de=="object")?_7de:{};
if(typeof _7de.allowIP!="boolean"){
_7de.allowIP=true;
}
if(typeof _7de.allowLocal!="boolean"){
_7de.allowLocal=false;
}
if(typeof _7de.allowPort!="boolean"){
_7de.allowPort=true;
}
if(typeof _7de.allowNamed!="boolean"){
_7de.allowNamed=false;
}
var _7df="(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)";
var _7e0="(?:[a-zA-Z](?:[-\\da-zA-Z]{0,6}[\\da-zA-Z])?)";
var _7e1=_7de.allowPort?"(\\:\\d+)?":"";
var _7e2="((?:"+_7df+"\\.)+"+_7e0+"\\.?)";
if(_7de.allowIP){
_7e2+="|"+_7d4.ipAddress(_7de);
}
if(_7de.allowLocal){
_7e2+="|localhost";
}
if(_7de.allowNamed){
_7e2+="|^[^-][a-zA-Z0-9_-]*";
}
return "("+_7e2+")"+_7e1;
},url:function(_7e3){
_7e3=(typeof _7e3=="object")?_7e3:{};
if(!("scheme" in _7e3)){
_7e3.scheme=[true,false];
}
var _7e4=_7d2.buildGroupRE(_7e3.scheme,function(q){
if(q){
return "(https?|ftps?)\\://";
}
return "";
});
var _7e5="(/(?:[^?#\\s/]+/)*(?:[^?#\\s/]+(?:\\?[^?#\\s/]*)?(?:#[A-Za-z][\\w.:-]*)?)?)?";
return _7e4+_7d4.host(_7e3)+_7e5;
},emailAddress:function(_7e6){
_7e6=(typeof _7e6=="object")?_7e6:{};
if(typeof _7e6.allowCruft!="boolean"){
_7e6.allowCruft=false;
}
_7e6.allowPort=false;
var _7e7="([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+";
var _7e8=_7e7+"@"+_7d4.host(_7e6);
if(_7e6.allowCruft){
_7e8="<?(mailto\\:)?"+_7e8+">?";
}
return _7e8;
},emailAddressList:function(_7e9){
_7e9=(typeof _7e9=="object")?_7e9:{};
if(typeof _7e9.listSeparator!="string"){
_7e9.listSeparator="\\s;,";
}
var _7ea=_7d4.emailAddress(_7e9);
var _7eb="("+_7ea+"\\s*["+_7e9.listSeparator+"]\\s*)*"+_7ea+"\\s*["+_7e9.listSeparator+"]?\\s*";
return _7eb;
},numberFormat:function(_7ec){
_7ec=(typeof _7ec=="object")?_7ec:{};
if(typeof _7ec.format=="undefined"){
_7ec.format="###-###-####";
}
var _7ed=function(_7ee){
return _7d2.escapeString(_7ee,"?").replace(/\?/g,"\\d?").replace(/#/g,"\\d");
};
return _7d2.buildGroupRE(_7ec.format,_7ed);
},ca:{postalCode:function(){
return "([A-Z][0-9][A-Z] [0-9][A-Z][0-9])";
},province:function(){
return "(AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT)";
}},us:{state:function(_7ef){
_7ef=(typeof _7ef=="object")?_7ef:{};
if(typeof _7ef.allowTerritories!="boolean"){
_7ef.allowTerritories=true;
}
if(typeof _7ef.allowMilitary!="boolean"){
_7ef.allowMilitary=true;
}
var _7f0="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|"+"NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
var _7f1="AS|FM|GU|MH|MP|PW|PR|VI";
var _7f2="AA|AE|AP";
if(_7ef.allowTerritories){
_7f0+="|"+_7f1;
}
if(_7ef.allowMilitary){
_7f0+="|"+_7f2;
}
return "("+_7f0+")";
}}};
return _7d4;
});
},"dojo/data/ItemFileReadStore":function(){
define(["../_base/kernel","../_base/lang","../_base/declare","../_base/array","../_base/xhr","../Evented","./util/filter","./util/simpleFetch","../date/stamp"],function(_7f3,lang,_7f4,_7f5,xhr,_7f6,_7f7,_7f8,_7f9){
var _7fa=_7f4("dojo.data.ItemFileReadStore",[_7f6],{constructor:function(_7fb){
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=_7fb.url;
this._ccUrl=_7fb.url;
this.url=_7fb.url;
this._jsonData=_7fb.data;
this.data=null;
this._datatypeMap=_7fb.typeMap||{};
if(!this._datatypeMap["Date"]){
this._datatypeMap["Date"]={type:Date,deserialize:function(_7fc){
return _7f9.fromISOString(_7fc);
}};
}
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._reverseRefMap="_RRM";
this._loadInProgress=false;
this._queuedFetches=[];
if(_7fb.urlPreventCache!==undefined){
this.urlPreventCache=_7fb.urlPreventCache?true:false;
}
if(_7fb.hierarchical!==undefined){
this.hierarchical=_7fb.hierarchical?true:false;
}
if(_7fb.clearOnClose){
this.clearOnClose=true;
}
if("failOk" in _7fb){
this.failOk=_7fb.failOk?true:false;
}
},url:"",_ccUrl:"",data:null,typeMap:null,clearOnClose:false,urlPreventCache:false,failOk:false,hierarchical:true,_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error(this.declaredClass+": Invalid item argument.");
}
},_assertIsAttribute:function(_7fd){
if(typeof _7fd!=="string"){
throw new Error(this.declaredClass+": Invalid attribute argument.");
}
},getValue:function(item,_7fe,_7ff){
var _800=this.getValues(item,_7fe);
return (_800.length>0)?_800[0]:_7ff;
},getValues:function(item,_801){
this._assertIsItem(item);
this._assertIsAttribute(_801);
return (item[_801]||[]).slice(0);
},getAttributes:function(item){
this._assertIsItem(item);
var _802=[];
for(var key in item){
if((key!==this._storeRefPropName)&&(key!==this._itemNumPropName)&&(key!==this._rootItemPropName)&&(key!==this._reverseRefMap)){
_802.push(key);
}
}
return _802;
},hasAttribute:function(item,_803){
this._assertIsItem(item);
this._assertIsAttribute(_803);
return (_803 in item);
},containsValue:function(item,_804,_805){
var _806=undefined;
if(typeof _805==="string"){
_806=_7f7.patternToRegExp(_805,false);
}
return this._containsValue(item,_804,_805,_806);
},_containsValue:function(item,_807,_808,_809){
return _7f5.some(this.getValues(item,_807),function(_80a){
if(_80a!==null&&!lang.isObject(_80a)&&_809){
if(_80a.toString().match(_809)){
return true;
}
}else{
if(_808===_80a){
return true;
}
}
});
},isItem:function(_80b){
if(_80b&&_80b[this._storeRefPropName]===this){
if(this._arrayOfAllItems[_80b[this._itemNumPropName]]===_80b){
return true;
}
}
return false;
},isItemLoaded:function(_80c){
return this.isItem(_80c);
},loadItem:function(_80d){
this._assertIsItem(_80d.item);
},getFeatures:function(){
return this._features;
},getLabel:function(item){
if(this._labelAttr&&this.isItem(item)){
return this.getValue(item,this._labelAttr);
}
return undefined;
},getLabelAttributes:function(item){
if(this._labelAttr){
return [this._labelAttr];
}
return null;
},filter:function(_80e,_80f,_810){
var _811=[],i,key;
if(_80e.query){
var _812,_813=_80e.queryOptions?_80e.queryOptions.ignoreCase:false;
var _814={};
for(key in _80e.query){
_812=_80e.query[key];
if(typeof _812==="string"){
_814[key]=_7f7.patternToRegExp(_812,_813);
}else{
if(_812 instanceof RegExp){
_814[key]=_812;
}
}
}
for(i=0;i<_80f.length;++i){
var _815=true;
var _816=_80f[i];
if(_816===null){
_815=false;
}else{
for(key in _80e.query){
_812=_80e.query[key];
if(!this._containsValue(_816,key,_812,_814[key])){
_815=false;
}
}
}
if(_815){
_811.push(_816);
}
}
_810(_811,_80e);
}else{
for(i=0;i<_80f.length;++i){
var item=_80f[i];
if(item!==null){
_811.push(item);
}
}
_810(_811,_80e);
}
},_fetchItems:function(_817,_818,_819){
var self=this;
if(this._loadFinished){
this.filter(_817,this._getItemsArray(_817.queryOptions),_818);
}else{
if(this._jsonFileUrl!==this._ccUrl){
_7f3.deprecated(this.declaredClass+": ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_817,filter:lang.hitch(self,"filter"),findCallback:lang.hitch(self,_818)});
}else{
this._loadInProgress=true;
var _81a={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _81b=xhr.get(_81a);
_81b.addCallback(function(data){
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
self.filter(_817,self._getItemsArray(_817.queryOptions),_818);
self._handleQueuedFetches();
}
catch(e){
self._loadFinished=true;
self._loadInProgress=false;
_819(e,_817);
}
});
_81b.addErrback(function(_81c){
self._loadInProgress=false;
_819(_81c,_817);
});
var _81d=null;
if(_817.abort){
_81d=_817.abort;
}
_817.abort=function(){
var df=_81b;
if(df&&df.fired===-1){
df.cancel();
df=null;
}
if(_81d){
_81d.call(_817);
}
};
}
}else{
if(this._jsonData){
try{
this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
self.filter(_817,this._getItemsArray(_817.queryOptions),_818);
}
catch(e){
_819(e,_817);
}
}else{
_819(new Error(this.declaredClass+": No JSON source data was provided as either URL or a nested Javascript object."),_817);
}
}
}
},_handleQueuedFetches:function(){
if(this._queuedFetches.length>0){
for(var i=0;i<this._queuedFetches.length;i++){
var _81e=this._queuedFetches[i],_81f=_81e.args,_820=_81e.filter,_821=_81e.findCallback;
if(_820){
_820(_81f,this._getItemsArray(_81f.queryOptions),_821);
}else{
this.fetchItemByIdentity(_81f);
}
}
this._queuedFetches=[];
}
},_getItemsArray:function(_822){
if(_822&&_822.deep){
return this._arrayOfAllItems;
}
return this._arrayOfTopLevelItems;
},close:function(_823){
if(this.clearOnClose&&this._loadFinished&&!this._loadInProgress){
if(((this._jsonFileUrl==""||this._jsonFileUrl==null)&&(this.url==""||this.url==null))&&this.data==null){
}
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._itemsByIdentity=null;
this._loadInProgress=false;
this._queuedFetches=[];
}
},_getItemsFromLoadedData:function(_824){
var _825=false,self=this;
function _826(_827){
return (_827!==null)&&(typeof _827==="object")&&(!lang.isArray(_827)||_825)&&(!lang.isFunction(_827))&&(_827.constructor==Object||lang.isArray(_827))&&(typeof _827._reference==="undefined")&&(typeof _827._type==="undefined")&&(typeof _827._value==="undefined")&&self.hierarchical;
};
function _828(_829){
self._arrayOfAllItems.push(_829);
for(var _82a in _829){
var _82b=_829[_82a];
if(_82b){
if(lang.isArray(_82b)){
var _82c=_82b;
for(var k=0;k<_82c.length;++k){
var _82d=_82c[k];
if(_826(_82d)){
_828(_82d);
}
}
}else{
if(_826(_82b)){
_828(_82b);
}
}
}
}
};
this._labelAttr=_824.label;
var i,item;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=_824.items;
for(i=0;i<this._arrayOfTopLevelItems.length;++i){
item=this._arrayOfTopLevelItems[i];
if(lang.isArray(item)){
_825=true;
}
_828(item);
item[this._rootItemPropName]=true;
}
var _82e={},key;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
for(key in item){
if(key!==this._rootItemPropName){
var _82f=item[key];
if(_82f!==null){
if(!lang.isArray(_82f)){
item[key]=[_82f];
}
}else{
item[key]=[null];
}
}
_82e[key]=key;
}
}
while(_82e[this._storeRefPropName]){
this._storeRefPropName+="_";
}
while(_82e[this._itemNumPropName]){
this._itemNumPropName+="_";
}
while(_82e[this._reverseRefMap]){
this._reverseRefMap+="_";
}
var _830;
var _831=_824.identifier;
if(_831){
this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=_831;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
_830=item[_831];
var _832=_830[0];
if(!Object.hasOwnProperty.call(this._itemsByIdentity,_832)){
this._itemsByIdentity[_832]=item;
}else{
if(this._jsonFileUrl){
throw new Error(this.declaredClass+":  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+_831+"].  Value collided: ["+_832+"]");
}else{
if(this._jsonData){
throw new Error(this.declaredClass+":  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+_831+"].  Value collided: ["+_832+"]");
}
}
}
}
}else{
this._features["dojo.data.api.Identity"]=Number;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
item[this._storeRefPropName]=this;
item[this._itemNumPropName]=i;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
for(key in item){
_830=item[key];
for(var j=0;j<_830.length;++j){
_82f=_830[j];
if(_82f!==null&&typeof _82f=="object"){
if(("_type" in _82f)&&("_value" in _82f)){
var type=_82f._type;
var _833=this._datatypeMap[type];
if(!_833){
throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+type+"'");
}else{
if(lang.isFunction(_833)){
_830[j]=new _833(_82f._value);
}else{
if(lang.isFunction(_833.deserialize)){
_830[j]=_833.deserialize(_82f._value);
}else{
throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function");
}
}
}
}
if(_82f._reference){
var _834=_82f._reference;
if(!lang.isObject(_834)){
_830[j]=this._getItemByIdentity(_834);
}else{
for(var k=0;k<this._arrayOfAllItems.length;++k){
var _835=this._arrayOfAllItems[k],_836=true;
for(var _837 in _834){
if(_835[_837]!=_834[_837]){
_836=false;
}
}
if(_836){
_830[j]=_835;
}
}
}
if(this.referenceIntegrity){
var _838=_830[j];
if(this.isItem(_838)){
this._addReferenceToMap(_838,item,key);
}
}
}else{
if(this.isItem(_82f)){
if(this.referenceIntegrity){
this._addReferenceToMap(_82f,item,key);
}
}
}
}
}
}
}
},_addReferenceToMap:function(_839,_83a,_83b){
},getIdentity:function(item){
var _83c=this._features["dojo.data.api.Identity"];
if(_83c===Number){
return item[this._itemNumPropName];
}else{
var _83d=item[_83c];
if(_83d){
return _83d[0];
}
}
return null;
},fetchItemByIdentity:function(_83e){
var item,_83f;
if(!this._loadFinished){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
_7f3.deprecated(this.declaredClass+": ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null&&this._jsonData==null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_83e});
}else{
this._loadInProgress=true;
var _840={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _841=xhr.get(_840);
_841.addCallback(function(data){
var _842=_83e.scope?_83e.scope:_7f3.global;
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
item=self._getItemByIdentity(_83e.identity);
if(_83e.onItem){
_83e.onItem.call(_842,item);
}
self._handleQueuedFetches();
}
catch(error){
self._loadInProgress=false;
if(_83e.onError){
_83e.onError.call(_842,error);
}
}
});
_841.addErrback(function(_843){
self._loadInProgress=false;
if(_83e.onError){
var _844=_83e.scope?_83e.scope:_7f3.global;
_83e.onError.call(_844,_843);
}
});
}
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
item=self._getItemByIdentity(_83e.identity);
if(_83e.onItem){
_83f=_83e.scope?_83e.scope:_7f3.global;
_83e.onItem.call(_83f,item);
}
}
}
}else{
item=this._getItemByIdentity(_83e.identity);
if(_83e.onItem){
_83f=_83e.scope?_83e.scope:_7f3.global;
_83e.onItem.call(_83f,item);
}
}
},_getItemByIdentity:function(_845){
var item=null;
if(this._itemsByIdentity){
if(Object.hasOwnProperty.call(this._itemsByIdentity,_845)){
item=this._itemsByIdentity[_845];
}
}else{
if(Object.hasOwnProperty.call(this._arrayOfAllItems,_845)){
item=this._arrayOfAllItems[_845];
}
}
if(item===undefined){
item=null;
}
return item;
},getIdentityAttributes:function(item){
var _846=this._features["dojo.data.api.Identity"];
if(_846===Number){
return null;
}else{
return [_846];
}
},_forceLoad:function(){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
_7f3.deprecated(this.declaredClass+": ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
var _847={url:this._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk,sync:true};
var _848=xhr.get(_847);
_848.addCallback(function(data){
try{
if(self._loadInProgress!==true&&!self._loadFinished){
self._getItemsFromLoadedData(data);
self._loadFinished=true;
}else{
if(self._loadInProgress){
throw new Error(this.declaredClass+":  Unable to perform a synchronous load, an async load is in progress.");
}
}
}
catch(e){
throw e;
}
});
_848.addErrback(function(_849){
throw _849;
});
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
}
}
}});
lang.extend(_7fa,_7f8);
return _7fa;
});
},"davinci/review/actions/EditVersionAction":function(){
define(["dojo/_base/declare","./_ReviewNavigatorCommon","./PublishAction","../../Runtime","dojox/widget/Toaster","dojo/i18n!./nls/actions"],function(_84a,_84b,_84c,_84d,_84e,nls){
return _84a("davinci.review.actions.EditVersionAction",[_84b],{run:function(_84f){
var _850=this._getSelection(_84f);
if(!_850||!_850.length){
return;
}
var item=_850[0].resource.elementType=="ReviewFile"?_850[0].resource.parent:_850[0].resource;
var _851=new _84c(item);
_851.run();
},isEnabled:function(_852){
var _853=this._getSelection(_852);
if(_853&&_853.length>0){
var item=_853[0].resource.elementType=="ReviewFile"?_853[0].resource.parent:_853[0].resource;
if(item.designerId==davinci.Runtime.userName){
return true;
}
}
return false;
}});
});
},"dojox/widget/Toaster":function(){
define("dojox/widget/Toaster",["dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/_base/fx","dojo/dom-style","dojo/dom-class","dojo/dom-geometry","dijit/registry","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/BackgroundIframe","dojo/fx","dojo/has","dojo/_base/window","dojo/window"],function(_854,lang,_855,_856,_857,_858,_859,_85a,_85b,_85c,_85d,_85e,has,_85f,_860){
lang.getObject("dojox.widget",true);
var _861=function(w){
return w.substring(0,1).toUpperCase()+w.substring(1);
};
return _854("dojox.widget.Toaster",[_85b,_85c],{templateString:"<div class=\"dijitToasterClip\" dojoAttachPoint=\"clipNode\"><div class=\"dijitToasterContainer\" dojoAttachPoint=\"containerNode\" dojoAttachEvent=\"onclick:onSelect\"><div class=\"dijitToasterContent\" dojoAttachPoint=\"contentNode\"></div></div></div>",messageTopic:"",messageTypes:{MESSAGE:"message",WARNING:"warning",ERROR:"error",FATAL:"fatal"},defaultType:"message",positionDirection:"br-up",positionDirectionTypes:["br-up","br-left","bl-up","bl-right","tr-down","tr-left","tl-down","tl-right"],duration:2000,slideDuration:500,separator:"<hr></hr>",postCreate:function(){
this.inherited(arguments);
this.hide();
_85f.body().appendChild(this.domNode);
if(this.messageTopic){
_855.subscribe(this.messageTopic,this,"_handleMessage");
}
},_handleMessage:function(_862){
if(lang.isString(_862)){
this.setContent(_862);
}else{
this.setContent(_862.message,_862.type,_862.duration);
}
},setContent:function(_863,_864,_865){
_865=_865||this.duration;
if(this.slideAnim){
if(this.slideAnim.status()!="playing"){
this.slideAnim.stop();
}
if(this.slideAnim.status()=="playing"||(this.fadeAnim&&this.fadeAnim.status()=="playing")){
setTimeout(lang.hitch(this,function(){
this.setContent(_863,_864,_865);
}),50);
return;
}
}
for(var type in this.messageTypes){
_858.remove(this.containerNode,"dijitToaster"+_861(this.messageTypes[type]));
}
_857.set(this.containerNode,"opacity",1);
this._setContent(_863);
_858.add(this.containerNode,"dijitToaster"+_861(_864||this.defaultType));
this.show();
var _866=_859.getMarginBox(this.containerNode);
this._cancelHideTimer();
if(this.isVisible){
this._placeClip();
if(!this._stickyMessage){
this._setHideTimer(_865);
}
}else{
var _867=this.containerNode.style;
var pd=this.positionDirection;
if(pd.indexOf("-up")>=0){
_867.left=0+"px";
_867.top=_866.h+10+"px";
}else{
if(pd.indexOf("-left")>=0){
_867.left=_866.w+10+"px";
_867.top=0+"px";
}else{
if(pd.indexOf("-right")>=0){
_867.left=0-_866.w-10+"px";
_867.top=0+"px";
}else{
if(pd.indexOf("-down")>=0){
_867.left=0+"px";
_867.top=0-_866.h-10+"px";
}else{
throw new Error(this.id+".positionDirection is invalid: "+pd);
}
}
}
}
this.slideAnim=_85e.slideTo({node:this.containerNode,top:0,left:0,duration:this.slideDuration});
this.connect(this.slideAnim,"onEnd",function(_868,anim){
this.fadeAnim=_856.fadeOut({node:this.containerNode,duration:1000});
this.connect(this.fadeAnim,"onEnd",function(evt){
this.isVisible=false;
this.hide();
});
this._setHideTimer(_865);
this.connect(this,"onSelect",function(evt){
this._cancelHideTimer();
this._stickyMessage=false;
this.fadeAnim.play();
});
this.isVisible=true;
});
this.slideAnim.play();
}
},_setContent:function(_869){
if(lang.isFunction(_869)){
_869(this);
return;
}
if(_869&&this.isVisible){
_869=this.contentNode.innerHTML+this.separator+_869;
}
this.contentNode.innerHTML=_869;
},_cancelHideTimer:function(){
if(this._hideTimer){
clearTimeout(this._hideTimer);
this._hideTimer=null;
}
},_setHideTimer:function(_86a){
this._cancelHideTimer();
if(_86a>0){
this._cancelHideTimer();
this._hideTimer=setTimeout(lang.hitch(this,function(evt){
if(this.bgIframe&&this.bgIframe.iframe){
this.bgIframe.iframe.style.display="none";
}
this._hideTimer=null;
this._stickyMessage=false;
this.fadeAnim.play();
}),_86a);
}else{
this._stickyMessage=true;
}
},_placeClip:function(){
var view=_860.getBox();
var _86b=_859.getMarginBox(this.containerNode);
var _86c=this.clipNode.style;
_86c.height=_86b.h+"px";
_86c.width=_86b.w+"px";
var pd=this.positionDirection;
if(pd.match(/^t/)){
_86c.top=view.t+"px";
}else{
if(pd.match(/^b/)){
_86c.top=(view.h-_86b.h-2+view.t)+"px";
}
}
if(pd.match(/^[tb]r-/)){
_86c.left=(view.w-_86b.w-1-view.l)+"px";
}else{
if(pd.match(/^[tb]l-/)){
_86c.left=0+"px";
}
}
_86c.clip="rect(0px, "+_86b.w+"px, "+_86b.h+"px, 0px)";
if(has("ie")){
if(!this.bgIframe){
this.clipNode.id=_85a.getUniqueId("dojox_widget_Toaster_clipNode");
this.bgIframe=new _85d(this.clipNode);
}
var _86d=this.bgIframe.iframe;
if(_86d){
_86d.style.display="block";
}
}
},onSelect:function(e){
},show:function(){
_857.set(this.domNode,"display","block");
this._placeClip();
if(!this._scrollConnected){
this._scrollConnected=_855.connect(_860,"onscroll",this,this._placeClip);
}
},hide:function(){
_857.set(this.domNode,"display","none");
if(this._scrollConnected){
_855.disconnect(this._scrollConnected);
this._scrollConnected=false;
}
_857.set(this.containerNode,"opacity",1);
}});
});
},"davinci/html/CSSRule":function(){
define(["dojo/_base/declare","davinci/html/CSSElement","davinci/html/CSSParser","davinci/html/CSSProperty"],function(_86e,_86f,_870,_871){
return _86e("davinci.html.CSSRule",_86f,{constructor:function(){
this.elementType="CSSRule";
this.selectors=[];
this.properties=[];
},getText:function(_872){
var s="";
_872=_872||[];
if(this.comment&&!_872.noComments){
s+=this.comment.getText(_872);
}
s+=this.getSelectorText(_872);
s=s+" {";
for(var i=0;i<this.properties.length;i++){
s=s+"\n    "+this.properties[i].getText(_872);
}
s=s+"\n}\n";
if(this.postComment&&!_872.noComments){
s+=this.postComment.getText(_872);
}
return s;
},setText:function(text){
var _873={xmode:"style",css:true};
var _874=require("davinci/html/CSSParser").parse(text,this);
dojo.mixin(this,this.children[0]);
var _875=(this.parent)?this.parent.endOffset:0;
this.startOffset=_875+1;
this.setDirty(true);
},addProperty:function(name,_876){
var _877=new _871(name,_876,this);
this.properties.push(_877);
this.setDirty(true);
this.onChange();
},insertProperty:function(name,_878,_879){
var _87a;
_87a=this.getProperty(name);
if(_87a){
this.removeProperty(name);
}
_87a=new _871(name,_878,this);
this.properties.splice(_879,0,_87a);
this.setDirty(true);
this.onChange();
},getSelectorText:function(_87b){
var s="";
for(var i=0;i<this.selectors.length;i++){
if(i>0){
s=s+", ";
}
s=s+this.selectors[i].getText(_87b);
}
return s;
},matches:function(_87c){
_87c=this._convertNode(_87c);
var _87d;
for(var i=0;i<this.selectors.length;i++){
if((_87d=this.selectors[i].matches(_87c))>=0){
return _87d;
}
}
},visit:function(_87e){
if(!_87e.visit(this)){
for(var i=0;i<this.children.length;i++){
this.children[i].visit(_87e);
}
for(var i=0;i<this.selectors.length;i++){
this.selectors[i].visit(_87e);
}
}
if(_87e.endVisit){
_87e.endVisit(this);
}
},hasSelector:function(_87f){
for(var i=0;i<this.selectors.length;i++){
if(this.selectors[i].getLabel()==_87f){
return true;
}
}
return false;
},matchesSelectors:function(_880){
for(var j=0;j<_880.length;j++){
for(var i=0;i<this.selectors.length;i++){
if(this.selectors[i].matchesSelector(_880[j])){
return true;
}
}
}
return false;
},getCSSRule:function(){
return this;
},getLabel:function(){
return this.getSelectorText({});
},getProperty:function(_881){
for(var i=0;i<this.properties.length;i++){
if(_881==this.properties[i].name){
return this.properties[i];
}
}
},hasProperty:function(_882){
for(var i=0;i<this.properties.length;i++){
if(_882==this.properties[i].name){
return true;
}
}
},getProperties:function(_883){
var _884=[];
for(var i=0;i<this.properties.length;i++){
if(!_883||_883==this.properties[i].name){
_884.push(this.properties[i]);
}
}
return _884;
},setProperty:function(name,_885){
var _886=this.getProperty(name);
if(!_885){
this.removeProperty(name);
}else{
if(_886){
_886.value=_885;
}else{
_886=new _871();
_886.name=name;
_886.value=_885;
this.properties.push(_886);
_886.parent=this;
}
}
this.setDirty(true);
this.onChange();
},removeProperty:function(_887){
for(var i=0;i<this.properties.length;i++){
if(_887==this.properties[i].name){
this.properties.splice(i,1);
}
}
this.setDirty(true);
this.onChange();
},removeAllProperties:function(){
this.properties=[];
this.setDirty(true);
this.onChange();
},removeStyleValues:function(_888){
var _889=[];
for(var i=0;i<this.properties.length;i++){
var _88a;
for(var j=0;j<_888.length&&!_88a;j++){
_88a=_888[j]==this.properties[i].name;
}
if(!_88a){
_889=this.properties[i];
}
}
this.properties=_889;
this.setDirty(true);
this.onChange();
}});
});
},"davinci/workbench/ViewPart":function(){
define(["dojo/_base/declare","davinci/workbench/_ToolbaredContainer","davinci/ve/States"],function(_88b,_88c,_88d){
return _88b("davinci.workbench.ViewPart",_88c,{constructor:function(_88e,_88f){
this.viewExt=_88e.view;
this.subscriptions=[];
this.publishing={};
},startup:function(){
this.inherited(arguments);
this.domNode.view=this;
if(this.viewExt.startup){
this.viewExt.startup();
}
},subscribe:function(_890,func){
this.subscriptions.push(dojo.subscribe(_890,this,func));
},publish:function(_891,data){
this.publishing[_891]=true;
try{
dojo.publish(_891,data);
}
catch(e){
console.error(e);
}
delete this.publishing[_891];
},destroy:function(){
dojo.forEach(this.subscriptions,dojo.unsubscribe);
delete this.subscriptions;
},_getViewActions:function(){
var _892=this.toolbarID||this.viewExt.id;
var _893=[];
var _894=davinci.Runtime.getExtensions("davinci.viewActions",function(ext){
if(_892==ext.viewContribution.targetID){
_893.push(ext.viewContribution);
return true;
}
});
return _893;
}});
});
},"davinci/actions/Action":function(){
define(["dojo/_base/declare"],function(_895){
return _895("davinci.actions.Action",null,{item:null,run:function(_896){
},isEnabled:function(_897){
return true;
},getName:function(){
return this.item.label;
}});
});
},"dijit/form/ComboButton":function(){
define(["dojo/_base/declare","dojo/_base/event","dojo/keys","../focus","./DropDownButton","dojo/text!./templates/ComboButton.html"],function(_898,_899,keys,_89a,_89b,_89c){
return _898("dijit.form.ComboButton",_89b,{templateString:_89c,_setIdAttr:"",_setTabIndexAttr:["focusNode","titleNode"],_setTitleAttr:"titleNode",optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
_89a.focus(this._popupStateNode);
_899.stop(evt);
}
},_onArrowKeyPress:function(evt){
if(evt.charOrCode==keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
_89a.focus(this.titleNode);
_899.stop(evt);
}
},focus:function(_89d){
if(!this.disabled){
_89a.focus(_89d=="start"?this.titleNode:this._popupStateNode);
}
}});
});
},"davinci/review/actions/CloseVersionAction":function(){
define(["dojo/_base/declare","./_ReviewNavigatorCommon","davinci/Runtime","dojox/widget/Toaster","dojo/i18n!./nls/actions"],function(_89e,_89f,_8a0,_8a1,nls){
var _8a2=_89e("davinci.review.actions.CloseVersionAction",[_89f],{run:function(_8a3){
var _8a4=this._getSelection(_8a3);
if(!_8a4||!_8a4.length){
return;
}
okToClose=confirm(nls.areYouSureClose);
if(!okToClose){
return;
}
var item=_8a4[0].resource.elementType=="ReviewFile"?_8a4[0].resource.parent:_8a4[0].resource;
dojo.xhrGet({url:"cmd/managerVersion",sync:false,handleAs:"text",content:{"type":"close","vTime":item.timeStamp}}).then(function(_8a5){
if(_8a5=="OK"){
if(typeof hasToaster=="undefined"){
new _8a1({position:"br-left",duration:4000,messageTopic:"/davinci/review/resourceChanged"});
hasToaster=true;
}
dojo.publish("/davinci/review/resourceChanged",[{message:nls.closeSuccessful,type:"message"},"closed",item]);
}
});
},isEnabled:function(_8a6){
var _8a7=this._getSelection(_8a6);
if(!_8a7||_8a7.length==0){
return false;
}
var item=_8a7[0].resource.elementType=="ReviewFile"?_8a7[0].resource.parent:_8a7[0].resource;
if(item.designerId==davinci.Runtime.userName){
if(!item.closed&&!item.isDraft){
return true;
}
}
return false;
}});
return _8a2;
});
},"dijit/form/RangeBoundTextBox":function(){
define(["dojo/_base/declare","dojo/i18n","./MappedTextBox"],function(_8a8,i18n,_8a9){
var _8aa=_8a8("dijit.form.RangeBoundTextBox",_8a9,{rangeMessage:"",rangeCheck:function(_8ab,_8ac){
return ("min" in _8ac?(this.compare(_8ab,_8ac.min)>=0):true)&&("max" in _8ac?(this.compare(_8ab,_8ac.max)<=0):true);
},isInRange:function(){
return this.rangeCheck(this.get("value"),this.constraints);
},_isDefinitelyOutOfRange:function(){
var val=this.get("value");
if(val==null){
return false;
}
var _8ad=false;
if("min" in this.constraints){
var min=this.constraints.min;
_8ad=this.compare(val,((typeof min=="number")&&min>=0&&val!=0)?0:min)<0;
}
if(!_8ad&&("max" in this.constraints)){
var max=this.constraints.max;
_8ad=this.compare(val,((typeof max!="number")||max>0)?max:0)>0;
}
return _8ad;
},_isValidSubset:function(){
return this.inherited(arguments)&&!this._isDefinitelyOutOfRange();
},isValid:function(_8ae){
return this.inherited(arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(_8ae));
},getErrorMessage:function(_8af){
var v=this.get("value");
if(v!=null&&v!==""&&(typeof v!="number"||!isNaN(v))&&!this.isInRange(_8af)){
return this.rangeMessage;
}
return this.inherited(arguments);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.rangeMessage){
this.messages=i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage;
}
},_setConstraintsAttr:function(_8b0){
this.inherited(arguments);
if(this.focusNode){
if(this.constraints.min!==undefined){
this.focusNode.setAttribute("aria-valuemin",this.constraints.min);
}else{
this.focusNode.removeAttribute("aria-valuemin");
}
if(this.constraints.max!==undefined){
this.focusNode.setAttribute("aria-valuemax",this.constraints.max);
}else{
this.focusNode.removeAttribute("aria-valuemax");
}
}
},_setValueAttr:function(_8b1,_8b2){
this.focusNode.setAttribute("aria-valuenow",_8b1);
this.inherited(arguments);
},applyTextDir:function(){
}});
return _8aa;
});
},"davinci/model/parser/Tokenizer":function(){
define(["dojo/_base/declare","davinci/js/JSExpression"],function(_8b3,_8b4){
return {stringStream:function(_8b5){
var _8b6="";
var pos=0;
var _8b7=0;
var _8b8="";
function _8b9(){
while(pos==_8b6.length){
_8b8+=_8b6;
_8b6="";
pos=0;
try{
_8b6=_8b5.next();
}
catch(e){
if(e!=StopIteration){
throw e;
}else{
return false;
}
}
}
return true;
};
return {peek:function(){
if(!_8b9()){
return null;
}
return _8b6.charAt(pos);
},next:function(){
if(!_8b9()){
if(_8b8.length>0){
throw "End of stringstream reached without emptying buffer ('"+_8b8+"').";
}else{
throw StopIteration;
}
}
return _8b6.charAt(pos++);
},get:function(){
var temp=_8b8;
_8b8="";
if(pos>0){
temp+=_8b6.slice(0,pos);
_8b6=_8b6.slice(pos);
pos=0;
}
_8b7+=temp.length;
return temp;
},getOffset:function(){
return _8b7;
},push:function(str){
_8b6=_8b6.slice(0,pos)+str+_8b6.slice(pos);
_8b7-=str.length;
},lookAhead:function(str,_8ba,_8bb,_8bc){
function _8bd(str){
return _8bc?str.toLowerCase():str;
};
str=_8bd(str);
var _8be=false;
var _8bf=_8b8,_8c0=pos;
if(_8bb){
this.nextWhileMatches(/[\s\u00a0]/);
}
while(true){
var end=pos+str.length,left=_8b6.length-pos;
if(end<=_8b6.length){
_8be=str==_8bd(_8b6.slice(pos,end));
pos=end;
break;
}else{
if(str.slice(0,left)==_8bd(_8b6.slice(pos))){
_8b8+=_8b6;
_8b6="";
try{
_8b6=_8b5.next();
}
catch(e){
if(e!=StopIteration){
throw e;
}
break;
}
pos=0;
str=str.slice(left);
}else{
break;
}
}
}
if(!(_8be&&_8ba)){
_8b6=_8b8.slice(_8bf.length)+_8b6;
pos=_8c0;
_8b8=_8bf;
}
return _8be;
},lookAheadRegex:function(_8c1,_8c2){
if(_8c1.source.charAt(0)!="^"){
throw new Error("Regexps passed to lookAheadRegex must start with ^");
}
while(_8b6.indexOf("\n",pos)==-1){
try{
_8b6+=_8b5.next();
}
catch(e){
if(e!=StopIteration){
throw e;
break;
}
}
}
var _8c3=_8b6.slice(pos).match(_8c1);
if(_8c3&&_8c2){
pos+=_8c3[0].length;
}
return _8c3;
},more:function(){
return this.peek()!==null;
},applies:function(test){
var next=this.peek();
return (next!==null&&test(next));
},nextWhile:function(test){
var next;
while((next=this.peek())!==null&&test(next)){
this.next();
}
},matches:function(re){
var next=this.peek();
return (next!==null&&re.test(next));
},nextWhileMatches:function(re){
var next;
while((next=this.peek())!==null&&re.test(next)){
this.next();
}
},equals:function(ch){
return ch===this.peek();
},endOfLine:function(){
var next=this.peek();
return next==null||next=="\n";
}};
},tokenizer:function(_8c4,_8c5){
function _8c6(ch){
return ch!="\n"&&/^[\s\u00a0]*$/.test(ch);
};
var _8c7={state:_8c5,take:function(type){
if(typeof (type)=="string"){
type={style:type,type:type};
}
type.offset=_8c4.getOffset();
type.content=(type.content||"")+_8c4.get();
if(!/\n$/.test(type.content)){
_8c4.nextWhile(_8c6);
}
type.value=type.content+_8c4.get();
return type;
},next:function(){
if(!_8c4.more()){
throw StopIteration;
}
var type;
if(_8c4.equals("\n")){
_8c4.next();
return this.take("whitespace");
}
if(_8c4.applies(_8c6)){
type="whitespace";
}else{
while(!type){
type=this.state(_8c4,function(s){
_8c7.state=s;
});
}
}
return this.take(type);
}};
return _8c7;
}};
});
},"dojox/html/entities":function(){
define("dojox/html/entities",["dojo/_base/lang"],function(lang){
var dhe=lang.getObject("dojox.html.entities",true);
var _8c8=function(str,map){
var _8c9,_8ca;
if(map._encCache&&map._encCache.regexp&&map._encCache.mapper&&map.length==map._encCache.length){
_8c9=map._encCache.mapper;
_8ca=map._encCache.regexp;
}else{
_8c9={};
_8ca=["["];
var i;
for(i=0;i<map.length;i++){
_8c9[map[i][0]]="&"+map[i][1]+";";
_8ca.push(map[i][0]);
}
_8ca.push("]");
_8ca=new RegExp(_8ca.join(""),"g");
map._encCache={mapper:_8c9,regexp:_8ca,length:map.length};
}
str=str.replace(_8ca,function(c){
return _8c9[c];
});
return str;
};
var _8cb=function(str,map){
var _8cc,_8cd;
if(map._decCache&&map._decCache.regexp&&map._decCache.mapper&&map.length==map._decCache.length){
_8cc=map._decCache.mapper;
_8cd=map._decCache.regexp;
}else{
_8cc={};
_8cd=["("];
var i;
for(i=0;i<map.length;i++){
var e="&"+map[i][1]+";";
if(i){
_8cd.push("|");
}
_8cc[e]=map[i][0];
_8cd.push(e);
}
_8cd.push(")");
_8cd=new RegExp(_8cd.join(""),"g");
map._decCache={mapper:_8cc,regexp:_8cd,length:map.length};
}
str=str.replace(_8cd,function(c){
return _8cc[c];
});
return str;
};
dhe.html=[["&","amp"],["\"","quot"],["<","lt"],[">","gt"],[" ","nbsp"]];
dhe.latin=[["¡","iexcl"],["¢","cent"],["£","pound"],["€","euro"],["¤","curren"],["¥","yen"],["¦","brvbar"],["§","sect"],["¨","uml"],["©","copy"],["ª","ordf"],["«","laquo"],["¬","not"],["­","shy"],["®","reg"],["¯","macr"],["°","deg"],["±","plusmn"],["²","sup2"],["³","sup3"],["´","acute"],["µ","micro"],["¶","para"],["·","middot"],["¸","cedil"],["¹","sup1"],["º","ordm"],["»","raquo"],["¼","frac14"],["½","frac12"],["¾","frac34"],["¿","iquest"],["À","Agrave"],["Á","Aacute"],["Â","Acirc"],["Ã","Atilde"],["Ä","Auml"],["Å","Aring"],["Æ","AElig"],["Ç","Ccedil"],["È","Egrave"],["É","Eacute"],["Ê","Ecirc"],["Ë","Euml"],["Ì","Igrave"],["Í","Iacute"],["Î","Icirc"],["Ï","Iuml"],["Ð","ETH"],["Ñ","Ntilde"],["Ò","Ograve"],["Ó","Oacute"],["Ô","Ocirc"],["Õ","Otilde"],["Ö","Ouml"],["×","times"],["Ø","Oslash"],["Ù","Ugrave"],["Ú","Uacute"],["Û","Ucirc"],["Ü","Uuml"],["Ý","Yacute"],["Þ","THORN"],["ß","szlig"],["à","agrave"],["á","aacute"],["â","acirc"],["ã","atilde"],["ä","auml"],["å","aring"],["æ","aelig"],["ç","ccedil"],["è","egrave"],["é","eacute"],["ê","ecirc"],["ë","euml"],["ì","igrave"],["í","iacute"],["î","icirc"],["ï","iuml"],["ð","eth"],["ñ","ntilde"],["ò","ograve"],["ó","oacute"],["ô","ocirc"],["õ","otilde"],["ö","ouml"],["÷","divide"],["ø","oslash"],["ù","ugrave"],["ú","uacute"],["û","ucirc"],["ü","uuml"],["ý","yacute"],["þ","thorn"],["ÿ","yuml"],["ƒ","fnof"],["Α","Alpha"],["Β","Beta"],["Γ","Gamma"],["Δ","Delta"],["Ε","Epsilon"],["Ζ","Zeta"],["Η","Eta"],["Θ","Theta"],["Ι","Iota"],["Κ","Kappa"],["Λ","Lambda"],["Μ","Mu"],["Ν","Nu"],["Ξ","Xi"],["Ο","Omicron"],["Π","Pi"],["Ρ","Rho"],["Σ","Sigma"],["Τ","Tau"],["Υ","Upsilon"],["Φ","Phi"],["Χ","Chi"],["Ψ","Psi"],["Ω","Omega"],["α","alpha"],["β","beta"],["γ","gamma"],["δ","delta"],["ε","epsilon"],["ζ","zeta"],["η","eta"],["θ","theta"],["ι","iota"],["κ","kappa"],["λ","lambda"],["μ","mu"],["ν","nu"],["ξ","xi"],["ο","omicron"],["π","pi"],["ρ","rho"],["ς","sigmaf"],["σ","sigma"],["τ","tau"],["υ","upsilon"],["φ","phi"],["χ","chi"],["ψ","psi"],["ω","omega"],["ϑ","thetasym"],["ϒ","upsih"],["ϖ","piv"],["•","bull"],["…","hellip"],["′","prime"],["″","Prime"],["‾","oline"],["⁄","frasl"],["℘","weierp"],["ℑ","image"],["ℜ","real"],["™","trade"],["ℵ","alefsym"],["←","larr"],["↑","uarr"],["→","rarr"],["↓","darr"],["↔","harr"],["↵","crarr"],["⇐","lArr"],["⇑","uArr"],["⇒","rArr"],["⇓","dArr"],["⇔","hArr"],["∀","forall"],["∂","part"],["∃","exist"],["∅","empty"],["∇","nabla"],["∈","isin"],["∉","notin"],["∋","ni"],["∏","prod"],["∑","sum"],["−","minus"],["∗","lowast"],["√","radic"],["∝","prop"],["∞","infin"],["∠","ang"],["∧","and"],["∨","or"],["∩","cap"],["∪","cup"],["∫","int"],["∴","there4"],["∼","sim"],["≅","cong"],["≈","asymp"],["≠","ne"],["≡","equiv"],["≤","le"],["≥","ge"],["⊂","sub"],["⊃","sup"],["⊄","nsub"],["⊆","sube"],["⊇","supe"],["⊕","oplus"],["⊗","otimes"],["⊥","perp"],["⋅","sdot"],["⌈","lceil"],["⌉","rceil"],["⌊","lfloor"],["⌋","rfloor"],["〈","lang"],["〉","rang"],["◊","loz"],["♠","spades"],["♣","clubs"],["♥","hearts"],["♦","diams"],["Œ","Elig"],["œ","oelig"],["Š","Scaron"],["š","scaron"],["Ÿ","Yuml"],["ˆ","circ"],["˜","tilde"],[" ","ensp"],[" ","emsp"],[" ","thinsp"],["‌","zwnj"],["‍","zwj"],["‎","lrm"],["‏","rlm"],["–","ndash"],["—","mdash"],["‘","lsquo"],["’","rsquo"],["‚","sbquo"],["“","ldquo"],["”","rdquo"],["„","bdquo"],["†","dagger"],["‡","Dagger"],["‰","permil"],["‹","lsaquo"],["›","rsaquo"]];
dhe.encode=function(str,m){
if(str){
if(!m){
str=_8c8(str,dhe.html);
str=_8c8(str,dhe.latin);
}else{
str=_8c8(str,m);
}
}
return str;
};
dhe.decode=function(str,m){
if(str){
if(!m){
str=_8cb(str,dhe.html);
str=_8cb(str,dhe.latin);
}else{
str=_8cb(str,m);
}
}
return str;
};
return dhe;
});
},"dijit/DialogUnderlay":function(){
define(["dojo/_base/declare","dojo/dom-attr","dojo/window","./_Widget","./_TemplatedMixin","./BackgroundIframe"],function(_8ce,_8cf,_8d0,_8d1,_8d2,_8d3){
return _8ce("dijit.DialogUnderlay",[_8d1,_8d2],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' data-dojo-attach-point='node'></div></div>",dialogId:"","class":"",_setDialogIdAttr:function(id){
_8cf.set(this.node,"id",id+"_underlay");
this._set("dialogId",id);
},_setClassAttr:function(_8d4){
this.node.className="dijitDialogUnderlay "+_8d4;
this._set("class",_8d4);
},postCreate:function(){
this.ownerDocumentBody.appendChild(this.domNode);
},layout:function(){
var is=this.node.style,os=this.domNode.style;
os.display="none";
var _8d5=_8d0.getBox(this.ownerDocument);
os.top=_8d5.t+"px";
os.left=_8d5.l+"px";
is.width=_8d5.w+"px";
is.height=_8d5.h+"px";
os.display="block";
},show:function(){
this.domNode.style.display="block";
this.layout();
this.bgIframe=new _8d3(this.domNode);
},hide:function(){
this.bgIframe.destroy();
delete this.bgIframe;
this.domNode.style.display="none";
}});
});
},"url:davinci/review/widgets/templates/PublishWizard.html":"<div class='publishWizard'>\r\n\t<div class=\"dijitDialogPaneContentArea\">\r\n\t\t<div class='steps'>\r\n\t\t\t<div dojoAttachPoint=\"navPage1\" dojoAttachEvent=\"onclick:select\" class=\"crumbs current sep\">\r\n\t\t\t\t<div dojoAttachPoint=\"navPage1Icon\" class=\"done\"></div>\r\n\t\t\t\t1.${generalInfo}\r\n\t\t\t</div>\r\n\t\t\t<div dojoAttachPoint=\"navPage2\" dojoAttachEvent=\"onclick:select\" class=\"crumbs sep\">\r\n\t\t\t\t<div dojoAttachPoint=\"navPage2Icon\" class=\"todo\"></div>\r\n\t\t\t\t2.${selectRevFiles}\r\n\t\t\t</div>\r\n\t\t\t<div dojoAttachPoint=\"navPage3\" dojoAttachEvent=\"onclick:select\" class=\"crumbs\">\r\n\t\t\t\t<div dojoAttachPoint=\"navPage3Icon\" class=\"todo\"></div>\r\n\t\t\t\t3.${addReviewers}\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint=\"reviewerStackContainer\" class='mainSection'>\r\n\t\t</div>\r\n\t\t<table cellspacing=\"10\" dojoAttachPoint=\"page1Node\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td><label for=\"versionTitle\">${title}:</label></td>\r\n\t\t\t\t<td><input dojoAttachPoint=\"versionTitle\"></input></td>\r\n\t\t\t\t<td><input dojoAttachPoint=\"receiveEmail\"></input><label class='emailLabel' for=\"receiveEmail\">${notifyMe}</label></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td valign=\"top\"><label for=\"descriptions\">${description}:</label></td>\r\n\t\t\t\t<td colspan=\"2\"><input dojoAttachPoint=\"descriptions\"></input></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><label>${windowSize}:</label></td>\r\n\t\t\t\t<td colspan=\"2\"><input dojoAttachPoint=\"desireWidth\"></input><label>*</label><input dojoAttachPoint=\"desireHeight\"/></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><label for=\"dueDate\">${dueDate}:</label></td>\r\n\t\t\t\t<td><input dojoAttachPoint=\"dueDate\" /></td>\r\n\t\t\t\t<td class=\"review-tips\"><label>${leaveBlank}</label></td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t\t\r\n\t\t<table cellspacing=\"10\" dojoAttachPoint=\"page2Node\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td>${availableFiles}:</td>\r\n\t\t\t\t<td></td>\r\n\t\t\t\t<td>${selectedFiles}:</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<div dojoAttachPoint=\"sourceTreeNode\" class='sourceTree'>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<a href=\"javascript:void(0);\" dojoAttachEvent=\"onclick:addSelectFiles\"><img src=\"app/davinci/review/resources/img/forward_nav.gif\"/></a>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<div dojoAttachPoint=\"targetTreeNode\" class='sourceTree'>\r\n\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t\t\r\n\t\t<table cellspacing=\"10\" dojoAttachPoint=\"page3Node\">\r\n\t\t\t<tr valign=\"top\">\r\n\t\t\t\t<td align=\"left\" rowspan=2><div class='reviewers'>${reviewers}:</div></td>\r\n\t\t\t\t<td colspan=2><div dojoAttachPoint=\"userGrid\" class='reviewerList'></div></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class='reviewerBox'>\r\n\t\t\t\t\t<div dojoAttachPoint=\"addReviewerCombox\"></div>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td align=\"left\"><button dojoAttachPoint=\"addReviewerButton\"></button></td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t</div>\r\n\r\n\t\t<div class='dijitDialogPaneActionBar dialogButtonContainerOverride'>\r\n\t\t\t<div dojoAttachPoint=\"reviewMsg\" class=\"reviewMsg\"></div>\r\n\t\t\t<a class='cancelButton' href=\"javascript:void(0);\" dojoAttachEvent=\"onclick:onClose\">${buttonCancel}</a>\r\n\t\t\t<button class='maqSecondaryButton' dojoAttachPoint=\"saveDt\">${saveAsDraft}</button>\r\n\t\t\t<button class='maqSecondaryButton' dojoAttachPoint=\"prev\">&lt ${back}</button>\r\n\t\t\t<button class='maqSecondaryButton' dojoAttachPoint=\"next\">${next} &gt</button>\r\n\t\t\t<button class='maqPrimaryButton' dojoAttachPoint=\"invite\">${publishReview}</button>\r\n\t\t</div>\r\n</div>","dijit/form/_ToggleButtonMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr"],function(_8d6,_8d7){
return _8d6("dijit.form._ToggleButtonMixin",null,{checked:false,_aria_attr:"aria-pressed",_onClick:function(evt){
var _8d8=this.checked;
this._set("checked",!_8d8);
var ret=this.inherited(arguments);
this.set("checked",ret?this.checked:_8d8);
return ret;
},_setCheckedAttr:function(_8d9,_8da){
this._set("checked",_8d9);
_8d7.set(this.focusNode||this.domNode,"checked",_8d9);
(this.focusNode||this.domNode).setAttribute(this._aria_attr,_8d9?"true":"false");
this._handleOnChange(_8d9,_8da);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
});
},"davinci/ve/GenericWidget":function(){
define(["dojo/_base/declare","./_Widget"],function(_8db,_8dc){
return _8db("davinci.ve.GenericWidget",_8dc,{isGenericWidget:true,constructor:function(_8dd,node,type,_8de,_8df){
dojo.attr(node,"dvwidget",type);
if(_8df){
_8df.addAttribute("dvwidget",type);
}
},buildRendering:function(){
this.containerNode=this.domNode;
if(this._params){
for(var name in this._params){
this.domNode.setAttribute(name,this._params[name]);
}
this._params=undefined;
}
},_getChildrenData:function(_8e0){
var _8e1=[];
var _8e2=this.domNode.childNodes;
for(var i=0;i<_8e2.length;i++){
var n=_8e2[i];
var d;
switch(n.nodeType){
case 1:
var w=require("davinci/ve/widget").byNode(n);
if(w){
d=w.getData(_8e0);
}
break;
case 3:
d=n.nodeValue.trim();
if(d&&_8e0.serialize){
d=davinci.html.escapeXml(d);
}
break;
case 8:
d="<!--"+n.nodeValue+"-->";
break;
}
if(d){
_8e1.push(d);
}
}
if(_8e1.length===0){
return undefined;
}
return _8e1;
},setProperties:function(_8e3){
var node=this.domNode;
for(var name in _8e3){
if(name==="style"){
dojo.style(node,_8e3[name]);
}else{
if(!_8e3[name]){
node.removeAttribute(name);
}else{
node[name]=_8e3[name];
}
}
}
this.inherited(arguments);
},_attr:function(name,_8e4){
if(arguments.length>1){
this.domNode.setAttribute(name,_8e4);
}else{
return this.domNode.getAttribute(name);
}
},getTagName:function(){
return this.domNode.nodeName.toLowerCase();
}});
});
},"dojo/store/util/SimpleQueryEngine":function(){
define(["../../_base/array"],function(_8e5){
return function(_8e6,_8e7){
switch(typeof _8e6){
default:
throw new Error("Can not query with a "+typeof _8e6);
case "object":
case "undefined":
var _8e8=_8e6;
_8e6=function(_8e9){
for(var key in _8e8){
var _8ea=_8e8[key];
if(_8ea&&_8ea.test){
if(!_8ea.test(_8e9[key],_8e9)){
return false;
}
}else{
if(_8ea!=_8e9[key]){
return false;
}
}
}
return true;
};
break;
case "string":
if(!this[_8e6]){
throw new Error("No filter function "+_8e6+" was found in store");
}
_8e6=this[_8e6];
case "function":
}
function _8eb(_8ec){
var _8ed=_8e5.filter(_8ec,_8e6);
var _8ee=_8e7&&_8e7.sort;
if(_8ee){
_8ed.sort(typeof _8ee=="function"?_8ee:function(a,b){
for(var sort,i=0;sort=_8ee[i];i++){
var _8ef=a[sort.attribute];
var _8f0=b[sort.attribute];
if(_8ef!=_8f0){
return !!sort.descending==(_8ef==null||_8ef>_8f0)?-1:1;
}
}
return 0;
});
}
if(_8e7&&(_8e7.start||_8e7.count)){
var _8f1=_8ed.length;
_8ed=_8ed.slice(_8e7.start||0,(_8e7.start||0)+(_8e7.count||Infinity));
_8ed.total=_8f1;
}
return _8ed;
};
_8eb.matches=_8e6;
return _8eb;
};
});
},"url:dijit/templates/Tree.html":"<div class=\"dijitTree dijitTreeContainer\" role=\"tree\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" data-dojo-attach-point=\"indentDetector\"></div>\n</div>\n","url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:_onClick,onkeypress:_onButtonKeyPress\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeypress:_onArrowKeyPress\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\" role=\"presentation\"\n\t\t/></td></tr></tbody\n></table>\n","dojo/dnd/Manager":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/lang","../_base/window","../dom-class","../Evented","../has","../keys","../on","../topic","../touch","./common","./autoscroll","./Avatar"],function(_8f2,_8f3,_8f4,lang,win,_8f5,_8f6,has,keys,on,_8f7,_8f8,dnd,_8f9,_8fa){
var _8fb=_8f3("dojo.dnd.Manager",[_8f6],{constructor:function(){
this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[];
},OFFSET_X:has("touch")?0:16,OFFSET_Y:has("touch")?-64:16,overSource:function(_8fc){
if(this.avatar){
this.target=(_8fc&&_8fc.targetState!="Disabled")?_8fc:null;
this.canDropFlag=Boolean(this.target);
this.avatar.update();
}
_8f7.publish("/dnd/source/over",_8fc);
},outSource:function(_8fd){
if(this.avatar){
if(this.target==_8fd){
this.target=null;
this.canDropFlag=false;
this.avatar.update();
_8f7.publish("/dnd/source/over",null);
}
}else{
_8f7.publish("/dnd/source/over",null);
}
},startDrag:function(_8fe,_8ff,copy){
_8f9.autoScrollStart(win.doc);
this.source=_8fe;
this.nodes=_8ff;
this.copy=Boolean(copy);
this.avatar=this.makeAvatar();
win.body().appendChild(this.avatar.node);
_8f7.publish("/dnd/start",_8fe,_8ff,this.copy);
this.events=[on(win.doc,_8f8.move,lang.hitch(this,"onMouseMove")),on(win.doc,_8f8.release,lang.hitch(this,"onMouseUp")),on(win.doc,"keydown",lang.hitch(this,"onKeyDown")),on(win.doc,"keyup",lang.hitch(this,"onKeyUp")),on(win.doc,"dragstart",_8f4.stop),on(win.body(),"selectstart",_8f4.stop)];
var c="dojoDnd"+(copy?"Copy":"Move");
_8f5.add(win.body(),c);
},canDrop:function(flag){
var _900=Boolean(this.target&&flag);
if(this.canDropFlag!=_900){
this.canDropFlag=_900;
this.avatar.update();
}
},stopDrag:function(){
_8f5.remove(win.body(),["dojoDndCopy","dojoDndMove"]);
_8f2.forEach(this.events,function(_901){
_901.remove();
});
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=this.target=null;
this.nodes=[];
},makeAvatar:function(){
return new _8fa(this);
},updateAvatar:function(){
this.avatar.update();
},onMouseMove:function(e){
var a=this.avatar;
if(a){
_8f9.autoScrollNodes(e);
var s=a.node.style;
s.left=(e.pageX+this.OFFSET_X)+"px";
s.top=(e.pageY+this.OFFSET_Y)+"px";
var copy=Boolean(this.source.copyState(dnd.getCopyKeyState(e)));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
if(has("touch")){
e.preventDefault();
}
},onMouseUp:function(e){
if(this.avatar){
if(this.target&&this.canDropFlag){
var copy=Boolean(this.source.copyState(dnd.getCopyKeyState(e)));
_8f7.publish("/dnd/drop/before",this.source,this.nodes,copy,this.target,e);
_8f7.publish("/dnd/drop",this.source,this.nodes,copy,this.target,e);
}else{
_8f7.publish("/dnd/cancel");
}
this.stopDrag();
}
},onKeyDown:function(e){
if(this.avatar){
switch(e.keyCode){
case keys.CTRL:
var copy=Boolean(this.source.copyState(true));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
break;
case keys.ESCAPE:
_8f7.publish("/dnd/cancel");
this.stopDrag();
break;
}
}
},onKeyUp:function(e){
if(this.avatar&&e.keyCode==keys.CTRL){
var copy=Boolean(this.source.copyState(false));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
},_setCopyStatus:function(copy){
this.copy=copy;
this.source._markDndStatus(this.copy);
this.updateAvatar();
_8f5.replace(win.body(),"dojoDnd"+(this.copy?"Copy":"Move"),"dojoDnd"+(this.copy?"Move":"Copy"));
}});
dnd._manager=null;
_8fb.manager=dnd.manager=function(){
if(!dnd._manager){
dnd._manager=new _8fb();
}
return dnd._manager;
};
return _8fb;
});
},"dijit/form/_TextBoxMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","../main"],function(_902,_903,dom,_904,keys,lang,on,_905){
var _906=_903("dijit.form._TextBoxMixin",null,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_907,_908,_909){
var _90a;
if(_907!==undefined){
_90a=this.filter(_907);
if(typeof _909!="string"){
if(_90a!==null&&((typeof _90a!="number")||!isNaN(_90a))){
_909=this.filter(this.format(_90a,this.constraints));
}else{
_909="";
}
}
}
if(_909!=null&&((typeof _909)!="number"||!isNaN(_909))&&this.textbox.value!=_909){
this.textbox.value=_909;
this._set("displayedValue",this.get("displayedValue"));
}
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_909);
}
this.inherited(arguments,[_90a,_908]);
},displayedValue:"",_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},_setDisplayedValueAttr:function(_90b){
if(_90b==null){
_90b="";
}else{
if(typeof _90b!="string"){
_90b=String(_90b);
}
}
this.textbox.value=_90b;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_90b);
}
},format:function(_90c){
return _90c==null?"":(_90c.toString?_90c.toString():_90c);
},parse:function(_90d){
return _90d;
},_refreshState:function(){
},onInput:function(){
},__skipInputEvent:false,_onInput:function(evt){
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,this.focusNode.value);
}
this._processInput(evt);
},_processInput:function(evt){
this._refreshState();
this._set("displayedValue",this.get("displayedValue"));
},postCreate:function(){
this.textbox.setAttribute("value",this.textbox.value);
this.inherited(arguments);
var _90e=function(e){
var _90f;
if(e.type=="keydown"){
_90f=e.keyCode;
switch(_90f){
case keys.SHIFT:
case keys.ALT:
case keys.CTRL:
case keys.META:
case keys.CAPS_LOCK:
case keys.NUM_LOCK:
case keys.SCROLL_LOCK:
return;
}
if(!e.ctrlKey&&!e.metaKey&&!e.altKey){
switch(_90f){
case keys.NUMPAD_0:
case keys.NUMPAD_1:
case keys.NUMPAD_2:
case keys.NUMPAD_3:
case keys.NUMPAD_4:
case keys.NUMPAD_5:
case keys.NUMPAD_6:
case keys.NUMPAD_7:
case keys.NUMPAD_8:
case keys.NUMPAD_9:
case keys.NUMPAD_MULTIPLY:
case keys.NUMPAD_PLUS:
case keys.NUMPAD_ENTER:
case keys.NUMPAD_MINUS:
case keys.NUMPAD_PERIOD:
case keys.NUMPAD_DIVIDE:
return;
}
if((_90f>=65&&_90f<=90)||(_90f>=48&&_90f<=57)||_90f==keys.SPACE){
return;
}
var _910=false;
for(var i in keys){
if(keys[i]===e.keyCode){
_910=true;
break;
}
}
if(!_910){
return;
}
}
}
_90f=e.charCode>=32?String.fromCharCode(e.charCode):e.charCode;
if(!_90f){
_90f=(e.keyCode>=65&&e.keyCode<=90)||(e.keyCode>=48&&e.keyCode<=57)||e.keyCode==keys.SPACE?String.fromCharCode(e.keyCode):e.keyCode;
}
if(!_90f){
_90f=229;
}
if(e.type=="keypress"){
if(typeof _90f!="string"){
return;
}
if((_90f>="a"&&_90f<="z")||(_90f>="A"&&_90f<="Z")||(_90f>="0"&&_90f<="9")||(_90f===" ")){
if(e.ctrlKey||e.metaKey||e.altKey){
return;
}
}
}
if(e.type=="input"){
if(this.__skipInputEvent){
this.__skipInputEvent=false;
return;
}
}else{
this.__skipInputEvent=true;
}
var faux={faux:true},attr;
for(attr in e){
if(attr!="layerX"&&attr!="layerY"){
var v=e[attr];
if(typeof v!="function"&&typeof v!="undefined"){
faux[attr]=v;
}
}
}
lang.mixin(faux,{charOrCode:_90f,_wasConsumed:false,preventDefault:function(){
faux._wasConsumed=true;
e.preventDefault();
},stopPropagation:function(){
e.stopPropagation();
}});
if(this.onInput(faux)===false){
faux.preventDefault();
faux.stopPropagation();
}
if(faux._wasConsumed){
return;
}
this.defer(function(){
this._onInput(faux);
});
};
this.own(on(this.textbox,"keydown, keypress, paste, cut, input, compositionend",lang.hitch(this,_90e)));
},_blankValue:"",filter:function(val){
if(val===null){
return this._blankValue;
}
if(typeof val!="string"){
return val;
}
if(this.trim){
val=lang.trim(val);
}
if(this.uppercase){
val=val.toUpperCase();
}
if(this.lowercase){
val=val.toLowerCase();
}
if(this.propercase){
val=val.replace(/[^\s]+/g,function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
});
}
return val;
},_setBlurValue:function(){
this._setValueAttr(this.get("value"),true);
},_onBlur:function(e){
if(this.disabled){
return;
}
this._setBlurValue();
this.inherited(arguments);
},_isTextSelected:function(){
return this.textbox.selectionStart!=this.textbox.selectionEnd;
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
if(this.selectOnClick&&by=="mouse"){
this._selectOnClickHandle=this.connect(this.domNode,"onmouseup",function(){
this.disconnect(this._selectOnClickHandle);
this._selectOnClickHandle=null;
if(!this._isTextSelected()){
_906.selectInputText(this.textbox);
}
});
this.defer(function(){
if(this._selectOnClickHandle){
this.disconnect(this._selectOnClickHandle);
this._selectOnClickHandle=null;
}
},500);
}
this.inherited(arguments);
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
},_setTextDirAttr:function(_911){
if(!this._created||this.textDir!=_911){
this._set("textDir",_911);
this.applyTextDir(this.focusNode,this.focusNode.value);
}
}});
_906._setSelectionRange=_905._setSelectionRange=function(_912,_913,stop){
if(_912.setSelectionRange){
_912.setSelectionRange(_913,stop);
}
};
_906.selectInputText=_905.selectInputText=function(_914,_915,stop){
_914=dom.byId(_914);
if(isNaN(_915)){
_915=0;
}
if(isNaN(stop)){
stop=_914.value?_914.value.length:0;
}
try{
_914.focus();
_906._setSelectionRange(_914,_915,stop);
}
catch(e){
}
};
return _906;
});
},"dojox/grid/DataSelection":function(){
define("dojox/grid/DataSelection",["dojo/_base/declare","./_SelectionPreserver","./Selection"],function(_916,_917,_918){
return _916("dojox.grid.DataSelection",_918,{constructor:function(grid){
if(grid.keepSelection){
this.preserver=new _917(this);
}
},destroy:function(){
if(this.preserver){
this.preserver.destroy();
}
},getFirstSelected:function(){
var idx=_918.prototype.getFirstSelected.call(this);
if(idx==-1){
return null;
}
return this.grid.getItem(idx);
},getNextSelected:function(_919){
var _91a=this.grid.getItemIndex(_919);
var idx=_918.prototype.getNextSelected.call(this,_91a);
if(idx==-1){
return null;
}
return this.grid.getItem(idx);
},getSelected:function(){
var _91b=[];
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
_91b.push(this.grid.getItem(i));
}
}
return _91b;
},addToSelection:function(_91c){
if(this.mode=="none"){
return;
}
var idx=null;
if(typeof _91c=="number"||typeof _91c=="string"){
idx=_91c;
}else{
idx=this.grid.getItemIndex(_91c);
}
_918.prototype.addToSelection.call(this,idx);
},deselect:function(_91d){
if(this.mode=="none"){
return;
}
var idx=null;
if(typeof _91d=="number"||typeof _91d=="string"){
idx=_91d;
}else{
idx=this.grid.getItemIndex(_91d);
}
_918.prototype.deselect.call(this,idx);
},deselectAll:function(_91e){
var idx=null;
if(_91e||typeof _91e=="number"){
if(typeof _91e=="number"||typeof _91e=="string"){
idx=_91e;
}else{
idx=this.grid.getItemIndex(_91e);
}
_918.prototype.deselectAll.call(this,idx);
}else{
this.inherited(arguments);
}
}});
});
},"davinci/html/CSSImport":function(){
define(["dojo/_base/declare","davinci/html/CSSElement","davinci/model/Path","davinci/html/CSSFile"],function(_91f,_920,Path,_921){
return _91f("davinci.html.CSSImport",_920,{constructor:function(){
this.elementType="CSSImport";
},getCSSFile:function(){
return this.parent;
},setUrl:function(url){
this.url=url;
},visit:function(_922){
if(!_922.visit(this)){
for(var i=0;i<this.children.length;i++){
this.children[i].visit(_922);
}
if(this.cssFile){
this.cssFile.visit(_922);
}
}
if(_922.endVisit){
_922.endVisit(this);
}
},getText:function(_923){
s="@import ";
if(this.isURL){
s+="url(\""+this.url+"\");";
}else{
s+="\""+this.url+"\";";
}
return s;
},close:function(_924){
require("davinci/model/Factory").closeModel(this.cssFile);
if(this.connection){
dojo.disconnect(this.connection);
}
delete this.connection;
},load:function(_925){
var p=this.parent;
while(p&&!(p.url||p.fileName)){
p=p.parent;
}
var path=new Path(p.url||p.fileName);
path=path.getParentPath().append(this.url);
var _926=path.toString();
this.cssFile=require("davinci/model/Factory").getModel({url:_926,loader:this.parent.loader,includeImports:this.parent.includeImports||_925});
this.cssFile.relativeURL=this.url;
this.connection=dojo.connect(this.cssFile,"onChange",this.parent,"onChange");
}});
});
},"davinci/ve/_Widget":function(){
define("davinci/ve/_Widget",["dojo/_base/declare","./metadata","../html/CSSModel","dojox/html/entities","davinci/ve/utils/StyleArray","davinci/ve/utils/GeomUtils"],function(_927,_928,_929,_92a,_92b,_92c){
var _92d=function(_92e,_92f,func){
if(_92e==_92f){
return true;
}
if(!_92e||!_92f){
return false;
}
if(_92e.length!=_92f.length){
return false;
}
for(var i=0;i<_92e.length;i++){
if(func){
if(!func(_92e[i],_92f[i])){
return false;
}
}else{
if(_92e[i]!=_92f[i]){
return false;
}
}
}
return true;
};
return _927("davinci.ve._Widget",null,{isWidget:true,acceptsHTMLChildren:false,_skipAttrs:["id","style","class","dir","lang","_children"],constructor:function(_930,node,type,_931){
this.domNode=node;
this.id=node.id;
node._dvWidget=this;
this._params=dojo.mixin({},_930);
this.type=type;
this.metadata=_931;
},postscript:function(){
var _932;
if(this.domNode){
var doc=this.domNode.ownerDocument;
if(doc.body._edit_context){
_932=doc.body._edit_context;
}else{
if(doc.body._dvWidget&&doc.body._dvWidget._edit_context){
_932=doc.body._dvWidget._edit_context;
}
}
}
if(this.id&&_932){
_932.widgetHash[this.id]=this;
}
this.buildRendering();
this.postCreate();
},buildRendering:function(){
},postCreate:function(){
},getObjectType:function(){
},getContext:function(){
return this._edit_context;
},getChildren:function(_933){
var _934=this.getHelper();
if(_934&&_934.getChildren){
return _934.getChildren(this,_933);
}
return this._getChildren(_933);
},_getChildren:function(_935){
var _936=this.getContainerNode(),_937=[];
if(_936){
dojo.forEach(_936.children,function(node){
if(_935){
_937.push(require("davinci/ve/widget").getWidget(node));
}else{
var _938=node._dvWidget;
if(_938){
_937.push(_938);
}
}
});
}
return _937;
},getContainerNode:function(){
var _939=this.getHelper();
if(_939&&_939.getContainerNode){
return _939.getContainerNode(this);
}
if(_928.getAllowedChild(this.type)[0]!=="NONE"){
return this._getContainerNode();
}
return null;
},_getContainerNode:function(){
return this.domNode;
},getMetadata:function(){
if(!this.metadata){
this.metadata=_928.query(this);
}
return this.metadata;
},getHelper:function(){
if(!this._edit_helper){
this._edit_helper=require("davinci/ve/widget").getWidgetHelper(this.type);
}
return this._edit_helper;
},attr:function(name,_93a){
var _93b=this._attr.apply(this,arguments);
if(arguments.length>1){
_93a=this._stringValue(name,_93a);
this._srcElement.addAttribute(name,_93a);
}else{
return _93b;
}
},_attr:function(name,_93c){
},indexOf:function(_93d){
return dojo.indexOf(this.getChildren(),_93d);
},getStyleNode:function(){
return this.styleNode||this.domNode;
},addChild:function(_93e,_93f){
if(!_93e){
return;
}
var _940;
var _941=this.getHelper();
if(_941&&_941.getContainerNode){
_940=_941.getContainerNode(this);
}else{
_940=this.getContainerNode();
}
if(_940){
if(_93f===undefined||_93f===null||_93f===-1){
_940.appendChild(_93e.domNode);
this._srcElement.addChild(_93e._srcElement);
}else{
var _942=this.getChildren();
if(_93f<_942.length){
_940.insertBefore(_93e.domNode,_942[_93f].domNode);
this._srcElement.insertBefore(_93e._srcElement,_942[_93f]._srcElement);
}else{
_940.appendChild(_93e.domNode);
this._srcElement.addChild(_93e._srcElement);
}
}
}
},getParent:function(){
return require("davinci/ve/widget").getEnclosingWidget(this.domNode.parentNode)||this.domNode.parentNode;
},getObjectId:function(_943){
_943=_943||this;
var _944=_943._edit_object_id;
if(_944){
return _944;
}
if(_943.domNode){
return _943.domNode.getAttribute("jsId");
}
return undefined;
},addClass:function(_945){
var _946=this.getClassNames();
_946=_946?_946.split(/\s+/):[];
if(_946.indexOf(_945)!==-1){
return;
}
_946.push(_945);
this._srcElement.setAttribute("class",_946.join(" "));
dojo.addClass(this.domNode,_945);
},getId:function(){
if(!this.id){
if(!this.domNode.id||!this.type){
return undefined;
}
var id=this.domNode.id;
var base=(this.isHtmlWidget?this.getTagName():this.type).replace(/\./g,"_")+"_";
if(id.length>base.length&&id.substring(0,base.length)==base){
return undefined;
}
}
if(this._srcElement&&this._srcElement._getAttribute("id")&&this._srcElement._getAttribute("id").noPersist){
return undefined;
}
return this.id;
},setMarginBox:function(box){
var node=this.getStyleNode();
if(!node){
return;
}
dojo.marginBox(node,box);
this._updateSrcStyle();
},getMarginBox:function(){
var node=this.domNode;
var box=null;
var _947=this.getHelper();
if(_947&&_947.getMarginBoxPageCoords){
box=_947.getMarginBoxPageCoords(this);
}else{
box=_92c.getMarginBoxPageCoords(node);
}
box.l-=_92c.getScrollLeft(node);
box.t-=_92c.getScrollTop(node);
box.x=box.l;
box.y=box.t;
return box;
},getStyle:function(_948){
var _949=this.getStyleValues(_948);
if(!_949){
return "";
}
return this._styleText(_949);
},_sortStyleValues:function(_94a){
var _94b=dojo.clone(_94a);
function _94c(_94d){
for(var i=0;i<_94b.length;i++){
if(_94b[i]&&_94b[i].hasOwnProperty(_94d)){
return i;
}
}
return -1;
};
var _94e=_929.shorthand;
var _94f=0;
for(var i=0;i<_94e.length;i++){
var _950=_94c(_94e[i][0]);
if(_950>-1){
var _951=_94b[_950];
_94b.splice(_950,1);
_94b.splice(_94f,0,_951);
_94f++;
}
}
return _94b;
},_styleText:function(v){
var s="";
if(dojo.isArray(v)){
var _952=davinci.ve.states.normalizeArray("style",this.domNode,name,v);
for(var i=0;i<_952.length;i++){
for(var name in _952[i]){
value=_952[i][name];
if(value!==undefined&&value!=""&&value!=null){
s+=name+": "+_952[i][name]+"; ";
}
}
}
}else{
for(var name in v){
value=davinci.ve.states.normalize("style",this.domNode,name,v[name]);
if(value!==undefined&&value!=""&&value!=null){
s+=name+": "+v[name]+"; ";
}
}
}
return s.trim();
},getChildrenData:function(_953){
_953=_953||{identify:true};
var _954=this.getHelper();
if(_954&&_954.getChildrenData){
return _954.getChildrenData.apply(_954,[this,_953]);
}
return this._getChildrenData(_953);
},_getChildrenData:function(_955){
return this.getChildren().map(function(w){
return w.getData(_955);
});
},getClassNames:function(){
return this._srcElement.getAttribute("class")||"";
},_getData:function(_956){
var data={type:this.type,properties:{}},_957=require("davinci/ve/widget");
if(_956.identify){
if(!this._srcElement){
this._srcElement=_957._createSrcElement(this.domNode);
}
var _958=this._srcElement._getAttribute("id");
if(_958&&_958.noPersist){
data.properties.isTempID=true;
}
data.properties.id=this.id;
}
if((_956.preserveTagName!==false)&&(this.id)){
data.tagName=this._srcElement.tag;
}
var _959=_928.query(this,"property");
if(this.domNode&&this.domNode.parentNode){
var _95a=_957.getEnclosingWidget(this.domNode.parentNode);
var _95b=_928.query(_95a,"childProperties");
if(_95b){
if(!_959){
_959=_95b;
}else{
_959=dojo.mixin({},_959,_95b);
}
}
}
if(_959){
for(var name in _959){
if(this._skipAttrs.indexOf(name.toLowerCase())!==-1){
continue;
}
var _95c=_959[name];
var _95d=this.getPropertyValue(name);
if(_95d&&_95d.length){
if(_95c.datatype=="array"){
if(!_92d(_95d,_95c.defaultValue)){
data.properties[name]=_95d;
}
}else{
if(_95d!=_95c.defaultValue){
data.properties[name]=_95d;
}
}
}else{
if((_95c.datatype=="boolean"||_95c.datatype=="number")&&_95d!=_95c.defaultValue){
data.properties[name]=_95d;
}else{
if(_95c.datatype&&(_95c.datatype.indexOf("dijit")==0||_95c.datatype=="object"&&_95c.isData)){
data.properties[name]=_95d;
}
}
}
}
}
data.properties.style=this.getStyle(_956);
var _95e=this.getClassNames(_956);
if(_95e){
data.properties["class"]=_95e;
}
data.children=this.getChildrenData(_956);
return data;
},getData:function(_95f){
_95f=_95f||{identify:true,preserveStates:true};
var data,_960=this.getHelper();
if(_960&&_960.getData){
data=_960.getData.apply(_960,[this,_95f]);
}else{
data=this._getData(_95f);
}
data.maqAppStates=dojo.clone(this.domNode._maqAppStates);
data.maqDeltas=dojo.clone(this.domNode._maqDeltas);
if(!data.properties){
data.properties={};
}
if(this.properties){
for(var name in this.properties){
if(!(name in data.properties)){
data.properties[name]=this.properties[name];
}
}
}
var _961=this._srcElement;
var _962=_961.attributes;
for(var i=0;i<_962.length;i++){
var _963=_962[i];
if(_963.name.substr(0,2).toLowerCase()=="on"){
data.properties[_963.name]=_963.value;
}
}
return data;
},getPropertyValue:function(name){
if(name==="id"){
return this.getId();
}else{
if(name==="jsId"){
return this.getObjectId();
}
}
var _964=this.getHelper();
if(_964&&_964.getPropertyValue){
return _964.getPropertyValue(this,name);
}
return this._getPropertyValue(name);
},_getPropertyValue:function(name){
return this.domNode.getAttribute(name);
},getTagName:function(){
return this.domNode.nodeName.toLowerCase();
},getStyleValues:function(){
function _965(_966){
for(var j=_967.length-1;j>=0;j--){
var item=_967[j];
if(item[_966]!==undefined){
_967.splice(j,1);
}
}
};
var _968=this.getStyleNode().style;
var text=this._srcElement.getAttribute("style");
var _967=require("davinci/ve/widget").parseStyleValues(text);
var _969=this.getParent();
if(_968&&_969&&_969.dijitWidget&&_969.dijitWidget.addChild&&!_969.acceptsHTMLChildren){
_965("position");
_965("left");
_965("top");
}
return _967;
},getStyleValuesAllStates:function(){
var _96a=this.getStyleValues();
var _96b={"undefined":_96a};
var _96c=this.domNode._maqDeltas;
if(_96c){
for(var _96d in _96c){
if(_96c[_96d].style){
if(_96d=="undefined"){
_96b[_96d]=_92b.mergeStyleArrays(_96a,_96c[_96d].style);
}else{
_96b[_96d]=_96c[_96d].style;
}
}
}
}
return _96b;
},_updateSrcStyle:function(){
var _96e=this.getStyle();
if(_96e.length){
this._srcElement.addAttribute("style",_96e);
}else{
this._srcElement.removeAttribute("style");
}
},_getStyleString:function(_96f){
if(!_96f){
return "";
}
var v=this._sortStyleValues(_96f);
var text=this._styleText(v);
return text;
},setStyleValuesCanvas:function(_970){
if(!_970){
return;
}
var text=this._getStyleString(_970);
var _971=this.getStyleNode();
dojo.attr(_971,"style",text);
if(this.dijitWidget){
this.dijitWidget.style=text;
}
},setStyleValuesModel:function(_972){
var text=this._getStyleString(_972);
if(text.length>0){
this._srcElement.addAttribute("style",text);
}else{
this._srcElement.removeAttribute("style");
}
},setStyleValuesAllStates:function(_973){
this.domNode._maqDeltas=undefined;
if(_973){
for(var _974 in _973){
var _975=_973[_974];
if(_974==="undefined"){
_974=undefined;
}
davinci.ve.states.setStyle(this.domNode,_974,_975,true);
}
}
},isLayout:function(){
return false;
},resize:function(){
},refresh:function(){
var _976=this.getParent();
if(_976.dijitWidget){
_976.refresh();
}else{
if(this.resize){
this.resize();
}
}
},removeChild:function(_977){
if(!_977){
return;
}
var _978=this.getContainerNode();
if(_978){
_978.removeChild(_977.domNode);
this._srcElement.removeChild(_977._srcElement);
}
},setProperties:function(_979,_97a){
if(!this.properties){
this.properties={};
}
_97a=_97a||false;
if(_979.id){
this._srcElement.addAttribute("id",_979.id,_979.isTempID);
delete _979.id;
delete _979.isTempID;
}
if(_979.isTempID){
delete _979.isTempID;
}
for(var name in _979){
var _97b=_979[name];
if(_97b||typeof _97b=="boolean"||typeof _97b=="number"){
var _97c=this._stringValue(name,_97b);
if(!_97a){
this.properties[name]=_97c;
}
this._srcElement.addAttribute(name,_97c);
}else{
delete this.properties[name];
this._srcElement.removeAttribute(name);
}
}
},startup:function(){
},renderWidget:function(){
},destroyWidget:function(_97d){
var _97e=this.getHelper();
if(_97e&&_97e.destroy){
_97e.destroy(this);
return;
}
if(this.dijitWidget){
this.dijitWidget.destroyRecursive();
}else{
dojo.forEach(this.getChildren(),function(each){
each.destroyWidget();
});
}
},selectChild:function(_97f){
},attach:function(){
var _980=this.getHelper();
if(_980&&_980.create){
_980.create(this,this._srcElement);
}
},_stringValue:function(_981,_982){
var _983=this.getMetadata();
var _984=_983.property&&_983.property[_981];
if(!_984){
return _982;
}
if(_984.datatype=="object"){
if(_982.getObjectId){
_982=_982.getObjectId();
}else{
var _985=_982._edit_object_id;
if(_985){
return _985;
}
if(_982.domNode){
return _982.domNode.getAttribute("jsId");
}
}
}else{
if(_984.datatype=="json"){
var _986=this.getContext();
var dj=_986&&_986.getDojo()||dojo;
var _987=this.getHelper();
if(_987&&_987.checkValue){
_982=_987.checkValue(_982);
}
if(dj.isObject(_982)){
_982=dj.toJson(_982);
}
}else{
if(_984.datatype=="string"){
switch(_984.format){
case "date":
case "time":
if(isFinite(_982)){
_982=dojo.date.stamp.toISOString(_982,{selector:_984.format});
}
break;
default:
_982=_92a.encode(_982);
}
}
}
}
return _982;
}});
});
},"url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"\n\t\t\t\trole=\"header\" level=\"1\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t\t</span>\n\t</div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n","dijit/form/TextBox":function(){
define(["dojo/_base/declare","dojo/dom-construct","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/sniff","./_FormValueWidget","./_TextBoxMixin","dojo/text!./templates/TextBox.html","../main"],function(_988,_989,_98a,_98b,lang,has,_98c,_98d,_98e,_98f){
var _990=_988("dijit.form.TextBox",[_98c,_98d],{templateString:_98e,_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" data-dojo-attach-point=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:has("ie")?"disabled":"",baseClass:"dijitTextBox",postMixInProperties:function(){
var type=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((type=="hidden"||type=="file")&&this.templateString==this.constructor.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")<9){
this.defer(function(){
try{
var s=_98a.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _991=this.domNode.getElementsByTagName("INPUT");
if(_991){
for(var i=0;i<_991.length;i++){
_991[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
});
}
},_onInput:function(e){
this.inherited(arguments);
if(this.intermediateChanges){
this.defer(function(){
this._handleOnChange(this.get("value"),false);
});
}
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=_989.create("span",{className:"dijitPlaceHolder dijitInputField"},this.textbox,"after");
}
this._phspan.innerHTML="";
this._phspan.appendChild(this._phspan.ownerDocument.createTextNode(v));
this._updatePlaceHolder();
},_updatePlaceHolder:function(){
if(this._phspan){
this._phspan.style.display=(this.placeHolder&&!this.focused&&!this.textbox.value)?"":"none";
}
},_setValueAttr:function(_992,_993,_994){
this.inherited(arguments);
this._updatePlaceHolder();
},getDisplayedValue:function(){
_98b.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use get('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},setDisplayedValue:function(_995){
_98b.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_995);
},_onBlur:function(e){
if(this.disabled){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
if(has("mozilla")){
if(this.selectOnClick){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
}
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
}});
if(has("ie")){
_990.prototype._isTextSelected=function(){
var _996=this.ownerDocument.selection.createRange();
var _997=_996.parentElement();
return _997==this.textbox&&_996.text.length>0;
};
_98f._setSelectionRange=_98d._setSelectionRange=function(_998,_999,stop){
if(_998.createTextRange){
var r=_998.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_999);
r.moveEnd("character",stop-_999);
r.select();
}
};
}
return _990;
});
},"davinci/ve/tools/_Tool":function(){
define(["dojo/_base/declare","davinci/ve/widget","davinci/ve/metadata","davinci/ve/utils/GeomUtils"],function(_99a,_99b,_99c,_99d){
return _99a("davinci.ve.tools._Tool",null,{_getTarget:function(){
return this._target;
},_setTarget:function(_99e,_99f){
if(!this._targetOverlays){
this._targetOverlays=[];
}
if(this._matchesTargetOverlay(_99e)){
return;
}
var _9a0=this._context.getContainerNode();
var w;
while(_99e&&_99e!=_9a0){
w=_99b.getEnclosingWidget(_99e);
if(w&&!w.getContext()){
_99e=w.domNode.parentNode;
w=null;
}else{
if(w&&davinci.ve.metadata.queryDescriptor(w.type,"enablePointerEvents")){
w=null;
break;
}else{
if(w&&w.getContainerNode()){
if(!davinci.ve.metadata.queryDescriptor(w.type,"isControl")){
w=null;
}
}
break;
}
}
}
if(w){
this._target=w;
this._updateTargetOverlays(_99f);
this._insertTargetOverlays();
}else{
this._removeTargetOverlays();
this._target=null;
}
},_updateTargetOverlays:function(_9a1){
this._removeTargetOverlays();
if(!this._target){
return;
}
var _9a2=this._target.domNode;
var _9a3=this._getMaxZIndex(_9a2);
if(this._targetOverlays){
var _9a4=this._target.getHelper();
if(_9a4&&_9a4.getTargetOverlays){
var _9a5=_9a4.getTargetOverlays(this._target);
if(_9a5&&_9a5.length>0){
dojo.forEach(_9a5,function(_9a6){
var _9a7=this._getNewTargetOverlay(_9a6,_9a6.x,_9a6.y,_9a6.width,_9a6.height,_9a3);
this._targetOverlays.push(_9a7);
},this);
return;
}
}
var left=_9a2.offsetLeft;
var top=_9a2.offsetTop;
var _9a8=_9a2.offsetWidth;
var _9a9=_9a2.offsetHeight;
if(_9a1){
var diff;
var _9aa=_99d.getBorderBoxPageCoordsCached(_9a2);
if(_9a1.pageX<_9aa.l){
diff=_9aa.l-_9a1.pageX;
left-=diff;
_9a8+=diff;
}
if(_9a1.pageY<_9aa.t){
diff=_9aa.t-_9a1.pageY;
top-=diff;
_9a9+=diff;
}
if(_9a1.pageX>_9aa.l+_9aa.w){
diff=_9a1.pageX-(_9aa.l+_9aa.w);
_9a8+=diff;
}
if(_9a1.pageY>_9aa.t+_9aa.h){
diff=_9a1.pageY-(_9aa.t+_9aa.h);
_9a9+=diff;
}
}
var _9ab=this._getNewTargetOverlay(_9a2,left,top,_9a8,_9a9,_9a3);
this._targetOverlays.push(_9ab);
}
},_getMaxZIndex:function(_9ac){
var _9ad=dojo.style(_9ac,"zIndex");
dojo.query("*",_9ac).forEach(function(node){
var _9ae=dojo.style(node,"zIndex");
var _9af=Number(_9ae);
var _9b0=Number(_9ad);
if(!isNaN(_9af)){
if(isNaN(_9b0)){
_9ad=_9ae;
}else{
if(_9af>_9b0){
_9ad=_9ae;
}
}
}
});
return _9ad;
},_getNewTargetOverlay:function(_9b1,x,y,_9b2,_9b3,_9b4){
var _9b5=this._context.getDojo().create("div",{className:"editFeedback",style:{position:"absolute",opacity:0.1,left:x+"px",top:y+"px",width:_9b2+"px",height:_9b3+"px",zIndex:_9b4}});
return _9b5;
},_insertTargetOverlays:function(){
if(this._targetOverlays&&this._target){
var _9b6=this._target.domNode;
var _9b7=_9b6.parentNode;
dojo.forEach(this._targetOverlays,function(_9b8){
_9b7.insertBefore(_9b8,_9b6.nextSibling);
},this);
}
},_removeTargetOverlays:function(){
if(this._targetOverlays&&this._target){
for(var i=this._targetOverlays.length-1;i>=0;i--){
var _9b9=this._targetOverlays[i];
dojo.destroy(_9b9);
this._targetOverlays.pop();
}
}
},_matchesTargetOverlay:function(_9ba){
return dojo.some(this._targetOverlays,function(_9bb){
return _9ba==_9bb;
},this);
}});
});
},"davinci/html/CSSProperty":function(){
define(["dojo/_base/declare","davinci/html/CSSElement"],function(_9bc,_9bd){
return _9bc("davinci.html.CSSProperty",_9bd,{constructor:function(name,_9be,_9bf){
this.elementType="CSSProperty";
this.name=name||"";
this.value=_9be||"";
this.parent=_9bf;
this.expanded=[];
this.lengthValues=[];
},getValue:function(){
return this.value;
},getText:function(_9c0){
var s="";
if(this.comment&&!_9c0.noComments){
s+="\n  "+this.comment.getText(_9c0);
}
s+=this.name+" : "+this.value;
if(this.isNotImportant){
s+=" !important";
}
s+=";";
if(this.postComment&&!_9c0.noComments){
s+=this.postComment.getText(_9c0);
}
return s;
},getCSSRule:function(){
return this.parent;
},addProperty:function(name,_9c1){
var _9c2=new CSSProperty(name,_9c1,this);
this.properties.push(_9c2);
},getURL:function(){
if(this.url){
var path=new davinci.model.Path(this.getCSSFile().url);
path=path.getParentPath().append(this.url);
return path.toString();
}
}});
});
},"davinci/ve/commands/StyleCommand":function(){
define(["dojo/_base/declare","davinci/ve/widget","davinci/ve/utils/StyleArray"],function(_9c3,_9c4,_9c5){
return _9c3("davinci.ve.commands.StyleCommand",null,{name:"style",constructor:function(_9c6,_9c7,_9c8){
this._newValues=_9c7;
this._id=_9c6?_9c6.id:undefined;
this._applyToStateIndex=(!_9c8||_9c8=="Normal"||_9c8=="undefined")?"undefined":_9c8;
},add:function(_9c9){
if(!_9c9||_9c9._id!=this._id){
return;
}
if(_9c9._newValues){
dojo.mixin(this._newValues,_9c9._newValues);
}
},execute:function(){
if(!this._id||!this._newValues){
return;
}
var _9ca=require("davinci/ve/widget").byId(this._id);
if(!_9ca||!_9ca.domNode){
return;
}
var _9cb=require("davinci/ve/States");
var _9cc=_9ca.getStyleValuesAllStates();
this._oldStyleValuesAllStates=dojo.clone(_9cc);
if(_9cc[this._applyToStateIndex]){
_9cc[this._applyToStateIndex]=_9c5.mergeStyleArrays(_9cc[this._applyToStateIndex],this._newValues);
}else{
_9cc[this._applyToStateIndex]=this._newValues;
}
_9ca.setStyleValuesAllStates(_9cc);
var _9cd=_9cb.getStatesListCurrent(_9ca.domNode);
var _9ce=_9c5.mergeStyleArrays([],_9cc["undefined"]);
for(var i=0;i<_9cd.length;i++){
if(_9cc[_9cd[i]]){
_9ce=_9c5.mergeStyleArrays(_9ce,_9cc[_9cd[i]]);
}
}
_9ca.setStyleValuesCanvas(_9ce);
_9ca.setStyleValuesModel(_9cc["undefined"]);
_9ca.refresh();
_9cb.resetState(_9ca.domNode);
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[_9ca]]);
},undo:function(){
if(!this._id||!this._oldStyleValuesAllStates){
return;
}
var _9cf=require("davinci/ve/widget").byId(this._id);
if(!_9cf){
return;
}
var _9d0=require("davinci/ve/States");
var _9d1=this._oldStyleValuesAllStates;
var _9d2=this._applyToStateIndex;
_9cf.setStyleValuesAllStates(_9d1);
var _9d3=_9c5.mergeStyleArrays(_9d1["undefined"],_9d1[_9d2]);
_9cf.setStyleValuesCanvas(_9d3);
_9cf.setStyleValuesModel(this._oldStyleValuesAllStates["undefined"]);
_9cf.refresh();
require("davinci/ve/States").resetState(_9cf.domNode);
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[_9cf]]);
}});
});
},"url:davinci/review/widgets/templates/OpenReviewDialog.html":"<div class=\"fileDialog\">\n\t<div class=\"dijitDialogPaneContentArea folderContainer\">\n\t\t<div dojoType=\"dijit.layout.ContentPane\" dojoAttachPoint=\"treeContentPane\">\n\t\t</div>\n\t</div>\n\t\n\t<div class=\"dijitDialogPaneActionBar\">\n\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"okButton\" dojoAttachEvent=\"onClick:_okButton\" type=\"submit\" class=\"maqPrimaryButton\" disabled=\"disabled\">${finishButtonLabel}</button>\n\t\t<button dojoType=\"dijit.form.Button\" dojoAttachEvent=\"onClick:_cancelButton\" class=\"maqSecondaryButton\">${cancelButtonLabel}</button>\n\t</div>\n</div>\n","dijit/form/_DateTimeTextBox":function(){
define(["dojo/date","dojo/date/locale","dojo/date/stamp","dojo/_base/declare","dojo/_base/lang","./RangeBoundTextBox","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(date,_9d4,_9d5,_9d6,lang,_9d7,_9d8,_9d9){
new Date("X");
var _9da=_9d6("dijit.form._DateTimeTextBox",[_9d7,_9d8],{templateString:_9d9,hasDownArrow:true,cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},pattern:_9d4.regexp,datePackage:"",postMixInProperties:function(){
this.inherited(arguments);
this._set("type","text");
},compare:function(val1,val2){
var _9db=this._isInvalidDate(val1);
var _9dc=this._isInvalidDate(val2);
return _9db?(_9dc?0:-1):(_9dc?1:date.compare(val1,val2,this._selector));
},forceWidth:true,format:function(_9dd,_9de){
if(!_9dd){
return "";
}
return this.dateLocaleModule.format(_9dd,_9de);
},"parse":function(_9df,_9e0){
return this.dateLocaleModule.parse(_9df,_9e0)||(this._isEmpty(_9df)?null:undefined);
},serialize:function(val,_9e1){
if(val.toGregorian){
val=val.toGregorian();
}
return _9d5.toISOString(val,_9e1);
},dropDownDefaultValue:new Date(),value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(_9e2){
this.dateModule=_9e2.datePackage?lang.getObject(_9e2.datePackage,false):date;
this.dateClassObj=this.dateModule.Date||Date;
this.dateLocaleModule=_9e2.datePackage?lang.getObject(_9e2.datePackage+".locale",false):_9d4;
this._set("pattern",this.dateLocaleModule.regexp);
this._invalidDate=this.constructor.prototype.value.toString();
},buildRendering:function(){
this.inherited(arguments);
if(!this.hasDownArrow){
this._buttonNode.style.display="none";
}
if(!this.hasDownArrow){
this._buttonNode=this.domNode;
this.baseClass+=" dijitComboBoxOpenOnClick";
}
},_setConstraintsAttr:function(_9e3){
_9e3.selector=this._selector;
_9e3.fullYear=true;
var _9e4=_9d5.fromISOString;
if(typeof _9e3.min=="string"){
_9e3.min=_9e4(_9e3.min);
}
if(typeof _9e3.max=="string"){
_9e3.max=_9e4(_9e3.max);
}
this.inherited(arguments);
},_isInvalidDate:function(_9e5){
return !_9e5||isNaN(_9e5)||typeof _9e5!="object"||_9e5.toString()==this._invalidDate;
},_setValueAttr:function(_9e6,_9e7,_9e8){
if(_9e6!==undefined){
if(typeof _9e6=="string"){
_9e6=_9d5.fromISOString(_9e6);
}
if(this._isInvalidDate(_9e6)){
_9e6=null;
}
if(_9e6 instanceof Date&&!(this.dateClassObj instanceof Date)){
_9e6=new this.dateClassObj(_9e6);
}
}
this.inherited(arguments);
if(this.value instanceof Date){
this.filterString="";
}
if(this.dropDown){
this.dropDown.set("value",_9e6,false);
}
},_set:function(attr,_9e9){
if(attr=="value"&&this.value instanceof Date&&this.compare(_9e9,this.value)==0){
return;
}
this.inherited(arguments);
},_setDropDownDefaultValueAttr:function(val){
if(this._isInvalidDate(val)){
val=new this.dateClassObj();
}
this.dropDownDefaultValue=val;
},openDropDown:function(_9ea){
if(this.dropDown){
this.dropDown.destroy();
}
var _9eb=lang.isString(this.popupClass)?lang.getObject(this.popupClass,false):this.popupClass,_9ec=this,_9ed=this.get("value");
this.dropDown=new _9eb({onChange:function(_9ee){
_9ec.set("value",_9ee,true);
},id:this.id+"_popup",dir:_9ec.dir,lang:_9ec.lang,value:_9ed,currentFocus:!this._isInvalidDate(_9ed)?_9ed:this.dropDownDefaultValue,constraints:_9ec.constraints,filterString:_9ec.filterString,datePackage:_9ec.params.datePackage,isDisabledDate:function(date){
return !_9ec.rangeCheck(date,_9ec.constraints);
}});
this.inherited(arguments);
},_getDisplayedValueAttr:function(){
return this.textbox.value;
},_setDisplayedValueAttr:function(_9ef,_9f0){
this._setValueAttr(this.parse(_9ef,this.constraints),_9f0,_9ef);
}});
return _9da;
});
},"dijit/layout/StackContainer":function(){
define(["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/has","dojo/_base/lang","dojo/ready","dojo/topic","../registry","../_WidgetBase","./_LayoutWidget","dojo/i18n!../nls/common"],function(_9f1,_9f2,_9f3,_9f4,has,lang,_9f5,_9f6,_9f7,_9f8,_9f9){
if(has("dijit-legacy-requires")){
_9f5(0,function(){
var _9fa=["dijit/layout/StackController"];
require(_9fa);
});
}
var _9fb=_9f3("dijit.layout.StackContainer",_9f9,{doLayout:true,persist:false,baseClass:"dijitStackContainer",buildRendering:function(){
this.inherited(arguments);
_9f4.add(this.domNode,"dijitLayoutContainer");
this.containerNode.setAttribute("role","tabpanel");
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onkeypress",this._onKeyPress);
},startup:function(){
if(this._started){
return;
}
var _9fc=this.getChildren();
_9f1.forEach(_9fc,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=_9f7.byId(_9f2(this.id+"_selectedChild"));
}else{
_9f1.some(_9fc,function(_9fd){
if(_9fd.selected){
this.selectedChildWidget=_9fd;
}
return _9fd.selected;
},this);
}
var _9fe=this.selectedChildWidget;
if(!_9fe&&_9fc[0]){
_9fe=this.selectedChildWidget=_9fc[0];
_9fe.selected=true;
}
_9f6.publish(this.id+"-startup",{children:_9fc,selected:_9fe});
this.inherited(arguments);
},resize:function(){
if(!this._hasBeenShown){
this._hasBeenShown=true;
var _9ff=this.selectedChildWidget;
if(_9ff){
this._showChild(_9ff);
}
}
this.inherited(arguments);
},_setupChild:function(_a00){
this.inherited(arguments);
_9f4.replace(_a00.domNode,"dijitHidden","dijitVisible");
_a00.domNode.title="";
},addChild:function(_a01,_a02){
this.inherited(arguments);
if(this._started){
_9f6.publish(this.id+"-addChild",_a01,_a02);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_a01);
}
}
},removeChild:function(page){
this.inherited(arguments);
if(this._started){
_9f6.publish(this.id+"-removeChild",page);
}
if(this._descendantsBeingDestroyed){
return;
}
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this._started){
var _a03=this.getChildren();
if(_a03.length){
this.selectChild(_a03[0]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(page,_a04){
page=_9f7.byId(page);
if(this.selectedChildWidget!=page){
var d=this._transition(page,this.selectedChildWidget,_a04);
this._set("selectedChildWidget",page);
_9f6.publish(this.id+"-selectChild",page);
if(this.persist){
_9f2(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
return d;
},_transition:function(_a05,_a06){
if(_a06){
this._hideChild(_a06);
}
var d=this._showChild(_a05);
if(_a05.resize){
if(this.doLayout){
_a05.resize(this._containerContentBox||this._contentBox);
}else{
_a05.resize();
}
}
return d;
},_adjacent:function(_a07){
var _a08=this.getChildren();
var _a09=_9f1.indexOf(_a08,this.selectedChildWidget);
_a09+=_a07?1:_a08.length-1;
return _a08[_a09%_a08.length];
},forward:function(){
return this.selectChild(this._adjacent(true),true);
},back:function(){
return this.selectChild(this._adjacent(false),true);
},_onKeyPress:function(e){
_9f6.publish(this.id+"-containerKeyPress",{e:e,page:this});
},layout:function(){
var _a0a=this.selectedChildWidget;
if(_a0a&&_a0a.resize){
if(this.doLayout){
_a0a.resize(this._containerContentBox||this._contentBox);
}else{
_a0a.resize();
}
}
},_showChild:function(page){
var _a0b=this.getChildren();
page.isFirstChild=(page==_a0b[0]);
page.isLastChild=(page==_a0b[_a0b.length-1]);
page._set("selected",true);
_9f4.replace(page.domNode,"dijitVisible","dijitHidden");
return (page._onShow&&page._onShow())||true;
},_hideChild:function(page){
page._set("selected",false);
_9f4.replace(page.domNode,"dijitHidden","dijitVisible");
page.onHide&&page.onHide();
},closeChild:function(page){
var _a0c=page.onClose(this,page);
if(_a0c){
this.removeChild(page);
page.destroyRecursive();
}
},destroyDescendants:function(_a0d){
this._descendantsBeingDestroyed=true;
this.selectedChildWidget=undefined;
_9f1.forEach(this.getChildren(),function(_a0e){
if(!_a0d){
this.removeChild(_a0e);
}
_a0e.destroyRecursive(_a0d);
},this);
this._descendantsBeingDestroyed=false;
}});
_9fb.ChildWidgetProperties={selected:false,disabled:false,closable:false,iconClass:"dijitNoIcon",showTitle:true};
lang.extend(_9f8,_9fb.ChildWidgetProperties);
return _9fb;
});
},"dijit/form/_RadioButtonMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/_base/event","dojo/_base/lang","dojo/query","../registry"],function(_a0f,_a10,_a11,_a12,lang,_a13,_a14){
return _a10("dijit.form._RadioButtonMixin",null,{type:"radio",_getRelatedWidgets:function(){
var ary=[];
_a13("input[type=radio]",this.focusNode.form||this.ownerDocument).forEach(lang.hitch(this,function(_a15){
if(_a15.name==this.name&&_a15.form==this.focusNode.form){
var _a16=_a14.getEnclosingWidget(_a15);
if(_a16){
ary.push(_a16);
}
}
}));
return ary;
},_setCheckedAttr:function(_a17){
this.inherited(arguments);
if(!this._created){
return;
}
if(_a17){
_a0f.forEach(this._getRelatedWidgets(),lang.hitch(this,function(_a18){
if(_a18!=this&&_a18.checked){
_a18.set("checked",false);
}
}));
}
},_getSubmitValue:function(_a19){
return _a19===null?"on":_a19;
},_onClick:function(e){
if(this.checked||this.disabled){
_a12.stop(e);
return false;
}
if(this.readOnly){
_a12.stop(e);
_a0f.forEach(this._getRelatedWidgets(),lang.hitch(this,function(_a1a){
_a11.set(this.focusNode||this.domNode,"checked",_a1a.checked);
}));
return false;
}
return this.inherited(arguments);
}});
});
},"davinci/html/PHPBlock":function(){
define(["dojo/_base/declare","davinci/html/HTMLItem"],function(_a1b,_a1c){
return _a1b("davinci.html.PHPBlock",_a1c,{constructor:function(_a1d){
this.elementType="PHPBlock";
this.value=_a1d||"";
},getText:function(_a1e){
return _a1e.excludeIgnoredContent?"":this.value;
}});
});
},"davinci/ve/tools/CreateTool":function(){
define(["dojo/_base/declare","../tools/_Tool","davinci/Workbench","davinci/workbench/Preferences","../metadata","../widget","dojo/Deferred","dojo/promise/all","davinci/commands/CompoundCommand","../commands/AddCommand","../commands/MoveCommand","../commands/ResizeCommand","../commands/StyleCommand"],function(_a1f,_a20,_a21,_a22,_a23,_a24,_a25,all,_a26,_a27,_a28,_a29,_a2a){
var _a2b="The selected target is not a valid parent for the given widget.";
return _a1f("davinci.ve.tools.CreateTool",_a20,{constructor:function(data){
this._data=data;
if(data&&data.type){
var _a2c=_a23.queryDescriptor(data.type,"resizableOnCreate");
var _a2d=_a2c||_a23.queryDescriptor(data.type,"resizable");
if(_a2d!=="none"){
this._resizable=_a2d;
}
this._dropCursor=_a23.queryDescriptor(data.type,"dropCursor");
}
this._requireHelpers(data);
},activate:function(_a2e){
this._context=_a2e;
if(_a2e&&_a2e.rootNode){
this._oldCursor=_a2e.rootNode.style.cursor;
}
_a2e.rootNode.style.cursor="crosshair";
},deactivate:function(){
if(this._context&&this._context.rootNode){
this._context.rootNode.style.cursor=this._oldCursor;
}
this._setTarget(null);
delete this._mdPosition;
this._context.dragMoveCleanup();
},onMouseDown:function(_a2f){
this._target=_a24.getEnclosingWidget(_a2f.target);
this._mdPosition=this._context.getContentPosition(_a2f);
this._dragRect=null;
},onMouseMove:function(_a30){
var _a31=this._context;
var cp=_a31._chooseParent;
if(_a30.target!=this._lastEventTarget){
cp.setProposedParentWidget(null);
}
this._lastEventTarget=_a30.target;
if(this._mdPosition){
if(this._resizable){
_a31.deselect();
var p=_a31.getContentPosition(_a30);
var l,t,w,h;
var _a32=true;
var _a33=true;
if(p.x>=this._mdPosition.x){
l=this._mdPosition.x;
w=p.x-this._mdPosition.x;
}else{
l=p.x;
w=this._mdPosition.x-p.x;
_a32=false;
}
if(p.y>=this._mdPosition.y){
t=this._mdPosition.y;
h=p.y-this._mdPosition.y;
}else{
t=p.y;
h=this._mdPosition.y-p.y;
_a33=false;
}
if(_a30.shiftKey){
if(w>=h){
h=w;
if(!_a33){
t=this._mdPosition.y-h;
}
}else{
w=h;
if(!_a32){
l=this._mdPosition.x-w;
}
}
}
if(!this._dragSizeRect){
var body=_a31.getDocument().body;
this._dragSizeRect=dojo.create("div",{style:"border:1px dashed black;z-index:1000001;position:absolute;"},body);
}
var _a34=this._dragSizeRect.style;
_a34.left=l+"px";
_a34.top=t+"px";
_a34.width=w+"px";
_a34.height=h+"px";
if(w>4||h>4){
var box={l:l,t:t,w:(w>0?w:1),h:(h>0?h:1)};
_a31.focus({box:box,op:{}});
}else{
_a31.focus(null);
}
}
}else{
var _a35=!this.createWithFlowLayout();
this._setTarget(_a30.target,_a30);
var _a36=_a31.getPreference("showPossibleParents");
var _a37=(!_a36&&this._spaceKeyDown)||(_a36&&!this._spaceKeyDown);
var _a38={x:_a30.pageX,y:_a30.pageY};
var box={l:_a30.pageX,t:_a30.pageY,w:0,h:0};
var _a39=_a22.getPreferences("davinci.ve.editorPrefs",_a21.getProject());
var _a3a=_a39.snap&&_a35;
var _a3b=_a3a;
var _a3c=!_a35;
if(typeof this._dropCursor=="object"&&this._dropCursor.show===false){
_a3c=false;
}
var _a3d=this._dropCursor&&this._dropCursor.beforeAfter;
_a31.dragMoveUpdate({data:this._data,position:_a38,absolute:_a35,currentParent:null,eventTarget:_a30.target,rect:box,doSnapLinesX:_a3a,doSnapLinesY:_a3b,doFindParentsXY:_a37,doCursor:_a3c,beforeAfter:_a3d});
}
},onMouseUp:function(_a3e){
var _a3f=this._context;
var cp=_a3f._chooseParent;
var _a40=!this.createWithFlowLayout();
if(this._dragSizeRect){
var _a41=this._dragSizeRect.parentNode;
_a41.removeChild(this._dragSizeRect);
this._dragSizeRect=null;
}
var _a42=_a3f.getActiveDragDiv();
if(_a42){
var _a43=dojo.query(".maqCandidateParents",_a42);
if(_a43.length==1){
_a43[0].innerHTML="";
}
}
this._lastEventTarget=null;
var size,_a44,w,h;
var p=_a3f.getContentPosition(_a3e);
if(this._mdPosition){
var _a45=true;
var _a46=true;
this._position=dojo.mixin({},this._mdPosition);
if(p.x<this._mdPosition.x){
this._position.x=p.x;
}
if(this._resizable=="height"){
w=0;
}else{
if(p.x-this._mdPosition.x>=0){
w=p.x-this._mdPosition.x;
}else{
w=this._mdPosition.x-p.x;
_a45=false;
}
}
if(p.y<this._mdPosition.y){
this._position.y=p.y;
}
if(this._resizable=="width"){
h=0;
}else{
if(p.y-this._mdPosition.y>=0){
h=p.y-this._mdPosition.y;
}else{
h=this._mdPosition.y-p.y;
_a46=false;
}
}
if(_a3e.shiftKey){
if(w>=h){
h=w;
if(!_a46){
t=this._mdPosition.y-h;
}
}else{
w=h;
if(!_a45){
l=this._mdPosition.x-w;
}
}
}
}else{
this._position=p;
}
if(this._resizable&&this._position){
var w,h;
if(w>4||h>4){
size={w:(w>0?w:undefined),h:(h>0?h:undefined)};
}
}
var ppw=cp.getProposedParentWidget();
if(ppw){
_a44=ppw.parent;
if(ppw.refChild){
var _a47=ppw.parent.getChildren();
var idx=_a47.indexOf(ppw.refChild);
if(idx>=0){
if(ppw.refAfter){
idx++;
}
}else{
idx=null;
}
}
}else{
var _a48=this._getTarget()||_a24.getEnclosingWidget(_a3e.target);
var data=this._data;
var _a49=cp.getAllowedTargetWidget(_a48,data,true,{absolute:_a40});
var _a4a=dojo.isArray(data)?data[0].type:data.type;
var _a4b=_a24.getWidgetHelper(_a4a);
if(_a49.length>1&&_a4b&&_a4b.chooseParent){
_a44=_a4b.chooseParent(_a49);
}else{
if(_a49.length>0){
if(_a49.indexOf(_a48)>=0){
_a44=_a48;
}else{
_a44=_a49[0];
}
}
}
}
cp.setProposedParentWidget(null);
var _a4c=function(_a4d){
this.prototype=Error.prototype;
this.name="InvalidTargetWidgetError";
this.message=_a4d?_a4d:_a2b;
};
try{
var data=this._data instanceof Array?this._data:[this._data];
if(!_a44){
function _a4e(type){
var _a4f=_a23.queryDescriptor(type,"class");
if(_a4f){
return _a4f.split(/\s+/).push(type);
}
return [type];
};
var _a50=data.map(function(elem){
return elem.type;
}).join(", "),_a51=data.map(function(elem){
return {allowedParent:_a23.getAllowedParent(elem.type),classList:_a4e(elem.type)};
});
var _a52=_a2b;
if(_a51.length===1&&_a51[0].allowedParent){
_a52+=["The widget <span style=\"font-family: monospace\">",_a50,"</span> requires ",_a51[0].allowedParent.length>1?"one of the following parent types":"the parent type"," <span style=\"font-family: monospace\">",_a51[0].allowedParent.join(", "),"</span>."].join("");
var _a4a=data[0].type;
var _a4b=_a24.getWidgetHelper(_a4a);
if(_a4b&&_a4b.isAllowedError){
_a52=_a4b.isAllowedError({errorMsg:_a52,type:_a4a,allowedParent:_a51[0].allowedParent,absolute:_a40});
}
}
throw new _a4c(_a52);
}
for(var i=0;i<data.length;i++){
var type=data[i].type;
var _a53=_a23.getLibraryForType(type),_a54=_a53.name,args=[type,_a3f];
if(!_a3f._widgets.hasOwnProperty(_a54)){
_a3f._widgets[_a54]=0;
}
if(++_a3f._widgets[_a54]==1){
_a23.invokeCallback(_a53,"onFirstAdd",args);
}
_a23.invokeCallback(_a53,"onAdd",args);
}
this.create({target:_a44,index:idx,directTarget:this._getTarget(),size:size});
}
catch(e){
var _a55,_a56;
if(e instanceof _a4c){
_a55=e.message;
_a56="Invalid Target";
}else{
_a55="The action was interrupted by an internal error.";
_a56="Error";
console.error(e);
}
_a21.showMessage(_a56,_a55);
}
finally{
if(this.exitCreateToolOnMouseUp()){
_a3f.setActiveTool(null);
}
this._cleanupActions();
}
},_cleanupActions:function(){
var _a57=this._context;
_a57.dragMoveCleanup();
if(!_a57.inlineEditActive()){
var _a58=this._context.getDocument();
_a58.defaultView.focus();
}
},onKeyDown:function(_a59){
dojo.stopEvent(_a59);
var _a5a=this._context;
if(_a59.keyCode==dojo.keys.ESCAPE){
_a5a.setActiveTool(null);
this._cleanupActions();
return;
}
var _a5b=this._context.getPreference("showPossibleParents");
if(_a59.keyCode==dojo.keys.SPACE){
this._spaceKeyDown=true;
}else{
this._processKeyDown(_a59.keyCode);
}
var _a5c=(!_a5b&&this._spaceKeyDown)||(_a5b&&!this._spaceKeyDown);
var data=this._data;
var _a5d=dojo.isArray(data)?data[0].type:data.type;
var cp=_a5a._chooseParent;
var _a5e=!this.createWithFlowLayout();
var _a5f=!_a5e;
if(typeof this._dropCursor=="object"&&this._dropCursor.show===false){
_a5f=false;
}
var _a60=this._dropCursor&&this._dropCursor.beforeAfter;
var _a61=null;
cp.dragUpdateCandidateParents({widgetType:_a5d,showCandidateParents:_a5c,absolute:_a5e,doCursor:_a5f,beforeAfter:_a60,currentParent:_a61});
},_processKeyDown:function(_a62){
if(_a62>=49&&_a62<=57){
var _a63=this._context;
var cp=_a63._chooseParent;
var _a64=cp.getProposedParentsList();
if(_a64&&_a64.length>1){
var _a65=_a64.length-(_a62-48);
if(_a65>=0){
cp.setProposedParentWidget(_a64[_a65]);
}
}
}
},onKeyUp:function(_a66){
if(_a66.keyCode==dojo.keys.SPACE){
this._spaceKeyDown=false;
}
dojo.stopEvent(_a66);
var _a67=this._context.getPreference("showPossibleParents");
var _a68=(!_a67&&this._spaceKeyDown)||(_a67&&!this._spaceKeyDown);
var data=this._data;
var _a69=dojo.isArray(data)?data[0].type:data.type;
var _a6a=this._context;
var cp=_a6a._chooseParent;
var _a6b=!this.createWithFlowLayout();
var _a6c=!_a6b;
if(typeof this._dropCursor=="object"&&this._dropCursor.show===false){
_a6c=false;
}
var _a6d=this._dropCursor&&this._dropCursor.beforeAfter;
var _a6e=null;
cp.dragUpdateCandidateParents({widgetType:_a69,showCandidateParents:_a68,absolute:_a6b,doCursor:_a6c,beforeAfter:_a6d,currentParent:_a6e});
},_requireHelpers:function(data){
var _a6f=[];
if(!data||!data.type){
if(data instanceof Array){
data.forEach(function(d){
_a6f.concat(this._requireHelpers(d));
},this);
}
return _a6f;
}
_a6f.push(_a24.requireWidgetHelper(data.type));
if(data.children&&!dojo.isString(data.children)){
if(!dojo.every(data.children,function(c){
return _a6f.concat(this._requireHelpers(c));
},this)){
return _a6f;
}
}
return _a6f;
},create:function(args){
if(!args||!this._data){
return;
}
var _a70=args.target,_a71,_a72;
while(_a70){
_a71=_a70.getContainerNode();
if(_a71){
break;
}
_a72=_a70;
_a70=_a70.getParent();
}
var _a73=args.index;
var _a74;
var _a75=false;
if(this._data.properties&&this._data.properties.style&&(this._data.properties.style.indexOf("absolute")>0)){
_a75=true;
}
if(!_a75&&this.createWithFlowLayout()){
if(_a72){
_a73=_a70.indexOf(_a72);
}
}else{
if(args.position){
_a74=args.position;
}else{
if(this._position){
_a74=this._position;
}
}
}
this._data.context=this._context;
all(this._requireHelpers(this._data)).then(function(){
this._create({parent:_a70,index:_a73,position:_a74,size:args.size});
}.bind(this));
},_create:function(args){
var _a76=this._context,_a77=[],_a78=new _a25();
if(!this._loadType(this._data,_a77)){
_a78.reject();
return _a78;
}
all(_a77).then(function(){
var w;
if(this.createNewWidget()){
dojo.withDoc(this._context.getDocument(),function(){
w=_a24.createWidget(this._data);
},this);
}else{
w=this._widget;
}
if(!w){
_a78.reject(new Error("Failed to create widget"));
}
var _a79=new davinci.commands.CompoundCommand();
if(this.createNewWidget()){
args.size=this._getInitialSize(w,args);
_a79.add(new _a27(w,args.parent||this._context.getContainerNode(),args.index));
if(args.position){
var _a7a=_a76.getPreference("absoluteWidgetsZindex");
_a79.add(new _a2a(w,[{position:"absolute"},{"z-index":_a7a}]));
_a79.add(new _a28(w,args.position.x,args.position.y));
}
if(args.size){
var _a7b=args.size.w,_a7c=args.size.h;
_a79.add(new _a29(w,_a7b,_a7c));
var _a7d=_a24.getWidgetHelper(w.type);
if(_a7d&&_a7d.onCreateResize){
_a7d.onCreateResize(_a79,w,_a7b,_a7c);
}
}
}
var w_id=w.id;
if(this.addToCommandStack){
this.addToCommandStack(_a79,{widget:w});
}
if(!_a79.isEmpty()){
this._context.getCommandStack().execute(_a79);
}
if(w.isLayoutContainer){
w.resize();
}
var w=_a24.byId(w_id);
this._select(w);
this._widget=w;
_a78.resolve(w);
this.mouseUpProcessingCompleted();
}.bind(this));
return _a78;
},_loadType:function(data,_a7e){
if(!data||!data.type){
return false;
}
_a7e.push(this._context.loadRequires(data.type,true));
if(data.children&&!dojo.isString(data.children)){
dojo.forEach(data.children,function(c){
this._loadType(c,_a7e);
}.bind(this));
}
return true;
},_getInitialSize:function(w,args){
var _a7f=args.size;
var _a80=w.getHelper();
if(_a80&&_a80.initialSize){
var size=_a80.initialSize(args);
if(size){
_a7f=size;
}
}
if(!_a7f){
var _a81=_a23.queryDescriptor(w.type,"initialSize");
if(_a81){
if(args&&!args.position){
var _a82=args.parent;
if(_a82.type=="html.body"){
if(_a81=="auto"||_a81.flow=="auto"){
_a7f={w:"100%",h:"auto"};
}else{
_a7f=this._getExplicitFlowSizeFromMetadata(_a81);
}
}else{
if(this._isTypeContainer(_a82.type)){
if(_a81=="auto"||_a81.flow=="auto"){
var _a83=_a82.getData().children;
_a7f={w:"100%",h:(_a83&&_a83.length)?"auto":"100%"};
}else{
_a7f=this._getExplicitFlowSizeFromMetadata(_a81);
}
}else{
_a7f=this._getExplicitFlowSizeFromMetadata(_a81);
}
}
}else{
if(_a81=="auto"||_a81.absolute=="auto"){
_a7f={w:"300px",h:"300px"};
}else{
_a7f=this._getExplicitAbsoluteSizeFromMetadata(_a81);
}
}
}
}
return _a7f;
},_getExplicitFlowSizeFromMetadata:function(_a84){
var _a85=null;
if(_a84.flow){
_a85={w:_a84.flow.width?_a84.flow.width:"100%",h:_a84.flow.height?_a84.flow.height:"auto"};
}else{
_a85={w:_a84.width?_a84.width:"100%",h:_a84.height?_a84.height:"auto"};
}
return _a85;
},_getExplicitAbsoluteSizeFromMetadata:function(_a86){
var _a87=null;
if(_a86.absolute){
_a87={w:_a86.absolute.width?_a86.absolute.width:"300px",h:_a86.absolute.height?_a86.absolute.height:"300px",};
}else{
_a87={w:_a86.width?_a86.width:"300px",h:_a86.height?_a86.height:"300px"};
}
return _a87;
},_isTypeContainer:function(type){
return type&&(type=="dijit.layout.ContentPane"||type=="html.div"||type=="html.form"||type=="html.fieldset");
},_select:function(w){
_a23.getSmartInput(w.type).then(function(_a88){
if(!this._data.fileDragCreate&&_a88&&_a88.displayOnCreate){
w.inLineEdit_displayOnCreate=_a88.displayOnCreate;
this._context.select(w,null,true);
}else{
this._context.select(w);
}
}.bind(this));
},createWithFlowLayout:function(){
var _a89=_a23.queryDescriptor(this._data.type,"forceAbsolute");
if(_a89){
return false;
}else{
return this._context.getFlowLayout();
}
},createNewWidget:function(){
return true;
},exitCreateToolOnMouseUp:function(){
return true;
},mouseUpProcessingCompleted:function(){
}});
});
},"davinci/ve/themeEditor/metadata/CSSThemeProvider":function(){
define(["dojo/_base/declare","davinci/ve/utils/URLRewrite"],function(_a8a,_a8b){
return _a8a("davinci.ve.themeEditor.metadata.CSSThemeProvider",null,{module:"davinci.lib",path:"theme/tundra.json",constructor:function(_a8c,_a8d){
this._theme=_a8d;
this.url=_a8b.encodeURI(_a8c[0].getURL());
this.getWidgets();
},getWidgets:function(){
if(!this._widgets){
var _a8e=undefined;
dojo.xhrGet({url:""+this.url,handleAs:"json",sync:true,load:function(_a8f){
_a8e=_a8f;
}});
this._widgets=_a8e;
this._createDefaults();
}
return this._widgets;
},_createDefaults:function(){
var ret=true;
for(var a in this._widgets){
var _a90=this._widgets[a];
for(var b in _a90){
var _a91=_a90[b];
for(var c in _a91.states){
var _a92=_a91.states[c];
var _a93=this.getStyleSelectors(a+"."+b,c);
}
for(var sw in _a91.subwidgets){
var _a94=_a91.subwidgets[sw];
for(var c in _a94.states){
var _a92=_a94.states[c];
var _a93=this.getStyleSelectors(a+"."+b,c,sw);
}
}
}
}
return;
},getRelativeStyleSelectorsText:function(_a95,_a96,_a97,_a98,_a99){
var _a9a=this.getStyleSelectors(_a95,_a96,_a97);
var _a9b=new Array();
for(s in _a9a){
_a98.forEach(function(_a9c){
var _a9d=false;
for(var p=0;!_a9d&&p<_a9a[s].length;p++){
if(_a9a[s][p]==_a9c||_a9a[s][p]=="$std_10"){
_a9d=true;
}
}
if(_a9d){
var text=""+s;
var _a9e=text.split(" ");
text="";
_a9e.forEach(function(c){
if(c!="."+_a99){
text+=" "+c;
}
}.bind(this));
_a9b.push(text.replace(/^\s*/,"").replace(/\s*$/,""));
return;
}
}.bind(this));
}
return _a9b;
},getStyleSelectors:function(_a9f,_aa0,_aa1){
if(!_a9f){
return;
}
if(!_aa0){
_aa0="Normal";
}
var _aa2;
var p=_a9f.split(".");
var w=p[0];
var n=p[p.length-1];
if(_aa1&&(w in this._widgets)&&(n in this._widgets[w])){
var sw=(_aa1.id)?_aa1.id:_aa1;
if(!this._widgets[w][n].subwidgets[""+sw].states[""+_aa0]){
return null;
}
_aa2=this._widgets[w][n].subwidgets[""+sw].states[""+_aa0].selectors;
if(!_aa2||_aa2=="$auto"){
_aa2=this._createDefaultSelectors(""+w+sw,_aa0);
this._widgets[w][n].subwidgets[""+sw].states[""+_aa0].selectors=_aa2;
}
}else{
if(this._widgets&&(w in this._widgets)&&(n in this._widgets[w])){
if(this._widgets[w][n].states[""+_aa0]){
_aa2=this._widgets[w][n].states[""+_aa0].selectors;
if(!_aa2||_aa2=="$auto"){
_aa2=this._createDefaultSelectors(""+w+n,_aa0);
this._widgets[w][n].states[""+_aa0].selectors=_aa2;
}
}
}else{
}
}
return _aa2;
},getElementStyleProperties:function(_aa3,_aa4,_aa5){
if(!_aa3){
return;
}
if(!_aa4){
_aa4="Normal";
}
var _aa6;
var p=_aa3.split(".");
var w=p[0];
var n=p[p.length-1];
if(_aa5&&(w in this._widgets)&&(n in this._widgets[w])){
var sw=(_aa5.id)?_aa5.id:_aa5;
if(!(this._widgets[w][n].subwidgets[""+sw].states[""+_aa4])||!(this._widgets[w][n].subwidgets[""+sw].states[""+_aa4].element)||!(this._widgets[w][n].subwidgets[""+sw].states[""+_aa4].element.style)){
return null;
}
_aa6=this._widgets[w][n].subwidgets[""+sw].states[""+_aa4].element.style;
}else{
if(this._widgets&&(w in this._widgets)&&(n in this._widgets[w])){
if(this._widgets[w][n].states[""+_aa4]&&this._widgets[w][n].states[""+_aa4].element&&this._widgets[w][n].states[""+_aa4].element.style){
_aa6=this._widgets[w][n].states[""+_aa4].element.style;
}
}else{
}
}
return _aa6;
},_createDefaultSelectors:function(_aa7,_aa8){
var _aa9;
if(_aa8=="Normal"){
_aa9="."+this._theme.className+" ."+_aa7;
}else{
_aa9="."+this._theme.className+" ."+_aa7+_aa8;
}
var _aaa=new Object();
_aaa[_aa9]=["$std_10"];
return _aaa;
},_createDefaultQuery:function(_aab,_aac){
var _aad;
_aad="."+_aab;
return _aad;
},_simulateState:function(q,s,mode,_aae){
var _aaf=[];
if(!(q instanceof Array)){
_aaf.push(q);
}else{
_aaf=q;
}
var _ab0=[];
if(!(s instanceof Array)){
_ab0.push(s);
}else{
_ab0=s;
}
for(var i=0;i<_ab0.length;i++){
var _ab1=_ab0[i];
var _ab2=_aaf[i];
var _ab3;
var _ab4;
var _ab5;
if((_ab3=_ab1.indexOf(":"))>-1){
_ab4=_ab1.substring(_ab3+1);
_ab1=_ab1.substring(0,_ab3);
_ab3=_ab4.indexOf("=");
if(_ab3>-1){
_ab5=_ab4.substring(_ab3+1);
_ab4=_ab4.substring(0,_ab3);
}else{
_ab5=_ab4;
}
}
var _ab6=dojo.query(_ab2,_aae.domNode);
var n=_ab6[0];
if(!n){
n=_aae.domNode;
}
try{
if(mode=="add"){
if(_ab4){
n.setAttribute(_ab4,_ab5);
}
if(_ab1){
dojo.addClass(n,_ab1);
}
}else{
if(_ab4){
n.removeAttribute(_ab4);
}
if(_ab1){
dojo.removeClass(n,_ab1);
}
}
}
catch(e){
console.error("CSSThemeProvider._simulateState invalid simulate in metadata for "+_aae.type+" "+q+": "+s);
}
}
},_updateStyle:function(_ab7,_ab8,_ab9,mode){
if(_ab7.id==="all"){
return;
}
var init=false;
if(!_ab9){
_ab9="Normal";
init=true;
}
if(!this._widgets){
return null;
}
if(!_ab8){
_ab8=_ab7.type;
}
var p=_ab8.split(".");
var w=p[0];
var n=p[p.length-1];
var _aba;
var _abb;
var _abc=this._widgets[w][n];
if(_ab9==="Normal"&&init==true&&mode==="remove"&&this._widgets[w][n].startState){
_ab9=this._widgets[w][n].startState;
}
if(this._widgets[w][n].states[""+_ab9]){
var q=this._widgets[w][n].states[""+_ab9].query;
if(!q||q=="$auto"){
q=this._createDefaultQuery(w+n,_ab9);
_abc.states[""+_ab9].query=q;
}
var s=this._widgets[w][n].states[""+_ab9].simulate;
if(!s){
s=" ";
var _abd=this.getStyleSelectors(_ab8,_ab9);
var _abe="";
for(var _abf in _abd){
_abe=_abf.replace(/\./g,"");
_abe=_abe.replace(this._theme.className,"");
s=s+" "+_abe;
}
if(_ab9!="Normal"){
s=w+_ab9+" "+s;
}
}
if(_ab9!="Normal"){
this._simulateState(q,s,mode,_ab7);
}
}
for(var sub in _abc.subwidgets){
var _ac0=_abc.subwidgets[sub];
if(_ab9==="Normal"&&init==true&&mode==="remove"&&_ac0.startState){
_ab9=_ac0.startState;
}
if(_ac0.states[""+_ab9]){
var q=_ac0.states[""+_ab9].query;
var s=_ac0.states[""+_ab9].simulate;
if(!q||q=="$auto"){
q=this._createDefaultQuery(w+sub,_ab9);
_ac0.states[""+_ab9].query=q;
}
if(!s){
var _abd=this.getStyleSelectors(_ab8,_ab9,sub);
var _abe="";
s=" ";
for(var _abf in _abd){
_abe=_abf.replace(/\./g,"");
_abe=_abe.replace(this._theme.className,"");
s=s+" "+_abe;
}
if(_ab9!="Normal"){
s=w+_ab9+" "+s;
}
}
if(_ab9!="Normal"){
this._simulateState(q,s,mode,_ab7);
}
}
}
return;
},setStyleValues:function(node,_ac1,_ac2,_ac3){
this._updateStyle(node,_ac1,_ac2,"add");
},removeStyleValues:function(node,_ac4,_ac5,_ac6){
if(_ac5&&_ac5!="Normal"){
this._updateStyle(node,_ac4,_ac5,"remove");
}
},setWidgetStyleValues:function(node,_ac7){
var _ac8=davinci.ve.widget.getWidget(node);
this._updateStyle(node,null,_ac7,"add");
},removeWidgetStyleValues:function(node,_ac9){
this._updateStyle(node,null,_ac9,"remove");
},getDomNode:function(node,_aca,_acb,_acc){
if(!this._widgets){
return null;
}
if(!_acc){
_acc="Normal";
}
var p=_aca.split(".");
var w=p[0];
var n=p[p.length-1];
var _acd;
try{
if(_acb){
_acd=this._widgets[w][n].subwidgets[""+_acb].states[""+_acc].query;
if(!_acd||_acd=="$auto"){
_acd=this._createDefaultQuery(w+_acb,_acc);
this._widgets[w][n].subwidgets[""+_acb].states[""+_acc].query=_acd;
}
}else{
_acd=this._widgets[w][n].states[""+_acc].query;
if(!_acd||_acd=="$auto"){
_acd=this._createDefaultQuery(w+n,_acc);
this._widgets[w][n].states[""+_acc].query=_acd;
}
}
}
catch(e){
return null;
}
var q;
if(_acd instanceof Array){
q=_acd[0];
}else{
q=_acd;
}
var _ace=dojo.query(q,node);
var n=_ace[0];
if(!n){
n=node;
}
return n;
},getMetadata:function(_acf){
if(!_acf){
return undefined;
}
var p=_acf.split(".");
var w=p[0];
var n=p[p.length-1];
var s=this._widgets&&this._widgets[w]&&this._widgets[w][n];
return s;
},getWidgetType:function(_ad0){
var _ad1;
_ad1=_ad0.type;
var id=_ad0.id;
if(id.indexOf("all")===0){
_ad1=_ad1+".$"+id;
}
return _ad1;
},isPropertyVaildForWidgetRule:function(rule,_ad2,_ad3,_ad4,_ad5){
var _ad6=this.getWidgetType(_ad3);
var _ad7=this.getMetadata(_ad6);
if(_ad4){
_ad7=_ad7.subwidgets[_ad4];
}
if(_ad5){
_ad7=_ad7.states[_ad5];
}else{
_ad7=_ad7.states["Normal"];
}
var _ad8=rule.getSelectorText();
for(var _ad9 in _ad7.selectors){
var _ada=_ad7.selectors[_ad9];
if(_ad8==_ad9){
for(var i=0;i<_ada.length;i++){
var prop=_ada[i];
if(prop=="$std_10"||prop==_ad2){
return true;
}
}
}
}
return false;
},isPropertyRuleValid:function(rule,_adb,_adc){
var _add=rule.getSelectorText();
for(var c in _adc.states){
var _ade=_adc.states[c];
for(var _adf in _ade.selectors){
var _ae0=_ade.selectors[_adf];
if(_add==_adf){
for(var i=0;i<_ae0.length;i++){
var prop=_ae0[i];
if(prop=="$std_10"||prop==_adb){
return true;
}
}
}
}
}
for(var sw in _adc.subwidgets){
var _ae1=_adc.subwidgets[sw];
for(var c in _ae1.states){
var _ade=_ae1.states[c];
for(var _adf in _ade.selectors){
var _ae0=_ade.selectors[_adf];
if(_add==_adf){
for(var i=0;i<_ae0.length;i++){
var prop=_ae0[i];
if(prop=="$std_10"||prop==_adb){
return true;
}
}
}
}
}
}
return false;
function _ae2(rule,_ae3){
for(var i=0;i<rule.selectors.length;i++){
var _ae4=rule.selectors[i].getText();
if(_ae4==_ae3){
return true;
}
}
return false;
};
},isPropertyValidForRule:function(rule,_ae5){
var ret=false;
var _ae6=rule.getSelectorText();
for(var a in this._widgets){
var _ae7=this._widgets[a];
for(var b in _ae7){
var _ae8=_ae7[b];
if(this.isPropertyRuleValid(rule,_ae5,_ae8)){
return true;
}
}
}
return ret;
},getStatesForAllWidgets:function(){
if(!this._widgets){
return null;
}
states=new Array();
for(var a in this._widgets){
var _ae9=this._widgets[a];
for(var b in _ae9){
if(b.indexOf("$all")!=0){
var _aea=_ae9[b];
for(var c in _aea.states){
states[c]=c;
}
for(var sw in _aea.subwidgets){
var _aeb=_aea.subwidgets[sw];
for(var c in _aeb.states){
states[c]=c;
}
}
}
}
}
retStates=new Array();
for(var s in states){
retStates.push(s);
}
return retStates.sort();
},isStateValid:function(_aec,_aed,subW){
if(!this._widgets){
return false;
}
if(_aec.id==="all"&&_aed!="Normal"){
return false;
}
var _aee=_aec.type;
var _aef=this.getMetadata(_aee);
if(_aef.states[_aed]&&!subW){
return true;
}
if(!subW){
for(var sw in _aef.subwidgets){
var _af0=_aef.subwidgets[sw];
if(_af0.states[_aed]){
return true;
}
}
}else{
var _af0=_aef.subwidgets[subW];
if(_af0&&_af0.states[_aed]){
return true;
}
}
return false;
}});
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\"\n\t   data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","url:davinci/ui/templates/SelectProjectDialog.html":"<div>\r\n\t<div class=\"dijitDialogPaneContentArea\">\r\n\t\t<div>${uiNLS.currentProject} <span data-dojo-attach-point=\"currentProjectName\" style=\"font-weight: bold\"></span></div>\r\n\t\t<div style=\"margin-top: 10px;\">${uiNLS.selectProject}</div>\r\n\t\t<div data-dojo-type=\"davinci.ui.widgets.ProjectSelection\" data-dojo-attach-point=\"projectSelection\" data-dojo-attach-event=\"onChange:_onChange\"></div>\r\n\t</div>\t\r\n\t<div class=\"dijitDialogPaneActionBar\">\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"_okButton\" dojoAttachEvent='onClick:okButton' label='${uiNLS.open}' class=\"maqPrimaryButton\" disabled=\"true\" type=\"submit\"></button>\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:cancelButton' label='${uiNLS.cancelButtonLabel}' class=\"maqSecondaryButton\"></button>\r\n\t</div>\r\n</div>","davinci/UserActivityMonitor":function(){
define(["dojo/i18n!./nls/webContent"],function(_af1){
var _af2={subscriptions:[],subscribe:function(_af3,func){
this.subscriptions.push(dojo.subscribe(_af3,this,func));
},destroy:function(){
dojo.forEach(this.subscriptions,dojo.unsubscribe);
},setUpInActivityMonitor:function(doc){
if(!this._runtime){
try{
this._runtime=require("davinci/Runtime");
}
catch(e){
console.warn("FAILED: failure for loading davinci/Runtime");
return;
}
}
if(this._runtime.singleUserMode()){
this._MaxInactiveInterval=-1;
}else{
this._firstPoll=true;
this._MaxInactiveInterval=60*5;
this.keepAlive();
this.addInActivityMonitor(doc);
this.subscribe("/dojo/io/load",this.lastServerConnection);
this.userActivity();
}
},addInActivityMonitor:function(doc){
if(this._MaxInactiveInterval===-1){
return [];
}else{
var _af4=[dojo.connect(doc.documentElement,"keydown",this,"userActivity"),dojo.connect(doc.documentElement,"mousedown",this,"userActivity")];
return _af4;
}
},userActivity:function(e){
if(this.countdown){
this.resetIdle();
}
if(this._idleTimer){
window.clearTimeout(this._idleTimer);
}
if(this._MaxInactiveInterval>0){
var t=(this._MaxInactiveInterval*1000);
this._idleTimer=window.setTimeout(function(){
this.idle();
}.bind(this),t);
}
},keepAlive:function(){
var _af5=dojo.xhrGet({url:"cmd/keepalive",sync:false,handleAs:"json",});
_af5.then(function(_af6){
if(_af6.MaxInactiveInterval){
this._MaxInactiveInterval=_af6.MaxInactiveInterval;
if(this._firstPoll){
delete this._firstPoll;
this.userActivity(null);
}
}else{
console.warn("Unknown error: result="+_af6);
}
}.bind(this),function(_af7){
console.warn("MaxInactiveInterval error",_af7);
});
},lastServerConnection:function(_af8,_af9){
if(this._serverPollTimer){
window.clearTimeout(this._serverPollTimer);
}
if(this._MaxInactiveInterval>0){
t=((this._MaxInactiveInterval*1000)*0.8);
this._serverPollTimer=window.setTimeout(function(){
this.keepAlive();
}.bind(this),t);
}
},idle:function(){
var _afa=30;
var app=dojo.byId("davinci_app");
var _afb=dojo.doc.createElement("div");
_afb.id="org.maqetta.idleWarning";
app.appendChild(_afb);
_afb.setAttribute("class","idleWarning");
_afb.innerHTML=dojo.string.substitute(_af1.idleSessionMessage,{seconds:_afa});
this.countdown=window.setInterval(function(){
if(--_afa===0){
window.clearInterval(this.countdown);
delete this.countdown;
this._runtime.logoff();
}else{
var span=dojo.byId("org.maqetta.idleWarning");
span.innerHTML=dojo.string.substitute(_af1.idleSessionMessage,{seconds:_afa});
}
}.bind(this),1000);
},resetIdle:function(e){
window.clearInterval(this.countdown);
delete this.countdown;
var _afc=dojo.byId("org.maqetta.idleWarning");
_afc.parentNode.removeChild(_afc);
this.userActivity();
}};
return _af2;
});
},"davinci/ve/commands/AddCommand":function(){
define(["dojo/_base/declare","davinci/ve/widget","davinci/ve/utils/ImageUtils","davinci/ve/States"],function(_afd,_afe,_aff,_b00){
return _afd("davinci.ve.commands.AddCommand",null,{name:"add",constructor:function(_b01,_b02,_b03){
if(_b01){
if(_b01.domNode){
this._id=_b01.id;
}else{
this._data=_b01;
}
}
this._parentId=_b02.id;
this._index=_b03;
},execute:function(){
var _b04=_afe.byId(this._parentId);
if(!_b04){
return;
}
var _b05=_b04.getContext();
var _b06=undefined;
if(this._data){
if(this._id&&this._data.properties){
this._data.properties.id=this._id;
}
_b06=_afe.createWidget(this._data);
this._id=_b06.id;
}else{
if(this._id){
_b06=_afe.byId(this._id,_b05);
}
}
if(!_b06){
return;
}
this._data=_b06.getData();
this._data.properties.id=this._id;
this._data.context=_b05;
if(this._index&&typeof this._index!="number"){
if(this._index.domNode){
this._index=_b04.indexOf(this._index);
}else{
var w=_afe.byId(this._index.id,_b05);
this._index=_b04.indexOf(w);
}
}
if(_b06.domNode.tagName==="IMG"){
_aff.ImageUpdateFocus(_b06,_b05);
}
_b04.addChild(_b06,this._index);
if(_b05){
_b05.attach(_b06);
_b06.startup();
_b06.renderWidget();
_b05.widgetAddedOrDeleted();
_b05.widgetChanged(_b05.WIDGET_ADDED,_b06);
}
_b00.resetState(_b06.domNode);
},undo:function(){
if(!this._id||!this._parentId){
return;
}
var _b07=_afe.byId(this._id);
if(!_b07){
return;
}
var _b08=_afe.byId(this._parentId);
if(!_b08){
return;
}
var _b09=_b07.getContext();
if(_b09){
_b09.detach(_b07);
_b09.deselect(_b07);
}
_b08.removeChild(_b07);
_b09.widgetChanged(_b09.WIDGET_REMOVED,_b07);
_b07.destroyWidget();
if(_b09){
_b09.widgetAddedOrDeleted();
}
_b00.resetState(_b07.domNode);
}});
});
},"dojox/main":function(){
define("dojox/main",["dojo/_base/kernel"],function(dojo){
return dojo.dojox;
});
},"dojo/dnd/Selector":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/kernel","../_base/lang","../dom","../dom-construct","../mouse","../_base/NodeList","../on","../touch","./common","./Container"],function(_b0a,_b0b,_b0c,_b0d,lang,dom,_b0e,_b0f,_b10,on,_b11,dnd,_b12){
var _b13=_b0b("dojo.dnd.Selector",_b12,{constructor:function(node,_b14){
if(!_b14){
_b14={};
}
this.singular=_b14.singular;
this.autoSync=_b14.autoSync;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(on(this.node,_b11.press,lang.hitch(this,"onMouseDown")),on(this.node,_b11.release,lang.hitch(this,"onMouseUp")));
},singular:false,getSelectedNodes:function(){
var t=new _b10();
var e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
t.push(dom.byId(i));
}
return t;
},selectNone:function(){
return this._removeSelection()._removeAnchor();
},selectAll:function(){
this.forInItems(function(data,id){
this._addItemClass(dom.byId(id),"Selected");
this.selection[id]=1;
},this);
return this._removeAnchor();
},deleteSelectedNodes:function(){
var e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var n=dom.byId(i);
this.delItem(i);
_b0e.destroy(n);
}
this.anchor=null;
this.selection={};
return this;
},forInSelectedItems:function(f,o){
o=o||_b0d.global;
var s=this.selection,e=dnd._empty;
for(var i in s){
if(i in e){
continue;
}
f.call(o,this.getItem(i),i,this);
}
},sync:function(){
_b13.superclass.sync.call(this);
if(this.anchor){
if(!this.getItem(this.anchor.id)){
this.anchor=null;
}
}
var t=[],e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
if(!this.getItem(i)){
t.push(i);
}
}
_b0a.forEach(t,function(i){
delete this.selection[i];
},this);
return this;
},insertNodes:function(_b15,data,_b16,_b17){
var _b18=this._normalizedCreator;
this._normalizedCreator=function(item,hint){
var t=_b18.call(this,item,hint);
if(_b15){
if(!this.anchor){
this.anchor=t.node;
this._removeItemClass(t.node,"Selected");
this._addItemClass(this.anchor,"Anchor");
}else{
if(this.anchor!=t.node){
this._removeItemClass(t.node,"Anchor");
this._addItemClass(t.node,"Selected");
}
}
this.selection[t.node.id]=1;
}else{
this._removeItemClass(t.node,"Selected");
this._removeItemClass(t.node,"Anchor");
}
return t;
};
_b13.superclass.insertNodes.call(this,data,_b16,_b17);
this._normalizedCreator=_b18;
return this;
},destroy:function(){
_b13.superclass.destroy.call(this);
this.selection=this.anchor=null;
},onMouseDown:function(e){
if(this.autoSync){
this.sync();
}
if(!this.current){
return;
}
if(!this.singular&&!dnd.getCopyKeyState(e)&&!e.shiftKey&&(this.current.id in this.selection)){
this.simpleSelection=true;
if(_b0f.isLeft(e)){
_b0c.stop(e);
}
return;
}
if(!this.singular&&e.shiftKey){
if(!dnd.getCopyKeyState(e)){
this._removeSelection();
}
var c=this.getAllNodes();
if(c.length){
if(!this.anchor){
this.anchor=c[0];
this._addItemClass(this.anchor,"Anchor");
}
this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){
var i=0,node;
for(;i<c.length;++i){
node=c[i];
if(node==this.anchor||node==this.current){
break;
}
}
for(++i;i<c.length;++i){
node=c[i];
if(node==this.anchor||node==this.current){
break;
}
this._addItemClass(node,"Selected");
this.selection[node.id]=1;
}
this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1;
}
}
}else{
if(this.singular){
if(this.anchor==this.current){
if(dnd.getCopyKeyState(e)){
this.selectNone();
}
}else{
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
}else{
if(dnd.getCopyKeyState(e)){
if(this.anchor==this.current){
delete this.selection[this.anchor.id];
this._removeAnchor();
}else{
if(this.current.id in this.selection){
this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id];
}else{
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected");
}
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}else{
if(!(this.current.id in this.selection)){
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}
}
_b0c.stop(e);
},onMouseUp:function(){
if(!this.simpleSelection){
return;
}
this.simpleSelection=false;
this.selectNone();
if(this.current){
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
},onMouseMove:function(){
this.simpleSelection=false;
},onOverEvent:function(){
this.onmousemoveEvent=on(this.node,_b11.move,lang.hitch(this,"onMouseMove"));
},onOutEvent:function(){
if(this.onmousemoveEvent){
this.onmousemoveEvent.remove();
delete this.onmousemoveEvent;
}
},_removeSelection:function(){
var e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var node=dom.byId(i);
if(node){
this._removeItemClass(node,"Selected");
}
}
this.selection={};
return this;
},_removeAnchor:function(){
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this.anchor=null;
}
return this;
}});
return _b13;
});
},"url:dijit/templates/Calendar.html":"<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" aria-labelledby=\"${id}_mddb ${id}_year\">\n\t<thead>\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"decrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"/>\n\t\t\t\t<span data-dojo-attach-point=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t\t</th>\n\t\t\t<th class='dijitReset' colspan=\"5\">\n\t\t\t\t<div data-dojo-attach-point=\"monthNode\">\n\t\t\t\t</div>\n\t\t\t</th>\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"incrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"/>\n\t\t\t\t<span data-dojo-attach-point=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr role=\"row\">\n\t\t\t${!dayCellsHtml}\n\t\t</tr>\n\t</thead>\n\t<tbody data-dojo-attach-point=\"dateRowsNode\" data-dojo-attach-event=\"onclick: _onDayClick\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t\t${!dateRowsHtml}\n\t</tbody>\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\">\n\t\t<tr>\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\" role=\"presentation\">\n\t\t\t\t<div class=\"dijitCalendarYearLabel\">\n\t\t\t\t\t<span data-dojo-attach-point=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\" role=\"button\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" role=\"button\" id=\"${id}_year\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\" role=\"button\"></span>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\n","url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode,innerDiv,tabContent\" class=\"dijitTabInner dijitTabContent\">\n\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode'/>\n\t<span data-dojo-attach-point='containerNode,focusNode' class='tabLabel'></span>\n\t<span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t  role=\"presentation\">\n\t\t<span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t\t\t></span>\n</div>\n","dojox/grid/_Scroller":function(){
define("dojox/grid/_Scroller",["dijit/registry","dojo/_base/declare","dojo/_base/lang","./util","dojo/_base/html"],function(_b19,_b1a,lang,util,html){
var _b1b=function(_b1c){
var i=0,n,p=_b1c.parentNode;
while((n=p.childNodes[i++])){
if(n==_b1c){
return i-1;
}
}
return -1;
};
var _b1d=function(_b1e){
if(!_b1e){
return;
}
dojo.forEach(_b19.toArray(),function(w){
if(w.domNode&&html.isDescendant(w.domNode,_b1e,true)){
w.destroy();
}
});
};
var _b1f=function(_b20){
var node=html.byId(_b20);
return (node&&node.tagName?node.tagName.toLowerCase():"");
};
var _b21=function(_b22,_b23){
var _b24=[];
var i=0,n;
while((n=_b22.childNodes[i])){
i++;
if(_b1f(n)==_b23){
_b24.push(n);
}
}
return _b24;
};
var _b25=function(_b26){
return _b21(_b26,"div");
};
return _b1a("dojox.grid._Scroller",null,{constructor:function(_b27){
this.setContentNodes(_b27);
this.pageHeights=[];
this.pageNodes=[];
this.stack=[];
},rowCount:0,defaultRowHeight:32,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,averageRowHeight:0,page:0,pageTop:0,init:function(_b28,_b29,_b2a){
switch(arguments.length){
case 3:
this.rowsPerPage=_b2a;
case 2:
this.keepRows=_b29;
case 1:
this.rowCount=_b28;
default:
break;
}
this.defaultPageHeight=this.defaultRowHeight*this.rowsPerPage;
this.pageCount=this._getPageCount(this.rowCount,this.rowsPerPage);
this.setKeepInfo(this.keepRows);
this.invalidate();
if(this.scrollboxNode){
this.scrollboxNode.scrollTop=0;
this.scroll(0);
this.scrollboxNode.onscroll=lang.hitch(this,"onscroll");
}
},_getPageCount:function(_b2b,_b2c){
return _b2b?(Math.ceil(_b2b/_b2c)||1):0;
},destroy:function(){
this.invalidateNodes();
delete this.contentNodes;
delete this.contentNode;
delete this.scrollboxNode;
},setKeepInfo:function(_b2d){
this.keepRows=_b2d;
this.keepPages=!this.keepRows?this.keepPages:Math.max(Math.ceil(this.keepRows/this.rowsPerPage),2);
},setContentNodes:function(_b2e){
this.contentNodes=_b2e;
this.colCount=(this.contentNodes?this.contentNodes.length:0);
this.pageNodes=[];
for(var i=0;i<this.colCount;i++){
this.pageNodes[i]=[];
}
},getDefaultNodes:function(){
return this.pageNodes[0]||[];
},invalidate:function(){
this._invalidating=true;
this.invalidateNodes();
this.pageHeights=[];
this.height=(this.pageCount?(this.pageCount-1)*this.defaultPageHeight+this.calcLastPageHeight():0);
this.resize();
this._invalidating=false;
},updateRowCount:function(_b2f){
this.invalidateNodes();
this.rowCount=_b2f;
var _b30=this.pageCount;
if(_b30===0){
this.height=1;
}
this.pageCount=this._getPageCount(this.rowCount,this.rowsPerPage);
if(this.pageCount<_b30){
for(var i=_b30-1;i>=this.pageCount;i--){
this.height-=this.getPageHeight(i);
delete this.pageHeights[i];
}
}else{
if(this.pageCount>_b30){
this.height+=this.defaultPageHeight*(this.pageCount-_b30-1)+this.calcLastPageHeight();
}
}
this.resize();
},pageExists:function(_b31){
return Boolean(this.getDefaultPageNode(_b31));
},measurePage:function(_b32){
if(this.grid.rowHeight){
var _b33=this.grid.rowHeight+1;
return ((_b32+1)*this.rowsPerPage>this.rowCount?this.rowCount-_b32*this.rowsPerPage:this.rowsPerPage)*_b33;
}
var n=this.getDefaultPageNode(_b32);
return (n&&n.innerHTML)?n.offsetHeight:undefined;
},positionPage:function(_b34,_b35){
for(var i=0;i<this.colCount;i++){
this.pageNodes[i][_b34].style.top=_b35+"px";
}
},repositionPages:function(_b36){
var _b37=this.getDefaultNodes();
var last=0;
for(var i=0;i<this.stack.length;i++){
last=Math.max(this.stack[i],last);
}
var n=_b37[_b36];
var y=(n?this.getPageNodePosition(n)+this.getPageHeight(_b36):0);
for(var p=_b36+1;p<=last;p++){
n=_b37[p];
if(n){
if(this.getPageNodePosition(n)==y){
return;
}
this.positionPage(p,y);
}
y+=this.getPageHeight(p);
}
},installPage:function(_b38){
for(var i=0;i<this.colCount;i++){
this.contentNodes[i].appendChild(this.pageNodes[i][_b38]);
}
},preparePage:function(_b39,_b3a){
var p=(_b3a?this.popPage():null);
for(var i=0;i<this.colCount;i++){
var _b3b=this.pageNodes[i];
var _b3c=(p===null?this.createPageNode():this.invalidatePageNode(p,_b3b));
_b3c.pageIndex=_b39;
_b3b[_b39]=_b3c;
}
},renderPage:function(_b3d){
var _b3e=[];
var i,j;
for(i=0;i<this.colCount;i++){
_b3e[i]=this.pageNodes[i][_b3d];
}
for(i=0,j=_b3d*this.rowsPerPage;(i<this.rowsPerPage)&&(j<this.rowCount);i++,j++){
this.renderRow(j,_b3e);
}
},removePage:function(_b3f){
for(var i=0,j=_b3f*this.rowsPerPage;i<this.rowsPerPage;i++,j++){
this.removeRow(j);
}
},destroyPage:function(_b40){
for(var i=0;i<this.colCount;i++){
var n=this.invalidatePageNode(_b40,this.pageNodes[i]);
if(n){
html.destroy(n);
}
}
},pacify:function(_b41){
},pacifying:false,pacifyTicks:200,setPacifying:function(_b42){
if(this.pacifying!=_b42){
this.pacifying=_b42;
this.pacify(this.pacifying);
}
},startPacify:function(){
this.startPacifyTicks=new Date().getTime();
},doPacify:function(){
var _b43=(new Date().getTime()-this.startPacifyTicks)>this.pacifyTicks;
this.setPacifying(true);
this.startPacify();
return _b43;
},endPacify:function(){
this.setPacifying(false);
},resize:function(){
if(this.scrollboxNode){
this.windowHeight=this.scrollboxNode.clientHeight;
}
for(var i=0;i<this.colCount;i++){
util.setStyleHeightPx(this.contentNodes[i],Math.max(1,this.height));
}
var _b44=(!this._invalidating);
if(!_b44){
var ah=this.grid.get("autoHeight");
if(typeof ah=="number"&&ah<=Math.min(this.rowsPerPage,this.rowCount)){
_b44=true;
}
}
if(_b44){
this.needPage(this.page,this.pageTop);
}
var _b45=(this.page<this.pageCount-1)?this.rowsPerPage:((this.rowCount%this.rowsPerPage)||this.rowsPerPage);
var _b46=this.getPageHeight(this.page);
this.averageRowHeight=(_b46>0&&_b45>0)?(_b46/_b45):0;
},calcLastPageHeight:function(){
if(!this.pageCount){
return 0;
}
var _b47=this.pageCount-1;
var _b48=((this.rowCount%this.rowsPerPage)||(this.rowsPerPage))*this.defaultRowHeight;
this.pageHeights[_b47]=_b48;
return _b48;
},updateContentHeight:function(inDh){
this.height+=inDh;
this.resize();
},updatePageHeight:function(_b49,_b4a,_b4b){
if(this.pageExists(_b49)){
var oh=this.getPageHeight(_b49);
var h=(this.measurePage(_b49));
if(h===undefined){
h=oh;
}
this.pageHeights[_b49]=h;
if(oh!=h){
this.updateContentHeight(h-oh);
var ah=this.grid.get("autoHeight");
if((typeof ah=="number"&&ah>this.rowCount)||(ah===true&&!_b4a)){
if(!_b4b){
this.grid.sizeChange();
}else{
var ns=this.grid.viewsNode.style;
ns.height=parseInt(ns.height)+h-oh+"px";
this.repositionPages(_b49);
}
}else{
this.repositionPages(_b49);
}
}
return h;
}
return 0;
},rowHeightChanged:function(_b4c,_b4d){
this.updatePageHeight(Math.floor(_b4c/this.rowsPerPage),false,_b4d);
},invalidateNodes:function(){
while(this.stack.length){
this.destroyPage(this.popPage());
}
},createPageNode:function(){
var p=document.createElement("div");
html.attr(p,"role","presentation");
p.style.position="absolute";
p.style[this.grid.isLeftToRight()?"left":"right"]="0";
return p;
},getPageHeight:function(_b4e){
var ph=this.pageHeights[_b4e];
return (ph!==undefined?ph:this.defaultPageHeight);
},pushPage:function(_b4f){
return this.stack.push(_b4f);
},popPage:function(){
return this.stack.shift();
},findPage:function(_b50){
var i=0,h=0;
for(var ph=0;i<this.pageCount;i++,h+=ph){
ph=this.getPageHeight(i);
if(h+ph>=_b50){
break;
}
}
this.page=i;
this.pageTop=h;
},buildPage:function(_b51,_b52,_b53){
this.preparePage(_b51,_b52);
this.positionPage(_b51,_b53);
this.installPage(_b51);
this.renderPage(_b51);
this.pushPage(_b51);
},needPage:function(_b54,_b55){
var h=this.getPageHeight(_b54),oh=h;
if(!this.pageExists(_b54)){
this.buildPage(_b54,(!this.grid._autoHeight&&this.keepPages&&(this.stack.length>=this.keepPages)),_b55);
h=this.updatePageHeight(_b54,true);
}else{
this.positionPage(_b54,_b55);
}
return h;
},onscroll:function(){
this.scroll(this.scrollboxNode.scrollTop);
},scroll:function(_b56){
this.grid.scrollTop=_b56;
if(this.colCount){
this.startPacify();
this.findPage(_b56);
var h=this.height;
var b=this.getScrollBottom(_b56);
for(var p=this.page,y=this.pageTop;(p<this.pageCount)&&((b<0)||(y<b));p++){
y+=this.needPage(p,y);
}
this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,_b56);
this.lastVisibleRow=this.getLastVisibleRow(p-1,y,b);
if(h!=this.height){
this.repositionPages(p-1);
}
this.endPacify();
}
},getScrollBottom:function(_b57){
return (this.windowHeight>=0?_b57+this.windowHeight:-1);
},processNodeEvent:function(e,_b58){
var t=e.target;
while(t&&(t!=_b58)&&t.parentNode&&(t.parentNode.parentNode!=_b58)){
t=t.parentNode;
}
if(!t||!t.parentNode||(t.parentNode.parentNode!=_b58)){
return false;
}
var page=t.parentNode;
e.topRowIndex=page.pageIndex*this.rowsPerPage;
e.rowIndex=e.topRowIndex+_b1b(t);
e.rowTarget=t;
return true;
},processEvent:function(e){
return this.processNodeEvent(e,this.contentNode);
},renderRow:function(_b59,_b5a){
},removeRow:function(_b5b){
},getDefaultPageNode:function(_b5c){
return this.getDefaultNodes()[_b5c];
},positionPageNode:function(_b5d,_b5e){
},getPageNodePosition:function(_b5f){
return _b5f.offsetTop;
},invalidatePageNode:function(_b60,_b61){
var p=_b61[_b60];
if(p){
delete _b61[_b60];
this.removePage(_b60,p);
_b1d(p);
p.innerHTML="";
}
return p;
},getPageRow:function(_b62){
return _b62*this.rowsPerPage;
},getLastPageRow:function(_b63){
return Math.min(this.rowCount,this.getPageRow(_b63+1))-1;
},getFirstVisibleRow:function(_b64,_b65,_b66){
if(!this.pageExists(_b64)){
return 0;
}
var row=this.getPageRow(_b64);
var _b67=this.getDefaultNodes();
var rows=_b25(_b67[_b64]);
for(var i=0,l=rows.length;i<l&&_b65<_b66;i++,row++){
_b65+=rows[i].offsetHeight;
}
return (row?row-1:row);
},getLastVisibleRow:function(_b68,_b69,_b6a){
if(!this.pageExists(_b68)){
return 0;
}
var _b6b=this.getDefaultNodes();
var row=this.getLastPageRow(_b68);
var rows=_b25(_b6b[_b68]);
for(var i=rows.length-1;i>=0&&_b69>_b6a;i--,row--){
_b69-=rows[i].offsetHeight;
}
return row+1;
},findTopRow:function(_b6c){
var _b6d=this.getDefaultNodes();
var rows=_b25(_b6d[this.page]);
for(var i=0,l=rows.length,t=this.pageTop,h;i<l;i++){
h=rows[i].offsetHeight;
t+=h;
if(t>=_b6c){
this.offset=h-(t-_b6c);
return i+this.page*this.rowsPerPage;
}
}
return -1;
},findScrollTop:function(_b6e){
var _b6f=Math.floor(_b6e/this.rowsPerPage);
var t=0;
var i,l;
for(i=0;i<_b6f;i++){
t+=this.getPageHeight(i);
}
this.pageTop=t;
this.page=_b6f;
this.needPage(_b6f,this.pageTop);
var _b70=this.getDefaultNodes();
var rows=_b25(_b70[_b6f]);
var r=_b6e-this.rowsPerPage*_b6f;
for(i=0,l=rows.length;i<l&&i<r;i++){
t+=rows[i].offsetHeight;
}
return t;
},dummy:0});
});
},"url:dijit/templates/TreeNode.html":"<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow dijitInline\" role=\"presentation\"\n\t\t><div data-dojo-attach-point=\"indentNode\" class=\"dijitInline\"></div\n\t\t><img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"\n\t\t/><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"\n\t\t></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"iconNode\" class=\"dijitIcon dijitTreeIcon\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"labelNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n","url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","dojo/fx":function(){
define(["./_base/lang","./Evented","./_base/kernel","./_base/array","./_base/connect","./_base/fx","./dom","./dom-style","./dom-geometry","./ready","require"],function(lang,_b71,dojo,_b72,_b73,_b74,dom,_b75,geom,_b76,_b77){
if(!dojo.isAsync){
_b76(0,function(){
var _b78=["./fx/Toggler"];
_b77(_b78);
});
}
var _b79=dojo.fx={};
var _b7a={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _b7b=function(_b7c){
this._index=-1;
this._animations=_b7c||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
_b72.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
_b7b.prototype=new _b71();
lang.extend(_b7b,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
_b73.disconnect(this._onAnimateCtx);
_b73.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=_b73.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=_b73.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_b7d,_b7e){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_b7e&&this._current.status()=="playing"){
return this;
}
var _b7f=_b73.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_b80=_b73.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_b81=_b73.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
_b73.disconnect(_b7f);
_b73.disconnect(_b80);
_b73.disconnect(_b81);
});
if(this._onAnimateCtx){
_b73.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=_b73.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
_b73.disconnect(this._onEndCtx);
}
this._onEndCtx=_b73.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=_b73.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
_b73.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_b82,_b83){
this.pause();
var _b84=this.duration*_b82;
this._current=null;
_b72.some(this._animations,function(a){
if(a.duration<=_b84){
this._current=a;
return true;
}
_b84-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_b84/this._current.duration,_b83);
}
return this;
},stop:function(_b85){
if(this._current){
if(_b85){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=_b73.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
_b73.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
_b73.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
_b73.disconnect(this._onEndCtx);
}
}});
lang.extend(_b7b,_b7a);
_b79.chain=function(_b86){
return new _b7b(_b86);
};
var _b87=function(_b88){
this._animations=_b88||[];
this._connects=[];
this._finished=0;
this.duration=0;
_b72.forEach(_b88,function(a){
var _b89=a.duration;
if(a.delay){
_b89+=a.delay;
}
if(this.duration<_b89){
this.duration=_b89;
}
this._connects.push(_b73.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new _b74.Animation({curve:[0,1],duration:this.duration});
var self=this;
_b72.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(_b73.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
lang.extend(_b87,{_doAction:function(_b8a,args){
_b72.forEach(this._animations,function(a){
a[_b8a].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_b8b,args){
var t=this._pseudoAnimation;
t[_b8b].apply(t,args);
},play:function(_b8c,_b8d){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_b8e,_b8f){
var ms=this.duration*_b8e;
_b72.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_b8f);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_b90){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
_b72.forEach(this._connects,_b73.disconnect);
}});
lang.extend(_b87,_b7a);
_b79.combine=function(_b91){
return new _b87(_b91);
};
_b79.wipeIn=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_b74.animateProperty(lang.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _b92=_b75.get(node,"height");
return Math.max(_b92,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
var fini=function(){
s.height="auto";
s.overflow=o;
};
_b73.connect(anim,"onStop",fini);
_b73.connect(anim,"onEnd",fini);
return anim;
};
_b79.wipeOut=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_b74.animateProperty(lang.mixin({properties:{height:{end:1}}},args));
_b73.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
var fini=function(){
s.overflow=o;
s.height="auto";
s.display="none";
};
_b73.connect(anim,"onStop",fini);
_b73.connect(anim,"onEnd",fini);
return anim;
};
_b79.slideTo=function(args){
var node=args.node=dom.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=_b75.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=geom.position(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var anim=_b74.animateProperty(lang.mixin({properties:{top:args.top||0,left:args.left||0}},args));
_b73.connect(anim,"beforeBegin",anim,init);
return anim;
};
return _b79;
});
},"davinci/js/JSElement":function(){
define(["dojo/_base/declare","davinci/js/JSModel"],function(_b93,_b94){
var _b95=null;
var _b96=null;
return _b93("davinci.js.JSElement",_b94,{constructor:function(){
this.elementType="JSElement";
if(_b95!==null){
this.comment=_b95;
_b95=null;
}
if(_b96!==null){
this.label=_b96;
_b96=null;
}
},printNewLine:function(_b97){
var s="\n";
for(var i=0;i<_b97.indent;i++){
s=s+" ";
}
return s;
},printStatement:function(_b98,stmt){
return this.printNewLine(_b98)+stmt.getText(_b98)+(stmt.nosemicolon?"":";");
},add:function(e){
this.addChild(e);
},init:function(_b99,stop,name){
},getLabel:function(){
context={};
context.indent=0;
return this.getText(context);
},getID:function(){
return this.parent.getID()+":"+this.startLine+":"+this.getLabel();
},getSyntaxPositions:function(_b9a){
var _b9b=[];
function add(line,col,_b9c,type){
if((typeof _b9a=="undefined")||_b9a==line){
_b9b.push({line:line,col:col,length:_b9c,type:type});
}
};
function add2(pos,_b9d,type){
if((typeof _b9a=="undefined")||_b9a==pos[0]){
_b9b.push({line:pos[0],col:pos[1],length:_b9d,type:type});
}
};
var _b9e={visit:function(node){
if(node.elementType=="JSFunction"){
add(node.startLine,node.startCol,8,"keyword");
add2(node.leftParenPos,1,"delimiter");
add2(node.rightParenPos,1,"delimiter");
add2(node.leftBracePos,1,"delimiter");
add2(node.rightBracePos,1,"delimiter");
}else{
if(node.elementType=="JSVariableDeclaration"){
add(node.startLine,node.startCol,3,"keyword");
}else{
if(node.elementType=="JSVariableFragment"){
if(node.equalPos){
add2(node.equalPos,1,"operator");
}else{
add(node.startLine,node.startCol,1,"name");
}
}else{
if(node.elementType=="JSNameReference"){
add(node.startLine,node.startCol,node.endCol-node.startCol,"name");
}
}
}
}
},endVisit:function(node){
return true;
}};
this.visit(_b9e);
return _b9b;
}});
});
},"davinci/js/js.plugin":function(){
define(["require"],function(_b9f){
return {id:"davinci.js","davinci.editor":{id:"JSEditor",name:"JavaScript Editor",extensions:"js,json",isDefault:true,editorClass:"davinci/js/ui/JavaScriptEditor",palettePerspective:"davinci.html.htmlEditor",expandPalettes:["left"]},"davinci.actionSets":[{id:"jsEdit",visible:true,actions:[{id:"davinci.js.cut",icon:null,label:"cut",commandID:"davinci.js.cut",menubarPath:"davinci.edit/cut"},{id:"davinci.js.add",icon:null,label:"add",commandID:"davinci.js.add",menubarPath:"davinci.edit/add"},{id:"davinci.js.delete",icon:null,label:"delete",commandID:"davinci.js.delete",menubarPath:"davinci.edit/delete"}]}],"davinci.actionSetPartAssociations":[{targetID:"davinci.js.jsEdit",parts:["davinci.ui.outline","davinci.js.JSEditor"]}],"davinci.editorActions":{editorContribution:{targetID:"davinci.js.JSEditor",actions:[{id:"savecombo",className:"maqLabelButton",showLabel:true,label:"Save",toolbarPath:"save",type:"ComboButton",run:function(){
_b9f(["../Workbench"],function(_ba0){
_b9f("../ui/Resource").save();
});
},isEnabled:function(_ba1){
return _b9f("../Workbench").getOpenEditor();
},menu:[{iconClass:"saveIcon",run:function(){
_b9f("../ui/Resource").save();
},isEnabled:function(_ba2){
return _b9f("../Workbench").getOpenEditor();
},label:"Save",keyBinding:{accel:true,charOrCode:"s",allowGlobal:true}},{iconClass:"saveAsIcon",run:function(){
_b9f("../ui/Resource").saveAs("html");
},isEnabled:function(_ba3){
return _b9f("../Workbench").getOpenEditor();
},label:"Save As",keyBinding:{accel:true,shift:true,charOrCode:"s",allowGlobal:true}}]}]}},"davinci.commands":[{id:"cut",run:function(){
}},{id:"add",run:function(){
}},{id:"delete",run:function(){
}}],"davinci.keyBindings":[{platform:"win",sequence:"M1+C",commandID:"davinci.js.copy",contextID:"davinci.js.JSEditor"}],"davinci.preferences":[],"davinci.fileType":[{extension:"js",iconClass:"jsFileIcon",type:"text"},{extension:"json",iconClass:"jsFileIcon",type:"text"}]};
});
},"dojo/data/util/sorter":function(){
define(["../../_base/lang"],function(lang){
var _ba4={};
lang.setObject("dojo.data.util.sorter",_ba4);
_ba4.basicComparator=function(a,b){
var r=-1;
if(a===null){
a=undefined;
}
if(b===null){
b=undefined;
}
if(a==b){
r=0;
}else{
if(a>b||a==null){
r=1;
}
}
return r;
};
_ba4.createSortFunction=function(_ba5,_ba6){
var _ba7=[];
function _ba8(attr,dir,comp,s){
return function(_ba9,_baa){
var a=s.getValue(_ba9,attr);
var b=s.getValue(_baa,attr);
return dir*comp(a,b);
};
};
var _bab;
var map=_ba6.comparatorMap;
var bc=_ba4.basicComparator;
for(var i=0;i<_ba5.length;i++){
_bab=_ba5[i];
var attr=_bab.attribute;
if(attr){
var dir=(_bab.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_ba7.push(_ba8(attr,dir,comp,_ba6));
}
}
return function(rowA,rowB){
var i=0;
while(i<_ba7.length){
var ret=_ba7[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
return _ba4;
});
},"davinci/html/CSSModel":function(){
define({shorthand:[["border",["border-width","border-style","border-color","border-top","border-left","border-right","border-bottom"]],["border-width",["border-top-width","border-right-width","border-bottom-width","border-left-width"]],["border-style",["border-top-style","border-right-style","border-bottom-style","border-left-style"]],["border-color",["border-top-color","border-right-color","border-bottom-color","border-left-color"]],["border-bottom",["border-bottom-width","border-bottom-style","border-bottom-color"]],["border-top",["border-top-width","border-top-style","border-top-color"]],["border-left",["border-left-width","border-left-style","border-left-color"]],["border-right",["border-right-width","border-right-style","border-right-color"]],["font",["font-size","line-height","font-weight","font-style","font-family","line-height"]],["border-radius",["border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius"]],["-moz-border-radius",["-moz-border-radius-topleft","-moz-border-radius-topright","-moz-border-radius-bottomright","-moz-border-radius-bottomleft"]],["margin",["margin-top","margin-right","margin-bottom","margin-left"]],["padding",["padding-top","padding-right","padding-bottom","padding-left"]],["background",["background-color","background-image","background-repeat","background-position","background-attachment"]]]});
},"davinci/model/Factory":function(){
define(["dojo/_base/declare","davinci/html/CSSFile","davinci/js/JSFile","davinci/html/HTMLFile","system/resource"],function(_bac,_bad,_bae,_baf,_bb0){
var _bb1=[];
var _bb2=[];
var _bb3={getModel:function(args){
var url=args.url;
if(!url){
return null;
}
for(var i=0;i<_bb2.length;i++){
if(_bb2[i].url==url){
_bb1[i]++;
this.incrementImports(_bb2[i]);
return _bb2[i];
}
}
if(url.indexOf("css")>0){
return _bb3.newCSS(args);
}
if(url.indexOf("html")>0){
return _bb3.newHTML(args);
}
if(url.indexOf("js")>0){
return _bb3.newJS(args);
}
},closeModel:function(_bb4){
var url=_bb4.url;
if(!url){
return null;
}
for(var i=0;i<_bb2.length;i++){
if(_bb2[i].url==url){
var _bb5=_bb2[i];
_bb1[i]--;
if(_bb1[i]===0){
_bb2.splice(i,1);
_bb1.splice(i,1);
var _bb6=_bb0.findResource(url);
if(_bb6&&_bb6.dirtyResource){
_bb6.removeWorkingCopy();
_bb6.dirtyResource=false;
}
}
}
}
},newHTML:function(args){
var _bb7=new _baf(args.url);
_bb2.push(_bb7);
var _bb8=_bb2.length-1;
_bb1[_bb8]=1;
return _bb7;
},newCSS:function(args){
var _bb9=new _bad(args);
_bb2.push(_bb9);
var _bba=_bb2.length-1;
_bb1[_bba]=1;
return _bb9;
},newJS:function(args){
var _bbb=new _bae(args);
_bb2.push(_bbb);
var _bbc=_bb2.length-1;
_bb1[_bbc]=1;
return _bbb;
},getNewFromResource:function(_bbd){
var _bbe=_bbd.extension;
if(!_bbe){
return new _baf();
}
switch(_bbe){
case "html":
return new _baf();
break;
case "css":
return new _bad();
break;
case "js":
case "json":
return new _bae();
break;
default:
return new _baf();
}
},incrementImports:function(_bbf){
var _bc0={visit:function(node){
if(node.elementType=="CSSImport"){
var url=node.cssFile.url;
for(var i=0;i<_bb2.length;i++){
if(_bb2[i].url==url){
_bb1[i]++;
}
}
}
return false;
}};
if(_bbf){
_bbf.visit(_bc0);
}
},log:function(){
for(var i=0;i<_bb2.length;i++){
}
}};
var _bc1=require(["dojo/_base/connect"],function(_bc2){
_bc2.subscribe("davinci/model/closeModel",_bb3,_bb3.closeModel);
});
return _bb3;
});
},"dojo/DeferredList":function(){
define(["./_base/kernel","./_base/Deferred","./_base/array"],function(dojo,_bc3,_bc4){
dojo.DeferredList=function(list,_bc5,_bc6,_bc7,_bc8){
var _bc9=[];
_bc3.call(this);
var self=this;
if(list.length===0&&!_bc5){
this.resolve([0,[]]);
}
var _bca=0;
_bc4.forEach(list,function(item,i){
item.then(function(_bcb){
if(_bc5){
self.resolve([i,_bcb]);
}else{
_bcc(true,_bcb);
}
},function(_bcd){
if(_bc6){
self.reject(_bcd);
}else{
_bcc(false,_bcd);
}
if(_bc7){
return null;
}
throw _bcd;
});
function _bcc(_bce,_bcf){
_bc9[i]=[_bce,_bcf];
_bca++;
if(_bca===list.length){
self.resolve(_bc9);
}
};
});
};
dojo.DeferredList.prototype=new _bc3();
dojo.DeferredList.prototype.gatherResults=function(_bd0){
var d=new dojo.DeferredList(_bd0,false,true,false);
d.addCallback(function(_bd1){
var ret=[];
_bc4.forEach(_bd1,function(_bd2){
ret.push(_bd2[1]);
});
return ret;
});
return d;
};
return dojo.DeferredList;
});
},"davinci/ve/themeEditor/themeEditor.plugin":function(){
define(["require"],function(_bd3){
return {id:"davinci.themeEdit","davinci.perspective":{id:"themeEdit",title:"Theme Editor",views:[{viewID:"davinci.ve.Palette",position:"left",hidden:true},{viewID:"davinci.ui.outline",position:"left",hidden:true},{viewID:"davinci.ve.style",position:"right"},{viewID:"davinci.ui.comment",position:"right",hidden:true},{viewID:"davinci.ve.states",position:"right-bottom",selected:true},{viewID:"davinci.ui.navigator",position:"left-bottom",selected:true},{viewID:"davinci.review.reviewNavigator",position:"left"}]},"davinci.editor":{id:"ThemeEditor",name:"Theme Editor",extensions:"theme",defaultContent:"./defaultContent.css",isDefault:true,editorClass:"davinci/ve/themeEditor/ThemeEditor",palettePerspective:"davinci.themeEdit.themeEdit",expandPalettes:["right"]},"davinci.editorActions":{editorContribution:{targetID:"davinci.ve.ThemeEditor",actions:[{id:"undo",action:"davinci/actions/UndoAction",label:"Undo",className:"maqLabelButton",showLabel:true,toolbarPath:"undoredo",keyBinding:{accel:true,charOrCode:"z"}},{id:"redo",action:"davinci/actions/RedoAction",className:"maqLabelButton",showLabel:true,label:"Redo",toolbarPath:"undoredo",keyBinding:{accel:true,shift:true,charOrCode:"z"}},{id:"save",className:"maqLabelButton",showLabel:true,label:"Save",toolbarPath:"save",run:function(){
_bd3("../../Workbench").getOpenEditor().save();
},isEnabled:function(_bd4){
return _bd3("../../Workbench").getOpenEditor();
}}]}}};
});
},"davinci/html/HTMLAttribute":function(){
define(["dojo/_base/declare","davinci/html/HTMLItem"],function(_bd5,_bd6){
return _bd5("davinci.html.HTMLAttribute",_bd6,{constructor:function(){
this.elementType="HTMLAttribute";
this.name="";
this.value="";
},getText:function(_bd7){
if(this.noPersist&&!_bd7.includeNoPersist){
return "";
}
var s=this.name;
var bool={checked:1,selected:1,disabled:1,readonly:1,multiple:1,ismap:1,autofocus:1,autoplay:1,controls:1,formnovalidate:1,loop:1,muted:1,required:1};
if(bool[this.name.toLowerCase()]){
if(this.value&&this.value!="false"){
s+="=\""+this.name+"\"";
}else{
s="";
}
}else{
if(!this.noValue){
s=s+"=\""+davinci.html.escapeXml(String(this.value))+"\"";
}
}
return s;
},setValue:function(_bd8){
this.value=davinci.html.unEscapeXml(_bd8);
this.onChange();
}});
});
},"davinci/html/HTMLFile":function(){
define(["dojo/_base/declare","davinci/html/HTMLItem","davinci/html/HTMLParser","davinci/html/CSSSelector","davinci/html/HTMLElement","davinci/html/CSSImport","davinci/html/CSSFile","davinci/model/Model"],function(_bd9,_bda,_bdb,_bdc,_bdd,_bde,_bdf,_be0){
return _bd9("davinci.html.HTMLFile",_bda,{constructor:function(_be1){
this.fileName=_be1;
this.url=_be1;
this.elementType="HTMLFile";
this._loadedCSS={};
this._styleElem=null;
},save:function(_be2){
var _be3;
var file=system.resource.findResource(this.fileName);
if(file){
var text=this.getText();
_be3=file.setContents(text,_be2);
}
return _be3;
},getText:function(_be4){
_be4=_be4||{};
_be4.indent=0;
var s="";
for(var i=0;i<this.children.length;i++){
var _be5=this.children[i];
s=s+_be5.getText(_be4);
if(_be5.elementType=="HTMLComment"){
s=s+this._addWS(_be5._fmLine,_be5._fmIndent);
}
}
return s;
},getDocumentElement:function(_be6){
for(var i=0;i<this.children.length;i++){
if(this.children[i].tag=="html"){
return this.children[i];
}
}
},findElement:function(id){
var _be7=this.getDocumentElement();
if(_be7){
return _be7.findElement(id);
}
},getMatchingRules:function(_be8,_be9){
var _bea={visit:function(node){
if(node.elementType=="CSSFile"){
var m=[];
var _beb=node.getMatchingRules(_be8,[],m);
for(var i=0;i<_beb.length;i++){
for(var j=0;j<this.matchLevels.length;j++){
if(m[i]>this.matchLevels[j]){
this.matchLevels.splice(j,0,m[i]);
this.rules.splice(j,0,_beb[i]);
break;
}
}
}
if(this.rules.length==0){
this.rules=_beb;
this.matchLevels=m;
}
return true;
}
return false;
},matchLevels:[],rules:[]};
this.visit(_bea);
if(_be9){
return {"rules":_bea.rules,"matchLevels":_bea.matchLevels};
}else{
return _bea.rules;
}
},getRule:function(_bec){
if(!_bec){
return [];
}
var _bed=_bdc.parseSelectors(_bec);
var _bee={visit:function(node){
if(node.elementType=="CSSFile"){
var _bef=node.getRule(_bed);
this.rules=this.rules.concat(_bef||[]);
return true;
}
return false;
},rules:[]};
this.visit(_bee);
return _bee.rules;
},setText:function(text,_bf0){
this.visit({visit:function(node){
if(node.elementType=="CSSImport"){
node.close();
}
}});
this.children=[];
this._styleElem=null;
var _bf1=_bdb.parse(text||"",this);
var _bf2="";
if(!_bf0&&_bf1.errors.length==0){
_bf2=this.getText();
this.children=[];
_bf1=_bdb.parse(_bf2,this);
}
this.endOffset=_bf1.endOffset;
this.errors=_bf1.errors;
var _bf3=this;
if(!_bf0){
this.visit({visit:function(node){
if(node.elementType=="CSSImport"){
if(!node.cssFile){
node.load(true);
dojo.connect(node.cssFile,"onChange",null,dojo.hitch(_bf3,"onChange"));
}
}
}});
}
this.onChange();
},hasStyleSheet:function(url){
var _bf4=this.find({elementType:"CSSImport"});
for(var i=0;i<_bf4.length;i++){
if(_bf4[i].url==url){
return true;
}
}
return false;
},addStyleSheet:function(url,_bf5,_bf6,_bf7,_bf8){
if(!_bf6){
this._loadedCSS[url]=require("davinci/model/Factory").getModel({url:url,includeImports:true,loader:_bf8});
}
if(_bf5){
this._loadedCSS[url].setText(_bf5);
}
this.onChange();
if(!this._styleElem){
var head=this.find({"elementType":"HTMLElement","tag":"head"},true);
var _bf9=head.getChildElement("style");
if(!_bf9){
_bf9=new _bdd("style");
head.addChild(_bf9);
}
this._styleElem=_bf9;
}
var css=new _bde();
css.parent=this;
css.url=url;
if(_bf7){
this._styleElem.insertBefore(css,_bf7);
}else{
this._styleElem.addChild(css);
}
if(!_bf6){
css.load(true);
}
},close:function(){
this.visit({visit:function(node){
if(node.elementType=="CSSImport"){
node.close();
}
}});
require("davinci/model/Factory").closeModel(this);
},getLabel:function(){
return "<>";
},getID:function(){
return this.fileName;
},updatePositions:function(_bfa,_bfb){
new _be0(this).updatePositions(this,_bfa,_bfb);
this.visit({visit:function(_bfc){
if(_bfc.endOffset<_bfa){
return true;
}
if(_bfc.elementType=="HTMLElement"&&_bfc.startTagOffset>_bfa){
_bfc.startTagOffset+=_bfb;
}
}});
},mapPositions:function(_bfd){
var s=this.getText();
var et=_bfd.getText();
var _bfe=s.indexOf(et);
var end=_bfe+et.lastIndexOf(">")+1;
return {startOffset:_bfe,endOffset:end};
},reportPositions:function(){
this.visit({visit:function(_bff){
if(_bff.elementType=="HTMLElement"){
}else{
if(_bff.elementType=="HTMLAttribute"){
}
}
}});
},evaluate:function(_c00){
if(_c00.charAt(0)!=="/"){
console.error("invalid XPath string");
return;
}
var elem=this;
_c00.substr(1).split("/").forEach(function(path){
var m=path.match(this._RE_XPATH),tag=m[1],idx=m[2],_c01;
_c01=elem.children.filter(function(_c02){
return _c02.tag===tag;
});
if(!idx&&_c01.length>1){
console.error("invalid XPath string; no index specified for multiple elements");
return;
}
elem=idx?_c01[idx-1]:_c01[0];
},this);
return elem;
},_RE_XPATH:/(\w+)(?:\[(\d+)\])?/});
});
},"dijit/PopupMenuBarItem":function(){
define(["dojo/_base/declare","./PopupMenuItem","./MenuBarItem"],function(_c03,_c04,_c05){
var _c06=_c05._MenuBarItemMixin;
return _c03("dijit.PopupMenuBarItem",[_c04,_c06],{});
});
},"davinci/workbench/_ToolbaredContainer":function(){
define(["dojo/_base/declare","dijit/layout/_LayoutWidget","dijit/_Templated"],function(_c07,_c08,_c09){
return _c07("davinci.workbench._ToolbaredContainer",[_c08,_c09],{templateString:"<div><div dojoAttachPoint='titleBarDiv' class='palette_titleBarDiv'></div><div dojoAttachPoint='toolbarDiv' class='toolbaredContainer_toolbarDiv'></div><div dojoAttachPoint='containerNode'></div></div>",gutters:false,_toolbarCreated:{},layout:function(){
var _c0a=[{domNode:this.titleBarDiv,layoutAlign:"top"},{domNode:this.toolbarDiv,layoutAlign:"top"},{domNode:this.containerNode,layoutAlign:"client"}];
dijit.layout.layoutChildren(this.domNode,this._contentBox,_c0a);
this._containerContentBox=dijit.layout.marginBox2contentBox(this.containerNode,_c0a[2]);
var _c0b=dijit.byNode(this.containerNode);
if(_c0b&&_c0b.resize){
_c0b.resize(this._containerContentBox);
}
dojo.marginBox(this.containerNode,_c0a[2]);
},setContent:function(data){
this.mainWidget=data;
var _c0c=data.domNode||data;
dojo.place(_c0c,this.containerNode,"replace");
this.containerNode=_c0c;
if(!this.toolbarCreated(this.declaredClass)){
this._createToolbar(this.declaredClass);
}
this.titleBarDiv.innerHTML="<span class=\"paletteCloseBox\"></span><span class=\"titleBarDivTitle\">"+this.title+"</span>";
var _c0d=dojo.query(".paletteCloseBox",this.titleBarDiv);
if(_c0d.length>0){
var _c0e=_c0d[0];
dojo.connect(_c0e,"click",this,function(_c0f){
davinci.Workbench.collapsePaletteContainer(_c0f.currentTarget);
});
}
if(this._started){
this.layout();
}
},removeContent:function(){
var _c10=dojo.doc.createElement("div");
dojo.place(_c10,this.containerNode,"replace");
this.containerNode=_c10;
if(this.mainWidget){
this.mainWidget.destroy();
}
delete this.mainWidget;
},_getViewActions:function(){
},getTopAdditions:function(){
},_createToolbar:function(_c11){
var _c12=require("davinci/Workbench");
var _c13=this.getToolbarDiv();
var _c14=this.getTopAdditions();
if(_c14){
_c13.appendChild(_c14);
}
if(this.toolbarMenuActionSets){
var _c15="m"+Date.now();
var _c16=_c15+"_menucontainer";
var _c17=dojo.create("span",{"id":_c16,"class":"paletteDropdown"},_c13);
var _c18=_c15+"_menu";
var _c19=dojo.create("span",{id:_c18},_c17);
_c12.updateMenubar(_c19,this.toolbarMenuActionSets);
}
var _c1a=this._getViewActions();
if(_c1a&&_c1a.length){
var _c1b=dojo.create("div",{"class":"toolbaredContainer_toolbarDiv"});
var tb=dojo.create("span",{style:{display:"inline-block"}},_c1b);
var _c1c=_c12._createToolBar("toolbarPath",tb,_c1a,this._getViewContext());
dojo.style(_c1c.domNode,{"display":"inline-block","float":"left"});
this.toolbarCreated(_c11,_c1c);
}
},_getViewContext:function(){
return this;
},getToolbarDiv:function(){
return this.toolbarDiv;
},toolbarCreated:function(_c1d,_c1e){
if(arguments.length>1){
this._toolbarCreated[_c1d]=_c1e;
}
return this._toolbarCreated[_c1d];
},attachToolbar:function(){
var _c1f=this.toolbarCreated(this.declaredClass);
var _c20=this.getToolbarDiv();
if(_c1f&&_c1f.domNode&&_c20){
_c20.innerHTML="";
_c20.appendChild(_c1f.domNode);
}
}});
});
},"dijit/form/_FormMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/window"],function(_c21,_c22,_c23,lang,on,_c24){
return _c22("dijit.form._FormMixin",null,{state:"",_getDescendantFormWidgets:function(_c25){
var res=[];
_c21.forEach(_c25||this.getChildren(),function(_c26){
if("value" in _c26){
res.push(_c26);
}else{
res=res.concat(this._getDescendantFormWidgets(_c26.getChildren()));
}
},this);
return res;
},reset:function(){
_c21.forEach(this._getDescendantFormWidgets(),function(_c27){
if(_c27.reset){
_c27.reset();
}
});
},validate:function(){
var _c28=false;
return _c21.every(_c21.map(this._getDescendantFormWidgets(),function(_c29){
_c29._hasBeenBlurred=true;
var _c2a=_c29.disabled||!_c29.validate||_c29.validate();
if(!_c2a&&!_c28){
_c24.scrollIntoView(_c29.containerNode||_c29.domNode);
_c29.focus();
_c28=true;
}
return _c2a;
}),function(item){
return item;
});
},setValues:function(val){
_c23.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
_c21.forEach(this._getDescendantFormWidgets(),function(_c2b){
if(!_c2b.name){
return;
}
var _c2c=map[_c2b.name]||(map[_c2b.name]=[]);
_c2c.push(_c2b);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _c2d=map[name],_c2e=lang.getObject(name,false,obj);
if(_c2e===undefined){
continue;
}
if(!lang.isArray(_c2e)){
_c2e=[_c2e];
}
if(typeof _c2d[0].checked=="boolean"){
_c21.forEach(_c2d,function(w){
w.set("value",_c21.indexOf(_c2e,w.value)!=-1);
});
}else{
if(_c2d[0].multiple){
_c2d[0].set("value",_c2e);
}else{
_c21.forEach(_c2d,function(w,i){
w.set("value",_c2e[i]);
});
}
}
}
},getValues:function(){
_c23.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
_c21.forEach(this._getDescendantFormWidgets(),function(_c2f){
var name=_c2f.name;
if(!name||_c2f.disabled){
return;
}
var _c30=_c2f.get("value");
if(typeof _c2f.checked=="boolean"){
if(/Radio/.test(_c2f.declaredClass)){
if(_c30!==false){
lang.setObject(name,_c30,obj);
}else{
_c30=lang.getObject(name,false,obj);
if(_c30===undefined){
lang.setObject(name,null,obj);
}
}
}else{
var ary=lang.getObject(name,false,obj);
if(!ary){
ary=[];
lang.setObject(name,ary,obj);
}
if(_c30!==false){
ary.push(_c30);
}
}
}else{
var prev=lang.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(lang.isArray(prev)){
prev.push(_c30);
}else{
lang.setObject(name,[prev,_c30],obj);
}
}else{
lang.setObject(name,_c30,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(){
},_getState:function(){
var _c31=_c21.map(this._descendants,function(w){
return w.get("state")||"";
});
return _c21.indexOf(_c31,"Error")>=0?"Error":_c21.indexOf(_c31,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
},connectChildren:function(_c32){
this._descendants=this._getDescendantFormWidgets();
_c21.forEach(this._descendants,function(_c33){
if(!_c33._started){
_c33.startup();
}
});
if(!_c32){
this._onChildChange();
}
},_onChildChange:function(attr){
if(!attr||attr=="state"||attr=="disabled"){
this._set("state",this._getState());
}
if(!attr||attr=="value"||attr=="disabled"||attr=="checked"){
if(this._onChangeDelayTimer){
this._onChangeDelayTimer.remove();
}
this._onChangeDelayTimer=this.defer(function(){
delete this._onChangeDelayTimer;
this._set("value",this.get("value"));
},10);
}
},startup:function(){
this.inherited(arguments);
this._descendants=this._getDescendantFormWidgets();
this.value=this.get("value");
this.state=this._getState();
var self=this;
this.own(on(this.containerNode,"attrmodified-state, attrmodified-disabled, attrmodified-value, attrmodified-checked",function(evt){
if(evt.target==self.domNode){
return;
}
self._onChildChange(evt.type.replace("attrmodified-",""));
}));
this.watch("state",function(attr,_c34,_c35){
this.onValidStateChange(_c35=="");
});
},destroy:function(){
this.inherited(arguments);
}});
});
},"dijit/layout/TabController":function(){
define(["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/i18n","dojo/_base/lang","./StackController","../registry","../Menu","../MenuItem","dojo/text!./templates/_TabButton.html","dojo/i18n!../nls/common"],function(_c36,dom,_c37,_c38,i18n,lang,_c39,_c3a,Menu,_c3b,_c3c){
var _c3d=_c36("dijit.layout._TabButton",_c39.StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:_c3c,scrollOnFocus:false,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.containerNode,false);
},startup:function(){
this.inherited(arguments);
var n=this.domNode;
this.defer(function(){
n.className=n.className;
},1);
},_setCloseButtonAttr:function(disp){
this._set("closeButton",disp);
_c38.toggle(this.domNode,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _c3e=i18n.getLocalization("dijit","common");
if(this.closeNode){
_c37.set(this.closeNode,"title",_c3e.itemClose);
}
}
},_setDisabledAttr:function(_c3f){
this.inherited(arguments);
if(this.closeNode){
if(_c3f){
_c37.remove(this.closeNode,"title");
}else{
var _c40=i18n.getLocalization("dijit","common");
_c37.set(this.closeNode,"title",_c40.itemClose);
}
}
},_setLabelAttr:function(_c41){
this.inherited(arguments);
if(!this.showLabel&&!this.params.title){
this.iconNode.alt=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
var _c42=_c36("dijit.layout.TabController",_c39,{baseClass:"dijitTabController",templateString:"<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'></div>",tabPosition:"top",buttonWidget:_c3d,buttonWidgetCloseClass:"dijitTabCloseButton",postCreate:function(){
this.inherited(arguments);
var _c43=new Menu({id:this.id+"_Menu",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode],selector:function(node){
return _c38.contains(node,"dijitClosable")&&!_c38.contains(node,"dijitTabDisabled");
}});
this.own(_c43);
var _c44=i18n.getLocalization("dijit","common"),_c45=this;
_c43.addChild(new _c3b({label:_c44.itemClose,ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:function(evt){
var _c46=_c3a.byNode(this.getParent().currentTarget);
_c45.onCloseButtonClick(_c46.page);
}}));
}});
_c42.TabButton=_c3d;
return _c42;
});
},"dijit/_MenuBase":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/mouse","dojo/on","dojo/window","./a11yclick","./popup","./registry","./_Widget","./_KeyNavContainer","./_TemplatedMixin"],function(_c47,_c48,dom,_c49,_c4a,lang,_c4b,on,_c4c,_c4d,pm,_c4e,_c4f,_c50,_c51){
return _c48("dijit._MenuBase",[_c4f,_c51,_c50],{parentMenu:null,popupDelay:500,autoFocus:false,postCreate:function(){
var self=this,_c52=function(node){
return _c4a.contains(node,"dijitMenuItem");
};
this.own(on(this.containerNode,on.selector(_c52,_c4b.enter),function(){
self.onItemHover(_c4e.byNode(this));
}),on(this.containerNode,on.selector(_c52,_c4b.leave),function(){
self.onItemUnhover(_c4e.byNode(this));
}),on(this.containerNode,on.selector(_c52,_c4d),function(evt){
self.onItemClick(_c4e.byNode(this),evt);
evt.stopPropagation();
evt.preventDefault();
}));
this.inherited(arguments);
},onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.onItemClick(this.focusedChild,evt);
}else{
var _c53=this._getTopMenu();
if(_c53&&_c53._isMenuBar){
_c53.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _c54=this.currentPopup.parentMenu;
if(_c54.focusedChild){
_c54.focusedChild._setSelected(false);
}
_c54.focusedChild=this.currentPopup.from_item;
_c54.focusedChild._setSelected(true);
this._stopPendingCloseTimer(this.currentPopup);
}
},onItemHover:function(item){
if(this.isActive){
this.focusChild(item);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){
this.hover_timer=this.defer("_openPopup",this.popupDelay);
}
}
if(this.focusedChild){
this.focusChild(item);
}
this._hoveredChild=item;
item._set("hovering",true);
},_onChildBlur:function(item){
this._stopPopupTimer();
item._setSelected(false);
var _c55=item.popup;
if(_c55){
this._stopPendingCloseTimer(_c55);
_c55._pendingClose_timer=this.defer(function(){
_c55._pendingClose_timer=null;
if(_c55.parentMenu){
_c55.parentMenu.currentPopup=null;
}
pm.close(_c55);
},this.popupDelay);
}
},onItemUnhover:function(item){
if(this.isActive){
this._stopPopupTimer();
}
if(this._hoveredChild==item){
this._hoveredChild=null;
}
item._set("hovering",false);
},_stopPopupTimer:function(){
if(this.hover_timer){
this.hover_timer=this.hover_timer.remove();
}
},_stopPendingCloseTimer:function(_c56){
if(_c56._pendingClose_timer){
_c56._pendingClose_timer=_c56._pendingClose_timer.remove();
}
},_stopFocusTimer:function(){
if(this._focus_timer){
this._focus_timer=this._focus_timer.remove();
}
},_getTopMenu:function(){
for(var top=this;top.parentMenu;top=top.parentMenu){
}
return top;
},onItemClick:function(item,evt){
if(typeof this.isShowingNow=="undefined"){
this._markActive();
}
this.focusChild(item);
if(item.disabled){
return false;
}
if(item.popup){
this._openPopup(evt.type=="keypress");
}else{
this.onExecute();
item._onClick?item._onClick(evt):item.onClick(evt);
}
},_openPopup:function(_c57){
this._stopPopupTimer();
var _c58=this.focusedChild;
if(!_c58){
return;
}
var _c59=_c58.popup;
if(!_c59.isShowingNow){
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_c59.parentMenu=this;
_c59.from_item=_c58;
var self=this;
pm.open({parent:this,popup:_c59,around:_c58.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_c58);
self._cleanUp();
_c58._setSelected(true);
self.focusedChild=_c58;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_c59;
_c59.connect(_c59.domNode,"onmouseenter",lang.hitch(self,"_onPopupHover"));
}
if(_c57&&_c59.focus){
_c59._focus_timer=this.defer(lang.hitch(_c59,function(){
this._focus_timer=null;
this.focus();
}));
}
},_markActive:function(){
this.isActive=true;
_c4a.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_c4a.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_c47.indexOf(this._focusManager.activeStack,this.id)>=0){
_c49.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
this.focusedChild.focusNode.focus();
}
pm.close(this.currentPopup);
this.currentPopup=null;
}
if(this.focusedChild){
this.focusedChild._setSelected(false);
this.onItemUnhover(this.focusedChild);
this.focusedChild=null;
}
},_onItemFocus:function(item){
if(this._hoveredChild&&this._hoveredChild!=item){
this.onItemUnhover(this._hoveredChild);
}
},_onBlur:function(){
this._cleanUp();
this.inherited(arguments);
},_cleanUp:function(){
this._closeChild();
if(typeof this.isShowingNow=="undefined"){
this._markInactive();
}
}});
});
},"dijit/layout/ScrollingTabController":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/_base/lang","dojo/on","dojo/query","dojo/sniff","../registry","dojo/text!./templates/ScrollingTabController.html","dojo/text!./templates/_ScrollingTabControllerButton.html","./TabController","./utils","../_WidgetsInTemplateMixin","../Menu","../MenuItem","../form/Button","../_HasDropDown","dojo/NodeList-dom"],function(_c5a,_c5b,_c5c,_c5d,_c5e,fx,lang,on,_c5f,has,_c60,_c61,_c62,_c63,_c64,_c65,Menu,_c66,_c67,_c68){
var _c69=_c5b("dijit.layout.ScrollingTabController",[_c63,_c65],{baseClass:"dijitTabController dijitScrollingTabController",templateString:_c61,useMenu:true,useSlider:true,tabStripClass:"",widgetsInTemplate:true,_minScroll:5,_setClassAttr:{node:"containerNode",type:"class"},buildRendering:function(){
this.inherited(arguments);
var n=this.domNode;
this.scrollNode=this.tablistWrapper;
this._initButtons();
if(!this.tabStripClass){
this.tabStripClass="dijitTabContainer"+this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"")+"None";
_c5c.add(n,"tabStrip-disabled");
}
_c5c.add(this.tablistWrapper,this.tabStripClass);
},onStartup:function(){
this.inherited(arguments);
_c5e.set(this.domNode,"visibility","");
this._postStartup=true;
this.own(on(this.containerNode,"attrmodified-label, attrmodified-iconclass",lang.hitch(this,function(evt){
if(this._dim){
this.resize(this._dim);
}
})));
},onAddChild:function(page,_c6a){
this.inherited(arguments);
_c5e.set(this.containerNode,"width",(_c5e.get(this.containerNode,"width")+200)+"px");
},onRemoveChild:function(page,_c6b){
var _c6c=this.pane2button[page.id];
if(this._selectedTab===_c6c.domNode){
this._selectedTab=null;
}
this.inherited(arguments);
},_initButtons:function(){
this._btnWidth=0;
this._buttons=_c5f("> .tabStripButton",this.domNode).filter(function(btn){
if((this.useMenu&&btn==this._menuBtn.domNode)||(this.useSlider&&(btn==this._rightBtn.domNode||btn==this._leftBtn.domNode))){
this._btnWidth+=_c5d.getMarginSize(btn).w;
return true;
}else{
_c5e.set(btn,"display","none");
return false;
}
},this);
},_getTabsWidth:function(){
var _c6d=this.getChildren();
if(_c6d.length){
var _c6e=_c6d[this.isLeftToRight()?0:_c6d.length-1].domNode,_c6f=_c6d[this.isLeftToRight()?_c6d.length-1:0].domNode;
return _c6f.offsetLeft+_c5e.get(_c6f,"width")-_c6e.offsetLeft;
}else{
return 0;
}
},_enableBtn:function(_c70){
var _c71=this._getTabsWidth();
_c70=_c70||_c5e.get(this.scrollNode,"width");
return _c71>0&&_c70<_c71;
},resize:function(dim){
this._dim=dim;
this.scrollNode.style.height="auto";
var cb=this._contentBox=_c64.marginBox2contentBox(this.domNode,{h:0,w:dim.w});
cb.h=this.scrollNode.offsetHeight;
_c5d.setContentSize(this.domNode,cb);
var _c72=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_c72?"":"none");
this._leftBtn.layoutAlign="left";
this._rightBtn.layoutAlign="right";
this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";
_c64.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client"}]);
if(this._selectedTab){
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
this.scrollNode.scrollLeft=this._convertToScrollLeft(this._getScrollForSelectedTab());
}
this._setButtonClass(this._getScroll());
this._postResize=true;
return {h:this._contentBox.h,w:dim.w};
},_getScroll:function(){
return (this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit"))?this.scrollNode.scrollLeft:_c5e.get(this.containerNode,"width")-_c5e.get(this.scrollNode,"width")+(has("ie")>=8?-1:1)*this.scrollNode.scrollLeft;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit")){
return val;
}else{
var _c73=_c5e.get(this.containerNode,"width")-_c5e.get(this.scrollNode,"width");
return (has("ie")>=8?-1:1)*(val-_c73);
}
},onSelectChild:function(page){
var tab=this.pane2button[page.id];
if(!tab||!page){
return;
}
var node=tab.domNode;
if(node!=this._selectedTab){
this._selectedTab=node;
if(this._postResize){
var sl=this._getScroll();
if(sl>node.offsetLeft||sl+_c5e.get(this.scrollNode,"width")<node.offsetLeft+_c5e.get(node,"width")){
this.createSmoothScroll().play();
}
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _c74=this.getChildren(),_c75=_c5e.get(this.scrollNode,"width"),_c76=_c5e.get(this.containerNode,"width"),_c77=_c76-_c75,_c78=this._getTabsWidth();
if(_c74.length&&_c78>_c75){
return {min:this.isLeftToRight()?0:_c74[_c74.length-1].domNode.offsetLeft,max:this.isLeftToRight()?(_c74[_c74.length-1].domNode.offsetLeft+_c5e.get(_c74[_c74.length-1].domNode,"width"))-_c75:_c77};
}else{
var _c79=this.isLeftToRight()?0:_c77;
return {min:_c79,max:_c79};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_c7a=_c5e.get(this.scrollNode,"width"),_c7b=this._getScrollBounds();
var pos=(n.offsetLeft+_c5e.get(n,"width")/2)-_c7a/2;
pos=Math.min(Math.max(pos,_c7b.min),_c7b.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _c7c=this._getScrollBounds();
x=Math.min(Math.max(x,_c7c.min),_c7c.max);
}else{
x=this._getScrollForSelectedTab();
}
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var self=this,w=this.scrollNode,anim=new fx.Animation({beforeBegin:function(){
if(this.curve){
delete this.curve;
}
var oldS=w.scrollLeft,newS=self._convertToScrollLeft(x);
anim.curve=new fx._Line(oldS,newS);
},onAnimate:function(val){
w.scrollLeft=val;
}});
this._anim=anim;
this._setButtonClass(x);
return anim;
},_getBtnNode:function(e){
var n=e.target;
while(n&&!_c5c.contains(n,"tabStripButton")){
n=n.parentNode;
}
return n;
},doSlideRight:function(e){
this.doSlide(1,this._getBtnNode(e));
},doSlideLeft:function(e){
this.doSlide(-1,this._getBtnNode(e));
},doSlide:function(_c7d,node){
if(node&&_c5c.contains(node,"dijitTabDisabled")){
return;
}
var _c7e=_c5e.get(this.scrollNode,"width");
var d=(_c7e*0.75)*_c7d;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_c7f){
var _c80=this._getScrollBounds();
this._leftBtn.set("disabled",_c7f<=_c80.min);
this._rightBtn.set("disabled",_c7f>=_c80.max);
}});
var _c81=_c5b("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:_c62,tabIndex:"",isFocusable:function(){
return false;
}});
_c5b("dijit.layout._ScrollingTabControllerButton",[_c67,_c81]);
_c5b("dijit.layout._ScrollingTabControllerMenuButton",[_c67,_c68,_c81],{containerId:"",tabIndex:"-1",isLoaded:function(){
return false;
},loadDropDown:function(_c82){
this.dropDown=new Menu({id:this.containerId+"_menu",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir});
var _c83=_c60.byId(this.containerId);
_c5a.forEach(_c83.getChildren(),function(page){
var _c84=new _c66({id:page.id+"_stcMi",label:page.title,iconClass:page.iconClass,disabled:page.disabled,ownerDocument:this.ownerDocument,dir:page.dir,lang:page.lang,textDir:page.textDir,onClick:function(){
_c83.selectChild(page);
}});
this.dropDown.addChild(_c84);
},this);
_c82();
},closeDropDown:function(_c85){
this.inherited(arguments);
if(this.dropDown){
this.dropDown.destroyRecursive();
delete this.dropDown;
}
}});
return _c69;
});
},"dijit/form/_ListMouseMixin":function(){
define(["dojo/_base/declare","dojo/mouse","dojo/on","dojo/touch","./_ListBase"],function(_c86,_c87,on,_c88,_c89){
return _c86("dijit.form._ListMouseMixin",_c89,{postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,_c88.press,function(evt){
evt.preventDefault();
}));
this._listConnect(_c88.press,"_onMouseDown");
this._listConnect(_c88.release,"_onMouseUp");
this._listConnect(_c87.enter,"_onMouseOver");
this._listConnect(_c87.leave,"_onMouseOut");
},_onMouseDown:function(evt,_c8a){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
this._isDragging=true;
this._setSelectedAttr(_c8a);
},_onMouseUp:function(evt,_c8b){
this._isDragging=false;
var _c8c=this.selected;
var _c8d=this._hoveredNode;
if(_c8c&&_c8b==_c8c){
this.onClick(_c8c);
}else{
if(_c8d&&_c8b==_c8d){
this._setSelectedAttr(_c8d);
this.onClick(_c8d);
}
}
},_onMouseOut:function(evt,_c8e){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
if(this._isDragging){
this._cancelDrag=(new Date()).getTime()+1000;
}
},_onMouseOver:function(evt,_c8f){
if(this._cancelDrag){
var time=(new Date()).getTime();
if(time>this._cancelDrag){
this._isDragging=false;
}
this._cancelDrag=null;
}
this._hoveredNode=_c8f;
this.onHover(_c8f);
if(this._isDragging){
this._setSelectedAttr(_c8f);
}
}});
});
},"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","davinci/review/model/resource/Empty":function(){
define(["dojo/_base/declare","davinci/model/resource/Resource"],function(_c90,_c91){
return _c90("davinci.review.model.resource.Empty",_c91,{constructor:function(args){
this.elementType="Folder";
this.name="root";
this.parent=null;
},getChildren:function(){
return this.children;
}});
});
},"dijit/tree/_dndSelector":function(){
define(["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/Deferred","dojo/_base/kernel","dojo/_base/lang","dojo/cookie","dojo/mouse","dojo/on","dojo/touch","./_dndContainer"],function(_c92,_c93,_c94,_c95,_c96,lang,_c97,_c98,on,_c99,_c9a){
return _c94("dijit.tree._dndSelector",_c9a,{constructor:function(){
this.selection={};
this.anchor=null;
if(!this.cookieName&&this.tree.id){
this.cookieName=this.tree.id+"SaveSelectedCookie";
}
this.events.push(on(this.tree.domNode,_c99.press,lang.hitch(this,"onMouseDown")),on(this.tree.domNode,_c99.release,lang.hitch(this,"onMouseUp")),on(this.tree.domNode,_c99.move,lang.hitch(this,"onMouseMove")));
},singular:false,getSelectedTreeNodes:function(){
var _c9b=[],sel=this.selection;
for(var i in sel){
_c9b.push(sel[i]);
}
return _c9b;
},selectNone:function(){
this.setSelection([]);
return this;
},destroy:function(){
this.inherited(arguments);
this.selection=this.anchor=null;
},addTreeNode:function(node,_c9c){
this.setSelection(this.getSelectedTreeNodes().concat([node]));
if(_c9c){
this.anchor=node;
}
return node;
},removeTreeNode:function(node){
this.setSelection(this._setDifference(this.getSelectedTreeNodes(),[node]));
return node;
},isTreeNodeSelected:function(node){
return node.id&&!!this.selection[node.id];
},setSelection:function(_c9d){
var _c9e=this.getSelectedTreeNodes();
_c92.forEach(this._setDifference(_c9e,_c9d),lang.hitch(this,function(node){
node.setSelected(false);
if(this.anchor==node){
delete this.anchor;
}
delete this.selection[node.id];
}));
_c92.forEach(this._setDifference(_c9d,_c9e),lang.hitch(this,function(node){
node.setSelected(true);
this.selection[node.id]=node;
}));
this._updateSelectionProperties();
},_setDifference:function(xs,ys){
_c92.forEach(ys,function(y){
y.__exclude__=true;
});
var ret=_c92.filter(xs,function(x){
return !x.__exclude__;
});
_c92.forEach(ys,function(y){
delete y["__exclude__"];
});
return ret;
},_updateSelectionProperties:function(){
var _c9f=this.getSelectedTreeNodes();
var _ca0=[],_ca1=[],_ca2=[];
_c92.forEach(_c9f,function(node){
var ary=node.getTreePath(),_ca3=this.tree.model;
_ca1.push(node);
_ca0.push(ary);
ary=_c92.map(ary,function(item){
return _ca3.getIdentity(item);
},this);
_ca2.push(ary.join("/"));
},this);
var _ca4=_c92.map(_ca1,function(node){
return node.item;
});
this.tree._set("paths",_ca0);
this.tree._set("path",_ca0[0]||[]);
this.tree._set("selectedNodes",_ca1);
this.tree._set("selectedNode",_ca1[0]||null);
this.tree._set("selectedItems",_ca4);
this.tree._set("selectedItem",_ca4[0]||null);
if(this.tree.persist&&_ca2.length>0){
_c97(this.cookieName,_ca2.join(","),{expires:365});
}
},_getSavedPaths:function(){
var tree=this.tree;
if(tree.persist&&tree.dndController.cookieName){
var oreo,_ca5=[];
oreo=_c97(tree.dndController.cookieName);
if(oreo){
_ca5=_c92.map(oreo.split(","),function(path){
return path.split("/");
});
}
return _ca5;
}
},onMouseDown:function(e){
if(!this.current||this.tree.isExpandoNode(e.target,this.current)){
return;
}
if(e.type!="touchstart"&&!_c98.isLeft(e)){
return;
}
e.preventDefault();
var _ca6=this.current,copy=_c93.isCopyKey(e),id=_ca6.id;
if(!this.singular&&!e.shiftKey&&this.selection[id]){
this._doDeselect=true;
return;
}else{
this._doDeselect=false;
}
this.userSelect(_ca6,copy,e.shiftKey);
},onMouseUp:function(e){
if(!this._doDeselect){
return;
}
this._doDeselect=false;
this.userSelect(this.current,_c93.isCopyKey(e),e.shiftKey);
},onMouseMove:function(){
this._doDeselect=false;
},_compareNodes:function(n1,n2){
if(n1===n2){
return 0;
}
if("sourceIndex" in document.documentElement){
return n1.sourceIndex-n2.sourceIndex;
}else{
if("compareDocumentPosition" in document.documentElement){
return n1.compareDocumentPosition(n2)&2?1:-1;
}else{
if(document.createRange){
var r1=doc.createRange();
r1.setStartBefore(n1);
var r2=doc.createRange();
r2.setStartBefore(n2);
return r1.compareBoundaryPoints(r1.END_TO_END,r2);
}else{
throw Error("dijit.tree._compareNodes don't know how to compare two different nodes in this browser");
}
}
}
},userSelect:function(node,_ca7,_ca8){
if(this.singular){
if(this.anchor==node&&_ca7){
this.selectNone();
}else{
this.setSelection([node]);
this.anchor=node;
}
}else{
if(_ca8&&this.anchor){
var cr=this._compareNodes(this.anchor.rowNode,node.rowNode),_ca9,end,_caa=this.anchor;
if(cr<0){
_ca9=_caa;
end=node;
}else{
_ca9=node;
end=_caa;
}
var _cab=[];
while(_ca9!=end){
_cab.push(_ca9);
_ca9=this.tree._getNextNode(_ca9);
}
_cab.push(end);
this.setSelection(_cab);
}else{
if(this.selection[node.id]&&_ca7){
this.removeTreeNode(node);
}else{
if(_ca7){
this.addTreeNode(node,true);
}else{
this.setSelection([node]);
this.anchor=node;
}
}
}
}
},getItem:function(key){
var _cac=this.selection[key];
return {data:_cac,type:["treeNode"]};
},forInSelectedItems:function(f,o){
o=o||_c96.global;
for(var id in this.selection){
f.call(o,this.getItem(id),id,this);
}
}});
});
},"davinci/html/HTMLItem":function(){
define(["dojo/_base/declare","davinci/html/HTMLModel"],function(_cad,_cae){
return _cad("davinci.html.HTMLItem",_cae,{constructor:function(){
this.elementType="HTMLItem";
},getLabel:function(){
return this.getText({indent:0});
},onChange:function(arg){
if(this.parent){
if(arg){
this.parent.onChange(arg);
}
}
},_addWS:function(_caf,_cb0){
_caf=_caf||0;
_cb0=_cb0||0;
var res=[];
for(var i=0;i<_caf;i++){
res.push("\n");
}
res.push("                                          ".substring(0,_cb0));
return res.join("");
},close:function(){
for(var i=0;i<this.children.length;i++){
this.children[i].close();
}
},getID:function(){
return this.parent.getID()+":"+this.startOffset+":"+this.getLabel();
},getHTMLFile:function(){
var _cb1=this;
while(_cb1&&_cb1.elementType!="HTMLFile"){
_cb1=_cb1.parent;
}
return _cb1;
}});
});
},"davinci/ve/widget":function(){
define(["davinci/html/HTMLElement","davinci/ve/metadata","dojo/Deferred","davinci/ve/DijitWidget","davinci/ve/GenericWidget","davinci/ve/HTMLWidget","davinci/ve/ObjectWidget","dojo/window"],function(_cb2,_cb3,_cb4){
var _cb5={};
var _cb6=function(_cb7,node,_cb8){
for(var i=0;i<_cb8.children.length;i++){
var _cb9=node.childNodes[i];
var _cba=_cb8.children[i];
if((_cb9&&_cb9.nodeType==1)&&_cba.elementType=="HTMLElement"){
_cb9.id=_cb7.getUniqueID(_cba);
_cb6(_cb7,_cb9,_cba);
}
}
};
var _cbb=function(node,_cbc){
if(!node){
return undefined;
}
_cbc=_cbc||{};
var data={};
data.properties={};
for(var i=0;i<node.attributes.length;i++){
var a=node.attributes[i];
if(!a.specified||!a.nodeValue){
continue;
}
var n=a.nodeName.toLowerCase();
if(n=="id"||n=="widgetid"||n=="style"){
continue;
}else{
if(n.charAt(0)=="_"){
continue;
}
}
var v=a.nodeValue;
if(v&&n=="class"){
v=v.replace("HtmlWidget","").trim();
if(!v){
continue;
}
}
data.properties[n]=v;
}
if(node.tagName.toLowerCase()=="script"){
data.children=(node.innerHTML||undefined);
}
return data;
};
var _cbd={_dojo:function(node){
var doc=node?(node.ownerDocument||node):dojo.doc;
doc=doc||dojo.doc;
var win=dojo.window.get(doc);
return win.dojo||dojo;
},_dijit:function(node){
var doc=node?(node.ownerDocument||node):dojo.doc;
var win=dojo.window.get(doc);
return win.dijit||dijit;
},parseStyleValues:function(text){
var _cbe=[];
if(text){
dojo.forEach(text.split(";"),function(s){
var i=s.indexOf(":");
if(i>0){
var n=s.substring(0,i).trim();
var v=s.substring(i+1).trim();
var o={};
o[n]=v;
_cbe.push(o);
}
});
}
return _cbe;
},retrieveStyleProperty:function(_cbf,_cc0,_cc1){
var _cc2=_cc1;
if(_cbf){
dojo.some(_cbf,function(o){
if(o.hasOwnProperty(_cc0)){
_cc2=o[_cc0];
return true;
}
});
}
return _cc2;
},setStyleProperty:function(_cc3,_cc4,_cc5){
var _cc6=false;
if(_cc3){
dojo.some(_cc3,function(o){
if(o.hasOwnProperty(_cc4)){
o[_cc4]=_cc5;
_cc6=true;
return true;
}
});
}
if(!_cc6){
var o={};
o[_cc4]=_cc5;
_cc3.push(o);
}
},getStyleString:function(_cc7){
var _cc8="";
dojo.forEach(_cc7,function(_cc9){
for(var p in _cc9){
if(_cc9[p]){
_cc8=_cc8+p+":"+_cc9[p]+";";
}
}
});
return _cc8;
},getEnclosingWidget:function(node){
var _cca=_cbd.getEnclosingWidgetForRichText(node);
if(_cca){
return _cca;
}
var enc=node;
while(enc){
if(enc._dvWidget){
return enc._dvWidget;
}
enc=enc.parentNode||(enc.domNode&&enc.domNode.parentNode);
}
},getEnclosingWidgetForRichText:function(node){
if(!node||!node._dvWidget){
return;
}
if(node._dvWidget.type==="html.stickynote"||node._dvWidget.type==="html.richtext"){
return node._dvWidget;
}else{
if(node.parentNode){
return _cbd.getEnclosingWidgetForRichText(node.parentNode);
}else{
return null;
}
}
},getUniqueObjectId:function(type,node){
if(!type){
return undefined;
}
var base=type.substring(type.lastIndexOf(".")+1);
var i=1;
var id=base+"_"+i++;
var dj=_cbd._dojo(node);
while(dj.getObject(id)||dj.byId(id)){
id=base+"_"+i++;
}
return id;
},_remove_prefix:function(str){
var _ccb=str;
var _ccc=["dijit.form.","dijit.layout.","dijit.","dojox.mobile.","html.","OpenAjax."];
for(var i=0;i<_ccc.length;i++){
if(str.indexOf(_ccc[i])==0){
_ccb=str.substr(_ccc[i].length);
if(_ccc[i]=="html."){
_ccb="&lt;"+_ccb+"&gt;";
}
break;
}
}
return _ccb;
},_getWidgetNameText:function(type){
var text="<span class='propertiesTitleWidgetName'>";
text+=this._remove_prefix(type);
text+="</span> ";
return text;
},_getWidgetClassText:function(id,_ccd){
var text="<span class='propertiesTitleClassName'>";
if(id){
text+="#"+id;
}
if(_ccd){
text+="."+_ccd.replace(/\s+/g,".");
}
text+="</span> ";
return text;
},getLabelForNode:function(node){
var type=node.getAttribute("data-dojo-type")||node.getAttribute("dojoType");
if(!type){
type=node.tagName.toLowerCase();
}
var text=this._getWidgetNameText(type);
if(node.id){
text+=this._getWidgetClassText(node.id);
}
return text;
},getLabel:function(_cce){
var text=this._getWidgetNameText(_cce.type);
var _ccf,_cd0=_cbd.getWidgetHelper(_cce.type);
if(_cd0&&_cd0.getWidgetText){
_ccf=_cd0.getWidgetText(_cce);
}
var _cd1=_cce.domNode;
switch(_cce.type){
case "dijit.form.ComboBox":
case "dijit.form.Button":
_ccf=_cce.attr("label");
break;
case "dijit.layout.ContentPane":
_ccf=_cce.attr("title");
break;
case "html.label":
_ccf=_cd1.innerHTML;
break;
case "html.img":
_ccf=_cd1.alt;
if(!_ccf){
_ccf=_cd1.title;
}
}
if(_ccf){
text+="<span class='propertiesTitleWidgetText'>"+_ccf+"</span> ";
}
if(_cd0&&_cd0.getWidgetDescriptor){
text+=" <span class='propertiesTitleWidgetDescriptor'>"+_cd0.getWidgetDescriptor(_cce)+"</span> ";
}
var _cd2=_cce._srcElement;
var id=_cce.getId();
var _cd3=_cd2&&_cd2.getAttribute("class");
var _cd4=_cd3&&_cd3.trim();
if(id||_cd4){
text+=this._getWidgetClassText(id,_cd4);
}
if(_cd0&&_cd0.getWidgetTextExtra){
text+=_cd0.getWidgetTextExtra(_cce);
}
if(_cce.type=="html.img"){
text+="<span>"+_cd1.src.substr(_cd1.src.lastIndexOf("/")+1)+"</span>";
}
return text;
},byId:function(id,doc){
var node=dojo.byId(id,doc&&doc.body?doc:undefined);
if(node){
if(node._dvWidget){
return node._dvWidget;
}
var _cd5=_cbd.getEnclosingWidget(node);
if(_cd5.id==id){
return _cd5;
}
}
if(davinci.Runtime.currentEditor&&davinci.Runtime.currentEditor.currentEditor&&davinci.Runtime.currentEditor.currentEditor.context){
var _cd6=davinci.Runtime.currentEditor.currentEditor.context;
return _cd6.widgetHash[id];
}
return undefined;
},byNode:function(node){
if(node._dvWidget){
return node._dvWidget;
}
},createWidget:function(_cd7){
if(!_cd7||!_cd7.type){
return undefined;
}
var data=dojo.mixin({},_cd7);
if(data.properties){
data.properties=dojo.mixin({},_cd7.properties);
}
var type=data.type,c,_cd8,_cd9,md=_cb3.query(type);
if(!md){
return undefined;
}
if(data.properties){
if("content" in data.properties&&!data.properties.content){
delete data.properties.content;
}
if(data.properties.theme){
_cd8=data.properties.theme.themeName;
}
}
var _cda=_cb3.queryDescriptor(type,"widgetClass");
var _cdb;
if(_cda=="object"){
_cd9=type;
_cdb="davinci.ve.ObjectWidget";
md.attributes=md.attributes||{};
md.attributes.dojoType=_cd9;
}else{
if(_cda=="html"){
_cdb="davinci.ve.HTMLWidget";
}else{
if(_cda=="dijit"){
_cdb="davinci.ve.DijitWidget";
}else{
_cdb="davinci.ve.GenericWidget";
}
}
}
if(!_cdb){
return undefined;
}
c=dojo.getObject(_cdb);
var _cdc=md.content.trim().replace(/\s+/g," ");
var node=dojo.window.get(dojo.doc).dojo._toDom(_cdc);
if(node.nodeType===11){
var _cdd=0,n=null,_cde=node.childNodes;
for(var i=0;i<_cde.length;i++){
if(_cde[i].nodeType!==8){
_cdd++;
n=_cde[i];
if(_cdd>1){
break;
}
}
}
if(_cdd>1){
console.error("ERROR: complex widget content not supported");
return;
}
node=n;
}
var _cdf=new _cb2(node.tagName.toLowerCase());
if(node.hasAttributes()){
var _ce0=node.attributes;
for(var j=_ce0.length-1;j>=0;--j){
_cdf.addAttribute(_ce0[j].name,_ce0[j].value);
}
}
if(node.innerHTML){
_cdf.addText(node.innerHTML);
}
var _ce1=_cb3.queryDescriptor(type,"requiresId"),name=_cb3.queryDescriptor(type,"name"),_ce2=_ce1&&name.match(/^[A-Za-z]\w*$/)?name:undefined;
node.id=(data.properties&&data.properties.id)||data.context.getUniqueID(_cdf,_ce2);
var _cde=data.children;
if(_cde){
if(dojo.isString(_cde)){
node.innerHTML=_cde;
var _ce3=node.nodeName.toLowerCase();
var _ce4=_cdf._getAttribute("id");
_cdf.addText(_cde);
var _ce5=_cdf.getText(data.context);
_cdf.children=[];
_cdf.setText(_ce5);
if(_ce4){
_cdf.addAttribute(_ce4.name,_ce4.value,_ce4.noPersist);
}
_cb6(data.context,node,_cdf);
}else{
dojo.forEach(_cde,function(c){
if(!c){
return;
}
if(dojo.isString(c)){
if(c.length>7&&c.substring(0,4)=="<!--"&&c.substring(c.length-3)=="-->"){
node.appendChild(dojo.doc.createComment(c.substring(4,c.length-3)));
_cdf.addComment(c.substring(4,c.length-3));
}else{
node.appendChild(dojo.doc.createTextNode(c));
_cdf.addText(c);
}
}else{
c.context=data.context;
var _ce6=_cbd.createWidget(c);
if(_ce6){
node.appendChild(_ce6.domNode);
_cdf.addChild(_ce6._srcElement);
}
}
});
}
}
var _ce7=_cbd.getWidgetHelper(type);
if(_ce7&&_ce7.preProcessData){
data=_ce7.preProcessData(data);
}
var _ce8={};
var _ce9={};
for(var p in data.properties){
var _cea=data.properties[p];
if(_cea!=null){
if(p.substr(0,2).toLowerCase()!="on"){
_ce8[p]=_cea;
}else{
_ce9[p]=_cea;
}
}
}
var _ceb=new c(_ce8,node,type,md,_cdf);
_ceb._srcElement=_cdf;
if(_ceb.chart&&(data.properties&&data.properties.theme)){
_ceb.chart.theme.themeName=_cd8;
}
if(data.scripts){
_ceb.scripts=data.scripts;
}
if(data.context){
_ceb._edit_context=data.context;
}
if(data.properties){
_ceb.setProperties(_ce8);
_ceb.setProperties(_ce9,true);
}
if(data.maqAppStates||data.maqDeltas){
if(data.maqAppStates){
_ceb.domNode._maqAppStates=dojo.clone(data.maqAppStates);
}
if(data.maqDeltas){
_ceb.domNode._maqDeltas=dojo.clone(data.maqDeltas);
}
var obj=davinci.states.serialize(_ceb.domNode);
if(obj.maqAppStates){
_ceb._srcElement.addAttribute(davinci.states.APPSTATES_ATTRIBUTE,obj.maqAppStates);
}
if(obj.maqDeltas){
_ceb._srcElement.addAttribute(davinci.states.DELTAS_ATTRIBUTE,obj.maqDeltas);
}
}
var _ce7=_cbd.getWidgetHelper(type);
if(_ce7&&_ce7.cleanSrcElement){
_ce7.cleanSrcElement(_ceb._srcElement);
}
return _ceb;
},_createSrcElement:function(node){
var _cec=new _cb2(node.tagName.toLowerCase());
if(node.hasAttributes()){
var _ced=node.attributes;
for(var j=_ced.length-1;j>=0;--j){
_cec.addAttribute(_ced[j].name,_ced[j].value);
}
}
return _cec;
},getWidgetHelper:function(type){
return _cb5[type];
},requireWidgetHelper:function(type){
var d=new _cb4();
_cb3.getHelper(type,"helper").then(function(_cee){
if(_cee){
d.resolve(_cb5[type]=new _cee());
}else{
d.resolve();
}
});
return d;
},getWidget:function(node){
if(!node||node.nodeType!=1){
return undefined;
}
var _cef=_cbd.byNode(node);
if(!_cef){
var ctor;
var data=_cbb(node);
var _cf0=node.getAttribute("dvwidget");
if(node.hasAttribute("widgetid")||node.hasAttribute("data-dojo-type")||node.hasAttribute("dojotype")){
var d=_cbd._dijit(node);
var w=d.byNode(node);
if(w){
_cef=new davinci.ve.DijitWidget(data,node,w);
}else{
_cef=new davinci.ve.ObjectWidget(data,node);
}
}else{
if(_cf0){
_cef=new davinci.ve.GenericWidget(data,node,_cf0);
}else{
if(node.nodeName=="svg"){
return undefined;
}
_cef=new davinci.ve.HTMLWidget(data,node);
}
}
}
return _cef;
}};
dojo.setObject("davinci.ve.widget",_cbd);
return _cbd;
});
},"davinci/review/view/CommentExplorerView":function(){
define(["dojo/_base/declare","davinci/Runtime","davinci/review/model/ReviewTreeModel","davinci/Workbench","davinci/workbench/ViewPart","dijit/Tree","dojo/date/stamp","dojo/date/locale","davinci/review/actions/CloseVersionAction","davinci/review/actions/EditVersionAction","davinci/review/actions/OpenVersionAction","dijit/Toolbar","dijit/ToolbarSeparator","dijit/form/Button","dijit/form/TextBox","dojo/i18n!./nls/view","dojo/i18n!../widgets/nls/widgets","davinci/ui/widgets/TransformTreeMixin"],function(_cf1,_cf2,_cf3,_cf4,_cf5,Tree,_cf6,_cf7,_cf8,_cf9,_cfa,_cfb,_cfc,_cfd,_cfe,_cff,_d00){
var _d01=function(item,_d02){
if(item.elementType=="ReviewVersion"){
if(item.isDraft){
return "draft-open";
}
if(item.closed){
return _d02?"reviewFolder-open-disabled":"reviewFolder-closed-disabled";
}
if(!item.closed){
return _d02?"reviewFolder-open":"reviewFolder-closed";
}
}
if(item.elementType=="ReviewFile"){
if(item.parent.closed){
return "disabledReviewFileIcon";
}
var icon;
var _d03=item.getExtension();
var _d04=_cf2.getExtension("davinci.fileType",function(_d05){
return _d05.extension==_d03;
});
if(_d04){
icon=_d04.iconClass;
}
return icon||"dijitLeaf";
}
return "dijitLeaf";
};
getLabelClass=function(item,_d06){
var _d07="dijitTreeLabel";
if(item.elementType=="ReviewVersion"){
if(item.designerId==_cf2.userName){
_d07="reviewOwnedByUserLabel";
}else{
_d07="reviewOwnedByOtherLabel";
}
}
return _d07;
};
var _d08=function(){
return [function(_d09){
return _d09.sort(function(_d0a,_d0b){
return _d0a.timeStamp>_d0b.timeStamp?-1:_d0a.timeStamp<_d0b.timeStamp?1:0;
});
}];
};
var _d0c=_cf1(_cf5,{postCreate:function(){
this.inherited(arguments);
var _d0d=new _cf3();
this.model=_d0d;
var _d0e=_d08();
_d0e.push(function(_d0f){
return _d0f.filter(this.commentingFilter.filterItem,this);
}.bind(this));
this.tree=new Tree({id:"reviewCommentExplorerViewTree",persist:false,showRoot:false,model:_d0d,labelAttr:"name",childrenAttrs:"children",getIconClass:dojo.hitch(this,this._getIconClass),getLabelClass:dojo.hitch(this,this._getLabelClass),transforms:_d0e,isMultiSelect:true});
this.setContent(this.tree);
this.attachToolbar();
this.tree.startup();
dojo.connect(this.tree,"onDblClick",dojo.hitch(this,this._dblClick));
dojo.connect(this.tree,"onClick",dojo.hitch(this,this._click));
dojo.connect(this.tree,"_onNodeMouseEnter",dojo.hitch(this,this._over));
dojo.connect(this.tree,"_onNodeMouseLeave",dojo.hitch(this,this._leave));
dojo.connect(this.tree,"_setSelectedNodesAttr",function(){
this._publishSelectionChanges();
}.bind(this));
this.subscribe("/davinci/review/selectionChanged","_updateActionBar");
this.subscribe("/davinci/review/resourceChanged",function(_d10,type,_d11){
if(_d11&&_d11.timeStamp){
davinci.review.model.resource.root.findVersion(_d11.timeStamp).then(function(node){
if(node){
this.tree.set("selectedItem",node);
}else{
this.tree.set("selectedItems",[]);
}
this._publishSelectionChanges();
this.tree.rootNode.expand();
}.bind(this));
}
});
var _d12=_cf4.createPopup({partID:"davinci.review.reviewNavigator",context:this,domNode:this.tree.domNode,openCallback:function(_d13){
var w=dijit.getEnclosingWidget(_d13.target);
if(!w||!w.item){
return;
}
this.tree.set("path",this._buildTreePath(w.item));
}.bind(this)});
var o=_cf4.getActionSets("davinci.review.reviewNavigator");
var _d14=o.clonedActionSets;
if(_d14&&_d14.length==1){
dojo.forEach(_d14[0].actions,dojo.hitch(this,function(_d15){
if(_d15.keyBinding){
if(!this.keyBindings){
this.keyBindings=[];
}
this.keyBindings.push({keyBinding:_d15.keyBinding,action:_d15});
}
}));
}
dojo.connect(this.tree.domNode,"onkeypress",this,"_onKeyPress");
this.infoCardContent=dojo.cache("davinci","review/widgets/templates/InfoCard.html","<div class=\"detail_title\">${detail_title}</div>\r\n<div>\r\n\t<div class=\"detail_div\"><span>${your_role}:</span><span class=\"detail_role\">${detail_role}</span><span>${due_by}:</span><span class=\"${detail_dueDate_class}\">${detail_dueDate}</span></div>\r\n\t<div class=\"detail_div\"><span>${created_by}:</span><span class=\"detail_creator\">${detail_creator}</div>\r\n\t<div class=\"detail_div\"><span>${creation_date}:</span><span class=\"detail_creationDate\">${detail_creationDate}</div>\r\n</div>\r\n<div class=\"detail_div\"><strong>${artifacts_in_rev}</strong></div>\r\n${detail_files}\r\n<div class=\"detail_div\"><strong>${reviewers}</strong></div>\r\n${detail_reviewers}");
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
this.connect(dijit._masterTT.domNode,"mouseover",function(){
if(this._delTimer){
clearTimeout(this._delTimer);
this._delTimer=null;
}
});
this.connect(dijit._masterTT.domNode,"mouseleave",function(){
this._lastAnchorNode&&this._leave();
});
dojo.subscribe("/davinci/ui/editorSelected",function(obj){
var _d16=obj.editor;
if(_d16&&_d16.editorID==="davinci.review.CommentReviewEditor"){
var _d17=_d16.resourceFile;
var _d18=_d17.parent;
dojo.forEach(this.model.root.children,function(_d19){
if(_d19!=_d18){
var _d1a=this.tree.getNodesByItem(_d19);
if(_d1a.length>0){
var _d1b=_d1a[0];
if(_d1b.isExpanded){
this.tree._collapseNode(_d1b);
}
}
}
}.bind(this));
this.tree.set("path",this._buildTreePath(_d17));
}
}.bind(this));
},_buildTreePath:function(item){
var path=[];
for(var _d1c=item;_d1c;_d1c=_d1c.parent){
path.unshift(_d1c);
}
return path;
},_updateActionBar:function(item,_d1d){
if(_d1d!=this||!item||!item.length){
this.closeBtn.set("disabled",true);
this.editBtn.set("disabled",true);
return;
}
var _d1e=item[0].resource.elementType=="ReviewFile"?item[0].resource.parent:item[0].resource;
_cf2.reviewers=_d1e.reviewers||[];
var _d1f=_d1e.designerId==_cf2.userName;
var _d20=_d1e.elementType=="ReviewVersion";
var _d21=_d1e.isDraft;
this.closeBtn.set("disabled",!_d1f||!_d20||_d1e.closed||_d21);
this.openBtn.set("disabled",!_d1f||!_d20||!_d1e.closedManual||_d21);
this.editBtn.set("disabled",!_d1f||!_d20);
},getTopAdditions:function(){
var _d22=new _cfb({},dojo.create("div"));
var _d23=new _cfd({id:_d22.get("id")+".Close",showLabel:false,label:_cff.closeVersion,disabled:true,iconClass:"viewActionIcon closeVersionIcon",onClick:dojo.hitch(this,"_closeVersion")});
this.closeBtn=_d23;
var _d24=new _cfd({id:_d22.get("id")+".Open",showLabel:false,label:_cff.openVersion,disabled:true,iconClass:"viewActionIcon openVersionIcon",onClick:dojo.hitch(this,"_openVersion")});
this.openBtn=_d24;
var _d25=new _cfd({id:_d22.get("id")+".Edit",showLabel:false,label:_cff.editVersion,disabled:true,iconClass:"viewActionIcon editVersionIcon",onClick:dojo.hitch(this,"_editVersion")});
this.editBtn=_d25;
var _d26=new _cfe({id:"reviewExplorerFilter",placeHolder:_cff.filter,onKeyUp:dojo.hitch(this,this._filter)});
_d22.addChild(_d23);
_d22.addChild(_d24);
_d22.addChild(new dijit.ToolbarSeparator());
_d22.addChild(_d25);
dojo.place(dojo.create("br"),_d22.domNode);
_d22.addChild(_d26);
dojo.addClass(_d22.domNode,"davinciCommentExplorer");
return _d22.domNode;
},_closeVersion:function(){
(new _cf8()).run(this);
},_openVersion:function(){
(new _cfa()).run(this);
},_editVersion:function(){
(new _cf9()).run(this);
},_filter:function(e){
var text=dijit.byId("reviewExplorerFilter").get("value");
this.commentingFilter.filterString=text;
dojo.forEach(this.model.root.children,dojo.hitch(this,function(item){
item.getChildren(function(_d27){
this.model.onChildrenChange(item,_d27);
}.bind(this));
}));
},commentingFilter:{filterString:"",filterItem:function(item){
var _d28=this.commentingFilter.filterString;
if(!_d28){
return true;
}else{
if(item.elementType=="ReviewFile"){
return item.name.toLowerCase().indexOf(_d28.toLowerCase())>=0;
}
return true;
}
}},destroy:function(){
this.inherited(arguments);
},_dblClick:function(node){
if(node.isDraft||node.parent.isDraft){
if(node.designerId==_cf2.userName||node.parent.designerId==_cf2.userName){
this._openPublishWizard(node.isDraft?node:node.parent);
}
return;
}
if(node.elementType=="ReviewFile"){
_cf4.openEditor({fileName:node,content:node.getText()});
}
},_location:function(){
var _d29=document.location.href;
var _d2a=_d29.split("?");
var _d2b=_d2a[0].match(/http:\/\/.+:\d+\//);
return _d2b;
},_click:function(node){
this._publishSelectionChanges();
},_publishSelectionChanges:function(){
var _d2c=this.getSelection();
this.publish("/davinci/review/selectionChanged",[_d2c,this]);
},getSelection:function(){
var _d2d=dojo.map(this.tree.get("selectedItems"),function(item){
return {resource:item};
});
return _d2d;
},_over:function(node){
if(node.item.elementType!="ReviewVersion"){
return;
}
if(!this._showTimer){
var item=node.item,_d2e={},c;
_d2e.detail_title=item.name;
_d2e.your_role=_d00.yourRole;
_d2e.due_by=_d00.dueBy;
_d2e.created_by=_d00.createdBy;
_d2e.creation_date=_d00.creationDate;
_d2e.artifacts_in_rev=_d00.artifactsInRev;
_d2e.reviewers=_d00.reviewers;
_d2e.detail_role=(item.designerId==davinci.Runtime.userName)?_cff.designer:_cff.reviewer;
_d2e.detail_dueDate=item.dueDate=="infinite"?_cff.infinite:_cf7.format(item.dueDate,{selector:"date",formatLength:"long"});
var _d2f=_cf2.getUserDisplayNamePlusEmail({email:item.designerEmail,userFirstName:item.designerFirstName,userId:item.designerId,userLastName:item.designerLastName});
_d2e.detail_creator=_d2f;
var _d30=_cf6.fromISOString(item.timeStamp);
_d2e.detail_creationDate=_cf7.format(_d30,{formatLength:"medium"});
_d2e.detail_files="";
item.getChildren(function(_d31){
dojo.forEach(_d31,function(i){
var _d32=i.getLabel();
_d2e.detail_files+="<div><span>"+_d32.substr(0,_d32.length-4)+"</span><span class='dijitTreeIcon reviewFileIcon detail_file'></span></div>";
});
_d2e.detail_reviewers="";
dojo.forEach(item.reviewers,function(i){
if(i.email!=item.designerEmail){
_d2e.detail_reviewers+="<div>"+i.email+"</div>";
}
});
item.closed?_d2e.detail_dueDate_class="closed":_d2e.detail_dueDate_class="notClosed";
this._showTimer=setTimeout(dojo.hitch(this,function(){
if(this._delTimer){
clearTimeout(this._delTimer);
delete this._delTimer;
}
dijit.showTooltip(dojo.string.substitute(this.infoCardContent,_d2e),node.rowNode);
this._lastAnchorNode=node;
delete this._showTimer;
}),1000);
}.bind(this));
}
},_leave:function(node){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
if(this._lastAnchorNode){
this._delTimer=setTimeout(dojo.hitch(this,function(){
dijit.hideTooltip(this._lastAnchorNode.rowNode);
delete this._delTimer;
}),1000);
}
},_openPublishWizard:function(node){
var _d33=new davinci.review.actions.PublishAction(node);
_d33.run();
},_getIconClass:function(item,_d34){
return _d01(item,_d34);
},_getLabelClass:function(item,_d35){
return getLabelClass(item,_d35);
},_onKeyPress:function(e){
var _d36=dojo.some(this.keyBindings,dojo.hitch(this,function(_d37){
if(_cf2.isKeyEqualToEvent(_d37.keyBinding,e)){
davinci.Workbench._runAction(_d37.action,this,_d37.action.id);
return true;
}
}));
if(_d36){
dojo.stopEvent(e);
}
return _d36;
}});
_d0c.getIconClass=_d01;
_d0c.getLabelClass=getLabelClass;
_d0c.getSortTransforms=_d08;
return _d0c;
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","dijit/layout/StackController":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","../focus","../registry","../_Widget","../_TemplatedMixin","../_Container","../form/ToggleButton","dojo/i18n!../nls/common"],function(_d38,_d39,_d3a,_d3b,keys,lang,on,_d3c,_d3d,_d3e,_d3f,_d40,_d41){
var _d42=_d39("dijit.layout._StackButton",_d41,{tabIndex:"-1",closeButton:false,_aria_attr:"aria-selected",buildRendering:function(evt){
this.inherited(arguments);
(this.focusNode||this.domNode).setAttribute("role","tab");
}});
var _d43=_d39("dijit.layout.StackController",[_d3e,_d3f,_d40],{baseClass:"dijitStackController",templateString:"<span role='tablist' data-dojo-attach-event='onkeypress'></span>",containerId:"",buttonWidget:_d42,buttonWidgetCloseClass:"dijitStackCloseButton",constructor:function(_d44){
this.pane2button={};
},postCreate:function(){
this.inherited(arguments);
this.subscribe(this.containerId+"-startup","onStartup");
this.subscribe(this.containerId+"-addChild","onAddChild");
this.subscribe(this.containerId+"-removeChild","onRemoveChild");
this.subscribe(this.containerId+"-selectChild","onSelectChild");
this.subscribe(this.containerId+"-containerKeyPress","onContainerKeyPress");
this.connect(this.containerNode,"click",function(evt){
var _d45=_d3d.getEnclosingWidget(evt.target);
if(_d45!=this.containerNode&&!_d45.disabled&&_d45.page){
for(var _d46=evt.target;_d46!==this.containerNode;_d46=_d46.parentNode){
if(_d3a.contains(_d46,this.buttonWidgetCloseClass)){
this.onCloseButtonClick(_d45.page);
break;
}else{
if(_d46==_d45.domNode){
this.onButtonClick(_d45.page);
break;
}
}
}
}
});
},onStartup:function(info){
_d38.forEach(info.children,this.onAddChild,this);
if(info.selected){
this.onSelectChild(info.selected);
}
var _d47=_d3d.byId(this.containerId).containerNode,_d48=this.pane2button,_d49={"title":"label","showtitle":"showLabel","iconclass":"iconClass","closable":"closeButton","tooltip":"title","disabled":"disabled"},_d4a=function(attr,_d4b){
return on(_d47,"attrmodified-"+attr,function(evt){
var _d4c=_d48[evt.detail&&evt.detail.widget&&evt.detail.widget.id];
if(_d4c){
_d4c.set(_d4b,evt.detail.newValue);
}
});
};
for(var attr in _d49){
this.own(_d4a(attr,_d49[attr]));
}
},destroy:function(){
for(var pane in this.pane2button){
this.onRemoveChild(_d3d.byId(pane));
}
this.inherited(arguments);
},onAddChild:function(page,_d4d){
var Cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
var _d4e=new Cls({id:this.id+"_"+page.id,name:this.id+"_"+page.id,label:page.title,disabled:page.disabled,ownerDocument:this.ownerDocument,dir:page.dir,lang:page.lang,textDir:page.textDir,showLabel:page.showTitle,iconClass:page.iconClass,closeButton:page.closable,title:page.tooltip,page:page});
this.addChild(_d4e,_d4d);
this.pane2button[page.id]=_d4e;
page.controlButton=_d4e;
if(!this._currentChild){
this.onSelectChild(page);
}
},onRemoveChild:function(page){
if(this._currentChild===page){
this._currentChild=null;
}
var _d4f=this.pane2button[page.id];
if(_d4f){
this.removeChild(_d4f);
delete this.pane2button[page.id];
_d4f.destroy();
}
delete page.controlButton;
},onSelectChild:function(page){
if(!page){
return;
}
if(this._currentChild){
var _d50=this.pane2button[this._currentChild.id];
_d50.set("checked",false);
_d50.focusNode.setAttribute("tabIndex","-1");
}
var _d51=this.pane2button[page.id];
_d51.set("checked",true);
this._currentChild=page;
_d51.focusNode.setAttribute("tabIndex","0");
var _d52=_d3d.byId(this.containerId);
_d52.containerNode.setAttribute("aria-labelledby",_d51.id);
},onButtonClick:function(page){
var _d53=this.pane2button[page.id];
_d3c.focus(_d53.focusNode);
if(this._currentChild&&this._currentChild.id===page.id){
_d53.set("checked",true);
}
var _d54=_d3d.byId(this.containerId);
_d54.selectChild(page);
},onCloseButtonClick:function(page){
var _d55=_d3d.byId(this.containerId);
_d55.closeChild(page);
if(this._currentChild){
var b=this.pane2button[this._currentChild.id];
if(b){
_d3c.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_d56){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_d56=!_d56;
}
var _d57=this.getChildren();
var idx=_d38.indexOf(_d57,this.pane2button[this._currentChild.id]),_d58=_d57[idx];
var _d59;
do{
idx=(idx+(_d56?1:_d57.length-1))%_d57.length;
_d59=_d57[idx];
}while(_d59.disabled&&_d59!=_d58);
return _d59;
},onkeypress:function(e){
if(this.disabled||e.altKey){
return;
}
var _d5a=null;
if(e.ctrlKey||!e._djpage){
switch(e.charOrCode){
case keys.LEFT_ARROW:
case keys.UP_ARROW:
if(!e._djpage){
_d5a=false;
}
break;
case keys.PAGE_UP:
if(e.ctrlKey){
_d5a=false;
}
break;
case keys.RIGHT_ARROW:
case keys.DOWN_ARROW:
if(!e._djpage){
_d5a=true;
}
break;
case keys.PAGE_DOWN:
if(e.ctrlKey){
_d5a=true;
}
break;
case keys.HOME:
var _d5b=this.getChildren();
for(var idx=0;idx<_d5b.length;idx++){
var _d5c=_d5b[idx];
if(!_d5c.disabled){
this.onButtonClick(_d5c.page);
break;
}
}
_d3b.stop(e);
break;
case keys.END:
var _d5b=this.getChildren();
for(var idx=_d5b.length-1;idx>=0;idx--){
var _d5c=_d5b[idx];
if(!_d5c.disabled){
this.onButtonClick(_d5c.page);
break;
}
}
_d3b.stop(e);
break;
case keys.DELETE:
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_d3b.stop(e);
break;
default:
if(e.ctrlKey){
if(e.charOrCode===keys.TAB){
this.onButtonClick(this.adjacent(!e.shiftKey).page);
_d3b.stop(e);
}else{
if(e.charOrCode=="w"){
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_d3b.stop(e);
}
}
}
}
if(_d5a!==null){
this.onButtonClick(this.adjacent(_d5a).page);
_d3b.stop(e);
}
}
},onContainerKeyPress:function(info){
info.e._djpage=info.page;
this.onkeypress(info.e);
}});
_d43.StackButton=_d42;
return _d43;
});
},"dijit/form/DateTextBox":function(){
define(["dojo/_base/declare","../Calendar","./_DateTimeTextBox"],function(_d5d,_d5e,_d5f){
return _d5d("dijit.form.DateTextBox",_d5f,{baseClass:"dijitTextBox dijitComboBox dijitDateTextBox",popupClass:_d5e,_selector:"date",value:new Date("")});
});
},"davinci/model/resource/Marker":function(){
define(["dojo/_base/declare","davinci/model/resource/Resource"],function(_d60,_d61){
return _d60("davinci.model.resource.Marker",_d61,{constructor:function(_d62,type,line,text){
this.resource=_d62;
this.type=type;
this.line=line;
this.text=text;
}});
});
},"davinci/ve/actions/ContextAction":function(){
define(["dojo/_base/declare","davinci/actions/Action"],function(_d63,_d64){
return _d63("davinci.ve.actions.ContextAction",[_d64],{_normalizeSelection:function(_d65){
var _d66=_d65.getSelection();
if(_d66.length<2){
return _d66;
}
var _d67=_d65.rootWidget;
var _d68=[];
dojo.forEach(_d66,function(w){
var p=w.getParent();
while(p&&p!=_d67){
for(var i=0;i<_d66.length;i++){
if(_d66[i]==p){
_d65.deselect(w);
return;
}
}
p=p.getParent();
}
_d68.push(w);
});
return _d68;
},_getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},_getContext:function(_d69){
if(_d69){
return _d69;
}
var _d6a=this._getEditor();
return _d6a&&(_d6a.getContext&&_d6a.getContext()||_d6a.context);
},fixupContext:function(_d6b){
var obj=this._getContext(_d6b);
if(obj.declaredClass=="davinci.ve.Context"){
return obj;
}else{
if(typeof obj.getContext=="function"){
return obj.getContext();
}else{
return null;
}
}
}});
});
},"davinci/review/widgets/OpenReviewDialog":function(){
define(["dojo/_base/declare","dijit/_Templated","dijit/_Widget","dijit/Tree","davinci/review/view/CommentExplorerView","davinci/review/model/ReviewTreeModel","davinci/Workbench","dojo/i18n!davinci/ui/nls/ui","dojo/i18n!dijit/nls/common","dojo/text!./templates/OpenReviewDialog.html","dijit/form/Button","dijit/layout/ContentPane"],function(_d6c,_d6d,_d6e,Tree,_d6f,_d70,_d71,_d72,_d73,_d74){
return _d6c("davinci.ui.widgets.OpenFile",[_d6e,_d6d],{widgetsInTemplate:true,templateString:_d74,fileDialogFileName:null,fileDialogParentFolder:null,postMixInProperties:function(){
dojo.mixin(this,_d72);
dojo.mixin(this,_d73);
if(!this.finishButtonLabel){
this.finishButtonLabel=_d72.open;
}
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
var _d75=new _d70();
this.model=_d75;
var tree=this.tree=new Tree({id:"openReviewDialogTree",persist:false,showRoot:false,model:_d75,labelAttr:"name",childrenAttrs:"children",getIconClass:_d6f.getIconClass,getLabelClass:_d6f.getLabelClass,transforms:_d6f.getSortTransforms()});
this.treeContentPane.set("content",tree);
tree.watch("selectedItems",dojo.hitch(this,this._updateFields));
},startup:function(){
this.tree.startup();
},_updateFields:function(){
this.okButton.set("disabled",true);
this._selectedResource=null;
var _d76=this.tree.get("selectedItems");
if(_d76&&_d76.length==1){
var _d77=_d76[0];
if(_d77.elementType=="ReviewFile"){
this.okButton.set("disabled",false);
this._selectedResource=_d77;
}
}
},_okButton:function(){
if(this._selectedResource){
var item=this._selectedResource;
davinci.Workbench.openEditor({fileName:item,content:item.getText()});
this.cancel=false;
}
},_cancelButton:function(){
this.onClose();
},resize:function(_d78){
this.treeContentPane.resize(_d78);
},onClose:function(){
}});
});
},"dijit/form/_AutoCompleterMixin":function(){
define(["dojo/data/util/filter","dojo/_base/declare","dojo/dom-attr","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/query","dojo/regexp","dojo/sniff","dojo/string","./DataList","../registry","./_TextBoxMixin","./_SearchMixin"],function(_d79,_d7a,_d7b,_d7c,keys,lang,_d7d,_d7e,has,_d7f,_d80,_d81,_d82,_d83){
return _d7a("dijit.form._AutoCompleterMixin",_d83,{item:null,autoComplete:true,highlightMatch:"first",labelAttr:"",labelType:"text",maxHeight:-1,_stopClickEvents:false,_getCaretPos:function(_d84){
var pos=0;
if(typeof (_d84.selectionStart)=="number"){
pos=_d84.selectionStart;
}else{
if(has("ie")){
var tr=_d84.ownerDocument.selection.createRange().duplicate();
var ntr=_d84.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{
ntr.setEndPoint("EndToEnd",tr);
pos=String(ntr.text).replace(/\r/g,"").length;
}
catch(e){
}
}
}
return pos;
},_setCaretPos:function(_d85,_d86){
_d86=parseInt(_d86);
_d82.selectInputText(_d85,_d86,_d86);
},_setDisabledAttr:function(_d87){
this.inherited(arguments);
this.domNode.setAttribute("aria-disabled",_d87?"true":"false");
},_onKey:function(evt){
if(evt.charCode>=32){
return;
}
var key=evt.charCode||evt.keyCode;
if(key==keys.ALT||key==keys.CTRL||key==keys.META||key==keys.SHIFT){
return;
}
var pw=this.dropDown;
var _d88=null;
this._abortQuery();
this.inherited(arguments);
if(evt.altKey||evt.ctrlKey||evt.metaKey){
return;
}
if(this._opened){
_d88=pw.getHighlightedOption();
}
switch(key){
case keys.PAGE_DOWN:
case keys.DOWN_ARROW:
case keys.PAGE_UP:
case keys.UP_ARROW:
if(this._opened){
this._announceOption(_d88);
}
_d7c.stop(evt);
break;
case keys.ENTER:
if(_d88){
if(_d88==pw.nextButton){
this._nextSearch(1);
_d7c.stop(evt);
break;
}else{
if(_d88==pw.previousButton){
this._nextSearch(-1);
_d7c.stop(evt);
break;
}
}
_d7c.stop(evt);
}else{
this._setBlurValue();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
}
case keys.TAB:
var _d89=this.get("displayedValue");
if(pw&&(_d89==pw._messages["previousMessage"]||_d89==pw._messages["nextMessage"])){
break;
}
if(_d88){
this._selectOption(_d88);
}
case keys.ESCAPE:
if(this._opened){
this._lastQuery=null;
this.closeDropDown();
}
break;
}
},_autoCompleteText:function(text){
var fn=this.focusNode;
_d82.selectInputText(fn,fn.value.length);
var _d8a=this.ignoreCase?"toLowerCase":"substr";
if(text[_d8a](0).indexOf(this.focusNode.value[_d8a](0))==0){
var cpos=this.autoComplete?this._getCaretPos(fn):fn.value.length;
if((cpos+1)>fn.value.length){
fn.value=text;
_d82.selectInputText(fn,cpos);
}
}else{
fn.value=text;
_d82.selectInputText(fn);
}
},_openResultList:function(_d8b,_d8c,_d8d){
var _d8e=this.dropDown.getHighlightedOption();
this.dropDown.clearResultList();
if(!_d8b.length&&_d8d.start==0){
this.closeDropDown();
return;
}
this._nextSearch=this.dropDown.onPage=lang.hitch(this,function(_d8f){
_d8b.nextPage(_d8f!==-1);
this.focus();
});
this.dropDown.createOptions(_d8b,_d8d,lang.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if("direction" in _d8d){
if(_d8d.direction){
this.dropDown.highlightFirstOption();
}else{
if(!_d8d.direction){
this.dropDown.highlightLastOption();
}
}
if(_d8e){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_d8c[this.searchAttr].toString())){
this._announceOption(this.dropDown.containerNode.firstChild.nextSibling);
}
}
},_showResultList:function(){
this.closeDropDown(true);
this.openDropDown();
this.domNode.setAttribute("aria-expanded","true");
},loadDropDown:function(){
this._startSearchAll();
},isLoaded:function(){
return false;
},closeDropDown:function(){
this._abortQuery();
if(this._opened){
this.inherited(arguments);
this.domNode.setAttribute("aria-expanded","false");
this.focusNode.removeAttribute("aria-activedescendant");
}
},_setBlurValue:function(){
var _d90=this.get("displayedValue");
var pw=this.dropDown;
if(pw&&(_d90==pw._messages["previousMessage"]||_d90==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
if(typeof this.item=="undefined"){
this.item=null;
this.set("displayedValue",_d90);
}else{
if(this.value!=this._lastValueReported){
this._handleOnChange(this.value,true);
}
this._refreshState();
}
}
},_setItemAttr:function(item,_d91,_d92){
var _d93="";
if(item){
if(!_d92){
_d92=this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr];
}
_d93=this._getValueField()!=this.searchAttr?this.store.getIdentity(item):_d92;
}
this.set("value",_d93,_d91,_d92,item);
},_announceOption:function(node){
if(!node){
return;
}
var _d94;
if(node==this.dropDown.nextButton||node==this.dropDown.previousButton){
_d94=node.innerHTML;
this.item=undefined;
this.value="";
}else{
var item=this.dropDown.items[node.getAttribute("item")];
_d94=(this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr]).toString();
this.set("item",item,false,_d94);
}
this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);
this.focusNode.setAttribute("aria-activedescendant",_d7b.get(node,"id"));
this._autoCompleteText(_d94);
},_selectOption:function(_d95){
this.closeDropDown();
if(_d95){
this._announceOption(_d95);
}
this._setCaretPos(this.focusNode,this.focusNode.value.length);
this._handleOnChange(this.value,true);
},_startSearchAll:function(){
this._startSearch("");
},_startSearchFromInput:function(){
this.item=undefined;
this.inherited(arguments);
},_startSearch:function(key){
if(!this.dropDown){
var _d96=this.id+"_popup",_d97=lang.isString(this.dropDownClass)?lang.getObject(this.dropDownClass,false):this.dropDownClass;
this.dropDown=new _d97({onChange:lang.hitch(this,this._selectOption),id:_d96,dir:this.dir,textDir:this.textDir});
this.focusNode.removeAttribute("aria-activedescendant");
this.textbox.setAttribute("aria-owns",_d96);
}
this._lastInput=key;
this.inherited(arguments);
},_getValueField:function(){
return this.searchAttr;
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.store){
var _d98=this.srcNodeRef;
this.store=new _d80({},_d98);
if(!("value" in this.params)){
var item=(this.item=this.store.fetchSelectedItem());
if(item){
var _d99=this._getValueField();
this.value=this.store._oldAPI?this.store.getValue(item,_d99):item[_d99];
}
}
}
},postCreate:function(){
var _d9a=_d7d("label[for=\""+this.id+"\"]");
if(_d9a.length){
if(!_d9a[0].id){
_d9a[0].id=this.id+"_label";
}
this.domNode.setAttribute("aria-labelledby",_d9a[0].id);
}
this.inherited(arguments);
this.connect(this,"onSearch","_openResultList");
},_getMenuLabelFromItem:function(item){
var _d9b=this.labelFunc(item,this.store),_d9c=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_d9b=this.doHighlight(_d9b,this._lastInput);
_d9c="html";
}
return {html:_d9c=="html",label:_d9b};
},doHighlight:function(_d9d,find){
var _d9e=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),i=this.queryExpr.indexOf("${0}");
find=_d7e.escapeString(find);
return this._escapeHtml(_d9d.replace(new RegExp((i==0?"^":"")+"("+find+")"+(i==(this.queryExpr.length-4)?"$":""),_d9e),"￿$1￿")).replace(/\uFFFF([^\uFFFF]+)\uFFFF/g,"<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},reset:function(){
this.item=null;
this.inherited(arguments);
},labelFunc:function(item,_d9f){
return (_d9f._oldAPI?_d9f.getValue(item,this.labelAttr||this.searchAttr):item[this.labelAttr||this.searchAttr]).toString();
},_setValueAttr:function(_da0,_da1,_da2,item){
this._set("item",item||null);
if(_da0==null){
_da0="";
}
this.inherited(arguments);
},_setTextDirAttr:function(_da3){
this.inherited(arguments);
if(this.dropDown){
this.dropDown._set("textDir",_da3);
}
}});
});
},"dojo/dnd/Container":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/kernel","../_base/lang","../_base/window","../dom","../dom-class","../dom-construct","../Evented","../has","../on","../query","../ready","../touch","./common"],function(_da4,_da5,_da6,_da7,lang,win,dom,_da8,_da9,_daa,has,on,_dab,_dac,_dad,dnd){
var _dae=_da5("dojo.dnd.Container",_daa,{skipForm:false,allowNested:false,constructor:function(node,_daf){
this.node=dom.byId(node);
if(!_daf){
_daf={};
}
this.creator=_daf.creator||null;
this.skipForm=_daf.skipForm;
this.parent=_daf.dropParent&&dom.byId(_daf.dropParent);
this.map={};
this.current=null;
this.containerState="";
_da8.add(this.node,"dojoDndContainer");
if(!(_daf&&_daf._skipStartup)){
this.startup();
}
this.events=[on(this.node,_dad.over,lang.hitch(this,"onMouseOver")),on(this.node,_dad.out,lang.hitch(this,"onMouseOut")),on(this.node,"dragstart",lang.hitch(this,"onSelectStart")),on(this.node,"selectstart",lang.hitch(this,"onSelectStart"))];
},creator:function(){
},getItem:function(key){
return this.map[key];
},setItem:function(key,data){
this.map[key]=data;
},delItem:function(key){
delete this.map[key];
},forInItems:function(f,o){
o=o||_da7.global;
var m=this.map,e=dnd._empty;
for(var i in m){
if(i in e){
continue;
}
f.call(o,m[i],i,this);
}
return o;
},clearItems:function(){
this.map={};
},getAllNodes:function(){
return _dab((this.allowNested?"":"> ")+".dojoDndItem",this.parent);
},sync:function(){
var map={};
this.getAllNodes().forEach(function(node){
if(node.id){
var item=this.getItem(node.id);
if(item){
map[node.id]=item;
return;
}
}else{
node.id=dnd.getUniqueId();
}
var type=node.getAttribute("dndType"),data=node.getAttribute("dndData");
map[node.id]={data:data||node.innerHTML,type:type?type.split(/\s*,\s*/):["text"]};
},this);
this.map=map;
return this;
},insertNodes:function(data,_db0,_db1){
if(!this.parent.firstChild){
_db1=null;
}else{
if(_db0){
if(!_db1){
_db1=this.parent.firstChild;
}
}else{
if(_db1){
_db1=_db1.nextSibling;
}
}
}
var i,t;
if(_db1){
for(i=0;i<data.length;++i){
t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
_db1.parentNode.insertBefore(t.node,_db1);
}
}else{
for(i=0;i<data.length;++i){
t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.appendChild(t.node);
}
}
return this;
},destroy:function(){
_da4.forEach(this.events,function(_db2){
_db2.remove();
});
this.clearItems();
this.node=this.parent=this.current=null;
},markupFactory:function(_db3,node,Ctor){
_db3._skipStartup=true;
return new Ctor(node,_db3);
},startup:function(){
if(!this.parent){
this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){
var c=this.parent.getElementsByTagName("tbody");
if(c&&c.length){
this.parent=c[0];
}
}
}
this.defaultCreator=dnd._defaultCreator(this.parent);
this.sync();
},onMouseOver:function(e){
var n=e.relatedTarget;
while(n){
if(n==this.node){
break;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(!n){
this._changeState("Container","Over");
this.onOverEvent();
}
n=this._getChildByEvent(e);
if(this.current==n){
return;
}
if(this.current){
this._removeItemClass(this.current,"Over");
}
if(n){
this._addItemClass(n,"Over");
}
this.current=n;
},onMouseOut:function(e){
for(var n=e.relatedTarget;n;){
if(n==this.node){
return;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(this.current){
this._removeItemClass(this.current,"Over");
this.current=null;
}
this._changeState("Container","");
this.onOutEvent();
},onSelectStart:function(e){
if(!this.skipForm||!dnd.isFormElement(e)){
_da6.stop(e);
}
},onOverEvent:function(){
},onOutEvent:function(){
},_changeState:function(type,_db4){
var _db5="dojoDnd"+type;
var _db6=type.toLowerCase()+"State";
_da8.replace(this.node,_db5+_db4,_db5+this[_db6]);
this[_db6]=_db4;
},_addItemClass:function(node,type){
_da8.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_da8.remove(node,"dojoDndItem"+type);
},_getChildByEvent:function(e){
var node=e.target;
if(node){
for(var _db7=node.parentNode;_db7;node=_db7,_db7=node.parentNode){
if((_db7==this.parent||this.allowNested)&&_da8.contains(node,"dojoDndItem")){
return node;
}
}
}
return null;
},_normalizedCreator:function(item,hint){
var t=(this.creator||this.defaultCreator).call(this,item,hint);
if(!lang.isArray(t.type)){
t.type=["text"];
}
if(!t.node.id){
t.node.id=dnd.getUniqueId();
}
_da8.add(t.node,"dojoDndItem");
return t;
}});
dnd._createNode=function(tag){
if(!tag){
return dnd._createSpan;
}
return function(text){
return _da9.create(tag,{innerHTML:text});
};
};
dnd._createTrTd=function(text){
var tr=_da9.create("tr");
_da9.create("td",{innerHTML:text},tr);
return tr;
};
dnd._createSpan=function(text){
return _da9.create("span",{innerHTML:text});
};
dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dnd._defaultCreator=function(node){
var tag=node.tagName.toLowerCase();
var c=tag=="tbody"||tag=="thead"?dnd._createTrTd:dnd._createNode(dnd._defaultCreatorNodes[tag]);
return function(item,hint){
var _db8=item&&lang.isObject(item),data,type,n;
if(_db8&&item.tagName&&item.nodeType&&item.getAttribute){
data=item.getAttribute("dndData")||item.innerHTML;
type=item.getAttribute("dndType");
type=type?type.split(/\s*,\s*/):["text"];
n=item;
}else{
data=(_db8&&item.data)?item.data:item;
type=(_db8&&item.type)?item.type:["text"];
n=(hint=="avatar"?dnd._createSpan:c)(String(data));
}
if(!n.id){
n.id=dnd.getUniqueId();
}
return {node:n,data:data,type:type};
};
};
return _dae;
});
},"dijit/form/ComboBox":function(){
define(["dojo/_base/declare","./ValidationTextBox","./ComboBoxMixin"],function(_db9,_dba,_dbb){
return _db9("dijit.form.ComboBox",[_dba,_dbb],{});
});
},"dojo/colors":function(){
define(["./_base/kernel","./_base/lang","./_base/Color","./_base/array"],function(dojo,lang,_dbc,_dbd){
var _dbe={};
lang.setObject("dojo.colors",_dbe);
var _dbf=function(m1,m2,h){
if(h<0){
++h;
}
if(h>1){
--h;
}
var h6=6*h;
if(h6<1){
return m1+(m2-m1)*h6;
}
if(2*h<1){
return m2;
}
if(3*h<2){
return m1+(m2-m1)*(2/3-h)*6;
}
return m1;
};
dojo.colorFromRgb=_dbc.fromRgb=function(_dc0,obj){
var m=_dc0.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(m){
var c=m[2].split(/\s*,\s*/),l=c.length,t=m[1],a;
if((t=="rgb"&&l==3)||(t=="rgba"&&l==4)){
var r=c[0];
if(r.charAt(r.length-1)=="%"){
a=_dbd.map(c,function(x){
return parseFloat(x)*2.56;
});
if(l==4){
a[3]=c[3];
}
return _dbc.fromArray(a,obj);
}
return _dbc.fromArray(c,obj);
}
if((t=="hsl"&&l==3)||(t=="hsla"&&l==4)){
var H=((parseFloat(c[0])%360)+360)%360/360,S=parseFloat(c[1])/100,L=parseFloat(c[2])/100,m2=L<=0.5?L*(S+1):L+S-L*S,m1=2*L-m2;
a=[_dbf(m1,m2,H+1/3)*256,_dbf(m1,m2,H)*256,_dbf(m1,m2,H-1/3)*256,1];
if(l==4){
a[3]=c[3];
}
return _dbc.fromArray(a,obj);
}
}
return null;
};
var _dc1=function(c,low,high){
c=Number(c);
return isNaN(c)?high:c<low?low:c>high?high:c;
};
_dbc.prototype.sanitize=function(){
var t=this;
t.r=Math.round(_dc1(t.r,0,255));
t.g=Math.round(_dc1(t.g,0,255));
t.b=Math.round(_dc1(t.b,0,255));
t.a=_dc1(t.a,0,1);
return this;
};
_dbe.makeGrey=_dbc.makeGrey=function(g,a){
return _dbc.fromArray([g,g,g,a]);
};
lang.mixin(_dbc.named,{"aliceblue":[240,248,255],"antiquewhite":[250,235,215],"aquamarine":[127,255,212],"azure":[240,255,255],"beige":[245,245,220],"bisque":[255,228,196],"blanchedalmond":[255,235,205],"blueviolet":[138,43,226],"brown":[165,42,42],"burlywood":[222,184,135],"cadetblue":[95,158,160],"chartreuse":[127,255,0],"chocolate":[210,105,30],"coral":[255,127,80],"cornflowerblue":[100,149,237],"cornsilk":[255,248,220],"crimson":[220,20,60],"cyan":[0,255,255],"darkblue":[0,0,139],"darkcyan":[0,139,139],"darkgoldenrod":[184,134,11],"darkgray":[169,169,169],"darkgreen":[0,100,0],"darkgrey":[169,169,169],"darkkhaki":[189,183,107],"darkmagenta":[139,0,139],"darkolivegreen":[85,107,47],"darkorange":[255,140,0],"darkorchid":[153,50,204],"darkred":[139,0,0],"darksalmon":[233,150,122],"darkseagreen":[143,188,143],"darkslateblue":[72,61,139],"darkslategray":[47,79,79],"darkslategrey":[47,79,79],"darkturquoise":[0,206,209],"darkviolet":[148,0,211],"deeppink":[255,20,147],"deepskyblue":[0,191,255],"dimgray":[105,105,105],"dimgrey":[105,105,105],"dodgerblue":[30,144,255],"firebrick":[178,34,34],"floralwhite":[255,250,240],"forestgreen":[34,139,34],"gainsboro":[220,220,220],"ghostwhite":[248,248,255],"gold":[255,215,0],"goldenrod":[218,165,32],"greenyellow":[173,255,47],"grey":[128,128,128],"honeydew":[240,255,240],"hotpink":[255,105,180],"indianred":[205,92,92],"indigo":[75,0,130],"ivory":[255,255,240],"khaki":[240,230,140],"lavender":[230,230,250],"lavenderblush":[255,240,245],"lawngreen":[124,252,0],"lemonchiffon":[255,250,205],"lightblue":[173,216,230],"lightcoral":[240,128,128],"lightcyan":[224,255,255],"lightgoldenrodyellow":[250,250,210],"lightgray":[211,211,211],"lightgreen":[144,238,144],"lightgrey":[211,211,211],"lightpink":[255,182,193],"lightsalmon":[255,160,122],"lightseagreen":[32,178,170],"lightskyblue":[135,206,250],"lightslategray":[119,136,153],"lightslategrey":[119,136,153],"lightsteelblue":[176,196,222],"lightyellow":[255,255,224],"limegreen":[50,205,50],"linen":[250,240,230],"magenta":[255,0,255],"mediumaquamarine":[102,205,170],"mediumblue":[0,0,205],"mediumorchid":[186,85,211],"mediumpurple":[147,112,219],"mediumseagreen":[60,179,113],"mediumslateblue":[123,104,238],"mediumspringgreen":[0,250,154],"mediumturquoise":[72,209,204],"mediumvioletred":[199,21,133],"midnightblue":[25,25,112],"mintcream":[245,255,250],"mistyrose":[255,228,225],"moccasin":[255,228,181],"navajowhite":[255,222,173],"oldlace":[253,245,230],"olivedrab":[107,142,35],"orange":[255,165,0],"orangered":[255,69,0],"orchid":[218,112,214],"palegoldenrod":[238,232,170],"palegreen":[152,251,152],"paleturquoise":[175,238,238],"palevioletred":[219,112,147],"papayawhip":[255,239,213],"peachpuff":[255,218,185],"peru":[205,133,63],"pink":[255,192,203],"plum":[221,160,221],"powderblue":[176,224,230],"rosybrown":[188,143,143],"royalblue":[65,105,225],"saddlebrown":[139,69,19],"salmon":[250,128,114],"sandybrown":[244,164,96],"seagreen":[46,139,87],"seashell":[255,245,238],"sienna":[160,82,45],"skyblue":[135,206,235],"slateblue":[106,90,205],"slategray":[112,128,144],"slategrey":[112,128,144],"snow":[255,250,250],"springgreen":[0,255,127],"steelblue":[70,130,180],"tan":[210,180,140],"thistle":[216,191,216],"tomato":[255,99,71],"turquoise":[64,224,208],"violet":[238,130,238],"wheat":[245,222,179],"whitesmoke":[245,245,245],"yellowgreen":[154,205,50]});
return _dbc;
});
},"dojo/cldr/supplemental":function(){
define(["../_base/lang","../i18n"],function(lang,i18n){
var _dc2={};
lang.setObject("dojo.cldr.supplemental",_dc2);
_dc2.getFirstDayOfWeek=function(_dc3){
var _dc4={bd:5,mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,iq:6,ir:6,jo:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,sy:6,ye:6,ag:0,ar:0,as:0,au:0,br:0,bs:0,bt:0,bw:0,by:0,bz:0,ca:0,cn:0,co:0,dm:0,"do":0,et:0,gt:0,gu:0,hk:0,hn:0,id:0,ie:0,il:0,"in":0,jm:0,jp:0,ke:0,kh:0,kr:0,la:0,mh:0,mm:0,mo:0,mt:0,mx:0,mz:0,ni:0,np:0,nz:0,pa:0,pe:0,ph:0,pk:0,pr:0,py:0,sg:0,sv:0,th:0,tn:0,tt:0,tw:0,um:0,us:0,ve:0,vi:0,ws:0,za:0,zw:0};
var _dc5=_dc2._region(_dc3);
var dow=_dc4[_dc5];
return (dow===undefined)?1:dow;
};
_dc2._region=function(_dc6){
_dc6=i18n.normalizeLocale(_dc6);
var tags=_dc6.split("-");
var _dc7=tags[1];
if(!_dc7){
_dc7={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",he:"il",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[tags[0]];
}else{
if(_dc7.length==4){
_dc7=tags[2];
}
}
return _dc7;
};
_dc2.getWeekend=function(_dc8){
var _dc9={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5},_dca={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6},_dcb=_dc2._region(_dc8),_dcc=_dc9[_dcb],end=_dca[_dcb];
if(_dcc===undefined){
_dcc=6;
}
if(end===undefined){
end=0;
}
return {start:_dcc,end:end};
};
return _dc2;
});
},"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\"\n/></span>\n","dojox/grid/cells/_base":function(){
define("dojox/grid/cells/_base",["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/event","dojo/_base/connect","dojo/_base/array","dojo/_base/sniff","dojo/dom","dojo/dom-attr","dojo/dom-construct","dijit/_Widget","../util"],function(dojo,_dcd,lang,_dce,_dcf,_dd0,has,dom,_dd1,_dd2,_dd3,util){
var _dd4=_dcd("dojox.grid._DeferredTextWidget",_dd3,{deferred:null,_destroyOnRemove:true,postCreate:function(){
if(this.deferred){
this.deferred.addBoth(lang.hitch(this,function(text){
if(this.domNode){
this.domNode.innerHTML=text;
}
}));
}
}});
var _dd5=function(_dd6){
try{
util.fire(_dd6,"focus");
util.fire(_dd6,"select");
}
catch(e){
}
};
var _dd7=function(){
setTimeout(lang.hitch.apply(dojo,arguments),0);
};
var _dd8=_dcd("dojox.grid.cells._Base",null,{styles:"",classes:"",editable:false,alwaysEditing:false,formatter:null,defaultValue:"...",value:null,hidden:false,noresize:false,draggable:true,_valueProp:"value",_formatPending:false,constructor:function(_dd9){
this._props=_dd9||{};
lang.mixin(this,_dd9);
if(this.draggable===undefined){
this.draggable=true;
}
},_defaultFormat:function(_dda,_ddb){
var s=this.grid.formatterScope||this;
var f=this.formatter;
if(f&&s&&typeof f=="string"){
f=this.formatter=s[f];
}
var v=(_dda!=this.defaultValue&&f)?f.apply(s,_ddb):_dda;
if(typeof v=="undefined"){
return this.defaultValue;
}
if(v&&v.addBoth){
v=new _dd4({deferred:v},_dd2.create("span",{innerHTML:this.defaultValue}));
}
if(v&&v.declaredClass&&v.startup){
return "<div class='dojoxGridStubNode' linkWidget='"+v.id+"' cellIdx='"+this.index+"'>"+this.defaultValue+"</div>";
}
return v;
},format:function(_ddc,_ddd){
var f,i=this.grid.edit.info,d=this.get?this.get(_ddc,_ddd):(this.value||this.defaultValue);
d=(d&&d.replace&&this.grid.escapeHTMLInData)?d.replace(/&/g,"&amp;").replace(/</g,"&lt;"):d;
if(this.editable&&(this.alwaysEditing||(i.rowIndex==_ddc&&i.cell==this))){
return this.formatEditing(d,_ddc);
}else{
return this._defaultFormat(d,[d,_ddc,this]);
}
},formatEditing:function(_dde,_ddf){
},getNode:function(_de0){
return this.view.getCellNode(_de0,this.index);
},getHeaderNode:function(){
return this.view.getHeaderCellNode(this.index);
},getEditNode:function(_de1){
return (this.getNode(_de1)||0).firstChild||0;
},canResize:function(){
var uw=this.unitWidth;
return uw&&(uw!=="auto");
},isFlex:function(){
var uw=this.unitWidth;
return uw&&lang.isString(uw)&&(uw=="auto"||uw.slice(-1)=="%");
},applyEdit:function(_de2,_de3){
if(this.getNode(_de3)){
this.grid.edit.applyCellEdit(_de2,this,_de3);
}
},cancelEdit:function(_de4){
this.grid.doCancelEdit(_de4);
},_onEditBlur:function(_de5){
if(this.grid.edit.isEditCell(_de5,this.index)){
this.grid.edit.apply();
}
},registerOnBlur:function(_de6,_de7){
if(this.commitOnBlur){
_dcf.connect(_de6,"onblur",function(e){
setTimeout(lang.hitch(this,"_onEditBlur",_de7),250);
});
}
},needFormatNode:function(_de8,_de9){
this._formatPending=true;
_dd7(this,"_formatNode",_de8,_de9);
},cancelFormatNode:function(){
this._formatPending=false;
},_formatNode:function(_dea,_deb){
if(this._formatPending){
this._formatPending=false;
if(!has("ie")){
dom.setSelectable(this.grid.domNode,true);
}
this.formatNode(this.getEditNode(_deb),_dea,_deb);
}
},formatNode:function(_dec,_ded,_dee){
if(has("ie")){
_dd7(this,"focus",_dee,_dec);
}else{
this.focus(_dee,_dec);
}
},dispatchEvent:function(m,e){
if(m in this){
return this[m](e);
}
},getValue:function(_def){
return this.getEditNode(_def)[this._valueProp];
},setValue:function(_df0,_df1){
var n=this.getEditNode(_df0);
if(n){
n[this._valueProp]=_df1;
}
},focus:function(_df2,_df3){
_dd5(_df3||this.getEditNode(_df2));
},save:function(_df4){
this.value=this.value||this.getValue(_df4);
},restore:function(_df5){
this.setValue(_df5,this.value);
},_finish:function(_df6){
dom.setSelectable(this.grid.domNode,false);
this.cancelFormatNode();
},apply:function(_df7){
this.applyEdit(this.getValue(_df7),_df7);
this._finish(_df7);
},cancel:function(_df8){
this.cancelEdit(_df8);
this._finish(_df8);
}});
_dd8.markupFactory=function(node,_df9){
var _dfa=lang.trim(_dd1.get(node,"formatter")||"");
if(_dfa){
_df9.formatter=lang.getObject(_dfa)||_dfa;
}
var get=lang.trim(_dd1.get(node,"get")||"");
if(get){
_df9.get=lang.getObject(get);
}
var _dfb=function(attr,cell,_dfc){
var _dfd=lang.trim(_dd1.get(node,attr)||"");
if(_dfd){
cell[_dfc||attr]=!(_dfd.toLowerCase()=="false");
}
};
_dfb("sortDesc",_df9);
_dfb("editable",_df9);
_dfb("alwaysEditing",_df9);
_dfb("noresize",_df9);
_dfb("draggable",_df9);
var _dfe=lang.trim(_dd1.get(node,"loadingText")||_dd1.get(node,"defaultValue")||"");
if(_dfe){
_df9.defaultValue=_dfe;
}
var _dff=function(attr,cell,_e00){
var _e01=lang.trim(_dd1.get(node,attr)||"")||undefined;
if(_e01){
cell[_e00||attr]=_e01;
}
};
_dff("styles",_df9);
_dff("headerStyles",_df9);
_dff("cellStyles",_df9);
_dff("classes",_df9);
_dff("headerClasses",_df9);
_dff("cellClasses",_df9);
};
var Cell=_dcd("dojox.grid.cells.Cell",_dd8,{constructor:function(){
this.keyFilter=this.keyFilter;
},keyFilter:null,formatEditing:function(_e02,_e03){
this.needFormatNode(_e02,_e03);
return "<input class=\"dojoxGridInput\" type=\"text\" value=\""+_e02+"\">";
},formatNode:function(_e04,_e05,_e06){
this.inherited(arguments);
this.registerOnBlur(_e04,_e06);
},doKey:function(e){
if(this.keyFilter){
var key=String.fromCharCode(e.charCode);
if(key.search(this.keyFilter)==-1){
_dce.stop(e);
}
}
},_finish:function(_e07){
this.inherited(arguments);
var n=this.getEditNode(_e07);
try{
util.fire(n,"blur");
}
catch(e){
}
}});
Cell.markupFactory=function(node,_e08){
_dd8.markupFactory(node,_e08);
var _e09=lang.trim(_dd1.get(node,"keyFilter")||"");
if(_e09){
_e08.keyFilter=new RegExp(_e09);
}
};
var _e0a=_dcd("dojox.grid.cells.RowIndex",Cell,{name:"Row",postscript:function(){
this.editable=false;
},get:function(_e0b){
return _e0b+1;
}});
_e0a.markupFactory=function(node,_e0c){
Cell.markupFactory(node,_e0c);
};
var _e0d=_dcd("dojox.grid.cells.Select",Cell,{options:null,values:null,returnIndex:-1,constructor:function(_e0e){
this.values=this.values||this.options;
},formatEditing:function(_e0f,_e10){
this.needFormatNode(_e0f,_e10);
var h=["<select class=\"dojoxGridSelect\">"];
for(var i=0,o,v;((o=this.options[i])!==undefined)&&((v=this.values[i])!==undefined);i++){
v=v.replace?v.replace(/&/g,"&amp;").replace(/</g,"&lt;"):v;
o=o.replace?o.replace(/&/g,"&amp;").replace(/</g,"&lt;"):o;
h.push("<option",(_e0f==v?" selected":"")," value=\""+v+"\"",">",o,"</option>");
}
h.push("</select>");
return h.join("");
},_defaultFormat:function(_e11,_e12){
var v=this.inherited(arguments);
if(!this.formatter&&this.values&&this.options){
var i=_dd0.indexOf(this.values,v);
if(i>=0){
v=this.options[i];
}
}
return v;
},getValue:function(_e13){
var n=this.getEditNode(_e13);
if(n){
var i=n.selectedIndex,o=n.options[i];
return this.returnIndex>-1?i:o.value||o.innerHTML;
}
}});
_e0d.markupFactory=function(node,cell){
Cell.markupFactory(node,cell);
var _e14=lang.trim(_dd1.get(node,"options")||"");
if(_e14){
var o=_e14.split(",");
if(o[0]!=_e14){
cell.options=o;
}
}
var _e15=lang.trim(_dd1.get(node,"values")||"");
if(_e15){
var v=_e15.split(",");
if(v[0]!=_e15){
cell.values=v;
}
}
};
var _e16=_dcd("dojox.grid.cells.AlwaysEdit",Cell,{alwaysEditing:true,_formatNode:function(_e17,_e18){
this.formatNode(this.getEditNode(_e18),_e17,_e18);
},applyStaticValue:function(_e19){
var e=this.grid.edit;
e.applyCellEdit(this.getValue(_e19),this,_e19);
e.start(this,_e19,true);
}});
_e16.markupFactory=function(node,cell){
Cell.markupFactory(node,cell);
};
var Bool=_dcd("dojox.grid.cells.Bool",_e16,{_valueProp:"checked",formatEditing:function(_e1a,_e1b){
return "<input class=\"dojoxGridInput\" type=\"checkbox\""+(_e1a?" checked=\"checked\"":"")+" style=\"width: auto\" />";
},doclick:function(e){
if(e.target.tagName=="INPUT"){
this.applyStaticValue(e.rowIndex);
}
}});
Bool.markupFactory=function(node,cell){
_e16.markupFactory(node,cell);
};
return _dd8;
});
},"dojo/number":function(){
define(["./_base/lang","./i18n","./i18n!./cldr/nls/number","./string","./regexp"],function(lang,i18n,_e1c,_e1d,_e1e){
var _e1f={};
lang.setObject("dojo.number",_e1f);
_e1f.format=function(_e20,_e21){
_e21=lang.mixin({},_e21||{});
var _e22=i18n.normalizeLocale(_e21.locale),_e23=i18n.getLocalization("dojo.cldr","number",_e22);
_e21.customs=_e23;
var _e24=_e21.pattern||_e23[(_e21.type||"decimal")+"Format"];
if(isNaN(_e20)||Math.abs(_e20)==Infinity){
return null;
}
return _e1f._applyPattern(_e20,_e24,_e21);
};
_e1f._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
_e1f._applyPattern=function(_e25,_e26,_e27){
_e27=_e27||{};
var _e28=_e27.customs.group,_e29=_e27.customs.decimal,_e2a=_e26.split(";"),_e2b=_e2a[0];
_e26=_e2a[(_e25<0)?1:0]||("-"+_e2b);
if(_e26.indexOf("%")!=-1){
_e25*=100;
}else{
if(_e26.indexOf("‰")!=-1){
_e25*=1000;
}else{
if(_e26.indexOf("¤")!=-1){
_e28=_e27.customs.currencyGroup||_e28;
_e29=_e27.customs.currencyDecimal||_e29;
_e26=_e26.replace(/\u00a4{1,3}/,function(_e2c){
var prop=["symbol","currency","displayName"][_e2c.length-1];
return _e27[prop]||_e27.currency||"";
});
}else{
if(_e26.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _e2d=_e1f._numberPatternRE;
var _e2e=_e2b.match(_e2d);
if(!_e2e){
throw new Error("unable to find a number expression in pattern: "+_e26);
}
if(_e27.fractional===false){
_e27.places=0;
}
return _e26.replace(_e2d,_e1f._formatAbsolute(_e25,_e2e[0],{decimal:_e29,group:_e28,places:_e27.places,round:_e27.round}));
};
_e1f.round=function(_e2f,_e30,_e31){
var _e32=10/(_e31||10);
return (_e32*+_e2f).toFixed(_e30)/_e32;
};
if((0.9).toFixed()==0){
var _e33=_e1f.round;
_e1f.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _e33(v,p,m)+(v>0?d:-d);
};
}
_e1f._formatAbsolute=function(_e34,_e35,_e36){
_e36=_e36||{};
if(_e36.places===true){
_e36.places=0;
}
if(_e36.places===Infinity){
_e36.places=6;
}
var _e37=_e35.split("."),_e38=typeof _e36.places=="string"&&_e36.places.indexOf(","),_e39=_e36.places;
if(_e38){
_e39=_e36.places.substring(_e38+1);
}else{
if(!(_e39>=0)){
_e39=(_e37[1]||[]).length;
}
}
if(!(_e36.round<0)){
_e34=_e1f.round(_e34,_e39,_e36.round);
}
var _e3a=String(Math.abs(_e34)).split("."),_e3b=_e3a[1]||"";
if(_e37[1]||_e36.places){
if(_e38){
_e36.places=_e36.places.substring(0,_e38);
}
var pad=_e36.places!==undefined?_e36.places:(_e37[1]&&_e37[1].lastIndexOf("0")+1);
if(pad>_e3b.length){
_e3a[1]=_e1d.pad(_e3b,pad,"0",true);
}
if(_e39<_e3b.length){
_e3a[1]=_e3b.substr(0,_e39);
}
}else{
if(_e3a[1]){
_e3a.pop();
}
}
var _e3c=_e37[0].replace(",","");
pad=_e3c.indexOf("0");
if(pad!=-1){
pad=_e3c.length-pad;
if(pad>_e3a[0].length){
_e3a[0]=_e1d.pad(_e3a[0],pad);
}
if(_e3c.indexOf("#")==-1){
_e3a[0]=_e3a[0].substr(_e3a[0].length-pad);
}
}
var _e3d=_e37[0].lastIndexOf(","),_e3e,_e3f;
if(_e3d!=-1){
_e3e=_e37[0].length-_e3d-1;
var _e40=_e37[0].substr(0,_e3d);
_e3d=_e40.lastIndexOf(",");
if(_e3d!=-1){
_e3f=_e40.length-_e3d-1;
}
}
var _e41=[];
for(var _e42=_e3a[0];_e42;){
var off=_e42.length-_e3e;
_e41.push((off>0)?_e42.substr(off):_e42);
_e42=(off>0)?_e42.slice(0,off):"";
if(_e3f){
_e3e=_e3f;
delete _e3f;
}
}
_e3a[0]=_e41.reverse().join(_e36.group||",");
return _e3a.join(_e36.decimal||".");
};
_e1f.regexp=function(_e43){
return _e1f._parseInfo(_e43).regexp;
};
_e1f._parseInfo=function(_e44){
_e44=_e44||{};
var _e45=i18n.normalizeLocale(_e44.locale),_e46=i18n.getLocalization("dojo.cldr","number",_e45),_e47=_e44.pattern||_e46[(_e44.type||"decimal")+"Format"],_e48=_e46.group,_e49=_e46.decimal,_e4a=1;
if(_e47.indexOf("%")!=-1){
_e4a/=100;
}else{
if(_e47.indexOf("‰")!=-1){
_e4a/=1000;
}else{
var _e4b=_e47.indexOf("¤")!=-1;
if(_e4b){
_e48=_e46.currencyGroup||_e48;
_e49=_e46.currencyDecimal||_e49;
}
}
}
var _e4c=_e47.split(";");
if(_e4c.length==1){
_e4c.push("-"+_e4c[0]);
}
var re=_e1e.buildGroupRE(_e4c,function(_e4d){
_e4d="(?:"+_e1e.escapeString(_e4d,".")+")";
return _e4d.replace(_e1f._numberPatternRE,function(_e4e){
var _e4f={signed:false,separator:_e44.strict?_e48:[_e48,""],fractional:_e44.fractional,decimal:_e49,exponent:false},_e50=_e4e.split("."),_e51=_e44.places;
if(_e50.length==1&&_e4a!=1){
_e50[1]="###";
}
if(_e50.length==1||_e51===0){
_e4f.fractional=false;
}else{
if(_e51===undefined){
_e51=_e44.pattern?_e50[1].lastIndexOf("0")+1:Infinity;
}
if(_e51&&_e44.fractional==undefined){
_e4f.fractional=true;
}
if(!_e44.places&&(_e51<_e50[1].length)){
_e51+=","+_e50[1].length;
}
_e4f.places=_e51;
}
var _e52=_e50[0].split(",");
if(_e52.length>1){
_e4f.groupSize=_e52.pop().length;
if(_e52.length>1){
_e4f.groupSize2=_e52.pop().length;
}
}
return "("+_e1f._realNumberRegexp(_e4f)+")";
});
},true);
if(_e4b){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_e53,_e54,_e55,_e56){
var prop=["symbol","currency","displayName"][_e55.length-1],_e57=_e1e.escapeString(_e44[prop]||_e44.currency||"");
_e54=_e54?"[\\s\\xa0]":"";
_e56=_e56?"[\\s\\xa0]":"";
if(!_e44.strict){
if(_e54){
_e54+="*";
}
if(_e56){
_e56+="*";
}
return "(?:"+_e54+_e57+_e56+")?";
}
return _e54+_e57+_e56;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_e48,decimal:_e49,factor:_e4a};
};
_e1f.parse=function(_e58,_e59){
var info=_e1f._parseInfo(_e59),_e5a=(new RegExp("^"+info.regexp+"$")).exec(_e58);
if(!_e5a){
return NaN;
}
var _e5b=_e5a[1];
if(!_e5a[1]){
if(!_e5a[2]){
return NaN;
}
_e5b=_e5a[2];
info.factor*=-1;
}
_e5b=_e5b.replace(new RegExp("["+info.group+"\\s\\xa0"+"]","g"),"").replace(info.decimal,".");
return _e5b*info.factor;
};
_e1f._realNumberRegexp=function(_e5c){
_e5c=_e5c||{};
if(!("places" in _e5c)){
_e5c.places=Infinity;
}
if(typeof _e5c.decimal!="string"){
_e5c.decimal=".";
}
if(!("fractional" in _e5c)||/^0/.test(_e5c.places)){
_e5c.fractional=[true,false];
}
if(!("exponent" in _e5c)){
_e5c.exponent=[true,false];
}
if(!("eSigned" in _e5c)){
_e5c.eSigned=[true,false];
}
var _e5d=_e1f._integerRegexp(_e5c),_e5e=_e1e.buildGroupRE(_e5c.fractional,function(q){
var re="";
if(q&&(_e5c.places!==0)){
re="\\"+_e5c.decimal;
if(_e5c.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_e5c.places+"}";
}
}
return re;
},true);
var _e5f=_e1e.buildGroupRE(_e5c.exponent,function(q){
if(q){
return "([eE]"+_e1f._integerRegexp({signed:_e5c.eSigned})+")";
}
return "";
});
var _e60=_e5d+_e5e;
if(_e5e){
_e60="(?:(?:"+_e60+")|(?:"+_e5e+"))";
}
return _e60+_e5f;
};
_e1f._integerRegexp=function(_e61){
_e61=_e61||{};
if(!("signed" in _e61)){
_e61.signed=[true,false];
}
if(!("separator" in _e61)){
_e61.separator="";
}else{
if(!("groupSize" in _e61)){
_e61.groupSize=3;
}
}
var _e62=_e1e.buildGroupRE(_e61.signed,function(q){
return q?"[-+]":"";
},true);
var _e63=_e1e.buildGroupRE(_e61.separator,function(sep){
if(!sep){
return "(?:\\d+)";
}
sep=_e1e.escapeString(sep);
if(sep==" "){
sep="\\s";
}else{
if(sep==" "){
sep="\\s\\xa0";
}
}
var grp=_e61.groupSize,grp2=_e61.groupSize2;
if(grp2){
var _e64="(?:0|[1-9]\\d{0,"+(grp2-1)+"}(?:["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-grp2)>0)?"(?:"+_e64+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_e64;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _e62+_e63;
};
return _e1f;
});
},"dijit/layout/_ContentPaneResizeMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/query","dojo/sniff","../registry","../Viewport","./utils"],function(_e65,_e66,_e67,_e68,_e69,lang,_e6a,has,_e6b,_e6c,_e6d){
return _e66("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isLayoutContainer:true,startup:function(){
if(this._started){
return;
}
var _e6e=this.getParent();
this._childOfLayoutWidget=_e6e&&_e6e.isLayoutContainer;
this._needLayout=!this._childOfLayoutWidget;
this.inherited(arguments);
if(this._isShown()){
this._onShow();
}
if(!this._childOfLayoutWidget){
this.own(_e6c.on("resize",lang.hitch(this,"resize")));
}
},_checkIfSingleChild:function(){
var _e6f=[],_e70=false;
_e6a("> *",this.containerNode).some(function(node){
var _e71=_e6b.byNode(node);
if(_e71&&_e71.resize){
_e6f.push(_e71);
}else{
if(node.offsetHeight){
_e70=true;
}
}
});
this._singleChild=_e6f.length==1&&!_e70?_e6f[0]:null;
_e67.toggle(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_e72,_e73){
this._resizeCalled=true;
this._scheduleLayout(_e72,_e73);
},_scheduleLayout:function(_e74,_e75){
if(this._isShown()){
this._layout(_e74,_e75);
}else{
this._needLayout=true;
this._changeSize=_e74;
this._resultSize=_e75;
}
},_layout:function(_e76,_e77){
delete this._needLayout;
if(!this._wasShown&&this.open!==false){
this._onShow();
}
if(_e76){
_e68.setMarginBox(this.domNode,_e76);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_e77||{};
lang.mixin(mb,_e76||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_e68.getMarginBox(cn),mb);
}
this._contentBox=_e6d.marginBox2contentBox(cn,mb);
}else{
this._contentBox=_e68.getContentBox(cn);
}
this._layoutChildren();
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||_e68.getContentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
_e65.forEach(this.getChildren(),function(_e78){
if(_e78.resize){
_e78.resize();
}
});
}
},_isShown:function(){
if(this._childOfLayoutWidget){
if(this._resizeCalled&&"open" in this){
return this.open;
}
return this._resizeCalled;
}else{
if("open" in this){
return this.open;
}else{
var node=this.domNode,_e79=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!_e67.contains(node,"dijitHidden")&&_e79&&_e79.style&&(_e79.style.display!="none");
}
}
},_onShow:function(){
this._wasShown=true;
if(this._needLayout){
this._layout(this._changeSize,this._resultSize);
}
this.inherited(arguments);
}});
});
},"dijit/form/_ButtonMixin":function(){
define(["dojo/_base/declare","dojo/dom","dojo/_base/event","../registry"],function(_e7a,dom,_e7b,_e7c){
return _e7a("dijit.form._ButtonMixin",null,{label:"",type:"button",_onClick:function(e){
if(this.disabled){
_e7b.stop(e);
return false;
}
var _e7d=this.onClick(e)===false;
if(!_e7d&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _e7e=_e7c.byNode(node);
if(_e7e&&typeof _e7e._onSubmit=="function"){
_e7e._onSubmit(e);
_e7d=true;
break;
}
}
}
if(_e7d){
e.preventDefault();
}
return !_e7d;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_e7f){
this._set("label",_e7f);
(this.containerNode||this.focusNode).innerHTML=_e7f;
}});
});
},"dijit/tree/TreeStoreModel":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/_base/lang"],function(_e80,_e81,_e82,lang){
return _e82("dijit.tree.TreeStoreModel",null,{store:null,childrenAttrs:["children"],newItemIdAttr:"id",labelAttr:"",root:null,query:null,deferItemLoadingUntilExpand:false,constructor:function(args){
lang.mixin(this,args);
this.connects=[];
var _e83=this.store;
if(!_e83.getFeatures()["dojo.data.api.Identity"]){
throw new Error("dijit.tree.TreeStoreModel: store must support dojo.data.Identity");
}
if(_e83.getFeatures()["dojo.data.api.Notification"]){
this.connects=this.connects.concat([_e81.after(_e83,"onNew",lang.hitch(this,"onNewItem"),true),_e81.after(_e83,"onDelete",lang.hitch(this,"onDeleteItem"),true),_e81.after(_e83,"onSet",lang.hitch(this,"onSetItem"),true)]);
}
},destroy:function(){
var h;
while(h=this.connects.pop()){
h.remove();
}
},getRoot:function(_e84,_e85){
if(this.root){
_e84(this.root);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_e86){
if(_e86.length!=1){
throw new Error("dijit.tree.TreeStoreModel: root query returned "+_e86.length+" items, but must return exactly one");
}
this.root=_e86[0];
_e84(this.root);
}),onError:_e85});
}
},mayHaveChildren:function(item){
return _e80.some(this.childrenAttrs,function(attr){
return this.store.hasAttribute(item,attr);
},this);
},getChildren:function(_e87,_e88,_e89){
var _e8a=this.store;
if(!_e8a.isItemLoaded(_e87)){
var _e8b=lang.hitch(this,arguments.callee);
_e8a.loadItem({item:_e87,onItem:function(_e8c){
_e8b(_e8c,_e88,_e89);
},onError:_e89});
return;
}
var _e8d=[];
for(var i=0;i<this.childrenAttrs.length;i++){
var vals=_e8a.getValues(_e87,this.childrenAttrs[i]);
_e8d=_e8d.concat(vals);
}
var _e8e=0;
if(!this.deferItemLoadingUntilExpand){
_e80.forEach(_e8d,function(item){
if(!_e8a.isItemLoaded(item)){
_e8e++;
}
});
}
if(_e8e==0){
_e88(_e8d);
}else{
_e80.forEach(_e8d,function(item,idx){
if(!_e8a.isItemLoaded(item)){
_e8a.loadItem({item:item,onItem:function(item){
_e8d[idx]=item;
if(--_e8e==0){
_e88(_e8d);
}
},onError:_e89});
}
});
}
},isItem:function(_e8f){
return this.store.isItem(_e8f);
},fetchItemByIdentity:function(_e90){
this.store.fetchItemByIdentity(_e90);
},getIdentity:function(item){
return this.store.getIdentity(item);
},getLabel:function(item){
if(this.labelAttr){
return this.store.getValue(item,this.labelAttr);
}else{
return this.store.getLabel(item);
}
},newItem:function(args,_e91,_e92){
var _e93={parent:_e91,attribute:this.childrenAttrs[0]},_e94;
if(this.newItemIdAttr&&args[this.newItemIdAttr]){
this.fetchItemByIdentity({identity:args[this.newItemIdAttr],scope:this,onItem:function(item){
if(item){
this.pasteItem(item,null,_e91,true,_e92);
}else{
_e94=this.store.newItem(args,_e93);
if(_e94&&(_e92!=undefined)){
this.pasteItem(_e94,_e91,_e91,false,_e92);
}
}
}});
}else{
_e94=this.store.newItem(args,_e93);
if(_e94&&(_e92!=undefined)){
this.pasteItem(_e94,_e91,_e91,false,_e92);
}
}
},pasteItem:function(_e95,_e96,_e97,_e98,_e99){
var _e9a=this.store,_e9b=this.childrenAttrs[0];
if(_e96){
_e80.forEach(this.childrenAttrs,function(attr){
if(_e9a.containsValue(_e96,attr,_e95)){
if(!_e98){
var _e9c=_e80.filter(_e9a.getValues(_e96,attr),function(x){
return x!=_e95;
});
_e9a.setValues(_e96,attr,_e9c);
}
_e9b=attr;
}
});
}
if(_e97){
if(typeof _e99=="number"){
var _e9d=_e9a.getValues(_e97,_e9b).slice();
_e9d.splice(_e99,0,_e95);
_e9a.setValues(_e97,_e9b,_e9d);
}else{
_e9a.setValues(_e97,_e9b,_e9a.getValues(_e97,_e9b).concat(_e95));
}
}
},onChange:function(){
},onChildrenChange:function(){
},onDelete:function(){
},onNewItem:function(item,_e9e){
if(!_e9e){
return;
}
this.getChildren(_e9e.item,lang.hitch(this,function(_e9f){
this.onChildrenChange(_e9e.item,_e9f);
}));
},onDeleteItem:function(item){
this.onDelete(item);
},onSetItem:function(item,_ea0){
if(_e80.indexOf(this.childrenAttrs,_ea0)!=-1){
this.getChildren(item,lang.hitch(this,function(_ea1){
this.onChildrenChange(item,_ea1);
}));
}else{
this.onChange(item);
}
}});
});
},"dojo/dnd/TimedMoveable":function(){
define(["../_base/declare","./Moveable"],function(_ea2,_ea3){
var _ea4=_ea3.prototype.onMove;
return _ea2("dojo.dnd.TimedMoveable",_ea3,{timeout:40,constructor:function(node,_ea5){
if(!_ea5){
_ea5={};
}
if(_ea5.timeout&&typeof _ea5.timeout=="number"&&_ea5.timeout>=0){
this.timeout=_ea5.timeout;
}
},onMoveStop:function(_ea6){
if(_ea6._timer){
clearTimeout(_ea6._timer);
_ea4.call(this,_ea6,_ea6._leftTop);
}
_ea3.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_ea7,_ea8){
_ea7._leftTop=_ea8;
if(!_ea7._timer){
var _ea9=this;
_ea7._timer=setTimeout(function(){
_ea7._timer=null;
_ea4.call(_ea9,_ea7,_ea7._leftTop);
},this.timeout);
}
}});
});
},"davinci/commands/CommandStack":function(){
define(["dojo/_base/declare"],function(_eaa){
return _eaa("davinci.commands.CommandStack",null,{constructor:function(_eab){
this._context=_eab;
this._undoStack=[];
this._redoStack=[];
},execute:function(_eac){
if(!_eac){
return;
}
if(this._context&&this._context.declaredClass!="davinci.ve.themeEditor.Context"){
dojo.withDoc(this._context.getDocument(),"execute",_eac,[this._context]);
}else{
_eac.execute();
}
this._undoStack.push(_eac);
this._redoStack=[];
this.onExecute(_eac,"execute");
},undo:function(){
if(!this.canUndo()){
return;
}
var _ead=this._undoStack.pop();
if(_ead._runDelegate){
_ead._runDelegate.undoDelegate(_ead);
}else{
if(this._context&&this._context.declaredClass!="davinci.ve.themeEditor.Context"){
dojo.withDoc(this._context.getDocument(),"undo",_ead);
}else{
_ead.undo();
}
}
this._redoStack.push(_ead);
this.onExecute(_ead,"undo");
},redo:function(){
if(!this.canRedo()){
return;
}
var _eae=this._redoStack.pop();
if(_eae._runDelegate){
_eae._runDelegate.redoDelegate(_eae);
}else{
if(this._context&&this._context.declaredClass!="davinci.ve.themeEditor.Context"){
dojo.withDoc(this._context.getDocument(),"execute",_eae);
}else{
_eae.execute();
}
}
this._undoStack.push(_eae);
this.onExecute(_eae,"redo");
},canUndo:function(){
return this._undoStack.length>0;
},canRedo:function(){
return this._redoStack.length>0;
},getUndoCount:function(){
return this._undoStack.length;
},getRedoCount:function(){
return this._redoStack.length;
},clear:function(){
this._undoStack=[];
this._redoStack=[];
},jump:function(_eaf,_eb0){
var _eb1=this.getUndoCount();
var _eb2=this.getRedoCount();
if(_eaf==_eb1){
return _eaf;
}
if(_eaf<0||_eaf>_eb1+_eb2){
return -1;
}
var n=_eaf-_eb1;
if(_eb0){
if(n<0){
while(n<0){
this._redoStack.push(this._undoStack.pop());
n++;
}
}else{
while(n>0){
this._undoStack.push(this._redoStack.pop());
n--;
}
}
}else{
if(n<0){
while(n<0){
this.undo();
n++;
}
}else{
while(n>0){
this.redo();
n--;
}
}
}
return _eaf;
},onExecute:function(_eb3,_eb4){
},undoDelegate:function(_eb5){
},redoDelegate:function(_eb6){
}});
});
},"davinci/ve/utils/StyleArray":function(){
define([],function(){
return {mergeStyleArrays:function(set1,set2){
if(!set1){
set1=[];
}
if(!set2){
set2=[];
}
var _eb7=dojo.clone(set1);
for(var i=0;i<set2.length;i++){
for(var _eb8 in set2[i]){
for(j=_eb7.length-1;j>=0;j--){
var _eb9=_eb7[j];
for(var _eba in _eb9){
if(_eb8==_eba){
_eb7.splice(j,1);
break;
}
}
}
}
}
var _ebb=_eb7.concat(set2);
return _ebb;
}};
});
},"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n","url:davinci/ui/templates/newtheme.html":"<div>\r\n\t<div class=\"dijitDialogPaneContentArea\">\r\n\t\t<table>\r\n\t\t<tr>\r\n\t\t<td>${themeToClone}:</td><td> <div dojoType=\"davinci.ui.widgets.ThemeSelection\" workspaceOnly=\"false\" dojoAttachPoint = '_themeSelection'></div></td><td><div dojoAttachPoint='_error1'></div></td>\r\n\t\t</tr>\r\n\t\t<tr><td colspan='3'><hr></hr></td></tr>\r\n\t\t<!-- \r\n\t\t<tr>\r\n\t\t<td>New Name:</td><td><input style='width:100%' type='select' dojoAttachPoint=\"_themeName\"></input></td><td><div dojoAttachPoint='_error2'></div></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t<td>Version:</td><td><input style='width:100%' type='text' dojoAttachPoint=\"_version\"></input></td><td><div dojoAttachPoint='_error3'></div></td>\r\n\t\t</tr>\r\n\t\t -->\r\n\t\t<tr>\r\n\t\t<td>${newName}:</td><td><input class='templateInput' type='text' \r\n\t\t\tdojoAttachPoint=\"_selector\"\r\n\t\t\tdojoType=\"dijit.form.ValidationTextBox\"\r\n\t\t\trequired=\"true\" \r\n\t\t\tinvalidMessage='${invalidThemeName}'></input></td><td><div dojoAttachPoint='_error4'></div></td>\r\n\t\t</tr>\r\n\t\t</table>\r\n\t</div>\r\n\t<div class=\"dijitDialogPaneActionBar\">\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"_okButton\" dojoAttachEvent='onClick:okButton' label='${create}' class=\"maqPrimaryButton\" type=\"submit\" disabled></button>\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:cancelButton' label='${buttonCancel}' class=\"maqSecondaryButton\"></button>\r\n\t</div>\t\t\r\n</div>","dojox/grid/Selection":function(){
define("dojox/grid/Selection",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/dom-attr"],function(_ebc,_ebd,lang,_ebe){
return _ebc("dojox.grid.Selection",null,{constructor:function(_ebf){
this.grid=_ebf;
this.selected=[];
this.setMode(_ebf.selectionMode);
},mode:"extended",selected:null,updating:0,selectedIndex:-1,setMode:function(mode){
if(this.selected.length){
this.deselectAll();
}
if(mode!="extended"&&mode!="multiple"&&mode!="single"&&mode!="none"){
this.mode="extended";
}else{
this.mode=mode;
}
},onCanSelect:function(_ec0){
return this.grid.onCanSelect(_ec0);
},onCanDeselect:function(_ec1){
return this.grid.onCanDeselect(_ec1);
},onSelected:function(_ec2){
},onDeselected:function(_ec3){
},onChanging:function(){
},onChanged:function(){
},isSelected:function(_ec4){
if(this.mode=="none"){
return false;
}
return this.selected[_ec4];
},getFirstSelected:function(){
if(!this.selected.length||this.mode=="none"){
return -1;
}
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
return i;
}
}
return -1;
},getNextSelected:function(_ec5){
if(this.mode=="none"){
return -1;
}
for(var i=_ec5+1,l=this.selected.length;i<l;i++){
if(this.selected[i]){
return i;
}
}
return -1;
},getSelected:function(){
var _ec6=[];
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
_ec6.push(i);
}
}
return _ec6;
},getSelectedCount:function(){
var c=0;
for(var i=0;i<this.selected.length;i++){
if(this.selected[i]){
c++;
}
}
return c;
},_beginUpdate:function(){
if(this.updating===0){
this.onChanging();
}
this.updating++;
},_endUpdate:function(){
this.updating--;
if(this.updating===0){
this.onChanged();
}
},select:function(_ec7){
if(this.mode=="none"){
return;
}
if(this.mode!="multiple"){
this.deselectAll(_ec7);
this.addToSelection(_ec7);
}else{
this.toggleSelect(_ec7);
}
},addToSelection:function(_ec8){
if(this.mode=="none"){
return;
}
if(lang.isArray(_ec8)){
_ebd.forEach(_ec8,this.addToSelection,this);
return;
}
_ec8=Number(_ec8);
if(this.selected[_ec8]){
this.selectedIndex=_ec8;
}else{
if(this.onCanSelect(_ec8)!==false){
this.selectedIndex=_ec8;
var _ec9=this.grid.getRowNode(_ec8);
if(_ec9){
_ebe.set(_ec9,"aria-selected","true");
}
this._beginUpdate();
this.selected[_ec8]=true;
this.onSelected(_ec8);
this._endUpdate();
}
}
},deselect:function(_eca){
if(this.mode=="none"){
return;
}
if(lang.isArray(_eca)){
_ebd.forEach(_eca,this.deselect,this);
return;
}
_eca=Number(_eca);
if(this.selectedIndex==_eca){
this.selectedIndex=-1;
}
if(this.selected[_eca]){
if(this.onCanDeselect(_eca)===false){
return;
}
var _ecb=this.grid.getRowNode(_eca);
if(_ecb){
_ebe.set(_ecb,"aria-selected","false");
}
this._beginUpdate();
delete this.selected[_eca];
this.onDeselected(_eca);
this._endUpdate();
}
},setSelected:function(_ecc,_ecd){
this[(_ecd?"addToSelection":"deselect")](_ecc);
},toggleSelect:function(_ece){
if(lang.isArray(_ece)){
_ebd.forEach(_ece,this.toggleSelect,this);
return;
}
this.setSelected(_ece,!this.selected[_ece]);
},_range:function(_ecf,inTo,func){
var s=(_ecf>=0?_ecf:inTo),e=inTo;
if(s>e){
e=s;
s=inTo;
}
for(var i=s;i<=e;i++){
func(i);
}
},selectRange:function(_ed0,inTo){
this._range(_ed0,inTo,lang.hitch(this,"addToSelection"));
},deselectRange:function(_ed1,inTo){
this._range(_ed1,inTo,lang.hitch(this,"deselect"));
},insert:function(_ed2){
this.selected.splice(_ed2,0,false);
if(this.selectedIndex>=_ed2){
this.selectedIndex++;
}
},remove:function(_ed3){
this.selected.splice(_ed3,1);
if(this.selectedIndex>=_ed3){
this.selectedIndex--;
}
},deselectAll:function(_ed4){
for(var i in this.selected){
if((i!=_ed4)&&(this.selected[i]===true)){
this.deselect(i);
}
}
},clickSelect:function(_ed5,_ed6,_ed7){
if(this.mode=="none"){
return;
}
this._beginUpdate();
if(this.mode!="extended"){
this.select(_ed5);
}else{
var _ed8=this.selectedIndex;
if(!_ed6){
this.deselectAll(_ed5);
}
if(_ed7){
this.selectRange(_ed8,_ed5);
}else{
if(_ed6){
this.toggleSelect(_ed5);
}else{
this.addToSelection(_ed5);
}
}
}
this._endUpdate();
},clickSelectEvent:function(e){
this.clickSelect(e.rowIndex,dojo.isCopyKey(e),e.shiftKey);
},clear:function(){
this._beginUpdate();
this.deselectAll();
this._endUpdate();
}});
});
},"davinci/ve/HTMLWidget":function(){
define(["dojo/_base/declare","./_Widget"],function(_ed9,_eda){
return _ed9("davinci.ve.HTMLWidget",_eda,{isHtmlWidget:true,constructor:function(_edb,node){
this.type="html."+node.tagName.toLowerCase();
this.acceptsHTMLChildren=true;
},buildRendering:function(){
this.containerNode=this.domNode;
if(this._params){
for(var name in this._params){
this.domNode.setAttribute(name,this._params[name]);
}
this._params=undefined;
}
try{
dojo.addClass(this.domNode,"HtmlWidget");
}
catch(e){
}
},_getChildrenData:function(_edc){
function _edd(node){
var d=node.nodeValue.trim();
if(d){
d=davinci.html.escapeXml(d);
}
return d;
};
var _ede=this.domNode;
if(!_ede.hasChildNodes()){
return null;
}
if(_ede.childNodes.length===1&&_ede.firstChild.nodeType===3){
return _edd(_ede.firstChild);
}
var data=[];
dojo.forEach(_ede.childNodes,function(node){
var d;
switch(node.nodeType){
case 1:
var w=require("davinci/ve/widget").byNode(node);
if(w){
d=w.getData(_edc);
}
break;
case 3:
d=_edd(node);
break;
case 8:
d="<!--"+node.nodeValue+"-->";
break;
}
if(d){
data.push(d);
}
});
return data;
},setProperties:function(_edf,_ee0){
var node=this.domNode;
_ee0=_ee0||false;
for(var name in _edf){
if(name==="style"){
dojo.style(node,_edf[name]);
}else{
if(!_ee0){
var _ee1=_edf[name];
if(_ee1||typeof _ee1=="boolean"||typeof _ee1=="number"){
node.setAttribute(name,_ee1);
}else{
node.removeAttribute(name);
}
}
}
}
this.inherited(arguments);
},resize:function(){
this.getChildren().forEach(function(_ee2){
if(_ee2.resize){
_ee2.resize();
}
});
},_attr:function(name,_ee3){
if(arguments.length>1){
this.domNode[name]=_ee3;
}else{
return this.domNode[name];
}
},getTagName:function(){
return this.domNode.nodeName.toLowerCase();
}});
});
},"dojo/data/ItemFileWriteStore":function(){
define(["../_base/lang","../_base/declare","../_base/array","../_base/json","../_base/kernel","./ItemFileReadStore","../date/stamp"],function(lang,_ee4,_ee5,_ee6,_ee7,_ee8,_ee9){
return _ee4("dojo.data.ItemFileWriteStore",_ee8,{constructor:function(_eea){
this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap["Date"].serialize){
this._datatypeMap["Date"].serialize=function(obj){
return _ee9.toISOString(obj,{zulu:true});
};
}
if(_eea&&(_eea.referenceIntegrity===false)){
this.referenceIntegrity=false;
}
this._saveInProgress=false;
},referenceIntegrity:true,_assert:function(_eeb){
if(!_eeb){
throw new Error("assertion failed in ItemFileWriteStore");
}
},_getIdentifierAttribute:function(){
return this.getFeatures()["dojo.data.api.Identity"];
},newItem:function(_eec,_eed){
this._assert(!this._saveInProgress);
if(!this._loadFinished){
this._forceLoad();
}
if(typeof _eec!="object"&&typeof _eec!="undefined"){
throw new Error("newItem() was passed something other than an object");
}
var _eee=null;
var _eef=this._getIdentifierAttribute();
if(_eef===Number){
_eee=this._arrayOfAllItems.length;
}else{
_eee=_eec[_eef];
if(typeof _eee==="undefined"){
throw new Error("newItem() was not passed an identity for the new item");
}
if(lang.isArray(_eee)){
throw new Error("newItem() was not passed an single-valued identity");
}
}
if(this._itemsByIdentity){
this._assert(typeof this._itemsByIdentity[_eee]==="undefined");
}
this._assert(typeof this._pending._newItems[_eee]==="undefined");
this._assert(typeof this._pending._deletedItems[_eee]==="undefined");
var _ef0={};
_ef0[this._storeRefPropName]=this;
_ef0[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){
this._itemsByIdentity[_eee]=_ef0;
_ef0[_eef]=[_eee];
}
this._arrayOfAllItems.push(_ef0);
var _ef1=null;
if(_eed&&_eed.parent&&_eed.attribute){
_ef1={item:_eed.parent,attribute:_eed.attribute,oldValue:undefined};
var _ef2=this.getValues(_eed.parent,_eed.attribute);
if(_ef2&&_ef2.length>0){
var _ef3=_ef2.slice(0,_ef2.length);
if(_ef2.length===1){
_ef1.oldValue=_ef2[0];
}else{
_ef1.oldValue=_ef2.slice(0,_ef2.length);
}
_ef3.push(_ef0);
this._setValueOrValues(_eed.parent,_eed.attribute,_ef3,false);
_ef1.newValue=this.getValues(_eed.parent,_eed.attribute);
}else{
this._setValueOrValues(_eed.parent,_eed.attribute,_ef0,false);
_ef1.newValue=_ef0;
}
}else{
_ef0[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(_ef0);
}
this._pending._newItems[_eee]=_ef0;
for(var key in _eec){
if(key===this._storeRefPropName||key===this._itemNumPropName){
throw new Error("encountered bug in ItemFileWriteStore.newItem");
}
var _ef4=_eec[key];
if(!lang.isArray(_ef4)){
_ef4=[_ef4];
}
_ef0[key]=_ef4;
if(this.referenceIntegrity){
for(var i=0;i<_ef4.length;i++){
var val=_ef4[i];
if(this.isItem(val)){
this._addReferenceToMap(val,_ef0,key);
}
}
}
}
this.onNew(_ef0,_ef1);
return _ef0;
},_removeArrayElement:function(_ef5,_ef6){
var _ef7=_ee5.indexOf(_ef5,_ef6);
if(_ef7!=-1){
_ef5.splice(_ef7,1);
return true;
}
return false;
},deleteItem:function(item){
this._assert(!this._saveInProgress);
this._assertIsItem(item);
var _ef8=item[this._itemNumPropName];
var _ef9=this.getIdentity(item);
if(this.referenceIntegrity){
var _efa=this.getAttributes(item);
if(item[this._reverseRefMap]){
item["backup_"+this._reverseRefMap]=lang.clone(item[this._reverseRefMap]);
}
_ee5.forEach(_efa,function(_efb){
_ee5.forEach(this.getValues(item,_efb),function(_efc){
if(this.isItem(_efc)){
if(!item["backupRefs_"+this._reverseRefMap]){
item["backupRefs_"+this._reverseRefMap]=[];
}
item["backupRefs_"+this._reverseRefMap].push({id:this.getIdentity(_efc),attr:_efb});
this._removeReferenceFromMap(_efc,item,_efb);
}
},this);
},this);
var _efd=item[this._reverseRefMap];
if(_efd){
for(var _efe in _efd){
var _eff=null;
if(this._itemsByIdentity){
_eff=this._itemsByIdentity[_efe];
}else{
_eff=this._arrayOfAllItems[_efe];
}
if(_eff){
for(var _f00 in _efd[_efe]){
var _f01=this.getValues(_eff,_f00)||[];
var _f02=_ee5.filter(_f01,function(_f03){
return !(this.isItem(_f03)&&this.getIdentity(_f03)==_ef9);
},this);
this._removeReferenceFromMap(item,_eff,_f00);
if(_f02.length<_f01.length){
this._setValueOrValues(_eff,_f00,_f02,true);
}
}
}
}
}
}
this._arrayOfAllItems[_ef8]=null;
item[this._storeRefPropName]=null;
if(this._itemsByIdentity){
delete this._itemsByIdentity[_ef9];
}
this._pending._deletedItems[_ef9]=item;
if(item[this._rootItemPropName]){
this._removeArrayElement(this._arrayOfTopLevelItems,item);
}
this.onDelete(item);
return true;
},setValue:function(item,_f04,_f05){
return this._setValueOrValues(item,_f04,_f05,true);
},setValues:function(item,_f06,_f07){
return this._setValueOrValues(item,_f06,_f07,true);
},unsetAttribute:function(item,_f08){
return this._setValueOrValues(item,_f08,[],true);
},_setValueOrValues:function(item,_f09,_f0a,_f0b){
this._assert(!this._saveInProgress);
this._assertIsItem(item);
this._assert(lang.isString(_f09));
this._assert(typeof _f0a!=="undefined");
var _f0c=this._getIdentifierAttribute();
if(_f09==_f0c){
throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.");
}
var _f0d=this._getValueOrValues(item,_f09);
var _f0e=this.getIdentity(item);
if(!this._pending._modifiedItems[_f0e]){
var _f0f={};
for(var key in item){
if((key===this._storeRefPropName)||(key===this._itemNumPropName)||(key===this._rootItemPropName)){
_f0f[key]=item[key];
}else{
if(key===this._reverseRefMap){
_f0f[key]=lang.clone(item[key]);
}else{
_f0f[key]=item[key].slice(0,item[key].length);
}
}
}
this._pending._modifiedItems[_f0e]=_f0f;
}
var _f10=false;
if(lang.isArray(_f0a)&&_f0a.length===0){
_f10=delete item[_f09];
_f0a=undefined;
if(this.referenceIntegrity&&_f0d){
var _f11=_f0d;
if(!lang.isArray(_f11)){
_f11=[_f11];
}
for(var i=0;i<_f11.length;i++){
var _f12=_f11[i];
if(this.isItem(_f12)){
this._removeReferenceFromMap(_f12,item,_f09);
}
}
}
}else{
var _f13;
if(lang.isArray(_f0a)){
_f13=_f0a.slice(0,_f0a.length);
}else{
_f13=[_f0a];
}
if(this.referenceIntegrity){
if(_f0d){
var _f11=_f0d;
if(!lang.isArray(_f11)){
_f11=[_f11];
}
var map={};
_ee5.forEach(_f11,function(_f14){
if(this.isItem(_f14)){
var id=this.getIdentity(_f14);
map[id.toString()]=true;
}
},this);
_ee5.forEach(_f13,function(_f15){
if(this.isItem(_f15)){
var id=this.getIdentity(_f15);
if(map[id.toString()]){
delete map[id.toString()];
}else{
this._addReferenceToMap(_f15,item,_f09);
}
}
},this);
for(var rId in map){
var _f16;
if(this._itemsByIdentity){
_f16=this._itemsByIdentity[rId];
}else{
_f16=this._arrayOfAllItems[rId];
}
this._removeReferenceFromMap(_f16,item,_f09);
}
}else{
for(var i=0;i<_f13.length;i++){
var _f12=_f13[i];
if(this.isItem(_f12)){
this._addReferenceToMap(_f12,item,_f09);
}
}
}
}
item[_f09]=_f13;
_f10=true;
}
if(_f0b){
this.onSet(item,_f09,_f0d,_f0a);
}
return _f10;
},_addReferenceToMap:function(_f17,_f18,_f19){
var _f1a=this.getIdentity(_f18);
var _f1b=_f17[this._reverseRefMap];
if(!_f1b){
_f1b=_f17[this._reverseRefMap]={};
}
var _f1c=_f1b[_f1a];
if(!_f1c){
_f1c=_f1b[_f1a]={};
}
_f1c[_f19]=true;
},_removeReferenceFromMap:function(_f1d,_f1e,_f1f){
var _f20=this.getIdentity(_f1e);
var _f21=_f1d[this._reverseRefMap];
var _f22;
if(_f21){
for(_f22 in _f21){
if(_f22==_f20){
delete _f21[_f22][_f1f];
if(this._isEmpty(_f21[_f22])){
delete _f21[_f22];
}
}
}
if(this._isEmpty(_f21)){
delete _f1d[this._reverseRefMap];
}
}
},_dumpReferenceMap:function(){
var i;
for(i=0;i<this._arrayOfAllItems.length;i++){
var item=this._arrayOfAllItems[i];
if(item&&item[this._reverseRefMap]){
}
}
},_getValueOrValues:function(item,_f23){
var _f24=undefined;
if(this.hasAttribute(item,_f23)){
var _f25=this.getValues(item,_f23);
if(_f25.length==1){
_f24=_f25[0];
}else{
_f24=_f25;
}
}
return _f24;
},_flatten:function(_f26){
if(this.isItem(_f26)){
return {_reference:this.getIdentity(_f26)};
}else{
if(typeof _f26==="object"){
for(var type in this._datatypeMap){
var _f27=this._datatypeMap[type];
if(lang.isObject(_f27)&&!lang.isFunction(_f27)){
if(_f26 instanceof _f27.type){
if(!_f27.serialize){
throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]");
}
return {_type:type,_value:_f27.serialize(_f26)};
}
}else{
if(_f26 instanceof _f27){
return {_type:type,_value:_f26.toString()};
}
}
}
}
return _f26;
}
},_getNewFileContentString:function(){
var _f28={};
var _f29=this._getIdentifierAttribute();
if(_f29!==Number){
_f28.identifier=_f29;
}
if(this._labelAttr){
_f28.label=this._labelAttr;
}
_f28.items=[];
for(var i=0;i<this._arrayOfAllItems.length;++i){
var item=this._arrayOfAllItems[i];
if(item!==null){
var _f2a={};
for(var key in item){
if(key!==this._storeRefPropName&&key!==this._itemNumPropName&&key!==this._reverseRefMap&&key!==this._rootItemPropName){
var _f2b=this.getValues(item,key);
if(_f2b.length==1){
_f2a[key]=this._flatten(_f2b[0]);
}else{
var _f2c=[];
for(var j=0;j<_f2b.length;++j){
_f2c.push(this._flatten(_f2b[j]));
_f2a[key]=_f2c;
}
}
}
}
_f28.items.push(_f2a);
}
}
var _f2d=true;
return _ee6.toJson(_f28,_f2d);
},_isEmpty:function(_f2e){
var _f2f=true;
if(lang.isObject(_f2e)){
var i;
for(i in _f2e){
_f2f=false;
break;
}
}else{
if(lang.isArray(_f2e)){
if(_f2e.length>0){
_f2f=false;
}
}
}
return _f2f;
},save:function(_f30){
this._assert(!this._saveInProgress);
this._saveInProgress=true;
var self=this;
var _f31=function(){
self._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
self._saveInProgress=false;
if(_f30&&_f30.onComplete){
var _f32=_f30.scope||_ee7.global;
_f30.onComplete.call(_f32);
}
};
var _f33=function(err){
self._saveInProgress=false;
if(_f30&&_f30.onError){
var _f34=_f30.scope||_ee7.global;
_f30.onError.call(_f34,err);
}
};
if(this._saveEverything){
var _f35=this._getNewFileContentString();
this._saveEverything(_f31,_f33,_f35);
}
if(this._saveCustom){
this._saveCustom(_f31,_f33);
}
if(!this._saveEverything&&!this._saveCustom){
_f31();
}
},revert:function(){
this._assert(!this._saveInProgress);
var _f36;
for(_f36 in this._pending._modifiedItems){
var _f37=this._pending._modifiedItems[_f36];
var _f38=null;
if(this._itemsByIdentity){
_f38=this._itemsByIdentity[_f36];
}else{
_f38=this._arrayOfAllItems[_f36];
}
_f37[this._storeRefPropName]=this;
for(var key in _f38){
delete _f38[key];
}
lang.mixin(_f38,_f37);
}
var _f39;
for(_f36 in this._pending._deletedItems){
_f39=this._pending._deletedItems[_f36];
_f39[this._storeRefPropName]=this;
var _f3a=_f39[this._itemNumPropName];
if(_f39["backup_"+this._reverseRefMap]){
_f39[this._reverseRefMap]=_f39["backup_"+this._reverseRefMap];
delete _f39["backup_"+this._reverseRefMap];
}
this._arrayOfAllItems[_f3a]=_f39;
if(this._itemsByIdentity){
this._itemsByIdentity[_f36]=_f39;
}
if(_f39[this._rootItemPropName]){
this._arrayOfTopLevelItems.push(_f39);
}
}
for(_f36 in this._pending._deletedItems){
_f39=this._pending._deletedItems[_f36];
if(_f39["backupRefs_"+this._reverseRefMap]){
_ee5.forEach(_f39["backupRefs_"+this._reverseRefMap],function(_f3b){
var _f3c;
if(this._itemsByIdentity){
_f3c=this._itemsByIdentity[_f3b.id];
}else{
_f3c=this._arrayOfAllItems[_f3b.id];
}
this._addReferenceToMap(_f3c,_f39,_f3b.attr);
},this);
delete _f39["backupRefs_"+this._reverseRefMap];
}
}
for(_f36 in this._pending._newItems){
var _f3d=this._pending._newItems[_f36];
_f3d[this._storeRefPropName]=null;
this._arrayOfAllItems[_f3d[this._itemNumPropName]]=null;
if(_f3d[this._rootItemPropName]){
this._removeArrayElement(this._arrayOfTopLevelItems,_f3d);
}
if(this._itemsByIdentity){
delete this._itemsByIdentity[_f36];
}
}
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true;
},isDirty:function(item){
if(item){
var _f3e=this.getIdentity(item);
return new Boolean(this._pending._newItems[_f3e]||this._pending._modifiedItems[_f3e]||this._pending._deletedItems[_f3e]).valueOf();
}else{
return !this._isEmpty(this._pending._newItems)||!this._isEmpty(this._pending._modifiedItems)||!this._isEmpty(this._pending._deletedItems);
}
},onSet:function(item,_f3f,_f40,_f41){
},onNew:function(_f42,_f43){
},onDelete:function(_f44){
},close:function(_f45){
if(this.clearOnClose){
if(!this.isDirty()){
this.inherited(arguments);
}else{
throw new Error("dojo.data.ItemFileWriteStore: There are unsaved changes present in the store.  Please save or revert the changes before invoking close.");
}
}
}});
});
},"dijit/layout/TabContainer":function(){
define(["dojo/_base/lang","dojo/_base/declare","./_TabContainerBase","./TabController","./ScrollingTabController"],function(lang,_f46,_f47,_f48,_f49){
return _f46("dijit.layout.TabContainer",_f47,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_f4a){
var cls=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_f48=typeof this.controllerWidget=="string"?lang.getObject(this.controllerWidget):this.controllerWidget;
return new _f48({id:this.id+"_tablist",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":cls,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_f4a);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?_f49:_f48;
}
}});
});
},"davinci/html/HTMLElement":function(){
define(["dojo/_base/declare","davinci/html/HTMLItem","davinci/html/HTMLText","davinci/html/HTMLComment","davinci/html/HTMLAttribute"],function(_f4b,_f4c,_f4d,_f4e,_f4f){
return _f4b("davinci.html.HTMLElement",_f4c,{constructor:function(tag){
this.elementType="HTMLElement";
this.attributes=[];
this.tag=tag||"";
this._fmChildLine=0;
this._fmChildIndent=0;
},add:function(stmt){
if(!this.statements){
this.statements=[];
}
this.statements.push(stmt);
this.onChange();
},getText:function(_f50){
_f50=_f50||{};
var s="";
var _f51;
_f50.indent+=2;
s=s+"<"+this.tag;
for(var i=0;i<this.attributes.length;i++){
var _f52=this.attributes[i].getText(_f50);
if(_f52.length>0){
s=s+" "+_f52;
}
}
if(this.noEndTag){
s=s+"/>";
}else{
s=s+">";
s=s+this._addWS(this._fmChildLine,this._fmChildIndent);
if(this.statements){
for(var i=0;i<this.statements.length;i++){
s=s+this.statements[i].printStatement(_f50,this.statements[i]);
}
}else{
if(this.script){
s=s+this.script;
}else{
if(this.children.length>0){
var _f53=this.tag=="style";
for(var i=0;i<this.children.length;i++){
s=s+this.children[i].getText(_f50);
if(_f53){
var _f54=this._fmChildLine,_f55=this._fmChildIndent||0;
if(i+1==this.children.length){
_f54=this._fmLine;
_f55=this._fmIndent;
}
s=s+this._addWS(_f54,_f55);
}
}
}
}
}
if(_f51&&this.children.length>0){
s=s+"\n"+"                                          ".substring(0,_f50.indent+1);
}
s=s+"</"+this.tag+">";
}
_f50.indent-=2;
s=s+this._addWS(this._fmLine,this._fmIndent);
return s;
},_formatModel:function(_f56,_f57,_f58){
var _f59=0;
var _f5a=1;
if(_f57==undefined){
_f57=this.children.length;
}
function _f5b(_f5c,_f5d,elem){
_f59+=(_f5a+_f5c);
if(_f5d){
_f5d._fmChildLine=1;
_f5d._fmChildIndent=_f58.indent;
}else{
elem._fmLine=1;
elem._fmIndent=_f58.indent;
}
};
function _f5e(elem,_f5f){
elem.startOffset=_f59;
elem.wasParsed=true;
_f59+=elem.tag.length+2;
for(var i=0;i<elem.attributes.length;i++){
elem.attributes[i].startOffset=_f59;
var _f60=elem.attributes[i].getText(_f5f);
if(_f60.length>0){
_f59+=1+_f60.length;
}
elem.attributes[i].endOffset=_f59-1;
}
if(elem.noEndTag){
_f59++;
}
elem.startTagOffset=_f59;
var s="";
if(elem.statements){
for(var i=0;i<elem.statements.length;i++){
s=s+elem.statements[i].printStatement(_f5f,elem.statements[i]);
}
}else{
if(elem.script){
s=elem.script;
}
}
if(s){
_f59+=s.length;
}else{
if(elem.children.length>0){
var _f61;
if(!davinci.html._noFormatElements[elem.tag]){
_f5f.indent+=2;
_f5b(_f5f.indent,elem);
_f61=true;
}
var _f62;
for(var i=0;i<elem.children.length;i++){
var _f63=elem.children[i];
switch(_f63.elementType){
case "HTMLElement":
if(_f62&&_f62.elementType!="HTMLText"&&!davinci.html._noFormatElements[_f63.tag]){
_f5b(_f5f.indent,null,_f62);
}
_f5e(_f63,_f5f);
break;
case "HTMLText":
_f63.startOffset=_f59;
_f59+=_f63.value.length;
break;
case "HTMLComment":
_f63.startOffset=_f59;
_f59+=_f63.value.length;
_f59++;
if(_f63.isProcessingInstruction){
_f59+=2;
}
break;
default:
debugger;
}
_f62=_f63;
}
if(_f61){
_f5f.indent-=2;
}
if(_f62&&_f62.elementType!="HTMLText"){
_f5b(_f5f.indent,null,_f62);
}
}
}
_f59+=elem.tag.length+3;
elem.endOffset=_f59-1;
};
var _f64,_f65;
if(!this.children.length||_f57==0){
_f64=this;
_f59=this.startTagOffset+1;
}else{
_f65=this.children[_f57-1];
_f59=_f65.endOffset+1;
}
var _f66=_f59;
if(!davinci.html._noFormatElements[_f56.tag]){
_f5b(_f58.indent,_f64,_f65);
_f56._fmLine=1;
_f56._fmIndent=(_f57<this.children.length)?_f58.indent:_f58.indent-2;
}
_f5e(_f56,_f58);
return (_f59>_f66)?_f59-_f66:0;
},getElementText:function(_f67){
_f67=_f67||{};
var s="";
if(this.children.length>0){
for(var i=0;i<this.children.length;i++){
if(this.children[i].elementType!="HTMLComment"){
s=s+this.children[i].getText(_f67);
}
}
}else{
if(this.script){
return this.script;
}else{
if(this.statements){
for(var i=0;i<this.statements.length;i++){
s=s+this.statements[i].printStatement(_f67,this.statements[i]);
}
}
}
}
return s;
},getChildElements:function(_f68,_f69,_f6a){
_f6a=_f6a||[];
for(var i=0;i<this.children.length;i++){
if(this.children[i].tag==_f68){
_f6a.push(this.children[i]);
}
if(_f69&&this.children[i].elementType=="HTMLElement"){
this.children[i].getChildElements(_f68,_f69,_f6a);
}
}
return _f6a;
},getChildElement:function(_f6b){
for(var i=0;i<this.children.length;i++){
if(this.children[i].tag==_f6b){
return this.children[i];
}
}
},hasAttribute:function(name){
for(var i=0;i<this.attributes.length;i++){
if(this.attributes[i].name==name){
return true;
}
}
return false;
},getAttribute:function(name){
var attr=this._getAttribute(name);
if(attr){
return attr.value;
}
},_getAttribute:function(name){
for(var i=0;i<this.attributes.length;i++){
if(this.attributes[i].name==name){
return this.attributes[i];
}
}
},addText:function(text){
this.addChild(new _f4d(text));
this.onChange();
},addComment:function(text){
this.addChild(new _f4e(text));
this.onChange();
},getLabel:function(){
return "<"+this.tag+">";
},addAttribute:function(name,_f6c,_f6d){
if(name=="textContent"){
this.children=[];
this.addText(_f6c);
return;
}
var _f6e;
var _f6f=(this.attributes.length>0)?this.attributes[this.attributes.length-1].endOffset+1:this.startTagOffset-(this.noEndTag?2:1);
var attr=this._getAttribute(name);
var add;
if(!attr){
attr=new _f4f();
add=true;
_f6e=name.length+_f6c.length+4;
attr.startOffset=_f6f;
attr.endOffset=_f6f+_f6e-1;
}else{
_f6e=_f6c.length-attr.value.length;
}
attr.name=name;
attr.setValue(_f6c);
attr.noPersist=_f6d;
if(this.wasParsed&&!_f6d&&_f6e>0){
this.getHTMLFile().updatePositions(_f6f,_f6e);
}
if(add){
this.attributes.push(attr);
}
this.onChange();
},removeAttribute:function(name){
this.attributes.every(function(attr,idx,arr){
if(attr.name===name){
arr.splice(idx,1);
var file=this.getHTMLFile();
if(!attr.noPersist&&file){
var s=attr.getText();
file.updatePositions(attr.startOffest,0-(s.length+1));
}
return false;
}
return true;
},this);
this.onChange();
},setAttribute:function(name,_f70){
this.removeAttribute(name);
this.addAttribute(name,_f70);
},getUniqueID:function(_f71){
var attr=this.getAttribute("id");
if(!attr){
var file=this.getHTMLFile();
if(!file.uniqueIDs){
file.uniqueIDs={};
}
var id;
if(!file.uniqueIDs.hasOwnProperty(this.tag)){
id=file.uniqueIDs[this.tag]=0;
}else{
id=++file.uniqueIDs[this.tag];
}
this.addAttribute("id",this.tag+"_"+id,_f71);
}
},findElement:function(id){
var attr=this.getAttribute("id");
if(id==attr){
return this;
}
for(var i=0;i<this.children.length;i++){
if(this.children[i].elementType=="HTMLElement"){
var _f72=this.children[i].findElement(id);
if(_f72){
return _f72;
}
}
}
},insertBefore:function(_f73,_f74){
var _f75=dojo.indexOf(this.children,_f74);
if(_f75<0){
_f75=undefined;
}
this.addChild(_f73,_f75);
this.onChange();
},addChild:function(_f76,_f77,_f78){
if(!_f78&&this.wasParsed){
if(_f76.elementType=="HTMLElement"){
var _f79=this._getIndent();
var _f7a;
if(_f77<this.children.length&&this.children[_f77].elementType=="HTMLElement"){
_f7a=this.children[_f77]._getIndent();
}else{
if(this.children.length){
dojo.forEach(this.children,function(_f7b){
if(_f7b.elementType=="HTMLElement"){
_f7a=_f7b._getIndent();
}
});
}else{
_f7a=_f79+1;
}
}
var _f7c=_f7a;
var _f7d={indent:_f7c};
var _f7e=this._formatModel(_f76,_f77,_f7d);
this.getHTMLFile().updatePositions(_f76.startOffset,_f7e);
}else{
if(_f76.elementType=="HTMLText"||_f76.elementType.substring(0,3)=="CSS"){
var s=_f76.getText();
var _f7f=this.children.length?this.children[this.children.length-1].endOffset:this.startTagOffset;
var len=s.length;
if(len>0){
if(_f76.elementType!="HTMLText"){
len+=this._fmChildIndent+1;
}
this.getHTMLFile().updatePositions(_f7f+1,len);
}
_f76.startOffset=_f7f+1;
_f76.endOffset=_f76.startOffset+s.length-1;
}
}
}
_f4c.prototype.addChild.apply(this,arguments);
},removeChild:function(_f80){
var _f81=dojo.indexOf(this.children,_f80);
var _f82=1;
if(_f81>=0){
var _f83=1+_f80.endOffset-_f80.startOffset;
if(_f80.elementType=="HTMLElement"){
if(this.children.length==1){
_f83+=this._fmChildLine*_f82+this._fmChildIndent;
this._fmChildIndent-=2;
}else{
if(_f81>0&&this.children[_f81-1].elementType=="HTMLElement"){
var _f84=this.children[_f81-1];
_f83+=_f84._fmLine*_f82+_f84._fmIndent;
}
if(_f81+1==this.children.length&&this.children[_f81-1].elementType=="HTMLElement"){
this.children[_f81-1]._fmChildIndent-=2;
}
}
}
if(_f83>0&&this.wasParsed){
this.getHTMLFile().updatePositions(_f80.startOffset,0-_f83);
}
}
_f4c.prototype.removeChild.apply(this,arguments);
},_textModify:function(_f85,_f86){
var _f87=_f85.length-_f86.length;
if(_f87!=0&&this.wasParsed){
this.getHTMLFile().updatePositions(this.startOffset,_f87);
}
},setScript:function(_f88){
this._textModify(_f88,this.script);
this.script=_f88;
},_previous:function(){
var inx=dojo.indexOf(this.parent.children,this);
if(inx>0){
return this.parent.children[inx-1];
}
},_getIndent:function(){
var prev=this._previous();
if(prev){
if(prev.elementType==" HTMLText"){
var txt=prev.value.split("\n");
return txt[txt.length-1].length;
}else{
return prev._fmIndent;
}
}else{
return this.parent._fmChildIndent;
}
},visit:function(_f89){
if(!_f89.visit(this)){
for(var i=0;i<this.attributes.length;i++){
this.attributes[i].visit(_f89);
}
for(var i=0;i<this.children.length;i++){
this.children[i].visit(_f89);
}
}
if(_f89.endVisit){
_f89.endVisit(this);
}
},setText:function(text){
this.script="";
var _f8a={xmode:"outer"};
var _f8b=this.parent;
var _f8c=require("davinci/html/HTMLParser").parse(text,this);
this.errors=_f8c.errors;
dojo.mixin(this,this.children[0]);
this.parent=_f8b;
this.visit({visit:function(node){
delete node.wasParsed;
},rules:[]});
this.onChange();
}});
});
},"dojox/data/QueryReadStore":function(){
define("dojox/data/QueryReadStore",["dojo","dojox","dojo/data/util/sorter","dojo/string"],function(dojo,_f8d){
dojo.declare("dojox.data.QueryReadStore",null,{url:"",requestMethod:"get",_className:"dojox.data.QueryReadStore",_items:[],_lastServerQuery:null,_numRows:-1,lastRequestHash:null,doClientPaging:false,doClientSorting:false,_itemsByIdentity:null,_identifier:null,_features:{"dojo.data.api.Read":true,"dojo.data.api.Identity":true},_labelAttr:"label",constructor:function(_f8e){
dojo.mixin(this,_f8e);
},getValue:function(item,_f8f,_f90){
this._assertIsItem(item);
if(!dojo.isString(_f8f)){
throw new Error(this._className+".getValue(): Invalid attribute, string expected!");
}
if(!this.hasAttribute(item,_f8f)){
if(_f90){
return _f90;
}
}
return item.i[_f8f];
},getValues:function(item,_f91){
this._assertIsItem(item);
var ret=[];
if(this.hasAttribute(item,_f91)){
ret.push(item.i[_f91]);
}
return ret;
},getAttributes:function(item){
this._assertIsItem(item);
var ret=[];
for(var i in item.i){
ret.push(i);
}
return ret;
},hasAttribute:function(item,_f92){
return this.isItem(item)&&typeof item.i[_f92]!="undefined";
},containsValue:function(item,_f93,_f94){
var _f95=this.getValues(item,_f93);
var len=_f95.length;
for(var i=0;i<len;i++){
if(_f95[i]==_f94){
return true;
}
}
return false;
},isItem:function(_f96){
if(_f96){
return typeof _f96.r!="undefined"&&_f96.r==this;
}
return false;
},isItemLoaded:function(_f97){
return this.isItem(_f97);
},loadItem:function(args){
if(this.isItemLoaded(args.item)){
return;
}
},fetch:function(_f98){
_f98=_f98||{};
if(!_f98.store){
_f98.store=this;
}
var self=this;
var _f99=function(_f9a,_f9b){
if(_f9b.onError){
var _f9c=_f9b.scope||dojo.global;
_f9b.onError.call(_f9c,_f9a,_f9b);
}
};
var _f9d=function(_f9e,_f9f,_fa0){
var _fa1=_f9f.abort||null;
var _fa2=false;
var _fa3=_f9f.start?_f9f.start:0;
if(self.doClientPaging==false){
_fa3=0;
}
var _fa4=_f9f.count?(_fa3+_f9f.count):_f9e.length;
_f9f.abort=function(){
_fa2=true;
if(_fa1){
_fa1.call(_f9f);
}
};
var _fa5=_f9f.scope||dojo.global;
if(!_f9f.store){
_f9f.store=self;
}
if(_f9f.onBegin){
_f9f.onBegin.call(_fa5,_fa0,_f9f);
}
if(_f9f.sort&&self.doClientSorting){
_f9e.sort(dojo.data.util.sorter.createSortFunction(_f9f.sort,self));
}
if(_f9f.onItem){
for(var i=_fa3;(i<_f9e.length)&&(i<_fa4);++i){
var item=_f9e[i];
if(!_fa2){
_f9f.onItem.call(_fa5,item,_f9f);
}
}
}
if(_f9f.onComplete&&!_fa2){
var _fa6=null;
if(!_f9f.onItem){
_fa6=_f9e.slice(_fa3,_fa4);
}
_f9f.onComplete.call(_fa5,_fa6,_f9f);
}
};
this._fetchItems(_f98,_f9d,_f99);
return _f98;
},getFeatures:function(){
return this._features;
},close:function(_fa7){
},getLabel:function(item){
if(this._labelAttr&&this.isItem(item)){
return this.getValue(item,this._labelAttr);
}
return undefined;
},getLabelAttributes:function(item){
if(this._labelAttr){
return [this._labelAttr];
}
return null;
},_xhrFetchHandler:function(data,_fa8,_fa9,_faa){
data=this._filterResponse(data);
if(data.label){
this._labelAttr=data.label;
}
var _fab=data.numRows||-1;
this._items=[];
dojo.forEach(data.items,function(e){
this._items.push({i:e,r:this});
},this);
var _fac=data.identifier;
this._itemsByIdentity={};
if(_fac){
this._identifier=_fac;
var i;
for(i=0;i<this._items.length;++i){
var item=this._items[i].i;
var _fad=item[_fac];
if(!this._itemsByIdentity[_fad]){
this._itemsByIdentity[_fad]=item;
}else{
throw new Error(this._className+":  The json data as specified by: ["+this.url+"] is malformed.  Items within the list have identifier: ["+_fac+"].  Value collided: ["+_fad+"]");
}
}
}else{
this._identifier=Number;
for(i=0;i<this._items.length;++i){
this._items[i].n=i;
}
}
_fab=this._numRows=(_fab===-1)?this._items.length:_fab;
_fa9(this._items,_fa8,_fab);
this._numRows=_fab;
},_fetchItems:function(_fae,_faf,_fb0){
var _fb1=_fae.serverQuery||_fae.query||{};
if(!this.doClientPaging){
_fb1.start=_fae.start||0;
if(_fae.count){
_fb1.count=_fae.count;
}
}
if(!this.doClientSorting&&_fae.sort){
var _fb2=[];
dojo.forEach(_fae.sort,function(sort){
if(sort&&sort.attribute){
_fb2.push((sort.descending?"-":"")+sort.attribute);
}
});
_fb1.sort=_fb2.join(",");
}
if(this.doClientPaging&&this._lastServerQuery!==null&&dojo.toJson(_fb1)==dojo.toJson(this._lastServerQuery)){
this._numRows=(this._numRows===-1)?this._items.length:this._numRows;
_faf(this._items,_fae,this._numRows);
}else{
var _fb3=this.requestMethod.toLowerCase()=="post"?dojo.xhrPost:dojo.xhrGet;
var _fb4=_fb3({url:this.url,handleAs:"json-comment-optional",content:_fb1,failOk:true});
_fae.abort=function(){
_fb4.cancel();
};
_fb4.addCallback(dojo.hitch(this,function(data){
this._xhrFetchHandler(data,_fae,_faf,_fb0);
}));
_fb4.addErrback(function(_fb5){
_fb0(_fb5,_fae);
});
this.lastRequestHash=new Date().getTime()+"-"+String(Math.random()).substring(2);
this._lastServerQuery=dojo.mixin({},_fb1);
}
},_filterResponse:function(data){
return data;
},_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error(this._className+": Invalid item argument.");
}
},_assertIsAttribute:function(_fb6){
if(typeof _fb6!=="string"){
throw new Error(this._className+": Invalid attribute argument ('"+_fb6+"').");
}
},fetchItemByIdentity:function(_fb7){
if(this._itemsByIdentity){
var item=this._itemsByIdentity[_fb7.identity];
if(!(item===undefined)){
if(_fb7.onItem){
var _fb8=_fb7.scope?_fb7.scope:dojo.global;
_fb7.onItem.call(_fb8,{i:item,r:this});
}
return;
}
}
var _fb9=function(_fba,_fbb){
var _fbc=_fb7.scope?_fb7.scope:dojo.global;
if(_fb7.onError){
_fb7.onError.call(_fbc,_fba);
}
};
var _fbd=function(_fbe,_fbf){
var _fc0=_fb7.scope?_fb7.scope:dojo.global;
try{
var item=null;
if(_fbe&&_fbe.length==1){
item=_fbe[0];
}
if(_fb7.onItem){
_fb7.onItem.call(_fc0,item);
}
}
catch(error){
if(_fb7.onError){
_fb7.onError.call(_fc0,error);
}
}
};
var _fc1={serverQuery:{id:_fb7.identity}};
this._fetchItems(_fc1,_fbd,_fb9);
},getIdentity:function(item){
var _fc2=null;
if(this._identifier===Number){
_fc2=item.n;
}else{
_fc2=item.i[this._identifier];
}
return _fc2;
},getIdentityAttributes:function(item){
return [this._identifier];
}});
return _f8d.data.QueryReadStore;
});
},"davinci/ui/widgets/ThemeSelection":function(){
define(["dojo/_base/declare","dijit/_Widget","davinci/library","davinci/Runtime","davinci/Workbench","system/resource","dojo/i18n!davinci/ui/nls/ui","dojo/i18n!dijit/nls/common"],function(_fc3,_fc4,_fc5,_fc6,_fc7,_fc8,_fc9,_fca){
return _fc3("davinci.ui.widgets.ThemeSelection",[_fc4],{workspaceOnly:true,message:"Theme version does not match workspace version this could produce unexpected results. We suggest recreating the custom theme using the current version of Maqetta and deleting the existing theme.",buildRendering:function(){
var div=dojo.doc.createElement("div");
this._select=dojo.doc.createElement("select");
div.appendChild(this._select);
this._warnDiv=dojo.doc.createElement("div");
div.appendChild(this._warnDiv);
this.domNode=div;
dojo.style(this._select,"width","180px");
dojo.style(this.domNode,"width","100%");
dojo.connect(this._select,"onchange",this,"_onChange");
},postCreate:function(){
this._themeData=_fc5.getThemes(_fc7.getProject(),this.workspaceOnly);
this._themeCount=this._themeData.length;
for(var i=0;i<this._themeData.length;i++){
var op=dojo.doc.createElement("option");
op.value=this._themeData[i].name;
op.text=this._themeData[i].name;
this._select.appendChild(op);
}
if(this._selection){
this._selectValue(this._selection);
}
},_setBaseAttr:function(base){
this._base=base;
},_getBaseAttr:function(){
return this._base;
},_getNumberOfThemesAttr:function(){
return this._themeCount;
},_setValueAttr:function(_fcb){
if(!this._hasValue(_fcb)){
return;
}
this._selection=_fcb;
if(_fcb&&_fcb.name){
this._selection=_fcb.name;
}
this._selectValue(this._selection);
},_hasValue:function(_fcc){
for(var i=0;i<this._select.children.length;i++){
if(this._select.children[i].value==_fcc){
return true;
}
}
return false;
},_selectValue:function(_fcd){
var _fce=false;
for(var i=0;i<this._select.children.length;i++){
if(this._select.children[i].selected){
this._select.children[i].selected=false;
}
if(!_fce&&this._select.children[i].value==_fcd){
this._select.children[i].selected=true;
var _fce=true;
}
}
if(!_fce&&_fcd!=null){
var op=dojo.doc.createElement("option");
op.value=_fcd;
op.text=_fcd;
op.selected=true;
this._select.appendChild(op);
}
},_getValueAttr:function(){
var name=dojo.attr(this._select,"value");
for(var i=0;i<this._themeData.length;i++){
if(this._themeData[i]["name"]==name){
return this._themeData[i];
}
}
return null;
},_setWorkspaceOnlyAttr:function(_fcf){
this.workspaceOnly=_fcf;
},onChange:function(){
},_onChange:function(){
var _fd0=this._getValueAttr();
if(_fd0==null||this._blockChange){
return;
}
this.value=_fd0;
this._cookieName="maqetta_"+_fd0.name+"_"+_fd0.version;
var _fd1=dojo.cookie(this._cookieName);
if(this.dojoVersion&&_fd0.version!==this.dojoVersion&&!_fd1){
this._warnDiv.innerHTML="<table>"+"<tr><td></td><td>"+this.message+"</td><td></td></tr>"+"<tr><td></td><td align=\"center\"><button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"davinci.ui.widgets.ThemeSelection.ok\">Ok</button><button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"davinci.ui.widgets.ThemeSelection.cancel\">Cancel</button></td><td></td></tr>"+"</table>";
var ok=dijit.byId("davinci.ui.widgets.ThemeSelection.ok");
var _fd2=dijit.byId("davinci.ui.widgets.ThemeSelection.cancel");
dojo.connect(ok,"onClick",this,"_warnOk");
dojo.connect(_fd2,"onClick",this,"_warnCancel");
}else{
this.onChange();
}
},_getThemeDataAttr:function(){
return this._themeData;
},_warnOk:function(){
dojo.cookie(this._cookieName,"true");
this._destroy();
this.onChange();
},_warnCancel:function(){
this._destroy();
this.onClose();
},_destroy:function(){
var ok=dijit.byId("davinci.ui.widgets.ThemeSelection.ok");
dojo.disconnect(ok);
ok.destroy();
var _fd3=dijit.byId("davinci.ui.widgets.ThemeSelection.cancel");
dojo.disconnect(_fd3);
_fd3.destroy();
}});
});
},"dijit/tree/_dndContainer":function(){
define(["dojo/aspect","dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/_base/lang","dojo/on","dojo/touch"],function(_fd4,_fd5,_fd6,_fd7,lang,on,_fd8){
return _fd5("dijit.tree._dndContainer",null,{constructor:function(tree,_fd9){
this.tree=tree;
this.node=tree.domNode;
lang.mixin(this,_fd9);
this.current=null;
this.containerState="";
_fd6.add(this.node,"dojoDndContainer");
this.events=[on(this.node,_fd8.enter,lang.hitch(this,"onOverEvent")),on(this.node,_fd8.leave,lang.hitch(this,"onOutEvent")),_fd4.after(this.tree,"_onNodeMouseEnter",lang.hitch(this,"onMouseOver"),true),_fd4.after(this.tree,"_onNodeMouseLeave",lang.hitch(this,"onMouseOut"),true),on(this.node,"dragstart",lang.hitch(_fd7,"stop")),on(this.node,"selectstart",lang.hitch(_fd7,"stop"))];
},destroy:function(){
var h;
while(h=this.events.pop()){
h.remove();
}
this.node=this.parent=null;
},onMouseOver:function(_fda){
this.current=_fda;
},onMouseOut:function(){
this.current=null;
},_changeState:function(type,_fdb){
var _fdc="dojoDnd"+type;
var _fdd=type.toLowerCase()+"State";
_fd6.replace(this.node,_fdc+_fdb,_fdc+this[_fdd]);
this[_fdd]=_fdb;
},_addItemClass:function(node,type){
_fd6.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_fd6.remove(node,"dojoDndItem"+type);
},onOverEvent:function(){
this._changeState("Container","Over");
},onOutEvent:function(){
this._changeState("Container","");
}});
});
},"davinci/js/JSFile":function(){
define(["dojo/_base/declare","davinci/js/JSElement"],function(_fde,_fdf){
return _fde("davinci.js.JSFile",_fdf,{constructor:function(_fe0){
this.elementType="JSFile";
this.nosemicolon=true;
this._textContent="";
if(_fe0){
this.origin=_fe0;
}
},getText:function(_fe1){
return this._textContent;
},setText:function(text){
this._textContent=text;
},getLabel:function(){
return this.fileName;
},getID:function(){
return this.fileName;
},visit:function(_fe2){
var _fe3;
_fe3=_fe2.visit(this);
if(!_fe3){
for(var i=0;i<this.children.length;i++){
this.children[i].visit(_fe2);
}
}
if(_fe2.endVisit){
_fe2.endVisit(this);
}
}});
});
},"url:davinci/de/widgets/templates/NewDijit.html":"<div>\n\t<div class=\"dijitDialogPaneContentArea\">\n\t\t<table>\n\t\t<tr>\n\t\t<td class=\"NewProjectDialogLabel\">Widget Group:</td><td><input class='templateInput' type='text' dojoAttachPoint=\"_widgetGroup\" vaule='MyWidgets'></input></td><td><div dojoAttachPoint='_error3'></div></td>\n\t\t\n\t\t</tr>\n\t\t\n\t\t<tr>\n\t\t<td class=\"NewProjectDialogLabel\">Widget Name:</td><td><input class='templateInput' type='text' dojoAttachPoint=\"_dijitName\"></input></td><td><div dojoAttachPoint='_error4'></div></td>\n\t\t</tr>\n\t\t<tr style='display:none;'>\n\t\t<td class=\"NewProjectDialogLabel\">Replace Selection with new Widget</td><td><input class='templateInput' type='checkbox' dojoAttachPoint=\"_replaceSelection\"></input></td><td><div dojoAttachPoint='_error5'></div></td>\n\t\t</tr>\n\t\t</table>\n\t</div>\n\n\t<div class=\"dijitDialogPaneActionBar\">\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"_okButton\" dojoAttachEvent='onClick:okButton' label='OK' type=\"submit\" class=\"maqPrimaryButton\" disabled></button> \n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:cancelButton' label='Cancel' class=\"maqSecondaryButton\"></button>\n\t</div>\t\t\n</div>","dojo/i18n":function(){
define(["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json","module"],function(dojo,_fe4,has,_fe5,_fe6,lang,xhr,json,_fe7){
has.add("dojo-preload-i18n-Api",1);
1||has.add("dojo-v1x-i18n-Api",1);
var _fe8=dojo.i18n={},_fe9=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_fea=function(root,_feb,_fec,_fed){
for(var _fee=[_fec+_fed],_fef=_feb.split("-"),_ff0="",i=0;i<_fef.length;i++){
_ff0+=(_ff0?"-":"")+_fef[i];
if(!root||root[_ff0]){
_fee.push(_fec+_ff0+"/"+_fed);
}
}
return _fee;
},_ff1={},_ff2=function(_ff3,_ff4,_ff5){
_ff5=_ff5?_ff5.toLowerCase():dojo.locale;
_ff3=_ff3.replace(/\./g,"/");
_ff4=_ff4.replace(/\./g,"/");
return (/root/i.test(_ff5))?(_ff3+"/nls/"+_ff4):(_ff3+"/nls/"+_ff5+"/"+_ff4);
},_ff6=dojo.getL10nName=function(_ff7,_ff8,_ff9){
return _ff7=_fe7.id+"!"+_ff2(_ff7,_ff8,_ff9);
},_ffa=function(_ffb,_ffc,_ffd,_ffe,_fff,load){
_ffb([_ffc],function(root){
var _1000=lang.clone(root.root),_1001=_fea(!root._v1x&&root,_fff,_ffd,_ffe);
_ffb(_1001,function(){
for(var i=1;i<_1001.length;i++){
_1000=lang.mixin(lang.clone(_1000),arguments[i]);
}
var _1002=_ffc+"/"+_fff;
_ff1[_1002]=_1000;
load();
});
});
},_1003=function(id,_1004){
return /^\./.test(id)?_1004(id):id;
},_1005=function(_1006){
var list=_fe6.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(_1006);
return list;
},load=function(id,_1007,load){
if(has("dojo-preload-i18n-Api")){
var split=id.split("*"),_1008=split[1]=="preload";
if(_1008){
if(!_ff1[id]){
_ff1[id]=1;
_1009(split[2],json.parse(split[3]),1,_1007);
}
load(1);
}
if(_1008||_100a(id,_1007,load)){
return;
}
}
var match=_fe9.exec(id),_100b=match[1]+"/",_100c=match[5]||match[4],_100d=_100b+_100c,_100e=(match[5]&&match[4]),_100f=_100e||dojo.locale,_1010=_100d+"/"+_100f,_1011=_100e?[_100f]:_1005(_100f),_1012=_1011.length,_1013=function(){
if(!--_1012){
load(lang.delegate(_ff1[_1010]));
}
};
_fe5.forEach(_1011,function(_1014){
var _1015=_100d+"/"+_1014;
if(has("dojo-preload-i18n-Api")){
_1016(_1015);
}
if(!_ff1[_1015]){
_ffa(_1007,_100d,_100b,_100c,_1014,_1013);
}else{
_1013();
}
});
};
if(has("dojo-unit-tests")){
var _1017=_fe8.unitTests=[];
}
if(has("dojo-preload-i18n-Api")||1){
var _1018=_fe8.normalizeLocale=function(_1019){
var _101a=_1019?_1019.toLowerCase():dojo.locale;
return _101a=="root"?"ROOT":_101a;
},isXd=function(mid,_101b){
return (1&&1)?_101b.isXdUrl(_fe4.toUrl(mid+".js")):true;
},_101c=0,_101d=[],_1009=_fe8._preloadLocalizations=function(_101e,_101f,_1020,_1021){
_1021=_1021||_fe4;
function _1022(mid,_1023){
if(isXd(mid,_1021)||_1020){
_1021([mid],_1023);
}else{
_102c([mid],_1023,_1021);
}
};
function _1024(_1025,func){
var parts=_1025.split("-");
while(parts.length){
if(func(parts.join("-"))){
return;
}
parts.pop();
}
func("ROOT");
};
function _1026(_1027){
_1027=_1018(_1027);
_1024(_1027,function(loc){
if(_fe5.indexOf(_101f,loc)>=0){
var mid=_101e.replace(/\./g,"/")+"_"+loc;
_101c++;
_1022(mid,function(_1028){
for(var p in _1028){
_ff1[_fe4.toAbsMid(p)+"/"+loc]=_1028[p];
}
--_101c;
while(!_101c&&_101d.length){
load.apply(null,_101d.shift());
}
});
return true;
}
return false;
});
};
_1026();
_fe5.forEach(dojo.config.extraLocale,_1026);
},_100a=function(id,_1029,load){
if(_101c){
_101d.push([id,_1029,load]);
}
return _101c;
},_1016=function(){
};
}
if(1){
var _102a={},_102b=new Function("__bundle","__checkForLegacyModules","__mid","__amdValue","var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"+"\t   require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return __amdValue;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_102c=function(deps,_102d,_102e){
var _102f=[];
_fe5.forEach(deps,function(mid){
var url=_102e.toUrl(mid+".js");
function load(text){
var _1030=_102b(text,_1016,mid,_102a);
if(_1030===_102a){
_102f.push(_ff1[url]=_102a.result);
}else{
if(_1030 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_1030);
_1030={};
}
_102f.push(_ff1[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_1030:{root:_1030,_v1x:1}));
}
};
if(_ff1[url]){
_102f.push(_ff1[url]);
}else{
var _1031=_102e.syncLoadNls(mid);
if(_1031){
_102f.push(_1031);
}else{
if(!xhr){
try{
_102e.getText(url,true,load);
}
catch(e){
_102f.push(_ff1[url]={});
}
}else{
xhr.get({url:url,sync:true,load:load,error:function(){
_102f.push(_ff1[url]={});
}});
}
}
}
});
_102d&&_102d.apply(null,_102f);
};
_1016=function(_1032){
for(var _1033,names=_1032.split("/"),_1034=dojo.global[names[0]],i=1;_1034&&i<names.length-1;_1034=_1034[names[i++]]){
}
if(_1034){
_1033=_1034[names[i]];
if(!_1033){
_1033=_1034[names[i].replace(/-/g,"_")];
}
if(_1033){
_ff1[_1032]=_1033;
}
}
return _1033;
};
_fe8.getLocalization=function(_1035,_1036,_1037){
var _1038,_1039=_ff2(_1035,_1036,_1037);
load(_1039,(!isXd(_1039,_fe4)?function(deps,_103a){
_102c(deps,_103a,_fe4);
}:_fe4),function(_103b){
_1038=_103b;
});
return _1038;
};
if(has("dojo-unit-tests")){
_1017.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var check;
check=_102b("{prop:1}",_1016,"nonsense",_102a);
t.is({prop:1},check);
t.is(undefined,check[1]);
check=_102b("({prop:1})",_1016,"nonsense",_102a);
t.is({prop:1},check);
t.is(undefined,check[1]);
check=_102b("{'prop-x':1}",_1016,"nonsense",_102a);
t.is({"prop-x":1},check);
t.is(undefined,check[1]);
check=_102b("({'prop-x':1})",_1016,"nonsense",_102a);
t.is({"prop-x":1},check);
t.is(undefined,check[1]);
check=_102b("define({'prop-x':1})",_1016,"nonsense",_102a);
t.is(_102a,check);
t.is({"prop-x":1},_102a.result);
check=_102b("define('some/module', {'prop-x':1})",_1016,"nonsense",_102a);
t.is(_102a,check);
t.is({"prop-x":1},_102a.result);
check=_102b("this is total nonsense and should throw an error",_1016,"nonsense",_102a);
t.is(check instanceof Error,true);
});
});
}
}
return lang.mixin(_fe8,{dynamic:true,normalize:_1003,load:load,cache:_ff1});
});
},"dojo/data/util/simpleFetch":function(){
define(["../../_base/lang","../../_base/kernel","./sorter"],function(lang,_103c,_103d){
var _103e={};
lang.setObject("dojo.data.util.simpleFetch",_103e);
_103e.errorHandler=function(_103f,_1040){
if(_1040.onError){
var scope=_1040.scope||_103c.global;
_1040.onError.call(scope,_103f,_1040);
}
};
_103e.fetchHandler=function(items,_1041){
var _1042=_1041.abort||null,_1043=false,_1044=_1041.start?_1041.start:0,_1045=(_1041.count&&(_1041.count!==Infinity))?(_1044+_1041.count):items.length;
_1041.abort=function(){
_1043=true;
if(_1042){
_1042.call(_1041);
}
};
var scope=_1041.scope||_103c.global;
if(!_1041.store){
_1041.store=this;
}
if(_1041.onBegin){
_1041.onBegin.call(scope,items.length,_1041);
}
if(_1041.sort){
items.sort(_103d.createSortFunction(_1041.sort,this));
}
if(_1041.onItem){
for(var i=_1044;(i<items.length)&&(i<_1045);++i){
var item=items[i];
if(!_1043){
_1041.onItem.call(scope,item,_1041);
}
}
}
if(_1041.onComplete&&!_1043){
var _1046=null;
if(!_1041.onItem){
_1046=items.slice(_1044,_1045);
}
_1041.onComplete.call(scope,_1046,_1041);
}
};
_103e.fetch=function(_1047){
_1047=_1047||{};
if(!_1047.store){
_1047.store=this;
}
this._fetchItems(_1047,lang.hitch(this,"fetchHandler"),lang.hitch(this,"errorHandler"));
return _1047;
};
return _103e;
});
},"dojo/dnd/Source":function(){
define(["../_base/array","../_base/connect","../_base/declare","../_base/kernel","../_base/lang","../dom-class","../dom-geometry","../mouse","../ready","../topic","./common","./Selector","./Manager"],function(array,_1048,_1049,_104a,lang,_104b,_104c,mouse,ready,topic,dnd,_104d,_104e){
if(!_104a.isAsync){
ready(0,function(){
var _104f=["dojo/dnd/AutoSource","dojo/dnd/Target"];
require(_104f);
});
}
var _1050=_1049("dojo.dnd.Source",_104d,{isSource:true,horizontal:false,copyOnly:false,selfCopy:false,selfAccept:true,skipForm:false,withHandles:false,autoSync:false,delay:0,accept:["text"],generateText:true,constructor:function(node,_1051){
lang.mixin(this,lang.mixin({},_1051));
var type=this.accept;
if(type.length){
this.accept={};
for(var i=0;i<type.length;++i){
this.accept[type[i]]=1;
}
}
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this._lastX=0;
this._lastY=0;
this.sourceState="";
if(this.isSource){
_104b.add(this.node,"dojoDndSource");
}
this.targetState="";
if(this.accept){
_104b.add(this.node,"dojoDndTarget");
}
if(this.horizontal){
_104b.add(this.node,"dojoDndHorizontal");
}
this.topics=[topic.subscribe("/dnd/source/over",lang.hitch(this,"onDndSourceOver")),topic.subscribe("/dnd/start",lang.hitch(this,"onDndStart")),topic.subscribe("/dnd/drop",lang.hitch(this,"onDndDrop")),topic.subscribe("/dnd/cancel",lang.hitch(this,"onDndCancel"))];
},checkAcceptance:function(_1052,nodes){
if(this==_1052){
return !this.copyOnly||this.selfAccept;
}
for(var i=0;i<nodes.length;++i){
var type=_1052.getItem(nodes[i].id).type;
var flag=false;
for(var j=0;j<type.length;++j){
if(type[j] in this.accept){
flag=true;
break;
}
}
if(!flag){
return false;
}
}
return true;
},copyState:function(_1053,self){
if(_1053){
return true;
}
if(arguments.length<2){
self=this==_104e.manager().target;
}
if(self){
if(this.copyOnly){
return this.selfCopy;
}
}else{
return this.copyOnly;
}
return false;
},destroy:function(){
_1050.superclass.destroy.call(this);
array.forEach(this.topics,function(t){
t.remove();
});
this.targetAnchor=null;
},onMouseMove:function(e){
if(this.isDragging&&this.targetState=="Disabled"){
return;
}
_1050.superclass.onMouseMove.call(this,e);
var m=_104e.manager();
if(!this.isDragging){
if(this.mouseDown&&this.isSource&&(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay)){
var nodes=this.getSelectedNodes();
if(nodes.length){
m.startDrag(this,nodes,this.copyState(dnd.getCopyKeyState(e),true));
}
}
}
if(this.isDragging){
var _1054=false;
if(this.current){
if(!this.targetBox||this.targetAnchor!=this.current){
this.targetBox=_104c.position(this.current,true);
}
if(this.horizontal){
_1054=(e.pageX-this.targetBox.x<this.targetBox.w/2)==_104c.isBodyLtr(this.current.ownerDocument);
}else{
_1054=(e.pageY-this.targetBox.y)<(this.targetBox.h/2);
}
}
if(this.current!=this.targetAnchor||_1054!=this.before){
this._markTargetAnchor(_1054);
m.canDrop(!this.current||m.source!=this||!(this.current.id in this.selection));
}
}
},onMouseDown:function(e){
if(!this.mouseDown&&this._legalMouseDown(e)&&(!this.skipForm||!dnd.isFormElement(e))){
this.mouseDown=true;
this._lastX=e.pageX;
this._lastY=e.pageY;
_1050.superclass.onMouseDown.call(this,e);
}
},onMouseUp:function(e){
if(this.mouseDown){
this.mouseDown=false;
_1050.superclass.onMouseUp.call(this,e);
}
},onDndSourceOver:function(_1055){
if(this!==_1055){
this.mouseDown=false;
if(this.targetAnchor){
this._unmarkTargetAnchor();
}
}else{
if(this.isDragging){
var m=_104e.manager();
m.canDrop(this.targetState!="Disabled"&&(!this.current||m.source!=this||!(this.current.id in this.selection)));
}
}
},onDndStart:function(_1056,nodes,copy){
if(this.autoSync){
this.sync();
}
if(this.isSource){
this._changeState("Source",this==_1056?(copy?"Copied":"Moved"):"");
}
var _1057=this.accept&&this.checkAcceptance(_1056,nodes);
this._changeState("Target",_1057?"":"Disabled");
if(this==_1056){
_104e.manager().overSource(this);
}
this.isDragging=true;
},onDndDrop:function(_1058,nodes,copy,_1059){
if(this==_1059){
this.onDrop(_1058,nodes,copy);
}
this.onDndCancel();
},onDndCancel:function(){
if(this.targetAnchor){
this._unmarkTargetAnchor();
this.targetAnchor=null;
}
this.before=true;
this.isDragging=false;
this.mouseDown=false;
this._changeState("Source","");
this._changeState("Target","");
},onDrop:function(_105a,nodes,copy){
if(this!=_105a){
this.onDropExternal(_105a,nodes,copy);
}else{
this.onDropInternal(nodes,copy);
}
},onDropExternal:function(_105b,nodes,copy){
var _105c=this._normalizedCreator;
if(this.creator){
this._normalizedCreator=function(node,hint){
return _105c.call(this,_105b.getItem(node.id).data,hint);
};
}else{
if(copy){
this._normalizedCreator=function(node){
var t=_105b.getItem(node.id);
var n=node.cloneNode(true);
n.id=dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}else{
this._normalizedCreator=function(node){
var t=_105b.getItem(node.id);
_105b.delItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
}
this.selectNone();
if(!copy&&!this.creator){
_105b.selectNone();
}
this.insertNodes(true,nodes,this.before,this.current);
if(!copy&&this.creator){
_105b.deleteSelectedNodes();
}
this._normalizedCreator=_105c;
},onDropInternal:function(nodes,copy){
var _105d=this._normalizedCreator;
if(this.current&&this.current.id in this.selection){
return;
}
if(copy){
if(this.creator){
this._normalizedCreator=function(node,hint){
return _105d.call(this,this.getItem(node.id).data,hint);
};
}else{
this._normalizedCreator=function(node){
var t=this.getItem(node.id);
var n=node.cloneNode(true);
n.id=dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}
}else{
if(!this.current){
return;
}
this._normalizedCreator=function(node){
var t=this.getItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
this._removeSelection();
this.insertNodes(true,nodes,this.before,this.current);
this._normalizedCreator=_105d;
},onDraggingOver:function(){
},onDraggingOut:function(){
},onOverEvent:function(){
_1050.superclass.onOverEvent.call(this);
_104e.manager().overSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOver();
}
},onOutEvent:function(){
_1050.superclass.onOutEvent.call(this);
_104e.manager().outSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOut();
}
},_markTargetAnchor:function(_105e){
if(this.current==this.targetAnchor&&this.before==_105e){
return;
}
if(this.targetAnchor){
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
}
this.targetAnchor=this.current;
this.targetBox=null;
this.before=_105e;
if(this.targetAnchor){
this._addItemClass(this.targetAnchor,this.before?"Before":"After");
}
},_unmarkTargetAnchor:function(){
if(!this.targetAnchor){
return;
}
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
},_markDndStatus:function(copy){
this._changeState("Source",copy?"Copied":"Moved");
},_legalMouseDown:function(e){
if(e.type!="touchstart"&&!mouse.isLeft(e)){
return false;
}
if(!this.withHandles){
return true;
}
for(var node=e.target;node&&node!==this.node;node=node.parentNode){
if(_104b.contains(node,"dojoDndHandle")){
return true;
}
if(_104b.contains(node,"dojoDndItem")||_104b.contains(node,"dojoDndIgnore")){
break;
}
}
return false;
}});
return _1050;
});
},"url:davinci/ui/templates/ThemeSetsRenameDialog.html":"<div>\n\t<div class=\"dijitDialogPaneContentArea\">\n\t\t${uiNLS.themeSetName} <input data-dojo-type=\"dijit.form.ValidationTextBox\" data-dojo-props=\"regExp:'[a-zA-z0-9_]+', required:true, invalidMessage:'Invalid Text.'\" id=\"theme_select_themeset_rename_textbox\" style=\"width: 175px;\"/>\n\t</div>\n\n\t<div class=\"dijitDialogPaneActionBar\">\n\t\t<button type=\"button\" dojoType=\"dijit.form.Button\" id=\"theme_set_rename_ok_button\" label=\"${uiNLS.renameButtonLabel}\" class=\"maqPrimaryButton\" type=\"submit\"></button>\n\t\t<button type=\"button\" dojoType=\"dijit.form.Button\" id=\"theme_set_rename_cancel_button\" label=\"${commonNLS.buttonCancel}\" class=\"maqSecondaryButton\"></button>\n\t</div>\n</div>\n","dojo/cookie":function(){
define(["./_base/kernel","./regexp"],function(dojo,_105f){
dojo.cookie=function(name,value,props){
var c=document.cookie,ret;
if(arguments.length==1){
var _1060=c.match(new RegExp("(?:^|; )"+_105f.escapeString(name)+"=([^;]*)"));
ret=_1060?decodeURIComponent(_1060[1]):undefined;
}else{
props=props||{};
var exp=props.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=props.expires=d;
}
if(exp&&exp.toUTCString){
props.expires=exp.toUTCString();
}
value=encodeURIComponent(value);
var _1061=name+"="+value,_1062;
for(_1062 in props){
_1061+="; "+_1062;
var _1063=props[_1062];
if(_1063!==true){
_1061+="="+_1063;
}
}
document.cookie=_1061;
}
return ret;
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
return dojo.cookie;
});
},"davinci/commands/CompoundCommand":function(){
define(["dojo/_base/declare"],function(_1064){
return _1064("davinci.commands.CompoundCommand",null,{name:"compound",_commands:[],constructor:function(_1065){
this._commands=[];
if(_1065){
this._commands=[_1065];
}
},add:function(_1066){
if(!_1066){
return;
}
if(!this._commands){
if(_1066.name=="compound"){
this._commands=_1066._commands;
}else{
this._commands=[_1066];
}
}else{
if(_1066.name=="compound"){
dojo.forEach(_1066._commands,function(c){
this.add(c);
},this);
return;
}else{
if(_1066.name=="modify"){
var id=_1066._oldId;
for(var i=0;i<this._commands.length;i++){
var c=this._commands[i];
if(c.name=="modify"&&c._oldId==id){
c.add(_1066);
return;
}
}
}
}
this._commands.push(_1066);
}
},setContext:function(_1067){
for(var i=0;i<this._commands.length;i++){
if(this._commands[i].setContext){
this._commands[i].setContext(_1067);
}
}
},isEmpty:function(){
return (!this._commands||this._commands.length===0);
},execute:function(){
if(!this._commands){
return;
}
for(var i=0;i<this._commands.length;i++){
this._commands[i].execute();
if(this._commands[i]._oldId&&this._commands[i]._newId){
this._oldId=this._commands[i]._oldId;
this._newId=this._commands[i]._newId;
}
}
},undo:function(){
if(!this._commands){
return;
}
for(var i=this._commands.length-1;i>=0;i--){
this._commands[i].undo();
}
}});
});
},"davinci/html/CSSParser":function(){
define(["dojo/_base/declare","davinci/html/CSSSelector","davinci/html/CSSCombinedSelector","davinci/html/CSSRule","davinci/html/CSSProperty","davinci/html/CSSAtRule","davinci/html/CSSImport","davinci/model/parser/Tokenizer","davinci/model/Comment"],function(_1068,_1069,_106a,_106b,_106c,_106d,_106e,_106f,_1070){
var _1071=null;
var _1072=(function(){
var _1073=(function(){
function _1074(_1075,_1076){
var ch=_1075.next();
if(ch=="@"){
_1075.nextWhileMatches(/[a-zA-Z0-9_-]/);
return "css-at";
}else{
if(ch=="/"&&_1075.equals("*")){
_1076(_1077);
return null;
}else{
if(ch=="<"&&_1075.equals("!")){
_1076(_1078);
return null;
}else{
if(ch=="="){
return "css-compare";
}else{
if(_1075.equals("=")&&(ch=="~"||ch=="|")){
_1075.next();
return "css-compare";
}else{
if(ch=="\""||ch=="'"){
_1076(_1079(ch));
return null;
}else{
if(ch=="#"){
_1075.nextWhileMatches(/[\w-]/);
return "css-hash";
}else{
if(ch=="!"){
_1075.nextWhileMatches(/[ \t]/);
_1075.nextWhileMatches(/\w/);
return "css-important";
}else{
if(/\d/.test(ch)){
_1075.nextWhileMatches(/[\w.%]/);
return "css-unit";
}else{
if(/[,.+>*\/]/.test(ch)){
return "css-select-op";
}else{
if(/[;{}:\[\]]/.test(ch)){
return "css-punctuation";
}else{
_1075.nextWhileMatches(/[\w\\\-_]/);
return "css-identifier";
}
}
}
}
}
}
}
}
}
}
}
};
function _1077(_107a,_107b){
var _107c=false;
while(!_107a.endOfLine()){
var ch=_107a.next();
if(_107c&&ch=="/"){
_107b(_1074);
break;
}
_107c=(ch=="*");
}
return "css-comment";
};
function _1078(_107d,_107e){
var _107f=0;
while(!_107d.endOfLine()){
var ch=_107d.next();
if(_107f>=2&&ch==">"){
_107e(_1074);
break;
}
_107f=(ch=="-")?_107f+1:0;
}
return "css-comment";
};
function _1079(quote){
return function(_1080,_1081){
var _1082=false;
while(!_1080.endOfLine()){
var ch=_1080.next();
if(ch==quote&&!_1082){
break;
}
_1082=!_1082&&ch=="\\";
}
if(!_1082){
_1081(_1074);
}
return "css-string";
};
};
return function(_1083,_1084){
return _106f.tokenizer(_1083,_1084||_1074);
};
})();
function _1085(_1086,_1087,base){
return function(_1088){
if(!_1086||/^\}/.test(_1088)){
return base;
}else{
if(_1087){
return base+indentUnit*2;
}else{
return base+indentUnit;
}
}
};
};
function _1089(_108a,_108b){
_108b=_108b||0;
var _108c=_1073(_108a);
var _108d=false,_108e=false,_108f=false;
var iter={next:function(){
var token=_108c.next(),style=token.style,_1090=token.content;
if(style=="css-hash"){
style=token.style=_108e?"css-colorcode":"css-identifier";
}
if(style=="css-identifier"){
if(_108e){
token.style="css-value";
}else{
if(!_108d&&!_108f){
token.style="css-selector";
}
}
}
if(_1090=="\n"){
token.indentation=_1085(_108d,_108e,_108b);
}
if(_1090=="{"&&_108f=="@media"){
_108f=false;
}else{
if(_1090=="{"){
_108d=true;
}else{
if(_1090=="}"){
_108d=_108e=_108f=false;
}else{
if(_1090==";"){
_108e=_108f=false;
}else{
if(_108d&&style!="css-comment"&&style!="whitespace"){
_108e=true;
}else{
if(!_108d&&style=="css-at"){
_108f=_1090;
}
}
}
}
}
}
return token;
},copy:function(){
var _1091=_108d,_1092=_108e,_1093=_108c.state;
return function(_1094){
_108c=_1073(_1094,_1093);
_108d=_1091;
_108e=_1092;
return iter;
};
}};
return iter;
};
return {make:_1089,electricChars:"}"};
})();
_1072.parse=function(text,_1095){
var _1096,_1097;
if(typeof text=="string"){
var _1098={next:function(){
if(++this.count==1){
return text;
}else{
throw StopIteration;
}
},count:0,text:text};
_1096=_106f.stringStream(_1098);
}else{
_1096=text;
_1097=true;
}
var _1099=_1072.make(_1096);
var token;
var _109a;
var _109b;
var _109c=" ";
var _109d=[];
var _109e=[];
var model,_109f;
function error(text){
_109d.push(text);
};
function _10a0(){
var start,stop,s;
token=_1099.next();
var _10a1=false;
while(token.style=="css-comment"||token.style=="whitespace"){
if(token.style=="css-comment"||_10a1){
if(!_1071){
_1071=new _1070();
}
s=token.content;
if(token.content.indexOf("/*")===0){
s=s.substring(2);
_10a1=true;
_1071.addComment("block",start,stop,"");
}
if((s.lastIndexOf("*/")>-1)&&(s.lastIndexOf("*/")==s.length-2)){
s=s.substring(0,s.length-2);
_10a1=false;
}
_1071.appendComment(s);
}
token=_1099.next();
}
return token;
};
function _10a2(){
_109a=new _1069();
_109a.startOffset=token.offset;
_109a.parent=model;
if(_109b){
_109b.selectors.push(_109a);
_109a.parent=_109b;
}else{
model.selectors.push(_109a);
}
};
function _10a3(){
var prev=_109a;
prev.endOffset=token.offset-1;
if(!_109b){
_109b=new _106a();
_109b.parent=model;
_109b.selectors.push(prev);
_109a.startOffset=prev.startOffset;
model.selectors[model.selectors.length-1]=_109b;
}
_10a2();
_109b.combiners.push(_109c);
_109c=" ";
};
var _10a4;
try{
do{
_10a0();
switch(token.style){
case "css-selector":
case "css-select-op":
if(_1097&&token.content=="<"){
_1096.push("<");
throw StopIteration;
}
model=new _106b();
_109e.push(model);
model.startOffset=token.offset;
if(_1095){
_1095.addChild(model,undefined,true);
}
_109f=false;
_109b=undefined;
_109c=" ";
_10a2();
selectorLoop:
for(;;){
switch(token.style){
case "css-select-op":
switch(token.content){
case ",":
_109b=undefined;
_10a4=false;
_10a2();
break;
case ".":
if(_109f){
_10a3();
}
_10a0();
if(_109a.cls){
_109a.cls=_109a.cls+"."+token.content;
}else{
_109a.cls=token.content;
}
_109f=token.value.length>token.content.length;
break;
case "*":
if(_109a.element||_109a.cls){
_10a3();
}
_109a.element="*";
break;
case "+":
case ">":
_109c=token.content;
_10a3();
break;
}
break;
case "css-selector":
if(token.type=="css-identifier"){
if(_109a.element||_109a.cls){
_10a3();
}
_109a.element=token.content;
}else{
if(token.type=="css-hash"){
if(_109a.id||_109f){
_10a3();
}
_109a.id=token.content.substring(1);
}
}
_109f=token.value.length>token.content.length;
break;
case "css-punctuation":
if(token.content=="{"){
break selectorLoop;
}else{
if(token.content==":"){
_10a0();
if(token.content==":"){
_10a0();
_109a.pseudoElement=token.content;
}else{
_109a.pseudoRule=token.content;
_109f=true;
}
}else{
if(token.content=="["){
_10a0();
_109a.attribute={name:token.content};
_10a0();
if(token.content==="="||token.content==="~="||token.content==="|="){
_109a.attribute.type=token.content;
_10a0();
_109a.attribute.value=token.content.substring(1,token.content.length-1);
_10a0();
}
}
}
}
break;
}
_10a4=true;
_10a0();
}
if(_1071){
model.comment=_1071;
_1071=null;
}
_109a.endOffset=token.offset-1;
while(_10a0().content!="}"){
var _10a5=token.offset;
var _10a6=token.content;
var _10a7=false;
if(token.type=="css-hash"){
_10a0();
if(token.type=="css-identifier"){
_10a6+=token.content;
}else{
_10a7=true;
}
}else{
if(token.type!="css-identifier"){
if(token.content!="*"){
error("expecting identifier around "+_109a.getText()+"{ "+_10a8.name+": "+propery.value);
}else{
_10a0();
_10a6+=token.content;
}
}
}
var _10a8=new _106c();
_10a8.startOffset=_10a5;
_10a8.parent=model;
if(_1071){
_10a8.comment=_1071;
_1071=null;
}
model.properties.push(_10a8);
model.addChild(_10a8,undefined,true);
_10a8.name=_10a6;
if(!_10a7){
if(_10a0().content!=":"){
error("expecting ':' "+_109a.getText()+"{ "+_10a8.name+": "+propery.value);
}
}
_10a0();
_10a8.value=token.value;
if(_10a8.value=="url"){
while((_10a0()).content!=")"){
_10a8.value+=token.value;
}
_10a8.value+=token.value;
}
while((_10a0()).content!=";"&&token.content!="}"){
_10a8.value+=token.value;
}
if(_1071){
_10a8.postComment=_1071;
_1071=null;
}
_10a8.endOffset=token.offset-1;
if(token.content=="}"){
break;
}
}
if(_1071){
_10a8.postComment=_1071;
_1071=null;
}
model.endOffset=token.offset;
break;
case "css-at":
var _10a9=token.content.substring(1);
var _10aa=(_10a9=="import")?new _106e():new _106d();
_10aa.startOffset=token.offset;
if(_1095){
_1095.addChild(_10aa,undefined,true);
}
if(_10a9=="import"){
var _10ab=_10aa;
_10a0();
if(token.content=="url"){
_10ab.isURL=true;
_10a0();
_10a0();
}
_10ab.url=token.content.substring(1,token.content.length-1);
if(_10ab.isURL){
_10a0();
}
_10a0();
}else{
if(_10a9.indexOf("keyframes")>=0){
var _10ac="";
var _10ad="";
var _10ae=false;
var _10af="\t\t";
_10a0();
_10ac=token.content;
if(_10ac=="."){
_10a0();
_10ac+=token.content;
}
_10a0();
_10aa.value=token.content+"\n";
_10a0();
if(token.content.indexOf("from")>=0||token.content.indexOf("to")>=0||token.content.indexOf("%")>=0){
outerLoop:
for(;;){
_10aa.value+="\t"+token.content+" ";
_10a0();
_10aa.value+=token.content+"\n";
while((_10a0()).content!="}"){
if(_10ae){
_10af="\t\t";
_10ae=false;
}
if(token.content==";"){
_10ad="\n";
_10ae=true;
}else{
if(token.content==":"||token.content==")"){
_10ad=" ";
}
}
_10aa.value+=_10af+token.content+_10ad;
_10ad="";
_10af="";
}
_10aa.value+="\t"+token.content+"\n";
_10a0();
if(token.content=="}"){
break outerLoop;
}
}
}else{
error("inside keyframes decl expecting from/to blocks or nn% blocks");
}
_10aa.value+=token.content;
_10aa.name=_10a9+" "+_10ac;
}else{
_10aa.name=_10a9;
_10aa.value="";
while((_10a0()).content!=";"){
_10aa.value+=token.content;
}
}
}
_10aa.endOffset=token.offset;
break;
}
}while(true);
}
catch(e){
if(_1071&&model){
model.postComment=_1071;
_1071=null;
}
}
return {errors:_109d,model:_109e};
};
return _1072;
});
},"dijit/MenuBarItem":function(){
define(["dojo/_base/declare","./MenuItem","dojo/text!./templates/MenuBarItem.html"],function(_10b0,_10b1,_10b2){
var _10b3=_10b0("dijit._MenuBarItemMixin",null,{templateString:_10b2,_setIconClassAttr:null});
var _10b4=_10b0("dijit.MenuBarItem",[_10b1,_10b3],{});
_10b4._MenuBarItemMixin=_10b3;
return _10b4;
});
},"davinci/model/resource/Folder":function(){
define(["dojo/_base/declare","dojo/_base/xhr","davinci/Runtime","davinci/model/resource/Resource","davinci/model/resource/File"],function(_10b5,xhr,_10b6,_10b7,File){
var _10b8=_10b5(_10b7,{constructor:function(name,_10b9){
this.elementType="Folder";
this.name=name;
this.parent=_10b9;
},reload:function(){
this._isLoaded=false;
},createResource:function(name,_10ba,_10bb){
var file;
if(name!=null){
file=_10ba?new _10b8(name,this):new File(name,this);
}else{
file=this;
_10ba=this.elementType=="Folder";
}
var _10bc=_10bb?"OK":_10b6.serverJSONRequest({url:"cmd/createResource",handleAs:"text",content:{path:file.getPath(),isFolder:_10ba},sync:true});
if(_10bc=="OK"&&name!=null){
this.children.push(file);
delete file.libraryId;
delete file.libVersion;
delete file._readOnly;
dojo.publish("/davinci/resource/resourceChanged",["created",file]);
return file;
}else{
if(_10bc=="EXISTS"){
this.children.push(file);
delete file.libraryId;
delete file.libVersion;
delete file._readOnly;
dojo.publish("/davinci/resource/resourceChanged",["created",file]);
return file;
}else{
if(_10bc!="OK"){
throw "Folder.createResource failed: name="+name+"response="+_10bc;
}else{
delete file.libraryId;
delete file.libVersion;
delete file._readOnly;
return this;
}
}
}
},getChildren:function(_10bd,_10be){
if(this._isLoaded){
_10bd.call(null,this.children);
}else{
if(this._loading){
this._loading.then(function(){
_10bd.call(null,this.children);
}.bind(this),_10be);
}else{
this._loading=xhr.get({url:"cmd/listFiles",content:{path:this.getPath()},sync:false,handleAs:"json"}).then(function(_10bf){
this.setChildren(_10bf);
this._isLoaded=true;
_10bd.call(null,this.children);
delete this._loading;
}.bind(this),_10be);
}
}
},getChildrenSync:function(_10c0,sync){
if(!this._isLoaded){
if(this._loadingCallbacks){
this._loadingCallbacks.push(_10c0);
return;
}
this._loadingCallbacks=[];
this._loadingCallbacks.push(_10c0);
_10b6.serverJSONRequest({url:"cmd/listFiles",content:{path:this.getPath()},sync:sync,load:dojo.hitch(this,function(_10c1,_10c2){
this.setChildrenSync(_10c1);
dojo.forEach(this._loadingCallbacks,function(item){
(item)(this.children);
},this);
delete this._loadingCallbacks;
})});
return;
}
_10c0(this.children);
},setChildren:function(_10c3){
this.children=[];
this._appendFiles(_10c3);
},setChildrenSync:function(_10c4){
this.children=[];
this._appendFiles(_10c4,true);
},_appendFiles:function(_10c5,sync){
_10c5.forEach(function(item){
var child=sync?this.getChildSync(item.name):this._getChild(item.name);
var _10c6=child!=null;
if(item.isDir||item.isLib){
if(!_10c6){
child=new _10b8(item.name,this);
}
if(item.isLib){
child.isLibrary=true;
}
}else{
if(!_10c6){
child=new File(item.name,this);
}
}
child.link=item.link;
child.isNew=item.isNew;
child._readOnly=item.readOnly;
child.setDirty(item.isDirty);
if(item.libraryId){
child.libraryId=item.libraryId;
child.libVersion=item.libVersion;
}
if(!_10c6){
this.children.push(child);
}
},this);
this._isLoaded=true;
},getMarkers:function(_10c7,_10c8){
var _10c9=[];
this.visit({visit:function(_10ca){
if(_10ca.elementType=="File"){
markers=_10ca.getMarkers(_10c7);
_10c9.concat(markers);
}else{
if(!_10c8){
return true;
}
}
}},true);
return _10c9;
},getChildSync:function(name){
if(!this._isLoaded||(this.children.length<1)){
this._isLoaded=false;
this.getChildrenSync(function(item){
this.children=item;
},true);
}
return this._getChild(name);
},_getChild:function(name){
if(!this.__CASE_SENSITIVE){
name=name.toLowerCase();
}
var _10cb;
this.children.some(function(child){
var _10cc=child.getName();
if(!this.__CASE_SENSITIVE){
_10cc=_10cc.toLowerCase();
}
var match=_10cc==name;
if(match){
_10cb=child;
}
return match;
});
return _10cb;
}});
davinci.model.resource.root=new _10b8(".",null);
return _10b8;
});
},"davinci/ve/actions/ReplaceAction":function(){
define(["dojo/_base/declare","dojo/dom-style","davinci/ve/actions/ContextAction","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/MoveCommand","davinci/ve/widget","davinci/ve/utils/GeomUtils"],function(_10cd,_10ce,_10cf,_10d0,_10d1,_10d2,_10d3,_10d4){
return _10cd("davinci.ve.actions.ReplaceAction",[_10cf],{run:function(_10d5,_10d6){
_10d5=this.fixupContext(_10d5);
if(_10d5){
if(_10d5.declaredClass!=="davinci.ve.Context"){
return;
}
var _10d7=this._normalizeSelection(_10d5);
if(!this.selectionSameParent(_10d7)){
return;
}
var _10d8=[];
var _10d9={"type":_10d6,"context":_10d5};
if(_10d7.length>0){
var _10da=new _10d0();
dojo.forEach(_10d7,function(w){
var _10db;
var d=w.getData({identify:false});
if(d){
d.context=_10d5;
dojo.withDoc(_10d5.getDocument(),function(){
_10db=_10d3.createWidget(_10d9);
},this);
if(_10db){
_10da.add(new _10d1(_10db,w.getParent(),undefined));
_10d8.push(_10db);
var _10dc=(w&&w.domNode)?_10ce.get(w.domNode,"position"):null;
var _10dd=(_10dc=="absolute");
if(_10dd){
var box=_10d4.getMarginBoxPageCoords(w.domNode);
box.l+=25;
_10da.add(new _10d2(_10db,box.l,box.t,undefined,undefined,undefined,true));
}
}
}
});
_10d5.getCommandStack().execute(_10da);
dojo.forEach(_10d8,function(w,i){
_10d5.select(w,i>0);
},this);
}
}
},isEnabled:function(_10de){
_10de=this.fixupContext(_10de);
var _10df=(_10de&&_10de.getSelection)?_10de.getSelection():[];
if(_10df.length===0){
return false;
}
if(!this.selectionSameParent(_10df)){
return false;
}
return true;
},shouldShow:function(_10e0){
_10e0=this.fixupContext(_10e0);
var _10e1=_10e0?_10e0.editor:null;
return (_10e1&&_10e1.declaredClass=="davinci.ve.PageEditor");
},selectionSameParent:function(_10e2){
if(_10e2.length===0){
return false;
}
var _10e3=_10e2[0].getParent();
for(var i=0;i<_10e2.length;i++){
var _10e4=_10e2[i];
if(_10e4.getParent()!=_10e3){
return false;
}
}
return true;
}});
});
},"dojox/layout/ResizeHandle":function(){
define("dojox/layout/ResizeHandle",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/connect","dojo/_base/array","dojo/_base/event","dojo/_base/fx","dojo/_base/window","dojo/fx","dojo/window","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dijit/_base/manager","dijit/_Widget","dijit/_TemplatedMixin","dojo/_base/declare"],function(_10e5,lang,_10e6,_10e7,_10e8,_10e9,_10ea,_10eb,_10ec,_10ed,_10ee,_10ef,_10f0,_10f1,_10f2,_10f3,_10f4){
_10e5.experimental("dojox.layout.ResizeHandle");
var _10f5=_10f4("dojox.layout.ResizeHandle",[_10f2,_10f3],{targetId:"",targetContainer:null,resizeAxis:"xy",activeResize:false,activeResizeClass:"dojoxResizeHandleClone",animateSizing:true,animateMethod:"chain",animateDuration:225,minHeight:100,minWidth:100,constrainMax:false,maxHeight:0,maxWidth:0,fixedAspect:false,intermediateChanges:false,startTopic:"/dojo/resize/start",endTopic:"/dojo/resize/stop",templateString:"<div dojoAttachPoint=\"resizeHandle\" class=\"dojoxResizeHandle\"><div></div></div>",postCreate:function(){
this.connect(this.resizeHandle,"onmousedown","_beginSizing");
if(!this.activeResize){
this._resizeHelper=_10f1.byId("dojoxGlobalResizeHelper");
if(!this._resizeHelper){
this._resizeHelper=new _10f6({id:"dojoxGlobalResizeHelper"}).placeAt(_10ea.body());
_10ee.add(this._resizeHelper.domNode,this.activeResizeClass);
}
}else{
this.animateSizing=false;
}
if(!this.minSize){
this.minSize={w:this.minWidth,h:this.minHeight};
}
if(this.constrainMax){
this.maxSize={w:this.maxWidth,h:this.maxHeight};
}
this._resizeX=this._resizeY=false;
var _10f7=lang.partial(_10ee.add,this.resizeHandle);
switch(this.resizeAxis.toLowerCase()){
case "xy":
this._resizeX=this._resizeY=true;
_10f7("dojoxResizeNW");
break;
case "x":
this._resizeX=true;
_10f7("dojoxResizeW");
break;
case "y":
this._resizeY=true;
_10f7("dojoxResizeN");
break;
}
},_beginSizing:function(e){
if(this._isSizing){
return;
}
_10e6.publish(this.startTopic,[this]);
this.targetWidget=_10f1.byId(this.targetId);
this.targetDomNode=this.targetWidget?this.targetWidget.domNode:_10ed.byId(this.targetId);
if(this.targetContainer){
this.targetDomNode=this.targetContainer;
}
if(!this.targetDomNode){
return;
}
if(!this.activeResize){
var c=_10ef.position(this.targetDomNode,true);
this._resizeHelper.resize({l:c.x,t:c.y,w:c.w,h:c.h});
this._resizeHelper.show();
if(!this.isLeftToRight()){
this._resizeHelper.startPosition={l:c.x,t:c.y};
}
}
this._isSizing=true;
this.startPoint={x:e.clientX,y:e.clientY};
var style=_10f0.getComputedStyle(this.targetDomNode),_10f8=_10ef.boxModel==="border-model",_10f9=_10f8?{w:0,h:0}:_10ef.getPadBorderExtents(this.targetDomNode,style),_10fa=_10ef.getMarginExtents(this.targetDomNode,style),mb;
mb=this.startSize={w:_10f0.get(this.targetDomNode,"width",style),h:_10f0.get(this.targetDomNode,"height",style),pbw:_10f9.w,pbh:_10f9.h,mw:_10fa.w,mh:_10fa.h};
if(!this.isLeftToRight()&&dojo.style(this.targetDomNode,"position")=="absolute"){
var p=_10ef.position(this.targetDomNode,true);
this.startPosition={l:p.x,t:p.y};
}
this._pconnects=[_10e6.connect(_10ea.doc,"onmousemove",this,"_updateSizing"),_10e6.connect(_10ea.doc,"onmouseup",this,"_endSizing")];
_10e8.stop(e);
},_updateSizing:function(e){
if(this.activeResize){
this._changeSizing(e);
}else{
var tmp=this._getNewCoords(e,"border",this._resizeHelper.startPosition);
if(tmp===false){
return;
}
this._resizeHelper.resize(tmp);
}
e.preventDefault();
},_getNewCoords:function(e,box,_10fb){
try{
if(!e.clientX||!e.clientY){
return false;
}
}
catch(e){
return false;
}
this._activeResizeLastEvent=e;
var dx=(this.isLeftToRight()?1:-1)*(this.startPoint.x-e.clientX),dy=this.startPoint.y-e.clientY,newW=this.startSize.w-(this._resizeX?dx:0),newH=this.startSize.h-(this._resizeY?dy:0),r=this._checkConstraints(newW,newH);
_10fb=(_10fb||this.startPosition);
if(_10fb&&this._resizeX){
r.l=_10fb.l+dx;
if(r.w!=newW){
r.l+=(newW-r.w);
}
r.t=_10fb.t;
}
switch(box){
case "margin":
r.w+=this.startSize.mw;
r.h+=this.startSize.mh;
case "border":
r.w+=this.startSize.pbw;
r.h+=this.startSize.pbh;
break;
}
return r;
},_checkConstraints:function(newW,newH){
if(this.minSize){
var tm=this.minSize;
if(newW<tm.w){
newW=tm.w;
}
if(newH<tm.h){
newH=tm.h;
}
}
if(this.constrainMax&&this.maxSize){
var ms=this.maxSize;
if(newW>ms.w){
newW=ms.w;
}
if(newH>ms.h){
newH=ms.h;
}
}
if(this.fixedAspect){
var w=this.startSize.w,h=this.startSize.h,delta=w*newH-h*newW;
if(delta<0){
newW=newH*w/h;
}else{
if(delta>0){
newH=newW*h/w;
}
}
}
return {w:newW,h:newH};
},_changeSizing:function(e){
var _10fc=this.targetWidget&&lang.isFunction(this.targetWidget.resize),tmp=this._getNewCoords(e,_10fc&&"margin");
if(tmp===false){
return;
}
if(_10fc){
this.targetWidget.resize(tmp);
}else{
if(this.animateSizing){
var anim=_10eb[this.animateMethod]([_10e9.animateProperty({node:this.targetDomNode,properties:{width:{start:this.startSize.w,end:tmp.w}},duration:this.animateDuration}),_10e9.animateProperty({node:this.targetDomNode,properties:{height:{start:this.startSize.h,end:tmp.h}},duration:this.animateDuration})]);
anim.play();
}else{
_10f0.set(this.targetDomNode,{width:tmp.w+"px",height:tmp.h+"px"});
}
}
if(this.intermediateChanges){
this.onResize(e);
}
},_endSizing:function(e){
_10e7.forEach(this._pconnects,_10e6.disconnect);
var pub=lang.partial(_10e6.publish,this.endTopic,[this]);
if(!this.activeResize){
this._resizeHelper.hide();
this._changeSizing(e);
setTimeout(pub,this.animateDuration+15);
}else{
pub();
}
this._isSizing=false;
this.onResize(e);
},onResize:function(e){
}});
var _10f6=dojo.declare("dojox.layout._ResizeHelper",_10f2,{show:function(){
_10f0.set(this.domNode,"display","");
},hide:function(){
_10f0.set(this.domNode,"display","none");
},resize:function(dim){
_10ef.setMarginBox(this.domNode,dim);
}});
return _10f5;
});
},"url:davinci/ui/templates/OpenThemeDialog.html":"<div>\r\n\t<div class=\"dijitDialogPaneContentArea\">\r\n\t\t${selectTheme}: <div dojoType=\"davinci.ui.widgets.ThemeSelection\" dojoAttachPoint=\"_themeChooser\" value='claro' dojoAttachEvent='onChange:_checkValid' searchWorkspace='true'></div>\r\n\t</div>\t\r\n\t<div class=\"dijitDialogPaneActionBar\">\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"_okButton\" dojoAttachEvent='onClick:okButton' label='${open}' class=\"maqPrimaryButton\" type=\"submit\"></button>\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:cancelButton' label='${buttonCancel}' class=\"maqSecondaryButton\"></button>\r\n\t</div>\r\n</div>","dijit/MenuItem":function(){
define(["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/kernel","dojo/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_10fd,dom,_10fe,_10ff,_1100,has,_1101,_1102,_1103,_1104,_1105){
return _10fd("dijit.MenuItem",[_1101,_1102,_1103,_1104],{templateString:_1105,baseClass:"dijitMenuItem",label:"",_setLabelAttr:function(val){
this.containerNode.innerHTML=val;
this._set("label",val);
if(this.textDir==="auto"){
this.applyTextDir(this.focusNode,this.label);
}
},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_1106){
if(_1106&&!("label" in this.params)){
this.set("label",_1106.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var label=this.id+"_text";
_10fe.set(this.containerNode,"id",label);
if(this.accelKeyNode){
_10fe.set(this.accelKeyNode,"id",this.id+"_accel");
label+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",label);
dom.setSelectable(this.domNode,false);
},onClick:function(){
},focus:function(){
try{
if(has("ie")==8){
this.containerNode.focus();
}
this.focusNode.focus();
}
catch(e){
}
},_onFocus:function(){
this._setSelected(true);
this.getParent()._onItemFocus(this);
this.inherited(arguments);
},_setSelected:function(_1107){
_10ff.toggle(this.domNode,"dijitMenuItemSelected",_1107);
},setLabel:function(_1108){
_1100.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_1108);
},setDisabled:function(_1109){
_1100.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_1109);
},_setDisabledAttr:function(value){
this.focusNode.setAttribute("aria-disabled",value?"true":"false");
this._set("disabled",value);
},_setAccelKeyAttr:function(value){
this.accelKeyNode.style.display=value?"":"none";
this.accelKeyNode.innerHTML=value;
_10fe.set(this.containerNode,"colSpan",value?"1":"2");
this._set("accelKey",value);
},_setTextDirAttr:function(_110a){
if(!this._created||this.textDir!=_110a){
this._set("textDir",_110a);
this.applyTextDir(this.focusNode,this.label);
}
}});
});
},"dojox/grid/_ViewManager":function(){
define("dojox/grid/_ViewManager",["dojo/_base/declare","dojo/_base/sniff","dojo/dom-class"],function(_110b,has,_110c){
return _110b("dojox.grid._ViewManager",null,{constructor:function(_110d){
this.grid=_110d;
},defaultWidth:200,views:[],resize:function(){
this.onEach("resize");
},render:function(){
this.onEach("render");
},addView:function(_110e){
_110e.idx=this.views.length;
this.views.push(_110e);
},destroyViews:function(){
for(var i=0,v;v=this.views[i];i++){
v.destroy();
}
this.views=[];
},getContentNodes:function(){
var nodes=[];
for(var i=0,v;v=this.views[i];i++){
nodes.push(v.contentNode);
}
return nodes;
},forEach:function(_110f){
for(var i=0,v;v=this.views[i];i++){
_110f(v,i);
}
},onEach:function(_1110,_1111){
_1111=_1111||[];
for(var i=0,v;v=this.views[i];i++){
if(_1110 in v){
v[_1110].apply(v,_1111);
}
}
},normalizeHeaderNodeHeight:function(){
var _1112=[];
for(var i=0,v;(v=this.views[i]);i++){
if(v.headerContentNode.firstChild){
_1112.push(v.headerContentNode);
}
}
this.normalizeRowNodeHeights(_1112);
},normalizeRowNodeHeights:function(_1113){
var h=0;
var _1114=[];
if(this.grid.rowHeight){
h=this.grid.rowHeight;
}else{
if(_1113.length<=1){
return;
}
for(var i=0,n;(n=_1113[i]);i++){
if(!_110c.contains(n,"dojoxGridNonNormalizedCell")){
_1114[i]=n.firstChild.offsetHeight;
h=Math.max(h,_1114[i]);
}
}
h=(h>=0?h:0);
if((has("mozilla")||has("ie")>8)&&h){
h++;
}
}
for(i=0;(n=_1113[i]);i++){
if(_1114[i]!=h){
n.firstChild.style.height=h+"px";
}
}
},resetHeaderNodeHeight:function(){
for(var i=0,v,n;(v=this.views[i]);i++){
n=v.headerContentNode.firstChild;
if(n){
n.style.height="";
}
}
},renormalizeRow:function(_1115){
var _1116=[];
for(var i=0,v,n;(v=this.views[i])&&(n=v.getRowNode(_1115));i++){
n.firstChild.style.height="";
_1116.push(n);
}
this.normalizeRowNodeHeights(_1116);
},getViewWidth:function(_1117){
return this.views[_1117].getWidth()||this.defaultWidth;
},measureHeader:function(){
this.resetHeaderNodeHeight();
this.forEach(function(_1118){
_1118.headerContentNode.style.height="";
});
var h=0;
this.forEach(function(_1119){
h=Math.max(_1119.headerNode.offsetHeight,h);
});
return h;
},measureContent:function(){
var h=0;
this.forEach(function(_111a){
h=Math.max(_111a.domNode.offsetHeight,h);
});
return h;
},findClient:function(_111b){
var c=this.grid.elasticView||-1;
if(c<0){
for(var i=1,v;(v=this.views[i]);i++){
if(v.viewWidth){
for(i=1;(v=this.views[i]);i++){
if(!v.viewWidth){
c=i;
break;
}
}
break;
}
}
}
if(c<0){
c=Math.floor(this.views.length/2);
}
return c;
},arrange:function(l,w){
var i,v,vw,len=this.views.length,self=this;
var c=(w<=0?len:this.findClient());
var _111c=function(v,l){
var ds=v.domNode.style;
var hs=v.headerNode.style;
if(!self.grid.isLeftToRight()){
ds.right=l+"px";
if(has("ff")<4){
hs.right=l+v.getScrollbarWidth()+"px";
}else{
hs.right=l+"px";
}
if(!has("webkit")){
hs.width=parseInt(hs.width,10)-v.getScrollbarWidth()+"px";
}
}else{
ds.left=l+"px";
hs.left=l+"px";
}
ds.top=0+"px";
hs.top=0;
};
for(i=0;(v=this.views[i])&&(i<c);i++){
vw=this.getViewWidth(i);
v.setSize(vw,0);
_111c(v,l);
if(v.headerContentNode&&v.headerContentNode.firstChild){
vw=v.getColumnsWidth()+v.getScrollbarWidth();
}else{
vw=v.domNode.offsetWidth;
}
l+=vw;
}
i++;
var r=w;
for(var j=len-1;(v=this.views[j])&&(i<=j);j--){
vw=this.getViewWidth(j);
v.setSize(vw,0);
vw=v.domNode.offsetWidth;
r-=vw;
_111c(v,r);
}
if(c<len){
v=this.views[c];
vw=Math.max(1,r-l);
v.setSize(vw+"px",0);
_111c(v,l);
}
return l;
},renderRow:function(_111d,_111e,_111f){
var _1120=[];
for(var i=0,v,n,_1121;(v=this.views[i])&&(n=_111e[i]);i++){
_1121=v.renderRow(_111d);
n.appendChild(_1121);
_1120.push(_1121);
}
if(!_111f){
this.normalizeRowNodeHeights(_1120);
}
},rowRemoved:function(_1122){
this.onEach("rowRemoved",[_1122]);
},updateRow:function(_1123,_1124){
for(var i=0,v;v=this.views[i];i++){
v.updateRow(_1123);
}
if(!_1124){
this.renormalizeRow(_1123);
}
},updateRowStyles:function(_1125){
this.onEach("updateRowStyles",[_1125]);
},setScrollTop:function(inTop){
var top=inTop;
for(var i=0,v;v=this.views[i];i++){
top=v.setScrollTop(inTop);
if(has("ie")&&v.headerNode&&v.scrollboxNode){
v.headerNode.scrollLeft=v.scrollboxNode.scrollLeft;
}
}
return top;
},getFirstScrollingView:function(){
for(var i=0,v;(v=this.views[i]);i++){
if(v.hasHScrollbar()||v.hasVScrollbar()){
return v;
}
}
return null;
}});
});
},"dojox/grid/_EditManager":function(){
define("dojox/grid/_EditManager",["dojo/_base/lang","dojo/_base/array","dojo/_base/declare","dojo/_base/connect","dojo/_base/sniff","./util"],function(lang,array,_1126,_1127,has,util){
return _1126("dojox.grid._EditManager",null,{constructor:function(_1128){
this.grid=_1128;
if(has("ie")){
this.connections=[_1127.connect(document.body,"onfocus",lang.hitch(this,"_boomerangFocus"))];
}else{
this.connections=[_1127.connect(this.grid,"onBlur",this,"apply")];
}
},info:{},destroy:function(){
array.forEach(this.connections,_1127.disconnect);
},cellFocus:function(_1129,_112a){
if(this.grid.singleClickEdit||this.isEditRow(_112a)){
this.setEditCell(_1129,_112a);
}else{
this.apply();
}
if(this.isEditing()||(_1129&&_1129.editable&&_1129.alwaysEditing)){
this._focusEditor(_1129,_112a);
}
},rowClick:function(e){
if(this.isEditing()&&!this.isEditRow(e.rowIndex)){
this.apply();
}
},styleRow:function(inRow){
if(inRow.index==this.info.rowIndex){
inRow.customClasses+=" dojoxGridRowEditing";
}
},dispatchEvent:function(e){
var c=e.cell,ed=(c&&c["editable"])?c:0;
return ed&&ed.dispatchEvent(e.dispatch,e);
},isEditing:function(){
return this.info.rowIndex!==undefined;
},isEditCell:function(_112b,_112c){
return (this.info.rowIndex===_112b)&&(this.info.cell.index==_112c);
},isEditRow:function(_112d){
return this.info.rowIndex===_112d;
},setEditCell:function(_112e,_112f){
if(!this.isEditCell(_112f,_112e.index)&&this.grid.canEdit&&this.grid.canEdit(_112e,_112f)){
this.start(_112e,_112f,this.isEditRow(_112f)||_112e.editable);
}
},_focusEditor:function(_1130,_1131){
util.fire(_1130,"focus",[_1131]);
},focusEditor:function(){
if(this.isEditing()){
this._focusEditor(this.info.cell,this.info.rowIndex);
}
},_boomerangWindow:500,_shouldCatchBoomerang:function(){
return this._catchBoomerang>new Date().getTime();
},_boomerangFocus:function(){
if(this._shouldCatchBoomerang()){
this.grid.focus.focusGrid();
this.focusEditor();
this._catchBoomerang=0;
}
},_doCatchBoomerang:function(){
if(has("ie")){
this._catchBoomerang=new Date().getTime()+this._boomerangWindow;
}
},start:function(_1132,_1133,_1134){
if(!this._isValidInput()){
return;
}
this.grid.beginUpdate();
this.editorApply();
if(this.isEditing()&&!this.isEditRow(_1133)){
this.applyRowEdit();
this.grid.updateRow(_1133);
}
if(_1134){
this.info={cell:_1132,rowIndex:_1133};
this.grid.doStartEdit(_1132,_1133);
this.grid.updateRow(_1133);
}else{
this.info={};
}
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._focusEditor(_1132,_1133);
this._doCatchBoomerang();
},_editorDo:function(_1135){
var c=this.info.cell;
if(c&&c.editable){
c[_1135](this.info.rowIndex);
}
},editorApply:function(){
this._editorDo("apply");
},editorCancel:function(){
this._editorDo("cancel");
},applyCellEdit:function(_1136,_1137,_1138){
if(this.grid.canEdit(_1137,_1138)){
this.grid.doApplyCellEdit(_1136,_1138,_1137.field);
}
},applyRowEdit:function(){
this.grid.doApplyEdit(this.info.rowIndex,this.info.cell.field);
},apply:function(){
if(this.isEditing()&&this._isValidInput()){
this.grid.beginUpdate();
this.editorApply();
this.applyRowEdit();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang();
}
},cancel:function(){
if(this.isEditing()){
this.grid.beginUpdate();
this.editorCancel();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang();
}
},save:function(_1139,_113a){
var c=this.info.cell;
if(this.isEditRow(_1139)&&(!_113a||c.view==_113a)&&c.editable){
c.save(c,this.info.rowIndex);
}
},restore:function(_113b,_113c){
var c=this.info.cell;
if(this.isEditRow(_113c)&&c.view==_113b&&c.editable){
c.restore(this.info.rowIndex);
}
},_isValidInput:function(){
var w=(this.info.cell||{}).widget;
if(!w||!w.isValid){
return true;
}
w.focused=true;
return w.isValid(true);
}});
});
},"davinci/html/HTMLText":function(){
define(["dojo/_base/declare","davinci/html/HTMLItem"],function(_113d,_113e){
return _113d("davinci.html.HTMLText",_113e,{constructor:function(value){
this.elementType="HTMLText";
this.value=value||"";
},getText:function(_113f){
return this.value;
},setText:function(value){
if(this.wasParsed||(this.parent&&this.parent.wasParsed)){
var delta=value.length-this.value.length;
if(delta>0){
this.getHTMLFile().updatePositions(this.startOffset+1,delta);
}
}
this.value=value;
},getLabel:function(){
if(this.value.length<15){
return this.value;
}
return this.value.substring(0,15)+"...";
}});
});
},"dijit/DropDownMenu":function(){
define(["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_1140,event,keys,_1141,_1142,_1143){
return _1140("dijit.DropDownMenu",[_1143,_1142],{templateString:_1141,baseClass:"dijitMenu",postCreate:function(){
this.inherited(arguments);
var l=this.isLeftToRight();
this._openSubMenuKey=l?keys.RIGHT_ARROW:keys.LEFT_ARROW;
this._closeSubMenuKey=l?keys.LEFT_ARROW:keys.RIGHT_ARROW;
this.connectKeyNavHandlers([keys.UP_ARROW],[keys.DOWN_ARROW]);
},_onKeyPress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
switch(evt.charOrCode){
case this._openSubMenuKey:
this._moveToPopup(evt);
event.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
event.stop(evt);
}
break;
}
}});
});
},"davinci/ui/about":function(){
define(["dojo/_base/declare","../Workbench","davinci/version","davinci/repositoryinfo","dojo/date/locale","dojo/date/stamp","dojo/i18n!davinci/ui/nls/ui","dojo/i18n!dijit/nls/common","dijit/form/Button"],function(_1144,_1145,_1146,_1147,_1148,Stamp,uiNLS,_1149){
var about=_1144("davinci.ui.about",null,{});
about.show=function(){
var _114a=uiNLS;
var _114b="<div class='about_container'>"+"<div class='about_version'>"+dojo.string.substitute(_114a.productVersion,[_1146])+"</div>";
var ri=_1147,_114c=ri.revision;
var bd=ri.buildtime;
var date=Stamp.fromISOString(bd);
if(date){
bd=_1148.format(date,{formatLength:"medium"});
}
if(bd){
_114b+="<div class='about_date'>"+dojo.string.substitute(_114a.productDate,[bd])+"</div>";
}
if(_114c){
var _114d="<a href='https://github.com/maqetta/maqetta/commit/"+_114c+"'>"+_114c.substr(0,15)+"...</a>";
_114b+="<div class='about_build'>"+dojo.string.substitute(_114a.build,[_114d])+"</div>";
}
_114b+="</div>";
_1145.showMessage(_114a.aboutMaqetta,_114b);
};
return about;
});
},"davinci/ve/metadata":function(){
define(["require","dojo/Deferred","dojo/promise/all","dojo/_base/lang","dojo/_base/connect","../library","../model/Path","../repositoryinfo"],function(_114e,_114f,all,lang,_1150,_1151,Path,info){
var _1152,_1153,_1154={},_1155={},_1156={},l10n=null,_1157=[],_1158={},_1159={id:{datatype:"string",hidden:true},lang:{datatype:"string",hidden:true},dir:{datatype:"string",hidden:true},"class":{datatype:"string",hidden:true},style:{datatype:"string",hidden:true},title:{datatype:"string",hidden:true}};
dojo.subscribe("/davinci/ui/libraryChanged/start",function(){
_1154={};
_1155={};
_1156={};
l10n=null;
_1152.init().then(function(){
dojo.publish("/davinci/ui/libraryChanged");
});
});
function _115a(dest,srcs){
dest=dest||{};
for(var i=1,l=arguments.length;i<l;i++){
var src=arguments[i],name,val;
for(name in src){
if(src.hasOwnProperty(name)){
val=src[name];
if(!(name in dest)||(typeof val!=="object"&&dest[name]!==val)){
dest[name]=val;
}else{
_115a(dest[name],val);
}
}
}
}
return dest;
};
function _115b(pkg,path){
_1154[pkg.name]=pkg;
path=new Path(path);
var _115c=pkg.overlays;
for(var name in _115c){
if(_115c.hasOwnProperty(name)){
if(name==="oam"||name==="maqetta"){
_115a(pkg,_115c[name]);
}
}
}
delete pkg.overlays;
pkg.__metadataModuleId="maq-metadata-"+pkg.name;
var _115d=new Path(location.href);
var _115e=[{name:pkg.__metadataModuleId,location:_115d.append(path).append(pkg.directories.metadata).toString()}];
if(pkg.name!="dojo"){
pkg.__libraryModuleId=pkg.name;
var _115f="app/static/lib/"+pkg.name+"/"+pkg.version;
_115e.push({name:pkg.__libraryModuleId,location:_115d.append(_115f).toString()});
}
_114e=_114e({packages:_115e});
var _1160;
if(lang.exists("scripts.widget_metadata",pkg)){
if(typeof pkg.scripts.widget_metadata=="string"){
var _1161=path.append(pkg.scripts.widget_metadata);
_1160=dojo.xhrGet({url:_1161.toString()+"?"+info.revision,handleAs:"json"}).then(function(data){
if(data){
return _1162(pkg.name,data,_1161.getParentPath());
}
});
}else{
_1160=_1162(pkg.name,pkg.scripts.widget_metadata,path);
}
}
if(lang.exists("scripts.callbacks",pkg)){
var d=new _114f();
_114e([pkg.scripts.callbacks],function(cb){
pkg.$callbacks=cb;
d.resolve();
});
_1157.push(d);
}
return _1160;
};
function _1162(_1163,_1164,path){
if(!_1163){
console.error("parseLibraryDescriptor: missing 'libName' arg");
}
var pkg=_1154[_1163];
_1164.$path=path.toString();
if(!pkg){
_1154[_1163]={$wm:_1164,name:_1164.name,version:_1164.version};
pkg=_1154[_1163];
}else{
if(pkg.$widgets){
_1164.widgets.forEach(function(item){
pkg.$wm.widgets.push(item);
});
for(var name in _1164.categories){
if(!pkg.$wm.categories.hasOwnProperty(name)){
pkg.$wm.categories[name]=_1164.categories[name];
}
}
}else{
if(pkg.$wm){
for(var z=0;z<_1164.widgets.length;z++){
var found=false;
for(var ll=0;!found&&ll<pkg.$wm.widgets.length;ll++){
if(pkg.$wm.widgets[ll].type==_1164.widgets[z].type){
found=true;
}
}
if(!found){
pkg.$wm.widgets.push(_1164.widgets[z]);
}
}
}else{
if(!pkg.$wm){
pkg.$wm=_1164;
}
}
}
}
var wm=pkg.$wm;
wm.$providedTypes=wm.$providedTypes||{};
wm.widgets.forEach(function(item){
wm.$providedTypes[item.type]=item;
if(item.icon&&!item.iconLocal){
item.icon=path.append(item.icon).toString();
}
item.widgetClass=wm.categories[item.category].widgetClass;
});
dojo.mixin(wm,{_maqGetString:_1165});
if(wm.extend){
for(var _1166 in wm.extend){
if(wm.extend.hasOwnProperty(_1166)){
if(_1154[_1166]&&_1154[_1166].$wm){
_1167(_1154[_1166].$wm,[wm.extend[_1166]]);
}else{
var ext=_1158[_1166]||[];
ext.push(wm.extend[_1166]);
_1158[_1166]=ext;
}
}
}
}
if(_1158[_1163]){
_1167(wm,_1158[_1163]);
}
return pkg;
};
function _1167(wm,_1168){
function _1169(val1,val2){
if(typeof val1==="string"){
return val1+","+val2;
}
if(val1 instanceof Array){
return val1.concat(val2);
}
console.error("Unhandled type for \"concat()\"");
};
var _116a=wm.$providedTypes;
_1168.forEach(function(ext){
for(var type in ext){
if(ext.hasOwnProperty(type)){
var e=ext[type];
var w=_116a[type];
if(e.mixin){
lang.mixin(w,e.mixin);
}
if(e.concat){
for(var prop in e.concat){
if(e.concat.hasOwnProperty(prop)){
var val=e.concat[prop];
if(w[prop]){
w[prop]=_1169(w[prop],val);
}else{
w[prop]=val;
}
}
}
}
}
}
});
};
function _116b(type){
if(type){
for(var name in _1154){
if(_1154.hasOwnProperty(name)){
var lib=_1154[name];
if(lib.$wm&&lib.$wm.$providedTypes[type]){
return lib;
}
}
}
}
return null;
};
var _116c=false;
function _1165(key){
if(!_116c){
_116c=true;
}
return null;
};
function _116d(type){
if(!type){
return undefined;
}
if(_1155.hasOwnProperty(type)){
return _1155[type];
}
var lib=_116b(type),wm,_116e;
if(lib){
_116e=lib.$wm.$path;
}
if(!_116e){
return null;
}
wm=lib.$wm;
var _116f=null;
var _1170=[_116e,"/",type.replace(/\./g,"/"),"_oam.json"].join("");
if(!wm.localPath){
dojo.xhrGet({url:_1170+"?"+info.revision,handleAs:"json",sync:true}).then(function(data){
_116f=data;
});
}else{
var base=_1153.getProject();
var _1171=system.resource.findResource("./"+base+"/"+_1170);
_116f=dojo.fromJson(_1171.getContentSync());
}
if(!_116f){
console.error("ERROR: Could not load metadata for type: "+type);
return null;
}
_116f.$ownproperty=dojo.mixin({},_116f.property);
_116f.property=dojo.mixin({},_1159,_116f.property);
_116f.$src=_1170;
_1155[type]=_116f;
_115a(_116f,wm.$providedTypes[type].metadata);
return _116f;
};
function _1172(obj,_1173){
if(!_1173){
return obj;
}
dojo.every(_1173.split("."),function(name){
if(obj[name]===undefined){
obj=undefined;
return false;
}
obj=obj[name];
return true;
});
return obj;
};
function _1174(name,type){
var _1175="allowed"+name,prop=_1152.queryDescriptor(type,_1175);
if(!prop){
prop=name==="Parent"?"ANY":"NONE";
}
return prop.split(/\s*,\s*/);
};
function _1176(type,_1177){
var value=_1152.queryDescriptor(type,_1177);
if(!value){
return null;
}
var lib=_116b(type);
return _1178(lib,value);
};
function _1178(lib,_1179){
if(!lib||!_1179){
return null;
}
var _117a;
if(typeof _1179==="string"&&_1179.substr(0,2)==="./"){
_117a=new Path(lib.__metadataModuleId).append(_1179).toString();
}else{
_117a=_1179;
}
return _117a;
};
_1152={init:function(){
var _117b=[];
_1153=_114e("../Workbench");
_1151.getUserLibs(_1153.getProject()).forEach(function(lib){
var path=lib.metaRoot;
if(path){
_117b.push(dojo.xhrGet({url:path+"/package.json"+"?"+info.revision,handleAs:"json"}).then(function(data){
return _115b(data,path);
}));
}
});
return all(_117b);
},parseMetaData:function(name,_117c,path){
return _1162(name,_117c,path);
},getLibrary:function(name){
return name?_1154[name]:_1154;
},getLibraryActions:function(_117d,_117e){
var _117f=[];
for(var name in _1154){
if(_1154.hasOwnProperty(name)){
var lib=_1154[name];
var wm=lib.$wm;
if(!wm){
continue;
}
var _1180=lib.$wm["davinci.actionSets"];
if(!_1180){
continue;
}
dojo.forEach(_1180,function(_1181){
if(_1181.id==_117d){
if(!_117e||(_1181.targetID===_117e)){
var _1182=dojo.clone(_1181.actions);
dojo.forEach(_1182,function(_1183){
if(_1183.action){
var _1184=_1178(lib,_1183.action);
_1183.action=_1184;
}
if(_1183.menu){
_1183.menu.forEach(function(item){
if(item.action){
var _1185=_1178(lib,item.action);
item.action=_1185;
}
});
}
_117f.push(_1183);
});
}
}
});
}
}
return _117f;
},loadThemeMeta:function(model){
var style=model.find({elementType:"HTMLElement",tag:"style"});
var _1186=[];
var _1187="claro";
var _1188;
for(var z=0;z<style.length;z++){
for(var i=0;i<style[z].children.length;i++){
if(style[z].children[i].elementType=="CSSImport"){
_1186.push(style[z].children[i]);
}
}
}
var _1189=new Path(model.fileName);
var _118a=_1151.getThemes(_1153.getProject());
var _118b={};
for(var i=0;i<_118a.length;i++){
if(_118a[i].files){
for(var k=0;k<_118a[i].files.length;k++){
_118b[_118a[i].files[k]]=_118a[i];
}
}
}
for(var i=0;i<_1186.length;i++){
var url=_1186[i].url;
for(var _118c in _118b){
if(_118c.indexOf(_1187)>-1){
_1188=_118c;
}
if(url.indexOf(_118c)>-1){
return {themeUrl:url,themeMetaCache:_1151.getThemeMetadata(_118b[_118c]),theme:_118b[_118c]};
}
}
}
var ro=_1152._loadThemeMetaDojoxMobile(model,_118b);
if(ro){
return ro;
}
if(_1188){
var _118d=_1187;
var _118e;
for(var i=0;i<_1186.length;i++){
var _118f=_1186[i].url.match(/\/([^\/]*)\.css$/);
if(_118f&&_118f.length==2){
var _1190=_118f[1];
var _1191=_1186[i].url.match(new RegExp("themes/"+_1190+"/"+_1190+".css$"));
if(_1191){
_118e=_1190;
break;
}
}
}
if(_118e){
var _1192=model.getDocumentElement();
var head=_1192.getChildElement("head");
var _1193=_1192.getChildElement("body");
var _1194=_1193.getAttribute("class");
if(_1194){
_1193.setAttribute("class",_1194.replace(new RegExp("\\b"+_118e+"\\b","g"),_118d));
}
var _1195=head.getChildElements("style");
dojo.forEach(_1195,function(_1196){
dojo.forEach(_1196.children,function(_1197){
if(_1197.elementType=="CSSImport"){
_1197.url=_1197.url.replace(new RegExp("/"+_118e,"g"),"/"+_118d);
}
});
});
var url=_1186[i].url.replace(new RegExp("/"+_118e,"g"),"/"+_118d);
var _1198={themeUrl:url,themeMetaCache:_1151.getThemeMetadata(_118b[_1188]),theme:_118b[_1188]};
_1198.themeMetaCache.usingSubstituteTheme={oldThemeName:_118e,newThemeName:_118d};
return _1198;
}
}
},_loadThemeMetaDojoxMobile:function(model,_1199){
var _119a=model.find({elementType:"HTMLElement",tag:"script"});
for(var s=0;s<_119a.length;s++){
var text=_119a[s].getElementText();
if(text.length){
var start=text.indexOf("dojoxMobile.themeMap");
if(start>0){
start=text.indexOf("=",start);
var stop=text.indexOf(";",start);
if(stop>start){
var _119b=dojo.fromJson(text.substring(start+1,stop));
var url=_119b[0][2][0];
for(var _119c in _1199){
if(url.indexOf(_119c)>-1){
return {themeUrl:url,themeMetaCache:_1151.getThemeMetadata(_1199[_119c]),theme:_1199[_119c]};
}
}
}
}
}
}
return;
},getLibraryForType:function(type){
return _116b(type);
},getLibraryBase:function(type){
var lib=_116b(type);
if(lib){
return lib.$wm.$path;
}
},invokeCallback:function(_119d,_119e,args){
var _119f=_119d,fn;
if(typeof _119d==="string"){
_119f=_116b(type);
}
if(_119f&&_119f.$callbacks){
fn=_119f.$callbacks[_119e];
if(fn){
fn.apply(_119f.$callbacks,args);
}
}
},query:function(_11a0,_11a1){
if(!_11a0){
return;
}
var type,_11a2;
if(_11a0.declaredClass){
if(_11a0.metadata){
_11a2=_11a0.metadata;
}
type=_11a0.type;
}else{
type=_11a0;
}
if(!_11a2){
_11a2=_116d(type);
if(!_11a2){
return;
}
if(_11a0.declaredClass){
_11a0.metadata=_11a2;
}
}
return _1172(_11a2,_11a1);
},queryDescriptorByName:function(name,type,_11a3){
var lib=_116b(type),item;
if(lib){
var _11a4=lib.$wm.widgets;
for(var i=0;i<_11a4.length;i++){
if(_11a4[i].name==name){
item=_11a4[i];
break;
}
}
}
return this._queryDescriptor(item,_11a3);
},queryDescriptor:function(type,_11a5){
var lib=_116b(type),item;
if(lib){
item=lib.$wm.$providedTypes[type];
}
return this._queryDescriptor(item,_11a5);
},_queryDescriptor:function(item,_11a6){
if(!item||typeof item!=="object"){
return;
}
var value=_1172(item,_11a6);
if(_11a6==="resizable"){
if(!value){
value="both";
}
}
return value;
},getAllowedParent:function(type){
return _1174("Parent",type);
},getAllowedChild:function(type){
return _1174("Child",type);
},getHelper:function(type,_11a7){
var d=new _114f(),idx=type+":"+_11a7;
if(idx in _1156){
d.resolve(_1156[idx]);
return d;
}
var _11a8=_1176(type,_11a7);
if(!_11a8){
d.resolve();
}else{
_114e([_11a8],function(_11a9){
d.resolve(_11a9);
_1156[idx]=_11a9;
});
}
return d;
},getSmartInput:function(type){
var d=new _114f();
if(type in _11aa){
d.resolve(_11aa[type]);
}else{
var _11ab=_1176(type,"inlineEdit");
if(!_11ab){
d.resolve(null);
}else{
if(typeof _11ab==="string"){
_114e([_11ab],function(_11ac){
d.resolve(_11aa[type]=new _11ac());
});
}else{
_114e(["davinci/ve/input/SmartInput"],function(_11ad){
var si=new _11ad();
lang.mixin(si,_11ab);
d.resolve(_11aa[type]=si);
});
}
}
}
return d;
},getDeferreds:function(){
return _1157;
}};
var _11aa={};
_1150.subscribe("/davinci/ui/libraryChanged/start",function(){
_11aa={};
});
return dojo.setObject("davinci.ve.metadata",_1152);
});
},"dojox/grid/_Grid":function(){
require({cache:{"url:dojox/grid/resources/_Grid.html":"<div hidefocus=\"hidefocus\" role=\"grid\" dojoAttachEvent=\"onmouseout:_mouseOut\">\n\t<div class=\"dojoxGridMasterHeader\" dojoAttachPoint=\"viewsHeaderNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterView\" dojoAttachPoint=\"viewsNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterMessages\" style=\"display: none;\" dojoAttachPoint=\"messagesNode\"></div>\n\t<span dojoAttachPoint=\"lastFocusNode\" tabindex=\"0\"></span>\n</div>\n"}});
define("dojox/grid/_Grid",["dojo/_base/kernel","../main","dojo/_base/declare","./_Events","./_Scroller","./_Layout","./_View","./_ViewManager","./_RowManager","./_FocusManager","./_EditManager","./Selection","./_RowSelector","./util","dijit/_Widget","dijit/_TemplatedMixin","dijit/CheckedMenuItem","dojo/text!./resources/_Grid.html","dojo/string","dojo/_base/array","dojo/_base/lang","dojo/_base/sniff","dojox/html/metrics","dojo/_base/html","dojo/query","dojo/dnd/common","dojo/i18n!dijit/nls/loading"],function(dojo,dojox,_11ae,_11af,_11b0,_11b1,_11b2,_11b3,_11b4,_11b5,_11b6,_11b7,_11b8,util,_11b9,_11ba,_11bb,_11bc,_11bd,array,lang,has,_11be,html,query){
if(!dojo.isCopyKey){
dojo.isCopyKey=dojo.dnd.getCopyKeyState;
}
var _11bf=_11ae("dojox.grid._Grid",[_11b9,_11ba,_11af],{templateString:_11bc,classTag:"dojoxGrid",rowCount:5,keepRows:75,rowsPerPage:25,autoWidth:false,initialWidth:"",autoHeight:"",rowHeight:0,autoRender:true,defaultHeight:"15em",height:"",structure:null,elasticView:-1,singleClickEdit:false,selectionMode:"extended",rowSelector:"",columnReordering:false,headerMenu:null,placeholderLabel:"GridColumns",selectable:false,_click:null,loadingMessage:"<span class='dojoxGridLoading'>${loadingState}</span>",errorMessage:"<span class='dojoxGridError'>${errorState}</span>",noDataMessage:"",escapeHTMLInData:true,formatterScope:null,editable:false,summary:"",_setSummaryAttr:"domNode",sortInfo:0,_placeholders:null,_layoutClass:_11b1,buildRendering:function(){
this.inherited(arguments);
if(!this.domNode.getAttribute("tabIndex")){
this.domNode.tabIndex="0";
}
this.createScroller();
this.createLayout();
this.createViews();
this.createManagers();
this.createSelection();
this.connect(this.selection,"onSelected","onSelected");
this.connect(this.selection,"onDeselected","onDeselected");
this.connect(this.selection,"onChanged","onSelectionChanged");
_11be.initOnFontResize();
this.connect(_11be,"onFontResize","textSizeChanged");
util.funnelEvents(this.domNode,this,"doKeyEvent",util.keyEvents);
if(this.selectionMode!="none"){
this.domNode.setAttribute("aria-multiselectable",this.selectionMode=="single"?"false":"true");
}
html.addClass(this.domNode,this.classTag);
if(!this.isLeftToRight()){
html.addClass(this.domNode,this.classTag+"Rtl");
}
},postMixInProperties:function(){
this.inherited(arguments);
var _11c0=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_11bd.substitute(this.loadingMessage,_11c0);
this.errorMessage=_11bd.substitute(this.errorMessage,_11c0);
if(this.srcNodeRef&&this.srcNodeRef.style.height){
this.height=this.srcNodeRef.style.height;
}
this._setAutoHeightAttr(this.autoHeight,true);
this.lastScrollTop=this.scrollTop=0;
},postCreate:function(){
this._placeholders=[];
this._setHeaderMenuAttr(this.headerMenu);
this._setStructureAttr(this.structure);
this._click=[];
this.inherited(arguments);
if(this.domNode&&this.autoWidth&&this.initialWidth){
this.domNode.style.width=this.initialWidth;
}
if(this.domNode&&!this.editable){
html.attr(this.domNode,"aria-readonly","true");
}
},destroy:function(){
this.domNode.onReveal=null;
this.domNode.onSizeChange=null;
delete this._click;
if(this.scroller){
this.scroller.destroy();
delete this.scroller;
}
this.edit.destroy();
delete this.edit;
this.views.destroyViews();
if(this.focus){
this.focus.destroy();
delete this.focus;
}
if(this.headerMenu&&this._placeholders.length){
array.forEach(this._placeholders,function(p){
p.unReplace(true);
});
this.headerMenu.unBindDomNode(this.viewsHeaderNode);
}
this.inherited(arguments);
},_setAutoHeightAttr:function(ah,_11c1){
if(typeof ah=="string"){
if(!ah||ah=="false"){
ah=false;
}else{
if(ah=="true"){
ah=true;
}else{
ah=window.parseInt(ah,10);
}
}
}
if(typeof ah=="number"){
if(isNaN(ah)){
ah=false;
}
if(ah<0){
ah=true;
}else{
if(ah===0){
ah=false;
}
}
}
this.autoHeight=ah;
if(typeof ah=="boolean"){
this._autoHeight=ah;
}else{
if(typeof ah=="number"){
this._autoHeight=(ah>=this.get("rowCount"));
}else{
this._autoHeight=false;
}
}
if(this._started&&!_11c1){
this.render();
}
},_getRowCountAttr:function(){
return this.updating&&this.invalidated&&this.invalidated.rowCount!=undefined?this.invalidated.rowCount:this.rowCount;
},textSizeChanged:function(){
this.render();
},sizeChange:function(){
this.update();
},createManagers:function(){
this.rows=new _11b4(this);
this.focus=new _11b5(this);
this.edit=new _11b6(this);
},createSelection:function(){
this.selection=new _11b7(this);
},createScroller:function(){
this.scroller=new _11b0();
this.scroller.grid=this;
this.scroller.renderRow=lang.hitch(this,"renderRow");
this.scroller.removeRow=lang.hitch(this,"rowRemoved");
},createLayout:function(){
this.layout=new this._layoutClass(this);
this.connect(this.layout,"moveColumn","onMoveColumn");
},onMoveColumn:function(){
this.update();
},onResizeColumn:function(_11c2){
},createViews:function(){
this.views=new _11b3(this);
this.views.createView=lang.hitch(this,"createView");
},createView:function(_11c3,idx){
var c=lang.getObject(_11c3);
var view=new c({grid:this,index:idx});
this.viewsNode.appendChild(view.domNode);
this.viewsHeaderNode.appendChild(view.headerNode);
this.views.addView(view);
html.attr(this.domNode,"align",this.isLeftToRight()?"left":"right");
return view;
},buildViews:function(){
for(var i=0,vs;(vs=this.layout.structure[i]);i++){
this.createView(vs.type||dojox._scopeName+".grid._View",i).setStructure(vs);
}
this.scroller.setContentNodes(this.views.getContentNodes());
},_setStructureAttr:function(_11c4){
var s=_11c4;
if(s&&lang.isString(s)){
dojo.deprecated("dojox.grid._Grid.set('structure', 'objVar')","use dojox.grid._Grid.set('structure', objVar) instead","2.0");
s=lang.getObject(s);
}
this.structure=s;
if(!s){
if(this.layout.structure){
s=this.layout.structure;
}else{
return;
}
}
this.views.destroyViews();
this.focus.focusView=null;
if(s!==this.layout.structure){
this.layout.setStructure(s);
}
this._structureChanged();
},setStructure:function(_11c5){
dojo.deprecated("dojox.grid._Grid.setStructure(obj)","use dojox.grid._Grid.set('structure', obj) instead.","2.0");
this._setStructureAttr(_11c5);
},getColumnTogglingItems:function(){
var items,_11c6=[];
items=array.map(this.layout.cells,function(cell){
if(!cell.menuItems){
cell.menuItems=[];
}
var self=this;
var item=new _11bb({label:cell.name,checked:!cell.hidden,_gridCell:cell,onChange:function(_11c7){
if(self.layout.setColumnVisibility(this._gridCell.index,_11c7)){
var items=this._gridCell.menuItems;
if(items.length>1){
array.forEach(items,function(item){
if(item!==this){
item.setAttribute("checked",_11c7);
}
},this);
}
_11c7=array.filter(self.layout.cells,function(c){
if(c.menuItems.length>1){
array.forEach(c.menuItems,"item.set('disabled', false);");
}else{
c.menuItems[0].set("disabled",false);
}
return !c.hidden;
});
if(_11c7.length==1){
array.forEach(_11c7[0].menuItems,"item.set('disabled', true);");
}
}
},destroy:function(){
var index=array.indexOf(this._gridCell.menuItems,this);
this._gridCell.menuItems.splice(index,1);
delete this._gridCell;
_11bb.prototype.destroy.apply(this,arguments);
}});
cell.menuItems.push(item);
if(!cell.hidden){
_11c6.push(item);
}
return item;
},this);
if(_11c6.length==1){
_11c6[0].set("disabled",true);
}
return items;
},_setHeaderMenuAttr:function(menu){
if(this._placeholders&&this._placeholders.length){
array.forEach(this._placeholders,function(p){
p.unReplace(true);
});
this._placeholders=[];
}
if(this.headerMenu){
this.headerMenu.unBindDomNode(this.viewsHeaderNode);
}
this.headerMenu=menu;
if(!menu){
return;
}
this.headerMenu.bindDomNode(this.viewsHeaderNode);
if(this.headerMenu.getPlaceholders){
this._placeholders=this.headerMenu.getPlaceholders(this.placeholderLabel);
}
},setHeaderMenu:function(menu){
dojo.deprecated("dojox.grid._Grid.setHeaderMenu(obj)","use dojox.grid._Grid.set('headerMenu', obj) instead.","2.0");
this._setHeaderMenuAttr(menu);
},setupHeaderMenu:function(){
if(this._placeholders&&this._placeholders.length){
array.forEach(this._placeholders,function(p){
if(p._replaced){
p.unReplace(true);
}
p.replace(this.getColumnTogglingItems());
},this);
}
},_fetch:function(start){
this.setScrollTop(0);
},getItem:function(_11c8){
return null;
},showMessage:function(_11c9){
if(_11c9){
this.messagesNode.innerHTML=_11c9;
this.messagesNode.style.display="";
}else{
this.messagesNode.innerHTML="";
this.messagesNode.style.display="none";
}
},_structureChanged:function(){
this.buildViews();
if(this.autoRender&&this._started){
this.render();
}
},hasLayout:function(){
return this.layout.cells.length;
},resize:function(_11ca,_11cb){
if(dojo.isIE&&!_11ca&&!_11cb&&this._autoHeight){
return;
}
this._pendingChangeSize=_11ca;
this._pendingResultSize=_11cb;
this.sizeChange();
},_getPadBorder:function(){
this._padBorder=this._padBorder||html._getPadBorderExtents(this.domNode);
return this._padBorder;
},_getHeaderHeight:function(){
var vns=this.viewsHeaderNode.style,t=vns.display=="none"?0:this.views.measureHeader();
vns.height=t+"px";
this.views.normalizeHeaderNodeHeight();
return t;
},_resize:function(_11cc,_11cd){
_11cc=_11cc||this._pendingChangeSize;
_11cd=_11cd||this._pendingResultSize;
delete this._pendingChangeSize;
delete this._pendingResultSize;
if(!this.domNode){
return;
}
var pn=this.domNode.parentNode;
if(!pn||pn.nodeType!=1||!this.hasLayout()||pn.style.visibility=="hidden"||pn.style.display=="none"){
return;
}
var _11ce=this._getPadBorder();
var hh=undefined;
var h;
if(this._autoHeight){
this.domNode.style.height="auto";
}else{
if(typeof this.autoHeight=="number"){
h=hh=this._getHeaderHeight();
h+=(this.scroller.averageRowHeight*this.autoHeight);
this.domNode.style.height=h+"px";
}else{
if(this.domNode.clientHeight<=_11ce.h){
if(pn==document.body){
this.domNode.style.height=this.defaultHeight;
}else{
if(this.height){
this.domNode.style.height=this.height;
}else{
this.fitTo="parent";
}
}
}
}
}
if(_11cd){
_11cc=_11cd;
}
if(!this._autoHeight&&_11cc){
html.marginBox(this.domNode,_11cc);
this.height=this.domNode.style.height;
delete this.fitTo;
}else{
if(this.fitTo=="parent"){
h=this._parentContentBoxHeight=this._parentContentBoxHeight||html._getContentBox(pn).h;
this.domNode.style.height=Math.max(0,h)+"px";
}
}
var _11cf=array.some(this.views.views,function(v){
return v.flexCells;
});
if(!this._autoHeight&&(h||html._getContentBox(this.domNode).h)===0){
this.viewsHeaderNode.style.display="none";
}else{
this.viewsHeaderNode.style.display="block";
if(!_11cf&&hh===undefined){
hh=this._getHeaderHeight();
}
}
if(_11cf){
hh=undefined;
}
this.adaptWidth();
this.adaptHeight(hh);
this.postresize();
},adaptWidth:function(){
var _11d0=(!this.initialWidth&&this.autoWidth);
var w=_11d0?0:this.domNode.clientWidth||(this.domNode.offsetWidth-this._getPadBorder().w),vw=this.views.arrange(1,w);
this.views.onEach("adaptWidth");
if(_11d0){
this.domNode.style.width=vw+"px";
}
},adaptHeight:function(_11d1){
var t=_11d1===undefined?this._getHeaderHeight():_11d1;
var h=(this._autoHeight?-1:Math.max(this.domNode.clientHeight-t,0)||0);
this.views.onEach("setSize",[0,h]);
this.views.onEach("adaptHeight");
if(!this._autoHeight){
var _11d2=0,_11d3=0;
var _11d4=array.filter(this.views.views,function(v){
var has=v.hasHScrollbar();
if(has){
_11d2++;
}else{
_11d3++;
}
return (!has);
});
if(_11d2>0&&_11d3>0){
array.forEach(_11d4,function(v){
v.adaptHeight(true);
});
}
}
if(this.autoHeight===true||h!=-1||(typeof this.autoHeight=="number"&&this.autoHeight>=this.get("rowCount"))){
this.scroller.windowHeight=h;
}else{
this.scroller.windowHeight=Math.max(this.domNode.clientHeight-t,0);
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(this.autoRender){
this.render();
}
},render:function(){
if(!this.domNode){
return;
}
if(!this._started){
return;
}
if(!this.hasLayout()){
this.scroller.init(0,this.keepRows,this.rowsPerPage);
return;
}
this.update=this.defaultUpdate;
this._render();
},_render:function(){
this.scroller.init(this.get("rowCount"),this.keepRows,this.rowsPerPage);
this.prerender();
this.setScrollTop(0);
this.postrender();
},prerender:function(){
this.keepRows=this._autoHeight?0:this.keepRows;
this.scroller.setKeepInfo(this.keepRows);
this.views.render();
this._resize();
},postrender:function(){
this.postresize();
this.focus.initFocusView();
html.setSelectable(this.domNode,this.selectable);
},postresize:function(){
if(this._autoHeight){
var size=Math.max(this.views.measureContent())+"px";
this.viewsNode.style.height=size;
}
},renderRow:function(_11d5,_11d6){
this.views.renderRow(_11d5,_11d6,this._skipRowRenormalize);
},rowRemoved:function(_11d7){
this.views.rowRemoved(_11d7);
},invalidated:null,updating:false,beginUpdate:function(){
this.invalidated=[];
this.updating=true;
},endUpdate:function(){
this.updating=false;
var i=this.invalidated,r;
if(i.all){
this.update();
}else{
if(i.rowCount!=undefined){
this.updateRowCount(i.rowCount);
}else{
for(r in i){
this.updateRow(Number(r));
}
}
}
this.invalidated=[];
},defaultUpdate:function(){
if(!this.domNode){
return;
}
if(this.updating){
this.invalidated.all=true;
return;
}
this.lastScrollTop=this.scrollTop;
this.prerender();
this.scroller.invalidateNodes();
this.setScrollTop(this.lastScrollTop);
this.postrender();
},update:function(){
this.render();
},updateRow:function(_11d8){
_11d8=Number(_11d8);
if(this.updating){
this.invalidated[_11d8]=true;
}else{
this.views.updateRow(_11d8);
this.scroller.rowHeightChanged(_11d8);
}
},updateRows:function(_11d9,_11da){
_11d9=Number(_11d9);
_11da=Number(_11da);
var i;
if(this.updating){
for(i=0;i<_11da;i++){
this.invalidated[i+_11d9]=true;
}
}else{
for(i=0;i<_11da;i++){
this.views.updateRow(i+_11d9,this._skipRowRenormalize);
}
this.scroller.rowHeightChanged(_11d9);
}
},updateRowCount:function(_11db){
if(this.updating){
this.invalidated.rowCount=_11db;
}else{
this.rowCount=_11db;
this._setAutoHeightAttr(this.autoHeight,true);
if(this.layout.cells.length){
this.scroller.updateRowCount(_11db);
}
this._resize();
if(this.layout.cells.length){
this.setScrollTop(this.scrollTop);
}
}
},updateRowStyles:function(_11dc){
this.views.updateRowStyles(_11dc);
},getRowNode:function(_11dd){
if(this.focus.focusView&&!(this.focus.focusView instanceof _11b8)){
return this.focus.focusView.rowNodes[_11dd];
}else{
for(var i=0,cView;(cView=this.views.views[i]);i++){
if(!(cView instanceof _11b8)){
return cView.rowNodes[_11dd];
}
}
}
return null;
},rowHeightChanged:function(_11de){
this.views.renormalizeRow(_11de);
this.scroller.rowHeightChanged(_11de);
},fastScroll:true,delayScroll:false,scrollRedrawThreshold:(has("ie")?100:50),scrollTo:function(inTop){
if(!this.fastScroll){
this.setScrollTop(inTop);
return;
}
var delta=Math.abs(this.lastScrollTop-inTop);
this.lastScrollTop=inTop;
if(delta>this.scrollRedrawThreshold||this.delayScroll){
this.delayScroll=true;
this.scrollTop=inTop;
this.views.setScrollTop(inTop);
if(this._pendingScroll){
window.clearTimeout(this._pendingScroll);
}
var _11df=this;
this._pendingScroll=window.setTimeout(function(){
delete _11df._pendingScroll;
_11df.finishScrollJob();
},200);
}else{
this.setScrollTop(inTop);
}
},finishScrollJob:function(){
this.delayScroll=false;
this.setScrollTop(this.scrollTop);
},setScrollTop:function(inTop){
this.scroller.scroll(this.views.setScrollTop(inTop));
},scrollToRow:function(_11e0){
this.setScrollTop(this.scroller.findScrollTop(_11e0)+1);
},styleRowNode:function(_11e1,_11e2){
if(_11e2){
this.rows.styleRowNode(_11e1,_11e2);
}
},_mouseOut:function(e){
this.rows.setOverRow(-2);
},getCell:function(_11e3){
return this.layout.cells[_11e3];
},setCellWidth:function(_11e4,_11e5){
this.getCell(_11e4).unitWidth=_11e5;
},getCellName:function(_11e6){
return "Cell "+_11e6.index;
},canSort:function(_11e7){
},sort:function(){
},getSortAsc:function(_11e8){
_11e8=_11e8==undefined?this.sortInfo:_11e8;
return Boolean(_11e8>0);
},getSortIndex:function(_11e9){
_11e9=_11e9==undefined?this.sortInfo:_11e9;
return Math.abs(_11e9)-1;
},setSortIndex:function(_11ea,inAsc){
var si=_11ea+1;
if(inAsc!=undefined){
si*=(inAsc?1:-1);
}else{
if(this.getSortIndex()==_11ea){
si=-this.sortInfo;
}
}
this.setSortInfo(si);
},setSortInfo:function(_11eb){
if(this.canSort(_11eb)){
this.sortInfo=_11eb;
this.sort();
this.update();
}
},doKeyEvent:function(e){
e.dispatch="do"+e.type;
this.onKeyEvent(e);
},_dispatch:function(m,e){
if(m in this){
return this[m](e);
}
return false;
},dispatchKeyEvent:function(e){
this._dispatch(e.dispatch,e);
},dispatchContentEvent:function(e){
this.edit.dispatchEvent(e)||e.sourceView.dispatchContentEvent(e)||this._dispatch(e.dispatch,e);
},dispatchHeaderEvent:function(e){
e.sourceView.dispatchHeaderEvent(e)||this._dispatch("doheader"+e.type,e);
},dokeydown:function(e){
this.onKeyDown(e);
},doclick:function(e){
if(e.cellNode){
this.onCellClick(e);
}else{
this.onRowClick(e);
}
},dodblclick:function(e){
if(e.cellNode){
this.onCellDblClick(e);
}else{
this.onRowDblClick(e);
}
},docontextmenu:function(e){
if(e.cellNode){
this.onCellContextMenu(e);
}else{
this.onRowContextMenu(e);
}
},doheaderclick:function(e){
if(e.cellNode){
this.onHeaderCellClick(e);
}else{
this.onHeaderClick(e);
}
},doheaderdblclick:function(e){
if(e.cellNode){
this.onHeaderCellDblClick(e);
}else{
this.onHeaderDblClick(e);
}
},doheadercontextmenu:function(e){
if(e.cellNode){
this.onHeaderCellContextMenu(e);
}else{
this.onHeaderContextMenu(e);
}
},doStartEdit:function(_11ec,_11ed){
this.onStartEdit(_11ec,_11ed);
},doApplyCellEdit:function(_11ee,_11ef,_11f0){
this.onApplyCellEdit(_11ee,_11ef,_11f0);
},doCancelEdit:function(_11f1){
this.onCancelEdit(_11f1);
},doApplyEdit:function(_11f2){
this.onApplyEdit(_11f2);
},addRow:function(){
this.updateRowCount(this.get("rowCount")+1);
},removeSelectedRows:function(){
if(this.allItemsSelected){
this.updateRowCount(0);
}else{
this.updateRowCount(Math.max(0,this.get("rowCount")-this.selection.getSelected().length));
}
this.selection.clear();
}});
_11bf.markupFactory=function(props,node,ctor,_11f3){
var _11f4=function(n){
var w=html.attr(n,"width")||"auto";
if((w!="auto")&&(w.slice(-2)!="em")&&(w.slice(-1)!="%")){
w=parseInt(w,10)+"px";
}
return w;
};
if(!props.structure&&node.nodeName.toLowerCase()=="table"){
props.structure=query("> colgroup",node).map(function(cg){
var sv=html.attr(cg,"span");
var v={noscroll:(html.attr(cg,"noscroll")=="true")?true:false,__span:(!!sv?parseInt(sv,10):1),cells:[]};
if(html.hasAttr(cg,"width")){
v.width=_11f4(cg);
}
return v;
});
if(!props.structure.length){
props.structure.push({__span:Infinity,cells:[]});
}
query("thead > tr",node).forEach(function(tr,_11f5){
var _11f6=0;
var _11f7=0;
var _11f8;
var cView=null;
query("> th",tr).map(function(th){
if(!cView){
_11f8=0;
cView=props.structure[0];
}else{
if(_11f6>=(_11f8+cView.__span)){
_11f7++;
_11f8+=cView.__span;
var _11f9=cView;
cView=props.structure[_11f7];
}
}
var cell={name:lang.trim(html.attr(th,"name")||th.innerHTML),colSpan:parseInt(html.attr(th,"colspan")||1,10),type:lang.trim(html.attr(th,"cellType")||""),id:lang.trim(html.attr(th,"id")||"")};
_11f6+=cell.colSpan;
var _11fa=html.attr(th,"rowspan");
if(_11fa){
cell.rowSpan=_11fa;
}
if(html.hasAttr(th,"width")){
cell.width=_11f4(th);
}
if(html.hasAttr(th,"relWidth")){
cell.relWidth=window.parseInt(html.attr(th,"relWidth"),10);
}
if(html.hasAttr(th,"hidden")){
cell.hidden=(html.attr(th,"hidden")=="true"||html.attr(th,"hidden")===true);
}
if(_11f3){
_11f3(th,cell);
}
cell.type=cell.type?lang.getObject(cell.type):dojox.grid.cells.Cell;
if(cell.type&&cell.type.markupFactory){
cell.type.markupFactory(th,cell);
}
if(!cView.cells[_11f5]){
cView.cells[_11f5]=[];
}
cView.cells[_11f5].push(cell);
});
});
}
return new ctor(props,node);
};
return _11bf;
});
},"davinci/ve/input/SmartInput":function(){
define(["dojo/_base/declare","dojo/dom-geometry","davinci/ve/commands/ModifyRichTextCommand","dijit/layout/ContentPane","dijit/form/SimpleTextarea","dijit/form/TextBox","dojox/html/entities","dojox/html/ellipsis","dojox/layout/ResizeHandle","dojo/i18n!davinci/ve/nls/ve","dojo/i18n!dijit/nls/common"],function(_11fb,_11fc,_11fd,_11fe,_11ff,_1200,_1201,_1202,_1203,veNls,_1204){
return _11fb("davinci.ve.input.SmartInput",null,{property:null,_X_MOVE_RANGE:10,_Y_MOVE_RANGE:10,_POINTER_TOP_OFFSET:-13,multiLine:"false",displayOnCreate:"true",_connection:[],getHelpText:function(){
if(this.helpText){
return this.helpText;
}
if(this.isHtmlSupported()){
return veNls.smartInputHelp1;
}
return veNls.smartInputHelp2;
},isHtmlSupported:function(){
if(!this.supportsHTML){
if(this._widget.type.match("^html")=="html"){
this.supportsHTML="true";
}else{
this.supportsHTML="false";
}
}
if(typeof (this.supportsHTML)==="boolean"){
return this.supportsHTML;
}
if(this.supportsHTML==="true"){
return true;
}else{
return false;
}
},parse:function(input){
return input;
},parseItems:function(input){
if(this.trim){
input=dojo.trim(input);
}
var items;
if(input.match(/[^\\][\r\n]/)){
items=this.parseItemsInRows(input);
}else{
items=this.parseItemsInColumns(input);
}
return items;
},parseItemsInRows:function(input){
var items=this.splitRows(input);
var _1205=items.length;
for(var i=0;i<_1205;i++){
var item=items[i];
item=this.parseItem(item);
items[i]=item;
}
return items;
},parseItemsInColumns:function(input){
var items=this.splitColumns(input);
var _1206=items.length;
for(var i=0;i<_1206;i++){
var item=items[i];
item=this.parseItem(item);
items[i]=item;
}
return items;
},parseGrid:function(input){
var rows=this.splitRows(input);
var _1207=rows.length;
for(var i=0;i<_1207;i++){
var row=rows[i];
var items=this.parseItemsInColumns(row);
rows[i]=items;
}
return rows;
},parseItem:function(item){
var regex=/^([-~!>|(*)[+\]]*) ?(.*)$/;
var _1208=null;
var text=item;
var _1209=item.match(regex);
if(_1209){
_1208=_1209[1];
text=_1209[2];
}
var _120a=0;
var _120b=false;
var _120c=false;
var _120d=false;
if(_1208){
for(var i=0;i<_1208.length;i++){
var c=_1208[i];
switch(c){
case "-":
case "~":
case "!":
_120b=true;
break;
case ">":
_120a++;
break;
case "*":
case "+":
_120c=true;
break;
default:
}
}
}
var _120e={original:item,specialChars:_1208,text:text,indent:_120a,disabled:_120b,selected:_120c};
return _120e;
},splitRows:function(text){
var split=[];
var i;
var line="";
var _120f=false;
for(i=0;i<text.length;i++){
var c=text.charAt(i);
switch(c){
case "\\":
if(_120f){
line+=c;
}
_120f=!_120f;
break;
case "r":
if(_120f){
line+="\r";
_120f=false;
}else{
line+=c;
}
break;
case "n":
if(_120f){
line+="\n";
_120f=false;
}else{
line+=c;
}
break;
case "\r":
case "\n":
if(_120f){
line+=c;
_120f=false;
}else{
if(this.trim){
line=dojo.trim(line);
}
split.push(line);
line="";
}
break;
default:
line+=c;
_120f=false;
}
}
if(line){
if(this.trim){
line=dojo.trim(line);
}
split.push(line);
}
return split;
},splitColumns:function(text){
var split=[];
var i;
var line="";
var _1210=false;
for(i=0;i<text.length;i++){
var c=text.charAt(i);
switch(c){
case "\\":
if(_1210){
line+=c;
}
_1210=!_1210;
break;
case "r":
if(_1210){
line+="\r";
_1210=false;
}else{
line+=c;
}
break;
case "n":
if(_1210){
line+="\n";
_1210=false;
}else{
line+=c;
}
break;
case ",":
if(_1210){
line+=c;
_1210=false;
}else{
if(this.trim){
line=dojo.trim(line);
}
split.push(line);
line="";
}
break;
default:
line+=c;
_1210=false;
}
}
if(line){
if(this.trim){
line=dojo.trim(line);
}
split.push(line);
}
return split;
},serializeItems:function(items){
var _1211=this.format=="columns"?this.serializeColumns(items):this.serializeRows(items);
return _1211;
},serializeColumns:function(items){
for(var i=0;i<items.length;i++){
var item=items[i];
item=item.replace(/\\/g,"\\\\");
items[i]=item.replace(/,/g,"\\,");
}
var _1212=items.join(", ");
return _1212;
},serializeRows:function(items){
for(var i=0;i<items.length;i++){
var item=items[i];
item=item.replace(/\\/g,"\\\\");
items[i]=item.replace(/\n/g,"\\\n");
}
var _1213=items.join("\n");
return _1213;
},inlineEditActive:function(){
if(this._inline&&this._inline.style.display!="none"&&this._inline.eb){
return true;
}else{
return false;
}
},show:function(_1214){
this._widget=davinci.ve.widget.byId(_1214);
if(!this._inline){
this._createInline();
}
var _1215=dojo.hitch(this,function(value){
this._inline.style.display="block";
this.setFormat(value);
var _1216=[["&","amp"],["\"","quot"],["<","lt"],[">","gt"]];
value=_1201.decode(value,_1216);
this._inline.eb.set("value",String(value));
this.updateFormats();
this.help(false);
dijit.selectInputText(this._inline.eb.textbox);
this.updateSimStyle();
this._inline.eb.textbox.focus();
});
var node=this._node(this._widget);
var _1217=this.property;
var _1218=(_1217==="maq_innerText")?"innerHTML":_1217;
var value;
if(_1217){
if(node){
value=dojo.attr(node,_1218);
}else{
if(_1218==="innerHTML"||_1218=="textContent"){
value=this._widget._srcElement.getElementText(this._context);
value=value.replace(/\s+/g," ");
}else{
value=this._widget.attr(_1217);
}
}
}
if(this.serialize){
this.serialize(node||this._widget,_1215,value);
}else{
if(_1217){
_1215(value);
}
}
},_createInline:function(){
if(this.multiLine&&this.multiLine!="false"){
this._loading(115,200);
var t=this._getTemplate();
this._inline.set("content",t);
}else{
this._loading(85,200);
var t=this._getTemplate();
this._inline.set("content",t);
}
this._inline.eb=dijit.byId("davinciIleb");
this._connection.push(dojo.connect(this._inline.eb,"onMouseDown",this,"stopEvent"));
this._connection.push(dojo.connect(this._inline.eb,"onKeyDown",this,"stopEvent"));
this._connection.push(dojo.connect(this._inline.eb,"onKeyUp",this,"handleEvent"));
if(this.multiLine=="true"){
this._connection.push(dojo.connect(this._inline.eb,"onBlur",this,"onBlur"));
this._connectSimDiv();
}
var text=this._widget._srcElement.getElementText(this._context);
this._inline.eb.setValue(text);
this._loadingDiv.style.backgroundImage="none";
this._inline._setStyleAttr({display:"block"});
this._connectHelpDiv();
this._connectResizeHandle();
window.setTimeout(function(){
this._inline.eb.textbox.focus();
this._connection.push(dojo.connect(this._inline,"onBlur",this,"onOk"));
}.bind(this),500);
this.resize(null);
},_connectHelpDiv:function(){
var help=dojo.byId("davinci.ve.input.SmartInput_img_help");
this._connection.push(dojo.connect(help,"onclick",this,"toggleHelp"));
this._connection.push(dojo.connect(dijit.byId("davinci.ve.input.SmartInput_ok"),"_onSubmit",this,"onOk"));
this._connection.push(dojo.connect(dijit.byId("davinci.ve.input.SmartInput_cancel"),"onClick",this,"onCancel"));
},_findSmartInputContainer:function(_1219){
return document.body;
var _121a=_1219.parentNode;
while(!dojo.hasClass(_121a,"dijitContentPane")){
_121a=_121a.parentNode;
}
return _121a;
},_loading:function(_121b,width){
var _121c=this._widget._edit_context.frameNode;
var doc=_121c.ownerDocument;
var _121d=doc.createElement("div");
var _121e=this._findSmartInputContainer(_121c);
if(!_121e){
return;
}
_121e.appendChild(_121d);
this._loadingDiv=_121d;
dojo.addClass(_121d,"smartInputLoading");
var _121f=doc.createElement("div");
_121f.id="ieb";
dojo.addClass(_121f,"inlineEdit dijitTooltipContainer");
var _1220=doc.createElement("div");
_1220.id="iebPointer";
this._inline=_121f;
_121e.appendChild(_121f);
_121e.appendChild(_1220);
var m2=new dojo.dnd.Moveable("ieb");
this._connection.push(dojo.connect(m2,"onMoveStart",this,"onMoveStart"));
this._connection.push(dojo.connect(m2,"onMoveStop",this,"onMoveStop"));
var _1221=new _11fe({},_121f);
this._inline=_1221;
var _1222=dijit.byId("editorsStackContainer").domNode;
var p=_11fc.position(_1222);
this._loadingDiv.style.position="absolute";
this._loadingDiv.style.left=p.x+"px";
this._loadingDiv.style.top=p.y+"px";
this._loadingDiv.style.width=p.w+"px";
this._loadingDiv.style.height=p.h+"px";
var box=this._widget.getMarginBox();
var _1223=dojo.position(_121c);
var _1224=dojo.position(_121e);
var _1225=(_1223.x-_1224.x)+_121e.scrollLeft-1;
var _1226=(_1223.y-_1224.y)+_121e.scrollTop-1;
var _1227=_121e.clientHeight;
var _1228=_121e.clientWidth;
var _1229=26;
var top=_1229;
var _122a=0;
if((box.y+_121b+_1229)<_1227){
top=box.y+_1229;
dojo.addClass(_1220,"inlineEditConnectorBelow");
}else{
if((box.y-_121b)>0){
top=box.y-_121b;
_122a=_121b+12;
}else{
top=0+_1229;
}
}
var left="0";
if((box.x+width+20)<_1228){
left=box.x;
}else{
if((box.x+width)>_1228){
var t=box.x-width+box.w;
if(t<0){
t=0;
}
left=t;
}
}
left+=_1225;
top+=_1226;
this._inline._setStyleAttr({display:"block",top:top+"px",left:left+"px",padding:"1px",overflow:"hidden",backgroundImage:"none"});
this._startTop=top;
this._startLeft=left;
dojo.style(_1220,"left",box.x+20+_1225+"px");
dojo.style(_1220,"top",top+_122a+this._POINTER_TOP_OFFSET+"px");
},handleEvent:function(event){
switch(event.keyCode){
case 13:
var _122b=this.multiLine;
if(!_122b||_122b=="false"||this._lastKeyCode==13||event.ctrlKey){
this.onOk();
}else{
if(event.which==dojo.keys.ENTER&&event.ctrlKey){
this.onOk();
}
}
break;
case 27:
this.onCancel();
break;
default:
this.updateFormats();
}
this._lastKeyCode=event.keyCode;
this.updateSimStyle();
},onOk:function(e){
this.hide();
},onCancel:function(e){
this.hide(true);
},onMoveStart:function(mover){
dojo.style("iebPointer","display","none");
},onMoveStop:function(mover){
var left=dojo.style("ieb","left");
var top=dojo.style("ieb","top");
var _122c=this._startLeft-left;
var _122d=top-this._startTop;
if(_122d<this._Y_MOVE_RANGE&&_122d>(-this._Y_MOVE_RANGE)){
dojo.style("iebPointer","display","");
dojo.style("iebPointer","top",this._startTop+this._POINTER_TOP_OFFSET+_122d+"px");
}else{
dojo.style("iebPointer","display","none");
return;
}
if(_122c<this._X_MOVE_RANGE&&_122c>(-this._X_MOVE_RANGE)){
dojo.style("iebPointer","display","");
}else{
dojo.style("iebPointer","display","none");
return;
}
},stopEvent:function(e){
e.stopPropagation();
this.updateSimStyle();
},_node:function(){
var node;
var path=this.path;
var _122e=this.selector;
if(path||_122e){
node=this._widget.domNode;
if(path){
node=dojo.getObject(path,false,this._widget);
}
if(_122e){
node=dojo.query(_122e,node)[0];
}
}
return node;
},updateWidget:function(value){
if(this._widget._destroyed){
return;
}
if(this.parse){
value=this.parse(value);
}
var node=this._node(this._widget);
var _122f=this._widget.getContext();
var _1230=this.property;
var _1231=(_1230==="maq_innerText")?"innerHTML":_1230;
if(this.update){
var _1232=this.update(node||this._widget,value,_1230);
if(_1232){
this._widget=_1232;
}
_122f.select(this._widget,null,false);
}else{
if(_1230){
if(node){
dojo.attr(node,_1231,value);
}else{
var _1233={};
if(value&&(typeof value=="string")){
value=value.replace(/\n/g,"");
}
var _1234=null;
if(_1230=="textContent"){
_1234=value;
}else{
_1233[_1230]=value;
}
var _1235;
if(_1231==="innerHTML"){
_1233.richText=_1233[_1230];
delete _1233[_1230];
_1235=new _11fd(this._widget,_1233,null,_122f);
}else{
_1235=new davinci.ve.commands.ModifyCommand(this._widget,_1233,_1234,_122f);
}
this._widget._edit_context.getCommandStack().execute(_1235);
this._widget=_1235.newWidget;
this._widget._edit_context._focuses[0]._selectedWidget=this._widget;
}
_122f.select(this._widget,null,false);
}
}
},hide:function(_1236){
if(this._inline){
var value;
while(connection=this._connection.pop()){
if(connection){
dojo.disconnect(connection);
}
}
var _1237=this._findSmartInputContainer(this._widget._edit_context.frameNode);
if(!_1237){
return;
}
if(this._loadingDiv){
_1237.removeChild(this._loadingDiv);
}
if(this._inline.style.display!="none"&&this._inline.eb){
value=this._inline.eb.get("value");
this._value=value;
this._format=this.getFormat();
this._inline.style.display="none";
if(this._inline.eb){
this._inline.eb.destroyRecursive();
delete this._inline.eb;
}
this._inline.destroyRecursive();
delete this._inline;
var _1238=_1237.ownerDocument.getElementById("iebPointer");
_1237.removeChild(_1238);
if(value!=null&&!_1236){
if(!this.disableEncode&&this._format==="text"){
value=_1201.encode(value);
}
this.updateWidget(value);
}
var _1239=this._widget.getContext();
var _123a=_1239.getDocument();
_123a.defaultView.focus();
}
}
},getFormat:function(){
var _123b=dijit.byId("davinci.ve.input.SmartInput_radio_html");
var _123c="text";
if(_123b&&_123b.checked){
_123c="html";
}
return _123c;
},containsHtmlMarkUp:function(str){
var n=dojo.create("div",{innerHTML:str});
if(n.children.length>0){
return true;
}else{
return false;
}
},toggleHelp:function(){
var help=dojo.byId("davinci.ve.input.SmartInput_img_help");
if(dojo.hasClass(help,"inlineEditHelpSelected")){
this.help(false);
}else{
this.help(true);
}
dojo.toggleClass(help,"inlineEditHelpSelected");
},setFormat:function(value){
var _123d=dijit.byId("davinci.ve.input.SmartInput_radio_html");
var _123e=dijit.byId("davinci.ve.input.SmartInput_radio_text");
var n=dojo.create("div",{innerHTML:value});
var _123f=n.children.length?"html":"text";
if(_123f==="html"){
_123d.set("checked",true);
_123e.set("checked",false);
}else{
_123d.set("checked",false);
_123e.set("checked",true);
}
this._format=_123f;
},help:function(_1240){
var _1241=dojo.byId("davinci.ve.input.SmartInput_div_help");
var _1242=dojo.byId("davinci.ve.input.SmartInput_radio_div");
if(_1240){
dojo.style(_1241,"display","");
}else{
dojo.style(_1241,"display","none");
}
},updateFormats:function(){
var value=this._inline.eb.get("value");
var _1243=true;
if(this.containsHtmlMarkUp(value)){
_1243=false;
}
var _1244=this._widget.getContext().getDojo();
var _1245=dojo.byId("davinci.ve.input.SmartInput_radio_text_width_div");
var what=_1201.encode(value);
_1245.innerHTML="<div class=\"dojoxEllipsis\">"+dojo.replace("Plain text ({0})",[what])+"</div>";
var _1246=dojo.byId("davinci.ve.input.SmartInput_radio_html_width_div");
_1246.innerHTML="<div id=\"davinci.ve.input.SmartInput_radio_html_div\" class=\"dojoxEllipsis\">"+veNls.htmlMarkup+"</div>";
var _1247=dijit.byId("davinci.ve.input.SmartInput_radio_html");
var _1248=dijit.byId("davinci.ve.input.SmartInput_radio_text");
var table=dojo.byId("davinci.ve.input.SmartInput_table");
_1247.setDisabled(_1243);
_1248.setDisabled(_1243);
if(_1243){
dojo.addClass(_1245,"inlineEditDisabled");
dojo.addClass(_1246,"inlineEditDisabled");
_1247.set("checked",false);
_1248.set("checked",true);
}else{
dojo.removeClass(_1245,"inlineEditDisabled");
dojo.removeClass(_1246,"inlineEditDisabled");
}
if(!_1243&&this.isHtmlSupported()){
dojo.style(_1248.domNode,"display","");
dojo.style(_1247.domNode,"display","");
dojo.style(_1246,"display","");
dojo.style(_1245,"display","");
dojo.style(table,"display","");
}else{
dojo.style(_1248.domNode,"display","none");
dojo.style(_1247.domNode,"display","none");
dojo.style(_1246,"display","none");
dojo.style(_1245,"display","none");
dojo.style(table,"display","none");
}
},resize:function(e){
var _1249=dojo.byId("iedResizeDiv");
var _124a=dijit.byId("davinciIleb");
var _124b=_1249.clientWidth-5;
var _124c=_1249.clientHeight-6;
var _124d=_1249.clientWidth-10;
_124b=_1249.clientWidth-8;
_124c=_1249.clientHeight-20;
_124d=_1249.clientWidth-9;
var _124e=dojo.byId("smartInputSim");
dojo.style(_124e,"width",_124b+10+"px");
this.updateSimStyle();
if(_124a){
_124a._setStyleAttr({width:_124b+"px",height:_124c+"px",maxHeight:_124c+"px"});
_124a._setStyleAttr({width:_1249.clientWidth+"px"});
}
var obj=dojo.byId("davinci.ve.input.SmartInput_radio_div");
dojo.style(obj,"width",_124d+2+"px");
obj=dojo.byId("davinci.ve.input.SmartInput_radio_text_width_div");
dojo.style(obj,"width",_1249.clientWidth-50+"px");
obj=dojo.byId("davinci.ve.input.SmartInput_radio_html_width_div");
dojo.style(obj,"width",_1249.clientWidth-50+"px");
},onBlur:function(e){
this.updateSimStyle(e);
},updateSimStyle:function(e){
var _124f=dijit.byId("davinciIleb");
var _1250=dojo.byId("smartInputSim");
if(_1250){
var s=dojo.style(_124f.domNode);
dojo.style(_1250,"borderColor",s.borderTopColor);
dojo.style(_1250,"backgroundColor",s.backgroundColor);
}
},_getTemplate:function(){
var _1251=""+"<div id=\"iedResizeDiv\" class=\"iedResizeDiv\" >"+"<textarea  dojoType=\"dijit.form.SimpleTextarea\" name=\"davinciIleb\" trim=\"true\" id=\"davinciIleb\" class=\"smartInputTextArea\" ></textarea>"+"<div id=\"smartInputSim\" class=\"smartInputSim\" ></div>"+"<div id=\"iedResizeHandle\" dojoType=\"dojox.layout.ResizeHandle\" targetId=\"iedResizeDiv\" constrainMin=\"true\" maxWidth=\"200\" maxHeight=\"600\" minWidth=\"200\" minHeight=\"55\"  activeResize=\"true\" intermediateChanges=\"true\" ></div>"+"</div>";
if(this.multiLine==="true"){
_1251=""+"<div id=\"iedResizeDiv\" class=\"iedResizeDiv\" >"+"<textarea  dojoType=\"dijit.form.SimpleTextarea\" name=\"davinciIleb\" trim=\"true\" id=\"davinciIleb\" class=\"smartInputTextAreaMulti\" ></textarea>"+"<div id=\"smartInputSim\" class=\"smartInputSim\" ></div>"+"<div id=\"iedResizeHandle\" dojoType=\"dojox.layout.ResizeHandle\" targetId=\"iedResizeDiv\" constrainMin=\"true\" maxWidth=\"200\" maxHeight=\"600\" minWidth=\"200\" minHeight=\"80\"  activeResize=\"true\" intermediateChanges=\"true\" ></div>"+"</div>";
}
var _1252=""+_1251+"<div  id=\"davinci.ve.input.SmartInput_div\"  class=\"davinciVeInputSmartInputDiv\" >"+"<div id=\"davinci.ve.input.SmartInput_radio_div\" class=\"smartInputRadioDiv\" >"+"<table id=\"davinci.ve.input.SmartInput_table\"> "+"<tbody>"+"<tr> "+"<td class=\"smartInputTd1\" > "+"<input id=\"davinci.ve.input.SmartInput_radio_text\" showlabel=\"true\" type=\"radio\" dojoType=\"dijit.form.RadioButton\" disabled=\"false\" readOnly=\"false\" intermediateChanges=\"false\" checked=\"true\"> </input> "+"</td> "+"<td class=\"smartInputTd2\" >"+"<div id=\"davinci.ve.input.SmartInput_radio_text_width_div\" class=\"smartInputRadioTextDiv\">"+"</div>"+"</td> "+"</tr>"+"<tr> "+"<td class=\"smartInputTd1\"> <input id=\"davinci.ve.input.SmartInput_radio_html\" showlabel=\"true\" type=\"radio\" dojoType=\"dijit.form.RadioButton\"> </input>  </td> "+"<td class=\"smartInputTd2\">"+"<div id=\"davinci.ve.input.SmartInput_radio_html_width_div\" class=\"smartInputRadioTextDiv\">"+"</div>"+"</td> "+"</tr> "+"</tbody>"+"</table> "+"<div class=\"smartInputHelpDiv\" > "+"<span id=\"davinci.ve.input.SmartInput_img_help\"  title=\"Help\" class=\"inlineEditHelp\" > </span>"+"<span class=\"smartInputSpacerSpan\" >"+"<button id=\"davinci.ve.input.SmartInput_ok\"  dojoType=\"dijit.form.Button\" type=\"submit\" class=\"inlineEditHelpOk\" >"+_1204.buttonOk+"</button> <button id=davinci.ve.input.SmartInput_cancel dojoType=\"dijit.form.Button\" class=\"inlineEditHelpCancel\"> "+_1204.buttonCancel+"</button>  "+"</span>   "+"</div> "+"<div id=\"davinci.ve.input.SmartInput_div_help\" style=\"display:none;\" class=\"smartInputHelpTextDiv\" > "+"<div dojoType=\"dijit.layout.ContentPane\" class=\"smartInputHelpTextDivContentPane \"style=\"padding:0;\" >"+this.getHelpText()+"</div> "+"<div style=\"text-align: left; padding:0; height:2px;\" ></div> "+"</div> "+"</div>"+"</div> "+"";
return _1252;
},_connectResizeHandle:function(){
var _1253=dijit.byId("iedResizeHandle");
this._connection.push(dojo.connect(_1253,"onResize",this,"resize"));
},_connectSimDiv:function(){
this._connection.push(dojo.connect(this._inline.eb,"onFocus",this,"updateSimStyle"));
this._connection.push(dojo.connect(this._inline.eb,"onMouseOver",this,"updateSimStyle"));
this._connection.push(dojo.connect(this._inline.eb,"onMouseOut",this,"updateSimStyle"));
this._connection.push(dojo.connect(dojo.byId(" davinci.ve.input.SmartInput_div"),"onclick",this,"updateSimStyle"));
}});
});
},"dojo/store/Memory":function(){
define(["../_base/declare","./util/QueryResults","./util/SimpleQueryEngine"],function(_1254,_1255,_1256){
var base=null;
return _1254("dojo.store.Memory",base,{constructor:function(_1257){
for(var i in _1257){
this[i]=_1257[i];
}
this.setData(this.data||[]);
},data:null,idProperty:"id",index:null,queryEngine:_1256,get:function(id){
return this.data[this.index[id]];
},getIdentity:function(_1258){
return _1258[this.idProperty];
},put:function(_1259,_125a){
var data=this.data,index=this.index,_125b=this.idProperty;
var id=_1259[_125b]=(_125a&&"id" in _125a)?_125a.id:_125b in _1259?_1259[_125b]:Math.random();
if(id in index){
if(_125a&&_125a.overwrite===false){
throw new Error("Object already exists");
}
data[index[id]]=_1259;
}else{
index[id]=data.push(_1259)-1;
}
return id;
},add:function(_125c,_125d){
(_125d=_125d||{}).overwrite=false;
return this.put(_125c,_125d);
},remove:function(id){
var index=this.index;
var data=this.data;
if(id in index){
data.splice(index[id],1);
this.setData(data);
return true;
}
},query:function(query,_125e){
return _1255(this.queryEngine(query,_125e)(this.data));
},setData:function(data){
if(data.items){
this.idProperty=data.identifier;
data=this.data=data.items;
}else{
this.data=data;
}
this.index={};
for(var i=0,l=data.length;i<l;i++){
this.index[data[i][this.idProperty]]=i;
}
}});
});
},"davinci/Runtime":function(){
define(["dojo/i18n!./nls/webContent","dijit/Dialog","dijit/form/Button","dijit/form/TextBox","./commands/CommandStack","./ui.plugin","./html/html.plugin","./js/js.plugin","./ve/ve.plugin","./ve/themeEditor/themeEditor.plugin","./review/review.plugin","./UserActivityMonitor"],function(_125f,_1260,_1261,_1262,_1263,_1264,_1265,_1266,_1267,_1268,_1269,_126a){
var _126b=[_1264,_1265,_1266,_1267,_1268,_1269];
var _126c={plugins:[],extensionPoints:[],subscriptions:[],currentSelection:[],commandStack:new _1263(),addPlugin:function(_126d){
url=_126d+".plugin";
dojo.xhrGet({url:url,handleAs:"json",sync:true,load:function(_126e,_126f){
_126c._loadPlugin(_126e,url);
}});
},getUser:function(){
if(this._userInfo){
return this._userInfo;
}
this._userInfo=_126c.serverJSONRequest({url:"cmd/getUserInfo",handleAs:"json",content:{},sync:true});
return this._userInfo;
},getUserDisplayName:function(_1270){
if(!_1270){
_1270=this.getUser();
}
var _1271=_1270.userFirstName;
if(!_1270.userFirstName){
_1271=_1270.email;
}
return _1271;
},getUserDisplayNamePlusEmail:function(_1272){
if(!_1272){
_1272=this.getUser();
}
var _1273=this.getUserDisplayName(_1272);
if(_1273!=_1272.email){
_1273+=" &lt;"+_1272.email+"&gt;";
}
return _1273;
},loadPlugins:function(){
_126b.forEach(function(_1274){
var _1275=_1274.id;
_126c.plugins[_1275]=_1274;
for(var id in _1274){
var _1276=_1274[id];
if(typeof _1276!="string"){
if(_1276 instanceof Array){
_1276.forEach(function(ext){
_126c._addExtension(id,ext,_1275);
});
}else{
_126c._addExtension(id,_1276,_1275);
}
}
}
});
},singleUserMode:function(){
return _126c.isLocalInstall;
},location:function(){
return document.location.href.split("?")[0];
},getUserWorkspaceUrl:function(){
var loc=this.location();
if(loc.charAt(loc.length-1)=="/"){
loc=loc.substring(0,loc.length-1);
}
var _1277=loc+"/user/"+_126c.userName+"/ws/workspace/";
return _1277;
},run:function(){
if(dojo.isMac){
dojo.addClass(document.documentElement,"isMac");
}
var _1278=document.body.style;
_126c.supportsCSS3Transitions=_1278.WebkitTransition!==undefined||_1278.MozTransition!==undefined||_1278.OTransition!==undefined||_1278.transition!==undefined;
_126c.subscribe("/davinci/ui/selectionChanged",_126c._selectionChanged);
dojo.connect(dojo.doc.documentElement,"onkeypress",function(e){
if(e.charOrCode==8){
window.davinciBackspaceKeyTime=Date.now();
}
});
_126a.setUpInActivityMonitor(dojo.doc);
dojo.connect(dojo.doc.documentElement,"onkeydown",this,"_handleGlobalDocumentKeyEvent");
dojo.addOnUnload(function(e){
var _1279=null;
var _127a=davinci.Workbench.editorTabs.getChildren();
var _127b=0;
for(var i=0;i<_127a.length;i++){
var _127c=_127a[i];
if(_127c.editor){
var _127d=_127c.editor.getOnUnloadWarningMessage();
if(_127d){
if(!_1279){
_1279=_127d;
}
_127b++;
}
}
}
if(_127b>1){
_1279=dojo.string.substitute(_125f.multipleFilesUnsaved,[_1279,_127b]);
}
if(!_1279){
var _127e=Date.now()-window.davinciBackspaceKeyTime<100;
if(_127e){
_1279=_125f.careful;
}
}
if(_1279){
if(e=e||window.event){
e.returnValue=_1279;
}
return _1279;
}
});
},subscribe:function(topic,func){
_126c.subscriptions.push(dojo.subscribe(topic,this,func));
},destroy:function(){
dojo.forEach(_126c.subscriptions,dojo.unsubscribe);
_126a.destroy();
},_addExtension:function(id,_127f,_1280){
if(_127f.id){
_127f.id=_1280+"."+_127f.id;
}
_126c.extensionPoints[id]=_126c.extensionPoints[id]||[];
var _1281=_126c.extensionPoints[id];
_1281.push(_127f);
_126c.extensionPoints[id]=_1281;
},getExtensions:function(_1282,_1283){
var _1284=_126c.extensionPoints[_1282];
if(_1283){
var _1285=[];
var _1286=_1283 instanceof Function;
if(_1284){
return _1284.filter(function(ext){
return (_1286&&_1283(ext))||ext.id==_1283;
});
}
}
return _1284;
},getExtension:function(_1287,_1288){
return _126c.getExtensions(_1287,_1288)[0];
},handleError:function(error){
var _1289="welcome";
if(_126c.singleUserMode()){
_1289=".";
}
window.document.body.innerHTML=dojo.string.substitute(_125f.serverConnectError,{redirectUrl:_1289,error:error});
},executeCommand:function(cmdID){
var cmd=_126c.getExtension("davinci.commands",cmdID);
if(cmd&&cmd.run){
cmd.run();
}
},_selectionChanged:function(_128a){
_126c.currentSelection=_128a;
},getSelection:function(){
return _126c.currentSelection;
},doLogin:function(){
var retry=true;
var _128b="<table>"+"<tr><td><label for=\"username\">User: </label></td>"+"<td><input dojoType=dijit.form.TextBox type=\"text\" name=\"username\" id='username' ></input></td></tr>"+"<tr><td><label for=\"password\">Password: </label></td> <td><input dojoType=\"dijit.form.TextBox\" type=\"password\" name=\"password\" id='password'></input></td></tr>"+"<tr><td colspan=\"2\" align=\"center\"><button dojoType=\"dijit.form.Button\" type=\"submit\" >Login</button></td>"+"</tr></table>";
do{
var _128c=false;
var _128d=new _1260({id:"connectDialog",title:"Please login",onExecute:function(){
dojo.xhrGet({url:"cmd/login",sync:true,handleAs:"text",content:{userName:dojo.byId("username").value,password:dojo.byId("password").value,noRedirect:true}}).then(function(_128e){
if(_128e=="OK"){
window.location.href="welcome";
}else{
console.warn("Unknown error: result="+_128e);
}
},function(error){
console.warn("Login error",error);
});
_128c=true;
},onCancel:function(){
_128c=true;
_126c.destroyRecursive(false);
}});
_128d.setContent(_128b);
_128d.show();
}while(retry);
},serverJSONRequest:function(_128f){
var _1290;
var args={handleAs:"json"};
dojo.mixin(args,_128f);
dojo.xhrGet(args).then(function(_1291){
if(_1291){
_1290=_1291;
}
});
return _1290;
},logoff:function(args){
var _1292=dojo.create("div",null,dojo.body(),"first");
_1292.innerHTML="<table><tr><td><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;Logging off...</td></tr></table>";
dojo.addClass(_1292,"loading");
require("davinci/Workbench").unload();
_126c.serverJSONRequest({url:"cmd/logoff",handleAs:"text",sync:true});
var _1293=_126c.location();
var _1294=_1293.length-1;
if(_1293.charAt(_1294)=="/"){
_1293=_1293.substr(0,_1294);
}
location.href=_1293+"/welcome";
},registerKeyBinding:function(_1295,_1296){
if(!this._globalKeyBindings){
this._globalKeyBindings=[];
}
this._globalKeyBindings.push({keyBinding:_1295,action:_1296});
},handleKeyEvent:function(e){
this._handleKeyEvent(e,true);
},_handleGlobalDocumentKeyEvent:function(e){
this._handleKeyEvent(e);
},_handleKeyEvent:function(e,_1297){
if(!this._globalKeyBindings){
return;
}
var _1298=false;
_1298=dojo.some(this._globalKeyBindings,dojo.hitch(this,function(_1299){
if(_126c.isKeyEqualToEvent(_1299.keyBinding,e)){
davinci.Workbench._runAction(_1299.action);
return true;
}
}));
if(_1298){
dojo.stopEvent(e);
}else{
if(!_1297){
if(this.currentEditor&&this.currentEditor.handleKeyEvent){
this.currentEditor.handleKeyEvent(e,true);
}
}
}
},isKeyEqualToEvent:function(_129a,e){
var equal=true;
var _129b=((e.ctrlKey&&!dojo.isMac)||(dojo.isMac&&e.metaKey));
var _129c=((e.altKey&&!dojo.isMac)||(dojo.isMac&&e.ctrlKey));
if(!!_129a.accel!==_129b){
equal=false;
}
if(!!_129a.meta!==_129c){
equal=false;
}
if(!!_129a.shift!==e.shiftKey){
equal=false;
}
if(equal&&_129a.charOrCode&&e.which){
if(dojo.isArray(_129a.charOrCode)){
equal=dojo.some(_129a.charOrCode,dojo.hitch(this,function(_129d){
return this._comparecharOrCode(_129d,e);
}));
}else{
equal=this._comparecharOrCode(_129a.charOrCode,e);
}
}
return equal;
},_comparecharOrCode:function(_129e,e){
var equal;
if(dojo.isString(_129e)){
equal=(_129e.toLowerCase()===String.fromCharCode(e.which).toLowerCase());
}else{
equal=(_129e===e.which);
}
return equal;
}};
davinci.Runtime=_126c;
return _126c;
});
},"dojox/grid/_Events":function(){
define("dojox/grid/_Events",["dojo/keys","dojo/dom-class","dojo/_base/declare","dojo/_base/event","dojo/_base/sniff"],function(keys,_129f,_12a0,event,has){
return _12a0("dojox.grid._Events",null,{cellOverClass:"dojoxGridCellOver",onKeyEvent:function(e){
this.dispatchKeyEvent(e);
},onContentEvent:function(e){
this.dispatchContentEvent(e);
},onHeaderEvent:function(e){
this.dispatchHeaderEvent(e);
},onStyleRow:function(inRow){
var i=inRow;
i.customClasses+=(i.odd?" dojoxGridRowOdd":"")+(i.selected?" dojoxGridRowSelected":"")+(i.over?" dojoxGridRowOver":"");
this.focus.styleRow(inRow);
this.edit.styleRow(inRow);
},onKeyDown:function(e){
if(e.altKey||e.metaKey){
return;
}
var _12a1;
switch(e.keyCode){
case keys.ESCAPE:
this.edit.cancel();
break;
case keys.ENTER:
if(!this.edit.isEditing()){
_12a1=this.focus.getHeaderIndex();
if(_12a1>=0){
this.setSortIndex(_12a1);
break;
}else{
this.selection.clickSelect(this.focus.rowIndex,dojo.isCopyKey(e),e.shiftKey);
}
event.stop(e);
}
if(!e.shiftKey){
var _12a2=this.edit.isEditing();
this.edit.apply();
if(!_12a2){
this.edit.setEditCell(this.focus.cell,this.focus.rowIndex);
}
}
if(!this.edit.isEditing()){
var _12a3=this.focus.focusView||this.views.views[0];
_12a3.content.decorateEvent(e);
this.onRowClick(e);
event.stop(e);
}
break;
case keys.SPACE:
if(!this.edit.isEditing()){
_12a1=this.focus.getHeaderIndex();
if(_12a1>=0){
this.setSortIndex(_12a1);
break;
}else{
this.selection.clickSelect(this.focus.rowIndex,dojo.isCopyKey(e),e.shiftKey);
}
event.stop(e);
}
break;
case keys.TAB:
this.focus[e.shiftKey?"previousKey":"nextKey"](e);
break;
case keys.LEFT_ARROW:
case keys.RIGHT_ARROW:
if(!this.edit.isEditing()){
var _12a4=e.keyCode;
event.stop(e);
_12a1=this.focus.getHeaderIndex();
if(_12a1>=0&&(e.shiftKey&&e.ctrlKey)){
this.focus.colSizeAdjust(e,_12a1,(_12a4==keys.LEFT_ARROW?-1:1)*5);
}else{
var _12a5=(_12a4==keys.LEFT_ARROW)?1:-1;
if(this.isLeftToRight()){
_12a5*=-1;
}
this.focus.move(0,_12a5);
}
}
break;
case keys.UP_ARROW:
if(!this.edit.isEditing()&&this.focus.rowIndex!==0){
event.stop(e);
this.focus.move(-1,0);
}
break;
case keys.DOWN_ARROW:
if(!this.edit.isEditing()&&this.focus.rowIndex+1!=this.rowCount){
event.stop(e);
this.focus.move(1,0);
}
break;
case keys.PAGE_UP:
if(!this.edit.isEditing()&&this.focus.rowIndex!==0){
event.stop(e);
if(this.focus.rowIndex!=this.scroller.firstVisibleRow+1){
this.focus.move(this.scroller.firstVisibleRow-this.focus.rowIndex,0);
}else{
this.setScrollTop(this.scroller.findScrollTop(this.focus.rowIndex-1));
this.focus.move(this.scroller.firstVisibleRow-this.scroller.lastVisibleRow+1,0);
}
}
break;
case keys.PAGE_DOWN:
if(!this.edit.isEditing()&&this.focus.rowIndex+1!=this.rowCount){
event.stop(e);
if(this.focus.rowIndex!=this.scroller.lastVisibleRow-1){
this.focus.move(this.scroller.lastVisibleRow-this.focus.rowIndex-1,0);
}else{
this.setScrollTop(this.scroller.findScrollTop(this.focus.rowIndex+1));
this.focus.move(this.scroller.lastVisibleRow-this.scroller.firstVisibleRow-1,0);
}
}
break;
default:
break;
}
},onMouseOver:function(e){
e.rowIndex==-1?this.onHeaderCellMouseOver(e):this.onCellMouseOver(e);
},onMouseOut:function(e){
e.rowIndex==-1?this.onHeaderCellMouseOut(e):this.onCellMouseOut(e);
},onMouseDown:function(e){
e.rowIndex==-1?this.onHeaderCellMouseDown(e):this.onCellMouseDown(e);
},onMouseOverRow:function(e){
if(!this.rows.isOver(e.rowIndex)){
this.rows.setOverRow(e.rowIndex);
e.rowIndex==-1?this.onHeaderMouseOver(e):this.onRowMouseOver(e);
}
},onMouseOutRow:function(e){
if(this.rows.isOver(-1)){
this.onHeaderMouseOut(e);
}else{
if(!this.rows.isOver(-2)){
this.rows.setOverRow(-2);
this.onRowMouseOut(e);
}
}
},onMouseDownRow:function(e){
if(e.rowIndex!=-1){
this.onRowMouseDown(e);
}
},onCellMouseOver:function(e){
if(e.cellNode){
_129f.add(e.cellNode,this.cellOverClass);
}
},onCellMouseOut:function(e){
if(e.cellNode){
_129f.remove(e.cellNode,this.cellOverClass);
}
},onCellMouseDown:function(e){
},onCellClick:function(e){
this._click[0]=this._click[1];
this._click[1]=e;
if(!this.edit.isEditCell(e.rowIndex,e.cellIndex)){
this.focus.setFocusCell(e.cell,e.rowIndex);
}
if(this._click.length>1&&this._click[0]==null){
this._click.shift();
}
this.onRowClick(e);
},onCellDblClick:function(e){
var event;
if(this._click.length>1&&has("ie")){
event=this._click[1];
}else{
if(this._click.length>1&&this._click[0].rowIndex!=this._click[1].rowIndex){
event=this._click[0];
}else{
event=e;
}
}
this.focus.setFocusCell(event.cell,event.rowIndex);
this.onRowClick(event);
this.edit.setEditCell(event.cell,event.rowIndex);
this.onRowDblClick(e);
},onCellContextMenu:function(e){
this.onRowContextMenu(e);
},onCellFocus:function(_12a6,_12a7){
this.edit.cellFocus(_12a6,_12a7);
},onRowClick:function(e){
this.edit.rowClick(e);
this.selection.clickSelectEvent(e);
},onRowDblClick:function(e){
},onRowMouseOver:function(e){
},onRowMouseOut:function(e){
},onRowMouseDown:function(e){
},onRowContextMenu:function(e){
event.stop(e);
},onHeaderMouseOver:function(e){
},onHeaderMouseOut:function(e){
},onHeaderCellMouseOver:function(e){
if(e.cellNode){
_129f.add(e.cellNode,this.cellOverClass);
}
},onHeaderCellMouseOut:function(e){
if(e.cellNode){
_129f.remove(e.cellNode,this.cellOverClass);
}
},onHeaderCellMouseDown:function(e){
},onHeaderClick:function(e){
},onHeaderCellClick:function(e){
this.setSortIndex(e.cell.index);
this.onHeaderClick(e);
},onHeaderDblClick:function(e){
},onHeaderCellDblClick:function(e){
this.onHeaderDblClick(e);
},onHeaderCellContextMenu:function(e){
this.onHeaderContextMenu(e);
},onHeaderContextMenu:function(e){
if(!this.headerMenu){
event.stop(e);
}
},onStartEdit:function(_12a8,_12a9){
},onApplyCellEdit:function(_12aa,_12ab,_12ac){
},onCancelEdit:function(_12ad){
},onApplyEdit:function(_12ae){
},onCanSelect:function(_12af){
return true;
},onCanDeselect:function(_12b0){
return true;
},onSelected:function(_12b1){
this.updateRowStyles(_12b1);
},onDeselected:function(_12b2){
this.updateRowStyles(_12b2);
},onSelectionChanged:function(){
}});
});
},"davinci/model/Model":function(){
define(["dojo/_base/declare"],function(_12b3){
return _12b3("davinci.model.Model",null,{constructor:function(){
this.elementType="";
this.name="";
this.startOffset=0;
this.endOffset=0;
this.parent=null;
this.children=[];
},inherits:function(_12b4){
if(arguments.length>1){
_12b4.apply(this,Array.prototype.slice.call(arguments,1));
}else{
_12b4.call(this);
}
},getText:function(){
},setText:function(text){
},addChild:function(child,index,_12b5){
child.parent=this;
if(index!=undefined){
this.children.splice(index,0,child);
}else{
this.children.push(child);
}
},setStart:function(_12b6){
this.startOffset=_12b6;
},setEnd:function(_12b7){
this.endOffset=_12b7;
},getLabel:function(){
return null;
},getID:function(){
return null;
},mapPositions:function(_12b8){
return {startOffset:_12b8.startOffset,endOffset:_12b8.endOffset};
},findChildAtPosition:function(_12b9){
if(!_12b9.endOffset){
_12b9.endOffset=_12b9.startOffset;
}
if(_12b9.startOffset>=this.startOffset&&_12b9.endOffset<=this.endOffset){
for(var i=0;i<this.children.length;i++){
var child=this.children[i].findChildAtPosition(_12b9);
if(child!=null){
return child;
}
}
return this;
}
return null;
},removeChild:function(child){
for(var i=0;i<this.children.length;i++){
if(this.children[i]==child){
this.children.splice(i,1);
return;
}
}
},find:function(_12ba,_12bb){
var _12bc={visit:function(node){
if(this.found.length>0&&_12bb){
return true;
}
var name=null;
for(name in _12ba){
if(node[name]!=_12ba[name]){
break;
}
}
if(node[name]==_12ba[name]){
this.found.push(node);
}
return false;
},found:[]};
this.visit(_12bc);
if(_12bb){
return (_12bc.found.length>0)?_12bc.found[0]:null;
}
return _12bc.found;
},setDirty:function(_12bd){
this.dirtyResource=_12bd;
},isDirty:function(){
return this.dirtyResource;
},searchUp:function(_12be){
if(this.elementType==_12be){
return this;
}
var _12bf=this.parent;
while(_12bf&&_12bf.elementType!=_12be){
_12bf=_12bf.parent;
}
return _12bf;
},visit:function(_12c0){
if(!_12c0.visit(this)){
for(var i=0;i<this.children.length;i++){
this.children[i].visit(_12c0);
}
}
if(_12c0.endVisit){
_12c0.endVisit(this);
}
},updatePositions:function(model,_12c1,delta){
visitor={visit:function(_12c2){
if(_12c2.endOffset<_12c1){
return true;
}
if(_12c2.startOffset>=_12c1){
_12c2.startOffset+=delta;
_12c2.endOffset+=delta;
}else{
if(_12c2.endOffset>=_12c1){
_12c2.endOffset+=delta;
}
}
}};
model.visit(visitor);
}});
});
},"dijit/form/_ListBase":function(){
define(["dojo/_base/declare","dojo/on","dojo/window"],function(_12c3,on,_12c4){
return _12c3("dijit.form._ListBase",null,{selected:null,_listConnect:function(_12c5,_12c6){
var self=this;
return self.own(on(self.containerNode,on.selector(function(_12c7,_12c8,_12c9){
return _12c7.parentNode==_12c9;
},_12c5),function(evt){
evt.preventDefault();
self[_12c6](evt,this);
}));
},selectFirstNode:function(){
var first=this.containerNode.firstChild;
while(first&&first.style.display=="none"){
first=first.nextSibling;
}
this._setSelectedAttr(first);
},selectLastNode:function(){
var last=this.containerNode.lastChild;
while(last&&last.style.display=="none"){
last=last.previousSibling;
}
this._setSelectedAttr(last);
},selectNextNode:function(){
var _12ca=this.selected;
if(!_12ca){
this.selectFirstNode();
}else{
var next=_12ca.nextSibling;
while(next&&next.style.display=="none"){
next=next.nextSibling;
}
if(!next){
this.selectFirstNode();
}else{
this._setSelectedAttr(next);
}
}
},selectPreviousNode:function(){
var _12cb=this.selected;
if(!_12cb){
this.selectLastNode();
}else{
var prev=_12cb.previousSibling;
while(prev&&prev.style.display=="none"){
prev=prev.previousSibling;
}
if(!prev){
this.selectLastNode();
}else{
this._setSelectedAttr(prev);
}
}
},_setSelectedAttr:function(node){
if(this.selected!=node){
var _12cc=this.selected;
if(_12cc){
this.onDeselect(_12cc);
this.selected=null;
}
if(node){
this.selected=node;
_12c4.scrollIntoView(node);
this.onSelect(node);
}
}else{
if(node){
this.onSelect(node);
}
}
}});
});
},"davinci/review/model/store/GeneralReviewReadStore":function(){
define(["dojo/_base/declare"],function(_12cd){
return _12cd("davinci.review.model.store.GeneralReviewReadStore",null,{constructor:function(args){
dojo.mixin(this,args);
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._loadedItems=[];
},getFeatures:function(){
return this._features;
},getIdentity:function(item){
return item.getPath();
},fetchItemByIdentity:function(_12ce){
var _12cf;
if(_12ce.identity&&this.isItemLoaded(_12ce.identity)){
dojo.some(this._loadedItems,function(item){
if(_12ce.identity==this.getIdentity(item)){
_12cf=item;
return true;
}
},this);
if(_12cf&&_12ce.onItem){
var scope=_12ce.scope?_12ce.scope:dojo.global;
_12ce.onItem.call(scope,_12cf);
}
}else{
throw new Error("GeneralReviewReadStore: The item cannot be found or it is not loaded!");
}
},getValue:function(item,_12d0,_12d1){
var ret=this.getValues(item,_12d0);
if(ret.length>0){
return ret[0];
}
},getValues:function(item,_12d2){
var ret=[];
if(item[_12d2]){
if(item[_12d2].length>=0){
ret=ret.concat(item[_12d2]);
}else{
ret.push(item[_12d2]);
}
}
return ret;
},isItem:function(_12d3){
if(typeof _12d3=="string"){
return dojo.some(this._loadedItems,function(item){
if(_12d3==this.getIdentity(item)){
return true;
}
},this);
}else{
if(_12d3){
return typeof _12d3.r!="undefined"&&_12d3.r===this;
}
}
},isItemLoaded:function(_12d4){
var _12d5=this.isItem(_12d4);
if(_12d5&&typeof _12d4=="object"){
_12d5=_12d4.isLoaded;
}
return _12d5;
},loadItem:function(_12d6){
var item=_12d6.item;
if(item){
var self=this;
item.getChildren(function(_12d7){
var scope=_12d6.scope?_12d6.scope:dojo.global;
self._loadedItems=self._loadedItems.concat(_12d7);
item.children=_12d7;
item.isLoaded=true;
dojo.forEach(_12d7,function(child){
child.r=self;
});
_12d6.onItem&&_12d6.onItem.call(scope,item);
},true);
}
},fetch:function(_12d8){
if(_12d8.onComplete){
var scope=_12d8.scope?_12d8.scope:dojo.global;
this.root.r=this;
this._loadedItems.push(this.root);
this.loadItem({item:this.root});
_12d8.onComplete.call(scope,[this.root]);
}
return _12d8;
},close:function(_12d9){
this._loadedItems.length=0;
},getLabel:function(item){
throw new Error("GeneralReviewReadStore: getLabel method is abstract!");
},hasAttribute:function(item,_12da){
return this.isItem(item)&&(_12da=="children"?item.elementType=="Folder":typeof item[_12da]);
}});
});
},"davinci/de/widgets/NewDijit":function(){
define(["dojo/_base/declare","dijit/_Widget","dijit/_Templated","dojo/text!./templates/NewDijit.html","dijit/form/RadioButton","dijit/form/TextBox","dijit/form/Button"],function(_12db,_12dc,_12dd,_12de){
return _12db("davinci.de.widgets.NewDijit",[_12dc,_12dd],{widgetsInTemplate:true,templateString:_12de,_okButton:null,_dijitName:null,_widgetGroup:null,_replaceSelection:null,postMixInProperties:function(){
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
dojo.connect(this._dijitName,"onkeyup",this,"_checkValid");
},_checkValid:function(){
var name=dojo.attr(this._dijitName,"value");
var valid=(name!=null);
this._okButton.set("disabled",!valid);
},okButton:function(){
this.value={"name":dojo.attr(this._dijitName,"value"),"group":dojo.attr(this._widgetGroup,"value"),"replaceSelection":dojo.attr(this._replaceSelection,"value")};
},_getValueAttr:function(){
return this.value;
},cancelButton:function(){
this.cancel=true;
this.onClose();
},onClose:function(){
}});
});
},"dijit/form/_FormSelectWidget":function(){
define(["dojo/_base/array","dojo/_base/Deferred","dojo/aspect","dojo/data/util/sorter","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/when","dojo/store/util/QueryResults","./_FormValueWidget"],function(array,_12df,_12e0,_12e1,_12e2,dom,_12e3,_12e4,lang,query,when,_12e5,_12e6){
var _12e7=_12e2("dijit.form._FormSelectWidget",_12e6,{multiple:false,options:null,store:null,query:null,queryOptions:null,labelAttr:"",onFetch:null,sortByLabel:true,loadChildrenOnOpen:false,onLoadDeferred:null,getOptions:function(_12e8){
var _12e9=_12e8,opts=this.options||[],l=opts.length;
if(_12e9===undefined){
return opts;
}
if(lang.isArray(_12e9)){
return array.map(_12e9,"return this.getOptions(item);",this);
}
if(lang.isObject(_12e8)){
if(!array.some(this.options,function(o,idx){
if(o===_12e9||(o.value&&o.value===_12e9.value)){
_12e9=idx;
return true;
}
return false;
})){
_12e9=-1;
}
}
if(typeof _12e9=="string"){
for(var i=0;i<l;i++){
if(opts[i].value===_12e9){
_12e9=i;
break;
}
}
}
if(typeof _12e9=="number"&&_12e9>=0&&_12e9<l){
return this.options[_12e9];
}
return null;
},addOption:function(_12ea){
if(!lang.isArray(_12ea)){
_12ea=[_12ea];
}
array.forEach(_12ea,function(i){
if(i&&lang.isObject(i)){
this.options.push(i);
}
},this);
this._loadChildren();
},removeOption:function(_12eb){
if(!lang.isArray(_12eb)){
_12eb=[_12eb];
}
var _12ec=this.getOptions(_12eb);
array.forEach(_12ec,function(i){
if(i){
this.options=array.filter(this.options,function(node){
return (node.value!==i.value||node.label!==i.label);
});
this._removeOptionItem(i);
}
},this);
this._loadChildren();
},updateOption:function(_12ed){
if(!lang.isArray(_12ed)){
_12ed=[_12ed];
}
array.forEach(_12ed,function(i){
var _12ee=this.getOptions(i),k;
if(_12ee){
for(k in i){
_12ee[k]=i[k];
}
}
},this);
this._loadChildren();
},setStore:function(store,_12ef,_12f0){
var _12f1=this.store;
_12f0=_12f0||{};
if(_12f1!==store){
var h;
while((h=this._notifyConnections.pop())){
h.remove();
}
if(!store.get){
lang.mixin(store,{_oldAPI:true,get:function(id){
var _12f2=new _12df();
this.fetchItemByIdentity({identity:id,onItem:function(_12f3){
_12f2.resolve(_12f3);
},onError:function(error){
_12f2.reject(error);
}});
return _12f2.promise;
},query:function(query,_12f4){
var _12f5=new _12df(function(){
if(_12f6.abort){
_12f6.abort();
}
});
_12f5.total=new _12df();
var _12f6=this.fetch(lang.mixin({query:query,onBegin:function(count){
_12f5.total.resolve(count);
},onComplete:function(_12f7){
_12f5.resolve(_12f7);
},onError:function(error){
_12f5.reject(error);
}},_12f4));
return new _12e5(_12f5);
}});
if(store.getFeatures()["dojo.data.api.Notification"]){
this._notifyConnections=[_12e0.after(store,"onNew",lang.hitch(this,"_onNewItem"),true),_12e0.after(store,"onDelete",lang.hitch(this,"_onDeleteItem"),true),_12e0.after(store,"onSet",lang.hitch(this,"_onSetItem"),true)];
}
}
this._set("store",store);
}
if(this.options&&this.options.length){
this.removeOption(this.options);
}
if(this._queryRes&&this._queryRes.close){
this._queryRes.close();
}
if(_12f0.query){
this._set("query",_12f0.query);
this._set("queryOptions",_12f0.queryOptions);
}
if(store){
this._loadingStore=true;
this.onLoadDeferred=new _12df();
this._queryRes=store.query(this.query,this.queryOptions);
when(this._queryRes,lang.hitch(this,function(items){
if(this.sortByLabel&&!_12f0.sort&&items.length){
if(items[0].getValue){
items.sort(_12e1.createSortFunction([{attribute:store.getLabelAttributes(items[0])[0]}],store));
}else{
var _12f8=this.labelAttr;
items.sort(function(a,b){
return a[_12f8]>b[_12f8]?1:b[_12f8]>a[_12f8]?-1:0;
});
}
}
if(_12f0.onFetch){
items=_12f0.onFetch.call(this,items,_12f0);
}
array.forEach(items,function(i){
this._addOptionForItem(i);
},this);
if(this._queryRes.observe){
this._queryRes.observe(lang.hitch(this,function(_12f9,_12fa,_12fb){
if(_12fa==_12fb){
this._onSetItem(_12f9);
}else{
if(_12fa!=-1){
this._onDeleteItem(_12f9);
}
if(_12fb!=-1){
this._onNewItem(_12f9);
}
}
}),true);
}
this._loadingStore=false;
this.set("value","_pendingValue" in this?this._pendingValue:_12ef);
delete this._pendingValue;
if(!this.loadChildrenOnOpen){
this._loadChildren();
}else{
this._pseudoLoadChildren(items);
}
this.onLoadDeferred.resolve(true);
this.onSetStore();
}),function(err){
console.error("dijit.form.Select: "+err.toString());
this.onLoadDeferred.reject(err);
});
}
return _12f1;
},_setValueAttr:function(_12fc,_12fd){
if(!this._onChangeActive){
_12fd=null;
}
if(this._loadingStore){
this._pendingValue=_12fc;
return;
}
var opts=this.getOptions()||[];
if(!lang.isArray(_12fc)){
_12fc=[_12fc];
}
array.forEach(_12fc,function(i,idx){
if(!lang.isObject(i)){
i=i+"";
}
if(typeof i==="string"){
_12fc[idx]=array.filter(opts,function(node){
return node.value===i;
})[0]||{value:"",label:""};
}
},this);
_12fc=array.filter(_12fc,function(i){
return i&&i.value;
});
if(!this.multiple&&(!_12fc[0]||!_12fc[0].value)&&opts.length){
_12fc[0]=opts[0];
}
array.forEach(opts,function(i){
i.selected=array.some(_12fc,function(v){
return v.value===i.value;
});
});
var val=array.map(_12fc,function(i){
return i.value;
}),disp=array.map(_12fc,function(i){
return i.label;
});
if(typeof val=="undefined"||typeof val[0]=="undefined"){
return;
}
this._setDisplay(this.multiple?disp:disp[0]);
this.inherited(arguments,[this.multiple?val:val[0],_12fd]);
this._updateSelection();
},_getDisplayedValueAttr:function(){
var val=this.get("value");
if(!lang.isArray(val)){
val=[val];
}
var ret=array.map(this.getOptions(val),function(v){
if(v&&"label" in v){
return v.label;
}else{
if(v){
return v.value;
}
}
return null;
},this);
return this.multiple?ret:ret[0];
},_loadChildren:function(){
if(this._loadingStore){
return;
}
array.forEach(this._getChildren(),function(child){
child.destroyRecursive();
});
array.forEach(this.options,this._addOptionItem,this);
this._updateSelection();
},_updateSelection:function(){
this._set("value",this._getValueFromOpts());
var val=this.value;
if(!lang.isArray(val)){
val=[val];
}
if(val&&val[0]){
array.forEach(this._getChildren(),function(child){
var _12fe=array.some(val,function(v){
return child.option&&(v===child.option.value);
});
_12e3.toggle(child.domNode,this.baseClass.replace(/\s+|$/g,"SelectedOption "),_12fe);
child.domNode.setAttribute("aria-selected",_12fe?"true":"false");
},this);
}
},_getValueFromOpts:function(){
var opts=this.getOptions()||[];
if(!this.multiple&&opts.length){
var opt=array.filter(opts,function(i){
return i.selected;
})[0];
if(opt&&opt.value){
return opt.value;
}else{
opts[0].selected=true;
return opts[0].value;
}
}else{
if(this.multiple){
return array.map(array.filter(opts,function(i){
return i.selected;
}),function(i){
return i.value;
})||[];
}
}
return "";
},_onNewItem:function(item,_12ff){
if(!_12ff||!_12ff.parent){
this._addOptionForItem(item);
}
},_onDeleteItem:function(item){
var store=this.store;
this.removeOption(store.getIdentity(item));
},_onSetItem:function(item){
this.updateOption(this._getOptionObjForItem(item));
},_getOptionObjForItem:function(item){
var store=this.store,label=(this.labelAttr&&this.labelAttr in item)?item[this.labelAttr]:store.getLabel(item),value=(label?store.getIdentity(item):null);
return {value:value,label:label,item:item};
},_addOptionForItem:function(item){
var store=this.store;
if(store.isItemLoaded&&!store.isItemLoaded(item)){
store.loadItem({item:item,onItem:function(i){
this._addOptionForItem(i);
},scope:this});
return;
}
var _1300=this._getOptionObjForItem(item);
this.addOption(_1300);
},constructor:function(_1301){
this._oValue=(_1301||{}).value||null;
this._notifyConnections=[];
},buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},_fillContent:function(){
if(!this.options){
this.options=this.srcNodeRef?query("> *",this.srcNodeRef).map(function(node){
if(node.getAttribute("type")==="separator"){
return {value:"",label:"",selected:false,disabled:false};
}
return {value:(node.getAttribute("data-"+_12e4._scopeName+"-value")||node.getAttribute("value")),label:String(node.innerHTML),selected:node.getAttribute("selected")||false,disabled:node.getAttribute("disabled")||false};
},this):[];
}
if(!this.value){
this._set("value",this._getValueFromOpts());
}else{
if(this.multiple&&typeof this.value=="string"){
this._set("value",this.value.split(","));
}
}
},postCreate:function(){
this.inherited(arguments);
this.connect(this,"onChange","_updateSelection");
var store=this.store;
if(store&&(store.getIdentity||store.getFeatures()["dojo.data.api.Identity"])){
this.store=null;
this.setStore(store,this._oValue);
}
},startup:function(){
this._loadChildren();
this.inherited(arguments);
},destroy:function(){
var h;
while((h=this._notifyConnections.pop())){
h.remove();
}
if(this._queryRes&&this._queryRes.close){
this._queryRes.close();
}
this.inherited(arguments);
},_addOptionItem:function(){
},_removeOptionItem:function(){
},_setDisplay:function(){
},_getChildren:function(){
return [];
},_getSelectedOptionsAttr:function(){
return this.getOptions(this.get("value"));
},_pseudoLoadChildren:function(){
},onSetStore:function(){
}});
return _12e7;
});
},"dijit/layout/_TabContainerBase":function(){
define(["dojo/text!./templates/TabContainer.html","./StackContainer","./utils","../_TemplatedMixin","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(_1302,_1303,_1304,_1305,_1306,_1307,_1308,_1309){
return _1306("dijit.layout._TabContainerBase",[_1303,_1305],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:_1302,postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&_1309.set(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
_1307.add(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
_1307.add(this.domNode,"dijitTabContainerNested");
_1307.add(this.tablist.containerNode,"dijitTabContainerTabListNested");
_1307.add(this.tablistSpacer,"dijitTabContainerSpacerNested");
_1307.add(this.containerNode,"dijitTabPaneWrapperNested");
}else{
_1307.add(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(tab){
_1307.add(tab.domNode,"dijitTabPane");
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
this.tablist.startup();
this.inherited(arguments);
},layout:function(){
if(!this._contentBox||typeof (this._contentBox.l)=="undefined"){
return;
}
var sc=this.selectedChildWidget;
if(this.doLayout){
var _130a=this.tabPosition.replace(/-h/,"");
this.tablist.layoutAlign=_130a;
var _130b=[this.tablist,{domNode:this.tablistSpacer,layoutAlign:_130a},{domNode:this.containerNode,layoutAlign:"client"}];
_1304.layoutChildren(this.domNode,this._contentBox,_130b);
this._containerContentBox=_1304.marginBox2contentBox(this.containerNode,_130b[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
var s=this.tablist.domNode.style;
s.width="0";
var width=_1308.getContentBox(this.domNode).w;
s.width="";
this.tablist.resize({w:width});
}
if(sc&&sc.resize){
sc.resize();
}
}
},destroy:function(){
if(this.tablist){
this.tablist.destroy();
}
this.inherited(arguments);
}});
});
},"dijit/form/_ComboBoxMenu":function(){
define(["dojo/_base/declare","dojo/dom-class","dojo/dom-style","dojo/keys","../_WidgetBase","../_TemplatedMixin","./_ComboBoxMenuMixin","./_ListMouseMixin"],function(_130c,_130d,_130e,keys,_130f,_1310,_1311,_1312){
return _130c("dijit.form._ComboBoxMenu",[_130f,_1310,_1312,_1311],{templateString:"<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;'>"+"<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>"+"<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>"+"</div>",baseClass:"dijitComboBoxMenu",postCreate:function(){
this.inherited(arguments);
if(!this.isLeftToRight()){
_130d.add(this.previousButton,"dijitMenuItemRtl");
_130d.add(this.nextButton,"dijitMenuItemRtl");
}
},_createMenuItem:function(){
var item=this.ownerDocument.createElement("div");
item.className="dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl");
item.setAttribute("role","option");
return item;
},onHover:function(node){
_130d.add(node,"dijitMenuItemHover");
},onUnhover:function(node){
_130d.remove(node,"dijitMenuItemHover");
},onSelect:function(node){
_130d.add(node,"dijitMenuItemSelected");
},onDeselect:function(node){
_130d.remove(node,"dijitMenuItemSelected");
},_page:function(up){
var _1313=0;
var _1314=this.domNode.scrollTop;
var _1315=_130e.get(this.domNode,"height");
if(!this.getHighlightedOption()){
this.selectNextNode();
}
while(_1313<_1315){
var _1316=this.getHighlightedOption();
if(up){
if(!_1316.previousSibling||_1316.previousSibling.style.display=="none"){
break;
}
this.selectPreviousNode();
}else{
if(!_1316.nextSibling||_1316.nextSibling.style.display=="none"){
break;
}
this.selectNextNode();
}
var _1317=this.domNode.scrollTop;
_1313+=(_1317-_1314)*(up?-1:1);
_1314=_1317;
}
},handleKey:function(evt){
switch(evt.keyCode){
case keys.DOWN_ARROW:
this.selectNextNode();
return false;
case keys.PAGE_DOWN:
this._page(false);
return false;
case keys.UP_ARROW:
this.selectPreviousNode();
return false;
case keys.PAGE_UP:
this._page(true);
return false;
default:
return true;
}
}});
});
},"url:davinci/ui/templates/ThemeSetsDialog.html":"<div>\n\t<div class=\"dijitDialogPaneContentArea\">\n\t\t<table style=\"width: 90%\">\n\t\t\t<tr>\n\t\t\t\t\t<td style=\"width:40%; vertical-align: top;\">\n\t\t\t\t\t\t\t<table> \n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t<td style=\" vertical-align: top;\" >\n\t\t\t\t\t\t\t\t\t\t\t\t\t<label>${uiNLS.themeSets}</label><select  id=\"theme_select_themeset_theme_select\" name=\"theme_select_themeset_theme_select\" size=\"10\" style=\"margin-bottom: 5px; width: 190px;\" ></select>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div id=\"toolbar1\" data-dojo-type=\"dijit.Toolbar\" class=\"toolbaredContainer_toolbarDiv davinciToolbar\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div data-dojo-type=\"dijit.form.Button\" id=\"theme_select_themeset_add\" data-dojo-props=\"iconClass:'viewActionIcon addThemeSetIcon', showLabel:false \">${uiNLS.addThemeSet}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div data-dojo-type=\"dijit.form.Button\" id=\"theme_select_themeset_delete\" data-dojo-props=\"iconClass:'viewActionIcon removeThemeSetIcon', showLabel:false \">${uiNLS.deleteThemeSet}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t </div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t<td><div style=\"border-right: 1px solid #ccc; width: 1px; height: 250px; margin-left: 10px; margin-top: 10px;\"></div></td>\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t<td></td><td></td>\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<table style=\"width: 100%; margin-left:10px; margin-right:10px;\">\n\t\t\t\t\t\t\t\t\t<tr><td colspan=\"2\">${uiNLS.currentlySelectedThemeSet}</td><tr>\n\t\t\t\t\t\t\t\t\t<tr><td style=\"width: 18%;\">${uiNLS.themeSetName}</td><td style=\"text-align: center;\"><input dojoType=\"dijit.form.TextBox\" id=\"theme_select_themeset_theme_select_textbox\" readonly= \"true\" style=\"width: 175px;\" ></input><input type=\"button\" dojoType=\"dijit.form.Button\" id=\"theme_select_rename_button\" label=\"Rename\" style=\"margin-left: 5px;\"></td></tr>\n\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t<div style=\"border-top: 1px solid; top: 231px; border-top-color: #ccc; left: 429px; width: 300px; height: 11px; margin-top: 6px; margin-left:10px;\"></div>\n\t\t\t\t\t\t\t<table style=\"margin-left: 15px; width: 100%;\">\n\t\t\t\t\t\t\t\t\t<tr><td style=\"width: 139px;\">${uiNLS.desktopTheme}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_desktop_theme_select\"type=\"text\"  style=\"width: 175px;\"  ></select></td></tr>\n\t\t\t\t\t\t\t\t\t<tr><td>${uiNLS.mobileTheme}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_mobile_theme_select\"type=\"text\"  style=\"width: 175px;\" ></select></td></tr>\n\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t<table id=\"theme_select_devices_table\" style=\"margin-left:30px; border-collapse: separate; border-spacing: 0 0; width: 100%\">\n\t\t\t\t\t\t\t<tr><td style=\"width: 129px;\">${uiNLS.android}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_android_select\" type=\"text\"  style=\"width: 150px;\"></select></td></tr>\n\t\t\t\t\t\t\t<tr><td>${uiNLS.blackberry}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_blackberry_select\" type=\"text\"  style=\"width: 150px;\"></select></td></tr>\n\t\t\t\t\t\t\t<tr><td>${uiNLS.ipad}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_ipad_select\" type=\"text\"  style=\"width: 150px;\"></select></td></tr>\n\t\t\t\t\t\t\t<tr><td>${uiNLS.iphone}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_iphone_select\" type=\"text\"  style=\"width: 150px;\"></select></td></tr>\n\t\t\t\t\t\t\t<tr><td>${uiNLS.other}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_other_select\" type=\"text\"  style=\"width: 150px;\"></select></td></tr>\n\t\t\t\t\t\t\t</table>\n\t\t\n\t\t\t\t\t </td>\n\t\t\t </tr>\n\t\t</table>\n\t</div>\n\t<div class=\"dijitDialogPaneActionBar\">\n\t\t<button dojoType=\"dijit.form.Button\" id=\"theme_select_ok_button\" label=\"${uiNLS.save}\" class=\"maqPrimaryButton\" type=\"submit\"></button>\n\t\t<button dojoType=\"dijit.form.Button\" id=\"theme_select_cancel_button\" label=\"${commonNLS.buttonCancel}\" class=\"maqSecondaryButton\"></button>\n\t</div>\n</div>\n","dijit/_KeyNavContainer":function(){
define(["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_1318,_1319,_131a,array,keys,_131b,event,_131c,lang){
return _131b("dijit._KeyNavContainer",[_131a,_1319],{tabIndex:"0",connectKeyNavHandlers:function(_131d,_131e){
var _131f=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
array.forEach(_131d,function(code){
_131f[code]=prev;
});
array.forEach(_131e,function(code){
_131f[code]=next;
});
_131f[keys.HOME]=lang.hitch(this,"focusFirstChild");
_131f[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_1318.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
array.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_1320,_1321){
this.inherited(arguments);
this._startupChild(_1320);
},focus:function(){
this.focusFirstChild();
},focusFirstChild:function(){
this.focusChild(this._getFirstFocusableChild());
},focusLastChild:function(){
this.focusChild(this._getLastFocusableChild());
},focusNext:function(){
this.focusChild(this._getNextFocusableChild(this.focusedChild,1));
},focusPrev:function(){
this.focusChild(this._getNextFocusableChild(this.focusedChild,-1),true);
},focusChild:function(_1322,last){
if(!_1322){
return;
}
if(this.focusedChild&&_1322!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_1322.set("tabIndex",this.tabIndex);
_1322.focus(last?"end":"start");
this._set("focusedChild",_1322);
},_startupChild:function(_1323){
_1323.set("tabIndex","-1");
this.connect(_1323,"_onFocus",function(){
_1323.set("tabIndex",this.tabIndex);
});
this.connect(_1323,"_onBlur",function(){
_1323.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_131c.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_131c.set(this.domNode,"tabIndex",this.tabIndex);
}
this.focusedChild=null;
this.inherited(arguments);
},_onContainerKeypress:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
var func=this._keyNavCodes[evt.charOrCode];
if(func){
func();
event.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(child,dir){
if(child){
child=this._getSiblingOfChild(child,dir);
}
var _1324=this.getChildren();
for(var i=0;i<_1324.length;i++){
if(!child){
child=_1324[(dir>0)?0:(_1324.length-1)];
}
if(child.isFocusable()){
return child;
}
child=this._getSiblingOfChild(child,dir);
}
return null;
}});
});
},"dijit/form/DataList":function(){
define(["dojo/_base/declare","dojo/dom","dojo/_base/lang","dojo/query","dojo/store/Memory","../registry"],function(_1325,dom,lang,query,_1326,_1327){
function _1328(_1329){
return {id:_1329.value,value:_1329.value,name:lang.trim(_1329.innerText||_1329.textContent||"")};
};
return _1325("dijit.form.DataList",_1326,{constructor:function(_132a,_132b){
this.domNode=dom.byId(_132b);
lang.mixin(this,_132a);
if(this.id){
_1327.add(this);
}
this.domNode.style.display="none";
this.inherited(arguments,[{data:query("option",this.domNode).map(_1328)}]);
},destroy:function(){
_1327.remove(this.id);
},fetchSelectedItem:function(){
var _132c=query("> option[selected]",this.domNode)[0]||query("> option",this.domNode)[0];
return _132c&&_1328(_132c);
}});
});
},"davinci/maqetta/AppStates":function(){
define(["dojo/_base/connect","dojo/dom-style","dojo/dom","dojo/_base/html","dojo/_base/window","dojo/_base/array","dojo/parser","require"],function(_132d,_132e,dom,dhtml,_132f,_1330,_1331,_1332){
var _1333=function(){
};
_1333.prototype={NORMAL:"Normal",DELTAS_ATTRIBUTE:"data-maq-deltas",DELTAS_ATTRIBUTE_P6:"dvStates",APPSTATES_ATTRIBUTE:"data-maq-appstates",APPSTATES_ATTRIBUTE_P6:"dvStates",reImportant:/^(.*)(!\ *important)(.*)/,isStateContainer:function(node){
return !!(node&&node._maqAppStates);
},getStateContainersForNode:function(node){
var _1334=[];
var n=node;
while(n){
if(n._maqAppStates){
_1334.splice(0,0,n);
}
if(n.tagName=="BODY"){
break;
}
n=n.parentNode;
}
return _1334;
},getAllStateContainers:function(_1335){
var _1336=[];
var that=this;
function _1337(_1338){
if(_1338._maqAppStates){
_1336.push(_1338);
}
var _1339=that._getChildrenOfNode(_1338);
for(var i=0;i<_1339.length;i++){
_1337(_1339[i]);
}
};
_1337(_1335);
return _1336;
},getStatesArray:function(node,_133a,_133b,_133c){
var _133d=[];
if(node){
var pn=node.parentNode;
while(pn){
if(pn._maqAppStates){
if(pn==_133c){
_133d.splice(0,0,{node:pn,oldState:_133a,newState:_133b});
}else{
var _133e=pn._maqAppStates.states?pn._maqAppStates.states.current:undefined;
_133d.splice(0,0,{node:pn,oldState:_133e,newState:_133e});
}
}
if(pn.tagName=="BODY"){
break;
}
pn=pn.parentNode;
}
}
return _133d;
},findStateContainer:function(node,state){
if(node){
var pn=node.parentNode;
while(pn){
if(pn._maqAppStates&&(!state||state==this.NORMAL||(pn._maqAppStates.states&&pn._maqAppStates.states.indexOf(state)>=0))){
return pn;
}
if(pn.tagName=="BODY"){
break;
}
pn=pn.parentNode;
}
}
},getAllStatesForNode:function(node){
var _133f=[this.NORMAL];
if(node){
var pn=node.parentNode;
while(pn){
if(pn._maqAppStates&&pn._maqAppStates.states){
var _1340=pn._maqAppStates.states?pn._maqAppStates.states:[];
for(var i=0;i<_1340.length;i++){
_133f.push(_1340[i]);
}
}
if(pn.tagName=="BODY"){
break;
}
pn=pn.parentNode;
}
}
return _133f;
},getStatesListCurrent:function(node){
var _1341=[];
if(node){
var pn=node.parentNode;
while(pn){
if(pn._maqAppStates){
_1341.splice(0,0,pn._maqAppStates.current);
}
if(pn.tagName=="BODY"){
break;
}
pn=pn.parentNode;
}
}
return _1341;
},getAllCurrentStates:function(_1342){
var _1343=this.getAllStateContainers(_1342);
var _1344=[];
for(var i=0;i<_1343.length;i++){
var node=_1343[i];
var state=this.getState(node);
_1344.push({stateContainerNode:node,state:state});
}
return _1344;
},getStates:function(node){
var _1345=node&&node._maqAppStates;
var names=["Normal"];
if(_1345){
var _1346=_1345.states?_1345.states:[];
for(var i=0;i<_1346.length;i++){
var name=_1346[i];
if(name!="Normal"){
names.push(name);
}
}
}
return names;
},_getSCNodeFromElemOrEvent:function(state,_1347){
var node;
if(_1347&&_1347.tagName&&_1347.nodeName){
node=_1347._maqAppStates?_1347:this.findStateContainer(_1347,state);
}else{
if(_1347&&_1347.target&&_1347.currentTarget){
node=_1347.currentTarget;
if(!node._maqAppStates){
node=this.findStateContainer(node,state);
}
}else{
node=this.getContainer();
}
}
return node;
},_updateSrcState:function(node){
},hasState:function(node,state){
return !!(node&&node._maqAppStates&&node._maqAppStates.states&&node._maqAppStates.states.indexOf(state)>=0);
},getState:function(node){
return node&&node._maqAppStates&&node._maqAppStates.current;
},setState:function(_1348,_1349,_134a){
var _134b=_134a?_134a.updateWhenCurrent:false;
var _134c=_134a?_134a.silent:false;
var focus=_134a?_134a.focus:false;
var node=this._getSCNodeFromElemOrEvent(_1348,_1349);
if(!node||!node._maqAppStates||(!_134b&&node._maqAppStates.current==_1348)){
return;
}
var _134d=node._maqAppStates.current;
if(this.isNormalState(_1348)){
if(node._maqAppStates.hasOwnProperty("current")){
delete node._maqAppStates.current;
}
_1348=undefined;
}else{
node._maqAppStates.current=_1348;
}
if(focus){
this._setFocus(_1348,node);
}
if(_134a&&_134a.hasOwnProperty("initial")){
if(_134a.initial){
node._maqAppStates.initial=_1348;
}else{
if(node._maqAppStates.initial==_1348){
delete node._maqAppStates.initial;
}
}
}
if(!_134c){
_132d.publish("/maqetta/appstates/state/changed",[{node:node,newState:_1348,oldState:_134d,stateContainerNode:node}]);
}
this._updateSrcState(node,!_1348);
},getInitial:function(node){
return node&&node._maqAppStates&&node._maqAppStates.initial;
},getFocus:function(_134e){
if(!_134e){
return null;
}
var _134f=this.getAllStateContainers(_134e);
for(var i=0;i<_134f.length;i++){
var _1350=_134f[i]._maqAppStates;
if(_1350&&_1350.hasOwnProperty("focus")){
return {stateContainerNode:_134f[i],state:_1350.focus};
}
}
return null;
},_setFocus:function(_1351,node){
if(!node||!node._maqAppStates){
return;
}
var _1352=(node.ownerDocument&&node.ownerDocument.body);
if(!_1352){
return;
}
var _1353=this.getFocus(_1352);
if(_1353&&_1353.stateContainerNode==node&&_1353.state==_1351){
return;
}
var _1354;
var _1355=this.getAllStateContainers(_1352);
for(var i=0;i<_1355.length;i++){
_1354=_1355[i]._maqAppStates;
if(_1354){
delete _1354.focus;
}
}
node._maqAppStates.focus=_1351;
},isNormalState:function(state){
if(arguments.length==0){
state=this.getState();
}
return !state||state==this.NORMAL;
},_styleArrayMixin:function(_1356,_1357){
if(_1357){
for(var j=0;j<_1357.length;j++){
var item2=_1357[j];
for(var prop2 in item2){
for(var i=_1356.length-1;i>=0;i--){
var item1=_1356[i];
if(item1.hasOwnProperty(prop2)){
_1356.splice(i,1);
}
}
}
}
for(var k=0;k<_1357.length;k++){
_1356.push(_1357[k]);
}
}
},getStyle:function(node,_1358,name){
var _1359,_135a=[];
for(var i=0;i<_1358.length;i++){
var state=_1358[i];
_1359=node&&node._maqDeltas&&node._maqDeltas[state]&&node._maqDeltas[state].style;
this._styleArrayMixin(_135a,_1359);
if(arguments.length>2){
if(_135a){
for(var j=_135a.length-1;j>=0;j--){
var item=_135a[j];
for(var prop in item){
if(prop!=name){
_135a.splice(j,1);
break;
}
}
}
}
}
}
return _135a;
},hasStyle:function(node,state,name){
if(!node||!name){
return;
}
if(node._maqDeltas&&node._maqDeltas[state]&&node._maqDeltas[state].style){
var _135b=node._maqDeltas[state].style;
for(var i=0;i<_135b[i];i++){
if(_135b[i].hasProperty(name)){
return true;
}
}
}else{
return false;
}
},setStyle:function(node,state,_135c,_135d){
if(!node||!_135c){
return;
}
node._maqDeltas=node._maqDeltas||{};
node._maqDeltas[state]=node._maqDeltas[state]||{};
node._maqDeltas[state].style=node._maqDeltas[state].style||[];
var _135e=node._maqDeltas[state].style;
if(_135c){
for(var i=0;i<_135c.length;i++){
var _135f=_135c[i];
for(var _1360 in _135f){
for(var j=_135e.length-1;j>=0;j--){
var _1361=_135e[j];
for(var _1362 in _1361){
if(_1360==_1362){
_135e.splice(j,1);
break;
}
}
}
}
}
}
var _1363;
if(_135c){
for(var j=0;j<_135c.length;j++){
for(var p in _135c[j]){
var value=_135c[j][p];
if(typeof value!="undefined"&&value!==null){
if(typeof _1363=="undefined"){
_1363=[];
}
var o={};
o[p]=this._getFormattedValue(p,value);
_1363.push(o);
}
}
}
}
if(_135e&&_1363){
node._maqDeltas[state].style=_135e.concat(_1363);
}else{
if(_135e){
node._maqDeltas[state].style=_135e;
}else{
if(_1363){
node._maqDeltas[state].style=_1363;
}else{
node._maqDeltas[state].style=undefined;
}
}
}
if(!_135d){
_132d.publish("/davinci/states/state/style/changed",[{node:node,state:state,style:_135c}]);
}
this._updateSrcState(node);
},_convertStyleName:function(name){
if(name.indexOf("-")>=0){
var names=name.split("-");
name=names[0];
for(var i=1;i<names.length;i++){
var n=names[i];
name+=(n.charAt(0).toUpperCase()+n.substring(1));
}
}
return name;
},_DYNAMIC_PROPERTIES:{width:1,height:1,top:1,right:1,bottom:1,left:1},_getFormattedValue:function(name,value){
if(name in this._DYNAMIC_PROPERTIES){
if(typeof value!="string"){
return value+"px";
}
var _1364=_1332("dojo/_base/lang").trim(value);
if(/^[-+]?[0-9]*\.?[0-9]+$/.test(_1364)){
value=_1364+"px";
}
}
return value;
},_getStatesListUsingPropName:function(_1365,_1366){
var _1367=[];
if(_1365){
for(var i=0;i<_1365.length;i++){
_1367.push(_1365[i][_1366]);
}
}
return _1367;
},_resetAndCacheNormalStyle:function(node,_1368){
if(!node||!_1368){
return;
}
for(var i=0;i<_1368.length;i++){
var _1369=_1368[i].oldState;
var _136a=this._getStatesListUsingPropName(_1368,"oldState");
var _136b=this.getStyle(node,_136a);
var _136c=this._getStatesListUsingPropName(_1368);
var _136d=this.getStyle(node,_136c);
if(_136b){
for(var j=0;j<_136b.length;j++){
var oItem=_136b[j];
for(var oProp in oItem){
var _136e=this._convertStyleName(oProp);
node.style[_136e]="";
}
}
}
if(_136d){
for(var k=0;k<_136d.length;k++){
var nItem=_136d[k];
for(var nProp in nItem){
var _136e=this._convertStyleName(nProp);
var style=node.style;
var value=this._getFormattedValue(nProp,nItem[nProp])+"";
var _136f=value?value.match(this.reImportant):null;
if(_136f){
if(style.setProperty){
style.setProperty(nProp,_136f[1]+_136f[3],"important");
}else{
node.style[_136e]=_136f[1]+_136f[3];
}
}else{
node.style[_136e]=value;
}
}
}
}
}
},_update:function(node,_1370){
if(!node||!node._maqDeltas){
return;
}
var _1371=this._getStatesListUsingPropName(_1370,"newState");
var _1372=this.getStyle(node,_1371);
this._resetAndCacheNormalStyle(node,_1370);
if(_1372){
for(var i=0;i<_1372.length;i++){
var style=_1372[i];
for(var name in style){
var _1373=this._convertStyleName(name);
var value=style[name]+"";
var _1374=value?value.match(this.reImportant):null;
if(_1374){
if(style.setProperty){
style.setProperty(name,_1374[1]+_1374[3],"important");
}else{
node.style[_1373]=_1374[1]+_1374[3];
}
}else{
node.style[_1373]=value;
}
}
}
}
var _1375,_1376;
if(node.id&&node.ownerDocument){
var byId=node.ownerDocument.defaultView.dijit.byId;
if(byId){
_1375=byId&&byId(node.id);
}
}
if(_1375&&_1375.getParent){
_1376=_1375.getParent();
}
if(_1376&&_1376.resize){
_1376.resize();
}else{
if(_1375&&_1375.resize){
_1375.resize();
}
}
},isContainer:function(node){
var _1377=false;
if(node){
var doc=this.getDocument();
if(node===(doc&&doc.body)||node.tagName=="BODY"){
_1377=true;
}
}
return _1377;
},getContainer:function(){
return document.body;
},add:function(node,state){
if(!node||this.hasState(node,state)){
return;
}
node._maqAppStates=node._maqAppStates||{};
node._maqAppStates.states=node._maqAppStates.states||[];
node._maqAppStates.states.push(state);
_132d.publish("/davinci/states/state/added",[{node:node,state:state}]);
this._updateSrcState(node);
},remove:function(node,state){
if(!node||!node._maqAppStates||!node._maqAppStates.states||!this.hasState(node,state)){
return;
}
var idx=node._maqAppStates.states.indexOf(state);
if(idx<0){
return;
}
var _1378=this.getState(node);
var body=node.ownerDocument.body;
var _1379=this.getFocus(body);
node._maqAppStates.states.splice(idx,1);
var _137a={};
if(_1379&&_1379.stateContainerNode==node&&_1379.state==state){
_137a.focus=true;
_137a.updateWhenCurrent=true;
}
if(state==_1378){
this.setState(undefined,node,_137a);
}
_132d.publish("/davinci/states/state/removed",[{node:node,state:state}]);
this._updateSrcState(node);
},rename:function(_137b,_137c){
if(!_137c){
return false;
}
var _137d=_137c.oldName;
var _137e=_137c.newName;
if(!_137b||!_137b._maqAppStates||!_137b._maqAppStates.states||!_137b._maqAppStates.states.length){
return false;
}
var _137f=_137b._maqAppStates.states;
if(_137f.indexOf(_137d)<0||_137f.indexOf(_137e)>=0){
return false;
}
_137f.splice(_137f.indexOf(_137d),1,_137e);
if(_137b._maqAppStates.focus===_137d){
_137b._maqAppStates.focus=_137e;
}
if(_137b._maqAppStates.current===_137d){
_137b._maqAppStates.current=_137e;
}
var nodes=[_137b];
var _1380=this.getState(_137b);
nodes=nodes.concat(this._getChildrenOfNode(_137b));
while(nodes.length){
var node=nodes.shift();
if(node._maqDeltas&&node._maqDeltas[_137d]){
node._maqDeltas[_137e]=node._maqDeltas[_137d];
delete node._maqDeltas[_137d];
}
nodes=nodes.concat(this._getChildrenOfNode(node));
var _1381=this.getStatesArray(node,null,_137e,_137b);
this._update(node,_1381);
this._updateSrcState(node);
}
_132d.publish("/davinci/states/state/renamed",[{node:node,oldName:_137d,newName:_137e,stateContainerNode:node}]);
return true;
},_isEmpty:function(_1382){
for(var name in _1382){
if(_1382.hasOwnProperty(name)){
return false;
}
}
return true;
},serialize:function(node){
var that=this;
function munge(_1383){
var str=null;
if(node[_1383]){
var o=_1332("dojo/_base/lang").clone(node[_1383]);
delete o["undefined"];
if(!that._isEmpty(o)){
str=JSON.stringify(o);
str=str.replace(/(\\)?'/g,function($0,$1){
return $1?$0:"\\'";
});
str=str.replace(/"/g,"'");
}
}
return str;
};
var obj={};
if(!node){
return obj;
}
var _1384=munge("_maqAppStates");
if(typeof _1384=="string"){
obj.maqAppStates=_1384;
}
var _1385=munge("_maqDeltas");
if(typeof _1385=="string"){
obj.maqDeltas=_1385;
}
return obj;
},deserialize:function(_1386,_1387){
if(typeof _1386=="string"){
_1386=_1386.replace(/(\\)?'/g,function($0,$1){
return $1?"'":"\"";
});
_1386=JSON.parse(_1386);
this._migrate_m4_m5(_1386);
_1386=this._migrate_m6_m7(_1386,_1387&&_1387.isBody);
}
return _1386;
},_migrate_m4_m5:function(_1388){
for(var s in _1388){
var state=_1388[s];
if(state){
var style=state.style;
if(style&&!style.length){
var _1389=[];
for(var prop in style){
var o={};
o[prop]=style[prop];
_1389.push(o);
}
state.style=_1389;
}
}
}
},_migrate_m6_m7:function(_138a,_138b){
if(!_138a||_138a.states){
return _138a;
}
if(_138b){
var _138c=[];
for(var s in _138a){
if(s!="current"){
_138c.push(s);
}
}
if(_138c.length>0){
return {states:_138c};
}else{
return undefined;
}
}else{
delete _138a.current;
return _138a;
}
},store:function(node,_138d,_138e){
if(!node){
return;
}
this.clear(node);
var _138f=(node.tagName=="BODY");
if(_138d){
node._maqAppStates=this.deserialize(_138d,{isBody:_138f});
}
if(_138e){
node._maqDeltas=this.deserialize(_138e,{isBody:_138f});
}
_132d.publish("/davinci/states/stored",[]);
},retrieve:function(node){
if(!node){
return;
}
var _1390=node.getAttribute(this.APPSTATES_ATTRIBUTE);
if(!_1390&&node.tagName==="BODY"){
_1390=node.getAttribute(this.APPSTATES_ATTRIBUTE_P6);
}
var _1391=node.getAttribute(this.DELTAS_ATTRIBUTE);
if(!_1391&&node.tagName!=="BODY"){
_1391=node.getAttribute(this.DELTAS_ATTRIBUTE_P6);
}
return {maqAppStates:_1390,maqDeltas:_1391};
},clear:function(node){
if(!node){
return;
}
delete node._maqAppStates;
delete node._maqDeltas;
},_parseStyleValues:function(text){
var _1392=[];
if(text){
_1330.forEach(text.split(";"),function(s){
var i=s.indexOf(":");
if(i>0){
var n=s.substring(0,i).trim();
var v=s.substring(i+1).trim();
var o={};
o[n]=v;
_1392.push(o);
}
});
}
return _1392;
},transferElementStyle:function(node,_1393){
if(node){
var _1394=node._maqDeltas;
var _1395=this._parseStyleValues(_1393);
if(!_1394["undefined"]){
_1394["undefined"]={};
}
_1394["undefined"].style=_1395;
}
},getDocument:function(){
return document;
},_shouldInitialize:function(){
var _1396=window.frameElement;
var _1397=top.davinci&&top.davinci.Runtime&&(!_1396||_1396.dvContext);
return !_1397;
},_getChildrenOfNode:function(node){
var _1398=[];
for(var i=0;i<node.childNodes.length;i++){
var n=node.childNodes[i];
if(n.nodeType===1){
_1398.push(n);
}
}
return _1398;
},initialize:function(){
if(!this.subscribed){
_132d.subscribe("/maqetta/appstates/state/changed",this,function(e){
if(e.editorClass){
return;
}
var _1399=davinci.states._getChildrenOfNode(e.node);
while(_1399.length){
var child=_1399.shift();
if(!davinci.states.isContainer(child)){
_1399=_1399.concat(davinci.states._getChildrenOfNode(child));
}
var _139a=this.getStatesArray(child,e.oldState,e.newState,e.stateContainerNode);
davinci.states._update(child,_139a);
}
});
this.subscribed=true;
}
}};
if(typeof davinci==="undefined"){
davinci={};
}
var _139b=davinci.states=new _1333();
(function(){
_139b.initialize();
if(_139b._shouldInitialize()){
if(typeof _1332!="undefined"){
_1332(["dojo/_base/lang","dojo/query","dojo/aspect"],function(lang,query,_139c){
var count=0,_139d=false;
var hook=function(_139e){
if(!_139d){
_139c.around(_139e,"parse",function(parse){
var cache={};
return function(_139f,args){
var root;
if(!args&&_139f&&_139f.rootNode){
args=_139f;
root=args.rootNode;
}else{
root=_139f;
}
root=root?dhtml.byId(root):_132f.body();
_13a0(cache);
var _13a1=parse.apply(this,arguments);
_13a2(cache,root);
return _13a1;
};
});
dojo.parser.parse=_139e.parse;
_139d=true;
}
};
try{
var _13a3=_1332("dojox/mobile/parser");
hook.apply(_13a3);
}
catch(e){
}
if(!_13a3){
hook.call(null,_1331);
}
var _13a0=function(cache){
var _13a4="maqTempClass";
var doc=_139b.getDocument();
if(!doc.body._maqAlreadyPreserved){
var _13a5=davinci.states.retrieve(doc.body);
if(_13a5&&_13a5.maqAppStates){
cache.body=_13a5.maqAppStates;
}
doc.body._maqAlreadyPreserved=true;
}
query("*",doc).forEach(function(node){
var _13a6=node.getAttribute("class");
if(!_13a6){
_13a6="";
}
if(!node._maqAlreadyPreserved&&_13a6.indexOf(_13a4)<0){
node._maqAlreadyPreserved=true;
var _13a7=_139b.retrieve(node);
if(node.tagName!="BODY"&&_13a7&&(_13a7.maqAppStates||_13a7.maqDeltas)){
var _13a8=_13a4+count;
_13a6=_13a6+" "+_13a8;
node.setAttribute("class",_13a6);
count++;
cache[_13a8]={};
if(_13a7.maqAppStates){
cache[_13a8].maqAppStates=_13a7.maqAppStates;
}
if(_13a7.maqDeltas){
cache[_13a8].maqDeltas=_13a7.maqDeltas;
}
if(node.style){
cache[_13a8].style=node.style.cssText;
}else{
console.error("States.js _preserveStates. No value for node.style.");
}
}
}
});
};
var _13a2=function(cache,_13a9){
var doc=_139b.getDocument(),_13aa=[],_13ab,_13ac,_13ad,_13ae;
for(var id in cache){
var node;
if(id=="body"){
node=doc.body;
}else{
node=doc.querySelectorAll("."+id)[0];
}
if(node){
var _13af=(node.tagName=="BODY");
_13ab=_13ac=_13ad=_13ae=null;
if(_13af){
_13ab=cache[id];
}else{
_13ab=cache[id].maqAppStates;
_13ac=cache[id].maqDeltas;
}
if(_13ab){
_13ad=_139b.deserialize(_13ab,{isBody:_13af});
}
if(_13ac){
_13ae=_139b.deserialize(_13ac,{isBody:_13af});
}
if(_13ad){
if(_13ad.initial){
_13ad.current=_13ad.initial;
}else{
if(_13ad.focus){
delete _13ad.focus;
}
delete _13ad.current;
}
}
_139b.store(node,_13ad,_13ae);
if(_13ac){
davinci.states.transferElementStyle(node,cache[id].style);
}
}
}
var _13b0=_139b.getAllStateContainers(doc.body);
var _13b1=[];
for(var i=0;i<_13b0.length;i++){
var _13b2=_13b0[i];
if(_13b2._maqAppStates&&typeof _13b2._maqAppStates.current=="string"){
var focus=_13b2._maqAppStates.focus;
_139b.setState(_13b2._maqAppStates.current,_13b2,{updateWhenCurrent:true,focus:focus});
}
}
};
});
}
}
})();
if(!davinci.Workbench&&typeof dijit!="undefined"){
_132d.subscribe("/maqetta/appstates/state/changed",function(args){
var w;
var byId=(args&&args.node&&args.node.ownerDocument&&args.node.ownerDocument.defaultView&&args.node.ownerDocument.defaultView.dijit.byId);
if(byId){
if(args.newState&&!args.newState.indexOf("_show:")){
w=byId(args.newState.substring(6));
w&&w.show&&w.show();
}else{
if(args.oldState&&!args.oldState.indexOf("_show:")){
w=byId(args.oldState.substring(6));
w&&w.hide&&w.hide();
}
}
}
});
}
return _1333;
});
},"dijit/Tooltip":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/on","dojo/sniff","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","./main"],function(array,_13b3,fx,dom,_13b4,_13b5,_13b6,lang,mouse,on,has,_13b7,place,_13b8,_13b9,_13ba,_13bb,dijit){
var _13bc=_13b3("dijit._MasterTooltip",[_13b8,_13b9],{duration:_13b7.defaultDuration,templateString:_13bb,postCreate:function(){
this.ownerDocumentBody.appendChild(this.domNode);
this.bgIframe=new _13ba(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_13bd,_13be,_13bf,rtl,_13c0){
if(this.aroundNode&&this.aroundNode===_13be&&this.containerNode.innerHTML==_13bd){
return;
}
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_13bd;
if(_13c0){
this.set("textDir",_13c0);
}
this.containerNode.align=rtl?"right":"left";
var pos=place.around(this.domNode,_13be,_13bf&&_13bf.length?_13bf:_13c1.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _13c2=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_13c2.y+((_13c2.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_13c2.x+((_13c2.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}else{
this.connectorNode.style.left="";
this.connectorNode.style.top="";
}
}
_13b6.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_13be;
},orient:function(node,_13c3,_13c4,_13c5,_13c6){
this.connectorNode.style.top="";
var _13c7=_13c5.h,_13c8=_13c5.w;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_13c3+"-"+_13c4];
this.domNode.style.width="auto";
var size=_13b5.position(this.domNode);
if(has("ie")==9){
size.w+=2;
}
var width=Math.min((Math.max(_13c8,1)),size.w);
_13b5.setMarginBox(this.domNode,{w:width});
if(_13c4.charAt(0)=="B"&&_13c3.charAt(0)=="B"){
var bb=_13b5.position(node);
var _13c9=this.connectorNode.offsetHeight;
if(bb.h>_13c7){
var _13ca=_13c7-((_13c6.h+_13c9)>>1);
this.connectorNode.style.top=_13ca+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_13c6.h/2-_13c9/2,0),bb.h-_13c9)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_13c8);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_13cb){
if(this._onDeck&&this._onDeck[1]==_13cb){
this._onDeck=null;
}else{
if(this.aroundNode===_13cb){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
},_setAutoTextDir:function(node){
this.applyTextDir(node,has("ie")?node.outerText:node.textContent);
array.forEach(node.children,function(child){
this._setAutoTextDir(child);
},this);
},_setTextDirAttr:function(_13cc){
this._set("textDir",_13cc);
if(_13cc=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
dijit.showTooltip=function(_13cd,_13ce,_13cf,rtl,_13d0){
if(_13cf){
_13cf=array.map(_13cf,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_13c1._masterTT){
dijit._masterTT=_13c1._masterTT=new _13bc();
}
return _13c1._masterTT.show(_13cd,_13ce,_13cf,rtl,_13d0);
};
dijit.hideTooltip=function(_13d1){
return _13c1._masterTT&&_13c1._masterTT.hide(_13d1);
};
var _13c1=_13b3("dijit.Tooltip",_13b8,{label:"",showDelay:400,connectId:[],position:[],selector:"",_setConnectIdAttr:function(newId){
array.forEach(this._connections||[],function(_13d2){
array.forEach(_13d2,function(_13d3){
_13d3.remove();
});
},this);
this._connectIds=array.filter(lang.isArrayLike(newId)?newId:(newId?[newId]:[]),function(id){
return dom.byId(id,this.ownerDocument);
},this);
this._connections=array.map(this._connectIds,function(id){
var node=dom.byId(id,this.ownerDocument),_13d4=this.selector,_13d5=_13d4?function(_13d6){
return on.selector(_13d4,_13d6);
}:function(_13d7){
return _13d7;
},self=this;
return [on(node,_13d5(mouse.enter),function(){
self._onHover(this);
}),on(node,_13d5("focusin"),function(){
self._onHover(this);
}),on(node,_13d5(mouse.leave),lang.hitch(self,"_onUnHover")),on(node,_13d5("focusout"),lang.hitch(self,"_onUnHover"))];
},this);
this._set("connectId",newId);
},addTarget:function(node){
var id=node.id||node;
if(array.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=array.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_13b4.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
array.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},getContent:function(node){
return this.label||this.domNode.innerHTML;
},_onHover:function(_13d8){
if(!this._showTimer){
this._showTimer=this.defer(function(){
this.open(_13d8);
},this.showDelay);
}
},_onUnHover:function(){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
this.close();
},open:function(_13d9){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
var _13da=this.getContent(_13d9);
if(!_13da){
return;
}
_13c1.show(_13da,_13d9,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_13d9;
this.onShow(_13d9,this.position);
},close:function(){
if(this._connectNode){
_13c1.hide(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
},onShow:function(){
},onHide:function(){
},destroy:function(){
this.close();
array.forEach(this._connections||[],function(_13db){
array.forEach(_13db,function(_13dc){
_13dc.remove();
});
},this);
this.inherited(arguments);
}});
_13c1._MasterTooltip=_13bc;
_13c1.show=dijit.showTooltip;
_13c1.hide=dijit.hideTooltip;
_13c1.defaultPosition=["after-centered","before-centered"];
return _13c1;
});
},"dijit/PopupMenuItem":function(){
define(["dojo/_base/declare","dojo/dom-style","dojo/query","./registry","./MenuItem","./hccss"],function(_13dd,_13de,query,_13df,_13e0){
return _13dd("dijit.PopupMenuItem",_13e0,{_fillContent:function(){
if(this.srcNodeRef){
var nodes=query("*",this.srcNodeRef);
this.inherited(arguments,[nodes[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var node=query("[widgetId]",this.dropDownContainer)[0];
this.popup=_13df.byNode(node);
}
this.ownerDocumentBody.appendChild(this.popup.domNode);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
_13de.set(this.arrowWrapper,"visibility","");
}
this.focusNode.setAttribute("aria-haspopup","true");
},destroyDescendants:function(_13e1){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive(_13e1);
}
delete this.popup;
}
this.inherited(arguments);
}});
});
},"davinci/Theme":function(){
define(["dojo/_base/declare","dojo/promise/all","./Workbench","./library","./workbench/Preferences","./model/Path","./html/HTMLFile","./model/Factory","system/resource"],function(_13e2,all,_13e3,_13e4,_13e5,Path,_13e6,_13e7,_13e8){
var Theme={TEMP_CLONE_PRE:"clone_",desktop_default:"desktop_default",mobile_default:"custom_default",default_theme:"(device-specific)",none_themeset_name:"(none)",other_device:"other",none_theme:"none",dojoMobileDefault:[{"theme":"android","device":"Android"},{"theme":"blackberry","device":"BlackBerry"},{"theme":"ipad","device":"iPad"},{"theme":"iphone","device":"iPhone"},{"theme":"iphone","device":"other"}],dojoMobileCustom:[{"theme":"custom","device":"Android"},{"theme":"custom","device":"BlackBerry"},{"theme":"custom","device":"iPad"},{"theme":"custom","device":"iPhone"},{"theme":"custom","device":"other"}],isThemeHTML:function(_13e9){
return _13e9.getName().indexOf("dojo-theme-editor.html")>-1;
},CloneTheme:function(name,_13ea,_13eb,_13ec,_13ed,_13ee){
var _13ef=[];
var _13f0=_13ed.file.parent;
var _13f1=new Path(_13ec).removeLastSegments(0);
var _13f2=_13e8.findResource(_13f1.toString());
if(_13f2.readOnly()){
_13f2.createResource();
}
_13e8.createResource(_13ec,true);
var _13f3=_13e8.findResource(_13ec);
var _13f4=_13ed.file.getName();
var _13f5=new Path(_13f3.getPath());
var _13f6=_13f5.lastSegment();
var _13f7=_13f3.createResource(_13f6+".theme");
var _13f8=_13f3.createResource(_13f6+".css");
var _13f9=this.getThemeLocation();
var _13fa=_13ed.file.parent.getPath();
function _13fb(_13fc){
var ret=[];
_13fc.forEach(function(_13fd){
var file=_13e8.findResource(_13fa+"/"+_13fd);
var _13fe=new Path(file.getPath());
var _13ff=_13fe.relativeTo("./"+_13f9,true);
var _1400="..";
for(var i=0;i<_13ff.segments.length;i++){
_1400=_1400+"/"+_13ff.segments[i];
}
ret.push(_1400);
});
return ret;
};
var _1401=_13fb(_13ed.themeEditorHtmls);
var meta=_13fb(_13ed.meta);
var _1402=_13fb(_13ed.files);
var _1403=" ";
_1402.forEach(function(_1404){
_1403=_1403+"@import url(\""+_1404+"\");";
});
var _1405={className:_13ed.className,name:name,version:_13ea||_13ed.version,specVersion:_13ed.specVersion,files:[""+_13f6+".css"],meta:meta,themeEditorHtmls:_1401,useBodyFontBackgroundClass:_13ed.useBodyFontBackgroundClass};
if(_13ed.helper){
if(_13ed.helper.declaredClass){
_1405.helper=_13ed.helper.declaredClass;
}else{
_1405.helper=_13ed.helper;
}
}
if(_13ed.base){
_1405.base=_13ed.base;
}
if(_13ed.type){
_1405.type=_13ed.type;
}
if(_13ed.conditionalFiles){
_1405.conditionalFiles=_13ed.conditionalFiles;
var _1406=_13fb(_13ed.conditionalFiles);
for(var i=0;i<_1405.conditionalFiles.length;i++){
var _1407=_13f3.createResource(_1405.conditionalFiles[i]);
_13ef.push(_1407.setContents("@import url(\""+_1406[i]+"\");"));
}
}
var d=_13f7.setContents(JSON.stringify(_1405));
d.themeFile=_13f7;
_13ef.push(d);
_13ef.push(_13f8.setContents(_1403));
var ret={promise:all(_13ef),themeFile:_13f7};
return ret;
},getHelper:function(theme){
if(!theme){
return;
}
if(theme.helper&&typeof (theme.helper)!="string"){
return theme.helper;
}
var _1408=theme.helper;
if(_1408){
var _1409=new dojo.Deferred();
require([_1408],function(_140a){
_140a.declaredClass=_1408;
_1408=_140a;
_1409.resolve({helper:_1408});
});
return _1409;
}
},getThemeSet:function(_140b){
var _140c=_13e5.getPreferences("maqetta.dojo.themesets",_13e3.getProject()),_140d=dojo.clone(this.dojoMobileDefault),_140e;
if(!_140c){
_140c=this.dojoThemeSets;
}
_140c=dojo.clone(_140c);
if(_140b){
var _140f=_140b._getDojoJsElem().getAttribute("data-dojo-config");
if(_140f){
_140f=require.eval("({ "+_140f+" })","data-dojo-config");
if(_140f.themeMap){
_140d=Theme.getDojoxMobileThemesFromThemeMap(_140b,_140f.themeMap);
}
}
var _1410=_140b.getTheme();
for(var s=0,len=_140c.themeSets.length;s<len;s++){
_140e=_140c.themeSets[s];
if(_140e.desktopTheme===_1410.name){
if(this.themeSetEquals(_140d,_140e.mobileTheme)){
return _140e;
}
}
}
}
_140e={name:this.none_themeset_name,desktopTheme:_140b?_1410.name:"claro",mobileTheme:_140d};
_140c.themeSets.push(_140e);
return _140e;
},getBase:function(){
if(_13e3.singleProjectMode()){
return _13e3.getProject();
}
},getThemeLocation:function(){
var base=this.getBase();
var prefs=_13e5.getPreferences("davinci.ui.ProjectPrefs",base);
var _1411=(new Path(base).append(prefs["themeFolder"]));
return _1411;
},getTheme:function(name,_1412){
var _1413=_13e4.getThemes(_13e3.getProject(),this.workspaceOnly,_1412);
for(var i=0;i<_1413.length;i++){
if(_1413[i]&&_1413[i].name===name){
return _1413[i];
}
}
},getThemeByCssFile:function(_1414){
var _1415=_13e4.getThemes(_13e3.getProject(),this.workspaceOnly);
var _1416=_1414.getResource().getPath();
for(var i=0;i<_1415.length;i++){
var _1417=_1415[i].file;
var path=_1417.getParentFolder().getPath();
for(var x=0;x<_1415[i].files.length;x++){
var _1418=path+"/"+_1415[i].files[x];
if(_1418===_1416){
return _1415[i];
}
}
}
return null;
},getDojoxMobileThemeMap:function(_1419,_141a){
var _141b=[];
var other=[".*","iphone",[]];
for(var i=0;i<_141a.length;i++){
if(_141a[i].theme!=this.none_theme&&_141a[i].theme!=this.default_theme){
var theme=this.getTheme(_141a[i].theme);
if(theme){
var _141c=new Path(theme.file.parent.getPath()).append(theme.files[0]);
var _141d=_1419.getFullResourcePath();
var _141e=_141c.relativeTo(_141d,true).toString();
if(_141a[i].device===this.other_device){
other=[".*",theme.base,[_141e]];
}else{
_141b.push([_141a[i].device,theme.base,[_141e]]);
}
}
}
}
_141b.push(other);
return _141b;
},getDojoxMobileThemesFromThemeMap:function(_141f,_1420){
var _1421=_13e4.getThemes(_13e3.getProject(),this.workspaceOnly,true);
var _1422=[];
_1420.forEach(function(item,idx,arr){
for(var i=0;i<_1421.length;i++){
var theme=_1421[i];
var _1423=new Path(theme.file.parent.getPath()).append(theme.files[0]);
var _1424=_141f.getFullResourcePath();
var _1425=_1423.relativeTo(_1424,true).toString();
if(_1425==item[2][0]){
var o={};
o.device=item[0];
o.theme=theme.name;
if(o.device===".*"){
o.device="other";
}
_1422.push(o);
break;
}
}
},this);
return _1422;
},themeSetEquals:function(o1,o2){
function _1426(obj){
var count=0;
for(var k in obj){
if(obj.hasOwnProperty(k)){
count++;
}
}
return count;
};
if(typeof (o1)!==typeof (o2)){
return false;
}
if(typeof (o1)==="function"){
return o1.toString()===o2.toString();
}
if(o1 instanceof Object&&o2 instanceof Object){
if(_1426(o1)!==_1426(o2)){
return false;
}
var r=true;
for(var k in o1){
r=this.themeSetEquals(o1[k],o2[k]);
if(!r){
return false;
}
}
return true;
}else{
return o1===o2;
}
},singleMobileTheme:function(_1427){
var _1428=_1427.mobileTheme[0].theme;
for(var i=1;i<_1427.mobileTheme.length;i++){
if(_1427.mobileTheme[i].theme!=_1428){
return false;
}
}
return true;
}};
Theme.none_themeset={"name":Theme.none_themeset_name,"desktopTheme":"claro","mobileTheme":dojo.clone(Theme.dojoMobileDefault)};
Theme.default_themeset={"name":Theme.desktop_default,"desktopTheme":"claro","mobileTheme":dojo.clone(Theme.dojoMobileDefault)};
Theme.custom_themeset={"name":Theme.mobile_default,"desktopTheme":"claro","mobileTheme":Theme.dojoMobileCustom};
Theme.dojoThemeSets={"version":"1.7","specVersion":"0.8","helper":"maq-metadata-dojo/dojox/mobile/ThemeHelper","themeSets":[Theme.custom_themeset]};
return Theme;
});
},"davinci/workbench/Preferences":function(){
define(["dojo/_base/declare","dojo/_base/xhr","../Runtime","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","davinci/ui/Dialog","dijit/Tree","dijit/tree/ForestStoreModel","dojo/data/ItemFileReadStore","dojo/i18n!./nls/workbench","dojo/i18n!dijit/nls/common","dojo/text!./templates/Preferences.html","dijit/form/Button"],function(_1429,xhr,_142a,_142b,_142c,_142d,_142e,Tree,_142f,_1430,_1431,_1432,_1433){
var _1434=_1429([_142b,_142c,_142d],{templateString:_1433,commonStrings:_1432,resize:function(){
this.borderContainer.resize();
}});
var _1435={_allPrefs:{},savePreferences:function(id,base,_1436){
xhr.put({url:"cmd/setPreferences?id="+id+"&base="+encodeURIComponent(base),putData:dojo.toJson(_1436),handleAs:"json",contentType:"text/html"}).then(function(){
if(!_1435._allPrefs[base]){
_1435._allPrefs[base]={};
}
_1435._allPrefs[base][id]=_1436;
dojo.publish("/davinci/preferencesChanged",[{id:id,preferences:_1436}]);
});
},_loadExtensions:function(){
if(!_1435._extensions){
_1435._extensions=_142a.getExtensions("davinci.preferences");
}
},showPreferencePage:function(){
_1435._loadExtensions();
var _1437=_1435.getPrefJson();
if(!_1437||_1437.length<1){
alert(_1431.noUserPref);
return;
}
this.dialog=_142e.showModal(new _1434({}),_1431.preferences,{width:700,height:500});
var _1438=new _1430({data:_1437,jsId:"prefTreeDataStore"});
var _1439=new _142f({jsId:"fileModel",labelAttr:"name",store:_1438});
var _143a=dijit.byId("prefTree");
if(!_143a){
_143a=new Tree({model:_1439,id:"prefTree",persist:false,query:"{type:'directory'}",label:"Preferences",labelAttr:"name",showRoot:false,childrenAttrs:"children"});
}
_143a.onClick=function(node){
_1435.setPaneContent(node);
};
dojo.byId("pref.TreePane").appendChild(_143a.domNode);
_143a.startup();
},getPrefJson:function(){
var ejson=_1435._extensions;
if(ejson==null){
return [];
}
var _143b=[];
for(var i=0;i<ejson.length;i++){
ejson[i]._index=i;
if(ejson[i].category){
if(!_143b[ejson[i].category]){
_143b[ejson[i].category]=[];
}
_143b[ejson[i].category].push(ejson[i]);
}else{
if(!_143b.root){
_143b.root=[];
}
_143b.root.push(ejson[i]);
}
}
var _143c=_143b.root.map(function(node){
return {id:node.id,name:node.name,index:node._index,children:_1435._getPrefJsonChildren(node.id,_143b)};
});
return {items:_143c};
},_getPrefJsonChildren:function(catId,_143d){
var _143e=_143d[catId];
if(!_143e){
return [];
}
var _143f=[];
for(var p=0;p<_143e.length;p++){
_143f[p]={id:_143e[p].id,name:_143e[p].name,index:_143e[p]._index};
if(_143d[_143e[p].id]){
_143f[p].children=_1435._getPrefJsonChildren(_143e[p].id,_143d);
}
}
return _143f;
},setPaneContent:function(node){
var _1440;
delete _1435._currentPane;
var _1441=_1435._extensions[node.index[0]];
var prefs=_1435.getPreferences(_1441.id,davinci.Workbench.getProject());
if(_1441.pane){
require([_1441.pane],function(cls){
var pane=new cls();
_1435._currentPane=pane;
_1435._currentPane._extension=_1441;
_1435._currentPane.setPreferences(prefs);
dijit.byId("pref.RightPane").setContent(pane.domNode);
});
}else{
if(_1441.pageContent){
_1440=document.createTextNode(_1441.pageContent);
}else{
_1440=document.createTextNode("");
}
}
if(_1440){
dijit.byId("pref.RightPane").setContent(_1440);
}
},_save:function(_1442){
if(_1435._currentPane){
var prefs=_1435._currentPane.getPreferences();
var id=_1435._currentPane._extension.id;
var base=davinci.Workbench.getProject();
_1435.savePreferences(id,base,prefs);
if(_1435._currentPane.save){
_1435._currentPane.save(prefs);
}
}
for(var i=0;i<_1442.length;i++){
try{
if(_1442[i].save){
_1442[i].save();
}
}
catch(ex){
}
if(_1442[i].children&&_1442[i].children.length>0){
_1435._save(_1442[i].children);
}
}
},save:function(){
_1435._save(_1435._extensions);
_1435.finish();
},finish:function(){
_1435._extensions=null;
_1435._currentPane=null;
this.dialog.destroyRecursive(false);
this.dialog=null;
},getPreferences:function(id,base){
if(!_1435._allPrefs[base]){
_1435._allPrefs[base]={};
}
if(!_1435._allPrefs[base][id]){
var prefs=_142a.serverJSONRequest({url:"cmd/getPreferences",handleAs:"json",content:{id:id,base:base},sync:true});
if(!prefs){
prefs=_1435.getDefaultPreferences(id);
}
_1435._allPrefs[base][id]=prefs;
}
return _1435._allPrefs[base][id];
},getDefaultPreferences:function(id){
_1435._loadExtensions();
for(var i=0;i<_1435._extensions.length;i++){
if(_1435._extensions[i].id==id){
if(dojo.isString(_1435._extensions[i].defaultValues)){
var prefs=_142a.serverJSONRequest({url:_1435._extensions[i].defaultValues,handleAs:"json",sync:true});
return prefs.defaultValues;
}
return _1435._extensions[i].defaultValues;
}
}
}};
return dojo.setObject("davinci.workbench.Preferences",_1435);
});
},"dijit/layout/ContentPane":function(){
define(["dojo/_base/kernel","dojo/_base/lang","../_Widget","../_Container","./_ContentPaneResizeMixin","dojo/string","dojo/html","dojo/i18n!../nls/loading","dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/_base/xhr","dojo/i18n","dojo/when"],function(_1443,lang,_1444,_1445,_1446,_1447,html,_1448,array,_1449,_144a,dom,_144b,xhr,i18n,when){
return _1449("dijit.layout.ContentPane",[_1444,_1445,_1446],{href:"",content:"",extractContent:false,parseOnLoad:true,parserScope:_1443._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,_setTitleAttr:null,stopParser:true,template:false,create:function(_144c,_144d){
if((!_144c||!_144c.template)&&_144d&&!("href" in _144c)&&!("content" in _144c)){
_144d=dom.byId(_144d);
var df=_144d.ownerDocument.createDocumentFragment();
while(_144d.firstChild){
df.appendChild(_144d.firstChild);
}
_144c=lang.delegate(_144c,{content:df});
}
this.inherited(arguments,[_144c,_144d]);
},postMixInProperties:function(){
this.inherited(arguments);
var _144e=i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_1447.substitute(this.loadingMessage,_144e);
this.errorMessage=_1447.substitute(this.errorMessage,_144e);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.title="";
if(!_144b.get(this.domNode,"role")){
this.domNode.setAttribute("role","group");
}
},startup:function(){
this.inherited(arguments);
if(this._contentSetter){
array.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},_startChildren:function(){
array.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
if(this._contentSetter){
array.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},setHref:function(href){
_1443.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new _144a(lang.hitch(this,"cancel"));
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
_1443.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new _144a(lang.hitch(this,"cancel"));
if(this._created){
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
}
this._setContent(data||"");
this._isDownloaded=false;
return this.onLoadDeferred;
},_getContentAttr:function(){
return this.containerNode.innerHTML;
},cancel:function(){
if(this._xhrDfd&&(this._xhrDfd.fired==-1)){
this._xhrDfd.cancel();
}
delete this._xhrDfd;
this.onLoadDeferred=null;
},destroy:function(){
this.cancel();
this.inherited(arguments);
},destroyRecursive:function(_144f){
if(this._beingDestroyed){
return;
}
this.inherited(arguments);
},_onShow:function(){
this.inherited(arguments);
if(this.href){
if(!this._xhrDfd&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)){
return this.refresh();
}
}
},refresh:function(){
this.cancel();
this.onLoadDeferred=new _144a(lang.hitch(this,"cancel"));
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
this._setContent(this.onDownloadStart(),true);
var self=this;
var _1450={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(lang.isObject(this.ioArgs)){
lang.mixin(_1450,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||xhr.get)(_1450)),_1451;
hand.then(function(html){
_1451=html;
try{
self._isDownloaded=true;
return self._setContent(html,false);
}
catch(err){
self._onError("Content",err);
}
},function(err){
if(!hand.canceled){
self._onError("Download",err);
}
delete self._xhrDfd;
return err;
}).then(function(){
self.onDownloadEnd();
delete self._xhrDfd;
return _1451;
});
delete this._hrefChanged;
},_onLoadHandler:function(data){
this._set("isLoaded",true);
try{
this.onLoadDeferred.resolve(data);
}
catch(e){
console.error("Error "+this.widgetId+" running custom onLoad code: "+e.message);
}
},_onUnloadHandler:function(){
this._set("isLoaded",false);
try{
this.onUnload();
}
catch(e){
console.error("Error "+this.widgetId+" running custom onUnload code: "+e.message);
}
},destroyDescendants:function(_1452){
if(this.isLoaded){
this._onUnloadHandler();
}
var _1453=this._contentSetter;
array.forEach(this.getChildren(),function(_1454){
if(_1454.destroyRecursive){
_1454.destroyRecursive(_1452);
}else{
if(_1454.destroy){
_1454.destroy(_1452);
}
}
_1454._destroyed=true;
});
if(_1453){
array.forEach(_1453.parseResults,function(_1455){
if(!_1455._destroyed){
if(_1455.destroyRecursive){
_1455.destroyRecursive(_1452);
}else{
if(_1455.destroy){
_1455.destroy(_1452);
}
}
_1455._destroyed=true;
}
});
delete _1453.parseResults;
}
if(!_1452){
html._emptyNode(this.containerNode);
}
delete this._singleChild;
},_setContent:function(cont,_1456){
this.destroyDescendants();
var _1457=this._contentSetter;
if(!(_1457&&_1457 instanceof html._ContentSetter)){
_1457=this._contentSetter=new html._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _1458=this.onContentError(e);
try{
this.containerNode.innerHTML=_1458;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _1459=lang.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:!cont.domNode&&this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang,textDir:this.textDir},this._contentSetterParams||{});
var p=_1457.set((lang.isObject(cont)&&cont.domNode)?cont.domNode:cont,_1459);
var self=this;
return when(p&&p.then?p:_1457.parseDeferred,function(){
delete self._contentSetterParams;
if(!_1456){
if(self._started){
self._startChildren();
self._scheduleLayout();
}
self._onLoadHandler(cont);
}
});
},_onError:function(type,err,_145a){
this.onLoadDeferred.reject(err);
var _145b=this["on"+type+"Error"].call(this,err);
if(_145a){
console.error(_145a,err);
}else{
if(_145b){
this._setContent(_145b,true);
}
}
},onLoad:function(){
},onUnload:function(){
},onDownloadStart:function(){
return this.loadingMessage;
},onContentError:function(){
},onDownloadError:function(){
return this.errorMessage;
},onDownloadEnd:function(){
}});
});
},"dojox/grid/_SelectionPreserver":function(){
define("dojox/grid/_SelectionPreserver",["dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array"],function(_145c,_145d,lang,array){
return _145c("dojox.grid._SelectionPreserver",null,{constructor:function(_145e){
this.selection=_145e;
var grid=this.grid=_145e.grid;
this.reset();
this._connects=[_145d.connect(grid,"_setStore",this,"reset"),_145d.connect(grid,"_addItem",this,"_reSelectById"),_145d.connect(_145e,"onSelected",lang.hitch(this,"_selectById",true)),_145d.connect(_145e,"onDeselected",lang.hitch(this,"_selectById",false)),_145d.connect(_145e,"deselectAll",this,"reset")];
},destroy:function(){
this.reset();
array.forEach(this._connects,_145d.disconnect);
delete this._connects;
},reset:function(){
this._selectedById={};
},_reSelectById:function(item,index){
if(item&&this.grid._hasIdentity){
this.selection.selected[index]=this._selectedById[this.grid.store.getIdentity(item)];
}
},_selectById:function(_145f,_1460){
if(this.selection.mode=="none"||!this.grid._hasIdentity){
return;
}
var item=_1460,g=this.grid;
if(typeof _1460=="number"||typeof _1460=="string"){
var entry=g._by_idx[_1460];
item=entry&&entry.item;
}
if(item){
this._selectedById[g.store.getIdentity(item)]=!!_145f;
}
return item;
}});
});
},"davinci/review/actions/OpenVersionAction":function(){
define(["dojo/_base/declare","./_ReviewNavigatorCommon","davinci/Runtime","dojox/widget/Toaster","dojo/i18n!./nls/actions"],function(_1461,_1462,_1463,_1464,nls){
var _1465=_1461("davinci.review.actions.OpenVersionAction",[_1462],{run:function(_1466){
var _1467=this._getSelection(_1466);
if(!_1467||!_1467.length){
return;
}
var item=_1467[0].resource.elementType=="ReviewFile"?_1467[0].resource.parent:_1467[0].resource;
dojo.xhrGet({url:"cmd/managerVersion",sync:false,handleAs:"text",content:{"type":"open","vTime":item.timeStamp}}).then(function(_1468){
if(_1468=="OK"){
if(typeof hasToaster=="undefined"){
new _1464({position:"br-left",duration:4000,messageTopic:"/davinci/review/resourceChanged"});
hasToaster=true;
}
dojo.publish("/davinci/review/resourceChanged",[{message:nls.openSuccessful,type:"message"},"open",item]);
}
});
},isEnabled:function(_1469){
var _146a=this._getSelection(_1469);
if(!_146a||_146a.length==0){
return false;
}
var item=_146a[0].resource.elementType=="ReviewFile"?_146a[0].resource.parent:_146a[0].resource;
if(item.designerId==davinci.Runtime.userName){
if(item.closed&&item.closedManual&&!item.isDraft){
return true;
}
}
return false;
}});
return _1465;
});
},"davinci/ve/utils/URLRewrite":function(){
define([],function(){
var _146b=/^\s*url\s*\(\s*(\'[^\'\"]*\'|\"[^\'\"]*\"|[^\'\"]*)\s*\)\s*$/;
var _146c=/^[\'\"]?([^\'\"]*)[\'\"]?$/;
var _146d=/^(http|ftp)/;
return {isAbsolute:function(url){
if(typeof url!="string"){
return false;
}
var _146e=this.getUrl(url);
if(_146e){
return _146d.test(_146e);
}else{
return false;
}
},containsUrl:function(url){
if(typeof url!="string"){
return false;
}
return _146b.test(url);
},replaceUrl:function(_146f,_1470){
if(typeof _146f!="string"||typeof _1470!="string"){
return null;
}
var _1471=this.getUrl(_146f);
if(_1471){
return "url('"+_1470+"')";
}else{
return null;
}
},stripQuotes:function(s){
var _1472=s.replace(_146c,"$1");
return _1472;
},encodeURI:function(url){
var pass1=encodeURI(url);
return pass1.replace(/#/g,"%23");
},getUrl:function(url){
if(typeof url!="string"){
return null;
}
var _1473=url.match(_146b);
if(_1473&&_1473.length>1){
var match=_1473[1];
return this.stripQuotes(match);
}else{
return null;
}
}};
});
},"dijit/_WidgetsInTemplateMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/parser"],function(array,_1474,_1475){
return _1474("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
var cw=(this._startupWidgets=_1475.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,scope:"dojo"}));
if(!cw.isFulfilled()){
throw new Error(this.declaredClass+": parser returned unfilled promise (probably waiting for module auto-load), "+"unsupported by _WidgetsInTemplateMixin.   Must pre-load all supporting widgets before instantiation.");
}
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
},startup:function(){
array.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
}});
});
},"davinci/repositoryinfo":function(){
define({revision:"@revision@",buildtime:"@buildtime@"});
},"davinci/review/model/resource/root":function(){
define(["dojo/_base/declare","davinci/model/resource/Resource","davinci/review/model/resource/Folder","davinci/Runtime","dojo/Deferred"],function(_1476,_1477,_1478,_1479,_147a){
var root=_1476(_1477,{constructor:function(args){
this.elementType="ReviewRoot";
this.name="root";
this.parent=null;
},findFile:function(_147b,_147c){
var _147d=new _147a();
this.getChildren(function(_147e){
var node=null;
dojo.forEach(_147e,function(item){
if(item.timeStamp==_147b){
node=item;
}
});
var _147f=null;
if(node!=null){
node.getChildren(function(_1480){
dojo.forEach(_1480,function(item){
if(this._fileNamesEqual(item.name,_147c)){
_147f=item;
}
}.bind(this));
_147d.resolve(_147f);
}.bind(this));
}
}.bind(this));
return _147d;
},_fileNamesEqual:function(file1,file2){
if(file1.indexOf("./")!=0){
file1="./"+file1;
}
if(file2.indexOf("./")!=0){
file2="./"+file2;
}
return file1===file2;
},findVersion:function(_1481,_1482){
var _1483=new _147a();
this.getChildren(function(_1484){
var _1485=null;
dojo.some(_1484,function(item){
if(item.designerId==_1481&&item.timeStamp==_1482){
_1485=item;
return true;
}
return false;
});
_1483.resolve(_1485);
});
return _1483;
},getChildren:function(_1486,_1487){
if(!this._isLoaded){
if(this._loading){
this._loading.push(_1486);
return;
}
this._loading=[];
this._loading.push(_1486);
_1479.serverJSONRequest({url:"cmd/listVersions",load:dojo.hitch(this,function(_1488,_1489){
this.children=[];
for(var i=0;i<_1488.length;i++){
var child=new _1478(dojo.mixin({name:_1488[i].versionTitle,parent:this},_1488[i]));
this.children.push(child);
}
this._isLoaded=true;
dojo.forEach(this._loading,function(item){
(item)(this.children);
},this);
delete this._loading;
})});
return;
}
_1486(this.children);
},getPath:function(){
return ".review/snapshot";
}});
return dojo.setObject("davinci.review.model.resource.root",new root());
});
},"davinci/ve/commands/ModifyCommand":function(){
define(["dojo/_base/declare","../widget","../utils/ImageUtils","../States"],function(_148a,_148b,_148c,_148d){
return _148a("davinci.ve.commands.ModifyCommand",null,{name:"modify",constructor:function(_148e,_148f,_1490,_1491,_1492){
this._oldId=(_148e?_148e.id:undefined);
this._properties=_148f=(_148f||{});
this._children=(_1490||typeof _1490=="string")?_1490:_148f._children;
this._context=_1491||_148e.getContext();
this._scripts=_1492;
delete this._properties._children;
},setContext:function(_1493){
this._context=_1493;
},add:function(_1494){
if(!_1494||_1494._oldId!=this._oldId){
return;
}
if(_1494._properties){
dojo.mixin(this._properties,_1494._properties);
}
if(_1494._children){
this._children=_1494._children;
}
},execute:function(){
if(!this._oldId||!this._properties){
return;
}
var _1495=_148b.byId(this._oldId),_1496=this._context;
if(!_1495){
return;
}
this._oldData=_1495.getData();
this._oldData.context=_1496;
this._newData={type:this._oldData.type,properties:dojo.mixin({},this._oldData.properties,this._properties),children:(this._children||typeof this._children=="string")?this._children:this._oldData.children,scripts:dojo.mixin({},this._oldData.scripts,this._scripts),states:this._oldData.states,context:_1496};
if(this._doRefreshFromSource(_1495)){
_1495.setProperties(this._newData.properties,true);
setTimeout(function(){
_1496.visualEditor.refresh();
},0);
return;
}
if(_1496){
_1496.detach(_1495);
}
if(!this._oldData.properties.isTempID||this._properties.id){
delete this._newData.properties.isTempID;
}
var _1497=_1495.getParent();
var _1498=null;
var index=_1497.indexOf(_1495);
_1497.removeChild(_1495);
_1495.destroyWidget();
_1498=_148b.createWidget(this._newData);
if(!_1498){
return;
}
if(_1498.domNode.tagName==="IMG"){
_148c.ImageUpdateFocus(_1498,_1496);
}
_1497.addChild(_1498,index);
this._newId=_1498.id;
if(_1496){
_1496.attach(_1498);
_1498.startup();
_1498.renderWidget();
_1496.widgetAddedOrDeleted();
if(this._oldId!=this._newId){
_1496.widgetChanged(_1496.WIDGET_ID_CHANGED,_1498,this._oldId);
}
_1496.widgetChanged(_1496.WIDGET_MODIFIED,_1498);
}
this.newWidget=_1498;
dojo.publish("/davinci/ui/widget/replaced",[_1498,_1495]);
_148d.resetState(_1498.domNode);
if(this._isRefreshParentOnPropChange(_1495)){
var _1499=new davinci.ve.commands.ModifyCommand(_1497,null,null,_1497._edit_context);
_1499.execute();
}
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[_1498]]);
},_doRefreshFromSource:function(_149a){
var props=this._properties,name,p,_149b=false;
for(name in props){
if(props.hasOwnProperty(name)){
p=_149a.metadata.property[name];
if(p&&p.refreshFromSource){
_149b=true;
break;
}
}
}
return _149b;
},_isRefreshParentOnPropChange:function(_149c){
return davinci.ve.metadata.queryDescriptor(_149c.type,"refreshParentOnPropChange");
},undo:function(){
if(!this._newId||!this._oldData){
return;
}
var _149d=_148b.byId(this._newId);
if(!_149d){
return;
}
var _149e=_149d.getParent();
if(!_149e){
return;
}
var index=dojo.indexOf(_149e.getChildren(),_149d);
if(index<0){
return;
}
var _149f=_149e.getContext();
if(_149f){
_149f.detach(_149d);
}
_149e.removeChild(_149d);
_149d.destroyWidget();
newWidget=_148b.createWidget(this._oldData);
if(!newWidget){
return;
}
this._oldData=newWidget.getData();
this._oldData.context=this._context;
_149e.addChild(newWidget,index);
if(_149f){
_149f.attach(newWidget);
newWidget.startup();
newWidget.renderWidget();
_149f.widgetAddedOrDeleted();
_149f.widgetChanged(_149f.WIDGET_MODIFIED,newWidget);
}
dojo.publish("/davinci/ui/widget/replaced",[newWidget,_149d]);
_148d.resetState(newWidget.domNode);
if(this._isRefreshParentOnPropChange(_149d)){
var _14a0=new davinci.ve.commands.ModifyCommand(_149e,null,null,_149e._edit_context);
_14a0.execute();
}
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[newWidget]]);
}});
});
},"dijit/_HasDropDown":function(){
define(["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_14a1,_14a2,event,dom,_14a3,_14a4,_14a5,_14a6,has,keys,lang,on,_14a7,_14a8,focus,popup,_14a9){
return _14a1("dijit._HasDropDown",_14a9,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
e.preventDefault();
this._docHandler=this.connect(this.ownerDocument,"mouseup","_onDropDownMouseUp");
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _14aa=this.dropDown,_14ab=false;
if(e&&this._opened){
var c=_14a5.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_14ab){
if(_14a4.contains(t,"dijitPopup")){
_14ab=true;
}else{
t=t.parentNode;
}
}
if(_14ab){
t=e.target;
if(_14aa.onItemClick){
var _14ac;
while(t&&!(_14ac=_14a8.byNode(t))){
t=t.parentNode;
}
if(_14ac&&_14ac.onClick&&_14ac.getParent){
_14ac.getParent().onItemClick(_14ac,e);
}
}
return;
}
}
}
if(this._opened){
if(_14aa.focus&&_14aa.autoFocus!==false){
this._focusDropDownTimer=this.defer(function(){
_14aa.focus();
delete this._focusDropDownTimer;
});
}
}else{
this.defer("focus");
}
if(has("ios")){
this._justGotMouseUp=true;
this.defer(function(){
this._justGotMouseUp=false;
});
}
},_onDropDownClick:function(e){
if(has("touch")&&!this._justGotMouseUp){
this._onDropDownMouseDown(e);
this._onDropDownMouseUp(e);
}
if(this._stopClickEvents){
event.stop(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _14ad={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_14a4.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_14ad+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
this.own(on(this._buttonNode,"mousedown",lang.hitch(this,"_onDropDownMouseDown")),on(this._buttonNode,"click",lang.hitch(this,"_onDropDownClick")),on(this.focusNode,"keydown",lang.hitch(this,"_onKey")),on(this.focusNode,"keyup",lang.hitch(this,"_onKeyUp")));
},destroy:function(){
if(this.dropDown){
if(!this.dropDown._destroyed){
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
var d=this.dropDown,_14ae=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
event.stop(e);
return;
}
}
if(d&&this._opened&&e.keyCode==keys.ESCAPE){
this.closeDropDown();
event.stop(e);
}else{
if(!this._opened&&(e.keyCode==keys.DOWN_ARROW||((e.keyCode==keys.ENTER||e.keyCode==dojo.keys.SPACE)&&((_14ae.tagName||"").toLowerCase()!=="input"||(_14ae.type&&_14ae.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
event.stop(e);
}
}
},_onKeyUp:function(){
if(this._toggleOnKeyUp){
delete this._toggleOnKeyUp;
this.toggleDropDown();
var d=this.dropDown;
if(d&&d.focus){
this.defer(lang.hitch(d,"focus"),1);
}
}
},_onBlur:function(){
var _14af=focus.curNode&&this.dropDown&&dom.isDescendant(focus.curNode,this.dropDown.domNode);
this.closeDropDown(_14af);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_14b0){
_14b0();
},loadAndOpenDropDown:function(){
var d=new _14a2(),_14b1=lang.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_14b1);
}else{
_14b1();
}
return d;
},toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
if(!this._opened){
this.loadAndOpenDropDown();
}else{
this.closeDropDown();
}
},openDropDown:function(){
var _14b2=this.dropDown,_14b3=_14b2.domNode,_14b4=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_14b3.style.width){
this._explicitDDWidth=true;
}
if(_14b3.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _14b5={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_14b5.width="";
}
if(!this._explicitDDHeight){
_14b5.height="";
}
_14a6.set(_14b3,_14b5);
var _14b6=this.maxHeight;
if(_14b6==-1){
var _14b7=_14a7.getBox(this.ownerDocument),_14b8=_14a5.position(_14b4,false);
_14b6=Math.floor(Math.max(_14b8.y,_14b7.h-(_14b8.y+_14b8.h)));
}
popup.moveOffScreen(_14b2);
if(_14b2.startup&&!_14b2._started){
_14b2.startup();
}
var mb=_14a5.getMarginSize(_14b3);
var _14b9=(_14b6&&mb.h>_14b6);
_14a6.set(_14b3,{overflowX:"visible",overflowY:_14b9?"auto":"visible"});
if(_14b9){
mb.h=_14b6;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_14b4.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_14b4.offsetWidth);
}else{
delete mb.w;
}
}
if(lang.isFunction(_14b2.resize)){
_14b2.resize(mb);
}else{
_14a5.setMarginBox(_14b3,mb);
}
}
var _14ba=popup.open({parent:this,popup:_14b2,around:_14b4,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_14a3.set(self._popupStateNode,"popupActive",false);
_14a4.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._set("_opened",false);
}});
_14a3.set(this._popupStateNode,"popupActive","true");
_14a4.add(this._popupStateNode,"dijitHasDropDownOpen");
this._set("_opened",true);
this.domNode.setAttribute("aria-expanded","true");
return _14ba;
},closeDropDown:function(focus){
if(this._focusDropDownTimer){
this._focusDropDownTimer.remove();
delete this._focusDropDownTimer;
}
if(this._opened){
this.domNode.setAttribute("aria-expanded","false");
if(focus){
this.focus();
}
popup.close(this.dropDown);
this._opened=false;
}
}});
});
},"url:dijit/form/templates/DropDownBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\n\t/></div\n></div>\n","davinci/ui/widgets/ProjectSelection":function(){
define(["dojo/_base/declare","dijit/_WidgetBase","system/resource","dijit/form/Select","davinci/Workbench"],function(_14bb,_14bc,_14bd,_14be,_14bf){
return _14bb("davinci.ui.widgets.ProjectSelection",_14bc,{postCreate:function(){
_14bd.listProjects(dojo.hitch(this,function(_14c0){
this.value=_14bf.getProject();
this._allProjects=_14c0.map(function(_14c1){
return _14c1.name;
});
this.domNode.removeAttribute("dojoType");
var items=[];
dojo.forEach(_14c0,dojo.hitch(this,function(v){
items.push({label:v.name,value:v.name});
}));
this.combo=new _14be({style:"width:100%",options:items});
this.domNode.appendChild(this.combo.domNode);
this.combo.set("value",this.value);
dojo.connect(this.combo,"onChange",this,"_onChange");
}));
},onChange:function(){
},_onChange:function(){
var _14c2=dojo.attr(this.combo,"value");
if(this.value!=_14c2){
this.value=_14c2;
this.onChange();
}
},_getValueAttr:function(){
return this.value;
},_getSizeAttr:function(){
return this._allProjects.length;
},_getProjectsAttr:function(){
return this._allProjects;
}});
});
},"dijit/form/_CheckBoxMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr","dojo/_base/event"],function(_14c3,_14c4,event){
return _14c3("dijit.form._CheckBoxMixin",null,{type:"checkbox",value:"on",readOnly:false,_aria_attr:"aria-checked",_setReadOnlyAttr:function(value){
this._set("readOnly",value);
_14c4.set(this.focusNode,"readOnly",value);
this.focusNode.setAttribute("aria-readonly",value);
},_setLabelAttr:undefined,_getSubmitValue:function(value){
return !value&&value!==0?"on":value;
},_setValueAttr:function(_14c5){
_14c5=this._getSubmitValue(_14c5);
this._set("value",_14c5);
_14c4.set(this.focusNode,"value",_14c5);
},reset:function(){
this.inherited(arguments);
this._set("value",this.params.value||"on");
_14c4.set(this.focusNode,"value",this.value);
},_onClick:function(e){
if(this.readOnly){
event.stop(e);
return false;
}
return this.inherited(arguments);
}});
});
},"dojo/html":function(){
define(["./_base/kernel","./_base/lang","./_base/array","./_base/declare","./dom","./dom-construct","./parser"],function(_14c6,lang,_14c7,_14c8,dom,_14c9,_14ca){
var html={};
lang.setObject("dojo.html",html);
var _14cb=0;
html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
html._emptyNode=_14c9.empty;
html._setNodeContent=function(node,cont){
_14c9.empty(node);
if(cont){
if(typeof cont=="string"){
cont=_14c9.toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&lang.isArrayLike(cont)){
for(var _14cc=cont.length,i=0;i<cont.length;i=_14cc==cont.length?i+1:0){
_14c9.place(cont[i],node,"last");
}
}else{
_14c9.place(cont,node,"last");
}
}
return node;
};
html._ContentSetter=_14c8("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:_14c6._scopeName,startup:true,constructor:function(_14cd,node){
lang.mixin(this,_14cd||{});
node=this.node=dom.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_14cb++].join("_");
}
},set:function(cont,_14ce){
if(undefined!==cont){
this.content=cont;
}
if(_14ce){
this._mixin(_14ce);
}
this.onBegin();
this.setContent();
var ret=this.onEnd();
if(ret&&ret.then){
return ret;
}else{
return this.node;
}
},setContent:function(){
var node=this.node;
if(!node){
throw new Error(this.declaredClass+": setContent given no node");
}
try{
node=html._setNodeContent(node,this.content);
}
catch(e){
var _14cf=this.onContentError(e);
try{
node.innerHTML=_14cf;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseDeferred){
if(!this.parseDeferred.isResolved()){
this.parseDeferred.cancel();
}
delete this.parseDeferred;
}
if(this.parseResults&&this.parseResults.length){
_14c7.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
html._emptyNode(this.node);
},onBegin:function(){
var cont=this.content;
if(lang.isString(cont)){
if(this.cleanContent){
cont=html._secureForInnerHtml(cont);
}
if(this.extractContent){
var match=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(match){
cont=match[1];
}
}
}
this.empty();
this.content=cont;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.parseDeferred;
delete this.node;
delete this.content;
},onContentError:function(err){
return "Error occurred setting content: "+err;
},onExecError:function(err){
return "Error occurred executing scripts: "+err;
},_mixin:function(_14d0){
var empty={},key;
for(key in _14d0){
if(key in empty){
continue;
}
this[key]=_14d0[key];
}
},_parse:function(){
var _14d1=this.node;
try{
var _14d2={};
_14c7.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_14d2[name]=this[name];
}
},this);
var self=this;
this.parseDeferred=_14ca.parse({rootNode:_14d1,noStart:!this.startup,inherited:_14d2,scope:this.parserScope}).then(function(_14d3){
return self.parseResults=_14d3;
});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_14d4){
var _14d5=this["on"+type+"Error"].call(this,err);
if(_14d4){
console.error(_14d4,err);
}else{
if(_14d5){
html._setNodeContent(this.node,_14d5,true);
}
}
}});
html.set=function(node,cont,_14d6){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_14d6){
return html._setNodeContent(node,cont,true);
}else{
var op=new html._ContentSetter(lang.mixin(_14d6,{content:cont,node:node}));
return op.set();
}
};
return html;
});
},"url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n","davinci/ve/themeEditor/metadata/query":function(){
define(["dojo/_base/declare","davinci/ve/utils/URLRewrite"],function(_14d7,_14d8){
return _14d7("davinci.ve.themeEditor.metadata.query",null,{constructor:function(files,_14d9){
this.files=files;
this.cache={};
this.lastLoaded=-1;
this.modules=_14d9;
this.modulePrefix=null;
this.modulePrefix=".";
if(_14d9){
for(var i=0;i<_14d9.length;i++){
this.modulePrefix+="/"+_14d9[i];
}
}
},getType:function(_14da){
var type=null;
if(_14da.declaredClass){
type=_14da.type;
}else{
type=_14da;
if(type.substring(0,5)=="html."){
tagName=type.substring(5);
}
}
return type;
},_loadNextFile:function(){
var _14db=this.files[++this.lastLoaded];
var _14dc=null;
if(_14db.getURL){
_14dc=_14d8.encodeURI(_14db.getURL());
}else{
_14dc=this.modulePrefix+_14db;
}
var md=null;
dojo.xhrGet({url:_14dc,handleAs:"json",sync:true,load:function(_14dd){
md=_14dd;
}});
return md;
},_fullyLoaded:function(){
return this.files.length<=(this.lastLoaded+1);
},_cacheNext:function(){
var _14de=this._loadNextFile();
dojo.mixin(this.cache,_14de);
},getMetaData:function(type){
var path=type.split(".");
var front=path.length>=0?path[0]:path;
var back=path.length>=0?path[path.length-1]:path;
var _14df=this.cache[front];
if(_14df&&_14df[back]){
return _14df[back];
}
if(!this._fullyLoaded()){
this._cacheNext();
return this.getMetaData(type);
}
return null;
}});
});
},"davinci/review/review.plugin":function(){
define(["davinci/css!./resources/Comment.css"],function(){
return {id:"davinci.review","davinci.view":[{id:"comment",title:"Comments",viewClass:"davinci/review/view/CommentView",iconClass:"paletteIcon paletteIconComments"},{id:"reviewNavigator",title:"Reviews",viewClass:"davinci/review/view/CommentExplorerView",iconClass:"paletteIcon paletteIconReviews"},{id:"state",title:"States",viewClass:"davinci/ve/views/StatesView",iconClass:"paletteIcon paletteIconStates"}],"davinci.perspective":{id:"review",title:"Review",views:[{viewID:"davinci.ve.Palette",position:"left",hidden:true},{viewID:"davinci.ui.outline",position:"left",hidden:true},{viewID:"davinci.ve.style",position:"right"},{viewID:"davinci.ui.comment",position:"right",selected:true},{viewID:"davinci.ve.states",position:"right-bottom"},{viewID:"davinci.ui.navigator",position:"left-bottom"},{viewID:"davinci.review.reviewNavigator",position:"left",selected:true}]},"davinci.editor":[{id:"CommentReviewEditor",name:"Review Editor",extensions:"rev",isDefault:true,editorClass:"davinci/review/editor/ReviewEditor",editorClassName:"ReviewEditor",palettePerspective:"davinci.review.review",expandPalettes:["right"]}],"davinci.fileType":[{extension:"rev",iconClass:"reviewFileIcon",type:"text"}],"davinci.actionSets":[{id:"editorActionsReview",visible:true,actions:[{id:"newReview",action:"davinci/review/actions/PublishAction",iconClass:"newOpenMenuItem newReviewMenuItem",label:"Review...",menubarPath:"davinci.new/newTheme"}]},{id:"reviewExplorerActions",visible:true,actions:[{id:"davinci.review.view",label:"Open",action:"davinci/review/actions/ViewFileAction",menubarPath:"newfile"},{id:"davinci.review.edit",label:"Edit...",action:"davinci/review/actions/EditVersionAction",menubarPath:"newfile"},{id:"davinci.review.open",label:"Start",action:"davinci/review/actions/OpenVersionAction",menubarPath:"newfile"},{id:"davinci.review.close",label:"Stop...",action:"davinci/review/actions/CloseVersionAction",menubarPath:"newfile"},{id:"davinci.review.delete",label:"Delete...",action:"davinci/review/actions/DeleteVersionAction",menubarPath:"newfile",keyBinding:{charOrCode:[dojo.keys.DELETE,dojo.keys.BACKSPACE]}},{id:"davinci.review.restart",label:"Republish...",action:"davinci/review/actions/RestartVersionAction",menubarPath:"newfile"}]}],"davinci.actionSetPartAssociations":[{targetID:"davinci.review.editorActionsReview",parts:["davinci.ui.editorMenuBar"]},{targetID:"davinci.review.reviewExplorerActions",parts:["davinci.review.reviewNavigator"]}],"davinci.annotationActions":{editorContribution:{actions:[{id:"arrow",label:"Draw arrow",iconClass:"davinciAnnotationIcon davinciAnnotationIconArrow",action:"davinci/review/actions/ArrowAction",toolbarPath:"annotationtools"},{id:"rect",label:"Draw rectangle",iconClass:"davinciAnnotationIcon davinciAnnotationIconRect",action:"davinci/review/actions/RectAction",toolbarPath:"annotationtools"},{id:"ellipse",label:"Draw ellipse",iconClass:"davinciAnnotationIcon davinciAnnotationIconEllipse",action:"davinci/review/actions/EllipseAction",toolbarPath:"annotationtools"},{id:"textAnnotation",label:"Draw text",iconClass:"davinciAnnotationIcon davinciAnnotationIconText",action:"davinci/review/actions/TextAction",toolbarPath:"annotationtools"},{id:"deleteAnnotation",iconClass:"davinciAnnotationIcon davinciAnnotationIconDelete",label:"Delete Annotation",action:"davinci/review/actions/DeleteAnnotationAction",toolbarPath:"annotationtools_delete",keyBinding:{charOrCode:[dojo.keys.DELETE,dojo.keys.BACKSPACE]}}]}},"davinci.editorActions":{editorContribution:{targetID:"davinci.review.CommentReviewEditor",actions:[{id:"ReviewToolBarText",type:"davinci/review/widgets/ReviewToolBarText",toolbarPath:"ReviewToolBarText"}]}}};
});
},"dojo/dnd/autoscroll":function(){
define(["../_base/lang","../sniff","../_base/window","../dom-geometry","../dom-style","../window"],function(lang,has,win,_14e0,_14e1,_14e2){
var _14e3={};
lang.setObject("dojo.dnd.autoscroll",_14e3);
_14e3.getViewport=_14e2.getBox;
_14e3.V_TRIGGER_AUTOSCROLL=32;
_14e3.H_TRIGGER_AUTOSCROLL=32;
_14e3.V_AUTOSCROLL_VALUE=16;
_14e3.H_AUTOSCROLL_VALUE=16;
var _14e4,doc=win.doc,_14e5=Infinity,_14e6=Infinity;
_14e3.autoScrollStart=function(d){
doc=d;
_14e4=_14e2.getBox(doc);
var html=win.body(doc).parentNode;
_14e5=Math.max(html.scrollHeight-_14e4.h,0);
_14e6=Math.max(html.scrollWidth-_14e4.w,0);
};
_14e3.autoScroll=function(e){
var v=_14e4||_14e2.getBox(doc),html=win.body(doc).parentNode,dx=0,dy=0;
if(e.clientX<_14e3.H_TRIGGER_AUTOSCROLL){
dx=-_14e3.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-_14e3.H_TRIGGER_AUTOSCROLL){
dx=Math.min(_14e3.H_AUTOSCROLL_VALUE,_14e6-html.scrollLeft);
}
}
if(e.clientY<_14e3.V_TRIGGER_AUTOSCROLL){
dy=-_14e3.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-_14e3.V_TRIGGER_AUTOSCROLL){
dy=Math.min(_14e3.V_AUTOSCROLL_VALUE,_14e5-html.scrollTop);
}
}
window.scrollBy(dx,dy);
};
_14e3._validNodes={"div":1,"p":1,"td":1};
_14e3._validOverflow={"auto":1,"scroll":1};
_14e3.autoScrollNodes=function(e){
var b,t,w,h,rx,ry,dx=0,dy=0,_14e7,_14e8;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in _14e3._validNodes)){
var s=_14e1.getComputedStyle(n),_14e9=(s.overflow.toLowerCase() in _14e3._validOverflow),_14ea=(s.overflowX.toLowerCase() in _14e3._validOverflow),_14eb=(s.overflowY.toLowerCase() in _14e3._validOverflow);
if(_14e9||_14ea||_14eb){
b=_14e0.getContentBox(n,s);
t=_14e0.position(n,true);
}
if(_14e9||_14ea){
w=Math.min(_14e3.H_TRIGGER_AUTOSCROLL,b.w/2);
rx=e.pageX-t.x;
if(has("webkit")||has("opera")){
rx+=win.body().scrollLeft;
}
dx=0;
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
_14e7=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_14e9||_14eb){
h=Math.min(_14e3.V_TRIGGER_AUTOSCROLL,b.h/2);
ry=e.pageY-t.y;
if(has("webkit")||has("opera")){
ry+=win.body().scrollTop;
}
dy=0;
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
_14e8=n.scrollTop;
n.scrollTop=n.scrollTop+dy;
}
}
if(dx||dy){
return;
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
_14e3.autoScroll(e);
};
return _14e3;
});
},"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n","dojox/grid/cells":function(){
define("dojox/grid/cells",["../main","./cells/_base"],function(dojox){
return dojox.grid.cells;
});
},"dijit/layout/utils":function(){
define(["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","../main"],function(array,_14ec,_14ed,_14ee,lang,dijit){
var _14ef=lang.getObject("layout",true,dijit);
_14ef.marginBox2contentBox=function(node,mb){
var cs=_14ee.getComputedStyle(node);
var me=_14ed.getMarginExtents(node,cs);
var pb=_14ed.getPadBorderExtents(node,cs);
return {l:_14ee.toPixelValue(node,cs.paddingLeft),t:_14ee.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
function _14f0(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_14f1,dim){
var _14f2=_14f1.resize?_14f1.resize(dim):_14ed.setMarginBox(_14f1.domNode,dim);
if(_14f2){
lang.mixin(_14f1,_14f2);
}else{
lang.mixin(_14f1,_14ed.getMarginBox(_14f1.domNode));
lang.mixin(_14f1,dim);
}
};
_14ef.layoutChildren=function(_14f3,dim,_14f4,_14f5,_14f6){
dim=lang.mixin({},dim);
_14ec.add(_14f3,"dijitLayoutContainer");
_14f4=array.filter(_14f4,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(array.filter(_14f4,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
array.forEach(_14f4,function(child){
var elm=child.domNode,pos=(child.region||child.layoutAlign);
if(!pos){
throw new Error("No region setting for "+child.id);
}
var _14f7=elm.style;
_14f7.left=dim.l+"px";
_14f7.top=dim.t+"px";
_14f7.position="absolute";
_14ec.add(elm,"dijitAlign"+_14f0(pos));
var _14f8={};
if(_14f5&&_14f5==child.id){
_14f8[child.region=="top"||child.region=="bottom"?"h":"w"]=_14f6;
}
if(pos=="top"||pos=="bottom"){
_14f8.w=dim.w;
size(child,_14f8);
dim.h-=child.h;
if(pos=="top"){
dim.t+=child.h;
}else{
_14f7.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_14f8.h=dim.h;
size(child,_14f8);
dim.w-=child.w;
if(pos=="left"){
dim.l+=child.w;
}else{
_14f7.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(child,dim);
}
}
}
});
};
return {marginBox2contentBox:_14ef.marginBox2contentBox,layoutChildren:_14ef.layoutChildren};
});
},"url:davinci/review/widgets/templates/MailFailureDialogContent.html":"<div>\r\n<div class='mailFailureInfo'>${inviteNotSent}</div>\r\n<div class='mailFailureExtraInfo'>${mailFailureMsg}</div>\r\n<div class='mailFailureContent'>${htmlContent}</div>\r\n</div>\r\n","url:dojox/grid/resources/_Grid.html":"<div hidefocus=\"hidefocus\" role=\"grid\" dojoAttachEvent=\"onmouseout:_mouseOut\">\n\t<div class=\"dojoxGridMasterHeader\" dojoAttachPoint=\"viewsHeaderNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterView\" dojoAttachPoint=\"viewsNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterMessages\" style=\"display: none;\" dojoAttachPoint=\"messagesNode\"></div>\n\t<span dojoAttachPoint=\"lastFocusNode\" tabindex=\"0\"></span>\n</div>\n","davinci/de/DijitTemplatedGenerator":function(){
define(["dojo/_base/declare","davinci/model/Path","davinci/ve/metadata"],function(_14f9,Path,_14fa){
return _14f9("davinci.de.DijitTemplatedGenerator",null,{constructor:function(args){
dojo.mixin(this,args);
},buildSource:function(model,_14fb,_14fc,_14fd,_14fe,_14ff){
this.value={js:"",metadata:"",amd:["dojo/_base/declare","dijit/_Widget","dijit/_Templated"]};
this.metadata={id:_14fb,name:_14fb,spec:"1.0",version:"1.0",require:[],library:{dojo:{src:"../../../../dojo/dojo.js"}}};
this.model=this._srcDocument=model;
var _1500=_14ff[0]._srcElement;
var _1501="./"+_14fc+".html";
if(!_14fd){
this.value.amd.push("dojo/text!"+_1501.toString());
this.value.htmlPath=_1501;
}
var _1502=_1500.find({"elementType":"HTMLElement"});
_1502.push(_1500);
this.loadRequires("html.body",true,true,true);
for(var i=0;i<_1502.length;i++){
var n=_1502[i];
var type=n.getAttribute("data-dojo-type")||n.getAttribute("dojoType")||n.getAttribute("dvwidget");
if(type!=null){
this.loadRequires(type,true,true,true);
}
}
this.metadata.require.push({$library:"dojo",format:"amd",src:"widgets/"+_14fb.replace(/\./g,"/"),type:"javascript-module"});
this.value.html="";
this.value.html+=_1500.getText();
this.value.html+="";
var _1503=3;
this.metadata.content="<div></div>";
this.value.js="define([";
for(var i=0;i<this.value.amd.length;i++){
this.value.js+="'"+this.value.amd[i]+"'";
if(i+1<this.value.amd.length){
this.value.js+=",\n";
}
}
this.value.js+="\n],function(";
for(var i=0;i<_1503;i++){
var _1504=this.value.amd[i].split("/");
var _1505=_1504[_1504.length-1];
this.value.js+=_1505;
if(i+1<_1503){
this.value.js+=",";
}
}
if(!_14fd){
this.value.js+=",templateString";
}
this.value.js+="){\n\n";
this.value.js+=" return declare('"+_14fb+"',[ _Widget, _Templated";
this.value.js+="], {\n";
this.value.js+="       widgetsInTemplate:true,\n";
if(!_14fd){
this.value.js+="       templateString:templateString";
}else{
this.value.js+="       templateString:'"+this.escapeHtml(this.value.html)+"'";
delete this.value.html;
}
this.value.js+="   \n});";
this.value.js+="\n});";
this.value.metadata=dojo.toJson(this.metadata);
return this.value;
},escapeHtml:function(text){
var _1506=text.replace(/"/g,"\\\"");
_1506=_1506.replace(/\n/g,"");
return _1506;
},addMetaData:function(row){
for(var i=0;i<this.metadata.require.length;i++){
var m=this.metadata.require[i];
if(m.$library==row.$library&&m.src==row.src&&m.type==row.type&&m.format==row.format){
return;
}
}
this.metadata.require.push(row);
},loadRequires:function(type,_1507,_1508,_1509){
if(!type){
return false;
}
var _150a=_14fa.query(type,"require");
if(!_150a){
return true;
}
_150a.every(function(r){
this.addMetaData(r);
return;
switch(r.type){
case "javascript":
break;
case "javascript-module":
if(r.format!=="amd"){
console.error("Unknown javascript-module format");
}
if(r.src){
this.value.amd.push(r.src);
}else{
console.error("Inline 'javascript-module' not handled");
}
break;
case "css":
if(r.src){
}else{
console.error("Inline CSS not handled");
}
break;
case "image":
break;
default:
console.error("Unhandled metadata resource type '"+r.type+"' for widget '"+type+"'");
}
return true;
},this);
}});
});
},"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>","davinci/js/JSExpression":function(){
define(["dojo/_base/declare","davinci/js/JSElement"],function(_150b,_150c){
return _150b("davinci.js.JSExpression",_150c,{constructor:function(){
this.elementType="JSExpression";
},getText:function(){
var s="";
if(this.comment){
s+=this.printNewLine(context)+this.comment.getText(context);
}
if(this.label){
s+=this.printNewLine(context)+this.label.getText(context);
}
return s;
},add:function(e){
}});
});
},"davinci/ve/States":function(){
define(["dojo/_base/declare","dojo/_base/connect","davinci/Runtime","davinci/maqetta/AppStates","./commands/EventCommand","./commands/StyleCommand","davinci/ve/utils/StyleArray"],function(_150d,_150e,_150f,_1510,_1511,_1512,_1513){
var _1514=_150d(_1510,{_update:function(node,_1515){
if(!_150f.currentEditor||_150f.currentEditor.declaredClass!="davinci.ve.PageEditor"){
return;
}
if(!node||!node._dvWidget||(!node._maqAppStates&&node._maqDeltas)){
return;
}
var _1516=node._dvWidget;
this._refresh(_1516);
},_refresh:function(_1517){
var _1518=_1517.getParent();
if(_1518.dijitWidget){
this._refresh(_1518);
}else{
if(_1517&&_1517.resize){
_1517.resize();
}
}
},_updateEvents:function(node,state,name){
if(!node||!node._dvWidget){
return;
}
var _1519=node._dvWidget;
var _151a=["onclick","onmouseover","onmouseout","onfocus","onblur"];
var _151b;
for(var i in _151a){
var event=_151a[i];
var value=_1519&&_1519.properties&&_1519.properties[event];
if(typeof value=="string"&&value.indexOf("davinci.states.setState")>=0){
var _151c=value;
value=value.replace("'"+state+"'","'"+name+"'");
if(value!==_151c){
_151b=_151b||{};
_151b[event]=value;
}
}
}
var _151d=this.getContext();
if(_151d){
var _151e=new _1511(_1519,_151b);
_151d.getCommandStack().execute(_151e);
}
},normalize:function(type,node,name,value){
switch(type){
case "style":
var _151f=this.getStatesListCurrent(node);
for(var i=0;i<_151f.length;i++){
_151f[i]="Normal";
}
var _1520=this.getStyle(node,_151f,name);
if(_1520){
for(var i=0;i<_1520.length;i++){
if(_1520[i][name]){
value=_1520[i][name];
}
}
}
break;
}
return value;
},normalizeArray:function(type,node,name,_1521){
var _1522=dojo.clone(_1521);
switch(type){
case "style":
var _1523=this.getStatesListCurrent(node);
for(var i=0;i<_1523.length;i++){
_1523[i]="Normal";
}
var _1524=this.getStyle(node,_1523,name);
if(_1524){
for(var i=0;i<_1524.length;i++){
var nItem=_1524[i];
for(var nProp in nItem){
for(var j=_1522.length-1;j>=0;j--){
var vItem=_1522[j];
for(var vProp in vItem){
if(vProp==nProp){
_1522.splice(j,1);
break;
}
}
}
}
}
_1522=_1522.concat(_1524);
}
break;
}
return _1522;
},getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},getContext:function(){
var _1525=this.getEditor();
return _1525&&(_1525.getContext&&_1525.getContext()||_1525.context);
},getDocument:function(){
var _1526=this.getContext();
return _1526&&_1526.getDocument&&_1526.getDocument();
},resetState:function(node){
if(!node){
return;
}
var _1527=this.getStateContainersForNode(node);
var _1528=this.getFocus(node.ownerDocument.body);
for(var i=0;i<_1527.length;i++){
var _1529=_1527[i];
var _152a=this.getState(_1529);
var focus=(_1528&&_1529==_1528.stateContainerNode&&_152a==_1528.state);
this.setState(_152a,_1529,{focus:focus,updateWhenCurrent:true,silent:true});
}
},_updateSrcState:function(node,_152b){
var _152c=(node&&node._dvWidget);
if(!_152c){
return;
}
var _152d=_152c._srcElement.getAttribute(davinci.states.APPSTATES_ATTRIBUTE);
var _152e=_152c._srcElement.getAttribute(davinci.states.DELTAS_ATTRIBUTE);
if(_152c&&_152c._srcElement){
var obj=this.serialize(node);
if(obj.maqAppStates){
obj.maqAppStates.trim();
}
if(obj.maqAppStates){
_152c._srcElement.addAttribute(davinci.states.APPSTATES_ATTRIBUTE,obj.maqAppStates);
}else{
_152c._srcElement.removeAttribute(davinci.states.APPSTATES_ATTRIBUTE);
}
if(obj.maqDeltas){
obj.maqDeltas.trim();
}
if(obj.maqDeltas){
_152c._srcElement.addAttribute(davinci.states.DELTAS_ATTRIBUTE,obj.maqDeltas);
}else{
_152c._srcElement.removeAttribute(davinci.states.DELTAS_ATTRIBUTE);
}
var _152f=_152c._srcElement.getAttribute(davinci.states.APPSTATES_ATTRIBUTE);
var _1530=_152c._srcElement.getAttribute(davinci.states.DELTAS_ATTRIBUTE);
if(_152d!==_152f||_152e!==_1530){
var _1531=this.getEditor();
if(_1531&&_1531._visualChanged){
_1531._visualChanged(_152b);
}
}
}
},_removeStateFromNodeRecursive:function(node,state){
var _1532=node._dvWidget;
if(!node||!_1532||!state){
return;
}
this._removeStateFromNode(node,state);
var _1533=_1532.getChildren();
for(var i=0;i<_1533.length;i++){
this._removeStateFromNodeRecursive(_1533[i].domNode,state);
}
},_removeStateFromNode:function(node,state){
if(node&&node._maqDeltas&&node._maqDeltas[state]){
delete node._maqDeltas[state];
var _1534=false;
for(var prop in node._maqDeltas){
if(prop!=="undefined"){
_1534=true;
break;
}
}
if(!_1534){
delete node._maqDeltas;
}
this._updateSrcState(node);
}
},removeUnusedStates:function(_1535){
if(!_1535){
return;
}
var _1536=_1535.getAllWidgets();
for(var i=0;i<_1536.length;i++){
var node=_1536[i].domNode;
if(node.tagName!=="BODY"){
if(node&&node._maqDeltas){
var _1537=this.getAllStatesForNode(node);
for(var state in node._maqDeltas){
if(state!=="undefined"&&_1537.indexOf(state)<0){
this._removeStateFromNode(node,state);
}
}
}
}
}
},_getStateIndex:function(state){
var _1538;
if(!state||state=="Normal"||state=="undefined"){
_1538="undefined";
}else{
_1538=state;
}
return _1538;
},getCurrentStateIndex:function(){
return this._getStateIndex(this.getState());
},getApplyToStateIndex:function(_1539){
var _153a=this.getState();
var state;
if(_1539==="current"&&_153a&&_153a!="Normal"&&_153a!="undefined"){
state=_153a;
}else{
state=undefined;
}
return this._getStateIndex(state);
},propertyDefinedForAnyCurrentState:function(node,_153b){
var _153c;
var _153d=node._maqDeltas;
if(_153d){
var _153e=this.getStateContainersForNode(node);
outer_loop:
for(var i=_153e.length-1;i>=0;i--){
var _153f=_153e[i];
var _1540=this.getState(_153f);
var _1541=(!_1540||_1540==this.NORMAL)?"undefined":_1540;
var _1542=_153d[_1541]&&_153d[_1541].style;
if(_1542){
for(var s=0;s<_1542.length;s++){
var o=_1542[s];
for(var j=0;j<_153b.length;j++){
if(o.hasOwnProperty(_153b[j])){
_153c=_1540;
break outer_loop;
}
}
}
}
}
}
return _153c;
},initialize:function(){
if(!this.subscribed){
_150e.subscribe("/maqetta/appstates/state/changed",dojo.hitch(this,function(e){
var _1543=this.getEditor();
if(!dojo.isObject(e.node)||!_1543||_1543.declaredClass!="davinci.ve.PageEditor"){
return;
}
dojo.publish("/maqetta/appstates/state/changed/start",[e]);
var _1544=(e.node&&e.node._dvWidget);
var _1544=(_1544==this.getContext().rootWidget)?_1544:_1544.getParent();
var n=_1544.domNode;
var _1545=davinci.states._getChildrenOfNode(n);
while(_1545.length){
var child=_1545.shift();
if(!this.isContainer(child)){
_1545=_1545.concat(davinci.states._getChildrenOfNode(child));
}
var _1546=this.getStatesArray(child,e.oldState,e.newState,e.stateContainerNode);
this._update(child,_1546);
}
dojo.publish("/maqetta/appstates/state/changed/end",[e]);
var _1547=this.getContext();
if(_1547){
_1547.clearCachedWidgetBounds();
_1547.updateFocusAll();
}
}));
_150e.subscribe("/davinci/states/state/renamed",dojo.hitch(this,function(e){
var _1548=this.getEditor();
if(!_1548||_1548.declaredClass=="davinci.themeEditor.ThemeEditor"){
return;
}
var _1549=(e.node&&e.node._dvWidget);
var _154a=davinci.states._getChildrenOfNode(e.node);
while(_154a.length){
var child=_154a.shift();
if(!this.isContainer(child)){
_154a=_154a.concat(davinci.states._getChildrenOfNode(child));
}
this.rename(child,e.oldName,e.newName,true);
this._updateEvents(child,e.oldName,e.newName);
}
var state=this.getState(e.stateContainerNode);
if(state===e.oldName){
this.setState(e.newName,e.stateContainerNode,{updateWhenCurrent:false,silent:true});
}
}));
_150e.subscribe("/davinci/states/state/style/changed",dojo.hitch(this,function(e){
var _154b=this.getState();
if(_154b==e.state){
var _154c=this.findStateContainer(e.node,e.state);
var _154d=this.getStatesArray(e.node,e.state,e.state,_154c);
this._update(e.node,_154d);
}
}));
_150e.subscribe("/davinci/ui/widget/replaced",dojo.hitch(this,function(_154e,_154f){
var _1550=this.getState();
if(_1550){
var _1551=this.findStateContainer(_154e.domNode,_1550);
var _1552=this.getStatesArray(_154e.domNode,_1550,_1550,_1551);
this._update(_154e.domNode,_1552);
}
}));
_150e.subscribe("/davinci/states/state/removed",dojo.hitch(this,function(_1553){
if(!_1553){
return;
}
this._removeStateFromNodeRecursive(_1553.node,_1553.state);
}));
this.subscribed=true;
}
}});
davinci.ve.states=new _1514();
davinci.ve.states.initialize();
return davinci.ve.states;
});
},"davinci/html/HTMLParser":function(){
define(["dojo/_base/declare","davinci/html/HTMLText","davinci/html/HTMLElement","davinci/html/HTMLAttribute","davinci/html/HTMLComment","davinci/html/PHPBlock","davinci/model/parser/Tokenizer","davinci/html/CSSParser"],function(_1554,_1555,_1556,_1557,_1558,_1559,_155a,_155b){
var _155c=(function(){
var _155d={autoSelfClosers:{"br":true,"img":true,"hr":true,"link":true,"input":true,"meta":true,"col":true,"frame":true,"base":true,"area":true},doNotIndent:{"pre":true,"!cdata":true}};
var _155e={autoSelfClosers:{},doNotIndent:{"!cdata":true}};
var _155f=_155d;
var _1560=false;
var _1561=(function(){
function _1562(_1563,_1564){
var ch=_1563.next();
if(ch=="<"){
if(_1563.equals("!")){
_1563.next();
if(_1563.equals("[")){
if(_1563.lookAhead("[CDATA[",true)){
_1564(_1565("xml-cdata","]]>"));
return null;
}else{
return "xml-text";
}
}else{
if(_1563.lookAhead("--",true)){
_1564(_1565("xml-comment","-->"));
return null;
}else{
if(_1563.lookAhead("DOCTYPE",true)){
_1563.nextWhileMatches(/[\w\._\-]/);
_1564(_1565("xml-doctype",">"));
return "xml-doctype";
}else{
return "xml-text";
}
}
}
}else{
if(_1563.equals("?")){
_1563.next();
if(_1563.lookAhead("php",true,false,true)){
_1564(_1566("php-block","?>"));
return null;
}else{
_1563.nextWhileMatches(/[\w\._\-]/);
_1564(_1565("xml-processing","?>"));
return "xml-processing";
}
}else{
if(_1563.equals("/")){
_1563.next();
}
_1564(inTag);
return "xml-punctuation";
}
}
}else{
if(ch=="&"){
while(!_1563.endOfLine()){
if(_1563.next()==";"){
break;
}
}
return "xml-entity";
}else{
_1563.nextWhileMatches(/[^&<\n]/);
return "xml-text";
}
}
};
function inTag(_1567,_1568){
var ch=_1567.next();
if(ch==">"){
_1568(_1562);
return "xml-punctuation";
}else{
if(/[?\/]/.test(ch)&&_1567.equals(">")){
_1567.next();
_1568(_1562);
return "xml-punctuation";
}else{
if(ch=="="){
return "xml-punctuation";
}else{
if(/[\'\"]/.test(ch)){
_1568(_1569(ch));
return null;
}else{
_1567.nextWhileMatches(/[^\s\u00a0=<>\"\'\/?]/);
return "xml-name";
}
}
}
}
};
function _1569(quote){
return function(_156a,_156b){
while(!_156a.endOfLine()){
if(_156a.next()==quote){
_156b(inTag);
break;
}
}
return "xml-attribute";
};
};
function _1565(style,_156c){
return function(_156d,_156e){
while(!_156d.endOfLine()){
if(_156d.lookAhead(_156c,true)){
_156e(_1562);
break;
}
_156d.next();
}
return style;
};
};
function _1566(style,_156f){
return function(_1570,_1571){
var _1572=false;
while(!_1570.endOfLine()){
if(_1570.lookAhead(_156f,true)){
_1572=true;
_1571(_1562);
break;
}
_1570.next();
}
if(!_1572&&_1570.endOfLine()){
_1570.next();
}else{
while(_1570.lookAheadRegex(/^[\ \t]/,true)){
}
if(_1570.endOfLine()){
_1570.next();
}
}
return style;
};
};
return function(_1573,_1574){
return _155a.tokenizer(_1573,_1574||_1562);
};
})();
function _1575(_1576){
var _1577=_1561(_1576),token;
var cc=[base];
var _1578=0,_1579=0;
var _157a=null,_157b=null;
var _157c;
function push(fs){
for(var i=fs.length-1;i>=0;i--){
cc.push(fs[i]);
}
};
function cont(){
push(arguments);
_157c=true;
};
function pass(){
push(arguments);
_157c=false;
};
function _157d(){
token.style+=" xml-error";
};
function _157e(text){
return function(style,_157f){
if(_157f==text){
cont();
}else{
_157d();
cont(arguments.callee);
}
};
};
function _1580(_1581,_1582){
var _1583=_155f.doNotIndent.hasOwnProperty(_1581)||(_157b&&_157b.noIndent);
_157b={prev:_157b,name:_1581,indent:_1579,startOfLine:_1582,noIndent:_1583};
};
function _1584(){
_157b=_157b.prev;
};
function _1585(_1586){
return function(_1587,_1588){
var _1589=_1586;
if(_1589&&_1589.noIndent){
return _1588;
}
if(_1560&&/<!\[CDATA\[/.test(_1587)){
return 0;
}
if(_1589&&/^<\//.test(_1587)){
_1589=_1589.prev;
}
while(_1589&&!_1589.startOfLine){
_1589=_1589.prev;
}
if(_1589){
return _1589.indent+indentUnit;
}else{
return 0;
}
};
};
function base(){
return pass(_158a,base);
};
var _158b={"xml-text":true,"xml-entity":true,"xml-comment":true,"xml-processing":true,"xml-doctype":true,"php-block":true};
function _158a(style,_158c){
if(_158c=="<"){
cont(_158d,_158e,_158f(_1578==1));
}else{
if(_158c=="</"){
cont(_1590,_157e(">"));
}else{
if(style=="xml-cdata"){
if(!_157b||_157b.name!="!cdata"){
_1580("!cdata");
}
if(/\]\]>$/.test(_158c)){
_1584();
}
cont();
}else{
if(_158b.hasOwnProperty(style)){
cont();
}else{
_157d();
cont();
}
}
}
}
};
function _158d(style,_1591){
if(style=="xml-name"){
_157a=_1591.toLowerCase();
token.style="xml-tagname";
cont();
}else{
_157a=null;
pass();
}
};
function _1590(style,_1592){
if(style=="xml-name"){
token.style="xml-tagname";
if(_157b&&_1592.toLowerCase()==_157b.name){
_1584();
}else{
_157d();
}
}
cont();
};
function _158f(_1593){
return function(style,_1594){
if(_1594=="/>"||(_1594==">"&&_155f.autoSelfClosers.hasOwnProperty(_157a))){
cont();
}else{
if(_1594==">"){
_1580(_157a,_1593);
cont();
}else{
_157d();
cont(arguments.callee);
}
}
};
};
function _158e(style){
if(style=="xml-name"){
token.style="xml-attname";
cont(_1595,_158e);
}else{
pass();
}
};
function _1595(style,_1596){
if(_1596=="="){
cont(value);
}else{
if(_1596==">"||_1596=="/>"){
pass(_158f);
}else{
pass();
}
}
};
function value(style){
if(style=="xml-attribute"){
cont(value);
}else{
pass();
}
};
return {indentation:function(){
return _1579;
},next:function(){
token=_1577.next();
if(token.style=="whitespace"&&_1578==0){
_1579=token.value.length;
}else{
_1578++;
}
if(token.content=="\n"){
_1579=_1578=0;
token.indentation=_1585(_157b);
}
if(token.style=="whitespace"||token.type=="xml-comment"||token.type=="php-block"){
return token;
}
while(true){
_157c=false;
cc.pop()(token.style,token.content);
if(_157c){
return token;
}
}
},copy:function(){
var _1597=cc.concat([]),_1598=_1577.state,_1599=_157b;
var _159a=this;
return function(input){
cc=_1597.concat([]);
_1578=_1579=0;
_157b=_1599;
_1577=_1561(input,_1598);
return _159a;
};
}};
};
return {make:_1575,electricChars:"/",configure:function(_159b){
if(_159b.useHTMLKludges!=null){
_155f=_159b.useHTMLKludges?_155d:_155e;
}
if(_159b.alignCDATA){
_1560=_159b.alignCDATA;
}
}};
})();
var parse=function(text,_159c){
var _159d={next:function(){
if(++this.count==1){
return text;
}else{
throw StopIteration;
}
},count:0,text:text};
var _159e=_155a.stringStream(_159d);
var _159f=_155c.make(_159e);
var token;
var _15a0=[];
function error(text){
_15a0.push(text);
};
var stack=[];
stack.push(_159c);
var _15a1;
var _15a2,_15a3;
function _15a4(text,_15a5){
_15a1=new _1555();
_15a1.wasParsed=true;
_15a1.startOffset=_15a5;
stack[stack.length-1].addChild(_15a1,undefined,true);
_15a1.value=text;
};
function _15a6(token){
if(token.content!=token.value){
_15a4(token.value.substring(token.content.length),token.offset+token.value.length);
}
};
function _15a7(str,_15a8){
var lines=str.split("\n");
var _15a9=lines[lines.length-1].length;
if(_15a8.children.length){
lastElement=_15a8.children[_15a8.children.length-1];
lastElement._fmLine=lines.length-1;
lastElement._fmIndent=_15a9;
}else{
_15a8._fmChildLine=lines.length-1;
_15a8._fmChildIndent=_15a9;
}
};
function _15aa(){
if(_15a1!=null&&!_15a1.value.match(/\S/)){
var _15ab=stack[stack.length-1];
_15ab.children.pop();
_15a7(_15a1.value,_15ab);
}
_15a1=null;
};
function _15ac(){
var _15ad=stack[stack.length-1];
_159e.nextWhileMatches(/[\s\u00a0]/);
var str=_159e.get();
if(_15a1!=null){
_15a1.value+=str;
_15aa();
}else{
_15a7(str,_15ad);
}
_155b.parse(_159e,_15ad);
};
function _15ae(_15af){
token=_159f.next();
while(_15af&&token.style=="whitespace"){
token=_159f.next();
}
return token;
};
try{
do{
token=_159f.next();
switch(token.style){
case "xml-punctuation":
_15aa();
if(token.content=="<"){
var model=new _1556();
model.wasParsed=true;
model.startOffset=token.offset;
stack[stack.length-1].addChild(model,undefined,true);
_15ae(true);
if(token.style=="xml-tagname"){
model.tag=token.content;
}else{
error("expecting tag name");
}
while((token=_15ae(true)).style=="xml-attname"){
var _15b0=new _1557();
_15b0.wasParsed=true;
model.attributes.push(_15b0);
_15b0.name=token.content;
_15b0.startOffset=token.offset;
_15ae(true);
if(token.content=="="){
token=_159f.next();
if(token.style=="xml-attribute"){
var s=token.content;
_15b0.setValue(s.substring(1,s.length-1));
}else{
error("expecting attribute value");
}
}else{
_15b0.noValue=true;
_15b0.setValue(true);
}
_15b0.endOffset=token.offset-1;
if(_15b0.noValue&&token.style!="xml-attname"){
break;
}
}
if(token.style!="xml-punctuation"){
error("expecting >");
}else{
model.startTagOffset=token.offset;
if(token.content==">"){
stack.push(model);
}else{
model.noEndTag=true;
model=stack[stack.length-1];
}
_15a6(token);
}
if(model.tag=="style"){
_15ac();
}
}else{
if(token.value=="</"){
var _15b1=model;
token=_159f.next();
if(model.tag=="script"){
model.script=model.getElementText();
}
stack.pop();
model=stack[stack.length-1];
token=_159f.next();
_15b1.endOffset=token.offset;
_15a6(token);
}
}
_15a3=null;
break;
case "xml-text":
case "whitespace":
case "xml-entity":
if(_15a2){
_15a2.value+=token.value;
}else{
if(_15a3){
_15a3.value+=token.value;
}else{
if(!_15a1){
_15a4(token.value,token.offset);
}else{
_15a1.value+=token.value;
}
}
}
_15a3=null;
break;
case "xml-comment":
_15aa();
var _15b2=new _1558();
_15b2.wasParsed=true;
_15b2.startOffset=token.offset;
_15b2.value=token.content.substring(4,token.content.length-3);
_15b2.endOffset=token.offset+token.content.length;
stack[stack.length-1].addChild(_15b2,undefined,true);
_15a3=null;
break;
case "php-block":
_15aa();
var _15b3=new _1559();
_15b3.wasParsed=true;
_15b3.startOffset=token.offset;
_15b3.value=token.content;
_15b3.endOffset=token.offset+token.content.length;
stack[stack.length-1].addChild(_15b3,undefined,true);
_15a3=_15b3;
break;
case "xml-doctype":
if(!_15a2){
_15aa();
var _15b2=new _1558();
_15b2.wasParsed=true;
_15b2.startOffset=token.offset;
_15b2.value=token.value.substring(2);
stack[stack.length-1].addChild(_15b2,undefined,true);
_15b2.isProcessingInstruction=true;
token=_159f.next();
}
var _15b4=token.content.length-1;
if(token.content.charAt(token.content.length-1)==">"){
_15b2.endOffset=token.offset+token.content.length;
_15b2.value+=token.content.substring(0,_15b4);
_15a6(token);
_15a2=undefined;
}else{
_15a2=_15b2;
_15b2.value+=token.content;
}
_15a3=null;
break;
}
}while(true);
}
catch(e){
}
return {errors:_15a0,endOffset:(token?token.offset:0)};
};
return {parse:parse};
});
},"davinci/model/resource/Resource":function(){
define(["dojo/_base/declare","dojo/_base/xhr","dojo/_base/connect","dojo/Deferred","dijit/registry","davinci/Runtime","davinci/model/Model","davinci/model/Path","davinci/ve/utils/URLRewrite"],function(_15b5,xhr,_15b6,_15b7,_15b8,_15b9,Model,Path,_15ba){
return _15b5("davinci.model.resource.Resource",Model,{constructor:function(){
this.elementType="Resource";
this.name="";
this.parent=null;
this._id=dijit.getUniqueId("maqFileResource");
},getName:function(){
return this.name;
},getPath:function(){
if(this.parent){
return this.parent.getPath()+"/"+this.name;
}
return this.name;
},readOnly:function(){
if(this.hasOwnProperty("_readOnly")){
return this._readOnly||(this.parent!=null&&this.parent.readOnly());
}
if(this.parent){
return this.parent.readOnly();
}
return false;
},getURL:function(){
var path=this.getPath();
if(path.indexOf("./")==0){
path=path.substring(2,path.length);
}
var _15bb=_15b9.getUserWorkspaceUrl();
return _15bb+path;
},rename:function(_15bc){
var _15bd=new Path(this.getPath()).removeLastSegments().append(_15bc);
return xhr.get({url:"cmd/rename",handleAs:"text",content:{oldName:this.getPath(),newName:_15bd.toString()}}).then(function(){
this.name=_15bc;
_15b6.publish("/davinci/resource/resourceChanged",["renamed",this]);
}.bind(this));
},getParentFolder:function(){
if(this.elementType=="File"){
return this.parent;
}
return this;
},isVirtual:function(){
return !!this.libraryId;
},visit:function(_15be,_15bf){
var _15c0=_15be.visit(this);
if(!this._isLoaded&&this.elementType=="Folder"&&!_15bf){
this.getChildren(dojo.hitch(this,function(){
dojo.forEach(this.children,function(child){
child.visit(_15be,_15bf);
});
}));
}else{
if(this.children&&!_15c0){
dojo.forEach(this.children,function(child){
child.visit(_15be,_15bf);
});
}
}
},deleteResource:function(_15c1){
var _15c2,_15c3=function(){
var name=this.getName();
this.parent.children.some(function(child,i,_15c4){
if(child.getName()==name){
_15c4.splice(i,1);
return true;
}
});
_15b6.publish("/davinci/resource/resourceChanged",["deleted",this]);
}.bind(this);
if(_15c1){
_15c2=new _15b7();
_15c3();
_15c2.resolve();
}else{
_15c2=xhr.get({url:"cmd/deleteResource",handleAs:"text",content:{path:this.getPath()}}).then(_15c3,function(){
});
}
return _15c2;
},getId:function(){
return this._id;
}});
});
},"dijit/form/ValidationTextBox":function(){
define(["dojo/_base/declare","dojo/_base/kernel","dojo/i18n","./TextBox","../Tooltip","dojo/text!./templates/ValidationTextBox.html","dojo/i18n!./nls/validate"],function(_15c5,_15c6,i18n,_15c7,_15c8,_15c9){
var _15ca;
return _15ca=_15c5("dijit.form.ValidationTextBox",_15c7,{templateString:_15c9,required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},pattern:".*",regExp:"",regExpGen:function(){
},state:"",tooltipPosition:[],_deprecateRegExp:function(attr,value){
if(value!=_15ca.prototype[attr]){
_15c6.deprecated("ValidationTextBox id="+this.id+", set('"+attr+"', ...) is deprecated.  Use set('pattern', ...) instead.","","2.0");
this.set("pattern",value);
}
},_setRegExpGenAttr:function(_15cb){
this._deprecateRegExp("regExpGen",_15cb);
this.regExpGen=this._getPatternAttr;
},_setRegExpAttr:function(value){
this._deprecateRegExp("regExp",value);
},_setValueAttr:function(){
this.inherited(arguments);
this.validate(this.focused);
},validator:function(value,_15cc){
return (new RegExp("^(?:"+this._getPatternAttr(_15cc)+")"+(this.required?"":"?")+"$")).test(value)&&(!this.required||!this._isEmpty(value))&&(this._isEmpty(value)||this.parse(value,_15cc)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(value){
return (this.trim?/^\s*$/:/^$/).test(value);
},getErrorMessage:function(){
var _15cd=this.invalidMessage=="$_unset_$"?this.messages.invalidMessage:!this.invalidMessage?this.promptMessage:this.invalidMessage;
var _15ce=this.missingMessage=="$_unset_$"?this.messages.missingMessage:!this.missingMessage?_15cd:this.missingMessage;
return (this.required&&this._isEmpty(this.textbox.value))?_15ce:_15cd;
},getPromptMessage:function(){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_15cf){
var _15d0="";
var _15d1=this.disabled||this.isValid(_15cf);
if(_15d1){
this._maskValidSubsetError=true;
}
var _15d2=this._isEmpty(this.textbox.value);
var _15d3=!_15d1&&_15cf&&this._isValidSubset();
this._set("state",_15d1?"":(((((!this._hasBeenBlurred||_15cf)&&_15d2)||_15d3)&&this._maskValidSubsetError)?"Incomplete":"Error"));
this.focusNode.setAttribute("aria-invalid",_15d1?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_15cf&&_15d3;
_15d0=this.getErrorMessage(_15cf);
}else{
if(this.state=="Incomplete"){
_15d0=this.getPromptMessage(_15cf);
this._maskValidSubsetError=!this._hasBeenBlurred||_15cf;
}else{
if(_15d2){
_15d0=this.getPromptMessage(_15cf);
}
}
}
this.set("message",_15d0);
return _15d1;
},displayMessage:function(_15d4){
if(_15d4&&this.focused){
_15c8.show(_15d4,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_15c8.hide(this.domNode);
}
},_refreshState:function(){
if(this._created){
this.validate(this.focused);
}
this.inherited(arguments);
},constructor:function(_15d5){
this.constraints={};
this.baseClass+=" dijitValidationTextBox";
},startup:function(){
this.inherited(arguments);
this._refreshState();
},_setConstraintsAttr:function(_15d6){
if(!_15d6.locale&&this.lang){
_15d6.locale=this.lang;
}
this._set("constraints",_15d6);
this._refreshState();
},_getPatternAttr:function(_15d7){
var p=this.pattern;
var type=(typeof p).toLowerCase();
if(type=="function"){
p=this.pattern(_15d7||this.constraints);
}
if(p!=this._lastRegExp){
var _15d8="";
this._lastRegExp=p;
if(p!=".*"){
p.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,function(re){
switch(re.charAt(0)){
case "{":
case "+":
case "?":
case "*":
case "^":
case "$":
case "|":
case "(":
_15d8+=re;
break;
case ")":
_15d8+="|$)";
break;
default:
_15d8+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_15d8);
}
catch(e){
_15d8=this.pattern;
console.warn("RegExp error in "+this.declaredClass+": "+this.pattern);
}
this._partialre="^(?:"+_15d8+")$";
}
return p;
},postMixInProperties:function(){
this.inherited(arguments);
this.messages=i18n.getLocalization("dijit.form","validate",this.lang);
this._setConstraintsAttr(this.constraints);
},_setDisabledAttr:function(value){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(value){
this._set("required",value);
this.focusNode.setAttribute("aria-required",value);
this._refreshState();
},_setMessageAttr:function(_15d9){
this._set("message",_15d9);
this.displayMessage(_15d9);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
});
},"url:dijit/layout/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition}\" style=\"visibility:hidden\">\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_menuBtn\"\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_leftBtn\"\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_rightBtn\"\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\n\t<div class='dijitTabListWrapper' data-dojo-attach-point='tablistWrapper'>\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip'></div>\n\t</div>\n</div>","davinci/model/resource/File":function(){
define(["dojo/_base/declare","dojo/_base/xhr","davinci/Runtime","davinci/model/resource/Resource","davinci/model/resource/Marker","davinci/ve/utils/URLRewrite"],function(_15da,xhr,_15db,_15dc,_15dd,_15de){
return _15da("davinci.model.resource.File",_15dc,{constructor:function(name,_15df){
this.elementType="File";
this.name=name;
this.parent=_15df;
this.markers=[];
this.extension=name.substr(name.lastIndexOf(".")+1);
},getExtension:function(){
return this.extension;
},clearMarkers:function(){
this.markers=[];
},addMarker:function(type,line,text){
this.markers.push(new _15dd(this,type,line,text));
},getMarkers:function(_15e0){
var _15e1=[];
if(this.markers){
for(var i=0;i<this.markers.length;i++){
var _15e2=this.markers[i];
if(!_15e0){
_15e1.push(_15e2);
}else{
if(typeof _15e0=="string"){
if(_15e2.type==_15e0){
_15e1.push(_15e2);
}
}else{
dojo.forEach(_15e0,function(type){
if(type==_15e2.type){
_15e1.push(_15e2);
}
});
}
}
}
}
return _15e1;
},setContents:function(_15e3,_15e4){
var _15e5=_15e4?"true":"false";
var dirty=_15e4?true:false;
if(this.isNew&&!_15e4){
this.isNew=false;
}
var _15e6=_15e4?".workingcopy":"";
var path=encodeURI(this.getPath()+_15e6);
return xhr.put({url:path,putData:_15e3,handleAs:"text",contentType:"text/html"}).then(function(res){
this.dirtyResource=dirty;
dojo.publish("/davinci/resource/resourceChanged",["modified",this]);
}.bind(this),function(err){
console.error("An error occurred: davinci.model.resource.File.prototype.setContents "+err+" : "+path);
});
},getText:function(){
return this.getContentSync();
},getContentSync:function(){
return _15db.serverJSONRequest({url:_15de.encodeURI(this.getURL()),handleAs:"text",sync:true});
},getContent:function(){
return xhr.get({url:_15de.encodeURI(this.getURL()),handleAs:"text"});
},removeWorkingCopy:function(){
_15db.serverJSONRequest({url:"cmd/removeWorkingCopy",handleAs:"text",content:{path:this.getPath()},sync:true});
if(this.isNew){
this.deleteResource(true);
}
}});
});
},"dijit/form/NumberTextBox":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/number","./RangeBoundTextBox"],function(_15e7,lang,_15e8,_15e9){
var _15ea=_15e7("dijit.form.NumberTextBoxMixin",null,{pattern:_15e8.regexp,value:NaN,editOptions:{pattern:"#.######"},_formatter:_15e8.format,postMixInProperties:function(){
this.inherited(arguments);
this._set("type","text");
},_setConstraintsAttr:function(_15eb){
var _15ec=typeof _15eb.places=="number"?_15eb.places:0;
if(_15ec){
_15ec++;
}
if(typeof _15eb.max!="number"){
_15eb.max=9*Math.pow(10,15-_15ec);
}
if(typeof _15eb.min!="number"){
_15eb.min=-9*Math.pow(10,15-_15ec);
}
this.inherited(arguments,[_15eb]);
if(this.focusNode&&this.focusNode.value&&!isNaN(this.value)){
this.set("value",this.value);
}
},_onFocus:function(){
if(this.disabled){
return;
}
var val=this.get("value");
if(typeof val=="number"&&!isNaN(val)){
var _15ed=this.format(val,this.constraints);
if(_15ed!==undefined){
this.textbox.value=_15ed;
}
}
this.inherited(arguments);
},format:function(value,_15ee){
var _15ef=String(value);
if(typeof value!="number"){
return _15ef;
}
if(isNaN(value)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(value,_15ee))&&_15ee.exponent!==false&&/\de[-+]?\d/i.test(_15ef)){
return _15ef;
}
if(this.editOptions&&this.focused){
_15ee=lang.mixin({},_15ee,this.editOptions);
}
return this._formatter(value,_15ee);
},_parser:_15e8.parse,parse:function(value,_15f0){
var v=this._parser(value,lang.mixin({},_15f0,(this.editOptions&&this.focused)?this.editOptions:{}));
if(this.editOptions&&this.focused&&isNaN(v)){
v=this._parser(value,_15f0);
}
return v;
},_getDisplayedValueAttr:function(){
var v=this.inherited(arguments);
return isNaN(v)?this.textbox.value:v;
},filter:function(value){
return (value==null||value==="")?NaN:this.inherited(arguments);
},serialize:function(value,_15f1){
return (typeof value!="number"||isNaN(value))?"":this.inherited(arguments);
},_setBlurValue:function(){
var val=lang.hitch(lang.mixin({},this,{focused:true}),"get")("value");
this._setValueAttr(val,true);
},_setValueAttr:function(value,_15f2,_15f3){
if(value!==undefined&&_15f3===undefined){
_15f3=String(value);
if(typeof value=="number"){
if(isNaN(value)){
_15f3="";
}else{
if(("rangeCheck" in this&&this.rangeCheck(value,this.constraints))||this.constraints.exponent===false||!/\de[-+]?\d/i.test(_15f3)){
_15f3=undefined;
}
}
}else{
if(!value){
_15f3="";
value=NaN;
}else{
value=undefined;
}
}
}
this.inherited(arguments,[value,_15f2,_15f3]);
},_getValueAttr:function(){
var v=this.inherited(arguments);
if(isNaN(v)&&this.textbox.value!==""){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)&&(new RegExp("^"+_15e8._realNumberRegexp(lang.mixin({},this.constraints))+"$").test(this.textbox.value))){
var n=Number(this.textbox.value);
return isNaN(n)?undefined:n;
}else{
return undefined;
}
}else{
return v;
}
},isValid:function(_15f4){
if(!this.focused||this._isEmpty(this.textbox.value)){
return this.inherited(arguments);
}else{
var v=this.get("value");
if(!isNaN(v)&&this.rangeCheck(v,this.constraints)){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)){
return true;
}else{
return this.inherited(arguments);
}
}else{
return false;
}
}
}});
var _15f5=_15e7("dijit.form.NumberTextBox",[_15e9,_15ea],{baseClass:"dijitTextBox dijitNumberTextBox"});
_15f5.Mixin=_15ea;
return _15f5;
});
},"dijit/form/_ComboBoxMenuMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/i18n","dojo/i18n!./nls/ComboBox"],function(array,_15f6,_15f7,i18n){
return _15f6("dijit.form._ComboBoxMenuMixin",null,{_messages:null,postMixInProperties:function(){
this.inherited(arguments);
this._messages=i18n.getLocalization("dijit.form","ComboBox",this.lang);
},buildRendering:function(){
this.inherited(arguments);
this.previousButton.innerHTML=this._messages["previousMessage"];
this.nextButton.innerHTML=this._messages["nextMessage"];
},_setValueAttr:function(value){
this.value=value;
this.onChange(value);
},onClick:function(node){
if(node==this.previousButton){
this._setSelectedAttr(null);
this.onPage(-1);
}else{
if(node==this.nextButton){
this._setSelectedAttr(null);
this.onPage(1);
}else{
this.onChange(node);
}
}
},onChange:function(){
},onPage:function(){
},onClose:function(){
this._setSelectedAttr(null);
},_createOption:function(item,_15f8){
var _15f9=this._createMenuItem();
var _15fa=_15f8(item);
if(_15fa.html){
_15f9.innerHTML=_15fa.label;
}else{
_15f9.appendChild(_15f9.ownerDocument.createTextNode(_15fa.label));
}
if(_15f9.innerHTML==""){
_15f9.innerHTML="&#160;";
}
this.applyTextDir(_15f9,(_15f9.innerText||_15f9.textContent||""));
return _15f9;
},createOptions:function(_15fb,_15fc,_15fd){
this.items=_15fb;
this.previousButton.style.display=(_15fc.start==0)?"none":"";
_15f7.set(this.previousButton,"id",this.id+"_prev");
array.forEach(_15fb,function(item,i){
var _15fe=this._createOption(item,_15fd);
_15fe.setAttribute("item",i);
_15f7.set(_15fe,"id",this.id+i);
this.nextButton.parentNode.insertBefore(_15fe,this.nextButton);
},this);
var _15ff=false;
if(_15fb.total&&!_15fb.total.then&&_15fb.total!=-1){
if((_15fc.start+_15fc.count)<_15fb.total){
_15ff=true;
}else{
if((_15fc.start+_15fc.count)>_15fb.total&&_15fc.count==_15fb.length){
_15ff=true;
}
}
}else{
if(_15fc.count==_15fb.length){
_15ff=true;
}
}
this.nextButton.style.display=_15ff?"":"none";
_15f7.set(this.nextButton,"id",this.id+"_next");
},clearResultList:function(){
var _1600=this.containerNode;
while(_1600.childNodes.length>2){
_1600.removeChild(_1600.childNodes[_1600.childNodes.length-2]);
}
this._setSelectedAttr(null);
},highlightFirstOption:function(){
this.selectFirstNode();
},highlightLastOption:function(){
this.selectLastNode();
},selectFirstNode:function(){
this.inherited(arguments);
if(this.getHighlightedOption()==this.previousButton){
this.selectNextNode();
}
},selectLastNode:function(){
this.inherited(arguments);
if(this.getHighlightedOption()==this.nextButton){
this.selectPreviousNode();
}
},getHighlightedOption:function(){
return this.selected;
}});
});
},"dijit/Tree":function(){
define(["dojo/_base/array","dojo/_base/connect","dojo/cookie","dojo/_base/declare","dojo/Deferred","dojo/DeferredList","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/errors/create","dojo/fx","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/topic","dojo/touch","dojo/when","./focus","./registry","./_base/manager","./_Widget","./_TemplatedMixin","./_Container","./_Contained","./_CssStateMixin","dojo/text!./templates/TreeNode.html","dojo/text!./templates/Tree.html","./tree/TreeStoreModel","./tree/ForestStoreModel","./tree/_dndSelector"],function(array,_1601,_1602,_1603,_1604,_1605,dom,_1606,_1607,_1608,event,_1609,_160a,_160b,keys,lang,on,topic,touch,when,focus,_160c,_160d,_160e,_160f,_1610,_1611,_1612,_1613,_1614,_1615,_1616,_1617){
_1604=_1603(_1604,{addCallback:function(_1618){
this.then(_1618);
},addErrback:function(_1619){
this.then(null,_1619);
}});
var _161a=_1603("dijit._TreeNode",[_160e,_160f,_1610,_1611,_1612],{item:null,isTreeNode:true,label:"",_setLabelAttr:{node:"labelNode",type:"innerText"},isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:_1613,baseClass:"dijitTreeNode",cssStateNodes:{rowNode:"dijitTreeRow"},_setTooltipAttr:{node:"rowNode",type:"attribute",attribute:"title"},buildRendering:function(){
this.inherited(arguments);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){
this.labelNode.setAttribute("aria-expanded",this.isExpanded);
}
this.setSelected(false);
},_setIndentAttr:function(_161b){
var _161c=(Math.max(_161b,0)*this.tree._nodePixelIndent)+"px";
_1608.set(this.domNode,"backgroundPosition",_161c+" 0px");
_1608.set(this.indentNode,this.isLeftToRight()?"paddingLeft":"paddingRight",_161c);
array.forEach(this.getChildren(),function(child){
child.set("indent",_161b+1);
});
this._set("indent",_161b);
},markProcessing:function(){
this.state="LOADING";
this._setExpando(true);
},unmarkProcessing:function(){
this._setExpando(false);
},_updateItemClasses:function(item){
var tree=this.tree,model=tree.model;
if(tree._v10Compat&&item===model.root){
item=null;
}
this._applyClassAndStyle(item,"icon","Icon");
this._applyClassAndStyle(item,"label","Label");
this._applyClassAndStyle(item,"row","Row");
this.tree._startPaint(true);
},_applyClassAndStyle:function(item,lower,upper){
var _161d="_"+lower+"Class";
var _161e=lower+"Node";
var _161f=this[_161d];
this[_161d]=this.tree["get"+upper+"Class"](item,this.isExpanded);
_1606.replace(this[_161e],this[_161d]||"",_161f||"");
_1608.set(this[_161e],this.tree["get"+upper+"Style"](item,this.isExpanded)||{});
},_updateLayout:function(){
var _1620=this.getParent();
if(!_1620||!_1620.rowNode||_1620.rowNode.style.display=="none"){
_1606.add(this.domNode,"dijitTreeIsRoot");
}else{
_1606.toggle(this.domNode,"dijitTreeIsLast",!this.getNextSibling());
}
},_setExpando:function(_1621){
var _1622=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"],_1623=["*","-","+","*"],idx=_1621?0:(this.isExpandable?(this.isExpanded?1:2):3);
_1606.replace(this.expandoNode,_1622[idx],_1622);
this.expandoNodeText.innerHTML=_1623[idx];
},expand:function(){
if(this._expandDeferred){
return this._expandDeferred;
}
if(this._collapseDeferred){
this._collapseDeferred.cancel();
delete this._collapseDeferred;
}
this.isExpanded=true;
this.labelNode.setAttribute("aria-expanded","true");
if(this.tree.showRoot||this!==this.tree.rootNode){
this.containerNode.setAttribute("role","group");
}
_1606.add(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","true");
}
var def,_1624=_160a.wipeIn({node:this.containerNode,duration:_160d.defaultDuration,onEnd:function(){
def.resolve(true);
}});
def=(this._expandDeferred=new _1604(function(){
_1624.stop();
}));
_1624.play();
return def;
},collapse:function(){
if(this._collapseDeferred){
return this._collapseDeferred;
}
if(this._expandDeferred){
this._expandDeferred.cancel();
delete this._expandDeferred;
}
this.isExpanded=false;
this.labelNode.setAttribute("aria-expanded","false");
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","false");
}
_1606.remove(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
var def,_1625=_160a.wipeOut({node:this.containerNode,duration:_160d.defaultDuration,onEnd:function(){
def.resolve(true);
}});
def=(this._collapseDeferred=new _1604(function(){
_1625.stop();
}));
_1625.play();
return def;
},indent:0,setChildItems:function(items){
var tree=this.tree,model=tree.model,defs=[];
var _1626=this.getChildren();
array.forEach(_1626,function(child){
_1610.prototype.removeChild.call(this,child);
},this);
this.defer(function(){
array.forEach(_1626,function(node){
if(!node._destroyed&&!node.getParent()){
tree.dndController.removeTreeNode(node);
var id=model.getIdentity(node.item),ary=tree._itemNodesMap[id];
if(ary.length==1){
delete tree._itemNodesMap[id];
}else{
var index=array.indexOf(ary,node);
if(index!=-1){
ary.splice(index,1);
}
}
node.destroyRecursive();
}
});
});
this.state="LOADED";
if(items&&items.length>0){
this.isExpandable=true;
array.forEach(items,function(item){
var id=model.getIdentity(item),_1627=tree._itemNodesMap[id],node;
if(_1627){
for(var i=0;i<_1627.length;i++){
if(_1627[i]&&!_1627[i].getParent()){
node=_1627[i];
node.set("indent",this.indent+1);
break;
}
}
}
if(!node){
node=this.tree._createTreeNode({item:item,tree:tree,isExpandable:model.mayHaveChildren(item),label:tree.getLabel(item),tooltip:tree.getTooltip(item),ownerDocument:tree.ownerDocument,dir:tree.dir,lang:tree.lang,textDir:tree.textDir,indent:this.indent+1});
if(_1627){
_1627.push(node);
}else{
tree._itemNodesMap[id]=[node];
}
}
this.addChild(node);
if(this.tree.autoExpand||this.tree._state(node)){
defs.push(tree._expandNode(node));
}
},this);
array.forEach(this.getChildren(),function(child){
child._updateLayout();
});
}else{
this.isExpandable=false;
}
if(this._setExpando){
this._setExpando(false);
}
this._updateItemClasses(this.item);
if(this==tree.rootNode){
var fc=this.tree.showRoot?this:this.getChildren()[0];
if(fc){
fc.setFocusable(true);
tree.lastFocused=fc;
}else{
tree.domNode.setAttribute("tabIndex","0");
}
}
var def=new _1605(defs);
this.tree._startPaint(def);
return def;
},getTreePath:function(){
var node=this;
var path=[];
while(node&&node!==this.tree.rootNode){
path.unshift(node.item);
node=node.getParent();
}
path.unshift(this.tree.rootNode.item);
return path;
},getIdentity:function(){
return this.tree.model.getIdentity(this.item);
},removeChild:function(node){
this.inherited(arguments);
var _1628=this.getChildren();
if(_1628.length==0){
this.isExpandable=false;
this.collapse();
}
array.forEach(_1628,function(child){
child._updateLayout();
});
},makeExpandable:function(){
this.isExpandable=true;
this._setExpando(false);
},setSelected:function(_1629){
this.labelNode.setAttribute("aria-selected",_1629?"true":"false");
_1606.toggle(this.rowNode,"dijitTreeRowSelected",_1629);
},setFocusable:function(_162a){
this.labelNode.setAttribute("tabIndex",_162a?"0":"-1");
},_setTextDirAttr:function(_162b){
if(_162b&&((this.textDir!=_162b)||!this._created)){
this._set("textDir",_162b);
this.applyTextDir(this.labelNode,this.labelNode.innerText||this.labelNode.textContent||"");
array.forEach(this.getChildren(),function(_162c){
_162c.set("textDir",_162b);
},this);
}
}});
var Tree=_1603("dijit.Tree",[_160e,_160f],{store:null,model:null,query:null,label:"",showRoot:true,childrenAttr:["children"],paths:[],path:[],selectedItems:null,selectedItem:null,openOnClick:false,openOnDblClick:false,templateString:_1614,persist:true,autoExpand:false,dndController:_1617,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance","dragThreshold","betweenThreshold"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,dragThreshold:5,betweenThreshold:0,_nodePixelIndent:19,_publish:function(_162d,_162e){
topic.publish(this.id,lang.mixin({tree:this,event:_162d},_162e||{}));
},postMixInProperties:function(){
this.tree=this;
if(this.autoExpand){
this.persist=false;
}
this._itemNodesMap={};
if(!this.cookieName&&this.id){
this.cookieName=this.id+"SaveStateCookie";
}
this.expandChildrenDeferred=new _1604();
this.pendingCommandsDeferred=this.expandChildrenDeferred;
this.inherited(arguments);
},postCreate:function(){
this._initState();
var self=this;
this.own(on(this.domNode,on.selector(".dijitTreeNode",touch.enter),function(evt){
self._onNodeMouseEnter(_160c.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode",touch.leave),function(evt){
self._onNodeMouseLeave(_160c.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode","click"),function(evt){
self._onClick(_160c.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode","dblclick"),function(evt){
self._onDblClick(_160c.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode","keypress"),function(evt){
self._onKeyPress(_160c.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode","keydown"),function(evt){
self._onKeyDown(_160c.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeRow","focusin"),function(evt){
self._onNodeFocus(_160c.getEnclosingWidget(this),evt);
}));
if(!this.model){
this._store2model();
}
this.connect(this.model,"onChange","_onItemChange");
this.connect(this.model,"onChildrenChange","_onItemChildrenChange");
this.connect(this.model,"onDelete","_onItemDelete");
this.inherited(arguments);
if(this.dndController){
if(lang.isString(this.dndController)){
this.dndController=lang.getObject(this.dndController);
}
var _162f={};
for(var i=0;i<this.dndParams.length;i++){
if(this[this.dndParams[i]]){
_162f[this.dndParams[i]]=this[this.dndParams[i]];
}
}
this.dndController=new this.dndController(this,_162f);
}
this._load();
if(!this.params.path&&!this.params.paths&&this.persist){
this.set("paths",this.dndController._getSavedPaths());
}
this.onLoadDeferred=this.pendingCommandsDeferred;
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
},_store2model:function(){
this._v10Compat=true;
_160b.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");
var _1630={id:this.id+"_ForestStoreModel",store:this.store,query:this.query,childrenAttrs:this.childrenAttr};
if(this.params.mayHaveChildren){
_1630.mayHaveChildren=lang.hitch(this,"mayHaveChildren");
}
if(this.params.getItemChildren){
_1630.getChildren=lang.hitch(this,function(item,_1631,_1632){
this.getItemChildren((this._v10Compat&&item===this.model.root)?null:item,_1631,_1632);
});
}
this.model=new _1616(_1630);
this.showRoot=Boolean(this.label);
},onLoad:function(){
},_load:function(){
this.model.getRoot(lang.hitch(this,function(item){
var rn=(this.rootNode=this.tree._createTreeNode({item:item,tree:this,isExpandable:true,label:this.label||this.getLabel(item),textDir:this.textDir,indent:this.showRoot?0:-1}));
if(!this.showRoot){
rn.rowNode.style.display="none";
this.domNode.setAttribute("role","presentation");
this.domNode.removeAttribute("aria-expanded");
this.domNode.removeAttribute("aria-multiselectable");
rn.labelNode.setAttribute("role","presentation");
rn.containerNode.setAttribute("role","tree");
rn.containerNode.setAttribute("aria-expanded","true");
rn.containerNode.setAttribute("aria-multiselectable",!this.dndController.singular);
}else{
this.domNode.setAttribute("aria-multiselectable",!this.dndController.singular);
}
this.domNode.appendChild(rn.domNode);
var _1633=this.model.getIdentity(item);
if(this._itemNodesMap[_1633]){
this._itemNodesMap[_1633].push(rn);
}else{
this._itemNodesMap[_1633]=[rn];
}
rn._updateLayout();
this._expandNode(rn).then(lang.hitch(this,function(){
this.expandChildrenDeferred.resolve(true);
}));
}),lang.hitch(this,function(err){
console.error(this,": error loading root: ",err);
}));
},getNodesByItem:function(item){
if(!item){
return [];
}
var _1634=lang.isString(item)?item:this.model.getIdentity(item);
return [].concat(this._itemNodesMap[_1634]);
},_setSelectedItemAttr:function(item){
this.set("selectedItems",[item]);
},_setSelectedItemsAttr:function(items){
var tree=this;
return this.pendingCommandsDeferred=this.pendingCommandsDeferred.then(lang.hitch(this,function(){
var _1635=array.map(items,function(item){
return (!item||lang.isString(item))?item:tree.model.getIdentity(item);
});
var nodes=[];
array.forEach(_1635,function(id){
nodes=nodes.concat(tree._itemNodesMap[id]||[]);
});
this.set("selectedNodes",nodes);
}));
},_setPathAttr:function(path){
if(path.length){
return this.set("paths",[path]);
}else{
return this.set("paths",[]);
}
},_setPathsAttr:function(paths){
var tree=this;
return this.pendingCommandsDeferred=this.pendingCommandsDeferred.then(function(){
return new _1605(array.map(paths,function(path){
var d=new _1604();
path=array.map(path,function(item){
return lang.isString(item)?item:tree.model.getIdentity(item);
});
if(path.length){
_1636(path,[tree.rootNode],d);
}else{
d.reject(new Tree.PathError("Empty path"));
}
return d;
}));
}).then(_1637);
function _1636(path,nodes,def){
var _1638=path.shift();
var _1639=array.filter(nodes,function(node){
return node.getIdentity()==_1638;
})[0];
if(!!_1639){
if(path.length){
tree._expandNode(_1639).then(function(){
_1636(path,_1639.getChildren(),def);
});
}else{
def.resolve(_1639);
}
}else{
def.reject(new Tree.PathError("Could not expand path at "+_1638));
}
};
function _1637(_163a){
tree.set("selectedNodes",array.map(array.filter(_163a,function(x){
return x[0];
}),function(x){
return x[1];
}));
};
},_setSelectedNodeAttr:function(node){
this.set("selectedNodes",[node]);
},_setSelectedNodesAttr:function(nodes){
this.dndController.setSelection(nodes);
},expandAll:function(){
var _163b=this;
function _163c(node){
var def=new dojo.Deferred();
_163b._expandNode(node).then(function(){
var _163d=array.filter(node.getChildren()||[],function(node){
return node.isExpandable;
}),defs=array.map(_163d,_163c);
new dojo.DeferredList(defs).then(function(){
def.resolve(true);
});
});
return def;
};
return _163c(this.rootNode);
},collapseAll:function(){
var _163e=this;
function _163f(node){
var def=new dojo.Deferred();
def.label="collapseAllDeferred";
var _1640=array.filter(node.getChildren()||[],function(node){
return node.isExpandable;
}),defs=array.map(_1640,_163f);
new dojo.DeferredList(defs).then(function(){
if(!node.isExpanded||(node==_163e.rootNode&&!_163e.showRoot)){
def.resolve(true);
}else{
_163e._collapseNode(node).then(function(){
def.resolve(true);
});
}
});
return def;
};
return _163f(this.rootNode);
},mayHaveChildren:function(){
},getItemChildren:function(){
},getLabel:function(item){
return this.model.getLabel(item);
},getIconClass:function(item,_1641){
return (!item||this.model.mayHaveChildren(item))?(_1641?"dijitFolderOpened":"dijitFolderClosed"):"dijitLeaf";
},getLabelClass:function(){
},getRowClass:function(){
},getIconStyle:function(){
},getLabelStyle:function(){
},getRowStyle:function(){
},getTooltip:function(){
return "";
},_onKeyPress:function(_1642,e){
if(e.charCode<=32){
return;
}
if(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.metaKey){
var c=String.fromCharCode(e.charCode);
this._onLetterKeyNav({node:_1642,key:c.toLowerCase()});
event.stop(e);
}
},_onKeyDown:function(_1643,e){
var key=e.keyCode;
var map=this._keyHandlerMap;
if(!map){
map={};
map[keys.ENTER]=map[keys.SPACE]=map[" "]="_onEnterKey";
map[this.isLeftToRight()?keys.LEFT_ARROW:keys.RIGHT_ARROW]="_onLeftArrow";
map[this.isLeftToRight()?keys.RIGHT_ARROW:keys.LEFT_ARROW]="_onRightArrow";
map[keys.UP_ARROW]="_onUpArrow";
map[keys.DOWN_ARROW]="_onDownArrow";
map[keys.HOME]="_onHomeKey";
map[keys.END]="_onEndKey";
this._keyHandlerMap=map;
}
if(this._keyHandlerMap[key]){
if(this._curSearch){
this._curSearch.timer.remove();
delete this._curSearch;
}
this[this._keyHandlerMap[key]]({node:_1643,item:_1643.item,evt:e});
event.stop(e);
}
},_onEnterKey:function(_1644){
this._publish("execute",{item:_1644.item,node:_1644.node});
this.dndController.userSelect(_1644.node,_1601.isCopyKey(_1644.evt),_1644.evt.shiftKey);
this.onClick(_1644.item,_1644.node,_1644.evt);
},_onDownArrow:function(_1645){
var node=this._getNextNode(_1645.node);
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onUpArrow:function(_1646){
var node=_1646.node;
var _1647=node.getPreviousSibling();
if(_1647){
node=_1647;
while(node.isExpandable&&node.isExpanded&&node.hasChildren()){
var _1648=node.getChildren();
node=_1648[_1648.length-1];
}
}else{
var _1649=node.getParent();
if(!(!this.showRoot&&_1649===this.rootNode)){
node=_1649;
}
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onRightArrow:function(_164a){
var node=_164a.node;
if(node.isExpandable&&!node.isExpanded){
this._expandNode(node);
}else{
if(node.hasChildren()){
node=node.getChildren()[0];
if(node&&node.isTreeNode){
this.focusNode(node);
}
}
}
},_onLeftArrow:function(_164b){
var node=_164b.node;
if(node.isExpandable&&node.isExpanded){
this._collapseNode(node);
}else{
var _164c=node.getParent();
if(_164c&&_164c.isTreeNode&&!(!this.showRoot&&_164c===this.rootNode)){
this.focusNode(_164c);
}
}
},_onHomeKey:function(){
var node=this._getRootOrFirstNode();
if(node){
this.focusNode(node);
}
},_onEndKey:function(){
var node=this.rootNode;
while(node.isExpanded){
var c=node.getChildren();
node=c[c.length-1];
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},multiCharSearchDuration:250,_onLetterKeyNav:function(_164d){
var cs=this._curSearch;
if(cs){
cs.pattern=cs.pattern+_164d.key;
cs.timer.remove();
}else{
cs=this._curSearch={pattern:_164d.key,startNode:_164d.node};
}
cs.timer=this.defer(function(){
delete this._curSearch;
},this.multiCharSearchDuration);
var node=cs.startNode;
do{
node=this._getNextNode(node);
if(!node){
node=this._getRootOrFirstNode();
}
}while(node!==cs.startNode&&(node.label.toLowerCase().substr(0,cs.pattern.length)!=cs.pattern));
if(node&&node.isTreeNode){
if(node!==cs.startNode){
this.focusNode(node);
}
}
},isExpandoNode:function(node,_164e){
return dom.isDescendant(node,_164e.expandoNode);
},_onClick:function(_164f,e){
var _1650=e.target,_1651=this.isExpandoNode(_1650,_164f);
if((this.openOnClick&&_164f.isExpandable)||_1651){
if(_164f.isExpandable){
this._onExpandoClick({node:_164f});
}
}else{
this._publish("execute",{item:_164f.item,node:_164f,evt:e});
this.onClick(_164f.item,_164f,e);
this.focusNode(_164f);
}
event.stop(e);
},_onDblClick:function(_1652,e){
var _1653=e.target,_1654=(_1653==_1652.expandoNode||_1653==_1652.expandoNodeText);
if((this.openOnDblClick&&_1652.isExpandable)||_1654){
if(_1652.isExpandable){
this._onExpandoClick({node:_1652});
}
}else{
this._publish("execute",{item:_1652.item,node:_1652,evt:e});
this.onDblClick(_1652.item,_1652,e);
this.focusNode(_1652);
}
event.stop(e);
},_onExpandoClick:function(_1655){
var node=_1655.node;
this.focusNode(node);
if(node.isExpanded){
this._collapseNode(node);
}else{
this._expandNode(node);
}
},onClick:function(){
},onDblClick:function(){
},onOpen:function(){
},onClose:function(){
},_getNextNode:function(node){
if(node.isExpandable&&node.isExpanded&&node.hasChildren()){
return node.getChildren()[0];
}else{
while(node&&node.isTreeNode){
var _1656=node.getNextSibling();
if(_1656){
return _1656;
}
node=node.getParent();
}
return null;
}
},_getRootOrFirstNode:function(){
return this.showRoot?this.rootNode:this.rootNode.getChildren()[0];
},_collapseNode:function(node){
if(node._expandNodeDeferred){
delete node._expandNodeDeferred;
}
if(node.state=="LOADING"){
return;
}
if(node.isExpanded){
var ret=node.collapse();
this.onClose(node.item,node);
this._state(node,false);
this._startPaint(ret);
return ret;
}
},_expandNode:function(node){
var def=new _1604();
if(node._expandNodeDeferred){
return node._expandNodeDeferred;
}
var model=this.model,item=node.item,_1657=this;
if(!node._loadDeferred){
node.markProcessing();
node._loadDeferred=new _1604();
model.getChildren(item,function(items){
node.unmarkProcessing();
node.setChildItems(items).then(function(){
node._loadDeferred.resolve(items);
});
},function(err){
console.error(_1657,": error loading "+node.label+" children: ",err);
node._loadDeferred.reject(err);
});
}
node._loadDeferred.then(lang.hitch(this,function(){
node.expand().then(function(){
def.resolve(true);
});
this.onOpen(node.item,node);
this._state(node,true);
}));
this._startPaint(def);
return def;
},focusNode:function(node){
focus.focus(node.labelNode);
},_onNodeFocus:function(node){
if(node&&node!=this.lastFocused){
if(this.lastFocused&&!this.lastFocused._destroyed){
this.lastFocused.setFocusable(false);
}
node.setFocusable(true);
this.lastFocused=node;
}
},_onNodeMouseEnter:function(){
},_onNodeMouseLeave:function(){
},_onItemChange:function(item){
var model=this.model,_1658=model.getIdentity(item),nodes=this._itemNodesMap[_1658];
if(nodes){
var label=this.getLabel(item),_1659=this.getTooltip(item);
array.forEach(nodes,function(node){
node.set({item:item,label:label,tooltip:_1659});
node._updateItemClasses(item);
});
}
},_onItemChildrenChange:function(_165a,_165b){
var model=this.model,_165c=model.getIdentity(_165a),_165d=this._itemNodesMap[_165c];
if(_165d){
array.forEach(_165d,function(_165e){
_165e.setChildItems(_165b);
});
}
},_onItemDelete:function(item){
var model=this.model,_165f=model.getIdentity(item),nodes=this._itemNodesMap[_165f];
if(nodes){
array.forEach(nodes,function(node){
this.dndController.removeTreeNode(node);
var _1660=node.getParent();
if(_1660){
_1660.removeChild(node);
}
node.destroyRecursive();
},this);
delete this._itemNodesMap[_165f];
}
},_initState:function(){
this._openedNodes={};
if(this.persist&&this.cookieName){
var oreo=_1602(this.cookieName);
if(oreo){
array.forEach(oreo.split(","),function(item){
this._openedNodes[item]=true;
},this);
}
}
},_state:function(node,_1661){
if(!this.persist){
return false;
}
var path=array.map(node.getTreePath(),function(item){
return this.model.getIdentity(item);
},this).join("/");
if(arguments.length===1){
return this._openedNodes[path];
}else{
if(_1661){
this._openedNodes[path]=true;
}else{
delete this._openedNodes[path];
}
if(this.persist&&this.cookieName){
var ary=[];
for(var id in this._openedNodes){
ary.push(id);
}
_1602(this.cookieName,ary.join(","),{expires:365});
}
}
},destroy:function(){
if(this._curSearch){
this._curSearch.timer.remove();
delete this._curSearch;
}
if(this.rootNode){
this.rootNode.destroyRecursive();
}
if(this.dndController&&!lang.isString(this.dndController)){
this.dndController.destroy();
}
this.rootNode=null;
this.inherited(arguments);
},destroyRecursive:function(){
this.destroy();
},resize:function(_1662){
if(_1662){
_1607.setMarginBox(this.domNode,_1662);
}
this._nodePixelIndent=_1607.position(this.tree.indentDetector).w||this._nodePixelIndent;
this.expandChildrenDeferred.then(lang.hitch(this,function(){
this.rootNode.set("indent",this.showRoot?0:-1);
this._adjustWidths();
}));
},_outstandingPaintOperations:0,_startPaint:function(p){
this._outstandingPaintOperations++;
if(this._adjustWidthsTimer){
this._adjustWidthsTimer.remove();
delete this._adjustWidthsTimer;
}
var oc=lang.hitch(this,function(){
this._outstandingPaintOperations--;
if(this._outstandingPaintOperations<=0&&!this._adjustWidthsTimer&&this._started){
this._adjustWidthsTimer=this.defer("_adjustWidths");
}
});
when(p,oc,oc);
},_adjustWidths:function(){
if(this._adjustWidthsTimer){
this._adjustWidthsTimer.remove();
delete this._adjustWidthsTimer;
}
var _1663=0,nodes=[];
function _1664(_1665){
var node=_1665.rowNode;
node.style.width="auto";
_1663=Math.max(_1663,node.clientWidth);
nodes.push(node);
if(_1665.isExpanded){
array.forEach(_1665.getChildren(),_1664);
}
};
_1664(this.rootNode);
_1663=Math.max(_1663,_1607.getContentBox(this.domNode).w);
array.forEach(nodes,function(node){
node.style.width=_1663+"px";
});
},_createTreeNode:function(args){
return new _161a(args);
},_setTextDirAttr:function(_1666){
if(_1666&&this.textDir!=_1666){
this._set("textDir",_1666);
this.rootNode.set("textDir",_1666);
}
}});
Tree.PathError=_1609("TreePathError");
Tree._TreeNode=_161a;
return Tree;
});
},"davinci/model/Comment":function(){
define(["dojo/_base/declare","davinci/model/Model"],function(_1667,Model){
return _1667("davinci.model.Comment",Model,{constructor:function(){
this.elementType="Comment";
this.nosemicolon=true;
},addComment:function(type,start,stop,text){
if(this.comments==null){
this.comments=[];
}
this.comments[this.comments.length]={commentType:type,start:start,stop:stop,s:text};
},appendComment:function(text){
var _1668=this.comments[this.comments.length-1];
_1668.s+=text;
_1668.stop+=text.length;
},getText:function(_1669){
var s="";
for(var i=0;i<this.comments.length;i++){
if(this.comments[i].commentType=="line"){
s+="//"+this.comments[i].s+"\n";
}else{
if(this.comments[i].commentType=="block"){
s+="/*"+this.comments[i].s+"*/\n";
}
}
}
return s;
}});
});
},"dijit/form/Button":function(){
define(["require","dojo/_base/declare","dojo/dom-class","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_166a,_166b,_166c,has,_166d,lang,ready,_166e,_166f,_1670){
if(has("dijit-legacy-requires")){
ready(0,function(){
var _1671=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_166a(_1671);
});
}
return _166b("dijit.form.Button",[_166e,_166f],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_1670,_setValueAttr:"valueNode",_onClick:function(e){
var ok=this.inherited(arguments);
if(ok){
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
e.stopPropagation();
}
}
return ok;
},_fillContent:function(_1672){
if(_1672&&(!this.params||!("label" in this.params))){
var _1673=lang.trim(_1672.innerHTML);
if(_1673){
this.label=_1673;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_166c.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_1674){
_166d.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_1674);
},_setLabelAttr:function(_1675){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
});
},"davinci/ve/DijitWidget":function(){
define(["dojo/_base/declare","dojo/_base/window","dojo/_base/lang","dojo/dom-attr","dojo/parser","./_Widget","./metadata"],function(_1676,_1677,dlang,_1678,_1679,_167a,_167b){
var _167c="__DijitWidgetScratchSpace";
return _1676("davinci.ve.DijitWidget",_167a,{isDijitWidget:true,constructor:function(mixin,node,_167d,_167e,_167f){
if(typeof _167d==="string"){
var type=_1678.get(node,"data-dojo-type")||_1678.get(node,"dojoType");
if(!type){
_1678.set(node,"data-dojo-type",_167d);
}
if(_167f){
_167f.addAttribute("data-dojo-type",_167d);
}
var doc=node.ownerDocument,win=doc.defaultView,ss=doc[_167c];
if(!ss){
ss=doc[_167c]=doc.createElement("div");
}
ss.appendChild(node);
var _1680=win.require("dojo/parser").instantiate([node],mixin,{noStart:true});
_167d=_1680[0];
if(ss.firstChild){
ss.removeChild(ss.firstChild);
}
this.domNode=_167d.domNode;
_167d.domNode._dvWidget=this;
this.isLayoutContainer=_167d.isLayoutContainer;
}else{
this.type=_167d.declaredClass;
}
var _1681=davinci.ve.metadata.getAllowedChild(this.type);
this.acceptsHTMLChildren=_1681[0]==="ANY"||_1681.indexOf("HTML")!==-1;
this.dijitWidget=_167d;
this.containerNode=_167d.containerNode;
this.styleNode=_167d.styleNode;
this.id=_167d.id;
},getParent:function(){
var _1682;
if(!this.dijitWidget||!this.dijitWidget.domNode||!this.dijitWidget.domNode.parentNode){
return;
}
do{
_1682=require("davinci/ve/widget").getEnclosingWidget(this.dijitWidget.domNode.parentNode);
}while(_1682&&_1682.dijitWidget&&_1682.dijitWidget.declaredClass.split(".").pop().charAt(0)=="_");
return _1682;
},_getChildren:function(_1683){
if(this.acceptsHTMLChildren){
return this.inherited(arguments);
}
var _1684=[];
if(davinci.ve.metadata.getAllowedChild(this.type)[0]!=="NONE"){
this.dijitWidget.getChildren().forEach(function(child){
if(_1683){
_1684.push(require("davinci/ve/widget").getWidget(child.domNode));
}else{
var _1685=child.domNode&&child.domNode._dvWidget;
if(_1685){
_1684.push(_1685);
}
}
});
}
return _1684;
},_getContainerNode:function(){
return this.containerNode||this.domNode;
},selectChild:function(_1686){
if(this.dijitWidget.selectChild){
this.dijitWidget.selectChild(_1686.dijitWidget);
}
},addChild:function(child,index){
if(this.dijitWidget.addChild&&child.dijitWidget){
if(typeof index==="number"&&index>=0){
var _1687=this.getChildren();
if(index<_1687.length){
this._srcElement.insertBefore(child._srcElement,_1687[index]._srcElement);
}else{
this._srcElement.addChild(child._srcElement);
}
if(!this.acceptsHTMLChildren){
this._addChildHelper(child.dijitWidget,index);
}else{
this._addChildHooked(child.dijitWidget,index);
}
}else{
this._srcElement.addChild(child._srcElement);
this._addChildHelper(child.dijitWidget);
}
}else{
this.inherited(arguments);
}
},_addChildHelper:function(_1688,index){
var _1689=this.getHelper();
if(_1689&&_1689.addChild){
_1689.addChild(this,_1688,index);
}else{
this.dijitWidget.addChild(_1688,index);
}
},_addChildHooked:function(_168a,index){
var _168b=this.dijitWidget,_168c=_168b.getChildren;
_168b.getChildren=dojo.hitch(this,this.getChildren);
var _168d=this.getHelper();
if(_168d&&_168d.addChild){
_168d.addChild(this,_168a,index);
}else{
_168b.addChild(_168a,index);
}
_168b.getChildren=_168c;
},removeChild:function(child){
if(!child){
return;
}
if(this.dijitWidget.removeChild&&child.dijitWidget){
this.dijitWidget.removeChild(child.dijitWidget);
this._srcElement.removeChild(child._srcElement);
}else{
this.inherited(arguments);
}
},_getPropertyValue:function(name){
return this.dijitWidget.get(name);
},startup:function(){
this.dijitWidget.startup();
},isLayout:function(){
var _168e=this.getContext();
var djit=_168e.getDijit();
var _168f=this.dijitWidget.isInstanceOf(djit.layout._LayoutWidget);
return _168f;
},resize:function(){
var _1690=this.getHelper();
if(_1690&&_1690.resize){
_1690.resize(this);
}else{
if(this.dijitWidget.resize){
this.dijitWidget.resize();
}
}
},renderWidget:function(){
if(this.dijitWidget.render){
this.dijitWidget.render();
}else{
if(this.dijitWidget.chart){
var box=dojo.marginBox(this.dijitWidget.domNode);
this.dijitWidget.resize(box);
}
}
if(this.domNode.parentNode._dvWidget&&this.domNode.parentNode._dvWidget.isDijitWidget){
this._refresh(this.domNode.parentNode);
}
},_refresh:function(node){
var _1691=node.parentNode;
if(_1691._dvWidget&&_1691._dvWidget.isDijitWidget){
this._refresh(_1691);
}else{
if(node._dvWidget.resize){
node._dvWidget.resize();
}
}
},_attr:function(name,value){
return this.dijitWidget.get.apply(this.dijitWidget,arguments);
}});
});
},"dijit/CalendarLite":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/cldr/supplemental","dojo/date","dojo/date/locale","dojo/date/stamp","dojo/dom","dojo/dom-class","dojo/_base/event","dojo/_base/lang","dojo/sniff","dojo/string","./_WidgetBase","./_TemplatedMixin","dojo/text!./templates/Calendar.html","./hccss"],function(array,_1692,_1693,date,_1694,stamp,dom,_1695,event,lang,has,_1696,_1697,_1698,_1699){
var _169a=_1692("dijit.CalendarLite",[_1697,_1698],{templateString:_1699,dowTemplateString:"<th class=\"dijitReset dijitCalendarDayLabelTemplate\" role=\"columnheader\"><span class=\"dijitCalendarDayLabel\">${d}</span></th>",dateTemplateString:"<td class=\"dijitReset\" role=\"gridcell\" data-dojo-attach-point=\"dateCells\"><span class=\"dijitCalendarDateLabel\" data-dojo-attach-point=\"dateLabels\"></span></td>",weekTemplateString:"<tr class=\"dijitReset dijitCalendarWeekTemplate\" role=\"row\">${d}${d}${d}${d}${d}${d}${d}</tr>",value:new Date(""),datePackage:"",dayWidth:"narrow",tabIndex:"0",currentFocus:new Date(),baseClass:"dijitCalendar",_isValidDate:function(value){
return value&&!isNaN(value)&&typeof value=="object"&&value.toString()!=this.constructor.prototype.value.toString();
},_getValueAttr:function(){
if(this.value&&!isNaN(this.value)){
var value=new this.dateClassObj(this.value);
value.setHours(0,0,0,0);
if(value.getDate()<this.value.getDate()){
value=this.dateModule.add(value,"hour",1);
}
return value;
}else{
return null;
}
},_setValueAttr:function(value,_169b){
if(typeof value=="string"){
value=stamp.fromISOString(value);
}
value=this._patchDate(value);
if(this._isValidDate(value)&&!this.isDisabledDate(value,this.lang)){
this._set("value",value);
this.set("currentFocus",value);
this._markSelectedDates([value]);
if(this._created&&(_169b||typeof _169b=="undefined")){
this.onChange(this.get("value"));
}
}else{
this._set("value",null);
this._markSelectedDates([]);
}
},_patchDate:function(value){
if(value){
value=new this.dateClassObj(value);
value.setHours(1,0,0,0);
}
return value;
},_setText:function(node,text){
while(node.firstChild){
node.removeChild(node.firstChild);
}
node.appendChild(node.ownerDocument.createTextNode(text));
},_populateGrid:function(){
var month=new this.dateClassObj(this.currentFocus);
month.setDate(1);
var _169c=month.getDay(),_169d=this.dateModule.getDaysInMonth(month),_169e=this.dateModule.getDaysInMonth(this.dateModule.add(month,"month",-1)),today=new this.dateClassObj(),_169f=_1693.getFirstDayOfWeek(this.lang);
if(_169f>_169c){
_169f-=7;
}
this._date2cell={};
array.forEach(this.dateCells,function(_16a0,idx){
var i=idx+_169f;
var date=new this.dateClassObj(month),_16a1,clazz="dijitCalendar",adj=0;
if(i<_169c){
_16a1=_169e-_169c+i+1;
adj=-1;
clazz+="Previous";
}else{
if(i>=(_169c+_169d)){
_16a1=i-_169c-_169d+1;
adj=1;
clazz+="Next";
}else{
_16a1=i-_169c+1;
clazz+="Current";
}
}
if(adj){
date=this.dateModule.add(date,"month",adj);
}
date.setDate(_16a1);
if(!this.dateModule.compare(date,today,"date")){
clazz="dijitCalendarCurrentDate "+clazz;
}
if(this.isDisabledDate(date,this.lang)){
clazz="dijitCalendarDisabledDate "+clazz;
_16a0.setAttribute("aria-disabled","true");
}else{
clazz="dijitCalendarEnabledDate "+clazz;
_16a0.removeAttribute("aria-disabled");
_16a0.setAttribute("aria-selected","false");
}
var _16a2=this.getClassForDate(date,this.lang);
if(_16a2){
clazz=_16a2+" "+clazz;
}
_16a0.className=clazz+"Month dijitCalendarDateTemplate";
var _16a3=date.valueOf();
this._date2cell[_16a3]=_16a0;
_16a0.dijitDateValue=_16a3;
this._setText(this.dateLabels[idx],date.getDateLocalized?date.getDateLocalized(this.lang):date.getDate());
},this);
},_populateControls:function(){
var month=new this.dateClassObj(this.currentFocus);
month.setDate(1);
this.monthWidget.set("month",month);
var y=month.getFullYear()-1;
var d=new this.dateClassObj();
array.forEach(["previous","current","next"],function(name){
d.setFullYear(y++);
this._setText(this[name+"YearLabelNode"],this.dateLocaleModule.format(d,{selector:"year",locale:this.lang}));
},this);
},goToToday:function(){
this.set("value",new this.dateClassObj());
},constructor:function(_16a4){
this.dateModule=_16a4.datePackage?lang.getObject(_16a4.datePackage,false):date;
this.dateClassObj=this.dateModule.Date||Date;
this.dateLocaleModule=_16a4.datePackage?lang.getObject(_16a4.datePackage+".locale",false):_1694;
},_createMonthWidget:function(){
return _169a._MonthWidget({id:this.id+"_mw",lang:this.lang,dateLocaleModule:this.dateLocaleModule},this.monthNode);
},buildRendering:function(){
var d=this.dowTemplateString,_16a5=this.dateLocaleModule.getNames("days",this.dayWidth,"standAlone",this.lang),_16a6=_1693.getFirstDayOfWeek(this.lang);
this.dayCellsHtml=_1696.substitute([d,d,d,d,d,d,d].join(""),{d:""},function(){
return _16a5[_16a6++%7];
});
var r=_1696.substitute(this.weekTemplateString,{d:this.dateTemplateString});
this.dateRowsHtml=[r,r,r,r,r,r].join("");
this.dateCells=[];
this.dateLabels=[];
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
var _16a7=new this.dateClassObj(this.currentFocus);
this.monthWidget=this._createMonthWidget();
this.set("currentFocus",_16a7,false);
},postCreate:function(){
this.inherited(arguments);
this._connectControls();
},_connectControls:function(){
var _16a8=lang.hitch(this,function(_16a9,part,_16aa){
this.connect(this[_16a9],"onclick",function(){
this._setCurrentFocusAttr(this.dateModule.add(this.currentFocus,part,_16aa));
});
});
_16a8("incrementMonth","month",1);
_16a8("decrementMonth","month",-1);
_16a8("nextYearLabelNode","year",1);
_16a8("previousYearLabelNode","year",-1);
},_setCurrentFocusAttr:function(date,_16ab){
var _16ac=this.currentFocus,_16ad=this._getNodeByDate(_16ac);
date=this._patchDate(date);
this._set("currentFocus",date);
if(!this._date2cell||this.dateModule.difference(_16ac,date,"month")!=0){
this._populateGrid();
this._populateControls();
this._markSelectedDates([this.value]);
}
var _16ae=this._getNodeByDate(date);
_16ae.setAttribute("tabIndex",this.tabIndex);
if(this.focused||_16ab){
_16ae.focus();
}
if(_16ad&&_16ad!=_16ae){
if(has("webkit")){
_16ad.setAttribute("tabIndex","-1");
}else{
_16ad.removeAttribute("tabIndex");
}
}
},focus:function(){
this._setCurrentFocusAttr(this.currentFocus,true);
},_onDayClick:function(evt){
event.stop(evt);
for(var node=evt.target;node&&!node.dijitDateValue;node=node.parentNode){
}
if(node&&!_1695.contains(node,"dijitCalendarDisabledDate")){
this.set("value",node.dijitDateValue);
}
},_getNodeByDate:function(value){
value=this._patchDate(value);
return value&&this._date2cell?this._date2cell[value.valueOf()]:null;
},_markSelectedDates:function(dates){
function mark(_16af,cell){
_1695.toggle(cell,"dijitCalendarSelectedDate",_16af);
cell.setAttribute("aria-selected",_16af?"true":"false");
};
array.forEach(this._selectedCells||[],lang.partial(mark,false));
this._selectedCells=array.filter(array.map(dates,this._getNodeByDate,this),function(n){
return n;
});
array.forEach(this._selectedCells,lang.partial(mark,true));
},onChange:function(){
},isDisabledDate:function(){
},getClassForDate:function(){
}});
_169a._MonthWidget=_1692("dijit.CalendarLite._MonthWidget",_1697,{_setMonthAttr:function(month){
var _16b0=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,month),_16b1=(has("ie")==6?"":"<div class='dijitSpacer'>"+array.map(_16b0,function(s){
return "<div>"+s+"</div>";
}).join("")+"</div>");
this.domNode.innerHTML=_16b1+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_16b0[month.getMonth()]+"</div>";
}});
return _169a;
});
},"davinci/html/CSSElement":function(){
define(["dojo/_base/declare","davinci/model/Model"],function(_16b2,Model){
return _16b2("davinci.html.CSSElement",Model,{constructor:function(){
if(typeof pushComment!="undefined"&&pushComment!==null){
this.comment=pushComment;
pushComment=null;
}
this.elementType="CSSElement";
},getLabel:function(){
context={indent:0,noComments:true};
return this.getText(context);
},onChange:function(arg){
if(this.parent){
if(arg){
this.parent.onChange(arg);
}else{
this.parent.onChange(this);
}
}
},close:function(_16b3){
for(var i=0;i<this.children;i++){
this.children[i].close();
}
},getCSSFile:function(){
var rule=this.getCSSRule();
if(rule){
return rule.parent;
}
},getCSSRule:function(){
},_convertNode:function(_16b4){
if(dojo.isArray(_16b4)){
return _16b4;
}
var nodes=[];
while(_16b4&&_16b4.tagName!="HTML"){
nodes.push({tagName:_16b4.tagName,id:_16b4.id,classes:(_16b4.className&&_16b4.className.split(" "))});
_16b4=_16b4.parentNode;
}
return nodes;
},getID:function(){
return this.parent.getID()+":"+this.startOffset+":"+this.getLabel();
}});
});
},"davinci/ve/commands/ResizeCommand":function(){
define(["dojo/_base/declare","dojo/dom-geometry","davinci/ve/widget","davinci/ve/States","davinci/ve/utils/StyleArray"],function(_16b5,_16b6,_16b7,_16b8,_16b9){
return _16b5("davinci.ve.commands.ResizeCommand",null,{name:"resize",constructor:function(_16ba,width,_16bb,_16bc){
this._id=(_16ba?_16ba.id:undefined);
var _16bd=/^\s*[-+]?[0-9]*\.?[0-9]+\s*$/;
if(_16bd.test(width)){
width=parseFloat(width);
}
if(_16bd.test(_16bb)){
_16bb=parseFloat(_16bb);
}
this._newBox={w:width,h:_16bb};
this._applyToStateIndex=(!_16bc||_16bc=="Normal"||_16bc=="undefined")?"undefined":_16bc;
},execute:function(){
if(!this._id||!this._newBox){
return;
}
var _16be=_16b7.byId(this._id);
if(!_16be||!_16be.domNode){
return;
}
var node=_16be.domNode;
var cs=node.ownerDocument.defaultView.getComputedStyle(node);
var _16bf=_16b6.getContentBox(node,cs);
this._oldBox={w:_16bf.w,h:_16bf.h};
var w=this._newBox.w;
var h=this._newBox.h;
if(this._usesBorderBox(node)){
var pb=_16b6.getPadBorderExtents(node,cs);
if(typeof w=="number"&&w>=0){
w+=pb.w;
}
if(typeof h=="number"&&h>=0){
h+=pb.h;
}
}
var _16c0=[{}];
if(typeof w=="number"){
_16c0[0].width=w+"px";
}else{
if(typeof w=="string"){
_16c0[0].width=w;
}
}
if(typeof h=="number"){
_16c0[0].height=h+"px";
}else{
if(typeof h=="string"){
_16c0[0].height=h;
}
}
var _16c1=_16be.getStyleValuesAllStates();
this._oldStyleValuesAllStates=dojo.clone(_16c1);
if(this._oldBox){
this._oldStyleValuesAllStates[this._applyToStateIndex]=_16b9.mergeStyleArrays(this._oldStyleValuesAllStates[this._applyToStateIndex],[{width:this._oldBox.w+"px"},{height:this._oldBox.h+"px"}]);
}
if(_16c1[this._applyToStateIndex]){
_16c1[this._applyToStateIndex]=_16b9.mergeStyleArrays(_16c1[this._applyToStateIndex],_16c0);
}else{
_16c1[this._applyToStateIndex]=_16c0;
}
_16be.setStyleValuesAllStates(_16c1);
var _16c2=_16b8.getStatesListCurrent(_16be.domNode);
var _16c3=_16b9.mergeStyleArrays([],_16c1["undefined"]);
for(var i=0;i<_16c2.length;i++){
if(_16c1[_16c2[i]]){
_16c3=_16b9.mergeStyleArrays(_16c3,_16c1[_16c2[i]]);
}
}
_16be.setStyleValuesCanvas(_16c3);
_16be.setStyleValuesModel(_16c1["undefined"]);
this._resize(_16be);
_16b8.resetState(_16be.domNode);
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[_16be]]);
},setContext:function(_16c4){
this._context=_16c4;
},undo:function(){
if(!this._id){
return;
}
var _16c5=_16b7.byId(this._id);
if(!_16c5){
return;
}
var _16c6=this._oldStyleValuesAllStates;
var _16c7=this._applyToStateIndex;
_16c5.setStyleValuesAllStates(_16c6);
var _16c8=_16b9.mergeStyleArrays(_16c6["undefined"],_16c6[_16c7]);
_16c5.setStyleValuesCanvas(_16c8);
_16c5.setStyleValuesModel(this._oldStyleValuesAllStates["undefined"]);
this._resize(_16c5);
_16b8.resetState(_16c5.domNode);
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[_16c5]]);
},_usesBorderBox:function(node){
var _16c9=node.tagName.toLowerCase();
var type=node.getAttribute("type");
if(type){
type=type.toLowerCase(type);
}
return _16c9=="table"||_16c9=="button"||(_16c9=="input"&&type=="button");
},_resize:function(_16ca){
var _16cb=_16ca.getParent();
if(_16cb&&_16cb.dijitWidget&&_16cb.dijitWidget.isLayoutContainer){
_16cb.resize();
}else{
if(_16ca.resize){
_16ca.resize();
}
}
_16ca.renderWidget();
_16ca._updateSrcStyle();
}});
});
},"url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\"\n\t \trole=\"menuitem\" tabIndex=\"-1\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n","dijit/Toolbar":function(){
define(["require","dojo/_base/declare","dojo/has","dojo/keys","dojo/ready","./_Widget","./_KeyNavContainer","./_TemplatedMixin"],function(_16cc,_16cd,has,keys,ready,_16ce,_16cf,_16d0){
if(has("dijit-legacy-requires")){
ready(0,function(){
var _16d1=["dijit/ToolbarSeparator"];
_16cc(_16d1);
});
}
return _16cd("dijit.Toolbar",[_16ce,_16d0,_16cf],{templateString:"<div class=\"dijit\" role=\"toolbar\" tabIndex=\"${tabIndex}\" data-dojo-attach-point=\"containerNode\">"+"</div>",baseClass:"dijitToolbar",postCreate:function(){
this.inherited(arguments);
this.connectKeyNavHandlers(this.isLeftToRight()?[keys.LEFT_ARROW]:[keys.RIGHT_ARROW],this.isLeftToRight()?[keys.RIGHT_ARROW]:[keys.LEFT_ARROW]);
}});
});
},"dojo/promise/all":function(){
define(["../_base/array","../Deferred","../when"],function(array,_16d2,when){
"use strict";
var some=array.some;
return function all(_16d3){
var _16d4,array;
if(_16d3 instanceof Array){
array=_16d3;
}else{
if(_16d3&&typeof _16d3==="object"){
_16d4=_16d3;
}
}
var _16d5;
var _16d6=[];
if(_16d4){
array=[];
for(var key in _16d4){
if(Object.hasOwnProperty.call(_16d4,key)){
_16d6.push(key);
array.push(_16d4[key]);
}
}
_16d5={};
}else{
if(array){
_16d5=[];
}
}
if(!array||!array.length){
return new _16d2().resolve(_16d5);
}
var _16d7=new _16d2();
_16d7.promise.always(function(){
_16d5=_16d6=null;
});
var _16d8=array.length;
some(array,function(_16d9,index){
if(!_16d4){
_16d6.push(index);
}
when(_16d9,function(value){
if(!_16d7.isFulfilled()){
_16d5[_16d6[index]]=value;
if(--_16d8===0){
_16d7.resolve(_16d5);
}
}
},_16d7.reject);
return _16d7.isFulfilled();
});
return _16d7.promise;
};
});
},"davinci/review/model/ReviewTreeModel":function(){
define(["dojo/_base/declare","davinci/review/model/Resource"],function(_16da,_16db){
return _16da("davinci.review.model.ReviewTreeModel",null,{foldersOnly:false,constructor:function(args){
this.root=_16db.getRoot();
this.subscription=[dojo.subscribe("/davinci/review/resourceChanged",this,this.resourceChanged)];
},destroy:function(){
this.subscriptions.forEach(dojo.unsubscribe);
},getRoot:function(_16dc){
_16dc(this.root);
},mayHaveChildren:function(item){
return item.elementType=="ReviewVersion"&&!item.isDraft;
},getChildren:function(_16dd,_16de,_16df){
_16dd.getChildren(_16de,_16df);
},getIdentity:function(item){
return item.getPath();
},resourceChanged:function(_16e0,type,_16e1){
if(_16e1){
if(_16e1._isLoaded){
_16e1.getChildren(function(_16e2){
_16e2.forEach(this.onDelete,this);
}.bind(this),true);
}
this.onDelete(_16e1);
}
var _16e3=this.root;
_16e3._isLoaded=false;
_16e3.getChildren(function(_16e4){
this.onChildrenChange(_16e3,_16e4);
}.bind(this));
},getLabel:function(item){
var label=item.getName();
if(item.elementType=="ReviewVersion"&&item.isDraft){
label+=" (Draft)";
}
if(item.elementType=="ReviewFile"){
var path=new davinci.model.Path(label);
var _16e5=path.getSegments();
var _16e6=davinci.Runtime.getExtension("davinci.editor",function(_16e7){
return _16e7.id==="davinci.review.CommentReviewEditor";
});
var _16e8="."+_16e6.extensions;
label=_16e5[_16e5.length-1]+_16e8;
}
return label;
},newItem:function(args,_16e9){
},pasteItem:function(_16ea,_16eb,_16ec,bCopy){
},onChange:function(item){
},onDelete:function(item){
},onChildrenChange:function(_16ed,_16ee){
}});
});
},"davinci/review/actions/PublishAction":function(){
define(["dojo/_base/declare","davinci/actions/Action","davinci/review/widgets/PublishWizard","davinci/Runtime","dojox/widget/Toaster","davinci/ui/Dialog","dojo/i18n!./nls/actions"],function(_16ef,_16f0,_16f1,_16f2,_16f3,_16f4,_16f5){
var _16f6=_16ef("davinci.review.actions.PublishAction",[_16f0],{constructor:function(node,_16f7){
this.node=node;
this.isRestart=_16f7;
if(node&&node.isRestart){
this.isRestart=true;
}
},run:function(){
var _16f8=this.publishWizard=new _16f1();
this.dialog=new _16f4({contentStyle:{width:650,height:350},title:this.node?_16f5.editReview:_16f5.newReview,onCancel:dojo.hitch(this,this.close),onHide:dojo.hitch(this,this.hide)});
this.dialog.setContent(_16f8);
this.dialog.show();
dojo.connect(_16f8,"onClose",this,this.close);
_16f8.initData(this.node,this.isRestart).then(function(){
_16f8.updateSubmit();
_16f8.reviewerStackContainer.resize();
});
},hide:function(){
this.dialog.destroyRecursive();
},close:function(){
this.dialog.hide();
}});
return _16f6;
});
},"davinci/ui/SelectProjectDialog":function(){
define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","../Workbench","dojo/i18n!davinci/ui/nls/ui","dojo/text!./templates/SelectProjectDialog.html","./widgets/ProjectSelection"],function(_16f9,_16fa,_16fb,_16fc,_16fd,uiNLS,_16fe){
return _16f9([_16fa,_16fb,_16fc],{templateString:_16fe,uiNLS:uiNLS,postCreate:function(){
this.currentProject=_16fd.getProject();
this.currentProjectName.innerHTML=this.currentProject;
},_onChange:function(e){
if(this.projectSelection.get("value")==this.currentProject){
this._okButton.set("disabled",true);
}else{
this._okButton.set("disabled",false);
}
},okButton:function(){
var _16ff=this.projectSelection.get("value");
if(_16ff){
_16fd.loadProject(_16ff);
}
},cancelButton:function(){
this.onClose();
}});
});
},"dojox/html/ellipsis":function(){
define("dojox/html/ellipsis",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/array","dojo/_base/Color","dojo/colors"],function(d){
if(d.isFF<7){
var delay=1;
if("dojoxFFEllipsisDelay" in d.config){
delay=Number(d.config.dojoxFFEllipsisDelay);
if(isNaN(delay)){
delay=1;
}
}
try{
var _1700=(function(){
var sNS="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
var xml=document.createElementNS(sNS,"window");
var label=document.createElementNS(sNS,"description");
label.setAttribute("crop","end");
xml.appendChild(label);
return function(n){
var x=xml.cloneNode(true);
x.firstChild.setAttribute("value",n.textContent);
n.innerHTML="";
n.appendChild(x);
};
})();
}
catch(e){
}
var _1701=d.create;
var dd=d.doc;
var dp=d.place;
var _1702=_1701("iframe",{className:"dojoxEllipsisIFrame",src:"javascript:'<html><head><script>if(\"loadFirebugConsole\" in window){window.loadFirebugConsole();}</script></head><body></body></html>'",style:{display:"none"}});
var _1703=function(r,cnt){
if(r.collapsed){
return;
}
if(cnt>0){
do{
_1703(r);
cnt--;
}while(cnt);
return;
}
if(r.endContainer.nodeType==3&&r.endOffset>0){
r.setEnd(r.endContainer,r.endOffset-1);
}else{
if(r.endContainer.nodeType==3){
r.setEndBefore(r.endContainer);
_1703(r);
return;
}else{
if(r.endOffset&&r.endContainer.childNodes.length>=r.endOffset){
var nCont=r.endContainer.childNodes[r.endOffset-1];
if(nCont.nodeType==3){
r.setEnd(nCont,nCont.length-1);
}else{
if(nCont.childNodes.length){
r.setEnd(nCont,nCont.childNodes.length);
_1703(r);
return;
}else{
r.setEndBefore(nCont);
_1703(r);
return;
}
}
}else{
r.setEndBefore(r.endContainer);
_1703(r);
return;
}
}
}
};
var _1704=function(n){
var c=_1701("div",{className:"dojoxEllipsisContainer"});
var e=_1701("div",{className:"dojoxEllipsisShown",style:{display:"none"}});
n.parentNode.replaceChild(c,n);
c.appendChild(n);
c.appendChild(e);
var i=_1702.cloneNode(true);
var ns=n.style;
var es=e.style;
var _1705;
var _1706=function(){
ns.display="";
es.display="none";
if(n.scrollWidth<=n.offsetWidth){
return;
}
var r=dd.createRange();
r.selectNodeContents(n);
ns.display="none";
es.display="";
var done=false;
do{
var _1707=1;
dp(r.cloneContents(),e,"only");
var sw=e.scrollWidth,ow=e.offsetWidth;
done=(sw<=ow);
var pct=(1-((ow*1)/sw));
if(pct>0){
_1707=Math.max(Math.round(e.textContent.length*pct)-1,1);
}
_1703(r,_1707);
}while(!r.collapsed&&!done);
};
i.onload=function(){
i.contentWindow.onresize=_1706;
_1706();
};
c.appendChild(i);
};
var hc=d.hasClass;
var doc=d.doc;
var s,fn,opt;
if(doc.querySelectorAll){
s=doc;
fn="querySelectorAll";
opt=".dojoxEllipsis";
}else{
if(doc.getElementsByClassName){
s=doc;
fn="getElementsByClassName";
opt="dojoxEllipsis";
}else{
s=d;
fn="query";
opt=".dojoxEllipsis";
}
}
fx=function(){
d.forEach(s[fn].apply(s,[opt]),function(n){
if(!n||n._djx_ellipsis_done){
return;
}
n._djx_ellipsis_done=true;
if(_1700&&n.textContent==n.innerHTML&&!hc(n,"dojoxEllipsisSelectable")){
_1700(n);
}else{
_1704(n);
}
});
};
d.addOnLoad(function(){
var t=null;
var c=null;
var _1708=function(){
if(c){
d.disconnect(c);
c=null;
}
if(t){
clearTimeout(t);
}
t=setTimeout(function(){
t=null;
fx();
c=d.connect(d.body(),"DOMSubtreeModified",_1708);
},delay);
};
_1708();
});
}
});
},"davinci/ui/Dialog":function(){
define(["dojo/_base/declare","dijit/form/Button","dijit/Dialog","dojo/dom-geometry","dojo/dom-style","dojo/_base/connect","dojo/window","dojo/parser","dojo/i18n!davinci/ve/nls/common","dojox/layout/ResizeHandle",],function(_1709,_170a,_170b,_170c,style,_170d,_170e,_170f,veNLS,_1710){
var _1711=_1709(_170b,{contentStyle:null,buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"resizableDialog");
if(this.submitOnEnter){
dojo.addClass(this.domNode,"submitOnEnter");
}
},_setContent:function(cont,_1712){
this.inherited(arguments);
var div=dojo.doc.createElement("div");
this.containerNode.appendChild(div);
new _1710({targetId:this.id},div);
var _1713=dojo.query(".dijitDialogPaneContentArea",this.containerNode)[0];
if(_1713){
dojo.connect(_1713,"onkeydown",this,"_onKeyDown");
}else{
dojo.connect(this.domNode,"onkeydown",this,"_onKeyDown");
}
},resize:function(_1714){
if(_1714){
var _1715=style.getComputedStyle(this.containerNode);
var _1716=_170c.getPadExtents(this.containerNode,_1715);
var c={w:_1714.w-_1716.w,h:_1714.h-_1716.h};
c.h-=_170c.getMarginBox(this.titleBar).h;
var _1717=dojo.query(".dijitDialogPaneContentArea",this.containerNode)[0];
var _1718=dojo.query(".dijitDialogPaneActionBar",this.containerNode)[0];
c.h-=_170c.getMarginBox(_1718).h;
if(c.w){
dojo.style(_1717,"width",c.w+"px");
}
if(c.h){
dojo.style(_1717,"height",c.h+"px");
}
dojo.forEach(this.getChildren(),dojo.hitch(this,function(child){
if(child.resize){
child.resize({w:c.w,h:c.h});
}
}));
}
},show:function(){
var _1719=this.inherited(arguments);
if(this.contentStyle){
if(typeof (this.contentStyle)=="object"){
var r={};
if(this.contentStyle.width){
r.w=parseInt(this.contentStyle.width);
}
if(this.contentStyle.height){
r.h=parseInt(this.contentStyle.height);
}
var _171a=_170e.getBox(this.ownerDocument);
_171a.w*=this.maxRatio;
_171a.h*=this.maxRatio;
if(r.h>_171a.h){
var _171b=_170c.position(this.containerNode),w=Math.min(r.w,_171a.w)-(r.w-_171b.w),h=Math.min(r.h,_171a.h)-(r.h-_171b.h);
r.h=_171a.h;
}
this.resize(r);
}
this._size();
this._position();
dojo.style(this.containerNode,"width","auto");
dojo.style(this.containerNode,"height","auto");
}
return _1719;
},_onKeyDown:function(e){
var _171c=((e.ctrlKey&&!dojo.isMac)||(dojo.isMac&&e.metaKey));
if(e.which==dojo.keys.ENTER&&(_171c||this.submitOnEnter)){
var _171d=dojo.query("input[type=submit]",this.containerNode);
if(_171d.length>0){
var b=dijit.getEnclosingWidget(_171d[0]);
var evt=document.createEvent("MouseEvents");
evt.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
b._onClick(evt);
}
}
}});
_1711._timedDestroy=function(_171e,_171f){
if(_171f){
_171f.forEach(_170d.disconnect);
}
var hndl=_170d.connect(_171e,"onHide",function(){
_170d.disconnect(hndl);
_171e.destroyRecursive();
});
_171e.hide();
};
_1711.showModal=function(_1720,title,style,_1721,_1722){
var _1723=[];
var _1724=new _1711({title:title,content:_1720,contentStyle:style,submitOnEnter:_1722});
var _1725=dojo.hitch(this,function(){
var _1726=false;
if(_1721){
_1726=_1721();
}
if(_1726){
return;
}
this._timedDestroy(_1724,_1723);
});
_1723.push(_170d.connect(_1724,"onExecute",_1720,_1725));
if(_1720.onExecute){
_1723.push(_170d.connect(_1720,"onExecute",_1720,_1725));
}
_1723.push(_170d.connect(_1720,"onClose",dojo.hitch(this,function(){
this._timedDestroy(_1724,_1723);
})));
_1723.push(_170d.connect(_1724,"onCancel",dojo.hitch(this,function(){
this._timedDestroy(_1724,_1723);
})));
_1724.show();
return _1724;
},_1711.showMessage=function(title,_1727,style,_1728,_1729){
return this.showDialog(title,_1727,style,_1728,null,true);
},_1711.showDialog=function(title,_172a,style,_172b,_172c,_172d,_172e){
var _172f;
var _1730=[];
var _1731=document.createElement("div");
var _1732=document.createElement("div");
dojo.addClass(_1732,"dijitDialogPaneContentArea");
_1731.appendChild(_1732);
var _1733=document.createElement("div");
dojo.addClass(_1733,"dijitDialogPaneActionBar");
var _1734=new _170a({label:_172c?_172c:veNLS.ok,type:"submit","class":"maqPrimaryButton"});
_1733.appendChild(_1734.domNode);
var _1735=dojo.hitch(this,function(){
this._timedDestroy(_172f,_1730);
});
if(!_172d){
function _1736(){
_172f.onCancel();
};
_1733.appendChild(new _170a({label:veNLS.cancel,onClick:_1736,"class":"maqSecondaryButton"}).domNode);
}
_1731.appendChild(_1733);
_172f=new _1711({title:title,content:_1731,contentStyle:style,submitOnEnter:_172e});
if(dojo.isString(_172a)){
_1732.innerHTML=_172a;
_170f.parse(_1732);
}else{
if(_172a.domNode){
_1732.appendChild(_172a.domNode);
}else{
_1732.appendChild(_172a);
}
}
_1730.push(_170d.connect(_172f,"onExecute",dojo.hitch(this,function(){
if(_172b){
_172b();
}
_1735();
})));
_1730.push(_170d.connect(_172f,"onCancel",dojo.hitch(this,function(){
_1735();
})));
_172f.show();
return _172f;
};
return _1711;
});
},"dojox/grid/_View":function(){
require({cache:{"url:dojox/grid/resources/View.html":"<div class=\"dojoxGridView\" role=\"presentation\">\n\t<div class=\"dojoxGridHeader\" dojoAttachPoint=\"headerNode\" role=\"presentation\">\n\t\t<div dojoAttachPoint=\"headerNodeContainer\" style=\"width:9000em\" role=\"presentation\">\n\t\t\t<div dojoAttachPoint=\"headerContentNode\" role=\"row\"></div>\n\t\t</div>\n\t</div>\n\t<input type=\"checkbox\" class=\"dojoxGridHiddenFocus\" dojoAttachPoint=\"hiddenFocusNode\" role=\"presentation\" />\n\t<input type=\"checkbox\" class=\"dojoxGridHiddenFocus\" role=\"presentation\" />\n\t<div class=\"dojoxGridScrollbox\" dojoAttachPoint=\"scrollboxNode\" role=\"presentation\">\n\t\t<div class=\"dojoxGridContent\" dojoAttachPoint=\"contentNode\" hidefocus=\"hidefocus\" role=\"presentation\"></div>\n\t</div>\n</div>\n"}});
define("dojox/grid/_View",["dojo","dijit/registry","../main","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/connect","dojo/_base/sniff","dojo/query","dojo/_base/window","dojo/text!./resources/View.html","dojo/dnd/Source","dijit/_Widget","dijit/_TemplatedMixin","dojox/html/metrics","./util","dojo/_base/html","./_Builder","dojo/dnd/Avatar","dojo/dnd/Manager"],function(dojo,dijit,dojox,_1737,array,lang,_1738,has,query,win,_1739,_173a,_173b,_173c,_173d,util,html,_173e,_173f,_1740){
var _1741=function(_1742,_1743){
return _1742.style.cssText==undefined?_1742.getAttribute("style"):_1742.style.cssText;
};
var _1744=_1737("dojox.grid._View",[_173b,_173c],{defaultWidth:"18em",viewWidth:"",templateString:_1739,classTag:"dojoxGrid",marginBottom:0,rowPad:2,_togglingColumn:-1,_headerBuilderClass:_173e._HeaderBuilder,_contentBuilderClass:_173e._ContentBuilder,postMixInProperties:function(){
this.rowNodes={};
},postCreate:function(){
this.connect(this.scrollboxNode,"onscroll","doscroll");
util.funnelEvents(this.contentNode,this,"doContentEvent",["mouseover","mouseout","click","dblclick","contextmenu","mousedown"]);
util.funnelEvents(this.headerNode,this,"doHeaderEvent",["dblclick","mouseover","mouseout","mousemove","mousedown","click","contextmenu"]);
this.content=new this._contentBuilderClass(this);
this.header=new this._headerBuilderClass(this);
if(!this.grid.isLeftToRight()){
this.headerNodeContainer.style.width="";
}
},destroy:function(){
html.destroy(this.headerNode);
delete this.headerNode;
for(var i in this.rowNodes){
this._cleanupRowWidgets(this.rowNodes[i]);
html.destroy(this.rowNodes[i]);
}
this.rowNodes={};
if(this.source){
this.source.destroy();
}
this.inherited(arguments);
},focus:function(){
if(has("ie")||has("webkit")||has("opera")){
this.hiddenFocusNode.focus();
}else{
this.scrollboxNode.focus();
}
},setStructure:function(_1745){
var vs=(this.structure=_1745);
if(vs.width&&!isNaN(vs.width)){
this.viewWidth=vs.width+"em";
}else{
this.viewWidth=vs.width||(vs.noscroll?"auto":this.viewWidth);
}
this._onBeforeRow=vs.onBeforeRow||function(){
};
this._onAfterRow=vs.onAfterRow||function(){
};
this.noscroll=vs.noscroll;
if(this.noscroll){
this.scrollboxNode.style.overflow="hidden";
}
this.simpleStructure=Boolean(vs.cells.length==1);
this.testFlexCells();
this.updateStructure();
},_cleanupRowWidgets:function(_1746){
if(_1746){
array.forEach(query("[widgetId]",_1746).map(dijit.byNode),function(w){
if(w._destroyOnRemove){
w.destroy();
delete w;
}else{
if(w.domNode&&w.domNode.parentNode){
w.domNode.parentNode.removeChild(w.domNode);
}
}
});
}
},onBeforeRow:function(_1747,cells){
this._onBeforeRow(_1747,cells);
if(_1747>=0){
this._cleanupRowWidgets(this.getRowNode(_1747));
}
},onAfterRow:function(_1748,cells,_1749){
this._onAfterRow(_1748,cells,_1749);
var g=this.grid;
array.forEach(query(".dojoxGridStubNode",_1749),function(n){
if(n&&n.parentNode){
var lw=n.getAttribute("linkWidget");
var _174a=window.parseInt(html.attr(n,"cellIdx"),10);
var _174b=g.getCell(_174a);
var w=dijit.byId(lw);
if(w){
n.parentNode.replaceChild(w.domNode,n);
if(!w._started){
w.startup();
}
dojo.destroy(n);
}else{
n.innerHTML="";
}
}
},this);
},testFlexCells:function(){
this.flexCells=false;
for(var j=0,row;(row=this.structure.cells[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
cell.view=this;
this.flexCells=this.flexCells||cell.isFlex();
}
}
return this.flexCells;
},updateStructure:function(){
this.header.update();
this.content.update();
},getScrollbarWidth:function(){
var _174c=this.hasVScrollbar();
var _174d=html.style(this.scrollboxNode,"overflow");
if(this.noscroll||!_174d||_174d=="hidden"){
_174c=false;
}else{
if(_174d=="scroll"){
_174c=true;
}
}
return (_174c?_173d.getScrollbar().w:0);
},getColumnsWidth:function(){
var h=this.headerContentNode;
return h&&h.firstChild?h.firstChild.offsetWidth:0;
},setColumnsWidth:function(width){
this.headerContentNode.firstChild.style.width=width+"px";
if(this.viewWidth){
this.viewWidth=width+"px";
}
},getWidth:function(){
return this.viewWidth||(this.getColumnsWidth()+this.getScrollbarWidth())+"px";
},getContentWidth:function(){
return Math.max(0,html._getContentBox(this.domNode).w-this.getScrollbarWidth())+"px";
},render:function(){
this.scrollboxNode.style.height="";
this.renderHeader();
if(this._togglingColumn>=0){
this.setColumnsWidth(this.getColumnsWidth()-this._togglingColumn);
this._togglingColumn=-1;
}
var cells=this.grid.layout.cells;
var _174e=lang.hitch(this,function(node,_174f){
!this.grid.isLeftToRight()&&(_174f=!_174f);
var inc=_174f?-1:1;
var idx=this.header.getCellNodeIndex(node)+inc;
var cell=cells[idx];
while(cell&&cell.getHeaderNode()&&cell.getHeaderNode().style.display=="none"){
idx+=inc;
cell=cells[idx];
}
if(cell){
return cell.getHeaderNode();
}
return null;
});
if(this.grid.columnReordering&&this.simpleStructure){
if(this.source){
this.source.destroy();
}
var _1750="dojoxGrid_bottomMarker";
var _1751="dojoxGrid_topMarker";
if(this.bottomMarker){
html.destroy(this.bottomMarker);
}
this.bottomMarker=html.byId(_1750);
if(this.topMarker){
html.destroy(this.topMarker);
}
this.topMarker=html.byId(_1751);
if(!this.bottomMarker){
this.bottomMarker=html.create("div",{"id":_1750,"class":"dojoxGridColPlaceBottom"},win.body());
this._hide(this.bottomMarker);
this.topMarker=html.create("div",{"id":_1751,"class":"dojoxGridColPlaceTop"},win.body());
this._hide(this.topMarker);
}
this.arrowDim=html.contentBox(this.bottomMarker);
var _1752=html.contentBox(this.headerContentNode.firstChild.rows[0]).h;
this.source=new _173a(this.headerContentNode.firstChild.rows[0],{horizontal:true,accept:["gridColumn_"+this.grid.id],viewIndex:this.index,generateText:false,onMouseDown:lang.hitch(this,function(e){
this.header.decorateEvent(e);
if((this.header.overRightResizeArea(e)||this.header.overLeftResizeArea(e))&&this.header.canResize(e)&&!this.header.moveable){
this.header.beginColumnResize(e);
}else{
if(this.grid.headerMenu){
this.grid.headerMenu.onCancel(true);
}
if(e.button===(has("ie")<9?1:0)){
_173a.prototype.onMouseDown.call(this.source,e);
}
}
}),onMouseOver:lang.hitch(this,function(e){
var src=this.source;
if(src._getChildByEvent(e)){
_173a.prototype.onMouseOver.apply(src,arguments);
}
}),_markTargetAnchor:lang.hitch(this,function(_1753){
var src=this.source;
if(src.current==src.targetAnchor&&src.before==_1753){
return;
}
if(src.targetAnchor&&_174e(src.targetAnchor,src.before)){
src._removeItemClass(_174e(src.targetAnchor,src.before),src.before?"After":"Before");
}
_173a.prototype._markTargetAnchor.call(src,_1753);
var _1754=_1753?src.targetAnchor:_174e(src.targetAnchor,src.before);
var _1755=0;
if(!_1754){
_1754=src.targetAnchor;
_1755=html.contentBox(_1754).w+this.arrowDim.w/2+2;
}
var pos=html.position(_1754,true);
var left=Math.floor(pos.x-this.arrowDim.w/2+_1755);
html.style(this.bottomMarker,"visibility","visible");
html.style(this.topMarker,"visibility","visible");
html.style(this.bottomMarker,{"left":left+"px","top":(_1752+pos.y)+"px"});
html.style(this.topMarker,{"left":left+"px","top":(pos.y-this.arrowDim.h)+"px"});
if(src.targetAnchor&&_174e(src.targetAnchor,src.before)){
src._addItemClass(_174e(src.targetAnchor,src.before),src.before?"After":"Before");
}
}),_unmarkTargetAnchor:lang.hitch(this,function(){
var src=this.source;
if(!src.targetAnchor){
return;
}
if(src.targetAnchor&&_174e(src.targetAnchor,src.before)){
src._removeItemClass(_174e(src.targetAnchor,src.before),src.before?"After":"Before");
}
this._hide(this.bottomMarker);
this._hide(this.topMarker);
_173a.prototype._unmarkTargetAnchor.call(src);
}),destroy:lang.hitch(this,function(){
_1738.disconnect(this._source_conn);
_1738.unsubscribe(this._source_sub);
_173a.prototype.destroy.call(this.source);
if(this.bottomMarker){
html.destroy(this.bottomMarker);
delete this.bottomMarker;
}
if(this.topMarker){
html.destroy(this.topMarker);
delete this.topMarker;
}
}),onDndCancel:lang.hitch(this,function(){
_173a.prototype.onDndCancel.call(this.source);
this._hide(this.bottomMarker);
this._hide(this.topMarker);
})});
this._source_conn=_1738.connect(this.source,"onDndDrop",this,"_onDndDrop");
this._source_sub=_1738.subscribe("/dnd/drop/before",this,"_onDndDropBefore");
this.source.startup();
}
},_hide:function(node){
html.style(node,{top:"-10000px","visibility":"hidden"});
},_onDndDropBefore:function(_1756,nodes,copy){
if(_1740.manager().target!==this.source){
return;
}
this.source._targetNode=this.source.targetAnchor;
this.source._beforeTarget=this.source.before;
var views=this.grid.views.views;
var _1757=views[_1756.viewIndex];
var _1758=views[this.index];
if(_1758!=_1757){
_1757.convertColPctToFixed();
_1758.convertColPctToFixed();
}
},_onDndDrop:function(_1759,nodes,copy){
if(_1740.manager().target!==this.source){
if(_1740.manager().source===this.source){
this._removingColumn=true;
}
return;
}
this._hide(this.bottomMarker);
this._hide(this.topMarker);
var _175a=function(n){
return n?html.attr(n,"idx"):null;
};
var w=html.marginBox(nodes[0]).w;
if(_1759.viewIndex!==this.index){
var views=this.grid.views.views;
var _175b=views[_1759.viewIndex];
var _175c=views[this.index];
if(_175b.viewWidth&&_175b.viewWidth!="auto"){
_175b.setColumnsWidth(_175b.getColumnsWidth()-w);
}
if(_175c.viewWidth&&_175c.viewWidth!="auto"){
_175c.setColumnsWidth(_175c.getColumnsWidth());
}
}
var stn=this.source._targetNode;
var stb=this.source._beforeTarget;
!this.grid.isLeftToRight()&&(stb=!stb);
var _175d=this.grid.layout;
var idx=this.index;
delete this.source._targetNode;
delete this.source._beforeTarget;
_175d.moveColumn(_1759.viewIndex,idx,_175a(nodes[0]),_175a(stn),stb);
},renderHeader:function(){
this.headerContentNode.innerHTML=this.header.generateHtml(this._getHeaderContent);
if(this.flexCells){
this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth;
}
util.fire(this,"onAfterRow",[-1,this.structure.cells,this.headerContentNode]);
},_getHeaderContent:function(_175e){
var n=_175e.name||_175e.grid.getCellName(_175e);
if(/^\s+$/.test(n)){
n="&nbsp;";
}
var ret=["<div class=\"dojoxGridSortNode"];
if(_175e.index!=_175e.grid.getSortIndex()){
ret.push("\">");
}else{
ret=ret.concat([" ",_175e.grid.sortInfo>0?"dojoxGridSortUp":"dojoxGridSortDown","\"><div class=\"dojoxGridArrowButtonChar\">",_175e.grid.sortInfo>0?"&#9650;":"&#9660;","</div><div class=\"dojoxGridArrowButtonNode\" role=\"presentation\"></div>","<div class=\"dojoxGridColCaption\">"]);
}
ret=ret.concat([n,"</div></div>"]);
return ret.join("");
},resize:function(){
this.adaptHeight();
this.adaptWidth();
},hasHScrollbar:function(reset){
var _175f=this._hasHScroll||false;
if(this._hasHScroll==undefined||reset){
if(this.noscroll){
this._hasHScroll=false;
}else{
var style=html.style(this.scrollboxNode,"overflow");
if(style=="hidden"){
this._hasHScroll=false;
}else{
if(style=="scroll"){
this._hasHScroll=true;
}else{
this._hasHScroll=(this.scrollboxNode.offsetWidth-this.getScrollbarWidth()<this.contentNode.offsetWidth);
}
}
}
}
if(_175f!==this._hasHScroll){
this.grid.update();
}
return this._hasHScroll;
},hasVScrollbar:function(reset){
var _1760=this._hasVScroll||false;
if(this._hasVScroll==undefined||reset){
if(this.noscroll){
this._hasVScroll=false;
}else{
var style=html.style(this.scrollboxNode,"overflow");
if(style=="hidden"){
this._hasVScroll=false;
}else{
if(style=="scroll"){
this._hasVScroll=true;
}else{
this._hasVScroll=(this.scrollboxNode.scrollHeight>this.scrollboxNode.clientHeight);
}
}
}
}
if(_1760!==this._hasVScroll){
this.grid.update();
}
return this._hasVScroll;
},convertColPctToFixed:function(){
var _1761=false;
this.grid.initialWidth="";
var _1762=query("th",this.headerContentNode);
var _1763=array.map(_1762,function(c,vIdx){
var w=c.style.width;
html.attr(c,"vIdx",vIdx);
if(w&&w.slice(-1)=="%"){
_1761=true;
}else{
if(w&&w.slice(-2)=="px"){
return window.parseInt(w,10);
}
}
return html.contentBox(c).w;
});
if(_1761){
array.forEach(this.grid.layout.cells,function(cell,idx){
if(cell.view==this){
var _1764=cell.view.getHeaderCellNode(cell.index);
if(_1764&&html.hasAttr(_1764,"vIdx")){
var vIdx=window.parseInt(html.attr(_1764,"vIdx"));
this.setColWidth(idx,_1763[vIdx]);
html.removeAttr(_1764,"vIdx");
}
}
},this);
return true;
}
return false;
},adaptHeight:function(_1765){
if(!this.grid._autoHeight){
var h=(this.domNode.style.height&&parseInt(this.domNode.style.height.replace(/px/,""),10))||this.domNode.clientHeight;
var self=this;
var _1766=function(){
var v;
for(var i in self.grid.views.views){
v=self.grid.views.views[i];
if(v!==self&&v.hasHScrollbar()){
return true;
}
}
return false;
};
if(_1765||(this.noscroll&&_1766())){
h-=_173d.getScrollbar().h;
}
util.setStyleHeightPx(this.scrollboxNode,h);
}
this.hasVScrollbar(true);
},adaptWidth:function(){
if(this.flexCells){
this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth;
}
var w=this.scrollboxNode.offsetWidth-this.getScrollbarWidth();
if(!this._removingColumn){
w=Math.max(w,this.getColumnsWidth())+"px";
}else{
w=Math.min(w,this.getColumnsWidth())+"px";
this._removingColumn=false;
}
var cn=this.contentNode;
cn.style.width=w;
this.hasHScrollbar(true);
},setSize:function(w,h){
var ds=this.domNode.style;
var hs=this.headerNode.style;
if(w){
ds.width=w;
hs.width=w;
}
ds.height=(h>=0?h+"px":"");
},renderRow:function(_1767){
var _1768=this.createRowNode(_1767);
this.buildRow(_1767,_1768);
return _1768;
},createRowNode:function(_1769){
var node=document.createElement("div");
node.className=this.classTag+"Row";
if(this instanceof dojox.grid._RowSelector){
html.attr(node,"role","presentation");
}else{
html.attr(node,"role","row");
if(this.grid.selectionMode!="none"){
node.setAttribute("aria-selected","false");
}
}
node[util.gridViewTag]=this.id;
node[util.rowIndexTag]=_1769;
this.rowNodes[_1769]=node;
return node;
},buildRow:function(_176a,_176b){
this.buildRowContent(_176a,_176b);
this.styleRow(_176a,_176b);
},buildRowContent:function(_176c,_176d){
_176d.innerHTML=this.content.generateHtml(_176c,_176c);
if(this.flexCells&&this.contentWidth){
_176d.firstChild.style.width=this.contentWidth;
}
util.fire(this,"onAfterRow",[_176c,this.structure.cells,_176d]);
},rowRemoved:function(_176e){
if(_176e>=0){
this._cleanupRowWidgets(this.getRowNode(_176e));
}
this.grid.edit.save(this,_176e);
delete this.rowNodes[_176e];
},getRowNode:function(_176f){
return this.rowNodes[_176f];
},getCellNode:function(_1770,_1771){
var row=this.getRowNode(_1770);
if(row){
return this.content.getCellNode(row,_1771);
}
},getHeaderCellNode:function(_1772){
if(this.headerContentNode){
return this.header.getCellNode(this.headerContentNode,_1772);
}
},styleRow:function(_1773,_1774){
_1774._style=_1741(_1774);
this.styleRowNode(_1773,_1774);
},styleRowNode:function(_1775,_1776){
if(_1776){
this.doStyleRowNode(_1775,_1776);
}
},doStyleRowNode:function(_1777,_1778){
this.grid.styleRowNode(_1777,_1778);
},updateRow:function(_1779){
var _177a=this.getRowNode(_1779);
if(_177a){
_177a.style.height="";
this.buildRow(_1779,_177a);
}
return _177a;
},updateRowStyles:function(_177b){
this.styleRowNode(_177b,this.getRowNode(_177b));
},lastTop:0,firstScroll:0,_nativeScroll:false,doscroll:function(_177c){
if(has("ff")>=13){
this._nativeScroll=true;
}
var isLtr=this.grid.isLeftToRight();
if(this.firstScroll<2){
if((!isLtr&&this.firstScroll==1)||(isLtr&&this.firstScroll===0)){
var s=html.marginBox(this.headerNodeContainer);
if(has("ie")){
this.headerNodeContainer.style.width=s.w+this.getScrollbarWidth()+"px";
}else{
if(has("mozilla")){
this.headerNodeContainer.style.width=s.w-this.getScrollbarWidth()+"px";
this.scrollboxNode.scrollLeft=isLtr?this.scrollboxNode.clientWidth-this.scrollboxNode.scrollWidth:this.scrollboxNode.scrollWidth-this.scrollboxNode.clientWidth;
}
}
}
this.firstScroll++;
}
this.headerNode.scrollLeft=this.scrollboxNode.scrollLeft;
var top=this.scrollboxNode.scrollTop;
if(top!==this.lastTop){
this.grid.scrollTo(top);
}
this._nativeScroll=false;
},setScrollTop:function(inTop){
this.lastTop=inTop;
if(!this._nativeScroll){
this.scrollboxNode.scrollTop=inTop;
}
return this.scrollboxNode.scrollTop;
},doContentEvent:function(e){
if(this.content.decorateEvent(e)){
this.grid.onContentEvent(e);
}
},doHeaderEvent:function(e){
if(this.header.decorateEvent(e)){
this.grid.onHeaderEvent(e);
}
},dispatchContentEvent:function(e){
return this.content.dispatchEvent(e);
},dispatchHeaderEvent:function(e){
return this.header.dispatchEvent(e);
},setColWidth:function(_177d,_177e){
this.grid.setCellWidth(_177d,_177e+"px");
},update:function(){
if(!this.domNode){
return;
}
this.content.update();
this.grid.update();
var left=this.scrollboxNode.scrollLeft;
this.scrollboxNode.scrollLeft=left;
this.headerNode.scrollLeft=left;
}});
var _177f=_1737("dojox.grid._GridAvatar",_173f,{construct:function(){
var dd=win.doc;
var a=dd.createElement("table");
a.cellPadding=a.cellSpacing="0";
a.className="dojoxGridDndAvatar";
a.style.position="absolute";
a.style.zIndex=1999;
a.style.margin="0px";
var b=dd.createElement("tbody");
var tr=dd.createElement("tr");
var td=dd.createElement("td");
var img=dd.createElement("td");
tr.className="dojoxGridDndAvatarItem";
img.className="dojoxGridDndAvatarItemImage";
img.style.width="16px";
var _1780=this.manager.source,node;
if(_1780.creator){
node=_1780._normalizedCreator(_1780.getItem(this.manager.nodes[0].id).data,"avatar").node;
}else{
node=this.manager.nodes[0].cloneNode(true);
var table,tbody;
if(node.tagName.toLowerCase()=="tr"){
table=dd.createElement("table");
tbody=dd.createElement("tbody");
tbody.appendChild(node);
table.appendChild(tbody);
node=table;
}else{
if(node.tagName.toLowerCase()=="th"){
table=dd.createElement("table");
tbody=dd.createElement("tbody");
var r=dd.createElement("tr");
table.cellPadding=table.cellSpacing="0";
r.appendChild(node);
tbody.appendChild(r);
table.appendChild(tbody);
node=table;
}
}
}
node.id="";
td.appendChild(node);
tr.appendChild(img);
tr.appendChild(td);
html.style(tr,"opacity",0.9);
b.appendChild(tr);
a.appendChild(b);
this.node=a;
var m=_1740.manager();
this.oldOffsetY=m.OFFSET_Y;
m.OFFSET_Y=1;
},destroy:function(){
_1740.manager().OFFSET_Y=this.oldOffsetY;
this.inherited(arguments);
}});
var _1781=_1740.manager().makeAvatar;
_1740.manager().makeAvatar=function(){
var src=this.source;
if(src.viewIndex!==undefined&&!html.hasClass(win.body(),"dijit_a11y")){
return new _177f(this);
}
return _1781.call(_1740.manager());
};
return _1744;
});
},"davinci/ve/ObjectWidget":function(){
define(["dojo/_base/declare","dojo/dom-attr","./_Widget"],function(_1782,_1783,_1784){
return _1782("davinci.ve.ObjectWidget",_1784,{isObjectWidget:true,constructor:function(_1785,node,_1786,_1787,_1788){
if(typeof _1786==="string"){
_1783.set(node,"data-dojo-type",_1786);
if(_1788){
_1788.addAttribute("data-dojo-type",_1786);
}
}
},postCreate:function(){
var id=this._params.jsId,dj=require("davinci/ve/widget")._dojo(this.domNode),_1789;
if(id){
_1783.set(this.domNode,"jsId",id);
var type=this.getObjectType();
if(type){
var c=dj.getObject(type);
if(c){
if(c.markupFactory){
_1789=c.markupFactory(this._params,this.domNode,c);
}else{
if(c.prototype&&c.prototype.markupFactory){
_1789=c.prototype.markupFactory(this._params,this.domNode,c);
}else{
_1789=new c(this._params,this.domNode);
}
}
if(_1789){
_1789._edit_object_id=id;
dj.setObject(id,_1789);
}
}
}
}else{
id=this.getObjectId();
if(id){
_1789=dj.getObject(id);
if(_1789){
_1789._edit_object_id=id;
}
}
}
},getObjectType:function(){
var node=this.domNode;
return _1783.get(node,"data-dojo-type")||_1783.get(node,"dojoType");
},getObjectId:function(){
return _1783.get(this.domNode,"jsId");
},_getChildren:function(){
return [];
}});
});
},"*now":function(r){
r(["dojo/i18n!*preload*maq-metadata-shapes/shapes/nls/_ShapeHelper*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("maq-metadata-shapes/shapes/_ShapeHelper",["davinci/Runtime","davinci/Workbench","dojo/_base/connect","davinci/ve/tools/CreateTool","davinci/commands/CompoundCommand","davinci/ve/commands/ModifyCommand","davinci/ve/commands/StyleCommand","davinci/ve/widget"],function(_178a,_178b,_178c,_178d,_178e,_178f,_1790,_1791){
var _1792=function(){
};
_1792.prototype={_connects:[],_connectsDrag:[],_dragDivOffset:100,onShowSelection:function(obj){
if(!obj||!obj.widget||!obj.widget.dijitWidget||!obj.customDiv){
return true;
}
var _1793=6;
this._widget=obj.widget;
var _1794=obj.widget.dijitWidget;
var div=obj.customDiv;
var l,t;
div.innerHTML="";
var _1795=this.getDraggables();
var _1796=_1795.points;
this._removeNobs();
if(_1796){
this._dragNobs=[];
var _1797;
for(var i=0;i<_1796.length;i++){
l=_1796[i].x-_1793;
t=_1796[i].y-_1793;
this._dragNobs[i]=_1797=dojo.create("span",{className:"editFocusNob",style:{position:"absolute",display:"block",left:l+"px",top:t+"px"}},div);
_1797._shapeDraggable={point:i};
this._connects.push(_178c.connect(_1797,"mousedown",dojo.hitch(this,this.onMouseDown)));
}
}else{
this._dragNobs=null;
}
return false;
},onHideSelection:function(obj){
this._removeNobs();
this._removeDragConnects();
},onMouseDown:function(e){
this._connectsDrag.push(_178c.connect(document,"mousemove",dojo.hitch(this,this.onMouseMoveOut)));
this._connectsDrag.push(_178c.connect(document,"mouseout",dojo.hitch(this,this.onMouseMoveOut)));
this._connectsDrag.push(_178c.connect(document,"mouseup",dojo.hitch(this,this.onMouseUp)));
var _1798=_178a.currentEditor;
var _1799=(_1798.getContext&&_1798.getContext());
if(_1799){
var tool=(_1799.getActiveTool&&_1799.getActiveTool());
if(!tool){
return;
}
if(tool.isInstanceOf(davinci.ve.tools.CreateTool)){
var _179a=this._makeFakeEvent(e);
tool.onMouseDown(_179a);
return;
}
}
e.stopPropagation();
var _179b=this._widget.domNode;
this._origSpanPos=dojo.position(_179b,true);
var _179c=e.currentTarget;
this._dragging=_179c;
this._dragx=e.pageX;
this._dragy=e.pageY;
this._left=_179c.style.left;
this._top=_179c.style.top;
this._origLeft=_179b.style.left;
this._origTop=_179b.style.top;
this._origWidth=_179b.style.width;
this._origHeight=_179b.style.height;
var _179d=100;
var l=e.pageX-this._dragDivOffset;
var t=e.pageY-this._dragDivOffset;
var w=this._dragDivOffset+this._dragDivOffset;
var h=w;
if(davinci.Workbench._shapesDragDiv){
davinci.Workbench._shapesDragDiv.parentNode.removeChild(davinci.Workbench._shapesDragDiv);
}
davinci.Workbench._shapesDragDiv=dojo.create("div",{className:"shapesDragDiv",style:"left:"+l+"px;top:"+t+"px;width:"+w+"px;height:"+h+"px;"},document.body);
if(this.onMouseDown_Widget){
this.onMouseDown_Widget({handle:_179c,e:e});
}
},onMouseMoveOut:function(e){
if(this._dragging){
e.stopPropagation();
var x=e.pageX,y=e.pageY;
var dx=x-this._dragx;
var dy=y-this._dragy;
if(dx!=0||dy!=0){
davinci.Workbench._shapesDragDiv.style.left=(e.pageX-this._dragDivOffset)+"px";
davinci.Workbench._shapesDragDiv.style.top=(e.pageY-this._dragDivOffset)+"px";
this._dragx=x;
this._dragy=y;
var _179e=this._dragging;
var _179f=parseFloat(_179e.style.left);
var _17a0=parseFloat(_179e.style.top);
_179e.style.left=(_179f+dx)+"px";
_179e.style.top=(_17a0+dy)+"px";
if(this.onMouseMoveOut_Widget){
this.onMouseMoveOut_Widget({handle:_179e,dx:dx,dy:dy,pageX:x,pageY:y,e:e});
}
}
}
},onMouseUp:function(e){
var _17a1=_178a.currentEditor;
var _17a2=(_17a1.getContext&&_17a1.getContext());
if(_17a2){
var tool=(_17a2.getActiveTool&&_17a2.getActiveTool());
if(!tool){
return;
}
if(tool.isInstanceOf(davinci.ve.tools.CreateTool)){
var _17a3=this._makeFakeEvent(e);
tool.onMouseUp(_17a3);
return;
}
}
e.stopPropagation();
if(davinci.Workbench._shapesDragDiv){
davinci.Workbench._shapesDragDiv.parentNode.removeChild(davinci.Workbench._shapesDragDiv);
delete davinci.Workbench._shapesDragDiv;
}
this._removeDragConnects();
if(!this._dragging){
return;
}
this._dragging=null;
function _17a4(_17a5,_17a6){
var _17a7=dojo.style(_17a5,_17a6);
var _17a8=parseFloat(_17a7);
if(isNaN(_17a8)){
_17a8=0;
}
return _17a8;
};
var _17a9=this._widget;
var _17aa=_17a9.dijitWidget;
var _17a2=_17a9._edit_context;
var _17ab=_17a9.domNode;
var _17ac=_17a9.dijitWidget._svgroot;
var _17ad=dojo.style(_17ab,"position");
var _17ae=_17a4(_17ab,"left");
var _17af=_17a4(_17ab,"top");
var _17b0=_17a4(_17ab,"width");
var _17b1=_17a4(_17ab,"height");
var _17b2=_17a4(_17ac,"marginLeft");
var _17b3=_17a4(_17ac,"marginTop");
var left=(_17ae+_17b2)+"px";
var top=(_17af+_17b3)+"px";
var width=(_17b0+_17b2)+"px";
var _17b4=(_17b1+_17b3)+"px";
var _17b5=new _178e();
var _17b6=_17a9.getStyleValues();
_17b6.left=this._origLeft;
_17b6.top=this._origTop;
_17b6.width=this._origWidth;
_17b6.height=this._origHeight;
var props;
if(_17ad=="absolute"||_17ad=="fixed"){
props=[{left:left},{top:top},{width:width},{height:_17b4}];
}else{
props=[{width:width},{height:_17b4}];
}
_17b5.add(new _1790(_17a9,props));
if(this.onMouseUp_Widget){
this.onMouseUp_Widget(_17b5);
}
var w_id=_17a9.id;
_17a2.getCommandStack().execute(_17b5);
var _17b7=_1791.byId(w_id,_17a2.getDocument());
_17a2.select(_17b7);
},hideAllDraggablesExcept:function(index){
if(this._dragNobs){
for(var i=0;i<this._dragNobs.length;i++){
var _17b8=this._dragNobs[i];
_17b8.style.display=(i==index)?"block":"none";
}
}
},getDraggables:function(){
return {points:[]};
},_removeNobs:function(){
if(this._dragNobs){
for(var i=0;i<this._dragNobs.length;i++){
var _17b9=this._dragNobs[i];
if(_17b9.parentNode){
_17b9.parentNode.removeChild(_17b9);
}
}
this._dragNobs=null;
}
for(var i=0;i<this._connects.length;i++){
_178c.disconnect(this._connects[i]);
}
this._connects=[];
},_removeDragConnects:function(){
for(var i=0;i<this._connectsDrag.length;i++){
_178c.disconnect(this._connectsDrag[i]);
}
this._connectsDrag=[];
},_makeFakeEvent:function(e){
var _17ba=_178a.currentEditor;
var _17bb=(_17ba.getContext&&_17ba.getContext());
var _17bc={};
for(var prop in e){
_17bc[prop]=e[prop];
}
_17bc.target=_17bb.rootNode;
var _17bd=_17bb.getParentIframeBounds();
_17bc.pageX-=_17bd.l;
_17bc.pageY-=_17bd.t;
return _17bc;
}};
return _1792;
});
