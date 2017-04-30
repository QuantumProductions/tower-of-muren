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
	build(attributes) {
		this.level = attributes[1];
		this.team = attributes[2];
		this.r = Lever.slopes[this.team];
		this.duration = 282.84
		
	}

	direction() {
		if (this.r == 0 || this.r == 180) {
			return "-";
		} else if (this.r == 45 || this.r == 225) {
			return "\\";
		} else if (this.r == 135 || this.r == 315) {
			return "/";
		} else {
			return " ";
		}
	}

	loop(){
		super.loop();
		let tr = Lever.slopes[this.team];
		if (this.r < tr) {
			this.r++;
		} else if (this.r > tr) {
			this.r--;
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

class Lever extends TThing {
	static setup() {
		Lever.slopes = [225];
	}

	build(attributes) {
		this.team = attributes[2];
		this.position = -1;
		this.r = 225;
		this.tr = 225;
	}

	loop() {
		super.loop();
		if (this.r < this.tr) {
			this.r++;
		} else if (this.r > this.tr) {
			this.r--;
		}
	}

	static pushRight(team) {
		var slopes = Lever.slopes;
		var v = slopes[team];
		v -= 45;
		slopes[team] = v;
		Lever.slopes = slopes;
		console.log(Lever.slopes);
	}

	static pushLeft(team) {
		var slopes = Lever.slopes;
		slopes[team] += 45;
		Lever.slopes = slopes;
	}

	pushRight() {
		if (this.position == -1) {
			this.tr += 45;
			Lever.pushRight(this.team);
			this.position++;
			return true;
		} else if (this.position == 0) {
			this.tr += 45;
			Lever.pushRight(this.team);
			this.position++;
			return true;
		}

		return false;
	}

	pushLeft() {
		if (this.position == 1) {
			this.tr -= 45;
			Lever.pushLeft(this.team);
			this.position--;
			return true;
		} else if (this.position == 0) {
			this.tr -= 45;
			this.position--;
			Lever.pushLeft(this.team);
			return true;
		}

		return false;
	}

	static key() {
		return 'v';
	}
}