import { formatDate } from "@/utils/functions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";

interface indexProps {}
export const getServerSideProps = async ({ query }: any) => {
  const response = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin/${query.userid}.json`
  );

  const data = await response.json();

  return {
    props: {
      Company: data,
    },
  };
};
const index = ({ Company }: any) => {
  const router = useRouter();
  const [Blog, setBlog] = useState<any>(
    Company.blogs.filter((i: any) => i.id == router.query.blogid)[0]
  );
  const [locale, setlocale] = useState<any>("ru");


  useEffect(() => {
    if (localStorage.getItem("locale") == "uz") {
      setlocale("en");
    } else {
      setlocale(localStorage.getItem("locale"));
    }
  });

  return (
    <div className="flex w-full h-[100vh] py-2 px-10 bg-[#F1F2F4]  flex-col overflow-x-scroll overflow-hidden">
      <div className="w-full p-8 h-[100%] max-h-[90%] overflow-y-scroll mb-10 bg-white">
        <div className="">
          <div className="flex flex-col  ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <SlArrowLeft
                  onClick={() => {
                    router.back();
                  }}
                  className="text-[#000000] cursor-pointer text-2xl"
                />
                <h1 className="  text-3xl font-bold">{Blog.name}</h1>
              </div>
              <div className=" flex flex-col items-end opacity-50">
                <p>{Blog.time}</p>
                <p>{formatDate(Blog.date , locale)}</p>
              </div>
            </div>
            <div className="w-[100%] max-w-[800px] mt-5 mx-auto">
              <img src={Blog.img} width="100%" alt="" />
            </div>

            {Blog.paragraph.length > 0  
              ? Blog.paragraph.map((text: any, idx: any) => (
                  <p className=" mt-6 text-xl" key={idx}>
                    {text}
                  </p>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
