import {
  pathClientsAPI,
  pathCompanyAPI,
  postClientsAPI,
} from "@/features/thunk";
import { getCurrentDate, getCurrentTime } from "@/utils/functions";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
  const logCompany = useSelector((state: any) => state.clients.status);

  const [StateBlog, setStateBlog] = useState<any>({
    id: uuidv4(),
    name: "",
    img: "",
    date: getCurrentDate(),
    time: getCurrentTime(),
    paragraph: [],
  });

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    console.log(imageUrl);
    setStateBlog({
      ...StateBlog,
      img: imageUrl,
    });
  };
  const handleParagraphChange = (event: any, idx: number) => {
    let cop = {
      ...StateBlog,
    };
    cop.paragraph.splice(idx, 1, event);
    setStateBlog({
      ...StateBlog,
      paragraph: cop.paragraph,
    });
  };
  const DeleteParagraphChange = (idx: number) => {
    let cop = {
      ...StateBlog,
    };
    cop.paragraph.splice(idx, 1);
    setStateBlog({
      ...cop,
    });
  };
  const onSubmit = () => {
    // console.log(data);

    let blogs: any = [];
    let cop = {
      ...StateBlog,
      img: "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/03/what-is-a-blog-1.webp",
    };

    if (!Company.blogs) {
      blogs = [cop];
    } else {
      blogs = [...Company.blogs, cop];
    }
    console.log(blogs);

    dispatch(
      pathCompanyAPI({
        key: router.query.userid,
        obj: {
          ...Company,
          blogs: blogs,
        },
      })
    );
    localStorage.setItem("blogs", blogs.length);
    if (logCompany) {
      setTimeout(() => {
        router.push(`/${router.query.userid}/blogs`);
      }, 300);
    }
  };

  return (
    <>
      <div className="w-full  px-10 bg-white">
        <div className="flex items-center gap-10">
          <SlArrowLeft
            onClick={() => {
              router.back();
            }}
            className="text-[#22B5DC] cursor-pointer text-xl"
          />
          <h1 className=" text-3xl font-semibold">{t("HeaderAddBlog")}</h1>
        </div>
        <div className=" mt-4 flex justify-between items-center">
          <p className=" text-sm font-normal text-[#838383]">
            {/* Level 1 / Level 2 / Level 3 */}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex w-1/2 h-[100vh] py-9 px-10 bg-[#F1F2F4]  flex-col overflow-x-scroll overflow-hidden">
          <div className="w-full p-8 overflow-y-scroll  h-[80%] mb-10 bg-white">
            <div className="">
              <div
                className="flex flex-col  justify-between items-center"
                // onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex gap-10  w-full justify-between">
                  <div className="w-[100%] flex flex-col gap-8">
                    <label htmlFor="name" className="w-full">
                      <p>{t("BlogLog")}</p>
                      <input
                        className="w-full mt-4 px-4 py-3 border border-[#D6D5D5] rounded"
                        id="name"
                        required
                        onInput={(e: any) => {
                          setStateBlog({
                            ...StateBlog,
                            name: e.target.value,
                          });
                          // console.log(e.target.value);
                        }}
                      />
                    </label>
                    <label htmlFor="title" className="w-full">
                      <p>{t("addFile")}</p>
                      <input
                        type="file"
                        className="mt-5"
                        lang="en"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>

                    {StateBlog.paragraph.length > 0
                      ? StateBlog.paragraph.map((text: any, idx: any) => (
                          <div className="" key={idx}>
                            <textarea
                              required
                              className="w-full mt-4 resize-y min-h-[73px] max-h-[200px] px-4 py-3 border border-[#D6D5D5] rounded"
                              onChange={(e) => {
                                handleParagraphChange(e.target.value, idx);
                              }}
                            />
                            <p
                              className="py-[15px] w-fit cursor-pointer text-white rounded bg-[#EB5757] px-[53px]"
                              onClick={() => {
                                DeleteParagraphChange(idx);
                              }}
                            >
                              {t("delAbz")}
                            </p>
                          </div>
                        ))
                      : null}
                    <p
                      onClick={() => {
                        let cop = {
                          ...StateBlog,
                        };
                        cop.paragraph.push("");
                        setStateBlog({
                          ...cop,
                        });
                      }}
                      className="py-[15px] cursor-pointer text-center text-white rounded bg-[#4992CC] px-[53px]"
                    >
                      {t("addAbz")}
                    </p>
                  </div>
                </div>

                <div className="mt-[50px] flex gap-4">
                  <input
                    className="py-[15px] cursor-pointer text-white rounded bg-[#4992CC] px-[53px]"
                    type="submit"
                    value={t("save")}
                    onClick={() => {
                      onSubmit();
                    }}
                  />
                  <input
                    onClick={() => {
                      router.back();
                    }}
                    className="py-[15px] w-fit cursor-pointer text-white rounded bg-[#EB5757] px-[53px]"
                    type="reset"
                    value={t("cancel")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 h-[100vh] py-2 px-10 bg-[#F1F2F4]  flex-col overflow-x-scroll overflow-hidden">
          <div className="w-full p-8 h-[80%] max-h-[80%] overflow-y-scroll mb-10 bg-white">
            <div className="">
              <div className="flex flex-col  ">
                <h1 className=" text-3xl font-bold">{StateBlog.name}</h1>
                {StateBlog.img !== "" ? (
                  <img
                    src={StateBlog.img}
                    width="100%"
                    className="max-w-[600px] mt-5 mx-auto"
                    height="100px"
                    alt=""
                  />
                ) : null}
                {StateBlog.paragraph.length > 0
                  ? StateBlog.paragraph.map((text: any, idx: any) => (
                      <p className=" mt-6" key={idx}>
                        {text}
                      </p>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withNamespaces()(index);
