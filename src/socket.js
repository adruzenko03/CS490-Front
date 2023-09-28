import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    queries:'',
    searchRes:'',
    customerRes:''
  });

export const socket= io("http://localhost:8081")


socket.on("queries", (rows)=>{
    state.queries=rows
})

socket.on("movieRes", (rows)=>{
  state.searchRes=rows
})

socket.on("customerRes", (rows)=>{
  state.customerRes=rows
})