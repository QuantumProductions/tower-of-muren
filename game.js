'use strict';

class TowerOfMuren extends Game {
	constructor(options) {
		super(options);
		Color.setup();
		Room.setup();
		Floor.makeAll(this, Floor, Data.floors());
		Slope.makeAll(this, Slope, Data.slopes());
		Ladder.makeAll(this, Ladder, Data.ladders());
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
	}

	scrollSlopeRight(direction) {
		if (this.p.right == false) {
			this.p.flip();
		}
		if (direction == "/") {
			this.scrollAll(Room.walk, Room.walk);
			this.p.increaseSlope(Room.walk, 1);
		} else if (direction == "-") {
			this.scrollAll(Room.walk, 0);
			this.p.increaseSlope(Room.walk, 1);
		} else if (direction == "\\") {
			this.scrollAll(Room.walk, -Room.walk);
			this.p.increaseSlope(Room.walk, 1);
		}
	}

	scrollSlopeLeft(direction) {
		if (this.p.right == true) {
			this.p.flip();
		}
		if (direction == "/") {
			this.scrollAll(-Room.walk, -Room.walk);
			this.p.increaseSlope(Room.walk, -1);
		} else if (direction == "-") {
			this.scrollAll(-Room.walk, 0);
			this.p.increaseSlope(Room.walk, -1);
		} else if (direction == "\\") {
			this.scrollAll(-Room.walk, Room.walk);
			this.p.increaseSlope(Room.walk, -1);
		}
	}

	scrollLadderUp(v) {
		if (this.p.down == true) {
			this.p.flipV();
		}
			this.scrollAll(0, Room.walk);
			this.p.increaseLadder(Room.walk);

			// if (!this.p.laddering()) {
			// 	this.p.ladderDelta = 0;
			// }
	}

	scrollLadderDown(v) {
		if (this.p.up == true) {
			this.p.flipV();
		}
			this.scrollAll(0, -Room.walk);
			this.p.increaseLadder(Room.walk);

			// if (!this.p.laddering()) {
			// 	this.p.ladderDelta = 0;
			// }
	}


	parseInput(key_down_map, key_up_map, key_pressing_map, key_depressing_map) {
		// else, look for floor
		// held, lever hit
		// default do nothing


		if (key_down_map['U1'] == true) {
			if (this.p.laddering()) {
				this.scrollLadderUp(Room.walk);
			} else if (!this.p.sloping()){
				let l = findLadder(this.things['l'], this.p.x, this.p.y, -1);
				if (l) {
					this.p.goLadder(l);
					this.scrollLadderUp(Room.walk);
				} else {
				}
				this.p.down = false;
			}
		} else if (key_down_map['D1'] == true) {
			if (this.p.laddering()) {
				this.scrollLadderDown(Room.walk);
			} else if (!this.p.sloping()){
				let l = findLadder(this.things['l'], this.p.x, this.p.y, 1);
				if (l) {
					this.p.goLadder(l);
					this.scrollLadderDown(Room.walk);
					this.p.down = true;
				} else {

				}
			}
		}

		if (key_down_map['R1'] == true) {
			if (this.p.sloping()) {
				this.scrollSlopeRight(this.p.slopeDirection);
				if (!this.p.sloping()) {
					this.scrollAll(Room.walk, 0);
				}
			} else if (!this.p.ladder){
				let s = findSlope(this.p.x, this.p.y, this.things['s'], 1);
				if (s) {

					this.p.slope(s);
					this.p.right = true;
					// this.scrollSlopeRight(s.direction());
					this.scrollSlopeRight(s.direction());

				} else {
					let f = this.p.walkRight(this.things);
					if (f) {
						this.scrollAll(Room.walk, 0);
					} else {
						console.log("no floor");
					}
				}

			}



			this.p.right = true;
		} else if (key_down_map['L1'] == true) {
			if (this.p.sloping()) {
				this.scrollSlopeLeft(this.p.slopeDirection);
				if (!this.p.sloping()) {
					this.scrollAll(-Room.walk, 0);
				}
			} else if (!this.p.ladder) {
				let s = findSlope(this.p.x, this.p.y, this.things['s'], -1);
				if (s) {
					
					this.p.slope(s);
					this.p.right = false;
					this.scrollSlopeLeft(s.direction());
				} else {
					let f = this.p.walkLeft(this.things);
					if (f) {
						this.scrollAll(-Room.walk, 0);
					} else {
						console.log("no floor L");
					}
					
				}
			}

			this.p.right = false;
		}
	}
}
