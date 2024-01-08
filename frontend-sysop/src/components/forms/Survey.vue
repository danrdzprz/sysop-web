<template>
    <v-navigation-drawer
        permanent
        location="right"
      >
        <v-list density="compact">
          <v-list-subheader>Preguntas</v-list-subheader>
        </v-list>

        <div class="category_fields">
            <v-list density="compact" nav :lines="false">
              <draggable 
                group="people" 
                v-model="fields"
                @end="(evt:any)=>moveQuestion(evt)"
                item-key="key">
                <template #item="{element, index}">
                  <v-list-item elevation="1" variant="plain" class="question-list" @click="goToQuestion({index_question: index})" color="secondary" rounded="xs">
                  <template v-slot:append="{ isActive }">
                    <VBtn 
                      flat 
                      variant="text"
                      color="warning"  
                      class="text-capitalize"
                      icon="mdi-delete-outline"
                      @click="remove(index)"
                    />
                  </template>
  
                  <v-list-item-title>PREGUNTA {{ index + 1}}</v-list-item-title>
  
                  <v-list-item-subtitle>
                    {{ element.value.titulo }}
                  </v-list-item-subtitle>
                </v-list-item>
                </template>
              </draggable>
            </v-list>
        </div>
      </v-navigation-drawer>
    <VRow justify="center" align="center">
      <VCol cols="12" sm="12"  md="6" lg="6">
        <InputsTextField
          label="Titulo de la encuesta"
          name="name"
        >
        </InputsTextField>
      </VCol>
    </VRow>
    <VRow justify="center" align="center">
      <VCol cols="12" sm="12"  md="6" lg="6">
        <VBtn 
          :text=" $t('pages.surveys.add_question')"
          flat color="primary"  
          class="text-capitalize"
          @click="push(createEmptyQuestion())"
          rounded="xl"
        >
          <template v-slot:append>
            <VIcon start icon="mdi-plus" />
          </template>
        </VBtn>
      </VCol>
    </VRow>

    <VRow justify="center" align="center" v-for="(field, idx) in fields" :key="idx" ref="itemRefs">
      <VCol cols="12" sm="12"  md="6" lg="6">
        <FormsQuestionItem :index="idx" :index_category="0" :index_question="idx" @remove="remove(idx)" :list_questions="fields.map((x,i)=>({ value: x.value.id,text: `Pregunta ${i+ 1}`}))" :question_values="(field.value)"></FormsQuestionItem>
      </VCol>
    </VRow>
</template>

<script setup lang="ts">
import { type QuestionEntity } from '@/modules/surveys/domain/survey';
import { useFieldArray } from 'vee-validate';

defineProps({
  edit:{
      type: Boolean,
      required: false,
      default: false
    },
  });
 
const category_refs = ref([]);

const drag= ref(false);

const list= ref ([
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 },
      ]);

const list_category = ref<HTMLDivElement[]>([]);

// const fields = useFieldArray<QuestionEntity>('fields');
const { remove, push, fields, move, insert } = useFieldArray<QuestionEntity>(`questions`);


const moveQuestion = (event:any)=>{
  move(event.oldIndex, event.newIndex);
};

const computed_questions = computed({
  get() {
    return (fields.value).map((x)=>{
      return {
              key: `${x.value.id}_question`,
              title: x.value.title, 
              descripcion: x.value.description, 
            }
    });
  },
  set(newValue) {
    return newValue;
  },
})



const id = (length = 6) => {
  return new Date().getTime().toString().slice(-length);
}

const createEmptyQuestion = ( key?:string ): QuestionEntity=> {
  const _key = key ? key :id(); 
  return {
    id: _key,
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
};

const itemRefs = ref([]);

const goToQuestion = ({index_question}:{index_question:number})=>{
  ((itemRefs.value[index_question] as any)?.$el as HTMLDivElement).scrollIntoView({ behavior: 'smooth' })
}

</script>

<style lang="scss">
    .question-list{
      cursor: move;
    }
</style>