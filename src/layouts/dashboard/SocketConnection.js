import { io } from "socket.io-client";

    const socket = io("http://localhost:3002");
 const send=(route,data)=>{
socket.emit(route,data);
}
const reacive=(route)=>{
    socket.on(route, (data) => {
        console.log(data)
        //return data
       })
}
export  {send,reacive};