import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    data: []
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    }
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await axios.get('https://api.restful-api.dev/objects');
        console.log('Response from API:', response.data);
        commit('setData', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  getters: {
    getData: (state) => state.data
  }
})
