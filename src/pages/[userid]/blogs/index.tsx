import BlogItem from "@/components/BlogItem";
import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";

export const getServerSideProps = async ({ query }: any) => {
  const response = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin/${query.userid}.json`
  );

  const data = await response.json();

  return {
    props: { Company: data },
  };
};
const index = ({ Company, t }: any) => {
  const [Blogs, setBlogs] = useState<any>([]);
  const [locale, setlocale] = useState<any>("ru");
  useEffect(() => {
    if (localStorage.getItem("locale") == "uz") {
      setlocale("en");
    } else {
      setlocale(localStorage.getItem("locale"));
    }

    if(!Company?.blogs){
      setBlogs([])
    }else{
      setBlogs([...Company?.blogs].reverse())
    }
  });

  if (Blogs.length === 0) {
    return (
      <>
  
        <div className="flex w-full h-[100vh]   py-4 px-10 bg-[#F1F2F4]  justify-center">
          <p className=" mt-[200px] text-3xl font-semibold">
            {t("addblog")}
          </p>
        </div>
      </>
    );
  } else {
    return (
      <div className="p-10">
        <h1 className=" text-3xl font-bold">{t("OurBlogs")}</h1>

        <div className=" grid grid-cols-2 max-h-[83vh] gap-6 mt-10 overflow-hidden p-5 overflow-y-scroll">
          {Blogs.map((item: any, idx: any) => (
            <BlogItem
              name={item.name}
              title={item.title}
              date={item.date}
              time={item.time}
              locale={locale}
              key={idx}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default withNamespaces()(index);
