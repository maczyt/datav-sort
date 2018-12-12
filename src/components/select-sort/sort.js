export default async function SelectSort(data, frameAnimate, okAnimate) {
  let i;
  let j;
  const len = data.length;
  let minIndex;

  for (i = 0; i < len; i++) {
    minIndex = i;
    await this.setMin(minIndex);
    for (j = minIndex + 1; j < len; j++) {
      await this.next(j);
      if (data[j] < data[minIndex]) {
        minIndex = j;
        await this.setMin(minIndex);
      }
    }

    await this.select(i, minIndex);
    [data[i], data[minIndex]] = [data[minIndex], data[i]];

    // for (j = 0; j < len - i - 1; j++) {
    //   await frameAnimate(data, j, j + 1);
    //   if (data[j] > data[j + 1]) {
    //     [data[j], data[j + 1]] = [data[j + 1], data[j]];
    //   }
    // }
    // okAnimate(j);
    // 最好情况优化
  }

  return data;
}
