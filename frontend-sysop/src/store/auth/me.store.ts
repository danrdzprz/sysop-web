import { defineStore } from 'pinia';
import type { AuthRepository } from "~/modules/auth/domain/AuthRepository"
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
import { useFeedBackStore } from '../feedback.store';
import { UseCaseGetMe } from '~/modules/auth/application/me/login';
import type { Me } from '~/modules/auth/domain/Me';
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';


export function useMeStore(repository: AuthRepository) {
  return defineStore('AUTH_ME',{
      state: ():{status: RequestStatus, me_data: Me}=> {
        return {
          status:RequestStatus.INITIAL,
          me_data:{
            name:"",
            email:"",
          }
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async getMe() {
          const feedback = useFeedBackStore();
          const token = useCookie('token'); // useCookie new hook in nuxt 3

          this.$reset();
          this.status = RequestStatus.LOADING;
          return await await UseCaseGetMe(
              repository,
            )()
            .then(response => {
              
              this.status = RequestStatus.SUCCESS;
              this.me_data = response as Me;
              return response;
            })
            .catch(error => {
              token.value = null; // set token to cookie
              this.status = RequestStatus.ERROR;
              this.me_data.name = "";
              this.me_data.email = "";
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
        }
      }
  })();
}