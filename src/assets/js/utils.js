function generateData(size = 15, start = 1, end = 100) {
  return Array.from({
    length: size
  }, () => Math.floor(Math.random() * end) + start);
}

function wait(time) {
  return new Promise(resolve =>
    setTimeout(resolve, time));
}


export default {
  generateData,
  wait,
};
