import { pathClientsAPI } from "@/features/thunk";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";

interface indexProps {}
export const getServerSideProps = async ({ query }: any) => {
  const response = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin/${query.userid}.json`
  );
  const response2 = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/clients/${query.clientid}.json`
  );
  const response3 = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/fillials.json`
  );
  const response4 = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/hotels.json`
  );
  const data = await response.json();
  const usersData = await response2.json();
  const fillialsData = await response3.json();
  const hotelsData = await response4.json();
  return {
    props: {
      Company: data,
      clients: usersData,
      fillials: fillialsData,
      hotels: hotelsData,
    },
  };
};
const index: React.FC<indexProps> = ({
  Company,
  clients,
  fillials,
  hotels,
}: any) => {
  const CompanyHotels = Object.values(hotels).filter(
    (item: any) => item.CompanyID === Company.id
  );
  const CompanyFillials = Object.values(fillials).filter(
    (item: any) => item.CompanyID === Company.id
  );
  const logClient = useSelector((state: any) => state.clients.status);


  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchDateGoFrom = watch("DateGoFrom");
  const watchDateGoTo = watch("DateGoTo");
  const prosent = 0.05;
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const validateDays = (value: string | number) => {
    return +value >= 1;
  };
  function addDaysToDate(startDate: string, daysToAdd: number) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + Number(daysToAdd));

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const newDate = `${year}-${month}-${day}`;
    return newDate;
  }

  const onSubmit = (data: any) => {
    let hotel: any = Object.values(hotels)
      .filter((item: any) => item.CompanyID == Company.id)
      .filter((item: any) => item.name == data.Hotel)[0];
    let cop = {
      ...data,
      days: Number(data.days),
      ChangeStatus: getCurrentDate(),
      priceForHotels:
        Number(hotel.Price) * data.days - hotel.Price * data.days * prosent,
      priceForCompany: Number(hotel.Price) * data.days * prosent,
    };

    if (
      !clients.arriveDay ||
      clients.arriveDay == "" ||
      data.days !== clients.days ||
      data.DateGoTo !== clients.DateGoTo
    ) {
      cop = {
        ...cop,
        arriveDay: addDaysToDate(data.DateGoTo, data.days),
      };
    }
    dispatch(
      pathClientsAPI({
        key: router.query.clientid,
        obj: cop,
      })
    );

    if (logClient) {
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
          <h1 className=" text-3xl font-semibold">{clients.name}</h1>
        </div>
        <div className=" mt-4 flex justify-between items-center">
          <p className=" text-sm font-normal text-[#838383]">
            Home / Level 2 / Level 3 / {clients.name}
          </p>
        </div>
      </div>
      <div className="flex w-full h-full py-5 px-10 bg-[#F1F2F4]  flex-col overflow-x-scroll overflow-hidden">
        <div className="w-full p-8 h-[80%] mb-10 bg-white">
          <div className="">
            <form
              className="flex flex-col  justify-between items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-10 justify-between">
                <div className="w-[50%]">
                  <label htmlFor="name" className="w-full">
                    <p>ФИО</p>
                    <input
                      className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                      id="name"
                      defaultValue={clients.name}
                      required
                      {...register("name")}
                    />
                  </label>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="age" className="w-1/2">
                      <p>Дата рождения</p>
                      <input
                        className="w-full outline-none select-none px-4 py-3 border border-[#D6D5D5] rounded"
                        id="age"
                        type="date"
                        defaultValue={clients.age}
                        required
                        {...register("age")}
                      />
                    </label>
                    <label htmlFor="city" className="w-1/2">
                      <p>Город проживания</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="city"
                        defaultValue={clients.city}
                        required
                        {...register("city")}
                      />
                    </label>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="Phone" className="w-1/2">
                      <p>Телефон пациента</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="Phone"
                        type="tel"
                        pattern="+[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        defaultValue={clients.Phone}
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
                      <p>Email</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="email"
                        type="email"
                        defaultValue={clients.email}
                        required
                        {...register("email")}
                      />
                    </label>
                  </div>
                  <label htmlFor="status" className="w-full">
                    <p>Статус</p>
                    <select
                      className="w-full px-4 py-3 mt-0 border border-[#D6D5D5] rounded"
                      {...register("status")}
                      defaultValue={clients.status}
                      required
                      id="status"
                    >
                      <option value="Новое">Новое</option>
                      <option value="Запрос отправлен">Запрос отправлен</option>
                      <option value="В процессе">В процессе</option>
                      <option value="Забронировал">Забронировал</option>
                      <option value="Выкупил билеты">Выкупил билеты</option>
                      <option value="Прибыл">Прибыл</option>
                    </select>
                  </label>
                </div>
                <div className="w-[50%]">
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="Fillial" className="w-full">
                      <p>Филиал</p>
                      <select
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="Fillial"
                        defaultValue={clients.Fillial}
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
                      <p>Вылет из города</p>
                      <input
                        required
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="GoFrom"
                        defaultValue={clients.GoFrom}
                        {...register("GoFrom")}
                      />
                    </label>
                    <label htmlFor="GoTo" className="w-1/2">
                      <p>Город посещения</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="GoTo"
                        defaultValue={clients.GoTo}
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
                  {errors.GoTo && (
                    <p>Город посещения не может совпадать с городом вылета</p>
                  )}
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="DateGoFrom" className="w-1/2">
                      <p>Дата вылета</p>
                      <input
                        required
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="DateGoFrom"
                        type="date"
                        defaultValue={clients.DateGoFrom}
                        {...register("DateGoFrom", { required: true })}
                      />
                    </label>
                    <label htmlFor="DateGoTo" className="w-1/2">
                      <p>Дата прилета</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="DateGoTo"
                        type="date"
                        required
                        defaultValue={clients.DateGoTo}
                        {...register("DateGoTo", {
                          required: true,
                          validate: (value) => value >= watchDateGoFrom,
                        })}
                      />
                    </label>
                  </div>
                  {errors.DateGoTo && (
                    <p>Дата прилета не может быть меньше даты вылета</p>
                  )}

                  <div className="flex gap-1 mt-3">
                    <label htmlFor="Hotel" className="w-full">
                      <p>Отель</p>
                      <select
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="Hotel"
                        {...register("Hotel")}
                        required
                        defaultValue={clients.Hotel}
                      >
                        {CompanyHotels.map((item: any, idx: number) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </label>
                    <label htmlFor="days" className="w-full">
                      <p>Количество дней</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="days"
                        defaultValue={clients.days}
                        required
                        {...register("days", {
                          required: true,
                          validate: validateDays,
                        })}
                      />
                    </label>
                  </div>
                  {errors.days && <p>Введите число больше или равное 1</p>}
                </div>
              </div>
              {/* <input {...register("exampleRequired", { required: true })} /> */}

              {/* {errors.exampleRequired && <span>This field is required</span>} */}
              <div className="mt-[50px] flex gap-4">
                <input
                  className="py-[15px] cursor-pointer text-white rounded bg-[#4992CC] px-[53px]"
                  type="submit"
                  value="Сохранить"
                />
                <input
                  onClick={() => {
                    router.push(`/${router.query.userid}/clients`);
                  }}
                  className="py-[15px] w-fit cursor-pointer text-white rounded bg-[#EB5757] px-[53px]"
                  type="reset"
                  value="Отменить"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
