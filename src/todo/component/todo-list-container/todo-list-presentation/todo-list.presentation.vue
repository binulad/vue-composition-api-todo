<template>
  <div class="todo-list">
    <div class="card mb-3" v-for="item of todoList" :key="item.id">
      <div class="card-body">{{ item.content }}</div>
      <div class="card-footer d-flex justify-content-end">
        <button type="button" class="btn btn-sm btn-outline-primary">
          Edit
        </button>
        <button type="button" class="btn btn-sm btn-outline-danger ms-2">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUpdate, ref, defineProps } from "vue";

const props = defineProps(["todoListData"]);

const todoList = ref();

onBeforeUpdate(() => {
  todoList.value =  props.todoListData;
})
</script>
