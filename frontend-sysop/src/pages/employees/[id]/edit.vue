<template>
  <div>
    <VContainer
          fluid
      >
        <div>
            <VRow justify="center" >
                <VCol class="text-center col-md-8 col-xl-5">
                    <div class="font-weight-bold body-1">
                        {{ $t('pages.employees.update.title') }}
                    </div>
                </VCol>
            </VRow>
            <form @submit.prevent="onSubmit">
            <VRow justify="center" align="center">
                <FormsEmployee/>
            </VRow>
            <VRow justify="center" align="end">
                <VCol cols="6" md="8" xl="5" class="">
                        <VRow justify="end">
                            <VBtn
                                :text=" $t('general.cancel') "
                                variant="outlined"
                                to="/employees"
                                class="mr-0 mr-sm-2 mb-3 mb-sm-0"
                                :loading="update_employee.status === RequestStatus.LOADING"
                            >
                                <template v-slot:append>
                                <VIcon start icon="mdi-close" />
                                </template>
                            </VBtn>
                            <VBtn
                                flat color="primary"
                                class="text-capitalize"
                                type="submit"
                                :loading="update_employee.status === RequestStatus.LOADING"
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
import { useDetailEmployeeStore } from '~/store/employees/detail.store';
import { useUpdateEmployeeStore } from '~/store/employees/update.store';

    definePageMeta({
        layout: 'private'
    });
    useHead({
        title: 'Departamentos'
    });

    const route = useRoute();
    const detail_department = useDetailEmployeeStore(ApiEmployeeRepository());
    const update_employee = useUpdateEmployeeStore(ApiEmployeeRepository());
    const record_id = route.params.id as string;

    const { handleSubmit, handleReset,setErrors,setValues } = useForm<EmployeeDomain>({
        validationSchema: ResolverEmployeeSchema(),
        initialValues:{
          name:"",
        }
    });
    
    const onSubmit = handleSubmit(async values => {
      await update_employee.update(+record_id, values);
    });

    update_employee.$subscribe((mutation, state) => {
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
        update_employee.$reset();
        navigateTo('/employees');
      }
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
        setErrors(update_employee.message as any);
      }
    });
    
    onMounted(async() => {
      await detail_department.detail(+record_id);
      setValues((detail_department.data as EmployeeDomain));
    });

</script>