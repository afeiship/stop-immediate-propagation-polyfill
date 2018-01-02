if (!Event.prototype.stopImmediatePropagation) {
	(function() {
		'use strict';
		var addEventListener = Node.prototype.addEventListener, removeEventListener = Node.prototype.removeEventListener;

		Node.prototype.addEventListener = function(type, callback, capture) {
			addEventListener.call(this, type, callback.hijackedCallback || (callback.hijackedCallback = function(event) {
				if (!event.immediatePropagationStopped) {
					callback(event);
				}
			}), capture);
		};

		Node.prototype.removeEventListener = function(type, callback, capture) {
			removeEventListener.call(this, type, callback.hijackedCallback || callback, capture);
		};
	}());

	Event.prototype.stopImmediatePropagation = function() {
		'use strict';
		this.immediatePropagationStopped = true;
		this.stopPropagation();
  };

  Event.prototype.isImmediatePropagationStopped = function(){
    return this.immediatePropagationStopped;
  };
}
