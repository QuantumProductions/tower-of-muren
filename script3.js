findLadder = function(ladders, x, y, direction) {
  for (var l of ladders) {
    if (findLadder2(l, x, y, direction)) {
      return l;
    }
  }

  return null;
}

findLadder2 = function(l, x, y, direction) {
  if (x > l.x - 10 * Room.walk && x < l.x +  10 * Room.walk) {
    if (direction == 1) {
       return Math.abs((l.y - 200) - y) < 11;
    } else if (direction == -1) {
      return Math.abs(y - l.y) < 11;
    }


  }
  // if (x > l.x - 4 * Room.walk && x < l.x +  4 * Room.walk && (Math.abs(y - l.y) < 11 || Math.abs(y - 200) - l.y < 11)) {
    // return true;
  // }

  return null;
}

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
      let slope = findSlopeLeft(x, y, s);
      if (slope != null) {
        return slope;
      }
    }
  }

  return null;
}

findSlopeRight = function(x, y, s) {
  if (s.x > x - 1) {

  if (Math.abs(s.y - y) < 11 && s.x - x <= Room.walk && (s.r == 45 || s.r == 315 || s.r == 0)) {
    //account for all 3 / - \ angles
    return s;
  } else if (Math.abs(s.y - y) < 11 && Math.abs(s.x - (x + s.duration)) < 11 && s.r == 180) {
    //can calculate 200 from 284 thru trig
    return s;
  } else if (Math.abs( (y - Room.h) - (s.y)) < 11 && Math.abs(s.x - (x + 200)) < 11 && s.r == 135) { //top right coming /
    return s;
  } else if (Math.abs( (s.y - Room.h) - (y)) < 11 && Math.abs(s.x - (x + 200)) < 11 && s.r == 225) { //bottom right coming \
    return s;
  } 
  }
  return null;
}

findSlopeLeft = function(x, y, s) {
  if (s.x < x + 1) {
  if (Math.abs(s.y - y) <= 11 && x - s.x <= Room.walk && (s.r == 225 || s.r == 135 || s.r == 180)) {
    //account for all 3 / - \ angles
    return s;
  } else if (Math.abs(s.y - y) < 11 && Math.abs(x - (s.x + s.duration)) < 11 && s.r == 0) {
    //can calculate 200 from 284 thru trig
    return s;
  } else if (Math.abs( (y - Room.h) - (s.y)) < 11 && Math.abs((s.x + 200) - x) < 11 && s.r == 45) { //top left coming \
    return s;
  } else if (Math.abs( (s.y - Room.h) - (y)) < 11 && Math.abs((s.x + 200) - x) < 11 && s.r == 315) { //bottom left coming /
    return s;
  } 
  }
  return null; 
}