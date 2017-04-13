wrapPilot = function(thing) {
  if (thing.x < 100) {
    thing.x += (thing.fw - 200);
  } else if (thing.x > thing.fw - 100) {
    thing.x -= (thing.fw - 200);
  }
  // if (thing.x < thing.wingSpan()) {
  //   thing.x = thing.fw - thing.wingSpan();
  // } else if (thing.x > thing.fw - thing.wingSpan()) {
  //   thing.x = thing.wingSpan();
  // }

  var floor = thing.fh + thing.noseSpan() - thing.engineSpan() - 4;

  if (thing.y < thing.topLimit()) {
    thing.positionAtTop();
    if (thing.game.quantumpilot) {
      thing.game.advanceToQuantumPilot();
      thing.positionAtBottom();
      // thing.y = thing.fh - thing.engineSpan() - 4;
    }
  } else if (thing.bottomPoint() > thing.fh) {
    thing.positionAtBottom();
    // thing.y = floor;
  }
}

wrapClone = function(thing) {
  if (thing.x < 100) {
    thing.x += (thing.fw - 200);
  } else if (thing.x > thing.fw - 100) {
    thing.x -= (thing.fw - 200);
  }

  if (thing.y < thing.engineSpan()) {
    thing.y = thing.engineSpan();
  } else if (thing.y > thing.fh - thing.noseSpan()) {
    thing.y = thing.fh - thing.noseSpan();
  }
}

wrapBullet = function(thing) {
  if (thing.x < 100) {
    if (thing.ox) {
      thing.mx = Math.abs(thing.mx);
    } else {
      thing.x += (thing.fw - 200)
    }
    
  } else if (thing.x > thing.fw - 100) {
    if (thing.ox) {
      thing.mx = -Math.abs(thing.mx);
    } else {
      thing.x -= (thing.fw - 200);
    }
    
  } 
}