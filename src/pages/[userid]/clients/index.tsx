import ClientTable from "@/components/ClientTable";
import TropMain from "@/components/TropMain";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { FiBook } from "react-icons/fi";

interface indexProps {
  Company: object;
  clients: Array<object>;
}
export const getServerSideProps = async ({ query }) => {
  const response = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin/${query.userid}.json`
  );

  const response2 = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/clients.json`
  );
  const data = await response.json();
  const usersData = await response2.json();

  return {
    props: { Company: data, clients: usersData },
  };
};
const index: React.FC<indexProps> = ({ Company, clients }) => {
  // console.log(Company, clients);

  const CompanyClients = Object.values(clients).filter(
    (item: any) => item.CompanyID === Company.id
  );
  const [testArr, settestArr] = useState<any>(CompanyClients.reverse());
  const subArrays = [];
  const [From, setFrom] = useState<number>(0);
  const [Format, setFormat] = useState<boolean>(true);
  const [UniqStatus, setUniqStatus] = useState<Array<object>>(
    CompanyClients || []
  );

  interface SortedItem {
    name: string;
    arr: typeof UniqStatus;
  }

  const sortDataByStatus = (data: typeof UniqStatus): SortedItem[] => {
    const statuses = [
      "Новое обращение",
      "Запрос отправлен",
      "В процессе",
      "Забронировал",
      "Выкупил билеты",
      "Прибыл",
    ];

    const sortedData: SortedItem[] = statuses.map((status) => ({
      name: status,
      arr: data.filter((item) => item.status === status),
    }));

    return sortedData;
  };
  // console.log(sortDataByStatus(UniqStatus));

  for (let i = 0; i < testArr.length; i += 4) {
    subArrays.push({
      from: i,
      to: testArr.slice(i, i + 4).length,
      arr: testArr.slice(i, i + 4),
    });
  }
  function changeActive(num) {
    let paginations = document.querySelectorAll(".pagination");
    paginations.forEach((item) => {
      item.classList.remove("activePrevNextBtn");
    });
    paginations[num].classList.add("activePrevNextBtn");
  }

  if (CompanyClients.length === 0) {
    return (
      <>
        <div className="w-full  pt-5 pb-4 px-10 bg-white">
          <div className="flex items-center gap-16">
            <h1 className=" text-3xl font-semibold">Клиенты</h1>
          </div>
          <div className=" mt-4 flex justify-between items-center">
            <p className=" text-sm font-normal text-[#838383]">
              Home / Level 2 / Level 3 / клиенты
            </p>
          </div>
        </div>
        <div className="flex w-full h-full  py-4 px-10 bg-[#F1F2F4]  justify-center">
          <p className=" mt-[200px] text-3xl font-semibold">Добавьте Клиента</p>
        </div>
      </>
    );
  } else {
    useEffect(() => {
      changeActive(From);
    }, [From]);
    return (
      <>
        <div className="w-full pt-5 pb-4 px-10 bg-white">
          <div className="flex items-center gap-16">
            <h1 className=" text-3xl font-semibold">Клиенты</h1>
            <div className="flex gap-5">
              {Format ? (
                <>
                  <BiMenuAltRight className="text-[#22B5DC] text-xl -rotate-90 cursor-pointer" />
                  <AiOutlineMenu
                    onClick={() => {
                      setFormat(false);
                    }}
                    className="text-black text-xl cursor-pointer"
                  />
                </>
              ) : (
                <>
                  <BiMenuAltRight
                    onClick={() => {
                      setFormat(true);
                    }}
                    className="text-black text-xl cursor-pointer -rotate-90"
                  />
                  <AiOutlineMenu className="text-[#22B5DC] cursor-pointer text-xl" />
                </>
              )}
            </div>
          </div>
          <div className=" mt-4 flex justify-between items-center">
            <p className=" text-sm font-normal text-[#838383]">
              Home / Level 2 / Level 3 / клиенты
            </p>
            <div className="flex gap-7 items-center">
              <p className="text-sm font-normal text-[#838383]">
                {subArrays[From].from + 1} -{" "}
                {subArrays[From].to + subArrays[From].from} из{" "}
                {CompanyClients.length}
              </p>
              <div className="flex">
                <p
                  onClick={() => {
                    if (From !== 0) {
                      setFrom(From - 1);
                      changeActive(From - 1);
                    }
                  }}
                  className="px-[11px] select-none cursor-pointer py-[9px] text-[#838383] border border-solid border-[#DEE2E6]"
                >
                  Prev
                </p>
                {subArrays.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setFrom(idx);
                      changeActive(idx);
                    }}
                    className="px-[11px] pagination select-none cursor-pointer py-[9px]  border border-solid border-[#DEE2E6]"
                  >
                    {idx + 1}
                  </div>
                ))}

                <p
                  onClick={() => {
                    if (From < subArrays.length - 1) {
                      setFrom(From + 1);
                      changeActive(From + 1);
                    }
                  }}
                  className="px-[11px] cursor-pointer select-none py-[9px] text-[#838383] border border-solid border-[#DEE2E6]"
                >
                  Next
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full h-full  py-4 px-10 bg-[#F1F2F4]  flex-col overflow-x-scroll overflow-hidden">
          {Format ? (
            <div className="grid grid-cols-6 h-[full] max-h-[80%]  py-4   gap-4">
              {sortDataByStatus(UniqStatus).map((item, idx) => (
                <TropMain
                  obj={item}
                  key={idx}
                  clients={clients}
                  arr={testArr}
                />
              ))}
            </div>
          ) : (
            <table className=" w-full ">
              <thead className=" border-b-[1px] border-[#a4a4a4] border-solid">
                <tr className="w-full">
                  <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start ">
                    Клиент
                  </th>
                  <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                    Статус
                  </th>
                  <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                    Дата обращения
                  </th>
                  <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                    Вылет
                  </th>
                  <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                    Страна посещения
                  </th>

                  <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                    Почта
                  </th>
                  <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                    Отель
                  </th>
                  <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                    Филлиал
                  </th>
                </tr>
              </thead>
              <tbody>
                {subArrays[From].arr.map((item: any, idx: number) => (
                  <ClientTable
                    clients={clients}
                    arr={testArr}
                    item={item}
                    name={item.name}
                    birthDate={item.age}
                    status={item.status}
                    ChangeStatus={item.ChangeStatus}
                    DateOfApplication={item.DateOfApplication}
                    GoFrom={item.GoFrom}
                    GoTo={item.GoTo}
                    DateGoFrom={item.DateGoFrom}
                    DateGoTo={item.DateGoTo}
                    email={item.email}
                    Hotel={item.Hotel}
                    Fillial={item.Fillial}
                    Phone={item.Phone}
                    id={item.id}
                    key={idx}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  }
};

export default index;
