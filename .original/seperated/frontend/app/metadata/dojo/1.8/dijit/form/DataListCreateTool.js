//>>built
define("maq-metadata-dojo/dijit/form/DataListCreateTool",["davinci/ve/widget","davinci/ve/commands/AddCommand"],function(_1,_2){
return {create:function(_3){
_3.index=0;
_3.target=_1.getEnclosingWidget(this._context.rootNode);
this.inherited(arguments);
},_create:function(_4){
if(!this._data){
return;
}
var _5=this._data;
this._context.loadRequires(_5.type,true).then(function(){
var _6=_1.getUniqueObjectId(_5.type,this._context.getDocument());
if(!_5.properties){
_5.properties={};
}
_5.properties.id=_6;
_5.properties["data-dojo-props"]="id:\""+_6+"\"";
_5.context=this._context;
var _7;
dojo.withDoc(this._context.getDocument(),function(){
_7=_1.createWidget(_5);
});
if(!_7){
throw new Error(this.declaredClass+"Error creating widgets");
}
_7.domNode.style.display="none";
var _8=new _2(_7,_4.parent,_4.index);
this._context.getCommandStack().execute(_8);
}.bind(this));
}};
});
