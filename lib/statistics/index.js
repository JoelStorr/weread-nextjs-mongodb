import { getStatisticDB } from "../mongo/statistic";

export async function getStatisticData() {
  const result = await getStatisticDB();

  return result;
}

export async function getStatisticDataCurrYear() {
  const result = await getStatisticDB();
  const data = result.yearList.find((el) => {
    return new Date(el.year).getFullYear() === new Date().getFullYear();
  });

  return data;
}
