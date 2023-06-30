import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";

interface BlogItemProps {}

const BlogItem = ({ name, title, date, time, locale , t }: any) => {

  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date: Date = new Date(dateString);

    return date.toLocaleDateString(locale, options);
  }
  return (
    <div className="  blogitem p-5 flex flex-col gap-6 rounded-2xl">
      <h1 className=" text-3xl font-bold">{name}</h1>
      <div className=" max-h-[200px] scrnone  overflow-hidden relative overflow-y-auto scroll-smooth ">
        {title}
      </div>
      <div className="self-end flex flex-col items-end opacity-50">
        <p>{time}</p>
        <p>{formatDate(date)}</p>
      </div>
    </div>
  );
};

export default withNamespaces()(BlogItem);
