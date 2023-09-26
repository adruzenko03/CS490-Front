import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    connected: false,
    topMovies: '',
    topActors: '',
    queries:'',
    barEvents: [],
    message:''
  });

export const socket= io("http://localhost:8081")

socket.on('message',(_,mess)=>{
  state.message=mess
})

socket.on("queries", (rows)=>{
    state.queries=rows
    state.topMovies=rows.movies;
    state.topActors=rows.actors;
})