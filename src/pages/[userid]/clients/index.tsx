import ClientTable from "@/components/ClientTable";
import TropMain from "@/components/TropMain";
import axios from "axios";
import { useRouter } from "next/router";
import { format } from "path";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { pathClientsAPI, pathCompanyAPI } from "@/features/thunk";
import { useDispatch } from "react-redux";
import { withNamespaces } from "react-i18next";
import { getCurrentDate } from "@/utils/functions";
interface indexProps {
  Company: object;
  clients: Array<object>;
}
export const getServerSideProps = async ({ query }: any) => {
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

const index = ({ Company, clients, t }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const CompanyClients = Object.values(clients).filter(
    (item: any) => item.CompanyID === Company.id
  );
  const [testArr, settestArr] = useState<any>(CompanyClients.reverse());
  const subArrays = [];
  const [From, setFrom] = useState<number>(0);
  const [Format, setFormat] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFormat = window.localStorage.getItem("format");
      const parsedFormat = storedFormat ? JSON.parse(storedFormat) : false;
      setFormat(parsedFormat);
    }
  }, []);
  const [UniqStatus, setUniqStatus] = useState<any>(CompanyClients || []);
  const [UniqArr, setUniqArr] = useState<any>([]);

  interface SortedItem {
    name: string;
    arr: typeof UniqStatus;
  }

  const sortDataByStatus = (data: typeof UniqStatus): SortedItem[] => {
    const statuses = [
      "New",
      "RequestSent",
      "InProgress",
      "Reserved",
      "PurchasedTickets",
      "Arrived",
    ];

    const sortedData: SortedItem[] = statuses.map((status) => ({
      id: `${Math.round(Math.random() * 1000)}`,
      name: status,
      arr: data.filter((item: any) => item.status === status),
    }));

    return sortedData;
  };

  for (let i = 0; i < testArr.length; i += 4) {
    subArrays.push({
      from: i,
      to: testArr.slice(i, i + 4).length,
      arr: testArr.slice(i, i + 4),
    });
  }
  function changeActive(num: number) {
    let paginations = document.querySelectorAll(".pagination");
    paginations.forEach((item) => {
      item.classList.remove("activePrevNextBtn");
    });
    paginations[num].classList.add("activePrevNextBtn");
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = UniqArr.findIndex(
        (e: any) => e.id === source.droppableId
      );
      const destinationColIndex = UniqArr.findIndex(
        (e: any) => e.id === destination.droppableId
      );

      const sourceCol = UniqArr[sourceColIndex];
      const destinationCol = UniqArr[destinationColIndex];

      const sourceTask = [...sourceCol.arr];
      const destinationTask = [...destinationCol.arr];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);
      UniqArr[sourceColIndex].arr = sourceTask;
      UniqArr[destinationColIndex].arr = destinationTask;
      setUniqArr(UniqArr);
      let chStatus = {
        ...destinationTask[0],
        status: UniqArr[destinationColIndex].name,
        ChangeStatus: getCurrentDate(),
      };

      const clientKey =
        Object.keys(clients).reverse()[
          Object.values(testArr).indexOf(
            testArr.filter((i: any) => i.id == destinationTask[0].id)[0]
          )
        ];

      let cop = [...testArr];
      cop.splice(
        testArr.indexOf(
          testArr.filter((i: any) => i.id == destinationTask[0].id)[0]
        ),
        1,
        chStatus
      );
      settestArr([...cop]);
      dispatch(
        pathClientsAPI({
          key: clientKey,
          obj: {
            ...chStatus,
          },
        })
      );
      dispatch(
        pathCompanyAPI({
          key: router.query.userid,
          obj: {
            ...Company,
            DrangHistory: UniqArr,
          },
        })
      );
    }
  };

  if (CompanyClients.length === 0) {
    return (
      <>
        <div className="w-full  pt-5 pb-4 px-10 bg-white">
          <div className="flex items-center gap-16">
            <h1 className=" text-3xl font-semibold">{t("PageName1")}</h1>
          </div>
          <div className=" mt-4 flex justify-between items-center">
            <p className=" text-sm font-normal text-[#838383]"></p>
          </div>
        </div>
        <div className="flex w-full h-[100vh]   py-4 px-10 bg-[#F1F2F4]  justify-center">
          <p className=" mt-[200px] text-3xl font-semibold">
            {t("HeaderAddclientsAq")}
          </p>
        </div>
      </>
    );
  } else {
    useEffect(() => {
      changeActive(From);
      setUniqArr(sortDataByStatus(UniqStatus));
    }, [From]);

    return (
      <>
        <div className="w-full pt-5 max-h-[90%] pb-4 px-10 bg-white">
          <div className="flex items-center gap-16">
            <h1 className=" text-3xl font-semibold">{t("PageName1")}</h1>
            <div className="flex gap-5">
              <>
                <BiMenuAltRight
                  onClick={() => {
                    setFormat(true);

                    // setTimeout(() => {
                    // }, 1000);
                    localStorage.setItem("format", "true");
                  }}
                  className="text-[#22B5DC] text-xl -rotate-90 cursor-pointer"
                  style={Format ? { color: "#22B5DC" } : { color: "black" }}
                />
                <AiOutlineMenu
                  onClick={() => {
                    localStorage.setItem("format", "false");
                    setFormat(false);
                  }}
                  className="text-black text-xl cursor-pointer"
                  style={Format ? { color: "black" } : { color: "#22B5DC" }}
                />
              </>
            </div>
          </div>
          <div className=" mt-4 flex justify-between items-center">
            <p className=" text-sm font-normal text-[#838383]">
              {/* Level 1 / Level 2 / Level 3 */}
            </p>
            <div
              className="flex gap-7 items-center "
              style={Format ? { opacity: 0, cursor: "default" } : {}}
            >
              <p className="text-sm font-normal text-[#838383]">
                {subArrays[From].from + 1} -{" "}
                {subArrays[From].to + subArrays[From].from} {t("of")}{" "}
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
                  className="px-[11px] select-none  py-[9px] text-[#838383] border border-solid border-[#DEE2E6]"
                  style={Format ? { cursor: "default" } : { cursor: "pointer" }}
                >
                  {t("prev")}
                </p>
                {subArrays.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setFrom(idx);
                      changeActive(idx);
                    }}
                    className="px-[11px] pagination select-none  py-[9px]  border border-solid border-[#DEE2E6]"
                    style={
                      Format ? { cursor: "default" } : { cursor: "pointer" }
                    }
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
                  className="px-[11px]  select-none py-[9px] text-[#838383] border border-solid border-[#DEE2E6]"
                  style={Format ? { cursor: "default" } : { cursor: "pointer" }}
                >
                  {t("next")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          {Format ? (
            <div className="grid  grid-cols-6 h-[100vh] dropaa relative bg-[#F1F2F4] max-h-[90%] py-4 select-none  gap-4">
              {UniqArr.map((item: any, idx: any) => (
                <Droppable key={item.id} droppableId={item.id}>
                  {(provided: any) => (
                    <TropMain
                      obj={item}
                      pro={provided}
                      clients={clients}
                      arr={testArr}
                      idx={idx}
                    />
                  )}
                </Droppable>
              ))}
            </div>
          ) : (
            <div className="flex w-full h-[100vh] relative tabl  py-4 px-10 bg-[#F1F2F4]  flex-col overflow-x-scroll overflow-hidden">
              <table className=" w-full ">
                <thead className=" border-b-[1px] border-[#a4a4a4] border-solid">
                  <tr className="w-full">
                    <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start ">
                      {t("Client")}
                    </th>
                    <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                      {t("Status")}
                    </th>
                    <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                      {t("DateOfTheApplication")}
                    </th>
                    <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                      {t("Price")}
                    </th>
                    <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                      {t("Departure")}
                    </th>
                    <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                      {t("CountryOfVisit")}
                    </th>
                    <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                      {t("Mail")}
                    </th>
                    <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                      {t("Hotel")}
                    </th>
                    <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                      {t("Fillial")}
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
                      priceForCompany={item.priceForCompany}
                      priceForHotels={item.priceForHotels}
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
            </div>
          )}
        </DragDropContext>
      </>
    );
  }
};

export default withNamespaces()(index);
