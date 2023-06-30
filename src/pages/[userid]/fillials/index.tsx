import FillialTable from "@/components/FillialTable";
import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { AiOutlineMenu } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { FiBook } from "react-icons/fi";

interface indexProps {}
export const getServerSideProps = async ({ query }: any) => {
  const response = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin/${query.userid}.json`
  );

  const response2 = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/fillials.json`
  );
  const data = await response.json();
  const fillialsData = await response2.json();

  return {
    props: { Company: data, fillials: fillialsData },
  };
};
const index = ({ Company, fillials , t }: any) => {
  const CompanyFillials = Object.values(fillials).filter(
    (item: any) => item.CompanyID === Company.id
  );

  const [testArr, settestArr] = useState<any>(CompanyFillials.reverse() || []);
  const subArrays = [];
  const [From, setFrom] = useState<number>(0);

  for (let i = 0; i < testArr.length; i += 5) {
    subArrays.push({
      from: i,
      to: testArr.slice(i, i + 5).length,
      arr: testArr.slice(i, i + 5),
    });
  }
  function changeActive(num: number) {
    let paginations = document.querySelectorAll(".pagination");
    paginations.forEach((item) => {
      item.classList.remove("activePrevNextBtn");
    });
    paginations[num].classList.add("activePrevNextBtn");
  }

  if (CompanyFillials.length === 0) {
    return (
      <>
        <div className="w-full   pt-5 pb-4 px-10 bg-white">
          <div className="flex items-center gap-16">
            <h1 className=" text-3xl font-semibold">{t("PageName3")}</h1>
          </div>
          <div className=" mt-4 flex justify-between items-center">
            <p className=" text-sm font-normal text-[#838383]">
              Level 1 / Level 2 / Level 3
            </p>
          </div>
        </div>
        <div className="flex w-full h-[100vh]  py-4 px-10 bg-[#F1F2F4]  justify-center">
          <p className=" mt-[200px] text-3xl font-semibold">{t("HeaderAddfillialsAq")}</p>
        </div>
      </>
    );
  } else {
    useEffect(() => {
      changeActive(0);
    });
    return (
      <>
        <div className="w-full  pt-5 pb-4 px-10 bg-white">
          <div className="flex items-center gap-16">
            <h1 className=" text-3xl font-semibold">{t("PageName3")}</h1>
          </div>
          <div className=" mt-4 flex justify-between items-center">
            <p className=" text-sm font-normal text-[#838383]">
            Level 1 / Level 2 / Level 3 
            </p>
            <div className="flex gap-7 items-center">
              <p className="text-sm font-normal text-[#838383]">
                {subArrays[From].from + 1} -{" "}
                {subArrays[From].to + subArrays[From].from} {t("of")} {testArr.length}
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
                  {t("prev")}
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
                   {t("next")}  
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
                  {t("PageName3")}
                </th>
                <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                  {t("City")}
                </th>
                <th className="min-w-[200px] pt-5 pb-8 text-sm font-medium text-[#909090] text-start">
                  {t("Number")}
                </th>
              </tr>
            </thead>
            <tbody>
              {subArrays[From].arr.map((item: any, idx: number) => (
                <FillialTable
                  name={item.name}
                  City={item.City}
                  Phone={item.Phone}
                  fillials={fillials}
                  filial={item}
                  arr={CompanyFillials}
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

export default withNamespaces()(index);