<template>
  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
    <input v-model="selected" type="radio" class="btn-check" :value="'ID'" id="ID" autocomplete="off" checked>
    <label class="btn btn-outline-primary" for="ID">ID</label>

    <input v-model="selected" type="radio" class="btn-check" :value="'First'" id="First" autocomplete="off">
    <label class="btn btn-outline-primary" for="First">First Name</label>

    <input v-model="selected" type="radio" class="btn-check" :value="'Last'" id="Last" autocomplete="off">
    <label class="btn btn-outline-primary" for="Last">Last Name</label>
  </div>

  <div class="mb-3">
    <label for="searchBar" class="form-label">Enter Your Customer's {{ selected }} <span v-if="selected == 'ID'" /> <span
        v-else>Name</span></label>
    <input v-model="inp" onkeydown="return /[a-z1-9 ]/i.test(event.key)" class="form-control" id="searchBar">

  </div>
  <button @click="submit" class="btn btn-primary">Submit</button>
  <div class="accordion" id="accordionExample">
    <div v-for="customer in custRes" class="accordion-item" :key="customer.customer">
      <h2 class="accordion-header">
        <button @click="reset" class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          :data-bs-target="'#a' + customer.customer_id">
          {{ customer.first_name + " " + customer.last_name }}
        </button>
      </h2>
      <div :id="'a' + customer.customer_id" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <div class="row">
            <div class="col-3">
              <h6><strong>Email: </strong>{{ customer.email }}</h6>
              <h6><strong>Main Store: </strong>{{ customer.store_id }}</h6>
              <h6><strong>Active? </strong><span v-if="customer.active == 1">Yes</span><span v-else>No</span></h6>
              <h6><strong>Currently Rented Movies:</strong>
                <div v-if="customer.rented">
                  <div class="row" v-for="movie in customer.rented.split(',')">
                    <div>
                      {{ movie }}
                    </div>
                    <div v-if="!removedMovies.includes(movie)">
                      <button @click="finRent(movie,customer.customer_id)" class="btn btn-primary">Finish Rent</button>
                    </div>
                    <div v-else>
                      <button disabled class="btn btn-success">Success!</button>
                    </div>
                  </div>
                </div>
                <div v-else>None</div>
              </h6>
            </div>
            <div class="col-7"></div>
            <div class="col">
              <button v-if="this.confirm == 0" @click="deleteCust(customer.customer_id)"
                class="btn btn-danger ">Delete</button>
              <button v-if="this.confirm == 1" @click="deleteCust(customer.customer_id)" class="btn btn-danger ">Are you
                sure?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import { socket, state } from "../socket";
export default {
  data() {
    return { selected: "ID", inp: "", confirm: 0, removedMovies:[] }
  },
  computed: {
    custRes() {
      return state.customerRes
    }
  },
  methods: {
    submit() {
      if(this.inp==''){
        socket.emit('custSearch', '')

      }
      else{
        socket.emit('custSearch', { [this.selected]: this.inp })
      }
    },
    reset() {
      this.confirm = 0
    },
    deleteCust(custId) {
      if (this.confirm == 0) {
        this.confirm = 1
      }
      else {
        socket.emit('deleteCust',custId)
        socket.on("deleteConf", ()=>{
          this.submit()
          this.reset()
        })
      }
    },
    finRent(movie,customer_id){
      socket.emit('finRent',movie,customer_id)
      socket.on('rentConf',()=>{
        this.removedMovies.push(movie)
      })
    }
  },
  beforeMount() {
    socket.emit('custSearch', {})
  },
}
</script>
    