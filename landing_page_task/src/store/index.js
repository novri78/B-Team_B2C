import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    data: []                                                                      //save as an array
  },
  mutations: {
    setData(state, payload) {                                                     //mutasi to arrange array data with payload
      state.data = payload;
    }
  },
  actions: {
    async fetchData({ commit }) {                                                //an Action to get data from API
      try {
        const response = await axios.get('https://api.restful-api.dev/objects');
        console.log('Response from API:', response.data);                        //show response data into Console 
        commit('setData', response.data);                                        //fill state data with response data
      } catch (error) {
        console.error('Error fetching data:', error);                            //show an error if errors when gets data
      }
    }
  },
  getters: {
    getData: (state) => state.data                                               //command to getData from state
  }
})
