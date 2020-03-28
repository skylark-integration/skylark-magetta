//>>built
define("maq-metadata-dojo/dijit/CalendarInput",["dojo/_base/declare","davinci/ve/input/SmartInput","dojo/i18n!./nls/dijit"],function(_1,_2,_3){
return _1(_2,{property:"value",supportsHTML:"false",displayOnCreate:"false",helpText:"",constructor:function(){
this.helpText=_3.calendarInputHelp;
},serialize:function(_4,_5,_6){
this.updateEditBoxValue(_6);
},parse:function(_7){
var _8=new Date(_7);
return _8;
},updateEditBoxValue:function(_9){
this._inline.style.display="block";
this.setFormat(_9);
this._inline.eb.attr("value",String(_9));
this.updateFormats();
this.help(false);
dijit.selectInputText(this._inline.eb.textbox);
this.updateSimStyle();
}});
});
