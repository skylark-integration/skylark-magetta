//>>built
define("maq-metadata-dojo/dojox/mobile/MobileComboBoxInput",["dojo/_base/declare","dojo/_base/lang","dijit/registry","dojox/html/entities","davinci/ve/input/SmartInput","davinci/ve/widget","davinci/commands/OrderedCompoundCommand","davinci/ve/commands/ModifyCommand","dojo/i18n!../nls/dojox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
return _1(_5,{property:"value",displayOnCreate:"true",multiLine:"true",format:"rows",supportsHTML:"false",helpText:"",constructor:function(){
this.helpText=_9.mobileComboBoxHelp1+"<br />"+_9.mobileComboBoxHelp2;
},getProperties:function(_a,_b){
var _c=_a.attr("value");
var _d;
for(var i=0;i<_b.length;i++){
var _e=_b[i];
if(_e.selected){
_d=_e.text;
break;
}else{
if(_e.text==_c){
_d=_c;
}
}
}
return {value:_d};
},serialize:function(_f,_10,_11){
var _12=_f.dijitWidget.store.domNode._dvWidget.getData();
var _13=_12.children;
var _14=[];
for(var i=0;i<_13.length;i++){
var _15=_13[i];
var _16=_15.properties.value;
_16=_4.decode(_16);
var _17=(_11==_16)?"+":"";
_14.push(_17+_16);
}
_14=this.serializeItems(_14);
_10(_14);
},parse:function(_18){
var _19=this.parseItems(_18);
for(var x=0;x<_19.length;x++){
_19[x].text=_4.encode(_19[x].text);
}
return _19;
},update:function(_1a,_1b){
if(_1b.length<1){
return;
}
var _1c=_1a.dijitWidget.store.domNode._dvWidget.getData();
var _1d=_1c.children;
var _1e;
for(var i=0;i<_1b.length;i++){
var _1f=_1b[i];
var _20=_1f.text;
if(i<_1d.length){
var _21=_1d[i];
_21.children=_20;
_21.properties.value=_20;
if(_1f.selected){
_1e=_20;
}
}else{
_1d.push(this.createChildData(_20,_20,_1f.selected));
}
if(!this.isHtmlSupported()){
_1b[i].text=_4.decode(_20);
}
}
if(_1b.length>0){
var _22=_1d.length;
for(var i=_1b.length;i<_22;i++){
var _21=_1d[i];
_1d.pop();
}
}
var _23=_1a.dijitWidget.store.id;
var _24=_6.byId(_23);
var _25={};
var _26={};
if(!_1e){
_1e=_1b[0].text;
}
_26["data-dojo-props"]="id:\""+_23+"\"";
_25["data-dojo-props"]="value:\""+_1e+"\", list:\""+_23+"\"";
var _27=new _7();
var x=_2.getObject(_23);
var y=_3.byId(_23);
_27.add(new _8(_24,_26,_1d));
var _28=new _8(_1a,_25,[]);
_27.add(_28);
this._getContext().getCommandStack().execute(_27);
return _28.newWidget;
},show:function(_29){
this._widget=_6.byId(_29);
this.inherited(arguments);
},_getEditor:function(){
return top.davinci&&top.davinci.Runtime&&top.davinci.Runtime.currentEditor;
},_getContext:function(){
var _2a=this._getEditor();
return _2a&&(_2a.getContext&&_2a.getContext()||_2a.context);
},createChildData:function(_2b,_2c,_2d){
return {type:"html.option",properties:{value:_2b},children:_2c||_2b};
}});
});
