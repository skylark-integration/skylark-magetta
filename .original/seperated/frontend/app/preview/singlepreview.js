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
require({cache:{"dojo/uacss":function(){
define(["./dom-geometry","./_base/lang","./ready","./sniff","./_base/window"],function(_1,_2,_3,_4,_5){
var _6=_5.doc.documentElement,ie=_4("ie"),_7=_4("opera"),_8=Math.floor,ff=_4("ff"),_9=_1.boxModel.replace(/-/,""),_a={"dj_ie":ie,"dj_ie6":_8(ie)==6,"dj_ie7":_8(ie)==7,"dj_ie8":_8(ie)==8,"dj_ie9":_8(ie)==9,"dj_quirks":_4("quirks"),"dj_iequirks":ie&&_4("quirks"),"dj_opera":_7,"dj_khtml":_4("khtml"),"dj_webkit":_4("webkit"),"dj_safari":_4("safari"),"dj_chrome":_4("chrome"),"dj_gecko":_4("mozilla"),"dj_ff3":_8(ff)==3};
_a["dj_"+_9]=true;
var _b="";
for(var _c in _a){
if(_a[_c]){
_b+=_c+" ";
}
}
_6.className=_2.trim(_6.className+" "+_b);
_3(90,function(){
if(!_1.isBodyLtr()){
var _d="dj_rtl dijitRtl "+_b.replace(/ /g,"-rtl ");
_6.className=_2.trim(_6.className+" "+_d+"dj_rtl dijitRtl "+_b.replace(/ /g,"-rtl "));
}
});
return _4;
});
},"dojo/dnd/move":function(){
define(["../_base/declare","../dom-geometry","../dom-style","./common","./Mover","./Moveable"],function(_e,_f,_10,dnd,_11,_12){
var _13=_e("dojo.dnd.move.constrainedMoveable",_12,{constraints:function(){
},within:false,constructor:function(_14,_15){
if(!_15){
_15={};
}
this.constraints=_15.constraints;
this.within=_15.within;
},onFirstMove:function(_16){
var c=this.constraintBox=this.constraints.call(this,_16);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=_f.getMarginSize(_16.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_17,_18){
var c=this.constraintBox,s=_17.node.style;
this.onMoving(_17,_18);
_18.l=_18.l<c.l?c.l:c.r<_18.l?c.r:_18.l;
_18.t=_18.t<c.t?c.t:c.b<_18.t?c.b:_18.t;
s.left=_18.l+"px";
s.top=_18.t+"px";
this.onMoved(_17,_18);
}});
var _19=_e("dojo.dnd.move.boxConstrainedMoveable",_13,{box:{},constructor:function(_1a,_1b){
var box=_1b&&_1b.box;
this.constraints=function(){
return box;
};
}});
var _1c=_e("dnd.move.parentConstrainedMoveable",_13,{area:"content",constructor:function(_1d,_1e){
var _1f=_1e&&_1e.area;
this.constraints=function(){
var n=this.node.parentNode,s=_10.getComputedStyle(n),mb=_f.getMarginBox(n,s);
if(_1f=="margin"){
return mb;
}
var t=_f.getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_1f=="border"){
return mb;
}
t=_f.getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_1f=="padding"){
return mb;
}
t=_f.getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
}});
return {constrainedMoveable:_13,boxConstrainedMoveable:_19,parentConstrainedMoveable:_1c};
});
},"dojo/text":function(){
define(["./_base/kernel","require","./has","./_base/xhr"],function(_20,_21,has,xhr){
var _22;
if(1){
_22=function(url,_23,_24){
xhr("GET",{url:url,sync:!!_23,load:_24,headers:_20.config.textPluginHeaders||{}});
};
}else{
if(_21.getText){
_22=_21.getText;
}else{
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _25={},_26=function(_27){
if(_27){
_27=_27.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _28=_27.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_28){
_27=_28[1];
}
}else{
_27="";
}
return _27;
},_29={},_2a={};
_20.cache=function(_2b,url,_2c){
var key;
if(typeof _2b=="string"){
if(/\//.test(_2b)){
key=_2b;
_2c=url;
}else{
key=_21.toUrl(_2b.replace(/\./g,"/")+(url?("/"+url):""));
}
}else{
key=_2b+"";
_2c=url;
}
var val=(_2c!=undefined&&typeof _2c!="string")?_2c.value:_2c,_2d=_2c&&_2c.sanitize;
if(typeof val=="string"){
_25[key]=val;
return _2d?_26(val):val;
}else{
if(val===null){
delete _25[key];
return null;
}else{
if(!(key in _25)){
_22(key,true,function(_2e){
_25[key]=_2e;
});
}
return _2d?_26(_25[key]):_25[key];
}
}
};
return {dynamic:true,normalize:function(id,_2f){
var _30=id.split("!"),url=_30[0];
return (/^\./.test(url)?_2f(url):url)+(_30[1]?"!"+_30[1]:"");
},load:function(id,_31,_32){
var _33=id.split("!"),_34=_33.length>1,_35=_33[0],url=_31.toUrl(_33[0]),_36="url:"+url,_37=_29,_38=function(_39){
_32(_34?_26(_39):_39);
};
if(_35 in _25){
_37=_25[_35];
}else{
if(_36 in _31.cache){
_37=_31.cache[_36];
}else{
if(url in _25){
_37=_25[url];
}
}
}
if(_37===_29){
if(_2a[url]){
_2a[url].push(_38);
}else{
var _3a=_2a[url]=[_38];
_22(url,!_31.async,function(_3b){
_25[_35]=_25[url]=_3b;
for(var i=0;i<_3a.length;){
_3a[i++](_3b);
}
delete _2a[url];
});
}
}else{
_38(_37);
}
}};
});
},"dijit/hccss":function(){
define("dijit/hccss",["dojo/dom-class","dojo/hccss","dojo/ready","dojo/_base/window"],function(_3c,has,_3d,win){
_3d(90,function(){
if(has("highcontrast")){
_3c.add(win.body(),"dijit_a11y");
}
});
return has;
});
},"dijit/_Contained":function(){
define("dijit/_Contained",["dojo/_base/declare","./registry"],function(_3e,_3f){
return _3e("dijit._Contained",null,{_getSibling:function(_40){
var _41=this.domNode;
do{
_41=_41[_40+"Sibling"];
}while(_41&&_41.nodeType!=1);
return _41&&_3f.byNode(_41);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
});
},"dijit/form/HorizontalRule":function(){
define("dijit/form/HorizontalRule",["dojo/_base/declare","../_Widget","../_TemplatedMixin"],function(_42,_43,_44){
return _42("dijit.form.HorizontalRule",[_43,_44],{templateString:"<div class=\"dijitRuleContainer dijitRuleContainerH\"></div>",count:3,container:"containerNode",ruleStyle:"",_positionPrefix:"<div class=\"dijitRuleMark dijitRuleMarkH\" style=\"left:",_positionSuffix:"%;",_suffix:"\"></div>",_genHTML:function(pos){
return this._positionPrefix+pos+this._positionSuffix+this.ruleStyle+this._suffix;
},_isHorizontal:true,buildRendering:function(){
this.inherited(arguments);
var _45;
if(this.count==1){
_45=this._genHTML(50,0);
}else{
var i;
var _46=100/(this.count-1);
if(!this._isHorizontal||this.isLeftToRight()){
_45=this._genHTML(0,0);
for(i=1;i<this.count-1;i++){
_45+=this._genHTML(_46*i,i);
}
_45+=this._genHTML(100,this.count-1);
}else{
_45=this._genHTML(100,0);
for(i=1;i<this.count-1;i++){
_45+=this._genHTML(100-_46*i,i);
}
_45+=this._genHTML(0,this.count-1);
}
}
this.domNode.innerHTML=_45;
}});
});
},"dijit/_Container":function(){
define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct"],function(_47,_48,_49){
return _48("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_4a,_4b){
var _4c=this.containerNode;
if(_4b&&typeof _4b=="number"){
var _4d=this.getChildren();
if(_4d&&_4d.length>=_4b){
_4c=_4d[_4b-1].domNode;
_4b="after";
}
}
_49.place(_4a.domNode,_4c,_4b);
if(this._started&&!_4a._started){
_4a.startup();
}
},removeChild:function(_4e){
if(typeof _4e=="number"){
_4e=this.getChildren()[_4e];
}
if(_4e){
var _4f=_4e.domNode;
if(_4f&&_4f.parentNode){
_4f.parentNode.removeChild(_4f);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_50,dir){
var _51=this.getChildren(),idx=_47.indexOf(this.getChildren(),_50);
return _51[idx+dir];
},getIndexOfChild:function(_52){
return _47.indexOf(this.getChildren(),_52);
}});
});
},"dijit/a11yclick":function(){
define("dijit/a11yclick",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/has","dojo/_base/unload","dojo/_base/window"],function(on,_53,_54,_55,has,_56,win){
var _57=null;
if(has("dom-addeventlistener")){
win.doc.addEventListener("keydown",function(evt){
_57=evt.target;
},true);
}else{
(function(){
var _58=function(evt){
_57=evt.srcElement;
};
win.doc.attachEvent("onkeydown",_58);
_56.addOnWindowUnload(function(){
win.doc.detachEvent("onkeydown",_58);
});
})();
}
function _59(e){
return (e.keyCode===_54.ENTER||e.keyCode===_54.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
return function(_5a,_5b){
if(/input|button/i.test(_5a.nodeName)){
return on(_5a,"click",_5b);
}else{
var _5c=[on(_5a,"keydown",function(e){
if(_59(e)){
_57=e.target;
e.preventDefault();
}
}),on(_5a,"keyup",function(e){
if(_59(e)&&e.target==_57){
_57=null;
on.emit(e.target,"click",{cancelable:true,bubbles:true});
}
}),on(_5a,"click",function(e){
_5b.call(this,e);
})];
if(has("touch")){
var _5d;
_5c.push(on(_5a,"touchend",function(e){
var _5e=e.target;
_5d=setTimeout(function(){
_5d=null;
on.emit(_5e,"click",{cancelable:true,bubbles:true});
},600);
}),on(_5a,"click",function(e){
if(_5d){
clearTimeout(_5d);
}
}));
}
return {remove:function(){
_53.forEach(_5c,function(h){
h.remove();
});
if(_5d){
clearTimeout(_5d);
_5d=null;
}
}};
}
};
return ret;
});
},"dijit/form/_FormWidgetMixin":function(){
define("dijit/form/_FormWidgetMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/sniff","dojo/window","../a11y"],function(_5f,_60,_61,_62,_63,_64,has,_65,_66){
return _60("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",_setDisabledAttr:function(_67){
this._set("disabled",_67);
_61.set(this.focusNode,"disabled",_67);
if(this.valueNode){
_61.set(this.valueNode,"disabled",_67);
}
this.focusNode.setAttribute("aria-disabled",_67?"true":"false");
if(_67){
this._set("hovering",false);
this._set("active",false);
var _68="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_5f.forEach(_63.isArray(_68)?_68:[_68],function(_69){
var _6a=this[_69];
if(has("webkit")||_66.hasDefaultTabStop(_6a)){
_6a.setAttribute("tabIndex","-1");
}else{
_6a.removeAttribute("tabIndex");
}
},this);
}else{
if(this.tabIndex!=""){
this.set("tabIndex",this.tabIndex);
}
}
},_onFocus:function(by){
if(by=="mouse"&&this.isFocusable()){
var _6b=this.connect(this.focusNode,"onfocus",function(){
this.disconnect(_6c);
this.disconnect(_6b);
});
var _6c=this.connect(this.ownerDocumentBody,"onmouseup",function(){
this.disconnect(_6c);
this.disconnect(_6b);
if(this.focused){
this.focus();
}
});
}
if(this.scrollOnFocus){
this.defer(function(){
_65.scrollIntoView(this.domNode);
});
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_62.get(this.domNode,"display")!="none");
},focus:function(){
if(!this.disabled&&this.focusNode.focus){
try{
this.focusNode.focus();
}
catch(e){
}
}
},compare:function(_6d,_6e){
if(typeof _6d=="number"&&typeof _6e=="number"){
return (isNaN(_6d)&&isNaN(_6e))?0:_6d-_6e;
}else{
if(_6d>_6e){
return 1;
}else{
if(_6d<_6e){
return -1;
}else{
return 0;
}
}
}
},onChange:function(){
},_onChangeActive:false,_handleOnChange:function(_6f,_70){
if(this._lastValueReported==undefined&&(_70===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_6f;
}
this._pendingOnChange=this._pendingOnChange||(typeof _6f!=typeof this._lastValueReported)||(this.compare(_6f,this._lastValueReported)!=0);
if((this.intermediateChanges||_70||_70===undefined)&&this._pendingOnChange){
this._lastValueReported=_6f;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
this._onChangeHandle.remove();
}
this._onChangeHandle=this.defer(function(){
this._onChangeHandle=null;
this.onChange(_6f);
});
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
},destroy:function(){
if(this._onChangeHandle){
this._onChangeHandle.remove();
this.onChange(this._lastValueReported);
}
this.inherited(arguments);
}});
});
},"dojo/i18n":function(){
define(["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json","module"],function(_71,_72,has,_73,_74,_75,xhr,_76,_77){
has.add("dojo-preload-i18n-Api",1);
1||has.add("dojo-v1x-i18n-Api",1);
var _78=_71.i18n={},_79=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_7a=function(_7b,_7c,_7d,_7e){
for(var _7f=[_7d+_7e],_80=_7c.split("-"),_81="",i=0;i<_80.length;i++){
_81+=(_81?"-":"")+_80[i];
if(!_7b||_7b[_81]){
_7f.push(_7d+_81+"/"+_7e);
}
}
return _7f;
},_82={},_83=function(_84,_85,_86){
_86=_86?_86.toLowerCase():_71.locale;
_84=_84.replace(/\./g,"/");
_85=_85.replace(/\./g,"/");
return (/root/i.test(_86))?(_84+"/nls/"+_85):(_84+"/nls/"+_86+"/"+_85);
},_87=_71.getL10nName=function(_88,_89,_8a){
return _88=_77.id+"!"+_83(_88,_89,_8a);
},_8b=function(_8c,_8d,_8e,_8f,_90,_91){
_8c([_8d],function(_92){
var _93=_75.clone(_92.root),_94=_7a(!_92._v1x&&_92,_90,_8e,_8f);
_8c(_94,function(){
for(var i=1;i<_94.length;i++){
_93=_75.mixin(_75.clone(_93),arguments[i]);
}
var _95=_8d+"/"+_90;
_82[_95]=_93;
_91();
});
});
},_96=function(id,_97){
return /^\./.test(id)?_97(id):id;
},_98=function(_99){
var _9a=_74.extraLocale||[];
_9a=_75.isArray(_9a)?_9a:[_9a];
_9a.push(_99);
return _9a;
},_9b=function(id,_9c,_9d){
if(has("dojo-preload-i18n-Api")){
var _9e=id.split("*"),_9f=_9e[1]=="preload";
if(_9f){
if(!_82[id]){
_82[id]=1;
_a0(_9e[2],_76.parse(_9e[3]),1,_9c);
}
_9d(1);
}
if(_9f||_a1(id,_9c,_9d)){
return;
}
}
var _a2=_79.exec(id),_a3=_a2[1]+"/",_a4=_a2[5]||_a2[4],_a5=_a3+_a4,_a6=(_a2[5]&&_a2[4]),_a7=_a6||_71.locale,_a8=_a5+"/"+_a7,_a9=_a6?[_a7]:_98(_a7),_aa=_a9.length,_ab=function(){
if(!--_aa){
_9d(_75.delegate(_82[_a8]));
}
};
_73.forEach(_a9,function(_ac){
var _ad=_a5+"/"+_ac;
if(has("dojo-preload-i18n-Api")){
_ae(_ad);
}
if(!_82[_ad]){
_8b(_9c,_a5,_a3,_a4,_ac,_ab);
}else{
_ab();
}
});
};
if(has("dojo-unit-tests")){
var _af=_78.unitTests=[];
}
if(has("dojo-preload-i18n-Api")||1){
var _b0=_78.normalizeLocale=function(_b1){
var _b2=_b1?_b1.toLowerCase():_71.locale;
return _b2=="root"?"ROOT":_b2;
},_b3=function(mid,_b4){
return (1&&1)?_b4.isXdUrl(_72.toUrl(mid+".js")):true;
},_b5=0,_b6=[],_a0=_78._preloadLocalizations=function(_b7,_b8,_b9,_ba){
_ba=_ba||_72;
function _bb(mid,_bc){
if(_b3(mid,_ba)||_b9){
_ba([mid],_bc);
}else{
_c8([mid],_bc,_ba);
}
};
function _bd(_be,_bf){
var _c0=_be.split("-");
while(_c0.length){
if(_bf(_c0.join("-"))){
return;
}
_c0.pop();
}
_bf("ROOT");
};
function _c1(_c2){
_c2=_b0(_c2);
_bd(_c2,function(loc){
if(_73.indexOf(_b8,loc)>=0){
var mid=_b7.replace(/\./g,"/")+"_"+loc;
_b5++;
_bb(mid,function(_c3){
for(var p in _c3){
_82[_72.toAbsMid(p)+"/"+loc]=_c3[p];
}
--_b5;
while(!_b5&&_b6.length){
_9b.apply(null,_b6.shift());
}
});
return true;
}
return false;
});
};
_c1();
_73.forEach(_71.config.extraLocale,_c1);
},_a1=function(id,_c4,_c5){
if(_b5){
_b6.push([id,_c4,_c5]);
}
return _b5;
},_ae=function(){
};
}
if(1){
var _c6={},_c7=new Function("__bundle","__checkForLegacyModules","__mid","__amdValue","var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"+"\t   require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return __amdValue;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_c8=function(_c9,_ca,_cb){
var _cc=[];
_73.forEach(_c9,function(mid){
var url=_cb.toUrl(mid+".js");
function _9b(_cd){
var _ce=_c7(_cd,_ae,mid,_c6);
if(_ce===_c6){
_cc.push(_82[url]=_c6.result);
}else{
if(_ce instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_ce);
_ce={};
}
_cc.push(_82[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_ce:{root:_ce,_v1x:1}));
}
};
if(_82[url]){
_cc.push(_82[url]);
}else{
var _cf=_cb.syncLoadNls(mid);
if(_cf){
_cc.push(_cf);
}else{
if(!xhr){
try{
_cb.getText(url,true,_9b);
}
catch(e){
_cc.push(_82[url]={});
}
}else{
xhr.get({url:url,sync:true,load:_9b,error:function(){
_cc.push(_82[url]={});
}});
}
}
}
});
_ca&&_ca.apply(null,_cc);
};
_ae=function(_d0){
for(var _d1,_d2=_d0.split("/"),_d3=_71.global[_d2[0]],i=1;_d3&&i<_d2.length-1;_d3=_d3[_d2[i++]]){
}
if(_d3){
_d1=_d3[_d2[i]];
if(!_d1){
_d1=_d3[_d2[i].replace(/-/g,"_")];
}
if(_d1){
_82[_d0]=_d1;
}
}
return _d1;
};
_78.getLocalization=function(_d4,_d5,_d6){
var _d7,_d8=_83(_d4,_d5,_d6);
_9b(_d8,(!_b3(_d8,_72)?function(_d9,_da){
_c8(_d9,_da,_72);
}:_72),function(_db){
_d7=_db;
});
return _d7;
};
if(has("dojo-unit-tests")){
_af.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _dc;
_dc=_c7("{prop:1}",_ae,"nonsense",_c6);
t.is({prop:1},_dc);
t.is(undefined,_dc[1]);
_dc=_c7("({prop:1})",_ae,"nonsense",_c6);
t.is({prop:1},_dc);
t.is(undefined,_dc[1]);
_dc=_c7("{'prop-x':1}",_ae,"nonsense",_c6);
t.is({"prop-x":1},_dc);
t.is(undefined,_dc[1]);
_dc=_c7("({'prop-x':1})",_ae,"nonsense",_c6);
t.is({"prop-x":1},_dc);
t.is(undefined,_dc[1]);
_dc=_c7("define({'prop-x':1})",_ae,"nonsense",_c6);
t.is(_c6,_dc);
t.is({"prop-x":1},_c6.result);
_dc=_c7("define('some/module', {'prop-x':1})",_ae,"nonsense",_c6);
t.is(_c6,_dc);
t.is({"prop-x":1},_c6.result);
_dc=_c7("this is total nonsense and should throw an error",_ae,"nonsense",_c6);
t.is(_dc instanceof Error,true);
});
});
}
}
return _75.mixin(_78,{dynamic:true,normalize:_96,load:_9b,cache:_82});
});
},"dijit/BackgroundIframe":function(){
define("dijit/BackgroundIframe",["require","./main","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/sniff","dojo/_base/window"],function(_dd,_de,_df,_e0,_e1,_e2,on,has,win){
var _e3=new function(){
var _e4=[];
this.pop=function(){
var _e5;
if(_e4.length){
_e5=_e4.pop();
_e5.style.display="";
}else{
if(has("ie")<9){
var _e6=_df["dojoBlankHtmlUrl"]||_dd.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var _e7="<iframe src='"+_e6+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_e5=win.doc.createElement(_e7);
}else{
_e5=_e0.create("iframe");
_e5.src="javascript:\"\"";
_e5.className="dijitBackgroundIframe";
_e5.setAttribute("role","presentation");
_e1.set(_e5,"opacity",0.1);
}
_e5.tabIndex=-1;
}
return _e5;
};
this.push=function(_e8){
_e8.style.display="none";
_e4.push(_e8);
};
}();
_de.BackgroundIframe=function(_e9){
if(!_e9.id){
throw new Error("no id");
}
if(has("ie")||has("mozilla")){
var _ea=(this.iframe=_e3.pop());
_e9.appendChild(_ea);
if(has("ie")<7||has("quirks")){
this.resize(_e9);
this._conn=on(_e9,"resize",_e2.hitch(this,function(){
this.resize(_e9);
}));
}else{
_e1.set(_ea,{width:"100%",height:"100%"});
}
}
};
_e2.extend(_de.BackgroundIframe,{resize:function(_eb){
if(this.iframe){
_e1.set(this.iframe,{width:_eb.offsetWidth+"px",height:_eb.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_e3.push(this.iframe);
delete this.iframe;
}
}});
return _de.BackgroundIframe;
});
},"dijit/form/_FormValueMixin":function(){
define("dijit/form/_FormValueMixin",["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/sniff","./_FormWidgetMixin"],function(_ec,_ed,_ee,has,_ef){
return _ec("dijit.form._FormValueMixin",_ef,{readOnly:false,_setReadOnlyAttr:function(_f0){
_ed.set(this.focusNode,"readOnly",_f0);
this.focusNode.setAttribute("aria-readonly",_f0);
this._set("readOnly",_f0);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_f1,_f2){
this._handleOnChange(_f1,_f2);
},_handleOnChange:function(_f3,_f4){
this._set("value",_f3);
this.inherited(arguments);
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
},_onKeyDown:function(e){
if(e.keyCode==_ee.ESCAPE&&!(e.ctrlKey||e.altKey||e.metaKey)){
if(has("ie")<9||(has("ie")&&has("quirks"))){
e.preventDefault();
var _f5=e.srcElement,te=_f5.ownerDocument.createEventObject();
te.keyCode=_ee.ESCAPE;
te.shiftKey=e.shiftKey;
_f5.fireEvent("onkeypress",te);
}
}
}});
});
},"dojo/dnd/Mover":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/lang","../sniff","../_base/window","../dom","../dom-geometry","../dom-style","../Evented","../on","../touch","./common","./autoscroll"],function(_f6,_f7,_f8,_f9,has,win,dom,_fa,_fb,_fc,on,_fd,dnd,_fe){
return _f7("dojo.dnd.Mover",[_fc],{constructor:function(_ff,e,host){
this.node=dom.byId(_ff);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=_ff.ownerDocument;
this.events=[on(d,_fd.move,_f9.hitch(this,"onFirstMove")),on(d,_fd.move,_f9.hitch(this,"onMouseMove")),on(d,_fd.release,_f9.hitch(this,"onMouseUp")),on(d,"dragstart",_f8.stop),on(d.body,"selectstart",_f8.stop)];
_fe.autoScrollStart(d);
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
_fe.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY},e);
_f8.stop(e);
},onMouseUp:function(e){
if(has("webkit")&&has("mac")&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
_f8.stop(e);
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
var m=_fa.getMarginBox(this.node);
var b=win.doc.body;
var bs=_fb.getComputedStyle(b);
var bm=_fa.getMarginBox(b,bs);
var bc=_fa.getContentBox(b,bs);
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
_f6.forEach(this.events,function(_100){
_100.remove();
});
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
});
},"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>","dojo/Stateful":function(){
define(["./_base/declare","./_base/lang","./_base/array","dojo/when"],function(_101,lang,_102,when){
return _101("dojo.Stateful",null,{_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
return (apn[name]={s:"_"+name+"Setter",g:"_"+name+"Getter"});
},postscript:function(_103){
if(_103){
this.set(_103);
}
},_get:function(name,_104){
return typeof this[_104.g]==="function"?this[_104.g]():this[name];
},get:function(name){
return this._get(name,this._getAttrNames(name));
},set:function(name,_105){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _106=this._getAttrNames(name),_107=this._get(name,_106),_108=this[_106.s],_109;
if(typeof _108==="function"){
_109=_108.apply(this,Array.prototype.slice.call(arguments,1));
}else{
this[name]=_105;
}
if(this._watchCallbacks){
var self=this;
when(_109,function(){
self._watchCallbacks(name,_107,_105);
});
}
return this;
},_changeAttrValue:function(name,_10a){
var _10b=this.get(name);
this[name]=_10a;
if(this._watchCallbacks){
this._watchCallbacks(name,_10b,_10a);
}
return this;
},watch:function(name,_10c){
var _10d=this._watchCallbacks;
if(!_10d){
var self=this;
_10d=this._watchCallbacks=function(name,_10e,_10f,_110){
var _111=function(_112){
if(_112){
_112=_112.slice();
for(var i=0,l=_112.length;i<l;i++){
_112[i].call(self,name,_10e,_10f);
}
}
};
_111(_10d["_"+name]);
if(!_110){
_111(_10d["*"]);
}
};
}
if(!_10c&&typeof name==="function"){
_10c=name;
name="*";
}else{
name="_"+name;
}
var _113=_10d[name];
if(typeof _113!=="object"){
_113=_10d[name]=[];
}
_113.push(_10c);
var _114={};
_114.unwatch=_114.remove=function(){
var _115=_102.indexOf(_113,_10c);
if(_115>-1){
_113.splice(_115,1);
}
};
return _114;
}});
});
},"dojo/data/util/sorter":function(){
define(["../../_base/lang"],function(lang){
var _116={};
lang.setObject("dojo.data.util.sorter",_116);
_116.basicComparator=function(a,b){
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
_116.createSortFunction=function(_117,_118){
var _119=[];
function _11a(attr,dir,comp,s){
return function(_11b,_11c){
var a=s.getValue(_11b,attr);
var b=s.getValue(_11c,attr);
return dir*comp(a,b);
};
};
var _11d;
var map=_118.comparatorMap;
var bc=_116.basicComparator;
for(var i=0;i<_117.length;i++){
_11d=_117[i];
var attr=_11d.attribute;
if(attr){
var dir=(_11d.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_119.push(_11a(attr,dir,comp,_118));
}
}
return function(rowA,rowB){
var i=0;
while(i<_119.length){
var ret=_119[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
return _116;
});
},"dojo/store/util/QueryResults":function(){
define(["../../_base/array","../../_base/lang","../../_base/Deferred"],function(_11e,lang,_11f){
var _120=function(_121){
if(!_121){
return _121;
}
if(_121.then){
_121=lang.delegate(_121);
}
function _122(_123){
if(!_121[_123]){
_121[_123]=function(){
var args=arguments;
return _11f.when(_121,function(_124){
Array.prototype.unshift.call(args,_124);
return _120(_11e[_123].apply(_11e,args));
});
};
}
};
_122("forEach");
_122("filter");
_122("map");
if(!_121.total){
_121.total=_11f.when(_121,function(_125){
return _125.length;
});
}
return _121;
};
lang.setObject("dojo.store.util.QueryResults",_120);
return _120;
});
},"dojo/touch":function(){
define(["./_base/kernel","./_base/lang","./aspect","./dom","./on","./has","./mouse","./ready","./_base/window"],function(dojo,lang,_126,dom,on,has,_127,_128,win){
var _129=has("touch");
var _12a,_12b;
if(_129){
_128(function(){
_12b=win.body();
win.doc.addEventListener("touchstart",function(evt){
var _12c=_12b;
_12b=evt.target;
on.emit(_12c,"dojotouchout",{target:_12c,relatedTarget:_12b,bubbles:true});
on.emit(_12b,"dojotouchover",{target:_12b,relatedTarget:_12c,bubbles:true});
},true);
on(win.doc,"touchmove",function(evt){
var _12d=win.doc.elementFromPoint(evt.pageX-win.global.pageXOffset,evt.pageY-win.global.pageYOffset);
if(_12d&&_12b!==_12d){
on.emit(_12b,"dojotouchout",{target:_12b,relatedTarget:_12d,bubbles:true});
on.emit(_12d,"dojotouchover",{target:_12d,relatedTarget:_12b,bubbles:true});
_12b=_12d;
}
});
});
_12a=function(node,_12e){
return on(win.doc,"touchmove",function(evt){
if(node===win.doc||dom.isDescendant(_12b,node)){
_12e.call(this,lang.mixin({},evt,{target:_12b}));
}
});
};
}
function _12f(type){
return function(node,_130){
return on(node,type,_130);
};
};
var _131={press:_12f(_129?"touchstart":"mousedown"),move:_129?_12a:_12f("mousemove"),release:_12f(_129?"touchend":"mouseup"),cancel:_129?_12f("touchcancel"):_127.leave,over:_12f(_129?"dojotouchover":"mouseover"),out:_12f(_129?"dojotouchout":"mouseout"),enter:_127._eventHandler(_129?"dojotouchover":"mouseover"),leave:_127._eventHandler(_129?"dojotouchout":"mouseout")};
1&&(dojo.touch=_131);
return _131;
});
},"dijit/_CssStateMixin":function(){
define("dijit/_CssStateMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/window","./registry"],function(_132,_133,dom,_134,lang,on,_135,win,_136){
var _137=_133("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_132.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active","_opened"],function(attr){
this.watch(attr,lang.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._trackMouseState(this.domNode,this.baseClass);
this._setStateClass();
},_cssMouseEvent:function(_138){
if(!this.disabled){
switch(_138.type){
case "mouseover":
this._set("hovering",true);
this._set("active",this._mouseDown);
break;
case "mouseout":
this._set("hovering",false);
this._set("active",false);
break;
case "mousedown":
case "touchstart":
this._set("active",true);
break;
case "mouseup":
case "touchend":
this._set("active",false);
break;
}
}
},_setStateClass:function(){
var _139=this.baseClass.split(" ");
function _13a(_13b){
_139=_139.concat(_132.map(_139,function(c){
return c+_13b;
}),"dijit"+_13b);
};
if(!this.isLeftToRight()){
_13a("Rtl");
}
var _13c=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_13a(_13c);
}
if(this.state){
_13a(this.state);
}
if(this.selected){
_13a("Selected");
}
if(this._opened){
_13a("Opened");
}
if(this.disabled){
_13a("Disabled");
}else{
if(this.readOnly){
_13a("ReadOnly");
}else{
if(this.active){
_13a("Active");
}else{
if(this.hovering){
_13a("Hover");
}
}
}
}
if(this.focused){
_13a("Focused");
}
var tn=this.stateNode||this.domNode,_13d={};
_132.forEach(tn.className.split(" "),function(c){
_13d[c]=true;
});
if("_stateClasses" in this){
_132.forEach(this._stateClasses,function(c){
delete _13d[c];
});
}
_132.forEach(_139,function(c){
_13d[c]=true;
});
var _13e=[];
for(var c in _13d){
_13e.push(c);
}
tn.className=_13e.join(" ");
this._stateClasses=_139;
},_subnodeCssMouseEvent:function(node,_13f,evt){
if(this.disabled||this.readOnly){
return;
}
function _140(_141){
_134.toggle(node,_13f+"Hover",_141);
};
function _142(_143){
_134.toggle(node,_13f+"Active",_143);
};
function _144(_145){
_134.toggle(node,_13f+"Focused",_145);
};
switch(evt.type){
case "mouseover":
_140(true);
break;
case "mouseout":
_140(false);
_142(false);
break;
case "mousedown":
case "touchstart":
_142(true);
break;
case "mouseup":
case "touchend":
_142(false);
break;
case "focus":
case "focusin":
_144(true);
break;
case "blur":
case "focusout":
_144(false);
break;
}
},_trackMouseState:function(node,_146){
node._cssState=_146;
}});
_135(function(){
function _147(evt){
if(!dom.isDescendant(evt.relatedTarget,evt.target)){
for(var node=evt.target;node&&node!=evt.relatedTarget;node=node.parentNode){
if(node._cssState){
var _148=_136.getEnclosingWidget(node);
if(_148){
if(node==_148.domNode){
_148._cssMouseEvent(evt);
}else{
_148._subnodeCssMouseEvent(node,node._cssState,evt);
}
}
}
}
}
};
function _149(evt){
evt.target=evt.srcElement;
_147(evt);
};
var body=win.body();
_132.forEach(["mouseover","mouseout","mousedown","touchstart","mouseup","touchend"],function(type){
if(body.addEventListener){
body.addEventListener(type,_147,true);
}else{
body.attachEvent("on"+type,_149);
}
});
on(body,"focusin, focusout",function(evt){
var node=evt.target;
if(node._cssState&&!node.getAttribute("widgetId")){
var _14a=_136.getEnclosingWidget(node);
_14a._subnodeCssMouseEvent(node,node._cssState,evt);
}
});
});
return _137;
});
},"dojo/hccss":function(){
define(["require","./_base/config","./dom-class","./dom-construct","./dom-style","./has","./ready","./_base/window"],function(_14b,_14c,_14d,_14e,_14f,has,_150,win){
has.add("highcontrast",function(){
var div=win.doc.createElement("div");
div.style.cssText="border: 1px solid; border-color:red green; position: absolute; height: 5px; top: -999px;"+"background-image: url("+(_14c.blankGif||_14b.toUrl("./resources/blank.gif"))+");";
win.body().appendChild(div);
var cs=_14f.getComputedStyle(div),_151=cs.backgroundImage,hc=(cs.borderTopColor==cs.borderRightColor)||(_151&&(_151=="none"||_151=="url(invalid-url:)"));
_14e.destroy(div);
return hc;
});
_150(90,function(){
if(has("highcontrast")){
_14d.add(win.body(),"dj_a11y");
}
});
return has;
});
},"dojo/string":function(){
define(["./_base/kernel","./_base/lang"],function(_152,lang){
var _153={};
lang.setObject("dojo.string",_153);
_153.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
_153.pad=function(text,size,ch,end){
if(!ch){
ch="0";
}
var out=String(text),pad=_153.rep(ch,Math.ceil((size-out.length)/ch.length));
return end?out+pad:pad+out;
};
_153.substitute=function(_154,map,_155,_156){
_156=_156||_152.global;
_155=_155?lang.hitch(_156,_155):function(v){
return v;
};
return _154.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_157,key,_158){
var _159=lang.getObject(key,false,map);
if(_158){
_159=lang.getObject(_158,false,_156).call(_156,_159,key);
}
return _155(_159,key).toString();
});
};
_153.trim=String.prototype.trim?lang.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
return _153;
});
},"dijit/form/_FormValueWidget":function(){
define("dijit/form/_FormValueWidget",["dojo/_base/declare","dojo/sniff","./_FormWidget","./_FormValueMixin"],function(_15a,has,_15b,_15c){
return _15a("dijit.form._FormValueWidget",[_15b,_15c],{_layoutHackIE7:function(){
if(has("ie")==7){
var _15d=this.domNode;
var _15e=_15d.parentNode;
var _15f=_15d.firstChild||_15d;
var _160=_15f.style.filter;
var _161=this;
while(_15e&&_15e.clientHeight==0){
(function ping(){
var _162=_161.connect(_15e,"onscroll",function(){
_161.disconnect(_162);
_15f.style.filter=(new Date()).getMilliseconds();
_161.defer(function(){
_15f.style.filter=_160;
});
});
})();
_15e=_15e.parentNode;
}
}
}});
});
},"dijit/form/Button":function(){
require({cache:{"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n"}});
define("dijit/form/Button",["require","dojo/_base/declare","dojo/dom-class","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_163,_164,_165,has,_166,lang,_167,_168,_169,_16a){
if(has("dijit-legacy-requires")){
_167(0,function(){
var _16b=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_163(_16b);
});
}
return _164("dijit.form.Button",[_168,_169],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_16a,_setValueAttr:"valueNode",_onClick:function(e){
var ok=this.inherited(arguments);
if(ok){
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
e.stopPropagation();
}
}
return ok;
},_fillContent:function(_16c){
if(_16c&&(!this.params||!("label" in this.params))){
var _16d=lang.trim(_16c.innerHTML);
if(_16d){
this.label=_16d;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_165.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_16e){
_166.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_16e);
},_setLabelAttr:function(_16f){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
});
},"dijit/_KeyNavContainer":function(){
define("dijit/_KeyNavContainer",["dojo/_base/kernel","./_Container","./_FocusMixin","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/event","dojo/dom-attr","dojo/_base/lang"],function(_170,_171,_172,_173,keys,_174,_175,_176,lang){
return _174("dijit._KeyNavContainer",[_172,_171],{tabIndex:"0",connectKeyNavHandlers:function(_177,_178){
var _179=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_173.forEach(_177,function(code){
_179[code]=prev;
});
_173.forEach(_178,function(code){
_179[code]=next;
});
_179[keys.HOME]=lang.hitch(this,"focusFirstChild");
_179[keys.END]=lang.hitch(this,"focusLastChild");
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
this.connect(this.domNode,"onfocus","_onContainerFocus");
},startupKeyNavChildren:function(){
_170.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_173.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_17a,_17b){
this.inherited(arguments);
this._startupChild(_17a);
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
},focusChild:function(_17c,last){
if(!_17c){
return;
}
if(this.focusedChild&&_17c!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_17c.set("tabIndex",this.tabIndex);
_17c.focus(last?"end":"start");
this._set("focusedChild",_17c);
},_startupChild:function(_17d){
_17d.set("tabIndex","-1");
this.connect(_17d,"_onFocus",function(){
_17d.set("tabIndex",this.tabIndex);
});
this.connect(_17d,"_onBlur",function(){
_17d.set("tabIndex","-1");
});
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focusFirstChild();
_176.set(this.domNode,"tabIndex","-1");
},_onBlur:function(evt){
if(this.tabIndex){
_176.set(this.domNode,"tabIndex",this.tabIndex);
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
_175.stop(evt);
}
},_onChildBlur:function(){
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},_getNextFocusableChild:function(_17e,dir){
if(_17e){
_17e=this._getSiblingOfChild(_17e,dir);
}
var _17f=this.getChildren();
for(var i=0;i<_17f.length;i++){
if(!_17e){
_17e=_17f[(dir>0)?0:(_17f.length-1)];
}
if(_17e.isFocusable()){
return _17e;
}
_17e=this._getSiblingOfChild(_17e,dir);
}
return null;
}});
});
},"dojo/dnd/autoscroll":function(){
define(["../_base/lang","../sniff","../_base/window","../dom-geometry","../dom-style","../window"],function(lang,has,win,_180,_181,_182){
var _183={};
lang.setObject("dojo.dnd.autoscroll",_183);
_183.getViewport=_182.getBox;
_183.V_TRIGGER_AUTOSCROLL=32;
_183.H_TRIGGER_AUTOSCROLL=32;
_183.V_AUTOSCROLL_VALUE=16;
_183.H_AUTOSCROLL_VALUE=16;
var _184,doc=win.doc,_185=Infinity,_186=Infinity;
_183.autoScrollStart=function(d){
doc=d;
_184=_182.getBox(doc);
var html=win.body(doc).parentNode;
_185=Math.max(html.scrollHeight-_184.h,0);
_186=Math.max(html.scrollWidth-_184.w,0);
};
_183.autoScroll=function(e){
var v=_184||_182.getBox(doc),html=win.body(doc).parentNode,dx=0,dy=0;
if(e.clientX<_183.H_TRIGGER_AUTOSCROLL){
dx=-_183.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-_183.H_TRIGGER_AUTOSCROLL){
dx=Math.min(_183.H_AUTOSCROLL_VALUE,_186-html.scrollLeft);
}
}
if(e.clientY<_183.V_TRIGGER_AUTOSCROLL){
dy=-_183.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-_183.V_TRIGGER_AUTOSCROLL){
dy=Math.min(_183.V_AUTOSCROLL_VALUE,_185-html.scrollTop);
}
}
window.scrollBy(dx,dy);
};
_183._validNodes={"div":1,"p":1,"td":1};
_183._validOverflow={"auto":1,"scroll":1};
_183.autoScrollNodes=function(e){
var b,t,w,h,rx,ry,dx=0,dy=0,_187,_188;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in _183._validNodes)){
var s=_181.getComputedStyle(n),_189=(s.overflow.toLowerCase() in _183._validOverflow),_18a=(s.overflowX.toLowerCase() in _183._validOverflow),_18b=(s.overflowY.toLowerCase() in _183._validOverflow);
if(_189||_18a||_18b){
b=_180.getContentBox(n,s);
t=_180.position(n,true);
}
if(_189||_18a){
w=Math.min(_183.H_TRIGGER_AUTOSCROLL,b.w/2);
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
_187=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_189||_18b){
h=Math.min(_183.V_TRIGGER_AUTOSCROLL,b.h/2);
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
_188=n.scrollTop;
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
_183.autoScroll(e);
};
return _183;
});
},"dijit/registry":function(){
define("dijit/registry",["dojo/_base/array","dojo/sniff","dojo/_base/unload","dojo/_base/window","./main"],function(_18c,has,_18d,win,_18e){
var _18f={},hash={};
var _190={length:0,add:function(_191){
if(hash[_191.id]){
throw new Error("Tried to register widget with id=="+_191.id+" but that id is already registered");
}
hash[_191.id]=_191;
this.length++;
},remove:function(id){
if(hash[id]){
delete hash[id];
this.length--;
}
},byId:function(id){
return typeof id=="string"?hash[id]:id;
},byNode:function(node){
return hash[node.getAttribute("widgetId")];
},toArray:function(){
var ar=[];
for(var id in hash){
ar.push(hash[id]);
}
return ar;
},getUniqueId:function(_192){
var id;
do{
id=_192+"_"+(_192 in _18f?++_18f[_192]:_18f[_192]=0);
}while(hash[id]);
return _18e._scopeName=="dijit"?id:_18e._scopeName+"_"+id;
},findWidgets:function(root,_193){
var _194=[];
function _195(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _196=node.getAttribute("widgetId");
if(_196){
var _197=hash[_196];
if(_197){
_194.push(_197);
}
}else{
if(node!==_193){
_195(node);
}
}
}
}
};
_195(root);
return _194;
},_destroyAll:function(){
_18e._curFocus=null;
_18e._prevFocus=null;
_18e._activeStack=[];
_18c.forEach(_190.findWidgets(win.body()),function(_198){
if(!_198._destroyed){
if(_198.destroyRecursive){
_198.destroyRecursive();
}else{
if(_198.destroy){
_198.destroy();
}
}
}
});
},getEnclosingWidget:function(node){
while(node){
var id=node.getAttribute&&node.getAttribute("widgetId");
if(id){
return hash[id];
}
node=node.parentNode;
}
return null;
},_hash:hash};
_18e.registry=_190;
return _190;
});
},"dijit/Destroyable":function(){
define("dijit/Destroyable",["dojo/_base/array","dojo/aspect","dojo/_base/declare"],function(_199,_19a,_19b){
return _19b("dijit.Destroyable",null,{destroy:function(_19c){
this._destroyed=true;
},own:function(){
_199.forEach(arguments,function(_19d){
var _19e="destroyRecursive" in _19d?"destroyRecursive":"destroy" in _19d?"destroy":"remove";
_19d._odh=_19a.before(this,"destroy",function(_19f){
_19d._odh.remove();
_19d[_19e](_19f);
});
_19a.after(_19d,_19e,function(){
_19d._odh.remove();
});
},this);
return arguments;
}});
});
},"dijit/_base/manager":function(){
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","dojo/_base/lang","../registry","../main"],function(_1a0,_1a1,lang,_1a2,_1a3){
var _1a4={};
_1a0.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_1a4[name]=_1a2[name];
});
lang.mixin(_1a4,{defaultDuration:_1a1["defaultDuration"]||200});
lang.mixin(_1a3,_1a4);
return _1a3;
});
},"dijit/a11y":function(){
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/sniff","./main"],function(_1a5,_1a6,_1a7,dom,_1a8,_1a9,has,_1aa){
var _1ab=(_1aa._isElementShown=function(elem){
var s=_1a9.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_1a8.get(elem,"type")!="hidden");
});
_1aa.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _1a8.has(elem,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
var body;
try{
var _1ac=elem.contentDocument;
if("designMode" in _1ac&&_1ac.designMode=="on"){
return true;
}
body=_1ac.body;
}
catch(e1){
try{
body=elem.contentWindow.document.body;
}
catch(e2){
return false;
}
}
return body&&(body.contentEditable=="true"||(body.firstChild&&body.firstChild.contentEditable=="true"));
default:
return elem.contentEditable=="true";
}
};
var _1ad=(_1aa.isTabNavigable=function(elem){
if(_1a8.get(elem,"disabled")){
return false;
}else{
if(_1a8.has(elem,"tabIndex")){
return _1a8.get(elem,"tabIndex")>=0;
}else{
return _1aa.hasDefaultTabStop(elem);
}
}
});
_1aa._getTabNavigable=function(root){
var _1ae,last,_1af,_1b0,_1b1,_1b2,_1b3={};
function _1b4(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _1b5=function(_1b6){
for(var _1b7=_1b6.firstChild;_1b7;_1b7=_1b7.nextSibling){
if(_1b7.nodeType!=1||(has("ie")&&_1b7.scopeName!=="HTML")||!_1ab(_1b7)){
continue;
}
if(_1ad(_1b7)){
var _1b8=+_1a8.get(_1b7,"tabIndex");
if(!_1a8.has(_1b7,"tabIndex")||_1b8==0){
if(!_1ae){
_1ae=_1b7;
}
last=_1b7;
}else{
if(_1b8>0){
if(!_1af||_1b8<_1b0){
_1b0=_1b8;
_1af=_1b7;
}
if(!_1b1||_1b8>=_1b2){
_1b2=_1b8;
_1b1=_1b7;
}
}
}
var rn=_1b4(_1b7);
if(_1a8.get(_1b7,"checked")&&rn){
_1b3[rn]=_1b7;
}
}
if(_1b7.nodeName.toUpperCase()!="SELECT"){
_1b5(_1b7);
}
}
};
if(_1ab(root)){
_1b5(root);
}
function rs(node){
return _1b3[_1b4(node)]||node;
};
return {first:rs(_1ae),last:rs(last),lowest:rs(_1af),highest:rs(_1b1)};
};
_1aa.getFirstInTabbingOrder=function(root,doc){
var _1b9=_1aa._getTabNavigable(dom.byId(root,doc));
return _1b9.lowest?_1b9.lowest:_1b9.first;
};
_1aa.getLastInTabbingOrder=function(root,doc){
var _1ba=_1aa._getTabNavigable(dom.byId(root,doc));
return _1ba.last?_1ba.last:_1ba.highest;
};
return {hasDefaultTabStop:_1aa.hasDefaultTabStop,isTabNavigable:_1aa.isTabNavigable,_getTabNavigable:_1aa._getTabNavigable,getFirstInTabbingOrder:_1aa.getFirstInTabbingOrder,getLastInTabbingOrder:_1aa.getLastInTabbingOrder};
});
},"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n","dijit/typematic":function(){
define("dijit/typematic",["dojo/_base/array","dojo/_base/connect","dojo/_base/event","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/sniff","./main"],function(_1bb,_1bc,_1bd,_1be,lang,on,has,_1bf){
var _1c0=(_1bf.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(lang.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_1c1,node,_1c2,obj,_1c3,_1c4,_1c5){
if(obj!=this._obj){
this.stop();
this._initialDelay=_1c4||500;
this._subsequentDelay=_1c3||0.9;
this._minDelay=_1c5||10;
this._obj=obj;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=lang.hitch(_1c1,_1c2);
this._evt={faux:true};
for(var attr in evt){
if(attr!="layerX"&&attr!="layerY"){
var v=evt[attr];
if(typeof v!="function"&&typeof v!="undefined"){
this._evt[attr]=v;
}
}
}
this._fireEventAndReload();
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_1c6,_1c7,_1c8,_1c9,_1ca,_1cb){
if(_1c6.keyCode){
_1c6.charOrCode=_1c6.keyCode;
_1be.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_1c6.charCode){
_1c6.charOrCode=String.fromCharCode(_1c6.charCode);
_1be.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
var _1cc=[on(node,_1bc._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==_1c6.charOrCode&&(_1c6.ctrlKey===undefined||_1c6.ctrlKey==evt.ctrlKey)&&(_1c6.altKey===undefined||_1c6.altKey==evt.altKey)&&(_1c6.metaKey===undefined||_1c6.metaKey==(evt.metaKey||false))&&(_1c6.shiftKey===undefined||_1c6.shiftKey==evt.shiftKey)){
_1bd.stop(evt);
_1c0.trigger(evt,_1c7,node,_1c8,_1c6,_1c9,_1ca,_1cb);
}else{
if(_1c0._obj==_1c6){
_1c0.stop();
}
}
})),on(node,"keyup",lang.hitch(this,function(){
if(_1c0._obj==_1c6){
_1c0.stop();
}
}))];
return {remove:function(){
_1bb.forEach(_1cc,function(h){
h.remove();
});
}};
},addMouseListener:function(node,_1cd,_1ce,_1cf,_1d0,_1d1){
var _1d2=[on(node,"mousedown",lang.hitch(this,function(evt){
evt.preventDefault();
_1c0.trigger(evt,_1cd,node,_1ce,node,_1cf,_1d0,_1d1);
})),on(node,"mouseup",lang.hitch(this,function(evt){
if(this._obj){
evt.preventDefault();
}
_1c0.stop();
})),on(node,"mouseout",lang.hitch(this,function(evt){
if(this._obj){
evt.preventDefault();
}
_1c0.stop();
})),on(node,"dblclick",lang.hitch(this,function(evt){
evt.preventDefault();
if(has("ie")<9){
_1c0.trigger(evt,_1cd,node,_1ce,node,_1cf,_1d0,_1d1);
setTimeout(lang.hitch(this,_1c0.stop),50);
}
}))];
return {remove:function(){
_1bb.forEach(_1d2,function(h){
h.remove();
});
}};
},addListener:function(_1d3,_1d4,_1d5,_1d6,_1d7,_1d8,_1d9,_1da){
var _1db=[this.addKeyListener(_1d4,_1d5,_1d6,_1d7,_1d8,_1d9,_1da),this.addMouseListener(_1d3,_1d6,_1d7,_1d8,_1d9,_1da)];
return {remove:function(){
_1bb.forEach(_1db,function(h){
h.remove();
});
}};
}});
return _1c0;
});
},"dijit/form/Select":function(){
require({cache:{"url:dijit/form/templates/Select.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"listbox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitInputField dijitButtonText\"  data-dojo-attach-point=\"containerNode,_popupStateNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitValidationContainer\"\n\t\t\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t/></div\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td\n\t\t><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer\"\n\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t${_buttonInputDisabled}\n\t\t/></td\n\t></tr></tbody\n></table>\n"}});
define("dijit/form/Select",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/_base/event","dojo/i18n","dojo/_base/lang","dojo/sniff","./_FormSelectWidget","../_HasDropDown","../Menu","../MenuItem","../MenuSeparator","../Tooltip","dojo/text!./templates/Select.html","dojo/i18n!./nls/validate"],function(_1dc,_1dd,_1de,_1df,_1e0,_1e1,i18n,lang,has,_1e2,_1e3,Menu,_1e4,_1e5,_1e6,_1e7){
var _1e8=_1dd("dijit.form._SelectMenu",Menu,{autoFocus:true,buildRendering:function(){
this.inherited(arguments);
var o=(this.menuTableNode=this.domNode);
var n=(this.domNode=this.ownerDocument.createElement("div"));
n.style.cssText="overflow-x: hidden; overflow-y: scroll";
if(o.parentNode){
o.parentNode.replaceChild(n,o);
}
_1df.remove(o,"dijitMenuTable");
n.className=o.className+" dijitSelectMenu";
o.className="dijitReset dijitMenuTable";
o.setAttribute("role","listbox");
n.setAttribute("role","presentation");
n.appendChild(o);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onselectstart",_1e1.stop);
},focus:function(){
var _1e9=false,val=this.parentWidget.value;
if(lang.isArray(val)){
val=val[val.length-1];
}
if(val){
_1dc.forEach(this.parentWidget._getChildren(),function(_1ea){
if(_1ea.option&&(val===_1ea.option.value)){
_1e9=true;
this.focusChild(_1ea,false);
}
},this);
}
if(!_1e9){
this.inherited(arguments);
}
},resize:function(mb){
if(mb){
_1e0.setMarginBox(this.domNode,mb);
if("w" in mb){
this.menuTableNode.style.width="100%";
}
}
}});
var _1eb=_1dd("dijit.form.Select",[_1e2,_1e3],{baseClass:"dijitSelect dijitValidationTextBox",templateString:_1e7,_buttonInputDisabled:has("ie")?"disabled":"",required:false,state:"",message:"",tooltipPosition:[],emptyLabel:"&#160;",_isLoaded:false,_childrenLoaded:false,_fillContent:function(){
this.inherited(arguments);
if(this.options.length&&!this.value&&this.srcNodeRef){
var si=this.srcNodeRef.selectedIndex||0;
this.value=this.options[si>=0?si:0].value;
}
this.dropDown=new _1e8({id:this.id+"_menu",parentWidget:this});
_1df.add(this.dropDown.domNode,this.baseClass.replace(/\s+|$/g,"Menu "));
},_getMenuItemForOption:function(_1ec){
if(!_1ec.value&&!_1ec.label){
return new _1e5({ownerDocument:this.ownerDocument});
}else{
var _1ed=lang.hitch(this,"_setValueAttr",_1ec);
var item=new _1e4({option:_1ec,label:_1ec.label||this.emptyLabel,onClick:_1ed,ownerDocument:this.ownerDocument,dir:this.dir,disabled:_1ec.disabled||false});
item.focusNode.setAttribute("role","option");
return item;
}
},_addOptionItem:function(_1ee){
if(this.dropDown){
this.dropDown.addChild(this._getMenuItemForOption(_1ee));
}
},_getChildren:function(){
if(!this.dropDown){
return [];
}
return this.dropDown.getChildren();
},_loadChildren:function(_1ef){
if(_1ef===true){
if(this.dropDown){
delete this.dropDown.focusedChild;
}
if(this.options.length){
this.inherited(arguments);
}else{
_1dc.forEach(this._getChildren(),function(_1f0){
_1f0.destroyRecursive();
});
var item=new _1e4({ownerDocument:this.ownerDocument,label:this.emptyLabel});
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
},_setValueAttr:function(_1f1){
this.inherited(arguments);
_1de.set(this.valueNode,"value",this.get("value"));
this._refreshState();
},_setDisabledAttr:function(_1f2){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_1f3){
this._set("required",_1f3);
this.focusNode.setAttribute("aria-required",_1f3);
this._refreshState();
},_setOptionsAttr:function(_1f4){
this._isLoaded=false;
this._set("options",_1f4);
},_setDisplay:function(_1f5){
var lbl=_1f5||this.emptyLabel;
this.containerNode.innerHTML="<span role=\"option\" class=\"dijitReset dijitInline "+this.baseClass.replace(/\s+|$/g,"Label ")+"\">"+lbl+"</span>";
},validate:function(_1f6){
var _1f7=this.disabled||this.isValid(_1f6);
this._set("state",_1f7?"":(this._hasBeenBlurred?"Error":"Incomplete"));
this.focusNode.setAttribute("aria-invalid",_1f7?"false":"true");
var _1f8=_1f7?"":this._missingMsg;
if(_1f8&&this.focused&&this._hasBeenBlurred){
_1e6.show(_1f8,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_1e6.hide(this.domNode);
}
this._set("message",_1f8);
return _1f7;
},isValid:function(){
return (!this.required||this.value===0||!(/^\s*$/.test(this.value||"")));
},reset:function(){
this.inherited(arguments);
_1e6.hide(this.domNode);
this._refreshState();
},postMixInProperties:function(){
this.inherited(arguments);
this._missingMsg=i18n.getLocalization("dijit.form","validate",this.lang).missingMessage;
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onselectstart",_1e1.stop);
this.domNode.setAttribute("aria-expanded","false");
if(has("ie")<9){
this.defer(function(){
try{
var s=domStyle.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _1f9=this.domNode.getElementsByTagName("INPUT");
if(_1f9){
for(var i=0;i<_1f9.length;i++){
_1f9[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
});
}
},_setStyleAttr:function(_1fa){
this.inherited(arguments);
_1df.toggle(this.domNode,this.baseClass.replace(/\s+|$/g,"FixedWidth "),!!this.domNode.style.width);
},isLoaded:function(){
return this._isLoaded;
},loadDropDown:function(_1fb){
this._loadChildren(true);
this._isLoaded=true;
_1fb();
},closeDropDown:function(){
this.inherited(arguments);
if(this.dropDown&&this.dropDown.menuTableNode){
this.dropDown.menuTableNode.style.width="";
}
},destroy:function(_1fc){
if(this.dropDown&&!this.dropDown._destroyed){
this.dropDown.destroyRecursive(_1fc);
delete this.dropDown;
}
this.inherited(arguments);
},_onFocus:function(){
this.validate(true);
this.inherited(arguments);
},_onBlur:function(){
_1e6.hide(this.domNode);
this.inherited(arguments);
this.validate(false);
}});
_1eb._Menu=_1e8;
return _1eb;
});
},"dijit/Menu":function(){
define("dijit/Menu",["require","dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_1fd,_1fe,_1ff,_200,dom,_201,_202,_203,keys,lang,on,has,win,_204,pm,_205,_206){
if(has("dijit-legacy-requires")){
_206(0,function(){
var _207=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_1fd(_207);
});
}
return _1ff("dijit.Menu",_205,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],selector:"",contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(this.ownerDocumentBody);
}else{
_1fe.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_208){
return _204.get(this._iframeContentDocument(_208))||this._iframeContentDocument(_208)["__parent__"]||(_208.name&&win.doc.frames[_208.name])||null;
},_iframeContentDocument:function(_209){
return _209.contentDocument||(_209.contentWindow&&_209.contentWindow.document)||(_209.name&&win.doc.frames[_209.name]&&win.doc.frames[_209.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node,this.ownerDocument);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _20a=node,_20b=this._iframeContentWindow(_20a);
cn=win.body(_20b.document);
}else{
cn=(node==win.body(this.ownerDocument)?this.ownerDocument.documentElement:node);
}
var _20c={node:node,iframe:_20a};
_201.set(node,"_dijitMenu"+this.id,this._bindings.push(_20c));
var _20d=lang.hitch(this,function(cn){
var _20e=this.selector,_20f=_20e?function(_210){
return on.selector(_20e,_210);
}:function(_211){
return _211;
},self=this;
return [on(cn,_20f(this.leftClickToOpen?"click":"contextmenu"),function(evt){
_200.stop(evt);
self._scheduleOpen(this,_20a,{x:evt.pageX,y:evt.pageY});
}),on(cn,_20f("keydown"),function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
_200.stop(evt);
self._scheduleOpen(this,_20a);
}
})];
});
_20c.connects=cn?_20d(cn):[];
if(_20a){
_20c.onloadHandler=lang.hitch(this,function(){
var _212=this._iframeContentWindow(_20a);
cn=win.body(_212.document);
_20c.connects=_20d(cn);
});
if(_20a.addEventListener){
_20a.addEventListener("load",_20c.onloadHandler,false);
}else{
_20a.attachEvent("onload",_20c.onloadHandler);
}
}
},unBindDomNode:function(_213){
var node;
try{
node=dom.byId(_213,this.ownerDocument);
}
catch(e){
return;
}
var _214="_dijitMenu"+this.id;
if(node&&_201.has(node,_214)){
var bid=_201.get(node,_214)-1,b=this._bindings[bid],h;
while((h=b.connects.pop())){
h.remove();
}
var _215=b.iframe;
if(_215){
if(_215.removeEventListener){
_215.removeEventListener("load",b.onloadHandler,false);
}else{
_215.detachEvent("onload",b.onloadHandler);
}
}
_201.remove(node,_214);
delete this._bindings[bid];
}
},_scheduleOpen:function(_216,_217,_218){
if(!this._openTimer){
this._openTimer=this.defer(function(){
delete this._openTimer;
this._openMyself({target:_216,iframe:_217,coords:_218});
},1);
}
},_openMyself:function(args){
var _219=args.target,_21a=args.iframe,_21b=args.coords;
this.currentTarget=_219;
if(_21b){
if(_21a){
var ifc=_202.position(_21a,true),_21c=this._iframeContentWindow(_21a),_21d=_202.docScroll(_21c.document);
var cs=_203.getComputedStyle(_21a),tp=_203.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_21a,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_21a,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_21a,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_21a,cs.borderTopWidth):0);
_21b.x+=ifc.x+left-_21d.x;
_21b.y+=ifc.y+top-_21d.y;
}
}else{
_21b=_202.position(_219,true);
_21b.x+=10;
_21b.y+=10;
}
var self=this;
var _21e=this._focusManager.get("prevNode");
var _21f=this._focusManager.get("curNode");
var _220=!_21f||(dom.isDescendant(_21f,this.domNode))?_21e:_21f;
function _221(){
if(self.refocus&&_220){
_220.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_21b.x,y:_21b.y,onExecute:_221,onCancel:_221,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},destroy:function(){
_1fe.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"dojo/regexp":function(){
define(["./_base/kernel","./_base/lang"],function(dojo,lang){
var _222={};
lang.setObject("dojo.regexp",_222);
_222.escapeString=function(str,_223){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_223&&_223.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
_222.buildGroupRE=function(arr,re,_224){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return _222.group(b.join("|"),_224);
};
_222.group=function(_225,_226){
return "("+(_226?"?:":"")+_225+")";
};
return _222;
});
},"dijit/MenuSeparator":function(){
require({cache:{"url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>"}});
define("dijit/MenuSeparator",["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_227,dom,_228,_229,_22a,_22b){
return _227("dijit.MenuSeparator",[_228,_229,_22a],{templateString:_22b,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"preview/silhouetteiframe":function(){
define([],function(){
var _22c=function(args){
var _22d=this.rootNode=args.rootNode;
if(!_22d){
return;
}
if(!this.verifyDOMTree(false)){
return;
}
this._isWebKit=navigator.userAgent.indexOf("WebKit")!=-1;
if(args.svgfilename){
this.svgfilename=args.svgfilename;
}
if(args.orientation){
this.orientation=args.orientation;
}
if(args.scalefactor){
this.scalefactor=args.scalefactor;
}
if(args.margin){
this.margin=args.margin;
}
this._silhouette_div_container_orig_style={};
var _22e=_22d.style;
for(var i=0;i<_22e.length;i++){
this._silhouette_div_container_orig_style[_22e.item(i)]=_22e[_22e.item(i)];
}
var _22f=_22d.querySelectorAll(".silhouetteiframe_iframe");
if(_22f.length>0){
this._init_silhouetteiframe_iframe_orig_style();
}else{
this._silhouetteiframe_iframe_orig_style=null;
}
_22d._silhouetteiframe=this;
this.addStyleDeclarations();
this.updateObjectElement();
};
var _230=1;
_22c.prototype={rootNode:null,svgfilename:undefined,orientation:"portrait",scalefactor:1,margin:0,_object_elem:null,_silhouette_div_container_orig_style:{},_silhouetteiframe_iframe_orig_style:{},_init_silhouetteiframe_iframe_orig_style:function(){
this._silhouetteiframe_iframe_orig_style={};
var _231=this.rootNode.querySelectorAll(".silhouetteiframe_iframe")[0];
var _232=_231.style;
for(var i=0;i<_232.length;i++){
this._silhouetteiframe_iframe_orig_style[_232.item(i)]=_232[_232.item(i)];
}
},verifyDOMTree:function(_233){
var _234=this.rootNode;
if(_234&&_234.children&&_234.children.length){
var _235=_234.children[0];
if(_234.children[0].className==="loading"){
_235=_234.children[1];
}
}else{
console.error("silhouetteiframe.verifyDOMTree(): no children on rootNode");
return false;
}
if(_233){
if(_234.children.length<2){
console.error("silhouetteiframe.verifyDOMTree(): iframe child not present");
return false;
}
var _236;
if(_234.children[0].className==="loading"){
_236=_234.children[2];
}else{
_236=_234.children[1];
}
}
if(_234.nodeName!="DIV"||_234.className.indexOf("silhouette_div_container")==-1||!_235||_235.nodeName!="SPAN"||_235.className.indexOf("silhouetteiframe_object_container")==-1||(_233&&(!_236||_236.nodeName!="IFRAME"||_236.className.indexOf("silhouetteiframe_iframe")==-1))){
console.error("silhouetteiframe.verifyDOMTree(): incorrect DOM tree on rootNode");
return false;
}
return true;
},addStyleDeclarations:function(){
var _237=document.querySelectorAll("style.silhouetteiframe_styles");
if(_237.length==0){
var _238=document.querySelectorAll("head")[0];
if(!_238){
console.error("silhouetteiframe.js addStyleDeclarations(): no HEAD element");
return;
}
var _239=document.createElement("style");
_239.setAttribute("type","text/css");
_239.setAttribute("class","silhouetteiframe_styles");
_239.innerHTML=".silhouetteiframe_div_container { display:inline-block; text-align:left; }\n"+".silhouetteiframe_iframe { position:absolute; top:0px; left:0px; border:none; }";
_238.appendChild(_239);
}
},_restoreStyle:function(_23a,_23b){
if(_23a){
for(var i=_23a.length-1;i>=0;i--){
_23a.removeProperty(_23a.item(i));
}
if(_23b){
for(var i in _23b){
_23a[i]=_23b[i];
}
}
}
},updateObjectElement:function(){
var _23c=this.rootNode.querySelectorAll(".silhouetteiframe_object_container",this.rootNode);
if(_23c.length==0){
return;
}
var _23d=_23c[0];
_23d.innerHTML="";
this.object_elem=null;
if(this.svgfilename){
var _23e=this.rootNode;
if(!this.verifyDOMTree(true)){
return;
}
if(this._silhouetteiframe_iframe_orig_style===null){
this._init_silhouetteiframe_iframe_orig_style();
}
_23d.innerHTML="<object class=\"silhouetteiframe_object\" data=\""+this.svgfilename+"\" type=\"image/svg+xml\" "+"onload=\"event.target.parentNode.parentNode._silhouetteiframe.svgloadhandler(event.target)\"></object>";
}else{
this._restoreStyle(this.rootNode.style,this._silhouette_div_container_orig_style);
var _23f=this.rootNode.querySelectorAll(".silhouetteiframe_iframe",this.rootNode);
if(_23f.length>0){
var _240=_23f[0];
this._restoreStyle(_240.style,this._silhouetteiframe_iframe_orig_style);
}
}
},svgloadhandler:function(_241){
this._object_elem=_241;
var _242=_241.getSVGDocument();
if(_242&&_242.documentURI==_241.data){
this._loadcounter=null;
this._silhouette_reset_size_position(false);
}else{
if(!this._loadcounter){
this._loadcounter=1;
}else{
if(this._loadcounter>=5){
console.error("svgloadhandler failed after 5 tries");
return;
}
this._loadcounter++;
}
this.rootNode.style.display="none";
var that=this;
setTimeout(function(){
that.rootNode.style.display="block";
that._silhouette_reset_size_position(false);
},1);
}
},setSVGFilename:function(_243){
this.svgfilename=_243;
this.updateObjectElement();
},setScaleFactor:function(_244){
this.scalefactor=_244;
if(this._isWebKit){
this.updateObjectElement();
}else{
this._silhouette_reset_size_position(false);
}
},setOrientation:function(_245){
this.orientation=_245;
this._silhouette_reset_size_position(false);
},_silhouette_reset_size_position:function(_246){
var _247=this._object_elem;
var _248=this.orientation;
var _249=this.scalefactor;
if(!_247){
return;
}
var _24a=_247.getSVGDocument();
if(!_24a){
return;
}
var _24b=_24a.documentElement;
var _24c=this.rootNode.querySelector(".silhouetteiframe_iframe");
if(!_24c){
return;
}
var _24d=_24a.querySelector("#DeviceRect");
if(!_24d){
return;
}
var _24e=_24a.querySelector("#ScreenRect");
if(!_24e){
return;
}
var _24f=_24a.querySelector("#ResolutionRect");
if(!_24f){
}
if(_249<=0){
return;
}
var _250=this.rootNode;
var _251=_24d.getAttribute("x")-0;
var _252=_24d.getAttribute("y")-0;
var _253=_24d.getAttribute("width")-0;
var _254=_24d.getAttribute("height")-0;
var _255=_24e.getAttribute("x")-0;
var _256=_24e.getAttribute("y")-0;
var _257=_24e.getAttribute("width")-0;
var _258=_24e.getAttribute("height")-0;
var _259=_255-_251;
var _25a=_256-_252;
var _25b,_25c;
if(_24f){
var _25d=_24f.getAttribute("width")-0;
var _25e=_24f.getAttribute("height")-0;
if(_25d>0&&_25e>0&&_257>0&&_258>0){
_25b=(_25d/_257)*_249;
_25c=(_25e/_258)*_249;
}
}
if(!_25b){
var _25f=4/3;
_25b=_25c=_25f*_249;
}
_24d.style.display="none";
_24e.style.display="none";
if(_24f){
_24f.style.display="none";
}
obj_style=_247.style;
obj_style.overflow="hidden";
var _260=_253*_25b;
var _261=_254*_25c;
var _262=_257*_25b;
var _263=_258*_25c;
var _264=_259*_25b;
var _265="http://www.w3.org/2000/svg";
var _266="http://www.w3.org/1999/xlink";
var _267="_aqzpqtxv";
var _268="g1"+_267,_269="g2"+_267,_26a="a1"+_267,_26b="a2"+_267;
var _26c=_24a.getElementById(_268);
var _26d;
if(_26c){
_26d=_24a.getElementById(_269);
if(!_26d){
return;
}
}else{
_26c=_24a.createElementNS(_265,"g");
_26c.id=_268;
_26d=_24a.createElementNS(_265,"g");
_26d.id=_269;
_26c.appendChild(_26d);
var _26e=null;
for(var i=_24b.childNodes.length-1;i>=0;i--){
_26e=_26d.insertBefore(_24b.childNodes[i],_26e);
}
_24b.appendChild(_26c);
}
var _26f=_24a.createElementNS(_265,"rect");
_26f.setAttribute("x",_255+1);
_26f.setAttribute("y",_256+1);
_26f.setAttribute("width",_257-2);
_26f.setAttribute("height",_258-2);
_26f.setAttribute("fill","lightgray");
_26d.appendChild(_26f);
var _270=_250.style;
_270.position="relative";
_270.overflow="hidden";
_270.marginLeft="0px";
_270.marginTop="0px";
var _271=_24c.style;
var _272=_24c.contentDocument.documentElement;
var _273=_272.style;
var _274=_24c.contentDocument.body;
var _275=_274.style;
_273.overflow="hidden";
_271.overflow="hidden";
_275.transformOrigin=_275.WebkitTransformOrigin=_275.MozTransformOrigin=_275.msTransformOrigin="left top";
_275.transform=_275.WebkitTransform=_275.MozTransform=_275.msTransform="scale("+_249+")";
_275.width=(100/_249)+"%";
_275.height=(100/_249)+"%";
if(_248!=="landscape"){
_24b.setAttribute("width",_260+"px");
_24b.setAttribute("height",_261+"px");
_24b.setAttribute("viewBox",0+" "+0+" "+_260+" "+_261);
var _276=_25a*_25c;
_271.marginLeft=_264+"px";
_271.marginTop=_276+"px";
_271.width=_262+"px";
_271.height=_263+"px";
_26c.setAttribute("transform","translate(0 0) rotate(0)");
_26d.setAttribute("transform","scale("+_25b+","+_25c+") translate(-"+_251+" -"+_252+")");
obj_style.width=_260+"px";
obj_style.height=_261+"px";
_270.width=_260+"px";
_270.height=_261+"px";
setTimeout(function(){
obj_style.width=Math.ceil(_260+1)+"px";
obj_style.height=Math.ceil(_261+1)+"px";
},10);
}else{
_24b.setAttribute("width",_261+"px");
_24b.setAttribute("height",_260+"px");
_24b.setAttribute("viewBox",0+" "+0+" "+_261+" "+_260);
_271.marginLeft=((_254-_258-_25a)*_25c)+"px";
_271.marginTop=_264+"px";
_271.width=_263+"px";
_271.height=_262+"px";
_26c.setAttribute("transform","translate("+_261+" 0) rotate(90)");
_26d.setAttribute("transform","scale("+_25b+","+_25c+") translate(-"+_251+" -"+_252+")");
obj_style.width=_261+"px";
obj_style.height=_260+"px";
_270.width=_261+"px";
_270.height=_260+"px";
setTimeout(function(){
obj_style.width=Math.ceil(_261+1)+"px";
obj_style.height=Math.ceil(_260+1)+"px";
},10);
}
}};
_22c.themeMap={"android_340x480.svg":"Android","android_480x800.svg":"Android","androidtablet.svg":"Android","bbplaybook.svg":"BlackBerry","blackberry.svg":"BlackBerry","ipad.svg":"iPad","iphone.svg":"iPhone"};
_22c.themeCssMap={"Android":["android/android.css"],"BlackBerry":["blackberry/blackberry.css"],"iPad":["iphone/iphone.css","iphone/ipad.css"],"iPhone":["iphone/iphone.css"]};
_22c.getMobileTheme=function(_277){
return _22c.themeMap[_277.split("/").pop()];
};
_22c.getMobileCss=function(_278){
return _22c.themeCssMap[_278||"iPhone"];
};
return _22c;
});
},"dojo/dnd/common":function(){
define(["../_base/connect","../_base/kernel","../_base/lang","../dom"],function(_279,_27a,lang,dom){
var _27b={};
_27b.getCopyKeyState=_279.isCopyKey;
_27b._uniqueId=0;
_27b.getUniqueId=function(){
var id;
do{
id=_27a._scopeName+"Unique"+(++_27b._uniqueId);
}while(dom.byId(id));
return id;
};
_27b._empty={};
_27b.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
lang.mixin(lang.getObject("dojo.dnd",true),_27b);
return _27b;
});
},"dijit/place":function(){
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window","./main"],function(_27c,_27d,_27e,_27f,win,_280,_281){
function _282(node,_283,_284,_285){
var view=_280.getBox(node.ownerDocument);
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
win.body(node.ownerDocument).appendChild(node);
}
var best=null;
_27c.some(_283,function(_286){
var _287=_286.corner;
var pos=_286.pos;
var _288=0;
var _289={w:{"L":view.l+view.w-pos.x,"R":pos.x-view.l,"M":view.w}[_287.charAt(1)],h:{"T":view.t+view.h-pos.y,"B":pos.y-view.t,"M":view.h}[_287.charAt(0)]};
var s=node.style;
s.left=s.right="auto";
if(_284){
var res=_284(node,_286.aroundCorner,_287,_289,_285);
_288=typeof res=="undefined"?0:res;
}
var _28a=node.style;
var _28b=_28a.display;
var _28c=_28a.visibility;
if(_28a.display=="none"){
_28a.visibility="hidden";
_28a.display="";
}
var bb=_27d.position(node);
_28a.display=_28b;
_28a.visibility=_28c;
var _28d={"L":pos.x,"R":pos.x-bb.w,"M":Math.max(view.l,Math.min(view.l+view.w,pos.x+(bb.w>>1))-bb.w)}[_287.charAt(1)],_28e={"T":pos.y,"B":pos.y-bb.h,"M":Math.max(view.t,Math.min(view.t+view.h,pos.y+(bb.h>>1))-bb.h)}[_287.charAt(0)],_28f=Math.max(view.l,_28d),_290=Math.max(view.t,_28e),endX=Math.min(view.l+view.w,_28d+bb.w),endY=Math.min(view.t+view.h,_28e+bb.h),_291=endX-_28f,_292=endY-_290;
_288+=(bb.w-_291)+(bb.h-_292);
if(best==null||_288<best.overflow){
best={corner:_287,aroundCorner:_286.aroundCorner,x:_28f,y:_290,w:_291,h:_292,overflow:_288,spaceAvailable:_289};
}
return !_288;
});
if(best.overflow&&_284){
_284(node,best.aroundCorner,best.corner,best.spaceAvailable,_285);
}
var l=_27d.isBodyLtr(node.ownerDocument),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
s[l?"right":"left"]="auto";
return best;
};
var _293={at:function(node,pos,_294,_295){
var _296=_27c.map(_294,function(_297){
var c={corner:_297,pos:{x:pos.x,y:pos.y}};
if(_295){
c.pos.x+=_297.charAt(1)=="L"?_295.x:-_295.x;
c.pos.y+=_297.charAt(0)=="T"?_295.y:-_295.y;
}
return c;
});
return _282(node,_296);
},around:function(node,_298,_299,_29a,_29b){
var _29c=(typeof _298=="string"||"offsetWidth" in _298)?_27d.position(_298,true):_298;
if(_298.parentNode){
var _29d=_27e.getComputedStyle(_298).position=="absolute";
var _29e=_298.parentNode;
while(_29e&&_29e.nodeType==1&&_29e.nodeName!="BODY"){
var _29f=_27d.position(_29e,true),pcs=_27e.getComputedStyle(_29e);
if(/relative|absolute/.test(pcs.position)){
_29d=false;
}
if(!_29d&&/hidden|auto|scroll/.test(pcs.overflow)){
var _2a0=Math.min(_29c.y+_29c.h,_29f.y+_29f.h);
var _2a1=Math.min(_29c.x+_29c.w,_29f.x+_29f.w);
_29c.x=Math.max(_29c.x,_29f.x);
_29c.y=Math.max(_29c.y,_29f.y);
_29c.h=_2a0-_29c.y;
_29c.w=_2a1-_29c.x;
}
if(pcs.position=="absolute"){
_29d=true;
}
_29e=_29e.parentNode;
}
}
var x=_29c.x,y=_29c.y,_2a2="w" in _29c?_29c.w:(_29c.w=_29c.width),_2a3="h" in _29c?_29c.h:(_27f.deprecated("place.around: dijit/place.__Rectangle: { x:"+x+", y:"+y+", height:"+_29c.height+", width:"+_2a2+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_29c.height+", w:"+_2a2+" }","","2.0"),_29c.h=_29c.height);
var _2a4=[];
function push(_2a5,_2a6){
_2a4.push({aroundCorner:_2a5,corner:_2a6,pos:{x:{"L":x,"R":x+_2a2,"M":x+(_2a2>>1)}[_2a5.charAt(1)],y:{"T":y,"B":y+_2a3,"M":y+(_2a3>>1)}[_2a5.charAt(0)]}});
};
_27c.forEach(_299,function(pos){
var ltr=_29a;
switch(pos){
case "above-centered":
push("TM","BM");
break;
case "below-centered":
push("BM","TM");
break;
case "after-centered":
ltr=!ltr;
case "before-centered":
push(ltr?"ML":"MR",ltr?"MR":"ML");
break;
case "after":
ltr=!ltr;
case "before":
push(ltr?"TL":"TR",ltr?"TR":"TL");
push(ltr?"BL":"BR",ltr?"BR":"BL");
break;
case "below-alt":
ltr=!ltr;
case "below":
push(ltr?"BL":"BR",ltr?"TL":"TR");
push(ltr?"BR":"BL",ltr?"TR":"TL");
break;
case "above-alt":
ltr=!ltr;
case "above":
push(ltr?"TL":"TR",ltr?"BL":"BR");
push(ltr?"TR":"TL",ltr?"BR":"BL");
break;
default:
push(pos.aroundCorner,pos.corner);
}
});
var _2a7=_282(node,_2a4,_29b,{w:_2a2,h:_2a3});
_2a7.aroundNodePos=_29c;
return _2a7;
}};
return _281.place=_293;
});
},"dijit/DropDownMenu":function(){
require({cache:{"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\"\n\t   data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_2a8,_2a9,keys,_2aa,_2ab,_2ac){
return _2a8("dijit.DropDownMenu",[_2ac,_2ab],{templateString:_2aa,baseClass:"dijitMenu",postCreate:function(){
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
_2a9.stop(evt);
break;
case this._closeSubMenuKey:
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
_2a9.stop(evt);
}
break;
}
}});
});
},"dijit/_Widget":function(){
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_2ad,_2ae,_2af,_2b0,has,_2b1,lang,_2b2,_2b3,_2b4,_2b5,_2b6,_2b7){
function _2b8(){
};
function _2b9(_2ba){
return function(obj,_2bb,_2bc,_2bd){
if(obj&&typeof _2bb=="string"&&obj[_2bb]==_2b8){
return obj.on(_2bb.substring(2).toLowerCase(),lang.hitch(_2bc,_2bd));
}
return _2ba.apply(_2af,arguments);
};
};
_2ad.around(_2af,"connect",_2b9);
if(_2b1.connect){
_2ad.around(_2b1,"connect",_2b9);
}
var _2be=_2b0("dijit._Widget",[_2b5,_2b6,_2b7],{onClick:_2b8,onDblClick:_2b8,onKeyDown:_2b8,onKeyPress:_2b8,onKeyUp:_2b8,onMouseDown:_2b8,onMouseMove:_2b8,onMouseOut:_2b8,onMouseOver:_2b8,onMouseLeave:_2b8,onMouseEnter:_2b8,onMouseUp:_2b8,constructor:function(_2bf){
this._toConnect={};
for(var name in _2bf){
if(this[name]===_2b8){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_2bf[name];
delete _2bf[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_2b8){
return _2af.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_2c0){
_2b1.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_2c0);
},attr:function(name,_2c1){
if(_2ae.isDebug){
var _2c2=arguments.callee._ach||(arguments.callee._ach={}),_2c3=(arguments.callee.caller||"unknown caller").toString();
if(!_2c2[_2c3]){
_2b1.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_2c3,"","2.0");
_2c2[_2c3]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_2b1.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_2b2("[widgetId]",this.containerNode).map(_2b4.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(has("dijit-legacy-requires")){
_2b3(0,function(){
var _2c4=["dijit/_base"];
require(_2c4);
});
}
return _2be;
});
},"dojo/cache":function(){
define(["./_base/kernel","./text"],function(dojo){
return dojo.cache;
});
},"dijit/_FocusMixin":function(){
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_2c5,_2c6,_2c7,lang){
lang.extend(_2c6,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _2c7("dijit._FocusMixin",null,{_focusManager:_2c5});
});
},"dijit/_OnDijitClickMixin":function(){
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/has","dojo/_base/unload","dojo/_base/window","./a11yclick"],function(on,_2c8,keys,_2c9,has,_2ca,win,_2cb){
var ret=_2c9("dijit._OnDijitClickMixin",null,{connect:function(obj,_2cc,_2cd){
return this.inherited(arguments,[obj,_2cc=="ondijitclick"?_2cb:_2cc,_2cd]);
}});
ret.a11yclick=_2cb;
return ret;
});
},"dijit/focus":function(){
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","./main"],function(_2ce,_2cf,dom,_2d0,_2d1,_2d2,lang,on,_2d3,has,_2d4,_2d5,win,_2d6,a11y,_2d7,_2d8){
var _2d9=_2cf([_2d4,_2d2],{curNode:null,activeStack:[],constructor:function(){
var _2da=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_2ce.before(_2d1,"empty",_2da);
_2ce.before(_2d1,"destroy",_2da);
},registerIframe:function(_2db){
return this.registerWin(_2db.contentWindow,_2db);
},registerWin:function(_2dc,_2dd){
var _2de=this;
var _2df=function(evt){
_2de._justMouseDowned=true;
setTimeout(function(){
_2de._justMouseDowned=false;
},0);
if(has("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_2de._onTouchNode(_2dd||evt.target||evt.srcElement,"mouse");
};
var doc=has("ie")?_2dc.document.documentElement:_2dc.document;
if(doc){
if(has("ie")){
_2dc.document.body.attachEvent("onmousedown",_2df);
var _2e0=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isTabNavigable(evt.srcElement)){
_2de._onFocusNode(_2dd||evt.srcElement);
}else{
_2de._onTouchNode(_2dd||evt.srcElement);
}
};
doc.attachEvent("onfocusin",_2e0);
var _2e1=function(evt){
_2de._onBlurNode(_2dd||evt.srcElement);
};
doc.attachEvent("onfocusout",_2e1);
return {remove:function(){
_2dc.document.detachEvent("onmousedown",_2df);
doc.detachEvent("onfocusin",_2e0);
doc.detachEvent("onfocusout",_2e1);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_2df,true);
doc.body.addEventListener("touchstart",_2df,true);
var _2e2=function(evt){
_2de._onFocusNode(_2dd||evt.target);
};
doc.addEventListener("focus",_2e2,true);
var _2e3=function(evt){
_2de._onBlurNode(_2dd||evt.target);
};
doc.addEventListener("blur",_2e3,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_2df,true);
doc.body.removeEventListener("touchstart",_2df,true);
doc.removeEventListener("focus",_2e2,true);
doc.removeEventListener("blur",_2e3,true);
doc=null;
}};
}
}
},_onBlurNode:function(node){
if(this._clearFocusTimer){
clearTimeout(this._clearFocusTimer);
}
this._clearFocusTimer=setTimeout(lang.hitch(this,function(){
this.set("prevNode",this.curNode);
this.set("curNode",null);
}),0);
if(this._justMouseDowned){
return;
}
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
}
this._clearActiveWidgetsTimer=setTimeout(lang.hitch(this,function(){
delete this._clearActiveWidgetsTimer;
this._setStack([]);
}),0);
},_onTouchNode:function(node,by){
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
delete this._clearActiveWidgetsTimer;
}
var _2e4=[];
try{
while(node){
var _2e5=_2d0.get(node,"dijitPopupParent");
if(_2e5){
node=_2d7.byId(_2e5).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_2d6.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_2e6=id&&_2d7.byId(id);
if(_2e6&&!(by=="mouse"&&_2e6.get("disabled"))){
_2e4.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_2e4,by);
},_onFocusNode:function(node){
if(!node){
return;
}
if(node.nodeType==9){
return;
}
if(this._clearFocusTimer){
clearTimeout(this._clearFocusTimer);
delete this._clearFocusTimer;
}
this._onTouchNode(node);
if(node==this.curNode){
return;
}
this.set("prevNode",this.curNode);
this.set("curNode",node);
},_setStack:function(_2e7,by){
var _2e8=this.activeStack;
this.set("activeStack",_2e7);
for(var _2e9=0;_2e9<Math.min(_2e8.length,_2e7.length);_2e9++){
if(_2e8[_2e9]!=_2e7[_2e9]){
break;
}
}
var _2ea;
for(var i=_2e8.length-1;i>=_2e9;i--){
_2ea=_2d7.byId(_2e8[i]);
if(_2ea){
_2ea._hasBeenBlurred=true;
_2ea.set("focused",false);
if(_2ea._focusManager==this){
_2ea._onBlur(by);
}
this.emit("widget-blur",_2ea,by);
}
}
for(i=_2e9;i<_2e7.length;i++){
_2ea=_2d7.byId(_2e7[i]);
if(_2ea){
_2ea.set("focused",true);
if(_2ea._focusManager==this){
_2ea._onFocus(by);
}
this.emit("widget-focus",_2ea,by);
}
}
},focus:function(node){
if(node){
try{
node.focus();
}
catch(e){
}
}
}});
var _2eb=new _2d9();
_2d3(function(){
var _2ec=_2eb.registerWin(_2d6.get(win.doc));
if(has("ie")){
_2d5.addOnWindowUnload(function(){
if(_2ec){
_2ec.remove();
_2ec=null;
}
});
}
});
_2d8.focus=function(node){
_2eb.focus(node);
};
for(var attr in _2eb){
if(!/^_/.test(attr)){
_2d8.focus[attr]=typeof _2eb[attr]=="function"?lang.hitch(_2eb,attr):_2eb[attr];
}
}
_2eb.watch(function(attr,_2ed,_2ee){
_2d8.focus[attr]=_2ee;
});
return _2eb;
});
},"dijit/form/HorizontalRuleLabels":function(){
define("dijit/form/HorizontalRuleLabels",["dojo/_base/declare","dojo/number","dojo/query","./HorizontalRule"],function(_2ef,_2f0,_2f1,_2f2){
return _2ef("dijit.form.HorizontalRuleLabels",_2f2,{templateString:"<div class=\"dijitRuleContainer dijitRuleContainerH dijitRuleLabelsContainer dijitRuleLabelsContainerH\"></div>",labelStyle:"",labels:[],numericMargin:0,minimum:0,maximum:1,constraints:{pattern:"#%"},_positionPrefix:"<div class=\"dijitRuleLabelContainer dijitRuleLabelContainerH\" style=\"left:",_labelPrefix:"\"><div class=\"dijitRuleLabel dijitRuleLabelH\">",_suffix:"</div></div>",_calcPosition:function(pos){
return pos;
},_genHTML:function(pos,ndx){
return this._positionPrefix+this._calcPosition(pos)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[ndx]+this._suffix;
},getLabels:function(){
var _2f3=this.labels;
if(!_2f3.length&&this.srcNodeRef){
_2f3=_2f1("> li",this.srcNodeRef).map(function(node){
return String(node.innerHTML);
});
}
if(!_2f3.length&&this.count>1){
var _2f4=this.minimum;
var inc=(this.maximum-_2f4)/(this.count-1);
for(var i=0;i<this.count;i++){
_2f3.push((i<this.numericMargin||i>=(this.count-this.numericMargin))?"":_2f0.format(_2f4,this.constraints));
_2f4+=inc;
}
}
return _2f3;
},postMixInProperties:function(){
this.inherited(arguments);
this.labels=this.getLabels();
this.count=this.labels.length;
}});
});
},"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n","dijit/main":function(){
define("dijit/main",["dojo/_base/kernel"],function(dojo){
return dojo.dijit;
});
},"dojo/number":function(){
define(["./_base/lang","./i18n","./i18n!./cldr/nls/number","./string","./regexp"],function(lang,i18n,_2f5,_2f6,_2f7){
var _2f8={};
lang.setObject("dojo.number",_2f8);
_2f8.format=function(_2f9,_2fa){
_2fa=lang.mixin({},_2fa||{});
var _2fb=i18n.normalizeLocale(_2fa.locale),_2fc=i18n.getLocalization("dojo.cldr","number",_2fb);
_2fa.customs=_2fc;
var _2fd=_2fa.pattern||_2fc[(_2fa.type||"decimal")+"Format"];
if(isNaN(_2f9)||Math.abs(_2f9)==Infinity){
return null;
}
return _2f8._applyPattern(_2f9,_2fd,_2fa);
};
_2f8._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
_2f8._applyPattern=function(_2fe,_2ff,_300){
_300=_300||{};
var _301=_300.customs.group,_302=_300.customs.decimal,_303=_2ff.split(";"),_304=_303[0];
_2ff=_303[(_2fe<0)?1:0]||("-"+_304);
if(_2ff.indexOf("%")!=-1){
_2fe*=100;
}else{
if(_2ff.indexOf("‰")!=-1){
_2fe*=1000;
}else{
if(_2ff.indexOf("¤")!=-1){
_301=_300.customs.currencyGroup||_301;
_302=_300.customs.currencyDecimal||_302;
_2ff=_2ff.replace(/\u00a4{1,3}/,function(_305){
var prop=["symbol","currency","displayName"][_305.length-1];
return _300[prop]||_300.currency||"";
});
}else{
if(_2ff.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _306=_2f8._numberPatternRE;
var _307=_304.match(_306);
if(!_307){
throw new Error("unable to find a number expression in pattern: "+_2ff);
}
if(_300.fractional===false){
_300.places=0;
}
return _2ff.replace(_306,_2f8._formatAbsolute(_2fe,_307[0],{decimal:_302,group:_301,places:_300.places,round:_300.round}));
};
_2f8.round=function(_308,_309,_30a){
var _30b=10/(_30a||10);
return (_30b*+_308).toFixed(_309)/_30b;
};
if((0.9).toFixed()==0){
var _30c=_2f8.round;
_2f8.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _30c(v,p,m)+(v>0?d:-d);
};
}
_2f8._formatAbsolute=function(_30d,_30e,_30f){
_30f=_30f||{};
if(_30f.places===true){
_30f.places=0;
}
if(_30f.places===Infinity){
_30f.places=6;
}
var _310=_30e.split("."),_311=typeof _30f.places=="string"&&_30f.places.indexOf(","),_312=_30f.places;
if(_311){
_312=_30f.places.substring(_311+1);
}else{
if(!(_312>=0)){
_312=(_310[1]||[]).length;
}
}
if(!(_30f.round<0)){
_30d=_2f8.round(_30d,_312,_30f.round);
}
var _313=String(Math.abs(_30d)).split("."),_314=_313[1]||"";
if(_310[1]||_30f.places){
if(_311){
_30f.places=_30f.places.substring(0,_311);
}
var pad=_30f.places!==undefined?_30f.places:(_310[1]&&_310[1].lastIndexOf("0")+1);
if(pad>_314.length){
_313[1]=_2f6.pad(_314,pad,"0",true);
}
if(_312<_314.length){
_313[1]=_314.substr(0,_312);
}
}else{
if(_313[1]){
_313.pop();
}
}
var _315=_310[0].replace(",","");
pad=_315.indexOf("0");
if(pad!=-1){
pad=_315.length-pad;
if(pad>_313[0].length){
_313[0]=_2f6.pad(_313[0],pad);
}
if(_315.indexOf("#")==-1){
_313[0]=_313[0].substr(_313[0].length-pad);
}
}
var _316=_310[0].lastIndexOf(","),_317,_318;
if(_316!=-1){
_317=_310[0].length-_316-1;
var _319=_310[0].substr(0,_316);
_316=_319.lastIndexOf(",");
if(_316!=-1){
_318=_319.length-_316-1;
}
}
var _31a=[];
for(var _31b=_313[0];_31b;){
var off=_31b.length-_317;
_31a.push((off>0)?_31b.substr(off):_31b);
_31b=(off>0)?_31b.slice(0,off):"";
if(_318){
_317=_318;
delete _318;
}
}
_313[0]=_31a.reverse().join(_30f.group||",");
return _313.join(_30f.decimal||".");
};
_2f8.regexp=function(_31c){
return _2f8._parseInfo(_31c).regexp;
};
_2f8._parseInfo=function(_31d){
_31d=_31d||{};
var _31e=i18n.normalizeLocale(_31d.locale),_31f=i18n.getLocalization("dojo.cldr","number",_31e),_320=_31d.pattern||_31f[(_31d.type||"decimal")+"Format"],_321=_31f.group,_322=_31f.decimal,_323=1;
if(_320.indexOf("%")!=-1){
_323/=100;
}else{
if(_320.indexOf("‰")!=-1){
_323/=1000;
}else{
var _324=_320.indexOf("¤")!=-1;
if(_324){
_321=_31f.currencyGroup||_321;
_322=_31f.currencyDecimal||_322;
}
}
}
var _325=_320.split(";");
if(_325.length==1){
_325.push("-"+_325[0]);
}
var re=_2f7.buildGroupRE(_325,function(_326){
_326="(?:"+_2f7.escapeString(_326,".")+")";
return _326.replace(_2f8._numberPatternRE,function(_327){
var _328={signed:false,separator:_31d.strict?_321:[_321,""],fractional:_31d.fractional,decimal:_322,exponent:false},_329=_327.split("."),_32a=_31d.places;
if(_329.length==1&&_323!=1){
_329[1]="###";
}
if(_329.length==1||_32a===0){
_328.fractional=false;
}else{
if(_32a===undefined){
_32a=_31d.pattern?_329[1].lastIndexOf("0")+1:Infinity;
}
if(_32a&&_31d.fractional==undefined){
_328.fractional=true;
}
if(!_31d.places&&(_32a<_329[1].length)){
_32a+=","+_329[1].length;
}
_328.places=_32a;
}
var _32b=_329[0].split(",");
if(_32b.length>1){
_328.groupSize=_32b.pop().length;
if(_32b.length>1){
_328.groupSize2=_32b.pop().length;
}
}
return "("+_2f8._realNumberRegexp(_328)+")";
});
},true);
if(_324){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_32c,_32d,_32e,_32f){
var prop=["symbol","currency","displayName"][_32e.length-1],_330=_2f7.escapeString(_31d[prop]||_31d.currency||"");
_32d=_32d?"[\\s\\xa0]":"";
_32f=_32f?"[\\s\\xa0]":"";
if(!_31d.strict){
if(_32d){
_32d+="*";
}
if(_32f){
_32f+="*";
}
return "(?:"+_32d+_330+_32f+")?";
}
return _32d+_330+_32f;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_321,decimal:_322,factor:_323};
};
_2f8.parse=function(_331,_332){
var info=_2f8._parseInfo(_332),_333=(new RegExp("^"+info.regexp+"$")).exec(_331);
if(!_333){
return NaN;
}
var _334=_333[1];
if(!_333[1]){
if(!_333[2]){
return NaN;
}
_334=_333[2];
info.factor*=-1;
}
_334=_334.replace(new RegExp("["+info.group+"\\s\\xa0"+"]","g"),"").replace(info.decimal,".");
return _334*info.factor;
};
_2f8._realNumberRegexp=function(_335){
_335=_335||{};
if(!("places" in _335)){
_335.places=Infinity;
}
if(typeof _335.decimal!="string"){
_335.decimal=".";
}
if(!("fractional" in _335)||/^0/.test(_335.places)){
_335.fractional=[true,false];
}
if(!("exponent" in _335)){
_335.exponent=[true,false];
}
if(!("eSigned" in _335)){
_335.eSigned=[true,false];
}
var _336=_2f8._integerRegexp(_335),_337=_2f7.buildGroupRE(_335.fractional,function(q){
var re="";
if(q&&(_335.places!==0)){
re="\\"+_335.decimal;
if(_335.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_335.places+"}";
}
}
return re;
},true);
var _338=_2f7.buildGroupRE(_335.exponent,function(q){
if(q){
return "([eE]"+_2f8._integerRegexp({signed:_335.eSigned})+")";
}
return "";
});
var _339=_336+_337;
if(_337){
_339="(?:(?:"+_339+")|(?:"+_337+"))";
}
return _339+_338;
};
_2f8._integerRegexp=function(_33a){
_33a=_33a||{};
if(!("signed" in _33a)){
_33a.signed=[true,false];
}
if(!("separator" in _33a)){
_33a.separator="";
}else{
if(!("groupSize" in _33a)){
_33a.groupSize=3;
}
}
var _33b=_2f7.buildGroupRE(_33a.signed,function(q){
return q?"[-+]":"";
},true);
var _33c=_2f7.buildGroupRE(_33a.separator,function(sep){
if(!sep){
return "(?:\\d+)";
}
sep=_2f7.escapeString(sep);
if(sep==" "){
sep="\\s";
}else{
if(sep==" "){
sep="\\s\\xa0";
}
}
var grp=_33a.groupSize,grp2=_33a.groupSize2;
if(grp2){
var _33d="(?:0|[1-9]\\d{0,"+(grp2-1)+"}(?:["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-grp2)>0)?"(?:"+_33d+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_33d;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _33b+_33c;
};
return _2f8;
});
},"dijit/form/_ButtonMixin":function(){
define("dijit/form/_ButtonMixin",["dojo/_base/declare","dojo/dom","dojo/_base/event","../registry"],function(_33e,dom,_33f,_340){
return _33e("dijit.form._ButtonMixin",null,{label:"",type:"button",_onClick:function(e){
if(this.disabled){
_33f.stop(e);
return false;
}
var _341=this.onClick(e)===false;
if(!_341&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _342=_340.byNode(node);
if(_342&&typeof _342._onSubmit=="function"){
_342._onSubmit(e);
_341=true;
break;
}
}
}
if(_341){
e.preventDefault();
}
return !_341;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_343){
this._set("label",_343);
(this.containerNode||this.focusNode).innerHTML=_343;
}});
});
},"dijit/form/_FormWidget":function(){
define("dijit/form/_FormWidget",["dojo/_base/declare","dojo/has","dojo/_base/kernel","dojo/ready","../_Widget","../_CssStateMixin","../_TemplatedMixin","./_FormWidgetMixin"],function(_344,has,_345,_346,_347,_348,_349,_34a){
if(has("dijit-legacy-requires")){
_346(0,function(){
var _34b=["dijit/form/_FormValueWidget"];
require(_34b);
});
}
return _344("dijit.form._FormWidget",[_347,_349,_348,_34a],{setDisabled:function(_34c){
_345.deprecated("setDisabled("+_34c+") is deprecated. Use set('disabled',"+_34c+") instead.","","2.0");
this.set("disabled",_34c);
},setValue:function(_34d){
_345.deprecated("dijit.form._FormWidget:setValue("+_34d+") is deprecated.  Use set('value',"+_34d+") instead.","","2.0");
this.set("value",_34d);
},getValue:function(){
_345.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/"/g,"&quot;")+"\""):"";
this.inherited(arguments);
},_setTypeAttr:null});
});
},"dijit/MenuItem":function(){
require({cache:{"url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitMenuExpand\"/>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</div>\n\t</td>\n</tr>\n"}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/kernel","dojo/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_34e,dom,_34f,_350,_351,has,_352,_353,_354,_355,_356){
return _34e("dijit.MenuItem",[_352,_353,_354,_355],{templateString:_356,baseClass:"dijitMenuItem",label:"",_setLabelAttr:function(val){
this.containerNode.innerHTML=val;
this._set("label",val);
if(this.textDir==="auto"){
this.applyTextDir(this.focusNode,this.label);
}
},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_357){
if(_357&&!("label" in this.params)){
this.set("label",_357.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _358=this.id+"_text";
_34f.set(this.containerNode,"id",_358);
if(this.accelKeyNode){
_34f.set(this.accelKeyNode,"id",this.id+"_accel");
_358+=" "+this.id+"_accel";
}
this.domNode.setAttribute("aria-labelledby",_358);
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
},_setSelected:function(_359){
_350.toggle(this.domNode,"dijitMenuItemSelected",_359);
},setLabel:function(_35a){
_351.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_35a);
},setDisabled:function(_35b){
_351.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_35b);
},_setDisabledAttr:function(_35c){
this.focusNode.setAttribute("aria-disabled",_35c?"true":"false");
this._set("disabled",_35c);
},_setAccelKeyAttr:function(_35d){
this.accelKeyNode.style.display=_35d?"":"none";
this.accelKeyNode.innerHTML=_35d;
_34f.set(this.containerNode,"colSpan",_35d?"1":"2");
this._set("accelKey",_35d);
},_setTextDirAttr:function(_35e){
if(!this._created||this.textDir!=_35e){
this._set("textDir",_35e);
this.applyTextDir(this.focusNode,this.label);
}
}});
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\"\n\t   data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","dijit/_MenuBase":function(){
define("dijit/_MenuBase",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/mouse","dojo/on","dojo/window","./a11yclick","./popup","./registry","./_Widget","./_KeyNavContainer","./_TemplatedMixin"],function(_35f,_360,dom,_361,_362,lang,_363,on,_364,_365,pm,_366,_367,_368,_369){
return _360("dijit._MenuBase",[_367,_369,_368],{parentMenu:null,popupDelay:500,autoFocus:false,postCreate:function(){
var self=this,_36a=function(node){
return _362.contains(node,"dijitMenuItem");
};
this.own(on(this.containerNode,on.selector(_36a,_363.enter),function(){
self.onItemHover(_366.byNode(this));
}),on(this.containerNode,on.selector(_36a,_363.leave),function(){
self.onItemUnhover(_366.byNode(this));
}),on(this.containerNode,on.selector(_36a,_365),function(evt){
self.onItemClick(_366.byNode(this),evt);
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
var _36b=this._getTopMenu();
if(_36b&&_36b._isMenuBar){
_36b.focusNext();
}
}
},_onPopupHover:function(){
if(this.currentPopup&&this.currentPopup._pendingClose_timer){
var _36c=this.currentPopup.parentMenu;
if(_36c.focusedChild){
_36c.focusedChild._setSelected(false);
}
_36c.focusedChild=this.currentPopup.from_item;
_36c.focusedChild._setSelected(true);
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
var _36d=item.popup;
if(_36d){
this._stopPendingCloseTimer(_36d);
_36d._pendingClose_timer=this.defer(function(){
_36d._pendingClose_timer=null;
if(_36d.parentMenu){
_36d.parentMenu.currentPopup=null;
}
pm.close(_36d);
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
},_stopPendingCloseTimer:function(_36e){
if(_36e._pendingClose_timer){
_36e._pendingClose_timer=_36e._pendingClose_timer.remove();
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
},_openPopup:function(_36f){
this._stopPopupTimer();
var _370=this.focusedChild;
if(!_370){
return;
}
var _371=_370.popup;
if(!_371.isShowingNow){
if(this.currentPopup){
this._stopPendingCloseTimer(this.currentPopup);
pm.close(this.currentPopup);
}
_371.parentMenu=this;
_371.from_item=_370;
var self=this;
pm.open({parent:this,popup:_371,around:_370.domNode,orient:this._orient||["after","before"],onCancel:function(){
self.focusChild(_370);
self._cleanUp();
_370._setSelected(true);
self.focusedChild=_370;
},onExecute:lang.hitch(this,"_cleanUp")});
this.currentPopup=_371;
_371.connect(_371.domNode,"onmouseenter",lang.hitch(self,"_onPopupHover"));
}
if(_36f&&_371.focus){
_371._focus_timer=this.defer(lang.hitch(_371,function(){
this._focus_timer=null;
this.focus();
}));
}
},_markActive:function(){
this.isActive=true;
_362.replace(this.domNode,"dijitMenuActive","dijitMenuPassive");
},onOpen:function(){
this.isShowingNow=true;
this._markActive();
},_markInactive:function(){
this.isActive=false;
_362.replace(this.domNode,"dijitMenuPassive","dijitMenuActive");
},onClose:function(){
this._stopFocusTimer();
this._markInactive();
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopup){
if(_35f.indexOf(this._focusManager.activeStack,this.id)>=0){
_361.set(this.focusedChild.focusNode,"tabIndex",this.tabIndex);
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
},"dijit/_TemplatedMixin":function(){
define("dijit/_TemplatedMixin",["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/sniff","dojo/_base/unload"],function(lang,_372,_373,_374,_375,_376,_377,_378,has,_379){
var _37a=_377("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(tmpl){
var _37b=this.declaredClass,_37c=this;
return _374.substitute(tmpl,this,function(_37d,key){
if(key.charAt(0)=="!"){
_37d=lang.getObject(key.substr(1),false,_37c);
}
if(typeof _37d=="undefined"){
throw new Error(_37b+" template:"+key);
}
if(_37d==null){
return "";
}
return key.charAt(0)=="!"?_37d:_37d.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this.templateString){
this.templateString=_375(this.templatePath,{sanitize:true});
}
var _37e=_37a.getCachedTemplate(this.templateString,this._skipNodeCache,this.ownerDocument);
var node;
if(lang.isString(_37e)){
node=_378.toDom(this._stringRepl(_37e),this.ownerDocument);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_37e);
}
}else{
node=_37e.cloneNode(true);
}
this.domNode=node;
this.inherited(arguments);
this._attachTemplateNodes(node,function(n,p){
return n.getAttribute(p);
});
this._beforeFillContent();
this._fillContent(this.srcNodeRef);
},_beforeFillContent:function(){
},_fillContent:function(_37f){
var dest=this.containerNode;
if(_37f&&dest){
while(_37f.hasChildNodes()){
dest.appendChild(_37f.firstChild);
}
}
},_attachTemplateNodes:function(_380,_381){
var _382=lang.isArray(_380)?_380:(_380.all||_380.getElementsByTagName("*"));
var x=lang.isArray(_380)?0:-1;
for(;x<0||_382[x];x++){
var _383=(x==-1)?_380:_382[x];
if(this.widgetsInTemplate&&(_381(_383,"dojoType")||_381(_383,"data-dojo-type"))){
continue;
}
var _384=_381(_383,"dojoAttachPoint")||_381(_383,"data-dojo-attach-point");
if(_384){
var _385,_386=_384.split(/\s*,\s*/);
while((_385=_386.shift())){
if(lang.isArray(this[_385])){
this[_385].push(_383);
}else{
this[_385]=_383;
}
this._attachPoints.push(_385);
}
}
var _387=_381(_383,"dojoAttachEvent")||_381(_383,"data-dojo-attach-event");
if(_387){
var _388,_389=_387.split(/\s*,\s*/);
var trim=lang.trim;
while((_388=_389.shift())){
if(_388){
var _38a=null;
if(_388.indexOf(":")!=-1){
var _38b=_388.split(":");
_388=trim(_38b[0]);
_38a=trim(_38b[1]);
}else{
_388=trim(_388);
}
if(!_38a){
_38a=_388;
}
this._attachEvents.push(this.connect(_383,_372[_388]||_388,_38a));
}
}
}
}
},destroyRendering:function(){
_376.forEach(this._attachPoints,function(_38c){
delete this[_38c];
},this);
this._attachPoints=[];
_376.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
_37a._templateCache={};
_37a.getCachedTemplate=function(_38d,_38e,doc){
var _38f=_37a._templateCache;
var key=_38d;
var _390=_38f[key];
if(_390){
try{
if(!_390.ownerDocument||_390.ownerDocument==(doc||document)){
return _390;
}
}
catch(e){
}
_378.destroy(_390);
}
_38d=_374.trim(_38d);
if(_38e||_38d.match(/\$\{([^\}]+)\}/g)){
return (_38f[key]=_38d);
}else{
var node=_378.toDom(_38d,doc);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_38d);
}
return (_38f[key]=node);
}
};
if(has("ie")){
_379.addOnWindowUnload(function(){
var _391=_37a._templateCache;
for(var key in _391){
var _392=_391[key];
if(typeof _392=="object"){
_378.destroy(_392);
}
delete _391[key];
}
});
}
lang.extend(_373,{dojoAttachEvent:"",dojoAttachPoint:""});
return _37a;
});
},"dojo/window":function(){
define(["./_base/lang","./sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(lang,has,_393,dom,geom,_394){
var _395={getBox:function(doc){
doc=doc||_393.doc;
var _396=(doc.compatMode=="BackCompat")?_393.body(doc):doc.documentElement,_397=geom.docScroll(doc),w,h;
if(has("touch")){
var _398=_395.get(doc);
w=_398.innerWidth||_396.clientWidth;
h=_398.innerHeight||_396.clientHeight;
}else{
w=_396.clientWidth;
h=_396.clientHeight;
}
return {l:_397.x,t:_397.y,w:w,h:h};
},get:function(doc){
if(has("ie")&&_395!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
},scrollIntoView:function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_393.doc,body=_393.body(doc),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if((!(has("mozilla")||isIE||isWK||has("opera"))||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _399=doc.compatMode=="BackCompat",_39a=(isIE>=9&&"frameElement" in node.ownerDocument.parentWindow)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_399?body:html),_39b=isWK?body:_39a,_39c=_39a.clientWidth,_39d=_39a.clientHeight,rtl=!geom.isBodyLtr(doc),_39e=pos||geom.position(node),el=node.parentNode,_39f=function(el){
return ((isIE<=6||(isIE&&_399))?false:(_394.get(el,"position").toLowerCase()=="fixed"));
};
if(_39f(node)){
return;
}
while(el){
if(el==body){
el=_39b;
}
var _3a0=geom.position(el),_3a1=_39f(el);
if(el==_39b){
_3a0.w=_39c;
_3a0.h=_39d;
if(_39b==html&&isIE&&rtl){
_3a0.x+=_39b.offsetWidth-_3a0.w;
}
if(_3a0.x<0||!isIE){
_3a0.x=0;
}
if(_3a0.y<0||!isIE){
_3a0.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_3a0.w-=pb.w;
_3a0.h-=pb.h;
_3a0.x+=pb.l;
_3a0.y+=pb.t;
var _3a2=el.clientWidth,_3a3=_3a0.w-_3a2;
if(_3a2>0&&_3a3>0){
_3a0.w=_3a2;
_3a0.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_3a3:0;
}
_3a2=el.clientHeight;
_3a3=_3a0.h-_3a2;
if(_3a2>0&&_3a3>0){
_3a0.h=_3a2;
}
}
if(_3a1){
if(_3a0.y<0){
_3a0.h+=_3a0.y;
_3a0.y=0;
}
if(_3a0.x<0){
_3a0.w+=_3a0.x;
_3a0.x=0;
}
if(_3a0.y+_3a0.h>_39d){
_3a0.h=_39d-_3a0.y;
}
if(_3a0.x+_3a0.w>_39c){
_3a0.w=_39c-_3a0.x;
}
}
var l=_39e.x-_3a0.x,t=_39e.y-Math.max(_3a0.y,0),r=l+_39e.w-_3a0.w,bot=t+_39e.h-_3a0.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_399)||isIE>=9)){
s=-s;
}
_39e.x+=el.scrollLeft;
el.scrollLeft+=s;
_39e.x-=el.scrollLeft;
}
if(bot*t>0){
_39e.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_39e.y-=el.scrollTop;
}
el=(el!=_39b)&&!_3a1&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
}};
1&&lang.setObject("dojo.window",_395);
return _395;
});
},"dijit/form/HorizontalSlider":function(){
require({cache:{"url:dijit/form/templates/HorizontalSlider.html":"<table class=\"dijit dijitReset dijitSlider dijitSliderH\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" data-dojo-attach-event=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\n\trole=\"presentation\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td data-dojo-attach-point=\"topDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderDecrementIconH\" style=\"display:none\" data-dojo-attach-point=\"decrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper\" data-dojo-attach-event=\"press:_onClkDecBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><input data-dojo-attach-point=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><div class=\"dijitReset dijitSliderBarContainerH\" role=\"presentation\" data-dojo-attach-point=\"sliderBarContainer\"\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"progressBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH\" data-dojo-attach-event=\"press:_onBarClick\"\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableH\"\n\t\t\t\t\t\t><div data-dojo-attach-point=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleH\" data-dojo-attach-event=\"press:_onHandleClick\" role=\"slider\"></div\n\t\t\t\t\t></div\n\t\t\t\t></div\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH\" data-dojo-attach-event=\"press:_onBarClick\"></div\n\t\t\t></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper\" data-dojo-attach-event=\"press:_onClkIncBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderIncrementIconH\" style=\"display:none\" data-dojo-attach-point=\"incrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td data-dojo-attach-point=\"containerNode,bottomDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n></table>\n"}});
define("dijit/form/HorizontalSlider",["dojo/_base/array","dojo/_base/declare","dojo/dnd/move","dojo/_base/event","dojo/_base/fx","dojo/dom-geometry","dojo/dom-style","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/dnd/Moveable","dojo/dnd/Mover","dojo/query","dojo/mouse","../registry","../focus","../typematic","./Button","./_FormValueWidget","../_Container","dojo/text!./templates/HorizontalSlider.html"],function(_3a4,_3a5,move,_3a6,fx,_3a7,_3a8,keys,lang,has,_3a9,_3aa,_3ab,_3ac,_3ad,_3ae,_3af,_3b0,_3b1,_3b2,_3b3){
var _3b4=_3a5("dijit.form._SliderMover",_3aa,{onMouseMove:function(e){
var _3b5=this.widget;
var _3b6=_3b5._abspos;
if(!_3b6){
_3b6=_3b5._abspos=_3a7.position(_3b5.sliderBarContainer,true);
_3b5._setPixelValue_=lang.hitch(_3b5,"_setPixelValue");
_3b5._isReversed_=_3b5._isReversed();
}
var _3b7=e[_3b5._mousePixelCoord]-_3b6[_3b5._startingPixelCoord];
_3b5._setPixelValue_(_3b5._isReversed_?(_3b6[_3b5._pixelCount]-_3b7):_3b7,_3b6[_3b5._pixelCount],false);
},destroy:function(e){
_3aa.prototype.destroy.apply(this,arguments);
var _3b8=this.widget;
_3b8._abspos=null;
_3b8._setValueAttr(_3b8.value,true);
}});
var _3b9=_3a5("dijit.form.HorizontalSlider",[_3b1,_3b2],{templateString:_3b3,value:0,showButtons:true,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,clickSelect:true,slideDuration:_3ad.defaultDuration,_setIdAttr:"",baseClass:"dijitSlider",cssStateNodes:{incrementButton:"dijitSliderIncrementButton",decrementButton:"dijitSliderDecrementButton",focusNode:"dijitSliderThumb"},_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_handleOffsetCoord:"left",_progressPixelSize:"width",_onKeyUp:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey||e.metaKey){
return;
}
this._setValueAttr(this.value,true);
},_onKeyPress:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey||e.metaKey){
return;
}
switch(e.charOrCode){
case keys.HOME:
this._setValueAttr(this.minimum,false);
break;
case keys.END:
this._setValueAttr(this.maximum,false);
break;
case ((this._descending||this.isLeftToRight())?keys.RIGHT_ARROW:keys.LEFT_ARROW):
case (this._descending===false?keys.DOWN_ARROW:keys.UP_ARROW):
case (this._descending===false?keys.PAGE_DOWN:keys.PAGE_UP):
this.increment(e);
break;
case ((this._descending||this.isLeftToRight())?keys.LEFT_ARROW:keys.RIGHT_ARROW):
case (this._descending===false?keys.UP_ARROW:keys.DOWN_ARROW):
case (this._descending===false?keys.PAGE_UP:keys.PAGE_DOWN):
this.decrement(e);
break;
default:
return;
}
_3a6.stop(e);
},_onHandleClick:function(e){
if(this.disabled||this.readOnly){
return;
}
if(!has("ie")){
_3ae.focus(this.sliderHandle);
}
_3a6.stop(e);
},_isReversed:function(){
return !this.isLeftToRight();
},_onBarClick:function(e){
if(this.disabled||this.readOnly||!this.clickSelect){
return;
}
_3ae.focus(this.sliderHandle);
_3a6.stop(e);
var _3ba=_3a7.position(this.sliderBarContainer,true);
var _3bb=e[this._mousePixelCoord]-_3ba[this._startingPixelCoord];
this._setPixelValue(this._isReversed()?(_3ba[this._pixelCount]-_3bb):_3bb,_3ba[this._pixelCount],true);
this._movable.onMouseDown(e);
},_setPixelValue:function(_3bc,_3bd,_3be){
if(this.disabled||this.readOnly){
return;
}
var _3bf=this.discreteValues;
if(_3bf<=1||_3bf==Infinity){
_3bf=_3bd;
}
_3bf--;
var _3c0=_3bd/_3bf;
var _3c1=Math.round(_3bc/_3c0);
this._setValueAttr(Math.max(Math.min((this.maximum-this.minimum)*_3c1/_3bf+this.minimum,this.maximum),this.minimum),_3be);
},_setValueAttr:function(_3c2,_3c3){
this._set("value",_3c2);
this.valueNode.value=_3c2;
this.focusNode.setAttribute("aria-valuenow",_3c2);
this.inherited(arguments);
var _3c4=(_3c2-this.minimum)/(this.maximum-this.minimum);
var _3c5=(this._descending===false)?this.remainingBar:this.progressBar;
var _3c6=(this._descending===false)?this.progressBar:this.remainingBar;
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
if(_3c3&&this.slideDuration>0&&_3c5.style[this._progressPixelSize]){
var _3c7=this;
var _3c8={};
var _3c9=parseFloat(_3c5.style[this._progressPixelSize]);
var _3ca=this.slideDuration*(_3c4-_3c9/100);
if(_3ca==0){
return;
}
if(_3ca<0){
_3ca=0-_3ca;
}
_3c8[this._progressPixelSize]={start:_3c9,end:_3c4*100,units:"%"};
this._inProgressAnim=fx.animateProperty({node:_3c5,duration:_3ca,onAnimate:function(v){
_3c6.style[_3c7._progressPixelSize]=(100-parseFloat(v[_3c7._progressPixelSize]))+"%";
},onEnd:function(){
delete _3c7._inProgressAnim;
},properties:_3c8});
this._inProgressAnim.play();
}else{
_3c5.style[this._progressPixelSize]=(_3c4*100)+"%";
_3c6.style[this._progressPixelSize]=((1-_3c4)*100)+"%";
}
},_bumpValue:function(_3cb,_3cc){
if(this.disabled||this.readOnly){
return;
}
var s=_3a8.getComputedStyle(this.sliderBarContainer);
var c=_3a7.getContentBox(this.sliderBarContainer,s);
var _3cd=this.discreteValues;
if(_3cd<=1||_3cd==Infinity){
_3cd=c[this._pixelCount];
}
_3cd--;
var _3ce=(this.value-this.minimum)*_3cd/(this.maximum-this.minimum)+_3cb;
if(_3ce<0){
_3ce=0;
}
if(_3ce>_3cd){
_3ce=_3cd;
}
_3ce=_3ce*(this.maximum-this.minimum)/_3cd+this.minimum;
this._setValueAttr(_3ce,_3cc);
},_onClkBumper:function(val){
if(this.disabled||this.readOnly||!this.clickSelect){
return;
}
this._setValueAttr(val,true);
},_onClkIncBumper:function(){
this._onClkBumper(this._descending===false?this.minimum:this.maximum);
},_onClkDecBumper:function(){
this._onClkBumper(this._descending===false?this.maximum:this.minimum);
},decrement:function(e){
this._bumpValue(e.charOrCode==keys.PAGE_DOWN?-this.pageIncrement:-1);
},increment:function(e){
this._bumpValue(e.charOrCode==keys.PAGE_UP?this.pageIncrement:1);
},_mouseWheeled:function(evt){
_3a6.stop(evt);
this._bumpValue(evt.wheelDelta<0?-1:1,true);
},startup:function(){
if(this._started){
return;
}
_3a4.forEach(this.getChildren(),function(_3cf){
if(this[_3cf.container]!=this.containerNode){
this[_3cf.container].appendChild(_3cf.domNode);
}
},this);
this.inherited(arguments);
},_typematicCallback:function(_3d0,_3d1,e){
if(_3d0==-1){
this._setValueAttr(this.value,true);
}else{
this[(_3d1==(this._descending?this.incrementButton:this.decrementButton))?"decrement":"increment"](e);
}
},buildRendering:function(){
this.inherited(arguments);
if(this.showButtons){
this.incrementButton.style.display="";
this.decrementButton.style.display="";
}
var _3d2=_3ab("label[for=\""+this.id+"\"]");
if(_3d2.length){
if(!_3d2[0].id){
_3d2[0].id=this.id+"_label";
}
this.focusNode.setAttribute("aria-labelledby",_3d2[0].id);
}
this.focusNode.setAttribute("aria-valuemin",this.minimum);
this.focusNode.setAttribute("aria-valuemax",this.maximum);
},postCreate:function(){
this.inherited(arguments);
if(this.showButtons){
this.own(_3af.addMouseListener(this.decrementButton,this,"_typematicCallback",25,500),_3af.addMouseListener(this.incrementButton,this,"_typematicCallback",25,500));
}
this.connect(this.domNode,_3ac.wheel,"_mouseWheeled");
var _3d3=_3a5(_3b4,{widget:this});
this._movable=new _3a9(this.sliderHandle,{mover:_3d3});
this._layoutHackIE7();
},destroy:function(){
this._movable.destroy();
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
this.inherited(arguments);
}});
_3b9._Mover=_3b4;
return _3b9;
});
},"dijit/_HasDropDown":function(){
define("dijit/_HasDropDown",["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/window","./registry","./focus","./popup","./_FocusMixin"],function(_3d4,_3d5,_3d6,dom,_3d7,_3d8,_3d9,_3da,has,keys,lang,on,_3db,_3dc,_3dd,_3de,_3df){
return _3d4("dijit._HasDropDown",_3df,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
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
var _3e0=this.dropDown,_3e1=false;
if(e&&this._opened){
var c=_3d9.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_3e1){
if(_3d8.contains(t,"dijitPopup")){
_3e1=true;
}else{
t=t.parentNode;
}
}
if(_3e1){
t=e.target;
if(_3e0.onItemClick){
var _3e2;
while(t&&!(_3e2=_3dc.byNode(t))){
t=t.parentNode;
}
if(_3e2&&_3e2.onClick&&_3e2.getParent){
_3e2.getParent().onItemClick(_3e2,e);
}
}
return;
}
}
}
if(this._opened){
if(_3e0.focus&&_3e0.autoFocus!==false){
this._focusDropDownTimer=this.defer(function(){
_3e0.focus();
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
_3d6.stop(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _3e3={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_3d8.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_3e3+"ArrowButton");
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
var d=this.dropDown,_3e4=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
_3d6.stop(e);
return;
}
}
if(d&&this._opened&&e.keyCode==keys.ESCAPE){
this.closeDropDown();
_3d6.stop(e);
}else{
if(!this._opened&&(e.keyCode==keys.DOWN_ARROW||((e.keyCode==keys.ENTER||e.keyCode==dojo.keys.SPACE)&&((_3e4.tagName||"").toLowerCase()!=="input"||(_3e4.type&&_3e4.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
_3d6.stop(e);
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
var _3e5=_3dd.curNode&&this.dropDown&&dom.isDescendant(_3dd.curNode,this.dropDown.domNode);
this.closeDropDown(_3e5);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_3e6){
_3e6();
},loadAndOpenDropDown:function(){
var d=new _3d5(),_3e7=lang.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_3e7);
}else{
_3e7();
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
var _3e8=this.dropDown,_3e9=_3e8.domNode,_3ea=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_3e9.style.width){
this._explicitDDWidth=true;
}
if(_3e9.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _3eb={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_3eb.width="";
}
if(!this._explicitDDHeight){
_3eb.height="";
}
_3da.set(_3e9,_3eb);
var _3ec=this.maxHeight;
if(_3ec==-1){
var _3ed=_3db.getBox(this.ownerDocument),_3ee=_3d9.position(_3ea,false);
_3ec=Math.floor(Math.max(_3ee.y,_3ed.h-(_3ee.y+_3ee.h)));
}
_3de.moveOffScreen(_3e8);
if(_3e8.startup&&!_3e8._started){
_3e8.startup();
}
var mb=_3d9.getMarginSize(_3e9);
var _3ef=(_3ec&&mb.h>_3ec);
_3da.set(_3e9,{overflowX:"visible",overflowY:_3ef?"auto":"visible"});
if(_3ef){
mb.h=_3ec;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_3ea.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_3ea.offsetWidth);
}else{
delete mb.w;
}
}
if(lang.isFunction(_3e8.resize)){
_3e8.resize(mb);
}else{
_3d9.setMarginBox(_3e9,mb);
}
}
var _3f0=_3de.open({parent:this,popup:_3e8,around:_3ea,orient:this.dropDownPosition,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_3d7.set(self._popupStateNode,"popupActive",false);
_3d8.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._set("_opened",false);
}});
_3d7.set(this._popupStateNode,"popupActive","true");
_3d8.add(this._popupStateNode,"dijitHasDropDownOpen");
this._set("_opened",true);
this.domNode.setAttribute("aria-expanded","true");
return _3f0;
},closeDropDown:function(_3f1){
if(this._focusDropDownTimer){
this._focusDropDownTimer.remove();
delete this._focusDropDownTimer;
}
if(this._opened){
this.domNode.setAttribute("aria-expanded","false");
if(_3f1){
this.focus();
}
_3de.close(this.dropDown);
this._opened=false;
}
}});
});
},"dijit/Tooltip":function(){
require({cache:{"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n"}});
define("dijit/Tooltip",["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/on","dojo/sniff","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","./main"],function(_3f2,_3f3,fx,dom,_3f4,_3f5,_3f6,lang,_3f7,on,has,_3f8,_3f9,_3fa,_3fb,_3fc,_3fd,_3fe){
var _3ff=_3f3("dijit._MasterTooltip",[_3fa,_3fb],{duration:_3f8.defaultDuration,templateString:_3fd,postCreate:function(){
this.ownerDocumentBody.appendChild(this.domNode);
this.bgIframe=new _3fc(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_400,_401,_402,rtl,_403){
if(this.aroundNode&&this.aroundNode===_401&&this.containerNode.innerHTML==_400){
return;
}
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_400;
if(_403){
this.set("textDir",_403);
}
this.containerNode.align=rtl?"right":"left";
var pos=_3f9.around(this.domNode,_401,_402&&_402.length?_402:_404.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _405=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_405.y+((_405.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_405.x+((_405.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}else{
this.connectorNode.style.left="";
this.connectorNode.style.top="";
}
}
_3f6.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_401;
},orient:function(node,_406,_407,_408,_409){
this.connectorNode.style.top="";
var _40a=_408.h,_40b=_408.w;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_406+"-"+_407];
this.domNode.style.width="auto";
var size=_3f5.position(this.domNode);
if(has("ie")==9){
size.w+=2;
}
var _40c=Math.min((Math.max(_40b,1)),size.w);
_3f5.setMarginBox(this.domNode,{w:_40c});
if(_407.charAt(0)=="B"&&_406.charAt(0)=="B"){
var bb=_3f5.position(node);
var _40d=this.connectorNode.offsetHeight;
if(bb.h>_40a){
var _40e=_40a-((_409.h+_40d)>>1);
this.connectorNode.style.top=_40e+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_409.h/2-_40d/2,0),bb.h-_40d)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_40b);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_40f){
if(this._onDeck&&this._onDeck[1]==_40f){
this._onDeck=null;
}else{
if(this.aroundNode===_40f){
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
_3f2.forEach(node.children,function(_410){
this._setAutoTextDir(_410);
},this);
},_setTextDirAttr:function(_411){
this._set("textDir",_411);
if(_411=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_3fe.showTooltip=function(_412,_413,_414,rtl,_415){
if(_414){
_414=_3f2.map(_414,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_404._masterTT){
_3fe._masterTT=_404._masterTT=new _3ff();
}
return _404._masterTT.show(_412,_413,_414,rtl,_415);
};
_3fe.hideTooltip=function(_416){
return _404._masterTT&&_404._masterTT.hide(_416);
};
var _404=_3f3("dijit.Tooltip",_3fa,{label:"",showDelay:400,connectId:[],position:[],selector:"",_setConnectIdAttr:function(_417){
_3f2.forEach(this._connections||[],function(_418){
_3f2.forEach(_418,function(_419){
_419.remove();
});
},this);
this._connectIds=_3f2.filter(lang.isArrayLike(_417)?_417:(_417?[_417]:[]),function(id){
return dom.byId(id,this.ownerDocument);
},this);
this._connections=_3f2.map(this._connectIds,function(id){
var node=dom.byId(id,this.ownerDocument),_41a=this.selector,_41b=_41a?function(_41c){
return on.selector(_41a,_41c);
}:function(_41d){
return _41d;
},self=this;
return [on(node,_41b(_3f7.enter),function(){
self._onHover(this);
}),on(node,_41b("focusin"),function(){
self._onHover(this);
}),on(node,_41b(_3f7.leave),lang.hitch(self,"_onUnHover")),on(node,_41b("focusout"),lang.hitch(self,"_onUnHover"))];
},this);
this._set("connectId",_417);
},addTarget:function(node){
var id=node.id||node;
if(_3f2.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=_3f2.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_3f4.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
_3f2.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},getContent:function(node){
return this.label||this.domNode.innerHTML;
},_onHover:function(_41e){
if(!this._showTimer){
this._showTimer=this.defer(function(){
this.open(_41e);
},this.showDelay);
}
},_onUnHover:function(){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
this.close();
},open:function(_41f){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
var _420=this.getContent(_41f);
if(!_420){
return;
}
_404.show(_420,_41f,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_41f;
this.onShow(_41f,this.position);
},close:function(){
if(this._connectNode){
_404.hide(this._connectNode);
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
_3f2.forEach(this._connections||[],function(_421){
_3f2.forEach(_421,function(_422){
_422.remove();
});
},this);
this.inherited(arguments);
}});
_404._MasterTooltip=_3ff;
_404.show=_3fe.showTooltip;
_404.hide=_3fe.hideTooltip;
_404.defaultPosition=["after-centered","before-centered"];
return _404;
});
},"dijit/form/_FormSelectWidget":function(){
define("dijit/form/_FormSelectWidget",["dojo/_base/array","dojo/_base/Deferred","dojo/aspect","dojo/data/util/sorter","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/when","dojo/store/util/QueryResults","./_FormValueWidget"],function(_423,_424,_425,_426,_427,dom,_428,_429,lang,_42a,when,_42b,_42c){
var _42d=_427("dijit.form._FormSelectWidget",_42c,{multiple:false,options:null,store:null,query:null,queryOptions:null,labelAttr:"",onFetch:null,sortByLabel:true,loadChildrenOnOpen:false,onLoadDeferred:null,getOptions:function(_42e){
var _42f=_42e,opts=this.options||[],l=opts.length;
if(_42f===undefined){
return opts;
}
if(lang.isArray(_42f)){
return _423.map(_42f,"return this.getOptions(item);",this);
}
if(lang.isObject(_42e)){
if(!_423.some(this.options,function(o,idx){
if(o===_42f||(o.value&&o.value===_42f.value)){
_42f=idx;
return true;
}
return false;
})){
_42f=-1;
}
}
if(typeof _42f=="string"){
for(var i=0;i<l;i++){
if(opts[i].value===_42f){
_42f=i;
break;
}
}
}
if(typeof _42f=="number"&&_42f>=0&&_42f<l){
return this.options[_42f];
}
return null;
},addOption:function(_430){
if(!lang.isArray(_430)){
_430=[_430];
}
_423.forEach(_430,function(i){
if(i&&lang.isObject(i)){
this.options.push(i);
}
},this);
this._loadChildren();
},removeOption:function(_431){
if(!lang.isArray(_431)){
_431=[_431];
}
var _432=this.getOptions(_431);
_423.forEach(_432,function(i){
if(i){
this.options=_423.filter(this.options,function(node){
return (node.value!==i.value||node.label!==i.label);
});
this._removeOptionItem(i);
}
},this);
this._loadChildren();
},updateOption:function(_433){
if(!lang.isArray(_433)){
_433=[_433];
}
_423.forEach(_433,function(i){
var _434=this.getOptions(i),k;
if(_434){
for(k in i){
_434[k]=i[k];
}
}
},this);
this._loadChildren();
},setStore:function(_435,_436,_437){
var _438=this.store;
_437=_437||{};
if(_438!==_435){
var h;
while((h=this._notifyConnections.pop())){
h.remove();
}
if(!_435.get){
lang.mixin(_435,{_oldAPI:true,get:function(id){
var _439=new _424();
this.fetchItemByIdentity({identity:id,onItem:function(_43a){
_439.resolve(_43a);
},onError:function(_43b){
_439.reject(_43b);
}});
return _439.promise;
},query:function(_43c,_43d){
var _43e=new _424(function(){
if(_43f.abort){
_43f.abort();
}
});
_43e.total=new _424();
var _43f=this.fetch(lang.mixin({query:_43c,onBegin:function(_440){
_43e.total.resolve(_440);
},onComplete:function(_441){
_43e.resolve(_441);
},onError:function(_442){
_43e.reject(_442);
}},_43d));
return new _42b(_43e);
}});
if(_435.getFeatures()["dojo.data.api.Notification"]){
this._notifyConnections=[_425.after(_435,"onNew",lang.hitch(this,"_onNewItem"),true),_425.after(_435,"onDelete",lang.hitch(this,"_onDeleteItem"),true),_425.after(_435,"onSet",lang.hitch(this,"_onSetItem"),true)];
}
}
this._set("store",_435);
}
if(this.options&&this.options.length){
this.removeOption(this.options);
}
if(this._queryRes&&this._queryRes.close){
this._queryRes.close();
}
if(_437.query){
this._set("query",_437.query);
this._set("queryOptions",_437.queryOptions);
}
if(_435){
this._loadingStore=true;
this.onLoadDeferred=new _424();
this._queryRes=_435.query(this.query,this.queryOptions);
when(this._queryRes,lang.hitch(this,function(_443){
if(this.sortByLabel&&!_437.sort&&_443.length){
if(_443[0].getValue){
_443.sort(_426.createSortFunction([{attribute:_435.getLabelAttributes(_443[0])[0]}],_435));
}else{
var _444=this.labelAttr;
_443.sort(function(a,b){
return a[_444]>b[_444]?1:b[_444]>a[_444]?-1:0;
});
}
}
if(_437.onFetch){
_443=_437.onFetch.call(this,_443,_437);
}
_423.forEach(_443,function(i){
this._addOptionForItem(i);
},this);
if(this._queryRes.observe){
this._queryRes.observe(lang.hitch(this,function(_445,_446,_447){
if(_446==_447){
this._onSetItem(_445);
}else{
if(_446!=-1){
this._onDeleteItem(_445);
}
if(_447!=-1){
this._onNewItem(_445);
}
}
}),true);
}
this._loadingStore=false;
this.set("value","_pendingValue" in this?this._pendingValue:_436);
delete this._pendingValue;
if(!this.loadChildrenOnOpen){
this._loadChildren();
}else{
this._pseudoLoadChildren(_443);
}
this.onLoadDeferred.resolve(true);
this.onSetStore();
}),function(err){
console.error("dijit.form.Select: "+err.toString());
this.onLoadDeferred.reject(err);
});
}
return _438;
},_setValueAttr:function(_448,_449){
if(!this._onChangeActive){
_449=null;
}
if(this._loadingStore){
this._pendingValue=_448;
return;
}
var opts=this.getOptions()||[];
if(!lang.isArray(_448)){
_448=[_448];
}
_423.forEach(_448,function(i,idx){
if(!lang.isObject(i)){
i=i+"";
}
if(typeof i==="string"){
_448[idx]=_423.filter(opts,function(node){
return node.value===i;
})[0]||{value:"",label:""};
}
},this);
_448=_423.filter(_448,function(i){
return i&&i.value;
});
if(!this.multiple&&(!_448[0]||!_448[0].value)&&opts.length){
_448[0]=opts[0];
}
_423.forEach(opts,function(i){
i.selected=_423.some(_448,function(v){
return v.value===i.value;
});
});
var val=_423.map(_448,function(i){
return i.value;
}),disp=_423.map(_448,function(i){
return i.label;
});
if(typeof val=="undefined"||typeof val[0]=="undefined"){
return;
}
this._setDisplay(this.multiple?disp:disp[0]);
this.inherited(arguments,[this.multiple?val:val[0],_449]);
this._updateSelection();
},_getDisplayedValueAttr:function(){
var val=this.get("value");
if(!lang.isArray(val)){
val=[val];
}
var ret=_423.map(this.getOptions(val),function(v){
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
_423.forEach(this._getChildren(),function(_44a){
_44a.destroyRecursive();
});
_423.forEach(this.options,this._addOptionItem,this);
this._updateSelection();
},_updateSelection:function(){
this._set("value",this._getValueFromOpts());
var val=this.value;
if(!lang.isArray(val)){
val=[val];
}
if(val&&val[0]){
_423.forEach(this._getChildren(),function(_44b){
var _44c=_423.some(val,function(v){
return _44b.option&&(v===_44b.option.value);
});
_428.toggle(_44b.domNode,this.baseClass.replace(/\s+|$/g,"SelectedOption "),_44c);
_44b.domNode.setAttribute("aria-selected",_44c?"true":"false");
},this);
}
},_getValueFromOpts:function(){
var opts=this.getOptions()||[];
if(!this.multiple&&opts.length){
var opt=_423.filter(opts,function(i){
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
return _423.map(_423.filter(opts,function(i){
return i.selected;
}),function(i){
return i.value;
})||[];
}
}
return "";
},_onNewItem:function(item,_44d){
if(!_44d||!_44d.parent){
this._addOptionForItem(item);
}
},_onDeleteItem:function(item){
var _44e=this.store;
this.removeOption(_44e.getIdentity(item));
},_onSetItem:function(item){
this.updateOption(this._getOptionObjForItem(item));
},_getOptionObjForItem:function(item){
var _44f=this.store,_450=(this.labelAttr&&this.labelAttr in item)?item[this.labelAttr]:_44f.getLabel(item),_451=(_450?_44f.getIdentity(item):null);
return {value:_451,label:_450,item:item};
},_addOptionForItem:function(item){
var _452=this.store;
if(_452.isItemLoaded&&!_452.isItemLoaded(item)){
_452.loadItem({item:item,onItem:function(i){
this._addOptionForItem(i);
},scope:this});
return;
}
var _453=this._getOptionObjForItem(item);
this.addOption(_453);
},constructor:function(_454){
this._oValue=(_454||{}).value||null;
this._notifyConnections=[];
},buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},_fillContent:function(){
if(!this.options){
this.options=this.srcNodeRef?_42a("> *",this.srcNodeRef).map(function(node){
if(node.getAttribute("type")==="separator"){
return {value:"",label:"",selected:false,disabled:false};
}
return {value:(node.getAttribute("data-"+_429._scopeName+"-value")||node.getAttribute("value")),label:String(node.innerHTML),selected:node.getAttribute("selected")||false,disabled:node.getAttribute("disabled")||false};
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
var _455=this.store;
if(_455&&(_455.getIdentity||_455.getFeatures()["dojo.data.api.Identity"])){
this.store=null;
this.setStore(_455,this._oValue);
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
return _42d;
});
},"url:dijit/form/templates/HorizontalSlider.html":"<table class=\"dijit dijitReset dijitSlider dijitSliderH\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" data-dojo-attach-event=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\n\trole=\"presentation\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td data-dojo-attach-point=\"topDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderDecrementIconH\" style=\"display:none\" data-dojo-attach-point=\"decrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper\" data-dojo-attach-event=\"press:_onClkDecBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><input data-dojo-attach-point=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><div class=\"dijitReset dijitSliderBarContainerH\" role=\"presentation\" data-dojo-attach-point=\"sliderBarContainer\"\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"progressBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH\" data-dojo-attach-event=\"press:_onBarClick\"\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableH\"\n\t\t\t\t\t\t><div data-dojo-attach-point=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleH\" data-dojo-attach-event=\"press:_onHandleClick\" role=\"slider\"></div\n\t\t\t\t\t></div\n\t\t\t\t></div\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH\" data-dojo-attach-event=\"press:_onBarClick\"></div\n\t\t\t></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper\" data-dojo-attach-event=\"press:_onClkIncBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderIncrementIconH\" style=\"display:none\" data-dojo-attach-point=\"incrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td data-dojo-attach-point=\"containerNode,bottomDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n></table>\n","dijit/popup":function(){
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","./place","./BackgroundIframe","./main"],function(_456,_457,_458,_459,dom,_45a,_45b,_45c,_45d,_45e,keys,lang,on,has,_45f,_460,_461){
function _462(){
if(this._popupWrapper){
_45b.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _463=_459(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_464){
var _465=_464._popupWrapper,node=_464.domNode;
if(!_465){
_465=_45b.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},_464.ownerDocumentBody);
_465.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_464._popupWrapper=_465;
_457.after(_464,"destroy",_462,true);
}
return _465;
},moveOffScreen:function(_466){
var _467=this._createWrapper(_466);
_45d.set(_467,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_468){
var _469=this._createWrapper(_468);
_45d.set(_469,"display","none");
},getTopPopup:function(){
var _46a=this._stack;
for(var pi=_46a.length-1;pi>0&&_46a[pi].parent===_46a[pi-1].widget;pi--){
}
return _46a[pi];
},open:function(args){
var _46b=this._stack,_46c=args.popup,_46d=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_45c.isBodyLtr(_46c.ownerDocument),_46e=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_46b.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_46b[_46b.length-1].widget.domNode))){
this.close(_46b[_46b.length-1].widget);
}
var _46f=this._createWrapper(_46c);
_45a.set(_46f,{id:id,style:{zIndex:this._beginZIndex+_46b.length},"class":"dijitPopup "+(_46c.baseClass||_46c["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(has("ie")||has("mozilla")){
if(!_46c.bgIframe){
_46c.bgIframe=new _460(_46f);
}
}
var best=_46e?_45f.around(_46f,_46e,_46d,ltr,_46c.orient?lang.hitch(_46c,"orient"):null):_45f.at(_46f,args,_46d=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_46f.style.display="";
_46f.style.visibility="visible";
_46c.domNode.style.visibility="visible";
var _470=[];
_470.push(on(_46f,_458._keypress,lang.hitch(this,function(evt){
if(evt.charOrCode==keys.ESCAPE&&args.onCancel){
_45e.stop(evt);
args.onCancel();
}else{
if(evt.charOrCode===keys.TAB){
_45e.stop(evt);
var _471=this.getTopPopup();
if(_471&&_471.onCancel){
_471.onCancel();
}
}
}
})));
if(_46c.onCancel&&args.onCancel){
_470.push(_46c.on("cancel",args.onCancel));
}
_470.push(_46c.on(_46c.onExecute?"execute":"change",lang.hitch(this,function(){
var _472=this.getTopPopup();
if(_472&&_472.onExecute){
_472.onExecute();
}
})));
_46b.push({widget:_46c,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_470});
if(_46c.onOpen){
_46c.onOpen(best);
}
return best;
},close:function(_473){
var _474=this._stack;
while((_473&&_456.some(_474,function(elem){
return elem.widget==_473;
}))||(!_473&&_474.length)){
var top=_474.pop(),_475=top.widget,_476=top.onClose;
if(_475.onClose){
_475.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_475&&_475.domNode){
this.hide(_475);
}
if(_476){
_476();
}
}
}});
return (_461.popup=new _463());
});
},"url:dijit/form/templates/Select.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode\" cellspacing='0' cellpadding='0'\n\trole=\"listbox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitInputField dijitButtonText\"  data-dojo-attach-point=\"containerNode,_popupStateNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitValidationContainer\"\n\t\t\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t/></div\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td\n\t\t><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer\"\n\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t${_buttonInputDisabled}\n\t\t/></td\n\t></tr></tbody\n></table>\n","dijit/_WidgetBase":function(){
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./Destroyable","./registry"],function(_477,_478,_479,_47a,_47b,_47c,dom,_47d,_47e,_47f,_480,_481,has,_482,lang,on,_483,_484,_485,win,_486,_487){
has.add("dijit-legacy-requires",!_482.isAsync);
if(has("dijit-legacy-requires")){
_483(0,function(){
var _488=["dijit/_base/manager"];
_477(_488);
});
}
var _489={};
function _48a(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _48b(attr){
return function(val){
_47d[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
return _47c("dijit._WidgetBase",[_484,_486],{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_48b("lang"),dir:"",_setDirAttr:_48b("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,ownerDocument:null,_setOwnerDocumentAttr:function(val){
this._set("ownerDocument",val);
},attributeMap:{},_blankGif:_47a.blankGif||_477.toUrl("dojo/resources/blank.gif"),postscript:function(_48c,_48d){
this.create(_48c,_48d);
},create:function(_48e,_48f){
this.srcNodeRef=dom.byId(_48f);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_48e){
this.params=_48e;
lang.mixin(this,_48e);
}
this.postMixInProperties();
if(!this.id){
this.id=_487.getUniqueId(this.declaredClass.replace(/\./g,"_"));
if(this.params){
delete this.params.id;
}
}
this.ownerDocument=this.ownerDocument||(this.srcNodeRef?this.srcNodeRef.ownerDocument:win.doc);
this.ownerDocumentBody=win.body(this.ownerDocument);
_487.add(this);
this.buildRendering();
var _490;
if(this.domNode){
this._applyAttributes();
var _491=this.srcNodeRef;
if(_491&&_491.parentNode&&this.domNode!==_491){
_491.parentNode.replaceChild(this.domNode,_491);
_490=true;
}
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(_490){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var ctor=this.constructor,list=ctor._setterAttrs;
if(!list){
list=(ctor._setterAttrs=[]);
for(var attr in this.attributeMap){
list.push(attr);
}
var _492=ctor.prototype;
for(var _493 in _492){
if(_493 in this.attributeMap){
continue;
}
var _494="_set"+_493.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
})+"Attr";
if(_494 in _492){
list.push(_493);
}
}
}
_478.forEach(list,function(attr){
if(this.params&&attr in this.params){
}else{
if(this[attr]){
this.set(attr,this[attr]);
}
}
},this);
for(var _495 in this.params){
this.set(_495,this.params[_495]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||this.ownerDocument.createElement("div");
}
if(this.baseClass){
var _496=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_496=_496.concat(_478.map(_496,function(name){
return name+"Rtl";
}));
}
_47e.add(this.domNode,_496);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_478.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_497){
this._beingDestroyed=true;
this.destroyDescendants(_497);
this.destroy(_497);
},destroy:function(_498){
this._beingDestroyed=true;
this.uninitialize();
function _499(w){
if(w.destroyRecursive){
w.destroyRecursive(_498);
}else{
if(w.destroy){
w.destroy(_498);
}
}
};
_478.forEach(this._connects,lang.hitch(this,"disconnect"));
_478.forEach(this._supportingWidgets,_499);
if(this.domNode){
_478.forEach(_487.findWidgets(this.domNode,this.containerNode),_499);
}
this.destroyRendering(_498);
_487.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_49a){
if(this.bgIframe){
this.bgIframe.destroy(_49a);
delete this.bgIframe;
}
if(this.domNode){
if(_49a){
_47d.remove(this.domNode,"widgetId");
}else{
_47f.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_49a){
_47f.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_49b){
_478.forEach(this.getChildren(),function(_49c){
if(_49c.destroyRecursive){
_49c.destroyRecursive(_49b);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_49d){
var _49e=this.domNode;
if(lang.isObject(_49d)){
_481.set(_49e,_49d);
}else{
if(_49e.style.cssText){
_49e.style.cssText+="; "+_49d;
}else{
_49e.style.cssText=_49d;
}
}
this._set("style",_49d);
},_attrToDom:function(attr,_49f,_4a0){
_4a0=arguments.length>=3?_4a0:this.attributeMap[attr];
_478.forEach(lang.isArray(_4a0)?_4a0:[_4a0],function(_4a1){
var _4a2=this[_4a1.node||_4a1||"domNode"];
var type=_4a1.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_49f)){
_49f=lang.hitch(this,_49f);
}
var _4a3=_4a1.attribute?_4a1.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
if(_4a2.tagName){
_47d.set(_4a2,_4a3,_49f);
}else{
_4a2.set(_4a3,_49f);
}
break;
case "innerText":
_4a2.innerHTML="";
_4a2.appendChild(this.ownerDocument.createTextNode(_49f));
break;
case "innerHTML":
_4a2.innerHTML=_49f;
break;
case "class":
_47e.replace(_4a2,_49f,this[attr]);
break;
}
},this);
},get:function(name){
var _4a4=this._getAttrNames(name);
return this[_4a4.g]?this[_4a4.g]():this[name];
},set:function(name,_4a5){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _4a6=this._getAttrNames(name),_4a7=this[_4a6.s];
if(lang.isFunction(_4a7)){
var _4a8=_4a7.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _4a9=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_4a9].tagName,_4aa=_489[tag]||(_489[tag]=_48a(this[_4a9])),map=name in this.attributeMap?this.attributeMap[name]:_4a6.s in this?this[_4a6.s]:((_4a6.l in _4aa&&typeof _4a5!="function")||/^aria-|^data-|^role$/.test(name))?_4a9:null;
if(map!=null){
this._attrToDom(name,_4a5,map);
}
this._set(name,_4a5);
}
return _4a8||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_4ab){
var _4ac=this[name];
this[name]=_4ab;
if(this._created&&_4ab!==_4ac){
if(this._watchCallbacks){
this._watchCallbacks(name,_4ac,_4ab);
}
this.emit("attrmodified-"+name,{detail:{prevValue:_4ac,newValue:_4ab}});
}
},emit:function(type,_4ad,_4ae){
_4ad=_4ad||{};
if(_4ad.bubbles===undefined){
_4ad.bubbles=true;
}
if(_4ad.cancelable===undefined){
_4ad.cancelable=true;
}
if(!_4ad.detail){
_4ad.detail={};
}
_4ad.detail.widget=this;
var ret,_4af=this["on"+type];
if(_4af){
ret=_4af.apply(this,_4ae?_4ae:[_4ad]);
}
if(this._started&&!this._beingDestroyed){
on.emit(this.domNode,type.toLowerCase(),_4ad);
}
return ret;
},on:function(type,func){
var _4b0=this._onMap(type);
if(_4b0){
return _479.after(this,_4b0,func,true);
}
return this.own(on(this.domNode,type,func))[0];
},_onMap:function(type){
var ctor=this.constructor,map=ctor._onMap;
if(!map){
map=(ctor._onMap={});
for(var attr in ctor.prototype){
if(/^on/.test(attr)){
map[attr.replace(/^on/,"").toLowerCase()]=attr;
}
}
}
return map[typeof type=="string"&&type.toLowerCase()];
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getChildren:function(){
return this.containerNode?_487.findWidgets(this.containerNode):[];
},getParent:function(){
return _487.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_4b1,_4b2){
return this.own(_47b.connect(obj,_4b1,this,_4b2))[0];
},disconnect:function(_4b3){
_4b3.remove();
},subscribe:function(t,_4b4){
return this.own(_485.subscribe(t,lang.hitch(this,_4b4)))[0];
},unsubscribe:function(_4b5){
_4b5.remove();
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_480.isBodyLtr(this.ownerDocument);
},isFocusable:function(){
return this.focus&&(_481.get(this.domNode,"display")!="none");
},placeAt:function(_4b6,_4b7){
var _4b8=!_4b6.tagName&&_487.byId(_4b6);
if(_4b8&&_4b8.addChild&&(!_4b7||typeof _4b7==="number")){
_4b8.addChild(this,_4b7);
}else{
var ref=_4b8?(_4b8.containerNode&&!/after|before|replace/.test(_4b7||"")?_4b8.containerNode:_4b8.domNode):dom.byId(_4b6,this.ownerDocument);
_47f.place(this.domNode,ref,_4b7);
if(!this._started&&(this.getParent()||{})._started){
this.startup();
}
}
return this;
},getTextDir:function(text,_4b9){
return _4b9;
},applyTextDir:function(){
},defer:function(fcn,_4ba){
var _4bb=setTimeout(lang.hitch(this,function(){
_4bb=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_4ba||0);
return {remove:function(){
if(_4bb){
clearTimeout(_4bb);
_4bb=null;
}
return null;
}};
}});
});
},"dojo/dnd/Moveable":function(){
define(["../_base/array","../_base/declare","../_base/event","../_base/lang","../dom","../dom-class","../Evented","../on","../topic","../touch","./common","./Mover","../_base/window"],function(_4bc,_4bd,_4be,lang,dom,_4bf,_4c0,on,_4c1,_4c2,dnd,_4c3,win){
var _4c4=_4bd("dojo.dnd.Moveable",[_4c0],{handle:"",delay:0,skip:false,constructor:function(node,_4c5){
this.node=dom.byId(node);
if(!_4c5){
_4c5={};
}
this.handle=_4c5.handle?dom.byId(_4c5.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_4c5.delay>0?_4c5.delay:0;
this.skip=_4c5.skip;
this.mover=_4c5.mover?_4c5.mover:_4c3;
this.events=[on(this.handle,_4c2.press,lang.hitch(this,"onMouseDown")),on(this.handle,"dragstart",lang.hitch(this,"onSelectStart")),on(this.handle,"selectstart",lang.hitch(this,"onSelectStart"))];
},markupFactory:function(_4c6,node,Ctor){
return new Ctor(node,_4c6);
},destroy:function(){
_4bc.forEach(this.events,function(_4c7){
_4c7.remove();
});
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(on(this.handle,_4c2.move,lang.hitch(this,"onMouseMove")),on(this.handle,_4c2.release,lang.hitch(this,"onMouseUp")));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
_4be.stop(e);
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
_4be.stop(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
this.events.pop().remove();
}
_4be.stop(e);
},onSelectStart:function(e){
if(!this.skip||!dnd.isFormElement(e)){
_4be.stop(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_4c8){
_4c1.publish("/dnd/move/start",_4c8);
_4bf.add(win.body(),"dojoMove");
_4bf.add(this.node,"dojoMoveItem");
},onMoveStop:function(_4c9){
_4c1.publish("/dnd/move/stop",_4c9);
_4bf.remove(win.body(),"dojoMove");
_4bf.remove(this.node,"dojoMoveItem");
},onFirstMove:function(){
},onMove:function(_4ca,_4cb){
this.onMoving(_4ca,_4cb);
var s=_4ca.node.style;
s.left=_4cb.l+"px";
s.top=_4cb.t+"px";
this.onMoved(_4ca,_4cb);
},onMoving:function(){
},onMoved:function(){
}});
return _4c4;
});
},"*now":function(r){
r(["dojo/i18n!*preload*preview/nls/singlepreview*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
define("preview/singlepreview",["dojo/_base/declare","dijit/_WidgetBase","./silhouetteiframe","dijit/form/Button","dijit/form/HorizontalSlider","dijit/form/HorizontalRuleLabels","dijit/form/Select","dojo/_base/lang","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/_base/connect","dojo/i18n!preview/nls/preview"],function(_4cc,_4cd,_4ce,_4cf,_4d0,_4d1,_4d2,lang,_4d3,_4d4,_4d5,_4d6,_4d7){
return _4cc([_4cd],{currentDevice:0,currentZoom:1,orientation:"portrait",scalefactor:1,showZoom:true,margin:0,pathToPreviewerFolder:"preview/",_randomUrlParam:"&"+Math.random()+"=1",buildRendering:function(){
this._connects=[];
if(this.devicelist&&this.devicelist.length&&this.iframefilename){
this.addStyleDeclarations();
this.domNode=this.srcNodeRef;
this.domNode.innerHTML=lang.replace("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"+"<tr><td style=\"text-align:left;\">"+"<div class=\"controlbar\">"+"<span class=\"controlbar_label\">{device}</span>"+"<span class=\"controlbar_container controlbar_container_device\"><span class=\"controlbar_device\"></span></span>"+"<span class=\"controlbar_label controlbar_label_zoom\">{zoom}</span>"+"<span class=\"controlbar_container controlbar_container_zoom\"><span class=\"controlbar_zoom_labels\"></span><span class=\"controlbar_zoom\"></span></span>"+"<span class=\"controlbar_label\">{angle}</span>"+"<span class=\"controlbar_container controlbar_container_angle\"><span class=\"controlbar_angle\"></span></span>"+"</div>"+"</td></tr>"+"<tr><td style=\"text-align:left;\">"+"<div class=\"silhouette_container\" style=\"display:inline-block\"></div>"+"</td></tr></table>",_4d7);
if(!this.showZoom){
_4d4(".controlbar_label_zoom",this.domNode)[0].style.display="none";
_4d4(".controlbar_container_zoom",this.domNode)[0].style.display="none";
}
this.initControls();
}else{
}
},addStyleDeclarations:function(){
var _4d8=_4d4("style.singlepreview_styles");
if(!_4d8.length){
var _4d9=document.querySelectorAll("head")[0];
if(!_4d9){
console.error("silhouetteiframe.js addStyleDeclarations(): no HEAD element");
return;
}
_4d3.create("style",{type:"text/css","class":"singlepreview_styles",innerHTML:".controlbar { line-height:1.25em; }\n"+".controlbar_label { display:inline-block; vertical-align:middle; margin-top:14px; }\n"+".controlbar_container { display:inline-block; vertical-align:top; }\n"+".controlbar_container_device { margin:9px 7px 0 1px; }\n"+".controlbar_container_zoom { margin-right:6px; }\n"+".controlbar_container_angle { margin:9px 9px 0 1px; }\n"+".control_angle { width:16px; height:16px; }\n"+".control_angle_cw { background-image:url("+this.pathToPreviewerFolder+"images/rotate_cw.png); }\n"+".control_angle_ccw { background-image:url("+this.pathToPreviewerFolder+"images/rotate_ccw.png); }\n"+".controlbar .controlbar_container.controlbar_container_angle .dijitButtonNode { padding: 0px; }"},_4d9);
}
},initControls:function(){
var _4da=_4d4(".controlbar_device",this.domNode)[0];
var _4db=this.device_select=new _4d2({},_4da);
_4db.addOption(this.devicelist);
setTimeout(lang.hitch(this,function(){
this.connect(_4db,"onChange",function(_4dc){
if(_4dc!=this.currentDevice){
this.currentDevice=_4dc;
var _4dd=_4ce.getMobileTheme(this.devicelist[this.currentDevice].file);
var _4de=this.iframefilename+"?theme="+_4dd+this._randomUrlParam;
if(this.iframeSearch){
_4de+="&"+this.iframeSearch;
}
this.update_silhouette_container(_4de);
}
});
}),1);
if(this.showZoom){
var _4df=_4d4(".controlbar_zoom",this.domNode)[0],_4e0=_4d4(".controlbar_zoom_labels",this.domNode)[0],_4e1=this.sliderLabels=new _4d1({container:"topDecoration",count:14,labels:["",0,"","",1,"","",2,"","",3,""],style:"height:1.5em;font-size:100%;color:gray; width:74px"},_4e0),_4e2=this.zoom_select=new _4d0({value:this.currentZoom,minimum:0.2,maximum:3,intermediateChanges:true,showButtons:false,style:"width:75px;"},_4df);
this.connect(_4e2,"onChange",lang.hitch(this,function(){
if(_4e2.value!=this.currentZoom){
this.currentZoom=_4e2.value;
this.silhouetteiframe.setScaleFactor(this.currentZoom);
}
}));
}
var _4e3=_4d4(".controlbar_angle",this.domNode)[0];
var _4e4=(this.orientation=="landscape")?"control_angle_ccw":"control_angle_cw";
var _4e5=this.angle_select=new _4cf({iconClass:"control_angle "+_4e4,showLabel:false},_4e3);
this.connect(_4e5,"onClick",lang.hitch(this,function(){
var _4e6=_4d4(".control_angle",this.domNode)[0];
if(this.orientation=="landscape"){
this.orientation="portrait";
_4d5.remove(_4e6,"control_angle_ccw");
_4d5.add(_4e6,"control_angle_cw");
}else{
this.orientation="landscape";
_4d5.remove(_4e6,"control_angle_cw");
_4d5.add(_4e6,"control_angle_ccw");
}
this.silhouetteiframe.setOrientation(this.orientation);
}));
var _4e7=_4ce.getMobileTheme(this.devicelist[this.currentDevice].file);
var _4e8=this.iframefilename+"?theme="+_4e7+this._randomUrlParam;
if(this.iframeSearch){
_4e8+="&"+this.iframeSearch;
}
this.update_silhouette_container(_4e8);
},update_silhouette_container:function(_4e9){
if(this.silhouetteiframe_connect_onload){
_4d6.disconnect(this.silhouetteiframe_connect_onload);
delete this.silhouetteiframe_connect_onload;
}
var _4ea=_4d4(".silhouette_container",this.domNode)[0];
_4ea.innerHTML="<div class=\"silhouette_div_container\">"+"<span class=\"silhouetteiframe_object_container\"></span>"+"<iframe src=\""+_4e9+"\" class=\"silhouetteiframe_iframe\"></iframe>"+"</div>";
var _4eb=_4d4(".silhouette_div_container",_4ea)[0];
var _4ec=_4d4(".silhouetteiframe_iframe",_4ea)[0];
this.silhouetteiframe_connect_onload=_4d6.connect(_4ec,"onload",lang.hitch(this,function(){
this.silhouetteiframe=new _4ce({rootNode:_4eb,svgfilename:this.devicelist[this.currentDevice].file,orientation:this.orientation,scalefactor:this.scalefactor,margin:this.margin});
}));
},destroy:function(_4ed){
if(this.silhouetteiframe_connect_onload){
_4d6.disconnect(this.silhouetteiframe_connect_onload);
delete this.silhouetteiframe_connect_onload;
}
this.device_select.destroy();
this.sliderLabels.destroy();
this.zoom_select.destroy();
this.angle_select.destroy();
this.inherited("destroy",arguments);
}});
});
