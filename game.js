'use strict';

class TowerOfMuren extends Game {
	constructor(options) {
		super(options);
		Color.setup();
		Room.setup();
		let f = new Floor();
		f.x = 0;
		f.y = Thing.fh - 1;
		f.duration = Room.w * 1.5;
		this.add('f', f);
		console.log(Object.keys(this.things));
	}

	scrollAll(xD) { 
		let exclude = ['p'];
		for (var key of Object.keys(this.things)) {
			// console.log("exclude");
			if (exclude.indexOf(key) < 0) {
				console.log(this.things[key]);
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
		} else if (key_down_map['L1'] == true) {
			this.scrollAll(-Room.walk);
		}
	}
}
