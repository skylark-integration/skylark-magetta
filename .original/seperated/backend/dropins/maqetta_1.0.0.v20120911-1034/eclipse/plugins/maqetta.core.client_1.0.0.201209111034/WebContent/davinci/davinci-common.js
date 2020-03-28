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
require({cache:{"dijit/form/TextBox":function(){
require({cache:{"url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/TextBox",["dojo/_base/declare","dojo/dom-construct","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/sniff","./_FormValueWidget","./_TextBoxMixin","dojo/text!./templates/TextBox.html","../main"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
var _b=_1("dijit.form.TextBox",[_7,_8],{templateString:_9,_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" data-dojo-attach-point=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:_6("ie")?"disabled":"",baseClass:"dijitTextBox",postMixInProperties:function(){
var _c=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((_c=="hidden"||_c=="file")&&this.templateString==this.constructor.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
if(_6("ie")<9){
this.defer(function(){
try{
var s=_3.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _d=this.domNode.getElementsByTagName("INPUT");
if(_d){
for(var i=0;i<_d.length;i++){
_d[i].style.fontFamily=ff;
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
this._phspan=_2.create("span",{className:"dijitPlaceHolder dijitInputField"},this.textbox,"after");
}
this._phspan.innerHTML="";
this._phspan.appendChild(this._phspan.ownerDocument.createTextNode(v));
this._updatePlaceHolder();
},_updatePlaceHolder:function(){
if(this._phspan){
this._phspan.style.display=(this.placeHolder&&!this.focused&&!this.textbox.value)?"":"none";
}
},_setValueAttr:function(_e,_f,_10){
this.inherited(arguments);
this._updatePlaceHolder();
},getDisplayedValue:function(){
_4.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use get('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},setDisplayedValue:function(_11){
_4.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_11);
},_onBlur:function(e){
if(this.disabled){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
if(_6("mozilla")){
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
if(_6("ie")){
_b.prototype._isTextSelected=function(){
var _12=this.ownerDocument.selection.createRange();
var _13=_12.parentElement();
return _13==this.textbox&&_12.text.length>0;
};
_a._setSelectionRange=_8._setSelectionRange=function(_14,_15,_16){
if(_14.createTextRange){
var r=_14.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_15);
r.moveEnd("character",_16-_15);
r.select();
}
};
}
return _b;
});
},"dijit/DialogUnderlay":function(){
define("dijit/DialogUnderlay",["dojo/_base/declare","dojo/dom-attr","dojo/window","./_Widget","./_TemplatedMixin","./BackgroundIframe"],function(_17,_18,_19,_1a,_1b,_1c){
return _17("dijit.DialogUnderlay",[_1a,_1b],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' data-dojo-attach-point='node'></div></div>",dialogId:"","class":"",_setDialogIdAttr:function(id){
_18.set(this.node,"id",id+"_underlay");
this._set("dialogId",id);
},_setClassAttr:function(_1d){
this.node.className="dijitDialogUnderlay "+_1d;
this._set("class",_1d);
},postCreate:function(){
this.ownerDocumentBody.appendChild(this.domNode);
},layout:function(){
var is=this.node.style,os=this.domNode.style;
os.display="none";
var _1e=_19.getBox(this.ownerDocument);
os.top=_1e.t+"px";
os.left=_1e.l+"px";
is.width=_1e.w+"px";
is.height=_1e.h+"px";
os.display="block";
},show:function(){
this.domNode.style.display="block";
this.layout();
this.bgIframe=new _1c(this.domNode);
},hide:function(){
this.bgIframe.destroy();
delete this.bgIframe;
this.domNode.style.display="none";
}});
});
},"dijit/_HasDropDown":function(){
define("dijit/_HasDropDown",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_1f,_20,_21,dom,_22,_23,_24,_25,has,_26,_27,on,_28,_29,_2a,_2b,_2c){
return _1f("dijit._HasDropDown",_2c,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
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
var _2d=this.dropDown,_2e=false;
if(e&&this._opened){
var c=_24.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_2e){
if(_23.contains(t,"dijitPopup")){
_2e=true;
}else{
t=t.parentNode;
}
}
if(_2e){
t=e.target;
if(_2d.onItemClick){
var _2f;
while(t&&!(_2f=_29.byNode(t))){
t=t.parentNode;
}
if(_2f&&_2f.onClick&&_2f.getParent){
_2f.getParent().onItemClick(_2f,e);
}
}
return;
}
}
}
if(this._opened){
if(_2d.focus&&_2d.autoFocus!==false){
this._focusDropDownTimer=this.defer(function(){
_2d.focus();
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
_21.stop(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _30={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_23.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_30+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
this.own(on(this._buttonNode,"mousedown",_27.hitch(this,"_onDropDownMouseDown")),on(this._buttonNode,"click",_27.hitch(this,"_onDropDownClick")),on(this.focusNode,"keydown",_27.hitch(this,"_onKey")),on(this.focusNode,"keyup",_27.hitch(this,"_onKeyUp")));
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
var d=this.dropDown,_31=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
_21.stop(e);
return;
}
}
if(d&&this._opened&&e.keyCode==_26.ESCAPE){
this.closeDropDown();
_21.stop(e);
}else{
if(!this._opened&&(e.keyCode==_26.DOWN_ARROW||((e.keyCode==_26.ENTER||e.keyCode==dojo.keys.SPACE)&&((_31.tagName||"").toLowerCase()!=="input"||(_31.type&&_31.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
_21.stop(e);
}
}
},_onKeyUp:function(){
if(this._toggleOnKeyUp){
delete this._toggleOnKeyUp;
this.toggleDropDown();
var d=this.dropDown;
if(d&&d.focus){
this.defer(_27.hitch(d,"focus"),1);
}
}
},_onBlur:function(){
var _32=_2a.curNode&&this.dropDown&&dom.isDescendant(_2a.curNode,this.dropDown.domNode);
this.closeDropDown(_32);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_33){
_33();
},loadAndOpenDropDown:function(){
var d=new _20(),_34=_27.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_34);
}else{
_34();
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
var _35=this.dropDown,_36=_35.domNode,_37=this._aroundNode||this.domNode,_38=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_36.style.width){
this._explicitDDWidth=true;
}
if(_36.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _39={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_39.width="";
}
if(!this._explicitDDHeight){
_39.height="";
}
_25.set(_36,_39);
var _3a=this.maxHeight;
if(_3a==-1){
var _3b=_28.getBox(this.ownerDocument),_3c=_24.position(_37,false);
_3a=Math.floor(Math.max(_3c.y,_3b.h-(_3c.y+_3c.h)));
}
_2b.moveOffScreen(_35);
if(_35.startup&&!_35._started){
_35.startup();
}
var mb=_24.getMarginSize(_36);
var _3d=(_3a&&mb.h>_3a);
_25.set(_36,{overflowX:"visible",overflowY:_3d?"auto":"visible"});
if(_3d){
mb.h=_3a;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_37.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_37.offsetWidth);
}else{
delete mb.w;
}
}
if(_27.isFunction(_35.resize)){
_35.resize(mb);
}else{
_24.setMarginBox(_36,mb);
}
}
var _3e=_2b.open({parent:this,popup:_35,around:_37,orient:this.dropDownPosition,onExecute:function(){
_38.closeDropDown(true);
},onCancel:function(){
_38.closeDropDown(true);
},onClose:function(){
_22.set(_38._popupStateNode,"popupActive",false);
_23.remove(_38._popupStateNode,"dijitHasDropDownOpen");
_38._set("_opened",false);
}});
_22.set(this._popupStateNode,"popupActive","true");
_23.add(this._popupStateNode,"dijitHasDropDownOpen");
this._set("_opened",true);
this.domNode.setAttribute("aria-expanded","true");
return _3e;
},closeDropDown:function(_3f){
if(this._focusDropDownTimer){
this._focusDropDownTimer.remove();
delete this._focusDropDownTimer;
}
if(this._opened){
this.domNode.setAttribute("aria-expanded","false");
if(_3f){
this.focus();
}
_2b.close(this.dropDown);
this._opened=false;
}
}});
});
},"dijit/_MenuBase":function(){
define("dijit/_MenuBase",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/mouse","dojo/on","dojo/window","./a11yclick","./popup","./registry","./_Widget","./_KeyNavContainer","./_TemplatedMixin"],function(_40,_41,dom,_42,_43,_44,_45,on,_46,_47,pm,_48,_49,_4a,_4b){
return _41("dijit._MenuBase",[_49,_4b,_4a],{parentMenu:null,popupDelay:500,autoFocus:false,postCreate:function(){
var _4c=this,_4d=function(_4e){
return _43.contains(_4e,"dijitMenuItem");
};
this.own(on(this.containerNode,on.selector(_4d,_45.enter),function(){
_4c.onItemHover(_48.byNode(this));
}),on(this.containerNode,on.selector(_4d,_45.leave),function(){
_4c.onItemUnhover(_48.byNode(this));
}),on(this.containerNode,on.selector(_4d,_47),function(evt){
_4c.onItemClick(_48.byNode(this),evt);
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
var _4f=this._getTopMenu();
if(_4f&&_4f._isMenuBar){
_4f.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _50=this.currentPopup.parentMenu;
if(_50.focusedChild){
_50.focusedChild._setSelected(false);
}
_50.focusedChild=this.currentPopup.from_item;
_50.focusedChild._setSelected(true);
this._stopPendingCloseTimer(this.currentPopup);
}
},onItemHover:function(_51){
if(this.isActive){
this.focusChild(_51);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){
this.hover_timer=this.defer("_openPopup",this.popupDelay);
}
}
if(this.focusedChild){
this.focusChild(_51);
}
this._hoveredChild=_51;
_51._set("hovering",true);
},_onChildBlur:function(_52){
this._stopPopupTimer();
_52._setSelected(false);
var _53=_52.popup;
if(_53){
this._stopPendingCloseTimer(_53);
_53._pendingClose_timer=this.defer(function(){
_53._pendingClose_timer=null;
if(_53.parentMenu){
_53.parentMenu.currentPopup=null;
}
pm.close(_53);
},this.popupDelay);
}
},onItemUnhover:function(_54){
if(this.isActive){
this._stopPopupTimer();
}
if(this._hoveredChild==_54){
this._hoveredChild=null;
}
_54._set("hovering",false);
},_stopPopupTimer:function(){
if(this.hover_timer){
this.hover_timer=this.hover_timer.remove();
}
},_stopPendingCloseTimer:function(_55){
if(_55._pendingClose_timer){
_55._pendingClose_timer=_55._pendingClose_timer.remove();
}
},_stopFocusTimer:function(){
if(this._focus_timer){
this._focus_timer=this._focus_timer.remove();
}
},_getTopMenu:function(){
for(var top=this;top.parentMenu;top=top.parentMenu){
}
return top;
},onItemClick:function(_56,evt){
if(typeof this.isShowingNow=="undefined"){
this._markActive();
}
this.focusChild(_56);
if(_56.disabled){
return false;
}
if(_56.popup){
this._openPopup(evt.type=="keypress");
}else{
this.onExecute();
_56._onClick?_56._onClick(evt):_56.onClick(evt);
}
},_openPopup:function(_57){
this._stopPopupTimer();
var _58=this.focusedChild;
if(!_58){
return;
}
var _59=_58.popup;
if(!_59.isShowingNow){
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_59.parentMenu=this;
_59.from_item=_58;
var _5a=this;
pm.open({parent:this,popup:_59,around:_58.domNode,orient:this._orient||["after","before"],onCancel:function(){
_5a.focusChild(_58);
_5a._cleanUp();
_58._setSelected(true);
_5a.focusedChild=_58;
},onExecute:_44.hitch(this,"_cleanUp")});
this.currentPopup=_59;
_59.connect(_59.domNode,"onmouseenter",_44.hitch(_5a,"_onPopupHover"));
}
if(_57&&_59.focus){
_59._focus_timer=this.defer(_44.hitch(_59,function(){
this._focus_timer=null;
this.focus();
}));
}
},_markActive:function(){
this.isActive=true;
_43.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_43.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_40.indexOf(this._focusManager.activeStack,this.id)>=0){
_42.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
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
},_onItemFocus:function(_5b){
if(this._hoveredChild&&this._hoveredChild!=_5b){
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
},"dojo/i18n":function(){
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json","module"],function(_5c,_5d,has,_5e,_5f,_60,xhr,_61,_62){
has.add("dojo-preload-i18n-Api",1);
1||has.add("dojo-v1x-i18n-Api",1);
var _63=_5c.i18n={},_64=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_65=function(_66,_67,_68,_69){
for(var _6a=[_68+_69],_6b=_67.split("-"),_6c="",i=0;i<_6b.length;i++){
_6c+=(_6c?"-":"")+_6b[i];
if(!_66||_66[_6c]){
_6a.push(_68+_6c+"/"+_69);
}
}
return _6a;
},_6d={},_6e=function(_6f,_70,_71){
_71=_71?_71.toLowerCase():_5c.locale;
_6f=_6f.replace(/\./g,"/");
_70=_70.replace(/\./g,"/");
return (/root/i.test(_71))?(_6f+"/nls/"+_70):(_6f+"/nls/"+_71+"/"+_70);
},_72=_5c.getL10nName=function(_73,_74,_75){
return _73=_62.id+"!"+_6e(_73,_74,_75);
},_76=function(_77,_78,_79,_7a,_7b,_7c){
_77([_78],function(_7d){
var _7e=_60.clone(_7d.root),_7f=_65(!_7d._v1x&&_7d,_7b,_79,_7a);
_77(_7f,function(){
for(var i=1;i<_7f.length;i++){
_7e=_60.mixin(_60.clone(_7e),arguments[i]);
}
var _80=_78+"/"+_7b;
_6d[_80]=_7e;
_7c();
});
});
},_81=function(id,_82){
return /^\./.test(id)?_82(id):id;
},_83=function(_84){
var _85=_5f.extraLocale||[];
_85=_60.isArray(_85)?_85:[_85];
_85.push(_84);
return _85;
},_86=function(id,_87,_88){
if(has("dojo-preload-i18n-Api")){
var _89=id.split("*"),_8a=_89[1]=="preload";
if(_8a){
if(!_6d[id]){
_6d[id]=1;
_8b(_89[2],_61.parse(_89[3]),1,_87);
}
_88(1);
}
if(_8a||_8c(id,_87,_88)){
return;
}
}
var _8d=_64.exec(id),_8e=_8d[1]+"/",_8f=_8d[5]||_8d[4],_90=_8e+_8f,_91=(_8d[5]&&_8d[4]),_92=_91||_5c.locale,_93=_90+"/"+_92,_94=_91?[_92]:_83(_92),_95=_94.length,_96=function(){
if(!--_95){
_88(_60.delegate(_6d[_93]));
}
};
_5e.forEach(_94,function(_97){
var _98=_90+"/"+_97;
if(has("dojo-preload-i18n-Api")){
_99(_98);
}
if(!_6d[_98]){
_76(_87,_90,_8e,_8f,_97,_96);
}else{
_96();
}
});
};
if(has("dojo-unit-tests")){
var _9a=_63.unitTests=[];
}
if(has("dojo-preload-i18n-Api")||1){
var _9b=_63.normalizeLocale=function(_9c){
var _9d=_9c?_9c.toLowerCase():_5c.locale;
return _9d=="root"?"ROOT":_9d;
},_9e=function(mid,_9f){
return (1&&1)?_9f.isXdUrl(_5d.toUrl(mid+".js")):true;
},_a0=0,_a1=[],_8b=_63._preloadLocalizations=function(_a2,_a3,_a4,_a5){
_a5=_a5||_5d;
function _a6(mid,_a7){
if(_9e(mid,_a5)||_a4){
_a5([mid],_a7);
}else{
_b3([mid],_a7,_a5);
}
};
function _a8(_a9,_aa){
var _ab=_a9.split("-");
while(_ab.length){
if(_aa(_ab.join("-"))){
return;
}
_ab.pop();
}
_aa("ROOT");
};
function _ac(_ad){
_ad=_9b(_ad);
_a8(_ad,function(loc){
if(_5e.indexOf(_a3,loc)>=0){
var mid=_a2.replace(/\./g,"/")+"_"+loc;
_a0++;
_a6(mid,function(_ae){
for(var p in _ae){
_6d[_5d.toAbsMid(p)+"/"+loc]=_ae[p];
}
--_a0;
while(!_a0&&_a1.length){
_86.apply(null,_a1.shift());
}
});
return true;
}
return false;
});
};
_ac();
_5e.forEach(_5c.config.extraLocale,_ac);
},_8c=function(id,_af,_b0){
if(_a0){
_a1.push([id,_af,_b0]);
}
return _a0;
},_99=function(){
};
}
if(1){
var _b1={},_b2=new Function("__bundle","__checkForLegacyModules","__mid","__amdValue","var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"+"\t   require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return __amdValue;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_b3=function(_b4,_b5,_b6){
var _b7=[];
_5e.forEach(_b4,function(mid){
var url=_b6.toUrl(mid+".js");
function _86(_b8){
var _b9=_b2(_b8,_99,mid,_b1);
if(_b9===_b1){
_b7.push(_6d[url]=_b1.result);
}else{
if(_b9 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_b9);
_b9={};
}
_b7.push(_6d[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_b9:{root:_b9,_v1x:1}));
}
};
if(_6d[url]){
_b7.push(_6d[url]);
}else{
var _ba=_b6.syncLoadNls(mid);
if(_ba){
_b7.push(_ba);
}else{
if(!xhr){
try{
_b6.getText(url,true,_86);
}
catch(e){
_b7.push(_6d[url]={});
}
}else{
xhr.get({url:url,sync:true,load:_86,error:function(){
_b7.push(_6d[url]={});
}});
}
}
}
});
_b5&&_b5.apply(null,_b7);
};
_99=function(_bb){
for(var _bc,_bd=_bb.split("/"),_be=_5c.global[_bd[0]],i=1;_be&&i<_bd.length-1;_be=_be[_bd[i++]]){
}
if(_be){
_bc=_be[_bd[i]];
if(!_bc){
_bc=_be[_bd[i].replace(/-/g,"_")];
}
if(_bc){
_6d[_bb]=_bc;
}
}
return _bc;
};
_63.getLocalization=function(_bf,_c0,_c1){
var _c2,_c3=_6e(_bf,_c0,_c1);
_86(_c3,(!_9e(_c3,_5d)?function(_c4,_c5){
_b3(_c4,_c5,_5d);
}:_5d),function(_c6){
_c2=_c6;
});
return _c2;
};
if(has("dojo-unit-tests")){
_9a.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _c7;
_c7=_b2("{prop:1}",_99,"nonsense",_b1);
t.is({prop:1},_c7);
t.is(undefined,_c7[1]);
_c7=_b2("({prop:1})",_99,"nonsense",_b1);
t.is({prop:1},_c7);
t.is(undefined,_c7[1]);
_c7=_b2("{'prop-x':1}",_99,"nonsense",_b1);
t.is({"prop-x":1},_c7);
t.is(undefined,_c7[1]);
_c7=_b2("({'prop-x':1})",_99,"nonsense",_b1);
t.is({"prop-x":1},_c7);
t.is(undefined,_c7[1]);
_c7=_b2("define({'prop-x':1})",_99,"nonsense",_b1);
t.is(_b1,_c7);
t.is({"prop-x":1},_b1.result);
_c7=_b2("define('some/module', {'prop-x':1})",_99,"nonsense",_b1);
t.is(_b1,_c7);
t.is({"prop-x":1},_b1.result);
_c7=_b2("this is total nonsense and should throw an error",_99,"nonsense",_b1);
t.is(_c7 instanceof Error,true);
});
});
}
}
return _60.mixin(_63,{dynamic:true,normalize:_81,load:_86,cache:_6d});
});
},"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\"\n/></span>\n","dijit/form/_TextBoxMixin":function(){
define("dijit/form/_TextBoxMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","../main"],function(_c8,_c9,dom,_ca,_cb,_cc,on,_cd){
var _ce=_c9("dijit.form._TextBoxMixin",null,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_cf,_d0,_d1){
var _d2;
if(_cf!==undefined){
_d2=this.filter(_cf);
if(typeof _d1!="string"){
if(_d2!==null&&((typeof _d2!="number")||!isNaN(_d2))){
_d1=this.filter(this.format(_d2,this.constraints));
}else{
_d1="";
}
}
}
if(_d1!=null&&((typeof _d1)!="number"||!isNaN(_d1))&&this.textbox.value!=_d1){
this.textbox.value=_d1;
this._set("displayedValue",this.get("displayedValue"));
}
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_d1);
}
this.inherited(arguments,[_d2,_d0]);
},displayedValue:"",_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},_setDisplayedValueAttr:function(_d3){
if(_d3==null){
_d3="";
}else{
if(typeof _d3!="string"){
_d3=String(_d3);
}
}
this.textbox.value=_d3;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_d3);
}
},format:function(_d4){
return _d4==null?"":(_d4.toString?_d4.toString():_d4);
},parse:function(_d5){
return _d5;
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
var _d6=function(e){
var _d7;
if(e.type=="keydown"){
_d7=e.keyCode;
switch(_d7){
case _cb.SHIFT:
case _cb.ALT:
case _cb.CTRL:
case _cb.META:
case _cb.CAPS_LOCK:
case _cb.NUM_LOCK:
case _cb.SCROLL_LOCK:
return;
}
if(!e.ctrlKey&&!e.metaKey&&!e.altKey){
switch(_d7){
case _cb.NUMPAD_0:
case _cb.NUMPAD_1:
case _cb.NUMPAD_2:
case _cb.NUMPAD_3:
case _cb.NUMPAD_4:
case _cb.NUMPAD_5:
case _cb.NUMPAD_6:
case _cb.NUMPAD_7:
case _cb.NUMPAD_8:
case _cb.NUMPAD_9:
case _cb.NUMPAD_MULTIPLY:
case _cb.NUMPAD_PLUS:
case _cb.NUMPAD_ENTER:
case _cb.NUMPAD_MINUS:
case _cb.NUMPAD_PERIOD:
case _cb.NUMPAD_DIVIDE:
return;
}
if((_d7>=65&&_d7<=90)||(_d7>=48&&_d7<=57)||_d7==_cb.SPACE){
return;
}
var _d8=false;
for(var i in _cb){
if(_cb[i]===e.keyCode){
_d8=true;
break;
}
}
if(!_d8){
return;
}
}
}
_d7=e.charCode>=32?String.fromCharCode(e.charCode):e.charCode;
if(!_d7){
_d7=(e.keyCode>=65&&e.keyCode<=90)||(e.keyCode>=48&&e.keyCode<=57)||e.keyCode==_cb.SPACE?String.fromCharCode(e.keyCode):e.keyCode;
}
if(!_d7){
_d7=229;
}
if(e.type=="keypress"){
if(typeof _d7!="string"){
return;
}
if((_d7>="a"&&_d7<="z")||(_d7>="A"&&_d7<="Z")||(_d7>="0"&&_d7<="9")||(_d7===" ")){
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
var _d9={faux:true},_da;
for(_da in e){
if(_da!="layerX"&&_da!="layerY"){
var v=e[_da];
if(typeof v!="function"&&typeof v!="undefined"){
_d9[_da]=v;
}
}
}
_cc.mixin(_d9,{charOrCode:_d7,_wasConsumed:false,preventDefault:function(){
_d9._wasConsumed=true;
e.preventDefault();
},stopPropagation:function(){
e.stopPropagation();
}});
if(this.onInput(_d9)===false){
_d9.preventDefault();
_d9.stopPropagation();
}
if(_d9._wasConsumed){
return;
}
this.defer(function(){
this._onInput(_d9);
});
};
this.own(on(this.textbox,"keydown, keypress, paste, cut, input, compositionend",_cc.hitch(this,_d6)));
},_blankValue:"",filter:function(val){
if(val===null){
return this._blankValue;
}
if(typeof val!="string"){
return val;
}
if(this.trim){
val=_cc.trim(val);
}
if(this.uppercase){
val=val.toUpperCase();
}
if(this.lowercase){
val=val.toLowerCase();
}
if(this.propercase){
val=val.replace(/[^\s]+/g,function(_db){
return _db.substring(0,1).toUpperCase()+_db.substring(1);
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
_ce.selectInputText(this.textbox);
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
},_setTextDirAttr:function(_dc){
if(!this._created||this.textDir!=_dc){
this._set("textDir",_dc);
this.applyTextDir(this.focusNode,this.focusNode.value);
}
}});
_ce._setSelectionRange=_cd._setSelectionRange=function(_dd,_de,_df){
if(_dd.setSelectionRange){
_dd.setSelectionRange(_de,_df);
}
};
_ce.selectInputText=_cd.selectInputText=function(_e0,_e1,_e2){
_e0=dom.byId(_e0);
if(isNaN(_e1)){
_e1=0;
}
if(isNaN(_e2)){
_e2=_e0.value?_e0.value.length:0;
}
try{
_e0.focus();
_ce._setSelectionRange(_e0,_e1,_e2);
}
catch(e){
}
};
return _ce;
});
},"dojo/dnd/autoscroll":function(){
define("dojo/dnd/autoscroll",["../_base/lang","../sniff","../_base/window","../dom-geometry","../dom-style","../window"],function(_e3,has,win,_e4,_e5,_e6){
var _e7={};
_e3.setObject("dojo.dnd.autoscroll",_e7);
_e7.getViewport=_e6.getBox;
_e7.V_TRIGGER_AUTOSCROLL=32;
_e7.H_TRIGGER_AUTOSCROLL=32;
_e7.V_AUTOSCROLL_VALUE=16;
_e7.H_AUTOSCROLL_VALUE=16;
var _e8,doc=win.doc,_e9=Infinity,_ea=Infinity;
_e7.autoScrollStart=function(d){
doc=d;
_e8=_e6.getBox(doc);
var _eb=win.body(doc).parentNode;
_e9=Math.max(_eb.scrollHeight-_e8.h,0);
_ea=Math.max(_eb.scrollWidth-_e8.w,0);
};
_e7.autoScroll=function(e){
var v=_e8||_e6.getBox(doc),_ec=win.body(doc).parentNode,dx=0,dy=0;
if(e.clientX<_e7.H_TRIGGER_AUTOSCROLL){
dx=-_e7.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-_e7.H_TRIGGER_AUTOSCROLL){
dx=Math.min(_e7.H_AUTOSCROLL_VALUE,_ea-_ec.scrollLeft);
}
}
if(e.clientY<_e7.V_TRIGGER_AUTOSCROLL){
dy=-_e7.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-_e7.V_TRIGGER_AUTOSCROLL){
dy=Math.min(_e7.V_AUTOSCROLL_VALUE,_e9-_ec.scrollTop);
}
}
window.scrollBy(dx,dy);
};
_e7._validNodes={"div":1,"p":1,"td":1};
_e7._validOverflow={"auto":1,"scroll":1};
_e7.autoScrollNodes=function(e){
var b,t,w,h,rx,ry,dx=0,dy=0,_ed,_ee;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in _e7._validNodes)){
var s=_e5.getComputedStyle(n),_ef=(s.overflow.toLowerCase() in _e7._validOverflow),_f0=(s.overflowX.toLowerCase() in _e7._validOverflow),_f1=(s.overflowY.toLowerCase() in _e7._validOverflow);
if(_ef||_f0||_f1){
b=_e4.getContentBox(n,s);
t=_e4.position(n,true);
}
if(_ef||_f0){
w=Math.min(_e7.H_TRIGGER_AUTOSCROLL,b.w/2);
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
_ed=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_ef||_f1){
h=Math.min(_e7.V_TRIGGER_AUTOSCROLL,b.h/2);
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
_ee=n.scrollTop;
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
_e7.autoScroll(e);
};
return _e7;
});
},"dojo/dnd/TimedMoveable":function(){
define("dojo/dnd/TimedMoveable",["../_base/declare","./Moveable"],function(_f2,_f3){
var _f4=_f3.prototype.onMove;
return _f2("dojo.dnd.TimedMoveable",_f3,{timeout:40,constructor:function(_f5,_f6){
if(!_f6){
_f6={};
}
if(_f6.timeout&&typeof _f6.timeout=="number"&&_f6.timeout>=0){
this.timeout=_f6.timeout;
}
},onMoveStop:function(_f7){
if(_f7._timer){
clearTimeout(_f7._timer);
_f4.call(this,_f7,_f7._leftTop);
}
_f3.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_f8,_f9){
_f8._leftTop=_f9;
if(!_f8._timer){
var _fa=this;
_f8._timer=setTimeout(function(){
_f8._timer=null;
_f4.call(_fa,_f8,_f8._leftTop);
},this.timeout);
}
}});
});
},"url:dojox/form/resources/PasswordValidator.html":"<div dojoAttachPoint=\"containerNode\">\n\t<input type=\"hidden\" name=\"${name}\" value=\"\" dojoAttachPoint=\"focusNode\" />\n</div>","url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","dojox/main":function(){
define("dojox/main",["dojo/_base/kernel"],function(_fb){
return _fb.dojox;
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","dijit/Tooltip":function(){
require({cache:{"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n"}});
define("dijit/Tooltip",["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/on","dojo/sniff","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","./main"],function(_fc,_fd,fx,dom,_fe,_ff,_100,lang,_101,on,has,_102,_103,_104,_105,_106,_107,_108){
var _109=_fd("dijit._MasterTooltip",[_104,_105],{duration:_102.defaultDuration,templateString:_107,postCreate:function(){
this.ownerDocumentBody.appendChild(this.domNode);
this.bgIframe=new _106(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_10a,_10b,_10c,rtl,_10d){
if(this.aroundNode&&this.aroundNode===_10b&&this.containerNode.innerHTML==_10a){
return;
}
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_10a;
if(_10d){
this.set("textDir",_10d);
}
this.containerNode.align=rtl?"right":"left";
var pos=_103.around(this.domNode,_10b,_10c&&_10c.length?_10c:_10e.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _10f=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_10f.y+((_10f.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_10f.x+((_10f.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}else{
this.connectorNode.style.left="";
this.connectorNode.style.top="";
}
}
_100.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_10b;
},orient:function(node,_110,_111,_112,_113){
this.connectorNode.style.top="";
var _114=_112.h,_115=_112.w;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_110+"-"+_111];
this.domNode.style.width="auto";
var size=_ff.position(this.domNode);
if(has("ie")==9){
size.w+=2;
}
var _116=Math.min((Math.max(_115,1)),size.w);
_ff.setMarginBox(this.domNode,{w:_116});
if(_111.charAt(0)=="B"&&_110.charAt(0)=="B"){
var bb=_ff.position(node);
var _117=this.connectorNode.offsetHeight;
if(bb.h>_114){
var _118=_114-((_113.h+_117)>>1);
this.connectorNode.style.top=_118+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_113.h/2-_117/2,0),bb.h-_117)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_115);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_119){
if(this._onDeck&&this._onDeck[1]==_119){
this._onDeck=null;
}else{
if(this.aroundNode===_119){
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
_fc.forEach(node.children,function(_11a){
this._setAutoTextDir(_11a);
},this);
},_setTextDirAttr:function(_11b){
this._set("textDir",_11b);
if(_11b=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_108.showTooltip=function(_11c,_11d,_11e,rtl,_11f){
if(_11e){
_11e=_fc.map(_11e,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_10e._masterTT){
_108._masterTT=_10e._masterTT=new _109();
}
return _10e._masterTT.show(_11c,_11d,_11e,rtl,_11f);
};
_108.hideTooltip=function(_120){
return _10e._masterTT&&_10e._masterTT.hide(_120);
};
var _10e=_fd("dijit.Tooltip",_104,{label:"",showDelay:400,connectId:[],position:[],selector:"",_setConnectIdAttr:function(_121){
_fc.forEach(this._connections||[],function(_122){
_fc.forEach(_122,function(_123){
_123.remove();
});
},this);
this._connectIds=_fc.filter(lang.isArrayLike(_121)?_121:(_121?[_121]:[]),function(id){
return dom.byId(id,this.ownerDocument);
},this);
this._connections=_fc.map(this._connectIds,function(id){
var node=dom.byId(id,this.ownerDocument),_124=this.selector,_125=_124?function(_126){
return on.selector(_124,_126);
}:function(_127){
return _127;
},self=this;
return [on(node,_125(_101.enter),function(){
self._onHover(this);
}),on(node,_125("focusin"),function(){
self._onHover(this);
}),on(node,_125(_101.leave),lang.hitch(self,"_onUnHover")),on(node,_125("focusout"),lang.hitch(self,"_onUnHover"))];
},this);
this._set("connectId",_121);
},addTarget:function(node){
var id=node.id||node;
if(_fc.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=_fc.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_fe.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
_fc.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},getContent:function(node){
return this.label||this.domNode.innerHTML;
},_onHover:function(_128){
if(!this._showTimer){
this._showTimer=this.defer(function(){
this.open(_128);
},this.showDelay);
}
},_onUnHover:function(){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
this.close();
},open:function(_129){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
var _12a=this.getContent(_129);
if(!_12a){
return;
}
_10e.show(_12a,_129,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_129;
this.onShow(_129,this.position);
},close:function(){
if(this._connectNode){
_10e.hide(this._connectNode);
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
_fc.forEach(this._connections||[],function(_12b){
_fc.forEach(_12b,function(_12c){
_12c.remove();
});
},this);
this.inherited(arguments);
}});
_10e._MasterTooltip=_109;
_10e.show=_108.showTooltip;
_10e.hide=_108.hideTooltip;
_10e.defaultPosition=["after-centered","before-centered"];
return _10e;
});
},"dijit/form/DropDownButton":function(){
require({cache:{"url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode,_popupStateNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/DropDownButton",["dojo/_base/declare","dojo/_base/lang","dojo/query","../registry","../popup","./Button","../_Container","../_HasDropDown","dojo/text!./templates/DropDownButton.html"],function(_12d,lang,_12e,_12f,_130,_131,_132,_133,_134){
return _12d("dijit.form.DropDownButton",[_131,_132,_133],{baseClass:"dijitDropDownButton",templateString:_134,_fillContent:function(){
if(this.srcNodeRef){
var _135=_12e("*",this.srcNodeRef);
this.inherited(arguments,[_135[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _136=_12e("[widgetId]",this.dropDownContainer)[0];
this.dropDown=_12f.byNode(_136);
delete this.dropDownContainer;
}
if(this.dropDown){
_130.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _137=this.dropDown;
return (!!_137&&(!_137.href||_137.isLoaded));
},loadDropDown:function(_138){
var _139=this.dropDown;
var _13a=_139.on("load",lang.hitch(this,function(){
_13a.remove();
_138();
}));
_139.refresh();
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
});
},"dijit/layout/_ContentPaneResizeMixin":function(){
define("dijit/layout/_ContentPaneResizeMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/query","dojo/sniff","../registry","../Viewport","./utils"],function(_13b,_13c,_13d,_13e,_13f,lang,_140,has,_141,_142,_143){
return _13c("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isLayoutContainer:true,startup:function(){
if(this._started){
return;
}
var _144=this.getParent();
this._childOfLayoutWidget=_144&&_144.isLayoutContainer;
this._needLayout=!this._childOfLayoutWidget;
this.inherited(arguments);
if(this._isShown()){
this._onShow();
}
if(!this._childOfLayoutWidget){
this.own(_142.on("resize",lang.hitch(this,"resize")));
}
},_checkIfSingleChild:function(){
var _145=[],_146=false;
_140("> *",this.containerNode).some(function(node){
var _147=_141.byNode(node);
if(_147&&_147.resize){
_145.push(_147);
}else{
if(node.offsetHeight){
_146=true;
}
}
});
this._singleChild=_145.length==1&&!_146?_145[0]:null;
_13d.toggle(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_148,_149){
this._resizeCalled=true;
this._scheduleLayout(_148,_149);
},_scheduleLayout:function(_14a,_14b){
if(this._isShown()){
this._layout(_14a,_14b);
}else{
this._needLayout=true;
this._changeSize=_14a;
this._resultSize=_14b;
}
},_layout:function(_14c,_14d){
delete this._needLayout;
if(!this._wasShown&&this.open!==false){
this._onShow();
}
if(_14c){
_13e.setMarginBox(this.domNode,_14c);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_14d||{};
lang.mixin(mb,_14c||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_13e.getMarginBox(cn),mb);
}
this._contentBox=_143.marginBox2contentBox(cn,mb);
}else{
this._contentBox=_13e.getContentBox(cn);
}
this._layoutChildren();
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||_13e.getContentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
_13b.forEach(this.getChildren(),function(_14e){
if(_14e.resize){
_14e.resize();
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
var node=this.domNode,_14f=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!_13d.contains(node,"dijitHidden")&&_14f&&_14f.style&&(_14f.style.display!="none");
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
},"dojo/dnd/Moveable":function(){
define("dojo/dnd/Moveable",["../_base/array","../_base/declare","../_base/event","../_base/lang","../dom","../dom-class","../Evented","../on","../topic","../touch","./common","./Mover","../_base/window"],function(_150,_151,_152,lang,dom,_153,_154,on,_155,_156,dnd,_157,win){
var _158=_151("dojo.dnd.Moveable",[_154],{handle:"",delay:0,skip:false,constructor:function(node,_159){
this.node=dom.byId(node);
if(!_159){
_159={};
}
this.handle=_159.handle?dom.byId(_159.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_159.delay>0?_159.delay:0;
this.skip=_159.skip;
this.mover=_159.mover?_159.mover:_157;
this.events=[on(this.handle,_156.press,lang.hitch(this,"onMouseDown")),on(this.handle,"dragstart",lang.hitch(this,"onSelectStart")),on(this.handle,"selectstart",lang.hitch(this,"onSelectStart"))];
},markupFactory:function(_15a,node,Ctor){
return new Ctor(node,_15a);
},destroy:function(){
_150.forEach(this.events,function(_15b){
_15b.remove();
});
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(on(this.handle,_156.move,lang.hitch(this,"onMouseMove")),on(this.handle,_156.release,lang.hitch(this,"onMouseUp")));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
_152.stop(e);
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
_152.stop(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
this.events.pop().remove();
}
_152.stop(e);
},onSelectStart:function(e){
if(!this.skip||!dnd.isFormElement(e)){
_152.stop(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_15c){
_155.publish("/dnd/move/start",_15c);
_153.add(win.body(),"dojoMove");
_153.add(this.node,"dojoMoveItem");
},onMoveStop:function(_15d){
_155.publish("/dnd/move/stop",_15d);
_153.remove(win.body(),"dojoMove");
_153.remove(this.node,"dojoMoveItem");
},onFirstMove:function(){
},onMove:function(_15e,_15f){
this.onMoving(_15e,_15f);
var s=_15e.node.style;
s.left=_15f.l+"px";
s.top=_15f.t+"px";
this.onMoved(_15e,_15f);
},onMoving:function(){
},onMoved:function(){
}});
return _158;
});
},"dijit/MenuItem":function(){
require({cache:{"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/kernel","dojo/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_160,dom,_161,_162,_163,has,_164,_165,_166,_167,_168){
return _160("dijit.MenuItem",[_164,_165,_166,_167],{templateString:_168,baseClass:"dijitMenuItem",label:"",_setLabelAttr:function(val){
this.containerNode.innerHTML=val;
this._set("label",val);
if(this.textDir==="auto"){
this.applyTextDir(this.focusNode,this.label);
}
},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_169){
if(_169&&!("label" in this.params)){
this.set("label",_169.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _16a=this.id+"_text";
_161.set(this.containerNode,"id",_16a);
if(this.accelKeyNode){
_161.set(this.accelKeyNode,"id",this.id+"_accel");
_16a+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_16a);
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
},_setSelected:function(_16b){
_162.toggle(this.domNode,"dijitMenuItemSelected",_16b);
},setLabel:function(_16c){
_163.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_16c);
},setDisabled:function(_16d){
_163.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_16d);
},_setDisabledAttr:function(_16e){
this.focusNode.setAttribute("aria-disabled",_16e?"true":"false");
this._set("disabled",_16e);
},_setAccelKeyAttr:function(_16f){
this.accelKeyNode.style.display=_16f?"":"none";
this.accelKeyNode.innerHTML=_16f;
_161.set(this.containerNode,"colSpan",_16f?"1":"2");
this._set("accelKey",_16f);
},_setTextDirAttr:function(_170){
if(!this._created||this.textDir!=_170){
this._set("textDir",_170);
this.applyTextDir(this.focusNode,this.label);
}
}});
});
},"dojox/form/PasswordValidator":function(){
require({cache:{"url:dojox/form/resources/PasswordValidator.html":"<div dojoAttachPoint=\"containerNode\">\n\t<input type=\"hidden\" name=\"${name}\" value=\"\" dojoAttachPoint=\"focusNode\" />\n</div>"}});
define("dojox/form/PasswordValidator",["dojo/_base/array","dojo/_base/lang","dojo/dom-attr","dojo/i18n","dojo/query","dojo/keys","dijit/form/_FormValueWidget","dijit/form/ValidationTextBox","dojo/text!./resources/PasswordValidator.html","dojo/i18n!./nls/PasswordValidator","dojo/_base/declare"],function(_171,lang,_172,i18n,_173,keys,_174,_175,_176,_177,_178){
var _179=_178("dojox.form._ChildTextBox",_175,{containerWidget:null,type:"password",reset:function(){
_175.prototype._setValueAttr.call(this,"",true);
this._hasBeenBlurred=false;
},postCreate:function(){
this.inherited(arguments);
if(!this.name){
_172.remove(this.focusNode,"name");
}
this.connect(this.focusNode,"onkeypress","_onChildKeyPress");
},_onChildKeyPress:function(e){
if(e&&e.keyCode==keys.ENTER){
this._setBlurValue();
}
}});
var _17a=_178("dojox.form._OldPWBox",_179,{_isPWValid:false,_setValueAttr:function(_17b,_17c){
if(_17b===""){
_17b=_17a.superclass.attr.call(this,"value");
}
if(_17c!==null){
this._isPWValid=this.containerWidget.pwCheck(_17b);
}
this.inherited(arguments);
this.containerWidget._childValueAttr(this.containerWidget._inputWidgets[1].get("value"));
},isValid:function(_17d){
return this.inherited("isValid",arguments)&&this._isPWValid;
},_update:function(e){
if(this._hasBeenBlurred){
this.validate(true);
}
this._onMouse(e);
},_getValueAttr:function(){
if(this.containerWidget._started&&this.containerWidget.isValid()){
return this.inherited(arguments);
}
return "";
},_setBlurValue:function(){
var _17e=_175.prototype._getValueAttr.call(this);
this._setValueAttr(_17e,(this.isValid?this.isValid():true));
}});
var _17f=_178("dojox.form._NewPWBox",_179,{required:true,onChange:function(){
this.containerWidget._inputWidgets[2].validate(false);
this.inherited(arguments);
}});
var _180=_178("dojox.form._VerifyPWBox",_179,{isValid:function(_181){
return this.inherited("isValid",arguments)&&(this.get("value")==this.containerWidget._inputWidgets[1].get("value"));
}});
return _178("dojox.form.PasswordValidator",_174,{required:true,_inputWidgets:null,oldName:"",templateString:_176,_hasBeenBlurred:false,isValid:function(_182){
return _171.every(this._inputWidgets,function(i){
if(i&&i._setStateClass){
i._setStateClass();
}
return (!i||i.isValid());
});
},validate:function(_183){
return _171.every(_171.map(this._inputWidgets,function(i){
if(i&&i.validate){
i._hasBeenBlurred=(i._hasBeenBlurred||this._hasBeenBlurred);
return i.validate();
}
return true;
},this),function(item){
return item;
});
},reset:function(){
this._hasBeenBlurred=false;
_171.forEach(this._inputWidgets,function(i){
if(i&&i.reset){
i.reset();
}
},this);
},_createSubWidgets:function(){
var _184=this._inputWidgets,msg=i18n.getLocalization("dojox.form","PasswordValidator",this.lang);
_171.forEach(_184,function(i,idx){
if(i){
var p={containerWidget:this},c;
if(idx===0){
p.name=this.oldName;
p.invalidMessage=msg.badPasswordMessage;
c=_17a;
}else{
if(idx===1){
p.required=this.required;
c=_17f;
}else{
if(idx===2){
p.invalidMessage=msg.nomatchMessage;
c=_180;
}
}
}
_184[idx]=new c(p,i);
}
},this);
},pwCheck:function(_185){
return false;
},postCreate:function(){
this.inherited(arguments);
var _186=this._inputWidgets=[];
_171.forEach(["old","new","verify"],function(i){
_186.push(_173("input[pwType="+i+"]",this.containerNode)[0]);
},this);
if(!_186[1]||!_186[2]){
throw new Error("Need at least pwType=\"new\" and pwType=\"verify\"");
}
if(this.oldName&&!_186[0]){
throw new Error("Need to specify pwType=\"old\" if using oldName");
}
this.containerNode=this.domNode;
this._createSubWidgets();
this.connect(this._inputWidgets[1],"_setValueAttr","_childValueAttr");
this.connect(this._inputWidgets[2],"_setValueAttr","_childValueAttr");
},_childValueAttr:function(v){
this.set("value",this.isValid()?v:"");
},_setDisabledAttr:function(_187){
this.inherited(arguments);
_171.forEach(this._inputWidgets,function(i){
if(i&&i.set){
i.set("disabled",_187);
}
});
},_setRequiredAttribute:function(_188){
this.required=_188;
_172.set(this.focusNode,"required",_188);
this.focusNode.setAttribute("aria-required",_188);
this._refreshState();
_171.forEach(this._inputWidgets,function(i){
if(i&&i.set){
i.set("required",_188);
}
});
},_setValueAttr:function(v){
this.inherited(arguments);
_172.set(this.focusNode,"value",v);
},_getValueAttr:function(){
return this.value||"";
},focus:function(){
var f=false;
_171.forEach(this._inputWidgets,function(i){
if(i&&!i.isValid()&&!f){
i.focus();
f=true;
}
});
if(!f){
this._inputWidgets[1].focus();
}
}});
});
},"dojo/dnd/Mover":function(){
define("dojo/dnd/Mover",["../_base/array","../_base/declare","../_base/event","../_base/lang","../sniff","../_base/window","../dom","../dom-geometry","../dom-style","../Evented","../on","../touch","./common","./autoscroll"],function(_189,_18a,_18b,lang,has,win,dom,_18c,_18d,_18e,on,_18f,dnd,_190){
return _18a("dojo.dnd.Mover",[_18e],{constructor:function(node,e,host){
this.node=dom.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[on(d,_18f.move,lang.hitch(this,"onFirstMove")),on(d,_18f.move,lang.hitch(this,"onMouseMove")),on(d,_18f.release,lang.hitch(this,"onMouseUp")),on(d,"dragstart",_18b.stop),on(d.body,"selectstart",_18b.stop)];
_190.autoScrollStart(d);
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
_190.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY},e);
_18b.stop(e);
},onMouseUp:function(e){
if(has("webkit")&&has("mac")&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
_18b.stop(e);
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
var m=_18c.getMarginBox(this.node);
var b=win.doc.body;
var bs=_18d.getComputedStyle(b);
var bm=_18c.getMarginBox(b,bs);
var bc=_18c.getContentBox(b,bs);
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
_189.forEach(this.events,function(_191){
_191.remove();
});
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
});
},"dojox/validate/regexp":function(){
define("dojox/validate/regexp",["dojo/_base/lang","dojo/regexp","dojox/main"],function(lang,_192,_193){
var _194=lang.getObject("validate.regexp",true,_193);
_194=_193.validate.regexp={ipAddress:function(_195){
_195=(typeof _195=="object")?_195:{};
if(typeof _195.allowDottedDecimal!="boolean"){
_195.allowDottedDecimal=true;
}
if(typeof _195.allowDottedHex!="boolean"){
_195.allowDottedHex=true;
}
if(typeof _195.allowDottedOctal!="boolean"){
_195.allowDottedOctal=true;
}
if(typeof _195.allowDecimal!="boolean"){
_195.allowDecimal=true;
}
if(typeof _195.allowHex!="boolean"){
_195.allowHex=true;
}
if(typeof _195.allowIPv6!="boolean"){
_195.allowIPv6=true;
}
if(typeof _195.allowHybrid!="boolean"){
_195.allowHybrid=true;
}
var _196="((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var _197="(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]";
var _198="(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]";
var _199="(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|"+"4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])";
var _19a="0[xX]0*[\\da-fA-F]{1,8}";
var _19b="([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}";
var _19c="([\\da-fA-F]{1,4}\\:){6}"+"((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var a=[];
if(_195.allowDottedDecimal){
a.push(_196);
}
if(_195.allowDottedHex){
a.push(_197);
}
if(_195.allowDottedOctal){
a.push(_198);
}
if(_195.allowDecimal){
a.push(_199);
}
if(_195.allowHex){
a.push(_19a);
}
if(_195.allowIPv6){
a.push(_19b);
}
if(_195.allowHybrid){
a.push(_19c);
}
var _19d="";
if(a.length>0){
_19d="("+a.join("|")+")";
}
return _19d;
},host:function(_19e){
_19e=(typeof _19e=="object")?_19e:{};
if(typeof _19e.allowIP!="boolean"){
_19e.allowIP=true;
}
if(typeof _19e.allowLocal!="boolean"){
_19e.allowLocal=false;
}
if(typeof _19e.allowPort!="boolean"){
_19e.allowPort=true;
}
if(typeof _19e.allowNamed!="boolean"){
_19e.allowNamed=false;
}
var _19f="(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)";
var _1a0="(?:[a-zA-Z](?:[-\\da-zA-Z]{0,6}[\\da-zA-Z])?)";
var _1a1=_19e.allowPort?"(\\:\\d+)?":"";
var _1a2="((?:"+_19f+"\\.)+"+_1a0+"\\.?)";
if(_19e.allowIP){
_1a2+="|"+_194.ipAddress(_19e);
}
if(_19e.allowLocal){
_1a2+="|localhost";
}
if(_19e.allowNamed){
_1a2+="|^[^-][a-zA-Z0-9_-]*";
}
return "("+_1a2+")"+_1a1;
},url:function(_1a3){
_1a3=(typeof _1a3=="object")?_1a3:{};
if(!("scheme" in _1a3)){
_1a3.scheme=[true,false];
}
var _1a4=_192.buildGroupRE(_1a3.scheme,function(q){
if(q){
return "(https?|ftps?)\\://";
}
return "";
});
var _1a5="(/(?:[^?#\\s/]+/)*(?:[^?#\\s/]+(?:\\?[^?#\\s/]*)?(?:#[A-Za-z][\\w.:-]*)?)?)?";
return _1a4+_194.host(_1a3)+_1a5;
},emailAddress:function(_1a6){
_1a6=(typeof _1a6=="object")?_1a6:{};
if(typeof _1a6.allowCruft!="boolean"){
_1a6.allowCruft=false;
}
_1a6.allowPort=false;
var _1a7="([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+";
var _1a8=_1a7+"@"+_194.host(_1a6);
if(_1a6.allowCruft){
_1a8="<?(mailto\\:)?"+_1a8+">?";
}
return _1a8;
},emailAddressList:function(_1a9){
_1a9=(typeof _1a9=="object")?_1a9:{};
if(typeof _1a9.listSeparator!="string"){
_1a9.listSeparator="\\s;,";
}
var _1aa=_194.emailAddress(_1a9);
var _1ab="("+_1aa+"\\s*["+_1a9.listSeparator+"]\\s*)*"+_1aa+"\\s*["+_1a9.listSeparator+"]?\\s*";
return _1ab;
},numberFormat:function(_1ac){
_1ac=(typeof _1ac=="object")?_1ac:{};
if(typeof _1ac.format=="undefined"){
_1ac.format="###-###-####";
}
var _1ad=function(_1ae){
return _192.escapeString(_1ae,"?").replace(/\?/g,"\\d?").replace(/#/g,"\\d");
};
return _192.buildGroupRE(_1ac.format,_1ad);
},ca:{postalCode:function(){
return "([A-Z][0-9][A-Z] [0-9][A-Z][0-9])";
},province:function(){
return "(AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT)";
}},us:{state:function(_1af){
_1af=(typeof _1af=="object")?_1af:{};
if(typeof _1af.allowTerritories!="boolean"){
_1af.allowTerritories=true;
}
if(typeof _1af.allowMilitary!="boolean"){
_1af.allowMilitary=true;
}
var _1b0="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|"+"NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
var _1b1="AS|FM|GU|MH|MP|PW|PR|VI";
var _1b2="AA|AE|AP";
if(_1af.allowTerritories){
_1b0+="|"+_1b1;
}
if(_1af.allowMilitary){
_1b0+="|"+_1b2;
}
return "("+_1b0+")";
}}};
return _194;
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\"\n\t   data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","dijit/form/Button":function(){
require({cache:{"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/Button",["require","dojo/_base/declare","dojo/dom-class","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_1b3,_1b4,_1b5,has,_1b6,lang,_1b7,_1b8,_1b9,_1ba){
if(has("dijit-legacy-requires")){
_1b7(0,function(){
var _1bb=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_1b3(_1bb);
});
}
return _1b4("dijit.form.Button",[_1b8,_1b9],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_1ba,_setValueAttr:"valueNode",_onClick:function(e){
var ok=this.inherited(arguments);
if(ok){
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
e.stopPropagation();
}
}
return ok;
},_fillContent:function(_1bc){
if(_1bc&&(!this.params||!("label" in this.params))){
var _1bd=lang.trim(_1bc.innerHTML);
if(_1bd){
this.label=_1bd;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_1b5.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_1be){
_1b6.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_1be);
},_setLabelAttr:function(_1bf){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
});
},"dijit/form/Form":function(){
define("dijit/form/Form",["dojo/_base/declare","dojo/dom-attr","dojo/_base/event","dojo/_base/kernel","dojo/sniff","../_Widget","../_TemplatedMixin","./_FormMixin","../layout/_ContentPaneResizeMixin"],function(_1c0,_1c1,_1c2,_1c3,has,_1c4,_1c5,_1c6,_1c7){
return _1c0("dijit.form.Form",[_1c4,_1c5,_1c6,_1c7],{name:"",action:"",method:"",encType:"","accept-charset":"",accept:"",target:"",templateString:"<form data-dojo-attach-point='containerNode' data-dojo-attach-event='onreset:_onReset,onsubmit:_onSubmit' ${!nameAttrSetting}></form>",postMixInProperties:function(){
this.nameAttrSetting=this.name?("name='"+this.name+"'"):"";
this.inherited(arguments);
},execute:function(){
},onExecute:function(){
},_setEncTypeAttr:function(_1c8){
this.encType=_1c8;
_1c1.set(this.domNode,"encType",_1c8);
if(has("ie")){
this.domNode.encoding=_1c8;
}
},reset:function(e){
var faux={returnValue:true,preventDefault:function(){
this.returnValue=false;
},stopPropagation:function(){
},currentTarget:e?e.target:this.domNode,target:e?e.target:this.domNode};
if(!(this.onReset(faux)===false)&&faux.returnValue){
this.inherited(arguments,[]);
}
},onReset:function(){
return true;
},_onReset:function(e){
this.reset(e);
_1c2.stop(e);
return false;
},_onSubmit:function(e){
var fp=this.constructor.prototype;
if(this.execute!=fp.execute||this.onExecute!=fp.onExecute){
_1c3.deprecated("dijit.form.Form:execute()/onExecute() are deprecated. Use onSubmit() instead.","","2.0");
this.onExecute();
this.execute(this.getValues());
}
if(this.onSubmit(e)===false){
_1c2.stop(e);
}
},onSubmit:function(){
return this.isValid();
},submit:function(){
if(!(this.onSubmit()===false)){
this.containerNode.submit();
}
}});
});
},"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n","dojo/regexp":function(){
define("dojo/regexp",["./_base/kernel","./_base/lang"],function(dojo,lang){
var _1c9={};
lang.setObject("dojo.regexp",_1c9);
_1c9.escapeString=function(str,_1ca){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_1ca&&_1ca.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
_1c9.buildGroupRE=function(arr,re,_1cb){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return _1c9.group(b.join("|"),_1cb);
};
_1c9.group=function(_1cc,_1cd){
return "("+(_1cd?"?:":"")+_1cc+")";
};
return _1c9;
});
},"dijit/DropDownMenu":function(){
require({cache:{"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\"\n\t   data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_1ce,_1cf,keys,_1d0,_1d1,_1d2){
return _1ce("dijit.DropDownMenu",[_1d2,_1d1],{templateString:_1d0,baseClass:"dijitMenu",postCreate:function(){
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
_1cf.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_1cf.stop(evt);
}
break;
}
}});
});
},"dijit/form/_FormMixin":function(){
define("dijit/form/_FormMixin",["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/window"],function(_1d3,_1d4,_1d5,lang,on,_1d6){
return _1d4("dijit.form._FormMixin",null,{state:"",_getDescendantFormWidgets:function(_1d7){
var res=[];
_1d3.forEach(_1d7||this.getChildren(),function(_1d8){
if("value" in _1d8){
res.push(_1d8);
}else{
res=res.concat(this._getDescendantFormWidgets(_1d8.getChildren()));
}
},this);
return res;
},reset:function(){
_1d3.forEach(this._getDescendantFormWidgets(),function(_1d9){
if(_1d9.reset){
_1d9.reset();
}
});
},validate:function(){
var _1da=false;
return _1d3.every(_1d3.map(this._getDescendantFormWidgets(),function(_1db){
_1db._hasBeenBlurred=true;
var _1dc=_1db.disabled||!_1db.validate||_1db.validate();
if(!_1dc&&!_1da){
_1d6.scrollIntoView(_1db.containerNode||_1db.domNode);
_1db.focus();
_1da=true;
}
return _1dc;
}),function(item){
return item;
});
},setValues:function(val){
_1d5.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
_1d3.forEach(this._getDescendantFormWidgets(),function(_1dd){
if(!_1dd.name){
return;
}
var _1de=map[_1dd.name]||(map[_1dd.name]=[]);
_1de.push(_1dd);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _1df=map[name],_1e0=lang.getObject(name,false,obj);
if(_1e0===undefined){
continue;
}
if(!lang.isArray(_1e0)){
_1e0=[_1e0];
}
if(typeof _1df[0].checked=="boolean"){
_1d3.forEach(_1df,function(w){
w.set("value",_1d3.indexOf(_1e0,w.value)!=-1);
});
}else{
if(_1df[0].multiple){
_1df[0].set("value",_1e0);
}else{
_1d3.forEach(_1df,function(w,i){
w.set("value",_1e0[i]);
});
}
}
}
},getValues:function(){
_1d5.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
_1d3.forEach(this._getDescendantFormWidgets(),function(_1e1){
var name=_1e1.name;
if(!name||_1e1.disabled){
return;
}
var _1e2=_1e1.get("value");
if(typeof _1e1.checked=="boolean"){
if(/Radio/.test(_1e1.declaredClass)){
if(_1e2!==false){
lang.setObject(name,_1e2,obj);
}else{
_1e2=lang.getObject(name,false,obj);
if(_1e2===undefined){
lang.setObject(name,null,obj);
}
}
}else{
var ary=lang.getObject(name,false,obj);
if(!ary){
ary=[];
lang.setObject(name,ary,obj);
}
if(_1e2!==false){
ary.push(_1e2);
}
}
}else{
var prev=lang.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(lang.isArray(prev)){
prev.push(_1e2);
}else{
lang.setObject(name,[prev,_1e2],obj);
}
}else{
lang.setObject(name,_1e2,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(){
},_getState:function(){
var _1e3=_1d3.map(this._descendants,function(w){
return w.get("state")||"";
});
return _1d3.indexOf(_1e3,"Error")>=0?"Error":_1d3.indexOf(_1e3,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
},connectChildren:function(_1e4){
this._descendants=this._getDescendantFormWidgets();
_1d3.forEach(this._descendants,function(_1e5){
if(!_1e5._started){
_1e5.startup();
}
});
if(!_1e4){
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
this.watch("state",function(attr,_1e6,_1e7){
this.onValidStateChange(_1e7=="");
});
},destroy:function(){
this.inherited(arguments);
}});
});
},"dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_1e8,_1e9,_1ea,_1eb,dom,_1ec,_1ed,_1ee,keys,lang,on,has,win,_1ef,pm,_1f0,_1f1){
if(has("dijit-legacy-requires")){
_1f1(0,function(){
var _1f2=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_1e8(_1f2);
});
}
return _1ea("dijit.Menu",_1f0,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],selector:"",contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(this.ownerDocumentBody);
}else{
_1e9.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_1f3){
return _1ef.get(this._iframeContentDocument(_1f3))||this._iframeContentDocument(_1f3)["__parent__"]||(_1f3.name&&win.doc.frames[_1f3.name])||null;
},_iframeContentDocument:function(_1f4){
return _1f4.contentDocument||(_1f4.contentWindow&&_1f4.contentWindow.document)||(_1f4.name&&win.doc.frames[_1f4.name]&&win.doc.frames[_1f4.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node,this.ownerDocument);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _1f5=node,_1f6=this._iframeContentWindow(_1f5);
cn=win.body(_1f6.document);
}else{
cn=(node==win.body(this.ownerDocument)?this.ownerDocument.documentElement:node);
}
var _1f7={node:node,iframe:_1f5};
_1ec.set(node,"_dijitMenu"+this.id,this._bindings.push(_1f7));
var _1f8=lang.hitch(this,function(cn){
var _1f9=this.selector,_1fa=_1f9?function(_1fb){
return on.selector(_1f9,_1fb);
}:function(_1fc){
return _1fc;
},self=this;
return [on(cn,_1fa(this.leftClickToOpen?"click":"contextmenu"),function(evt){
_1eb.stop(evt);
self._scheduleOpen(this,_1f5,{x:evt.pageX,y:evt.pageY});
}),on(cn,_1fa("keydown"),function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_1eb.stop(evt);
self._scheduleOpen(this,_1f5);
}
})];
});
_1f7.connects=cn?_1f8(cn):[];
if(_1f5){
_1f7.onloadHandler=lang.hitch(this,function(){
var _1fd=this._iframeContentWindow(_1f5);
cn=win.body(_1fd.document);
_1f7.connects=_1f8(cn);
});
if(_1f5.addEventListener){
_1f5.addEventListener("load",_1f7.onloadHandler,false);
}else{
_1f5.attachEvent("onload",_1f7.onloadHandler);
}
}
},unBindDomNode:function(_1fe){
var node;
try{
node=dom.byId(_1fe,this.ownerDocument);
}
catch(e){
return;
}
var _1ff="_dijitMenu"+this.id;
if(node&&_1ec.has(node,_1ff)){
var bid=_1ec.get(node,_1ff)-1,b=this._bindings[bid],h;
while((h=b.connects.pop())){
h.remove();
}
var _200=b.iframe;
if(_200){
if(_200.removeEventListener){
_200.removeEventListener("load",b.onloadHandler,false);
}else{
_200.detachEvent("onload",b.onloadHandler);
}
}
_1ec.remove(node,_1ff);
delete this._bindings[bid];
}
},_scheduleOpen:function(_201,_202,_203){
if(!this._openTimer){
this._openTimer=this.defer(function(){
delete this._openTimer;
this._openMyself({target:_201,iframe:_202,coords:_203});
},1);
}
},_openMyself:function(args){
var _204=args.target,_205=args.iframe,_206=args.coords;
this.currentTarget=_204;
if(_206){
if(_205){
var ifc=_1ed.position(_205,true),_207=this._iframeContentWindow(_205),_208=_1ed.docScroll(_207.document);
var cs=_1ee.getComputedStyle(_205),tp=_1ee.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_205,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_205,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_205,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_205,cs.borderTopWidth):0);
_206.x+=ifc.x+left-_208.x;
_206.y+=ifc.y+top-_208.y;
}
}else{
_206=_1ed.position(_204,true);
_206.x+=10;
_206.y+=10;
}
var self=this;
var _209=this._focusManager.get("prevNode");
var _20a=this._focusManager.get("curNode");
var _20b=!_20a||(dom.isDescendant(_20a,this.domNode))?_209:_20a;
function _20c(){
if(self.refocus&&_20b){
_20b.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_206.x,y:_206.y,onExecute:_20c,onCancel:_20c,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},destroy:function(){
_1e9.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"dijit/layout/ContentPane":function(){
define("dijit/layout/ContentPane",["dojo/_base/kernel","dojo/_base/lang","../_Widget","../_Container","./_ContentPaneResizeMixin","dojo/string","dojo/html","dojo/i18n!../nls/loading","dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/_base/xhr","dojo/i18n","dojo/when"],function(_20d,lang,_20e,_20f,_210,_211,html,_212,_213,_214,_215,dom,_216,xhr,i18n,when){
return _214("dijit.layout.ContentPane",[_20e,_20f,_210],{href:"",content:"",extractContent:false,parseOnLoad:true,parserScope:_20d._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,_setTitleAttr:null,stopParser:true,template:false,create:function(_217,_218){
if((!_217||!_217.template)&&_218&&!("href" in _217)&&!("content" in _217)){
_218=dom.byId(_218);
var df=_218.ownerDocument.createDocumentFragment();
while(_218.firstChild){
df.appendChild(_218.firstChild);
}
_217=lang.delegate(_217,{content:df});
}
this.inherited(arguments,[_217,_218]);
},postMixInProperties:function(){
this.inherited(arguments);
var _219=i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_211.substitute(this.loadingMessage,_219);
this.errorMessage=_211.substitute(this.errorMessage,_219);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.title="";
if(!_216.get(this.domNode,"role")){
this.domNode.setAttribute("role","group");
}
},startup:function(){
this.inherited(arguments);
if(this._contentSetter){
_213.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},_startChildren:function(){
_213.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
if(this._contentSetter){
_213.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},setHref:function(href){
_20d.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new _215(lang.hitch(this,"cancel"));
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
_20d.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new _215(lang.hitch(this,"cancel"));
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
},destroyRecursive:function(_21a){
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
this.onLoadDeferred=new _215(lang.hitch(this,"cancel"));
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
this._setContent(this.onDownloadStart(),true);
var self=this;
var _21b={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(lang.isObject(this.ioArgs)){
lang.mixin(_21b,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||xhr.get)(_21b)),_21c;
hand.then(function(html){
_21c=html;
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
return _21c;
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
},destroyDescendants:function(_21d){
if(this.isLoaded){
this._onUnloadHandler();
}
var _21e=this._contentSetter;
_213.forEach(this.getChildren(),function(_21f){
if(_21f.destroyRecursive){
_21f.destroyRecursive(_21d);
}else{
if(_21f.destroy){
_21f.destroy(_21d);
}
}
_21f._destroyed=true;
});
if(_21e){
_213.forEach(_21e.parseResults,function(_220){
if(!_220._destroyed){
if(_220.destroyRecursive){
_220.destroyRecursive(_21d);
}else{
if(_220.destroy){
_220.destroy(_21d);
}
}
_220._destroyed=true;
}
});
delete _21e.parseResults;
}
if(!_21d){
html._emptyNode(this.containerNode);
}
delete this._singleChild;
},_setContent:function(cont,_221){
this.destroyDescendants();
var _222=this._contentSetter;
if(!(_222&&_222 instanceof html._ContentSetter)){
_222=this._contentSetter=new html._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _223=this.onContentError(e);
try{
this.containerNode.innerHTML=_223;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _224=lang.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:!cont.domNode&&this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang,textDir:this.textDir},this._contentSetterParams||{});
var p=_222.set((lang.isObject(cont)&&cont.domNode)?cont.domNode:cont,_224);
var self=this;
return when(p&&p.then?p:_222.parseDeferred,function(){
delete self._contentSetterParams;
if(!_221){
if(self._started){
self._startChildren();
self._scheduleLayout();
}
self._onLoadHandler(cont);
}
});
},_onError:function(type,err,_225){
this.onLoadDeferred.reject(err);
var _226=this["on"+type+"Error"].call(this,err);
if(_225){
console.error(_225,err);
}else{
if(_226){
this._setContent(_226,true);
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
},"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","dijit/_KeyNavContainer":function(){
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_227,_228,_229,_22a,keys,_22b,_22c,_22d,lang){
return _22b("dijit._KeyNavContainer",[_229,_228],{tabIndex:"0",connectKeyNavHandlers:function(_22e,_22f){
var _230=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_22a.forEach(_22e,function(code){
_230[code]=prev;
});
_22a.forEach(_22f,function(code){
_230[code]=next;
});
_230[keys.HOME]=lang.hitch(this,"focusFirstChild");
_230[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_227.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_22a.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_231,_232){
this.inherited(arguments);
this._startupChild(_231);
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
},focusChild:function(_233,last){
if(!_233){
return;
}
if(this.focusedChild&&_233!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_233.set("tabIndex",this.tabIndex);
_233.focus(last?"end":"start");
this._set("focusedChild",_233);
},_startupChild:function(_234){
_234.set("tabIndex","-1");
this.connect(_234,"_onFocus",function(){
_234.set("tabIndex",this.tabIndex);
});
this.connect(_234,"_onBlur",function(){
_234.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_22d.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_22d.set(this.domNode,"tabIndex",this.tabIndex);
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
_22c.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_235,dir){
if(_235){
_235=this._getSiblingOfChild(_235,dir);
}
var _236=this.getChildren();
for(var i=0;i<_236.length;i++){
if(!_235){
_235=_236[(dir>0)?0:(_236.length-1)];
}
if(_235.isFocusable()){
return _235;
}
_235=this._getSiblingOfChild(_235,dir);
}
return null;
}});
});
},"dijit/layout/utils":function(){
define("dijit/layout/utils",["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","../main"],function(_237,_238,_239,_23a,lang,_23b){
var _23c=lang.getObject("layout",true,_23b);
_23c.marginBox2contentBox=function(node,mb){
var cs=_23a.getComputedStyle(node);
var me=_239.getMarginExtents(node,cs);
var pb=_239.getPadBorderExtents(node,cs);
return {l:_23a.toPixelValue(node,cs.paddingLeft),t:_23a.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
function _23d(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_23e,dim){
var _23f=_23e.resize?_23e.resize(dim):_239.setMarginBox(_23e.domNode,dim);
if(_23f){
lang.mixin(_23e,_23f);
}else{
lang.mixin(_23e,_239.getMarginBox(_23e.domNode));
lang.mixin(_23e,dim);
}
};
_23c.layoutChildren=function(_240,dim,_241,_242,_243){
dim=lang.mixin({},dim);
_238.add(_240,"dijitLayoutContainer");
_241=_237.filter(_241,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(_237.filter(_241,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
_237.forEach(_241,function(_244){
var elm=_244.domNode,pos=(_244.region||_244.layoutAlign);
if(!pos){
throw new Error("No region setting for "+_244.id);
}
var _245=elm.style;
_245.left=dim.l+"px";
_245.top=dim.t+"px";
_245.position="absolute";
_238.add(elm,"dijitAlign"+_23d(pos));
var _246={};
if(_242&&_242==_244.id){
_246[_244.region=="top"||_244.region=="bottom"?"h":"w"]=_243;
}
if(pos=="top"||pos=="bottom"){
_246.w=dim.w;
size(_244,_246);
dim.h-=_244.h;
if(pos=="top"){
dim.t+=_244.h;
}else{
_245.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_246.h=dim.h;
size(_244,_246);
dim.w-=_244.w;
if(pos=="left"){
dim.l+=_244.w;
}else{
_245.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(_244,dim);
}
}
}
});
};
return {marginBox2contentBox:_23c.marginBox2contentBox,layoutChildren:_23c.layoutChildren};
});
},"url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"\n\t\t\t\trole=\"header\" level=\"1\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t\t</span>\n\t</div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n","dojo/html":function(){
define("dojo/html",["./_base/kernel","./_base/lang","./_base/array","./_base/declare","./dom","./dom-construct","./parser"],function(_247,lang,_248,_249,dom,_24a,_24b){
var html={};
lang.setObject("dojo.html",html);
var _24c=0;
html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
html._emptyNode=_24a.empty;
html._setNodeContent=function(node,cont){
_24a.empty(node);
if(cont){
if(typeof cont=="string"){
cont=_24a.toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&lang.isArrayLike(cont)){
for(var _24d=cont.length,i=0;i<cont.length;i=_24d==cont.length?i+1:0){
_24a.place(cont[i],node,"last");
}
}else{
_24a.place(cont,node,"last");
}
}
return node;
};
html._ContentSetter=_249("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:_247._scopeName,startup:true,constructor:function(_24e,node){
lang.mixin(this,_24e||{});
node=this.node=dom.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_24c++].join("_");
}
},set:function(cont,_24f){
if(undefined!==cont){
this.content=cont;
}
if(_24f){
this._mixin(_24f);
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
var _250=this.onContentError(e);
try{
node.innerHTML=_250;
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
_248.forEach(this.parseResults,function(w){
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
var _251=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_251){
cont=_251[1];
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
},_mixin:function(_252){
var _253={},key;
for(key in _252){
if(key in _253){
continue;
}
this[key]=_252[key];
}
},_parse:function(){
var _254=this.node;
try{
var _255={};
_248.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_255[name]=this[name];
}
},this);
var self=this;
this.parseDeferred=_24b.parse({rootNode:_254,noStart:!this.startup,inherited:_255,scope:this.parserScope}).then(function(_256){
return self.parseResults=_256;
});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_257){
var _258=this["on"+type+"Error"].call(this,err);
if(_257){
console.error(_257,err);
}else{
if(_258){
html._setNodeContent(this.node,_258,true);
}
}
}});
html.set=function(node,cont,_259){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_259){
return html._setNodeContent(node,cont,true);
}else{
var op=new html._ContentSetter(lang.mixin(_259,{content:cont,node:node}));
return op.set();
}
};
return html;
});
},"dijit/form/ValidationTextBox":function(){
require({cache:{"url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/ValidationTextBox",["dojo/_base/declare","dojo/_base/kernel","dojo/i18n","./TextBox","../Tooltip","dojo/text!./templates/ValidationTextBox.html","dojo/i18n!./nls/validate"],function(_25a,_25b,i18n,_25c,_25d,_25e){
var _25f;
return _25f=_25a("dijit.form.ValidationTextBox",_25c,{templateString:_25e,required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},pattern:".*",regExp:"",regExpGen:function(){
},state:"",tooltipPosition:[],_deprecateRegExp:function(attr,_260){
if(_260!=_25f.prototype[attr]){
_25b.deprecated("ValidationTextBox id="+this.id+", set('"+attr+"', ...) is deprecated.  Use set('pattern', ...) instead.","","2.0");
this.set("pattern",_260);
}
},_setRegExpGenAttr:function(_261){
this._deprecateRegExp("regExpGen",_261);
this.regExpGen=this._getPatternAttr;
},_setRegExpAttr:function(_262){
this._deprecateRegExp("regExp",_262);
},_setValueAttr:function(){
this.inherited(arguments);
this.validate(this.focused);
},validator:function(_263,_264){
return (new RegExp("^(?:"+this._getPatternAttr(_264)+")"+(this.required?"":"?")+"$")).test(_263)&&(!this.required||!this._isEmpty(_263))&&(this._isEmpty(_263)||this.parse(_263,_264)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(){
return this.validator(this.textbox.value,this.constraints);
},_isEmpty:function(_265){
return (this.trim?/^\s*$/:/^$/).test(_265);
},getErrorMessage:function(){
var _266=this.invalidMessage=="$_unset_$"?this.messages.invalidMessage:!this.invalidMessage?this.promptMessage:this.invalidMessage;
var _267=this.missingMessage=="$_unset_$"?this.messages.missingMessage:!this.missingMessage?_266:this.missingMessage;
return (this.required&&this._isEmpty(this.textbox.value))?_267:_266;
},getPromptMessage:function(){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_268){
var _269="";
var _26a=this.disabled||this.isValid(_268);
if(_26a){
this._maskValidSubsetError=true;
}
var _26b=this._isEmpty(this.textbox.value);
var _26c=!_26a&&_268&&this._isValidSubset();
this._set("state",_26a?"":(((((!this._hasBeenBlurred||_268)&&_26b)||_26c)&&this._maskValidSubsetError)?"Incomplete":"Error"));
this.focusNode.setAttribute("aria-invalid",_26a?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_268&&_26c;
_269=this.getErrorMessage(_268);
}else{
if(this.state=="Incomplete"){
_269=this.getPromptMessage(_268);
this._maskValidSubsetError=!this._hasBeenBlurred||_268;
}else{
if(_26b){
_269=this.getPromptMessage(_268);
}
}
}
this.set("message",_269);
return _26a;
},displayMessage:function(_26d){
if(_26d&&this.focused){
_25d.show(_26d,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_25d.hide(this.domNode);
}
},_refreshState:function(){
if(this._created){
this.validate(this.focused);
}
this.inherited(arguments);
},constructor:function(_26e){
this.constraints={};
this.baseClass+=" dijitValidationTextBox";
},startup:function(){
this.inherited(arguments);
this._refreshState();
},_setConstraintsAttr:function(_26f){
if(!_26f.locale&&this.lang){
_26f.locale=this.lang;
}
this._set("constraints",_26f);
this._refreshState();
},_getPatternAttr:function(_270){
var p=this.pattern;
var type=(typeof p).toLowerCase();
if(type=="function"){
p=this.pattern(_270||this.constraints);
}
if(p!=this._lastRegExp){
var _271="";
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
_271+=re;
break;
case ")":
_271+="|$)";
break;
default:
_271+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_271);
}
catch(e){
_271=this.pattern;
console.warn("RegExp error in "+this.declaredClass+": "+this.pattern);
}
this._partialre="^(?:"+_271+")$";
}
return p;
},postMixInProperties:function(){
this.inherited(arguments);
this.messages=i18n.getLocalization("dijit.form","validate",this.lang);
this._setConstraintsAttr(this.constraints);
},_setDisabledAttr:function(_272){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_273){
this._set("required",_273);
this.focusNode.setAttribute("aria-required",_273);
this._refreshState();
},_setMessageAttr:function(_274){
this._set("message",_274);
this.displayMessage(_274);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
});
},"dijit/form/_ButtonMixin":function(){
define("dijit/form/_ButtonMixin",["dojo/_base/declare","dojo/dom","dojo/_base/event","../registry"],function(_275,dom,_276,_277){
return _275("dijit.form._ButtonMixin",null,{label:"",type:"button",_onClick:function(e){
if(this.disabled){
_276.stop(e);
return false;
}
var _278=this.onClick(e)===false;
if(!_278&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _279=_277.byNode(node);
if(_279&&typeof _279._onSubmit=="function"){
_279._onSubmit(e);
_278=true;
break;
}
}
}
if(_278){
e.preventDefault();
}
return !_278;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_27a){
this._set("label",_27a);
(this.containerNode||this.focusNode).innerHTML=_27a;
}});
});
},"davinci/repositoryinfo":function(){
define({revision:"f940814741d832335cf203555c0e7236f56925ad",buildtime:"2012-09-11T17:35:21Z"});
},"dojo/dnd/common":function(){
define("dojo/dnd/common",["../_base/connect","../_base/kernel","../_base/lang","../dom"],function(_27b,_27c,lang,dom){
var _27d={};
_27d.getCopyKeyState=_27b.isCopyKey;
_27d._uniqueId=0;
_27d.getUniqueId=function(){
var id;
do{
id=_27c._scopeName+"Unique"+(++_27d._uniqueId);
}while(dom.byId(id));
return id;
};
_27d._empty={};
_27d.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
lang.mixin(lang.getObject("dojo.dnd",true),_27d);
return _27d;
});
},"dijit/Dialog":function(){
require({cache:{"url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"\n\t\t\t\trole=\"header\" level=\"1\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t\t</span>\n\t</div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n"}});
define("dijit/Dialog",["require","dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/_base/fx","dojo/i18n","dojo/keys","dojo/_base/lang","dojo/on","dojo/ready","dojo/sniff","dojo/window","dojo/dnd/Moveable","dojo/dnd/TimedMoveable","./focus","./_base/manager","./_Widget","./_TemplatedMixin","./_CssStateMixin","./form/_FormMixin","./_DialogMixin","./DialogUnderlay","./layout/ContentPane","dojo/text!./templates/Dialog.html","./main","dojo/i18n!./nls/common"],function(_27e,_27f,_280,_281,_282,dom,_283,_284,_285,_286,fx,i18n,keys,lang,on,_287,has,_288,_289,_28a,_28b,_28c,_28d,_28e,_28f,_290,_291,_292,_293,_294,_295){
var _296=_281("dijit._DialogBase",[_28e,_290,_291,_28f],{templateString:_294,baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},_setTitleAttr:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}],open:false,duration:_28c.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,_setDraggableAttr:function(val){
this._set("draggable",val);
},"aria-describedby":"",maxRatio:0.9,postMixInProperties:function(){
var _297=i18n.getLocalization("dijit","common");
lang.mixin(this,_297);
this.inherited(arguments);
},postCreate:function(){
_285.set(this.domNode,{display:"none",position:"absolute"});
this.ownerDocumentBody.appendChild(this.domNode);
this.inherited(arguments);
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide");
this._modalconnects=[];
},onLoad:function(){
this._position();
if(this.autofocus&&_298.isTop(this)){
this._getFocusItems(this.domNode);
_28b.focus(this._firstFocusItem);
}
this.inherited(arguments);
},_endDrag:function(){
var _299=_284.position(this.domNode),_29a=_288.getBox(this.ownerDocument);
_299.y=Math.min(Math.max(_299.y,0),(_29a.h-_299.h));
_299.x=Math.min(Math.max(_299.x,0),(_29a.w-_299.w));
this._relativePosition=_299;
this._position();
},_setup:function(){
var node=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=new ((has("ie")==6)?_28a:_289)(node,{handle:this.titleBar});
this.connect(this._moveable,"onMoveStop","_endDrag");
}else{
_283.add(node,"dijitDialogFixed");
}
this.underlayAttrs={dialogId:this.id,"class":_27f.map(this["class"].split(/\s/),function(s){
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
_285.set(this.containerNode,{width:"auto",height:"auto"});
}
var bb=_284.position(this.domNode);
var _29b=_288.getBox(this.ownerDocument);
_29b.w*=this.maxRatio;
_29b.h*=this.maxRatio;
if(bb.w>=_29b.w||bb.h>=_29b.h){
var _29c=_284.position(this.containerNode),w=Math.min(bb.w,_29b.w)-(bb.w-_29c.w),h=Math.min(bb.h,_29b.h)-(bb.h-_29c.h);
if(this._singleChild&&this._singleChild.resize){
if(typeof this._singleChildOriginalStyle=="undefined"){
this._singleChildOriginalStyle=this._singleChild.domNode.style.cssText;
}
this._singleChild.resize({w:w,h:h});
}else{
_285.set(this.containerNode,{width:w+"px",height:h+"px",overflow:"auto",position:"relative"});
}
}else{
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize();
}
}
},_position:function(){
if(!_283.contains(this.ownerDocumentBody,"dojoMove")){
var node=this.domNode,_29d=_288.getBox(this.ownerDocument),p=this._relativePosition,bb=p?null:_284.position(node),l=Math.floor(_29d.l+(p?p.x:(_29d.w-bb.w)/2)),t=Math.floor(_29d.t+(p?p.y:(_29d.h-bb.h)/2));
_285.set(node,{left:l+"px",top:t+"px"});
}
},_onKey:function(evt){
if(evt.charOrCode){
var node=evt.target;
if(evt.charOrCode===keys.TAB){
this._getFocusItems(this.domNode);
}
var _29e=(this._firstFocusItem==this._lastFocusItem);
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===keys.TAB){
if(!_29e){
_28b.focus(this._lastFocusItem);
}
_286.stop(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===keys.TAB&&!evt.shiftKey){
if(!_29e){
_28b.focus(this._firstFocusItem);
}
_286.stop(evt);
}else{
while(node){
if(node==this.domNode||_283.contains(node,"dijitPopup")){
if(evt.charOrCode==keys.ESCAPE){
this.onCancel();
}else{
return;
}
}
node=node.parentNode;
}
if(evt.charOrCode!==keys.TAB){
_286.stop(evt);
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
var win=_288.get(this.ownerDocument);
this._modalconnects.push(on(win,"scroll",lang.hitch(this,"resize")));
this._modalconnects.push(on(this.domNode,_280._keypress,lang.hitch(this,"_onKey")));
_285.set(this.domNode,{opacity:0,display:""});
this._set("open",true);
this._onShow();
this._size();
this._position();
var _29f;
this._fadeInDeferred=new _282(lang.hitch(this,function(){
_29f.stop();
delete this._fadeInDeferred;
}));
_29f=fx.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:lang.hitch(this,function(){
_298.show(this,this.underlayAttrs);
}),onEnd:lang.hitch(this,function(){
if(this.autofocus&&_298.isTop(this)){
this._getFocusItems(this.domNode);
_28b.focus(this._firstFocusItem);
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
var _2a0;
this._fadeOutDeferred=new _282(lang.hitch(this,function(){
_2a0.stop();
delete this._fadeOutDeferred;
}));
this._fadeOutDeferred.then(lang.hitch(this,"onHide"));
_2a0=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,function(){
this.domNode.style.display="none";
_298.hide(this);
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
if(_292._singleton){
_292._singleton.layout();
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
_298.hide(this);
this.inherited(arguments);
}});
var _2a1=_281("dijit.Dialog",[_293,_296],{});
_2a1._DialogBase=_296;
var _298=_2a1._DialogLevelManager={_beginZIndex:950,show:function(_2a2,_2a3){
ds[ds.length-1].focus=_28b.curNode;
var _2a4=_292._singleton;
if(!_2a4||_2a4._destroyed){
_2a4=_295._underlay=_292._singleton=new _292(_2a3);
}else{
_2a4.set(_2a2.underlayAttrs);
}
var _2a5=ds[ds.length-1].dialog?ds[ds.length-1].zIndex+2:_2a1._DialogLevelManager._beginZIndex;
if(ds.length==1){
_2a4.show();
}
_285.set(_292._singleton.domNode,"zIndex",_2a5-1);
_285.set(_2a2.domNode,"zIndex",_2a5);
ds.push({dialog:_2a2,underlayAttrs:_2a3,zIndex:_2a5});
},hide:function(_2a6){
if(ds[ds.length-1].dialog==_2a6){
ds.pop();
var pd=ds[ds.length-1];
if(!_292._singleton._destroyed){
if(ds.length==1){
_292._singleton.hide();
}else{
_285.set(_292._singleton.domNode,"zIndex",pd.zIndex-1);
_292._singleton.set(pd.underlayAttrs);
}
}
if(_2a6.refocus){
var _2a7=pd.focus;
if(pd.dialog&&(!_2a7||!dom.isDescendant(_2a7,pd.dialog.domNode))){
pd.dialog._getFocusItems(pd.dialog.domNode);
_2a7=pd.dialog._firstFocusItem;
}
if(_2a7){
try{
_2a7.focus();
}
catch(e){
}
}
}
}else{
var idx=_27f.indexOf(_27f.map(ds,function(elem){
return elem.dialog;
}),_2a6);
if(idx!=-1){
ds.splice(idx,1);
}
}
},isTop:function(_2a8){
return ds[ds.length-1].dialog==_2a8;
}};
var ds=_2a1._dialogStack=[{dialog:null,focus:null,underlayAttrs:null}];
if(has("dijit-legacy-requires")){
_287(0,function(){
var _2a9=["dijit/TooltipDialog"];
_27e(_2a9);
});
}
return _2a1;
});
},"dijit/_DialogMixin":function(){
define("dijit/_DialogMixin",["dojo/_base/declare","./a11y"],function(_2aa,a11y){
return _2aa("dijit._DialogMixin",null,{execute:function(){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(){
var _2ab=a11y._getTabNavigable(this.containerNode);
this._firstFocusItem=_2ab.lowest||_2ab.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_2ab.last||_2ab.highest||this._firstFocusItem;
}});
});
},"davinci/version":function(){
define("davinci/version",[],"7");
},"*now":function(r){
r(["dojo/i18n!*preload*davinci/nls/davinci-common*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("davinci/davinci-common",["./version","./repositoryinfo","dijit/dijit","dojo/parser","dijit/Dialog","dijit/Menu","dijit/MenuItem","dijit/Tooltip","dijit/form/Button","dijit/form/DropDownButton","dijit/form/Form","dijit/form/TextBox","dijit/form/ValidationTextBox","dojox/form/PasswordValidator","dojox/validate/regexp"],function(){
});
