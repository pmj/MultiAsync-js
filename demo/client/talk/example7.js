function AsyncHandler() {
	if (!this instanceof AsyncHandler) return new AsyncHandler();
}
AsyncHandler.prototype = {
	waiting:0,
	args:[],
	next_idx:0,
	final_cb:null,
	final_cb_this:null,

	cb: function() { /* ... */ },
	
	// signals that all callbacks have been produced, registers the completion function
	whenDone: function(fn, this_obj) {
		this.final_cb_this = this_obj || this;
		this.final_cb = fn;
		if (this.waiting == 0) {
			this.final_cb.apply(this.final_cb_this, this.args);
		}
	}
};

