<template>
  <div class="card text-bg-light p-3">
    <form>
      <Field
        name="content"
        as="textarea"
        class="form-control"
        rows="4"
        placeholder="Enter the Todo list content"
        :class="{'is-invalid': errors.content}"
      ></Field>
    </form>
    <div class="d-flex justify-content-end mt-2">
      <button type="button" :disabled="!meta.valid" class="btn btn-primary" @click="handleSaveContent">Save Content</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { TodoConstants } from "@/todo/constants";
import { AddTodoItem } from "@/todo/model/todo.model";
import { Field, useForm  } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  content: yup.string().required(TodoConstants.VALIDATIONS.REQUIRED)
})
const initialValues = {
  content: ""
}
const {values, meta, errors} = useForm<AddTodoItem>({
  initialValues: initialValues,
  validationSchema: schema
});

// Define emits
const emit = defineEmits([
  TodoConstants.EMITS.ON_SAVE_CONTENT
])

// Methods
const handleSaveContent = () => {
  emit(TodoConstants.EMITS.ON_SAVE_CONTENT, values)
}
</script>
