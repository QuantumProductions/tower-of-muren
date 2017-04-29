'use strict';

class TThing extends Thing {
	constructor(attributes) {
		super();
		this.x = attributes[0] * Room.w;
		this.y = Thing.fh - (attributes[1] * Room.h) - 1;
		this.build(attributes);
	}

	build(attributes) { }
	static key() { return null; }

	static make(game, thingClass, attributes) {
		var thing = new this(attributes);
		game.add(this.key(), thing);
	}

	static makeAll(game, thingClass, data) {
		for (let d of data) {
			this.make(game, thingClass, d);
		}
	}
}

class Floor extends TThing {
	build(attributes) {
		this.l = attributes[1];
		this.duration = attributes[2] * Room.w;
	}

	static key() { return "f" }
}

class Slope extends TThing {
	// constructor(attr) {
	// 	super(attr);
	// 	this.team = 'not';
	// 	this.leverDirection = -1;
	// }

	build(attributes) {
		this.level = attributes[1];
		this.r = attributes[2];
		this.duration = 282.84
	}

	direction() {
		if (this.r == 0 || this.r == 180) {
			return "-";
		} else if (this.r == 45 || this.r == 225) {
			return "\\";
		} else if (this.r == 135 || this.r == 315) {
			return "/";
		}
	}

	static key() { return "s" }
}

class Ladder extends TThing {
	build(attributes) {
		this.level = attributes[1];
	}

	static key() { return "l" }
}