require({cache:{
'url:gridx/templates/FilterDialog.html':"<form action=\"./\" onsubmit=\"return false;\">\n<label id=\"${id}_MatchOptionLabel\" for=\"${id}_MatchOptionSelect\">${i18n.relationMsgFront} </label>\n<select data-dojo-type=\"dijit.form.Select\" id=\"${id}_MatchOptionSelect\" aria-labelledby=\"${id}_MatchOptionLabel\">\n\t<option value=\"all\">${i18n.relationAll}</option>\n\t<option value=\"any\">${i18n.relationAny}</option>\n</select>\n\n<div class=\"gridxFilterAccordionWrapper\">\n\t<div data-dojo-type=\"dijit.layout.AccordionContainer\"></div>\n</div>\n\n<div class=\"gridxFilterDialogButtons\">\n\t<input type=\"button\" class=\"gridxFilterDialogBtnAdd\" data-dojo-type=\"dijit.form.Button\" \n\t\t   showLabel=\"false\" iconClass=\"gridxFilterBtnAddRule\" label=\"${i18n.addRuleButton}\"/>\n\t<input type=\"submit\" data-dojo-type=\"dijit.form.Button\" label=\"${i18n.filterButton}\"/>\n\t<input type=\"button\" data-dojo-type=\"dijit.form.Button\" label=\"${i18n.clearButton}\"/>\n\t<input type=\"button\" data-dojo-type=\"dijit.form.Button\" label=\"${i18n.cancelButton}\"/>\n</div>\n</form>\n"}});
define("gridx/modules/filter/FilterDialog", [
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/dom-class",
	"dojo/string",
	"dojo/query",
	"dojo/keys",
	"dijit/registry",
	"dijit/Dialog",
	"dojox/html/metrics",
	"./FilterPane",
	"dojo/text!../../templates/FilterDialog.html",
	"dojo/i18n!../../nls/FilterBar",
	"dijit/form/Select",
	"dijit/form/Button",
	"dijit/layout/AccordionContainer"
], function(declare, lang, array, css, string, query, keys, registry, Dialog, metrics, FilterPane, template, i18n){
	return declare(Dialog, {
		title: i18n.filterDefDialogTitle,
		cssClass: 'gridxFilterDialog',
		grid: null,
		autofocus: false,
		postCreate: function(){
			this.inherited(arguments);
			this.i18n = i18n;
			this.set('content', string.substitute(template, this));
			this._initWidgets();
			css.add(this.domNode, 'gridxFilterDialog');
		},
		
		done: function(){
			// summary:
			//	Apply the filter.
			this.hide();
			this.grid.filterBar.applyFilter(this.getData());
		},
		
		getData: function(){
			// summary:
			//	Get filter data.
			return {
				type: this._sltMatch.get('value'),
				conditions: array.map(this._accordionContainer.getChildren(), function(p){
					return p.getData();
				})
			};
		},
		
		setData: function(data){
			// summary:
			//	Set filter data.
			this.removeChildren();
			if(!data || !data.conditions.length){
				return;
			}
			this._sltMatch.set('value', 'all' && data && data.type);
			array.forEach(data.conditions, function(d){
				this.addRule().setData(d);
			}, this);
		},
		
		removeChildren: function(){
			// summary:
			//	Remove all child of the accodion container.
			array.forEach(this._accordionContainer.getChildren(), function(child){
				this._accordionContainer.removeChild(child);
				child.destroy();
			}, this);
		
		},
		
		clear: function(){
			this.grid.filterBar.confirmToExecute(function(){
				this.grid.filterBar.clearFilter(true);
				this.hide();
			}, this);
		},
		
		cancel: function(){
			this.hide();
		},
		
		show: function(){
			this.inherited(arguments);
			if(!this._accordionContainer.hasChildren()){
				this.addRule();
			}
		},
		
		addRule: function(){
			var ac = this._accordionContainer;
			if(ac.getChildren().length === 3){
				ac._contentBox.w -= metrics.getScrollbar().w;
			}
			var nextRuleNumber = ac.getChildren().length + 1;
			var ruleTitle = string.substitute(this.i18n.ruleTitleTemplate, {ruleNumber: nextRuleNumber});
			var fp = new FilterPane({grid: this.grid, title: ruleTitle});
			ac.addChild(fp);
			ac.selectChild(fp);
			
			if(!this._titlePaneHeight){
				this._titlePaneHeight = fp._buttonWidget.domNode.offsetHeight + 3;
			}
			fp._initCloseButton();
			fp._onColumnChange();
			try{
				fp.tbSingle.focus();//TODO: this doesn't work now.
			}catch(e){}
			css.toggle(ac.domNode, 'gridxFilterSingleRule', ac.getChildren().length === 1);
			
			this.connect(fp, 'onChange', '_updateButtons');
			this._updateButtons();
			this._updateAccordionContainerHeight();
			//scroll to bottom when add a rule
			ac.domNode.parentNode.scrollTop = 100000;
			return fp;
		},
		
		_initWidgets: function(){
			var form = dojo.query('form', this.domNode)[0], _this = this;
			form.onsubmit = function(){
				_this.done();
				return false;
			}
			this._accordionContainer = registry.byNode(query('.dijitAccordionContainer', this.domNode)[0]);
			this._sltMatch = registry.byNode(query('.dijitSelect', this.domNode)[0]);
			var btns = query('.dijitButton', this.domNode);
			this._btnAdd = registry.byNode(btns[0]);
			this._btnFilter = registry.byNode(btns[1]);
			this._btnClear = registry.byNode(btns[2]);
			this._btnCancel = registry.byNode(btns[3]);
			this.connect(this._btnAdd, 'onClick', 'addRule');
			this.connect(this._btnFilter, 'onClick', 'done');
			this.connect(this._btnClear, 'onClick', 'clear');
			this.connect(this._btnCancel, 'onClick', 'cancel');
			this.connect(this._accordionContainer, 'removeChild', '_updateButtons');
			this.connect(this._accordionContainer, 'removeChild', '_updatePaneTitle');
		},
		
		_updatePaneTitle: function(){
			// summary:
			//		Update each pane title. Only called after remove a RULE pane.
			array.forEach(this._accordionContainer.getChildren(), function(pane){
				pane._updateTitle();
			});
		},
		
		_updateButtons: function(){
			var children = this._accordionContainer.getChildren();
			//toggle filter button disable
			if(array.some(children, function(c){return c.getData() === null;})){
				this._btnFilter.set('disabled', true);
			}else{
				this._btnFilter.set('disabled', false);
			}
			//toggle add rule button disable
			var c = this.grid.filterBar.maxRuleCount;
			this._btnAdd.set('disabled', children.length >= c && c > 0);
			this._btnClear.set('disabled', !this.grid.filterBar.filterData);
		},
		
		_updateAccordionContainerHeight: function(){
			// summary:
			//	Update the height of the accordion container to ensure consistent height of each accordion pane.
			var ac = this._accordionContainer, len = ac.getChildren().length;
			ac.domNode.style.height = 145 + len * this._titlePaneHeight + 'px';
			ac.resize();
		},
		uninitialize: function(){
			console.log('bbb');
			this.inherited(arguments);
		}
		
	});
});