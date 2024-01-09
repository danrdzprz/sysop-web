<template>
  <div>
    <VContainer
          fluid
      >
        <div>
            <VRow justify="center" >
                <VCol class="text-center col-md-8 col-xl-5">
                    <div class="font-weight-bold body-1">
                        {{ $t('pages.posts.update.title') }}
                    </div>
                </VCol>
            </VRow>
            <form @submit.prevent="onSubmit">
            <FormsPost/>
            <VRow justify="center" align="end">
                <VCol cols="6" md="6" xl="5" class="">
                        <VRow justify="end">
                            <VBtn
                                :text=" $t('general.cancel') "
                                variant="outlined"
                                to="/"
                                class="mr-0 mr-sm-2 mb-3 mb-sm-0"
                                :loading="update_post.status === RequestStatus.LOADING"
                            >
                                <template v-slot:append>
                                <VIcon start icon="mdi-close" />
                                </template>
                            </VBtn>
                            <VBtn
                                flat color="primary"
                                class="text-capitalize"
                                type="submit"
                                :loading="update_post.status === RequestStatus.LOADING"
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
import { useDetailPostStore } from '~/store/post/detail.store';
import { useUpdatePostStore } from '~/store/post/update.store';

    definePageMeta({
        layout: 'private'
    });
    useHead({
        title: 'Posts'
    });

    const route = useRoute();
    const detail_post = useDetailPostStore(ApiPostRepository());
    const update_post = useUpdatePostStore(ApiPostRepository());
    const record_id = route.params.id as string;

    const { handleSubmit, handleReset,setErrors,setValues } = useForm<PostDomain>({
        validationSchema: ResolverPostSchema(),
        initialValues:{
          title:"", 
        }
    });
    
    const onSubmit = handleSubmit(async values => {
      await update_post.update(+record_id, values);
    });

    update_post.$subscribe((mutation, state) => {
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
        update_post.$reset();
        navigateTo('/');
      }
      if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.ERROR ){
        setErrors(update_post.errors as any);
      }
    });
    
    onMounted(async() => {
      await detail_post.detail(+record_id);
      setValues((detail_post.data as PostDomain));
    });

</script>