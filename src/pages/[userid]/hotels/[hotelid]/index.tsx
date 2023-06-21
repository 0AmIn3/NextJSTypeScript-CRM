import { pathClientsAPI, pathHotelsAPI } from "@/features/thunk";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";

interface indexProps {}
export const getServerSideProps = async ({ query } : any) => {
  const response = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin/${query.userid}.json`
  );

  const response4 = await fetch(
    `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/hotels/${query.hotelid}.json`
  );
  const data = await response.json();
  const hotelsData = await response4.json();
  return {
    props: {
      Company: data,

      hotel: hotelsData,
    },
  };
};
const index: React.FC<indexProps> = ({ Company, hotel } : any) => {
  console.log(Company, hotel);

  const logHotel = useSelector((state : any) => state.hotels.status);

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
      pathHotelsAPI({
        key: router.query.hotelid,
        obj: {
          ...data,
        }
      })
    );
    setTimeout(()=>{
      router.push(`/${router.query.userid}/hotels`);
    },300)
 
  
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
          <h1 className=" text-3xl font-semibold">{hotel.name}</h1>
        </div>
        <div className=" mt-4 flex justify-between items-center">
          <p className=" text-sm font-normal text-[#838383]">
            Home / Level 2 / Level 3 / {hotel.name}
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
                    <p>Наименование Отеля</p>
                    <input
                      className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                      id="name"
                      defaultValue={hotel.name}
                      required
                      {...register("name")}
                    />
                  </label>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="age" className="w-1/2">
                      <p>Цена за ночь</p>
                      <input
                        className="w-full outline-none select-none px-4 py-3 border border-[#D6D5D5] rounded"
                        id="age"
                        defaultValue={hotel.Price.toLocaleString('ru-RU')}
                        required
                        {...register("Price")}
                      />
                    </label>
                    <label htmlFor="city" className="w-1/2">
                      <p>Город</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="city"
                        defaultValue={hotel.City}
                        required
                        {...register("City")}
                      />
                    </label>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <label htmlFor="Phone" className="w-1/2">
                      <p>Телефон отеля</p>
                      <input
                        className="w-full px-4 py-3 border border-[#D6D5D5] rounded"
                        id="Phone"
                        type="tel"
                        pattern="+[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        defaultValue={hotel.Phone}
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
                  value="Сохранить"
                />
                <input
                  onClick={() => {
                    router.push(`/${router.query.userid}/hotels`);
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
