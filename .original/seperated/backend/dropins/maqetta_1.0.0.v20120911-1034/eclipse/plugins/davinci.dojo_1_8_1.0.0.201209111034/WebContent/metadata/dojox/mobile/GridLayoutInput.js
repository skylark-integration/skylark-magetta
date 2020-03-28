//>>built
require({cache:{"url:maq-metadata-dojo/dojox/mobile/templates/gridLayoutInput.html":"<div>\n  <table>\n    <tr>\n    \t<td>{numberOfRows}</td>\n    \t<td><input data-dojo-type=\"dijit/form/NumberSpinner\" value=\"1\"/></td>\n    </tr>\n    <tr>\n    \t<td>{numberOfCols}</td>\n    \t<td><input data-dojo-type=\"dijit/form/NumberSpinner\" value=\"1\"/></td>\n    </tr>\n  </table>\n</div>\n"}});
define("maq-metadata-dojo/dojox/mobile/GridLayoutInput",["dojo/_base/declare","dojo/_base/lang","dojo/query","davinci/ui/Dialog","davinci/ve/commands/ModifyCommand","davinci/ve/input/SmartInput","davinci/ve/widget","dojo/text!./templates/gridLayoutInput.html","dojo/i18n!dijit/nls/common","dojo/i18n!../../dojox/nls/dojox","dijit/form/NumberSpinner"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
return _1(_6,{show:function(_b){
this._widget=_7.byId(_b);
var _c=false;
if(this._widget.inLineEdit_displayOnCreate){
delete this._widget.inLineEdit_displayOnCreate;
_c=true;
}
this._inline=_4.showDialog(_a.gridLayoutInputTitle,this._getTemplate(),null,dojo.hitch(this,"_onOk"),null,_c);
var _d=_3(".dijitSpinner",this._inline.containerNode);
var _e=this._widget.getData().properties.cols;
dijit.byNode(_d[0]).set("value",Math.ceil(this._widget.getData().children.length/_e));
dijit.byNode(_d[1]).set("value",_e);
},_onOk:function(e){
this.updateWidget();
},updateWidget:function(){
var _f=this._widget.getContext();
var _10=_3(".dijitSpinner",this._inline.containerNode);
var _11=dijit.byNode(_10[0]).get("value");
var _12=dijit.byNode(_10[1]).get("value");
var _13={cols:_12};
var _14=[];
for(var i=0;i<Math.ceil(_11*_12);i++){
_14.push({type:"dojox.mobile.Pane",properties:{}});
}
var _15=new _5(this._widget,_13,_14,this._widget._edit_context);
this._widget._edit_context.getCommandStack().execute(_15);
_f.select(this._widget,null,false);
},_getTemplate:function(){
if(!this._substitutedMainTemplate){
this._substitutedMainTemplate=dojo.replace(_8,{numberOfRows:_a.numberOfRows,numberOfCols:_a.numberOfCols});
}
return this._substitutedMainTemplate;
}});
});
