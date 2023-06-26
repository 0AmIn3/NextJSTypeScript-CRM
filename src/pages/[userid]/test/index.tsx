// import TropMain from "@/components/TropMain";
// import React, { useEffect, useState } from "react";
// import {DragDropContext , Draggale , Droppable} from "react-beautiful-dnd"
// const index = () => {
//   const [Arr, setArr] = useState([]);
//   const [Users, setUsers] = useState([]);
//   let arr = [];
//   let users = [];

//   const onDrang = (result :any) =>{
//     console.log(result);
    
//   }
//   useEffect(() => {
//     arr = JSON.parse(localStorage.getItem("aa"));
//     for(let i of arr){
//       i.id = Math.random()
//     }
//     users = JSON.parse(localStorage.getItem("bb"));
//     setArr(arr)
//     setUsers(users)
//     // console.log(arr);
//     // console.log(users);
//   },[]);
//   return (
//     <DragDropContext onDragEnd={onDrang}>
//       <div className="grid grid-cols-6 h-[full] max-h-[80%] py-4 select-none  gap-4">
//         {Arr.map((item :any, idx) => (
//           <Droppable key={item.id} droppableId={item.id}   >
//             {(provided : any) => (
//           <TropMain obj={item} pro={provided} clients={Users} arr={Users} />

//             )}
//           </Droppable>
//         ))}
//       </div>
//     </DragDropContext>
//   );
// };

// export default index;
