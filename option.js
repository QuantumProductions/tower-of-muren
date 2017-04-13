"use strict";

class NullOption {
	static run(game) {
		
	}
}

class OptionCloneCounter {
	static counterClass() {
		return CloneCounter;
	}

	static run(game) {
		var c = this.counterClass();
		var cloneCounter = new c();
		game.add('clone-counter', cloneCounter);
		game.things['clone-counter'] = [];
		cloneCounter = new c();
		game.add('clone-counter', cloneCounter);
	}
}


class Option {
	constructor(o) {
		this.cloneCounter = NullOption; // OptionCloneCounter; //
		this.cloneCounter = OptionCloneCounter;
		Option.transitionReset = 1
	}
}
