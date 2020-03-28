//>>built
define("maq-metadata-gridx/gridx/GridWizardPanel",["dojo/_base/declare"],function(_1){
return _1(null,{getStepLabel:function(){
return null;
},populate:function(_2){
this._isPopulated=true;
},unpopulate:function(){
this._isPopulated=false;
},isPopulated:function(){
return this._isPopulated;
},isValid:function(){
return true;
},isDirty:function(){
return false;
},_checkValidity:function(){
var _3=true;
var _4=this.isValid();
switch(typeof _4){
case "boolean":
valid=_4;
break;
case "string":
_3=false;
break;
}
return _3;
},});
});
