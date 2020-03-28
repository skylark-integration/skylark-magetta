//>>built
define("maq-metadata-dojo/dojox/charting/widget/Chart2DHelper",["davinci/ve/metadata"],function(_1){
var _2=function(){
};
_2.prototype={getContainerNode:function(_3){
if(!_3){
return undefined;
}
if(_3.containerNode||_3.domNode){
return (_3.containerNode||_3.domNode);
}
return undefined;
},getChildrenData:function(_4,_5){
if(!_4){
return undefined;
}
var _6=[];
var _7=[];
if(_4.dijitWidget.chart.axes){
var _8=_4.dijitWidget.chart.axes;
for(var _9 in _8){
var _a=_4.dijitWidget.chart.getAxis(_9);
var _b={type:"html.div",properties:this.getAxisProperties(_a)};
if(_b){
_6.push(_b);
}
}
}
if(_4.dijitWidget.chart.stack){
dojo.forEach(_4.dijitWidget.chart.stack,function(_c){
var _d={type:"html.div",properties:this.getPlotProperties(_c)};
if(_d){
_6.push(_d);
}
});
}
if(_4.dijitWidget.chart.series){
dojo.forEach(_4.dijitWidget.chart.series,function(s){
var _e={type:"html.div",properties:{"class":"series",name:s.name,data:s.data}};
if(_e){
_6.push(_e);
}
});
}
if(_6.length===0){
return undefined;
}
return _6;
},getAxisProperty:function(_f,_10){
if(!_f){
return undefined;
}
var _11=_f.opt;
dojo.mixin(_11,_11,_f.optionalParams);
return (_11[_10]);
},getAxisProperties:function(_12){
if(!_12){
return undefined;
}
var _13={};
_13["class"]="axis";
_13.name=_12.name;
var _14=_12.opt;
var _15=dojo.mixin({},_12.defaultParams,_12.optionalParams);
for(var _16 in _14){
var _17=_15[_16];
if(_17!=_14[_16]){
_13[_16]=_14[_16];
}
}
return _13;
},getPlotProperties:function(_18){
if(!_18){
return undefined;
}
var _19={};
_19["class"]="plot";
_19.name=_18.name;
var _1a=_18.declaredClass;
_1a=_1a.split(".");
var _1b=_1a[_1a.length-1];
_19.type=_1b;
var _1c=_1.getMetadata(_18.declaredClass);
var _1d=_1c.properties;
var _1e=_18.opt;
var _1f=_18.defaultParams;
for(var _20 in _1d){
var _21=_1e[_20];
if(_21!=_1f[_20]){
_19[_20]=_21;
}
}
return _19;
},getPlotProperty:function(_22,_23){
if(!_22){
return undefined;
}
return _22.opt[_23];
},getSeriesProperty:function(_24,_25){
if(!_24){
return undefined;
}
return _24[_25];
}};
return _2;
});
