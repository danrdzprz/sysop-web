import { defineStore } from 'pinia';
import { RequestStatus } from "~/modules/shared/domain/RequestStatus";
import { useFeedBackStore } from "~/store/feedback.store";
import type { ResponseFailure } from '~/modules/shared/domain/ResponseFailure';
import type { EmployeeRepository } from '~/modules/employee/domain/employee.repository.domain';
import type { EmployeeDomain } from '~/modules/employee/domain/employee.domain';
import { useCaseDetailEmployee } from '~/modules/employee/application/useCaseDetail';

export function useDetailEmployeeStore(repository: EmployeeRepository) {
  return defineStore('HR_EMPLOYEES_DETAIL',{
    state: ():{status: RequestStatus, data:  EmployeeDomain | ResponseFailure | null}=> {
      return {
        status:RequestStatus.INITIAL,
        data: null
      }
    },
    getters: {
      get_status: (state):RequestStatus => state.status,
    },
    actions: {
      async detail(data: number) {
        const feedback = useFeedBackStore();

        this.$reset();
        this.status = RequestStatus.LOADING;
        return await await useCaseDetailEmployee(
            repository,
          )(data)
          .then(response => {
            
            this.status = RequestStatus.SUCCESS;
            this.data = response as  EmployeeDomain;
            return response;
          })
          .catch(error => {
            this.status = RequestStatus.ERROR;
            try {
              const [error_message]= error.errors;
              feedback.openError({message:`${error_message}`});
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