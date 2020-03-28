//>>built
define("maq-metadata-dojo/dojo/data/ItemFileReadStoreHelper",["dojo/_base/array","davinci/html/HTMLElement","davinci/html/HTMLText","dojo/promise/all",],function(_1,_2,_3,_4){
var _5=function(){
};
_5.prototype={getData:function(_6,_7){
if(!_6){
return undefined;
}
var _8=_6._getData(_7);
var _9=_6._srcElement.getAttribute("data");
if(_9){
_8.properties.data=JSON.parse(_9);
}else{
if(_6._srcElement.getAttribute("url")){
_8.properties.url=_6._srcElement.getAttribute("url");
}else{
if(_6.properties){
_8.properties.url=_6.properties.url;
}
}
}
return _8;
},preProcessData:function(_a){
if(_a.properties.data){
if(_a.properties.data.items){
_a.properties.data.items.forEach(function(_b){
delete _b._0;
delete _b._RI;
delete _b._S;
delete _b._widgetId;
});
}else{
var d=JSON.parse(_a.properties.data);
_a.properties.data=d;
}
}
return _a;
},preProcess:function(_c,_d){
var _e=_c.getAttribute("url");
if(!_e){
return;
}
_e=_e.trim();
var _f=this.getXhrScriptPluginParameters(_e,_d);
if(_f){
var req=_d.getGlobal()["require"];
req(["dojo/data/ItemFileReadStore","dojox/io/xhrScriptPlugin"],function(_10,_11){
_11(_f.url,_f.callback);
});
}
},_reXspAmd:/\brequire\(\["dojox\/io\/xhrScriptPlugin"\],function\(xhrScriptPlugin\){([\s\S]*?)}\);/,_reXsp:/xhrScriptPlugin\((?:.*?)\);/g,getXhrScriptPluginParameters:function(url,_12){
if(!url){
return;
}
var _13=_12.getDocumentElement().getChildElement("head"),_14;
_13.getChildElements("script").some(function(_15){
var _16=_15.getElementText();
if(_16.length===0){
return false;
}
var m=_16.match(this._reXspAmd),n;
if(m){
return m[1].match(this._reXsp).some(function(_17){
if(_17.indexOf(url)!==-1){
n=_17.match(/\("(.*)",\s*"(.*)"\)/);
_14={url:n[1],callback:n[2]};
return true;
}
});
}
return false;
},this);
return _14;
},setXhrScriptPluginParameters:function(_18,_19){
var _1a=_19.getDocumentElement().getChildElement("head"),_1b,_1c;
_1a.getChildElements("script").some(function(_1d){
_1c=_1d.getElementText();
if(_1c.length===0){
return false;
}
if(this._reXspAmd.test(_1c)){
_1b=_1d;
return true;
}
},this);
if(!_1b){
_19.addHeaderScriptText(["require([\"dojox/io/xhrScriptPlugin\"],function(xhrScriptPlugin){\n","\txhrScriptPlugin(",_18,");\n","});\n"].join(""));
return;
}
var m=_1c.match(this._reXspAmd),_1e=m[1].match(this._reXsp);
_1e.push(["xhrScriptPlugin(",_18,");"].join(""));
_1c=_1c.replace(this._reXspAmd,["require([\"dojox/io/xhrScriptPlugin\"],function(xhrScriptPlugin){\n","\t",_1e.join("\n\t"),"\n","});"].join(""));
_1b.find({elementType:"HTMLText"},true).setText(_1c);
_1b.setScript(_1c);
}};
return _5;
});
