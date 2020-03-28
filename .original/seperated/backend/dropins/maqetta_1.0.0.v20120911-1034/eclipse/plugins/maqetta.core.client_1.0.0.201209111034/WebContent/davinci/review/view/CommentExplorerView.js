/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

//>>built
define("davinci/review/view/CommentExplorerView",["dojo/_base/declare","davinci/Runtime","davinci/review/model/ReviewTreeModel","davinci/Workbench","davinci/workbench/ViewPart","dijit/Tree","dojo/date/stamp","dojo/date/locale","davinci/review/actions/CloseVersionAction","davinci/review/actions/EditVersionAction","davinci/review/actions/OpenVersionAction","dijit/Toolbar","dijit/ToolbarSeparator","dijit/form/Button","dijit/form/TextBox","dojo/i18n!./nls/view","dojo/i18n!../widgets/nls/widgets","davinci/ui/widgets/TransformTreeMixin"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11){
var _12=function(_13,_14){
if(_13.elementType=="ReviewVersion"){
if(_13.isDraft){
return "draft-open";
}
if(_13.closed){
return _14?"reviewFolder-open-disabled":"reviewFolder-closed-disabled";
}
if(!_13.closed){
return _14?"reviewFolder-open":"reviewFolder-closed";
}
}
if(_13.elementType=="ReviewFile"){
if(_13.parent.closed){
return "disabledReviewFileIcon";
}
var _15;
var _16=_13.getExtension();
var _17=_2.getExtension("davinci.fileType",function(_18){
return _18.extension==_16;
});
if(_17){
_15=_17.iconClass;
}
return _15||"dijitLeaf";
}
return "dijitLeaf";
};
getLabelClass=function(_19,_1a){
var _1b="dijitTreeLabel";
if(_19.elementType=="ReviewVersion"){
if(_19.designerId==_2.userName){
_1b="reviewOwnedByUserLabel";
}else{
_1b="reviewOwnedByOtherLabel";
}
}
return _1b;
};
var _1c=function(){
return [function(_1d){
return _1d.sort(function(_1e,_1f){
return _1e.timeStamp>_1f.timeStamp?-1:_1e.timeStamp<_1f.timeStamp?1:0;
});
}];
};
var _20=_1(_5,{postCreate:function(){
this.inherited(arguments);
var _21=new _3();
this.model=_21;
var _22=_1c();
_22.push(function(_23){
return _23.filter(this.commentingFilter.filterItem,this);
}.bind(this));
this.tree=new _6({id:"reviewCommentExplorerViewTree",persist:false,showRoot:false,model:_21,labelAttr:"name",childrenAttrs:"children",getIconClass:dojo.hitch(this,this._getIconClass),getLabelClass:dojo.hitch(this,this._getLabelClass),transforms:_22,isMultiSelect:true});
this.setContent(this.tree);
this.attachToolbar();
this.tree.startup();
dojo.connect(this.tree,"onDblClick",dojo.hitch(this,this._dblClick));
dojo.connect(this.tree,"onClick",dojo.hitch(this,this._click));
dojo.connect(this.tree,"_onNodeMouseEnter",dojo.hitch(this,this._over));
dojo.connect(this.tree,"_onNodeMouseLeave",dojo.hitch(this,this._leave));
dojo.connect(this.tree,"_setSelectedNodesAttr",function(){
this._publishSelectionChanges();
}.bind(this));
this.subscribe("/davinci/review/selectionChanged","_updateActionBar");
this.subscribe("/davinci/review/resourceChanged",function(_24,_25,_26){
if(_26&&_26.timeStamp){
davinci.review.model.resource.root.findVersion(_26.timeStamp).then(function(_27){
if(_27){
this.tree.set("selectedItem",_27);
}else{
this.tree.set("selectedItems",[]);
}
this._publishSelectionChanges();
this.tree.rootNode.expand();
}.bind(this));
}
});
var _28=_4.createPopup({partID:"davinci.review.reviewNavigator",context:this,domNode:this.tree.domNode,openCallback:function(_29){
var w=dijit.getEnclosingWidget(_29.target);
if(!w||!w.item){
return;
}
this.tree.set("path",this._buildTreePath(w.item));
}.bind(this)});
var o=_4.getActionSets("davinci.review.reviewNavigator");
var _2a=o.clonedActionSets;
if(_2a&&_2a.length==1){
dojo.forEach(_2a[0].actions,dojo.hitch(this,function(_2b){
if(_2b.keyBinding){
if(!this.keyBindings){
this.keyBindings=[];
}
this.keyBindings.push({keyBinding:_2b.keyBinding,action:_2b});
}
}));
}
dojo.connect(this.tree.domNode,"onkeypress",this,"_onKeyPress");
this.infoCardContent=dojo.cache("davinci","review/widgets/templates/InfoCard.html","<div class=\"detail_title\">${detail_title}</div>\r\n<div>\r\n\t<div class=\"detail_div\"><span>${your_role}:</span><span class=\"detail_role\">${detail_role}</span><span>${due_by}:</span><span class=\"${detail_dueDate_class}\">${detail_dueDate}</span></div>\r\n\t<div class=\"detail_div\"><span>${created_by}:</span><span class=\"detail_creator\">${detail_creator}</div>\r\n\t<div class=\"detail_div\"><span>${creation_date}:</span><span class=\"detail_creationDate\">${detail_creationDate}</div>\r\n</div>\r\n<div class=\"detail_div\"><strong>${artifacts_in_rev}</strong></div>\r\n${detail_files}\r\n<div class=\"detail_div\"><strong>${reviewers}</strong></div>\r\n${detail_reviewers}");
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
this.connect(dijit._masterTT.domNode,"mouseover",function(){
if(this._delTimer){
clearTimeout(this._delTimer);
this._delTimer=null;
}
});
this.connect(dijit._masterTT.domNode,"mouseleave",function(){
this._lastAnchorNode&&this._leave();
});
dojo.subscribe("/davinci/ui/editorSelected",function(obj){
var _2c=obj.editor;
if(_2c&&_2c.editorID==="davinci.review.CommentReviewEditor"){
var _2d=_2c.resourceFile;
var _2e=_2d.parent;
dojo.forEach(this.model.root.children,function(_2f){
if(_2f!=_2e){
var _30=this.tree.getNodesByItem(_2f);
if(_30.length>0){
var _31=_30[0];
if(_31.isExpanded){
this.tree._collapseNode(_31);
}
}
}
}.bind(this));
this.tree.set("path",this._buildTreePath(_2d));
}
}.bind(this));
},_buildTreePath:function(_32){
var _33=[];
for(var _34=_32;_34;_34=_34.parent){
_33.unshift(_34);
}
return _33;
},_updateActionBar:function(_35,_36){
if(_36!=this||!_35||!_35.length){
this.closeBtn.set("disabled",true);
this.editBtn.set("disabled",true);
return;
}
var _37=_35[0].resource.elementType=="ReviewFile"?_35[0].resource.parent:_35[0].resource;
_2.reviewers=_37.reviewers||[];
var _38=_37.designerId==_2.userName;
var _39=_37.elementType=="ReviewVersion";
var _3a=_37.isDraft;
this.closeBtn.set("disabled",!_38||!_39||_37.closed||_3a);
this.openBtn.set("disabled",!_38||!_39||!_37.closedManual||_3a);
this.editBtn.set("disabled",!_38||!_39);
},getTopAdditions:function(){
var _3b=new _c({},dojo.create("div"));
var _3c=new _e({id:_3b.get("id")+".Close",showLabel:false,label:_10.closeVersion,disabled:true,iconClass:"viewActionIcon closeVersionIcon",onClick:dojo.hitch(this,"_closeVersion")});
this.closeBtn=_3c;
var _3d=new _e({id:_3b.get("id")+".Open",showLabel:false,label:_10.openVersion,disabled:true,iconClass:"viewActionIcon openVersionIcon",onClick:dojo.hitch(this,"_openVersion")});
this.openBtn=_3d;
var _3e=new _e({id:_3b.get("id")+".Edit",showLabel:false,label:_10.editVersion,disabled:true,iconClass:"viewActionIcon editVersionIcon",onClick:dojo.hitch(this,"_editVersion")});
this.editBtn=_3e;
var _3f=new _f({id:"reviewExplorerFilter",placeHolder:_10.filter,onKeyUp:dojo.hitch(this,this._filter)});
_3b.addChild(_3c);
_3b.addChild(_3d);
_3b.addChild(new dijit.ToolbarSeparator());
_3b.addChild(_3e);
dojo.place(dojo.create("br"),_3b.domNode);
_3b.addChild(_3f);
dojo.addClass(_3b.domNode,"davinciCommentExplorer");
return _3b.domNode;
},_closeVersion:function(){
(new _9()).run(this);
},_openVersion:function(){
(new _b()).run(this);
},_editVersion:function(){
(new _a()).run(this);
},_filter:function(e){
var _40=dijit.byId("reviewExplorerFilter").get("value");
this.commentingFilter.filterString=_40;
dojo.forEach(this.model.root.children,dojo.hitch(this,function(_41){
_41.getChildren(function(_42){
this.model.onChildrenChange(_41,_42);
}.bind(this));
}));
},commentingFilter:{filterString:"",filterItem:function(_43){
var _44=this.commentingFilter.filterString;
if(!_44){
return true;
}else{
if(_43.elementType=="ReviewFile"){
return _43.name.toLowerCase().indexOf(_44.toLowerCase())>=0;
}
return true;
}
}},destroy:function(){
this.inherited(arguments);
},_dblClick:function(_45){
if(_45.isDraft||_45.parent.isDraft){
if(_45.designerId==_2.userName||_45.parent.designerId==_2.userName){
this._openPublishWizard(_45.isDraft?_45:_45.parent);
}
return;
}
if(_45.elementType=="ReviewFile"){
_4.openEditor({fileName:_45,content:_45.getText()});
}
},_location:function(){
var _46=document.location.href;
var _47=_46.split("?");
var _48=_47[0].match(/http:\/\/.+:\d+\//);
return _48;
},_click:function(_49){
this._publishSelectionChanges();
},_publishSelectionChanges:function(){
var _4a=this.getSelection();
this.publish("/davinci/review/selectionChanged",[_4a,this]);
},getSelection:function(){
var _4b=dojo.map(this.tree.get("selectedItems"),function(_4c){
return {resource:_4c};
});
return _4b;
},_over:function(_4d){
if(_4d.item.elementType!="ReviewVersion"){
return;
}
if(!this._showTimer){
var _4e=_4d.item,_4f={},c;
_4f.detail_title=_4e.name;
_4f.your_role=_11.yourRole;
_4f.due_by=_11.dueBy;
_4f.created_by=_11.createdBy;
_4f.creation_date=_11.creationDate;
_4f.artifacts_in_rev=_11.artifactsInRev;
_4f.reviewers=_11.reviewers;
_4f.detail_role=(_4e.designerId==davinci.Runtime.userName)?_10.designer:_10.reviewer;
_4f.detail_dueDate=_4e.dueDate=="infinite"?_10.infinite:_8.format(_4e.dueDate,{selector:"date",formatLength:"long"});
var _50=_2.getUserDisplayNamePlusEmail({email:_4e.designerEmail,userFirstName:_4e.designerFirstName,userId:_4e.designerId,userLastName:_4e.designerLastName});
_4f.detail_creator=_50;
var _51=_7.fromISOString(_4e.timeStamp);
_4f.detail_creationDate=_8.format(_51,{formatLength:"medium"});
_4f.detail_files="";
_4e.getChildren(function(_52){
dojo.forEach(_52,function(i){
var _53=i.getLabel();
_4f.detail_files+="<div><span>"+_53.substr(0,_53.length-4)+"</span><span class='dijitTreeIcon reviewFileIcon detail_file'></span></div>";
});
_4f.detail_reviewers="";
dojo.forEach(_4e.reviewers,function(i){
if(i.email!=_4e.designerEmail){
_4f.detail_reviewers+="<div>"+i.email+"</div>";
}
});
_4e.closed?_4f.detail_dueDate_class="closed":_4f.detail_dueDate_class="notClosed";
this._showTimer=setTimeout(dojo.hitch(this,function(){
if(this._delTimer){
clearTimeout(this._delTimer);
delete this._delTimer;
}
dijit.showTooltip(dojo.string.substitute(this.infoCardContent,_4f),_4d.rowNode);
this._lastAnchorNode=_4d;
delete this._showTimer;
}),1000);
}.bind(this));
}
},_leave:function(_54){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
if(this._lastAnchorNode){
this._delTimer=setTimeout(dojo.hitch(this,function(){
dijit.hideTooltip(this._lastAnchorNode.rowNode);
delete this._delTimer;
}),1000);
}
},_openPublishWizard:function(_55){
var _56=new davinci.review.actions.PublishAction(_55);
_56.run();
},_getIconClass:function(_57,_58){
return _12(_57,_58);
},_getLabelClass:function(_59,_5a){
return getLabelClass(_59,_5a);
},_onKeyPress:function(e){
var _5b=dojo.some(this.keyBindings,dojo.hitch(this,function(_5c){
if(_2.isKeyEqualToEvent(_5c.keyBinding,e)){
davinci.Workbench._runAction(_5c.action,this,_5c.action.id);
return true;
}
}));
if(_5b){
dojo.stopEvent(e);
}
return _5b;
}});
_20.getIconClass=_12;
_20.getLabelClass=getLabelClass;
_20.getSortTransforms=_1c;
return _20;
});
