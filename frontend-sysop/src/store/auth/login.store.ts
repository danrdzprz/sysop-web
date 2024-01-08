import { defineStore } from 'pinia';
import { loginAction } from '~/modules/auth/application/login/login';
import type { IAuth } from '~/modules/auth/domain/Auth';
import type { AuthRepository } from '~/modules/auth/domain/AuthRepository';
import type { AuthSuccess } from '~/modules/auth/domain/AuthSucces';
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
import { useFeedBackStore } from '../feedback.store';
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
// export factory function, factory pattern
export function useAuthStore(repository: AuthRepository) {
  return defineStore('AUTH_LOGIN',{
      state: () => {
        return {
          status:RequestStatus.INITIAL,
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async submitLogin(data: IAuth) {
          const feedback = useFeedBackStore();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await loginAction(
              repository,
            )(data)
            .then(response => {
              const token = useCookie('token');
              token.value = (response as AuthSuccess).token;
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
