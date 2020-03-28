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
(function(_1,_2){
var _3=function(){
},_4=function(it){
for(var p in it){
return 0;
}
return 1;
},_5={}.toString,_6=function(it){
return _5.call(it)=="[object Function]";
},_7=function(it){
return _5.call(it)=="[object String]";
},_8=function(it){
return _5.call(it)=="[object Array]";
},_9=function(_a,_b){
if(_a){
for(var i=0;i<_a.length;){
_b(_a[i++]);
}
}
},_c=function(_d,_e){
for(var p in _e){
_d[p]=_e[p];
}
return _d;
},_f=function(_10,_11){
return _c(new Error(_10),{src:"dojoLoader",info:_11});
},_12=1,uid=function(){
return "_"+_12++;
},req=function(_13,_14,_15){
return _16(_13,_14,_15,0,req);
},_17=this,doc=_17.document,_18=doc&&doc.createElement("DiV"),has=req.has=function(_19){
return _6(_1a[_19])?(_1a[_19]=_1a[_19](_17,doc,_18)):_1a[_19];
},_1a=has.cache=_2.hasCache;
has.add=function(_1b,_1c,now,_1d){
(_1a[_1b]===undefined||_1d)&&(_1a[_1b]=_1c);
return now&&has(_1b);
};
0&&has.add("host-node",_1.has&&"host-node" in _1.has?_1.has["host-node"]:(typeof process=="object"&&process.versions&&process.versions.node&&process.versions.v8));
if(0){
require("./_base/configNode.js").config(_2);
_2.loaderPatch.nodeRequire=require;
}
0&&has.add("host-rhino",_1.has&&"host-rhino" in _1.has?_1.has["host-rhino"]:(typeof load=="function"&&(typeof Packages=="function"||typeof Packages=="object")));
if(0){
for(var _1e=_1.baseUrl||".",arg,_1f=this.arguments,i=0;i<_1f.length;){
arg=(_1f[i++]+"").split("=");
if(arg[0]=="baseUrl"){
_1e=arg[1];
break;
}
}
load(_1e+"/_base/configRhino.js");
rhinoDojoConfig(_2,_1e,_1f);
}
for(var p in _1.has){
has.add(p,_1.has[p],0,1);
}
var _20=1,_21=2,_22=3,_23=4,_24=5;
if(0){
_20="requested";
_21="arrived";
_22="not-a-module";
_23="executing";
_24="executed";
}
var _25=0,_26="sync",xd="xd",_27=[],_28=0,_29=_3,_2a=_3,_2b;
if(1){
req.isXdUrl=_3;
req.initSyncLoader=function(_2c,_2d,_2e){
if(!_28){
_28=_2c;
_29=_2d;
_2a=_2e;
}
return {sync:_26,requested:_20,arrived:_21,nonmodule:_22,executing:_23,executed:_24,syncExecStack:_27,modules:_2f,execQ:_30,getModule:_31,injectModule:_32,setArrived:_33,signal:_34,finishExec:_35,execModule:_36,dojoRequirePlugin:_28,getLegacyMode:function(){
return _25;
},guardCheckComplete:_37};
};
if(1){
var _38=location.protocol,_39=location.host;
req.isXdUrl=function(url){
if(/^\./.test(url)){
return false;
}
if(/^\/\//.test(url)){
return true;
}
var _3a=url.match(/^([^\/\:]+\:)\/+([^\/]+)/);
return _3a&&(_3a[1]!=_38||(_39&&_3a[2]!=_39));
};
1||has.add("dojo-xhr-factory",1);
has.add("dojo-force-activex-xhr",1&&!doc.addEventListener&&window.location.protocol=="file:");
has.add("native-xhr",typeof XMLHttpRequest!="undefined");
if(has("native-xhr")&&!has("dojo-force-activex-xhr")){
_2b=function(){
return new XMLHttpRequest();
};
}else{
for(var _3b=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],_3c,i=0;i<3;){
try{
_3c=_3b[i++];
if(new ActiveXObject(_3c)){
break;
}
}
catch(e){
}
}
_2b=function(){
return new ActiveXObject(_3c);
};
}
req.getXhr=_2b;
has.add("dojo-gettext-api",1);
req.getText=function(url,_3d,_3e){
var xhr=_2b();
xhr.open("GET",_3f(url),false);
xhr.send(null);
if(xhr.status==200||(!location.host&&!xhr.status)){
if(_3e){
_3e(xhr.responseText,_3d);
}
}else{
throw _f("xhrFailed",xhr.status);
}
return xhr.responseText;
};
}
}else{
req.async=1;
}
var _40=new Function("return eval(arguments[0]);");
req.eval=function(_41,_42){
return _40(_41+"\r\n////@ sourceURL="+_42);
};
var _43={},_44="error",_34=req.signal=function(_45,_46){
var _47=_43[_45];
_9(_47&&_47.slice(0),function(_48){
_48.apply(null,_8(_46)?_46:[_46]);
});
},on=req.on=function(_49,_4a){
var _4b=_43[_49]||(_43[_49]=[]);
_4b.push(_4a);
return {remove:function(){
for(var i=0;i<_4b.length;i++){
if(_4b[i]===_4a){
_4b.splice(i,1);
return;
}
}
}};
};
var _4c=[],_4d={},_4e=[],_4f={},map=req.map={},_50=[],_2f={},_51="",_52={},_53="url:",_54={},_55={};
if(1){
var _56=function(_57){
var p,_58,_59,now,m;
for(p in _54){
_58=_54[p];
_59=p.match(/^url\:(.+)/);
if(_59){
_52[_53+_5a(_59[1],_57)]=_58;
}else{
if(p=="*now"){
now=_58;
}else{
if(p!="*noref"){
m=_5b(p,_57);
_52[m.mid]=_52[_53+m.url]=_58;
}
}
}
}
if(now){
now(_5c(_57));
}
_54={};
},_5d=function(s){
return s.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(c){
return "\\"+c;
});
},_5e=function(map,_5f){
_5f.splice(0,_5f.length);
for(var p in map){
_5f.push([p,map[p],new RegExp("^"+_5d(p)+"(/|$)"),p.length]);
}
_5f.sort(function(lhs,rhs){
return rhs[3]-lhs[3];
});
return _5f;
},_60=function(_61){
var _62=_61.name;
if(!_62){
_62=_61;
_61={name:_62};
}
_61=_c({main:"main"},_61);
_61.location=_61.location?_61.location:_62;
if(_61.packageMap){
map[_62]=_61.packageMap;
}
if(!_61.main.indexOf("./")){
_61.main=_61.main.substring(2);
}
_4f[_62]=_61;
},_63=function(_64,_65,_66){
for(var p in _64){
if(p=="waitSeconds"){
req.waitms=(_64[p]||0)*1000;
}
if(p=="cacheBust"){
_51=_64[p]?(_7(_64[p])?_64[p]:(new Date()).getTime()+""):"";
}
if(p=="baseUrl"||p=="combo"){
req[p]=_64[p];
}
if(1&&p=="async"){
var _67=_64[p];
req.legacyMode=_25=(_7(_67)&&/sync|legacyAsync/.test(_67)?_67:(!_67?_26:false));
req.async=!_25;
}
if(_64[p]!==_1a){
req.rawConfig[p]=_64[p];
p!="has"&&has.add("config-"+p,_64[p],0,_65);
}
}
if(!req.baseUrl){
req.baseUrl="./";
}
if(!/\/$/.test(req.baseUrl)){
req.baseUrl+="/";
}
for(p in _64.has){
has.add(p,_64.has[p],0,_65);
}
_9(_64.packages,_60);
for(_1e in _64.packagePaths){
_9(_64.packagePaths[_1e],function(_68){
var _69=_1e+"/"+_68;
if(_7(_68)){
_68={name:_68};
}
_68.location=_69;
_60(_68);
});
}
_5e(_c(map,_64.map),_50);
_9(_50,function(_6a){
_6a[1]=_5e(_6a[1],[]);
if(_6a[0]=="*"){
_50.star=_6a[1];
}
});
_5e(_c(_4d,_64.paths),_4e);
_9(_64.aliases,function(_6b){
if(_7(_6b[0])){
_6b[0]=new RegExp("^"+_5d(_6b[0])+"$");
}
_4c.push(_6b);
});
for(p in _64.config){
var _6c=_31(p,_66);
_6c.config=_c(_6c.config||{},_64.config[p]);
}
if(_64.cache){
_56();
_54=_64.cache;
if(_64.cache["*noref"]){
_56();
}
}
_34("config",[_64,req.rawConfig]);
};
if(has("dojo-cdn")||1){
var _6d=doc.getElementsByTagName("script"),i=0,_6e,_6f,src,_70;
while(i<_6d.length){
_6e=_6d[i++];
if((src=_6e.getAttribute("src"))&&(_70=src.match(/(((.*)\/)|^)dojo\.js(\W|$)/i))){
_6f=_70[3]||"";
_2.baseUrl=_2.baseUrl||_6f;
src=(_6e.getAttribute("data-dojo-config")||_6e.getAttribute("djConfig"));
if(src){
_55=req.eval("({ "+src+" })","data-dojo-config");
}
if(0){
var _71=_6e.getAttribute("data-main");
if(_71){
_55.deps=_55.deps||[_71];
}
}
break;
}
}
}
if(0){
try{
if(window.parent!=window&&window.parent.require){
var doh=window.parent.require("doh");
doh&&_c(_55,doh.testConfig);
}
}
catch(e){
}
}
req.rawConfig={};
_63(_2,1);
if(has("dojo-cdn")){
_4f.dojo.location=_6f;
if(_6f){
_6f+="/";
}
_4f.dijit.location=_6f+"../dijit/";
_4f.dojox.location=_6f+"../dojox/";
}
_63(_1,1);
_63(_55,1);
}else{
_4d=_2.paths;
_4e=_2.pathsMapProg;
_4f=_2.packs;
_4c=_2.aliases;
_50=_2.mapProgs;
_2f=_2.modules;
_52=_2.cache;
_51=_2.cacheBust;
req.rawConfig=_2;
}
if(0){
req.combo=req.combo||{add:_3};
var _72=0,_73=[],_74=null;
}
var _75=function(_76){
_37(function(){
_9(_76.deps,_32);
if(0&&_72&&!_74){
_74=setTimeout(function(){
_72=0;
_74=null;
req.combo.done(function(_77,url){
var _78=function(){
_79(0,_77);
_7a();
};
_73.push(_77);
_7b=_77;
req.injectUrl(url,_78,_77);
_7b=0;
},req);
},0);
}
});
},_16=function(a1,a2,a3,_7c,_7d){
var _7e,_7f;
if(_7(a1)){
_7e=_31(a1,_7c,true);
if(_7e&&_7e.executed){
return _7e.result;
}
throw _f("undefinedModule",a1);
}
if(!_8(a1)){
_63(a1,0,_7c);
a1=a2;
a2=a3;
}
if(_8(a1)){
if(!a1.length){
a2&&a2();
}else{
_7f="require*"+uid();
for(var mid,_80=[],i=0;i<a1.length;){
mid=a1[i++];
_80.push(_31(mid,_7c));
}
_7e=_c(_81("",_7f,0,""),{injected:_21,deps:_80,def:a2||_3,require:_7c?_7c.require:req,gc:1});
_2f[_7e.mid]=_7e;
_75(_7e);
var _82=_83&&_25!=_26;
_37(function(){
_36(_7e,_82);
});
if(!_7e.executed){
_30.push(_7e);
}
_7a();
}
}
return _7d;
},_5c=function(_84){
if(!_84){
return req;
}
var _85=_84.require;
if(!_85){
_85=function(a1,a2,a3){
return _16(a1,a2,a3,_84,_85);
};
_84.require=_c(_85,req);
_85.module=_84;
_85.toUrl=function(_86){
return _5a(_86,_84);
};
_85.toAbsMid=function(mid){
return _b3(mid,_84);
};
if(0){
_85.undef=function(mid){
req.undef(mid,_84);
};
}
if(1){
_85.syncLoadNls=function(mid){
var _87=_5b(mid,_84),_88=_2f[_87.mid];
if(!_88||!_88.executed){
_89=_52[_87.mid]||_52[_53+_87.url];
if(_89){
_8a(_89);
_88=_2f[_87.mid];
}
}
return _88&&_88.executed&&_88.result;
};
}
}
return _85;
},_30=[],_8b=[],_8c={},_8d=function(_8e){
_8e.injected=_20;
_8c[_8e.mid]=1;
if(_8e.url){
_8c[_8e.url]=_8e.pack||1;
}
_8f();
},_33=function(_90){
_90.injected=_21;
delete _8c[_90.mid];
if(_90.url){
delete _8c[_90.url];
}
if(_4(_8c)){
_91();
1&&_25==xd&&(_25=_26);
}
},_92=req.idle=function(){
return !_8b.length&&_4(_8c)&&!_30.length&&!_83;
},_93=function(_94,map){
if(map){
for(var i=0;i<map.length;i++){
if(map[i][2].test(_94)){
return map[i];
}
}
}
return 0;
},_95=function(_96){
var _97=[],_98,_99;
_96=_96.replace(/\\/g,"/").split("/");
while(_96.length){
_98=_96.shift();
if(_98==".."&&_97.length&&_99!=".."){
_97.pop();
_99=_97[_97.length-1];
}else{
if(_98!="."){
_97.push(_99=_98);
}
}
}
return _97.join("/");
},_81=function(pid,mid,_9a,url){
if(1){
var xd=req.isXdUrl(url);
return {pid:pid,mid:mid,pack:_9a,url:url,executed:0,def:0,isXd:xd,isAmd:!!(xd||(_4f[pid]&&_4f[pid].isAmd))};
}else{
return {pid:pid,mid:mid,pack:_9a,url:url,executed:0,def:0};
}
},_9b=function(mid,_9c,_9d,_9e,_9f,_a0,_a1,_a2){
var pid,_a3,_a4,_a5,_a6,url,_a7,_a8,_a9;
_a9=mid;
_a8=/^\./.test(mid);
if(/(^\/)|(\:)|(\.js$)/.test(mid)||(_a8&&!_9c)){
return _81(0,mid,0,mid);
}else{
mid=_95(_a8?(_9c.mid+"/../"+mid):mid);
if(/^\./.test(mid)){
throw _f("irrationalPath",mid);
}
if(_9c){
_a6=_93(_9c.mid,_a0);
}
_a6=_a6||_a0.star;
_a6=_a6&&_93(mid,_a6[1]);
if(_a6){
mid=_a6[1]+mid.substring(_a6[3]);
}
_70=mid.match(/^([^\/]+)(\/(.+))?$/);
pid=_70?_70[1]:"";
if((_a3=_9d[pid])){
mid=pid+"/"+(_a4=(_70[3]||_a3.main));
}else{
pid="";
}
var _aa=0,_ab=0;
_9(_4c,function(_ac){
var _ad=mid.match(_ac[0]);
if(_ad&&_ad.length>_aa){
_ab=_6(_ac[1])?mid.replace(_ac[0],_ac[1]):_ac[1];
}
});
if(_ab){
return _9b(_ab,0,_9d,_9e,_9f,_a0,_a1,_a2);
}
_a7=_9e[mid];
if(_a7){
return _a2?_81(_a7.pid,_a7.mid,_a7.pack,_a7.url):_9e[mid];
}
}
_a6=_93(mid,_a1);
if(_a6){
url=_a6[1]+mid.substring(_a6[3]);
}else{
if(pid){
url=_a3.location+"/"+_a4;
}else{
if(has("config-tlmSiblingOfDojo")){
url="../"+mid;
}else{
url=mid;
}
}
}
if(!(/(^\/)|(\:)/.test(url))){
url=_9f+url;
}
url+=".js";
return _81(pid,mid,_a3,_95(url));
},_5b=function(mid,_ae){
return _9b(mid,_ae,_4f,_2f,req.baseUrl,_50,_4e);
},_af=function(_b0,_b1,_b2){
return _b0.normalize?_b0.normalize(_b1,function(mid){
return _b3(mid,_b2);
}):_b3(_b1,_b2);
},_b4=0,_31=function(mid,_b5,_b6){
var _b7,_b8,_b9,_ba;
_b7=mid.match(/^(.+?)\!(.*)$/);
if(_b7){
_b8=_31(_b7[1],_b5,_b6);
if(1&&_25==_26&&!_b8.executed){
_32(_b8);
if(_b8.injected===_21&&!_b8.executed){
_37(function(){
_36(_b8);
});
}
if(_b8.executed){
_bb(_b8);
}else{
_30.unshift(_b8);
}
}
if(_b8.executed===_24&&!_b8.load){
_bb(_b8);
}
if(_b8.load){
_b9=_af(_b8,_b7[2],_b5);
mid=(_b8.mid+"!"+(_b8.dynamic?++_b4+"!":"")+_b9);
}else{
_b9=_b7[2];
mid=_b8.mid+"!"+(++_b4)+"!waitingForPlugin";
}
_ba={plugin:_b8,mid:mid,req:_5c(_b5),prid:_b9};
}else{
_ba=_5b(mid,_b5);
}
return _2f[_ba.mid]||(!_b6&&(_2f[_ba.mid]=_ba));
},_b3=req.toAbsMid=function(mid,_bc){
return _5b(mid,_bc).mid;
},_5a=req.toUrl=function(_bd,_be){
var _bf=_5b(_bd+"/x",_be),url=_bf.url;
return _3f(_bf.pid===0?_bd:url.substring(0,url.length-5));
},_c0={injected:_21,executed:_24,def:_22,result:_22},_c1=function(mid){
return _2f[mid]=_c({mid:mid},_c0);
},_c2=_c1("require"),_c3=_c1("exports"),_c4=_c1("module"),_c5=function(_c6,_c7){
req.trace("loader-run-factory",[_c6.mid]);
var _c8=_c6.def,_c9;
1&&_27.unshift(_c6);
if(has("config-dojo-loader-catches")){
try{
_c9=_6(_c8)?_c8.apply(null,_c7):_c8;
}
catch(e){
_34(_44,_c6.result=_f("factoryThrew",[_c6,e]));
}
}else{
_c9=_6(_c8)?_c8.apply(null,_c7):_c8;
}
_c6.result=_c9===undefined&&_c6.cjs?_c6.cjs.exports:_c9;
1&&_27.shift(_c6);
},_ca={},_cb=0,_bb=function(_cc){
var _cd=_cc.result;
_cc.dynamic=_cd.dynamic;
_cc.normalize=_cd.normalize;
_cc.load=_cd.load;
return _cc;
},_ce=function(_cf){
var map={};
_9(_cf.loadQ,function(_d0){
var _d1=_af(_cf,_d0.prid,_d0.req.module),mid=_cf.dynamic?_d0.mid.replace(/waitingForPlugin$/,_d1):(_cf.mid+"!"+_d1),_d2=_c(_c({},_d0),{mid:mid,prid:_d1,injected:0});
if(!_2f[mid]){
_e4(_2f[mid]=_d2);
}
map[_d0.mid]=_2f[mid];
_33(_d0);
delete _2f[_d0.mid];
});
_cf.loadQ=0;
var _d3=function(_d4){
for(var _d5,_d6=_d4.deps||[],i=0;i<_d6.length;i++){
_d5=map[_d6[i].mid];
if(_d5){
_d6[i]=_d5;
}
}
};
for(var p in _2f){
_d3(_2f[p]);
}
_9(_30,_d3);
},_35=function(_d7){
req.trace("loader-finish-exec",[_d7.mid]);
_d7.executed=_24;
_d7.defOrder=_cb++;
1&&_9(_d7.provides,function(cb){
cb();
});
if(_d7.loadQ){
_bb(_d7);
_ce(_d7);
}
for(i=0;i<_30.length;){
if(_30[i]===_d7){
_30.splice(i,1);
}else{
i++;
}
}
if(/^require\*/.test(_d7.mid)){
delete _2f[_d7.mid];
}
},_d8=[],_36=function(_d9,_da){
if(_d9.executed===_23){
req.trace("loader-circular-dependency",[_d8.concat(_d9.mid).join("->")]);
return (!_d9.def||_da)?_ca:(_d9.cjs&&_d9.cjs.exports);
}
if(!_d9.executed){
if(!_d9.def){
return _ca;
}
var mid=_d9.mid,_db=_d9.deps||[],arg,_dc,_dd=[],i=0;
if(0){
_d8.push(mid);
req.trace("loader-exec-module",["exec",_d8.length,mid]);
}
_d9.executed=_23;
while(i<_db.length){
arg=_db[i++];
_dc=((arg===_c2)?_5c(_d9):((arg===_c3)?_d9.cjs.exports:((arg===_c4)?_d9.cjs:_36(arg,_da))));
if(_dc===_ca){
_d9.executed=0;
req.trace("loader-exec-module",["abort",mid]);
0&&_d8.pop();
return _ca;
}
_dd.push(_dc);
}
_c5(_d9,_dd);
_35(_d9);
0&&_d8.pop();
}
return _d9.result;
},_83=0,_37=function(_de){
try{
_83++;
_de();
}
finally{
_83--;
}
if(_92()){
_34("idle",[]);
}
},_7a=function(){
if(_83){
return;
}
_37(function(){
_29();
for(var _df,_e0,i=0;i<_30.length;){
_df=_cb;
_e0=_30[i];
_36(_e0);
if(_df!=_cb){
_29();
i=0;
}else{
i++;
}
}
});
};
if(0){
req.undef=function(_e1,_e2){
var _e3=_31(_e1,_e2);
_33(_e3);
delete _2f[_e3.mid];
};
}
if(1){
if(has("dojo-loader-eval-hint-url")===undefined){
has.add("dojo-loader-eval-hint-url",1);
}
var _3f=function(url){
url+="";
return url+(_51?((/\?/.test(url)?"&":"?")+_51):"");
},_e4=function(_e5){
var _e6=_e5.plugin;
if(_e6.executed===_24&&!_e6.load){
_bb(_e6);
}
var _e7=function(def){
_e5.result=def;
_33(_e5);
_35(_e5);
_7a();
};
if(_e6.load){
_e6.load(_e5.prid,_e5.req,_e7);
}else{
if(_e6.loadQ){
_e6.loadQ.push(_e5);
}else{
_e6.loadQ=[_e5];
_30.unshift(_e6);
_32(_e6);
}
}
},_89=0,_7b=0,_e8=0,_8a=function(_e9,_ea){
if(has("config-stripStrict")){
_e9=_e9.replace(/"use strict"/g,"");
}
_e8=1;
if(has("config-dojo-loader-catches")){
try{
if(_e9===_89){
_89.call(null);
}else{
req.eval(_e9,has("dojo-loader-eval-hint-url")?_ea.url:_ea.mid);
}
}
catch(e){
_34(_44,_f("evalModuleThrew",_ea));
}
}else{
if(_e9===_89){
_89.call(null);
}else{
req.eval(_e9,has("dojo-loader-eval-hint-url")?_ea.url:_ea.mid);
}
}
_e8=0;
},_32=function(_eb){
var mid=_eb.mid,url=_eb.url;
if(_eb.executed||_eb.injected||_8c[mid]||(_eb.url&&((_eb.pack&&_8c[_eb.url]===_eb.pack)||_8c[_eb.url]==1))){
return;
}
_8d(_eb);
if(0){
var _ec=0;
if(_eb.plugin&&_eb.plugin.isCombo){
req.combo.add(_eb.plugin.mid,_eb.prid,0,req);
_ec=1;
}else{
if(!_eb.plugin){
_ec=req.combo.add(0,_eb.mid,_eb.url,req);
}
}
if(_ec){
_72=1;
return;
}
}
if(_eb.plugin){
_e4(_eb);
return;
}
var _ed=function(){
_79(_eb);
if(_eb.injected!==_21){
_33(_eb);
_c(_eb,_c0);
req.trace("loader-define-nonmodule",[_eb.url]);
}
if(1&&_25){
!_27.length&&_7a();
}else{
_7a();
}
};
_89=_52[mid]||_52[_53+_eb.url];
if(_89){
req.trace("loader-inject",["cache",_eb.mid,url]);
_8a(_89,_eb);
_ed();
return;
}
if(1&&_25){
if(_eb.isXd){
_25==_26&&(_25=xd);
}else{
if(_eb.isAmd&&_25!=_26){
}else{
var _ee=function(_ef){
if(_25==_26){
_27.unshift(_eb);
_8a(_ef,_eb);
_27.shift();
_79(_eb);
if(!_eb.cjs){
_33(_eb);
_35(_eb);
}
if(_eb.finish){
var _f0=mid+"*finish",_f1=_eb.finish;
delete _eb.finish;
def(_f0,["dojo",("dojo/require!"+_f1.join(",")).replace(/\./g,"/")],function(_f2){
_9(_f1,function(mid){
_f2.require(mid);
});
});
_30.unshift(_31(_f0));
}
_ed();
}else{
_ef=_2a(_eb,_ef);
if(_ef){
_8a(_ef,_eb);
_ed();
}else{
_7b=_eb;
req.injectUrl(_3f(url),_ed,_eb);
_7b=0;
}
}
};
req.trace("loader-inject",["xhr",_eb.mid,url,_25!=_26]);
if(has("config-dojo-loader-catches")){
try{
req.getText(url,_25!=_26,_ee);
}
catch(e){
_34(_44,_f("xhrInjectFailed",[_eb,e]));
}
}else{
req.getText(url,_25!=_26,_ee);
}
return;
}
}
}
req.trace("loader-inject",["script",_eb.mid,url]);
_7b=_eb;
req.injectUrl(_3f(url),_ed,_eb);
_7b=0;
},_f3=function(_f4,_f5,def){
req.trace("loader-define-module",[_f4.mid,_f5]);
if(0&&_f4.plugin&&_f4.plugin.isCombo){
_f4.result=_6(def)?def():def;
_33(_f4);
_35(_f4);
return _f4;
}
var mid=_f4.mid;
if(_f4.injected===_21){
_34(_44,_f("multipleDefine",_f4));
return _f4;
}
_c(_f4,{deps:_f5,def:def,cjs:{id:_f4.mid,uri:_f4.url,exports:(_f4.result={}),setExports:function(_f6){
_f4.cjs.exports=_f6;
},config:function(){
return _f4.config;
}}});
for(var i=0;i<_f5.length;i++){
_f5[i]=_31(_f5[i],_f4);
}
if(1&&_25&&!_8c[mid]){
_75(_f4);
_30.push(_f4);
_7a();
}
_33(_f4);
if(!_6(def)&&!_f5.length){
_f4.result=def;
_35(_f4);
}
return _f4;
},_79=function(_f7,_f8){
var _f9=[],_fa,_fb;
while(_8b.length){
_fb=_8b.shift();
_f8&&(_fb[0]=_f8.shift());
_fa=(_fb[0]&&_31(_fb[0]))||_f7;
_f9.push([_fa,_fb[1],_fb[2]]);
}
_56(_f7);
_9(_f9,function(_fc){
_75(_f3.apply(null,_fc));
});
};
}
var _fd=0,_91=_3,_8f=_3;
if(1){
_91=function(){
_fd&&clearTimeout(_fd);
_fd=0;
},_8f=function(){
_91();
if(req.waitms){
_fd=window.setTimeout(function(){
_91();
_34(_44,_f("timeout",_8c));
},req.waitms);
}
};
}
if(1){
has.add("ie-event-behavior",!!doc.attachEvent&&(typeof opera==="undefined"||opera.toString()!="[object Opera]"));
}
if(1&&(1||1)){
var _fe=function(_ff,_100,_101,_102){
if(!has("ie-event-behavior")){
_ff.addEventListener(_100,_102,false);
return function(){
_ff.removeEventListener(_100,_102,false);
};
}else{
_ff.attachEvent(_101,_102);
return function(){
_ff.detachEvent(_101,_102);
};
}
},_103=_fe(window,"load","onload",function(){
req.pageLoaded=1;
doc.readyState!="complete"&&(doc.readyState="complete");
_103();
});
if(1){
var _104=doc.getElementsByTagName("script")[0],_105=_104.parentNode;
req.injectUrl=function(url,_106,_107){
var node=_107.node=doc.createElement("script"),_108=function(e){
e=e||window.event;
var node=e.target||e.srcElement;
if(e.type==="load"||/complete|loaded/.test(node.readyState)){
_109();
_10a();
_106&&_106();
}
},_109=_fe(node,"load","onreadystatechange",_108),_10a=_fe(node,"error","onerror",function(e){
_109();
_10a();
_34(_44,_f("scriptError",[url,e]));
});
node.type="text/javascript";
node.charset="utf-8";
node.src=url;
_105.insertBefore(node,_104);
return node;
};
}
}
if(1){
req.log=function(){
try{
for(var i=0;i<arguments.length;i++){
}
}
catch(e){
}
};
}else{
req.log=_3;
}
if(0){
var _10b=req.trace=function(_10c,args){
if(_10b.on&&_10b.group[_10c]){
_34("trace",[_10c,args]);
for(var arg,dump=[],text="trace:"+_10c+(args.length?(":"+args[0]):""),i=1;i<args.length;){
arg=args[i++];
if(_7(arg)){
text+=", "+arg;
}else{
dump.push(arg);
}
}
req.log(text);
dump.length&&dump.push(".");
req.log.apply(req,dump);
}
};
_c(_10b,{on:1,group:{},set:function(_10d,_10e){
if(_7(_10d)){
_10b.group[_10d]=_10e;
}else{
_c(_10b.group,_10d);
}
}});
_10b.set(_c(_c(_c({},_2.trace),_1.trace),_55.trace));
on("config",function(_10f){
_10f.trace&&_10b.set(_10f.trace);
});
}else{
req.trace=_3;
}
var def=function(mid,_110,_111){
var _112=arguments.length,_113=["require","exports","module"],args=[0,mid,_110];
if(_112==1){
args=[0,(_6(mid)?_113:[]),mid];
}else{
if(_112==2&&_7(mid)){
args=[mid,(_6(_110)?_113:[]),_110];
}else{
if(_112==3){
args=[mid,_110,_111];
}
}
}
if(0&&args[1]===_113){
args[2].toString().replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,"").replace(/require\(["']([\w\!\-_\.\/]+)["']\)/g,function(_114,dep){
args[1].push(dep);
});
}
req.trace("loader-define",args.slice(0,2));
var _115=args[0]&&_31(args[0]),_116;
if(_115&&!_8c[_115.mid]){
_75(_f3(_115,args[1],args[2]));
}else{
if(!has("ie-event-behavior")||!1||_e8){
_8b.push(args);
}else{
_115=_115||_7b;
if(!_115){
for(mid in _8c){
_116=_2f[mid];
if(_116&&_116.node&&_116.node.readyState==="interactive"){
_115=_116;
break;
}
}
if(0&&!_115){
for(var i=0;i<_73.length;i++){
_115=_73[i];
if(_115.node&&_115.node.readyState==="interactive"){
break;
}
_115=0;
}
}
}
if(0&&_8(_115)){
_75(_f3(_31(_115.shift()),args[1],args[2]));
if(!_115.length){
_73.splice(i,1);
}
}else{
if(_115){
_56(_115);
_75(_f3(_115,args[1],args[2]));
}else{
_34(_44,_f("ieDefineFailed",args[0]));
}
}
_7a();
}
}
};
def.amd={vendor:"dojotoolkit.org"};
if(0){
req.def=def;
}
_c(_c(req,_2.loaderPatch),_1.loaderPatch);
on(_44,function(arg){
try{
console.error(arg);
if(arg instanceof Error){
for(var p in arg){
}
}
}
catch(e){
}
});
_c(req,{uid:uid,cache:_52,packs:_4f});
if(0){
_c(req,{paths:_4d,aliases:_4c,modules:_2f,legacyMode:_25,execQ:_30,defQ:_8b,waiting:_8c,packs:_4f,mapProgs:_50,pathsMapProg:_4e,listenerQueues:_43,computeMapProg:_5e,runMapProg:_93,compactPath:_95,getModuleInfo:_9b});
}
if(_17.define){
if(1){
_34(_44,_f("defineAlreadyDefined",0));
}
return;
}else{
_17.define=def;
_17.require=req;
if(0){
require=req;
}
}
if(0&&req.combo&&req.combo.plugins){
var _117=req.combo.plugins,_118;
for(_118 in _117){
_c(_c(_31(_118),_117[_118]),{isCombo:1,executed:"executed",load:1});
}
}
if(1){
var _119=_55.deps||_1.deps||_2.deps,_11a=_55.callback||_1.callback||_2.callback;
req.boot=(_119||_11a)?[_119||[],_11a]:0;
}
if(!1){
!req.async&&req(["dojo"]);
req.boot&&req.apply(null,req.boot);
}
})(this.dojoConfig||this.djConfig||this.require||{},{async:0,hasCache:{"config-selectorEngine":"acme","config-tlmSiblingOfDojo":1,"dojo-built":1,"dojo-loader":1,dom:1,"host-browser":1},packages:[{location:"../dojox",name:"dojox"},{location:"../dijit",name:"dijit"},{location:"../preview",name:"preview"},{location:"../system",name:"system"},{location:".",name:"dojo"},{location:"../orion",name:"orion"},{location:"../davinci",name:"davinci"}]});
require({cache:{"dojo/_base/fx":function(){
define(["./kernel","./config","./lang","../Evented","./Color","./connect","./sniff","../dom","../dom-style"],function(dojo,_11b,lang,_11c,_11d,_11e,has,dom,_11f){
var _120=lang.mixin;
var _121={};
var _122=_121._Line=function(_123,end){
this.start=_123;
this.end=end;
};
_122.prototype.getValue=function(n){
return ((this.end-this.start)*n)+this.start;
};
var _124=_121.Animation=function(args){
_120(this,args);
if(lang.isArray(this.curve)){
this.curve=new _122(this.curve[0],this.curve[1]);
}
};
_124.prototype=new _11c();
lang.extend(_124,{duration:350,repeat:0,rate:20,_percent:0,_startRepeatCount:0,_getStep:function(){
var _125=this._percent,_126=this.easing;
return _126?_126(_125):_125;
},_fire:function(evt,args){
var a=args||[];
if(this[evt]){
if(_11b.debugAtAllCosts){
this[evt].apply(this,a);
}else{
try{
this[evt].apply(this,a);
}
catch(e){
console.error("exception in animation handler for:",evt);
console.error(e);
}
}
}
return this;
},play:function(_127,_128){
var _129=this;
if(_129._delayTimer){
_129._clearTimer();
}
if(_128){
_129._stopTimer();
_129._active=_129._paused=false;
_129._percent=0;
}else{
if(_129._active&&!_129._paused){
return _129;
}
}
_129._fire("beforeBegin",[_129.node]);
var de=_127||_129.delay,_12a=lang.hitch(_129,"_play",_128);
if(de>0){
_129._delayTimer=setTimeout(_12a,de);
return _129;
}
_12a();
return _129;
},_play:function(_12b){
var _12c=this;
if(_12c._delayTimer){
_12c._clearTimer();
}
_12c._startTime=new Date().valueOf();
if(_12c._paused){
_12c._startTime-=_12c.duration*_12c._percent;
}
_12c._active=true;
_12c._paused=false;
var _12d=_12c.curve.getValue(_12c._getStep());
if(!_12c._percent){
if(!_12c._startRepeatCount){
_12c._startRepeatCount=_12c.repeat;
}
_12c._fire("onBegin",[_12d]);
}
_12c._fire("onPlay",[_12d]);
_12c._cycle();
return _12c;
},pause:function(){
var _12e=this;
if(_12e._delayTimer){
_12e._clearTimer();
}
_12e._stopTimer();
if(!_12e._active){
return _12e;
}
_12e._paused=true;
_12e._fire("onPause",[_12e.curve.getValue(_12e._getStep())]);
return _12e;
},gotoPercent:function(_12f,_130){
var _131=this;
_131._stopTimer();
_131._active=_131._paused=true;
_131._percent=_12f;
if(_130){
_131.play();
}
return _131;
},stop:function(_132){
var _133=this;
if(_133._delayTimer){
_133._clearTimer();
}
if(!_133._timer){
return _133;
}
_133._stopTimer();
if(_132){
_133._percent=1;
}
_133._fire("onStop",[_133.curve.getValue(_133._getStep())]);
_133._active=_133._paused=false;
return _133;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}
return "stopped";
},_cycle:function(){
var _134=this;
if(_134._active){
var curr=new Date().valueOf();
var step=_134.duration===0?1:(curr-_134._startTime)/(_134.duration);
if(step>=1){
step=1;
}
_134._percent=step;
if(_134.easing){
step=_134.easing(step);
}
_134._fire("onAnimate",[_134.curve.getValue(step)]);
if(_134._percent<1){
_134._startTimer();
}else{
_134._active=false;
if(_134.repeat>0){
_134.repeat--;
_134.play(null,true);
}else{
if(_134.repeat==-1){
_134.play(null,true);
}else{
if(_134._startRepeatCount){
_134.repeat=_134._startRepeatCount;
_134._startRepeatCount=0;
}
}
}
_134._percent=0;
_134._fire("onEnd",[_134.node]);
!_134.repeat&&_134._stopTimer();
}
}
return _134;
},_clearTimer:function(){
clearTimeout(this._delayTimer);
delete this._delayTimer;
}});
var ctr=0,_135=null,_136={run:function(){
}};
lang.extend(_124,{_startTimer:function(){
if(!this._timer){
this._timer=_11e.connect(_136,"run",this,"_cycle");
ctr++;
}
if(!_135){
_135=setInterval(lang.hitch(_136,"run"),this.rate);
}
},_stopTimer:function(){
if(this._timer){
_11e.disconnect(this._timer);
this._timer=null;
ctr--;
}
if(ctr<=0){
clearInterval(_135);
_135=null;
ctr=0;
}
}});
var _137=has("ie")?function(node){
var ns=node.style;
if(!ns.width.length&&_11f.get(node,"width")=="auto"){
ns.width="auto";
}
}:function(){
};
_121._fade=function(args){
args.node=dom.byId(args.node);
var _138=_120({properties:{}},args),_139=(_138.properties.opacity={});
_139.start=!("start" in _138)?function(){
return +_11f.get(_138.node,"opacity")||0;
}:_138.start;
_139.end=_138.end;
var anim=_121.animateProperty(_138);
_11e.connect(anim,"beforeBegin",lang.partial(_137,_138.node));
return anim;
};
_121.fadeIn=function(args){
return _121._fade(_120({end:1},args));
};
_121.fadeOut=function(args){
return _121._fade(_120({end:0},args));
};
_121._defaultEasing=function(n){
return 0.5+((Math.sin((n+1.5)*Math.PI))/2);
};
var _13a=function(_13b){
this._properties=_13b;
for(var p in _13b){
var prop=_13b[p];
if(prop.start instanceof _11d){
prop.tempColor=new _11d();
}
}
};
_13a.prototype.getValue=function(r){
var ret={};
for(var p in this._properties){
var prop=this._properties[p],_13c=prop.start;
if(_13c instanceof _11d){
ret[p]=_11d.blendColors(_13c,prop.end,r,prop.tempColor).toCss();
}else{
if(!lang.isArray(_13c)){
ret[p]=((prop.end-_13c)*r)+_13c+(p!="opacity"?prop.units||"px":0);
}
}
}
return ret;
};
_121.animateProperty=function(args){
var n=args.node=dom.byId(args.node);
if(!args.easing){
args.easing=dojo._defaultEasing;
}
var anim=new _124(args);
_11e.connect(anim,"beforeBegin",anim,function(){
var pm={};
for(var p in this.properties){
if(p=="width"||p=="height"){
this.node.display="block";
}
var prop=this.properties[p];
if(lang.isFunction(prop)){
prop=prop(n);
}
prop=pm[p]=_120({},(lang.isObject(prop)?prop:{end:prop}));
if(lang.isFunction(prop.start)){
prop.start=prop.start(n);
}
if(lang.isFunction(prop.end)){
prop.end=prop.end(n);
}
var _13d=(p.toLowerCase().indexOf("color")>=0);
function _13e(node,p){
var v={height:node.offsetHeight,width:node.offsetWidth}[p];
if(v!==undefined){
return v;
}
v=_11f.get(node,p);
return (p=="opacity")?+v:(_13d?v:parseFloat(v));
};
if(!("end" in prop)){
prop.end=_13e(n,p);
}else{
if(!("start" in prop)){
prop.start=_13e(n,p);
}
}
if(_13d){
prop.start=new _11d(prop.start);
prop.end=new _11d(prop.end);
}else{
prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);
}
}
this.curve=new _13a(pm);
});
_11e.connect(anim,"onAnimate",lang.hitch(_11f,"set",anim.node));
return anim;
};
_121.anim=function(node,_13f,_140,_141,_142,_143){
return _121.animateProperty({node:node,duration:_140||_124.prototype.duration,properties:_13f,easing:_141,onEnd:_142}).play(_143||0);
};
if(1){
_120(dojo,_121);
dojo._Animation=_124;
}
return _121;
});
},"dojo/dom-form":function(){
define(["./_base/lang","./dom","./io-query","./json"],function(lang,dom,ioq,json){
function _144(obj,name,_145){
if(_145===null){
return;
}
var val=obj[name];
if(typeof val=="string"){
obj[name]=[val,_145];
}else{
if(lang.isArray(val)){
val.push(_145);
}else{
obj[name]=_145;
}
}
};
var _146="file|submit|image|reset|button";
var form={fieldToObject:function fieldToObject(_147){
var ret=null;
_147=dom.byId(_147);
if(_147){
var _148=_147.name,type=(_147.type||"").toLowerCase();
if(_148&&type&&!_147.disabled){
if(type=="radio"||type=="checkbox"){
if(_147.checked){
ret=_147.value;
}
}else{
if(_147.multiple){
ret=[];
var _149=[_147.firstChild];
while(_149.length){
for(var node=_149.pop();node;node=node.nextSibling){
if(node.nodeType==1&&node.tagName.toLowerCase()=="option"){
if(node.selected){
ret.push(node.value);
}
}else{
if(node.nextSibling){
_149.push(node.nextSibling);
}
if(node.firstChild){
_149.push(node.firstChild);
}
break;
}
}
}
}else{
ret=_147.value;
}
}
}
}
return ret;
},toObject:function formToObject(_14a){
var ret={},_14b=dom.byId(_14a).elements;
for(var i=0,l=_14b.length;i<l;++i){
var item=_14b[i],_14c=item.name,type=(item.type||"").toLowerCase();
if(_14c&&type&&_146.indexOf(type)<0&&!item.disabled){
_144(ret,_14c,form.fieldToObject(item));
if(type=="image"){
ret[_14c+".x"]=ret[_14c+".y"]=ret[_14c].x=ret[_14c].y=0;
}
}
}
return ret;
},toQuery:function formToQuery(_14d){
return ioq.objectToQuery(form.toObject(_14d));
},toJson:function formToJson(_14e,_14f){
return json.stringify(form.toObject(_14e),null,_14f?4:0);
}};
return form;
});
},"dojo/promise/tracer":function(){
define(["../_base/lang","./Promise","../Evented"],function(lang,_150,_151){
"use strict";
var _152=new _151;
var emit=_152.emit;
_152.emit=null;
function _153(args){
setTimeout(function(){
emit.apply(_152,args);
},0);
};
_150.prototype.trace=function(){
var args=lang._toArray(arguments);
this.then(function(_154){
_153(["resolved",_154].concat(args));
},function(_155){
_153(["rejected",_155].concat(args));
},function(_156){
_153(["progress",_156].concat(args));
});
return this;
};
_150.prototype.traceRejected=function(){
var args=lang._toArray(arguments);
this.otherwise(function(_157){
_153(["rejected",_157].concat(args));
});
return this;
};
return _152;
});
},"dojo/errors/RequestError":function(){
define(["./create"],function(_158){
return _158("RequestError",function(_159,_15a){
this.response=_15a;
});
});
},"dojo/_base/html":function(){
define("dojo/_base/html",["./kernel","../dom","../dom-style","../dom-attr","../dom-prop","../dom-class","../dom-construct","../dom-geometry"],function(dojo,dom,_15b,attr,prop,cls,ctr,geom){
dojo.byId=dom.byId;
dojo.isDescendant=dom.isDescendant;
dojo.setSelectable=dom.setSelectable;
dojo.getAttr=attr.get;
dojo.setAttr=attr.set;
dojo.hasAttr=attr.has;
dojo.removeAttr=attr.remove;
dojo.getNodeProp=attr.getNodeProp;
dojo.attr=function(node,name,_15c){
if(arguments.length==2){
return attr[typeof name=="string"?"get":"set"](node,name);
}
return attr.set(node,name,_15c);
};
dojo.hasClass=cls.contains;
dojo.addClass=cls.add;
dojo.removeClass=cls.remove;
dojo.toggleClass=cls.toggle;
dojo.replaceClass=cls.replace;
dojo._toDom=dojo.toDom=ctr.toDom;
dojo.place=ctr.place;
dojo.create=ctr.create;
dojo.empty=function(node){
ctr.empty(node);
};
dojo._destroyElement=dojo.destroy=function(node){
ctr.destroy(node);
};
dojo._getPadExtents=dojo.getPadExtents=geom.getPadExtents;
dojo._getBorderExtents=dojo.getBorderExtents=geom.getBorderExtents;
dojo._getPadBorderExtents=dojo.getPadBorderExtents=geom.getPadBorderExtents;
dojo._getMarginExtents=dojo.getMarginExtents=geom.getMarginExtents;
dojo._getMarginSize=dojo.getMarginSize=geom.getMarginSize;
dojo._getMarginBox=dojo.getMarginBox=geom.getMarginBox;
dojo.setMarginBox=geom.setMarginBox;
dojo._getContentBox=dojo.getContentBox=geom.getContentBox;
dojo.setContentSize=geom.setContentSize;
dojo._isBodyLtr=dojo.isBodyLtr=geom.isBodyLtr;
dojo._docScroll=dojo.docScroll=geom.docScroll;
dojo._getIeDocumentElementOffset=dojo.getIeDocumentElementOffset=geom.getIeDocumentElementOffset;
dojo._fixIeBiDiScrollLeft=dojo.fixIeBiDiScrollLeft=geom.fixIeBiDiScrollLeft;
dojo.position=geom.position;
dojo.marginBox=function marginBox(node,box){
return box?geom.setMarginBox(node,box):geom.getMarginBox(node);
};
dojo.contentBox=function contentBox(node,box){
return box?geom.setContentSize(node,box):geom.getContentBox(node);
};
dojo.coords=function(node,_15d){
dojo.deprecated("dojo.coords()","Use dojo.position() or dojo.marginBox().");
node=dom.byId(node);
var s=_15b.getComputedStyle(node),mb=geom.getMarginBox(node,s);
var abs=geom.position(node,_15d);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
dojo.getProp=prop.get;
dojo.setProp=prop.set;
dojo.prop=function(node,name,_15e){
if(arguments.length==2){
return prop[typeof name=="string"?"get":"set"](node,name);
}
return prop.set(node,name,_15e);
};
dojo.getStyle=_15b.get;
dojo.setStyle=_15b.set;
dojo.getComputedStyle=_15b.getComputedStyle;
dojo.__toPixelValue=dojo.toPixelValue=_15b.toPixelValue;
dojo.style=function(node,name,_15f){
switch(arguments.length){
case 1:
return _15b.get(node);
case 2:
return _15b[typeof name=="string"?"get":"set"](node,name);
}
return _15b.set(node,name,_15f);
};
return dojo;
});
},"dojo/_base/kernel":function(){
define(["../has","./config","require","module"],function(has,_160,_161,_162){
var i,p,_163={},_164={},dojo={config:_160,global:this,dijit:_163,dojox:_164};
var _165={dojo:["dojo",dojo],dijit:["dijit",_163],dojox:["dojox",_164]},_166=(_161.map&&_161.map[_162.id.match(/[^\/]+/)[0]]),item;
for(p in _166){
if(_165[p]){
_165[p][0]=_166[p];
}else{
_165[p]=[_166[p],{}];
}
}
for(p in _165){
item=_165[p];
item[1]._scopeName=item[0];
if(!_160.noGlobals){
this[item[0]]=item[1];
}
}
dojo.scopeMap=_165;
dojo.baseUrl=dojo.config.baseUrl=_161.baseUrl;
dojo.isAsync=!1||_161.async;
dojo.locale=_160.locale;
var rev="$Rev$".match(/\d+/);
dojo.version={major:1,minor:8,patch:0,flag:"dev",revision:rev?+rev[0]:NaN,toString:function(){
var v=dojo.version;
return v.major+"."+v.minor+"."+v.patch+v.flag+" ("+v.revision+")";
}};
1||has.add("extend-dojo",1);
(Function("d","d.eval = function(){return d.global.eval ? d.global.eval(arguments[0]) : eval(arguments[0]);}"))(dojo);
if(0){
dojo.exit=function(_167){
quit(_167);
};
}else{
dojo.exit=function(){
};
}
1||has.add("dojo-guarantee-console",1);
if(1){
typeof console!="undefined"||(console={});
var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];
var tn;
i=0;
while((tn=cn[i++])){
if(!console[tn]){
(function(){
var tcn=tn+"";
console[tcn]=("log" in console)?function(){
var a=Array.apply({},arguments);
a.unshift(tcn+":");
console["log"](a.join(" "));
}:function(){
};
console[tcn]._fake=true;
})();
}
}
}
has.add("dojo-debug-messages",!!_160.isDebug);
dojo.deprecated=dojo.experimental=function(){
};
if(has("dojo-debug-messages")){
dojo.deprecated=function(_168,_169,_16a){
var _16b="DEPRECATED: "+_168;
if(_169){
_16b+=" "+_169;
}
if(_16a){
_16b+=" -- will be removed in version: "+_16a;
}
console.warn(_16b);
};
dojo.experimental=function(_16c,_16d){
var _16e="EXPERIMENTAL: "+_16c+" -- APIs subject to change without notice.";
if(_16d){
_16e+=" "+_16d;
}
console.warn(_16e);
};
}
1||has.add("dojo-modulePaths",1);
if(1){
if(_160.modulePaths){
dojo.deprecated("dojo.modulePaths","use paths configuration");
var _16f={};
for(p in _160.modulePaths){
_16f[p.replace(/\./g,"/")]=_160.modulePaths[p];
}
_161({paths:_16f});
}
}
1||has.add("dojo-moduleUrl",1);
if(1){
dojo.moduleUrl=function(_170,url){
dojo.deprecated("dojo.moduleUrl()","use require.toUrl","2.0");
var _171=null;
if(_170){
_171=_161.toUrl(_170.replace(/\./g,"/")+(url?("/"+url):"")+"/*.*").replace(/\/\*\.\*/,"")+(url?"":"/");
}
return _171;
};
}
dojo._hasResource={};
return dojo;
});
},"dojo/io-query":function(){
define(["./_base/lang"],function(lang){
var _172={};
return {objectToQuery:function objectToQuery(map){
var enc=encodeURIComponent,_173=[];
for(var name in map){
var _174=map[name];
if(_174!=_172[name]){
var _175=enc(name)+"=";
if(lang.isArray(_174)){
for(var i=0,l=_174.length;i<l;++i){
_173.push(_175+enc(_174[i]));
}
}else{
_173.push(_175+enc(_174));
}
}
}
return _173.join("&");
},queryToObject:function queryToObject(str){
var dec=decodeURIComponent,qp=str.split("&"),ret={},name,val;
for(var i=0,l=qp.length,item;i<l;++i){
item=qp[i];
if(item.length){
var s=item.indexOf("=");
if(s<0){
name=dec(item);
val="";
}else{
name=dec(item.slice(0,s));
val=dec(item.slice(s+1));
}
if(typeof ret[name]=="string"){
ret[name]=[ret[name]];
}
if(lang.isArray(ret[name])){
ret[name].push(val);
}else{
ret[name]=val;
}
}
}
return ret;
}};
});
},"dojo/_base/Deferred":function(){
define(["./kernel","../Deferred","../promise/Promise","../errors/CancelError","../has","./lang","../when"],function(dojo,_176,_177,_178,has,lang,when){
var _179=function(){
};
var _17a=Object.freeze||function(){
};
var _17b=dojo.Deferred=function(_17c){
var _17d,_17e,_17f,head,_180;
var _181=(this.promise=new _177());
function _182(_183){
if(_17e){
throw new Error("This deferred has already been resolved");
}
_17d=_183;
_17e=true;
_184();
};
function _184(){
var _185;
while(!_185&&_180){
var _186=_180;
_180=_180.next;
if((_185=(_186.progress==_179))){
_17e=false;
}
var func=(_17f?_186.error:_186.resolved);
if(has("config-useDeferredInstrumentation")){
if(_17f&&_176.instrumentRejected){
_176.instrumentRejected(_17d,!!func);
}
}
if(func){
try{
var _187=func(_17d);
if(_187&&typeof _187.then==="function"){
_187.then(lang.hitch(_186.deferred,"resolve"),lang.hitch(_186.deferred,"reject"),lang.hitch(_186.deferred,"progress"));
continue;
}
var _188=_185&&_187===undefined;
if(_185&&!_188){
_17f=_187 instanceof Error;
}
_186.deferred[_188&&_17f?"reject":"resolve"](_188?_17d:_187);
}
catch(e){
_186.deferred.reject(e);
}
}else{
if(_17f){
_186.deferred.reject(_17d);
}else{
_186.deferred.resolve(_17d);
}
}
}
};
this.resolve=this.callback=function(_189){
this.fired=0;
this.results=[_189,null];
_182(_189);
};
this.reject=this.errback=function(_18a){
_17f=true;
this.fired=1;
if(has("config-useDeferredInstrumentation")){
if(_176.instrumentRejected){
_176.instrumentRejected(_18a,!!_180);
}
}
_182(_18a);
this.results=[null,_18a];
};
this.progress=function(_18b){
var _18c=_180;
while(_18c){
var _18d=_18c.progress;
_18d&&_18d(_18b);
_18c=_18c.next;
}
};
this.addCallbacks=function(_18e,_18f){
this.then(_18e,_18f,_179);
return this;
};
_181.then=this.then=function(_190,_191,_192){
var _193=_192==_179?this:new _17b(_181.cancel);
var _194={resolved:_190,error:_191,progress:_192,deferred:_193};
if(_180){
head=head.next=_194;
}else{
_180=head=_194;
}
if(_17e){
_184();
}
return _193.promise;
};
var _195=this;
_181.cancel=this.cancel=function(){
if(!_17e){
var _196=_17c&&_17c(_195);
if(!_17e){
if(!(_196 instanceof Error)){
_196=new _178(_196);
}
_196.log=false;
_195.reject(_196);
}
}
};
_17a(_181);
};
lang.extend(_17b,{addCallback:function(_197){
return this.addCallbacks(lang.hitch.apply(dojo,arguments));
},addErrback:function(_198){
return this.addCallbacks(null,lang.hitch.apply(dojo,arguments));
},addBoth:function(_199){
var _19a=lang.hitch.apply(dojo,arguments);
return this.addCallbacks(_19a,_19a);
},fired:-1});
_17b.when=dojo.when=when;
return _17b;
});
},"dojo/NodeList-dom":function(){
define(["./_base/kernel","./query","./_base/array","./_base/lang","./dom-class","./dom-construct","./dom-geometry","./dom-attr","./dom-style"],function(dojo,_19b,_19c,lang,_19d,_19e,_19f,_1a0,_1a1){
var _1a2=function(a){
return a.length==1&&(typeof a[0]=="string");
};
var _1a3=function(node){
var p=node.parentNode;
if(p){
p.removeChild(node);
}
};
var _1a4=_19b.NodeList,awc=_1a4._adaptWithCondition,aafe=_1a4._adaptAsForEach,aam=_1a4._adaptAsMap;
function _1a5(_1a6){
return function(node,name,_1a7){
if(arguments.length==2){
return _1a6[typeof name=="string"?"get":"set"](node,name);
}
return _1a6.set(node,name,_1a7);
};
};
lang.extend(_1a4,{_normalize:function(_1a8,_1a9){
var _1aa=_1a8.parse===true;
if(typeof _1a8.template=="string"){
var _1ab=_1a8.templateFunc||(dojo.string&&dojo.string.substitute);
_1a8=_1ab?_1ab(_1a8.template,_1a8):_1a8;
}
var type=(typeof _1a8);
if(type=="string"||type=="number"){
_1a8=_19e.toDom(_1a8,(_1a9&&_1a9.ownerDocument));
if(_1a8.nodeType==11){
_1a8=lang._toArray(_1a8.childNodes);
}else{
_1a8=[_1a8];
}
}else{
if(!lang.isArrayLike(_1a8)){
_1a8=[_1a8];
}else{
if(!lang.isArray(_1a8)){
_1a8=lang._toArray(_1a8);
}
}
}
if(_1aa){
_1a8._runParse=true;
}
return _1a8;
},_cloneNode:function(node){
return node.cloneNode(true);
},_place:function(ary,_1ac,_1ad,_1ae){
if(_1ac.nodeType!=1&&_1ad=="only"){
return;
}
var _1af=_1ac,_1b0;
var _1b1=ary.length;
for(var i=_1b1-1;i>=0;i--){
var node=(_1ae?this._cloneNode(ary[i]):ary[i]);
if(ary._runParse&&dojo.parser&&dojo.parser.parse){
if(!_1b0){
_1b0=_1af.ownerDocument.createElement("div");
}
_1b0.appendChild(node);
dojo.parser.parse(_1b0);
node=_1b0.firstChild;
while(_1b0.firstChild){
_1b0.removeChild(_1b0.firstChild);
}
}
if(i==_1b1-1){
_19e.place(node,_1af,_1ad);
}else{
_1af.parentNode.insertBefore(node,_1af);
}
_1af=node;
}
},position:aam(_19f.position),attr:awc(_1a5(_1a0),_1a2),style:awc(_1a5(_1a1),_1a2),addClass:aafe(_19d.add),removeClass:aafe(_19d.remove),toggleClass:aafe(_19d.toggle),replaceClass:aafe(_19d.replace),empty:aafe(_19e.empty),removeAttr:aafe(_1a0.remove),marginBox:aam(_19f.getMarginBox),place:function(_1b2,_1b3){
var item=_19b(_1b2)[0];
return this.forEach(function(node){
_19e.place(node,item,_1b3);
});
},orphan:function(_1b4){
return (_1b4?_19b._filterResult(this,_1b4):this).forEach(_1a3);
},adopt:function(_1b5,_1b6){
return _19b(_1b5).place(this[0],_1b6)._stash(this);
},query:function(_1b7){
if(!_1b7){
return this;
}
var ret=new _1a4;
this.map(function(node){
_19b(_1b7,node).forEach(function(_1b8){
if(_1b8!==undefined){
ret.push(_1b8);
}
});
});
return ret._stash(this);
},filter:function(_1b9){
var a=arguments,_1ba=this,_1bb=0;
if(typeof _1b9=="string"){
_1ba=_19b._filterResult(this,a[0]);
if(a.length==1){
return _1ba._stash(this);
}
_1bb=1;
}
return this._wrap(_19c.filter(_1ba,a[_1bb],a[_1bb+1]),this);
},addContent:function(_1bc,_1bd){
_1bc=this._normalize(_1bc,this[0]);
for(var i=0,node;(node=this[i]);i++){
this._place(_1bc,node,_1bd,i>0);
}
return this;
}});
return _1a4;
});
},"dojo/query":function(){
define(["./_base/kernel","./has","./dom","./on","./_base/array","./_base/lang","./selector/_loader","./selector/_loader!default"],function(dojo,has,dom,on,_1be,lang,_1bf,_1c0){
"use strict";
has.add("array-extensible",function(){
return lang.delegate([],{length:1}).length==1&&!has("bug-for-in-skips-shadowed");
});
var ap=Array.prototype,aps=ap.slice,apc=ap.concat,_1c1=_1be.forEach;
var tnl=function(a,_1c2,_1c3){
var _1c4=new (_1c3||this._NodeListCtor||nl)(a);
return _1c2?_1c4._stash(_1c2):_1c4;
};
var _1c5=function(f,a,o){
a=[0].concat(aps.call(a,0));
o=o||dojo.global;
return function(node){
a[0]=node;
return f.apply(o,a);
};
};
var _1c6=function(f,o){
return function(){
this.forEach(_1c5(f,arguments,o));
return this;
};
};
var _1c7=function(f,o){
return function(){
return this.map(_1c5(f,arguments,o));
};
};
var _1c8=function(f,o){
return function(){
return this.filter(_1c5(f,arguments,o));
};
};
var _1c9=function(f,g,o){
return function(){
var a=arguments,body=_1c5(f,a,o);
if(g.call(o||dojo.global,a)){
return this.map(body);
}
this.forEach(body);
return this;
};
};
var _1ca=function(_1cb){
var _1cc=this instanceof nl&&has("array-extensible");
if(typeof _1cb=="number"){
_1cb=Array(_1cb);
}
var _1cd=(_1cb&&"length" in _1cb)?_1cb:arguments;
if(_1cc||!_1cd.sort){
var _1ce=_1cc?this:[],l=_1ce.length=_1cd.length;
for(var i=0;i<l;i++){
_1ce[i]=_1cd[i];
}
if(_1cc){
return _1ce;
}
_1cd=_1ce;
}
lang._mixin(_1cd,nlp);
_1cd._NodeListCtor=function(_1cf){
return nl(_1cf);
};
return _1cd;
};
var nl=_1ca,nlp=nl.prototype=has("array-extensible")?[]:{};
nl._wrap=nlp._wrap=tnl;
nl._adaptAsMap=_1c7;
nl._adaptAsForEach=_1c6;
nl._adaptAsFilter=_1c8;
nl._adaptWithCondition=_1c9;
_1c1(["slice","splice"],function(name){
var f=ap[name];
nlp[name]=function(){
return this._wrap(f.apply(this,arguments),name=="slice"?this:null);
};
});
_1c1(["indexOf","lastIndexOf","every","some"],function(name){
var f=_1be[name];
nlp[name]=function(){
return f.apply(dojo,[this].concat(aps.call(arguments,0)));
};
});
lang.extend(_1ca,{constructor:nl,_NodeListCtor:nl,toString:function(){
return this.join(",");
},_stash:function(_1d0){
this._parent=_1d0;
return this;
},on:function(_1d1,_1d2){
var _1d3=this.map(function(node){
return on(node,_1d1,_1d2);
});
_1d3.remove=function(){
for(var i=0;i<_1d3.length;i++){
_1d3[i].remove();
}
};
return _1d3;
},end:function(){
if(this._parent){
return this._parent;
}else{
return new this._NodeListCtor(0);
}
},concat:function(item){
var t=aps.call(this,0),m=_1be.map(arguments,function(a){
return aps.call(a,0);
});
return this._wrap(apc.apply(t,m),this);
},map:function(func,obj){
return this._wrap(_1be.map(this,func,obj),this);
},forEach:function(_1d4,_1d5){
_1c1(this,_1d4,_1d5);
return this;
},filter:function(_1d6){
var a=arguments,_1d7=this,_1d8=0;
if(typeof _1d6=="string"){
_1d7=_1d9._filterResult(this,a[0]);
if(a.length==1){
return _1d7._stash(this);
}
_1d8=1;
}
return this._wrap(_1be.filter(_1d7,a[_1d8],a[_1d8+1]),this);
},instantiate:function(_1da,_1db){
var c=lang.isFunction(_1da)?_1da:lang.getObject(_1da);
_1db=_1db||{};
return this.forEach(function(node){
new c(_1db,node);
});
},at:function(){
var t=new this._NodeListCtor(0);
_1c1(arguments,function(i){
if(i<0){
i=this.length+i;
}
if(this[i]){
t.push(this[i]);
}
},this);
return t._stash(this);
}});
function _1dc(_1dd,_1de){
var _1df=function(_1e0,root){
if(typeof root=="string"){
root=dom.byId(root);
if(!root){
return new _1de([]);
}
}
var _1e1=typeof _1e0=="string"?_1dd(_1e0,root):_1e0?_1e0.orphan?_1e0:[_1e0]:[];
if(_1e1.orphan){
return _1e1;
}
return new _1de(_1e1);
};
_1df.matches=_1dd.match||function(node,_1e2,root){
return _1df.filter([node],_1e2,root).length>0;
};
_1df.filter=_1dd.filter||function(_1e3,_1e4,root){
return _1df(_1e4,root).filter(function(node){
return _1be.indexOf(_1e3,node)>-1;
});
};
if(typeof _1dd!="function"){
var _1e5=_1dd.search;
_1dd=function(_1e6,root){
return _1e5(root||document,_1e6);
};
}
return _1df;
};
var _1d9=_1dc(_1c0,_1ca);
dojo.query=_1dc(_1c0,function(_1e7){
return _1ca(_1e7);
});
_1d9.load=function(id,_1e8,_1e9){
_1bf.load(id,_1e8,function(_1ea){
_1e9(_1dc(_1ea,_1ca));
});
};
dojo._filterQueryResult=_1d9._filterResult=function(_1eb,_1ec,root){
return new _1ca(_1d9.filter(_1eb,_1ec,root));
};
dojo.NodeList=_1d9.NodeList=_1ca;
return _1d9;
});
},"dojo/has":function(){
define(["require","module"],function(_1ed,_1ee){
var has=_1ed.has||function(){
};
if(!1){
var _1ef=typeof window!="undefined"&&typeof location!="undefined"&&typeof document!="undefined"&&window.location==location&&window.document==document,_1f0=this,doc=_1ef&&document,_1f1=doc&&doc.createElement("DiV"),_1f2=(_1ee.config&&_1ee.config())||{};
has=function(name){
return typeof _1f2[name]=="function"?(_1f2[name]=_1f2[name](_1f0,doc,_1f1)):_1f2[name];
};
has.cache=_1f2;
has.add=function(name,test,now,_1f3){
(typeof _1f2[name]=="undefined"||_1f3)&&(_1f2[name]=test);
return now&&has(name);
};
1||has.add("host-browser",_1ef);
1||has.add("dom",_1ef);
1||has.add("dojo-dom-ready-api",1);
1||has.add("dojo-sniff",1);
}
if(1){
has.add("dom-addeventlistener",!!document.addEventListener);
has.add("touch","ontouchstart" in document);
has.add("device-width",screen.availWidth||innerWidth);
var form=document.createElement("form");
has.add("dom-attributes-explicit",form.attributes.length==0);
has.add("dom-attributes-specified-flag",form.attributes.length>0&&form.attributes.length<40);
}
has.clearElement=function(_1f4){
_1f4.innerHTML="";
return _1f4;
};
has.normalize=function(id,_1f5){
var _1f6=id.match(/[\?:]|[^:\?]*/g),i=0,get=function(skip){
var term=_1f6[i++];
if(term==":"){
return 0;
}else{
if(_1f6[i++]=="?"){
if(!skip&&has(term)){
return get();
}else{
get(true);
return get(skip);
}
}
return term||0;
}
};
id=get();
return id&&_1f5(id);
};
has.load=function(id,_1f7,_1f8){
if(id){
_1f7([id],_1f8);
}else{
_1f8();
}
};
return has;
});
},"dojo/_base/loader":function(){
define(["./kernel","../has","require","module","./json","./lang","./array"],function(dojo,has,_1f9,_1fa,json,lang,_1fb){
if(!1){
console.error("cannot load the Dojo v1.x loader with a foreign loader");
return 0;
}
1||has.add("dojo-fast-sync-require",1);
var _1fc=function(id){
return {src:_1fa.id,id:id};
},_1fd=function(name){
return name.replace(/\./g,"/");
},_1fe=/\/\/>>built/,_1ff=[],_200=[],_201=function(mid,_202,_203){
_1ff.push(_203);
_1fb.forEach(mid.split(","),function(mid){
var _204=_205(mid,_202.module);
_200.push(_204);
_206(_204);
});
_207();
},_207=(1?function(){
var _208,mid;
for(mid in _209){
_208=_209[mid];
if(_208.noReqPluginCheck===undefined){
_208.noReqPluginCheck=/loadInit\!/.test(mid)||/require\!/.test(mid)?1:0;
}
if(!_208.executed&&!_208.noReqPluginCheck&&_208.injected==_20a){
return;
}
}
_20b(function(){
var _20c=_1ff;
_1ff=[];
_1fb.forEach(_20c,function(cb){
cb(1);
});
});
}:(function(){
var _20d,_20e=function(m){
_20d[m.mid]=1;
for(var t,_20f,deps=m.deps||[],i=0;i<deps.length;i++){
_20f=deps[i];
if(!(t=_20d[_20f.mid])){
if(t===0||!_20e(_20f)){
_20d[m.mid]=0;
return false;
}
}
}
return true;
};
return function(){
var _210,mid;
_20d={};
for(mid in _209){
_210=_209[mid];
if(_210.executed||_210.noReqPluginCheck){
_20d[mid]=1;
}else{
if(_210.noReqPluginCheck!==0){
_210.noReqPluginCheck=/loadInit\!/.test(mid)||/require\!/.test(mid)?1:0;
}
if(_210.noReqPluginCheck){
_20d[mid]=1;
}else{
if(_210.injected!==_23c){
_20d[mid]=0;
}
}
}
}
for(var t,i=0,end=_200.length;i<end;i++){
_210=_200[i];
if(!(t=_20d[_210.mid])){
if(t===0||!_20e(_210)){
return;
}
}
}
_20b(function(){
var _211=_1ff;
_1ff=[];
_1fb.forEach(_211,function(cb){
cb(1);
});
});
};
})()),_212=function(mid,_213,_214){
_213([mid],function(_215){
_213(_215.names,function(){
for(var _216="",args=[],i=0;i<arguments.length;i++){
_216+="var "+_215.names[i]+"= arguments["+i+"]; ";
args.push(arguments[i]);
}
eval(_216);
var _217=_213.module,_218=[],_219,_21a={provide:function(_21b){
_21b=_1fd(_21b);
var _21c=_205(_21b,_217);
if(_21c!==_217){
_242(_21c);
}
},require:function(_21d,_21e){
_21d=_1fd(_21d);
_21e&&(_205(_21d,_217).result=_23d);
_218.push(_21d);
},requireLocalization:function(_21f,_220,_221){
if(!_219){
_219=["dojo/i18n"];
}
_221=(_221||dojo.locale).toLowerCase();
_21f=_1fd(_21f)+"/nls/"+(/root/i.test(_221)?"":_221+"/")+_1fd(_220);
if(_205(_21f,_217).isXd){
_219.push("dojo/i18n!"+_21f);
}
},loadInit:function(f){
f();
}},hold={},p;
try{
for(p in _21a){
hold[p]=dojo[p];
dojo[p]=_21a[p];
}
_215.def.apply(null,args);
}
catch(e){
_222("error",[_1fc("failedDojoLoadInit"),e]);
}
finally{
for(p in _21a){
dojo[p]=hold[p];
}
}
if(_219){
_218=_218.concat(_219);
}
if(_218.length){
_201(_218.join(","),_213,_214);
}else{
_214();
}
});
});
},_223=function(text,_224,_225){
var _226=/\(|\)/g,_227=1,_228;
_226.lastIndex=_224;
while((_228=_226.exec(text))){
if(_228[0]==")"){
_227-=1;
}else{
_227+=1;
}
if(_227==0){
break;
}
}
if(_227!=0){
throw "unmatched paren around character "+_226.lastIndex+" in: "+text;
}
return [dojo.trim(text.substring(_225,_226.lastIndex))+";\n",_226.lastIndex];
},_229=/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,_22a=/(^|\s)dojo\.(loadInit|require|provide|requireLocalization|requireIf|requireAfterIf|platformRequire)\s*\(/mg,_22b=/(^|\s)(require|define)\s*\(/m,_22c=function(text,_22d){
var _22e,_22f,_230,_231,_232=[],_233=[],_234=[];
_22d=_22d||text.replace(_229,function(_235){
_22a.lastIndex=_22b.lastIndex=0;
return (_22a.test(_235)||_22b.test(_235))?"":_235;
});
while((_22e=_22a.exec(_22d))){
_22f=_22a.lastIndex;
_230=_22f-_22e[0].length;
_231=_223(_22d,_22f,_230);
if(_22e[2]=="loadInit"){
_232.push(_231[0]);
}else{
_233.push(_231[0]);
}
_22a.lastIndex=_231[1];
}
_234=_232.concat(_233);
if(_234.length||!_22b.test(_22d)){
return [text.replace(/(^|\s)dojo\.loadInit\s*\(/g,"\n0 && dojo.loadInit("),_234.join(""),_234];
}else{
return 0;
}
},_236=function(_237,text){
var _238,id,_239=[],_23a=[];
if(_1fe.test(text)||!(_238=_22c(text))){
return 0;
}
id=_237.mid+"-*loadInit";
for(var p in _205("dojo",_237).result.scopeMap){
_239.push(p);
_23a.push("\""+p+"\"");
}
return "// xdomain rewrite of "+_237.mid+"\n"+"define('"+id+"',{\n"+"\tnames:"+dojo.toJson(_239)+",\n"+"\tdef:function("+_239.join(",")+"){"+_238[1]+"}"+"});\n\n"+"define("+dojo.toJson(_239.concat(["dojo/loadInit!"+id]))+", function("+_239.join(",")+"){\n"+_238[0]+"});";
},_23b=_1f9.initSyncLoader(_201,_207,_236),sync=_23b.sync,_20a=_23b.requested,_23c=_23b.arrived,_23d=_23b.nonmodule,_23e=_23b.executing,_23f=_23b.executed,_240=_23b.syncExecStack,_209=_23b.modules,_241=_23b.execQ,_205=_23b.getModule,_206=_23b.injectModule,_242=_23b.setArrived,_222=_23b.signal,_243=_23b.finishExec,_244=_23b.execModule,_245=_23b.getLegacyMode,_20b=_23b.guardCheckComplete;
_201=_23b.dojoRequirePlugin;
dojo.provide=function(mid){
var _246=_240[0],_247=lang.mixin(_205(_1fd(mid),_1f9.module),{executed:_23e,result:lang.getObject(mid,true)});
_242(_247);
if(_246){
(_246.provides||(_246.provides=[])).push(function(){
_247.result=lang.getObject(mid);
delete _247.provides;
_247.executed!==_23f&&_243(_247);
});
}
return _247.result;
};
has.add("config-publishRequireResult",1,0,0);
dojo.require=function(_248,_249){
function _24a(mid,_24b){
var _24c=_205(_1fd(mid),_1f9.module);
if(_240.length&&_240[0].finish){
_240[0].finish.push(mid);
return undefined;
}
if(_24c.executed){
return _24c.result;
}
_24b&&(_24c.result=_23d);
var _24d=_245();
_206(_24c);
_24d=_245();
if(_24c.executed!==_23f&&_24c.injected===_23c){
_23b.guardCheckComplete(function(){
_244(_24c);
});
}
if(_24c.executed){
return _24c.result;
}
if(_24d==sync){
if(_24c.cjs){
_241.unshift(_24c);
}else{
_240.length&&(_240[0].finish=[mid]);
}
}else{
_241.push(_24c);
}
return undefined;
};
var _24e=_24a(_248,_249);
if(has("config-publishRequireResult")&&!lang.exists(_248)&&_24e!==undefined){
lang.setObject(_248,_24e);
}
return _24e;
};
dojo.loadInit=function(f){
f();
};
dojo.registerModulePath=function(_24f,_250){
var _251={};
_251[_24f.replace(/\./g,"/")]=_250;
_1f9({paths:_251});
};
dojo.platformRequire=function(_252){
var _253=(_252.common||[]).concat(_252[dojo._name]||_252["default"]||[]),temp;
while(_253.length){
if(lang.isArray(temp=_253.shift())){
dojo.require.apply(dojo,temp);
}else{
dojo.require(temp);
}
}
};
dojo.requireIf=dojo.requireAfterIf=function(_254,_255,_256){
if(_254){
dojo.require(_255,_256);
}
};
dojo.requireLocalization=function(_257,_258,_259){
_1f9(["../i18n"],function(i18n){
i18n.getLocalization(_257,_258,_259);
});
};
return {extractLegacyApiApplications:_22c,require:_201,loadInit:_212};
});
},"dojo/json":function(){
define(["./has"],function(has){
"use strict";
var _25a=typeof JSON!="undefined";
has.add("json-parse",_25a);
has.add("json-stringify",_25a&&JSON.stringify({a:0},function(k,v){
return v||1;
})=="{\"a\":1}");
if(has("json-stringify")){
return JSON;
}else{
var _25b=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
return {parse:has("json-parse")?JSON.parse:function(str,_25c){
if(_25c&&!/^([\s\[\{]*(?:"(?:\\.|[^"])+"|-?\d[\d\.]*(?:[Ee][+-]?\d+)?|null|true|false|)[\s\]\}]*(?:,|:|$))+$/.test(str)){
throw new SyntaxError("Invalid characters in JSON");
}
return eval("("+str+")");
},stringify:function(_25d,_25e,_25f){
var _260;
if(typeof _25e=="string"){
_25f=_25e;
_25e=null;
}
function _261(it,_262,key){
if(_25e){
it=_25e(key,it);
}
var val,_263=typeof it;
if(_263=="number"){
return isFinite(it)?it+"":"null";
}
if(_263=="boolean"){
return it+"";
}
if(it===null){
return "null";
}
if(typeof it=="string"){
return _25b(it);
}
if(_263=="function"||_263=="undefined"){
return _260;
}
if(typeof it.toJSON=="function"){
return _261(it.toJSON(key),_262,key);
}
if(it instanceof Date){
return "\"{FullYear}-{Month+}-{Date}T{Hours}:{Minutes}:{Seconds}Z\"".replace(/\{(\w+)(\+)?\}/g,function(t,prop,plus){
var num=it["getUTC"+prop]()+(plus?1:0);
return num<10?"0"+num:num;
});
}
if(it.valueOf()!==it){
return _261(it.valueOf(),_262,key);
}
var _264=_25f?(_262+_25f):"";
var sep=_25f?" ":"";
var _265=_25f?"\n":"";
if(it instanceof Array){
var itl=it.length,res=[];
for(key=0;key<itl;key++){
var obj=it[key];
val=_261(obj,_264,key);
if(typeof val!="string"){
val="null";
}
res.push(_265+_264+val);
}
return "["+res.join(",")+_265+_262+"]";
}
var _266=[];
for(key in it){
var _267;
if(it.hasOwnProperty(key)){
if(typeof key=="number"){
_267="\""+key+"\"";
}else{
if(typeof key=="string"){
_267=_25b(key);
}else{
continue;
}
}
val=_261(it[key],_264,key);
if(typeof val!="string"){
continue;
}
_266.push(_265+_264+_267+":"+sep+val);
}
}
return "{"+_266.join(",")+_265+_262+"}";
};
return _261(_25d,"","");
}};
}
});
},"dojo/_base/declare":function(){
define(["./kernel","../has","./lang"],function(dojo,has,lang){
var mix=lang.mixin,op=Object.prototype,opts=op.toString,xtor=new Function,_268=0,_269="constructor";
function err(msg,cls){
throw new Error("declare"+(cls?" "+cls:"")+": "+msg);
};
function _26a(_26b,_26c){
var _26d=[],_26e=[{cls:0,refs:[]}],_26f={},_270=1,l=_26b.length,i=0,j,lin,base,top,_271,rec,name,refs;
for(;i<l;++i){
base=_26b[i];
if(!base){
err("mixin #"+i+" is unknown. Did you use dojo.require to pull it in?",_26c);
}else{
if(opts.call(base)!="[object Function]"){
err("mixin #"+i+" is not a callable constructor.",_26c);
}
}
lin=base._meta?base._meta.bases:[base];
top=0;
for(j=lin.length-1;j>=0;--j){
_271=lin[j].prototype;
if(!_271.hasOwnProperty("declaredClass")){
_271.declaredClass="uniqName_"+(_268++);
}
name=_271.declaredClass;
if(!_26f.hasOwnProperty(name)){
_26f[name]={count:0,refs:[],cls:lin[j]};
++_270;
}
rec=_26f[name];
if(top&&top!==rec){
rec.refs.push(top);
++top.count;
}
top=rec;
}
++top.count;
_26e[0].refs.push(top);
}
while(_26e.length){
top=_26e.pop();
_26d.push(top.cls);
--_270;
while(refs=top.refs,refs.length==1){
top=refs[0];
if(!top||--top.count){
top=0;
break;
}
_26d.push(top.cls);
--_270;
}
if(top){
for(i=0,l=refs.length;i<l;++i){
top=refs[i];
if(!--top.count){
_26e.push(top);
}
}
}
}
if(_270){
err("can't build consistent linearization",_26c);
}
base=_26b[0];
_26d[0]=base?base._meta&&base===_26d[_26d.length-base._meta.bases.length]?base._meta.bases.length:1:0;
return _26d;
};
function _272(args,a,f){
var name,_273,_274,_275,meta,base,_276,opf,pos,_277=this._inherited=this._inherited||{};
if(typeof args=="string"){
name=args;
args=a;
a=f;
}
f=0;
_275=args.callee;
name=name||_275.nom;
if(!name){
err("can't deduce a name to call inherited()",this.declaredClass);
}
meta=this.constructor._meta;
_274=meta.bases;
pos=_277.p;
if(name!=_269){
if(_277.c!==_275){
pos=0;
base=_274[0];
meta=base._meta;
if(meta.hidden[name]!==_275){
_273=meta.chains;
if(_273&&typeof _273[name]=="string"){
err("calling chained method with inherited: "+name,this.declaredClass);
}
do{
meta=base._meta;
_276=base.prototype;
if(meta&&(_276[name]===_275&&_276.hasOwnProperty(name)||meta.hidden[name]===_275)){
break;
}
}while(base=_274[++pos]);
pos=base?pos:-1;
}
}
base=_274[++pos];
if(base){
_276=base.prototype;
if(base._meta&&_276.hasOwnProperty(name)){
f=_276[name];
}else{
opf=op[name];
do{
_276=base.prototype;
f=_276[name];
if(f&&(base._meta?_276.hasOwnProperty(name):f!==opf)){
break;
}
}while(base=_274[++pos]);
}
}
f=base&&f||op[name];
}else{
if(_277.c!==_275){
pos=0;
meta=_274[0]._meta;
if(meta&&meta.ctor!==_275){
_273=meta.chains;
if(!_273||_273.constructor!=="manual"){
err("calling chained constructor with inherited",this.declaredClass);
}
while(base=_274[++pos]){
meta=base._meta;
if(meta&&meta.ctor===_275){
break;
}
}
pos=base?pos:-1;
}
}
while(base=_274[++pos]){
meta=base._meta;
f=meta?meta.ctor:base;
if(f){
break;
}
}
f=base&&f;
}
_277.c=f;
_277.p=pos;
if(f){
return a===true?f:f.apply(this,a||args);
}
};
function _278(name,args){
if(typeof name=="string"){
return this.__inherited(name,args,true);
}
return this.__inherited(name,true);
};
function _279(args,a1,a2){
var f=this.getInherited(args,a1);
if(f){
return f.apply(this,a2||a1||args);
}
};
var _27a=dojo.config.isDebug?_279:_272;
function _27b(cls){
var _27c=this.constructor._meta.bases;
for(var i=0,l=_27c.length;i<l;++i){
if(_27c[i]===cls){
return true;
}
}
return this instanceof cls;
};
function _27d(_27e,_27f){
for(var name in _27f){
if(name!=_269&&_27f.hasOwnProperty(name)){
_27e[name]=_27f[name];
}
}
if(has("bug-for-in-skips-shadowed")){
for(var _280=lang._extraNames,i=_280.length;i;){
name=_280[--i];
if(name!=_269&&_27f.hasOwnProperty(name)){
_27e[name]=_27f[name];
}
}
}
};
function _281(_282,_283){
var name,t;
for(name in _283){
t=_283[name];
if((t!==op[name]||!(name in op))&&name!=_269){
if(opts.call(t)=="[object Function]"){
t.nom=name;
}
_282[name]=t;
}
}
if(has("bug-for-in-skips-shadowed")){
for(var _284=lang._extraNames,i=_284.length;i;){
name=_284[--i];
t=_283[name];
if((t!==op[name]||!(name in op))&&name!=_269){
if(opts.call(t)=="[object Function]"){
t.nom=name;
}
_282[name]=t;
}
}
}
return _282;
};
function _285(_286){
_287.safeMixin(this.prototype,_286);
return this;
};
function _288(_289){
return _287([this].concat(_289));
};
function _28a(_28b,_28c){
return function(){
var a=arguments,args=a,a0=a[0],f,i,m,l=_28b.length,_28d;
if(!(this instanceof a.callee)){
return _28e(a);
}
if(_28c&&(a0&&a0.preamble||this.preamble)){
_28d=new Array(_28b.length);
_28d[0]=a;
for(i=0;;){
a0=a[0];
if(a0){
f=a0.preamble;
if(f){
a=f.apply(this,a)||a;
}
}
f=_28b[i].prototype;
f=f.hasOwnProperty("preamble")&&f.preamble;
if(f){
a=f.apply(this,a)||a;
}
if(++i==l){
break;
}
_28d[i]=a;
}
}
for(i=l-1;i>=0;--i){
f=_28b[i];
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,_28d?_28d[i]:a);
}
}
f=this.postscript;
if(f){
f.apply(this,args);
}
};
};
function _28f(ctor,_290){
return function(){
var a=arguments,t=a,a0=a[0],f;
if(!(this instanceof a.callee)){
return _28e(a);
}
if(_290){
if(a0){
f=a0.preamble;
if(f){
t=f.apply(this,t)||t;
}
}
f=this.preamble;
if(f){
f.apply(this,t);
}
}
if(ctor){
ctor.apply(this,a);
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _291(_292){
return function(){
var a=arguments,i=0,f,m;
if(!(this instanceof a.callee)){
return _28e(a);
}
for(;f=_292[i];++i){
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,a);
break;
}
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _293(name,_294,_295){
return function(){
var b,m,f,i=0,step=1;
if(_295){
i=_294.length-1;
step=-1;
}
for(;b=_294[i];i+=step){
m=b._meta;
f=(m?m.hidden:b.prototype)[name];
if(f){
f.apply(this,arguments);
}
}
};
};
function _296(ctor){
xtor.prototype=ctor.prototype;
var t=new xtor;
xtor.prototype=null;
return t;
};
function _28e(args){
var ctor=args.callee,t=_296(ctor);
ctor.apply(t,args);
return t;
};
function _287(_297,_298,_299){
if(typeof _297!="string"){
_299=_298;
_298=_297;
_297="";
}
_299=_299||{};
var _29a,i,t,ctor,name,_29b,_29c,_29d=1,_29e=_298;
if(opts.call(_298)=="[object Array]"){
_29b=_26a(_298,_297);
t=_29b[0];
_29d=_29b.length-t;
_298=_29b[_29d];
}else{
_29b=[0];
if(_298){
if(opts.call(_298)=="[object Function]"){
t=_298._meta;
_29b=_29b.concat(t?t.bases:_298);
}else{
err("base class is not a callable constructor.",_297);
}
}else{
if(_298!==null){
err("unknown base class. Did you use dojo.require to pull it in?",_297);
}
}
}
if(_298){
for(i=_29d-1;;--i){
_29a=_296(_298);
if(!i){
break;
}
t=_29b[i];
(t._meta?_27d:mix)(_29a,t.prototype);
ctor=new Function;
ctor.superclass=_298;
ctor.prototype=_29a;
_298=_29a.constructor=ctor;
}
}else{
_29a={};
}
_287.safeMixin(_29a,_299);
t=_299.constructor;
if(t!==op.constructor){
t.nom=_269;
_29a.constructor=t;
}
for(i=_29d-1;i;--i){
t=_29b[i]._meta;
if(t&&t.chains){
_29c=mix(_29c||{},t.chains);
}
}
if(_29a["-chains-"]){
_29c=mix(_29c||{},_29a["-chains-"]);
}
t=!_29c||!_29c.hasOwnProperty(_269);
_29b[0]=ctor=(_29c&&_29c.constructor==="manual")?_291(_29b):(_29b.length==1?_28f(_299.constructor,t):_28a(_29b,t));
ctor._meta={bases:_29b,hidden:_299,chains:_29c,parents:_29e,ctor:_299.constructor};
ctor.superclass=_298&&_298.prototype;
ctor.extend=_285;
ctor.createSubclass=_288;
ctor.prototype=_29a;
_29a.constructor=ctor;
_29a.getInherited=_278;
_29a.isInstanceOf=_27b;
_29a.inherited=_27a;
_29a.__inherited=_272;
if(_297){
_29a.declaredClass=_297;
lang.setObject(_297,ctor);
}
if(_29c){
for(name in _29c){
if(_29a[name]&&typeof _29c[name]=="string"&&name!=_269){
t=_29a[name]=_293(name,_29b,_29c[name]==="after");
t.nom=name;
}
}
}
return ctor;
};
dojo.safeMixin=_287.safeMixin=_281;
dojo.declare=_287;
return _287;
});
},"dojo/dom":function(){
define(["./sniff","./_base/lang","./_base/window"],function(has,lang,win){
if(has("ie")<=7){
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
}
var dom={};
if(has("ie")){
dom.byId=function(id,doc){
if(typeof id!="string"){
return id;
}
var _29f=doc||win.doc,te=id&&_29f.getElementById(id);
if(te&&(te.attributes.id.value==id||te.id==id)){
return te;
}else{
var eles=_29f.all[id];
if(!eles||eles.nodeName){
eles=[eles];
}
var i=0;
while((te=eles[i++])){
if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){
return te;
}
}
}
};
}else{
dom.byId=function(id,doc){
return ((typeof id=="string")?(doc||win.doc).getElementById(id):id)||null;
};
}
dom.isDescendant=function(node,_2a0){
try{
node=dom.byId(node);
_2a0=dom.byId(_2a0);
while(node){
if(node==_2a0){
return true;
}
node=node.parentNode;
}
}
catch(e){
}
return false;
};
dom.setSelectable=function(node,_2a1){
node=dom.byId(node);
if(has("mozilla")){
node.style.MozUserSelect=_2a1?"":"none";
}else{
if(has("khtml")||has("webkit")){
node.style.KhtmlUserSelect=_2a1?"auto":"none";
}else{
if(has("ie")){
var v=(node.unselectable=_2a1?"":"on"),cs=node.getElementsByTagName("*"),i=0,l=cs.length;
for(;i<l;++i){
cs.item(i).unselectable=v;
}
}
}
}
};
return dom;
});
},"dojo/_base/browser":function(){
if(require.has){
require.has.add("config-selectorEngine","acme");
}
define(["../ready","./kernel","./connect","./unload","./window","./event","./html","./NodeList","../query","./xhr","./fx"],function(dojo){
return dojo;
});
},"dojo/selector/acme":function(){
define(["../dom","../sniff","../_base/array","../_base/lang","../_base/window"],function(dom,has,_2a2,lang,win){
var trim=lang.trim;
var each=_2a2.forEach;
var _2a3=function(){
return win.doc;
};
var _2a4=(_2a3().compatMode)=="BackCompat";
var _2a5=">~+";
var _2a6=false;
var _2a7=function(){
return true;
};
var _2a8=function(_2a9){
if(_2a5.indexOf(_2a9.slice(-1))>=0){
_2a9+=" * ";
}else{
_2a9+=" ";
}
var ts=function(s,e){
return trim(_2a9.slice(s,e));
};
var _2aa=[];
var _2ab=-1,_2ac=-1,_2ad=-1,_2ae=-1,_2af=-1,inId=-1,_2b0=-1,_2b1,lc="",cc="",_2b2;
var x=0,ql=_2a9.length,_2b3=null,_2b4=null;
var _2b5=function(){
if(_2b0>=0){
var tv=(_2b0==x)?null:ts(_2b0,x);
_2b3[(_2a5.indexOf(tv)<0)?"tag":"oper"]=tv;
_2b0=-1;
}
};
var _2b6=function(){
if(inId>=0){
_2b3.id=ts(inId,x).replace(/\\/g,"");
inId=-1;
}
};
var _2b7=function(){
if(_2af>=0){
_2b3.classes.push(ts(_2af+1,x).replace(/\\/g,""));
_2af=-1;
}
};
var _2b8=function(){
_2b6();
_2b5();
_2b7();
};
var _2b9=function(){
_2b8();
if(_2ae>=0){
_2b3.pseudos.push({name:ts(_2ae+1,x)});
}
_2b3.loops=(_2b3.pseudos.length||_2b3.attrs.length||_2b3.classes.length);
_2b3.oquery=_2b3.query=ts(_2b2,x);
_2b3.otag=_2b3.tag=(_2b3["oper"])?null:(_2b3.tag||"*");
if(_2b3.tag){
_2b3.tag=_2b3.tag.toUpperCase();
}
if(_2aa.length&&(_2aa[_2aa.length-1].oper)){
_2b3.infixOper=_2aa.pop();
_2b3.query=_2b3.infixOper.query+" "+_2b3.query;
}
_2aa.push(_2b3);
_2b3=null;
};
for(;lc=cc,cc=_2a9.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_2b3){
_2b2=x;
_2b3={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return _2a6?this.otag:this.tag;
}};
_2b0=x;
}
if(_2b1){
if(cc==_2b1){
_2b1=null;
}
continue;
}else{
if(cc=="'"||cc=="\""){
_2b1=cc;
continue;
}
}
if(_2ab>=0){
if(cc=="]"){
if(!_2b4.attr){
_2b4.attr=ts(_2ab+1,x);
}else{
_2b4.matchFor=ts((_2ad||_2ab+1),x);
}
var cmf=_2b4.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_2b4.matchFor=cmf.slice(1,-1);
}
}
if(_2b4.matchFor){
_2b4.matchFor=_2b4.matchFor.replace(/\\/g,"");
}
_2b3.attrs.push(_2b4);
_2b4=null;
_2ab=_2ad=-1;
}else{
if(cc=="="){
var _2ba=("|~^$*".indexOf(lc)>=0)?lc:"";
_2b4.type=_2ba+cc;
_2b4.attr=ts(_2ab+1,x-_2ba.length);
_2ad=x+1;
}
}
}else{
if(_2ac>=0){
if(cc==")"){
if(_2ae>=0){
_2b4.value=ts(_2ac+1,x);
}
_2ae=_2ac=-1;
}
}else{
if(cc=="#"){
_2b8();
inId=x+1;
}else{
if(cc=="."){
_2b8();
_2af=x;
}else{
if(cc==":"){
_2b8();
_2ae=x;
}else{
if(cc=="["){
_2b8();
_2ab=x;
_2b4={};
}else{
if(cc=="("){
if(_2ae>=0){
_2b4={name:ts(_2ae+1,x),value:null};
_2b3.pseudos.push(_2b4);
}
_2ac=x;
}else{
if((cc==" ")&&(lc!=cc)){
_2b9();
}
}
}
}
}
}
}
}
}
return _2aa;
};
var _2bb=function(_2bc,_2bd){
if(!_2bc){
return _2bd;
}
if(!_2bd){
return _2bc;
}
return function(){
return _2bc.apply(window,arguments)&&_2bd.apply(window,arguments);
};
};
var _2be=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _2bf=function(n){
return (1==n.nodeType);
};
var _2c0="";
var _2c1=function(elem,attr){
if(!elem){
return _2c0;
}
if(attr=="class"){
return elem.className||_2c0;
}
if(attr=="for"){
return elem.htmlFor||_2c0;
}
if(attr=="style"){
return elem.style.cssText||_2c0;
}
return (_2a6?elem.getAttribute(attr):elem.getAttribute(attr,2))||_2c0;
};
var _2c2={"*=":function(attr,_2c3){
return function(elem){
return (_2c1(elem,attr).indexOf(_2c3)>=0);
};
},"^=":function(attr,_2c4){
return function(elem){
return (_2c1(elem,attr).indexOf(_2c4)==0);
};
},"$=":function(attr,_2c5){
return function(elem){
var ea=" "+_2c1(elem,attr);
var _2c6=ea.lastIndexOf(_2c5);
return _2c6>-1&&(_2c6==(ea.length-_2c5.length));
};
},"~=":function(attr,_2c7){
var tval=" "+_2c7+" ";
return function(elem){
var ea=" "+_2c1(elem,attr)+" ";
return (ea.indexOf(tval)>=0);
};
},"|=":function(attr,_2c8){
var _2c9=_2c8+"-";
return function(elem){
var ea=_2c1(elem,attr);
return ((ea==_2c8)||(ea.indexOf(_2c9)==0));
};
},"=":function(attr,_2ca){
return function(elem){
return (_2c1(elem,attr)==_2ca);
};
}};
var _2cb=(typeof _2a3().firstChild.nextElementSibling=="undefined");
var _2cc=!_2cb?"nextElementSibling":"nextSibling";
var _2cd=!_2cb?"previousElementSibling":"previousSibling";
var _2ce=(_2cb?_2bf:_2a7);
var _2cf=function(node){
while(node=node[_2cd]){
if(_2ce(node)){
return false;
}
}
return true;
};
var _2d0=function(node){
while(node=node[_2cc]){
if(_2ce(node)){
return false;
}
}
return true;
};
var _2d1=function(node){
var root=node.parentNode;
root=root.nodeType!=7?root:root.nextSibling;
var i=0,tret=root.children||root.childNodes,ci=(node["_i"]||node.getAttribute("_i")||-1),cl=(root["_l"]||(typeof root.getAttribute!=="undefined"?root.getAttribute("_l"):-1));
if(!tret){
return -1;
}
var l=tret.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
if(has("ie")&&typeof root.setAttribute!=="undefined"){
root.setAttribute("_l",l);
}else{
root["_l"]=l;
}
ci=-1;
for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_2cc]){
if(_2ce(te)){
if(has("ie")){
te.setAttribute("_i",++i);
}else{
te["_i"]=++i;
}
if(node===te){
ci=i;
}
}
}
return ci;
};
var _2d2=function(elem){
return !((_2d1(elem))%2);
};
var _2d3=function(elem){
return ((_2d1(elem))%2);
};
var _2d4={"checked":function(name,_2d5){
return function(elem){
return !!("checked" in elem?elem.checked:elem.selected);
};
},"disabled":function(name,_2d6){
return function(elem){
return elem.disabled;
};
},"enabled":function(name,_2d7){
return function(elem){
return !elem.disabled;
};
},"first-child":function(){
return _2cf;
},"last-child":function(){
return _2d0;
},"only-child":function(name,_2d8){
return function(node){
return _2cf(node)&&_2d0(node);
};
},"empty":function(name,_2d9){
return function(elem){
var cn=elem.childNodes;
var cnl=elem.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"contains":function(name,_2da){
var cz=_2da.charAt(0);
if(cz=="\""||cz=="'"){
_2da=_2da.slice(1,-1);
}
return function(elem){
return (elem.innerHTML.indexOf(_2da)>=0);
};
},"not":function(name,_2db){
var p=_2a8(_2db)[0];
var _2dc={el:1};
if(p.tag!="*"){
_2dc.tag=1;
}
if(!p.classes.length){
_2dc.classes=1;
}
var ntf=_2dd(p,_2dc);
return function(elem){
return (!ntf(elem));
};
},"nth-child":function(name,_2de){
var pi=parseInt;
if(_2de=="odd"){
return _2d3;
}else{
if(_2de=="even"){
return _2d2;
}
}
if(_2de.indexOf("n")!=-1){
var _2df=_2de.split("n",2);
var pred=_2df[0]?((_2df[0]=="-")?-1:pi(_2df[0])):1;
var idx=_2df[1]?pi(_2df[1]):0;
var lb=0,ub=-1;
if(pred>0){
if(idx<0){
idx=(idx%pred)&&(pred+(idx%pred));
}else{
if(idx>0){
if(idx>=pred){
lb=idx-idx%pred;
}
idx=idx%pred;
}
}
}else{
if(pred<0){
pred*=-1;
if(idx>0){
ub=idx;
idx=idx%pred;
}
}
}
if(pred>0){
return function(elem){
var i=_2d1(elem);
return (i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);
};
}else{
_2de=idx;
}
}
var _2e0=pi(_2de);
return function(elem){
return (_2d1(elem)==_2e0);
};
}};
var _2e1=(has("ie")&&(has("ie")<9||has("quirks")))?function(cond){
var clc=cond.toLowerCase();
if(clc=="class"){
cond="className";
}
return function(elem){
return (_2a6?elem.getAttribute(cond):elem[cond]||elem[clc]);
};
}:function(cond){
return function(elem){
return (elem&&elem.getAttribute&&elem.hasAttribute(cond));
};
};
var _2dd=function(_2e2,_2e3){
if(!_2e2){
return _2a7;
}
_2e3=_2e3||{};
var ff=null;
if(!("el" in _2e3)){
ff=_2bb(ff,_2bf);
}
if(!("tag" in _2e3)){
if(_2e2.tag!="*"){
ff=_2bb(ff,function(elem){
return (elem&&((_2a6?elem.tagName:elem.tagName.toUpperCase())==_2e2.getTag()));
});
}
}
if(!("classes" in _2e3)){
each(_2e2.classes,function(_2e4,idx,arr){
var re=new RegExp("(?:^|\\s)"+_2e4+"(?:\\s|$)");
ff=_2bb(ff,function(elem){
return re.test(elem.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _2e3)){
each(_2e2.pseudos,function(_2e5){
var pn=_2e5.name;
if(_2d4[pn]){
ff=_2bb(ff,_2d4[pn](pn,_2e5.value));
}
});
}
if(!("attrs" in _2e3)){
each(_2e2.attrs,function(attr){
var _2e6;
var a=attr.attr;
if(attr.type&&_2c2[attr.type]){
_2e6=_2c2[attr.type](a,attr.matchFor);
}else{
if(a.length){
_2e6=_2e1(a);
}
}
if(_2e6){
ff=_2bb(ff,_2e6);
}
});
}
if(!("id" in _2e3)){
if(_2e2.id){
ff=_2bb(ff,function(elem){
return (!!elem&&(elem.id==_2e2.id));
});
}
}
if(!ff){
if(!("default" in _2e3)){
ff=_2a7;
}
}
return ff;
};
var _2e7=function(_2e8){
return function(node,ret,bag){
while(node=node[_2cc]){
if(_2cb&&(!_2bf(node))){
continue;
}
if((!bag||_2e9(node,bag))&&_2e8(node)){
ret.push(node);
}
break;
}
return ret;
};
};
var _2ea=function(_2eb){
return function(root,ret,bag){
var te=root[_2cc];
while(te){
if(_2ce(te)){
if(bag&&!_2e9(te,bag)){
break;
}
if(_2eb(te)){
ret.push(te);
}
}
te=te[_2cc];
}
return ret;
};
};
var _2ec=function(_2ed){
_2ed=_2ed||_2a7;
return function(root,ret,bag){
var te,x=0,tret=root.children||root.childNodes;
while(te=tret[x++]){
if(_2ce(te)&&(!bag||_2e9(te,bag))&&(_2ed(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _2ee=function(node,root){
var pn=node.parentNode;
while(pn){
if(pn==root){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _2ef={};
var _2f0=function(_2f1){
var _2f2=_2ef[_2f1.query];
if(_2f2){
return _2f2;
}
var io=_2f1.infixOper;
var oper=(io?io.oper:"");
var _2f3=_2dd(_2f1,{el:1});
var qt=_2f1.tag;
var _2f4=("*"==qt);
var ecs=_2a3()["getElementsByClassName"];
if(!oper){
if(_2f1.id){
_2f3=(!_2f1.loops&&_2f4)?_2a7:_2dd(_2f1,{el:1,id:1});
_2f2=function(root,arr){
var te=dom.byId(_2f1.id,(root.ownerDocument||root));
if(!te||!_2f3(te)){
return;
}
if(9==root.nodeType){
return _2be(te,arr);
}else{
if(_2ee(te,root)){
return _2be(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_2f1.classes.length&&!_2a4){
_2f3=_2dd(_2f1,{el:1,classes:1,id:1});
var _2f5=_2f1.classes.join(" ");
_2f2=function(root,arr,bag){
var ret=_2be(0,arr),te,x=0;
var tret=root.getElementsByClassName(_2f5);
while((te=tret[x++])){
if(_2f3(te,root)&&_2e9(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_2f4&&!_2f1.loops){
_2f2=function(root,arr,bag){
var ret=_2be(0,arr),te,x=0;
var tag=_2f1.getTag(),tret=tag?root.getElementsByTagName(tag):[];
while((te=tret[x++])){
if(_2e9(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
_2f3=_2dd(_2f1,{el:1,tag:1,id:1});
_2f2=function(root,arr,bag){
var ret=_2be(0,arr),te,x=0;
var tag=_2f1.getTag(),tret=tag?root.getElementsByTagName(tag):[];
while((te=tret[x++])){
if(_2f3(te,root)&&_2e9(te,bag)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _2f6={el:1};
if(_2f4){
_2f6.tag=1;
}
_2f3=_2dd(_2f1,_2f6);
if("+"==oper){
_2f2=_2e7(_2f3);
}else{
if("~"==oper){
_2f2=_2ea(_2f3);
}else{
if(">"==oper){
_2f2=_2ec(_2f3);
}
}
}
}
return _2ef[_2f1.query]=_2f2;
};
var _2f7=function(root,_2f8){
var _2f9=_2be(root),qp,x,te,qpl=_2f8.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_2f8[i];
x=_2f9.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_2f0(qp);
for(var j=0;(te=_2f9[j]);j++){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_2f9=ret;
}
return ret;
};
var _2fa={},_2fb={};
var _2fc=function(_2fd){
var _2fe=_2a8(trim(_2fd));
if(_2fe.length==1){
var tef=_2f0(_2fe[0]);
return function(root){
var r=tef(root,[]);
if(r){
r.nozip=true;
}
return r;
};
}
return function(root){
return _2f7(root,_2fe);
};
};
var _2ff=has("ie")?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _300=!!_2a3()[qsa];
var _301=/\\[>~+]|n\+\d|([^ \\])?([>~+])([^ =])?/g;
var _302=function(_303,pre,ch,post){
return ch?(pre?pre+" ":"")+ch+(post?" "+post:""):_303;
};
var _304=/([^[]*)([^\]]*])?/g;
var _305=function(_306,_307,att){
return _307.replace(_301,_302)+(att||"");
};
var _308=function(_309,_30a){
_309=_309.replace(_304,_305);
if(_300){
var _30b=_2fb[_309];
if(_30b&&!_30a){
return _30b;
}
}
var _30c=_2fa[_309];
if(_30c){
return _30c;
}
var qcz=_309.charAt(0);
var _30d=(-1==_309.indexOf(" "));
if((_309.indexOf("#")>=0)&&(_30d)){
_30a=true;
}
var _30e=(_300&&(!_30a)&&(_2a5.indexOf(qcz)==-1)&&(!has("ie")||(_309.indexOf(":")==-1))&&(!(_2a4&&(_309.indexOf(".")>=0)))&&(_309.indexOf(":contains")==-1)&&(_309.indexOf(":checked")==-1)&&(_309.indexOf("|=")==-1));
if(_30e){
var tq=(_2a5.indexOf(_309.charAt(_309.length-1))>=0)?(_309+" *"):_309;
return _2fb[_309]=function(root){
try{
if(!((9==root.nodeType)||_30d)){
throw "";
}
var r=root[qsa](tq);
r[_2ff]=true;
return r;
}
catch(e){
return _308(_309,true)(root);
}
};
}else{
var _30f=_309.match(/([^\s,](?:"(?:\\.|[^"])+"|'(?:\\.|[^'])+'|[^,])*)/g);
return _2fa[_309]=((_30f.length<2)?_2fc(_309):function(root){
var _310=0,ret=[],tp;
while((tp=_30f[_310++])){
ret=ret.concat(_2fc(tp)(root));
}
return ret;
});
}
};
var _311=0;
var _312=has("ie")?function(node){
if(_2a6){
return (node.getAttribute("_uid")||node.setAttribute("_uid",++_311)||_311);
}else{
return node.uniqueID;
}
}:function(node){
return (node._uid||(node._uid=++_311));
};
var _2e9=function(node,bag){
if(!bag){
return 1;
}
var id=_312(node);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _313="_zipIdx";
var _314=function(arr){
if(arr&&arr.nozip){
return arr;
}
var ret=[];
if(!arr||!arr.length){
return ret;
}
if(arr[0]){
ret.push(arr[0]);
}
if(arr.length<2){
return ret;
}
_311++;
var x,te;
if(has("ie")&&_2a6){
var _315=_311+"";
arr[0].setAttribute(_313,_315);
for(x=1;te=arr[x];x++){
if(arr[x].getAttribute(_313)!=_315){
ret.push(te);
}
te.setAttribute(_313,_315);
}
}else{
if(has("ie")&&arr.commentStrip){
try{
for(x=1;te=arr[x];x++){
if(_2bf(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
if(arr[0]){
arr[0][_313]=_311;
}
for(x=1;te=arr[x];x++){
if(arr[x][_313]!=_311){
ret.push(te);
}
te[_313]=_311;
}
}
}
return ret;
};
var _316=function(_317,root){
root=root||_2a3();
var od=root.ownerDocument||root;
_2a6=(od.createElement("div").tagName==="div");
var r=_308(_317)(root);
if(r&&r.nozip){
return r;
}
return _314(r);
};
_316.filter=function(_318,_319,root){
var _31a=[],_31b=_2a8(_319),_31c=(_31b.length==1&&!/[^\w#\.]/.test(_319))?_2dd(_31b[0]):function(node){
return _2a2.indexOf(_316(_319,dom.byId(root)),node)!=-1;
};
for(var x=0,te;te=_318[x];x++){
if(_31c(te)){
_31a.push(te);
}
}
return _31a;
};
return _316;
});
},"dojo/errors/RequestTimeoutError":function(){
define("dojo/errors/RequestTimeoutError",["./create","./RequestError"],function(_31d,_31e){
return _31d("RequestTimeoutError",null,_31e,{dojoType:"timeout"});
});
},"dojo/dom-style":function(){
define("dojo/dom-style",["./sniff","./dom"],function(has,dom){
var _31f,_320={};
if(has("webkit")){
_31f=function(node){
var s;
if(node.nodeType==1){
var dv=node.ownerDocument.defaultView;
s=dv.getComputedStyle(node,null);
if(!s&&node.style){
node.style.display="";
s=dv.getComputedStyle(node,null);
}
}
return s||{};
};
}else{
if(has("ie")&&(has("ie")<9||has("quirks"))){
_31f=function(node){
return node.nodeType==1&&node.currentStyle?node.currentStyle:{};
};
}else{
_31f=function(node){
return node.nodeType==1?node.ownerDocument.defaultView.getComputedStyle(node,null):{};
};
}
}
_320.getComputedStyle=_31f;
var _321;
if(!has("ie")){
_321=function(_322,_323){
return parseFloat(_323)||0;
};
}else{
_321=function(_324,_325){
if(!_325){
return 0;
}
if(_325=="medium"){
return 4;
}
if(_325.slice&&_325.slice(-2)=="px"){
return parseFloat(_325);
}
var s=_324.style,rs=_324.runtimeStyle,cs=_324.currentStyle,_326=s.left,_327=rs.left;
rs.left=cs.left;
try{
s.left=_325;
_325=s.pixelLeft;
}
catch(e){
_325=0;
}
s.left=_326;
rs.left=_327;
return _325;
};
}
_320.toPixelValue=_321;
var astr="DXImageTransform.Microsoft.Alpha";
var af=function(n,f){
try{
return n.filters.item(astr);
}
catch(e){
return f?{}:null;
}
};
var _328=has("ie")<9||(has("ie")&&has("quirks"))?function(node){
try{
return af(node).Opacity/100;
}
catch(e){
return 1;
}
}:function(node){
return _31f(node).opacity;
};
var _329=has("ie")<9||(has("ie")&&has("quirks"))?function(node,_32a){
var ov=_32a*100,_32b=_32a==1;
node.style.zoom=_32b?"":1;
if(!af(node)){
if(_32b){
return _32a;
}
node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";
}else{
af(node,1).Opacity=ov;
}
af(node,1).Enabled=!_32b;
if(node.tagName.toLowerCase()=="tr"){
for(var td=node.firstChild;td;td=td.nextSibling){
if(td.tagName.toLowerCase()=="td"){
_329(td,_32a);
}
}
}
return _32a;
}:function(node,_32c){
return node.style.opacity=_32c;
};
var _32d={left:true,top:true};
var _32e=/margin|padding|width|height|max|min|offset/;
function _32f(node,type,_330){
type=type.toLowerCase();
if(has("ie")){
if(_330=="auto"){
if(type=="height"){
return node.offsetHeight;
}
if(type=="width"){
return node.offsetWidth;
}
}
if(type=="fontweight"){
switch(_330){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(type in _32d)){
_32d[type]=_32e.test(type);
}
return _32d[type]?_321(node,_330):_330;
};
var _331=has("ie")?"styleFloat":"cssFloat",_332={"cssFloat":_331,"styleFloat":_331,"float":_331};
_320.get=function getStyle(node,name){
var n=dom.byId(node),l=arguments.length,op=(name=="opacity");
if(l==2&&op){
return _328(n);
}
name=_332[name]||name;
var s=_320.getComputedStyle(n);
return (l==1)?s:_32f(n,name,s[name]||n.style[name]);
};
_320.set=function setStyle(node,name,_333){
var n=dom.byId(node),l=arguments.length,op=(name=="opacity");
name=_332[name]||name;
if(l==3){
return op?_329(n,_333):n.style[name]=_333;
}
for(var x in name){
_320.set(node,x,name[x]);
}
return _320.getComputedStyle(n);
};
return _320;
});
},"dojo/dom-geometry":function(){
define(["./sniff","./_base/window","./dom","./dom-style"],function(has,win,dom,_334){
var geom={};
geom.boxModel="content-box";
if(has("ie")){
geom.boxModel=document.compatMode=="BackCompat"?"border-box":"content-box";
}
geom.getPadExtents=function getPadExtents(node,_335){
node=dom.byId(node);
var s=_335||_334.getComputedStyle(node),px=_334.toPixelValue,l=px(node,s.paddingLeft),t=px(node,s.paddingTop),r=px(node,s.paddingRight),b=px(node,s.paddingBottom);
return {l:l,t:t,r:r,b:b,w:l+r,h:t+b};
};
var none="none";
geom.getBorderExtents=function getBorderExtents(node,_336){
node=dom.byId(node);
var px=_334.toPixelValue,s=_336||_334.getComputedStyle(node),l=s.borderLeftStyle!=none?px(node,s.borderLeftWidth):0,t=s.borderTopStyle!=none?px(node,s.borderTopWidth):0,r=s.borderRightStyle!=none?px(node,s.borderRightWidth):0,b=s.borderBottomStyle!=none?px(node,s.borderBottomWidth):0;
return {l:l,t:t,r:r,b:b,w:l+r,h:t+b};
};
geom.getPadBorderExtents=function getPadBorderExtents(node,_337){
node=dom.byId(node);
var s=_337||_334.getComputedStyle(node),p=geom.getPadExtents(node,s),b=geom.getBorderExtents(node,s);
return {l:p.l+b.l,t:p.t+b.t,r:p.r+b.r,b:p.b+b.b,w:p.w+b.w,h:p.h+b.h};
};
geom.getMarginExtents=function getMarginExtents(node,_338){
node=dom.byId(node);
var s=_338||_334.getComputedStyle(node),px=_334.toPixelValue,l=px(node,s.marginLeft),t=px(node,s.marginTop),r=px(node,s.marginRight),b=px(node,s.marginBottom);
return {l:l,t:t,r:r,b:b,w:l+r,h:t+b};
};
geom.getMarginBox=function getMarginBox(node,_339){
node=dom.byId(node);
var s=_339||_334.getComputedStyle(node),me=geom.getMarginExtents(node,s),l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode,px=_334.toPixelValue,pcs;
if(has("mozilla")){
var sl=parseFloat(s.left),st=parseFloat(s.top);
if(!isNaN(sl)&&!isNaN(st)){
l=sl;
t=st;
}else{
if(p&&p.style){
pcs=_334.getComputedStyle(p);
if(pcs.overflow!="visible"){
l+=pcs.borderLeftStyle!=none?px(node,pcs.borderLeftWidth):0;
t+=pcs.borderTopStyle!=none?px(node,pcs.borderTopWidth):0;
}
}
}
}else{
if(has("opera")||(has("ie")==8&&!has("quirks"))){
if(p){
pcs=_334.getComputedStyle(p);
l-=pcs.borderLeftStyle!=none?px(node,pcs.borderLeftWidth):0;
t-=pcs.borderTopStyle!=none?px(node,pcs.borderTopWidth):0;
}
}
}
return {l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};
};
geom.getContentBox=function getContentBox(node,_33a){
node=dom.byId(node);
var s=_33a||_334.getComputedStyle(node),w=node.clientWidth,h,pe=geom.getPadExtents(node,s),be=geom.getBorderExtents(node,s);
if(!w){
w=node.offsetWidth;
h=node.offsetHeight;
}else{
h=node.clientHeight;
be.w=be.h=0;
}
if(has("opera")){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
function _33b(node,l,t,w,h,u){
u=u||"px";
var s=node.style;
if(!isNaN(l)){
s.left=l+u;
}
if(!isNaN(t)){
s.top=t+u;
}
if(w>=0){
s.width=w+u;
}
if(h>=0){
s.height=h+u;
}
};
function _33c(node){
return node.tagName.toLowerCase()=="button"||node.tagName.toLowerCase()=="input"&&(node.getAttribute("type")||"").toLowerCase()=="button";
};
function _33d(node){
return geom.boxModel=="border-box"||node.tagName.toLowerCase()=="table"||_33c(node);
};
geom.setContentSize=function setContentSize(node,box,_33e){
node=dom.byId(node);
var w=box.w,h=box.h;
if(_33d(node)){
var pb=geom.getPadBorderExtents(node,_33e);
if(w>=0){
w+=pb.w;
}
if(h>=0){
h+=pb.h;
}
}
_33b(node,NaN,NaN,w,h);
};
var _33f={l:0,t:0,w:0,h:0};
geom.setMarginBox=function setMarginBox(node,box,_340){
node=dom.byId(node);
var s=_340||_334.getComputedStyle(node),w=box.w,h=box.h,pb=_33d(node)?_33f:geom.getPadBorderExtents(node,s),mb=geom.getMarginExtents(node,s);
if(has("webkit")){
if(_33c(node)){
var ns=node.style;
if(w>=0&&!ns.width){
ns.width="4px";
}
if(h>=0&&!ns.height){
ns.height="4px";
}
}
}
if(w>=0){
w=Math.max(w-pb.w-mb.w,0);
}
if(h>=0){
h=Math.max(h-pb.h-mb.h,0);
}
_33b(node,box.l,box.t,w,h);
};
geom.isBodyLtr=function isBodyLtr(doc){
doc=doc||win.doc;
return (win.body(doc).dir||doc.documentElement.dir||"ltr").toLowerCase()=="ltr";
};
geom.docScroll=function docScroll(doc){
doc=doc||win.doc;
var node=win.doc.parentWindow||win.doc.defaultView;
return "pageXOffset" in node?{x:node.pageXOffset,y:node.pageYOffset}:(node=has("quirks")?win.body(doc):doc.documentElement)&&{x:geom.fixIeBiDiScrollLeft(node.scrollLeft||0,doc),y:node.scrollTop||0};
};
if(has("ie")){
geom.getIeDocumentElementOffset=function getIeDocumentElementOffset(doc){
doc=doc||win.doc;
var de=doc.documentElement;
if(has("ie")<8){
var r=de.getBoundingClientRect(),l=r.left,t=r.top;
if(has("ie")<7){
l+=de.clientLeft;
t+=de.clientTop;
}
return {x:l<0?0:l,y:t<0?0:t};
}else{
return {x:0,y:0};
}
};
}
geom.fixIeBiDiScrollLeft=function fixIeBiDiScrollLeft(_341,doc){
doc=doc||win.doc;
var ie=has("ie");
if(ie&&!geom.isBodyLtr(doc)){
var qk=has("quirks"),de=qk?win.body(doc):doc.documentElement,pwin=win.global;
if(ie==6&&!qk&&pwin.frameElement&&de.scrollHeight>de.clientHeight){
_341+=de.clientLeft;
}
return (ie<8||qk)?(_341+de.clientWidth-de.scrollWidth):-_341;
}
return _341;
};
geom.position=function(node,_342){
node=dom.byId(node);
var db=win.body(node.ownerDocument),ret=node.getBoundingClientRect();
ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};
if(has("ie")){
var _343=geom.getIeDocumentElementOffset(node.ownerDocument);
ret.x-=_343.x+(has("quirks")?db.clientLeft+db.offsetLeft:0);
ret.y-=_343.y+(has("quirks")?db.clientTop+db.offsetTop:0);
}
if(_342){
var _344=geom.docScroll(node.ownerDocument);
ret.x+=_344.x;
ret.y+=_344.y;
}
return ret;
};
geom.getMarginSize=function getMarginSize(node,_345){
node=dom.byId(node);
var me=geom.getMarginExtents(node,_345||_334.getComputedStyle(node));
var size=node.getBoundingClientRect();
return {w:(size.right-size.left)+me.w,h:(size.bottom-size.top)+me.h};
};
geom.normalizeEvent=function(_346){
if(!("layerX" in _346)){
_346.layerX=_346.offsetX;
_346.layerY=_346.offsetY;
}
if(!has("dom-addeventlistener")){
var se=_346.target;
var doc=(se&&se.ownerDocument)||document;
var _347=has("quirks")?doc.body:doc.documentElement;
var _348=geom.getIeDocumentElementOffset(doc);
_346.pageX=_346.clientX+geom.fixIeBiDiScrollLeft(_347.scrollLeft||0,doc)-_348.x;
_346.pageY=_346.clientY+(_347.scrollTop||0)-_348.y;
}
};
return geom;
});
},"dojo/dom-prop":function(){
define(["exports","./_base/kernel","./sniff","./_base/lang","./dom","./dom-style","./dom-construct","./_base/connect"],function(_349,dojo,has,lang,dom,_34a,ctr,conn){
var _34b={},_34c=0,_34d=dojo._scopeName+"attrid";
_349.names={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"};
_349.get=function getProp(node,name){
node=dom.byId(node);
var lc=name.toLowerCase(),_34e=_349.names[lc]||name;
return node[_34e];
};
_349.set=function setProp(node,name,_34f){
node=dom.byId(node);
var l=arguments.length;
if(l==2&&typeof name!="string"){
for(var x in name){
_349.set(node,x,name[x]);
}
return node;
}
var lc=name.toLowerCase(),_350=_349.names[lc]||name;
if(_350=="style"&&typeof _34f!="string"){
_34a.set(node,_34f);
return node;
}
if(_350=="innerHTML"){
if(has("ie")&&node.tagName.toLowerCase() in {col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1}){
ctr.empty(node);
node.appendChild(ctr.toDom(_34f,node.ownerDocument));
}else{
node[_350]=_34f;
}
return node;
}
if(lang.isFunction(_34f)){
var _351=node[_34d];
if(!_351){
_351=_34c++;
node[_34d]=_351;
}
if(!_34b[_351]){
_34b[_351]={};
}
var h=_34b[_351][_350];
if(h){
conn.disconnect(h);
}else{
try{
delete node[_350];
}
catch(e){
}
}
if(_34f){
_34b[_351][_350]=conn.connect(node,_350,_34f);
}else{
node[_350]=null;
}
return node;
}
node[_350]=_34f;
return node;
};
});
},"dojo/when":function(){
define(["./Deferred","./promise/Promise"],function(_352,_353){
"use strict";
return function when(_354,_355,_356,_357){
var _358=_354&&typeof _354.then==="function";
var _359=_358&&_354 instanceof _353;
if(!_358){
if(_355){
return _355(_354);
}else{
return new _352().resolve(_354);
}
}else{
if(!_359){
var _35a=new _352(_354.cancel);
_354.then(_35a.resolve,_35a.reject,_35a.progress);
_354=_35a.promise;
}
}
if(_355||_356||_357){
return _354.then(_355,_356,_357);
}
return _354;
};
});
},"dojo/dom-attr":function(){
define(["exports","./sniff","./_base/lang","./dom","./dom-style","./dom-prop"],function(_35b,has,lang,dom,_35c,prop){
var _35d={innerHTML:1,className:1,htmlFor:has("ie"),value:1},_35e={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"};
function _35f(node,name){
var attr=node.getAttributeNode&&node.getAttributeNode(name);
return attr&&attr.specified;
};
_35b.has=function hasAttr(node,name){
var lc=name.toLowerCase();
return _35d[prop.names[lc]||name]||_35f(dom.byId(node),_35e[lc]||name);
};
_35b.get=function getAttr(node,name){
node=dom.byId(node);
var lc=name.toLowerCase(),_360=prop.names[lc]||name,_361=_35d[_360],_362=node[_360];
if(_361&&typeof _362!="undefined"){
return _362;
}
if(_360!="href"&&(typeof _362=="boolean"||lang.isFunction(_362))){
return _362;
}
var _363=_35e[lc]||name;
return _35f(node,_363)?node.getAttribute(_363):null;
};
_35b.set=function setAttr(node,name,_364){
node=dom.byId(node);
if(arguments.length==2){
for(var x in name){
_35b.set(node,x,name[x]);
}
return node;
}
var lc=name.toLowerCase(),_365=prop.names[lc]||name,_366=_35d[_365];
if(_365=="style"&&typeof _364!="string"){
_35c.set(node,_364);
return node;
}
if(_366||typeof _364=="boolean"||lang.isFunction(_364)){
return prop.set(node,name,_364);
}
node.setAttribute(_35e[lc]||name,_364);
return node;
};
_35b.remove=function removeAttr(node,name){
dom.byId(node).removeAttribute(_35e[name.toLowerCase()]||name);
};
_35b.getNodeProp=function getNodeProp(node,name){
node=dom.byId(node);
var lc=name.toLowerCase(),_367=prop.names[lc]||name;
if((_367 in node)&&_367!="href"){
return node[_367];
}
var _368=_35e[lc]||name;
return _35f(node,_368)?node.getAttribute(_368):null;
};
});
},"dojo/dom-construct":function(){
define(["exports","./_base/kernel","./sniff","./_base/window","./dom","./dom-attr","./on"],function(_369,dojo,has,win,dom,attr,on){
var _36a={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_36b=/<\s*([\w\:]+)/,_36c={},_36d=0,_36e="__"+dojo._scopeName+"ToDomId";
for(var _36f in _36a){
if(_36a.hasOwnProperty(_36f)){
var tw=_36a[_36f];
tw.pre=_36f=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
}
function _370(node,ref){
var _371=ref.parentNode;
if(_371){
_371.insertBefore(node,ref);
}
};
function _372(node,ref){
var _373=ref.parentNode;
if(_373){
if(_373.lastChild==ref){
_373.appendChild(node);
}else{
_373.insertBefore(node,ref.nextSibling);
}
}
};
var _374=null,_375;
on(window,"unload",function(){
_374=null;
});
_369.toDom=function toDom(frag,doc){
doc=doc||win.doc;
var _376=doc[_36e];
if(!_376){
doc[_36e]=_376=++_36d+"";
_36c[_376]=doc.createElement("div");
}
frag+="";
var _377=frag.match(_36b),tag=_377?_377[1].toLowerCase():"",_378=_36c[_376],wrap,i,fc,df;
if(_377&&_36a[tag]){
wrap=_36a[tag];
_378.innerHTML=wrap.pre+frag+wrap.post;
for(i=wrap.length;i;--i){
_378=_378.firstChild;
}
}else{
_378.innerHTML=frag;
}
if(_378.childNodes.length==1){
return _378.removeChild(_378.firstChild);
}
df=doc.createDocumentFragment();
while(fc=_378.firstChild){
df.appendChild(fc);
}
return df;
};
_369.place=function place(node,_379,_37a){
_379=dom.byId(_379);
if(typeof node=="string"){
node=/^\s*</.test(node)?_369.toDom(node,_379.ownerDocument):dom.byId(node);
}
if(typeof _37a=="number"){
var cn=_379.childNodes;
if(!cn.length||cn.length<=_37a){
_379.appendChild(node);
}else{
_370(node,cn[_37a<0?0:_37a]);
}
}else{
switch(_37a){
case "before":
_370(node,_379);
break;
case "after":
_372(node,_379);
break;
case "replace":
_379.parentNode.replaceChild(node,_379);
break;
case "only":
_369.empty(_379);
_379.appendChild(node);
break;
case "first":
if(_379.firstChild){
_370(node,_379.firstChild);
break;
}
default:
_379.appendChild(node);
}
}
return node;
};
_369.create=function create(tag,_37b,_37c,pos){
var doc=win.doc;
if(_37c){
_37c=dom.byId(_37c);
doc=_37c.ownerDocument;
}
if(typeof tag=="string"){
tag=doc.createElement(tag);
}
if(_37b){
attr.set(tag,_37b);
}
if(_37c){
_369.place(tag,_37c,pos);
}
return tag;
};
_369.empty=has("ie")?function(node){
node=dom.byId(node);
for(var c;c=node.lastChild;){
_369.destroy(c);
}
}:function(node){
dom.byId(node).innerHTML="";
};
_369.destroy=function destroy(node){
node=dom.byId(node);
try{
var doc=node.ownerDocument;
if(!_374||_375!=doc){
_374=doc.createElement("div");
_375=doc;
}
_374.appendChild(node.parentNode?node.parentNode.removeChild(node):node);
_374.innerHTML="";
}
catch(e){
}
};
});
},"dojo/request/xhr":function(){
define("dojo/request/xhr",["../errors/RequestError","./watch","./handlers","./util","../has"],function(_37d,_37e,_37f,util,has){
has.add("native-xhr",function(){
return typeof XMLHttpRequest!=="undefined";
});
has.add("dojo-force-activex-xhr",function(){
return has("activex")&&!document.addEventListener&&window.location.protocol==="file:";
});
has.add("native-xhr2",function(){
if(!has("native-xhr")){
return;
}
var x=new XMLHttpRequest();
return typeof x["addEventListener"]!=="undefined"&&(typeof opera==="undefined"||typeof x["upload"]!=="undefined");
});
has.add("native-formdata",function(){
return typeof FormData==="function";
});
function _380(_381,_382){
var _383=_381.xhr;
_381.status=_381.xhr.status;
_381.text=_383.responseText;
if(_381.options.handleAs==="xml"){
_381.data=_383.responseXML;
}
if(!_382){
try{
_37f(_381);
}
catch(e){
_382=e;
}
}
if(_382){
this.reject(_382);
}else{
if(util.checkStatus(_383.status)){
this.resolve(_381);
}else{
_382=new _37d("Unable to load "+_381.url+" status: "+_383.status,_381);
this.reject(_382);
}
}
};
var _384,_385,_386,_387;
if(has("native-xhr2")){
_384=function(_388){
return !this.isFulfilled();
};
_387=function(dfd,_389){
_389.xhr.abort();
};
_386=function(_38a,dfd,_38b){
function _38c(evt){
dfd.handleResponse(_38b);
};
function _38d(evt){
var _38e=evt.target;
var _38f=new _37d("Unable to load "+_38b.url+" status: "+_38e.status,_38b);
dfd.handleResponse(_38b,_38f);
};
function _390(evt){
if(evt.lengthComputable){
_38b.loaded=evt.loaded;
_38b.total=evt.total;
dfd.progress(_38b);
}
};
_38a.addEventListener("load",_38c,false);
_38a.addEventListener("error",_38d,false);
_38a.addEventListener("progress",_390,false);
return function(){
_38a.removeEventListener("load",_38c,false);
_38a.removeEventListener("error",_38d,false);
_38a.removeEventListener("progress",_390,false);
};
};
}else{
_384=function(_391){
return _391.xhr.readyState;
};
_385=function(_392){
return 4===_392.xhr.readyState;
};
_387=function(dfd,_393){
var xhr=_393.xhr;
var _394=typeof xhr.abort;
if(_394==="function"||_394==="object"||_394==="unknown"){
xhr.abort();
}
};
}
var _395,_396={data:null,query:null,sync:false,method:"GET",headers:{"Content-Type":"application/x-www-form-urlencoded"}};
function xhr(url,_397,_398){
var _399=util.parseArgs(url,util.deepCreate(_396,_397),has("native-formdata")&&_397&&_397.data&&_397.data instanceof FormData);
url=_399.url;
_397=_399.options;
var _39a,last=function(){
_39a&&_39a();
};
var dfd=util.deferred(_399,_387,_384,_385,_380,last);
var _39b=_399.xhr=xhr._create();
if(!_39b){
dfd.cancel(new _37d("XHR was not created"));
return _398?dfd:dfd.promise;
}
_399.getHeader=function(_39c){
return this.xhr.getResponseHeader(_39c);
};
if(_386){
_39a=_386(_39b,dfd,_399);
}
var data=_397.data,_39d=!_397.sync,_39e=_397.method;
try{
_39b.open(_39e,url,_39d,_397.user||_395,_397.password||_395);
if(_397.withCredentials){
_39b.withCredentials=_397.withCredentials;
}
var _39f=_397.headers,_3a0;
if(_39f){
for(var hdr in _39f){
if(hdr.toLowerCase()==="content-type"){
_3a0=_39f[hdr];
}else{
if(_39f[hdr]){
_39b.setRequestHeader(hdr,_39f[hdr]);
}
}
}
}
if(_3a0&&_3a0!==false){
_39b.setRequestHeader("Content-Type",_3a0);
}
if(!_39f||!("X-Requested-With" in _39f)){
_39b.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
if(util.notify){
util.notify.emit("send",_399,dfd.promise.cancel);
}
_39b.send(data);
}
catch(e){
dfd.reject(e);
}
_37e(dfd);
_39b=null;
return _398?dfd:dfd.promise;
};
xhr._create=function(){
throw new Error("XMLHTTP not available");
};
if(has("native-xhr")&&!has("dojo-force-activex-xhr")){
xhr._create=function(){
return new XMLHttpRequest();
};
}else{
if(has("activex")){
try{
new ActiveXObject("Msxml2.XMLHTTP");
xhr._create=function(){
return new ActiveXObject("Msxml2.XMLHTTP");
};
}
catch(e){
try{
new ActiveXObject("Microsoft.XMLHTTP");
xhr._create=function(){
return new ActiveXObject("Microsoft.XMLHTTP");
};
}
catch(e){
}
}
}
}
util.addCommonMethods(xhr);
return xhr;
});
},"dojo/keys":function(){
define("dojo/keys",["./_base/kernel","./sniff"],function(dojo,has){
return dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:has("webkit")?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,UP_DPAD:175,DOWN_DPAD:176,LEFT_DPAD:177,RIGHT_DPAD:178,copyKey:has("mac")&&!has("air")?(has("safari")?91:224):17};
});
},"dojo/domReady":function(){
define(["./has"],function(has){
var _3a1=this,doc=document,_3a2={"loaded":1,"complete":1},_3a3=typeof doc.readyState!="string",_3a4=!!_3a2[doc.readyState];
if(_3a3){
doc.readyState="loading";
}
if(!_3a4){
var _3a5=[],_3a6=[],_3a7=function(evt){
evt=evt||_3a1.event;
if(_3a4||(evt.type=="readystatechange"&&!_3a2[doc.readyState])){
return;
}
_3a4=1;
if(_3a3){
doc.readyState="complete";
}
while(_3a5.length){
(_3a5.shift())(doc);
}
},on=function(node,_3a8){
node.addEventListener(_3a8,_3a7,false);
_3a5.push(function(){
node.removeEventListener(_3a8,_3a7,false);
});
};
if(!has("dom-addeventlistener")){
on=function(node,_3a9){
_3a9="on"+_3a9;
node.attachEvent(_3a9,_3a7);
_3a5.push(function(){
node.detachEvent(_3a9,_3a7);
});
};
var div=doc.createElement("div");
try{
if(div.doScroll&&_3a1.frameElement===null){
_3a6.push(function(){
try{
div.doScroll("left");
return 1;
}
catch(e){
}
});
}
}
catch(e){
}
}
on(doc,"DOMContentLoaded");
on(_3a1,"load");
if("onreadystatechange" in doc){
on(doc,"readystatechange");
}else{
if(!_3a3){
_3a6.push(function(){
return _3a2[doc.readyState];
});
}
}
if(_3a6.length){
var _3aa=function(){
if(_3a4){
return;
}
var i=_3a6.length;
while(i--){
if(_3a6[i]()){
_3a7("poller");
return;
}
}
setTimeout(_3aa,30);
};
_3aa();
}
}
function _3ab(_3ac){
if(_3a4){
_3ac(doc);
}else{
_3a5.push(_3ac);
}
};
_3ab.load=function(id,req,load){
_3ab(load);
};
return _3ab;
});
},"dojo/_base/lang":function(){
define("dojo/_base/lang",["./kernel","../has","../sniff"],function(dojo,has){
has.add("bug-for-in-skips-shadowed",function(){
for(var i in {toString:1}){
return 0;
}
return 1;
});
var _3ad=has("bug-for-in-skips-shadowed")?"hasOwnProperty.valueOf.isPrototypeOf.propertyIsEnumerable.toLocaleString.toString.constructor".split("."):[],_3ae=_3ad.length,_3af=function(_3b0,_3b1,_3b2){
var p,i=0,_3b3=dojo.global;
if(!_3b2){
if(!_3b0.length){
return _3b3;
}else{
p=_3b0[i++];
try{
_3b2=dojo.scopeMap[p]&&dojo.scopeMap[p][1];
}
catch(e){
}
_3b2=_3b2||(p in _3b3?_3b3[p]:(_3b1?_3b3[p]={}:undefined));
}
}
while(_3b2&&(p=_3b0[i++])){
_3b2=(p in _3b2?_3b2[p]:(_3b1?_3b2[p]={}:undefined));
}
return _3b2;
},opts=Object.prototype.toString,_3b4=function(obj,_3b5,_3b6){
return (_3b6||[]).concat(Array.prototype.slice.call(obj,_3b5||0));
},_3b7=/\{([^\}]+)\}/g;
var lang={_extraNames:_3ad,_mixin:function(dest,_3b8,_3b9){
var name,s,i,_3ba={};
for(name in _3b8){
s=_3b8[name];
if(!(name in dest)||(dest[name]!==s&&(!(name in _3ba)||_3ba[name]!==s))){
dest[name]=_3b9?_3b9(s):s;
}
}
if(has("bug-for-in-skips-shadowed")){
if(_3b8){
for(i=0;i<_3ae;++i){
name=_3ad[i];
s=_3b8[name];
if(!(name in dest)||(dest[name]!==s&&(!(name in _3ba)||_3ba[name]!==s))){
dest[name]=_3b9?_3b9(s):s;
}
}
}
}
return dest;
},mixin:function(dest,_3bb){
if(!dest){
dest={};
}
for(var i=1,l=arguments.length;i<l;i++){
lang._mixin(dest,arguments[i]);
}
return dest;
},setObject:function(name,_3bc,_3bd){
var _3be=name.split("."),p=_3be.pop(),obj=_3af(_3be,true,_3bd);
return obj&&p?(obj[p]=_3bc):undefined;
},getObject:function(name,_3bf,_3c0){
return _3af(name.split("."),_3bf,_3c0);
},exists:function(name,obj){
return lang.getObject(name,false,obj)!==undefined;
},isString:function(it){
return (typeof it=="string"||it instanceof String);
},isArray:function(it){
return it&&(it instanceof Array||typeof it=="array");
},isFunction:function(it){
return opts.call(it)==="[object Function]";
},isObject:function(it){
return it!==undefined&&(it===null||typeof it=="object"||lang.isArray(it)||lang.isFunction(it));
},isArrayLike:function(it){
return it&&it!==undefined&&!lang.isString(it)&&!lang.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(lang.isArray(it)||isFinite(it.length));
},isAlien:function(it){
return it&&!lang.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
},extend:function(ctor,_3c1){
for(var i=1,l=arguments.length;i<l;i++){
lang._mixin(ctor.prototype,arguments[i]);
}
return ctor;
},_hitchArgs:function(_3c2,_3c3){
var pre=lang._toArray(arguments,2);
var _3c4=lang.isString(_3c3);
return function(){
var args=lang._toArray(arguments);
var f=_3c4?(_3c2||dojo.global)[_3c3]:_3c3;
return f&&f.apply(_3c2||this,pre.concat(args));
};
},hitch:function(_3c5,_3c6){
if(arguments.length>2){
return lang._hitchArgs.apply(dojo,arguments);
}
if(!_3c6){
_3c6=_3c5;
_3c5=null;
}
if(lang.isString(_3c6)){
_3c5=_3c5||dojo.global;
if(!_3c5[_3c6]){
throw (["lang.hitch: scope[\"",_3c6,"\"] is null (scope=\"",_3c5,"\")"].join(""));
}
return function(){
return _3c5[_3c6].apply(_3c5,arguments||[]);
};
}
return !_3c5?_3c6:function(){
return _3c6.apply(_3c5,arguments||[]);
};
},delegate:(function(){
function TMP(){
};
return function(obj,_3c7){
TMP.prototype=obj;
var tmp=new TMP();
TMP.prototype=null;
if(_3c7){
lang._mixin(tmp,_3c7);
}
return tmp;
};
})(),_toArray:has("ie")?(function(){
function slow(obj,_3c8,_3c9){
var arr=_3c9||[];
for(var x=_3c8||0;x<obj.length;x++){
arr.push(obj[x]);
}
return arr;
};
return function(obj){
return ((obj.item)?slow:_3b4).apply(this,arguments);
};
})():_3b4,partial:function(_3ca){
var arr=[null];
return lang.hitch.apply(dojo,arr.concat(lang._toArray(arguments)));
},clone:function(src){
if(!src||typeof src!="object"||lang.isFunction(src)){
return src;
}
if(src.nodeType&&"cloneNode" in src){
return src.cloneNode(true);
}
if(src instanceof Date){
return new Date(src.getTime());
}
if(src instanceof RegExp){
return new RegExp(src);
}
var r,i,l;
if(lang.isArray(src)){
r=[];
for(i=0,l=src.length;i<l;++i){
if(i in src){
r.push(lang.clone(src[i]));
}
}
}else{
r=src.constructor?new src.constructor():{};
}
return lang._mixin(r,src,lang.clone);
},trim:String.prototype.trim?function(str){
return str.trim();
}:function(str){
return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
},replace:function(tmpl,map,_3cb){
return tmpl.replace(_3cb||_3b7,lang.isFunction(map)?map:function(_3cc,k){
return lang.getObject(k,false,map);
});
}};
1&&lang.mixin(dojo,lang);
return lang;
});
},"dojo/Evented":function(){
define("dojo/Evented",["./aspect","./on"],function(_3cd,on){
"use strict";
var _3ce=_3cd.after;
function _3cf(){
};
_3cf.prototype={on:function(type,_3d0){
return on.parse(this,type,_3d0,function(_3d1,type){
return _3ce(_3d1,"on"+type,_3d0,true);
});
},emit:function(type,_3d2){
var args=[this];
args.push.apply(args,arguments);
return on.emit.apply(on,args);
}};
return _3cf;
});
},"dojo/request/util":function(){
define("dojo/request/util",["exports","../errors/RequestError","../errors/CancelError","../Deferred","../io-query","../_base/array","../_base/lang"],function(_3d3,_3d4,_3d5,_3d6,_3d7,_3d8,lang){
_3d3.deepCopy=function deepCopy(_3d9,_3da){
for(var name in _3da){
var tval=_3d9[name],sval=_3da[name];
if(tval!==sval){
if(tval&&typeof tval==="object"&&sval&&typeof sval==="object"){
_3d3.deepCopy(tval,sval);
}else{
_3d9[name]=sval;
}
}
}
return _3d9;
};
_3d3.deepCreate=function deepCreate(_3db,_3dc){
_3dc=_3dc||{};
var _3dd=lang.delegate(_3db),name,_3de;
for(name in _3db){
_3de=_3db[name];
if(_3de&&typeof _3de==="object"){
_3dd[name]=_3d3.deepCreate(_3de,_3dc[name]);
}
}
return _3d3.deepCopy(_3dd,_3dc);
};
var _3df=Object.freeze||function(obj){
return obj;
};
function _3e0(_3e1){
return _3df(_3e1);
};
_3d3.deferred=function deferred(_3e2,_3e3,_3e4,_3e5,_3e6,last){
var def=new _3d6(function(_3e7){
_3e3&&_3e3(def,_3e2);
if(!_3e7||!(_3e7 instanceof _3d4)&&!(_3e7 instanceof _3d5)){
return new _3d5("Request canceled",_3e2);
}
return _3e7;
});
def.response=_3e2;
def.isValid=_3e4;
def.isReady=_3e5;
def.handleResponse=_3e6;
function _3e8(_3e9){
_3e9.response=_3e2;
throw _3e9;
};
var _3ea=def.then(_3e0).otherwise(_3e8);
if(_3d3.notify){
_3ea.then(lang.hitch(_3d3.notify,"emit","load"),lang.hitch(_3d3.notify,"emit","error"));
}
var _3eb=_3ea.then(function(_3ec){
return _3ec.data||_3ec.text;
});
var _3ed=_3df(lang.delegate(_3eb,{response:_3ea}));
if(last){
def.then(function(_3ee){
last.call(def,_3ee);
},function(_3ef){
last.call(def,_3e2,_3ef);
});
}
def.promise=_3ed;
def.then=_3ed.then;
return def;
};
_3d3.addCommonMethods=function addCommonMethods(_3f0,_3f1){
_3d8.forEach(_3f1||["GET","POST","PUT","DELETE"],function(_3f2){
_3f0[(_3f2==="DELETE"?"DEL":_3f2).toLowerCase()]=function(url,_3f3){
_3f3=lang.delegate(_3f3||{});
_3f3.method=_3f2;
return _3f0(url,_3f3);
};
});
};
_3d3.parseArgs=function parseArgs(url,_3f4,_3f5){
var data=_3f4.data,_3f6=_3f4.query;
if(data&&!_3f5){
if(typeof data==="object"){
_3f4.data=_3d7.objectToQuery(data);
}
}
if(_3f6){
if(typeof _3f6==="object"){
_3f6=_3d7.objectToQuery(_3f6);
}
if(_3f4.preventCache){
_3f6+=(_3f6?"&":"")+"request.preventCache="+(+(new Date));
}
}else{
if(_3f4.preventCache){
_3f6="request.preventCache="+(+(new Date));
}
}
if(url&&_3f6){
url+=(~url.indexOf("?")?"&":"?")+_3f6;
}
return {url:url,options:_3f4,getHeader:function(_3f7){
return null;
}};
};
_3d3.checkStatus=function(stat){
stat=stat||0;
return (stat>=200&&stat<300)||stat===304||stat===1223||!stat;
};
});
},"dojo/mouse":function(){
define("dojo/mouse",["./_base/kernel","./on","./has","./dom","./_base/window"],function(dojo,on,has,dom,win){
has.add("dom-quirks",win.doc&&win.doc.compatMode=="BackCompat");
has.add("events-mouseenter",win.doc&&"onmouseenter" in win.doc.createElement("div"));
has.add("events-mousewheel",win.doc&&"onmousewheel" in win.doc);
var _3f8;
if(has("dom-quirks")||!has("dom-addeventlistener")){
_3f8={LEFT:1,MIDDLE:4,RIGHT:2,isButton:function(e,_3f9){
return e.button&_3f9;
},isLeft:function(e){
return e.button&1;
},isMiddle:function(e){
return e.button&4;
},isRight:function(e){
return e.button&2;
}};
}else{
_3f8={LEFT:0,MIDDLE:1,RIGHT:2,isButton:function(e,_3fa){
return e.button==_3fa;
},isLeft:function(e){
return e.button==0;
},isMiddle:function(e){
return e.button==1;
},isRight:function(e){
return e.button==2;
}};
}
dojo.mouseButtons=_3f8;
function _3fb(type,_3fc){
var _3fd=function(node,_3fe){
return on(node,type,function(evt){
if(_3fc){
return _3fc(evt,_3fe);
}
if(!dom.isDescendant(evt.relatedTarget,node)){
return _3fe.call(this,evt);
}
});
};
_3fd.bubble=function(_3ff){
return _3fb(type,function(evt,_400){
var _401=_3ff(evt.target);
var _402=evt.relatedTarget;
if(_401&&(_401!=(_402&&_402.nodeType==1&&_3ff(_402)))){
return _400.call(_401,evt);
}
});
};
return _3fd;
};
var _403;
if(has("events-mousewheel")){
_403="mousewheel";
}else{
_403=function(node,_404){
return on(node,"DOMMouseScroll",function(evt){
evt.wheelDelta=-evt.detail;
_404.call(this,evt);
});
};
}
return {_eventHandler:_3fb,enter:_3fb("mouseover"),leave:_3fb("mouseout"),wheel:_403,isLeft:_3f8.isLeft,isMiddle:_3f8.isMiddle,isRight:_3f8.isRight};
});
},"dojo/topic":function(){
define("dojo/topic",["./Evented"],function(_405){
var hub=new _405;
return {publish:function(_406,_407){
return hub.emit.apply(hub,arguments);
},subscribe:function(_408,_409){
return hub.on.apply(hub,arguments);
}};
});
},"dojo/_base/xhr":function(){
define("dojo/_base/xhr",["./kernel","./sniff","require","../io-query","../dom","../dom-form","./Deferred","./config","./json","./lang","./array","../on","../aspect","../request/watch","../request/xhr","../request/util"],function(dojo,has,_40a,ioq,dom,_40b,_40c,_40d,json,lang,_40e,on,_40f,_410,_411,util){
dojo._xhrObj=_411._create;
var cfg=dojo.config;
dojo.objectToQuery=ioq.objectToQuery;
dojo.queryToObject=ioq.queryToObject;
dojo.fieldToObject=_40b.fieldToObject;
dojo.formToObject=_40b.toObject;
dojo.formToQuery=_40b.toQuery;
dojo.formToJson=_40b.toJson;
dojo._blockAsync=false;
var _412=dojo._contentHandlers=dojo.contentHandlers={"text":function(xhr){
return xhr.responseText;
},"json":function(xhr){
return json.fromJson(xhr.responseText||null);
},"json-comment-filtered":function(xhr){
if(!_40d.useCommentedJson){
console.warn("Consider using the standard mimetype:application/json."+" json-commenting can introduce security issues. To"+" decrease the chances of hijacking, use the standard the 'json' handler and"+" prefix your json with: {}&&\n"+"Use djConfig.useCommentedJson=true to turn off this message.");
}
var _413=xhr.responseText;
var _414=_413.indexOf("/*");
var _415=_413.lastIndexOf("*/");
if(_414==-1||_415==-1){
throw new Error("JSON was not comment filtered");
}
return json.fromJson(_413.substring(_414+2,_415));
},"javascript":function(xhr){
return dojo.eval(xhr.responseText);
},"xml":function(xhr){
var _416=xhr.responseXML;
if(has("ie")){
if((!_416||!_416.documentElement)){
var ms=function(n){
return "MSXML"+n+".DOMDocument";
};
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];
_40e.some(dp,function(p){
try{
var dom=new ActiveXObject(p);
dom.async=false;
dom.loadXML(xhr.responseText);
_416=dom;
}
catch(e){
return false;
}
return true;
});
}
}
return _416;
},"json-comment-optional":function(xhr){
if(xhr.responseText&&/^[^{\[]*\/\*/.test(xhr.responseText)){
return _412["json-comment-filtered"](xhr);
}else{
return _412["json"](xhr);
}
}};
dojo._ioSetArgs=function(args,_417,_418,_419){
var _41a={args:args,url:args.url};
var _41b=null;
if(args.form){
var form=dom.byId(args.form);
var _41c=form.getAttributeNode("action");
_41a.url=_41a.url||(_41c?_41c.value:null);
_41b=_40b.toObject(form);
}
var _41d=[{}];
if(_41b){
_41d.push(_41b);
}
if(args.content){
_41d.push(args.content);
}
if(args.preventCache){
_41d.push({"dojo.preventCache":new Date().valueOf()});
}
_41a.query=ioq.objectToQuery(lang.mixin.apply(null,_41d));
_41a.handleAs=args.handleAs||"text";
var d=new _40c(function(dfd){
dfd.canceled=true;
_417&&_417(dfd);
var err=dfd.ioArgs.error;
if(!err){
err=new Error("request cancelled");
err.dojoType="cancel";
dfd.ioArgs.error=err;
}
return err;
});
d.addCallback(_418);
var ld=args.load;
if(ld&&lang.isFunction(ld)){
d.addCallback(function(_41e){
return ld.call(args,_41e,_41a);
});
}
var err=args.error;
if(err&&lang.isFunction(err)){
d.addErrback(function(_41f){
return err.call(args,_41f,_41a);
});
}
var _420=args.handle;
if(_420&&lang.isFunction(_420)){
d.addBoth(function(_421){
return _420.call(args,_421,_41a);
});
}
d.addErrback(function(_422){
return _419(_422,d);
});
if(cfg.ioPublish&&dojo.publish&&_41a.args.ioPublish!==false){
d.addCallbacks(function(res){
dojo.publish("/dojo/io/load",[d,res]);
return res;
},function(res){
dojo.publish("/dojo/io/error",[d,res]);
return res;
});
d.addBoth(function(res){
dojo.publish("/dojo/io/done",[d,res]);
return res;
});
}
d.ioArgs=_41a;
return d;
};
var _423=function(dfd){
var ret=_412[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
return ret===undefined?null:ret;
};
var _424=function(_425,dfd){
if(!dfd.ioArgs.args.failOk){
console.error(_425);
}
return _425;
};
var _426=function(dfd){
if(_427<=0){
_427=0;
if(cfg.ioPublish&&dojo.publish&&(!dfd||dfd&&dfd.ioArgs.args.ioPublish!==false)){
dojo.publish("/dojo/io/stop");
}
}
};
var _427=0;
_40f.after(_410,"_onAction",function(){
_427-=1;
});
_40f.after(_410,"_onInFlight",_426);
dojo._ioCancelAll=_410.cancelAll;
dojo._ioNotifyStart=function(dfd){
if(cfg.ioPublish&&dojo.publish&&dfd.ioArgs.args.ioPublish!==false){
if(!_427){
dojo.publish("/dojo/io/start");
}
_427+=1;
dojo.publish("/dojo/io/send",[dfd]);
}
};
dojo._ioWatch=function(dfd,_428,_429,_42a){
var args=dfd.ioArgs.options=dfd.ioArgs.args;
lang.mixin(dfd,{response:dfd.ioArgs,isValid:function(_42b){
return _428(dfd);
},isReady:function(_42c){
return _429(dfd);
},handleResponse:function(_42d){
return _42a(dfd);
}});
_410(dfd);
_426(dfd);
};
var _42e="application/x-www-form-urlencoded";
dojo._ioAddQueryToUrl=function(_42f){
if(_42f.query.length){
_42f.url+=(_42f.url.indexOf("?")==-1?"?":"&")+_42f.query;
_42f.query=null;
}
};
dojo.xhr=function(_430,args,_431){
var rDfd;
var dfd=dojo._ioSetArgs(args,function(dfd){
rDfd&&rDfd.cancel();
},_423,_424);
var _432=dfd.ioArgs;
if("postData" in args){
_432.query=args.postData;
}else{
if("putData" in args){
_432.query=args.putData;
}else{
if("rawBody" in args){
_432.query=args.rawBody;
}else{
if((arguments.length>2&&!_431)||"POST|PUT".indexOf(_430.toUpperCase())===-1){
dojo._ioAddQueryToUrl(_432);
}
}
}
}
var _433={method:_430,handleAs:"text",timeout:args.timeout,withCredentials:args.withCredentials,ioArgs:_432};
if(typeof args.headers!=="undefined"){
_433.headers=args.headers;
}
if(typeof args.contentType!=="undefined"){
if(!_433.headers){
_433.headers={};
}
_433.headers["Content-Type"]=args.contentType;
}
if(typeof _432.query!=="undefined"){
_433.data=_432.query;
}
if(typeof args.sync!=="undefined"){
_433.sync=args.sync;
}
dojo._ioNotifyStart(dfd);
try{
rDfd=_411(_432.url,_433,true);
}
catch(e){
dfd.cancel();
return dfd;
}
dfd.ioArgs.xhr=rDfd.response.xhr;
rDfd.then(function(){
dfd.resolve(dfd);
}).otherwise(function(_434){
_432.error=_434;
dfd.reject(_434);
});
return dfd;
};
dojo.xhrGet=function(args){
return dojo.xhr("GET",args);
};
dojo.rawXhrPost=dojo.xhrPost=function(args){
return dojo.xhr("POST",args,true);
};
dojo.rawXhrPut=dojo.xhrPut=function(args){
return dojo.xhr("PUT",args,true);
};
dojo.xhrDelete=function(args){
return dojo.xhr("DELETE",args);
};
dojo._isDocumentOk=function(x){
return util.checkStatus(x.status);
};
dojo._getText=function(url){
var _435;
dojo.xhrGet({url:url,sync:true,load:function(text){
_435=text;
}});
return _435;
};
lang.mixin(dojo.xhr,{_xhrObj:dojo._xhrObj,fieldToObject:_40b.fieldToObject,formToObject:_40b.toObject,objectToQuery:ioq.objectToQuery,formToQuery:_40b.toQuery,formToJson:_40b.toJson,queryToObject:ioq.queryToObject,contentHandlers:_412,_ioSetArgs:dojo._ioSetArgs,_ioCancelAll:dojo._ioCancelAll,_ioNotifyStart:dojo._ioNotifyStart,_ioWatch:dojo._ioWatch,_ioAddQueryToUrl:dojo._ioAddQueryToUrl,_isDocumentOk:dojo._isDocumentOk,_getText:dojo._getText,get:dojo.xhrGet,post:dojo.xhrPost,put:dojo.xhrPut,del:dojo.xhrDelete});
return dojo.xhr;
});
},"dojo/_base/unload":function(){
define(["./kernel","./lang","../on"],function(dojo,lang,on){
var win=window;
var _436={addOnWindowUnload:function(obj,_437){
if(!dojo.windowUnloaded){
on(win,"unload",(dojo.windowUnloaded=function(){
}));
}
on(win,"unload",lang.hitch(obj,_437));
},addOnUnload:function(obj,_438){
on(win,"beforeunload",lang.hitch(obj,_438));
}};
dojo.addOnWindowUnload=_436.addOnWindowUnload;
dojo.addOnUnload=_436.addOnUnload;
return _436;
});
},"dojo/Deferred":function(){
define(["./has","./_base/lang","./errors/CancelError","./promise/Promise","./promise/instrumentation"],function(has,lang,_439,_43a,_43b){
"use strict";
var _43c=0,_43d=1,_43e=2;
var _43f="This deferred has already been fulfilled.";
var _440=Object.freeze||function(){
};
var _441=function(_442,type,_443,_444,_445){
if(1){
if(type===_43e&&_446.instrumentRejected&&_442.length===0){
_446.instrumentRejected(_443,false,_444,_445);
}
}
for(var i=0;i<_442.length;i++){
_447(_442[i],type,_443,_444);
}
};
var _447=function(_448,type,_449,_44a){
var func=_448[type];
var _44b=_448.deferred;
if(func){
try{
var _44c=func(_449);
if(_44c&&typeof _44c.then==="function"){
_448.cancel=_44c.cancel;
_44c.then(_44d(_44b,_43d),_44d(_44b,_43e),_44d(_44b,_43c));
return;
}
_44e(_44b,_43d,_44c);
}
catch(error){
_44e(_44b,_43e,error);
}
}else{
_44e(_44b,type,_449);
}
if(1){
if(type===_43e&&_446.instrumentRejected){
_446.instrumentRejected(_449,!!func,_44a,_44b.promise);
}
}
};
var _44d=function(_44f,type){
return function(_450){
_44e(_44f,type,_450);
};
};
var _44e=function(_451,type,_452){
if(!_451.isCanceled()){
switch(type){
case _43c:
_451.progress(_452);
break;
case _43d:
_451.resolve(_452);
break;
case _43e:
_451.reject(_452);
break;
}
}
};
var _446=function(_453){
var _454=this.promise=new _43a();
var _455=this;
var _456,_457,_458;
var _459=false;
var _45a=[];
if(1&&Error.captureStackTrace){
Error.captureStackTrace(_455,_446);
Error.captureStackTrace(_454,_446);
}
this.isResolved=_454.isResolved=function(){
return _456===_43d;
};
this.isRejected=_454.isRejected=function(){
return _456===_43e;
};
this.isFulfilled=_454.isFulfilled=function(){
return !!_456;
};
this.isCanceled=_454.isCanceled=function(){
return _459;
};
this.progress=function(_45b,_45c){
if(!_456){
_441(_45a,_43c,_45b,null,_455);
return _454;
}else{
if(_45c===true){
throw new Error(_43f);
}else{
return _454;
}
}
};
this.resolve=function(_45d,_45e){
if(!_456){
_441(_45a,_456=_43d,_457=_45d,null,_455);
_45a=null;
return _454;
}else{
if(_45e===true){
throw new Error(_43f);
}else{
return _454;
}
}
};
var _45f=this.reject=function(_460,_461){
if(!_456){
if(1&&Error.captureStackTrace){
Error.captureStackTrace(_458={},_45f);
}
_441(_45a,_456=_43e,_457=_460,_458,_455);
_45a=null;
return _454;
}else{
if(_461===true){
throw new Error(_43f);
}else{
return _454;
}
}
};
this.then=_454.then=function(_462,_463,_464){
var _465=[_464,_462,_463];
_465.cancel=_454.cancel;
_465.deferred=new _446(function(_466){
return _465.cancel&&_465.cancel(_466);
});
if(_456&&!_45a){
_447(_465,_456,_457,_458);
}else{
_45a.push(_465);
}
return _465.deferred.promise;
};
this.cancel=_454.cancel=function(_467,_468){
if(!_456){
if(_453){
var _469=_453(_467);
_467=typeof _469==="undefined"?_467:_469;
}
_459=true;
if(!_456){
if(typeof _467==="undefined"){
_467=new _439();
}
_45f(_467);
return _467;
}else{
if(_456===_43e&&_457===_467){
return _467;
}
}
}else{
if(_468===true){
throw new Error(_43f);
}
}
};
_440(_454);
};
_446.prototype.toString=function(){
return "[object Deferred]";
};
if(_43b){
_43b(_446);
}
return _446;
});
},"dojo/_base/NodeList":function(){
define("dojo/_base/NodeList",["./kernel","../query","./array","./html","../NodeList-dom"],function(dojo,_46a,_46b){
var _46c=_46a.NodeList,nlp=_46c.prototype;
nlp.connect=_46c._adaptAsForEach(function(){
return dojo.connect.apply(this,arguments);
});
nlp.coords=_46c._adaptAsMap(dojo.coords);
_46c.events=["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"];
_46b.forEach(_46c.events,function(evt){
var _46d="on"+evt;
nlp[_46d]=function(a,b){
return this.connect(_46d,a,b);
};
});
dojo.NodeList=_46c;
return _46c;
});
},"dojo/_base/Color":function(){
define(["./kernel","./lang","./array","./config"],function(dojo,lang,_46e,_46f){
var _470=dojo.Color=function(_471){
if(_471){
this.setColor(_471);
}
};
_470.named={"black":[0,0,0],"silver":[192,192,192],"gray":[128,128,128],"white":[255,255,255],"maroon":[128,0,0],"red":[255,0,0],"purple":[128,0,128],"fuchsia":[255,0,255],"green":[0,128,0],"lime":[0,255,0],"olive":[128,128,0],"yellow":[255,255,0],"navy":[0,0,128],"blue":[0,0,255],"teal":[0,128,128],"aqua":[0,255,255],"transparent":_46f.transparentColor||[0,0,0,0]};
lang.extend(_470,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){
var t=this;
t.r=r;
t.g=g;
t.b=b;
t.a=a;
},setColor:function(_472){
if(lang.isString(_472)){
_470.fromString(_472,this);
}else{
if(lang.isArray(_472)){
_470.fromArray(_472,this);
}else{
this._set(_472.r,_472.g,_472.b,_472.a);
if(!(_472 instanceof _470)){
this.sanitize();
}
}
}
return this;
},sanitize:function(){
return this;
},toRgb:function(){
var t=this;
return [t.r,t.g,t.b];
},toRgba:function(){
var t=this;
return [t.r,t.g,t.b,t.a];
},toHex:function(){
var arr=_46e.map(["r","g","b"],function(x){
var s=this[x].toString(16);
return s.length<2?"0"+s:s;
},this);
return "#"+arr.join("");
},toCss:function(_473){
var t=this,rgb=t.r+", "+t.g+", "+t.b;
return (_473?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";
},toString:function(){
return this.toCss(true);
}});
_470.blendColors=dojo.blendColors=function(_474,end,_475,obj){
var t=obj||new _470();
_46e.forEach(["r","g","b","a"],function(x){
t[x]=_474[x]+(end[x]-_474[x])*_475;
if(x!="a"){
t[x]=Math.round(t[x]);
}
});
return t.sanitize();
};
_470.fromRgb=dojo.colorFromRgb=function(_476,obj){
var m=_476.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return m&&_470.fromArray(m[1].split(/\s*,\s*/),obj);
};
_470.fromHex=dojo.colorFromHex=function(_477,obj){
var t=obj||new _470(),bits=(_477.length==4)?4:8,mask=(1<<bits)-1;
_477=Number("0x"+_477.substr(1));
if(isNaN(_477)){
return null;
}
_46e.forEach(["b","g","r"],function(x){
var c=_477&mask;
_477>>=bits;
t[x]=bits==4?17*c:c;
});
t.a=1;
return t;
};
_470.fromArray=dojo.colorFromArray=function(a,obj){
var t=obj||new _470();
t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));
if(isNaN(t.a)){
t.a=1;
}
return t.sanitize();
};
_470.fromString=dojo.colorFromString=function(str,obj){
var a=_470.named[str];
return a&&_470.fromArray(a,obj)||_470.fromRgb(str,obj)||_470.fromHex(str,obj);
};
return _470;
});
},"dojo/promise/instrumentation":function(){
define(["./tracer","../has","../_base/lang","../_base/array"],function(_478,has,lang,_479){
function _47a(_47b,_47c,_47d){
var _47e="";
if(_47b&&_47b.stack){
_47e+=_47b.stack;
}
if(_47c&&_47c.stack){
_47e+="\n    ----------------------------------------\n    rejected"+_47c.stack.split("\n").slice(1).join("\n").replace(/^\s+/," ");
}
if(_47d&&_47d.stack){
_47e+="\n    ----------------------------------------\n"+_47d.stack;
}
console.error(_47b,_47e);
};
function _47f(_480,_481,_482,_483){
if(!_481){
_47a(_480,_482,_483);
}
};
var _484=[];
var _485=false;
var _486=1000;
function _487(_488,_489,_48a,_48b){
if(_489){
_479.some(_484,function(obj,ix){
if(obj.error===_488){
_484.splice(ix,1);
return true;
}
});
}else{
if(!_479.some(_484,function(obj){
return obj.error===_488;
})){
_484.push({error:_488,rejection:_48a,deferred:_48b,timestamp:new Date().getTime()});
}
}
if(!_485){
_485=setTimeout(_48c,_486);
}
};
function _48c(){
var now=new Date().getTime();
var _48d=now-_486;
_484=_479.filter(_484,function(obj){
if(obj.timestamp<_48d){
_47a(obj.error,obj.rejection,obj.deferred);
return false;
}
return true;
});
if(_484.length){
_485=setTimeout(_48c,_484[0].timestamp+_486-now);
}
};
return function(_48e){
var _48f=has("config-useDeferredInstrumentation");
if(_48f){
_478.on("resolved",lang.hitch(console,"log","resolved"));
_478.on("rejected",lang.hitch(console,"log","rejected"));
_478.on("progress",lang.hitch(console,"log","progress"));
var args=[];
if(typeof _48f==="string"){
args=_48f.split(",");
_48f=args.shift();
}
if(_48f==="report-rejections"){
_48e.instrumentRejected=_47f;
}else{
if(_48f==="report-unhandled-rejections"||_48f===true||_48f===1){
_48e.instrumentRejected=_487;
_486=parseInt(args[0],10)||_486;
}else{
throw new Error("Unsupported instrumentation usage <"+_48f+">");
}
}
}
};
});
},"dojo/selector/_loader":function(){
define(["../has","require"],function(has,_490){
"use strict";
var _491=document.createElement("div");
has.add("dom-qsa2.1",!!_491.querySelectorAll);
has.add("dom-qsa3",function(){
try{
_491.innerHTML="<p class='TEST'></p>";
return _491.querySelectorAll(".TEST:empty").length==1;
}
catch(e){
}
});
var _492;
var acme="./acme",lite="./lite";
return {load:function(id,_493,_494,_495){
var req=_490;
id=id=="default"?has("config-selectorEngine")||"css3":id;
id=id=="css2"||id=="lite"?lite:id=="css2.1"?has("dom-qsa2.1")?lite:acme:id=="css3"?has("dom-qsa3")?lite:acme:id=="acme"?acme:(req=_493)&&id;
if(id.charAt(id.length-1)=="?"){
id=id.substring(0,id.length-1);
var _496=true;
}
if(_496&&(has("dom-compliant-qsa")||_492)){
return _494(_492);
}
req([id],function(_497){
if(id!="./lite"){
_492=_497;
}
_494(_497);
});
}};
});
},"dojo/promise/Promise":function(){
define(["../_base/lang"],function(lang){
"use strict";
function _498(){
throw new TypeError("abstract");
};
return lang.extend(function Promise(){
},{then:function(_499,_49a,_49b){
_498();
},cancel:function(_49c,_49d){
_498();
},isResolved:function(){
_498();
},isRejected:function(){
_498();
},isFulfilled:function(){
_498();
},isCanceled:function(){
_498();
},always:function(_49e){
return this.then(_49e,_49e);
},otherwise:function(_49f){
return this.then(null,_49f);
},trace:function(){
return this;
},traceRejected:function(){
return this;
},toString:function(){
return "[object Promise]";
}});
});
},"dojo/request/watch":function(){
define(["./util","../errors/RequestTimeoutError","../errors/CancelError","../_base/array","../_base/window","../has!host-browser?dom-addeventlistener?:../on:"],function(util,_4a0,_4a1,_4a2,win,on){
var _4a3=null,_4a4=[];
function _4a5(){
var now=+(new Date);
for(var i=0,dfd;i<_4a4.length&&(dfd=_4a4[i]);i++){
var _4a6=dfd.response,_4a7=_4a6.options;
if((dfd.isCanceled&&dfd.isCanceled())||(dfd.isValid&&!dfd.isValid(_4a6))){
_4a4.splice(i--,1);
_4a8._onAction&&_4a8._onAction();
}else{
if(dfd.isReady&&dfd.isReady(_4a6)){
_4a4.splice(i--,1);
dfd.handleResponse(_4a6);
_4a8._onAction&&_4a8._onAction();
}else{
if(dfd.startTime){
if(dfd.startTime+(_4a7.timeout||0)<now){
_4a4.splice(i--,1);
dfd.cancel(new _4a0(_4a6));
_4a8._onAction&&_4a8._onAction();
}
}
}
}
}
_4a8._onInFlight&&_4a8._onInFlight(dfd);
if(!_4a4.length){
clearInterval(_4a3);
_4a3=null;
}
};
function _4a8(dfd){
if(dfd.response.options.timeout){
dfd.startTime=+(new Date);
}
if(dfd.isFulfilled()){
return;
}
_4a4.push(dfd);
if(!_4a3){
_4a3=setInterval(_4a5,50);
}
if(dfd.response.options.sync){
_4a5();
}
};
_4a8.cancelAll=function cancelAll(){
try{
_4a2.forEach(_4a4,function(dfd){
try{
dfd.cancel(new _4a1("All requests canceled."));
}
catch(e){
}
});
}
catch(e){
}
};
if(win&&on&&win.doc.attachEvent){
on(win.global,"unload",function(){
_4a8.cancelAll();
});
}
return _4a8;
});
},"dojo/on":function(){
define(["./has!dom-addeventlistener?:./aspect","./_base/kernel","./has"],function(_4a9,dojo,has){
"use strict";
if(1){
var _4aa=window.ScriptEngineMajorVersion;
has.add("jscript",_4aa&&(_4aa()+ScriptEngineMinorVersion()/10));
has.add("event-orientationchange",has("touch")&&!has("android"));
has.add("event-stopimmediatepropagation",window.Event&&!!window.Event.prototype&&!!window.Event.prototype.stopImmediatePropagation);
}
var on=function(_4ab,type,_4ac,_4ad){
if(_4ab.on&&typeof type!="function"){
return _4ab.on(type,_4ac);
}
return on.parse(_4ab,type,_4ac,_4ae,_4ad,this);
};
on.pausable=function(_4af,type,_4b0,_4b1){
var _4b2;
var _4b3=on(_4af,type,function(){
if(!_4b2){
return _4b0.apply(this,arguments);
}
},_4b1);
_4b3.pause=function(){
_4b2=true;
};
_4b3.resume=function(){
_4b2=false;
};
return _4b3;
};
on.once=function(_4b4,type,_4b5,_4b6){
var _4b7=on(_4b4,type,function(){
_4b7.remove();
return _4b5.apply(this,arguments);
});
return _4b7;
};
on.parse=function(_4b8,type,_4b9,_4ba,_4bb,_4bc){
if(type.call){
return type.call(_4bc,_4b8,_4b9);
}
if(type.indexOf(",")>-1){
var _4bd=type.split(/\s*,\s*/);
var _4be=[];
var i=0;
var _4bf;
while(_4bf=_4bd[i++]){
_4be.push(_4ba(_4b8,_4bf,_4b9,_4bb,_4bc));
}
_4be.remove=function(){
for(var i=0;i<_4be.length;i++){
_4be[i].remove();
}
};
return _4be;
}
return _4ba(_4b8,type,_4b9,_4bb,_4bc);
};
var _4c0=/^touch/;
function _4ae(_4c1,type,_4c2,_4c3,_4c4){
var _4c5=type.match(/(.*):(.*)/);
if(_4c5){
type=_4c5[2];
_4c5=_4c5[1];
return on.selector(_4c5,type).call(_4c4,_4c1,_4c2);
}
if(has("touch")){
if(_4c0.test(type)){
_4c2=_4c6(_4c2);
}
if(!has("event-orientationchange")&&(type=="orientationchange")){
type="resize";
_4c1=window;
_4c2=_4c6(_4c2);
}
}
if(_4c7){
_4c2=_4c7(_4c2);
}
if(_4c1.addEventListener){
var _4c8=type in _4c9,_4ca=_4c8?_4c9[type]:type;
_4c1.addEventListener(_4ca,_4c2,_4c8);
return {remove:function(){
_4c1.removeEventListener(_4ca,_4c2,_4c8);
}};
}
type="on"+type;
if(_4cb&&_4c1.attachEvent){
return _4cb(_4c1,type,_4c2);
}
throw new Error("Target must be an event emitter");
};
on.selector=function(_4cc,_4cd,_4ce){
return function(_4cf,_4d0){
var _4d1=typeof _4cc=="function"?{matches:_4cc}:this,_4d2=_4cd.bubble;
function _4d3(_4d4){
_4d1=_4d1&&_4d1.matches?_4d1:dojo.query;
while(!_4d1.matches(_4d4,_4cc,_4cf)){
if(_4d4==_4cf||_4ce===false||!(_4d4=_4d4.parentNode)||_4d4.nodeType!=1){
return;
}
}
return _4d4;
};
if(_4d2){
return on(_4cf,_4d2(_4d3),_4d0);
}
return on(_4cf,_4cd,function(_4d5){
var _4d6=_4d3(_4d5.target);
return _4d6&&_4d0.call(_4d6,_4d5);
});
};
};
function _4d7(){
this.cancelable=false;
};
function _4d8(){
this.bubbles=false;
};
var _4d9=[].slice,_4da=on.emit=function(_4db,type,_4dc){
var args=_4d9.call(arguments,2);
var _4dd="on"+type;
if("parentNode" in _4db){
var _4de=args[0]={};
for(var i in _4dc){
_4de[i]=_4dc[i];
}
_4de.preventDefault=_4d7;
_4de.stopPropagation=_4d8;
_4de.target=_4db;
_4de.type=type;
_4dc=_4de;
}
do{
_4db[_4dd]&&_4db[_4dd].apply(_4db,args);
}while(_4dc&&_4dc.bubbles&&(_4db=_4db.parentNode));
return _4dc&&_4dc.cancelable&&_4dc;
};
var _4c9={};
if(!has("event-stopimmediatepropagation")){
var _4df=function(){
this.immediatelyStopped=true;
this.modified=true;
};
var _4c7=function(_4e0){
return function(_4e1){
if(!_4e1.immediatelyStopped){
_4e1.stopImmediatePropagation=_4df;
return _4e0.apply(this,arguments);
}
};
};
}
if(has("dom-addeventlistener")){
_4c9={focusin:"focus",focusout:"blur"};
if(has("opera")){
_4c9.keydown="keypress";
}
on.emit=function(_4e2,type,_4e3){
if(_4e2.dispatchEvent&&document.createEvent){
var _4e4=_4e2.ownerDocument.createEvent("HTMLEvents");
_4e4.initEvent(type,!!_4e3.bubbles,!!_4e3.cancelable);
for(var i in _4e3){
var _4e5=_4e3[i];
if(!(i in _4e4)){
_4e4[i]=_4e3[i];
}
}
return _4e2.dispatchEvent(_4e4)&&_4e4;
}
return _4da.apply(on,arguments);
};
}else{
on._fixEvent=function(evt,_4e6){
if(!evt){
var w=_4e6&&(_4e6.ownerDocument||_4e6.document||_4e6).parentWindow||window;
evt=w.event;
}
if(!evt){
return evt;
}
if(_4e7&&evt.type==_4e7.type){
evt=_4e7;
}
if(!evt.target){
evt.target=evt.srcElement;
evt.currentTarget=(_4e6||evt.srcElement);
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(!evt.stopPropagation){
evt.stopPropagation=_4e8;
evt.preventDefault=_4e9;
}
switch(evt.type){
case "keypress":
var c=("charCode" in evt?evt.charCode:evt.keyCode);
if(c==10){
c=0;
evt.keyCode=13;
}else{
if(c==13||c==27){
c=0;
}else{
if(c==3){
c=99;
}
}
}
evt.charCode=c;
_4ea(evt);
break;
}
}
return evt;
};
var _4e7,_4eb=function(_4ec){
this.handle=_4ec;
};
_4eb.prototype.remove=function(){
delete _dojoIEListeners_[this.handle];
};
var _4ed=function(_4ee){
return function(evt){
evt=on._fixEvent(evt,this);
var _4ef=_4ee.call(this,evt);
if(evt.modified){
if(!_4e7){
setTimeout(function(){
_4e7=null;
});
}
_4e7=evt;
}
return _4ef;
};
};
var _4cb=function(_4f0,type,_4f1){
_4f1=_4ed(_4f1);
if(((_4f0.ownerDocument?_4f0.ownerDocument.parentWindow:_4f0.parentWindow||_4f0.window||window)!=top||has("jscript")<5.8)&&!has("config-_allow_leaks")){
if(typeof _dojoIEListeners_=="undefined"){
_dojoIEListeners_=[];
}
var _4f2=_4f0[type];
if(!_4f2||!_4f2.listeners){
var _4f3=_4f2;
_4f2=Function("event","var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}");
_4f2.listeners=[];
_4f0[type]=_4f2;
_4f2.global=this;
if(_4f3){
_4f2.listeners.push(_dojoIEListeners_.push(_4f3)-1);
}
}
var _4f4;
_4f2.listeners.push(_4f4=(_4f2.global._dojoIEListeners_.push(_4f1)-1));
return new _4eb(_4f4);
}
return _4a9.after(_4f0,type,_4f1,true);
};
var _4ea=function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
};
var _4e8=function(){
this.cancelBubble=true;
};
var _4e9=on._preventDefault=function(){
this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){
try{
this.keyCode=0;
}
catch(e){
}
}
this.defaultPrevented=true;
this.returnValue=false;
};
}
if(has("touch")){
var _4f5=function(){
};
var _4f6=window.orientation;
var _4c6=function(_4f7){
return function(_4f8){
var _4f9=_4f8.corrected;
if(!_4f9){
var type=_4f8.type;
try{
delete _4f8.type;
}
catch(e){
}
if(_4f8.type){
_4f5.prototype=_4f8;
var _4f9=new _4f5;
_4f9.preventDefault=function(){
_4f8.preventDefault();
};
_4f9.stopPropagation=function(){
_4f8.stopPropagation();
};
}else{
_4f9=_4f8;
_4f9.type=type;
}
_4f8.corrected=_4f9;
if(type=="resize"){
if(_4f6==window.orientation){
return null;
}
_4f6=window.orientation;
_4f9.type="orientationchange";
return _4f7.call(this,_4f9);
}
if(!("rotation" in _4f9)){
_4f9.rotation=0;
_4f9.scale=1;
}
var _4fa=_4f9.changedTouches[0];
for(var i in _4fa){
delete _4f9[i];
_4f9[i]=_4fa[i];
}
}
return _4f7.call(this,_4f9);
};
};
}
return on;
});
},"dojo/_base/sniff":function(){
define(["./kernel","./lang","../sniff"],function(dojo,lang,has){
if(!1){
return has;
}
dojo._name="browser";
lang.mixin(dojo,{isBrowser:true,isFF:has("ff"),isIE:has("ie"),isKhtml:has("khtml"),isWebKit:has("webkit"),isMozilla:has("mozilla"),isMoz:has("mozilla"),isOpera:has("opera"),isSafari:has("safari"),isChrome:has("chrome"),isMac:has("mac"),isIos:has("ios"),isAndroid:has("android"),isWii:has("wii"),isQuirks:has("quirks"),isAir:has("air")});
dojo.locale=dojo.locale||(has("ie")?navigator.userLanguage:navigator.language).toLowerCase();
return has;
});
},"dojo/errors/create":function(){
define(["../_base/lang"],function(lang){
return function(name,ctor,base,_4fb){
base=base||Error;
var _4fc=function(_4fd){
if(base===Error){
if(Error.captureStackTrace){
Error.captureStackTrace(this,_4fc);
}
var err=Error.call(this,_4fd),prop;
for(prop in err){
if(err.hasOwnProperty(prop)){
this[prop]=err[prop];
}
}
this.message=_4fd;
this.stack=err.stack;
}else{
base.apply(this,arguments);
}
if(ctor){
ctor.apply(this,arguments);
}
};
_4fc.prototype=lang.delegate(base.prototype,_4fb);
_4fc.prototype.name=name;
_4fc.prototype.constructor=_4fc;
return _4fc;
};
});
},"dojo/_base/array":function(){
define(["./kernel","../has","./lang"],function(dojo,has,lang){
var _4fe={},u;
function _4ff(fn){
return _4fe[fn]=new Function("item","index","array",fn);
};
function _500(some){
var _501=!some;
return function(a,fn,o){
var i=0,l=a&&a.length||0,_502;
if(l&&typeof a=="string"){
a=a.split("");
}
if(typeof fn=="string"){
fn=_4fe[fn]||_4ff(fn);
}
if(o){
for(;i<l;++i){
_502=!fn.call(o,a[i],i,a);
if(some^_502){
return !_502;
}
}
}else{
for(;i<l;++i){
_502=!fn(a[i],i,a);
if(some^_502){
return !_502;
}
}
}
return _501;
};
};
function _503(up){
var _504=1,_505=0,_506=0;
if(!up){
_504=_505=_506=-1;
}
return function(a,x,from,last){
if(last&&_504>0){
return _507.lastIndexOf(a,x,from);
}
var l=a&&a.length||0,end=up?l+_506:_505,i;
if(from===u){
i=up?_505:l+_506;
}else{
if(from<0){
i=l+from;
if(i<0){
i=_505;
}
}else{
i=from>=l?l+_506:from;
}
}
if(l&&typeof a=="string"){
a=a.split("");
}
for(;i!=end;i+=_504){
if(a[i]==x){
return i;
}
}
return -1;
};
};
var _507={every:_500(false),some:_500(true),indexOf:_503(true),lastIndexOf:_503(false),forEach:function(arr,_508,_509){
var i=0,l=arr&&arr.length||0;
if(l&&typeof arr=="string"){
arr=arr.split("");
}
if(typeof _508=="string"){
_508=_4fe[_508]||_4ff(_508);
}
if(_509){
for(;i<l;++i){
_508.call(_509,arr[i],i,arr);
}
}else{
for(;i<l;++i){
_508(arr[i],i,arr);
}
}
},map:function(arr,_50a,_50b,Ctr){
var i=0,l=arr&&arr.length||0,out=new (Ctr||Array)(l);
if(l&&typeof arr=="string"){
arr=arr.split("");
}
if(typeof _50a=="string"){
_50a=_4fe[_50a]||_4ff(_50a);
}
if(_50b){
for(;i<l;++i){
out[i]=_50a.call(_50b,arr[i],i,arr);
}
}else{
for(;i<l;++i){
out[i]=_50a(arr[i],i,arr);
}
}
return out;
},filter:function(arr,_50c,_50d){
var i=0,l=arr&&arr.length||0,out=[],_50e;
if(l&&typeof arr=="string"){
arr=arr.split("");
}
if(typeof _50c=="string"){
_50c=_4fe[_50c]||_4ff(_50c);
}
if(_50d){
for(;i<l;++i){
_50e=arr[i];
if(_50c.call(_50d,_50e,i,arr)){
out.push(_50e);
}
}
}else{
for(;i<l;++i){
_50e=arr[i];
if(_50c(_50e,i,arr)){
out.push(_50e);
}
}
}
return out;
},clearCache:function(){
_4fe={};
}};
1&&lang.mixin(dojo,_507);
return _507;
});
},"dojo/_base/json":function(){
define(["./kernel","../json"],function(dojo,json){
dojo.fromJson=function(js){
return eval("("+js+")");
};
dojo._escapeString=json.stringify;
dojo.toJsonIndentStr="\t";
dojo.toJson=function(it,_50f){
return json.stringify(it,function(key,_510){
if(_510){
var tf=_510.__json__||_510.json;
if(typeof tf=="function"){
return tf.call(_510);
}
}
return _510;
},_50f&&dojo.toJsonIndentStr);
};
return dojo;
});
},"dojo/_base/window":function(){
define("dojo/_base/window",["./kernel","./lang","../sniff"],function(dojo,lang,has){
var ret={global:dojo.global,doc:this["document"]||null,body:function(doc){
doc=doc||dojo.doc;
return doc.body||doc.getElementsByTagName("body")[0];
},setContext:function(_511,_512){
dojo.global=ret.global=_511;
dojo.doc=ret.doc=_512;
},withGlobal:function(_513,_514,_515,_516){
var _517=dojo.global;
try{
dojo.global=ret.global=_513;
return ret.withDoc.call(null,_513.document,_514,_515,_516);
}
finally{
dojo.global=ret.global=_517;
}
},withDoc:function(_518,_519,_51a,_51b){
var _51c=ret.doc,oldQ=has("quirks"),_51d=has("ie"),isIE,mode,pwin;
try{
dojo.doc=ret.doc=_518;
dojo.isQuirks=has.add("quirks",dojo.doc.compatMode=="BackCompat",true,true);
if(has("ie")){
if((pwin=_518.parentWindow)&&pwin.navigator){
isIE=parseFloat(pwin.navigator.appVersion.split("MSIE ")[1])||undefined;
mode=_518.documentMode;
if(mode&&mode!=5&&Math.floor(isIE)!=mode){
isIE=mode;
}
dojo.isIE=has.add("ie",isIE,true,true);
}
}
if(_51a&&typeof _519=="string"){
_519=_51a[_519];
}
return _519.apply(_51a,_51b||[]);
}
finally{
dojo.doc=ret.doc=_51c;
dojo.isQuirks=has.add("quirks",oldQ,true,true);
dojo.isIE=has.add("ie",_51d,true,true);
}
}};
1&&lang.mixin(dojo,ret);
return ret;
});
},"dojo/dom-class":function(){
define(["./_base/lang","./_base/array","./dom"],function(lang,_51e,dom){
var _51f="className";
var cls,_520=/\s+/,a1=[""];
function _521(s){
if(typeof s=="string"||s instanceof String){
if(s&&!_520.test(s)){
a1[0]=s;
return a1;
}
var a=s.split(_520);
if(a.length&&!a[0]){
a.shift();
}
if(a.length&&!a[a.length-1]){
a.pop();
}
return a;
}
if(!s){
return [];
}
return _51e.filter(s,function(x){
return x;
});
};
var _522={};
cls={contains:function containsClass(node,_523){
return ((" "+dom.byId(node)[_51f]+" ").indexOf(" "+_523+" ")>=0);
},add:function addClass(node,_524){
node=dom.byId(node);
_524=_521(_524);
var cls=node[_51f],_525;
cls=cls?" "+cls+" ":" ";
_525=cls.length;
for(var i=0,len=_524.length,c;i<len;++i){
c=_524[i];
if(c&&cls.indexOf(" "+c+" ")<0){
cls+=c+" ";
}
}
if(_525<cls.length){
node[_51f]=cls.substr(1,cls.length-2);
}
},remove:function removeClass(node,_526){
node=dom.byId(node);
var cls;
if(_526!==undefined){
_526=_521(_526);
cls=" "+node[_51f]+" ";
for(var i=0,len=_526.length;i<len;++i){
cls=cls.replace(" "+_526[i]+" "," ");
}
cls=lang.trim(cls);
}else{
cls="";
}
if(node[_51f]!=cls){
node[_51f]=cls;
}
},replace:function replaceClass(node,_527,_528){
node=dom.byId(node);
_522[_51f]=node[_51f];
cls.remove(_522,_528);
cls.add(_522,_527);
if(node[_51f]!==_522[_51f]){
node[_51f]=_522[_51f];
}
},toggle:function toggleClass(node,_529,_52a){
node=dom.byId(node);
if(_52a===undefined){
_529=_521(_529);
for(var i=0,len=_529.length,c;i<len;++i){
c=_529[i];
cls[cls.contains(node,c)?"remove":"add"](node,c);
}
}else{
cls[_52a?"add":"remove"](node,_529);
}
return _52a;
}};
return cls;
});
},"dojo/_base/config":function(){
define(["../has","require"],function(has,_52b){
var _52c={};
if(1){
var src=_52b.rawConfig,p;
for(p in src){
_52c[p]=src[p];
}
}else{
var _52d=function(_52e,_52f,_530){
for(p in _52e){
p!="has"&&has.add(_52f+p,_52e[p],0,_530);
}
};
_52c=1?_52b.rawConfig:this.dojoConfig||this.djConfig||{};
_52d(_52c,"config",1);
_52d(_52c.has,"",1);
}
return _52c;
});
},"dojo/_base/event":function(){
define("dojo/_base/event",["./kernel","../on","../has","../dom-geometry"],function(dojo,on,has,dom){
if(on._fixEvent){
var _531=on._fixEvent;
on._fixEvent=function(evt,se){
evt=_531(evt,se);
if(evt){
dom.normalizeEvent(evt);
}
return evt;
};
}
var ret={fix:function(evt,_532){
if(on._fixEvent){
return on._fixEvent(evt,_532);
}
return evt;
},stop:function(evt){
if(has("dom-addeventlistener")||(evt&&evt.preventDefault)){
evt.preventDefault();
evt.stopPropagation();
}else{
evt=evt||window.event;
evt.cancelBubble=true;
on._preventDefault.call(evt);
}
}};
if(1){
dojo.fixEvent=ret.fix;
dojo.stopEvent=ret.stop;
}
return ret;
});
},"dojo/main":function(){
define(["./_base/kernel","./has","require","./sniff","./_base/lang","./_base/array","./_base/config","./ready","./_base/declare","./_base/connect","./_base/Deferred","./_base/json","./_base/Color","./has!dojo-firebug?./_firebug/firebug","./_base/browser","./_base/loader"],function(_533,has,_534,_535,lang,_536,_537,_538){
if(_537.isDebug){
_534(["./_firebug/firebug"]);
}
1||has.add("dojo-config-require",1);
if(1){
var deps=_537.require;
if(deps){
deps=_536.map(lang.isArray(deps)?deps:[deps],function(item){
return item.replace(/\./g,"/");
});
if(_533.isAsync){
_534(deps);
}else{
_538(1,function(){
_534(deps);
});
}
}
}
return _533;
});
},"dojo/sniff":function(){
define(["./has"],function(has){
if(1){
var n=navigator,dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);
has.add("air",dua.indexOf("AdobeAIR")>=0),has.add("khtml",dav.indexOf("Konqueror")>=0?tv:undefined);
has.add("webkit",parseFloat(dua.split("WebKit/")[1])||undefined);
has.add("chrome",parseFloat(dua.split("Chrome/")[1])||undefined);
has.add("safari",dav.indexOf("Safari")>=0&&!has("chrome")?parseFloat(dav.split("Version/")[1]):undefined);
has.add("mac",dav.indexOf("Macintosh")>=0);
has.add("quirks",document.compatMode=="BackCompat");
has.add("ios",/iPhone|iPod|iPad/.test(dua));
has.add("android",parseFloat(dua.split("Android ")[1])||undefined);
if(!has("webkit")){
if(dua.indexOf("Opera")>=0){
has.add("opera",tv>=9.8?parseFloat(dua.split("Version/")[1])||tv:tv);
}
if(dua.indexOf("Gecko")>=0&&!has("khtml")&&!has("webkit")){
has.add("mozilla",tv);
}
if(has("mozilla")){
has.add("ff",parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1])||undefined);
}
if(document.all&&!has("opera")){
var isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
var mode=document.documentMode;
if(mode&&mode!=5&&Math.floor(isIE)!=mode){
isIE=mode;
}
has.add("ie",isIE);
}
has.add("wii",typeof opera!="undefined"&&opera.wiiremote);
}
}
return has;
});
},"dojo/request/handlers":function(){
define(["../json","../_base/kernel","../_base/array","../has"],function(JSON,_539,_53a,has){
has.add("activex",typeof ActiveXObject!=="undefined");
var _53b;
if(has("activex")){
var dp=["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.4.0","MSXML2.DOMDocument.3.0","MSXML.DOMDocument"];
_53b=function(_53c){
var _53d=_53c.data;
if(!_53d||!_53d.documentElement){
var text=_53c.text;
_53a.some(dp,function(p){
try{
var dom=new ActiveXObject(p);
dom.async=false;
dom.loadXML(text);
_53d=dom;
}
catch(e){
return false;
}
return true;
});
}
return _53d;
};
}
var _53e={"javascript":function(_53f){
return _539.eval(_53f.text||"");
},"json":function(_540){
return JSON.parse(_540.text||null);
},"xml":_53b};
function _541(_542){
var _543=_53e[_542.options.handleAs];
_542.data=_543?_543(_542):(_542.data||_542.text);
return _542;
};
_541.register=function(name,_544){
_53e[name]=_544;
};
return _541;
});
},"dojo/ready":function(){
define("dojo/ready",["./_base/kernel","./has","require","./domReady","./_base/lang"],function(dojo,has,_545,_546,lang){
var _547=0,_548,_549=[],_54a=0,_54b=function(){
_547=1;
dojo._postLoad=dojo.config.afterOnLoad=true;
if(_549.length){
_548(_54c);
}
},_54c=function(){
if(_547&&!_54a&&_549.length){
_54a=1;
var f=_549.shift();
try{
f();
}
finally{
_54a=0;
}
_54a=0;
if(_549.length){
_548(_54c);
}
}
};
_545.on("idle",_54c);
_548=function(){
if(_545.idle()){
_54c();
}
};
var _54d=dojo.ready=dojo.addOnLoad=function(_54e,_54f,_550){
var _551=lang._toArray(arguments);
if(typeof _54e!="number"){
_550=_54f;
_54f=_54e;
_54e=1000;
}else{
_551.shift();
}
_550=_550?lang.hitch.apply(dojo,_551):function(){
_54f();
};
_550.priority=_54e;
for(var i=0;i<_549.length&&_54e>=_549[i].priority;i++){
}
_549.splice(i,0,_550);
_548();
};
1||has.add("dojo-config-addOnLoad",1);
if(1){
var dca=dojo.config.addOnLoad;
if(dca){
_54d[(lang.isArray(dca)?"apply":"call")](dojo,dca);
}
}
if(1&&dojo.config.parseOnLoad&&!dojo.isAsync){
_54d(99,function(){
if(!dojo.parser){
dojo.deprecated("Add explicit require(['dojo/parser']);","","2.0");
_545(["dojo/parser"]);
}
});
}
if(1){
_546(_54b);
}else{
_54b();
}
return _54d;
});
},"dojo/aspect":function(){
define("dojo/aspect",[],function(){
"use strict";
var _552,_553=0;
function _554(_555,type,_556,_557){
var _558=_555[type];
var _559=type=="around";
var _55a;
if(_559){
var _55b=_556(function(){
return _558.advice(this,arguments);
});
_55a={remove:function(){
_55a.cancelled=true;
},advice:function(_55c,args){
return _55a.cancelled?_558.advice(_55c,args):_55b.apply(_55c,args);
}};
}else{
_55a={remove:function(){
var _55d=_55a.previous;
var next=_55a.next;
if(!next&&!_55d){
delete _555[type];
}else{
if(_55d){
_55d.next=next;
}else{
_555[type]=next;
}
if(next){
next.previous=_55d;
}
}
},id:_553++,advice:_556,receiveArguments:_557};
}
if(_558&&!_559){
if(type=="after"){
var next=_558;
while(next){
_558=next;
next=next.next;
}
_558.next=_55a;
_55a.previous=_558;
}else{
if(type=="before"){
_555[type]=_55a;
_55a.next=_558;
_558.previous=_55a;
}
}
}else{
_555[type]=_55a;
}
return _55a;
};
function _55e(type){
return function(_55f,_560,_561,_562){
var _563=_55f[_560],_564;
if(!_563||_563.target!=_55f){
_55f[_560]=_564=function(){
var _565=_553;
var args=arguments;
var _566=_564.before;
while(_566){
args=_566.advice.apply(this,args)||args;
_566=_566.next;
}
if(_564.around){
var _567=_564.around.advice(this,args);
}
var _568=_564.after;
while(_568&&_568.id<_565){
if(_568.receiveArguments){
var _569=_568.advice.apply(this,args);
_567=_569===_552?_567:_569;
}else{
_567=_568.advice.call(this,_567,args);
}
_568=_568.next;
}
return _567;
};
if(_563){
_564.around={advice:function(_56a,args){
return _563.apply(_56a,args);
}};
}
_564.target=_55f;
}
var _56b=_554((_564||_563),type,_561,_562);
_561=null;
return _56b;
};
};
var _56c=_55e("after");
var _56d=_55e("before");
var _56e=_55e("around");
return {before:_56d,around:_56e,after:_56c};
});
},"dojo/_base/connect":function(){
define(["./kernel","../on","../topic","../aspect","./event","../mouse","./sniff","./lang","../keys"],function(dojo,on,hub,_56f,_570,_571,has,lang){
has.add("events-keypress-typed",function(){
var _572={charCode:0};
try{
_572=document.createEvent("KeyboardEvent");
(_572.initKeyboardEvent||_572.initKeyEvent).call(_572,"keypress",true,true,null,false,false,false,false,9,3);
}
catch(e){
}
return _572.charCode==0&&!has("opera");
});
function _573(obj,_574,_575,_576,_577){
_576=lang.hitch(_575,_576);
if(!obj||!(obj.addEventListener||obj.attachEvent)){
return _56f.after(obj||dojo.global,_574,_576,true);
}
if(typeof _574=="string"&&_574.substring(0,2)=="on"){
_574=_574.substring(2);
}
if(!obj){
obj=dojo.global;
}
if(!_577){
switch(_574){
case "keypress":
_574=_578;
break;
case "mouseenter":
_574=_571.enter;
break;
case "mouseleave":
_574=_571.leave;
break;
}
}
return on(obj,_574,_576,_577);
};
var _579={106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39,229:113};
var _57a=has("mac")?"metaKey":"ctrlKey";
var _57b=function(evt,_57c){
var faux=lang.mixin({},evt,_57c);
_57d(faux);
faux.preventDefault=function(){
evt.preventDefault();
};
faux.stopPropagation=function(){
evt.stopPropagation();
};
return faux;
};
function _57d(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
};
var _578;
if(has("events-keypress-typed")){
var _57e=function(e,code){
try{
return (e.keyCode=code);
}
catch(e){
return 0;
}
};
_578=function(_57f,_580){
var _581=on(_57f,"keydown",function(evt){
var k=evt.keyCode;
var _582=(k!=13)&&k!=32&&(k!=27||!has("ie"))&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222)&&k!=229;
if(_582||evt.ctrlKey){
var c=_582?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return _580.call(evt.currentTarget,evt);
}else{
if(c>95&&c<106){
c-=48;
}else{
if((!evt.shiftKey)&&(c>=65&&c<=90)){
c+=32;
}else{
c=_579[c]||c;
}
}
}
}
var faux=_57b(evt,{type:"keypress",faux:true,charCode:c});
_580.call(evt.currentTarget,faux);
if(has("ie")){
_57e(evt,faux.keyCode);
}
}
});
var _583=on(_57f,"keypress",function(evt){
var c=evt.charCode;
c=c>=32?c:0;
evt=_57b(evt,{charCode:c,faux:true});
return _580.call(this,evt);
});
return {remove:function(){
_581.remove();
_583.remove();
}};
};
}else{
if(has("opera")){
_578=function(_584,_585){
return on(_584,"keypress",function(evt){
var c=evt.which;
if(c==3){
c=99;
}
c=c<32&&!evt.shiftKey?0:c;
if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}
return _585.call(this,_57b(evt,{charCode:c}));
});
};
}else{
_578=function(_586,_587){
return on(_586,"keypress",function(evt){
_57d(evt);
return _587.call(this,evt);
});
};
}
}
var _588={_keypress:_578,connect:function(obj,_589,_58a,_58b,_58c){
var a=arguments,args=[],i=0;
args.push(typeof a[0]=="string"?null:a[i++],a[i++]);
var a1=a[i+1];
args.push(typeof a1=="string"||typeof a1=="function"?a[i++]:null,a[i++]);
for(var l=a.length;i<l;i++){
args.push(a[i]);
}
return _573.apply(this,args);
},disconnect:function(_58d){
if(_58d){
_58d.remove();
}
},subscribe:function(_58e,_58f,_590){
return hub.subscribe(_58e,lang.hitch(_58f,_590));
},publish:function(_591,args){
return hub.publish.apply(hub,[_591].concat(args));
},connectPublisher:function(_592,obj,_593){
var pf=function(){
_588.publish(_592,arguments);
};
return _593?_588.connect(obj,_593,pf):_588.connect(obj,pf);
},isCopyKey:function(e){
return e[_57a];
}};
_588.unsubscribe=_588.disconnect;
1&&lang.mixin(dojo,_588);
return _588;
});
},"dojo/errors/CancelError":function(){
define(["./create"],function(_594){
return _594("CancelError",null,null,{dojoType:"cancel"});
});
}}});
(function(){
var _595=this.require;
_595({cache:{}});
!_595.async&&_595(["dojo"]);
_595.boot&&_595.apply(null,_595.boot);
})();
