define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/dom-construct",
	"dojo/dom-class",
	"dojo/string",
	"dojo/query",
	"dijit/registry",
	"dojox/html/ellipsis",
	"dojox/html/metrics",
	"./DistinctComboBoxMenu",
	"./Filter",
	"dojo/text!../../templates/FilterPane.html",
	"dojo/i18n!../../nls/FilterBar",
	"dijit/layout/ContentPane",
	"dijit/form/Select",
	"dijit/form/TextBox",
	"dijit/form/DateTextBox",
	"dijit/form/TimeTextBox",
	"dijit/form/RadioButton",
	"dijit/form/NumberTextBox",
	"dijit/form/ComboBox"
], function(declare, lang, array, dom, css, string, query, registry, ellipsis, metrics, DistinctComboBoxMenu, Filter, template, i18n){
	var ANY_COLUMN_VALUE = '_gridx_any_column_value_';
	
	function isAnyColumn(colid){
		return colid == ANY_COLUMN_VALUE;
	}
	return declare([dijit.layout.ContentPane], {
		//content: template,
		sltColumn: null,
		sltCondition: null,
		grid: null,
		title: i18n.defaultRuleTitle,
		postCreate: function(){
			this.inherited(arguments);
			this.i18n = i18n;
			this.set('content', string.substitute(template, this));
			this._initFields();
			this._initSltCol();
			this.connect(this.sltColumn, 'onChange', '_onColumnChange');
			this.connect(this.sltCondition, 'onChange', '_onConditionChange');
			this.comboText.dropDownClass = DistinctComboBoxMenu;
			this._onConditionChange();//In the latest dijit, onChange event is no longer fired after creation
		},
	
		getData: function(){
			// summary:
			//	Get the filter defined by this filter pane.
			var value = this._getValue(), 
				colId = this.sltColumn.get('value'),
				condition = this.sltCondition.get('value');
			
			if(condition === 'isEmpty' || (value !== null && (condition !== 'range' || (value.start && value.end)))){
				return {
					colId: isAnyColumn(colId) ? '' : colId,
					condition: condition,
					value: condition === 'isEmpty' ? '' : value,
					type: this._getType()
				};
			}else{
				return null;
			}
		},
		setData: function(data){
			// summary:
			//	Set the data of the pane to restore UI.
			if(data === null){return;}
			this.sltColumn.set('value', data.colId, null);
			this._onColumnChange();
			this.sltCondition.set('value', data.condition, null);
			this._onConditionChange();
			this._setValue(data.value);
		},
		close: function(){
			var ac = this._getContainer();
			if(ac.getChildren().length === 4){
				//while there's less than 4 rules, no scroll bar
				ac._contentBox.w += metrics.getScrollbar().w;
			}
			
			if(this === ac.selectedChildWidget){
				//select previous pane if this is current, consistent with EDG filter.
				var i = array.indexOf(ac.getChildren(), this);
				if(i > 0){ac.selectChild(ac.getChildren()[i-1]);}
			}
			
			ac.removeChild(this);
			css.toggle(ac.domNode, 'gridxFilterSingleRule', ac.getChildren().length === 1);
			this.grid.filterBar._filterDialog._updateAccordionContainerHeight();
		},
		onChange: function(){
			// summary:
			//	event: fired when column, condition or value is changed
		},
		_getContainer: function(){
			return registry.byNode(this.domNode.parentNode.parentNode.parentNode);
		},
		_initFields: function(){
			this.sltColumn = registry.byNode(query('li>table', this.domNode)[0]);
			this.sltCondition = registry.byNode(query('li>table', this.domNode)[1]);
			var fields = this._fields = [
				this.tbSingle = registry.byNode(query('.gridxFilterPaneTextWrapper > .dijitTextBox', this.domNode)[0]),
				this.tbNumber = registry.byNode(query('.gridxFilterPaneNumberWrapper > .dijitTextBox', this.domNode)[0]),
				this.comboText = registry.byNode(query('.gridxFilterPaneComboWrapper > .dijitComboBox', this.domNode)[0]),
				this.sltSingle = registry.byNode(query('.gridxFilterPaneSelectWrapper > .dijitSelect', this.domNode)[0]),
				this.dtbSingle = registry.byNode(query('.gridxFilterPaneDateWrapper > .dijitDateTextBox', this.domNode)[0]),
				this.dtbStart = registry.byNode(query('.gridxFilterPaneDateRangeWrapper > .dijitDateTextBox', this.domNode)[0]),
				this.dtbEnd = registry.byNode(query('.gridxFilterPaneDateRangeWrapper > .dijitDateTextBox', this.domNode)[1]),
				this.ttbSingle = registry.byNode(query('.gridxFilterPaneTimeWrapper > .dijitTimeTextBox', this.domNode)[0]),
				this.ttbStart = registry.byNode(query('.gridxFilterPaneTimeRangeWrapper > .dijitTimeTextBox', this.domNode)[0]),
				this.ttbEnd = registry.byNode(query('.gridxFilterPaneTimeRangeWrapper > .dijitTimeTextBox', this.domNode)[1]),
				this.rbTrue = registry.byNode(query('.gridxFilterPaneRadioWrapper .dijitRadio', this.domNode)[0]),
				this.rbFalse = registry.byNode(query('.gridxFilterPaneRadioWrapper .dijitRadio', this.domNode)[1])
			];
			
			this.rbTrue.domNode.nextSibling.htmlFor = this.rbTrue.id;
			this.rbFalse.domNode.nextSibling.htmlFor = this.rbFalse.id;
			var name = 'rb_name_' + Math.random();
			this.rbTrue.set('name', name);
			this.rbFalse.set('name', name);
			
			array.forEach(fields, function(field){
				this.connect(field, 'onChange', '_onValueChange');
			}, this);
		},
		_initSltCol: function(){
			var colOpts = [{label: i18n.anyColumnOption, value: ANY_COLUMN_VALUE}],
				fb = this.grid.filterBar, 
				sltCol = this.sltColumn;
			array.forEach(this.grid.columns(), function(col){
				if(!col.isFilterable())return;
				colOpts.push({value: col.id, label: col.name()});
			}, this);
			sltCol.addOption(colOpts);
		},
		_initCloseButton: function(){
			// summary:
			//	Add a close button to the accordion pane.
			//  Must be called after adding to an accordion container.
			var btnWidget = this._buttonWidget;
			var closeButton = dom.create('span', {
				className: 'gridxFilterPaneCloseButton',
				innerHTML: '<img src="' + this._blankGif + '"/>',
				tabIndex: 0,
				title: 'Close'
			}, btnWidget.domNode, 'last');
			this.connect(closeButton, 'onclick', 'close');
			css.add(btnWidget.titleTextNode, 'dojoxEllipsis');
		},
		
		_onColumnChange: function(){
			var colId = this.sltColumn.get('value');
			var opt = this.grid.filterBar._getConditionOptions(isAnyColumn(colId) ? '' : colId);
			var slt = this.sltCondition;
			if(slt.options && slt.options.length){slt.removeOption(slt.options);}
			slt.addOption(lang.clone(opt));
			this._updateTitle();
			this._updateValueField();
			this.onChange();
		},
		_onConditionChange: function(){
			this._updateValueField();
			this._updateTitle();
			this.onChange();
		},
		_onValueChange: function(){
			this._updateTitle();
			this.onChange();
		},
		_getDataType: function(){
			// summary:
			//		Get current column data type
			var colid = this.sltColumn.get('value');
			var dataType = 'string';
			if(!isAnyColumn(colid)){
				dataType = this.grid.column(colid).dataType();
			}
			return dataType;
		},
		_getType: function(){
			// summary:
			//	Get current filter type, determined by data type and condition.
			var mapping = {'string': 'Text', number: 'Number', date: 'Date', time: 'Time', 'boolean': 'Radio'};
			var type = mapping[this._getDataType()];
			if('range' === this.sltCondition.get('value')){type += 'Range';} ;
			return type;
		},
		_updateTitle: function(){
			if(!this._buttonWidget){return;}
			var title, value = this._getValue(), 
				type = this._getType(), condition = this.sltCondition.get('value'),
				txtNode = this._buttonWidget.titleTextNode;
			
			if(value && (condition !== 'range' || (value.start && value.end))){
				title = this.sltColumn.get('displayedValue') + ' ' + this.grid.filterBar._getRuleString(condition, value, type);
			}else{
				var ruleNumber = array.indexOf(this._getContainer().getChildren(), this) + 1;
				title = string.substitute(this.i18n.ruleTitleTemplate, {ruleNumber: ruleNumber});
			}
			txtNode.innerHTML = title;
			txtNode.title = title.replace(/<\/?span[^>]*>/g, '').replace('&nbsp;', ' ');
		},
		_needComboBox: function(){
			// summary:
			//	Whether current state needs a combo box for string input, may rewrite to support virtual column
			var colId = this.sltColumn.get('value');
			return this._getType() === 'Text' && !isAnyColumn(colId) && this.grid._columnsById[colId].field;
		},
		_updateValueField: function(){
			// summary:
			//	Update the UI for field to show/hide fields.
			var type = this._getType(), colId = this.sltColumn.get('value');
			var combo = this._needComboBox();
			
			array.forEach(['Text','Combo', 'Date', 'Number', 'DateRange', 'Time', 'TimeRange', 'Select', 'Radio'], function(k){
				css.remove(this.domNode, 'gridxFilterPane' + k);
			}, this);
			
			css.add(this.domNode, 'gridxFilterPane' + (combo ? 'Combo' : type));
			var disabled = this.sltCondition.get('value') === 'isEmpty';
			array.forEach(this._fields, function(f){f.set('disabled', disabled)});
			
			if(combo){
				if(!this._dummyCombo){
					//HACK: mixin query, get, etc methods to store, remove from 2.0.
					this._dummyCombo = new dijit.form.ComboBox({store: this.grid.store});
				}
				//init combobox
				var col = this.grid._columnsById[colId];
				lang.mixin(this.comboText, {
					store: this.grid.store,
					searchAttr: col.field,
					fetchProperties: {sort:[{attribute: col.field, descending: false}]}
				});
			}
		},
		_getValue: function(){
			// summary:
			//		Get current filter value
			var type = this._getType(), combo = this._needComboBox();
			switch(type){
				case 'Text':
					return (combo ? this.comboText : this.tbSingle).get('value') || null;
				case 'Number':
					return isNaN(this.tbNumber.get('value')) ? null : this.tbNumber.get('value');
				case 'Select':
					return this.sltSingle.get('value') || null;
				case 'Date':
					return this.dtbSingle.get('value') || null;
				case 'DateRange':
					return {start: this.dtbStart.get('value'), end: this.dtbEnd.get('value')};
				case 'Time':
					return this.ttbSingle.get('value') || null;
				case 'TimeRange':
					return {start: this.ttbStart.get('value'), end: this.ttbEnd.get('value')};
				case 'Radio':
					return !!this.rbTrue.get('checked');
				default:
					return null;
			}
		},
		_setValue: function(value){
			if(!value){return;}
			var type = this._getType(), combo = this._needComboBox();
			switch(type){
				case 'Text':
					(combo ? this.comboText : this.tbSingle).set('value', value);
					break;
				case 'Number':
					this.tbNumber.set('value', value);
					break;
				case 'Select':
					this.sltSingle.set('value', value);
					break;
				case 'Date':
					this.dtbSingle.set('value', value);
					break;
				case 'DateRange':
					this.dtbStart.set('value', value.start);
					this.dtbEnd.set('value', value.end);
					break;
				case 'Time':
					this.ttbSingle.set('value', value);
					break;
				case 'TimeRange':
					this.ttbStart.set('value', value.start);
					this.ttbEnd.set('value', value.end);
					break;
				case 'Radio':
					this.rbTrue.set('checked', true);
					break;
			}
		},
		
		uninitialize: function(){
			this.inherited(arguments);
			if(this._dummyCombo){this._dummyCombo.destroyRecursive();}
		}
	});
});
