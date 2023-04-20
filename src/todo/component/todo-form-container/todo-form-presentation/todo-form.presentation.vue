<template>
  <div class="card text-bg-light p-3">
    <form>
      <!-- Text Area -->
      <Field
        name="content"
        id="content"
        as="textarea"
        class="form-control"
        rows="4"
        placeholder="Enter the Todo list content"
        :class="{ 'is-invalid': errors.content }"
      ></Field>
      <ErrorMessage name="content" class="invalid-feedback b-block" />
      <!-- End: Text Area -->

      <!-- Count -->
      <Field
        name="count"
        id="count"
        type="text"
        class="form-control mt-4"
        placeholder="Enter the Count"
        :class="{ 'is-invalid': errors.count }"
      ></Field>
      <ErrorMessage name="count" class="invalid-feedback b-block" />
      <!-- End: Count -->

      <!-- Risk Fee -->
      <!-- Check the Field validation using yup -->
      <Field
        name="riskFee"
        id="riskFee"
        type="text"
        :maxLength="6"
        class="form-control mt-4"
        placeholder="Enter the Amount"
        :class="{ 'is-invalid': errors.riskFee }"
        @keypress="checkNumericValidation"
      ></Field>
      <ErrorMessage name="riskFee" class="invalid-feedback b-block" />
      <!-- End: Risk Fee -->

      <!-- Phone Number -->
      <!-- Add Mask validation on field -->
      <Field
        name="phoneNumber"
        id="phoneNumber"
        type="text"
        class="form-control mt-4"
        placeholder="Enter the Phone Number"
        :class="{ 'is-invalid': errors.phoneNumber }"
        @keypress="checkNumericValidation"
      ></Field>
      <ErrorMessage name="phoneNumber" class="invalid-feedback b-block" />
      <!-- End: Phone Number -->

      <!-- From Date -->
      <Field
        name="fromDate"
        id="fromDate"
        type="date"
        class="form-control mt-4"
        placeholder="YYYY-MM-DD"
        :class="{ 'is-invalid': errors.fromDate }"
        :max="maxDate"
      ></Field>
      <ErrorMessage name="fromDate" class="invalid-feedback b-block" />
      <!-- End: From Date -->

      <!-- To Date -->
      <Field
        name="toDate"
        id="toDate"
        type="date"
        class="form-control mt-4"
        placeholder="Enter the To Date"
        :class="{ 'is-invalid': errors.toDate }"
        :disabled="!values.fromDate"
        :min="values.fromDate"
      ></Field>
      <ErrorMessage name="toDate" class="invalid-feedback b-block" />
      <!-- End: To Date -->
    </form>
    <div class="d-flex justify-content-end mt-2">
      <button
        type="submit"
        :disabled="!meta.valid"
        class="btn btn-primary"
        @click="handleSaveContent"
      >
        Save Content
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps,
  onBeforeMount,
  onBeforeUpdate,
  ref,
  watch,
} from "vue";
import * as yup from "yup";
import { Field, useForm, ErrorMessage } from "vee-validate";
import { TodoConstants } from "@/todo/constants";
import { AddTodoItem } from "@/todo/model/todo.model";
import { toFormData } from "axios";
import todoStore from "@/todo/store/todo.store";

const regEx = RegExp(/^(\d{1,3}|\d{1,3}\.\d{1,2})$/);

const minBeforeDays = ref(10);
const todayDate = ref(new Date());

// Get the Short date using toJSON()
const maxDate = todayDate.value.toJSON().slice(0, 10);

const getMinDate = new Date(
  todayDate.value.getTime() - minBeforeDays.value * 24 * 60 * 60 * 1000
);

const schema = yup.object({
  isBig: yup.boolean().strip(),
  content: yup
    .string() // String type
    .trim(TodoConstants.VALIDATIONS.TRIM_DATA) //Restrict to add whitespace
    .required() // Required field
    .label("Todo Content") // Use this label in error message
    .min(10) // Minimum length of the text
    .max(50) // Maximum length of the text
    .strict(true), // trim() will apply when enable the strict mode
  count: yup
    .number() // Number type
    .required() // Required field
    .when("isBig", {
      is: true,
      then: (val) => val.min(2).max(10),
      otherwise: (val) => val.min(6),
    }) // Use Boolean condition and change the validations
    .test("is-42", "Don't use this", (value) => value != 42), // Add multiple validation tests 
  riskFee: yup
    .number() // Number type
    .required(TodoConstants.VALIDATIONS.REQUIRED) // Required field
    .max(100, "Max limit is 100.00") // Maximum value should be 100
    .positive("Value should be positive") // Field except only positive value
    .test(
      "check-pattern",
      "Format should be ###.##",
      (value) => (value != null || value == 0) && regEx.test(value.toString())
    ) // Add validation test to compare the value using Regular expression
    .typeError(TodoConstants.VALIDATIONS.REQUIRED), // Get error while type does not match
  phoneNumber: yup.number().strip(),
  fromDate: yup
    .date()
    .max(todayDate.value, `Date should be less then ${todayDate.value}`),
  toDate: yup
    .date()
    .min(yup.ref('fromDate'), `Date should be after From Date`)
});

const initialValues = {
  content: "",
  count: 0,
  isBig: false,
  riskFee: null,
  phoneNumber: "",
  fromDate: "",
  toDate: "",
};
const {
  values,
  meta,
  errors,
  validate,
  resetForm,
  setValues,
  setFieldValue,
  setFieldError,
} = useForm<AddTodoItem>({
  validationSchema: schema,
  initialValues: initialValues,
});

// Define props
const props = defineProps({
  todoFormData: {
    type: Object,
  },
});
// Define emits
const emit = defineEmits([TodoConstants.EMITS.ON_SAVE_CONTENT]);

// Watch
watch(
  () => props.todoFormData,
  (newValue) => {
    if (newValue) {
      setValues(newValue);
    }
  }
);

// Methods
const handleSaveContent = () => {
  emit(TodoConstants.EMITS.ON_SAVE_CONTENT, values);
  resetForm();
};
// const handleBlur = (value: string, field: keyof AddTodoItem) => {
//   setFieldValue(field, value.trim());
// }
const checkNumericValidation = (event: any) => {
  if (/^[0-9.]+$/.test(event.key)) {
    return true;
  } else {
    event.preventDefault();
  }
};
</script>
