//>>built
define("maq-metadata-dojo/dojox/mobile/SpinWheelSlotInput",["dojo/_base/declare","dijit/form/_TextBoxMixin","davinci/ve/input/SmartInput","davinci/Workbench","davinci/ve/commands/ModifyCommand","dojo/i18n!../nls/dojox"],function(_1,_2,_3,_4,_5,_6){
return _1(_3,{property:"value",supportsHTML:"false",displayOnCreate:"false",helpText:"",constructor:function(){
this.helpText=_6.spinWheelSlotHelp;
},serialize:function(_7,_8,_9){
var _a=_7.attr("labelFrom");
var _b=_7.attr("labelTo");
if(_a<_b){
_9=_a+"-"+_b;
}else{
_9="";
var _c=_7.attr("labels");
for(var i=0,_d=_c.length;i<_d;i++){
_9+=(i>0)?",":"";
_9+=_c[i];
}
}
this.updateEditBoxValue(_9);
},updateWidget:function(_e){
if(this._widget._destroyed){
return;
}
var _f={};
var _10=_e.split("-");
if(_10.length===2&&isFinite(_10[0])&&isFinite(_10[1])&&(_10[0]<_10[1])){
_f.labelFrom=_10[0];
_f.labelTo=_10[1];
_f.labels="";
}else{
_10=_e.split(",");
if(_10.length>1){
_f.labels=_10;
_f.labelFrom="";
_f.labelTo="";
}else{
var _11=this.getHelpText();
var _12="Invalid Value";
_4.showMessage(_12,_11);
return;
}
}
var _13=this._node(this._widget),_14=this._widget.getContext(),_15=new _5(this._widget,_f,_14);
this._widget._edit_context.getCommandStack().execute(_15);
this._widget=_15.newWidget;
this._widget._edit_context._focuses[0]._selectedWidget=this._widget;
_14.select(this._widget,null,false);
},updateEditBoxValue:function(_16){
this._inline.style.display="block";
this.setFormat(_16);
this._inline.eb.attr("value",String(_16));
this.updateFormats();
this.help(false);
_2.selectInputText(this._inline.eb.textbox);
this.updateSimStyle();
}});
});
