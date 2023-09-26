import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    queries:'',
    searchRes:''
  });

export const socket= io("http://localhost:8081")


socket.on("queries", (rows)=>{
    state.queries=rows
})

socket.on("searchRes", (rows)=>{
  state.searchRes=rows
})