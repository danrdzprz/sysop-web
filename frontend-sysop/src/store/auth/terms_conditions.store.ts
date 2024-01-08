import { defineStore } from 'pinia';
import type { AuthRepository } from '~/modules/auth/domain/AuthRepository';
import { RequestStatus } from '~/modules/shared/domain/RequestStatus';
import { useFeedBackStore } from '../feedback.store';
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import { UseCaseAceptTerminsConditions } from '~/modules/auth/application/terms-conditions/terms-conditions';
import type { TermsConditions } from '~/modules/auth/domain/TermsConditions';
import type { ResponseSuccess } from '~/modules/shared/domain/ResponseSucces';
// export factory function, factory pattern
export function useTermsConditionsStore(repository: AuthRepository) {
  return defineStore('AUTH_TERMS_CONDITIONS',{
      state: () => {
        return {
          status:RequestStatus.INITIAL,
        }
      },
      getters: {
        get_status: (state):RequestStatus => state.status,
      },
      actions: {
        async acpetTermsConditions(data: TermsConditions) {
          const feedback = useFeedBackStore();
          this.$reset();
          this.status = RequestStatus.LOADING ;
          return await UseCaseAceptTerminsConditions(
              repository,
            )(data)
            .then(response => {
              console.log(response);
              this.status = RequestStatus.SUCCESS ;
              feedback.openError({message:`${(response as ResponseSuccess).message}`});
              return response;
            })
            .catch(error => {
              this.status = RequestStatus.ERROR ;
              try {
                const {errors} = error as ResponseFailure;
                for (const error of errors) {
                  feedback.openError({message:`${error}`});
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