'use strict';

class TowerOfMuren extends Game {
	constructor(options) {
		super(options);
		Color.setup();
		Room.setup();
		Floor.makeFloors(this, Data.floors());
		Slope.makeSlopes(this, Data.slopes());
		this.spawnP();
	}

	spawnP() {
		var p = new Player();
		p.x = 0.5 * Room.w;
		p.y = Thing.fh - 10;
		this.p = p;
		this.add('p', this.p);
	}

	scrollAll(xD, yD) { 
		let exclude = ['p'];
		for (var key of Object.keys(this.things)) {
			if (exclude.indexOf(key) < 0) {
				for (var t of this.things[key]) {
					t.x -= xD;
					t.y += yD;
					if (t.x < 0) {
						t.x += Room.w;
						t.y += Room.h;
					} else if (t.x > Room.w) {
						t.x -= Room.w;
						t.y -= Room.h;
					}
				}
			}
		}

		// for (var p of this.things['p']) {
		// 		// walk with slopes
		// }
	}

	scrollSlopeRight(direction) {
		if (direction == "/") {
			if (this.p.right == false) {
				this.p.flip();
			}
			this.scrollAll(Room.walk, Room.walk);
			this.p.increaseSlope(-Room.walk, 1);
		}
	}

	scrollSlopeLeft(direction) {
		if (direction == "/") {
			if (this.p.right == true) {
				this.p.flip();
			}

			this.scrollAll(-Room.walk, -Room.walk);
			this.p.increaseSlope(Room.walk, -1);
		}
	}

	parseInput(key_down_map, key_up_map, key_pressing_map, key_depressing_map) {
		// else, look for floor
		// held, lever hit
		// default do nothing

		if (key_down_map['R1'] == true) {
			if (this.p.sloping()) {
				this.scrollSlopeRight(this.p.slopeDirection);
			} else {
				let s = findSlope(this.p.x, this.p.y, this.things['s'], 1);
				if (s) {
					this.p.slope(s);
					this.scrollSlopeRight(s.direction());
				} else {
					let f = this.p.walkRight(this.things);
					if (f) {
						this.scrollAll(Room.walk, 0);
					}
				}

			}



			this.p.right = true;
		} else if (key_down_map['L1'] == true) {
			if (this.p.sloping()) {
				this.scrollSlopeLeft(this.p.slopeDirection);
			} else {
				let s = findSlope(this.p.x, this.p.y, this.things['s'], -1);
				if (s) {
					this.p.slope(s);
					this.scrollSlopeLeft(s.direction());
				} else {
					let f = this.p.walkLeft(this.things);
					if (f) {
						this.scrollAll(-Room.walk, 0);
					}
					
				}
			}

			this.p.right = false;
		}
	}
}
