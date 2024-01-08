<template>
  <div>
    <VContainer
          fluid
      >
        <div>
          <VRow no-gutters align="start" justify="start" class="login-text-color mb-10">
            <VCol>
              <div class="text-left">
                <v-avatar color="surface-variant" size="54"></v-avatar>
              </div>
            </VCol>
            <VCol>
              <div class="text-left">
                <h1 class="signin-titles signin-title">{{ employee_data?.name }}</h1>
              </div>
            </VCol>
          </VRow>
            <form @submit.prevent="onSubmit">
            <VRow justify="center" align="center">
                <FormsDepartment/>
            </VRow>
            <VRow justify="center" align="end">
                <VCol cols="6" md="8" xl="5" class="">
                        
                </VCol>
            </VRow>
            </form>
        </div>
    </VContainer>
  </div>
</template>

<script setup lang="ts">
  import { useForm } from 'vee-validate';
  import type { DepartmentDomain } from '~/modules/departments/domain/department.domain';
  import { ResolverDepartmentSchema } from '~/schemes/hr/department.scheme';
  import { useDetailEmployeeStore } from '~/store/hr/employees/detail.store';
  import { ApiEmployeeRepository } from '~/modules/employees/infra/ApiEmployeeRepository';
import type { EmployeeDomain } from '~/modules/employees/domain/employee.domain';

    definePageMeta({
        layout: 'private'
    });
    useHead({
        title: 'Empleado'
    });

    const route = useRoute();
    const detail_employee = useDetailEmployeeStore(ApiEmployeeRepository());
    const record_id = route.params.id as string;

    const { handleSubmit, handleReset,setErrors,setValues } = useForm<DepartmentDomain>({
        validationSchema: ResolverDepartmentSchema(),
        initialValues:{
          name:"",
        }
    });

    const employee_data = computed(():EmployeeDomain => {
      return detail_employee.data as EmployeeDomain;
    })
    
    const onSubmit = handleSubmit(async values => {
    });

    
    onMounted(async() => {
      await detail_employee.detail(+record_id);
    });

</script>