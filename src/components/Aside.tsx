import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { AiOutlineMenu } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
interface AsideProps {
  ChangeAnim: boolean;
  setChangeAnim: any;
}

const Aside = ({ ChangeAnim, setChangeAnim , t}: any) => {
  const { query } = useRouter();
  const [Anime, setAnime] = useState<string>("State1");

  return (
    <aside className={ChangeAnim ? "State1" : "State2"}>
      <div
        className={
          ChangeAnim
            ? "w-full h-[87px] bg-[#1F1E1E] flex items-center  justify-between px-5"
            : "w-full h-[87px] bg-[#1F1E1E] flex items-center  justify-center px-5"
        }
      >
        <img
          src="/img/graylogo.svg"
          className={ChangeAnim ? " opacity-50" : "hidden"}
          width="125px"
          alt=""
        />
        <AiOutlineMenu
          onClick={() => {
            setChangeAnim(!ChangeAnim);
          }}
          className="cursor-pointer"
          style={{ color: "#868686", fontSize: 24 }}
        />
      </div>
      <div
        className={
          ChangeAnim
            ? "px-5 py-7  text-white"
            : "px-5 py-7 flex flex-col items-center text-white"
        }
      >
        <div className="flex flex-col">
          <div className="flex gap-3 ">
            <FiHome
              onClick={() => {
                setChangeAnim(true);
              }}
              className="cursor-pointer"
              style={{ color: "white", fontSize: 24 }}
            />{" "}
            <span className={ChangeAnim ? "font-semibold text-lg" : "hidden"}>
              {t("asideMenu")}
            </span>
          </div>
          <div
            className={
              ChangeAnim
                ? "pl-[40px] text-sm font-normal flex flex-col gap-4 mt-5"
                : "hidden"
            }
          >
            <Link href={`/${query.userid}/clients`}>
              <p>{t("PageName1")}</p>
            </Link>
            <Link href={`/${query.userid}/hotels`}>
              <p>{t("PageName2")}</p>
            </Link>
            <Link href={`/${query.userid}/fillials`}>
              <p>{t("PageName3")}</p>
            </Link>
          </div>
          <div
            className={
              ChangeAnim
                ? "mt-7 border-[1px] border-solid border-[#646464]"
                : "hidden"
            }
          ></div>
        </div>
        {/* <div className="flex flex-col">
          <div className="flex gap-3 mt-[50px] ">
            <LuFilter   onClick={() => {
                setChangeAnim(true);
              }} className=" cursor-pointer" style={{ color: "white", fontSize: 24  }} />{" "}
            <span className={ChangeAnim ? "font-semibold text-lg" : "hidden"}>
              Фильтр
            </span>
          </div>
          <div className={ChangeAnim ? "flex gap-3 mt-[40px]" : "hidden"}>
            Статус
          </div>
          <div className={ChangeAnim ? "flex gap-3 mt-[40px]" : "hidden"}>
            Координатор
          </div>
        </div> */}
      </div>
    </aside>
  );
};

export default withNamespaces()(Aside);

