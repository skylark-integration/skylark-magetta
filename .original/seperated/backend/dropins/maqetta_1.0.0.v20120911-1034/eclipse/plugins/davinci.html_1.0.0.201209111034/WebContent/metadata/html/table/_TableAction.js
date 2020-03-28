//>>built
define("maq-metadata-html/html/table/_TableAction",["dojo/_base/declare","davinci/ve/actions/ContextAction"],function(_1,_2){
return _1(_2,{constructor:function(){
this._tableRelatedTags=["td","th","tr","col"];
},isEnabled:function(_3){
_3=this.fixupContext(_3);
if(_3){
var _4=this._getCell(_3);
if(_4){
return this._isEnabled(_4);
}
}
return false;
},_isEnabled:function(_5){
return true;
},shouldShow:function(_6,_7){
_6=this.fixupContext(_6);
var _8=_6?_6.editor:null;
var _9=(_8&&_8.declaredClass=="davinci.ve.PageEditor");
if(_7&&_7.menu&&_7.menu._partID){
var _a=_7.menu._partID;
if(_a=="davinci.ve.visualEditor"||_a=="davinci.ve.VisualEditorOutline"){
_9=this._getCell(_6);
}else{
_9=false;
}
}
return _9;
},_getCell:function(_b){
_b=this.fixupContext(_b);
var _c=_b.getSelection();
if(_c.length===0){
return undefined;
}
var _d=_c[_c.length-1];
if(!_d.isHtmlWidget){
return undefined;
}
if(this._isTableRelatedElement(_d)){
if(_c.length>1){
_b.select(_d);
}
return _d.domNode;
}
return undefined;
},_isTableRelatedElement:function(_e){
var _f=false;
var _10=_e.getTagName();
dojo.some(this._tableRelatedTags,function(tag){
if(tag==_10){
_f=true;
return true;
}
});
return _f;
}});
});
