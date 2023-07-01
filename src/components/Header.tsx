import i18n from "@/pages/i18n";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiSettings, FiBell } from "react-icons/fi";

interface HeaderProps {
  ChangeAnim: any;
  setChangeAnim: any;
  t: any;
  title: string;
}

const Header = ({ ChangeAnim, setChangeAnim, t }: any) => {
  const router = useRouter();
  const changeLanguage = (lng: any) => {
    localStorage.setItem("locale", lng);
    i18n.changeLanguage(lng);
  };
  const [Name, setName] = useState<string>("клиента");

  const [views, setviews] = useState<number>(0);
  useEffect(() => {
    if (router.pathname.split("/")[2] == "fillials") {
      setName("fillials");
    } else if (router.pathname.split("/")[2] == "hotels") {
      setName("hotels");
    } else if (router.pathname.split("/")[2] == "clients") {
      setName("clients");
    }
    setviews(
      Number(localStorage.getItem(`blogs`)) -
        Number(localStorage.getItem(`${router.query.userid}/blogView`))
    );
  });

  return (
    <div
      className={
        ChangeAnim
          ? "headerState1 flex gap-8 justify-end  items-center pt-[20px] px-[38px]"
          : "headerState2 flex gap-8 justify-end items-center   pt-[20px] px-[38px]"
      }
    >
      <img
        className={ChangeAnim ? "hidden" : " absolute left-[38px]  "}
        src="/img/logo2.svg"
        alt=""
      />
      {router.pathname.split("/")[2] !== "blogs" ? (
        <div
          onClick={() => {
            router.push(
              `/${router.query.userid}/${router.pathname.split("/")[2]}/add${
                router.pathname.split("/")[2]
              }`
            );
          }}
          className="flex gap-3  cursor-pointer"
        >
          <AiOutlinePlusCircle style={{ color: "#909090", fontSize: 24 }} />{" "}
          <span className="text-[#909090]">{t(`HeaderAdd${Name}`)}</span>
        </div>
      ) : null}

      <div
        onClick={() => {
          router.push(`/${router.query.userid}/blogs/addblog`);
        }}
        className="flex gap-3 cursor-pointer"
      >
        <FiSettings style={{ color: "#909090", fontSize: 24 }} />{" "}
        <span className="text-[#909090]">{t(`HeaderAddBlog`)} </span>
      </div>
      <div className="flex gap-2 items-center">
        <div className=" relative">
          <FiBell
            onClick={() => {
              router.push(`/${router.query.userid}/blogs`);
            }}
            style={{ color: "#909090", fontSize: 24 }}
            className=" cursor-pointer"
          />
          {views > 0 ? (
            <span className=" w-4 h-4 text-center absolute bg-[#ff0000bb] rounded-full text-[10px] text-white p-1  top-[-10px] right-[-5px] flex items-center justify-center">
              <p>{views <= 9 ? views : '9+'}</p>
            </span>
          ) : null}
        </div>
        <div className="stick"></div>
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          className=" text-[#909090]"
          defaultValue={localStorage.getItem("locale")?.toString()}
          name=""
          id=""
        >
          <option value="ru">RU</option>
          <option value="uz">UZ</option>
          <option value="en">EN</option>
        </select>
        <div className="stick"></div>
      </div>
    </div>
  );
};

export default withNamespaces()(Header);
