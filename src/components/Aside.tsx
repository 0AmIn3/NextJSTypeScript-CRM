import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
interface AsideProps {}

const Aside: React.FC<AsideProps> = () => {
  const { query } = useRouter();

  return (
    <aside className=" w-[342px] bg-[#2E2E2E] max-h-[100vh] h-[100vh]">
      <div className="w-full h-[87px] bg-[#1F1E1E] flex items-center justify-between px-5">
        <img
          src="/img/graylogo.svg"
          className=" opacity-50"
          width="125px"
          alt=""
        />
        <AiOutlineMenu style={{ color: "#868686", fontSize: 24 }} />
      </div>
      <div className="px-5 py-7 text-white">
        <div className="flex flex-col">
          <div className="flex gap-3 ">
            <FiHome style={{ color: "white", fontSize: 24 }} />{" "}
            <span className=" font-semibold text-lg">Меню</span>
          </div>
          <div className="pl-[40px] text-sm font-normal flex flex-col gap-4 mt-5">
            <Link href={`/${query.userid}/clients`}>
              <p>Клиенты</p>
            </Link>
            <Link href={`/${query.userid}/hotels`}>
              <p>Отели</p>
            </Link>
            <Link href={`/${query.userid}/fillials`}>
              <p>Филиалы</p>
            </Link>
          </div>
          <div className=" mt-7 border-[1px] border-solid border-[#646464]"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-3 mt-[50px] ">
            <LuFilter style={{ color: "white", fontSize: 24 }} />{" "}
            <span className=" font-semibold text-lg">Фильтр</span>
          </div>
          <div className="flex gap-3 mt-[40px]">Статус</div>
          <div className="flex gap-3 mt-[40px]">Координатор</div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
