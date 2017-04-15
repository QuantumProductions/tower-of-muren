findFloor = function(floors, x, y) {
  for (var f of floors) {
    if (findFloor2(f, x, y, f.x, f.y, f.duration)) {
      return f;
    }
  }

  return null;
}

findFloor2 = function(floor, x, y, fx, fy, duration) {
  if (fx > Room.w) {
    fx -= Room.w;
    fy -= Room.h;
  }

  if (duration <= 0) {
    return null;
  }

  if (Math.abs(fy - y) < 11 && Math.abs(fx - x) < 11) {
    return true;
  }

  return findFloor2(floor, x, y, fx + 1, fy, duration - 1);
}

findSlope = function(x, y, slopes, xD) {
  for (var s of slopes) {
    // adjacent first
    if (xD == 1) {
      let slope = findSlopeRight(x, y, s);
      if (slope != null) {
        return slope;
      }
    } else if (xD == -1) {
      // return findSlopeLeft(x, y, s);
    }
  }

  return null;
}

findSlopeRight = function(x, y, s) {
  if (Math.abs(s.y - y) < 11 && s.x - x < Room.walk && (s.r < 90 || s.r > 270)) {
    //account for all 3 / - \ angles
    console.log("even");
    return s;
  } else if (Math.abs(s.y - y) < 11 && Math.abs(s.x - (x + s.duration)) < 11 && s.r == 180) {
    //can calculate 200 from 284 thru trig
    return s;
    console.log()
  } else if (Math.abs( (y - Room.h) - (s.y)) < 11 && Math.abs(s.x - (x + 200)) < 11 && s.r == 135) { //top right coming /
    console.log(".135");
    return s;
  } else if (Math.abs( (s.y - Room.h) - (y)) < 11 && Math.abs(s.x - (x + 200)) < 11 && s.r == 225) { //bottom right coming \
    console.log(".225");
    return s;
  } 

  return null;
}

// findSlopeLeft()