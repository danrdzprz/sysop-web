<template>
  <div>
    <VContainer
          fluid
      >
        <div>
          
        </div>
    </VContainer>
  </div>
</template>

<script setup lang="ts">
  import { useForm } from 'vee-validate';
import type { EmployeeDomain } from '~/modules/employee/domain/employee.domain';
import { ApiEmployeeRepository } from '~/modules/employee/infra/ApiEmployeeRepository';
import { useDetailEmployeeStore } from '~/store/employees/detail.store';
  

    definePageMeta({
        layout: 'private'
    });
    useHead({
        title: 'Empleado'
    });

    const route = useRoute();
    const detail_employee = useDetailEmployeeStore(ApiEmployeeRepository());
    const record_id = route.params.id as string;


    const employee_data = computed(():EmployeeDomain => {
      return detail_employee.data as EmployeeDomain;
    })
    
    
    onMounted(async() => {
      await detail_employee.detail(+record_id);
    });

</script>