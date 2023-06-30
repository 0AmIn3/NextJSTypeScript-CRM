import React, { useEffect, useState } from "react";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import TropItem from "./TropItem";
import { Draggable } from "react-beautiful-dnd";
import { withNamespaces } from "react-i18next";

interface TropMainProps {
  obj: any;
  arr: any;
  clients: any;
  pro?: any;
  idx?: number;
}

const TropMain = ({ obj, arr, clients, pro, idx ,t}: any) => {
  const statuses: any = [
    "New",
    "RequestSent",
    "InProgress",
    "Reserved",
    "PurchasedTickets",
    "Arrived"
  ];

  return (
    <div
      {...pro.droppableProps}
      ref={pro.innerRef}
      className=" h-[100%]    flex-col gap-3  bg-white  "
    >
      <div className="flex justify-between px-[16px] pt-3 items-center w-full">
        <h1 className="w-1/2">{t(statuses[idx])}</h1>
        <span className="h-[23px] w-[26px] p-1 flex justify-center items-center bg-[#22B5DC] text-center rounded-[100px] text-white">
          {obj.arr.length}
        </span>
      </div>
      <div className="w-full scr px-2 flex flex-col gap-4 mt-4">
        {obj.arr.map((item: any, index: any) => (
          <Draggable draggableId={item.id} index={index} key={item.id}>
            {(provided: any, snapshot: any) => (
              <TropItem
                item={item}
                prov={provided}
                snap={snapshot}
                arr={arr}
                clients={clients}
              />
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default withNamespaces()(TropMain);

