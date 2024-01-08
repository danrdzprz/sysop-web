
<script setup lang="ts">

  import { useFeedBackStore } from '@/store/feedback.store'

  const props = defineProps({
    visible:{
      type: Boolean,
      required: false,
      default: false
    },
    bottom:{
      type: Boolean,
      required: false,
      default: false
    },
    color:{
      type: String,
      required: false,
      default: "green"
    },
    left:{
      type: Boolean,
      required: false,
      default: false
    },
    multiline:{
      type: Boolean,
      required: false,
      default: false
    },
    right:{
      type: Boolean,
      required: false,
      default: false
    },
    timeout:{
      type: Number,
      required: false,
      default: 2000
    },
    top:{
      type: Boolean,
      required: false,
      default: false
    },
    vertical:{
      type: Boolean,
      required: false,
      default: false
    },
    text:{
      type: String,
      required: false,
      default: ""
    },
  });

const feedback_store = useFeedBackStore();
</script>

<template>
    <v-snackbar v-model="feedback_store.visible"
    :color="feedback_store.color" 
    :multi-line="props.multiline" 
    :timeout="props.timeout" 
    :top="true" 
    :right="true" 
    :left="false" 
    :bottom="false" 
    :vertical="false" 
    transition="scale-transition">
        <v-row justify="space-between" align="center" class="pl-3">
            <div v-html="feedback_store.message"></div>
              <VBtn
                class="ma-2"
                variant="text"
                icon="mdi-close"
                @click="()=>{feedback_store.close()}"
              ></VBtn>
        </v-row>
      </v-snackbar>
</template>
