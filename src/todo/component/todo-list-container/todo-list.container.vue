<template>
  <todoListPresentation
    :todoListData="todoListData"
    @handleDeleteEvent="handleDeleteEvent"
    @updateTodoList="loadTodoData"
  ></todoListPresentation>
</template>

<script setup lang="ts">
import commonStore from "@/store";
import todoListPresentation from "@/todo/component/todo-list-container/todo-list-presentation/todo-list.presentation.vue";
import type { TodoList } from "@/todo/model/todo.model";
import { TodoServices } from "@/todo/services/todo.service";
import { computed, onBeforeMount, ref } from "vue";

// References
const todoListData = ref<TodoList>();

// Mounted
onBeforeMount(() => {
  loadTodoData();
});

// Methods
const loadTodoData = () => {
  // Get Todo list content
  TodoServices.getTodoList().then((response) => {
    todoListData.value = response.data;
  });
};
const handleDeleteEvent = (itemId: any) => {
  TodoServices.deleteTodoItem(itemId).then((response) => {
    response && loadTodoData();
  });
};
</script>
