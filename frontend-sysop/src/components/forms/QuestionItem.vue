<template>
  
  <VCard elevation="2" class="my-3 mx-1 py-0">
    <VCardTitle >
      <VRow justify="space-between">
        <VCol class="body-1">
          Pregunta {{ index + 1}}
        </VCol>
        <VCol align-self="center">
          <VRow justify="end" class="mr-1">
            <VBtn 
              flat 
              variant="text"
              color="warning"  
              class="text-capitalize"
              icon="mdi-delete-outline"
              @click="$emit('remove',index)"
            >
            </VBtn>
          </VRow>
        </VCol>
      </VRow>
    </VCardTitle>


    <VCardText class="">

      <v-row>
          <v-col cols="6">
            <InputsAutocomplete
              label="tipo de pregunta"
              :name="`questions[${index}].type`"
              :items="question_types"
            >
            </InputsAutocomplete>
          </v-col>
          <v-col cols="6">
            <InputsAutocomplete
              label="Ponderación"
              :name="`questions[${index}].value`"
              :items="weightings"
            >
            </InputsAutocomplete>
          </v-col>
          
      </v-row>
      <v-row>
          <v-col>
            <InputsTextField
              label="Descripcion"
              :name="`questions[${index}].description`"
            >
            </InputsTextField>
          </v-col>
      </v-row>

      <v-row>
          <v-col>
            <InputsTextField
              label="Pregunta"
              :name="`questions[${index}].title`"
            >
            </InputsTextField>
          </v-col>
      </v-row>

      <!-- <v-expand-transition appear > -->
        <v-row v-if="question_values.type == 'scale'">
            <v-col>
              <InputsTextField
                label="Etiqueta Inicial"
                :name="`questions[${index}].labels.prepend`"
              >
              </InputsTextField>
            </v-col>
            <v-col>
              <InputsTextField
                label="Etiqueta Final"
                :name="`questions[${index}].labels.append`"
              >
              </InputsTextField>
            </v-col>
        </v-row>
      <!-- </v-expand-transition> -->

      <v-expand-transition appear >
        <v-row v-if="question_values.type == 'number'">
            <v-col>
              <InputsTextField
                label="Unidad"
                :name="`questions[${index}].unit`"
              >
              </InputsTextField>
            </v-col>
        </v-row>
      </v-expand-transition>

      <v-expand-transition appear >
        <template v-if="question_values.type == 'multi'">
            <div>
              <v-row >
                <v-col cols="12">
                  <VBtn 
                    :text=" $t('pages.surveys.add_option')"
                    flat color="primary"  
                    class="text-capitalize"
                    @click="option_fields.push({option:'',value:'' })"
                  >
                    <template v-slot:append>
                      <VIcon start icon="mdi-plus" />
                    </template>
                  </VBtn>
                </v-col>
              </v-row>
  
              <v-row v-for="(options, id_option) in option_fields.fields.value" :key="options.key">
                <VCol cols="5">
                  <InputsTextField
                    label="Opción"
                    :name="`questions[${index}].options[${id_option}].option`"
                  >
                  </InputsTextField>
                </VCol>
                <VCol cols="5">
                  <InputsAutocomplete
                    label="Ponderación"
                    :name="`questions[${index}].options[${id_option}].value`"
                    :items="weightings"
                  >
                  </InputsAutocomplete>
                </VCol>
                  <VCol justify="end" class="mr-1">
                    <VBtn 
                      flat 
                      variant="text"
                      color="warning"  
                      class="text-capitalize"
                      icon="mdi-delete-outline"
                      @click="option_fields.remove(id_option)"
                    >
                    </VBtn>
                  </VCol>
              </v-row>
            </div>
        </template>
      </v-expand-transition>

      <v-expand-transition appear >
        <template v-if="question_values.type == 'binary'">
            <div>
              <v-row >
                <v-col cols="12">
                  <VBtn 
                    :text=" $t('pages.surveys.add_go_to')"
                    flat color="primary"  
                    class="text-capitalize"
                    @click="goingto_fields.push({go_to:null,in_answer:null })"
                  >
                    <template v-slot:append>
                      <VIcon start icon="mdi-plus" />
                    </template>
                  </VBtn>
                </v-col>
              </v-row>
  
              <v-row v-for="(jumps, id_jump) in goingto_fields.fields.value" :key="jumps.key">
                <VCol cols="5">
                  <InputsAutocomplete
                    label="Respuesta para insertar salto"
                    :name="`questions[${index}].jumps[${id_jump}].go_to`"
                    :items="toResponses"
                  >
                  </InputsAutocomplete>
                </VCol>
                <VCol cols="5">
                  <InputsAutocomplete
                    label="Pregunta a la que salta"
                    :name="`questions[${index}].jumps[${id_jump}].in_answer`"
                    :items="list_questions"
                  >
                  </InputsAutocomplete>
                </VCol>
                  <VCol justify="end" class="mr-1">
                    <VBtn 
                      flat 
                      variant="text"
                      color="warning"  
                      class="text-capitalize"
                      icon="mdi-delete-outline"
                      @click="goingto_fields.remove(id_jump)"
                    >
                    </VBtn>
                  </VCol>
              </v-row>
            </div>
        </template>
      </v-expand-transition>

      <v-row>
          <v-col v-if="question_values.type == 'binary' || question_values.type == 'multi'">
            <InputsCheckbox label="Agregar opción 'No Aplica'" :name="`questions[${index}].preset_options.not_apply`"></InputsCheckbox>
          </v-col>
          <v-col v-if="question_values.type == 'multi'">
            <InputsCheckbox label="Agregar opción 'Otro'" :name="`questions[${index}].preset_options.other`"></InputsCheckbox>
          </v-col>
      </v-row>

      <v-row>
          <v-col>
            <InputsCheckbox label="Requerido" :name="`questions[${index}].required`"></InputsCheckbox>
          </v-col>
      </v-row>
      
    </VCardText>
  </VCard>
         
</template>

<script setup lang="ts">
import { type GoingToEntity, type OptionEnity, type QuestionEntity } from '@/modules/surveys/domain/survey';
import { useFieldArray } from 'vee-validate';

defineProps({
    index:{
      type: Number,
      required: true,
      default: false
    },
    list_questions:{
      type: Array,
      required: false,
      default: []
    },
    question_values:{
      type: Object as PropType<QuestionEntity>,
      required: true,
      default: {
        title: null,
        description: "",
        type: null,
        value: null,
        question_number: 0,//eliminar
        required: true,
        jumps: [],
        labels: {
          prepend: "",
          append: ""
        },
        unit: null,
        invert: false,
        preset_options: {
          not_apply: false,
          other: false
        },
        options: [],
      }
    },
  });
 
const question_types = [
  {text:"Binaria", value:"binary"},
  {text:"Escala (Del 1 al 5)", value:"scale"},
  {text:"Abierta (Texto libre)", value:"open"},
  {text:"Hora (hh:mm)", value:"time"},
  {text:"Fecha (dd/mm/aaaa)", value:"date"},
  {text:"Opción múltiple", value:"multi"},
  {text:"Numérica", value:"number"},
];

const weightings= [
      {
        value: 0,
        text: '0'
      },
      {
        value: 0.25,
        text: 0.25
      },
      {
        value: 0.5,
        text: 0.5
      },
      {
        value: 0.75,
        text: 0.75
      },
      {
        value: 1,
        text: 1
      },
    ];
    const in_questions= [
      {
        value: 'Sí',
        text: 'Sí'
      },
      {
        value: 'No',
        text: 'No'
      },
      {
        value: 'NA',
        text: 'No aplica'
      },
    ];

const toResponses = [
  {text:"Si", value: "Y"},
  {text:"No", value: "N"},
  {text:"No aplica", value:"NA"}
];

const option_fields = useFieldArray<OptionEnity>('options');

const goingto_fields = useFieldArray<GoingToEntity>('jumps');



// const selected = ref(props.values);
</script>

<style>

</style>