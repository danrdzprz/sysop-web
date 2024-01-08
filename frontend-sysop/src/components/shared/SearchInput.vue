<template>
    <VTextField
        v-model="value"
        append-inner-icon="mdi-magnify"
        type="search"
        clearable
        density="compact"
        :placeholder="$t('general.search')"
        variant="solo"
        class="input-search"
    />
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({
    modelValue:{
      type: String,
      required: false,
      default: ""
    },
  });

  const emit = defineEmits(['update:modelValue'])

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })
</script>

<style lang="scss">
   .input-search{
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