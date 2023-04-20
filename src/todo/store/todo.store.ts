import Vuex from "vuex";

const todoStore = new Vuex.Store({
  state: {
    todoFormData: {}
  },
  getters: {  
    getTodoFormData(state) {
      return state.todoFormData;
    }
  },
  mutations: {
    SET_TODO_FORM_DATA(state, value) {
      return state.todoFormData = value;
    }
  },
  actions: {
    ["setTodoFormData"]({commit},  value) {
      commit("SET_TODO_FORM_DATA", value);
    }
  }
});

export default todoStore;