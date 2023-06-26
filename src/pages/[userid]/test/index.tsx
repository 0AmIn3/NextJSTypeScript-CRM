// import TropMain from "@/components/TropMain";
// import React, { useEffect, useState } from "react";
// import { DragDropContext, Draggale, Droppable } from "react-beautiful-dnd";
// export const getServerSideProps = async ({ query }: any) => {
//   const response = await fetch(
//     `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin/${query.userid}.json`
//   );

//   const response2 = await fetch(
//     `https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/clients.json`
//   );
//   const data = await response.json();
//   const usersData = await response2.json();

//   return {
//     props: { Company: data, clients: usersData },
//   };
// };
// const index = () => {
//   const [Arr, setArr] = useState<any>([]);
//   const [Users, setUsers] = useState([]);
//   let arr = [];
//   let users = [];

//   const onDrang = (result: any) => {
//     if (!result.destination) return;
//     const { source, destination } = result;


//     if (source.droppableId !== destination.droppableId) {
//       const sourceColIndex = Arr.findIndex(
//         (e: any) => e.id === source.droppableId
//       );
//       const destinationColIndex = Arr.findIndex(
//         (e: any) => e.id === destination.droppableId
//       );

//       const sourceCol = Arr[sourceColIndex];
//       const destinationCol = Arr[destinationColIndex];

//       const sourceTask = [...sourceCol.arr];
//       const destinationTask = [...destinationCol.arr];

//       const [removed] = sourceTask.splice(source.index, 1);
//       destinationTask.splice(destination.index, 0, removed);
//       Arr[sourceColIndex].arr = sourceTask;
//       Arr[destinationColIndex].arr = destinationTask;
//       setArr(Arr);
//     }
//   };
//   useEffect(() => {
//     arr = JSON.parse(localStorage.getItem("aa"));
//     for (let i of arr) {
//       i.id = `${Math.round(Math.random() * 10000)}`;
//       for (let l of i.arr) {
//         l.id = `${Math.round(Math.random() * 10000)}`;
//       }
//     }
//     users = JSON.parse(localStorage.getItem("bb"));
//     setArr(arr);
//     setUsers(users);
//   }, []);
//   return (
//     <DragDropContext onDragEnd={onDrang}>
//       <div className="grid grid-cols-6 h-[full] max-h-[90%] py-4 select-none  gap-4">
//         {Arr.map((item: any, idx: any) => (
//           <Droppable key={item.id} droppableId={item.id}>
//             {(provided: any) => (
//               <TropMain obj={item} pro={provided} clients={Users} arr={Users} />
//             )}
//           </Droppable>
//         ))}
//       </div>
//     </DragDropContext>
//   );
// };

// export default index;
