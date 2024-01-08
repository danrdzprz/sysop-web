<template>
  <div>
    <VContainer
          fluid
      >
        <div>
            <VRow justify="center" >
                <VCol class="text-center col-md-8 col-xl-5">
                    <div class="font-weight-bold body-1">
                        {{ $t('pages.posts.create.title') }}
                    </div>
                </VCol>
            </VRow>
            <form @submit.prevent="onSubmit">
            <!-- <VRow justify="center" align="center"> -->
            <FormsPost/>
            <!-- </VRow> -->
            <VRow justify="center" align="end">
                <VCol cols="6" md="6" xl="5" class="">
                        <VRow justify="end">
                            <VBtn
                                rounded="xl"
                                :text=" $t('general.cancel') "
                                variant="outlined"
                                to="/"
                                class="mr-0 mr-sm-2 mb-3 mb-sm-0"
                                :loading="store_posts.status === RequestStatus.LOADING"
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
                                :loading="store_posts.status === RequestStatus.LOADING"
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
    import type { PostDomain } from '~/modules/posts/domain/post.domain';
    import { ApiPostRepository } from '~/modules/posts/infra/post.respository';
    import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
    import { ResolverPostSchema } from '~/schemes/post.scheme';
    import { useCreatePostStore } from '~/store/post/create.store';


    definePageMeta({
        layout: 'private'
    });
    useHead({
        title: 'Posts'
    });

  
    const store_posts = useCreatePostStore(ApiPostRepository());

    const { handleSubmit, handleReset,setErrors, errors } = useForm<PostDomain>({
        validationSchema: ResolverPostSchema(),
        initialValues:{
          title:"",
        }
    });
    
    const onSubmit = handleSubmit(async values => {
      await store_posts.save(values);
    });

    store_posts.$subscribe((mutation, state) => {
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
        store_posts.$reset();
        navigateTo('/');
      }
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
        setErrors(store_posts.message as any);
      }
    });

</script>