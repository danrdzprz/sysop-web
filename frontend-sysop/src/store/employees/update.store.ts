import { defineStore } from 'pinia';
import { RequestStatus } from "~/modules/shared/domain/RequestStatus";
import { useFeedBackStore } from "~/store/feedback.store";
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import type { ResponseSuccess } from '~/modules/shared/domain/ResponseSucces';
import type { EmployeeDomain } from '~/modules/employee/domain/employee.domain';
import type { EmployeeRepository } from '~/modules/employee/domain/employee.repository.domain';
import { useCaseUpdateEmployee } from '~/modules/employee/application/useCaseUpdate';

export function useUpdateEmployeeStore(repository: EmployeeRepository) {
  return defineStore('EMPLOYEE_UPDATE',{
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
      async update(id: number, data: EmployeeDomain) {
        const feedback = useFeedBackStore();
        this.status = RequestStatus.LOADING;
        return await useCaseUpdateEmployee(
            repository,
          )(id, data)
          .then(response => {
            this.message = response as ResponseSuccess;
            feedback.openSuccess({message:`${this.message}`});
            this.status = RequestStatus.SUCCESS;
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
      }
    }
  })();
}