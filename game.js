'use strict';

class TowerOfMuren extends Game {
	constructor(options) {
		super(options);
		Color.setup();
		Room.setup();
		Floor.makeFloors(this, this.floors());
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

	floors() {
		return [
		[0.5,3,0.625], [0.5, 4, 0.75],
		[0, 3, 0.1],
		[0.5,2,0.5],
		[0.75,1,0.5],
		[0,0,1.5],
		]
	}

	scrollAll(xD) { 
		let exclude = ['p'];
		for (var key of Object.keys(this.things)) {
			if (exclude.indexOf(key) < 0) {
				for (var t of this.things[key]) {
					t.x -= xD;
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
		// held, lever hit
		if (key_down_map['R1'] == true) {
			if (this.p.walkRight(this.things)) {
				this.scrollAll(Room.walk);
			}
		} else if (key_down_map['L1'] == true) {
			if (this.p.walkLeft(this.things)) {
				this.scrollAll(-Room.walk);	
			}
		}
	}
}
