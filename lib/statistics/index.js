import { getStatisticDB } from "../mongo/statistic";



export async function getStatisticData(){
    const result = await getStatisticDB();

    return result;
}