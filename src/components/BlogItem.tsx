import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";

interface BlogItemProps {}

const BlogItem = ({ name, title, date, time, locale, item, t }: any) => {
  // console.log(item);
  const router = useRouter();
  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date: Date = new Date(dateString);

    return date.toLocaleDateString(locale, options);
  }
  // console.log(`/${router.query.userid}/blogs/${item.id}`);

  return (
    <div className="  blogitem p-5 max-h-[480px] flex flex-col justify-between gap-6 rounded-2xl">
      <div className="flex flex-col gap-4">
        <h1 className=" text-3xl font-bold">{name}</h1>
        <div className=" w-full  h-[100px] overflow-hidden   ">
          <img src={item.img} className=" my-0 mx-auto" alt="" />
        </div>
        <hr />
        <div className=" max-h-[100px] scrnone  overflow-hidden relative overflow-y-auto scroll-smooth ">
          {item.paragraph.map((i: string, idx: number) => (
            <p className=" mt-4">{i}</p>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-end  ">
        <Link
          className="h-fit"
          href={`/${router.query.userid}/blogs/${item.id}`}
        >
          <p className=" text-blue-400 flex items-end cursor-pointer hover:underline  ">
            {t("More")}
          </p>
        </Link>
        <div className=" flex flex-col items-end opacity-50">
          <p>{time}</p>
          <p>{formatDate(date)}</p>
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(BlogItem);
