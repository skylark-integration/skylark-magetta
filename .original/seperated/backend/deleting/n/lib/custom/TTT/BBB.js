define(['dojo/_base/declare',
'dijit/_Widget',
'dijit/_Templated',
'dojo/text!./BBB.html'
],function(declare,_Widget,_Templated,templateString){

 return declare('TTT.BBB',[ _Widget, _Templated], {
       widgetsInTemplate:true,
       templateString:templateString   
});
});