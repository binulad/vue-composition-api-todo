import Vuex from 'vuex';

const commonStore = new Vuex.Store({
  state: {
    loadAllData: false
  },
  getters: {
    getAllData(state) {
      return state.loadAllData;
    }
  },
  mutations: {
    SET_ALL_DATA(state, value) {
      return state.loadAllData = value;
    }
  },
  actions: {
    ['setAllData']({commit}, value) {
      commit('SET_ALL_DATA', value);
    }
  },
});

export default commonStore;
