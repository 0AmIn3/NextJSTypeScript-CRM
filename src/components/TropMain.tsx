import React from "react";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import TropItem from "./TropItem";

interface TropMainProps {
  obj: any;
  arr: any
  clients: any
}

const TropMain: React.FC<TropMainProps> = ({ obj , arr , clients }) => {
  return (
    <div  className=" h-[95%]   overflow-y-scroll  flex flex-col gap-3 pb-[100px] bg-white  ">
      <div className="flex max-h-[500px] justify-between px-[16px] pt-3 items-center w-full">
        <h1 className="w-1/2">{obj.name}</h1>
        <span className="h-[23px] w-[26px] p-1 flex justify-center items-center bg-[#22B5DC] text-center rounded-[100px] text-white">
          {obj.arr.length}
        </span>
      </div>
      <div  className="w-full px-2 flex  flex-col gap-4 mt-4">
        {obj.arr.map((item:any, idx:any) => (
          <TropItem item={item} key={idx} arr={arr}
          clients={clients} />
        ))}
      </div>
    </div>
  );
};

export default TropMain;
