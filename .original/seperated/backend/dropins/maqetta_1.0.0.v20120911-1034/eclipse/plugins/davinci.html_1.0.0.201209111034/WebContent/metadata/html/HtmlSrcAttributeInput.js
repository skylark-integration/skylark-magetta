//>>built
require({cache:{"url:maq-metadata-html/html/templates/srcAttributeInputFields.html":"<div>\n\t<table>\n\t\t<tr>\t\n\t\t\t<td nowrap=\"nowrap\">\n\t\t\t\t<label id=\"srcAttributeInputSrcLabel\" for=\"srcAttributeInputSrcTextBox\">NLS:</label>\n\t\t\t</td>\n\t\t\t<td>\n\t\t\t\t <input type=\"text\" dojoType=\"dijit.form.TextBox\" id=\"srcAttributeInputSrcTextBox\"></input>\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\t\n\t\t\t<td nowrap=\"nowrap\">\n\t\t\t\t<label id=\"srcAttributeInputAltLabel\" for=\"srcAttributeInputAltTextBox\">NLS:</label>\n\t\t\t</td>\n\t\t\t<td>\n\t\t\t\t <input type=\"text\" dojoType=\"dijit.form.TextBox\" id=\"srcAttributeInputAltTextBox\"></input>\n\t\t\t</td>\n\t\t</tr>\n\t</table>\n</div>\n"}});
define("maq-metadata-html/html/HtmlSrcAttributeInput",["dojo/_base/declare","davinci/ve/input/SmartInput","davinci/model/Path","davinci/ve/widget","davinci/ve/commands/ModifyCommand","davinci/ui/Dialog","dijit/form/Button","dijit/Tree","dijit/layout/BorderContainer","dijit/layout/ContentPane","dojo/text!./templates/srcAttributeInputFields.html","dojo/i18n!dijit/nls/common","dojo/i18n!./nls/html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
return _1(_2,{supportsAltText:true,show:function(_e){
this._widget=_4.byId(_e);
var _f=function(){
var _10=dijit.byId("srcAttributeInputSrcTextBox");
var _11=dijit.byId("srcAttributeInputAltTextBox");
var _12=_10.get("value");
var _13=_11.get("value");
this.updateWidget(_12,_13);
};
var _14=new _9({});
this._inline=_6.showDialog(_d.selectSource,_14,{width:350,height:420},dojo.hitch(this,_f));
var cp1=new _a({region:"center"});
_14.addChild(cp1);
var _15={id:"htmlSrcAttributeInputSelectionTree",style:"height:10em;margin-bottom:12px;;overflow:auto;",model:system.resource,filters:"new system.resource.FileTypeFilter(parms.fileTypes || '*');"};
var _16=new _8(_15);
cp1.addChild(_16);
var _17=function(_18){
var _19=new _3(_18.getPath());
var _1a=new _3(this._widget._edit_context._srcDocument.fileName);
var _1b=_19.relativeTo(_1a,true).toString();
var _1c=dijit.byId("srcAttributeInputSrcTextBox");
_1c.set("value",_1b);
};
this._connection.push(dojo.connect(_16,"onClick",this,_17));
var cp2=new _a({region:"bottom",style:"height: 50px"});
_14.addChild(cp2);
var _1d=dojo.create("div");
_1d.innerHTML=_b;
dojo.parser.parse(_1d);
cp2.domNode.appendChild(_1d);
var _1e=dojo.byId("srcAttributeInputSrcLabel");
_1e.innerHTML=_d.typeFileUrl;
var _1f=dijit.byId("srcAttributeInputSrcTextBox");
_1f.set("value",this._widget._srcElement.getAttribute("src")||"");
var _20=dojo.byId("srcAttributeInputAltLabel");
_20.innerHTML=_d.typeAltText;
var _21=dijit.byId("srcAttributeInputAltTextBox");
if(this.supportsAltText){
_21.set("value",this._widget._srcElement.getAttribute("alt")||"");
}else{
dojo.setStyle(_20,{display:"none"});
_21.set("style","display: none;");
}
},updateWidget:function(_22,_23){
var _24={};
_24.src=_22;
if(this.supportsAltText){
_24.alt=_23;
}
var _25=this._widget.getContext();
var _26=new _5(this._widget,_24,null,_25);
this._widget._edit_context.getCommandStack().execute(_26);
this._widget=_26.newWidget;
this._widget._edit_context._focuses[0]._selectedWidget=this._widget;
_25.select(this._widget,null,false);
}});
});
