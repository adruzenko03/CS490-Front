import { describe, it, expect, beforeEach, vi  } from 'vitest';
import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import Customers from '../Customers.vue';
import { io } from "socket.io-client";
import {state,socket} from "../../socket.js";


describe('Unit Testing', () => {
  let wrapper = null

  // SETUP - run before to each unit test
  beforeEach(() => {
    // render the component
    // global.socket=io("http://localhost:8081")
    // vi.stubGlobal('state', 
    // {
    //   queries:'',
    //   searchRes:'',
    //   customerRes:[{
    //       customer_id: 1,
    //       store_id: 1,
    //       first_name: 'MARY',
    //       last_name: 'SMITH',
    //       email: 'MARY.SMITH@sakilacustomer.org',
    //       address_id: 5,
    //       active: 1,
    //       create_date: '2006-02-15T03:04:36.000Z',
    //       last_update: '2006-02-15T09:57:20.000Z',
    //       rented: null
    //     }
    //   ]
    // })
    wrapper = mount(Customers,{
      computed: {
        custRes() {
          return  [{
                customer_id: 1,
                store_id: 1,
                first_name: 'MARY',
                last_name: 'SMITH',
                email: 'MARY.SMITH@sakilacustomer.org',
                address_id: 5,
                active: 1,
                create_date: '2006-02-15T03:04:36.000Z',
                last_update: '2006-02-15T09:57:20.000Z',
                rented: null
              }
            ]
          }
        }
      
      })
  })


  it('Displays necessary static html elements correctly', async ()=>{
    expect(wrapper.findAll('label').at(0).text()).toMatch('ID')
    expect(wrapper.find("#searchBar").exists()).toBe(true)
  })

  it('Loads and displays customers when object is recieved from server', async () => {
    expect(wrapper.find('button[data-bs-target="#a1"]').exists()).toBe(true)
    expect(wrapper.html()).toContain("<strong>Active? </strong><span>Yes</span>")
  })

  it('Changes element content based on radio button', async () => { 
    const labelRadio = wrapper.find('input[id="First"]');
    await labelRadio.setChecked()
    expect(wrapper.find(".form-label").text()).toBe("Enter Your Customer's First Name")
   })

})