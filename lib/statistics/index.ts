import { getStatisticDB } from "../mongo/statistic";

export async function getStatisticData(): Promise<StatisticsInterface> {
  const result = await getStatisticDB();

  return result;
}

export async function getStatisticDataCurrYear():Promise<YearStatistic> {
  
  try{
    const result = await getStatisticDB();
    const data = result.yearList.find((el) => {
      return el.year === new Date().getFullYear();
    });
  
    if(!data){
      throw new Error('Could not load statistics for current year')
    }
    return data;

  } catch(error){
    throw new Error("Could not load statistics for current year");
  }
  
}
