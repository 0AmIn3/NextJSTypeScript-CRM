import { useRouter } from "next/router";
import React from "react";
import { FiBook } from "react-icons/fi";

interface FillialTableProps {
  name: string;
  City: string;
  Phone: string;
  fillials: Array<object>;
  filial: object;
  arr: Array<object>;
}

const FillialTable: React.FC<FillialTableProps> = ({
  name,
  City,
  Phone,
  fillials,
  filial,
  arr,
}) => {
  const router = useRouter();
  const FilialKey = Object.keys(fillials)[Object.values(arr).indexOf(filial)];
  return (
    <tr
      onDoubleClick={() => {
        router.push(router.asPath + "/" + FilialKey);
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
          <p className=" text-[black] text-sm font-medium">{Phone}</p>
        </div>
      </td>
    </tr>
  );
};

export default FillialTable;
