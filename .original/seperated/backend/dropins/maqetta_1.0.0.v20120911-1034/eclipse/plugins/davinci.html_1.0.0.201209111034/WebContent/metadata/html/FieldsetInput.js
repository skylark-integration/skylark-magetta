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
define(["../main","dojo/_base/array","dojo/_base/lang","dojo/_base/json","dojo/_base/sniff","dojo/_base/declare","./_Grid","./DataSelection","dojo/_base/html"],function(_76,_77,_78,_79,has,_7a,_7b,_7c,_7d){
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
define(["dojo/_base/kernel","dojo/_base/lang","dojo/_base/sniff","dojo/ready","dojo/_base/unload","dojo/_base/window","dojo/dom-geometry"],function(_15e,lang,has,_15f,_160,_161,_162){
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
define(["dojo/_base/declare","./_View"],function(_42d,_42e){
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
define(["dojo/_base/kernel","../main","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/dom-geometry","./cells","./_RowSelector"],function(dojo,_493,_494,_495,lang,_496){
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
define(["../main","dojo/_base/lang","dojo/dom"],function(_526,lang,dom){
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
define(["dojo/_base/declare","dojo/_base/lang","dojo/dom-class"],function(_575,lang,_576){
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
define(["dojo/_base/array","dojo/_base/lang","dojo/_base/declare","dojo/_base/connect","dojo/_base/event","dojo/_base/sniff","dojo/query","./util","dojo/_base/html"],function(_5b9,lang,_5ba,_5bb,_5bc,has,_5bd,util,html){
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
define(["../main","dojo/_base/array","dojo/_base/lang","dojo/_base/window","dojo/_base/event","dojo/_base/sniff","dojo/_base/connect","dojo/dnd/Moveable","dojox/html/metrics","./util","dojo/_base/html"],function(_62c,_62d,lang,win,_62e,has,_62f,_630,_631,util,html){
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
define(["dojo/_base/lang","dojo/regexp","dojox/main"],function(lang,_7d2,_7d3){
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
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/_base/fx","dojo/dom-style","dojo/dom-class","dojo/dom-geometry","dijit/registry","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/BackgroundIframe","dojo/fx","dojo/has","dojo/_base/window","dojo/window"],function(_854,lang,_855,_856,_857,_858,_859,_85a,_85b,_85c,_85d,_85e,has,_85f,_860){
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
define(["dojo/_base/lang"],function(lang){
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
define(["dojo/_base/declare","./_SelectionPreserver","./Selection"],function(_916,_917,_918){
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
},"davinci/html/CSSProperty":function(){
define(["dojo/_base/declare","davinci/html/CSSElement"],function(_99a,_99b){
return _99a("davinci.html.CSSProperty",_99b,{constructor:function(name,_99c,_99d){
this.elementType="CSSProperty";
this.name=name||"";
this.value=_99c||"";
this.parent=_99d;
this.expanded=[];
this.lengthValues=[];
},getValue:function(){
return this.value;
},getText:function(_99e){
var s="";
if(this.comment&&!_99e.noComments){
s+="\n  "+this.comment.getText(_99e);
}
s+=this.name+" : "+this.value;
if(this.isNotImportant){
s+=" !important";
}
s+=";";
if(this.postComment&&!_99e.noComments){
s+=this.postComment.getText(_99e);
}
return s;
},getCSSRule:function(){
return this.parent;
},addProperty:function(name,_99f){
var _9a0=new CSSProperty(name,_99f,this);
this.properties.push(_9a0);
},getURL:function(){
if(this.url){
var path=new davinci.model.Path(this.getCSSFile().url);
path=path.getParentPath().append(this.url);
return path.toString();
}
}});
});
},"davinci/ve/commands/StyleCommand":function(){
define(["dojo/_base/declare","davinci/ve/widget","davinci/ve/utils/StyleArray"],function(_9a1,_9a2,_9a3){
return _9a1("davinci.ve.commands.StyleCommand",null,{name:"style",constructor:function(_9a4,_9a5,_9a6){
this._newValues=_9a5;
this._id=_9a4?_9a4.id:undefined;
this._applyToStateIndex=(!_9a6||_9a6=="Normal"||_9a6=="undefined")?"undefined":_9a6;
},add:function(_9a7){
if(!_9a7||_9a7._id!=this._id){
return;
}
if(_9a7._newValues){
dojo.mixin(this._newValues,_9a7._newValues);
}
},execute:function(){
if(!this._id||!this._newValues){
return;
}
var _9a8=require("davinci/ve/widget").byId(this._id);
if(!_9a8||!_9a8.domNode){
return;
}
var _9a9=require("davinci/ve/States");
var _9aa=_9a8.getStyleValuesAllStates();
this._oldStyleValuesAllStates=dojo.clone(_9aa);
if(_9aa[this._applyToStateIndex]){
_9aa[this._applyToStateIndex]=_9a3.mergeStyleArrays(_9aa[this._applyToStateIndex],this._newValues);
}else{
_9aa[this._applyToStateIndex]=this._newValues;
}
_9a8.setStyleValuesAllStates(_9aa);
var _9ab=_9a9.getStatesListCurrent(_9a8.domNode);
var _9ac=_9a3.mergeStyleArrays([],_9aa["undefined"]);
for(var i=0;i<_9ab.length;i++){
if(_9aa[_9ab[i]]){
_9ac=_9a3.mergeStyleArrays(_9ac,_9aa[_9ab[i]]);
}
}
_9a8.setStyleValuesCanvas(_9ac);
_9a8.setStyleValuesModel(_9aa["undefined"]);
_9a8.refresh();
_9a9.resetState(_9a8.domNode);
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[_9a8]]);
},undo:function(){
if(!this._id||!this._oldStyleValuesAllStates){
return;
}
var _9ad=require("davinci/ve/widget").byId(this._id);
if(!_9ad){
return;
}
var _9ae=require("davinci/ve/States");
var _9af=this._oldStyleValuesAllStates;
var _9b0=this._applyToStateIndex;
_9ad.setStyleValuesAllStates(_9af);
var _9b1=_9a3.mergeStyleArrays(_9af["undefined"],_9af[_9b0]);
_9ad.setStyleValuesCanvas(_9b1);
_9ad.setStyleValuesModel(this._oldStyleValuesAllStates["undefined"]);
_9ad.refresh();
require("davinci/ve/States").resetState(_9ad.domNode);
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[_9ad]]);
}});
});
},"url:davinci/review/widgets/templates/OpenReviewDialog.html":"<div class=\"fileDialog\">\n\t<div class=\"dijitDialogPaneContentArea folderContainer\">\n\t\t<div dojoType=\"dijit.layout.ContentPane\" dojoAttachPoint=\"treeContentPane\">\n\t\t</div>\n\t</div>\n\t\n\t<div class=\"dijitDialogPaneActionBar\">\n\t\t<button dojoType=\"dijit.form.Button\" dojoAttachPoint=\"okButton\" dojoAttachEvent=\"onClick:_okButton\" type=\"submit\" class=\"maqPrimaryButton\" disabled=\"disabled\">${finishButtonLabel}</button>\n\t\t<button dojoType=\"dijit.form.Button\" dojoAttachEvent=\"onClick:_cancelButton\" class=\"maqSecondaryButton\">${cancelButtonLabel}</button>\n\t</div>\n</div>\n","dijit/form/_DateTimeTextBox":function(){
define(["dojo/date","dojo/date/locale","dojo/date/stamp","dojo/_base/declare","dojo/_base/lang","./RangeBoundTextBox","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(date,_9b2,_9b3,_9b4,lang,_9b5,_9b6,_9b7){
new Date("X");
var _9b8=_9b4("dijit.form._DateTimeTextBox",[_9b5,_9b6],{templateString:_9b7,hasDownArrow:true,cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},pattern:_9b2.regexp,datePackage:"",postMixInProperties:function(){
this.inherited(arguments);
this._set("type","text");
},compare:function(val1,val2){
var _9b9=this._isInvalidDate(val1);
var _9ba=this._isInvalidDate(val2);
return _9b9?(_9ba?0:-1):(_9ba?1:date.compare(val1,val2,this._selector));
},forceWidth:true,format:function(_9bb,_9bc){
if(!_9bb){
return "";
}
return this.dateLocaleModule.format(_9bb,_9bc);
},"parse":function(_9bd,_9be){
return this.dateLocaleModule.parse(_9bd,_9be)||(this._isEmpty(_9bd)?null:undefined);
},serialize:function(val,_9bf){
if(val.toGregorian){
val=val.toGregorian();
}
return _9b3.toISOString(val,_9bf);
},dropDownDefaultValue:new Date(),value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(_9c0){
this.dateModule=_9c0.datePackage?lang.getObject(_9c0.datePackage,false):date;
this.dateClassObj=this.dateModule.Date||Date;
this.dateLocaleModule=_9c0.datePackage?lang.getObject(_9c0.datePackage+".locale",false):_9b2;
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
},_setConstraintsAttr:function(_9c1){
_9c1.selector=this._selector;
_9c1.fullYear=true;
var _9c2=_9b3.fromISOString;
if(typeof _9c1.min=="string"){
_9c1.min=_9c2(_9c1.min);
}
if(typeof _9c1.max=="string"){
_9c1.max=_9c2(_9c1.max);
}
this.inherited(arguments);
},_isInvalidDate:function(_9c3){
return !_9c3||isNaN(_9c3)||typeof _9c3!="object"||_9c3.toString()==this._invalidDate;
},_setValueAttr:function(_9c4,_9c5,_9c6){
if(_9c4!==undefined){
if(typeof _9c4=="string"){
_9c4=_9b3.fromISOString(_9c4);
}
if(this._isInvalidDate(_9c4)){
_9c4=null;
}
if(_9c4 instanceof Date&&!(this.dateClassObj instanceof Date)){
_9c4=new this.dateClassObj(_9c4);
}
}
this.inherited(arguments);
if(this.value instanceof Date){
this.filterString="";
}
if(this.dropDown){
this.dropDown.set("value",_9c4,false);
}
},_set:function(attr,_9c7){
if(attr=="value"&&this.value instanceof Date&&this.compare(_9c7,this.value)==0){
return;
}
this.inherited(arguments);
},_setDropDownDefaultValueAttr:function(val){
if(this._isInvalidDate(val)){
val=new this.dateClassObj();
}
this.dropDownDefaultValue=val;
},openDropDown:function(_9c8){
if(this.dropDown){
this.dropDown.destroy();
}
var _9c9=lang.isString(this.popupClass)?lang.getObject(this.popupClass,false):this.popupClass,_9ca=this,_9cb=this.get("value");
this.dropDown=new _9c9({onChange:function(_9cc){
_9ca.set("value",_9cc,true);
},id:this.id+"_popup",dir:_9ca.dir,lang:_9ca.lang,value:_9cb,currentFocus:!this._isInvalidDate(_9cb)?_9cb:this.dropDownDefaultValue,constraints:_9ca.constraints,filterString:_9ca.filterString,datePackage:_9ca.params.datePackage,isDisabledDate:function(date){
return !_9ca.rangeCheck(date,_9ca.constraints);
}});
this.inherited(arguments);
},_getDisplayedValueAttr:function(){
return this.textbox.value;
},_setDisplayedValueAttr:function(_9cd,_9ce){
this._setValueAttr(this.parse(_9cd,this.constraints),_9ce,_9cd);
}});
return _9b8;
});
},"dijit/layout/StackContainer":function(){
define(["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/has","dojo/_base/lang","dojo/ready","dojo/topic","../registry","../_WidgetBase","./_LayoutWidget","dojo/i18n!../nls/common"],function(_9cf,_9d0,_9d1,_9d2,has,lang,_9d3,_9d4,_9d5,_9d6,_9d7){
if(has("dijit-legacy-requires")){
_9d3(0,function(){
var _9d8=["dijit/layout/StackController"];
require(_9d8);
});
}
var _9d9=_9d1("dijit.layout.StackContainer",_9d7,{doLayout:true,persist:false,baseClass:"dijitStackContainer",buildRendering:function(){
this.inherited(arguments);
_9d2.add(this.domNode,"dijitLayoutContainer");
this.containerNode.setAttribute("role","tabpanel");
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onkeypress",this._onKeyPress);
},startup:function(){
if(this._started){
return;
}
var _9da=this.getChildren();
_9cf.forEach(_9da,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=_9d5.byId(_9d0(this.id+"_selectedChild"));
}else{
_9cf.some(_9da,function(_9db){
if(_9db.selected){
this.selectedChildWidget=_9db;
}
return _9db.selected;
},this);
}
var _9dc=this.selectedChildWidget;
if(!_9dc&&_9da[0]){
_9dc=this.selectedChildWidget=_9da[0];
_9dc.selected=true;
}
_9d4.publish(this.id+"-startup",{children:_9da,selected:_9dc});
this.inherited(arguments);
},resize:function(){
if(!this._hasBeenShown){
this._hasBeenShown=true;
var _9dd=this.selectedChildWidget;
if(_9dd){
this._showChild(_9dd);
}
}
this.inherited(arguments);
},_setupChild:function(_9de){
this.inherited(arguments);
_9d2.replace(_9de.domNode,"dijitHidden","dijitVisible");
_9de.domNode.title="";
},addChild:function(_9df,_9e0){
this.inherited(arguments);
if(this._started){
_9d4.publish(this.id+"-addChild",_9df,_9e0);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_9df);
}
}
},removeChild:function(page){
this.inherited(arguments);
if(this._started){
_9d4.publish(this.id+"-removeChild",page);
}
if(this._descendantsBeingDestroyed){
return;
}
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this._started){
var _9e1=this.getChildren();
if(_9e1.length){
this.selectChild(_9e1[0]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(page,_9e2){
page=_9d5.byId(page);
if(this.selectedChildWidget!=page){
var d=this._transition(page,this.selectedChildWidget,_9e2);
this._set("selectedChildWidget",page);
_9d4.publish(this.id+"-selectChild",page);
if(this.persist){
_9d0(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
return d;
},_transition:function(_9e3,_9e4){
if(_9e4){
this._hideChild(_9e4);
}
var d=this._showChild(_9e3);
if(_9e3.resize){
if(this.doLayout){
_9e3.resize(this._containerContentBox||this._contentBox);
}else{
_9e3.resize();
}
}
return d;
},_adjacent:function(_9e5){
var _9e6=this.getChildren();
var _9e7=_9cf.indexOf(_9e6,this.selectedChildWidget);
_9e7+=_9e5?1:_9e6.length-1;
return _9e6[_9e7%_9e6.length];
},forward:function(){
return this.selectChild(this._adjacent(true),true);
},back:function(){
return this.selectChild(this._adjacent(false),true);
},_onKeyPress:function(e){
_9d4.publish(this.id+"-containerKeyPress",{e:e,page:this});
},layout:function(){
var _9e8=this.selectedChildWidget;
if(_9e8&&_9e8.resize){
if(this.doLayout){
_9e8.resize(this._containerContentBox||this._contentBox);
}else{
_9e8.resize();
}
}
},_showChild:function(page){
var _9e9=this.getChildren();
page.isFirstChild=(page==_9e9[0]);
page.isLastChild=(page==_9e9[_9e9.length-1]);
page._set("selected",true);
_9d2.replace(page.domNode,"dijitVisible","dijitHidden");
return (page._onShow&&page._onShow())||true;
},_hideChild:function(page){
page._set("selected",false);
_9d2.replace(page.domNode,"dijitHidden","dijitVisible");
page.onHide&&page.onHide();
},closeChild:function(page){
var _9ea=page.onClose(this,page);
if(_9ea){
this.removeChild(page);
page.destroyRecursive();
}
},destroyDescendants:function(_9eb){
this._descendantsBeingDestroyed=true;
this.selectedChildWidget=undefined;
_9cf.forEach(this.getChildren(),function(_9ec){
if(!_9eb){
this.removeChild(_9ec);
}
_9ec.destroyRecursive(_9eb);
},this);
this._descendantsBeingDestroyed=false;
}});
_9d9.ChildWidgetProperties={selected:false,disabled:false,closable:false,iconClass:"dijitNoIcon",showTitle:true};
lang.extend(_9d6,_9d9.ChildWidgetProperties);
return _9d9;
});
},"dijit/form/_RadioButtonMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/_base/event","dojo/_base/lang","dojo/query","../registry"],function(_9ed,_9ee,_9ef,_9f0,lang,_9f1,_9f2){
return _9ee("dijit.form._RadioButtonMixin",null,{type:"radio",_getRelatedWidgets:function(){
var ary=[];
_9f1("input[type=radio]",this.focusNode.form||this.ownerDocument).forEach(lang.hitch(this,function(_9f3){
if(_9f3.name==this.name&&_9f3.form==this.focusNode.form){
var _9f4=_9f2.getEnclosingWidget(_9f3);
if(_9f4){
ary.push(_9f4);
}
}
}));
return ary;
},_setCheckedAttr:function(_9f5){
this.inherited(arguments);
if(!this._created){
return;
}
if(_9f5){
_9ed.forEach(this._getRelatedWidgets(),lang.hitch(this,function(_9f6){
if(_9f6!=this&&_9f6.checked){
_9f6.set("checked",false);
}
}));
}
},_getSubmitValue:function(_9f7){
return _9f7===null?"on":_9f7;
},_onClick:function(e){
if(this.checked||this.disabled){
_9f0.stop(e);
return false;
}
if(this.readOnly){
_9f0.stop(e);
_9ed.forEach(this._getRelatedWidgets(),lang.hitch(this,function(_9f8){
_9ef.set(this.focusNode||this.domNode,"checked",_9f8.checked);
}));
return false;
}
return this.inherited(arguments);
}});
});
},"davinci/html/PHPBlock":function(){
define(["dojo/_base/declare","davinci/html/HTMLItem"],function(_9f9,_9fa){
return _9f9("davinci.html.PHPBlock",_9fa,{constructor:function(_9fb){
this.elementType="PHPBlock";
this.value=_9fb||"";
},getText:function(_9fc){
return _9fc.excludeIgnoredContent?"":this.value;
}});
});
},"davinci/ve/themeEditor/metadata/CSSThemeProvider":function(){
define(["dojo/_base/declare","davinci/ve/utils/URLRewrite"],function(_9fd,_9fe){
return _9fd("davinci.ve.themeEditor.metadata.CSSThemeProvider",null,{module:"davinci.lib",path:"theme/tundra.json",constructor:function(_9ff,_a00){
this._theme=_a00;
this.url=_9fe.encodeURI(_9ff[0].getURL());
this.getWidgets();
},getWidgets:function(){
if(!this._widgets){
var _a01=undefined;
dojo.xhrGet({url:""+this.url,handleAs:"json",sync:true,load:function(_a02){
_a01=_a02;
}});
this._widgets=_a01;
this._createDefaults();
}
return this._widgets;
},_createDefaults:function(){
var ret=true;
for(var a in this._widgets){
var _a03=this._widgets[a];
for(var b in _a03){
var _a04=_a03[b];
for(var c in _a04.states){
var _a05=_a04.states[c];
var _a06=this.getStyleSelectors(a+"."+b,c);
}
for(var sw in _a04.subwidgets){
var _a07=_a04.subwidgets[sw];
for(var c in _a07.states){
var _a05=_a07.states[c];
var _a06=this.getStyleSelectors(a+"."+b,c,sw);
}
}
}
}
return;
},getRelativeStyleSelectorsText:function(_a08,_a09,_a0a,_a0b,_a0c){
var _a0d=this.getStyleSelectors(_a08,_a09,_a0a);
var _a0e=new Array();
for(s in _a0d){
_a0b.forEach(function(_a0f){
var _a10=false;
for(var p=0;!_a10&&p<_a0d[s].length;p++){
if(_a0d[s][p]==_a0f||_a0d[s][p]=="$std_10"){
_a10=true;
}
}
if(_a10){
var text=""+s;
var _a11=text.split(" ");
text="";
_a11.forEach(function(c){
if(c!="."+_a0c){
text+=" "+c;
}
}.bind(this));
_a0e.push(text.replace(/^\s*/,"").replace(/\s*$/,""));
return;
}
}.bind(this));
}
return _a0e;
},getStyleSelectors:function(_a12,_a13,_a14){
if(!_a12){
return;
}
if(!_a13){
_a13="Normal";
}
var _a15;
var p=_a12.split(".");
var w=p[0];
var n=p[p.length-1];
if(_a14&&(w in this._widgets)&&(n in this._widgets[w])){
var sw=(_a14.id)?_a14.id:_a14;
if(!this._widgets[w][n].subwidgets[""+sw].states[""+_a13]){
return null;
}
_a15=this._widgets[w][n].subwidgets[""+sw].states[""+_a13].selectors;
if(!_a15||_a15=="$auto"){
_a15=this._createDefaultSelectors(""+w+sw,_a13);
this._widgets[w][n].subwidgets[""+sw].states[""+_a13].selectors=_a15;
}
}else{
if(this._widgets&&(w in this._widgets)&&(n in this._widgets[w])){
if(this._widgets[w][n].states[""+_a13]){
_a15=this._widgets[w][n].states[""+_a13].selectors;
if(!_a15||_a15=="$auto"){
_a15=this._createDefaultSelectors(""+w+n,_a13);
this._widgets[w][n].states[""+_a13].selectors=_a15;
}
}
}else{
}
}
return _a15;
},getElementStyleProperties:function(_a16,_a17,_a18){
if(!_a16){
return;
}
if(!_a17){
_a17="Normal";
}
var _a19;
var p=_a16.split(".");
var w=p[0];
var n=p[p.length-1];
if(_a18&&(w in this._widgets)&&(n in this._widgets[w])){
var sw=(_a18.id)?_a18.id:_a18;
if(!(this._widgets[w][n].subwidgets[""+sw].states[""+_a17])||!(this._widgets[w][n].subwidgets[""+sw].states[""+_a17].element)||!(this._widgets[w][n].subwidgets[""+sw].states[""+_a17].element.style)){
return null;
}
_a19=this._widgets[w][n].subwidgets[""+sw].states[""+_a17].element.style;
}else{
if(this._widgets&&(w in this._widgets)&&(n in this._widgets[w])){
if(this._widgets[w][n].states[""+_a17]&&this._widgets[w][n].states[""+_a17].element&&this._widgets[w][n].states[""+_a17].element.style){
_a19=this._widgets[w][n].states[""+_a17].element.style;
}
}else{
}
}
return _a19;
},_createDefaultSelectors:function(_a1a,_a1b){
var _a1c;
if(_a1b=="Normal"){
_a1c="."+this._theme.className+" ."+_a1a;
}else{
_a1c="."+this._theme.className+" ."+_a1a+_a1b;
}
var _a1d=new Object();
_a1d[_a1c]=["$std_10"];
return _a1d;
},_createDefaultQuery:function(_a1e,_a1f){
var _a20;
_a20="."+_a1e;
return _a20;
},_simulateState:function(q,s,mode,_a21){
var _a22=[];
if(!(q instanceof Array)){
_a22.push(q);
}else{
_a22=q;
}
var _a23=[];
if(!(s instanceof Array)){
_a23.push(s);
}else{
_a23=s;
}
for(var i=0;i<_a23.length;i++){
var _a24=_a23[i];
var _a25=_a22[i];
var _a26;
var _a27;
var _a28;
if((_a26=_a24.indexOf(":"))>-1){
_a27=_a24.substring(_a26+1);
_a24=_a24.substring(0,_a26);
_a26=_a27.indexOf("=");
if(_a26>-1){
_a28=_a27.substring(_a26+1);
_a27=_a27.substring(0,_a26);
}else{
_a28=_a27;
}
}
var _a29=dojo.query(_a25,_a21.domNode);
var n=_a29[0];
if(!n){
n=_a21.domNode;
}
try{
if(mode=="add"){
if(_a27){
n.setAttribute(_a27,_a28);
}
if(_a24){
dojo.addClass(n,_a24);
}
}else{
if(_a27){
n.removeAttribute(_a27);
}
if(_a24){
dojo.removeClass(n,_a24);
}
}
}
catch(e){
console.error("CSSThemeProvider._simulateState invalid simulate in metadata for "+_a21.type+" "+q+": "+s);
}
}
},_updateStyle:function(_a2a,_a2b,_a2c,mode){
if(_a2a.id==="all"){
return;
}
var init=false;
if(!_a2c){
_a2c="Normal";
init=true;
}
if(!this._widgets){
return null;
}
if(!_a2b){
_a2b=_a2a.type;
}
var p=_a2b.split(".");
var w=p[0];
var n=p[p.length-1];
var _a2d;
var _a2e;
var _a2f=this._widgets[w][n];
if(_a2c==="Normal"&&init==true&&mode==="remove"&&this._widgets[w][n].startState){
_a2c=this._widgets[w][n].startState;
}
if(this._widgets[w][n].states[""+_a2c]){
var q=this._widgets[w][n].states[""+_a2c].query;
if(!q||q=="$auto"){
q=this._createDefaultQuery(w+n,_a2c);
_a2f.states[""+_a2c].query=q;
}
var s=this._widgets[w][n].states[""+_a2c].simulate;
if(!s){
s=" ";
var _a30=this.getStyleSelectors(_a2b,_a2c);
var _a31="";
for(var _a32 in _a30){
_a31=_a32.replace(/\./g,"");
_a31=_a31.replace(this._theme.className,"");
s=s+" "+_a31;
}
if(_a2c!="Normal"){
s=w+_a2c+" "+s;
}
}
if(_a2c!="Normal"){
this._simulateState(q,s,mode,_a2a);
}
}
for(var sub in _a2f.subwidgets){
var _a33=_a2f.subwidgets[sub];
if(_a2c==="Normal"&&init==true&&mode==="remove"&&_a33.startState){
_a2c=_a33.startState;
}
if(_a33.states[""+_a2c]){
var q=_a33.states[""+_a2c].query;
var s=_a33.states[""+_a2c].simulate;
if(!q||q=="$auto"){
q=this._createDefaultQuery(w+sub,_a2c);
_a33.states[""+_a2c].query=q;
}
if(!s){
var _a30=this.getStyleSelectors(_a2b,_a2c,sub);
var _a31="";
s=" ";
for(var _a32 in _a30){
_a31=_a32.replace(/\./g,"");
_a31=_a31.replace(this._theme.className,"");
s=s+" "+_a31;
}
if(_a2c!="Normal"){
s=w+_a2c+" "+s;
}
}
if(_a2c!="Normal"){
this._simulateState(q,s,mode,_a2a);
}
}
}
return;
},setStyleValues:function(node,_a34,_a35,_a36){
this._updateStyle(node,_a34,_a35,"add");
},removeStyleValues:function(node,_a37,_a38,_a39){
if(_a38&&_a38!="Normal"){
this._updateStyle(node,_a37,_a38,"remove");
}
},setWidgetStyleValues:function(node,_a3a){
var _a3b=davinci.ve.widget.getWidget(node);
this._updateStyle(node,null,_a3a,"add");
},removeWidgetStyleValues:function(node,_a3c){
this._updateStyle(node,null,_a3c,"remove");
},getDomNode:function(node,_a3d,_a3e,_a3f){
if(!this._widgets){
return null;
}
if(!_a3f){
_a3f="Normal";
}
var p=_a3d.split(".");
var w=p[0];
var n=p[p.length-1];
var _a40;
try{
if(_a3e){
_a40=this._widgets[w][n].subwidgets[""+_a3e].states[""+_a3f].query;
if(!_a40||_a40=="$auto"){
_a40=this._createDefaultQuery(w+_a3e,_a3f);
this._widgets[w][n].subwidgets[""+_a3e].states[""+_a3f].query=_a40;
}
}else{
_a40=this._widgets[w][n].states[""+_a3f].query;
if(!_a40||_a40=="$auto"){
_a40=this._createDefaultQuery(w+n,_a3f);
this._widgets[w][n].states[""+_a3f].query=_a40;
}
}
}
catch(e){
return null;
}
var q;
if(_a40 instanceof Array){
q=_a40[0];
}else{
q=_a40;
}
var _a41=dojo.query(q,node);
var n=_a41[0];
if(!n){
n=node;
}
return n;
},getMetadata:function(_a42){
if(!_a42){
return undefined;
}
var p=_a42.split(".");
var w=p[0];
var n=p[p.length-1];
var s=this._widgets&&this._widgets[w]&&this._widgets[w][n];
return s;
},getWidgetType:function(_a43){
var _a44;
_a44=_a43.type;
var id=_a43.id;
if(id.indexOf("all")===0){
_a44=_a44+".$"+id;
}
return _a44;
},isPropertyVaildForWidgetRule:function(rule,_a45,_a46,_a47,_a48){
var _a49=this.getWidgetType(_a46);
var _a4a=this.getMetadata(_a49);
if(_a47){
_a4a=_a4a.subwidgets[_a47];
}
if(_a48){
_a4a=_a4a.states[_a48];
}else{
_a4a=_a4a.states["Normal"];
}
var _a4b=rule.getSelectorText();
for(var _a4c in _a4a.selectors){
var _a4d=_a4a.selectors[_a4c];
if(_a4b==_a4c){
for(var i=0;i<_a4d.length;i++){
var prop=_a4d[i];
if(prop=="$std_10"||prop==_a45){
return true;
}
}
}
}
return false;
},isPropertyRuleValid:function(rule,_a4e,_a4f){
var _a50=rule.getSelectorText();
for(var c in _a4f.states){
var _a51=_a4f.states[c];
for(var _a52 in _a51.selectors){
var _a53=_a51.selectors[_a52];
if(_a50==_a52){
for(var i=0;i<_a53.length;i++){
var prop=_a53[i];
if(prop=="$std_10"||prop==_a4e){
return true;
}
}
}
}
}
for(var sw in _a4f.subwidgets){
var _a54=_a4f.subwidgets[sw];
for(var c in _a54.states){
var _a51=_a54.states[c];
for(var _a52 in _a51.selectors){
var _a53=_a51.selectors[_a52];
if(_a50==_a52){
for(var i=0;i<_a53.length;i++){
var prop=_a53[i];
if(prop=="$std_10"||prop==_a4e){
return true;
}
}
}
}
}
}
return false;
function _a55(rule,_a56){
for(var i=0;i<rule.selectors.length;i++){
var _a57=rule.selectors[i].getText();
if(_a57==_a56){
return true;
}
}
return false;
};
},isPropertyValidForRule:function(rule,_a58){
var ret=false;
var _a59=rule.getSelectorText();
for(var a in this._widgets){
var _a5a=this._widgets[a];
for(var b in _a5a){
var _a5b=_a5a[b];
if(this.isPropertyRuleValid(rule,_a58,_a5b)){
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
var _a5c=this._widgets[a];
for(var b in _a5c){
if(b.indexOf("$all")!=0){
var _a5d=_a5c[b];
for(var c in _a5d.states){
states[c]=c;
}
for(var sw in _a5d.subwidgets){
var _a5e=_a5d.subwidgets[sw];
for(var c in _a5e.states){
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
},isStateValid:function(_a5f,_a60,subW){
if(!this._widgets){
return false;
}
if(_a5f.id==="all"&&_a60!="Normal"){
return false;
}
var _a61=_a5f.type;
var _a62=this.getMetadata(_a61);
if(_a62.states[_a60]&&!subW){
return true;
}
if(!subW){
for(var sw in _a62.subwidgets){
var _a63=_a62.subwidgets[sw];
if(_a63.states[_a60]){
return true;
}
}
}else{
var _a63=_a62.subwidgets[subW];
if(_a63&&_a63.states[_a60]){
return true;
}
}
return false;
}});
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\"\n\t   data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","url:davinci/ui/templates/SelectProjectDialog.html":"<div>\r\n\t<div class=\"dijitDialogPaneContentArea\">\r\n\t\t<div>${uiNLS.currentProject} <span data-dojo-attach-point=\"currentProjectName\" style=\"font-weight: bold\"></span></div>\r\n\t\t<div style=\"margin-top: 10px;\">${uiNLS.selectProject}</div>\r\n\t\t<div data-dojo-type=\"davinci.ui.widgets.ProjectSelection\" data-dojo-attach-point=\"projectSelection\" data-dojo-attach-event=\"onChange:_onChange\"></div>\r\n\t</div>\t\r\n\t<div class=\"dijitDialogPaneActionBar\">\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"_okButton\" dojoAttachEvent='onClick:okButton' label='${uiNLS.open}' class=\"maqPrimaryButton\" disabled=\"true\" type=\"submit\"></button>\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:cancelButton' label='${uiNLS.cancelButtonLabel}' class=\"maqSecondaryButton\"></button>\r\n\t</div>\r\n</div>","davinci/UserActivityMonitor":function(){
define(["dojo/i18n!./nls/webContent"],function(_a64){
var _a65={subscriptions:[],subscribe:function(_a66,func){
this.subscriptions.push(dojo.subscribe(_a66,this,func));
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
var _a67=[dojo.connect(doc.documentElement,"keydown",this,"userActivity"),dojo.connect(doc.documentElement,"mousedown",this,"userActivity")];
return _a67;
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
var _a68=dojo.xhrGet({url:"cmd/keepalive",sync:false,handleAs:"json",});
_a68.then(function(_a69){
if(_a69.MaxInactiveInterval){
this._MaxInactiveInterval=_a69.MaxInactiveInterval;
if(this._firstPoll){
delete this._firstPoll;
this.userActivity(null);
}
}else{
console.warn("Unknown error: result="+_a69);
}
}.bind(this),function(_a6a){
console.warn("MaxInactiveInterval error",_a6a);
});
},lastServerConnection:function(_a6b,_a6c){
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
var _a6d=30;
var app=dojo.byId("davinci_app");
var _a6e=dojo.doc.createElement("div");
_a6e.id="org.maqetta.idleWarning";
app.appendChild(_a6e);
_a6e.setAttribute("class","idleWarning");
_a6e.innerHTML=dojo.string.substitute(_a64.idleSessionMessage,{seconds:_a6d});
this.countdown=window.setInterval(function(){
if(--_a6d===0){
window.clearInterval(this.countdown);
delete this.countdown;
this._runtime.logoff();
}else{
var span=dojo.byId("org.maqetta.idleWarning");
span.innerHTML=dojo.string.substitute(_a64.idleSessionMessage,{seconds:_a6d});
}
}.bind(this),1000);
},resetIdle:function(e){
window.clearInterval(this.countdown);
delete this.countdown;
var _a6f=dojo.byId("org.maqetta.idleWarning");
_a6f.parentNode.removeChild(_a6f);
this.userActivity();
}};
return _a65;
});
},"davinci/ve/commands/AddCommand":function(){
define(["dojo/_base/declare","davinci/ve/widget","davinci/ve/utils/ImageUtils","davinci/ve/States"],function(_a70,_a71,_a72,_a73){
return _a70("davinci.ve.commands.AddCommand",null,{name:"add",constructor:function(_a74,_a75,_a76){
if(_a74){
if(_a74.domNode){
this._id=_a74.id;
}else{
this._data=_a74;
}
}
this._parentId=_a75.id;
this._index=_a76;
},execute:function(){
var _a77=_a71.byId(this._parentId);
if(!_a77){
return;
}
var _a78=_a77.getContext();
var _a79=undefined;
if(this._data){
if(this._id&&this._data.properties){
this._data.properties.id=this._id;
}
_a79=_a71.createWidget(this._data);
this._id=_a79.id;
}else{
if(this._id){
_a79=_a71.byId(this._id,_a78);
}
}
if(!_a79){
return;
}
this._data=_a79.getData();
this._data.properties.id=this._id;
this._data.context=_a78;
if(this._index&&typeof this._index!="number"){
if(this._index.domNode){
this._index=_a77.indexOf(this._index);
}else{
var w=_a71.byId(this._index.id,_a78);
this._index=_a77.indexOf(w);
}
}
if(_a79.domNode.tagName==="IMG"){
_a72.ImageUpdateFocus(_a79,_a78);
}
_a77.addChild(_a79,this._index);
if(_a78){
_a78.attach(_a79);
_a79.startup();
_a79.renderWidget();
_a78.widgetAddedOrDeleted();
_a78.widgetChanged(_a78.WIDGET_ADDED,_a79);
}
_a73.resetState(_a79.domNode);
},undo:function(){
if(!this._id||!this._parentId){
return;
}
var _a7a=_a71.byId(this._id);
if(!_a7a){
return;
}
var _a7b=_a71.byId(this._parentId);
if(!_a7b){
return;
}
var _a7c=_a7a.getContext();
if(_a7c){
_a7c.detach(_a7a);
_a7c.deselect(_a7a);
}
_a7b.removeChild(_a7a);
_a7c.widgetChanged(_a7c.WIDGET_REMOVED,_a7a);
_a7a.destroyWidget();
if(_a7c){
_a7c.widgetAddedOrDeleted();
}
_a73.resetState(_a7a.domNode);
}});
});
},"dojox/main":function(){
define(["dojo/_base/kernel"],function(dojo){
return dojo.dojox;
});
},"dojo/dnd/Selector":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/kernel","../_base/lang","../dom","../dom-construct","../mouse","../_base/NodeList","../on","../touch","./common","./Container"],function(_a7d,_a7e,_a7f,_a80,lang,dom,_a81,_a82,_a83,on,_a84,dnd,_a85){
var _a86=_a7e("dojo.dnd.Selector",_a85,{constructor:function(node,_a87){
if(!_a87){
_a87={};
}
this.singular=_a87.singular;
this.autoSync=_a87.autoSync;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(on(this.node,_a84.press,lang.hitch(this,"onMouseDown")),on(this.node,_a84.release,lang.hitch(this,"onMouseUp")));
},singular:false,getSelectedNodes:function(){
var t=new _a83();
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
_a81.destroy(n);
}
this.anchor=null;
this.selection={};
return this;
},forInSelectedItems:function(f,o){
o=o||_a80.global;
var s=this.selection,e=dnd._empty;
for(var i in s){
if(i in e){
continue;
}
f.call(o,this.getItem(i),i,this);
}
},sync:function(){
_a86.superclass.sync.call(this);
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
_a7d.forEach(t,function(i){
delete this.selection[i];
},this);
return this;
},insertNodes:function(_a88,data,_a89,_a8a){
var _a8b=this._normalizedCreator;
this._normalizedCreator=function(item,hint){
var t=_a8b.call(this,item,hint);
if(_a88){
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
_a86.superclass.insertNodes.call(this,data,_a89,_a8a);
this._normalizedCreator=_a8b;
return this;
},destroy:function(){
_a86.superclass.destroy.call(this);
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
if(_a82.isLeft(e)){
_a7f.stop(e);
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
_a7f.stop(e);
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
this.onmousemoveEvent=on(this.node,_a84.move,lang.hitch(this,"onMouseMove"));
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
return _a86;
});
},"url:dijit/templates/Calendar.html":"<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" aria-labelledby=\"${id}_mddb ${id}_year\">\n\t<thead>\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"decrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"/>\n\t\t\t\t<span data-dojo-attach-point=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t\t</th>\n\t\t\t<th class='dijitReset' colspan=\"5\">\n\t\t\t\t<div data-dojo-attach-point=\"monthNode\">\n\t\t\t\t</div>\n\t\t\t</th>\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"incrementMonth\">\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"/>\n\t\t\t\t<span data-dojo-attach-point=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr role=\"row\">\n\t\t\t${!dayCellsHtml}\n\t\t</tr>\n\t</thead>\n\t<tbody data-dojo-attach-point=\"dateRowsNode\" data-dojo-attach-event=\"onclick: _onDayClick\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t\t${!dateRowsHtml}\n\t</tbody>\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\">\n\t\t<tr>\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\" role=\"presentation\">\n\t\t\t\t<div class=\"dijitCalendarYearLabel\">\n\t\t\t\t\t<span data-dojo-attach-point=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\" role=\"button\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" role=\"button\" id=\"${id}_year\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\" role=\"button\"></span>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\n","url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode,innerDiv,tabContent\" class=\"dijitTabInner dijitTabContent\">\n\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitTabButtonIcon\" data-dojo-attach-point='iconNode'/>\n\t<span data-dojo-attach-point='containerNode,focusNode' class='tabLabel'></span>\n\t<span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t  role=\"presentation\">\n\t\t<span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t\t\t></span>\n</div>\n","dojox/grid/_Scroller":function(){
define(["dijit/registry","dojo/_base/declare","dojo/_base/lang","./util","dojo/_base/html"],function(_a8c,_a8d,lang,util,html){
var _a8e=function(_a8f){
var i=0,n,p=_a8f.parentNode;
while((n=p.childNodes[i++])){
if(n==_a8f){
return i-1;
}
}
return -1;
};
var _a90=function(_a91){
if(!_a91){
return;
}
dojo.forEach(_a8c.toArray(),function(w){
if(w.domNode&&html.isDescendant(w.domNode,_a91,true)){
w.destroy();
}
});
};
var _a92=function(_a93){
var node=html.byId(_a93);
return (node&&node.tagName?node.tagName.toLowerCase():"");
};
var _a94=function(_a95,_a96){
var _a97=[];
var i=0,n;
while((n=_a95.childNodes[i])){
i++;
if(_a92(n)==_a96){
_a97.push(n);
}
}
return _a97;
};
var _a98=function(_a99){
return _a94(_a99,"div");
};
return _a8d("dojox.grid._Scroller",null,{constructor:function(_a9a){
this.setContentNodes(_a9a);
this.pageHeights=[];
this.pageNodes=[];
this.stack=[];
},rowCount:0,defaultRowHeight:32,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,averageRowHeight:0,page:0,pageTop:0,init:function(_a9b,_a9c,_a9d){
switch(arguments.length){
case 3:
this.rowsPerPage=_a9d;
case 2:
this.keepRows=_a9c;
case 1:
this.rowCount=_a9b;
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
},_getPageCount:function(_a9e,_a9f){
return _a9e?(Math.ceil(_a9e/_a9f)||1):0;
},destroy:function(){
this.invalidateNodes();
delete this.contentNodes;
delete this.contentNode;
delete this.scrollboxNode;
},setKeepInfo:function(_aa0){
this.keepRows=_aa0;
this.keepPages=!this.keepRows?this.keepPages:Math.max(Math.ceil(this.keepRows/this.rowsPerPage),2);
},setContentNodes:function(_aa1){
this.contentNodes=_aa1;
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
},updateRowCount:function(_aa2){
this.invalidateNodes();
this.rowCount=_aa2;
var _aa3=this.pageCount;
if(_aa3===0){
this.height=1;
}
this.pageCount=this._getPageCount(this.rowCount,this.rowsPerPage);
if(this.pageCount<_aa3){
for(var i=_aa3-1;i>=this.pageCount;i--){
this.height-=this.getPageHeight(i);
delete this.pageHeights[i];
}
}else{
if(this.pageCount>_aa3){
this.height+=this.defaultPageHeight*(this.pageCount-_aa3-1)+this.calcLastPageHeight();
}
}
this.resize();
},pageExists:function(_aa4){
return Boolean(this.getDefaultPageNode(_aa4));
},measurePage:function(_aa5){
if(this.grid.rowHeight){
var _aa6=this.grid.rowHeight+1;
return ((_aa5+1)*this.rowsPerPage>this.rowCount?this.rowCount-_aa5*this.rowsPerPage:this.rowsPerPage)*_aa6;
}
var n=this.getDefaultPageNode(_aa5);
return (n&&n.innerHTML)?n.offsetHeight:undefined;
},positionPage:function(_aa7,_aa8){
for(var i=0;i<this.colCount;i++){
this.pageNodes[i][_aa7].style.top=_aa8+"px";
}
},repositionPages:function(_aa9){
var _aaa=this.getDefaultNodes();
var last=0;
for(var i=0;i<this.stack.length;i++){
last=Math.max(this.stack[i],last);
}
var n=_aaa[_aa9];
var y=(n?this.getPageNodePosition(n)+this.getPageHeight(_aa9):0);
for(var p=_aa9+1;p<=last;p++){
n=_aaa[p];
if(n){
if(this.getPageNodePosition(n)==y){
return;
}
this.positionPage(p,y);
}
y+=this.getPageHeight(p);
}
},installPage:function(_aab){
for(var i=0;i<this.colCount;i++){
this.contentNodes[i].appendChild(this.pageNodes[i][_aab]);
}
},preparePage:function(_aac,_aad){
var p=(_aad?this.popPage():null);
for(var i=0;i<this.colCount;i++){
var _aae=this.pageNodes[i];
var _aaf=(p===null?this.createPageNode():this.invalidatePageNode(p,_aae));
_aaf.pageIndex=_aac;
_aae[_aac]=_aaf;
}
},renderPage:function(_ab0){
var _ab1=[];
var i,j;
for(i=0;i<this.colCount;i++){
_ab1[i]=this.pageNodes[i][_ab0];
}
for(i=0,j=_ab0*this.rowsPerPage;(i<this.rowsPerPage)&&(j<this.rowCount);i++,j++){
this.renderRow(j,_ab1);
}
},removePage:function(_ab2){
for(var i=0,j=_ab2*this.rowsPerPage;i<this.rowsPerPage;i++,j++){
this.removeRow(j);
}
},destroyPage:function(_ab3){
for(var i=0;i<this.colCount;i++){
var n=this.invalidatePageNode(_ab3,this.pageNodes[i]);
if(n){
html.destroy(n);
}
}
},pacify:function(_ab4){
},pacifying:false,pacifyTicks:200,setPacifying:function(_ab5){
if(this.pacifying!=_ab5){
this.pacifying=_ab5;
this.pacify(this.pacifying);
}
},startPacify:function(){
this.startPacifyTicks=new Date().getTime();
},doPacify:function(){
var _ab6=(new Date().getTime()-this.startPacifyTicks)>this.pacifyTicks;
this.setPacifying(true);
this.startPacify();
return _ab6;
},endPacify:function(){
this.setPacifying(false);
},resize:function(){
if(this.scrollboxNode){
this.windowHeight=this.scrollboxNode.clientHeight;
}
for(var i=0;i<this.colCount;i++){
util.setStyleHeightPx(this.contentNodes[i],Math.max(1,this.height));
}
var _ab7=(!this._invalidating);
if(!_ab7){
var ah=this.grid.get("autoHeight");
if(typeof ah=="number"&&ah<=Math.min(this.rowsPerPage,this.rowCount)){
_ab7=true;
}
}
if(_ab7){
this.needPage(this.page,this.pageTop);
}
var _ab8=(this.page<this.pageCount-1)?this.rowsPerPage:((this.rowCount%this.rowsPerPage)||this.rowsPerPage);
var _ab9=this.getPageHeight(this.page);
this.averageRowHeight=(_ab9>0&&_ab8>0)?(_ab9/_ab8):0;
},calcLastPageHeight:function(){
if(!this.pageCount){
return 0;
}
var _aba=this.pageCount-1;
var _abb=((this.rowCount%this.rowsPerPage)||(this.rowsPerPage))*this.defaultRowHeight;
this.pageHeights[_aba]=_abb;
return _abb;
},updateContentHeight:function(inDh){
this.height+=inDh;
this.resize();
},updatePageHeight:function(_abc,_abd,_abe){
if(this.pageExists(_abc)){
var oh=this.getPageHeight(_abc);
var h=(this.measurePage(_abc));
if(h===undefined){
h=oh;
}
this.pageHeights[_abc]=h;
if(oh!=h){
this.updateContentHeight(h-oh);
var ah=this.grid.get("autoHeight");
if((typeof ah=="number"&&ah>this.rowCount)||(ah===true&&!_abd)){
if(!_abe){
this.grid.sizeChange();
}else{
var ns=this.grid.viewsNode.style;
ns.height=parseInt(ns.height)+h-oh+"px";
this.repositionPages(_abc);
}
}else{
this.repositionPages(_abc);
}
}
return h;
}
return 0;
},rowHeightChanged:function(_abf,_ac0){
this.updatePageHeight(Math.floor(_abf/this.rowsPerPage),false,_ac0);
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
},getPageHeight:function(_ac1){
var ph=this.pageHeights[_ac1];
return (ph!==undefined?ph:this.defaultPageHeight);
},pushPage:function(_ac2){
return this.stack.push(_ac2);
},popPage:function(){
return this.stack.shift();
},findPage:function(_ac3){
var i=0,h=0;
for(var ph=0;i<this.pageCount;i++,h+=ph){
ph=this.getPageHeight(i);
if(h+ph>=_ac3){
break;
}
}
this.page=i;
this.pageTop=h;
},buildPage:function(_ac4,_ac5,_ac6){
this.preparePage(_ac4,_ac5);
this.positionPage(_ac4,_ac6);
this.installPage(_ac4);
this.renderPage(_ac4);
this.pushPage(_ac4);
},needPage:function(_ac7,_ac8){
var h=this.getPageHeight(_ac7),oh=h;
if(!this.pageExists(_ac7)){
this.buildPage(_ac7,(!this.grid._autoHeight&&this.keepPages&&(this.stack.length>=this.keepPages)),_ac8);
h=this.updatePageHeight(_ac7,true);
}else{
this.positionPage(_ac7,_ac8);
}
return h;
},onscroll:function(){
this.scroll(this.scrollboxNode.scrollTop);
},scroll:function(_ac9){
this.grid.scrollTop=_ac9;
if(this.colCount){
this.startPacify();
this.findPage(_ac9);
var h=this.height;
var b=this.getScrollBottom(_ac9);
for(var p=this.page,y=this.pageTop;(p<this.pageCount)&&((b<0)||(y<b));p++){
y+=this.needPage(p,y);
}
this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,_ac9);
this.lastVisibleRow=this.getLastVisibleRow(p-1,y,b);
if(h!=this.height){
this.repositionPages(p-1);
}
this.endPacify();
}
},getScrollBottom:function(_aca){
return (this.windowHeight>=0?_aca+this.windowHeight:-1);
},processNodeEvent:function(e,_acb){
var t=e.target;
while(t&&(t!=_acb)&&t.parentNode&&(t.parentNode.parentNode!=_acb)){
t=t.parentNode;
}
if(!t||!t.parentNode||(t.parentNode.parentNode!=_acb)){
return false;
}
var page=t.parentNode;
e.topRowIndex=page.pageIndex*this.rowsPerPage;
e.rowIndex=e.topRowIndex+_a8e(t);
e.rowTarget=t;
return true;
},processEvent:function(e){
return this.processNodeEvent(e,this.contentNode);
},renderRow:function(_acc,_acd){
},removeRow:function(_ace){
},getDefaultPageNode:function(_acf){
return this.getDefaultNodes()[_acf];
},positionPageNode:function(_ad0,_ad1){
},getPageNodePosition:function(_ad2){
return _ad2.offsetTop;
},invalidatePageNode:function(_ad3,_ad4){
var p=_ad4[_ad3];
if(p){
delete _ad4[_ad3];
this.removePage(_ad3,p);
_a90(p);
p.innerHTML="";
}
return p;
},getPageRow:function(_ad5){
return _ad5*this.rowsPerPage;
},getLastPageRow:function(_ad6){
return Math.min(this.rowCount,this.getPageRow(_ad6+1))-1;
},getFirstVisibleRow:function(_ad7,_ad8,_ad9){
if(!this.pageExists(_ad7)){
return 0;
}
var row=this.getPageRow(_ad7);
var _ada=this.getDefaultNodes();
var rows=_a98(_ada[_ad7]);
for(var i=0,l=rows.length;i<l&&_ad8<_ad9;i++,row++){
_ad8+=rows[i].offsetHeight;
}
return (row?row-1:row);
},getLastVisibleRow:function(_adb,_adc,_add){
if(!this.pageExists(_adb)){
return 0;
}
var _ade=this.getDefaultNodes();
var row=this.getLastPageRow(_adb);
var rows=_a98(_ade[_adb]);
for(var i=rows.length-1;i>=0&&_adc>_add;i--,row--){
_adc-=rows[i].offsetHeight;
}
return row+1;
},findTopRow:function(_adf){
var _ae0=this.getDefaultNodes();
var rows=_a98(_ae0[this.page]);
for(var i=0,l=rows.length,t=this.pageTop,h;i<l;i++){
h=rows[i].offsetHeight;
t+=h;
if(t>=_adf){
this.offset=h-(t-_adf);
return i+this.page*this.rowsPerPage;
}
}
return -1;
},findScrollTop:function(_ae1){
var _ae2=Math.floor(_ae1/this.rowsPerPage);
var t=0;
var i,l;
for(i=0;i<_ae2;i++){
t+=this.getPageHeight(i);
}
this.pageTop=t;
this.page=_ae2;
this.needPage(_ae2,this.pageTop);
var _ae3=this.getDefaultNodes();
var rows=_a98(_ae3[_ae2]);
var r=_ae1-this.rowsPerPage*_ae2;
for(i=0,l=rows.length;i<l&&i<r;i++){
t+=rows[i].offsetHeight;
}
return t;
},dummy:0});
});
},"url:dijit/templates/TreeNode.html":"<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow dijitInline\" role=\"presentation\"\n\t\t><div data-dojo-attach-point=\"indentNode\" class=\"dijitInline\"></div\n\t\t><img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"\n\t\t/><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"\n\t\t></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"iconNode\" class=\"dijitIcon dijitTreeIcon\" role=\"presentation\"\n\t\t\t/><span data-dojo-attach-point=\"labelNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n","url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","dojo/fx":function(){
define(["./_base/lang","./Evented","./_base/kernel","./_base/array","./_base/connect","./_base/fx","./dom","./dom-style","./dom-geometry","./ready","require"],function(lang,_ae4,dojo,_ae5,_ae6,_ae7,dom,_ae8,geom,_ae9,_aea){
if(!dojo.isAsync){
_ae9(0,function(){
var _aeb=["./fx/Toggler"];
_aea(_aeb);
});
}
var _aec=dojo.fx={};
var _aed={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _aee=function(_aef){
this._index=-1;
this._animations=_aef||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
_ae5.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
_aee.prototype=new _ae4();
lang.extend(_aee,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
_ae6.disconnect(this._onAnimateCtx);
_ae6.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=_ae6.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=_ae6.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_af0,_af1){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_af1&&this._current.status()=="playing"){
return this;
}
var _af2=_ae6.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_af3=_ae6.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_af4=_ae6.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
_ae6.disconnect(_af2);
_ae6.disconnect(_af3);
_ae6.disconnect(_af4);
});
if(this._onAnimateCtx){
_ae6.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=_ae6.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
_ae6.disconnect(this._onEndCtx);
}
this._onEndCtx=_ae6.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=_ae6.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
_ae6.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_af5,_af6){
this.pause();
var _af7=this.duration*_af5;
this._current=null;
_ae5.some(this._animations,function(a){
if(a.duration<=_af7){
this._current=a;
return true;
}
_af7-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_af7/this._current.duration,_af6);
}
return this;
},stop:function(_af8){
if(this._current){
if(_af8){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=_ae6.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
_ae6.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
_ae6.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
_ae6.disconnect(this._onEndCtx);
}
}});
lang.extend(_aee,_aed);
_aec.chain=function(_af9){
return new _aee(_af9);
};
var _afa=function(_afb){
this._animations=_afb||[];
this._connects=[];
this._finished=0;
this.duration=0;
_ae5.forEach(_afb,function(a){
var _afc=a.duration;
if(a.delay){
_afc+=a.delay;
}
if(this.duration<_afc){
this.duration=_afc;
}
this._connects.push(_ae6.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new _ae7.Animation({curve:[0,1],duration:this.duration});
var self=this;
_ae5.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(_ae6.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
lang.extend(_afa,{_doAction:function(_afd,args){
_ae5.forEach(this._animations,function(a){
a[_afd].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_afe,args){
var t=this._pseudoAnimation;
t[_afe].apply(t,args);
},play:function(_aff,_b00){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_b01,_b02){
var ms=this.duration*_b01;
_ae5.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_b02);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_b03){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
_ae5.forEach(this._connects,_ae6.disconnect);
}});
lang.extend(_afa,_aed);
_aec.combine=function(_b04){
return new _afa(_b04);
};
_aec.wipeIn=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_ae7.animateProperty(lang.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _b05=_ae8.get(node,"height");
return Math.max(_b05,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
var fini=function(){
s.height="auto";
s.overflow=o;
};
_ae6.connect(anim,"onStop",fini);
_ae6.connect(anim,"onEnd",fini);
return anim;
};
_aec.wipeOut=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_ae7.animateProperty(lang.mixin({properties:{height:{end:1}}},args));
_ae6.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
var fini=function(){
s.overflow=o;
s.height="auto";
s.display="none";
};
_ae6.connect(anim,"onStop",fini);
_ae6.connect(anim,"onEnd",fini);
return anim;
};
_aec.slideTo=function(args){
var node=args.node=dom.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=_ae8.getComputedStyle(n);
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
var anim=_ae7.animateProperty(lang.mixin({properties:{top:args.top||0,left:args.left||0}},args));
_ae6.connect(anim,"beforeBegin",anim,init);
return anim;
};
return _aec;
});
},"davinci/js/JSElement":function(){
define(["dojo/_base/declare","davinci/js/JSModel"],function(_b06,_b07){
var _b08=null;
var _b09=null;
return _b06("davinci.js.JSElement",_b07,{constructor:function(){
this.elementType="JSElement";
if(_b08!==null){
this.comment=_b08;
_b08=null;
}
if(_b09!==null){
this.label=_b09;
_b09=null;
}
},printNewLine:function(_b0a){
var s="\n";
for(var i=0;i<_b0a.indent;i++){
s=s+" ";
}
return s;
},printStatement:function(_b0b,stmt){
return this.printNewLine(_b0b)+stmt.getText(_b0b)+(stmt.nosemicolon?"":";");
},add:function(e){
this.addChild(e);
},init:function(_b0c,stop,name){
},getLabel:function(){
context={};
context.indent=0;
return this.getText(context);
},getID:function(){
return this.parent.getID()+":"+this.startLine+":"+this.getLabel();
},getSyntaxPositions:function(_b0d){
var _b0e=[];
function add(line,col,_b0f,type){
if((typeof _b0d=="undefined")||_b0d==line){
_b0e.push({line:line,col:col,length:_b0f,type:type});
}
};
function add2(pos,_b10,type){
if((typeof _b0d=="undefined")||_b0d==pos[0]){
_b0e.push({line:pos[0],col:pos[1],length:_b10,type:type});
}
};
var _b11={visit:function(node){
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
this.visit(_b11);
return _b0e;
}});
});
},"davinci/js/js.plugin":function(){
define(["require"],function(_b12){
return {id:"davinci.js","davinci.editor":{id:"JSEditor",name:"JavaScript Editor",extensions:"js,json",isDefault:true,editorClass:"davinci/js/ui/JavaScriptEditor",palettePerspective:"davinci.html.htmlEditor",expandPalettes:["left"]},"davinci.actionSets":[{id:"jsEdit",visible:true,actions:[{id:"davinci.js.cut",icon:null,label:"cut",commandID:"davinci.js.cut",menubarPath:"davinci.edit/cut"},{id:"davinci.js.add",icon:null,label:"add",commandID:"davinci.js.add",menubarPath:"davinci.edit/add"},{id:"davinci.js.delete",icon:null,label:"delete",commandID:"davinci.js.delete",menubarPath:"davinci.edit/delete"}]}],"davinci.actionSetPartAssociations":[{targetID:"davinci.js.jsEdit",parts:["davinci.ui.outline","davinci.js.JSEditor"]}],"davinci.editorActions":{editorContribution:{targetID:"davinci.js.JSEditor",actions:[{id:"savecombo",className:"maqLabelButton",showLabel:true,label:"Save",toolbarPath:"save",type:"ComboButton",run:function(){
_b12(["../Workbench"],function(_b13){
_b12("../ui/Resource").save();
});
},isEnabled:function(_b14){
return _b12("../Workbench").getOpenEditor();
},menu:[{iconClass:"saveIcon",run:function(){
_b12("../ui/Resource").save();
},isEnabled:function(_b15){
return _b12("../Workbench").getOpenEditor();
},label:"Save",keyBinding:{accel:true,charOrCode:"s",allowGlobal:true}},{iconClass:"saveAsIcon",run:function(){
_b12("../ui/Resource").saveAs("html");
},isEnabled:function(_b16){
return _b12("../Workbench").getOpenEditor();
},label:"Save As",keyBinding:{accel:true,shift:true,charOrCode:"s",allowGlobal:true}}]}]}},"davinci.commands":[{id:"cut",run:function(){
}},{id:"add",run:function(){
}},{id:"delete",run:function(){
}}],"davinci.keyBindings":[{platform:"win",sequence:"M1+C",commandID:"davinci.js.copy",contextID:"davinci.js.JSEditor"}],"davinci.preferences":[],"davinci.fileType":[{extension:"js",iconClass:"jsFileIcon",type:"text"},{extension:"json",iconClass:"jsFileIcon",type:"text"}]};
});
},"dojo/data/util/sorter":function(){
define(["../../_base/lang"],function(lang){
var _b17={};
lang.setObject("dojo.data.util.sorter",_b17);
_b17.basicComparator=function(a,b){
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
_b17.createSortFunction=function(_b18,_b19){
var _b1a=[];
function _b1b(attr,dir,comp,s){
return function(_b1c,_b1d){
var a=s.getValue(_b1c,attr);
var b=s.getValue(_b1d,attr);
return dir*comp(a,b);
};
};
var _b1e;
var map=_b19.comparatorMap;
var bc=_b17.basicComparator;
for(var i=0;i<_b18.length;i++){
_b1e=_b18[i];
var attr=_b1e.attribute;
if(attr){
var dir=(_b1e.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_b1a.push(_b1b(attr,dir,comp,_b19));
}
}
return function(rowA,rowB){
var i=0;
while(i<_b1a.length){
var ret=_b1a[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
return _b17;
});
},"davinci/html/CSSModel":function(){
define({shorthand:[["border",["border-width","border-style","border-color","border-top","border-left","border-right","border-bottom"]],["border-width",["border-top-width","border-right-width","border-bottom-width","border-left-width"]],["border-style",["border-top-style","border-right-style","border-bottom-style","border-left-style"]],["border-color",["border-top-color","border-right-color","border-bottom-color","border-left-color"]],["border-bottom",["border-bottom-width","border-bottom-style","border-bottom-color"]],["border-top",["border-top-width","border-top-style","border-top-color"]],["border-left",["border-left-width","border-left-style","border-left-color"]],["border-right",["border-right-width","border-right-style","border-right-color"]],["font",["font-size","line-height","font-weight","font-style","font-family","line-height"]],["border-radius",["border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius"]],["-moz-border-radius",["-moz-border-radius-topleft","-moz-border-radius-topright","-moz-border-radius-bottomright","-moz-border-radius-bottomleft"]],["margin",["margin-top","margin-right","margin-bottom","margin-left"]],["padding",["padding-top","padding-right","padding-bottom","padding-left"]],["background",["background-color","background-image","background-repeat","background-position","background-attachment"]]]});
},"davinci/model/Factory":function(){
define(["dojo/_base/declare","davinci/html/CSSFile","davinci/js/JSFile","davinci/html/HTMLFile","system/resource"],function(_b1f,_b20,_b21,_b22,_b23){
var _b24=[];
var _b25=[];
var _b26={getModel:function(args){
var url=args.url;
if(!url){
return null;
}
for(var i=0;i<_b25.length;i++){
if(_b25[i].url==url){
_b24[i]++;
this.incrementImports(_b25[i]);
return _b25[i];
}
}
if(url.indexOf("css")>0){
return _b26.newCSS(args);
}
if(url.indexOf("html")>0){
return _b26.newHTML(args);
}
if(url.indexOf("js")>0){
return _b26.newJS(args);
}
},closeModel:function(_b27){
var url=_b27.url;
if(!url){
return null;
}
for(var i=0;i<_b25.length;i++){
if(_b25[i].url==url){
var _b28=_b25[i];
_b24[i]--;
if(_b24[i]===0){
_b25.splice(i,1);
_b24.splice(i,1);
var _b29=_b23.findResource(url);
if(_b29&&_b29.dirtyResource){
_b29.removeWorkingCopy();
_b29.dirtyResource=false;
}
}
}
}
},newHTML:function(args){
var _b2a=new _b22(args.url);
_b25.push(_b2a);
var _b2b=_b25.length-1;
_b24[_b2b]=1;
return _b2a;
},newCSS:function(args){
var _b2c=new _b20(args);
_b25.push(_b2c);
var _b2d=_b25.length-1;
_b24[_b2d]=1;
return _b2c;
},newJS:function(args){
var _b2e=new _b21(args);
_b25.push(_b2e);
var _b2f=_b25.length-1;
_b24[_b2f]=1;
return _b2e;
},getNewFromResource:function(_b30){
var _b31=_b30.extension;
if(!_b31){
return new _b22();
}
switch(_b31){
case "html":
return new _b22();
break;
case "css":
return new _b20();
break;
case "js":
case "json":
return new _b21();
break;
default:
return new _b22();
}
},incrementImports:function(_b32){
var _b33={visit:function(node){
if(node.elementType=="CSSImport"){
var url=node.cssFile.url;
for(var i=0;i<_b25.length;i++){
if(_b25[i].url==url){
_b24[i]++;
}
}
}
return false;
}};
if(_b32){
_b32.visit(_b33);
}
},log:function(){
for(var i=0;i<_b25.length;i++){
}
}};
var _b34=require(["dojo/_base/connect"],function(_b35){
_b35.subscribe("davinci/model/closeModel",_b26,_b26.closeModel);
});
return _b26;
});
},"dojo/DeferredList":function(){
define(["./_base/kernel","./_base/Deferred","./_base/array"],function(dojo,_b36,_b37){
dojo.DeferredList=function(list,_b38,_b39,_b3a,_b3b){
var _b3c=[];
_b36.call(this);
var self=this;
if(list.length===0&&!_b38){
this.resolve([0,[]]);
}
var _b3d=0;
_b37.forEach(list,function(item,i){
item.then(function(_b3e){
if(_b38){
self.resolve([i,_b3e]);
}else{
_b3f(true,_b3e);
}
},function(_b40){
if(_b39){
self.reject(_b40);
}else{
_b3f(false,_b40);
}
if(_b3a){
return null;
}
throw _b40;
});
function _b3f(_b41,_b42){
_b3c[i]=[_b41,_b42];
_b3d++;
if(_b3d===list.length){
self.resolve(_b3c);
}
};
});
};
dojo.DeferredList.prototype=new _b36();
dojo.DeferredList.prototype.gatherResults=function(_b43){
var d=new dojo.DeferredList(_b43,false,true,false);
d.addCallback(function(_b44){
var ret=[];
_b37.forEach(_b44,function(_b45){
ret.push(_b45[1]);
});
return ret;
});
return d;
};
return dojo.DeferredList;
});
},"davinci/ve/themeEditor/themeEditor.plugin":function(){
define(["require"],function(_b46){
return {id:"davinci.themeEdit","davinci.perspective":{id:"themeEdit",title:"Theme Editor",views:[{viewID:"davinci.ve.Palette",position:"left",hidden:true},{viewID:"davinci.ui.outline",position:"left",hidden:true},{viewID:"davinci.ve.style",position:"right"},{viewID:"davinci.ui.comment",position:"right",hidden:true},{viewID:"davinci.ve.states",position:"right-bottom",selected:true},{viewID:"davinci.ui.navigator",position:"left-bottom",selected:true},{viewID:"davinci.review.reviewNavigator",position:"left"}]},"davinci.editor":{id:"ThemeEditor",name:"Theme Editor",extensions:"theme",defaultContent:"./defaultContent.css",isDefault:true,editorClass:"davinci/ve/themeEditor/ThemeEditor",palettePerspective:"davinci.themeEdit.themeEdit",expandPalettes:["right"]},"davinci.editorActions":{editorContribution:{targetID:"davinci.ve.ThemeEditor",actions:[{id:"undo",action:"davinci/actions/UndoAction",label:"Undo",className:"maqLabelButton",showLabel:true,toolbarPath:"undoredo",keyBinding:{accel:true,charOrCode:"z"}},{id:"redo",action:"davinci/actions/RedoAction",className:"maqLabelButton",showLabel:true,label:"Redo",toolbarPath:"undoredo",keyBinding:{accel:true,shift:true,charOrCode:"z"}},{id:"save",className:"maqLabelButton",showLabel:true,label:"Save",toolbarPath:"save",run:function(){
_b46("../../Workbench").getOpenEditor().save();
},isEnabled:function(_b47){
return _b46("../../Workbench").getOpenEditor();
}}]}}};
});
},"davinci/html/HTMLAttribute":function(){
define(["dojo/_base/declare","davinci/html/HTMLItem"],function(_b48,_b49){
return _b48("davinci.html.HTMLAttribute",_b49,{constructor:function(){
this.elementType="HTMLAttribute";
this.name="";
this.value="";
},getText:function(_b4a){
if(this.noPersist&&!_b4a.includeNoPersist){
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
},setValue:function(_b4b){
this.value=davinci.html.unEscapeXml(_b4b);
this.onChange();
}});
});
},"davinci/html/HTMLFile":function(){
define(["dojo/_base/declare","davinci/html/HTMLItem","davinci/html/HTMLParser","davinci/html/CSSSelector","davinci/html/HTMLElement","davinci/html/CSSImport","davinci/html/CSSFile","davinci/model/Model"],function(_b4c,_b4d,_b4e,_b4f,_b50,_b51,_b52,_b53){
return _b4c("davinci.html.HTMLFile",_b4d,{constructor:function(_b54){
this.fileName=_b54;
this.url=_b54;
this.elementType="HTMLFile";
this._loadedCSS={};
this._styleElem=null;
},save:function(_b55){
var _b56;
var file=system.resource.findResource(this.fileName);
if(file){
var text=this.getText();
_b56=file.setContents(text,_b55);
}
return _b56;
},getText:function(_b57){
_b57=_b57||{};
_b57.indent=0;
var s="";
for(var i=0;i<this.children.length;i++){
var _b58=this.children[i];
s=s+_b58.getText(_b57);
if(_b58.elementType=="HTMLComment"){
s=s+this._addWS(_b58._fmLine,_b58._fmIndent);
}
}
return s;
},getDocumentElement:function(_b59){
for(var i=0;i<this.children.length;i++){
if(this.children[i].tag=="html"){
return this.children[i];
}
}
},findElement:function(id){
var _b5a=this.getDocumentElement();
if(_b5a){
return _b5a.findElement(id);
}
},getMatchingRules:function(_b5b,_b5c){
var _b5d={visit:function(node){
if(node.elementType=="CSSFile"){
var m=[];
var _b5e=node.getMatchingRules(_b5b,[],m);
for(var i=0;i<_b5e.length;i++){
for(var j=0;j<this.matchLevels.length;j++){
if(m[i]>this.matchLevels[j]){
this.matchLevels.splice(j,0,m[i]);
this.rules.splice(j,0,_b5e[i]);
break;
}
}
}
if(this.rules.length==0){
this.rules=_b5e;
this.matchLevels=m;
}
return true;
}
return false;
},matchLevels:[],rules:[]};
this.visit(_b5d);
if(_b5c){
return {"rules":_b5d.rules,"matchLevels":_b5d.matchLevels};
}else{
return _b5d.rules;
}
},getRule:function(_b5f){
if(!_b5f){
return [];
}
var _b60=_b4f.parseSelectors(_b5f);
var _b61={visit:function(node){
if(node.elementType=="CSSFile"){
var _b62=node.getRule(_b60);
this.rules=this.rules.concat(_b62||[]);
return true;
}
return false;
},rules:[]};
this.visit(_b61);
return _b61.rules;
},setText:function(text,_b63){
this.visit({visit:function(node){
if(node.elementType=="CSSImport"){
node.close();
}
}});
this.children=[];
this._styleElem=null;
var _b64=_b4e.parse(text||"",this);
var _b65="";
if(!_b63&&_b64.errors.length==0){
_b65=this.getText();
this.children=[];
_b64=_b4e.parse(_b65,this);
}
this.endOffset=_b64.endOffset;
this.errors=_b64.errors;
var _b66=this;
if(!_b63){
this.visit({visit:function(node){
if(node.elementType=="CSSImport"){
if(!node.cssFile){
node.load(true);
dojo.connect(node.cssFile,"onChange",null,dojo.hitch(_b66,"onChange"));
}
}
}});
}
this.onChange();
},hasStyleSheet:function(url){
var _b67=this.find({elementType:"CSSImport"});
for(var i=0;i<_b67.length;i++){
if(_b67[i].url==url){
return true;
}
}
return false;
},addStyleSheet:function(url,_b68,_b69,_b6a,_b6b){
if(!_b69){
this._loadedCSS[url]=require("davinci/model/Factory").getModel({url:url,includeImports:true,loader:_b6b});
}
if(_b68){
this._loadedCSS[url].setText(_b68);
}
this.onChange();
if(!this._styleElem){
var head=this.find({"elementType":"HTMLElement","tag":"head"},true);
var _b6c=head.getChildElement("style");
if(!_b6c){
_b6c=new _b50("style");
head.addChild(_b6c);
}
this._styleElem=_b6c;
}
var css=new _b51();
css.parent=this;
css.url=url;
if(_b6a){
this._styleElem.insertBefore(css,_b6a);
}else{
this._styleElem.addChild(css);
}
if(!_b69){
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
},updatePositions:function(_b6d,_b6e){
new _b53(this).updatePositions(this,_b6d,_b6e);
this.visit({visit:function(_b6f){
if(_b6f.endOffset<_b6d){
return true;
}
if(_b6f.elementType=="HTMLElement"&&_b6f.startTagOffset>_b6d){
_b6f.startTagOffset+=_b6e;
}
}});
},mapPositions:function(_b70){
var s=this.getText();
var et=_b70.getText();
var _b71=s.indexOf(et);
var end=_b71+et.lastIndexOf(">")+1;
return {startOffset:_b71,endOffset:end};
},reportPositions:function(){
this.visit({visit:function(_b72){
if(_b72.elementType=="HTMLElement"){
}else{
if(_b72.elementType=="HTMLAttribute"){
}
}
}});
},evaluate:function(_b73){
if(_b73.charAt(0)!=="/"){
console.error("invalid XPath string");
return;
}
var elem=this;
_b73.substr(1).split("/").forEach(function(path){
var m=path.match(this._RE_XPATH),tag=m[1],idx=m[2],_b74;
_b74=elem.children.filter(function(_b75){
return _b75.tag===tag;
});
if(!idx&&_b74.length>1){
console.error("invalid XPath string; no index specified for multiple elements");
return;
}
elem=idx?_b74[idx-1]:_b74[0];
},this);
return elem;
},_RE_XPATH:/(\w+)(?:\[(\d+)\])?/});
});
},"dijit/PopupMenuBarItem":function(){
define(["dojo/_base/declare","./PopupMenuItem","./MenuBarItem"],function(_b76,_b77,_b78){
var _b79=_b78._MenuBarItemMixin;
return _b76("dijit.PopupMenuBarItem",[_b77,_b79],{});
});
},"davinci/workbench/_ToolbaredContainer":function(){
define(["dojo/_base/declare","dijit/layout/_LayoutWidget","dijit/_Templated"],function(_b7a,_b7b,_b7c){
return _b7a("davinci.workbench._ToolbaredContainer",[_b7b,_b7c],{templateString:"<div><div dojoAttachPoint='titleBarDiv' class='palette_titleBarDiv'></div><div dojoAttachPoint='toolbarDiv' class='toolbaredContainer_toolbarDiv'></div><div dojoAttachPoint='containerNode'></div></div>",gutters:false,_toolbarCreated:{},layout:function(){
var _b7d=[{domNode:this.titleBarDiv,layoutAlign:"top"},{domNode:this.toolbarDiv,layoutAlign:"top"},{domNode:this.containerNode,layoutAlign:"client"}];
dijit.layout.layoutChildren(this.domNode,this._contentBox,_b7d);
this._containerContentBox=dijit.layout.marginBox2contentBox(this.containerNode,_b7d[2]);
var _b7e=dijit.byNode(this.containerNode);
if(_b7e&&_b7e.resize){
_b7e.resize(this._containerContentBox);
}
dojo.marginBox(this.containerNode,_b7d[2]);
},setContent:function(data){
this.mainWidget=data;
var _b7f=data.domNode||data;
dojo.place(_b7f,this.containerNode,"replace");
this.containerNode=_b7f;
if(!this.toolbarCreated(this.declaredClass)){
this._createToolbar(this.declaredClass);
}
this.titleBarDiv.innerHTML="<span class=\"paletteCloseBox\"></span><span class=\"titleBarDivTitle\">"+this.title+"</span>";
var _b80=dojo.query(".paletteCloseBox",this.titleBarDiv);
if(_b80.length>0){
var _b81=_b80[0];
dojo.connect(_b81,"click",this,function(_b82){
davinci.Workbench.collapsePaletteContainer(_b82.currentTarget);
});
}
if(this._started){
this.layout();
}
},removeContent:function(){
var _b83=dojo.doc.createElement("div");
dojo.place(_b83,this.containerNode,"replace");
this.containerNode=_b83;
if(this.mainWidget){
this.mainWidget.destroy();
}
delete this.mainWidget;
},_getViewActions:function(){
},getTopAdditions:function(){
},_createToolbar:function(_b84){
var _b85=require("davinci/Workbench");
var _b86=this.getToolbarDiv();
var _b87=this.getTopAdditions();
if(_b87){
_b86.appendChild(_b87);
}
if(this.toolbarMenuActionSets){
var _b88="m"+Date.now();
var _b89=_b88+"_menucontainer";
var _b8a=dojo.create("span",{"id":_b89,"class":"paletteDropdown"},_b86);
var _b8b=_b88+"_menu";
var _b8c=dojo.create("span",{id:_b8b},_b8a);
_b85.updateMenubar(_b8c,this.toolbarMenuActionSets);
}
var _b8d=this._getViewActions();
if(_b8d&&_b8d.length){
var _b8e=dojo.create("div",{"class":"toolbaredContainer_toolbarDiv"});
var tb=dojo.create("span",{style:{display:"inline-block"}},_b8e);
var _b8f=_b85._createToolBar("toolbarPath",tb,_b8d,this._getViewContext());
dojo.style(_b8f.domNode,{"display":"inline-block","float":"left"});
this.toolbarCreated(_b84,_b8f);
}
},_getViewContext:function(){
return this;
},getToolbarDiv:function(){
return this.toolbarDiv;
},toolbarCreated:function(_b90,_b91){
if(arguments.length>1){
this._toolbarCreated[_b90]=_b91;
}
return this._toolbarCreated[_b90];
},attachToolbar:function(){
var _b92=this.toolbarCreated(this.declaredClass);
var _b93=this.getToolbarDiv();
if(_b92&&_b92.domNode&&_b93){
_b93.innerHTML="";
_b93.appendChild(_b92.domNode);
}
}});
});
},"dijit/form/_FormMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/window"],function(_b94,_b95,_b96,lang,on,_b97){
return _b95("dijit.form._FormMixin",null,{state:"",_getDescendantFormWidgets:function(_b98){
var res=[];
_b94.forEach(_b98||this.getChildren(),function(_b99){
if("value" in _b99){
res.push(_b99);
}else{
res=res.concat(this._getDescendantFormWidgets(_b99.getChildren()));
}
},this);
return res;
},reset:function(){
_b94.forEach(this._getDescendantFormWidgets(),function(_b9a){
if(_b9a.reset){
_b9a.reset();
}
});
},validate:function(){
var _b9b=false;
return _b94.every(_b94.map(this._getDescendantFormWidgets(),function(_b9c){
_b9c._hasBeenBlurred=true;
var _b9d=_b9c.disabled||!_b9c.validate||_b9c.validate();
if(!_b9d&&!_b9b){
_b97.scrollIntoView(_b9c.containerNode||_b9c.domNode);
_b9c.focus();
_b9b=true;
}
return _b9d;
}),function(item){
return item;
});
},setValues:function(val){
_b96.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
_b94.forEach(this._getDescendantFormWidgets(),function(_b9e){
if(!_b9e.name){
return;
}
var _b9f=map[_b9e.name]||(map[_b9e.name]=[]);
_b9f.push(_b9e);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _ba0=map[name],_ba1=lang.getObject(name,false,obj);
if(_ba1===undefined){
continue;
}
if(!lang.isArray(_ba1)){
_ba1=[_ba1];
}
if(typeof _ba0[0].checked=="boolean"){
_b94.forEach(_ba0,function(w){
w.set("value",_b94.indexOf(_ba1,w.value)!=-1);
});
}else{
if(_ba0[0].multiple){
_ba0[0].set("value",_ba1);
}else{
_b94.forEach(_ba0,function(w,i){
w.set("value",_ba1[i]);
});
}
}
}
},getValues:function(){
_b96.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
_b94.forEach(this._getDescendantFormWidgets(),function(_ba2){
var name=_ba2.name;
if(!name||_ba2.disabled){
return;
}
var _ba3=_ba2.get("value");
if(typeof _ba2.checked=="boolean"){
if(/Radio/.test(_ba2.declaredClass)){
if(_ba3!==false){
lang.setObject(name,_ba3,obj);
}else{
_ba3=lang.getObject(name,false,obj);
if(_ba3===undefined){
lang.setObject(name,null,obj);
}
}
}else{
var ary=lang.getObject(name,false,obj);
if(!ary){
ary=[];
lang.setObject(name,ary,obj);
}
if(_ba3!==false){
ary.push(_ba3);
}
}
}else{
var prev=lang.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(lang.isArray(prev)){
prev.push(_ba3);
}else{
lang.setObject(name,[prev,_ba3],obj);
}
}else{
lang.setObject(name,_ba3,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(){
},_getState:function(){
var _ba4=_b94.map(this._descendants,function(w){
return w.get("state")||"";
});
return _b94.indexOf(_ba4,"Error")>=0?"Error":_b94.indexOf(_ba4,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
},connectChildren:function(_ba5){
this._descendants=this._getDescendantFormWidgets();
_b94.forEach(this._descendants,function(_ba6){
if(!_ba6._started){
_ba6.startup();
}
});
if(!_ba5){
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
this.watch("state",function(attr,_ba7,_ba8){
this.onValidStateChange(_ba8=="");
});
},destroy:function(){
this.inherited(arguments);
}});
});
},"dijit/layout/TabController":function(){
define(["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/i18n","dojo/_base/lang","./StackController","../registry","../Menu","../MenuItem","dojo/text!./templates/_TabButton.html","dojo/i18n!../nls/common"],function(_ba9,dom,_baa,_bab,i18n,lang,_bac,_bad,Menu,_bae,_baf){
var _bb0=_ba9("dijit.layout._TabButton",_bac.StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:_baf,scrollOnFocus:false,buildRendering:function(){
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
_bab.toggle(this.domNode,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _bb1=i18n.getLocalization("dijit","common");
if(this.closeNode){
_baa.set(this.closeNode,"title",_bb1.itemClose);
}
}
},_setDisabledAttr:function(_bb2){
this.inherited(arguments);
if(this.closeNode){
if(_bb2){
_baa.remove(this.closeNode,"title");
}else{
var _bb3=i18n.getLocalization("dijit","common");
_baa.set(this.closeNode,"title",_bb3.itemClose);
}
}
},_setLabelAttr:function(_bb4){
this.inherited(arguments);
if(!this.showLabel&&!this.params.title){
this.iconNode.alt=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
var _bb5=_ba9("dijit.layout.TabController",_bac,{baseClass:"dijitTabController",templateString:"<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'></div>",tabPosition:"top",buttonWidget:_bb0,buttonWidgetCloseClass:"dijitTabCloseButton",postCreate:function(){
this.inherited(arguments);
var _bb6=new Menu({id:this.id+"_Menu",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode],selector:function(node){
return _bab.contains(node,"dijitClosable")&&!_bab.contains(node,"dijitTabDisabled");
}});
this.own(_bb6);
var _bb7=i18n.getLocalization("dijit","common"),_bb8=this;
_bb6.addChild(new _bae({label:_bb7.itemClose,ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:function(evt){
var _bb9=_bad.byNode(this.getParent().currentTarget);
_bb8.onCloseButtonClick(_bb9.page);
}}));
}});
_bb5.TabButton=_bb0;
return _bb5;
});
},"dijit/_MenuBase":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/mouse","dojo/on","dojo/window","./a11yclick","./popup","./registry","./_Widget","./_KeyNavContainer","./_TemplatedMixin"],function(_bba,_bbb,dom,_bbc,_bbd,lang,_bbe,on,_bbf,_bc0,pm,_bc1,_bc2,_bc3,_bc4){
return _bbb("dijit._MenuBase",[_bc2,_bc4,_bc3],{parentMenu:null,popupDelay:500,autoFocus:false,postCreate:function(){
var self=this,_bc5=function(node){
return _bbd.contains(node,"dijitMenuItem");
};
this.own(on(this.containerNode,on.selector(_bc5,_bbe.enter),function(){
self.onItemHover(_bc1.byNode(this));
}),on(this.containerNode,on.selector(_bc5,_bbe.leave),function(){
self.onItemUnhover(_bc1.byNode(this));
}),on(this.containerNode,on.selector(_bc5,_bc0),function(evt){
self.onItemClick(_bc1.byNode(this),evt);
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
var _bc6=this._getTopMenu();
if(_bc6&&_bc6._isMenuBar){
_bc6.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _bc7=this.currentPopup.parentMenu;
if(_bc7.focusedChild){
_bc7.focusedChild._setSelected(false);
}
_bc7.focusedChild=this.currentPopup.from_item;
_bc7.focusedChild._setSelected(true);
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
var _bc8=item.popup;
if(_bc8){
this._stopPendingCloseTimer(_bc8);
_bc8._pendingClose_timer=this.defer(function(){
_bc8._pendingClose_timer=null;
if(_bc8.parentMenu){
_bc8.parentMenu.currentPopup=null;
}
pm.close(_bc8);
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
},_stopPendingCloseTimer:function(_bc9){
if(_bc9._pendingClose_timer){
_bc9._pendingClose_timer=_bc9._pendingClose_timer.remove();
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
},_openPopup:function(_bca){
this._stopPopupTimer();
var _bcb=this.focusedChild;
if(!_bcb){
return;
}
var _bcc=_bcb.popup;
if(!_bcc.isShowingNow){
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_bcc.parentMenu=this;
_bcc.from_item=_bcb;
var self=this;
pm.open({parent:this,popup:_bcc,around:_bcb.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_bcb);
self._cleanUp();
_bcb._setSelected(true);
self.focusedChild=_bcb;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_bcc;
_bcc.connect(_bcc.domNode,"onmouseenter",lang.hitch(self,"_onPopupHover"));
}
if(_bca&&_bcc.focus){
_bcc._focus_timer=this.defer(lang.hitch(_bcc,function(){
this._focus_timer=null;
this.focus();
}));
}
},_markActive:function(){
this.isActive=true;
_bbd.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_bbd.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_bba.indexOf(this._focusManager.activeStack,this.id)>=0){
_bbc.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
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
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/_base/lang","dojo/on","dojo/query","dojo/sniff","../registry","dojo/text!./templates/ScrollingTabController.html","dojo/text!./templates/_ScrollingTabControllerButton.html","./TabController","./utils","../_WidgetsInTemplateMixin","../Menu","../MenuItem","../form/Button","../_HasDropDown","dojo/NodeList-dom"],function(_bcd,_bce,_bcf,_bd0,_bd1,fx,lang,on,_bd2,has,_bd3,_bd4,_bd5,_bd6,_bd7,_bd8,Menu,_bd9,_bda,_bdb){
var _bdc=_bce("dijit.layout.ScrollingTabController",[_bd6,_bd8],{baseClass:"dijitTabController dijitScrollingTabController",templateString:_bd4,useMenu:true,useSlider:true,tabStripClass:"",widgetsInTemplate:true,_minScroll:5,_setClassAttr:{node:"containerNode",type:"class"},buildRendering:function(){
this.inherited(arguments);
var n=this.domNode;
this.scrollNode=this.tablistWrapper;
this._initButtons();
if(!this.tabStripClass){
this.tabStripClass="dijitTabContainer"+this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"")+"None";
_bcf.add(n,"tabStrip-disabled");
}
_bcf.add(this.tablistWrapper,this.tabStripClass);
},onStartup:function(){
this.inherited(arguments);
_bd1.set(this.domNode,"visibility","");
this._postStartup=true;
this.own(on(this.containerNode,"attrmodified-label, attrmodified-iconclass",lang.hitch(this,function(evt){
if(this._dim){
this.resize(this._dim);
}
})));
},onAddChild:function(page,_bdd){
this.inherited(arguments);
_bd1.set(this.containerNode,"width",(_bd1.get(this.containerNode,"width")+200)+"px");
},onRemoveChild:function(page,_bde){
var _bdf=this.pane2button[page.id];
if(this._selectedTab===_bdf.domNode){
this._selectedTab=null;
}
this.inherited(arguments);
},_initButtons:function(){
this._btnWidth=0;
this._buttons=_bd2("> .tabStripButton",this.domNode).filter(function(btn){
if((this.useMenu&&btn==this._menuBtn.domNode)||(this.useSlider&&(btn==this._rightBtn.domNode||btn==this._leftBtn.domNode))){
this._btnWidth+=_bd0.getMarginSize(btn).w;
return true;
}else{
_bd1.set(btn,"display","none");
return false;
}
},this);
},_getTabsWidth:function(){
var _be0=this.getChildren();
if(_be0.length){
var _be1=_be0[this.isLeftToRight()?0:_be0.length-1].domNode,_be2=_be0[this.isLeftToRight()?_be0.length-1:0].domNode;
return _be2.offsetLeft+_bd1.get(_be2,"width")-_be1.offsetLeft;
}else{
return 0;
}
},_enableBtn:function(_be3){
var _be4=this._getTabsWidth();
_be3=_be3||_bd1.get(this.scrollNode,"width");
return _be4>0&&_be3<_be4;
},resize:function(dim){
this._dim=dim;
this.scrollNode.style.height="auto";
var cb=this._contentBox=_bd7.marginBox2contentBox(this.domNode,{h:0,w:dim.w});
cb.h=this.scrollNode.offsetHeight;
_bd0.setContentSize(this.domNode,cb);
var _be5=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_be5?"":"none");
this._leftBtn.layoutAlign="left";
this._rightBtn.layoutAlign="right";
this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";
_bd7.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client"}]);
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
return (this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit"))?this.scrollNode.scrollLeft:_bd1.get(this.containerNode,"width")-_bd1.get(this.scrollNode,"width")+(has("ie")>=8?-1:1)*this.scrollNode.scrollLeft;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit")){
return val;
}else{
var _be6=_bd1.get(this.containerNode,"width")-_bd1.get(this.scrollNode,"width");
return (has("ie")>=8?-1:1)*(val-_be6);
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
if(sl>node.offsetLeft||sl+_bd1.get(this.scrollNode,"width")<node.offsetLeft+_bd1.get(node,"width")){
this.createSmoothScroll().play();
}
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _be7=this.getChildren(),_be8=_bd1.get(this.scrollNode,"width"),_be9=_bd1.get(this.containerNode,"width"),_bea=_be9-_be8,_beb=this._getTabsWidth();
if(_be7.length&&_beb>_be8){
return {min:this.isLeftToRight()?0:_be7[_be7.length-1].domNode.offsetLeft,max:this.isLeftToRight()?(_be7[_be7.length-1].domNode.offsetLeft+_bd1.get(_be7[_be7.length-1].domNode,"width"))-_be8:_bea};
}else{
var _bec=this.isLeftToRight()?0:_bea;
return {min:_bec,max:_bec};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_bed=_bd1.get(this.scrollNode,"width"),_bee=this._getScrollBounds();
var pos=(n.offsetLeft+_bd1.get(n,"width")/2)-_bed/2;
pos=Math.min(Math.max(pos,_bee.min),_bee.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _bef=this._getScrollBounds();
x=Math.min(Math.max(x,_bef.min),_bef.max);
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
while(n&&!_bcf.contains(n,"tabStripButton")){
n=n.parentNode;
}
return n;
},doSlideRight:function(e){
this.doSlide(1,this._getBtnNode(e));
},doSlideLeft:function(e){
this.doSlide(-1,this._getBtnNode(e));
},doSlide:function(_bf0,node){
if(node&&_bcf.contains(node,"dijitTabDisabled")){
return;
}
var _bf1=_bd1.get(this.scrollNode,"width");
var d=(_bf1*0.75)*_bf0;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_bf2){
var _bf3=this._getScrollBounds();
this._leftBtn.set("disabled",_bf2<=_bf3.min);
this._rightBtn.set("disabled",_bf2>=_bf3.max);
}});
var _bf4=_bce("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:_bd5,tabIndex:"",isFocusable:function(){
return false;
}});
_bce("dijit.layout._ScrollingTabControllerButton",[_bda,_bf4]);
_bce("dijit.layout._ScrollingTabControllerMenuButton",[_bda,_bdb,_bf4],{containerId:"",tabIndex:"-1",isLoaded:function(){
return false;
},loadDropDown:function(_bf5){
this.dropDown=new Menu({id:this.containerId+"_menu",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir});
var _bf6=_bd3.byId(this.containerId);
_bcd.forEach(_bf6.getChildren(),function(page){
var _bf7=new _bd9({id:page.id+"_stcMi",label:page.title,iconClass:page.iconClass,disabled:page.disabled,ownerDocument:this.ownerDocument,dir:page.dir,lang:page.lang,textDir:page.textDir,onClick:function(){
_bf6.selectChild(page);
}});
this.dropDown.addChild(_bf7);
},this);
_bf5();
},closeDropDown:function(_bf8){
this.inherited(arguments);
if(this.dropDown){
this.dropDown.destroyRecursive();
delete this.dropDown;
}
}});
return _bdc;
});
},"dijit/form/_ListMouseMixin":function(){
define(["dojo/_base/declare","dojo/mouse","dojo/on","dojo/touch","./_ListBase"],function(_bf9,_bfa,on,_bfb,_bfc){
return _bf9("dijit.form._ListMouseMixin",_bfc,{postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,_bfb.press,function(evt){
evt.preventDefault();
}));
this._listConnect(_bfb.press,"_onMouseDown");
this._listConnect(_bfb.release,"_onMouseUp");
this._listConnect(_bfa.enter,"_onMouseOver");
this._listConnect(_bfa.leave,"_onMouseOut");
},_onMouseDown:function(evt,_bfd){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
this._isDragging=true;
this._setSelectedAttr(_bfd);
},_onMouseUp:function(evt,_bfe){
this._isDragging=false;
var _bff=this.selected;
var _c00=this._hoveredNode;
if(_bff&&_bfe==_bff){
this.onClick(_bff);
}else{
if(_c00&&_bfe==_c00){
this._setSelectedAttr(_c00);
this.onClick(_c00);
}
}
},_onMouseOut:function(evt,_c01){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
if(this._isDragging){
this._cancelDrag=(new Date()).getTime()+1000;
}
},_onMouseOver:function(evt,_c02){
if(this._cancelDrag){
var time=(new Date()).getTime();
if(time>this._cancelDrag){
this._isDragging=false;
}
this._cancelDrag=null;
}
this._hoveredNode=_c02;
this.onHover(_c02);
if(this._isDragging){
this._setSelectedAttr(_c02);
}
}});
});
},"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","davinci/review/model/resource/Empty":function(){
define(["dojo/_base/declare","davinci/model/resource/Resource"],function(_c03,_c04){
return _c03("davinci.review.model.resource.Empty",_c04,{constructor:function(args){
this.elementType="Folder";
this.name="root";
this.parent=null;
},getChildren:function(){
return this.children;
}});
});
},"dijit/tree/_dndSelector":function(){
define(["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/Deferred","dojo/_base/kernel","dojo/_base/lang","dojo/cookie","dojo/mouse","dojo/on","dojo/touch","./_dndContainer"],function(_c05,_c06,_c07,_c08,_c09,lang,_c0a,_c0b,on,_c0c,_c0d){
return _c07("dijit.tree._dndSelector",_c0d,{constructor:function(){
this.selection={};
this.anchor=null;
if(!this.cookieName&&this.tree.id){
this.cookieName=this.tree.id+"SaveSelectedCookie";
}
this.events.push(on(this.tree.domNode,_c0c.press,lang.hitch(this,"onMouseDown")),on(this.tree.domNode,_c0c.release,lang.hitch(this,"onMouseUp")),on(this.tree.domNode,_c0c.move,lang.hitch(this,"onMouseMove")));
},singular:false,getSelectedTreeNodes:function(){
var _c0e=[],sel=this.selection;
for(var i in sel){
_c0e.push(sel[i]);
}
return _c0e;
},selectNone:function(){
this.setSelection([]);
return this;
},destroy:function(){
this.inherited(arguments);
this.selection=this.anchor=null;
},addTreeNode:function(node,_c0f){
this.setSelection(this.getSelectedTreeNodes().concat([node]));
if(_c0f){
this.anchor=node;
}
return node;
},removeTreeNode:function(node){
this.setSelection(this._setDifference(this.getSelectedTreeNodes(),[node]));
return node;
},isTreeNodeSelected:function(node){
return node.id&&!!this.selection[node.id];
},setSelection:function(_c10){
var _c11=this.getSelectedTreeNodes();
_c05.forEach(this._setDifference(_c11,_c10),lang.hitch(this,function(node){
node.setSelected(false);
if(this.anchor==node){
delete this.anchor;
}
delete this.selection[node.id];
}));
_c05.forEach(this._setDifference(_c10,_c11),lang.hitch(this,function(node){
node.setSelected(true);
this.selection[node.id]=node;
}));
this._updateSelectionProperties();
},_setDifference:function(xs,ys){
_c05.forEach(ys,function(y){
y.__exclude__=true;
});
var ret=_c05.filter(xs,function(x){
return !x.__exclude__;
});
_c05.forEach(ys,function(y){
delete y["__exclude__"];
});
return ret;
},_updateSelectionProperties:function(){
var _c12=this.getSelectedTreeNodes();
var _c13=[],_c14=[],_c15=[];
_c05.forEach(_c12,function(node){
var ary=node.getTreePath(),_c16=this.tree.model;
_c14.push(node);
_c13.push(ary);
ary=_c05.map(ary,function(item){
return _c16.getIdentity(item);
},this);
_c15.push(ary.join("/"));
},this);
var _c17=_c05.map(_c14,function(node){
return node.item;
});
this.tree._set("paths",_c13);
this.tree._set("path",_c13[0]||[]);
this.tree._set("selectedNodes",_c14);
this.tree._set("selectedNode",_c14[0]||null);
this.tree._set("selectedItems",_c17);
this.tree._set("selectedItem",_c17[0]||null);
if(this.tree.persist&&_c15.length>0){
_c0a(this.cookieName,_c15.join(","),{expires:365});
}
},_getSavedPaths:function(){
var tree=this.tree;
if(tree.persist&&tree.dndController.cookieName){
var oreo,_c18=[];
oreo=_c0a(tree.dndController.cookieName);
if(oreo){
_c18=_c05.map(oreo.split(","),function(path){
return path.split("/");
});
}
return _c18;
}
},onMouseDown:function(e){
if(!this.current||this.tree.isExpandoNode(e.target,this.current)){
return;
}
if(e.type!="touchstart"&&!_c0b.isLeft(e)){
return;
}
e.preventDefault();
var _c19=this.current,copy=_c06.isCopyKey(e),id=_c19.id;
if(!this.singular&&!e.shiftKey&&this.selection[id]){
this._doDeselect=true;
return;
}else{
this._doDeselect=false;
}
this.userSelect(_c19,copy,e.shiftKey);
},onMouseUp:function(e){
if(!this._doDeselect){
return;
}
this._doDeselect=false;
this.userSelect(this.current,_c06.isCopyKey(e),e.shiftKey);
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
},userSelect:function(node,_c1a,_c1b){
if(this.singular){
if(this.anchor==node&&_c1a){
this.selectNone();
}else{
this.setSelection([node]);
this.anchor=node;
}
}else{
if(_c1b&&this.anchor){
var cr=this._compareNodes(this.anchor.rowNode,node.rowNode),_c1c,end,_c1d=this.anchor;
if(cr<0){
_c1c=_c1d;
end=node;
}else{
_c1c=node;
end=_c1d;
}
var _c1e=[];
while(_c1c!=end){
_c1e.push(_c1c);
_c1c=this.tree._getNextNode(_c1c);
}
_c1e.push(end);
this.setSelection(_c1e);
}else{
if(this.selection[node.id]&&_c1a){
this.removeTreeNode(node);
}else{
if(_c1a){
this.addTreeNode(node,true);
}else{
this.setSelection([node]);
this.anchor=node;
}
}
}
}
},getItem:function(key){
var _c1f=this.selection[key];
return {data:_c1f,type:["treeNode"]};
},forInSelectedItems:function(f,o){
o=o||_c09.global;
for(var id in this.selection){
f.call(o,this.getItem(id),id,this);
}
}});
});
},"davinci/html/HTMLItem":function(){
define(["dojo/_base/declare","davinci/html/HTMLModel"],function(_c20,_c21){
return _c20("davinci.html.HTMLItem",_c21,{constructor:function(){
this.elementType="HTMLItem";
},getLabel:function(){
return this.getText({indent:0});
},onChange:function(arg){
if(this.parent){
if(arg){
this.parent.onChange(arg);
}
}
},_addWS:function(_c22,_c23){
_c22=_c22||0;
_c23=_c23||0;
var res=[];
for(var i=0;i<_c22;i++){
res.push("\n");
}
res.push("                                          ".substring(0,_c23));
return res.join("");
},close:function(){
for(var i=0;i<this.children.length;i++){
this.children[i].close();
}
},getID:function(){
return this.parent.getID()+":"+this.startOffset+":"+this.getLabel();
},getHTMLFile:function(){
var _c24=this;
while(_c24&&_c24.elementType!="HTMLFile"){
_c24=_c24.parent;
}
return _c24;
}});
});
},"davinci/ve/widget":function(){
define(["davinci/html/HTMLElement","davinci/ve/metadata","dojo/Deferred","davinci/ve/DijitWidget","davinci/ve/GenericWidget","davinci/ve/HTMLWidget","davinci/ve/ObjectWidget","dojo/window"],function(_c25,_c26,_c27){
var _c28={};
var _c29=function(_c2a,node,_c2b){
for(var i=0;i<_c2b.children.length;i++){
var _c2c=node.childNodes[i];
var _c2d=_c2b.children[i];
if((_c2c&&_c2c.nodeType==1)&&_c2d.elementType=="HTMLElement"){
_c2c.id=_c2a.getUniqueID(_c2d);
_c29(_c2a,_c2c,_c2d);
}
}
};
var _c2e=function(node,_c2f){
if(!node){
return undefined;
}
_c2f=_c2f||{};
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
var _c30={_dojo:function(node){
var doc=node?(node.ownerDocument||node):dojo.doc;
doc=doc||dojo.doc;
var win=dojo.window.get(doc);
return win.dojo||dojo;
},_dijit:function(node){
var doc=node?(node.ownerDocument||node):dojo.doc;
var win=dojo.window.get(doc);
return win.dijit||dijit;
},parseStyleValues:function(text){
var _c31=[];
if(text){
dojo.forEach(text.split(";"),function(s){
var i=s.indexOf(":");
if(i>0){
var n=s.substring(0,i).trim();
var v=s.substring(i+1).trim();
var o={};
o[n]=v;
_c31.push(o);
}
});
}
return _c31;
},retrieveStyleProperty:function(_c32,_c33,_c34){
var _c35=_c34;
if(_c32){
dojo.some(_c32,function(o){
if(o.hasOwnProperty(_c33)){
_c35=o[_c33];
return true;
}
});
}
return _c35;
},setStyleProperty:function(_c36,_c37,_c38){
var _c39=false;
if(_c36){
dojo.some(_c36,function(o){
if(o.hasOwnProperty(_c37)){
o[_c37]=_c38;
_c39=true;
return true;
}
});
}
if(!_c39){
var o={};
o[_c37]=_c38;
_c36.push(o);
}
},getStyleString:function(_c3a){
var _c3b="";
dojo.forEach(_c3a,function(_c3c){
for(var p in _c3c){
if(_c3c[p]){
_c3b=_c3b+p+":"+_c3c[p]+";";
}
}
});
return _c3b;
},getEnclosingWidget:function(node){
var _c3d=_c30.getEnclosingWidgetForRichText(node);
if(_c3d){
return _c3d;
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
return _c30.getEnclosingWidgetForRichText(node.parentNode);
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
var dj=_c30._dojo(node);
while(dj.getObject(id)||dj.byId(id)){
id=base+"_"+i++;
}
return id;
},_remove_prefix:function(str){
var _c3e=str;
var _c3f=["dijit.form.","dijit.layout.","dijit.","dojox.mobile.","html.","OpenAjax."];
for(var i=0;i<_c3f.length;i++){
if(str.indexOf(_c3f[i])==0){
_c3e=str.substr(_c3f[i].length);
if(_c3f[i]=="html."){
_c3e="&lt;"+_c3e+"&gt;";
}
break;
}
}
return _c3e;
},_getWidgetNameText:function(type){
var text="<span class='propertiesTitleWidgetName'>";
text+=this._remove_prefix(type);
text+="</span> ";
return text;
},_getWidgetClassText:function(id,_c40){
var text="<span class='propertiesTitleClassName'>";
if(id){
text+="#"+id;
}
if(_c40){
text+="."+_c40.replace(/\s+/g,".");
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
},getLabel:function(_c41){
var text=this._getWidgetNameText(_c41.type);
var _c42,_c43=_c30.getWidgetHelper(_c41.type);
if(_c43&&_c43.getWidgetText){
_c42=_c43.getWidgetText(_c41);
}
var _c44=_c41.domNode;
switch(_c41.type){
case "dijit.form.ComboBox":
case "dijit.form.Button":
_c42=_c41.attr("label");
break;
case "dijit.layout.ContentPane":
_c42=_c41.attr("title");
break;
case "html.label":
_c42=_c44.innerHTML;
break;
case "html.img":
_c42=_c44.alt;
if(!_c42){
_c42=_c44.title;
}
}
if(_c42){
text+="<span class='propertiesTitleWidgetText'>"+_c42+"</span> ";
}
if(_c43&&_c43.getWidgetDescriptor){
text+=" <span class='propertiesTitleWidgetDescriptor'>"+_c43.getWidgetDescriptor(_c41)+"</span> ";
}
var _c45=_c41._srcElement;
var id=_c41.getId();
var _c46=_c45&&_c45.getAttribute("class");
var _c47=_c46&&_c46.trim();
if(id||_c47){
text+=this._getWidgetClassText(id,_c47);
}
if(_c43&&_c43.getWidgetTextExtra){
text+=_c43.getWidgetTextExtra(_c41);
}
if(_c41.type=="html.img"){
text+="<span>"+_c44.src.substr(_c44.src.lastIndexOf("/")+1)+"</span>";
}
return text;
},byId:function(id,doc){
var node=dojo.byId(id,doc&&doc.body?doc:undefined);
if(node){
if(node._dvWidget){
return node._dvWidget;
}
var _c48=_c30.getEnclosingWidget(node);
if(_c48.id==id){
return _c48;
}
}
if(davinci.Runtime.currentEditor&&davinci.Runtime.currentEditor.currentEditor&&davinci.Runtime.currentEditor.currentEditor.context){
var _c49=davinci.Runtime.currentEditor.currentEditor.context;
return _c49.widgetHash[id];
}
return undefined;
},byNode:function(node){
if(node._dvWidget){
return node._dvWidget;
}
},createWidget:function(_c4a){
if(!_c4a||!_c4a.type){
return undefined;
}
var data=dojo.mixin({},_c4a);
if(data.properties){
data.properties=dojo.mixin({},_c4a.properties);
}
var type=data.type,c,_c4b,_c4c,md=_c26.query(type);
if(!md){
return undefined;
}
if(data.properties){
if("content" in data.properties&&!data.properties.content){
delete data.properties.content;
}
if(data.properties.theme){
_c4b=data.properties.theme.themeName;
}
}
var _c4d=_c26.queryDescriptor(type,"widgetClass");
var _c4e;
if(_c4d=="object"){
_c4c=type;
_c4e="davinci.ve.ObjectWidget";
md.attributes=md.attributes||{};
md.attributes.dojoType=_c4c;
}else{
if(_c4d=="html"){
_c4e="davinci.ve.HTMLWidget";
}else{
if(_c4d=="dijit"){
_c4e="davinci.ve.DijitWidget";
}else{
_c4e="davinci.ve.GenericWidget";
}
}
}
if(!_c4e){
return undefined;
}
c=dojo.getObject(_c4e);
var _c4f=md.content.trim().replace(/\s+/g," ");
var node=dojo.window.get(dojo.doc).dojo._toDom(_c4f);
if(node.nodeType===11){
var _c50=0,n=null,_c51=node.childNodes;
for(var i=0;i<_c51.length;i++){
if(_c51[i].nodeType!==8){
_c50++;
n=_c51[i];
if(_c50>1){
break;
}
}
}
if(_c50>1){
console.error("ERROR: complex widget content not supported");
return;
}
node=n;
}
var _c52=new _c25(node.tagName.toLowerCase());
if(node.hasAttributes()){
var _c53=node.attributes;
for(var j=_c53.length-1;j>=0;--j){
_c52.addAttribute(_c53[j].name,_c53[j].value);
}
}
if(node.innerHTML){
_c52.addText(node.innerHTML);
}
var _c54=_c26.queryDescriptor(type,"requiresId"),name=_c26.queryDescriptor(type,"name"),_c55=_c54&&name.match(/^[A-Za-z]\w*$/)?name:undefined;
node.id=(data.properties&&data.properties.id)||data.context.getUniqueID(_c52,_c55);
var _c51=data.children;
if(_c51){
if(dojo.isString(_c51)){
node.innerHTML=_c51;
var _c56=node.nodeName.toLowerCase();
var _c57=_c52._getAttribute("id");
_c52.addText(_c51);
var _c58=_c52.getText(data.context);
_c52.children=[];
_c52.setText(_c58);
if(_c57){
_c52.addAttribute(_c57.name,_c57.value,_c57.noPersist);
}
_c29(data.context,node,_c52);
}else{
dojo.forEach(_c51,function(c){
if(!c){
return;
}
if(dojo.isString(c)){
if(c.length>7&&c.substring(0,4)=="<!--"&&c.substring(c.length-3)=="-->"){
node.appendChild(dojo.doc.createComment(c.substring(4,c.length-3)));
_c52.addComment(c.substring(4,c.length-3));
}else{
node.appendChild(dojo.doc.createTextNode(c));
_c52.addText(c);
}
}else{
c.context=data.context;
var _c59=_c30.createWidget(c);
if(_c59){
node.appendChild(_c59.domNode);
_c52.addChild(_c59._srcElement);
}
}
});
}
}
var _c5a=_c30.getWidgetHelper(type);
if(_c5a&&_c5a.preProcessData){
data=_c5a.preProcessData(data);
}
var _c5b={};
var _c5c={};
for(var p in data.properties){
var _c5d=data.properties[p];
if(_c5d!=null){
if(p.substr(0,2).toLowerCase()!="on"){
_c5b[p]=_c5d;
}else{
_c5c[p]=_c5d;
}
}
}
var _c5e=new c(_c5b,node,type,md,_c52);
_c5e._srcElement=_c52;
if(_c5e.chart&&(data.properties&&data.properties.theme)){
_c5e.chart.theme.themeName=_c4b;
}
if(data.scripts){
_c5e.scripts=data.scripts;
}
if(data.context){
_c5e._edit_context=data.context;
}
if(data.properties){
_c5e.setProperties(_c5b);
_c5e.setProperties(_c5c,true);
}
if(data.maqAppStates||data.maqDeltas){
if(data.maqAppStates){
_c5e.domNode._maqAppStates=dojo.clone(data.maqAppStates);
}
if(data.maqDeltas){
_c5e.domNode._maqDeltas=dojo.clone(data.maqDeltas);
}
var obj=davinci.states.serialize(_c5e.domNode);
if(obj.maqAppStates){
_c5e._srcElement.addAttribute(davinci.states.APPSTATES_ATTRIBUTE,obj.maqAppStates);
}
if(obj.maqDeltas){
_c5e._srcElement.addAttribute(davinci.states.DELTAS_ATTRIBUTE,obj.maqDeltas);
}
}
var _c5a=_c30.getWidgetHelper(type);
if(_c5a&&_c5a.cleanSrcElement){
_c5a.cleanSrcElement(_c5e._srcElement);
}
return _c5e;
},_createSrcElement:function(node){
var _c5f=new _c25(node.tagName.toLowerCase());
if(node.hasAttributes()){
var _c60=node.attributes;
for(var j=_c60.length-1;j>=0;--j){
_c5f.addAttribute(_c60[j].name,_c60[j].value);
}
}
return _c5f;
},getWidgetHelper:function(type){
return _c28[type];
},requireWidgetHelper:function(type){
var d=new _c27();
_c26.getHelper(type,"helper").then(function(_c61){
if(_c61){
d.resolve(_c28[type]=new _c61());
}else{
d.resolve();
}
});
return d;
},getWidget:function(node){
if(!node||node.nodeType!=1){
return undefined;
}
var _c62=_c30.byNode(node);
if(!_c62){
var ctor;
var data=_c2e(node);
var _c63=node.getAttribute("dvwidget");
if(node.hasAttribute("widgetid")||node.hasAttribute("data-dojo-type")||node.hasAttribute("dojotype")){
var d=_c30._dijit(node);
var w=d.byNode(node);
if(w){
_c62=new davinci.ve.DijitWidget(data,node,w);
}else{
_c62=new davinci.ve.ObjectWidget(data,node);
}
}else{
if(_c63){
_c62=new davinci.ve.GenericWidget(data,node,_c63);
}else{
if(node.nodeName=="svg"){
return undefined;
}
_c62=new davinci.ve.HTMLWidget(data,node);
}
}
}
return _c62;
}};
dojo.setObject("davinci.ve.widget",_c30);
return _c30;
});
},"davinci/review/view/CommentExplorerView":function(){
define(["dojo/_base/declare","davinci/Runtime","davinci/review/model/ReviewTreeModel","davinci/Workbench","davinci/workbench/ViewPart","dijit/Tree","dojo/date/stamp","dojo/date/locale","davinci/review/actions/CloseVersionAction","davinci/review/actions/EditVersionAction","davinci/review/actions/OpenVersionAction","dijit/Toolbar","dijit/ToolbarSeparator","dijit/form/Button","dijit/form/TextBox","dojo/i18n!./nls/view","dojo/i18n!../widgets/nls/widgets","davinci/ui/widgets/TransformTreeMixin"],function(_c64,_c65,_c66,_c67,_c68,Tree,_c69,_c6a,_c6b,_c6c,_c6d,_c6e,_c6f,_c70,_c71,_c72,_c73){
var _c74=function(item,_c75){
if(item.elementType=="ReviewVersion"){
if(item.isDraft){
return "draft-open";
}
if(item.closed){
return _c75?"reviewFolder-open-disabled":"reviewFolder-closed-disabled";
}
if(!item.closed){
return _c75?"reviewFolder-open":"reviewFolder-closed";
}
}
if(item.elementType=="ReviewFile"){
if(item.parent.closed){
return "disabledReviewFileIcon";
}
var icon;
var _c76=item.getExtension();
var _c77=_c65.getExtension("davinci.fileType",function(_c78){
return _c78.extension==_c76;
});
if(_c77){
icon=_c77.iconClass;
}
return icon||"dijitLeaf";
}
return "dijitLeaf";
};
getLabelClass=function(item,_c79){
var _c7a="dijitTreeLabel";
if(item.elementType=="ReviewVersion"){
if(item.designerId==_c65.userName){
_c7a="reviewOwnedByUserLabel";
}else{
_c7a="reviewOwnedByOtherLabel";
}
}
return _c7a;
};
var _c7b=function(){
return [function(_c7c){
return _c7c.sort(function(_c7d,_c7e){
return _c7d.timeStamp>_c7e.timeStamp?-1:_c7d.timeStamp<_c7e.timeStamp?1:0;
});
}];
};
var _c7f=_c64(_c68,{postCreate:function(){
this.inherited(arguments);
var _c80=new _c66();
this.model=_c80;
var _c81=_c7b();
_c81.push(function(_c82){
return _c82.filter(this.commentingFilter.filterItem,this);
}.bind(this));
this.tree=new Tree({id:"reviewCommentExplorerViewTree",persist:false,showRoot:false,model:_c80,labelAttr:"name",childrenAttrs:"children",getIconClass:dojo.hitch(this,this._getIconClass),getLabelClass:dojo.hitch(this,this._getLabelClass),transforms:_c81,isMultiSelect:true});
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
this.subscribe("/davinci/review/resourceChanged",function(_c83,type,_c84){
if(_c84&&_c84.timeStamp){
davinci.review.model.resource.root.findVersion(_c84.timeStamp).then(function(node){
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
var _c85=_c67.createPopup({partID:"davinci.review.reviewNavigator",context:this,domNode:this.tree.domNode,openCallback:function(_c86){
var w=dijit.getEnclosingWidget(_c86.target);
if(!w||!w.item){
return;
}
this.tree.set("path",this._buildTreePath(w.item));
}.bind(this)});
var o=_c67.getActionSets("davinci.review.reviewNavigator");
var _c87=o.clonedActionSets;
if(_c87&&_c87.length==1){
dojo.forEach(_c87[0].actions,dojo.hitch(this,function(_c88){
if(_c88.keyBinding){
if(!this.keyBindings){
this.keyBindings=[];
}
this.keyBindings.push({keyBinding:_c88.keyBinding,action:_c88});
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
var _c89=obj.editor;
if(_c89&&_c89.editorID==="davinci.review.CommentReviewEditor"){
var _c8a=_c89.resourceFile;
var _c8b=_c8a.parent;
dojo.forEach(this.model.root.children,function(_c8c){
if(_c8c!=_c8b){
var _c8d=this.tree.getNodesByItem(_c8c);
if(_c8d.length>0){
var _c8e=_c8d[0];
if(_c8e.isExpanded){
this.tree._collapseNode(_c8e);
}
}
}
}.bind(this));
this.tree.set("path",this._buildTreePath(_c8a));
}
}.bind(this));
},_buildTreePath:function(item){
var path=[];
for(var _c8f=item;_c8f;_c8f=_c8f.parent){
path.unshift(_c8f);
}
return path;
},_updateActionBar:function(item,_c90){
if(_c90!=this||!item||!item.length){
this.closeBtn.set("disabled",true);
this.editBtn.set("disabled",true);
return;
}
var _c91=item[0].resource.elementType=="ReviewFile"?item[0].resource.parent:item[0].resource;
_c65.reviewers=_c91.reviewers||[];
var _c92=_c91.designerId==_c65.userName;
var _c93=_c91.elementType=="ReviewVersion";
var _c94=_c91.isDraft;
this.closeBtn.set("disabled",!_c92||!_c93||_c91.closed||_c94);
this.openBtn.set("disabled",!_c92||!_c93||!_c91.closedManual||_c94);
this.editBtn.set("disabled",!_c92||!_c93);
},getTopAdditions:function(){
var _c95=new _c6e({},dojo.create("div"));
var _c96=new _c70({id:_c95.get("id")+".Close",showLabel:false,label:_c72.closeVersion,disabled:true,iconClass:"viewActionIcon closeVersionIcon",onClick:dojo.hitch(this,"_closeVersion")});
this.closeBtn=_c96;
var _c97=new _c70({id:_c95.get("id")+".Open",showLabel:false,label:_c72.openVersion,disabled:true,iconClass:"viewActionIcon openVersionIcon",onClick:dojo.hitch(this,"_openVersion")});
this.openBtn=_c97;
var _c98=new _c70({id:_c95.get("id")+".Edit",showLabel:false,label:_c72.editVersion,disabled:true,iconClass:"viewActionIcon editVersionIcon",onClick:dojo.hitch(this,"_editVersion")});
this.editBtn=_c98;
var _c99=new _c71({id:"reviewExplorerFilter",placeHolder:_c72.filter,onKeyUp:dojo.hitch(this,this._filter)});
_c95.addChild(_c96);
_c95.addChild(_c97);
_c95.addChild(new dijit.ToolbarSeparator());
_c95.addChild(_c98);
dojo.place(dojo.create("br"),_c95.domNode);
_c95.addChild(_c99);
dojo.addClass(_c95.domNode,"davinciCommentExplorer");
return _c95.domNode;
},_closeVersion:function(){
(new _c6b()).run(this);
},_openVersion:function(){
(new _c6d()).run(this);
},_editVersion:function(){
(new _c6c()).run(this);
},_filter:function(e){
var text=dijit.byId("reviewExplorerFilter").get("value");
this.commentingFilter.filterString=text;
dojo.forEach(this.model.root.children,dojo.hitch(this,function(item){
item.getChildren(function(_c9a){
this.model.onChildrenChange(item,_c9a);
}.bind(this));
}));
},commentingFilter:{filterString:"",filterItem:function(item){
var _c9b=this.commentingFilter.filterString;
if(!_c9b){
return true;
}else{
if(item.elementType=="ReviewFile"){
return item.name.toLowerCase().indexOf(_c9b.toLowerCase())>=0;
}
return true;
}
}},destroy:function(){
this.inherited(arguments);
},_dblClick:function(node){
if(node.isDraft||node.parent.isDraft){
if(node.designerId==_c65.userName||node.parent.designerId==_c65.userName){
this._openPublishWizard(node.isDraft?node:node.parent);
}
return;
}
if(node.elementType=="ReviewFile"){
_c67.openEditor({fileName:node,content:node.getText()});
}
},_location:function(){
var _c9c=document.location.href;
var _c9d=_c9c.split("?");
var _c9e=_c9d[0].match(/http:\/\/.+:\d+\//);
return _c9e;
},_click:function(node){
this._publishSelectionChanges();
},_publishSelectionChanges:function(){
var _c9f=this.getSelection();
this.publish("/davinci/review/selectionChanged",[_c9f,this]);
},getSelection:function(){
var _ca0=dojo.map(this.tree.get("selectedItems"),function(item){
return {resource:item};
});
return _ca0;
},_over:function(node){
if(node.item.elementType!="ReviewVersion"){
return;
}
if(!this._showTimer){
var item=node.item,_ca1={},c;
_ca1.detail_title=item.name;
_ca1.your_role=_c73.yourRole;
_ca1.due_by=_c73.dueBy;
_ca1.created_by=_c73.createdBy;
_ca1.creation_date=_c73.creationDate;
_ca1.artifacts_in_rev=_c73.artifactsInRev;
_ca1.reviewers=_c73.reviewers;
_ca1.detail_role=(item.designerId==davinci.Runtime.userName)?_c72.designer:_c72.reviewer;
_ca1.detail_dueDate=item.dueDate=="infinite"?_c72.infinite:_c6a.format(item.dueDate,{selector:"date",formatLength:"long"});
var _ca2=_c65.getUserDisplayNamePlusEmail({email:item.designerEmail,userFirstName:item.designerFirstName,userId:item.designerId,userLastName:item.designerLastName});
_ca1.detail_creator=_ca2;
var _ca3=_c69.fromISOString(item.timeStamp);
_ca1.detail_creationDate=_c6a.format(_ca3,{formatLength:"medium"});
_ca1.detail_files="";
item.getChildren(function(_ca4){
dojo.forEach(_ca4,function(i){
var _ca5=i.getLabel();
_ca1.detail_files+="<div><span>"+_ca5.substr(0,_ca5.length-4)+"</span><span class='dijitTreeIcon reviewFileIcon detail_file'></span></div>";
});
_ca1.detail_reviewers="";
dojo.forEach(item.reviewers,function(i){
if(i.email!=item.designerEmail){
_ca1.detail_reviewers+="<div>"+i.email+"</div>";
}
});
item.closed?_ca1.detail_dueDate_class="closed":_ca1.detail_dueDate_class="notClosed";
this._showTimer=setTimeout(dojo.hitch(this,function(){
if(this._delTimer){
clearTimeout(this._delTimer);
delete this._delTimer;
}
dijit.showTooltip(dojo.string.substitute(this.infoCardContent,_ca1),node.rowNode);
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
var _ca6=new davinci.review.actions.PublishAction(node);
_ca6.run();
},_getIconClass:function(item,_ca7){
return _c74(item,_ca7);
},_getLabelClass:function(item,_ca8){
return getLabelClass(item,_ca8);
},_onKeyPress:function(e){
var _ca9=dojo.some(this.keyBindings,dojo.hitch(this,function(_caa){
if(_c65.isKeyEqualToEvent(_caa.keyBinding,e)){
davinci.Workbench._runAction(_caa.action,this,_caa.action.id);
return true;
}
}));
if(_ca9){
dojo.stopEvent(e);
}
return _ca9;
}});
_c7f.getIconClass=_c74;
_c7f.getLabelClass=getLabelClass;
_c7f.getSortTransforms=_c7b;
return _c7f;
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","dijit/layout/StackController":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","../focus","../registry","../_Widget","../_TemplatedMixin","../_Container","../form/ToggleButton","dojo/i18n!../nls/common"],function(_cab,_cac,_cad,_cae,keys,lang,on,_caf,_cb0,_cb1,_cb2,_cb3,_cb4){
var _cb5=_cac("dijit.layout._StackButton",_cb4,{tabIndex:"-1",closeButton:false,_aria_attr:"aria-selected",buildRendering:function(evt){
this.inherited(arguments);
(this.focusNode||this.domNode).setAttribute("role","tab");
}});
var _cb6=_cac("dijit.layout.StackController",[_cb1,_cb2,_cb3],{baseClass:"dijitStackController",templateString:"<span role='tablist' data-dojo-attach-event='onkeypress'></span>",containerId:"",buttonWidget:_cb5,buttonWidgetCloseClass:"dijitStackCloseButton",constructor:function(_cb7){
this.pane2button={};
},postCreate:function(){
this.inherited(arguments);
this.subscribe(this.containerId+"-startup","onStartup");
this.subscribe(this.containerId+"-addChild","onAddChild");
this.subscribe(this.containerId+"-removeChild","onRemoveChild");
this.subscribe(this.containerId+"-selectChild","onSelectChild");
this.subscribe(this.containerId+"-containerKeyPress","onContainerKeyPress");
this.connect(this.containerNode,"click",function(evt){
var _cb8=_cb0.getEnclosingWidget(evt.target);
if(_cb8!=this.containerNode&&!_cb8.disabled&&_cb8.page){
for(var _cb9=evt.target;_cb9!==this.containerNode;_cb9=_cb9.parentNode){
if(_cad.contains(_cb9,this.buttonWidgetCloseClass)){
this.onCloseButtonClick(_cb8.page);
break;
}else{
if(_cb9==_cb8.domNode){
this.onButtonClick(_cb8.page);
break;
}
}
}
}
});
},onStartup:function(info){
_cab.forEach(info.children,this.onAddChild,this);
if(info.selected){
this.onSelectChild(info.selected);
}
var _cba=_cb0.byId(this.containerId).containerNode,_cbb=this.pane2button,_cbc={"title":"label","showtitle":"showLabel","iconclass":"iconClass","closable":"closeButton","tooltip":"title","disabled":"disabled"},_cbd=function(attr,_cbe){
return on(_cba,"attrmodified-"+attr,function(evt){
var _cbf=_cbb[evt.detail&&evt.detail.widget&&evt.detail.widget.id];
if(_cbf){
_cbf.set(_cbe,evt.detail.newValue);
}
});
};
for(var attr in _cbc){
this.own(_cbd(attr,_cbc[attr]));
}
},destroy:function(){
for(var pane in this.pane2button){
this.onRemoveChild(_cb0.byId(pane));
}
this.inherited(arguments);
},onAddChild:function(page,_cc0){
var Cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
var _cc1=new Cls({id:this.id+"_"+page.id,name:this.id+"_"+page.id,label:page.title,disabled:page.disabled,ownerDocument:this.ownerDocument,dir:page.dir,lang:page.lang,textDir:page.textDir,showLabel:page.showTitle,iconClass:page.iconClass,closeButton:page.closable,title:page.tooltip,page:page});
this.addChild(_cc1,_cc0);
this.pane2button[page.id]=_cc1;
page.controlButton=_cc1;
if(!this._currentChild){
this.onSelectChild(page);
}
},onRemoveChild:function(page){
if(this._currentChild===page){
this._currentChild=null;
}
var _cc2=this.pane2button[page.id];
if(_cc2){
this.removeChild(_cc2);
delete this.pane2button[page.id];
_cc2.destroy();
}
delete page.controlButton;
},onSelectChild:function(page){
if(!page){
return;
}
if(this._currentChild){
var _cc3=this.pane2button[this._currentChild.id];
_cc3.set("checked",false);
_cc3.focusNode.setAttribute("tabIndex","-1");
}
var _cc4=this.pane2button[page.id];
_cc4.set("checked",true);
this._currentChild=page;
_cc4.focusNode.setAttribute("tabIndex","0");
var _cc5=_cb0.byId(this.containerId);
_cc5.containerNode.setAttribute("aria-labelledby",_cc4.id);
},onButtonClick:function(page){
var _cc6=this.pane2button[page.id];
_caf.focus(_cc6.focusNode);
if(this._currentChild&&this._currentChild.id===page.id){
_cc6.set("checked",true);
}
var _cc7=_cb0.byId(this.containerId);
_cc7.selectChild(page);
},onCloseButtonClick:function(page){
var _cc8=_cb0.byId(this.containerId);
_cc8.closeChild(page);
if(this._currentChild){
var b=this.pane2button[this._currentChild.id];
if(b){
_caf.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_cc9){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_cc9=!_cc9;
}
var _cca=this.getChildren();
var idx=_cab.indexOf(_cca,this.pane2button[this._currentChild.id]),_ccb=_cca[idx];
var _ccc;
do{
idx=(idx+(_cc9?1:_cca.length-1))%_cca.length;
_ccc=_cca[idx];
}while(_ccc.disabled&&_ccc!=_ccb);
return _ccc;
},onkeypress:function(e){
if(this.disabled||e.altKey){
return;
}
var _ccd=null;
if(e.ctrlKey||!e._djpage){
switch(e.charOrCode){
case keys.LEFT_ARROW:
case keys.UP_ARROW:
if(!e._djpage){
_ccd=false;
}
break;
case keys.PAGE_UP:
if(e.ctrlKey){
_ccd=false;
}
break;
case keys.RIGHT_ARROW:
case keys.DOWN_ARROW:
if(!e._djpage){
_ccd=true;
}
break;
case keys.PAGE_DOWN:
if(e.ctrlKey){
_ccd=true;
}
break;
case keys.HOME:
var _cce=this.getChildren();
for(var idx=0;idx<_cce.length;idx++){
var _ccf=_cce[idx];
if(!_ccf.disabled){
this.onButtonClick(_ccf.page);
break;
}
}
_cae.stop(e);
break;
case keys.END:
var _cce=this.getChildren();
for(var idx=_cce.length-1;idx>=0;idx--){
var _ccf=_cce[idx];
if(!_ccf.disabled){
this.onButtonClick(_ccf.page);
break;
}
}
_cae.stop(e);
break;
case keys.DELETE:
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_cae.stop(e);
break;
default:
if(e.ctrlKey){
if(e.charOrCode===keys.TAB){
this.onButtonClick(this.adjacent(!e.shiftKey).page);
_cae.stop(e);
}else{
if(e.charOrCode=="w"){
if(this._currentChild.closable){
this.onCloseButtonClick(this._currentChild);
}
_cae.stop(e);
}
}
}
}
if(_ccd!==null){
this.onButtonClick(this.adjacent(_ccd).page);
_cae.stop(e);
}
}
},onContainerKeyPress:function(info){
info.e._djpage=info.page;
this.onkeypress(info.e);
}});
_cb6.StackButton=_cb5;
return _cb6;
});
},"dijit/form/DateTextBox":function(){
define(["dojo/_base/declare","../Calendar","./_DateTimeTextBox"],function(_cd0,_cd1,_cd2){
return _cd0("dijit.form.DateTextBox",_cd2,{baseClass:"dijitTextBox dijitComboBox dijitDateTextBox",popupClass:_cd1,_selector:"date",value:new Date("")});
});
},"davinci/model/resource/Marker":function(){
define(["dojo/_base/declare","davinci/model/resource/Resource"],function(_cd3,_cd4){
return _cd3("davinci.model.resource.Marker",_cd4,{constructor:function(_cd5,type,line,text){
this.resource=_cd5;
this.type=type;
this.line=line;
this.text=text;
}});
});
},"davinci/ve/actions/ContextAction":function(){
define(["dojo/_base/declare","davinci/actions/Action"],function(_cd6,_cd7){
return _cd6("davinci.ve.actions.ContextAction",[_cd7],{_normalizeSelection:function(_cd8){
var _cd9=_cd8.getSelection();
if(_cd9.length<2){
return _cd9;
}
var _cda=_cd8.rootWidget;
var _cdb=[];
dojo.forEach(_cd9,function(w){
var p=w.getParent();
while(p&&p!=_cda){
for(var i=0;i<_cd9.length;i++){
if(_cd9[i]==p){
_cd8.deselect(w);
return;
}
}
p=p.getParent();
}
_cdb.push(w);
});
return _cdb;
},_getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},_getContext:function(_cdc){
if(_cdc){
return _cdc;
}
var _cdd=this._getEditor();
return _cdd&&(_cdd.getContext&&_cdd.getContext()||_cdd.context);
},fixupContext:function(_cde){
var obj=this._getContext(_cde);
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
define(["dojo/_base/declare","dijit/_Templated","dijit/_Widget","dijit/Tree","davinci/review/view/CommentExplorerView","davinci/review/model/ReviewTreeModel","davinci/Workbench","dojo/i18n!davinci/ui/nls/ui","dojo/i18n!dijit/nls/common","dojo/text!./templates/OpenReviewDialog.html","dijit/form/Button","dijit/layout/ContentPane"],function(_cdf,_ce0,_ce1,Tree,_ce2,_ce3,_ce4,_ce5,_ce6,_ce7){
return _cdf("davinci.ui.widgets.OpenFile",[_ce1,_ce0],{widgetsInTemplate:true,templateString:_ce7,fileDialogFileName:null,fileDialogParentFolder:null,postMixInProperties:function(){
dojo.mixin(this,_ce5);
dojo.mixin(this,_ce6);
if(!this.finishButtonLabel){
this.finishButtonLabel=_ce5.open;
}
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
var _ce8=new _ce3();
this.model=_ce8;
var tree=this.tree=new Tree({id:"openReviewDialogTree",persist:false,showRoot:false,model:_ce8,labelAttr:"name",childrenAttrs:"children",getIconClass:_ce2.getIconClass,getLabelClass:_ce2.getLabelClass,transforms:_ce2.getSortTransforms()});
this.treeContentPane.set("content",tree);
tree.watch("selectedItems",dojo.hitch(this,this._updateFields));
},startup:function(){
this.tree.startup();
},_updateFields:function(){
this.okButton.set("disabled",true);
this._selectedResource=null;
var _ce9=this.tree.get("selectedItems");
if(_ce9&&_ce9.length==1){
var _cea=_ce9[0];
if(_cea.elementType=="ReviewFile"){
this.okButton.set("disabled",false);
this._selectedResource=_cea;
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
},resize:function(_ceb){
this.treeContentPane.resize(_ceb);
},onClose:function(){
}});
});
},"dijit/form/_AutoCompleterMixin":function(){
define(["dojo/data/util/filter","dojo/_base/declare","dojo/dom-attr","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/query","dojo/regexp","dojo/sniff","dojo/string","./DataList","../registry","./_TextBoxMixin","./_SearchMixin"],function(_cec,_ced,_cee,_cef,keys,lang,_cf0,_cf1,has,_cf2,_cf3,_cf4,_cf5,_cf6){
return _ced("dijit.form._AutoCompleterMixin",_cf6,{item:null,autoComplete:true,highlightMatch:"first",labelAttr:"",labelType:"text",maxHeight:-1,_stopClickEvents:false,_getCaretPos:function(_cf7){
var pos=0;
if(typeof (_cf7.selectionStart)=="number"){
pos=_cf7.selectionStart;
}else{
if(has("ie")){
var tr=_cf7.ownerDocument.selection.createRange().duplicate();
var ntr=_cf7.createTextRange();
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
},_setCaretPos:function(_cf8,_cf9){
_cf9=parseInt(_cf9);
_cf5.selectInputText(_cf8,_cf9,_cf9);
},_setDisabledAttr:function(_cfa){
this.inherited(arguments);
this.domNode.setAttribute("aria-disabled",_cfa?"true":"false");
},_onKey:function(evt){
if(evt.charCode>=32){
return;
}
var key=evt.charCode||evt.keyCode;
if(key==keys.ALT||key==keys.CTRL||key==keys.META||key==keys.SHIFT){
return;
}
var pw=this.dropDown;
var _cfb=null;
this._abortQuery();
this.inherited(arguments);
if(evt.altKey||evt.ctrlKey||evt.metaKey){
return;
}
if(this._opened){
_cfb=pw.getHighlightedOption();
}
switch(key){
case keys.PAGE_DOWN:
case keys.DOWN_ARROW:
case keys.PAGE_UP:
case keys.UP_ARROW:
if(this._opened){
this._announceOption(_cfb);
}
_cef.stop(evt);
break;
case keys.ENTER:
if(_cfb){
if(_cfb==pw.nextButton){
this._nextSearch(1);
_cef.stop(evt);
break;
}else{
if(_cfb==pw.previousButton){
this._nextSearch(-1);
_cef.stop(evt);
break;
}
}
_cef.stop(evt);
}else{
this._setBlurValue();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
}
case keys.TAB:
var _cfc=this.get("displayedValue");
if(pw&&(_cfc==pw._messages["previousMessage"]||_cfc==pw._messages["nextMessage"])){
break;
}
if(_cfb){
this._selectOption(_cfb);
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
_cf5.selectInputText(fn,fn.value.length);
var _cfd=this.ignoreCase?"toLowerCase":"substr";
if(text[_cfd](0).indexOf(this.focusNode.value[_cfd](0))==0){
var cpos=this.autoComplete?this._getCaretPos(fn):fn.value.length;
if((cpos+1)>fn.value.length){
fn.value=text;
_cf5.selectInputText(fn,cpos);
}
}else{
fn.value=text;
_cf5.selectInputText(fn);
}
},_openResultList:function(_cfe,_cff,_d00){
var _d01=this.dropDown.getHighlightedOption();
this.dropDown.clearResultList();
if(!_cfe.length&&_d00.start==0){
this.closeDropDown();
return;
}
this._nextSearch=this.dropDown.onPage=lang.hitch(this,function(_d02){
_cfe.nextPage(_d02!==-1);
this.focus();
});
this.dropDown.createOptions(_cfe,_d00,lang.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if("direction" in _d00){
if(_d00.direction){
this.dropDown.highlightFirstOption();
}else{
if(!_d00.direction){
this.dropDown.highlightLastOption();
}
}
if(_d01){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_cff[this.searchAttr].toString())){
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
var _d03=this.get("displayedValue");
var pw=this.dropDown;
if(pw&&(_d03==pw._messages["previousMessage"]||_d03==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
if(typeof this.item=="undefined"){
this.item=null;
this.set("displayedValue",_d03);
}else{
if(this.value!=this._lastValueReported){
this._handleOnChange(this.value,true);
}
this._refreshState();
}
}
},_setItemAttr:function(item,_d04,_d05){
var _d06="";
if(item){
if(!_d05){
_d05=this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr];
}
_d06=this._getValueField()!=this.searchAttr?this.store.getIdentity(item):_d05;
}
this.set("value",_d06,_d04,_d05,item);
},_announceOption:function(node){
if(!node){
return;
}
var _d07;
if(node==this.dropDown.nextButton||node==this.dropDown.previousButton){
_d07=node.innerHTML;
this.item=undefined;
this.value="";
}else{
var item=this.dropDown.items[node.getAttribute("item")];
_d07=(this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr]).toString();
this.set("item",item,false,_d07);
}
this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);
this.focusNode.setAttribute("aria-activedescendant",_cee.get(node,"id"));
this._autoCompleteText(_d07);
},_selectOption:function(_d08){
this.closeDropDown();
if(_d08){
this._announceOption(_d08);
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
var _d09=this.id+"_popup",_d0a=lang.isString(this.dropDownClass)?lang.getObject(this.dropDownClass,false):this.dropDownClass;
this.dropDown=new _d0a({onChange:lang.hitch(this,this._selectOption),id:_d09,dir:this.dir,textDir:this.textDir});
this.focusNode.removeAttribute("aria-activedescendant");
this.textbox.setAttribute("aria-owns",_d09);
}
this._lastInput=key;
this.inherited(arguments);
},_getValueField:function(){
return this.searchAttr;
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.store){
var _d0b=this.srcNodeRef;
this.store=new _cf3({},_d0b);
if(!("value" in this.params)){
var item=(this.item=this.store.fetchSelectedItem());
if(item){
var _d0c=this._getValueField();
this.value=this.store._oldAPI?this.store.getValue(item,_d0c):item[_d0c];
}
}
}
},postCreate:function(){
var _d0d=_cf0("label[for=\""+this.id+"\"]");
if(_d0d.length){
if(!_d0d[0].id){
_d0d[0].id=this.id+"_label";
}
this.domNode.setAttribute("aria-labelledby",_d0d[0].id);
}
this.inherited(arguments);
this.connect(this,"onSearch","_openResultList");
},_getMenuLabelFromItem:function(item){
var _d0e=this.labelFunc(item,this.store),_d0f=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_d0e=this.doHighlight(_d0e,this._lastInput);
_d0f="html";
}
return {html:_d0f=="html",label:_d0e};
},doHighlight:function(_d10,find){
var _d11=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),i=this.queryExpr.indexOf("${0}");
find=_cf1.escapeString(find);
return this._escapeHtml(_d10.replace(new RegExp((i==0?"^":"")+"("+find+")"+(i==(this.queryExpr.length-4)?"$":""),_d11),"￿$1￿")).replace(/\uFFFF([^\uFFFF]+)\uFFFF/g,"<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},reset:function(){
this.item=null;
this.inherited(arguments);
},labelFunc:function(item,_d12){
return (_d12._oldAPI?_d12.getValue(item,this.labelAttr||this.searchAttr):item[this.labelAttr||this.searchAttr]).toString();
},_setValueAttr:function(_d13,_d14,_d15,item){
this._set("item",item||null);
if(_d13==null){
_d13="";
}
this.inherited(arguments);
},_setTextDirAttr:function(_d16){
this.inherited(arguments);
if(this.dropDown){
this.dropDown._set("textDir",_d16);
}
}});
});
},"dojo/dnd/Container":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/kernel","../_base/lang","../_base/window","../dom","../dom-class","../dom-construct","../Evented","../has","../on","../query","../ready","../touch","./common"],function(_d17,_d18,_d19,_d1a,lang,win,dom,_d1b,_d1c,_d1d,has,on,_d1e,_d1f,_d20,dnd){
var _d21=_d18("dojo.dnd.Container",_d1d,{skipForm:false,allowNested:false,constructor:function(node,_d22){
this.node=dom.byId(node);
if(!_d22){
_d22={};
}
this.creator=_d22.creator||null;
this.skipForm=_d22.skipForm;
this.parent=_d22.dropParent&&dom.byId(_d22.dropParent);
this.map={};
this.current=null;
this.containerState="";
_d1b.add(this.node,"dojoDndContainer");
if(!(_d22&&_d22._skipStartup)){
this.startup();
}
this.events=[on(this.node,_d20.over,lang.hitch(this,"onMouseOver")),on(this.node,_d20.out,lang.hitch(this,"onMouseOut")),on(this.node,"dragstart",lang.hitch(this,"onSelectStart")),on(this.node,"selectstart",lang.hitch(this,"onSelectStart"))];
},creator:function(){
},getItem:function(key){
return this.map[key];
},setItem:function(key,data){
this.map[key]=data;
},delItem:function(key){
delete this.map[key];
},forInItems:function(f,o){
o=o||_d1a.global;
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
return _d1e((this.allowNested?"":"> ")+".dojoDndItem",this.parent);
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
},insertNodes:function(data,_d23,_d24){
if(!this.parent.firstChild){
_d24=null;
}else{
if(_d23){
if(!_d24){
_d24=this.parent.firstChild;
}
}else{
if(_d24){
_d24=_d24.nextSibling;
}
}
}
var i,t;
if(_d24){
for(i=0;i<data.length;++i){
t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
_d24.parentNode.insertBefore(t.node,_d24);
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
_d17.forEach(this.events,function(_d25){
_d25.remove();
});
this.clearItems();
this.node=this.parent=this.current=null;
},markupFactory:function(_d26,node,Ctor){
_d26._skipStartup=true;
return new Ctor(node,_d26);
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
_d19.stop(e);
}
},onOverEvent:function(){
},onOutEvent:function(){
},_changeState:function(type,_d27){
var _d28="dojoDnd"+type;
var _d29=type.toLowerCase()+"State";
_d1b.replace(this.node,_d28+_d27,_d28+this[_d29]);
this[_d29]=_d27;
},_addItemClass:function(node,type){
_d1b.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_d1b.remove(node,"dojoDndItem"+type);
},_getChildByEvent:function(e){
var node=e.target;
if(node){
for(var _d2a=node.parentNode;_d2a;node=_d2a,_d2a=node.parentNode){
if((_d2a==this.parent||this.allowNested)&&_d1b.contains(node,"dojoDndItem")){
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
_d1b.add(t.node,"dojoDndItem");
return t;
}});
dnd._createNode=function(tag){
if(!tag){
return dnd._createSpan;
}
return function(text){
return _d1c.create(tag,{innerHTML:text});
};
};
dnd._createTrTd=function(text){
var tr=_d1c.create("tr");
_d1c.create("td",{innerHTML:text},tr);
return tr;
};
dnd._createSpan=function(text){
return _d1c.create("span",{innerHTML:text});
};
dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dnd._defaultCreator=function(node){
var tag=node.tagName.toLowerCase();
var c=tag=="tbody"||tag=="thead"?dnd._createTrTd:dnd._createNode(dnd._defaultCreatorNodes[tag]);
return function(item,hint){
var _d2b=item&&lang.isObject(item),data,type,n;
if(_d2b&&item.tagName&&item.nodeType&&item.getAttribute){
data=item.getAttribute("dndData")||item.innerHTML;
type=item.getAttribute("dndType");
type=type?type.split(/\s*,\s*/):["text"];
n=item;
}else{
data=(_d2b&&item.data)?item.data:item;
type=(_d2b&&item.type)?item.type:["text"];
n=(hint=="avatar"?dnd._createSpan:c)(String(data));
}
if(!n.id){
n.id=dnd.getUniqueId();
}
return {node:n,data:data,type:type};
};
};
return _d21;
});
},"dijit/form/ComboBox":function(){
define(["dojo/_base/declare","./ValidationTextBox","./ComboBoxMixin"],function(_d2c,_d2d,_d2e){
return _d2c("dijit.form.ComboBox",[_d2d,_d2e],{});
});
},"dojo/colors":function(){
define(["./_base/kernel","./_base/lang","./_base/Color","./_base/array"],function(dojo,lang,_d2f,_d30){
var _d31={};
lang.setObject("dojo.colors",_d31);
var _d32=function(m1,m2,h){
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
dojo.colorFromRgb=_d2f.fromRgb=function(_d33,obj){
var m=_d33.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(m){
var c=m[2].split(/\s*,\s*/),l=c.length,t=m[1],a;
if((t=="rgb"&&l==3)||(t=="rgba"&&l==4)){
var r=c[0];
if(r.charAt(r.length-1)=="%"){
a=_d30.map(c,function(x){
return parseFloat(x)*2.56;
});
if(l==4){
a[3]=c[3];
}
return _d2f.fromArray(a,obj);
}
return _d2f.fromArray(c,obj);
}
if((t=="hsl"&&l==3)||(t=="hsla"&&l==4)){
var H=((parseFloat(c[0])%360)+360)%360/360,S=parseFloat(c[1])/100,L=parseFloat(c[2])/100,m2=L<=0.5?L*(S+1):L+S-L*S,m1=2*L-m2;
a=[_d32(m1,m2,H+1/3)*256,_d32(m1,m2,H)*256,_d32(m1,m2,H-1/3)*256,1];
if(l==4){
a[3]=c[3];
}
return _d2f.fromArray(a,obj);
}
}
return null;
};
var _d34=function(c,low,high){
c=Number(c);
return isNaN(c)?high:c<low?low:c>high?high:c;
};
_d2f.prototype.sanitize=function(){
var t=this;
t.r=Math.round(_d34(t.r,0,255));
t.g=Math.round(_d34(t.g,0,255));
t.b=Math.round(_d34(t.b,0,255));
t.a=_d34(t.a,0,1);
return this;
};
_d31.makeGrey=_d2f.makeGrey=function(g,a){
return _d2f.fromArray([g,g,g,a]);
};
lang.mixin(_d2f.named,{"aliceblue":[240,248,255],"antiquewhite":[250,235,215],"aquamarine":[127,255,212],"azure":[240,255,255],"beige":[245,245,220],"bisque":[255,228,196],"blanchedalmond":[255,235,205],"blueviolet":[138,43,226],"brown":[165,42,42],"burlywood":[222,184,135],"cadetblue":[95,158,160],"chartreuse":[127,255,0],"chocolate":[210,105,30],"coral":[255,127,80],"cornflowerblue":[100,149,237],"cornsilk":[255,248,220],"crimson":[220,20,60],"cyan":[0,255,255],"darkblue":[0,0,139],"darkcyan":[0,139,139],"darkgoldenrod":[184,134,11],"darkgray":[169,169,169],"darkgreen":[0,100,0],"darkgrey":[169,169,169],"darkkhaki":[189,183,107],"darkmagenta":[139,0,139],"darkolivegreen":[85,107,47],"darkorange":[255,140,0],"darkorchid":[153,50,204],"darkred":[139,0,0],"darksalmon":[233,150,122],"darkseagreen":[143,188,143],"darkslateblue":[72,61,139],"darkslategray":[47,79,79],"darkslategrey":[47,79,79],"darkturquoise":[0,206,209],"darkviolet":[148,0,211],"deeppink":[255,20,147],"deepskyblue":[0,191,255],"dimgray":[105,105,105],"dimgrey":[105,105,105],"dodgerblue":[30,144,255],"firebrick":[178,34,34],"floralwhite":[255,250,240],"forestgreen":[34,139,34],"gainsboro":[220,220,220],"ghostwhite":[248,248,255],"gold":[255,215,0],"goldenrod":[218,165,32],"greenyellow":[173,255,47],"grey":[128,128,128],"honeydew":[240,255,240],"hotpink":[255,105,180],"indianred":[205,92,92],"indigo":[75,0,130],"ivory":[255,255,240],"khaki":[240,230,140],"lavender":[230,230,250],"lavenderblush":[255,240,245],"lawngreen":[124,252,0],"lemonchiffon":[255,250,205],"lightblue":[173,216,230],"lightcoral":[240,128,128],"lightcyan":[224,255,255],"lightgoldenrodyellow":[250,250,210],"lightgray":[211,211,211],"lightgreen":[144,238,144],"lightgrey":[211,211,211],"lightpink":[255,182,193],"lightsalmon":[255,160,122],"lightseagreen":[32,178,170],"lightskyblue":[135,206,250],"lightslategray":[119,136,153],"lightslategrey":[119,136,153],"lightsteelblue":[176,196,222],"lightyellow":[255,255,224],"limegreen":[50,205,50],"linen":[250,240,230],"magenta":[255,0,255],"mediumaquamarine":[102,205,170],"mediumblue":[0,0,205],"mediumorchid":[186,85,211],"mediumpurple":[147,112,219],"mediumseagreen":[60,179,113],"mediumslateblue":[123,104,238],"mediumspringgreen":[0,250,154],"mediumturquoise":[72,209,204],"mediumvioletred":[199,21,133],"midnightblue":[25,25,112],"mintcream":[245,255,250],"mistyrose":[255,228,225],"moccasin":[255,228,181],"navajowhite":[255,222,173],"oldlace":[253,245,230],"olivedrab":[107,142,35],"orange":[255,165,0],"orangered":[255,69,0],"orchid":[218,112,214],"palegoldenrod":[238,232,170],"palegreen":[152,251,152],"paleturquoise":[175,238,238],"palevioletred":[219,112,147],"papayawhip":[255,239,213],"peachpuff":[255,218,185],"peru":[205,133,63],"pink":[255,192,203],"plum":[221,160,221],"powderblue":[176,224,230],"rosybrown":[188,143,143],"royalblue":[65,105,225],"saddlebrown":[139,69,19],"salmon":[250,128,114],"sandybrown":[244,164,96],"seagreen":[46,139,87],"seashell":[255,245,238],"sienna":[160,82,45],"skyblue":[135,206,235],"slateblue":[106,90,205],"slategray":[112,128,144],"slategrey":[112,128,144],"snow":[255,250,250],"springgreen":[0,255,127],"steelblue":[70,130,180],"tan":[210,180,140],"thistle":[216,191,216],"tomato":[255,99,71],"turquoise":[64,224,208],"violet":[238,130,238],"wheat":[245,222,179],"whitesmoke":[245,245,245],"yellowgreen":[154,205,50]});
return _d2f;
});
},"dojo/cldr/supplemental":function(){
define(["../_base/lang","../i18n"],function(lang,i18n){
var _d35={};
lang.setObject("dojo.cldr.supplemental",_d35);
_d35.getFirstDayOfWeek=function(_d36){
var _d37={bd:5,mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,iq:6,ir:6,jo:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,sy:6,ye:6,ag:0,ar:0,as:0,au:0,br:0,bs:0,bt:0,bw:0,by:0,bz:0,ca:0,cn:0,co:0,dm:0,"do":0,et:0,gt:0,gu:0,hk:0,hn:0,id:0,ie:0,il:0,"in":0,jm:0,jp:0,ke:0,kh:0,kr:0,la:0,mh:0,mm:0,mo:0,mt:0,mx:0,mz:0,ni:0,np:0,nz:0,pa:0,pe:0,ph:0,pk:0,pr:0,py:0,sg:0,sv:0,th:0,tn:0,tt:0,tw:0,um:0,us:0,ve:0,vi:0,ws:0,za:0,zw:0};
var _d38=_d35._region(_d36);
var dow=_d37[_d38];
return (dow===undefined)?1:dow;
};
_d35._region=function(_d39){
_d39=i18n.normalizeLocale(_d39);
var tags=_d39.split("-");
var _d3a=tags[1];
if(!_d3a){
_d3a={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",he:"il",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[tags[0]];
}else{
if(_d3a.length==4){
_d3a=tags[2];
}
}
return _d3a;
};
_d35.getWeekend=function(_d3b){
var _d3c={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5},_d3d={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6},_d3e=_d35._region(_d3b),_d3f=_d3c[_d3e],end=_d3d[_d3e];
if(_d3f===undefined){
_d3f=6;
}
if(end===undefined){
end=0;
}
return {start:_d3f,end:end};
};
return _d35;
});
},"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\"\n/></span>\n","dojox/grid/cells/_base":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/event","dojo/_base/connect","dojo/_base/array","dojo/_base/sniff","dojo/dom","dojo/dom-attr","dojo/dom-construct","dijit/_Widget","../util"],function(dojo,_d40,lang,_d41,_d42,_d43,has,dom,_d44,_d45,_d46,util){
var _d47=_d40("dojox.grid._DeferredTextWidget",_d46,{deferred:null,_destroyOnRemove:true,postCreate:function(){
if(this.deferred){
this.deferred.addBoth(lang.hitch(this,function(text){
if(this.domNode){
this.domNode.innerHTML=text;
}
}));
}
}});
var _d48=function(_d49){
try{
util.fire(_d49,"focus");
util.fire(_d49,"select");
}
catch(e){
}
};
var _d4a=function(){
setTimeout(lang.hitch.apply(dojo,arguments),0);
};
var _d4b=_d40("dojox.grid.cells._Base",null,{styles:"",classes:"",editable:false,alwaysEditing:false,formatter:null,defaultValue:"...",value:null,hidden:false,noresize:false,draggable:true,_valueProp:"value",_formatPending:false,constructor:function(_d4c){
this._props=_d4c||{};
lang.mixin(this,_d4c);
if(this.draggable===undefined){
this.draggable=true;
}
},_defaultFormat:function(_d4d,_d4e){
var s=this.grid.formatterScope||this;
var f=this.formatter;
if(f&&s&&typeof f=="string"){
f=this.formatter=s[f];
}
var v=(_d4d!=this.defaultValue&&f)?f.apply(s,_d4e):_d4d;
if(typeof v=="undefined"){
return this.defaultValue;
}
if(v&&v.addBoth){
v=new _d47({deferred:v},_d45.create("span",{innerHTML:this.defaultValue}));
}
if(v&&v.declaredClass&&v.startup){
return "<div class='dojoxGridStubNode' linkWidget='"+v.id+"' cellIdx='"+this.index+"'>"+this.defaultValue+"</div>";
}
return v;
},format:function(_d4f,_d50){
var f,i=this.grid.edit.info,d=this.get?this.get(_d4f,_d50):(this.value||this.defaultValue);
d=(d&&d.replace&&this.grid.escapeHTMLInData)?d.replace(/&/g,"&amp;").replace(/</g,"&lt;"):d;
if(this.editable&&(this.alwaysEditing||(i.rowIndex==_d4f&&i.cell==this))){
return this.formatEditing(d,_d4f);
}else{
return this._defaultFormat(d,[d,_d4f,this]);
}
},formatEditing:function(_d51,_d52){
},getNode:function(_d53){
return this.view.getCellNode(_d53,this.index);
},getHeaderNode:function(){
return this.view.getHeaderCellNode(this.index);
},getEditNode:function(_d54){
return (this.getNode(_d54)||0).firstChild||0;
},canResize:function(){
var uw=this.unitWidth;
return uw&&(uw!=="auto");
},isFlex:function(){
var uw=this.unitWidth;
return uw&&lang.isString(uw)&&(uw=="auto"||uw.slice(-1)=="%");
},applyEdit:function(_d55,_d56){
if(this.getNode(_d56)){
this.grid.edit.applyCellEdit(_d55,this,_d56);
}
},cancelEdit:function(_d57){
this.grid.doCancelEdit(_d57);
},_onEditBlur:function(_d58){
if(this.grid.edit.isEditCell(_d58,this.index)){
this.grid.edit.apply();
}
},registerOnBlur:function(_d59,_d5a){
if(this.commitOnBlur){
_d42.connect(_d59,"onblur",function(e){
setTimeout(lang.hitch(this,"_onEditBlur",_d5a),250);
});
}
},needFormatNode:function(_d5b,_d5c){
this._formatPending=true;
_d4a(this,"_formatNode",_d5b,_d5c);
},cancelFormatNode:function(){
this._formatPending=false;
},_formatNode:function(_d5d,_d5e){
if(this._formatPending){
this._formatPending=false;
if(!has("ie")){
dom.setSelectable(this.grid.domNode,true);
}
this.formatNode(this.getEditNode(_d5e),_d5d,_d5e);
}
},formatNode:function(_d5f,_d60,_d61){
if(has("ie")){
_d4a(this,"focus",_d61,_d5f);
}else{
this.focus(_d61,_d5f);
}
},dispatchEvent:function(m,e){
if(m in this){
return this[m](e);
}
},getValue:function(_d62){
return this.getEditNode(_d62)[this._valueProp];
},setValue:function(_d63,_d64){
var n=this.getEditNode(_d63);
if(n){
n[this._valueProp]=_d64;
}
},focus:function(_d65,_d66){
_d48(_d66||this.getEditNode(_d65));
},save:function(_d67){
this.value=this.value||this.getValue(_d67);
},restore:function(_d68){
this.setValue(_d68,this.value);
},_finish:function(_d69){
dom.setSelectable(this.grid.domNode,false);
this.cancelFormatNode();
},apply:function(_d6a){
this.applyEdit(this.getValue(_d6a),_d6a);
this._finish(_d6a);
},cancel:function(_d6b){
this.cancelEdit(_d6b);
this._finish(_d6b);
}});
_d4b.markupFactory=function(node,_d6c){
var _d6d=lang.trim(_d44.get(node,"formatter")||"");
if(_d6d){
_d6c.formatter=lang.getObject(_d6d)||_d6d;
}
var get=lang.trim(_d44.get(node,"get")||"");
if(get){
_d6c.get=lang.getObject(get);
}
var _d6e=function(attr,cell,_d6f){
var _d70=lang.trim(_d44.get(node,attr)||"");
if(_d70){
cell[_d6f||attr]=!(_d70.toLowerCase()=="false");
}
};
_d6e("sortDesc",_d6c);
_d6e("editable",_d6c);
_d6e("alwaysEditing",_d6c);
_d6e("noresize",_d6c);
_d6e("draggable",_d6c);
var _d71=lang.trim(_d44.get(node,"loadingText")||_d44.get(node,"defaultValue")||"");
if(_d71){
_d6c.defaultValue=_d71;
}
var _d72=function(attr,cell,_d73){
var _d74=lang.trim(_d44.get(node,attr)||"")||undefined;
if(_d74){
cell[_d73||attr]=_d74;
}
};
_d72("styles",_d6c);
_d72("headerStyles",_d6c);
_d72("cellStyles",_d6c);
_d72("classes",_d6c);
_d72("headerClasses",_d6c);
_d72("cellClasses",_d6c);
};
var Cell=_d40("dojox.grid.cells.Cell",_d4b,{constructor:function(){
this.keyFilter=this.keyFilter;
},keyFilter:null,formatEditing:function(_d75,_d76){
this.needFormatNode(_d75,_d76);
return "<input class=\"dojoxGridInput\" type=\"text\" value=\""+_d75+"\">";
},formatNode:function(_d77,_d78,_d79){
this.inherited(arguments);
this.registerOnBlur(_d77,_d79);
},doKey:function(e){
if(this.keyFilter){
var key=String.fromCharCode(e.charCode);
if(key.search(this.keyFilter)==-1){
_d41.stop(e);
}
}
},_finish:function(_d7a){
this.inherited(arguments);
var n=this.getEditNode(_d7a);
try{
util.fire(n,"blur");
}
catch(e){
}
}});
Cell.markupFactory=function(node,_d7b){
_d4b.markupFactory(node,_d7b);
var _d7c=lang.trim(_d44.get(node,"keyFilter")||"");
if(_d7c){
_d7b.keyFilter=new RegExp(_d7c);
}
};
var _d7d=_d40("dojox.grid.cells.RowIndex",Cell,{name:"Row",postscript:function(){
this.editable=false;
},get:function(_d7e){
return _d7e+1;
}});
_d7d.markupFactory=function(node,_d7f){
Cell.markupFactory(node,_d7f);
};
var _d80=_d40("dojox.grid.cells.Select",Cell,{options:null,values:null,returnIndex:-1,constructor:function(_d81){
this.values=this.values||this.options;
},formatEditing:function(_d82,_d83){
this.needFormatNode(_d82,_d83);
var h=["<select class=\"dojoxGridSelect\">"];
for(var i=0,o,v;((o=this.options[i])!==undefined)&&((v=this.values[i])!==undefined);i++){
v=v.replace?v.replace(/&/g,"&amp;").replace(/</g,"&lt;"):v;
o=o.replace?o.replace(/&/g,"&amp;").replace(/</g,"&lt;"):o;
h.push("<option",(_d82==v?" selected":"")," value=\""+v+"\"",">",o,"</option>");
}
h.push("</select>");
return h.join("");
},_defaultFormat:function(_d84,_d85){
var v=this.inherited(arguments);
if(!this.formatter&&this.values&&this.options){
var i=_d43.indexOf(this.values,v);
if(i>=0){
v=this.options[i];
}
}
return v;
},getValue:function(_d86){
var n=this.getEditNode(_d86);
if(n){
var i=n.selectedIndex,o=n.options[i];
return this.returnIndex>-1?i:o.value||o.innerHTML;
}
}});
_d80.markupFactory=function(node,cell){
Cell.markupFactory(node,cell);
var _d87=lang.trim(_d44.get(node,"options")||"");
if(_d87){
var o=_d87.split(",");
if(o[0]!=_d87){
cell.options=o;
}
}
var _d88=lang.trim(_d44.get(node,"values")||"");
if(_d88){
var v=_d88.split(",");
if(v[0]!=_d88){
cell.values=v;
}
}
};
var _d89=_d40("dojox.grid.cells.AlwaysEdit",Cell,{alwaysEditing:true,_formatNode:function(_d8a,_d8b){
this.formatNode(this.getEditNode(_d8b),_d8a,_d8b);
},applyStaticValue:function(_d8c){
var e=this.grid.edit;
e.applyCellEdit(this.getValue(_d8c),this,_d8c);
e.start(this,_d8c,true);
}});
_d89.markupFactory=function(node,cell){
Cell.markupFactory(node,cell);
};
var Bool=_d40("dojox.grid.cells.Bool",_d89,{_valueProp:"checked",formatEditing:function(_d8d,_d8e){
return "<input class=\"dojoxGridInput\" type=\"checkbox\""+(_d8d?" checked=\"checked\"":"")+" style=\"width: auto\" />";
},doclick:function(e){
if(e.target.tagName=="INPUT"){
this.applyStaticValue(e.rowIndex);
}
}});
Bool.markupFactory=function(node,cell){
_d89.markupFactory(node,cell);
};
return _d4b;
});
},"dojo/number":function(){
define(["./_base/lang","./i18n","./i18n!./cldr/nls/number","./string","./regexp"],function(lang,i18n,_d8f,_d90,_d91){
var _d92={};
lang.setObject("dojo.number",_d92);
_d92.format=function(_d93,_d94){
_d94=lang.mixin({},_d94||{});
var _d95=i18n.normalizeLocale(_d94.locale),_d96=i18n.getLocalization("dojo.cldr","number",_d95);
_d94.customs=_d96;
var _d97=_d94.pattern||_d96[(_d94.type||"decimal")+"Format"];
if(isNaN(_d93)||Math.abs(_d93)==Infinity){
return null;
}
return _d92._applyPattern(_d93,_d97,_d94);
};
_d92._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
_d92._applyPattern=function(_d98,_d99,_d9a){
_d9a=_d9a||{};
var _d9b=_d9a.customs.group,_d9c=_d9a.customs.decimal,_d9d=_d99.split(";"),_d9e=_d9d[0];
_d99=_d9d[(_d98<0)?1:0]||("-"+_d9e);
if(_d99.indexOf("%")!=-1){
_d98*=100;
}else{
if(_d99.indexOf("‰")!=-1){
_d98*=1000;
}else{
if(_d99.indexOf("¤")!=-1){
_d9b=_d9a.customs.currencyGroup||_d9b;
_d9c=_d9a.customs.currencyDecimal||_d9c;
_d99=_d99.replace(/\u00a4{1,3}/,function(_d9f){
var prop=["symbol","currency","displayName"][_d9f.length-1];
return _d9a[prop]||_d9a.currency||"";
});
}else{
if(_d99.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _da0=_d92._numberPatternRE;
var _da1=_d9e.match(_da0);
if(!_da1){
throw new Error("unable to find a number expression in pattern: "+_d99);
}
if(_d9a.fractional===false){
_d9a.places=0;
}
return _d99.replace(_da0,_d92._formatAbsolute(_d98,_da1[0],{decimal:_d9c,group:_d9b,places:_d9a.places,round:_d9a.round}));
};
_d92.round=function(_da2,_da3,_da4){
var _da5=10/(_da4||10);
return (_da5*+_da2).toFixed(_da3)/_da5;
};
if((0.9).toFixed()==0){
var _da6=_d92.round;
_d92.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _da6(v,p,m)+(v>0?d:-d);
};
}
_d92._formatAbsolute=function(_da7,_da8,_da9){
_da9=_da9||{};
if(_da9.places===true){
_da9.places=0;
}
if(_da9.places===Infinity){
_da9.places=6;
}
var _daa=_da8.split("."),_dab=typeof _da9.places=="string"&&_da9.places.indexOf(","),_dac=_da9.places;
if(_dab){
_dac=_da9.places.substring(_dab+1);
}else{
if(!(_dac>=0)){
_dac=(_daa[1]||[]).length;
}
}
if(!(_da9.round<0)){
_da7=_d92.round(_da7,_dac,_da9.round);
}
var _dad=String(Math.abs(_da7)).split("."),_dae=_dad[1]||"";
if(_daa[1]||_da9.places){
if(_dab){
_da9.places=_da9.places.substring(0,_dab);
}
var pad=_da9.places!==undefined?_da9.places:(_daa[1]&&_daa[1].lastIndexOf("0")+1);
if(pad>_dae.length){
_dad[1]=_d90.pad(_dae,pad,"0",true);
}
if(_dac<_dae.length){
_dad[1]=_dae.substr(0,_dac);
}
}else{
if(_dad[1]){
_dad.pop();
}
}
var _daf=_daa[0].replace(",","");
pad=_daf.indexOf("0");
if(pad!=-1){
pad=_daf.length-pad;
if(pad>_dad[0].length){
_dad[0]=_d90.pad(_dad[0],pad);
}
if(_daf.indexOf("#")==-1){
_dad[0]=_dad[0].substr(_dad[0].length-pad);
}
}
var _db0=_daa[0].lastIndexOf(","),_db1,_db2;
if(_db0!=-1){
_db1=_daa[0].length-_db0-1;
var _db3=_daa[0].substr(0,_db0);
_db0=_db3.lastIndexOf(",");
if(_db0!=-1){
_db2=_db3.length-_db0-1;
}
}
var _db4=[];
for(var _db5=_dad[0];_db5;){
var off=_db5.length-_db1;
_db4.push((off>0)?_db5.substr(off):_db5);
_db5=(off>0)?_db5.slice(0,off):"";
if(_db2){
_db1=_db2;
delete _db2;
}
}
_dad[0]=_db4.reverse().join(_da9.group||",");
return _dad.join(_da9.decimal||".");
};
_d92.regexp=function(_db6){
return _d92._parseInfo(_db6).regexp;
};
_d92._parseInfo=function(_db7){
_db7=_db7||{};
var _db8=i18n.normalizeLocale(_db7.locale),_db9=i18n.getLocalization("dojo.cldr","number",_db8),_dba=_db7.pattern||_db9[(_db7.type||"decimal")+"Format"],_dbb=_db9.group,_dbc=_db9.decimal,_dbd=1;
if(_dba.indexOf("%")!=-1){
_dbd/=100;
}else{
if(_dba.indexOf("‰")!=-1){
_dbd/=1000;
}else{
var _dbe=_dba.indexOf("¤")!=-1;
if(_dbe){
_dbb=_db9.currencyGroup||_dbb;
_dbc=_db9.currencyDecimal||_dbc;
}
}
}
var _dbf=_dba.split(";");
if(_dbf.length==1){
_dbf.push("-"+_dbf[0]);
}
var re=_d91.buildGroupRE(_dbf,function(_dc0){
_dc0="(?:"+_d91.escapeString(_dc0,".")+")";
return _dc0.replace(_d92._numberPatternRE,function(_dc1){
var _dc2={signed:false,separator:_db7.strict?_dbb:[_dbb,""],fractional:_db7.fractional,decimal:_dbc,exponent:false},_dc3=_dc1.split("."),_dc4=_db7.places;
if(_dc3.length==1&&_dbd!=1){
_dc3[1]="###";
}
if(_dc3.length==1||_dc4===0){
_dc2.fractional=false;
}else{
if(_dc4===undefined){
_dc4=_db7.pattern?_dc3[1].lastIndexOf("0")+1:Infinity;
}
if(_dc4&&_db7.fractional==undefined){
_dc2.fractional=true;
}
if(!_db7.places&&(_dc4<_dc3[1].length)){
_dc4+=","+_dc3[1].length;
}
_dc2.places=_dc4;
}
var _dc5=_dc3[0].split(",");
if(_dc5.length>1){
_dc2.groupSize=_dc5.pop().length;
if(_dc5.length>1){
_dc2.groupSize2=_dc5.pop().length;
}
}
return "("+_d92._realNumberRegexp(_dc2)+")";
});
},true);
if(_dbe){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_dc6,_dc7,_dc8,_dc9){
var prop=["symbol","currency","displayName"][_dc8.length-1],_dca=_d91.escapeString(_db7[prop]||_db7.currency||"");
_dc7=_dc7?"[\\s\\xa0]":"";
_dc9=_dc9?"[\\s\\xa0]":"";
if(!_db7.strict){
if(_dc7){
_dc7+="*";
}
if(_dc9){
_dc9+="*";
}
return "(?:"+_dc7+_dca+_dc9+")?";
}
return _dc7+_dca+_dc9;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_dbb,decimal:_dbc,factor:_dbd};
};
_d92.parse=function(_dcb,_dcc){
var info=_d92._parseInfo(_dcc),_dcd=(new RegExp("^"+info.regexp+"$")).exec(_dcb);
if(!_dcd){
return NaN;
}
var _dce=_dcd[1];
if(!_dcd[1]){
if(!_dcd[2]){
return NaN;
}
_dce=_dcd[2];
info.factor*=-1;
}
_dce=_dce.replace(new RegExp("["+info.group+"\\s\\xa0"+"]","g"),"").replace(info.decimal,".");
return _dce*info.factor;
};
_d92._realNumberRegexp=function(_dcf){
_dcf=_dcf||{};
if(!("places" in _dcf)){
_dcf.places=Infinity;
}
if(typeof _dcf.decimal!="string"){
_dcf.decimal=".";
}
if(!("fractional" in _dcf)||/^0/.test(_dcf.places)){
_dcf.fractional=[true,false];
}
if(!("exponent" in _dcf)){
_dcf.exponent=[true,false];
}
if(!("eSigned" in _dcf)){
_dcf.eSigned=[true,false];
}
var _dd0=_d92._integerRegexp(_dcf),_dd1=_d91.buildGroupRE(_dcf.fractional,function(q){
var re="";
if(q&&(_dcf.places!==0)){
re="\\"+_dcf.decimal;
if(_dcf.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_dcf.places+"}";
}
}
return re;
},true);
var _dd2=_d91.buildGroupRE(_dcf.exponent,function(q){
if(q){
return "([eE]"+_d92._integerRegexp({signed:_dcf.eSigned})+")";
}
return "";
});
var _dd3=_dd0+_dd1;
if(_dd1){
_dd3="(?:(?:"+_dd3+")|(?:"+_dd1+"))";
}
return _dd3+_dd2;
};
_d92._integerRegexp=function(_dd4){
_dd4=_dd4||{};
if(!("signed" in _dd4)){
_dd4.signed=[true,false];
}
if(!("separator" in _dd4)){
_dd4.separator="";
}else{
if(!("groupSize" in _dd4)){
_dd4.groupSize=3;
}
}
var _dd5=_d91.buildGroupRE(_dd4.signed,function(q){
return q?"[-+]":"";
},true);
var _dd6=_d91.buildGroupRE(_dd4.separator,function(sep){
if(!sep){
return "(?:\\d+)";
}
sep=_d91.escapeString(sep);
if(sep==" "){
sep="\\s";
}else{
if(sep==" "){
sep="\\s\\xa0";
}
}
var grp=_dd4.groupSize,grp2=_dd4.groupSize2;
if(grp2){
var _dd7="(?:0|[1-9]\\d{0,"+(grp2-1)+"}(?:["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-grp2)>0)?"(?:"+_dd7+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_dd7;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _dd5+_dd6;
};
return _d92;
});
},"dijit/layout/_ContentPaneResizeMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/query","dojo/sniff","../registry","../Viewport","./utils"],function(_dd8,_dd9,_dda,_ddb,_ddc,lang,_ddd,has,_dde,_ddf,_de0){
return _dd9("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isLayoutContainer:true,startup:function(){
if(this._started){
return;
}
var _de1=this.getParent();
this._childOfLayoutWidget=_de1&&_de1.isLayoutContainer;
this._needLayout=!this._childOfLayoutWidget;
this.inherited(arguments);
if(this._isShown()){
this._onShow();
}
if(!this._childOfLayoutWidget){
this.own(_ddf.on("resize",lang.hitch(this,"resize")));
}
},_checkIfSingleChild:function(){
var _de2=[],_de3=false;
_ddd("> *",this.containerNode).some(function(node){
var _de4=_dde.byNode(node);
if(_de4&&_de4.resize){
_de2.push(_de4);
}else{
if(node.offsetHeight){
_de3=true;
}
}
});
this._singleChild=_de2.length==1&&!_de3?_de2[0]:null;
_dda.toggle(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_de5,_de6){
this._resizeCalled=true;
this._scheduleLayout(_de5,_de6);
},_scheduleLayout:function(_de7,_de8){
if(this._isShown()){
this._layout(_de7,_de8);
}else{
this._needLayout=true;
this._changeSize=_de7;
this._resultSize=_de8;
}
},_layout:function(_de9,_dea){
delete this._needLayout;
if(!this._wasShown&&this.open!==false){
this._onShow();
}
if(_de9){
_ddb.setMarginBox(this.domNode,_de9);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_dea||{};
lang.mixin(mb,_de9||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_ddb.getMarginBox(cn),mb);
}
this._contentBox=_de0.marginBox2contentBox(cn,mb);
}else{
this._contentBox=_ddb.getContentBox(cn);
}
this._layoutChildren();
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||_ddb.getContentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
_dd8.forEach(this.getChildren(),function(_deb){
if(_deb.resize){
_deb.resize();
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
var node=this.domNode,_dec=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!_dda.contains(node,"dijitHidden")&&_dec&&_dec.style&&(_dec.style.display!="none");
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
define(["dojo/_base/declare","dojo/dom","dojo/_base/event","../registry"],function(_ded,dom,_dee,_def){
return _ded("dijit.form._ButtonMixin",null,{label:"",type:"button",_onClick:function(e){
if(this.disabled){
_dee.stop(e);
return false;
}
var _df0=this.onClick(e)===false;
if(!_df0&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _df1=_def.byNode(node);
if(_df1&&typeof _df1._onSubmit=="function"){
_df1._onSubmit(e);
_df0=true;
break;
}
}
}
if(_df0){
e.preventDefault();
}
return !_df0;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_df2){
this._set("label",_df2);
(this.containerNode||this.focusNode).innerHTML=_df2;
}});
});
},"dijit/tree/TreeStoreModel":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/_base/lang"],function(_df3,_df4,_df5,lang){
return _df5("dijit.tree.TreeStoreModel",null,{store:null,childrenAttrs:["children"],newItemIdAttr:"id",labelAttr:"",root:null,query:null,deferItemLoadingUntilExpand:false,constructor:function(args){
lang.mixin(this,args);
this.connects=[];
var _df6=this.store;
if(!_df6.getFeatures()["dojo.data.api.Identity"]){
throw new Error("dijit.tree.TreeStoreModel: store must support dojo.data.Identity");
}
if(_df6.getFeatures()["dojo.data.api.Notification"]){
this.connects=this.connects.concat([_df4.after(_df6,"onNew",lang.hitch(this,"onNewItem"),true),_df4.after(_df6,"onDelete",lang.hitch(this,"onDeleteItem"),true),_df4.after(_df6,"onSet",lang.hitch(this,"onSetItem"),true)]);
}
},destroy:function(){
var h;
while(h=this.connects.pop()){
h.remove();
}
},getRoot:function(_df7,_df8){
if(this.root){
_df7(this.root);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_df9){
if(_df9.length!=1){
throw new Error("dijit.tree.TreeStoreModel: root query returned "+_df9.length+" items, but must return exactly one");
}
this.root=_df9[0];
_df7(this.root);
}),onError:_df8});
}
},mayHaveChildren:function(item){
return _df3.some(this.childrenAttrs,function(attr){
return this.store.hasAttribute(item,attr);
},this);
},getChildren:function(_dfa,_dfb,_dfc){
var _dfd=this.store;
if(!_dfd.isItemLoaded(_dfa)){
var _dfe=lang.hitch(this,arguments.callee);
_dfd.loadItem({item:_dfa,onItem:function(_dff){
_dfe(_dff,_dfb,_dfc);
},onError:_dfc});
return;
}
var _e00=[];
for(var i=0;i<this.childrenAttrs.length;i++){
var vals=_dfd.getValues(_dfa,this.childrenAttrs[i]);
_e00=_e00.concat(vals);
}
var _e01=0;
if(!this.deferItemLoadingUntilExpand){
_df3.forEach(_e00,function(item){
if(!_dfd.isItemLoaded(item)){
_e01++;
}
});
}
if(_e01==0){
_dfb(_e00);
}else{
_df3.forEach(_e00,function(item,idx){
if(!_dfd.isItemLoaded(item)){
_dfd.loadItem({item:item,onItem:function(item){
_e00[idx]=item;
if(--_e01==0){
_dfb(_e00);
}
},onError:_dfc});
}
});
}
},isItem:function(_e02){
return this.store.isItem(_e02);
},fetchItemByIdentity:function(_e03){
this.store.fetchItemByIdentity(_e03);
},getIdentity:function(item){
return this.store.getIdentity(item);
},getLabel:function(item){
if(this.labelAttr){
return this.store.getValue(item,this.labelAttr);
}else{
return this.store.getLabel(item);
}
},newItem:function(args,_e04,_e05){
var _e06={parent:_e04,attribute:this.childrenAttrs[0]},_e07;
if(this.newItemIdAttr&&args[this.newItemIdAttr]){
this.fetchItemByIdentity({identity:args[this.newItemIdAttr],scope:this,onItem:function(item){
if(item){
this.pasteItem(item,null,_e04,true,_e05);
}else{
_e07=this.store.newItem(args,_e06);
if(_e07&&(_e05!=undefined)){
this.pasteItem(_e07,_e04,_e04,false,_e05);
}
}
}});
}else{
_e07=this.store.newItem(args,_e06);
if(_e07&&(_e05!=undefined)){
this.pasteItem(_e07,_e04,_e04,false,_e05);
}
}
},pasteItem:function(_e08,_e09,_e0a,_e0b,_e0c){
var _e0d=this.store,_e0e=this.childrenAttrs[0];
if(_e09){
_df3.forEach(this.childrenAttrs,function(attr){
if(_e0d.containsValue(_e09,attr,_e08)){
if(!_e0b){
var _e0f=_df3.filter(_e0d.getValues(_e09,attr),function(x){
return x!=_e08;
});
_e0d.setValues(_e09,attr,_e0f);
}
_e0e=attr;
}
});
}
if(_e0a){
if(typeof _e0c=="number"){
var _e10=_e0d.getValues(_e0a,_e0e).slice();
_e10.splice(_e0c,0,_e08);
_e0d.setValues(_e0a,_e0e,_e10);
}else{
_e0d.setValues(_e0a,_e0e,_e0d.getValues(_e0a,_e0e).concat(_e08));
}
}
},onChange:function(){
},onChildrenChange:function(){
},onDelete:function(){
},onNewItem:function(item,_e11){
if(!_e11){
return;
}
this.getChildren(_e11.item,lang.hitch(this,function(_e12){
this.onChildrenChange(_e11.item,_e12);
}));
},onDeleteItem:function(item){
this.onDelete(item);
},onSetItem:function(item,_e13){
if(_df3.indexOf(this.childrenAttrs,_e13)!=-1){
this.getChildren(item,lang.hitch(this,function(_e14){
this.onChildrenChange(item,_e14);
}));
}else{
this.onChange(item);
}
}});
});
},"dojo/dnd/TimedMoveable":function(){
define(["../_base/declare","./Moveable"],function(_e15,_e16){
var _e17=_e16.prototype.onMove;
return _e15("dojo.dnd.TimedMoveable",_e16,{timeout:40,constructor:function(node,_e18){
if(!_e18){
_e18={};
}
if(_e18.timeout&&typeof _e18.timeout=="number"&&_e18.timeout>=0){
this.timeout=_e18.timeout;
}
},onMoveStop:function(_e19){
if(_e19._timer){
clearTimeout(_e19._timer);
_e17.call(this,_e19,_e19._leftTop);
}
_e16.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_e1a,_e1b){
_e1a._leftTop=_e1b;
if(!_e1a._timer){
var _e1c=this;
_e1a._timer=setTimeout(function(){
_e1a._timer=null;
_e17.call(_e1c,_e1a,_e1a._leftTop);
},this.timeout);
}
}});
});
},"davinci/commands/CommandStack":function(){
define(["dojo/_base/declare"],function(_e1d){
return _e1d("davinci.commands.CommandStack",null,{constructor:function(_e1e){
this._context=_e1e;
this._undoStack=[];
this._redoStack=[];
},execute:function(_e1f){
if(!_e1f){
return;
}
if(this._context&&this._context.declaredClass!="davinci.ve.themeEditor.Context"){
dojo.withDoc(this._context.getDocument(),"execute",_e1f,[this._context]);
}else{
_e1f.execute();
}
this._undoStack.push(_e1f);
this._redoStack=[];
this.onExecute(_e1f,"execute");
},undo:function(){
if(!this.canUndo()){
return;
}
var _e20=this._undoStack.pop();
if(_e20._runDelegate){
_e20._runDelegate.undoDelegate(_e20);
}else{
if(this._context&&this._context.declaredClass!="davinci.ve.themeEditor.Context"){
dojo.withDoc(this._context.getDocument(),"undo",_e20);
}else{
_e20.undo();
}
}
this._redoStack.push(_e20);
this.onExecute(_e20,"undo");
},redo:function(){
if(!this.canRedo()){
return;
}
var _e21=this._redoStack.pop();
if(_e21._runDelegate){
_e21._runDelegate.redoDelegate(_e21);
}else{
if(this._context&&this._context.declaredClass!="davinci.ve.themeEditor.Context"){
dojo.withDoc(this._context.getDocument(),"execute",_e21);
}else{
_e21.execute();
}
}
this._undoStack.push(_e21);
this.onExecute(_e21,"redo");
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
},jump:function(_e22,_e23){
var _e24=this.getUndoCount();
var _e25=this.getRedoCount();
if(_e22==_e24){
return _e22;
}
if(_e22<0||_e22>_e24+_e25){
return -1;
}
var n=_e22-_e24;
if(_e23){
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
return _e22;
},onExecute:function(_e26,_e27){
},undoDelegate:function(_e28){
},redoDelegate:function(_e29){
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
var _e2a=dojo.clone(set1);
for(var i=0;i<set2.length;i++){
for(var _e2b in set2[i]){
for(j=_e2a.length-1;j>=0;j--){
var _e2c=_e2a[j];
for(var _e2d in _e2c){
if(_e2b==_e2d){
_e2a.splice(j,1);
break;
}
}
}
}
}
var _e2e=_e2a.concat(set2);
return _e2e;
}};
});
},"url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n","url:davinci/ui/templates/newtheme.html":"<div>\r\n\t<div class=\"dijitDialogPaneContentArea\">\r\n\t\t<table>\r\n\t\t<tr>\r\n\t\t<td>${themeToClone}:</td><td> <div dojoType=\"davinci.ui.widgets.ThemeSelection\" workspaceOnly=\"false\" dojoAttachPoint = '_themeSelection'></div></td><td><div dojoAttachPoint='_error1'></div></td>\r\n\t\t</tr>\r\n\t\t<tr><td colspan='3'><hr></hr></td></tr>\r\n\t\t<!-- \r\n\t\t<tr>\r\n\t\t<td>New Name:</td><td><input style='width:100%' type='select' dojoAttachPoint=\"_themeName\"></input></td><td><div dojoAttachPoint='_error2'></div></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t<td>Version:</td><td><input style='width:100%' type='text' dojoAttachPoint=\"_version\"></input></td><td><div dojoAttachPoint='_error3'></div></td>\r\n\t\t</tr>\r\n\t\t -->\r\n\t\t<tr>\r\n\t\t<td>${newName}:</td><td><input class='templateInput' type='text' \r\n\t\t\tdojoAttachPoint=\"_selector\"\r\n\t\t\tdojoType=\"dijit.form.ValidationTextBox\"\r\n\t\t\trequired=\"true\" \r\n\t\t\tinvalidMessage='${invalidThemeName}'></input></td><td><div dojoAttachPoint='_error4'></div></td>\r\n\t\t</tr>\r\n\t\t</table>\r\n\t</div>\r\n\t<div class=\"dijitDialogPaneActionBar\">\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"_okButton\" dojoAttachEvent='onClick:okButton' label='${create}' class=\"maqPrimaryButton\" type=\"submit\" disabled></button>\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:cancelButton' label='${buttonCancel}' class=\"maqSecondaryButton\"></button>\r\n\t</div>\t\t\r\n</div>","dojox/grid/Selection":function(){
define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/dom-attr"],function(_e2f,_e30,lang,_e31){
return _e2f("dojox.grid.Selection",null,{constructor:function(_e32){
this.grid=_e32;
this.selected=[];
this.setMode(_e32.selectionMode);
},mode:"extended",selected:null,updating:0,selectedIndex:-1,setMode:function(mode){
if(this.selected.length){
this.deselectAll();
}
if(mode!="extended"&&mode!="multiple"&&mode!="single"&&mode!="none"){
this.mode="extended";
}else{
this.mode=mode;
}
},onCanSelect:function(_e33){
return this.grid.onCanSelect(_e33);
},onCanDeselect:function(_e34){
return this.grid.onCanDeselect(_e34);
},onSelected:function(_e35){
},onDeselected:function(_e36){
},onChanging:function(){
},onChanged:function(){
},isSelected:function(_e37){
if(this.mode=="none"){
return false;
}
return this.selected[_e37];
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
},getNextSelected:function(_e38){
if(this.mode=="none"){
return -1;
}
for(var i=_e38+1,l=this.selected.length;i<l;i++){
if(this.selected[i]){
return i;
}
}
return -1;
},getSelected:function(){
var _e39=[];
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
_e39.push(i);
}
}
return _e39;
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
},select:function(_e3a){
if(this.mode=="none"){
return;
}
if(this.mode!="multiple"){
this.deselectAll(_e3a);
this.addToSelection(_e3a);
}else{
this.toggleSelect(_e3a);
}
},addToSelection:function(_e3b){
if(this.mode=="none"){
return;
}
if(lang.isArray(_e3b)){
_e30.forEach(_e3b,this.addToSelection,this);
return;
}
_e3b=Number(_e3b);
if(this.selected[_e3b]){
this.selectedIndex=_e3b;
}else{
if(this.onCanSelect(_e3b)!==false){
this.selectedIndex=_e3b;
var _e3c=this.grid.getRowNode(_e3b);
if(_e3c){
_e31.set(_e3c,"aria-selected","true");
}
this._beginUpdate();
this.selected[_e3b]=true;
this.onSelected(_e3b);
this._endUpdate();
}
}
},deselect:function(_e3d){
if(this.mode=="none"){
return;
}
if(lang.isArray(_e3d)){
_e30.forEach(_e3d,this.deselect,this);
return;
}
_e3d=Number(_e3d);
if(this.selectedIndex==_e3d){
this.selectedIndex=-1;
}
if(this.selected[_e3d]){
if(this.onCanDeselect(_e3d)===false){
return;
}
var _e3e=this.grid.getRowNode(_e3d);
if(_e3e){
_e31.set(_e3e,"aria-selected","false");
}
this._beginUpdate();
delete this.selected[_e3d];
this.onDeselected(_e3d);
this._endUpdate();
}
},setSelected:function(_e3f,_e40){
this[(_e40?"addToSelection":"deselect")](_e3f);
},toggleSelect:function(_e41){
if(lang.isArray(_e41)){
_e30.forEach(_e41,this.toggleSelect,this);
return;
}
this.setSelected(_e41,!this.selected[_e41]);
},_range:function(_e42,inTo,func){
var s=(_e42>=0?_e42:inTo),e=inTo;
if(s>e){
e=s;
s=inTo;
}
for(var i=s;i<=e;i++){
func(i);
}
},selectRange:function(_e43,inTo){
this._range(_e43,inTo,lang.hitch(this,"addToSelection"));
},deselectRange:function(_e44,inTo){
this._range(_e44,inTo,lang.hitch(this,"deselect"));
},insert:function(_e45){
this.selected.splice(_e45,0,false);
if(this.selectedIndex>=_e45){
this.selectedIndex++;
}
},remove:function(_e46){
this.selected.splice(_e46,1);
if(this.selectedIndex>=_e46){
this.selectedIndex--;
}
},deselectAll:function(_e47){
for(var i in this.selected){
if((i!=_e47)&&(this.selected[i]===true)){
this.deselect(i);
}
}
},clickSelect:function(_e48,_e49,_e4a){
if(this.mode=="none"){
return;
}
this._beginUpdate();
if(this.mode!="extended"){
this.select(_e48);
}else{
var _e4b=this.selectedIndex;
if(!_e49){
this.deselectAll(_e48);
}
if(_e4a){
this.selectRange(_e4b,_e48);
}else{
if(_e49){
this.toggleSelect(_e48);
}else{
this.addToSelection(_e48);
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
define(["dojo/_base/declare","./_Widget"],function(_e4c,_e4d){
return _e4c("davinci.ve.HTMLWidget",_e4d,{isHtmlWidget:true,constructor:function(_e4e,node){
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
},_getChildrenData:function(_e4f){
function _e50(node){
var d=node.nodeValue.trim();
if(d){
d=davinci.html.escapeXml(d);
}
return d;
};
var _e51=this.domNode;
if(!_e51.hasChildNodes()){
return null;
}
if(_e51.childNodes.length===1&&_e51.firstChild.nodeType===3){
return _e50(_e51.firstChild);
}
var data=[];
dojo.forEach(_e51.childNodes,function(node){
var d;
switch(node.nodeType){
case 1:
var w=require("davinci/ve/widget").byNode(node);
if(w){
d=w.getData(_e4f);
}
break;
case 3:
d=_e50(node);
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
},setProperties:function(_e52,_e53){
var node=this.domNode;
_e53=_e53||false;
for(var name in _e52){
if(name==="style"){
dojo.style(node,_e52[name]);
}else{
if(!_e53){
var _e54=_e52[name];
if(_e54||typeof _e54=="boolean"||typeof _e54=="number"){
node.setAttribute(name,_e54);
}else{
node.removeAttribute(name);
}
}
}
}
this.inherited(arguments);
},resize:function(){
this.getChildren().forEach(function(_e55){
if(_e55.resize){
_e55.resize();
}
});
},_attr:function(name,_e56){
if(arguments.length>1){
this.domNode[name]=_e56;
}else{
return this.domNode[name];
}
},getTagName:function(){
return this.domNode.nodeName.toLowerCase();
}});
});
},"dojo/data/ItemFileWriteStore":function(){
define(["../_base/lang","../_base/declare","../_base/array","../_base/json","../_base/kernel","./ItemFileReadStore","../date/stamp"],function(lang,_e57,_e58,_e59,_e5a,_e5b,_e5c){
return _e57("dojo.data.ItemFileWriteStore",_e5b,{constructor:function(_e5d){
this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap["Date"].serialize){
this._datatypeMap["Date"].serialize=function(obj){
return _e5c.toISOString(obj,{zulu:true});
};
}
if(_e5d&&(_e5d.referenceIntegrity===false)){
this.referenceIntegrity=false;
}
this._saveInProgress=false;
},referenceIntegrity:true,_assert:function(_e5e){
if(!_e5e){
throw new Error("assertion failed in ItemFileWriteStore");
}
},_getIdentifierAttribute:function(){
return this.getFeatures()["dojo.data.api.Identity"];
},newItem:function(_e5f,_e60){
this._assert(!this._saveInProgress);
if(!this._loadFinished){
this._forceLoad();
}
if(typeof _e5f!="object"&&typeof _e5f!="undefined"){
throw new Error("newItem() was passed something other than an object");
}
var _e61=null;
var _e62=this._getIdentifierAttribute();
if(_e62===Number){
_e61=this._arrayOfAllItems.length;
}else{
_e61=_e5f[_e62];
if(typeof _e61==="undefined"){
throw new Error("newItem() was not passed an identity for the new item");
}
if(lang.isArray(_e61)){
throw new Error("newItem() was not passed an single-valued identity");
}
}
if(this._itemsByIdentity){
this._assert(typeof this._itemsByIdentity[_e61]==="undefined");
}
this._assert(typeof this._pending._newItems[_e61]==="undefined");
this._assert(typeof this._pending._deletedItems[_e61]==="undefined");
var _e63={};
_e63[this._storeRefPropName]=this;
_e63[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){
this._itemsByIdentity[_e61]=_e63;
_e63[_e62]=[_e61];
}
this._arrayOfAllItems.push(_e63);
var _e64=null;
if(_e60&&_e60.parent&&_e60.attribute){
_e64={item:_e60.parent,attribute:_e60.attribute,oldValue:undefined};
var _e65=this.getValues(_e60.parent,_e60.attribute);
if(_e65&&_e65.length>0){
var _e66=_e65.slice(0,_e65.length);
if(_e65.length===1){
_e64.oldValue=_e65[0];
}else{
_e64.oldValue=_e65.slice(0,_e65.length);
}
_e66.push(_e63);
this._setValueOrValues(_e60.parent,_e60.attribute,_e66,false);
_e64.newValue=this.getValues(_e60.parent,_e60.attribute);
}else{
this._setValueOrValues(_e60.parent,_e60.attribute,_e63,false);
_e64.newValue=_e63;
}
}else{
_e63[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(_e63);
}
this._pending._newItems[_e61]=_e63;
for(var key in _e5f){
if(key===this._storeRefPropName||key===this._itemNumPropName){
throw new Error("encountered bug in ItemFileWriteStore.newItem");
}
var _e67=_e5f[key];
if(!lang.isArray(_e67)){
_e67=[_e67];
}
_e63[key]=_e67;
if(this.referenceIntegrity){
for(var i=0;i<_e67.length;i++){
var val=_e67[i];
if(this.isItem(val)){
this._addReferenceToMap(val,_e63,key);
}
}
}
}
this.onNew(_e63,_e64);
return _e63;
},_removeArrayElement:function(_e68,_e69){
var _e6a=_e58.indexOf(_e68,_e69);
if(_e6a!=-1){
_e68.splice(_e6a,1);
return true;
}
return false;
},deleteItem:function(item){
this._assert(!this._saveInProgress);
this._assertIsItem(item);
var _e6b=item[this._itemNumPropName];
var _e6c=this.getIdentity(item);
if(this.referenceIntegrity){
var _e6d=this.getAttributes(item);
if(item[this._reverseRefMap]){
item["backup_"+this._reverseRefMap]=lang.clone(item[this._reverseRefMap]);
}
_e58.forEach(_e6d,function(_e6e){
_e58.forEach(this.getValues(item,_e6e),function(_e6f){
if(this.isItem(_e6f)){
if(!item["backupRefs_"+this._reverseRefMap]){
item["backupRefs_"+this._reverseRefMap]=[];
}
item["backupRefs_"+this._reverseRefMap].push({id:this.getIdentity(_e6f),attr:_e6e});
this._removeReferenceFromMap(_e6f,item,_e6e);
}
},this);
},this);
var _e70=item[this._reverseRefMap];
if(_e70){
for(var _e71 in _e70){
var _e72=null;
if(this._itemsByIdentity){
_e72=this._itemsByIdentity[_e71];
}else{
_e72=this._arrayOfAllItems[_e71];
}
if(_e72){
for(var _e73 in _e70[_e71]){
var _e74=this.getValues(_e72,_e73)||[];
var _e75=_e58.filter(_e74,function(_e76){
return !(this.isItem(_e76)&&this.getIdentity(_e76)==_e6c);
},this);
this._removeReferenceFromMap(item,_e72,_e73);
if(_e75.length<_e74.length){
this._setValueOrValues(_e72,_e73,_e75,true);
}
}
}
}
}
}
this._arrayOfAllItems[_e6b]=null;
item[this._storeRefPropName]=null;
if(this._itemsByIdentity){
delete this._itemsByIdentity[_e6c];
}
this._pending._deletedItems[_e6c]=item;
if(item[this._rootItemPropName]){
this._removeArrayElement(this._arrayOfTopLevelItems,item);
}
this.onDelete(item);
return true;
},setValue:function(item,_e77,_e78){
return this._setValueOrValues(item,_e77,_e78,true);
},setValues:function(item,_e79,_e7a){
return this._setValueOrValues(item,_e79,_e7a,true);
},unsetAttribute:function(item,_e7b){
return this._setValueOrValues(item,_e7b,[],true);
},_setValueOrValues:function(item,_e7c,_e7d,_e7e){
this._assert(!this._saveInProgress);
this._assertIsItem(item);
this._assert(lang.isString(_e7c));
this._assert(typeof _e7d!=="undefined");
var _e7f=this._getIdentifierAttribute();
if(_e7c==_e7f){
throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.");
}
var _e80=this._getValueOrValues(item,_e7c);
var _e81=this.getIdentity(item);
if(!this._pending._modifiedItems[_e81]){
var _e82={};
for(var key in item){
if((key===this._storeRefPropName)||(key===this._itemNumPropName)||(key===this._rootItemPropName)){
_e82[key]=item[key];
}else{
if(key===this._reverseRefMap){
_e82[key]=lang.clone(item[key]);
}else{
_e82[key]=item[key].slice(0,item[key].length);
}
}
}
this._pending._modifiedItems[_e81]=_e82;
}
var _e83=false;
if(lang.isArray(_e7d)&&_e7d.length===0){
_e83=delete item[_e7c];
_e7d=undefined;
if(this.referenceIntegrity&&_e80){
var _e84=_e80;
if(!lang.isArray(_e84)){
_e84=[_e84];
}
for(var i=0;i<_e84.length;i++){
var _e85=_e84[i];
if(this.isItem(_e85)){
this._removeReferenceFromMap(_e85,item,_e7c);
}
}
}
}else{
var _e86;
if(lang.isArray(_e7d)){
_e86=_e7d.slice(0,_e7d.length);
}else{
_e86=[_e7d];
}
if(this.referenceIntegrity){
if(_e80){
var _e84=_e80;
if(!lang.isArray(_e84)){
_e84=[_e84];
}
var map={};
_e58.forEach(_e84,function(_e87){
if(this.isItem(_e87)){
var id=this.getIdentity(_e87);
map[id.toString()]=true;
}
},this);
_e58.forEach(_e86,function(_e88){
if(this.isItem(_e88)){
var id=this.getIdentity(_e88);
if(map[id.toString()]){
delete map[id.toString()];
}else{
this._addReferenceToMap(_e88,item,_e7c);
}
}
},this);
for(var rId in map){
var _e89;
if(this._itemsByIdentity){
_e89=this._itemsByIdentity[rId];
}else{
_e89=this._arrayOfAllItems[rId];
}
this._removeReferenceFromMap(_e89,item,_e7c);
}
}else{
for(var i=0;i<_e86.length;i++){
var _e85=_e86[i];
if(this.isItem(_e85)){
this._addReferenceToMap(_e85,item,_e7c);
}
}
}
}
item[_e7c]=_e86;
_e83=true;
}
if(_e7e){
this.onSet(item,_e7c,_e80,_e7d);
}
return _e83;
},_addReferenceToMap:function(_e8a,_e8b,_e8c){
var _e8d=this.getIdentity(_e8b);
var _e8e=_e8a[this._reverseRefMap];
if(!_e8e){
_e8e=_e8a[this._reverseRefMap]={};
}
var _e8f=_e8e[_e8d];
if(!_e8f){
_e8f=_e8e[_e8d]={};
}
_e8f[_e8c]=true;
},_removeReferenceFromMap:function(_e90,_e91,_e92){
var _e93=this.getIdentity(_e91);
var _e94=_e90[this._reverseRefMap];
var _e95;
if(_e94){
for(_e95 in _e94){
if(_e95==_e93){
delete _e94[_e95][_e92];
if(this._isEmpty(_e94[_e95])){
delete _e94[_e95];
}
}
}
if(this._isEmpty(_e94)){
delete _e90[this._reverseRefMap];
}
}
},_dumpReferenceMap:function(){
var i;
for(i=0;i<this._arrayOfAllItems.length;i++){
var item=this._arrayOfAllItems[i];
if(item&&item[this._reverseRefMap]){
}
}
},_getValueOrValues:function(item,_e96){
var _e97=undefined;
if(this.hasAttribute(item,_e96)){
var _e98=this.getValues(item,_e96);
if(_e98.length==1){
_e97=_e98[0];
}else{
_e97=_e98;
}
}
return _e97;
},_flatten:function(_e99){
if(this.isItem(_e99)){
return {_reference:this.getIdentity(_e99)};
}else{
if(typeof _e99==="object"){
for(var type in this._datatypeMap){
var _e9a=this._datatypeMap[type];
if(lang.isObject(_e9a)&&!lang.isFunction(_e9a)){
if(_e99 instanceof _e9a.type){
if(!_e9a.serialize){
throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]");
}
return {_type:type,_value:_e9a.serialize(_e99)};
}
}else{
if(_e99 instanceof _e9a){
return {_type:type,_value:_e99.toString()};
}
}
}
}
return _e99;
}
},_getNewFileContentString:function(){
var _e9b={};
var _e9c=this._getIdentifierAttribute();
if(_e9c!==Number){
_e9b.identifier=_e9c;
}
if(this._labelAttr){
_e9b.label=this._labelAttr;
}
_e9b.items=[];
for(var i=0;i<this._arrayOfAllItems.length;++i){
var item=this._arrayOfAllItems[i];
if(item!==null){
var _e9d={};
for(var key in item){
if(key!==this._storeRefPropName&&key!==this._itemNumPropName&&key!==this._reverseRefMap&&key!==this._rootItemPropName){
var _e9e=this.getValues(item,key);
if(_e9e.length==1){
_e9d[key]=this._flatten(_e9e[0]);
}else{
var _e9f=[];
for(var j=0;j<_e9e.length;++j){
_e9f.push(this._flatten(_e9e[j]));
_e9d[key]=_e9f;
}
}
}
}
_e9b.items.push(_e9d);
}
}
var _ea0=true;
return _e59.toJson(_e9b,_ea0);
},_isEmpty:function(_ea1){
var _ea2=true;
if(lang.isObject(_ea1)){
var i;
for(i in _ea1){
_ea2=false;
break;
}
}else{
if(lang.isArray(_ea1)){
if(_ea1.length>0){
_ea2=false;
}
}
}
return _ea2;
},save:function(_ea3){
this._assert(!this._saveInProgress);
this._saveInProgress=true;
var self=this;
var _ea4=function(){
self._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
self._saveInProgress=false;
if(_ea3&&_ea3.onComplete){
var _ea5=_ea3.scope||_e5a.global;
_ea3.onComplete.call(_ea5);
}
};
var _ea6=function(err){
self._saveInProgress=false;
if(_ea3&&_ea3.onError){
var _ea7=_ea3.scope||_e5a.global;
_ea3.onError.call(_ea7,err);
}
};
if(this._saveEverything){
var _ea8=this._getNewFileContentString();
this._saveEverything(_ea4,_ea6,_ea8);
}
if(this._saveCustom){
this._saveCustom(_ea4,_ea6);
}
if(!this._saveEverything&&!this._saveCustom){
_ea4();
}
},revert:function(){
this._assert(!this._saveInProgress);
var _ea9;
for(_ea9 in this._pending._modifiedItems){
var _eaa=this._pending._modifiedItems[_ea9];
var _eab=null;
if(this._itemsByIdentity){
_eab=this._itemsByIdentity[_ea9];
}else{
_eab=this._arrayOfAllItems[_ea9];
}
_eaa[this._storeRefPropName]=this;
for(var key in _eab){
delete _eab[key];
}
lang.mixin(_eab,_eaa);
}
var _eac;
for(_ea9 in this._pending._deletedItems){
_eac=this._pending._deletedItems[_ea9];
_eac[this._storeRefPropName]=this;
var _ead=_eac[this._itemNumPropName];
if(_eac["backup_"+this._reverseRefMap]){
_eac[this._reverseRefMap]=_eac["backup_"+this._reverseRefMap];
delete _eac["backup_"+this._reverseRefMap];
}
this._arrayOfAllItems[_ead]=_eac;
if(this._itemsByIdentity){
this._itemsByIdentity[_ea9]=_eac;
}
if(_eac[this._rootItemPropName]){
this._arrayOfTopLevelItems.push(_eac);
}
}
for(_ea9 in this._pending._deletedItems){
_eac=this._pending._deletedItems[_ea9];
if(_eac["backupRefs_"+this._reverseRefMap]){
_e58.forEach(_eac["backupRefs_"+this._reverseRefMap],function(_eae){
var _eaf;
if(this._itemsByIdentity){
_eaf=this._itemsByIdentity[_eae.id];
}else{
_eaf=this._arrayOfAllItems[_eae.id];
}
this._addReferenceToMap(_eaf,_eac,_eae.attr);
},this);
delete _eac["backupRefs_"+this._reverseRefMap];
}
}
for(_ea9 in this._pending._newItems){
var _eb0=this._pending._newItems[_ea9];
_eb0[this._storeRefPropName]=null;
this._arrayOfAllItems[_eb0[this._itemNumPropName]]=null;
if(_eb0[this._rootItemPropName]){
this._removeArrayElement(this._arrayOfTopLevelItems,_eb0);
}
if(this._itemsByIdentity){
delete this._itemsByIdentity[_ea9];
}
}
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true;
},isDirty:function(item){
if(item){
var _eb1=this.getIdentity(item);
return new Boolean(this._pending._newItems[_eb1]||this._pending._modifiedItems[_eb1]||this._pending._deletedItems[_eb1]).valueOf();
}else{
return !this._isEmpty(this._pending._newItems)||!this._isEmpty(this._pending._modifiedItems)||!this._isEmpty(this._pending._deletedItems);
}
},onSet:function(item,_eb2,_eb3,_eb4){
},onNew:function(_eb5,_eb6){
},onDelete:function(_eb7){
},close:function(_eb8){
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
define(["dojo/_base/lang","dojo/_base/declare","./_TabContainerBase","./TabController","./ScrollingTabController"],function(lang,_eb9,_eba,_ebb,_ebc){
return _eb9("dijit.layout.TabContainer",_eba,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_ebd){
var cls=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_ebb=typeof this.controllerWidget=="string"?lang.getObject(this.controllerWidget):this.controllerWidget;
return new _ebb({id:this.id+"_tablist",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":cls,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_ebd);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?_ebc:_ebb;
}
}});
});
},"davinci/html/HTMLElement":function(){
define(["dojo/_base/declare","davinci/html/HTMLItem","davinci/html/HTMLText","davinci/html/HTMLComment","davinci/html/HTMLAttribute"],function(_ebe,_ebf,_ec0,_ec1,_ec2){
return _ebe("davinci.html.HTMLElement",_ebf,{constructor:function(tag){
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
},getText:function(_ec3){
_ec3=_ec3||{};
var s="";
var _ec4;
_ec3.indent+=2;
s=s+"<"+this.tag;
for(var i=0;i<this.attributes.length;i++){
var _ec5=this.attributes[i].getText(_ec3);
if(_ec5.length>0){
s=s+" "+_ec5;
}
}
if(this.noEndTag){
s=s+"/>";
}else{
s=s+">";
s=s+this._addWS(this._fmChildLine,this._fmChildIndent);
if(this.statements){
for(var i=0;i<this.statements.length;i++){
s=s+this.statements[i].printStatement(_ec3,this.statements[i]);
}
}else{
if(this.script){
s=s+this.script;
}else{
if(this.children.length>0){
var _ec6=this.tag=="style";
for(var i=0;i<this.children.length;i++){
s=s+this.children[i].getText(_ec3);
if(_ec6){
var _ec7=this._fmChildLine,_ec8=this._fmChildIndent||0;
if(i+1==this.children.length){
_ec7=this._fmLine;
_ec8=this._fmIndent;
}
s=s+this._addWS(_ec7,_ec8);
}
}
}
}
}
if(_ec4&&this.children.length>0){
s=s+"\n"+"                                          ".substring(0,_ec3.indent+1);
}
s=s+"</"+this.tag+">";
}
_ec3.indent-=2;
s=s+this._addWS(this._fmLine,this._fmIndent);
return s;
},_formatModel:function(_ec9,_eca,_ecb){
var _ecc=0;
var _ecd=1;
if(_eca==undefined){
_eca=this.children.length;
}
function _ece(_ecf,_ed0,elem){
_ecc+=(_ecd+_ecf);
if(_ed0){
_ed0._fmChildLine=1;
_ed0._fmChildIndent=_ecb.indent;
}else{
elem._fmLine=1;
elem._fmIndent=_ecb.indent;
}
};
function _ed1(elem,_ed2){
elem.startOffset=_ecc;
elem.wasParsed=true;
_ecc+=elem.tag.length+2;
for(var i=0;i<elem.attributes.length;i++){
elem.attributes[i].startOffset=_ecc;
var _ed3=elem.attributes[i].getText(_ed2);
if(_ed3.length>0){
_ecc+=1+_ed3.length;
}
elem.attributes[i].endOffset=_ecc-1;
}
if(elem.noEndTag){
_ecc++;
}
elem.startTagOffset=_ecc;
var s="";
if(elem.statements){
for(var i=0;i<elem.statements.length;i++){
s=s+elem.statements[i].printStatement(_ed2,elem.statements[i]);
}
}else{
if(elem.script){
s=elem.script;
}
}
if(s){
_ecc+=s.length;
}else{
if(elem.children.length>0){
var _ed4;
if(!davinci.html._noFormatElements[elem.tag]){
_ed2.indent+=2;
_ece(_ed2.indent,elem);
_ed4=true;
}
var _ed5;
for(var i=0;i<elem.children.length;i++){
var _ed6=elem.children[i];
switch(_ed6.elementType){
case "HTMLElement":
if(_ed5&&_ed5.elementType!="HTMLText"&&!davinci.html._noFormatElements[_ed6.tag]){
_ece(_ed2.indent,null,_ed5);
}
_ed1(_ed6,_ed2);
break;
case "HTMLText":
_ed6.startOffset=_ecc;
_ecc+=_ed6.value.length;
break;
case "HTMLComment":
_ed6.startOffset=_ecc;
_ecc+=_ed6.value.length;
_ecc++;
if(_ed6.isProcessingInstruction){
_ecc+=2;
}
break;
default:
debugger;
}
_ed5=_ed6;
}
if(_ed4){
_ed2.indent-=2;
}
if(_ed5&&_ed5.elementType!="HTMLText"){
_ece(_ed2.indent,null,_ed5);
}
}
}
_ecc+=elem.tag.length+3;
elem.endOffset=_ecc-1;
};
var _ed7,_ed8;
if(!this.children.length||_eca==0){
_ed7=this;
_ecc=this.startTagOffset+1;
}else{
_ed8=this.children[_eca-1];
_ecc=_ed8.endOffset+1;
}
var _ed9=_ecc;
if(!davinci.html._noFormatElements[_ec9.tag]){
_ece(_ecb.indent,_ed7,_ed8);
_ec9._fmLine=1;
_ec9._fmIndent=(_eca<this.children.length)?_ecb.indent:_ecb.indent-2;
}
_ed1(_ec9,_ecb);
return (_ecc>_ed9)?_ecc-_ed9:0;
},getElementText:function(_eda){
_eda=_eda||{};
var s="";
if(this.children.length>0){
for(var i=0;i<this.children.length;i++){
if(this.children[i].elementType!="HTMLComment"){
s=s+this.children[i].getText(_eda);
}
}
}else{
if(this.script){
return this.script;
}else{
if(this.statements){
for(var i=0;i<this.statements.length;i++){
s=s+this.statements[i].printStatement(_eda,this.statements[i]);
}
}
}
}
return s;
},getChildElements:function(_edb,_edc,_edd){
_edd=_edd||[];
for(var i=0;i<this.children.length;i++){
if(this.children[i].tag==_edb){
_edd.push(this.children[i]);
}
if(_edc&&this.children[i].elementType=="HTMLElement"){
this.children[i].getChildElements(_edb,_edc,_edd);
}
}
return _edd;
},getChildElement:function(_ede){
for(var i=0;i<this.children.length;i++){
if(this.children[i].tag==_ede){
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
this.addChild(new _ec0(text));
this.onChange();
},addComment:function(text){
this.addChild(new _ec1(text));
this.onChange();
},getLabel:function(){
return "<"+this.tag+">";
},addAttribute:function(name,_edf,_ee0){
if(name=="textContent"){
this.children=[];
this.addText(_edf);
return;
}
var _ee1;
var _ee2=(this.attributes.length>0)?this.attributes[this.attributes.length-1].endOffset+1:this.startTagOffset-(this.noEndTag?2:1);
var attr=this._getAttribute(name);
var add;
if(!attr){
attr=new _ec2();
add=true;
_ee1=name.length+_edf.length+4;
attr.startOffset=_ee2;
attr.endOffset=_ee2+_ee1-1;
}else{
_ee1=_edf.length-attr.value.length;
}
attr.name=name;
attr.setValue(_edf);
attr.noPersist=_ee0;
if(this.wasParsed&&!_ee0&&_ee1>0){
this.getHTMLFile().updatePositions(_ee2,_ee1);
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
},setAttribute:function(name,_ee3){
this.removeAttribute(name);
this.addAttribute(name,_ee3);
},getUniqueID:function(_ee4){
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
this.addAttribute("id",this.tag+"_"+id,_ee4);
}
},findElement:function(id){
var attr=this.getAttribute("id");
if(id==attr){
return this;
}
for(var i=0;i<this.children.length;i++){
if(this.children[i].elementType=="HTMLElement"){
var _ee5=this.children[i].findElement(id);
if(_ee5){
return _ee5;
}
}
}
},insertBefore:function(_ee6,_ee7){
var _ee8=dojo.indexOf(this.children,_ee7);
if(_ee8<0){
_ee8=undefined;
}
this.addChild(_ee6,_ee8);
this.onChange();
},addChild:function(_ee9,_eea,_eeb){
if(!_eeb&&this.wasParsed){
if(_ee9.elementType=="HTMLElement"){
var _eec=this._getIndent();
var _eed;
if(_eea<this.children.length&&this.children[_eea].elementType=="HTMLElement"){
_eed=this.children[_eea]._getIndent();
}else{
if(this.children.length){
dojo.forEach(this.children,function(_eee){
if(_eee.elementType=="HTMLElement"){
_eed=_eee._getIndent();
}
});
}else{
_eed=_eec+1;
}
}
var _eef=_eed;
var _ef0={indent:_eef};
var _ef1=this._formatModel(_ee9,_eea,_ef0);
this.getHTMLFile().updatePositions(_ee9.startOffset,_ef1);
}else{
if(_ee9.elementType=="HTMLText"||_ee9.elementType.substring(0,3)=="CSS"){
var s=_ee9.getText();
var _ef2=this.children.length?this.children[this.children.length-1].endOffset:this.startTagOffset;
var len=s.length;
if(len>0){
if(_ee9.elementType!="HTMLText"){
len+=this._fmChildIndent+1;
}
this.getHTMLFile().updatePositions(_ef2+1,len);
}
_ee9.startOffset=_ef2+1;
_ee9.endOffset=_ee9.startOffset+s.length-1;
}
}
}
_ebf.prototype.addChild.apply(this,arguments);
},removeChild:function(_ef3){
var _ef4=dojo.indexOf(this.children,_ef3);
var _ef5=1;
if(_ef4>=0){
var _ef6=1+_ef3.endOffset-_ef3.startOffset;
if(_ef3.elementType=="HTMLElement"){
if(this.children.length==1){
_ef6+=this._fmChildLine*_ef5+this._fmChildIndent;
this._fmChildIndent-=2;
}else{
if(_ef4>0&&this.children[_ef4-1].elementType=="HTMLElement"){
var _ef7=this.children[_ef4-1];
_ef6+=_ef7._fmLine*_ef5+_ef7._fmIndent;
}
if(_ef4+1==this.children.length&&this.children[_ef4-1].elementType=="HTMLElement"){
this.children[_ef4-1]._fmChildIndent-=2;
}
}
}
if(_ef6>0&&this.wasParsed){
this.getHTMLFile().updatePositions(_ef3.startOffset,0-_ef6);
}
}
_ebf.prototype.removeChild.apply(this,arguments);
},_textModify:function(_ef8,_ef9){
var _efa=_ef8.length-_ef9.length;
if(_efa!=0&&this.wasParsed){
this.getHTMLFile().updatePositions(this.startOffset,_efa);
}
},setScript:function(_efb){
this._textModify(_efb,this.script);
this.script=_efb;
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
},visit:function(_efc){
if(!_efc.visit(this)){
for(var i=0;i<this.attributes.length;i++){
this.attributes[i].visit(_efc);
}
for(var i=0;i<this.children.length;i++){
this.children[i].visit(_efc);
}
}
if(_efc.endVisit){
_efc.endVisit(this);
}
},setText:function(text){
this.script="";
var _efd={xmode:"outer"};
var _efe=this.parent;
var _eff=require("davinci/html/HTMLParser").parse(text,this);
this.errors=_eff.errors;
dojo.mixin(this,this.children[0]);
this.parent=_efe;
this.visit({visit:function(node){
delete node.wasParsed;
},rules:[]});
this.onChange();
}});
});
},"dojox/data/QueryReadStore":function(){
define(["dojo","dojox","dojo/data/util/sorter","dojo/string"],function(dojo,_f00){
dojo.declare("dojox.data.QueryReadStore",null,{url:"",requestMethod:"get",_className:"dojox.data.QueryReadStore",_items:[],_lastServerQuery:null,_numRows:-1,lastRequestHash:null,doClientPaging:false,doClientSorting:false,_itemsByIdentity:null,_identifier:null,_features:{"dojo.data.api.Read":true,"dojo.data.api.Identity":true},_labelAttr:"label",constructor:function(_f01){
dojo.mixin(this,_f01);
},getValue:function(item,_f02,_f03){
this._assertIsItem(item);
if(!dojo.isString(_f02)){
throw new Error(this._className+".getValue(): Invalid attribute, string expected!");
}
if(!this.hasAttribute(item,_f02)){
if(_f03){
return _f03;
}
}
return item.i[_f02];
},getValues:function(item,_f04){
this._assertIsItem(item);
var ret=[];
if(this.hasAttribute(item,_f04)){
ret.push(item.i[_f04]);
}
return ret;
},getAttributes:function(item){
this._assertIsItem(item);
var ret=[];
for(var i in item.i){
ret.push(i);
}
return ret;
},hasAttribute:function(item,_f05){
return this.isItem(item)&&typeof item.i[_f05]!="undefined";
},containsValue:function(item,_f06,_f07){
var _f08=this.getValues(item,_f06);
var len=_f08.length;
for(var i=0;i<len;i++){
if(_f08[i]==_f07){
return true;
}
}
return false;
},isItem:function(_f09){
if(_f09){
return typeof _f09.r!="undefined"&&_f09.r==this;
}
return false;
},isItemLoaded:function(_f0a){
return this.isItem(_f0a);
},loadItem:function(args){
if(this.isItemLoaded(args.item)){
return;
}
},fetch:function(_f0b){
_f0b=_f0b||{};
if(!_f0b.store){
_f0b.store=this;
}
var self=this;
var _f0c=function(_f0d,_f0e){
if(_f0e.onError){
var _f0f=_f0e.scope||dojo.global;
_f0e.onError.call(_f0f,_f0d,_f0e);
}
};
var _f10=function(_f11,_f12,_f13){
var _f14=_f12.abort||null;
var _f15=false;
var _f16=_f12.start?_f12.start:0;
if(self.doClientPaging==false){
_f16=0;
}
var _f17=_f12.count?(_f16+_f12.count):_f11.length;
_f12.abort=function(){
_f15=true;
if(_f14){
_f14.call(_f12);
}
};
var _f18=_f12.scope||dojo.global;
if(!_f12.store){
_f12.store=self;
}
if(_f12.onBegin){
_f12.onBegin.call(_f18,_f13,_f12);
}
if(_f12.sort&&self.doClientSorting){
_f11.sort(dojo.data.util.sorter.createSortFunction(_f12.sort,self));
}
if(_f12.onItem){
for(var i=_f16;(i<_f11.length)&&(i<_f17);++i){
var item=_f11[i];
if(!_f15){
_f12.onItem.call(_f18,item,_f12);
}
}
}
if(_f12.onComplete&&!_f15){
var _f19=null;
if(!_f12.onItem){
_f19=_f11.slice(_f16,_f17);
}
_f12.onComplete.call(_f18,_f19,_f12);
}
};
this._fetchItems(_f0b,_f10,_f0c);
return _f0b;
},getFeatures:function(){
return this._features;
},close:function(_f1a){
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
},_xhrFetchHandler:function(data,_f1b,_f1c,_f1d){
data=this._filterResponse(data);
if(data.label){
this._labelAttr=data.label;
}
var _f1e=data.numRows||-1;
this._items=[];
dojo.forEach(data.items,function(e){
this._items.push({i:e,r:this});
},this);
var _f1f=data.identifier;
this._itemsByIdentity={};
if(_f1f){
this._identifier=_f1f;
var i;
for(i=0;i<this._items.length;++i){
var item=this._items[i].i;
var _f20=item[_f1f];
if(!this._itemsByIdentity[_f20]){
this._itemsByIdentity[_f20]=item;
}else{
throw new Error(this._className+":  The json data as specified by: ["+this.url+"] is malformed.  Items within the list have identifier: ["+_f1f+"].  Value collided: ["+_f20+"]");
}
}
}else{
this._identifier=Number;
for(i=0;i<this._items.length;++i){
this._items[i].n=i;
}
}
_f1e=this._numRows=(_f1e===-1)?this._items.length:_f1e;
_f1c(this._items,_f1b,_f1e);
this._numRows=_f1e;
},_fetchItems:function(_f21,_f22,_f23){
var _f24=_f21.serverQuery||_f21.query||{};
if(!this.doClientPaging){
_f24.start=_f21.start||0;
if(_f21.count){
_f24.count=_f21.count;
}
}
if(!this.doClientSorting&&_f21.sort){
var _f25=[];
dojo.forEach(_f21.sort,function(sort){
if(sort&&sort.attribute){
_f25.push((sort.descending?"-":"")+sort.attribute);
}
});
_f24.sort=_f25.join(",");
}
if(this.doClientPaging&&this._lastServerQuery!==null&&dojo.toJson(_f24)==dojo.toJson(this._lastServerQuery)){
this._numRows=(this._numRows===-1)?this._items.length:this._numRows;
_f22(this._items,_f21,this._numRows);
}else{
var _f26=this.requestMethod.toLowerCase()=="post"?dojo.xhrPost:dojo.xhrGet;
var _f27=_f26({url:this.url,handleAs:"json-comment-optional",content:_f24,failOk:true});
_f21.abort=function(){
_f27.cancel();
};
_f27.addCallback(dojo.hitch(this,function(data){
this._xhrFetchHandler(data,_f21,_f22,_f23);
}));
_f27.addErrback(function(_f28){
_f23(_f28,_f21);
});
this.lastRequestHash=new Date().getTime()+"-"+String(Math.random()).substring(2);
this._lastServerQuery=dojo.mixin({},_f24);
}
},_filterResponse:function(data){
return data;
},_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error(this._className+": Invalid item argument.");
}
},_assertIsAttribute:function(_f29){
if(typeof _f29!=="string"){
throw new Error(this._className+": Invalid attribute argument ('"+_f29+"').");
}
},fetchItemByIdentity:function(_f2a){
if(this._itemsByIdentity){
var item=this._itemsByIdentity[_f2a.identity];
if(!(item===undefined)){
if(_f2a.onItem){
var _f2b=_f2a.scope?_f2a.scope:dojo.global;
_f2a.onItem.call(_f2b,{i:item,r:this});
}
return;
}
}
var _f2c=function(_f2d,_f2e){
var _f2f=_f2a.scope?_f2a.scope:dojo.global;
if(_f2a.onError){
_f2a.onError.call(_f2f,_f2d);
}
};
var _f30=function(_f31,_f32){
var _f33=_f2a.scope?_f2a.scope:dojo.global;
try{
var item=null;
if(_f31&&_f31.length==1){
item=_f31[0];
}
if(_f2a.onItem){
_f2a.onItem.call(_f33,item);
}
}
catch(error){
if(_f2a.onError){
_f2a.onError.call(_f33,error);
}
}
};
var _f34={serverQuery:{id:_f2a.identity}};
this._fetchItems(_f34,_f30,_f2c);
},getIdentity:function(item){
var _f35=null;
if(this._identifier===Number){
_f35=item.n;
}else{
_f35=item.i[this._identifier];
}
return _f35;
},getIdentityAttributes:function(item){
return [this._identifier];
}});
return _f00.data.QueryReadStore;
});
},"davinci/ui/widgets/ThemeSelection":function(){
define(["dojo/_base/declare","dijit/_Widget","davinci/library","davinci/Runtime","davinci/Workbench","system/resource","dojo/i18n!davinci/ui/nls/ui","dojo/i18n!dijit/nls/common"],function(_f36,_f37,_f38,_f39,_f3a,_f3b,_f3c,_f3d){
return _f36("davinci.ui.widgets.ThemeSelection",[_f37],{workspaceOnly:true,message:"Theme version does not match workspace version this could produce unexpected results. We suggest recreating the custom theme using the current version of Maqetta and deleting the existing theme.",buildRendering:function(){
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
this._themeData=_f38.getThemes(_f3a.getProject(),this.workspaceOnly);
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
},_setValueAttr:function(_f3e){
if(!this._hasValue(_f3e)){
return;
}
this._selection=_f3e;
if(_f3e&&_f3e.name){
this._selection=_f3e.name;
}
this._selectValue(this._selection);
},_hasValue:function(_f3f){
for(var i=0;i<this._select.children.length;i++){
if(this._select.children[i].value==_f3f){
return true;
}
}
return false;
},_selectValue:function(_f40){
var _f41=false;
for(var i=0;i<this._select.children.length;i++){
if(this._select.children[i].selected){
this._select.children[i].selected=false;
}
if(!_f41&&this._select.children[i].value==_f40){
this._select.children[i].selected=true;
var _f41=true;
}
}
if(!_f41&&_f40!=null){
var op=dojo.doc.createElement("option");
op.value=_f40;
op.text=_f40;
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
},_setWorkspaceOnlyAttr:function(_f42){
this.workspaceOnly=_f42;
},onChange:function(){
},_onChange:function(){
var _f43=this._getValueAttr();
if(_f43==null||this._blockChange){
return;
}
this.value=_f43;
this._cookieName="maqetta_"+_f43.name+"_"+_f43.version;
var _f44=dojo.cookie(this._cookieName);
if(this.dojoVersion&&_f43.version!==this.dojoVersion&&!_f44){
this._warnDiv.innerHTML="<table>"+"<tr><td></td><td>"+this.message+"</td><td></td></tr>"+"<tr><td></td><td align=\"center\"><button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"davinci.ui.widgets.ThemeSelection.ok\">Ok</button><button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"davinci.ui.widgets.ThemeSelection.cancel\">Cancel</button></td><td></td></tr>"+"</table>";
var ok=dijit.byId("davinci.ui.widgets.ThemeSelection.ok");
var _f45=dijit.byId("davinci.ui.widgets.ThemeSelection.cancel");
dojo.connect(ok,"onClick",this,"_warnOk");
dojo.connect(_f45,"onClick",this,"_warnCancel");
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
var _f46=dijit.byId("davinci.ui.widgets.ThemeSelection.cancel");
dojo.disconnect(_f46);
_f46.destroy();
}});
});
},"dijit/tree/_dndContainer":function(){
define(["dojo/aspect","dojo/_base/declare","dojo/dom-class","dojo/_base/event","dojo/_base/lang","dojo/on","dojo/touch"],function(_f47,_f48,_f49,_f4a,lang,on,_f4b){
return _f48("dijit.tree._dndContainer",null,{constructor:function(tree,_f4c){
this.tree=tree;
this.node=tree.domNode;
lang.mixin(this,_f4c);
this.current=null;
this.containerState="";
_f49.add(this.node,"dojoDndContainer");
this.events=[on(this.node,_f4b.enter,lang.hitch(this,"onOverEvent")),on(this.node,_f4b.leave,lang.hitch(this,"onOutEvent")),_f47.after(this.tree,"_onNodeMouseEnter",lang.hitch(this,"onMouseOver"),true),_f47.after(this.tree,"_onNodeMouseLeave",lang.hitch(this,"onMouseOut"),true),on(this.node,"dragstart",lang.hitch(_f4a,"stop")),on(this.node,"selectstart",lang.hitch(_f4a,"stop"))];
},destroy:function(){
var h;
while(h=this.events.pop()){
h.remove();
}
this.node=this.parent=null;
},onMouseOver:function(_f4d){
this.current=_f4d;
},onMouseOut:function(){
this.current=null;
},_changeState:function(type,_f4e){
var _f4f="dojoDnd"+type;
var _f50=type.toLowerCase()+"State";
_f49.replace(this.node,_f4f+_f4e,_f4f+this[_f50]);
this[_f50]=_f4e;
},_addItemClass:function(node,type){
_f49.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_f49.remove(node,"dojoDndItem"+type);
},onOverEvent:function(){
this._changeState("Container","Over");
},onOutEvent:function(){
this._changeState("Container","");
}});
});
},"davinci/js/JSFile":function(){
define(["dojo/_base/declare","davinci/js/JSElement"],function(_f51,_f52){
return _f51("davinci.js.JSFile",_f52,{constructor:function(_f53){
this.elementType="JSFile";
this.nosemicolon=true;
this._textContent="";
if(_f53){
this.origin=_f53;
}
},getText:function(_f54){
return this._textContent;
},setText:function(text){
this._textContent=text;
},getLabel:function(){
return this.fileName;
},getID:function(){
return this.fileName;
},visit:function(_f55){
var _f56;
_f56=_f55.visit(this);
if(!_f56){
for(var i=0;i<this.children.length;i++){
this.children[i].visit(_f55);
}
}
if(_f55.endVisit){
_f55.endVisit(this);
}
}});
});
},"url:davinci/de/widgets/templates/NewDijit.html":"<div>\n\t<div class=\"dijitDialogPaneContentArea\">\n\t\t<table>\n\t\t<tr>\n\t\t<td class=\"NewProjectDialogLabel\">Widget Group:</td><td><input class='templateInput' type='text' dojoAttachPoint=\"_widgetGroup\" vaule='MyWidgets'></input></td><td><div dojoAttachPoint='_error3'></div></td>\n\t\t\n\t\t</tr>\n\t\t\n\t\t<tr>\n\t\t<td class=\"NewProjectDialogLabel\">Widget Name:</td><td><input class='templateInput' type='text' dojoAttachPoint=\"_dijitName\"></input></td><td><div dojoAttachPoint='_error4'></div></td>\n\t\t</tr>\n\t\t<tr style='display:none;'>\n\t\t<td class=\"NewProjectDialogLabel\">Replace Selection with new Widget</td><td><input class='templateInput' type='checkbox' dojoAttachPoint=\"_replaceSelection\"></input></td><td><div dojoAttachPoint='_error5'></div></td>\n\t\t</tr>\n\t\t</table>\n\t</div>\n\n\t<div class=\"dijitDialogPaneActionBar\">\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"_okButton\" dojoAttachEvent='onClick:okButton' label='OK' type=\"submit\" class=\"maqPrimaryButton\" disabled></button> \n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:cancelButton' label='Cancel' class=\"maqSecondaryButton\"></button>\n\t</div>\t\t\n</div>","dojo/i18n":function(){
define(["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json","module"],function(dojo,_f57,has,_f58,_f59,lang,xhr,json,_f5a){
has.add("dojo-preload-i18n-Api",1);
1||has.add("dojo-v1x-i18n-Api",1);
var _f5b=dojo.i18n={},_f5c=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_f5d=function(root,_f5e,_f5f,_f60){
for(var _f61=[_f5f+_f60],_f62=_f5e.split("-"),_f63="",i=0;i<_f62.length;i++){
_f63+=(_f63?"-":"")+_f62[i];
if(!root||root[_f63]){
_f61.push(_f5f+_f63+"/"+_f60);
}
}
return _f61;
},_f64={},_f65=function(_f66,_f67,_f68){
_f68=_f68?_f68.toLowerCase():dojo.locale;
_f66=_f66.replace(/\./g,"/");
_f67=_f67.replace(/\./g,"/");
return (/root/i.test(_f68))?(_f66+"/nls/"+_f67):(_f66+"/nls/"+_f68+"/"+_f67);
},_f69=dojo.getL10nName=function(_f6a,_f6b,_f6c){
return _f6a=_f5a.id+"!"+_f65(_f6a,_f6b,_f6c);
},_f6d=function(_f6e,_f6f,_f70,_f71,_f72,load){
_f6e([_f6f],function(root){
var _f73=lang.clone(root.root),_f74=_f5d(!root._v1x&&root,_f72,_f70,_f71);
_f6e(_f74,function(){
for(var i=1;i<_f74.length;i++){
_f73=lang.mixin(lang.clone(_f73),arguments[i]);
}
var _f75=_f6f+"/"+_f72;
_f64[_f75]=_f73;
load();
});
});
},_f76=function(id,_f77){
return /^\./.test(id)?_f77(id):id;
},_f78=function(_f79){
var list=_f59.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(_f79);
return list;
},load=function(id,_f7a,load){
if(has("dojo-preload-i18n-Api")){
var _f7b=id.split("*"),_f7c=_f7b[1]=="preload";
if(_f7c){
if(!_f64[id]){
_f64[id]=1;
_f7d(_f7b[2],json.parse(_f7b[3]),1,_f7a);
}
load(1);
}
if(_f7c||_f7e(id,_f7a,load)){
return;
}
}
var _f7f=_f5c.exec(id),_f80=_f7f[1]+"/",_f81=_f7f[5]||_f7f[4],_f82=_f80+_f81,_f83=(_f7f[5]&&_f7f[4]),_f84=_f83||dojo.locale,_f85=_f82+"/"+_f84,_f86=_f83?[_f84]:_f78(_f84),_f87=_f86.length,_f88=function(){
if(!--_f87){
load(lang.delegate(_f64[_f85]));
}
};
_f58.forEach(_f86,function(_f89){
var _f8a=_f82+"/"+_f89;
if(has("dojo-preload-i18n-Api")){
_f8b(_f8a);
}
if(!_f64[_f8a]){
_f6d(_f7a,_f82,_f80,_f81,_f89,_f88);
}else{
_f88();
}
});
};
if(has("dojo-unit-tests")){
var _f8c=_f5b.unitTests=[];
}
if(has("dojo-preload-i18n-Api")||1){
var _f8d=_f5b.normalizeLocale=function(_f8e){
var _f8f=_f8e?_f8e.toLowerCase():dojo.locale;
return _f8f=="root"?"ROOT":_f8f;
},isXd=function(mid,_f90){
return (1&&1)?_f90.isXdUrl(_f57.toUrl(mid+".js")):true;
},_f91=0,_f92=[],_f7d=_f5b._preloadLocalizations=function(_f93,_f94,_f95,_f96){
_f96=_f96||_f57;
function _f97(mid,_f98){
if(isXd(mid,_f96)||_f95){
_f96([mid],_f98);
}else{
_fa2([mid],_f98,_f96);
}
};
function _f99(_f9a,func){
var _f9b=_f9a.split("-");
while(_f9b.length){
if(func(_f9b.join("-"))){
return;
}
_f9b.pop();
}
func("ROOT");
};
function _f9c(_f9d){
_f9d=_f8d(_f9d);
_f99(_f9d,function(loc){
if(_f58.indexOf(_f94,loc)>=0){
var mid=_f93.replace(/\./g,"/")+"_"+loc;
_f91++;
_f97(mid,function(_f9e){
for(var p in _f9e){
_f64[_f57.toAbsMid(p)+"/"+loc]=_f9e[p];
}
--_f91;
while(!_f91&&_f92.length){
load.apply(null,_f92.shift());
}
});
return true;
}
return false;
});
};
_f9c();
_f58.forEach(dojo.config.extraLocale,_f9c);
},_f7e=function(id,_f9f,load){
if(_f91){
_f92.push([id,_f9f,load]);
}
return _f91;
},_f8b=function(){
};
}
if(1){
var _fa0={},_fa1=new Function("__bundle","__checkForLegacyModules","__mid","__amdValue","var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"+"\t   require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return __amdValue;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_fa2=function(deps,_fa3,_fa4){
var _fa5=[];
_f58.forEach(deps,function(mid){
var url=_fa4.toUrl(mid+".js");
function load(text){
var _fa6=_fa1(text,_f8b,mid,_fa0);
if(_fa6===_fa0){
_fa5.push(_f64[url]=_fa0.result);
}else{
if(_fa6 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_fa6);
_fa6={};
}
_fa5.push(_f64[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_fa6:{root:_fa6,_v1x:1}));
}
};
if(_f64[url]){
_fa5.push(_f64[url]);
}else{
var _fa7=_fa4.syncLoadNls(mid);
if(_fa7){
_fa5.push(_fa7);
}else{
if(!xhr){
try{
_fa4.getText(url,true,load);
}
catch(e){
_fa5.push(_f64[url]={});
}
}else{
xhr.get({url:url,sync:true,load:load,error:function(){
_fa5.push(_f64[url]={});
}});
}
}
}
});
_fa3&&_fa3.apply(null,_fa5);
};
_f8b=function(_fa8){
for(var _fa9,_faa=_fa8.split("/"),_fab=dojo.global[_faa[0]],i=1;_fab&&i<_faa.length-1;_fab=_fab[_faa[i++]]){
}
if(_fab){
_fa9=_fab[_faa[i]];
if(!_fa9){
_fa9=_fab[_faa[i].replace(/-/g,"_")];
}
if(_fa9){
_f64[_fa8]=_fa9;
}
}
return _fa9;
};
_f5b.getLocalization=function(_fac,_fad,_fae){
var _faf,_fb0=_f65(_fac,_fad,_fae);
load(_fb0,(!isXd(_fb0,_f57)?function(deps,_fb1){
_fa2(deps,_fb1,_f57);
}:_f57),function(_fb2){
_faf=_fb2;
});
return _faf;
};
if(has("dojo-unit-tests")){
_f8c.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _fb3;
_fb3=_fa1("{prop:1}",_f8b,"nonsense",_fa0);
t.is({prop:1},_fb3);
t.is(undefined,_fb3[1]);
_fb3=_fa1("({prop:1})",_f8b,"nonsense",_fa0);
t.is({prop:1},_fb3);
t.is(undefined,_fb3[1]);
_fb3=_fa1("{'prop-x':1}",_f8b,"nonsense",_fa0);
t.is({"prop-x":1},_fb3);
t.is(undefined,_fb3[1]);
_fb3=_fa1("({'prop-x':1})",_f8b,"nonsense",_fa0);
t.is({"prop-x":1},_fb3);
t.is(undefined,_fb3[1]);
_fb3=_fa1("define({'prop-x':1})",_f8b,"nonsense",_fa0);
t.is(_fa0,_fb3);
t.is({"prop-x":1},_fa0.result);
_fb3=_fa1("define('some/module', {'prop-x':1})",_f8b,"nonsense",_fa0);
t.is(_fa0,_fb3);
t.is({"prop-x":1},_fa0.result);
_fb3=_fa1("this is total nonsense and should throw an error",_f8b,"nonsense",_fa0);
t.is(_fb3 instanceof Error,true);
});
});
}
}
return lang.mixin(_f5b,{dynamic:true,normalize:_f76,load:load,cache:_f64});
});
},"dojo/data/util/simpleFetch":function(){
define(["../../_base/lang","../../_base/kernel","./sorter"],function(lang,_fb4,_fb5){
var _fb6={};
lang.setObject("dojo.data.util.simpleFetch",_fb6);
_fb6.errorHandler=function(_fb7,_fb8){
if(_fb8.onError){
var _fb9=_fb8.scope||_fb4.global;
_fb8.onError.call(_fb9,_fb7,_fb8);
}
};
_fb6.fetchHandler=function(_fba,_fbb){
var _fbc=_fbb.abort||null,_fbd=false,_fbe=_fbb.start?_fbb.start:0,_fbf=(_fbb.count&&(_fbb.count!==Infinity))?(_fbe+_fbb.count):_fba.length;
_fbb.abort=function(){
_fbd=true;
if(_fbc){
_fbc.call(_fbb);
}
};
var _fc0=_fbb.scope||_fb4.global;
if(!_fbb.store){
_fbb.store=this;
}
if(_fbb.onBegin){
_fbb.onBegin.call(_fc0,_fba.length,_fbb);
}
if(_fbb.sort){
_fba.sort(_fb5.createSortFunction(_fbb.sort,this));
}
if(_fbb.onItem){
for(var i=_fbe;(i<_fba.length)&&(i<_fbf);++i){
var item=_fba[i];
if(!_fbd){
_fbb.onItem.call(_fc0,item,_fbb);
}
}
}
if(_fbb.onComplete&&!_fbd){
var _fc1=null;
if(!_fbb.onItem){
_fc1=_fba.slice(_fbe,_fbf);
}
_fbb.onComplete.call(_fc0,_fc1,_fbb);
}
};
_fb6.fetch=function(_fc2){
_fc2=_fc2||{};
if(!_fc2.store){
_fc2.store=this;
}
this._fetchItems(_fc2,lang.hitch(this,"fetchHandler"),lang.hitch(this,"errorHandler"));
return _fc2;
};
return _fb6;
});
},"dojo/dnd/Source":function(){
define(["../_base/array","../_base/connect","../_base/declare","../_base/kernel","../_base/lang","../dom-class","../dom-geometry","../mouse","../ready","../topic","./common","./Selector","./Manager"],function(_fc3,_fc4,_fc5,_fc6,lang,_fc7,_fc8,_fc9,_fca,_fcb,dnd,_fcc,_fcd){
if(!_fc6.isAsync){
_fca(0,function(){
var _fce=["dojo/dnd/AutoSource","dojo/dnd/Target"];
require(_fce);
});
}
var _fcf=_fc5("dojo.dnd.Source",_fcc,{isSource:true,horizontal:false,copyOnly:false,selfCopy:false,selfAccept:true,skipForm:false,withHandles:false,autoSync:false,delay:0,accept:["text"],generateText:true,constructor:function(node,_fd0){
lang.mixin(this,lang.mixin({},_fd0));
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
_fc7.add(this.node,"dojoDndSource");
}
this.targetState="";
if(this.accept){
_fc7.add(this.node,"dojoDndTarget");
}
if(this.horizontal){
_fc7.add(this.node,"dojoDndHorizontal");
}
this.topics=[_fcb.subscribe("/dnd/source/over",lang.hitch(this,"onDndSourceOver")),_fcb.subscribe("/dnd/start",lang.hitch(this,"onDndStart")),_fcb.subscribe("/dnd/drop",lang.hitch(this,"onDndDrop")),_fcb.subscribe("/dnd/cancel",lang.hitch(this,"onDndCancel"))];
},checkAcceptance:function(_fd1,_fd2){
if(this==_fd1){
return !this.copyOnly||this.selfAccept;
}
for(var i=0;i<_fd2.length;++i){
var type=_fd1.getItem(_fd2[i].id).type;
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
},copyState:function(_fd3,self){
if(_fd3){
return true;
}
if(arguments.length<2){
self=this==_fcd.manager().target;
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
_fcf.superclass.destroy.call(this);
_fc3.forEach(this.topics,function(t){
t.remove();
});
this.targetAnchor=null;
},onMouseMove:function(e){
if(this.isDragging&&this.targetState=="Disabled"){
return;
}
_fcf.superclass.onMouseMove.call(this,e);
var m=_fcd.manager();
if(!this.isDragging){
if(this.mouseDown&&this.isSource&&(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay)){
var _fd4=this.getSelectedNodes();
if(_fd4.length){
m.startDrag(this,_fd4,this.copyState(dnd.getCopyKeyState(e),true));
}
}
}
if(this.isDragging){
var _fd5=false;
if(this.current){
if(!this.targetBox||this.targetAnchor!=this.current){
this.targetBox=_fc8.position(this.current,true);
}
if(this.horizontal){
_fd5=(e.pageX-this.targetBox.x<this.targetBox.w/2)==_fc8.isBodyLtr(this.current.ownerDocument);
}else{
_fd5=(e.pageY-this.targetBox.y)<(this.targetBox.h/2);
}
}
if(this.current!=this.targetAnchor||_fd5!=this.before){
this._markTargetAnchor(_fd5);
m.canDrop(!this.current||m.source!=this||!(this.current.id in this.selection));
}
}
},onMouseDown:function(e){
if(!this.mouseDown&&this._legalMouseDown(e)&&(!this.skipForm||!dnd.isFormElement(e))){
this.mouseDown=true;
this._lastX=e.pageX;
this._lastY=e.pageY;
_fcf.superclass.onMouseDown.call(this,e);
}
},onMouseUp:function(e){
if(this.mouseDown){
this.mouseDown=false;
_fcf.superclass.onMouseUp.call(this,e);
}
},onDndSourceOver:function(_fd6){
if(this!==_fd6){
this.mouseDown=false;
if(this.targetAnchor){
this._unmarkTargetAnchor();
}
}else{
if(this.isDragging){
var m=_fcd.manager();
m.canDrop(this.targetState!="Disabled"&&(!this.current||m.source!=this||!(this.current.id in this.selection)));
}
}
},onDndStart:function(_fd7,_fd8,copy){
if(this.autoSync){
this.sync();
}
if(this.isSource){
this._changeState("Source",this==_fd7?(copy?"Copied":"Moved"):"");
}
var _fd9=this.accept&&this.checkAcceptance(_fd7,_fd8);
this._changeState("Target",_fd9?"":"Disabled");
if(this==_fd7){
_fcd.manager().overSource(this);
}
this.isDragging=true;
},onDndDrop:function(_fda,_fdb,copy,_fdc){
if(this==_fdc){
this.onDrop(_fda,_fdb,copy);
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
},onDrop:function(_fdd,_fde,copy){
if(this!=_fdd){
this.onDropExternal(_fdd,_fde,copy);
}else{
this.onDropInternal(_fde,copy);
}
},onDropExternal:function(_fdf,_fe0,copy){
var _fe1=this._normalizedCreator;
if(this.creator){
this._normalizedCreator=function(node,hint){
return _fe1.call(this,_fdf.getItem(node.id).data,hint);
};
}else{
if(copy){
this._normalizedCreator=function(node){
var t=_fdf.getItem(node.id);
var n=node.cloneNode(true);
n.id=dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}else{
this._normalizedCreator=function(node){
var t=_fdf.getItem(node.id);
_fdf.delItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
}
this.selectNone();
if(!copy&&!this.creator){
_fdf.selectNone();
}
this.insertNodes(true,_fe0,this.before,this.current);
if(!copy&&this.creator){
_fdf.deleteSelectedNodes();
}
this._normalizedCreator=_fe1;
},onDropInternal:function(_fe2,copy){
var _fe3=this._normalizedCreator;
if(this.current&&this.current.id in this.selection){
return;
}
if(copy){
if(this.creator){
this._normalizedCreator=function(node,hint){
return _fe3.call(this,this.getItem(node.id).data,hint);
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
this.insertNodes(true,_fe2,this.before,this.current);
this._normalizedCreator=_fe3;
},onDraggingOver:function(){
},onDraggingOut:function(){
},onOverEvent:function(){
_fcf.superclass.onOverEvent.call(this);
_fcd.manager().overSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOver();
}
},onOutEvent:function(){
_fcf.superclass.onOutEvent.call(this);
_fcd.manager().outSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOut();
}
},_markTargetAnchor:function(_fe4){
if(this.current==this.targetAnchor&&this.before==_fe4){
return;
}
if(this.targetAnchor){
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
}
this.targetAnchor=this.current;
this.targetBox=null;
this.before=_fe4;
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
if(e.type!="touchstart"&&!_fc9.isLeft(e)){
return false;
}
if(!this.withHandles){
return true;
}
for(var node=e.target;node&&node!==this.node;node=node.parentNode){
if(_fc7.contains(node,"dojoDndHandle")){
return true;
}
if(_fc7.contains(node,"dojoDndItem")||_fc7.contains(node,"dojoDndIgnore")){
break;
}
}
return false;
}});
return _fcf;
});
},"url:davinci/ui/templates/ThemeSetsRenameDialog.html":"<div>\n\t<div class=\"dijitDialogPaneContentArea\">\n\t\t${uiNLS.themeSetName} <input data-dojo-type=\"dijit.form.ValidationTextBox\" data-dojo-props=\"regExp:'[a-zA-z0-9_]+', required:true, invalidMessage:'Invalid Text.'\" id=\"theme_select_themeset_rename_textbox\" style=\"width: 175px;\"/>\n\t</div>\n\n\t<div class=\"dijitDialogPaneActionBar\">\n\t\t<button type=\"button\" dojoType=\"dijit.form.Button\" id=\"theme_set_rename_ok_button\" label=\"${uiNLS.renameButtonLabel}\" class=\"maqPrimaryButton\" type=\"submit\"></button>\n\t\t<button type=\"button\" dojoType=\"dijit.form.Button\" id=\"theme_set_rename_cancel_button\" label=\"${commonNLS.buttonCancel}\" class=\"maqSecondaryButton\"></button>\n\t</div>\n</div>\n","dojo/cookie":function(){
define(["./_base/kernel","./regexp"],function(dojo,_fe5){
dojo.cookie=function(name,_fe6,_fe7){
var c=document.cookie,ret;
if(arguments.length==1){
var _fe8=c.match(new RegExp("(?:^|; )"+_fe5.escapeString(name)+"=([^;]*)"));
ret=_fe8?decodeURIComponent(_fe8[1]):undefined;
}else{
_fe7=_fe7||{};
var exp=_fe7.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_fe7.expires=d;
}
if(exp&&exp.toUTCString){
_fe7.expires=exp.toUTCString();
}
_fe6=encodeURIComponent(_fe6);
var _fe9=name+"="+_fe6,_fea;
for(_fea in _fe7){
_fe9+="; "+_fea;
var _feb=_fe7[_fea];
if(_feb!==true){
_fe9+="="+_feb;
}
}
document.cookie=_fe9;
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
define(["dojo/_base/declare"],function(_fec){
return _fec("davinci.commands.CompoundCommand",null,{name:"compound",_commands:[],constructor:function(_fed){
this._commands=[];
if(_fed){
this._commands=[_fed];
}
},add:function(_fee){
if(!_fee){
return;
}
if(!this._commands){
if(_fee.name=="compound"){
this._commands=_fee._commands;
}else{
this._commands=[_fee];
}
}else{
if(_fee.name=="compound"){
dojo.forEach(_fee._commands,function(c){
this.add(c);
},this);
return;
}else{
if(_fee.name=="modify"){
var id=_fee._oldId;
for(var i=0;i<this._commands.length;i++){
var c=this._commands[i];
if(c.name=="modify"&&c._oldId==id){
c.add(_fee);
return;
}
}
}
}
this._commands.push(_fee);
}
},setContext:function(_fef){
for(var i=0;i<this._commands.length;i++){
if(this._commands[i].setContext){
this._commands[i].setContext(_fef);
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
define(["dojo/_base/declare","davinci/html/CSSSelector","davinci/html/CSSCombinedSelector","davinci/html/CSSRule","davinci/html/CSSProperty","davinci/html/CSSAtRule","davinci/html/CSSImport","davinci/model/parser/Tokenizer","davinci/model/Comment"],function(_ff0,_ff1,_ff2,_ff3,_ff4,_ff5,_ff6,_ff7,_ff8){
var _ff9=null;
var _ffa=(function(){
var _ffb=(function(){
function _ffc(_ffd,_ffe){
var ch=_ffd.next();
if(ch=="@"){
_ffd.nextWhileMatches(/[a-zA-Z0-9_-]/);
return "css-at";
}else{
if(ch=="/"&&_ffd.equals("*")){
_ffe(_fff);
return null;
}else{
if(ch=="<"&&_ffd.equals("!")){
_ffe(_1000);
return null;
}else{
if(ch=="="){
return "css-compare";
}else{
if(_ffd.equals("=")&&(ch=="~"||ch=="|")){
_ffd.next();
return "css-compare";
}else{
if(ch=="\""||ch=="'"){
_ffe(_1001(ch));
return null;
}else{
if(ch=="#"){
_ffd.nextWhileMatches(/[\w-]/);
return "css-hash";
}else{
if(ch=="!"){
_ffd.nextWhileMatches(/[ \t]/);
_ffd.nextWhileMatches(/\w/);
return "css-important";
}else{
if(/\d/.test(ch)){
_ffd.nextWhileMatches(/[\w.%]/);
return "css-unit";
}else{
if(/[,.+>*\/]/.test(ch)){
return "css-select-op";
}else{
if(/[;{}:\[\]]/.test(ch)){
return "css-punctuation";
}else{
_ffd.nextWhileMatches(/[\w\\\-_]/);
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
function _fff(_1002,_1003){
var _1004=false;
while(!_1002.endOfLine()){
var ch=_1002.next();
if(_1004&&ch=="/"){
_1003(_ffc);
break;
}
_1004=(ch=="*");
}
return "css-comment";
};
function _1000(_1005,_1006){
var _1007=0;
while(!_1005.endOfLine()){
var ch=_1005.next();
if(_1007>=2&&ch==">"){
_1006(_ffc);
break;
}
_1007=(ch=="-")?_1007+1:0;
}
return "css-comment";
};
function _1001(quote){
return function(_1008,_1009){
var _100a=false;
while(!_1008.endOfLine()){
var ch=_1008.next();
if(ch==quote&&!_100a){
break;
}
_100a=!_100a&&ch=="\\";
}
if(!_100a){
_1009(_ffc);
}
return "css-string";
};
};
return function(_100b,_100c){
return _ff7.tokenizer(_100b,_100c||_ffc);
};
})();
function _100d(_100e,_100f,base){
return function(_1010){
if(!_100e||/^\}/.test(_1010)){
return base;
}else{
if(_100f){
return base+indentUnit*2;
}else{
return base+indentUnit;
}
}
};
};
function _1011(_1012,_1013){
_1013=_1013||0;
var _1014=_ffb(_1012);
var _1015=false,_1016=false,_1017=false;
var iter={next:function(){
var token=_1014.next(),style=token.style,_1018=token.content;
if(style=="css-hash"){
style=token.style=_1016?"css-colorcode":"css-identifier";
}
if(style=="css-identifier"){
if(_1016){
token.style="css-value";
}else{
if(!_1015&&!_1017){
token.style="css-selector";
}
}
}
if(_1018=="\n"){
token.indentation=_100d(_1015,_1016,_1013);
}
if(_1018=="{"&&_1017=="@media"){
_1017=false;
}else{
if(_1018=="{"){
_1015=true;
}else{
if(_1018=="}"){
_1015=_1016=_1017=false;
}else{
if(_1018==";"){
_1016=_1017=false;
}else{
if(_1015&&style!="css-comment"&&style!="whitespace"){
_1016=true;
}else{
if(!_1015&&style=="css-at"){
_1017=_1018;
}
}
}
}
}
}
return token;
},copy:function(){
var _1019=_1015,_101a=_1016,_101b=_1014.state;
return function(_101c){
_1014=_ffb(_101c,_101b);
_1015=_1019;
_1016=_101a;
return iter;
};
}};
return iter;
};
return {make:_1011,electricChars:"}"};
})();
_ffa.parse=function(text,_101d){
var _101e,_101f;
if(typeof text=="string"){
var _1020={next:function(){
if(++this.count==1){
return text;
}else{
throw StopIteration;
}
},count:0,text:text};
_101e=_ff7.stringStream(_1020);
}else{
_101e=text;
_101f=true;
}
var _1021=_ffa.make(_101e);
var token;
var _1022;
var _1023;
var _1024=" ";
var _1025=[];
var _1026=[];
var model,_1027;
function error(text){
_1025.push(text);
};
function _1028(){
var start,stop,s;
token=_1021.next();
var _1029=false;
while(token.style=="css-comment"||token.style=="whitespace"){
if(token.style=="css-comment"||_1029){
if(!_ff9){
_ff9=new _ff8();
}
s=token.content;
if(token.content.indexOf("/*")===0){
s=s.substring(2);
_1029=true;
_ff9.addComment("block",start,stop,"");
}
if((s.lastIndexOf("*/")>-1)&&(s.lastIndexOf("*/")==s.length-2)){
s=s.substring(0,s.length-2);
_1029=false;
}
_ff9.appendComment(s);
}
token=_1021.next();
}
return token;
};
function _102a(){
_1022=new _ff1();
_1022.startOffset=token.offset;
_1022.parent=model;
if(_1023){
_1023.selectors.push(_1022);
_1022.parent=_1023;
}else{
model.selectors.push(_1022);
}
};
function _102b(){
var prev=_1022;
prev.endOffset=token.offset-1;
if(!_1023){
_1023=new _ff2();
_1023.parent=model;
_1023.selectors.push(prev);
_1022.startOffset=prev.startOffset;
model.selectors[model.selectors.length-1]=_1023;
}
_102a();
_1023.combiners.push(_1024);
_1024=" ";
};
var _102c;
try{
do{
_1028();
switch(token.style){
case "css-selector":
case "css-select-op":
if(_101f&&token.content=="<"){
_101e.push("<");
throw StopIteration;
}
model=new _ff3();
_1026.push(model);
model.startOffset=token.offset;
if(_101d){
_101d.addChild(model,undefined,true);
}
_1027=false;
_1023=undefined;
_1024=" ";
_102a();
selectorLoop:
for(;;){
switch(token.style){
case "css-select-op":
switch(token.content){
case ",":
_1023=undefined;
_102c=false;
_102a();
break;
case ".":
if(_1027){
_102b();
}
_1028();
if(_1022.cls){
_1022.cls=_1022.cls+"."+token.content;
}else{
_1022.cls=token.content;
}
_1027=token.value.length>token.content.length;
break;
case "*":
if(_1022.element||_1022.cls){
_102b();
}
_1022.element="*";
break;
case "+":
case ">":
_1024=token.content;
_102b();
break;
}
break;
case "css-selector":
if(token.type=="css-identifier"){
if(_1022.element||_1022.cls){
_102b();
}
_1022.element=token.content;
}else{
if(token.type=="css-hash"){
if(_1022.id||_1027){
_102b();
}
_1022.id=token.content.substring(1);
}
}
_1027=token.value.length>token.content.length;
break;
case "css-punctuation":
if(token.content=="{"){
break selectorLoop;
}else{
if(token.content==":"){
_1028();
if(token.content==":"){
_1028();
_1022.pseudoElement=token.content;
}else{
_1022.pseudoRule=token.content;
_1027=true;
}
}else{
if(token.content=="["){
_1028();
_1022.attribute={name:token.content};
_1028();
if(token.content==="="||token.content==="~="||token.content==="|="){
_1022.attribute.type=token.content;
_1028();
_1022.attribute.value=token.content.substring(1,token.content.length-1);
_1028();
}
}
}
}
break;
}
_102c=true;
_1028();
}
if(_ff9){
model.comment=_ff9;
_ff9=null;
}
_1022.endOffset=token.offset-1;
while(_1028().content!="}"){
var _102d=token.offset;
var _102e=token.content;
var _102f=false;
if(token.type=="css-hash"){
_1028();
if(token.type=="css-identifier"){
_102e+=token.content;
}else{
_102f=true;
}
}else{
if(token.type!="css-identifier"){
if(token.content!="*"){
error("expecting identifier around "+_1022.getText()+"{ "+_1030.name+": "+propery.value);
}else{
_1028();
_102e+=token.content;
}
}
}
var _1030=new _ff4();
_1030.startOffset=_102d;
_1030.parent=model;
if(_ff9){
_1030.comment=_ff9;
_ff9=null;
}
model.properties.push(_1030);
model.addChild(_1030,undefined,true);
_1030.name=_102e;
if(!_102f){
if(_1028().content!=":"){
error("expecting ':' "+_1022.getText()+"{ "+_1030.name+": "+propery.value);
}
}
_1028();
_1030.value=token.value;
if(_1030.value=="url"){
while((_1028()).content!=")"){
_1030.value+=token.value;
}
_1030.value+=token.value;
}
while((_1028()).content!=";"&&token.content!="}"){
_1030.value+=token.value;
}
if(_ff9){
_1030.postComment=_ff9;
_ff9=null;
}
_1030.endOffset=token.offset-1;
if(token.content=="}"){
break;
}
}
if(_ff9){
_1030.postComment=_ff9;
_ff9=null;
}
model.endOffset=token.offset;
break;
case "css-at":
var _1031=token.content.substring(1);
var _1032=(_1031=="import")?new _ff6():new _ff5();
_1032.startOffset=token.offset;
if(_101d){
_101d.addChild(_1032,undefined,true);
}
if(_1031=="import"){
var _1033=_1032;
_1028();
if(token.content=="url"){
_1033.isURL=true;
_1028();
_1028();
}
_1033.url=token.content.substring(1,token.content.length-1);
if(_1033.isURL){
_1028();
}
_1028();
}else{
if(_1031.indexOf("keyframes")>=0){
var _1034="";
var _1035="";
var _1036=false;
var _1037="\t\t";
_1028();
_1034=token.content;
if(_1034=="."){
_1028();
_1034+=token.content;
}
_1028();
_1032.value=token.content+"\n";
_1028();
if(token.content.indexOf("from")>=0||token.content.indexOf("to")>=0||token.content.indexOf("%")>=0){
outerLoop:
for(;;){
_1032.value+="\t"+token.content+" ";
_1028();
_1032.value+=token.content+"\n";
while((_1028()).content!="}"){
if(_1036){
_1037="\t\t";
_1036=false;
}
if(token.content==";"){
_1035="\n";
_1036=true;
}else{
if(token.content==":"||token.content==")"){
_1035=" ";
}
}
_1032.value+=_1037+token.content+_1035;
_1035="";
_1037="";
}
_1032.value+="\t"+token.content+"\n";
_1028();
if(token.content=="}"){
break outerLoop;
}
}
}else{
error("inside keyframes decl expecting from/to blocks or nn% blocks");
}
_1032.value+=token.content;
_1032.name=_1031+" "+_1034;
}else{
_1032.name=_1031;
_1032.value="";
while((_1028()).content!=";"){
_1032.value+=token.content;
}
}
}
_1032.endOffset=token.offset;
break;
}
}while(true);
}
catch(e){
if(_ff9&&model){
model.postComment=_ff9;
_ff9=null;
}
}
return {errors:_1025,model:_1026};
};
return _ffa;
});
},"dijit/MenuBarItem":function(){
define(["dojo/_base/declare","./MenuItem","dojo/text!./templates/MenuBarItem.html"],function(_1038,_1039,_103a){
var _103b=_1038("dijit._MenuBarItemMixin",null,{templateString:_103a,_setIconClassAttr:null});
var _103c=_1038("dijit.MenuBarItem",[_1039,_103b],{});
_103c._MenuBarItemMixin=_103b;
return _103c;
});
},"davinci/model/resource/Folder":function(){
define(["dojo/_base/declare","dojo/_base/xhr","davinci/Runtime","davinci/model/resource/Resource","davinci/model/resource/File"],function(_103d,xhr,_103e,_103f,File){
var _1040=_103d(_103f,{constructor:function(name,_1041){
this.elementType="Folder";
this.name=name;
this.parent=_1041;
},reload:function(){
this._isLoaded=false;
},createResource:function(name,_1042,_1043){
var file;
if(name!=null){
file=_1042?new _1040(name,this):new File(name,this);
}else{
file=this;
_1042=this.elementType=="Folder";
}
var _1044=_1043?"OK":_103e.serverJSONRequest({url:"cmd/createResource",handleAs:"text",content:{path:file.getPath(),isFolder:_1042},sync:true});
if(_1044=="OK"&&name!=null){
this.children.push(file);
delete file.libraryId;
delete file.libVersion;
delete file._readOnly;
dojo.publish("/davinci/resource/resourceChanged",["created",file]);
return file;
}else{
if(_1044=="EXISTS"){
this.children.push(file);
delete file.libraryId;
delete file.libVersion;
delete file._readOnly;
dojo.publish("/davinci/resource/resourceChanged",["created",file]);
return file;
}else{
if(_1044!="OK"){
throw "Folder.createResource failed: name="+name+"response="+_1044;
}else{
delete file.libraryId;
delete file.libVersion;
delete file._readOnly;
return this;
}
}
}
},getChildren:function(_1045,_1046){
if(this._isLoaded){
_1045.call(null,this.children);
}else{
if(this._loading){
this._loading.then(function(){
_1045.call(null,this.children);
}.bind(this),_1046);
}else{
this._loading=xhr.get({url:"cmd/listFiles",content:{path:this.getPath()},sync:false,handleAs:"json"}).then(function(_1047){
this.setChildren(_1047);
this._isLoaded=true;
_1045.call(null,this.children);
delete this._loading;
}.bind(this),_1046);
}
}
},getChildrenSync:function(_1048,sync){
if(!this._isLoaded){
if(this._loadingCallbacks){
this._loadingCallbacks.push(_1048);
return;
}
this._loadingCallbacks=[];
this._loadingCallbacks.push(_1048);
_103e.serverJSONRequest({url:"cmd/listFiles",content:{path:this.getPath()},sync:sync,load:dojo.hitch(this,function(_1049,_104a){
this.setChildrenSync(_1049);
dojo.forEach(this._loadingCallbacks,function(item){
(item)(this.children);
},this);
delete this._loadingCallbacks;
})});
return;
}
_1048(this.children);
},setChildren:function(_104b){
this.children=[];
this._appendFiles(_104b);
},setChildrenSync:function(_104c){
this.children=[];
this._appendFiles(_104c,true);
},_appendFiles:function(_104d,sync){
_104d.forEach(function(item){
var child=sync?this.getChildSync(item.name):this._getChild(item.name);
var _104e=child!=null;
if(item.isDir||item.isLib){
if(!_104e){
child=new _1040(item.name,this);
}
if(item.isLib){
child.isLibrary=true;
}
}else{
if(!_104e){
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
if(!_104e){
this.children.push(child);
}
},this);
this._isLoaded=true;
},getMarkers:function(_104f,_1050){
var _1051=[];
this.visit({visit:function(_1052){
if(_1052.elementType=="File"){
markers=_1052.getMarkers(_104f);
_1051.concat(markers);
}else{
if(!_1050){
return true;
}
}
}},true);
return _1051;
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
var _1053;
this.children.some(function(child){
var _1054=child.getName();
if(!this.__CASE_SENSITIVE){
_1054=_1054.toLowerCase();
}
var match=_1054==name;
if(match){
_1053=child;
}
return match;
});
return _1053;
}});
davinci.model.resource.root=new _1040(".",null);
return _1040;
});
},"davinci/ve/actions/ReplaceAction":function(){
define(["dojo/_base/declare","dojo/dom-style","davinci/ve/actions/ContextAction","davinci/commands/CompoundCommand","davinci/ve/commands/AddCommand","davinci/ve/commands/MoveCommand","davinci/ve/widget","davinci/ve/utils/GeomUtils"],function(_1055,_1056,_1057,_1058,_1059,_105a,_105b,_105c){
return _1055("davinci.ve.actions.ReplaceAction",[_1057],{run:function(_105d,_105e){
_105d=this.fixupContext(_105d);
if(_105d){
if(_105d.declaredClass!=="davinci.ve.Context"){
return;
}
var _105f=this._normalizeSelection(_105d);
if(!this.selectionSameParent(_105f)){
return;
}
var _1060=[];
var _1061={"type":_105e,"context":_105d};
if(_105f.length>0){
var _1062=new _1058();
dojo.forEach(_105f,function(w){
var _1063;
var d=w.getData({identify:false});
if(d){
d.context=_105d;
dojo.withDoc(_105d.getDocument(),function(){
_1063=_105b.createWidget(_1061);
},this);
if(_1063){
_1062.add(new _1059(_1063,w.getParent(),undefined));
_1060.push(_1063);
var _1064=(w&&w.domNode)?_1056.get(w.domNode,"position"):null;
var _1065=(_1064=="absolute");
if(_1065){
var box=_105c.getMarginBoxPageCoords(w.domNode);
box.l+=25;
_1062.add(new _105a(_1063,box.l,box.t,undefined,undefined,undefined,true));
}
}
}
});
_105d.getCommandStack().execute(_1062);
dojo.forEach(_1060,function(w,i){
_105d.select(w,i>0);
},this);
}
}
},isEnabled:function(_1066){
_1066=this.fixupContext(_1066);
var _1067=(_1066&&_1066.getSelection)?_1066.getSelection():[];
if(_1067.length===0){
return false;
}
if(!this.selectionSameParent(_1067)){
return false;
}
return true;
},shouldShow:function(_1068){
_1068=this.fixupContext(_1068);
var _1069=_1068?_1068.editor:null;
return (_1069&&_1069.declaredClass=="davinci.ve.PageEditor");
},selectionSameParent:function(_106a){
if(_106a.length===0){
return false;
}
var _106b=_106a[0].getParent();
for(var i=0;i<_106a.length;i++){
var _106c=_106a[i];
if(_106c.getParent()!=_106b){
return false;
}
}
return true;
}});
});
},"dojox/layout/ResizeHandle":function(){
define(["dojo/_base/kernel","dojo/_base/lang","dojo/_base/connect","dojo/_base/array","dojo/_base/event","dojo/_base/fx","dojo/_base/window","dojo/fx","dojo/window","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dijit/_base/manager","dijit/_Widget","dijit/_TemplatedMixin","dojo/_base/declare"],function(_106d,lang,_106e,_106f,_1070,_1071,_1072,_1073,_1074,_1075,_1076,_1077,_1078,_1079,_107a,_107b,_107c){
_106d.experimental("dojox.layout.ResizeHandle");
var _107d=_107c("dojox.layout.ResizeHandle",[_107a,_107b],{targetId:"",targetContainer:null,resizeAxis:"xy",activeResize:false,activeResizeClass:"dojoxResizeHandleClone",animateSizing:true,animateMethod:"chain",animateDuration:225,minHeight:100,minWidth:100,constrainMax:false,maxHeight:0,maxWidth:0,fixedAspect:false,intermediateChanges:false,startTopic:"/dojo/resize/start",endTopic:"/dojo/resize/stop",templateString:"<div dojoAttachPoint=\"resizeHandle\" class=\"dojoxResizeHandle\"><div></div></div>",postCreate:function(){
this.connect(this.resizeHandle,"onmousedown","_beginSizing");
if(!this.activeResize){
this._resizeHelper=_1079.byId("dojoxGlobalResizeHelper");
if(!this._resizeHelper){
this._resizeHelper=new _107e({id:"dojoxGlobalResizeHelper"}).placeAt(_1072.body());
_1076.add(this._resizeHelper.domNode,this.activeResizeClass);
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
var _107f=lang.partial(_1076.add,this.resizeHandle);
switch(this.resizeAxis.toLowerCase()){
case "xy":
this._resizeX=this._resizeY=true;
_107f("dojoxResizeNW");
break;
case "x":
this._resizeX=true;
_107f("dojoxResizeW");
break;
case "y":
this._resizeY=true;
_107f("dojoxResizeN");
break;
}
},_beginSizing:function(e){
if(this._isSizing){
return;
}
_106e.publish(this.startTopic,[this]);
this.targetWidget=_1079.byId(this.targetId);
this.targetDomNode=this.targetWidget?this.targetWidget.domNode:_1075.byId(this.targetId);
if(this.targetContainer){
this.targetDomNode=this.targetContainer;
}
if(!this.targetDomNode){
return;
}
if(!this.activeResize){
var c=_1077.position(this.targetDomNode,true);
this._resizeHelper.resize({l:c.x,t:c.y,w:c.w,h:c.h});
this._resizeHelper.show();
if(!this.isLeftToRight()){
this._resizeHelper.startPosition={l:c.x,t:c.y};
}
}
this._isSizing=true;
this.startPoint={x:e.clientX,y:e.clientY};
var style=_1078.getComputedStyle(this.targetDomNode),_1080=_1077.boxModel==="border-model",_1081=_1080?{w:0,h:0}:_1077.getPadBorderExtents(this.targetDomNode,style),_1082=_1077.getMarginExtents(this.targetDomNode,style),mb;
mb=this.startSize={w:_1078.get(this.targetDomNode,"width",style),h:_1078.get(this.targetDomNode,"height",style),pbw:_1081.w,pbh:_1081.h,mw:_1082.w,mh:_1082.h};
if(!this.isLeftToRight()&&dojo.style(this.targetDomNode,"position")=="absolute"){
var p=_1077.position(this.targetDomNode,true);
this.startPosition={l:p.x,t:p.y};
}
this._pconnects=[_106e.connect(_1072.doc,"onmousemove",this,"_updateSizing"),_106e.connect(_1072.doc,"onmouseup",this,"_endSizing")];
_1070.stop(e);
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
},_getNewCoords:function(e,box,_1083){
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
_1083=(_1083||this.startPosition);
if(_1083&&this._resizeX){
r.l=_1083.l+dx;
if(r.w!=newW){
r.l+=(newW-r.w);
}
r.t=_1083.t;
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
var _1084=this.targetWidget&&lang.isFunction(this.targetWidget.resize),tmp=this._getNewCoords(e,_1084&&"margin");
if(tmp===false){
return;
}
if(_1084){
this.targetWidget.resize(tmp);
}else{
if(this.animateSizing){
var anim=_1073[this.animateMethod]([_1071.animateProperty({node:this.targetDomNode,properties:{width:{start:this.startSize.w,end:tmp.w}},duration:this.animateDuration}),_1071.animateProperty({node:this.targetDomNode,properties:{height:{start:this.startSize.h,end:tmp.h}},duration:this.animateDuration})]);
anim.play();
}else{
_1078.set(this.targetDomNode,{width:tmp.w+"px",height:tmp.h+"px"});
}
}
if(this.intermediateChanges){
this.onResize(e);
}
},_endSizing:function(e){
_106f.forEach(this._pconnects,_106e.disconnect);
var pub=lang.partial(_106e.publish,this.endTopic,[this]);
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
var _107e=dojo.declare("dojox.layout._ResizeHelper",_107a,{show:function(){
_1078.set(this.domNode,"display","");
},hide:function(){
_1078.set(this.domNode,"display","none");
},resize:function(dim){
_1077.setMarginBox(this.domNode,dim);
}});
return _107d;
});
},"url:davinci/ui/templates/OpenThemeDialog.html":"<div>\r\n\t<div class=\"dijitDialogPaneContentArea\">\r\n\t\t${selectTheme}: <div dojoType=\"davinci.ui.widgets.ThemeSelection\" dojoAttachPoint=\"_themeChooser\" value='claro' dojoAttachEvent='onChange:_checkValid' searchWorkspace='true'></div>\r\n\t</div>\t\r\n\t<div class=\"dijitDialogPaneActionBar\">\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachPoint=\"_okButton\" dojoAttachEvent='onClick:okButton' label='${open}' class=\"maqPrimaryButton\" type=\"submit\"></button>\r\n\t\t<button dojoType='dijit.form.Button' dojoAttachEvent='onClick:cancelButton' label='${buttonCancel}' class=\"maqSecondaryButton\"></button>\r\n\t</div>\r\n</div>","dijit/MenuItem":function(){
define(["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/kernel","dojo/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_1085,dom,_1086,_1087,_1088,has,_1089,_108a,_108b,_108c,_108d){
return _1085("dijit.MenuItem",[_1089,_108a,_108b,_108c],{templateString:_108d,baseClass:"dijitMenuItem",label:"",_setLabelAttr:function(val){
this.containerNode.innerHTML=val;
this._set("label",val);
if(this.textDir==="auto"){
this.applyTextDir(this.focusNode,this.label);
}
},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_108e){
if(_108e&&!("label" in this.params)){
this.set("label",_108e.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var label=this.id+"_text";
_1086.set(this.containerNode,"id",label);
if(this.accelKeyNode){
_1086.set(this.accelKeyNode,"id",this.id+"_accel");
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
},_setSelected:function(_108f){
_1087.toggle(this.domNode,"dijitMenuItemSelected",_108f);
},setLabel:function(_1090){
_1088.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_1090);
},setDisabled:function(_1091){
_1088.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_1091);
},_setDisabledAttr:function(value){
this.focusNode.setAttribute("aria-disabled",value?"true":"false");
this._set("disabled",value);
},_setAccelKeyAttr:function(value){
this.accelKeyNode.style.display=value?"":"none";
this.accelKeyNode.innerHTML=value;
_1086.set(this.containerNode,"colSpan",value?"1":"2");
this._set("accelKey",value);
},_setTextDirAttr:function(_1092){
if(!this._created||this.textDir!=_1092){
this._set("textDir",_1092);
this.applyTextDir(this.focusNode,this.label);
}
}});
});
},"dojox/grid/_ViewManager":function(){
define(["dojo/_base/declare","dojo/_base/sniff","dojo/dom-class"],function(_1093,has,_1094){
return _1093("dojox.grid._ViewManager",null,{constructor:function(_1095){
this.grid=_1095;
},defaultWidth:200,views:[],resize:function(){
this.onEach("resize");
},render:function(){
this.onEach("render");
},addView:function(_1096){
_1096.idx=this.views.length;
this.views.push(_1096);
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
},forEach:function(_1097){
for(var i=0,v;v=this.views[i];i++){
_1097(v,i);
}
},onEach:function(_1098,_1099){
_1099=_1099||[];
for(var i=0,v;v=this.views[i];i++){
if(_1098 in v){
v[_1098].apply(v,_1099);
}
}
},normalizeHeaderNodeHeight:function(){
var _109a=[];
for(var i=0,v;(v=this.views[i]);i++){
if(v.headerContentNode.firstChild){
_109a.push(v.headerContentNode);
}
}
this.normalizeRowNodeHeights(_109a);
},normalizeRowNodeHeights:function(_109b){
var h=0;
var _109c=[];
if(this.grid.rowHeight){
h=this.grid.rowHeight;
}else{
if(_109b.length<=1){
return;
}
for(var i=0,n;(n=_109b[i]);i++){
if(!_1094.contains(n,"dojoxGridNonNormalizedCell")){
_109c[i]=n.firstChild.offsetHeight;
h=Math.max(h,_109c[i]);
}
}
h=(h>=0?h:0);
if((has("mozilla")||has("ie")>8)&&h){
h++;
}
}
for(i=0;(n=_109b[i]);i++){
if(_109c[i]!=h){
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
},renormalizeRow:function(_109d){
var _109e=[];
for(var i=0,v,n;(v=this.views[i])&&(n=v.getRowNode(_109d));i++){
n.firstChild.style.height="";
_109e.push(n);
}
this.normalizeRowNodeHeights(_109e);
},getViewWidth:function(_109f){
return this.views[_109f].getWidth()||this.defaultWidth;
},measureHeader:function(){
this.resetHeaderNodeHeight();
this.forEach(function(_10a0){
_10a0.headerContentNode.style.height="";
});
var h=0;
this.forEach(function(_10a1){
h=Math.max(_10a1.headerNode.offsetHeight,h);
});
return h;
},measureContent:function(){
var h=0;
this.forEach(function(_10a2){
h=Math.max(_10a2.domNode.offsetHeight,h);
});
return h;
},findClient:function(_10a3){
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
var _10a4=function(v,l){
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
_10a4(v,l);
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
_10a4(v,r);
}
if(c<len){
v=this.views[c];
vw=Math.max(1,r-l);
v.setSize(vw+"px",0);
_10a4(v,l);
}
return l;
},renderRow:function(_10a5,_10a6,_10a7){
var _10a8=[];
for(var i=0,v,n,_10a9;(v=this.views[i])&&(n=_10a6[i]);i++){
_10a9=v.renderRow(_10a5);
n.appendChild(_10a9);
_10a8.push(_10a9);
}
if(!_10a7){
this.normalizeRowNodeHeights(_10a8);
}
},rowRemoved:function(_10aa){
this.onEach("rowRemoved",[_10aa]);
},updateRow:function(_10ab,_10ac){
for(var i=0,v;v=this.views[i];i++){
v.updateRow(_10ab);
}
if(!_10ac){
this.renormalizeRow(_10ab);
}
},updateRowStyles:function(_10ad){
this.onEach("updateRowStyles",[_10ad]);
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
define(["dojo/_base/lang","dojo/_base/array","dojo/_base/declare","dojo/_base/connect","dojo/_base/sniff","./util"],function(lang,array,_10ae,_10af,has,util){
return _10ae("dojox.grid._EditManager",null,{constructor:function(_10b0){
this.grid=_10b0;
if(has("ie")){
this.connections=[_10af.connect(document.body,"onfocus",lang.hitch(this,"_boomerangFocus"))];
}else{
this.connections=[_10af.connect(this.grid,"onBlur",this,"apply")];
}
},info:{},destroy:function(){
array.forEach(this.connections,_10af.disconnect);
},cellFocus:function(_10b1,_10b2){
if(this.grid.singleClickEdit||this.isEditRow(_10b2)){
this.setEditCell(_10b1,_10b2);
}else{
this.apply();
}
if(this.isEditing()||(_10b1&&_10b1.editable&&_10b1.alwaysEditing)){
this._focusEditor(_10b1,_10b2);
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
},isEditCell:function(_10b3,_10b4){
return (this.info.rowIndex===_10b3)&&(this.info.cell.index==_10b4);
},isEditRow:function(_10b5){
return this.info.rowIndex===_10b5;
},setEditCell:function(_10b6,_10b7){
if(!this.isEditCell(_10b7,_10b6.index)&&this.grid.canEdit&&this.grid.canEdit(_10b6,_10b7)){
this.start(_10b6,_10b7,this.isEditRow(_10b7)||_10b6.editable);
}
},_focusEditor:function(_10b8,_10b9){
util.fire(_10b8,"focus",[_10b9]);
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
},start:function(_10ba,_10bb,_10bc){
if(!this._isValidInput()){
return;
}
this.grid.beginUpdate();
this.editorApply();
if(this.isEditing()&&!this.isEditRow(_10bb)){
this.applyRowEdit();
this.grid.updateRow(_10bb);
}
if(_10bc){
this.info={cell:_10ba,rowIndex:_10bb};
this.grid.doStartEdit(_10ba,_10bb);
this.grid.updateRow(_10bb);
}else{
this.info={};
}
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._focusEditor(_10ba,_10bb);
this._doCatchBoomerang();
},_editorDo:function(_10bd){
var c=this.info.cell;
if(c&&c.editable){
c[_10bd](this.info.rowIndex);
}
},editorApply:function(){
this._editorDo("apply");
},editorCancel:function(){
this._editorDo("cancel");
},applyCellEdit:function(_10be,_10bf,_10c0){
if(this.grid.canEdit(_10bf,_10c0)){
this.grid.doApplyCellEdit(_10be,_10c0,_10bf.field);
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
},save:function(_10c1,_10c2){
var c=this.info.cell;
if(this.isEditRow(_10c1)&&(!_10c2||c.view==_10c2)&&c.editable){
c.save(c,this.info.rowIndex);
}
},restore:function(_10c3,_10c4){
var c=this.info.cell;
if(this.isEditRow(_10c4)&&c.view==_10c3&&c.editable){
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
define(["dojo/_base/declare","davinci/html/HTMLItem"],function(_10c5,_10c6){
return _10c5("davinci.html.HTMLText",_10c6,{constructor:function(value){
this.elementType="HTMLText";
this.value=value||"";
},getText:function(_10c7){
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
define(["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_10c8,event,keys,_10c9,_10ca,_10cb){
return _10c8("dijit.DropDownMenu",[_10cb,_10ca],{templateString:_10c9,baseClass:"dijitMenu",postCreate:function(){
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
define(["dojo/_base/declare","../Workbench","davinci/version","davinci/repositoryinfo","dojo/date/locale","dojo/date/stamp","dojo/i18n!davinci/ui/nls/ui","dojo/i18n!dijit/nls/common","dijit/form/Button"],function(_10cc,_10cd,_10ce,_10cf,_10d0,Stamp,uiNLS,_10d1){
var about=_10cc("davinci.ui.about",null,{});
about.show=function(){
var _10d2=uiNLS;
var _10d3="<div class='about_container'>"+"<div class='about_version'>"+dojo.string.substitute(_10d2.productVersion,[_10ce])+"</div>";
var ri=_10cf,_10d4=ri.revision;
var bd=ri.buildtime;
var date=Stamp.fromISOString(bd);
if(date){
bd=_10d0.format(date,{formatLength:"medium"});
}
if(bd){
_10d3+="<div class='about_date'>"+dojo.string.substitute(_10d2.productDate,[bd])+"</div>";
}
if(_10d4){
var _10d5="<a href='https://github.com/maqetta/maqetta/commit/"+_10d4+"'>"+_10d4.substr(0,15)+"...</a>";
_10d3+="<div class='about_build'>"+dojo.string.substitute(_10d2.build,[_10d5])+"</div>";
}
_10d3+="</div>";
_10cd.showMessage(_10d2.aboutMaqetta,_10d3);
};
return about;
});
},"davinci/ve/metadata":function(){
define(["require","dojo/Deferred","dojo/promise/all","dojo/_base/lang","dojo/_base/connect","../library","../model/Path","../repositoryinfo"],function(_10d6,_10d7,all,lang,_10d8,_10d9,Path,info){
var _10da,_10db,_10dc={},_10dd={},_10de={},l10n=null,_10df=[],_10e0={},_10e1={id:{datatype:"string",hidden:true},lang:{datatype:"string",hidden:true},dir:{datatype:"string",hidden:true},"class":{datatype:"string",hidden:true},style:{datatype:"string",hidden:true},title:{datatype:"string",hidden:true}};
dojo.subscribe("/davinci/ui/libraryChanged/start",function(){
_10dc={};
_10dd={};
_10de={};
l10n=null;
_10da.init().then(function(){
dojo.publish("/davinci/ui/libraryChanged");
});
});
function _10e2(dest,srcs){
dest=dest||{};
for(var i=1,l=arguments.length;i<l;i++){
var src=arguments[i],name,val;
for(name in src){
if(src.hasOwnProperty(name)){
val=src[name];
if(!(name in dest)||(typeof val!=="object"&&dest[name]!==val)){
dest[name]=val;
}else{
_10e2(dest[name],val);
}
}
}
}
return dest;
};
function _10e3(pkg,path){
_10dc[pkg.name]=pkg;
path=new Path(path);
var _10e4=pkg.overlays;
for(var name in _10e4){
if(_10e4.hasOwnProperty(name)){
if(name==="oam"||name==="maqetta"){
_10e2(pkg,_10e4[name]);
}
}
}
delete pkg.overlays;
pkg.__metadataModuleId="maq-metadata-"+pkg.name;
var _10e5=new Path(location.href);
var _10e6=[{name:pkg.__metadataModuleId,location:_10e5.append(path).append(pkg.directories.metadata).toString()}];
if(pkg.name!="dojo"){
pkg.__libraryModuleId=pkg.name;
var _10e7="app/static/lib/"+pkg.name+"/"+pkg.version;
_10e6.push({name:pkg.__libraryModuleId,location:_10e5.append(_10e7).toString()});
}
_10d6=_10d6({packages:_10e6});
var _10e8;
if(lang.exists("scripts.widget_metadata",pkg)){
if(typeof pkg.scripts.widget_metadata=="string"){
var _10e9=path.append(pkg.scripts.widget_metadata);
_10e8=dojo.xhrGet({url:_10e9.toString()+"?"+info.revision,handleAs:"json"}).then(function(data){
if(data){
return _10ea(pkg.name,data,_10e9.getParentPath());
}
});
}else{
_10e8=_10ea(pkg.name,pkg.scripts.widget_metadata,path);
}
}
if(lang.exists("scripts.callbacks",pkg)){
var d=new _10d7();
_10d6([pkg.scripts.callbacks],function(cb){
pkg.$callbacks=cb;
d.resolve();
});
_10df.push(d);
}
return _10e8;
};
function _10ea(_10eb,_10ec,path){
if(!_10eb){
console.error("parseLibraryDescriptor: missing 'libName' arg");
}
var pkg=_10dc[_10eb];
_10ec.$path=path.toString();
if(!pkg){
_10dc[_10eb]={$wm:_10ec,name:_10ec.name,version:_10ec.version};
pkg=_10dc[_10eb];
}else{
if(pkg.$widgets){
_10ec.widgets.forEach(function(item){
pkg.$wm.widgets.push(item);
});
for(var name in _10ec.categories){
if(!pkg.$wm.categories.hasOwnProperty(name)){
pkg.$wm.categories[name]=_10ec.categories[name];
}
}
}else{
if(pkg.$wm){
for(var z=0;z<_10ec.widgets.length;z++){
var found=false;
for(var ll=0;!found&&ll<pkg.$wm.widgets.length;ll++){
if(pkg.$wm.widgets[ll].type==_10ec.widgets[z].type){
found=true;
}
}
if(!found){
pkg.$wm.widgets.push(_10ec.widgets[z]);
}
}
}else{
if(!pkg.$wm){
pkg.$wm=_10ec;
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
dojo.mixin(wm,{_maqGetString:_10ed});
if(wm.extend){
for(var _10ee in wm.extend){
if(wm.extend.hasOwnProperty(_10ee)){
if(_10dc[_10ee]&&_10dc[_10ee].$wm){
_10ef(_10dc[_10ee].$wm,[wm.extend[_10ee]]);
}else{
var ext=_10e0[_10ee]||[];
ext.push(wm.extend[_10ee]);
_10e0[_10ee]=ext;
}
}
}
}
if(_10e0[_10eb]){
_10ef(wm,_10e0[_10eb]);
}
return pkg;
};
function _10ef(wm,_10f0){
function _10f1(val1,val2){
if(typeof val1==="string"){
return val1+","+val2;
}
if(val1 instanceof Array){
return val1.concat(val2);
}
console.error("Unhandled type for \"concat()\"");
};
var _10f2=wm.$providedTypes;
_10f0.forEach(function(ext){
for(var type in ext){
if(ext.hasOwnProperty(type)){
var e=ext[type];
var w=_10f2[type];
if(e.mixin){
lang.mixin(w,e.mixin);
}
if(e.concat){
for(var prop in e.concat){
if(e.concat.hasOwnProperty(prop)){
var val=e.concat[prop];
if(w[prop]){
w[prop]=_10f1(w[prop],val);
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
function _10f3(type){
if(type){
for(var name in _10dc){
if(_10dc.hasOwnProperty(name)){
var lib=_10dc[name];
if(lib.$wm&&lib.$wm.$providedTypes[type]){
return lib;
}
}
}
}
return null;
};
var _10f4=false;
function _10ed(key){
if(!_10f4){
_10f4=true;
}
return null;
};
function _10f5(type){
if(!type){
return undefined;
}
if(_10dd.hasOwnProperty(type)){
return _10dd[type];
}
var lib=_10f3(type),wm,_10f6;
if(lib){
_10f6=lib.$wm.$path;
}
if(!_10f6){
return null;
}
wm=lib.$wm;
var _10f7=null;
var _10f8=[_10f6,"/",type.replace(/\./g,"/"),"_oam.json"].join("");
if(!wm.localPath){
dojo.xhrGet({url:_10f8+"?"+info.revision,handleAs:"json",sync:true}).then(function(data){
_10f7=data;
});
}else{
var base=_10db.getProject();
var _10f9=system.resource.findResource("./"+base+"/"+_10f8);
_10f7=dojo.fromJson(_10f9.getContentSync());
}
if(!_10f7){
console.error("ERROR: Could not load metadata for type: "+type);
return null;
}
_10f7.$ownproperty=dojo.mixin({},_10f7.property);
_10f7.property=dojo.mixin({},_10e1,_10f7.property);
_10f7.$src=_10f8;
_10dd[type]=_10f7;
_10e2(_10f7,wm.$providedTypes[type].metadata);
return _10f7;
};
function _10fa(obj,_10fb){
if(!_10fb){
return obj;
}
dojo.every(_10fb.split("."),function(name){
if(obj[name]===undefined){
obj=undefined;
return false;
}
obj=obj[name];
return true;
});
return obj;
};
function _10fc(name,type){
var _10fd="allowed"+name,prop=_10da.queryDescriptor(type,_10fd);
if(!prop){
prop=name==="Parent"?"ANY":"NONE";
}
return prop.split(/\s*,\s*/);
};
function _10fe(type,_10ff){
var value=_10da.queryDescriptor(type,_10ff);
if(!value){
return null;
}
var lib=_10f3(type);
return _1100(lib,value);
};
function _1100(lib,_1101){
if(!lib||!_1101){
return null;
}
var _1102;
if(typeof _1101==="string"&&_1101.substr(0,2)==="./"){
_1102=new Path(lib.__metadataModuleId).append(_1101).toString();
}else{
_1102=_1101;
}
return _1102;
};
_10da={init:function(){
var _1103=[];
_10db=_10d6("../Workbench");
_10d9.getUserLibs(_10db.getProject()).forEach(function(lib){
var path=lib.metaRoot;
if(path){
_1103.push(dojo.xhrGet({url:path+"/package.json"+"?"+info.revision,handleAs:"json"}).then(function(data){
return _10e3(data,path);
}));
}
});
return all(_1103);
},parseMetaData:function(name,_1104,path){
return _10ea(name,_1104,path);
},getLibrary:function(name){
return name?_10dc[name]:_10dc;
},getLibraryActions:function(_1105,_1106){
var _1107=[];
for(var name in _10dc){
if(_10dc.hasOwnProperty(name)){
var lib=_10dc[name];
var wm=lib.$wm;
if(!wm){
continue;
}
var _1108=lib.$wm["davinci.actionSets"];
if(!_1108){
continue;
}
dojo.forEach(_1108,function(_1109){
if(_1109.id==_1105){
if(!_1106||(_1109.targetID===_1106)){
var _110a=dojo.clone(_1109.actions);
dojo.forEach(_110a,function(_110b){
if(_110b.action){
var _110c=_1100(lib,_110b.action);
_110b.action=_110c;
}
if(_110b.menu){
_110b.menu.forEach(function(item){
if(item.action){
var _110d=_1100(lib,item.action);
item.action=_110d;
}
});
}
_1107.push(_110b);
});
}
}
});
}
}
return _1107;
},loadThemeMeta:function(model){
var style=model.find({elementType:"HTMLElement",tag:"style"});
var _110e=[];
var _110f="claro";
var _1110;
for(var z=0;z<style.length;z++){
for(var i=0;i<style[z].children.length;i++){
if(style[z].children[i].elementType=="CSSImport"){
_110e.push(style[z].children[i]);
}
}
}
var _1111=new Path(model.fileName);
var _1112=_10d9.getThemes(_10db.getProject());
var _1113={};
for(var i=0;i<_1112.length;i++){
if(_1112[i].files){
for(var k=0;k<_1112[i].files.length;k++){
_1113[_1112[i].files[k]]=_1112[i];
}
}
}
for(var i=0;i<_110e.length;i++){
var url=_110e[i].url;
for(var _1114 in _1113){
if(_1114.indexOf(_110f)>-1){
_1110=_1114;
}
if(url.indexOf(_1114)>-1){
return {themeUrl:url,themeMetaCache:_10d9.getThemeMetadata(_1113[_1114]),theme:_1113[_1114]};
}
}
}
var ro=_10da._loadThemeMetaDojoxMobile(model,_1113);
if(ro){
return ro;
}
if(_1110){
var _1115=_110f;
var _1116;
for(var i=0;i<_110e.length;i++){
var _1117=_110e[i].url.match(/\/([^\/]*)\.css$/);
if(_1117&&_1117.length==2){
var _1118=_1117[1];
var _1119=_110e[i].url.match(new RegExp("themes/"+_1118+"/"+_1118+".css$"));
if(_1119){
_1116=_1118;
break;
}
}
}
if(_1116){
var _111a=model.getDocumentElement();
var head=_111a.getChildElement("head");
var _111b=_111a.getChildElement("body");
var _111c=_111b.getAttribute("class");
if(_111c){
_111b.setAttribute("class",_111c.replace(new RegExp("\\b"+_1116+"\\b","g"),_1115));
}
var _111d=head.getChildElements("style");
dojo.forEach(_111d,function(_111e){
dojo.forEach(_111e.children,function(_111f){
if(_111f.elementType=="CSSImport"){
_111f.url=_111f.url.replace(new RegExp("/"+_1116,"g"),"/"+_1115);
}
});
});
var url=_110e[i].url.replace(new RegExp("/"+_1116,"g"),"/"+_1115);
var _1120={themeUrl:url,themeMetaCache:_10d9.getThemeMetadata(_1113[_1110]),theme:_1113[_1110]};
_1120.themeMetaCache.usingSubstituteTheme={oldThemeName:_1116,newThemeName:_1115};
return _1120;
}
}
},_loadThemeMetaDojoxMobile:function(model,_1121){
var _1122=model.find({elementType:"HTMLElement",tag:"script"});
for(var s=0;s<_1122.length;s++){
var text=_1122[s].getElementText();
if(text.length){
var start=text.indexOf("dojoxMobile.themeMap");
if(start>0){
start=text.indexOf("=",start);
var stop=text.indexOf(";",start);
if(stop>start){
var _1123=dojo.fromJson(text.substring(start+1,stop));
var url=_1123[0][2][0];
for(var _1124 in _1121){
if(url.indexOf(_1124)>-1){
return {themeUrl:url,themeMetaCache:_10d9.getThemeMetadata(_1121[_1124]),theme:_1121[_1124]};
}
}
}
}
}
}
return;
},getLibraryForType:function(type){
return _10f3(type);
},getLibraryBase:function(type){
var lib=_10f3(type);
if(lib){
return lib.$wm.$path;
}
},invokeCallback:function(_1125,_1126,args){
var _1127=_1125,fn;
if(typeof _1125==="string"){
_1127=_10f3(type);
}
if(_1127&&_1127.$callbacks){
fn=_1127.$callbacks[_1126];
if(fn){
fn.apply(_1127.$callbacks,args);
}
}
},query:function(_1128,_1129){
if(!_1128){
return;
}
var type,_112a;
if(_1128.declaredClass){
if(_1128.metadata){
_112a=_1128.metadata;
}
type=_1128.type;
}else{
type=_1128;
}
if(!_112a){
_112a=_10f5(type);
if(!_112a){
return;
}
if(_1128.declaredClass){
_1128.metadata=_112a;
}
}
return _10fa(_112a,_1129);
},queryDescriptorByName:function(name,type,_112b){
var lib=_10f3(type),item;
if(lib){
var _112c=lib.$wm.widgets;
for(var i=0;i<_112c.length;i++){
if(_112c[i].name==name){
item=_112c[i];
break;
}
}
}
return this._queryDescriptor(item,_112b);
},queryDescriptor:function(type,_112d){
var lib=_10f3(type),item;
if(lib){
item=lib.$wm.$providedTypes[type];
}
return this._queryDescriptor(item,_112d);
},_queryDescriptor:function(item,_112e){
if(!item||typeof item!=="object"){
return;
}
var value=_10fa(item,_112e);
if(_112e==="resizable"){
if(!value){
value="both";
}
}
return value;
},getAllowedParent:function(type){
return _10fc("Parent",type);
},getAllowedChild:function(type){
return _10fc("Child",type);
},getHelper:function(type,_112f){
var d=new _10d7(),idx=type+":"+_112f;
if(idx in _10de){
d.resolve(_10de[idx]);
return d;
}
var _1130=_10fe(type,_112f);
if(!_1130){
d.resolve();
}else{
_10d6([_1130],function(_1131){
d.resolve(_1131);
_10de[idx]=_1131;
});
}
return d;
},getSmartInput:function(type){
var d=new _10d7();
if(type in _1132){
d.resolve(_1132[type]);
}else{
var _1133=_10fe(type,"inlineEdit");
if(!_1133){
d.resolve(null);
}else{
if(typeof _1133==="string"){
_10d6([_1133],function(_1134){
d.resolve(_1132[type]=new _1134());
});
}else{
_10d6(["davinci/ve/input/SmartInput"],function(_1135){
var si=new _1135();
lang.mixin(si,_1133);
d.resolve(_1132[type]=si);
});
}
}
}
return d;
},getDeferreds:function(){
return _10df;
}};
var _1132={};
_10d8.subscribe("/davinci/ui/libraryChanged/start",function(){
_1132={};
});
return dojo.setObject("davinci.ve.metadata",_10da);
});
},"dojox/grid/_Grid":function(){
define(["dojo/_base/kernel","../main","dojo/_base/declare","./_Events","./_Scroller","./_Layout","./_View","./_ViewManager","./_RowManager","./_FocusManager","./_EditManager","./Selection","./_RowSelector","./util","dijit/_Widget","dijit/_TemplatedMixin","dijit/CheckedMenuItem","dojo/text!./resources/_Grid.html","dojo/string","dojo/_base/array","dojo/_base/lang","dojo/_base/sniff","dojox/html/metrics","dojo/_base/html","dojo/query","dojo/dnd/common","dojo/i18n!dijit/nls/loading"],function(dojo,dojox,_1136,_1137,_1138,_1139,_113a,_113b,_113c,_113d,_113e,_113f,_1140,util,_1141,_1142,_1143,_1144,_1145,array,lang,has,_1146,html,query){
if(!dojo.isCopyKey){
dojo.isCopyKey=dojo.dnd.getCopyKeyState;
}
var _1147=_1136("dojox.grid._Grid",[_1141,_1142,_1137],{templateString:_1144,classTag:"dojoxGrid",rowCount:5,keepRows:75,rowsPerPage:25,autoWidth:false,initialWidth:"",autoHeight:"",rowHeight:0,autoRender:true,defaultHeight:"15em",height:"",structure:null,elasticView:-1,singleClickEdit:false,selectionMode:"extended",rowSelector:"",columnReordering:false,headerMenu:null,placeholderLabel:"GridColumns",selectable:false,_click:null,loadingMessage:"<span class='dojoxGridLoading'>${loadingState}</span>",errorMessage:"<span class='dojoxGridError'>${errorState}</span>",noDataMessage:"",escapeHTMLInData:true,formatterScope:null,editable:false,summary:"",_setSummaryAttr:"domNode",sortInfo:0,_placeholders:null,_layoutClass:_1139,buildRendering:function(){
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
_1146.initOnFontResize();
this.connect(_1146,"onFontResize","textSizeChanged");
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
var _1148=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_1145.substitute(this.loadingMessage,_1148);
this.errorMessage=_1145.substitute(this.errorMessage,_1148);
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
},_setAutoHeightAttr:function(ah,_1149){
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
if(this._started&&!_1149){
this.render();
}
},_getRowCountAttr:function(){
return this.updating&&this.invalidated&&this.invalidated.rowCount!=undefined?this.invalidated.rowCount:this.rowCount;
},textSizeChanged:function(){
this.render();
},sizeChange:function(){
this.update();
},createManagers:function(){
this.rows=new _113c(this);
this.focus=new _113d(this);
this.edit=new _113e(this);
},createSelection:function(){
this.selection=new _113f(this);
},createScroller:function(){
this.scroller=new _1138();
this.scroller.grid=this;
this.scroller.renderRow=lang.hitch(this,"renderRow");
this.scroller.removeRow=lang.hitch(this,"rowRemoved");
},createLayout:function(){
this.layout=new this._layoutClass(this);
this.connect(this.layout,"moveColumn","onMoveColumn");
},onMoveColumn:function(){
this.update();
},onResizeColumn:function(_114a){
},createViews:function(){
this.views=new _113b(this);
this.views.createView=lang.hitch(this,"createView");
},createView:function(_114b,idx){
var c=lang.getObject(_114b);
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
},_setStructureAttr:function(_114c){
var s=_114c;
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
},setStructure:function(_114d){
dojo.deprecated("dojox.grid._Grid.setStructure(obj)","use dojox.grid._Grid.set('structure', obj) instead.","2.0");
this._setStructureAttr(_114d);
},getColumnTogglingItems:function(){
var items,_114e=[];
items=array.map(this.layout.cells,function(cell){
if(!cell.menuItems){
cell.menuItems=[];
}
var self=this;
var item=new _1143({label:cell.name,checked:!cell.hidden,_gridCell:cell,onChange:function(_114f){
if(self.layout.setColumnVisibility(this._gridCell.index,_114f)){
var items=this._gridCell.menuItems;
if(items.length>1){
array.forEach(items,function(item){
if(item!==this){
item.setAttribute("checked",_114f);
}
},this);
}
_114f=array.filter(self.layout.cells,function(c){
if(c.menuItems.length>1){
array.forEach(c.menuItems,"item.set('disabled', false);");
}else{
c.menuItems[0].set("disabled",false);
}
return !c.hidden;
});
if(_114f.length==1){
array.forEach(_114f[0].menuItems,"item.set('disabled', true);");
}
}
},destroy:function(){
var index=array.indexOf(this._gridCell.menuItems,this);
this._gridCell.menuItems.splice(index,1);
delete this._gridCell;
_1143.prototype.destroy.apply(this,arguments);
}});
cell.menuItems.push(item);
if(!cell.hidden){
_114e.push(item);
}
return item;
},this);
if(_114e.length==1){
_114e[0].set("disabled",true);
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
},getItem:function(_1150){
return null;
},showMessage:function(_1151){
if(_1151){
this.messagesNode.innerHTML=_1151;
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
},resize:function(_1152,_1153){
if(dojo.isIE&&!_1152&&!_1153&&this._autoHeight){
return;
}
this._pendingChangeSize=_1152;
this._pendingResultSize=_1153;
this.sizeChange();
},_getPadBorder:function(){
this._padBorder=this._padBorder||html._getPadBorderExtents(this.domNode);
return this._padBorder;
},_getHeaderHeight:function(){
var vns=this.viewsHeaderNode.style,t=vns.display=="none"?0:this.views.measureHeader();
vns.height=t+"px";
this.views.normalizeHeaderNodeHeight();
return t;
},_resize:function(_1154,_1155){
_1154=_1154||this._pendingChangeSize;
_1155=_1155||this._pendingResultSize;
delete this._pendingChangeSize;
delete this._pendingResultSize;
if(!this.domNode){
return;
}
var pn=this.domNode.parentNode;
if(!pn||pn.nodeType!=1||!this.hasLayout()||pn.style.visibility=="hidden"||pn.style.display=="none"){
return;
}
var _1156=this._getPadBorder();
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
if(this.domNode.clientHeight<=_1156.h){
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
if(_1155){
_1154=_1155;
}
if(!this._autoHeight&&_1154){
html.marginBox(this.domNode,_1154);
this.height=this.domNode.style.height;
delete this.fitTo;
}else{
if(this.fitTo=="parent"){
h=this._parentContentBoxHeight=this._parentContentBoxHeight||html._getContentBox(pn).h;
this.domNode.style.height=Math.max(0,h)+"px";
}
}
var _1157=array.some(this.views.views,function(v){
return v.flexCells;
});
if(!this._autoHeight&&(h||html._getContentBox(this.domNode).h)===0){
this.viewsHeaderNode.style.display="none";
}else{
this.viewsHeaderNode.style.display="block";
if(!_1157&&hh===undefined){
hh=this._getHeaderHeight();
}
}
if(_1157){
hh=undefined;
}
this.adaptWidth();
this.adaptHeight(hh);
this.postresize();
},adaptWidth:function(){
var _1158=(!this.initialWidth&&this.autoWidth);
var w=_1158?0:this.domNode.clientWidth||(this.domNode.offsetWidth-this._getPadBorder().w),vw=this.views.arrange(1,w);
this.views.onEach("adaptWidth");
if(_1158){
this.domNode.style.width=vw+"px";
}
},adaptHeight:function(_1159){
var t=_1159===undefined?this._getHeaderHeight():_1159;
var h=(this._autoHeight?-1:Math.max(this.domNode.clientHeight-t,0)||0);
this.views.onEach("setSize",[0,h]);
this.views.onEach("adaptHeight");
if(!this._autoHeight){
var _115a=0,_115b=0;
var _115c=array.filter(this.views.views,function(v){
var has=v.hasHScrollbar();
if(has){
_115a++;
}else{
_115b++;
}
return (!has);
});
if(_115a>0&&_115b>0){
array.forEach(_115c,function(v){
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
},renderRow:function(_115d,_115e){
this.views.renderRow(_115d,_115e,this._skipRowRenormalize);
},rowRemoved:function(_115f){
this.views.rowRemoved(_115f);
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
},updateRow:function(_1160){
_1160=Number(_1160);
if(this.updating){
this.invalidated[_1160]=true;
}else{
this.views.updateRow(_1160);
this.scroller.rowHeightChanged(_1160);
}
},updateRows:function(_1161,_1162){
_1161=Number(_1161);
_1162=Number(_1162);
var i;
if(this.updating){
for(i=0;i<_1162;i++){
this.invalidated[i+_1161]=true;
}
}else{
for(i=0;i<_1162;i++){
this.views.updateRow(i+_1161,this._skipRowRenormalize);
}
this.scroller.rowHeightChanged(_1161);
}
},updateRowCount:function(_1163){
if(this.updating){
this.invalidated.rowCount=_1163;
}else{
this.rowCount=_1163;
this._setAutoHeightAttr(this.autoHeight,true);
if(this.layout.cells.length){
this.scroller.updateRowCount(_1163);
}
this._resize();
if(this.layout.cells.length){
this.setScrollTop(this.scrollTop);
}
}
},updateRowStyles:function(_1164){
this.views.updateRowStyles(_1164);
},getRowNode:function(_1165){
if(this.focus.focusView&&!(this.focus.focusView instanceof _1140)){
return this.focus.focusView.rowNodes[_1165];
}else{
for(var i=0,cView;(cView=this.views.views[i]);i++){
if(!(cView instanceof _1140)){
return cView.rowNodes[_1165];
}
}
}
return null;
},rowHeightChanged:function(_1166){
this.views.renormalizeRow(_1166);
this.scroller.rowHeightChanged(_1166);
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
var _1167=this;
this._pendingScroll=window.setTimeout(function(){
delete _1167._pendingScroll;
_1167.finishScrollJob();
},200);
}else{
this.setScrollTop(inTop);
}
},finishScrollJob:function(){
this.delayScroll=false;
this.setScrollTop(this.scrollTop);
},setScrollTop:function(inTop){
this.scroller.scroll(this.views.setScrollTop(inTop));
},scrollToRow:function(_1168){
this.setScrollTop(this.scroller.findScrollTop(_1168)+1);
},styleRowNode:function(_1169,_116a){
if(_116a){
this.rows.styleRowNode(_1169,_116a);
}
},_mouseOut:function(e){
this.rows.setOverRow(-2);
},getCell:function(_116b){
return this.layout.cells[_116b];
},setCellWidth:function(_116c,_116d){
this.getCell(_116c).unitWidth=_116d;
},getCellName:function(_116e){
return "Cell "+_116e.index;
},canSort:function(_116f){
},sort:function(){
},getSortAsc:function(_1170){
_1170=_1170==undefined?this.sortInfo:_1170;
return Boolean(_1170>0);
},getSortIndex:function(_1171){
_1171=_1171==undefined?this.sortInfo:_1171;
return Math.abs(_1171)-1;
},setSortIndex:function(_1172,inAsc){
var si=_1172+1;
if(inAsc!=undefined){
si*=(inAsc?1:-1);
}else{
if(this.getSortIndex()==_1172){
si=-this.sortInfo;
}
}
this.setSortInfo(si);
},setSortInfo:function(_1173){
if(this.canSort(_1173)){
this.sortInfo=_1173;
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
},doStartEdit:function(_1174,_1175){
this.onStartEdit(_1174,_1175);
},doApplyCellEdit:function(_1176,_1177,_1178){
this.onApplyCellEdit(_1176,_1177,_1178);
},doCancelEdit:function(_1179){
this.onCancelEdit(_1179);
},doApplyEdit:function(_117a){
this.onApplyEdit(_117a);
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
_1147.markupFactory=function(props,node,ctor,_117b){
var _117c=function(n){
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
v.width=_117c(cg);
}
return v;
});
if(!props.structure.length){
props.structure.push({__span:Infinity,cells:[]});
}
query("thead > tr",node).forEach(function(tr,_117d){
var _117e=0;
var _117f=0;
var _1180;
var cView=null;
query("> th",tr).map(function(th){
if(!cView){
_1180=0;
cView=props.structure[0];
}else{
if(_117e>=(_1180+cView.__span)){
_117f++;
_1180+=cView.__span;
var _1181=cView;
cView=props.structure[_117f];
}
}
var cell={name:lang.trim(html.attr(th,"name")||th.innerHTML),colSpan:parseInt(html.attr(th,"colspan")||1,10),type:lang.trim(html.attr(th,"cellType")||""),id:lang.trim(html.attr(th,"id")||"")};
_117e+=cell.colSpan;
var _1182=html.attr(th,"rowspan");
if(_1182){
cell.rowSpan=_1182;
}
if(html.hasAttr(th,"width")){
cell.width=_117c(th);
}
if(html.hasAttr(th,"relWidth")){
cell.relWidth=window.parseInt(html.attr(th,"relWidth"),10);
}
if(html.hasAttr(th,"hidden")){
cell.hidden=(html.attr(th,"hidden")=="true"||html.attr(th,"hidden")===true);
}
if(_117b){
_117b(th,cell);
}
cell.type=cell.type?lang.getObject(cell.type):dojox.grid.cells.Cell;
if(cell.type&&cell.type.markupFactory){
cell.type.markupFactory(th,cell);
}
if(!cView.cells[_117d]){
cView.cells[_117d]=[];
}
cView.cells[_117d].push(cell);
});
});
}
return new ctor(props,node);
};
return _1147;
});
},"davinci/ve/input/SmartInput":function(){
define(["dojo/_base/declare","dojo/dom-geometry","davinci/ve/commands/ModifyRichTextCommand","dijit/layout/ContentPane","dijit/form/SimpleTextarea","dijit/form/TextBox","dojox/html/entities","dojox/html/ellipsis","dojox/layout/ResizeHandle","dojo/i18n!davinci/ve/nls/ve","dojo/i18n!dijit/nls/common"],function(_1183,_1184,_1185,_1186,_1187,_1188,_1189,_118a,_118b,veNls,_118c){
return _1183("davinci.ve.input.SmartInput",null,{property:null,_X_MOVE_RANGE:10,_Y_MOVE_RANGE:10,_POINTER_TOP_OFFSET:-13,multiLine:"false",displayOnCreate:"true",_connection:[],getHelpText:function(){
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
var _118d=items.length;
for(var i=0;i<_118d;i++){
var item=items[i];
item=this.parseItem(item);
items[i]=item;
}
return items;
},parseItemsInColumns:function(input){
var items=this.splitColumns(input);
var _118e=items.length;
for(var i=0;i<_118e;i++){
var item=items[i];
item=this.parseItem(item);
items[i]=item;
}
return items;
},parseGrid:function(input){
var rows=this.splitRows(input);
var _118f=rows.length;
for(var i=0;i<_118f;i++){
var row=rows[i];
var items=this.parseItemsInColumns(row);
rows[i]=items;
}
return rows;
},parseItem:function(item){
var regex=/^([-~!>|(*)[+\]]*) ?(.*)$/;
var _1190=null;
var text=item;
var _1191=item.match(regex);
if(_1191){
_1190=_1191[1];
text=_1191[2];
}
var _1192=0;
var _1193=false;
var _1194=false;
var _1195=false;
if(_1190){
for(var i=0;i<_1190.length;i++){
var c=_1190[i];
switch(c){
case "-":
case "~":
case "!":
_1193=true;
break;
case ">":
_1192++;
break;
case "*":
case "+":
_1194=true;
break;
default:
}
}
}
var _1196={original:item,specialChars:_1190,text:text,indent:_1192,disabled:_1193,selected:_1194};
return _1196;
},splitRows:function(text){
var split=[];
var i;
var line="";
var _1197=false;
for(i=0;i<text.length;i++){
var c=text.charAt(i);
switch(c){
case "\\":
if(_1197){
line+=c;
}
_1197=!_1197;
break;
case "r":
if(_1197){
line+="\r";
_1197=false;
}else{
line+=c;
}
break;
case "n":
if(_1197){
line+="\n";
_1197=false;
}else{
line+=c;
}
break;
case "\r":
case "\n":
if(_1197){
line+=c;
_1197=false;
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
_1197=false;
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
var _1198=false;
for(i=0;i<text.length;i++){
var c=text.charAt(i);
switch(c){
case "\\":
if(_1198){
line+=c;
}
_1198=!_1198;
break;
case "r":
if(_1198){
line+="\r";
_1198=false;
}else{
line+=c;
}
break;
case "n":
if(_1198){
line+="\n";
_1198=false;
}else{
line+=c;
}
break;
case ",":
if(_1198){
line+=c;
_1198=false;
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
_1198=false;
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
var _1199=this.format=="columns"?this.serializeColumns(items):this.serializeRows(items);
return _1199;
},serializeColumns:function(items){
for(var i=0;i<items.length;i++){
var item=items[i];
item=item.replace(/\\/g,"\\\\");
items[i]=item.replace(/,/g,"\\,");
}
var _119a=items.join(", ");
return _119a;
},serializeRows:function(items){
for(var i=0;i<items.length;i++){
var item=items[i];
item=item.replace(/\\/g,"\\\\");
items[i]=item.replace(/\n/g,"\\\n");
}
var _119b=items.join("\n");
return _119b;
},inlineEditActive:function(){
if(this._inline&&this._inline.style.display!="none"&&this._inline.eb){
return true;
}else{
return false;
}
},show:function(_119c){
this._widget=davinci.ve.widget.byId(_119c);
if(!this._inline){
this._createInline();
}
var _119d=dojo.hitch(this,function(value){
this._inline.style.display="block";
this.setFormat(value);
var _119e=[["&","amp"],["\"","quot"],["<","lt"],[">","gt"]];
value=_1189.decode(value,_119e);
this._inline.eb.set("value",String(value));
this.updateFormats();
this.help(false);
dijit.selectInputText(this._inline.eb.textbox);
this.updateSimStyle();
this._inline.eb.textbox.focus();
});
var node=this._node(this._widget);
var _119f=this.property;
var _11a0=(_119f==="maq_innerText")?"innerHTML":_119f;
var value;
if(_119f){
if(node){
value=dojo.attr(node,_11a0);
}else{
if(_11a0==="innerHTML"||_11a0=="textContent"){
value=this._widget._srcElement.getElementText(this._context);
value=value.replace(/\s+/g," ");
}else{
value=this._widget.attr(_119f);
}
}
}
if(this.serialize){
this.serialize(node||this._widget,_119d,value);
}else{
if(_119f){
_119d(value);
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
},_findSmartInputContainer:function(_11a1){
return document.body;
var _11a2=_11a1.parentNode;
while(!dojo.hasClass(_11a2,"dijitContentPane")){
_11a2=_11a2.parentNode;
}
return _11a2;
},_loading:function(_11a3,width){
var _11a4=this._widget._edit_context.frameNode;
var doc=_11a4.ownerDocument;
var _11a5=doc.createElement("div");
var _11a6=this._findSmartInputContainer(_11a4);
if(!_11a6){
return;
}
_11a6.appendChild(_11a5);
this._loadingDiv=_11a5;
dojo.addClass(_11a5,"smartInputLoading");
var _11a7=doc.createElement("div");
_11a7.id="ieb";
dojo.addClass(_11a7,"inlineEdit dijitTooltipContainer");
var _11a8=doc.createElement("div");
_11a8.id="iebPointer";
this._inline=_11a7;
_11a6.appendChild(_11a7);
_11a6.appendChild(_11a8);
var m2=new dojo.dnd.Moveable("ieb");
this._connection.push(dojo.connect(m2,"onMoveStart",this,"onMoveStart"));
this._connection.push(dojo.connect(m2,"onMoveStop",this,"onMoveStop"));
var _11a9=new _1186({},_11a7);
this._inline=_11a9;
var _11aa=dijit.byId("editorsStackContainer").domNode;
var p=_1184.position(_11aa);
this._loadingDiv.style.position="absolute";
this._loadingDiv.style.left=p.x+"px";
this._loadingDiv.style.top=p.y+"px";
this._loadingDiv.style.width=p.w+"px";
this._loadingDiv.style.height=p.h+"px";
var box=this._widget.getMarginBox();
var _11ab=dojo.position(_11a4);
var _11ac=dojo.position(_11a6);
var _11ad=(_11ab.x-_11ac.x)+_11a6.scrollLeft-1;
var _11ae=(_11ab.y-_11ac.y)+_11a6.scrollTop-1;
var _11af=_11a6.clientHeight;
var _11b0=_11a6.clientWidth;
var _11b1=26;
var top=_11b1;
var _11b2=0;
if((box.y+_11a3+_11b1)<_11af){
top=box.y+_11b1;
dojo.addClass(_11a8,"inlineEditConnectorBelow");
}else{
if((box.y-_11a3)>0){
top=box.y-_11a3;
_11b2=_11a3+12;
}else{
top=0+_11b1;
}
}
var left="0";
if((box.x+width+20)<_11b0){
left=box.x;
}else{
if((box.x+width)>_11b0){
var t=box.x-width+box.w;
if(t<0){
t=0;
}
left=t;
}
}
left+=_11ad;
top+=_11ae;
this._inline._setStyleAttr({display:"block",top:top+"px",left:left+"px",padding:"1px",overflow:"hidden",backgroundImage:"none"});
this._startTop=top;
this._startLeft=left;
dojo.style(_11a8,"left",box.x+20+_11ad+"px");
dojo.style(_11a8,"top",top+_11b2+this._POINTER_TOP_OFFSET+"px");
},handleEvent:function(event){
switch(event.keyCode){
case 13:
var _11b3=this.multiLine;
if(!_11b3||_11b3=="false"||this._lastKeyCode==13||event.ctrlKey){
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
var _11b4=this._startLeft-left;
var _11b5=top-this._startTop;
if(_11b5<this._Y_MOVE_RANGE&&_11b5>(-this._Y_MOVE_RANGE)){
dojo.style("iebPointer","display","");
dojo.style("iebPointer","top",this._startTop+this._POINTER_TOP_OFFSET+_11b5+"px");
}else{
dojo.style("iebPointer","display","none");
return;
}
if(_11b4<this._X_MOVE_RANGE&&_11b4>(-this._X_MOVE_RANGE)){
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
var _11b6=this.selector;
if(path||_11b6){
node=this._widget.domNode;
if(path){
node=dojo.getObject(path,false,this._widget);
}
if(_11b6){
node=dojo.query(_11b6,node)[0];
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
var _11b7=this._widget.getContext();
var _11b8=this.property;
var _11b9=(_11b8==="maq_innerText")?"innerHTML":_11b8;
if(this.update){
var _11ba=this.update(node||this._widget,value,_11b8);
if(_11ba){
this._widget=_11ba;
}
_11b7.select(this._widget,null,false);
}else{
if(_11b8){
if(node){
dojo.attr(node,_11b9,value);
}else{
var _11bb={};
if(value&&(typeof value=="string")){
value=value.replace(/\n/g,"");
}
var _11bc=null;
if(_11b8=="textContent"){
_11bc=value;
}else{
_11bb[_11b8]=value;
}
var _11bd;
if(_11b9==="innerHTML"){
_11bb.richText=_11bb[_11b8];
delete _11bb[_11b8];
_11bd=new _1185(this._widget,_11bb,null,_11b7);
}else{
_11bd=new davinci.ve.commands.ModifyCommand(this._widget,_11bb,_11bc,_11b7);
}
this._widget._edit_context.getCommandStack().execute(_11bd);
this._widget=_11bd.newWidget;
this._widget._edit_context._focuses[0]._selectedWidget=this._widget;
}
_11b7.select(this._widget,null,false);
}
}
},hide:function(_11be){
if(this._inline){
var value;
while(connection=this._connection.pop()){
if(connection){
dojo.disconnect(connection);
}
}
var _11bf=this._findSmartInputContainer(this._widget._edit_context.frameNode);
if(!_11bf){
return;
}
if(this._loadingDiv){
_11bf.removeChild(this._loadingDiv);
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
var _11c0=_11bf.ownerDocument.getElementById("iebPointer");
_11bf.removeChild(_11c0);
if(value!=null&&!_11be){
if(!this.disableEncode&&this._format==="text"){
value=_1189.encode(value);
}
this.updateWidget(value);
}
var _11c1=this._widget.getContext();
var _11c2=_11c1.getDocument();
_11c2.defaultView.focus();
}
}
},getFormat:function(){
var _11c3=dijit.byId("davinci.ve.input.SmartInput_radio_html");
var _11c4="text";
if(_11c3&&_11c3.checked){
_11c4="html";
}
return _11c4;
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
var _11c5=dijit.byId("davinci.ve.input.SmartInput_radio_html");
var _11c6=dijit.byId("davinci.ve.input.SmartInput_radio_text");
var n=dojo.create("div",{innerHTML:value});
var _11c7=n.children.length?"html":"text";
if(_11c7==="html"){
_11c5.set("checked",true);
_11c6.set("checked",false);
}else{
_11c5.set("checked",false);
_11c6.set("checked",true);
}
this._format=_11c7;
},help:function(_11c8){
var _11c9=dojo.byId("davinci.ve.input.SmartInput_div_help");
var _11ca=dojo.byId("davinci.ve.input.SmartInput_radio_div");
if(_11c8){
dojo.style(_11c9,"display","");
}else{
dojo.style(_11c9,"display","none");
}
},updateFormats:function(){
var value=this._inline.eb.get("value");
var _11cb=true;
if(this.containsHtmlMarkUp(value)){
_11cb=false;
}
var _11cc=this._widget.getContext().getDojo();
var _11cd=dojo.byId("davinci.ve.input.SmartInput_radio_text_width_div");
var what=_1189.encode(value);
_11cd.innerHTML="<div class=\"dojoxEllipsis\">"+dojo.replace("Plain text ({0})",[what])+"</div>";
var _11ce=dojo.byId("davinci.ve.input.SmartInput_radio_html_width_div");
_11ce.innerHTML="<div id=\"davinci.ve.input.SmartInput_radio_html_div\" class=\"dojoxEllipsis\">"+veNls.htmlMarkup+"</div>";
var _11cf=dijit.byId("davinci.ve.input.SmartInput_radio_html");
var _11d0=dijit.byId("davinci.ve.input.SmartInput_radio_text");
var table=dojo.byId("davinci.ve.input.SmartInput_table");
_11cf.setDisabled(_11cb);
_11d0.setDisabled(_11cb);
if(_11cb){
dojo.addClass(_11cd,"inlineEditDisabled");
dojo.addClass(_11ce,"inlineEditDisabled");
_11cf.set("checked",false);
_11d0.set("checked",true);
}else{
dojo.removeClass(_11cd,"inlineEditDisabled");
dojo.removeClass(_11ce,"inlineEditDisabled");
}
if(!_11cb&&this.isHtmlSupported()){
dojo.style(_11d0.domNode,"display","");
dojo.style(_11cf.domNode,"display","");
dojo.style(_11ce,"display","");
dojo.style(_11cd,"display","");
dojo.style(table,"display","");
}else{
dojo.style(_11d0.domNode,"display","none");
dojo.style(_11cf.domNode,"display","none");
dojo.style(_11ce,"display","none");
dojo.style(_11cd,"display","none");
dojo.style(table,"display","none");
}
},resize:function(e){
var _11d1=dojo.byId("iedResizeDiv");
var _11d2=dijit.byId("davinciIleb");
var _11d3=_11d1.clientWidth-5;
var _11d4=_11d1.clientHeight-6;
var _11d5=_11d1.clientWidth-10;
_11d3=_11d1.clientWidth-8;
_11d4=_11d1.clientHeight-20;
_11d5=_11d1.clientWidth-9;
var _11d6=dojo.byId("smartInputSim");
dojo.style(_11d6,"width",_11d3+10+"px");
this.updateSimStyle();
if(_11d2){
_11d2._setStyleAttr({width:_11d3+"px",height:_11d4+"px",maxHeight:_11d4+"px"});
_11d2._setStyleAttr({width:_11d1.clientWidth+"px"});
}
var obj=dojo.byId("davinci.ve.input.SmartInput_radio_div");
dojo.style(obj,"width",_11d5+2+"px");
obj=dojo.byId("davinci.ve.input.SmartInput_radio_text_width_div");
dojo.style(obj,"width",_11d1.clientWidth-50+"px");
obj=dojo.byId("davinci.ve.input.SmartInput_radio_html_width_div");
dojo.style(obj,"width",_11d1.clientWidth-50+"px");
},onBlur:function(e){
this.updateSimStyle(e);
},updateSimStyle:function(e){
var _11d7=dijit.byId("davinciIleb");
var _11d8=dojo.byId("smartInputSim");
if(_11d8){
var s=dojo.style(_11d7.domNode);
dojo.style(_11d8,"borderColor",s.borderTopColor);
dojo.style(_11d8,"backgroundColor",s.backgroundColor);
}
},_getTemplate:function(){
var _11d9=""+"<div id=\"iedResizeDiv\" class=\"iedResizeDiv\" >"+"<textarea  dojoType=\"dijit.form.SimpleTextarea\" name=\"davinciIleb\" trim=\"true\" id=\"davinciIleb\" class=\"smartInputTextArea\" ></textarea>"+"<div id=\"smartInputSim\" class=\"smartInputSim\" ></div>"+"<div id=\"iedResizeHandle\" dojoType=\"dojox.layout.ResizeHandle\" targetId=\"iedResizeDiv\" constrainMin=\"true\" maxWidth=\"200\" maxHeight=\"600\" minWidth=\"200\" minHeight=\"55\"  activeResize=\"true\" intermediateChanges=\"true\" ></div>"+"</div>";
if(this.multiLine==="true"){
_11d9=""+"<div id=\"iedResizeDiv\" class=\"iedResizeDiv\" >"+"<textarea  dojoType=\"dijit.form.SimpleTextarea\" name=\"davinciIleb\" trim=\"true\" id=\"davinciIleb\" class=\"smartInputTextAreaMulti\" ></textarea>"+"<div id=\"smartInputSim\" class=\"smartInputSim\" ></div>"+"<div id=\"iedResizeHandle\" dojoType=\"dojox.layout.ResizeHandle\" targetId=\"iedResizeDiv\" constrainMin=\"true\" maxWidth=\"200\" maxHeight=\"600\" minWidth=\"200\" minHeight=\"80\"  activeResize=\"true\" intermediateChanges=\"true\" ></div>"+"</div>";
}
var _11da=""+_11d9+"<div  id=\"davinci.ve.input.SmartInput_div\"  class=\"davinciVeInputSmartInputDiv\" >"+"<div id=\"davinci.ve.input.SmartInput_radio_div\" class=\"smartInputRadioDiv\" >"+"<table id=\"davinci.ve.input.SmartInput_table\"> "+"<tbody>"+"<tr> "+"<td class=\"smartInputTd1\" > "+"<input id=\"davinci.ve.input.SmartInput_radio_text\" showlabel=\"true\" type=\"radio\" dojoType=\"dijit.form.RadioButton\" disabled=\"false\" readOnly=\"false\" intermediateChanges=\"false\" checked=\"true\"> </input> "+"</td> "+"<td class=\"smartInputTd2\" >"+"<div id=\"davinci.ve.input.SmartInput_radio_text_width_div\" class=\"smartInputRadioTextDiv\">"+"</div>"+"</td> "+"</tr>"+"<tr> "+"<td class=\"smartInputTd1\"> <input id=\"davinci.ve.input.SmartInput_radio_html\" showlabel=\"true\" type=\"radio\" dojoType=\"dijit.form.RadioButton\"> </input>  </td> "+"<td class=\"smartInputTd2\">"+"<div id=\"davinci.ve.input.SmartInput_radio_html_width_div\" class=\"smartInputRadioTextDiv\">"+"</div>"+"</td> "+"</tr> "+"</tbody>"+"</table> "+"<div class=\"smartInputHelpDiv\" > "+"<span id=\"davinci.ve.input.SmartInput_img_help\"  title=\"Help\" class=\"inlineEditHelp\" > </span>"+"<span class=\"smartInputSpacerSpan\" >"+"<button id=\"davinci.ve.input.SmartInput_ok\"  dojoType=\"dijit.form.Button\" type=\"submit\" class=\"inlineEditHelpOk\" >"+_118c.buttonOk+"</button> <button id=davinci.ve.input.SmartInput_cancel dojoType=\"dijit.form.Button\" class=\"inlineEditHelpCancel\"> "+_118c.buttonCancel+"</button>  "+"</span>   "+"</div> "+"<div id=\"davinci.ve.input.SmartInput_div_help\" style=\"display:none;\" class=\"smartInputHelpTextDiv\" > "+"<div dojoType=\"dijit.layout.ContentPane\" class=\"smartInputHelpTextDivContentPane \"style=\"padding:0;\" >"+this.getHelpText()+"</div> "+"<div style=\"text-align: left; padding:0; height:2px;\" ></div> "+"</div> "+"</div>"+"</div> "+"";
return _11da;
},_connectResizeHandle:function(){
var _11db=dijit.byId("iedResizeHandle");
this._connection.push(dojo.connect(_11db,"onResize",this,"resize"));
},_connectSimDiv:function(){
this._connection.push(dojo.connect(this._inline.eb,"onFocus",this,"updateSimStyle"));
this._connection.push(dojo.connect(this._inline.eb,"onMouseOver",this,"updateSimStyle"));
this._connection.push(dojo.connect(this._inline.eb,"onMouseOut",this,"updateSimStyle"));
this._connection.push(dojo.connect(dojo.byId(" davinci.ve.input.SmartInput_div"),"onclick",this,"updateSimStyle"));
}});
});
},"dojo/store/Memory":function(){
define(["../_base/declare","./util/QueryResults","./util/SimpleQueryEngine"],function(_11dc,_11dd,_11de){
var base=null;
return _11dc("dojo.store.Memory",base,{constructor:function(_11df){
for(var i in _11df){
this[i]=_11df[i];
}
this.setData(this.data||[]);
},data:null,idProperty:"id",index:null,queryEngine:_11de,get:function(id){
return this.data[this.index[id]];
},getIdentity:function(_11e0){
return _11e0[this.idProperty];
},put:function(_11e1,_11e2){
var data=this.data,index=this.index,_11e3=this.idProperty;
var id=_11e1[_11e3]=(_11e2&&"id" in _11e2)?_11e2.id:_11e3 in _11e1?_11e1[_11e3]:Math.random();
if(id in index){
if(_11e2&&_11e2.overwrite===false){
throw new Error("Object already exists");
}
data[index[id]]=_11e1;
}else{
index[id]=data.push(_11e1)-1;
}
return id;
},add:function(_11e4,_11e5){
(_11e5=_11e5||{}).overwrite=false;
return this.put(_11e4,_11e5);
},remove:function(id){
var index=this.index;
var data=this.data;
if(id in index){
data.splice(index[id],1);
this.setData(data);
return true;
}
},query:function(query,_11e6){
return _11dd(this.queryEngine(query,_11e6)(this.data));
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
define(["dojo/i18n!./nls/webContent","dijit/Dialog","dijit/form/Button","dijit/form/TextBox","./commands/CommandStack","./ui.plugin","./html/html.plugin","./js/js.plugin","./ve/ve.plugin","./ve/themeEditor/themeEditor.plugin","./review/review.plugin","./UserActivityMonitor"],function(_11e7,_11e8,_11e9,_11ea,_11eb,_11ec,_11ed,_11ee,_11ef,_11f0,_11f1,_11f2){
var _11f3=[_11ec,_11ed,_11ee,_11ef,_11f0,_11f1];
var _11f4={plugins:[],extensionPoints:[],subscriptions:[],currentSelection:[],commandStack:new _11eb(),addPlugin:function(_11f5){
url=_11f5+".plugin";
dojo.xhrGet({url:url,handleAs:"json",sync:true,load:function(_11f6,_11f7){
_11f4._loadPlugin(_11f6,url);
}});
},getUser:function(){
if(this._userInfo){
return this._userInfo;
}
this._userInfo=_11f4.serverJSONRequest({url:"cmd/getUserInfo",handleAs:"json",content:{},sync:true});
return this._userInfo;
},getUserDisplayName:function(_11f8){
if(!_11f8){
_11f8=this.getUser();
}
var _11f9=_11f8.userFirstName;
if(!_11f8.userFirstName){
_11f9=_11f8.email;
}
return _11f9;
},getUserDisplayNamePlusEmail:function(_11fa){
if(!_11fa){
_11fa=this.getUser();
}
var _11fb=this.getUserDisplayName(_11fa);
if(_11fb!=_11fa.email){
_11fb+=" &lt;"+_11fa.email+"&gt;";
}
return _11fb;
},loadPlugins:function(){
_11f3.forEach(function(_11fc){
var _11fd=_11fc.id;
_11f4.plugins[_11fd]=_11fc;
for(var id in _11fc){
var _11fe=_11fc[id];
if(typeof _11fe!="string"){
if(_11fe instanceof Array){
_11fe.forEach(function(ext){
_11f4._addExtension(id,ext,_11fd);
});
}else{
_11f4._addExtension(id,_11fe,_11fd);
}
}
}
});
},singleUserMode:function(){
return _11f4.isLocalInstall;
},location:function(){
return document.location.href.split("?")[0];
},getUserWorkspaceUrl:function(){
var loc=this.location();
if(loc.charAt(loc.length-1)=="/"){
loc=loc.substring(0,loc.length-1);
}
var _11ff=loc+"/user/"+_11f4.userName+"/ws/workspace/";
return _11ff;
},run:function(){
if(dojo.isMac){
dojo.addClass(document.documentElement,"isMac");
}
var _1200=document.body.style;
_11f4.supportsCSS3Transitions=_1200.WebkitTransition!==undefined||_1200.MozTransition!==undefined||_1200.OTransition!==undefined||_1200.transition!==undefined;
_11f4.subscribe("/davinci/ui/selectionChanged",_11f4._selectionChanged);
dojo.connect(dojo.doc.documentElement,"onkeypress",function(e){
if(e.charOrCode==8){
window.davinciBackspaceKeyTime=Date.now();
}
});
_11f2.setUpInActivityMonitor(dojo.doc);
dojo.connect(dojo.doc.documentElement,"onkeydown",this,"_handleGlobalDocumentKeyEvent");
dojo.addOnUnload(function(e){
var _1201=null;
var _1202=davinci.Workbench.editorTabs.getChildren();
var _1203=0;
for(var i=0;i<_1202.length;i++){
var _1204=_1202[i];
if(_1204.editor){
var _1205=_1204.editor.getOnUnloadWarningMessage();
if(_1205){
if(!_1201){
_1201=_1205;
}
_1203++;
}
}
}
if(_1203>1){
_1201=dojo.string.substitute(_11e7.multipleFilesUnsaved,[_1201,_1203]);
}
if(!_1201){
var _1206=Date.now()-window.davinciBackspaceKeyTime<100;
if(_1206){
_1201=_11e7.careful;
}
}
if(_1201){
if(e=e||window.event){
e.returnValue=_1201;
}
return _1201;
}
});
},subscribe:function(topic,func){
_11f4.subscriptions.push(dojo.subscribe(topic,this,func));
},destroy:function(){
dojo.forEach(_11f4.subscriptions,dojo.unsubscribe);
_11f2.destroy();
},_addExtension:function(id,_1207,_1208){
if(_1207.id){
_1207.id=_1208+"."+_1207.id;
}
_11f4.extensionPoints[id]=_11f4.extensionPoints[id]||[];
var _1209=_11f4.extensionPoints[id];
_1209.push(_1207);
_11f4.extensionPoints[id]=_1209;
},getExtensions:function(_120a,_120b){
var _120c=_11f4.extensionPoints[_120a];
if(_120b){
var _120d=[];
var _120e=_120b instanceof Function;
if(_120c){
return _120c.filter(function(ext){
return (_120e&&_120b(ext))||ext.id==_120b;
});
}
}
return _120c;
},getExtension:function(_120f,_1210){
return _11f4.getExtensions(_120f,_1210)[0];
},handleError:function(error){
var _1211="welcome";
if(_11f4.singleUserMode()){
_1211=".";
}
window.document.body.innerHTML=dojo.string.substitute(_11e7.serverConnectError,{redirectUrl:_1211,error:error});
},executeCommand:function(cmdID){
var cmd=_11f4.getExtension("davinci.commands",cmdID);
if(cmd&&cmd.run){
cmd.run();
}
},_selectionChanged:function(_1212){
_11f4.currentSelection=_1212;
},getSelection:function(){
return _11f4.currentSelection;
},doLogin:function(){
var retry=true;
var _1213="<table>"+"<tr><td><label for=\"username\">User: </label></td>"+"<td><input dojoType=dijit.form.TextBox type=\"text\" name=\"username\" id='username' ></input></td></tr>"+"<tr><td><label for=\"password\">Password: </label></td> <td><input dojoType=\"dijit.form.TextBox\" type=\"password\" name=\"password\" id='password'></input></td></tr>"+"<tr><td colspan=\"2\" align=\"center\"><button dojoType=\"dijit.form.Button\" type=\"submit\" >Login</button></td>"+"</tr></table>";
do{
var _1214=false;
var _1215=new _11e8({id:"connectDialog",title:"Please login",onExecute:function(){
dojo.xhrGet({url:"cmd/login",sync:true,handleAs:"text",content:{userName:dojo.byId("username").value,password:dojo.byId("password").value,noRedirect:true}}).then(function(_1216){
if(_1216=="OK"){
window.location.href="welcome";
}else{
console.warn("Unknown error: result="+_1216);
}
},function(error){
console.warn("Login error",error);
});
_1214=true;
},onCancel:function(){
_1214=true;
_11f4.destroyRecursive(false);
}});
_1215.setContent(_1213);
_1215.show();
}while(retry);
},serverJSONRequest:function(_1217){
var _1218;
var args={handleAs:"json"};
dojo.mixin(args,_1217);
dojo.xhrGet(args).then(function(_1219){
if(_1219){
_1218=_1219;
}
});
return _1218;
},logoff:function(args){
var _121a=dojo.create("div",null,dojo.body(),"first");
_121a.innerHTML="<table><tr><td><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;Logging off...</td></tr></table>";
dojo.addClass(_121a,"loading");
require("davinci/Workbench").unload();
_11f4.serverJSONRequest({url:"cmd/logoff",handleAs:"text",sync:true});
var _121b=_11f4.location();
var _121c=_121b.length-1;
if(_121b.charAt(_121c)=="/"){
_121b=_121b.substr(0,_121c);
}
location.href=_121b+"/welcome";
},registerKeyBinding:function(_121d,_121e){
if(!this._globalKeyBindings){
this._globalKeyBindings=[];
}
this._globalKeyBindings.push({keyBinding:_121d,action:_121e});
},handleKeyEvent:function(e){
this._handleKeyEvent(e,true);
},_handleGlobalDocumentKeyEvent:function(e){
this._handleKeyEvent(e);
},_handleKeyEvent:function(e,_121f){
if(!this._globalKeyBindings){
return;
}
var _1220=false;
_1220=dojo.some(this._globalKeyBindings,dojo.hitch(this,function(_1221){
if(_11f4.isKeyEqualToEvent(_1221.keyBinding,e)){
davinci.Workbench._runAction(_1221.action);
return true;
}
}));
if(_1220){
dojo.stopEvent(e);
}else{
if(!_121f){
if(this.currentEditor&&this.currentEditor.handleKeyEvent){
this.currentEditor.handleKeyEvent(e,true);
}
}
}
},isKeyEqualToEvent:function(_1222,e){
var equal=true;
var _1223=((e.ctrlKey&&!dojo.isMac)||(dojo.isMac&&e.metaKey));
var _1224=((e.altKey&&!dojo.isMac)||(dojo.isMac&&e.ctrlKey));
if(!!_1222.accel!==_1223){
equal=false;
}
if(!!_1222.meta!==_1224){
equal=false;
}
if(!!_1222.shift!==e.shiftKey){
equal=false;
}
if(equal&&_1222.charOrCode&&e.which){
if(dojo.isArray(_1222.charOrCode)){
equal=dojo.some(_1222.charOrCode,dojo.hitch(this,function(_1225){
return this._comparecharOrCode(_1225,e);
}));
}else{
equal=this._comparecharOrCode(_1222.charOrCode,e);
}
}
return equal;
},_comparecharOrCode:function(_1226,e){
var equal;
if(dojo.isString(_1226)){
equal=(_1226.toLowerCase()===String.fromCharCode(e.which).toLowerCase());
}else{
equal=(_1226===e.which);
}
return equal;
}};
davinci.Runtime=_11f4;
return _11f4;
});
},"dojox/grid/_Events":function(){
define(["dojo/keys","dojo/dom-class","dojo/_base/declare","dojo/_base/event","dojo/_base/sniff"],function(keys,_1227,_1228,event,has){
return _1228("dojox.grid._Events",null,{cellOverClass:"dojoxGridCellOver",onKeyEvent:function(e){
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
var _1229;
switch(e.keyCode){
case keys.ESCAPE:
this.edit.cancel();
break;
case keys.ENTER:
if(!this.edit.isEditing()){
_1229=this.focus.getHeaderIndex();
if(_1229>=0){
this.setSortIndex(_1229);
break;
}else{
this.selection.clickSelect(this.focus.rowIndex,dojo.isCopyKey(e),e.shiftKey);
}
event.stop(e);
}
if(!e.shiftKey){
var _122a=this.edit.isEditing();
this.edit.apply();
if(!_122a){
this.edit.setEditCell(this.focus.cell,this.focus.rowIndex);
}
}
if(!this.edit.isEditing()){
var _122b=this.focus.focusView||this.views.views[0];
_122b.content.decorateEvent(e);
this.onRowClick(e);
event.stop(e);
}
break;
case keys.SPACE:
if(!this.edit.isEditing()){
_1229=this.focus.getHeaderIndex();
if(_1229>=0){
this.setSortIndex(_1229);
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
var _122c=e.keyCode;
event.stop(e);
_1229=this.focus.getHeaderIndex();
if(_1229>=0&&(e.shiftKey&&e.ctrlKey)){
this.focus.colSizeAdjust(e,_1229,(_122c==keys.LEFT_ARROW?-1:1)*5);
}else{
var _122d=(_122c==keys.LEFT_ARROW)?1:-1;
if(this.isLeftToRight()){
_122d*=-1;
}
this.focus.move(0,_122d);
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
_1227.add(e.cellNode,this.cellOverClass);
}
},onCellMouseOut:function(e){
if(e.cellNode){
_1227.remove(e.cellNode,this.cellOverClass);
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
},onCellFocus:function(_122e,_122f){
this.edit.cellFocus(_122e,_122f);
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
_1227.add(e.cellNode,this.cellOverClass);
}
},onHeaderCellMouseOut:function(e){
if(e.cellNode){
_1227.remove(e.cellNode,this.cellOverClass);
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
},onStartEdit:function(_1230,_1231){
},onApplyCellEdit:function(_1232,_1233,_1234){
},onCancelEdit:function(_1235){
},onApplyEdit:function(_1236){
},onCanSelect:function(_1237){
return true;
},onCanDeselect:function(_1238){
return true;
},onSelected:function(_1239){
this.updateRowStyles(_1239);
},onDeselected:function(_123a){
this.updateRowStyles(_123a);
},onSelectionChanged:function(){
}});
});
},"dijit/form/_ListBase":function(){
define(["dojo/_base/declare","dojo/on","dojo/window"],function(_123b,on,_123c){
return _123b("dijit.form._ListBase",null,{selected:null,_listConnect:function(_123d,_123e){
var self=this;
return self.own(on(self.containerNode,on.selector(function(_123f,_1240,_1241){
return _123f.parentNode==_1241;
},_123d),function(evt){
evt.preventDefault();
self[_123e](evt,this);
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
var _1242=this.selected;
if(!_1242){
this.selectFirstNode();
}else{
var next=_1242.nextSibling;
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
var _1243=this.selected;
if(!_1243){
this.selectLastNode();
}else{
var prev=_1243.previousSibling;
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
var _1244=this.selected;
if(_1244){
this.onDeselect(_1244);
this.selected=null;
}
if(node){
this.selected=node;
_123c.scrollIntoView(node);
this.onSelect(node);
}
}else{
if(node){
this.onSelect(node);
}
}
}});
});
},"davinci/model/Model":function(){
define(["dojo/_base/declare"],function(_1245){
return _1245("davinci.model.Model",null,{constructor:function(){
this.elementType="";
this.name="";
this.startOffset=0;
this.endOffset=0;
this.parent=null;
this.children=[];
},inherits:function(_1246){
if(arguments.length>1){
_1246.apply(this,Array.prototype.slice.call(arguments,1));
}else{
_1246.call(this);
}
},getText:function(){
},setText:function(text){
},addChild:function(child,index,_1247){
child.parent=this;
if(index!=undefined){
this.children.splice(index,0,child);
}else{
this.children.push(child);
}
},setStart:function(_1248){
this.startOffset=_1248;
},setEnd:function(_1249){
this.endOffset=_1249;
},getLabel:function(){
return null;
},getID:function(){
return null;
},mapPositions:function(_124a){
return {startOffset:_124a.startOffset,endOffset:_124a.endOffset};
},findChildAtPosition:function(_124b){
if(!_124b.endOffset){
_124b.endOffset=_124b.startOffset;
}
if(_124b.startOffset>=this.startOffset&&_124b.endOffset<=this.endOffset){
for(var i=0;i<this.children.length;i++){
var child=this.children[i].findChildAtPosition(_124b);
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
},find:function(_124c,_124d){
var _124e={visit:function(node){
if(this.found.length>0&&_124d){
return true;
}
var name=null;
for(name in _124c){
if(node[name]!=_124c[name]){
break;
}
}
if(node[name]==_124c[name]){
this.found.push(node);
}
return false;
},found:[]};
this.visit(_124e);
if(_124d){
return (_124e.found.length>0)?_124e.found[0]:null;
}
return _124e.found;
},setDirty:function(_124f){
this.dirtyResource=_124f;
},isDirty:function(){
return this.dirtyResource;
},searchUp:function(_1250){
if(this.elementType==_1250){
return this;
}
var _1251=this.parent;
while(_1251&&_1251.elementType!=_1250){
_1251=_1251.parent;
}
return _1251;
},visit:function(_1252){
if(!_1252.visit(this)){
for(var i=0;i<this.children.length;i++){
this.children[i].visit(_1252);
}
}
if(_1252.endVisit){
_1252.endVisit(this);
}
},updatePositions:function(model,_1253,delta){
visitor={visit:function(_1254){
if(_1254.endOffset<_1253){
return true;
}
if(_1254.startOffset>=_1253){
_1254.startOffset+=delta;
_1254.endOffset+=delta;
}else{
if(_1254.endOffset>=_1253){
_1254.endOffset+=delta;
}
}
}};
model.visit(visitor);
}});
});
},"davinci/review/model/store/GeneralReviewReadStore":function(){
define(["dojo/_base/declare"],function(_1255){
return _1255("davinci.review.model.store.GeneralReviewReadStore",null,{constructor:function(args){
dojo.mixin(this,args);
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._loadedItems=[];
},getFeatures:function(){
return this._features;
},getIdentity:function(item){
return item.getPath();
},fetchItemByIdentity:function(_1256){
var _1257;
if(_1256.identity&&this.isItemLoaded(_1256.identity)){
dojo.some(this._loadedItems,function(item){
if(_1256.identity==this.getIdentity(item)){
_1257=item;
return true;
}
},this);
if(_1257&&_1256.onItem){
var scope=_1256.scope?_1256.scope:dojo.global;
_1256.onItem.call(scope,_1257);
}
}else{
throw new Error("GeneralReviewReadStore: The item cannot be found or it is not loaded!");
}
},getValue:function(item,_1258,_1259){
var ret=this.getValues(item,_1258);
if(ret.length>0){
return ret[0];
}
},getValues:function(item,_125a){
var ret=[];
if(item[_125a]){
if(item[_125a].length>=0){
ret=ret.concat(item[_125a]);
}else{
ret.push(item[_125a]);
}
}
return ret;
},isItem:function(_125b){
if(typeof _125b=="string"){
return dojo.some(this._loadedItems,function(item){
if(_125b==this.getIdentity(item)){
return true;
}
},this);
}else{
if(_125b){
return typeof _125b.r!="undefined"&&_125b.r===this;
}
}
},isItemLoaded:function(_125c){
var _125d=this.isItem(_125c);
if(_125d&&typeof _125c=="object"){
_125d=_125c.isLoaded;
}
return _125d;
},loadItem:function(_125e){
var item=_125e.item;
if(item){
var self=this;
item.getChildren(function(_125f){
var scope=_125e.scope?_125e.scope:dojo.global;
self._loadedItems=self._loadedItems.concat(_125f);
item.children=_125f;
item.isLoaded=true;
dojo.forEach(_125f,function(child){
child.r=self;
});
_125e.onItem&&_125e.onItem.call(scope,item);
},true);
}
},fetch:function(_1260){
if(_1260.onComplete){
var scope=_1260.scope?_1260.scope:dojo.global;
this.root.r=this;
this._loadedItems.push(this.root);
this.loadItem({item:this.root});
_1260.onComplete.call(scope,[this.root]);
}
return _1260;
},close:function(_1261){
this._loadedItems.length=0;
},getLabel:function(item){
throw new Error("GeneralReviewReadStore: getLabel method is abstract!");
},hasAttribute:function(item,_1262){
return this.isItem(item)&&(_1262=="children"?item.elementType=="Folder":typeof item[_1262]);
}});
});
},"davinci/de/widgets/NewDijit":function(){
define(["dojo/_base/declare","dijit/_Widget","dijit/_Templated","dojo/text!./templates/NewDijit.html","dijit/form/RadioButton","dijit/form/TextBox","dijit/form/Button"],function(_1263,_1264,_1265,_1266){
return _1263("davinci.de.widgets.NewDijit",[_1264,_1265],{widgetsInTemplate:true,templateString:_1266,_okButton:null,_dijitName:null,_widgetGroup:null,_replaceSelection:null,postMixInProperties:function(){
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
define(["dojo/_base/array","dojo/_base/Deferred","dojo/aspect","dojo/data/util/sorter","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/when","dojo/store/util/QueryResults","./_FormValueWidget"],function(array,_1267,_1268,_1269,_126a,dom,_126b,_126c,lang,query,when,_126d,_126e){
var _126f=_126a("dijit.form._FormSelectWidget",_126e,{multiple:false,options:null,store:null,query:null,queryOptions:null,labelAttr:"",onFetch:null,sortByLabel:true,loadChildrenOnOpen:false,onLoadDeferred:null,getOptions:function(_1270){
var _1271=_1270,opts=this.options||[],l=opts.length;
if(_1271===undefined){
return opts;
}
if(lang.isArray(_1271)){
return array.map(_1271,"return this.getOptions(item);",this);
}
if(lang.isObject(_1270)){
if(!array.some(this.options,function(o,idx){
if(o===_1271||(o.value&&o.value===_1271.value)){
_1271=idx;
return true;
}
return false;
})){
_1271=-1;
}
}
if(typeof _1271=="string"){
for(var i=0;i<l;i++){
if(opts[i].value===_1271){
_1271=i;
break;
}
}
}
if(typeof _1271=="number"&&_1271>=0&&_1271<l){
return this.options[_1271];
}
return null;
},addOption:function(_1272){
if(!lang.isArray(_1272)){
_1272=[_1272];
}
array.forEach(_1272,function(i){
if(i&&lang.isObject(i)){
this.options.push(i);
}
},this);
this._loadChildren();
},removeOption:function(_1273){
if(!lang.isArray(_1273)){
_1273=[_1273];
}
var _1274=this.getOptions(_1273);
array.forEach(_1274,function(i){
if(i){
this.options=array.filter(this.options,function(node){
return (node.value!==i.value||node.label!==i.label);
});
this._removeOptionItem(i);
}
},this);
this._loadChildren();
},updateOption:function(_1275){
if(!lang.isArray(_1275)){
_1275=[_1275];
}
array.forEach(_1275,function(i){
var _1276=this.getOptions(i),k;
if(_1276){
for(k in i){
_1276[k]=i[k];
}
}
},this);
this._loadChildren();
},setStore:function(store,_1277,_1278){
var _1279=this.store;
_1278=_1278||{};
if(_1279!==store){
var h;
while((h=this._notifyConnections.pop())){
h.remove();
}
if(!store.get){
lang.mixin(store,{_oldAPI:true,get:function(id){
var _127a=new _1267();
this.fetchItemByIdentity({identity:id,onItem:function(_127b){
_127a.resolve(_127b);
},onError:function(error){
_127a.reject(error);
}});
return _127a.promise;
},query:function(query,_127c){
var _127d=new _1267(function(){
if(_127e.abort){
_127e.abort();
}
});
_127d.total=new _1267();
var _127e=this.fetch(lang.mixin({query:query,onBegin:function(count){
_127d.total.resolve(count);
},onComplete:function(_127f){
_127d.resolve(_127f);
},onError:function(error){
_127d.reject(error);
}},_127c));
return new _126d(_127d);
}});
if(store.getFeatures()["dojo.data.api.Notification"]){
this._notifyConnections=[_1268.after(store,"onNew",lang.hitch(this,"_onNewItem"),true),_1268.after(store,"onDelete",lang.hitch(this,"_onDeleteItem"),true),_1268.after(store,"onSet",lang.hitch(this,"_onSetItem"),true)];
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
if(_1278.query){
this._set("query",_1278.query);
this._set("queryOptions",_1278.queryOptions);
}
if(store){
this._loadingStore=true;
this.onLoadDeferred=new _1267();
this._queryRes=store.query(this.query,this.queryOptions);
when(this._queryRes,lang.hitch(this,function(items){
if(this.sortByLabel&&!_1278.sort&&items.length){
if(items[0].getValue){
items.sort(_1269.createSortFunction([{attribute:store.getLabelAttributes(items[0])[0]}],store));
}else{
var _1280=this.labelAttr;
items.sort(function(a,b){
return a[_1280]>b[_1280]?1:b[_1280]>a[_1280]?-1:0;
});
}
}
if(_1278.onFetch){
items=_1278.onFetch.call(this,items,_1278);
}
array.forEach(items,function(i){
this._addOptionForItem(i);
},this);
if(this._queryRes.observe){
this._queryRes.observe(lang.hitch(this,function(_1281,_1282,_1283){
if(_1282==_1283){
this._onSetItem(_1281);
}else{
if(_1282!=-1){
this._onDeleteItem(_1281);
}
if(_1283!=-1){
this._onNewItem(_1281);
}
}
}),true);
}
this._loadingStore=false;
this.set("value","_pendingValue" in this?this._pendingValue:_1277);
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
return _1279;
},_setValueAttr:function(_1284,_1285){
if(!this._onChangeActive){
_1285=null;
}
if(this._loadingStore){
this._pendingValue=_1284;
return;
}
var opts=this.getOptions()||[];
if(!lang.isArray(_1284)){
_1284=[_1284];
}
array.forEach(_1284,function(i,idx){
if(!lang.isObject(i)){
i=i+"";
}
if(typeof i==="string"){
_1284[idx]=array.filter(opts,function(node){
return node.value===i;
})[0]||{value:"",label:""};
}
},this);
_1284=array.filter(_1284,function(i){
return i&&i.value;
});
if(!this.multiple&&(!_1284[0]||!_1284[0].value)&&opts.length){
_1284[0]=opts[0];
}
array.forEach(opts,function(i){
i.selected=array.some(_1284,function(v){
return v.value===i.value;
});
});
var val=array.map(_1284,function(i){
return i.value;
}),disp=array.map(_1284,function(i){
return i.label;
});
if(typeof val=="undefined"||typeof val[0]=="undefined"){
return;
}
this._setDisplay(this.multiple?disp:disp[0]);
this.inherited(arguments,[this.multiple?val:val[0],_1285]);
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
var _1286=array.some(val,function(v){
return child.option&&(v===child.option.value);
});
_126b.toggle(child.domNode,this.baseClass.replace(/\s+|$/g,"SelectedOption "),_1286);
child.domNode.setAttribute("aria-selected",_1286?"true":"false");
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
},_onNewItem:function(item,_1287){
if(!_1287||!_1287.parent){
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
var _1288=this._getOptionObjForItem(item);
this.addOption(_1288);
},constructor:function(_1289){
this._oValue=(_1289||{}).value||null;
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
return {value:(node.getAttribute("data-"+_126c._scopeName+"-value")||node.getAttribute("value")),label:String(node.innerHTML),selected:node.getAttribute("selected")||false,disabled:node.getAttribute("disabled")||false};
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
return _126f;
});
},"dijit/form/_ComboBoxMenu":function(){
define(["dojo/_base/declare","dojo/dom-class","dojo/dom-style","dojo/keys","../_WidgetBase","../_TemplatedMixin","./_ComboBoxMenuMixin","./_ListMouseMixin"],function(_128a,_128b,_128c,keys,_128d,_128e,_128f,_1290){
return _128a("dijit.form._ComboBoxMenu",[_128d,_128e,_1290,_128f],{templateString:"<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;'>"+"<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>"+"<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>"+"</div>",baseClass:"dijitComboBoxMenu",postCreate:function(){
this.inherited(arguments);
if(!this.isLeftToRight()){
_128b.add(this.previousButton,"dijitMenuItemRtl");
_128b.add(this.nextButton,"dijitMenuItemRtl");
}
},_createMenuItem:function(){
var item=this.ownerDocument.createElement("div");
item.className="dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl");
item.setAttribute("role","option");
return item;
},onHover:function(node){
_128b.add(node,"dijitMenuItemHover");
},onUnhover:function(node){
_128b.remove(node,"dijitMenuItemHover");
},onSelect:function(node){
_128b.add(node,"dijitMenuItemSelected");
},onDeselect:function(node){
_128b.remove(node,"dijitMenuItemSelected");
},_page:function(up){
var _1291=0;
var _1292=this.domNode.scrollTop;
var _1293=_128c.get(this.domNode,"height");
if(!this.getHighlightedOption()){
this.selectNextNode();
}
while(_1291<_1293){
var _1294=this.getHighlightedOption();
if(up){
if(!_1294.previousSibling||_1294.previousSibling.style.display=="none"){
break;
}
this.selectPreviousNode();
}else{
if(!_1294.nextSibling||_1294.nextSibling.style.display=="none"){
break;
}
this.selectNextNode();
}
var _1295=this.domNode.scrollTop;
_1291+=(_1295-_1292)*(up?-1:1);
_1292=_1295;
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
},"dijit/layout/_TabContainerBase":function(){
define(["dojo/text!./templates/TabContainer.html","./StackContainer","./utils","../_TemplatedMixin","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(_1296,_1297,_1298,_1299,_129a,_129b,_129c,_129d){
return _129a("dijit.layout._TabContainerBase",[_1297,_1299],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:_1296,postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&_129d.set(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
_129b.add(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
_129b.add(this.domNode,"dijitTabContainerNested");
_129b.add(this.tablist.containerNode,"dijitTabContainerTabListNested");
_129b.add(this.tablistSpacer,"dijitTabContainerSpacerNested");
_129b.add(this.containerNode,"dijitTabPaneWrapperNested");
}else{
_129b.add(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(tab){
_129b.add(tab.domNode,"dijitTabPane");
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
var _129e=this.tabPosition.replace(/-h/,"");
this.tablist.layoutAlign=_129e;
var _129f=[this.tablist,{domNode:this.tablistSpacer,layoutAlign:_129e},{domNode:this.containerNode,layoutAlign:"client"}];
_1298.layoutChildren(this.domNode,this._contentBox,_129f);
this._containerContentBox=_1298.marginBox2contentBox(this.containerNode,_129f[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
var s=this.tablist.domNode.style;
s.width="0";
var width=_129c.getContentBox(this.domNode).w;
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
},"url:davinci/ui/templates/ThemeSetsDialog.html":"<div>\n\t<div class=\"dijitDialogPaneContentArea\">\n\t\t<table style=\"width: 90%\">\n\t\t\t<tr>\n\t\t\t\t\t<td style=\"width:40%; vertical-align: top;\">\n\t\t\t\t\t\t\t<table> \n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t<td style=\" vertical-align: top;\" >\n\t\t\t\t\t\t\t\t\t\t\t\t\t<label>${uiNLS.themeSets}</label><select  id=\"theme_select_themeset_theme_select\" name=\"theme_select_themeset_theme_select\" size=\"10\" style=\"margin-bottom: 5px; width: 190px;\" ></select>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div id=\"toolbar1\" data-dojo-type=\"dijit.Toolbar\" class=\"toolbaredContainer_toolbarDiv davinciToolbar\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div data-dojo-type=\"dijit.form.Button\" id=\"theme_select_themeset_add\" data-dojo-props=\"iconClass:'viewActionIcon addThemeSetIcon', showLabel:false \">${uiNLS.addThemeSet}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div data-dojo-type=\"dijit.form.Button\" id=\"theme_select_themeset_delete\" data-dojo-props=\"iconClass:'viewActionIcon removeThemeSetIcon', showLabel:false \">${uiNLS.deleteThemeSet}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t </div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t<td><div style=\"border-right: 1px solid #ccc; width: 1px; height: 250px; margin-left: 10px; margin-top: 10px;\"></div></td>\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t<td></td><td></td>\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<table style=\"width: 100%; margin-left:10px; margin-right:10px;\">\n\t\t\t\t\t\t\t\t\t<tr><td colspan=\"2\">${uiNLS.currentlySelectedThemeSet}</td><tr>\n\t\t\t\t\t\t\t\t\t<tr><td style=\"width: 18%;\">${uiNLS.themeSetName}</td><td style=\"text-align: center;\"><input dojoType=\"dijit.form.TextBox\" id=\"theme_select_themeset_theme_select_textbox\" readonly= \"true\" style=\"width: 175px;\" ></input><input type=\"button\" dojoType=\"dijit.form.Button\" id=\"theme_select_rename_button\" label=\"Rename\" style=\"margin-left: 5px;\"></td></tr>\n\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t<div style=\"border-top: 1px solid; top: 231px; border-top-color: #ccc; left: 429px; width: 300px; height: 11px; margin-top: 6px; margin-left:10px;\"></div>\n\t\t\t\t\t\t\t<table style=\"margin-left: 15px; width: 100%;\">\n\t\t\t\t\t\t\t\t\t<tr><td style=\"width: 139px;\">${uiNLS.desktopTheme}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_desktop_theme_select\"type=\"text\"  style=\"width: 175px;\"  ></select></td></tr>\n\t\t\t\t\t\t\t\t\t<tr><td>${uiNLS.mobileTheme}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_mobile_theme_select\"type=\"text\"  style=\"width: 175px;\" ></select></td></tr>\n\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t<table id=\"theme_select_devices_table\" style=\"margin-left:30px; border-collapse: separate; border-spacing: 0 0; width: 100%\">\n\t\t\t\t\t\t\t<tr><td style=\"width: 129px;\">${uiNLS.android}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_android_select\" type=\"text\"  style=\"width: 150px;\"></select></td></tr>\n\t\t\t\t\t\t\t<tr><td>${uiNLS.blackberry}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_blackberry_select\" type=\"text\"  style=\"width: 150px;\"></select></td></tr>\n\t\t\t\t\t\t\t<tr><td>${uiNLS.ipad}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_ipad_select\" type=\"text\"  style=\"width: 150px;\"></select></td></tr>\n\t\t\t\t\t\t\t<tr><td>${uiNLS.iphone}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_iphone_select\" type=\"text\"  style=\"width: 150px;\"></select></td></tr>\n\t\t\t\t\t\t\t<tr><td>${uiNLS.other}</td><td><select dojoType=\"dijit.form.Select\" id=\"theme_select_other_select\" type=\"text\"  style=\"width: 150px;\"></select></td></tr>\n\t\t\t\t\t\t\t</table>\n\t\t\n\t\t\t\t\t </td>\n\t\t\t </tr>\n\t\t</table>\n\t</div>\n\t<div class=\"dijitDialogPaneActionBar\">\n\t\t<button dojoType=\"dijit.form.Button\" id=\"theme_select_ok_button\" label=\"${uiNLS.save}\" class=\"maqPrimaryButton\" type=\"submit\"></button>\n\t\t<button dojoType=\"dijit.form.Button\" id=\"theme_select_cancel_button\" label=\"${commonNLS.buttonCancel}\" class=\"maqSecondaryButton\"></button>\n\t</div>\n</div>\n","dijit/_KeyNavContainer":function(){
define(["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_12a0,_12a1,_12a2,array,keys,_12a3,event,_12a4,lang){
return _12a3("dijit._KeyNavContainer",[_12a2,_12a1],{tabIndex:"0",connectKeyNavHandlers:function(_12a5,_12a6){
var _12a7=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
array.forEach(_12a5,function(code){
_12a7[code]=prev;
});
array.forEach(_12a6,function(code){
_12a7[code]=next;
});
_12a7[keys.HOME]=lang.hitch(this,"focusFirstChild");
_12a7[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_12a0.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
array.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_12a8,_12a9){
this.inherited(arguments);
this._startupChild(_12a8);
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
},focusChild:function(_12aa,last){
if(!_12aa){
return;
}
if(this.focusedChild&&_12aa!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_12aa.set("tabIndex",this.tabIndex);
_12aa.focus(last?"end":"start");
this._set("focusedChild",_12aa);
},_startupChild:function(_12ab){
_12ab.set("tabIndex","-1");
this.connect(_12ab,"_onFocus",function(){
_12ab.set("tabIndex",this.tabIndex);
});
this.connect(_12ab,"_onBlur",function(){
_12ab.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_12a4.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_12a4.set(this.domNode,"tabIndex",this.tabIndex);
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
var _12ac=this.getChildren();
for(var i=0;i<_12ac.length;i++){
if(!child){
child=_12ac[(dir>0)?0:(_12ac.length-1)];
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
define(["dojo/_base/declare","dojo/dom","dojo/_base/lang","dojo/query","dojo/store/Memory","../registry"],function(_12ad,dom,lang,query,_12ae,_12af){
function _12b0(_12b1){
return {id:_12b1.value,value:_12b1.value,name:lang.trim(_12b1.innerText||_12b1.textContent||"")};
};
return _12ad("dijit.form.DataList",_12ae,{constructor:function(_12b2,_12b3){
this.domNode=dom.byId(_12b3);
lang.mixin(this,_12b2);
if(this.id){
_12af.add(this);
}
this.domNode.style.display="none";
this.inherited(arguments,[{data:query("option",this.domNode).map(_12b0)}]);
},destroy:function(){
_12af.remove(this.id);
},fetchSelectedItem:function(){
var _12b4=query("> option[selected]",this.domNode)[0]||query("> option",this.domNode)[0];
return _12b4&&_12b0(_12b4);
}});
});
},"davinci/maqetta/AppStates":function(){
define(["dojo/_base/connect","dojo/dom-style","dojo/dom","dojo/_base/html","dojo/_base/window","dojo/_base/array","dojo/parser","require"],function(_12b5,_12b6,dom,dhtml,_12b7,_12b8,_12b9,_12ba){
var _12bb=function(){
};
_12bb.prototype={NORMAL:"Normal",DELTAS_ATTRIBUTE:"data-maq-deltas",DELTAS_ATTRIBUTE_P6:"dvStates",APPSTATES_ATTRIBUTE:"data-maq-appstates",APPSTATES_ATTRIBUTE_P6:"dvStates",reImportant:/^(.*)(!\ *important)(.*)/,isStateContainer:function(node){
return !!(node&&node._maqAppStates);
},getStateContainersForNode:function(node){
var _12bc=[];
var n=node;
while(n){
if(n._maqAppStates){
_12bc.splice(0,0,n);
}
if(n.tagName=="BODY"){
break;
}
n=n.parentNode;
}
return _12bc;
},getAllStateContainers:function(_12bd){
var _12be=[];
var that=this;
function _12bf(_12c0){
if(_12c0._maqAppStates){
_12be.push(_12c0);
}
var _12c1=that._getChildrenOfNode(_12c0);
for(var i=0;i<_12c1.length;i++){
_12bf(_12c1[i]);
}
};
_12bf(_12bd);
return _12be;
},getStatesArray:function(node,_12c2,_12c3,_12c4){
var _12c5=[];
if(node){
var pn=node.parentNode;
while(pn){
if(pn._maqAppStates){
if(pn==_12c4){
_12c5.splice(0,0,{node:pn,oldState:_12c2,newState:_12c3});
}else{
var _12c6=pn._maqAppStates.states?pn._maqAppStates.states.current:undefined;
_12c5.splice(0,0,{node:pn,oldState:_12c6,newState:_12c6});
}
}
if(pn.tagName=="BODY"){
break;
}
pn=pn.parentNode;
}
}
return _12c5;
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
var _12c7=[this.NORMAL];
if(node){
var pn=node.parentNode;
while(pn){
if(pn._maqAppStates&&pn._maqAppStates.states){
var _12c8=pn._maqAppStates.states?pn._maqAppStates.states:[];
for(var i=0;i<_12c8.length;i++){
_12c7.push(_12c8[i]);
}
}
if(pn.tagName=="BODY"){
break;
}
pn=pn.parentNode;
}
}
return _12c7;
},getStatesListCurrent:function(node){
var _12c9=[];
if(node){
var pn=node.parentNode;
while(pn){
if(pn._maqAppStates){
_12c9.splice(0,0,pn._maqAppStates.current);
}
if(pn.tagName=="BODY"){
break;
}
pn=pn.parentNode;
}
}
return _12c9;
},getAllCurrentStates:function(_12ca){
var _12cb=this.getAllStateContainers(_12ca);
var _12cc=[];
for(var i=0;i<_12cb.length;i++){
var node=_12cb[i];
var state=this.getState(node);
_12cc.push({stateContainerNode:node,state:state});
}
return _12cc;
},getStates:function(node){
var _12cd=node&&node._maqAppStates;
var names=["Normal"];
if(_12cd){
var _12ce=_12cd.states?_12cd.states:[];
for(var i=0;i<_12ce.length;i++){
var name=_12ce[i];
if(name!="Normal"){
names.push(name);
}
}
}
return names;
},_getSCNodeFromElemOrEvent:function(state,_12cf){
var node;
if(_12cf&&_12cf.tagName&&_12cf.nodeName){
node=_12cf._maqAppStates?_12cf:this.findStateContainer(_12cf,state);
}else{
if(_12cf&&_12cf.target&&_12cf.currentTarget){
node=_12cf.currentTarget;
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
},setState:function(_12d0,_12d1,_12d2){
var _12d3=_12d2?_12d2.updateWhenCurrent:false;
var _12d4=_12d2?_12d2.silent:false;
var focus=_12d2?_12d2.focus:false;
var node=this._getSCNodeFromElemOrEvent(_12d0,_12d1);
if(!node||!node._maqAppStates||(!_12d3&&node._maqAppStates.current==_12d0)){
return;
}
var _12d5=node._maqAppStates.current;
if(this.isNormalState(_12d0)){
if(node._maqAppStates.hasOwnProperty("current")){
delete node._maqAppStates.current;
}
_12d0=undefined;
}else{
node._maqAppStates.current=_12d0;
}
if(focus){
this._setFocus(_12d0,node);
}
if(_12d2&&_12d2.hasOwnProperty("initial")){
if(_12d2.initial){
node._maqAppStates.initial=_12d0;
}else{
if(node._maqAppStates.initial==_12d0){
delete node._maqAppStates.initial;
}
}
}
if(!_12d4){
_12b5.publish("/maqetta/appstates/state/changed",[{node:node,newState:_12d0,oldState:_12d5,stateContainerNode:node}]);
}
this._updateSrcState(node,!_12d0);
},getInitial:function(node){
return node&&node._maqAppStates&&node._maqAppStates.initial;
},getFocus:function(_12d6){
if(!_12d6){
return null;
}
var _12d7=this.getAllStateContainers(_12d6);
for(var i=0;i<_12d7.length;i++){
var _12d8=_12d7[i]._maqAppStates;
if(_12d8&&_12d8.hasOwnProperty("focus")){
return {stateContainerNode:_12d7[i],state:_12d8.focus};
}
}
return null;
},_setFocus:function(_12d9,node){
if(!node||!node._maqAppStates){
return;
}
var _12da=(node.ownerDocument&&node.ownerDocument.body);
if(!_12da){
return;
}
var _12db=this.getFocus(_12da);
if(_12db&&_12db.stateContainerNode==node&&_12db.state==_12d9){
return;
}
var _12dc;
var _12dd=this.getAllStateContainers(_12da);
for(var i=0;i<_12dd.length;i++){
_12dc=_12dd[i]._maqAppStates;
if(_12dc){
delete _12dc.focus;
}
}
node._maqAppStates.focus=_12d9;
},isNormalState:function(state){
if(arguments.length==0){
state=this.getState();
}
return !state||state==this.NORMAL;
},_styleArrayMixin:function(_12de,_12df){
if(_12df){
for(var j=0;j<_12df.length;j++){
var item2=_12df[j];
for(var prop2 in item2){
for(var i=_12de.length-1;i>=0;i--){
var item1=_12de[i];
if(item1.hasOwnProperty(prop2)){
_12de.splice(i,1);
}
}
}
}
for(var k=0;k<_12df.length;k++){
_12de.push(_12df[k]);
}
}
},getStyle:function(node,_12e0,name){
var _12e1,_12e2=[];
for(var i=0;i<_12e0.length;i++){
var state=_12e0[i];
_12e1=node&&node._maqDeltas&&node._maqDeltas[state]&&node._maqDeltas[state].style;
this._styleArrayMixin(_12e2,_12e1);
if(arguments.length>2){
if(_12e2){
for(var j=_12e2.length-1;j>=0;j--){
var item=_12e2[j];
for(var prop in item){
if(prop!=name){
_12e2.splice(j,1);
break;
}
}
}
}
}
}
return _12e2;
},hasStyle:function(node,state,name){
if(!node||!name){
return;
}
if(node._maqDeltas&&node._maqDeltas[state]&&node._maqDeltas[state].style){
var _12e3=node._maqDeltas[state].style;
for(var i=0;i<_12e3[i];i++){
if(_12e3[i].hasProperty(name)){
return true;
}
}
}else{
return false;
}
},setStyle:function(node,state,_12e4,_12e5){
if(!node||!_12e4){
return;
}
node._maqDeltas=node._maqDeltas||{};
node._maqDeltas[state]=node._maqDeltas[state]||{};
node._maqDeltas[state].style=node._maqDeltas[state].style||[];
var _12e6=node._maqDeltas[state].style;
if(_12e4){
for(var i=0;i<_12e4.length;i++){
var _12e7=_12e4[i];
for(var _12e8 in _12e7){
for(var j=_12e6.length-1;j>=0;j--){
var _12e9=_12e6[j];
for(var _12ea in _12e9){
if(_12e8==_12ea){
_12e6.splice(j,1);
break;
}
}
}
}
}
}
var _12eb;
if(_12e4){
for(var j=0;j<_12e4.length;j++){
for(var p in _12e4[j]){
var value=_12e4[j][p];
if(typeof value!="undefined"&&value!==null){
if(typeof _12eb=="undefined"){
_12eb=[];
}
var o={};
o[p]=this._getFormattedValue(p,value);
_12eb.push(o);
}
}
}
}
if(_12e6&&_12eb){
node._maqDeltas[state].style=_12e6.concat(_12eb);
}else{
if(_12e6){
node._maqDeltas[state].style=_12e6;
}else{
if(_12eb){
node._maqDeltas[state].style=_12eb;
}else{
node._maqDeltas[state].style=undefined;
}
}
}
if(!_12e5){
_12b5.publish("/davinci/states/state/style/changed",[{node:node,state:state,style:_12e4}]);
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
var _12ec=_12ba("dojo/_base/lang").trim(value);
if(/^[-+]?[0-9]*\.?[0-9]+$/.test(_12ec)){
value=_12ec+"px";
}
}
return value;
},_getStatesListUsingPropName:function(_12ed,_12ee){
var _12ef=[];
if(_12ed){
for(var i=0;i<_12ed.length;i++){
_12ef.push(_12ed[i][_12ee]);
}
}
return _12ef;
},_resetAndCacheNormalStyle:function(node,_12f0){
if(!node||!_12f0){
return;
}
for(var i=0;i<_12f0.length;i++){
var _12f1=_12f0[i].oldState;
var _12f2=this._getStatesListUsingPropName(_12f0,"oldState");
var _12f3=this.getStyle(node,_12f2);
var _12f4=this._getStatesListUsingPropName(_12f0);
var _12f5=this.getStyle(node,_12f4);
if(_12f3){
for(var j=0;j<_12f3.length;j++){
var oItem=_12f3[j];
for(var oProp in oItem){
var _12f6=this._convertStyleName(oProp);
node.style[_12f6]="";
}
}
}
if(_12f5){
for(var k=0;k<_12f5.length;k++){
var nItem=_12f5[k];
for(var nProp in nItem){
var _12f6=this._convertStyleName(nProp);
var style=node.style;
var value=this._getFormattedValue(nProp,nItem[nProp])+"";
var _12f7=value?value.match(this.reImportant):null;
if(_12f7){
if(style.setProperty){
style.setProperty(nProp,_12f7[1]+_12f7[3],"important");
}else{
node.style[_12f6]=_12f7[1]+_12f7[3];
}
}else{
node.style[_12f6]=value;
}
}
}
}
}
},_update:function(node,_12f8){
if(!node||!node._maqDeltas){
return;
}
var _12f9=this._getStatesListUsingPropName(_12f8,"newState");
var _12fa=this.getStyle(node,_12f9);
this._resetAndCacheNormalStyle(node,_12f8);
if(_12fa){
for(var i=0;i<_12fa.length;i++){
var style=_12fa[i];
for(var name in style){
var _12fb=this._convertStyleName(name);
var value=style[name]+"";
var _12fc=value?value.match(this.reImportant):null;
if(_12fc){
if(style.setProperty){
style.setProperty(name,_12fc[1]+_12fc[3],"important");
}else{
node.style[_12fb]=_12fc[1]+_12fc[3];
}
}else{
node.style[_12fb]=value;
}
}
}
}
var _12fd,_12fe;
if(node.id&&node.ownerDocument){
var byId=node.ownerDocument.defaultView.dijit.byId;
if(byId){
_12fd=byId&&byId(node.id);
}
}
if(_12fd&&_12fd.getParent){
_12fe=_12fd.getParent();
}
if(_12fe&&_12fe.resize){
_12fe.resize();
}else{
if(_12fd&&_12fd.resize){
_12fd.resize();
}
}
},isContainer:function(node){
var _12ff=false;
if(node){
var doc=this.getDocument();
if(node===(doc&&doc.body)||node.tagName=="BODY"){
_12ff=true;
}
}
return _12ff;
},getContainer:function(){
return document.body;
},add:function(node,state){
if(!node||this.hasState(node,state)){
return;
}
node._maqAppStates=node._maqAppStates||{};
node._maqAppStates.states=node._maqAppStates.states||[];
node._maqAppStates.states.push(state);
_12b5.publish("/davinci/states/state/added",[{node:node,state:state}]);
this._updateSrcState(node);
},remove:function(node,state){
if(!node||!node._maqAppStates||!node._maqAppStates.states||!this.hasState(node,state)){
return;
}
var idx=node._maqAppStates.states.indexOf(state);
if(idx<0){
return;
}
var _1300=this.getState(node);
var body=node.ownerDocument.body;
var _1301=this.getFocus(body);
node._maqAppStates.states.splice(idx,1);
var _1302={};
if(_1301&&_1301.stateContainerNode==node&&_1301.state==state){
_1302.focus=true;
_1302.updateWhenCurrent=true;
}
if(state==_1300){
this.setState(undefined,node,_1302);
}
_12b5.publish("/davinci/states/state/removed",[{node:node,state:state}]);
this._updateSrcState(node);
},rename:function(_1303,_1304){
if(!_1304){
return false;
}
var _1305=_1304.oldName;
var _1306=_1304.newName;
if(!_1303||!_1303._maqAppStates||!_1303._maqAppStates.states||!_1303._maqAppStates.states.length){
return false;
}
var _1307=_1303._maqAppStates.states;
if(_1307.indexOf(_1305)<0||_1307.indexOf(_1306)>=0){
return false;
}
_1307.splice(_1307.indexOf(_1305),1,_1306);
if(_1303._maqAppStates.focus===_1305){
_1303._maqAppStates.focus=_1306;
}
if(_1303._maqAppStates.current===_1305){
_1303._maqAppStates.current=_1306;
}
var nodes=[_1303];
var _1308=this.getState(_1303);
nodes=nodes.concat(this._getChildrenOfNode(_1303));
while(nodes.length){
var node=nodes.shift();
if(node._maqDeltas&&node._maqDeltas[_1305]){
node._maqDeltas[_1306]=node._maqDeltas[_1305];
delete node._maqDeltas[_1305];
}
nodes=nodes.concat(this._getChildrenOfNode(node));
var _1309=this.getStatesArray(node,null,_1306,_1303);
this._update(node,_1309);
this._updateSrcState(node);
}
_12b5.publish("/davinci/states/state/renamed",[{node:node,oldName:_1305,newName:_1306,stateContainerNode:node}]);
return true;
},_isEmpty:function(_130a){
for(var name in _130a){
if(_130a.hasOwnProperty(name)){
return false;
}
}
return true;
},serialize:function(node){
var that=this;
function munge(_130b){
var str=null;
if(node[_130b]){
var o=_12ba("dojo/_base/lang").clone(node[_130b]);
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
var _130c=munge("_maqAppStates");
if(typeof _130c=="string"){
obj.maqAppStates=_130c;
}
var _130d=munge("_maqDeltas");
if(typeof _130d=="string"){
obj.maqDeltas=_130d;
}
return obj;
},deserialize:function(_130e,_130f){
if(typeof _130e=="string"){
_130e=_130e.replace(/(\\)?'/g,function($0,$1){
return $1?"'":"\"";
});
_130e=JSON.parse(_130e);
this._migrate_m4_m5(_130e);
_130e=this._migrate_m6_m7(_130e,_130f&&_130f.isBody);
}
return _130e;
},_migrate_m4_m5:function(_1310){
for(var s in _1310){
var state=_1310[s];
if(state){
var style=state.style;
if(style&&!style.length){
var _1311=[];
for(var prop in style){
var o={};
o[prop]=style[prop];
_1311.push(o);
}
state.style=_1311;
}
}
}
},_migrate_m6_m7:function(_1312,_1313){
if(!_1312||_1312.states){
return _1312;
}
if(_1313){
var _1314=[];
for(var s in _1312){
if(s!="current"){
_1314.push(s);
}
}
if(_1314.length>0){
return {states:_1314};
}else{
return undefined;
}
}else{
delete _1312.current;
return _1312;
}
},store:function(node,_1315,_1316){
if(!node){
return;
}
this.clear(node);
var _1317=(node.tagName=="BODY");
if(_1315){
node._maqAppStates=this.deserialize(_1315,{isBody:_1317});
}
if(_1316){
node._maqDeltas=this.deserialize(_1316,{isBody:_1317});
}
_12b5.publish("/davinci/states/stored",[]);
},retrieve:function(node){
if(!node){
return;
}
var _1318=node.getAttribute(this.APPSTATES_ATTRIBUTE);
if(!_1318&&node.tagName==="BODY"){
_1318=node.getAttribute(this.APPSTATES_ATTRIBUTE_P6);
}
var _1319=node.getAttribute(this.DELTAS_ATTRIBUTE);
if(!_1319&&node.tagName!=="BODY"){
_1319=node.getAttribute(this.DELTAS_ATTRIBUTE_P6);
}
return {maqAppStates:_1318,maqDeltas:_1319};
},clear:function(node){
if(!node){
return;
}
delete node._maqAppStates;
delete node._maqDeltas;
},_parseStyleValues:function(text){
var _131a=[];
if(text){
_12b8.forEach(text.split(";"),function(s){
var i=s.indexOf(":");
if(i>0){
var n=s.substring(0,i).trim();
var v=s.substring(i+1).trim();
var o={};
o[n]=v;
_131a.push(o);
}
});
}
return _131a;
},transferElementStyle:function(node,_131b){
if(node){
var _131c=node._maqDeltas;
var _131d=this._parseStyleValues(_131b);
if(!_131c["undefined"]){
_131c["undefined"]={};
}
_131c["undefined"].style=_131d;
}
},getDocument:function(){
return document;
},_shouldInitialize:function(){
var _131e=window.frameElement;
var _131f=top.davinci&&top.davinci.Runtime&&(!_131e||_131e.dvContext);
return !_131f;
},_getChildrenOfNode:function(node){
var _1320=[];
for(var i=0;i<node.childNodes.length;i++){
var n=node.childNodes[i];
if(n.nodeType===1){
_1320.push(n);
}
}
return _1320;
},initialize:function(){
if(!this.subscribed){
_12b5.subscribe("/maqetta/appstates/state/changed",this,function(e){
if(e.editorClass){
return;
}
var _1321=davinci.states._getChildrenOfNode(e.node);
while(_1321.length){
var child=_1321.shift();
if(!davinci.states.isContainer(child)){
_1321=_1321.concat(davinci.states._getChildrenOfNode(child));
}
var _1322=this.getStatesArray(child,e.oldState,e.newState,e.stateContainerNode);
davinci.states._update(child,_1322);
}
});
this.subscribed=true;
}
}};
if(typeof davinci==="undefined"){
davinci={};
}
var _1323=davinci.states=new _12bb();
(function(){
_1323.initialize();
if(_1323._shouldInitialize()){
if(typeof _12ba!="undefined"){
_12ba(["dojo/_base/lang","dojo/query","dojo/aspect"],function(lang,query,_1324){
var count=0,_1325=false;
var hook=function(_1326){
if(!_1325){
_1324.around(_1326,"parse",function(parse){
var cache={};
return function(_1327,args){
var root;
if(!args&&_1327&&_1327.rootNode){
args=_1327;
root=args.rootNode;
}else{
root=_1327;
}
root=root?dhtml.byId(root):_12b7.body();
_1328(cache);
var _1329=parse.apply(this,arguments);
_132a(cache,root);
return _1329;
};
});
dojo.parser.parse=_1326.parse;
_1325=true;
}
};
try{
var _132b=_12ba("dojox/mobile/parser");
hook.apply(_132b);
}
catch(e){
}
if(!_132b){
hook.call(null,_12b9);
}
var _1328=function(cache){
var _132c="maqTempClass";
var doc=_1323.getDocument();
if(!doc.body._maqAlreadyPreserved){
var _132d=davinci.states.retrieve(doc.body);
if(_132d&&_132d.maqAppStates){
cache.body=_132d.maqAppStates;
}
doc.body._maqAlreadyPreserved=true;
}
query("*",doc).forEach(function(node){
var _132e=node.getAttribute("class");
if(!_132e){
_132e="";
}
if(!node._maqAlreadyPreserved&&_132e.indexOf(_132c)<0){
node._maqAlreadyPreserved=true;
var _132f=_1323.retrieve(node);
if(node.tagName!="BODY"&&_132f&&(_132f.maqAppStates||_132f.maqDeltas)){
var _1330=_132c+count;
_132e=_132e+" "+_1330;
node.setAttribute("class",_132e);
count++;
cache[_1330]={};
if(_132f.maqAppStates){
cache[_1330].maqAppStates=_132f.maqAppStates;
}
if(_132f.maqDeltas){
cache[_1330].maqDeltas=_132f.maqDeltas;
}
if(node.style){
cache[_1330].style=node.style.cssText;
}else{
console.error("States.js _preserveStates. No value for node.style.");
}
}
}
});
};
var _132a=function(cache,_1331){
var doc=_1323.getDocument(),_1332=[],_1333,_1334,_1335,_1336;
for(var id in cache){
var node;
if(id=="body"){
node=doc.body;
}else{
node=doc.querySelectorAll("."+id)[0];
}
if(node){
var _1337=(node.tagName=="BODY");
_1333=_1334=_1335=_1336=null;
if(_1337){
_1333=cache[id];
}else{
_1333=cache[id].maqAppStates;
_1334=cache[id].maqDeltas;
}
if(_1333){
_1335=_1323.deserialize(_1333,{isBody:_1337});
}
if(_1334){
_1336=_1323.deserialize(_1334,{isBody:_1337});
}
if(_1335){
if(_1335.initial){
_1335.current=_1335.initial;
}else{
if(_1335.focus){
delete _1335.focus;
}
delete _1335.current;
}
}
_1323.store(node,_1335,_1336);
if(_1334){
davinci.states.transferElementStyle(node,cache[id].style);
}
}
}
var _1338=_1323.getAllStateContainers(doc.body);
var _1339=[];
for(var i=0;i<_1338.length;i++){
var _133a=_1338[i];
if(_133a._maqAppStates&&typeof _133a._maqAppStates.current=="string"){
var focus=_133a._maqAppStates.focus;
_1323.setState(_133a._maqAppStates.current,_133a,{updateWhenCurrent:true,focus:focus});
}
}
};
});
}
}
})();
if(!davinci.Workbench&&typeof dijit!="undefined"){
_12b5.subscribe("/maqetta/appstates/state/changed",function(args){
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
return _12bb;
});
},"dijit/Tooltip":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/on","dojo/sniff","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","./main"],function(array,_133b,fx,dom,_133c,_133d,_133e,lang,mouse,on,has,_133f,place,_1340,_1341,_1342,_1343,dijit){
var _1344=_133b("dijit._MasterTooltip",[_1340,_1341],{duration:_133f.defaultDuration,templateString:_1343,postCreate:function(){
this.ownerDocumentBody.appendChild(this.domNode);
this.bgIframe=new _1342(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_1345,_1346,_1347,rtl,_1348){
if(this.aroundNode&&this.aroundNode===_1346&&this.containerNode.innerHTML==_1345){
return;
}
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_1345;
if(_1348){
this.set("textDir",_1348);
}
this.containerNode.align=rtl?"right":"left";
var pos=place.around(this.domNode,_1346,_1347&&_1347.length?_1347:_1349.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _134a=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_134a.y+((_134a.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_134a.x+((_134a.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}else{
this.connectorNode.style.left="";
this.connectorNode.style.top="";
}
}
_133e.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_1346;
},orient:function(node,_134b,_134c,_134d,_134e){
this.connectorNode.style.top="";
var _134f=_134d.h,_1350=_134d.w;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_134b+"-"+_134c];
this.domNode.style.width="auto";
var size=_133d.position(this.domNode);
if(has("ie")==9){
size.w+=2;
}
var width=Math.min((Math.max(_1350,1)),size.w);
_133d.setMarginBox(this.domNode,{w:width});
if(_134c.charAt(0)=="B"&&_134b.charAt(0)=="B"){
var bb=_133d.position(node);
var _1351=this.connectorNode.offsetHeight;
if(bb.h>_134f){
var _1352=_134f-((_134e.h+_1351)>>1);
this.connectorNode.style.top=_1352+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_134e.h/2-_1351/2,0),bb.h-_1351)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_1350);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_1353){
if(this._onDeck&&this._onDeck[1]==_1353){
this._onDeck=null;
}else{
if(this.aroundNode===_1353){
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
},_setTextDirAttr:function(_1354){
this._set("textDir",_1354);
if(_1354=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
dijit.showTooltip=function(_1355,_1356,_1357,rtl,_1358){
if(_1357){
_1357=array.map(_1357,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_1349._masterTT){
dijit._masterTT=_1349._masterTT=new _1344();
}
return _1349._masterTT.show(_1355,_1356,_1357,rtl,_1358);
};
dijit.hideTooltip=function(_1359){
return _1349._masterTT&&_1349._masterTT.hide(_1359);
};
var _1349=_133b("dijit.Tooltip",_1340,{label:"",showDelay:400,connectId:[],position:[],selector:"",_setConnectIdAttr:function(newId){
array.forEach(this._connections||[],function(_135a){
array.forEach(_135a,function(_135b){
_135b.remove();
});
},this);
this._connectIds=array.filter(lang.isArrayLike(newId)?newId:(newId?[newId]:[]),function(id){
return dom.byId(id,this.ownerDocument);
},this);
this._connections=array.map(this._connectIds,function(id){
var node=dom.byId(id,this.ownerDocument),_135c=this.selector,_135d=_135c?function(_135e){
return on.selector(_135c,_135e);
}:function(_135f){
return _135f;
},self=this;
return [on(node,_135d(mouse.enter),function(){
self._onHover(this);
}),on(node,_135d("focusin"),function(){
self._onHover(this);
}),on(node,_135d(mouse.leave),lang.hitch(self,"_onUnHover")),on(node,_135d("focusout"),lang.hitch(self,"_onUnHover"))];
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
_133c.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
array.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},getContent:function(node){
return this.label||this.domNode.innerHTML;
},_onHover:function(_1360){
if(!this._showTimer){
this._showTimer=this.defer(function(){
this.open(_1360);
},this.showDelay);
}
},_onUnHover:function(){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
this.close();
},open:function(_1361){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
var _1362=this.getContent(_1361);
if(!_1362){
return;
}
_1349.show(_1362,_1361,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_1361;
this.onShow(_1361,this.position);
},close:function(){
if(this._connectNode){
_1349.hide(this._connectNode);
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
array.forEach(this._connections||[],function(_1363){
array.forEach(_1363,function(_1364){
_1364.remove();
});
},this);
this.inherited(arguments);
}});
_1349._MasterTooltip=_1344;
_1349.show=dijit.showTooltip;
_1349.hide=dijit.hideTooltip;
_1349.defaultPosition=["after-centered","before-centered"];
return _1349;
});
},"dijit/PopupMenuItem":function(){
define(["dojo/_base/declare","dojo/dom-style","dojo/query","./registry","./MenuItem","./hccss"],function(_1365,_1366,query,_1367,_1368){
return _1365("dijit.PopupMenuItem",_1368,{_fillContent:function(){
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
this.popup=_1367.byNode(node);
}
this.ownerDocumentBody.appendChild(this.popup.domNode);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
_1366.set(this.arrowWrapper,"visibility","");
}
this.focusNode.setAttribute("aria-haspopup","true");
},destroyDescendants:function(_1369){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive(_1369);
}
delete this.popup;
}
this.inherited(arguments);
}});
});
},"davinci/Theme":function(){
define(["dojo/_base/declare","dojo/promise/all","./Workbench","./library","./workbench/Preferences","./model/Path","./html/HTMLFile","./model/Factory","system/resource"],function(_136a,all,_136b,_136c,_136d,Path,_136e,_136f,_1370){
var Theme={TEMP_CLONE_PRE:"clone_",desktop_default:"desktop_default",mobile_default:"custom_default",default_theme:"(device-specific)",none_themeset_name:"(none)",other_device:"other",none_theme:"none",dojoMobileDefault:[{"theme":"android","device":"Android"},{"theme":"blackberry","device":"BlackBerry"},{"theme":"ipad","device":"iPad"},{"theme":"iphone","device":"iPhone"},{"theme":"iphone","device":"other"}],dojoMobileCustom:[{"theme":"custom","device":"Android"},{"theme":"custom","device":"BlackBerry"},{"theme":"custom","device":"iPad"},{"theme":"custom","device":"iPhone"},{"theme":"custom","device":"other"}],isThemeHTML:function(_1371){
return _1371.getName().indexOf("dojo-theme-editor.html")>-1;
},CloneTheme:function(name,_1372,_1373,_1374,_1375,_1376){
var _1377=[];
var _1378=_1375.file.parent;
var _1379=new Path(_1374).removeLastSegments(0);
var _137a=_1370.findResource(_1379.toString());
if(_137a.readOnly()){
_137a.createResource();
}
_1370.createResource(_1374,true);
var _137b=_1370.findResource(_1374);
var _137c=_1375.file.getName();
var _137d=new Path(_137b.getPath());
var _137e=_137d.lastSegment();
var _137f=_137b.createResource(_137e+".theme");
var _1380=_137b.createResource(_137e+".css");
var _1381=this.getThemeLocation();
var _1382=_1375.file.parent.getPath();
function _1383(_1384){
var ret=[];
_1384.forEach(function(_1385){
var file=_1370.findResource(_1382+"/"+_1385);
var _1386=new Path(file.getPath());
var _1387=_1386.relativeTo("./"+_1381,true);
var _1388="..";
for(var i=0;i<_1387.segments.length;i++){
_1388=_1388+"/"+_1387.segments[i];
}
ret.push(_1388);
});
return ret;
};
var _1389=_1383(_1375.themeEditorHtmls);
var meta=_1383(_1375.meta);
var _138a=_1383(_1375.files);
var _138b=" ";
_138a.forEach(function(_138c){
_138b=_138b+"@import url(\""+_138c+"\");";
});
var _138d={className:_1375.className,name:name,version:_1372||_1375.version,specVersion:_1375.specVersion,files:[""+_137e+".css"],meta:meta,themeEditorHtmls:_1389,useBodyFontBackgroundClass:_1375.useBodyFontBackgroundClass};
if(_1375.helper){
if(_1375.helper.declaredClass){
_138d.helper=_1375.helper.declaredClass;
}else{
_138d.helper=_1375.helper;
}
}
if(_1375.base){
_138d.base=_1375.base;
}
if(_1375.type){
_138d.type=_1375.type;
}
if(_1375.conditionalFiles){
_138d.conditionalFiles=_1375.conditionalFiles;
var _138e=_1383(_1375.conditionalFiles);
for(var i=0;i<_138d.conditionalFiles.length;i++){
var _138f=_137b.createResource(_138d.conditionalFiles[i]);
_1377.push(_138f.setContents("@import url(\""+_138e[i]+"\");"));
}
}
var d=_137f.setContents(JSON.stringify(_138d));
d.themeFile=_137f;
_1377.push(d);
_1377.push(_1380.setContents(_138b));
var ret={promise:all(_1377),themeFile:_137f};
return ret;
},getHelper:function(theme){
if(!theme){
return;
}
if(theme.helper&&typeof (theme.helper)!="string"){
return theme.helper;
}
var _1390=theme.helper;
if(_1390){
var _1391=new dojo.Deferred();
require([_1390],function(_1392){
_1392.declaredClass=_1390;
_1390=_1392;
_1391.resolve({helper:_1390});
});
return _1391;
}
},getThemeSet:function(_1393){
var _1394=_136d.getPreferences("maqetta.dojo.themesets",_136b.getProject()),_1395=dojo.clone(this.dojoMobileDefault),_1396;
if(!_1394){
_1394=this.dojoThemeSets;
}
_1394=dojo.clone(_1394);
if(_1393){
var _1397=_1393._getDojoJsElem().getAttribute("data-dojo-config");
if(_1397){
_1397=require.eval("({ "+_1397+" })","data-dojo-config");
if(_1397.themeMap){
_1395=Theme.getDojoxMobileThemesFromThemeMap(_1393,_1397.themeMap);
}
}
var _1398=_1393.getTheme();
for(var s=0,len=_1394.themeSets.length;s<len;s++){
_1396=_1394.themeSets[s];
if(_1396.desktopTheme===_1398.name){
if(this.themeSetEquals(_1395,_1396.mobileTheme)){
return _1396;
}
}
}
}
_1396={name:this.none_themeset_name,desktopTheme:_1393?_1398.name:"claro",mobileTheme:_1395};
_1394.themeSets.push(_1396);
return _1396;
},getBase:function(){
if(_136b.singleProjectMode()){
return _136b.getProject();
}
},getThemeLocation:function(){
var base=this.getBase();
var prefs=_136d.getPreferences("davinci.ui.ProjectPrefs",base);
var _1399=(new Path(base).append(prefs["themeFolder"]));
return _1399;
},getTheme:function(name,_139a){
var _139b=_136c.getThemes(_136b.getProject(),this.workspaceOnly,_139a);
for(var i=0;i<_139b.length;i++){
if(_139b[i]&&_139b[i].name===name){
return _139b[i];
}
}
},getThemeByCssFile:function(_139c){
var _139d=_136c.getThemes(_136b.getProject(),this.workspaceOnly);
var _139e=_139c.getResource().getPath();
for(var i=0;i<_139d.length;i++){
var _139f=_139d[i].file;
var path=_139f.getParentFolder().getPath();
for(var x=0;x<_139d[i].files.length;x++){
var _13a0=path+"/"+_139d[i].files[x];
if(_13a0===_139e){
return _139d[i];
}
}
}
return null;
},getDojoxMobileThemeMap:function(_13a1,_13a2){
var _13a3=[];
var other=[".*","iphone",[]];
for(var i=0;i<_13a2.length;i++){
if(_13a2[i].theme!=this.none_theme&&_13a2[i].theme!=this.default_theme){
var theme=this.getTheme(_13a2[i].theme);
if(theme){
var _13a4=new Path(theme.file.parent.getPath()).append(theme.files[0]);
var _13a5=_13a1.getFullResourcePath();
var _13a6=_13a4.relativeTo(_13a5,true).toString();
if(_13a2[i].device===this.other_device){
other=[".*",theme.base,[_13a6]];
}else{
_13a3.push([_13a2[i].device,theme.base,[_13a6]]);
}
}
}
}
_13a3.push(other);
return _13a3;
},getDojoxMobileThemesFromThemeMap:function(_13a7,_13a8){
var _13a9=_136c.getThemes(_136b.getProject(),this.workspaceOnly,true);
var _13aa=[];
_13a8.forEach(function(item,idx,arr){
for(var i=0;i<_13a9.length;i++){
var theme=_13a9[i];
var _13ab=new Path(theme.file.parent.getPath()).append(theme.files[0]);
var _13ac=_13a7.getFullResourcePath();
var _13ad=_13ab.relativeTo(_13ac,true).toString();
if(_13ad==item[2][0]){
var o={};
o.device=item[0];
o.theme=theme.name;
if(o.device===".*"){
o.device="other";
}
_13aa.push(o);
break;
}
}
},this);
return _13aa;
},themeSetEquals:function(o1,o2){
function _13ae(obj){
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
if(_13ae(o1)!==_13ae(o2)){
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
},singleMobileTheme:function(_13af){
var _13b0=_13af.mobileTheme[0].theme;
for(var i=1;i<_13af.mobileTheme.length;i++){
if(_13af.mobileTheme[i].theme!=_13b0){
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
define(["dojo/_base/declare","dojo/_base/xhr","../Runtime","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","davinci/ui/Dialog","dijit/Tree","dijit/tree/ForestStoreModel","dojo/data/ItemFileReadStore","dojo/i18n!./nls/workbench","dojo/i18n!dijit/nls/common","dojo/text!./templates/Preferences.html","dijit/form/Button"],function(_13b1,xhr,_13b2,_13b3,_13b4,_13b5,_13b6,Tree,_13b7,_13b8,_13b9,_13ba,_13bb){
var _13bc=_13b1([_13b3,_13b4,_13b5],{templateString:_13bb,commonStrings:_13ba,resize:function(){
this.borderContainer.resize();
}});
var _13bd={_allPrefs:{},savePreferences:function(id,base,_13be){
xhr.put({url:"cmd/setPreferences?id="+id+"&base="+encodeURIComponent(base),putData:dojo.toJson(_13be),handleAs:"json",contentType:"text/html"}).then(function(){
if(!_13bd._allPrefs[base]){
_13bd._allPrefs[base]={};
}
_13bd._allPrefs[base][id]=_13be;
dojo.publish("/davinci/preferencesChanged",[{id:id,preferences:_13be}]);
});
},_loadExtensions:function(){
if(!_13bd._extensions){
_13bd._extensions=_13b2.getExtensions("davinci.preferences");
}
},showPreferencePage:function(){
_13bd._loadExtensions();
var _13bf=_13bd.getPrefJson();
if(!_13bf||_13bf.length<1){
alert(_13b9.noUserPref);
return;
}
this.dialog=_13b6.showModal(new _13bc({}),_13b9.preferences,{width:700,height:500});
var _13c0=new _13b8({data:_13bf,jsId:"prefTreeDataStore"});
var _13c1=new _13b7({jsId:"fileModel",labelAttr:"name",store:_13c0});
var _13c2=dijit.byId("prefTree");
if(!_13c2){
_13c2=new Tree({model:_13c1,id:"prefTree",persist:false,query:"{type:'directory'}",label:"Preferences",labelAttr:"name",showRoot:false,childrenAttrs:"children"});
}
_13c2.onClick=function(node){
_13bd.setPaneContent(node);
};
dojo.byId("pref.TreePane").appendChild(_13c2.domNode);
_13c2.startup();
},getPrefJson:function(){
var ejson=_13bd._extensions;
if(ejson==null){
return [];
}
var _13c3=[];
for(var i=0;i<ejson.length;i++){
ejson[i]._index=i;
if(ejson[i].category){
if(!_13c3[ejson[i].category]){
_13c3[ejson[i].category]=[];
}
_13c3[ejson[i].category].push(ejson[i]);
}else{
if(!_13c3.root){
_13c3.root=[];
}
_13c3.root.push(ejson[i]);
}
}
var _13c4=_13c3.root.map(function(node){
return {id:node.id,name:node.name,index:node._index,children:_13bd._getPrefJsonChildren(node.id,_13c3)};
});
return {items:_13c4};
},_getPrefJsonChildren:function(catId,_13c5){
var _13c6=_13c5[catId];
if(!_13c6){
return [];
}
var _13c7=[];
for(var p=0;p<_13c6.length;p++){
_13c7[p]={id:_13c6[p].id,name:_13c6[p].name,index:_13c6[p]._index};
if(_13c5[_13c6[p].id]){
_13c7[p].children=_13bd._getPrefJsonChildren(_13c6[p].id,_13c5);
}
}
return _13c7;
},setPaneContent:function(node){
var _13c8;
delete _13bd._currentPane;
var _13c9=_13bd._extensions[node.index[0]];
var prefs=_13bd.getPreferences(_13c9.id,davinci.Workbench.getProject());
if(_13c9.pane){
require([_13c9.pane],function(cls){
var pane=new cls();
_13bd._currentPane=pane;
_13bd._currentPane._extension=_13c9;
_13bd._currentPane.setPreferences(prefs);
dijit.byId("pref.RightPane").setContent(pane.domNode);
});
}else{
if(_13c9.pageContent){
_13c8=document.createTextNode(_13c9.pageContent);
}else{
_13c8=document.createTextNode("");
}
}
if(_13c8){
dijit.byId("pref.RightPane").setContent(_13c8);
}
},_save:function(_13ca){
if(_13bd._currentPane){
var prefs=_13bd._currentPane.getPreferences();
var id=_13bd._currentPane._extension.id;
var base=davinci.Workbench.getProject();
_13bd.savePreferences(id,base,prefs);
if(_13bd._currentPane.save){
_13bd._currentPane.save(prefs);
}
}
for(var i=0;i<_13ca.length;i++){
try{
if(_13ca[i].save){
_13ca[i].save();
}
}
catch(ex){
}
if(_13ca[i].children&&_13ca[i].children.length>0){
_13bd._save(_13ca[i].children);
}
}
},save:function(){
_13bd._save(_13bd._extensions);
_13bd.finish();
},finish:function(){
_13bd._extensions=null;
_13bd._currentPane=null;
this.dialog.destroyRecursive(false);
this.dialog=null;
},getPreferences:function(id,base){
if(!_13bd._allPrefs[base]){
_13bd._allPrefs[base]={};
}
if(!_13bd._allPrefs[base][id]){
var prefs=_13b2.serverJSONRequest({url:"cmd/getPreferences",handleAs:"json",content:{id:id,base:base},sync:true});
if(!prefs){
prefs=_13bd.getDefaultPreferences(id);
}
_13bd._allPrefs[base][id]=prefs;
}
return _13bd._allPrefs[base][id];
},getDefaultPreferences:function(id){
_13bd._loadExtensions();
for(var i=0;i<_13bd._extensions.length;i++){
if(_13bd._extensions[i].id==id){
if(dojo.isString(_13bd._extensions[i].defaultValues)){
var prefs=_13b2.serverJSONRequest({url:_13bd._extensions[i].defaultValues,handleAs:"json",sync:true});
return prefs.defaultValues;
}
return _13bd._extensions[i].defaultValues;
}
}
}};
return dojo.setObject("davinci.workbench.Preferences",_13bd);
});
},"dijit/layout/ContentPane":function(){
define(["dojo/_base/kernel","dojo/_base/lang","../_Widget","../_Container","./_ContentPaneResizeMixin","dojo/string","dojo/html","dojo/i18n!../nls/loading","dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/_base/xhr","dojo/i18n","dojo/when"],function(_13cb,lang,_13cc,_13cd,_13ce,_13cf,html,_13d0,array,_13d1,_13d2,dom,_13d3,xhr,i18n,when){
return _13d1("dijit.layout.ContentPane",[_13cc,_13cd,_13ce],{href:"",content:"",extractContent:false,parseOnLoad:true,parserScope:_13cb._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,_setTitleAttr:null,stopParser:true,template:false,create:function(_13d4,_13d5){
if((!_13d4||!_13d4.template)&&_13d5&&!("href" in _13d4)&&!("content" in _13d4)){
_13d5=dom.byId(_13d5);
var df=_13d5.ownerDocument.createDocumentFragment();
while(_13d5.firstChild){
df.appendChild(_13d5.firstChild);
}
_13d4=lang.delegate(_13d4,{content:df});
}
this.inherited(arguments,[_13d4,_13d5]);
},postMixInProperties:function(){
this.inherited(arguments);
var _13d6=i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_13cf.substitute(this.loadingMessage,_13d6);
this.errorMessage=_13cf.substitute(this.errorMessage,_13d6);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.title="";
if(!_13d3.get(this.domNode,"role")){
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
_13cb.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new _13d2(lang.hitch(this,"cancel"));
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
_13cb.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new _13d2(lang.hitch(this,"cancel"));
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
},destroyRecursive:function(_13d7){
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
this.onLoadDeferred=new _13d2(lang.hitch(this,"cancel"));
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
this._setContent(this.onDownloadStart(),true);
var self=this;
var _13d8={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(lang.isObject(this.ioArgs)){
lang.mixin(_13d8,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||xhr.get)(_13d8)),_13d9;
hand.then(function(html){
_13d9=html;
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
return _13d9;
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
},destroyDescendants:function(_13da){
if(this.isLoaded){
this._onUnloadHandler();
}
var _13db=this._contentSetter;
array.forEach(this.getChildren(),function(_13dc){
if(_13dc.destroyRecursive){
_13dc.destroyRecursive(_13da);
}else{
if(_13dc.destroy){
_13dc.destroy(_13da);
}
}
_13dc._destroyed=true;
});
if(_13db){
array.forEach(_13db.parseResults,function(_13dd){
if(!_13dd._destroyed){
if(_13dd.destroyRecursive){
_13dd.destroyRecursive(_13da);
}else{
if(_13dd.destroy){
_13dd.destroy(_13da);
}
}
_13dd._destroyed=true;
}
});
delete _13db.parseResults;
}
if(!_13da){
html._emptyNode(this.containerNode);
}
delete this._singleChild;
},_setContent:function(cont,_13de){
this.destroyDescendants();
var _13df=this._contentSetter;
if(!(_13df&&_13df instanceof html._ContentSetter)){
_13df=this._contentSetter=new html._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _13e0=this.onContentError(e);
try{
this.containerNode.innerHTML=_13e0;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _13e1=lang.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:!cont.domNode&&this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang,textDir:this.textDir},this._contentSetterParams||{});
var p=_13df.set((lang.isObject(cont)&&cont.domNode)?cont.domNode:cont,_13e1);
var self=this;
return when(p&&p.then?p:_13df.parseDeferred,function(){
delete self._contentSetterParams;
if(!_13de){
if(self._started){
self._startChildren();
self._scheduleLayout();
}
self._onLoadHandler(cont);
}
});
},_onError:function(type,err,_13e2){
this.onLoadDeferred.reject(err);
var _13e3=this["on"+type+"Error"].call(this,err);
if(_13e2){
console.error(_13e2,err);
}else{
if(_13e3){
this._setContent(_13e3,true);
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
define(["dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array"],function(_13e4,_13e5,lang,array){
return _13e4("dojox.grid._SelectionPreserver",null,{constructor:function(_13e6){
this.selection=_13e6;
var grid=this.grid=_13e6.grid;
this.reset();
this._connects=[_13e5.connect(grid,"_setStore",this,"reset"),_13e5.connect(grid,"_addItem",this,"_reSelectById"),_13e5.connect(_13e6,"onSelected",lang.hitch(this,"_selectById",true)),_13e5.connect(_13e6,"onDeselected",lang.hitch(this,"_selectById",false)),_13e5.connect(_13e6,"deselectAll",this,"reset")];
},destroy:function(){
this.reset();
array.forEach(this._connects,_13e5.disconnect);
delete this._connects;
},reset:function(){
this._selectedById={};
},_reSelectById:function(item,index){
if(item&&this.grid._hasIdentity){
this.selection.selected[index]=this._selectedById[this.grid.store.getIdentity(item)];
}
},_selectById:function(_13e7,_13e8){
if(this.selection.mode=="none"||!this.grid._hasIdentity){
return;
}
var item=_13e8,g=this.grid;
if(typeof _13e8=="number"||typeof _13e8=="string"){
var entry=g._by_idx[_13e8];
item=entry&&entry.item;
}
if(item){
this._selectedById[g.store.getIdentity(item)]=!!_13e7;
}
return item;
}});
});
},"davinci/review/actions/OpenVersionAction":function(){
define(["dojo/_base/declare","./_ReviewNavigatorCommon","davinci/Runtime","dojox/widget/Toaster","dojo/i18n!./nls/actions"],function(_13e9,_13ea,_13eb,_13ec,nls){
var _13ed=_13e9("davinci.review.actions.OpenVersionAction",[_13ea],{run:function(_13ee){
var _13ef=this._getSelection(_13ee);
if(!_13ef||!_13ef.length){
return;
}
var item=_13ef[0].resource.elementType=="ReviewFile"?_13ef[0].resource.parent:_13ef[0].resource;
dojo.xhrGet({url:"cmd/managerVersion",sync:false,handleAs:"text",content:{"type":"open","vTime":item.timeStamp}}).then(function(_13f0){
if(_13f0=="OK"){
if(typeof hasToaster=="undefined"){
new _13ec({position:"br-left",duration:4000,messageTopic:"/davinci/review/resourceChanged"});
hasToaster=true;
}
dojo.publish("/davinci/review/resourceChanged",[{message:nls.openSuccessful,type:"message"},"open",item]);
}
});
},isEnabled:function(_13f1){
var _13f2=this._getSelection(_13f1);
if(!_13f2||_13f2.length==0){
return false;
}
var item=_13f2[0].resource.elementType=="ReviewFile"?_13f2[0].resource.parent:_13f2[0].resource;
if(item.designerId==davinci.Runtime.userName){
if(item.closed&&item.closedManual&&!item.isDraft){
return true;
}
}
return false;
}});
return _13ed;
});
},"davinci/ve/utils/URLRewrite":function(){
define([],function(){
var _13f3=/^\s*url\s*\(\s*(\'[^\'\"]*\'|\"[^\'\"]*\"|[^\'\"]*)\s*\)\s*$/;
var _13f4=/^[\'\"]?([^\'\"]*)[\'\"]?$/;
var _13f5=/^(http|ftp)/;
return {isAbsolute:function(url){
if(typeof url!="string"){
return false;
}
var _13f6=this.getUrl(url);
if(_13f6){
return _13f5.test(_13f6);
}else{
return false;
}
},containsUrl:function(url){
if(typeof url!="string"){
return false;
}
return _13f3.test(url);
},replaceUrl:function(_13f7,_13f8){
if(typeof _13f7!="string"||typeof _13f8!="string"){
return null;
}
var _13f9=this.getUrl(_13f7);
if(_13f9){
return "url('"+_13f8+"')";
}else{
return null;
}
},stripQuotes:function(s){
var _13fa=s.replace(_13f4,"$1");
return _13fa;
},encodeURI:function(url){
var pass1=encodeURI(url);
return pass1.replace(/#/g,"%23");
},getUrl:function(url){
if(typeof url!="string"){
return null;
}
var _13fb=url.match(_13f3);
if(_13fb&&_13fb.length>1){
var match=_13fb[1];
return this.stripQuotes(match);
}else{
return null;
}
}};
});
},"dijit/_WidgetsInTemplateMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/parser"],function(array,_13fc,_13fd){
return _13fc("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
var cw=(this._startupWidgets=_13fd.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,scope:"dojo"}));
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
},"davinci/ve/commands/ModifyCommand":function(){
define(["dojo/_base/declare","../widget","../utils/ImageUtils","../States"],function(_13fe,_13ff,_1400,_1401){
return _13fe("davinci.ve.commands.ModifyCommand",null,{name:"modify",constructor:function(_1402,_1403,_1404,_1405,_1406){
this._oldId=(_1402?_1402.id:undefined);
this._properties=_1403=(_1403||{});
this._children=(_1404||typeof _1404=="string")?_1404:_1403._children;
this._context=_1405||_1402.getContext();
this._scripts=_1406;
delete this._properties._children;
},setContext:function(_1407){
this._context=_1407;
},add:function(_1408){
if(!_1408||_1408._oldId!=this._oldId){
return;
}
if(_1408._properties){
dojo.mixin(this._properties,_1408._properties);
}
if(_1408._children){
this._children=_1408._children;
}
},execute:function(){
if(!this._oldId||!this._properties){
return;
}
var _1409=_13ff.byId(this._oldId),_140a=this._context;
if(!_1409){
return;
}
this._oldData=_1409.getData();
this._oldData.context=_140a;
this._newData={type:this._oldData.type,properties:dojo.mixin({},this._oldData.properties,this._properties),children:(this._children||typeof this._children=="string")?this._children:this._oldData.children,scripts:dojo.mixin({},this._oldData.scripts,this._scripts),states:this._oldData.states,context:_140a};
if(this._doRefreshFromSource(_1409)){
_1409.setProperties(this._newData.properties,true);
setTimeout(function(){
_140a.visualEditor.refresh();
},0);
return;
}
if(_140a){
_140a.detach(_1409);
}
if(!this._oldData.properties.isTempID||this._properties.id){
delete this._newData.properties.isTempID;
}
var _140b=_1409.getParent();
var _140c=null;
var index=_140b.indexOf(_1409);
_140b.removeChild(_1409);
_1409.destroyWidget();
_140c=_13ff.createWidget(this._newData);
if(!_140c){
return;
}
if(_140c.domNode.tagName==="IMG"){
_1400.ImageUpdateFocus(_140c,_140a);
}
_140b.addChild(_140c,index);
this._newId=_140c.id;
if(_140a){
_140a.attach(_140c);
_140c.startup();
_140c.renderWidget();
_140a.widgetAddedOrDeleted();
if(this._oldId!=this._newId){
_140a.widgetChanged(_140a.WIDGET_ID_CHANGED,_140c,this._oldId);
}
_140a.widgetChanged(_140a.WIDGET_MODIFIED,_140c);
}
this.newWidget=_140c;
dojo.publish("/davinci/ui/widget/replaced",[_140c,_1409]);
_1401.resetState(_140c.domNode);
if(this._isRefreshParentOnPropChange(_1409)){
var _140d=new davinci.ve.commands.ModifyCommand(_140b,null,null,_140b._edit_context);
_140d.execute();
}
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[_140c]]);
},_doRefreshFromSource:function(_140e){
var props=this._properties,name,p,_140f=false;
for(name in props){
if(props.hasOwnProperty(name)){
p=_140e.metadata.property[name];
if(p&&p.refreshFromSource){
_140f=true;
break;
}
}
}
return _140f;
},_isRefreshParentOnPropChange:function(_1410){
return davinci.ve.metadata.queryDescriptor(_1410.type,"refreshParentOnPropChange");
},undo:function(){
if(!this._newId||!this._oldData){
return;
}
var _1411=_13ff.byId(this._newId);
if(!_1411){
return;
}
var _1412=_1411.getParent();
if(!_1412){
return;
}
var index=dojo.indexOf(_1412.getChildren(),_1411);
if(index<0){
return;
}
var _1413=_1412.getContext();
if(_1413){
_1413.detach(_1411);
}
_1412.removeChild(_1411);
_1411.destroyWidget();
newWidget=_13ff.createWidget(this._oldData);
if(!newWidget){
return;
}
this._oldData=newWidget.getData();
this._oldData.context=this._context;
_1412.addChild(newWidget,index);
if(_1413){
_1413.attach(newWidget);
newWidget.startup();
newWidget.renderWidget();
_1413.widgetAddedOrDeleted();
_1413.widgetChanged(_1413.WIDGET_MODIFIED,newWidget);
}
dojo.publish("/davinci/ui/widget/replaced",[newWidget,_1411]);
_1401.resetState(newWidget.domNode);
if(this._isRefreshParentOnPropChange(_1411)){
var _1414=new davinci.ve.commands.ModifyCommand(_1412,null,null,_1412._edit_context);
_1414.execute();
}
dojo.publish("/davinci/ui/widgetPropertiesChanged",[[newWidget]]);
}});
});
},"davinci/review/model/resource/root":function(){
define(["dojo/_base/declare","davinci/model/resource/Resource","davinci/review/model/resource/Folder","davinci/Runtime","dojo/Deferred"],function(_1415,_1416,_1417,_1418,_1419){
var root=_1415(_1416,{constructor:function(args){
this.elementType="ReviewRoot";
this.name="root";
this.parent=null;
},findFile:function(_141a,_141b){
var _141c=new _1419();
this.getChildren(function(_141d){
var node=null;
dojo.forEach(_141d,function(item){
if(item.timeStamp==_141a){
node=item;
}
});
var _141e=null;
if(node!=null){
node.getChildren(function(_141f){
dojo.forEach(_141f,function(item){
if(this._fileNamesEqual(item.name,_141b)){
_141e=item;
}
}.bind(this));
_141c.resolve(_141e);
}.bind(this));
}
}.bind(this));
return _141c;
},_fileNamesEqual:function(file1,file2){
if(file1.indexOf("./")!=0){
file1="./"+file1;
}
if(file2.indexOf("./")!=0){
file2="./"+file2;
}
return file1===file2;
},findVersion:function(_1420,_1421){
var _1422=new _1419();
this.getChildren(function(_1423){
var _1424=null;
dojo.some(_1423,function(item){
if(item.designerId==_1420&&item.timeStamp==_1421){
_1424=item;
return true;
}
return false;
});
_1422.resolve(_1424);
});
return _1422;
},getChildren:function(_1425,_1426){
if(!this._isLoaded){
if(this._loading){
this._loading.push(_1425);
return;
}
this._loading=[];
this._loading.push(_1425);
_1418.serverJSONRequest({url:"cmd/listVersions",load:dojo.hitch(this,function(_1427,_1428){
this.children=[];
for(var i=0;i<_1427.length;i++){
var child=new _1417(dojo.mixin({name:_1427[i].versionTitle,parent:this},_1427[i]));
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
_1425(this.children);
},getPath:function(){
return ".review/snapshot";
}});
return dojo.setObject("davinci.review.model.resource.root",new root());
});
},"dijit/_HasDropDown":function(){
define(["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_1429,_142a,event,dom,_142b,_142c,_142d,_142e,has,keys,lang,on,_142f,_1430,focus,popup,_1431){
return _1429("dijit._HasDropDown",_1431,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
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
var _1432=this.dropDown,_1433=false;
if(e&&this._opened){
var c=_142d.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_1433){
if(_142c.contains(t,"dijitPopup")){
_1433=true;
}else{
t=t.parentNode;
}
}
if(_1433){
t=e.target;
if(_1432.onItemClick){
var _1434;
while(t&&!(_1434=_1430.byNode(t))){
t=t.parentNode;
}
if(_1434&&_1434.onClick&&_1434.getParent){
_1434.getParent().onItemClick(_1434,e);
}
}
return;
}
}
}
if(this._opened){
if(_1432.focus&&_1432.autoFocus!==false){
this._focusDropDownTimer=this.defer(function(){
_1432.focus();
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
var _1435={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_142c.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_1435+"ArrowButton");
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
var d=this.dropDown,_1436=e.target;
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
if(!this._opened&&(e.keyCode==keys.DOWN_ARROW||((e.keyCode==keys.ENTER||e.keyCode==dojo.keys.SPACE)&&((_1436.tagName||"").toLowerCase()!=="input"||(_1436.type&&_1436.type.toLowerCase()!=="text"))))){
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
var _1437=focus.curNode&&this.dropDown&&dom.isDescendant(focus.curNode,this.dropDown.domNode);
this.closeDropDown(_1437);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_1438){
_1438();
},loadAndOpenDropDown:function(){
var d=new _142a(),_1439=lang.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_1439);
}else{
_1439();
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
var _143a=this.dropDown,_143b=_143a.domNode,_143c=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_143b.style.width){
this._explicitDDWidth=true;
}
if(_143b.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _143d={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_143d.width="";
}
if(!this._explicitDDHeight){
_143d.height="";
}
_142e.set(_143b,_143d);
var _143e=this.maxHeight;
if(_143e==-1){
var _143f=_142f.getBox(this.ownerDocument),_1440=_142d.position(_143c,false);
_143e=Math.floor(Math.max(_1440.y,_143f.h-(_1440.y+_1440.h)));
}
popup.moveOffScreen(_143a);
if(_143a.startup&&!_143a._started){
_143a.startup();
}
var mb=_142d.getMarginSize(_143b);
var _1441=(_143e&&mb.h>_143e);
_142e.set(_143b,{overflowX:"visible",overflowY:_1441?"auto":"visible"});
if(_1441){
mb.h=_143e;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_143c.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_143c.offsetWidth);
}else{
delete mb.w;
}
}
if(lang.isFunction(_143a.resize)){
_143a.resize(mb);
}else{
_142d.setMarginBox(_143b,mb);
}
}
var _1442=popup.open({parent:this,popup:_143a,around:_143c,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_142b.set(self._popupStateNode,"popupActive",false);
_142c.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._set("_opened",false);
}});
_142b.set(this._popupStateNode,"popupActive","true");
_142c.add(this._popupStateNode,"dijitHasDropDownOpen");
this._set("_opened",true);
this.domNode.setAttribute("aria-expanded","true");
return _1442;
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
define(["dojo/_base/declare","dijit/_WidgetBase","system/resource","dijit/form/Select","davinci/Workbench"],function(_1443,_1444,_1445,_1446,_1447){
return _1443("davinci.ui.widgets.ProjectSelection",_1444,{postCreate:function(){
_1445.listProjects(dojo.hitch(this,function(_1448){
this.value=_1447.getProject();
this._allProjects=_1448.map(function(_1449){
return _1449.name;
});
this.domNode.removeAttribute("dojoType");
var items=[];
dojo.forEach(_1448,dojo.hitch(this,function(v){
items.push({label:v.name,value:v.name});
}));
this.combo=new _1446({style:"width:100%",options:items});
this.domNode.appendChild(this.combo.domNode);
this.combo.set("value",this.value);
dojo.connect(this.combo,"onChange",this,"_onChange");
}));
},onChange:function(){
},_onChange:function(){
var _144a=dojo.attr(this.combo,"value");
if(this.value!=_144a){
this.value=_144a;
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
define(["dojo/_base/declare","dojo/dom-attr","dojo/_base/event"],function(_144b,_144c,event){
return _144b("dijit.form._CheckBoxMixin",null,{type:"checkbox",value:"on",readOnly:false,_aria_attr:"aria-checked",_setReadOnlyAttr:function(value){
this._set("readOnly",value);
_144c.set(this.focusNode,"readOnly",value);
this.focusNode.setAttribute("aria-readonly",value);
},_setLabelAttr:undefined,_getSubmitValue:function(value){
return !value&&value!==0?"on":value;
},_setValueAttr:function(_144d){
_144d=this._getSubmitValue(_144d);
this._set("value",_144d);
_144c.set(this.focusNode,"value",_144d);
},reset:function(){
this.inherited(arguments);
this._set("value",this.params.value||"on");
_144c.set(this.focusNode,"value",this.value);
},_onClick:function(e){
if(this.readOnly){
event.stop(e);
return false;
}
return this.inherited(arguments);
}});
});
},"dojo/html":function(){
define(["./_base/kernel","./_base/lang","./_base/array","./_base/declare","./dom","./dom-construct","./parser"],function(_144e,lang,_144f,_1450,dom,_1451,_1452){
var html={};
lang.setObject("dojo.html",html);
var _1453=0;
html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
html._emptyNode=_1451.empty;
html._setNodeContent=function(node,cont){
_1451.empty(node);
if(cont){
if(typeof cont=="string"){
cont=_1451.toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&lang.isArrayLike(cont)){
for(var _1454=cont.length,i=0;i<cont.length;i=_1454==cont.length?i+1:0){
_1451.place(cont[i],node,"last");
}
}else{
_1451.place(cont,node,"last");
}
}
return node;
};
html._ContentSetter=_1450("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:_144e._scopeName,startup:true,constructor:function(_1455,node){
lang.mixin(this,_1455||{});
node=this.node=dom.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_1453++].join("_");
}
},set:function(cont,_1456){
if(undefined!==cont){
this.content=cont;
}
if(_1456){
this._mixin(_1456);
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
var _1457=this.onContentError(e);
try{
node.innerHTML=_1457;
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
_144f.forEach(this.parseResults,function(w){
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
},_mixin:function(_1458){
var empty={},key;
for(key in _1458){
if(key in empty){
continue;
}
this[key]=_1458[key];
}
},_parse:function(){
var _1459=this.node;
try{
var _145a={};
_144f.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_145a[name]=this[name];
}
},this);
var self=this;
this.parseDeferred=_1452.parse({rootNode:_1459,noStart:!this.startup,inherited:_145a,scope:this.parserScope}).then(function(_145b){
return self.parseResults=_145b;
});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_145c){
var _145d=this["on"+type+"Error"].call(this,err);
if(_145c){
console.error(_145c,err);
}else{
if(_145d){
html._setNodeContent(this.node,_145d,true);
}
}
}});
html.set=function(node,cont,_145e){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_145e){
return html._setNodeContent(node,cont,true);
}else{
var op=new html._ContentSetter(lang.mixin(_145e,{content:cont,node:node}));
return op.set();
}
};
return html;
});
},"url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\"  role=\"menubar\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress: _onKeyPress\"></div>\n","davinci/ve/themeEditor/metadata/query":function(){
define(["dojo/_base/declare","davinci/ve/utils/URLRewrite"],function(_145f,_1460){
return _145f("davinci.ve.themeEditor.metadata.query",null,{constructor:function(files,_1461){
this.files=files;
this.cache={};
this.lastLoaded=-1;
this.modules=_1461;
this.modulePrefix=null;
this.modulePrefix=".";
if(_1461){
for(var i=0;i<_1461.length;i++){
this.modulePrefix+="/"+_1461[i];
}
}
},getType:function(_1462){
var type=null;
if(_1462.declaredClass){
type=_1462.type;
}else{
type=_1462;
if(type.substring(0,5)=="html."){
tagName=type.substring(5);
}
}
return type;
},_loadNextFile:function(){
var _1463=this.files[++this.lastLoaded];
var _1464=null;
if(_1463.getURL){
_1464=_1460.encodeURI(_1463.getURL());
}else{
_1464=this.modulePrefix+_1463;
}
var md=null;
dojo.xhrGet({url:_1464,handleAs:"json",sync:true,load:function(_1465){
md=_1465;
}});
return md;
},_fullyLoaded:function(){
return this.files.length<=(this.lastLoaded+1);
},_cacheNext:function(){
var _1466=this._loadNextFile();
dojo.mixin(this.cache,_1466);
},getMetaData:function(type){
var path=type.split(".");
var front=path.length>=0?path[0]:path;
var back=path.length>=0?path[path.length-1]:path;
var _1467=this.cache[front];
if(_1467&&_1467[back]){
return _1467[back];
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
define(["../_base/lang","../sniff","../_base/window","../dom-geometry","../dom-style","../window"],function(lang,has,win,_1468,_1469,_146a){
var _146b={};
lang.setObject("dojo.dnd.autoscroll",_146b);
_146b.getViewport=_146a.getBox;
_146b.V_TRIGGER_AUTOSCROLL=32;
_146b.H_TRIGGER_AUTOSCROLL=32;
_146b.V_AUTOSCROLL_VALUE=16;
_146b.H_AUTOSCROLL_VALUE=16;
var _146c,doc=win.doc,_146d=Infinity,_146e=Infinity;
_146b.autoScrollStart=function(d){
doc=d;
_146c=_146a.getBox(doc);
var html=win.body(doc).parentNode;
_146d=Math.max(html.scrollHeight-_146c.h,0);
_146e=Math.max(html.scrollWidth-_146c.w,0);
};
_146b.autoScroll=function(e){
var v=_146c||_146a.getBox(doc),html=win.body(doc).parentNode,dx=0,dy=0;
if(e.clientX<_146b.H_TRIGGER_AUTOSCROLL){
dx=-_146b.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-_146b.H_TRIGGER_AUTOSCROLL){
dx=Math.min(_146b.H_AUTOSCROLL_VALUE,_146e-html.scrollLeft);
}
}
if(e.clientY<_146b.V_TRIGGER_AUTOSCROLL){
dy=-_146b.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-_146b.V_TRIGGER_AUTOSCROLL){
dy=Math.min(_146b.V_AUTOSCROLL_VALUE,_146d-html.scrollTop);
}
}
window.scrollBy(dx,dy);
};
_146b._validNodes={"div":1,"p":1,"td":1};
_146b._validOverflow={"auto":1,"scroll":1};
_146b.autoScrollNodes=function(e){
var b,t,w,h,rx,ry,dx=0,dy=0,_146f,_1470;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in _146b._validNodes)){
var s=_1469.getComputedStyle(n),_1471=(s.overflow.toLowerCase() in _146b._validOverflow),_1472=(s.overflowX.toLowerCase() in _146b._validOverflow),_1473=(s.overflowY.toLowerCase() in _146b._validOverflow);
if(_1471||_1472||_1473){
b=_1468.getContentBox(n,s);
t=_1468.position(n,true);
}
if(_1471||_1472){
w=Math.min(_146b.H_TRIGGER_AUTOSCROLL,b.w/2);
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
_146f=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_1471||_1473){
h=Math.min(_146b.V_TRIGGER_AUTOSCROLL,b.h/2);
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
_1470=n.scrollTop;
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
_146b.autoScroll(e);
};
return _146b;
});
},"url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitemcheckbox\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t\t<span class=\"dijitCheckedMenuItemIconChar\">&#10003;</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n","dojox/grid/cells":function(){
define(["../main","./cells/_base"],function(dojox){
return dojox.grid.cells;
});
},"dijit/layout/utils":function(){
define(["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","../main"],function(array,_1474,_1475,_1476,lang,dijit){
var _1477=lang.getObject("layout",true,dijit);
_1477.marginBox2contentBox=function(node,mb){
var cs=_1476.getComputedStyle(node);
var me=_1475.getMarginExtents(node,cs);
var pb=_1475.getPadBorderExtents(node,cs);
return {l:_1476.toPixelValue(node,cs.paddingLeft),t:_1476.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
function _1478(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_1479,dim){
var _147a=_1479.resize?_1479.resize(dim):_1475.setMarginBox(_1479.domNode,dim);
if(_147a){
lang.mixin(_1479,_147a);
}else{
lang.mixin(_1479,_1475.getMarginBox(_1479.domNode));
lang.mixin(_1479,dim);
}
};
_1477.layoutChildren=function(_147b,dim,_147c,_147d,_147e){
dim=lang.mixin({},dim);
_1474.add(_147b,"dijitLayoutContainer");
_147c=array.filter(_147c,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(array.filter(_147c,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
array.forEach(_147c,function(child){
var elm=child.domNode,pos=(child.region||child.layoutAlign);
if(!pos){
throw new Error("No region setting for "+child.id);
}
var _147f=elm.style;
_147f.left=dim.l+"px";
_147f.top=dim.t+"px";
_147f.position="absolute";
_1474.add(elm,"dijitAlign"+_1478(pos));
var _1480={};
if(_147d&&_147d==child.id){
_1480[child.region=="top"||child.region=="bottom"?"h":"w"]=_147e;
}
if(pos=="top"||pos=="bottom"){
_1480.w=dim.w;
size(child,_1480);
dim.h-=child.h;
if(pos=="top"){
dim.t+=child.h;
}else{
_147f.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_1480.h=dim.h;
size(child,_1480);
dim.w-=child.w;
if(pos=="left"){
dim.l+=child.w;
}else{
_147f.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(child,dim);
}
}
}
});
};
return {marginBox2contentBox:_1477.marginBox2contentBox,layoutChildren:_1477.layoutChildren};
});
},"url:davinci/review/widgets/templates/MailFailureDialogContent.html":"<div>\r\n<div class='mailFailureInfo'>${inviteNotSent}</div>\r\n<div class='mailFailureExtraInfo'>${mailFailureMsg}</div>\r\n<div class='mailFailureContent'>${htmlContent}</div>\r\n</div>\r\n","url:dojox/grid/resources/_Grid.html":"<div hidefocus=\"hidefocus\" role=\"grid\" dojoAttachEvent=\"onmouseout:_mouseOut\">\n\t<div class=\"dojoxGridMasterHeader\" dojoAttachPoint=\"viewsHeaderNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterView\" dojoAttachPoint=\"viewsNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterMessages\" style=\"display: none;\" dojoAttachPoint=\"messagesNode\"></div>\n\t<span dojoAttachPoint=\"lastFocusNode\" tabindex=\"0\"></span>\n</div>\n","davinci/de/DijitTemplatedGenerator":function(){
define(["dojo/_base/declare","davinci/model/Path","davinci/ve/metadata"],function(_1481,Path,_1482){
return _1481("davinci.de.DijitTemplatedGenerator",null,{constructor:function(args){
dojo.mixin(this,args);
},buildSource:function(model,_1483,_1484,_1485,_1486,_1487){
this.value={js:"",metadata:"",amd:["dojo/_base/declare","dijit/_Widget","dijit/_Templated"]};
this.metadata={id:_1483,name:_1483,spec:"1.0",version:"1.0",require:[],library:{dojo:{src:"../../../../dojo/dojo.js"}}};
this.model=this._srcDocument=model;
var _1488=_1487[0]._srcElement;
var _1489="./"+_1484+".html";
if(!_1485){
this.value.amd.push("dojo/text!"+_1489.toString());
this.value.htmlPath=_1489;
}
var _148a=_1488.find({"elementType":"HTMLElement"});
_148a.push(_1488);
this.loadRequires("html.body",true,true,true);
for(var i=0;i<_148a.length;i++){
var n=_148a[i];
var type=n.getAttribute("data-dojo-type")||n.getAttribute("dojoType")||n.getAttribute("dvwidget");
if(type!=null){
this.loadRequires(type,true,true,true);
}
}
this.metadata.require.push({$library:"dojo",format:"amd",src:"widgets/"+_1483.replace(/\./g,"/"),type:"javascript-module"});
this.value.html="";
this.value.html+=_1488.getText();
this.value.html+="";
var _148b=3;
this.metadata.content="<div></div>";
this.value.js="define([";
for(var i=0;i<this.value.amd.length;i++){
this.value.js+="'"+this.value.amd[i]+"'";
if(i+1<this.value.amd.length){
this.value.js+=",\n";
}
}
this.value.js+="\n],function(";
for(var i=0;i<_148b;i++){
var _148c=this.value.amd[i].split("/");
var _148d=_148c[_148c.length-1];
this.value.js+=_148d;
if(i+1<_148b){
this.value.js+=",";
}
}
if(!_1485){
this.value.js+=",templateString";
}
this.value.js+="){\n\n";
this.value.js+=" return declare('"+_1483+"',[ _Widget, _Templated";
this.value.js+="], {\n";
this.value.js+="       widgetsInTemplate:true,\n";
if(!_1485){
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
var _148e=text.replace(/"/g,"\\\"");
_148e=_148e.replace(/\n/g,"");
return _148e;
},addMetaData:function(row){
for(var i=0;i<this.metadata.require.length;i++){
var m=this.metadata.require[i];
if(m.$library==row.$library&&m.src==row.src&&m.type==row.type&&m.format==row.format){
return;
}
}
this.metadata.require.push(row);
},loadRequires:function(type,_148f,_1490,_1491){
if(!type){
return false;
}
var _1492=_1482.query(type,"require");
if(!_1492){
return true;
}
_1492.every(function(r){
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
define(["dojo/_base/declare","davinci/js/JSElement"],function(_1493,_1494){
return _1493("davinci.js.JSExpression",_1494,{constructor:function(){
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
define(["dojo/_base/declare","dojo/_base/connect","davinci/Runtime","davinci/maqetta/AppStates","./commands/EventCommand","./commands/StyleCommand","davinci/ve/utils/StyleArray"],function(_1495,_1496,_1497,_1498,_1499,_149a,_149b){
var _149c=_1495(_1498,{_update:function(node,_149d){
if(!_1497.currentEditor||_1497.currentEditor.declaredClass!="davinci.ve.PageEditor"){
return;
}
if(!node||!node._dvWidget||(!node._maqAppStates&&node._maqDeltas)){
return;
}
var _149e=node._dvWidget;
this._refresh(_149e);
},_refresh:function(_149f){
var _14a0=_149f.getParent();
if(_14a0.dijitWidget){
this._refresh(_14a0);
}else{
if(_149f&&_149f.resize){
_149f.resize();
}
}
},_updateEvents:function(node,state,name){
if(!node||!node._dvWidget){
return;
}
var _14a1=node._dvWidget;
var _14a2=["onclick","onmouseover","onmouseout","onfocus","onblur"];
var _14a3;
for(var i in _14a2){
var event=_14a2[i];
var value=_14a1&&_14a1.properties&&_14a1.properties[event];
if(typeof value=="string"&&value.indexOf("davinci.states.setState")>=0){
var _14a4=value;
value=value.replace("'"+state+"'","'"+name+"'");
if(value!==_14a4){
_14a3=_14a3||{};
_14a3[event]=value;
}
}
}
var _14a5=this.getContext();
if(_14a5){
var _14a6=new _1499(_14a1,_14a3);
_14a5.getCommandStack().execute(_14a6);
}
},normalize:function(type,node,name,value){
switch(type){
case "style":
var _14a7=this.getStatesListCurrent(node);
for(var i=0;i<_14a7.length;i++){
_14a7[i]="Normal";
}
var _14a8=this.getStyle(node,_14a7,name);
if(_14a8){
for(var i=0;i<_14a8.length;i++){
if(_14a8[i][name]){
value=_14a8[i][name];
}
}
}
break;
}
return value;
},normalizeArray:function(type,node,name,_14a9){
var _14aa=dojo.clone(_14a9);
switch(type){
case "style":
var _14ab=this.getStatesListCurrent(node);
for(var i=0;i<_14ab.length;i++){
_14ab[i]="Normal";
}
var _14ac=this.getStyle(node,_14ab,name);
if(_14ac){
for(var i=0;i<_14ac.length;i++){
var nItem=_14ac[i];
for(var nProp in nItem){
for(var j=_14aa.length-1;j>=0;j--){
var vItem=_14aa[j];
for(var vProp in vItem){
if(vProp==nProp){
_14aa.splice(j,1);
break;
}
}
}
}
}
_14aa=_14aa.concat(_14ac);
}
break;
}
return _14aa;
},getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},getContext:function(){
var _14ad=this.getEditor();
return _14ad&&(_14ad.getContext&&_14ad.getContext()||_14ad.context);
},getDocument:function(){
var _14ae=this.getContext();
return _14ae&&_14ae.getDocument&&_14ae.getDocument();
},resetState:function(node){
if(!node){
return;
}
var _14af=this.getStateContainersForNode(node);
var _14b0=this.getFocus(node.ownerDocument.body);
for(var i=0;i<_14af.length;i++){
var _14b1=_14af[i];
var _14b2=this.getState(_14b1);
var focus=(_14b0&&_14b1==_14b0.stateContainerNode&&_14b2==_14b0.state);
this.setState(_14b2,_14b1,{focus:focus,updateWhenCurrent:true,silent:true});
}
},_updateSrcState:function(node,_14b3){
var _14b4=(node&&node._dvWidget);
if(!_14b4){
return;
}
var _14b5=_14b4._srcElement.getAttribute(davinci.states.APPSTATES_ATTRIBUTE);
var _14b6=_14b4._srcElement.getAttribute(davinci.states.DELTAS_ATTRIBUTE);
if(_14b4&&_14b4._srcElement){
var obj=this.serialize(node);
if(obj.maqAppStates){
obj.maqAppStates.trim();
}
if(obj.maqAppStates){
_14b4._srcElement.addAttribute(davinci.states.APPSTATES_ATTRIBUTE,obj.maqAppStates);
}else{
_14b4._srcElement.removeAttribute(davinci.states.APPSTATES_ATTRIBUTE);
}
if(obj.maqDeltas){
obj.maqDeltas.trim();
}
if(obj.maqDeltas){
_14b4._srcElement.addAttribute(davinci.states.DELTAS_ATTRIBUTE,obj.maqDeltas);
}else{
_14b4._srcElement.removeAttribute(davinci.states.DELTAS_ATTRIBUTE);
}
var _14b7=_14b4._srcElement.getAttribute(davinci.states.APPSTATES_ATTRIBUTE);
var _14b8=_14b4._srcElement.getAttribute(davinci.states.DELTAS_ATTRIBUTE);
if(_14b5!==_14b7||_14b6!==_14b8){
var _14b9=this.getEditor();
if(_14b9&&_14b9._visualChanged){
_14b9._visualChanged(_14b3);
}
}
}
},_removeStateFromNodeRecursive:function(node,state){
var _14ba=node._dvWidget;
if(!node||!_14ba||!state){
return;
}
this._removeStateFromNode(node,state);
var _14bb=_14ba.getChildren();
for(var i=0;i<_14bb.length;i++){
this._removeStateFromNodeRecursive(_14bb[i].domNode,state);
}
},_removeStateFromNode:function(node,state){
if(node&&node._maqDeltas&&node._maqDeltas[state]){
delete node._maqDeltas[state];
var _14bc=false;
for(var prop in node._maqDeltas){
if(prop!=="undefined"){
_14bc=true;
break;
}
}
if(!_14bc){
delete node._maqDeltas;
}
this._updateSrcState(node);
}
},removeUnusedStates:function(_14bd){
if(!_14bd){
return;
}
var _14be=_14bd.getAllWidgets();
for(var i=0;i<_14be.length;i++){
var node=_14be[i].domNode;
if(node.tagName!=="BODY"){
if(node&&node._maqDeltas){
var _14bf=this.getAllStatesForNode(node);
for(var state in node._maqDeltas){
if(state!=="undefined"&&_14bf.indexOf(state)<0){
this._removeStateFromNode(node,state);
}
}
}
}
}
},_getStateIndex:function(state){
var _14c0;
if(!state||state=="Normal"||state=="undefined"){
_14c0="undefined";
}else{
_14c0=state;
}
return _14c0;
},getCurrentStateIndex:function(){
return this._getStateIndex(this.getState());
},getApplyToStateIndex:function(_14c1){
var _14c2=this.getState();
var state;
if(_14c1==="current"&&_14c2&&_14c2!="Normal"&&_14c2!="undefined"){
state=_14c2;
}else{
state=undefined;
}
return this._getStateIndex(state);
},propertyDefinedForAnyCurrentState:function(node,_14c3){
var _14c4;
var _14c5=node._maqDeltas;
if(_14c5){
var _14c6=this.getStateContainersForNode(node);
outer_loop:
for(var i=_14c6.length-1;i>=0;i--){
var _14c7=_14c6[i];
var _14c8=this.getState(_14c7);
var _14c9=(!_14c8||_14c8==this.NORMAL)?"undefined":_14c8;
var _14ca=_14c5[_14c9]&&_14c5[_14c9].style;
if(_14ca){
for(var s=0;s<_14ca.length;s++){
var o=_14ca[s];
for(var j=0;j<_14c3.length;j++){
if(o.hasOwnProperty(_14c3[j])){
_14c4=_14c8;
break outer_loop;
}
}
}
}
}
}
return _14c4;
},initialize:function(){
if(!this.subscribed){
_1496.subscribe("/maqetta/appstates/state/changed",dojo.hitch(this,function(e){
var _14cb=this.getEditor();
if(!dojo.isObject(e.node)||!_14cb||_14cb.declaredClass!="davinci.ve.PageEditor"){
return;
}
dojo.publish("/maqetta/appstates/state/changed/start",[e]);
var _14cc=(e.node&&e.node._dvWidget);
var _14cc=(_14cc==this.getContext().rootWidget)?_14cc:_14cc.getParent();
var n=_14cc.domNode;
var _14cd=davinci.states._getChildrenOfNode(n);
while(_14cd.length){
var child=_14cd.shift();
if(!this.isContainer(child)){
_14cd=_14cd.concat(davinci.states._getChildrenOfNode(child));
}
var _14ce=this.getStatesArray(child,e.oldState,e.newState,e.stateContainerNode);
this._update(child,_14ce);
}
dojo.publish("/maqetta/appstates/state/changed/end",[e]);
var _14cf=this.getContext();
if(_14cf){
_14cf.clearCachedWidgetBounds();
_14cf.updateFocusAll();
}
}));
_1496.subscribe("/davinci/states/state/renamed",dojo.hitch(this,function(e){
var _14d0=this.getEditor();
if(!_14d0||_14d0.declaredClass=="davinci.themeEditor.ThemeEditor"){
return;
}
var _14d1=(e.node&&e.node._dvWidget);
var _14d2=davinci.states._getChildrenOfNode(e.node);
while(_14d2.length){
var child=_14d2.shift();
if(!this.isContainer(child)){
_14d2=_14d2.concat(davinci.states._getChildrenOfNode(child));
}
this.rename(child,e.oldName,e.newName,true);
this._updateEvents(child,e.oldName,e.newName);
}
var state=this.getState(e.stateContainerNode);
if(state===e.oldName){
this.setState(e.newName,e.stateContainerNode,{updateWhenCurrent:false,silent:true});
}
}));
_1496.subscribe("/davinci/states/state/style/changed",dojo.hitch(this,function(e){
var _14d3=this.getState();
if(_14d3==e.state){
var _14d4=this.findStateContainer(e.node,e.state);
var _14d5=this.getStatesArray(e.node,e.state,e.state,_14d4);
this._update(e.node,_14d5);
}
}));
_1496.subscribe("/davinci/ui/widget/replaced",dojo.hitch(this,function(_14d6,_14d7){
var _14d8=this.getState();
if(_14d8){
var _14d9=this.findStateContainer(_14d6.domNode,_14d8);
var _14da=this.getStatesArray(_14d6.domNode,_14d8,_14d8,_14d9);
this._update(_14d6.domNode,_14da);
}
}));
_1496.subscribe("/davinci/states/state/removed",dojo.hitch(this,function(_14db){
if(!_14db){
return;
}
this._removeStateFromNodeRecursive(_14db.node,_14db.state);
}));
this.subscribed=true;
}
}});
davinci.ve.states=new _149c();
davinci.ve.states.initialize();
return davinci.ve.states;
});
},"davinci/html/HTMLParser":function(){
define(["dojo/_base/declare","davinci/html/HTMLText","davinci/html/HTMLElement","davinci/html/HTMLAttribute","davinci/html/HTMLComment","davinci/html/PHPBlock","davinci/model/parser/Tokenizer","davinci/html/CSSParser"],function(_14dc,_14dd,_14de,_14df,_14e0,_14e1,_14e2,_14e3){
var _14e4=(function(){
var _14e5={autoSelfClosers:{"br":true,"img":true,"hr":true,"link":true,"input":true,"meta":true,"col":true,"frame":true,"base":true,"area":true},doNotIndent:{"pre":true,"!cdata":true}};
var _14e6={autoSelfClosers:{},doNotIndent:{"!cdata":true}};
var _14e7=_14e5;
var _14e8=false;
var _14e9=(function(){
function _14ea(_14eb,_14ec){
var ch=_14eb.next();
if(ch=="<"){
if(_14eb.equals("!")){
_14eb.next();
if(_14eb.equals("[")){
if(_14eb.lookAhead("[CDATA[",true)){
_14ec(_14ed("xml-cdata","]]>"));
return null;
}else{
return "xml-text";
}
}else{
if(_14eb.lookAhead("--",true)){
_14ec(_14ed("xml-comment","-->"));
return null;
}else{
if(_14eb.lookAhead("DOCTYPE",true)){
_14eb.nextWhileMatches(/[\w\._\-]/);
_14ec(_14ed("xml-doctype",">"));
return "xml-doctype";
}else{
return "xml-text";
}
}
}
}else{
if(_14eb.equals("?")){
_14eb.next();
if(_14eb.lookAhead("php",true,false,true)){
_14ec(_14ee("php-block","?>"));
return null;
}else{
_14eb.nextWhileMatches(/[\w\._\-]/);
_14ec(_14ed("xml-processing","?>"));
return "xml-processing";
}
}else{
if(_14eb.equals("/")){
_14eb.next();
}
_14ec(inTag);
return "xml-punctuation";
}
}
}else{
if(ch=="&"){
while(!_14eb.endOfLine()){
if(_14eb.next()==";"){
break;
}
}
return "xml-entity";
}else{
_14eb.nextWhileMatches(/[^&<\n]/);
return "xml-text";
}
}
};
function inTag(_14ef,_14f0){
var ch=_14ef.next();
if(ch==">"){
_14f0(_14ea);
return "xml-punctuation";
}else{
if(/[?\/]/.test(ch)&&_14ef.equals(">")){
_14ef.next();
_14f0(_14ea);
return "xml-punctuation";
}else{
if(ch=="="){
return "xml-punctuation";
}else{
if(/[\'\"]/.test(ch)){
_14f0(_14f1(ch));
return null;
}else{
_14ef.nextWhileMatches(/[^\s\u00a0=<>\"\'\/?]/);
return "xml-name";
}
}
}
}
};
function _14f1(quote){
return function(_14f2,_14f3){
while(!_14f2.endOfLine()){
if(_14f2.next()==quote){
_14f3(inTag);
break;
}
}
return "xml-attribute";
};
};
function _14ed(style,_14f4){
return function(_14f5,_14f6){
while(!_14f5.endOfLine()){
if(_14f5.lookAhead(_14f4,true)){
_14f6(_14ea);
break;
}
_14f5.next();
}
return style;
};
};
function _14ee(style,_14f7){
return function(_14f8,_14f9){
var _14fa=false;
while(!_14f8.endOfLine()){
if(_14f8.lookAhead(_14f7,true)){
_14fa=true;
_14f9(_14ea);
break;
}
_14f8.next();
}
if(!_14fa&&_14f8.endOfLine()){
_14f8.next();
}else{
while(_14f8.lookAheadRegex(/^[\ \t]/,true)){
}
if(_14f8.endOfLine()){
_14f8.next();
}
}
return style;
};
};
return function(_14fb,_14fc){
return _14e2.tokenizer(_14fb,_14fc||_14ea);
};
})();
function _14fd(_14fe){
var _14ff=_14e9(_14fe),token;
var cc=[base];
var _1500=0,_1501=0;
var _1502=null,_1503=null;
var _1504;
function push(fs){
for(var i=fs.length-1;i>=0;i--){
cc.push(fs[i]);
}
};
function cont(){
push(arguments);
_1504=true;
};
function pass(){
push(arguments);
_1504=false;
};
function _1505(){
token.style+=" xml-error";
};
function _1506(text){
return function(style,_1507){
if(_1507==text){
cont();
}else{
_1505();
cont(arguments.callee);
}
};
};
function _1508(_1509,_150a){
var _150b=_14e7.doNotIndent.hasOwnProperty(_1509)||(_1503&&_1503.noIndent);
_1503={prev:_1503,name:_1509,indent:_1501,startOfLine:_150a,noIndent:_150b};
};
function _150c(){
_1503=_1503.prev;
};
function _150d(_150e){
return function(_150f,_1510){
var _1511=_150e;
if(_1511&&_1511.noIndent){
return _1510;
}
if(_14e8&&/<!\[CDATA\[/.test(_150f)){
return 0;
}
if(_1511&&/^<\//.test(_150f)){
_1511=_1511.prev;
}
while(_1511&&!_1511.startOfLine){
_1511=_1511.prev;
}
if(_1511){
return _1511.indent+indentUnit;
}else{
return 0;
}
};
};
function base(){
return pass(_1512,base);
};
var _1513={"xml-text":true,"xml-entity":true,"xml-comment":true,"xml-processing":true,"xml-doctype":true,"php-block":true};
function _1512(style,_1514){
if(_1514=="<"){
cont(_1515,_1516,_1517(_1500==1));
}else{
if(_1514=="</"){
cont(_1518,_1506(">"));
}else{
if(style=="xml-cdata"){
if(!_1503||_1503.name!="!cdata"){
_1508("!cdata");
}
if(/\]\]>$/.test(_1514)){
_150c();
}
cont();
}else{
if(_1513.hasOwnProperty(style)){
cont();
}else{
_1505();
cont();
}
}
}
}
};
function _1515(style,_1519){
if(style=="xml-name"){
_1502=_1519.toLowerCase();
token.style="xml-tagname";
cont();
}else{
_1502=null;
pass();
}
};
function _1518(style,_151a){
if(style=="xml-name"){
token.style="xml-tagname";
if(_1503&&_151a.toLowerCase()==_1503.name){
_150c();
}else{
_1505();
}
}
cont();
};
function _1517(_151b){
return function(style,_151c){
if(_151c=="/>"||(_151c==">"&&_14e7.autoSelfClosers.hasOwnProperty(_1502))){
cont();
}else{
if(_151c==">"){
_1508(_1502,_151b);
cont();
}else{
_1505();
cont(arguments.callee);
}
}
};
};
function _1516(style){
if(style=="xml-name"){
token.style="xml-attname";
cont(_151d,_1516);
}else{
pass();
}
};
function _151d(style,_151e){
if(_151e=="="){
cont(value);
}else{
if(_151e==">"||_151e=="/>"){
pass(_1517);
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
return _1501;
},next:function(){
token=_14ff.next();
if(token.style=="whitespace"&&_1500==0){
_1501=token.value.length;
}else{
_1500++;
}
if(token.content=="\n"){
_1501=_1500=0;
token.indentation=_150d(_1503);
}
if(token.style=="whitespace"||token.type=="xml-comment"||token.type=="php-block"){
return token;
}
while(true){
_1504=false;
cc.pop()(token.style,token.content);
if(_1504){
return token;
}
}
},copy:function(){
var _151f=cc.concat([]),_1520=_14ff.state,_1521=_1503;
var _1522=this;
return function(input){
cc=_151f.concat([]);
_1500=_1501=0;
_1503=_1521;
_14ff=_14e9(input,_1520);
return _1522;
};
}};
};
return {make:_14fd,electricChars:"/",configure:function(_1523){
if(_1523.useHTMLKludges!=null){
_14e7=_1523.useHTMLKludges?_14e5:_14e6;
}
if(_1523.alignCDATA){
_14e8=_1523.alignCDATA;
}
}};
})();
var parse=function(text,_1524){
var _1525={next:function(){
if(++this.count==1){
return text;
}else{
throw StopIteration;
}
},count:0,text:text};
var _1526=_14e2.stringStream(_1525);
var _1527=_14e4.make(_1526);
var token;
var _1528=[];
function error(text){
_1528.push(text);
};
var stack=[];
stack.push(_1524);
var _1529;
var _152a,_152b;
function _152c(text,_152d){
_1529=new _14dd();
_1529.wasParsed=true;
_1529.startOffset=_152d;
stack[stack.length-1].addChild(_1529,undefined,true);
_1529.value=text;
};
function _152e(token){
if(token.content!=token.value){
_152c(token.value.substring(token.content.length),token.offset+token.value.length);
}
};
function _152f(str,_1530){
var lines=str.split("\n");
var _1531=lines[lines.length-1].length;
if(_1530.children.length){
lastElement=_1530.children[_1530.children.length-1];
lastElement._fmLine=lines.length-1;
lastElement._fmIndent=_1531;
}else{
_1530._fmChildLine=lines.length-1;
_1530._fmChildIndent=_1531;
}
};
function _1532(){
if(_1529!=null&&!_1529.value.match(/\S/)){
var _1533=stack[stack.length-1];
_1533.children.pop();
_152f(_1529.value,_1533);
}
_1529=null;
};
function _1534(){
var _1535=stack[stack.length-1];
_1526.nextWhileMatches(/[\s\u00a0]/);
var str=_1526.get();
if(_1529!=null){
_1529.value+=str;
_1532();
}else{
_152f(str,_1535);
}
_14e3.parse(_1526,_1535);
};
function _1536(_1537){
token=_1527.next();
while(_1537&&token.style=="whitespace"){
token=_1527.next();
}
return token;
};
try{
do{
token=_1527.next();
switch(token.style){
case "xml-punctuation":
_1532();
if(token.content=="<"){
var model=new _14de();
model.wasParsed=true;
model.startOffset=token.offset;
stack[stack.length-1].addChild(model,undefined,true);
_1536(true);
if(token.style=="xml-tagname"){
model.tag=token.content;
}else{
error("expecting tag name");
}
while((token=_1536(true)).style=="xml-attname"){
var _1538=new _14df();
_1538.wasParsed=true;
model.attributes.push(_1538);
_1538.name=token.content;
_1538.startOffset=token.offset;
_1536(true);
if(token.content=="="){
token=_1527.next();
if(token.style=="xml-attribute"){
var s=token.content;
_1538.setValue(s.substring(1,s.length-1));
}else{
error("expecting attribute value");
}
}else{
_1538.noValue=true;
_1538.setValue(true);
}
_1538.endOffset=token.offset-1;
if(_1538.noValue&&token.style!="xml-attname"){
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
_152e(token);
}
if(model.tag=="style"){
_1534();
}
}else{
if(token.value=="</"){
var _1539=model;
token=_1527.next();
if(model.tag=="script"){
model.script=model.getElementText();
}
stack.pop();
model=stack[stack.length-1];
token=_1527.next();
_1539.endOffset=token.offset;
_152e(token);
}
}
_152b=null;
break;
case "xml-text":
case "whitespace":
case "xml-entity":
if(_152a){
_152a.value+=token.value;
}else{
if(_152b){
_152b.value+=token.value;
}else{
if(!_1529){
_152c(token.value,token.offset);
}else{
_1529.value+=token.value;
}
}
}
_152b=null;
break;
case "xml-comment":
_1532();
var _153a=new _14e0();
_153a.wasParsed=true;
_153a.startOffset=token.offset;
_153a.value=token.content.substring(4,token.content.length-3);
_153a.endOffset=token.offset+token.content.length;
stack[stack.length-1].addChild(_153a,undefined,true);
_152b=null;
break;
case "php-block":
_1532();
var _153b=new _14e1();
_153b.wasParsed=true;
_153b.startOffset=token.offset;
_153b.value=token.content;
_153b.endOffset=token.offset+token.content.length;
stack[stack.length-1].addChild(_153b,undefined,true);
_152b=_153b;
break;
case "xml-doctype":
if(!_152a){
_1532();
var _153a=new _14e0();
_153a.wasParsed=true;
_153a.startOffset=token.offset;
_153a.value=token.value.substring(2);
stack[stack.length-1].addChild(_153a,undefined,true);
_153a.isProcessingInstruction=true;
token=_1527.next();
}
var _153c=token.content.length-1;
if(token.content.charAt(token.content.length-1)==">"){
_153a.endOffset=token.offset+token.content.length;
_153a.value+=token.content.substring(0,_153c);
_152e(token);
_152a=undefined;
}else{
_152a=_153a;
_153a.value+=token.content;
}
_152b=null;
break;
}
}while(true);
}
catch(e){
}
return {errors:_1528,endOffset:(token?token.offset:0)};
};
return {parse:parse};
});
},"davinci/model/resource/Resource":function(){
define(["dojo/_base/declare","dojo/_base/xhr","dojo/_base/connect","dojo/Deferred","dijit/registry","davinci/Runtime","davinci/model/Model","davinci/model/Path","davinci/ve/utils/URLRewrite"],function(_153d,xhr,_153e,_153f,_1540,_1541,Model,Path,_1542){
return _153d("davinci.model.resource.Resource",Model,{constructor:function(){
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
var _1543=_1541.getUserWorkspaceUrl();
return _1543+path;
},rename:function(_1544){
var _1545=new Path(this.getPath()).removeLastSegments().append(_1544);
return xhr.get({url:"cmd/rename",handleAs:"text",content:{oldName:this.getPath(),newName:_1545.toString()}}).then(function(){
this.name=_1544;
_153e.publish("/davinci/resource/resourceChanged",["renamed",this]);
}.bind(this));
},getParentFolder:function(){
if(this.elementType=="File"){
return this.parent;
}
return this;
},isVirtual:function(){
return !!this.libraryId;
},visit:function(_1546,_1547){
var _1548=_1546.visit(this);
if(!this._isLoaded&&this.elementType=="Folder"&&!_1547){
this.getChildren(dojo.hitch(this,function(){
dojo.forEach(this.children,function(child){
child.visit(_1546,_1547);
});
}));
}else{
if(this.children&&!_1548){
dojo.forEach(this.children,function(child){
child.visit(_1546,_1547);
});
}
}
},deleteResource:function(_1549){
var _154a,_154b=function(){
var name=this.getName();
this.parent.children.some(function(child,i,_154c){
if(child.getName()==name){
_154c.splice(i,1);
return true;
}
});
_153e.publish("/davinci/resource/resourceChanged",["deleted",this]);
}.bind(this);
if(_1549){
_154a=new _153f();
_154b();
_154a.resolve();
}else{
_154a=xhr.get({url:"cmd/deleteResource",handleAs:"text",content:{path:this.getPath()}}).then(_154b,function(){
});
}
return _154a;
},getId:function(){
return this._id;
}});
});
},"dijit/form/ValidationTextBox":function(){
define(["dojo/_base/declare","dojo/_base/kernel","dojo/i18n","./TextBox","../Tooltip","dojo/text!./templates/ValidationTextBox.html","dojo/i18n!./nls/validate"],function(_154d,_154e,i18n,_154f,_1550,_1551){
var _1552;
return _1552=_154d("dijit.form.ValidationTextBox",_154f,{templateString:_1551,required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},pattern:".*",regExp:"",regExpGen:function(){
},state:"",tooltipPosition:[],_deprecateRegExp:function(attr,value){
if(value!=_1552.prototype[attr]){
_154e.deprecated("ValidationTextBox id="+this.id+", set('"+attr+"', ...) is deprecated.  Use set('pattern', ...) instead.","","2.0");
this.set("pattern",value);
}
},_setRegExpGenAttr:function(_1553){
this._deprecateRegExp("regExpGen",_1553);
this.regExpGen=this._getPatternAttr;
},_setRegExpAttr:function(value){
this._deprecateRegExp("regExp",value);
},_setValueAttr:function(){
this.inherited(arguments);
this.validate(this.focused);
},validator:function(value,_1554){
return (new RegExp("^(?:"+this._getPatternAttr(_1554)+")"+(this.required?"":"?")+"$")).test(value)&&(!this.required||!this._isEmpty(value))&&(this._isEmpty(value)||this.parse(value,_1554)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(value){
return (this.trim?/^\s*$/:/^$/).test(value);
},getErrorMessage:function(){
var _1555=this.invalidMessage=="$_unset_$"?this.messages.invalidMessage:!this.invalidMessage?this.promptMessage:this.invalidMessage;
var _1556=this.missingMessage=="$_unset_$"?this.messages.missingMessage:!this.missingMessage?_1555:this.missingMessage;
return (this.required&&this._isEmpty(this.textbox.value))?_1556:_1555;
},getPromptMessage:function(){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_1557){
var _1558="";
var _1559=this.disabled||this.isValid(_1557);
if(_1559){
this._maskValidSubsetError=true;
}
var _155a=this._isEmpty(this.textbox.value);
var _155b=!_1559&&_1557&&this._isValidSubset();
this._set("state",_1559?"":(((((!this._hasBeenBlurred||_1557)&&_155a)||_155b)&&this._maskValidSubsetError)?"Incomplete":"Error"));
this.focusNode.setAttribute("aria-invalid",_1559?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_1557&&_155b;
_1558=this.getErrorMessage(_1557);
}else{
if(this.state=="Incomplete"){
_1558=this.getPromptMessage(_1557);
this._maskValidSubsetError=!this._hasBeenBlurred||_1557;
}else{
if(_155a){
_1558=this.getPromptMessage(_1557);
}
}
}
this.set("message",_1558);
return _1559;
},displayMessage:function(_155c){
if(_155c&&this.focused){
_1550.show(_155c,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_1550.hide(this.domNode);
}
},_refreshState:function(){
if(this._created){
this.validate(this.focused);
}
this.inherited(arguments);
},constructor:function(_155d){
this.constraints={};
this.baseClass+=" dijitValidationTextBox";
},startup:function(){
this.inherited(arguments);
this._refreshState();
},_setConstraintsAttr:function(_155e){
if(!_155e.locale&&this.lang){
_155e.locale=this.lang;
}
this._set("constraints",_155e);
this._refreshState();
},_getPatternAttr:function(_155f){
var p=this.pattern;
var type=(typeof p).toLowerCase();
if(type=="function"){
p=this.pattern(_155f||this.constraints);
}
if(p!=this._lastRegExp){
var _1560="";
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
_1560+=re;
break;
case ")":
_1560+="|$)";
break;
default:
_1560+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_1560);
}
catch(e){
_1560=this.pattern;
console.warn("RegExp error in "+this.declaredClass+": "+this.pattern);
}
this._partialre="^(?:"+_1560+")$";
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
},_setMessageAttr:function(_1561){
this._set("message",_1561);
this.displayMessage(_1561);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
});
},"url:dijit/layout/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition}\" style=\"visibility:hidden\">\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_menuBtn\"\n\t\t\tdata-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\n\t\t\tdata-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_leftBtn\"\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\n\t\t\tdata-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t\tclass=\"tabStripButton-${tabPosition}\"\n\t\t\tid=\"${id}_rightBtn\"\n\t\t\tdata-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\n\t\t\tdata-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\n\t<div class='dijitTabListWrapper' data-dojo-attach-point='tablistWrapper'>\n\t\t<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'\n\t\t\t\tdata-dojo-attach-point='containerNode' class='nowrapTabStrip'></div>\n\t</div>\n</div>","davinci/model/resource/File":function(){
define(["dojo/_base/declare","dojo/_base/xhr","davinci/Runtime","davinci/model/resource/Resource","davinci/model/resource/Marker","davinci/ve/utils/URLRewrite"],function(_1562,xhr,_1563,_1564,_1565,_1566){
return _1562("davinci.model.resource.File",_1564,{constructor:function(name,_1567){
this.elementType="File";
this.name=name;
this.parent=_1567;
this.markers=[];
this.extension=name.substr(name.lastIndexOf(".")+1);
},getExtension:function(){
return this.extension;
},clearMarkers:function(){
this.markers=[];
},addMarker:function(type,line,text){
this.markers.push(new _1565(this,type,line,text));
},getMarkers:function(_1568){
var _1569=[];
if(this.markers){
for(var i=0;i<this.markers.length;i++){
var _156a=this.markers[i];
if(!_1568){
_1569.push(_156a);
}else{
if(typeof _1568=="string"){
if(_156a.type==_1568){
_1569.push(_156a);
}
}else{
dojo.forEach(_1568,function(type){
if(type==_156a.type){
_1569.push(_156a);
}
});
}
}
}
}
return _1569;
},setContents:function(_156b,_156c){
var _156d=_156c?"true":"false";
var dirty=_156c?true:false;
if(this.isNew&&!_156c){
this.isNew=false;
}
var _156e=_156c?".workingcopy":"";
var path=encodeURI(this.getPath()+_156e);
return xhr.put({url:path,putData:_156b,handleAs:"text",contentType:"text/html"}).then(function(res){
this.dirtyResource=dirty;
dojo.publish("/davinci/resource/resourceChanged",["modified",this]);
}.bind(this),function(err){
console.error("An error occurred: davinci.model.resource.File.prototype.setContents "+err+" : "+path);
});
},getText:function(){
return this.getContentSync();
},getContentSync:function(){
return _1563.serverJSONRequest({url:_1566.encodeURI(this.getURL()),handleAs:"text",sync:true});
},getContent:function(){
return xhr.get({url:_1566.encodeURI(this.getURL()),handleAs:"text"});
},removeWorkingCopy:function(){
_1563.serverJSONRequest({url:"cmd/removeWorkingCopy",handleAs:"text",content:{path:this.getPath()},sync:true});
if(this.isNew){
this.deleteResource(true);
}
}});
});
},"dijit/form/NumberTextBox":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/number","./RangeBoundTextBox"],function(_156f,lang,_1570,_1571){
var _1572=_156f("dijit.form.NumberTextBoxMixin",null,{pattern:_1570.regexp,value:NaN,editOptions:{pattern:"#.######"},_formatter:_1570.format,postMixInProperties:function(){
this.inherited(arguments);
this._set("type","text");
},_setConstraintsAttr:function(_1573){
var _1574=typeof _1573.places=="number"?_1573.places:0;
if(_1574){
_1574++;
}
if(typeof _1573.max!="number"){
_1573.max=9*Math.pow(10,15-_1574);
}
if(typeof _1573.min!="number"){
_1573.min=-9*Math.pow(10,15-_1574);
}
this.inherited(arguments,[_1573]);
if(this.focusNode&&this.focusNode.value&&!isNaN(this.value)){
this.set("value",this.value);
}
},_onFocus:function(){
if(this.disabled){
return;
}
var val=this.get("value");
if(typeof val=="number"&&!isNaN(val)){
var _1575=this.format(val,this.constraints);
if(_1575!==undefined){
this.textbox.value=_1575;
}
}
this.inherited(arguments);
},format:function(value,_1576){
var _1577=String(value);
if(typeof value!="number"){
return _1577;
}
if(isNaN(value)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(value,_1576))&&_1576.exponent!==false&&/\de[-+]?\d/i.test(_1577)){
return _1577;
}
if(this.editOptions&&this.focused){
_1576=lang.mixin({},_1576,this.editOptions);
}
return this._formatter(value,_1576);
},_parser:_1570.parse,parse:function(value,_1578){
var v=this._parser(value,lang.mixin({},_1578,(this.editOptions&&this.focused)?this.editOptions:{}));
if(this.editOptions&&this.focused&&isNaN(v)){
v=this._parser(value,_1578);
}
return v;
},_getDisplayedValueAttr:function(){
var v=this.inherited(arguments);
return isNaN(v)?this.textbox.value:v;
},filter:function(value){
return (value==null||value==="")?NaN:this.inherited(arguments);
},serialize:function(value,_1579){
return (typeof value!="number"||isNaN(value))?"":this.inherited(arguments);
},_setBlurValue:function(){
var val=lang.hitch(lang.mixin({},this,{focused:true}),"get")("value");
this._setValueAttr(val,true);
},_setValueAttr:function(value,_157a,_157b){
if(value!==undefined&&_157b===undefined){
_157b=String(value);
if(typeof value=="number"){
if(isNaN(value)){
_157b="";
}else{
if(("rangeCheck" in this&&this.rangeCheck(value,this.constraints))||this.constraints.exponent===false||!/\de[-+]?\d/i.test(_157b)){
_157b=undefined;
}
}
}else{
if(!value){
_157b="";
value=NaN;
}else{
value=undefined;
}
}
}
this.inherited(arguments,[value,_157a,_157b]);
},_getValueAttr:function(){
var v=this.inherited(arguments);
if(isNaN(v)&&this.textbox.value!==""){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)&&(new RegExp("^"+_1570._realNumberRegexp(lang.mixin({},this.constraints))+"$").test(this.textbox.value))){
var n=Number(this.textbox.value);
return isNaN(n)?undefined:n;
}else{
return undefined;
}
}else{
return v;
}
},isValid:function(_157c){
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
var _157d=_156f("dijit.form.NumberTextBox",[_1571,_1572],{baseClass:"dijitTextBox dijitNumberTextBox"});
_157d.Mixin=_1572;
return _157d;
});
},"dijit/form/_ComboBoxMenuMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/i18n","dojo/i18n!./nls/ComboBox"],function(array,_157e,_157f,i18n){
return _157e("dijit.form._ComboBoxMenuMixin",null,{_messages:null,postMixInProperties:function(){
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
},_createOption:function(item,_1580){
var _1581=this._createMenuItem();
var _1582=_1580(item);
if(_1582.html){
_1581.innerHTML=_1582.label;
}else{
_1581.appendChild(_1581.ownerDocument.createTextNode(_1582.label));
}
if(_1581.innerHTML==""){
_1581.innerHTML="&#160;";
}
this.applyTextDir(_1581,(_1581.innerText||_1581.textContent||""));
return _1581;
},createOptions:function(_1583,_1584,_1585){
this.items=_1583;
this.previousButton.style.display=(_1584.start==0)?"none":"";
_157f.set(this.previousButton,"id",this.id+"_prev");
array.forEach(_1583,function(item,i){
var _1586=this._createOption(item,_1585);
_1586.setAttribute("item",i);
_157f.set(_1586,"id",this.id+i);
this.nextButton.parentNode.insertBefore(_1586,this.nextButton);
},this);
var _1587=false;
if(_1583.total&&!_1583.total.then&&_1583.total!=-1){
if((_1584.start+_1584.count)<_1583.total){
_1587=true;
}else{
if((_1584.start+_1584.count)>_1583.total&&_1584.count==_1583.length){
_1587=true;
}
}
}else{
if(_1584.count==_1583.length){
_1587=true;
}
}
this.nextButton.style.display=_1587?"":"none";
_157f.set(this.nextButton,"id",this.id+"_next");
},clearResultList:function(){
var _1588=this.containerNode;
while(_1588.childNodes.length>2){
_1588.removeChild(_1588.childNodes[_1588.childNodes.length-2]);
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
define(["dojo/_base/array","dojo/_base/connect","dojo/cookie","dojo/_base/declare","dojo/Deferred","dojo/DeferredList","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/errors/create","dojo/fx","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/topic","dojo/touch","dojo/when","./focus","./registry","./_base/manager","./_Widget","./_TemplatedMixin","./_Container","./_Contained","./_CssStateMixin","dojo/text!./templates/TreeNode.html","dojo/text!./templates/Tree.html","./tree/TreeStoreModel","./tree/ForestStoreModel","./tree/_dndSelector"],function(array,_1589,_158a,_158b,_158c,_158d,dom,_158e,_158f,_1590,event,_1591,_1592,_1593,keys,lang,on,topic,touch,when,focus,_1594,_1595,_1596,_1597,_1598,_1599,_159a,_159b,_159c,_159d,_159e,_159f){
_158c=_158b(_158c,{addCallback:function(_15a0){
this.then(_15a0);
},addErrback:function(_15a1){
this.then(null,_15a1);
}});
var _15a2=_158b("dijit._TreeNode",[_1596,_1597,_1598,_1599,_159a],{item:null,isTreeNode:true,label:"",_setLabelAttr:{node:"labelNode",type:"innerText"},isExpandable:null,isExpanded:false,state:"UNCHECKED",templateString:_159b,baseClass:"dijitTreeNode",cssStateNodes:{rowNode:"dijitTreeRow"},_setTooltipAttr:{node:"rowNode",type:"attribute",attribute:"title"},buildRendering:function(){
this.inherited(arguments);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){
this.labelNode.setAttribute("aria-expanded",this.isExpanded);
}
this.setSelected(false);
},_setIndentAttr:function(_15a3){
var _15a4=(Math.max(_15a3,0)*this.tree._nodePixelIndent)+"px";
_1590.set(this.domNode,"backgroundPosition",_15a4+" 0px");
_1590.set(this.indentNode,this.isLeftToRight()?"paddingLeft":"paddingRight",_15a4);
array.forEach(this.getChildren(),function(child){
child.set("indent",_15a3+1);
});
this._set("indent",_15a3);
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
var _15a5="_"+lower+"Class";
var _15a6=lower+"Node";
var _15a7=this[_15a5];
this[_15a5]=this.tree["get"+upper+"Class"](item,this.isExpanded);
_158e.replace(this[_15a6],this[_15a5]||"",_15a7||"");
_1590.set(this[_15a6],this.tree["get"+upper+"Style"](item,this.isExpanded)||{});
},_updateLayout:function(){
var _15a8=this.getParent();
if(!_15a8||!_15a8.rowNode||_15a8.rowNode.style.display=="none"){
_158e.add(this.domNode,"dijitTreeIsRoot");
}else{
_158e.toggle(this.domNode,"dijitTreeIsLast",!this.getNextSibling());
}
},_setExpando:function(_15a9){
var _15aa=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"],_15ab=["*","-","+","*"],idx=_15a9?0:(this.isExpandable?(this.isExpanded?1:2):3);
_158e.replace(this.expandoNode,_15aa[idx],_15aa);
this.expandoNodeText.innerHTML=_15ab[idx];
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
_158e.add(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","true");
}
var def,_15ac=_1592.wipeIn({node:this.containerNode,duration:_1595.defaultDuration,onEnd:function(){
def.resolve(true);
}});
def=(this._expandDeferred=new _158c(function(){
_15ac.stop();
}));
_15ac.play();
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
_158e.remove(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
var def,_15ad=_1592.wipeOut({node:this.containerNode,duration:_1595.defaultDuration,onEnd:function(){
def.resolve(true);
}});
def=(this._collapseDeferred=new _158c(function(){
_15ad.stop();
}));
_15ad.play();
return def;
},indent:0,setChildItems:function(items){
var tree=this.tree,model=tree.model,defs=[];
var _15ae=this.getChildren();
array.forEach(_15ae,function(child){
_1598.prototype.removeChild.call(this,child);
},this);
this.defer(function(){
array.forEach(_15ae,function(node){
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
var id=model.getIdentity(item),_15af=tree._itemNodesMap[id],node;
if(_15af){
for(var i=0;i<_15af.length;i++){
if(_15af[i]&&!_15af[i].getParent()){
node=_15af[i];
node.set("indent",this.indent+1);
break;
}
}
}
if(!node){
node=this.tree._createTreeNode({item:item,tree:tree,isExpandable:model.mayHaveChildren(item),label:tree.getLabel(item),tooltip:tree.getTooltip(item),ownerDocument:tree.ownerDocument,dir:tree.dir,lang:tree.lang,textDir:tree.textDir,indent:this.indent+1});
if(_15af){
_15af.push(node);
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
var def=new _158d(defs);
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
var _15b0=this.getChildren();
if(_15b0.length==0){
this.isExpandable=false;
this.collapse();
}
array.forEach(_15b0,function(child){
child._updateLayout();
});
},makeExpandable:function(){
this.isExpandable=true;
this._setExpando(false);
},setSelected:function(_15b1){
this.labelNode.setAttribute("aria-selected",_15b1?"true":"false");
_158e.toggle(this.rowNode,"dijitTreeRowSelected",_15b1);
},setFocusable:function(_15b2){
this.labelNode.setAttribute("tabIndex",_15b2?"0":"-1");
},_setTextDirAttr:function(_15b3){
if(_15b3&&((this.textDir!=_15b3)||!this._created)){
this._set("textDir",_15b3);
this.applyTextDir(this.labelNode,this.labelNode.innerText||this.labelNode.textContent||"");
array.forEach(this.getChildren(),function(_15b4){
_15b4.set("textDir",_15b3);
},this);
}
}});
var Tree=_158b("dijit.Tree",[_1596,_1597],{store:null,model:null,query:null,label:"",showRoot:true,childrenAttr:["children"],paths:[],path:[],selectedItems:null,selectedItem:null,openOnClick:false,openOnDblClick:false,templateString:_159c,persist:true,autoExpand:false,dndController:_159f,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance","dragThreshold","betweenThreshold"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,dragThreshold:5,betweenThreshold:0,_nodePixelIndent:19,_publish:function(_15b5,_15b6){
topic.publish(this.id,lang.mixin({tree:this,event:_15b5},_15b6||{}));
},postMixInProperties:function(){
this.tree=this;
if(this.autoExpand){
this.persist=false;
}
this._itemNodesMap={};
if(!this.cookieName&&this.id){
this.cookieName=this.id+"SaveStateCookie";
}
this.expandChildrenDeferred=new _158c();
this.pendingCommandsDeferred=this.expandChildrenDeferred;
this.inherited(arguments);
},postCreate:function(){
this._initState();
var self=this;
this.own(on(this.domNode,on.selector(".dijitTreeNode",touch.enter),function(evt){
self._onNodeMouseEnter(_1594.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode",touch.leave),function(evt){
self._onNodeMouseLeave(_1594.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode","click"),function(evt){
self._onClick(_1594.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode","dblclick"),function(evt){
self._onDblClick(_1594.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode","keypress"),function(evt){
self._onKeyPress(_1594.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeNode","keydown"),function(evt){
self._onKeyDown(_1594.byNode(this),evt);
}),on(this.domNode,on.selector(".dijitTreeRow","focusin"),function(evt){
self._onNodeFocus(_1594.getEnclosingWidget(this),evt);
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
var _15b7={};
for(var i=0;i<this.dndParams.length;i++){
if(this[this.dndParams[i]]){
_15b7[this.dndParams[i]]=this[this.dndParams[i]];
}
}
this.dndController=new this.dndController(this,_15b7);
}
this._load();
if(!this.params.path&&!this.params.paths&&this.persist){
this.set("paths",this.dndController._getSavedPaths());
}
this.onLoadDeferred=this.pendingCommandsDeferred;
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
},_store2model:function(){
this._v10Compat=true;
_1593.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");
var _15b8={id:this.id+"_ForestStoreModel",store:this.store,query:this.query,childrenAttrs:this.childrenAttr};
if(this.params.mayHaveChildren){
_15b8.mayHaveChildren=lang.hitch(this,"mayHaveChildren");
}
if(this.params.getItemChildren){
_15b8.getChildren=lang.hitch(this,function(item,_15b9,_15ba){
this.getItemChildren((this._v10Compat&&item===this.model.root)?null:item,_15b9,_15ba);
});
}
this.model=new _159e(_15b8);
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
var _15bb=this.model.getIdentity(item);
if(this._itemNodesMap[_15bb]){
this._itemNodesMap[_15bb].push(rn);
}else{
this._itemNodesMap[_15bb]=[rn];
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
var _15bc=lang.isString(item)?item:this.model.getIdentity(item);
return [].concat(this._itemNodesMap[_15bc]);
},_setSelectedItemAttr:function(item){
this.set("selectedItems",[item]);
},_setSelectedItemsAttr:function(items){
var tree=this;
return this.pendingCommandsDeferred=this.pendingCommandsDeferred.then(lang.hitch(this,function(){
var _15bd=array.map(items,function(item){
return (!item||lang.isString(item))?item:tree.model.getIdentity(item);
});
var nodes=[];
array.forEach(_15bd,function(id){
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
return new _158d(array.map(paths,function(path){
var d=new _158c();
path=array.map(path,function(item){
return lang.isString(item)?item:tree.model.getIdentity(item);
});
if(path.length){
_15be(path,[tree.rootNode],d);
}else{
d.reject(new Tree.PathError("Empty path"));
}
return d;
}));
}).then(_15bf);
function _15be(path,nodes,def){
var _15c0=path.shift();
var _15c1=array.filter(nodes,function(node){
return node.getIdentity()==_15c0;
})[0];
if(!!_15c1){
if(path.length){
tree._expandNode(_15c1).then(function(){
_15be(path,_15c1.getChildren(),def);
});
}else{
def.resolve(_15c1);
}
}else{
def.reject(new Tree.PathError("Could not expand path at "+_15c0));
}
};
function _15bf(_15c2){
tree.set("selectedNodes",array.map(array.filter(_15c2,function(x){
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
var _15c3=this;
function _15c4(node){
var def=new dojo.Deferred();
_15c3._expandNode(node).then(function(){
var _15c5=array.filter(node.getChildren()||[],function(node){
return node.isExpandable;
}),defs=array.map(_15c5,_15c4);
new dojo.DeferredList(defs).then(function(){
def.resolve(true);
});
});
return def;
};
return _15c4(this.rootNode);
},collapseAll:function(){
var _15c6=this;
function _15c7(node){
var def=new dojo.Deferred();
def.label="collapseAllDeferred";
var _15c8=array.filter(node.getChildren()||[],function(node){
return node.isExpandable;
}),defs=array.map(_15c8,_15c7);
new dojo.DeferredList(defs).then(function(){
if(!node.isExpanded||(node==_15c6.rootNode&&!_15c6.showRoot)){
def.resolve(true);
}else{
_15c6._collapseNode(node).then(function(){
def.resolve(true);
});
}
});
return def;
};
return _15c7(this.rootNode);
},mayHaveChildren:function(){
},getItemChildren:function(){
},getLabel:function(item){
return this.model.getLabel(item);
},getIconClass:function(item,_15c9){
return (!item||this.model.mayHaveChildren(item))?(_15c9?"dijitFolderOpened":"dijitFolderClosed"):"dijitLeaf";
},getLabelClass:function(){
},getRowClass:function(){
},getIconStyle:function(){
},getLabelStyle:function(){
},getRowStyle:function(){
},getTooltip:function(){
return "";
},_onKeyPress:function(_15ca,e){
if(e.charCode<=32){
return;
}
if(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.metaKey){
var c=String.fromCharCode(e.charCode);
this._onLetterKeyNav({node:_15ca,key:c.toLowerCase()});
event.stop(e);
}
},_onKeyDown:function(_15cb,e){
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
this[this._keyHandlerMap[key]]({node:_15cb,item:_15cb.item,evt:e});
event.stop(e);
}
},_onEnterKey:function(_15cc){
this._publish("execute",{item:_15cc.item,node:_15cc.node});
this.dndController.userSelect(_15cc.node,_1589.isCopyKey(_15cc.evt),_15cc.evt.shiftKey);
this.onClick(_15cc.item,_15cc.node,_15cc.evt);
},_onDownArrow:function(_15cd){
var node=this._getNextNode(_15cd.node);
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onUpArrow:function(_15ce){
var node=_15ce.node;
var _15cf=node.getPreviousSibling();
if(_15cf){
node=_15cf;
while(node.isExpandable&&node.isExpanded&&node.hasChildren()){
var _15d0=node.getChildren();
node=_15d0[_15d0.length-1];
}
}else{
var _15d1=node.getParent();
if(!(!this.showRoot&&_15d1===this.rootNode)){
node=_15d1;
}
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onRightArrow:function(_15d2){
var node=_15d2.node;
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
},_onLeftArrow:function(_15d3){
var node=_15d3.node;
if(node.isExpandable&&node.isExpanded){
this._collapseNode(node);
}else{
var _15d4=node.getParent();
if(_15d4&&_15d4.isTreeNode&&!(!this.showRoot&&_15d4===this.rootNode)){
this.focusNode(_15d4);
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
},multiCharSearchDuration:250,_onLetterKeyNav:function(_15d5){
var cs=this._curSearch;
if(cs){
cs.pattern=cs.pattern+_15d5.key;
cs.timer.remove();
}else{
cs=this._curSearch={pattern:_15d5.key,startNode:_15d5.node};
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
},isExpandoNode:function(node,_15d6){
return dom.isDescendant(node,_15d6.expandoNode);
},_onClick:function(_15d7,e){
var _15d8=e.target,_15d9=this.isExpandoNode(_15d8,_15d7);
if((this.openOnClick&&_15d7.isExpandable)||_15d9){
if(_15d7.isExpandable){
this._onExpandoClick({node:_15d7});
}
}else{
this._publish("execute",{item:_15d7.item,node:_15d7,evt:e});
this.onClick(_15d7.item,_15d7,e);
this.focusNode(_15d7);
}
event.stop(e);
},_onDblClick:function(_15da,e){
var _15db=e.target,_15dc=(_15db==_15da.expandoNode||_15db==_15da.expandoNodeText);
if((this.openOnDblClick&&_15da.isExpandable)||_15dc){
if(_15da.isExpandable){
this._onExpandoClick({node:_15da});
}
}else{
this._publish("execute",{item:_15da.item,node:_15da,evt:e});
this.onDblClick(_15da.item,_15da,e);
this.focusNode(_15da);
}
event.stop(e);
},_onExpandoClick:function(_15dd){
var node=_15dd.node;
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
var _15de=node.getNextSibling();
if(_15de){
return _15de;
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
var def=new _158c();
if(node._expandNodeDeferred){
return node._expandNodeDeferred;
}
var model=this.model,item=node.item,_15df=this;
if(!node._loadDeferred){
node.markProcessing();
node._loadDeferred=new _158c();
model.getChildren(item,function(items){
node.unmarkProcessing();
node.setChildItems(items).then(function(){
node._loadDeferred.resolve(items);
});
},function(err){
console.error(_15df,": error loading "+node.label+" children: ",err);
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
var model=this.model,_15e0=model.getIdentity(item),nodes=this._itemNodesMap[_15e0];
if(nodes){
var label=this.getLabel(item),_15e1=this.getTooltip(item);
array.forEach(nodes,function(node){
node.set({item:item,label:label,tooltip:_15e1});
node._updateItemClasses(item);
});
}
},_onItemChildrenChange:function(_15e2,_15e3){
var model=this.model,_15e4=model.getIdentity(_15e2),_15e5=this._itemNodesMap[_15e4];
if(_15e5){
array.forEach(_15e5,function(_15e6){
_15e6.setChildItems(_15e3);
});
}
},_onItemDelete:function(item){
var model=this.model,_15e7=model.getIdentity(item),nodes=this._itemNodesMap[_15e7];
if(nodes){
array.forEach(nodes,function(node){
this.dndController.removeTreeNode(node);
var _15e8=node.getParent();
if(_15e8){
_15e8.removeChild(node);
}
node.destroyRecursive();
},this);
delete this._itemNodesMap[_15e7];
}
},_initState:function(){
this._openedNodes={};
if(this.persist&&this.cookieName){
var oreo=_158a(this.cookieName);
if(oreo){
array.forEach(oreo.split(","),function(item){
this._openedNodes[item]=true;
},this);
}
}
},_state:function(node,_15e9){
if(!this.persist){
return false;
}
var path=array.map(node.getTreePath(),function(item){
return this.model.getIdentity(item);
},this).join("/");
if(arguments.length===1){
return this._openedNodes[path];
}else{
if(_15e9){
this._openedNodes[path]=true;
}else{
delete this._openedNodes[path];
}
if(this.persist&&this.cookieName){
var ary=[];
for(var id in this._openedNodes){
ary.push(id);
}
_158a(this.cookieName,ary.join(","),{expires:365});
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
},resize:function(_15ea){
if(_15ea){
_158f.setMarginBox(this.domNode,_15ea);
}
this._nodePixelIndent=_158f.position(this.tree.indentDetector).w||this._nodePixelIndent;
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
var _15eb=0,nodes=[];
function _15ec(_15ed){
var node=_15ed.rowNode;
node.style.width="auto";
_15eb=Math.max(_15eb,node.clientWidth);
nodes.push(node);
if(_15ed.isExpanded){
array.forEach(_15ed.getChildren(),_15ec);
}
};
_15ec(this.rootNode);
_15eb=Math.max(_15eb,_158f.getContentBox(this.domNode).w);
array.forEach(nodes,function(node){
node.style.width=_15eb+"px";
});
},_createTreeNode:function(args){
return new _15a2(args);
},_setTextDirAttr:function(_15ee){
if(_15ee&&this.textDir!=_15ee){
this._set("textDir",_15ee);
this.rootNode.set("textDir",_15ee);
}
}});
Tree.PathError=_1591("TreePathError");
Tree._TreeNode=_15a2;
return Tree;
});
},"davinci/model/Comment":function(){
define(["dojo/_base/declare","davinci/model/Model"],function(_15ef,Model){
return _15ef("davinci.model.Comment",Model,{constructor:function(){
this.elementType="Comment";
this.nosemicolon=true;
},addComment:function(type,start,stop,text){
if(this.comments==null){
this.comments=[];
}
this.comments[this.comments.length]={commentType:type,start:start,stop:stop,s:text};
},appendComment:function(text){
var _15f0=this.comments[this.comments.length-1];
_15f0.s+=text;
_15f0.stop+=text.length;
},getText:function(_15f1){
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
define(["require","dojo/_base/declare","dojo/dom-class","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_15f2,_15f3,_15f4,has,_15f5,lang,ready,_15f6,_15f7,_15f8){
if(has("dijit-legacy-requires")){
ready(0,function(){
var _15f9=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_15f2(_15f9);
});
}
return _15f3("dijit.form.Button",[_15f6,_15f7],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_15f8,_setValueAttr:"valueNode",_onClick:function(e){
var ok=this.inherited(arguments);
if(ok){
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
e.stopPropagation();
}
}
return ok;
},_fillContent:function(_15fa){
if(_15fa&&(!this.params||!("label" in this.params))){
var _15fb=lang.trim(_15fa.innerHTML);
if(_15fb){
this.label=_15fb;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_15f4.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_15fc){
_15f5.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_15fc);
},_setLabelAttr:function(_15fd){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
});
},"davinci/ve/DijitWidget":function(){
define(["dojo/_base/declare","dojo/_base/window","dojo/_base/lang","dojo/dom-attr","dojo/parser","./_Widget","./metadata"],function(_15fe,_15ff,dlang,_1600,_1601,_1602,_1603){
var _1604="__DijitWidgetScratchSpace";
return _15fe("davinci.ve.DijitWidget",_1602,{isDijitWidget:true,constructor:function(mixin,node,_1605,_1606,_1607){
if(typeof _1605==="string"){
var type=_1600.get(node,"data-dojo-type")||_1600.get(node,"dojoType");
if(!type){
_1600.set(node,"data-dojo-type",_1605);
}
if(_1607){
_1607.addAttribute("data-dojo-type",_1605);
}
var doc=node.ownerDocument,win=doc.defaultView,ss=doc[_1604];
if(!ss){
ss=doc[_1604]=doc.createElement("div");
}
ss.appendChild(node);
var _1608=win.require("dojo/parser").instantiate([node],mixin,{noStart:true});
_1605=_1608[0];
if(ss.firstChild){
ss.removeChild(ss.firstChild);
}
this.domNode=_1605.domNode;
_1605.domNode._dvWidget=this;
this.isLayoutContainer=_1605.isLayoutContainer;
}else{
this.type=_1605.declaredClass;
}
var _1609=davinci.ve.metadata.getAllowedChild(this.type);
this.acceptsHTMLChildren=_1609[0]==="ANY"||_1609.indexOf("HTML")!==-1;
this.dijitWidget=_1605;
this.containerNode=_1605.containerNode;
this.styleNode=_1605.styleNode;
this.id=_1605.id;
},getParent:function(){
var _160a;
if(!this.dijitWidget||!this.dijitWidget.domNode||!this.dijitWidget.domNode.parentNode){
return;
}
do{
_160a=require("davinci/ve/widget").getEnclosingWidget(this.dijitWidget.domNode.parentNode);
}while(_160a&&_160a.dijitWidget&&_160a.dijitWidget.declaredClass.split(".").pop().charAt(0)=="_");
return _160a;
},_getChildren:function(_160b){
if(this.acceptsHTMLChildren){
return this.inherited(arguments);
}
var _160c=[];
if(davinci.ve.metadata.getAllowedChild(this.type)[0]!=="NONE"){
this.dijitWidget.getChildren().forEach(function(child){
if(_160b){
_160c.push(require("davinci/ve/widget").getWidget(child.domNode));
}else{
var _160d=child.domNode&&child.domNode._dvWidget;
if(_160d){
_160c.push(_160d);
}
}
});
}
return _160c;
},_getContainerNode:function(){
return this.containerNode||this.domNode;
},selectChild:function(_160e){
if(this.dijitWidget.selectChild){
this.dijitWidget.selectChild(_160e.dijitWidget);
}
},addChild:function(child,index){
if(this.dijitWidget.addChild&&child.dijitWidget){
if(typeof index==="number"&&index>=0){
var _160f=this.getChildren();
if(index<_160f.length){
this._srcElement.insertBefore(child._srcElement,_160f[index]._srcElement);
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
},_addChildHelper:function(_1610,index){
var _1611=this.getHelper();
if(_1611&&_1611.addChild){
_1611.addChild(this,_1610,index);
}else{
this.dijitWidget.addChild(_1610,index);
}
},_addChildHooked:function(_1612,index){
var _1613=this.dijitWidget,_1614=_1613.getChildren;
_1613.getChildren=dojo.hitch(this,this.getChildren);
var _1615=this.getHelper();
if(_1615&&_1615.addChild){
_1615.addChild(this,_1612,index);
}else{
_1613.addChild(_1612,index);
}
_1613.getChildren=_1614;
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
var _1616=this.getContext();
var djit=_1616.getDijit();
var _1617=this.dijitWidget.isInstanceOf(djit.layout._LayoutWidget);
return _1617;
},resize:function(){
var _1618=this.getHelper();
if(_1618&&_1618.resize){
_1618.resize(this);
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
var _1619=node.parentNode;
if(_1619._dvWidget&&_1619._dvWidget.isDijitWidget){
this._refresh(_1619);
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
define(["dojo/_base/array","dojo/_base/declare","dojo/cldr/supplemental","dojo/date","dojo/date/locale","dojo/date/stamp","dojo/dom","dojo/dom-class","dojo/_base/event","dojo/_base/lang","dojo/sniff","dojo/string","./_WidgetBase","./_TemplatedMixin","dojo/text!./templates/Calendar.html","./hccss"],function(array,_161a,_161b,date,_161c,stamp,dom,_161d,event,lang,has,_161e,_161f,_1620,_1621){
var _1622=_161a("dijit.CalendarLite",[_161f,_1620],{templateString:_1621,dowTemplateString:"<th class=\"dijitReset dijitCalendarDayLabelTemplate\" role=\"columnheader\"><span class=\"dijitCalendarDayLabel\">${d}</span></th>",dateTemplateString:"<td class=\"dijitReset\" role=\"gridcell\" data-dojo-attach-point=\"dateCells\"><span class=\"dijitCalendarDateLabel\" data-dojo-attach-point=\"dateLabels\"></span></td>",weekTemplateString:"<tr class=\"dijitReset dijitCalendarWeekTemplate\" role=\"row\">${d}${d}${d}${d}${d}${d}${d}</tr>",value:new Date(""),datePackage:"",dayWidth:"narrow",tabIndex:"0",currentFocus:new Date(),baseClass:"dijitCalendar",_isValidDate:function(value){
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
},_setValueAttr:function(value,_1623){
if(typeof value=="string"){
value=stamp.fromISOString(value);
}
value=this._patchDate(value);
if(this._isValidDate(value)&&!this.isDisabledDate(value,this.lang)){
this._set("value",value);
this.set("currentFocus",value);
this._markSelectedDates([value]);
if(this._created&&(_1623||typeof _1623=="undefined")){
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
var _1624=month.getDay(),_1625=this.dateModule.getDaysInMonth(month),_1626=this.dateModule.getDaysInMonth(this.dateModule.add(month,"month",-1)),today=new this.dateClassObj(),_1627=_161b.getFirstDayOfWeek(this.lang);
if(_1627>_1624){
_1627-=7;
}
this._date2cell={};
array.forEach(this.dateCells,function(_1628,idx){
var i=idx+_1627;
var date=new this.dateClassObj(month),_1629,clazz="dijitCalendar",adj=0;
if(i<_1624){
_1629=_1626-_1624+i+1;
adj=-1;
clazz+="Previous";
}else{
if(i>=(_1624+_1625)){
_1629=i-_1624-_1625+1;
adj=1;
clazz+="Next";
}else{
_1629=i-_1624+1;
clazz+="Current";
}
}
if(adj){
date=this.dateModule.add(date,"month",adj);
}
date.setDate(_1629);
if(!this.dateModule.compare(date,today,"date")){
clazz="dijitCalendarCurrentDate "+clazz;
}
if(this.isDisabledDate(date,this.lang)){
clazz="dijitCalendarDisabledDate "+clazz;
_1628.setAttribute("aria-disabled","true");
}else{
clazz="dijitCalendarEnabledDate "+clazz;
_1628.removeAttribute("aria-disabled");
_1628.setAttribute("aria-selected","false");
}
var _162a=this.getClassForDate(date,this.lang);
if(_162a){
clazz=_162a+" "+clazz;
}
_1628.className=clazz+"Month dijitCalendarDateTemplate";
var _162b=date.valueOf();
this._date2cell[_162b]=_1628;
_1628.dijitDateValue=_162b;
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
},constructor:function(_162c){
this.dateModule=_162c.datePackage?lang.getObject(_162c.datePackage,false):date;
this.dateClassObj=this.dateModule.Date||Date;
this.dateLocaleModule=_162c.datePackage?lang.getObject(_162c.datePackage+".locale",false):_161c;
},_createMonthWidget:function(){
return _1622._MonthWidget({id:this.id+"_mw",lang:this.lang,dateLocaleModule:this.dateLocaleModule},this.monthNode);
},buildRendering:function(){
var d=this.dowTemplateString,_162d=this.dateLocaleModule.getNames("days",this.dayWidth,"standAlone",this.lang),_162e=_161b.getFirstDayOfWeek(this.lang);
this.dayCellsHtml=_161e.substitute([d,d,d,d,d,d,d].join(""),{d:""},function(){
return _162d[_162e++%7];
});
var r=_161e.substitute(this.weekTemplateString,{d:this.dateTemplateString});
this.dateRowsHtml=[r,r,r,r,r,r].join("");
this.dateCells=[];
this.dateLabels=[];
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
var _162f=new this.dateClassObj(this.currentFocus);
this.monthWidget=this._createMonthWidget();
this.set("currentFocus",_162f,false);
},postCreate:function(){
this.inherited(arguments);
this._connectControls();
},_connectControls:function(){
var _1630=lang.hitch(this,function(_1631,part,_1632){
this.connect(this[_1631],"onclick",function(){
this._setCurrentFocusAttr(this.dateModule.add(this.currentFocus,part,_1632));
});
});
_1630("incrementMonth","month",1);
_1630("decrementMonth","month",-1);
_1630("nextYearLabelNode","year",1);
_1630("previousYearLabelNode","year",-1);
},_setCurrentFocusAttr:function(date,_1633){
var _1634=this.currentFocus,_1635=this._getNodeByDate(_1634);
date=this._patchDate(date);
this._set("currentFocus",date);
if(!this._date2cell||this.dateModule.difference(_1634,date,"month")!=0){
this._populateGrid();
this._populateControls();
this._markSelectedDates([this.value]);
}
var _1636=this._getNodeByDate(date);
_1636.setAttribute("tabIndex",this.tabIndex);
if(this.focused||_1633){
_1636.focus();
}
if(_1635&&_1635!=_1636){
if(has("webkit")){
_1635.setAttribute("tabIndex","-1");
}else{
_1635.removeAttribute("tabIndex");
}
}
},focus:function(){
this._setCurrentFocusAttr(this.currentFocus,true);
},_onDayClick:function(evt){
event.stop(evt);
for(var node=evt.target;node&&!node.dijitDateValue;node=node.parentNode){
}
if(node&&!_161d.contains(node,"dijitCalendarDisabledDate")){
this.set("value",node.dijitDateValue);
}
},_getNodeByDate:function(value){
value=this._patchDate(value);
return value&&this._date2cell?this._date2cell[value.valueOf()]:null;
},_markSelectedDates:function(dates){
function mark(_1637,cell){
_161d.toggle(cell,"dijitCalendarSelectedDate",_1637);
cell.setAttribute("aria-selected",_1637?"true":"false");
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
_1622._MonthWidget=_161a("dijit.CalendarLite._MonthWidget",_161f,{_setMonthAttr:function(month){
var _1638=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,month),_1639=(has("ie")==6?"":"<div class='dijitSpacer'>"+array.map(_1638,function(s){
return "<div>"+s+"</div>";
}).join("")+"</div>");
this.domNode.innerHTML=_1639+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_1638[month.getMonth()]+"</div>";
}});
return _1622;
});
},"davinci/html/CSSElement":function(){
define(["dojo/_base/declare","davinci/model/Model"],function(_163a,Model){
return _163a("davinci.html.CSSElement",Model,{constructor:function(){
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
},close:function(_163b){
for(var i=0;i<this.children;i++){
this.children[i].close();
}
},getCSSFile:function(){
var rule=this.getCSSRule();
if(rule){
return rule.parent;
}
},getCSSRule:function(){
},_convertNode:function(_163c){
if(dojo.isArray(_163c)){
return _163c;
}
var nodes=[];
while(_163c&&_163c.tagName!="HTML"){
nodes.push({tagName:_163c.tagName,id:_163c.id,classes:(_163c.className&&_163c.className.split(" "))});
_163c=_163c.parentNode;
}
return nodes;
},getID:function(){
return this.parent.getID()+":"+this.startOffset+":"+this.getLabel();
}});
});
},"url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\"\n\t \trole=\"menuitem\" tabIndex=\"-1\">\n\t<span data-dojo-attach-point=\"containerNode\"></span>\n</div>\n","dijit/Toolbar":function(){
define(["require","dojo/_base/declare","dojo/has","dojo/keys","dojo/ready","./_Widget","./_KeyNavContainer","./_TemplatedMixin"],function(_163d,_163e,has,keys,ready,_163f,_1640,_1641){
if(has("dijit-legacy-requires")){
ready(0,function(){
var _1642=["dijit/ToolbarSeparator"];
_163d(_1642);
});
}
return _163e("dijit.Toolbar",[_163f,_1641,_1640],{templateString:"<div class=\"dijit\" role=\"toolbar\" tabIndex=\"${tabIndex}\" data-dojo-attach-point=\"containerNode\">"+"</div>",baseClass:"dijitToolbar",postCreate:function(){
this.inherited(arguments);
this.connectKeyNavHandlers(this.isLeftToRight()?[keys.LEFT_ARROW]:[keys.RIGHT_ARROW],this.isLeftToRight()?[keys.RIGHT_ARROW]:[keys.LEFT_ARROW]);
}});
});
},"dojo/promise/all":function(){
define(["../_base/array","../Deferred","../when"],function(array,_1643,when){
"use strict";
var some=array.some;
return function all(_1644){
var _1645,array;
if(_1644 instanceof Array){
array=_1644;
}else{
if(_1644&&typeof _1644==="object"){
_1645=_1644;
}
}
var _1646;
var _1647=[];
if(_1645){
array=[];
for(var key in _1645){
if(Object.hasOwnProperty.call(_1645,key)){
_1647.push(key);
array.push(_1645[key]);
}
}
_1646={};
}else{
if(array){
_1646=[];
}
}
if(!array||!array.length){
return new _1643().resolve(_1646);
}
var _1648=new _1643();
_1648.promise.always(function(){
_1646=_1647=null;
});
var _1649=array.length;
some(array,function(_164a,index){
if(!_1645){
_1647.push(index);
}
when(_164a,function(value){
if(!_1648.isFulfilled()){
_1646[_1647[index]]=value;
if(--_1649===0){
_1648.resolve(_1646);
}
}
},_1648.reject);
return _1648.isFulfilled();
});
return _1648.promise;
};
});
},"davinci/review/model/ReviewTreeModel":function(){
define(["dojo/_base/declare","davinci/review/model/Resource"],function(_164b,_164c){
return _164b("davinci.review.model.ReviewTreeModel",null,{foldersOnly:false,constructor:function(args){
this.root=_164c.getRoot();
this.subscription=[dojo.subscribe("/davinci/review/resourceChanged",this,this.resourceChanged)];
},destroy:function(){
this.subscriptions.forEach(dojo.unsubscribe);
},getRoot:function(_164d){
_164d(this.root);
},mayHaveChildren:function(item){
return item.elementType=="ReviewVersion"&&!item.isDraft;
},getChildren:function(_164e,_164f,_1650){
_164e.getChildren(_164f,_1650);
},getIdentity:function(item){
return item.getPath();
},resourceChanged:function(_1651,type,_1652){
if(_1652){
if(_1652._isLoaded){
_1652.getChildren(function(_1653){
_1653.forEach(this.onDelete,this);
}.bind(this),true);
}
this.onDelete(_1652);
}
var _1654=this.root;
_1654._isLoaded=false;
_1654.getChildren(function(_1655){
this.onChildrenChange(_1654,_1655);
}.bind(this));
},getLabel:function(item){
var label=item.getName();
if(item.elementType=="ReviewVersion"&&item.isDraft){
label+=" (Draft)";
}
if(item.elementType=="ReviewFile"){
var path=new davinci.model.Path(label);
var _1656=path.getSegments();
var _1657=davinci.Runtime.getExtension("davinci.editor",function(_1658){
return _1658.id==="davinci.review.CommentReviewEditor";
});
var _1659="."+_1657.extensions;
label=_1656[_1656.length-1]+_1659;
}
return label;
},newItem:function(args,_165a){
},pasteItem:function(_165b,_165c,_165d,bCopy){
},onChange:function(item){
},onDelete:function(item){
},onChildrenChange:function(_165e,_165f){
}});
});
},"davinci/review/actions/PublishAction":function(){
define(["dojo/_base/declare","davinci/actions/Action","davinci/review/widgets/PublishWizard","davinci/Runtime","dojox/widget/Toaster","davinci/ui/Dialog","dojo/i18n!./nls/actions"],function(_1660,_1661,_1662,_1663,_1664,_1665,_1666){
var _1667=_1660("davinci.review.actions.PublishAction",[_1661],{constructor:function(node,_1668){
this.node=node;
this.isRestart=_1668;
if(node&&node.isRestart){
this.isRestart=true;
}
},run:function(){
var _1669=this.publishWizard=new _1662();
this.dialog=new _1665({contentStyle:{width:650,height:350},title:this.node?_1666.editReview:_1666.newReview,onCancel:dojo.hitch(this,this.close),onHide:dojo.hitch(this,this.hide)});
this.dialog.setContent(_1669);
this.dialog.show();
dojo.connect(_1669,"onClose",this,this.close);
_1669.initData(this.node,this.isRestart).then(function(){
_1669.updateSubmit();
_1669.reviewerStackContainer.resize();
});
},hide:function(){
this.dialog.destroyRecursive();
},close:function(){
this.dialog.hide();
}});
return _1667;
});
},"davinci/ui/SelectProjectDialog":function(){
define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","../Workbench","dojo/i18n!davinci/ui/nls/ui","dojo/text!./templates/SelectProjectDialog.html","./widgets/ProjectSelection"],function(_166a,_166b,_166c,_166d,_166e,uiNLS,_166f){
return _166a([_166b,_166c,_166d],{templateString:_166f,uiNLS:uiNLS,postCreate:function(){
this.currentProject=_166e.getProject();
this.currentProjectName.innerHTML=this.currentProject;
},_onChange:function(e){
if(this.projectSelection.get("value")==this.currentProject){
this._okButton.set("disabled",true);
}else{
this._okButton.set("disabled",false);
}
},okButton:function(){
var _1670=this.projectSelection.get("value");
if(_1670){
_166e.loadProject(_1670);
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
var _1671=(function(){
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
var _1672=d.create;
var dd=d.doc;
var dp=d.place;
var _1673=_1672("iframe",{className:"dojoxEllipsisIFrame",src:"javascript:'<html><head><script>if(\"loadFirebugConsole\" in window){window.loadFirebugConsole();}</script></head><body></body></html>'",style:{display:"none"}});
var _1674=function(r,cnt){
if(r.collapsed){
return;
}
if(cnt>0){
do{
_1674(r);
cnt--;
}while(cnt);
return;
}
if(r.endContainer.nodeType==3&&r.endOffset>0){
r.setEnd(r.endContainer,r.endOffset-1);
}else{
if(r.endContainer.nodeType==3){
r.setEndBefore(r.endContainer);
_1674(r);
return;
}else{
if(r.endOffset&&r.endContainer.childNodes.length>=r.endOffset){
var nCont=r.endContainer.childNodes[r.endOffset-1];
if(nCont.nodeType==3){
r.setEnd(nCont,nCont.length-1);
}else{
if(nCont.childNodes.length){
r.setEnd(nCont,nCont.childNodes.length);
_1674(r);
return;
}else{
r.setEndBefore(nCont);
_1674(r);
return;
}
}
}else{
r.setEndBefore(r.endContainer);
_1674(r);
return;
}
}
}
};
var _1675=function(n){
var c=_1672("div",{className:"dojoxEllipsisContainer"});
var e=_1672("div",{className:"dojoxEllipsisShown",style:{display:"none"}});
n.parentNode.replaceChild(c,n);
c.appendChild(n);
c.appendChild(e);
var i=_1673.cloneNode(true);
var ns=n.style;
var es=e.style;
var _1676;
var _1677=function(){
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
var _1678=1;
dp(r.cloneContents(),e,"only");
var sw=e.scrollWidth,ow=e.offsetWidth;
done=(sw<=ow);
var pct=(1-((ow*1)/sw));
if(pct>0){
_1678=Math.max(Math.round(e.textContent.length*pct)-1,1);
}
_1674(r,_1678);
}while(!r.collapsed&&!done);
};
i.onload=function(){
i.contentWindow.onresize=_1677;
_1677();
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
if(_1671&&n.textContent==n.innerHTML&&!hc(n,"dojoxEllipsisSelectable")){
_1671(n);
}else{
_1675(n);
}
});
};
d.addOnLoad(function(){
var t=null;
var c=null;
var _1679=function(){
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
c=d.connect(d.body(),"DOMSubtreeModified",_1679);
},delay);
};
_1679();
});
}
});
},"davinci/ui/Dialog":function(){
define(["dojo/_base/declare","dijit/form/Button","dijit/Dialog","dojo/dom-geometry","dojo/dom-style","dojo/_base/connect","dojo/window","dojo/parser","dojo/i18n!davinci/ve/nls/common","dojox/layout/ResizeHandle",],function(_167a,_167b,_167c,_167d,style,_167e,_167f,_1680,veNLS,_1681){
var _1682=_167a(_167c,{contentStyle:null,buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"resizableDialog");
if(this.submitOnEnter){
dojo.addClass(this.domNode,"submitOnEnter");
}
},_setContent:function(cont,_1683){
this.inherited(arguments);
var div=dojo.doc.createElement("div");
this.containerNode.appendChild(div);
new _1681({targetId:this.id},div);
var _1684=dojo.query(".dijitDialogPaneContentArea",this.containerNode)[0];
if(_1684){
dojo.connect(_1684,"onkeydown",this,"_onKeyDown");
}else{
dojo.connect(this.domNode,"onkeydown",this,"_onKeyDown");
}
},resize:function(_1685){
if(_1685){
var _1686=style.getComputedStyle(this.containerNode);
var _1687=_167d.getPadExtents(this.containerNode,_1686);
var c={w:_1685.w-_1687.w,h:_1685.h-_1687.h};
c.h-=_167d.getMarginBox(this.titleBar).h;
var _1688=dojo.query(".dijitDialogPaneContentArea",this.containerNode)[0];
var _1689=dojo.query(".dijitDialogPaneActionBar",this.containerNode)[0];
c.h-=_167d.getMarginBox(_1689).h;
if(c.w){
dojo.style(_1688,"width",c.w+"px");
}
if(c.h){
dojo.style(_1688,"height",c.h+"px");
}
dojo.forEach(this.getChildren(),dojo.hitch(this,function(child){
if(child.resize){
child.resize({w:c.w,h:c.h});
}
}));
}
},show:function(){
var _168a=this.inherited(arguments);
if(this.contentStyle){
if(typeof (this.contentStyle)=="object"){
var r={};
if(this.contentStyle.width){
r.w=parseInt(this.contentStyle.width);
}
if(this.contentStyle.height){
r.h=parseInt(this.contentStyle.height);
}
var _168b=_167f.getBox(this.ownerDocument);
_168b.w*=this.maxRatio;
_168b.h*=this.maxRatio;
if(r.h>_168b.h){
var _168c=_167d.position(this.containerNode),w=Math.min(r.w,_168b.w)-(r.w-_168c.w),h=Math.min(r.h,_168b.h)-(r.h-_168c.h);
r.h=_168b.h;
}
this.resize(r);
}
this._size();
this._position();
dojo.style(this.containerNode,"width","auto");
dojo.style(this.containerNode,"height","auto");
}
return _168a;
},_onKeyDown:function(e){
var _168d=((e.ctrlKey&&!dojo.isMac)||(dojo.isMac&&e.metaKey));
if(e.which==dojo.keys.ENTER&&(_168d||this.submitOnEnter)){
var _168e=dojo.query("input[type=submit]",this.containerNode);
if(_168e.length>0){
var b=dijit.getEnclosingWidget(_168e[0]);
var evt=document.createEvent("MouseEvents");
evt.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
b._onClick(evt);
}
}
}});
_1682._timedDestroy=function(_168f,_1690){
if(_1690){
_1690.forEach(_167e.disconnect);
}
var hndl=_167e.connect(_168f,"onHide",function(){
_167e.disconnect(hndl);
_168f.destroyRecursive();
});
_168f.hide();
};
_1682.showModal=function(_1691,title,style,_1692,_1693){
var _1694=[];
var _1695=new _1682({title:title,content:_1691,contentStyle:style,submitOnEnter:_1693});
var _1696=dojo.hitch(this,function(){
var _1697=false;
if(_1692){
_1697=_1692();
}
if(_1697){
return;
}
this._timedDestroy(_1695,_1694);
});
_1694.push(_167e.connect(_1695,"onExecute",_1691,_1696));
if(_1691.onExecute){
_1694.push(_167e.connect(_1691,"onExecute",_1691,_1696));
}
_1694.push(_167e.connect(_1691,"onClose",dojo.hitch(this,function(){
this._timedDestroy(_1695,_1694);
})));
_1694.push(_167e.connect(_1695,"onCancel",dojo.hitch(this,function(){
this._timedDestroy(_1695,_1694);
})));
_1695.show();
return _1695;
},_1682.showMessage=function(title,_1698,style,_1699,_169a){
return this.showDialog(title,_1698,style,_1699,null,true);
},_1682.showDialog=function(title,_169b,style,_169c,_169d,_169e,_169f){
var _16a0;
var _16a1=[];
var _16a2=document.createElement("div");
var _16a3=document.createElement("div");
dojo.addClass(_16a3,"dijitDialogPaneContentArea");
_16a2.appendChild(_16a3);
var _16a4=document.createElement("div");
dojo.addClass(_16a4,"dijitDialogPaneActionBar");
var _16a5=new _167b({label:_169d?_169d:veNLS.ok,type:"submit","class":"maqPrimaryButton"});
_16a4.appendChild(_16a5.domNode);
var _16a6=dojo.hitch(this,function(){
this._timedDestroy(_16a0,_16a1);
});
if(!_169e){
function _16a7(){
_16a0.onCancel();
};
_16a4.appendChild(new _167b({label:veNLS.cancel,onClick:_16a7,"class":"maqSecondaryButton"}).domNode);
}
_16a2.appendChild(_16a4);
_16a0=new _1682({title:title,content:_16a2,contentStyle:style,submitOnEnter:_169f});
if(dojo.isString(_169b)){
_16a3.innerHTML=_169b;
_1680.parse(_16a3);
}else{
if(_169b.domNode){
_16a3.appendChild(_169b.domNode);
}else{
_16a3.appendChild(_169b);
}
}
_16a1.push(_167e.connect(_16a0,"onExecute",dojo.hitch(this,function(){
if(_169c){
_169c();
}
_16a6();
})));
_16a1.push(_167e.connect(_16a0,"onCancel",dojo.hitch(this,function(){
_16a6();
})));
_16a0.show();
return _16a0;
};
return _1682;
});
},"dojox/grid/_View":function(){
define(["dojo","dijit/registry","../main","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/connect","dojo/_base/sniff","dojo/query","dojo/_base/window","dojo/text!./resources/View.html","dojo/dnd/Source","dijit/_Widget","dijit/_TemplatedMixin","dojox/html/metrics","./util","dojo/_base/html","./_Builder","dojo/dnd/Avatar","dojo/dnd/Manager"],function(dojo,dijit,dojox,_16a8,array,lang,_16a9,has,query,win,_16aa,_16ab,_16ac,_16ad,_16ae,util,html,_16af,_16b0,_16b1){
var _16b2=function(_16b3,_16b4){
return _16b3.style.cssText==undefined?_16b3.getAttribute("style"):_16b3.style.cssText;
};
var _16b5=_16a8("dojox.grid._View",[_16ac,_16ad],{defaultWidth:"18em",viewWidth:"",templateString:_16aa,classTag:"dojoxGrid",marginBottom:0,rowPad:2,_togglingColumn:-1,_headerBuilderClass:_16af._HeaderBuilder,_contentBuilderClass:_16af._ContentBuilder,postMixInProperties:function(){
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
},setStructure:function(_16b6){
var vs=(this.structure=_16b6);
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
},_cleanupRowWidgets:function(_16b7){
if(_16b7){
array.forEach(query("[widgetId]",_16b7).map(dijit.byNode),function(w){
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
},onBeforeRow:function(_16b8,cells){
this._onBeforeRow(_16b8,cells);
if(_16b8>=0){
this._cleanupRowWidgets(this.getRowNode(_16b8));
}
},onAfterRow:function(_16b9,cells,_16ba){
this._onAfterRow(_16b9,cells,_16ba);
var g=this.grid;
array.forEach(query(".dojoxGridStubNode",_16ba),function(n){
if(n&&n.parentNode){
var lw=n.getAttribute("linkWidget");
var _16bb=window.parseInt(html.attr(n,"cellIdx"),10);
var _16bc=g.getCell(_16bb);
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
var _16bd=this.hasVScrollbar();
var _16be=html.style(this.scrollboxNode,"overflow");
if(this.noscroll||!_16be||_16be=="hidden"){
_16bd=false;
}else{
if(_16be=="scroll"){
_16bd=true;
}
}
return (_16bd?_16ae.getScrollbar().w:0);
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
var _16bf=lang.hitch(this,function(node,_16c0){
!this.grid.isLeftToRight()&&(_16c0=!_16c0);
var inc=_16c0?-1:1;
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
var _16c1="dojoxGrid_bottomMarker";
var _16c2="dojoxGrid_topMarker";
if(this.bottomMarker){
html.destroy(this.bottomMarker);
}
this.bottomMarker=html.byId(_16c1);
if(this.topMarker){
html.destroy(this.topMarker);
}
this.topMarker=html.byId(_16c2);
if(!this.bottomMarker){
this.bottomMarker=html.create("div",{"id":_16c1,"class":"dojoxGridColPlaceBottom"},win.body());
this._hide(this.bottomMarker);
this.topMarker=html.create("div",{"id":_16c2,"class":"dojoxGridColPlaceTop"},win.body());
this._hide(this.topMarker);
}
this.arrowDim=html.contentBox(this.bottomMarker);
var _16c3=html.contentBox(this.headerContentNode.firstChild.rows[0]).h;
this.source=new _16ab(this.headerContentNode.firstChild.rows[0],{horizontal:true,accept:["gridColumn_"+this.grid.id],viewIndex:this.index,generateText:false,onMouseDown:lang.hitch(this,function(e){
this.header.decorateEvent(e);
if((this.header.overRightResizeArea(e)||this.header.overLeftResizeArea(e))&&this.header.canResize(e)&&!this.header.moveable){
this.header.beginColumnResize(e);
}else{
if(this.grid.headerMenu){
this.grid.headerMenu.onCancel(true);
}
if(e.button===(has("ie")<9?1:0)){
_16ab.prototype.onMouseDown.call(this.source,e);
}
}
}),onMouseOver:lang.hitch(this,function(e){
var src=this.source;
if(src._getChildByEvent(e)){
_16ab.prototype.onMouseOver.apply(src,arguments);
}
}),_markTargetAnchor:lang.hitch(this,function(_16c4){
var src=this.source;
if(src.current==src.targetAnchor&&src.before==_16c4){
return;
}
if(src.targetAnchor&&_16bf(src.targetAnchor,src.before)){
src._removeItemClass(_16bf(src.targetAnchor,src.before),src.before?"After":"Before");
}
_16ab.prototype._markTargetAnchor.call(src,_16c4);
var _16c5=_16c4?src.targetAnchor:_16bf(src.targetAnchor,src.before);
var _16c6=0;
if(!_16c5){
_16c5=src.targetAnchor;
_16c6=html.contentBox(_16c5).w+this.arrowDim.w/2+2;
}
var pos=html.position(_16c5,true);
var left=Math.floor(pos.x-this.arrowDim.w/2+_16c6);
html.style(this.bottomMarker,"visibility","visible");
html.style(this.topMarker,"visibility","visible");
html.style(this.bottomMarker,{"left":left+"px","top":(_16c3+pos.y)+"px"});
html.style(this.topMarker,{"left":left+"px","top":(pos.y-this.arrowDim.h)+"px"});
if(src.targetAnchor&&_16bf(src.targetAnchor,src.before)){
src._addItemClass(_16bf(src.targetAnchor,src.before),src.before?"After":"Before");
}
}),_unmarkTargetAnchor:lang.hitch(this,function(){
var src=this.source;
if(!src.targetAnchor){
return;
}
if(src.targetAnchor&&_16bf(src.targetAnchor,src.before)){
src._removeItemClass(_16bf(src.targetAnchor,src.before),src.before?"After":"Before");
}
this._hide(this.bottomMarker);
this._hide(this.topMarker);
_16ab.prototype._unmarkTargetAnchor.call(src);
}),destroy:lang.hitch(this,function(){
_16a9.disconnect(this._source_conn);
_16a9.unsubscribe(this._source_sub);
_16ab.prototype.destroy.call(this.source);
if(this.bottomMarker){
html.destroy(this.bottomMarker);
delete this.bottomMarker;
}
if(this.topMarker){
html.destroy(this.topMarker);
delete this.topMarker;
}
}),onDndCancel:lang.hitch(this,function(){
_16ab.prototype.onDndCancel.call(this.source);
this._hide(this.bottomMarker);
this._hide(this.topMarker);
})});
this._source_conn=_16a9.connect(this.source,"onDndDrop",this,"_onDndDrop");
this._source_sub=_16a9.subscribe("/dnd/drop/before",this,"_onDndDropBefore");
this.source.startup();
}
},_hide:function(node){
html.style(node,{top:"-10000px","visibility":"hidden"});
},_onDndDropBefore:function(_16c7,nodes,copy){
if(_16b1.manager().target!==this.source){
return;
}
this.source._targetNode=this.source.targetAnchor;
this.source._beforeTarget=this.source.before;
var views=this.grid.views.views;
var _16c8=views[_16c7.viewIndex];
var _16c9=views[this.index];
if(_16c9!=_16c8){
_16c8.convertColPctToFixed();
_16c9.convertColPctToFixed();
}
},_onDndDrop:function(_16ca,nodes,copy){
if(_16b1.manager().target!==this.source){
if(_16b1.manager().source===this.source){
this._removingColumn=true;
}
return;
}
this._hide(this.bottomMarker);
this._hide(this.topMarker);
var _16cb=function(n){
return n?html.attr(n,"idx"):null;
};
var w=html.marginBox(nodes[0]).w;
if(_16ca.viewIndex!==this.index){
var views=this.grid.views.views;
var _16cc=views[_16ca.viewIndex];
var _16cd=views[this.index];
if(_16cc.viewWidth&&_16cc.viewWidth!="auto"){
_16cc.setColumnsWidth(_16cc.getColumnsWidth()-w);
}
if(_16cd.viewWidth&&_16cd.viewWidth!="auto"){
_16cd.setColumnsWidth(_16cd.getColumnsWidth());
}
}
var stn=this.source._targetNode;
var stb=this.source._beforeTarget;
!this.grid.isLeftToRight()&&(stb=!stb);
var _16ce=this.grid.layout;
var idx=this.index;
delete this.source._targetNode;
delete this.source._beforeTarget;
_16ce.moveColumn(_16ca.viewIndex,idx,_16cb(nodes[0]),_16cb(stn),stb);
},renderHeader:function(){
this.headerContentNode.innerHTML=this.header.generateHtml(this._getHeaderContent);
if(this.flexCells){
this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth;
}
util.fire(this,"onAfterRow",[-1,this.structure.cells,this.headerContentNode]);
},_getHeaderContent:function(_16cf){
var n=_16cf.name||_16cf.grid.getCellName(_16cf);
if(/^\s+$/.test(n)){
n="&nbsp;";
}
var ret=["<div class=\"dojoxGridSortNode"];
if(_16cf.index!=_16cf.grid.getSortIndex()){
ret.push("\">");
}else{
ret=ret.concat([" ",_16cf.grid.sortInfo>0?"dojoxGridSortUp":"dojoxGridSortDown","\"><div class=\"dojoxGridArrowButtonChar\">",_16cf.grid.sortInfo>0?"&#9650;":"&#9660;","</div><div class=\"dojoxGridArrowButtonNode\" role=\"presentation\"></div>","<div class=\"dojoxGridColCaption\">"]);
}
ret=ret.concat([n,"</div></div>"]);
return ret.join("");
},resize:function(){
this.adaptHeight();
this.adaptWidth();
},hasHScrollbar:function(reset){
var _16d0=this._hasHScroll||false;
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
if(_16d0!==this._hasHScroll){
this.grid.update();
}
return this._hasHScroll;
},hasVScrollbar:function(reset){
var _16d1=this._hasVScroll||false;
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
if(_16d1!==this._hasVScroll){
this.grid.update();
}
return this._hasVScroll;
},convertColPctToFixed:function(){
var _16d2=false;
this.grid.initialWidth="";
var _16d3=query("th",this.headerContentNode);
var _16d4=array.map(_16d3,function(c,vIdx){
var w=c.style.width;
html.attr(c,"vIdx",vIdx);
if(w&&w.slice(-1)=="%"){
_16d2=true;
}else{
if(w&&w.slice(-2)=="px"){
return window.parseInt(w,10);
}
}
return html.contentBox(c).w;
});
if(_16d2){
array.forEach(this.grid.layout.cells,function(cell,idx){
if(cell.view==this){
var _16d5=cell.view.getHeaderCellNode(cell.index);
if(_16d5&&html.hasAttr(_16d5,"vIdx")){
var vIdx=window.parseInt(html.attr(_16d5,"vIdx"));
this.setColWidth(idx,_16d4[vIdx]);
html.removeAttr(_16d5,"vIdx");
}
}
},this);
return true;
}
return false;
},adaptHeight:function(_16d6){
if(!this.grid._autoHeight){
var h=(this.domNode.style.height&&parseInt(this.domNode.style.height.replace(/px/,""),10))||this.domNode.clientHeight;
var self=this;
var _16d7=function(){
var v;
for(var i in self.grid.views.views){
v=self.grid.views.views[i];
if(v!==self&&v.hasHScrollbar()){
return true;
}
}
return false;
};
if(_16d6||(this.noscroll&&_16d7())){
h-=_16ae.getScrollbar().h;
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
},renderRow:function(_16d8){
var _16d9=this.createRowNode(_16d8);
this.buildRow(_16d8,_16d9);
return _16d9;
},createRowNode:function(_16da){
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
node[util.rowIndexTag]=_16da;
this.rowNodes[_16da]=node;
return node;
},buildRow:function(_16db,_16dc){
this.buildRowContent(_16db,_16dc);
this.styleRow(_16db,_16dc);
},buildRowContent:function(_16dd,_16de){
_16de.innerHTML=this.content.generateHtml(_16dd,_16dd);
if(this.flexCells&&this.contentWidth){
_16de.firstChild.style.width=this.contentWidth;
}
util.fire(this,"onAfterRow",[_16dd,this.structure.cells,_16de]);
},rowRemoved:function(_16df){
if(_16df>=0){
this._cleanupRowWidgets(this.getRowNode(_16df));
}
this.grid.edit.save(this,_16df);
delete this.rowNodes[_16df];
},getRowNode:function(_16e0){
return this.rowNodes[_16e0];
},getCellNode:function(_16e1,_16e2){
var row=this.getRowNode(_16e1);
if(row){
return this.content.getCellNode(row,_16e2);
}
},getHeaderCellNode:function(_16e3){
if(this.headerContentNode){
return this.header.getCellNode(this.headerContentNode,_16e3);
}
},styleRow:function(_16e4,_16e5){
_16e5._style=_16b2(_16e5);
this.styleRowNode(_16e4,_16e5);
},styleRowNode:function(_16e6,_16e7){
if(_16e7){
this.doStyleRowNode(_16e6,_16e7);
}
},doStyleRowNode:function(_16e8,_16e9){
this.grid.styleRowNode(_16e8,_16e9);
},updateRow:function(_16ea){
var _16eb=this.getRowNode(_16ea);
if(_16eb){
_16eb.style.height="";
this.buildRow(_16ea,_16eb);
}
return _16eb;
},updateRowStyles:function(_16ec){
this.styleRowNode(_16ec,this.getRowNode(_16ec));
},lastTop:0,firstScroll:0,_nativeScroll:false,doscroll:function(_16ed){
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
},setColWidth:function(_16ee,_16ef){
this.grid.setCellWidth(_16ee,_16ef+"px");
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
var _16f0=_16a8("dojox.grid._GridAvatar",_16b0,{construct:function(){
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
var _16f1=this.manager.source,node;
if(_16f1.creator){
node=_16f1._normalizedCreator(_16f1.getItem(this.manager.nodes[0].id).data,"avatar").node;
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
var m=_16b1.manager();
this.oldOffsetY=m.OFFSET_Y;
m.OFFSET_Y=1;
},destroy:function(){
_16b1.manager().OFFSET_Y=this.oldOffsetY;
this.inherited(arguments);
}});
var _16f2=_16b1.manager().makeAvatar;
_16b1.manager().makeAvatar=function(){
var src=this.source;
if(src.viewIndex!==undefined&&!html.hasClass(win.body(),"dijit_a11y")){
return new _16f0(this);
}
return _16f2.call(_16b1.manager());
};
return _16b5;
});
},"davinci/ve/ObjectWidget":function(){
define(["dojo/_base/declare","dojo/dom-attr","./_Widget"],function(_16f3,_16f4,_16f5){
return _16f3("davinci.ve.ObjectWidget",_16f5,{isObjectWidget:true,constructor:function(_16f6,node,_16f7,_16f8,_16f9){
if(typeof _16f7==="string"){
_16f4.set(node,"data-dojo-type",_16f7);
if(_16f9){
_16f9.addAttribute("data-dojo-type",_16f7);
}
}
},postCreate:function(){
var id=this._params.jsId,dj=require("davinci/ve/widget")._dojo(this.domNode),_16fa;
if(id){
_16f4.set(this.domNode,"jsId",id);
var type=this.getObjectType();
if(type){
var c=dj.getObject(type);
if(c){
if(c.markupFactory){
_16fa=c.markupFactory(this._params,this.domNode,c);
}else{
if(c.prototype&&c.prototype.markupFactory){
_16fa=c.prototype.markupFactory(this._params,this.domNode,c);
}else{
_16fa=new c(this._params,this.domNode);
}
}
if(_16fa){
_16fa._edit_object_id=id;
dj.setObject(id,_16fa);
}
}
}
}else{
id=this.getObjectId();
if(id){
_16fa=dj.getObject(id);
if(_16fa){
_16fa._edit_object_id=id;
}
}
}
},getObjectType:function(){
var node=this.domNode;
return _16f4.get(node,"data-dojo-type")||_16f4.get(node,"dojoType");
},getObjectId:function(){
return _16f4.get(this.domNode,"jsId");
},_getChildren:function(){
return [];
}});
});
},"*now":function(r){
r(["dojo/i18n!*preload*maq-metadata-html/html/nls/FieldsetInput*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("maq-metadata-html/html/FieldsetInput",["dojo/_base/declare","davinci/ve/input/SmartInput","davinci/ve/commands/ModifyCommand","dojo/i18n!./nls/html"],function(_16fb,_16fc,_16fd,_16fe){
return _16fb(_16fc,{property:"value",displayOnCreate:"true",multiLine:"false",format:"rows",supportsHTML:"false",helpText:"",constructor:function(){
this.helpText=_16fe.fieldsetInputHelp;
},serialize:function(_16ff,_1700,value){
var data=_16ff.getData();
var _1701=data.children;
var _1702="";
for(var i=0;i<_1701.length;i++){
var child=_1701[i];
if(child.type==="html.legend"){
if(typeof child.children==="string"){
var text=child.children;
text=dojox.html.entities.decode(text);
_1702=text;
}
}
}
_1700(_1702);
},update:function(_1703,value){
var data=_1703.getData();
var _1704=data.children;
var _1705=false;
for(var i=0;i<_1704.length;i++){
var child=_1704[i];
if(child.type==="html.legend"){
child.children=value;
_1705=true;
break;
}
}
if(!_1705){
var _1706=this._createLegend(value);
if(typeof _1704==="string"){
_1704=[];
}
_1704.push(_1706);
}
var _1707=new _16fd(_1703,null,_1704);
this._getContext().getCommandStack().execute(_1707);
return _1707.newWidget;
},_createLegend:function(text){
return {type:"html.legend",children:text};
},_getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},_getContext:function(){
var _1708=this._getEditor();
return _1708&&(_1708.getContext&&_1708.getContext()||_1708.context);
}});
});
