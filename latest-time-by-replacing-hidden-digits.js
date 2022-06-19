function maximumTime(time) {
  for (let h = 23; h >= 0; h--) {
    for (let m = 59; m >= 0; m--) {
      const fh = h < 10 ? `0${h}` : `${h}`;
      const fm = m < 10 ? `0${m}` : `${m}`;
      const tt = `${fh}:${fm}`;
      let match = true;
      for (let i = 0; i < tt.length; i++) {
        if (time[i] !== "?" && time[i] !== tt[i]) {
          match = false;
        }
      }
      if (match) {
        return tt;
      }
    }
  }
}

(() => {
  console.log(maximumTime("2?:?0") === "23:50");
  console.log(maximumTime("0?:3?") === "09:39");
  console.log(maximumTime("1?:22") === "19:22");
})();
