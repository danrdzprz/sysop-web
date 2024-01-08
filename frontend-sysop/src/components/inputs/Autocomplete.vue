<template>
    <VAutocomplete
      :label="label"
      filled
      color="success"
      hide-details="auto" 
      outlined 
      density="compact"
      flat
      variant="solo"
      v-model="value"
      @input="handleChange"
      :items="items"
      v-on="validationListeners"
      :error-messages="errorMessage"
      :loading="loading"
      autocomplete="off"
      item-title="text"
      class="custom-autocomplete-field"
    ></VAutocomplete>
</template>
<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: String,
  label: String,
  items:{
    type: Array,
    required: false,
    default: []
  },
  loading:{
    type: Boolean,
    required: false,
    default: false
  },
});

const { errorMessage, value, handleChange, handleBlur } = useField(() => props.name, undefined, {
  validateOnValueUpdate: false,
});

const validationListeners = {
  blur: evt => handleBlur(evt, true),
  change: handleChange,
  input: evt => handleChange(evt, !!errorMessage.value),
};
</script> 

<style lang="scss">
  .custom-autocomplete-field{
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