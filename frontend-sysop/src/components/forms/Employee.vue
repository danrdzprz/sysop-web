
<template>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsTextField
                label="Nombre"
                class="shrink"
                name="name"
            >
            </InputsTextField>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsTextField
                label="Correo"
                class="shrink"
                name="email"
            >
            </InputsTextField>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsAutocomplete
                label="Rol"
                class="shrink"
                name="role_id"
                :loading="listRoles.status === RequestStatus.LOADING"
                :items="listRoles.catalog"
            >
            </InputsAutocomplete>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsTextField
                label="Télefono"
                class="shrink"
                name="phone"
            >
            </InputsTextField>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsTextField
                label="Fecha de nacimiento"
                class="shrink"
                name="birthdate"
            >
            </InputsTextField>
        </VCol>
    </VRow>

    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsTextField
                label="Contraseña"
                name="password"
                type="password"
            >
            </InputsTextField>
        </VCol>
    </VRow>

    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsTextField
                label="Confirmación de contraseña"
                name="password_confirmation"
                type="password"
            >
            </InputsTextField>
        </VCol>
    </VRow>
    
    
</template>
<script setup lang="ts">
import { ApiRoleRepository } from '~/modules/roles/infra/ApiRoleRepository';
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
import { useCatalogRoleStore } from '~/store/catalogs/catalogRole.store';

  const listRoles = useCatalogRoleStore( ApiRoleRepository() );

  onMounted(async() => {
    await listRoles.getCatalogRoles();

  });

</script>