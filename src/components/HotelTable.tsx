import { useRouter } from "next/router";
import React from "react";
import { FiBook } from "react-icons/fi";

interface HotelTableProps {
  name: string;
  City: string;
  Price: number;
  Phone: string;
  hotels: object;
  hotel: object;
  arr: Array<object>;
}

const HotelTable: React.FC<HotelTableProps> = ({
  name,
  City,
  Price,
  Phone,
  hotels,
  hotel,
  arr,
  
}) => {
  const router = useRouter();
  const HotelKey = Object.keys(hotels)[Object.values(arr).indexOf(hotel)];
  return (
    <tr
      onDoubleClick={() => {
        router.push(router.asPath + "/" + HotelKey);
      }}
      className="border-b-[1px] cursor-pointer  border-[#a4a4a4] border-solid"
    >
      <td className="min-w-[200px]  py-6 flex items-center gap-5">
        <FiBook className="text-[24px]" />
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">{name}</p>
        </div>
      </td>
      <td className="min-w-[200px] py-4">
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">{City}</p>
        </div>
      </td>
      <td className="min-w-[200px] py-6">
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">
            {Number(Price).toLocaleString()} сум
          </p>
        </div>
      </td>
      <td className="min-w-[200px] py-6">
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">{Phone}</p>
        </div>
      </td>
    </tr>
  );
};

export default HotelTable;
