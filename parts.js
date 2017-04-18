'use strict';

class Floor extends Thing {
	constructor() {
		super();
		this.x = 0;
		this.y = 0;
		this.duration = 0;
	}

	static makeFloor(game, x,level, duration) {
		var f = new Floor();
		f.x = x * Room.w;
		f.l = level;
		f.y = Thing.fh - (level * Room.h) - 1;
		f.duration = duration * Room.w;
		game.add('f', f);
	}

	static makeFloors(game, floors) {
		for (let f of floors) {
			Floor.makeFloor(game, f[0], f[1], f[2]);
		}
	}
}

class Player extends Thing {
	constructor() {
		super();
		this.x = 0;
		this.y = 0;
		this.right = true;
		this.heightDelta = 0;
		this.slopeDirection = "";
	}	

	sloping() {
		// console.log(this.heightDelta);
		if (this.slopeDirection == "-") {
			return this.heightDelta > 280;
		}
		return this.heightDelta > 0 && this.heightDelta < Room.h;
	}

	slope(s, direction) {
		this.heightDelta = 0;
		this.slopeDirection = s.direction();
		this.slopeR = s.r;
	}

	increaseSlope(v, direction) {
		if (this.slopeR > 270 || this.slopeR < 90) {
			if (direction == 1) {
				this.heightDelta -= v;	 //>>>
			} else if (direction == -1) {
				this.heightDelta -= v;	 //<<<
			}
		} else {
			if (direction == 1) {
				this.heightDelta -= v;	
			} else if (direction == -1) {
				this.heightDelta -= v;
			}
		}
	}

	flip() {
		this.heightDelta = Room.h - this.heightDelta;
	}

	walkLeft(things) {
		return findFloor(things['f'], this.x - Room.walk, this.y);
	}

	walkRight(things) {
		return findFloor(things['f'], this.x + Room.walk, this.y);
	}

	
}

class Slope extends Thing {
	constructor() {
		super();
		this.x = 0;
		this.y = 0;
		this.team = 'not';
		this.leverDirection = -1;
		this.r = 135;
		this.duration = 282.84;
		// this.startingR = 135;
		// this.currentR = this.startingR;
	}

	static makeSlope(game, x, level, r) {
		var s = new Slope();
		s.x = x * Room.w;
		s.y = Thing.fh - (level * Room.h) - 1;
		s.level = level;
		s.r = r;
		game.add('s', s);	
	}

	static makeSlopes(game, slopes) {
		for (let s of slopes) {
			Slope.makeSlope(game, s[0], s[1], s[2]);
		}
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
}