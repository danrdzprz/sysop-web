import { defineStore } from 'pinia';
import type { AuthRepository } from "~/modules/auth/domain/AuthRepository"
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
import { useFeedBackStore } from '../feedback.store';
import { useRequestStatus } from '../form.store';
import { UseCaseLogout } from '~/modules/auth/application/logout/logout';


// export factory function, factory pattern
export function useLogoutStore(repository: AuthRepository) {
  return defineStore('AUTH_LOGOUT', () => {

    const feedback = useFeedBackStore();
    const request_status = useRequestStatus();

    const token = useCookie('token'); // useCookie new hook in nuxt 3
  
    const logoutAction = async () => {
      request_status.resetForm();
      request_status.setFormStatus( RequestStatus.LOADING );
      return await await UseCaseLogout(
          repository,
        )()
        .then(response => {
          token.value = null; // set token to cookie
          request_status.setFormStatus( RequestStatus.SUCCESS );
          return response;
        })
        .catch(error => {
          request_status.setFormStatus( RequestStatus.ERROR );
          try {
            const [error_message]= error.errors;
            feedback.openError({message:`${error_message}`});
            return error;
          } catch (error) {
            feedback.openError({message:'Error en el servidor'});
            return null;
          }
        });
    };
    return {
      logoutAction,
      request_status
    };
  })()
}

// export const useLoginStore = 