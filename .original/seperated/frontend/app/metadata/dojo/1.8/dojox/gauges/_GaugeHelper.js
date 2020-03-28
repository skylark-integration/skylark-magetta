//>>built
define("maq-metadata-dojo/dojox/gauges/_GaugeHelper",function(){
var _1=function(){
this._widget=null;
this._oldPostCreate=null;
};
_1.prototype={_postCreate:function(){
var _2=this.useTooltip;
this.useTooltip=false;
if(this.majorTicks){
delete this.majorTicks._ticks;
}
if(this.minorTicks){
delete this.minorTicks._ticks;
}
this._oldPostCreate();
this.useTooltip=_2;
},getData:function(_3,_4){
var _5=_3._getData(_4);
delete _5.properties.majorTicks._ticks;
delete _5.properties.minorTicks._ticks;
return _5;
},getChildrenData:function(_6,_7){
if(!this._oldPostCreate){
}
var _8=dojo.map(this.getPropertyValue(_6,"ranges"),function(r){
var _9={type:"dojox.gauges.Range",properties:r};
if(_7.serialize){
r.color=dojo.toJson(r.color);
}
return _9;
});
var k=0;
var _a=dojo.map(this.getPropertyValue(_6,"indicators"),function(i){
var _b={type:_6.properties.indicators[k].declaredClass||_6._defaultIndicator.prototype.declaredClass,properties:i};
k++;
return _b;
});
return _a.concat(_8);
}};
return _1;
});
