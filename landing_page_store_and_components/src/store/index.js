import { createStore } from 'vuex'
import axios from '@/utils/axios' // Assuming this is the correct path for your axios setup


export default createStore({
  state: {
    listData:
      [
        {
          id: "1",
          name: "Google Pixel 6 Pro",
          data: {
            color: "Cloudy White",
            capacity: "128 GB",
          },
        },
        {
          id: "2",
          name: "Apple iPhone 12 Mini, 256GB, Blue",
          data: null,
        },
        {
          id: "3",
          name: "Apple iPhone 12 Pro Max",
          data: {
            color: "Cloudy White",
            "capacity GB": 512,
          },
        },
        {
          id: "4",
          name: "Apple iPhone 11, 64GB",
          data: {
            price: 389.99,
            color: "Purple",
          },
        },
        {
          id: "5",
          name: "Samsung Galaxy Z Fold2",
          data: {
            price: 689.99,
            color: "Brown",
          },
        },
        {
          id: "6",
          name: "Apple AirPods",
          data: {
            generation: "3rd",
            price: 120,
          },
        },
        {
          id: "7",
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        },
        {
          id: "8",
          name: "Apple Watch Series 8",
          data: {
            "Strap Colour": "Elderberry",
            "Case Size": "41mm",
          },
        },
        {
          id: "9",
          name: "Beats Studio3 Wireless",
          data: {
            Color: "Red",
            Description:
              "High-performance wireless noise cancelling headphones",
          },
        },
        {
          id: "10",
          name: "Apple iPad Mini 5th Gen",
          data: {
            Capacity: "64 GB",
            "Screen size": 7.9,
          },
        },
        {
          id: "11",
          name: "Apple iPad Mini 5th Gen",
          data: {
            Capacity: "254 GB",
            "Screen size": 7.9,
          },
        },
        {
          id: "12",
          name: "Apple iPad Air",
          data: {
            Generation: "4th",
            Price: "419.99",
            Capacity: "64 GB",
          },
        },
        {
          id: "13",
          name: "Apple iPad Air",
          data: {
            Generation: "4th",
            Price: "519.99",
            Capacity: "256 GB",
          },
        },
      ],
    searchQuery: '',
    selectedName: '',
    selectedItems: [],
    createdData: [],
    deletedData: [],
    exchangeRate: 13000, // Nilai tukar default
    newDataCount: 0, // Untuk melacak jumlah data baru
    deletedDataCount: 0, // Untuk melacak jumlah data yang dihapus
    isAuthenticated: false,
    token: localStorage.getItem('token') || '',
    user: {}
  },
  getters: {
    filteredData(state) {
      // Jika tidak ada kueri pencarian dan tidak ada nama yang dipilih, kembalikan semua data
      if (!state.filterSearch && !state.selectedName) {
        return state.listData; // Mengembalikan semua data jika tidak ada filter pencarian dan nama yang dipilih
      }

      let data = state.listData;

      // Jika ada kueri pencarian, filter data berdasarkan pencarian
      if (state.filterSearch) {
        data = data.filter(item =>
          item.name.toLowerCase().includes(state.filterSearch.toLowerCase())
        );
      }

      // Jika ada nama yang dipilih, filter data berdasarkan nama yang dipilih
      if (state.selectedName) {
        data = data.filter(item => item.name === state.selectedName);
      }

      // Jika ada item yang dipilih, perbarui state.selectedItems
      if (data.length > 0) {
        state.selectedItems = data; // Atur state.selectedItems ke data yang difilter
      } else {
        state.selectedItems = []; // Kosongkan state.selectedItems jika tidak ada data yang sesuai
      }

      return data; // Kembalikan data yang sudah difilter
    },
    itemDetails: (state) => (item) => {
      if (!item.data) return 'No Data Available';
      return Object.entries(item.data)
        .map(([key, value]) => `${key}: ${value}`)   //if not use .join will show array data
        .join(', ')                                  //when use .join then will show pure data & with comma
        ;
    },
    uniqueNames: (state) => {
      const names = state.listData.map(item => item.name);
      return [...new Set(names)];
    },
    calculateTotalPrice(state) {
      let total = 0;
      if (state.selectedItems.length === 0) {
        state.selectedItems = state.listData;
      }

      state.selectedItems.forEach((item) => {
        if (item.data && item.data.price) {
          total += parseFloat(item.data.price);
        }
        if (item.data && item.data.Price) {
          total += parseFloat(item.data.Price);
        }

      });

      return total.toFixed(2); // Memastikan bahwa total di bulatkan ke 2 desimal
    },
    exchangeRate(state) {
      return state.exchangeRate;
    },
    getPriceList: (state) => (item) => {
      if (item.data && (item.data.price > 0 || item.data.Price > 0)) {
        return (parseFloat(item.data.price || item.data.Price) * state.exchangeRate).toFixed(2);
      }
      return "0.00";
    },
    formatGetPriceList: (state, getters) => (item) => {
      const price = getters.getPriceList(item);
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    },
    paginatedData(state, getters) {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = state.currentPage * state.itemsPerPage;
      return getters.filteredData.slice(start, end);
    },
    totalPages(state, getters) {
      return Math.ceil(getters.filteredData.length / state.itemsPerPage);
    },
    isAuthenticated: state => !!state.token,
  },
  mutations: {
    SET_FILTER_SEARCH(state, searchQuery) {
      state.filterSearch = searchQuery;
    },
    SET_LIST_DATA(state, listData) {
      state.listData = listData;
      localStorage.setItem('listData', JSON.stringify(state.listData));
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_SELECTED_NAME(state, name) {
      state.selectedName = name;
    },
    ADD_LIST_ITEM(state, newItem) {
      state.listData.push(newItem);
      state.newDataCount++;
    },
    UPDATED_LIST_ITEM(state, updatedItem) {
      const index = state.listData.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        state.listData.splice(index, 1, updatedItem);
      }
    },
    DELETE_LIST_ITEM(state, id) {
      const index = state.listData.findIndex(item => item.id === id);
      if (index !== -1) {
        state.listData.splice(index, 1);
        state.deletedDataCount++;
      };
    },
    SET_EXCHANGE_RATE(state, rate) {
      state.exchangeRate = rate;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT(state) {
      state.token = '';
      state.user = {};
      localStorage.removeItem('token');
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    fetchListData({ commit }) {
      const data = []; // Fetch from API if needed
      commit('SET_LIST_DATA', data);
    },
    addListItem({ commit }, newItem) {
      commit('ADD_LIST_ITEM', newItem);
    },
    updatedListItem({ commit }, updatedItem) {
      commit('UPDATED_LIST_ITEM', updatedItem);
    },
    deleteListItem({ commit }, id) {
      commit('DELETE_LIST_ITEM', id);
    },
    setExchangeRate({ commit }, rate) {
      commit('SET_EXCHANGE_RATE', rate);
    },
    setCurrentPage({ commit }, page) {
      commit('SET_CURRENT_PAGE', page);
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/auth/login', credentials); // Endpoint login yang benar
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        commit('SET_TOKEN', token);
      } catch (error) {
        throw new Error('Login failed: ' + (error.response?.data?.message || error.message));
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});