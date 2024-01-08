<template>
  <div>
    <VContainer fluid>
      <!-- Page heading -->
      <VRow align="end" justify="space-between">
        <div class="d-flex justify-center">
          <v-card-title class="text-h6 text-md-h5 text-lg-h4">{{ $t('pages.posts.index.title') }}</v-card-title>
        </div>
        </VRow>
        <!-- Table search -->
        <VRow justify="space-between">
          
          <VCol cols="3" md="3">
            <SharedSearchInput
              v-model="search"
            >
            </SharedSearchInput>
          </VCol>
          <VCol sm="3" cols="3" class="text-sm-right">
            <VBtn 
              flat
              color="primary"  
              class="text-capitalize"
              to="/posts/create"
              rounded="xl"
            >
              <VIcon start icon="mdi-plus" />
              <span>{{ $t('pages.posts.index.create') }} </span>
            </VBtn>
          </VCol>
        </VRow>
        <VRow justify="space-between" >
          <VCol sm="4" cols="4" v-for="item of listPosts.pagination.data">
            <v-card
              class="mx-auto"
              max-width="344"
              :title="item.title"
              :subtitle="`Autor: ${item.user.name}`"
            >
              <v-card-text>
                <div class="text--primary">
                  {{ item.text }}
                </div>
              </v-card-text>
              <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn size="small" color="surface-variant" variant="text" icon="mdi-open-in-new"></v-btn>
                <v-btn size="small" color="surface-variant" variant="text" icon="mdi-pencil" :to="`/posts/${item.id}`"></v-btn>
                <v-btn size="small" color="surface-variant" variant="text" icon="mdi mdi-delete" @click="openDialog(item)"></v-btn>
              </v-card-actions>
            </v-card>
          </VCol>
        </VRow>
        <v-row justify="center">
          <v-col cols="4">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="listPosts.pagination.last_page"
                @update:modelValue="(n: number)=> getData(n)"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>

      <!-- <transition name="fade" mode="out-in">
        

      </transition> -->
    <SharedModal
      v-model:visible="modal_props.visible"
      v-model:text="modal_props.text"
      width="500"
      bottom-line-color='error'
      title='Eliminar'
    >
    <template v-slot:actions>
      <VBtn 
          text="Cancelar"
          variant="outlined"
          class="mr-0 mr-sm-2 mb-3 mb-sm-0"
          @click="cancel"
        >
          <span>No, cancelar</span>
        </VBtn>
        <VBtn 
          variant="outlined"
          flat color="warning"  
          @click="confirm"
        >
          <span>Si, eliminar</span>
        </VBtn>
    </template> 
    </SharedModal>
    </VContainer>
  </div>
</template>

<script setup lang="ts">
  import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
  import { useDialogConfig } from '@/store/dialogConfig.store'
  import { onMounted } from 'vue';
  import type { PaginationOption } from '~/components/shared/SRCustomDataTable.vue';
  import type { PostDomain } from '~/modules/posts/domain/post.domain';
  import { useListPostStore } from '~/store/post/list.store';
  import { ApiPostRepository } from '~/modules/posts/infra/post.respository';
  import { useDeletePostStore } from '~/store/post/destroy.store';

  definePageMeta({
    layout: 'private'
  });
  useHead({
    title: 'Home'
  });

  const listPosts = useListPostStore( ApiPostRepository() );

  const deletePosts = useDeletePostStore( ApiPostRepository() );

  const modal_props= reactive({
    visible: false,
    text: '',
    loading: false
  });

  const dialogConfig = useDialogConfig();

  const selected = ref(0);
  const search = ref("");
  const page = ref(1);
  const itemsPerPage = ref(9);

  
  onMounted(async() => {
    getData(page.value);
  });

  const getData =  async(page: number)=>{
    await listPosts.getPosts(
      {
        page:page,
        itemsPerPage: itemsPerPage.value
      }
    );
  }

  const totalItems = computed(():number => {
    return listPosts.pagination.meta ? listPosts.pagination.meta.total : totalItems.value;
  })
  
  const openDialog = (item: PostDomain)=>{
    selected.value = item.id;
    dialogConfig.openDialog();
    modal_props.visible = true;
    modal_props.text = `¿ESTÁS SEGURO DE ELIMINAR "${item.title}"?`;
  }

  const cancel=() =>{
    modal_props.visible = false;
  };

  const confirm=async() =>{
    await deletePosts.destroy(selected.value);
    selected.value = 0 ;
    modal_props.visible = false;
    deletePosts.$reset();
    getData(page.value);
  };


</script>
<style lang="scss">
 .main-card{
  height: 80vh;
 }
</style>