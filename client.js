"use strict";

class GameClient extends Client {
	installGame() {
		this.game = new TowerOfMuren({canvas: this.canvas, client: this});
	}

}