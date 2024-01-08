import { defineStore } from 'pinia';
import { RequestStatus } from "~/modules/shared/domain/RequestStatus";
import { useFeedBackStore } from "~/store/feedback.store";
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import type { ResponseSuccess } from '~/modules/shared/domain/ResponseSucces';
import type { EmployeeRepository } from '~/modules/employee/domain/employee.repository.domain';
import { useCaseDeleteEmployee } from '~/modules/employee/application/useCaseDelete';


export function useDeleteEmployeeStore(repository: EmployeeRepository) {
  return defineStore('EMPLOYEES_DELETE',{
    state: ():{status: RequestStatus, message:  ResponseSuccess | ResponseFailure | null}=> {
      return {
        status:RequestStatus.INITIAL,
        message: null
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
            this.status = RequestStatus.ERROR;
            try {
              const [error_message]= error.errors;
              feedback.openError({message:`${error_message}`});
              console.log(error);
              return error;
            } catch (error) {
              feedback.openError({message:'Error en el servidor'});
              return null;
            }
          });
      }
    }
  })();
}