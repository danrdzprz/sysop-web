<template>
    <VCheckbox
      v-model="value"
      :value="trueValue"
      :false-value="falseValue"
      :label="label"
      density="compact"
      hide-details="auto"
    ></VCheckbox>
  </template>
<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name:{
    type: String,
    required: true
  },
  label:{
    type: String,
    required: false,
    default: ""
  },
  trueValue:{
    type: [String,Number,Boolean,Array,Object,Date,Function,Symbol],
    required: false,
    default: true
  },
  falseValue:{
    type: [String,Number,Boolean,Array,Object,Date,Function,Symbol],
    required: false,
    default: false
  },
});

// // The `name` is returned in a function because we want to make sure it stays reactive
// // If the name changes you want `useField` to be able to pick it up
// const { value, errorMessage } = useField(() => props.name, undefined, {
//   syncVModel: true,
// });

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { handleChange, checked, value } = useField(() => props.name, undefined, {
  type: 'checkbox',
  checkedValue: props.checkedValue,
  syncVModel: true,
});
</script> 