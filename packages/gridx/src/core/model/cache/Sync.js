define("gridx/core/model/cache/Sync", [
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/Deferred",
	"./_Cache"
], function(declare, lang, Deferred, _Cache){

	return declare(/*===== "gridx.core.model.cache.Async", =====*/_Cache, {
		keep: function(){},
		free: function(){},

		when: function(args, callback){
			var d = new Deferred();
			try{
				if(callback){
					callback();
				}
				d.callback();
			}catch(e){
				d.errback(e);
			}
			return d;
		},

		//Private---------------------------------------------
		_init: function(/*method, args*/){
			var t = this;
			if(!t._filled){
				t._storeFetch({ start: 0 });
				if(t.store.getChildren){
					t._fetchChildren();
				}
				t.model._onSizeChange();
			}
		},

		_fetchChildren: function(){
			var s = this._struct,
				pids = s[''].slice(1),
				pid,
				appendChildren = function(pid){
					[].push.apply(pids, s[pid].slice(1));
				};
			while(pids.length){
				pid = pids.shift();
				Deferred.when(this._loadChildren(pid), lang.partial(appendChildren, pid));
			}
		}
	});
});
