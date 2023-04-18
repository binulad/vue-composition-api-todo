<template>
  <todoFormPresentation @onSaveContent="onSaveContent"></todoFormPresentation>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import todoFormPresentation from "@/todo/component/todo-form-container/todo-form-presentation/todo-form.presentation.vue";
import { TodoServices } from "@/todo/services/todo.service";
import { TodoConstants } from "@/todo/constants";

// Define emits
const emit = defineEmits([TodoConstants.EMITS.UPDATE_TODO_LIST]);

// Methods
const onSaveContent = (data: any) => {
  TodoServices.addTodoItem(data).then((response) => {
    if (response) {
      emit(TodoConstants.EMITS.UPDATE_TODO_LIST);
    }
  });
};
</script>
