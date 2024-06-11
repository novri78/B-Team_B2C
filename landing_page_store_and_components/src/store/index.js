import { createStore } from 'vuex'

export default createStore({
  state: {
    listData: [
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
  },
  getters: {
    filteredData: (state) => {
      let data = state.listData.filter(item => {
        return Object.values(item).some(value =>
          String(value).toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      });

      if (state.selectedName) {
        data = data.filter(item => item.name === state.selectedName);
        // if(state.selectedItems.length !== 0) {
        //   state.selectedItems = [];
        // }
          
        // state.selectedItems.push(data);
        // console.log('filter', state.selectedItems)
      }

      return data;
    },
    itemDetails: (state) => (item) => {
      if (!item.data) return 'No Data Available';
      return Object.entries(item.data)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    },
    getPriceList: (state) => (item) => {
      if (item.data && (item.data.price > 0 || item.data.Price > 0)) {
        return parseFloat(item.data.price || item.data.Price).toFixed(2);
        
      }
      
      return 0;
    },
    uniqueNames: (state) => {
      const names = state.listData.map(item => item.name);
      return [...new Set(names)];
    },
    calculateTotalPrice(state) {
      let total = 0;
      if(state.selectedItems.length === 0){
        state.selectedItems = state.listData;
        console.log(state.selectedItems)
      }
  
      state.selectedItems.forEach((item) => {
        // if (item.data && (item.data.price > 0 || item.data.Price > 0)) {
        //   console.log(item.data.price + "atau" + item.data.Price )
        //   total += parseFloat(item.data.price || item.data.Price);
        // }
        
        if (item.data && item.data.price) {
          total += parseFloat(item.data.price);
        }
        if (item.data && item.data.Price) {
          total += parseFloat(item.data.Price);
        }
    
      });

      console.log(total, "this is total")

      return total.toFixed(2); // Memastikan bahwa total di bulatkan ke 2 desimal
    },
  },
  mutations: {
    SET_FILTER_SEARCH(state, searchQuery) {
      state.filterSearch = searchQuery;
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_SELECTED_NAME(state, name) {
      state.selectedName = name;
    },
    SET_SELECTED_ITEMS(state, selectedItems) {
      state.selectedItems = selectedItems;
    },
  },
});
