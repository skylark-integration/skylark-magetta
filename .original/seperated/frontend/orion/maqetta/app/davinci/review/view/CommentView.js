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
require({cache:{"url:davinci/review/widgets/templates/Comment.html":"<div class=\"davinciComment\">\r\n    <div dojoAttachPoint=\"mainBody\" class=\"commentBody\">\r\n        <div class=\"commentSubject\" dojoAttachPoint=\"subjectNode\"></div>\r\n        <div class=\"commentSubtitle\">\r\n            ${by}&nbsp;<span dojoAttachPoint=\"ownerName\"></span>\r\n            &nbsp;<span dojoAttachPoint=\"createTime\"></span>\r\n            <span class='editReplyBlock'>\r\n                <a class=\"commentLinkButton\" dojoAttachPoint=\"editButton\">${edit}</a>\r\n                <span class='editReplySpace'></span>\r\n                <a class=\"commentLinkButton\" dojoAttachPoint=\"replyButton\">${reply}</a>\r\n            </span>\r\n        </div>\r\n        <div class=\"commentContent\" dojoAttachPoint=\"contentNode\"></div>\r\n    </div>\r\n    <div dojoAttachPoint=\"tempForm\"></div>\r\n    <div dojoAttachPoint=\"replyRegion\" class=\"displayNone\">\r\n        <div class=\"commentReplyBar\">\r\n            <img class=\"dijitTreeExpando dijitTreeExpandoOpen commentLinkButton\" src=\"app/dojo/resources/blank.gif\" style=\"vertical-align: middle;\" dojoAttachPoint=\"imgNode\"/>\r\n            <a class=\"commentLinkButton\" dojoAttachPoint=\"replyCountButton\"></a>\r\n        </div>\r\n        <div class=\"commentReplies\" dojoAttachPoint=\"commentReplies\"></div>\r\n    </div>\r\n</div>","davinci/review/widgets/CommentForm":function(){
define("davinci/review/widgets/CommentForm",["dojo/_base/declare","dijit/_Widget","dijit/_Templated","dijit/form/TextBox","dijit/form/SimpleTextarea","dijit/Menu","dijit/MenuItem","dijit/form/Button","dijit/form/DropDownButton","dojo/i18n!./nls/widgets"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
return _1("davinci.review.widgets.CommentForm",[_2,_3],{templateString:dojo.cache("davinci","review/widgets/templates/CommentForm.html","<div class=\"davinciComment davinciComment2\">\r\n\t<div dojoAttachPoint=\"toolbarNode\"></div>\r\n\t<div dojoAttachPoint=\"subjectNode\" class=\"commentSubjectEdit\"></div>\r\n\t<div dojoAttachPoint=\"contentNode\" class=\"contentNode\">\r\n\t<span dojoAttachPoint=\"placeHolder\" style=\"padding:3px 0 0 2px;\" class=\"dijitPlaceHolder dijitInputField\">${comment}</span>\r\n\t</div>\r\n\t<div class=\"submitCancelDiv\">\r\n\t\t<div dojoAttachPoint=\"submitNode\"></div>\r\n\t\t<a dojoAttachPoint=\"cancelNode\" class=\"commentLinkButton\" class=\"cancelLink\">${buttonCancel}</a>\r\n\t</div>\r\n</div>\r\n"),postMixInProperties:function(){
this.inherited(arguments);
this.comment=_a.comment;
this.buttonCancel=_a.buttonCancel;
},postCreate:function(){
this.subject=new _4({placeHolder:_a.subjectPlaceHolder,style:"width: 100%"},this.subjectNode);
this.content=new _5({rows:4,style:"width: 100%; margin: 2px 0px 2px 0px;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:100%;"},dojo.create("div"));
this.contentNode.appendChild(this.content.domNode);
var _b=new _8({label:_a.submit,onClick:dojo.hitch(this,"_submit")},this.submitNode);
this.replyTo="root";
this.connect(this.cancelNode,"click","hide");
this.connect(this.content,"onFocus","hidePlaceHolder");
this.connect(this.content,"onBlur","showPlaceHolder");
this.connect(this.placeHolder,"click",function(){
this.hidePlaceHolder();
this.content.focus();
});
var _c=this._getActions();
var tb=dojo.create("span",{style:{display:"inline-block"}},this.toolbarNode);
var _d=this._toolbar=davinci.Workbench._createToolBar("toolbarPath",tb,_c,this);
dojo.style(_d.domNode,{"display":"inline-block"});
dojo.subscribe("/davinci/review/drawing/selectshape",this,function(_e,_f){
this._updateToolbarEnablement();
}.bind(this));
dojo.subscribe("/davinci/review/drawing/deselectshape",this,function(_10,_11){
this._updateToolbarEnablement();
}.bind(this));
},_updateToolbarEnablement:function(){
var _12=this._toolbar.getChildren();
dojo.forEach(_12,function(_13){
var _14=_13._maqAction;
if(_14&&_14.action&&_14.action.isEnabled){
var _15=_14.action.isEnabled();
_13.set("disabled",!_15);
}
});
},_getActions:function(){
var _16=[];
var _17=davinci.Runtime.getExtensions("davinci.annotationActions",function(ext){
_16.push(ext.editorContribution);
return true;
});
return _16;
},hide:function(){
this.isShowing=false;
this.onHide();
dojo.style(this.domNode,"display","none");
this.reset();
dojo.publish("/davinci/review/view/closeComment",[]);
},onHide:function(){
},show:function(){
this.isShowing=true;
this.onShow();
dojo.style(this.domNode,"display","block");
dojo.window.scrollIntoView(this.domNode);
dojo.publish("/davinci/review/view/openComment",[]);
this._updateToolbarEnablement();
},onShow:function(){
},_submit:function(){
var _18=this.subject.get("value"),_19=this.content.get("value").replace(/\n/g,"<br/>"),_1a=this._update?"onUpdate":"onSubmit";
this[_1a]({subject:_18,content:_19});
},onSubmit:function(_1b){
},onUpdate:function(_1c){
},reset:function(){
dojo.style(this.subject.domNode,"display","block");
this.placeHolder.innerHTML=_a.comment;
this.showPlaceHolder();
this.subject.set("value","");
this.content.set("value","");
this.replyTo="root";
this.placeAt(this.parentNode,"first");
this._update=false;
this.isShowing=false;
this.editFrom=null;
},showPlaceHolder:function(){
if(this.content.get("value")==""){
dojo.removeClass(this.placeHolder,"davinciReviewHide");
}
},hidePlaceHolder:function(){
dojo.addClass(this.placeHolder,"davinciReviewHide");
},setReplyMode:function(){
dojo.style(this.subject.domNode,"display","none");
this.placeHolder.innerHTML=_a.commentReply;
},setEditMode:function(){
this._update=true;
},moveTo:function(_1d){
if(!this.parentNode){
this.parentNode=_1d;
}
this.placeAt(_1d);
}});
});
},"davinci/review/Review":function(){
define("davinci/review/Review",["davinci/Runtime","./Color"],function(_1e,_1f){
return {getColor:function(_20){
var _21;
dojo.some(_1e.reviewers,function(_22,n){
if(_22.name==_20){
_21=n;
return true;
}
return false;
});
return _1f.colors[_21];
}};
});
},"davinci/review/Color":function(){
define({colors:["firebrick","darkblue","darkgreen","purple","darkorange","darkgoldenrod","brown","darkgrey","darkcyan","deeppink"]});
},"davinci/review/widgets/Comment":function(){
define(["dojo/_base/declare","davinci/XPathUtils","davinci/maqetta/AppStates","davinci/review/Review","davinci/Runtime","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/Menu","dijit/MenuItem","dijit/form/DropDownButton","dojo/date/locale","dojo/date/stamp","dojo/Deferred","dojo/i18n!./nls/widgets","dojo/text!./templates/Comment.html"],function(_23,_24,_25,_26,_27,_28,_29,_2a,_2b,_2c,_2d,_2e,_2f,_30,_31){
var _32=_25.prototype;
var _33=function(_34,_35,_36){
var _37=_34.getTime()-_35.getTime();
var _38=_37<0?"ago":"later";
var day,_39,min,_3a;
_37=Math.floor(Math.abs(_37)/1000);
if(_37<=60){
return "just now";
}
if(_36&&_37>_36){
return _2d.format(_34,{formatLength:"short",selector:"date"});
}
_3a=_37%60;
_37=Math.floor(_37/60);
min=_37%60;
_37=Math.floor(_37/60);
_39=_37%24;
_37=Math.floor(_37/24);
day=_37;
var _3b=day?day+" days ":_39?_39+" hours ":min?min+" mins ":"";
return _3b+_38;
};
return _23("davinci.review.widgets.Comment",[_28,_29],{templateString:_31,postMixInProperties:function(){
this.inherited(arguments);
dojo.mixin(this,_30);
},VISIBLE_PART_LENGTH:80,postCreate:function(){
this._createdPromise=new _2f();
if(!this.existed){
dojo.xhrGet({url:"cmd/addComment",handleAs:"json",content:{id:this.commentId,subject:this.subject,content:this.content,ownerId:this.ownerId,email:this.email,previous:this.previous,next:this.next,pageState:this.pageState,pageStateList:this.pageStateList?dojo.toJson(this.pageStateList):"",viewScene:this.viewScene,viewSceneList:this.viewSceneList?dojo.toJson(this.viewSceneList):"",designerId:this.designerId,pageName:this.pageName,replyTo:this.replyTo||"root",drawingJson:this.drawingJson},error:dojo.hitch(this,function(_3c){
dojo.publish("/davinci/review/commentAddedError",[this]);
var msg=_3c.responseText;
msg=msg.substring(msg.indexOf("<title>")+7,msg.indexOf("</title>"));
davinci.Runtime.handleError(dojo.string.substitute(_30.errorAddingCom,[_3c,msg]));
})}).then(dojo.hitch(this,function(_3d){
this.created=_3d.created;
this._populate(this);
this._createdPromise.resolve(this.created);
}.bind(this)));
}else{
this._populate(this);
this._createdPromise.resolve(this.created);
}
this.comments=[];
this.collapsed=false;
this.enabled=true;
this.focused=false;
var _3e=this.color=_26.getColor(this.ownerId);
this.subjectNode.innerHTML=this.subject;
dojo.style(this.subjectNode,"color",_3e);
var _3f=_27.getUserDisplayName({email:this.email,userId:this.ownerId});
this.ownerName.innerHTML=_3f;
dojo.style(this.ownerName,"color",_3e);
this.contentNode.innerHTML=this.content;
this._ajustLengthOfCommentContent(true);
if(this.isReply()){
dojo.addClass(this.subjectNode,"displayNone");
}
this.connect(this.imgNode,"click","_toggleReplies");
this.connect(this.replyCountButton,"click","_toggleReplies");
this.connect(this.editButton,"click","_editComment");
this.connect(this.replyButton,"click","_newReply");
this.connect(this.mainBody,"click","focusComment");
this.connect(this.mainBody,"dblclick","_editComment");
if(this.closed){
dojo.style(this.editButton,"display","none");
dojo.style(this.replyButton,"display","none");
}
if(davinci.Runtime.userName!=this.ownerId){
dojo.style(this.editButton,"display","none");
}
},getCreated:function(){
var _40=new _2f();
this._createdPromise.then(function(_41){
_40.resolve(_41);
});
return _40;
},refresh:function(){
dojo.style(this.editButton,"display","inline");
dojo.style(this.replyButton,"display","inline");
if(this.closed){
dojo.style(this.editButton,"display","none");
dojo.style(this.replyButton,"display","none");
}
if(davinci.Runtime.userName!=this.ownerId){
dojo.style(this.editButton,"display","none");
}
},_populate:function(_42){
this.createdFormatted=_2e.fromISOString(_42.created);
this.createTime.innerHTML=_33(this.createdFormatted,new Date(),604800);
},update:function(arg){
this.subjectNode.innerHTML=this.subject;
this.contentNode.innerHTML=this.content;
this._ajustLengthOfCommentContent(true);
dojo.xhrGet({url:"cmd/updateComment",handleAs:"json",content:{id:this.commentId,designerId:this.designerId,subject:this.subject,content:this.content,pageState:this.pageState,pageStateList:this.pageStateList?dojo.toJson(this.pageStateList):"",viewScene:this.viewScene,viewSceneList:this.viewSceneList?dojo.toJson(this.viewSceneList):"",drawingJson:this.drawingJson},error:function(_43){
var msg=_43.responseText;
msg=msg.substring(msg.indexOf("<title>")+7,msg.indexOf("</title>"));
davinci.Runtime.handleError(dojo.string.substitute(_30.errorUpdateCom,[_43,msg]));
}});
},_editComment:function(){
if(this.isDisabled){
return;
}
this.onEditComment({commentId:this.commentId});
},onEditComment:function(_44){
},_newReply:function(){
if(this.isDisabled){
return;
}
this.onNewReply({replyTo:this.commentId,subject:"Re: "+this.subject});
},onNewReply:function(_45){
},isReply:function(){
return this.replyTo!="root";
},isPageOwner:function(){
return this.designerId==davinci.Runtime.userName;
},appendReply:function(_46){
this.comments.push(_46);
_46.placeAt(this.commentReplies);
if(dojo.hasClass(this.replyRegion,"displayNone")){
dojo.removeClass(this.replyRegion,"displayNone");
}
var len=this.getReplies().length;
this.replyCountButton.innerHTML=len+(len==1?" Reply":" Replies");
},getReplies:function(){
return this.comments;
},_toggleReplies:function(){
if(this.collapsed){
this.expand();
}else{
this.collapse();
}
},collapse:function(all){
if(all){
var _47=this.getReplies();
dojo.forEach(_47,function(_48){
_48.collapse(all);
});
}
if(!this.collapsed){
dojo.removeClass(this.imgNode,"dijitTreeExpandoOpen");
dojo.addClass(this.imgNode,"dijitTreeExpandoClosed");
dojo.addClass(this.commentReplies,"displayNone");
}
this.collapsed=true;
},expand:function(all){
if(all){
var _49=this.getReplies();
dojo.forEach(_49,function(_4a){
_4a.expand(all);
});
}
if(this.collapsed){
dojo.removeClass(this.imgNode,"dijitTreeExpandoClosed");
dojo.addClass(this.imgNode,"dijitTreeExpandoOpen");
dojo.removeClass(this.commentReplies,"displayNone");
}
this.collapsed=false;
},focusComment:function(evt){
if(this.isDisabled){
return;
}
if(this.isFocused&&evt&&(evt.ctrlKey||evt.metaKey)){
this.blurComment();
}else{
this.onCommentFocus(this,evt);
dojo.addClass(this.mainBody,"commentFocused");
this.isFocused=true;
}
},onCommentFocus:function(_4b){
},blurComment:function(_4c){
if(!_4c){
this.onCommentBlur(this);
}
dojo.removeClass(this.mainBody,"commentFocused");
this.isFocused=false;
},onCommentBlur:function(_4d){
},_ajustLengthOfCommentContent:function(_4e){
var _4f=this.content;
if(_4f.length<=this.VISIBLE_PART_LENGTH){
var _50=dojo.query("a",this.contentNode);
if(_50.length>0){
this.contentNode.removeChild(_50[0]);
}
return;
}
var _51=_4e?_30.more:_30.commentHide;
var _52=dojo.create("a",{"class":"commentLinkButton",innerHTML:_51,onclick:dojo.hitch(this,"_ajustLengthOfCommentContent",!_4e)});
if(_4f){
if(_4e){
this.contentNode.innerHTML=_4f.substring(0,this.VISIBLE_PART_LENGTH);
}else{
this.contentNode.innerHTML=_4f;
}
this.contentNode.appendChild(_52);
}
},hide:function(){
dojo.style(this.mainBody,"display","none");
},show:function(){
dojo.style(this.mainBody,"display","block");
dojo.window.scrollIntoView(this.domNode);
},enable:function(){
dojo.removeClass(this.domNode,"disabled");
dojo.removeClass(this.mainBody,"commentBodyDisabled");
dojo.style(this.subjectNode,"color",this.color);
dojo.style(this.ownerName,"color",this.color);
this.isDisabled=false;
},disable:function(){
dojo.addClass(this.domNode,"disabled");
dojo.removeAttr(this.mainBody,"style");
dojo.addClass(this.mainBody,"commentBodyDisabled");
dojo.style(this.subjectNode,"color","");
dojo.style(this.ownerName,"color","");
this.isDisabled=true;
},getBody:function(){
return this.mainBody;
},setStatesScenes:function(){
var e=davinci.Workbench.getOpenEditor();
var ctx=(e&&e.getContext)?e.getContext():null;
var _53=ctx?ctx.rootNode:null;
var doc=_53&&_53.ownerDocument;
if(doc){
if(this.pageStateList){
for(var i=this.pageStateList.length-1;i>-0;i--){
var o=this.pageStateList[i];
var _54=o.id?doc.getElementById(o.id):null;
if(!_54&&o.xpath){
var _55=_24.toCssPath(o.xpath);
_54=doc.querySelector(_55);
}
if(_54){
_32.setState(o.state,_54,{updateWhenCurrent:true});
}
}
}
if(this.viewSceneList&&ctx.sceneManagers){
for(var _56 in this.viewSceneList){
var sm=ctx.sceneManagers[_56];
if(sm){
var _57=this.viewSceneList[_56];
for(var j=_57.length-1;j>=0;j--){
var o=_57[j];
var _58=o.scId?doc.getElementById(o.scId):null;
if(!_58&&o.scXpath){
var _55=_24.toCssPath(o.scXpath);
_58=doc.querySelector(_55);
}
if(_58&&o.sceneId){
sm.selectScene({sceneContainerNode:_58,sceneId:o.sceneId});
}
}
}
}
}
}
}});
});
}}});
define("davinci/review/view/CommentView",["dojo/_base/declare","davinci/Workbench","davinci/Runtime","davinci/maqetta/AppStates","davinci/review/Review","davinci/workbench/ViewPart","davinci/review/widgets/Comment","davinci/review/widgets/CommentForm","dijit/form/Button","dijit/form/TextBox","dijit/form/DropDownButton","dijit/Toolbar","dijit/ToolbarSeparator","dijit/CheckedMenuItem","dijit/MenuSeparator","dijit/Dialog","dijit/Menu","dojo/fx","dojo/i18n!./nls/view","dojo/i18n!davinci/workbench/nls/workbench"],function(_59,_5a,_5b,_5c,_5d,_5e,_5f,_60,_61,_62,_63,_64,_65,_66,_67,_68,_69,_6a,_6b,_6c){
var _6d=_5c.prototype;
var _6e=function(){
var _6f="";
for(var i=1;i<=32;i++){
var n=Math.floor(Math.random()*16).toString(16);
_6f+=n;
if((i==8)||(i==12)||(i==16)||(i==20)){
_6f+="-";
}
}
return _6f;
};
return _59("davinci.review.view.CommentView",_5e,{interval:33554432,id:0,postCreate:function(){
this.inherited(arguments);
this._cached={};
this._cached.indices={};
this.comments=[];
this.commentIndices={"root":this};
this._commentConns=[];
this.container=new dijit.layout.ContentPane();
this.commentReplies=this.container.domNode;
dojo.attr(this.commentReplies,"tabindex","0");
this.setContent(this.container);
this.attachToolbar();
this._initCommentForm();
this.connect(this.commentReplies,"keydown",function(evt){
var _70=this;
var _71=function(_72){
if(_70.commentIsActive(_72)){
_72.enable();
}else{
_72.disable();
}
var _73=_72.getReplies();
if(_73.length>0){
dojo.forEach(_73,_71);
}
};
if(!this._currentPage){
return;
}
if(evt.keyCode==dojo.keys.CTRL||evt.keyCode==dojo.keys.META){
var _74=this._cached[this._currentPage].focusedComments;
if(_74.length>0){
var _75=this.commentIndices[_74[0]].pageState;
dojo.forEach(this.comments,_71);
}
}
});
this.connect(this.commentReplies,"keyup",function(evt){
if(evt.keyCode==dojo.keys.CTRL||evt.keyCode==dojo.keys.META){
var _76=function(_77){
_77.enable();
var _78=_77.getReplies();
if(_78.length>0){
dojo.forEach(_78,_76);
}
};
dojo.forEach(this.comments,_76);
}
});
this.connect(this.commentReplies,"click",function(evt){
if(evt.target!==this.commentReplies){
return;
}
this._blurAllComments();
});
dojo.subscribe("/davinci/review/view/canvasFocused",this,function(){
this._blurAllComments();
});
dojo.subscribe("/davinci/review/resourceChanged",this,function(_79,_7a,_7b){
if(_7a!="open"&&_7a!="closed"||!this._currentPage){
return;
}
if(this._currentPage.split("/")[2]==_7b.timeStamp){
this._versionClosed=_7a=="closed";
}
dijit.byId("davinciReviewToolbar.Add").set("disabled",this._versionClosed);
dijit.byId("davinciReviewToolbar.Reviewers").set("disabled",false);
dojo.publish(this._currentPage+"/davinci/review/drawing/addShape",["[]",true]);
this._destroyCommentWidgets();
this._render();
var _7c=this._cached[this._currentPage].pageState,_7d=this._cached[this._currentPage].pageStateList,_7e=this._cached[this._currentPage].viewScene||this._getCurrentScene().s,_7f=this._cached[this._currentPage].viewSceneList||this._context.getCurrentScenes();
dojo.publish(this._currentPage+"/davinci/review/drawing/filter",[{},[]]);
});
dojo.subscribe("/davinci/review/context/loaded",this,function(_80,_81){
_80._commentView=this;
this._context=_80;
var _82=dojo.window.get(_80.containerNode.ownerDocument);
var _83=_80.resourceFile.parent.designerId;
this._loadCommentData(_83,_81);
if(_5a.getOpenEditor()===_80.containerEditor){
this._currentPage=_81;
this._cached[this._currentPage].context=_80;
this._destroyCommentWidgets();
setTimeout(function(){
this._render();
this._updateToolbar({editor:_80});
this._reviewFilterChanged();
var _84=this._context.rootNode;
var _85=this._context.getCurrentStates();
var _86=this._getCurrentScene().s;
var _87=this._context.getCurrentScenes();
dojo.publish(this._currentPage+"/davinci/review/drawing/filter",[{},[]]);
}.bind(this),100);
}
if(_82&&_82.require){
var _88=_82.require("dojo/_base/connect");
_88.subscribe("/maqetta/appstates/state/changed",this,function(_89){
if(!_5b.currentEditor||_5b.currentEditor.editorID!="davinci.review.CommentReviewEditor"){
return;
}
if(!this._cached||!this._currentPage||!this._cached[this._currentPage]){
return;
}
var _8a=_89.newState||"Normal";
this._cached[this._currentPage].pageState=_8a;
var _8b=this._cached[this._currentPage].pageStateList=this._context.getCurrentStates();
var _8c=this._cached[this._currentPage].viewScene=this._getCurrentScene().s;
var _8d=this._cached[this._currentPage].viewSceneList=this._context.getCurrentScenes();
dojo.publish(this._currentPage+"/davinci/review/drawing/filter",[{},[]]);
});
}
this.updateStatesScenes();
});
dojo.subscribe("/davinci/ui/editorSelected",this,function(_8e){
var _8f=this._editor=_8e.editor;
if(_8e.oldEditor&&_8e.oldEditor.basePath){
if(this._commentForm.isShowing){
var _90={commentId:this._commentForm.commentId,replyTo:this._commentForm.replyTo,subject:this._commentForm.subject.get("value"),content:this._commentForm.content.get("value").replace(/\n/g,"<br/>"),editFrom:this._commentForm.editFrom};
this._setPendingEditComment(_8e.oldEditor,_90);
}else{
this._setPendingEditComment(_8e.oldEditor,null);
}
}
if(_8f&&_8f.basePath){
this._currentPage=_8f.basePath.path;
this._commentForm.hide();
this._destroyCommentWidgets();
this._updateToolbar(_8e);
this._render();
var _91=this._cached[this._currentPage]&&this._cached[this._currentPage].focusedComments;
if(_91){
dojo.forEach(_91,dojo.hitch(this,function(_92){
this.commentIndices[_92].focusComment({ctrlKey:true,metaKey:true,silent:true});
}));
}
if(this._cached[this._currentPage]&&this._cached[this._currentPage].editComment){
var _93=this._commentForm,_94=this._cached[this._currentPage].editComment;
_93.reset();
_93.commentId=_94.commentId;
_93.subject.set("value",_94.subject);
_93.content.set("value",_94.content.replace(/<br\/>/g,"\n"));
if(_94.content){
_93.hidePlaceHolder();
}
var _95;
if(_94.replyTo!=="root"){
_93.setReplyMode();
_93.replyTo=_94.replyTo;
_95=this.commentIndices[_94.replyTo];
_93.moveTo(_95.tempForm);
var _96=_95;
while(_96&&_96.expand){
_96.expand();
_96=this.commentIndices[_96.replyTo];
}
dojo.window.scrollIntoView(_95.domNode);
}
if(_94.editFrom){
_93.setEditMode();
_95=this.commentIndices[_94.editFrom];
_95.hide();
_93.moveTo(_95.tempForm);
dojo.window.scrollIntoView(_95.domNode);
}
_93.show();
}
}
if(!_8f||_8f.editorID!="davinci.review.CommentReviewEditor"){
this._resetCommentView();
this._currentPage=null;
}else{
this._versionClosed=_8f.resourceFile.parent.closed;
}
});
dojo.subscribe("/davinci/review/drawing/annotationSelected",this,function(_97,_98){
var _99=this.commentIndices[_97];
var _9a=this._cached[this._currentPage].focusedComments;
if(_99&&!_99.isFocused||_9a.length>1){
var _9b=this.commentIndices[_99.replyTo];
while(_9b&&_9b.expand){
_9b.expand();
_9b=this.commentIndices[_9b.replyTo];
}
dojo.window.scrollIntoView(_99.domNode);
_99.focusComment();
this._flash(_99.getBody());
}else{
if(_99){
_99.blurComment();
}
}
});
dojo.subscribe("/davinci/review/commentAddedError",this,this._onErrorCreateNewComment);
},_getCurrentScene:function(){
var _9c=this._context.sceneManagers;
var _9d;
for(var _9e in _9c){
var sm=_9c[_9e];
if(sm.getCurrentScene){
_9d=sm.getCurrentScene();
if(_9d){
break;
}
}
}
return {sm:sm,s:_9d};
},_setPendingEditComment:function(_9f,_a0){
var key=null;
if(typeof _9f==="string"){
key=_9f;
}else{
if(_9f.basePath&&_9f.basePath.path){
key=_9f.basePath.path;
}
}
if(key){
var _a1=this._cached[key];
if(_a1){
_a1.editComment=_a0;
}
}
},_resetCommentView:function(){
dijit.byId("davinciReviewToolbar.Add").set("disabled",true);
dijit.byId("davinciReviewToolbar.Reviewers").set("disabled",true);
this._commentForm.hide();
this._destroyCommentWidgets();
},_initCommentForm:function(){
var _a2=this._commentForm=new _60({onSubmit:dojo.hitch(this,"_onCreateNewComment"),onUpdate:dojo.hitch(this,"_onUpdateComment"),onShow:dojo.hitch(this,"_onCommentFormShown")});
this.connect(_a2.cancelNode,"click","_onCommentFormCancel");
_a2.moveTo(this.container.domNode);
_a2.hide();
},_onCommentFormShown:function(){
},_onErrorCreateNewComment:function(_a3){
var _a4=this._cached[this._currentPage];
var _a5;
for(var i=0;i<_a4.length;i++){
if(_a4[i]&&_a4[i].id==_a3.commentId){
_a5=i;
}
_a4[i]._hasPopulate=false;
}
if(_a5){
_a4.splice(_a5,1);
}
delete this._cached.indices[_a3.commentId];
this._destroyCommentWidgets();
dojo.publish(this._currentPage+"/davinci/review/drawing/addShape",["[]",true]);
this._render();
},_onCreateNewComment:function(_a6){
var _a7=this._commentForm,_a8=this._cached[this._currentPage]||[];
var _a9=this._cached[this._currentPage].context.rootNode;
dojo.publish(this._currentPage+"/davinci/review/drawing/getShapesInEditing",[this,{state:this._cached[this._currentPage].pageState,stateList:this._cached[this._currentPage].pageStateList,scene:(this._cached[this._currentPage].viewScene||this._getCurrentScene().s),sceneList:(this._cached[this._currentPage].viewSceneList||this._context.getCurrentScenes())}]);
var _aa=new _5f({commentId:_a7.commentId,subject:_a6.subject,content:_a6.content,designerId:this._getDesignerId(),pageName:this._currentPage,pageState:this._cached[this._currentPage].pageState,pageStateList:this._cached[this._currentPage].pageStateList,viewScene:this._cached[this._currentPage].viewScene||this._getCurrentScene().s,viewSceneList:this._cached[this._currentPage].viewSceneList||this._context.getCurrentScenes(),ownerId:_5b.userName,email:_5b.userEmail,replyTo:_a7.replyTo,drawingJson:this.drawingJson});
this._commentConns.push(dojo.connect(_aa,"onNewReply",this,"_onNewReply"),dojo.connect(_aa,"onEditComment",this,"_onEditComment"),dojo.connect(_aa,"onCommentFocus",this,"_onCommentFocus"),dojo.connect(_aa,"onCommentBlur",this,"_onCommentBlur"));
this.commentIndices[_aa.commentId]=_aa;
_a7.hide();
var _ab=this.commentIndices[_aa.replyTo];
_ab.appendReply(_aa);
if(_ab.expand){
_ab.expand();
}
dojo.window.scrollIntoView(_aa.domNode);
_aa.focusComment();
this._flash(_aa.getBody());
var _ac={id:_aa.commentId,subject:_aa.subject,content:_aa.content,pageName:_aa.pageName,pageState:_aa.pageState,pageStateList:_aa.pageStateList,viewScene:_aa.viewScene,viewSceneList:_aa.viewSceneList,ownerId:_aa.ownerId,email:_aa.email,depth:_aa.depth,replyTo:_aa.replyTo,drawingJson:_aa.drawingJson};
_a8.push(_ac);
this._cached.indices[_ac.id]=_ac;
_aa.getCreated().then(function(_ad){
_ac.created=_ad;
});
},_onUpdateComment:function(_ae){
var _af=this._commentForm,_b0=this.commentIndices[_af.commentId];
dojo.publish(this._currentPage+"/davinci/review/drawing/getShapesInEditing",[this,{state:this._cached[this._currentPage].pageState,stateList:this._cached[this._currentPage].pageStateList,scene:(this._cached[this._currentPage].viewScene||this._getCurrentScene().s),sceneList:(this._cached[this._currentPage].viewSceneList||this._context.getCurrentScenes())}]);
_b0.subject=_ae.subject;
_b0.content=_ae.content;
_b0.pageState=this._cached[this._currentPage].pageState;
_b0.pageStateList=this._cached[this._currentPage].pageStateList;
_b0.viewScene=this._cached[this._currentPage].viewScene||this._getCurrentScene().s;
_b0.viewSceneList=this._cached[this._currentPage].viewSceneList||this._context.getCurrentScenes();
_b0.drawingJson=this.drawingJson;
_af.hide();
_b0.update();
_b0.show();
this._flash(_b0.getBody());
var _b1=this._cached.indices[_b0.commentId];
_b1.subject=_b0.subject;
_b1.content=_b0.content;
_b1.pageState=_b0.pageState;
_b1.pageStateList=_b0.pageStateList;
_b1.viewScene=_b0.viewScene;
_b1.viewSceneList=_b0.viewSceneList;
_b1.drawingJson=_b0.drawingJson;
},_loadCommentData:function(_b2,_b3){
this._cached[_b3]=_5b.serverJSONRequest({url:"cmd/getComments",sync:true,content:{ownerId:_b2,pageName:_b3}}).sort(function(c1,c2){
return c1.created>c2.created?1:c1.created<c2.created?-1:0;
});
for(var i=0;i<this._cached[_b3].length;i++){
var _b4=this._cached[_b3][i];
_b4.pageStateList=(_b4.hasOwnProperty("pageStateList")&&_b4.pageStateList)?dojo.fromJson(_b4.pageStateList):[];
_b4.viewSceneList=(_b4.hasOwnProperty("viewSceneList")&&_b4.viewSceneList)?dojo.fromJson(_b4.viewSceneList):[];
}
this._cached[_b3].pageState="Normal";
this._cached[_b3].pageStateList=this._context.getCurrentStates();
this._cached[_b3].viewSceneList=this._context.getCurrentScenes();
this._cached[_b3].focusedComments=[];
},_destroyCommentWidgets:function(){
var _b5=this.comments;
dojo.forEach(_b5,function(_b6){
_b6.destroyRecursive();
});
this.comments=[];
dojo.forEach(this._commentConns,dojo.disconnect);
this._commentConns=[];
},_render:function(){
var _b7=this._cached[this._currentPage];
dojo.forEach(_b7,function(_b8,i){
var _b9=new _5f({commentId:_b8.id,subject:_b8.subject,content:_b8.content,designerId:_b8.designerId,pageName:this._currentPage,pageState:_b8.pageState,pageStateList:_b8.pageStateList,viewScene:_b8.viewScene,viewSceneList:_b8.viewSceneList,ownerId:_b8.ownerId,email:_b8.email,created:_b8.created,parent:this,existed:true,replyTo:_b8.replyTo,drawingJson:_b8.drawingJson,closed:this._versionClosed});
this._cached.indices[_b8.id]=_b8;
this.commentIndices[_b9.commentId]=_b9;
this.commentIndices[_b9.replyTo].appendReply(_b9);
this._commentConns.push(dojo.connect(_b9,"onNewReply",this,"_onNewReply"),dojo.connect(_b9,"onEditComment",this,"_onEditComment"),dojo.connect(_b9,"onCommentFocus",this,"_onCommentFocus"),dojo.connect(_b9,"onCommentBlur",this,"_onCommentBlur"));
if(i===0){
dojo.style(_b9.domNode,"borderTop","none");
}
if(!_b8._hasPopulate){
dojo.publish(this._currentPage+"/davinci/review/drawing/addShape",[_b9.drawingJson]);
_b8._hasPopulate=true;
}
},this);
dojo.forEach(this.comments,function(_ba){
_ba.collapse(true);
});
},_onEditComment:function(_bb){
var _bc=this._commentForm,_bd=this.commentIndices[_bb.commentId];
if(_bd.ownerId!=_5b.userName){
return;
}
if(_bc.isShowing){
this._onCommentFormCancel();
}
_bc.reset();
_bc.commentId=_bb.commentId;
_bc.subject.set("value",_bd.subject);
_bc.content.set("value",_bd.content.replace(/<br\/>/g,"\n"));
if(_bd.content){
_bc.hidePlaceHolder();
}
_bc.setEditMode();
if(_bd.isReply()){
_bc.setReplyMode();
}
_bc.replyTo=_bd.replyTo;
_bd.hide();
_bc.moveTo(_bd.tempForm);
_bc.editFrom=_bb.commentId;
_bc.show();
dojo.publish(this._currentPage+"/davinci/review/drawing/enableEditing",[_5b.userName,_bc.commentId,{pageState:_bd.pageState,pageStateList:_bd.pageStateList,viewScene:_bd.viewScene,viewSceneList:_bd.viewSceneList}]);
},_onNewReply:function(_be){
var _bf=this._commentForm;
if(_bf.isShowing){
this._onCommentFormCancel();
}
_bf.reset();
_bf.commentId=_6e();
_bf.setReplyMode();
_bf.replyTo=_be.replyTo;
_bf.subject.set("value",_be.subject);
var _c0=this.commentIndices[_be.replyTo];
_bf.moveTo(_c0.tempForm);
_bf.show();
dojo.publish(this._currentPage+"/davinci/review/drawing/enableEditing",[_5b.userName,_bf.commentId,{pageState:this._cached[this._currentPage].pageState,pageStateList:this._cached[this._currentPage].pageStateList,viewScene:this._cached[this._currentPage].viewScene,viewSceneList:this._cached[this._currentPage].viewSceneList}]);
},_onCommentFocus:function(_c1,evt){
var _c2=this._cached[this._currentPage].focusedComments;
if(!evt||(!evt.ctrlKey&&!evt.metaKey)){
dojo.forEach(_c2,function(_c3){
this.commentIndices[_c3].blurComment(true);
},this);
_c2.length=0;
_c2.push(_c1.commentId);
var _c4=this.commentIndices[_c1.commentId];
_c4.setStatesScenes();
}else{
if(evt.ctrlKey||evt.metaKey){
if(!dojo.some(_c2,function(_c5){
return _c5==_c1.commentId;
})){
_c2.push(_c1.commentId);
var _c4=this.commentIndices[_c1.commentId];
_c4.setStatesScenes();
}
}
}
if(!evt||!evt.silent){
if(this._editor){
var _c6=this._editor.getContext();
var _c7=(_c6&&_c6.rootNode&&_c6.rootNode.ownerDocument&&_c6.rootNode.ownerDocument.defaultView&&_c6.rootNode.ownerDocument.defaultView.davinci&&_c6.rootNode.ownerDocument.defaultView.davinci.states);
if(_c7){
_c7.setState(_c1.pageState);
}
}
var _c8;
var _c9=this._getCurrentScene();
if(_c9&&_c9.sm&&_c9.sm.selectScene&&_c1.viewScene){
_c9.sm.selectScene({sceneId:_c1.viewScene});
_c8=_c1.viewScene;
}
this.publish(this._currentPage+"/davinci/review/drawing/filter",[{},_c2]);
}
},_onCommentBlur:function(_ca){
var _cb=this._cached[this._currentPage].focusedComments;
for(var i=0;i<_cb.length;i++){
if(_cb[i]==_ca.commentId){
if(i==_cb.length-1){
_cb.pop();
}else{
_cb[i]=_cb.pop();
}
}
}
var _cc=this._cached[this._currentPage].viewScene||this._getCurrentScene().s;
this.publish(this._currentPage+"/davinci/review/drawing/filter",[{},_cb]);
this.publish(this._currentPage+"/davinci/review/drawing/filter",[{pageState:this._cached[this._currentPage].pageState,viewScene:_cc},_cb]);
},_onCommentFormCancel:function(){
dojo.publish(this._currentPage+"/davinci/review/drawing/cancelEditing",[]);
var dim=this._cached[this._currentPage],_cd=dim.pageState,_ce=dim.pageStateList,_cf=dim.viewScene,_d0=dim.viewSceneList,_d1=dim.focusedComments;
if(_d1.length>0){
this.commentIndices[_d1[0]].show();
}
dojo.publish(this._currentPage+"/davinci/review/drawing/filter",[{},_d1]);
},_updateToolbar:function(_d2){
dijit.byId("davinciReviewToolbar.Add").set("disabled",this._versionClosed);
dijit.byId("davinciReviewToolbar.Reviewers").set("disabled",false);
var _d3=_d2.editor;
if(_d3&&_d3.resourceFile){
var _d4=_d3.resourceFile.parent;
var _d5=_d4.reviewers;
var _d6=this._cached[this._currentPage];
dojo.forEach(_d6,function(_d7){
if(!dojo.some(_d5,function(_d8){
return _d8.email==_d7.email;
})&&_5b.userName!=_d4.name){
_d5.push({name:_d7.ownerId,email:_d7.email});
}
});
var _d9=this.reviewerList.getChildren();
for(var i=2;i<_d9.length;i++){
_d9[i].destroy();
}
_5b.reviewers=_d5;
dojo.forEach(_d5,dojo.hitch(this,function(_da,_db){
if(_da.name){
var _dc=_5b.getUserDisplayName({email:_da.email,userId:_da.name});
var _dd=new _66({label:"<div class='davinciReviewToolbarReviewersColor' style='background-color:"+_5d.getColor(_da.name)+";'></div><span>"+_dc+"</span>",onChange:dojo.hitch(this,function(){
this._reviewFilterChanged();
this._reviewersBtn.openDropDown();
}),checked:true,reviewer:_da,title:_da.email});
this.reviewerList.addChild(_dd);
if(this._cached[this._currentPage]&&this._cached[this._currentPage].shownColors){
var _de=dojo.some(this._cached[this._currentPage].shownColors,function(_df){
if(_df==_da.name){
return true;
}
return false;
});
_dd.set("checked",_de);
}
}
}));
this._reviewFilterChanged();
}
},getTopAdditions:function(){
this.category="content";
var _e0=new _62({id:"filterText",placeHolder:_6b.filter});
dojo.connect(_e0.domNode,"onkeyup",this,function(e){
this._filter();
dojo.stopEvent(e);
});
var _e1=new _64({id:"davinciReviewToolbar"},dojo.create("div"));
var _e2=new _61({id:_e1.get("id")+".Add",showLabel:false,disabled:true,iconClass:"davinciReviewToolbarAdd",title:_6b.addComment,onClick:dojo.hitch(this,"_showCommentForm")});
var _e3=new _69({});
_e3.addChild(new _66({label:_6b.allReviewers,checked:true,onChange:dojo.hitch(this,function(_e4){
var _e5=_e3.getChildren();
for(var i=2;i<_e5.length;i++){
_e5[i].set("checked",_e4);
}
this._reviewFilterChanged();
this._reviewersBtn.openDropDown();
})}));
_e3.addChild(new _67());
var _e6=this._reviewersBtn=new _63({id:_e1.get("id")+".Reviewers",showLabel:false,disabled:true,iconClass:"davinciReviewToolbarReviewers",title:_6b.showReviewer,dropDown:_e3});
this.reviewerList=_e3;
_e1.addChild(_e2);
_e1.addChild(new _65());
_e1.addChild(_e6);
dojo.place(dojo.create("br"),_e1.domNode);
_e1.addChild(_e0);
return _e1.domNode;
},_reviewFilterChanged:function(){
var _e7=[];
var _e8=this.reviewerList.getChildren();
for(var i=2;i<_e8.length;i++){
if(_e8[i].checked){
_e7.push(_e8[i].reviewer.name);
}
}
_e8[0].set("checked",_e7.length==_e8.length-2);
if(this._cached[this._currentPage]){
this._cached[this._currentPage].shownColors=_e7;
}
dojo.publish(this._currentPage+"/davinci/review/drawing/setShownColorAliases",[_e7]);
},_createEditButton:function(){
if(this.editButton){
this.editButton.domNode.style.display="block";
}else{
this.editButton=new _61({label:"",iconClass:"editButtonIcon",disabled:true,onClick:dojo.hitch(this,"")});
this.container.domNode.appendChild(this.editButton.domNode);
}
},_createViewSwitch:function(){
this.switchWrapper=dojo.create("div",{style:{"float":"right"}});
var _e9=new _61({label:null,iconClass:"collapseViewActive",onClick:dojo.hitch(this,"collapseAll")});
var _ea=new _61({label:null,iconClass:"expandViewActive",onClick:dojo.hitch(this,"expandAll")});
this.switchWrapper.appendChild(_e9.domNode);
this.switchWrapper.appendChild(_ea.domNode);
this.container.domNode.appendChild(this.switchWrapper);
},_showCommentForm:function(){
var _eb=this._commentForm;
if(_eb.isShowing){
this._onCommentFormCancel();
}
_eb.reset();
_eb.commentId=_6e();
_eb.show();
dojo.publish(this._currentPage+"/davinci/review/drawing/enableEditing",[_5b.userName,_eb.commentId,{pageState:this._cached[this._currentPage].pageState,pageStateList:this._cached[this._currentPage].pageStateList,viewScene:this._cached[this._currentPage].viewScene,viewSceneList:this._cached[this._currentPage].viewSceneList}]);
},_filter:function(){
var _ec=dijit.byId("filterText").get("displayedValue");
dojo.query(".davinciComment",this.container.domNode).removeClass("davinciReviewHide davinciReviewShow").forEach(function(_ed){
var _ee=dijit.getEnclosingWidget(_ed);
var _ef=true;
_ef=_ee.subjectNode.innerHTML.toLowerCase().indexOf(_ec.toLowerCase())>=0||_ee.contentNode.innerHTML.toLowerCase().indexOf(_ec.toLowerCase())>=0||_ee.ownerName&&_ee.ownerName.innerHTML.toLowerCase().indexOf(_ec.toLowerCase())>=0;
if(_ef){
dojo.addClass(_ed,"davinciReviewShow");
while(_ee.replyTo!=="root"){
_ee=this.commentIndices[_ee.replyTo];
dojo.addClass(_ee.domNode,"davinciReviewShow");
dojo.removeClass(_ee.domNode,"davinciReviewHide");
}
return;
}
dojo.addClass(_ed,"davinciReviewHide");
},this);
},expandAll:function(){
dojo.query(".repliesCount",this.container.domNode).removeClass("davinciReviewShow").addClass("davinciReviewHide");
dojo.query(".currentScope",this.container.domNode).addClass("davinciReviewShow").removeClass("davinciReviewHide");
},isPageOwner:function(){
return this._getDesignerId()==_5b.userName;
},_getDesignerId:function(){
var _f0=null;
var _f1=this._cached[this._currentPage].context;
if(_f1){
_f0=_f1.resourceFile.parent.designerId;
}
return _f0;
},popupWarning:function(_f2){
var _f3=dijit.byId("warningDialog");
if(!_f3){
_f3=new _68({id:"warningDialog",title:"",style:"width: 300px"},dojo.create("p",{innerHTML:_f2}));
}
_f3.show();
},getReplies:function(){
return this.comments;
},appendReply:function(_f4){
this.comments.push(_f4);
if(this.comments.length==1){
dojo.style(_f4.domNode,"borderTop","none");
}
_f4.placeAt(this.container.domNode);
},_blurAllComments:function(){
var _f5=this._cached[this._currentPage].focusedComments,_f6=[];
if(_f5){
dojo.forEach(_f5,function(_f7){
var _f8=this.commentIndices[_f7];
_f8&&_f6.push(_f8);
},this);
dojo.forEach(_f6,function(c){
c.blurComment();
},this);
}
},_flash:function(_f9){
if(!_f9){
return;
}
if(!this._originalBkColor){
this._originalBkColor=dojo.style(_f9,"backgroundColor");
}
_6a.chain([dojo.animateProperty({node:_f9,duration:250,properties:{backgroundColor:{start:this._originalBkColor,end:"#fef7d9"}}}),dojo.animateProperty({node:_f9,duration:250,properties:{backgroundColor:{start:"#fef7d9",end:this._originalBkColor}}})]).play();
},updateStatesScenes:function(){
var _fa=this._context.rootNode;
var _fb=_6d.getFocus(_fa);
var _fc=this._cached[this._currentPage].pageState=_fb?_fb.state:undefined;
var _fd=this._cached[this._currentPage].pageStateList=this._context.getCurrentStates();
var _fe=this._cached[this._currentPage].viewScene=this._getCurrentScene().s;
var _ff=this._cached[this._currentPage].viewSceneList=this._context.getCurrentScenes();
var _100=this._cached[this._currentPage].focusedComments;
dojo.publish(this._currentPage+"/davinci/review/drawing/filter",[{},_100]);
},commentIsActive:function(_101){
function _102(val){
return !val?_6d.NORMAL:val;
};
var _103=this._cached[this._currentPage];
var doc=this._context.getDocument();
var i,_104,_105;
for(i=0;i<_103.pageStateList.length;i++){
_104=_103.pageStateList[i];
var _106=_102(_104.state);
_105=_101.pageStateList[i];
var _107=_102(_105.state);
if(_104&&_105){
if(((_105.id&&_105.id===_104.id)||(_105.xpath&&_105.xpath===_104.xpath))&&_107!==_106){
return false;
}
}
}
for(var _108 in _103.viewSceneList){
var _109=_103.viewSceneList[_108];
var _10a=_101.viewSceneList[_108];
if(_109&&_10a){
for(i=0;i<_109.length;i++){
_104=_109[i];
_105=_10a[i];
if(_104&&_105){
if(((_105.scId&&_105.scId===_104.scId)||(_105.scXpath&&_105.scXpath===_104.scXpath))&&((_105.sceneId&&_105.sceneId!==_104.sceneId)||(_105.sceneXpath&&_105.sceneXpath!==_104.sceneXpath))){
return false;
}
}
}
}
}
return true;
}});
});
