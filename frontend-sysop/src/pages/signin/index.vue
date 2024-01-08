<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="7" md="6" lg="7" sm="6">
        <VRow no-gutters align="start" justify="center" class="login-text-color">
          <VCol align-self="start">
            <div class="text-center">
              <h1 class="signin-titles signin-title">SysOp</h1>
            </div>
            <div class="text-center">
              <h2 class="signin-sub-title">Diseño web /Marketing digital</h2>
            </div>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="5">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1 class="login-text-color">Bienvenido</h1>
            <p class="login-text-color">Inicia Sesión para comenzar</p>

            <VForm @submit.prevent="onSubmit" class="mt-7">
              <FormsLogin></FormsLogin>
              <div class="mt-5">
                <VBtn :loading="login_store.status === RequestStatus.LOADING" type="submit" block min-height="44" class="gradient primary" color="primary" rounded="xl">Ingresar</VBtn>
              </div>
            </VForm>
            <p class="text-body-2 mt-10">
              <NuxtLink to="/reset-password" class="font-weight-bold text-primary"
                >Olvide mi contraseña :c</NuxtLink
              >
            </p>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { ResolverLoginSchema} from '@/schemes/login.scheme';
  import { useAuthStore } from '@/store/auth/login.store';
  import { authRepository } from "@/modules/auth/infra/ApiAuthRepository";
  import type { IAuth } from '~/modules/auth/domain/Auth';
  import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
  
  definePageMeta({
    layout: 'default'
  })

  useHead({
    title: 'Iniciar Sesion'
  })

  const _authRepository = authRepository();

  const router = useRouter()


  
  const login_store = useAuthStore(_authRepository);

  const { handleSubmit, handleReset,setErrors,errors,values } = useForm<IAuth>({
    validationSchema: ResolverLoginSchema(),
    initialValues:{
      email:"",
      password:"",
    }
  });

  const onSubmit = handleSubmit(async values => {
    await login_store.submitLogin(values);
  });

  login_store.$subscribe((mutation, state) => {
    if(state.status === RequestStatus.SUCCESS){
      router.push('/');
    }
  })  

</script>

<style lang="scss">
// @use "~/assets/scss/main.scss";
.login-text-color{
  color: rgb(var(--v-theme-primary));
}

.v-responsive__sizer{
  padding-bottom: 43% !important;
}

.signin-title{
  font-size: 10rem;
}

.signin-sub-title{
  font-size: 2rem;
}

.signin-titles{
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: lighter;
}

.text-center{
  margin-top: -21px;
}

</style>
