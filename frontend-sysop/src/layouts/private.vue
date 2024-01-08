<template>
    <div>
        <VLayout>
            <Header/>
            <VMain>
                <VContainer fluid class="main-container"
            >
                <!-- <div class="mx-10 mx-lg-10 form-content-container" style="height: 85vh; background-color: #f2f2f2;" > -->
                <div class="mx-10 mx-lg-10 form-content-container" style="height: 85vh;" >
                    <slot/>
                </div>
                </VContainer>
            </VMain>
            <SharedSnackbar/>
        </VLayout>
    </div>
</template>

<script setup lang="ts">
    import { useMeStore } from '~/store/auth/me.store'; // import the auth store we just created
    import { authRepository } from "@/modules/auth/infra/ApiAuthRepository";
    const _authRepository = authRepository();
    const me_store = useMeStore(_authRepository); // use authenticateUser action from  auth store

    onMounted(async() => {
        await me_store.getMe();
    });

</script>