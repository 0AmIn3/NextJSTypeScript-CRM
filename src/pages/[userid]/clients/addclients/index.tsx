import { pathClientsAPI, postClientsAPI } from "@/features/thunk";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
interface indexProps {}
export const getServerSideProps = async ({ query }) => {
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
const index: React.FC<indexProps> = ({
  Company,
  fillials,
  hotels,
}) => {
  const CompanyHotels = Object.values(hotels).filter(
    (item) => item.CompanyID === Company.id
  );
  const CompanyFillials = Object.values(fillials).filter(
    (item) => item.CompanyID === Company.id
  );
  const logClient = useSelector((state) => state.clients.status);

  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log();
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  const onSubmit = (data: any) => {
    dispatch(
      postClientsAPI({
        id: uuidv4(),
        CompanyID: Company.id,
        DateOfApplication: getCurrentDate(),
        ChangeStatus:getCurrentDate(),
       ...data
      })
    );
    
    if(logClient === "fulfilled"){
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
          <h1 className=" text-3xl font-semibold">Добавить клиента</h1>
        </div>
        <div className=" mt-4 flex justify-between items-center">
          <p className=" text-sm font-normal text-[#838383]">
            Home / Level 2 / Level 3 / Добавить клиента
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
                    <p>ФИО</p>
                    <input
                      className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                      id="name"
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
                        required
                        {...register("age")}
                      />
                    </label>
                    <label htmlFor="city" className="w-1/2">
                      <p>Город проживания</p>
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
                      <p>Телефон пациента</p>
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
                      <p>Email</p>
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
                    <p>Статус</p>
                    <select
                      className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                      {...register("status")}
                      required
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
                        {...register("GoFrom")}
                      />
                    </label>
                    <label htmlFor="GoTo" className="w-1/2">
                      <p>Город посещения</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="GoTo"
                        required
                        {...register("GoTo")}
                      />
                    </label>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="DateGoFrom" className="w-1/2">
                      <p>Дата вылета</p>
                      <input
                        required
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="DateGoFrom"
                        type="date"
                        {...register("DateGoFrom")}
                      />
                    </label>
                    <label htmlFor="DateGoTo" className="w-1/2">
                      <p>Дата прилета</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="DateGoTo"
                        type="date"
                        required
                        {...register("DateGoTo")}
                      />
                    </label>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="Hotel" className="w-full">
                      <p>Отель</p>
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
                  </div>
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
