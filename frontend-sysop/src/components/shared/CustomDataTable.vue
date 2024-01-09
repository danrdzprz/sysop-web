<script setup lang="ts">
  import { computed } from 'vue';
  import { VDataTable as table} from 'vuetify/components';

  type UnwrapReadonlyArrayType<A> = A extends Readonly<Array<infer I>> ? UnwrapReadonlyArrayType<I> : A
  type DT = InstanceType<typeof table>;
  type ReadonlyDataTableHeader = UnwrapReadonlyArrayType<DT['headers']>;

  const props = defineProps({
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    show_select: {
      type: Boolean,
      required: false,
      default: false
    },
    // headers:{
    //   type: Array as PropType<ReadonlyDataTableHeader[]>,
    //   required: true,
    //   default: []
    // },
    headers:{
      required: true,
      default: []
    },
    search: {
      type: String,
      required: false,
      default: ""
    },
    data:{
      type: Array,
      required: true,
      default: []
    },
    modelValue:{
      type: Array,
      required: false,
      default: []
    },
    custom_columns:{
      type: Array,
      required: false,
      default: []
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

<template>
  <VDataTable
    :search="search"
    v-model="value"
    :items="data"
    :show-select="show_select"
    :headers="headers"
    density="compact"
    :loading="loading"
    >
      <template v-for="custom_column in custom_columns" v-slot:[`item.${custom_column}`]="{ item }">
          <slot :name="`item.${custom_column}`" v-bind:item="item"></slot>
      </template>
    </VDataTable>
</template>

<!-- <style>
    .main-container{
		margin: 0 12px;
		min-height: calc(100vh - 120px);
	}

	.app-container{
		background-color: var(--v-background-base);
	}

  .v-data-table-header__content{
    white-space: nowrap;
    font-size: 0.75rem !important;
  }

  .v-data-table__th{
    border-bottom: #304E5C 0.125rem solid !important;
  }

  .v-data-table-footer{
    white-space: nowrap;
    font-size: 0.75rem !important;
  }
</style> -->