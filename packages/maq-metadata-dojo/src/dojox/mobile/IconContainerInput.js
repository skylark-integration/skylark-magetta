//>>built
require({cache:{"url:maq-metadata-dojo/dojox/mobile/templates/IconContainerInput.html":"<div>\n\t<div class=\"iconContainerInputRows\" style=\"display: table; width: 100%\"></div>\n</div>\n"}});
define("maq-metadata-dojo/dojox/mobile/IconContainerInput",["dojo/_base/declare","dojo/_base/lang","dojo/dom-construct","dojo/query","davinci/ui/Dialog","davinci/ve/commands/AddCommand","davinci/ve/commands/RemoveCommand","davinci/commands/CompoundCommand","davinci/ve/input/SmartInput","davinci/ve/widget","./IconContainerInputRow","dojo/text!./templates/IconContainerInput.html","dojo/i18n!dijit/nls/common","dojo/i18n!../../dojox/nls/dojox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e){
return _1(_9,{_substitutedMainTemplate:null,childType:"dojox.mobile.IconItem",dialogTitle:_e.iconContainerTitle,show:function(_f){
this._widget=_a.byId(_f);
this._inline=_5.showDialog(this.dialogTitle,this._getTemplate(),{width:550,height:300},dojo.hitch(this,"_onOk"));
var _10=this._widget.getData();
for(var i=0;i<_10.children.length;i++){
var _11=_10.children[i];
if(_11.type==this.childType){
var _12=_11.properties.label;
var _13=_11.properties.icon;
this._addRow(_12,_13);
}
}
},_addRow:function(_14,_15,_16,pos){
var _17=dojo.query(".iconContainerInputRows",this._inline.containerNode)[0];
var div=document.createElement("div");
if(_16){
_3.place(div,_16,pos);
}else{
_3.place(div,_17);
}
new _b({label:_14,icon:_15,widget:this._widget,onAddRow:dojo.hitch(this,"_onAddRow"),onRemoveRow:dojo.hitch(this,"_onRemoveRow")},div);
},_onAddRow:function(_18){
var pos;
var _19=_4(".iconContainerInputRow",this._inline.containerNode);
for(var i=0;i<_19.length;i++){
if(_19[i]==_18.domNode){
pos=i;
}
}
if((pos+1)<_19.length){
this._addRow(_e.iconContainerNewItem+(pos+2),"",_19[pos],"after");
}else{
this._addRow(_e.iconContainerNewItem+(pos+2),"");
}
},_onRemoveRow:function(_1a){
var _1b=_4(".iconContainerInputRow",this._inline.containerNode);
if(_1b.length>1){
_1a.destroyRecursive();
_1a=null;
}
},_onOk:function(e){
this.updateWidget();
this.onOk();
},_onCancel:function(e){
this.onCancel();
},updateWidget:function(){
var _1c=this._widget.getContext();
var _1d=new _8();
var _1e=this._widget.getChildren();
for(var i=0;i<_1e.length;i++){
_1d.add(new _7(_1e[i]));
}
var _1e=_4(".iconContainerInputRow",this._inline.containerNode);
for(var i=0;i<_1e.length;i++){
var row=dijit.byNode(_1e[i]);
var w;
var _1f={"type":this.childType,context:_1c,"properties":{"label":row.getLabel(),"icon":row.getIcon()}};
dojo.withDoc(_1c.getDocument(),function(){
w=_a.createWidget(_1f,{parent:this._widget});
},this);
_1d.add(new _6(w,this._widget));
}
this._widget._edit_context.getCommandStack().execute(_1d);
_1c.select(this._widget,null,false);
},hide:function(_20){
if(this._inline){
var _21;
while(_21=this._connection.pop()){
dojo.disconnect(_21);
}
this._inline.destroyRecursive();
delete this._inline;
}
this.inherited(arguments);
},_getTemplate:function(_22,_23){
if(!this._substitutedMainTemplate){
this._substitutedMainTemplate=dojo.replace(_c,{buttonOk:_d.buttonOk,buttonCancel:_d.buttonCancel});
}
return this._substitutedMainTemplate;
}});
});
