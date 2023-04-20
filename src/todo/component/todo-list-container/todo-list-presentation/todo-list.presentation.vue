<template>
  <div class="todo-form mb-3">
    <TodoFormContainer :todoFormData="todoFormData" @updateTodoList="updateTodoList"></TodoFormContainer>
  </div>
  <div class="todo-list">
    <div class="card mb-3" v-for="item of todoList" :key="item.id">
      <div class="card-body d-md-flex">
        <p class="mb-md-0 flex-grow-1">
          {{ item.content }}
        </p>
        <div class="vr mx-3 d-md-inline-block d-none"></div>
        <div class="d-flex flex-wrap justify-content-end flex-shrink-0">
          <button
            type="button"
            class="btn btn-sm btn-outline-primary flex-shrink-sm-0 flex-fill"
            @click="handleEdit(item.id)"
          >
            Edit
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-danger ms-2 flex-shrink-sm-0 flex-fill"
            @click="handleDelete(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TodoConstants } from "@/todo/constants";
import { onBeforeUpdate, ref, defineProps, defineEmits, computed, watch } from "vue";
import TodoFormContainer from "@/todo/component/todo-form-container/todo-form.container.vue";
import { TodoServices } from "@/todo/services/todo.service";
import { TodoList } from "@/todo/model/todo.model";
import todoStore from "@/todo/store/todo.store";

const props = defineProps(["todoListData"]);

const emit = defineEmits([
  TodoConstants.EMITS.HANDLE_DELETE_EVENT,
  TodoConstants.EMITS.UPDATE_TODO_LIST,
]);

const todoList = ref();
const todoFormData = ref({});

// Watcher
watch(() => props.todoListData, (newValue) => {
  if(newValue) {
    todoList.value = newValue;
  }
})

// Methods
const handleDelete = (id: number) => {
  emit(TodoConstants.EMITS.HANDLE_DELETE_EVENT, id);
};
const updateTodoList = () => {
  emit(TodoConstants.EMITS.UPDATE_TODO_LIST);
};
const handleEdit = (id: number) => {
  TodoServices.getTodoItemById(id).then(async (response) => {
    if(response) {
      todoFormData.value = await response.data;
    }
  })
}
</script>
