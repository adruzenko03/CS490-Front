import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import Customers from '../Customers.vue';
import Home from '../Home.vue';


describe('Unit Testing', () => {
  let wrapper = null
  let wrapper2 = null

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
    wrapper = mount(Customers, {
      computed: {
        custRes() {
          return [{
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
  wrapper2 = mount(Home, {
    computed: {
      queries() {
        return {
          movies:
            [{
              film_id: 382,
              title: 'GRIT CLOCKWORK',
              description: 'A Thoughtful Display of a Dentist And a Squirrel who must Confront a Lumberjack in A Shark Tank',
              release_year: 2006,
              language_id: 1,
              original_language_id: null,
              rental_duration: 3,
              rental_rate: 0.99,
              length: 137,
              replacement_cost: 21.99,
              rating: 'PG',
              special_features: 'Trailers,Deleted Scenes',
              last_update: '2006-02-15T10:03:42.000Z',
              name: 'English'
            }],
          actors: [{
            actor_id: 23,
            first_name: 'SANDRA',
            last_name: 'KILMER',
            last_update: '2006-02-15T09:34:33.000Z',
            film_count: 37
          }]
        }
      }
    }
  })

  it('Displays movies + actors on the home page', () => {
    expect(wrapper2.find('div[id="a382"]').exists()).toBe(true)
    expect(wrapper2.find('div[id="a23"]').exists()).toBe(true)
  })

  it('Displays Search Bar', async () => {
    expect(wrapper.find('label[for="ID"]').exists()).toBe(true)
    expect(wrapper.find("#searchBar").exists()).toBe(true)
  })

  it('Displays list of customers ', async () => {
    expect(wrapper.find('button[data-bs-target="#a1"]').exists()).toBe(true)
  })
  it('Loads and displays customers when object is recieved from server', async () => {
    expect(wrapper.html()).toContain("<strong>Active? </strong><span>Yes</span>")
  })

  it('Changes element content based on radio button', async () => {
    const labelRadio = wrapper.find('input[id="First"]');
    await labelRadio.setChecked()
    expect(wrapper.find(".form-label").text()).toBe("Enter Your Customer's First Name")
  })

  it('Contains Update Modal', async () => {
    expect(wrapper.html()).toContain(`<div class="modal-body">
        <h1>Update Customer</h1>`)
  })

})