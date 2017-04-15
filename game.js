'use strict';

class TowerOfMuren extends Game {
	constructor(options) {
		super(options);
		Color.setup();
		Room.setup();
		Floor.makeFloors(this, this.floors());
		let f = new Floor();
		f.x = 0;
		f.y = Thing.fh - 1;
		f.duration = Room.w * 1.5;
		// 

		this.add('f', f);

		this.spawnTurtle();
	}

	spawnTurtle() {
		var p = new Turtle();
		p.x = 0.5 * Room.w;
		p.y = Thing.fh - 10;
		this.p = p;
		this.add('p', this.p);

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
		if (key_down_map['R1'] == true) {
			// console.log("hi");
			this.scrollAll(Room.walk);
			this.p.walkRight();
		} else if (key_down_map['L1'] == true) {
			this.scrollAll(-Room.walk);
			this.p.walkLeft();
		}
	}
}
