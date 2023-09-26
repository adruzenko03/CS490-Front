<template>
<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input v-model="selected" type="radio" class="btn-check" :value="'Name'" id="Name" autocomplete="off" checked>
  <label  class="btn btn-outline-primary" for="Name">Name</label>

  <input v-model="selected" type="radio" class="btn-check" :value="'Actor'" id="Actor" autocomplete="off">
  <label class="btn btn-outline-primary" for="Actor">Actor</label>

  <input v-model="selected" type="radio" class="btn-check" :value="'Genre'" id="Genre" autocomplete="off">
  <label class="btn btn-outline-primary" for="Genre">Genre</label>
</div>

  <div class="mb-3">
    <label for="searchBar" class="form-label">Enter Your Movie {{ selected }}</label>
    <input v-model="inp" onkeydown="return /[a-z ]/i.test(event.key)" class="form-control" id="searchBar" >
    
  </div>
  <button @click="submit" class="btn btn-primary">Submit</button>
  <div class="accordion" id="accordionExample">
        <div  v-for="movie in searchRes" class="accordion-item" :key="movie.film_id">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#a'+movie.film_id">
              {{ movie.title }}
            </button>
          </h2>
          <div :id="'a'+movie.film_id" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <h6><strong>Description: </strong>{{ movie.description }}</h6>
              <h6><strong>Release Year: </strong>{{ movie.release_year }}</h6>
              <h6><strong>Rating: </strong>{{ movie.rating }}</h6>
              <h6><strong>Length: </strong>{{ movie.length+" mins" }}</h6>
              <h6><strong>Rental Price: </strong>{{ "$"+movie.rental_rate}}</h6>
              <h6><strong>Rental Duration: </strong>{{ movie.rental_duration+" days" }}</h6>
              
            </div>
          </div>
        </div>
     </div>
</template>

<script>
import { socket,state } from "@/socket";
export default{
    data(){
        return {selected:"Name", inp:""}
    },
    computed: {
        searchRes(){
            return state.searchRes
        }
    },
    methods:{
        submit(){
            socket.emit('movieSearch', {"param":this.selected,"input":this.inp})
        }
    }
}
</script>
