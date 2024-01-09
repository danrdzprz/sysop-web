<template>
  <VAppBar class="app-header" color="primary" flat>
    
    <v-container class="mx-auto d-flex align-center justify-center">
        <v-avatar
          class="me-4 "
          color="white"
          size="32"
        >S</v-avatar>

        <NuxtLink class="list-item" to="/employees" v-if="can_show">
          <v-btn
          text="Empleados"
          variant="text"
          ></v-btn>
        </NuxtLink>

        <NuxtLink class="list-item" to="/">
          <v-btn
          text="Posts"
          variant="text"
          ></v-btn>
        </NuxtLink>

        <v-spacer></v-spacer>
        
      </v-container>
    <VSpacer />
    
    <!-- Profile -->
    <div class="mr-md-10">
      <v-menu >
        <template v-slot:activator="{ props }">
          <v-btn
            :text="me_store.me_data.name"
            variant="text"
            v-bind="props"
            class="d-none d-sm-flex"
          ></v-btn>
          <v-btn class="d-flex d-sm-none" icon="mdi-account" size="small" v-bind="props"></v-btn>

        </template>
        <VCard rounded="lg" class="shadow">
          <VList nav>
            <v-list-item link>
              <template #prepend>
                <VIcon class="mr-5" icon="mdi-exit-to-app" />
              </template>
              <template #title>
                <span class="text-subtitle-2 font-weight-medium" @click="()=>_logout()" :disable="false">Logout</span>
              </template>
            </v-list-item>
          </VList>
        </VCard>
      </v-menu>
    </div>

  </VAppBar>
  
</template>

<script setup lang="ts">
import { useMeStore } from '~/store/auth/me.store'; // import the auth store we just created
import { useLogoutStore } from "~/store/auth/logout.store";
import { authRepository } from "@/modules/auth/infra/ApiAuthRepository";
import { useTheme } from "vuetify";
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';

const theme = useTheme();

const _authRepository = authRepository();

const logout_store = useLogoutStore(_authRepository);
const me_store = useMeStore(_authRepository);

const _logout = async() => {
  await logout_store.logoutAction();
};

logout_store.$subscribe((mutation, state) => {
  if( state.status !== RequestStatus.LOADING && state.status === RequestStatus.SUCCESS ){
    navigateTo('/signin');
  }
});

const can_show = computed({
  get() {
    if( me_store.status !== RequestStatus.LOADING && me_store.status === RequestStatus.SUCCESS ){
      if(me_store.me_data.role.name === 'ADMIN'){
        return true;
      }
    }
    return false;
  },
  set(newValue) {
    return newValue;
  },
})

</script>

<style lang="scss">
    @use '../assets/styles/variables';
 
    .line-app-header{
        width: 100%;
        height: 5px;
        background: variables.$lineColor-1;
        position: absolute;
        bottom: 0px;
        z-index: -10;
    }

    .list-item{
      color: white !important;
      font-size: 0.8rem;
      font-weight: 500;
      line-height: 1rem;
      text-transform: uppercase;
    }

    .list-item:link, .list-item:visited, .list-item:active {
      text-decoration:none;
    }

    .v-list-item--rounded {
      border-radius: 0px;
    }

    .v-list{
      padding: 0px;
    }
   
</style>