<template>
  <div>
    <VContainer
          fluid
      >
        <div>
            <VRow justify="center" >
                <VCol class="text-center col-md-8 col-xl-5">
                    <div class="font-weight-bold body-1">
                        {{ $t('pages.human-resources.flow-chart.departments.create.title') }}
                    </div>
                </VCol>
            </VRow>
            <form @submit.prevent="onSubmit">
            <VRow justify="center" align="center">
                <FormsDepartment/>
            </VRow>
            <VRow justify="center" align="end">
                <VCol cols="6" md="8" xl="5" class="">
                        <VRow justify="end">
                            <VBtn
                                :text=" $t('general.cancel') "
                                variant="outlined"
                                to="/human-resources/flow-chart/departments"
                                class="mr-0 mr-sm-2 mb-3 mb-sm-0"
                                :loading="update_departmen.status === RequestStatus.LOADING"
                            >
                                <template v-slot:append>
                                <VIcon start icon="mdi-close" />
                                </template>
                            </VBtn>
                            <VBtn
                                flat color="primary"
                                class="text-capitalize"
                                type="submit"
                                :loading="update_departmen.status === RequestStatus.LOADING"
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
    import { ApiDepartmentRepository } from '~/modules/departments/infra/ApiDepartementRepository';
    import { useDetailDepartmentStore } from '@/store/hr/departments/detail.store';
    import { useUpdateDepartmentStore } from '@/store/hr/departments/update.store';
    import { useForm } from 'vee-validate';
    import type { DepartmentDomain } from '~/modules/departments/domain/department.domain';
    import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
    import { ResolverDepartmentSchema } from '~/schemes/hr/department.scheme';

    definePageMeta({
        layout: 'private'
    });
    useHead({
        title: 'Departamentos'
    });

    const route = useRoute();
    const detail_department = useDetailDepartmentStore(ApiDepartmentRepository());
    const update_departmen = useUpdateDepartmentStore(ApiDepartmentRepository());
    const record_id = route.params.id as string;

    const { handleSubmit, handleReset,setErrors,setValues } = useForm<DepartmentDomain>({
        validationSchema: ResolverDepartmentSchema(),
        initialValues:{
          name:"",
        }
    });
    
    const onSubmit = handleSubmit(async values => {
      await update_departmen.update(+record_id, values);
    });

    update_departmen.$subscribe((mutation, state) => {
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
        update_departmen.$reset();
        navigateTo('/human-resources/flow-chart/departments');
      }
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
        setErrors(update_departmen.message as any);
      }
    });
    
    onMounted(async() => {
      await detail_department.detail(+record_id);
      setValues((detail_department.data as DepartmentDomain));
    });

</script>