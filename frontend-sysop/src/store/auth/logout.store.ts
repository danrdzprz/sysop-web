import { defineStore } from 'pinia';
import type { AuthRepository } from "~/modules/auth/domain/AuthRepository"
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
import { useFeedBackStore } from '../feedback.store';
import { UseCaseLogout } from '~/modules/auth/application/logout/logout';
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';


// export factory function, factory pattern
export function useLogoutStore(repository: AuthRepository) {
  return defineStore('AUTH_LOGOUT',{
      state: () => {
        return {
          status:RequestStatus.INITIAL,
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async logoutAction() {
          const feedback = useFeedBackStore();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await UseCaseLogout(
              repository,
            )()
            .then(response => {
              const token = useCookie('token');
              token.value = null;
              this.status = RequestStatus.SUCCESS ;
              return response;
            })
            .catch(error => {
              this.status = RequestStatus.ERROR ;
              try {
                const {errors, message} = error as ResponseFailure;
                if(errors){
                  for (const error of errors) {
                    feedback.openError({message:`${error}`});
                  }
                }
                console.log(error);
                if(message){
                  feedback.openError({message:`${message}`});
                }
                return errors;
              } catch (error) {
                feedback.openError({message:'Error en el servidor'});
                return null;
              }
            });
        },
        setFormStatus( value: RequestStatus ) {
          return this.status = value;
        },
        resetForm() {
          return this.status = RequestStatus.INITIAL;
        },
      }
  })();
}
// export function useLogoutStore(repository: AuthRepository) {
//   return defineStore('AUTH_LOGOUT', () => {

//     const feedback = useFeedBackStore();
//     const request_status = useRequestStatus();

//     const token = useCookie('token'); // useCookie new hook in nuxt 3
  
//     const logoutAction = async () => {
//       request_status.resetForm();
//       request_status.setFormStatus( RequestStatus.LOADING );
//       return await await UseCaseLogout(
//           repository,
//         )()
//         .then(response => {
//           token.value = null; // set token to cookie
//           request_status.setFormStatus( RequestStatus.SUCCESS );
//           return response;
//         })
//         .catch(error => {
//           request_status.setFormStatus( RequestStatus.ERROR );
//           try {
//             const [error_message]= error.errors;
//             feedback.openError({message:`${error_message}`});
//             return error;
//           } catch (error) {
//             feedback.openError({message:'Error en el servidor'});
//             return null;
//           }
//         });
//     };
//     return {
//       logoutAction,
//       request_status
//     };
//   })()
// }