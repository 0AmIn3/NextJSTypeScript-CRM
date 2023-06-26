import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiSettings, FiBell } from "react-icons/fi";

interface HeaderProps {
  ChangeAnim: boolean;
  setChangeAnim: any;
}

const Header: React.FC<HeaderProps> = ({ ChangeAnim, setChangeAnim }) => {
  const router = useRouter();

  const [Name, setName] = useState<string>("клиента");
  useEffect(() => {
    if (router.pathname.split("/")[2] == "fillials") {
      setName("филиал");
    } else if (router.pathname.split("/")[2] == "hotels") {
      setName("отель");
    } else if (router.pathname.split("/")[2] == "clients") {
      
      setName("клиента");
    }
  });
  // {ChangeAnim ? "headerState1 flex gap-8 justify-end  pt-[35px] px-[38px]" : "headerState2 flex gap-8 justify-end  pt-[35px] px-[38px]"}
  return (
    <div className={ChangeAnim ? "headerState1 flex gap-8 justify-end  items-center pt-[20px] px-[38px]" : "headerState2 flex gap-8 justify-end items-center   pt-[20px] px-[38px]"}>
      <img className={ChangeAnim ? "hidden" : " absolute left-[38px]  "} src="/img/logo2.svg" alt="" />
      <div className="flex gap-3  cursor-pointer">
        <AiOutlinePlusCircle style={{ color: "#909090", fontSize: 24 }} />{" "}
        <span
          onClick={() => {
            router.push(
              `/${router.query.userid}/${router.pathname.split("/")[2]}/add${
                router.pathname.split("/")[2]
              }`
            );
          }}
          className="text-[#909090]"
        >
          Добавить {Name}
        </span>
      </div>
      <div className="flex gap-3">
        <FiSettings style={{ color: "#909090", fontSize: 24 }} />{" "}
        <span className="text-[#909090]">Создать Блог</span>
      </div>
      <div className="flex gap-2 items-center">
        <FiBell style={{ color: "#909090", fontSize: 24 }} />
        <div className="stick"></div>
        <select className=" text-[#909090]" name="" id="">
          <option value="ru">RU</option>
          <option value="uz">UZ</option>
          <option value="en">EN</option>
        </select>
        <div className="stick"></div>
      </div>
    </div>
  );
};

export default Header;
