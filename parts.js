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
		this.slopeRemain = 0;
		this.slopeDirection = "";
	}	

	sloping() {
		return this.slopeRemain > 0 && this.slopeRemain <= Room.h;
	}

	slope(s, direction) {
		this.slopeRemain = Room.h;	
		this.slopeDirection = s.direction();
	}

	increaseSlope(v) {
		this.slopeRemain += v;
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
		if (this.r == 0) {
			return ">";
		} else if (this.r == 45 || this.r == 225) {
			return "\\";
		} else if (this.r == 135 || this.r == 315) {
			return "/";
		}
	}
}