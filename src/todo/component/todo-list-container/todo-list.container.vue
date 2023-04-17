<template>
  <todoListPresentation :todoListData="todoListData"></todoListPresentation>
</template>

<script setup lang="ts">
import todoListPresentation from '@/todo/component/todo-list-container/todo-list-presentation/todo-list.presentation.vue';
import type { TodoList } from '@/todo/model/todo.model';
import { TodoServices } from '@/todo/services/todo.service';
import { onBeforeMount, ref } from 'vue';

// References
const todoListData = ref<TodoList>();

// Mounted
onBeforeMount(() => {
  TodoServices.getTodoList().then((response) => {
    todoListData.value = response.data;
  })
})
</script>