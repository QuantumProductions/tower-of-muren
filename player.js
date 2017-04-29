'use strict';

class Player extends Thing {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.h = 9;
    this.right = true;
    this.up = true;
    this.heightDelta = 0;
    this.slopeDirection = "";
    this.ladderDelta = 0;
  } 

  goLadder(l) {
    this.ladderDelta = 0;
    this.ladder = l;
  }

  increaseLadder(v) {
    this.ladderDelta += v;
  }

  flipV() {
    this.ladderDelta = Room.h - this.ladderDelta;
  }

  laddering() {
    if (this.ladder) {
      let isLadder = this.y < this.ladder.y - this.h && this.y > this.ladder.y - Room.h;
      if (!isLadder) {
        this.ladder = null;
      }
      return isLadder
    }

    this.ladder = null;

    return false;
  }


  sloping() {
    if (this.slopeDirection == "-") {
      return this.heightDelta > 280;
    }
    return this.heightDelta > 0 && this.heightDelta < Room.h;
  }

  slope(s, direction) {
    this.heightDelta = 0;
    this.slopeDirection = s.direction();
    this.slopeR = s.r;
  }

  increaseSlope(v, direction) {
      this.heightDelta += v;
  }

  flip() {
    this.heightDelta = Room.h - this.heightDelta;
  }

  walkLeft(things) {
    return findFloor(things['f'], this.x - 0.5 * Room.walk, this.y);
  }

  walkRight(things) {
    return findFloor(things['f'], this.x + 0.5 * Room.walk, this.y);
  }
}
