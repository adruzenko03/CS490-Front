import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    connected: false,
    message: '',
    barEvents: []
  });

export const socket= io("http://localhost:8081")

socket.on("message", (_,mess)=>{
    console.log(mess)
    state.message=mess;
})