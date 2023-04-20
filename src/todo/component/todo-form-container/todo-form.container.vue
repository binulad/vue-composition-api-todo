<template>
  <todoFormPresentation
    :todoFormData="todoFormData"
    @onSaveContent="onSaveContent"
  ></todoFormPresentation>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onBeforeUpdate, onMounted, ref, watch } from "vue";
import todoFormPresentation from "@/todo/component/todo-form-container/todo-form-presentation/todo-form.presentation.vue";
import { TodoServices } from "@/todo/services/todo.service";
import { TodoConstants } from "@/todo/constants";
import todoStore from "@/todo/store/todo.store";

// Define props
const props = defineProps(["todoFormData"]);
// Define emits
const emit = defineEmits([TodoConstants.EMITS.UPDATE_TODO_LIST]);

const todoFormData = ref();
const id = ref(0);

// Watcher
watch(() => props.todoFormData, (newValue) => {
  todoFormData.value = newValue;
  id.value = newValue.id;
});

// Methods
const onSaveContent = (data: any) => {
  if(id.value) {
    TodoServices.updateTodoItem(id.value, data).then((response) => {
      if (response) {
        emit(TodoConstants.EMITS.UPDATE_TODO_LIST);
      }
    })
  } else {
    TodoServices.addTodoItem(data).then((response) => {
      if (response) {
        emit(TodoConstants.EMITS.UPDATE_TODO_LIST);
      }
    });
  }
};
</script>
