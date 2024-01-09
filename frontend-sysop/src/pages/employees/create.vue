<template>
  <div>
    <VContainer
          fluid
      >
        <div>
            <VRow justify="center" >
                <VCol class="text-center col-md-8 col-xl-5">
                    <div class="font-weight-bold body-1">
                        {{ $t('pages.employees.create.title') }}
                    </div>
                </VCol>
            </VRow>
            <form @submit.prevent="onSubmit">
            <!-- <VRow justify="center" align="center"> -->
            <FormsEmployee/>
            <!-- </VRow> -->
            <VRow justify="center" align="end">
                <VCol cols="6" md="6" xl="5" class="">
                        <VRow justify="end">
                            <VBtn
                                rounded="xl"
                                :text=" $t('general.cancel') "
                                variant="outlined"
                                to="/employees"
                                class="mr-0 mr-sm-2 mb-3 mb-sm-0"
                                :loading="store_employees.status === RequestStatus.LOADING"
                            >
                                <template v-slot:append>
                                <VIcon start icon="mdi-close" />
                                </template>
                            </VBtn>
                            <VBtn
                                rounded="xl"
                                flat color="primary"
                                class="text-capitalize"
                                type="submit"
                                :loading="store_employees.status === RequestStatus.LOADING"
                            >
                                <VIcon start icon="mdi-content-save-outline" />
                                <span>{{  $t('general.save')  }}</span>
                                </VBtn>
                        </VRow>
                </VCol>
            </VRow>
            </form>
        </div>
    </VContainer>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import type { EmployeeDomain } from '~/modules/employee/domain/employee.domain';
import { ApiEmployeeRepository } from '~/modules/employee/infra/ApiEmployeeRepository';
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
import { ResolverEmployeeSchema } from '~/schemes/employee.scheme';
import { useCreateEmployeesStore } from '~/store/employees/create.store';


    definePageMeta({
        layout: 'private'
    });
    useHead({
        title: 'Empleados'
    });

  
    const store_employees = useCreateEmployeesStore(ApiEmployeeRepository());

    const { handleSubmit, handleReset,setErrors, errors, values } = useForm<EmployeeDomain>({
        validationSchema: ResolverEmployeeSchema(),
        initialValues:{
          name:"",
        }
    });
    
    const onSubmit = handleSubmit(async values => {
      await store_employees.save(values);
    });

    store_employees.$subscribe((mutation, state) => {
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
        store_employees.$reset();
        navigateTo('/employees');
      }
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
        setErrors(store_employees.message as any);
      }
    });

</script>