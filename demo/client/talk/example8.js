	// returns a function to be used as an async callback
	// final callback triggers when all these have been called
	cb: function() {
		var idx = this.next_idx++;
		this.waiting++;
		var handler = this,  chained_cbs = arguments;

		return function(data){
			handler.args[idx] = data; // remember argument
			
			if(--handler.waiting == 0 && handler.final_cb)
				handler.final_cb.apply(handler.final_cb_this, handler.args);
			
			// forward to any extra callbacks
			for (var i = 0; i < chained_cbs.length; ++i) 
				chained_cbs[i].apply(this, arguments);
		};
	},
