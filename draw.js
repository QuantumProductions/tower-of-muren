Thing.prototype.draw = function(client, context) {

};

Floor.prototype.draw = function(c, ct) {
	ct.beginPath();
	ct.strokeStyle = Color.main;
	this.render(ct, this.x, this.y, this.duration);
	ct.stroke();
	ct.closePath();
}

Floor.prototype.render = function(ct, x, y, remain) {
	ct.moveTo(x, y);
	if (remain + x <= Room.w) {
		ct.lineTo(x + remain, y);
		ct.lineTo(x + remain, y);
	} else {
		ct.lineTo(Room.w, y);
		// ct.lineTo(Room.w, y);
		this.render(ct, 0, y - Room.h, remain - (Room.w - x));

	}

}
