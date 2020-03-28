//>>built
define("maq-metadata-dojo/dojo/data/ItemFileReadStoreInput",["dojo/_base/declare","dojo/data/ItemFileReadStore","davinci/ve/input/SmartInput","davinci/ve/commands/ModifyCommand","davinci/ve/commands/RemoveCommand","davinci/ve/widget","system/resource","dojo/i18n!dijit/nls/common","dojo/i18n!../nls/dojo","davinci/ve/utils/URLRewrite"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
return _1(_3,{propertyName:null,property:null,displayOnCreate:"true",delimiter:", ",propertyNames:"jsId, url",properties:"myDataStore, /davinci/davinciUser/data.json",serialize:function(_b,_c,_d){
_c(this.properties);
},parse:function(_e){
var _f=this.parseItemsInColumns(_e);
return _f;
},update:function(_10,_11){
var _12=this.propertyNames.split(",");
var _13={};
for(var i=0;i<_11.length;++i){
if(i<_12.length){
var _14=dojo.trim(_12[i]);
_13[_14]=_11[i].text;
}
}
var _15=new _4(_10,_13,null,this._getContext());
this._getContext().getCommandStack().execute(_15);
var ds=new dojo.data.ItemFileReadStore({url:_13.url});
var _16=_13.jsId;
dojo.publish("/davinci/data/datastoreAdded",[_16,ds,_10.type]);
},_getContainer:function(_17){
while(_17){
if((_17.isContainer||_17.isLayoutContainer)&&_17.declaredClass!="dojox.layout.ScrollPane"){
return _17;
}
console.error("unexpected?");
_17=_6.getParent(_17);
}
return undefined;
},_getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},_getContext:function(){
var _18=this._getEditor();
return _18&&(_18.getContext&&_18.getContext()||_18.context);
},show:function(_19){
this._widget=_6.byId(_19);
this._inline=new dijit.Dialog({title:_9.dataStoreDetails,style:"width: 500px; height:350px"});
var s="<div dojotype=\"dijit.layout.BorderContainer\" design=\"headline\" livesplitters=\"true\" iscontainer=\"true\" style=\"height: 300px; width: 480px; padding: 0px;\">";
s+="    <div dojotype=\"dijit.layout.ContentPane\" parseonload=\"true\" iscontainer=\"true\" region=\"bottom\" style=\"height: 50px; bottom: 5px; left: 78px; right: 78px;\" splitter=\"true\">";
s+="        <input id=\"okButton\" type=\"button\" dojotype=\"dijit.form.Button\" label=\""+_8.buttonOk+"\" showlabel=\"true\" scrollonfocus=\"true\" style=\"top: 20px; left: 95px; position: absolute;\">";
s+="        <input id=\"cancelButton\" type=\"button\" dojotype=\"dijit.form.Button\" label=\""+_8.buttonCancel+"\" showlabel=\"true\" scrollonfocus=\"true\" style=\"left: 145px; top: 20px; position: absolute;\">";
s+="    </div>";
s+="    <div dojotype=\"dijit.layout.ContentPane\" parseonload=\"true\" iscontainer=\"true\" region=\"center\" style=\"top: 78px; left: 78px; right: 78px; bottom: 78px;\">";
s+="        <div style=\"width: 282px; height: 37px;\">";
s+="            <label id=\"LABEL_T\" style=\"left: 15px; position: absolute; top: 20px;\">Type</label>";
s+="            <select id=\"typeInput\" type=\"text\" dojotype=\"dijit.form.Select\" style=\"position: absolute; left: 100px; top: 18px; width: 350px;\">";
s+="                <option value=\"dojo.data.ItemFileReadStore\">"+_9.itemFileReadStore+"</option>";
s+="                <option value=\"dojo.data.ItemFileWriteStore\">"+_9.itemFileWriteStore+"</option>";
s+="            </select>";
s+="        </div>";
s+="        <div style=\"width: 282px; height: 37px;\">";
s+="            <label id=\"LABEL_0\" style=\"left: 15px; position: absolute; top: 55px;\">"+_9.dataStoreId+"</label>";
s+="            <input id=\"jsIdInput\" type=\"text\" dojotype=\"dijit.form.TextBox\" style=\"position: absolute; left: 100px; top: 55px; width: 350px;\">";
s+="        </div>";
s+="        <div style=\"width: 282px; height: 37px;\">";
s+="            <label id=\"LABEL_1\" style=\"left: 15px; position: absolute; top: 90px;\">"+_9.url+"</label>";
s+="            <input id=\"urlInput\" type=\"text\" dojotype=\"dijit.form.TextBox\" style=\"top: 90px; left: 100px; position: absolute; width: 350px;\">";
s+="        </div>";
s+="        <div style=\"width: 282px; height: 37px;\">";
s+="            <label id=\"LABEL_2\" style=\"left: 15px; position: absolute; top: 125px;\">"+_9.scriptLabel+"</label>";
s+="            <input id=\"scriptInput\" type=\"text\" dojotype=\"dijit.form.Textarea\" style=\"top: 125px; left: 100px; position: absolute; width: 350px;\">";
s+="        </div>";
s+="    </div>";
s+="</div>";
this._inline.attr("content",s);
this._inline.onCancel=dojo.hitch(this,"cancel");
this._inline.callBackObj=this;
this._inline.show();
var _1a=dijit.byId("typeInput");
var _1b=this._widget.type;
_1a.setValue(_1b);
var _1c=dijit.byId("jsIdInput");
var _1d=this._widget._srcElement.getAttribute("jsId")||"myDataStore";
_1c.setValue(_1d);
var _1e=dijit.byId("urlInput");
var url=this._widget._srcElement.getAttribute("url");
if(url){
if(url[0]==="."){
url=url.substring(1);
}
_1e.setValue(_a.encodeURI(_7.root.getURL()+url));
}
var _1f=dijit.byId("scriptInput");
var _20=this._widget._srcElement.getAttribute("data");
if(_20){
_1f.setValue(_20);
}
var _21=dijit.byId("okButton");
_21.onClick=dojo.hitch(this,"updateWidget");
var _22=dijit.byId("cancelButton");
_22.onClick=dojo.hitch(this,"cancel");
},cancel:function(){
var _23=new _5(this._widget);
this._getContext().getCommandStack().execute(_23);
this.die();
},die:function(){
this._inline.destroyDescendants();
this._inline.destroy();
delete this._inline;
},updateWidget:function(){
var _24={};
var _25=dijit.byId("jsIdInput");
_24.jsId=_25.getValue();
var _26=dijit.byId("urlInput");
var url=_26.getValue();
if(url&&url>""){
_24.url=url;
}
var _27=dijit.byId("scriptInput");
var _28=_27.getValue();
if(_28&&_28>""){
_24.data=dojo.fromJson(_28);
}
var _29=dijit.byId("typeInput");
this._widget.type=_29.getValue();
this.die();
var _2a=new _4(this._widget,_24,null,this._getContext());
this._getContext().getCommandStack().execute(_2a);
var ds;
if(url&&url>""){
ds=new _2({url:_24.url});
}else{
if(_28&&_28>""){
ds=new _2({data:_24.data});
}
}
var _2b=_24.jsId;
dojo.publish("/davinci/data/datastoreAdded",[_2b,ds,this._widget.type]);
}});
});
