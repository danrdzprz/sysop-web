<script setup lang="ts">
  import { computed } from 'vue';
  import { VDataTableServer, VDataTable as table} from 'vuetify/labs/components';

  type UnwrapReadonlyArrayType<A> = A extends Readonly<Array<infer I>> ? UnwrapReadonlyArrayType<I> : A
  type DT = InstanceType<typeof table>;
  type ReadonlyDataTableHeader = UnwrapReadonlyArrayType<DT['headers']>;

  export interface PaginationOption {
    page:number;
    itemsPerPage:number;
    sortBy?: Array<{key:string, order:'asc'|'desc'}>;
  }
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
    headers:{
      type: Array as PropType<ReadonlyDataTableHeader[]>,
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
    totalItems:{
      type: Number,
      required: false,
      default:0
    }
  });

  const itemsPerPage = ref(10);

  const loadItems = ({ page, itemsPerPage, sortBy}:PaginationOption) => {
    emit("options",{page: page,itemsPerPage: itemsPerPage,sortBy: toRaw(sortBy)});
  };

  const emit = defineEmits(['update:modelValue','options'])

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
  <VDataTableServer
    class="custom-table"
    v-model:items-per-page="itemsPerPage"
    :items-length="totalItems"
    :search="search"
    :items="data"
    :headers="headers"
    density="compact"
    :loading="loading"
    @update:options="loadItems"
    >
      <template v-for="custom_column in custom_columns" v-slot:[`item.${custom_column}`]="{ item }">
          <slot :name="`item.${custom_column}`" v-bind:item="item"></slot>
      </template>
    </VDataTableServer>
</template>
<style>
  .custom-table > .v-table__wrapper > table > thead > tr > th{
    font-weight: bold;
    color: rgb(var(--v-theme-primary));

  }


  .v-data-table-header__content{
    white-space: nowrap;
    font-size: 0.75rem !important;
  }

  .v-data-table__th{
    border-bottom: rgb(var(--v-theme-primary)) 0.3rem solid !important;
  }

  .v-data-table-footer{
    white-space: nowrap;
    font-size: 0.75rem !important;
  }

  .box-f {
    
  }
</style>