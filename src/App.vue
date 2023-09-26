<!-- eslint-disable vue/require-v-for-key -->
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <button type="button" class="btn btn-primary">Primary</button>
  <div class="list-group" v-for="movie in topMovies">
  <a href="#" class="list-group-item list-group-item-action">
    {{movie.title}}
  </a>

</div></template>

<script>
import {state} from "@/socket";

export default {
  name: 'App',
  computed: {
    topMovies() {
      return state.topMovies;
    },
    ping(){
      return state.message;
    }
  }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css'
</style>
