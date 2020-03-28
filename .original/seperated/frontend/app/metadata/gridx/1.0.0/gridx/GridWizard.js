//>>built
define("maq-metadata-gridx/gridx/GridWizard",["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/StackContainer","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/form/Button","./GridWizardDataSourcePanel","./GridWizardSelectColumnsPanel","./GridWizardPreviewPanel","davinci/ve/widget","maq-metadata-dojo/dojo/data/DataStoreBasedWidgetInput","dojo/i18n!./nls/gridx","dojo/i18n!dijit/nls/common"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f){
return _1([_2,_3,_4],{templateString:"<div data-dojo-attach-point='containerNode'></div>",postCreate:function(){
this._widget=_c.byId(this.widgetId);
this._connections=[];
this._pages=[];
this._pages.push({pageHandler:new _9()});
this._pages.push({pageHandler:new _a()});
this._pages.push({pageHandler:new _b()});
this._createWizard();
window.setTimeout(dojo.hitch(this,function(){
this.borderContainer.resize();
}),0);
this._subs=[dojo.subscribe(this.wizardStackContainer.id+"-selectChild",dojo.hitch(this,this._onPageSelected))];
},_createWizard:function(){
var _10=this.borderContainer=new _6({design:"headline",gutters:false,liveSplitters:false});
dojo.addClass(_10.domNode,"gridWizard");
dojo.addClass(_10.domNode,"dijitDialogPaneContentArea");
this.containerNode.appendChild(_10.domNode);
var _11=this._createTopSection();
_10.addChild(_11);
var _12=this._createMainSection();
_10.addChild(_12);
var _13=this._createBottomSection();
this.containerNode.appendChild(_13);
},_createTopSection:function(){
var _14=new _7({region:"top"});
dojo.addClass(_14.domNode,"steps");
dojo.forEach(this._pages,function(_15,_16){
var _17=this._createStepHeader(_15,_16);
dojo.place(_17,_14.domNode);
}.bind(this));
return _14;
},_createStepHeader:function(_18,_19){
var _1a=dojo.create("div");
if(_19==0){
dojo.addClass(_1a,"crumbs");
dojo.addClass(_1a,"current");
dojo.addClass(_1a,"sep");
}else{
if(_19==1){
dojo.addClass(_1a,"crumbs");
dojo.addClass(_1a,"sep");
}else{
if(_19==2){
dojo.addClass(_1a,"crumbs");
dojo.addClass(_1a,"crumbsLast");
}
}
}
this._connections.push(dojo.connect(_1a,"onclick",dojo.hitch(this,function(e){
this.select(e.target);
})));
var _1b=dojo.create("div");
if(_19==0){
dojo.addClass(_1b,"done");
}else{
dojo.addClass(_1b,"todo");
}
dojo.place(_1b,_1a);
var _1c=_18.pageHandler.getStepLabel();
var _1d=dojo.create("span",{innerHTML:dojo.replace(_e.stepHeader,[_19+1,_1c])});
dojo.place(_1d,_1a);
_18.stepHeader=_1a;
_18.stepHeaderIcon=_1b;
return _1a;
},_createMainSection:function(){
var _1e=this.wizardStackContainer=new _5({region:"center",});
dojo.addClass(_1e.domNode,"wizardStackContainer");
dojo.forEach(this._pages,function(_1f){
var _20=new _7();
dojo.addClass(_20.domNode,"pageNode");
_1e.addChild(_20);
_1f.pageContainer=_20;
dojo.addClass(_1f.pageHandler.domNode,"wizardPanel");
_20.set("content",_1f.pageHandler);
}.bind(this));
var _21=this._pages[0].pageHandler;
this._connections.push(dojo.connect(_21,"onShow",dojo.hitch(this,function(){
if(!_21.isPopulated()){
this._populatePage(_21);
}
})));
return _1e;
},_createBottomSection:function(){
var _22=dojo.create("div");
dojo.addClass(_22,"dijitDialogPaneActionBar");
dojo.addClass(_22,"dialogButtonContainerOverride");
var _23=this.reviewMsg=dojo.create("div");
dojo.addClass(_23,"reviewMsg");
dojo.place(_23,_22);
var _24=this.prev=dojo.create("button");
dojo.addClass(_24,"maqSecondaryButton");
_24.innerHTML=_e.back;
dojo.place(_24,_22);
var _25=this.next=dojo.create("button");
dojo.addClass(_25,"maqSecondaryButton");
_25.innerHTML=_e.next;
dojo.place(_25,_22);
var _26=this.finish=dojo.create("button");
dojo.addClass(_26,"maqPrimaryButton");
_26.innerHTML=_e.finish;
dojo.place(_26,_22);
var _27=dojo.create("a");
dojo.addClass(_27,"cancelButton");
dojo.addClass(_27,"maqSecondaryButton");
_27.href="javascript:void(0);";
_27.innerHTML=_f.buttonCancel;
this._connections.push(dojo.connect(_27,"onclick",dojo.hitch(this,function(){
this.onCancel();
})));
dojo.place(_27,_22);
this._initButtons();
return _22;
},_initButtons:function(){
this.finish=new _8({onClick:dojo.hitch(this,function(){
this._finish();
}),},this.finish);
dojo.addClass(this.finish.domNode,"bottomButton");
this.next=new _8({onClick:dojo.hitch(this,function(){
this._forward();
})},this.next);
dojo.addClass(this.next.domNode,"bottomButton");
this.prev=new _8({onClick:dojo.hitch(this,function(){
this._back();
}),disabled:true},this.prev);
dojo.addClass(this.prev.domNode,"bottomButton");
},_forward:function(){
var _28=this.wizardStackContainer.selectedChildWidget;
var _29=this._getPageIndexByContainer(_28);
var _2a=this._pages[_29];
var _2b=this._pages[_29+1];
if(this._checkValidity(_2a.pageHandler)){
var _2c=function(_2d){
this._clearErrorMessage();
this.wizardStackContainer.forward();
}.bind(this);
this._populatePage(_2b.pageHandler,_2c);
}
},_getPageIndexByHandler:function(_2e){
var _2f=-1;
dojo.some(this._pages,function(_30,_31){
if(_30.pageHandler==_2e){
_2f=_31;
return true;
}
});
return _2f;
},_getPageIndexByContainer:function(_32){
var _33=-1;
dojo.some(this._pages,function(_34,_35){
if(_34.pageContainer==_32){
_33=_35;
return true;
}
});
return _33;
},_getPageIndexByHeader:function(_36){
var _37=-1;
dojo.some(this._pages,function(_38,_39){
if(_38.stepHeader==_36){
_37=_39;
return true;
}
});
return _37;
},_back:function(){
this._clearErrorMessage();
this.wizardStackContainer.back();
},select:function(_3a){
this._clearErrorMessage();
var _3b=this.wizardStackContainer;
var _3c=_3b.selectedChildWidget;
var _3d=this._getPageIndexByContainer(_3c);
var _3e=this._getPageIndexByHeader(_3a);
if(_3e<0){
_3e=this._getPageIndexByHeader(_3a.parentElement);
}
desiredPage=this._pages[_3e];
if(_3e>_3d){
if(!this._checkValidity(this._pages[0].pageHandler)){
return;
}
var _3f=function(_40){
_3b.selectChild(desiredPage.pageContainer,true);
}.bind(this);
if(_3e==1){
this._populatePage(desiredPage.pageHandler,_3f);
}else{
var _41=function(_42){
if(!this._checkValidity(this._pages[1].pageHandler)){
return;
}
this._populatePage(desiredPage.pageHandler,_3f);
}.bind(this);
this._populatePage(this._pages[1].pageHandler,_41);
}
}else{
_3b.selectChild(desiredPage.pageContainer,true);
}
},_checkValidity:function(_43){
var _44=true;
var _45=_43.isValid();
switch(typeof _45){
case "boolean":
valid=_45;
break;
case "string":
this._showErrorMessage(_45);
_44=false;
break;
}
this._updateStepIcons();
return _44;
},_updateStepIcons:function(){
dojo.forEach(this._pages,function(_46){
if(_46.pageHandler.isPopulated()&&!(_46.pageHandler.isValid()==true)){
dojo.removeClass(_46.stepHeaderIcon,"done");
dojo.addClass(_46.stepHeaderIcon,"todo");
}else{
dojo.addClass(_46.stepHeaderIcon,"done");
dojo.removeClass(_46.stepHeaderIcon,"todo");
}
});
},_showErrorMessage:function(_47){
this.reviewMsg.innerHTML=_47;
},_clearErrorMessage:function(){
this._showErrorMessage("");
this._updateStepIcons();
},_populatePage:function(_48,_49){
var _4a=this._getPageIndexByHandler(_48);
var _4b=false;
if(_4a>0){
var _4c=this._pages[_4a-1];
_4b=_4c.pageHandler.isDirty();
}
if(!_48.isPopulated()||_4b){
this._populatePageHelper(_48,_4a,_49);
}else{
if(_49){
_49(_48);
}
this._updateStepIcons();
}
},_populatePageHelper:function(_4d,_4e,_4f){
if(_4e==0){
_4d.populate(this._widget,_4f);
this._updateStepIcons();
}else{
var _50=function(_51){
if(_4e==1){
_4d.populate(this._widget,_51);
}else{
var _52=this._pages[1].pageHandler.getTargetColumnIds();
_4d.populate(this._widget,_51,_52,this._pages[0].pageHandler._gridInput);
}
if(_4f){
_4f(_4d,true);
}
this._updateStepIcons();
}.bind(this);
this._getUpdateCompoundCommand(_50);
}
},_getUpdateCompoundCommand:function(_53){
var _54=this._pages[0].pageHandler;
if(_54.isDirty()||!this._compoundCommand){
for(var i=1;i<this._pages.length;i++){
this._pages[i].pageHandler.unpopulate();
}
var _55=function(_56){
this._compoundCommand=_56;
_53(this._compoundCommand);
}.bind(this);
_54.getUpdateWidgetCommand(_55);
}else{
_53(this._compoundCommand);
}
},_onPageSelected:function(_57){
this.prev.set("disabled",_57.isFirstChild);
this.next.set("disabled",_57.isLastChild);
dojo.forEach(this._pages,function(_58){
dojo.removeClass(_58.stepHeader,"current");
});
var _59=this._getPageIndexByContainer(_57);
dojo.addClass(this._pages[_59].stepHeader,"current");
},_finish:function(_5a){
this._clearErrorMessage();
if(this._pages[0].pageHandler.isDirty()){
for(var i=1;i<this._pages.length;i++){
this._pages[i].pageHandler.unpopulate();
}
}else{
if(this._pages[1].pageHandler.isDirty()){
this._pages[2].pageHandler.unpopulate();
}
}
if(!this._checkValidity(this._pages[0].pageHandler)){
return;
}
var _5b=function(_5c){
if(this._pages[1].pageHandler.isPopulated()&&!this._checkValidity(this._pages[1].pageHandler)){
return;
}
if(this._pages[2].pageHandler.isPopulated()&&!this._checkValidity(this._pages[2].pageHandler)){
return;
}
this.onFinish();
}.bind(this);
this._getUpdateCompoundCommand(_5b);
},updateWidget:function(){
var _5d=function(_5e){
this._updateWidgetHelper(_5e);
}.bind(this);
this._getUpdateCompoundCommand(_5d);
},_updateWidgetHelper:function(_5f){
var _60=null;
var _61=null;
if(this._pages[2].pageHandler.isPopulated()){
_60=this._pages[2].pageHandler.getUpdatedColumnStructure();
}else{
if(this._pages[1].pageHandler.isPopulated()){
_61=this._pages[1].pageHandler.getTargetColumnIds();
}
}
var _62=null;
var _63=null;
dojo.some(_5f._commands,function(_64){
if(_64._properties&&_64._properties.structure){
_62=_64;
_63=_62._properties;
return true;
}
});
if(_60||_61){
var _65=_63.structure;
var _66=[];
if(_60){
dojo.forEach(_60,function(_67){
dojo.some(_65,function(_68){
if(_67.field===_68.field){
var _69=dojo.clone(_68);
_69.width=_67.width;
_69.name=_67.name;
_66.push(_69);
return true;
}
});
});
}else{
if(_61){
dojo.forEach(_61,function(_6a){
dojo.some(_65,function(_6b){
if(_6a===_6b.field){
_66.push(_6b);
return true;
}
});
});
}
}
_63.structure=_66;
var _6c=_63["data-dojo-props"];
_6c=_d.setPropInDataDojoProps(_6c,"structure",_66);
_63["data-dojo-props"]=_6c;
}
var _6d=this._widget.getContext();
_6d.getCommandStack().execute(_5f);
_6d.select(_62.newWidget);
},resize:function(){
this.borderContainer.resize();
},onCancel:function(){
},onFinish:function(){
},destroy:function(){
this.inherited(arguments);
this._subs.forEach(dojo.unsubscribe);
delete this._subs;
this._connections.forEach(dojo.disconnect);
delete this._connections;
}});
});
