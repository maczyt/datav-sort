export default async function SelectSort(data) {
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
  }

  return data;
}
