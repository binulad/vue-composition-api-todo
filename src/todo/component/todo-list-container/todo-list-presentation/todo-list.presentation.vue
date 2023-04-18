<template>
  <div class="todo-form mb-3">
    <TodoFormContainer></TodoFormContainer>
  </div>
  <div class="todo-list">
    <div class="card mb-3" v-for="item of todoList" :key="item.id">
      <div class="card-body d-md-flex">
        <p class="mb-md-0 flex-grow-1">
          {{ item.content }}
        </p>
        <div class="vr mx-3 d-md-inline-block d-none"></div>
        <div class="d-flex flex-wrap justify-content-end flex-shrink-0">
          <button type="button" class="btn btn-sm btn-outline-primary flex-shrink-sm-0 flex-fill">
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
import { onBeforeUpdate, ref, defineProps, defineEmits } from "vue";
import TodoFormContainer from "@/todo/component/todo-form-container/todo-form.container.vue";

const props = defineProps(["todoListData"]);

const emit = defineEmits([TodoConstants.EMITS.HANDLE_DELETE_EVENT]);

const todoList = ref();

// OnBeforeUpdate hook
onBeforeUpdate(() => {
  todoList.value = props.todoListData;
});

// Methods
const handleDelete = (id: number) => {
  emit(TodoConstants.EMITS.HANDLE_DELETE_EVENT, id);
};
</script>
