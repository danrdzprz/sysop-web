<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ props }">
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
            class="custom-text-field-date"
            v-bind="props"
        ></VTextField>
        </template>
        <VDatePicker
          v-model="date"
          @update:modelValue="(data:Date)=> changeValue(data)"
        ></VDatePicker>
      </v-menu>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps({
  name:{
    type: String,
    required: true
  },
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

const menu = ref(false);
const date = ref(new Date());

const { handleChange, value, errorMessage, setValue, handleBlur } = useField(() => props.name, undefined, {
  syncVModel: true,
});

const changeValue = (data: Date)=>{
  setValue(DateToString(data));
  menu.value = false;
}

const validationListeners = {
  blur: evt => handleBlur(evt, true),
  change: handleChange,
  input: evt => handleChange(evt, !!errorMessage.value),
};

</script>
<style lang="scss">
  .custom-text-field-date{
      .v-input__control .v-input__slot .v-text-field__slot .v-text-field__prefix{
          margin-top: 10px !important;
      }    

  }

  .custom-text-field-date{
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