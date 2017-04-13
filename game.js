'use strict';

class TowerOfMuren extends Game {
	constructor(options) {
		super(options);
		Color.setup();
		Room.setup();
		let f = new Floor();
		f.x = 10;
		f.y = 1100 - 100;
		f.duration = Room.w * 1.5;
		this.add('f', f);
	}
}
