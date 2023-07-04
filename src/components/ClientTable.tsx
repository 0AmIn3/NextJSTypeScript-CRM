import { formatDate } from "@/utils/functions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { FiBook } from "react-icons/fi";

interface ClientTableProps {
  item: Object;
  id: string;
  name: string;
  birthDate: number;
  status: string;
  ChangeStatus: string;
  DateOfApplication: string;
  GoFrom: string;
  GoTo: string;
  DateGoFrom: string;
  DateGoTo: string;
  email: string;
  Hotel: string;
  Fillial: string;
  Phone: string;
  arr: Array<Object>;
  clients: Object;
  priceForCompany: number;
  priceForHotels: number;
}

const ClientTable = ({
  name,
  birthDate,
  status,
  ChangeStatus,
  DateOfApplication,
  GoFrom,
  DateGoFrom,
  GoTo,
  DateGoTo,
  email,
  Hotel,
  Fillial,
  Phone,
  item,
  id,
  arr,
  clients,
  priceForCompany,
  priceForHotels,
  t,
}: any) => {
  const router = useRouter();
  const clientKey =
    Object.keys(clients).reverse()[Object.values(arr).indexOf(item)];
  function calculateAge(birthDate: string) {
    const birthDateObj = new Date(birthDate);
    const now = new Date();

    let age = now.getFullYear() - birthDateObj.getFullYear();

    // Проверяем, прошел ли уже день рождения в текущем году
    const hasPassedBirthday =
      now.getMonth() > birthDateObj.getMonth() ||
      (now.getMonth() === birthDateObj.getMonth() &&
        now.getDate() >= birthDateObj.getDate());

    // Уменьшаем возраст, если день рождения еще не наступил
    if (!hasPassedBirthday) {
      age--;
    }

    return age;
  }

  const [locale, setlocale] = useState<any>("ru");
  useEffect(() => {
    if(localStorage.getItem("locale") !== undefined){
      if (localStorage.getItem("locale") == "uz") {
        setlocale("en");
      } else {
        setlocale(localStorage.getItem("locale"));
      }
    }
  
  }, []);



  return (
    <tr
      onDoubleClick={() => {
        router.push(router.asPath + "/" + clientKey);
      }}
      className="border-b-[1px] cursor-pointer  border-[#a4a4a4] border-solid"
    >
      <td className="min-w-[200px]  py-6 flex items-center gap-5">
        <FiBook className="text-[24px]" />
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">{name}</p>
          <span className="text-sm font-medium text-[#909090]">
            {calculateAge(birthDate.toString())} {t("years")}
          </span>
        </div>
      </td>
      <td className="min-w-[200px] py-4">
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">{t(`${status}`)}</p>
          <span className="text-sm font-medium text-[#909090]">
            {formatDate(ChangeStatus , locale)}
          </span>
        </div>
      </td>
      <td className="min-w-[200px] py-6">
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">
            {formatDate(DateOfApplication , locale)}
          </p>
        </div>
      </td>
      <td className="min-w-[200px] py-6">
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">
            {(priceForCompany + priceForHotels).toLocaleString()} {t("sum")}
          </p>
        </div>
      </td>
      <td className="min-w-[200px] py-6">
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">{GoFrom}</p>
          <span className="text-sm font-medium text-[#909090]">
            {formatDate(DateGoFrom , locale)}
          </span>
        </div>
      </td>
      <td className="min-w-[200px] py-6">
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">{GoTo}</p>
          <span className="text-sm font-medium text-[#909090]">
            {formatDate(DateGoTo , locale)}
          </span>
        </div>
      </td>

      <td className="min-w-[200px] py-6">
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">{email}</p>
        </div>
      </td>
      <td className="min-w-[200px] py-6">
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">{Hotel}</p>
        </div>
      </td>
      <td className="min-w-[200px] py-6">
        <div className="flex flex-col gap-[6px]">
          <p className=" text-[black] text-sm font-medium">{Fillial}</p>
        </div>
      </td>
    </tr>
  );
};

export default withNamespaces()(ClientTable);
