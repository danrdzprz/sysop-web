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
            <!-- <VRow justify="center" align="center"> -->
                <FormsPosition/>
            <!-- </VRow> -->
            <VRow justify="center" align="end">
                <VCol cols="6" md="6" xl="5" class="">
                        <VRow justify="end">
                            <VBtn
                                rounded="xl"
                                :text=" $t('general.cancel') "
                                variant="outlined"
                                to="/human-resources/flow-chart/positions"
                                class="mr-0 mr-sm-2 mb-3 mb-sm-0"
                                :loading="store_positions.status === RequestStatus.LOADING"
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
                                :loading="store_positions.status === RequestStatus.LOADING"
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
    import { ResolverPositionSchema } from '~/schemes/hr/position.scheme';
    import { useCreatePositionStore } from '~/store/hr/positions/create.store';
    import { ApiPositionRepository } from '~/modules/positions/infra/position.respository';
    import type { PositionDomain } from '~/modules/positions/domain/position';

    definePageMeta({
        layout: 'private'
    });
    useHead({
        title: 'Departamentos'
    });

  
    const store_positions = useCreatePositionStore(ApiPositionRepository());

    const { handleSubmit, handleReset,setErrors, errors } = useForm<PositionDomain>({
        validationSchema: ResolverPositionSchema(),
        initialValues:{
          name:"",
        }
    });
    
    const onSubmit = handleSubmit(async values => {
      await store_positions.save(values);
    });

    store_positions.$subscribe((mutation, state) => {
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
        store_positions.$reset();
        navigateTo('/human-resources/flow-chart/positions');
      }
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
        setErrors(store_positions.message as any);
      }
    });

</script>