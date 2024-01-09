<template>
  <div>
    <VContainer
          fluid
      >
        <div>
            
            <VRow >
                <VCol class="col-md-8 col-xl-5" v-if="post_data">
                  <v-card
                    class="mx-auto"
                    variant="tonal"
                    max-width="400"
                    :title="post_data.title"
                  >
                    <template v-slot:prepend>
                      <v-icon size="x-large"></v-icon>
                    </template>
      
                    <v-card-text class="text-h5 py-2">
                      "{{ post_data.text }}"
                    </v-card-text>
      
                    <v-card-actions>
                      <v-list-item class="w-100">
                        <template v-slot:prepend>
                          <v-avatar
                            color="grey-darken-3"
                          ></v-avatar>
                        </template>
      
                        <v-list-item-title>{{ post_data.user.name }}</v-list-item-title>
      
                        <v-list-item-subtitle>Autor</v-list-item-subtitle>
      
                        <template v-slot:append>
                          <div class="justify-self-end">
                            <v-icon class="me-1" icon="mdi-heart"></v-icon>
                            <span class="subheading me-2">256</span>
                            <span class="me-1">·</span>
                            <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                            <span class="subheading">45</span>
                          </div>
                        </template>
                      </v-list-item>
                    </v-card-actions>
                  </v-card>
                </VCol>
            </VRow>



            <VRow justify="center" align="end">
                <VCol cols="6" md="6" xl="5" class="">
                        <VRow justify="end">
                            <VBtn
                                :text=" $t('general.back') "
                                variant="outlined"
                                to="/"
                                class="mr-0 mr-sm-2 mb-3 mb-sm-0"
                            >
                            </VBtn>
                        </VRow>
                </VCol>
            </VRow>
        </div>
    </VContainer>
  </div>
</template>

<script setup lang="ts">
import type { PostDomain } from '~/modules/posts/domain/post.domain';
import { ApiPostRepository } from '~/modules/posts/infra/post.respository';
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
import { useDetailPostStore } from '~/store/post/detail.store';

    definePageMeta({
        layout: 'private'
    });
    useHead({
        title: 'Posts'
    });

    const route = useRoute();
    const detail_post = useDetailPostStore(ApiPostRepository());
    const record_id = route.params.id as string;

    const post_data = computed<PostDomain>(()=>  detail_post.data as PostDomain)
    
    
    onMounted(async() => {
      await detail_post.detail(+record_id);
    });

    onBeforeUnmount(() => {
      detail_post.$reset();
    })

</script>