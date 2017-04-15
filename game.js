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

		// console.log(findFloor(this.things['f'], p.x, p.y));

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

	parseInput(key_down_map, key_up_map, key_pressing_map, key_depressing_map) {
		// else, look for floor
		// held, lever hit
		// default do nothing

		if (key_down_map['R1'] == true) {
			if (this.p.sloping()) {
				console.log("You're sloping!");
			} else {
				let s = findSlope(this.p.x, this.p.y, this.things['s'], 1);
				if (s) {
					console.log("Found a slope!");
					console.log(s.r);
				} else {
					if (this.p.walkRight(this.things)) {
				this.scrollAll(Room.walk, 0);
					}					
				}

			}




		} else if (key_down_map['L1'] == true) {
			if (this.p.walkLeft(this.things)) {
				this.scrollAll(-Room.walk, 0);	
			}
		}
	}
}
