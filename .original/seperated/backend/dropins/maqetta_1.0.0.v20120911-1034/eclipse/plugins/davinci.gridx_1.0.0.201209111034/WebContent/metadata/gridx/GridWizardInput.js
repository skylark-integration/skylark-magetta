//>>built
define("maq-metadata-gridx/gridx/GridWizardInput",["dojo/_base/declare","maq-metadata-dojo/dijit/layout/ContainerInput","davinci/ui/Dialog","./GridWizard","dojo/i18n!./nls/gridx","davinci/css!./resources/gridInput.css"],function(_1,_2,_3,_4,_5){
return _1(_2,{show:function(_6){
this._widget=davinci.ve.widget.byId(_6);
var _7=this.gridWizard=new _4({widgetId:_6});
this._inline=_3.showModal(_7,_5.gridDialogTitle,{},function(){
});
this._connection.push(dojo.connect(_7,"onFinish",dojo.hitch(this,function(){
this.updateWidget();
this.hide();
})));
this._connection.push(dojo.connect(_7,"onCancel",dojo.hitch(this,function(){
this.hide();
})));
this._inline.onCancel=dojo.hitch(this,"onCancel");
},hide:function(_8){
if(this._inline){
var _9;
while(_9=this._connection.pop()){
dojo.disconnect(_9);
}
this._inline.destroyRecursive();
delete this._inline;
}
},updateWidget:function(){
this.gridWizard.updateWidget();
}});
});
