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

Turtle.prototype.draw = function(cnv, c) {
	c.fillStyle = c.strokeStyle;
	c.fillText("@", Room.w / 2, Thing.fh - 10);

	return;
	let x = this.x;
	let y = this.y;
	c.beginPath();
	let w = 8;
	c.arc(x, y - 12, 40, 1 * Math.PI, 2 * Math.PI);

	

	if (this.right) {
		c.moveTo(x - 40, y - 12);
		c.lineTo(x + 40, y - 12);
		c.lineTo(x + 40 + 20, y - 12 - 10);
		c.lineTo(x + 40 + 20, y - 12 + 10);
		c.lineTo(x + 40, y -12);
		c.moveTo(x + 40 + 14, y - 16);
		c.lineTo(x + 40 + 16, y - 14);
	} else {
		c.moveTo(x + 40, y - 12);
		c.lineTo(x - 40, y - 12);
		c.lineTo(x - 40 - 20, y - 12 - 10);
		c.lineTo(x - 40 - 20, y - 12 + 10);
		c.lineTo(x - 40, y -12);
		c.moveTo(x - 40 - 14, y - 16);
		c.lineTo(x - 40 - 16, y - 14);
	}


	c.moveTo(x - 18, y - 12);
	c.lineTo(x - 18 - 12, y + 9);
	c.lineTo(x - 18 + 12, y + 9);
	c.lineTo(x - 18, y - 9);

	c.moveTo(x + 18, y - 12);
	c.lineTo(x + 18 - 12, y + 9);
	c.lineTo(x + 18 + 12, y + 9);
	c.lineTo(x + 18, y - 12);

	
	c.stroke();
}