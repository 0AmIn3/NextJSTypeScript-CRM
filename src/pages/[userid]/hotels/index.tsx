import HotelTable from "@/components/HotelTable";
import React, { useEffect, useState } from "react";
import { FiBook } from "react-icons/fi";

interface indexProps {
  hotels: object
  Company: object
}
interface getServerSidePropsProps {
  query:object
}
export const getServerSideProps = async ({ query } :any) => {
  const response = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin/${query.userid}.json`
  );

  const response2 = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/hotels.json`
  );

  const data = await response.json();
  const hotelsData = await response2.json();

  return {
    props: { Company: data, hotels: hotelsData },
  };
};
const index: React.FC<indexProps> = ({ Company, hotels }:any) => {
  
  const CompanyHotels = Object.values(hotels).filter(
    (item : any) => item.CompanyID === Company.id
  ) || [];

  const [testArr, settestArr] = useState<any>(CompanyHotels.reverse());
  const subArrays = [];
  const [From, setFrom] = useState<number>(0);
  
  for (let i = 0; i < testArr.length; i += 5) {
    subArrays.push({
      from: i,
      to: testArr.slice(i, i + 5).length,
      arr: testArr.slice(i, i + 5)
    });
  }
function changeActive(num:number){
    let paginations = document.querySelectorAll('.pagination')
    paginations.forEach(item =>{
      item.classList.remove('activePrevNextBtn')
    })
    paginations[num].classList.add('activePrevNextBtn')
}

if (CompanyHotels.length === 0) {
  return (
    <>
      <div className="w-full  pt-5 pb-4 px-10 bg-white">
        <div className="flex items-center gap-16">
          <h1 className=" text-3xl font-semibold">Отели</h1>
        </div>
        <div className=" mt-4 flex justify-between items-center">
          <p className=" text-sm font-normal text-[#838383]">
            Home / Level 2 / Level 3 / Отели
          </p>
        </div>
      </div>
      <div className="flex w-full h-[100vh]   py-4 px-10 bg-[#F1F2F4]  justify-center">
        <p className=" mt-[200px] text-3xl font-semibold">Добавьте Отель</p>
      </div>
    </>
  );
}else{
  useEffect(()=>{
    changeActive(0)
  })
  return (
    <>
      <div className="w-full pt-5 pb-4 px-10 bg-white">
        <div className="flex items-center gap-16">
          <h1 className=" text-3xl font-semibold">Отели</h1>
        </div>
        <div className=" mt-4 flex justify-between items-center">
          <p className=" text-sm font-normal text-[#838383]">
            Home / Level 2 / Level 3 / Отели
          </p>
          <div className="flex gap-7 items-center">
            <p className="text-sm font-normal text-[#838383]">
            {subArrays[From].from + 1} -{" "}
              {subArrays[From].to + subArrays[From].from} из{" "}
              {testArr.length}
            </p>
            <div className="flex">
            <p onClick={()=>{
                if(From !== 0){
                  setFrom(From - 1)
                  changeActive(From - 1)
                }
              }} className="px-[11px] select-none cursor-pointer py-[9px] text-[#838383] border border-solid border-[#DEE2E6]">
                Prev
              </p>
              {
                subArrays.map((item, idx)=>(
                  <div key={idx}
                  onClick={()=>{
                    setFrom(idx)
                    changeActive(idx)
                  }}
                  className="px-[11px] pagination select-none cursor-pointer py-[9px]  border border-solid border-[#DEE2E6]">
                  {idx + 1}
                </div>
                ))
              }
            
              <p 
              onClick={()=>{
                if(From < subArrays.length - 1){
                  setFrom(From + 1)
                  changeActive(From + 1)
                }
              }} 
              className="px-[11px] cursor-pointer select-none py-[9px] text-[#838383] border border-solid border-[#DEE2E6]">
                Next
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-[100vh] px-10 bg-[#F1F2F4]  flex-col overflow-x-scroll overflow-hidden">
        <table className=" w-full ">
          <thead className=" border-b-[1px] border-[#a4a4a4] border-solid">
            <tr className="w-full">
              <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start ">
                Отели
              </th>
              <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                Город
              </th>
              <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                Цена за ночь
              </th>
              <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                Номер
              </th>
            </tr>
          </thead>
          <tbody>
            {subArrays[From].arr.map((item: any, idx: number) => (
              <HotelTable
                name={item.name}
                City={item.City}
                Price={item.Price}
                Phone={item.Phone}
                hotels={hotels}
                hotel={item}
                arr={CompanyHotels}
                key={idx}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

};

export default index;
