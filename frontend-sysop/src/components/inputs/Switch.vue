<template>
    <div>
      <v-switch
        v-model="value"
        hide-details
        :true-value="trueValue"
        :false-value="falseValue"
        :label="label"
        :error-messages="errorMessage"
        color="warning"
        class="custom-switch"
      ></v-switch>
    </div>
</template>
<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: String,
  label: String,
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

const {errorMessage, handleChange, checked, value,handleBlur } = useField(() => props.name, undefined, {
  type: 'checkbox',
  checkedValue: props.checkedValue,
  syncVModel: true,
  validateOnValueUpdate: false,
});


</script> 

<style lang="scss">
  .custom-switch{
    .v-input__control{
      .v-field{
        box-shadow: none;
        .v-field__overlay{
            background-color: rgb(var(--v-theme-inputBackground));
            border-radius: 25px;
        }
      }
    }
  }
</style>