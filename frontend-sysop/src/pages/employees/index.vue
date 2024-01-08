<template>
  <div>
    <VContainer fluid>
            <!-- Page heading -->
            <VRow align="start" justify="space-between">
              <VCol cols="3" md="3">
                  <SharedSearchInput
                      v-model="search"
                    >
                    </SharedSearchInput>
                </VCol>

                <VCol sm="3" cols="3" class="text-sm-right">
                  <VBtn 
                    flat
                    color="primary"  
                    class="text-capitalize"
                    to="/employees/create"
                  >
                    <VIcon start icon="mdi-plus" />
                    <span>{{ $t('pages.employees.index.create') }} </span>
                  </VBtn>
                </VCol>
            </VRow>
              <VCard class="shadow" rounded="lg">
                <ClientOnly>
                  <SharedSRCustomDataTable
                    :search="search"
                    :data="listEmployeeStore.pagination.data"
                    :headers="headers"
                    :loading="listEmployeeStore.status === RequestStatus.LOADING"
                    :custom_columns="['actions']"
                    :total-items="totalItems"
                    @options="changeTableOptions"
                  >
                    <template v-slot:item.actions="{ item }">
                      <div class="d-flex align-center">
                        <VBtn flat size="small" icon :to="`/employees/${item.id}/detail`">
                          <VIcon class="text-medium-emphasis" icon="mdi-open-in-new" />
                        </VBtn>
                        <VBtn flat size="small" icon :to="`/employees/${item.id}/edit`">
                          <VIcon class="text-medium-emphasis" icon="mdi-pencil-outline" />
                        </VBtn>
                        <VBtn flat size="small" icon @click="openDialog(item)">
                          <VIcon class="text-medium-emphasis" icon="mdi-delete-outline" />
                        </VBtn>
                      </div>
                    </template>
                  </SharedSRCustomDataTable>
                </ClientOnly>
              </VCard>
						<!-- <transition name="fade" mode="out-in">
              

						</transition> -->
          <SharedModal
            v-model:visible="modal_props.visible"
            v-model:text="modal_props.text"
            width="500"
				    bottom-line-color='error'
				    title='Eliminar'
          >
          <template v-slot:actions>
            <VBtn 
                text="Cancelar"
                variant="outlined"
                class="mr-0 mr-sm-2 mb-3 mb-sm-0"
                @click="cancel"
              >
                <span>No, cancelar</span>
              </VBtn>
              <VBtn 
                variant="outlined"
                flat color="warning"  
                @click="confirm"
              >
                <span>Si, eliminar</span>
              </VBtn>
          </template> 
          </SharedModal>
        </VContainer>
  </div>
</template>

<script setup lang="ts">
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
import { useDialogConfig } from '@/store/dialogConfig.store'
import { onMounted } from 'vue';
import { useListEmployeeStore } from '~/store/employees/list.store';
import { ApiEmployeeRepository } from '~/modules/employee/infra/ApiEmployeeRepository';
import { useDeleteEmployeeStore } from '~/store/employees/destroy.store';
import type { PaginationOption } from '~/components/shared/SRCustomDataTable.vue';
import type { EmployeeDomain } from '~/modules/employee/domain/employee.domain';
  

  definePageMeta({
    layout: 'private'
  });
  useHead({
    title: 'Home'
  });

  const listEmployeeStore = useListEmployeeStore(ApiEmployeeRepository());
  const deleteEmployeeStore = useDeleteEmployeeStore(ApiEmployeeRepository());

  const modal_props= reactive({
    visible: false,
    text: '',
    loading: false
  });
  const dialogConfig = useDialogConfig();
  const selected = ref(0);
  const search = ref("");

  const headers = ref([
    { title: "Nombre", value: "name", sortable: true },
    { title: "Role", value: "role_name", sortable: true },
    { title: "Télefono", value: "phone", sortable: true },
    { title: "Fecha de nacimiento", value: "birthdate", sortable: true },
    { title: "Acciones", value: "actions", sortable: false },
  ]);

  
  onMounted(async() => {
    await listEmployeeStore.getEmployees(
      {
        page:1,
        itemsPerPage: 10
      }
    );
  });

  const totalItems = computed(():number => {
    return listEmployeeStore.pagination.meta ? listEmployeeStore.pagination.meta.total : totalItems.value;
  })
  
  const changeTableOptions=(data: PaginationOption)=>{
    listEmployeeStore.getEmployees(
      {
        page:data.page,
        itemsPerPage: data.itemsPerPage
      }
    );
  }

  const openDialog = (item: EmployeeDomain)=>{
    console.log(item);
    selected.value = item.id;
    dialogConfig.openDialog();
    modal_props.visible = true;
    modal_props.text = `¿ESTÁS SEGURO DE ELIMINAR "${item.name}"?`;
  }

  const cancel=() =>{
    modal_props.visible = false;
  };

  const confirm=async() =>{
    await deleteEmployeeStore.destroy(selected.value);
    selected.value = 0 ;
    modal_props.visible = false;
    deleteEmployeeStore.$reset();
    // getData(page.value);
    changeTableOptions({page:1, itemsPerPage:10})
  };

  
</script>



