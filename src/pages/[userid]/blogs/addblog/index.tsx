import {
  pathClientsAPI,
  pathCompanyAPI,
  postClientsAPI,
} from "@/features/thunk";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { withNamespaces } from "react-i18next";

import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

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
const index = ({ Company, t }: any) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log(Company);
  const logCompany = useSelector((state: any) => state.clients.status);
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month: number | string = currentDate.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day: number | string = currentDate.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const currentDate = new Date();
    let hours: number | string = currentDate.getHours();
    hours = hours < 10 ? `0${hours}` : hours;
    let minutes: number | string = currentDate.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
  };
  const onSubmit = (data: any) => {
    console.log(data);

    let blogs : any = [];

    if (!Company.blogs) {
      blogs = [
        {
          ...data,
          date: getCurrentDate(),
          time: getCurrentTime(),
        },
      ];
    } else {
      blogs = [
        ...Company.blogs,
        {
          ...data,
          date: getCurrentDate(),
          time: getCurrentTime(),
        },
      ];
    }
    // let obj = {
    //   ...Company,
    //   blogs: blogs,
    // };

    dispatch(
      pathCompanyAPI({
        key: router.query.userid,
        obj: {
          ...Company,
          blogs: blogs,
        },
      })
    );
    localStorage.setItem('blogs' , blogs.length)
    if (logCompany) {
        setTimeout(()=>{
            router.push(`/${router.query.userid}/clients`);
        },300)
      }
  };
  
  return (
    <>
      <div className="w-full  px-10 bg-white">
        <div className="flex items-center gap-10">
          <SlArrowLeft
            onClick={() => {
              router.back()
            }}
            className="text-[#22B5DC] cursor-pointer text-xl"
          />
          <h1 className=" text-3xl font-semibold">{t("HeaderAddBlog")}</h1>
        </div>
        <div className=" mt-4 flex justify-between items-center">
          <p className=" text-sm font-normal text-[#838383]">
            Level 1 / Level 2 / Level 3
          </p>
        </div>
      </div>
      <div className="flex w-full h-full py-9 px-10 bg-[#F1F2F4]  flex-col overflow-x-scroll overflow-hidden">
        <div className="w-full p-8 h-[80%] mb-10 bg-white">
          <div className="">
            <form
              className="flex flex-col  justify-between items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-10  w-full justify-between">
                <div className="w-[100%] flex flex-col gap-8">
                  <label htmlFor="name" className="w-full">
                    <p>{t("BlogLog")}</p>
                    <input
                      className="w-full mt-4 px-4 py-3 border border-[#D6D5D5] rounded"
                      id="name"
                      required
                      {...register("name")}
                    />
                  </label>
                  <label htmlFor="title" className="w-full">
                    <p>{t("Title")}</p>
                    <textarea
                      required
                      {...register("title")}
                      className="w-full mt-4 resize-y max-h-[200px] px-4 py-3 border border-[#D6D5D5] rounded"
                      name="title"
                      id="title"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-[50px] flex gap-4">
                <input
                  className="py-[15px] cursor-pointer text-white rounded bg-[#4992CC] px-[53px]"
                  type="submit"
                  value={t("save")}
                />
                <input
                  onClick={() => {
                    router.back()
                  }}
                  className="py-[15px] w-fit cursor-pointer text-white rounded bg-[#EB5757] px-[53px]"
                  type="reset"
                  value={t("cancel")}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withNamespaces()(index);
