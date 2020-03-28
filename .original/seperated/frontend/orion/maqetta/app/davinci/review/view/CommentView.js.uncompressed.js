require({cache:{
'url:davinci/review/widgets/templates/Comment.html':"<div class=\"davinciComment\">\r\n    <div dojoAttachPoint=\"mainBody\" class=\"commentBody\">\r\n        <div class=\"commentSubject\" dojoAttachPoint=\"subjectNode\"></div>\r\n        <div class=\"commentSubtitle\">\r\n            ${by}&nbsp;<span dojoAttachPoint=\"ownerName\"></span>\r\n            &nbsp;<span dojoAttachPoint=\"createTime\"></span>\r\n            <span class='editReplyBlock'>\r\n                <a class=\"commentLinkButton\" dojoAttachPoint=\"editButton\">${edit}</a>\r\n                <span class='editReplySpace'></span>\r\n                <a class=\"commentLinkButton\" dojoAttachPoint=\"replyButton\">${reply}</a>\r\n            </span>\r\n        </div>\r\n        <div class=\"commentContent\" dojoAttachPoint=\"contentNode\"></div>\r\n    </div>\r\n    <div dojoAttachPoint=\"tempForm\"></div>\r\n    <div dojoAttachPoint=\"replyRegion\" class=\"displayNone\">\r\n        <div class=\"commentReplyBar\">\r\n            <img class=\"dijitTreeExpando dijitTreeExpandoOpen commentLinkButton\" src=\"app/dojo/resources/blank.gif\" style=\"vertical-align: middle;\" dojoAttachPoint=\"imgNode\"/>\r\n            <a class=\"commentLinkButton\" dojoAttachPoint=\"replyCountButton\"></a>\r\n        </div>\r\n        <div class=\"commentReplies\" dojoAttachPoint=\"commentReplies\"></div>\r\n    </div>\r\n</div>",
'davinci/review/widgets/CommentForm':function(){
define("davinci/review/widgets/CommentForm", [
	"dojo/_base/declare",
	"dijit/_Widget",
	"dijit/_Templated",
	"dijit/form/TextBox",
	"dijit/form/SimpleTextarea",
	"dijit/Menu",
	"dijit/MenuItem",
	"dijit/form/Button",
	"dijit/form/DropDownButton",
	"dojo/i18n!./nls/widgets"
], function(declare, _Widget, _Templated, TextBox, SimpleTextarea, Menu, MenuItem, 
		Button, DropDownButton, widgetsNls) {
	
return declare("davinci.review.widgets.CommentForm", [_Widget, _Templated], {

	templateString: dojo.cache("davinci", "review/widgets/templates/CommentForm.html", "<div class=\"davinciComment davinciComment2\">\r\n\t<div dojoAttachPoint=\"toolbarNode\"></div>\r\n\t<div dojoAttachPoint=\"subjectNode\" class=\"commentSubjectEdit\"></div>\r\n\t<div dojoAttachPoint=\"contentNode\" class=\"contentNode\">\r\n\t<span dojoAttachPoint=\"placeHolder\" style=\"padding:3px 0 0 2px;\" class=\"dijitPlaceHolder dijitInputField\">${comment}</span>\r\n\t</div>\r\n\t<div class=\"submitCancelDiv\">\r\n\t\t<div dojoAttachPoint=\"submitNode\"></div>\r\n\t\t<a dojoAttachPoint=\"cancelNode\" class=\"commentLinkButton\" class=\"cancelLink\">${buttonCancel}</a>\r\n\t</div>\r\n</div>\r\n"),

	postMixInProperties : function() {
		this.inherited(arguments);
		/*
		 * HACK: dijit pulls template substitutions from 'this'. copy values out of NLS
		 * lang object into properties on this object. hope they don't collide.
		 */
		this.comment = widgetsNls.comment;
		this.buttonCancel = widgetsNls.buttonCancel;
	},

	postCreate: function() {
		this.subject = new TextBox({
			placeHolder: widgetsNls.subjectPlaceHolder,
			style: "width: 100%"
		}, this.subjectNode);
		this.content = new SimpleTextarea({
			rows: 4,
			style: "width: 100%; margin: 2px 0px 2px 0px;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:100%;"
		}, dojo.create("div"));
		this.contentNode.appendChild(this.content.domNode);
		var submitButton = new Button({
			label: widgetsNls.submit, 
			onClick: dojo.hitch(this, "_submit")
		}, this.submitNode);

		this.replyTo = "root";
		this.connect(this.cancelNode, "click", "hide");
		this.connect(this.content, "onFocus", "hidePlaceHolder");
		this.connect(this.content, "onBlur", "showPlaceHolder");
		this.connect(this.placeHolder, "click", function() {
			this.hidePlaceHolder();
			this.content.focus();
		});

		var viewActions=this._getActions();
		var tb=dojo.create("span", {style: {display: "inline-block"}},this.toolbarNode);
		var toolbar = this._toolbar = davinci.Workbench._createToolBar('toolbarPath', tb, viewActions, this);
		dojo.style(toolbar.domNode,{"display":"inline-block"});
		
		//Subscribe to changes to the selection state of shapes in the review editor
		dojo.subscribe("/davinci/review/drawing/selectshape", this, function(selectedShape, surface) {
			this._updateToolbarEnablement();
		}.bind(this));
		
		dojo.subscribe("/davinci/review/drawing/deselectshape", this, function(selectedShape, surface) {
			this._updateToolbarEnablement();
		}.bind(this));
	},
	
	_updateToolbarEnablement: function() {
		var toolbarChildren = this._toolbar.getChildren();
		dojo.forEach(toolbarChildren, function(child) {
			var childAction = child._maqAction;
			if (childAction && childAction.action && childAction.action.isEnabled) {
				var enabled = childAction.action.isEnabled();
				child.set("disabled", !enabled);
			}
		});
	},

	_getActions: function() {
		var editorActions=[];
		var extensions = davinci.Runtime.getExtensions('davinci.annotationActions', function(ext) {
			editorActions.push(ext.editorContribution);
			return true;
		});
		return editorActions;
	},

	hide: function() {
		this.isShowing = false;
		this.onHide();
		dojo.style(this.domNode, "display", "none");
		this.reset();
		dojo.publish("/davinci/review/view/closeComment", []);
	},

	onHide: function() {
		// Placeholder
	},

	show: function() {
		this.isShowing = true;
		this.onShow();
		dojo.style(this.domNode, "display", "block");
		dojo.window.scrollIntoView(this.domNode);
		dojo.publish("/davinci/review/view/openComment", []);
		
		//Initialize toolbar enablement
		this._updateToolbarEnablement();
	},

	onShow: function() {
		// Placeholder
	},

	_submit: function() {
		var subject = this.subject.get("value"),
		content = this.content.get("value").replace(/\n/g, "<br/>"),
		func = this._update ? "onUpdate" : "onSubmit";

		this[func]({
			subject: subject,
			content: content
		});

	},

	onSubmit: function(args) {
		// Placeholder to be connected
	},

	onUpdate: function(args) {
		// Placeholder to be connected
	},

	reset: function() {
		dojo.style(this.subject.domNode, "display", "block");
		this.placeHolder.innerHTML = widgetsNls.comment;
		this.showPlaceHolder();
		this.subject.set("value", "");
		this.content.set("value", "");
		this.replyTo = "root";
		this.placeAt(this.parentNode, "first");
		this._update = false;
		this.isShowing = false;
		this.editFrom = null;
	},

	/**
	 * When the comment form firstly shows, the text hint should be "Enter comment here", in grey color.
	 * @returns
	 */
	showPlaceHolder : function() {
		if (this.content.get("value") == "") {
			dojo.removeClass(this.placeHolder,"davinciReviewHide");
		}
	},

	hidePlaceHolder: function() {
		dojo.addClass(this.placeHolder,"davinciReviewHide");
	},

	setReplyMode: function() {
		dojo.style(this.subject.domNode, "display", "none");
		this.placeHolder.innerHTML = widgetsNls.commentReply;
	},

	setEditMode: function() {
		this._update = true;
	},

	moveTo: function(/*DomNode*/ parent) {
		if (!this.parentNode) {
			this.parentNode = parent;
		}
		this.placeAt(parent);
	}

});
});
},
'davinci/review/Review':function(){
define("davinci/review/Review", [
	"davinci/Runtime",
	"./Color"
], function(Runtime, Color) {

return {
	getColor: function(/*string*/ name) {
		var index;
		dojo.some(Runtime.reviewers, function(item, n) {
			if (item.name == name) {
				index = n;
				return true;
			}
			return false;
		});
		return Color.colors[index];
	}
};
});
},
'davinci/review/Color':function(){
define({
	colors:[
	        "firebrick",
	        "darkblue",
	        "darkgreen",
	        "purple",
	        "darkorange",
	        "darkgoldenrod",
	        "brown",
	        "darkgrey",
	        "darkcyan",
	        "deeppink"
	        ]
});

},
'davinci/review/widgets/Comment':function(){
define([
	"dojo/_base/declare",
	"davinci/XPathUtils",
	"davinci/maqetta/AppStates",
	"davinci/review/Review",
	"davinci/Runtime",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/Menu",
	"dijit/MenuItem",
	"dijit/form/DropDownButton",
	"dojo/date/locale",
	"dojo/date/stamp",
	"dojo/Deferred",
	"dojo/i18n!./nls/widgets",
	"dojo/text!./templates/Comment.html"
], function(declare, XPathUtils, AppStates, Review, Runtime, _Widget, _Templated, Menu, MenuItem, DropDownButton, locale, stamp, Deferred, widgetsNls, commentTemplate) {

// AppStates functions are only available on the prototype object
var States = AppStates.prototype;

/*
 * Transform the date passed to a relative time against current time on server.
 * E.g. current time is 2010-12-28 4:24:00, time passed: 2010-12-28 4:20:00, then
 * the relative time is "4 mins ago".
 */
//TODO: i18n
var toRelativeTime = function(date, baseDate, threshold) {
	var diff = date.getTime() - baseDate.getTime();
	var direction = diff < 0 ? "ago" : "later";
	var day, hour, min, second;

	diff = Math.floor( Math.abs( diff ) / 1000 );

	if(diff <= 60) return "just now";

	if ( threshold && diff > threshold )
		return locale.format(date, {formatLength:'short',selector:'date'});

	second = diff % 60;
	diff = Math.floor( diff / 60 ); 
	min = diff % 60;
	diff = Math.floor( diff / 60 );
	hour = diff % 24;
	diff = Math.floor( diff / 24 );
	day = diff;

	var timeStr = day ? day + " days ": hour ? hour + " hours ":min ? min + " mins ":'';
	return timeStr + direction;
};

return declare("davinci.review.widgets.Comment", [_Widget, _Templated], {

	templateString: commentTemplate,

	postMixInProperties: function() {
		this.inherited(arguments);
		dojo.mixin(this, widgetsNls);
	},

	VISIBLE_PART_LENGTH: 80, // By default, how many leading characters of the comment will be shown.

	postCreate: function() {
		this._createdPromise = new Deferred();
		if (!this.existed) {
			// Ensure that the comment is created on the server when it is "needed".
			dojo.xhrGet({
				url: "cmd/addComment",
				handleAs: "json",
				content: {
					id: this.commentId,
					subject: this.subject,
					content: this.content,
					ownerId: this.ownerId,
					email: this.email,
					previous: this.previous,
					next: this.next,
					pageState: this.pageState,
					pageStateList: this.pageStateList ? dojo.toJson(this.pageStateList) : '',
					viewScene: this.viewScene,
					viewSceneList: this.viewSceneList ? dojo.toJson(this.viewSceneList) : '',
					designerId: this.designerId,
					pageName: this.pageName,
					replyTo: this.replyTo || "root",
					drawingJson: this.drawingJson
				},
				error: dojo.hitch(this, function(response) {
					dojo.publish("/davinci/review/commentAddedError", [this]);
					var msg = response.responseText;
					msg = msg.substring(msg.indexOf("<title>")+7, msg.indexOf("</title>"));
					davinci.Runtime.handleError(dojo.string.substitute(widgetsNls.errorAddingCom, [response, msg]));
				})
			}).then(dojo.hitch(this, function(result) {
				// We want to grab hold of the creation time from the server
				this.created = result.created;
				
				// Populate the screen with the new comment
				this._populate(this);
				
				// Resolve the promise that the created time stamp is available
				this._createdPromise.resolve(this.created);
			}.bind(this)));
		} else {
			this._populate(this);
			
			// Resolve the promise that the created time stamp is available
			this._createdPromise.resolve(this.created);
		}

		this.comments = []; // Hold the replies to this comment
		this.collapsed = false;
		this.enabled = true;
		this.focused = false;

		// Populate the comment body
		var color = this.color = Review.getColor(this.ownerId);
		this.subjectNode.innerHTML = this.subject;
		dojo.style(this.subjectNode, "color", color);
		var ownerDisplayName = Runtime.getUserDisplayName({
			email: this.email, 
			userId: this.ownerId
		});
		this.ownerName.innerHTML = ownerDisplayName;
		dojo.style(this.ownerName, "color", color);
		this.contentNode.innerHTML = this.content;
		this._ajustLengthOfCommentContent(true);

		if (this.isReply()) {
			//Let's not show subject line on replies
			dojo.addClass(this.subjectNode, "displayNone");
		}

		this.connect(this.imgNode, "click", "_toggleReplies");
		this.connect(this.replyCountButton, "click", "_toggleReplies");
		this.connect(this.editButton, "click", "_editComment");
		this.connect(this.replyButton, "click", "_newReply");
		this.connect(this.mainBody, "click", "focusComment");
		this.connect(this.mainBody, "dblclick", "_editComment");
		if (this.closed) {
			dojo.style(this.editButton, "display", "none");
			dojo.style(this.replyButton, "display", "none");
		}
		if (davinci.Runtime.userName != this.ownerId) {
			dojo.style(this.editButton,"display","none");
		}
	},
	
	// Provide a means for someone to get the created time stamp (which is 
	// created by a server call in postCreate
	getCreated: function() {
		var promise = new Deferred();
		
		this._createdPromise.then(function(created) {
			promise.resolve(created);
		});

		return promise;
	},

	refresh: function() {
		dojo.style(this.editButton, "display", "inline");
		dojo.style(this.replyButton, "display", "inline");
		if (this.closed) {
			dojo.style(this.editButton, "display", "none");
			dojo.style(this.replyButton, "display", "none");
		}
		if (davinci.Runtime.userName != this.ownerId) {
			dojo.style(this.editButton, "display", "none");
		}
	},

	_populate: function(result) {
		// summary:
		//		Fill the time, comment order. These info need to be retrieved from the server
		this.createdFormatted = stamp.fromISOString(result.created);
		this.createTime.innerHTML = toRelativeTime(this.createdFormatted, new Date(), 604800);
	},

	update : function(arg) {
		this.subjectNode.innerHTML = this.subject;
		this.contentNode.innerHTML = this.content;
		this._ajustLengthOfCommentContent(true);
		dojo.xhrGet({
			url: "cmd/updateComment",
			handleAs: "json",
			content: {
				id: this.commentId,
				designerId: this.designerId,
				subject:  this.subject,
				content:  this.content,
				pageState: this.pageState,
				pageStateList: this.pageStateList ? dojo.toJson(this.pageStateList) : '',
				viewScene: this.viewScene,
				viewSceneList: this.viewSceneList ? dojo.toJson(this.viewSceneList) : '',
				drawingJson: this.drawingJson
			},
			error: function(response) {
				var msg = response.responseText;
				msg = msg.substring(msg.indexOf("<title>")+7, msg.indexOf("</title>"));
				davinci.Runtime.handleError(dojo.string.substitute(widgetsNls.errorUpdateCom, [response, msg]));
			}
		});
	},

	_editComment: function() {
		if (this.isDisabled) {
			return;
		}
		this.onEditComment({
			commentId: this.commentId
		});
	},

	onEditComment: function(args) {
		// Placeholder
	},

	_newReply: function() {
		if (this.isDisabled) {
			return;
		}
		this.onNewReply({
			replyTo: this.commentId,
			subject: "Re: " + this.subject
		});
	},

	onNewReply: function(args) {
		// Placeholder
	},

	isReply: function() {
		// summary: 
		//		Indicate if this is a reply
//		return this.depth > 0;
		return this.replyTo != "root";
	},

	isPageOwner: function() {
		// summary:
		//		Indicate if the reviewer is the page author
		return this.designerId == davinci.Runtime.userName;
	},

	appendReply: function(/*davinci.review.widgets.Comment*/ reply) {
		this.comments.push(reply);
		reply.placeAt(this.commentReplies);
		if (dojo.hasClass(this.replyRegion, "displayNone")) {
			dojo.removeClass(this.replyRegion, "displayNone");
		}
		var len = this.getReplies().length;
		this.replyCountButton.innerHTML = len + (len == 1 ? " Reply" : " Replies");
	},

	getReplies: function() {
		return this.comments;
	},

	_toggleReplies: function() {
		if (this.collapsed) {
			this.expand();
		} else {
			this.collapse();
		}
	},

	collapse: function(/*Boolean*/ all) {
		if (all) {
			var replies = this.getReplies();
			dojo.forEach(replies, function(reply) {
				reply.collapse(all);
			});
		}
		if (!this.collapsed) {
			dojo.removeClass(this.imgNode, "dijitTreeExpandoOpen");
			dojo.addClass(this.imgNode, "dijitTreeExpandoClosed");
			dojo.addClass(this.commentReplies, "displayNone");
		}
		this.collapsed = true;
	},

	expand: function(/*Boolean*/ all) {
		if (all) {
			var replies = this.getReplies();
			dojo.forEach(replies, function(reply) {
				reply.expand(all);
			});
		}
		if (this.collapsed) {
			dojo.removeClass(this.imgNode, "dijitTreeExpandoClosed");
			dojo.addClass(this.imgNode, "dijitTreeExpandoOpen");
			dojo.removeClass(this.commentReplies, "displayNone");
		}
		this.collapsed = false;
	},

	focusComment: function(evt) {
		if (this.isDisabled) {
			return;
		}
		if (this.isFocused && evt && (evt.ctrlKey || evt.metaKey)) {
			this.blurComment();
		} else {
			this.onCommentFocus(this, evt);
			dojo.addClass(this.mainBody, "commentFocused");
			this.isFocused = true;
		}
	},

	onCommentFocus: function(widget) {
		// Placeholder
	},

	blurComment: function(silent) {
		if (!silent) {
			this.onCommentBlur(this);
		}
		dojo.removeClass(this.mainBody, "commentFocused");
		this.isFocused = false;
	},

	onCommentBlur: function(widget) {
		// Placeholder
	},

	/**
	 * Fold or not the characters after a specified position of
	 * a comment. The position is specified by
	 * davinci.review.widgets.Comment.VISIBLE_PART_LENGTH.
	 * 
	 * @param comment
	 *            Object of davinci.review.widgets.Comment.
	 * @param toFold
	 *            Boolean, to fold or unfold the comment.
	 * @returns Nothing.
	 */
	_ajustLengthOfCommentContent: function(toFold) {
		var content = this.content;
		if (content.length <= this.VISIBLE_PART_LENGTH) {
			var link = dojo.query("a", this.contentNode);
			if(link.length > 0) { 
				this.contentNode.removeChild(link[0]);
			}
			return;
		}
		var linkHtml = toFold ? widgetsNls.more : widgetsNls.commentHide;

		var unfoldLink = dojo.create("a", {
			"class": "commentLinkButton",
			innerHTML: linkHtml,
			onclick: dojo.hitch(this, "_ajustLengthOfCommentContent", !toFold)
		});
		if (content) {
			if (toFold) {
				this.contentNode.innerHTML = content.substring(0, this.VISIBLE_PART_LENGTH);
			} else {
				this.contentNode.innerHTML = content;
			}
			this.contentNode.appendChild(unfoldLink);
		}
	},

	hide: function() {
		dojo.style(this.mainBody, "display", "none");
	},

	show: function() {
		dojo.style(this.mainBody, "display", "block");
		dojo.window.scrollIntoView(this.domNode);
	},

	enable: function() {
		dojo.removeClass(this.domNode, "disabled");
		dojo.removeClass(this.mainBody, "commentBodyDisabled");
		dojo.style(this.subjectNode, "color", this.color);
		dojo.style(this.ownerName, "color", this.color);
		this.isDisabled = false;
	},

	disable: function() {
		dojo.addClass(this.domNode, "disabled");
		dojo.removeAttr(this.mainBody, "style");
		dojo.addClass(this.mainBody, "commentBodyDisabled");
		dojo.style(this.subjectNode, "color", "");
		dojo.style(this.ownerName, "color", "");
		this.isDisabled = true;
	},

	getBody: function() {
		return this.mainBody;
	},
	
	/**
	 * Set current states and scenes based on comment.pageStateList and comment.viewSceneList
	 */
	setStatesScenes: function() {
		var e = davinci.Workbench.getOpenEditor(); 
		var ctx = (e && e.getContext) ? e.getContext() : null;
		var rootNode = ctx ? ctx.rootNode : null;
		var doc = rootNode && rootNode.ownerDocument;
		if(doc){
			if(this.pageStateList){
				// Go backwards so that highest-level states are set last
				for(var i=this.pageStateList.length-1; i>-0; i--){
					var o = this.pageStateList[i];
					var stateContainerNode = o.id ? doc.getElementById(o.id) : null;
					if(!stateContainerNode && o.xpath){
						var query = XPathUtils.toCssPath(o.xpath);
						stateContainerNode = doc.querySelector(query);
					}
					if(stateContainerNode){
						States.setState(o.state, stateContainerNode, { updateWhenCurrent:true });
					}
				}
			}
			if(this.viewSceneList && ctx.sceneManagers){
				for(var smIndex in this.viewSceneList){
					var sm = ctx.sceneManagers[smIndex];
					if(sm){
						var viewSceneItems = this.viewSceneList[smIndex];
						// Go backwards so that highest-level scenes are set last
						for(var j=viewSceneItems.length-1; j>=0; j--){
							var o = viewSceneItems[j];
							var sceneContainerNode = o.scId ? doc.getElementById(o.scId) : null;
							if(!sceneContainerNode && o.scXpath){
								var query = XPathUtils.toCssPath(o.scXpath);
								sceneContainerNode = doc.querySelector(query);
							}
/*FIXME: Probably should fix the signature of selectScene. If so, then this logic would be needed
							var sceneNode = o.sceneId ? doc.getElementById(o.sceneId) : null;
							if(!sceneNode && o.sceneXpath){
								var query = XPathUtils.toCssPath(o.sceneXpath);
								sceneNode = doc.querySelector(query);
							}
							if(sceneContainerNode && sceneNode){
*/
							if(sceneContainerNode && o.sceneId){
								sm.selectScene({sceneContainerNode:sceneContainerNode, sceneId:o.sceneId});
							}
						}
					}
				}
			}
		}
	}

});
});
}}});
define("davinci/review/view/CommentView", [
	"dojo/_base/declare",
	"davinci/Workbench",
	"davinci/Runtime",
	"davinci/maqetta/AppStates",
	"davinci/review/Review",
	"davinci/workbench/ViewPart",
	"davinci/review/widgets/Comment",
	"davinci/review/widgets/CommentForm",
	"dijit/form/Button",
	"dijit/form/TextBox",
	"dijit/form/DropDownButton",
	"dijit/Toolbar",
	"dijit/ToolbarSeparator",
	"dijit/CheckedMenuItem",
	"dijit/MenuSeparator",
	"dijit/Dialog",
	"dijit/Menu",
	"dojo/fx",
    "dojo/i18n!./nls/view",
    "dojo/i18n!davinci/workbench/nls/workbench"
], function(declare, Workbench, Runtime, AppStates, Review, ViewPart, Comment, CommentForm, Button, TextBox, DropDownButton, 
		Toolbar, ToolbarSeparator, CheckedMenuItem, MenuSeparator, Dialog, Menu, coreFx, viewNls, workbenchNls) {

// AppStates functions are only available on the prototype object
var States = AppStates.prototype;

var getNewGuid = function() {
	var guid = "";
	for (var i = 1; i <= 32; i++){
		var n = Math.floor(Math.random()*16.0).toString(16);
		guid += n;
		if((i==8)||(i==12)||(i==16)||(i==20)){
			guid += "-";
		}
	}
	return guid;    
};

return declare("davinci.review.view.CommentView", ViewPart, {

	interval: 33554432,
	id: 0,

	postCreate: function() {
		this.inherited(arguments);
		// A cache that stores all the loaded comments attached to each page
		this._cached = { /*pageName: _comments [state: attr]*/ };
		this._cached.indices = {/*id: _comment*/};
		// Current comment widgets on this view
		this.comments = [];
		this.commentIndices = {
			"root": this
		};
		this._commentConns = [];

		this.container = new dijit.layout.ContentPane();
		this.commentReplies = this.container.domNode;
		dojo.attr(this.commentReplies, "tabindex", "0");
		this.setContent(this.container);
		this.attachToolbar();
		this._initCommentForm();

		this.connect(this.commentReplies, "keydown", function(evt) {
			var that = this;
			var loopBody = function(comment) {
//FIXME
/*
				if (comment.pageState == pageState) {
*/
//FIXME: THIS IS WRONG. SHOULD CHECK focusedComments, not current status.
				if(that.commentIsActive(comment)){
					comment.enable();
				} else {
					comment.disable();
				}
				var replies = comment.getReplies();
				if (replies.length > 0) {
					dojo.forEach(replies, loopBody);
				}
			};
			if (!this._currentPage) {
				return; //No page is opened
			}
			if (evt.keyCode == dojo.keys.CTRL || evt.keyCode == dojo.keys.META) {
				var focusedComments = this._cached[this._currentPage].focusedComments;
				if (focusedComments.length > 0) {
//FIXME
					var pageState = this.commentIndices[focusedComments[0]].pageState;
					dojo.forEach(this.comments, loopBody);
				}
			}
		});

		this.connect(this.commentReplies, "keyup", function(evt) {
			if (evt.keyCode == dojo.keys.CTRL || evt.keyCode == dojo.keys.META) {
				var loopBody = function(comment) {
					comment.enable();
					var replies = comment.getReplies();
					if (replies.length > 0) {
						dojo.forEach(replies, loopBody);
					}
				};
				dojo.forEach(this.comments, loopBody);
			}
		});

		this.connect(this.commentReplies, "click", function(evt) {
			// Blur all the selected comments
			if (evt.target !== this.commentReplies) {
				return;
			}
			this._blurAllComments();
		});
		
		dojo.subscribe("/davinci/review/view/canvasFocused", this, function() {
			this._blurAllComments();
		});

		dojo.subscribe("/davinci/review/resourceChanged", this, function(arg1,arg2,arg3) {
			if (arg2 != "open" && arg2 != "closed" || !this._currentPage) {
				return;
			}
			if (this._currentPage.split("/")[2] == arg3.timeStamp) {
				this._versionClosed = arg2=="closed";
			}
			dijit.byId("davinciReviewToolbar.Add").set("disabled", this._versionClosed); 
			dijit.byId("davinciReviewToolbar.Reviewers").set("disabled", false);
			dojo.publish(this._currentPage+"/davinci/review/drawing/addShape", ["[]", true]);
			this._destroyCommentWidgets();
			this._render();
//FIXME: THIS IS ALL BROKEN WITH NEW STATES/SCENES REGIME
//FIXME: getCurrentScene now takes a container node as a required param
//FIXME: Each saved state/scene needs to be a pair: containerNode + scene/state
//FIXME: Not sure how we are going to identify containers if they don't have IDs. XPath?
			var state = this._cached[this._currentPage].pageState,
				stateList = this._cached[this._currentPage].pageStateList,
				scene = this._cached[this._currentPage].viewScene || this._getCurrentScene().s,
				sceneList = this._cached[this._currentPage].viewSceneList || this._context.getCurrentScenes();
			dojo.publish(this._currentPage+"/davinci/review/drawing/filter", 
					[{ /*FIXME: No longer used 
						pageState: state, 
						pageStateList:stateList, 
						viewScene: scene, 
						viewSceneList:sceneList
						*/}, []]);

		});

		dojo.subscribe("/davinci/review/context/loaded", this, function(context, pageName){
			context._commentView = this;
			this._context = context;
			
			// summary:
			//		Load the comments when the page is loaded
			//		Collapse all the comments
			//		Enable the action icon on the toolbar
			var global = dojo.window.get(context.containerNode.ownerDocument);

			var designerId = context.resourceFile.parent.designerId;
			this._loadCommentData(designerId, pageName);
			if (Workbench.getOpenEditor() === context.containerEditor) {
				// Only need rendering when it is the current editor
				// No need to render when the editor is opened in the background
				this._currentPage = pageName;
				this._cached[this._currentPage].context = context;
				this._destroyCommentWidgets();
				//FIXME: Hack
				//Postpone updating shapes with setTimeout. Something happened
				//with Preview 4 code where page loading has altered timing.
				setTimeout(function() {
					this._render();
					this._updateToolbar({editor:context});
					// Show annotations
					this._reviewFilterChanged(); // Set reviewer list to be shown
					var rootNode = this._context.rootNode;
					/*FIXME: No longer used. If resurrected, need to check for statesFocus being null
					var stateFocus = States.getFocus(rootNode);
					*/
					var stateList = this._context.getCurrentStates();
					var scene = this._getCurrentScene().s;
					var sceneList = this._context.getCurrentScenes();
					dojo.publish(this._currentPage+"/davinci/review/drawing/filter", 
							[{ /*FIXME: No longer used 
								pageState: stateFocus.state, 
								pageStateList: stateList, 
								viewScene: scene,
								viewSceneList: sceneList
								*/}, 
							[]]);
					}.bind(this), 100);
			}
			// Response to the state change event in the review editor
			if (global && global.require) {
				var userConnect = global.require("dojo/_base/connect");
				userConnect.subscribe("/maqetta/appstates/state/changed", this, function(args) {
					if (!Runtime.currentEditor || Runtime.currentEditor.editorID != "davinci.review.CommentReviewEditor") { 
						return; 
					}
					if(!this._cached || !this._currentPage || !this._cached[this._currentPage]){
						return;
					}
					var state = args.newState || "Normal";
//FIXME: Maybe should convert to JSON until just before sending to server
					this._cached[this._currentPage].pageState = state;
					var stateList = this._cached[this._currentPage].pageStateList = this._context.getCurrentStates();
					var scene = this._cached[this._currentPage].viewScene = this._getCurrentScene().s;
					var sceneList = this._cached[this._currentPage].viewSceneList = this._context.getCurrentScenes();
					dojo.publish(this._currentPage+"/davinci/review/drawing/filter", 
							[{ /*FIXME: No longer used 
								pageState: state, 
								pageStateList:stateList, 
								viewScene: scene, 
								viewSceneList:sceneList
								*/}, []]);
				});
			}
			this.updateStatesScenes();
		});

		dojo.subscribe("/davinci/ui/editorSelected", this, function(args) {
			// summary:
			//		Remove the comment nodes of the previous page
			
			var editor = this._editor = args.editor;

			//save the editing comment form
			if (args.oldEditor && args.oldEditor.basePath) {
				if (this._commentForm.isShowing) {
					var editingComment = {
							commentId : this._commentForm.commentId,
							replyTo: this._commentForm.replyTo,
							subject: this._commentForm.subject.get("value"),
							content: this._commentForm.content.get("value").replace(/\n/g, "<br/>"),
							editFrom: this._commentForm.editFrom
					};
					this._setPendingEditComment(args.oldEditor, editingComment);
				} else {
					//Clear out editing comment
					this._setPendingEditComment(args.oldEditor, null);
				}
			}
			if (editor && editor.basePath) {
				this._currentPage = editor.basePath.path;
				this._commentForm.hide();
				this._destroyCommentWidgets();
				this._updateToolbar(args);
				this._render();

				var focusedComments = this._cached[this._currentPage] && this._cached[this._currentPage].focusedComments;
				if (focusedComments) {
					dojo.forEach(focusedComments,dojo.hitch(this,function(commentId) {
						this.commentIndices[commentId].focusComment({ctrlKey:true, metaKey:true, silent: true});
					}));
				}

				//restore the commentForm
				if (this._cached[this._currentPage] && this._cached[this._currentPage].editComment) {
					var form = this._commentForm,
					editComment = this._cached[this._currentPage].editComment;

					form.reset();
					form.commentId = editComment.commentId;
					form.subject.set("value", editComment.subject);
					form.content.set("value", editComment.content.replace(/<br\/>/g,"\n"));
					if(editComment.content) form.hidePlaceHolder();
					var comment;
					if (editComment.replyTo !== "root") {
						form.setReplyMode();
						form.replyTo = editComment.replyTo;
						comment = this.commentIndices[editComment.replyTo];
						form.moveTo(comment.tempForm);
						var parent = comment;
						while (parent && parent.expand) {
							// Expand the comment if the parent of the comment is collapsed
							parent.expand();
							parent = this.commentIndices[parent.replyTo];
						}
						dojo.window.scrollIntoView(comment.domNode);

					}
					if (editComment.editFrom) {
						form.setEditMode();
						comment = this.commentIndices[editComment.editFrom];
						comment.hide();
						form.moveTo(comment.tempForm);
						dojo.window.scrollIntoView(comment.domNode);
					}

					form.show();
				}
			} 
			
			if (!editor || editor.editorID != "davinci.review.CommentReviewEditor") {
				// If there's no new editor (indicating all editors have been closed and 
				// user accepted the close tab warning if applicable) OR if the new editor 
				// isn't a review editor, let's clear out the comment view
				this._resetCommentView();
				this._currentPage = null;
			} else {
				this._versionClosed = editor.resourceFile.parent.closed;
			}
		});

		dojo.subscribe("/davinci/review/drawing/annotationSelected", this, function(commentId, selected) {
			var comment = this.commentIndices[commentId];
			var focusedComments = this._cached[this._currentPage].focusedComments;
			if (comment && !comment.isFocused || focusedComments.length > 1) {
				var parent = this.commentIndices[comment.replyTo];
				while (parent && parent.expand) {
					// Expand the comment if the parent of the comment is collapsed
					parent.expand();
					parent = this.commentIndices[parent.replyTo];
				}
				dojo.window.scrollIntoView(comment.domNode);
				comment.focusComment();
				this._flash(comment.getBody());
			} else if(comment) {
				comment.blurComment();
			}
		});

		dojo.subscribe("/davinci/review/commentAddedError",this,this._onErrorCreateNewComment);
	},

	_getCurrentScene: function() {
		// summary:
		//		Return a scene object with sm (SceneManager) and s (current scene) values
		
		// If any plugin SceneManagers, get the current scene
		var sceneManagers = this._context.sceneManagers;
		var sceneId;
		for (var smIndex in sceneManagers) {
			var sm = sceneManagers[smIndex];
			if (sm.getCurrentScene) {
				sceneId = sm.getCurrentScene();
				if (sceneId) {
					break;
				}
			}
		}
		return {sm: sm, s: sceneId};
	},

	_setPendingEditComment: function(editor, editingComment) {
		//Determine the cache key based on type of "editor" arg
		var key = null;
		if (typeof editor === "string") {
			key = editor;
		} else if (editor.basePath && editor.basePath.path) {
			key = editor.basePath.path;
		}
		
		//Look up any pending comment based on the key and
		//set the comment
		if (key) {
			var cachedVal = this._cached[key];
			if (cachedVal) {
				cachedVal.editComment = editingComment;
			}
		}
	},

	_resetCommentView: function() {
		dijit.byId("davinciReviewToolbar.Add").set("disabled", true);
		dijit.byId("davinciReviewToolbar.Reviewers").set("disabled",true);
		this._commentForm.hide();
		this._destroyCommentWidgets();
	},

	_initCommentForm: function() {
		// summary:
		//		Create the comment form and initialize it
		var form = this._commentForm = new CommentForm({
			onSubmit: dojo.hitch(this, "_onCreateNewComment"),
			onUpdate: dojo.hitch(this, "_onUpdateComment"),
			onShow: dojo.hitch(this, "_onCommentFormShown")
		});
		this.connect(form.cancelNode, "click", "_onCommentFormCancel");
		form.moveTo(this.container.domNode);
		form.hide();
	},

	_onCommentFormShown: function() {
	},

	_onErrorCreateNewComment: function(comment) {
		var _comments = this._cached[this._currentPage];
		var index;
		for (var i=0; i<_comments.length; i++) {
			if (_comments[i] && _comments[i].id == comment.commentId) {
				index = i;
			}
			_comments[i]._hasPopulate = false;
		}

		if (index) {
			_comments.splice(index, 1);
		}
		delete this._cached.indices[comment.commentId];
		this._destroyCommentWidgets();
		dojo.publish(this._currentPage+"/davinci/review/drawing/addShape", ["[]", true]);
		this._render();
	},

	_onCreateNewComment: function(args) {
		var form = this._commentForm,
		_comments = this._cached[this._currentPage] || [];

		var bodyNode = this._cached[this._currentPage].context.rootNode;

		// Get drawing JSON string
		dojo.publish(this._currentPage+"/davinci/review/drawing/getShapesInEditing", 
				[this, 
				 {state: this._cached[this._currentPage].pageState, 
					stateList: this._cached[this._currentPage].pageStateList, 
					scene: (this._cached[this._currentPage].viewScene || this._getCurrentScene().s),
					sceneList: (this._cached[this._currentPage].viewSceneList || this._context.getCurrentScenes()) }]);

		var comment = new Comment({
			commentId: form.commentId,
			subject: args.subject,
			content: args.content,
			designerId: this._getDesignerId(),
			pageName: this._currentPage,
			pageState: this._cached[this._currentPage].pageState,
			pageStateList: this._cached[this._currentPage].pageStateList,
			viewScene: this._cached[this._currentPage].viewScene || this._getCurrentScene().s,
			viewSceneList: this._cached[this._currentPage].viewSceneList || this._context.getCurrentScenes(),
			ownerId: Runtime.userName,
			email: Runtime.userEmail,
			replyTo: form.replyTo,
			drawingJson: this.drawingJson
		});

		this._commentConns.push(
				dojo.connect(comment, "onNewReply", this, "_onNewReply"),
				dojo.connect(comment, "onEditComment", this, "_onEditComment"),
				dojo.connect(comment, "onCommentFocus", this, "_onCommentFocus"),
				dojo.connect(comment, "onCommentBlur", this, "_onCommentBlur")
		);

		this.commentIndices[comment.commentId] = comment;
		form.hide();
		var parent = this.commentIndices[comment.replyTo];
		parent.appendReply(comment);
		if (parent.expand) {
			parent.expand();
		}
		// Make sure the focus is at the bottom of review panel after adding a new comment. 
		dojo.window.scrollIntoView(comment.domNode);
		comment.focusComment();
		this._flash(comment.getBody());

		// Update the cache finally
		var _comment = {
				id: comment.commentId,
				subject: comment.subject,
				content: comment.content,
				pageName: comment.pageName,
				pageState: comment.pageState,
				pageStateList: comment.pageStateList,
				viewScene: comment.viewScene,
				viewSceneList: comment.viewSceneList,
				ownerId: comment.ownerId,
				email: comment.email,
				depth: comment.depth,
				replyTo: comment.replyTo,
				drawingJson: comment.drawingJson
		};
		_comments.push(_comment);
		this._cached.indices[_comment.id] = _comment;
		
		// Update the created time stamp when available
		comment.getCreated().then(function(created) {
			_comment.created = created;
		});
	},

	_onUpdateComment: function(args) {
		// summary:
		//		Update the new data to the server
		var form = this._commentForm,
		comment = this.commentIndices[form.commentId];

		// Get drawing JSON string
		dojo.publish(this._currentPage+"/davinci/review/drawing/getShapesInEditing", 
				[this, 
				 {state: this._cached[this._currentPage].pageState, 
					stateList: this._cached[this._currentPage].pageStateList, 
					scene: (this._cached[this._currentPage].viewScene || this._getCurrentScene().s),
					sceneList: (this._cached[this._currentPage].viewSceneList || this._context.getCurrentScenes()) }]);

		comment.subject = args.subject;
		comment.content = args.content;
		comment.pageState = this._cached[this._currentPage].pageState;
		comment.pageStateList = this._cached[this._currentPage].pageStateList;
		comment.viewScene = this._cached[this._currentPage].viewScene  || this._getCurrentScene().s;
		comment.viewSceneList = this._cached[this._currentPage].viewSceneList  || this._context.getCurrentScenes();
		comment.drawingJson = this.drawingJson;
		form.hide();
		comment.update();
		comment.show();
		this._flash(comment.getBody());

		// Update the cache finally
		var _comment = this._cached.indices[comment.commentId];
		_comment.subject = comment.subject;
		_comment.content = comment.content; 
		_comment.pageState = comment.pageState;
		_comment.pageStateList = comment.pageStateList;
		_comment.viewScene = comment.viewScene;
		_comment.viewSceneList = comment.viewSceneList;
		_comment.drawingJson = comment.drawingJson;
	},

	_loadCommentData: function(/*String*/ ownerId, /*String*/ pageName) {
		// summary:
		//		Load the comments attached to the opened page
		//		and sort them by time order
		this._cached[pageName] = Runtime.serverJSONRequest({
			url: "cmd/getComments",
			sync: true,
			content:{
				ownerId: ownerId,
				pageName: pageName
			}
		}).sort(function(c1,c2){
			return c1.created > c2.created ? 1 : c1.created < c2.created ? -1 : 0;
		});
		for(var i=0; i<this._cached[pageName].length; i++){
			var comment = this._cached[pageName][i];
			comment.pageStateList = (comment.hasOwnProperty('pageStateList') && comment.pageStateList) ? 
					dojo.fromJson(comment.pageStateList) : [];
			comment.viewSceneList = (comment.hasOwnProperty('viewSceneList') && comment.viewSceneList) ? 
					dojo.fromJson(comment.viewSceneList) : [];
		}
//FIXME: switch to current states?
		this._cached[pageName].pageState = "Normal";
		this._cached[pageName].pageStateList = this._context.getCurrentStates();
//		this._cached[pageName].viewScene = "";
		this._cached[pageName].viewSceneList = this._context.getCurrentScenes();
		this._cached[pageName].focusedComments = [];
	},

	_destroyCommentWidgets: function() {
		// summary:
		//		Destroy the comment widgets
		var comments = this.comments;
		dojo.forEach(comments, function(comment) {
			comment.destroyRecursive();
		});
		this.comments = [];
		dojo.forEach(this._commentConns, dojo.disconnect);
		this._commentConns = [];
	},

	_render: function() {
		var _comments = this._cached[this._currentPage];
		dojo.forEach(_comments, function(_comment, i) {
			var comment = new Comment({
				commentId: _comment.id,
				subject: _comment.subject,
				content: _comment.content,
				designerId: _comment.designerId,
				pageName: this._currentPage,
				pageState: _comment.pageState,
				pageStateList: _comment.pageStateList,
				viewScene: _comment.viewScene,
				viewSceneList: _comment.viewSceneList,
				ownerId: _comment.ownerId,
				email: _comment.email,
//				depth: parseInt(_comment.depth),
//				order: parseFloat(_comment.order),
				created: _comment.created,  
				parent: this,
				existed: true,
				replyTo: _comment.replyTo,
				drawingJson: _comment.drawingJson,
				closed: this._versionClosed 
			});
			// Build comment data indices, we need this when update the comments
			this._cached.indices[_comment.id] = _comment;
			// Add to the comment indices and append the comment as a reply of
			// the comment identified by the replyTo attribute
			this.commentIndices[comment.commentId] = comment;
			this.commentIndices[comment.replyTo].appendReply(comment);

			this._commentConns.push(
					dojo.connect(comment, "onNewReply", this, "_onNewReply"),
					dojo.connect(comment, "onEditComment", this, "_onEditComment"),
					dojo.connect(comment, "onCommentFocus", this, "_onCommentFocus"),
					dojo.connect(comment, "onCommentBlur", this, "_onCommentBlur")
			);

			if (i === 0) {
				dojo.style(comment.domNode, "borderTop", "none");
			}

			// Populate the shapes
			if (!_comment._hasPopulate) {
				dojo.publish(this._currentPage+"/davinci/review/drawing/addShape", [comment.drawingJson]);
				_comment._hasPopulate = true;
			}
		}, this);
		dojo.forEach(this.comments, function(comment) {
			comment.collapse(true);
		});

	},

	_onEditComment: function(args) {
		var form = this._commentForm,
		comment = this.commentIndices[args.commentId];

		if (comment.ownerId != Runtime.userName) { 
			return;
		}

		if (form.isShowing) {
			// The form is open, we need to do some cleaning.
			this._onCommentFormCancel();
		}

		form.reset();
		form.commentId = args.commentId;
		form.subject.set("value", comment.subject);
		form.content.set("value", comment.content.replace(/<br\/>/g,"\n"));
		if(comment.content) form.hidePlaceHolder();
		form.setEditMode();
		if(comment.isReply()){
			form.setReplyMode();
		}
		form.replyTo = comment.replyTo;
		comment.hide();
		form.moveTo(comment.tempForm);
		form.editFrom = args.commentId;
		form.show();

		// Notify the drawing tool to be in edit mode
		dojo.publish(this._currentPage+"/davinci/review/drawing/enableEditing", 
				[
				 Runtime.userName,
				 form.commentId,
				 { pageState: comment.pageState,
					 pageStateList: comment.pageStateList,
					 viewScene: comment.viewScene,
					 viewSceneList: comment.viewSceneList }
		]);
	},

	_onNewReply: function(args) {
		var form = this._commentForm;

		if (form.isShowing) {
			this._onCommentFormCancel();
		}

		form.reset(); // Ensure that the form is restored
		form.commentId = getNewGuid();
		form.setReplyMode();
		form.replyTo = args.replyTo;
		form.subject.set("value", args.subject);
		var comment = this.commentIndices[args.replyTo];
		form.moveTo(comment.tempForm);
		form.show();

		// Notify the drawing tool to be in edit mode
		dojo.publish(this._currentPage+"/davinci/review/drawing/enableEditing", 
				[
				 Runtime.userName,
				 form.commentId,
				 { pageState: this._cached[this._currentPage].pageState,
					 pageStateList: this._cached[this._currentPage].pageStateList,
					 viewScene: this._cached[this._currentPage].viewScene,
					 viewSceneList: this._cached[this._currentPage].viewSceneList }
		]);
	},

	_onCommentFocus: function(widget, evt) {
		var focusedComments = this._cached[this._currentPage].focusedComments;
		if (!evt || (!evt.ctrlKey && !evt.metaKey)) {
			dojo.forEach(focusedComments, function(commentId) {
				this.commentIndices[commentId].blurComment(true);
			}, this);
			focusedComments.length = 0;
			focusedComments.push(widget.commentId);
			var comment = this.commentIndices[widget.commentId];
			comment.setStatesScenes();
		} else if (evt.ctrlKey || evt.metaKey) {
			if (!dojo.some(focusedComments, function(commentId){ return commentId == widget.commentId; })) {
				focusedComments.push(widget.commentId);
				var comment = this.commentIndices[widget.commentId];
				comment.setStatesScenes();
			}
		}

		if (!evt || !evt.silent) {
			if(this._editor){
				var context = this._editor.getContext();
				var states = (context && context.rootNode && context.rootNode.ownerDocument && 
						context.rootNode.ownerDocument.defaultView &&
						context.rootNode.ownerDocument.defaultView.davinci &&
						context.rootNode.ownerDocument.defaultView.davinci.states);
				if(states){
//FIXME: This isn't working yet with nested state containers.
					states.setState(widget.pageState);
				}
			}
			//FIXME: R/C is stashing away pageState and viewScene on a DOM node
			//This is worrisome - at a minimum, the properties should use a Maqetta prefix of some sort
			//to prevent future collisions.
			//But more important is that we really need to add a SceneManager pointer, too
			//For time being, assume SceneManager from getCurrentScene is same as SceneManager for domNode.viewScene
			var viewScene;
			var currentScene = this._getCurrentScene();
			if(currentScene && currentScene.sm && currentScene.sm.selectScene && widget.viewScene){
				currentScene.sm.selectScene({sceneId:widget.viewScene});
				viewScene = widget.viewScene;
			}
			this.publish(this._currentPage + "/davinci/review/drawing/filter", 
//FIXME: Shouldn't send the structure to /davinci/review/drawing/filter
					[{ /*FIXME: No longer used 
						pageState: this._cached[this._currentPage].pageState, 
						pageStateList: this._cached[this._currentPage].pageStateList, 
						viewScene: viewScene, 
						viewSceneList: this._cached[this._currentPage].viewSceneList
						*/}, 
					 focusedComments]);
		}
	},

	_onCommentBlur: function(widget) {
		var focusedComments = this._cached[this._currentPage].focusedComments;
		for (var i = 0; i < focusedComments.length; i++) {
			if (focusedComments[i] == widget.commentId) {
				if (i == focusedComments.length - 1) {
					focusedComments.pop();
				} else { 
					focusedComments[i] = focusedComments.pop();
				}
			}
		}
//FIXME
		var viewScene = this._cached[this._currentPage].viewScene || this._getCurrentScene().s;
		this.publish(this._currentPage+"/davinci/review/drawing/filter", 
				[{ /*FIXME: No longer used 
					pageState: this._cached[this._currentPage].pageState, 
					pageStateList: this._cached[this._currentPage].pageStateList, 
					viewScene: viewScene, 
					viewSceneList: this._cached[this._currentPage].viewSceneList
					*/}, 
				focusedComments]);
		this.publish(this._currentPage+"/davinci/review/drawing/filter", [{pageState: this._cached[this._currentPage].pageState, viewScene: viewScene}, focusedComments]);
	},

	_onCommentFormCancel: function() {
		dojo.publish(this._currentPage+"/davinci/review/drawing/cancelEditing", []);
		var dim = this._cached[this._currentPage],
		pageState = dim.pageState,
		pageStateList = dim.pageStateList,
		viewScene = dim.viewScene,
		viewSceneList = dim.viewSceneList,
		focusedComments = dim.focusedComments;
		if (focusedComments.length > 0) {
			this.commentIndices[focusedComments[0]].show();
		}
		dojo.publish(this._currentPage+"/davinci/review/drawing/filter", 
				[{ /*FIXME: No longer used 
					pageState: pageState, 
					pageStateList: pageStateList, 
					viewScene: viewScene, 
					viewSceneList: viewSceneList
					*/}, 
				focusedComments]);
	},

	_updateToolbar: function(args) {
		dijit.byId("davinciReviewToolbar.Add").set("disabled", this._versionClosed);
		dijit.byId("davinciReviewToolbar.Reviewers").set("disabled", false);
		var editor = args.editor;

		if (editor && editor.resourceFile) {
			var item = editor.resourceFile.parent;
			var reviewers = item.reviewers;
			var comments = this._cached[this._currentPage];
			dojo.forEach(comments, function(comment) {
				if (!dojo.some(reviewers, function(item) {
					return item.email == comment.email;
				}) && Runtime.userName != item.name)
					reviewers.push({
						name: comment.ownerId,
						email: comment.email
					});
			});
			var children = this.reviewerList.getChildren();
			for (var i = 2 ; i < children.length; i++) {
				children[i].destroy();
			}

			Runtime.reviewers = reviewers;
			dojo.forEach(reviewers, dojo.hitch(this, function(reviewer, index) { 
				//If no name, probably not a Maqetta user and no way they could have comments yet (so color irrelevant)
				if (reviewer.name) { 
					var reviewerDisplayName = Runtime.getUserDisplayName({
						email: reviewer.email,
						userId: reviewer.name
					});
					var check = new CheckedMenuItem({
						label: "<div class='davinciReviewToolbarReviewersColor' style='background-color:" + 
						Review.getColor(reviewer.name) +";'></div><span>"+reviewerDisplayName+"</span>",
							onChange: dojo.hitch(this, function() {
								this._reviewFilterChanged();
								
								// We want to keep the menu open after user changes checkbox state
								this._reviewersBtn.openDropDown();
							}),
							checked: true,
							reviewer:reviewer,
							title: reviewer.email
					});
					this.reviewerList.addChild(check);
					if (this._cached[this._currentPage] && this._cached[this._currentPage].shownColors) {
						var checked = dojo.some(this._cached[this._currentPage].shownColors,function(name) {
							if (name == reviewer.name) return true;
							return false;
						});
						check.set("checked",checked);
					}
				}
			}));
			this._reviewFilterChanged();
		}
	},

	getTopAdditions: function() {
		this.category = "content";
		var filter = new TextBox({
			id: "filterText",
			placeHolder: viewNls.filter
		});
		dojo.connect(filter.domNode, "onkeyup", this, function(e) {
			this._filter();
			dojo.stopEvent(e);
		});

		var toolbar = new Toolbar({id:"davinciReviewToolbar"}, dojo.create("div"));

		// Create the add comment button on the toolbar
		var addBtn = new Button({
			id: toolbar.get("id") + ".Add",
			showLabel: false,
			disabled: true,
			iconClass: "davinciReviewToolbarAdd",
			title: viewNls.addComment,
			onClick: dojo.hitch(this,"_showCommentForm")
		});

		var reviewerList = new Menu({});
		reviewerList.addChild(new CheckedMenuItem({
			label:viewNls.allReviewers,
			checked: true,
			onChange: dojo.hitch(this, function(check) {
				var children = reviewerList.getChildren();
				for (var i = 2; i<children.length; i++) {
					children[i].set("checked", check);
				}
				this._reviewFilterChanged();
				
				// We want to keep the menu open after user changes checkbox state
				this._reviewersBtn.openDropDown();
			})
		}));
		reviewerList.addChild(new MenuSeparator());

		var reviewersBtn = this._reviewersBtn = new DropDownButton({
			id: toolbar.get("id") + ".Reviewers",
			showLabel: false,
			disabled: true,
			iconClass: "davinciReviewToolbarReviewers",
			title: viewNls.showReviewer,
			dropDown: reviewerList
		});
		this.reviewerList = reviewerList;

		toolbar.addChild(addBtn);
		toolbar.addChild(new ToolbarSeparator());
		toolbar.addChild(reviewersBtn);
		dojo.place(dojo.create("br"), toolbar.domNode);
		toolbar.addChild(filter);
		/*toolbar.addChild(fitlerTypeDropDown);*/

		return toolbar.domNode;
	},

	_reviewFilterChanged: function() {
		var reviewers = [];
		var children = this.reviewerList.getChildren();
		for (var i = 2; i<children.length; i++){
			if (children[i].checked) {
				reviewers.push(children[i].reviewer.name);
			}
		}
		//set the select all button.
		children[0].set("checked", reviewers.length == children.length-2);
		if (this._cached[this._currentPage]) {
			this._cached[this._currentPage].shownColors = reviewers;
		}
		dojo.publish(this._currentPage+"/davinci/review/drawing/setShownColorAliases", [reviewers]);
	},	

	_createEditButton : function() {
		if (this.editButton) {
			this.editButton.domNode.style.display = "block";
		} else {
			this.editButton = new Button({
				label: "",
				iconClass: "editButtonIcon",
				disabled: true,
				onClick: dojo.hitch(this, "")
			});
			this.container.domNode.appendChild(this.editButton.domNode);
		}
	},

	_createViewSwitch: function() {
		this.switchWrapper = dojo.create("div",{style:{"float": "right"}});
		var collapse = new Button({
			label: null,
			iconClass: "collapseViewActive",
			onClick: dojo.hitch(this,"collapseAll")
		});
		var expand = new Button({
			label: null,
			iconClass: "expandViewActive",
			onClick: dojo.hitch(this,"expandAll")
		});
		this.switchWrapper.appendChild(collapse.domNode);
		this.switchWrapper.appendChild(expand.domNode);
		this.container.domNode.appendChild(this.switchWrapper);

	},

	_showCommentForm: function() {
		var form = this._commentForm;
		if (form.isShowing) {
			// The form is open, we need to do some cleaning.
			this._onCommentFormCancel();
		}
		form.reset(); // Ensure that the form is restored
		form.commentId = getNewGuid();
		form.show();

		// Notify the drawing tool to be in edit mode
		dojo.publish(this._currentPage+"/davinci/review/drawing/enableEditing", [
			 Runtime.userName,
			 form.commentId,
			 { pageState: this._cached[this._currentPage].pageState,
				 pageStateList: this._cached[this._currentPage].pageStateList,
				 viewScene: this._cached[this._currentPage].viewScene,
				 viewSceneList: this._cached[this._currentPage].viewSceneList }
		]);
	},

	_filter: function() {
		var text = dijit.byId("filterText").get("displayedValue");

		dojo.query(".davinciComment", this.container.domNode).removeClass("davinciReviewHide davinciReviewShow").forEach(function(comment) {
			var widget = dijit.getEnclosingWidget(comment);
			var shouldShow = true;
			shouldShow = widget.subjectNode.innerHTML.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
			widget.contentNode.innerHTML.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
			widget.ownerName&&widget.ownerName.innerHTML.toLowerCase().indexOf(text.toLowerCase()) >= 0;

			if (shouldShow) {
				dojo.addClass(comment,"davinciReviewShow");
				while (widget.replyTo !== "root") {
					widget = this.commentIndices[widget.replyTo];
					dojo.addClass(widget.domNode,"davinciReviewShow");
					dojo.removeClass(widget.domNode,"davinciReviewHide");
				}
				return;
			}
			dojo.addClass(comment,"davinciReviewHide");
		},this);
	},

	expandAll: function(){ 
		dojo.query(".repliesCount", this.container.domNode).removeClass("davinciReviewShow").addClass("davinciReviewHide");
		dojo.query(".currentScope", this.container.domNode).addClass("davinciReviewShow").removeClass("davinciReviewHide");
	},

	isPageOwner: function() {
		return this._getDesignerId() == Runtime.userName;
	},
	
	_getDesignerId: function() {
		var designerId = null;
		var context = this._cached[this._currentPage].context;
		if (context) {
			designerId = context.resourceFile.parent.designerId;
		}
		return designerId;
	},

	popupWarning: function(description) {
		var dialog = dijit.byId("warningDialog");
		if (!dialog) {
			dialog = new Dialog({
				id: "warningDialog",
				title: "",
				style: "width: 300px"
			}, dojo.create("p", {innerHTML : description}));
		}
		dialog.show();
	},

	getReplies: function() {
		return this.comments;
	},

	appendReply: function(/*davinci.review.widgets.Comment*/ reply) {
		this.comments.push(reply);
		if (this.comments.length == 1) {
			// This is the first reply
			dojo.style(reply.domNode, "borderTop", "none");
		}
		reply.placeAt(this.container.domNode);
	},

	_blurAllComments: function() {
		var focusedComments = this._cached[this._currentPage].focusedComments,
		_candidates = [];
		if (focusedComments) {
			dojo.forEach(focusedComments, function(commentId) {
				var comment = this.commentIndices[commentId];
				comment && _candidates.push(comment);
			}, this);
			dojo.forEach(_candidates, function(c) {
				c.blurComment();
			}, this);
		}
	},

	/**
	 * Make a DOM element shining for a while. The background
	 * color will transfer from one to another and then back.
	 * The duration now is 2 seconds.
	 * 
	 * @param elem
	 *            DOM element.
	 * @returns
	 */
	_flash: function(elem) {
		if (!elem) {
			return;
		}

		if (!this._originalBkColor) {
			this._originalBkColor = dojo.style(elem, "backgroundColor");
		}

		coreFx.chain([dojo.animateProperty({
			node: elem,
			duration: 250,
			properties:{
				backgroundColor:{
					start: this._originalBkColor,
					end: '#fef7d9'
				}
			}
		}), dojo.animateProperty({
			node: elem,
			duration: 250,
			properties:{
				backgroundColor:{
					start: '#fef7d9',
					end: this._originalBkColor
				}
			}
		})]).play();
	},
	
	updateStatesScenes: function(){
		var rootNode = this._context.rootNode;
		var statesFocus = States.getFocus(rootNode);
		var pageState = this._cached[this._currentPage].pageState = statesFocus ? statesFocus.state : undefined;
		var pageStateList = this._cached[this._currentPage].pageStateList = this._context.getCurrentStates();;
		var viewScene = this._cached[this._currentPage].viewScene = this._getCurrentScene().s;
		var viewSceneList = this._cached[this._currentPage].viewSceneList = this._context.getCurrentScenes();;
		var focusedComments = this._cached[this._currentPage].focusedComments;
//FIXME
		dojo.publish(this._currentPage+"/davinci/review/drawing/filter", 
				[{ /*FIXME: No longer used 
					pageState: pageState, 
					pageStateList: pageStateList,
					viewScene: viewScene, 
					viewSceneList: viewSceneList
					*/ }, 
				 focusedComments]);
	},

//FIXME: Is this really used and needed?
	/**
	 * Returns true if the given comment should be shown based on currently active states and scenes.
	 */
	commentIsActive: function(comment){
		function normalizeNormalState(val){
			return !val ? States.NORMAL : val;
		}
		var cachedPage = this._cached[this._currentPage];
		var doc = this._context.getDocument();
		var i, cachedObj, commentObj;
		for(i=0; i<cachedPage.pageStateList.length; i++){
			cachedObj = cachedPage.pageStateList[i];
			var cachedState = normalizeNormalState(cachedObj.state);
			commentObj = comment.pageStateList[i];
			var commentState = normalizeNormalState(commentObj.state);
			if(cachedObj && commentObj){
				if(((commentObj.id && commentObj.id === cachedObj.id) || 
						(commentObj.xpath && commentObj.xpath === cachedObj.xpath)) &&
						commentState !== cachedState){
					return false;
				}
			}
		}
		for(var smIndex in cachedPage.viewSceneList){
			var cachedViewSceneList = cachedPage.viewSceneList[smIndex];
			var commentViewSceneList = comment.viewSceneList[smIndex];
			if(cachedViewSceneList && commentViewSceneList){
				for(i=0; i<cachedViewSceneList.length; i++){
					cachedObj = cachedViewSceneList[i];
					commentObj = commentViewSceneList[i];
					if(cachedObj && commentObj){
						if(((commentObj.scId && commentObj.scId === cachedObj.scId) ||
								(commentObj.scXpath && commentObj.scXpath === cachedObj.scXpath)) &&
							((commentObj.sceneId && commentObj.sceneId !== cachedObj.sceneId) ||
								(commentObj.sceneXpath && commentObj.sceneXpath !== cachedObj.sceneXpath))){
							return false;
						}
					}
				}
			}
		}
		return true;
	}
});
});
