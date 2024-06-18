import axios from 'axios'

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    currentUser: state => state.user,
};

const actions = {
    async login({ commit, dispatch }, user) {
        try {
            const response = await axios.post('https://fakeapi.platzi.com/en/rest/auth-jwt/login', user);
            const token = response.data.token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            commit('AUTH_SUCCESS', token);
            await dispatch('getUser'); // Get the user info after login
        } catch (error) {
            commit('AUTH_ERROR', error);
            localStorage.removeItem('token');
            throw error;
        }
    },
    async getUser({ commit }) {
        try {
            const response = await axios.get('https://fakeapi.platzi.com/en/rest/auth-jwt/user');
            commit('SET_USER', response.data);
        } catch (error) {
            commit('AUTH_ERROR', error);
            localStorage.removeItem('token');
            throw error;
        }
    },
    logout({ commit }) {
        commit('LOGOUT');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    },
};

const mutations = {
    AUTH_SUCCESS(state, token) {
        state.token = token;
        state.status = 'success';
    },
    AUTH_ERROR(state) {
        state.status = 'error';
    },
    LOGOUT(state) {
        state.token = '';
        state.user = {};
    },
    SET_USER(state, user) {
        state.user = user;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};  