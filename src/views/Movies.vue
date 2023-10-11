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
            <button @click="reset" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#a'+movie.film_id">
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
              <h3><strong>Rent Out To: </strong></h3>
              <div class="row">
                <div class="col">
                  <input v-model="custInp" placeholder="Customer Name" onkeydown="return /[a-z ]/i.test(event.key)" class="form-control" id="searchCust" >
                </div>
                <div class="col">
                  <input v-model="staffInp" placeholder="Staff ID" type="number"  class="form-control" id="searchCust" >
                </div>
              </div>
              <p v-if="this.custErr">Error: {{ errMessage }}</p>
              <p v-if="!this.custErr && this.errMessage!=''">Success!</p>
              <button @click="addCust(movie.film_id)" class="btn btn-primary">Rent</button>
            </div>
          </div>
        </div>
     </div>
</template>

<script>
import { socket,state } from "@/socket";
export default{
    data(){
        return {selected:"Name", inp:"", custInp:"",staffInp:"",custErr:false, errMessage:""}
    },
    computed: {
        searchRes(){
            return state.searchRes
        }
    },
    methods:{
        submit(){
            socket.emit('movieSearch', {"param":this.selected,"input":this.inp})
        },
        reset(){
            this.custErr=false
            this.errMessage=""
            this.staffInp=""
            this.custInp=""
        },
        addCust(film_id){
          if(this.custInp=="" && this.staffInp=="")
          {
              this.custErr=true
              this.errMessage="Need both staff and customer ID";
          }
          socket.emit('custRent', {"customer":this.custInp,"staff":this.staffInp,"film":film_id})
          socket.on('custResp',(success,message)=>{
            if(success){
              this.custErr=false
              this.errMessage="success"
            }
            else{
              this.custErr=true
              this.errMessage=message;
            }
          })
        }
    }
}
</script>
