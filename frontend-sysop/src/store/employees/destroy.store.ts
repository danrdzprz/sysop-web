import { defineStore } from 'pinia';
import { RequestStatus } from "~/modules/shared/domain/RequestStatus";
import { useFeedBackStore } from "~/store/feedback.store";
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import type { ResponseSuccess } from '~/modules/shared/domain/ResponseSucces';
import type { EmployeeRepository } from '~/modules/employee/domain/employee.repository.domain';
import { useCaseDeleteEmployee } from '~/modules/employee/application/useCaseDelete';


export function useDeleteEmployeeStore(repository: EmployeeRepository) {
  return defineStore('EMPLOYEES_DELETE',{
    state: ():{status: RequestStatus, message:  ResponseSuccess | ResponseFailure | null, errors: ResponseFailure["errors"]}=> {
      return {
        status:RequestStatus.INITIAL,
        message: null,
        errors:[]
      }
    },
    getters: {
      get_status: (state):RequestStatus => state.status,
    },
    actions: {
      async destroy(id: number) {
        const feedback = useFeedBackStore();
        this.status = RequestStatus.LOADING;
        return await useCaseDeleteEmployee(
            repository,
          )(id)
          .then(response => {
            this.message = response as ResponseSuccess;
            feedback.openSuccess({message:`${this.message.message}`});
            this.status = RequestStatus.SUCCESS;
            return response;
          })
          .catch(error => {
            this.status = RequestStatus.ERROR ;
            try {
              this.message = error as ResponseFailure;
              const {errors, message} = error as ResponseFailure;
              if(errors){
                for (const key in errors) {
                  if (Object.prototype.hasOwnProperty.call(errors, key)) {
                    const element = errors[key];
                    for (const msg of element) {
                      feedback.openError({message:`${msg}`});
                    }
                  }
                }
                this.errors = errors;
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