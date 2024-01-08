<template>
    <VNavigationDrawer
      class="sidemenu-border"
      width="200"
      v-model="store_drawer.open"
    >
      <VList>
        <VListItem
          class="mt-15 mb-15 left-side-menu"
          density="compact"
        >
          <NuxtLink class="list-item" to="/" active-class="v-list-item--active">
            <VListItem class="" value="myfiles" >Home</VListItem>
          </NuxtLink>
          <NuxtLink class="list-item" to="/human-resources/employees" active-class="v-list-item--active">
            <VListItem class="" value="myfiles" >Administración de personal</VListItem>
          </NuxtLink>
          <!-- <NuxtLink class="list-item" to="/human-resources/job-appilactions">
            <VListItem value="myfiles">Reculta y contratación</VListItem>
          </NuxtLink> -->
          <v-list v-model:opened="open">
            <v-list-group value="Reculta">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  title="Reculta y contratación"
                ></v-list-item>
              </template>
              <NuxtLink class="list-item" to="/human-resources/job-appilactions">
                <VListItem value="myfiles">Solicitudes</VListItem>
              </NuxtLink>
              <NuxtLink class="list-item" to="/human-resources/surveys">
                <VListItem value="myfiles">Encuestas</VListItem>
              </NuxtLink>
            </v-list-group>
          </v-list>
          <!-- <NuxtLink class="list-item" to="/human-resources/flow-chart">
            <VListItem value="myfiles">Organigrama</VListItem>
          </NuxtLink> -->

          <v-list v-model:opened="open">
            <v-list-group value="Organigrama">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  title="Organigrama"
                ></v-list-item>
              </template>
              <NuxtLink class="list-item" to="/human-resources/flow-chart/departments">
                <VListItem value="myfiles">Departamentos</VListItem>
              </NuxtLink>
              <NuxtLink class="list-item" to="/human-resources/flow-chart/positions">
                <VListItem value="myfiles">Puestos</VListItem>
              </NuxtLink>
            </v-list-group>
          </v-list>



        </VListItem>
      </VList>
      <VList density="compact" nav>
      </VList>
    </VNavigationDrawer>
</template>

<script setup lang="ts">
  import { useDrawerStore } from "~/store/drawer.store";

  import { ref } from 'vue'
  import { useTheme } from "vuetify";

  const theme = useTheme();
  const store_drawer = useDrawerStore();

  const darkTheme = computed(() => theme.current.value.dark);
  const drawer = ref(null)
  const open = ref([])
</script>

<style lang="scss">

  .left-side-menu{
    border-bottom: 12px !important;
    border-color: #706bff !important;
    padding: 0px !important;
  }
  //   @import '../../node_modules/vuetify/lib/styles/settings/_variables';
  //   @import '../assets/_stylesheet';

  //   .exact-active {
  //     color: var(--v-sidebarTextActive-base) !important;
  //   }

  //   .active:link { text-decoration: none; }
  //   .active:visited { text-decoration: none; }
  //   .active:hover { text-decoration: none; }
  //   .active:active { text-decoration: none; }

  //   .v-list-group__items .v-list-item {
  //     padding-left: 30px;
  //   }

    .list-item{
      color: rgb(var(--v-theme-primary)) !important;
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

    // .v-list-item--active{
    //   background-color: rgb(var(--v-theme-primary));
    //   color: rgb(247, 247, 247) !important;
    // }


  //   .v-application--is-ltr .v-list-item__action:last-of-type:not(:only-child), .v-application--is-ltr .v-list-item__avatar:last-of-type:not(:only-child), .v-application--is-ltr .v-list-item__icon:last-of-type:not(:only-child){
  //       margin-left: unset !important;
  //   }
  //   .v-list-group .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon{
  //       min-width: unset !important;
  //   }

	// .v-list-group__items .v-list-item.border-orange {
	// 	padding-left: 24px !important;
	// }

	// .v-list-item.border-orange{
	// 	padding-left: 10px !important;
	// }

	// .v-list--dense .v-list-item .v-list-item__icon{
	// 	margin-top: 7px;
	// 	margin-bottom: 7px;
	// }

  //   .sidemenu-border{
  //       -webkit-border-radius: 0px 70px 70px 0px;
  //       -moz-border-radius: 0px 70px 70px 0px;
  //       border-radius: 0px 70px 70px 0px;
  //   }

  //   .right-direction{
  //       direction: ltr !important;
  //   }

  //   .left-direction{
  //       direction: rtl !important;
  //   }
    


  //   .triangle{
  //       width: 100%;
  //       height: 350px;
  //       background: #555;
  //       position: absolute;
  //       bottom: 0px;
  //       // left: 200px;
  //       z-index: -10;
		
  //       &::after{
  //           content: "";
  //           width: 400%;
  //           height: 400px;
  //           position: absolute;
  //           left: -250%;
  //           z-index: -1;
  //           -webkit-clip-path:  polygon(50% 0%, 0% 100%, 100% 100%);
  //           clip-path:  polygon(50% 0%, 0% 100%, 100% 100%);

  //           opacity: 0;
  //           animation-name: triangeMoveInbuttom;
  //           animation-duration: 1s;
  //           animation-fill-mode: forwards;  
  //           animation-timing-function: ease-out; /*como va manejar el tiempo de la animacion (esase-out: se acelera al final)*/
    
  //       }

  //       &-1{
  //           &::after{
  //               background: var(--v-sidebarDetail1-base);
  //               bottom: -40%;
	// 			        animation-delay: 1.2s;
  //           }
			
  //       }

  //       &-2{
  //           &::after{
  //               background: var(--v-sidebarDetail2-base);
  //               bottom: -55%;
	// 			        animation-delay: 0.8s;
  //           }
  //       }

  //       &-3{
  //           &::after{
  //               background: var(--v-sidebarDetail3-base);
  //               bottom: -70%;
	// 			        animation-delay: 0.4s;
  //           }
  //       }


  //       &-4{
  //           &::after{
  //               background: var(--v-sidebarDetail4-base);
  //               bottom: -85%;
  //           }
  //       }

    // }
</style>