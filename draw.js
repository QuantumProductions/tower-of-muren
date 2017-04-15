Thing.prototype.draw = function(client, context) {

};

Floor.prototype.draw = function(c, ct) {
	ct.beginPath();
	// console.log(this.x);
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

Player.prototype.draw = function(cnv, c) {
	c.fillStyle = c.strokeStyle;
	c.fillText("@", Room.w / 2, this.y);
	return;
}

Slope.prototype.draw = function(cnv, c) {
	c.beginPath();
	c.moveTo(this.x, this.y);
	let rp = rotate_point(this.x + this.duration, this.y, this.x, this.y, this.r);
	c.lineTo(rp.x, rp.y);
	c.stroke();
}