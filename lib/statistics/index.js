import { getStatisticDB } from "../mongo/statistic";



export async function getStatisticData(){
    const result = await getStatisticDB();

    return result;
}


export async function getStatisticDataCurrYear() {
  const result = await getStatisticDB();

    console.log('Set Year', result.yearList[0].year)

    //const date = new Date(result.yearList[0].year);
    

    const data = result.yearList.find(el => {
        return new Date(el.year).getFullYear() === new Date().getFullYear();
    })


    console.log("Set year value", data)

  //const currYear = result.find

  return data;
}