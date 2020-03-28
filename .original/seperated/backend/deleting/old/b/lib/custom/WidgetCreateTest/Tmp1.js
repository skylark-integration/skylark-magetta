define(['dojo/_base/declare',
'dijit/_Widget',
'dijit/_Templated',
'dojo/text!./Tmp1.html'
],function(declare,_Widget,_Templated,templateString){

 return declare('WidgetCreateTest.Tmp1',[ _Widget, _Templated], {
       widgetsInTemplate:true,
       templateString:templateString   
});
});