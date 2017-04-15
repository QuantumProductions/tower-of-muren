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

class Turtle extends Thing {
	constructor() {
		super();
		this.x = 0;
		this.y = 0;
		this.right = true;
	}	

	walkLeft() {
		this.right = false;
	}

	walkRight() {
		this.right = true;
	}
}