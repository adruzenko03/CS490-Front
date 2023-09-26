import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    connected: false,
    topMovies: '',
    barEvents: [],
    message:''
  });

export const socket= io("http://localhost:8081")

socket.on('message',(_,mess)=>{
  state.message=mess
})

socket.on("queries", (rows)=>{
    state.topMovies=rows;
})