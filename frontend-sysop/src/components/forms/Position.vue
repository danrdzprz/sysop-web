
import { InputsTextArea } from '#build/components';
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
            <InputsAutocomplete
                label="Departamento"
                class="shrink"
                name="departament_id"
                :loading="listDepartments.status === RequestStatus.LOADING"
                :items="listDepartments.pagination.data.map(x=>({text: x.name, value:x.id}))"
            >
            </InputsAutocomplete>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="3" lg="3">
            <InputsTextField
                label="Edad minima"
                class="shrink"
                name="min_age_required"
            >
            </InputsTextField>
        </VCol>
        <VCol cols="12" sm="12" md="3" lg="3">
            <InputsTextField
                label="Edad maxima"
                class="shrink"
                name="max_age_required"
            >
            </InputsTextField>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsAutocomplete
                label="Educación"
                class="shrink"
                name="education"
                :items="[
                    {text: 'Educación inicial', value: 'INICIAL'},
                    {text: 'Educación básica', value: 'BÁSICA'},
                    {text: 'Educación medía superior', value: 'MEDÍA SUPERIOR'},
                    {text: 'Educación superior', value: 'SUPERIOR'},
                ]"
            >
            </InputsAutocomplete>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsAutocomplete
                label="Genero"
                class="shrink"
                name="genere"
                :items="[
                    {text: 'Masculino', value: 'MASCULINO'},
                    {text: 'Femenino', value: 'FEMENINO'},
                    {text: 'Cualquiera', value: 'CUALQUIERA'},
                ]"
            >
            </InputsAutocomplete>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsSwitch
                label="Licencia de conducir"
                class="shrink"
                name="driving_license"
                :true-value="true"
                :false-value="false"
            >
            </InputsSwitch>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsTextArea
                label="Actividades"
                class="shrink"
                name="activities"
            >
            </InputsTextArea>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsTextArea
                label="Requeriminetos adicionales"
                class="shrink"
                name="additional_requirements"
            >
            </InputsTextArea>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsAutocomplete
                label="Días laborales"
                class="shrink"
                name="business_days"
                :items="['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes','Sabado','Domingo']"
                multiple
            >
            </InputsAutocomplete>
        </VCol>
    </VRow>
    <VRow justify="center" align="center">
        <VCol cols="12" sm="12"  md="6" lg="6">
            <InputsAutocomplete
                label="Días de descanso"
                class="shrink"
                name="days_off"
                :items="['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes','Sabado','Domingo']"
                multiple
            >
            </InputsAutocomplete>
        </VCol>
    </VRow>
</template>
<script setup lang="ts">
  import { ApiDepartmentRepository } from '~/modules/departments/infra/ApiDepartementRepository';
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
  import { useListDepartmentStore } from '~/store/hr/departments/list.store';

  const listDepartments = useListDepartmentStore( ApiDepartmentRepository() );

  const page = ref(1);
  const itemsPerPage = ref(9);

  
  onMounted(async() => {
    getData(page.value);
  });

  const getData =  async(page: number)=>{
    await listDepartments.getDepartments(
      {
        page:page,
        itemsPerPage: itemsPerPage.value
      }
    );
  }

</script>