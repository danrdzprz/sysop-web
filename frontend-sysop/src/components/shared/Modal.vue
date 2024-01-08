
<script setup lang="ts">

  const props = defineProps({
    visible:{
      type: Boolean,
      required: false,
      default: false
    },
    persistent:{
      type: Boolean,
      required: false,
      default: true
    },
    width:{
      type: String,
      required: false,
      default: ""
    },
    loading:{
      type: Boolean,
      required: false,
      default: false
    },
    toolbarColor:{
      type: String,
      required: false,
      default: ""
    },
    showToolbar:{
      type: Boolean,
      required: false,
      default: false
    },
    text:{
      type: String,
      required: false,
      default: ""
    },
    title:{
      type: String,
      required: false,
      default: ""
    },
    bottomLineColor:{
      type: String,
      required: false,
      default: ""
    },
  });

  // const emit = defineEmits(['update:visible'])

  const emit = defineEmits(['update:loading', 'update:text','update:title', 'update:visible']);

  const cancel=() =>{

  };

  const confirm=() =>{

  };
  const value = computed({
    get() {
      return props.visible
    },
    set(value) {
      emit('update:visible', value)
    }
  })
</script>

<template>
    <v-dialog v-model="value" :persistent="persistent||false" :width="width" >
      <v-card :loading="loading||false" class="overflow-hide">
          <v-toolbar
                :color="toolbarColor||'primary'"
                dark
                v-if="showToolbar||false"
                height="15px"
                flat
            ></v-toolbar>
            <v-card-title  class="d-flex justify-center body-1">{{ title }}</v-card-title>
            <v-card-text class="pre">
                {{ text }}
                <slot name="cardBody"></slot>
            </v-card-text>
            <v-card-actions class="justify-end">
              <slot name="actions"></slot>
             
            </v-card-actions>
            <div :class="`h-line ${bottomLineColor}`">&nbsp;</div>
      </v-card>
    </v-dialog>
</template>

<style lang="scss">
    .pre{
        white-space: pre-line;
    }

    .h-line{
        height: 10px;
    }

    .overflow-hide{
        overflow: hidden !important;
        overflow-y: hidden !important;
    }
</style>