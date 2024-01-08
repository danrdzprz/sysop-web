<template>
  <div>
    <VContainer
          fluid
      >
        <div>
            <VRow justify="center" >
                <VCol class="text-center col-md-8 col-xl-5">
                    <div class="font-weight-bold body-1">
                        {{ $t('pages.human-resources.flow-chart.positions.create.title') }}
                    </div>
                </VCol>
            </VRow>
            <form @submit.prevent="onSubmit">
            <FormsPosition/>
            <VRow justify="center" align="end">
                <VCol cols="6" md="6" xl="5" class="">
                        <VRow justify="end">
                            <VBtn
                                :text=" $t('general.cancel') "
                                variant="outlined"
                                to="/human-resources/flow-chart/positions"
                                class="mr-0 mr-sm-2 mb-3 mb-sm-0"
                                :loading="update_position.status === RequestStatus.LOADING"
                            >
                                <template v-slot:append>
                                <VIcon start icon="mdi-close" />
                                </template>
                            </VBtn>
                            <VBtn
                                flat color="primary"
                                class="text-capitalize"
                                type="submit"
                                :loading="update_position.status === RequestStatus.LOADING"
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
    import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
    import { ResolverDepartmentSchema } from '~/schemes/hr/department.scheme';
    import { useUpdatePositionStore } from '~/store/hr/positions/update.store';
    import { useDetailPositionStore } from '~/store/hr/positions/detail.store';
    import { ApiPositionRepository } from '~/modules/positions/infra/position.respository';
    import type { PositionDomain } from '~/modules/positions/domain/position';

    definePageMeta({
        layout: 'private'
    });
    useHead({
        title: 'Departamentos'
    });

    const route = useRoute();
    const detail_position = useDetailPositionStore(ApiPositionRepository());
    const update_position = useUpdatePositionStore(ApiPositionRepository());
    const record_id = route.params.id as string;

    const { handleSubmit, handleReset,setErrors,setValues } = useForm<PositionDomain>({
        validationSchema: ResolverDepartmentSchema(),
        initialValues:{
          name:"",
        }
    });
    
    const onSubmit = handleSubmit(async values => {
      await update_position.update(+record_id, values);
    });

    update_position.$subscribe((mutation, state) => {
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
        update_position.$reset();
        navigateTo('/human-resources/flow-chart/positions');
      }
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
        setErrors(update_position.message as any);
      }
    });
    
    onMounted(async() => {
      await detail_position.detail(+record_id);
      setValues((detail_position.data as PositionDomain));
    });

</script>