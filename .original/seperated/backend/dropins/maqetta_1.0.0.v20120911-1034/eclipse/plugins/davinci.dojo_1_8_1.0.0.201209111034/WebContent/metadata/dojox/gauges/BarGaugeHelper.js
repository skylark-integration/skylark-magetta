//>>built
define("maq-metadata-dojo/dojox/gauges/BarGaugeHelper",["dojo/_base/declare","./_GaugeHelper"],function(_1,_2){
return _1(_2,{_widget:"BarGauge",_postCreate:function(){
var _3=this.useTooltip;
this.useTooltip=false;
if(this.majorTicks){
delete this.majorTicks._ticks;
}
if(this.minorTicks){
delete this.minorTicks._ticks;
}
this._oldPostCreate();
this.useTooltip=_3;
}});
});
