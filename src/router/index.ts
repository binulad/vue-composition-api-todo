import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from "@/views/HomeView.vue";

const TodoListContainer = () => import(/* webpackChunkName: "TodoListContainer" */ '../todo/component/todo-list-container/todo-list.container.vue')

const TodoFormContainer = () => import(/* webpackChunkName: "TodoFormContainer" */ '../todo/component/todo-form-container/todo-form.container.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/todo',
    name: 'todoList',
    component: TodoListContainer
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
