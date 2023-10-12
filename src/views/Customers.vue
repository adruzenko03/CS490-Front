<template>
  <!--Add Customer Modal-->
  <div class="modal fade" id="newCust" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button @click="reset" type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h1>Add Customer</h1>
          <form>
            <label>Email:</label>
            <input type="email" v-model="email">
            <br />
            <label>First Name:</label>
            <input onkeydown="return /[a-z]/i.test(event.key)" v-model="firstName">
            <br />
            <label>Last Name:</label>
            <input onkeydown="return /[a-z]/i.test(event.key)" v-model="lastName">
            <br />
            <label>Store:</label>
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input v-model="store" type="radio" class="btn-check" :value="1" id="1" autocomplete="off" checked>
              <label class="btn btn-outline-primary" for="1">Store 1</label>

              <input v-model="store" type="radio" class="btn-check" :value="2" id="2" autocomplete="off">
              <label class="btn btn-outline-primary" for="2">Store 2</label>
            </div>
            <br />
            <label>Address 1:</label>
            <input onkeydown="return /[a-z 0-9.-]/i.test(event.key)" v-model="address">
            <br />
            <label>Address 2:</label>
            <input onkeydown="return /[a-z 0-9.-]/i.test(event.key)" v-model="address2">
            <br />
            <label>District:</label>
            <input onkeydown="return /[a-z]/i.test(event.key)" v-model="district">
            <br />
            <label>City:</label>
            <input onkeydown="return /[a-z]/i.test(event.key)" v-model="city">
            <br />
            <label>Phone:</label>
            <input inputmode="numeric" v-model="phone">
            <br />
            <label>Postal Code:</label>
            <input inputmode="numeric" v-model="postalCode">
            <br />
          </form>
        </div>
        <div class="modal-footer">
          <p v-if="this.errMess != ''">{{ this.errMess }}</p>
          <button @click="addCust" type="button" class="btn btn-primary">Submit</button> <!-- data-bs-dismiss="modal" -->
        </div>
      </div>
    </div>
  </div>


  <div class="modal fade" id="upCust" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button @click="reset" type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h1>Update Customer</h1>
              <p v-if="this.errMess != ''" style="font-size: x-large;margin-bottom: 0;">{{ this.errMess }}</p>
              <label>Customer Name:</label>
                <input onkeydown="return /[a-z ]/i.test(event.key)" v-model="custName">
                <br />
              <form>
                <label>Email:</label>
                <input type="email" v-model="email">
                <button @click="upCust('email')" type="button" class="btn btn-primary">Update</button>
                <br />
                <label>First Name:</label>
                <input onkeydown="return /[a-z]/i.test(event.key)" v-model="firstName">
                <button @click="upCust('firstName')" type="button" class="btn btn-primary">Update</button>
                <br />
                <label>Last Name:</label>
                <input onkeydown="return /[a-z]/i.test(event.key)" v-model="lastName">
                <button @click="upCust('lastName')" type="button" class="btn btn-primary">Update</button>
                <br />
                <label>Store:</label>
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                  <input v-model="store" type="radio" class="btn-check" :value="1" id="1" autocomplete="off" checked>
                  <label class="btn btn-outline-primary" for="1">Store 1</label>

                  <input v-model="store" type="radio" class="btn-check" :value="2" id="2" autocomplete="off">
                  <label class="btn btn-outline-primary" for="2">Store 2</label>
                </div>
                <button @click="upCust('store')" type="button" class="btn btn-primary">Update</button>
                <br />
                <label>Address 1:</label>
                <input onkeydown="return /[a-z 0-9.-]/i.test(event.key)" v-model="address">
                <button @click="upCust('address')" type="button" class="btn btn-primary">Update</button>
                <br />
                <label>Address 2:</label>
                <input onkeydown="return /[a-z 0-9.-]/i.test(event.key)" v-model="address2">
                <button @click="upCust('address2')" type="button" class="btn btn-primary">Update</button>
                <br />
                <label>District:</label>
                <input onkeydown="return /[a-z]/i.test(event.key)" v-model="district">
                <button @click="upCust('district')" type="button" class="btn btn-primary">Update</button>
                <br />
                <label>City:</label>
                <input onkeydown="return /[a-z]/i.test(event.key)" v-model="city">
                <button @click="upCust('city')" type="button" class="btn btn-primary">Update</button>
                <br />
                <label>Phone:</label>
                <input inputmode="numeric" v-model="phone">
                <button @click="upCust('phone')" type="button" class="btn btn-primary">Update</button>
                <br />
                <label>Postal Code:</label>
                <input inputmode="numeric" v-model="postalCode">
                <button @click="upCust('postalCode')" type="button" class="btn btn-primary">Update</button>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>


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
    <input v-model="inp" onkeydown="return /[a-z0-9 ]/i.test(event.key)" class="form-control" id="searchBar">
  </div>

  <div class="mb-3" style="display: flex; gap:5px">

    <button @click="submit" class="btn btn-primary">Search</button>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newCust">
      New Customer
    </button>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#upCust">
      Update Customer
    </button>
  </div>

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
              <h6><strong>Address: </strong>{{ customer.address + ' ' + customer.address2 + ', ' + customer.district }}</h6>
              <h6><strong>Phone: </strong>{{ customer.phone }}</h6>
              <h6><strong>Currently Rented Movies:</strong>
                <div v-if="customer.rented">
                  <div class="row" v-for="movie in customer.rented.split(',')">
                    <div>
                      {{ movie }}
                    </div>
                    <div v-if="!removedMovies.includes(movie)">
                      <button @click="finRent(movie, customer.customer_id)" class="btn btn-primary">Finish Rent</button>
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
    return {
      selected: "ID", inp: "", confirm: 0, removedMovies: [],
      email: "", firstName: "", lastName: "", store: 1, address: "", address2: "", district: "", city: "", postalCode: "",
      errMess: "", custName: ""
    }
  },
  computed: {
    custRes() {
      return state.customerRes
    }
  },
  methods: {
    submit() {
      if (this.inp == '') {
        socket.emit('custSearch', '')

      }
      else {
        socket.emit('custSearch', { [this.selected]: this.inp })
      }
    },
    reset() {
      this.confirm = 0
      this.email = '',
      this.firstName = '',
      this.lastName = '',
      this.address = '',
      this.address2 = '',
      this.district = '',
      this.city = '',
      this.phone = '',
      this.postalCode = ''
      this.custName=''
      this.errMess=''
    },
    deleteCust(custId) {
      if (this.confirm == 0) {
        this.confirm = 1
      }
      else {
        socket.emit('deleteCust', custId)
        socket.on("deleteConf", () => {
          this.submit()
          this.reset()
        })
      }
    },
    finRent(movie, customer_id) {
      socket.emit('finRent', movie, customer_id)
      socket.on('rentConf', () => {
        this.removedMovies.push(movie)
      })
    },
    addCust() {
      if (this.email.length == 0 || this.firstName.length == 0 || this.lastName.length == 0 || this.address.length == 0 || this.district.length == 0 || this.postalCode.length == 0)
        this.errMess = "Error: Please include all provided fields"
      else if (this.phone.length != 10)
        this.errMess = "Please provide a valid phone number"
      else if (!state.queries.cities.includes(this.city))
        this.errMess = "Error: Please include a valid city"
      else
        socket.emit('addCust', { email: this.email, firstName: this.firstName, lastName: this.lastName, store: this.store, address: this.address, address2: this.address2, district: this.district, postalCode: this.postalCode, phone: this.phone, city: this.city })
      socket.on('addConf', () => {
        this.email = '',
          this.firstName = '',
          this.lastName = '',
          this.address = '',
          this.address2 = '',
          this.district = '',
          this.city = '',
          this.phone = '',
          this.postalCode = ''
        this.errMess = "Success!"
        this.submit()
      })
    },
    upCust(upVar){
      if(upVar=='phone' && this.phone.length!=10){
        this.errMess='Incorrect Lenght for Phone'
        return
      }
      if(this.custName==''){
        this.errMess='Which customer are you updating?'
        return
      }
      socket.emit('upCust',{"type":upVar,[upVar]:eval("this."+upVar),"customer":this.custName})
      socket.on('upConf',(mess)=>{
        this.errMess=mess
      })
    }
  },
  beforeMount() {
    socket.emit('custSearch', {})
  },
}
</script>
<style>
form>* {
  margin: 5px
}
</style>