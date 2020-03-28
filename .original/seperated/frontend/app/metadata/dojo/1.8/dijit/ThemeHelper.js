//>>built
define("maq-metadata-dojo/dijit/ThemeHelper",["dojo/_base/array","dojo/dom-style","davinci/model/Path","davinci/html/HTMLElement","davinci/html/HTMLText","davinci/html/CSSImport","davinci/Theme","davinci/model/Factory","dojo/_base/sniff"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
return {widgetAddedOrDeleted:function(_a,_b){
function _c(_d,_e){
if(_d.type.indexOf(_e)===0){
return true;
}
var _f=_d.getChildren();
for(var j=0;j<_f.length;j++){
var _10=_c(_f[j],_e);
if(_10){
return _10;
}
}
return false;
};
var _11=false;
var _12=_a.getTopWidgets();
for(var i=0;i<_12.length;i++){
_11=_c(_12[i],"dojox.mobile.");
if(_11){
break;
}
}
var _13=_a._themeUrl.split("/");
_13.pop();
var _14=_13.join("/")+"/"+_a.theme.conditionalFiles[0];
if(_b||_a.anyDojoxMobileWidgets!==_11){
var _15,_16,_17,_18;
var _19=dojo.clone(_a.getHeader());
for(var ss=0;ss<_19.styleSheets.length;ss++){
if(_19.styleSheets[ss]==_14){
_15=_19.styleSheets[ss];
}
if(_19.styleSheets[ss]==_a._themeUrl){
_17=_19.styleSheets[ss];
}
}
var _1a=_a.model.find({elementType:"CSSImport"});
for(var imp=0;imp<_1a.length;imp++){
if(_1a[imp].url==_14){
_16=_1a[imp];
}
if(_1a[imp].url==_a._themeUrl){
_18=_1a[imp];
}
}
if(_b||_11){
if(_15){
var idx=_19.styleSheets.indexOf(_15);
if(idx>=0){
_19.styleSheets.splice(idx,1);
_a.setHeader(_19);
}
}
if(_16){
var _1b=_16.parent;
_1b.removeChild(_16);
_16.close();
}
_15=_16=null;
}
if(!_11){
if(!_15&&_17){
var _13=_17.split("/");
_13.pop();
var _1c=_13.join("/")+"/"+_a.theme.conditionalFiles[0];
_19=dojo.clone(_19);
_19.styleSheets.splice(0,0,_1c);
_a.setHeader(_19);
}
if(!_16&&_18){
var _13=_18.url.split("/");
_13.pop();
var _1c=_13.join("/")+"/"+_a.theme.conditionalFiles[0];
var _1d=_a.getFullResourcePath().getParentPath();
var _1e=_1d.append(_1c).toString();
var _1f=system.resource.findResource(_1e);
var _1b=_18.parent;
if(_1b&&_1f){
var css=new _6();
css.url=_1c;
var _20={url:_1e,includeImports:true};
var _21=_8.getModel(_20);
css.cssFile=_21;
_1b.addChild(css,0);
}
}
}
_a.anyDojoxMobileWidgets=_11;
}
},preThemeConfig:function(_22){
function _23(url){
var doc=_22.getDocument();
var _24=doc.getElementsByTagName("head")[0];
dojo.withDoc(doc,function(){
var _25=dojo.create("link",{rel:"stylesheet",type:"text/css",href:url});
_24.appendChild(_25);
});
};
var _26=_7.getThemeLocation();
var _27=_26.relativeTo(_22.visualEditor.basePath,true);
var _28=[];
_22.theme.conditionalFiles.forEach(function(_29){
var _2a=_27.toString()+"/"+_22.theme.name+"/"+_29;
_23(_2a);
var _2b=_8.getModel({url:_26.toString()+"/"+_22.theme.name+"/"+_29,includeImports:true,});
_28.push(_2b);
_22.editor._loadedCSSConnects.push(dojo.connect(_2b,"onChange",_22,"_themeChange"));
}.bind(this));
_22.cssFiles=_22.cssFiles.concat(_28);
},};
});
