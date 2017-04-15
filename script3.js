findFloor = function(floors, x, y) {
  var here = null;
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
