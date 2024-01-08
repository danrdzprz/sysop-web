<template>
  <VAppBar class="app-header" color="primary" flat>
    
    <v-container class="mx-auto d-flex align-center justify-center">
        <v-avatar
          class="me-4 "
          color="white"
          size="32"
        >S</v-avatar>

        <NuxtLink class="list-item" to="/employess">
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
    <!-- Theme switcher -->
    <VBtn @click="toggleTheme" class="mr-2" icon>
      <VIcon icon="mdi-white-balance-sunny" />
    </VBtn>
    <!-- Notification -->
    <v-btn
      :text="me_store.me_data.name"
      variant="text"
    ></v-btn>
    <!-- Contacts -->
    <!-- Profile -->
    <div class="mr-md-10">
      <v-menu >
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-account" v-bind="props"></v-btn>
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


const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value == MAIN_THEME ? MAIN_DARK_THEME : MAIN_THEME;
};

const _authRepository = authRepository();

const { logoutAction, $subscribe, request_status } = useLogoutStore(_authRepository); // use authenticateUser action from  auth store
const me_store = useMeStore(_authRepository); // use authenticateUser action from  auth store
// const { authenticated,logout } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const _logout = async() => {
  const response = await logoutAction();
  // router.push('/signin');
};

$subscribe((mutation, state) => {
      if( state.request_status.status !== RequestStatus.LOADING && state.request_status.status === RequestStatus.SUCCESS ){
        navigateTo('/signin');
      }
});

</script>

<style lang="scss">
    @use '../assets/styles/variables';
  //   @import '../../node_modules/vuetify/lib/styles/settings/_variables';

  //   .v-application .caption {
  //     font-size: .75rem!important;
  //     letter-spacing: .0333333333em!important;
  //     line-height: 1.25rem;
  //   }
  //   .app-toolbar{
  //     padding: 0 !important;
  //   }
  // //  .parent-class >>> .v-toolbar__content {
  // //     padding: 0px !important;
  // //   }

  //   .user-button{
  //       text-transform: unset !important;
  //       &-business{
  //           @media (max-width: #{map-get($grid-breakpoints, 'md')}) {
  //               width: 100px;
  //           }
  //       }
  //   }

  //   .page-title{
  //       @media (max-width: #{map-get($grid-breakpoints, 'sm')}) {
  //          font-size: 0.75rem;
  //       }
  //   }

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

    // .v-toolbar__content{
    //     margin: 0 7px !important;
    // }
</style>