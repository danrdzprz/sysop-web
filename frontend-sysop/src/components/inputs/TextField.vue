<template>
    <VTextField
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
        v-on="validationListeners"
        :error-messages="errorMessage"
        class="custom-text-field"
    ></VTextField>
</template>
<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: String,
  label: String,
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
  .custom-text-field{
      .v-input__control .v-input__slot .v-text-field__slot .v-text-field__prefix{
          margin-top: 10px !important;
      }    

  }

  .custom-text-field{
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