import { createStore } from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

axios.defaults.baseURL = 'https://craigsad.herokuapp.com/api/'
axios.defaults.withCredentials = true

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    ads: null,
    ad: null
  },

  mutations: {
    USER (state, user) {
      state.user = user
    },

    ADS (state, ads) {
      state.ads = ads
    },

    AD (state, ad) {
      state.ad = ad
    },

    DELETE_AD (state, id) {
      const index = state.ads.data.findIndex(ad => ad.id === id)
      state.ads.data.splice(index, 1)
    },

    LOGOUT (state) {
      state.user = null
    }
  },

  actions: {
    fetchUser ({ commit }) {
      return axios
        .get('user')
        .then(response => {
          commit('USER', response.data.data)
          return response
        })
        .catch(e => {
          console.log(e)
        })
    },

    fetchAds ({ commit }, data) {
      return axios
        .get(
          `ads?page=${data.page}&sort_field=${data.sortField}&sort_by=${data.sortBy}`
        )
        .then(response => {
          commit('ADS', response.data)
        })
    },

    fetchAd ({ commit }, id) {
      return axios.get(`ads/${id}`).then(response => {
        commit('AD', response.data.data)
        return response
      })
    },

    createAd ({ commit }, data) {
      return axios.post('ads', data).then(response => {
        return response
      })
    },

    patchAd ({ commit }, data) {
      return axios.put(`ads/${data.id}`, data).then(response => {
        return response
      })
    },

    deleteAd ({ commit }, id) {
      return axios.delete(`ads/${id}`).then(() => {
        commit('DELETE_AD', id)
      })
    },

    login ({ dispatch }, data) {
      return axios
        .get(
          axios.defaults.baseURL.substring(
            0,
            axios.defaults.baseURL.length - 4
          ) + 'sanctum/csrf-cookie'
        )
        .then(() => {
          return axios.post('login', data).then(res => {
            console.log(res.data)
            Cookie.set('jwt', res.data.jwt, { domain: '.herokuapp.com' })
            dispatch('fetchUser')
          })
        })
    },

    logout ({ commit }) {
      return axios.post('logout').then(() => {
        commit('LOGOUT')
      })
    }
  },

  getters: {
    getUser (state) {
      return state.user
    },

    getAds (state) {
      return state.ads
    },

    getAd (state) {
      return state.ad
    },

    isAuthenticated (state) {
      return state.isAuthenticated
    }
  }
})
