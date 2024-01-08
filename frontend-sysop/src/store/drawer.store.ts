import { defineStore } from 'pinia';

export const useDrawerStore = defineStore('DRAWER', {
    state: () => ({
        open:false,
     }),
    getters: {
      get_open: (state):boolean => state.open,
    },
    actions: {
      toggle() {
        this.open = !this.open;
      }
    }
});