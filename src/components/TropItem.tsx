import { useRouter } from "next/router";
import React from "react";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";

interface TropItemProps {}

const TropItem: React.FC<TropItemProps> = ({ item, arr, clients }) => {
    const router = useRouter();
    const clientKey = Object.keys(clients).reverse()[Object.values(arr).indexOf(item)];
 
    
  function calculateAge(birthDate: string) {
    const birthDateObj = new Date(birthDate);
    const now = new Date();

    let age = now.getFullYear() - birthDateObj.getFullYear();

    // Проверяем, прошел ли уже день рождения в текущем году
    const hasPassedBirthday =
      now.getMonth() > birthDateObj.getMonth() ||
      (now.getMonth() === birthDateObj.getMonth() &&
        now.getDate() >= birthDateObj.getDate());

    // Уменьшаем возраст, если день рождения еще не наступил
    if (!hasPassedBirthday) {
      age--;
    }

    return age;
  }
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Месяцы в JavaScript нумеруются с 0, поэтому добавляем 1
    return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}`;
  }
  return (
    <>
      <div onDoubleClick={()=>{
       router.push(router.asPath + "/" + clientKey);
      }}  className="flex  cursor-pointer flex-col px-4 py-3 bg-[#F1F2F4] ">
        <h1 className=" text-sm font-medium text-[#333333]">{item.name}</h1>
        <p className=" mt-2 text-xs font-medium text-[#909090]">
          {calculateAge(item.age)} лет, {item.city}, {item.Fillial},{item.Hotel}
        </p>
        <div className=" mt-4 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="flex justify-between items-center text-[#909090] text-xs">
              <span className="flex gap-2 items-center">
                <GiAirplaneDeparture className=" text-xl" /> вылет
              </span>{" "}
              {formatDate(item.DateGoFrom)}
            </h2>
            <p className=" text-right text-xs font-medium">
              Вылет клиента c {item.GoFrom}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="flex justify-between items-center text-[#909090] text-xs">
              <span className="flex gap-2 items-center">
                <GiAirplaneArrival className=" text-xl" /> прилет
              </span>
              {formatDate(item.DateGoTo)}
            </h2>
            <p className=" text-right text-xs font-medium">
              Прилет клиента в {item.GoTo}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TropItem;
