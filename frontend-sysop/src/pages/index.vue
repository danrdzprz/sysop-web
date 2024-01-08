<template>
  <div>
  <VContainer fluid class="main-card" >
    <VRow no-gutters justify="center" class="fill-height">
     
    </VRow>
  </VContainer>
  </div>
</template>

<script setup lang="ts">
  import { useMeStore } from '~/store/auth/me.store'; // import the auth store we just created
  import { authRepository } from "@/modules/auth/infra/ApiAuthRepository";
  import { RequestStatus } from '~/modules/shared/domain/RequestStatus';

  const _authRepository = authRepository();
  const me_store = useMeStore(_authRepository); // use authenticateUser action from  auth store

  definePageMeta({
    layout: 'private'
  })

  useHead({
    title: 'Home'
  })


</script>
<style lang="scss">
 .main-card{
  height: 80vh;
 }

 .v-btn--block {
  justify-content: flex-start;
 }

 .v-list-subheader__text{
  display: flex;
  flex-direction: row;
 }
 .v-list-item__append{
  display: flex;
  flex-direction: column;
 }

 .list-reminder{
    border-left: 1px solid;
    border-color: #706bff;
    height: 520px;
 }
</style>