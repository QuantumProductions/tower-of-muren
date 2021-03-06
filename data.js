class Data {
  static floors() {
    let m = 0.125;
    let n = m / 2;
    let t = m + n;
    return [
    [0.5,5,1],
    [0.5,3,0.75], [0.5, 4, 0.75],
    [0.25, 3, 0.1],
    [0.5-m,2,0.5],
    [0.75 + t,1,0.5 - t],
    [0,0,1.5 + t],
    ]
  }

  static slopes() {
    let m = 0.125;
    let n = m / 2;
    let t = m + n;
    return [
      [0.75 + t, 1, 0],
      [0.5, 3, 0]
    ];
  }

  static ladders() {
    let m = 0.125;
    let n = m / 2;
    let t = m + n;
    return [
      [0.1, 4],
      [0.5, 1]
    ]
  }

  static levers() {
    let m = 0.125;
    let n = m / 2;
    let t = m + n;
    return [
      [0.5 + m, 2, 0]
    ]
  }
}