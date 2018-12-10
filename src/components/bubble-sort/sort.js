export default async function BubbleSort(data, frameAnimate, okAnimate) {
  let i;
  let j;
  const len = data.length;
  let flag = false;
  for (i = 0; i < len; i++) {
    for (j = 0; j < len - i - 1; j++) {
      await frameAnimate(data, j, j + 1);
      if (data[j] > data[j + 1]) {
        [data[j], data[j + 1]] = [data[j + 1], data[j]];
        flag = true;
      }
    }
    okAnimate(j);
    // 最好情况优化
    if (!flag) {
      break;
    }
  }

  return data;
}
