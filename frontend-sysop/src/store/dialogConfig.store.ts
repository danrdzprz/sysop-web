import { defineStore } from 'pinia';
import type { Dialog } from '~/modules/shared/domain/dialog';


export const useDialogConfig = defineStore('DIALOG', {
/* In the code snippet provided, `state: (): Dialog => ({ ... })` is defining the initial state of the
`Dialog` store. */
  state: (): Dialog => ({
    _id: 0,
    _isOpen: false,
    _text: '',
  }),

/* The `getters` object in the code snippet is defining three getter functions: `get_id`, `get_isOpen`,
and `get_text`. These getter functions allow you to access the corresponding properties of the
`Dialog` store state. */
  getters: {
    get_id: (state) => state._id,
    get_isOpen: (state) => state._isOpen,
    get_text: (state) => state._text,
  },
/* The `actions` object in the code snippet is defining three action functions: `openDialog`,
`closeDialog`, and `setDialogData`. These action functions are responsible for modifying the state
of the `Dialog` store. */
  actions: {
    openDialog() {
      this._isOpen = true;
    },
    closeDialog() {
      this._isOpen = false;
    },
    setDialogData(dialog: Dialog) {
      this._id = dialog._id;
      this._isOpen = dialog._isOpen;
      this._text = dialog._text;
    },
  },
});