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
		this.x = 0;
		this.y = 0;
		this.team = 'not';
		this.leverDirection = -1;
		this.r = 135;
		// this.startingR = 135;
		// this.currentR = this.startingR;
	}
}