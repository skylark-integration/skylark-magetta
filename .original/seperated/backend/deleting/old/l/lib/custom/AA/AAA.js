define(['dojo/_base/declare',
'dijit/_Widget',
'dijit/_Templated',
'dojo/text!./AAA.html'
],function(declare,_Widget,_Templated,templateString){

 return declare('AA.AAA',[ _Widget, _Templated], {
       widgetsInTemplate:true,
       templateString:templateString   
});
});