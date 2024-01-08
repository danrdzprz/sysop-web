import { defineStore } from 'pinia';
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';

export const useRequestStatus = defineStore('REQUEST_STATUS', {
    state: ():{status: RequestStatus} => ({ 
        status:RequestStatus.INITIAL,
     }),
    getters: {
      get_status: (state):RequestStatus => state.status,
    },
    actions: {
		  setFormStatus( value: RequestStatus ) {
        this.status = value;
      },
      resetForm() {
        this.status = RequestStatus.INITIAL;
      },
    }
});

// import { defineStore } from 'pinia';

// export const enum FormStatus {
// 	LOADING,
// 	SUCCESS,
// 	ERROR,
// 	INITIAL,
// }

// export const useFormStore =  defineStore('FORM_STATUS', ()=>{

// 	const form_status = ref<FormStatus>(FormStatus.INITIAL);

// 	const setFormStatus = (value: FormStatus) => {
// 		console.log(value);
// 		form_status.value = value;
// 	};

// 	const resetForm = () => form_status.value = FormStatus.INITIAL;

// 	return {
//         form_status,
// 		setFormStatus,
// 		resetForm,
// 	};
// })