import { pathClientsAPI, pathHotelsAPI, postHotelsAPI } from "@/features/thunk";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { withNamespaces } from "react-i18next";

import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
interface indexProps {}
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
  const logHotel = useSelector((state: any) => state.hotels.status);

  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    dispatch(
      postHotelsAPI({
        CompanyID: Company.id,
        ...data,
      })
    );
    setTimeout(() => {
      router.push(`/${router.query.userid}/hotels`);
    }, 300);
  };
  return (
    <>
      <div className="w-full  px-10 bg-white">
        <div className="flex items-center gap-10">
          <SlArrowLeft
            onClick={() => {
              router.push(`/${router.query.userid}/hotels`);
            }}
            className="text-[#22B5DC] cursor-pointer text-xl"
          />
          <h1 className=" text-3xl font-semibold">{t("HeaderAddhotels")}</h1>
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
              <div className="flex gap-10 justify-between">
                <div className="w-[100%]">
                  <label htmlFor="name" className="w-full">
                    <p>{t("HotelName")}</p>
                    <input
                      className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                      id="name"
                      required
                      {...register("name")}
                    />
                  </label>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="age" className="w-1/2">
                      <p>{t("NightPrice")}</p>
                      <input
                        className="w-full outline-none select-none px-4 py-3 border border-[#D6D5D5] rounded"
                        id="age"
                        required
                        {...register("Price")}
                      />
                    </label>
                    <label htmlFor="city" className="w-1/2">
                      <p>{t("City")}</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="city"
                        required
                        {...register("City")}
                      />
                    </label>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="Phone" className="w-1/2">
                      <p>{t("HotelPhone")}</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="Phone"
                        type="tel"
                        pattern="+[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        required
                        {...register("Phone", {
                          // required: 'Phone number is required',
                          // pattern: {
                          //   value: /^\+?\+998\d{9}$/,
                          //   message: 'Invalid phone number format',
                          // },
                        })}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {errors.Phone && <span>This field is required</span>}
              <div className="mt-[50px] flex gap-4">
                <input
                  className="py-[15px] cursor-pointer text-white rounded bg-[#4992CC] px-[53px]"
                  type="submit"
                  value={t("save")}
                />
                <input
                  onClick={() => {
                    router.push(`/${router.query.userid}/hotels`);
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
