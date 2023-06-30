import { pathClientsAPI, postClientsAPI } from "@/features/thunk";
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
  const response3 = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/fillials.json`
  );
  const response4 = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/hotels.json`
  );
  const data = await response.json();
  const fillialsData = await response3.json();
  const hotelsData = await response4.json();
  return {
    props: {
      Company: data,
      fillials: fillialsData,
      hotels: hotelsData,
    },
  };
};
const index = ({ Company, fillials, hotels, t }: any) => {
  const CompanyHotels = Object.values(hotels).filter(
    (item: any) => item.CompanyID === Company.id
  );
  const CompanyFillials = Object.values(fillials).filter(
    (item: any) => item.CompanyID === Company.id
  );
  const logClient = useSelector((state: any) => state.clients.status);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const prosent = 0.05;
  const watchDateGoFrom = watch("DateGoFrom");

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  function addDaysToDate(startDate: string, daysToAdd: number) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + Number(daysToAdd));

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const newDate = `${year}-${month}-${day}`;
    return newDate;
  }
  const validateDays = (value: string | number) => {
    return +value >= 1;
  };
  const onSubmit = (data: any) => {
    let hotel: any = Object.values(hotels)
      .filter((item: any) => item.CompanyID == Company.id)
      .filter((item: any) => item.name == data.Hotel)[0];
    let cop = {
      ...data,
      id: uuidv4(),
      CompanyID: Company.id,
      DateOfApplication: getCurrentDate(),
      ChangeStatus: getCurrentDate(),
      priceForHotels:
        Number(hotel.Price) * data.days - hotel.Price * data.days * prosent,
      priceForCompany: Number(hotel.Price) * data.days * prosent,
      arriveDay: addDaysToDate(data.DateGoTo, data.days),
    };

    dispatch(postClientsAPI(cop));

    if (logClient === "fulfilled") {
      router.push(`/${router.query.userid}/clients`);
    }
  };

  return (
    <>
      <div className="w-full  px-10 bg-white">
        <div className="flex items-center gap-10">
          <SlArrowLeft
            onClick={() => {
              router.push(`/${router.query.userid}/clients`);
            }}
            className="text-[#22B5DC] cursor-pointer text-xl"
          />
          <h1 className=" text-3xl font-semibold">{t("HeaderAddclients")}</h1>
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
                <div className="w-[50%]">
                  <label htmlFor="name" className="w-full">
                    <p>{t("FullName")}</p>
                    <input
                      className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                      id="name"
                      required
                      {...register("name")}
                    />
                  </label>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="age" className="w-1/2">
                      <p>{t("DateofBirth")}</p>
                      <input
                        className="w-full outline-none select-none px-4 py-3 border border-[#D6D5D5] rounded"
                        id="age"
                        type="date"
                        required
                        {...register("age")}
                      />
                    </label>
                    <label htmlFor="city" className="w-1/2">
                      <p>{t("CityofResidence")}</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="city"
                        required
                        {...register("city")}
                      />
                    </label>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="Phone" className="w-1/2">
                      <p>{t("CustomerPhone")}</p>
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
                    <label htmlFor="email" className="w-1/2">
                      <p>{t("Mail")}</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="email"
                        type="email"
                        required
                        {...register("email")}
                      />
                    </label>
                  </div>
                  <label htmlFor="name" className="w-full">
                    <p>{t("Status")}</p>
                    <select
                      className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                      {...register("status")}
                      required
                    >
                      <option value="Новое">{t("New")}</option>
                      <option value="Запрос отправлен">
                        {t("RequestSent")}
                      </option>
                      <option value="В процессе">{t("InProgress")}</option>
                      <option value="Забронировал">{t("Reserved")}</option>
                      <option value="Выкупил билеты">
                        {t("PurchasedTickets")}
                      </option>
                      <option value="Прибыл">{t("Arrived")}</option>
                    </select>
                  </label>
                </div>
                <div className="w-[50%]">
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="Fillial" className="w-full">
                      <p>{t("Fillial")}</p>
                      <select
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="Fillial"
                        required
                        {...register("Fillial")}
                      >
                        {CompanyFillials.map((item: any, idx: number) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="GoFrom" className="w-1/2">
                      <p>{t("DepartureFromCity")}</p>
                      <input
                        required
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="GoFrom"
                        {...register("GoFrom")}
                      />
                    </label>
                    <label htmlFor="GoTo" className="w-1/2">
                      <p>{t("CityVisit")}</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="GoTo"
                        required
                        {...register("GoTo", {
                          validate: {
                            notSameAsGoFrom: (value) =>
                              value !== watch("GoFrom"),
                          },
                        })}
                      />
                    </label>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="DateGoFrom" className="w-1/2">
                      <p>{t("DateGoFrom")}</p>
                      <input
                        required
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="DateGoFrom"
                        type="date"
                        {...register("DateGoFrom")}
                      />
                    </label>
                    <label htmlFor="DateGoTo" className="w-1/2">
                      <p>{t("DateGoTo")}</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="DateGoTo"
                        type="date"
                        required
                        {...register("DateGoTo", {
                          required: true,
                          validate: (value) => value >= watchDateGoFrom,
                        })}
                      />
                    </label>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="Hotel" className="w-full">
                      <p>{t("Hotel")}</p>
                      <select
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="Hotel"
                        {...register("Hotel")}
                        required
                      >
                        {CompanyHotels.map((item: any, idx: number) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </label>
                    <label htmlFor="days" className="w-full">
                      <p>{t("days")}</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="days"
                        required
                        {...register("days", {
                          required: true,
                          validate: validateDays,
                        })}
                      />
                    </label>
                    {errors.days && <p>{t("err3")}</p>}
                  </div>
                </div>
              </div>
              {/* <input {...register("exampleRequired", { required: true })} /> */}

              {/* {errors.exampleRequired && <span>This field is required</span>} */}
              <div className="mt-[50px] flex gap-4">
                <input
                  className="py-[15px] cursor-pointer text-white rounded bg-[#4992CC] px-[53px]"
                  type="submit"
                  value={t("save")}
                />
                <input
                  onClick={() => {
                    router.push(`/${router.query.userid}/clients`);
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
