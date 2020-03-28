//>>built
define("maq-metadata-html/html/table/SelectRowAction",["dojo/_base/declare","./_TableAction","davinci/ve/actions/SelectParentAction"],function(_1,_2,_3){
return _1(_2,{name:"selectRow",iconClass:"editActionIcon editSelectRowIcon",constructor:function(){
this._selectParentAction=new _3();
},_isEnabled:function(_4){
var _5=_4.nodeName.toLowerCase();
return _5=="td"||_5=="th";
},run:function(_6){
this._selectParentAction.run(_6);
}});
});
