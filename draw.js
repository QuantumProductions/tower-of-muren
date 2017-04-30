Thing.prototype.draw = function(client, context) {
	context.beginPath();
	context.fillStyle = Color.main;
	context.arc(this.x, this.y, 8, 0, 2 * Math.PI, false);	
	context.fill();
};

// Lever.prototype.draw = function(c, ct) {
// 	this.render(ct, this.x, this.y, this.position);
// 	this.render(ct, this.x - Room.w, this.y - Room.h, this.position);
// 	this.render(ct, this.x + Room.w, this.y + Room.h, this.position);
// }

Lever.prototype.render = function(c, x, y, p) {
	c.beginPath();
	c.moveTo(x, y);
	
}

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
	var rp = rotate_point(this.x + this.duration, this.y, this.x, this.y, this.r);
	c.lineTo(rp.x, rp.y);
	c.moveTo(this.x + Room.w, this.y + Room.h);
	rp = rotate_point(this.x + Room.w + this.duration, this.y + Room.h, this.x + Room.w, this.y + Room.h, this.r);
	c.lineTo(rp.x, rp.y);
	c.moveTo(this.x - Room.w, this.y - Room.h);
	rp = rotate_point(this.x - Room.w + this.duration, this.y - Room.h, this.x - Room.w, this.y - Room.h, this.r);
	c.lineTo(rp.x, rp.y);

	c.stroke();
}

Ladder.prototype.draw = function(cnv, c) {
	this.draw4(c, this.x, this.y);
	this.draw4(c, this.x - Room.w, this.y - Room.h);
	this.draw4(c, this.x + Room.w, this.y + Room.h);
}

Ladder.prototype.draw4 = function(c, x, y) {
	var w = 6;
	this.draw2(c, x - w, y);
	this.draw2(c, x + w, y);
	var s = 12;
	for (var i = y; i > y - Room.h; i-= s) {
		this.draw3(c, x - w, i, w * 2);
	}
}

Ladder.prototype.draw2 = function(c, x, y) {
	c.beginPath();
	c.moveTo(x, y);
	c.lineTo(x, y - Room.h);
	c.stroke();
}

Ladder.prototype.draw3 = function(c, x, y, w) {
	c.beginPath();
	c.moveTo(x, y);
	c.lineTo(x + w, y);
	c.stroke();
}