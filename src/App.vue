<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="nav-link" to="/">Home</router-link>
        
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/movies">Movies</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/customers">Customers</router-link>
          </li>
          <li class="nav-item active">

            <button class="nav-link" @click="createPDF">
              Reports
            </button>
          </li>
        </ul>
      </div>
    </nav>

  <router-view />
</template>

<script>
import { state,socket } from "../socket";
import jsPDF from "jspdf";
export default {
  name: "App",
  computed: {
    queries() {
      return state.queries;
    },
    ping() {
      return state.message;
    },
  },
  methods: {
  createPDF () {
    socket.emit('pdfGen')
  }
}

};
</script>

<style>
@import "bootstrap/dist/css/bootstrap.css";
</style>
