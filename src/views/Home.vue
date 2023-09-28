<template>  
  <div class="row">
    <div class="col">
      <div class="accordion" id="movieAccordion">
        <div  v-for="movie in queries.movies" class="accordion-item" :key="movie.film_id">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#a'+movie.film_id">
              {{ movie.title }}
            </button>
          </h2>
          <div :id="'a'+movie.film_id" class="accordion-collapse collapse" data-bs-parent="#movieAccordion">
            <div class="accordion-body">
              <h6><strong>Description: </strong>{{ movie.description }}</h6>
              <h6><strong>Release Year: </strong>{{ movie.release_year }}</h6>
              <h6><strong>Rating: </strong>{{ movie.rating }}</h6>
              <h6><strong>Length: </strong>{{ movie.length+" mins" }}</h6>
              <h6><strong>Language: </strong>{{ movie.name }}</h6>
              <h6><strong>Rental Price: </strong>{{ "$"+movie.rental_rate}}</h6>
              <h6><strong>Rental Duration: </strong>{{ movie.rental_duration+" days" }}</h6>
              
            </div>
          </div>
        </div>
     </div>
    </div>
    <div class="col">
      <div class="accordion" id="actorAccordion">
        <div  v-for="actor in queries.actors" class="accordion-item" :key="actor.actor_id">
          <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#a'+actor.actor_id">
            {{ actor.first_name+" "+actor.last_name }}
          </button>
          </h2>
          <div :id="'a'+actor.actor_id" class="accordion-collapse collapse" data-bs-parent="#actorAccordion">
            <div class="accordion-body">
              <!-- <h6><strong>Last Updated:</strong> {{ actor.last_update }}</h6> -->
              <h6><strong>Number of Movies: </strong>{{ actor.film_count }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { state } from "@/socket";
  
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
  };
  </script>
  
  <style>
  @import "bootstrap/dist/css/bootstrap.css";
  </style>
  